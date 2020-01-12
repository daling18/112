<template>
  <el-select :placeholder="placeholder" v-model="selectValue" :filterable="filterable">
    <el-option-group
      v-for="group in worldArray"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { world_arr } from 'src/configuration/world';

/**
 * 选择国籍下拉框
 * 
 * 支持attr参数：
 * value | string | 默认值
 * filterable  | boolean  | 是否支持搜索，默认支持
 * placeholder  | string  | 设置输入框默认显示内容
 * 
 * 支持事件：
 * select | (item)  | 选中后触发事件，传入选中项
 * input  | (item)  | 输入事件，传入选中项，以支持v-model
 * 
 * demo:
 *  <world-select v-model="native" placeholder="请选择"></world-select>
 * 
 */

export default {
  name: "WorldSelect",
  props: {
    value: {
      type: String,
      default: null
    },
    filterable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      worldArray: world_arr,
      selectValue: this.value
    };
  },
  watch: {
    value: (val, old) => {
      this.selectValue = val;
      // console.log('select value: ', val, old);
    },
    selectValue: function(val, old) {
      // console.log('update select val', val, old);
      this.$emit("select", val);
      this.$emit("input", val);
    }
  }
};
</script>
