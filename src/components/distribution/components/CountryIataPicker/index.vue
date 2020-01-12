<template>
  <el-select
    v-model="code"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="(item, key) in filterData"
      :key="key"
      :label="item.country"
      :value="item.code">
    </el-option>
  </el-select>
</template>
<script>
import { countryIataData } from "./CountryIataData";

export default {
  name:"CountryIataPicker",
  data() {
    return {
      code:this.value,
      filterData: [],
      countryIataData,
      loading: false
    }
  },
  props: {
    value: [String],
    placeholder: {
      type: String,
      default: ''
    }
  },
  watch:{
    value(value, oldVal){
      this.code = this.value;
    },
    code(value, oldVal){
      this.$emit('change', value);
      this.$emit('input', value);
    }
  },
  methods: {
    initCountryIataData(){
      this.countryIataData = this.countryIataData.split("@");
      this.countryIataData = this.countryIataData.map((country) => {
        let formatCountry = country.split('|');
        return country = {
          code: formatCountry[2],
          country: formatCountry[1] + '(' + formatCountry[0]  +')',
          countryStr: formatCountry[1] + '(' + formatCountry[0]  +')' + formatCountry[2]
        }
      }); 
    },
    remoteMethod(query) {
      if (query !== '') {
        this.filterData = this.countryIataData.filter(item => {
          return item.countryStr.toLowerCase()
            .indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.filterData = [];
      }
    }
  },
  mounted(){
    this.initCountryIataData();
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
