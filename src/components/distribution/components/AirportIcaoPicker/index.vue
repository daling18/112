<template>
  <el-select
    v-model="code"
    filterable
    placeholder="请输入城市中文名称"
    :no-match-text="noMatchText"
    :no-data-text="noDataText"
    :filter-method="remoteMethod"
    @change="changeCode"
    clearable>
    <el-option
      v-for="(item, key) in filterData"
      :key="key"
      :label="item.city_name_cn + '（' + item.airport_name_cn + '）'"
      :value="item.airport_code">
      {{ item.city_name_cn }}（{{ item.airport_name_cn }}）
    </el-option>
  </el-select>
</template>
<script>
import { airportIcaoData } from "./AirportIcaoData";

export default {
  name:"airportIcaoPicker",
  data() {
    return {
      code: this.value,
      filterData: [],
      airportIcaoData: airportIcaoData
    }
  },
  props: {
    value: [String],
    placeholder: {
      type: String,
      default: '请输入城市中文名称'
    },
    noMatchText: {
      type: String,
      default: '无匹配数据'
    },
    noDataText: {
      type: String,
      default: '无数据'
    }
  },
  watch:{
    value(value, oldVal){
      this.code = value;
    }
  },
  methods: {
    remoteMethod(query) {
      query = query.replace(/(^\s*)|(\s*$)/g,"");
      if (query) {
        this.filterData = this.airportIcaoData.filter(item => {
          return item.filterStr.indexOf(query) > -1;
        });
      } else {
        this.filterData = [];
      }
    },
    changeCode(value){
      this.$emit('input', value);
    }
  },
  mounted(){
    this.airportIcaoData = this.airportIcaoData.map((port) => {
      port.filterStr = port.city_name_cn + port.airport_code
      return port
    });
  }
}
</script>

<style lang="less">
.airport-picker {
  position: relative;
  display: inline-block;
}

.city-list {
  position: absolute;
  top: 36px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  width: 520px;
  z-index: 9999;

  .tabs {
    margin: 0;
    padding: 0;
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;

    li {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      background-color: #f4f4f4;
      color: #666;
      margin: 0 1px;
      line-height: 24px;
      padding: 0 8px;
      cursor: pointer;

      &.on {
        background-color: #b10c79;
        color: #fff;
      }
    }
  }
  .city-content {
    padding: 10px 0 0 0;
    margin: 0;
    list-style: none;

    &::after {
      content: '';
      display: table;
      clear: both;
    }

    li {
      cursor: pointer;
      color: #333;
      float: left;
      padding: 4px 8px;
      text-align: center;
      width: 80px;
      line-height: 24px;
    }
  }
}
</style>
