<template>
    <div class="el-tabs el-tabs--border-card">
        <div class="el-tabs__header">
            <div class="el-tabs__nav-wrap">
                <div class="el-tabs__nav">
                    <div class="el-tabs__item is-active">
                        订单详情
                    </div>
                    <div v-if="permission.refundDetail && orderDetail && orderDetail.order_info.refund_status" class="el-tabs__item" @click="$router.push({ name: orderTypeRouterName.orderRefundDetailName, query: { orderId: $route.query.orderId }})">
                        退款详情
                    </div>
                </div>
            </div>
        </div>
        <div class="el-tabs__content">
            <div class="wrapper">
                <div v-if="orderDetail" class="hotel-detail">
                    <div class="panel">
                        <div class="hd">
                            <h2>订单信息</h2>
                            <span><span>支付渠道：{{orderDetail.order_info.pay_channel_code}}</span><span>第三方流水号：{{orderDetail.order_info.channel_req_no}}</span><span>供应商：{{orderDetail.order_info.source_name}}</span></span>
                        </div>
                        <div class="hd">
                            <h2>订单信息</h2>
                        </div>
                        <div class="bd">
                            <p class="tips" v-if="orderDetail.order_info.order_status == '1'">
                                请在{{endOrderTime}}分钟内支付订单，未准时支付，订单会自动关闭
                            </p>
                            <p class="mb10" v-if="(orderType == 'SaleOrder' || orderType == 'SingleOrder') && orderDetail.order_info.source != 4">自营订单：{{orderDetail.order_info.other_order_id}}</p>
                            <p class="mb10" v-if="orderType == 'SelfSupportOrder'">单项订单：{{orderDetail.order_info.other_order_id}}</p>
                            <table class="table-order">
                                <thead>
                                    <tr>
                                        <th>订单号</th>
                                        <th>下单时间</th>
                                        <th>入离时间</th>
                                        <th>支付方式</th>
                                        <th>订单总金额</th>
                                        <th>已收金额</th>
                                        <th>未收金额</th>
                                        <th>结算方</th>
                                        <th>订单状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span class="color-purple">[{{ orderDetail.order_info.order_source_name }}]</span>{{ orderDetail.order_info.order_id }}</td>
                                        <td>{{ orderDetail.order_info.create_time }}</td>
                                        <td>{{ orderDetail.order_info.check_in_date + '至' + orderDetail.order_info.check_out_date }}</td>
                                        <td>{{ orderDetail.order_info.pay_type }}</td>
                                        <td>{{ orderDetail.order_info.total_price }}</td>
                                        <td>
                                            <span v-if="orderDetail.order_info.status_code != 3">{{ orderDetail.order_info.receipted_amount }}</span>
                                            <span v-else>--</span>
                                        </td>
                                        <td>{{ orderDetail.order_info.unpaid_amount }}</td>
                                        <td>{{ orderDetail.order_info.distributor_name }}</td>
                                        <td>{{ orderDetail.order_info.order_status | getOrderStatusText }}</td>
                                        <td>
                                            <el-dropdown v-if="orderDetail.order_info.order_status != 5 &&
                              orderDetail.order_info.order_status != 4 &&
                              (permission.cancelOrder || 
                                permission.onlinePay || 
                                permission.orderRefund || 
                                permission.confirmOrder || 
                                permission.addCollection || 
                                permission.dtlCollection || 
                                permission.setOperation)">
                                                <span class="el-dropdown-link">
                                                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                                                </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <template v-if="!orderDetail.order_info.is_self_order && orderDetail.order_info.order_status == 1">
                                                        <el-dropdown-item v-if="permission.cancelOrder">
                                                            <a href="javascript:;" @click="handleCancelOrder">取消订单</a>
                                                        </el-dropdown-item>
                                                        <el-dropdown-item v-if="permission.onlinePay">
                                                            <a href="javascript:;" @click="handleOrderHasAvail">在线支付</a>
                                                        </el-dropdown-item>
                                                    </template>
                                                    <!-- <template v-if="permission.orderRefund && !orderDetail.order_info.is_self_order && (orderDetail.order_info.order_status == 2 || orderDetail.order_info.order_status == 3)">
                            <el-dropdown-item>
                              <a href="javascript:;" @click="handleRefundOrder">申请退款</a>
                            </el-dropdown-item>
                          </template> -->
                                                    <template v-if="permission.confirmOrder && orderDetail.order_info.is_self_order && orderDetail.order_info.order_status == 2 && orderDetail.order_info.change_op_flag">
                                                        <el-dropdown-item>
                                                            <a href="javascript:;" @click="affirmVisible = true">确认订单</a>
                                                        </el-dropdown-item>
                                                    </template>
                                                    <template v-if="orderDetail.order_info.is_self_order && 
                                          orderDetail.order_info.order_status != 1 && 
                                          orderDetail.order_info.order_status != 2 && 
                                          orderDetail.order_info.order_status != 4 && 
                                          orderDetail.order_info.order_status != 5 && 
                                          orderDetail.order_info.change_op_flag">
                                                        <el-dropdown-item v-if="permission.addCollection">
                                                             <a href="javascript:;" @click="addShoukuanVisible = true">添加收款</a>
                                                        </el-dropdown-item>
                                                    </template>
                                                    <template v-if="orderDetail.order_info.order_status != 1 && 
                                          orderDetail.order_info.order_status != 2 && 
                                          orderDetail.order_info.order_status != 4 && 
                                          orderDetail.order_info.order_status != 5">
                                                        <el-dropdown-item v-if="permission.dtlCollection">
                                                            <router-link :to="{ name: orderTypeRouterName.orderIncomeDetailName, 
                              query: { bid:orderDetail.bill_id , type:orderTypeRouterName.configType}}">查看收入</router-link>
                                                        </el-dropdown-item>
                                                    </template>
                                                    <el-dropdown-item v-if="permission.setOperation && orderType != 'SaleOrder' && orderDetail.order_info.change_op_flag">
                                                        <a href="javascript:;" @click="handleChangeOrderOperator">订单负责人</a>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                            <span v-else>--</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="hd">
                            <h2>产品信息</h2>
                        </div>
                        <div class="bd">
                            <table class="rooms-set-table">
                                <tbody>
                                    <tr>
                                        <th>酒店：</th>
                                        <td>{{ orderDetail.hotel_info.hotel_name || '暂无该数据' }}</td>
                                        <th>地址：</th>
                                        <td>{{ orderDetail.hotel_info.hotel_address || '暂无该数据' }}</td>
                                    </tr>
                                    <tr>
                                        <th>套餐：</th>
                                        <td>{{ orderDetail.order_info.rate_name || '暂无该数据' }}</td>
                                        <th>房型：</th>
                                        <td>{{ orderDetail.hotel_info.room_info.room_name || '暂无该数据' }}</td>
                                    </tr>
                                    <tr>
                                        <th>早餐：</th>
                                        <td>{{ orderDetail.order_info.breakfast_name || '暂无该数据' }}</td>
                                        <th>床型：</th>
                                        <td>{{ orderDetail.hotel_info.room_info.bed_type || '暂无该数据' }}</td>
                                    </tr>
                                    <tr>
                                        <th>房间数：</th>
                                        <td colspan="3">{{ orderDetail.order_info.room_num }}间</td>
                                    </tr>
                                    <tr>
                                        <th>取消政策：</th>
                                        <td colspan="3" v-html="orderDetail.order_info.cancel_type_name || '暂无该数据'"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="rooms-date-price">
                                <div v-for="(room, key) in orderDetail.hotel_info.date_price" :key="key" class="rooms-date-price-item">
                                    <div class="day">
                                        <p>{{ room.date }}</p>
                                        <span>{{ room.date | formatDateDay }}</span>
                                    </div>
                                    <div class="pri">
                                        <p v-if="orderType == 'SelfSupportOrder'">￥{{ room.price }}</p>
                                        <p v-else>￥{{ room.sale_price }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="hd">
                            <h2>订单价格明细</h2>
                        </div>
                        <div class="bd">
                            <div class="detail-total">
                                <div class="detail">
                                    <span>
                                        结算币种 / 汇率：人民币 / 1
                                    </span>
                                    <span>
                                        结算总金额：<i>{{ totalPrice }}</i>
                                    </span>
                                    <span>
                                        本位币：<i>{{ totalPrice }}</i>
                                    </span>
                                </div>
                                <!-- <el-button type="primary" :class="'op-btn'" @click="addPricingHandler">+ 新增项目</el-button> -->
                            </div>
                            <table class="table-order">
                                <thead>
                                    <tr>
                                        <th width="50">序号</th>
                                        <th>项目</th>
                                        <th>单价（本位币)</th>
                                        <th>结算单价</th>
                                        <th width="110">数量</th>
                                        <th>结算金额小计</th>
                                        <th>小计（本位币)</th>
                                        <th width="200">说明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detail, key) in orderDetail.order_price_detail" :key="key">
                                        <td>{{ key + 1 }}</td>
                                        <td>{{ detail.item_name }}</td>
                                        <td>{{ detail.unit_price }}</td>
                                        <td>{{ detail.rmb_unit_price }}</td>
                                        <td>{{ detail.num }}</td>
                                        <td>{{ detail.rmb_total_amount }}</td>
                                        <td>{{ detail.rmb_total_amount }}</td>
                                        <td>{{ detail.remark }}</td>
                                    </tr>
                                    <!-- <tr v-if="pricingForm.length" v-for="(pric, key) in pricingForm" :key="key">
                    <td>{{ key + orderDetail.order_price_detail.length + 1 }}</td>
                    <td><el-input></el-input></td>
                    <td><el-input></el-input></td>
                    <td><el-input></el-input></td>
                    <td><el-input-number :min="1" :class="'input-number'"></el-input-number></td>
                    <td></td>
                    <td></td>
                    <td><el-input></el-input></td>
                    <td></td>
                  </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="hd">
                            <h2>联系人</h2>
                        </div>
                        <div class="bd">
                            <table class="table-order">
                                <thead>
                                    <tr>
                                        <th>姓名</th>
                                        <th>手机</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ orderDetail.contact_info.contact_name }}</td>
                                        <td>{{ orderDetail.contact_info.contact_mobile }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="hd">
                            <h2>入住人</h2>
                        </div>
                        <div class="bd">
                            <table class="table-order">
                                <thead>
                                    <tr>
                                        <th>房间</th>
                                        <th>入住人姓名</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(tourist, key) in orderDetail.tourist_list" :key="key">
                                        <td>{{ '房间' + (key + 1) }}</td>
                                        <td>{{ tourist.tourist_name }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="hd">
                            <h2>订单记录</h2>
                        </div>
                        <div class="bd">
                            <table class="table-order">
                                <thead>
                                    <tr>
                                        <th>时间</th>
                                        <th>操作说明</th>
                                        <th>订单状态</th>
                                        <th>操作人</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(log, key) in orderDetail.order_log" :key="key">
                                        <td>{{ log.create_time }}</td>
                                        <td>{{ log.op_type }}</td>
                                        <td>{{ log.order_status }}</td>
                                        <td>{{ log.op_user_name }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <add-shoukuan-dialog :visible.sync="addShoukuanVisible" @submit="handleSaveShoukuan" @close="addShoukuanVisible = false"></add-shoukuan-dialog>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="affirmVisible" size="tiny">
            <div class="affirm">
                <i class="el-icon-warning"></i>
                <div class="affirm-cont">
                    <span>确定该订单有效？</span>
                    <p>确认无效后，订单会被取消自动退款给买家，请慎重操作</p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleConfirmOrder(false)">确认无效</el-button>
                <el-button type="primary" @click="handleConfirmOrder(true)">确认有效</el-button>
            </span>
        </el-dialog>
        <online-pay v-if="permission.onlinePay && orderDetail && orderDetail.order_info.order_status == 1" ref="onlinePay" :order-id="orderDetail.order_info.order_id" order-resource="3" />
        <change-order-operator v-if="permission.setOperation" ref="operator" order-type="2" @change-success="getHotelOrderDetailHandler"></change-order-operator>
    </div>
</template>
<script>
import OnlinePay from "./components/OnlinePay.vue";
import AddShoukuanDialog from "./components/AddShoukuanDialog.vue";
import ChangeOrderOperator from "src/plugins/ChangeOrderOperator.vue";
import {
    getDistributionHolelMyOrderDetailAsyncRequest,
    getDistributionHolelSingleOrderDetailAsyncRequest,
    getDistributionHolelSelfSupportOrderDetailAsyncRequest,
    cancelDistributionHolelOrderAsyncRequest,
    refundDistributionHolelOrderAsyncRequest,
    setDistributionHolelConfirmOrderAsyncRequest,
    getDistributionHotelOrderHasAvail,
    NewHotelOrderDetailAsyncRequest,
    newSetDistributionHolelConfirmOrderAsyncRequest
} from "src/api/hotel";
import {
    saveSaleOrderGathering,
    saveTeamOrderGathering,
    financeSaveOrderGathering
} from "src/api/api";

import { getHotelOrderDetail } from "src/api/order";

import { date } from "src/utils/format";

export default {
    data() {
        return {
            orderDetail: null,
            pricingForm: [],
            addShoukuanVisible: false,
            endOrderTime: null,
            affirmVisible: false
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
        orderType() {
            let routeName = this.$route.name,
                type = "";
            switch (routeName) {
                case "HotelSaleOrderDetail":
                    type = "SaleOrder";
                    break;
                case "HotelSingleOrderDetail":
                    type = "SingleOrder";
                    break;
                case "HotelSelfSupportOrderDetail":
                    type = "SelfSupportOrder";
                    break;
                case "financeHotelMyOrderDetail":
                    type = "financeRefund";
                    break;
                case "settlementRefdealHotelOrderDetail":
                    type = "SingleOrder";
                    break;
                case "ShoporderHotelorderDetail":
                    type = "ShopOrder";
                    break;
            }
            return type;
        },
        orderTypeRouterName() {
            let type = this.orderType,
                configType = "",
                orderRefundDetailName = "",
                orderIncomeDetailName = "";

            switch (type) {
                case "SaleOrder":
                    orderRefundDetailName = "HotelSaleOrderRefundDetail";
                    orderIncomeDetailName = "HotelSaleOrderIncomeDetail";
                    configType = 18;
                    break;
                case "SingleOrder":
                    orderRefundDetailName = "HotelSingleOrderRefundDetail";
                    orderIncomeDetailName = "HotelSingleOrderIncomeDetail";
                    configType = 5;
                    break;
                case "SelfSupportOrder":
                    orderRefundDetailName = "HotelSelfSupportOrderRefundDetail";
                    orderIncomeDetailName = "HotelSelfSupportOrderIncomeDetail";
                    configType = 11;
                    break;
                case "financeRefund":
                    orderRefundDetailName = "financeHotelMyOrderRefundDetail";
                    orderIncomeDetailName =
                        "DistributionHotelMyOrderIncomeDetail";
                    configType = 18;
                    break;
                case "ShopOrder":
                    orderRefundDetailName = "HotelSaleOrderRefundDetail";
                    orderIncomeDetailName = "HotelSaleOrderIncomeDetail";
                    configType = 18;
                    break;
            }
            return {
                orderRefundDetailName,
                orderIncomeDetailName,
                configType
            };
        },
        permission() {
            let type = this.orderType,
                permission = {
                    onlinePay: false,
                    cancelOrder: false,
                    orderRefund: false,
                    confirmOrder: false,
                    addCollection: false,
                    dtlCollection: false,
                    setOperation: false,
                    refundDetail: false
                };

            switch (type) {
                case "SaleOrder":
                    permission.onlinePay = this.$menuPermission(
                        "saleorder/hotel/onlinepay"
                    );
                    permission.cancelOrder = this.$menuPermission(
                        "saleorder/hotel/cancelorder"
                    );
                    permission.orderRefund = this.$menuPermission(
                        "saleorder/hotel/aplrefund"
                    );
                    permission.dtlCollection = this.$menuPermission(
                        "saleorder/hotel/getincodet"
                    );
                    permission.refundDetail = this.$menuPermission(
                        "saleorder/hotel/refunddet"
                    );
                    break;
                case "SingleOrder":
                    permission.cancelOrder = this.$menuPermission(
                        "singlepro/singleorder/hotel/cancelorder"
                    );
                    permission.orderRefund = this.$menuPermission(
                        "singlepro/singleorder/hotel/aplrefund"
                    );
                    permission.dtlCollection = this.$menuPermission(
                        "singlepro/singleorder/hotel/getincodet"
                    );
                    permission.setOperation = this.$menuPermission(
                        "singlepro/singleorder/hotel/prderprin"
                    );
                    permission.refundDetail = this.$menuPermission(
                        "singlepro/singleorder/hotel/refunddet"
                    );
                    break;
                case "SelfSupportOrder":
                    permission.confirmOrder = this.$menuPermission(
                        "singlepro/selforder/hotel/conforder"
                    );
                    permission.dtlCollection = this.$menuPermission(
                        "singlepro/selforder/hotel/getincodet"
                    );
                    permission.addCollection = this.$menuPermission(
                        "settlement/recpay/recei/addrecei"
                    );
                    permission.setOperation = this.$menuPermission(
                        "singlepro/selforder/hotel/orderprin"
                    );
                    permission.refundDetail = this.$menuPermission(
                        "singlepro/selforder/hotel/refunddet"
                    );
                    break;
            }

            return permission;
        },
        getOrderDetailFun() {
            let type = this.orderType,
                fun = null;
            switch (type) {
                case "SaleOrder":
                    fun = getDistributionHolelMyOrderDetailAsyncRequest;
                    break;
                case "financeRefund":
                    fun = NewHotelOrderDetailAsyncRequest;
                    break;
                case "SingleOrder":
                    fun = NewHotelOrderDetailAsyncRequest;
                    break;
                case "SelfSupportOrder":
                    fun = NewHotelOrderDetailAsyncRequest;
                    break;
                case "ShopOrder":
                    fun = getHotelOrderDetail;
                    break;
                // case 'ShoporderHotelorderDetail':
                //   fun = getHotelOrderDetail;
                //   break;
                default:
                    fun = null;
            }
            return fun;
        },
        saveOrderGatheringFunc() {
            switch (this.orderType) {
                case "SelfSupportOrder":
                    return saveSaleOrderGathering;
            }
        },
        totalPrice() {
            let orderPriceDetail = this.orderDetail.order_price_detail,
                total = 0;
            orderPriceDetail.map(i => {
                total += i.rmb_total_amount;
            });
            return total;
        }
    },
    components: {
        AddShoukuanDialog,
        OnlinePay,
        ChangeOrderOperator
    },
    methods: {
        getHotelOrderDetailHandler() {
            let params = {
                data: {
                    order_id: this.$route.query.orderId
                }
            };
            console.log(this.orderType);
            if (this.orderType == "SingleOrder") {
                params["data"].type = 1;
            } else if (
                this.orderType == "SelfSupportOrder" ||
                this.orderType == "financeRefund"
            ) {
                params["data"].type = 3;
            }

            this.getOrderDetailFun({
                params: params,
                success: params => {
                    let { code, data, msg } = params["data"];
                    if (code == 0) {
                        this.orderDetail = data;
                        this.getCountDown();
                    } else {
                        this.$message.error(msg);
                    }
                },
                showLoading: true
            });
        },
        addPricingHandler() {
            this.pricingForm.push({});
        },
        handleCancelOrder() {
            this.$confirm(`确定取消该订单?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    data: {
                        order_id: this.orderDetail.order_info.order_id
                    }
                };
                cancelDistributionHolelOrderAsyncRequest({
                    params: params,
                    success: params => {
                        let { code, data, msg } = params["data"];
                        if (code == 0) {
                            this.$message.success(msg);
                            this.getHotelOrderDetailHandler();
                        } else {
                            this.$message.error(msg);
                        }
                    },
                    showLoading: true
                });
            });
        },
        handleRefundOrder() {
            this.$confirm(`确定取消订单，申请退款?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    data: {
                        order_id: this.orderDetail.order_info.order_id
                    }
                };
                refundDistributionHolelOrderAsyncRequest({
                    params: params,
                    success: params => {
                        let { code, data, msg } = params["data"];
                        if (code == 0) {
                            this.$message.success(msg);
                            this.getHotelOrderDetailHandler();
                        } else {
                            this.$message.error(msg);
                        }
                    },
                    showLoading: true
                });
            });
        },
        handleOrderHasAvail() {
            if (this.orderDetail.order_info.source == 4) {
                let params = {
                    data: {
                        order_id: this.$route.query.orderId
                    }
                };
                getDistributionHotelOrderHasAvail({
                    params,
                    success: params => {
                        let { code, data, msg } = params["data"];
                        if (code == 0) {
                            this.handleOnlinePay();
                        } else {
                            this.$message.error(msg);
                        }
                    },
                    showLoading: true
                });
            } else {
                this.handleOnlinePay();
            }
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
                this.orderDetail.order_info.order_id,
                this.orderDetail.order_info.op_id
            );
        },
        // 添加收款
        handleSaveShoukuan(data) {
            let para = {};

            para.data = { ...data };
            para.data.id = this.orderDetail.bill_id;
            para.data.order_no = this.$route.query.orderId;
            para.data.is_single = 1;
            para.data.tuan_id = "";
            para.data.user_collection_type = Number(
                para.data.user_collection_type
            );
            para.data.payment_date = data.payment_date
                ? date(data.payment_date)
                : "";
            para.data.attachment = data.attachment
                .map(item => item.id)
                .join(",");

            this.saveOrderGatheringFunc({
                params: para,
                success: res => {
                    this.$message({
                        message: res.data.msg,
                        type: res.data.code == "0" ? "success" : "error"
                    });
                    if (res.data.code == "0") {
                        this.addShoukuanVisible = false;
                        this.getHotelOrderDetailHandler();
                    }
                },
                showLoading: true
            });
        },
        handleConfirmOrder(affirm) {
            let params = {
                data: {
                    order_id: this.orderDetail.order_info.order_id,
                    status_code: affirm
                }
            };
            if (this.orderType == "SaleOrder") {
                if (affirm) {
                    params["data"].status_code = 2;
                } else {
                    params["data"].status_code = 3;
                }
                setDistributionHolelConfirmOrderAsyncRequest({
                    params,
                    success: params => {
                        let { code, data, msg } = params["data"];
                        if (code == 0) {
                            this.affirmVisible = false;
                            this.$message.success(msg);
                            this.getHotelOrderDetailHandler();
                        } else {
                            this.$message.error(msg);
                        }
                    },
                    showLoading: true
                });
            } else {
                if (affirm) {
                    params["data"].status_code = 3;
                } else {
                    params["data"].status_code = 4;
                }
                newSetDistributionHolelConfirmOrderAsyncRequest({
                    params,
                    success: params => {
                        let { code, data, msg } = params["data"];
                        if (code == 0) {
                            this.affirmVisible = false;
                            this.$message.success(msg);
                            this.getHotelOrderDetailHandler();
                        } else {
                            this.$message.error(msg);
                        }
                    },
                    showLoading: true
                });
            }
        },
        getCountDown() {
            let that = this,
                timestamp = this.orderDetail.order_info.clear_time,
                countDownTime = "",
                isIntervalFlag = 0;
            isIntervalFlag = setInterval(function() {
                var nowTime = new Date();
                var endTime = new Date(timestamp * 1000);

                var t = endTime - nowTime.getTime();
                var min = Math.floor((t / 1000 / 60) % 60);
                var sec = Math.floor((t / 1000) % 60);

                if (min <= 0 && sec <= 0) {
                    min = 0;
                    sec = 0;
                    clearInterval(isIntervalFlag);
                }
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }
                countDownTime = min + ":" + sec;
                that.$set(that, "endOrderTime", countDownTime);
            }, 1000);
        }
    },
    mounted() {
        this.getHotelOrderDetailHandler();
    }
};
</script>
<style lang="less" scoped>
.hotel-detail {
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
    .tips {
        text-align: right;
        color: #f00;
        padding-bottom: 10px;
    }
}
.table-order {
    width: 100%;
    border: 1px solid #ccc;
    border-collapse: collapse;

    thead {
        th {
            font-weight: 400;
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
.is-active {
    color: #b10c79;
}
.affirm {
    padding: 0 10px;
    display: flex;

    .el-icon-warning {
        color: #f7ba2a;
        font-size: 70px;
        margin-right: 10px;
    }
    span {
        font-size: 18px;
    }
    p {
        color: #999;
        margin-top: 10px;
    }
}
</style>

