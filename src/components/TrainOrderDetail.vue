<template>
  <div class="el-tabs el-tabs--border-card">
    <div class="el-tabs__header">
      <div class="el-tabs__nav-wrap">
        <div class="el-tabs__nav">
          <div class="el-tabs__item is-active">订单详情</div>
          <div
            v-if="permission.refundDetail && orderDetail && orderDetail.refund_show"
            class="el-tabs__item"
            @click="$router.push({ name: orderTypeRouterName.orderRefundDetailName, query: { orderNo: $route.query.orderNo }})"
          >退款详情</div>
        </div>
      </div>
    </div>
    <div class="el-tabs__content">
      <div class="wrapper">
        <div v-if="orderDetail" class="train-detail">
          <div class="panel">
            <div class="hd">
              <h2>订单信息</h2>
              <span>
                <span
                  v-if="orderDetail.order_info.pay_type"
                >支付渠道：{{orderDetail.order_info.pay_type}}</span>
                <span
                  v-if="orderDetail.order_info.trade_order_id"
                >第三方流水号：{{orderDetail.order_info.trade_order_id}}</span>
              </span>
            </div>
            <div class="bd">
              <div class="order-tips">
                <span
                  class="third-order"
                  v-if="orderDetail.order_info.transaction_id"
                >第三方订单号：{{ orderDetail.order_info.transaction_id }}</span>
                <p class="timer" v-if="overTime > 0">请在{{countDown}}分钟内支付订单，未准时支付，订单会自动关闭</p>
              </div>
              <el-table :data="[orderDetail.order_info]" style="width: 100%" border>
                <el-table-column align="center" label="支付渠道" prop="pay_type"></el-table-column>
                <el-table-column
                  align="center"
                  label="第三方流水号"
                  min-width="250"
                  prop="trade_order_id"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="第三方订单号"
                  min-width="250"
                  prop="transaction_id"
                ></el-table-column>
                <el-table-column align="center" prop="order_no" label="订单号" width="200">
                  <template slot-scope="scope">
                    <div class="color-purple">{{scope.row.order_source_name}}</div>
                    {{scope.row.order_no}}
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="create_time" min-width="180" label="下单时间"></el-table-column>
                <el-table-column align="center" prop="total_amount" label="订单总金额"></el-table-column>
                <el-table-column align="center" prop="coupon_amount" label="优惠金额"></el-table-column>               
                <el-table-column align="center" prop="received_amount" label="已收金额"></el-table-column>
                <!-- <el-table-column align="center" prop="need_amount" label="未收金额" ></el-table-column> -->
                <el-table-column align="center" prop="third_source" label="结算方"></el-table-column>
                <el-table-column align="center" prop="order_status_name" label="订单状态"></el-table-column>
                <el-table-column align="center" prop="date" label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-dropdown v-if="scope.row.button.length != 0" @command="handleOrder">
                      <span class="el-dropdown-link">
                        操作
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="button in scope.row.button"
                          :key="button.code"
                          :command="{
                            command: button.code,
                            data: scope.row
                          }"
                        >{{button.value}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <span v-else>--</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>订单价格明细</h2>
            </div>
            <div class="bd">
              <div class="detail-total">
                <div class="detail">
                  <span>结算币种 / 汇率：人民币 / 1</span>
                  <span v-if="orderDetail.total_detail_price">
                    结算总金额：
                    <i>{{ orderDetail.total_detail_price }}</i>
                  </span>
                  <span v-if="orderDetail.total_detail_price">
                    本位币：
                    <i>{{ orderDetail.total_detail_price }}</i>
                  </span>
                </div>
              </div>
              <el-table :data="orderDetail.price_detail" border>
                <el-table-column align="center" prop="product" label="项目"></el-table-column>
                <el-table-column align="center" prop="unit_price" label="单价（本位币)"></el-table-column>
                <el-table-column align="center" prop="total_price" label="结算单价"></el-table-column>
                <el-table-column align="center" prop="number" label="数量" width="110"></el-table-column>
                <el-table-column align="center" prop="remark" label="备注"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>乘客信息</h2>
            </div>
            <div class="bd">
              <!-- <el-table
                :data="orderDetail.tourist"
                style="width: 100%"
                @selection-change="handleTouristSelectionChange"
              >-->
              <el-table :data="orderDetail.tourist" style="width: 100%">
                <!-- <el-table-column
                  v-if="permission.changeOrder"
                  type="selection"
                  :selectable="handleTouristSelectable"
                  width="55"
                ></el-table-column>-->
                <el-table-column label="取票号" align="center" prop="ordernumber"></el-table-column>
                <el-table-column header-align="center" align="center" label="车次信息" width="200">
                  <template slot-scope="prop">
                    <p>{{ prop.row.train_mag.station }}</p>
                    <p>{{ prop.row.train_mag.date }}</p>
                    <p>{{ prop.row.train_mag.checi }}</p>
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="席位信息">
                  <template slot-scope="prop">
                    <p>{{ prop.row.cxin }}</p>
                    {{ prop.row.zwname }}
                  </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="旅客信息">
                  <template slot-scope="prop">
                    <p>{{ prop.row.passengersename }}</p>
                    <!-- {{ prop.row.zwname }} -->
                  </template>
                </el-table-column>
                <el-table-column prop="piaotype" header-align="center" align="center" label="票种"></el-table-column>
                <el-table-column prop="price" header-align="center" align="center" label="票款金额"></el-table-column>
                <el-table-column
                  prop="ticket_status"
                  header-align="center"
                  align="center"
                  label="车票状态"
                ></el-table-column>
                <el-table-column header-align="center" align="center" label="操作">
                  <template slot-scope="scope">
                    <el-dropdown v-if="scope.row.button.length != 0" @command="handleOrder">
                      <span class="el-dropdown-link">
                        操作
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="button in scope.row.button"
                          :key="button.code"
                          :command="{
                            command: button.code,
                            data: scope.row
                          }"
                        >{{button.value}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <span v-else>--</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>联系人</h2>
            </div>
            <div class="bd">
              <el-table :data="[orderDetail.contact]" border>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="手机" prop="telphone"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>订单记录</h2>
            </div>
            <div class="bd">
              <el-table border :data="orderDetail.log">
                <el-table-column label="时间" prop="create_time"></el-table-column>
                <el-table-column label="操作说明" prop="remark"></el-table-column>
                <el-table-column label="订单状态" prop="op_type"></el-table-column>
                <el-table-column label="操作人" prop="op_user_name"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <add-shoukuan-dialog :visible.sync="shoukunDialogVisible"></add-shoukuan-dialog>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="cancelTicketVisable"
      @close="handleCloseCancelTicketDialog"
      size="tiny"
    >
      <div class="refund-info">
        <h2>您确定要退票吗？</h2>
        <p>
          <span>车票款：</span>
          <strong>￥{{ this.cancelTicketInfo.price }}</strong>
        </p>
        <p>
          <span>预计手续费：</span>
          <strong>￥{{ this.cancelTicketInfo.guess_refund_service_fee }}</strong>
        </p>
        <p>
          <span>优惠券金额：</span>
          <strong>￥{{this.cancelTicketInfo.coupon_amount}}</strong>
        </p>
        <p>
          <span>预计退款金额：</span>
          <strong>￥{{ this.cancelTicketInfo.guess_refund_price }}</strong>
        </p>
        <p class="refund-info-tips">*退票手续费及最终退款金额以铁路部门实退为准</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseCancelTicketDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitCancelTicketForm">确 定</el-button>
      </span>
    </el-dialog>
    <online-pay
      v-if="permission.onlinePay"
      ref="onlinePay"
      :order-id="orderNo"
      order-resource="1"
      :amount="amount"
      :backUrl="`saleorder/train/detail?orderNo=${orderNo}`"
      :customParams="changeNo"
    />
    <change-order-operator
      v-if="permission.setOperation"
      ref="operator"
      order-type="4"
      @change-success="getTrainOrderDetailHandler"
    ></change-order-operator>
  </div>
</template>
<script>
import OnlinePay from "src/components/components/newOnlinePay.vue";
import AddShoukuanDialog from "./components/AddShoukuanDialog.vue";
import ChangeOrderOperator from "src/plugins/ChangeOrderOperator.vue";
import {
  getDistributionTrainOrderDetailAsyncRequest,
  cancelDistributionTrainOrderAsyncRequest,
  changeDistributionTrainFromAsyncRequest,
  cancelDistributionChangeTrainAsyncRequest,
  confirmDistributionChangeTrainAsyncRequest,
  cancelDistributionTrainTicketAsyncRequest
} from "src/api/train";
import Qs from "qs";
export default {
  data() {
    return {
      orderNo: "",
      orderDetail: null,
      orderInfo: null,
      pricingForm: [],
      changeNo: "",
      shoukunDialogVisible: false,
      touristSelection: [],
      cancelTicketVisable: false,
      cancelTicketInfo: {
        passengerid: null,
        price: null,
        guess_refund_price: null,
        guess_refund_service_fee: null
      },
      overTime: null
    };
  },
  filters: {
    formatDateDay: date => {
      let day = new Date(date).getDay(),
        formattxt = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
      return formattxt[day];
    },
    getOrderStatusText(code) {
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
  computed: {
    countDown() {
      if (this.overTime <= 0) {
        return "";
      }
      let time = this.overTime || 0,
        minute = Math.floor(time / 60),
        seconds = time % 60;

      return minute + "分" + seconds + "秒";
    },
    amount() {
      if (!this.orderDetail || !this.orderDetail.order_info.need_amount) {
        return 0;
      }
      return this.orderDetail.order_info.need_amount;
    },
    orderType() {
      let routeName = this.$route.name,
        type = "";
      switch (routeName) {
        case "TrainSaleOrderDetail":
          type = "SaleOrder";
          break;
        case "TrainSingleOrderDetail":
          type = "SingleOrder";
          break;
        case "financeTrainMyOrderDetail":
          type = "financeRefund";
          break;
      }
      return type;
    },
    permission() {
      let type = this.orderType,
        permission = {
          onlinePay: false,
          cancelOrder: false,
          orderRefund: false,
          changeOrder: false,
          dtlCollection: false,
          refundDetail: false,
          setOperation: false
        };

      switch (type) {
        case "SaleOrder":
          permission.onlinePay = this.$menuPermission(
            "saleorder/train/onlinepay"
          );
          permission.cancelOrder = this.$menuPermission(
            "saleorder/train/cancelorder"
          );
          permission.orderRefund = this.$menuPermission(
            "saleorder/train/aplrefundtic"
          );
          permission.changeOrder = this.$menuPermission(
            "saleorder/train/aplchgtic"
          );
          permission.dtlCollection = this.$menuPermission(
            "saleorder/train/getincodet"
          );
          permission.refundDetail = this.$menuPermission(
            "saleorder/train/refunddet"
          );
          break;
        case "SingleOrder":
          permission.cancelOrder = this.$menuPermission(
            "singlepro/singleorder/train/cancelorder"
          );
          permission.orderRefund = this.$menuPermission(
            "singlepro/singleorder/train/aplrefund"
          );
          permission.changeOrder = this.$menuPermission(
            "singlepro/singleorder/train/aplchg"
          );
          permission.dtlCollection = this.$menuPermission(
            "singlepro/singleorder/train/getincodet"
          );
          permission.refundDetail = this.$menuPermission(
            "singlepro/singleorder/train/refunddet"
          );
          permission.setOperation = this.$menuPermission(
            "singlepro/singleorder/train/orderprin"
          );
          break;
      }

      return permission;
    },
    orderTypeRouterName() {
      let type = this.orderType,
        configType = "",
        orderRefundDetailName = "",
        orderIncomeDetailName = "";

      switch (type) {
        case "SaleOrder":
          orderRefundDetailName = "TrainSaleOrderRefundDetail";
          orderIncomeDetailName = "TrainSaleOrderIncomeDetail";
          configType = 21;
          break;
        case "SingleOrder":
          orderRefundDetailName = "TrainSingleOrderRefundDetail";
          orderIncomeDetailName = "TrainSingleOrderIncomeDetail";
          configType = 8;
          break;
        case "financeRefund":
          orderRefundDetailName = "financeHotelMyOrderRefundDetail";
          orderIncomeDetailName = "DistributionTrainMyOrderIncomeDetail";
          configType = 21;
          break;
      }
      return {
        orderRefundDetailName,
        orderIncomeDetailName,
        configType
      };
    }
  },
  components: {
    AddShoukuanDialog,
    OnlinePay,
    ChangeOrderOperator
  },
  methods: {
    getTrainOrderDetailHandler() {
      let params = {
        data: {
          order_no: this.orderNo
        }
      };
      getDistributionTrainOrderDetailAsyncRequest({
        params: params,
        success: res => {
          let { code, data, msg } = res["data"];
          if (code == 0) {
            this.orderDetail = data;
            this.overTime = data.count_down_time;
            this.handleCountDown();
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCountDown() {
      let countDown = setInterval(() => {
        if (this.overTime == 0) {
          clearInterval(countDown);
        }
        this.overTime--;
      }, 1000);
    },
    addPricingHandler() {
      this.pricingForm.push({});
    },
    handleCancelTrainOrder() {
      this.$confirm(`您确定要取消该订单吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          data: {
            order_no: this.orderNo
          }
        };
        cancelDistributionTrainOrderAsyncRequest({
          params,
          success: params => {
            let { code, data, msg } = params["data"];
            if (code == 0) {
              this.$message.success(msg);
              this.getTrainOrderDetailHandler();
            } else {
              this.$message.error(msg);
            }
          }
        });
      });
    },
    handleCancelTrainTicket(passengerInfo) {
      let { tourist_id, price, coupon_amount } = passengerInfo;
      let guess_refund_price = passengerInfo.refund_amount;
      let guess_refund_service_fee = passengerInfo.service_charge;
      this.$set(this, "cancelTicketInfo", {
        passengerid: tourist_id,
        price,
        guess_refund_price,
        guess_refund_service_fee,
        coupon_amount
      });
      this.cancelTicketVisable = true;
    },
    handleSubmitCancelTicketForm() {
      let params = {
        data: {
          tourist_id: this.cancelTicketInfo.passengerid,
          order_no: this.orderDetail.order_info.order_no
        }
      };
      cancelDistributionTrainTicketAsyncRequest({
        params,
        success: params => {
          let { code, data, msg } = params["data"];
          if (code == 0) {
            this.cancelTicketVisable = false;
            this.getTrainOrderDetailHandler();
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCloseCancelTicketDialog() {
      this.$set(this, "cancelTicketInfo", {
        passengerid: null,
        price: null,
        guess_refund_price: null,
        guess_refund_service_fee: null
      });
      this.cancelTicketVisable = false;
    },
    handleTouristSelectionChange(val) {
      this.touristSelection = val.map(i => {
        return i.id;
      });
    },
    handleTouristChangeTicket(data) {
      // if (!this.touristSelection.length) {
      //   this.$message.error("请选择需要改签的乘客！");
      //   return;
      // }
      this.$confirm(`您确定要改签吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          data: {
            tourist_ids: [data.tourist_id],
            order_no: this.orderDetail.order_info.order_no
          }
        };

        changeDistributionTrainFromAsyncRequest({
          params: params,
          success: params => {
            let { code, data, msg } = params["data"];
            if (code == 0) {
              let filter = {
                fromStation: {
                  station_name: data.from_station_name,
                  pinyin: data.from_station
                },
                toStation: {
                  station_name: data.to_station_name,
                  pinyin: data.to_station
                },
                trainDate: data.train_date,
                order_id: data.order_id,
                tourist_ids: data.tourist_ids,
                order_no: data.order_no
              };
              this.$router.push({
                path: "/salecenter/train-list",
                query: {
                  filter: Qs.stringify(filter)
                }
              });
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
    },
    handleTouristSelectable(tourist, index) {
      return tourist.can_change_flag == 1;
    },
    handleCancelChangedTrainTicket(change_no) {
      this.$confirm(`您确定要取消改签吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          data: {
            change_no
          }
        };
        cancelDistributionChangeTrainAsyncRequest({
          params: params,
          success: params => {
            let { code, data, msg } = params["data"];
            if (code == 0) {
              this.$message.success(msg);
              this.getTrainOrderDetailHandler();
            } else {
              this.$message.error(msg);
            }
            this.$router.replace({
              name: "TrainSaleOrderDetail",
              query: {
                orderNo: data.order_no
              }
            });
          },
          showLoading: true
        });
      });
    },
    handleConfirmChangedTrainTicket(change_no) {
      this.$router.push({
        name: "TrainOrderChangeCheckout",
        query: {
          changeNo: change_no
        }
      });
    },
    handleOnlinePay() {
      this.$confirm("支付完成后请刷新该页面！", "在线支付提示", {
        type: "success",
        cancelButtonText: "取消支付",
        confirmButtonText: "去支付",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        beforeClose: (action, instance, done) => {
          if (action == "confirm") {
            this.$refs.onlinePay.pay();
          } else {
            done();
          }
        }
      });
    },
    handleChangeOrderOperator() {
      this.$refs.operator.changeOrderOperator(
        this.orderDetail.order_info.order_no,
        this.orderDetail.order_info.op_id
      );
    },
    handleOrder({ command, data }) {
      //http://apidoc.yktour.com.cn/docs/app/train
      switch (command) {
        case 1: // 取消
          this.handleCancelTrainOrder();
          break;
        case 2: // 立即支付
          this.handleOnlinePay();
          break;
        case 3: // 退票
          this.handleCancelTrainTicket(data);
          break;
        case 4: // 改签
          this.handleTouristChangeTicket(data);
          break;
        case 5: // 改签支付
          this.handleConfirmChangedTrainTicket(data.change_no);
          break;
        case 7: // 取消改签
          this.handleCancelChangedTrainTicket(data.change_no);
          break;
      }
    }
  },
  mounted() {
    // alert(3)
    let { orderNo } = this.$route.query;
    if (!orderNo) {
      this.$router.replace({
        name: "TrainSaleOrder"
      });
    }
    this.orderNo = orderNo;
    this.getTrainOrderDetailHandler();
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 15px;
  background-color: #fff;
}
.panel {
  margin-bottom: 20px;
  .hd {
    padding: 10px 0 25px;

    h2 {
      display: inline-block;
      color: #b10c79;
      font-size: 16px;
      border-left: 5px solid #b10c79;
      padding-left: 10px;
      line-height: 20px;
    }

    span {
      margin-left: 20px;
      color: #999;
      i {
        color: #f60;
        font-style: normal;
      }
    }
    .op-btn {
      float: right;
    }
  }
  .order-tips {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .timer {
      text-align: right;
      color: #f00;
      padding-bottom: 10px;
    }
  }
}
.table-order {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;

  thead {
    th {
      border: 1px solid #ccc;
      padding: 15px 10px;
      text-align: center;
      background: #f4f4f4;
    }
  }
  tbody {
    td {
      padding: 15px 10px;
      border: 1px solid #ccc;
      text-align: center;
    }
  }
}
.rooms-set-table {
  thead {
    th {
      padding: 4px;
      background-color: #f4f4f4;
    }
  }
  tbody {
    th,
    td {
      padding: 4px;
    }
    td {
      padding-right: 15px;
    }
    th {
      text-align: right;
    }
  }
}
.detail-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .detail {
    span {
      margin-right: 10px;
      i {
        color: #f60;
        font-style: normal;
      }
    }
  }
}
.rooms-date-price {
  margin-top: 15px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .rooms-date-price-item {
    float: left;
    width: 100px;
    border: 1px solid #dddddd;

    .day {
      line-height: 20px;
      background-color: #fafafa;
      padding: 5px 0;
      text-align: center;
      border-bottom: 2px solid #dddddd;
      p {
        color: #444444;
      }

      span {
        color: #999999;
      }
    }
    .pri {
      line-height: 20px;
      padding: 5px 0;
      text-align: center;

      p {
        color: #ff6600;
        font-weight: 700;
      }

      span {
        color: #999999;
      }
    }
  }
}
.input-number {
  width: 100%;
}
.tourist-tools,
.change-tourists {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-top: 0;
}
.change-tourists {
  display: flex;
  align-items: center;

  .el-tag {
    margin-right: 10px;
    font-size: 14px;
    padding: 2px 4px;
    height: auto;

    a {
      margin: 0 5px;
    }
  }
}
.is-active {
  color: #b10c79;
}
.refund-info {
  h2 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    margin-bottom: 10px;

    strong {
      color: #f60;
    }
  }
  .refund-info-tips {
    color: #999;
  }
}
</style>

