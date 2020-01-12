<template>
    <div class="wrapper">
        <div class="pannel-order-detail">
            <!-- 选择申请航段 -->
            <div class="panel" v-if="flightType == TYPES.international">
                <div class="hd">
                    <h2>选择申请航段</h2>
                </div>
                <!-- 表格部分 -->
                <el-table class="el-table--middle newTable" style="width: 100%" border :data="orderChange.flight_info" @selection-change="handleSelectionChange">
                    <el-table-column align="center" type="selection" width="100" :selectable="checkboxT"></el-table-column>
                    <el-table-column align="center" label="航段">
                        <template slot-scope="scope">
                            <span>{{ scope.row.parentKey=="go"?"去程":"返程" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="航班起飞时间">
                        <template slot-scope="scope">
                            <span>{{ scope.row.ddate}} {{scope.row.dptTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="sender_mobile" label="航程信息">
                        <template slot-scope="scope">
                            <p>
                                <span>{{scope.row.dptCity}}</span>
                                <span>→</span>
                                <span>{{scope.row.arrCity}}</span>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="flightNo" label="航班号"></el-table-column>
                    <el-table-column align="center" prop="cabin" label="舱位"></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="pannel-order-detail">
            <!-- 填写改签申请 -->
            <div class="panel">
                <div class="hd">
                    <h2>填写改签申请</h2>
                </div>
                <table class="table-custom1">
                    <tr>
                        <td>第一步：</td>
                        <td>选择乘机人</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-checkbox-group v-model="refundInfo.passengerIdArr">
                                <el-checkbox v-for="(item, $index) in orderChange.passengers" :label="item.passengerId" :key="$index" @change="checkPassenger(item.passengerId)">{{ item.name }}</el-checkbox>
                            </el-checkbox-group>
                        </td>
                    </tr>
                    <tr>
                        <td>第二步：</td>
                        <td>选择改签原因</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-select v-model="refundInfo.reason">
                                <el-option v-for="(item, $index) in orderChange.reason" :key="$index" :label="item.msg" :value="item.code"></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>第三步：</td>
                        <td>选择改签日期和改签航班</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div class="search-item calendar">
                                <div class="label"></div>
                                <el-date-picker v-model="create_date_start" :value-format="'yyyy-MM-dd'" placeholder="请选择改签日期" type="date" @change="changeDate(create_date_start)"></el-date-picker>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-table :data="changeFlightSegmentList" empty-text="您搜索的日期无航班报价，请重新搜索！" v-if="isShow" border>
                                <el-table-column align="center" label width="65">
                                    <template slot-scope="scope">
                                        <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" width="200" label="航空公司">
                                    <template slot-scope="scope">
                                        <div v-for="(item,idx) in scope.row.carrier_info" :key="idx">
                                            <div>{{ item.carrier_name+" "+item.flight_num}}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" width="200" label="起飞时间">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.startTime }}</span>
                                        <br />
                                        <span>{{scope.row.startPlace}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" width="200" label="飞行时间">
                                    <template slot-scope="scope">
                                        <div>
                                            <span>{{ scope.row.duration}}</span>
                                            <span v-if="scope.row.trans>0">中转({{ scope.row.trans_city}}-{{scope.row.trans_times}})</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" width="200" label="降落时间">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.endTime }}</span>
                                        <br />
                                        <span>{{scope.row.endPlace}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" width="200" label="价格">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.cabin==""?"--":scope.row.cabin }}</span>
                                        <br />
                                        <span>待核算</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页功能 -->
                            <div class="pagination" v-if="pagination.total_page && isShow">
                                <el-pagination layout="prev, pager, next" :page-size="pagination.page_size" :page-count="pagination.total_page" :current-page="pagination.page_index" :total="pagination.total_count" @current-change="handleCurrentChange"></el-pagination>
                            </div>
                        </td>
                    </tr>
                </table>
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
                    <tr v-for="(val, key, $index) in changeDet.tgq.tgqInfoArray" :key="$index">
                        <td>{{ key }}</td>
                        <td>{{ val.refund_price }}</td>
                        <td>{{ val.change_price }}</td>
                    </tr>
                </table>
                <div class="text-wrap">
                    <p>详细说明:</p>
                    <p>
                        经济舱同舱更改条件:航班起飞前4小时之前(含)，改期手续费为票面价的0%;
                        航班起飞前4小时之后(不含)，改期手续费为票面价的10% 退票条件:航班起飞前720小时之前(含)，退票手续费为票面价的0%;
                        航班起飞前336小时之前(含)，退票手 续费为票面价的5%;航班起”飞前4小时之前(含)，退票手续费为票面价的10%;航班起飞前4小时之后(不含)，退票手续费为票面价的20%.
                    </p>
                    <p>*以上均为乘客自愿退改签的规则，非自愿退改签规则以可适用法律及航空公司规定为准，航空公司规定以个航空公司官网的公示为准。</p>
                    <p>*申请改签，同舱位变更时，如变更前后的票面价之间存在差价，则补足差价;如同时存在改期手续费和升舱费，则需同时收取改期手续费和舱位差额。已办理完变更、签转的客票，后续再发生退、改、签业务时，所收取的变更费- -律不再退回。</p>
                </div>
            </div>
            <div style="text-align:center">
                <el-button type="primary" size="large" @click="applyChange">确认提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { constants } from "crypto";
import Moment from "moment";
import {
    flightChangeSearch,
    tgInterChangeSearch,
    airInterChangeSearch,
    tgInterApplyChange
} from "src/api/flight";
export default {
    data() {
        return {
            TYPES: {
                land: "1", //国内
                international: "2" //国际
            },
            flightType: "",
            order_no: "",
            child_no: "",
            checked: false,
            templateRadio: "1",
            orderChange: {
                passengers: null,
                reason: null
            },
            value: "我要取消行程、不想飞了",
            create_date_start: "",
            changeList: [],
            changeFlightSegmentList: [],
            tgqInfo: {},
            isShow: false,
            changeDet: {
                tgq: {}
            },
            refundInfo: {
                reason: "",
                passengerIdArr: [],
                activeFlights: [],
                changeFlights: []
            },
            passengerId: [],
            applyRemarks: "", //改签原因文字
            num: "",
            set: null,
            pagination: {
                //分页
                total_count: "", //总条数
                total_page: "", //总页数
                page_index: 1, //分几页
                page_size: 20 //每页20条
            }
        };
    },
    methods: {
        getByOrderChange() {
            let params;
            // if(this.flightType == this.TYPES.land) {
            //   params = {
            //     data: {
            //       order_no: this.order_no,
            //       child_no: this.child_no,
            //       change_date: Moment().format("YYYY-MM-DD")
            //     }
            //   }
            // } else {
            params = {
                data: {
                    order_no: this.order_no
                }
            };
            // }
            //   console.log("000",params)
            // 获取数据
            tgInterChangeSearch({
                params: params,
                success: params => {
                    let { code, msg, data } = params["data"];
                    if (!code) {
                        let flightList = [];
                        for (let i in data.flight_info) {
                            try {
                                for (let l in data.flight_info[i].list) {
                                    if (l != "inArray") {
                                        data.flight_info[i].list[
                                            l
                                        ].parentKey = i;
                                        flightList.push(
                                            data.flight_info[i].list[l]
                                        );
                                    }
                                }
                            } catch (err) {
                                continue;
                            }
                        }
                        data.flight_info = flightList;
                        this.orderChange = data; //详细信息
                        // this.refundInfo.reason = data.reason[0].code
                        // console.log("我要改签详细信息", this.orderChange.flight_info);
                    } else {
                        this.$message.error(msg);
                    }
                },
                showLoading: true
            });
        },
        //点击日期 查询航班
        changeDate(date) {
            if (!this.refundInfo.activeFlights.length) {
                this.$message.error("请选择航班！");
            } else {
                this.isShow = true;
                //改签航班查询
                let params1 = {
                    data: {
                        order_no: this.$route.query.order_no,
                        child_no: this.$route.query.child_no
                    }
                };
                params1.data.changeDate = date;
                params1.data.flight = this.refundInfo.activeFlights;
                params1.data.page_index = this.pagination.page_index; //传点击的页数
                airInterChangeSearch({
                    params: params1,
                    success: params => {
                        let { code, msg, data } = params["data"];
                        //   console.log("我要改签列表信息",data)
                        if (!code) {
                            if (data.tgq.tgqInfo) {
                                let obj = {};
                                for (let i in data.tgq.tgqInfo) {
                                    for (let l in data.tgq.tgqInfo[i]) {
                                        obj[i + (l == "before" ? "前" : "后")] =
                                            data.tgq.tgqInfo[i][l];
                                    }
                                }
                                data.tgq.tgqInfo = obj;
                            }
                            this.num = data.tgq.tgqInfoArray.length; //退改签信息
                            this.changeDet = data; //改签时间航班信息
                            console.log("cc改签航班信息", data);
                            // 分页
                            this.pagination.total_page = data.total_page; //每页条数
                            this.pagination.total_count = Number(
                                data.total_count
                            ); //总条数
                            this.pagination.page_index = Number(
                                data.page_index
                            ); //总页数
                            if (data.changeFlightSegmentList.length) {
                                this.changeFlightSegmentList =
                                    data.changeFlightSegmentList; //改签时间航班信息
                            } else {
                                this.changeFlightSegmentList = [];
                            }
                            data.tgq.tgqInfo = obj;
                        }
                        this.num = data.tgq.tgqInfoArray.length; //退改签信息
                        this.changeDet = data; //改签时间航班信息
                        if (data.changeFlightSegmentList.length) {
                            this.changeList = data.changeFlightSegmentList[0]; //改签时间航班信息
                        } else {
                            // this.$message.error(msg);
                        }
                    },
                    showLoading: true
                });
            }
        },
        //点击分页
        handleCurrentChange(val) {
            this.pagination.page_index = val;
            console.log("val", val);
            this.changeDate(this.create_date_start);
        },
        checkboxT(row, index) {
            // console.log("0000",row.parentKey)
            if (row.parentKey == this.set || !this.set) {
                return 1;
            } else {
                return 0;
            }
        },
        //航段单选
        handleSelectionChange(val) {
            this.refundInfo.activeFlights = val;
            this.set = val[0] ? val[0].parentKey : null;
        },
        //点击航班
        getTemplateRow(index, row) {
            this.refundInfo.changeFlights = [];
            this.refundInfo.changeFlights.push(row);
        },
        getTem1(index, val) {
            this.refundInfo.changeFlights.push(val);
        },
        //选择乘客id
        checkPassenger(id) {
            this.passengerId.push(id);
        },
        //确认提交
        applyChange() {
            if (!this.refundInfo.activeFlights.length) {
                this.$message.error("请选择航班！");
            } else if (!this.refundInfo.passengerIdArr.length) {
                this.$message.error("请选择乘机人！");
            } else if (!this.refundInfo.reason) {
                this.$message.error("请选择退票原因！");
            } else if (!this.refundInfo.changeFlights.length) {
                this.$message.error("请选择改签航班！");
            } else {
                let adultNum = 0;
                let childNum = 0;
                for (let i in this.refundInfo.passengerIdArr) {
                    if (adultNum) break;
                    for (let l in this.orderChange.passengers) {
                        if (
                            this.refundInfo.passengerIdArr[i] ==
                            this.orderChange.passengers[l].passengerId
                        ) {
                            eval(
                                (this.orderChange.passengers[l].age_type ==
                                "成人"
                                    ? "adult"
                                    : "child") + "Num += 1"
                            );
                        }
                    }
                }
                if (!adultNum) {
                    this.$message.error("乘机人需至少包含一名成人！");
                    return;
                }
                if (this.refundInfo.reason == 1) {
                    this.applyRemarks = "我要改变行程计划、我要改航班";
                } else if (this.refundInfo.reason == 2) {
                    this.applyRemarks = "选错日期、选错航班";
                } else {
                    this.applyRemarks = "航班延误或取消、航班时刻变更";
                }
                let params = {
                    data: {
                        order_no: this.order_no,
                        child_no: this.child_no,
                        changeCauseId: this.refundInfo.reason,
                        passengerIds: this.passengerId.join(","),
                        applyRemarks: this.applyRemarks,
                        flight: this.refundInfo.activeFlights,
                        changeFlight: this.refundInfo.changeFlights
                    }
                };
                // 改签申请
                tgInterApplyChange({
                    params: params,
                    success: params => {
                        let { code, msg } = params["data"];
                        if (code != 0) return this.$message.error(msg);
                        this.$message.success(msg);
                        this.$router.push({
                            path: "/singlepro/airOrder/detail",
                            query: {
                                order_no: this.order_no,
                                child_no: this.child_no
                            }
                        });
                    },
                    showLoading: true
                });
            }
        }
    },
    mounted() {
        this.flightType = this.$route.query.type;
        this.order_no = this.$route.query.order_no;
        this.child_no = this.$route.query.child_no;
        this.getByOrderChange();
    }
};
</script>
<style scoped lang="less">
table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.pannel-order-detail {
    background-color: #fff;
    padding: 20px;
    position: relative;
    .panel {
        margin-bottom: 20px;
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
    .rig-wrap {
        width: 300px;
        border: solid 1px rgba(204, 0, 153, 1);
        padding: 20px;
        line-height: 2;
        position: absolute;
        top: 100px;
        right: 100px;
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
    }
    .el-button.el-button--primary a {
        color: #fff;
    }
    .el-input {
        width: 80px;
    }
}
.table-custom1 {
    td {
        padding: 10px 0px;
        &:first-child {
            width: 60px;
        }
    }
}
.inp {
    width: 300px;
    padding: 20px 10px;
    margin: 20px 0;
}
.text-wrap {
    margin: 20px 0;
    line-height: 2;
}
.footer-tool-bar {
    text-align: center;
}
.pagination {
    width: 100%;
    margin-top: 20px;
    text-align: center;
}
</style>
<style lang="less" >
.newTable {
    .el-table__header {
        .el-checkbox {
            display: none;
        }
    }
}
</style>
