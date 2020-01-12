<template>
  <el-select 
    v-if="cityList"
    v-model="city"
    filterable 
    clearable
    remote 
    :remote-method="querySearchCityAsync"
    :loading="citySearchLoading"
    @change="changeCityCallback"
    loading-text="搜索中，请稍后"
    placeholder="请输入城市名称搜索">
    <el-option
      v-for="(item, key) in cityList"
      :key="key"
      :label="item.city_name"
      :value="item.city_id">
    </el-option>
  </el-select>
</template>
 <script>
 import { querySearchCityHotelAsyncRequest } from 'src/api/hotel';
 export default {
   name: 'HotelCityPicker',
   data(){
     return {
       city: null,
       cityList: [],
       citySearchLoading: false
     }
   },
   props:{
     value: ''
   },
   watch:{
     value(val, oldVal){
       if(val == ''){
         this.city = ''
       }else{
        this.initSelectAutocomplete(); 
       }
     }
   },
   methods:{
     initSelectAutocomplete(){
       this.citySearchLoading = true;
       querySearchCityHotelAsyncRequest({
         params: {
            data: {
              city_id: this.value
            }
          },
          success: (params) => {
            let { data } = params['data'];
            this.citySearchLoading = false;
            this.cityList = data || [];
            this.city = this.value;
          }
       });
     },
     querySearchCityAsync(queryString){
        if(queryString !== ''){
          this.citySearchLoading = true;
          querySearchCityHotelAsyncRequest({
            params: {
              data: {
                city_name: queryString
              }
            },
            success: (params) => {
              let { data } = params['data'];
              this.citySearchLoading = false;
              this.cityList = data || [];
            }
          });
        }else{
          this.cityList = [];
        }
      },
      changeCityCallback(){
        this.$emit('input', this.city);
      }
   },
   mounted(){
     this.initSelectAutocomplete();
   }
 }
 </script>
 
