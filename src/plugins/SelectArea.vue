<template>
  <div class="select-area">
    <el-select
      class="select-area-item"
      v-model="selVal.area_0"
      placeholder="省"
      @change="handleSelectArea(0, $event)"
      value-key="id"
      :clearable="clearable"
      filterable>
      <el-option v-for="area in area_0_list" :label="area.area_name" :value="area" :key="area.id"/>
    </el-select>
    <i class="select-area-sepa"/>
    <el-select
      class="select-area-item"
      v-model="selVal.area_1"
      placeholder="市"
      value-key="id"
      :clearable="clearable"
      @change="handleSelectArea(1, $event)"
      filterable>
      <el-option v-for="area in area_1_list" :label="area.area_name" :value="area" :key="area.id"/>
    </el-select>
    <i class="select-area-sepa"/>
    <el-select
      class="select-area-item"
      v-model="selVal.area_2"
      placeholder="县"
      value-key="id"
      :clearable="clearable"
      @change="handleSelectArea(2, $event)"
      filterable>
      <el-option v-for="area in area_2_list" :label="area.area_name" :value="area" :key="area.id"/>
    </el-select>
  </div>
</template>
<script>
/**
 * 中国省市县选择组件
 * 参数：  value: object   结构：{area_0: Number, area_1: Number, area_2: Number}
 * 参数：  valueKey: string   返回内容对应的字段名
 * 事件：  change: func(level, val, data)  
 *          level: 级别：0 省，1 市，2 县
 *          val: 对应区域对象
 *          data: 完整的value
 * demo:
 * <select-area :value="value" @change="handleChange"></select-area>
 * 
 * js:
 * this.value = {area_0: 100000, area_1: 100100, area_2: 100101}
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
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data: ()=>{
    return {
      // levelMap: {0: 'province', 1: 'city', 2: 'county'},
      selVal: {
        area_0: '',
        area_1: '',
        area_2: ''
      },
      area_0_list: false,
      area_1_list: [],
      area_2_list: [],
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
    console.log(this.valueKey)
    this.loadList(0);
    this.updateSelVal(this.value);
  },
  methods: {
    updateSelVal(newVal){
      console.log('update sel val', newVal);
      if(!newVal){
        this.selVal = {
          area_0: '',
          area_1: '',
          area_2: ''
        };
        return false;
      }
      if(newVal.area_0 != this.selVal.area_0[this.valueKey]){
        console.log('area_0: ', newVal.area_0, this.selVal.area_0)
        if(newVal.area_0){
          this.initialStatus ++;
        }
        let area_0 = {[this.valueKey]: newVal.area_0}
        const updateArea0 = area => {
          if (area[this.valueKey] == newVal.area_0) {
            area_0.id = area.id
            this.loadList(1, area.id)
            return true
          }
          return false
        }
        // 判断area0是否存在，不存在则不更新后续的值
        if (this.area_0_list && !this.area_0_list.some(updateArea0)) {
          this.selVal = {
            area_0: '',
            area_1: '',
            area_2: ''
          }
          this.initialStatus = 0
          return
        }
        this.selVal.area_0 = area_0;
      }
      if(newVal.area_1 != this.selVal.area_1[this.valueKey]){
        console.log('area_1: ', newVal.area_1, this.selVal.area_1)
        if(newVal.area_1){
          this.initialStatus ++;
        }
        this.selVal.area_1 = {[this.valueKey]: newVal.area_1};
      }
      if(newVal.area_2 != this.selVal.area_2[this.valueKey]){
        console.log('area_2: ', newVal.area_2, this.selVal.area_2)
        // this.initialStatus ++;
        this.selVal.area_2 = {[this.valueKey]: newVal.area_2};
      }
      // console.log('update sel val', this.initialStatus, newVal);
    },
    loadList: function(level, id){
      getArea({
        params: {
          data: {
            country_id: 'CHN',
            parent_id: id || 0,
            level: level + 1
          }
        },
        success: ({data})=>{
          const key = `area_${level}_list`

          if (data.code == '0') {
            this[key] = data.data;
          } else {
            this[key] = [];
          }
          console.log('get data: ', level, this.initialStatus, this[key])
          if (this.initialStatus) {
            const updateSelectedArea = area => {
              // 检查当前值是否存在于对应的列表中
              if (area[this.valueKey] == this.selVal[`area_${level}`][this.valueKey]) {
                this.selVal[`area_${level}`].id = area.id
                if (level < 2) {
                  this.loadList(level + 1, area.id)
                }
                if (level > 0) {
                  console.log('update init status: ', level)
                  this.initialStatus --;
                }
                return true
              }
              return false
            }
            if (!this[key].some(updateSelectedArea)) {
              // 不存在时重置初始化状态，不在进行检查操作
              this.initialStatus = 0
            }
          }
          if(level != 2 && this.area_2_list.length > 0){
            this.area_2_list = [];
          }
        },
      });
    },
    handleSelectArea: function(level, area){
      // if(!val){
      //   return false;
      // }
      let val = area && area[this.valueKey];
      console.log('handle select area: ', level, area, this.selVal.area_0 + 1)
      if(level < 2){
        if(!this.initialStatus){
          if(val){
            if(level < 1){
              this.selVal.area_1 = '';
            }
            this.selVal.area_2 = '';
            this.loadList(level + 1, area.id);
          } else {  // 清空时，同时清空对应的下拉列表
            if(level < 1){
              this.selVal.area_1 = '';
              this.area_1_list = [];
            }
            this.selVal.area_2 = '';
            this.area_2_list = [];
          }
        }else{
          return; // 初始中，不触发事件
        }
      }
      console.log('this.selVal.area_0', this.selVal.area_0)
      const value = {
        area_0: this.selVal.area_0[this.valueKey],
        area_1: this.selVal.area_1[this.valueKey],
        area_2: this.selVal.area_2[this.valueKey]
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
    width: 33%;
  }
  .select-area-sepa{
    display: inline-block;
    width: 0.5%;
  }
}
</style>
