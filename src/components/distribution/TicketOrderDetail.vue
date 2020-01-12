<template>
  <div class="wrapper" v-if="detailInfo">
    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <li tag="li" class="on">订单详情</li>
          <router-link :to="{ name: orderTypeRouterName.orderRefundDetailName, query: { order_id: $route.query.order_id}}" 
            v-if="detailInfo.order_info && detailInfo.order_info.refund_show"
            tag="li">
            退款详情
          </router-link>
        </template>
      </ul>
    </div>


    <div class="tickets-order-detail">
    <div class="panel">
      <div class="hd">
        <h2>订单信息</h2>
      </div>
      <div class="bd">
        <p class="tips" v-if="detailInfo.order_info.status_code == '11'">
          请在{{endOrderTime}}分钟内支付订单，未准时支付，订单会自动关闭
        </p>
        <p class="mb10" v-if="orderType == 'MyOrder'  ||  orderType == 'SingleOrder'">自营订单：{{detailInfo.order_info.other_order_id}}</p>
        <p class="mb10" v-if="orderType == 'SelfSupportOrder'">单项订单：{{detailInfo.order_info.other_order_id}}</p>
        <table class="table-custom">
          <tr>
            <th width="200">订单号</th>
            <th>下单时间</th>
            <th>游玩日期</th>
            <th>支付方式</th>
            <th>订单总金额</th>
            <th>已收金额</th>
            <th>未收金额</th>
            <th>结算方</th>
            <th>订单状态</th>
            <th width="100">操作</th>
          </tr>
          <tr>
            <td>{{detailInfo.order_info.order_id}}</td>
            <td>{{detailInfo.order_info.create_time}}</td>
            <td>{{detailInfo.order_info.play_time}}</td>
            <td>{{detailInfo.order_info.pay_type}}</td>
            <td>{{detailInfo.order_info.total_price}}</td>
            <td>{{detailInfo.order_info.receipted_amount}}</td>
            <td>
               <span v-if="detailInfo.order_info.status_code != 3">{{ detailInfo.order_info.unpaid_amount }}</span>
               <span v-else>--</span>
            </td>
            <td>{{detailInfo.order_info.distributor_name}}</td>
            <td>{{detailInfo.order_info.status_name}}</td>
            <td>
              <el-dropdown trigger="click" v-if="detailInfo.order_info.allow_operation && detailInfo.order_info.status_code != 3">
                <span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <template v-if="orderType == 'MyOrder' || orderType == 'SingleOrder'">
                  <el-dropdown-item v-if="detailInfo.order_info.status_code == 11">
                    <a href="javascript:;" @click="requestCancelTicketOrderHandler">取消订单</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="detailInfo.order_info.status_code == 11">
                    <a href="javascript:;" @click="handleOnlinePay">在线支付</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="detailInfo.order_info.status_code == 0 || 
                    detailInfo.order_info.status_code == 12">
                    <a href="javascript:;" @click="setRefundTicketHandler(detailInfo.order_info)">申请退票</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="detailInfo.order_info.status_code == 0">
                    <a href="javascript:;" @click="setContactTicketHandler(detailInfo.order_info)">修改手机号</a>
                  </el-dropdown-item>
                  </template>
                  <template v-if="orderType == 'SelfSupportOrder'">
                  <el-dropdown-item v-if="detailInfo.order_info.status_code == 12">
                    <a href="javascript:;" @click="requestConfirmTicketOrderHandler">确认订单</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="detailInfo.order_info.status_code == 0">
                    <a href="javascript:;" @click="requestVerificationTicketOrderHandler">验证门票</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="detailInfo.order_info.status_code != 11 && 
                    detailInfo.order_info.status_code != 12 &&
                    detailInfo.order_info.status_code != 3">
                    <a href="javascript:;" @click="addShoukuanVisible=true">添加收款</a>
                  </el-dropdown-item>
                  </template>
                  <el-dropdown-item v-if="detailInfo.order_info.status_code != 3 && 
                    detailInfo.order_info.status_code != 11 &&
                    detailInfo.order_info.status_code != 12">
                    <router-link :to="{ name: orderTypeRouterName.orderIncomeDetailName, query: { bid: detailInfo.bill_id, type:orderTypeRouterName.configType } }">查看收入</router-link>          
                  </el-dropdown-item>
                  <el-dropdown-item v-if="$menuPermission('api/order/set_order_operation') && orderType != 'MyOrder'">
                    <a href="javascript:;" @click="handleChangeOrderOperator">订单负责人</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span v-else>--</span>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="panel" v-if="detailInfo.product_info" >
      <div class="hd">
        <h2>产品信息</h2>
      </div>
      <div class="bd">
        <div class="info-list">
          <span><i>所在景区：</i>{{detailInfo.product_info.scenic_title}}</span>
        </div>
        <table class="table-custom">
          <tr>
            <th>产品名称</th>
            <th>销售价</th>
            <th>购买数量</th>
            <th>已使用数量</th>
            <th>已退款数量</th>
            <th>验证时间</th>
            <th>退票规则</th>
          </tr>
          <tr>
            <td>{{detailInfo.product_info.quote_name + '/' +detailInfo.product_info.product_name}}</td>
            <td>{{detailInfo.product_info.buy_price}}</td>
            <td>{{detailInfo.product_info.ticket_num}}</td>
            <td>{{detailInfo.product_info.used_num}}</td>
            <td>{{detailInfo.product_info.cancel_num}}</td>
            <td>{{detailInfo.product_info.verify_time}}</td>
            <td>
              <el-popover
                  placement="bottom"
                  width="300"
                  trigger="hover">
                  <div class="popover-table">
                    <table>
                      <tr>
                        <th>退票规则</th>
                        <td>{{ detailInfo.product_info.refund_rule.refund_rule }}</td>
                      </tr>
                      <tr>
                        <th>是否需要审核</th>
                        <td>{{ detailInfo.product_info.refund_rule.refund_audit }}</td>
                      </tr>
                      <tr>
                        <th>退票手续费</th>
                        <td>
                         {{ detailInfo.product_info.refund_rule.refund_rule == '不可退' ? 0 : detailInfo.product_info.refund_rule.refund_fee }}
                        </td>
                      </tr>
                      <tr v-if="detailInfo.product_info.refund_rule.refund_rule != '不可退'">
                        <th>阶梯退票</th>
                        <td>
                          <p v-for="(item,idx) in detailInfo.product_info.refund_rule.refund_cost" :key="idx">
                            {{item}}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <span class="popover-text" slot="reference">详情</span>
                </el-popover>
            </td>
          </tr>
        </table>
      </div>
    </div>


    <div class="panel" v-if="detailInfo.product_info" >
      <div class="hd">
        <h2>订单价格明细</h2>
        <!-- <el-button type="primary" style="float:right;" @click="addLinePriceDetail">新增项目</el-button> -->
      </div>
      <div class="bd">
        <div class="info-list">
          <span><i>结算币种 / 汇率：</i>人民币 / 1</span>
          <span><i>结算总金额：</i>{{totalPrice}}</span>
          <span><i>本位币：</i>{{totalPrice}}</span>
        </div>
        <table class="table-custom">
          <tr>
            <th>序号</th>
            <th>项目</th>
            <th>单价（本位币)</th>
            <th>结算单价</th>
            <th>数量</th>
            <th>结算金额小计</th>
            <th>小计（本位币)</th>
            <th>说明</th>
            <!-- <th>操作</th> -->
          </tr>
          <tr v-for="(item,idx) in detailInfo.order_price_detail" :key="idx">
            <template v-if="!item.isadd">
              <td>{{idx+1}}</td>
              <td>{{item.item_name}}</td>
              <td>{{item.rmb_unit_price}}</td>
              <td>{{item.unit_price}}</td>
              <td>{{item.num}}</td>
              <td>{{item.unit_price * item.num}}</td>
              <td>{{item.rmb_total_amount}}</td>
              <td></td>
              <!-- <td>--</td> -->
            </template>
            <!-- <template v-else>
              <td>{{idx+1}}</td>
              <td>
                <el-input v-model="item.item_name" placeholder="请输入项目名称"></el-input>
              </td>
              <td>{{item.unit_price}}</td>
              <td>
                <el-select v-model="item.price_type" placeholder="请选择" style="width:50px;">
                  <el-option label="+" :value="1"></el-option>
                  <el-option label="-" :value="-1"></el-option>
                </el-select>
                <el-input v-model="item.unit_price" placeholder="请输入结算单价"></el-input>
              </td>
              <td>
                <el-input v-model="item.num" placeholder="请输入数量"></el-input>
              </td>
              <td>{{item.unit_price * item.num}}</td>
              <td>{{item.unit_price * item.num}}</td>
              <td><el-input v-model="item.remark" placeholder="请输入说明"></el-input></td>
              <td>
                <el-button type="text" @click="saveLinePriceDetail(idx)">保存</el-button>
                <el-button type="text" @click="delLinePriceDetail(idx)">删除</el-button>
              </td>
            </template> -->
          </tr>
        </table>
      </div>
    </div>


    <div class="panel" v-if="detailInfo.contact_info" >
      <div class="hd">
        <h2>取票人</h2>
      </div>
      <div class="bd">
        <table class="table-custom">
          <tr>
            <th>取票人</th>
            <th>手机号</th>
            <th>凭证号</th>
            <th>取票信息</th>
          </tr>
          <tr>
            <td>{{detailInfo.contact_info.contact_name}}</td>
            <td>{{detailInfo.contact_info.contact_mobile}}</td>
            <td>{{detailInfo.contact_info.voucher_code}}</td>
            <td>{{detailInfo.contact_info.ticket_info}}</td>
          </tr>
        </table>
      </div>
    </div>


    <div class="panel" v-if="detailInfo.tourist_list && !detailInfo.order_info.need_idcard" >
      <div class="hd">
        <h2>出游人信息</h2>
      </div>
      <div class="bd">
        <table class="table-custom">
          <tr>
            <th>姓名</th>
            <th>证件类型</th>
            <th>证件号码</th>
          </tr>
          <tr v-for="(item,idx) in detailInfo.tourist_list" :key="idx">
            <td>{{item.tourist_name}}</td>
            <td>身份证</td>
            <td>{{item.id_card}}</td>
          </tr>
        </table>
      </div>
    </div>


    <div class="panel">
      <div class="hd">
        <h2>订单记录</h2>
      </div>
      <div class="bd">
        <table class="table-custom">
          <tr>
            <th>时间</th>
            <th>操作</th>
            <th>订单状态</th>
            <th>操作人（渠道）</th>
          </tr>
          <tr v-for="(item,idx) in detailInfo.order_log" :key="idx">
            <td>{{item.create_time}}</td>
            <td>{{item.op_type}}</td>
            <td>{{item.order_status}}</td>
            <td>{{item.op_user_name}}</td>
          </tr>
        </table>
      </div>
    </div>
    </div>

    <add-shoukuan-dialog :visible.sync="addShoukuanVisible" @submit="handleSaveShoukuan" @close="addShoukuanVisible=false" />
    <el-dialog
      title="退票申请"
      :visible.sync="refundVisible"
      size="tiny"
      @close="refundDialogCloseHandler">
      <el-form :model="refundData" class="refund-cont" ref="refundForm">
        <p>只能在原票数的基础上减少票数</p>
        <el-form-item prop="refund_num">
          <el-input-number v-model="refundData.refund_num" :min="refundData.refund_min_num" :max="refundData.refund_max_num"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="refund-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="requestRefundTicketHandler">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改手机号码"
      :visible.sync="contactVisible"
      size="tiny"
      @close="contactDialogCloseHandler">
      <el-form :model="contactData" class="refund-cont" ref="contactForm">
        <el-form-item prop="mobile">
          <el-input v-model="contactData.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="refund-footer">
        <el-button @click="contactVisible = false">取 消</el-button>
        <el-button type="primary" @click="requestChangeTicketContact">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="退票申请"
      :visible.sync="refundVisible"
      size="tiny"
      @close="refundDialogCloseHandler">
      <el-form :model="refundData" class="refund-cont" ref="refundForm">
        <p>只能在原票数的基础上减少票数</p>
        <el-form-item prop="refund_num">
          <el-input-number v-model="refundData.refund_num" :min="refundData.refund_min_num" :max="refundData.refund_max_num"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="refund-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="requestRefundTicketHandler">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="确认订单"
      :visible.sync="confirmOrderVisible"
      size="tiny">
      <div>
        <p>确定该订单有效？</p>
        <p style="color: #999">确认无效后，订单会被取消自动退款给买家，请慎重操作</p>
      </div>
      <span slot="footer" class="refund-footer">
        <el-button @click="toDoConfirmOrderHandler(0)">确认无效</el-button>
        <el-button type="primary" @click="toDoConfirmOrderHandler(1)">确认有效</el-button>
      </span>
    </el-dialog>
    <online-pay ref="onlinePay" :order-id="orderNo" order-resource="6" />
    <change-order-operator v-if="$menuPermission('api/order/set_order_operation')" ref="operator" order-type="3" @change-success="getTicketOrderDetailsHandler"></change-order-operator>
  </div>
</template>

<script>
import { getTicketMyOrderDetail,
         getTicketSingleOrderDetail,
         getTicketSelfSupportOrderDetail,
         setTicketComfirmOrder,
         setTicketVerification,
         refundTicket, 
         cancelTicketOrder,
         setTicketModifyPrice,
         changeTicketContact} from 'src/api/ticket';
import {saveSaleOrderGathering,
        saveTeamOrderGathering,
        financeSaveOrderGathering} from 'src/api/api';
import OnlinePay from "src/components/distribution/components/OnlinePay.vue";
import AddShoukuanDialog from 'src/components/distribution/AddShoukuanDialog.comp.vue';
import ChangeOrderOperator from 'src/plugins/ChangeOrderOperator.vue';
import * as format from 'src/utils/format';

export default {
  data() {
    return {
      detailInfo:null,
      orderStatus:'',
      refundVisible: false,
      refundData: {
        order_id: null,
        refund_num: 1,
        refund_min_num: 1,
        refund_max_num: null,
      },
      contactVisible: false,
      contactData: {
        order_id: null,
        mobile: null
      },
      addShoukuanVisible:false,
      orderNo:'',
      confirmOrderVisible:false,
      isIntervalFlag:0,
      endOrderTime:null
    }
  },
  computed: {
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'DistributionTicketMyOrderDetail':
          type = 'MyOrder';
          break;
        case 'DistributionTicketPurchaseOrderDetail':
          type = 'PurchaseOrder';
          break;
        case 'DistributionTicketSingleOrderDetail':
          type = 'SingleOrder';
          break;
        case 'TicketSelfSupportOrderDetail':
          type = 'SelfSupportOrder';
          break;
        case 'financeTicketMyOrderDetail':
          type = 'FinanceOrder';
          break;
      }
      return  type;
    },
    orderTypeRouterName(){
      let type = this.orderType,
          configType = '',
          orderRefundDetailName = '',
          orderIncomeDetailName = '';

      switch(type){
        case 'MyOrder':
          orderRefundDetailName = 'DistributionTicketMyOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTicketMyOrderIncomeDetail';
          configType = 19;
          break;
        case 'PurchaseOrder':
          orderRefundDetailName = 'DistributionTicketPurchaseOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTicketPurchaseOrderIncomeDetail';
          configType = 19;
          break;
        case 'SingleOrder':
          orderRefundDetailName = 'DistributionTicketSingleOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTicketSingleOrderIncomeDetail';
          configType = 6;
          break;
        case 'SelfSupportOrder':
          orderRefundDetailName = 'TicketSelfSupportOrderRefundDetail';
          orderIncomeDetailName = 'TicketSelfSupportOrderIncomeDetail';
          configType = 12;
          break;
        case 'financeRefund':
          orderRefundDetailName = 'financeHotelMyOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTrainMyOrderIncomeDetail';
          configType = 19;
          break;
      }
      return {
        orderRefundDetailName,
        orderIncomeDetailName,
        configType
      }
    },
    getOrderDetailFun(){
      let type = this.orderType,
          fun = null;

      switch(type){
        case 'MyOrder':
          fun = getTicketMyOrderDetail;
          break;
        case 'SingleOrder':
          fun = getTicketSingleOrderDetail;
          break;
        case 'SelfSupportOrder':
          fun = getTicketSelfSupportOrderDetail;
          break;
        case 'FinanceOrder':
          fun = getTicketMyOrderDetail;
          break;
      }
      return fun
    },
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    saveOrderGatheringFunc() {
      switch (this.topMenuConst) {
      case 'finance':
        return financeSaveOrderGathering;
      case 'operator':
        return saveTeamOrderGathering;
      // case 'store-sale':
      case 'distribution':
      case 'sale':
        return saveSaleOrderGathering;
      }
    },
    totalPrice(){
      let orderPriceDetail = this.detailInfo.order_price_detail,
          total = 0;
      orderPriceDetail.map(i => {
        total += i.rmb_total_amount
      })
      return format.toFixed(total,2);
    }
  },
  components:{
    AddShoukuanDialog,
    OnlinePay,
    ChangeOrderOperator
  },
  methods:{
    getTicketOrderDetailsHandler(){
      let params = {
        data: {
          order_id: this.$route.query.order_id
        }
      };
      this.getOrderDetailFun({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];

          if(!code){
            this.detailInfo = data;
            this.orderNo = data.order_info.order_id;
            this.getCountDown(this.detailInfo.order_info.clear_time);
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    addLinePriceDetail(){
      let order = {};
      order.isadd = 1;
      order.item_name = '';
      order.rmb_unit_price = '';
      order.price_type = 1;
      order.unit_price = '';
      order.num = '';
      order.rmb_total_amount = '';
      order.remark = '';
      this.detailInfo.order_price_detail.push(order);
    },
    saveLinePriceDetail(idx){
      let order = this.detailInfo.order_price_detail[idx];
      let params = {};
      params.data = {};
      params.data.order_id = this.$route.query.order_id;
      params.data.item_name = order.item_name;
      params.data.price = order.price_type * order.unit_price;
      params.data.num = order.num;
      params.data.rmb_total_amount = order.num * params.data.unit_price;
      params.data.remark = order.remark;

      setTicketModifyPrice({
        params: params,
        success: (params) => {
          let { code, msg, data} = params['data'];

          if(!code){
            this.refundVisible = false;
            this.$message.success(msg);
            this.getTicketOrderDetailsHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    delLinePriceDetail(idx){
      this.detailInfo.order_price_detail.splice(idx,1);
    },
    setRefundTicketHandler(order){
      this.refundVisible = true;
      this.refundData.order_id = order.order_id;
      this.refundData.refund_max_num = order.can_refund_num;
    },
    requestRefundTicketHandler(){
      let params = {
        data: {
          order_id: this.refundData.order_id,
          refund_num: this.refundData.refund_num
        }
      };
      refundTicket({
        params: params,
        success: (params) => {
          let { code, msg, data } = params['data'];

          if(!code){
            this.refundVisible = false;
            this.$message.success(msg);
            this.getTicketOrderDetailsHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    refundDialogCloseHandler(){
      this.$refs['refundForm'].resetFields();
    },
    setContactTicketHandler(order){
      this.contactVisible = true;
      this.contactData.order_id = order.order_id;
    },
    requestChangeTicketContact(){
      let params = {
        data: {
          order_id: this.contactData.order_id,
          mobile: this.contactData.mobile
        }
      };
      changeTicketContact({
        params: params,
        success: (params) => {
          let { code, msg } = params['data'];

          if(!code){
            this.contactVisible = false;
            this.$message.success(msg);
            this.contactDialogCloseHandler();
            this.getTicketOrderDetailsHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    contactDialogCloseHandler(){
      this.$refs['contactForm'].resetFields();
    },
    currentChange(page){
      if(this.page_index != page){
        this.page_index = page;
        this.requestUrlChange();
      }
    },
    // 添加收款
    handleSaveShoukuan(data) {
      let para = {};

      para.data = { ...data };
      para.data.id = this.detailInfo.bill_id;
      para.data.order_no = this.$route.query.order_id;
      para.data.is_single = 1;
      para.data.tuan_id = '';
      para.data.user_collection_type = Number(para.data.user_collection_type);
      para.data.payment_date = data.payment_date ? format.date(data.payment_date) : '';
      para.data.attachment = data.attachment.map(item => item.id).join(',');

      this.saveOrderGatheringFunc({
        params: para,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.addShoukuanVisible = false;
            this.getTicketOrderDetailsHandler();
          }
        },
        showLoading: true
      });
    },
    // 取消订单
    requestCancelTicketOrderHandler(){
      let params = {
        data: {
          order_id: this.$route.query.order_id,
        }
      };
      cancelTicketOrder({
        params: params,
        success: (params) => {
          let { code, msg, data } = params['data'];

          if(!code){
            this.$message.success(msg);
            this.getTicketOrderDetailsHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 确认订单
    toDoConfirmOrderHandler(action){
      let params = {
        data: {
          order_id: this.$route.query.order_id,
          type : action
        }
      }
      setTicketComfirmOrder({
        params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.$message.success(msg);
            this.confirmOrderVisible = false;
            this.getTicketOrderDetailsHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    requestConfirmTicketOrderHandler(){
      this.confirmOrderVisible = true;
    },
    // 验证门票
    requestVerificationTicketOrderHandler(){
      let params = {
        data: {
          order_id: this.$route.query.order_id,
        }
      };
      setTicketVerification({
        params: params,
        success: (params) => {
          let { code, msg, data } = params['data'];

          if(!code){
            this.$message.success(msg);
            this.getTicketOrderDetailsHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 在线支付
    handleOnlinePay(){
      this.$refs.onlinePay.pay();
    },
    // 订单责任人
    handleChangeOrderOperator(){
      this.$refs.operator.changeOrderOperator(this.detailInfo.order_info.order_id);
    },
    getCountDown(timestamp){
      let that = this;
      that.isIntervalFlag = setInterval(function(){
          var nowTime = new Date();
          var endTime = new Date(timestamp * 1000);

          var t = endTime - nowTime.getTime();
          var min=Math.floor(t/1000/60%60);
          var sec=Math.floor(t/1000%60);

          if(min<=0 && sec<=0){
            min = 0;
            sec = 0;
            clearInterval(that.isIntervalFlag);
            // that.getTicketOrderDetailsHandler();
          }
          if (min < 10) {
                min = "0" + min;
          }
          if (sec < 10) {
                sec = "0" + sec;
          }
          var countDownTime = min + ":" + sec;
          that.$set(that,'endOrderTime',countDownTime);
      
      },1000);
    }
  },
  mounted(){
    this.getTicketOrderDetailsHandler();
  }
}
</script>

<style lang="less" scoped>
.tickets-order-detail{
  background-color: #fff;
  padding: 20px;

  .panel{
    margin-bottom: 20px;
    > .hd{
      h2{
        font-size: 18px;
        border-left: 5px solid #aa177a;
        padding-left: 15px;
        line-height: 20px;
      }
    }
    > .bd{
      padding: 10px 0;

      .gr{
        color: #45bb33;
      }

      .rd{
        color: #ff0d0d;
      }

      .og{
        color: #f60;
      }

      .wt{
        color: #999;
      }
    }
    .info-list{
      span{
        display: inline-block;
        margin: 0 20px 10px 0;
      }
      i{
        font-style: normal;
        color: #999;
      }
    }
  }
  .tips{
    text-align: right;
    color: #f00;
    padding-bottom: 10px;
  }
}

.table-custom{
  width: 100%;
	border-collapse:collapse;
	text-align: center;
	th{
    height: 40px;
    background: #f4f4f4;
    color: #999;
    font-weight: 400;
    text-align: center;
    border:1px solid #ccc;
  }
  td{
    border:1px solid #ccc;
    padding: 10px 5px;
  }
	.el-button.el-button--primary a{
		color: #fff;
  }
  .el-input{
    width: 80px;
  }
}
.popover-text{
  color: #0066FF;
  cursor: pointer;
}
.popover-table{
  table{
    width: 100%;
  }
  th,td{
    border:1px solid #ddd;
    padding: 10px 8px;
    text-align: left;
  }
  th{
    width: 100px;
    background-color: #f4f4f4;
  }
}
.refund-footer{
    text-align: center;
  }
  .refund-cont{
    text-align: center;

    p{
      margin-bottom: 15px;
    }
  }
</style>
