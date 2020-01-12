<template>
  <div class="wrapper">
    <div class="system-content">

      <div class="mod-form" v-if="form">
        <el-form label-width="100px" style="width:80%;" ref="scenicForm" :model="form" :rules="rules" >
          <el-form-item label="景区名称" prop="title">
            <el-input v-model="form.title" placeholder="" class="checkout-form-input"/>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:;" @click="channelVisible = true">选入</a>
          </el-form-item>
          <el-form-item label="景区类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择" class="checkout-form-input">
              <el-option :value="1" label="文化古迹"></el-option>
              <el-option :value="2" label="自然风光"></el-option>
              <el-option :value="3" label="主题乐园"></el-option>
              <el-option :value="4" label="演艺演出"></el-option>
              <el-option :value="5" label="动植物园"></el-option>
              <el-option :value="6" label="城市公园"></el-option>
              <el-option :value="7" label="冰雪世界"></el-option>
              <el-option :value="8" label="海洋馆"></el-option>
              <el-option :value="9" label="体验馆"></el-option>
              <el-option :value="10" label="温泉"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="景区标签" prop="tag_ids">
            <el-tag :class="'tag-item'"
                    v-for="(tag, key) in form.tags"
                    :key="key"
                    :closable="true"
                    type="gray"
                    @close="handleTagClose(key)">
              {{tag.tag_name}}
            </el-tag>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:;" @click="handleSelectTagsVisible">选择标签</a>
          </el-form-item>
          <el-form-item label="所在城市" prop="city_id">
            <zone-autocomplete v-model="postArea" @change="handleArea" :class="'checkout-form-input'"></zone-autocomplete>
            <!-- <select-area v-model="form.city_id" @change="handleArea"/> -->
          </el-form-item>
          <el-form-item label="景区地址" prop="address">
            <el-input v-model="form.address" placeholder="" class="checkout-form-input" />
          </el-form-item>
          <el-form-item label="所处经纬度" required>
            <div class="lng-lat">
              <el-col :span="8">
                <el-form-item prop="longitude">
                  <el-input v-model="form.longitude" readonly placeholder="经度"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                -
              </el-col>
              <el-col :span="8">
                <el-form-item prop="latitude">
                  <el-input v-model="form.latitude" readonly placeholder="纬度"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <a href="javascript:;" @click="handleItudeSelectVisible">选择经纬度</a>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="景区等级" prop="grade">
            <el-select v-model="form.grade" placeholder="请选择" class="checkout-form-input">
              <el-option :value="0" label="未评级"></el-option>
              <el-option :value="1" label="A"></el-option>
              <el-option :value="2" label="AA"></el-option>
              <el-option :value="3" label="AAA"></el-option>
              <el-option :value="4" label="AAAA"></el-option>
              <el-option :value="5" label="AAAAA"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="景区图片" prop="img_path">
            <!-- <input-number  v-model="form.img_path" placeholder="" /> -->
            <div class="img-list-box">
              <template v-for="(img,idx) in form.img_path" v-if="form.img_path && form.img_path.length > 0">
                <div class="img-item" :key="idx">
                  <img class="image" :src="img">
                  <i class="el-icon-close" @click="delImgPathForPic(idx)"></i>
                </div>
              </template>
              <el-button @click="albumType = true" type='primary'>图片库选择</el-button>
              <!-- <el-upload
                class="visa-uploader"
                action="/bom/api/photoalbum/upload_pic"
                list-type="picture-card"
                ref="uploader"
                :show-file-list="false"
                accept="image/png,image/jpg,image/jpeg,image/gif"
                :before-upload="beforehandlePicUpload"
                :on-change="handlePicUpload"
                :on-success="handleUploadPicSuccess">
                <i class="el-icon-plus" />
              </el-upload> -->
              <div class="color-gray">最少选择4张图片</div>
            </div>
            
          </el-form-item>
          <el-form-item label="营业时间">
            <el-input v-model="form.runtime" placeholder="" class="checkout-form-input" /> 
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.tel" placeholder="" class="checkout-form-input" /> 
          </el-form-item>
          <el-form-item label="一句话简介" prop="brief">
            <el-input v-model="form.brief" placeholder="请输入一句话简介" class="checkout-form-input" />
          </el-form-item>
          <el-form-item label="景区介绍" prop="introduce" required>
            <vue-editor v-model="form.introduce"></vue-editor>
          </el-form-item>
          <el-form-item label="景区交通" >
            <el-input type="textarea" v-model="form.traffic_guide" placeholder="" />
          </el-form-item>
          <el-form-item label="预订须知" >
            <el-input type="textarea" v-model="form.notice" placeholder="" />
          </el-form-item>
        </el-form>
      </div>
        
      <div class="submit-buttons">
        <el-button type="primary" @click="setSubmitForm">保存</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
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
      title="选择渠道景区"
      :visible.sync="channelVisible">
      <scenic-channel-autocomplete v-model="scenicInfo"></scenic-channel-autocomplete>
      <span slot="footer" class="dialog-footer">
        <el-button @click="channelVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChannelSelectSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <album :visible.sync='albumType' :max='0' @imageArray='handleCheckImage' :check='form.img_path'></album>

  </div>
</template>

<script>
import { 
  getSelfScenicDetail, 
  setSubmitScenicForm,
  getProductTagList }from 'src/api/self_support.goodscate'
import SelectArea from 'src/plugins/SelectArea'
import ZoneAutocomplete from './components/FourLevelZoneAutocomplete.vue';
import ScenicChannelAutocomplete from './components/ScenicChannelAutocomplete.vue';
import BdMap from './components/BaiduMap.vue';
import VueEditor from 'src/plugins/editor/vue-html5-editor.vue';
import Album from 'src/plugins/Album'

export default {
  components: {
    VueEditor,
    SelectArea,
    ZoneAutocomplete,
    ScenicChannelAutocomplete,
    BdMap,
    Album
  },
  data () {
    return {
      form:{
        id: '',
        title: '',
        type: '',
        tag_ids: '',
        tags:[],
        grade: '',
        tel: '',
        runtime:'',
        city_id: '',
        longitude: '',
        latitude: '',
        address: '',
        brief: '',
        img_path: [],
        status: '',
        notice: '',
        introduce: '',
        traffic_guide: ''
      },
      postArea:{},
      selPostArea: {
        '0': {},
        '1': {},
        '2': {}
      },
      point: {
        lng: null,
        lat: null
      },
      itudeVisible: false,
      tags: null,
      checkedTags: [],
      checkedTagsId: [],
      tagsVisible: false,
      channelVisible:false,
      scenicInfo:null,
      albumType: false,
      rules:{
        title: [
          { required: true, message: '请输入景区名称', trigger: 'blur' }
        ],
        type: [
          { required: true, type:'number', message: '请输选择景区类型', trigger: 'change' }
        ],
        tag_ids: [
          { required: true, message: '请输选择景区标签', trigger: 'change' }
        ],
        city_id: [
          { required: true, message: '请输选择所在城市', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入景区详细地址', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请选择景区经纬度', trigger: 'change' }
        ],
        latitude: [
          { required: true, message: '请选择景区经纬度', trigger: 'change' }
        ],
        grade: [
          { required: true, type: 'number', message: '请选择景区等级', trigger: 'change' }
        ],
        img_path: [
          { required: true, type:'array', message: '请选择景区图片', trigger: 'change' }
        ],
        brief: [
          { required: true, type: 'string', message: '请输入一句话简介', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请选择输入景区介绍', trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
    // 景区详情
    selfSupportScenicDetail(){

      if(this.$route.query.id){
        let para = {};
        para.data = {};
        para.data.id = this.$route.query.id;

        getSelfScenicDetail({
          params: para,
          success: (params) => {
            let {code, msg, data } = params.data;

            if (!code) {
              this.$set(this,'form',data);
              this.postArea = {
                area_0:data.country_id,
                area_1:data.province_id,
                area_2:data.city_id,
                area_3:data.county_id
              };
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      }
    },
    // 景区提交表单
    setSubmitForm(){
      this.$refs['scenicForm'].validate((valid) => {
        if(valid){
          if(this.form && this.form.img_path.length < 4){
            this.$message.error('景区图片最少选择4张！');
            return false;
          }
          let para = {};
          para.data = JSON.parse(JSON.stringify(this.form));
          
          setSubmitScenicForm({
            params: para,
            success: (params) => {
              let {code, msg, data } = params.data;

              this.$message({
                type: code?'error':'success',
                message:msg
              })
              this.$router.push({path:'/self-support/scenic/list'})
            },
            showLoading: true
          });
        }
      })
    },
    handleArea (level, area, value) {
      this.selPostArea[level] = {id: area.id || '', area_name: area.area_name || ''}
      if(level == 2 && area.id){
        this.$set(this.form,'city_id',area.id)
      }
      if(level == 3 && area.id){
        this.$set(this.form,'city_id',area.id)
      }
      if(level != 2 && level != 3){
        this.$set(this.form,'city_id','')
      }
    },
    handleItudeSelectVisible(){
      this.point.lng = this.form.longitude || null;
      this.point.lat = this.form.latitude || null;
      this.itudeVisible = true;
    },
    handleItudeSelectSubmit(){
      this.form.longitude = this.point.lng;
      this.form.latitude = this.point.lat;
      this.itudeVisible = false;
    },
    handleSelectTagsVisible(){
      let params = {
        data: {
          type: 2,
          page_size: 10000
        }
      }
      getProductTagList({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.tags = data.list;
            this.checkedTags = [... this.form.tags];
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
      this.form.tags = this.checkedTags;
      this.form.tag_ids = this.form.tags.map(item=> {
        return item.id;
      }).join(',');
      this.tagsVisible = false;
    },
    // 删除标签
    handleTagClose(key){
      this.form.tags.splice(key, 1);
      this.form.tag_ids = this.form.tags.map(item=> {
        return item.id;
      }).join(',');
    },
    // 图片上传
    handlePicUpload(file, fileList){},
    beforehandlePicUpload(file){
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      
    },
    handleUploadPicSuccess(response, file, fileList){
      let { path } = response.data;
      this.form.img_path.push(path)
    },
    delImgPathForPic(key){
      this.form.img_path.splice(key, 1);
    },
    handleChannelSelectSubmit(){
      let scenicInfo = JSON.parse(JSON.stringify(this.scenicInfo));
      let form = JSON.parse(JSON.stringify(this.form));
      let assign = Object.assign(form, scenicInfo);
      this.$set(this,'form',assign);
      this.postArea = {
        area_0:assign.country_id,
        area_1:assign.province_id,
        area_2:assign.city_id,
        area_3:assign.county_id
      };
      this.channelVisible = false;
    },
    handleCheckImage (data) {
      this.form.img_path = []
      this.form.img_path = data.map((item, index) => {
        let obj = item.sub_pic_url;
        return obj
      })
    }
  },
  mounted(){
    this.selfSupportScenicDetail();
  }
}
</script>

<style lang="scss" scoped>
.mod-form{
  padding: 0 15px;
  overflow: hidden;
  .checkout-form-input{
    width: 400px;
  }
}
.system-content{
  padding: 35px 0 25px;
  background: #fff;
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
.img-list-box{
  .img-item{
    position: relative;
    display:inline-block;
    .el-icon-close{
      padding: 5px;
      background: #5a5d62;
      color: #fff;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 5px;
    }
  }
  .image{
    width: 100px;
    height: 100px;
    vertical-align:top;
    margin: 0 5px 5px 0;
  }
}
</style>
<style lang="scss">
.accept_range textarea{height: 82px;}
.visa-uploader{
  display:inline-block;
  vertical-align:top;
  .image{
    width: 100%;
    height: 100%;
  }
  .el-upload--picture-card{
    width: 100px;
    height: 100px;
    line-height: 108px;
    border-radius: 0;
    border: 1px solid #e4e4e4;
    .el-progress{
      margin-top: 10px;
    }
  }
}

</style>
