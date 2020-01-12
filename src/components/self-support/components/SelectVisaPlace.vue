<template>
  <el-select
    class="select-place"
    v-model="selectPlace"
    ref="select"
    filterable
    remote
    clearable
    multiple
    value-key="id"
    :loading="loading"
    :remote-method="getMatchOrg"
    :placeholder="placeholder"
    @change="handleSelect"
  >
    <el-option v-for="item in list" :key="item.id" :label="item.area_name" :value="item" />
  </el-select>
</template>

<script>
import { getCityList } from 'src/api/selfsupport.visa';
import { debounce } from 'lodash';

/**
 * 选择代理商自动完成插件
 * 
 * 支持attr参数：
 * value | Array | 默认值，对象格式[{id: 'xxx', area_name: 'xxxx'}]
 * defaultList  | array | 默认列表，当用户没有输入时展示的列表，列表项的内容格式和value一致
 * placeholder  | string  | 设置输入框默认显示内容
 * 
 * 支持事件：
 * select | (item)  | 选中后触发事件，传入选中项
 * input  | (item)  | 输入事件，传入选中项，以支持v-model
 * 
 * demo:
 *  <select-visa-place v-model="searchData.org" placeholder="代理商"></select-visa-place>
 * 
 */

export default {
  name: 'SelectVisaPlace',
  props: {
    value: {
      type: Array,
      default: null
    },
    defaultList: {
      type: Array,
      default: null
    },
    placeholder: {
      type: String,
      default: '请输入关键词'
    }
  },
  data(){
    let data = {
      loading: false,
      list: [],
      selectPlace: null
    };
    if(this.value){
      data.selectPlace = this.value;
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
        this.selectPlace = null;
        this.list = this.defaultList || [];
      }else if(val && val != this.selectPlace){
        this.selectPlace = val;
        if(!Array.isArray(this.list) || !this.list.some(item => item.org_id == val.org_id)){
          this.list = [val];
        }
      }
    },
    defaultList: function(val){
      if((!this.$refs.select || !this.$refs.select.query) && Array.isArray(val)){
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
      if (query != null && (query !== '' || (!this.defaultList))) {
        const data = {area_name: query};
        
        this.loading = true;
        getCityList({
          params: { data },
          success: ({data: { code, data, msg }}) => {
            let list = [];

            if(!code){
              list = data;
            }else{
              this.$message({message: msg, type:'error'})
            }
            this.list = list;
            this.loading = false;
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
// src/plugins/select-place.vue样式
.el-select.select-place{
    .el-input__inner{
        padding-right: 10px;
    }
    .el-input__icon + .el-input__inner{
        padding-right: 24px
    }
}
</style>
