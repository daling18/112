// src\components\distribution\VisaOrderDetail.vue
<template>
  <div class="details">
    <div class="system-tab">
      <ul class="tab-box" v-if="orderInfo.have_refund == 1">
        <router-link class="on" to="" tag="li">
          订单详情
        </router-link>
        <router-link v-if="refundDetailPerm" :to="{ path: refundDetailUrl, query: {order_id: orderInfo.order_id}}" tag="li">
          退款详情
        </router-link>
      </ul>
    </div>
    <div v-if="orderDetailData" class="content">
      <div class="panel">
        <div class="hd">
          <h2>订单信息</h2>
          <span><span>支付渠道：{{orderInfo.pay_channel_code}}</span><span>第三方流水号：{{orderInfo.channel_req_no}}</span></span>
        </div>
        <div class="bd">
          <div class="neck-txt clearfix">
            <div class="fl">{{ isSelfSupport ? '单项订单' : '自营订单' }}： {{ orderInfo.relation_order_no }}</div>
            <div class="fr" v-if="countdownStr != '00:00'">请在 <span class="color-orange">{{ countdownStr }}</span> 分钟内支付订单，未准时支付，订单会自动关闭</div>
          </div>
          <el-table :data="orderInfoList" border tooltip-effect="light">
            <el-table-column align="center" prop="order_id" width="170" label="订单编号" />
            <el-table-column align="center" prop="create_time" width="95" label="下单时间" />
            <el-table-column align="center" prop="pay_type_name" width="100px" label="支付方式" />
            <el-table-column align="center" width="120px" label="出游人数">
              <template slot-scope="scope">
                {{ scope.row | getTouristNum }}
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="right"
              min-width="80"
              label="订单金额"
            >
              <template slot-scope="scope">
                <p class="color-orange">
                  {{ scope.row.total_price }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="right"
              min-width="80"
              label="已收金额"
              prop="rmb_receipted_amount"
            />
            <el-table-column
              header-align="center"
              align="right"
              min-width="80"
              label="未收金额"
            >
              <template slot-scope="scope">
                <template v-if="scope.row.order_status == 6">--</template>
                <template v-else>{{ scope.row.rmb_unreceipted_amount }}</template>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              header-align="center"
              label="结算方"
              min-width="140"
              prop="distributor_name"
              show-overflow-tooltip
            />
            <el-table-column align="center" prop="order_status_name" width="80px" label="订单状态" />
            <el-table-column
              v-if="isSinglepro"
              label="订单负责人"
              align="left"
              header-align="center"
              min-width="100"
              :resizable="false"
              prop="op_name"
              show-overflow-tooltip
            />
            <el-table-column align="center" label="操作" width="120">
              <template slot-scope="scope">
                <template v-if="showOrderOperate(scope.row.edit).length > 0">
                  <el-dropdown v-if="showOrderOperate(scope.row.edit).length > 3" trigger="click" @command="handleOrderOperate">
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-caret-bottom el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <template v-for="(edit, i) in scope.row.edit">
                        <el-dropdown-item
                          v-if="isShowOrderOperate(edit, scope.row)"
                          :key="i"
                          :command="edit"
                        >
                          {{ ORDER_EDIT_MAP[edit] }}
                        </el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <template v-else v-for="(edit,i) in scope.row.edit">
                    <span class="span-btn" :key="i" v-if="isShowOrderOperate(edit)" @click="handleOrderOperate(edit)">
                      {{ ORDER_EDIT_MAP[edit] }}
                    </span>
                  </template>
                </template>
                <template v-else>--</template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel" v-if="orderDetailData.visa_info">
        <div class="hd">
          <h2>产品信息</h2>
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data="visaInfoList">
            <el-table-column label="签证名称" align="center">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.visa_name">
                  {{ scope.row.visa_name }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="出发日期" prop="departure_date" width="100" align="center" />
            <el-table-column label="成人结算价" prop="adult_peer_price" align="right" header-align="center" />
            <el-table-column label="成人销售价" prop="adult_out_price" align="right" header-align="center" />
            <!-- <el-table-column label="儿童结算价" prop="child_peer_price" align="right" header-align="center" />
            <el-table-column label="儿童销售价" prop="child_out_price" align="right" header-align="center" /> -->
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>订单价格明细</h2>
        </div>
        <div class="neck-txt">
          <span>结算币种 / 汇率：{{ orderDetailData.currency + ' / ' + orderDetailData.currency_rate }}</span>
          <span class="ml15">结算总金额：
            <i>{{ settlementAmount | formatPrice }}</i>
          </span>
          <span class="ml15">本位币：
            <i>{{ rmbSettlementAmount | formatPrice }}</i>
          </span>
          <!-- <el-button class="op-btn" v-if="operatorPriceDetailAddPerm && canAddOrderDetail" type="primary" @click="handleAddPriceItem('show')">
            + 新增项目
          </el-button> -->
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data="orderDetailData.price_detail">
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column label="项目" align="center" prop="item_name">
              <template slot-scope="scope">
                <div class="ellipsis" v-if="scope.row.approval_status_name" :title="'(' + scope.row.approval_status_name + ')' + scope.row.item_name">
                  <span :class="scope.row.approval_status | getStatusColor">({{ scope.row.approval_status_name }})</span>
                  {{ scope.row.item_name }}
                </div>
                <div class="ellipsis" :title="scope.row.item_name" v-else>{{ scope.row.item_name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="单价（本位币）" width="120" header-align="center" align="right">
              <template slot-scope="scope">
                <span v-if="scope.row.operator == '-' && scope.row.rmb_unit_price">-</span>{{ scope.row.rmb_unit_price | formatPrice }}
              </template>
            </el-table-column>
            <el-table-column label="结算单价" width="150" header-align="center" align="right">
              <template slot-scope="scope">
                <span v-if="scope.row.operator == '-' && scope.row.unit_price">-</span>{{ scope.row.unit_price | formatPrice }}
              </template>
            </el-table-column>
            <el-table-column label="数量" width="70" align="center" prop="num" />
            <el-table-column label="结算金额小计" width="120" header-align="center" align="right">
              <template slot-scope="scope">
                <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.total_amount | formatPrice }}
              </template>
            </el-table-column>
            <el-table-column label="小计（本位币）" width="120" header-align="center" align="right">
              <template slot-scope="scope">
                <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.rmb_total_amount | formatPrice }}
              </template>
            </el-table-column>
            <el-table-column label="说明" align="center">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.remark">{{ scope.row.remark }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>游客信息</h2>
        </div>
        <div class="bd">
          <el-table :data="orderDetailData.tourist_info" border style="width: 100%">
            <el-table-column align="center" label="中文姓名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文姓名">
              <template slot-scope="scope">
                {{ scope.row | getEnglishName }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机">
              <template slot-scope="scope">
                {{ scope.row.mobile || '--' }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="tourist_type_name" width="90px" label="游客类型" />
            <el-table-column align="center" label="证件类型/号码">
              <template slot-scope="scope">
                <p class="ellipsis" v-if="scope.row.id_no" :title="scope.row | getIdentityInfo">
                  {{ scope.row | getIdentityInfo }}
                </p>
                <template v-else>--</template>
              </template>
            </el-table-column>
            <el-table-column align="center" width="100px" label="证件有效期">
              <template slot-scope="scope">
                {{ scope.row.id_end_date || '--' }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="nation" label="国籍">
              <template slot-scope="scope">
                {{ scope.row.nation || '--' }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="gender_name" width="60" label="性别" />
          </el-table>
        </div>
      </div>
      <div class="panel" v-if="contactInfoList">
        <div class="hd">
          <h2>联系人</h2>
        </div>
        <div class="bd">
          <el-table border :data="contactInfoList">
            <el-table-column label="姓名" prop="name" min-width="200" align="center" />
            <el-table-column label="手机号码" prop="mobile" min-width="80" align="center" />
            <el-table-column label="邮箱" prop="email" min-width="400" align="center" />
          </el-table>
        </div>
      </div>
      <div class="panel" v-if="postInfoList">
        <div class="hd">
          <h2>邮寄地址</h2>
        </div>
        <div class="bd">
          <el-table border :data="postInfoList">
            <el-table-column label="联系人" prop="name" min-width="200" align="center" />
            <el-table-column label="手机号" prop="mobile" min-width="80" align="center" />
            <el-table-column label="地址" prop="address" min-width="400" align="center" />
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>订单记录</h2>
        </div>
        <div class="bd">
          <el-table style="width: 100%" :data="orderDetailData.order_log" border tooltip-effect="light">
            <el-table-column label="时间" prop="create_time" width="170" align="center" />
            <el-table-column
              label="操作说明"
              min-width="120"
              align="center"
              prop="op_type"
              show-overflow-tooltip
            />
            <el-table-column label="订单状态" prop="order_status" align="center" width="100" />
            <el-table-column
              label="操作人"
              min-width="120"
              align="center"
              prop="op_user_name"
              show-overflow-tooltip
            />
          </el-table>
        </div>
      </div>
      <!-- <div v-if="canAddOrderDetail" class="submit-buttons">
        <el-button type="primary" size="large" @click="handleSubmitForm">保 存</el-button>
        <el-button size="large" @click="handleGoBack">取 消</el-button>
      </div> -->
    </div>
    <add-shoukuan-dialog :visible.sync="addShoukuanVisible" @submit="handleSaveShoukuan" @close="addShoukuanVisible=false" />
    <!-- 在线支付form -->
    <online-pay
      ref="onlinePay"
      v-if="loadOnlinePay"
      :order-id="orderInfo.order_id"
      order-resource="4"
    />
    <change-order-operator
      v-if="isSinglepro"
      ref="operator"
      order-type="7"
      @change-success="$router.go(-1)"
    />
    <el-dialog
      title="操作提示"
      :visible.sync="confirmOrderVisible"
      size="tiny">
      <div style="font-size: 18px">确定该订单有效？</div>
      确认无效后，订单会被取消自动退款给买家，请慎重操作
      <div slot="footer">
        <el-button type="primary" @click="handleConfirmOrder('valid')">确认有效</el-button>
        <el-button @click="handleConfirmOrder('invalid')">确认无效</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="出签确认"
      :visible.sync="outVisaVisible"
      size="tiny">
      确定出签成功？
      <div slot="footer">
        <el-button type="primary" @click="handleOut('success')">出签成功</el-button>
        <el-button @click="handleOut('deny')">已被拒签</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderDetail,
  opOrderDetail,
  cancelOrder,
  confirmOrder,
  orderInvalid,
  send,
  out,
  refund
} from 'src/api/selfsupport.visa';
import {
  getOrderOperations
} from 'src/api/order';

import {
  saveSaleOrderGathering,
  saveTeamOrderGathering,
  financeSaveOrderGathering
} from 'src/api/api';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import { date, formatPrice } from 'src/utils/format';
import InputNumber from 'src/plugins/InputNumber.vue';
import WorldSelect from 'src/plugins/WorldSelect.vue';
import AddShoukuanDialog from './components/AddShoukuanDialog.vue';
import OnlinePay from './components/OnlinePay.vue';
import ChangeOrderOperator from 'src/plugins/ChangeOrderOperator.vue';

export default {
  components: {
    InputNumber,
    CurrencyPicker,
    WorldSelect,
    AddShoukuanDialog,
    OnlinePay,
    ChangeOrderOperator
  },
  filters: {
    formatPrice: formatPrice,
    getStatusColor(status){
      switch(status) {
      case 3: 
        return 'color-red';
      case 2:
        return 'color-green';
      case 1:
      default:
        return 'color-gray';
      }
    },
    getEnglishName(data){
      let name = [];
      if(data.first_name){
        name.push(data.first_name);
      }
      if(data.last_name){
        name.push(data.last_name);
      }

      return name.length > 0 ? name.join(' ') : '--';
    },
    getIdentityInfo(data){
      if(data.id_no){
        return [data.id_type_name, data.id_no].join('/');
      }else{
        return '--';
      }
    },
    getTouristNum(data){
      let name = [];

      if(data.adult_num){
        name.push(data.adult_num);
        name.push('成人');
      }
      if(data.child_num){
        name.push(data.child_num);
        name.push('儿童');
      }

      return name.length > 0 ? name.join('') : '--';
    }
  },
  data() {
    return {
      ORDER_EDIT_MAP: ['', '取消订单', '签约', '确认', '申请退团', '添加收款', '查看收入', '确认位置'],
      MATERIAL_EDIT_MAP: ['', '下载电子合同', '查看纸质合同', '下载确认件', '下达出团通知书', '下载出团通知书', '下载签证材料', '签证材料详情', '备注', '上传签证材料', '补充签证材料', '申请开票', '查看开票详情', '生成合同'],
      CANCEL_STATUS_MAP: ['', '[退团中]', '[退团中]', '[已退团]'],

      ORG_TYPE: localStorage.getItem('orgtype'),
      orderInfo: {},
      orderInfoList: [],
      countdownStr: '00:00',
      visaInfoList: [],
      settlementAmount: 0,
      rmbSettlementAmount: 0,
      orderDetailData: null,
      contactInfoList: null,
      postInfoList: null,
      addShoukuanVisible: false,
      confirmOrderVisible: false,
      outVisaVisible: false,
      userList: [],
      loadUserList: false
    };
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isSelfSupport() {
      return this.$route.name == 'SingleproSelfSupportVisaOrderDetail';
    },
    isSinglepro() {
      // 是否从单项产品跳转过来的
      return this.topMenuConst == 'singlepro';
    },
    isStore() {
      return this.ORG_TYPE == '5';
    },
    isCancelOrder() {
      return this.orderInfo.order_status == 6; // 是否已取消订单
    },
    dataConfigType() {
      switch (this.topMenuConst) {
      case 'saleorder':
        return 22;
      case 'settlement':
        return 15;
      case 'singlepro':
        if (this.isSelfSupport) {
          return 15;
        } else {
          return 9;
        }
      default:
        return null;
      }
    },
    loadOnlinePay() {
      const ONLINE_PAY_EDIT_CODE = 5; // 在线支付对应的edit值

      return Array.isArray(this.orderInfo.edit)
              && this.orderInfo.edit.indexOf(ONLINE_PAY_EDIT_CODE) !== -1
              && this.isShowOrderOperate(ONLINE_PAY_EDIT_CODE);
    },
    totalOutPrice() { // 使用于同行订单
      const { adult_num, child_num } = this.orderInfo;
      const visaInfo = (this.orderDetailData && this.orderDetailData.visa_info) || {};
      const { adult_out_price, child_out_price } = visaInfo;

      return formatPrice(adult_num * adult_out_price + child_num * child_out_price)
    },
    cancelOrderPerm() {
      switch (this.topMenuConst) {
      case 'saleorder':
        return this.$menuPermission('saleorder/visaorder/cancelorder');
      case 'singlepro':
        if (this.isSelfSupport) {
          return false;
          // this.$menuPermission('api/selfsupport.visaorder/cancel_order');
        } else {
          return this.$menuPermission('singlepro/singleorder/visaorder/cancelorder');
        }
      default:
        return false;
      }
    },
    cancelOrderFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return saleCancelOrder;
      case 'saleorder':
      case 'singlepro':
        return cancelOrder;
      default:
        return this.emptyFunc(this.topMenuConst + ' not cancelOrder')
      }
    },
    confirmOrderPerm() {
      switch (this.topMenuConst) {
      case 'singlepro':
        if (this.isSelfSupport) {
          return this.$menuPermission('singlepro/selforder/visaorder/conforder');
        } else {
          return false;
        }
      default:
        return false;
      }
    },
    confirmOrderFunc() {
      switch (this.topMenuConst) {
      case 'singlepro':
        return confirmOrder;
      default:
        return this.emptyFunc(this.topMenuConst + ' not confirmOrder')
      }
    },
    orderInvalidFunc() {
      switch (this.topMenuConst) {
      case 'singlepro':
        return orderInvalid;
      default:
        return this.emptyFunc(this.topMenuConst + ' not orderInvalid')
      }
    },
    sendPerm() {
      switch (this.topMenuConst) {
      case 'singlepro':
        if (this.isSelfSupport) {
          return this.$menuPermission('singlepro/selforder/visaorder/send');
        } else {
          return false;
        }
        // return this.$menuPermission('api/selfsupport.visaorder/send');
      default:
        return false;
      }
    },
    sendFunc() {
      switch (this.topMenuConst) {
      case 'singlepro':
        return send;
      default:
        return this.emptyFunc(this.topMenuConst + ' not send')
      }
    },
    outPerm() {
      switch (this.topMenuConst) {
      case 'singlepro':
        if (this.isSelfSupport) {
          return this.$menuPermission('singlepro/selforder/visaorder/out');
        } else {
          return false;
        }
        // return this.$menuPermission('api/selfsupport.visaorder/out');
      default:
        return false;
      }
    },
    outFunc() {
      switch (this.topMenuConst) {
      case 'singlepro':
        return out;
      default:
        return this.emptyFunc(this.topMenuConst + ' not out')
      }
    },
    refundPerm() {
      switch (this.topMenuConst) {
      case 'saleorder':
        return this.$menuPermission('saleorder/visaorder/aplrefund');
      case 'singlepro':
        if (this.isSelfSupport) {
          return false;
        } else {
          return this.$menuPermission('singlepro/singleorder/visaorder/aprefund');
        }
        // return this.$menuPermission('api/selfsupport.visaorder/refund');
      default:
        return false;
      }
    },
    refundFunc() {
      switch (this.topMenuConst) {
      case 'saleorder':
      case 'singlepro':
        return refund;
      default:
        return this.emptyFunc(this.topMenuConst + ' not refund')
      }
    },
    onlinePayPerm() {
      switch (this.topMenuConst) {
      case 'saleorder':
        return this.$menuPermission('saleorder/visaorder/onlinepay');
      case 'singlepro':
        if (this.isSelfSupport) {
          return false;
        } else {
          return this.$menuPermission('singlepro/singleorder/visaorder/onlinepay');
        }
        // return this.$menuPermission('api/selfsupport.visaorder/refund');
      default:
        return false;
      }
    },
    setOrderOperationPerm() {
      switch (this.topMenuConst) {
      case 'singlepro':
        if (this.isSelfSupport) {
          return this.$menuPermission('singlepro/selforder/visaorder/orderprin');
        } else {
          return this.$menuPermission('singlepro/singleorder/visaorder/orderprin');
        }
        // return this.$menuPermission('api/order/set_order_operation');
      default:
        return false;
      }
    },
    refundDetailPerm() {
      switch (this.topMenuConst) {
      case 'saleorder':
        return this.$menuPermission('saleorder/visaorder/refunddet');
      case 'singlepro':
        if (this.isSelfSupport) {
          return this.$menuPermission('singlepro/selforder/visaorder/refunddet');
        } else {
          return this.$menuPermission('singlepro/singleorder/visaorder/refunddet');
        }
      // case 'finance':
      //   return this.$menuPermission('api/selfsupport.visaorder/refund_detail');
      }
      return false;
    },
    refundDetailUrl() {
      let urlPrefix = '';

      switch (this.topMenuConst) {
      case 'saleorder':
      case 'singlepro':
        return 'refund';
      }
    },
    getOrderDetailFunc() {
      switch (this.topMenuConst) {
      case 'saleorder':
        return orderDetail;
      case 'singlepro':
      case 'settlement':
        return opOrderDetail;
      case 'finance':
        return orderDetail;
      default:
      }
    },
    saveOrderGatheringPerm() {
      // 统一有结算中心的添加收款控制
      return 'settlement/recpay/recei/addrecei';
      // switch (this.topMenuConst) {
      // case 'saleorder':
      //   return false;
      // case 'singlepro':
      //   if (this.isSelfSupport) {
      //     return this.$menuPermission('singlepro/singleorder/visaorder/addrece');
      //   } else {
      //     return false;
      //   }
      //   // return this.$menuPermission('api/tuan/save_team_order_gathering');
      // case 'finance':
      //   return this.$menuPermission('api/tuan/finance_save_order_gathering');
      // // case 'store-sale':
      // default:
      //   return false;
      // }
    },
    saveOrderGatheringFunc() {
      // 统一有结算中心的添加收款控制
      return financeSaveOrderGathering;
      // switch (this.topMenuConst) {
      // case 'saleorder':
      //   return saveSaleOrderGathering;
      // case 'singlepro':
      //   return saveTeamOrderGathering;
      // case 'finance':
      //   return financeSaveOrderGathering;
      // // case 'store-sale':
      // default:
      //   return this.emptyFunc(this.topMenuConst + ' not saveOrderGatheringFunc');
      // }
    },
    incomeInfoPerm() {
      switch (this.topMenuConst) {
      case 'saleorder':
        // 使用 结算中心-查看团队账单-查看收入  20190115
        return this.$menuPermission('saleorder/visaorder/getincodet');
      case 'singlepro':
        if (this.isSelfSupport) {
          return this.$menuPermission('singlepro/selforder/visaorder/getincodet');
        } else {
          return this.$menuPermission('singlepro/singleorder/visaorder/getincodet');
        }
      // case 'finance':
      //   return this.$menuPermission('api/tuan/fin_income_info');
      default:
        return false;
      }
    }
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    emptyFunc(msg){
      return function() {
        console.log(msg + ' arguments: ', arguments);
      }
    },
    startCountdown() {
      const { timeoutTime } = this.orderInfo;
      const time = timeoutTime - Date.now();
      const countdown = [parseInt(time / 60000), parseInt(time % 60000 / 1000)];

      // console.log('time: ', timeoutTime, time, countdown);
      this.countdownStr = countdown.map(num =>{
        if(!num || num <= 0){
          return '00';
        }else{
          return num < 10 ? ('0' + num) : num;
        }
      }).join(':');
      if(this.countdownStr != '00:00'){
        setTimeout(()=>{
          // console.log('time out');
          this.startCountdown();
        }, 1000);
      } else if (this.orderInfo.remain_time > 0) {
        this.getOrderDetail();
      }
    },
    getOrderDetail() {
      const { order_id } = this.$route.query;
      let params = {
        data: {
          order_id: order_id,
          data_config_type: this.dataConfigType
        }
      };

      this.getOrderDetailFunc({
        params: params,
        success: params => {
          let { code, data, msg } = params['data'];
          if (code == 0) {
            if (!data) {
              return this.$message.error('返回数据异常');
            }
            
            this.orderInfo = data.order_info || {};
            this.orderInfoList = [ this.orderInfo ];
            this.ORDER_EDIT_MAP = this.orderInfo.edit_list || {};
            // this.orderInfo.remain_time = 100;
            if(this.orderInfo.remain_time > 0 && this.orderInfo.order_status == 1) {
              this.orderInfo.timeoutTime = Date.now() + this.orderInfo.remain_time * 1000;
              this.startCountdown();
            }

            this.visaInfoList = [data.visa_info];
            if(this.orderInfo.contact_name){
              this.contactInfoList = [{
                name: this.orderInfo.contact_name || '--',
                mobile: this.orderInfo.contact_mobile || '--',
                email: this.orderInfo.contact_email || '--'
              }];
            }
            
            const addressArr = [
              this.orderInfo.post_province_name,
              this.orderInfo.post_city_name,
              this.orderInfo.post_district_name,
              this.orderInfo.post_address
            ];
            this.postInfoList = [{
              name: this.orderInfo.post_contact_name || '--',
              mobile: this.orderInfo.post_contact_mobile || '--',
              address: addressArr.filter(it=>!!it).join(' ') || '--'
            }];

            if (Array.isArray(data.price_detail)) {
              // 生成operator字段
              data.price_detail = data.price_detail.filter(item => {
                // const isCancelOrderRecord = item.item_name == '取消订单';

                // if(isCancelOrderRecord){
                //   this.cancelOrderRecord = item;
                //   return false;
                // }
                // 处理operator为 - 的记录返回的负数，转成正数，因为页面都是使用正数进行计算
                if (item.unit_price < 0) {
                  item.unit_price = Math.abs(item.unit_price);
                  item.total_amount = Math.abs(item.total_amount);
                  item.rmb_unit_price = Math.abs(item.rmb_unit_price);
                  item.rmb_total_amount = Math.abs(item.rmb_total_amount);
                  item.operator = '-';
                } else {
                  item.operator = '+';
                }
                return true;
              });
            }

            // console.log(this.orderDetailData)
            this.settlementAmount = data.all_total_amount;
            this.rmbSettlementAmount = data.all_rmb_total_amount;

            // this.materialInfo = data.material_info || {};
            // this.bzTxt = this.materialInfo.edit_data.visa_remark;
            // this.MATERIAL_EDIT_MAP = this.materialInfo.edit_list || {};

            this.orderDetailData = data;
          } else {
            this.$message.error(msg);
            // this.$router.go(-1);
          }
        },
        showLoading: true
      });
    },
    isShowOrderOperate(edit, order) {
      switch (edit) {
      case 1:  // '取消订单'
        return this.cancelOrderPerm;
      case 2:   // '添加收款'
        return this.saveOrderGatheringPerm;;
      case 3:   // '查看收入'
        return this.incomeInfoPerm;
      case 4:   // '申请退款', 
        return this.refundPerm;
      case 5:   // '在线支付', 
        return this.onlinePayPerm;
      case 6:   // '确认订单', 
        return this.confirmOrderPerm;
      case 7:   // '送签确认', 
        return this.sendPerm;
      case 8:   // '出签确认', 
        return this.outPerm;
      case 9:   // '订单负责人', 
        return this.setOrderOperationPerm;
      default:
        return false;
      }
    },
    showOrderOperate(edit) {
      if (Array.isArray(edit)) {
        return edit.filter(e => this.isShowOrderOperate(e))
      } else {
        return []
      }
    },
    cancelOrderSubmit() {
      const order_id = this.orderInfo.order_id;
      
      this.cancelOrderFunc({
        params: { data: { order_id } },
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.getOrderDetail();
          }
        },
        showLoading: true
      });
    },
    // 取消订单操作弹窗
    handleCancelOrder() {
      this.$confirm('确定取消该订单？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelOrderSubmit();
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },
    handleSaveShoukuan(data) {
      let para = {};

      para.data = { ...data };
      para.data.id = this.orderInfo.id;
      para.data.order_no = this.orderInfo.order_id;
      para.data.is_single = 1;
      para.data.tuan_id = '';
      para.data.user_collection_type = Number(para.data.user_collection_type);
      para.data.payment_date = data.payment_date ? date(data.payment_date) : '';
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
            this.getOrderDetail();
          }
        },
        showLoading: true
      });
    },
    // 确认订单操作弹窗
    handleConfirmOrder(type) {
      const order_id = this.orderInfo.order_id;
     
      switch(type) {
      case 'show':
        this.confirmOrderVisible = true;
        break;
      case 'valid': 
        this.confirmOrderFunc({
          params: { data: { order_id } },
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.confirmOrderVisible = false
              this.getOrderDetail();
            }
          },
          showLoading: true
        });
        break;
      case 'invalid':
        this.orderInvalidFunc({
          params: { data: { order_id } },
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.confirmOrderVisible = false
              this.getOrderDetail();
            }
          },
          showLoading: true
        });  
        break;
      default:
        this.confirmOrderVisible = false
      }
    },
    // 送签确认操作弹窗
    handleSend() {
      this.$confirm('确定进行送签操作？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const order_id = this.orderInfo.order_id;
      
        this.sendFunc({
          params: { data: { order_id } },
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.getOrderDetail();
            }
          },
          showLoading: true
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },
    // 出签确认操作弹窗
    handleOut(type) {
      const order_id = this.orderInfo.order_id;

      switch (type) {
      case 'show':
        this.outVisaVisible = true;
        break;
      case 'success':
        this.outFunc({
          params: { data: { order_id, option: 1 } },
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.getOrderDetail();
              this.outVisaVisible = false;
            }
          },
          showLoading: true
        });
        break;
      case 'deny':
        this.outFunc({
          params: { data: { order_id, option: 2 } },
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.getOrderDetail();
              this.outVisaVisible = false;
            }
          },
          showLoading: true
        });
        break;
      default:
        this.outVisaVisible = false;
      }
    },
    // 申请退款操作弹窗
    handleRefund() {
      this.$confirm('确定申请退款？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const order_id = this.orderInfo.order_id;
      
        this.refundFunc({
          params: { data: { order_id } },
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              if(this.refundDetailPerm){
                this.$router.push({path: this.refundDetailUrl, query: { order_id }});
              }else{
                this.getOrderDetail();
              }
            }
          },
          showLoading: true
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },
    handleOrderOperate(cmd) {
      switch (cmd) {
      case 1:  // '取消订单'
        this.handleCancelOrder();
        break;
      case 2:   // '添加收款'
        this.addShoukuanVisible = true;
        break;
      case 3:   // '查看收入'
        this.$router.push({
          path: 'income-detail',
          query: { bid: this.orderDetailData.bill_id, type: this.isSinglepro ? 9 : 22 }
        });
        break;
      case 4:   // '申请退团', 
        this.handleRefund();
        break;
      case 5:   // '在线支付', 
        if(this.$refs.onlinePay && this.$refs.onlinePay.pay()){
          OnlinePay.showFinishConfirm.call(this).then(()=>{
            this.getOrderDetail();
          }).catch((e)=>{
            console.log('cancel: ', e);
          })
        }
        break;
      case 6:   // '确认订单'
        this.handleConfirmOrder('show');
        break;
      case 7:   // '送签确认'
        this.handleSend();
        break;
      case 8:   // '出签确认'
        this.handleOut('show');
        break;
      case 9:   // '订单负责人', 
        this.$refs.operator.changeOrderOperator(this.orderInfo.order_id, this.orderInfo.op_id);
        break;
      default:
        return true;
      }
    }
  }
};
</script>


<style scoped lang="scss">
.content {
  padding: 20px;
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
  }
}
.neck-txt {
  margin: -10px 0 8px;
  .ml15{
    margin-left: 15px;
  }
}
.neck-txt i {
  font-style: normal;
  color: #f60;
}
.neck-txt .op-btn {
  float: right;
  margin-top: -5px;
}
.span-btn {
  display: inline-block;
  color: #b10c79;
  cursor: pointer;
  margin: 0 5px;
}

.edit-tourist-form{
  width: 90%;
  .el-form-item{
    margin-bottom: 13px;
  }
}
.dw100 {
  display: block;
  width: 100%;
}
</style>
