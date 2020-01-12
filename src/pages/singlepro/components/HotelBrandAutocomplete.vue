<template>
  <el-select 
    v-if="brandList"
    v-model="brand"
    filterable 
    clearable
    remote 
    value-key="id"
    :remote-method="querySearchBrandAsync"
    :loading="brandSearchLoading"
    @change="changeBrandCallback"
    loading-text="搜索中，请稍后"
    placeholder="请输入品牌名称搜索">
    <el-option
      v-for="(item, key) in brandList"
      :key="key"
      :label="item.brand_name"
      :value="item">
    </el-option>
  </el-select>
</template>
 <script>
 import { querySearchHotelBrandAsyncRequest } from 'src/api/hotel';
 export default {
   name: 'BrandAutocomplete',
   data(){
     return {
       brand: null,
       brandList: [],
       brandSearchLoading: false
     }
   },
   props:{
     value: '',
   },
   watch:{
     value(val, oldVal){
       if(val === ''){
         this.brand = ''
       }else{
        this.initSelectAutocomplete(); 
       }
     }
   },
   methods:{
     initSelectAutocomplete(){
       this.brandSearchLoading = true;
       querySearchHotelBrandAsyncRequest({
         params: {
            data: {
              brand_id: this.value
            }
          },
          success: (params) => {
            let { data } = params['data'];
            this.brandSearchLoading = false;
            this.brandList = data.list.filter((i)=>{ return i.id == this.value }) || [];
            this.brand = this.value;
          }
       });
     },
     querySearchBrandAsync(queryString){
        if(queryString !== ''){
          this.brandSearchLoading = true;
          querySearchHotelBrandAsyncRequest({
            params: {
              data: {
                brand_name: queryString
              }
            },
            success: (params) => {
              let { data } = params['data'];
              this.brandSearchLoading = false;
              this.brandList = data.list || [];
            }
          });
        }else{
          this.brandList = [];
        }
      },
      changeBrandCallback(item){
        this.$emit('input', this.brand);
      }
   },
   mounted(){
     this.initSelectAutocomplete();
   }
 }
 </script>
 
