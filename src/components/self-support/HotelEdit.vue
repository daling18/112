<template>
  <div class="wrapper">
    <div class="hotel-form">
      <el-form ref="hotelForm" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="酒店名称" prop="hotel_name">
          <el-autocomplete
            :class="'long'"
            v-model="formData.hotel_name"
            :fetch-suggestions="querySearchHotelAsync"
            :trigger-on-focus="false"
            placeholder="请输入酒店名称"
            :props="{
              label: 'hotel_name',
              value: 'hotel_name'
            }"
            @select="handleSelectHotel">
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="酒店英文名称">
          <el-input :class="'long'" v-model="formData.hotel_name_en" placeholder="请输入酒店英文名称"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="area_id">
          <zone-autocomplete v-model="postArea" @change="handleArea" :class="'long'"></zone-autocomplete>
        </el-form-item>
        <el-form-item label="酒店地址" prop="hotel_address">
          <el-input :class="'long'" v-model="formData.hotel_address" placeholder="请输入酒店地址"></el-input>
        </el-form-item>
        <el-form-item label="酒店英文地址">
          <el-input :class="'long'" v-model="formData.hotel_address_en" placeholder="请输入酒店英文地址"></el-input>
        </el-form-item>
        <el-form-item label="所属品牌">
          <brand-autocomplete v-model="formData.brand_name" :defaultList="{id:formData.brand_code,brand_name:formData.brand_name}" placeholder="请输入选择酒店品牌名称"></brand-autocomplete>
        </el-form-item>
        <el-form-item label="所处经纬度" required>
          <div class="lng-lat">
            <el-col :span="8">
              <el-form-item prop="longitude">
                <el-input v-model="formData.longitude" readonly placeholder="经度"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              -
            </el-col>
            <el-col :span="8">
              <el-form-item prop="latitude">
                <el-input v-model="formData.latitude" readonly placeholder="纬度"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <a href="javascript:;" @click="handleItudeSelectVisible">选择经纬度</a>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item label="酒店星级" prop="star_code">
          <el-select v-model="formData.star_code" placeholder="请选择酒店星级">
            <el-option :value="0" label="未评星级"></el-option>
            <el-option :value="1" label="一星级"></el-option>
            <el-option :value="2" label="二星级"></el-option>
            <el-option :value="3" label="三星级"></el-option>
            <el-option :value="4" label="四星级"></el-option>
            <el-option :value="5" label="五星级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前台电话">
          <el-input v-model="formData.telephone" placeholder="请输入酒店前台电话"></el-input>
        </el-form-item>
        <el-form-item label="酒店标签">
          <el-tag :class="'tag-item'"
                  v-for="(tag, key) in formData.tags"
                  :key="key"
                  :closable="true"
                  type="gray"
                  @close="handleTagClose(key)">
            {{tag.tag_name}}
          </el-tag>
          &nbsp;&nbsp;&nbsp;
          <a href="javascript:;" @click="handleSelectTagsVisible">选择标签</a>
        </el-form-item>
        <el-form-item label="开业时间">
          <el-date-picker
            v-model="formData.opening_date"
            align="right"
            type="year"
            placeholder="请输入选择开业时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="装修时间">
          <el-date-picker
            v-model="formData.decorate_date"
            align="right"
            type="year"
            placeholder="请选择装修时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-input v-model="formData.check_in_time" placeholder="请输入酒店入住时间"></el-input>
        </el-form-item>
        <el-form-item label="离店时间">
          <el-input v-model="formData.check_out_time" placeholder="请输入酒店离店时间"></el-input>
        </el-form-item>
        <el-form-item label="酒店设施">
          <el-tag :class="'facilities-item'"
                  v-for="(facilities, key) in formData.facilities"
                  :key="key"
                  :closable="true"
                  type="gray"
                  @close="handleFacilitiesClose(key)">
            {{facilities.name}}
          </el-tag>
          &nbsp;&nbsp;&nbsp;
          <a href="javascript:;" @click="handleSelectFacilitiesVisible">选择酒店设施</a>
        </el-form-item>
        <el-form-item label="酒店图片" required>
          <el-select v-model="imgSelectedId" placeholder="请选择图片类型" clearable>
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
          <el-button @click="handleOpenAlbum" type='primary'>图片库选择</el-button>
          <el-form-item prop="img_list">
            <div class="hotel-img">
              <template v-if="hotelImgs && hotelImgs.length">
                <div v-for="(img, key) in hotelImgs" :key="key" class="hotel-img-item">
                  <div v-if="img.is_default" class="isDefault">
                    <i>首</i>
                  </div>
                  <i v-if="!img.is_default" class="el-icon-close del" @click="handleRemoveImgListItem(img.k)"></i>
                  <i v-if="!img.is_default" class="setting" @click="handleSetFristImg(img.k)">
                    设为首图
                  </i>
                  <img :src="img.img_url">
                </div>
              </template>
              <template v-else>
                <p>暂无图片</p>
              </template>
            </div>
          </el-form-item>
          <!-- <a href="javascript:;" @click="handleShowPictureDialog">&nbsp;&nbsp;&nbsp;上传图片</a> -->
          
        </el-form-item>
        <el-form-item label="酒店介绍" prop="hotel_intro">
          <vue-editor v-model="formData.hotel_intro"></vue-editor>
        </el-form-item>
        <el-form-item label="入住须知">
          <vue-editor v-model="formData.need_to_know"></vue-editor>
        </el-form-item>
        <el-form-item label="周边信息">
          <vue-editor v-model="formData.nearby_intro"></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm">保存</el-button>
          <el-button @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="经纬度"
      :visible.sync="itudeVisible">
      <bd-map :point.sync="point"></bd-map>
      <span slot="footer" class="dialog-footer">
        <el-button @click="itudeVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleItudeSelectSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择标签"
      :visible.sync="tagsVisible">
      <el-checkbox-group :class="'select-checkbox-group'" v-model="checkedTagsId" @change="handleCheckedTagsChange">
        <el-checkbox :class="'select-checkbox'" v-for="tag in tags" :label="tag.id" :key="tag.tag_name">{{tag.tag_name}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tagsVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectTagsSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择酒店设施"
      :visible.sync="facilitiesVisible">
      <el-checkbox-group :class="'select-checkbox-group'" v-model="checkedFacilitiesId" @change="handleCheckedFacilitiesChange">
        <el-checkbox :class="'select-checkbox'" v-for="fac in facilities" :label="fac.id" :key="fac.name">{{fac.name}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="facilitiesVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSelectFacilitiesSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="上传图片"
      :visible.sync="pictureVisible"
      @close="handleClosePictureDialog">
      <el-form ref="pictureForm" :model="pictureForm" label-width="80px">
        <el-form-item label="图片类型">
          <el-select v-model="pictureForm.pictureType">
            <el-option :value="1" label="酒店外观"></el-option>
            <el-option :value="2" label="酒店大厅"></el-option>
            <el-option :value="3" label="酒店客房"></el-option>
            <el-option :value="5" label="公共区域"></el-option>
            <el-option :value="6" label="周边环境"></el-option>
            <el-option :value="7" label="餐厅/会议"></el-option>
            <el-option :value="8" label="娱乐设施"></el-option>
            <el-option :value="10" label="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="/bom/api/photoalbum/upload_pic"
            list-type="picture-card"
            :file-list="pictureForm.pictureList"
            :before-upload="handlePictureBeforeUpload"
            :on-success="handlePictureUploadSuccess"
            :on-remove="handlePictureUploadRemove">
            <i class="uploader-icon el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          原图分辨率最少不能低于480*480，支持jpg，jpeg，png格式，2M以内图片
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClosePictureDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitPictureUpload">确 定</el-button>
      </span>
    </el-dialog>
    <album :visible.sync='albumType' @imageArray='handleCheckImage' :check='formData.img_list' checkkey='img_url' idkey='id'></album>
  </div>
</template>

<script>
import { searchSelfSupportHolelAsyncRequest, getSelfSupportHolelDetailAsyncRequest, getSelfSupportHolelTagsAsyncRequest, getSelfSupportHolelFacilitiesAsyncRequest, addOrEditSelfSupportHolelAsyncRequest } from 'src/api/hotel';
import ZoneAutocomplete from './components/FourLevelZoneAutocomplete.vue';
import BrandAutocomplete from './components/HotelBrandAutocomplete.vue';
import BdMap from './components/BaiduMap.vue';
import VueEditor from 'src/plugins/editor/vue-html5-editor.vue';
import Album from 'src/plugins/Album';
export default {
  data(){
    return {
      formData:{
        id: null,
        hotel_name: '',
        hotel_name_en: '',
        country_id: null,
        province_id: null,
        area_id: null,
        city_id: null,
        district_id: null,
        brand_code: null,
        brand_name: null,
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
        img_list: [],
        hotel_intro: '',
        need_to_know: '',
        nearby_intro: ''
      },
      rules:{
        hotel_name: [
          { required: true, message: '请输入酒店名称', trigger: 'blur' }
        ],
        area_id: [
          { required: true, message: '请输选择所在城市', trigger: 'change' }
        ],
        hotel_address: [
          { required: true, message: '请输入酒店详细地址', trigger: 'blur' }
        ],
        brand_code: [
          { required: true, message: '请输入选择酒店品牌名称', trigger: 'change' }
        ],
        longitude: [
          { required: true, message: '请选择酒店经纬度', trigger: 'change' }
        ],
        latitude: [
          { required: true, message: '请选择酒店经纬度', trigger: 'change' }
        ],
        star_code: [
          { required: true, type: 'number', message: '请选择酒店星级', trigger: 'change' }
        ],
        hotel_intro: [
          { required: true, message: '请选择输入酒店介绍信息', trigger: 'blur' }
        ],
        img_list: [
          { required: true, type: 'array', message: '请上传酒店图片' }
        ]
      },
      isSearchHotel: false,
      imgSelectedId: null,
      point: {
        lng: null,
        lat: null
      },
      hotelDataList: [],
      itudeVisible: false,
      tags: null,
      checkedTags: [],
      checkedTagsId: [],
      tagsVisible: false,
      facilities: null,
      checkedFacilities: [],
      checkedFacilitiesId: [],
      facilitiesVisible: false,
      searchHotelTimeout: null,
      pictureVisible: false,
      pictureForm:{
        pictureType: null,
        pictureList: []
      },
      HotelSelectList:null,
      postArea:{},
      selPostArea: {
        '0': {},
        '1': {},
        '2': {},
        '3': {}
      },
      albumType: false
    }
  },
  computed:{
    hotelNameInputIcon(){
       return  this.isSearchHotel ? 'loading' : 'edit'
    },
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
  watch:{
    'formData.img_list': {
      handler(val, oldVal){
        if(val.length){
          val.map((i, k) => { i.k = k });
        }
        this.$refs['hotelForm'].validateField('img_list');
      },
      deep: true
    },
    /* hotelDataList: {
      handler(val, oldVal){
        let result = null;
        if(val.length && val.some(i => i.hotel_name == this.formData.hotel_name)){
          result = val.filter(i => i.hotel_name == this.formData.hotel_name)[0];
          this.handleGetHotelInfo(result.id);
        }
      },
      deep: true
    } */
  },
  components:{
    ZoneAutocomplete,
    BrandAutocomplete,
    BdMap,
    Album,
    VueEditor
  },
  methods:{
    querySearchHotelAsync(queryString, cb){
      let { id } = this.$route.query;
      this.hotelDataList = [];
      if(!id){
        this.formData.id = null;
      }
      clearTimeout(this.searchHotelTimeout);
      if(queryString !== ''){
        this.searchHotelTimeout = setTimeout(() => {
          let params = {
            data: {
              hotel_name: queryString
            }
          };
          searchSelfSupportHolelAsyncRequest({
            params: params,
            success: (params) => {
              let { code, data } = params['data'];
              if(code == 0){
                this.hotelDataList = data.list;
              }else{
                this.hotelDataList = [];
              }
              cb(this.hotelDataList);
            }
          });
        }, 500);
      }else{
        cb(this.hotelDataList);
      }
    },
    handleSelectHotel(hotel){
      this.handleGetHotelInfo(hotel.id);
    },
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
            this.postArea = {
              area_0:data.country_id,
              area_1:data.province_id,
              area_2:data.city_id,
              area_3:data.district_id
            };
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
        this.formData['area_id'] = data['district_id']
      }
    },
    handleSetFristImg(k){
      this.formData.img_list.map(img => {
        if(img.is_default == 1){
          img.is_default = 0;
        }else{
          if(img.k == k){
            img.is_default = 1;
          }
        }
      });
    },
    handleRemoveImgListItem(k){
      this.formData.img_list.splice(k,1);
    },
    handleItudeSelectVisible(){
      this.point.lng = this.formData.longitude || null;
      this.point.lat = this.formData.latitude || null;
      this.itudeVisible = true;
    },
    handleItudeSelectSubmit(){
      this.formData.longitude = '' + this.point.lng;
      this.formData.latitude = '' + this.point.lat;
      this.itudeVisible = false;
    },
    handleSelectTagsVisible(){
      let params = {
        data: {
          type: 1,
          page_size: 10000
        }
      }
      getSelfSupportHolelTagsAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.tags = data.list;
            this.checkedTags = [... this.formData.tags];
            this.checkedTagsId = this.checkedTags.map((i)=>{ return i.id });
            this.tagsVisible = true;            
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
      
    },
    handleCheckedTagsChange(value){
      this.checkedTags = this.tags.filter((i) => { return value.indexOf(i.id) > -1 });
    },
    handleSelectTagsSubmit(){
      this.formData.tags = this.checkedTags;
      this.tagsVisible = false;
    },
    handleTagClose(key){
      this.formData.tags.splice(key, 1);
    },
    handleSelectFacilitiesVisible(){
      let params = {
        data: {
          type: 1,
          page_size: 10000
        }
      }
      getSelfSupportHolelFacilitiesAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.facilities = data.list;
            this.checkedFacilities = [... this.formData.facilities];
            this.checkedFacilitiesId = this.checkedFacilities.map((i)=>{ return i.id });
            this.facilitiesVisible = true;            
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
      
    },
    handleCheckedFacilitiesChange(value){
      this.checkedFacilities = this.facilities.filter((i) => { return value.indexOf(i.id) > -1 });
    },
    handleSelectFacilitiesSubmit(){
      this.formData.facilities = this.checkedFacilities;
      this.facilitiesVisible = false;
    },
    handleFacilitiesClose(key){
      this.formData.facilities.splice(key, 1);
    },
    handleSubmitForm(){
      this.$refs['hotelForm'].validate((valid) => {
        if(valid){
          let params = {
            data: JSON.parse(JSON.stringify(this.formData))
          };
          if(!params['data'].img_list.some(i => i.is_default == 1)){
            this.$message.error('请设置酒店首图');
            return false;
          }
          params['data'].facilities_ids = params['data'].facilities.map((i)=>{ return i.id }).join(',');
          params['data'].tag_ids = params['data'].tags.map((i)=>{ return i.id }).join(',');
          params['data'].img_list.map(i => delete i.k);
          params['data'].opening_date = new Date(params['data'].opening_date).getFullYear();
          params['data'].decorate_date = new Date(params['data'].decorate_date).getFullYear();

          if(this.formData.brand_name && typeof this.formData.brand_name == 'object'){
            params['data'].brand_code = this.formData.brand_name.id;
            params['data'].brand_name = this.formData.brand_name.brand_name;
          }

          addOrEditSelfSupportHolelAsyncRequest({
            params: params,
            success: (params) => {
              let { code, data, msg } = params['data'];
              if(code == 0){
                this.$message.success(msg);
                this.$router.replace({ name: 'SingleproHotel' });
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
    handleShowPictureDialog(){
      this.pictureVisible = true;
    },
    handlePictureBeforeUpload(file){
      const isJPG = ['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) > -1 ;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg、jpeg、png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handlePictureUploadSuccess(response, file, fileList){
      let { code, data, msg } = response;
      if(code == 0){
        this.pictureForm.pictureList.push({
          name: data.name,
          url: data.path
        });
      }else{
        this.$message.error(msg);
      }
    },
    handlePictureUploadRemove(file, fileList){
      let fileUrl = file.url,
          picture = this.pictureForm.pictureList,
          i = 0, len = picture.length, index;
      for(i; i < len; i++){
        if(picture[i].url == fileUrl){
          index = i;
          break;
        }
      }
      picture.splice(index,1);
    },
    handleClosePictureDialog(){
      this.$set(this, 'pictureForm', {
        pictureType: null,
        pictureList: []
      });
      this.pictureVisible = false;
    },
    handleSubmitPictureUpload(){
      let pictures = this.pictureForm.pictureList,
          type_id = this.pictureForm.pictureType;

      if(!type_id){
        this.$message.error('请选择图片上传类型');
        return false;
      }

      if(!pictures.length){
        this.$message.error('请选择需要上传的图片');
        return false;
      }

      pictures.forEach((pic) => {
        this.formData.img_list.push({
          type_id: type_id,
          img_url: pic.url
        });
      });
      this.handleClosePictureDialog();
    },
    handleArea (level, area, value) {
      this.selPostArea[level] = {id: area.id || '', area_name: area.area_name || ''}
      if(level == 2 && area.id){
        this.$set(this.formData,'area_id',area.id)
      }
      if(level == 3 && area.id){
        this.$set(this.formData,'area_id',area.id)
      }
      if(level != 2 && level != 3){
        this.$set(this.formData,'area_id','')
      }
    },
    handleOpenAlbum(){
      if(!this.imgSelectedId){
        this.$message.error('请选择图片类型');
        return false;
      }
      this.albumType = true;
    },
    handleCheckImage (newImg) {
      let oldImg = this.formData.img_list,
          img = [];
      oldImg.forEach(i => {
        if(newImg.some(j => j.id == i.id)){
          img.push(i);
        }
      });
      newImg.forEach(i => {
        if(!oldImg.some(j => j.id == i.id)){
          img.push({
            id: i.id,
            img_url: i.sub_pic_url,
            type_id: this.imgSelectedId,
            is_default: 0
          });
        }
      });
      this.formData.img_list = img;
    }
  },
  mounted(){
    let { id } = this.$route.query;
    if(id){
      this.handleGetHotelInfo(id);
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
.uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  .uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
  }
}
</style>

