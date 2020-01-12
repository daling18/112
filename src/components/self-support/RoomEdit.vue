<template>
  <div class="wrapper">
    <div class="hotel-form">
      <el-form ref="roomForm" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="酒店名称" prop="hotel_name">
          {{ formData.hotel_name }}
        </el-form-item>
        <el-form-item label="房型名称" prop="room_name">
          <el-input v-model="formData.room_name" placeholder="请输入房型名称" @input="querySearchRoomAsync" :icon="roomNameInputIcon"></el-input>
        </el-form-item>
        <el-form-item label="最大入住人数">
          <el-input-number v-model="formData.maxCustomers" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="房型类型">
          <el-radio-group v-model="formData.room_sys_id">
            <el-radio :label="1">大床房</el-radio>
            <el-radio :label="2">双床标准间</el-radio>
            <el-radio :label="3">多人间</el-radio>
            <el-radio :label="4">套房</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面积">
          <el-input v-model="formData.room_area" placeholder="请输入房间面积"></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input v-model="formData.floor" placeholder="请输入房间楼层"></el-input>
        </el-form-item>
        <el-form-item label="床型">
          <el-input v-model="formData.bed_type" placeholder="请输入房间床型"></el-input>
        </el-form-item>
        <el-form-item label="窗户">
          <el-select v-model="formData.window" placeholder="请选择">
            <el-option value="不确定" label="不确定"></el-option>
            <el-option value="有窗" label="有窗"></el-option>
            <el-option value="无窗" label="无窗"></el-option>
            <el-option value="部分无窗" label="部分无窗"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卫浴">
          <el-select v-model="formData.bath" placeholder="请选择">
            <el-option value="不确定" label="不确定"></el-option>
            <el-option value="独立卫浴" label="独立卫浴"></el-option>
            <el-option value="公共卫浴" label="公共卫浴"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="wifi">
          <el-select v-model="formData.wifi" placeholder="请选择">
            <el-option value="不确定" label="不确定"></el-option>
            <el-option value="有" label="有"></el-option>
            <el-option value="无" label="无"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宽带">
          <el-select v-model="formData.broadnet" placeholder="请选择">
            <el-option value="不确定" label="不确定"></el-option>
            <el-option value="有" label="有"></el-option>
            <el-option value="无" label="无"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间图片" required>
          <el-button @click="albumType = true" type='primary'>图片库选择</el-button>
          <el-form-item prop="img">
            <div class="hotel-img">
              <div v-for="(img, key) in formData.img" :key="key" class="hotel-img-item">
                <i class="el-icon-close" @click="handleRemoveImgListItem(key)"></i>
                <img :src="img.img_url">
              </div>
            </div>
          </el-form-item>
        </el-form-item>
        <el-form-item label="房间介绍" prop="intor">
          <vue-editor v-model="formData.intor"></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm">保存</el-button>
          <el-button @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <album :visible.sync='albumType' @imageArray='handleCheckImage' :check='formData.img' checkkey='img_url' idkey='id'></album>
  </div>
</template>

<script>
import { searchSelfSupportRoomListAsyncRequest, getSelfSupportRoomDetailAsyncRequest, editSelfSupportRoomAsyncRequest } from 'src/api/hotel';
import VueEditor from 'src/plugins/editor/vue-html5-editor.vue';
import Album from 'src/plugins/Album';
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
        bed_type: null,
        window: '',
        bath: '',
        maxCustomers: null,
        room_sys_id: null,
        wifi: '',
        broadnet: '',
        img: [],
        intor: '' 
      },
      searchRoomTimeout: null,
      isSearchRoom: false,
      rules:{
        hotel_name: [
          { required: true, message: '请输入酒店名称', trigger: 'blur' }
        ],
        room_name: [
          { required: true, message: '请输入房型名称', trigger: 'blur' }
        ],
        img: [
          { required: true, type:'array', message: '请上传房型图片' }
        ]
      },
      albumType: false
    }
  },
  computed:{
    roomNameInputIcon(){
       return  this.isSearchRoom ? 'loading' : 'edit'
    }
  },
  components:{
    VueEditor,
    Album
  },
  watch:{
    'formData.img': {
      handler(val, oldVal){
        this.$refs['roomForm'].validateField('img');
      },
      deep: true
    }
  },
  methods:{
    querySearchRoomAsync(queryString){
      this.searchRoomTimeout && clearTimeout(this.searchRoomTimeout);
      if(queryString){
        let params = {
          data: {
            hotel_id: this.formData.hotel_id,
            room_name: queryString
          }
        };
        this.searchRoomTimeout = setTimeout(() => {
          this.isSearchRoom = true;
          searchSelfSupportRoomListAsyncRequest({
            params: params,
            success: (params) => {
              let { code, data } = params['data'];
              this.isSearchRoom = false;
              if(code == 0 && data.room_list[0].room_name == queryString){
                this.handleGetRoomInfo(data.room_list[0].id);
              }else{
                this.formData.room_id = null;
              }
            }
          });
        }, 1000);
      }else{
        this.formData.room_id = null;
      }
    },
    resetRoomFromData(){
      this.formData.room_id = null;
      this.formData.room_area = null;
      this.formData.floor = '';
      this.formData.bed_type = '';
      this.formData.window = '';
      this.formData.bath = '';
      this.formData.maxCustomers = null;
      this.formData.wifi = '';
      this.formData.broadnet = '';
      this.formData.img = [];
      this.formData.intor = '';
    },
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
    handleSubmitForm(){
      this.$refs['roomForm'].validate((valid) => {
        if(valid){
          let params = {
            data: JSON.parse(JSON.stringify(this.formData))
          }
          
          editSelfSupportRoomAsyncRequest({
            params: params,
            success: (params) => {
              let { code, data, msg } = params['data'];
              if(code == 0){
                this.$message.success(msg);
                this.$router.replace({
                  name: 'SelfSupportDxRoom',
                  query: {
                    hotel_name: this.formData.hotel_name
                  }
                });
              }else{
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleBack(){
      this.$router.back();
    },
    handlePictureBeforeUpload(file){
      const isJPG = ['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) > -1 ;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg、jpeg、png 格式!');
         return false;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false;
      }
      return isJPG && isLt2M;
    },
    handlePictureUploadSuccess(response, file, fileList){
      let { code, data, msg } = response;
      if(code == 0){
        this.formData.img.push({
          img_title: data.name,
          img_url: data.path
        });
      }else{
        this.$message.error(msg);
      }
    },
    handleRemoveImgListItem(index){
      this.formData.img.splice(index,1);
    },
    handleCheckImage (data) {
      this.formData.img = []
      this.formData.img = data.map((item, index) => {
        let obj = {
          img_title: item.name,
          img_url: item.sub_pic_url
        }
        return obj;
      })
    }
  },
  mounted(){
    let { hotelId, hotelName, roomId } = this.$route.query;
    if(hotelId){
      this.formData.hotel_id = hotelId;
      this.formData.hotel_name = hotelName;
    }else if(roomId){
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
    position: relative;
    float: left;
    margin: 10px 20px 10px 0;
    width: 180px;
    height: 180px;
    img{
      width: 100%;
      height: 100%;
    }
    i{
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .5);
      color: #fff;
      padding: 4px;
      cursor: pointer;
    }
  }
}
.uploader{
  float: left;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 180px;
  height: 180px;
  margin: 10px 20px 10px 0;
  .uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 180px;
      height: 180px;
      line-height: 178px;
      text-align: center;
  }
}
.tips{
  color: #999;
}
</style>

