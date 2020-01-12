<template>
  <div class="change" v-if="data">
    <div class="change-hd">
      占位成功，改签交易尚未完成， 请在
      <span class="count-down">{{ countDown }}</span> 内完成
    </div>
    <div class="change-bd">
      <el-table :data="data.new_train.ticket_info" style="width: 100%">
        <el-table-column header-align="center" align="center" label="车次信息" width="200">
          <template slot-scope="prop">
            <p>{{ data.new_train.train_info.start_time.complete }}</p>
            {{ prop.row.train_no }}&nbsp;&nbsp;{{ data.new_train.train_info.from_station_name }} - {{ data.new_train.train_info.to_station_name }}
          </template>
        </el-table-column>
        <el-table-column prop="cxin" header-align="center" align="center" label="席位信息"></el-table-column>
        <el-table-column header-align="center" align="center" label="旅客信息">
          <template slot-scope="prop">
            <p>{{ prop.row.passengersename }}</p>
            {{ prop.row.train_no }}
          </template>
        </el-table-column>
        <el-table-column prop="piaotype" header-align="center" align="center" label="票种"></el-table-column>
        <el-table-column header-align="center" align="center" label="票款金额">{{data.pay_info.amount}}</el-table-column>
      </el-table>
      <!-- <div class="change-price-info">
        <div v-if="newPrice<oldPrice">
          确认改签后将退回差价：
          <span>￥{{ oldPrice-newPrice }}</span>
        </div>
        <div v-if="newPrice>=oldPrice">
          收取新票款：
          <span>￥{{ newPrice }}</span> ， 退还原票票款：
          <span>￥{{ oldPrice }}</span>
        </div>
      </div>-->
      <div class="footer-btns">
        <el-button @click="handleCancelChangedTrainTicket">取消改签</el-button>
        <el-button type="primary" @click="handleConfirmChangedTrainTicket">确认改签</el-button>
      </div>
    </div>
    <online-pay
      ref="onlinePay"
      :order-id="order_id"
      order-resource="1"
      :amount="payAmount"
      :backUrl="`saleorder/train/detail?orderNo=${order_id}`"
      :customParams="customParams"
    />
  </div>
</template>

<script>
import OnlinePay from "src/components/components/newOnlinePay.vue";
import {
  getDistributionChangeTrainInfoAsyncRequest,
  cancelDistributionChangeTrainAsyncRequest,
  confirmDistributionChangeTrainAsyncRequest,
  getDistributionChangeTrainStatusAsyncRequest
} from "src/api/train";

export default {
  data() {
    return {
      data: null,
      changeNo: "",
      tourists: null,
      newPrice: 0,
      oldPrice: 0,
      overTime: 0,
      order_id: "",
      payAmount: 0,
      customParams: ""
    };
  },
  computed: {
    countDown() {
      let time = this.overTime || 0,
        minute = Math.floor(time / 60),
        seconds = time % 60;

      return minute + "分" + seconds + "秒";
    }
  },
  components: {
    OnlinePay
  },
  methods: {
    getChangedTrainTicketInfo() {
      let params = {
        data: {
          change_no: this.changeNo
        }
      };
      getDistributionChangeTrainStatusAsyncRequest({
        params: params,
        success: params => {
          let { code, data, msg } = params["data"];
          if (code == 0) {
            this.data = data;
            this.tourists = data.new_train.ticket_info;
            this.overTime = data.pay_info.count_down_time;
            this.newPrice = data.new_price;
            this.oldPrice = data.old_price;
            this.order_id = data.order_no;
            this.payAmount = data.pay_info.amount;
            this.customParams = data.pay_info.customParams;
            this.handleCountDown();
          } else {
            this.$message.error(msg);
          }
        }
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
    handleCancelChangedTrainTicket() {
      this.$confirm(`您确定要取消改签吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          data: {
            change_no: this.changeNo
          }
        };
        cancelDistributionChangeTrainAsyncRequest({
          params: params,
          success: params => {
            let { code, data, msg } = params["data"];
            if (code == 0) {
              this.$message.success(msg);
            } else {
              this.$message.error(msg);
            }
            this.$router.replace({
              name: "TrainSaleOrderDetail",
              query: {
                orderNo: this.order_id
              }
            });
          },
          showLoading: true
        });
      });
    },
    handleConfirmChangedTrainTicket() {
      let data = this.data;
      // let params = {
      //   data: {
      //     tourist_ids: data.new_train.ticket_info.map(ticket => {
      //       return ticket.id;
      //     }),
      //     order_no: data.order_no,
      //     train_info: {
      //       from_station: data.new_train.train_info.from_station_name,
      //       to_station: data.new_train.train_info.to_station_name,
      //       train_date: data.new_train.train_info.time_table,
      //       train_no: data.new_train.train_info.train_no,
      //       seat_class: data.new_train.ticket_info[0]["seat_class"],
      //       choose_seats: data.new_train.train_info.change_ticket
      //     }
      //   }
      // };
      if (data.pay_info.need_pay) {
        this.$refs.onlinePay.pay();
      } else {
        this.$router.replace({
          name: "TrainSaleOrderDetail",
          query: {
            orderNo: this.order_id
          }
        });
      }
      // confirmDistributionChangeTrainAsyncRequest({
      //   params: params,
      //   success: params => {
      //     let { code, data, msg } = params["data"];
      //     if (code == 0) {
      //       if (data.pay_flag == 0) {
      //         this.$message.success(msg);
      //         this.$router.replace({
      //           name: "TrainSaleOrderDetail",
      //           query: {
      //             orderNo: data.order_no
      //           }
      //         });
      //       } else {
      //         this.$nextTick(() => {
      //           this.$confirm("改签成功", "在线支付提示", {
      //             type: "success",
      //             cancelButtonText: "订单详情",
      //             confirmButtonText: "去支付",
      //             closeOnClickModal: false,
      //             closeOnPressEscape: false,
      //             showClose: false,
      //             beforeClose: (action, instance, done) => {
      //               if (action == "confirm") {
      //                 this.$refs.onlinePay.pay();
      //               } else {
      //                 done();
      //                 this.$router.push({
      //                   name: "TrainSaleOrderDetail",
      //                   query: { orderNo: data.order_no }
      //                 });
      //               }
      //             }
      //           }).catch(e => {
      //             console.log("cancel: ", e);
      //           });
      //         });
      //       }
      //     } else {
      //       this.$message.error(msg);
      //     }
      //   },
      //   showLoading: true
      // });
    }
  },
  mounted() {
    let { changeNo } = this.$route.query;
    if (!changeNo) {
      this.$router.replace({ path: "/salecenter/train-list" });
      return;
    }
    this.changeNo = changeNo;
    this.getChangedTrainTicketInfo();
  }
};
</script>

<style lang="less" scoped>
.change {
  background-color: #fff;
  padding: 20px;

  .change-hd {
    padding-bottom: 10px;
    font-size: 20px;
    .count-down {
      color: #f60;
    }
  }
  .change-price-info {
    padding: 10px 0;
    font-size: 18px;
    text-align: right;

    span {
      color: #f60;
    }
  }
  .footer-btns {
    text-align: center;
    padding: 20px 0;
  }
}
</style>
