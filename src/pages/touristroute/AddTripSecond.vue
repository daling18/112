<template>
<!-- application\index\view\dev\src\components\plan\trip\add-new-trip2.vue -->
  <div class="wrapper">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">行程信息</div>
        <div class="form-content">
          <el-form :model='data_list' label-width="100px">
            <div v-for="(item, index) in data_list.data_info" :key="index" class="tripday-wrapper">
              <div class="daytip">
                <div>第</div>
                <div>{{index + 1}}</div>
                <div>天</div>
              </div>
              <div class="remove-btnwrapper">
                <span class="remove-btn" v-show="data_list.data_info.length > 1" @click="removeTrip(index)">删除</span>
                <span class="remove-btn" @click="resetTrip(index)">清空</span>
              </div>
              <div class="daycon">
                <!-- <el-form-item label="目的地" required>
                  <el-select 
                  class="width2" 
                  @click.native="currentCityPageChange(index)" 
                  v-model="item.destination" 
                  value-key="area_name" 
                  remote 
                  multiple
                  filterable 
                  :remote-method="bindRemoteMethod(index)" 
                  placeholder="输入城市名称进行选择">
                    <el-option v-for="(city, index) in item.res_citylist" :key="index" :label="city.area_name" :value="city">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item class="el-tag-primary" label="目的地" required>
                  <el-select
                    v-model="item.destination"
                    multiple
                    filterable
                    remote
                    placeholder="输入城市名称进行选择"
                    :remote-method="bindRemoteMethod(index)"
                    :loading="loading"
                    class="width2"
                    value-key="id"
                    >
                    <el-option
                      v-for="(item, idx) in item.res_citylist"
                      :key="item.id"
                      :label="item.area_name"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="交通">
                  <el-input class="width2" v-model="item.traffic" placeholder=""></el-input>
                  <span class="traffic-btn icon-plane" @click="traffic(index, '1')"></span>
                  <span class="traffic-btn icon-bus" @click="traffic(index, '2')"></span>
                  <span class="traffic-btn icon-train" @click="traffic(index, '3')"></span>
                  <span class="traffic-btn icon-ship" @click="traffic(index, '4')"></span>
                  <span class="traffic-btn icon-dong" @click="traffic(index, '5')"></span>
                  <span class="traffic-btn icon-gao" @click="traffic(index, '6')"></span>
                </el-form-item>
                <el-form-item label="用餐">
                  <!-- <el-select class="width1" v-model="item.eat_1">
                    <el-option label="早餐-自理" value="0"></el-option>
                    <el-option label="早餐-包含" value="1"></el-option>
                  </el-select>
                  <el-select class="width1" v-model="item.eat_2">
                    <el-option label="午餐-自理" value="0"></el-option>
                    <el-option label="午餐-包含" value="1"></el-option>
                  </el-select>
                  <el-select class="width1" v-model="item.eat_3">
                    <el-option label="晚餐-自理" value="0"></el-option>
                    <el-option label="晚餐-包含" value="1"></el-option>
                  </el-select> -->
                  <el-form-item label="早餐" class="eatItem">
                    <el-input size="medium" placeholder="默认自理" v-model="item.eat_1"/>
                  </el-form-item>
                  <el-form-item label="午餐" class="eatItem">
                    <el-input size="medium" placeholder="默认自理" v-model="item.eat_2"/>
                  </el-form-item>
                  <el-form-item label="晚餐" class="eatItem">
                    <el-input size="medium" placeholder="默认自理" v-model="item.eat_3"/>
                  </el-form-item>
                  
                </el-form-item>
                <el-form-item label="酒店">
                  <el-select class="width1" @change="hotelTypeChange(index)" v-model="item.hotel_type" style="float: left;">
                    <el-option label="自定义" value="98"></el-option>
                    <el-option label="两星以下" value="1"></el-option>
                    <el-option label="三星级" value="2"></el-option>
                    <el-option label="四星级" value="3"></el-option>
                    <el-option label="五星级" value="4"></el-option>
                  </el-select>
                  <el-input size="medium" v-model="item.hotel_custom" placeholder="请输入酒店名称" style="float: left; width: 300px; margin-left: 20px;" />
                  <!-- <el-button type="primary" @click="showHotel(index)">+备选酒店</el-button> -->
                  <div class="hotel-box">
                    <div class="selhotel-wrap">
                      <div class="selhotel-item" v-for="(selhotel, idx) in item.checkhotel" :key="idx" @click="removeHotel(selhotel, index)">{{selhotel.split(",")[0]}}</div>
                    </div>
                    <div class="hotel_list" v-show="item.hotel_show">
                      <span @click="closeHotel(index)" class="hotel-close">X</span>
                      <div>
                        <el-input class="width2" v-model="item.hotel_info" @input="searchHotelAction(index)" placeholder="请输入酒店名称搜索"></el-input>
                        <!-- <span class="hotel-tip">如未搜索你所需添加的酒店，请联系15605013523</span> -->
                      </div>
                      <div class="res-hotel-list clearfix">
                        <div class="tip" v-show="item.res_hotellist && item.res_hotellist.length === 0">暂无符合数据</div>
                        <el-checkbox-group v-model="item.checkhotel">
                          <a href="javascript: void();" v-for="(hotel, index) in item.res_hotellist" :key="index" :title='hotel.hotel_name'>
                            <el-checkbox class="item-reset ellipsis" :label="hotel.hotel_name + ',' + hotel.hotel_code">{{hotel.hotel_name}}</el-checkbox>
                          </a>
                        </el-checkbox-group>
                      </div>
                      <div class="page page-wrap">
                        <el-pagination  layout="prev, pager, next" :total="item.hotel_total_page" @click.native="currentHotelPageIndex(index)" @current-change="currentHotelPageChange">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="景点">
                  <el-button type="primary" @click="showScenic(index)">+ 景点</el-button>
                  <div class="hotel-box">
                    <div class="selhotel-wrap">
                      <div class="selhotel-item" v-for="(selscenic, idx) in item.checkscenic" :key="idx" @click="removeScenic(selscenic, index)">{{selscenic.split(",")[0]}}<span v-show="item.scenic_time[idx]">({{(parseInt(item.scenic_time[idx]) / 60).toFixed(1)}}小时)</span></div>
                      <div class="setsenic-timebtn" v-show="item.checkscenic && item.checkscenic.length > 0" @click="setScenicTime(index)">设置时间</div>
                    </div>
                    <div class="hotel_list" v-show="item.scenic_show">
                      <span @click="closeSenic(index)" class="hotel-close">X</span>
                      <div>
                        <el-input class="width2" v-model="item.scenic_info" @input="searchScenicAction(index)" placeholder="请输入景点名称搜索"></el-input>
                        <!-- <span class="hotel-tip">如未搜索你所需添加的景点，请联系15605013523</span> -->
                      </div>
                      <div class="res-hotel-list clearfix">
                        <div class="tip" v-show="item.res_sceniclist && item.res_sceniclist.length === 0">暂无符合数据</div>
                        <el-checkbox-group v-model="item.checkscenic">
                          <a href="javascript: void();" v-for="(scenic, idx) in item.res_sceniclist" :key="idx" :title='scenic.scenic_title'>
                            <el-checkbox class="item-reset ellipsis" :key="idx" :label="scenic.scenic_title + ',' + scenic.id">{{scenic.scenic_title}}</el-checkbox>
                          </a>
                        </el-checkbox-group>
                      </div>
                      <div class="page page-wrap">
                        <el-pagination  layout="prev, pager, next" :total="item.scenic_total_page" @click.native="currentScenicPageIndex(index)" @current-change="currentScenicPageChange">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item class="upload-wrapper" label="行程图片">
                  <el-button
                    @click="openAlbumDialog(index)"
                    type='primary'>
                    图库选择
                  </el-button>

                  <el-button v-if="$menuPermission('touristroute/addtrip/uploadimage') && !ratify" type='default' @click="img_accord=true">本地上传</el-button>
                  <el-upload
                    class="uploadbtn" 
                    v-if="$menuPermission('touristroute/addtrip/uploadimage') && ratify == 1"
                    action="/api/v1/photo/upload"
                    :show-file-list="false"
                    :data='{type: 1}'
                    :on-success="handleTripPicSuccess"
                    :before-upload="beforeTripPicUpload"
                  >
                    <el-button @click="picIndex(index)" >本地上传</el-button>
                  </el-upload>
                  <!-- <el-upload
                    v-if="$menuPermission('touristroute/addtrip/uploadimage')"
                    class="uploadbtn"
                    action="api/v1/photo/upload"
                    :show-file-list='false'
                    :on-success='handleSuccess'
                    :before-upload="handleBefore"
                    >
                    <el-button type='default'>本地上传</el-button> 
                  </el-upload>-->
                  <span class="el-upload__tip">最多上传5张，支持jpg，jpeg，gif，png格式，10M以内图片</span>
                  <span v-if="ratify == 1" class="lookbtn" @click="img_accord = true">查看协议</span>
                  <div class="trip-pic-wrapper">
                    <div v-for="(pic, idx) in item.trip_pic_url" :key="idx" :style='"backgroundImage:url(" + pic + ")"' class="trip-pic">
                      <span class="trip-pic-remove" @click="handleTripPicRemove(index, idx)">x</span>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="行程描述">
                  <div class="textarea-wrapper">
                    <vue-editor v-model="item.trip_instruction" @input="tripInstruct"></vue-editor>
                    <!-- <el-input class="textarea-con" type="textarea" v-model="item.trip_instruction" @input="tripInstruct" placeholder="请编辑行程说明"></el-input> -->
                    <div class="text-right">{{ noHtmlLength(item.trip_instruction) }}/8000</div>
                  </div>
                </el-form-item>
              </div>
              <el-dialog title="添加游玩时间" :visible.sync="item.dialogScenicTime">
                <div class="dialog-info">您已将以下景点添加到当日行程请补充各景点游玩时间</div>
                <div class="dialog-scenic-con">
                  <el-form-item v-for="(selscenic, idx) in item.checkscenic" :key="idx" :label="selscenic.split(',')[0]" label-width="200px">
                    <el-input class="width1" @change="handleChangeNumberInput(item.scenic_time, idx, $event)" v-model="item.scenic_time[idx]"></el-input>
                    <span>分钟</span>
                  </el-form-item>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="removeScenicTime(index)">取 消</el-button>
                  <el-button type="primary" @click="confirmScenicTime(index)">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <el-form-item label="">
              <el-button type="primary" @click="addNewTrip">新增行程</el-button>
            </el-form-item>
            <div class="submit-buttons left" style="padding-left: 100px;">
              <el-button type="primary" @click="goback">上一步</el-button>
              <el-button type="primary" @click="doStep2">保存，下一步</el-button>
              <el-button @click="cancel">取消</el-button>
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
  import {doStep2, step2, searchHotel, searchScenic, getArea} from 'src/api/api';
  import {supplierDoStep2, supplierStep2} from 'src/api/supplier'
  import {getPhotoalbumSubList, getPhotoalbumcate} from 'src/api/tuan'
  import {getPhotoAgreement, setPhotoAgreement} from 'src/api/uploadpictures' // 本地上传图片权限
  import html5Editor from 'src/plugins/editor/vue-html5-editor.vue';
  export default {
    components: {
      'vue-editor': html5Editor
    },
    data() {
      var selectedratify = (rule, value, callback) => {
        console.log(value);
        if(!value){
          callback(new Error('请勾选同意按钮！'));
        } else {
          callback();
        };
      };
      return {
        timer: "",
        loading: false,
        name: this.$route.name ? this.$route.name : '',
        img_accord: false,  // 是否签署协议
        ratify: 2,     // 签署协议
        ratify_rules: {
          is_ratify: [
            { validator: selectedratify, trigger: 'blur' }
          ]
        },
        ratifyForm: {
          is_ratify: false
        },
        ratifyMsg: {},
        data: {
          product_id: this.$route.query.id,
          destination: [],
          destination_name: [],
          traffic: [],
          eat_1: [],
          eat_2: [],
          eat_3: [],
          hotel_type: [],
          hotel_info: [],
          scenic_spots: [],
          scenic_spots_time: [],
          trip_pic_url: [],
          trip_instruction: []
        },
        res_citylist: [],
        timer: '',
        mid_page: 0,
        mids_page: 0,
        mid_pic: 0,
        mid_city: 0,
        copyId: this.$route.query.copyId,
        isCopy: false,
        data_list: {
          data_info: [{
            destination: [],
            traffic: '',
            eat_1: '',
            eat_2: '',
            eat_3: '',
            hotel_type: '98',
            hotel_custom: "",
            hotel_info: '',
            res_hotellist: [],
            res_citylist: [],
            hotel_page: 1,
            hotel_total_page: 1,
            hotel_show: false,
            checkhotel: [],
            scenic_info: '',
            res_sceniclist: [],
            scenic_page: 1,
            scenic_total_page: 1,
            scenic_show: false,
            checkscenic: [],
            scenic_time: [],
            dialogScenicTime: false,
            trip_pic_url: [],
            limit_pic: 0,
            trip_instruction: '',
            c_destination_name: ''
          }]
        },
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
        init_citylist: [
          {
              "zone_id": 110100,
              "CN": "北京",
              "zone_name": "北京市",
              "EN": "Beijing"
          },
          {
              "zone_id": 310100,
              "CN": "上海",
              "zone_name": "上海市",
              "EN": "Shanghai"
          },
          {
              "zone_id": 440100,
              "CN": "广州",
              "zone_name": "广州市",
              "EN": "Guangzhou"
          },
          {
              "zone_id": 440300,
              "CN": "深圳",
              "zone_name": "深圳市",
              "EN": "Shenzhen"
          },
          {
              "zone_id": 320100,
              "CN": "南京",
              "zone_name": "南京市",
              "EN": "Nanjing"
          },
          {
              "zone_id": 350200,
              "CN": "厦门",
              "zone_name": "厦门市",
              "EN": "Xiamen"
          }
        ],
      }
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
      hotelTypeChange(index) {
        if(this.data_list.data_info[index].hotel_show) {
          this.searchHotelAction(index);
        };
      },
      bindRemoteMethod(index){
        return this.remoteMethod2.bind(this, index);
      },
      remoteMethod2(index,query) {
        let that = this;

        that.timer && clearInterval(that.timer);
        that.timer = setTimeout(function(){
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
                    that.loading = false;
                    that.data_list.data_info[index].res_citylist = result.data;
                      // that.res_citylist2 = result.data.filter(item => {
                      //   return item.area_name.indexOf(query) > -1;
                      // });
                  }, 200);
                } else {
                  that.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                };
              },
              showLoading: false
            });
          } else {
            that.data_list.data_info[index].res_citylist = [];
          }
        },100)
      },
      traffic(index, type) {
        if (type === '1') {
          this.data_list.data_info[index].traffic += '【飞机】'
        };
        if (type === '2') {
          this.data_list.data_info[index].traffic += '【大巴】'
        };
        if (type === '3') {
          this.data_list.data_info[index].traffic += '【火车】'
        };
        if (type === '4') {
          this.data_list.data_info[index].traffic += '【轮船】'
        };
        if (type === '5') {
          this.data_list.data_info[index].traffic += '【动车】'
        };
        if (type === '6') {
          this.data_list.data_info[index].traffic += '【高铁】'
        };
      },
      searchHotel(index) {
        let params = {
          data: {
            hotel_name: this.data_list.data_info[index].hotel_info,
            city_id: '',
            star_code: this.data_list.data_info[index].hotel_type,
            page_index: this.data_list.data_info[index].hotel_page,
            page_size: 10
          }
        };
        searchHotel({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let res_hotellist = res.data.data;
              this.data_list.data_info[index].res_hotellist = res_hotellist.list;
              this.data_list.data_info[index].hotel_total_page = res_hotellist.total_count;
            } else {
              this.data_list.data_info[index].res_hotellist = [];
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        });
      },
      searchScenic(index) {
        let params = {
          data: {
            scenic_title: this.data_list.data_info[index].scenic_info,
            city_id: '',
            page_index: this.data_list.data_info[index].scenic_page,
            page_size: 10
          }
        };
        searchScenic({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let res_sceniclist = res.data.data;
              this.data_list.data_info[index].res_sceniclist = res_sceniclist.list;
              this.data_list.data_info[index].scenic_total_page = res_sceniclist.total_count;
            } else {
              this.data_list.data_info[index].res_sceniclist = [];
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true
        });
      },
      showHotel(index) {
        this.data_list.data_info[index].hotel_show = !this.data_list.data_info[index].hotel_show;
        if (this.data_list.data_info[index].hotel_show) {
          this.data_list.data_info[index].hotel_page = 1;
          this.data_list.data_info[index].hotel_total_page = 1;
          this.searchHotel(index);
        };
      },
      showScenic(index) {
        this.data_list.data_info[index].scenic_show = !this.data_list.data_info[index].scenic_show;
        if (this.data_list.data_info[index].scenic_show) {
          this.data_list.data_info[index].scenic_page = 1
          this.data_list.data_info[index].scenic_total_page = 1;
          this.searchScenic(index);
        };
      },
      searchHotelAction(index) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.data_list.data_info[index].hotel_page = 1;
          this.data_list.data_info[index].hotel_total_page = 1;
          this.searchHotel(index);
        }, 1000);
      },
      searchScenicAction(index) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.data_list.data_info[index].scenic_page = 1;
          this.data_list.data_info[index].scenic_total_page = 1;
          this.searchScenic(index)
        }, 1000);
      },
      currentHotelPageChange(page) {
        // 奇葩中转站
        this.mid_page = page;
      },
      currentScenicPageChange(page) {
        // 奇葩中转站
        this.mids_page = page;
      },
      currentCityPageChange(page) {
        // 奇葩中转站
        this.mid_city = page;
      },
      currentHotelPageIndex(index) {
        setTimeout(() => {
          this.data_list.data_info[index].hotel_page = this.mid_page;
          this.searchHotel(index);
        }, 200);
      },
      currentScenicPageIndex(index) {
        setTimeout(() => {
          this.data_list.data_info[index].scenic_page = this.mids_page;
          this.searchScenic(index);
        }, 200);
      },
      removeHotel(val, index) {
        for (let i = 0; i < this.data_list.data_info[index].checkhotel.length; i++) {
          if (val == this.data_list.data_info[index].checkhotel[i]) {
            this.data_list.data_info[index].checkhotel.splice(i, 1);
          }
        }
      },
      removeScenic(val, index) {
        for (let i = 0; i < this.data_list.data_info[index].checkscenic.length; i++) {
          if (val == this.data_list.data_info[index].checkscenic[i]) {
            this.data_list.data_info[index].checkscenic.splice(i, 1);
            this.data_list.data_info[index].scenic_time.splice(i, 1);
          }
        }
      },
      setScenicTime(index) {
        this.data_list.data_info[index].dialogScenicTime = true;
      },
      removeScenicTime(index) {
        this.data_list.data_info[index].scenic_time = [];
        this.data_list.data_info[index].dialogScenicTime = false;
      },
      confirmScenicTime(index) {
        let isMax = false;
        this.data_list.data_info[index].scenic_time.forEach((item) => {
          if(parseInt(item) > 999999999) {
            this.$message({
              message: '景点游玩分钟数限制范围为0-999999999',
              type: 'error'
            });
            isMax = true;
          };
        });
        if (!isMax) {
          this.data_list.data_info[index].dialogScenicTime = false;
        }
      },
      handleTripPicSuccess(res, file) {
        if (file.response.code === 0 ) {
          this.data_list.data_info[this.mid_pic].trip_pic_url.push(file.response.data.path);
        } else {
          this.$message({
            message: file.response.msg,
            type: 'error'
          })
        };
        this.data_list.data_info[this.mid_pic].limit_pic--;
      },
      beforeTripPicUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        let max_type = true;
        this.data_list.data_info[this.mid_pic].limit_pic++;
        if ((this.data_list.data_info[this.mid_pic].trip_pic_url.length + this.data_list.data_info[this.mid_pic].limit_pic) > 5) {
          this.$message.error('最多上传5张!');
          max_type = false;
          this.data_list.data_info[this.mid_pic].limit_pic--;
        };
        if (!isLt10M) {
          this.$message.error('上传图片大小不能超过 10MB!');
          this.data_list.data_info[this.mid_pic].limit_pic--;
        }
        return isLt10M && max_type;
      },
      handleTripPicRemove(index, idx) {
        this.data_list.data_info[index].trip_pic_url.splice(idx, 1);
      },
      picIndex(index) {
        this.mid_pic = index;
      },
      tripInstruct(val) {
        if (this.noHtmlLength(val) > 8000) {
          this.$message.error('行程说明最多八千字！');
        }
      },
      addNewTrip() {
        let data = {
            destination: [],
            traffic: '',
            eat_1: '',
            eat_2: '',
            eat_3: '',
            hotel_custom: "",
            hotel_type: '98',
            hotel_info: '',
            res_hotellist: [],
            res_citylist: [],
            hotel_page: 1,
            hotel_total_page: 1,
            hotel_show: false,
            checkhotel: [],
            scenic_info: '',
            res_sceniclist: [],
            scenic_page: 1,
            scenic_total_page: 1,
            scenic_show: false,
            checkscenic: [],
            scenic_time: [],
            dialogScenicTime: false,
            trip_pic_url: [],
            limit_pic: 0,
            trip_instruction: '',
            c_destination_name: ''
          };
          this.data_list.data_info.push(data);
      },
      handleBefore(files){
        var that = this;
        if (this.pictureList.length * 1 >= 3) {
          this.$message({
            type: 'error',
            message: '行程图片最多3张'
          })
          return false
        }
      },
      handleSuccess (response, file, fileList) {
        if (response.code === 0) {
          // let params = {
          //   data: {
          //     photoalbum_id: this.id,
          //     pic_url: [response.data.path],
          //     name: ''
          //   }
          // }
          this.checkList = this.imageUrl.map(item => item.path);
          this.checkList.push(response.data.path);
          this.pictureList = this.checkList.map(it => ({path: it}))
          
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      },
      removeTrip(index) {
        this.data_list.data_info.splice(index, 1);
      },
      resetTrip(index) {
        let data = {
            destination: [],
            traffic: '',
            eat_1: '',
            eat_2: '',
            eat_3: '',
            hotel_type: '98',
            hotel_custom: "",
            hotel_info: '',
            res_hotellist: [],
            res_citylist: [],
            hotel_page: 1,
            hotel_total_page: 1,
            hotel_show: false,
            checkhotel: [],
            scenic_info: '',
            res_sceniclist: [],
            scenic_page: 1,
            scenic_total_page: 1,
            scenic_show: false,
            checkscenic: [],
            scenic_time: [],
            dialogScenicTime: false,
            trip_pic_url: [],
            trip_instruction: '',
          };
        this.data_list.data_info.splice(index, 1, data);
      },
      goback() {
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
          if (this.name === 'tripAddTripSecond') {
            this.$router.push({
              path: '/touristroute/trip/addNewTrip',
              query: {
                id: this.data.product_id,
                type: 2
              }
            });
          } else if (this.name === 'lineTripAddTripSecond') {
            this.$router.push({
              path: '/touristroute/lineTrip/addNewTrip',
              query: {
                id: this.data.product_id,
                type: 2
              }
            });
          }else if (this.name === 'operatingtripAddTripSecond') {
            this.$router.push({
              path: '/touristroute/operating/trip/addNewTrip',
              query: {
                id: this.data.product_id,
                type: 2
              }
            });
          }
        }).catch(() => {
          
        });
      },
      doStep2() {
        let params = {
          data: {
            product_id: this.$route.query.id,
            destination: [],
            destination_name: [],
            traffic: [],
            eat_1: [],
            eat_2: [],
            eat_3: [],
            hotel_type: [],
            hotel_custom: [],
            hotel_info: [],
            scenic_spots: [],
            scenic_spots_time: [],
            trip_pic_url: [],
            trip_instruction: [],
            c_destination_name: []
          }
        };
        for (let i = 0; i < this.data_list.data_info.length; i++) {

          if(this.data_list.data_info[i].destination.length <= 0) {
            this.$message({
              message: `第${i + 1}天目的地不能为空`,
              type: 'error'
            });
            return ''
          };
          let arr_id = [];
          let arr_name = [];
          for(let y=0; y<this.data_list.data_info[i].destination.length;y++){
            arr_id.push(this.data_list.data_info[i].destination[y].id)
            arr_name.push(this.data_list.data_info[i].destination[y].area_name)
          }
          params.data.destination.push(arr_id);
          params.data.destination_name.push(arr_name);

          params.data.traffic.push(this.data_list.data_info[i].traffic);
          
          params.data.eat_1.push(this.data_list.data_info[i].eat_1);
          params.data.eat_2.push(this.data_list.data_info[i].eat_2);
          params.data.eat_3.push(this.data_list.data_info[i].eat_3);

          params.data.hotel_type.push(this.data_list.data_info[i].hotel_type);
          params.data.hotel_custom.push(this.data_list.data_info[i].hotel_custom)

          // let hotelArr = [];
          // if (this.data_list.data_info[i].checkhotel.length > 0) {
          //   this.data_list.data_info[i].checkhotel.forEach((item) => {
          //     let obj = {
          //       hotel_code: item.split(",")[1],
          //       hotel_name: item.split(",")[0]
          //     };
          //     hotelArr.push(obj);
          //   })
          // };
          // params.data.hotel_info.push(hotelArr);
          let scenicArr = [];
          if (this.data_list.data_info[i].checkscenic.length > 0) {
            this.data_list.data_info[i].checkscenic.forEach((item) => {
              let obj = {
                id: item.split(',')[1],
                scenic_title: item.split(',')[0]
              };
              scenicArr.push(obj);
            })
          }
          params.data.scenic_spots.push(scenicArr);
          params.data.scenic_spots_time.push(this.data_list.data_info[i].scenic_time);
          params.data.trip_pic_url.push(this.data_list.data_info[i].trip_pic_url);
          params.data.trip_instruction.push(this.data_list.data_info[i].trip_instruction);
          params.data.c_destination_name.push(this.data_list.data_info[i].c_destination_name ? this.data_list.data_info[i].c_destination_name : '-');
        };
        // console.log(params)
        // return ''

        let action = doStep2
        if (this.name === 'lineTripAddTripSecond') {
          action = supplierDoStep2
        }
        action({
          params: params,
          success: (res) => {
            let result = res.data;
            if (result.code === 0) {
              // this.loading = true;
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              if(this.isCopy) {
                if (this.name === 'tripAddTripSecond') {
                  this.$router.push({
                    path: '/touristroute/trip/addNewTrip3',
                    query: {
                      id: this.data.product_id,
                      copyId: this.copyId
                    }
                  });
                } else if (this.name === 'lineTripAddTripSecond') {
                  this.$router.push({
                    path: '/touristroute/lineTrip/addNewTrip3',
                    query: {
                      id: this.data.product_id,
                      copyId: this.copyId
                    }
                  });
                } else if (this.name === 'operatingtripAddTripSecond') {
                  this.$router.push({
                    path: '/touristroute/operating/trip/addNewTrip3',
                    query: {
                      id: this.data.product_id,
                      copyId: this.copyId
                    }
                  });
                } 
                return ''
              };
              if (this.name === 'tripAddTripSecond') {
                this.$router.push({
                  path: '/touristroute/trip/addNewTrip3',
                  query: {
                    id: this.data.product_id
                  }
                });
              } else if (this.name === 'lineTripAddTripSecond') {
                this.$router.push({
                  path: '/touristroute/lineTrip/addNewTrip3',
                  query: {
                    id: this.data.product_id
                  }
                });
              } else if (this.name === 'operatingtripAddTripSecond') {
                  this.$router.push({
                    path: '/touristroute/operating/trip/addNewTrip3',
                    query: {
                      id: this.data.product_id,
                      copyId: this.copyId
                    }
                  });
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
          if (this.name === 'tripAddTripSecond') {
            this.$router.push('/touristroute/trip/list')
          } else if (this.name === 'lineTripAddTripSecond') {
            this.$router.push('/touristroute/lineTrip/list')
          }
        }).catch(() => {
          
        });
      },
      step2() {
        let params = {
          data: {
            id: this.data.product_id
          }
        };
        if (this.isCopy) {
          params.data.id = this.copyId
        };
        let action = step2
        if (this.name === 'lineTripAddTripSecond') {
          action = supplierStep2
        }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              if (result.length === 0) {
                return ''
              };
              this.data_list.data_info.splice(0, this.data_list.data_info.length);
              for (let i = 0; i < result.length; i++) {
                let res_obj = {
                  destination: [],
                  traffic: '',
                  eat_1: '',
                  eat_2: '',
                  eat_3: '',
                  hotel_type: '98',
                  hotel_custom: "",
                  hotel_info: '',
                  res_hotellist: [],
                  res_citylist: [],
                  hotel_page: 1,
                  hotel_total_page: 1,
                  hotel_show: false,
                  checkhotel: [],
                  scenic_info: '',
                  res_sceniclist: [],
                  scenic_page: 1,
                  scenic_total_page: 1,
                  scenic_show: false,
                  checkscenic: [],
                  scenic_time: [],
                  dialogScenicTime: false,
                  trip_pic_url: [],
                  limit_pic: 0,
                  trip_instruction: '',
                  c_destination_name: ''
                };
                
                res_obj.destination = [];
                res_obj.res_citylist = [];
                for(var y=0; y<result[i].destination.length; y++){
                  let obj = {
                    id: result[i].destination[y],
                    area_name: result[i].destination_name[y]
                  }
                  res_obj.destination.push(obj);
                  res_obj.res_citylist.push(obj);
                }
                // res_obj.destination.id = result[i].destination;
                // res_obj.destination.area_name = result[i].destination_name;
                
                // res_obj.res_citylist.push(res_obj.destination);
                res_obj.traffic = result[i].traffic ? result[i].traffic : '';
                res_obj.eat_1 = result[i].eat_1 ? result[i].eat_1.toString() : '';
                res_obj.eat_2 = result[i].eat_2 ? result[i].eat_2.toString() : '';
                res_obj.eat_3 = result[i].eat_3 ? result[i].eat_3.toString() : '';
                res_obj.hotel_type = result[i].hotel_type != 99 ? result[i].hotel_type.toString() : '98';
                res_obj.hotel_custom = result[i].hotel_custom || "";
                for (let j = 0; j < result[i].hotel_info.length; j++) {
                  res_obj.checkhotel.push(result[i].hotel_info[j].hotel_name + "," + result[i].hotel_info[j].hotel_code);
                };
                for (let k = 0; k < result[i].scenic_spots.length; k++) {
                  res_obj.checkscenic.push(result[i].scenic_spots[k].scenic_title + "," + result[i].scenic_spots[k].id);
                };
                for (let x = 0; x < result[i].scenic_spots_time.length; x++) {
                  res_obj.scenic_time.push(result[i].scenic_spots_time[x]);
                };
                res_obj.trip_pic_url = result[i].trip_pic_url ? result[i].trip_pic_url : [];
                res_obj.trip_instruction = result[i].trip_instruction ? result[i].trip_instruction : '';
                res_obj.c_destination_name = result[i].c_destination_name ? result[i].c_destination_name : '';
                this.data_list.data_info.push(res_obj);
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: true,
        })
      },
      closeHotel(index) {
        this.data_list.data_info[index].hotel_show = false;
      },
      closeSenic(index) {
        this.data_list.data_info[index].scenic_show = false;
      },
      handleChangeNumberInput(row, idx, val){
        if(/^\d+$/.test(val)){
          return
        }
        this.$nextTick(()=>{
          let match = val.match(/\d+/);
          // console.log(match);
          this.$set(row, idx, match ? match[0] : '');
        })
      },
      noHtmlLength(val) {
        let str = val;
        // str = str.replace(/<[^>]+>/g, "");
        str = str.match(/[\u4E00-\u9FA5]/g);
        str = str ? str.join(""):'';
        return str.length
      },
      openAlbumDialog (index) {
        this.picIndex(index)
        // this.data_list.data_info[this.mid_pic].trip_pic_url.push(file.response.data.path);
        this.checkList = this.data_list.data_info[this.mid_pic].trip_pic_url;
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
        if (this.checkList.length > 5) {
          this.$message({
            type: 'error',
            message: '行程图片最多5张'
          })
          return false
        }
        this.data_list.data_info[this.mid_pic].trip_pic_url = this.checkList
        this.album_type = false
      },
      currentPageChange (val) {
        this.album.page = val
        this.getPhotoalbumSubList()
      }
    },
    mounted() {
      this.res_citylist = this.init_citylist;
      if (this.$route.query.copyId) {
        this.isCopy = true;
      };
      this.step2();
      this.getPhotoAgreement();
    }
  }
</script>
<style lang="less" scoped>
  .eatItem {
    float: left;
  }
  .uploadbtn {
    display: inline-block;
  }
  .ratifyForm {
    padding: 10px 30px;
    p {
      text-indent: 30px;
    }
  }
  .tripday-wrapper {
    position: relative;
    padding: 0 0 0 30px;
    .lookbtn {
      color: #b10c79;
      cursor: pointer;
    }
    .daytip {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 30px;
      padding: 10px 0;
      background-color: #ae1f77;
      color: #fff;
      text-align: center;
      border-radius: 10px 0 0 10px;
      &>div {
        width: 100%;
      }
    }
    .remove-btnwrapper {
      position: absolute;
      top: 20px;
      right: 30px;
      z-index: 10;
      .remove-btn {
        font-size: 14px;
        color: #b10c79;
        padding: 10px;
        cursor: pointer;
      }
    }
    .daycon {
      border: 1px solid #cccccc;
      padding: 20px 0 10px;
      margin: 0 0 30px;
    }
    .width1 {
      width: 150px;
    }
    .width2 {
      width: 300px;
    }
    .res-hotel-list {
      padding: 10px 0 0;
    }
    .hotel_list {
      position: relative;
      padding: 15px;
      background-color: #f4f4f4;
      margin-right: 30px;
      width: 750px;
      .page-wrap {
        padding: 0;
        background-color: #f4f4f4;
      }
      .hotel-tip {
        color: #999999;
        font-size: 12px;
        padding: 0 10px;
      }
      .item-reset {
        float: left;
        margin: 0 10px 10px 0;
        width: 140px;
        overflow: hidden;
      }
      .hotel-close {
        position: absolute;
        top: 0px;
        right: 10px;
        color: #666;
        font-size: 12px;
        cursor: pointer;
      }
    }
    .selhotel-wrap {
      margin: 15px 0 5px;
      .selhotel-item {
        position: relative;
        display: inline-block;
        padding: 10px 20px 10px 5px;
        font-size: 12px;
        line-height: 12px;
        border: 1px dashed #b10c79;
        color: #b10c79;
        cursor: pointer;
        margin: 0 10px 10px 0;
        &:after {
          position: absolute;
          top: 7.5px;
          right: 10px;
          content: '';
          width: 1px;
          height: 15px;
          background-color: #f7e6f1;
          transform: rotate(45deg);
        }
        &:before {
          position: absolute;
          top: 7.5px;
          right: 10px;
          content: '';
          width: 1px;
          height: 15px;
          background-color: #f7e6f1;
          transform: rotate(-45deg);
        }
        &:hover:after {
          background-color: #b10c79;
        }
        &:hover:before {
          background-color: #b10c79;
        }
        &:hover {
          background-color: #f7e6f1;
        }
      }
      .setsenic-timebtn {
        display: inline-block;
        font-size: 14px;
        color: #b10c79;
        cursor: pointer;
      }
    }
    .dialog-footer {
      text-align: center;
    }
    .dialog-info {
      text-align: center;
    }
    .upload-wrapper {
      font-size: 0;
      .trip-pic-wrapper {
        margin-top: 20px;
      }
      .el-upload--text {
        text-align: left;
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
      }
      .upload-btn-wrap {
        display: inline-block;
      }
      .el-upload__tip {
        line-height: 24px;
      }
    }
    .textarea-wrapper {
      position: relative;
      width: 90%;
      .textarea-con {
        padding: 0 30px 30px 0;
      }
      .textarea-font {
        position: absolute;
        bottom: 0;
        right: 0px;
      }
    }
    .dialog-scenic-con {
      max-height: 300px;
      overflow: auto;
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
.no-data {
  padding: 40px;
  font-size: 14px;
  text-align: center;
}
</style>