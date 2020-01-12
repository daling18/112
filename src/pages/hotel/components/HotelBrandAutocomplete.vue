<template>
  <el-select 
    v-if="brandList"
    v-model="brand"
    filterable 
    clearable
    remote 
    value-key="id"
    :remote-method="_querySearchBrandAsync"
    :loading="brandSearchLoading"
    @change="changeBrandCallback"
    loading-text="搜索中，请稍后"
    placeholder="请输入品牌名称搜索">
    <el-option
      v-for="(item, key) in brandList"
      :key="key"
      :label="item.name"
      :value="item">
    </el-option>
  </el-select>
</template>
 <script>
 import { promise_getBrand } from 'src/api/promise_api';
 
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
        this._queryBrand()
       }
     }
   },
   methods:{
     async _queryBrand() {
       try {
         const params = {
           data: {
             brand_name: this.value && this.value.name 
           }
         }
         const { data } = await promise_getBrand(params)
        
         this.brandSearchLoading = false;
         if( data.code !== 0) return this.$message.error(data.msg);
        this.brandList = data.data.filter((i)=>{ return i.id == this.value }) || [];
        this.brand = this.value && this.value.name 
       }
       catch(err) {
         console.log(err)
       }
     },
     async _querySearchBrandAsync(queryString) {
       if(queryString !== ''){
       try {
         const params = {
           data: {
             brand_name: queryString
           }
         }
         const { data } = await promise_getBrand(params)

         this.brandSearchLoading = false;
         if( data.code !== 0) return this.$message.error(data.msg);
         this.brandSearchLoading = false;
         this.brandList = data.data || [];
       } catch(err) {
         console.log(err)
       }
       } else {
         this.brandList = [];
       }
     },
      changeBrandCallback(item){
        this.$emit('input', this.brand);
      }
   },
  //  mounted(){
  //    this._queryBrand()
  //  }
 }
 </script>
 
