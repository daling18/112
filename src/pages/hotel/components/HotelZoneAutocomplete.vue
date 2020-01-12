<template>
  <el-select 
    v-if="cityList"
    v-model="city"
    filterable 
    clearable
    remote 
    :remote-method="querySearchCityAsync"
    @change="changeCityCallback"
    placeholder="请输入城市名称">
    <el-option
      v-for="(item, key) in cityList"
      :key="key"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
</template>
 <script>
 import { promise_getCityList } from 'src/api/promise_api';
 export default {
   name: 'ZoneAutocomplete',
   data(){
     return {
       city: null,
       cityList: [],
      //  citySearchLoading: false
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
      //  this.citySearchLoading = true;
       promise_getCityList({
            data: {
              searchName: this.value
            },
          success: (params) => {
            let { data } = params['data'];
       console.log('initnitnit',params['data'])
            // this.citySearchLoading = false;
            this.cityList = data || [];
            this.city = this.value;
          }
       });
      },
      async querySearchCityAsync(queryString){
        if(queryString !== ''){
          // this.citySearchLoading = true;
          const params = {
            data:{
              searchName: queryString
            }
          }
          const { data } = await  promise_getCityList(params)
          
          if(data.code !=0 ) return
          // this.citySearchLoading = false;
          this.cityList = data.data || [];
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
 
