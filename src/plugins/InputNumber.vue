<template>
    <el-input
      ref="input"
      :value="currentValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :precision="precision"
      @input="handleInput"
      @change="handleInputChange"
      @blur="handleBlur"
      >
    </el-input>
</template>
<script>

  export default {
    name: 'InputNumber',
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    props: {
      disabled: Boolean,
      placeholder: String,
      value: {
        type: [String, Number],
        default: ''
      },
      precision: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
      },
      min: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        currentValue: this.min && this.value < this.min ? this.min : this.max && this.value > this.max ? this.max : this.value,
        userInput: null
      };
    },
    watch: {
      value: {
        handler(value) {
          let newVal = value;
          let isString = true;
          if (newVal !== undefined && newVal !== '') {
            // if (isNaN(newVal)) {
            //   return;
            // }

            // if (this.stepStrictly) {
            //   const stepPrecision = this.getPrecision(this.step);
            //   const precisionFactor = Math.pow(10, stepPrecision);
            //   newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor;
            // }
            if (newVal === 0){
              newVal = 0;
            }
            if (this.precision !== undefined && this.precision !== 0) {
              // newVal = this.toPrecision(newVal, this.precision);
              var x = String(newVal).indexOf('.') + 1; //小数点的位置
              var y = String(newVal).length - x; //小数的位数

              if(y == 0 || y < this.precision){
                isString = false;
              }
              if(y >= this.precision){
                newVal = parseFloat(parseFloat(Number(newVal).toFixed(this.precision)))
              }
            }

            if(typeof newVal == 'string' && isString && newVal !== '' ){
              newVal = newVal * 1;
            }
            console.log(typeof newVal);
          }
          
          this.currentValue = newVal;
          this.userInput = null;
          this.$emit('input', newVal);
        }
      }
    },
    computed: {
      
    },
    methods: {
      toPrecision(num, precision) {
        if (precision === undefined) precision = this.numPrecision;
        // return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
        // console.log(parseFloat(parseFloat(Number(num).toFixed(precision))));
        return parseFloat(parseFloat(Number(num).toFixed(precision)));
      },
      getPrecision(value) {
        if (value === undefined) return '';
        const valueString = value.toString();
        const dotPosition = valueString.indexOf('.');
        let precision = "";
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      },
      _increase(val, step) {
        if (typeof val !== 'number' && val !== undefined) return this.currentValue;

        const precisionFactor = Math.pow(10, this.numPrecision);
        // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
        return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
      },
      // _decrease(val, step) {
      //   if (typeof val !== 'number' && val !== undefined) return this.currentValue;
      //   const precisionFactor = Math.pow(10, this.numPrecision);
      //   return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
      // },
      // increase() {
      //   // if (this.inputNumberDisabled || this.maxDisabled) return;
      //   const value = this.value || "";
      //   const newVal = this._increase(value, this.step);
      //   this.setCurrentValue(newVal);
      // },
      // decrease() {
      //   // if (this.inputNumberDisabled || this.minDisabled) return;
      //   const value = this.value || "";
      //   const newVal = this._decrease(value, this.step);
      //   this.setCurrentValue(newVal);
      // },
      handleBlur(event) {

        if(this.min && this.currentValue <= this.min){
          this.setCurrentValue(this.min);
        }
        this.$emit('blur', event);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      setCurrentValue(newVal) {
        const oldVal = this.currentValue;
        // if (typeof newVal === 'number' && this.precision !== undefined) {
        //   newVal = this.toPrecision(newVal, this.precision);
        // }
        console.log(newVal)
        if (oldVal === newVal) return;
        if(this.max && newVal != null && newVal != ''){
          if(newVal >= this.max){
            newVal = this.max
          }
        }
        this.userInput = null;

        this.$emit('input', newVal);
        this.$emit('change', newVal, oldVal);
        
        this.currentValue = newVal;
      },
      handleInput(value) {
        // const newVal = value === '' ? undefined : Number(value);
        // if (!isNaN(newVal) || value === '') {
        //   this.setCurrentValue(newVal);
        // }
        // this.userInput = null;
        let reg = /^(\d+(\.\d*)?)?$/;
        // console.log(max, min)
        // console.log(val, returnVal)

        if(!this.precision){
          reg = /^(\d+)?$/
        }
        
        // 1. 为了避免输入非数字，这里直接修改el-input的内部数据。
        // 2. 结合handleInput的逻辑触发form验证
        // console.log('change: ', val, this.currentValue)

        if(reg.test(value)){
          this.setCurrentValue(value);
        }

      },
      handleInputChange(value) {
        // const newVal = value === '' ? undefined : Number(value);
        // if (!isNaN(newVal) || value === '') {
        //   this.setCurrentValue(newVal);
        // }
        // this.userInput = null;
        let reg = /^-?(\d+(\.\d*)?)?$/;
        // console.log(max, min)
        // console.log(val, returnVal)

        if(!this.precision){
          reg = /^-?(\d+)?$/
        }
        
        // 1. 为了避免输入非数字，这里直接修改el-input的内部数据。
        // 2. 结合handleInput的逻辑触发form验证
        // console.log('change: ', val, this.currentValue)
        if(reg.test(value)){
          value = value * 1;
          this.setCurrentValue(value);
        }

        this.userInput = null
      },
      select() {
        this.$refs.input.select();
      }
    }
  };
</script>
