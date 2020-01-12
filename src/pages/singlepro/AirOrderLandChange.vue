<style lang="stylus">
.change-land {
    background: #ffffff;

    .title {
        border-left: 5px solid #aa177a;
        padding-left: 15px;
        line-height: 20px;

        span:nth-child(1) {
            font-size: 18px;
            font-weight: 500;
        }
    }

    .flight-info {
        overflow: hidden;
        padding: 20px;

        .chang-form {
            width: 50%;
            float: left;
            box-sizing: border-box;

            .apply-info {
                margin-bottom: 20px;

                .step {
                    margin: 20px 0;
                }

                .select-info {
                    margin-left: 55px;

                    .el-select {
                        width: 300px;
                    }
                }

                .changeFlightInfo {
                    margin: 40px 0;

                    .el-radio-group {
                        border: 1px solid #DCDFE6;

                        .el-radio {
                            display: flex;
                            padding: 20px;

                            .el-radio__label {
                                display: flex;

                                .flight-info-item {
                                    margin: 0 20px;
                                    text-align: center;

                                    div {
                                        margin-bottom: 5px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .base-info {
            width: 400px;
            float: right;
            margin-bottom: 15px;
            border-radius: 6px;

            .info {
                .center-info {
                    text-align: center;

                    .zhi {
                        width: 25px;
                        height: 2px;
                        background: #ccc;
                        display: inline-block;
                        position: relative;
                        top: -3px;
                        left: 10px;
                    }

                    .stroke-stroke, .stroke-cabin {
                        margin-bottom: 15px;

                        span {
                            margin-right: 25px;
                        }
                    }

                    // > div
                    // margin-bottom 10px
                    // > span
                    // margin-right 20px
                    .cabin {
                        margin: 15px 0;
                    }

                    .time {
                        display: flex;
                        justify-content: center;

                        .isStop {
                            display: flex;

                            .left {
                                position: relative;
                                top: 15px;
                                width: 40px;
                                height: 10px;
                                margin-left: 10px;
                            }

                            .left:before {
                                content: '';
                                position: absolute;
                                top: 3px;
                                left: 0;
                                height: 2px;
                                width: 100%;
                                background-color: #ccc;
                            }

                            .dates {
                                position: relative;
                                margin: 0 10px;
                            }

                            .right {
                                position: relative;
                                top: 15px;
                                width: 45px;
                                height: 10px;
                                margin-right: 10px;
                            }

                            .right:after {
                                content: '';
                                position: absolute;
                                right: 0;
                                height: 0;
                                width: 0;
                                border-left: 10px solid #ccc;
                                border-top: 4px solid #f5f5f5;
                                border-bottom: 4px solid #f5f5f5;
                            }

                            .right:before {
                                content: '';
                                position: absolute;
                                top: 3px;
                                left: 0;
                                height: 2px;
                                width: 100%;
                                background-color: #ccc;
                            }

                            .middle {
                                position: relative;
                                top: 5px;
                                width: 80px;
                                height: 10px;
                                margin: 0 20px;
                            }

                            .middle:after {
                                content: '';
                                position: absolute;
                                right: 0;
                                height: 0;
                                width: 0;
                                border-left: 10px solid #ccc;
                                border-top: 4px solid #f5f5f5;
                                border-bottom: 4px solid #f5f5f5;
                            }

                            .middle:before {
                                content: '';
                                position: absolute;
                                top: 3px;
                                left: 0;
                                height: 2px;
                                width: 100%;
                                background-color: #ccc;
                            }
                        }
                    }
                }
            }

            .change-pay {
                margin-top: 30px;

                .change-amount {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                }

                .expected {
                    font-size: 16px;
                    font-weight: 500;
                }
            }
        }
    }

    .refund-marks {
        padding: 20px;

        .info-table {
            margin: 20px 0;
        }
    }

    .submit-btn {
        text-align: center;
    }
}
</style>
<template lang="pug">
  .change-land
    .flight-info
      .chang-form
        .title
          span 填写改签申请
        .apply-info
          .step
            span 第一步：
            span 选择改签日期
          .select-info
            el-date-picker(
              v-model="changeDate"
              type="date"
              placeholder="请选择改签日期"
              @change="changePicker")
          .step
            span 第二步：
            span 选择改签乘机人
          .select-info
            el-checkbox-group(v-model="passengerIds", @change="changePassenger")
              el-checkbox(v-for="item in passengersList" :label="item.passengerId" :key="item.passengerId"  :disabled="!item.canChange") {{item.name}}
          .step
            span 第三步：
            span 选择改签原因
          .select-info
            el-select(v-model="changeReasonId", @change="handleChangeReason", value-key="msg")
              el-option(
                v-for="item in changeReasonOptions"
                :key="item.code"
                :label="item.msg"
                :value="item"
              )
            .changeFlightInfo(v-if="changeReasonId")
              el-table(
                :data="changeFlightSegmentList"
                empty-text="您搜索的日期无航班报价，请重新搜索！"
                v-if="changeReasonId"
                border
              )
                el-table-column(align="center" label width="65")
                  template(slot-scope="scope")
                    el-radio(
                      :label="scope.row.flightNo"
                      v-model="changeFlightId"
                      @change="handleChangeFlight(scope.row)"
                    ) {{""}}
                el-table-column(align="center" label="主飞航司")
                  template(slot-scope="scope")
                    div {{ scope.row.flight}}
                    span 机型:{{scope.row.flightNo}}
                el-table-column(align="center"  label="出发时间")
                  template(slot-scope="scope")
                    div {{ scope.row.startTime }}
                    span {{scope.row.startPlace}}{{scope.row.dptTerminal}}
                el-table-column(align="center" label="到达时间")
                  template(slot-scope="scope")
                    div {{ scope.row.endTime }}
                    span {{scope.row.endPlace}}{{scope.row.arrTerminal}}
                el-table-column(align="center" label="改签总价")
                  template(slot-scope="scope")
                    div {{ scope.row.cabin ? scope.row.cabin : '--'}}
                    span ￥{{scope.row.allFee}}
      .base-info
        el-card
          .info
            span 原航班
            .center-info
              .stroke-stroke
                span {{baseInfo[0].dptDate}}
                span {{baseInfo[0].week}}
                span {{baseInfo[0].dptCity}}
                  span(class="zhi")
                  span {{baseInfo[0].arrCity}} 
              .stroke-cabin
                span {{baseInfo[0].carrierName}}{{baseInfo[0].flightNo}}
                span(v-if="baseInfo[0].plane_type_name") 机型：{{baseInfo[0].plane_type_name}} 
                span {{baseInfo[0].cabin}}
              .time
                .departure
                  h3 {{baseInfo[0].dptTime}}
                  span {{baseInfo[0].dptPort}} {{baseInfo[0].dptTerminal}}
                .isStop
                  .left(v-if="baseInfo[0].stops_city")
                  .dates
                    div {{baseInfo[0].flight_times}}
                    div(v-if="baseInfo[0].stops_city") 经停{{baseInfo[0].stops_city}}
                    .middle(v-else)
                  .right(v-if="baseInfo[0].stops_city")
                .departure
                  h3 {{baseInfo[0].arrTime}}
                  span {{baseInfo[0].arrPort}} {{baseInfo[0].arrTerminal}}
        .change-pay(v-if="passengerIds.length && changeFlightId")
          el-card
            .expected(class="change-amount")
              span 需支付改签金额
              span ￥{{payChange}}
            .change-amount
              span 成人改签费
              span ￥{{adultPay}}
            .change-amount
              span 儿童改签费
              span ￥{{childPay}}
    .refund-marks
      .title
        span 填写改签申请
        span 以下为成人退改签
      .info-table
        el-table(:data="refunedChangeInfo.tgqList" style="width: 60%" border center)
          el-table-column(prop="timeText" label="退改签时间点" align="center")
          el-table-column(label="退票费" align="center")
            template(slot-scope="scope")
              span(v-if="scope.row.returnFee == -1") 请以航司规定为准
              span(v-else) ￥{{scope.row.returnFee}}/人
          el-table-column(label="改签费" align="center")
            template(slot-scope="scope")
              span(v-if="scope.row.changeFee == -1") 请以航司规定为准
              span(v-else) ￥{{scope.row.changeFee}}/人
      .marks-title
        span 详细说明:
        .marks-info 
          span {{refunedChangeInfo.tgqText}}
    .submit-btn
      el-button(type="primary" size="large", @click="submitChange") 确认提交
</template>
<script>
import Moment from "moment";
import { flightChangeSearch, flightChangeApply, payment } from "src/api/flight";
export default {
    data() {
        return {
            changeDate: Moment().format("YYYY-MM-DD"),
            passengerIds: [],
            passengersList: [],
            changeReasonId: "",
            changeReasonOptions: [],
            changeFlightId: "",
            changeFlightSegmentList: [],
            refunedChangeInfo: {
                tgqList: [],
                tgqText: ""
            },
            baseInfo: [{}],
            payChange: "", //需要支付改签费
            adultPay: "", //成人改签费
            childPay: "", //
            chengedFlight: {},
            order_no: "",
            child_no: ""
        };
    },
    mounted() {
        this.child_no = this.$route.query.child_no;
        this.order_no = this.$route.query.order_no;
        const dep_date = this.$route.query.dpt_date;
        const oneDays = 1000 * 3600 * 24;
        const nextDateTime = new Date(dep_date).getTime() + oneDays;
        this.changeDate = Moment(nextDateTime).format("YYYY-MM-DD");
        this.queryChangeSearch(this.changeDate);
    },
    methods: {
        async queryChangeSearch(date, type) {
            const params = {
                order_no: this.order_no,
                child_no: this.child_no,
                change_date: date
            };
            try {
                const { code, data, msg } = await flightChangeSearch(params);

                if (code !== 0) return this.$message.error(msg);

                this.passengersList = data.passengers;
                data.passengers.forEach(item => {
                    this.passengerIds.push(item.passengerId);
                });
                this.baseInfo = data.flightList;
                this.changeReasonOptions = data.tgqReasons;
                this.refunedChangeInfo = data.tgq;
                this.changeFlightSegmentList =
                    data.tgqReasons.length &&
                    data.tgqReasons[0].changeFlightSegmentList;
                // if(type) {
                //   const oneDays = 1000 * 3600 * 24
                //   const nextDateTime = (new Date(data.flightList[0].dptDateOld).getTime()) + oneDays
                //   this.changeDate = Moment(nextDateTime).format("YYYY-MM-DD")
                // }
                this.changeReasonId = data.tgqReasons[0];
            } catch (err) {
                console.log(err);
            }
        },
        changePassenger(e) {
            this.changeFlightId = "";
        },
        changePicker(e) {
            const changeDate = Moment(e).format("YYYY-MM-DD");
            this.changeFlightId = "";
            this.passengerIds = [];
            this.changeReasonId = "";
            console.log(this.changeDate, changeDate);
            this.queryChangeSearch(changeDate);
        },
        handleChangeReason(e) {
            if (e.code == 3 && !e.will && e.isChange == 0) {
                this.changeReasonId = "";
                this.changeFlightSegmentList = [];
                return this.$message.warning("未发现航变，请选择其他原因");
            }
            this.changeFlightSegmentList = [];
            this.changeFlightId = "";
            this.changeReasonOptions.forEach(item => {
                if (e.code == item.code) {
                    this.changeFlightSegmentList = item.changeFlightSegmentList;
                }
            });
        },
        handleChangeFlight(row) {
            let passengerNum = this.hasChild();
            this.changeFlightSegmentList.forEach(item => {
                if (row.flightNo == item.flightNo) {
                    this.chengedFlight = item;
                    this.adultPay = item.allFee * passengerNum.adult_no;
                    this.childPay = item.childAllFee * passengerNum.child_no;
                    this.payChange = this.adultPay + this.childPay;
                }
            });
        },
        hasChild() {
            let passengerNum = {
                child_no: 0,
                adult_no: 0
            };
            this.passengerIds.forEach(id => {
                this.passengersList.forEach(item => {
                    if (id == item.passengerId) {
                        item.age_type == "儿童"
                            ? (passengerNum.child_no += 1)
                            : (passengerNum.adult_no += 1);
                    }
                });
            });
            return passengerNum;
        },
        async submitChange() {
            if (!this.passengerIds.length)
                return this.$message.warning("请选择改签乘机人");
            if (!this.changeReasonId)
                return this.$message.warning("请选择改签原因");
            if (!this.changeFlightId)
                return this.$message.warning("请选择改签航班");

            const passengerNum = this.hasChild();

            const params = {
                order_no: this.$route.query.order_no,
                child_no: this.$route.query.child_no,
                changeCauseId: this.changeReasonId.code,
                passengerIds: this.passengerIds.join(","),
                applyRemarks: this.changeReasonId.msg,
                hasChild: passengerNum.child_no ? "1" : "0",
                flight: this.baseInfo,
                changeFlight: new Array(this.chengedFlight)
            };

            try {
                const { code, data, msg } = await flightChangeApply(params);

                if (code !== 0) return this.$message.error(msg);
                this.$message.success(msg);
                data.amount * 1 > 0
                    ? this.payMoney(data.amount)
                    : this.$router.push({
                          path: "/singlepro/airOrder/detail",
                          query: {
                              order_no: this.$route.query.order_no,
                              child_no: this.$route.query.order_no
                          }
                      });
            } catch (err) {
                console.log(err);
            }
        },
        payMoney(amount) {
            const params = {
                data: {
                    orderId: this.$route.query.order_id,
                    amount: amount,
                    platform: "1",
                    returnUrl:
                        window.location.origin +
                        window.location.pathname +
                        "#/singlepro/airOrder/detail?" +
                        "order_no=" +
                        this.order_no +
                        "&child_no=" +
                        this.child_no,
                    customParams: this.$route.query.change_id
                }
            };
            //  return  console.log("国内改签",params)
            payment({
                params,
                success: params => {
                    // console.log(params, "params");
                    let { code, msg, data } = params["data"];
                    if (code != 0) return this.$message.error(msg);
                    let div = document.createElement("div");
                    div.innerHTML = data.form;
                    div.hidden = true;
                    document.body.appendChild(div);
                    div.getElementsByTagName("form")[0].submit();
                },
                showLoading: true
            });
        }
    }
};
</script>