<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">我的订单</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <div class="search-item calendar">
        <div class="label">预定日期</div>
        <el-date-picker
          v-model="searchInput.scheduled_time_start"
          type="date"
          placeholder="预定日期"
          :editable="false"
          :picker-options="scheduled_time_start_opts"
        />
        <div class="label zhi"> - </div>
        <el-date-picker
          v-model="searchInput.scheduled_time_end"
          type="date"
          placeholder="预定日期"
          :editable="false"
          :picker-options="scheduled_time_end_opts"
        />
      </div>
      <div class="search-item">
        <div class="label">销售人员</div>
        <el-input v-model="searchInput.operator_name" placeholder="销售人员"/>
      </div>
      <div class="search-item">
        <div class="label">团队编号</div>
        <el-input v-model="searchInput.tuan_no" placeholder="行程编号/团号"/>
      </div>
      <div class="search-item">
        <div class="label">订单状态</div>
        <el-select v-model="searchInput.confirm_status" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option label="已取消" value="-1"/>
          <el-option label="待处理" value="0"/>
          <el-option label="已占位" value="1"/>
          <el-option label="已确认" value="2"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">定损状态</div>
        <el-select v-model="searchInput.loss_assess" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option label="待定损" value="1"/>
          <el-option label="已定损" value="2"/>
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table class="el-table--middle" :data="tableData" border style="width: 100%">
            <el-table-column prop="order_no" label="订单编号" header-align="center" align="left" width="170" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis color-purple" :title="scope.row.order_no">
                  {{ scope.row.order_no }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="tuan_name" label="行程编号/团号/名称" header-align="center" align="left" min-width="180" :resizable="false">
              <template slot-scope="scope">
                <div :title="scope.row.tuan_name">
                  <template v-if="scope.row.product_id === 0">
                    {{ scope.row.tuan_no }}
                  </template>
                  <template v-else>
                    <router-link :to="{path: 'product-detail', query:{id: scope.row.product_id}}">
                      <p>{{ scope.row.product_no }}</p>
                    </router-link>
                  </template>
                  <p class="ellipsis color-gray">{{ scope.row.tuan_name }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结算价" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope"><span class="">￥{{ scope.row.rmb_total_amount }}</span></template>
            </el-table-column>
            <el-table-column label="对外建议价" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.rmb_out_total_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="游客" header-align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <!-- <span v-if="scope.row.adult_num" :title="'成人' + scope.row.adult_num">成人{{ scope.row.adult_num }}</span>
                <span v-if="scope.row.child_num" :title="'儿童' + scope.row.child_num">儿童{{ scope.row.child_num }}</span> -->
                <span class="ellipsis" v-if="scope.row.tourist_info" :title="scope.row.tourist_info">{{ scope.row.tourist_info }}</span>
                <!-- 是否有退团 0没有 1有 -->
                <router-link 
                  v-if="scope.row.is_tourist_cancel == 1"
                  :to="{ path: '/store-sale/tuituanDetail', query: {ono: scope.row.order_no, tid: scope.row.tuan_id}}"
                >
                  [退]
                  <span v-if="scope.row.cancel_num != 0">
                    {{ scope.row.cancel_num }}
                  </span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="" label="供应商" min-width="140" align="center" :resizable="false">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.supplier_org_name">{{ scope.row.supplier_org_name }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="" label="销售人员" width="100" align="center" :resizable="false">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.operator_name">{{ scope.row.operator_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" width="100" align="center" :resizable="false">
              <template slot-scope="scope">
                <span :class="scope.row.confirm_status == 2 ?'color-green' : scope.row.confirm_status == -1 ? 'color-gray' : ''">{{ scope.row.confirm_status_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="预定日期" align="center" min-width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-gray">{{ scope.row.scheduled_time }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="代理商" align="left" min-width="150" :resizable="false" v-if="!isZhike">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.distributor_org_name">{{scope.row.distributor_org_name}}</p>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="绑定合同" width="180" align="center" :resizable="false">
              <template slot-scope="scope">{{ scope.row.contract_no || '未绑定合同' }}
              </template>
            </el-table-column> -->
            <el-table-column label="操作" width="70" align="center" fixed="right">
              <template slot-scope="scope">
                <router-link v-if="$menuPermission('api_store/sale/bom_order_detail')" :to="'/store-sale/order-detail/' + scope.row.tuan_id + '/' + scope.row.id">
                  查看
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
// import { saleOrderList, contractBindOrderSubmit, contractUnbindOrderSubmit } from 'src/api/api';
import{
  saleOrderList
} from 'src/api/api_store';
import * as format from 'src/utils/format';
export default {
  name: 'OrderList',
  data() {
    return {
      totalPage: 1,
      pageShow: false,
      searchInput: {
        scheduled_time_start: '',
        scheduled_time_end: '',
        operator_name: '',
        distributor_org_name: '',
        confirm_status: '',
        order_no: '',
        tuan_no: '',
        loss_assess: ''
      },
      searchData: {
        page: 1,
        page_size: 10,
        scheduled_time_start: '',
        scheduled_time_end: '',
        operator_name: '',
        distributor_org_name: '',
        confirm_status: '',
        order_no: '',
        tuan_no: '',
        loss_assess: ''
      },
      tableData: [],
      opreateRole: null
    };
  },
  computed: {
    isZhike(){
      return this.$route.meta && this.$route.meta.isZhike;
    },
    scheduled_time_start_opts: function(){
      let endTime = this.searchInput.scheduled_time_end;
      //const today = new Date();

      if(endTime){
        endTime = new Date(endTime);
      }

      return {
        disabledDate(date) {
          return (endTime && endTime < date);
        }
      };
    },
    scheduled_time_end_opts: function(){
      let startTime = this.searchInput.scheduled_time_start;
      //const today = new Date();

      if(startTime){
        startTime = new Date(startTime);
      }

      return {
        disabledDate(date) {
          return (startTime && startTime > date);
        }
      };
    }
  },
  watch: {
    '$route' (to, from) {
      this.searchInput.scheduled_time_start = '';
      this.searchInput.scheduled_time_end = '';
      this.searchInput.operator_name = '';
      this.searchInput.distributor_org_name = '';
      this.searchInput.confirm_status = '';
      this.searchInput.order_no = '';
      this.searchInput.tuan_no = '';
      this.getList(true);
    }
  },
  created(){
    // 确定角色来源
    switch(this.$route.meta.topMenuConst){
    case 'operator':
      this.opreateRole = 1;
      break;
    case 'sale':
      this.opreateRole = 2;
      break;
    case 'finance':
      this.opreateRole = 3;
      break;
    }
  },
  mounted() {
    this.getList(true);
  },
  methods: {
    handleCurrentChange(val) {
      if(this.searchData.page != val){
        this.searchData.page = val;
        this.getList();
      }
    },
    getList(bool) {
      if (bool) {
        this.searchData = {... this.searchInput};
        if(this.searchData.scheduled_time_start){
          this.searchData.scheduled_time_start = format.date(this.searchData.scheduled_time_start);
        }
        if(this.searchData.scheduled_time_end){
          this.searchData.scheduled_time_end = format.date(this.searchData.scheduled_time_end);
        }
        this.searchData.page = 1;
        this.searchData.page_size = 10;
      }else{
        this.searchInput = {... this.searchData};
      }
      // if(this.$route.query.contid){
      //   this.searchData.contract_no = this.$route.query.contid;
      // }
      // 请求列表

      saleOrderList({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.pageShow = this.totalPage > 0;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
</style>
