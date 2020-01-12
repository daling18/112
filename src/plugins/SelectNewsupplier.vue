<template>
  <el-select
    class="select-org"
    v-model="selectedOrg"
    filterable
    remote
    clearable
    :loading="loading"
    :remote-method="getMatchSupplier"
    :placeholder="placeholder"
    @change="handleSelect"
  >
    <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.name" />
  </el-select>
</template>

<script>
import { getSearchNewSupplier } from 'src/api/api';
import {debounce} from 'lodash';

/**
 * 选择供应商自动完成插件
 * 
 * 支持attr参数：
 * value | number | 供应商id
 * placeholder  | string  | 设置输入框默认显示内容
 * orgName  | string  | 供应商名称(可选值)
 * 
 * 支持事件：
 * select | (item)  | 选中后触发事件，传入选中项
 * input  | (item)  | 输入事件，传入选中项，以支持v-model
 * 
 * demo:
 *  <select-supplier v-model="supplierId" :orgName.sync="supplierName"></select-supplier>
 * 
 */

export default {
  name: 'SelectSupplier',
  props: {
    value: {
      type: Number,
      default: null
    },
    orgName:{
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入关键词'
    }
  },
  data(){
    return {
      selectedOrg: this.orgName,
      orgList: [],
      loading: false
    };
  },
  watch:{
    selectedOrg(val){
      if(this.orgName != val){
        this.$emit('update:orgName', val);
      }
    },
    orgName(val){
      if(this.selectedOrg != val){
        this.selectedOrg = val;
      }
    }
  },
  mounted () {
    this.getMatchSupplier();
  },
  methods:{
    // _.debounce 延迟输入处理，降低接口的访问频率
    getMatchSupplier: debounce(function(query){
      if (query) {
        if(this.orgList.some(i =>{ return i.name == query })){
          return;
        }
        let data = { org_name: query };
        this.loading = true;
        getSearchNewSupplier({data}).then((params)=>{
          let { code, data, msg } = params['data'];
          
          if(code == 0){
            this.orgList = data;
          }else{
            this.orgList = [];
          }
          this.loading = false;
        });
      }else{
        this.orgList = [];
      }
    }, 500),
    handleSelect(orgName){
      let orgId = null;

      if(this.orgList.length){
        if(orgName){
          let orgFilter = this.orgList.filter(i => {return i.name == orgName});
          if(orgFilter.length){
            orgId = orgFilter[0].id
          }else{
            orgId = null;
          }
        }else{
          orgId = null;
        } 
        this.$emit('select', orgId);
        this.$emit('input', orgId);
      }
    }
  }
}
</script>
<style lang="scss">
// src/plugins/select-org.vue样式
.el-select.select-org{
    .el-input__inner{
        padding-right: 10px;
    }
    .el-input__icon + .el-input__inner{
        padding-right: 24px
    }
}
</style>
