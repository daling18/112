<template>
  <div  class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li @click="goto('/fund-settlement',{})">同行结算</li>
        <li  class="on">直客结算</li>
        <!-- <router-link  v-if="orgtype != 1 && orgtype != 0" :to="{path: '/channel-settlement'}" tag="li">渠道结算</router-link> -->
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">结算状态</div>
        <el-select v-model="searchData.status" placeholder="请选择结算状态">
          <el-option label="全部" value="0"></el-option>
          <el-option label="已结清" value="1"></el-option>
          <el-option label="未结清" value="-1"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">团号/应收</div>
        <el-input v-model="searchData.tuan_no" placeholder="团队编号/应收ID"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getCustomerSettlementList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-title">
        <table class="total">
          <tr>
            <td>余额&ensp;<span class="color-orange">￥</span><span class="color-orange">{{fund_balance}}</span>&ensp;元 
              <!-- <router-link class="deal-line" v-if="$menuPermission('api/finance/get_balance_detail_list')" :to="{path: '/deal-list-dir'}">交易记录</router-link> -->
            </td>
            <td>已收款&ensp;<span class="color-orange">￥</span><span class="color-orange">{{all_fu_total}}</span>&ensp;元</td>
            <td>剩余应收款&ensp;<span class="color-green">￥</span><span class="color-green">{{all_shou_total}}</span>&ensp;元</td>
          </tr>
        </table>
      </div>
      <div class="content-list">
        <el-table
          :data="tableData"
          style="width: 100%"
          class="el-table--middle"
          border
          >
          <el-table-column
            prop="order_no"
            label="订单号"
            align="center"
            width="180"
                :resizable="false"
            >
            <template slot-scope="scope">
              <router-link :to="'/fund-settlement/order-details/'+scope.row.resource_id+'/'+scope.row.order_id">{{scope.row.order_no}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="团队编号"
            align="left"
            prop="tuan_no"
            width="200"
                :resizable="false"
            >
            <template slot-scope="scope">
              <!-- <router-link :to="'control/bill/'+scope.row.id">{{scope.row.tuan_no}}</router-link> -->
              <router-link :to="{path:'/fund-settlement/bill',query:{id:scope.row.resource_id}}">{{scope.row.tuan_no}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="应收ID"
            align="center"
            prop="bill_id"
            width="100"
                :resizable="false"
            >
          </el-table-column>
          <el-table-column
            label="应收金额（本位币）"
            align="right"
            width="160"
                :resizable="false"
            >
            <template slot-scope="scope">￥{{scope.row.rmb_receipt_amount}}</template>
          </el-table-column>
          <el-table-column
            label="已收金额"
            align="right"
                :resizable="false"
            >
            <template slot-scope="scope">￥{{scope.row.rmb_receipted_amount}}</template>
          </el-table-column>
          <el-table-column
            label="结算状态"
            align="center"
            prop="status"
                :resizable="false"
            >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="120"
                :resizable="false"
            >
            <template slot-scope="scope">
              <template v-if="scope.row.rmb_receipt_amount==scope.row.rmb_receipted_amount">
                <a href="javascript:;"  v-if="$menuPermission('api/zhike/customer_payment_list')"  @click="goto('/dire-list',{id:scope.row.id})">收款记录</a>
              </template>
              <template v-else-if="!scope.row.have_payment">
                <a href="javascript:;" v-if="$menuPermission('api/zhike/add_customer_payment')" @click="gain(scope.row.id)" >添加收款</a>
              </template>
              <template v-else>
                <a href="javascript:;" v-if="$menuPermission('api/zhike/add_customer_payment')" @click="gain(scope.row.id)">添加收款</a><br>
                <a href="javascript:;" v-if="$menuPermission('api/zhike/customer_payment_list')" @click="goto('/dire-list',{id:scope.row.id})">收款记录</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="totalPage">
      </el-pagination>
    </div>
    <el-dialog title="添加收款" :visible.sync="dialogTableVisible" size="small" :close-on-click-modal="false">
      <div class="form-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
        <el-form-item label="收款单号" v-if="ruleForm.payment_no">
          <el-col :span="17">
            {{ruleForm.payment_no}}
          </el-col>
        </el-form-item>
        <el-form-item label="历史已收金额">
          <el-col :span="17">
            <span v-if="amount" class="color-orange">{{amount.history_receipt_amount}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="剩余应收金额">
          <el-col :span="17" v-if="amount">
            <span v-if="amount" class="color-orange">{{amount.remain_receipt_amount}}</span>
          </el-col>
        </el-form-item>
        <el-form-item prop="payment_date" label="收款日期">
          <el-col :span="17">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.payment_date" :editable="false"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="本次收款金额" required class="mb0">
          <el-form-item prop="total_amount" class="ip1">
            <el-input v-model="ruleForm.total_amount" placeholder="总付款金额" type="number" @blur="ruleTo2()"></el-input>
          </el-form-item>
          <currency-picker
            class="ip2"
            v-model="ruleForm.currency"
            placeholder="选择货币"
            readonly="readonly">
          </currency-picker>
					<el-form-item prop="currency_rate" class="ip3">
            <el-input v-model="ruleForm.currency_rate" placeholder="汇率" type="number" @blur="ruleTo4()"></el-input>
					</el-form-item>
        </el-form-item>
        <el-form-item label="本次收款金额（本位币）">
          <template v-if="ruleForm.currency_rate&&ruleForm.total_amount">
            {{claculation(ruleForm.currency_rate,ruleForm.total_amount)}}
          </template>
          <template v-else>--</template>
        </el-form-item>
          <el-form-item label="收款方式／账号" prop="account_id">
          <el-select v-model="ruleForm.account_id" filterable placeholder="请选择">
            <el-option
              v-for="item in choice"
              :key="item.id"
              :label="item.account_info"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传收款凭证" prop="attachment">
          <el-col :span="24">
            <div class="hide-list"  v-loading.body="loading">
              <el-upload class="upload-demo" action="/bom/api/finance/upload_img" name="image[]" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="ruleForm.attachment" :on-success="uploadsucc"  :before-upload="beforeUpload">
                <el-button size="small">选择本地文件</el-button>
                <span slot="tip" class="el-upload__tip">&ensp;仅支持jpeg、png、jpg、pdf格式，不可超过10份</span>
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
      </div>
      <div slot="footer">
        <el-button type="primary" @click=" submitForm('ruleForm')" :disabled="submitBtnDisable">保存</el-button>
        <el-button @click="cancelForm('ruleForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import { currency_data } from 'src/configuration/currency';
import {getCustomerSettlementList,getCustomerAmount,getPaymentAccount,addCustomerPayment}from 'src/api/api'
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
export default {
  name: 'setting',
  data () {
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
      orgtype: localStorage.getItem('orgtype'),
      loading:false,
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
          { type:'number', required: true, message: '请输入汇率', trigger: 'blur' }
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
          {type:'number', required: true, message: '请输入总收款金额', trigger: 'blur' },
          { validator:limitMax, trigger: 'change' }
        ]
      },
      dialogTableVisible:false,
      totalPage: 1,
      currentPage:1,
      page:1,
      pageShow:true,
      searchDataOrigin: {
        tuan_no: this.$route.query.tuan_no,
        status: this.$route.query.status
      },
      searchData: {
          tuan_no: "",
          status:""
      },
      fund_balance: 0,
      all_fu_total:0,
      all_shou_total:0,
      fund_balance:0,
      tableData: [
      ]
    }
  },
  components: {
    CurrencyPicker
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveForm();
          this.$refs[formName].resetFields();
        } else {
           console.log('error submit!!');
          return false;
        }
      });
    },
    cancelForm(formName){
      this.dialogTableVisible = false;
      this.$refs[formName].resetFields();
    },
    saveForm() {
      let attachment = [];

      this.submitBtnDisable = true;
      for (let i = 0; i < this.ruleForm.attachment.length; i++) {
        attachment.push(this.ruleForm.attachment[i].id);
      }

      attachment = attachment.join(",");
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

      addCustomerPayment({
        params: params,
        success: (params) => {
          let data = params.data,
            _this = this,
            relate_id = this.$route.query.relate_id ? this.$route.query.relate_id : this.$route.query.id;

          if(data.code=='0'){
            this.$message.success(data.msg);
            this.submitBtnDisable = false;
            this.dialogTableVisible=false;
            _this.getCustomerSettlementList();
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
      gain(id){
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

        this.getCustomerAmount(id);
        this.dialogTableVisible=true;
      },
      handleCurrentChange(val){
          this.page=val;
          this.getCustomerSettlementList();
      },
      goto(path,query){
          this.$router.push({
              path:path,
              query:query
          });
      },
      getCustomerSettlementList(bool){
      if (bool) {
          this.totalPage=1;
          this.currentPage= 1;
          this.page=1;
          this.searchDataOrigin.tuan_no = this.searchData.tuan_no || '';
          this.searchDataOrigin.status = this.searchData.status || '';
      }else{
        this.searchData.tuan_no = this.searchDataOrigin.tuan_no;
        this.searchData.status = this.searchDataOrigin.status;
      }

  		let params={
  			data: {
			    tuan_no: this.searchData.tuan_no,
			    status: this.searchData.status,
			    page:this.page,
			    page_size:10
			}
  		};
  		getCustomerSettlementList({
          params:params,
          success:(params) => {
          let data=params.data;
            if(data.code=='0'){
              this.fund_balance=data.data.fund_balance;
              this.all_fu_total=data.data.history_amount;
              this.all_shou_total=data.data.remain_amount;
              this.fund_balance=data.data.fund_balance;
              this.tableData=data.data.list;
              this.totalPage=data.data.total_page;
              this.currentPage=data.data.page_index;
            }else{
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
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
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading=false;
        return false;
      }

      return isLt2M;
    },
    uploadsucc(response, file, fileList) {
      if(response.code==0){
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
    confirm(){
      this.dialogTableVisible=false;
    }
  },
  mounted(){
    this.remoteMethod()
      this.getCustomerSettlementList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .deal-line {
    color: #b10c79;
    border: #b10c79 solid 1px;
    margin-left: 10px;
    padding: 3px 5px;
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
.mb0{
  margin-bottom: 0!important;
}
.ip1{
  display: inline-block;
	width: 110px;
	margin-right: 10px;
}
.ip2{
  width: 160px!important;
}
.ip3{
	display: inline-block;
  width: 69px;
  margin-bottom: 0;
}
</style>
