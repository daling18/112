<template>
  <div class="details">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">订单详情</li>
        <router-link
          v-if="is_have_refund === 1"
          :to="{path: urlPath, query: {order_id: order_id}}"
          tag='li'>退款详情</router-link>
      </ul>
    </div>
    <div class="content">
      <div class="panel">
        <div class="hd">
          <h2>订单信息</h2>
        </div>
        <div class="bd">
          <div class="neck-txt clearfix">
            <div class="fl">{{ isSelfSupport ? '单项订单' : '自营订单' }}： {{ ext_order_no }}</div>
            <div class="fr" v-if="countdownStr != '00:00'">请在 <span class="color-orange">{{ countdownStr }}</span> 分钟内支付订单，未准时支付，订单会自动关闭</div>
          </div>
          <el-table :data="order_info" border style="width: 100%">
            <el-table-column
              align="center"
              prop="order_id"
              width="170" 
              label="订单编号" 
            />
            <el-table-column 
              align="center" 
              prop="create_time" 
              width="95" 
              label="下单时间" 
            />
            <el-table-column 
              align="center" 
              prop="pay_type_name" 
              width="100px" 
              label="支付方式"
            >
            <template slot-scope="scope">
              <div>{{scope.row.pay_type === 1 ? '可下单金额' : '在线支付'}}</div>
            </template>
            </el-table-column>
            <el-table-column
              v-if="!isStore"
              header-align="center"
              align="right"
              min-width="80"
              label="订单金额"
            >
              <template slot-scope="scope">
                <p class="color-orange">
                  {{ scope.row.total_amount }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!isStore"
              header-align="center"
              align="right"
              prop="rmb_receipted_amount"
              min-width="80"
              label="已收金额"
            />
            <el-table-column
              v-if="!isStore"
              header-align="center"
              align="right"
              prop="rmb_no_receipted_amount"
              min-width="80"
              label="未收金额"
            >
            <template slot-scope="scope">
              <p v-if="scope.row.status_name === '已取消'">--</p>
              <p v-else>{{scope.row.rmb_no_receipted_amount}}</p>
            </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="isStore ? '供应商' : '结算方'"
              min-width="140">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="isStore ? scope.row.supplier_name : scope.row.distributor_name" placement="bottom">
                  <p class="ellipsis">
                    {{ isStore ? scope.row.supplier_name : scope.row.distributor_name }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              label='订单状态'
              prop='status_name'>
            </el-table-column>
            <el-table-column
              align='center'
              label='订单负责人'
              prop='op_name'
              min-width='100'>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.op_name" placement="bottom">
                  <p class="ellipsis">
                    {{ scope.row.op_name }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              fixed='right'
              align='center'
              label='操作'
              width='120px'>
              <template slot-scope="scope">
                <div v-if="rule_lists.length > 0">
                  <el-dropdown v-if="rule_lists.length > 3" trigger="click">
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, key) in rule_lists" :key="key">
                        <div
                          v-if="item === 1"
                          @click="confirmOrderVisible = true"
                          >
                          {{rule_lists_name[item]}}
                        </div>
                        <div
                          v-if="item === 2"
                          @click="productShippedConfirm"
                          >
                          {{rule_lists_name[item]}}
                        </div>
                        <div
                          v-if="item === 3"
                          @click="productReceiptConfirm"
                          >
                          {{rule_lists_name[item]}}
                        </div>
                        <div
                          v-if="item === 4"
                          @click="addShoukuanVisible = true"
                          >
                          {{rule_lists_name[item]}}
                        </div>
                        <div
                          v-if="item === 5"
                          >
                          <router-link :to='{path: "income-detail", query: {bid: scope.row.bill_id,  type: isOperator ? 10 : 23}}'>
                            {{rule_lists_name[item]}}
                          </router-link>
                        </div>
                        <div
                          v-if="item === 6"
                          @click="productRefund"
                          >
                          {{rule_lists_name[item]}}
                        </div>
                        <div
                          v-if="item === 8"
                          @click="productCancel"
                          >
                          {{rule_lists_name[item]}}
                        </div>
                        <div
                          v-if="item === 9 && loadOnlinePay"
                          @click="handleOnlinePay"
                          >
                          {{rule_lists_name[item]}}
                        </div>
                        <div
                          v-if="item === 10 && $menuPermission('api/order/set_order_operation')"
                          @click="handleChangeOrderOperator">
                          {{rule_lists_name[item]}}
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <div v-else>
                    <div v-for="(item, key) in rule_lists" :key="key">
                      <div
                        class="span-btn"
                        v-if="item === 1"
                        @click="confirmOrderVisible = true"
                        >
                        {{rule_lists_name[item]}}
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 2"
                        @click="productShippedConfirm"
                        >
                        {{rule_lists_name[item]}}
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 3"
                        @click="productReceiptConfirm"
                        >
                        {{rule_lists_name[item]}}
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 4"
                        @click="addShoukuanVisible = true"
                        >
                        {{rule_lists_name[item]}}
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 5"
                        >
                        <router-link :to='{path: "income-detail", query: {bid: scope.row.bill_id,  type: isOperator ? 10 : 23}}'>
                          {{rule_lists_name[item]}}
                        </router-link>
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 6"
                        @click="productRefund"
                        >
                        {{rule_lists_name[item]}}
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 8"
                        @click="productCancel"
                        >
                        {{rule_lists_name[item]}}
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 9 && loadOnlinePay"
                        @click="handleOnlinePay"
                        >
                        {{rule_lists_name[item]}}
                      </div>
                      <div
                        class="span-btn"
                        v-if="item === 10 && $menuPermission('api/order/set_order_operation')"
                        @click="handleChangeOrderOperator">
                        {{rule_lists_name[item]}}
                      </div>
                    </div>
                  </div>
                </div>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>产品信息</h2>
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data='product_info'>
            <el-table-column 
              label="商品货号/名称" 
              prop='art_no'
              header-align='center'
              min-width="200"
              align="left">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.product_name" placement="bottom">
                  <p class="ellipsis">
                    [{{scope.row.art_no}}]{{scope.row.product_name }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              header-align='center'
              align='right'
              width='100px'
              prop='peer_price'
              label='结算价'>
            </el-table-column>
            <el-table-column
              header-align='center'
              align='right'
              width='100px'
              prop='out_price'
              label='销售价'>
            </el-table-column>
            <el-table-column
              align='center'
              prop='size_name'
              label='规格'>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.size_name" placement="bottom">
                  <p class="ellipsis tc">
                    {{scope.row.size_name }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              align='center'
              prop='nums'
              label='购买数量'>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>订单价格明细</h2>
        </div>
        <div class="neck-txt">
          <span>结算币种 / 汇率：{{ order_price_detail.length > 0 ? (order_price_detail[0].currency + ' / ' + order_price_detail[0].currency_rate) : '' }}</span>
          <span>结算总金额：
            <i>{{ all_total_amount | formatPrice }}</i>
          </span>
          <span>本位币：
            <i>{{ all_rmb_total_amount | formatPrice }}</i>
          </span>
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data='order_price_detail'>
            <el-table-column
              label='序号'
              align='center'
              type="index"
              width="50" />
            <el-table-column 
              label="项目" 
              prop='item_name'
              min-width="200"
              align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.item_name" placement="bottom">
                  <p class="ellipsis tc">
                    {{scope.row.item_name }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column 
              label="单价（本位币)"
              header-align='center'
              prop='rmb_unit_price'
              width="130px"
              align="right">
            </el-table-column>
            <el-table-column 
              label="结算单价"
              header-align='center'
              prop='unit_price'
              width="100px"
              align="right">
            </el-table-column>
            <el-table-column 
              label="数量"
              prop='num'
              width="100px"
              align="center">
            </el-table-column>
            <el-table-column 
              label="结算金额小计"
              header-align='center'
              prop='total_amount'
              width="130px"
              align="right">
            </el-table-column>
            <el-table-column 
              label="小计（本位币)"
              header-align='center'
              prop='rmb_total_amount'
              width="130px"
              align="right">
            </el-table-column>
            <el-table-column 
              label="说明"
              prop='remark'
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>邮寄地址</h2>
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data='post_info'>
            <el-table-column 
              label="姓名" 
              prop='post_contact_name'
              align="center">
            </el-table-column>
            <el-table-column 
              label="手机号码" 
              prop='post_contact_mobile'
              align="center">
            </el-table-column>
            <el-table-column 
              label="所在城市" 
              prop='post_city_names'
              align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.post_city_names" placement="bottom">
                  <p class="ellipsis">
                    {{scope.row.post_city_names }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column 
              label="详细地址" 
              prop='post_address'
              align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.post_address" placement="bottom">
                  <p class="ellipsis">
                    {{scope.row.post_address }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>联系人</h2>
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data='contract_info'>
            <el-table-column 
              label="姓名" 
              prop='contact_name'
              align="center">
            </el-table-column>
            <el-table-column 
              label="手机号码" 
              prop='contact_mobile'
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>订单记录</h2>
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data='log_info'>
            <el-table-column 
              label="时间" 
              prop='create_time'
              align="center">
            </el-table-column>
            <el-table-column 
              label="操作说明" 
              prop='op_type'
              align="center">
            </el-table-column>
            <el-table-column 
              label="订单状态" 
              prop='order_status'
              align="center">
            </el-table-column>
            <el-table-column 
              label="操作人" 
              prop='op_user_name'
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <online-pay
      ref="onlinePay"
      v-if="loadOnlinePay"
      :order-id="order_id"
      order-resource="7"
    />
    <add-shoukuan-dialog :visible.sync="addShoukuanVisible" @submit="handleSaveShoukuan" @close="addShoukuanVisible=false" />
    <change-order-operator v-if="$menuPermission('api/order/set_order_operation')" ref="operator" order-type="6" @change-success="goback"></change-order-operator>
    <el-dialog
      title="操作提示"
      :visible.sync="confirmOrderVisible"
      size="tiny">
      <div style="font-size: 18px">确定该订单有效？</div>
      确认无效后，订单会被取消自动退款给买家，请慎重操作
      <div slot="footer">
        <el-button type="primary" @click="productConfirm('1')">确认有效</el-button>
        <el-button @click="productConfirm('2')">确认无效</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {productOrderDetail,
        productConfirm,
        productCancel,
        productShippedConfirm,
        productReceiptConfirm,
        productRefund,
        mySaleOrderDetail,
        saleOrderDetail,
        opDetail} from 'src/api/self_support.localproduct'
import {saveSaleOrderGathering,
        saveTeamOrderGathering,
        financeSaveOrderGathering} from 'src/api/api';
import { date, formatPrice } from 'src/utils/format'
import OnlinePay from './components/OnlinePay'
import AddShoukuanDialog from './AddShoukuanDialog.comp'
import ChangeOrderOperator from 'src/plugins/ChangeOrderOperator'
export default {
  data () {
    return {
      rule_lists_name: {
        '1': '确认订单',
        '2': '发货确认',
        '3': '收货确认',
        '4': '添加收款',
        '5': '查看收入',
        '6': '申请退款',
        '7': '定损',
        '8': '取消订单',
        '9': '在线支付',
        '10': '订单负责人'
      },
      order_id: this.$route.query.order_id,
      ORG_TYPE: localStorage.getItem('orgtype') + '',
      order_info: [],
      product_info: [],
      order_price_detail: [],
      all_total_amount: 0,
      all_rmb_total_amount: 0,
      post_info: [],
      contract_info: [],
      log_info: [],
      rule_lists: [],
      countdownStr: '00:00',
      is_have_refund: 0,
      is_self_order: 0,
      ext_order_no: '',
      addShoukuanVisible: false,
      confirmOrderVisible: false
    }
  },
  components: {
    OnlinePay,
    AddShoukuanDialog,
    ChangeOrderOperator
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isStore() {
      // return this.ORG_TYPE === '5';
      return false
    },
    isSelfSupport() {
      return this.$route.meta && this.$route.meta.menu == 'planSelfSupportOrder';
    },
    isOperator() {
      // 是否从计调操作跳转过来的
      return this.topMenuConst == 'operator';
    },
    isOnlinePay() {
      return this.order_info[0].pay_type == 2; // 是否在线支付
    },
    totalOutPrice() { // 使用于同行订单
      const price = this.product_info.nums * this.product_info.out_price
      return formatPrice(price);
    },
    leftMenu () {
      if (this.$route.meta && this.$route.meta.menu === 'distributionLocalProductList') {
        return productOrderDetail
      } else if (this.$route.meta && (this.$route.meta.menu === 'distributionMyOrder' || this.$route.meta.menu === 'finaceRefund')) {
        return mySaleOrderDetail
      } else if (this.$route.meta && this.$route.meta.menu === 'distributionPurchaseOrder') {
        return saleOrderDetail
      } else {
        return opDetail
      }
    },
    urlPath () {
      if (this.$route.meta && this.$route.meta.menu === 'distributionLocalProductList') {
        return '/distribution/local-product/refund'
      } else if (this.$route.meta && this.$route.meta.menu === 'distributionMyOrder') {
        return '/distribution/local-product-order/refund'
      } else if (this.$route.meta && this.$route.meta.menu === 'distributionPurchaseOrder') {
        return '/distribution/local-product-purchase-order/refund'
      } else if (this.$route.meta && this.$route.meta.menu === 'planSingleOrder') {
        return '/plan/single-local-product-order/refund'
      } else if (this.$route.meta && this.$route.meta.menu === 'finaceRefund') {
        return '/finace/local-product-order/refund'
      } else if (this.$route.meta && this.$route.meta.menu === 'planSelfSupportOrder') {
        return '/plan/selfsupport-local-product-order/refund'
      }
    },
    urlListPath () {
      if (this.$route.meta && this.$route.meta.menu === 'distributionLocalProductList') {
        return '/distribution/local-product/list'
      } else if (this.$route.meta && this.$route.meta.menu === 'distributionMyOrder') {
        return '/distribution/local-product-order'
      } else if (this.$route.meta && this.$route.meta.menu === 'distributionPurchaseOrder') {
        return '/distribution/local-product-purchase-order'
      } else if (this.$route.meta && this.$route.meta.menu === 'planSingleOrder') {
        return '/plan/single-local-product-order'
      } else if (this.$route.meta && this.$route.meta.menu === 'planSelfSupportOrder') {
        return '/plan/selfsupport-local-product-order'
      }
    },
    loadOnlinePay() {
      const ONLINE_PAY_EDIT_CODE = 9; // 在线支付对应的edit值

      return this.order_info[0] 
                && this.order_info[0].have_pay_second > 0
                && this.rule_lists.indexOf(ONLINE_PAY_EDIT_CODE) !== -1
                // && this.isShowOrderOperate(ONLINE_PAY_EDIT_CODE);
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
  },
  filters: {
    formatPrice: formatPrice
  },
  methods: {
    productOrderDetail () {
      let params = {
        data: {
          order_id: this.order_id
        }
      }
      let func = this.leftMenu
      func({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.order_info = [result.data.order_info]
            this.product_info = [result.data.product_info]
            this.order_price_detail = []
            for (let val in result.data.order_price_detail) {
              if (val !== 'all_total_amount' && val !== 'all_rmb_total_amount')
              this.order_price_detail.push(result.data.order_price_detail[val])
            }
            // console.log(this.order_price_detail)
            this.all_total_amount = result.data.order_price_detail.all_total_amount || 0
            this.all_rmb_total_amount = result.data.order_price_detail.all_rmb_total_amount || 0
            this.post_info = [result.data.post_info]
            this.contract_info = [result.data.contract_info]
            this.log_info = result.data.log_info
            this.rule_lists = result.data.rule_lists
            this.is_have_refund = result.data.is_have_refund
            this.is_self_order = result.data.is_self_order
            this.ext_order_no = result.data.ext_order_no
            this.startCountdown()
            const ONLINE_PAY_EDIT_CODE = 9;
            this.addShoukuanVisible = false;
            // if (this.order_info[0].pay_type === 2 && this.rule_lists.indexOf(ONLINE_PAY_EDIT_CODE) !== -1) {
            //   if (this.isStore) {
            //     // this.handleOrderOperate(ONLINE_PAY_EDIT_CODE);
            //   } else {
            //     // this.$confirm('是否打开在线支付页？', '在线支付', {
            //     //   confirmButtonText: '是',
            //     //   cancelButtonText: '否',
            //     //   type: 'warning'
            //     // }).then(() => {
            //     //   this.handleOnlinePay();
            //     // }).catch(() => {     
            //     // });
            //   }
            // }
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    productConfirm (type) {
      let params = {
        data: {
          order_id: this.order_id,
          confirm_type: type
        }
      }
      productConfirm({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.productOrderDetail()
            this.confirmOrderVisible = false
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
      // this.$confirm('确定确认该订单？', '操作提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      // }).catch(() => {         
      // });
    },
    productCancel () {
      let params = {
        data: {
          order_id: this.order_id
        }
      }
      this.$confirm('确定取消订单？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productCancel({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productOrderDetail()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      }).catch(() => {          
      });
    },
    productShippedConfirm () {
      let params = {
        data: {
          order_id: this.order_id
        }
      }
      this.$confirm('确定发货', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productShippedConfirm({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productOrderDetail()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      }).catch(() => {        
      });
    },
    productReceiptConfirm () {
      let params = {
        data: {
          order_id: this.order_id
        }
      }
      this.$confirm('收货确认', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productReceiptConfirm({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productOrderDetail()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      }).catch(() => {      
      });
    },
    productRefund () {
      let params = {
        data: {
          order_id: this.order_id
        }
      }
      this.$confirm('确定申请退款？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productRefund({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productOrderDetail()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      }).catch(() => {       
      });
    },
    handleSaveShoukuan(data) {
      let params = {};

      params.data = { ...data };
      params.data.id = this.order_info[0].bill_id;
      params.data.order_no = this.order_id;
      params.data.is_single = 1;
      params.data.tuan_id = '';
      params.data.user_collection_type = Number(params.data.user_collection_type);
      params.data.payment_date = data.payment_date ? date(data.payment_date) : '';
      params.data.attachment = data.attachment.map(item => item.id).join(',');

      this.saveOrderGatheringFunc({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.addShoukuanVisible = false;
            this.productOrderDetail();
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      });
    },
    startCountdown () {
      const timeoutTime  = new Date(this.log_info[this.log_info.length - 1].create_time).getTime() + this.order_info[0].have_pay_second * 1000;
      const time = timeoutTime - Date.now();
      const countdown = [parseInt(time / 60000), parseInt(time % 60000 / 1000)];

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
      } 
      // else if (this.order_info[0].have_pay_second > 0) {
      //   this.productOrderDetail();
      // }
    },
    handleOnlinePay () {
      if (this.$refs.onlinePay && this.$refs.onlinePay.pay()) {
        OnlinePay.showFinishConfirm.call(this).then(()=>{
          this.productOrderDetail();
        }).catch((e)=>{
          console.log('cancel: ', e);
        })
      }
    },
    handleChangeOrderOperator () {
      this.$refs.operator.changeOrderOperator(this.order_id, this.order_info[0].op_id);
    },
    goback () {
      this.$router.push({
        path: this.urlListPath
      })
    }
  },
  mounted() {
    this.productOrderDetail()
  },
}
</script>
<style lang="less" scoped>
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
    .count-down-tips{
      margin-top: 20px;
      margin-right: 10px;
    }
  }
  .tc {
    text-align: center;
  }
}
.neck-txt {
  margin: -10px 0 8px;
}
.neck-txt span {
  display: inline-block;
  margin-right: 15px;
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
</style>
