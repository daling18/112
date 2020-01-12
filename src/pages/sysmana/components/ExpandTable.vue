// src\components\system\organization\ExpandTable.comp.vue
// 当前与组织机构部分的共用，进行拆分
<template>
  <div>
    <table class="approval-gain-table">
      <template v-for="row in tableData">
        <tr :key="row.id">
          <td width="40">
            <div class="icell">
              <i @click="toggleChildrenAppro(row)"
                 :class="{'el-tree-node__expand-icon': 1, 'expanded': row.open}"/>
            </div>
          </td>
          <td>
            <div class="ellipsis curpoint"
                 @click="handleOrgItem(row)">
              {{ row.name }}
            </div>
          </td>
        </tr>
        <tr :key="'expand-'+row.id"
            v-show="row.open && row.child_list !== false">
          <td class="center"
              colspan="2"
              v-if="row.child_list == true">
            <i class="el-icon el-icon-loading"/>加载中
          </td>
          <td colspan="2"
              v-if="Array.isArray(row.child_list) && row.child_list.length > 0">
            <expand-table 
              :table-data="row.child_list"
              @orgItem="handleOrgItem" />
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import { getSimpleNextOrginations } from 'src/api/api'

export default {
  name: 'ExpandTable',
  props: {
    tableData: Array,
    noHeader: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
    }
  },
  methods: {
    toggleChildrenAppro(row){
      if(!row.open && (
        (Array.isArray(row.child_list) && row.child_list.length == 0)
        || (!row.child_list && row.child_list !== false))){
        this.$set(row, 'child_list', true);
        getSimpleNextOrginations({
          params: {data: {org_id: row.id,type:'approval'}},
          success: (resp) => {
            let {code, msg, data} = resp.data;
            if(code == 0){
              row.child_list = Array.isArray(data) && data.length > 0 ? data : false;
            }else{
              row.child_list = false;
              this.$message.error(msg);
            }
          }
        })
      }
      this.$set(row, 'open', !row.open);
    },
    handleOrgItem(row){
      this.$emit('orgItem', row);
    }
  }
}
</script>

<style scoped lang="scss">
.expand-table{
  table-layout: fixed;
}
.el-table__expanded-cell{
  padding: 0;
  .el-table{
    padding: 1px 0 0 20px;
    border: none;
    td{
      border-bottom: none;
    }
  }
}
.approval-gain-table{
  width: 100%;
  .icell{
    padding: 10px 14px;
    cursor: pointer;
    i{
      vertical-align: -1px;
    }
    &:hover{
      opacity: .6;
    }
  }
  .center{
    text-align: center!important;
  }
  table{
    margin-left: 15px;
  }
}
</style>
