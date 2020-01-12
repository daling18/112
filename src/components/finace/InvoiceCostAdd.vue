<template>
  <div class="cont">
    <div class="panel">
      <div class="hd">
        <h2>发票信息</h2>
      </div>
      <div class="channel-content">
        <el-form label-position="right" label-width="200px" >
          <el-form-item label="成本票金额" required>
            <div class="info">{{ info.amount }}</div>
          </el-form-item>
          <el-form-item label="发票抬头" required>
            <div class="info">
              {{info.raised_org_name}}
            </div>
          </el-form-item>
          <el-form-item label="纳税人识别号">
            <el-input v-model="info.taxpayer_num" placeholder="纳税人识别号"/>
          </el-form-item>
          <el-form-item label="开户行及账号" style="white-space: nowrap;">
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
                :label="item.bank_name + '  ' + item.account_no"
                :value="item"/>
            </el-select>
            <router-link class="color-purple"
              v-if="$menuPermission('api/finance/get_payment_account_list')"
              to="/finace/account/company"
              target="_blank">
              公司账户
            </router-link>
          </el-form-item>
          <el-form-item label="经手人" required>
            <div class="info">{{ info.operater_name }}</div>
          </el-form-item>
          <el-form-item label="开票日期" required>
            <el-date-picker
              v-model="info.invoice_date"
              type="date"
              placeholder="选择日期"/>
          </el-form-item>
          <el-form-item label="开票方" required>
            <el-select
              v-model="selectBillsOrg"
              filterable
              remote
              clearable
              value-key="supplier_org_id"
              :loading="billsOrgLoading"
              :remote-method="getMatchBillsOrg"
              placeholder="输入供应商名称进行搜索"
              @change="handleSelectBillsOrg">
              <el-option
                v-for="(item, idx) in billsOrgList"
                :key="idx"
                :label="item.supplier_org_name"
                :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="开票方开户行及账户" required style="white-space: nowrap;">
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
                :label="item.bank_name + '  ' + item.bank_number"
                :value="item"/>
            </el-select>
            <router-link class="color-purple"
              v-if="$menuPermission('api/peeraccount')"
              to="/finace/account/peer"
              target="_blank">
              同行账户
            </router-link>
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
                <el-button type="primary">选择文件</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="发票代码">
            <el-input v-model="info.code" placeholder="发票代码"/>
          </el-form-item>
          <el-form-item label="开票内容">
            <el-input v-model="info.content" placeholder="开票内容"/>
          </el-form-item>
          <el-form-item label="凭证种类" required>
            <el-select placeholder="请选择"
              v-model="info.voucher_type">
							<el-option label="付款凭证" value="1" />
							<el-option label="转账凭证" value="2" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="panel">
      <div class="hd">
        <h2>选择成本</h2>
      </div>
      <div class="bd" v-loading="tableLoading">
        <el-table
          ref="orderTable"
          class="el-table--middle" 
          :data="table"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="55" :resizable="false"/>
          <el-table-column
            prop="rmb_total_amount"
            width="100"
            header-align="center"
            align="right"
            :resizable="false"
            label="成本金额"
          >
            <template slot-scope="scope">
              <div class="color-orange">{{ scope.row.rmb_total_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="item_name"
            label="成本项名称"
            min-width="150"
            :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.item_name">
                {{ scope.row.item_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="项目号（团号）／项目名称"
            min-width="420"
            :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.tuan_no + '  ' + scope.row.tuan_name">
                {{ scope.row.tuan_no }}&nbsp;&nbsp;{{ scope.row.tuan_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="item_no"
            align="center"
            width="180"
            label="应付单号"
          >
            <template slot-scope="scope">
              <router-link :to="`/finace/cost-detail?id=${scope.row.id}`">
                {{scope.row.item_no}}
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="btn-wrap">
      <el-button size="large" type="primary" @click="handleAddCost">保存</el-button>
      <el-button size="large" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import {
  financeAddCost,
  financeTodoAddCost, 
  searchBillsOrg, 
  financeOrgIncomeLists, 
  searchAccount, 
  searchPeerAccount
} from 'src/api/invoice';

import {formattDate} from 'src/assets/js/common.js';

export default {
  data() {
    return {
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
        user_name: '',//经手人姓名
        voucher_type: ''
      },
      table: [],
      tableLoading: false,
      multipleSelection: []
    };
  },
  mounted() {
    this.getAddInvoice();
  },
  methods: {
    getAddInvoice() {
      const id = this.$route.query.id || 0;
      
      financeAddCost({
        params: {data: {id}},
        success: (res) => {
          let request = res.data;
          this.table = [];
          if(request.code === 0) {
            const info = request.data;
            this.info = info;
            if(id){
              this.selectBillsOrg = {
                supplier_org_id: info.supply_org_id, 
                supplier_org_name: info.supply_org_name
              };
              this.billsOrgList = [this.selectBillsOrg];

              this.selectAccount = {
                id: info.account_id, 
                account_no: info.bank_number, 
                bank_name: info.bank_name
              };
              this.accountList = [this.selectAccount];
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

              if(Array.isArray(info.pic_url)){
                const uploadFiles = [];
                info.pic_url.forEach((item, idx)=>{
                  uploadFiles.push({name: idx, url: item});
                });
                // console.log('push pic url', info.pic_url, uploadFiles);
                this.uploadFiles = uploadFiles;
              }

              if(Array.isArray(info.bills_lists)){
                this.table = info.bills_lists;
                this.$nextTick(() => {
                  const table = this.$refs['orderTable'];
                  info.bills_lists.forEach(item => {
                    // 在表格中选中勾选订单
                    if(item.invoice_flag){
                      // console.log('item: ', item);
                      table.toggleRowSelection(item, true);
                    }
                  });
                });
              }
            }else{
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

    },
    handleAddCost() {
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

      financeTodoAddCost({
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
    },
    getMatchBillsOrg(query){
      const data = {org_name: query, type: 2};
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
      const data = {bank_name: query, peer_org_id: this.info.supply_org_id};
      if (query && !data.peer_org_id) {
        return this.$message.error('请先选择开票方！');
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
      if(item && this.info.supply_org_id == item.supplier_org_id){
        return false;
      }
      this.selectBillsOrg = item;
      this.info.supply_org_id = (item && item.supplier_org_id) || '';
      this.info.supply_org_name = (item && item.supplier_org_name) || '';
      this.info.invoice_detail = []; 
      this.handleSelectPeerAccount({}); 
      if(item && item.supplier_org_id){

        this.getMatchPeerAccount('');
        this.tableLoading = true;
        financeOrgIncomeLists({
          params: {data: {
            supplier_org_id: item.supplier_org_id,
            type: 2
          }},
          success: (params)=>{
            let { code, data, msg } = params['data'];
            let list = [];
            if(!code){
              list = data;
            }else{
              this.$message({message: msg, type:'error'});
            }
            this.table = list;
            this.tableLoading = false;
            this.$nextTick(() => {
              const table = this.$refs['orderTable'];
              list.forEach(item => {
                // 在表格中选中勾选订单
                if(item.invoice_flag){
                  // console.log('item: ', item, table);
                  table.toggleRowSelection(item, true);
                }
              });
            });
          }
        });
      }else{
        this.table = [];
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
      // console.log('prev file', file);
      window.open(file.url);
    },
    handleBeforeUpload(file){
      if (this.uploadFiles.length > 9) {
        this.$message.error('发票图片数量不可超过十份!');
        return false;
      }
    },
    handleUploadsucc(response, file, fileList) {
      // console.log('success: ', response, file, fileList);
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
      // console.log(file, fileList);
      this.uploadFiles = fileList;
    },
    handleSelectionChange(val){
      let amount = 0;
      val.forEach(item => {
        amount += item.rmb_total_amount;
      });
      // console.log('update selection change ')
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
  cursor: zoom-in;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label{
  display: none;
}
</style>

