<template>
    <div class="wrapper">
        <div class="pannel-order-detail" v-if="flightType == TYPES.international">
            <!-- 选择申请航段 -->
            <div class="panel">
                <div class="hd">
                    <h2>选择申请航段</h2>
                </div>
                <!-- 表格部分 -->
                <el-table class="el-table--middle" style="width: 100%" border :data="orderDesert.flightList" @selection-change="handleSelectionChange">
                    <el-table-column align="center" type="selection" width="100"></el-table-column>
                    <el-table-column align="center" label="航班">
                        <template slot-scope="scope">{{ scope.row.flight_type == 1 ? '去程' : '返程' }}</template>
                    </el-table-column>
                    <el-table-column align="center" label="航班起飞时间">
                        <template slot-scope="scope">{{ scope.row.dptDateOld + ' ' + scope.row.dptTime }}</template>
                    </el-table-column>
                    <el-table-column align="center" label="航程信息">
                        <template slot-scope="scope">{{ scope.row.dptCity + ' → ' + scope.row.arrCity }}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="flightNo" label="航班号"></el-table-column>
                    <el-table-column align="center" prop="cabin" label="舱位"></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="pannel-order-detail">
            <!-- 填写退票申请 -->
            <div class="panel" :class="{'refundleft':flightType == TYPES.land}">
                <div class="hd">
                    <h2>填写退票申请</h2>
                </div>
                <div class="table-custom1">
                    <div class="refund-row">
                        <span class="lable">第一步:</span>
                        <span>选择乘机人</span>
                    </div>
                    <div class="refund-row">
                        <el-checkbox-group v-model="refundInfo.passengerIdArr" @change="checkPassenger">
                            <el-checkbox v-for="item in orderDesert.passengers" :label="item.passengerId" :key="item.passengerId">{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="refund-row">
                        <span class="lable">第二步:</span>
                        <span>选择退票原因</span>
                    </div>
                    <div class="refund-row">
                        <div>
                            <el-select v-model="refundInfo.reason" @change="changeReason">
                                <el-option v-for="(item, $index) in orderDesert.reason" :key="$index" :label="item.msg" :value="item.code"></el-option>
                            </el-select>
                            <div v-if="refundInfo.reason == 19" class="reason">
                                <div class="reason-title">
                                    <div>*上传凭证</div>
                                    <span>(最多三张图片)</span>
                                </div>
                                <div class="reason-info">{{refundMarks}}</div>
                                <!-- 图片上传 -->
                                <el-upload action="/api/v1/flight/index/flight-upload" list-type="picture-card" :limit="3" name="images" :on-preview="handlePictureCardPreview" :on-success="onSuccess" :on-remove="handleRemove" :before-upload="beforeUpload" :class="{'upladimg':pic_urls.length >= 3}">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt />
                                </el-dialog>
                            </div>
                            <div v-if="refundMoney && refundInfo.passengerIdArr.length && flightType==TYPES.land" class="refund-money">
                                <div class="expected">
                                    <span>预计退还</span>
                                    <span>￥{{expectedRefund}}</span>
                                </div>
                                <div>
                                    <span>实际支付</span>
                                    <span>￥{{payAmount}}</span>
                                </div>
                                <div>
                                    <span>退票费</span>
                                    <span>￥{{refundFee}}</span>
                                </div>
                            </div>
                            <div v-if="flightType == TYPES.international">
                                <p style="margin-top:10px">退票须知：</p>
                                <p>提交申请，需航空公司进行，审核通过后，退款金额将退回原支付账户中。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="land-info" v-if="flightType == TYPES.land">
                <el-card>
                    <div class="info">
                        <div>原航班</div>
                        <div class="center-info">
                            <div class="stroke-stroke">
                                <span>{{orderDesert.flight_info[0].dept_date}}</span>
                                <span>{{orderDesert.flight_info[0].week}}</span>
                                <span>{{orderDesert.flight_info[0].dept_city}}
                                    <span class="zhi"></span>
                                    {{orderDesert.flight_info[0].arr_city}}</span>
                            </div>
                            <div class="stroke-cabin">
                                <span>{{orderDesert.flight_info[0].carrier_name}}{{orderDesert.flight_info[0].flight_num}}</span>
                                <span v-if="orderDesert.flight_info[0].plane_type_name">机型：{{orderDesert.flight_info[0].plane_type_name}} </span>
                                <span>{{orderDesert.flight_info[0].cbcn}}</span>
                            </div>
                            <div class="time">
                                <div class="departure">
                                    <h3>{{orderDesert.flight_info[0].dept_time}}</h3>
                                    <span>{{orderDesert.flight_info[0].dpt_airport}} {{orderDesert.flight_info[0].dpt_terminal}}</span>
                                </div>
                                <div class="isStop">
                                    <div v-if="orderDesert.flight_info[0].stops_city" class="left"></div>
                                    <div class="dates">
                                        <div>{{orderDesert.flight_info[0].flight_times}}</div>
                                        <div v-if="orderDesert.flight_info[0].stops_city">经停{{orderDesert.flight_info[0].stops_city}}</div>
                                        <div v-else class="middle"></div>
                                    </div>
                                    <div v-if="orderDesert.flight_info[0].stops_city" class="right"></div>
                                </div>
                                <div class="departure">
                                    <h3>{{orderDesert.flight_info[0].arr_time}}</h3>
                                    <span>{{orderDesert.flight_info[0].arr_airport}} {{orderDesert.flight_info[0].arr_terminal}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
                <div class="tips">
                    <p>退票须知：</p>
                    <p>提交申请，需航空公司进行，审核通过后，退款金额将退回原支付账户中。</p>
                </div>
            </div>
        </div>

        <div class="pannel-order-detail">
            <!-- 退改签信息 -->
            <div class="panel">
                <div class="hd">
                    <h2>
                        退改签信息
                        <span>（以下为成人退改签）</span>
                    </h2>
                </div>
                <table class="table-custom" v-if="num !=0">
                    <tr>
                        <th>退改签时间点</th>
                        <th>退票费</th>
                        <th>改签费</th>
                    </tr>
                    <tr v-for="(val, key, $index) in orderDesert.tgq.tgqInfoArray" :key="$index">
                        <td>{{ key }}</td>
                        <td>{{ val.refund_price }}</td>
                        <td>{{ val.change_price }}</td>
                    </tr>
                </table>
                <div class="refund-marks">
                    <div class="marks-title">详细说明:</div>
                    <el-table v-if="flightType == TYPES.land" :data="orderDesert.tgq.tgqList" style="width: 60%" border center>
                        <el-table-column prop="timeText" label="退改签时间点" align="center"></el-table-column>
                        <el-table-column label="退票费" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.returnFee == -1">请以航司规定为准</span>
                                <span v-else>￥{{scope.row.returnFee}}/人</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="改签费" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.changeFee == -1">请以航司规定为准</span>
                                <span v-else>￥{{scope.row.changeFee}}/人</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="marks-info">{{orderDesert.tgq.tgqText}}</div>
                </div>
            </div>
            <div class="submit-btn">
                <el-button type="primary" size="large" @click="applyRefund">确认提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    landRefundSearch,
    tgInterRefundSearch,
    landApplyRefund,
    tgInterApplyRefund,
    flightUpload
} from "src/api/flight";
import { constants } from "crypto";
export default {
    data() {
        return {
            TYPES: {
                land: 1, //国内
                international: 2 //国际
            },
            orderDesert: {
                flightList: [],
                flight_info: [
                    {
                        flight_type: 1,
                        dept_city: "银川",
                        week: "周五",
                        dept_date: "08-30",
                        dept_time: "17:50",
                        dpt_terminal: "T3",
                        arr_date: "09-30",
                        arr_time: "18:35",
                        arr_city: "中卫",
                        arr_terminal: "",
                        flight_num: "JR1519",
                        carrier: "JR",
                        carrier_name: "幸福航空",
                        act_flight_num: "JR1519",
                        act_carrier: "JR",
                        act_carrier_name: "幸福航空",
                        stops_city: "",
                        stops: 0,
                        flight_times: "45m",
                        plane_type_name: "",
                        cross_days: 0,
                        cbcn: "经济舱",
                        dpt_airport: "河东机场",
                        arr_airport: "香山机场",
                        dpt_code: "INC",
                        arr_code: "ZHY",
                        flight_change_text: ""
                    }
                ],
                passengers: [],
                tgq: {}
            },
            refundInfo: {
                reason: "",
                passengerIdArr: [],
                activeFlights: []
            },
            passengerId: [],
            refundCause: "", //退票原因文字
            dialogImageUrl: "",
            dialogVisible: false,
            pic_urls: [],
            num: "",
            flightType: "",
            expectedRefund: "", //预计退款
            payAmount: "", //实际支付
            refundFee: "", // 退票费
            refundMarks: "", //退票说明
            refundMoney: false
        };
    },
    methods: {
        //图片上传
        //文件列表移除文件时的钩子
        handleRemove(file, fileList) {
            this.pic_urls = [];
            fileList.forEach(item => {
                this.pic_urls.push(item.url);
            });
        },
        //点击文件列表中已上传的文件时的钩子
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //图片上传成功
        onSuccess(response, file, fileList) {
            // console.log("response", response.data);
            let data = response.data;
            data.forEach(item => {
                this.pic_urls.push(item.url);
                // return this.pic_urls;
            });
            // console.log(this.pic_urls.length,'pic-display')
        },
        beforeUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
            }
            return isLt5M;
        },
        async getByOrderDesert() {
            let params = {
                // data: {
                order_no: this.$route.query.order_no,
                child_no: this.$route.query.child_no
                // }
            };
            // 获取数据
            const { code, msg, data } = await (this.flightType ==
                this.TYPES.land
                ? landRefundSearch
                : tgInterRefundSearch)(params);

            if (code != 0) return this.$message.error(msg);
            if (data.tgq.tgqInfo) {
                let obj = {};
                for (let i in data.tgq.tgqInfo) {
                    for (let l in data.tgq.tgqInfo[i]) {
                        obj[i + (l == "before" ? "前" : "后")] =
                            data.tgq.tgqInfo[i][l];
                    }
                }
                this.num = data.tgq.tgqInfoArray.length; //退改签信息
                data.tgq.tgqInfo = obj;
            }
            this.orderDesert = data; //详细信息
            this.refundInfo.reason = data.reason.length
                ? data.reason[0].code
                : ""; //默认退款原因
            if (this.flightType == this.TYPES.land) {
                data.passengers.forEach(item => {
                    this.refundInfo.passengerIdArr.push(item.passengerId);
                });
            }
            data.reason.length ? this.changeReason(data.reason[0].code) : "";
            this.checkPassenger();
        },
        handleSelectionChange(val) {
            this.refundInfo.activeFlights = val;
        },
        passengerNum() {
            //判断成人 儿童数量
            let pasNum = {
                child_no: 0,
                adult_no: 0
            };
            this.refundInfo.passengerIdArr.forEach(id => {
                this.orderDesert.passengers.forEach(item => {
                    if (id == item.passengerId) {
                        item.age_type == "儿童"
                            ? (pasNum.child_no += 1)
                            : (pasNum.adult_no += 1);
                    }
                });
            });
            return pasNum;
        },
        //选择乘客id
        checkPassenger(id) {
            // this.passengerId.push(id);
            let amount = 0;
            if (this.flightType == this.TYPES.land) {
                this.refundInfo.passengerIdArr.forEach(i => {
                    this.orderDesert.passengers.forEach(item => {
                        if (i == item.passengerId) {
                            amount += item.real_price * 1;
                        }
                    });
                });
            }

            this.payAmount = amount;
        },
        changeReason(e) {
            this.refundMoney = true;
            let refundFee = 0,
                expectedRefund = 0;
            this.orderDesert.reason.forEach(item => {
                if (e == item.code && this.flightType == this.TYPES.land) {
                    refundFee = item.refundFeeInfo.refundFee;
                    expectedRefund = item.refundFeeInfo.returnRefundFee;
                    this.refundMarks = item.refundText;
                }
            });
            this.refundFee = refundFee * this.refundInfo.passengerIdArr.length;
            this.expectedRefund =
                expectedRefund * this.refundInfo.passengerIdArr.length;
        },
        //确认提交
        applyRefund() {
            if (
                this.flightType == this.TYPES.international &&
                !this.refundInfo.activeFlights.length
            )
                return this.$message.error("请选择航班！");
            if (!this.refundInfo.passengerIdArr.length)
                return this.$message.error("请选择乘机人！");
            if (!this.refundInfo.reason)
                return this.$message.error("请选择退票原因！");
            // } else {
            let adultNum = 0;
            let childNum = 0;
            this.refundInfo.passengerIdArr.forEach(id => {
                this.orderDesert.passengers.forEach(item => {
                    if (id == item.passengerId) {
                        item.age_type == "儿童"
                            ? (childNum += 1)
                            : (adultNum += 1);
                    }
                });
            });
            // for (let i in this.refundInfo.passengerIdArr) {
            //   if (adultNum) break;
            //   for (let l in this.orderDesert.passengers) {
            //     if (
            //       this.refundInfo.passengerIdArr[i] ==
            //       this.orderDesert.passengers[l].name
            //     ) {
            //       eval(
            //         (this.orderDesert.passengers[l].age_type == "成人"
            //           ? "adult"
            //           : "child") + "Num += 1"
            //       );
            //     }
            //   }
            // }
            if (!adultNum) {
                this.$message.error("乘机人需至少包含一名成人！");
                return;
            }
            if (this.refundInfo.reason == 16) {
                this.refundCause = "我要改变行程计划、我不想飞了";
            } else if (this.refundInfo.reason == 18) {
                this.refundCause = "航班延误或取消、航班时刻变更";
            } else if (this.refundInfo.reason == 19) {
                if (!this.pic_urls.length)
                    return this.$message.warning("请上传凭证");
                this.refundCause = "身体原因且有二级甲等医院<含>以上的医院证明";
            }
            let params = {
                data: {
                    order_no: this.$route.query.order_no,
                    child_no: this.$route.query.child_no,
                    refundCauseId: this.refundInfo.reason + "",
                    passengerIds: this.refundInfo.passengerIdArr.join(","),
                    refundCause: this.refundCause,
                    flight: this.refundInfo.activeFlights,
                    images: this.pic_urls.join(",")
                }
            };
            if (this.flightType == this.TYPES.land) {
                let refundFee,
                    returnRefundFee,
                    chiRefundFee,
                    chiReturnRefundFee;
                this.orderDesert.reason.forEach(item => {
                    if (this.refundInfo.reason == item.code) {
                        //对应原因下的退票费 和退回金额
                        returnRefundFee = item.refundFeeInfo.returnRefundFee;
                        refundFee = item.refundFeeInfo.refundFee;
                        chiRefundFee = item.refundFeeInfo.chiRefundFee;
                        chiReturnRefundFee =
                            item.refundFeeInfo.chiReturnRefundFee;
                    }
                });
                // console.log(refundFee, returnRefundFee, chiRefundFee, chiReturnRefundFee)
                params["data"].refundFee = refundFee * 1 * (adultNum * 1);
                params["data"].returnRefundFee =
                    returnRefundFee * 1 * (adultNum * 1);
                params["data"].chiRefundFee =
                    chiRefundFee * 1 * (childNum * 1) || "";
                params["data"].chiReturnRefundFee =
                    chiReturnRefundFee * 1 * (childNum * 1) || "";
            }
            // 退票申请
            (this.flightType == this.TYPES.land
                ? landApplyRefund
                : tgInterApplyRefund)({
                params: params,
                success: params => {
                    let { code, data, msg } = params["data"];
                    if (!code == 0) return this.$message.error(msg);
                    this.$message.success(msg);
                    this.$router.push({
                        path: "/singlepro/airOrder/detail",
                        query: {
                            order_no: this.$route.query.order_no,
                            child_no: this.$route.query.child_no
                        }
                    });
                },
                showLoading: true
            });
            // }
        }
    },
    mounted() {
        this.flightType = this.$route.query.type;
        this.getByOrderDesert();
    }
};
</script>
<style scoped>
>>> .upladimg .el-upload {
    display: none !important;
}
</style>
<style scoped lang="less">
// .el-button--large {
//     width:170px !important;
//     line-height: 23px !important;
//   }
table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.pannel-order-detail {
    background-color: #fff;
    padding: 20px;
    overflow: hidden;
    .panel {
        margin-bottom: 20px;
        // .marks-title {
        //   margin-bottom: 20px;
        // }
        // .marks-info {
        //   margin: 20px 0;
        // }
        > .hd {
            margin: 10px 0;
            h2 {
                font-size: 18px;
                border-left: 5px solid #aa177a;
                padding-left: 15px;
                line-height: 20px;
            }
        }
        > .bd {
            padding: 10px 0;

            .gr {
                color: #45bb33;
            }

            .rd {
                color: #ff0d0d;
            }

            .og {
                color: #f60;
            }

            .wt {
                color: #999;
            }
        }
        .info-list {
            span {
                display: inline-block;
                margin: 0 20px 10px 0;
            }
            i {
                font-style: normal;
                color: #999;
            }
        }
    }
    .refundleft {
        float: left;
        width: 50%;
    }
    .land-info {
        float: right;
        width: 400px;
        .tips {
            margin-top: 20px;
        }
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
                .stroke-stroke,
                .stroke-cabin {
                    margin-bottom: 15px;
                    span {
                        margin-right: 25px;
                    }
                }
                // > div {
                //   margin-bottom: 15px;
                //   > span {
                //     margin-right: 25px;
                //   }
                // }
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
                            content: "";
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
                            content: "";
                            position: absolute;
                            right: 0;
                            height: 0;
                            width: 0;
                            border-left: 10px solid #ccc;
                            border-top: 4px solid #f5f5f5;
                            border-bottom: 4px solid #f5f5f5;
                        }
                        .right:before {
                            content: "";
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
                            content: "";
                            position: absolute;
                            right: 0;
                            height: 0;
                            width: 0;
                            border-left: 10px solid #ccc;
                            border-top: 4px solid #f5f5f5;
                            border-bottom: 4px solid #f5f5f5;
                        }
                        .middle:before {
                            content: "";
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
    }
}
.submit-btn {
    text-align: center;
}
.refund-marks {
    div {
        margin: 20px 0;
    }
}
.table-custom {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    th {
        height: 40px;
        background: #f4f4f4;
        color: #999;
        font-weight: 400;
        text-align: center;
        border: 1px solid #ccc;
    }
    td {
        border: 1px solid #ccc;
        padding: 10px 5px;
    }
    .el-button.el-button--primary a {
        color: #fff;
    }
    .el-input {
        width: 80px;
    }
}
.table-custom1 {
    .refund-row {
        margin: 25px 0;
        .lable {
            margin-right: 15px;
        }
        .reason {
            margin-top: 20px;
            .reason-title {
                div {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 500;
                    margin-right: 10px;
                }
            }
            .reason-info {
                margin: 15px 0;
                font-size: 10px;
            }
        }
        .refund-money {
            padding: 5px 15px;
            width: 300px;
            background: #f5f5f5;
            margin-top: 30px;
            border-radius: 6px;
            div {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
            }
            .expected {
                font-size: 16px;
                font-weight: 500;
            }
        }
        .el-select {
            width: 300px;
        }
    }
    .refund-row:nth-child(2),
    .refund-row:nth-child(4) {
        margin-left: 55px;
    }
}
.inp {
    width: 300px;
    padding: 20px 10px;
    margin: 20px 0;
}
.footer-tool-bar {
    text-align: center;
}
</style>
