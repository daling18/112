<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column 
      prop="invoice_date" 
      label="开票日期" 
      align="center" 
      width="100" 
      :resizable="false"
    />
    <el-table-column
      prop="amount"
      label="开票金额"
      align="right"
      header-align="center"
      width="100"
      :resizable="false"
    >
      <template slot-scope="scope">
        <div class="color-orange">{{ scope.row.amount }}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="invoice_number"
      label="发票号码"
      align="center"
      width="90"
      :resizable="false"
    />
    <el-table-column
      prop="raised_org_name"
      label="对方单位名称（发票抬头）"
      align="center"
      min-width="190"
      :resizable="false"
    >
      <template slot-scope="scope">
        <p class="ellipsis" :title="scope.row.raised_org_name">{{ scope.row.raised_org_name }}</p>
      </template>
    </el-table-column>
    <el-table-column label="项目号/项目名称" align="center" min-width="260" :resizable="false">
      <template slot-scope="scope">
        <p v-for="(item, idx) in scope.row.item_info" :key="idx" class="ellipsis" :title="item.tuan_no + ' ' + item.tuan_name">{{ item.tuan_no + ' ' + item.tuan_name }}</p>
      </template>
    </el-table-column>
    <el-table-column label="经手人" align="center" min-width="80" :resizable="false">
      <template slot-scope="scope">
        <p class="ellipsis" :title="scope.row.operater_name">{{ scope.row.operater_name }}</p>
      </template>
    </el-table-column>
    <el-table-column label="发票状态" align="center" width="100" :resizable="false">
      <template slot-scope="scope">
        <span :class="scope.row.approval_status | getStatusColor">{{ scope.row.approval_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="120" fixed="right">
      <!-- <template slot-scope="scope">
          <el-button v-if="$menuPermission('api/finance/edit_customer_payment')" type="text" size="small" @click="edit(scope.row.id)">编辑收款</el-button>
        </template> -->
      <template slot-scope="scope">
        <span v-if="!isShowOperate(0, scope.row)">--</span>
        <template v-else>
          <router-link
            v-if="isShowOperate(1, scope.row)"
            :to="{path: `detail`, query: {parent_id:$route.query.id, id:scope.row.id}}"
          >详情</router-link>
          <router-link 
            v-if="isShowOperate(2, scope.row)" 
            :to="{path: `${prefixUrl}/edit`, query: {parent_id:$route.query.id, id: scope.row.id}}"
          >编辑</router-link>
          <a 
            v-if="isShowOperate(3, scope.row)" 
            href="javascript:;"
            @click="handleRevoke(scope.row)"
          >撤回</a>
          <a 
            v-if="isShowOperate(4, scope.row)" 
            href="javascript:;"
            @click="handleInvalid(scope.row)"
          >作废</a>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * 收入发票列表
 * 
 * 支持attr参数：
 * tableData | Array | 表格数据
 * prefixUrl  | String  | 跳转地址前缀
 * 
 * 支持事件：
 * cancel | ()  | 作废成功触发事件
 * 
 * 
 */
import { cancelInvoice, revokeInvoice }from 'src/api/invoice';
export default {
  name: 'InvoiceIncomeTable',
  filters: {
    getStatusColor(status){
      switch(status) {
      case 5: 
      case 3: 
        return 'color-red';
      case 2:
        return 'color-green';
      default:
        return '';
      }
    }
  },
  props: {
    tableData: {
      required: true,
      type: Array,
      default: () => ([])
    },
    prefixUrl: {
      required: true,
      type: String,
      default: ''
    },
  },
  data () {
    return {
    };
  },
  methods:{
    isShowOperate(edit, data) {
      if (!edit) {
        return [1,2,3,4].some(e => this.isShowOperate(e, data))
      }
      switch (edit) {
      case 1:  // '查看'
        return this.$menuPermission('settlement/invoice/income/detail');
      case 2:   // '编辑'
        return this.$menuPermission('settlement/invoice/income/edit') && (data.approval_status == 3 || data.approval_status == 4);
      case 3:   // '撤回'
        return this.$menuPermission('settlement/invoice/income/revoke') && data.approval_status == 1;
      case 4:   // '作废', 
        return this.$menuPermission('settlement/invoice/income/cancel') && data.approval_status == 2;
      default:
        return false;
      }
    },

    handleRevoke(row){
      this.$confirm(
        '确认你撤回发票记录？',
        '确认提示',
        {type: 'warning'}
      ).then(() =>{
        revokeInvoice({
          params: { data: {id: row.id} },
          success:(params) => {
            const data=params.data;

            if(data.code=='0'){
              this.$message.success('操作成功！');
              // this.getTableData(true);
              this.$emit('action', {type: 'revoke', data: row});
            }else{
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }).catch((e)=>{
         console.log('取消', e);
      });
    },

    handleInvalid(row){
      this.$confirm(
        '发票记录作废后将无法恢复，确定作废该发票？',
        '确认提示',
        {type: 'warning'}
      ).then(() =>{
        cancelInvoice({
          params: { data: {id: row.id} },
          success:(params) => {
            const data=params.data;

            if(data.code=='0'){
              this.$message.success('操作成功！');
              // this.getTableData(true);
              this.$emit('action', {type: 'cancel', data: row});
            }else{
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }).catch((e)=>{
         console.log('取消', e);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
