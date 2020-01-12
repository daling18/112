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
      label="对方单位名称（开票方）"
      align="center"
      min-width="150"
      :resizable="false"
    >
      <template slot-scope="scope">
        <p class="ellipsis" :title="scope.row.supply_org_name">{{ scope.row.supply_org_name }}</p>
      </template>
    </el-table-column>
    <el-table-column label="项目号/项目名称" align="center" min-width="240" :resizable="false">
      <template slot-scope="scope">
        <p v-for="(item, idx) in scope.row.item_info" :key="idx" class="ellipsis" :title="item.tuan_no + ' ' + item.tuan_name">{{ item.tuan_no + ' ' + item.tuan_name }}</p>
      </template>
    </el-table-column>
    <el-table-column label="经手人" align="center" min-width="80" :resizable="false">
      <template slot-scope="scope">
        <p class="ellipsis" :title="scope.row.operater_name">{{ scope.row.operater_name }}</p>
      </template>
    </el-table-column>
    <el-table-column label="发票状态" align="center" width="90" :resizable="false">
      <template slot-scope="scope">
        <span :class="scope.row.is_used | getStatusColor">{{ isUsedMap[scope.row.is_used] }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="140" fixed="right" class="operate-col">
      <template slot-scope="scope">
        <router-link
          v-if="$menuPermission('api/invoice/finance_cost_detail')"
          :to="{path: `${prefixUrl}/detail`, query: {parent_id:$route.query.id, id:scope.row.id}}">
          详情
        </router-link>
        <template v-if="scope.row.is_used == 1">
          <router-link 
            v-if="canEdit(scope.row)" 
            :to="{path: `${prefixUrl}/edit`, query: {parent_id:$route.query.id, id: scope.row.id}}">
            编辑
          </router-link>
          <a href="javascript:;"
            v-if="$menuPermission('api/invoice/cancel_invoice')" 
            @click="handleInvalid(scope.row)">
            作废
          </a>
          <span v-else-if="!canEdit(scope.row) && !$menuPermission('api/invoice/finance_cost_detail')">--</span>
        </template>
        <span v-else-if="!$menuPermission('api/invoice/finance_cost_detail')">--</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * 成本回票列表
 * 
 * 支持attr参数：
 * tableData | Array | 表格数据
 * isUsedMap  | Object  | 回票状态映射对象
 * prefixUrl  | String  | 跳转地址前缀
 * 
 * 支持事件：
 * cancel | ()  | 作废成功触发事件
 * 
 * 
 */
import { cancelInvoice }from 'src/api/invoice';
export default {
  name: 'InvoiceCostTable',
  filters: {
    getStatusColor(status){
      switch(status) {
      case 2: 
        return 'color-red';
      case 1:
        return 'color-green';
      default:
        return 'color-gray';
      }
    }
  },
  props: {
    tableData: {
      required: true,
      type: Array,
      default: () => ([])
    },
    isUsedMap: {
      required: true,
      type: Object,
      default: () => ({})
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

    // 有效的订单且有编辑权限且在财务操作中添加的发票才可编辑
    canEdit(row){
      return this.$menuPermission('api/invoice/finance_add_cost') && row.invoice_from == 2;
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
              this.$emit('cancel');
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
