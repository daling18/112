<template>
  <div class="wrapper">
    <div class="hotel-form">
      <el-form ref="roomForm" :model="formData" label-width="100px">
        <el-form-item label="酒店名称">
          {{ formData.hotel_name }}
        </el-form-item>
        <el-form-item label="房型名称">
          {{ formData.room_name }}
        </el-form-item>
        <el-form-item label="最大入住人数">
          {{ formData.maxCustomers }}
        </el-form-item>
        <el-form-item label="房型类型">
          {{ formData.room_sys_name }}
        </el-form-item>
        <el-form-item label="面积">
          {{ formData.room_area }}
        </el-form-item>
        <el-form-item label="楼层">
          {{ formData.floor }}
        </el-form-item>
        <el-form-item label="床型">
          {{ formData.bed_type }}
        </el-form-item>
        <el-form-item label="窗户">
          {{ formData.window }}
        </el-form-item>
        <el-form-item label="卫浴">
          {{ formData.bath }}
        </el-form-item>
        <el-form-item label="wifi">
          {{ formData.wifi }}
        </el-form-item>
        <el-form-item label="宽带">
          {{ formData.broadnet }}
        </el-form-item>
        <el-form-item label="房间图片">
          <div class="hotel-img">
            <template v-if="formData.img && formData.img.length">
              <div v-for="(img, key) in formData.img" :key="key" class="hotel-img-item">
                <img :src="img.img_url">
              </div>
            </template>
            <template v-else>
              <p>暂无图片</p>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="房间介绍" prop="intor">
          <div v-html="formData.intor"></div>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSelfSupportRoomDetailAsyncRequest } from 'src/api/hotel';
import VueEditor from 'src/plugins/editor/vue-html5-editor.vue';
export default {
  data(){
    return {
      formData:{
        hotel_id: null,
        hotel_name: null,
        room_id: null,
        room_name: '',
        room_area: null,
        floor: '',
        bed_type: '',
        window: '',
        bath: '',
        maxCustomers: null,
        wifi: '',
        broadnet: '',
        img: null,
        intor: '',
        room_sys_name: null
      },
      searchRoomTimeout: null,
      isSearchRoom: false
    }
  },
  methods:{
    handleGetRoomInfo(id){
      let params = {
            data: {
              room_id: id  
            }
          };
      getSelfSupportRoomDetailAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.handleFormatFormData(data);
          }else{  
            this.$message.error(msg);
          }
        },
        showLoading: true
      })
    },
    handleFormatFormData(data){
      for(let key in this.formData){
        if(data.hasOwnProperty(key)){
          this.formData[key] = data[key];
        }
      }
    },
    handleBack(){
      this.$router.back();
    }
  },
  mounted(){
    let { roomId } = this.$route.query;
    if(roomId){
      this.handleGetRoomInfo(roomId);
    }else{
      this.$router.replace({ name: 'SelfSupportDxHotel' });
    }
  }
}
</script>

<style scoped lang="less">
 .hotel-form{
   background-color: #fff;
   padding: 20px;
   
  .el-input{
    width: 300px;
     
  }
  .long{
    width: 400px;
  }
 }
 
 .tag-item,.facilities-item{
   margin-left: 10px;
   &:first-child{
     margin-left: 0;
   }
 }

 .select-checkbox-group{
   height: 250px;
   padding: 15px 0;
   border: 1px solid #ddd;
   overflow: hidden;
   overflow-y: auto;
 }
 .select-checkbox{
   box-sizing: border-box;
   width: 25%;
   float: left;
   padding-left: 15px;
   margin-left: 0;
 }
 .lng-lat{
  width: 350px;
  &::after{
    content: '';
    display: block;
    clear: both;
  }
  .el-col{
    box-sizing: border-box;
    padding-right: 8px;
  }
  .el-input{
    width: auto;
  }
 }
.hotel-img{
  &::after{
    content: '';
    display: block;
    clear: both;
  }
  p{
    padding: 10px 0;
    border: 1px solid #ddd;
    text-align: center;
  }
  .hotel-img-item{
    float: left;
    margin: 10px 20px 10px 0;
    width: 180px;
    height: 180px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

