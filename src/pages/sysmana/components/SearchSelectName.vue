// src\components\system\account\SearchSelectName.vue
<template>
  <el-select
    class="select-org"
    v-model="selectOrg"
    filterable
    remote
    clearable
    value-key="user_id"
    :loading="loading"
    :remote-method="getMatchOrg"
    :placeholder="placeholder"
    @change="handleSelect"
  >
    <el-option v-for="item in list" :key="item.user_id" :label="item.username" :value="item" />
  </el-select>
</template>

<script>
import {getUsersByName} from 'src/api/user';
import {debounce} from 'lodash';

/**
 * 选择代理商自动完成插件
 * 
 * 支持attr参数：
 * value | object | 默认值，对象格式{user_id: 'xxx', username: 'xxxx'}
 * defaultList  | array | 默认列表，当用户没有输入时展示的列表，列表项的内容格式和value一致
 * placeholder  | string  | 设置输入框默认显示内容
 * part-org  | boolean  | 是否只返回当前用户所属组织及下属组织
 * hide-del  | boolean  | 是否过滤掉已删除代理商
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
      if(!val){
        this.selectOrg = null;
        this.list = this.defaultList || [];
      }else if(val && val != this.selectOrg){
        this.selectOrg = val;
        if(!Array.isArray(this.list) || !this.list.some(item => item.user_id == val.user_id)){
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
    // console.log(123)
    this.getMatchOrg('');
  },
  methods:{
    // _.debounce 延迟输入处理，降低接口的访问频率
    getMatchOrg: debounce(function(query){
      if (query != null && (query !== '')) {
        let para = {
          data:{
            name: query,
            type: 2
          }
        };
        this.loading = true;
        getUsersByName({
          params: para,
          success: res => {
          this.loadingResult = false;
            let { code, data, msg } = res.data;
            if (code == 0) {
              this.list = data;
              this.loading = false;
            } else {
              this.$message.error(msg);
            }
          }
        });
      }else if(this.defaultList){
        this.list = this.defaultList;
      }
    }, 500),
    handleSelect(item){
      if(!item){
        item = null;
      }
      this.$emit('select', item);
      this.$emit('input', item);
    }
  }
}
</script>
<style lang="scss">
// src/plugins/select-org.vue样式
.el-select.select-org{
  width: 100%;
    .el-input__inner{
        padding-right: 10px;
    }
    .el-input__icon + .el-input__inner{
        padding-right: 24px
    }
}
</style>
