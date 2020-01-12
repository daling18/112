<template>
  <div class="zonedropdown">
    <el-select
      v-model="cityName"
      filterable
      clearable
      :disabled="disabled"
      value-key="three_code"
      remote
      placeholder="请输入地区名称"
      :remote-method="searchCityListHandler"
      @change="changeCity">
      <template v-for="(item,idx) in cityList" v-if="cityList">
        <el-option
          :key="idx"
          :label="item.station_name"
          :value="item">
      </el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
import { queryTrainCityPick } from 'src/api/train'

export default {
		data() {
			return {
			  cityName: '',
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
        this.$set(this,'cityName',val);
      }
    },
		methods: {
      searchCityListHandler(queryString){
        if (queryString) {
          let parm = {};
          parm.data = {
            search_key:queryString
          }

          queryTrainCityPick({
            params: parm,
            success: (res) => {
              let {code, msg, data} = res['data'];
              if(!code){
                this.cityList = data.stations;
              }
            }
          });
        }else{
          this.cityList = [];
        }
      },
      changeCity(item){
        // if(this.cityList.length){
        //   let filter = this.cityList.filter(i => {return i.three_code == citys});
        //   if(filter.length){
        //     station_name = filter[0].station_name
        //   }else{
        //     station_name = '';
        //   }
        // }
        //  console.log(citys)
        this.$emit('input', item);
      }
		},
    mounted() {}
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
