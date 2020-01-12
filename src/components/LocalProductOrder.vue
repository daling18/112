<template>
<!-- application\index\view\dev\src\components\distribution\LocalProductOrder.vue -->
  <div class="wrapper">
    <component :is="tabComponent" name="localProduct" />
    <div class="system-search">
      <div class="clearfix">
        <search-item-date-range :label="'下单时间'" v-model="createTime" @change="handleChangeCreateTime"/>
        <div class="search-item">
          <div class="label">订单状态</div>
          <el-select v-model="searchInput.status" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option v-for="(val, key) in STATUS_MAP" :key="key" :label="val" :value="key"/>
          </el-select>
        </div>
        <div class="search-item" v-if="!isPurchase && !isSelfSupport">
          <div class="label">代理商</div>
          <el-input v-model="searchInput.distributor_name" placeholder="代理商"/>
        </div>
      </div>
      <div class="clearfix">
        <div class="search-item long">
          <div class="label">商品货号/名单</div>
          <el-input v-model="searchInput.search_product" placeholder="商品货号/名单"/>
        </div>
        <div class="search-item">
          <div class="label">订单号</div>
          <el-input v-model="searchInput.order_id" placeholder="订单号"/>
        </div>
        <div class="search-item">
          <div class="label">订单来源</div>
          <el-select v-model="searchInput.order_source" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option v-for="(val, key) in SOURCE_MAP" :key="key" :label="val" :value="key"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">销售人员</div>
          <el-input v-model="searchInput.operator_name" placeholder="销售人员"/>
        </div>
        <!-- 农特优wbg 190417 -->
        <div class="search-item">
          <div class="label">第三方订单</div>
          <el-select v-model="searchInput.three_from_id" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option v-for="(val, key) in THIRD_MAP" :key="key" :label="val" :value="key"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">第三方流水号</div>
          <el-input v-model="searchInput.channel_req_no" placeholder="请输入第三方流水号"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="handleSearch">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border tooltip-effect="light">
            <el-table-column
              label="订单号"
              align="center"
              width="220"
              :resizable="false"
            >
              <template slot-scope="scope">
                <span class="color-purple">[{{ scope.row.order_source }}]</span>
                {{ scope.row.order_id }}
              </template>
            </el-table-column>
            <el-table-column
              label="第三方订单号"
              align="center"
              width="220"
              :resizable="false"
            >
              <template slot-scope="scope">
                {{ scope.row.three_from_son_no }}
              </template>
            </el-table-column>
            <el-table-column
              label="商品货号/名称"
              align="center"
              width="180"
              prop="art_no"
              :resizable="false"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="color-purple">[{{ scope.row.art_no }}]</span>
                {{ scope.row.product_name }}
              </template>
            </el-table-column>
            <el-table-column
              label="订单金额"
              header-align="center"
              align="right"
              width="100"
              :resizable="false"
            >
              <template slot-scope="scope">
                <span class="color-orange">{{ scope.row.total_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!isPurchase"
              label="已收"
              header-align="center"
              align="right"
              width="100"
              :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">
                  {{ scope.row.rmb_receipted_amount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!isPurchase"
              label="未收"
              header-align="center"
              align="right"
              width="100"
              :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">
                  {{ scope.row.rmb_no_receipted_amount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="订单联系人"
              width="120"
              header-align="center"
              align="left"
              show-overflow-tooltip
              :resizable="false">
              <template slot-scope="scope">
                {{ scope.row.contact_name }}<br>
                {{ scope.row.contact_mobile }}
              </template>
            </el-table-column>
            <el-table-column
              label="订单状态"
              width="100"
              align="center"
              :resizable="false">
              <template slot-scope="scope">
                <span v-if="scope.row.refund_status == '1'">退款中</span>
                <span v-else :class="scope.row.status | getStatusColor">{{ STATUS_MAP[scope.row.status] }}</span>
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
              v-if="isPurchase"
              label="供应商"
              align="center"
              min-width="150"
              :resizable="false"
              prop="supplier_name"
              show-overflow-tooltip
            />
            <el-table-column
              v-else-if="isSelfSupport"
              label="代理商"
              align="center"
              :resizable="false"
            >
              <template slot-scope="scope">
                SCM
              </template>
            </el-table-column>
            <el-table-column
              v-else
              label="代理商/直客"
              align="center"
              min-width="150"
              :resizable="false"
              show-overflow-tooltip
              prop="distributor_name"
            />
            <el-table-column
              label="下单日期"
              align="center"
              width="100"
              :resizable="false">
              <template slot-scope="scope">
                <span class="color-gray">{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column 
              label="操作" 
              width="70" 
              align="center" 
              fixed="right">
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
    <div class="page" v-if="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>
<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange'
// import MyOrderTab from './components/MyOrderTab'
// import PurchaseOrderTab from './components/PurchaseOrderTab'
import SingleOrderTab from './components/SingleOrderTab.vue'
import SelfSupportOrderTab from './components/SelfSupportOrderTab'

import * as format from 'src/utils/format';

import{
  mySaleOrderLists,
  saleOrderLists,
  orderLists,
  selfLists
} from 'src/api/self_support.localproduct';

export default {
  components: {
    SearchItemDateRange,
    // MyOrderTab,
    SingleOrderTab,
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
  data () {
    const {query} = this.$route;

    return {
      STATUS_MAP: {},
      SOURCE_MAP: {},
      THIRD_MAP: {},
      searchInput: {
      },
      searchData: {
        begin_create_time: query.begin_create_time || '',
        end_create_time: query.end_create_time || '',
        search_product: query.search_product || '',
        order_id: query.order_id || '',
        status: query.status || '',
        order_source: query.order_source || '',
        three_from_id: query.three_from_id || '',
        distributor_name: query.distributor_name || '',
        page: parseInt(query.page) || 1,
        operator_name: query.operator_name || '',
        page_size: 10,
      },
      createTime: [query.begin_create_time, query.end_create_time],
      totalPage: parseInt(query.page) || 1,
      pageShow: false,
      tableData: []
    }
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.menu;
    },
    isPurchase () {
      return this.$route.meta && this.$route.meta.isPurchase;
    },
    isSelfSupport(){
      return this.topMenuConst == 'selfSupport';
    },
    tabComponent(){
      if(this.isPurchase){
        return 'purchase-order-tab';
      }else{ 
        switch(this.topMenuConst){
        case 'SingleproSingleorder':
          return 'single-order-tab';
        case 'SingleproSelforder':
          return 'self-support-order-tab';
        default:
          return '';
        }
      }
    },
    getOrderListFunc() {
      if(this.isPurchase){
        return saleOrderLists;
      }else{ 
        switch(this.topMenuConst){
        case 'SingleproSingleorder':
          return orderLists;
        case 'SingleproSelforder':
          return selfLists;
        default:
          return mySaleOrderLists;
        }
      }
    },
    orderDetailPerm() {
      switch(this.topMenuConst){
      case 'SingleproSingleorder':
        return this.$menuPermission('singlepro/singleorder/localproductorder/orderdet');
      case 'SingleproSelforder':
        return this.$menuPermission('singlepro/selforder/localproductorder/orderdet');
      case 'SaleorderLocalproductorder':
        return this.$menuPermission('saleorder/localproductorder/orderdet');
      default:
        return this.$menuPermission('api/selfsupport.localproductorder/detail');
      }
    },
    prefixPath(){
      if(this.isPurchase){
        return 'local-product-purchase-order/';
      }else{ 
        switch(this.topMenuConst){
        case 'SingleproSingleorder':
          return 'single-local-product-order/';
        case 'SingleproSelforder':
          return 'selfsupport-local-product-order/';
        default:
          return 'local-product-order/';
        }
      }
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      this.searchData.page_size = 10;

      this.getOrderListFunc({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.tableData = data.data.lists;
            this.STATUS_MAP = data.data.cfg_order_status || {};
            this.SOURCE_MAP = data.data.cfg_order_source || {};
            this.THIRD_MAP = data.data.cfg_order_three_from || {};
            this.totalPage = data.data.total_page;
            this.searchInput.page = data.data.page_index;
            this.pageShow = this.totalPage > 1;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleChangeCreateTime(date) {
      this.searchInput.begin_create_time = format.date(date[0]) || '';
      this.searchInput.end_create_time = format.date(date[1]) || '';
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.createTime = [this.searchData.begin_create_time, this.searchData.end_create_time];
        this.departmentDate = [this.searchData.departure_date_start, this.searchData.departure_date_end];
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .long {
    padding-left: 105px;
    .label {
      width: 90px;
      margin-left: -95px;
    }
  }
</style>
