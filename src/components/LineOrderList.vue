// src\components\distribution\LineOrder.vue
<template>
  <div class="wrapper">
    <!-- <my-order-tab v-if="!isPurchase" name="line" /> -->
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <search-item-date-range :label="'预订日期'" v-model="scheduledTime" @change="handleChangeScheduledTime"/>
      <div class="search-item" v-if="orderType != 'ShopOrderLine'">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.operator_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">团队编号</div>
        <el-input v-model="searchInput.tuan_no" placeholder="团队编号"/>
      </div>
      <div class="search-item" v-if="!isPurchase && orderType != 'ShopOrderLine'">
        <div class="label">代理商</div>
        <el-input v-model="searchInput.distributor_org_name" placeholder="代理商"/>
      </div>
      <div class="search-item" v-if="orderType == 'ShopOrderLine'">
        <div class="label">联系人</div>
        <el-input v-model="searchInput.contact_name" placeholder="联系人"/>
      </div>
      <div class="search-item" v-if="orderType == 'ShopOrderLine'">
        <div class="label">销售</div>
        <el-input v-model="searchInput.distributor" placeholder="销售"/>
      </div>
      <div class="search-item">
        <div class="label">订单状态</div>
        <el-select v-model="searchInput.confirm_status" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in CONFIRM_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item" v-if="!isShoping">
        <div class="label">定损状态</div>
        <el-select v-model="searchInput.loss_assess" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in LOSS_ASSESS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item" v-if="orderType != 'ShopOrderLine'">
        <div class="label">第三方流水号</div>
        <el-input v-model="searchInput.channel_req_no" placeholder="第三方流水号"/>
      </div>
      <search-item-date-range :label="'出团日期'" v-model="departureTime" @change="handleChangeDepartureTime"/>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch()">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table class="el-table--middle" :data="tableData" border style="width: 100%">
            <el-table-column label="订单编号" header-align="center" min-width="200" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis color-purple" :title="scope.row.order_no">
                  [{{ scope.row.order_from_name }}]{{ scope.row.order_no }}
                </div>
                <p class="ellipsis" :title="scope.row.distributor_org_name">{{ scope.row.distributor_org_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="行程编号/团号/名称" header-align="center" min-width="220" :resizable="false">
              <template slot-scope="scope">
                <div :title="scope.row.tuan_name">
                  <template v-if="scope.row.product_id === 0">
                    <span class="color-purple">{{ scope.row.tuan_no }}</span>
                  </template>
                  <template v-if="scope.row.product_id !== 0 && !isShoping">
                    <router-link :to="{path: prefixPath + 'trip-detail', query:{id: scope.row.product_id}}">
                      <p>{{ scope.row.product_no }}</p>
                    </router-link>
                  </template>
                  <!-- 兼容之前写法 -->
                  <p class="color-purple" v-if="isShoping">{{ scope.row.tuan_no }}</p> 
                  <p class="ellipsis color-gray">{{ scope.row.tuan_name }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="departure_date" label="出团日期" header-align="center" align="center" min-width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="">{{ scope.row.departure_date }}</span>                
              </template>
            </el-table-column>
            <el-table-column
              label="订单总金额"
              header-align="center"
              align="right"
              width="100"
              :resizable="false"
            >
              <template slot-scope="scope"><span class="color-orange">{{ scope.row.rmb_total_amount }}</span></template>
            </el-table-column>
            <el-table-column
            v-if="!isPurchase && !isShoping"
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
              v-if="!isPurchase && !isShoping"
              label="未收"
              header-align="center"
              align="right"
              width="100"
              :resizable="false">
              <template slot-scope="scope"><span class="color-orange">
                {{ scope.row.rmb_total_amount - scope.row.rmb_receipted_amount }}
              </span></template>
            </el-table-column>
            <el-table-column label="游客" header-align="center" min-width="100" :resizable="false">
              <template slot-scope="scope">
                <!-- <span v-if="scope.row.adult_num" :title="'成人' + scope.row.adult_num">成人{{ scope.row.adult_num }}</span>
                <span v-if="scope.row.child_num" :title="'儿童' + scope.row.child_num">儿童{{ scope.row.child_num }}</span> -->
                <span class="ellipsis" v-if="scope.row.tourist_info" :title="scope.row.tourist_info">{{ scope.row.tourist_info }}</span>
                <span v-if="isShoping" :title="'成人' + scope.row.adult_num">成人{{ scope.row.adult_num }}</span>
                <!-- 是否有退团 0没有 1有 -->
                <router-link
                  v-if="scope.row.is_tourist_cancel == 1"
                  :to="{ path: prefixPath + 'order-refund', query: {ono: scope.row.order_no, tid: scope.row.tuan_id}}">
                  [退]
                  <span v-if="scope.row.cancel_num != 0">
                    {{ scope.row.cancel_num }}
                  </span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              v-if="isPurchase"
              label="供应商"
              align="center"
              min-width="150"
              :resizable="false"
            >
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.supplier_org_name">
                  {{ scope.row.supplier_org_name }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="orderType == 'ShopOrderLine'"
              label="销售"
              align="center"
              min-width="150"
              :resizable="false"
            >
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.distribution">
                  {{ scope.row.distribution }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              label="代理商/直客"
              align="center"
              min-width="150"
              :resizable="false"
            >
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.distributor_org_name">
                  {{ scope.row.distributor_org_name }}
                </p>
              </template>
            </el-table-column>
            <el-table-column v-if="orderType != 'ShopOrderLine'" label="操作人" min-width="100" align="center" :resizable="false">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.operator_name">{{ scope.row.operator_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" width="100" align="center" :resizable="false">
              <template slot-scope="scope">
                <span :class="CONFIRM_STATUS_COLOR_MAP[scope.row.confirm_status]">{{ scope.row.confirm_status_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="预订日期" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-gray">{{ scope.row.scheduled_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="70" align="center" fixed="right">
              <template slot-scope="scope">
                <!-- <router-link v-if="orderDetailPerm" :to="prefixPath + 'order-detail/' + scope.row.tuan_no + '/' + scope.row.order_no">
                  查看
                </router-link> -->
                <router-link :to="prefixPath + 'order-detail/' + scope.row.tuan_no + '/' + scope.row.order_no + '?id='+ scope.row.id">查看</router-link>
                <!-- <span v-else> -- </span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page">
      <el-pagination layout="prev, pager, next" :current-page="searchInput.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>

import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import MyOrderTab from './components/MyOrderTab.vue';
// import PurchaseOrderTab from './components/PurchaseOrderTab.vue';
import{
  saleOrderList,
  salePurchaseOrderList,
  getOrderShopList
} from 'src/api/order';
import * as format from 'src/utils/format';

export default {
  name: 'LineOrder',
  components: {
    SearchItemDateRange,
    MyOrderTab,
    // PurchaseOrderTab
  },
  data() {
    const { query } = this.$route;

    return {
      CONFIRM_STATUS_MAP: {},
      CONFIRM_STATUS_COLOR_MAP: {
        0: '',
        1: '',
        2: 'color-green',
        '-1': 'color-gray'
      },
      LOSS_ASSESS_MAP: {},
      CHANNEL_MAP: {},
      ORDER_TYPE_MAP: {},
      searchInput: {
        // scheduled_time_start: '',
        // scheduled_time_end: '',
        // operator_name: '',
        // distributor_org_name: '',
        // confirm_status: '',
        // order_no: '',
        // tuan_no: '',
        // loss_assess: '',
        // page: 1,
        // page_size: 3,
      },
      searchData: {
        scheduled_time_start: query.scheduled_time_start || '',
        scheduled_time_end: query.scheduled_time_end || '',
        operator_name: query.operator_name || '',
        distributor_org_name: query.distributor_org_name || '',
        confirm_status: query.confirm_status || '',
        order_no: query.order_no || '',
        tuan_no: query.tuan_no || '',
        loss_assess: query.loss_assess || '',
        page: parseInt(query.page) || 1,
        distributor: query.distributor || '',
        contact_name: query.contact_name || ''
        // page_size: 3,
      },
      scheduledTime: [query.scheduled_time_start, query.scheduled_time_end],
      departureTime: [query.departure_date_start, query.departure_date_end],

      totalPage: parseInt(query.page) || 1,
      pageShow: false,
      tableData: []
    };
  },
  computed: {
    orderType (){ // 页面名称
      return this.$route.name;
    },
    isPurchase(){ // 采购订单
      return this.$route.name == 'PurchaseOrderLine';
    },
    isShoping() { // 店铺
      return this.$route.name === 'ShopOrderLine';
    },
    prefixPath(){
      return this.isPurchase ? 'line/' : 'line/';
    },
    getOrderListFunc() { // 数据获取函数
      switch(this.$route.name) {
      case 'TouristrouteLineOrderList':
        return saleOrderList
      case 'SaleorderLineOrder':
        return saleOrderList
      case 'PurchaseOrderLine':
        return salePurchaseOrderList
      case 'ShopOrderLine':
        return getOrderShopList
      default:
        return "";
      }
    },
    orderDetailPerm() { // 详情
      switch(this.$route.name) {
      case 'TouristrouteLineOrderList':
        return this.$menuPermission('touristroute/lineorder/lineorder/getorderdetail')
      case 'SaleorderLineOrder':
        return this.$menuPermission('saleorder/lineorder/getorderdetail')
      case 'PurchaseOrderLine':
        return this.$menuPermission('purchaseorder/lineorder/getorderdetail')
      case 'ShopOrderLine':
        return this.$menuPermission('shoporder/lineorder/getorderdetail')
      default:
        return false;
      }
    }
  },
  watch: {
    '$route.path' (path) {
      const query = this.$route.query;

      this.searchData = {
        scheduled_time_start: query.scheduled_time_start || '',
        scheduled_time_end: query.scheduled_time_end || '',
        departure_date_start: query.departure_date_start || '',
        departure_date_end: query.departure_date_end || '',
        operator_name: query.operator_name || '',
        distributor_org_name: query.distributor_org_name || '',
        confirm_status: query.confirm_status || '',
        order_no: query.order_no || '',
        tuan_no: query.tuan_no || '',
        loss_assess: query.loss_assess || '',
        page: parseInt(query.page) || 1,
        distributor: query.distributor || '',
        contact_name: query.contact_name || ''
        
        // page_size: 3,
      }
      this.departureTime = "";
      this.scheduledTime = "";
      this.totalPage = parseInt(query.page) || 1
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
            this.tableData = data.data.list;
            this.CONFIRM_STATUS_MAP = data.data.confirm_status_list;
            this.LOSS_ASSESS_MAP = data.data.loss_assess_list;
            this.CHANNEL_MAP = data.data.channel_list;
            this.ORDER_TYPE_MAP = data.data.order_type_list;
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
    handleChangeScheduledTime(date) {
      this.searchInput.scheduled_time_start = format.date(date[0]) || '';
      this.searchInput.scheduled_time_end = format.date(date[1]) || '';
    },
    handleChangeDepartureTime(date){
      this.searchInput.departure_date_start = format.date(date[0])|| '';
      this.searchInput.departure_date_end = format.date(date[1]) || '';
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.scheduledTime = [this.searchData.scheduled_time_start, this.searchData.scheduled_time_end];
        this.departureTime = [this.searchData.departure_date_start,this.searchData.departure_date_end];
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
