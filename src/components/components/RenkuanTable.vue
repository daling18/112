<template>
  <div>
    <el-table :data="dataList" border style="width: 100%">
      <slot />
      <el-table-column fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="!isShowOperate(scope.row.edit, scope.row)">--</template>
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
                  :command="{edit, data:scope.row}"
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
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      size="tiny">
      <el-form :model="cancelForm.data" :rules="cancelForm.rules" ref="cancelForm">
        <el-form-item label="说明" required prop="info">
          <el-input type="textarea" v-model="cancelForm.data.info" auto-complete="off"/>
        </el-form-item>
        <span class="color-red">注：{{ dialogTitle }}记录后将无法恢复</span>
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
  cancelRenkuan,
  saleCancelRenkuan,
  jidiaoCancelRenkuan,
  reissueRenkuan,
  saleReissueRenkuan,
  jidiaoReissueRenkuan,
  scrapRenkuan,
} from 'src/api/finance'

export default {
  name: 'RenkuanTable',
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
    editMap: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      dialogType: '',
      dialogData: '',
      cancelForm: {
        data: {
          id: '',
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
    renkuanDetailPerm(){
      return this.$menuPermission('settlement/recpay/recrec/getrecdet');

      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return this.$menuPermission('api/tuan/sale_renkuan_detail');
      // case 'operator':
      //   return this.$menuPermission('api/tuan/renkuan_detail');
      // case 'finance':
      //   return this.$menuPermission('api/finance/renkuan_detail');
      // }
    },
    renkuanDetailPath(){
      return '/settlement/recpay/renkuan-detail';

      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      // case 'operator':
      //   return 'renkuan-detail';
      // case 'finance':
      //   return 'renkuan-detail';

      // }
    },
    cancelRenkuanPerm(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.$menuPermission('api/finance/sale_cancel_renkuan');
      case 'operator':
        return this.$menuPermission('api/finance/jidiao_cancel_renkuan'); 
      case 'finance':
        return this.$menuPermission('api/finance/cancel_renkuan');

      }
    },
    cancelRenkuanFunc(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return saleCancelRenkuan;
      case 'operator':
        return jidiaoCancelRenkuan;
      case 'finance':
        return cancelRenkuan;
      }
    },
    // cancelRenkuanInfoPerm(){
    //   switch(this.topMenuConst){
    //   case 'sale':
    //   case 'distribution':
    //     return this.$menuPermission('api/tuan/sale_cancel_renkuan_info');
    //   case 'operator':
    //     return this.$menuPermission('api/tuan/cancel_renkuan_info');
    //   case 'finance':
    //     return this.$menuPermission('api/finance/cancel_renkuan_info');

    //   }
    // },
    // cancelRenkuanInfoFunc(){
    //   switch(this.topMenuConst){
    //   case 'sale':
    //   case 'distribution':
    //     return saleCancelRenkuanInfo;
    //   case 'operator':
    //     return cancelRenkuanInfo;
    //   case 'finance':
    //     return finCancelRenkuanInfo;
    //   }
    // },
    reissueRenkuanPerm(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.$menuPermission('api/finance/sale_reissue_renkuan');
      case 'operator':
        return this.$menuPermission('api/finance/jidiao_reissue_renkuan');
      case 'finance':
        return this.$menuPermission('api/finance/reissue_renkuan');

      }
    },
    reissueRenkuanFunc(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return saleReissueRenkuan;
      case 'operator':
        return jidiaoReissueRenkuan;
      case 'finance':
        return reissueRenkuan;
      }
    },
    scrapRenkuanPerm(){
      switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return this.$menuPermission('api/tuan/sale_get_gathering_info');
      // case 'operator':
      //   return this.$menuPermission('api/tuan/comein_get_gathering_info');
      case 'finance':
        return this.$menuPermission('api/finance/scrap_renkuan');

      }
    },
    scrapRenkuanFunc(){
      switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return saleIncomeInfo;
      // case 'operator':
      //   return opIncomeInfo;
      case 'finance':
        return scrapRenkuan;
      }
    },
    // scrapRenkuanInfoPerm(){
    //   switch(this.topMenuConst){
    //   case 'sale':
    //   case 'distribution':
    //     return this.$menuPermission('api/tuan/sale_scrap_renkuan_info');
    //   case 'operator':
    //     return this.$menuPermission('api/tuan/scrap_renkuan_info');
    //   case 'finance':
    //     return this.$menuPermission('api/finance/scrap_renkuan_info');

    //   }
    // },
    // scrapRenkuanInfoFunc(){
    //   switch(this.topMenuConst){
    //   case 'sale':
    //   case 'distribution':
    //     return saleScrapRenkuanInfo;
    //   case 'operator':
    //     return scrapRenkuanInfo;
    //   case 'finance':
    //     return finScrapRenkuanInfo;
    //   }
    // },
  },
  methods: {
    isShowOperate(edit, data) {
      if (Array.isArray(edit)) {
        return edit.some(e => this.isShowOperate(e, data));
      }
      
      switch (edit) {
      case 1: 
        return this.renkuanDetailPerm;
      case 2:
        return this.cancelRenkuanPerm;
      case 3:
        return this.reissueRenkuanPerm;
      case 4:
      //   return this.cancelRenkuanInfoPerm;
      // case 5:
        return this.scrapRenkuanPerm;
      // case 6:
      //   return this.saleCancelRenkuanInfo;
      default:
        return false;
      }
    },
    // handleShowDetail(title, record){
    //   let cancelFunc = cancelRenkuanInfo, data = {id: record.id, type: 2};

    //   if(title == '撤销详情'){
    //     if(record.renkuan_role == 2){
    //       cancelFunc = saleCancelRenkuanInfo;
    //       data = {id: record.id};
    //     }else{
    //       data.type = 1;
    //     }
    //   }

    //   cancelFunc({
    //     params: {data},
    //     success: ({data}) => {
    //       if (data.code == '0') {
    //         this.dialogVisible = true;
    //         this.dialogData = data.data;
    //         this.dialogTitle = title;
    //         this.dialogType = 'detail';

    //       } else {
    //         this.$message.error(data.msg);
    //       }
    //     },
    //     showLoading: true
    //   });
    // },
    handleOperate(cmd) {
      const {edit, data} = cmd;

      switch (edit) {
      case 1:
        this.$router.push({
          path: this.renkuanDetailPath,
          query: {id: data.id, parent_id: this.parentId}
        });
        break;
      case 2:
        this.dialogVisible = true;
        this.dialogTitle = '撤销认款';
        this.dialogData = data;
        this.dialogType = 'cancelAction';
        if(this.$refs.cancelForm){
          this.$refs.cancelForm.resetFields();
        }
        this.cancelForm.data.id = data.id;
        break;
      case 3:
        this.$confirm(
          '确认重新发起认款？',
          '重新发起',
          {type: 'warning'}
        ).then(() =>{
          this.reissueRenkuanFunc({
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
      //   this.handleShowDetail('撤销详情', data);
      //   break;
      // case 5:
        this.dialogVisible = true;
        this.dialogTitle = '作废认款';
        this.dialogData = data;
        this.dialogType = 'cancelAction';
        if(this.$refs.cancelForm){
          this.$refs.cancelForm.resetFields();
        }
        this.cancelForm.data.id = data.id;
        break;
      // case 6:
      //   // this.handleShowDetail('作废详情', data);
      //   this.scrapRenkuanInfo({
      //     params: {data: {id: data.id}},
      //     success: ({data}) => {
      //       if (data.code == '0') {
      //         this.dialogVisible = true;
      //         this.dialogData = data.data;
      //         this.dialogTitle = '作废详情';
      //         this.dialogType = 'detail';

      //       } else {
      //         this.$message.error(data.msg);
      //       }
      //     },
      //     showLoading: true
      //   });
      //   break;
      default:
        return true;
      }
    },
    handleSubmitDialog(){
      if(this.dialogType == 'cancelAction' && this.$refs.cancelForm) {
        const func = this.dialogTitle == '作废认款' ? this.scrapRenkuanFunc : this.cancelRenkuanFunc;
          
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
</style>
