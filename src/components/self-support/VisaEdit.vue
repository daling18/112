<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">基础信息</div>
        <el-form label-width="120px" class="info-form">
          <div class="form-inputs clearfix mb10">
            <div class="w50 fl">
              <el-form-item label="产品来源">
                <el-select
                  v-if="!isLoading"
                  class="w100"
                  v-model="selectSupplier"
                  filterable
                  remote
                  clearable
                  value-key="id"
                  :loading="loadingSupplier"
                  :remote-method="getMatchSupplier"
                  placeholder="输入产品来源供应商名称"
                >
                  <el-option v-for="item in supplierList" :key="item.id" :label="item.name" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="签证名称" required>
                <el-input v-model="info.name" placeholder="" />
              </el-form-item>
              <el-form-item label="签证类型" required>
                <el-select class="w100" v-model="info.visa_type">
                  <el-option v-for="(type, index) in VISA_TYPE_MAP" :key="index" :label="type" :value="Number(index)" />
                </el-select>
              </el-form-item>
              <el-form-item label="签证国家" required>
                <div class="flex">
                  <el-select class="flex-1" v-model="info.continent" value-key="id">
                    <el-option
                      v-for="(val, key) in CONTINENT_LIST"
                      :key="key"
                      :label="key"
                      :value="key"
                    />
                  </el-select>
                  <div class="ml10"/>
                  <el-select class="flex-1" filterable value-key="id" v-model="nation">
                    <el-option
                      v-for="nation in nationList"
                      :key="nation.id"
                      :label="nation.nation"
                      :value="nation"
                    />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="送签地" required>
                <select-visa-place
                  v-if="!isLoading"
                  class="w100"
                  :default-list="sendCityList"
                  placeholder="请输入送签地"
                  v-model="sendCitys"
                />
                <!-- <el-select
                  class="w100"
                  v-model="sendCitys"
                  filterable
                  clearable
                  multiple
                  value-key="id"
                  placeholder="请输入送签地"
                >
                  <el-option v-for="item in sendCityList" :key="item.id" :label="item.area_name" :value="item" />
                </el-select> -->
              </el-form-item>
              <el-form-item label="受理范围">
                <el-input class="accept_range" type="textarea" :rows="3" v-model="info.accept_range" />
              </el-form-item>
            </div>
            <div class="w50 fl">
              <el-form-item label="办理时长" required>
                送签后至少 <input-number  class="w25" v-model="info.deal_day" placeholder="" /> 个工作日
              </el-form-item>
              <el-form-item label="提前预订天数" required>
                <input-number  class="w25" v-model="info.forward_day" placeholder="" /> 个工作日
              </el-form-item>
              <el-form-item label="出签成功率">
                <input-number  :precision="2" class="w25" v-model="info.success_rate" placeholder="" /> %
              </el-form-item>
              <el-form-item label="所属领区" required>
                <el-select class="w100" v-model="info.consular_district_id">
                  <el-option v-for="(item, index) in DISTRICT_LIST" :key="index" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label="有效期" required>
                <el-input v-model="info.valid_time" placeholder="" />
              </el-form-item>
              <el-form-item label="最长停留" required>
                <el-input v-model="info.stay_time" placeholder="" />
              </el-form-item>
              <el-form-item label="入境次数" required>
                <el-input v-model="info.entry_num" placeholder="" />
              </el-form-item>
            </div>
          </div>
          <el-form-item label="签证图片" required>
            <!-- 上传多个签证图片使用
            <el-upload
              class="visa-uploader"
              action="/bom/api/selfsupport.visa/upload_img"
              list-type="picture-card"
              :file-list="imageList"
              :show-file-list="false"
              :on-preview="handlePreviewImage"
              :on-success="handleUploadImageSuccess"
              :on-remove="handleRemoveImage">
              <i class="el-icon-plus" />
              <div slot="tip" class="color-gray">原图分辨率最少不能低于480*480，支持jpg，jpeg，gif，png格式2M以内图片</div>
            </el-upload> -->
            <!-- <el-upload
              class="visa-uploader"
              action="/bom/api/selfsupport.visa/upload_img"
              list-type="picture-card"
              ref="uploader"
              :show-file-list="false"
              :auto-upload="false"
              accept="image/png,image/jpg,image/jpeg,image/gif"
              :on-change="handleCheckedUpload"
              :on-success="handleUploadImageSuccess"
              :on-error="handleCloseLoading">
              <template v-if="imageList.length > 0">
                <img class="image" :src="imageList[0].url">
              </template>
              <i v-else class="el-icon-plus" />
              <div slot="tip" class="color-gray">原图分辨率最少不能低于480*480，支持jpg，jpeg，gif，png格式2M以内图片</div>
            </el-upload> -->
            <div class="visa-uploader">
              <div class="el-upload el-upload--picture-card" @click="showAlbumDialog=true">
                <img v-if="imageList.length > 0" class="image" :src="imageList[0].sub_pic_url">
                <i v-else class="el-icon-plus" />
                <i class="el-icon-close" v-show="imageList.length > 0" @click.stop="imageList.pop()" />
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="mod-form">
        <div class="title">材料信息</div>
        <div class="material-item">
          <el-form label-width="120px" class="material-form" v-if="info.material && info.material[0]">
            <el-form-item label="游客类型" required>
              <el-select v-model="info.material[0].tourist_type">
                <el-option v-for="(type, index) in TOURIST_TYPE_MAP" :key="index" :label="type" :value="index" />
              </el-select>
            </el-form-item>
            <el-form-item label="材料说明" required>
              <vue-editor class="editor" v-model="info.material[0].remark" :auto-height="false" @input="handleRemarkChange(info.material[0], $event)"/>
              <div class="editor-footer tar">{{ info.material[0].length }}/5000</div>
            </el-form-item>
            <div class="opt-btns">
              <a class="add-btn" href="javascript:;" @click="handleAddMaterial()" />
              <a class="sub-btn" href="javascript:;" v-if="info.material[1]" @click="handleDelMaterial(idx)" />
            </div>
          </el-form>
        </div>
        <el-collapse-transition v-if="info.material && info.material.length > 1">
          <div v-show="expandMaterial">
            <div class="material-item" v-for="(item, idx) in info.material" :key="idx" v-show="idx > 0">
              <el-form label-width="120px" class="material-form">
                <el-form-item label="游客类型" required>
                  <el-select v-model="item.tourist_type">
                    <el-option v-for="(type, index) in TOURIST_TYPE_MAP" :key="index" :label="type" :value="index" />
                  </el-select>
                </el-form-item>
                <el-form-item label="材料说明" required>
                  <vue-editor class="editor" v-model="item.remark" :auto-height="false" @input="handleRemarkChange(item, $event)"/>
                  <div class="editor-footer tar">{{ item.length }}/5000</div>
                </el-form-item>
                <div class="opt-btns">
                  <a class="add-btn" href="javascript:;" @click="handleAddMaterial()" />
                  <a class="sub-btn" href="javascript:;" v-if="info.material[1]" @click="handleDelMaterial(idx)" />
                </div>
              </el-form>
            </div>
          </div>
        </el-collapse-transition>
        <div class="tar toggle-btn" v-if="info.material && info.material.length > 1">
          <a href="javascript:;" @click="expandMaterial=!expandMaterial">{{ expandMaterial ? '收起' : '展开' }}</a>
        </div>
      </div>
      <div class="mod-form">
        <div class="title">签证报价</div>
        <div class="price-item">
          成人价格
          <el-form inline label-width="80px">
            <el-form-item label="成本价" required>
              <input-number  :precision="3" v-model="info.adult_cost_price" placeholder="" /> 元
            </el-form-item>
            <el-form-item label="结算价" required>
              <input-number  :precision="3" v-model="info.adult_peer_price" placeholder="" /> 元
            </el-form-item>
            <el-form-item label="销售价" required>
              <input-number  :precision="3" v-model="info.adult_out_price" placeholder="" /> 元
            </el-form-item>
            <el-form-item label="挂牌价" required>
              <input-number  :precision="3" v-model="info.adult_sticker_price" placeholder="" /> 元
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="price-item">
          儿童价格
          <el-form inline label-width="80px">
            <el-form-item label="成本价" required>
              <input-number  :precision="3" v-model="info.child_cost_price" placeholder="" /> 元
            </el-form-item>
            <el-form-item label="结算价" required>
              <input-number  :precision="3" v-model="info.child_peer_price" placeholder="" /> 元
            </el-form-item>
            <el-form-item label="销售价" required>
              <input-number  :precision="3" v-model="info.child_out_price" placeholder="" /> 元
            </el-form-item>
            <el-form-item label="挂牌价" required>
              <input-number  :precision="3" v-model="info.child_sticker_price" placeholder="" /> 元
            </el-form-item>
          </el-form>
        </div> -->
        <el-form label-width="68px" class="other-form">
          <el-form-item label="签证须知">
            <el-input type="textarea" v-model="info.attention" placeholder="" />
          </el-form-item>
          <el-form-item label="温馨提示">
            <el-input type="textarea" :rows="3" v-model="info.remind"/>
          </el-form-item>
          <el-form-item label="上传附件">
            <el-upload
              action="/bom/api/photoalbum/upload_visa_pic"
              name="file"
              :file-list="attachment"
              :before-upload="handleBeforeUpload"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :on-success="handleUploadsucc"
            >
              <el-button size="small">上传附件</el-button>
              <span slot="tip">支持word、excel、jpeg、png、jpg、pdf格式，不可超过10份</span>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="submit-buttons">
          <el-button type="primary" @click="handleSaveData">保存</el-button>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </div>
    </div>
    <album
      :visible.sync="showAlbumDialog"
      :max="1"
      @imageArray="handleSelectImage"
      :check="imageList"
      checkkey="sub_pic_url"
    />

  </div>
</template>

<script>
import { supplierOrgList, addVisa, todoAddVisa, delImage, getCityList }from 'src/api/selfsupport.visa'
import html5Editor from 'src/plugins/editor/vue-html5-editor.vue';
import InputNumber from 'src/plugins/InputNumber.vue';
import SelectVisaPlace from './components/SelectVisaPlace.vue';
import Album from 'src/plugins/Album'
import { noHtmlLength, toFixed } from 'src/utils/format';

export default {
  components: {
    'vue-editor': html5Editor,
    SelectVisaPlace,
    Album,
    InputNumber
  },
  filters: {
    toFixed,
    number(num) {
      return Number(num);
    }
  },
  data () {
    const { query } = this.$route;

    return {
      VISA_TYPE_MAP: {},
      TOURIST_TYPE_MAP: {},
      DISTRICT_LIST: {},
      CONTINENT_LIST: {},
      isLoading: true,
      sendCityList: [],
      sendCitys: [],
      info: {
        material: []
      },
      loadingSupplier: false,
      selectSupplier: {},
      supplierList: [],
      imageList: [],
      attachment: [],
      uploadingInstant: '',
      expandMaterial: true,
      showAlbumDialog: false
    }
  },
  computed: {
    nationList() {
      return this.CONTINENT_LIST[this.info.continent] || [];
    },
    nation: {
      get(){
        return {id: this.info.nation_id, nation: this.info.nation_name}
      },
      set(val){
        // console.log('send city set val: ', val);
        if(val){
          this.info.nation_id = val.id;
          this.info.nation_name = val.nation;
        }else{
          this.info.nation_id = '';
          this.info.nation_name = '';
        }
      }
    }
  },
  mounted(){
    this.getInfo();
    // 获取送签地列表
    getCityList({
      params: { data: {area_name: ''} },
      success: ({data: { code, data, msg }}) => {
        let list = [];

        if(!code){
          list = data || [];
        }else{
          this.$message({message: msg || '获取送签地列表失败', type:'error'})
        }
        this.sendCityList = list;
        this.sendCitys.forEach(city => {
          if (!this.sendCityList.some(c => c.id == city.id)) {
            this.sendCityList.push(city)
          }
        })
      }
    });
  },
  methods:{
    getInfo() {

      addVisa({
        params: {data: {id: this.$route.query.id || ''}},
        success: ({data}) => {
          this.isLoading = false;
          if (data.code == '0') {
            let result = data.data;
            this.info = result.info;
            this.attachment = result.info.attachment;
            this.VISA_TYPE_MAP = result.visa_type_list;
            this.TOURIST_TYPE_MAP = result.tourist_type_list;
            this.DISTRICT_LIST = result.district_list;
            this.CONTINENT_LIST = result.nation_list;
            if(this.info.material.length == 0){
              this.handleAddMaterial();
            }else{
              this.info.material.forEach(item=>{
                item.tourist_type = item.tourist_type + '';
                this.$set(item, 'length', noHtmlLength(item.remark));
              })
            }
            if(this.info.supplier_org_id){
              this.selectSupplier = {id: this.info.supplier_org_id, name: this.info.supplier_org_name};
              this.supplierList = [this.selectSupplier];
            }
            // this.sendCity = {id: this.info.send_city_id, area_name: this.info.send_city_name};
            if(Array.isArray(this.info.send_city_ids)){
              const names = this.info.send_city_name.split(',')
              this.sendCitys = this.info.send_city_ids.map((id, idx) => ({id, area_name: names[idx]}))
              // 添加选中的送签地到送签城市列表，以确保正常显示城市
              this.sendCitys.forEach(city => {
                if (!this.sendCityList.some(c => c.id == city.id)) {
                  this.sendCityList.push(city)
                }
              })
            }
            if(Array.isArray(this.info.pic_url)){
              // this.imageList = this.info.pic_url.map(pic => ({
              //   id: pic.id,
              //   imageId: pic.id,
              //   url: pic.sub_pic_url
              // }))
              this.imageList = this.info.pic_url
            }
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getMatchSupplier(query){
      // console.log('query: ', query);
      if (query != null && query !== '') {
        const data = {org_name: query};
        
        this.loadingSupplier = true;
        supplierOrgList({
          params: { data },
          success: ({data: { code, data, msg }}) => {
            let list = [];

            if(!code){
              list = data;
            }else{
              this.$message({message: msg, type:'error'})
            }
            this.supplierList = list;
            this.loadingSupplier = false;
          }
        });
      }else {
        this.list = [];
      }
    },

    handleRemarkChange(data, val){
      console.log('change remark', data, val);
      data.length = noHtmlLength(data.remark);
      if(data.length > 5000){
        this.$message.error('材料说明不能大于5000个字符');
      }
    },
    handleSelectImage(images) {
      this.imageList = [...images];
    },
    handleAddMaterial(){
      this.expandMaterial = true;
      this.info.material.push({
        tourist_type: '',
        remark: '',
        length: 0
      })
    },
    handleDelMaterial(idx){
      this.info.material.splice(idx, 1);
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.attachment.length; i++) {
        if (this.attachment[i]['id'] == file.id) {
          this.attachment.splice(i, 1);
          return false;
        }
      }
    },
    handlePreview(file) {
      window.open(file.path)
    },
    handleUploadsucc(response, file, fileList) {
      if (response.code == 0) {
        this.attachment.push({
          id: response.data.id,
          name: response.data.name,
          path: response.data.path
        });
      } else {
        fileList.pop(); // 从上传文件列表中删除上传文件
        this.$message.error(response.msg);
      }
    },
    handleBeforeUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        return false;
      }
      if (this.attachment.length == 10) {
        this.$message.error('上传附件数量不可超过十份');
        return false;
      }
      return isLt2M;
    },

    handleSaveData(){
      // console.log('submit', this.info);

      // this.info.nation_name = this.nationList[this.info.nation_id] || '';
      // this.info.pic_url = this.imageList.map(img => img.imageId);
      this.info.pic_url = this.imageList.map(img => img.id);
      this.info.supplier_org_id = this.selectSupplier.id || '';
      this.info.supplier_org_name = this.selectSupplier.name || '';
      this.info.send_city_id = this.sendCitys.map(city => city.id)
      this.info.attachment = this.attachment.map(attach => attach.id)
      todoAddVisa({
        params: {data: this.info},
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.$router.push('list')
          }
        },
        showLoading: true
      });
    },
    // handleSubmitForm(){
    //   if(this.imageList.length > 0 && !this.imageList[0].imageId){
    //     // console.log('show loading')
    //     this.uploadingInstant = this.$loading({ fullscreen: true });
    //     this.$refs.uploader.submit();
    //   }else{
    //     this.handleSaveData();
    //   }
    // },
    handleBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.w25{
  width: 25%;
}
.w50{
  width: 50%;
}
.w100{
  width: 100%;
}
.mod-form{
  padding: 0 15px;
  overflow: hidden;
}
.form-inputs{
  margin-right: 50px;
}
.system-content .mod-form .title{
  margin: 35px 0 25px;
}
.el-form-item{
  margin-bottom: 10px;
  &:last-child{
    margin-bottom: 0;
  }
}
.material-item{
  position: relative;
}
.material-form{
  border: 1px dashed #ccc;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
  margin-top: 15px;
  margin-right: 80px;
}
.editor{
  padding-bottom: 26px;
}
.editor-footer{
  margin-top: -28px;
  line-height: 2;
  padding-right: 10px;
}
.opt-btns{
  position: absolute;
  top: 0;
  right: 40px;
  width: 25px;
}
.opt-btns a + a{
  margin-left: 0;
  margin-top: 10px;
}
.toggle-btn{
  margin-right: 80px;
  margin-top: 2px;
}
.price-item{
  .el-form{
    display: inline-block;
    width: 90%;
    vertical-align: 10px;
  }
  .el-form-item{
    width: 23%;
    overflow: hidden;
    white-space: nowrap;
  }
  .el-input{
    width: 50%;
  }
}
.other-form{
  margin-top: 5px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
  padding-right: 80px;
}
</style>
<style lang="scss">
.accept_range textarea{height: 82px;}
.visa-uploader{
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
    position: relative;
    .el-progress{
      margin-top: 10px;
    }
    .el-icon-close{
      padding: 5px;
      background: #5a5d62;
      color: #fff;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
    }
  }
}
</style>
