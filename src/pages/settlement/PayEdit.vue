<!--D:\files\repo\bom\application\index\view\dev\src\components\finace\balance\pay-edit.vue-->
<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">付款信息</div>
        <div class="form-content">
          <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm"> -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
            <template v-if="isSettlementPayEdit">
              <el-form-item label="结算方" prop="settlement_org_id">
                <select-org v-model="orgination" placeholder="请选择结算方" :defaultList="org_info"/>
              </el-form-item>
            </template>
            <el-form-item label="付款单号" v-if="ruleForm.payment_no">
              <el-col :span="17">
                {{ruleForm.payment_no}}
              </el-col>
            </el-form-item>
            <el-form-item label="历史已付金额">
              <el-col :span="17">
                <span v-if="amount" class="color-orange">{{amount.history_pay_amount}}</span>
              </el-col>
            </el-form-item>
            <el-form-item label="剩余应付金额" v-if="amount">
              <el-col :span="17">
                <span v-if="amount" class="color-orange">{{amount.remain_pay_amount}}</span>
              </el-col>
            </el-form-item>
            <el-form-item prop="payment_date" label="付款日期" required>
              <el-col :span="17">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.payment_date" :editable="false"></el-date-picker>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="付款方式" prop="payment_way">
              <el-col :span="17">
                <el-select v-model="ruleForm.payment_way" placeholder="请选择付款方式">
                  <el-option label="对公付款" :value="1"></el-option>
                  <el-option label="现金" :value="2"></el-option>
                  <el-option label="刷卡" :value="3"></el-option>
                  <el-option label="预付款" :value="4"></el-option>
                </el-select>
              </el-col>
            </el-form-item> -->
            <el-form-item label="结算币种/汇率" required>
              <el-col :span="8">
                <el-form-item prop="currency">
                 <!--  <el-select v-model="ruleForm.currency" placeholder="请选择币种">
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
                   <currency-picker  v-model="ruleForm.currency" placeholder="选择货币" readonly="readonly"></currency-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">&ensp;</el-col>
              <el-col :span="8">
                <el-form-item prop="currency_rate">
                  <el-input v-model="ruleForm.currency_rate" placeholder="汇率" type="number" @blur="ruleTo4()"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="本次付款金额" prop="total_amount">
              <el-col :span="17">
                <el-input v-model="ruleForm.total_amount" placeholder="请输入总付款金额" type="number" @blur="ruleTo2()"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="总付款（本位币）" required>
              <template v-if="ruleForm.currency_rate&&ruleForm.total_amount">
                {{claculation(ruleForm.currency_rate,ruleForm.total_amount)}}
              </template>
              <template v-else>--</template>

            </el-form-item>
            <!-- <el-form-item label="付款人" required>
  						<el-col :span="12">
  						  <el-form-item prop="department">
  							<el-select v-model="ruleForm.department" placeholder="请选择所在部门">
  							  <el-option label="人民币" value="1"></el-option>
  							</el-select>
  					      </el-form-item>
  						</el-col>
  						<el-col :span="12">
  						  <el-form-item prop="people">
  						  	<el-select v-model="ruleForm.people" placeholder="请选择付款人">
  								<el-option label="人民币" value="1"></el-option>
  							</el-select>
  					      </el-form-item>
  						</el-col>
  					  </el-form-item> -->
            <!-- <el-form-item label="付款账户" prop="payment_account">
              <el-col :span="17">
                <el-input v-model="ruleForm.payment_account" placeholder="请输入付款账户"></el-input>
              </el-col>

            </el-form-item>
            <el-form-item label="收款方开户名" prop="receipt_account_name">
              <el-col :span="17">
                <el-input v-model="ruleForm.receipt_account_name" placeholder="请输入收款方开户名"></el-input>
              </el-col>
            </el-form-item> -->
            <el-form-item label="付款方式／账号" prop="account_id" style="white-space: nowrap;">
               <el-select v-model="ruleForm.account_id" filterable placeholder="请选择" @visible-change="remoteMethod">
                <el-option
                  v-for="item in choice"
                  :key="item.id"
                  :label="item.account_info"
                  :value="item.id">
                </el-option>
              </el-select>
              <router-link class="color-purple"
                to="/finace/account/company"
                target="_blank">
                本公司账户
              </router-link>
            </el-form-item>
            <el-form-item label="对方收款账号" prop="receipt_account" style="white-space: nowrap;">
              <el-select
                v-model="ruleForm.receipt_account"
                filterable
                remote
                clearable
                :loading="peerAccountLoading"
                :remote-method="getMatchPeerAccount"
                placeholder="请填写银行卡号或支付宝、微信等支付平台账户">
                <el-option
                  v-for="item in peerAccountList"
                  :key="item.id"
                  :label="item.bank_number"
                  :value="item.bank_number"/>
              </el-select>
              <router-link class="color-purple"
                to="/finace/account/peer"
                target="_blank">
                同行账户
              </router-link>
            </el-form-item>
            <!-- <el-form-item label="对方收款账号" prop="receipt_account">
              <el-col :span="17">
                <el-input v-model="ruleForm.receipt_account" placeholder="请输入对方收款账号"></el-input>
              </el-col>
              <el-col :span="7">
  							&ensp;<el-checkbox v-model="ruleForm.usa_checked">存为常用收款账户</el-checkbox>
  						</el-col>
            </el-form-item> -->
            <!-- <el-form-item label="收款方开户行" prop="receipt_bank_name">
              <el-col :span="17">
                <el-input v-model="ruleForm.receipt_bank_name" placeholder="请输入收款方开户行"></el-input>
              </el-col>
            </el-form-item> -->
            <!-- {{this.ruleForm.attachment}} -->
            <el-form-item label="上传付款凭证" prop="attachment">
              <!-- <el-input type="file" v-model="ruleForm.attachment"></el-input> -->
              <el-col :span="24">
                <div class="hide-list" v-loading.body="loading">
                  <el-upload class="upload-demo" action="/bom/api/finance/upload_img" name="image[]" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.attachment" :on-success="uploadsucc" :on-error="uploaderror" :before-upload="beforeUpload">
                    <el-button size="small">选择本地文件</el-button>
                    <span slot="tip" class="el-upload__tip">&ensp;&ensp;&ensp;&ensp;仅支持jpeg、png、jpg、pdf格式，不可超过10份</span>

                  </el-upload>
                </div>
                <ul class="el-upload-list el-upload-list--text" v-if="ruleForm.attachment.length>0">
                  <li class="el-upload-list__item is-success" v-for="file in ruleForm.attachment" :key="file.id">
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
          <div class="title">对应团队成本结算单（应付款）</div>
          <!-- {{tableData}} -->
          <div class="table-box">
            <el-table :data="ruleForm.tuan" style="width: 100%;;margin:0 -1px;" border>
              <el-table-column label="团号／应付款ID／项目类型/名称" header-align="center" align="left" min-width="260">
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
                  <template v-if="scope.row.item_name">
                    【{{scope.row.item_name}}】
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="应付金额／结算币种" header-align="center" align="right"  width="160">
                <template slot-scope="scope">
                  【{{scope.row.total_amount}}】{{scope.row.currency}}
                </template>
              </el-table-column>
              <el-table-column prop="rmb_total_amount" label="应付金额（本位币）" header-align="center" align="right" width="160">
              </el-table-column>
              <el-table-column prop="rmb_payed_amount" label="已付金额（本位币）" header-align="center" align="right" width="160">
              </el-table-column>
              <el-table-column label="本次实付金额（本位币）" header-align="center" align="right"  width="200">
                <template slot-scope="scope">
                  <template v-if="!!scope.row.edit_currency_rate&&!!scope.row.edit_total_amount">
                    <el-input placeholder="本次实付金额（本位币）" readonly="readonly" :value="claculation(scope.row.edit_currency_rate,scope.row.edit_total_amount)"></el-input>
                  </template>
                  <template v-else>
                    <el-input placeholder="本次实付金额（本位币）" readonly="readonly" ></el-input>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="付款币种／金额" align="right"  width="260">
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
                    <currency-picker v-model="scope.row.edit_currency" placeholder="选择货币" readonly="readonly" item="table"></currency-picker>
                  </el-col>
                  <el-col :span="12">
                    <el-input placeholder="金额" v-model="scope.row.edit_total_amount" type="number" @blur="to2(scope.row.bill_id)"></el-input>
                  </el-col>
                </template>
              </el-table-column>
              <el-table-column prop="recieve_account_no" label="汇率" align="center"  width="120">
                <template slot-scope="scope">
                  <el-input placeholder="汇率" v-model="scope.row.edit_currency_rate" type="number" @blur="to4(scope.row.bill_id)"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center"  width="100"  fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="del(scope.row.bill_id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="btn-areas">
              <el-button type="text" @click="chooseBtnDisable=false;choose_tuan=[];checked=[];searchTuan();">+ 团队成本应付款</el-button>
            </div>
          </div>
          <div class="submit-buttons">
            <el-button type="primary" @click="submitForm('ruleForm')" size="large" :disabled="submitBtnDisable">保存</el-button>
            <el-button @click="$router.go(-1)" size="large">返回</el-button>
          </div>
        </div>
        <el-dialog title="选择团队成本项" :visible.sync="dialogTableVisible" size="small">
          <div class="system-search">
            <div class="search-line-item">
              <div class="search-item">
                <div class="label">团号</div>
                <el-input v-model="searchForm.tuan_no" placeholder="团号"></el-input>
              </div>
              <div class="search-item">
                <div class="label">应付款ID</div>
                <el-input v-model="searchForm.bill_id" placeholder="请输入应付款ID"></el-input>
              </div>

              <div class="search-item search-button">
                <el-button type="primary" @click="searchTuan">搜索</el-button>
              </div>
            </div>
          </div>
          <div class="search-content">
            <el-table :data="choose_tuan" border>
              <el-table-column property="tuan_no" label="团号" header-align="center" align="left">
                <template slot-scope="scope">
                  <el-tooltip :content="scope.row.tuan_name" :open-delay="300"	:popper-class="'tootip'" placement="top">
                    <span>{{scope.row.tuan_no}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column property="item_name" label="成本项" header-align="center" align="left"></el-table-column>
              <el-table-column property="bill_id" label="应付款ID" width="90" header-align="center" align="left"></el-table-column>
              <el-table-column property="money" label="应付金额" header-align="center" align="right">
                <template slot-scope="scope">
                  <span class="color-orange">{{scope.row.rmb_total_amount}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">

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
            <el-button type="primary" @click="confirm" :disabled="chooseBtnDisable">确 定</el-button>
          </div>
          <!-- <div slot="footer" class="dialog-footer">
  				    <el-button @click="dialogTableVisible = false">取 消</el-button>
  				    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
  				    <el-button type="primary" @click="confirm">确 定</el-button>
  				  </div>   -->
        </el-dialog>
        <el-dialog title="图片" :visible.sync="dialogPicVisible" size="small" v-loading.body="loadingPic">
          <img :src="prePicUrl" style="width:100%;" v-if="prePicUrl">
          <div class="no-pic" v-else>
            图片已损坏
          </div>
        </el-dialog>
        <!--保存提示-->
        <el-dialog title="操作提示" :visible.sync="dialogSaveVisible" size="tiny">
          <div style="padding:20px;">还有{{above_yuan}}元未选择成本结算单，保存后即为多付给对方的款，是否确认保存？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogSaveVisible =false">取 消</el-button>
            <el-button type="primary" @click="saveForm" :disabled="submitBtnDisable">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import { currency_data } from 'src/configuration/currency';
import { addPayment, editPayment, detail, getTuanCost ,getAmountInfo,getPaymentAccount, getSearchOrg} from 'src/api/api';
import SelectOrg from 'src/plugins/SelectOrg.vue';
import { 
  searchPeerAccount
} from 'src/api/invoice';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
export default {
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
    return {
      chooseBtnDisable:false,
      loading:false,
      above_yuan:0,
      dialogSaveVisible:false,
      currency_data,
      loading:false,
      choice:[],
      amount:null,
      loadingPic:false,
      prePicUrl: '',
      dialogPicVisible: false,
      submitBtnDisable: false,
      settlement_org_id: '',
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      ruleForm: {
        settlement_org_id: '',
        settlement_org_name: '',
        currency_rate: 1,
        payment_way: '',
        payment_date: new Date(),
        currency: '人民币',
        payment_account: '',
        receipt_account_name: '',
        receipt_account: '',
        receipt_bank_name: '',
        total_amount: '',
        attachment: [
          // {name: 'food.jpeg', url: '1212'}
        ],
        usa_checked: false,
        tuan: [],
        account_id:''
      },
      searchForm: {
        tuan_no: "",
        bill_id: ""
      },
      rules: {
        settlement_org_id: [
          {required: true, message: '结算方不能为空 '}
        ],
        payment_date: [
          { validator:checkDate, trigger: 'blur' }
        ],
        currency_rate: [
          {type:'number', required: true, message: '请输入汇率', trigger: 'blur' }
        ],
        total_amount: [
          {type:'number', required: true, message: '本次付款金额不能为空 ', trigger: 'blur' },
          { validator:limitMax, trigger: 'change' }
        ],
        account_id: [
          {type:'number',required: true, message: '付款方式/账号不能为空', trigger: 'change' }
        ]
      },
      tableData: [
      ],
      dialogTableVisible: false,
      choose_tuan: [
      ],
      // tuan:[],
      form: {
        tuan_no: '',
        cost_no: ''
      },
      formLabelWidth: '120px',
      peerAccountList: [],
      peerAccountLoading: false,

      checked: [],
      org_info:[]
    };
  },
  components: {
    CurrencyPicker,
    SelectOrg
  },
  computed:{
    isSettlementPayEdit(){
      if(this.$route.query.from == 'fu'){
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
        this.ruleForm.receipt_account = ''
        if(val.org_id) {
          this.getAmountInfo2(val.org_id);
          this.getMatchPeerAccount('');
        } else {
          this.peerAccountList = []
          this.amount = null
        }
      }
    },
  },
  methods: {
    getAmountInfo2(org_id){
      if(!org_id){
        return false;
      }

      let params = {
        data: {
          id: org_id,
          tuan_id: this.tuanId
        }
      };

      this.ruleForm.tuan = []; // org_id变更时清空收入结算单列表
      getAmountInfo({
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
    ruleTo4(){
      if(this.ruleForm.currency_rate>0){
        this.ruleForm.currency_rate= Number(format.toFixed(this.ruleForm.currency_rate, 4)) || '';
      }else{
        this.ruleForm.currency_rate="";
      }

    },
    ruleTo2(){
      this.ruleForm.total_amount= Number(format.toFixed(this.ruleForm.total_amount, 3)) || '';
    },
    to4(id){
      for (let i = 0; i < this.ruleForm.tuan.length; i++) {
        if (this.ruleForm.tuan[i]["bill_id"] == id) {
          if(this.ruleForm.tuan[i]['edit_currency_rate']>0){
            this.ruleForm.tuan[i]['edit_currency_rate']= Number(format.toFixed(this.ruleForm.tuan[i]['edit_currency_rate'], 4)) || '';
          }else{
            this.ruleForm.tuan[i]['edit_currency_rate']="";
          }
          break;
        }
      }
    },
    to2(id){
      for (let i = 0; i < this.ruleForm.tuan.length; i++) {
        if (this.ruleForm.tuan[i]["bill_id"] == id) {
          this.ruleForm.tuan[i]['edit_total_amount']= Number(format.toFixed(this.ruleForm.tuan[i]['edit_total_amount'], 3)) || '';
          break;
        }
      }
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
      //新增汇率币种与前面设置保持一致
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
      // this.chooseBtnDisable=false;

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
    searchTuan() {
      if(this.isSettlementPayEdit && this.ruleForm.settlement_org_id == ''){
        this.$message.error('请先选择结算方');
      }else{
        this.dialogTableVisible = true;
        let select_bill_ids = [];

        this.checked=[];

        for (let i = 0; i < this.ruleForm.tuan.length; i++) {
          select_bill_ids.push(this.ruleForm.tuan[i].bill_id)
        }
        let varsett = this.isSettlementPayEdit ? this.ruleForm.settlement_org_id : this.$route.query.id;
        let params = {
          data: {
            tuan_no: this.searchForm.tuan_no,
            bill_id: this.searchForm.bill_id,
            settlement_org_id: varsett,
            page: this.page,
            page_size: 10,
            select_bill_ids: select_bill_ids
          }
        };
        getTuanCost({
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

      }
    },
    getDetail() {

      let params = {
        data: {
          id: this.$route.query.id
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
            this.settlement_org_id = this.ruleForm.settlement_org_id;
            // this.checked = this.ruleForm.tuan;
          } else {
            this.$message.error(data.msg);

          }
        },
        showLoading: true
      });
    },
    getAmountInfo(){
      let params = {
        data: {
          id: this.$route.query.relate_id?this.$route.query.relate_id:this.$route.query.id
        }
      };
      getAmountInfo({
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
    getMatchPeerAccount(query){
      if(this.isSettlementPayEdit && this.ruleForm.settlement_org_id == ''){
        this.$message.error('请先选择结算方');
      }else{
        let varpeer = this.isSettlementPayEdit ? this.ruleForm.settlement_org_id : this.$route.query.id;
        const data = {bank_name: '', bank_number: query, peer_org_id: varpeer};
        if(varpeer) {
          this.peerAccountLoading = true;
          searchPeerAccount({
            params: {data},
            success: (params)=>{
              let { code, data, msg } = params['data'];
              let list = [];
  
              if(!code){
                list = data;
              }else{
                this.$message({message: msg, type:'error'});
              }
              this.peerAccountList = list;
              this.peerAccountLoading = false;
            }
          });
        }
      }
    },
    saveForm() {
      let attachment = [];

      this.dialogSaveVisible=false;
      this.submitBtnDisable = true;

      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        attachment.push(this.ruleForm.attachment[i].id);
      }

      attachment = attachment.join(",");
      let varid = this.isSettlementPayEdit ? this.ruleForm.settlement_org_id : this.$route.query.id,
        varBankName = '',
        varAccount = '',
        varAccountName = '';
      if(this.peerAccountList.length > 0){
        varBankName = this.peerAccountList[0].bank_name;
        varAccount = this.peerAccountList[0].bank_number;
        varAccountName = this.peerAccountList[0].account_name;
      }
      let action = this.$route.query.action,
        api = [addPayment, editPayment],
        params = {
          data: {
            settlement_org_id: varid,
            id: varid,
            payment_date: format.date(this.ruleForm.payment_date),
            currency: this.ruleForm.currency,
            currency_rate: this.ruleForm.currency_rate,
            total_amount: this.ruleForm.total_amount,
            account_id:this.ruleForm.account_id,
            receipt_account: this.ruleForm.receipt_account,
            attachment: attachment,
            remark: this.ruleForm.remark,
            tuan: this.ruleForm.tuan,
            receipt_bank_name: varBankName,
            receipt_account: varAccount,
            receipt_account_name: varAccountName,
          }
        };

      api[action - 1]({
        params: params,
        success: (params) => {
          let data = params.data,
            _this = this,
            relate_id = this.$route.query.relate_id ? this.$route.query.relate_id : this.$route.query.id;

          if(data.code=='0'){
            this.$message.success(data.msg);
            setTimeout(function () {
              _this.$router.push({ path: '/settlement/pay/fu-list' })
            }, 500);
          }else{
            this.$message.error(data.msg);
            this.submitBtnDisable = false;
          }
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let total=parseFloat(this.claculation(this.ruleForm.currency_rate,this.ruleForm.total_amount)),
              claTotal=0,
              // dis=0,
              tuan=this.ruleForm.tuan;


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
                // tempDis=tuan[i]['rmb_total_amount']-tuan[i]['rmb_payed_amount'],//应收金额本位币-已收金额本位币
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
            this.$message.error('本次付款金额不足以抵扣成本结算单应付款项的本次实付金额（本位币）！请检查金额是否填写正确！');
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
      console.log(file)


      let newImage=new Image(),
          _this=this;

      this.prePicUrl=false;
      this.loadingPic=true;
      this.dialogPicVisible = true;


      newImage.src=file.url;

      newImage.onerror=()=>{
        _this.loadingPic=false;

      }
      newImage.onload = () => { // 图片加载成功后把地址给原来的img
         _this.prePicUrl =newImage.src;
         _this.loadingPic=false;

      }


    },
    beforeUpload(file){
      this.loading=true;

      let isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
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
      console.log(err)
      this.loading=false;
    },
  },
  mounted() {
    this.remoteMethod(true);
    if(!this.isSettlementPayEdit){
      this.getMatchPeerAccount('');
      this.getAmountInfo();
      this.ruleForm.settlement_org_id = this.$route.query.id;
    }else{
      // 付款里面的添加登记付款
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
    }
    if (this.$route.query.action == 2) {
      this.getDetail();
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
  .table-box {
    margin: 20px 20px 0 20px;
    overflow: scroll;
    border: 1px solid #eee;
  }
  .btn-areas {
    width: 112px;
    margin: 0 auto;
    line-height: 45px;
  }
}
.no-pic{
  padding:20px;
  text-align:center;
}

</style>
