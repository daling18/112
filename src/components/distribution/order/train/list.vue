<template>
  <div class="hotelorder-wrap">
    <template v-if="getOrderOption.type == 'MyOrder'">
      <my-order-tab name="train"></my-order-tab>
    </template>
    <template v-else>
      <purchase-order-tab name="train"></purchase-order-tab>
    </template>
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">订单状态</div>
          <el-select v-model="filter.order_status" clearable placeholder="请选择状态">
            <el-option v-for="(name, val) in ORDER_STATUS_CONFIG" 
                       :key="val" 
                       :label="name" 
                       :value="val"></el-option>
          </el-select>
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
          <div class="label">订单分类</div>
          <el-select v-model="filter.order_style" clearable placeholder="请选择状态">
            <el-option label="有退款" value="1"></el-option>
            <el-option label="有改签" value="2"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">关键词</div>
          <el-input v-model="filter.key_word" placeholder="请输入订单号/乘客姓名"></el-input>
        </div>
        <div class="search-item">
          <div class="label">代理商</div>
          <el-input v-model="filter.agent_name" placeholder="请选择代理商"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="searchOrderHandler(1)">搜索</el-button>
        </div>
      </div>
    </div>
    {{orderList}}
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <el-table
          :data="orderList"
          style="width: 100%">
          <el-table-column
            prop="order_no"
            header-align="center"
            label="订单号"
            width="200">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="车次"
            width="120"
            :show-overflow-tooltip="true">
            <template slot-scope="prop">
              {{ prop.row.from_station_name + '-' + prop.row.to_station_name }}
              <p>{{ prop.row.arrive_time }}</p>
              {{ prop.row.checi }}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="100"
            label="乘客">
            <template slot-scope="prop">
              <p v-for="(tourist, key) in prop.row.tourist" :key="key">
                {{ tourist.passengersename }}
                <template v-if="tourist.refund_flag">
                  <i class="icon-refund">退</i>
                </template>
                <template v-else>
                  <i v-if="tourist.change_flag" class="icon-change">改</i>
                </template>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="total_amount"
            header-align="center"
            align="right"
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop="receipted_amount"
            header-align="center"
            align="right"
            label="已收">
          </el-table-column>
          <el-table-column
            prop="receipted_amount"
            header-align="center"
            align="right"
            label="未收">
          </el-table-column>
          <el-table-column
            prop="order_status_name"
            header-align="center"
            align="center"
            label="订单状态">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="op_name"
            width="150"
            label="销售人员">
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
            :label="getOrderOption.type == 'MyOrder' ? '代理商' : '供应商'"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="prop">
              <router-link :to="{ name: getOrderOption.detailRouteName, query: { orderId: prop.row.id } }">查看</router-link>
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
import MyOrderTab from 'src/components/distribution/components/MyOrderTab.vue';
import PurchaseOrderTab from 'src/components/distribution/components/PurchaseOrderTab.vue'
import * as format from "src/utils/format";
import { searchDistributionTrainMyOrderListAsyncRequest, searchDistributionTrainPurchaseOrderListAsyncRequest } from 'src/api/train';

export default {
  data () {
    return {
      orderList: null,
      filter: {
        order_status: "",
        order_style: "",
        key_word: "",
        agent_name: "",
        date: [],
        page_index: 1
      },
      total_count: 1,
      page_size: 1,
      ORDER_STATUS_CONFIG: null
    }
  },
  filters:{
    getColorOfTouristStatus(code){
      let str = '';
      switch(code){
        case 1:
          str = '待付款';
          break;
        case 2:
          str = '待确认';
          break;
        case 3: 
          str = '预定成功';
          break;
        case 4:
          str = '预定失败';
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
  components:{
    MyOrderTab,
    PurchaseOrderTab
  },
  computed: {
    getOrderOption(){
      let routeName = this.$route.name,
          type,
          detailRouteName,
          requestFn;
      switch(routeName){
        case 'DistributionTrainMyOrder':
          type = 'MyOrder';
          detailRouteName = 'DistributionTrainMyOrderDetail';
          requestFn = searchDistributionTrainMyOrderListAsyncRequest;
          break;
        case 'DistributionTrainPurchaseOrder':
          type = 'PurchaseOrder';
          detailRouteName = 'DistributionTrainPurchaseOrderDetail';
          requestFn = searchDistributionTrainPurchaseOrderListAsyncRequest;
          break;
      }
      return {
        type,
        detailRouteName,
        requestFn
      }
    }
  },
  watch:{
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
      if(params['data'].date.length){
        params['data'].start_time_start = format.date(params['data'].date[0]);
        params['data'].start_time_end = format.date(params['data'].date[1]);
      }
      this.getOrderOption.requestFn({
        params: params,
        success: (params) => {
          let {code, data, msg} = params['data'];
          if(code == 0){
            this.orderList = data.data;
            this.page_size = data.page_size;
            this.total_count = data.total_count;
            this.total_page = data.total_page;
            this.ORDER_STATUS_CONFIG = data.order_status_config;
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
    }
  },
  mounted () {
    this.initOrderFilterHandler();
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
  .icon-refund{
    padding: 1px 2px;
    background-color: green;
    color: #fff;
    font-style: normal;
    border-radius: 2px;
  }
  .icon-change{
    padding: 1px 2px;
    background-color: red;
    color: #fff;
    font-style: normal;
    border-radius: 2px;
  }
</style>


