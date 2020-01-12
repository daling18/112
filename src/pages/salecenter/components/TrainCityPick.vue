<template>
  <div class="zonedropdown">
    <el-select
      v-model="cityName"
      filterable
      clearable
      :disabled="disabled"
      remote
      value-key="station_name"
      placeholder="请输入地区名称"
      :remote-method="searchCityListHandler"
      @change="changeCity">
        <el-option
          v-for="item in cityList"
          :key="item.station_name"
          :label="item.station_name"
          :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { queryTrainCityPick } from 'src/api/train'

export default {
		data() {
			return {
			  cityName: {},
        cityList: null
			}
		},
    props:{
      value: '',
      disabled: {
        type: Boolean,
        default: false
      },
    },
    watch:{
      value(val){
        this.$set(this,'cityName', val);
        this.searchCityListHandler(val.station_name)
      }
    },
		methods: {
      searchCityListHandler(queryString){
        if (queryString) {
          let parm = {
            data:{
              search_key:queryString
            }
          };
          queryTrainCityPick({
            params: parm,
            success: (res) => {
              let {flag, msg, data} = res['data'];
              if(!flag){
                this.cityList = data;
              }
            }
          });
        }else{
          this.cityList = [];
        }
      },
      changeCity(item){
        this.$emit('input', item);
      }
		},
    mounted() {
      
    }
	};

</script>


<style lang="less" scoped>
.zonedropdown{
  float:left;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
