<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">直客结算收款记录</li>
      </ul>
      <template v-if="$menuPermission('api/zhike/add_customer_payment')">
        <div class="btn" v-if="bill_info&&bill_info.status!='已结清'"><el-button type="primary" @click="gain">+ 添加收款</el-button></div>
      </template>
    </div>
    <div class="system-header">
      <el-row>
        <el-col :span="6">
          订单号&ensp;{{ bill_info.order_no }}
        </el-col>
        <el-col :span="4">
          结算状态&ensp;{{ bill_info.status }}
        </el-col>
        <el-col :span="7">
          剩余应收款（本位币）&ensp;
          <span class="color-orange">￥</span>
          <span class="color-orange">{{ bill_info.remain_amount }}</span>&ensp;元
        </el-col>
        <el-col :span="7">
          已收款（本位币）&ensp;
          <span class="color-orange">￥</span>
          <span class="color-orange">{{ bill_info.rmb_receipted_amount }}</span>&ensp;元
        </el-col>
      </el-row>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="createTime" label="创建日期" @change="handleChangeCreateTime"/>
      <search-item-date-range v-model="paymentDate" label="收款日期" @change="handleChangePaymentDate"/>
      <div class="search-item">
        <div class="label">收款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="请选择团队状态">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :label="val" :value="key" :key="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">收款金额</div>
        <input-number  v-model="searchInput.rmb_total_amount" number :precision="3" placeholder="收款金额" />
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">收款ID</div>
        <el-input placeholder="收款ID" v-model="searchInput.payment_id"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list" style="margin-top:15px;">
        <receive-table
          :data-list="tableData"
          :edit-map="EDIT_MAP"
          top-menu-const="finance"
          :parent-id="$route.query.parent_id"
          prefix="/fund-settlement/"
          @success="getCustomerPaymentList()"
        >
          <el-table-column prop="id" label="收款ID" align="center" width="100" :resizable="false"/>
          <el-table-column prop="rmb_total_amount" label="收款金额" align="center" width="120" :resizable="false">
            <template slot-scope="scope">
              <div class="tar color-orange">￥{{ scope.row.rmb_total_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="payment_date" label="收款日期" align="center" width="100" :resizable="false"/>
          <el-table-column prop="account_type_str" label="收款方式账号" align="center" min-width="160" :resizable="false">
            <template slot-scope="scope">
              {{ scope.row.account_type_str }} / {{ scope.row.account_no }}
            </template>
          </el-table-column>
          <el-table-column prop="user_name" label="操作人" align="center" min-width="100" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" align="center" width="140" :resizable="false"/>
          <el-table-column label="状态" align="center" width="90" :resizable="false">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status | getStatusColor">{{ PAYMENT_STATUS_MAP[scope.row.payment_status] }}</span>
            </template>
          </el-table-column>
        </receive-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="searchData.page"
        :page-count="totalPage"/>
    </div>
    <el-dialog title="添加收款" :visible.sync="dialogTableVisible" top="10%" size="small">
      <div class="form-content">
        <el-form 
          :model="ruleForm" 
          :rules="rules" 
          ref="ruleForm" 
          label-width="170px" 
          class="demo-ruleForm">
          <el-form-item label="收款单号" v-if="ruleForm.payment_no">
            <el-col :span="17">
              {{ ruleForm.payment_no }}
            </el-col>
          </el-form-item>
          <el-form-item label="历史已收金额" class="mb0">
            <el-col :span="17">
              <span v-if="amount" class="color-orange">{{ amount.history_receipt_amount }}</span>
            </el-col>
          </el-form-item>
          <el-form-item label="剩余应收金额" class="mb0">
            <el-col :span="17" v-if="amount">
              <span v-if="amount" class="color-orange">{{ amount.remain_receipt_amount }}</span>
            </el-col>
          </el-form-item>
          <el-form-item prop="payment_date" label="收款日期">
            <el-col :span="17">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.payment_date" :editable="false"/>
            </el-col>
          </el-form-item>
          <el-form-item label="本次收款金额" class="mb0" required>
            <el-col :span="8">
              <el-form-item prop="total_amount">
                <input-number  v-model="ruleForm.total_amount" placeholder="请输入总付款金额" :precision="3" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="currency" style="padding: 1px 5px 0">
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
                <currency-picker v-model="ruleForm.currency" placeholder="选择货币" readonly="readonly"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="currency_rate">
                <input-number  v-model="ruleForm.currency_rate" placeholder="汇率" :precision="4" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="本次收款金额（本位币）" class="mb0">
            <template v-if="ruleForm.currency_rate&&ruleForm.total_amount">
              {{ claculation(ruleForm.currency_rate,ruleForm.total_amount) }}
            </template>
            <template v-else>--</template>
          </el-form-item>
          <el-form-item label="收款方式／账号" prop="account_id">
            <el-select v-model="ruleForm.account_id" filterable placeholder="请选择">
              <el-option
                v-for="item in choice"
                :key="item.id"
                :label="item.account_info"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="上传收款凭证" prop="attachment">
            <el-col :span="24">
              <div class="hide-list" v-loading.body="loading">
                <el-upload class="upload-demo" action="/bom/api/finance/upload_img" name="image[]" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.attachment" :on-success="uploadsucc" :before-upload="beforeUpload">
                  <el-button size="small">选择本地文件</el-button>
                  <span slot="tip" class="el-upload__tip">&ensp;仅支持jpeg、png、jpg、pdf格式，不可超过10份</span>
                </el-upload>
              </div>
              <ul class="el-upload-list el-upload-list--text" v-if="ruleForm.attachment.length>0">
                <li class="el-upload-list__item is-success" v-for="file in ruleForm.attachment">
                  <a class="el-upload-list__item-name" :href="file.url" target="_blank">
                    <i class="el-icon-document"/>{{ file.name }}
                  </a>
                  <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-circle-check"/>
                  </label><i class="el-icon-close" @click="diyRemove(file.id)"/>
                </li>
              </ul>
            </el-col>

          </el-form-item>
          <el-form-item label="备注" prop="remark" class="mb0">
            <el-input type="textarea" v-model="ruleForm.remark"/>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="submitBtnDisable">保存</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="操作提示" :visible.sync="dialogCancelVisible">
      <el-form :model="cancel_form">
        <el-form-item label="撤销说明" :label-width="formLabelWidth" required>
          <el-input type="textarea" v-model="cancel_form.cancel_info" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="提示" :label-width="formLabelWidth" required>
          <span style="color:red;">撤销后该记录就无法恢复</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogCancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancel_action" :disabled="btn_disable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import { currency_data } from 'src/configuration/currency';
import {getCustomerPaymentList,getCustomerAmount,getPaymentAccount,addCustomerPayment,editCustomerPayment,customerPaymentDetail,paymentCancel,cancelInfo}from 'src/api/api';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import InputNumber from 'src/plugins/InputNumber.vue';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import ReceiveTable from 'src/components/sale/ReceiveTable.comp'

export default {
  name: 'Setting',
  components: {
    CurrencyPicker,
    SearchItemDateRange,
    InputNumber,
    ReceiveTable
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 3: 
      case 5: 
        return 'color-red';
      case 2: 
        return 'color-green';
      case 1:
      case 4:
        return 'color-gray';
      default:
        return '';
      }
    }
  },
  data () {
    const {query} = this.$route;
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
        callback(new Error('请输入正数'));
      }else{
        callback();
      }
    };
    return {
      loading:false,
      btn_disable:false,
      dialogRecordVisible:false,
      dialogCancelVisible:false,
      cancel_record_data:null,
      cancel_form:{
        cancel_info:'',
      },
      row:null,
      formLabelWidth:'100px',
      createTime: [query.create_time_start, query.create_time_end],
      paymentDate: [query.payment_date_start, query.payment_date_end],
      searchInput:{
      },
      searchData: {
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        payment_date_start: query.payment_date_start || '',
        payment_date_end: query.payment_date_end || '',
        payment_status: query.payment_status || '',
        user_name: query.user_name || '',
        payment_id: query.payment_id || '',
        rmb_total_amount: query.rmb_total_amount || '',
        id: query.id ||  this.$route.query.id,
        page: parseInt(query.page) || 1
      },
      totalPage: parseInt(query.page) || 1,
      PAYMENT_STATUS_MAP: {},
      EDIT_MAP: {},
      currency_data,
      id:'',
      submitBtnDisable:false,
      amount:null,
      choice:[],
      ruleForm: {
        currency_rate: '',
        payment_date: '',
        currency: '',
        total_amount: '',
        attachment: [],
        account_id:'',
        remark:''
      },
      rules: {
        payment_date: [
          { validator:checkDate, trigger: 'blur' }
        ],
        currency_rate: [
          { required: true, message: '请输入汇率', trigger: 'blur', type: 'number' }
        ],
        account_id:[
          { required: true, message: '请选择收款方式／账号'}
        ],
        // payment_way: [
        //   { required: true, message: '请选择收款方式', trigger: 'change' }
        // ],
        // payment_date: [
        //   { type: 'date', required: true, message: '请选择到账日期', trigger: 'change' }
        // ],
        // currency: [
        //   {required: true, message: '请选择币种', trigger: 'change' }
        // ],
        total_amount: [
          {required: true, message: '请输入总收款金额', trigger: 'blur', type: 'number' },
          { validator:limitMax, trigger: 'change' }
        ]
      },
      dialogTableVisible:false,
      pageShow:true,
      // searchData: {
      //   tuan_no: this.$route.query.tuan_no || "",
      //   status: this.$route.query.status || "",
      // },
      bill_info: {},
      tableData: [
      ],
      type:'',
      attachments: ''
    };
  },
  computed:{
    dialogAttachmentVisible: {
      get: function(){
        return Array.isArray(this.attachments);
      },
      set: function(val){
        if(val == false){
          this.attachments = '';
        }
      }
    },
  },
  mounted(){
    this.remoteMethod();
    this.getCustomerPaymentList();
  },
  methods:{
    handleChangeCreateTime(date) {
      this.searchInput.create_time_start = date[0] || '';
      this.searchInput.create_time_end = date[1] || '';
    },
    handleChangePaymentDate(date) {
      this.searchInput.payment_date_start = date[0] || '';
      this.searchInput.payment_date_end = date[1] || '';
    },
    handleSearch(){
      this.getCustomerPaymentList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.paymentDate = [this.searchData.payment_date_start, this.searchData.payment_date_end];
        this.getCustomerPaymentList();
        this.$router.replace({query: this.searchData});
      }
    },
    customerPaymentDetailHandler(id){
      let params={
        data: {
          id:id,
        }
      };
      customerPaymentDetail({
        params:params,
        success:(params) => {
          let data=params.data;
          if(data.code=='0'){
            this.ruleForm=data.data;
            this.ruleForm.attachment == '' ? this.ruleForm.attachment = [] : this.ruleForm.attachment;
          }else{
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveForm();
        } else {
           console.log('error submit!!');
          return false;
        }
      });
    },
    saveForm() {
      let attachment = [],
        api='';

      if(this.type=='gain'){
        api=addCustomerPayment;
      }else if(this.type=='edit'){
        api=editCustomerPayment;
      }else{
        this.$message.error('非法访问');
      }

      this.submitBtnDisable = true;
      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        attachment.push(this.ruleForm.attachment[i].id);
      }

      attachment = attachment.join(',');
      let action = this.$route.query.action,
        // api = [addReceipt, editReceipt],
        params = {
          data: {
            id: this.id,
            payment_date: format.date(this.ruleForm.payment_date),
            currency: this.ruleForm.currency,
            currency_rate: this.ruleForm.currency_rate,
            total_amount: this.ruleForm.total_amount,
            account_id:this.ruleForm.account_id,
            attachment: attachment,
            remark: this.ruleForm.remark
          }
        };

      api({
        params: params,
        success: (params) => {
          let data = params.data,
            _this = this,
            relate_id = this.$route.query.relate_id ? this.$route.query.relate_id : this.$route.query.id;

          if(data.code=='0'){
            this.$message.success(data.msg);
            this.submitBtnDisable = false;
            this.dialogTableVisible=false;
            _this.getCustomerPaymentList();
          }else{
            this.$message.error(data.msg);
            this.submitBtnDisable = false;
          }
        },
        showLoading: true
      });
    },
    remoteMethod(){
      let params = {
        data: {

        }
      };
      getPaymentAccount({
        params: params,
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            let arr=data.data.list;

            this.choice=arr.map(function(a){
              return {id:a.id,account_info:a.account_type_str+'-'+a.account_no};
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
        dis1=len1-pos1-1;
      }
      if(pos2!=-1){
        dis2=len2-pos2-1;
      }

      return Number(format.toFixed((join1*join2)/(Math.pow(10,dis1)*Math.pow(10,dis2)), 3));

    },
    getCustomerAmount(id){
      let params = {
        data: {
          id: id
        }
      };
      getCustomerAmount({
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
    gain(){
      let id=this.$route.query.id;

      this.ruleForm={
        currency_rate: 1,
        payment_date: new Date(),
        currency: '人民币',
        total_amount: '',
        attachment: [],
        account_id:'',
        remark:''
      },
      this.id=id;
      this.type='gain';

      this.getCustomerAmount(id);
      //  console.log("refs", this.$refs);
      if(this.$refs['ruleForm']){
        this.$refs['ruleForm'].resetFields();
      }
      this.dialogTableVisible=true;
    },
    edit(id){
      this.ruleForm={
        currency_rate: '',
        payment_date: '',
        currency: '',
        total_amount: '',
        attachment: [],
        account_id:'',
        remark:''
      },
      this.id=id;
      this.type='edit';
      this.customerPaymentDetailHandler(id);
      this.getCustomerAmount(this.$route.query.id);
      this.dialogTableVisible=true;
    },
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    getCustomerPaymentList(isSearch){
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }

      getCustomerPaymentList({
        params: {data: this.searchData},
        success:(params) => {
          let data=params.data;
          if(data.code=='0'){
            this.bill_info=data.data.bill_info || {};
            this.tableData=data.data.list;
            this.PAYMENT_STATUS_MAP=data.data.payment_status;
            this.EDIT_MAP = data.data.edit_arr;
            this.totalPage=data.data.total_page;
            this.searchData.page=data.data.page_index;
            this.pageShow = data.total_page > 0;
          }else{
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        if (this.ruleForm.attachment[i]['id'] == file.id) {
          this.ruleForm.attachment.splice(i, 1);
          return false;
        }

      }
    },
    diyRemove(id){
      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        if (this.ruleForm.attachment[i]['id'] == id) {
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
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading=false;
        return false;
      }

      return isLt2M;
    },
    uploadsucc(response, file, fileList) {
      if(response.code==0){
        if(this.ruleForm.attachment.length==10){
          this.$message.error('上传凭证数量不可超过十份');
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
    confirm(){
      this.dialogTableVisible=false;
    },
    cancel_dialog(row){
      this.cancel_form.cancel_info='';
      this.dialogCancelVisible=true;
      this.row=row;
    },
    cancel_action(row){
      if(!this.cancel_form.cancel_info){
        this.$message.error('请填写撤销说明');
        return false;
      }
      this.btn_disable=true;

      let params={
        data:{
          payment_id:this.row.id,
          info:this.cancel_form.cancel_info
        }
      };
      paymentCancel({
        params: params,
        success: (params) => {
          let data = params.data;
          // this.loading = false;

          if (data.code == '0') {
            this.$message.success(data.msg);
            this.dialogCancelVisible=false;
            this.getCustomerPaymentList();
          } else {
            this.$message.error(data.msg);

          }
          this.btn_disable=false;
        },
        showLoading: true
      });
    },
    cancel_record(id){
      let params={
          data:{
            id:id,
          }
        },_this=this;
      cancelInfo({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == '0') {
            this.dialogRecordVisible=true;
            this.cancel_record_data=data.data;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    showdDialogAttachment: function(attachments){
      this.attachments = attachments;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .system-header {
    margin-bottom: 10px; 
    padding: 15px;
    background: #fff;
  }
  .content-list{

    .table-title{
      height:36px;
      margin:16px 0 10px 0;



      .btn-areas{
         float:right;
      }
    }

  }
  .form-content {

  .el-form {

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
.el-dialog__body{
  padding-top: 0;
}
.el-dialog__footer{
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
