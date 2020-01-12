<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">收款信息</div>
        <div class="form-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
            <template v-if="isSettlementRecpay">
              <el-form-item label="结算方" prop="settlement_org_id">
                <select-org v-model="orgination" placeholder="请选择结算方" :defaultList="org_info"/>
              </el-form-item>
            </template>
            <el-form-item label="结算方" prop="settlement_org_id" v-if="isPlan && tuanId">
              <el-col :span="17">
                <el-select v-model="ruleForm.settlement_org_id" filterable placeholder="请选择" @change="getAmountInfo">
                  <el-option
                    v-for="item in orgList"
                    :key="item.settlement_org_id"
                    :label="item.settlement_org_name"
                    :value="item.settlement_org_id">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="收款单号" v-if="ruleForm.payment_no">
              <el-col :span="17">
                {{ruleForm.payment_no}}
              </el-col>
            </el-form-item>
            <el-form-item label="历史已收金额">
              <el-col :span="17">
                <span v-if="amount">￥{{amount.history_receipt_amount}}</span>
              </el-col>
            </el-form-item>
            <el-form-item label="剩余应收金额" v-if="amount">
              <el-col :span="17">
                <span v-if="amount" class="color-orange">￥{{amount.remain_receipt_amount}}</span>
              </el-col>
            </el-form-item>
            <el-form-item label="本次收款金额" required>
              <el-col :span="8">
                <el-form-item prop="total_amount">
                  <input-number  v-model="ruleForm.total_amount" placeholder="请输入本次收款金额" :precision="3" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="currency" style="padding: 1px 5px">
                  <!-- <el-select v-model="ruleForm.currency" placeholder="请选择币种">
                    <el-option-group
                      v-for="group in currency_data"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-option-group>
                  </el-select> -->
                  <currency-picker  v-model="ruleForm.currency" placeholder="选择货币" readonly="readonly" ></currency-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="currency_rate">
                  <input-number  v-model="ruleForm.currency_rate" placeholder="汇率" :precision="4" />
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="收款方式" prop="payment_way">
              <el-col :span="17">
                <el-select v-model="ruleForm.payment_way" placeholder="请选择付款方式">
                  <el-option label="对公付款" :value="1"></el-option>
                  <el-option label="现金" :value="2"></el-option>
                  <el-option label="刷卡" :value="3"></el-option>
                  <el-option label="预付款" :value="4"></el-option>
                </el-select>
              </el-col>

            </el-form-item> -->
            <el-form-item label="本次收款金额（本位币）">
              <template v-if="ruleForm.currency_rate&&ruleForm.total_amount">
                {{claculation(ruleForm.currency_rate,ruleForm.total_amount)}}
              </template>
            </el-form-item>
             <el-form-item label="收款方式／账号" prop="account_id" required style="white-space: nowrap;">
              <el-select v-model="ruleForm.account_id" filterable placeholder="请选择" @visible-change="remoteMethod">
                <el-option
                  v-for="item in choice"
                  :key="item.id"
                  :label="item.account_info"
                  :value="item.id">
                </el-option>
              </el-select>
              <a href="javascript:;" class="color-purple" v-if="isSale || isPlan" @click="handleAddAccount">添加账户</a>
              <router-link class="color-purple"
                v-else-if="$menuPermission('api/finance/get_payment_account_list')"
                to="/finace/account/company"
                target="_blank">
                添加账户
              </router-link>
            </el-form-item>
            <el-form-item prop="payment_date" label="收款日期">
              <el-col :span="17">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.payment_date" :editable="false"></el-date-picker>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="收款账户" prop="receipt_account">
              <el-col :span="17">
                <el-input v-model="ruleForm.receipt_account" placeholder="请输入收款账户"></el-input>
              </el-col>
              <el-col :span="7">
  							&ensp;<el-checkbox v-model="usa_checked">存为常用收款账户</el-checkbox>
  						</el-col>
            </el-form-item> -->
            <!-- {{this.ruleForm.attachment}} -->
            <el-form-item label="上传收款凭证" prop="attachment">
              <!-- <el-input type="file" v-model="ruleForm.attachment"></el-input> -->
              <el-col :span="24">
                <div class="hide-list" v-loading.body="loading">
                  <el-upload class="upload-demo" action="/bom/api/finance/upload_img" name="image[]" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.attachment" :on-success="uploadsucc"  :before-upload="beforeUpload">
                    <el-button type="primary">选择本地文件</el-button>
                    <span slot="tip" class="el-upload__tip">&ensp;&ensp;仅支持jpeg、png、jpg、pdf格式，不可超过10份</span>
                  </el-upload>
                </div>
                <ul class="el-upload-list el-upload-list--text" v-if="ruleForm.attachment.length>0">
                  <li class="el-upload-list__item is-success" v-for="file in ruleForm.attachment">
                    <a class="el-upload-list__item-name" :href="file.url" target="_blank">
                      <i class="el-icon-document"></i>{{file.name}}
                    </a>
                    <label class="el-upload-list__item-status-label">
                      <i class="el-icon-upload-success el-icon-circle-check"></i>
                    </label><i class="el-icon-close" @click="diyRemove(file.id)"></i>
                  </li>
                </ul>
              </el-col>

            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-form>
          <div class="title">对应团队收入结算单（应收款）</div>
          <div class="btn-areas" v-if="canGetTuanIn && ruleForm.settlement_org_id">
            <el-button type="primary" size="long" @click="handleShowDialogTable">+ 团队收入应收款</el-button>
          </div>
          <el-table class="el-table--middle" :data="ruleForm.tuan" style="width: 100%;" border>
            <el-table-column label="团号／应收款ID／项目类型" align="left" min-width="285">
              <template slot-scope="scope">
                  <template v-if="scope.row.tuan_no">
                    <el-tooltip :content="scope.row.tuan_name" :open-delay="300"	:popper-class="'tootip'" placement="top">
                      <span>{{scope.row.tuan_no}}</span>
                    </el-tooltip>
                  </template>
                  <template v-if="scope.row.bill_id">
                    【{{scope.row.bill_id}}】
                  </template>
                  <template v-if="scope.row.item_type_str">
                    【{{scope.row.item_type_str}}】
                  </template>
                  <!-- <template v-if="scope.row.item_name">
                    【{{scope.row.item_name}}】
                  </template> -->

              </template>
            </el-table-column>
            <el-table-column label="应收金额 / 结算币种" align="center"  width="90">
              <template slot-scope="scope">
                {{scope.row.total_amount}} /<br/>{{scope.row.currency}}
              </template>
            </el-table-column>
            <el-table-column prop="rmb_total_amount" label="应收金额（本位币）" align="right" width="100">
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rmb_receipted_amount" label="已收金额（本位币）" align="right" width="100">
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.rmb_receipted_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="本次实收金额（本位币）" align="right" width="120">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <template v-if="!!scope.row.edit_currency_rate&&!!scope.row.edit_total_amount">
                  <el-input placeholder="本次实收金额（本位币）" readonly="readonly" :value="claculation(scope.row.edit_currency_rate,scope.row.edit_total_amount)"></el-input>
                </template>
                <template v-else>
                  <el-input placeholder="本次实收金额（本位币）" readonly="readonly"></el-input>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="收款币种／金额" align="right" width="260">
              <template slot-scope="scope">
                <el-col :span="12">
                  <!-- <el-select placeholder="请选择币种" v-model="scope.row.edit_currency">
                    <el-option-group
                    v-for="group in currency_data"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                  </el-select> -->
                  <currency-picker  v-model="scope.row.edit_currency" placeholder="选择货币" readonly="readonly" item="table"></currency-picker>
                </el-col>
                <el-col :span="12">
                  <input-number  placeholder="金额" v-model="scope.row.edit_total_amount" :precision="3" />
                </el-col>
              </template>
            </el-table-column>
            <el-table-column prop="recieve_account_no" label="汇率" align="center" width="90">
              <template slot-scope="scope">
                <input-number  placeholder="汇率" v-model="scope.row.edit_currency_rate" :precision="4" />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="del(scope.row.bill_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="foot-btn">
            <el-button type="primary" @click="submitForm('ruleForm')" size="large" :disabled="submitBtnDisable">保存</el-button>
            <el-button @click="$router.go(-1)" size="large">返回</el-button>
          </div>
        </div>
        <el-dialog title="选择团队收入项" :visible.sync="dialogTableVisible" :size="'medium'">
          <div class="system-search">
            <div class="search-line-item">
              <div class="search-item" v-if="!isPlan">
                <div class="label">团号</div>
                <el-input v-model="searchForm.tuan_no" placeholder="团号"></el-input>
              </div>
              <div class="search-item">
                <div class="label">订单编号</div>
                <el-input v-model="searchForm.order_no" placeholder="请输入订单编号"></el-input>
              </div>
              <div class="search-item">
                <div class="label">收入类型</div>
                <el-select v-model="searchForm.bill_type" placeholder="请选择收入类型">
                  <el-option label="全部" :value="0"></el-option>
                  <el-option label="订单收入" :value="1"></el-option>
                  <el-option label="购物返款" :value="2"></el-option>
                  <el-option label="团队返佣" :value="3"></el-option>
                  <el-option label="其他杂费" :value="4"></el-option>
                </el-select>
              </div>

              <div class="search-item search-button">
                <el-button type="primary" @click="searchTuan">搜索</el-button>
              </div>
            </div>
          </div>
          <div class="search-content">
            <el-table class="el-table--middle" :data="choose_tuan" border>
              <el-table-column property="tuan_no" label="团号" width="220" align="center">
                <template slot-scope="scope">
                  <el-tooltip :content="scope.row.tuan_name" :open-delay="300"	:popper-class="'tootip'" placement="top">
                    <span>{{scope.row.tuan_no}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column property="name" label="应收款ID／订单／金额" header-align="center" align="left">
                <template slot-scope="scope">
                  【{{scope.row.bill_id}}】/{{scope.row.order_no}}/{{scope.row.rmb_total_amount}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked" :label="scope.row">选择</el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page" v-show="pageShow">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage">
            </el-pagination>
          </div>
          <div slot="footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm"  :disabled="chooseBtnDisable">确 定</el-button>
          </div>
          <!-- <div slot="footer" class="dialog-footer">
  				    <el-button @click="dialogTableVisible = false">取 消</el-button>
  				    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
  				    <el-button type="primary" @click="confirm">确 定</el-button>
  				  </div>   -->
        </el-dialog>
        <el-dialog title="图片" :visible.sync="dialogPicVisible" size="small">
          <img :src="prePicUrl" style="width:100%;">
        </el-dialog>
        <!--保存提示-->
        <el-dialog title="操作提示" :visible.sync="dialogSaveVisible" size="tiny">
          <div style="padding:20px;">还有{{above_yuan}}元未选择收入结算单，保存后多余收款{{above_yuan}}元将存入余额，是否确认保存？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogSaveVisible =false">取 消</el-button>
            <el-button type="primary" @click="saveForm"  :disabled="submitBtnDisable">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="新增本公司账户" :visible.sync="accountDialogShow" :close-on-click-modal="false">
          <div class="form-content">
            <el-form :model="accountForm" style="width: 90%">

              <el-form-item label="账号类型" :label-width="formLabelWidth" required>
                <el-select v-model="accountForm.payment_type" placeholder="请选择">
                  <el-option label="对公" :value="1"/>
                  <el-option label="对私" :value="2"/>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth" required>
                <el-input v-model="accountForm.payment_name" placeholder="请输入姓名" auto-complete="off"/>
              </el-form-item>

              <el-form-item label="付款方式" :label-width="formLabelWidth" required>
                <el-select v-model="accountForm.account_type" placeholder="请选择">
                  <el-option label="支付宝" :value="1"/>
                  <el-option label="微信" :value="2"/>
                  <el-option label="民生银行账户" :value="3"/>
                  <el-option label="其他银行账户" :value="4"/>
                </el-select>
              </el-form-item>
              <div v-show="accountForm.account_type!='1'&&accountForm.account_type!='2'">
                <el-form-item label="开户名" :label-width="formLabelWidth" required>
                  <el-input v-model="accountForm.account_name" placeholder="请输入开户名" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="开户银行" :label-width="formLabelWidth" required>
                  <el-input v-model="accountForm.bank_name" placeholder="请输入开户行，例如：建设银行" auto-complete="off"/>
                </el-form-item>
              </div>
              <div v-show="accountForm.account_type=='1'">
                <el-form-item label="支付平台账户" :label-width="formLabelWidth" required>
                  <el-input v-model="accountForm.ali_no" placeholder="请输入支付平台账户" auto-complete="off"/>
                </el-form-item>
              </div>
              <div v-show="accountForm.account_type=='2'">
                <el-form-item label="支付平台账户" :label-width="formLabelWidth" required>
                  <el-input v-model="accountForm.weixin_no" placeholder="请输入支付平台账户" auto-complete="off"/>
                </el-form-item>
              </div>
              <div v-show="accountForm.account_type=='3'">
                <el-form-item label="银行卡号" :label-width="formLabelWidth" required>
                  <el-input v-model="accountForm.bank_no" placeholder="请输入银行卡号" auto-complete="off"/>
                </el-form-item>
              </div>
              <div v-show="accountForm.account_type=='4'">
                <el-form-item label="银行卡号" :label-width="formLabelWidth" required>
                  <el-input v-model="accountForm.other_no" placeholder="请输入银行卡号" auto-complete="off"/>
                </el-form-item>
              </div>
            </el-form>
          </div>

          <div slot="footer" class="foot-btn">
            <el-button @click="accountDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveAccountForm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import { currency_data } from 'src/configuration/currency';
import InputNumber from 'src/plugins/InputNumber';
import { addReceipt, editReceipt, detail ,getTuanIn ,getAmountInfo, getPaymentAccount, getSearchOrg} from 'src/api/api';
import {
  saleAddReceipt, saleGetAmountInfo, saleGetTuanIn,
  operatorAddReceipt, operatorGetAmountInfo, operatorGetTuanIn, addOperatorOrderGathering
} from 'src/api/tuan';
import { shareAddPaymentAccount } from 'src/api/finance';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import SelectOrg from 'src/plugins/SelectOrg.vue';
export default {
  components: {
    CurrencyPicker,
    InputNumber,
    SelectOrg
  },
  data() {
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('日期不能为空'));
      }else{
        callback();
      }
    };
    let limitMax = (rule, value, callback) => {
      if (value > 100000000) {
        callback(new Error('请输入小于100000000的数值'));
      }else if(value.toString().indexOf('-') != -1){
				callback(new Error('请输入正数'))
      }else{
        callback();
      }
    };
    const rules = {
        settlement_org_id: [
          {required: true, message: '结算方不能为空 '}
        ],
        payment_date: [
          { validator:checkDate, trigger: 'blur' }
        ],
        currency_rate: [
          { type:'number', required: true, message: '请输入汇率', trigger: 'blur' }
        ],
        total_amount: [
          {type:'number', required: true, message: '本次收款金额不能为空 ', trigger: 'blur' },
          { validator:limitMax, trigger: 'change' }
        ],
        account_id: [
          {type:'number',required: true, message: '收款方式/账号不能为空', trigger: 'change' }
        ]
      };

    return {
      chooseBtnDisable:false,
      loading:false,
      above_yuan:0,
      dialogSaveVisible:false,
      currency_data,
      choice:[],
      amount:null,
      prePicUrl: '',
      dialogPicVisible: false,
      submitBtnDisable: false,
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      orgList: [],
      ruleForm: {
        settlement_org_id: '',
        settlement_org_name: '',
        currency_rate: 1,
        payment_way: '',
        payment_date: new Date(),
        currency: '人民币',
        receipt_account: '',
        receipt_bank_name: '',
        total_amount: '',
        attachment: [
          // {name: 'food.jpeg', url: '1212'},
        ],
        usa_checked: false,
        tuan: [],
        account_id:'',
        remark: ''
      },
      searchForm: {
        tuan_no: "",
        order_no: "",
        bill_type: 0
      },
      rules,
      tableData: [
        // {
        //   pay_date:"2012-12-12",
        //   pay_way:"现金",
        //   pay_account:"12122323232434343434",
        //   pay_man:"李嘉诚",
        //   recieve_account_name:"李伟",
        //   recieve_account_bank:"中国银行",
        //   recieve_account_no:"12122323232434343434",
        //   id:1212
        // }
      ],
      dialogTableVisible: false,
      choose_tuan: [
        // {
        //  	tuan_no: '121232311423',
        //  	name: 'www',
        //  	rmb_total_amount: '12.00',
        //  	id:'122'
        // }
      ],
      tuan: [],
      form: {
        tuan_no: '',
        cost_no: ''
      },
      formLabelWidth: '120px',
      usa_checked: false,
      checked: [],

      accountDialogShow: false,
      accountForm: {
        payment_type: '',
        payment_name: '',
        account_type: '',
        account_name: '',
        bank_name: '',
        bank_no: '',
        other_no:'',
        ali_no: '',
        weixin_no: '',
        account_no: '',
        id:''
      },
      org_info:[]
    };
  },
  computed: {
    tuanId() {  // 从计调的收入列表进去该页面时传入tuan_id，使用parent_id是因为面包屑识别使用
      return this.$route.query && this.$route.query.parent_id;
    },
    isSale(){ // 是否从销售中心跳转过来的
      return this.$route.meta && this.$route.meta.isSale;
    },
    isPlan(){ // 是否从计调操作跳转过来的
      return this.$route.meta && this.$route.meta.isPlan;
    },
    isSettlementRecpay(){
      if(this.$route.name == 'settlementRecieve-edit'){
        return true;
      }
    },
    orgination: {
      get: function() {
        let org = null;
        if(this.ruleForm.settlement_org_id){
          return {
            org_id: this.ruleForm.settlement_org_id, 
            org_name: this.ruleForm.settlement_org_name
          };
        }
        return org;
      },
      set: function(val) {
        val = val || {};
        this.ruleForm.settlement_org_id = val.org_id;
        this.ruleForm.settlement_org_name = val.org_name;
        this.getAmountInfo(val.org_id);
      }
    },
    canGetTuanIn(){
      let canGetTuanIn = false;

      if(this.isSale){
        canGetTuanIn = this.$menuPermission('api/tuan/sale_get_tuan_in');
      }else if(this.isPlan){
        canGetTuanIn = this.$menuPermission('api/tuan/operator_get_tuan_in');
      }else{
        canGetTuanIn = this.$menuPermission('api/finance/get_tuan_in');
      }
      return canGetTuanIn;
    },
    addReceiptFunc(){
      if(this.isSale){
        return saleAddReceipt;
      }else if(this.isPlan){
        return operatorAddReceipt
      }else{
        return addReceipt;
      }
    },
    getTuanInFunc(){
      if(this.isSale){
        return saleGetTuanIn;
      }else if(this.isPlan){
        return operatorGetTuanIn;
      }else{
        return getTuanIn;
      }
    },
    getAmountInfoFunc(){
      if(this.isSale){
        return saleGetAmountInfo;
      }else if(this.isPlan){
        return operatorGetAmountInfo;
      }else{
        return getAmountInfo;
      }
    }
  },
  mounted() {
    this.remoteMethod(true);
    if (this.$route.query.action == 2) {
      this.getDetail();
    }
    // 计调操作进来时没有传供应商id。通过tuan_id获取可选供应商列表
    if(this.isPlan){
      addOperatorOrderGathering({
        params: {data: {tuan_id: this.tuanId}},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.orgList = data.data;
          } else {
            this.$message.error(data.msg);
          }
        }
      });
    }else{
      this.ruleForm.settlement_org_id = this.$route.query.parent_id;
      if(this.$route.name == 'settlementRecieve-edit'){
        // 收款认款里面的添加登记收款
        const data = {name: ''};
        getSearchOrg({data}).then((params)=>{
          let { code, data, msg } = params['data'];
          let list = [];

          if(!code){
            list = data;
          }else{
            this.$message({message: msg, type:'error'})
          }
          this.org_info = list;
        });
      }else{
        this.getAmountInfo(this.$route.query.relate_id ? this.$route.query.relate_id : this.$route.query.parent_id);
      }
    }
  },
  methods: {
    operateSuccessRedirect(){
      let relate_id = this.$route.query.relate_id ? this.$route.query.relate_id : this.$route.query.parent_id;

      setTimeout(() => {
        if(this.$route.name == 'settlementRecieve-edit'){
          // 收款认款-收款记录-添加登记收款页的跳转
          this.$router.push({ path: '/settlement/recpay/receiptList', query: {} })
        }else{
          if(this.isSale){
            this.$router.push({ path: '/sale/recognition/peer-proceeds', query: { settlement_org_id: this.$route.query.parent_id } })
          }else if(this.isPlan){
            this.$router.go(-1);
          }else{
            this.$router.push({ path: '/fund-settlement/recieve-record', query: { id: relate_id } })
          }
        }
      }, 500);
    },
    remoteMethod(refresh){
      let params = {
        data: {

        }
      };
      if(!refresh){
        return;
      }
      getPaymentAccount({
        params: params,
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            let arr=data.data.list;

            this.choice=arr.map(function(a){
              return {id:a.id,account_info:a.account_type_str+'-'+a.account_no}
            });

          } else {
            this.$message.error(data.msg);
          }
        }
      });
    },
    claculation(a,b){
      let a1=a+'',
          b1=b+'',
          pos1=a1.indexOf('.'),
          pos2=b1.indexOf('.'),
          len1=a1.length,
          len2=b1.length,
          arr1=a1.split('.'),
          arr2=b1.split('.'),
          join1=Number(arr1.join('')),
          join2=Number(arr2.join('')),
          dis1=0,
          dis2=0;


      if(pos1!=-1){
        dis1=len1-pos1-1
      }
      if(pos2!=-1){
        dis2=len2-pos2-1
      }

      return Number(format.toFixed((join1*join2)/(Math.pow(10,dis1)*Math.pow(10,dis2)), 3));

    },
    confirm() {
      // this.ruleForm.tuan = this.checked;
      this.chooseBtnDisable=true;
      for(let i=0;i<this.checked.length;i++){
        if(!!this.ruleForm.currency){
          this.checked[i].edit_currency=this.ruleForm.currency;
        }

        if(!!this.ruleForm.currency_rate){
          this.checked[i].edit_currency_rate=this.ruleForm.currency_rate;
        }

      }

      this.ruleForm.tuan =this.ruleForm.tuan.concat(this.checked);
      this.dialogTableVisible = false;
    },
    del(id) {
      for (let i = 0; i < this.ruleForm.tuan.length; i++) {
        if (this.ruleForm.tuan[i]["bill_id"] == id) {
          this.ruleForm.tuan.splice(i, 1);
        }
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.searchTuan();
    },
    getDetail() {
      let params = {
        data: {
          id: this.$route.query.parent_id
        }
      };
      detail({
        params: params,
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.ruleForm = data.data;
            this.ruleForm.total_amount = data.data.total_amount;
            this.ruleForm.attachment == "" ? this.ruleForm.attachment = [] : this.ruleForm.attachment;
            this.ruleForm.tuan == false ? this.ruleForm.tuan = [] : this.ruleForm.tuan;
            this.checked = this.ruleForm.tuan;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getAmountInfo(org_id){
      if(!org_id){
        return false;
      }
       console.log('in')
      let params = {
        data: {
          id: org_id,
          tuan_id: this.tuanId
        }
      };

      this.ruleForm.tuan = []; // org_id变更时清空收入结算单列表
      this.getAmountInfoFunc({
        params: params,
        success: (params) => {
          let {code,msg,data}= params.data;
          if (code == '0') {
            this.amount=data;
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    searchTuan() {
      let select_bill_ids = [];

      this.checked=[];

      for (let i = 0; i < this.ruleForm.tuan.length; i++) {
        select_bill_ids.push(this.ruleForm.tuan[i].bill_id)
      }

      let params = {
        data: {
          tuan_no: this.searchForm.tuan_no,
          order_no: this.searchForm.order_no,
          bill_type: this.searchForm.bill_type,
          settlement_org_id: this.ruleForm.settlement_org_id,
          page: this.page,
          page_size: 10,
          select_bill_ids: select_bill_ids,
          tuan_id: this.isSale ? '' : this.tuanId
        }
      };
      this.getTuanInFunc({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.choose_tuan = data.data.list;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.current_page;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    saveForm() {
      let attachment = [];

      this.submitBtnDisable = true;
      this.dialogSaveVisible=false;
      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        attachment.push(this.ruleForm.attachment[i].id);
      }

      attachment = attachment.join(",");
      let action = this.$route.query.action,
        api = [this.addReceiptFunc, editReceipt],
        params = {
          data: {
            settlement_org_id: this.ruleForm.settlement_org_id,
            id: this.$route.query.parent_id,
            payment_date: format.date(this.ruleForm.payment_date),
            currency: this.ruleForm.currency,
            currency_rate: this.ruleForm.currency_rate,
            total_amount: this.ruleForm.total_amount,
            account_id:this.ruleForm.account_id,
            attachment: attachment,
            remark: this.ruleForm.remark,
            tuan: this.ruleForm.tuan,
            tuan_id: this.isPlan ? this.tuanId : ''
            // payment_way: this.ruleForm.payment_way,
            // receipt_account: this.ruleForm.receipt_account,
          }
        };

      api[action - 1]({
        params: params,
        success: (params) => {
          let data = params.data;

          if(data.code=='0'){
            this.$message.success(data.msg);
            this.operateSuccessRedirect();
          }else{
            this.$message.error(data.msg);
            this.submitBtnDisable = false;
          }
        },
        showLoading: true
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let total=parseFloat(this.claculation(this.ruleForm.currency_rate,this.ruleForm.total_amount)),
              claTotal=0,
              // dis=0,
              tuan=this.ruleForm.tuan;

          if((this.isSale || this.isPlan) && tuan.length == 0){
            this.$message.error('对应团队收入结算单不能为空！');
            return false;
          }

          for(let i=0;i<tuan.length;i++){
            if(!tuan[i]['edit_total_amount']){
              this.$message.error('第'+(i+1)+'个付款金额不能为0或空');
              return false;
            }
            if(!tuan[i]['edit_currency_rate']){
              this.$message.error('第'+(i+1)+'个汇率不能为0或空');
              return false;
            }
            let tempCla=parseFloat(this.claculation(tuan[i]['edit_currency_rate'],tuan[i]['edit_total_amount']));//本次实收金额本位币
                // tempDis=tuan[i]['rmb_total_amount']-tuan[i]['rmb_receipted_amount'],//应收金额本位币-已收金额本位币
                // distance=tempCla-tempDis;

            claTotal+=parseFloat(tempCla);

            // if(distance>0){
            //   dis+=distance;
            // }

          }
          if(total>claTotal){
            this.above_yuan=(total*1000-claTotal*1000)/1000;
            this.dialogSaveVisible=true;
            this.submitBtnDisable=false;
          }else if(total==claTotal){
            this.saveForm();
          }else{
            this.$message.error('本次收款金额不足以抵扣收入结算单应收款项中填写的本次实收金额（本位币）！请检查金额是否填写正确！');
            // 本次收款金额不足以抵扣收入结算单应收款项中填写的已收款金额！请检查金额是否填写正确！
            return false;
          }
        } else {
           console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        if (this.ruleForm.attachment[i]["id"] == file.id) {
          this.ruleForm.attachment.splice(i, 1);
          return false;
        }

      }
    },
    diyRemove(id){
      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        if (this.ruleForm.attachment[i]["id"] == id) {
          this.ruleForm.attachment.splice(i, 1);
          return false;
        }

      }
    },
    handlePreview(file) {
      this.prePicUrl = file.url;
      this.dialogPicVisible = true;
    },
    beforeUpload(file){
      this.loading=true;

      let isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        this.loading=false;
        return false;
      }

      return isLt2M;
    },
    uploadsucc(response, file, fileList) {
      if(response.code=='0'){
        if(this.ruleForm.attachment.length==10){
          this.$message.error("上传凭证数量不可超过十份");
        }else{
          this.ruleForm.attachment.push({
            id: response.data[0].id,
            name: response.data[0].name,
            url: response.data[0].path,
          });
        }

      }else{
        this.$message.error(response.msg);
      }
      this.loading=false;

    },
    uploaderror(err, file, fileList){
       console.log(err);
      this.loading=false;
    },
    handleShowDialogTable(){
      this.chooseBtnDisable=false;
      this.dialogTableVisible = true;
      this.choose_tuan=[];
      this.checked=[];
      this.searchTuan();
    },
    handleAddAccount(){
      this.accountDialogShow=true;
      this.accountForm = {
        payment_type: '',
        payment_name: '',
        account_type: '',
        account_name: '',
        bank_name: '',
        bank_no: '',
        other_no:'',
        ali_no: '',
        weixin_no: '',
        account_no: '',
        id:''
      };
    },
    handleSaveAccountForm(){
      this.accountDialogShow=true;

      if(this.accountForm.account_type==1){
        this.accountForm.account_no=this.accountForm.ali_no;
      }else if(this.accountForm.account_type==2){
        this.accountForm.account_no=this.accountForm.weixin_no;
      }else if(this.accountForm.account_type==3){
        this.accountForm.account_no=this.accountForm.bank_no;
      }else{
        this.accountForm.account_no=this.accountForm.other_no;
      }

      shareAddPaymentAccount({
        params: {data: this.accountForm},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.$message.success(data.msg);
            this.accountDialogShow=false;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    }
  }
}
</script>

<style scoped lang="scss">
.form-content {

  .el-form {
    width: 680px;

    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
}

.foot-btn {
  margin: 10px auto;
  text-align:center;
}
.btn-areas{
  padding-bottom: 10px;
}
</style>
