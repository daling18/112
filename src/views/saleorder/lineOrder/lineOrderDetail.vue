<template>
    <div class="wrapper" v-loading="pageLoading">
        <!-- 产品信息 -->
        <section>
            <p class="label-title">产品信息</p>
            <div class="operation-panel">
                <div class="header">
                    <div class="tools color-purple pointer">
                        团号:<router-link :to="{ path: '/touristroute/trip/baseInfo' , query: { line_id: data.productInfo.product_id}}" target='_blank'>{{data.productInfo.tuan_no}}</router-link>
                        <!-- <span @click="openNewWin({
                            path: '/touristroute/trip/baseInfo',
                            query: {
                            line_id: data.productInfo.product_id
                            }
                        })">团号: {{
                            data.productInfo.tuan_no }}</span> -->
                        <el-tag style="margin-left:10px;vertical-align:middle" v-if="data.productInfo.is_confirm==1" type="info" size="small">二次确认</el-tag>
                        <el-tag style="margin-left:10px;vertical-align:middle" v-else type="info" size="small">无需二次确认</el-tag>
                    </div>
                    <div class="right-label">出团日期：{{ data.productInfo.departure_date }} | 回团日期：{{ data.productInfo.end_date }}</div>
                </div>
                <ul class="product-list">
                    <li class="product-item">
                        <div class="title">
                            <div tag="h3">
                                <div class="name color-purple pointer" @click="openNewWin({
                                    path: '/touristroute/trip/baseInfo',
                                    query: {
                                    line_id: data.productInfo.product_id
                                    }
                                })">{{
                                    data.productInfo.line_title }}</div>
                                <p class="sub-title">{{ data.productInfo.line_subtitle }}</p>
                            </div>
                        </div>
                        <el-row class="product-info">
                            <el-col :span="8" class="color-purple pointer">
                                产品编号：
                                <span @click="openNewWin({
                                    path: '/touristroute/trip/baseInfo',
                                    query: {
                                    line_id: data.productInfo.product_id
                                    }
                                })">{{
                                    data.productInfo.line_no }}</span>
                            </el-col>
                            <el-col :span="8">供 应 商：{{ data.productInfo.supplier_org_name }}</el-col>
                            <el-col :span="8">上架渠道：{{ data.productInfo.wholesaler_org_name }}</el-col>
                            <el-col :span="8">负 责 人：{{ data.productInfo.operator_name }}{{ data.productInfo.operator_phone?"/"+data.productInfo.operator_phone:"" }}</el-col>
                            <el-col :span="8">出 发 地：{{ data.productInfo.starting_city }}</el-col>
                            <el-col :span="8">目的地：{{ data.productInfo.end_city }}</el-col>
                            <el-col :span="8">线路类型：{{ data.productInfo.line_type_text }}</el-col>
                            <el-col :span="8">行程天数：{{ data.productInfo.line_day?data.productInfo.line_day+"天":''}} {{ data.productInfo.line_night?data.productInfo.line_night+"晚":""}}</el-col>
                            <el-col :span="8" v-if="data.productInfo.is_deposit!=0">定金金额：{{ data.productInfo.deposit }}</el-col>
                            <el-col :span="8" v-if="data.productInfo.is_deposit!=0">定金说明：{{ data.productInfo.deposit_remark }}</el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </section>
        <!-- 订单信息 -->
        <section>
            <div>
                <span class="label-title">订单信息</span>
                <el-tag v-if="delayTime&&(order_status.id==2||order_status.id==0)" style="margin-left:10px;vertical-align:middle" size="small">
                    <span>{{order_status.id==0?'支付倒计时:':'游客信息补录倒计时'}}</span>
                    {{ delayTime }}
                </el-tag>
            </div>
            <div class="operation-panel">
                <div class="header">
                    <div class="tools color-purple">
                        订单号：{{ data.orderInfo.order_no }}
                        <el-tag size="small" style="vertical-align:middle;margin-left:5px;" :type="order_status.type">{{order_status.title}}</el-tag>
                    </div>
                    <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
                    <!-- <div class="right-label" v-if="data.orderInfo.insurance_order_no">
            保险订单号：
            <el-link
              class="color-purple"
              style="vertical-align: initial;font-size:14px;"
            >{{ data.orderInfo.insurance_order_no }}</el-link>
          </div>-->
                </div>
                <ul class="product-list">
                    <li class="product-item">
                        <el-row class="product-info">
                            <el-col :span="8">订单来源：{{ data.orderInfo.order_source_text }}</el-col>
                            <el-col :span="8">下 单 人：{{ data.orderInfo.operator_name }}</el-col>
                            <el-col :span="8" :title="data.orderInfo.org_code_name">
                                下单人所属组织：
                                <span class="eisSpan">{{ data.orderInfo.org_code_name }}</span>
                            </el-col>
                            <el-col :span="8">
                                订单人数：
                                <span v-for="item in data.orderInfo.tourist_info || []" :key="item.type">
                                    <span>{{item.num}}</span><span>{{item.type}}</span>&nbsp;
                                </span>
                                <!-- <span>{{data.orderInfo.adult_num}}成人</span>
                                <span v-if="data.orderInfo.child_num>0">&nbsp;{{ data.orderInfo.child_num }}儿童&nbsp;</span>
                                <span v-if="data.orderInfo.other_type_num>0">{{data.orderInfo.other_type_num}}{{data.orderInfo.other_type_name}}</span> -->
                            </el-col>
                            <!-- <el-col :span="8">订单人数：{{ data.orderInfo.enrollment }}</el-col> -->
                            <el-col :span="8">下单时间：{{ data.orderInfo.create_time }}</el-col>
                            <el-col :span="8">代 理 商：{{ data.orderInfo.agent_org_name }}</el-col>
                            <el-col :span="8">联 系 人：{{ data.orderInfo.contacts_real_name}}{{data.orderInfo.contacts_mobile?"/"+data.orderInfo.contacts_mobile:""}}</el-col>
                            <el-col :span="8">下单账号：{{data.orderInfo.operator_account}}</el-col>
                        </el-row>
                        <ul class="product-tools">
                            <li class="tool">
                                订单备注：
                                <el-link class="color-purple" @click="remarkDialogVisible=true;remark=data.orderInfo?(data.orderInfo.remark||''):''" style="vertical-align: initial;font-size:13px;">{{ data.orderInfo.remark || "编辑" }}</el-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
        <!-- 非预占位订单显示内容 -->
        <div>
            <!-- 价格明细 -->
            <section v-if="isHide">
                <p class="label-title">价格明细</p>
                <div class="operation-panel">
                    <ul class="price-box">
                        <li>
                            <p>应收金额</p>
                            <span>¥ {{ data.priceInfo.total_amount }}</span>
                        </li>
                        <li>
                            <p>已收金额</p>
                            <span>¥ {{ data.priceInfo.total_received_amount }}</span>
                        </li>
                        <li>
                            <p>未收金额</p>
                            <span>¥ {{data.priceInfo.total_unreceived_amount}}</span>
                        </li>
                        <li>
                            <p>应结算金额</p>
                            <span>¥{{ data.priceInfo.total_peer_amount }}</span>
                        </li>
                        <!-- <li>
                            <p>实际结算金额</p>
                            <span>￥{{ data.priceInfo.total_real_peer_amount }}</span>
                        </li>
                        <li>
                            <p>已结算金额</p>
                            <span>¥{{ data.priceInfo.total_settled_amount }}</span>
                        </li>
                        <li>
                            <p>未结算金额</p>
                             <span>¥{{ data.priceInfo.total_unsettled_amount }}</span>-->
                        <!-- </li> -->
                        <li>
                            <p>销售利润</p>
                            <span>￥{{data.priceInfo.sales_profit}}</span>
                        </li>
                    </ul>
                    <div class="list">
                        <el-table :data="price_info" border style="width: 100%">
                            <el-table-column align="center" label="项目" min-width="100">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.item_name">{{ scope.row.item_name }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="数量">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.num">{{ scope.row.num? scope.row.num:"0"}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="销售单价" min-width="120">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.sale_price">{{ scope.row.sale_price }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="应收金额" min-width="120">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.total_amount">{{ scope.row.total_amount}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="结算单价" min-width="120">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.settle_price">{{ scope.row.settle_price }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="应结算金额" min-width="120">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.total_peer_amount">{{ scope.row.total_peer_amount }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="说明信息">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.remark">{{ scope.row.remark }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </section>
            <!-- 付款记录 -->
            <section v-if="isHide">
                <p class="label-title">付款记录</p>
                <div class="operation-panel">
                    <div class="list">
                        <el-table :data="data.payInfo" border style="width: 100%">
                            <el-table-column align="center" label="第三方交易流水号" min-width="150">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.payment_order_no">{{ scope.row.payment_order_no }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="系统交易流水号" min-width="150">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.payment_no">{{ scope.row.payment_no }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="收款人" min-width="120">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.operator_name">{{ scope.row.operator_name }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="收款时间" min-width="140">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.pay_time">{{ scope.row.pay_time }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="pay_type_text" label="交款方式" min-width="120"></el-table-column>
                            <el-table-column align="center" label="交款金额">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.amount">{{ scope.row.amount }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="到账金额" min-width="120">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.received_amount">{{ scope.row.received_amount }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="到账公司" min-width="150">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.payee_org_name">{{ scope.row.payee_org_name }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="认款人" min-width="120">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.subscriber_name">{{ scope.row.subscriber_name }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="认款时间" min-width="140">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.subscription_time">{{ scope.row.subscription_time }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </section>
            <!-- 结算记录 -->
            <section v-if="isHide">
                <p class="label-title">结算记录</p>
                <div class="operation-panel">
                    <div class="list">
                        <el-table :data="data.settlementInfo" border style="width: 100%">
                            <el-table-column align="center" label="结算单号" min-width="200">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.settlement_no">{{ scope.row.settlement_no }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="结算时间" min-width="150">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.handle_time">{{ scope.row.handle_time }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="结算对象" min-width="150">
                                >
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.settlement_name">{{ scope.row.settlement_name }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="结算金额" min-width="100">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.final_amount">{{ scope.row.final_amount }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="发起人" min-width="100">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.create_user">{{ scope.row.create_user }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="发起时间" min-width="140">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.create_time">{{ scope.row.create_time }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </section>
            <!-- 游客名单 -->
            <section v-if="isHide">
                <p class="label-title">游客名单</p>
                <div class="operation-panel">
                    <div class="list">
                        <el-table :data="data.touristListInfo" border style="width: 100%">
                            <el-table-column align="center" label="姓名" min-width="100">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.username">{{ scope.row.username }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="性别" min-width="100">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.gender | gender">{{ scope.row.gender | gender }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="证件类型/证件号码" min-width="210">
                                >
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="filterIdentityType(scope.row.identity_type) + '/' + scope.row.identity_no">{{ filterIdentityType(scope.row.identity_type) }}/{{ scope.row.identity_no }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="证件有效期" min-width="150">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.identity_end_date">{{ scope.row.identity_end_date }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="手机号" min-width="130">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.mobile">{{ scope.row.mobile }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="出生日期" min-width="150">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.birthday">{{ scope.row.birthday }}</div>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column align="center" label="备注">
                                <template slot-scope="scope">
                                    <div class="ellipsis" :title="scope.row.remark">{{ scope.row.remark }}</div>
                                </template>
              </el-table-column>-->
                            <el-table-column align="center" label="操作" min-width="100">
                                <template slot-scope="scope">
                                    <div class="ellipsis color-purple pointer" @click="editTourist(scope.row)">编辑</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </section>
            <!-- 合同签字人 -->
            <section v-if="isHide && data.orderInfo && data.orderInfo.order_from != 2">
                <p class="label-title" v-if="data.contractSignerInfo&&data.contractSignerInfo.length>0">合同签字人</p>
                <div class="operation-panel">
                    <div class="list">
                        <el-tag v-for="item in data.contractSignerInfo" :key="item.id" :type="item.is_signed=='0'?'warning':item.is_signed=='1'?'success':''">{{ item.username }} 【{{item.signed_text}}】</el-tag>
                    </div>
                </div>
            </section>
            <el-footer>
                <Affix :offset-bottom="8">
                    <div class="operation-btn">
                        <div class="btn-group-custom" v-for="item in data.btnInfo.btn" :key="item.type">
                            <el-dropdown type="primary" v-if="item.btn&&item.btn.length>0" trigger="click">
                                <el-button type="primary">
                                    {{item.str}}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <!-- 合同管理再是不做  type 6-->
                                    <el-dropdown-item v-show="subItem.type!=6" v-for="subItem  in item.btn" :key="subItem.type" @click.native="btnClickHandler(subItem)">{{subItem.str}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="primary" v-else @click="btnClickHandler(item)">{{item.str}}</el-button>
                        </div>
                    </div>
                </Affix>
            </el-footer>
        </div>
        <!-- 确认位置dialog -->
        <el-dialog title="确认位置" :visible.sync="affirmPlaceVisible" class="custom-dialog">
            <div class="dialog-content">
                <el-form>
                    <el-form-item label>
                        <el-radio-group v-model="affirmPlaceForm.seat_type">
                            <el-radio label="1">有位</el-radio>
                            <el-radio label="2">无位</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="位置保留至" v-if="affirmPlaceForm.seat_type == 1" :rules="[{ required: true }]">
                        <el-date-picker v-model="affirmPlaceForm.seattime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCallback('affirmPlaceVisible', false)">取 消</el-button>
                <el-button type="primary" @click="dialogCallback('affirmPlaceVisible', true)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 订单调价dialog -->
        <el-dialog title="订单调价" :visible.sync="priceAdjustmentVisible" class="custom-dialog">
            <div class="dialog-content">
                <div class="scroll-content">
                    <el-form :model="priceAdjustmentForm" ref="priceAdjustmentForm">
                        <div v-for="(item, $index) in priceAdjustmentForm.price_list" :key="$index" class="price_adjustment_content">
                            <div>
                                <el-form-item class="price_adjustment_content_btn" label="项目名称" :label-width="formLabelWidth" :prop="`price_list.${$index}.item_name`" :rules="[{ required: true ,message:'请输入项目名称', trigger:'blur'}]">
                                    <el-input v-model="item.item_name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="价格" class="paice-box" :label-width="formLabelWidth" :prop="`price_list.${$index}.modify_out_price`" :rules="[{ required: true , type:'number',  min:1,  message:'请输入大等于1的数值',  trigger:'blur'}]">
                                    <el-row>
                                        <el-col :span="5">
                                            <el-select v-model="item.type" placeholder="请选择">
                                                <el-option label="+" value="+"></el-option>
                                                <el-option label="-" value="-"></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="1">&nbsp;</el-col>
                                        <el-col :span="18">
                                            <el-input-number placeholder="调整金额" autocomplete="off" v-model="item.modify_out_price" :min="0" :controls="false"></el-input-number>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="备注" :label-width="formLabelWidth" :prop="`price_list.${$index}.remark`">
                                    <el-input v-model="item.remark" type="textarea" rows="2" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div style="text-align:right">
                                <i class="el-icon-remove" v-if="priceAdjustmentForm.price_list.length > 1" @click="priceListEdit('remove', $index)"></i>
                                <i class="el-icon-circle-plus" v-if="$index == priceAdjustmentForm.price_list.length - 1" @click="priceListEdit('add')"></i>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCallback('priceAdjustmentVisible', false)">取 消</el-button>
                <el-button type="primary" :loading="dialogBtnLoading" @click="dialogCallback('priceAdjustmentVisible', true)">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 操作记录dialog -->
        <el-dialog title="操作记录" :visible.sync="recordDialogVisible" class="custom-dialog">
            <div class="dialog-content" v-loading="recordDialogLoading">
                <el-table :data="recordList" height="460" border style="width: 100%">
                    <!-- <el-table-column label="解释说明">
                        <template slot-scope="scope">
                            <div class="ellipsis" :title="scope.row.op_type">{{ scope.row.op_type }}</div>
                        </template>
          </el-table-column>-->
                    <el-table-column label="操作内容">
                        <template slot-scope="scope">
                            <div :title="scope.row.recordText">{{ scope.row.recordText || '--' }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人" width="160">
                        <template slot-scope="scope">
                            <div :title="scope.row.role">{{ scope.row.role || '--' }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作时间" width="140">
                        <template slot-scope="scope">
                            <div :title="scope.row.date">{{ scope.row.date || '--' }}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="recordDialogVisible=false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 订单备注price_adjustment_contentdialog -->
        <el-dialog title="订单备注" :visible.sync="remarkDialogVisible" class="custom-dialog">
            <div class="dialog-content">
                <div class="scroll-content">
                    <el-form ref="remarkForm" :model="refundObj">
                        <el-form-item>
                            <el-input placeholder="请输入内容" v-model.trim="remark" autocomplete="off" type="textarea" maxlength="200" :rows="4"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="remarkDialogVisible=false">取 消</el-button>
                <el-button type="primary" v-loading="dialogBtnLoading" @click="formSubmit('remarkForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑游客信息弹窗-->
        <LineTouristForm ref="editTouristForm" :visible="tourEditDialogVisible" @update:visible="val => tourEditDialogVisible = val" @saveHandler="saveTourist" :tourEditLoading="tourEditLoading" :identityTypeList="identityTypeList" />
        <!-- 申请退款 -->
        <el-dialog :title="refundObj.title" :visible.sync="refundVisible" class="custom-dialog">
            <el-form v-loading="refundLoading" ref="refundForm" :model="refundObj" :rules="refundObjRules">
                <el-form-item label="退款类型" :label-width="formLabelWidth">
                    <el-radio v-model="refundObj.type" label="2">退款</el-radio>
                    <el-radio v-model="refundObj.type" label="1">退团</el-radio>
                </el-form-item>
                <el-form-item class="refundProfit" prop="refund_profit" v-if="orgType==5">
                    <el-form-item label-width="100px" label="利润金额:" style="margin-right:20px;">{{refundObj.refund_profit_gold}}</el-form-item>
                    <el-form-item label-width="100px" label="退款金额:">
                        <el-input v-model.trim="refundObj.refund_profit" placeholder="请输入金额" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- label="退款金额" :label-width="formLabelWidth" -->
                </el-form-item>
                <el-form-item label="游客旅游明细" :label-width="formLabelWidth" v-if="refundObj.type==1">
                    <el-table :data="touristList" border style="width: 100%" current-row-key="id" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="姓名">
                            <template slot-scope="scope">
                                <div class="ellipsis" :title="scope.row.username">{{ scope.row.username }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="证件号">
                            <template slot-scope="scope">
                                <div class="ellipsis" :title="scope.row.identity_no">{{ scope.row.identity_no }}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item :label="refundObj.type==1?'退团说明':'退款说明'" :label-width="formLabelWidth" prop="remark">
                    <el-input :placeholder="refundObj.type==1?'请输入退团说明':'请输入退款说明'" v-model.trim="refundObj.remark" type="textarea" row="2" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="refundVisible=false">取 消</el-button>
                <el-button type="primary" :disabled="refundLoading" v-loading="dialogBtnLoading" @click="formSubmit('refundForm')">{{refundObj.type==1?'申请退团':'申请退款'}}</el-button>
            </div>
        </el-dialog>
        <!-- 收款 线下 -->
        <AddShoukuanDialog :visible.sync="addShoukuanVisible" @submit="handleSaveShoukuan" @close="addShoukuanVisible=false" :payee_org_id="data.orderInfo.payee_org_id" :dialogBtnLoading="dialogBtnLoading" :id="order_id" />
        <!-- 编辑合同 -->
        <el-dialog title="修改合同单价" :visible.sync="editHeTongPriceDialogVisible" size="tiny" center>
            <el-form v-loading="editHeTongPriceDialogLoading" label-width="70px" :model="contracPrices" ref="contracForm" class="contracForm">
                <div class="itemForm">
                    <div class="label required">单价设置</div>
                </div>
                <div class="itemForm">
                    <span style="margin-left: 30px;">成人单价</span>
                    <el-input class="width1" v-model="contracPrices.adult_price" @keyup.native="editMsgType('adult')"></el-input>
                    <span>儿童单价</span>
                    <el-input class="width1" v-model="contracPrices.child_price" @keyup.native="editMsgType('child')"></el-input>
                    <span>导游服务费</span>
                    <el-input class="width1" v-model="contracPrices.guide_service_cost"></el-input>
                </div>
                <div class="itemForm" style="margin-left: 40px;">（修改销售总价后，电子合同单价*人数应等于总价，单价可以设置为平均单价）</div>
                <div class="itemForm">
                    <div class="label required">成团人数与不成团的约定</div>
                </div>
                <div class="itemForm" style="margin-left: 40px;">本团最低 {{contracPrices.min_people}} 人成团，如不能成团，旅游者按以下哪种方式解决：</div>
                <el-form-item required>
                    <el-radio-group v-model="contracPrices.tuan_constraint">
                        <el-radio :label="1" style="display: block; margin: 10px 0">
                            出境社委托
                            <el-input style="width: 100px;" v-model="contracPrices.transfer_to_company_name" :disabled="contracPrices.tuan_constraint != 1"></el-input>出境社履行合同
                        </el-radio>
                        <el-radio :label="2" style="display: block; margin: 10px 0">延期出团</el-radio>
                        <el-radio :label="3" style="display: block; margin: 10px 0">改签其他线路出团</el-radio>
                        <el-radio :label="4" style="display: block; margin: 10px 0">解除合同</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="itemForm">
                    <div class="label required">人身意外伤害保险</div>
                </div>
                <div class="itemForm" style="margin-left: 40px;">出境社提示旅游者购买人身意外伤害保险，旅游者可以做以下选择：</div>
                <el-form-item required>
                    <el-radio-group v-model="contracPrices.accident_injury" style="width:100%;overflow:hidden;">
                        <el-radio :label="1" style="display: block; margin: 10px 0; white-space: normal;">委托旅行社购买（旅行社不具有保险兼业资格的，不得勾选此项）；保险产品名称（投保的相关信息以实际保单为准）</el-radio>
                        <el-radio :label="2" style="display: block; margin: 10px 0">自行购买</el-radio>
                        <el-radio :label="3" style="display: block; margin: 10px 0">放弃购买</el-radio>
                        <el-radio :label="4" style="display: block; margin: 10px 0">同意旅行社赠送人身意外保险</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="itemForm">
                    <div class="label">其他约定事项</div>
                </div>
                <div class="itemForm" style="margin-left: 40px;">未尽事宜，经旅游者和出境社双方协商一致，可以列入补充条款：</div>
                <el-form-item>
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="contracPrices.agreed_matters"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" :loading="dialogBtnLoading" :disabled="editHeTongPriceDialogLoading" @click="formSubmit('contracForm')">保 存</el-button>
                <el-button @click="editHeTongPriceDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 支付 -->
        <!-- <online-pay ref="onlinePay" :order-id="order_id" order-resource="2" /> -->
    </div>
</template>

<script>
import {
    lineOrderSaleOrderDetail, //获取详情
    lineOrderSaleOrdercancelOrder, //取消订单
    lineOrderSaleOrdergetOrderOp, //获取操作记录
    lineOrderSaleOrderRemark, //编辑订单
    lineOrderSaleOrderTouristEdit, //编辑游客
    lineOrderSaleOrderRefundOrder, //申请退款
    lineOrderSaleOrderGetRefund, //获取退款人数 利润金额
    lineOrderSaleOrderAgainOrder, //重新下单
    lineOrderSaleOrderPay, //订单付款
    lineOrderSaleOrderOffPay, //线下付款
    lineOrderSaleOrderPaymentAccount, //获取付款账户
    lineOrderSaleOrderPriceAdjustment, //订单调价
    lineOrderSaleOrderModifyContract, //编辑合同
    lineOrderSaleOrderDownloadContract, //下载电子合同
    lineOrderSaleOrderPreviewContract, //预览合同
    lineQuoteOrdeConfimOrder,
    lineOrderSaleOrderReDownloadContract,//重新下载合同
    //   lineOrderSaleOrderList,
    //   lineOrderUploadNotifications
} from "@/api/touristroute";
import OnlinePay from "@/components/components/OnlinePay.vue";
import AddShoukuanDialog from "./components/AddShoukuanDialog.vue"; //线下收款
import LineTouristForm from "src/components/components/newLineTouristForm.vue"; //编辑游客
import Affix from "src/components/template/common/affix";
import { dataMap, identityTypeMap, statusMap } from "@/configuration/orderMap";
import { download } from "@/utils/common";
import * as format from "src/utils/format";
import Moment from "moment";
window.Moment = Moment;

export default {
    components: { LineTouristForm, AddShoukuanDialog, Affix },
    //  OnlinePay
    data() {
        return {
            orgType: localStorage.getItem("orgtype"),
            data: {
                productInfo: {},
                orderInfo: {},
                priceInfo: {
                    // total_amount: "0.000",
                    // total_received_amount: "0.000",
                    // total_unreceived_amount: "0",
                    // total_peer_amount: "0.000",
                    // total_real_peer_amount: "0.000",
                    // total_settled_amount: "0.000",
                    // total_unsettled_amount: "0",
                    // sales_profit: "0",
                    // price_info: []
                },
                touristListInfo: [],
                contractSignerInfo: [],
                settlementInfo: [],
                btnInfo: {
                    btn: []
                }
            },
            btn_gather: [],
            affirmPlaceVisible: false,
            priceAdjustmentVisible: false,
            notificationsVisible: false,

            formLabelWidth: "100px",
            affirmPlaceForm: {
                order_id: this.$route.query.order_id,
                seattime: "",
                seat_type: "1"
            },
            //订单调价
            priceAdjustmentForm: {
                // order_id: this.$route.query.order_id,
                order_no: this.order_no,
                price_list: [
                    {
                        item_name: "",
                        type: "+",
                        modify_out_price: "1",
                        remark: ""
                    }
                ]
            },
            notificationsForm: {
                order_id: this.$route.query.order_id,
                order_no: this.order_no,
                file_info: []
            },
            //操作记录
            recordList: [],
            //订单备注
            remark: "",
            //申请退款
            refundObj: {
                refund_profit_gold: "", //利润金额
                title: "申请退款/退团",
                remark: "", //备注
                type: "2", // 2退款 1退团
                tourist_ids: [], //游客id
                refund_profit: "" //金额
            },
            touristList: [],
            refundObjRules: {
                remark: [
                    { required: true, message: "说明不能为空", trigger: "blur" }
                ],
                refund_profit: [
                    {
                        // message: "请输入金额（元）",
                        trigger: "blur",
                        type: "number",
                        validator: (rule, value, callback) => {
                            let refund_profit_gold = this.refundObj
                                .refund_profit_gold;
                            if (value.replace(/ /g, "") == "")
                                return callback(new Error("金额不能为空"));
                            if (value < 0)
                                return callback(
                                    new Error("请输入大于等于0的数值")
                                );
                            if (value > refund_profit_gold)
                                return callback(
                                    new Error(
                                        "请输入大于等于0小于等于利润金额的数值"
                                    )
                                );
                            callback();
                        }
                    }
                ]
            },
            //编辑合同
            editHeTongPriceDialogVisible: false,
            editHeTongPriceDialogLoading: false,
            contracPrices: {
                // adult: { price: "", disabled: false },
                // child: { price: "", disabled: false },
                tuan_constraint: 1,
                accident_injury: 3,
                agreed_matters: "",
                min_people: "",
                transfer_to_company_name: "",
                adult_price: "", //成人
                child_price: "", //儿童
                guide_service_cost: "" //导游
            },
            //游客
            identityTypeList: identityTypeMap,
            tourEditObj: {
                birthday: "1990-08-08",
                gender: "1",
                gender_text: "男",
                id: "1199",
                identity_end_date: "2019-03-30",
                identity_no: "130703199008081819",
                identity_type: "1",
                identity_type_text: "身份证",
                mobile: "15143333333",
                remark: "",
                tourist_type: "1",
                tourist_type_text: "成人",
                username: "李天牛"
            },
            remarkDialogVisible: false,
            recordDialogVisible: false,
            tourEditDialogVisible: false,
            addShoukuanVisible: false,
            tourEditLoading: false,
            touristObj: false,
            refundVisible: false,
            refundLoading: false,

            tourEditBtnDis: false,
            recordDialogLoading: false,

            loading: false,
            pageLoading: false,
            dialogBtnLoading: false,
            aDownload: null,
            delayTime: "", //倒计时
            timer: null
        };
    },
    computed: {
        blankUrl() {
            return this.$router.fullPath;
        },
        order_no() {
            let order_no = this.$route.query
                ? this.$route.query.order_no
                : this.orderInfo.order_no;
            return order_no;
        },
        order_id() {
            let order_id = this.$route.query
                ? this.$route.query.order_id
                : this.orderInfo.id;
            return order_id;
        },
        order_status() {
            let status = this.data.orderInfo
                ? this.data.orderInfo.order_status
                : "-6";
            return (
                statusMap[status] || {
                    title: "未知",
                    type: "info"
                }
            );
        },
        isHide() {
            return !(
                this.data.orderInfo.is_seat == 1 &&
                this.data.orderInfo &&
                this.data.orderInfo.order_status == 1
            );
        },
        price_info() {
            if (
                !this.data ||
                !this.data.priceInfo ||
                !this.data.priceInfo.price_info
            )
                return [];
            return this.data.priceInfo.price_info.map(v => {
                let price_source = v.price_source;
                switch (price_source) {
                    case "1": //普通调价
                        return {
                            ...v,
                            total_amount: v.sale_price * v.num, //应收金额
                            total_peer_amount: v.settle_price * v.num //结算
                        };
                        break;
                    case "2": //订单调价
                        let type = v.type;
                        if (type == "结算") {
                            return {
                                item_name: v.item_name, //项目名称
                                num: "--", //数量
                                sale_price: "--", //销售单价
                                settle_price: "--", //结算单价
                                remark: v.remark, //备注
                                total_amount: "--", //应收金额
                                total_peer_amount: v.price //结算
                            };
                        } else {
                            return {
                                item_name: v.item_name, //项目名称
                                num: "--", //数量
                                sale_price: "--", //销售单价
                                settle_price: "--", //结算单价
                                remark: v.remark, //备注
                                total_amount: v.price, //应收金额
                                total_peer_amount: "--" //结算
                            };
                        }
                        break;
                    case "3": //单房差
                        return {
                            item_name: v.item_name, //项目名称
                            num: v.num, //数量
                            sale_price: v.diff_room_price, //销售单价
                            settle_price: v.diff_room_price, //结算单价
                            remark: v.remark, //备注
                            total_amount: v.diff_room_price * v.num, //应收金额
                            total_peer_amount: v.diff_room_price * v.num //结算
                        };
                        break;

                    default:
                        return v;
                        break;
                }
            });
        }
    },
    watch: {
        "refundObj.type"(n) {
            this.$nextTick(() => {
                this.$refs["refundForm"].clearValidate();
            });
        },
        refundVisible() {
            this.$nextTick(() => {
                if (this.$refs["refundForm"])
                    this.$refs["refundForm"].clearValidate();
            });
        }
    },
    filters: {
        gender: function(val) {
            return val == 1 ? "男" : val == 2 ? "女" : "其他";
        }
    },
    mounted() {
        this.aDownload = document.createElement("a");
        this.aDownload.download = "出团通知书";
        this.getDetails();
    },
    methods: {
        openNewWin({ path, query }) {
            let { origin, pathname, hash } = location;
            let url = `${origin}${pathname}#${path}?line_id=${query.line_id}`;
            window.open(url, "_blank");
        },
        getSeattime(orderInfo) {
            let time = orderInfo ? orderInfo.seattime : "";
            let end = Moment(time).valueOf();
            // return Moment()
            //   .add(1, "minutes")
            //   .valueOf();
            return isNaN(end) ? Moment().valueOf() : end;
        },
        //计时器
        seattimeTimer() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                let time =
                    Moment(this.getSeattime(this.data.orderInfo)) -
                    Moment().valueOf();
                if (time <= 0) {
                    this.delayTime = "";
                    clearInterval(this.timer);
                    return;
                }
                let day = parseInt(time / 1000 / 60 / 60 / 24);
                let hours = parseInt((time / 1000 / 60 / 60) % 24);
                let minu =
                    hours > 0
                        ? parseInt((time / 1000 / 60) % 60)
                        : Math.ceil((time / 1000 / 60) % 60);
                this.delayTime =
                    (day ? day + "天" : "") +
                    (hours ? hours + "小时" : "") +
                    (minu ? minu + "分钟" : "");
            }, 1000);
        },
        //获取订单详情
        async getDetails() {
            let params = {
                order_no: this.order_no
            };
            this.pageLoading = true;
            let result = await lineOrderSaleOrderDetail(params);
            this.pageLoading = false;
            const { code, data, msg } = result;
            //   const { detailInfo } = dataMap;
            if (code == 0) {
                let detailInfo = data.detailInfo;
                for (const key in detailInfo) {
                    const obj = detailInfo[key];
                    this.data[key] = obj;
                }
                if (
                    detailInfo.orderInfo.order_status == 0 ||
                    detailInfo.orderInfo.order_status == 2
                ) {
                    setTimeout(() => {
                        this.seattimeTimer();
                    });
                }
                // this.data.btnInfo = dataMap.detailInfo.btnInfo;
            } else {
                this.$router.push("/saleorder/v2/lineOrder/list");
                this.$message.error(msg);
            }
        },
        //获取操作记录
        async getOrderOp() {
            let params = {
                order_no: this.order_no
            };
            this.recordDialogLoading = true;
            let result = await lineOrderSaleOrdergetOrderOp(params);
            this.recordDialogLoading = false;
            let { code, data, msg } = result;
            if (code != 0) this.$message.error(msg);
            this.recordList = result.data;
        },
        //线下收款
        async handleSaveShoukuan(data, account) {
            // console.log({ data, account });
            let params = {
                order_no: this.order_no,
                amount: data.total_amount,
                payee_bank_name: data.payment_name,
                payee_account: account.account_no,
                attachment: data.attachment.map(item => item.url).join(","),
                remark: data.remark
            };
            this.pageLoading = true;
            this.dialogBtnLoading = true;
            let result = await lineOrderSaleOrderOffPay(params);
            this.pageLoading = false;
            this.dialogBtnLoading = false;
            let { code, msg } = result;
            if (code != 0) return this.$message.error(msg);
            this.addShoukuanVisible = false;

            this.$message.success(msg);
            this.getDetails();
        },
        //按钮map参照orderMap.js 中注释
        //动态按钮点击
        async btnClickHandler(item) {
            let type = Number(item.type);
            // item.notification_url="//www.baidu.com/s?wd=%E4%BB%8A%E6%97%A5%E6%96%B0%E9%B2%9C%E4%BA%8B&tn=SE_PclogoS_8whnvm25&sa=ire_dl_gh_logo&rsv_dl=igh_logo_pcs"
            if (!this.order_no) {
                this.$message.warning("当前订单不存在");
                return this.$router.push("/saleorder/v2/lineOrder/list");
            }
            let params = {
                order_no: this.order_no
            };
            let operation = {
                isReload: false,
                isRespone: false
            };

            let result = null;
            switch (type) {
                case 1: //补录游客信息
                    this.$router.push({
                        path: "/salecenter/line/Tourist-Info",
                        query: {
                            orderId: this.order_id
                        }
                    });
                    break;
                //电子合同
                case 2:
                    break;
                case 3: //合同预览
                    let routeData = this.$router.resolve({
                        path: "/saleorder/contract-preview",
                        query: {
                            id: this.order_id,
                            requesttype: 2
                        }
                    });
                    window.open(routeData.href, "_blank");
                    //   this.$router.push({
                    //     target: "_blank",
                    //     path: "/saleorder/contract-preview",
                    //     query: {
                    //       id: this.order_no
                    //       //   type: orderDetailData.tuan_info.tour_type
                    //     }
                    //   });
                    // <router-link v-if="scope.row.item == '合同／确认件' && orderInfo.confirm_status == 1 && contractPreview" target="_blank" :to="{path:'/saleorder/contract-preview',query:{id:orderInfo.order_no,type:orderDetailData.tuan_info.tour_type}}">预览合同</router-link>

                    break;
                case 4: //下载电子合同
                    result = await lineOrderSaleOrderDownloadContract(params);
                    if (result.code == 0) {
                        let downloadRes = await download(
                            result.data.down_url,
                            "电子合同",
                            true,
                            "pdf"
                        );
                        if (!result) {
                            return this.$message("下载失败");
                        }
                        // this.aDownload.download = "电子合同";
                        // this.aDownload.href = result.data.down_url;
                        // this.aDownload.click();
                    } else {
                        operation.isRespone = true;
                    }
                    break;
                case 5: //编辑合同
                    params.order_id = this.order_id;
                    params.type = 1;
                    this.editHeTongPriceDialogVisible = true;
                    this.editHeTongPriceDialogLoading = true;
                    result = await lineOrderSaleOrderModifyContract(params);
                    this.editHeTongPriceDialogLoading = false;
                    if (result.code != 0)
                        return this.$message.error(result.msg);

                    Object.assign(this.contracPrices, result.data || {});
                    break;
                case 6: //合同管理
                    break;

                case 7: //申请退款/退团
                    this.refundVisible = true;
                    Object.assign(this.refundObj, {
                        remark: "", //备注
                        type: "2", // 2退款 1退团
                        tourist_ids: [], //游客id
                        refund_profit: "" //金额
                    });
                    params.is_yl_list = 1;
                    params.order_id = this.order_id;
                    this.refundLoading = true;
                    result = await lineOrderSaleOrderGetRefund(params);
                    this.refundLoading = false;
                    if (result.code != 0) {
                        this.refundVisible = false;
                        return this.$message.error(result.msg);
                    }
                    this.refundObj.refund_profit = this.refundObj.refund_profit_gold =
                        result.data.refund_profit_gold;
                    this.touristList = result.data.ylList;
                    break;
                case 8: //订单调价
                    this.priceAdjustmentVisible = true;
                    this.$nextTick(() => {
                        if (this.$refs.priceAdjustmentForm)
                            this.$refs.priceAdjustmentForm.clearValidate();
                    });
                    break;
                case 9: //取消订单
                    this.pageLoading = true;
                    result = await lineOrderSaleOrdercancelOrder(params);
                    this.pageLoading = false;
                    operation.isReload = true;
                    operation.isRespone = true;
                    break;
                //付款
                case 10:
                    break;
                case 12: //线上付款(无定金)
                case 13: //线上支付定金(有定金)
                case 14: //线上支付全款(有定金
                case 15: //线上支付尾款(有定金)
                    let getamount = (type, data) => {
                        let amount = 0;
                        switch (type) {
                            case 12:
                                amount = data.priceInfo.total_amount;
                                break;
                            case 13:
                                amount = data.productInfo.deposit;
                                break;
                            case 14:
                                amount = data.priceInfo.total_amount;
                                break;
                            case 15:
                                amount = data.priceInfo.total_unreceived_amount;
                                break;
                        }
                        return amount;
                    };
                    Object.assign(params, {
                        orderId:
                            this.$route.query.order_no ||
                            this.orderInfo.order_no,
                        amount: getamount(type, this.data),
                        platform: "1",
                        returnUrl: location.href,
                        customParams: type //12 线上付款无定金 13 线上支付定金 14 线上支付全款 15 线上支付尾款
                    });
                    this.pageLoading = true;
                    result = await lineOrderSaleOrderPay(params);
                    if (result.code == 0) {
                        let div = document.createElement("div");
                        div.innerHTML = result.data.form;
                        div.hidden = true;
                        document.body.appendChild(div);
                        div.getElementsByTagName("form")[0].submit();
                        this.pageLoading = false;
                        return;
                    }
                    this.pageLoading = false;
                    operation.isReload = true;
                    operation.isRespone = true;
                    break;
                case 16: //线下付款
                    this.addShoukuanVisible = true;
                    break;
                case 17: //重新下单
                    this.pageLoading = true;
                    operation.isRespone = true;
                    params.order_id = this.order_id;
                    result = await lineOrderSaleOrderAgainOrder(params);
                    this.pageLoading = false;
                    if (result.code == 0) {
                        operation.isReload = true;
                        this.$router.push({
                            query: {
                                order_no: result.data.order_no,
                                order_id: result.data.order_id
                            }
                        });
                    }
                    break;
                case 18: //下载出团通知书
                    if (item.notification_url) {
                        let type = item.notification_url.split(".").pop();
                        let downloadRes = await download(
                            item.notification_url,
                            "出团通知书",
                            true,
                            type
                        );
                        if (!downloadRes)
                            return this.$message.warning("下载失败");
                    } else {
                        this.$message.warning("暂无出团通知书");
                    }
                    break;
                case 19: //操作记录
                    this.recordDialogVisible = true;
                    this.getOrderOp();
                    break;
                //确认件
                case 22:
                    break;
                case 23: //查看
                    if (item.confirmation_url) {
                        this.aDownload.href = item.confirmation_url;
                        window.open(item.confirmation_url, "_blank");
                    } else {
                        this.$message.warning("暂无确认件");
                    }
                    break;
                case 24: //下载
                    if (item.confirmation_url) {
                        let type = item.confirmation_url.split(".").pop();
                        let downloadRes = await download(
                            item.confirmation_url,
                            "确认件",
                            true,
                            type
                        );
                        if (!downloadRes)
                            return this.$message.warning("下载失败");
                    } else {
                        this.$message.warning("暂无确认件");
                    }
                    break;
                case 25: //重新下载合同
                  result = await lineOrderSaleOrderReDownloadContract(params)
                  operation.isRespone = true
                  operation.isReload = true
                  break;
            }
            if (operation.isRespone) {
                if (result.code == 0) {
                    this.$message.success(result.msg);
                    if (operation.isReload) this.getDetails();
                } else {
                    this.$message.error(result.msg);
                }
            }
        },
        //表单提交
        async formSubmit(formType) {
            let params = null;
            let result = null;
            let isvaild = await this.$refs[formType]
                .validate()
                .catch(err => false);
            if (!isvaild) return;
            switch (formType) {
                case "refundForm": //申请退款
                    let {
                        remark,
                        type,
                        refund_profit,
                        tourist_ids
                    } = this.refundObj;
                    if (type == 1 && tourist_ids.length < 1) {
                        return this.$message.warning("请选择退团的游客");
                    }
                    params = {
                        order_no: this.order_no,
                        remark,
                        type,
                        tourist_ids:
                            type == 1
                                ? tourist_ids.map(v => v.id).join(",")
                                : undefined,
                        refund_profit:
                            this.orgType == 5 ? refund_profit : undefined
                    };
                    this.dialogBtnLoading = true;
                    result = await lineOrderSaleOrderRefundOrder(params);
                    this.refundVisible = this.dialogBtnLoading = false;
                    if (result.code == 0) {
                        this.$emit("init");
                    }
                    break;
                case "remarkForm": //订单备注
                    params = {
                        remark: this.remark,
                        order_no: this.order_no
                    };
                    this.dialogBtnLoading = true;
                    result = await lineOrderSaleOrderRemark(params);
                    this.remarkDialogVisible = this.dialogBtnLoading = false;
                    break;
                case "contracForm": //编辑合同
                    if (
                        this.contracPrices.adult_price <= 0 &&
                        this.contracPrices.child_price <= 0
                    )
                        return this.$message.warning(
                            "成人单价和儿童单价不能同时为空或0"
                        );
                    params = {
                        order_id: this.order_id, //订单ID
                        adult_price: this.contracPrices.adult_price * 1, //成人价格
                        child_price: this.contracPrices.child_price * 1, //	儿童 价格
                        tuan_constraint: this.contracPrices.tuan_constraint, //	int	成团人数与不成团的约定 1: 委托其他社，2: 延期出团，3: 改签其他路线，4: 解除合同
                        accident_injury: this.contracPrices.accident_injury, //int	人身意外伤害保险1：委托旅行社购买，2：自行购买，3：放弃购买
                        agreed_matters: this.contracPrices.agreed_matters, //	string	约定事项
                        transfer_to_company_name: this.contracPrices
                            .transfer_to_company_name, //	是	string	委托社名称
                        guide_service_cost: this.contracPrices
                            .guide_service_cost // 导游服务费
                    };
                    this.dialogBtnLoading = true;
                    result = await lineOrderSaleOrderModifyContract(params);
                    this.editHeTongPriceDialogVisible = this.dialogBtnLoading = false;
                    break;
                case "":
                    break;
            }
            let { code, msg } = result;
            this.$message[code == "0" ? "success" : "error"](msg);
            if (code == 0) this.getDetails();
        },
        // 游客信息查询操作
        editTourist(item) {
            this.tourEditDialogVisible = true;
            this.$refs.editTouristForm.initData(item);
        },
        async saveTourist(params) {
            let order_status = this.data.orderInfo.order_status;
            let confirm = "confirm";
            if (order_status == 3 || order_status == 4) {
                confirm = await this.$confirm(
                    this.data.orderInfo.order_from == 2
                        ? "保存后将作废原确认件重新生成确认件，确认保存?"
                        : "保存后将作废原电子合同重新生成电子合同，确认保存?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).catch(err => {
                    return "cancel";
                });
            }
            if (confirm == "confirm") {
                params.identity_end_date = params.identity_end_date
                    ? format.date(params.identity_end_date)
                    : "";
                params.birthday = params.birthday
                    ? format.date(params.birthday)
                    : "";
                this.tourEditLoading = true;
                let result = await lineOrderSaleOrderTouristEdit({
                    order_no:
                        this.$route.query.order_no ||
                        this.data.orderInfo.order_no,
                    tourist_list: { ...params }
                });
                this.tourEditLoading = this.tourEditDialogVisible = false;
                this.$message({
                    message: result.msg,
                    type: result.code == "0" ? "success" : "error"
                });
                this.getDetails();
            }
        },
        handleSelectionChange(arr) {
            this.refundObj.tourist_ids = arr;
        },
        // 证件类型
        filterIdentityType(type) {
            return identityTypeMap[type]
                ? identityTypeMap[type]["title"]
                : "未定义类型";
        },
        // 操作按钮集合
        // operation(type) {
        //   switch (type) {
        //     case "确认位置":
        //       this.affirmPlaceVisible = true;
        //       break;
        //     case "订单调价":
        //       this.priceAdjustmentVisible = true;
        //       break;
        //     case "出团通知书":
        //       this.notificationsVisible = true;
        //       break;
        //   }
        // },
        // 数据清除
        formClear(form) {
            switch (form) {
                case "affirmPlaceForm":
                    this.affirmPlaceForm = {
                        id: this.order_id,
                        seattime: "",
                        seat_type: "1"
                    };
                    return;
                case "priceAdjustmentForm":
                    this.priceAdjustmentForm.price_list = [
                        {
                            item_name: "",
                            type: "+",
                            modify_out_price: "1",
                            remark: ""
                        }
                    ];
                    //   this.$set(this.priceAdjustmentForm, "price_list", [
                    //     {
                    //       item_name: "",
                    //       type: "+",
                    //       modify_out_price: "1",
                    //       remark: ""
                    //     }
                    //   ]);
                    return;
                case "notificationsVisible":
                    this.$set(this.notificationsForm, "file_info", []);
                    return;
            }
        },
        // 弹窗按钮callback
        dialogCallback(dialogName, bool) {
            if (!bool) this[dialogName] = false;
            switch (dialogName) {
                case "affirmPlaceVisible":
                    if (bool) {
                        // 确认位置
                        this.affirmPlace();
                    } else {
                        this.formClear("affirmPlaceForm");
                    }
                    break;
                //订单调价
                case "priceAdjustmentVisible":
                    if (bool) {
                        this.$refs.priceAdjustmentForm.validate(vaild => {
                            if (!vaild) return;
                            this.priceAdjustment();
                        });
                    } else {
                        this.formClear("priceAdjustmentForm");
                    }
                    break;
                case "notificationsVisible":
                    if (bool) {
                        this.notifications();
                    } else {
                        this.formClear("notificationsVisible");
                    }
                    break;
                default:
                    return;
            }
        },
        // 确认位置axios
        affirmPlace() {
            if (
                !this.affirmPlaceForm.seattime &&
                this.affirmPlaceForm.seat_type == 1
            ) {
                this.$message.error("请选择保留日期！");
                return;
            } else {
                lineQuoteOrdeConfimOrder(this.affirmPlaceForm).then(res => {
                    const { code, msg } = res;
                    if (code == 0) {
                        this.affirmPlaceVisible = false;
                        this.formClear("affirmPlaceForm");
                        this.$message.success("确认订单成功！");
                    } else {
                        this.$message.error(msg);
                    }
                });
            }
        },
        // 订单调价数组操作
        priceListEdit(type, $index) {
            if (type == "add") {
                this.priceAdjustmentForm.price_list.push({
                    item_name: "",
                    type: "+",
                    modify_out_price: "1",
                    remark: ""
                });
            } else if (type == "remove") {
                this.priceAdjustmentForm.price_list.splice($index, 1);
            }
        },
        // 订单调价axios
        priceAdjustment() {
            this.dialogBtnLoading = true;
            let params = {
                order_no: this.order_no,
                price_list: this.priceAdjustmentForm.price_list
            };
            lineOrderSaleOrderPriceAdjustment(params).then(res => {
                this.dialogBtnLoading = false;
                const { code, msg } = res;
                if (code == 0) {
                    this.$message.success("操作成功！");
                    this.formClear("priceAdjustmentForm");
                    this.priceAdjustmentVisible = false;
                    this.getDetails();
                } else {
                    this.$message.error(msg);
                }
            });
        },

        editMsgType(type) {
            let intNum = new RegExp("^[1-9][0-9]*$"),
                adultPrice = this.contracPrices.adult_price,
                childPrice = this.contracPrices.child_price;

            if (type == "adult") {
                this.contracPrices.adult_price = adultPrice.replace(
                    /[^\d]/g,
                    ""
                );
            } else {
                this.contracPrices.child_price = childPrice.replace(
                    /[^\d]/g,
                    ""
                );
            }
        }
    },
    destroyed() {
        clearInterval(this.timer);
    }
};
</script>
<style scoped>
>>> .refundProfit .el-form-item__content {
    display: flex;
}
>>> .refundProfit .el-form-item__content {
    display: flex;
}
>>> .refundProfit .el-form-item__error {
    left: 248px;
    top: 34px;
}
/* >>> .el-form-item--small {
    margin: 0px;
} */
>>> .custom-dialog .el-dialog {
    max-width: 580px;
}
/* >>> .contracForm .el-dialog {
    min-width: 670px;
} */
</style>
<style scoped lang="scss">
@import "src/assets/css/variables.scss";
section {
    padding-top: 10px;
}
.pointer {
    cursor: pointer;
}
.eisSpan {
    display: inline-block;
    width: calc(100% - 110px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;
}
.list {
    padding: 20px 0;
    .ellipsis {
        text-align: center;
    }
}

.operation-panel {
    padding: 0 20px;
    background: #fff;
    border: 1px solid rgba(224, 224, 224, 1);
    margin: 10px 0;
}

.header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $borderColor;
    .tools {
        font-size: 16px;
        font-weight: 600;
    }
    .right-label {
        font-size: 14px;
        color: $textColor;
        font-weight: 400;
    }
}

.product {
    &-list {
        margin-right: -20px;
    }

    &-item {
        padding: 20px 0;
        border-bottom: 1px solid $borderColor;

        .name {
            // font-weight: bold;
            margin-right: 5px;
            color: $textColor;

            &:hover {
                color: $themeColor;
            }
        }

        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .sub-title {
                font-size: 10px;
                color: labelColor;
                margin-bottom: 10px;
            }

            .principal {
                background: $gray;
                font-size: 12px;
                line-height: 40px;
                padding: 0 20px;
                margin-right: -20px;
            }
        }
    }

    &-info {
        line-height: 25px;
        font-size: 12px;
        margin-bottom: 7px;
    }

    &-tools {
        display: flex;
        .tool {
            padding: 0 10px;
            border-right: 1px solid $borderColor;
            font-size: 12px;

            &:first-child {
                padding-left: 0;
            }

            &:last-child {
                border: none;
            }
        }
    }
}

.label-title {
    font-size: 20px;
    border-left: 2px solid #b3238b;
    padding-left: 10px;
    font-weight: 600;
}

.price-box {
    display: flex;
    text-align: center;
    width: 100%;
    padding: 25px 0px;
    border-bottom: 1px solid $borderColor;
    li {
        flex-grow: 1;
        p {
            color: $labelColor;
            font-size: 12px;
        }
        span {
            font-size: 20px;
            color: $textColor;
            font-weight: 600;
        }
    }
}

.operation-btn {
    text-align: center;
    padding: 20px 0;
    .btn-group-custom {
        display: inline-block;
        vertical-align: middle;
        margin: 0 10px;
    }
    .el-button {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
}

.scroll-content {
    max-height: 375px;
    overflow: auto;
    box-sizing: border-box;
    .price_adjustment_content {
        padding: 10px 0px;
        border-bottom: 1px solid $borderColor;
        display: flex;
        // &>div{
        //     flex:1
        // }
        i {
            font-size: 30px;
            color: $themeColor;
            margin-left: 10px;
        }
    }
}
.contracForm {
    //  padding: 5px 15px;
    .itemForm {
        width: 100%;
        height: auto;
        line-height: 30px;
        padding: 0 20px;
        overflow: hidden;
        box-sizing: border-box;
        .label {
            float: left;
            padding: 0 30px 0 5px;
            font-weight: bold;
            color: #333;
            &.required {
                &::before {
                    content: "*";
                    color: red;
                }
            }
        }
        .width1 {
            width: 100px;
            display: inline-block;
            margin-right: 20px;
        }
    }

    .edit-form {
        display: inline-block;
        margin-left: 14px;
        .el-input {
            width: 65px;
        }
    }
    .editPriceMsg {
        margin-left: 17px;
        .required {
            color: red;
        }
    }
}
</style>
