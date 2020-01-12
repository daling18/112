<template>
  <el-container v-if="data">
    <div class="bill-wrap">
        <div class="system-content">
          <!-- 订单明细 -->
          <div v-if="data.orderInfoData">
            <div class="bill-table-tit">订单明细</div>
            <el-row :gutter="20" class="line-height-24">
              <el-col :span="12">
                <p>订单号：{{ data.orderInfoData.order_no || '--' }}</p>
              </el-col>
              <el-col :span="12">
                <p>订单来源：{{ data.orderInfoData.order_source_name || '--' }}</p>
              </el-col>
              <el-col :span="12">
                <p>合同编号：{{ data.orderInfoData.uid || '--' }}</p>
              </el-col>
              <el-col :span="12">
                <p>团号：{{ data.orderInfoData.tuan_no || '--' }}</p>
              </el-col>
              <el-col :span="12">
                <p>行程名称：{{ data.orderInfoData.title || '--' }}</p>
              </el-col>
              <el-col :span="12">
                <p>出团日期：{{ data.orderInfoData.departure_date || '--' }}</p>
              </el-col>
              <!-- <el-col :span="12">
                <p>批发商：{{ data.orderInfoData.order_no || '--' }}</p>
              </el-col> -->
            </el-row>
          </div>
          <!-- 收款记录 -->
          <div v-if="data.receivablesList">
            <div class="bill-table-tit">收款记录</div>
            <el-row :gutter="20" class="line-height-24">
              <el-col :span="24">
                <el-table
                  border
                  :data="data.receivablesList"
                  style="width: 100%">
                  <el-table-column
                    prop="payment_no"
                    label="收款单号">
                  </el-table-column>
                  <el-table-column
                    label="收款方式">
                    <template slot-scope="scope">
                      <span>{{ scope.row.pay_type | payType }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    label="收款金额">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <!-- 退款明细 -->
          <div v-if="data.refundInfoData">
            <div class="bill-table-tit">退款明细</div>
            <el-row :gutter="20" class="line-height-24">
              <el-col :span="24">
                <el-table
                  border
                  :data="data.refundInfoData"
                  style="width: 100%">
                  <el-table-column
                    min-width="160"
                    prop="create_time"
                    label="申请日期">
                  </el-table-column>
                  <el-table-column
                    min-width="140"
                    prop="cancel_no"
                    label="退团/款单号">
                  </el-table-column>
                  <el-table-column
                    min-width="160"
                    v-if="data.refundInfoData[0].type == 1"
                    prop="tourist_data"
                    label="退团游客">
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    prop="total_received_amount"
                    label="订单已收">
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    v-if="((role == 'saleorderLineorderRefundDetailV2' || role == 'TouristrouteLineorderRefundDetailV2') && data.refundInfoData[0].is_supplier == 1) || hasHurisdiction"
                    prop="refund_profit"
                    label="利润退款金额">
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    prop="refund_loss"
                    label="供应商退款金额">
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    v-if="((role == 'saleorderLineorderRefundDetailV2' || role == 'TouristrouteLineorderRefundDetailV2') && data.refundInfoData[0].is_supplier == 1) || hasHurisdiction"
                    prop="accepted"
                    label="实际退款金额">
                  </el-table-column>
                  <el-table-column
                    min-width="100"
                    prop="status_name"
                    label="状态">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <!-- 退款记录 -->
          <div v-if="data.remarkJsonData">
            <div class="bill-table-tit">退款记录</div>
            <el-row :gutter="20" class="line-height-24">
              <el-col :span="12">
                <p>退款金额：{{ data.remarkJsonData.refund_amount || '' }}</p>
              </el-col>
              <el-col :span="12">
                <p>付款账户：{{ data.remarkJsonData.bank_name }} - {{ data.remarkJsonData.account_no }}</p>
              </el-col>
              <el-col :span="12">
                <p>收款人：{{ data.remarkJsonData.payee || '' }}</p>
              </el-col>
              <el-col :span="12">
                <p>对方账户：{{ data.remarkJsonData.payee_account || '' }}</p>
              </el-col>
            </el-row>
          </div>
          <!-- 退款/团进度 -->
          <div v-if="data.remarkProgressList">
            <div class="bill-table-tit">退款/团进度</div>
            <el-row :gutter="20" class="line-height-24">
              <el-col :span="2"></el-col>
              <el-col :span="22">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in data.remarkProgressList"
                    :key="index"
                    :type="item.op_time ? 'primary' : ''"
                    :timestamp="item.op_time">
                    <span class="color-pruple">{{ item.progress_name }}</span>：{{item.op_user_name + '/' + item.org_name}}
                    <span class="el-timeline-remark" v-if="item.remark">备注：{{ item.remark }}</span>
                  </el-timeline-item>
                </el-timeline>
              </el-col>
            </el-row>
          </div>
          <!-- 备注信息 -->
          <div v-if="data.remarkLogList">
            <div class="bill-table-tit">备注信息</div>
            <el-row :gutter="20" class="line-height-24">
              <el-col :span="2"></el-col>
              <el-col :span="22">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in data.remarkLogList"
                    :key="index"
                    :timestamp="item.op_time">
                    {{item.op_user_name + '/' + item.org_name}}
                    <span class="el-timeline-remark" v-if="item.remark">备注：{{ item.remark }}</span>
                  </el-timeline-item>
                </el-timeline>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- dialog隐藏关闭按钮、禁止ESC关闭、禁止点击关闭 -->
        <!-- 在线退款dialog -->
        <el-dialog
          title="在线退款"
          :visible.sync="upLineDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <p> {{ data && data.tips_text ? data.tips_text : '确认后退款会从第三方收款账户原路退回付款账户，请保证收款账户余额充足' }}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('upLine')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('upLine')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 确认退款dialog -->
        <el-dialog
          title="提示"
          :visible.sync="affirmDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <p>是否确认退款？</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('affirm')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('affirm')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 取消退款ialog -->
        <el-dialog
          title="提示"
          :visible.sync="cancelDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <p>是否取消退款？</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('cancel')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('cancel')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 线下退款dialog -->
        <el-dialog
          title="线下退款"
          :visible.sync="underLineDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <el-form
              ref="underLineDialogForm"
              label-width="100px"
              :model="underLineDialogForm"
              :rules="underLineDialogFormRules"
            >
              <el-form-item
                label="实际退款金额"
              >
                {{ data && data.refundInfoData && data.refundInfoData[0].accepted }}
              </el-form-item>
              <el-form-item
                prop="bank"
                label="付款账户"
                v-if="data && data.brandList"
              >
                <el-select v-model="underLineDialogForm.bank" placeholder="请选择">
                  <el-option
                    v-for="(item, $index) in data.brandList"
                    :key="$index"
                    :label="item.bank_name + '-' + item.account_no"
                    :value="$index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="收款人"
                prop="payee"
              >
                <el-input v-model="underLineDialogForm.payee" placeholder="请填写收款人"></el-input>
              </el-form-item>
              <el-form-item
                label="对方账户"
                prop="payee_account"
              >
                <el-input v-model="underLineDialogForm.payee_account" placeholder="请填写对方账户"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('underLine')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('underLine')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 定损dialog -->
        <el-dialog
          title="定损"
          :visible.sync="lossDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <el-form
              ref="lossDialogForm"
              label-width="100px"
              :model="lossDialogForm"
              :rules="lossDialogFormRules"
            >
              <el-form-item
                label="可退款金额"
              >
                {{ data && refund_loss }}
              </el-form-item>
              <el-form-item
                label="退款金额"
                prop="refund_loss"
              >
                <el-input v-model="lossDialogForm.refund_loss" placeholder="请填写退款金额"></el-input>
              </el-form-item>
              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input v-model="lossDialogForm.remark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('loss')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('loss')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 二次定损dialog -->
        <el-dialog
          title="二次定损"
          :visible.sync="profitDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <el-form
              ref="profitDialogForm"
              label-width="100px"
              :model="profitDialogForm"
              :rules="profitDialogFormRules"
            >
              <el-form-item
                label="可退款金额"
              >
                {{ data && refund_profit }}
              </el-form-item>
              <el-form-item
                label="退款金额"
                prop="refund_profit"
              >
                <el-input v-model="profitDialogForm.refund_profit" placeholder="请填写退款金额"></el-input>
              </el-form-item>
              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input v-model="profitDialogForm.remark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('profit')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('profit')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 拒绝退款dialog -->
        <el-dialog
          title="拒绝退款"
          :visible.sync="refuseDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <el-form
              ref="refuseDialogForm"
              :model="refuseDialogForm"
              :rules="refuseDialogFormRules"
            >
              <el-form-item
                prop="remark"
              >
                <el-input type="textarea" v-model="refuseDialogForm.remark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('refuse')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('refuse')">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 备注dialog -->
        <el-dialog
          title="备注"
          :visible.sync="remarkDialogVisible"
          width="30%"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          >
          <div class="dialog-content">
            <el-form
              ref="remarkDialogForm"
              :model="remarkDialogForm"
              :rules="remarkDialogFormRules"
            >
              <el-form-item
                prop="remark"
              >
                <el-input type="textarea" v-model="remarkDialogForm.remark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCancelCallback('remark')">取 消</el-button>
            <el-button type="primary" @click="dialogAffirmCallback('remark')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-footer>
        <Affix :offset-bottom="0">
          <!-- 按钮组 -->
          <div class="el-button-box">
            <el-button type="primary" v-if="data.is_finance && data.pay_type == 2" @click="operation('upLine')">在线退款</el-button>
            <el-button type="primary" v-if="data.is_finance && data.pay_type == 1" @click="operation('underLine')">线下退款</el-button>
            <el-button type="primary" v-if="data.is_loss" @click="operation('loss')">定损</el-button>
            <el-button type="primary" v-if="data.is_two_refund" @click="operation('profit')">二次定损</el-button>
            <el-button type="primary" v-if="data.is_refund && data.refundInfoData[0].status == 3" @click="operation('affirm')">确认退款</el-button>
            <el-button v-if="data.is_finance" @click="operation('refuse')">拒绝退款</el-button>
            <el-button v-if="data.is_refund" @click="operation('cancel')">取消退款</el-button>
            <el-button type="primary" v-if="role == 'SettlementRefundRetailV2'" @click="operation('remark')">备注</el-button>
          </div>
        </Affix>
      </el-footer>
  </el-container>
</template>

<script>
import {
  lineOrderRefundGet,  // 退团人员金额读取
  lineOrderGetRefundDetails,  // 退团详情
  lineOrderSetRefundLoss,  // 退团定损
  lineOrderSetRefundProfit,  // 退团2次定损
  lineOrderCancelRefund,  // 退团是否确认
  lineOrderGetFinanceRefundDetails,  // 财务读取退团详情
  lineOrderPostFinanceRefundLog,  // 财务退款备注
  lineOrderPostFinanceRefuse,  // 财务拒绝退款
  lineOrderPostFinanceUnderLine,  // 财务线下退款
  lineOrderPostFinanceUpLine  // 财务线上退款
} from 'src/api/settlementCenter'
import Affix from 'src/components/template/common/affix';
var refund_profit = 0
var refund_loss = 0
export default{
  components: {
    Affix
  },
  data () {
    var validateLoss = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写退款金额'));
      }
      setTimeout(() => {
        if (parseFloat(value).toString() == 'NaN') {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0) {
            callback(new Error('不可输入负数'));
          } else if (value - refund_loss > 0) {
            callback(new Error('退款金额不可高于可退款金额'));
          } else {
            callback()
          }
        }
      }, 1000);
    };
    var validateProfit = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写利润退款金额'));
      }
      setTimeout(() => {
        if (parseFloat(value).toString() == 'NaN') {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0) {
            callback(new Error('不可输入负数'));
          } else if (value - refund_profit > 0) {
            callback(new Error('退款金额不可高于可退款金额'));
          } else {
            callback()
          }
        }
      }, 1000);
    };
    return {
      data: null,
      upLineDialogVisible: false,
      underLineDialogVisible: false,
      lossDialogVisible: false,
      profitDialogVisible: false,
      refuseDialogVisible: false,
      remarkDialogVisible: false,
      affirmDialogVisible: false,
      cancelDialogVisible: false,
      refund_loss: 0,
      refund_profit: 0,
      remarkDialogForm: {
        remark: ''
      },
      remarkDialogFormRules: {
        remark: { required: true, message: '请填写备注信息', trigger: 'blur' }
      },
      refuseDialogForm: {
        remark: ''
      },
      refuseDialogFormRules: {
        remark: { required: true, message: '请填写备注信息', trigger: 'blur' }
      },
      underLineDialogForm: {
        bank: '',
        payee: '',
        payee_account: ''
      },
      underLineDialogFormRules: {
        bank: { required: true, message: '请选择付款账户', trigger: 'blur' },
        payee: { required: true, message: '请填写收款人', trigger: 'blur' },
        payee_account: { required: true, message: '请填写对方账户', trigger: 'blur' }
      },
      lossDialogForm: {
        refund_loss: '',
        remark: ''
      },
      lossDialogFormRules: {
        refund_loss: { required: true, validator: validateLoss, trigger: 'blur' },
        remark: { required: true, message: '请填写备注信息', trigger: 'blur' },
      },
      profitDialogForm: {
        refund_profit: '',
        remark: ''
      },
      profitDialogFormRules: {
        refund_profit: { required: true, validator: validateProfit, trigger: 'blur' },
        remark: { required: true, message: '请填写备注信息', trigger: 'blur' },
      }
    }
  },
  computed: {
    role () {
      return this.$route.meta && this.$route.meta.menu;
    },
    query () {
      return this.$route.query
    },
    hasHurisdiction () {
      return this.$menuPermission('api/v1/lineservice/line-order/get-finance-refund-details') && this.role == 'SettlementRefundRetailV2'
    }
  },
  filters: {
    payType (val) {
      val = parseInt(val)
      switch (val) {
        case 1:
          return '在线方式'
        case 2:
          return '线下方式'
        default:
          return '--'
      }
    }
  },
  watch: {
    query (oldVal, newVal) {
      this.data = null
      this.getDetail()
    }
  },
  mounted () {
    this.getDetail()
    this.getRefund()
  },
  methods: {
    // 获取页面详情
    getDetail () {
      let params = this.query;
      (this.hasHurisdiction ? lineOrderGetFinanceRefundDetails : lineOrderGetRefundDetails)(params)
        .then(res => {
          let {
            code,
            data,
            msg
          } = res
          if (code == 0) {
            data.refundInfoData = [data.refundInfoData]
            data = this.isEmpty(data)
            this.data = data
          } else {
            this.$message.error(msg)
          }
        })
    },
    // 退团人员金额读取
    getRefund () {
      lineOrderRefundGet(this.query)
        .then((res) => {
          let {
            code,
            data,
            msg
          } = res
          if (code == 0) {
            refund_loss = data.refund_loss_gold
            refund_profit = data.refund_profit_gold
            this.refund_loss = data.refund_loss_gold
            this.refund_profit = data.refund_profit_gold
          } else {
            this.$message.error(msg)
          }
        })
    },
    // 重置空对象、空数组为null
    isEmpty (data) {
      for (let i in data) {
        //检验null和undefined
        if (!data[i] && data[i] !== 0 && data[i] !== '') {
            data[i] = null;
        }
        //检验数组
        if (Array.prototype.isPrototypeOf(data[i]) && data[i].length === 0) {
            data[i] = null;
        }
        //检验对象
        if (Object.prototype.isPrototypeOf(data[i]) && Object.keys(data[i]).length === 0) {
            data[i] = null;
        }
      }
      return data
    },
    // 操作按钮click回调
    operation (type) {
      this[type + 'DialogVisible'] = true
    },
    // dialog取消按钮回调
    dialogCancelCallback (type) {
      this[type + 'DialogVisible'] = false
      /* 重置dislog表单 */
      this.resetForm(type)
    },
    // dialog确认按钮回调
    dialogAffirmCallback (type) {
      if (type == 'upLine') {
        this.upLineAxios(type, this.query)
      } else if (type == 'affirm' || type== 'cancel') {
        let params = this.getParams(type)
        this.refundAxios(type, params)
      } else {
        this.$refs[type + 'DialogForm'].validate((valid) => {
          if (valid) {
            let params = this.getParams(type)
            switch (type) {
              case 'upLine':
                return;
              case 'underLine':
                this.urderLineAxios(type, params)
                return;
              case 'loss':
                this.lossLineAxios(type, params)
                return;
              case 'profit':
                this.profitLineAxios(type, params)
                return;
              case 'refuse':
                this.refuseAxios(type, params)
                return;
              case 'remark':
                this.refundLogAxios(type, params)
                return;
              case 'affirm':
                this.refundAxios(type, params)
                return;
              case 'cancel':
                this.refundAxios(type, params)
                return;
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
    // 重置dislog表单
    resetForm (formName) {
      if (this.$refs[formName + 'DialogForm']) {
        this.$refs[formName + 'DialogForm'].resetFields()
      }
    },
    // axios请求参数配置
    getParams (type) {
      let params
      if (type == 'affirm' || type == 'cancel') {
        params = {
          is_confirm: type == 'affirm' ? '1' : '0'
        }
      } else if (type == 'underLine') {
        params = this.data.brandList[this[type + 'DialogForm'].bank]
        params.payee = this[type + 'DialogForm'].payee
        params.payee_account = this[type + 'DialogForm'].payee_account
      } else {
        params = this[type + 'DialogForm']
      }
      params.order_no = this.query.order_no
      params.cancel_no = this.query.cancel_no
      return params
    },
    // 详情操作axios回调处理
    axiosCallback (type, res) {
      const { code, msg } = res
      if (code == 0) {
        this.$message.success(msg)
        this.dialogCancelCallback(type)
        this.getDetail()
      } else {
        this.$message.error(msg)
      }
    },
    // 备注axios
    refundLogAxios (type, params) {
      lineOrderPostFinanceRefundLog(params)
        .then(res => {
          this.axiosCallback(type, res)
        })
    },
    // 拒绝退款axios
    refuseAxios (type, params) {
      lineOrderPostFinanceRefuse(params)
        .then(res => {
          this.axiosCallback(type, res)
        })
    },
    // 在线退款axios
    upLineAxios (type, params) {
      lineOrderPostFinanceUpLine(params)
        .then(res => {
          this.axiosCallback(type, res)
        })
    },
    // 线下退款axios
    urderLineAxios (type, params) {
      lineOrderPostFinanceUnderLine(params)
        .then(res => {
          this.axiosCallback(type, res)
        })
    },
    // 定损
    lossLineAxios (type, params) {
      lineOrderSetRefundLoss(params)
        .then(res => {
          this.axiosCallback(type, res)
        })
    },
    // 二次定损
    profitLineAxios (type, params) {
      lineOrderSetRefundProfit(params)
        .then(res => {
          this.axiosCallback(type, res)
        })
    },
    // 确认/取消退款
    refundAxios (type, params) {
      lineOrderCancelRefund(params)
        .then(res => {
          this.axiosCallback(type, res)
        })
    }
  }
}
</script>

<style lang="scss" scoped="">
@import "src/assets/css/variables.scss";
.wrapper{
  padding: 0 15px 20px 15px;
}
.el-footer{
  padding: 0;
  background: $gray;
}
.bill-wrap {
  background-color: #fff;
  padding: 15px;
  .bill-table-wrap {
    .tc {
      text-align: center;
    }
  }
  .bill-table-tit {
    border-left: 5px solid #b10c79;
    margin: 20px 0 20px;
    padding: 0px 0 0px 15px;
    color: #b10c79;
    font-size: 20px;
  }
  .bill-form-wrap {
    margin-bottom: 15px;
    padding: 15px 15px 15px 0px;
    border-left: 1px solid #bfcbd9;
    border-right: 1px solid #bfcbd9;
    border-bottom: 1px solid #bfcbd9;
  }
  .right-btn {
    float: right;
    width: 120px;
    padding: 0 10px;
    margin: 0 0 0 10px;
  }
  .billinner-table-wrap {
    overflow: hidden;
    margin-bottom: -3px;
  }
}
.line-height-24 {
  line-height: 24px;
}
.margin-r-15{
  margin-right: 15px;
}
.el-timeline-remark{
  padding-left: 15px;
  font-size: 14px;
  color: #909399;
}
.color-pruple{
  color: $themeColor;
}
.el-button-box{
  text-align: center;
  padding: 15px 0;
}
</style>
