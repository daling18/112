<template>
  <div class="search-item calendar">
    <div class="label">{{label}}</div>
    <el-date-picker 
      v-model="startDate" 
      type="date" 
      placeholder="开始日期" 
      :format="format" 
      :value-format="format"
      :readonly="readonly" 
      :disabled="disabled" 
      :editable="editable" 
      :clearable="clearable" 
      :picker-options="startDateOpt"
      @change="handleChangeDate('startDateStr', $event)"
    />
    <div class="label zhi">-</div>
    <template v-if="type != 'sp'">
      <el-date-picker 
        v-model="endDate" 
        type="date" 
        placeholder="结束日期" 
        :format="format"
        :value-format="format"
        :readonly="readonly" 
        :disabled="disabled" 
        :editable="editable" 
        :clearable="clearable" 
        :picker-options="endDateOpt"
        @change="handleChangeDate('endDateStr', $event)"
      />
    </template>
    <template v-else>
      <el-date-picker 
        v-model="endDate" 
        type="date" 
        placeholder="结束日期" 
        :format="format"
        :value-format="format"
        :readonly="readonly" 
        :disabled=false 
        :editable="editable" 
        :clearable="clearable" 
        :picker-options="endDateOpt"
        @change="handleChangeDate('endDateStr', $event)"
      />
    </template>
  </div>
</template>
<script>
/**
 * 日期范围选择搜索项
 * 
 * 支持attr参数：
 * label | string | 标签文本
 * value  | array  | 开始和结束时间的数组，开始和结束时间建议为字符串，格式: [start, end]
 * min  | Date  | 可选最小时间, 支持时间格式字符串
 * max  | Date  | 可选最大时间, 支持时间格式字符串
 * readonly  | boolean  | 是否只读，默认false
 * disabled  | boolean  | 是否禁用，默认false
 * editable  | boolean  | 是否可修改，默认false
 * clearable  | boolean  | 是否清空，默认true
 * format  | string  | 输入日期的格式，格式详见el-date-picker插件
 * 
 * 支持事件：
 * change | (item)  | 更新后触发事件，传入更新值
 * input  | (item)  | 输入事件，传入更新值，以支持v-model
 * 
 * demo: 详见src/components/finace/ApprovalProceeds.vue
 *  <search-item-date-range v-model="dateRange" />
 * 
 */
export default {
  name: 'SearchItemDateRange',
  props: {
    label: {
      type: String,
      required: true,
      default: '日期'
    },
    value: {
      type: Array,
      default: null
    },
    min: {
      type: [Object, Date],
      default: null
    },
    max: {
      type: [Object, Date],
      default: null
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    // },
    // placeholder: {
    //   type: String,
    //   default: "请选择"
    },
    type: {
      type:String,
      default: ''
    }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      startDateStr: '',
      endDateStr: '',
    }
  },
  computed: {
    startDateOpt() {
      let endDate = this.endDate;
      const maxDate = this.max;
      const minDate = this.min;
      const validDate = (date) => {
        return (!minDate || date > new Date(minDate)) && (!maxDate || date < new Date(maxDate))
      }

      return {
        disabledDate(time) {
          return (!!endDate && time > new Date(endDate)) || !validDate(time);
        }
      }
    },
    endDateOpt() {
      let startDate = this.startDate;
      const maxDate = this.max;
      const minDate = this.min;
      const validDate = (date) => {
        return (!minDate || date > new Date(minDate)) && (!maxDate || date < new Date(maxDate))
      }
      
      return {
        disabledDate(time) {
          return !!startDate && time < new Date(startDate) || !validDate(time);
        }
      }

    }
  },
  watch: {
    value: function(date, old) {
      // console.log('watch start date: ', date, old);
      this.updateDate(date);
    },
  },
  beforeMount() {
    this.updateDate(this.value);
  },
  methods: {
    updateDate(value) {
      if(value){
        if(value[0] != this.startDateStr) {
          this.startDateStr = value[0];
          this.startDate = value[0] ? new Date(value[0]) : null;
        }
        if(value[1] != this.endDateStr) {
          this.endDateStr = value[1];
          this.endDate = value[1] ? new Date(value[1]) : null;
        }
      }else{
        this.startDate = null;
        this.endDate = null;
        this.startDateStr = '';
        this.endDateStr = '';
      }
      // console.log('update date:', va lue, this);
    },
    handleChangeDate(type, dataStr){
      this[type] = dataStr;

      let value = [this.startDateStr, this.endDateStr];
      // console.log('handle change date', value);
      this.$emit('input', value);
      this.$emit('change', value);
    }
  }
}
</script>

