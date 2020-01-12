<template>
  <el-select
    class="select-org"
    v-model="selectOrg"
    filterable
    remote
    clearable
    value-key="org_id"
    :loading="loading"
    :remote-method="getMatchOrg"
    :placeholder="placeholder"
    @change="handleSelect"
  >
    <el-option v-for="item in list" :key="item.org_id" :label="item.org_name" :value="item" />
  </el-select>
</template>

<script>
import {getSearchOrg} from 'src/api/api';
import {debounce} from 'lodash';

/**
 * 选择代理商自动完成插件
 * 
 * 支持attr参数：
 * value | object | 默认值，对象格式{org_id: 'xxx', org_name: 'xxxx'}
 * defaultList  | array | 默认列表，当用户没有输入时展示的列表，列表项的内容格式和value一致
 * placeholder  | string  | 设置输入框默认显示内容
 * part-org  | boolean  | 是否只返回当前用户所属组织及下属组织
 * hide-del  | boolean  | 是否过滤掉已删除代理商
 * filter-yingke  | boolean  | 是否过滤掉盈科的组织
 * org-types  | array  | 指定返回的组织机构类型
 * type  | string  | 是否过滤其他分公司的营业部 0 否 1 是
 * 
 * 支持事件：
 * select | (item)  | 选中后触发事件，传入选中项
 * input  | (item)  | 输入事件，传入选中项，以支持v-model
 * 
 * demo:
 *  <select-org v-model="searchData.org" placeholder="代理商"></select-org>
 * 
 */

export default {
  name: 'SelectOrg',
  props: {
    value: {
      type: Object,
      default: null
    },
    defaultList: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: '请输入关键词'
    },
    partOrg: {
      type: Boolean,
      default: false
    },
    hideDel: {
      type: Boolean,
      default: false
    },
    filterYingke: {
      type: Boolean,
      default: false
    },
    orgTypes: {
      type: Array,
      default: null
    },
    type: {
      type: String,
      default: ''
    }
  },
  data(){
    let data = {
      loading: false,
      list: [],
      selectOrg: null
    };
    if(this.value){
      data.selectOrg = this.value;
      // 设置初始值时需要将初始值添加到列表中，否则无法正常显示到输入框中
      data.list = [this.value];
    }else{
      data.list = this.defaultList || [];
    }
    return data;
  },
  watch:{
    value: function(val){
      console.log("val",val);
      console.log("selectOrg",this.selectOrg)
      if(!val){
        this.selectOrg = null;
        this.list = this.defaultList || [];
      }else if(val && val != this.selectOrg){
        this.selectOrg = val;
        if(!Array.isArray(this.list) || !this.list.some(item => item.org_id == val.org_id)){
          this.list = [val];
        }
      }
    },
    defaultList: function(val){
      if(!this.value && Array.isArray(val)){
        this.list = val;
      }
    }
  },
  mounted () {
    //console.log(123)
    this.getMatchOrg('');
  },
  methods:{
    // _.debounce 延迟输入处理，降低接口的访问频率
    getMatchOrg: debounce(function(query){
      if (query != null && (query !== '' || (!this.defaultList && this.partOrg))) {
        const data = {name: query};
        
        if(this.partOrg){
          data.part_org = 1;
        }
        if(this.hideDel){
          data.is_del = 0;
        }
        if(this.filterYingke){
          data.filter_yingke = 1;
        }
        if(this.type){
          data.type = this.type;
        }
        if(this.orgTypes){
          data.org_type = this.orgTypes;
        }
        this.loading = true;
        
        getSearchOrg({data}).then((params)=>{
          let { code, data, msg } = params['data'];
          let list = [];

          if(!code){
            list = data;
          }else{
            this.$message({message: msg, type:'error'})
          }
          this.list = list;
          this.loading = false;
        });
      }else if(this.defaultList){
        this.list = this.defaultList;
      }
    }, 500),
    handleSelect(item){
      let data = {...item};
      if(!data){
        data = null;
      }
      this.$emit('select', data);
      this.$emit('input', data);
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
