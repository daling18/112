<template>
<div>
  <el-select 
    v-model="brand"
    filterable 
    clearable
    remote 
    value-key="index"
    :remote-method="querySearchAsync"
    @change="changeBrandCallback"
    loading-text="搜索中，请稍后"
    placeholder="请输入名称搜索">
    <el-option v-if="scenicList"
      v-for="(item, key) in scenicList"
      :key="key"
      :label="item.title+'/'+item.src_name"
      :value="item">
    </el-option>
  </el-select>
  <p class="legend">注：搜素第三方渠道的景区，新增景区时以便代入景区信息</p>
  <table class="custom-table" v-if="scenicInfo">
    <tr>
      <th>景区名称</th>
      <td>{{scenicInfo.title}}</td>
    </tr>
    <tr>
      <th>景区星级</th>
      <td>
        <template v-if="scenicInfo.grade>0">
          <span v-for="(g,i) in scenicInfo.grade" :key="i">A</span>
        </template>
        <template v-else>未评级</template></td>
    </tr>
    <tr>
      <th>所在城市</th>
      <td>{{scenicInfo.city.whole_name}}</td>
    </tr>
    <tr>
      <th>景区地址</th>
      <td>{{scenicInfo.address}}</td>
    </tr>
    <tr>
      <th>景区介绍</th>
      <td>
        <div class="introtext" v-html="scenicInfo.introduce">
          <!-- {{scenicInfo.introduce | ellipsis}} -->
        </div>
      </td>
    </tr>
  </table>
</div>
</template>
 <script>
 import { getSearchScenicList } from 'src/api/self_support.goodscate';
 export default {
   name: 'BrandAutocomplete',
   data(){
     return {
       brand: null,
       scenicList: [],
       scenicInfo: null,
     }
   },
   props:{
     value: ''
   },
   filters: {
      ellipsis (value) {
         console.log(value)
        if (!value) return ''
        if (value.length > 200) {
          return value.slice(0,200) + '...'
        }
        return value
      }
    },
   watch:{},
   methods:{
     querySearchAsync(queryString){
        if(queryString !== ''){

          getSearchScenicList({
            params: {
              data: {
                title: queryString
              }
            },
            success: (params) => {
              let {code, msg, data } = params['data'];
              if(!code){
                this.scenicList = data || [];
              }

            }
          });
        }else{
          this.scenicList = [];
        }
      },
      changeBrandCallback(item){
        if(item.introduce){
          let regImgTag = /<img(?:.|\s)*?>/g;
          item.introduce = item.introduce.replace(regImgTag,'');
        }
        this.$set(this,'scenicInfo',item);
        this.$emit('input', item);
      }
   },
   mounted(){
   }
 }
 </script>
 <style lang="less" scoped>
 .custom-table{
   width: 100%;
   th{
     width: 80px;
     padding: 10px 5px;
     background: #f4f4f4;
     border:1px solid #ccc;
     color: #333;
   }
   td{
     padding: 0 10px;
     border:1px solid #ccc;
   }
 }
 .legend{
   padding: 10px;
 }
 .introtext{
   height: 250px;
   overflow-y: auto;
 }
 </style>
 
