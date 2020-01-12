<template>
  <div class="cont">
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
            <el-input v-model="info.raised_org_name" placeholder="输入发票抬头"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号">
            <el-input v-model="info.taxpayer_num" placeholder="纳税人识别号"/>
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
          <el-form-item label="发票号码">
            <el-input v-model="info.invoice_number" placeholder="发票号码"/>
          </el-form-item>
          <el-form-item label="发票图片">
            <div>
              <el-upload
                action="/bom/api_store/invoice/upload_invoice"
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
    <div class="panel">
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
          <el-table-column align="center" type="selection" width="55"/>
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
              <div class="ellipsis">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</div>
              <!-- <div class="ellipsis" :title="scope.row.tuan_name" v-if="$route.meta.isSale">
                <span v-if="scope.row.product_id == ''">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</span>
                <router-link v-else :to="{path: '/sale/saleinvoice/detail/tripDetail', query: {id: scope.row.product_id}}">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</router-link>
              </div>
              <div class="ellipsis" :title="scope.row.tuan_name" v-else>
                <span v-if="scope.row.product_id == ''">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</span>
                <router-link v-else :to="{path: '/invoice/tripDetail', query: {id: scope.row.product_id}}">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</router-link>
              </div> -->
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="item_no"
            label="订单号">
            <template slot-scope="scope">
              <div class="ellipsis">{{scope.row.item_no}}</div>
              <!-- <div class="cell" v-if="$route.meta.isSale">
                <router-link v-if="scope.row.order_id" :to="{path: `/sale/order/order-detail/${scope.row.resource_id}/${scope.row.order_id}`}">{{scope.row.item_no}}</router-link>
                <router-link v-else :to="{path: '/sale/income-detail', query: {bid: scope.row.id}}">{{scope.row.item_no}}</router-link>
              </div>
              <div class="cell" v-else>
                <router-link v-if="scope.row.order_id" :to="{path: `/plan/order-list/detail/${scope.row.resource_id}/${scope.row.order_id}`}">{{scope.row.item_no}}</router-link>
                <router-link v-else :to="{path: '/control/income-detail', query: {bid: scope.row.id}}">{{scope.row.item_no}}</router-link>
              </div> -->
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
import {invoiceSaleAdd, invoiceFinanceAdd, invoiceSaleGetBillsLists, invoiceFinanceGetBillsLists, invoiceTodoSaleAdd, invoiceTodoFinanceAdd} from 'src/api/api_store'
import {formattDate} from 'src/assets/js/common.js';

export default {
  data () {
    return {
      topMenuConst: this.$route.meta.topMenuConst,
      id: this.$route.query.id ? this.$route.query.id : 0,
      bid: this.$route.query.bid ? this.$route.query.bid : '',
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
        invoice_date: '',
        item_no: '',//订单号或账单号
        invoice_amount: 0,//发票金额
        taxpayer_num: '',//纳税人识别号
        raised_org_id: 0,//发票抬头组织ID
        raised_org_name: '',//发票抬头组织名称
        user_id: '',//经手人id
        user_name: ''//经手人姓名
      },
      table: [],
      multipleSelection: []
    }
  },
  methods: {
    invoiceSaleAdd () {
      let params = {
        data: {
          id: this.id,
          bills_id: this.bid
        }
      }
      let add = invoiceSaleAdd
      if (this.topMenuConst === 'store-finace') {
        add = invoiceFinanceAdd
      }
      add({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.info = {...result.data}
            if(Array.isArray(result.data.pic_url)){
              const uploadFiles = [];
              result.data.pic_url.forEach((item, idx)=>{
                uploadFiles.push({name: idx, url: item});
              });
              this.uploadFiles = uploadFiles;
            }
            if(Array.isArray(result.data.bills_lists)){
              this.table = result.data.bills_lists;
              this.$nextTick(() => {
                const table = this.$refs['orderTable'];
                result.data.bills_lists.forEach(item => {
                  if(item.invoice_flag){
                    table.toggleRowSelection(item, true);
                  }
                });
              });
            } else {
              this.invoiceSaleGetBillsLists()
            }
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
    invoiceSaleGetBillsLists () {
      let params = {
        data: {
          invoice_id: this.id
        }
      }
      let list = invoiceSaleGetBillsLists
      if (this.topMenuConst === 'store-finace') {
        list = invoiceFinanceGetBillsLists
      }
      list({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.table = result.data
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
    handleAddInvoice () {
      this.info.invoice_detail = this.multipleSelection.map(item => item.id);
      this.info.invoice_date = this.info.invoice_date ? formattDate(this.info.invoice_date) : '';
      this.info.pic_url = this.uploadFiles.map((item) => item.url);
      let params = {
        data: this.info
      }
      let todo = invoiceTodoSaleAdd
      if (this.topMenuConst === 'store-finace') {
        todo = invoiceTodoFinanceAdd
      }
      todo({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            if (this.topMenuConst === 'store-sale') {
              this.$router.push({
                path: '/store-sale/invoice-list'
              })
            } else if (this.topMenuConst === 'store-finace') {
              this.$router.push({
                path: '/store-finace/invoice-approval'
              })
            }
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
    handlePreview (file) {
      console.log('prev file', file);
      window.open(file.url);
    },
    handleBeforeUpload (file) {
      if (this.uploadFiles.length > 9) {
        this.$message.error('发票图片数量不可超过十份!');
        return false;
      }
    },
    handleUploadsucc (response, file, fileList) {
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
    handleRemove (file, fileList){
      console.log(file, fileList);
      this.uploadFiles = fileList;
    },
    handleSelectionChange (val) {
      let amount = 0;
      val.forEach(item => {
        amount += item.rmb_total_amount;
      });
      this.multipleSelection = val;
      this.info.amount = amount;
    },
    handleCancel () {
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
  },
  mounted () {
    this.invoiceSaleAdd()
  }
}
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
