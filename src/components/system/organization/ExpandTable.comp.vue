<template>
  <div v-if="source == 'organIndex'" class="el-table el-table--enable-row-hover el-table--enable-row-transition">
    <table class="expand-table" width="100%">
      <thead v-if="!noHeader">
        <tr>
          <th class="el-table__expand-column is-leaf" width="48"><div class="cell"/></th>
          <th class="is-left is-leaf"><div class="cell">组织名称</div></th>
          <th class="is-center is-leaf" width="120"><div class="cell">组织类型</div></th>
          <th class="is-center is-leaf" width="80"><div class="cell">员工人数</div></th>
          <!-- <th class="is-center is-leaf" width="130"><div class="cell">组织编号</div></th> -->
          <!-- <th class="is-center is-leaf" width="80"><div class="cell">开通状态</div></th> -->
          <th class="is-center is-leaf" width="80"><div class="cell">使用状态</div></th>
          <th class="is-center is-leaf" width="120"><div class="cell">添加下级组织</div></th>
          <th class="is-center is-leaf" width="100"><div class="cell">操作</div></th>
        </tr>
      </thead>
      <tbody class="el-table__body" v-if="Array.isArray(tableData) && tableData.length > 0">
        <template v-for="row in tableData">
          <tr class="el-table__row" :key="row.id">
            <td class="el-table__expand-column" width="48"><div class="cell">
              <span
                :class="{'el-tree-node__expand-icon': 1, 'expanded': row.open}"
                v-if="row.child_list !== false"
                @click="toggleChildren(row)"
              />
              <!-- <a class="fa fa-caret-down" href="javascript:;" v-if="row.open" @click="toggleChildren(row)" /> -->
            </div></td>
            <td class="is-left">
              <div class="cell">
                <div class="ellipsis" :title="row.name">
                  {{ row.name }}
                </div>
              </div>
            </td>
            <td class="is-center" width="120"><div class="cell">{{ orgTypeMap[row.org_type] }}</div></td>
            <td class="is-center" width="80"><div class="cell">{{ row.people_num }}</div></td>
            <!-- <td class="is-center" width="130"><div class="cell">{{ row.mark_code }}</div></td> -->
            <!-- <td class="is-center" width="80"><div class="cell">{{ row.disabled == 2 ? '未开通' : '已开通' }}</div></td> -->
            <td class="is-center" width="80"><div class="cell">{{ disabledMap[row.disabled] }}</div></td>
            <td class="is-center" width="120"><div class="cell">
              <a href="javascript:;" v-if="($menuPermission('api/orgination/add_org') || row.is_self) && row.disabled == 0" @click="handleNewSubset(row)">新增下级</a>
              <span v-else>--</span>
            </div></td>
            <td class="is-center" width="100"><div class="cell">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="($menuPermission('api/orgination/edit_org') || row.is_self) && row.disabled == 0"
                  >
                    <a href="javascript:;" @click="handleEditOrgin(row)">编辑</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link :to="{ path: '/organization/detail', query: {id: row.id} }">详情</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="($menuPermission('api/orgination/del') || row.is_self) && row.disabled == 0"
                  >
                    <a href="javascript:;" @click="handleDelOrgin(row)">删除</a>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="$menuPermission('api/orgination/disabled_org') || row.is_self"
                  >
                    <a href="javascript:;" @click="handleDisabledOrgin(row)">{{ row.disabled == 0 ? '禁用' : '启用' }}</a>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="showCreditBtn(row.org_type)"
                  >
                    <a href="javascript:;" @click="handleActionOrg('creditLine', row)">授信配置</a>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="row.org_type == 1 || row.org_type == 3">
                    <a href="javascript:;" @click="handleBocConf(row)">中行账户配置</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div></td>
          </tr>
          <tr class="el-table__row" :key="'expand-' + row.id" v-show="row.open && row.child_list !== false">
            <td class="is-center" colspan="7" v-if="row.child_list === true">
              <div class="cell"><i class="el-icon el-icon-loading"/>加载中</div>
            </td>
            <td class="is-center el-table__expanded-cell" colspan="7" v-if="Array.isArray(row.child_list) && row.child_list.length > 0">
              <expand-table 
                :table-data="row.child_list" 
                :org-type-map="orgTypeMap" 
                :disabled-map="disabledMap" 
                :source="sourceName"
                no-header 
                @actionOrg="handleActionOrg"
              />
            </td>
          </tr>
        </template>
      </tbody>
      <tbody v-else>
        <tr class="el-table__row"><td class="is-center" colspan="7">没有找到组织信息</td></tr>
      </tbody>
    </table>
  </div>
  <div v-else-if="source == 'sysApprovalGain'">
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
              :source="sourceName"
              @orgItem="handleOrgItem" />
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import { getNextOrginations } from 'src/api/api'

const CAN_CREDIT_ORG_TYPE = [1, 3, 5, 6]; // 可设置授信额度类型
export default {
  name: 'ExpandTable',
  props: {
    tableData: Array,
    noHeader: {
      type: Boolean,
      default: false
    },
    orgTypeMap: {
      type: Object,
      default: ()=>{return {};}
    },
    disabledMap: {
      type: [Object, Array],
      default: ()=>{return [];}
    },
    source: String
  },
  data(){
    return{
      sourceName: ''
    }
  },
  methods: {
    showCreditBtn(type) {
      return this.$menuPermission('api/finance/add_credit_line') && CAN_CREDIT_ORG_TYPE.indexOf(type) !== -1
    },
    toggleChildren(row){
      if(!row.open && (
        (Array.isArray(row.child_list) && row.child_list.length == 0)
        || (!row.child_list && row.child_list !== false))){
        // row.child = true;
        this.$set(row, 'child_list', true);
        getNextOrginations({
          params: {data: {org_id: row.id}},
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
      // row.open = !row.open;
      this.$set(row, 'open', !row.open);
    },
    handleActionOrg(type, data) {
      this.$emit('actionOrg', type, data)
    },
    handleNewSubset(data){
      //  console.log('new subset', data);
      // this.$emit('newSubset', data);
      this.handleActionOrg('newSubset', data);
    },
    handleEditOrgin(data){
      //  console.log('edit orgin', data);
      // this.$emit('editOrgin', data);
      this.handleActionOrg('edit', data);
    },
    handleDelOrgin(data){
      //  console.log('edit orgin', data);
      // this.$emit('editOrgin', data);
      this.handleActionOrg('del', data);
    },
    handleDisabledOrgin(data){
      //  console.log('edit orgin', data);
      // this.$emit('disabledOrgin', data);
      this.handleActionOrg('disabled', data);
    },
    handleBocConf(data){
      this.handleActionOrg('bocConf', data);
    },
    toggleChildrenAppro(row){
      if(!row.open && (
        (Array.isArray(row.child_list) && row.child_list.length == 0)
        || (!row.child_list && row.child_list !== false))){
        this.$set(row, 'child_list', true);
        getNextOrginations({
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
  },
  mounted(){
    this.sourceName = this.source;
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
