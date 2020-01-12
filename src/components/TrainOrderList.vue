<template>
  <div class="hotelorder-wrap train-order-list">
    <component :is="tabComponentName" name="train"></component>
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">订单状态</div>
          <el-select v-model="filter.order_status" clearable placeholder="请选择状态">
            <el-option value>全部</el-option>
            <el-option
              v-for="item in ORDER_STATUS_CONFIG"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">下单日期</div>
          <el-date-picker v-model="filter.createDate" type="daterange" placeholder="选择日期范围"></el-date-picker>
        </div>
        <div class="search-item">
          <div class="label">出发日期</div>
          <el-date-picker v-model="filter.starDate" type="daterange" placeholder="选择日期范围"></el-date-picker>
        </div>
        <div class="search-item">
          <div class="label">订单分类</div>
          <el-select v-model="filter.order_style" clearable placeholder="请选择状态">
            <el-option value>全部</el-option>
            <el-option label="有退款" value="1"></el-option>
            <el-option label="有改签" value="2"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单来源</div>
          <el-select v-model="filter.order_source" clearable placeholder="请选择来源">
            <el-option value>全部</el-option>
            <el-option label="云平台" value="1"></el-option>
            <el-option label="官网" value="2"></el-option>
            <el-option label="APP" value="3"></el-option>
            <el-option label="小程序" value="4"></el-option>
            <el-option label="H5" value="5"></el-option>
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
          <div class="label">销售人员</div>
          <el-input v-model="filter.operator_name" placeholder="请输入销售人员"></el-input>
        </div>
        <div class="search-item">
          <div class="label">第三方流水号</div>
          <el-input v-model="filter.channel_req_no" placeholder="请输入第三方流水号"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="pageChange(1)">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column header-align="center" label="订单号" width="250">
            <template slot-scope="prop">
              <span class="color-purple">[{{ prop.row.order_source }}]</span>
              {{ prop.row.order_no }}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="车次"
            width="160"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="prop">
              <p>{{prop.row.train.station}}</p>
              <p>{{prop.row.train.date}}</p>
              <p>{{prop.row.train.checi}}</p>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" width="200" label="乘客">
            <template slot-scope="scope">
              <p v-for="(tour, key) in scope.row.tourist" :key="key">
                <template v-if="tour.refund_flag != 0">
                  <i class="icon-refund" @click="handleToOrderRefundDetail(scope.row.order_no)">退</i>
                </template>
                <template v-if="tour.change_flag != 0">
                  <i
                    v-if="tour.change_flag"
                    @click="handleToOrderDetail(scope.row.order_no)"
                    class="icon-change"
                  >改</i>
                </template>
                {{tour.passengersename}}
              </p>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="right" width="100" label="订单金额">
            <template slot-scope="prop">
              <span class="color-orange">￥{{ prop.row.total_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="right" label="已收">
            <template slot-scope="prop">
              <span class="color-orange">￥{{ prop.row.received_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="right" label="未收">
            <template slot-scope="prop">
              <span class="color-orange">￥{{ prop.row.need_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="order_status_name"
            header-align="center"
            align="center"
            label="订单状态"
          ></el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="user_name"
            width="150"
            label="销售人员"
          ></el-table-column>
          <!-- <el-table-column
            header-align="center"
            align="center"
            prop="op_name"
            width="200"
            label="订单负责人">
          </el-table-column>-->
          <el-table-column
            prop="create_time"
            header-align="center"
            align="center"
            label="下单时间"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="third_source"
            header-align="center"
            align="center"
            :label="orderType == 'MyOrder' ? '代理商' : '供应商'"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column fixed="right" header-align="center" align="center" label="操作">
            <template slot-scope="prop">
              <router-link
                v-if="permission.orderDetail"
                :to="{ name: orderTypeRouterName.orderDetailName, query: { orderNo: prop.row.order_no } }"
              >查看</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="orderList && orderList.length" class="page">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pagination.page_size"
          :page-count="pagination.total_page"
          :current-page="pagination.page_index"
          :total="pagination.total_count"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import MyOrderTab from "./components/MyOrderTab.vue";
import SingleOrderTab from "./components/SingleOrderTab.vue";
import * as format from "src/utils/format";
import {
  searchDistributionTrainMyOrderListAsyncRequest,
  searchDistributionTrainPurchaseOrderListAsyncRequest,
  searchDistributionTrainSingleOrderListAsyncRequest
} from "src/api/train";

const ORDER_STATUS_CONFIG = [
  {
    id: 1,
    label: "占座中"
  },
  {
    id: 2,
    label: "待付款"
  },
  {
    id: 3,
    label: "待出票"
  },
  {
    id: 5,
    label: "已出票"
  },
  {
    id: 6,
    label: "已取消"
  },
  {
    id: 7,
    label: "已支付"
  },
  {
    id: 8,
    label: "正在取消"
  },
  {
    id: 9,
    label: "已支付"
  }
];

export default {
  data() {
    return {
      orderList: null,
      filter: {
        order_status: "",
        order_style: "",
        order_source: "",
        key_word: "",
        agent_name: "",
        operator_name: "",
        starDate: [],
        createDate: []
      },
      ORDER_STATUS_CONFIG,
      pagination: {
        page_index: 1,
        page_size: 10,
        total_count: 0,
        total_page: 0
      }
    };
  },
  filters: {
    getColorOfTouristStatus(code) {
      let str = "";
      switch (code) {
        case 1:
          str = "待付款";
          break;
        case 2:
          str = "待确认";
          break;
        case 3:
          str = "预定成功";
          break;
        case 4:
          str = "预定失败";
          break;
        case 5:
          str = "已取消";
          break;
        case 6:
          str = "退款中";
          break;
        case 7:
          str = "已退款";
          break;
      }
      return str;
    }
  },
  components: {
    MyOrderTab,
    SingleOrderTab
  },
  computed: {
    orderType() {
      let routeName = this.$route.name,
        type = "";
      switch (routeName) {
        case "TrainSaleOrder":
          type = "SaleOrder";
          break;
        case "TrainSingleOrder":
          type = "SingleOrder";
          break;
      }
      return type;
    },
    tabComponentName() {
      let type = this.orderType,
        tabName = "";

      switch (type) {
        // case 'SaleOrder':
        //   tabName = 'MyOrderTab';
        //   break;
        case "SingleOrder":
          tabName = "SingleOrderTab";
          break;
      }
      return tabName;
    },
    orderTypeRouterName() {
      let type = this.orderType,
        configType = "",
        orderRefundDetailName = "",
        orderDetailName = "";

      switch (type) {
        case "SaleOrder":
          orderRefundDetailName = "TrainSaleOrderRefundDetail";
          orderDetailName = "TrainSaleOrderDetail";
          configType = 19;
          break;
        case "SingleOrder":
          orderRefundDetailName = "TrainSingleOrderRefundDetail";
          orderDetailName = "TrainSingleOrderDetail";
          configType = 6;
          break;
      }
      return {
        orderRefundDetailName,
        orderDetailName,
        configType
      };
    },
    permission() {
      let type = this.orderType,
        permission = {
          orderDetail: false,
          refundDetail: false
        };

      switch (type) {
        case "SaleOrder":
          permission.orderDetail = this.$menuPermission(
            "saleorder/train/orderdet"
          );
          permission.refundDetail = this.$menuPermission(
            "saleorder/train/refunddet"
          );
          break;
        case "SingleOrder":
          permission.orderDetail = this.$menuPermission(
            "singlepro/singleorder/train/orderdet"
          );
          permission.refundDetail = this.$menuPermission(
            "singlepro/singleorder/train/refunddet"
          );
          break;
      }

      return permission;
    },
    getOrderListFun() {
      let type = this.orderType,
        fun = null;

      switch (type) {
        case "SaleOrder":
          fun = searchDistributionTrainMyOrderListAsyncRequest;
          break;
        case "SingleOrder":
          fun = searchDistributionTrainSingleOrderListAsyncRequest;
          break;
      }
      return fun;
    }
  },
  watch: {
    $route() {
      this.initOrderFilterHandler();
    }
  },
  methods: {
    initOrderFilterHandler() {
      let query = Object.assign({}, this.$route.query),
        filter = query.filter;
      if (!filter) {
        this.filter = {
          order_status: "",
          order_id: "",
          contact: "",
          starDate: [],
          createDate: [],
          page_index: this.pagination.page_index,
          page_size: this.pagination.page_size
        };
      } else {
        filter = window.decodeURIComponent(window.atob(filter));
        this.$set(this, "filter", JSON.parse(filter));
      }
      this.searchHolelOrderAsyncRequestHanlder();
    },
    searchHolelOrderAsyncRequestHanlder() {
      let params = JSON.parse(JSON.stringify(this.filter));

      if (params.starDate && params.starDate.length) {
        params.start_time_start = format.date(params.starDate[0]);
        params.start_time_end = format.date(params.starDate[1]);
      }
      if (params.createDate && params.createDate.length) {
        params.create_time_start = format.date(params.createDate[0]);
        params.create_time_end = format.date(params.createDate[1]);
      }
      this.getOrderListFun({
        params: {
          data: params
        },
        success: params => {
          let { code, data, msg } = params["data"];
          if (code == 0) {
            this.orderList = data.list;
            this.pagination.page_index = data.page_index;
            this.pagination.page_size = data.page_size;
            this.pagination.total_count = parseInt(data.total_count);
            this.pagination.total_page = data.total_page;
          } else {
            this.orderList = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    searchOrderHandler(page) {
      let filter = this.filter;

      filter.page_index = this.pagination.page_index;
      filter.page_size = this.pagination.page_size;
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    pageChange(page) {
      this.pagination.page_index = page;
      this.searchOrderHandler(page);
    },
    handleToOrderRefundDetail(orderNo) {
      if (!this.permission.refundDetail) return;
      this.$router.push({
        name: this.orderTypeRouterName.orderRefundDetailName,
        query: {
          orderNo
        }
      });
    },
    handleToOrderDetail(orderNo) {
      this.$router.push({
        name: this.orderTypeRouterName.orderDetailName,
        query: {
          orderNo
        }
      });
    }
  },
  mounted() {
    this.initOrderFilterHandler();
  }
};
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
        height: auto;
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
.date-picker {
  width: 200px !important;
}
.icon-refund {
  padding: 1px 2px;
  background-color: green;
  color: #fff;
  font-style: normal;
  border-radius: 2px;
  cursor: pointer;
}
.icon-change {
  padding: 1px 2px;
  background-color: red;
  color: #fff;
  font-style: normal;
  border-radius: 2px;
  cursor: pointer;
}
</style>


<style lang="scss">
.train-order-list {
  .el-table {
    .cell {
      max-height: none;
    }
  }
}
</style>