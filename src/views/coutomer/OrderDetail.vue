<template>
    <el-container>
        <div class="wrapper" v-if="data">
            <!-- 产品信息 -->
            <section>
                <p class="label-title">产品信息</p>
                <div class="operation-panel">
                    <h3 class="header">
                        <div class="tools pointer color-purple">
                            <span @click="openNewWin({
                            path: '/touristroute/trip/baseInfo/',
                            query: {
                            line_id: data.product_id
                            }
                          })">团号: {{ data.tuan_no }}</span>
                            <el-tag style="margin-left:10px;vertical-align:middle" v-if="data.is_confirm==1" type="info" size="small">二次确认</el-tag>
                            <el-tag style="margin-left:10px;vertical-align:middle" v-else type="info" size="small">无需二次确认</el-tag>
                        </div>
                        <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
                        <div class="right-label">出团日期：{{ data.departure_date }} | 回团日期：{{ data.end_date }}</div>
                    </h3>
                    <ul class="product-list">
                        <li class="product-item">
                            <div class="title">
                                <div tag="h3">
                                    <div class="color-purple pointer" @click="openNewWin({
                                    path: '/touristroute/trip/baseInfo',
                                    query: {
                                    line_id: data.product_id
                                    }
                                  })">{{data.lineOrderProduct.line_title
                                        }}</div>
                                    <p class="sub-title">{{ data.lineOrderProduct.line_subtitle }}</p>
                                </div>
                                <!-- <div class="principal">负责人：姚微微.13454287648</div> -->
                            </div>
                            <el-row class="product-info">
                                <el-col :span="8">
                                    <div class="color-purple pointer" @click="openNewWin({
                                      path: '/touristroute/trip/baseInfo',
                                      query: {
                                      line_id: data.product_id
                                      }
                                    })">产品编号：{{
                                        data.lineOrderProduct.line_no }}</div>
                                </el-col>
                                <el-col :span="8">供 应 商：{{ data.supplier_org_name }}</el-col>
                                <el-col :span="8" v-if="data.is_deposit == 1">定金金额：¥{{ data.deposit }}</el-col>
                                <el-col :span="8">线路类型：{{ data.lineOrderProduct.class_name_1 }} > {{ data.lineOrderProduct.class_name_2 }} > {{ data.lineOrderProduct.class_name_3 }}</el-col>
                                <el-col :span="8">线路负责人：{{ data.lineOrderProduct.operator_name }}{{ data.lineOrderProduct.operator_phone ? '/' + data.lineOrderProduct.operator_phone : '' }}</el-col>
                                <el-col :span="8" v-if="data.is_deposit == 1 && data.deposit_remark">定金说明：{{ data.deposit_remark }}</el-col>
                                <el-col :span="8">出 发 地：{{ data.lineOrderProduct.starting_city }}</el-col>
                                <el-col :span="8">目 的 地：{{ data.lineOrderProduct.end_city }}</el-col>
                                <el-col :span="8">
                                    行程天数：{{ data.lineOrderProduct.line_day }}天
                                    <template v-if="data.lineOrderProduct.line_night && data.lineOrderProduct.line_night != 0">{{ data.lineOrderProduct.line_night }}晚</template>
                                </el-col>
                            </el-row>
                        </li>
                    </ul>
                </div>
            </section>
            <!-- 订单信息 -->
            <section>
                <p class="label-title">订单信息</p>
                <div class="operation-panel">
                    <h3 class="header">
                        <div class="tools color-purple">
                            订单号：{{ data.order_no }}
                            <el-tag :type="data.order_status | typeColor">{{ data.order_status | orderStatus }}</el-tag>
                        </div>
                        <!-- <div class="right-label" v-if="data.insurance_order_no">
            保险订单号：
            <router-link
              :to="{path: 'singlepro/insurance/order-details', query:{'order_no': data.insurance_order_no}}"
              class="color-pruple"
            >{{ data.insurance_order_no }}</router-link>
            </div>-->
                    </h3>
                    <ul class="product-list">
                        <li class="product-item">
                            <el-row class="product-info">
                                <el-col :span="8">订单来源：{{ data.order_source | orderSource }}</el-col>
                                <el-col :span="8" v-if="data.operator">下 单 人：{{ data.operator.username }}{{ data.operator.mobile ? '/' + data.operator.mobile : '' }}(账号：{{ data.operator.login_name }})</el-col>
                                <el-col :span="8" v-if="data.operator">下单人所属组织：{{ data.operator.org_name }}</el-col>
                                <el-col :span="8">订单人数: {{ order_num }}
                                </el-col>
                                <el-col :span="8">下单时间：{{ data.create_time }}</el-col>
                                <el-col :span="8">代 理 商：{{ data.agent_org_name }}</el-col>
                                <el-col :span="8">订单联系人/电话：{{ data.contacts_real_name }}/{{ data.contacts_mobile }}</el-col>
                            </el-row>
                            <ul class="product-tools" v-if="data.remark">
                                <li class="tool">订单备注: {{ data.remark }}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>
            <!-- 非预占位订单显示内容 -->
            <div v-if="!(data.is_seat == 1 && data.order_status == 1)">
                <!-- 价格明细 -->
                <section>
                    <p class="label-title">价格明细</p>
                    <div class="operation-panel">
                        <ul class="price-box">
                            <li>
                                <p>应收金额</p>
                                <span>¥ {{ data.total_amount }}</span>
                            </li>
                            <li>
                                <p>已收金额</p>
                                <span>¥ {{ data.total_received_amount }}</span>
                            </li>
                            <li>
                                <p>未收金额</p>
                                <span>¥ {{ data.weishou_amount }}</span>
                            </li>
                            <li>
                                <p>应结算金额</p>
                                <span>¥ {{ data.total_peer_amount }}</span>
                            </li>
                            <!-- <li>
                <p>实际应结算金额</p>
                <span>¥ {{ data.real_settled_amount }}</span>
              </li>-->
                            <li>
                                <p>已结算金额</p>
                                <span>¥ {{ data.total_settled_amount }}</span>
                            </li>
                            <li>
                                <p>未结算金额</p>
                                <span>¥ {{ data.weishou_settled_amount }}</span>
                            </li>
                            <li>
                                <p>销售利润</p>
                                <span>¥ {{ data.profit_amount }}</span>
                            </li>
                            <!-- <li>
                            <p>供应商返点</p>
                            <span>¥ {{ data.return_amount }}</span>
              </li>-->
                        </ul>
                        <div class="list">
                            <el-table :data="data.price" border style="width: 100%">
                                <el-table-column label="项目" align="center" min-width="200">
                                    <template slot-scope="scope">
                                        <div>
                                            <template>{{ scope.row.item_name || '--' }}</template>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="数量" align="center" min-width="80">
                                    <template slot-scope="scope">
                                        <div>
                                            <template v-if="scope.row.price_source != 2">{{ scope.row.num || '--' }}</template>
                                            <template v-else>--</template>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="销售单价" align="center" min-width="120">
                                    <template slot-scope="scope">
                                        <div>
                                            <template v-if="scope.row.price_source == 1">{{ scope.row.sale_price || '--' }}</template>
                                            <template v-else-if="scope.row.price_source == 3">{{ scope.row.diff_room_price || '--' }}</template>
                                            <template v-else>--</template>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="应收金额" align="center" min-width="120">
                                    <template slot-scope="scope">
                                        <div>
                                            <template v-if="scope.row.price_source != 2">{{ scope.row.total_sale_price || '--' }}</template>
                                            <template v-else>
                                                <span v-if="scope.row.modify_out_price != 0">{{ scope.row.type == 1 ? '+' : '-' }}</span>
                                                {{ scope.row.modify_out_price != 0 ? scope.row.modify_out_price : '--' }}
                                            </template>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="结算单价" align="center" min-width="120">
                                    <template slot-scope="scope">
                                        <div>
                                            <template v-if="scope.row.price_source == 1">{{ scope.row.settle_price || '--' }}</template>
                                            <template v-else-if="scope.row.price_source == 3">{{ scope.row.diff_room_price || '--' }}</template>
                                            <template v-else>--</template>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="应结算金额" align="center" min-width="120">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.num">
                                            <template v-if="scope.row.price_source != 2">{{ scope.row.total_settle_price || '--' }}</template>
                                            <template v-else>
                                                <span v-if="scope.row.modify_peer_price != 0">{{ scope.row.type == 1 ? '+' : '-' }}</span>
                                                {{ scope.row.modify_peer_price != 0 ? scope.row.modify_peer_price : '--' }}
                                            </template>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="说明信息" align="center" min-width="200">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.remark">{{ scope.row.remark || '--' }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </section>
                <!-- 付款记录 -->
                <section>
                    <p class="label-title">付款记录</p>
                    <div class="operation-panel">
                        <div class="list">
                            <el-table :data="data.payment" border style="width: 100%">
                                <el-table-column label="交易流水号" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.payment_no">{{ scope.row.payment_no || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="收款人" align="center" min-width="100">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.operator_name">{{ scope.row.operator_name || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="所收款时间" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.pay_time">{{ scope.row.pay_time || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="交款方式" align="center" min-width="100">
                                    <template slot-scope="scope">
                                        <div :title="payType(scope.row.pay_type, scope.row.payment_type)">{{ payType(scope.row.pay_type, scope.row.payment_type) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="交款金额" align="center" min-width="100">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.amount">{{ scope.row.amount || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="到账金额" align="center" min-width="100">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.received_amount">{{ scope.row.received_amount || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="到账公司" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.payee_org_name">{{ scope.row.payee_org_name || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="认款人" align="center" min-width="100">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.subscriber_name">{{ scope.row.subscriber_name || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="认款时间" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.subscription_time">{{ scope.row.subscription_time || '--' }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </section>
                <!-- 结算记录 -->
                <section>
                    <p class="label-title">结算记录</p>
                    <div class="operation-panel">
                        <div class="list">
                            <el-table :data="data.settlement" border style="width: 100%">
                                <el-table-column label="结算单号" align="center" min-width="200">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.settleåment_no">{{ scope.row.settlement_no || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="结算时间" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.handle_time">{{ scope.row.handle_time || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="结算对象" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.payer_org_name">{{ scope.row.payer_org_name || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="结算金额" align="center" min-width="100">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.amount">{{ scope.row.amount || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="发起人" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.username">{{ scope.row.username || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="发起时间" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.create_time">{{ scope.row.create_time || '--' }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </section>
                <!-- 游客名单 -->
                <section>
                    <p class="label-title">游客名单</p>
                    <div class="operation-panel">
                        <div class="list">
                            <el-table :data="data.lineOrderTourist" border style="width: 100%">
                                <el-table-column label="姓名" align="center" min-width="100px">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.username">{{ scope.row.username || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="性别" align="center" min-width="100">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.gender | gender">{{ scope.row.gender | gender }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="证件类型/证件号码" align="center" min-width="210">
                                    >
                                    <template slot-scope="scope">
                                        <div :title="filterIdentityType(scope.row.identity_type) + '/' + scope.row.identity_no">{{ filterIdentityType(scope.row.identity_type) + '/' + scope.row.identity_no }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="证件有效期" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.identity_end_date">{{ scope.row.identity_end_date || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="手机号" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.mobile">{{ scope.row.mobile || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="出生日期" align="center" min-width="150">
                                    <template slot-scope="scope">
                                        <div :title="scope.row.birthday">{{ scope.row.birthday || '--' }}</div>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column label="备注" min-width="200">
                                <template slot-scope="scope">
                                    <div :title="scope.row.remark">{{ scope.row.remark }}</div>
                                </template>
                </el-table-column>-->
                                <!-- <el-table-column label="操作" align="center" min-width="100" fixed="right">
                                    <template slot-scope="scope">
                                        <a href="javascript:void(0)" class="color-purple" @click="handleEditTourist(scope.row)">编辑</a>
                                    </template>
                                </el-table-column> -->
                            </el-table>
                        </div>
                    </div>
                </section>
                <!-- 合同签字人 -->
                <section v-if="data.order_from != 2">
                    <p class="label-title">合同签字人</p>
                    <div class="operation-panel">
                        <div class="list">
                            <el-tag v-for="(item, $index) in data.lineOrderTourist" :key="$index" v-if="item.is_contract_sign == 1" :type="contractType(data.contract_type, item.is_signed)">{{ item.username }} 【{{ contractType(data.contract_type, item.is_signed, true) }}】</el-tag>
                        </div>
                    </div>
                </section>
            </div>
            <!-- 确认位置dialog -->
            <el-dialog title="确认位置" :visible.sync="affirmPlaceVisible">
                <div class="dialog-content">
                    <el-form>
                        <el-form-item label>
                            <el-radio-group v-model="affirmPlaceForm.seat_type">
                                <el-radio label="1">有位</el-radio>
                                <el-radio label="2">无位</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="位置保留至" v-if="affirmPlaceForm.seat_type == 1" :rules="[{ required: true }]">
                            <el-date-picker v-model="affirmPlaceForm.seat_time" type="datetime" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCallback('affirmPlaceVisible', false)">取 消</el-button>
                    <el-button type="primary" @click="dialogCallback('affirmPlaceVisible', true)">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 订单调价dialog -->
            <el-dialog title="订单调价" :visible.sync="priceAdjustmentVisible">
                <div class="dialog-content">
                    <div class="scroll-content">
                        <div class="price_adjustment_content">
                            <el-form :model="priceAdjustmentForm" ref="priceAdjustmentForm">
                                <div v-for="(item, $index) in priceAdjustmentForm.price_list" :key="$index" class="price_adjustment_content">
                                    <div>
                                        <el-form-item class="price_adjustment_content_btn" label="项目名称" :label-width="formLabelWidth" :prop="`price_list.${$index}.item_name`" :rules="[{ required: true ,message:'请输入项目名称', trigger:'blur'}]">
                                            <el-input v-model="item.item_name" autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="价格" class="paice-box" :label-width="formLabelWidth" :prop="`price_list.${$index}.modify_peer_price`" :rules="[{ required: true , type:'number',  min:1,  message:'请输入大于等于0的数值',  trigger:'blur'}]">
                                            <el-row>
                                                <el-col :span="5">
                                                    <el-select v-model="item.type" placeholder="请选择">
                                                        <el-option label="+" value="+"></el-option>
                                                        <el-option label="-" value="-"></el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="1">&nbsp;</el-col>
                                                <el-col :span="18">
                                                    <el-input-number placeholder="调整金额" autocomplete="off" v-model="item.modify_peer_price" :min="0" :controls="false"></el-input-number>
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
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCallback('priceAdjustmentVisible', false)">取 消</el-button>
                    <el-button type="primary" @click="dialogCallback('priceAdjustmentVisible', true)">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 出团通知书dialog -->
            <el-dialog title="出团通知书" :visible.sync="notificationsVisible">
                <div class="dialog-content" v-loading.body="loading">
                    <el-form>
                        <el-form-item label="下达出团通知书">
                            <el-upload action="/api/v1/profit/file-upload" ref="notifications_upload" :file-list="notificationsForm.file_info" :before-upload="handleBeforeUpload" :on-remove="handleRemove" :on-success="handleUploadsucc">
                                <el-button size="small">选择本地文件</el-button>
                                <p slot="tip">&ensp;仅支持jpeg、png、jpg、pdf格式</p>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogCallback('notificationsVisible', false)">取 消</el-button>
                    <el-button type="primary" @click="dialogCallback('notificationsVisible', true)">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 操作记录dialog -->
            <el-dialog title="操作记录" :visible.sync="recordDialogVisible" width="60%">
                <div class="dialog-content" v-loading.body="loading">
                    <el-table :data="recordList" border style="width: 100%">
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
                    <el-button type="primary" @click="dialogCallback('recordDialogVisible', false)">确 定</el-button>
                </div>
            </el-dialog>
            <line-tourist-form ref="editTouristForm" :visible="tourEditVisible" @update:visible="val => tourEditVisible = val" @saveHandler="saveTourist" :tourEditLoading="tourEditLoading" :identityTypeList="identityTypeList"></line-tourist-form>
        </div>
        <el-footer>
            <Affix :offset-bottom="8">
                <div class="operation-btn">
                    <el-button type="primary" @click="operation('操作记录')">操作记录</el-button>
                    <!-- <template v-for="(item, $index) in btn_gather">
                        <el-button type="primary" v-if="item != '确 认 件'" @click="operation(item)">{{ item }}</el-button>
                        <el-dropdown type="primary" style="margin: 0 10px;" v-else-if="item == '确 认 件' && data.confirmation" @command="operation">
                            <el-button>{{ item }}</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="look">查看</el-dropdown-item>
                                <el-dropdown-item command="download">下载</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template> -->
                </div>
            </Affix>
        </el-footer>
    </el-container>
</template>

<script>
import {
    lineQuoteOrdeDetail,
    lineQuoteOrdeConfimOrder,
    lineOrderPriceAdjustment,
    lineOrderUploadNotifications,
    lineOrderCreateConfirmation,
    lineOrderGetOrderOp,
    lineOrderCancelOrder,
    lineOrderSaleOrderTouristEdit
} from "src/api/touristroute";
import Affix from "src/components/template/common/affix";
import { getTouristInfo, editTouristInfo } from "src/api/tuan";
import { clone } from "src/utils/common";
import LineTouristForm from "src/components/components/newLineTouristForm.vue";
import * as format from "src/utils/format";
import { identityTypeMap } from "@/configuration/orderMap";
import { download } from "@/utils/common";
const btnfilter = {
    "-1": {
        name: "已取消",
        is_self_support: [],
        no_self_support: []
    },
    "0": {
        name: "待付款",
        is_self_support: ["订单调价", "操作记录"],
        no_self_support: ["操作记录"]
    },
    "1": {
        name: "待确认",
        is_self_support: ["确认位置", "操作记录"],
        no_self_support: ["操作记录"]
    },
    "2": {
        name: "占位中",
        is_self_support: ["取消订单", "操作记录"],
        no_self_support: ["操作记录"]
    },
    "3": {
        name: "部分付款",
        is_self_support: ["确 认 件", "出团通知书", "操作记录"],
        no_self_support: ["确 认 件", "操作记录"]
    },
    "4": {
        name: "已付款",
        is_self_support: ["确 认 件", "出团通知书", "操作记录"],
        no_self_support: ["确 认 件", "操作记录"]
    },
    "5": {
        name: "已完成",
        is_self_support: ["确 认 件", "出团通知书", "操作记录"],
        no_self_support: ["确 认 件", "操作记录"]
    }
};
export default {
    components: {
        LineTouristForm,
        Affix
    },
    data() {
        const query = {
            order_id: this.$route.query.order_id,
            order_no: this.$route.query.order_no
        };
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 86400000;
                }
            },
            data: null,
            query: query,
            btn_gather: [],
            affirmPlaceVisible: false,
            priceAdjustmentVisible: false,
            notificationsVisible: false,
            recordDialogVisible: false,
            tourEditVisible: false,
            formLabelWidth: "100px",
            affirmPlaceForm: {
                order_id: query.order_id,
                seat_time: "",
                seat_type: "1"
            },
            priceAdjustmentForm: {
                order_id: query.order_id,
                order_no: query.order_no,
                price_list: [
                    {
                        item_name: "",
                        type: "+",
                        modify_peer_price: "",
                        remark: ""
                    }
                ]
            },
            notificationsForm: {
                order_id: query.order_id,
                order_no: query.order_no,
                file_info: []
            },
            loading: false,
            recordList: [],
            // 编辑游客信息相关变量 begin
            tourEditCardType: ["身份证"],
            tourEditBtnDis: false,
            tourEditObj: {
                tourist_id: ""
            },
            tourEditLoading: false,
            identityTypeList: identityTypeMap
        };
    },
    filters: {
        isSigned: function(val) {
            return val == 1 ? "已签署" : "未签署";
        },
        gender: function(val) {
            return val == 1 ? "男" : "女";
            switch (val) {
                case "1":
                    return "男";
                case "2":
                    return "女";
                default:
                    return "其他";
            }
        },
        orderSource: function(val) {
            switch (val) {
                case "0":
                    return "APP";
                case "1":
                    return "云平台";
                case "2":
                    return "IOS";
                case "3":
                    return "安卓";
                case "4":
                    return "官网";
                case "5":
                    return "H5";
                case "6":
                    return "小程序";
                case "7":
                    return "收客小程序";
            }
        },
        typeColor: function(val) {
            switch (val) {
                case "0":
                    return "danger";
                case "1":
                    return "warning";
                case "2":
                    return "success";
                case "3":
                    return "";
                case "4":
                    return "success";
                default:
                    return "info";
            }
        },
        orderStatus: function(val) {
            switch (val) {
                case "-1":
                    return "已取消";
                case "0":
                    return "待付款";
                case "1":
                    return "待确认";
                case "2":
                    return "占位中";
                case "3":
                    return "部分付款";
                case "4":
                    return "已付款";
                case "5":
                    return "已完成";
                default:
                    return "";
            }
        }
    },
    computed: {
        // 编辑权限
        topMenuConst() {
            return this.$route.meta && this.$route.meta.topMenuConst;
        },
        editTouristInfoPerm() {
            switch (this.topMenuConst) {
                case "purchaseorder":
                    return this.$menuPermission(
                        "purchaseorder/lineorder/getorderdetail/edittouristinfo"
                    );
                case "saleorder":
                    return this.$menuPermission(
                        "saleorder/lineorder/getorderdetail/edittouristinfo"
                    );
                default:
                    return false;
            }
        },
        order_num() {
            let str = "";
            if (this.data.is_seat == 1) {
                for (let i in this.data.orderTouristNum) {
                    str +=
                        this.data.orderTouristNum[i].num +
                        this.data.orderTouristNum[i].name;
                }
            } else {
                for (let i in this.data.price) {
                    str +=
                        this.data.price[i].price_source == 1
                            ? this.data.price[i].num +
                              this.data.price[i].type_name
                            : "";
                }
            }
            return str;
        }
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        openNewWin({ path, query }) {
            // let routeData = this.$router.resolve({
            //     location: Location,
            //     path: path,
            //     query
            // });
            let { origin, pathname, hash } = location;
            let url = `${origin}${pathname}#${path}?line_id=${query.line_id}`;
            window.open(url, "_blank");
        },
        // 获取详情信息
        getDetail() {
            this.data = null;
            this.btn_gather = [];
            let params = {
                order_id: this.query.order_id,
                order_no: this.query.order_no
            };
            lineQuoteOrdeDetail(params).then(res => {
                const { code, data, msg } = res;
                if (code == 0) {
                    this.data = data;
                    this.btn_gather =
                        btnfilter[this.data.order_status][
                            this.data.self_product == 1
                                ? "is_self_support"
                                : "no_self_support"
                        ];
                } else {
                    this.$message.error(msg);
                }
            });
        },
        // 支付类型
        payType(type1, type2) {
            if (type1 == 1) {
                switch (type2) {
                    case 1:
                        return "微信";
                    case 2:
                        return "支付宝";
                    default:
                        return "在线支付";
                }
            } else if (type1 == 2) {
                return "线下支付";
            } else {
                return "--";
            }
        },
        // 证件类型
        filterIdentityType(type) {
            return identityTypeMap[type]
                ? identityTypeMap[type]["title"]
                : "未定义类型";
        },
        // 合同类型
        contractType(type, status, tag) {
            if (type == 2) {
                if (status == 1) {
                    return tag ? "已签署" : "success";
                } else {
                    return tag ? "未签署" : "";
                }
            } else {
                return tag ? "未生成" : "warning";
            }
        },
        // 操作按钮集合
        async operation(type) {
            switch (type) {
                case "确认位置":
                    this.affirmPlaceVisible = true;
                    break;
                case "订单调价":
                    this.priceAdjustmentVisible = true;
                    break;
                case "出团通知书":
                    this.notificationsVisible = true;
                    break;
                case "create": // 查看确认件
                    this.createConfirmation();
                    break;
                case "操作记录":
                    this.getRecord();
                    break;
                case "取消订单":
                    this.$confirm("确认取消订单？", "取消订单", {
                        type: "warning"
                    }).then(() => {
                        this.cancelOrder();
                    });
                    break;
                case "look":
                    if (this.data.confirmation) {
                        window.open(this.data.confirmation, "_blank");
                    } else {
                        this.$message.warning("暂无确认件");
                    }
                    break;
                case "download":
                    if (this.data.confirmation) {
                        let type = this.data.confirmation.split(".").pop();
                        let downloadRes = await download(
                            this.data.confirmation,
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
            }
        },
        // 数据清除
        formClear(form) {
            switch (form) {
                case "affirmPlaceForm":
                    this.affirmPlaceForm = {
                        id: this.$route.query.order_id,
                        seat_time: "",
                        seat_type: "1"
                    };
                    return;
                case "priceAdjustmentVisible":
                    this.$set(this.priceAdjustmentForm, "price_list", [
                        {
                            item_name: "",
                            type: "+",
                            modify_peer_price: "",
                            remark: ""
                        }
                    ]);
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
                        this.formClear("affirmPlaceVisible");
                    }
                    break;
                case "priceAdjustmentVisible":
                    if (bool) {
                        this.priceAdjustment();
                    } else {
                        this.formClear("priceAdjustmentVisible");
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
                !this.affirmPlaceForm.seat_time &&
                this.affirmPlaceForm.seat_type == 1
            ) {
                this.$message.error("请选择保留时间！");
                return;
            } else if (
                new Date(this.affirmPlaceForm.seat_time).getTime() <=
                new Date().getTime()
            ) {
                this.$message.error("保留时间必须晚于当前时间点！");
                return;
            } else {
                lineQuoteOrdeConfimOrder(this.affirmPlaceForm).then(res => {
                    const { code, msg } = res;
                    if (code == 0) {
                        this.affirmPlaceVisible = false;
                        this.formClear("affirmPlaceForm");
                        this.getDetail();
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
                    modify_peer_price: "",
                    remark: ""
                });
            } else if (type == "remove") {
                this.priceAdjustmentForm.price_list.splice($index, 1);
            }
        },
        // 订单调价axios
        priceAdjustment() {
            this.$refs.priceAdjustmentForm.validate(vaild => {
                if (vaild) {
                    lineOrderPriceAdjustment(this.priceAdjustmentForm).then(
                        res => {
                            const { code, msg } = res;
                            if (code == 0) {
                                this.priceAdjustmentVisible = false;
                                this.formClear("priceAdjustmentForm");
                                this.getDetail();
                                this.$message.success("操作成功！");
                            } else {
                                this.$message.error(msg);
                            }
                        }
                    );
                } else {
                    return;
                }
            });
        },
        // 出团通知书axios
        notifications() {
            if (!this.notificationsForm.file_info.length) {
                this.$message.error("请上传出团通知书！");
                return;
            }
            let params = {
                order_id: this.query.order_id,
                order_no: this.query.order_no,
                file_info: this.notificationsForm.file_info[0]
            };
            lineOrderUploadNotifications(params).then(res => {
                const { code, msg } = res;
                if (code == 0) {
                    this.notificationsVisible = false;
                    this.formClear("notificationsVisible");
                    this.$message.success("操作成功！");
                } else {
                    this.$message.error(msg);
                }
            });
        },
        // 图片上传-删除图片
        handleRemove(file) {
            for (let i = 0; i < this.notificationsForm.file_info.length; i++) {
                if (this.notificationsForm.file_info[i]["id"] == file.id) {
                    this.notificationsForm.file_info.splice(i, 1);
                    return false;
                }
            }
        },
        // 图片上传-图片更新成功
        handleUploadsucc(response, file) {
            if (response.code == 0) {
                response.data[0].name = file.name;
                this.$set(this.notificationsForm, "file_info", response.data);
            } else {
                this.$message.error(response.msg);
                this.$refs.notifications_upload.clearFiles();
            }
            this.loading = false;
        },
        // 图片上传-图片更新前
        handleBeforeUpload(file) {
            this.loading = true;
            let isLt2M = file.size / 1024 / 1024 < 10;
            let isTrue = /jpeg|png|jpg|pdf/i.test(
                file.name.split(".")[file.name.split(".").length - 1]
            );
            if (!isTrue) {
                this.$message.error("仅支持jpeg、png、jpg、pdf格式!");
                return false;
            }
            if (!isLt2M) {
                this.$message.error("上传文件大小不能超过 10MB!");
                this.loading = false;
                return false;
            }
            return true;
        },
        // 确认件axios
        createConfirmation() {
            let params = {
                order_id: this.query.order_id,
                order_no: this.query.order_no
            };
            lineOrderCreateConfirmation(params).then(res => {
                const { code, msg } = res;
                if (code == 0) {
                    this.getDetail();
                    this.$message.success("确认件已生成");
                } else {
                    this.$message.error(msg);
                }
            });
        },
        // 获取操作记录
        getRecord() {
            let params = {
                order_no: this.query.order_no
            };
            lineOrderGetOrderOp(params).then(res => {
                const { code, data, msg } = res;
                if (code == 0) {
                    this.recordList = data;
                    this.recordDialogVisible = true;
                } else {
                    this.$message.error(msg);
                }
            });
        },
        // 取消订单axios
        cancelOrder() {
            let params = {
                order_id: this.query.order_id,
                order_no: this.query.order_no
            };
            lineOrderCancelOrder(params).then(res => {
                const { code, msg } = res;
                if (code == 0) {
                    this.getDetail();
                    this.$message.success("取消订单成功！");
                } else {
                    this.$message.error(msg);
                }
            });
        },
        // 游客信息查询操作
        handleEditTourist(item) {
            this.tourEditVisible = true;
            this.$refs.editTouristForm.initData(item);
        },
        async saveTourist(params) {
            let order_status = this.data.order_status;
            let confirm = "confirm";
            if (order_status == 3 || order_status == 4) {
                confirm = await this.$confirm(
                    "保存后将作废原电子合同重新生成电子合同，确认保存?",
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
                this.tourEditLoading = this.tourEditVisible = false;
                this.$message({
                    message: result.msg,
                    type: result.code == "0" ? "success" : "error"
                });
                this.getDetail();
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import "src/assets/css/variables.scss";
.wrapper {
    padding: 0 15px 20px 15px;
}
.pointer {
    cursor: pointer;
}
section {
    padding-top: 10px;
}

.list {
    padding: 20px 0;
}

.operation-panel {
    padding: 0 20px;
    background: #fff;
    border: 1px solid rgba(224, 224, 224, 1);
}

.header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $borderColor;
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
            font-weight: bold;
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
}

.price_adjustment_form {
    width: 400px;
}

.scroll-content {
    max-height: 375px;
    overflow: auto;
    box-sizing: border-box;
    .price_adjustment_content {
        display: flex;
        padding: 10px 0px;
        border-bottom: 1px solid $borderColor;
        i {
            font-size: 30px;
            color: $themeColor;
            margin-left: 10px;
        }
        &:last-child {
            border-bottom: none;
        }
    }
}
</style>
