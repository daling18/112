<template>
  <div class="wrapper">
    <div class="hotel-form">
      <el-form label-width="100px">
        <el-form-item label="酒店名称">
          {{ formData.hotel_name }}
        </el-form-item>
        <el-form-item label="酒店英文名称">
          {{ formData.hotel_name_en }}
        </el-form-item>
        <el-form-item label="所在城市">
          {{ formData.country_name + formData.province_name + formData.city_name + formData.district }}
        </el-form-item>
        <el-form-item label="酒店地址">
          {{ formData.hotel_address }}
        </el-form-item>
        <el-form-item label="酒店英文地址">
          {{ formData.hotel_address_en }}
        </el-form-item>
        <el-form-item label="所属品牌">
          {{ formData.brand_name }}
        </el-form-item>
        <el-form-item label="所处经纬度">
          <div class="lng-lat">
            <el-col :span="11">
              <el-form-item prop="longitude">
                经度：{{ formData.longitude }}
              </el-form-item>
            </el-col>
            <el-col :span="1">
              -
            </el-col>
            <el-col :span="11">
              <el-form-item prop="latitude">
                纬度：{{ formData.latitude }}
              </el-form-item>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item label="酒店星级">
          {{ formData.star_code | getStarName }}
        </el-form-item>
        <el-form-item label="前台电话">
          {{ formData.telephone }}
        </el-form-item>
        <el-form-item label="酒店标签">
          <el-tag :class="'tag-item'"
                  v-for="(tag, key) in formData.tags"
                  :key="key"
                  type="gray">
            {{tag.tag_name}}
          </el-tag>
        </el-form-item>
        <el-form-item label="开业时间">
          {{ formData.opening_date }}
        </el-form-item>
        <el-form-item label="装修时间">
          {{ formData.decorate_date }}
        </el-form-item>
        <el-form-item label="入住时间">
          {{ formData.check_in_time }}
        </el-form-item>
        <el-form-item label="离店时间">
          {{ formData.check_out_time }}
        </el-form-item>
        <el-form-item label="酒店设施">
          <el-tag :class="'facilities-item'"
                  v-for="(facilities, key) in formData.facilities"
                  :key="key"
                  type="gray">
            {{facilities.name}}
          </el-tag>
        </el-form-item>
        <el-form-item label="酒店图片">
          <el-select v-model="imgSelectedId">
            <el-option :value="null" label="全部图片"></el-option>
            <el-option :value="0" label="未设置"></el-option>
            <el-option :value="1" label="酒店外观"></el-option>
            <el-option :value="2" label="酒店大厅"></el-option>
            <el-option :value="3" label="酒店客房"></el-option>
            <el-option :value="5" label="公共区域"></el-option>
            <el-option :value="6" label="周边环境"></el-option>
            <el-option :value="7" label="餐厅/会议"></el-option>
            <el-option :value="8" label="娱乐设施"></el-option>
            <el-option :value="10" label="其他"></el-option>
          </el-select>
          <div class="hotel-img">
            <template v-if="hotelImgs && hotelImgs.length">
              <div v-for="(img, key) in hotelImgs" :key="key" class="hotel-img-item">
                <div v-if="img.is_default" class="isDefault">
                  <i>首</i>
                </div>
                <img :src="img.img_url">
              </div>
            </template>
            <template v-else>
              <p>暂无图片</p>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="酒店介绍">
          <div v-html="formData.hotel_intro"></div>
        </el-form-item>
        <el-form-item label="入住须知">
          <div v-html="formData.need_to_know"></div>
        </el-form-item>
        <el-form-item label="周边信息">
          <div v-html="formData.nearby_intro"></div>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSelfSupportHolelDetailAsyncRequest } from 'src/api/hotel';
export default {
  data(){
    return {
      formData:{
        id: null,
        hotel_name: '',
        hotel_name_en: '',
        brand_name: '',
        country_name: '',
        province_name: '',
        city_name: '',
        district: '',
        hotel_address: '',
        hotel_address_en: '',
        longitude: '',
        latitude: '',
        star_code: null,
        telephone: '',
        tag_ids: '',
        tags: [],
        opening_date: null,
        decorate_date: null,
        check_in_time: null,
        check_out_time: null,
        facilities_ids: null,
        facilities: [],
        img_list: null,
        hotel_intro: '',
        need_to_know: '',
        nearby_intro: ''
      },
      imgSelectedId: null
    }
  },
  filters:{
    getStarName(code){
      let name = '';
      switch(code){
        case 0: 
          name = '未评星级';
          break;
        case 1: 
          name = '一星级';
          break;
        case 2: 
          name = '二星级';
          break;
        case 3: 
          name = '三星级';
          break;
        case 4: 
          name = '四星级';
          break;
        case 5: 
          name = '五星级';
          break;
      }
      return name
    }
  },
  computed:{
    hotelImgs(){
      let imgs = this.formData.img_list;
      switch(this.imgSelectedId){
        case 0:
          imgs = imgs.filter((i) => { return i.type_id == 0 });
          break;
        case 1:
          imgs = imgs.filter((i) => { return i.type_id == 1 });
          break;
        case 2:
          imgs = imgs.filter((i) => { return i.type_id == 2 });
          break;
        case 3:
          imgs = imgs.filter((i) => { return i.type_id == 3 });
          break;
        case 4:
          imgs = imgs.filter((i) => { return i.type_id == 4 });
          break;
        case 5:
          imgs = imgs.filter((i) => { return i.type_id == 5 });
          break;
        case 6:
          imgs = imgs.filter((i) => { return i.type_id == 6 });
          break;
        case 7:
          imgs = imgs.filter((i) => { return i.type_id == 7 });
          break;
        case 8:
          imgs = imgs.filter((i) => { return i.type_id == 8 });
          break;
        case 10:
          imgs = imgs.filter((i) => { return i.type_id == 10 });
          break;
        default:
          imgs = imgs;
      }
      return imgs
    }
  },
  methods:{
    handleGetHotelInfo(id){
      let params = {
            data: {
              id: id  
            }
          };
      getSelfSupportHolelDetailAsyncRequest({
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
      data.city_id = data.city.city_id;
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
    let { hotelId } = this.$route.query;
    if(hotelId){
      this.handleGetHotelInfo(hotelId);
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
  width: 360px;
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
    margin-top: 20px;
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
    .isDefault{
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border: 20px solid #f7ba2a;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
      i{
        position: absolute;
        top: 2px;
        left: 4px;
        color: #fff;
        font-style: normal;
        line-height: normal;
        font-weight: 700;
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
    i{
      &.del{
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        padding: 4px;
        cursor: pointer;
      }

      &.setting{
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        padding: 4px;
        cursor: pointer;
        line-height: 20px;
        font-style: normal;
      }
    }
  }
}
</style>

