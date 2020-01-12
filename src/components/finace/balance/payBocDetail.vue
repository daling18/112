<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">中行转账付款</div>
        <div class="form-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
            <el-form-item label="结算方" prop="settlement_org_id">
              <select-org v-model="orgination" placeholder="请选择结算方" :defaultList="org_info"/>
            </el-form-item>
            <el-form-item label="转账金额" prop="total_amount">
              <el-col :span="17">
                <el-input v-model="ruleForm.total_amount" placeholder="请输入总付款金额" type="number" @blur="ruleTo2()" style="float: left; width: 170px; margin-right: 10px"></el-input>元
              </el-col>
            </el-form-item>
            <el-form-item label="付款人名称" style="margin-bottom: 5px">
              <el-col :span="17">
                {{allData.payment_name}}
              </el-col>
            </el-form-item>
            <el-form-item label="付款账号" style="margin-bottom: 5px">
              <el-col :span="17">
                {{allData.account_no}}
              </el-col>
            </el-form-item>
            <el-form-item label="付款银行" style="margin-bottom: 5px">
              <el-col :span="17">
                {{allData.bank_name}}
              </el-col>
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
                v-if="$menuPermission('api/peeraccount')"
                to="/finace/account/peer"
                target="_blank">
                同行账户
              </router-link>
            </el-form-item>
            <el-form-item label="用途" prop="furinfo">
              <el-input type="textarea" v-model="ruleForm.furinfo"></el-input>
            </el-form-item>
          </el-form>


          <div class="title">选择成本</div>
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
            <div class="btn-areas" v-if="$menuPermission('api/finance/get_tuan_cost')">
              <el-button type="text" @click="chooseBtnDisable=false;choose_tuan=[];checked=[];searchTuan();">选择成本</el-button>
            </div>
          </div>
          <div class="submit-buttons">
            <el-button type="primary" @click="submitForm('ruleForm')" size="large" :disabled="submitBtnDisable">在线转账</el-button>
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
          <div class="dlgZhuanzhang">
            <div class="tit">
              确定发起转账？
            </div>
            <ul class="ul">
              <li>
                <label>转账金额</label>
                {{ruleForm.total_amount}}
              </li>
              <!-- <li>
                <label>收款人名称</label>
                {{ruleForm.total_amount}}
              </li> -->
              <li>
                <label>收款人账户</label>
                {{ruleForm.receipt_account}}
              </li>
              <!-- <li>
                <label>开户行名称</label>
                {{ruleForm.receipt_bank_name}}
              </li> -->
            </ul>
          </div>
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
import {finAddPayment} from 'src/api/finance'
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
      allData: {},
      chooseBtnDisable:false,
      loading:false,
      above_yuan:0,
      dialogSaveVisible: false,
      currency_data,
      loading:false,
      choice:[],
      amount:null,
      loadingPic:false,
      prePicUrl: '',
      dialogPicVisible: false,
      submitBtnDisable: false,
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      ruleForm: {
        settlement_org_id: '',
        settlement_org_name: '',
        currency: '人民币',
        currency_rate: 1,
        total_amount: '',
        type: 2,

        payment_account: '',
        receipt_account_name: '',
        receipt_account: '',
        receipt_bank_name: '',
        attachment: '',
        usa_checked: false,
        tuan: [],
      },
      searchForm: {
        tuan_no: "",
        bill_id: ""
      },
      rules: {
        settlement_org_id: [
          {required: true, message: '结算方不能为空 '}
        ],
        total_amount: [
          {type:'number', required: true, message: '转账金额不能为空 ', trigger: 'blur' },
          { validator:limitMax, trigger: 'change' }
        ],
        receipt_account: [
          {required: true, message: '收款账号不能为空', trigger: 'change' }
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
        this.ruleForm.receipt_account = '';
        if(val.org_id != undefined){
          this.getAmountInfo2(val.org_id);
          this.getMatchPeerAccount(null,'init');
        }else{
          this.peerAccountList = []
        }
      }
    },
  },
  methods: {
    init(){
      let params = {
        data: {
          is_boc: 1
        }
      };
      getPaymentAccount({
        params: params,
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.allData = data.data;
          } else {
            this.$message.error(data.msg);
          }
        }
      });
      // 结算方初始数据请求
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
    },
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
      if(this.ruleForm.settlement_org_id == ''){
        this.$message.error('请先选择结算方');
      }else{
        this.dialogTableVisible = true;
        let select_bill_ids = [];

        this.checked=[];

        for (let i = 0; i < this.ruleForm.tuan.length; i++) {
          select_bill_ids.push(this.ruleForm.tuan[i].bill_id)
        }

        let params = {
          data: {
            tuan_no: this.searchForm.tuan_no,
            bill_id: this.searchForm.bill_id,
            settlement_org_id: this.ruleForm.settlement_org_id,
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
    getMatchPeerAccount(query,status){
      if(this.ruleForm.settlement_org_id == ''){
        this.$message.error('请先选择结算方');
      }else if(this.ruleForm.settlement_org_id == undefined){
        return false;
      }else{
        const data = {bank_name: '', bank_number: query, peer_org_id: this.ruleForm.settlement_org_id};
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
            if(status == 'init'){
              let list2 = list.filter(v=>v.type == 2);
              if(list2.length > 0){
                this.ruleForm.receipt_account = list2[0].bank_number;
              }else{
                let list3 = list.filter(v=>v.type == 1);
                if(list3.length > 0){
                  this.ruleForm.receipt_account = list[0].bank_number;
                }
              }
            }
          }
        });
      }
    },
    saveForm() {
      // let attachment = [];

      this.dialogSaveVisible=false;
      this.submitBtnDisable = true;

      // for (let i = 0; i < this.ruleForm.attachment.length; i++) {
      //   attachment.push(this.ruleForm.attachment[i].id);
      // }
      // attachment = attachment.join(",");
      this.ruleForm.receipt_bank_name= this.peerAccountList[0].bank_name;
      this.ruleForm.receipt_account= this.peerAccountList[0].bank_number;
      this.ruleForm.receipt_account_name= this.peerAccountList[0].contract_name;
      let params = {
          data: this.ruleForm
        };

      finAddPayment({
        params: params,
        success: (params) => {
          let data = params.data,
            _this = this;

          if(data.code=='0'){
            this.$message.success(data.msg);
            setTimeout(function () {
              _this.$router.push({ path: '/finace/paymentList', query: {} })
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
          this.dialogSaveVisible=true;
          this.submitBtnDisable=false;


          // let tuan=this.ruleForm.tuan;
          // for(let i=0;i<tuan.length;i++){

          //   if(!tuan[i]['edit_total_amount']){
          //     this.$message.error('第'+(i+1)+'个付款金额不能为0或空');
          //     return false;
          //   }
          //   if(!tuan[i]['edit_currency_rate']){
          //     this.$message.error('第'+(i+1)+'个汇率不能为0或空');
          //     return false;
          //   }
          //   let tempCla=parseFloat(this.claculation(tuan[i]['edit_currency_rate'],tuan[i]['edit_total_amount']));

          //   claTotal+=parseFloat(tempCla);
          // }
          // if(total>claTotal){
          //   this.above_yuan=(total*1000-claTotal*1000)/1000;
          //   this.dialogSaveVisible=true;
          //   this.submitBtnDisable=false;
          // }else if(total==claTotal){
          //   this.saveForm();
          // }else{
          //   this.$message.error('本次付款金额不足以抵扣成本结算单应付款项的本次实付金额（本位币）！请检查金额是否填写正确！');
          //   // 本次收款金额不足以抵扣收入结算单应收款项中填写的已收款金额！请检查金额是否填写正确！
          //   return false;
          // }
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
    this.init();
    // this.remoteMethod(true);
      // this.getMatchPeerAccount('');
      // this.getAmountInfo();

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
.dlgZhuanzhang{
  padding:10px;
  .tit{
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
  .ul{
    padding: 0 20px;
  }
  li{
    padding: 0 0 10px 80px;
    overflow: hidden;
  }
  label{
    float: left;
    width: 80px;
    margin-left: -80px;
    color: #aaa;
  }
}
</style>
