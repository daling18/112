<template>
  <div>
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">机票类型</div>
          <el-select  placeholder="机票类型"  v-model="filter.flight_type">
            <el-option label="全部" :value="''"></el-option>
            <el-option v-for="(val, key, $index) in orderList.flight_type" :key="$index" :label="val" :value="key"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单状态</div>
          <el-select  placeholder="订单状态" v-model="filter.order_status">
            <el-option label="全部" :value="''"></el-option>
            <el-option v-for="(val, key, $index) in orderList.order_status" :key="$index" :label="val" :value="key"></el-option>
          </el-select>
          <br/>
        </div>
        <div class="search-item">
          <div class="label">订单来源</div>
          <el-select  placeholder="订单来源"  v-model="filter.order_source">
            <el-option label="全部" :value="''"></el-option>
            <el-option v-for="(val, key, $index) in orderList.source_type" :key="$index" :label="val" :value="key"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">乘 机 人</div>
          <el-input placeholder="乘机人" v-model="filter.name"></el-input>
        </div>
        <div class="search-item">
          <div class="label">订单编号</div>
          <el-input placeholder="订单编号" v-model="filter.order_id"></el-input>
        </div>
        <div class="search-item calendar">
          <div class="label">预定日期</div>
          <el-date-picker
            :class="'date-picker'"
            v-model="bk_date"
            type="daterange"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
            :default-time="['00:00:00', '23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="datePickerChange('bk_date')"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <div class="search-item calendar">
          <div class="label">出行日期</div>
          <el-date-picker
            :class="'date-picker'"
            v-model="dpt_date"
            type="daterange"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
            :default-time="['00:00:00', '23:59:59']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="datePickerChange('dpt_date')"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>



        <div class="search-item">
          <el-button type="primary"
            @click="handleSearchRequset">搜索</el-button>
        </div>
      </div>
    </div>

    <!-- 表格主体 -->
    <div class="system-content">
    <div class="content-list">
      <el-table class="el-table--middle" :data="orderList.list" border style="width: 100%">
           <el-table-column
          label="预定时间"
          prop="bk_time"
          header-align="center"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          prop="order_id"
          label="订单号"
          header-align="center"
          align="center"
          :resizable="false">
          <template slot-scope="scope">
            {{scope.row.order_id}}
          </template>
        </el-table-column>
        <el-table-column
          label="航班信息"
          header-align="center"
          align="center"
          :resizable="false">
            <template slot-scope="scope">
              <p>
                <span>{{scope.row.flight_info.dept_city}}</span>
                <span> → </span>
                <span>{{scope.row.flight_info.arr_city}}</span>
              </p>
              <p>
                <span>{{scope.row.flight_info.carrier_name}}</span>
                <span>-</span>
                <span>{{scope.row.flight_info.flight_num}}</span>
              </p>
              <p>
                <span>{{scope.row.flight_info.dept_date}} </span>
                <span>{{scope.row.flight_info.dept_time}}</span>
                <span>-</span>
                <span>{{scope.row.flight_info.arr_time}}</span>
              </p>
            </template>
        </el-table-column>
        <el-table-column
          label="乘机人"
          prop="passengers"
          header-align="center"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="订单金额"
          prop="amount"
          header-align="center"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="status_name"
          header-align="center"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          align="center"
          width="120"
		  fixed="right"
          :resizable="false">
            <template slot-scope="scope">
              <router-link :to="{ path: '/singlepro/airOrder/detail',
                                      query: { order_no: scope.row.order_no,child_no:scope.row.child_no}}"
                                      class="look">查看</router-link>
              <!-- <router-link v-if="scope.row.child_no!=''" :to="{ path: '/singlepro/airOrder/detail',
                                      query: { order_id: scope.row.order_id,child_no:scope.row.child_no}}"
                                      class="look">查看</router-link>
              <router-link v-else :to="{ path: '/singlepro/airOrder/detail',
                                      query: { order_id: scope.row.order_id}}"
                                      class="look">查看</router-link> -->
            </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <div v-if="pagination.total_page" class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pagination.page_size"
          :page-count="pagination.total_page"
          :current-page="pagination.page_index"
          :total="pagination.total_count"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import { getAirSingleOrder } from 'src/api/flight';
import Clipboard from 'clipboard';
import MyOrderTab from 'src/components/components/MyOrderTab.vue';
import SingleOrderTab from 'src/components/components/SingleOrderTab.vue'
import * as format from 'src/utils/format';
import { clone } from 'src/utils/common'
export default {
  name: 'orderList',
  data() {
    return {
      filter:{
        flight_type: '', //机票类型
        order_status: '', //订单状态
        name: '', //乘机人
        dpt_date_s: '', //出行日期的开始时间
        dpt_date_e: '', //出行日期的结束时间
        bk_date_s: "", //预定日期的开始时间
        bk_date_e: "", //预定日期的结束时间
        order_id: '', //订单号
        order_source: '' //订单来源
      },
      bk_date: '',
      dpt_date: '',
      orderList: {
        flight_type: null,
        list: null,
        order_status: null
      },
      //分页
      pagination:{
        total_count:'', //总条数
        total_page:'', //总页数
        page_index:1, //分几页
        page_size:20   //每页20条
      }
    }
  },
  computed: {
    getOrderOption(){
      let routeName = this.$route.name,
          type,
          detailRouteName,
          refundDetailRouteName,
          requestFn=getAirSingleOrder;
      return {
        type,
        detailRouteName,
        refundDetailRouteName,
        requestFn
      }
    }
  },
  components: {
    MyOrderTab,
    SingleOrderTab
  },
  watch:{
    $route() {
      this.initSearchFilter();
    },
  },
  methods: {
    datePickerChange (type) {
      if (this[type]) {
        this.filter[type + '_s'] = this[type][0]
        this.filter[type + '_e'] = this[type][1]
      } else {
        this.filter[type + '_s'] = ''
        this.filter[type + '_e'] = ''
      }
    },
    copyclipboardTodo () {
      let clipboard = new Clipboard('.copy-text');
      clipboard.on('success', e => {
        // 释放内存
        this.$message({
          message:'复制成功',
          type:'success'
        });
        clipboard.destroy();
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({
          message:'浏览器不支持自动复制，请手动复制。',
          type:'success'
        })
        // 释放内存
        clipboard.destroy();
      })
    },
    initSearchFilter(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        // this.filter = {
        //   flight_type: '',
        //   order_status: '',
        //   name: '',
        //   dpt_date_s: '',
        //   dpt_date_e: '',
        //   bk_date_s: "",
        //   bk_date_e: "",
        //   order_id: '',
        //   order_source: ''
        // }
        // this.orderList.list = null;
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        filter = JSON.parse(filter);
        this.$set(this, 'filter', filter);
        this.handlerOrderTypeRequest();
      }
    },
    //点击搜索按钮
    handleSearchRequset(){
      let filter = this.filter
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));
      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    //点击分页
    handleCurrentChange(val) {
      this.pagination.page_index = val;
      this.handlerOrderTypeRequest();
    },
    handlerOrderTypeRequest() {
     let params = {
        data: this.filter
      }
      params.data.page_index=this.pagination.page_index
      //请求数据
      this.getOrderOption.requestFn({
        params: params,
        success: (params) => {
          let {code, msg, data} = params['data'];
          if(!code){
            this.orderList = data
            this.pagination.total_page = data.total_page;
            this.pagination.total_count = Number(data.total_count);
            this.pagination.page_index = Number(data.page_index);
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
  },
  mounted() {
    this.handlerOrderTypeRequest();
  }
}

</script>

<style lang="less" scoped>
.pagination{
  text-align: center;
  margin: 10px 0;
}
</style>
