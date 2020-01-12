// src\components\distribution\VisaOrder.vue
<template>
  <div class="wrapper">
    <component v-if="!isSaleOrder" :is="tabComponent" name="qz" />
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range :label="'下单时间'" v-model="createTime" @change="handleChangeCreateTime"/>
      <div class="search-item">
        <div class="label">订单状态</div>
        <el-select v-model="searchInput.order_status" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in ORDER_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">代理商</div>
        <el-input v-model="searchInput.distributor_name" placeholder="代理商"/>
      </div>
      <search-item-date-range :label="'出发日期'" v-model="departmentDate" @change="handleChangeDepartmentDate"/>
      <div class="search-item">
        <div class="label">订单号</div>
        <el-input v-model="searchInput.order_id" placeholder="订单编号"/>
      </div>
      <div class="search-item">
        <div class="label">订单来源</div>
        <el-select v-model="searchInput.order_source" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in ORDER_SOURCE_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">签证名称</div>
        <el-input v-model="searchInput.visa_name" placeholder="签证名称"/>
      </div>
      <div class="search-item">
        <div class="label">销售人员</div>
        <el-input v-model="searchInput.operator_name" placeholder="销售人员"/>
      </div>
      <div class="search-item">
        <div class="label">第三方流水号</div>
        <el-input v-model="searchInput.channel_req_no" placeholder="请输入第三方流水号"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch()">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border tooltip-effect="light">
            <el-table-column
              label="订单编号"
              align="center"
              width="230"
              :resizable="false"
            >
              <template slot-scope="scope">
                <span class="color-purple">[{{ scope.row.order_source_name }}]</span>
                {{ scope.row.order_id }}
              </template>
            </el-table-column>
            <el-table-column
              label="签证名称"
              header-align="center"
              min-width="150"
              :resizable="false"
              prop="visa_name"
              show-overflow-tooltip
            />
            <el-table-column label="人数" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span v-if="scope.row.adult_num">{{ scope.row.adult_num }}成</span>
                <span v-if="scope.row.child_num">{{ scope.row.child_num }}童</span>
              </template>
            </el-table-column>
            <el-table-column
              label="订单金额"
              header-align="center"
              align="right"
              width="100"
              :resizable="false"
            >
              <template slot-scope="scope"><span class="color-orange">{{ scope.row.rmb_total_amount }}</span></template>
            </el-table-column>
            <el-table-column
              label="已收"
              header-align="center"
              align="right"
              width="100"
              :resizable="false">
              <template slot-scope="scope"><span class="color-orange">
                {{ scope.row.rmb_receipted_amount }}
              </span></template>
            </el-table-column>
            <el-table-column
              label="未收"
              header-align="center"
              align="right"
              width="100"
              :resizable="false">
              <template slot-scope="scope"><span class="color-orange">
                {{ scope.row.rmb_unreceipted_amount }}
              </span></template>
            </el-table-column>
            <el-table-column label="订单状态" width="100" align="center" :resizable="false">
              <template slot-scope="scope">
                <span :class="scope.row.order_status | getStatusColor">{{ scope.row.status_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="销售人员"
              align="center"
              min-width="100"
              :resizable="false"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.operator_name }}<template v-if="scope.row.order_org_name">/{{ scope.row.order_org_name }}</template>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!isSaleOrder"
              label="订单负责人"
              align="center"
              min-width="100"
              :resizable="false"
              prop="op_name"
              show-overflow-tooltip
            />
            <el-table-column label="出发日期" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-gray">{{ scope.row.departure_date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="下单日期" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-gray">{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="代理商/直客"
              align="center"
              min-width="150"
              :resizable="false"
              prop="distributor_name"
              show-overflow-tooltip
            />
            <el-table-column label="操作" width="70" align="center" fixed="right">
              <template slot-scope="scope">
                <router-link v-if="orderDetailPerm" :to="prefixPath + 'detail?order_id=' + scope.row.order_id">
                  查看
                </router-link>
                <span v-else> -- </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchInput.page_index" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>

import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
// import MyOrderTab from './components/MyOrderTab.vue';
import SingleOrderTab from './components/SingleOrderTab.vue';
// import PurchaseOrderTab from './components/PurchaseOrderTab.vue';
import SelfSupportOrderTab from './components/SelfSupportOrderTab.vue';
import * as format from 'src/utils/format';

import{
  orderList,
  opOrderList,
  // purchaseOrderList, // 单项没有采购订单
  opSelfOrderList
} from 'src/api/selfsupport.visa';

export default {
  name: 'VisaOrderList',
  components: {
    SearchItemDateRange,
    // MyOrderTab,
    SingleOrderTab,
    // PurchaseOrderTab,
    SelfSupportOrderTab
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 5:
        return 'color-green';
      case 6:
        return 'color-gray';
      default:
        return '';
      }
    },
  },
  data() {
    const { query } = this.$route;

    return {
      ORDER_STATUS_MAP: {},
      ORDER_SOURCE_MAP: {},
      searchInput: {
        // create_time_start: '',
        // create_time_end: '',
        // operator_name: '',
        // distributor_org_name: '',
        // order_status: '',
        // order_no: '',
        // tuan_no: '',
        // loss_assess: '',
        // page: 1,
        // page_size: 3,
      },
      searchData: {
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        departure_date_start: query.departure_date_start || '',
        departure_date_end: query.departure_date_end || '',
        visa_name: query.visa_name || '',
        order_id: query.order_id || '',
        customer_id: query.customer_id || '',
        order_status: query.order_status || '',
        order_source: query.order_source || '',
        distributor_name: query.distributor_name || '',
        operator_name: query.operator_name || '',
        page_index: parseInt(query.page_index) || 1,
        page_size: 10,
      },
      createTime: [query.create_time_start, query.create_time_end],
      departmentDate: [query.departure_date_start, query.departure_date_end],
      totalPage: parseInt(query.page_index) || 1,
      pageShow: false,
      tableData: []
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isSaleOrder(){
      return this.topMenuConst == 'saleorder';
    },
    isSingleOrder(){
      return this.$route.name == 'SingleproSingleVisaOrder';
    },
    tabComponent(){
      switch(this.topMenuConst){
      // case 'saleorder':
      //   return 'my-order-tab';
      case 'singlepro':
        if(this.isSingleOrder){
          return 'single-order-tab';
        }else{
          return 'self-support-order-tab'
        }
      default:
        return ''
      }
    },
    orderDetailPerm() {
      switch(this.topMenuConst) {
      case 'saleorder': 
        return this.$menuPermission('saleorder/visaorder/orderdet')
      case 'singlepro':
        if (this.isSingleOrder) {
          return this.$menuPermission('singlepro/singleorder/visaorder/orderdet')
        } else {
          return this.$menuPermission('singlepro/selforder/visaorder/orderdet')
        }
        break;
      default:
        return false;
      }
    },
    prefixPath(){
      switch(this.topMenuConst){
      case 'saleorder':
        return 'visa/';
      default:
        if(this.isSingleOrder){
          return 'single-visa-order/';
        }else{
          return 'selfsupport-visa-order/'
        }
      }
    },
    getOrderListFunc() {
      switch(this.topMenuConst){
      case 'saleorder':
        return orderList;
      default:
        if(this.isSingleOrder){
          return opOrderList;
        }else{
          return opSelfOrderList;
        }
      }
    }
  },
  watch: {
    '$route.path' (path) {
      this.searchData = {order_status: '', loss_assess: '', ... this.$route.query}
      this.totalPage = parseInt(this.$route.query.page_index) || 1,
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page_index = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      this.searchData.page_size = 10;

      this.getOrderListFunc({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.tableData = data.data.data;
            this.ORDER_STATUS_MAP = data.data.order_status_list;
            this.ORDER_SOURCE_MAP = data.data.order_source_list;
            this.totalPage = data.data.total_page;
            this.searchInput.page_index = data.data.page_index;
            this.pageShow = this.totalPage > 1;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleChangeCreateTime(date) {
      this.searchInput.create_time_start =format.date(date[0]) || '';
      this.searchInput.create_time_end = format.date(date[1]) || '';
    },
    handleChangeDepartmentDate(date) {
      this.searchInput.departure_date_start = format.date(date[0]) || '';
      this.searchInput.departure_date_end = format.date(date[1]) || '';
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page_index){
        this.searchData.page_index = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.departmentDate = [this.searchData.departure_date_start, this.searchData.departure_date_end];
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    }
  }
};
</script>

<style scoped lang="scss">
.system-search .search-item .long-label {
  width: 100px;
  margin-left: -80px;
  margin-right: 5px;
}
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
</style>
