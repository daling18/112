<template>
  <div class="hotelorder-wrap">
    <component :is="tabComponentName" name="hotel"></component>
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">订单状态</div>
          <el-select v-model="filter.order_status" clearable placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待付款" value="1"></el-option>
            <el-option label="待确认" value="2"></el-option>
            <el-option label="预订成功" value="3"></el-option>
            <el-option label="已取消" value="5"></el-option>
            <el-option label="退款中" value="6"></el-option>
            <el-option label="已退款" value="7"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单号</div>
          <el-input v-model="filter.order_id" placeholder="请输入订单号"></el-input>
        </div>
        <div class="search-item" v-if="orderType == 'SaleOrder'">
          <div class="label">代理商</div>
          <el-input v-model="filter.distributor_name" placeholder="请输入代理商名称"></el-input>
        </div>
         <div class="search-item" v-if="orderType == 'SelfSupportOrder' || orderType == 'SingeOrder'">
          <div class="label">供应商</div>
           <el-select v-model="filter.channel">
                  <el-option v-for="(item, index) in channelList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </div>
        <div class="search-item">
          <div class="label">联系人</div>
          <el-input v-model="filter.contact" placeholder="请输入联系人姓名"></el-input>
        </div>
        <div class="search-item">
          <div class="label">下单时间</div>
          <el-date-picker
            :class="'date-picker'"
            v-model="filter.date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <div class="search-item">
          <div class="label">入住时间</div>
          <el-date-picker
            :class="'date-picker'"
            v-model="filter.checkinDate"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <div class="search-item" v-if="orderType == 'SaleOrder' || orderType == 'ShopOrder'">
          <div class="label">销售人员</div>
          <el-input v-model="filter.distributor" placeholder="请输入销售人员"></el-input>
        </div>
        <div class="search-item" v-if="orderType == 'SaleOrder'">
          <div class="label">第三方流水号</div>
          <el-input v-model="filter.channel_req_no" placeholder="请输入第三方流水号"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="searchOrderHandler(1)">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <el-table
          :data="orderList"
          border
          tooltip-effect="light"
          style="width: 100%">
          <el-table-column
            header-align="center"
            align="center"
            label="订单号"
            width="240">
            <template slot-scope="prop">
              <span class="color-purple">[{{ prop.row.order_source_name }}]</span>
              {{ prop.row.order_id }}
            </template>
          </el-table-column>
          <el-table-column
            prop="hotel_name"
            header-align="center"
            label="酒店名称"
            width="200"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column
            prop="checkin_date"
            header-align="center"
            label="入住时间"
            width="200"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="right"
            label="订单金额">
            <template slot-scope="prop">
              <span class="color-orange">
                ￥{{ prop.row.total_price }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="right"
            label="已收">
            <template slot-scope="prop">
              <span class="color-orange">
                ￥{{ prop.row.rmb_receipted_amount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="right"
            label="未收">
            <template slot-scope="prop">
              <span class="color-orange">
                ￥{{ prop.row.rmb_unpaid_amount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="left"
            label="订单联系人"
            width="120">
            <template slot-scope="prop">
              {{ prop.row.contact_name }}
              <p>{{ prop.row.contact_mobile }}</p> 
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="订单状态">
            <template slot-scope="prop">
              {{ prop.row.order_status | getOrderStatusText }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="orderType == 'SaleOrder' || orderType == 'ShopOrder'"
            header-align="center"
            align="center"
            prop="distributor_name"
            :show-overflow-tooltip="true"
            width="100"
            label="销售人员">
          </el-table-column>
          <el-table-column
            v-if="orderType == 'SaleOrder'"
            header-align="center"
            align="center"
            prop="op_name"
            :show-overflow-tooltip="true"
            width="200"
            label="订单负责人">
          </el-table-column>
          <el-table-column
            prop="create_time"
            header-align="center"
            align="center"
            label="下单时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="distributor_name"
            header-align="center"
            align="center"
            label="代理商"
            width="80"
            v-if="$route.name !== 'ShoporderHotelorder'"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label='供应商' prop='supplier'></el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="prop">
              <!-- <router-link v-if="orderDetailPermission" :to="{ name: orderDetailName, query: { orderId: prop.row.order_id } }">查看</router-link> -->
              <router-link :to="{ name: orderDetailName, query: { orderId: prop.row.order_id } }">查看</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="orderList && orderList.length" class="page">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page_size"
          :page-count="total_page"
          :current-page="filter.page_index"
          :total="total_count"
           @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import MyOrderTab from './components/MyOrderTab.vue';
import SingleOrderTab from './components/SingleOrderTab.vue';
import SelfSupportOrderTab from './components/SelfSupportOrderTab.vue';
import * as format from "src/utils/format";
import { searchDistributionHolelMyOrderListAsyncRequest, searchDistributionHolelPurchaseOrderListAsyncRequest, searchDistributionHolelSingleOrderListAsyncRequest, searchDistributionHolelSelfSupportOrderListAsyncRequest,NewHotelOrderListAsyncRequest, getShopHotelOrderList} from 'src/api/hotel';
import { mergeApi } from "src/api/hotel.js";
export default {
  data () {
    return {
      orderList: null,
      filter: {
        order_status: "",
        distributor_name: "",
        order_id: "",
        contact: "",
        distributor:"",
        date: [],
        checkinDate: [],
        page_index: 1,
        channel: "0" // 供应商
      },
      total_count: 1,
      page_size: 1,
      channelList:[
      {
            id: "0",
            name: "全部"
        }
      ]
    }
  },
  filters:{
    getOrderStatusText(code){
      let str = '';
      code = code * 1;
      switch(code){
        case 1:
          str = '待付款';
          break;
        case 2:
          str = '待确认';
          break;
        case 3: 
          str = '预订成功';
          break;
        case 4:
          str = '预订失败';
          break;
        case 5: 
          str = '已取消';
          break;
        case 6:
          str = '退款中';
          break;
        case 7:
          str = '已退款';
          break;
      }
      return str;
    }
  },
  components: {
    MyOrderTab,
    SingleOrderTab,
    SelfSupportOrderTab
  },
  computed: {
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'HotelSaleOrder':
          type = 'SaleOrder';
          break;
        case 'HotelSingleOrder':
          type = 'SingeOrder';
          break;
        case 'HotelSelfSupportOrder':
          type = 'SelfSupportOrder';
          break;
        case 'ShoporderHotelorder':
          type = 'ShopOrder';
          break;
      }
      return  type;
    },
    tabComponentName(){
      let type = this.orderType,
          tabName = '';

      switch(type){
        // case 'SaleOrder':
        //   tabName = 'MyOrderTab';
        //   break;
        case 'SingeOrder':
          tabName = 'SingleOrderTab';
          break;
        case 'SelfSupportOrder':
          tabName = 'SelfSupportOrderTab';
          break;
      }
      return tabName
    },
    orderDetailPermission(){
      let type = this.orderType,
          permission = false;

      switch(type){
        case 'SaleOrder':
          permission = this.$menuPermission('saleorder/hotel/orderdet');
          break;
        case 'SingeOrder':
          permission = this.$menuPermission('singlepro/singleorder/hotel/orderdet');
          break;
        case 'SelfSupportOrder':
          permission = this.$menuPermission('singlepro/selforder/hotel/orderdet');
        case 'ShopOrder':
          permission = this.$menuPermission('shoporder/hotel/orderdet');
          break;
      }

      return permission
    },
    orderDetailName(){
      let type = this.orderType,
          routeName = '';
      switch(type){
        case 'SaleOrder':
          routeName = 'HotelSaleOrderDetail';
          break;
        case 'SingeOrder':
          routeName = 'HotelSingleOrderDetail';
          break;
        case 'SelfSupportOrder':
          routeName = 'HotelSelfSupportOrderDetail';
          break;
        case 'ShopOrder':
          routeName = 'ShoporderHotelorderDetail';
          break;
      }
      return routeName
    },
    getOrderListFun(){
      let type = this.orderType,
          fun = null;

      switch(type){
        case 'SaleOrder':
          fun = searchDistributionHolelMyOrderListAsyncRequest;
          break;
        case 'PurchaseOrder':
          fun = NewHotelOrderListAsyncRequest;
          break;
        case 'SingeOrder':
          fun = NewHotelOrderListAsyncRequest;
          break;
        case 'SelfSupportOrder':
          fun = NewHotelOrderListAsyncRequest;
          break;
        case 'ShopOrder':
          fun = getShopHotelOrderList;
          break;
      }
      return fun
    }
  },
  watch: {
    $route () {
      this.initOrderFilterHandler();
    }
  },
  methods: {
    initOrderFilterHandler(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filter = {
          order_status: "",
          order_id: "",
          contact: "",
          date: [],
          checkinDate: [],
          page_index: 1
        }
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        this.$set(this, 'filter', JSON.parse(filter));
      }
      this.searchHolelOrderAsyncRequestHanlder();
    },
    searchHolelOrderAsyncRequestHanlder(){
      let params = {
            data: JSON.parse(JSON.stringify(this.filter))
          };

      console.log(params['data'].checkinDate);
      console.log(params['data'].date);

      if(this.orderType == 'SingeOrder'){
        params['data'].type = 2;
        params['data'].contact_name = params['data'].contact;
      }else if(this.orderType == 'SelfSupportOrder'){
        params['data'].type = 1;
        params['data'].contact_name = params['data'].contact;
      }
      if(params['data'].date && params['data'].date.length && params['data'].date[0] && params['data'].date[1]){
        params['data'].start_date = format.date(params['data'].date[0]);
        params['data'].end_date = format.date(params['data'].date[1]);
      }else{
        params['data'].start_date = '';
        params['data'].end_date = '';
      }

      if(params['data'].checkinDate && params['data'].checkinDate.length && params['data'].checkinDate[0] && params['data'].checkinDate[1]){
        params['data'].check_in_date_start = format.date(params['data'].checkinDate[0]);
        params['data'].check_in_date_end = format.date(params['data'].checkinDate[1]);
      }else{
        params['data'].check_in_date_start = '';
        params['data'].check_in_date_end = '';
      }
      
      this.getOrderListFun({
        params: params,
        success: (params) => {
          let {code, data, msg} = params['data'];
          if(code == 0){
            this.orderList = data.order_list;
            this.page_size = data.page_size;
            this.total_count = data.total_count;
            this.total_page = data.total_page;
          }else{
            this.orderList = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    searchOrderHandler(page){
      let filter = this.filter;

      filter.page_index = page;
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    pageChange(page){
      this.searchOrderHandler(page);
    },
    async getSupplier() {
        let supplier = await mergeApi.getSupplier({type:this.orderType=='SelfSupportOrder'?"1":"2"});
        let { code, data, msg } = supplier;
        if (code != 0) return this.$message.error(msg);
        data.unshift({
            id: "0",
            name: "全部"
        });
        this.channelList = data.map(v=>{
          v.id=String(v.id)
          return v
        })
    }
  },
  mounted () {
    this.initOrderFilterHandler();
    this.getSupplier()
  }
}
</script>
<style lang="less" scoped>
  .hotelorder-wrap {
    .hotel-content {
      background-color: #fff;
      padding: 15px;
    }
    .hotel-table-wrap {
      margin-bottom: 25px;
      .el-table {
        border-top: 1px solid #dfe6ec;
        border-left: 1px solid #dfe6ec;
        &:before {
          height: 0px;
        }
        td {
          border: 0;
        }
        .tc {
          text-align: center;
        }
        .cell {
          word-break: normal;
        }
        .no-data {
          background-color: #fff;
          color: #999;
          padding: 10px 0;
          text-align: center;
          border-top: 1px solid #dfe6ec;
          border-bottom: 1px solid #dfe6ec;
        }
        tbody {
          tr {
            border-bottom: 1px solid #dfe6ec;
            &:last-child {
              border: 0;
            }
          }
        }
      }
    }
  }
  .date-picker{
    width: 200px;
  }
</style>


