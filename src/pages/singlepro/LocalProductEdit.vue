<template>
  <!-- application\index\view\dev\src\components\self-support\LocalProductEdit.vue -->
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <el-form label-width="120px" class="info-form" >
          <div class="title">基础信息</div>
          <el-form-item label="产品来源">
            <el-select
              v-model="selectSupplier"
              class="width"
              filterable
              remote
              :remote-method="searchCoopSuppliers"
              value-key="id"
              placeholder="输入产品来源供应商名称"
            >
              <el-option
                v-for="item in supplierList" 
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型" required>
            <el-checkbox-group v-model="submitData.type">
              <el-checkbox
                v-for="(item, key) in type_lists"
                :label="item.id"
                :key="key"
                name="type"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item required label="商品名称">
            <el-input class="width" v-model="submitData.name"></el-input>
          </el-form-item>
          <el-form-item v-if="id !== '0'" required label="商品货号">
            <el-input class="width" v-model="submitData.art_no" readonly></el-input>
          </el-form-item>
          <el-form-item label="商品所在城市" required>
            <el-select
              class="minwidth"
              v-model="from.international"
              placeholder="请选择类型"
              filterable
              remote
              :remote-method="changeInt"
            >
              <el-option class="minwidth" label="国内" value="1"></el-option>
              <el-option class="minwidth" label="国际" value="2"></el-option>
            </el-select>
            <el-select
              v-model="from.country_name"
              @change='onChange'
              v-if="from.international == '2'"
              class="width"
              filterable
              remote
              :remote-method="searchAbroad"
              value-key="id"
              placeholder="请输入要搜索的国家"
            >
              <el-option
                v-for="item in country_name"
                :key="item.id"
                :label="item.country_name"
                :value="item"
              />
            </el-select>
            <div class="inb" v-else>
              <select-area class="area-select fl" value-key="area_name" v-model="area" clearable />
              <el-input class="width ml3" v-model="submitData.address" placeholder="详细地址"></el-input>
            </div>
          </el-form-item>
          <el-form-item required label="商品图片">
            <div class="pic-wrap clearfix">
              <div class="upload-img" v-for="(item, index) in submitData.pic_lists" :key="index">
                <div v-if="item.is_default === 2" class="upload-index">首</div>
                <div v-if="item.is_default === 2" class="upload-index-bg"></div>
                <div v-if="item.is_default === 1" @click="deleteImg(index)" class="upload-close">x</div>
                <div
                  v-if="item.is_default === 1"
                  class="upload-indeximg-btn"
                  @click="becomeIndex(index)"
                >设为首图</div>
                <a :href="item.sub_pic_url" target="_blank">
                  <img :src="item.sub_pic_url" alt>
                </a>
              </div>
              <!-- <el-button @click="albumType = true" type="primary">图片库选择</el-button> -->
              <el-button v-if="!ratify" type='default' @click="img_accord=true">本地上传</el-button>
              <el-upload
                v-if="is_agreed"
                action="/bom/api/selfsupport.localproduct/upload_img"
                list-type="picture"
                :show-file-list='false'
                :file-list="fileList"
                ref="upload"
                :before-upload='beforeUpload'
                :on-success="handleUploadImageSuccess">
                <el-button size="small" type="primary">本地上传</el-button>
              </el-upload>
              <span class="el-upload__tip">原图分辨率最少不能低于480*480，支持jpg，jpeg，gif，png格式2M以内图片</span>
              <span v-if="is_agreed" class="lookbtn" @click="handleShowUploadProtocol">查看协议</span>
              <span v-else class="lookbtn" @click="handleShowUploadProtocol">签署本地上传图片协议</span>
              <!-- <div class="uploadImg">
                <img v-for="item in submitData.pic_lists" :key='item.photo_id' :src="item.sub_pic_url" alt="">
              </div> -->
            </div>
          </el-form-item>
          <el-form-item required label="商品详情">
            <vue-editor v-model="submitData.detail" :auto-height="false" :isshow-local="true"/>
            <div class="editor-footer tar">{{ submitData.detail.length }}/5000</div>
          </el-form-item>
          <el-form-item label="服务保证">
            <el-input v-for="(item,index) in ensure" :key="index"  class="width mr3" v-model="ensure[index]"></el-input>
            <el-button type="primary" @click="addInd">添加</el-button>
          </el-form-item>
          <el-form-item label="商品关键词">
            <el-input class="width" v-model="submitData.keys"></el-input>
            <div
              class="color-gray"
            >商品关键词请用空格分隔；有两个功能，一是可以作为站内关键词查询，在前台搜索框输入关键词后，能够搜索到该商品；二是作为搜索引擎收录使用.</div>
          </el-form-item>
          <el-form-item label="商品备注">
            <el-input v-model="submitData.remark" type="textarea"></el-input>
          </el-form-item>
          <div class="title">商品报价</div>
          <el-form-item required label="商品规格">
            <el-input class="width" v-model="product"></el-input>
            <el-button @click="addProduct" type="primary">添加</el-button>
          </el-form-item>
          <el-table :data="submitData.price_lists" border style="width: 100%">
            <el-table-column prop="size_name" label="规格" width="150px" align="center"></el-table-column>
            <el-table-column label="成本价" min-width="100" align="center">
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.cost_price"/>
              </template>
            </el-table-column>
            <el-table-column label="结算价" min-width="100" align="center">
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.peer_price"/>
              </template>
            </el-table-column>
            <el-table-column label="销售价" min-width="100" align="center">
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.out_price"/>
              </template>
            </el-table-column>
            <el-table-column label="挂牌价" min-width="100" align="center">
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.tagging_price"/>
              </template>
            </el-table-column>
            <el-table-column label="商品库存" min-width="100" align="center">
              <template slot-scope="scope">
                <input-number  v-model="scope.row.stock_nums"/>
              </template>
            </el-table-column>
            <el-table-column label="邮费" min-width="100" align="center">
              <template slot-scope="scope">
                <input-number  :precision="3" v-model="scope.row.default_freight"/>
              </template>
            </el-table-column>
            <el-table-column label="SKU编号" min-width="100" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku_no" readonly></el-input>
              </template>
            </el-table-column>
            <el-table-column label="是否限购" min-width="100" align="center">
              <template slot-scope="scope">
                <div class="xigou-wrap clearfix">
                  <el-checkbox
                    class="box"
                    :true-label="2"
                    :false-label="1"
                    v-model="scope.row.is_limit_buy"
                  ></el-checkbox>
                  <input-number 
                    :disabled="scope.row.is_limit_buy === 1 ? true : false"
                    v-model="scope.row.limit_buy_nums"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="delProduct(scope)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div class="submit-buttons">
          <el-button type="primary" @click="productSubmitCreate">保存</el-button>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </div>
    </div>
    <!-- 本地上传 -->
    <upload-img-agreement-layer ref="uploadImgAgreementLayer" />
    <!-- <el-dialog
      title="申请开通权限须知"
      :visible.sync="img_accord">
      <el-form
        :inline="true"
        class="ratifyForm"
        :model="ratifyForm" 
        :rules="ratify_rules"
        ref="ratifyForm"
        >
        <el-form-item>
          <p style="margin-bottom: 10px;"><b>特别提示：</b>请您仔细阅读本须知，并注意本须知和开通权限页面的其他相关条款。当您开始申请开通权限时，已表明您已仔细阅读并接受须知的所有条款。</p>
          <p>1、开通权限后，您可以使用任意图片作为您上传产品的宣传资料； </p>
          <p>2、开通权限后，您应保证您所上传的宣传资料（包括但不限于图片、文字、视频、音频等）不侵犯任何第三方的知识产权，如因此造成纠纷，您自行解决并承担相应责任。如给我方造成任何损失的（包括但不限于诉讼费、律师费、赔偿金等），您也应承担。</p>
        </el-form-item>
        <el-form-item prop="is_ratify" v-if="ratify !== 1">
          <el-checkbox-group v-model="ratifyForm.is_ratify">
            <el-checkbox label="我已仔细阅读上述须知，并自愿遵守须知中的相关约定。同意平台继续为我开通上述权限。" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="ratify == 1">
          <p>签署人：<b>{{ratifyMsg.username}}</b></p>
          <p>签署人帐号：<b>{{ratifyMsg.login_name}}</b></p>
          <p>签署人所属公司：<b>{{ratifyMsg.company_name}}</b></p>
          <p>签署时间：<b>{{ratifyMsg.agreed_time}}</b></p>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="ratify !== 1" @click="img_accord = false">取 消</el-button>
        <el-button v-if="ratify !== 1" type="primary" @click="submitForm('ratifyForm')">确 认 签 署</el-button>
        <el-button v-if="ratify == 1"  @click="img_accord = false">关 闭</el-button>
      </div>
    </el-dialog> -->
    <!-- <album
      :visible.sync="albumType"
      :max="5"
      @imageArray="handleCheckImage"
      :check="submitData.pic_lists"
      checkkey="sub_pic_url"
      idkey="photo_id"
    ></album> -->
  </div>
</template>
<script>
import {
  productCreate,
  getArtNo,
  productSubmitCreate
} from "src/api/self_support.localproduct";
import {
  getArea,
  searchCoopSuppliers,
  getAbroad,
  searchAbroad
} from "src/api/api";
import html5Editor from "src/plugins/editor/vue-html5-editor";
import InputNumber from "src/plugins/InputNumber";
// import Album from "src/plugins/Album";
import SelectArea from 'src/plugins/SelectArea.vue';
// import {getPhotoAgreement, setPhotoAgreement} from 'src/api/uploadpictures' // 本地上传图片权限
import UploadImgAgreementLayer from "src/plugins/uploadImgAgreement";
import { mapState } from "vuex";
export default {
  components: {
    "vue-editor": html5Editor,
    InputNumber,
    // Album,
    SelectArea,
    UploadImgAgreementLayer
  },
  data() {
    var selectedratify = (rule, value, callback) => {
        if(!value){
          callback(new Error('请勾选同意按钮！'));
        } else {
          callback();
        };
      };
    return {
      img_accord: false,  // 是否签署协议
      ratify: 2,     // 签署协议
      ratifyMsg: {},
      ratify_rules: {
          is_ratify: [
            { validator: selectedratify, trigger: 'blur' }
          ]
      },
      ratifyForm: {
        is_ratify: false
      },
      ensure:[''],
      fileList: [],
      id: this.$route.query.id ? this.$route.query.id : "0",
      selectSupplier: {},
      supplierList: [],
      country_name: [], //国际国家
      type_lists: [],
      cityList: [],
      city: {},
      product: "",
      ruleForm: {
        type: []
      },
      from: {
        international: "1", //国内
        country_name:'',
        country_id:'',
      },
      countriesArr: [],
      submitData: {
        id: 0,
        supplier_org_id: "",
        type: [],
        name: "",
        art_no: "",
        city_ids: "",
        city_names: "",
        pic_lists: [],
        detail: "",
        service_guarantees: [],
        keys: "",
        remark: "",
        price_lists: [],
        country_id: "CHN",
        country_name: "全国",
        province_id: "",
        province_name: "",
        city_id: "",
        city_name: "",
        county_name:'',
        county_id:'',
        address: ""
      },
      albumType: false,
      value :{area_0: 100000, area_1: 100100, area_2: 100101}
    };
  },
  computed:{
    area: {
      get () {
        return {
          area_0: this.submitData.province_name,
          area_1: this.submitData.city_name,
          area_2: this.submitData.county_name,
        }
      },
      set (val) {
        if (val) {
          this.submitData.province_name = val.area_0 || ''
          this.submitData.city_name = val.area_1 || ''
          this.submitData.county_name = val.area_2 || ''
        } else {
          this.submitData.province_name = ''
          this.submitData.city_name = ''
          this.submitData.county_name = ''
        }
      }
    },
    ...mapState("uploadImage", {
          is_agreed(state) {
              return state.isAgree;
          }
      }),
  },
  methods: {
    getPhotoAgreement(){
      var params = {};
      var that = this;
      getPhotoAgreement({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            if(result.data.is_agreed){
              that.ratify = 1;
              that.ratifyMsg = result.data.user;
              that.ratifyMsg.agreed_time = result.data.agreed_time;
            }else{
              that.ratify = 0;
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }
      })
    },
    // 显示协议弹框
    handleShowUploadProtocol(){
      this.uploadImgAgreementLayer.show();
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              data: {
                is_agreed: 1
              }
            };
            setPhotoAgreement({
              params,
              success: (res) => {
                let result = res.data;
                if (result.code === 0) {
                  this.img_accord = false;
                  this.getPhotoAgreement();
                  this.$message({
                    message: "您已签署本地图片使用权限，请点击本地上传使用吧！",
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                }
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    productCreate() {
      let params = {
        data: {
          id: this.id
        }
      };
      productCreate({
        params,
        success: res => {
          let result = res.data;
          if (result.code === 0) {
            this.type_lists = result.data.type_lists;
            this.supplierList = result.data.supplier_org_lists;
            result.data.local_product_info.pic_lists.forEach((item, index) => {
              item.photo_id = item.id;
            });
            Object.assign(this.submitData, result.data.local_product_info);
            if (this.submitData.service_guarantees.length==0) {
              this.ensure=['']
            }else{
              this.ensure = this.submitData.service_guarantees
            }
            
            if (this.submitData.country_id != 'CHN') {
              this.from.international = '2'
              this.from.country_name = this.submitData.country_name
              this.from.country_id = this.submitData.country_id
            }
            let obj = {
              city_id: this.submitData.city_ids,
              area_name: this.submitData.city_names
            };
            if (obj.city_id) {
              this.city = obj;
              this.cityList.push(obj);
            }
            let supplier = {
              name: this.submitData.supplier_org_name,
              id: this.submitData.supplier_org_id
            };
            this.selectSupplier = supplier;
            this.searchCoopSuppliers(this.submitData.supplier_org_name);
          } else {
            this.$message({
              type: "error",
              message: result.msg
            });
          }
        },
        showLoading: true
      });
    },
    getArtNo() {
      let params = {
        data: {
          type: this.submitData.type
        }
      };
      getArtNo({
        params,
        success: res => {
          let result = res.data;
          if (result.code === 0) {
            this.submitData.art_no = result.data.art_no;
          } else {
            this.$message({
              type: "error",
              message: result.msg
            });
          }
        }
      });
    },
    searchCoopSuppliers(query) {
      if (!query) {
        return false;
      }
      let params = {
        data: {
          org_name: query
        }
      };
      searchCoopSuppliers({
        params,
        success: res => {
          let result = res.data;
          if (result.code === 0) {
            this.supplierList = result.data;
          } else {
            this.$message({
              type: "error",
              message: result.msg
            });
          }
        }
      });
    },
    onChange(data){
      console.log(data);
      this.submitData.country_name=data.country_name
      this.submitData.country_id=data.id
    },
    searchAbroad(query) {
      if (!query) {
        return false;
      }
      let params = {
        data: {
          country_name: query
        }
      };
      searchAbroad({
        params,
        success: res => {
          let result = res.data;
          if (result.code === 0) {
            this.country_name = result.data
          } else {
            this.$message({
              type: "error",
              message: result.msg
            });
          }
        }
      });
    },
    changeInt(data) {
      console.log('data',data);
      if (data == '国内') {
        this.submitData.country_name = '全国'
        this.submitData.country_id = 'CHN'
      }else{
        this.submitData.province_name=''
        this.submitData.province_id=''
        this.submitData.city_name=''
        this.submitData.city_id=''
        this.submitData.county_name=''
        this.submitData.county_id=''
        this.submitData.address=''
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        let params = {
          data: {
            country_id: "CHN",
            area_name: query,
            eng_name: "",
            level: "2",
            parent_id: ""
          }
        };
        getArea({
          params,
          success: res => {
            let result = res.data;
            if (result.code === 0) {
              this.cityList = result.data;
            } else {
              this.$message({
                message: result.msg,
                type: "error"
              });
            }
          },
          showLoading: false
        });
      }
    },
    handleUploadImageSuccess(response, file, fileList) {
      if (response.code === 0) {
        let obj = {
          photo_id: response.data.id,
          sub_pic_url: response.data.path,
          is_default: 1
        };
        if (this.submitData.pic_lists.length === 0) {
          obj.is_default = 2;
        }
        this.submitData.pic_lists.push(obj);
      } else {
        this.$message({
          type: "error",
          message: response.msg
        });
        
      }
      console.log(this.submitData.pic_lists);
      
    },
    beforeUpload(file){
      
      if (this.submitData.pic_lists.length>4) {
        this.$refs.upload.handleRemove(file);
        this.$message({
          type: "error",
          message: '最多上传5张图片'
        });
      }
    },
    deleteImg(index) {
      this.submitData.pic_lists.splice(index, 1);
    },
    becomeIndex(index) {
      this.submitData.pic_lists.forEach((item, index) => {
        item.is_default = 1;
      });
      this.submitData.pic_lists[index].is_default = 2;
    },
    addInd(){
      console.log(this.ensure,'====');
      if (this.ensure.length>4) {
        this.$message({
          type: "error",
          message: '最多添加5条信息'
        });
        return
      }
      this.ensure.push('')
    },
    addProduct() {
      let flag = true;
      // let sku_no = ''
      // if (this.submitData.art_no === '') {
      //   flag = false
      //   this.$message({
      //     type: 'error',
      //     message: '请选择商品类型'
      //   })
      // } else {
      //   let sku = 0
      //   let lastSku = this.submitData.price_lists.length > 0 ? this.submitData.price_lists[this.submitData.price_lists.length - 1].sku_no : ''
      //   if (lastSku.length > 0) {
      //     sku = parseInt(lastSku.substr(lastSku.length - 2))
      //   }
      //   sku = sku + 1
      //   if (sku < 10) {
      //     sku_no = this.submitData.art_no + '0' + sku
      //   } else {
      //     sku_no = this.submitData.art_no + sku
      //   }
      // }
      this.product = this.product.trim();
      if (this.product === "" && flag) {
        flag = false;
        this.$message({
          type: "error",
          message: "填写商品规格"
        });
      }
      this.submitData.price_lists.forEach((item, index) => {
        if (item.size_name === this.product && flag) {
          this.$message({
            type: "error",
            message: "规格名称不能重复"
          });
          flag = false;
        }
      });
      if (!flag) {
        return false;
      }
      let obj = {
        id: 0,
        size_name: this.product,
        cost_price: "",
        peer_price: "",
        out_price: "",
        tagging_price: "",
        stock_nums: "",
        sku_no: "",
        default_freight: "",
        is_limit_buy: 1,
        limit_buy_nums: ""
      };
      this.submitData.price_lists.push(obj);
    },
    delProduct(scope) {
      this.submitData.price_lists.splice(scope.$index, 1);
    },
    handleBack() {
      window.history.go(-1);
    },
    productSubmitCreate() {
      let flag = false
      this.submitData.id = this.id;
      this.submitData.supplier_org_id = this.selectSupplier.id || "";
      this.submitData.city_ids = this.city.city_id || "";
      this.submitData.city_names = this.city.area_name || "";
      this.submitData.service_guarantees = this.ensure
      for (let i = 0; i < this.submitData.service_guarantees.length; i++) {
        const element = this.submitData.service_guarantees[i];
        if (element.length > 50) {
          flag = true
        }
      }
      if (this.submitData.type.length<=0) {
        this.$message({
          type: "error",
          message: '商品类型至少选择一项'
        });
        return
      }
      if (this.submitData.name.length > 40) {
        this.$message({
          type: "error",
          message: '商品名称最多40个字符'
        });
        return
      }
      let params = {
        data: this.submitData
      };
      
      if (flag) {
        this.$message({
          type: "error",
          message: '服务保证每条长度不得超过50个字符'
        });
        return
      }
      
      productSubmitCreate({
        params,
        success: res => {
          let result = res.data;
          if (result.code === 0) {
            this.$message({
              type: "success",
              message: result.msg
            });
            this.handleBack();
          } else {
            this.$message({
              type: "error",
              message: result.msg
            });
          }
        },
        showLoading: true
      });
    },
    handleCheckImage(data) {
      this.submitData.pic_lists = [];
      this.submitData.pic_lists = data.map((item, index) => {
        let obj = {
          photo_id: item.id,
          id: item.id,
          sub_pic_url: item.sub_pic_url,
          is_default: 1
        };
        if (index === 0) {
          obj.is_default = 2;
        }
        return obj;
      });
    }
  },
  mounted() {
    this.productCreate();
    this.uploadImgAgreementLayer = this.$refs.uploadImgAgreementLayer;
    // this.getPhotoAgreement();
  }
};
</script>
<style lang="less" scoped>
.width {
  width: 220px;
}
.minwidth {
  width: 110px;
}
.ml3{
  margin-left: 3px;
}
.mr3{
  margin-right: 3px;
}
.inb {
  display: inline-block;
}
.lookbtn {
  color: #b10c79;
  cursor: pointer;
}
.ratifyForm {
  padding: 10px 20px;
}
.upload-btn {
  float: left;
  position: relative;
  width: 100px;
  height: 100px;
  background: #ddd;
  &::before {
    content: "";
    position: absolute;
    top: 49px;
    left: 40px;
    width: 20px;
    height: 2px;
    background: #333;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    top: 40px;
    left: 49px;
    width: 2px;
    height: 20px;
    background: #333;
    z-index: 1;
  }
}
.upload-img {
  float: left;
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 0 15px 0 0;
  position: relative;
  .upload-index {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    z-index: 2;
  }
  .upload-index-bg {
    position: absolute;
    top: -25px;
    left: -25px;
    width: 50px;
    height: 50px;
    line-height: 0px;
    background-color: #ff9900;
    transform: rotate(45deg);
    transform-origin: center center;
  }
  .upload-close {
    position: absolute;
    top: 0px;
    right: 0;
    width: 25px;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    line-height: 25px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .upload-indeximg-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 5px;
    background: rgba(0, 0, 0, 0.8);
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.editor-footer {
  margin-top: -28px;
  line-height: 2;
  padding-right: 10px;
}
.xigou-wrap {
  position: relative;
  padding: 0 0 0 25px;
  .box {
    position: absolute;
    top: 5px;
    left: 0px;
  }
}
</style>
