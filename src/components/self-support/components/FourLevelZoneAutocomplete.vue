<template>
  <div class="select-area">
    <el-select
      class="select-area-item"
      v-model="selVal.area_0"
      placeholder="国家"
      @change="handleSelectArea(0, $event)"
      value-key="id"
      filterable>
      <el-option v-for="area in area_0_list" :label="area.area_name" :value="area" :key="area.id"/>
    </el-select>
    <i class="select-area-sepa"/>
    <el-select
      class="select-area-item"
      v-model="selVal.area_1"
      placeholder="省"
      value-key="id"
      @change="handleSelectArea(1, $event)"
      filterable>
      <el-option v-for="area in area_1_list" :label="area.area_name" :value="area" :key="area.id"/>
    </el-select>
    <i class="select-area-sepa"/>
    <el-select
      class="select-area-item"
      v-model="selVal.area_2"
      placeholder="市"
      value-key="id"
      @change="handleSelectArea(2, $event)"
      filterable>
      <el-option v-for="area in area_2_list" :label="area.area_name" :value="area" :key="area.id"/>
    </el-select>
    <i class="select-area-sepa"/>
    <el-select
      class="select-area-item"
      v-model="selVal.area_3"
      placeholder="县"
      value-key="id"
      @change="handleSelectArea(3, $event)"
      filterable>
      <el-option v-for="area in area_3_list" :label="area.area_name" :value="area" :key="area.id"/>
    </el-select>
  </div>
</template>
<script>
/**
 * 中国省市县选择组件
 * 参数：  value: object   结构：{area_0: Number, area_1: Number, area_2: Number}
 * 事件：  change: func(level, val, data)  
 *          level: 级别：0：国家， 省：1， 市：2， 县：3
 *          val: 对应区域对象
 *          data: 完整的value
 * demo:
 * <select-area :value="value" @change="handleChange"></select-area>
 * 
 * js:
 * this.value = {area_0: 100000, area_1: 100100, area_2: 100101, area_3: 100101}
 * handleChange = (level, val, data) => {
 *  console.log(level, val, data);  // 0, {id: 100101, ...}, {area_0: 100000, area_1: 100100, area_2: 100101}
 * }
 * 注：value更新时可能会触发多次change事件
 *     如果结合dialog:el-form rule时建议再close时对value进行初始化，否则可能会出现打开弹出框时出现错误提示
 *     (参考：components/contract/express/index.vue)
 */
import { getArea } from 'src/api/api';
export default {
  name: 'SelectArea',
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data: ()=>{
    return {
      // levelMap: {0: 'province', 1: 'city', 2: 'county'},
      selVal: {
        area_0: '',
        area_1: '',
        area_2: '',
        area_3: ''
      },
      area_0_list: [],
      area_1_list: [],
      area_2_list: [],
      area_3_list: [],
      initialStatus: 0  // 初始化状态，value发生变化时计算变项。省市变更时status+1,避免初始值被重置
    };
  },
  watch:{
    value: function(newVal, oldVal){
      this.updateSelVal(newVal);
    }
  },
  // updated: ()=>console.log('updated'),
  mounted: function(){
    this.loadList(0);
    this.updateSelVal(this.value);
  },
  methods: {
    updateSelVal(newVal){
      if(!newVal){
        this.selVal = {
          area_0: '',
          area_1: '',
          area_2: '',
          area_3: ''
        };
        return false;
      }
      if(newVal.area_0 != this.selVal.area_0.id){
        if(newVal.area_0){
          this.initialStatus ++;
        }
        this.selVal.area_0 = {id: newVal.area_0};
      }
      if(newVal.area_1 != this.selVal.area_1.id){
        if(newVal.area_1){
          this.initialStatus ++;
        }
        this.selVal.area_1 = {id: newVal.area_1};
      }
      if(newVal.area_2 != this.selVal.area_2.id){
        this.initialStatus ++;
        this.selVal.area_2 = {id: newVal.area_2};
      }
      if(newVal.area_3 != this.selVal.area_3.id){
        // this.initialStatus ++;
        this.selVal.area_3 = {id: newVal.area_3};
      }
      // console.log('update sel val', this.initialStatus, newVal);
    },
    loadList: function(level, id){
      getArea({
        params: {
          data: {
            country_id: '',
            parent_id: id || 0,
            level: level
          }
        },
        success: ({data})=>{
          if (data.code == '0') {
            this[`area_${level}_list`] = data.data;
          } else {
            this[`area_${level}_list`] = [];
          }
          if(level != 3 && this.area_3_list.length > 0){
            this.area_3_list = [];
          }
        },
      });
    },
    handleSelectArea: function(level, area, label){
      // if(!val){
      //   return false;
      // }
      let val = area && area.id;

      if(level < 3 && val){
        if(!this.initialStatus){
          if(level < 1){
            this.selVal.area_1 = '';
          }
          if(level < 2){
            this.selVal.area_2 = '';
          }
          this.selVal.area_3 = '';
        }else{
          this.initialStatus --;
        }
        this.loadList(level + 1, val);
      }
      const value = {
        area_0: this.selVal.area_0.id,
        area_1: this.selVal.area_1.id,
        area_2: this.selVal.area_2.id,
        area_3: this.selVal.area_3.id
      };
      this.$emit('input', value);
      this.$emit('change', level, area, value); 
      // this[`area_${level}`] = val;
    }
  }
};
</script>
<style scoped lang="less">
.select-area{
  font-size: 0;
  .select-area-item{
    width: 24%;
  }
  .select-area-sepa{
    display: inline-block;
    width: 0.5%;
  }
}
</style>

