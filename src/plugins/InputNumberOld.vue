<template>
  <el-input 
    ref="input"
    :disabled="disabled"
    :readonly="readonly"
    :value="currentValue"
    :autofocus="autofocus"
    :placeholder="placeholder"
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
  >
    <!-- 前置元素 -->
    <template v-if="$slots.prepend || controls" slot="prepend">
      <span
        v-if="controls"
        :class="{'control': 1, 'is-disabled': minDisabled}"
        v-repeat-click="decrease"
      >
        <i class="el-icon-minus" />
      </span>
      <slot v-else name="prepend" />
    </template>
    <!-- 后置元素 -->
    <template v-if="$slots.append || controls" slot="append">
      <span
        v-if="controls"
        :class="{'control': 1, 'is-disabled': maxDisabled}"
        v-repeat-click="increase"
      >
        <i class="el-icon-plus" />
      </span>
      <slot v-else name="append" />
    </template>
  </el-input>
</template>

<script>
import { toFixed } from 'src/utils/format';
import { once, on } from 'element-ui/src/utils/dom';

/**
 * 数值输入框
 * 
 * 支持attr参数：
 * value | string | 默认值
 * disabled  | boolean  | 是否禁用，默认false
 * readonly  | boolean  | 是否只读，默认false
 * autofocus  | boolean  | 是否自动聚焦，默认false
 * number  | boolean  | 是否返回数值，默认true
 * precision  | number  | 返回数值精度，默认0
 * placeholder  | string  | 设置输入框默认显示内容
 * 
 * 支持事件：
 * change | (item)  | 更新后触发事件，传入更新值
 * input  | (item)  | 输入事件，传入更新值，以支持v-model
 * 
 * demo:
 *  <input-number  v-model="native" :precision="3" />
 * 
 */

export default {
  name: 'InputNumber',
  directives: {
    repeatClick: {
      bind(el, binding, vnode) {
        let interval = null;
        let startTime;
        const handler = () => vnode.context[binding.expression].apply();
        const clear = () => {
          if (new Date() - startTime < 100) {
            handler();
          }
          clearInterval(interval);
          interval = null;
        };

        on(el, 'mousedown', () => {
          startTime = new Date();
          once(document, 'mouseup', clear);
          clearInterval(interval);
          interval = setInterval(handler, 100);
        });
      }
    }
  },
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: true
    },
    // 确保输入的数值在安全数值范围内，否则会出现输入和显示内容不一致
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER
    },
    precision: {
      type: Number,
      default: 0
    },
    value: {
      type: [String, Number],
      default: ''
    },
    controls: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value,
      isChange: false
    };
  },
  computed: {
    step(){
      return Math.pow(10, -this.precision);
    },
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max;
    },
  },
  watch: {
    value(val, old){
      // 过滤掉非法的赋值
      // if(!/^-?(\d+(\.\d*)?)?$/.test(val)){
      //   val = '';
      // }
      if(val === '' || val !== this.currentValue){
        this.currentValue = val;
        // console.log('val', val, old, 'this.curr', this.currentValue);
      }
    }
  },
  methods: {
    toPrecision(num, precision) {
      if (precision === undefined) precision = this.precision;
      return parseFloat(parseFloat(Number(num).toFixed(precision)));
    },
    getPrecision(value) {
      const valueString = value.toString();
      const dotPosition = valueString.indexOf('.');
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    _increase(val, step) {
      if (typeof val !== 'number') return this.currentValue;

      const precisionFactor = Math.pow(10, this.precision);

      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
    },
    _decrease(val, step) {
      if (typeof val !== 'number') return this.currentValue;

      const precisionFactor = Math.pow(10, this.precision);

      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
    },
    increase() {
      if (this.disabled || this.maxDisabled) return;
      const value = this.value || 0;
      const newVal = this._increase(value, this.step);
      if (newVal > this.max) return;
      this.setCurrentValue(newVal);
    },
    decrease() {
      if (this.disabled || this.minDisabled) return;
      const value = this.value || 0;
      const newVal = this._decrease(value, this.step);
      if (newVal < this.min) return;
      this.setCurrentValue(newVal);
    },
    setCurrentValue(val){
      let returnVal = val;

      if(returnVal == '-'){
        returnVal = '';
      }
      if(returnVal !== '' && this.number){
        returnVal = parseFloat(returnVal);
      }
      // console.log(val, returnVal, this.currentValue)
      if (returnVal !== '') {
        if(val > this.max){
          val = this.max;
          returnVal = this.max;
        }
        if(val < this.min){
          val = this.min;
          returnVal = this.min;
        }
      }
      this.currentValue = val;
      // console.log(val, returnVal, this.currentValue)
      // 触发value更新和form验证
      this.$emit('input', returnVal);
      this.$refs.input.setCurrentValue(val);
      this.$emit('change', returnVal);
    },
    handleInput(val){
      // 禁止el-input的setCurrentValue的逻辑，不触发form验证
      this.$refs.input.currentValue = val;
    },
    // 这边依赖el-input，根据源码更新currentValue在input后面，在change之前所以这里使用change事件
    handleChange(val){
      let reg = /^-?(\d+(\.\d*)?)?$/;
      // console.log(max, min)
      // console.log(val, returnVal)

      if(!this.precision){
        reg = /^-?(\d+)?$/
      }

      // 1. 为了避免输入非数字，这里直接修改el-input的内部数据。
      // 2. 结合handleInput的逻辑触发form验证
      this.$refs.input.currentValue = this.currentValue;
      // console.log('change: ', val, this.currentValue)
      if(reg.test(val)){

        if(this.value != val){
          this.isChange = true;
        }
        this.setCurrentValue(val);
      }
      // console.log('val', val, 'this.value', this.value);
    },
    handleBlur(){
      let returnVal = this.currentValue;

      if(!this.isChange){
        return false;
      }
      if(returnVal == '-'){
        returnVal = '';
      }

      this.isChange = false;
      if(returnVal !== ''){
        returnVal = toFixed(returnVal, this.precision);
        
        if(this.number){
          returnVal = parseFloat(returnVal);
        }
      }
      
      // console.log('blur returnVal', returnVal);
      this.$emit('input', returnVal);
      this.$emit('change', returnVal);
      // 复写blur触发表单验证时返回的值
      this.$refs.input.currentValue = returnVal;
      this.currentValue = returnVal;
      this.$emit('blur')
    }
  }
};
</script>

<style lang="less">
.control{
  cursor: pointer;
  &:hover{
    color: #b10c79;
  }
  &.is-disabled{
    color: #d1dbe5;
    cursor: not-allowed;
  }
}

</style>