<template>
  <div>
    <el-table :data="dataList" border style="width: 100%">
      <slot />
      <el-table-column fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="isNoOperate(scope.row.edit)">--</template>
          <el-dropdown v-else trigger="click" @command="handleOperate">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-caret-bottom el-icon--right"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(edit, i) in scope.row.edit">
                <el-dropdown-item
                  v-if="isShowOperate(edit, scope.row)"
                  :key="i"
                  :command="{edit, data: scope.row}"
                >
                  {{ editMap[edit] }}
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle + '收款'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      size="tiny">
      <div v-if="dialogTitle === '撤销'" class="cexiao-tip">确定撤销该收款申请？</div>
      <el-form 
        :model="cancelForm.data"
        :rules="cancelForm.rules"
        ref="cancelForm"
        label-width='100px'>
        <el-form-item :label="dialogTitle + '说明'" required prop="info">
          <el-input type="textarea" v-model="cancelForm.data.info" auto-complete="off"/>
        </el-form-item>
        <span v-if="dialogTitle != '撤销'" class="color-red">注：{{ dialogTitle }}收款记录后将无法恢复</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  salePaymentCancel as zhikeSalePaymentCancel,
  paymentCancel as zhikePaymentCancel,
  saleReissueReceipt as zhikeSaleReissueReceipt,
  reissueReceipt as zhikeReissueReceipt,
  paymentScrap as zhikePaymentScrap
} from 'src/api/zhike'
import {
  paymentCancel,
  salePaymentCancel,
  jidiaoPaymentCancel,
  reissueReceipt,
  saleReissueReceipt,
  jidiaoReissueReceipt,
  paymentScrapReceipt
} from 'src/api/finance'

export default {
  name: 'ReceiveTable',
  props: {
    topMenuConst: {
      type: String,
      default: ''
    },
    parentId: {
      type: [String, Number],
      default: ''
    },
    dataList: {
      type: Array,
      default: () => []
    },
    isZhike: {
      type: Boolean,
      default: false
    },
    editMap: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      dialogData: '',
      cancelForm: {
        data: {
          payment_id: '',
          info: ''
        },
        rules: {info: [{required: true, message: '说明不能为空'}]}
      }
    }
  },
  computed: {
    // topMenuConst() {
    //   return this.$route.meta && this.$route.meta.topMenuConst;
    // },
    receiveDetailPerm(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.$menuPermission('api/tuan/sale_get_gathering_info');
      case 'operator':
        return this.$menuPermission('api/tuan/comein_get_gathering_info');
      case 'finance':
        // return this.$menuPermission('api/tuan/financial_get_gathering_info');
        return true;
      default: 
        return false;
      }
    },
    receiveDetailPath(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.prefix + 'receive-detail';
      case 'operator':
        return this.prefix + 'receive-detail';
      case 'finance':
        return this.prefix + 'receive-detail';

      }
    },
    cancelReceivePerm(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        if(this.isZhike){
          return this.$menuPermission('api/zhike/sale_payment_cancel');
        }else{
          return this.$menuPermission('api/finance/sale_payment_cancel');
        }
      case 'operator':
        return this.$menuPermission('api/finance/jidiao_payment_cancel');
      case 'finance':
        if(this.isZhike){
          return this.$menuPermission('api/zhike/payment_cancel');
        }else{
          return this.$menuPermission('api/finance/payment_cancel');
        }
      default: 
        return false;
      }
    },
    cancelReceiveFunc(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.isZhike ? zhikeSalePaymentCancel : salePaymentCancel;
      case 'operator':
        return jidiaoPaymentCancel;
      case 'finance':
        return this.isZhike ? zhikePaymentCancel : paymentCancel;
      }
    },
    reissueReceivePerm(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        if(this.isZhike){
          return this.$menuPermission('api/zhike/sale_reissue_receipt');
        }else{
          return this.$menuPermission('api/finance/sale_reissue_receipt');
        }
      case 'operator':
        return this.$menuPermission('api/finance/jidiao_reissue_receipt');
      case 'finance':
        if(this.isZhike){
          return this.$menuPermission('api/zhike/reissue_receipt');
        }else{
          return this.$menuPermission('api/finance/reissue_receipt');
        }
      default: 
        return false;

      }
    },
    reissueReceiveFunc(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.isZhike ? zhikeSaleReissueReceipt : saleReissueReceipt;
      case 'operator':
        return jidiaoReissueReceipt;
      case 'finance':
        return this.isZhike ? zhikeReissueReceipt : reissueReceipt;
      }
    },
    scrapReceivePerm(){
      switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return this.$menuPermission('api/tuan/sale_get_gathering_info');
      // case 'operator':
      //   return this.$menuPermission('api/tuan/comein_get_gathering_info');
      case 'finance':
        if(this.isZhike){
          return this.$menuPermission('api/zhike/payment_scrap');
        }else{
          return this.$menuPermission('api/finance/payment_scrap_receipt');
        }

      }
    },
    scrapReceiveFunc(){
      switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return saleIncomeInfo;
      // case 'operator':
      //   return opIncomeInfo;
      case 'finance':
        return this.isZhike ? zhikePaymentScrap : paymentScrapReceipt;
      }
    }
  },
  methods: {
    isShowOperate(edit, data) {
      switch (edit) {
      case 1: 
        return this.receiveDetailPerm;
      case 2:
        return this.cancelReceivePerm;
      case 3:
        return this.reissueReceivePerm;
      case 4:
        return this.scrapReceivePerm;
      case 8:
        return true;
      default:
        return false;
      }
    },
    isNoOperate(edit) {
      if (Array.isArray(edit)) {
        return !edit.some(this.isShowOperate)
      }
      return true
    },
    handleOperate(cmd) {
      const {edit, data} = cmd;

      switch (edit) {
      case 1:
        this.$router.push({
          path: this.receiveDetailPath,
          query: {id: data.id, parent_id: this.parentId}
        });
        break;
      case 2:
        this.dialogVisible = true;
        this.dialogTitle = '撤销';
        this.dialogData = data;
        if(this.$refs.cancelForm){
          this.$refs.cancelForm.resetFields();
        }
        this.cancelForm.data.payment_id = data.id;
        break;
      case 3:
        this.$confirm(
          '确认重新发起认款？',
          '重新发起',
          {type: 'warning'}
        ).then(() =>{
          this.reissueReceiveFunc({
            params: {data: {id: data.id}},
            success: ({data}) => {
              if (data.code == '0') {
                this.$message.success(data.msg);
                this.$emit('success', '重新发起');
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }).catch((e)=>{
          console.log('取消', e)
        });
        break;
      case 4:
        this.dialogVisible = true;
        this.dialogTitle = '作废';
        this.dialogData = data;
        if(this.$refs.cancelForm){
          this.$refs.cancelForm.resetFields();
        }
        this.cancelForm.data.payment_id = data.id;
        break;
      case 8:
        this.$router.push({
          path: '/sale/recognition/peer-proceeds/detail-add',
          query: {id: '', pay_id: data.id}
        });
        break;
      default:
        return true;
      }
    },
    handleSubmitDialog(){
      if(this.$refs.cancelForm) {
        const func = this.dialogTitle == '作废' ? this.scrapReceiveFunc : this.cancelReceiveFunc;
          
        this.$refs.cancelForm.validate((result) => {
          if(!result){
            return false;
          }
          func({
            params: {data: this.cancelForm.data},
            success: ({data}) => {
              if (data.code == '0') {
                this.dialogVisible = false;
                this.$emit('success', this.dialogTitle);
                this.$message({
                  type: 'success',
                  message: data.msg
                })
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        });
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .cexiao-tip {
    padding: 5px 22px;
  }
</style>
