<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li @click="goto('/sale/order/tuan-list-xc',{})">行程查询</li>
        <li class="on">团队查询</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item calendar">
        <div class="label">出发日期</div>
        <el-date-picker
          v-model="start_time"
          type="date"
          placeholder="选择日期"
          :editable="false"
          :picker-options="datepickerOptions2"
        />
        <div class="label zhi">-</div>
        <el-date-picker
          v-model="end_time"
          type="date"
          placeholder="选择日期"
          :editable="false"
          :picker-options="datepickerOptions1"
        />
      </div>
      <div class="search-item calendar">
        <div class="label">返回日期</div>
        <el-date-picker
          v-model="back_start_time"
          type="date"
          placeholder="选择日期"
          :editable="false"
          :picker-options="datepickerOptionsEnd1"/>
        <div class="label zhi">-</div>
        <el-date-picker
          v-model="back_end_time"
          type="date"
          placeholder="选择日期"
          :editable="false"
          :picker-options="datepickerOptionsEnd2"/>
      </div>
      <div class="search-item">
        <div class="label">团号</div>
        <el-input v-model="filters.tuan_no" placeholder="团号"/>
      </div>
      <div class="search-item">
        <div class="label">产品编号</div>
        <el-input v-model="filters.product_no" placeholder="产品编号"/>
      </div>
      <div class="search-item">
        <div class="label">团队名称</div>
        <el-input v-model="filters.tuan_name" placeholder="请输入关键字"/>
      </div>
      <div class="search-item">
        <div class="label">团队状态</div>
        <el-select v-model="filters.tuan_status" placeholder="请选择">
          <el-option label="全部" value="0"/>
          <el-option label="未出团" value="1"/>
          <el-option label="已出团" value="2"/>
          <el-option label="已回团" value="3"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">锁团状态</div>
        <el-select v-model="filters.lock_status" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option label="未锁团" value="0"/>
          <el-option label="已锁团" value="1"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">锁账状态</div>
        <el-select v-model="filters.lock_fund" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option label="未锁账" value="0"/>
          <el-option label="已锁账" value="1"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">行程天数</div>
        <el-input v-model="filters.trip_days"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="initPageFn(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="mode-table">
          <el-table :data="tableList" class="el-table--middle" border style="width: 100%">
            <el-table-column
              v-for="(col,idx) in cols"
              v-if="!col.template"
              :header-align="col.headeralign?col.headeralign:'center'"
              :align="col.align?col.align:''"
              :key="idx"
              :prop="col.prop"
              :label="col.label"
              :fixed="col.fixed"
              :formatter="col.formatter"
              :min-width="col.minwidth?col.minwidth:''"
              :width="col.width?col.width:''"
                :resizable="false"
            />
            <el-table-column
              v-else
              :header-align="col.headeralign?col.headeralign:'center'"
              :align="col.align?col.align:''"
              :prop="col.prop"
              :label="col.label"
              :fixed="col.fixed"
              :formatter="col.formatter"
              :min-width="col.minwidth?col.minwidth:''"
              :width="col.width?col.width:''"
               :resizable="false"
            >
              <template slot-scope="scope">
                <div v-if="col.label=='团号/团队名称'">
                  <p class="color-purple">
                    {{ scope.row.tuan_no }}
                    <template v-if="scope.row.lock_fund_name=='unlock_fund'">
                      <span v-if="scope.row.remain_info != ''" class="tag tag-purple">{{ scope.row.remain_info }}</span>
                    </template>
                    <span class="tag tag-green" v-if="scope.row.lock_status || scope.row.lock_fund">{{ scope.row.lock_fund ? '已锁账' : '已锁团' }}</span>
                  </p>
                  <!-- <p class="tuan_name" :title="scope.row.tuan_name"><strong>{{ scope.row.trip_days }}天</strong>  {{ scope.row.tuan_name }}</p> -->
                  <p>
                    <span class="color-orange">同行￥{{scope.row.peer_price}}</span>
                    <span>{{ scope.row.departure_date }}</span>
                    <span :class="scope.row.remain_num == 0 ? 'color-gray':'color-green'" v-if="scope.row.need_second_confirm == 0">余{{scope.row.remain_num}}位</span>
                    <span class="ecqr" v-else>二次确认</span>
                  </p>
                </div>
                <!-- <div v-if="col.label == '行程日期'">
                  <p>【出】{{ scope.row.departure_date }}</p>
                  <p>【回】{{ scope.row.back_date }}</p>
                </div> -->
                <div v-if="col.label == '行程编号／内容'">
                  <router-link v-if="scope.row.type == 3" :to="{path: 'tripDetail', query:{id: scope.row.product_id}}">
                    <p>{{scope.row.product_no}}</p>
                  </router-link>
                  <p v-else-if="scope.row.type == 2">{{scope.row.tuan_no}}</p>
                  <p v-else>{{scope.row.product_no}}</p>
                  <p v-if="scope.row.type != 2" class="ellipsis" :title="scope.row.product_name"><span class="mr10">{{ scope.row.trip_days }}天</span>{{ scope.row.product_name }}</p>
                  <p v-else  class="ellipsis" :title="scope.row.tuan_name"><span class="mr10">{{ scope.row.trip_days }}天</span>{{scope.row.tuan_name}}</p>
                </div>
                <div v-if="col.label == 'OP操作'">
                  <P class="ellipsis" :title="scope.row.op_name">{{ scope.row.op_name }}</P>
                </div>
                <!-- <div class="account_btns" v-if="col.label=='账单操作'"> -->
                <div v-if="col.label=='操作'">
                  <router-link v-if="$menuPermission('api/tuan/sale_add_order') && !scope.row.lock_status" :to="{path:'form',query:{id:scope.row.id,order_no:''}}">
                    同行下单
                  </router-link>
                  <router-link v-if="$menuPermission('api/tuan/sale_add_zhike_order') && !scope.row.lock_status" :to="{path:'form_zhike',query:{id:scope.row.id,order_no:''}}">
                    直客下单
                  </router-link><el-dropdown
                    v-if="$menuPermission('api/tuan/sale_tourist_lists,api/tuan/sale_order_lists,api/tuan/sale_op_log,api/finance/sale_bill_detail')"
                    trigger="click"
                  >
                    <span class="el-dropdown-link">查看<i class="el-icon-caret-bottom el-icon--right"/></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$menuPermission('api/tuan/sale_tourist_lists')">
                        <router-link :to="{path:'recruiting/' + scope.row.id}">游客名单</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('api/tuan/sale_tuan_order_lists')">
                        <router-link :to="{path:'tuan-order',query:{id:scope.row.id,lock_status:scope.row.lock_status}}">团队订单</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('api/tuan/sale_op_log')">
                        <router-link :to="{path:'operating/' + scope.row.id}">操作记录</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('api/finance/sale_bill_detail')">
                        <router-link :to="{path:'bill',query:{id:scope.row.id}}">团队账单</router-link>
                      </el-dropdown-item>
                      <!-- <el-dropdown-item>
                        <router-link :to="{path:'/control/',query:{id:scope.row.id}}">团队行程</router-link>
                      </el-dropdown-item> -->
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!--工具条-->
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="pagination.total_count"
        :page-size="pagination.page_size"
      />
    </div>

  </div>
</template>
<script>
import {
  getSaleGroupList
} from 'src/api/api';
import { formattDate} from 'src/assets/js/common.js';

export default {
  data() {
    return {
      filters: {
        start_time: '',
        end_time: '',
        tuan_no: '',
        product_no: '',
        tuan_name: '',
        tuan_status: '',
        lock_status: '',
        lock_fund: '',
        back_start_time: '',
        back_end_time: ''
      },
      filtersParams: {
        start_time: '',
        end_time: '',
        tuan_no: '',
        product_no: '',
        tuan_name: '',
        tuan_status: '',
        lock_status: '',
        lock_fund: '',
        back_start_time: '',
        back_end_time: ''
      },
      start_time: '',
      end_time: '',
      back_start_time: '',
      back_end_time: '',
      tableList: [],
      pagination: {
        total_count: 0,
        total_page: 0,
        page_size: 15,
        page_index: 1,
      },
      cols: [
        { prop: '', label: '团号/团队名称', width: '',minwidth:'300', template: true },
        // { prop: '', label: '行程日期', width: '140', template: true },
        { prop: '', label: '行程编号／内容', width: '300', template: true },
        // { prop: 'trip_days', label: '天数', width: '50',align:'center'},
        // { prop: 'plan_num', label: '计划位', width: '100', template: true , align: 'center'},
        // { prop: 'product_no', label: '产品编号', width: '120' , align: 'left'},
        { prop: '', label: 'OP操作', width: '80' , align: 'center', template: true},
        { prop: 'status_name', label: '团队状态', width: '80' , align: 'center'},
        { prop: 'lock_status', label: '操作', width: '250', template: true , align: 'center', fixed: "right"},
      ]
    };
  },
  computed:{
    datepickerOptions1(){
      let depart_date = this.start_time;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptions2(){
      let depart_date = this.end_time;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptionsEnd1(){
      let depart_date = this.back_end_time;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptionsEnd2(){
      let depart_date = this.back_start_time;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      };
    }
  },
  mounted() {
    this.initPageFn();
  },
  methods: {
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    initPageFn(bool) {
      if(bool){
        this.filtersParams = {... this.filters};
        this.filtersParams.start_time = this.start_time?formattDate(this.start_time):'';
        this.filtersParams.end_time = this.end_time?formattDate(this.end_time):'';
        this.filtersParams.back_start_time = this.back_start_time ? formattDate(this.back_start_time) : '';
        this.filtersParams.back_end_time = this.back_end_time ? formattDate(this.back_end_time) : '';

        this.pagination={
          total_count: 0,
          total_page: 0,
          page_size: 15,
          page_index: 1,
        };
      }else{
        this.filters = {... this.filtersParams};
        this.start_time = this.filtersParams.start_time;
        this.end_time = this.filtersParams.end_time;
        this.back_start_time = this.filtersParams.back_start_time ;
        this.back_end_time = this.filtersParams.back_end_time ;
      }

      this.filtersParams.page = this.pagination.page_index;
      if(this.$route.query.tuan_no){
        this.filters.tuan_no = this.$route.query.tuan_no;
      }

      getSaleGroupList({
        params: {data: this.filtersParams},
        success: (res) => {
          let asyncObj = res.data.data;
          this.tableList = asyncObj.data;
          this.pagination.total_count = parseInt(asyncObj.total_count, 10);
          this.pagination.total_page = parseInt(asyncObj.total_page, 10);
          this.pagination.page_size = parseInt(asyncObj.page_size, 10);
          this.pagination.page_index = parseInt(asyncObj.page_index, 10);
        },
        showLoading: true
      });
    },
    currentPageChange(val) {
      if(this.pagination.page_index != val){
        this.pagination.page_index = val;
        this.initPageFn();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tool a {
  display: inline-block;
  color: #20a0ff;
}

.account_btns {
  padding: 10px 0;
  .el-button {
    margin: 5px 0;
  }
}

.plancontent {
  font-size: 14px;
  color: #666;
  span {
    display: inline-block;
    width: 60px;
    text-align: right;
  }
}

.icon-more {
  color: #999;
  font-size: 16px;
  margin-left: 5px;
  vertical-align: middle;
}
.tuan_name{
  line-height: 20px;
  overflow : hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  // display: -webkit-box;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
}
.tag{
  color: #fff;
  padding: 2px;
  border-radius: 2px;
  font-size: 12px!important;
  vertical-align: 1px;
  white-space: nowrap;
  &.tag-purple{
    background: #b10c79;
  }
  &.tag-green{
    background: #019f3d;
  }
}
.mr10 {
  margin-right: 5px;
}
.ecqr{
  display: inline-block;
  color: #b10c79;
  border: 1px solid #b10c79;
  padding: 0 2px;
  border-radius: 2px;
  opacity: .7;
  font-size: 12px;
  line-height: 16px;
  transform: scale(0.85);
  vertical-align: 1px;
}
</style>
