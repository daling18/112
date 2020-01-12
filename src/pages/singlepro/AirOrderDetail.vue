<template>
    <div class="wrapper">
        <div class="system-tab">
            <ul class="tab-box">
                <template>
                    <li :class="{on:headTab==0}" @click="headTab=0">订单详情</li>
                    <li :class="{on:headTab==1}" @click="headTab=1" v-if="orderDetail.change_id!=0">改签详情</li>
                    <li :class="{on:headTab==2}" @click="headTab=2" v-if="orderDetail.refund_id!=0">退票详情</li>
                </template>
            </ul>
        </div>

        <!-- 主体部分 -->
        <div>
            <!--订单详情tab -->
            <div class="pannel-order-detail" v-show="headTab==0">
                <!-- 订单信息 -->
                <div class="panel">
                    <div class="hd">
                        <h2>订单信息</h2>
                        <p>供应商订单号：{{orderDetail.order_no}}</p>
                        <p>
                            <span>支付渠道：{{orderDetail.order_pay_type}}</span>
                            <span style="margin-left:20px">第三方流水号：{{orderDetail.channel_req_id }}</span>
                            <span style="margin-left:20px">下单时间:{{orderDetail.create_time}}</span>
                        </p>
                    </div>
                    <!-- 表格部分 -->
                    <table class="table-custom">
                        <tr>
                            <th>订单号</th>
                            <th>机票类型</th>
                            <th>支付方式</th>
                            <th>订单状态</th>
                            <th>操作</th>
                        </tr>
                        <tr>
                            <td>{{orderDetail.order_id}}</td>
                            <td>{{orderDetail.flight_order_type_name}}</td>
                            <td>{{orderDetail.order_pay_type}}</td>
                            <td>{{orderDetail.status_name}}</td>
                            <td style="cursor: pointer;color: #0000FF" v-if="orderDetail.button!=''">
                                <el-dropdown @command="desertChange">
                                    <div class="el-dropdown-link">
                                        操作
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="(item,idx) in orderDetail.button" :key="idx" :command="item">{{item.text}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </td>
                            <td v-else>--</td>
                        </tr>
                    </table>
                </div>
                <div class="panel">
                    <div class="hd">
                        <p>退票规定：取消座位时间计算手续费;按照当前舱位票面价收取退票费;起飞前2.0小时（含）以外收取当前舱位票面价的50.0%退票费;起飞前2.0小时以内及起飞后不得退票;特价T舱以ER项备注为准，具体以航司审核为准。</p>
                        <p>
                            <span style="color:#FF0000;">本客规仅供参考，不作为最终判定依据。</span>
                        </p>
                    </div>
                </div>

                <!--订单价格明细-->
                <div class="panel">
                    <div class="hd">
                        <h2>订单价格明细</h2>
                    </div>
                    <div class="bd">
                        <table class="table-custom">
                            <tr>
                                <th>序号</th>
                                <th>项目</th>
                                <th v-if="orderDetail.flight_order_type == TYPES.International">单价（本位币)</th>
                                <th v-else>单价</th>
                                <th v-if="orderDetail.flight_order_type == TYPES.International">税费</th>
                                <th v-else>机建燃油费</th>
                                <th>数量</th>
                                <th>金额小计</th>
                                <th>说明</th>
                            </tr>
                            <tr v-for="(item,idx) in price_info" :key="idx">
                                <td>{{++idx}}</td>
                                <td>{{item.type_text}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.fee}}</td>
                                <td>{{item.nums}}</td>
                                <td>{{item.sub_total}}</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!--航班信息-->
                <div class="panel">
                    <div class="hd">
                        <h2>航班信息</h2>
                    </div>
                    <!-- 判断分国内机票1和国际机票2 -->
                    <div class="bd" v-if="orderDetail.flight_order_type==2">
                        <div class="table-module">
                            <table class="table-custom">
                                <tr>
                                    <th>航段</th>
                                    <th>航班号</th>
                                    <th>出发地-目的地</th>
                                    <th>出发-到达时间</th>
                                    <th>机型</th>
                                    <th>主飞航司</th>
                                    <th>舱位</th>
                                </tr>
                                <tr v-for="(item,idx) in goList" :key="idx">
                                    <td>去程</td>
                                    <td>{{item.act_flight_num}}</td>
                                    <td>{{item.dptCity}}-{{item.arrCity}}</td>
                                    <td>
                                        <p>
                                            <span class="depart-arr">{{item.ddate}}</span>
                                            <span>{{item.dptTime}}</span>
                                        </p>
                                        <p>至</p>
                                        <p>
                                            <span class="depart-arr">{{item.adate}}</span>
                                            <span>{{item.arrTime}}</span>
                                        </p>
                                    </td>
                                    <td v-if="item.plane_type_name==''">--</td>
                                    <td v-else>{{item.plane_type_name}}</td>
                                    <td>{{item.act_carrier_name}}</td>
                                    <td>{{item.cabin}}</td>
                                </tr>
                                <tr v-for="(k,i) in backList" :key="i+'a'">
                                    <td>返程</td>
                                    <td>{{k.act_flight_num}}</td>
                                    <td>{{k.dptCity}}-{{k.arrCity}}</td>
                                    <td>
                                        <p>
                                            <span class="depart-arr">{{k.ddate}}</span>
                                            <span>{{k.dptTime}}</span>
                                        </p>
                                        <p>至</p>
                                        <p>
                                            <span class="depart-arr">{{k.adate}}</span>
                                            <span>{{k.arrTime}}</span>
                                        </p>
                                    </td>
                                    <td v-if="k.plane_type_name==''">--</td>
                                    <td v-else>{{k.plane_type_name}}</td>
                                    <td>{{k.act_carrier_name}}</td>
                                    <td>{{k.cabin}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- 国内机票航班信息 -->
                    <div class="bd" v-if="orderDetail.flight_order_type==1">
                        <div class="table-module">
                            <table class="table-custom">
                                <tr>
                                    <!-- <th>航段</th> -->
                                    <th>航班号</th>
                                    <th>出发地-目的地</th>
                                    <th>出发-到达时间</th>
                                    <th>机型</th>
                                    <th>主飞航司</th>
                                    <th>舱位</th>
                                </tr>
                                <tr v-for="(item,idx) in flight_info" :key="idx">
                                    <!-- <td>去程</td> -->
                                    <td>{{item.act_flight_num}}</td>
                                    <td>{{item.dept_city}}-{{item.arr_city}}<br />
                                        <template v-if="item.stops == 1">(经停:{{item.stops_city}})</template>
                                    </td>
                                    <td>
                                        <p>
                                            <span class="depart-arr">{{item.dpt_date}}</span>
                                            <span>{{item.dept_time}}</span>
                                        </p>
                                        <p>至</p>
                                        <p>
                                            <span class="depart-arr">{{item.arr_date_all}}</span>
                                            <span>{{item.arr_time}}</span>
                                        </p>
                                    </td>
                                    <td v-if="item.plane_type_name==''">--</td>
                                    <td v-else>{{item.plane_type_name}}</td>
                                    <td>{{item.act_carrier_name}}</td>
                                    <td>{{item.cbcn}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <!--乘机人信息-->
                <div class="panel">
                    <div class="hd">
                        <h2>乘机人信息</h2>
                    </div>
                    <div class="bd">
                        <div class="table-module">
                            <table class="table-custom">
                                <tr>
                                    <th>姓名</th>
                                    <th>乘客类型</th>
                                    <th>生日</th>
                                    <th>证件信息</th>
                                    <th>手机号</th>
                                    <th>票号</th>
                                </tr>
                                <tr v-for="(item,idx) in orderDetail.passengers" :key="idx">
                                    <td>{{item.name}}</td>
                                    <td>{{item.age_type}}</td>
                                    <td>{{item.birthday}}</td>
                                    <td>{{item.card_type}}{{item.card_no}}</td>
                                    <td v-if="item.name==orderDetail.passengers[0].name">{{orderDetail.contact_mob}}</td>
                                    <td v-else>--</td>
                                    <td>{{item.ticket_no==""?"--":item.ticket_no}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <!--联系人信息-->
                <div class="panel">
                    <div class="hd">
                        <h2>联系人信息</h2>
                    </div>
                    <div class="bd">
                        <div class="table-module">
                            <table class="table-custom">
                                <tr>
                                    <th>手机号码</th>
                                </tr>
                                <tr>
                                    <td>{{orderDetail.contact_mob}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="footer-tool-bar">
                    <el-button size="large" @click="$router.push({path:'/singlepro/airOrder/list'})">返回</el-button>
                </div>

                <!-- 退款操作 -->
                <el-dialog title="退款操作" :visible.sync="centerDialogVisible" width="500px" center>
                    <div>
                        <el-radio-group v-model="radio1">
                            <el-radio label="1">同意</el-radio>
                            <el-radio label="0">不同意</el-radio>
                        </el-radio-group>
                    </div>
                    <div>
                        <input v-model="input" placeholder="退款金额" class="inp" v-show="radio1 == 1" />
                        <input v-model="input" placeholder="请备注不同意原因" class="inp" v-show="radio1 == 0" />
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handle('centerDialogVisible')">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 改签操作 -->
                <el-dialog title="改签操作" :visible.sync="centerDialogVisible1" width="500px" center>
                    <div>
                        <el-radio-group v-model="radio1">
                            <el-radio label="1">同意</el-radio>
                            <el-radio label="0">不同意</el-radio>
                        </el-radio-group>
                    </div>
                    <div>
                        <input v-model="input" placeholder="改签金额" class="inp" v-show="radio1 == 1" />
                        <input v-model="input" placeholder="请备注不同意原因" class="inp" v-show="radio1 == 0" />
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="handle('centerDialogVisible1')">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 改签-已支付 -->
                <el-dialog title="改签操作-已支付" :visible.sync="centerDialogVisible2" width="500px" center>
                    <div style="margin:0 0 20px">已支付改签费用:{{changeDetail.amount}}元</div>
                    <div>
                        <el-radio-group v-model="radio1">
                            <el-radio label="1">同意</el-radio>
                            <el-radio label="0">不同意</el-radio>
                        </el-radio-group>
                    </div>
                    <div>
                        <input v-model="input" placeholder="请备注不同意原因" class="inp" v-show="radio1 == 0" />
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="changePay(centerDialogVisible2)">确 定</el-button>
                    </span>

                    <table class="table-custom" v-show="radio1 == 1" style="margin:20px 0">
                        <tr>
                            <th>姓名</th>
                            <th>新票号</th>
                        </tr>
                        <tr v-for="(item,idx) in changeDetail.passengers" :key="idx">
                            <td>{{item.name}}</td>
                            <td>
                                <input v-model="item.ticket_num_new" />
                            </td>
                        </tr>
                    </table>
                </el-dialog>
            </div>
            <!-- 改签详情tab -->
            <div class="pannel-order-detail" v-show="headTab==1">
                <table class="table-custom">
                    <tr>
                        <th>申请时间</th>
                        <th>改签状态</th>
                        <th>改签费用</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td>{{changeDetail.create_time}}</td>
                        <td>{{changeDetail.change_desc}}</td>
                        <td>{{changeDetail.amount=="-1"?"待核算":changeDetail.amount}}</td>
                        <td v-if="(changeDetail.amount * 1 > 0 && changeDetail.change_status == 2 )" class="changeCol">
                            <el-button type="info" plain @click="payMoney('change')" class="payBtn">支付差价</el-button>
                        </td>
                        <td v-else>--</td>
                    </tr>
                </table>
                <br />
                <table class="table-custom">
                    <tr>
                        <td width="150">改签说明</td>
                        <td colspan="4">
                            <table class="table-custom">
                                <tr>
                                    <th></th>
                                    <th>航程时间</th>
                                    <th>航班信息</th>
                                    <th>舱位</th>
                                </tr>
                                <tr v-for="(item,idx) in flight" :key="idx+'a'">
                                    <td>原航班</td>
                                    <td>
                                        <p>
                                            <span>{{year}}-{{item.dpt_date}}</span>
                                        </p>
                                        <!-- <p>{{item.dpt_time}}</p> -->
                                        <!-- <p>{{item.dpt_date}}</p> -->
                                        <p>{{item.dpt_time+"-"+item.arr_time}}</p>
                                    </td>
                                    <td>
                                        <p>
                                            <span>{{item.dptCity}}</span>
                                            <span>-</span>
                                            <span>{{item.arrCity}}</span>
                                        </p>
                                        <p>{{item.flight_num}}</p>
                                    </td>
                                    <td v-if="item.cabin==''">--</td>
                                    <td v-else>{{item.cabin}}</td>
                                </tr>
                                <tr v-for="(item,idx) in change_flight" :key="idx">
                                    <td>改签至</td>
                                    <td>
                                        <p>
                                            <span>{{year}}-{{item.dpt_date}}</span>
                                        </p>
                                        <p>{{`${item.dpt_time}-${item.arr_time}`}}</p>
                                    </td>
                                    <td>
                                        <p>
                                            <span>{{item.dpt_city}}</span>
                                            <span>-</span>
                                            <span>{{item.arr_city}}</span>
                                        </p>
                                        <p>{{item.flight_num}}</p>
                                    </td>
                                    <td v-if="item.cabin==''">--</td>
                                    <td v-else>{{item.cabin}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td width="150">改签乘客信息</td>
                        <td colspan="4">
                            <table class="table-custom">
                                <tr>
                                    <th>姓名</th>
                                    <th>乘客类型</th>
                                    <th>生日</th>
                                    <th>证件信息</th>
                                    <th>手机号</th>
                                    <th>票号</th>
                                    <th>改签后票号</th>
                                </tr>
                                <tr v-for="(item,idx) in changeDetail.passengers" :key="idx">
                                    <td>{{item.name}}</td>
                                    <td>{{item.age_type}}</td>
                                    <td>{{item.birthday}}</td>
                                    <td>{{item.card_type}}{{item.card_no}}</td>
                                    <td v-if="item.name==changeDetail.passengers[0].name">{{changeDetail.contact_mob}}</td>
                                    <td v-else>--</td>
                                    <td>{{item.ticket_no}}</td>
                                    <td>{{item.ticket_no_new}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 退票详情tab -->
            <div class="pannel-order-detail" v-show="headTab==2">
                <table class="table-custom">
                    <tr>
                        <th>申请时间</th>
                        <th>乘客姓名/票号</th>
                        <th>票损</th>
                        <th>应退款金额</th>
                        <th>退款状态</th>
                    </tr>
                    <tr v-for="(item,idx) in desertDetail.passengers" :key="idx">
                        <td>{{desertDetail.create_time}}</td>
                        <td>{{item.name}}</td>
                        <td>{{desertDetail.fee}}</td>
                        <td>{{desertDetail.amount=="-1"?"待核算":desertDetail.amount}}</td>
                        <td>{{desertDetail.refund_desc}}</td>
                    </tr>
                    <tr>
                        <td>申请航班</td>
                        <td colspan="4">
                            <table id="newTale" width="100%">
                                <tr>
                                    <th>航程时间</th>
                                    <th>航班信息</th>
                                    <th>舱位</th>
                                </tr>
                                <tr v-for="(item,idx) in desertDetail.flight_info" :key="idx">
                                    <td>
                                        <p>{{item.dpt_date}}</p>
                                        <p>{{item.dpt_time+"-"+item.arr_time}}</p>
                                    </td>
                                    <td>
                                        <p>{{item.dptCity+ "-" +item.arrCity}}</p>
                                        <p>{{item.flight_num}}</p>
                                    </td>
                                    <td>{{item.cabin}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>申请内容</td>
                        <td colspan="4" style="text-align:left">
                            <div>【退票原因】:{{desertDetail.refund_cause}}</div>
                            <p v-if="num !=0">【凭证】:</p>
                            <div v-for="(item,idx) in desertDetail.upload_pic" :key="idx">
                                <img :src="item" alt width="200px" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>失败原因</td>
                        <td colspan="4" style="text-align:left">{{desertDetail.reason}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 主体部分结束 -->
    </div>
</template>
<script>
import {
    getAirSingleOrderDetail,
    getAirSingleOrderChange,
    getAirSingleOrderDesert,
    AirRefund,
    AirChange,
    AirChangePay,
    payment,
    cancelLandOrder,
    cancelInternationalOrder
} from "src/api/flight";
import { constants } from "crypto";
export default {
    data() {
        return {
            TYPES: {
                Land: 1, //国内
                International: 2, //国际
                cancelOrder: 10, //取消订单
                orderPay: 20, //订单支付
                applyRefund: 30, //申请退票
                BomApplyRefund: 35, //BOM退票操作
                applyChange: 40, //申请改签
                BomChange: 45, //BOM改签操作
                changePay: 50, //改签支付
                cancelChange: 60 //取消改签
            },
            radio1: "1",
            input: "",
            headTab: 0,
            centerDialogVisible: false,
            centerDialogVisible1: false,
            centerDialogVisible2: false,
            orderDetail: {},
            price_info: [],
            flight_info: [],
            year: new Date().getFullYear(),
            changeDetail: {},
            goList: [], //去程
            backList: [], //回城
            info1List: [], //国际航班信息
            desertDetail: {},
            change_flight: [], //改签航班
            flight: [], //原航班
            btnArr: [],
            num: ""
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        //退票改签
        async desertChange(item) {
            //订单支付
            item.type_id == this.TYPES.orderPay && this.payMoney("order");
            //取消订单
            if (item.type_id == this.TYPES.cancelOrder) {
                const params = {
                    order_no: this.orderDetail.order_no
                };
                if (
                    this.orderDetail.flight_order_type ==
                    this.TYPES.International
                ) {
                    //国际取消
                    const { code, data, msg } = await cancelInternationalOrder(
                        params
                    );

                    if (code !== 0) return this.$message.error(msg);
                    this.$message.success(data.msg);
                    this.getByOrderDetail();
                } else {
                    //国内取消
                    const { code, data, msg } = await cancelLandOrder(params);

                    if (code !== 0) return this.$message.error(msg);
                    this.$message.success(data.msg);
                    this.getByOrderDetail();
                }
            }
            // 我要退票
            if (item.type_id == this.TYPES.applyRefund) {
                this.$router.push({
                    path: "/singlepro/airOrder/dersetOrder",
                    query: {
                        order_no: this.orderDetail.order_no,
                        type: this.orderDetail.flight_order_type,
                        child_no: this.orderDetail.child_no
                    }
                });
            }
            //我要改签
            if (item.type_id == this.TYPES.applyChange) {
                // return console.log(this.orderDetail.flight_info[0].dpt_date)
                let url =
                    this.orderDetail.flight_order_type ==
                    this.TYPES.International
                        ? "/singlepro/airOrder/changeOrder"
                        : "/singlepro/airOrder/landchangeOrder";
                this.$router.push({
                    path: url,
                    query: {
                        order_no: this.orderDetail.order_no,
                        type: this.orderDetail.flight_order_type,
                        child_no: this.orderDetail.child_no,
                        change_id: this.orderDetail.change_id,
                        order_id: this.orderDetail.order_id,
                        dpt_date: this.orderDetail.flight_info[0].dpt_date
                    }
                });
            }
            this.radio1 = "1";
            this.input = "";
            //退票操作35 改签操作45
            if (item.type_id == 35) {
                this.centerDialogVisible = true;
            }
            if (
                item.type_id == 35 ||
                item.type_id == 45 ||
                item.type_id == 65
            ) {
                this.radio1 = "1";
                this.input = "";
                if (item.type_id == 35) {
                    this.centerDialogVisible = true;
                }
                if (item.type_id == 45) {
                    this.centerDialogVisible1 = true;
                }
                //改签-已支付
                if (item.type_id == 65) {
                    this.centerDialogVisible2 = true;
                }
            }
        },
        getByOrderDetail() {
            let params = {
                data: {
                    order_no: this.$route.query.order_no,
                    child_no: this.$route.query.child_no
                }
            };
            // console.log("100", params);
            //1获取数据-订单详情
            getAirSingleOrderDetail({
                params: params,
                success: params => {
                    let { code, msg, data } = params["data"];
                    if (!code) {
                        this.orderDetail = data; //详细信息
                        this.price_info = data.order_price_info; //国内订单价格明细
                        this.flight_info = data.flight_info; //国内航班信息明细
                        if (this.orderDetail.flight_order_type == 2) {
                            if (data.flight_info.go) {
                                this.goList = data.flight_info.go.list; //国际航班信息明细去程
                            }
                            if (data.flight_info.back) {
                                this.backList = data.flight_info.back.list; //国际航班信息明细返程
                            }
                        }
                        this.btnArr = data.button; // 按钮框
                        console.log(
                            "订单详情this.orderDetail",
                            this.orderDetail
                        );

                        //2获取数据-改签详情
                        if (this.orderDetail.change_id != 0) {
                            let params1 = {
                                data: {
                                    change_id: data.change_id
                                }
                            };
                            getAirSingleOrderChange({
                                params: params1,
                                success: params => {
                                    let { code, msg, data } = params["data"];
                                    if (!code) {
                                        this.changeDetail = data; //改签详情
                                        for (let i in this.changeDetail
                                            .passengers) {
                                            //改签新票号字段
                                            this.changeDetail.passengers[
                                                i
                                            ].ticket_num_new = "";
                                        }
                                        this.change_flight =
                                            data.flight_info.change_flight; //改签航班改签详情
                                        this.flight = data.flight_info.flight; //改签详情原航班
                                        console.log(
                                            "改签详情changeDetail",
                                            this.changeDetail
                                        );
                                    } else {
                                        this.$message.error(msg);
                                    }
                                },
                                showLoading: true
                            });
                        }

                        //3获取数据-退票详情
                        if (this.orderDetail.refund_id != 0) {
                            let params2 = {
                                data: {
                                    refund_id: data.refund_id
                                }
                            };
                            getAirSingleOrderDesert({
                                params: params2,
                                success: params => {
                                    let { code, msg, data } = params["data"];
                                    if (!code) {
                                        this.desertDetail = data; //退票详情
                                        this.num = this.desertDetail.upload_pic.length;
                                        console.log(
                                            "退票详情desertDetail",
                                            this.desertDetail
                                        );
                                    } else {
                                        this.$message.error(msg);
                                    }
                                },
                                showLoading: true
                            });
                        }
                    } else {
                        this.$message.error(msg);
                    }
                },
                showLoading: true
            });
        },
        //退票改签操作
        handle(type) {
            let params = {
                data: {
                    is_agree: this.radio1
                }
            };
            params.data[this.radio1 == 1 ? "amount" : "reason"] = this.input;
            params.data[
                type == "centerDialogVisible" ? "refund_id" : "change_id"
            ] =
                type == "centerDialogVisible"
                    ? this.orderDetail.refund_id
                    : this.orderDetail.change_id;
            console.log("aa退票改签paranms", params);
            if (type == "centerDialogVisible") {
                AirRefund({
                    params,
                    success: res => {
                        let result = res.data;
                        if (result.code === 0) {
                            this.$message({
                                type: "success",
                                message: result.msg
                            });
                            this.centerDialogVisible = false;
                            this.getByOrderDetail();
                        } else {
                            this.$message({
                                type: "error",
                                message: result.msg
                            });
                        }
                    },
                    showLoading: true
                });
            } else if (type == "centerDialogVisible1") {
                AirChange({
                    params,
                    success: res => {
                        let result = res.data;
                        if (result.code === 0) {
                            this.$message({
                                type: "success",
                                message: result.msg
                            });
                            this.centerDialogVisible1 = false;
                            this.getByOrderDetail();
                        } else {
                            this.$message({
                                type: "error",
                                message: result.msg
                            });
                        }
                    },
                    showLoading: true
                });
            }
        },
        //改签-已支付
        changePay(type) {
            let params = {
                data: {
                    is_agree: this.radio1
                }
            };
            let arr = [];
            this.changeDetail.passengers.forEach(item => {
                let obj = {
                    name: item.name,
                    ticket_num_new: item.ticket_num_new
                };
                return arr.push(obj);
            });
            params.data.change_id = this.changeDetail.change_id;
            params.data.passengers = arr;
            params.data.reason = this.input;
            console.log("改签-已支付passengers", params);
            this.centerDialogVisible2 = false;

            AirChangePay({
                params,
                success: res => {
                    let result = res.data;
                    console.log("cccccparams", params);
                    if (result.code === 0) {
                        this.$message({
                            type: "success",
                            message: result.msg
                        });
                        this.centerDialogVisible = false;
                        this.getByOrderDetail();
                    } else {
                        this.$message({
                            type: "error",
                            message: result.msg
                        });
                    }
                },
                showLoading: true
            });
        },
        // 改签支付差价
        payMoney(type) {
            let orderId, amount, customParams;

            if (type === "change") {
                orderId = this.changeDetail.order_id;
                amount = this.changeDetail.amount;
                customParams = this.changeDetail.change_id;
            } else {
                orderId = this.orderDetail.order_id;
                amount = this.orderDetail.amount;
                customParams = "";
            }
            let params = {
                data: {
                    orderId,
                    amount,
                    platform: "1",
                    returnUrl:
                        window.location.origin +
                        window.location.pathname +
                        "#/singlepro/airOrder/detail?" +
                        "order_no=" +
                        this.orderDetail.order_no +
                        "&child_no=" +
                        this.orderDetail.child_no,
                    customParams
                }
            };
            //  return  console.log("00改签支付差价params",params)
            payment({
                params,
                success: params => {
                    console.log("11改签支付差价params", params);
                    let { code, msg, data } = params["data"];
                    if (code !== 0) return this.$message.error(msg);
                    console.log(data, "data");
                    let div = document.createElement("div");
                    div.innerHTML = data.form;
                    div.hidden = true;
                    document.body.appendChild(div);
                    div.getElementsByTagName("form")[0].submit();
                },
                showLoading: true
            });
        }
    },
    mounted() {
        this.getByOrderDetail();
    }
};
</script>
<style  lang="less">
table {
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.pannel-order-detail {
    background-color: #fff;
    padding: 20px;
    .panel {
        margin-bottom: 20px;
        > .hd {
            line-height: 30px;
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
    .depart-arr {
        margin-right: 5px;
    }
}
.inp {
    width: 300px;
    padding: 20px 10px;
    margin: 20px 0;
    box-sizing: border-box;
}
.footer-tool-bar {
    text-align: center;
}
</style>
<style lang="less">
.changeCol {
    .payBtn {
        background: #b10c79;
        border: none;
        color: white;
    }
    .payBtn:hover {
        background: #b10c79;
    }
}
</style>
