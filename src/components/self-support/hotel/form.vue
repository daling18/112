<template>
  <div class="wrapper">
    <div class="hotel-form">
      <el-form ref="hotelForm" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="酒店名称" prop="hotel_name">
          <el-autocomplete
            :class="'long'"
            v-model="formData.hotel_name"
            :fetch-suggestions="querySearchHotelAsync"
            placeholder="请输入酒店名称"
            @select="handleSelectHotel"
            :trigger-on-focus="false"
            :props="{
              value: 'hotel_name',
              label: 'hotel_name'
            }"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="酒店英文名称">
          <el-input :class="'long'" v-model="formData.hotel_name_en" placeholder="请输入酒店英文名称"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city_id">
          <zone-autocomplete v-model="formData.city_id"></zone-autocomplete>
        </el-form-item>
        <el-form-item label="酒店地址" prop="hotel_address">
          <el-input :class="'long'" v-model="formData.hotel_address" placeholder="请输入酒店地址"></el-input>
        </el-form-item>
        <el-form-item label="酒店英文地址">
          <el-input :class="'long'" v-model="formData.hotel_address_en" placeholder="请输入酒店英文地址"></el-input>
        </el-form-item>
        <el-form-item label="所属品牌">
          <brand-autocomplete v-model="formData.brand_code" placeholder="请选择酒店品牌"></brand-autocomplete>
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
          <el-input placeholder="请输入酒店前台电话"></el-input>
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
          <el-input v-model="formData.opening_date" placeholder="请输入酒店开业时间"></el-input>
        </el-form-item>
        <el-form-item label="装修时间">
          <el-input v-model="formData.decorate_date" placeholder="请输入酒店装修时间"></el-input>
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
        <el-form-item label="酒店图片">
          <el-select v-model="imgSelectedId">
            <el-option :value="null" label="全部图片"></el-option>
            <el-option :value="0" label="未设置"></el-option>
            <el-option :value="1" label="酒店外观"></el-option>
            <el-option :value="2" label="酒店大厅"></el-option>
            <el-option :value="3" label="酒店客房"></el-option>
            <el-option :value="4" label="酒店客房"></el-option>
            <el-option :value="5" label="公共区域"></el-option>
            <el-option :value="6" label="周边环境"></el-option>
            <el-option :value="7" label="餐厅/会议"></el-option>
            <el-option :value="8" label="娱乐设施"></el-option>
            <el-option :value="10" label="其他"></el-option>
          </el-select>
          <div class="hotel-img">
            <template v-if="hotelImgs && hotelImgs.length">
              <div v-for="(img, key) in hotelImgs" :key="key" class="hotel-img-item">
                <img :src="img.img_url">
              </div>
            </template>
            <template v-else>
              <p>暂无图片</p>
            </template>
          </div>
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
  </div>
</template>

<script>
import { searchSelfSupportHolelAsyncRequest, getSelfSupportHolelDetailAsyncRequest, getSelfSupportHolelTagsAsyncRequest, getSelfSupportHolelFacilitiesAsyncRequest, addOrEditSelfSupportHolelAsyncRequest } from 'src/api/hotel';
import ZoneAutocomplete from './zone-autocomplete/index.vue';
import BrandAutocomplete from './brand-autocomplete/index.vue';
import BdMap from './bdmap/index.vue';
import VueEditor from 'src/plugins/editor/vue-html5-editor.vue';
export default {
  data(){
    return {
      formData:{
        id: null,
        hotel_name: '',
        hotel_name_en: '',
        city_id: null,
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
      rules:{
        hotel_name: [
          { required: true, message: '请输入酒店名称', trigger: 'blur' }
        ],
        city_id: [
          { required: true, message: '请输选择所在城市', trigger: 'change' }
        ],
        hotel_address: [
          { required: true, message: '请输入酒店详细地址', trigger: 'blur' }
        ],
        brand_code: [
          { required: true, message: '请输入选择酒店品牌', trigger: 'change' }
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
        ]
      },
      imgSelectedId: null,
      point: {
        lng: null,
        lat: null
      },
      itudeVisible: false,
      tags: null,
      checkedTags: [],
      checkedTagsId: [],
      tagsVisible: false,
      facilities: null,
      checkedFacilities: [],
      checkedFacilitiesId: [],
      facilitiesVisible: false,
      searchHotelTimeout: null
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
  components:{
    ZoneAutocomplete,
    BrandAutocomplete,
    BdMap,
    VueEditor
  },
  methods:{
    querySearchHotelAsync(queryString, cb){
      let params = {
            data: {
              hotel_name: queryString
            }
          };
      clearTimeout(this.searchHotelTimeout);
      this.searchHotelTimeout = setTimeout(() => {
        searchSelfSupportHolelAsyncRequest({
          params: params,
          success: (params) => {
            let { code, data } = params['data'];
            cb(data.list); 
          }
        });
      }, 3000 * Math.random());
      
    },
    handleSelectHotel(hotel){
      handleGetHotelInfo(hotel.id);
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
    handleItudeSelectVisible(){
      this.point.lng = this.formData.longitude || null;
      this.point.lat = this.formData.latitude || null;
      this.itudeVisible = true;
    },
    handleItudeSelectSubmit(){
      this.formData.longitude = this.point.lng;
      this.formData.latitude = this.point.lat;
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
          }
          params['data'].facilities_ids = params['data'].facilities.map((i)=>{ return i.id }).join(',');
          params['data'].tag_ids = params['data'].tags.map((i)=>{ return i.id }).join(',');
          addOrEditSelfSupportHolelAsyncRequest({
            params: params,
            success: (params) => {
              let { code, data, msg } = params['data'];
              if(code == 0){
                this.$message.success(msg);
              }else{
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        }else{

        }
      });
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

