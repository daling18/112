<template>
  <div class="cont">
    <div class="panel" v-if="type == 1">
      <div class="hd">
        <h2>订单信息</h2>
      </div>
      <div class="bd">
        <el-table
          ref="orderTable"
          class="el-table--middle" 
          :data="table"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" v-if="type != 1"/>
          <el-table-column
            header-align="center"
            align="right"
            prop="rmb_total_amount"
            width="80px"
            label="订单金额"
            >
            <template slot-scope="scope">
              <div class="color-orange">{{ scope.row.rmb_total_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="item_name"
            label="收入项名称"/>
          <el-table-column
            header-align="center"
            align="center"
            label="项目号（团号）／项目名称">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.tuan_name">
                <span v-if="scope.row.product_id == ''">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</span>
                <router-link v-else :to="{path: 'trip-detail', query: {id: scope.row.product_id}}">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="item_no"
            label="订单号">
            <template slot-scope="scope">
              <router-link v-if="scope.row.order_id" :to="{path: `order-detail/${scope.row.resource_id}/${scope.row.order_id}`}">{{scope.row.item_no}}</router-link>
              <router-link v-else :to="{path: 'income-detail', query: {bid: scope.row.bills_id}}">{{scope.row.item_no}}</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="panel">
      <div class="hd">
        <h2>开票信息</h2>
      </div>
      <div class="channel-content">
        <el-form label-position="right" label-width="200px" >
          <el-form-item label="开票金额" required>
            <div class="info">{{ info.amount }}</div>
          </el-form-item>
          <el-form-item label="发票抬头" required>
            <el-input v-if="zhike" v-model="info.raised_org_name" placeholder="输入发票抬头"></el-input>
            <el-select
              v-else
              v-model="selectBillsOrg"
              filterable
              remote
              clearable
              value-key="distributor_org_id"
              :loading="billsOrgLoading"
              :remote-method="getMatchBillsOrg"
              placeholder="输入发票抬头进行搜索"
              :disabled="type == 1"
              @change="handleSelectBillsOrg">
              <el-option
                v-for="(item, idx) in billsOrgList"
                :key="idx"
                :label="item.distributor_org_name"
                :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="纳税人识别号">
            <el-input v-model="info.taxpayer_num" placeholder="纳税人识别号"/>
          </el-form-item>
          <el-form-item v-if="!zhike" label="开户行及账号" style="white-space: nowrap;">
            <el-select
              v-model="selectPeerAccount"
              filterable
              remote
              clearable
              value-key="id"
              :loading="peerAccountLoading"
              :remote-method="getMatchPeerAccount"
              placeholder="输入开户行进行搜索"
              @change="handleSelectPeerAccount">
              <el-option
                v-for="item in peerAccountList"
                :key="item.id"
                :label="item.bank_name + ' - ' + item.bank_number"
                :value="item"/>
            </el-select>
            <router-link v-if="$menuPermission('api/peeraccount')" class="color-purple" to="/finace/account/peer" target="_blank">同行账户</router-link>
          </el-form-item>
          <el-form-item label="开票日期" required>
            <el-date-picker
              v-model="info.invoice_date"
              type="date"
              placeholder="选择日期"/>
          </el-form-item>
          <el-form-item label="经手人" required>
            <div class="info">{{ info.operater_name }}</div>
          </el-form-item>
          <el-form-item label="开票方开户行及账户" required style="white-space: nowrap;">
            <el-select
              v-model="selectAccount"
              filterable
              remote
              clearable
              value-key="id"
              :loading="accountLoading"
              :remote-method="getMatchAccount"
              placeholder="输入开户行进行搜索"
              @change="handleSelectAccount">
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.bank_name + ' - ' + item.account_no"
                :value="item"/>
            </el-select>
            <router-link v-if="$menuPermission('api/finance/get_payment_account_list')" class="color-purple" to="/finace/account/company" target="_blank">公司账户</router-link>
          </el-form-item>
          <el-form-item label="发票号码">
            <el-input v-model="info.invoice_number" placeholder="发票号码"/>
          </el-form-item>
          <el-form-item label="发票图片">
            <div>
              <el-upload
                action="/bom/api/invoice/upload_invoice"
                name="file"
                list-type="picture"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="uploadFiles"
                :on-success="handleUploadsucc"
                :before-upload="handleBeforeUpload"
              >
                <el-button type="primary">选择本地文件</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="发票代码">
            <el-input v-model="info.code" placeholder="发票代码"/>
          </el-form-item>
          <el-form-item label="开票内容">
            <el-input v-model="info.content" placeholder="开票内容"/>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="panel" v-if="type != 1">
      <div class="hd">
        <h2>订单信息</h2>
      </div>
      <div class="bd">
        <el-table
          ref="orderTable"
          class="el-table--middle" 
          :data="table"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" v-if="type != 1"/>
          <el-table-column
            header-align="center"
            align="right"
            prop="rmb_total_amount"
            width="80px"
            label="订单金额"
            >
            <template slot-scope="scope">
              <div class="color-orange">{{ scope.row.rmb_total_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="item_name"
            label="收入项名称"/>
          <el-table-column
            header-align="center"
            align="center"
            label="项目号（团号）／项目名称">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.tuan_name">
                <span v-if="scope.row.product_id == ''">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</span>
                <router-link v-else :to="{path: 'trip-detail', query: {id: scope.row.product_id}}">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="item_no"
            label="订单号">
            <template slot-scope="scope">
              <router-link v-if="scope.row.order_id" :to="{path: `order-detail/${scope.row.resource_id}/${scope.row.order_id}`}">{{scope.row.item_no}}</router-link>
              <router-link v-else :to="{path: 'income-detail', query: {bid: scope.row.id}}">{{scope.row.item_no}}</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="btn-wrap">
      <el-button size="large" type="primary" @click="handleAddInvoice">保存</el-button>
      <el-button size="large" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import {
  addIncome, 
  saleaddIncome, 
  todoAddIncome, 
  saletodoAddIncome,
  addOrderInvoice,
  saleAddOrderInvoice,
  todoAddOrderInvoice,
  saleTodoAddOrderInvoice,
  searchBillsOrg, 
  orgIncomeLists,
  saleOrgIncomeLists,
  searchAccount, 
  searchPeerAccount
} from 'src/api/invoice';

import {formattDate} from 'src/assets/js/common.js';

export default {
  data() {
    return {
      type: this.$route.query.type,
      billsOrgList: [],
      selectBillsOrg: {},
      billsOrgLoading: false,
      accountList: [],
      selectAccount: {},
      accountLoading: false,
      peerAccountList: [],
      selectPeerAccount: {},
      peerAccountLoading: false,
      uploadFiles: [],
      info: {
        amount: 0, //金额
        item_name: '', //项目名称
        tuan_no: '', //团号
        tuan_name: '',//团名
        item_no: '',//订单号或账单号
        invoice_amount: 0,//发票金额
        taxpayer_num: '',//纳税人识别号
        raised_org_id: 0,//发票抬头组织ID
        raised_org_name: '',//发票抬头组织名称
        user_id: '',//经手人id
        user_name: ''//经手人姓名
      },
      table: [],
      multipleSelection: [],
      zhike: false
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    getAddInvoiceFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
      case 'distribution': 
        return saleAddOrderInvoice;
      case 'operator': 
        return addOrderInvoice;
      }
    },
    getAddIncomeFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
      case 'distribution': 
        return saleaddIncome;
      case 'operator': 
        return addIncome;
      }
    },
    todoAddOrderInvoiceFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
      case 'distribution': 
        return saleTodoAddOrderInvoice;
      case 'operator': 
        return todoAddOrderInvoice;
      }
    },
    todoAddIncomeFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
      case 'distribution': 
        return saletodoAddIncome;
      case 'operator': 
        return todoAddIncome;
      }
    },
    orgIncomeListsFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
      case 'distribution': 
        return saleOrgIncomeLists;
      case 'operator': 
        return orgIncomeLists;
      }
    },
  },
  mounted() {
    this.getAddInvoice();
  },
  methods: {
    getAddInvoice() {
      const id = this.$route.query.id || 0;
      if (this.type == 1) {
        this.getAddInvoiceFunc({
          params: {
            data: {
              bills_id: id
            }
          },
          success: (res) => {
            let request = res.data;
            this.table = [];
            if(request.code === 0) {
              const info = request.data.invoice_info;
              this.info = info;
              this.info.amount = request.data.bills_info.rmb_total_amount;
              if(id){
                if(info.raised_org_id == 0) {
                  this.zhike = true;
                  info.raised_org_name = ''
                  info.is_zhike = 1
                } else {
                  this.selectBillsOrg = {
                    distributor_org_id: info.raised_org_id, 
                    distributor_org_name: info.raised_org_name
                  };
                  this.billsOrgList = [this.selectBillsOrg];
                  if(info.peer_accout_id){
                    this.selectPeerAccount = {
                      id: info.peer_accout_id, 
                      bank_number: info.peer_bank_number, 
                      bank_name: info.peer_bank_name
                    };
                    this.peerAccountList = [this.selectPeerAccount];
                  }else{
                    this.getMatchPeerAccount('');
                  }
                }

                this.getMatchAccount('');
                this.table.push(request.data.bills_info)
              } else {
                this.getMatchAccount('');
                this.getMatchBillsOrg('');
              }
            } else {
              this.$message({
                type: 'error',
                message: request.msg
              });
              this.$router.go(-1);
            }
          },
          showLoading: true
        });
      } else {
        this.getAddIncomeFunc({
          params: {data: {id}},
          success: (res) => {
            let request = res.data;
            this.table = [];
            if(request.code === 0) {
              const info = request.data;
              this.info = info;
              if(id){
                this.selectBillsOrg = {
                  distributor_org_id: info.raised_org_id, 
                  distributor_org_name: info.raised_org_name
                };
                this.billsOrgList = [this.selectBillsOrg];
                if(info.peer_accout_id){
                  this.selectPeerAccount = {
                    id: info.peer_accout_id, 
                    bank_number: info.peer_bank_number, 
                    bank_name: info.peer_bank_name
                  };
                  this.peerAccountList = [this.selectPeerAccount];
                }else{
                  this.getMatchPeerAccount('');
                }
              } else {
                this.getMatchAccount('');
                this.getMatchBillsOrg('');
              }
            } else {
              this.$message({
                type: 'error',
                message: request.msg
              });
              this.$router.go(-1);
            }
          },
          showLoading: true
        });
      }
    },
    handleAddInvoice() {
      const {info, multipleSelection, uploadFiles} = this;

      // 更新特殊字段内容
      if(this.type != 1) {
        info.invoice_detail = multipleSelection.map(item => item.id);
      } else {
        info.invoice_detail = [];
        info.invoice_detail.push(this.$route.query.id)
      }
      info.invoice_date = info.invoice_date ? formattDate(info.invoice_date) : '';
      info.pic_url = uploadFiles.map(item => item.url);

      if(this.type == 1) {
        this.todoAddOrderInvoiceFunc({
          params: {data: info},
          success: (res) => {
            let request = res.data;
            if(request.code === 0) {
              this.$message({
                type: 'success',
                message: request.msg
              });
              this.$router.go(-1);
            } else {
              this.$message({
                type: 'error',
                message: request.msg
              });
            }
          },
          showLoading: true
        });
      } else {
        // const {info, multipleSelection, uploadFiles} = this;
        // info.invoice_detail = multipleSelection.map(item => item.id);
        // info.invoice_date = info.invoice_date ? formattDate(info.invoice_date) : '';
        // info.pic_url = uploadFiles.map(item => item.url);
        this.todoAddIncomeFunc({
          params: {data: info},
          success: (res) => {
            let request = res.data;
            if(request.code === 0) {
              this.$message({
                type: 'success',
                message: request.msg
              });
              this.$router.go(-1);
            } else {
              this.$message({
                type: 'error',
                message: request.msg
              });
            }
          },
          showLoading: true
        });
      }
    },
    getMatchBillsOrg(query){
      const data = {org_name: query};
      
      this.billsOrgLoading = true;
      searchBillsOrg({
        params: {data},
        success: (params)=>{
          let { code, data, msg } = params['data'];
          let list = [];

          if(!code){
            list = data;
          }else{
            this.$message({message: msg, type:'error'});
          }
          this.billsOrgList = list;
          this.billsOrgLoading = false;
        }
      });
    },
    getMatchAccount(query){
      const data = {bank_name: query};
      
      this.accountLoading = true;
      searchAccount({
        params: {data},
        success: (params)=>{
          let { code, data, msg } = params['data'];
          let list = [];

          if(!code){
            list = data;
          }else{
            this.$message({message: msg, type:'error'});
          }
          this.accountList = list;
          this.accountLoading = false;
        }
      });
    },
    getMatchPeerAccount(query){
      const data = {bank_name: query, peer_org_id: this.info.raised_org_id};
      
      if (query && !data.peer_org_id) {
        return this.$message.error('请先选择发票抬头！');
      }
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
    },
    handleSelectBillsOrg(item){
      if (item == '') {
        this.table = []
      }
      if(item && this.info.raised_org_id == item.distributor_org_id){
        return false;
      }
      this.selectBillsOrg = item;
      this.info.raised_org_id = (item && item.distributor_org_id) || '';
      this.info.raised_org_name = (item && item.distributor_org_name) || '';
      this.info.taxpayer_num = (item && item.taxpayer_num) || '';
      this.info.invoice_detail = [];
      if(item && item.distributor_org_id){
        this.getMatchPeerAccount('');
        this.tableLoading = true;
        this.orgIncomeListsFunc({
          params: {data: {
            distributor_org_id: item.distributor_org_id,
            invoice_id: this.info.id || ''
          }},
          success: (params)=>{
            let { code, data, msg } = params['data'];
            let list = [];

            if(item.distributor_org_id != this.info.raised_org_id){
               console.log('响应数据延迟，和当前选择组织不一致：', item.distributor_org_id, this.info.raised_org_id);
              return false;
            }
            if(!code){
              list = data;
            }else{
              this.$message({message: msg, type:'error'});
            }
            this.table = list;
          }
        });
      } else {
        this.peerAccountList = [];
        this.table = [];
        this.selectPeerAccount = {};
      }
    },
    handleSelectAccount(item){
      this.selectAccount = item;
      this.info.account_id = item.id || '';
      this.info.bank_name = item.bank_name || '';
      this.info.bank_number = item.account_no || '';
    },
    handleSelectPeerAccount(item){
      this.selectPeerAccount = item;
      this.info.peer_accout_id = item.id || '';
      this.info.peer_bank_name = item.bank_name || '';
      this.info.peer_bank_number = item.bank_number || '';
    },
    handlePreview(file) {
       console.log('prev file', file);
      window.open(file.url);
    },
    handleBeforeUpload(file){

      if (this.uploadFiles.length > 9) {
        this.$message.error('发票图片数量不可超过十份!');
        return false;
      }
    },
    handleUploadsucc(response, file, fileList) {
       console.log('success: ', response, file, fileList);
      if(response.code == '0'){
        file.url = response.data.path;
      }else{
        this.$message.error(response.msg);
        let idx = fileList.indexOf(file);
        if(idx != -1){
          fileList.splice(idx, 1);
        }
      }
      this.uploadFiles = fileList;
    },
    handleRemove(file, fileList){
       console.log(file, fileList);
      this.uploadFiles = fileList;
    },
    handleSelectionChange(val){
      let amount = 0;
      val.forEach(item => {
        amount += item.rmb_total_amount;
      });
      this.multipleSelection = val;
      this.info.amount = amount;
    },
    handleCancel(){
      this.$confirm(
        '您当前的内容未保存，确定离开页面？',
        '提示',
        {type: 'warning'}
      ).then(() =>{
        this.$router.go(-1);
      }).catch((e)=>{
         console.log('取消', e);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.cont{
  padding: 20px;
  background-color: #fff;
}
.panel{
  margin-bottom: 20px;
  .hd{
    padding: 10px 0 25px;
    h2{
      display: inline-block;
      color: #b10c79;
      font-size: 16px;
      border-left: 5px solid #b10c79;
      padding-left: 10px;
      line-height: 20px;
    }
  }
}
.channel-content {
  width: 680px;
  .el-select{
    width: 100%;
  }
  .item {
    position: relative;
    padding: 0 0 0 170px;
    height: 28px;
    margin: 0 0 10px;
    .label {
      position: absolute;
      top: 0;
      left: 0;
      width: 170px;
      height: 28px;
      line-height: 28px;
      text-align: right;
      color: #999999;
    }
    .info {
      padding: 0 0 0 10px;
      height: 28px;
      line-height: 28px;
    }
  }
}
.btn-wrap {
  text-align: center;
}
.buline {
  height: 24px;
  line-height: 24px;
}
</style>
<style>
/* 复写上传组件的图片列表样式 */
el-upload-list el-upload-list--picture{
  line-height: 0;
}
.el-upload-list--picture .el-upload-list__item{
  display: inline-block;
  width: 92px;
  padding: 5px;
  margin-right: 10px;
}
.el-upload-list--picture .el-upload-list__item-thumbnail{
  width: 80px;
  height: 80px;
  margin: 0;
  z-index: 0;
}
.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label{
  display: none;
}
</style>

