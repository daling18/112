<template>
<!-- application\index\view\dev\src\components\plan\trip\add-new-trip.vue -->
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="add-trip-wrapper">
          <el-form :model="data" :rules="rules" ref="ruleForm" label-width="120px" size="small">
            <div class="title">基础信息</div>
            <div class="form-content">
              <el-form-item label="产品类型" prop="type">
                <el-radio-group v-model="data.type">
                  <el-radio label="线上品牌商赞助"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="行程名称" prop="name">
                <el-input class="width2" v-model="data.name" placeholder="请输入行程名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="8"><el-input placeholder="交通，例：双飞"></el-input></el-col>
                  <el-col :span="8"><el-input placeholder="行程天数"></el-input></el-col>
                  <el-col :span="8"><el-input placeholder="晚数"></el-input></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="线路分类" required>
                <el-select class="width3" v-model="data.class_id_1" @change="classId1" filterable>
                  <el-option label="不限" value="0"></el-option>
                  <el-option v-for="(item, idx) in classId1_list" :label="item" :key="idx" :value="idx"></el-option>
                </el-select>
                <el-select class="width3" v-model="data.class_id_2" @change="classId2" filterable>
                  <el-option label="不限" value="0"></el-option>
                  <el-option v-for="(item, idx) in classId2_list" :label="item.name" :value="item.id" :key="idx"></el-option>
                </el-select>
                <el-select class="width3" v-model="data.class_id_3" filterable>
                  <el-option label="不限" value="0"></el-option>
                  <el-option v-for="(item, idx) in classId3_list" :label="item.name" :value="item.id" :key="idx"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-tag-primary" label="出发地" required>
                  <el-select
                    v-model="departure_city"
                    multiple
                    filterable
                    remote
                    placeholder=""
                    :remote-method="remoteMethod1"
                    :loading="loading"
                    class="width2"
                    value-key="id"
                    @change='departureAction'
                    ref='departureDom'
                    >
                    <el-option
                      v-for="(item, idx) in res_citylist1"
                      :key="item.id"
                      :label="item.area_name"
                      :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item class="el-tag-primary" label="目的地" required>
                  <el-select
                    v-model="destination_city"
                    multiple
                    filterable
                    remote
                    placeholder=""
                    :remote-method="remoteMethod2"
                    :loading="loading"
                    class="width2"
                    value-key="id"
                    @change="destinationAction"
                    ref='destinationDom'
                    >
                    <el-option
                      v-for="(item, idx) in res_citylist2"
                      :key="item.id"
                      :label="item.area_name"
                      :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="交通">
                <el-select class="width1" v-model="data.departure_traffic_type">
                  <el-option label="去程" value="0"></el-option>
                  <el-option label="飞机" value="1"></el-option>
                  <el-option label="火车" value="2"></el-option>
                  <el-option label="动车" value="3"></el-option>
                  <el-option label="汽车" value="4"></el-option>
                  <el-option label="轮船" value="5"></el-option>
                  <el-option label="高铁" value="6"></el-option>
                  <el-option label="不需要" value="99"></el-option>
                </el-select>
                <el-input class="width2" v-model="data.departure_traffic_content" placeholder="请输入出发交通信息如：厦航FM8868"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-select class="width1" v-model="data.back_traffic_type">
                  <el-option label="回程" value="0"></el-option>
                  <el-option label="飞机" value="1"></el-option>
                  <el-option label="火车" value="2"></el-option>
                  <el-option label="动车" value="3"></el-option>
                  <el-option label="汽车" value="4"></el-option>
                  <el-option label="轮船" value="5"></el-option>
                  <el-option label="高铁" value="6"></el-option>
                  <el-option label="不需要" value="99"></el-option>
                </el-select>
                <el-input class="width2" v-model="data.back_traffic_content" placeholder="请输入出发交通信息如：厦航FM8868"></el-input>
              </el-form-item>
              <!-- <el-form-item label="行程天数" required>
                <el-form-item class="item2" prop="trip_days">
                  <el-input class="width1" @input="insertNum($event, 'trip_days')" v-model="data.trip_days" placeholder=""></el-input>
                  <span>天</span>
                </el-form-item>
                <el-form-item class="item2" prop="trip_night">
                  <el-input class="width1" @input="insertNum($event, 'trip_night')" v-model="data.trip_night" placeholder=""></el-input>
                  <span>夜</span>
                </el-form-item>
              </el-form-item> -->
              <el-form-item label="集合地点">
                <!-- <el-input type="textarea" class="width2" v-model="data.assembing_place" placeholder="请输入集合地点如：厦门市sm城市广场"></el-input> -->
                <el-autocomplete
                  class="inline-input width2"
                  v-model="data.assembing_place"
                  :fetch-suggestions="selesctAssembingPlace"
                  placeholder="请输入内容"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="集合时间">
                <el-input class="width2" v-model="data.assembing_time" placeholder="请输入具体的集合时间"></el-input>
              </el-form-item>
              <el-form-item label="OP" required>
                <el-select clearable  class="width2" v-model="op_sel" value-key="user_id" remote filterable :remote-method="remoteOp">
                  <el-option :label="item.username" :value="item" v-for="(item, index) in op_info" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最低成团人数" required>
                <input-number  class="width2" v-model="data.minimum_team_num" placeholder="最低成团人数" />人
              </el-form-item>
              <!-- <el-form-item label="收客截止时间">
                <span>团队出发前</span>
                <el-form-item class="item2" prop="deadline"><el-input class="width1" v-model="data.deadline" placeholder=""></el-input></el-form-item>
                <el-select class="width1" v-model="data.deadline_type">
                  <el-option label="请选择" value="0"></el-option>
                  <el-option label="分钟" value="1"></el-option>
                  <el-option label="天" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="占位有效时间">
                <el-form-item class="item2" prop="seattime"><el-input class="width1" v-model="data.seattime" placeholder=""></el-input></el-form-item>
                <el-select class="width1" v-model="data.seattime_type">
                  <el-option label="请选择" value="0"></el-option>
                  <el-option label="分钟" value="1"></el-option>
                  <el-option label="小时" value="2"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item class="el-radio-primary" label="出行方式" required>
                <el-radio-group v-model="data.line_type">
                  <el-radio
                    v-for="(item, key) in cfg_line_type"
                    :label='key'
                    :key="key"
                    >
                    {{item}}
                  </el-radio>
                  <!-- <el-radio label="1">跟团游</el-radio>
                  <el-radio label="2">自由行</el-radio>
                  <el-radio label="3">定制包团</el-radio>
                  <el-radio label="4">邮轮</el-radio>
                  <el-radio label="5">周边游</el-radio>
                  <el-radio label="6">一日游</el-radio>
                  <el-radio label="7">当地游</el-radio> -->
                </el-radio-group>
              </el-form-item>
              <!-- <el-form-item class="el-radio-primary" label="出境/国内">
                <el-radio
                  v-for="(item, key) in cfg_tour_type"
                  :key="key"
                  v-model="data.tour_type"
                  :label='key'
                  >
                  {{item}}
                </el-radio>
              </el-form-item> -->
              <!-- <el-form-item class="el-radio-primary" label="主题">
                <el-input class="width2" v-model="data.product_theme" placeholder="请输入主题名称关键字"></el-input>
              </el-form-item> -->
              <el-form-item 
                label='主题'>
                <div class="select-box">
                  <div class="select-btn">可多选</div>
                  <div class="select-info">
                    <el-checkbox-group v-model="theme">
                      <span v-for="(item, index) in cfg_theme" :key="index" :title='item.theme_name'>
                        <el-checkbox class="info-item ellipsis" :label="item.id + ''">{{item.theme_name}}</el-checkbox>
                      </span>
                    </el-checkbox-group>
                  </div>
                </div>
                <!-- <el-select
                  v-model="theme"
                  filterable
                  clearable
                  remote
                  placeholder="请输入主题名称关键字"
                  :remote-method="getProductTheme"
                  class="width2"
                  value-key="id"
                  >
                  <el-option
                    v-for="(item, key) in cfg_theme"
                    :key="item.id"
                    :label="item.theme_name"
                    :value="item">
                  </el-option> 
                </el-select>-->
              </el-form-item>
              <el-form-item class="upload-wrapper" label="行程图片" required>
                <el-button
                  @click="openAlbumDialog"
                  type='primary'>
                  图库选择
                </el-button>
                <el-button v-if="$menuPermission('touristroute/addtrip/uploadimage') && !ratify" type='default' @click="img_accord=true">本地上传</el-button>
                <el-upload
                  v-if="$menuPermission('touristroute/addtrip/uploadimage') && ratify == 1"
                  class="uploadbtn"
                  action="/api/v1/photo/upload"
                  :show-file-list='false'
                  :on-success='handleSuccess'
                  :before-upload="handleBefore"
                  >
                  <el-button type='default'>本地上传</el-button>
                </el-upload>
                <!-- <el-upload
                  v-if='$menuPermission("api/product/upload_pic")'
                  class="upload-btn-wrap" 
                  action="/bom/api/product/upload_pic"
                  :show-file-list="false"
                  :data='{type: 1}'
                  :on-success="handleTripPicSuccess"
                  :before-upload="beforeTripPicUpload"
                >
                  <el-button type="primary">本地上传</el-button>
                </el-upload> -->
                <span class="el-upload__tip">最多上传3张，支持jpg，jpeg，gif，png格式，10M以内图片</span>
                <span v-if="ratify == 1" class="lookbtn" @click="img_accord = true">查看协议</span>
                <div class="trip-pic-wrapper">
                  <div v-for="(item, index) in imageUrl" :key="index" :src="item.path" :style='"backgroundImage:url(" + item.path + ")"' class="trip-pic">
                    <div class="trip-pic-index-font" v-show="index === 0">首</div>
                    <div class="trip-pic-index-bg" v-show="index === 0"></div>
                    <span class="trip-pic-remove" @click="handleTripPicRemove(index)">x</span>
                  </div>
                </div>
              </el-form-item>
              <div class="submit-buttons left" style="padding-left: 120px;">
                <p class="el-upload__tip" style="margin-bottom:6px;">【简易开团】产品不会在官网/APP/小程序展示，仅供云平台采购</p>
                <el-button v-if="!(product_type.toString()) || product_type == 1" class="el-button" type="primary" @click="submit('1')">保存，简易开团</el-button>
                <el-button v-if="!(product_type.toString()) || product_type == 2" class="el-button" type="primary" @click="submit('2')">保存，完善行程</el-button>
                <el-button type="default" @click="cancel">取消</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      title="从图片库中选择"
      :visible.sync="album_type">
      <el-form
        :inline="true"
        label-width='80px'>
        <el-form-item
          label='相册名称'>
          <el-select
            style="width: 120px;"
            v-model="checkalbum"
            filterable
            clearable
            placeholder="选择相册">
            <!-- <el-option label='全部' value=''></el-option> -->
            <el-option
              v-for="(item, index) in albumlist"
              :label="item.name"
              :value="item.id + ''"
              :key="index"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item
          label='图片标题'>
          <el-input style="width: 120px;" v-model="album.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getPhotoalbumSubList(true)" type='primary'>搜索</el-button>
        </el-form-item>
        <el-form-item
          v-if="$menuPermission('traveldata/photoalbum')">
          <router-link target="_blank" to="/traveldata/picture-list">图片管理</router-link>
        </el-form-item>
      </el-form>
      <div v-if="pictureList.length > 0" class="album-wrap clearfix">
        <el-checkbox-group v-model="checkList">
            <div v-for="(item, index) in pictureList" class="album-item" :key="index">
              <div class="album-img">
                <a :href="item.sub_pic_url" target="_blank" >
                  <img :src="item.sub_pic_url" alt="">
                </a>
              </div>
              <div class="album-tit ellipsis">
                <el-checkbox :label="item.sub_pic_url" :key="index">{{item.name}}</el-checkbox>
              </div>
            </div>
          </el-checkbox-group>
      </div>
      <div v-else class="no-data">暂无数据</div>
      <div class="page" style="padding: 0" v-if="pictureList.length > 0">
        <el-pagination  layout="prev, pager, next" :current-page='album.page' :total="album.total" @current-change="currentPageChange">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="album_type = false">取 消</el-button>
        <el-button type="primary" @click="selectPicture">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
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
    </el-dialog>
  </div>
</template>
<script>
  import {doEasyStep1, doStep1, searchOp, step1, getCateInfo, getArea} from 'src/api/api';
  import {supplierDoEasyStep1, supplierDoStep1, supplierStep1} from 'src/api/supplier'
  import {getPhotoalbumSubList, getPhotoalbumcate} from 'src/api/tuan'
  import {getProductTheme, handleSearchHistory} from 'src/api/product'
  import {getPhotoAgreement, setPhotoAgreement} from 'src/api/uploadpictures' // 本地上传图片权限
  import InputNumber from 'src/plugins/InputNumber.vue';
  import {debounce} from 'lodash';

  export default {
    components: {
      InputNumber
    },
    data() {
      var checkDay = (rule, value, callback) => {
        const reg = new RegExp("^[0-9]*$");
        if(!reg.test(value)){
          callback(new Error('请输入正整数'));
        } else {
          callback();
        };
      };
      var selectedratify = (rule, value, callback) => {
        if(!value){
          callback(new Error('请勾选同意按钮！'));
        } else {
          callback();
        };
      };
      return {
        name: this.$route.name ? this.$route.name : '',
        img_accord: false,  // 是否签署协议
        ratify: 2,     // 签署协议
        assembing_old_place: [],
        data: {
          id: this.$route.query.id ? this.$route.query.id : "0",
          name: "",
          line_save_type: '1',
          class_id_1: '0',
          class_id_2: '0',
          class_id_3: '0',
          departure_city: [],
          departure_city_name: [],
          destination_city: [],
          destination_city_name: [],
          departure_traffic_type: '0',
          departure_traffic_content: "",
          back_traffic_type: '0',
          back_traffic_content: "",
          assembing_place: "",
          assembing_time:"",
          deadline: '',
          deadline_type: '1',
          seattime: '',
          seattime_type: '1',
          operator_id: "1",
          operator_name: "",
          line_type: "1",
          trip_pic_url: [],
          tour_type: "1",
          product_theme: '',
          minimum_team_num: 1
        },
        rules: {
          name: [
            { required: true, message: '请输入行程名称', trigger: 'blur' },
            { min: 1, max: 100, message: '行程名称不能超过100字符', trigger: 'blur' }
          ],
          deadline: [
            { validator: checkDay, trigger: 'blur' }
          ],
          seattime: [
            { validator: checkDay, trigger: 'blur' }
          ],
        },
        ratify_rules: {
          is_ratify: [
            { validator: selectedratify, trigger: 'blur' }
          ]
        },
        ratifyForm: {
          is_ratify: false
        },
        ratifyMsg: {},
        classId1_list: {},
        classId2_list: [],
        classId3_list: [],
        loading: false,
        res_citylist: [],
        res_citylist1: [],
        res_citylist2: [],
        departure_city: [],
        destination_city: [],
        imageUrl: [],
        op_info: [],
        op_sel: {},
        isCopy: false,
        editstatus: false,
        p_id: 0,
        p_type: 1,
        firstop: true,
        limit_pic: 0,
        copyId: this.$route.query.copyId,
        product_type: this.$route.query.type ? this.$route.query.type : '',
        album_type: false,
        albumlist: [],
        checkalbum: '',
        pictureList: [],
        checkList: [],
        album: {
          name: '',
          page: 1,
          total: 0
        },
        cfg_tour_type: {},
        cfg_line_type: {},
        cfg_theme: [],
        theme: []
      }
    },
    methods: {
      selesctAssembingPlace(query,cb){

        let that = this;
        let params = {
          data: {
            name: query || ""
          }
        }
      
        handleSearchHistory({
          params: params,
          success (res){
            let data = res.data.data;
            that.assembing_old_place = [];
            if(data.length > 0){
              for(let i=0; i<data.length;i++){
                that.assembing_old_place.push({
                  value: data[i]
                })
              }
            }
            cb(that.assembing_old_place);
          }
        })
      },
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
      departureAction () {
        this.$refs.departureDom.query = ''
      },
      destinationAction () {
        this.$refs.destinationDom.query = ''
      },
      searchOp(query) {
        let name = '';
        if (query) {
          name = query;
        };
        let params = {
          data: {
            name: name
          }
        };
        searchOp({
          params,
          success: (res) => {
            let result = res.data;
            if (result.code === 0) {
              result.data.forEach((item) => {
                item.user_id = parseInt(item.user_id);
              });
              this.op_info = result.data;
              if (this.firstop) {
                this.op_sel = this.op_info[0];
                this.firstop = false;
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
      handleBefore(files){
        var that = this;
        console.log(this.imageUrl.length)
        if (this.imageUrl.length * 1 >= 3) {
          this.$message({
            type: 'error',
            message: '行程图片最多3张'
          })
          return false
        }
      },
      handleSuccess (response, file, fileList) {
        if (response.code === 0) {
          
          this.checkList = this.imageUrl.map(item => item.path);
          this.checkList.push(response.data.path);
          this.imageUrl = this.checkList.map(it => ({path: it}))
          
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      },
      remoteOp(val) {
        this.searchOp(val);
      },
      remoteMethod1(query) {
        this.getArea(query, 1);
      },
      remoteMethod2(query) {
        this.getArea(query, 2);
      },
      getArea(query, type) {
        if (query !== '') {
          let params = {
            data: {
              country_id: '',
              area_name: query,
              eng_name: '',
              level: '',
              parent_id: ''
            }
          };
          getArea({
            params: params,
            success: (res) => {
              let result = res.data;
              if (result.code === 0) {
                setTimeout(() => {
                  this.loading = false;
                  if (type == 1) {
                    this.res_citylist1 = result.data;
                    // this.res_citylist1 = result.data.filter(item => {
                    //   return item.area_name.indexOf(query) > -1;
                    // });
                  };
                  if (type == 2) {
                    this.res_citylist2 = result.data;
                    // this.res_citylist2 = result.data.filter(item => {
                    //   return item.area_name.indexOf(query) > -1;
                    // });
                  };
                }, 200);
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              };
            },
            showLoading: false
          });
        } else {
          if (type == 1) {
            this.res_citylist1 = [];
          };
          if (type == 2) {
            this.res_citylist2 = [];
          }
        }
      },
      handleTripPicSuccess(res, file) {
        if (file.response.code === 0 ) {
          this.imageUrl.push(file.response.data);
        } else {
          this.$message({
            message: file.response.msg,
            type: 'error'
          });
        };
        this.limit_pic--;
        console.log(this.imageUrl.length, this.limit_pic, 'success')
      },
      beforeTripPicUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        let max_type = true;
        this.limit_pic++;
        console.log(this.imageUrl.length, this.limit_pic, "before")
        if ((this.imageUrl.length + this.limit_pic) > 3) {
          this.$message.error('最多上传3张!');
          this.limit_pic--;
          max_type = false;
        };
        if (!isLt2M) {
          this.$message.error('上传行程图片大小不能超过 10MB!');
          this.limit_pic--;
        }
        return isLt10M && max_type;
      },
      handleTripPicRemove(index) {
        this.imageUrl.splice(index, 1);
      },
      submit(type) {
        this.data.departure_city.splice(0, this.data.departure_city.length);
        this.data.departure_city_name.splice(0, this.data.departure_city_name.length);
        this.data.destination_city.splice(0, this.data.destination_city.length);
        this.data.destination_city_name.splice(0, this.data.destination_city_name.length);
        for (let i = 0; i < this.departure_city.length; i++) {
          this.data.departure_city.push(this.departure_city[i].id);
          this.data.departure_city_name.push(this.departure_city[i].area_name);
        };
        for (let j = 0; j < this.destination_city.length; j++) {
          this.data.destination_city.push(this.destination_city[j].id);
          this.data.destination_city_name.push(this.destination_city[j].area_name);
        };
        this.data.operator_id = this.op_sel ? this.op_sel.user_id : 0;
        this.data.operator_name = this.op_sel ? this.op_sel.username: '';
        this.data.trip_pic_url.splice(0, this.data.trip_pic_url.length)
        for (let i = 0; i < this.imageUrl.length; i++) {
          this.data.trip_pic_url.push(this.imageUrl[i].path)
        };
        this.data.product_theme = ''
        this.theme.forEach((item, index) => {
          this.data.product_theme = this.data.product_theme + item + ','
        })
        this.data.product_theme = this.data.product_theme.slice(0, this.data.product_theme.length - 1)
        let params = {
          data: this.data
        };
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let action = doEasyStep1
            if (type === '1' && this.name === 'lineTripAddTrip') {
              action = supplierDoEasyStep1
            } else if (type === '2') {
              action = doStep1
              if (this.name === 'lineTripAddTrip') {
                action = supplierDoStep1
              }
            }
            action({
              params: params,
              success: (res) => {
                let result = res.data;
                if (result.code === 0) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                  if (type === '1') {
                    if (this.name === 'tripAddTrip') {
                      if(this.isCopy) {
                        this.loading = true;
                        this.$router.push({
                          path: '/touristroute/trip/addNewEasyTrip',
                          query: {
                            id: result.data.id,
                            copyId: this.copyId
                          }
                        });
                        return ''
                      };
                      this.loading = true;
                      this.$router.push({
                        path: '/touristroute/trip/addNewEasyTrip',
                        query: {
                          id: result.data.id
                        }
                      });
                    } else if (this.name === 'lineTripAddTrip') {
                      if(this.isCopy) {
                        this.loading = true;
                        this.$router.push({
                          path: '/touristroute/lineTrip/addNewEasyTrip',
                          query: {
                            id: result.data.id,
                            copyId: this.copyId
                          }
                        });
                        return ''
                      };
                      this.loading = true;
                      this.$router.push({
                        path: '/touristroute/lineTrip/addNewEasyTrip',
                        query: {
                          id: result.data.id
                        }
                      });
                    }else if(this.name === 'operatingtripAddTrip'){
                      if(this.isCopy) {
                        this.loading = true;
                        this.$router.push({
                          path: '/touristroute/operating/trip/addNewEasyTrip',
                          query: {
                            id: result.data.id,
                            copyId: this.copyId
                          }
                        });
                        return ''
                      };
                      this.loading = true;
                      this.$router.push({
                        path: '/touristroute/operating/trip/addNewEasyTrip',
                        query: {
                          id: result.data.id,
                          copyId: this.copyId
                        }
                      });
                    }
                  } else if (type === '2') {
                    if (this.name === 'tripAddTrip') {
                      if(this.isCopy) {
                        this.loading = true;
                        this.$router.push({
                          path: '/touristroute/trip/addNewTrip2',
                          query: {
                            id: result.data.id,
                            copyId: this.copyId
                          }
                        });
                        return ''
                      };
                      this.loading = true;
                      this.$router.push({
                        path: '/touristroute/trip/addNewTrip2',
                        query: {
                          id: result.data.id
                        }
                      });
                    } else if (this.name === 'lineTripAddTrip') {
                      if(this.isCopy) {
                        this.loading = true;
                        this.$router.push({
                          path: '/touristroute/lineTrip/addNewTrip2',
                          query: {
                            id: result.data.id,
                            copyId: this.copyId
                          }
                        });
                        return ''
                      };
                      this.loading = true;
                      this.$router.push({
                        path: '/touristroute/lineTrip/addNewTrip2',
                        query: {
                          id: result.data.id
                        }
                      });
                    }else if (this.name === 'operatingtripAddTrip') {
                      if(this.isCopy) {
                        this.loading = true;
                        this.$router.push({
                          path: '/touristroute/operating/trip/addNewTrip2',
                          query: {
                            id: result.data.id,
                            copyId: this.copyId
                          }
                        });
                        return ''
                      };
                      this.loading = true;
                      this.$router.push({
                        path: '/touristroute/operating/trip/addNewTrip2',
                        query: {
                          id: result.data.id
                        }
                      });
                    } 
                  }
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                };
              },
              showLoading: true
            });
            // if (type === '2') {
            //   doStep1({
            //     params: params,
            //     success: (res) => {
            //       let result = res.data;
            //       if (result.code === 0) {
            //         this.$message({
            //           message: res.data.msg,
            //           type: 'success'
            //         });
            //         if(this.isCopy) {
            //           this.loading = true;
            //           this.$router.push({
            //             path: '/touristroute/addNewTrip2',
            //             query: {
            //               id: result.data.id,
            //               copyId: this.copyId
            //             }
            //           });
            //           return ''
            //         };
            //         this.loading = true;
            //         this.$router.push({
            //           path: '/touristroute/addNewTrip2',
            //           query: {
            //             id: result.data.id
            //           }
            //         });
            //       } else {
            //         this.$message({
            //           message: res.data.msg,
            //           type: 'error'
            //         });
            //       };
            //     },
            //     showLoading: true
            //   });
            // };
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel() {
        const h = this.$createElement;
        this.$confirm('', '操作提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          message: h('div', null, [
            h('p', null, '您当前行程内容未保存，是否要离开本界面？'),
            h('p', null, '（离开后，已编辑好的内容将不会被保存）, 是否继续?')
          ]),
          center: true
        }).then(() => {
          if (this.name === 'tripAddTrip') {
            this.$router.push('/touristroute/trip/list')
          } else if (this.name === 'lineTripAddTrip') {
            this.$router.push('/touristroute/lineTrip/list')
          }
        }).catch(() => {
          
        });
      },
      step1() {
        let params = {
          data: {
            id: this.data.id
          }
        }
        if (this.isCopy) {
          params.data.id = this.$route.query.copyId;
        };
        let action = step1
        if (this.name === 'lineTripAddTrip') {
          action = supplierStep1
        }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              this.data.name = result.name ? result.name : '';
              if (this.isCopy) {
                this.data.name = '';
              };
              this.cfg_line_type = result.cfg_line_type
              this.cfg_tour_type = result.cfg_tour_type
              this.data.class_id_1 = result.class_id_1 ? result.class_id_1.toString() : '0';
              this.data.class_id_2 = result.class_id_2 ? result.class_id_2 : '0';
              this.data.class_id_3 = result.class_id_3 ? result.class_id_3 : '0';
              this.classId2_list = result.cate_list_1;
              this.classId3_list = result.cate_list_2;
              if (result.departure_city && result.departure_city.length > 0) {
                for (let i = 0; i < result.departure_city.length; i++) {
                  let obj = {
                    id: result.departure_city[i],
                    area_name: result.departure_city_name[i]
                  };
                  this.departure_city.push(obj)
                  this.res_citylist1.push(obj)
                };
              };
              if (result.destination_city && result.destination_city.length > 0) {
                for (let i = 0; i < result.destination_city.length; i++) {
                  let obj = {
                    id: result.destination_city[i],
                    area_name: result.destination_city_name[i]
                  };
                  this.destination_city.push(obj)
                  this.res_citylist2.push(obj)
                };
              };
              this.data.departure_traffic_type = result.departure_traffic_type ? result.departure_traffic_type.toString() : '0';
              this.data.departure_traffic_content = result.departure_traffic_content ? result.departure_traffic_content : '';
              this.data.back_traffic_type = result.back_traffic_type ? result.back_traffic_type.toString() : '0';
              this.data.back_traffic_content = result.back_traffic_content ? result.back_traffic_content : '';
              // this.data.trip_days = result.trip_days ? result.trip_days : 0;
              // this.data.trip_night = result.trip_night ? result.trip_night : 0;
              this.data.assembing_place = result.assembing_place ? result.assembing_place : '';
              this.data.assembing_time = result.assembing_time ? result.assembing_time : '';
              if (this.isCopy) {
                this.data.assembing_place = '';
                this.data.assembing_time = '';
              };
              if (result.operator_id) {
                this.op_sel = {
                  user_id: parseInt(result.operator_id),
                  username: result.operator_name,
                };
                this.op_info.push(this.op_sel);
              };
              this.data.deadline = result.deadline ? result.deadline : '';
              this.data.deadline_type = result.deadline_type ? result.deadline_type.toString() : '1';
              this.data.seattime = result.seattime ? result.seattime : '';
              this.data.seattime_type = result.seattime_type ? result.seattime_type.toString() : '1';
              this.data.line_type = result.line_type ? result.line_type.toString() : '1';
              if(result.trip_pic_url && result.trip_pic_url.length > 0) {
                for (let x = 0; x < result.trip_pic_url.length; x++) {
                  let obj = {
                    path: result.trip_pic_url[x]
                  };
                  this.imageUrl.push(obj)
                };
              };
              this.classId1_list = result.cfg_cate_info ? result.cfg_cate_info : '';
              this.data.tour_type = result.tour_type ? result.tour_type + '' : '1';
              this.data.product_theme = result.product_theme || ''
              let arr = []
              if (this.data.product_theme.length > 0) {
                arr = result.product_theme.split(',')
              }
              this.theme = arr
              this.data.minimum_team_num = result.minimum_team_num ? result.minimum_team_num : 1
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        })
      },
      classId1(value) {
        if(value != 0) {
          this.p_type = 1;
          if(!this.editstatus) {
            // console.log(value)
            this.p_id = value;
            this.data.class_id_2 = '0';
            this.data.class_id_3 = '0';
            this.classId2_list = [];
            this.classId3_list = [];
            this.getCateInfo(1);
          };
        };
      },
      classId2(value) {
        this.p_type = 2;
        if(!this.editstatus) {
          // console.log(value.id)
          this.p_id = value;
          this.data.class_id_3 = '0';
          this.classId3_list = [];
          this.getCateInfo(2);
        };
        this.editstatus = false;
      },
      getCateInfo(type) {
        let params = {
          data: {
            type: this.p_type,
            p_id: this.p_id,
            line_filter: 1    // 1.5.4.1 新增：过滤掉非当前用户分配的路线
          }
        };
        getCateInfo({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              if (type == 1) {
                this.classId2_list = res.data.data
              };
              if(type == 2) {
                this.classId3_list = res.data.data
              };
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: false
        });
      },
      insertNum(val, type) {
        if(/^\d+$/.test(val)){
          return
        }
        this.$nextTick(()=>{
          let match = val.match(/\d+/);
          // console.log(match);
          this.data[type] = match ? match[0] : '';
        })
      },
      openAlbumDialog () {
        this.checkList = this.imageUrl.map(item => item.path);
        this.album.page = 1
        this.album.name = ''
        this.checkalbum = ''
        this.getPhotoalbumcate()
        this.getPhotoalbumSubList()
      },
      getPhotoalbumSubList (type) {
        if (type) {
          this.album.page = 1
        }
        let params = {
          data: {
            name: this.album.name,
            id: this.checkalbum,
            page: this.album.page
          }
        }
        getPhotoalbumSubList({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.album_type = true
              this.pictureList = result.data.data
              this.album.page = result.data.page_index
              this.album.total = result.data.total_count
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      },
      getPhotoalbumcate () {
        let params = {
          data: {}
        }
        getPhotoalbumcate({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.albumlist = result.data
            }
          },
          showLoading: true
        })
      },
      selectPicture () {
        if (this.checkList.length > 3) {
          this.$message({
            type: 'error',
            message: '行程图片最多3张'
          })
          return false
        }
        this.imageUrl = this.checkList.map(it => ({path: it}))
        this.album_type = false
      },
      getProductTheme () {
        let params = {
          data: {}
        }
        getProductTheme({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.cfg_theme = result.data
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      },
      delTheme () {

      },
      currentPageChange (val) {
        this.album.page = val
        this.getPhotoalbumSubList()
      }
    },
    mounted() {
      // this.res_citylist = this.init_citylist;
      if (this.$route.query.id) {
        this.editstatus = false;
      }
      if (this.$route.query.copyId) {
        this.isCopy = true;
        this.editstatus = false;
      }
      if(!this.editstatus) {
        this.searchOp();
      }
      this.step1();
      this.getProductTheme()
      this.getPhotoAgreement()  // 获取上传图片权限
    },
  }
</script>
<style scoped lang="less">
.add-trip-wrapper {
  // width: 558px;
  .width1 {
    width: 150px;
  }
  .width2 {
    width: 304px;
  }
  .width3 {
    width: 150px;
  }
  .item2 {
    display: inline-block;
  }
  .upload-wrapper {
    font-size: 0;
    .trip-pic-wrapper {
      margin-top: 20px;
    }
    .el-upload--text {
      text-align: left;
    }
    .uploadbtn {
      display: inline-block;
    }
    .lookbtn {
      color: #b10c79;
      cursor: pointer;
    }
    .trip-pic {
      overflow: hidden;
      display: inline-block;
      position: relative;
      width: 150px;
      height: 150px;
      background-size: cover;
      background-position: center center;
      margin-right: 15px;
      margin-bottom: 15px;
      .trip-pic-remove {
        position: absolute;
        top: 0;
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
      .trip-pic-index-font {
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
      .trip-pic-index-bg {
        position: absolute;
        top: -25px;
        left: -25px;
        width: 50px;
        height: 50px;
        line-height: 0px;
        background-color: #ff9900;
        transform: rotate(45deg);
        transform-origin: center center
      }
    }
    .upload-btn-wrap {
      display: inline-block;
    }
    .el-upload__tip {
      line-height: 24px;
    }
  }
}
.album-wrap {
  overflow: auto;
  max-width:  880px;
  // height: 200px;
  margin: 0 auto;
  // text-align: center;
  .album-item {
    position: relative;
    display: inline-block;
    width: 100px;
    margin: 0px 10px 20px;
    border: 1px solid #dddddd;
    .album-img {
      overflow: hidden;
      width: 100px;
      height: 100px;
      img {
        display: block;
        width: 100%;
        min-height: 100%;
      }
    }
    .album-tit {
      padding: 10px 5px;
      font-size: 14px;
      color: #333333;
      border-top: 1px solid #ddd;
    }
  }
}
.select-box {
  .select-btn {
    font-size: 14px;
    color: #ae1f77;
    cursor: pointer;
  }
  .select-view {
    padding-bottom: 10px;
    .select-item {
      position: relative;
      display: inline-block;
      margin-right: 10px;
      padding: 5px 30px 5px 5px;
      border: 1px dotted #aaaaaa;
      font-size: 12px;
      color: #333333;
      line-height: 18px;
      cursor: pointer;
      &:after {
        position: absolute;
        content: '';
        top: 6px;
        right: 10px;
        width: 1px;
        height: 15px;
        background-color: #aaa;
        transform: rotate(45deg);
      }
      &:before {
        position: absolute;
        content: '';
        top: 6px;
        right: 10px;
        width: 1px;
        height: 15px;
        background-color: #aaa;
        transform: rotate(-45deg);
      }
      &:hover {
        color: #b10c79;
        background-color: #f7e6f1;
        &:after, &:before {
          background-color: #b10c79;
        }
      }
    }
  }
  .select-info {
    position: relative;
    max-height: 200px;
    overflow: auto;
    border: 1px solid #cccccc;
    background-color: #f4f4f4;
    padding: 10px;
    .info-item {
      margin: 0 10px 0 0;
      width: 140px;
      display: inline-block !important;
    }
    .select-info-close {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 15px;
      height: 15px;
      cursor: pointer;
      &:after {
        position: absolute;
        content: '';
        top: 6px;
        right: 10px;
        width: 1px;
        height: 15px;
        background-color: #aaa;
        transform: rotate(45deg);
      }
      &:before {
        position: absolute;
        content: '';
        top: 6px;
        right: 10px;
        width: 1px;
        height: 15px;
        background-color: #aaa;
        transform: rotate(-45deg);
      }
    }
  }
}
.no-data {
  padding: 40px;
  font-size: 14px;
  text-align: center;
}
.ratifyForm {
  padding: 10px 30px;
  p {
    text-indent: 30px;
  }
}
</style>

