<template>
  <div class="wrapper trip-wrapper">
    <div class="system-content">
      <div class="mod-form">
        <el-form :model="data" ref="ruleForm" label-width="180px">
          <div class="title">行程信息</div>
          <div class="form-content">
            <el-form-item label="盈科产品名称" required>
              <el-select class="width2" v-model="data.travel.product_name_first">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="(item, index) in form.ykFestival" :label="item.hname" :value="item.hname" :key="index"></el-option>
              </el-select>
              <el-input class="width2" v-model="data.travel.product_name_middle" placeholder=""></el-input>
              <el-input class="width2" v-model="data.travel.product_name_last" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="盈科产品主题" required>
              <div class="select-box">
                <div class="select-btn" @click="showTheme">可多选</div>
                <div class="select-view">
                  <span v-for="(item, index) in form.yk_theme_id" @click="delTheme(item)" :key="index" class="select-item">{{item.split(",")[1]}}</span>
                </div>
                <div class="select-info" v-show="theme">
                  <span class="select-info-close" @click="showTheme"></span>
                  <el-checkbox-group v-model="form.yk_theme_id">
                    <span v-for="(item, index) in form.ykProductSubject" :key="index" :title='item.subName'>
                      <el-checkbox class="info-item ellipsis" :label="item.subId + ',' + item.subName">{{item.subName}}</el-checkbox>
                    </span>
                  </el-checkbox-group>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="盈科产品经理" required>
              <el-select class="width2" v-model="form.yk_director_id" value-key="id" filterable>
                  <el-option v-for="(item, index) in form.ykProductManagerIds" :label="item.name" :value="item" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="指定代理商">
              <el-select class="width2" v-model="form.agency_id" filterable remote :remote-method="ykSpecifyAgent" clearable value-key="id">
                <el-option v-for="(item, index) in form.ykSpecifyAgent" :label="item.comName+'('+item.loginName+')'" :value="item" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户预定城市">
              <tdm-detail-select-city v-model="data.travel.client_city_id" defaultCheckAll/>
            </el-form-item>
            <el-form-item label="代理预定城市">
              <tdm-detail-select-city v-model="data.travel.agency_city_id" :defaultCheckAll="true"/>
            </el-form-item>
            <el-form-item label="最低成团人数" required>
              <!-- <el-input class="width2" v-model="data.travel.group_people_num" placeholder="请输入最低成团人数"></el-input> -->
              <input-number  class="width2" v-model="data.travel.group_people_num" placeholder="请输入最低成团人数"/>
              人
            </el-form-item>
            <el-form-item label="报名开始提前日期" required>
              <!-- <el-input class="width2" v-model="data.travel.reg_able_start" placeholder="输入数字"></el-input> -->
              <input-number  class="width2" v-model="data.travel.reg_able_start" placeholder="输入数字"/>
              天
            </el-form-item>
            <el-form-item label="成团地点" required>
              <el-select class="width2" v-model="form.group_position_id" filterable remote :remote-method="ykTuanCitys" value-key="cityId">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="(item, index) in form.ykTuanCitys" :label="item.cityName" :value="item" :key="item.cityId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品负责人" required>
              <el-input class="width2" v-model="data.travel.principal" placeholder="电话／名字"></el-input>
            </el-form-item>
            <el-form-item label="产品编号">
              <el-input class="width2" v-model="data.travel.yk_num" placeholder="请输入产品编号"></el-input>
            </el-form-item>
            <el-form-item label="产品名称">
              <el-input class="width2" v-model="data.travel.product_name" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="自定义主题">
              <el-input class="width2" v-model="data.travel.custom_theme" placeholder="请输入自定义主题"></el-input>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="发团地点" :max="1">
              <el-checkbox-group v-model="data.travel_detail.import_start_off_site">
                <el-checkbox true-label="1" false-label="0">出发地成团</el-checkbox>
                <el-checkbox true-label="2" false-label="0">目的地成团</el-checkbox>
                <el-checkbox true-label="3" false-label="0">中转地成团</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="是否拼团" :max="1">
              <el-checkbox-group v-model="data.travel_detail.import_yes_no_cluster">
                <el-checkbox true-label="1" false-label='0'>非行程中拼团</el-checkbox>
                <el-checkbox true-label="2" false-label='0'>行程中拼团</el-checkbox>
              </el-checkbox-group>
              <div>
                <el-checkbox v-model="data.travel_detail.if_headline_one_is_select" true-label="1" false-label='0'></el-checkbox>本行程与其他团队客人拼往返用车<el-input v-show="data.travel_detail.if_headline_one_is_select == '1'" class="width2" v-model="data.travel_detail.headline_one" placeholder=""></el-input>
              </div>
              <div>
                <el-checkbox v-model="data.travel_detail.if_headline_two_is_select" true-label="1" false-label='0'></el-checkbox>根据发团需要，行程中将当地用车或换当地导游<el-input v-show="data.travel_detail.if_headline_two_is_select == '1'" class="width2" v-model="data.travel_detail.headline_two" placeholder=""></el-input>
              </div>
              <div>
                <el-checkbox v-model="data.travel_detail.if_headline_three_is_select" true-label="1" false-label='0'></el-checkbox>可根据需要选择某段行程或升级行程，在该行程段分开安排或统一协调行程<el-input v-show="data.travel_detail.if_headline_three_is_select == '1'" class="width2" v-model="data.travel_detail.headline_three" placeholder=""></el-input>
              </div>
            </el-form-item>
            <el-form-item label="特殊人群">
              <div class="specpeo-btn" v-if="specialPeople  == false" @click="specialPeople = true">添加</div>
              <div class="specpeo-btn" v-if="specialPeople  == true" @click="specialPeople = false">收起</div>
              <div class="specpeo-box" v-show="specialPeople">
                <span class="specpeo-box-close" @click="specialPeople = false"></span>
                <div>
                  <el-checkbox v-model="data.special_people.peopleUnderNumIsSelect" true-label="1" false-label="0"></el-checkbox>
                  单笔订单出游人数少于
                  <!-- <el-input class="width4" v-model="data.special_people.peopleUnderNum" v-show="data.special_people.peopleUnderNumIsSelect === '1'" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="data.special_people.peopleUnderNum" v-show="data.special_people.peopleUnderNumIsSelect === '1'" placeholder="输入数字"/>
                  人，需先询确认
                </div>
                <div>
                  <el-checkbox v-model="data.special_people.peopleExceedNumIsSelect" true-label="1" false-label="0"></el-checkbox>
                  单笔订单出游人数超过
                  <!-- <el-input class="width4" v-model="data.special_people.peopleExceedNum" v-show="data.special_people.peopleExceedNumIsSelect === '1'" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="data.special_people.peopleExceedNum" v-show="data.special_people.peopleExceedNumIsSelect === '1'" placeholder="输入数字"/>
                  人，需先询确认
                </div>
                <div>
                  <el-checkbox v-model="data.special_people.ageExceedNumIsSelect" true-label="1" false-label="0"></el-checkbox>
                  出游人年龄超过
                  <!-- <el-input class="width4" v-model="data.special_people.ageExceedNum" v-show="data.special_people.ageExceedNumIsSelect === '1'" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="data.special_people.ageExceedNum" v-show="data.special_people.ageExceedNumIsSelect === '1'" placeholder="输入数字"/>
                  岁（含），不接收
                </div>
                <div>
                  <el-checkbox v-model="data.special_people.ageUnderNumNumIsSelect" true-label="1" false-label="0"></el-checkbox>
                  出游人年龄低于
                  <!-- <el-input class="width4" v-model="data.special_people.ageUnderNum" v-show="data.special_people.ageUnderNumNumIsSelect === '1'" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="data.special_people.ageUnderNum" v-show="data.special_people.ageUnderNumNumIsSelect === '1'" placeholder="输入数字"/>
                  岁（不含），不接收
                </div>
                <div>
                  <el-checkbox v-model="data.special_people.ageUnderProtocalNumIsSelect" true-label="1" false-label="0"></el-checkbox>
                  出游人年龄超过
                  <!-- <el-input class="width4" v-model="data.special_people.ageUnderProtocalNum" v-show="data.special_people.ageUnderProtocalNumIsSelect === '1'" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="data.special_people.ageUnderProtocalNum" v-show="data.special_people.ageUnderProtocalNumIsSelect === '1'" placeholder="输入数字"/>
                  岁（含），需要签署健康协议
                </div>
                <div>
                  <el-checkbox v-model="data.special_people.ageMinMaxIsSelect" true-label="1" false-label="0"></el-checkbox>
                  出游人年龄在
                  <!-- <el-input class="width4" v-model="data.special_people.ageMinNum" v-show="data.special_people.ageMinMaxIsSelect === '1'" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="data.special_people.ageMinNum" v-show="data.special_people.ageMinMaxIsSelect === '1'" placeholder="输入数字"/>
                  岁至
                  <!-- <el-input class="width4" v-model="data.special_people.ageMaxNum" v-show="data.special_people.ageMinMaxIsSelect === '1'" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="data.special_people.ageMaxNum" v-show="data.special_people.ageMinMaxIsSelect === '1'" placeholder="输入数字"/>
                  岁，可以正常在线预定，年龄范围以外的出游人需先询确认
                </div>
                <div>
                  <el-checkbox v-model="data.special_people.foreignNationalityTouristIsSelect" true-label="1" false-label="0"></el-checkbox>
                  不接受外籍游客（含港澳台同胞）
                </div>
                <div>
                  <el-checkbox v-model="data.special_people.specialPeopleAreaIsSelect" true-label="1" false-label="0"></el-checkbox>
                  地域限制
                </div>
                <div v-if="data.special_people.specialPeopleAreaIsSelect === '1'">
                  <el-checkbox-group class="el-radio-primary" v-model="data.special_people.specialPeopleAreaType" :max="1">
                    <div>
                      <el-checkbox true-label="1" false-label="0">以下户籍客人存在地域限制</el-checkbox>
                    </div>
                    <div v-for="(item, index) in form.specialPeopleAreaCityVoListp" :key="index" class="pintuan-wrap pintuan-pd" v-if="data.special_people.specialPeopleAreaType === '1'">
                      <el-select class="width2" v-model="item.province" value-key="cityId">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(item, index) in form.ykSpecialProvince" :label="item.cityName" :value="item" :key="item.cityId"></el-option>
                      </el-select>
                      <el-select class="width2" v-model="item.city" value-key="cityId" @visible-change="ykSpecialCity(index)">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(item, index) in form.ykSpecialCity" :label="item.cityName" :value="item" :key="item.cityId"></el-option>
                      </el-select>
                      <div class="btn-wrap">
                        <span class="delbtn" v-show="form.specialPeopleAreaCityVoListp.length != 1" @click="dekSpecialPopleCity(index)"></span>
                        <span class="addbtn" v-show="form.specialPeopleAreaCityVoListp.length == index + 1" @click="addSpecialPopleCity"></span>
                      </div>
                    </div>
                    <div>
                      <el-checkbox true-label="2" false-label="0">非以下户籍客人存在地域限制</el-checkbox>
                    </div>
                    <div v-for="(item, index) in form.specialPeopleAreaCityVoListp" :key="index" class="pintuan-wrap pintuan-pd" v-if="data.special_people.specialPeopleAreaType === '2'">
                      <el-select class="width2" v-model="item.province" value-key="cityId">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(item, index) in form.ykSpecialProvince" :label="item.cityName" :value="item" :key="item.cityId"></el-option>
                      </el-select>
                      <el-select class="width2" v-model="item.city" value-key="cityId" @visible-change="ykSpecialCity(index)">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="(item, index) in form.ykSpecialCity" :label="item.cityName" :value="item" :key="item.cityId"></el-option>
                      </el-select>
                      <div class="btn-wrap">
                        <span class="delbtn" v-show="form.specialPeopleAreaCityVoListp.length != 1" @click="dekSpecialPopleCity(index)"></span>
                        <span class="addbtn" v-show="form.specialPeopleAreaCityVoListp.length == index + 1" @click="addSpecialPopleCity"></span>
                      </div>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="特色">
              <el-input class="width2" v-model="data.travel_detail_other.feature_describe" placeholder="输入特色单词"></el-input>
              单词不超过6个字
            </el-form-item>
            <!-- <el-form-item label="定金">
              <el-checkbox v-model="data.travel.is_deposit" true-label="1" false-label="0"></el-checkbox>
              <input-number  class="width2" v-model="data.travel.deposit" placeholder=""/>
              元
            </el-form-item> -->
            <el-form-item label="促销">
              <el-checkbox v-model="data.travel.activity_sales" true-label="2" false-label="1"></el-checkbox>
              该产品申请参加特卖频道促销
            </el-form-item>
            <el-form-item label="行程线路">
              此参考行程
              <el-input class="width2" v-model="data.travel.circuit_journey" placeholder="仅适用于XX团期"></el-input>
              具体需致电咨询
            </el-form-item>
            <el-form-item label="温馨提示">
              <el-input class="width2" v-model="data.travel_detail_other.warm_prompt" placeholder="请输入提示"></el-input>
            </el-form-item>
            <el-form-item label="材料截止提前">
              <!-- <el-input class="width2" v-model="data.travel.material_able" placeholder="请输入材料截止日期"></el-input> -->
              <input-number  class="width2" v-model="data.travel.material_able" placeholder="请输入材料截止日期"/>
              天
            </el-form-item>
          </div>
          <div class="title">行程说明</div>
          <div class="form-content">
            <el-form-item label="行程特色">
              <div class="specpeo-btn" v-if="!specialTrip" @click="specialTrip = true">添加</div>
              <div class="specpeo-btn" v-if="specialTrip" @click="specialTrip = false">收起</div>
              <div class="specpeo-box" v-show="specialTrip">
                <span class="specpeo-box-close" @click="specialTrip = false"></span>
                <div class="specpeo-item">
                  <span>特色详情</span>详情
                </div>
                <div class="specpeo-item">
                  <span>吃</span>
                  <el-input v-model="data.travel_detail_other.eat" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>住</span>
                  <el-input v-model="data.travel_detail_other.reside" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>行</span>
                  <el-input v-model="data.travel_detail_other.walk" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>游</span>
                  <el-input v-model="data.travel_detail_other.travel" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>购</span>
                  <el-input v-model="data.travel_detail_other.reco_buy" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>娱</span>
                  <el-input v-model="data.travel_detail_other.recreation" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>赠送</span>
                  <el-input v-model="data.travel_detail_other.present" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>特别优惠</span>
                  <el-input v-model="data.travel_detail_other.special_offer" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>重要提示</span>
                  <el-input v-model="data.travel_detail_other.significance_prompt" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>交通信息</span>
                  <el-input v-model="data.travel_detail_other.traffic_information" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>详情</span>
                  <el-input v-model="data.travel_detail_other.recommend_detail" placeholder=""></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="费用包含">
              <div class="specpeo-btn" v-if="!feiyongbaohan" @click="feiyongbaohan = true">添加</div>
              <div class="specpeo-btn" v-else @click="feiyongbaohan = false">收起</div>
              <div class="specpeo-box" v-show="feiyongbaohan">
                <span class="specpeo-box-close" @click="feiyongbaohan = false"></span>
                <div class="specpeo-item">
                  <span>交通</span>
                    <div v-for="(item, index) in data.travel_detail.planeTicketList" :key="'plane' + index">
                      <el-checkbox v-if="index === 0" v-model="data.travel_detail.usePlaneIsSelect" true-label="1" false-label="0"></el-checkbox>
                      <el-select class="width2" v-model="item.trafficPath">
                        <el-option label="往返" value="往返"></el-option>
                        <el-option label="去程" value="去程"></el-option>
                        <el-option label="回程" value="回程"></el-option>
                        <el-option label="中间段" value="中间段"></el-option>
                      </el-select>
                      团队经济舱机票
                      <el-select class="width2" v-model="item.taxType">
                        <el-option label="含税" value="含税"></el-option>
                        <el-option label="不含税" value="不含税"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                      </el-select>
                      <div class="btn-wrap">
                        <span class="delbtn" v-show="data.travel_detail.planeTicketList.length != 1" @click="delPlane(index)"></span>
                        <span class="addbtn" v-show="data.travel_detail.planeTicketList.length == index + 1" @click="addPlane"></span>
                      </div>
                    </div>
                    <div v-for="(item, index) in data.travel_detail.trainTicketList" :key="'train' + index">
                      <el-checkbox v-if="index === 0" v-model="data.travel_detail.useTrainIsSelect" true-label="1" false-label="0"></el-checkbox>
                      <el-select class="width2" v-model="item.trafficPath">
                        <el-option label="往返" value="往返"></el-option>
                        <el-option label="去程" value="去程"></el-option>
                        <el-option label="回程" value="回程"></el-option>
                        <el-option label="中间段" value="中间段"></el-option>
                      </el-select>
                      火车票
                      <el-select class="width2" v-model="item.seatType">
                        <el-option label="硬卧" value="硬卧"></el-option>
                        <el-option label="软卧" value="软卧"></el-option>
                        <el-option label="硬座" value="硬座"></el-option>
                        <el-option label="一等座" value="一等座"></el-option>
                        <el-option label="二等座" value="二等座"></el-option>
                      </el-select>
                      <div class="btn-wrap">
                        <span class="delbtn" v-show="data.travel_detail.trainTicketList.length != 1" @click="delTrain(index)"></span>
                        <span class="addbtn" v-show="data.travel_detail.trainTicketList.length == index + 1" @click="addTrain"></span>
                      </div>
                    </div>
                    <div>
                      <el-checkbox v-model="data.travel_detail.useTourBusIsSelect" true-label="1" false-label="0"></el-checkbox>
                      <el-select class="width2" v-model="data.travel_detail.tourBusTrafficPath">
                        <el-option label="往返" value="往返"></el-option>
                        <el-option label="去程" value="去程"></el-option>
                        <el-option label="回程" value="回程"></el-option>
                        <el-option label="中间段" value="中间段"></el-option>
                      </el-select>
                      旅游巴士
                    </div>
                    <div>
                      <el-checkbox v-model="data.travel_detail.localTravelBusIsSelect" true-label="1" false-label="0"></el-checkbox>
                      当地旅游巴士
                    </div>
                </div>
                <div class="specpeo-item">
                  <span>小交通</span>
                  <el-checkbox v-model="data.travel_detail.useLittleIsSelect" true-label="1" false-label="0"></el-checkbox>
                  <el-input class="width2" v-model="data.travel_detail.airportText" placeholder="某地到某地"></el-input>
                  机场
                  <el-select class="width2" v-model="data.travel_detail.trafficPath">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="往返" value="往返"></el-option>
                    <el-option label="去程" value="去程"></el-option>
                    <el-option label="回程" value="回程"></el-option>
                    <el-option label="中间段" value="中间段"></el-option>
                  </el-select>
                  服务
                </div>
                <div class="specpeo-item">
                  <span>签证</span>
                  <el-checkbox-group v-model="data.travel_detail.visaType" :max="1">
                    <div>
                      <el-checkbox label="1" true-label="1" false-label="0">无</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="2" true-label="2" false-label="0">团队旅游签(
                        <!-- <el-input v-show="data.travel_detail.visaType === '2'" class="width" v-model="data.travel_detail.textPrice" placeholder=""></el-input> -->
                        <input-number  :precision="2" v-show="data.travel_detail.visaType === '2'" class="width4" v-model="data.travel_detail.textPrice" placeholder=""/>
                        )元／人</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="3" true-label="3" false-label="0">落地签(
                        <!-- <el-input v-show="data.travel_detail.visaType === '3'" class="width" v-model="data.travel_detail.textPrice" placeholder=""></el-input> -->
                        <input-number  :precision="2" v-show="data.travel_detail.visaType === '3'" class="width4" v-model="data.travel_detail.textPrice" placeholder=""/>
                        )元／人</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="4" true-label="4" false-label="0">免签证</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="5" true-label="5" false-label="0">团队旅游签证</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="6" true-label="6" false-label="0">落地签证</el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
                <div class="specpeo-item">
                  <span>住宿</span>
                  <el-checkbox-group v-model="data.travel_detail.hotelType" :max="1">
                    <div>
                      <el-checkbox label="1" true-label="1" false-label="0">无</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="2" true-label="2" false-label="0">行程所列酒店</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="3" true-label="3" false-label="0"></el-checkbox>(
                        <!-- <el-input v-show="data.travel_detail.hotelType === '3'" class="width" v-model="data.travel_detail.hotelStarLevel" placeholder=""></el-input> -->
                        <input-number  v-show="data.travel_detail.hotelType === '3'" class="width" v-model="data.travel_detail.hotelStarLevel" placeholder=""/>
                        )星级酒店 标准(
                        <!-- <el-input v-show="data.travel_detail.hotelType === '3'" class="width" v-model="data.travel_detail.peopleNum" placeholder=""></el-input> -->
                        <input-number  v-show="data.travel_detail.hotelType === '3'" class="width" v-model="data.travel_detail.peopleNum" placeholder=""/>
                        )人间
                    </div>
                    <div>
                      <el-checkbox label="4" true-label="4" false-label="0"></el-checkbox>酒店标准(
                        <!-- <el-input v-show="data.travel_detail.hotelType === '4'" class="width" v-model="data.travel_detail.peopleNum" placeholder=""></el-input> -->
                        <input-number  v-show="data.travel_detail.hotelType === '4'" class="width" v-model="data.travel_detail.peopleNum" placeholder=""/>
                      )人间
                    </div>
                    <div>
                      <el-checkbox label="5" true-label="5" false-label="0"></el-checkbox>当地酒店标准
                        <!-- <el-input v-show="data.travel_detail.hotelType === '5'" class="width" v-model="data.travel_detail.peopleNum" placeholder=""></el-input> -->
                        <input-number  v-show="data.travel_detail.hotelType === '5'" class="width" v-model="data.travel_detail.peopleNum" placeholder=""/>
                      人间。
                    </div>
                    <div style="font-size: 14px;">（相当于国内 (
                      <!-- <el-input v-show="data.travel_detail.hotelType === '5'" class="width" v-model="data.travel_detail.hotelStarLevel" placeholder=""></el-input> -->
                      <input-number  v-show="data.travel_detail.hotelType === '5'" class="width" v-model="data.travel_detail.hotelStarLevel" placeholder=""/>
                      )星级酒店标准，因当地酒店不评星级，无法精确地按照国内标准衡量，具体可在网上查阅其它客人的评价。）</div>
                  </el-checkbox-group>
                </div>
                <!-- <div class="specpeo-item">
                  <el-checkbox></el-checkbox>
                </div> -->
                <div class="specpeo-item" v-for="(item, index) in data.travel_detail.hotelOrShipList" :key="index">
                  <el-input class="width2" v-model="item.hotelOrShipName" placeholder="目的地酒店或游船"></el-input>
                  <!-- <el-input class="width4" v-model="item.peopleNum" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="item.peopleNum" placeholder="输入数字"/>
                  人间
                  <!-- <el-input class="width4" v-model="item.nightNum" placeholder="输入数字"></el-input> -->
                  <input-number  class="width4" v-model="item.nightNum" placeholder="输入数字"/>
                  晚
                  <div class="btn-wrap">
                    <span class="delbtn" @click="delHotel(index)" v-show="data.travel_detail.hotelOrShipList.length != 1"></span>
                    <span class="addbtn" @click="addHotel" v-show="data.travel_detail.hotelOrShipList.length == index + 1"></span>
                  </div>
                </div>
                <div class="specpeo-item">
                  <span>用餐</span>
                  <el-checkbox-group v-model="data.travel_detail.mealType" :max="1">
                    <el-checkbox label="无" true-label="1" false-label="0"></el-checkbox>
                    <el-checkbox label="行程中团队标准用餐(含飞机用餐)" true-label="2" false-label="0"></el-checkbox>
                    <el-checkbox label="行程中团队标准用餐(不含飞机用餐)" true-label="3" false-label="0"></el-checkbox>
                  </el-checkbox-group>
                  <el-input class="width2" v-model="data.travel_detail.textMealInfo" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>门票</span>
                  <el-checkbox v-model="data.travel_detail.ticketIsSelect" true-label="1" false-label="0">行程中所含的景点首道门票,</el-checkbox>
                  <el-input class="width2" v-model="data.travel_detail.textTicketInfo" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>导游</span>
                  <el-checkbox-group v-model="data.travel_detail.guideType" :max="1">
                    <el-checkbox label="无" true-label="1" false-label="0"></el-checkbox>
                    <el-checkbox label="当地中文导游" true-label="2" false-label="0"></el-checkbox>
                    <el-checkbox label="专职中文领队兼导游" true-label="3" false-label="0"></el-checkbox>
                    <el-checkbox label="专职领队和当地中文导游" true-label="4" false-label="0"></el-checkbox>
                  </el-checkbox-group>
                  <el-input class="width2" v-model="data.travel_detail.textGuideInfo" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>儿童价格</span>
                  <el-checkbox-group v-model="data.travel_detail.childType" :max="1">
                    <div>
                      <el-checkbox label="无" true-label="1" false-label="0">无</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="年龄" true-label="2" false-label="0">年龄</el-checkbox>
                        <!-- <el-input class="width" v-show="data.travel_detail.childType === '2'" v-model="data.travel_detail.minValue" placeholder=""></el-input> -->
                        <input-number  class="width" v-show="data.travel_detail.childType === '2'" v-model="data.travel_detail.minValue" placeholder=""/>
                        ~
                        <!-- <el-input class="width" v-show="data.travel_detail.childType === '2'" v-model="data.travel_detail.maxValue" placeholder=""></el-input> -->
                        <input-number  class="width" v-show="data.travel_detail.childType === '2'" v-model="data.travel_detail.maxValue" placeholder=""/>
                        周岁（不含）
                        <el-select class="width4" v-show="data.travel_detail.childType === '2'" v-model="data.travel_detail.isOccupyBed">
                          <el-option label="占床" value="占床"></el-option>
                          <el-option label="不占床" value="不占床"></el-option>
                        </el-select>
                        <el-input class="width2" v-show="data.travel_detail.childType === '2'" v-model="data.travel_detail.textExplaininfo" placeholder=""></el-input>
                    </div>
                    <div>
                      <el-checkbox label="身高" true-label="3" false-label="0">身高</el-checkbox>
                        <!-- <el-input class="width" v-show="data.travel_detail.childType === '3'" v-model="data.travel_detail.minValue" placeholder=""></el-input> -->
                        <input-number  class="width" v-show="data.travel_detail.childType === '3'" v-model="data.travel_detail.minValue" placeholder=""/>
                        ~
                        <!-- <el-input class="width" v-show="data.travel_detail.childType === '3'" v-model="data.travel_detail.maxValue" placeholder=""></el-input> -->
                        <input-number  class="width" v-show="data.travel_detail.childType === '3'" v-model="data.travel_detail.maxValue" placeholder=""/>
                        cm（含）
                        <el-select class="width4" v-show="data.travel_detail.childType === '3'" v-model="data.travel_detail.isOccupyBed">
                          <el-option label="占床" value="占床"></el-option>
                          <el-option label="不占床" value="不占床"></el-option>
                        </el-select>
                        <el-input class="width2" v-show="data.travel_detail.childType === '3'" v-model="data.travel_detail.textExplaininfo" placeholder=""></el-input>
                    </div>
                    <div>
                      <el-checkbox label="特殊儿童说明" true-label="4" false-label="0">特殊儿童说明</el-checkbox>
                      <div>
                        <el-input type="textarea" class="width2" v-show="data.travel_detail.childType === '4'" v-model="data.travel_detail.textExplaininfo" placeholder=""></el-input>
                      </div>
                    </div>
                  </el-checkbox-group>
                </div>
                <div class="specpeo-item">
                  <span>小费</span>
                  <el-checkbox v-model="data.travel_detail.useTipIsSelect"  true-label="1" false-label="0">司机导游小费全程</el-checkbox>
                  <!-- <el-input class="width" v-model="data.travel_detail.price" placeholder=""></el-input> -->
                  <input-number  :precision="2" class="width4" v-model="data.travel_detail.price" placeholder="输入数字"/>
                  元／人
                  <el-input class="width2" v-model="data.travel_detail.textTipInfo" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>赠送</span>
                  <el-input v-model="data.travel_detail.inprice_present_info" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>其他</span>
                  <el-input v-model="data.travel_detail.inprice_other_info" placeholder=""></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="费用不包含">
              <div class="specpeo-btn" v-if="!fiyongbubaohan" @click="fiyongbubaohan = true">添加</div>
              <div class="specpeo-btn" v-else @click="fiyongbubaohan = false">收起</div>
              <div class="specpeo-box" v-show="fiyongbubaohan">
                <span class="specpeo-box-close" @click="fiyongbubaohan = false"></span>
                <div class="specpeo-item">
                  <span>小交通</span>
                  <el-checkbox v-model="data.travel_detail.not_inprice_useLittleIsSelect" true-label="1" false-label="0"></el-checkbox>
                  <el-input class="width2" v-model="data.travel_detail.not_inprice_airportText" placeholder="某地到某地"></el-input>
                  机场
                  <el-select class="width2" v-model="data.travel_detail.not_inprice_trafficPath">
                    <el-option label="不选择" value=""></el-option>
                    <el-option label="往返" value="往返"></el-option>
                    <el-option label="去程" value="去程"></el-option>
                    <el-option label="回程" value="回程"></el-option>
                    <el-option label="中间段" value="中间段"></el-option>
                  </el-select>
                  服务
                </div>
                <div class="specpeo-item">
                  <span>机票税</span>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceAirportNumIsSelect" true-label="1" false-label="0">往返机票税</el-checkbox>
                    <!-- <el-input class="width4" v-model="data.travel_detail.notInPriceAirportNum" placeholder="输入数字"></el-input> -->
                    <input-number  :precision="2" class="width4" v-model="data.travel_detail.notInPriceAirportNum" placeholder="输入数字"/>
                    元/人，报名时与团费一起支付
                  </div>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceOutAirportNumIsSelect" true-label="1" false-label="0">境外机场回程机场税</el-checkbox>
                    <!-- <el-input class="width4" v-model="data.travel_detail.notInPriceOutAirportNum" placeholder="输入数字"></el-input> -->
                    <input-number  :precision="2" class="width4" v-model="data.travel_detail.notInPriceOutAirportNum" placeholder="输入数字"/>
                    元/人，境外机场现付（仅供参考，实际费用按当天规定执行）
                  </div>
                </div>
                <div class="specpeo-item">
                  <span>签证</span>
                  <el-checkbox-group v-model="data.travel_detail.notInPriceVisaType" :max="1">
                    <div>
                      <el-checkbox label="1" true-label="1" false-label="0">无</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="2" true-label="2" false-label="0">团队旅游签证费</el-checkbox>(
                        <!-- <el-input class="width" v-show="data.travel_detail.notInPriceVisaType === '2'" v-model="data.travel_detail.notInPriceVisaNum" placeholder=""></el-input> -->
                        <input-number  :precision="2" class="width" v-show="data.travel_detail.notInPriceVisaType === '2'" v-model="data.travel_detail.notInPriceVisaNum" placeholder=""/>
                        )元/人，与团费一起支付
                    </div>
                    <div>
                      <el-checkbox label="3" true-label="3" false-label="0">落地签证费</el-checkbox>(
                        <!-- <el-input class="width" v-show="data.travel_detail.notInPriceVisaType === '3'" v-model="data.travel_detail.notInPriceVisaNum" placeholder=""></el-input> -->
                        <input-number  :precision="2" class="width" v-show="data.travel_detail.notInPriceVisaType === '3'" v-model="data.travel_detail.notInPriceVisaNum" placeholder=""/>
                        )元/人，境外机场现付
                    </div>
                    <div>
                      <el-checkbox label="4" true-label="4" false-label="0">落地签证费</el-checkbox>(
                        <!-- <el-input class="width" v-show="data.travel_detail.notInPriceVisaType === '4'" v-model="data.travel_detail.notInPriceVisaNum" placeholder=""></el-input> -->
                        <input-number  :precision="2" class="width" v-show="data.travel_detail.notInPriceVisaType === '4'" v-model="data.travel_detail.notInPriceVisaNum" placeholder=""/>
                        )元/人，与团费一起支付
                    </div>
                    <div>
                      <el-checkbox label="5" true-label="5" false-label="0">团队旅游签证</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox label="6" true-label="6" false-label="0">落地签证费</el-checkbox>
                    </div>
                  </el-checkbox-group>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceIfSingleVisaIsSelect" label="0" true-label="1" false-label="0">个人签证，须自行办理</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceIfGroupVisaIsSelect" label="0" true-label="1" false-label="0">团队签证，须自行办理</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceIfGotVisaIsSelect" label="0" true-label="1" false-label="0">港澳通行证置证费</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceIfTaiVisaIsSelect" label="0" true-label="1" false-label="0">往来台湾通行证置证费</el-checkbox>
                  </div>
                </div>
                <div class="specpeo-item">
                  <span>门票</span>
                  <el-checkbox v-model="data.travel_detail.notInpriceTicketIsSelect" true-label="1" false-label="0"></el-checkbox>
                  行程中注明需要另行支付的自费景点
                  <el-input class="width2" v-model="data.travel_detail.notInpriceTicket" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>其他</span>
                  <el-input type="textarea" class="width3" v-model="data.travel_detail.not_inprice_other_info" placeholder=""></el-input>
                </div>
                <div class="specpeo-item">
                  <span>补充</span>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceSupply1IsSelect"  true-label="1" false-label="0">出入境个人物品海关征税，超重行李的托运费、保管费</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceSupply2IsSelect"  true-label="1" false-label="0">因交通延阻、战争、政变、罢工、天气、飞机机器故障、航班取消或更改时间等不可抗力原因所引致的额外费用</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceSupply3IsSelect"  true-label="1" false-label="0">酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="data.travel_detail.notInPriceSupply4IsSelect"  true-label="1" false-label="0">当地参加的自费以及以上“费用包含”中不包含的其他项目</el-checkbox>
                  </div>
                </div>
                <div class="specpeo-item">
                  <span>意外险</span>
                  <el-checkbox v-model="data.travel_detail.not_inprice_if_safe" true-label="1" false-label="0">旅游人身意外保险</el-checkbox>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="预定须知">
              <div class="specpeo-btn" v-if="!yudingxuzhi" @click="yudingxuzhi = true">添加</div>
              <div class="specpeo-btn" v-else @click="yudingxuzhi = false">收起</div>
              <div class="specpeo-box" v-show="yudingxuzhi">
                <span class="specpeo-box-close" @click="yudingxuzhi = false"></span>
                <div class="specpeo-item1">
                  <el-checkbox-group v-model="form.pre_order_add_ons_info1.opt" :max="1">
                    <div>
                      <el-checkbox true-label="1" false-label='0'></el-checkbox>
                      为了确保您能够按时出行，产品确认后请在（
                      <!-- <el-input v-show="form.pre_order_add_ons_info1.opt === '1'" class="width" v-model="form.pre_order_add_ons_info1.val" placeholder=""></el-input> -->
                      <input-number  :precision="2" v-show="form.pre_order_add_ons_info1.opt === '1'" class="width" v-model="form.pre_order_add_ons_info1.val" placeholder=""/>
                      ）小时内付款，同时请按要求尽快提供出游所需的材料并签订出境旅游合同。
                    </div>
                    <div>
                      <el-checkbox true-label="2" false-label='0'></el-checkbox>
                      为了确保您能够按时出行，产品确认后请在（
                      <!-- <el-input v-show="form.pre_order_add_ons_info1.opt === '2'" class="width" v-model="form.pre_order_add_ons_info1.val" placeholder=""></el-input> -->
                      <input-number  :precision="2" v-show="form.pre_order_add_ons_info1.opt === '2'" class="width" v-model="form.pre_order_add_ons_info1.val" placeholder=""/>
                      ）小时内付预付款签订报名意向书，同时请按要求尽快提供出游所需的材料，并于出团前5个工作日交齐尾款并签订出境旅游合同。
                    </div>
                  </el-checkbox-group>
                  <div>
                    <el-checkbox v-model="form.pre_order_add_ons_info2.opt" true-label="1" false-label="0"></el-checkbox>
                    预订时请告之您的出游人数、出发日期、住宿、用餐标准、以及您的特殊需求。
                    团队报价按2人入住1间房核算，如出现单男单女，则尽量安排与其他同性别团友拼房或加床；若客人无需安排或旅行社无法安排，请补齐单房差以享用单人房间。
                    团队机票一经开出，不得更改，不得签转，不得退票；另飞行时间、车程时间、船程时间以当日实际所用时间为准。
                    如遇国家或航空公司政策性调整机票、燃油税价格，按调整后的实际价格结算。
                    当地购物时请慎重考虑，把握好质量与价格，请务必保存好所有的购物票据，若购物点提供发票，请索要。
                    是否给予签证或签注、是否准予出入境，是使领馆及有关部门的权力，如因游客自身原因或因提供材料存在问题不能及时办理签证或签注，以及被有关部门拒发签证或签注，不准出入境而影响行程的，签证费及其他费用损失由游客自行承担。
                    为了不耽误您的行程，请您在国际航班起飞前180分钟到达机场办理登机以及出入境相关手续；如涉及海外国内段行程，请您在航班起飞前60分钟到达机场办理登机手续。
                    出团通知最晚于出团前1个工作日发送，若能提前确定，我们将会第一时间通知您。
                  </div>
                  <div>
                    <el-checkbox v-model="form.pre_order_add_ons_info3.opt" true-label="1" false-label="0"></el-checkbox>
                    此团收客人数不足 
                    <!-- <el-input class="width4" v-show="form.pre_order_add_ons_info3.opt === '1'" v-model="form.pre_order_add_ons_info3.val" placeholder="输入数字"></el-input> -->
                    <input-number  class="width4" v-show="form.pre_order_add_ons_info3.opt === '1'" v-model="form.pre_order_add_ons_info3.val" placeholder="输入数字"/>
                    人时，本公司会于出发前 
                    <!-- <el-input class="width4" v-show="form.pre_order_add_ons_info3.opt === '1'" v-model="form.pre_order_add_ons_info3.val2" placeholder="输入数字"></el-input> -->
                    <input-number  class="width4" v-show="form.pre_order_add_ons_info3.opt === '1'" v-model="form.pre_order_add_ons_info3.val2" placeholder="输入数字"/>
                    个工作日通知取消该行程，您可以选择延期出发、更改线路出行，或退回团款。
                  </div>
                  <el-checkbox-group v-model="form.pre_order_add_ons_info4.opt">
                    <div>
                      <el-checkbox true-label="1" false-label="0"></el-checkbox>
                       团队游览中不允许擅自离团（自由活动除外），如有不便敬请谅解。
                    </div>
                    <div>
                      <el-checkbox true-label="2" false-label="0"></el-checkbox>
                      团队游览中不允许擅自离团（自由活动除外），游客中途离团视同违约，需要支付违约金（
                      <!-- <el-input v-show="form.pre_order_add_ons_info4.opt === '2'" class="width4" v-model="form.pre_order_add_ons_info4.val" placeholder="输入数字"></el-input> -->
                      <input-number  v-show="form.pre_order_add_ons_info4.opt === '2'" class="width4" v-model="form.pre_order_add_ons_info4.val" placeholder="输入数字"/>
                      ）元 ，且由此造成未参加行程内景点、用餐、房、车等费用不退，旅行社亦不承担游客离团时发生意外的责任。
                    </div>
                  </el-checkbox-group>
                  <el-checkbox v-model="form.pre_order_add_ons_info5.opt"  true-label="1" false-label="0"></el-checkbox>
                  销签说明：团队返回后，请务必将护照及返程登机牌的原件交于领队统一办理销签手续（其中登机牌原件递送进领馆后是不予退还的，如您需要换取航空公司的积分，可在机场换取登机牌时同时办理）；且按照各使领馆现行规定，会抽查团队部分或全部出团游客回国后面试销签，届时抽查到的游客必须按照使馆通知的时间本人前往使馆面试销签。
                  <el-checkbox-group v-model="form.pre_order_add_ons_info6.opt" :max="1">
                    <div>
                      <el-checkbox true-label="1" false-label="0"></el-checkbox>
                       本团队产品只接受持各地签发的中国大陆因私护照客人，不接受港澳台及外籍客人预订。
                    </div>
                    <div>
                      <el-checkbox true-label="2" false-label="0"></el-checkbox>
                      本团队产品只接受持各地签发的港澳通行证客人，不接受港澳台及外籍客人预订
                    </div>
                  </el-checkbox-group>
                  <el-checkbox  v-model="form.pre_order_add_ons_info7.opt" true-label="1" false-label="0"></el-checkbox>
                  如果您已自备签证，请务必提供有效护照及签证复印件，用于核对姓名和签证有效期。如因自备签证问题造成行程受阻，相应损失需自行承担。
                </div>
              </div>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="特别约定条款">
              <div class="specpeo-btn" v-if="!specetiaokuang" @click="specetiaokuang = true">添加</div>
              <div class="specpeo-btn" v-else @click="specetiaokuang = false">收起</div>
              <div class="specpeo-box" v-show="specetiaokuang">
                <span class="specpeo-box-close" @click="specetiaokuang = false"></span>
                <div class="specpeo-item1">
                  <el-checkbox-group v-model="form.pre_order_special_info">
                    <div>
                      <el-checkbox label='1'></el-checkbox>
                       、因甲方原因发生拒签、延时交签造成本次出境行程变更或取消的，乙方不承担违约责任，甲方需承担申办 签证费用（
                       <!-- <el-input class="width4" v-model="form.pre_order_special_infoval.val" placeholder=""></el-input> -->
                       <input-number  :precision="2" class="width4" v-model="form.pre_order_special_infoval.val" placeholder="输入数字"/>
                       ）元/人。
                    </div>
                    <div>
                      <el-checkbox label='2'></el-checkbox>
                      、本团 机位订金（
                      <!-- <el-input class="width4" v-model="form.pre_order_special_infoval.val2" placeholder=""></el-input> -->
                      <input-number  :precision="2" class="width4" v-model="form.pre_order_special_infoval.val2" placeholder="输入数字"/>
                      ）元/人。 ，未送签证前，如因甲方原因取消行程的，已收取的 机位订金不予退还 ，同时按照旅游合同相关条款保留收取甲方违约金的权利。
                    </div>
                    <div>
                      <el-checkbox label='3'></el-checkbox>
                       、因甲方原因 送签后或者出签后 造成本次行程变更或取消行程的，乙方不承担任何违约责任， 甲方需承担申办签证费用（
                       <!-- <el-input class="width4" v-model="form.pre_order_special_infoval.val3" placeholder=""></el-input> -->
                       <input-number  :precision="2" class="width4" v-model="form.pre_order_special_infoval.val3" placeholder="输入数字"/>
                       ）元/人和机位订金等实际已经发生的费用 。
                    </div>
                    <div>
                      <el-checkbox label='4'></el-checkbox>
                       、此合同签订后即为出机票的有效确认，旅行社到出票时间点直接出票，恕不另行告知。
                    </div>
                    <div>
                      <el-checkbox label='5'></el-checkbox>
                       、若甲方因为个人原因无法出入境或提供的护照扫描件与在机场登记护照信息不符，责任自负，乙方不承担责任。
                    </div>
                    <div>
                      <el-checkbox label='6'></el-checkbox>
                      、特别提醒：此线路团款中不包含甲方所在地到出境城市的往返交通费及住宿费用，如产生此部分费用，请客人自理。建议旅游者在获悉此团队已送签证后再着手预订国内段交通及住宿。
                    </div>
                    <div>
                      <el-checkbox label='7'></el-checkbox>
                       、联运航班不保证当天航班，去程可能会提前一天，回程可能会晚一天。若产生住宿费由客人自理。最终以实际出票情况为准。
                    </div>
                    <div>
                      <el-checkbox label='8'></el-checkbox>
                       、甲方认可：当甲方面试出签之后临时退团时，甲方同意缴纳旅游担保金的，乙方退还客人护照；甲方不缴纳旅游担保金的，则乙方有权保留护照直到签证过期。
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="el-radio-primary" label="自费活动">
              <div>
                <el-checkbox v-model="form.explain_textbox" true-label="1" false-label="0"></el-checkbox>
                以下报价含景点门票，往返车票，导游服务费
              </div>
              <div>
                <el-table :data="data.travel_detail_other.activity_recommend" style="width: 100%" border>
                <el-table-column
                  label="自费活动名称"
                  align='center'
                  width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.activityName" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="参考价"
                  align='center'
                  width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="详情"
                  align='center'
                  >
                  <template slot-scope="scope">
                    <el-input type="textarea" v-model="scope.row.detail" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注"
                  align='center'
                  >
                  <template slot-scope="scope">
                    <el-input type="textarea" v-model="scope.row.remark" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align='center'
                  width="100" >
                  <template slot-scope="scope">
                    <span class="shop-btn" @click="delAct(scope.$index)" v-if="data.travel_detail_other.activity_recommend.length != 1">删除</span>
                    <span class="shop-btn" @click="addAct" v-if="data.travel_detail_other.activity_recommend.length == scope.$index + 1">新增</span>
                  </template>
                </el-table-column>
              </el-table>
              </div>
            </el-form-item>
          </div>
          <div class="submit-buttons">
            <el-button class="el-button" v-show="!data.travel.id" @click="addTravel(0)" type="primary">保存</el-button>
            <el-button class="el-button" @click="addTravel(1)" type="primary">保存，提交审核</el-button>
            <!-- <el-button class="el-button" v-show="data.travel.id" @click="addTravel(1)" type="primary">保存，提交审核</el-button> -->
            <el-button type="default" @click="cancel">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import TdmDetailSelectCity from './TdmDetailSelectCity';
import InputNumber from 'src/plugins/InputNumber.vue';

import {travelDetail,
        addTravel,
        editTravel,
        ykSpecialCity,
        ykSpecialProvince,
        ykTuanCitys,
        ykReserveCitys,
        ykFestival,
        ykProductSubject,
        ykProductManagerIds,
        ykSpecifyAgent,
} from 'src/api/api';

export default {
  data() {
    return {
      product_id: this.$route.query.id ? this.$route.query.id : '',
      theme: false,
      specialPeople: false,
      specialTrip: false,
      feiyongbaohan: false,
      fiyongbubaohan: false,
      yudingxuzhi: false,
      specetiaokuang: false,
      submitStatus: true,
      data: {
        product_id: this.$route.query.id,
        travel: {
          id: "",
          create_user_id: "",
          product_id: this.$route.query.id ? this.$route.query.id : '',
          yk_product_id: "",
          product_name_first: "",
          product_name_middle: "",
          product_name_last: "",
          product_name: "",
          yk_theme_id: [],
          yk_theme_name: [],
          activity_sales: "1",
          custom_theme: "",
          yk_director_id: "",
          yk_director_name: "",
          agency_id: "",
          client_city_id: [],
          agency_city_id: [],
          group_people_num: "",
          group_position_id: "",
          group_position: "",
          principal: "",
          yk_num: "",
          submit_status: "",
          audit_date: "",
          auto_audit_status: "",
          back_reason: "",
          create_time: "",
          update_time: "",
          reg_able_start: "",
          circuit_journey: "",
          is_deposit: "0",
          deposit: 0
        },
        travel_detail: {
          id: "",
          product_id: this.$route.query.id ? this.$route.query.id : '',
          yk_product_id: "",
          headline_one: "",
          headline_two: "",
          headline_three: "",
          if_headline_one_is_select: "0",
          if_headline_three_is_select: "",
          if_headline_two_is_select: "",
          import_cluster_modality: "",
          import_start_off_site: "0",
          import_yes_no_cluster: "0",
          childType: "0",
          isOccupyBed: "不占床",
          maxValue: "0",
          minValue: "0",
          textExplaininfo: "",
          guideType: "0",
          textGuideInfo: "",
          mealType: "0",
          textMealInfo: "",
          inprice_other_info: "",
          inprice_present_info: "",
          airportText: "",
          trafficPath: "",
          useLittleIsSelect: "",
          hotelOrShipName: "",
          nightNum: "",
          hotelStarLevel: "0",
          hotelType: "0",
          peopleNum: "0",
          useHotelIsSelect: "",
          textTicketInfo: "",
          ticketIsSelect: "1",
          price: "",
          textTipInfo: "",
          useTipIsSelect: "0",
          localTravelBusIsSelect: "0",
          taxType: "",
          plan_trafficPath: "",
          tourBusTrafficPath: "往返",
          seatType: "",
          train_trafficPath: "",
          usePlaneIsSelect: "0",
          useTourBusIsSelect: "0",
          useTrainIsSelect: "0",
          inprice_userdefine_info: "",
          textPrice: "",
          visaType: "0",
          notInPriceSupply1IsSelect: "0",
          notInPriceSupply2IsSelect: "0",
          notInPriceSupply3IsSelect: "0",
          notInPriceSupply4IsSelect: "0",
          notInPriceAirportNum: "",
          notInPriceAirportNumIsSelect: "0",
          notInPriceOutAirportNum: "",
          notInPriceOutAirportNumIsSelect: "0",
          not_inprice_if_safe: "0",
          not_inprice_other_info: "",
          not_inprice_airportText: "",
          not_inprice_trafficPath: "",
          not_inprice_useLittleIsSelect: "0",
          notInpriceTicket: "",
          notInpriceTicketIsSelect: "1",
          not_inprice_userdefine_info: "",
          notInPriceIfGotVisaIsSelect: "0",
          notInPriceIfGroupVisaIsSelect: "0",
          notInPriceIfSingleVisaIsSelect: "0",
          notInPriceIfTaiVisaIsSelect: "0",
          notInPriceVisaNum: "",
          notInPriceVisaType: "0",
          planeTicketList: [{
            taxType: "含税",
            trafficPath: "往返"
          }],
          trainTicketList: [{
            seatType: "硬卧",
            trafficPath: "往返"
          }],
          hotelOrShipList: [{
            hotelOrShipName: '',
            nightNum: '',
            peopleNum: ''
          }]
        },
        travel_detail_other: {
          id: "",
          product_id: this.$route.query.id ? this.$route.query.id : '',
          yk_product_id: "",
          announcement: "",
          explain_textbox: "",
          pre_order_add_ons_info: [],
          pre_order_special_info: [],
          warm_prompt: "",
          eat: "",
          feature_describe: "",
          present: "",
          reco_buy: "",
          recreation: "",
          reside: "",
          significance_prompt: "",
          special_offer: "",
          traffic_information: "",
          travel: "",
          walk: "",
          recommend_detail: "",
          activity_recommend: [{
            activityName: '',
            detail: '',
            price: '',
            remark: ''
          }]
        },
        special_people: {
          id: "",
          product_id: this.$route.query.id ? this.$route.query.id : '',
          yk_product_id: "",
          ageExceedNum: "",
          ageExceedNumIsSelect: "0",
          ageMaxNum: "",
          ageMinMaxIsSelect: "0",
          ageMinNum: "",
          ageUnderNum: "",
          ageUnderNumNumIsSelect: "0",
          ageUnderProtocalNum: "",
          ageUnderProtocalNumIsSelect: "0",
          foreignNationalityTouristIsSelect: "0",
          peopleExceedNum: "",
          peopleExceedNumIsSelect: "0",
          peopleUnderNum: "",
          peopleUnderNumIsSelect: '0',
          specialPeopleAreaCityVoList: [],
          specialPeopleAreaIsSelect: "0",
          specialPeopleAreaType: "0",
        }
      },
      form: {
        ykFestival: [],
        ykProductSubject: [],
        yk_theme_id: [],
        yk_director_id: {
          id: '',
          name: ''
        },
        ykProductManagerIds: [],
        ykSpecifyAgent: [],
        agency_id: {},
        ykTuanCitys: [],
        group_position_id: {
          cityId: '',
          cityName: ''
        },
        ykSpecialProvince:[],
        ykSpecialCity: [],
        selectCity: [],
        specialPeopleAreaCityVoListp: [{
          province: {
            cityName: '',
            cityId: ''
          },
          city: {
            cityName: '',
            cityId: ''
          }
        }],
        pre_order_add_ons_info1: {
          opt: "0",
          val: '',
          val2: ''
        },
        pre_order_add_ons_info2: {
          opt: '0',
          val: '',
          val2: ''
        },
        pre_order_add_ons_info3: {
          opt: '0',
          val: '',
          val2: ''
        },
        pre_order_add_ons_info4: {
          opt: '0',
          val: '',
          val2: ''
        },
        pre_order_add_ons_info5: {
          opt: '0',
          val: '',
          val2: ''
        },
        pre_order_add_ons_info6: {
          opt: '0',
          val: '',
          val2: ''
        },
        pre_order_add_ons_info7: {
          opt: '0',
          val: '',
          val2: ''
        },
        pre_order_special_info: [],
        pre_order_special_infoval: {
          val: '',
          val2: '',
          val3: ''
        },
        explain_textbox: "0"
      }
    }
  },
  methods: {
    showTheme() {
      this.theme = !this.theme;
    },
    delTheme(val) {
      this.form.yk_theme_id.forEach((item, idx) => {
        if(item === val) {
          this.form.yk_theme_id.splice(idx, 1);
        }
      });
    },
    cancel() {
      this.$router.push({path: '/trip'});
    },
    addSpecialPopleCity() {
      let obj = {
        province: {
          cityId: '',
          cityName: ''
        },
        city: {
          cityId: '',
          cityName: ''
        },
      };
      this.form.specialPeopleAreaCityVoListp.push(obj);
    },
    dekSpecialPopleCity(index) {
      this.form.specialPeopleAreaCityVoListp.splice(index, 1);
    },
    addPlane() {
      let obj = {
        taxType: "含税",
        trafficPath: "往返"
      };
      this.data.travel_detail.planeTicketList.push(obj)
    },
    delPlane(index) {
      this.data.travel_detail.planeTicketList.splice(index, 1);
    },
    addTrain() {
      let obj = {
        seatType: "硬卧",
        trafficPath: "往返"
      };
      this.data.travel_detail.trainTicketList.push(obj);
    },
    delTrain(index) {
      this.data.travel_detail.trainTicketList.splice(index, 1);
    },
    addHotel() {
      let obj = {
        hotelOrShipName: '',
        nightNum: '',
        peopleNum: ''
      };
      this.data.travel_detail.hotelOrShipList.push(obj);
    },
    delHotel(index) {
      this.data.travel_detail.hotelOrShipList.splice(index, 1);
    },
    addAct() {
      let obj = {
        activityName: '',
        detail: '',
        price: '',
        remark: ''
      };
      this.data.travel_detail_other.activity_recommend.push(obj);
    },
    delAct(index) {
      this.data.travel_detail_other.activity_recommend.splice(index, 1);
    },
    addTravel(type) {
      //  console.log(this.data.travel.agency_city_id);
      // this.data.product_id = this.product_id;
      if(this.submitStatus) {
        this.submitStatus = false;
      } else {
        return
      };
      this.data.is_check = type;
      this.data.travel.yk_theme_id = [];
      this.data.travel.yk_theme_name = [];
      this.form.yk_theme_id.forEach((item) => {
        this.data.travel.yk_theme_id.push(item.split(',')[0]);
        this.data.travel.yk_theme_name.push(item.split(',')[1]);
      });
      this.data.travel.yk_director_id = this.form.yk_director_id.id;
      this.data.travel.yk_director_name = this.form.yk_director_id.name;
      this.data.travel.agency_id = this.form.agency_id.id ? this.form.agency_id.id : "";
      this.data.travel.agency_name = this.form.agency_id.comName ? this.form.agency_id.comName : "";
      this.data.travel.agency_loginname = this.form.agency_id.loginName ? this.form.agency_id.loginName : "";
      this.data.travel.group_position_id = this.form.group_position_id.cityId;
      this.data.travel.group_position = this.form.group_position_id.cityName;
      if(this.data.travel_detail_other.activity_recommend.length > 1) {
        this.data.travel_detail_other.activity_recommend.forEach((item, index) => {
          if(!this.data.travel_detail_other.activity_recommend[index].activityName) {
            this.data.travel_detail_other.activity_recommend.splice(index, 1);
          }
        });
      };
      //  console.log(this.data.travel_detail_other.activity_recommend)
      this.data.special_people.specialPeopleAreaCityVoList = [];
      this.form.specialPeopleAreaCityVoListp.forEach((item) => {
        let obj = {
          city: item.city.cityName,
          city_id: item.city.cityId,
          province: item.province.cityName,
          province_id: item.province.cityId
        }
        this.data.special_people.specialPeopleAreaCityVoList.push(obj);
      });
      this.data.travel_detail_other.pre_order_add_ons_info = [];
      if(this.form.pre_order_add_ons_info1.opt != 0) {
        let content = '';
        if(this.form.pre_order_add_ons_info1.opt == 1) {
          content = `为了确保您能够按时出行，产品确认后请在（${this.form.pre_order_add_ons_info1.val}）小时内付款，同时请按要求尽快提供出游所需的材料并签订出境旅游合同。`
        }else if(this.form.pre_order_add_ons_info1.opt == 2) {
          content = `为了确保您能够按时出行，产品确认后请在（${this.form.pre_order_add_ons_info1.val}）小时内付预付款签订报名意向书，同时请按要求尽快提供出游所需的材料，并于出团前5个工作日交齐尾款并签订出境旅游合同。`
        };
        let obj = {
          id: 1,
          opt: this.form.pre_order_add_ons_info1.opt,
          val: this.form.pre_order_add_ons_info1.val,
          val2: this.form.pre_order_add_ons_info1.val2,
          content: content
        };
        this.data.travel_detail_other.pre_order_add_ons_info.push(obj);
      };
      if(this.form.pre_order_add_ons_info2.opt != 0) {
        let obj = {
          id: 2,
          opt: this.form.pre_order_add_ons_info2.opt,
          val: this.form.pre_order_add_ons_info2.val,
          val2: this.form.pre_order_add_ons_info2.val2,
          content: '预订时请告之您的出游人数、出发日期、住宿、用餐标准、以及您的特殊需求。团队报价按2人入住1间房核算，如出现单男单女，则尽量安排与其他同性别团友拼房或加床；若客人无需安排或旅行社无法安排，请补齐单房差以享用单人房间。团队机票一经开出，不得更改，不得签转，不得退票；另飞行时间、车程时间、船程时间以当日实际所用时间为准。如遇国家或航空公司政策性调整机票、燃油税价格，按调整后的实际价格结算。当地购物时请慎重考虑，把握好质量与价格，请务必保存好所有的购物票据，若购物点提供发票，请索要。是否给予签证或签注、是否准予出入境，是使领馆及有关部门的权力，如因游客自身原因或因提供材料存在问题不能及时办理签证或签注，以及被有关部门拒发签证或签注，不准出入境而影响行程的，签证费及其他费用损失由游客自行承担。为了不耽误您的行程，请您在国际航班起飞前180分钟到达机场办理登机以及出入境相关手续；如涉及海外国内段行程，请您在航班起飞前60分钟到达机场办理登机手续。出团通知最晚于出团前1个工作日发送，若能提前确定，我们将会第一时间通知您。'
        };
        this.data.travel_detail_other.pre_order_add_ons_info.push(obj);
      };
      if(this.form.pre_order_add_ons_info3.opt != 0) {
        let obj = {
          id: 3,
          opt: this.form.pre_order_add_ons_info3.opt,
          val: this.form.pre_order_add_ons_info3.val,
          val2: this.form.pre_order_add_ons_info3.val2,
          content: `此团收客人数不足${this.form.pre_order_add_ons_info3.val}人时，本公司会于出发前${this.form.pre_order_add_ons_info3.val2}个工作日通知取消该行程，您可以选择延期出发、更改线路出行，或退回团款。`
        };
        this.data.travel_detail_other.pre_order_add_ons_info.push(obj);
      };
      if(this.form.pre_order_add_ons_info4.opt != 0) {
        let content = '';
        if(this.form.pre_order_add_ons_info4.opt == 1) {
          content = `团队游览中不允许擅自离团（自由活动除外），如有不便敬请谅解。`
        }else if(this.form.pre_order_add_ons_info4.opt == 2) {
          content = `团队游览中不允许擅自离团（自由活动除外），游客中途离团视同违约，需要支付违约金 ${this.form.pre_order_add_ons_info4.val}元 ，且由此造成未参加行程内景点、用餐、房、车等费用不退，旅行社亦不承担游客离团时发生意外的责任。`
        };
        let obj = {
          id: 4,
          opt: this.form.pre_order_add_ons_info4.opt,
          val: this.form.pre_order_add_ons_info4.val,
          val2: this.form.pre_order_add_ons_info4.val2,
          content: content
        };
        this.data.travel_detail_other.pre_order_add_ons_info.push(obj);
      };
      if(this.form.pre_order_add_ons_info5.opt != 0) {
        let obj = {
          id: 5,
          opt: this.form.pre_order_add_ons_info5.opt,
          val: this.form.pre_order_add_ons_info5.val,
          val2: this.form.pre_order_add_ons_info5.val2,
          content: '销签说明：团队返回后，请务必将护照及返程登机牌的原件交于领队统一办理销签手续（其中登机牌原件递送进领馆后是不予退还的，如您需要换取航空公司的积分，可在机场换取登机牌时同时办理）；且按照各使领馆现行规定，会抽查团队部分或全部出团游客回国后面试销签，届时抽查到的游客必须按照使馆通知的时间本人前往使馆面试销签。'
        };
        this.data.travel_detail_other.pre_order_add_ons_info.push(obj);
      };
      if(this.form.pre_order_add_ons_info6.opt != 0) {
        let content = '';
        if(this.form.pre_order_add_ons_info4.opt == 1) {
          content = `本团队产品只接受持各地签发的中国大陆因私护照客人，不接受港澳台及外籍客人预订。`
        }else if(this.form.pre_order_add_ons_info4.opt == 2) {
          content = `本团队产品只接受持各地签发的港澳通行证客人，不接受港澳台及外籍客人预订。`
        };
        let obj = {
          id: 6,
          opt: this.form.pre_order_add_ons_info6.opt,
          val: this.form.pre_order_add_ons_info6.val,
          val2: this.form.pre_order_add_ons_info6.val2,
          content: content
        };
        this.data.travel_detail_other.pre_order_add_ons_info.push(obj);
      };
      if(this.form.pre_order_add_ons_info7.opt != 0) {
        let obj = {
          id: 7,
          opt: this.form.pre_order_add_ons_info7.opt,
          val: this.form.pre_order_add_ons_info7.val,
          val2: this.form.pre_order_add_ons_info7.val2,
          content: `如果您已自备签证，请务必提供有效护照及签证复印件，用于核对姓名和签证有效期。如因自备签证问题造成行程受阻，相应损失需自行承担。`
        };
        this.data.travel_detail_other.pre_order_add_ons_info.push(obj);
      };
      this.data.travel_detail_other.pre_order_special_info = [];
      this.form.pre_order_special_info.forEach((item) => {
        let val = '';
        let content = '';
        if(item === '1') {
          val = this.form.pre_order_special_infoval.val;
          content = `因甲方原因发生拒签、延时交签造成本次出境行程变更或取消的，乙方不承担违约责任，甲方需承担申办 签证费用${val}元/人`
        }else if(item == '2') {
          val = this.form.pre_order_special_infoval.val2;
          content = `本团 机位订金${val}元/人。 ，未送签证前，如因甲方原因取消行程的，已收取的 机位订金不予退还 ，同时按照旅游合同相关条款保留收取甲方违约金的权利。`
        }else if(item == '3') {
          val = this.form.pre_order_special_infoval.val3;
          content = `因甲方原因 送签后或者出签后 造成本次行程变更或取消行程的，乙方不承担任何违约责任， 甲方需承担申办签证费用${val}/人和机位订金等实际已经发生的费用 。`
        }else if(item == '4') {
          content = `此合同签订后即为出机票的有效确认，旅行社到出票时间点直接出票，恕不另行告知。`
        }else if(item == '5') {
          content = `若甲方因为个人原因无法出入境或提供的护照扫描件与在机场登记护照信息不符，责任自负，乙方不承担责任。`
        }else if(item == '6') {
          content = `特别提醒：此线路团款中不包含甲方所在地到出境城市的往返交通费及住宿费用，如产生此部分费用，请客人自理。建议旅游者在获悉此团队已送签证后再着手预订国内段交通及住宿。`
        }else if(item == '7') {
          content = `联运航班不保证当天航班，去程可能会提前一天，回程可能会晚一天。若产生住宿费由客人自理。最终以实际出票情况为准。`
        }else if(item == '8') {
          content = `甲方认可：当甲方面试出签之后临时退团时，甲方同意缴纳旅游担保金的，乙方退还客人护照；甲方不缴纳旅游担保金的，则乙方有权保留护照直到签证过期。`
        };
        let obj = {
          id: item,
          val: val,
          val2: '',
          content: content
        };
        this.data.travel_detail_other.pre_order_special_info.push(obj);
      });
      if(this.form.explain_textbox === "1") {
        this.data.travel_detail_other.explain_textbox = "以下报价含景点门票，往返车票，导游服务费";
      } else {
        this.data.travel_detail_other.explain_textbox = "";
      };
      // this.form.pre_order_add_ons_info14
      let params = {
        data: this.data
      };
      addTravel({
        params,
        success: (res) => {
          let result = res.data;
          this.submitStatus = true;
          if(result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.$router.push({path: '/trip'});
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
    travelDetail() {
      let params = {
        data: {
          product_id: this.product_id
        }
      };
      travelDetail({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            // this.data.product_id = this.product_id;
            if(result.data.travel.length === 0) {
              return
            };
            Object.assign(this.data, result.data);
            this.data.travel.product_name_first = this.data.travel.product_name_first ? this.data.travel.product_name_first : "";
            if(this.data.travel.yk_theme_id && this.data.travel.yk_theme_id.length > 0) {
              this.data.travel.yk_theme_id.forEach((item, index) => {
                this.form.yk_theme_id.push(`${this.data.travel.yk_theme_id[index]},${this.data.travel.yk_theme_name[index]}`);
              });
            };
            this.form.yk_director_id = {
              id: parseInt(this.data.travel.yk_director_id) ? this.data.travel.yk_director_id : '',
              name: this.data.travel.yk_director_name ? this.data.travel.yk_director_name : ''
            };
            this.data.travel_detail.if_headline_one_is_select = this.data.travel_detail.if_headline_one_is_select ? (this.data.travel_detail.if_headline_one_is_select + '') : '0';
            this.data.travel_detail.if_headline_two_is_select = this.data.travel_detail.if_headline_two_is_select ? (this.data.travel_detail.if_headline_two_is_select + '') : '0';
            this.data.travel_detail.if_headline_three_is_select = this.data.travel_detail.if_headline_three_is_select ? (this.data.travel_detail.if_headline_three_is_select + '') : '0';
            this.data.travel_detail.ticketIsSelect = this.data.travel_detail.ticketIsSelect ? (this.data.travel_detail.ticketIsSelect + '') : '0';
            this.data.travel_detail.notInpriceTicketIsSelect = this.data.travel_detail.notInpriceTicketIsSelect ? (this.data.travel_detail.notInpriceTicketIsSelect + '') : '0';
            this.data.travel_detail.useTrainIsSelect = this.data.travel_detail.useTrainIsSelect ? (this.data.travel_detail.useTrainIsSelect + '') : '0';
            this.data.travel_detail.usePlaneIsSelect = this.data.travel_detail.usePlaneIsSelect ? (this.data.travel_detail.usePlaneIsSelect + '') : '0';
            this.data.travel_detail.useTipIsSelect = this.data.travel_detail.useTipIsSelect ? (this.data.travel_detail.useTipIsSelect + '') : '0';
            this.data.travel.activity_sales = this.data.travel.activity_sales ? (this.data.travel.activity_sales + '') : '0';
            this.data.travel_detail.useTourBusIsSelect = this.data.travel_detail.useTourBusIsSelect ? (this.data.travel_detail.useTourBusIsSelect + '') : '0';
            this.data.travel_detail.localTravelBusIsSelect = this.data.travel_detail.localTravelBusIsSelect ? (this.data.travel_detail.localTravelBusIsSelect + '') : '0';
            this.data.travel_detail.useLittleIsSelect = this.data.travel_detail.useLittleIsSelect ? (this.data.travel_detail.useLittleIsSelect + '') : "0";
            this.data.travel_detail.not_inprice_useLittleIsSelect = this.data.travel_detail.not_inprice_useLittleIsSelect ? (this.data.travel_detail.not_inprice_useLittleIsSelect + '') : '0';
            this.data.travel_detail.notInPriceAirportNumIsSelect = this.data.travel_detail.notInPriceAirportNumIsSelect ? (this.data.travel_detail.notInPriceAirportNumIsSelect + '') : '0';
            this.data.travel_detail.notInPriceOutAirportNumIsSelect = this.data.travel_detail.notInPriceOutAirportNumIsSelect ? (this.data.travel_detail.notInPriceOutAirportNumIsSelect + '') : '0';
            this.data.travel_detail.notInPriceSupply1IsSelect = this.data.travel_detail.notInPriceSupply1IsSelect ? (this.data.travel_detail.notInPriceSupply1IsSelect + "") : '0';
            this.data.travel_detail.notInPriceSupply2IsSelect = this.data.travel_detail.notInPriceSupply2IsSelect ? (this.data.travel_detail.notInPriceSupply2IsSelect + '') : '0';
            this.data.travel_detail.notInPriceSupply3IsSelect = this.data.travel_detail.notInPriceSupply3IsSelect ? (this.data.travel_detail.notInPriceSupply3IsSelect + "") : '0';
            this.data.travel_detail.notInPriceSupply4IsSelect = this.data.travel_detail.notInPriceSupply4IsSelect ? (this.data.travel_detail.notInPriceSupply4IsSelect + '') : "0";
            this.data.travel.is_deposit = this.data.travel.is_deposit ? (this.data.travel.is_deposit + "") : "0";
            this.form.agency_id.id = this.data.travel.agency_id ? this.data.travel.agency_id : '';
            this.form.agency_id.comName =  this.data.travel.agency_name ? this.data.travel.agency_name : "";
            this.form.agency_id.loginName = this.data.travel.agency_loginname ? this.data.travel.agency_loginname : '';
            if(this.data.travel.agency_name) {
              this.ykSpecifyAgent(this.form.agency_id.comName);
            };
            this.form.group_position_id.cityId = parseInt(this.data.travel.group_position_id);
            this.form.group_position_id.cityName = this.data.travel.group_position;
            if(this.data.travel.group_position) {
              this.ykTuanCitys(this.data.travel.group_position);
            };
            this.data.travel.circuit_journey = this.data.travel.circuit_journey ?  this.data.travel.circuit_journey : '';
            if(this.data.special_people.specialPeopleAreaCityVoList && this.data.special_people.specialPeopleAreaCityVoList.length > 0) {
              this.form.specialPeopleAreaCityVoListp = [];
              this.data.special_people.specialPeopleAreaCityVoList.forEach((item, index) => {
                let obj = {
                  city: {
                    cityName: item.city ? item.city : '',
                    cityId: item.city_id ? item.city_id : ''
                  },
                  province: {
                    cityName: item.province ? item.province : '',
                    cityId: item.province_id ? item.province_id : ''
                  }
                };
                this.form.specialPeopleAreaCityVoListp.push(obj);
                if(this.form.specialPeopleAreaCityVoListp[index].province.cityName && this.form.specialPeopleAreaCityVoListp[index].province.cityName.length > 0) {
                  this.ykSpecialCity(index);
                }
              });
            };
            if(this.data.travel_detail_other.pre_order_add_ons_info && this.data.travel_detail_other.pre_order_add_ons_info.length > 0) {
              this.data.travel_detail_other.pre_order_add_ons_info.forEach((item) => {
                if(item.id == 1) {
                  this.form.pre_order_add_ons_info1.opt = item.opt;
                  this.form.pre_order_add_ons_info1.val = item.val;
                  this.form.pre_order_add_ons_info1.val2 = item.val2;
                }else if(item.id == 2) {
                  this.form.pre_order_add_ons_info2.opt = item.opt;
                  this.form.pre_order_add_ons_info2.val = item.val;
                  this.form.pre_order_add_ons_info2.val2 = item.val2;
                }else if(item.id == 3) {
                  this.form.pre_order_add_ons_info3.opt = item.opt;
                  this.form.pre_order_add_ons_info3.val = item.val;
                  this.form.pre_order_add_ons_info3.val2 = item.val2;
                }else if(item.id == 4) {
                  this.form.pre_order_add_ons_info4.opt = item.opt;
                  this.form.pre_order_add_ons_info4.val = item.val;
                  this.form.pre_order_add_ons_info4.val2 = item.val2;
                }else if(item.id == 5) {
                  this.form.pre_order_add_ons_info5.opt = item.opt;
                  this.form.pre_order_add_ons_info5.val = item.val;
                  this.form.pre_order_add_ons_info5.val2 = item.val2;
                }else if(item.id == 6) {
                  this.form.pre_order_add_ons_info6.opt = item.opt;
                  this.form.pre_order_add_ons_info6.val = item.val;
                  this.form.pre_order_add_ons_info6.val2 = item.val2;
                }else if(item.id == 7) {
                  this.form.pre_order_add_ons_info7.opt = item.opt;
                  this.form.pre_order_add_ons_info7.val = item.val;
                  this.form.pre_order_add_ons_info7.val2 = item.val2;
                };
              });
            };
            if(this.data.travel_detail_other.pre_order_special_info && this.data.travel_detail_other.pre_order_special_info.length > 0) {
              this.data.travel_detail_other.pre_order_special_info.forEach((item) => {
                this.form.pre_order_special_info.push(item.id);
                if(item.id == 1) {
                  this.form.pre_order_special_infoval.val = item.val;
                }else if(item.id == 2) {
                  this.form.pre_order_special_infoval.val2 = item.val;
                }else if(item.id == 3) {
                  this.form.pre_order_special_infoval.val3 = item.val;
                }
              });
            };
            if(this.data.travel_detail_other.explain_textbox && this.data.travel_detail_other.explain_textbox.length > 0) {
              this.form.explain_textbox = '1';
            };
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          }
        },
        showLoading: true
      })
    },
    ykFestival() {
      ykFestival({
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.form.ykFestival = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    ykProductSubject() {
      let params = {
        data: {
          product_id: this.product_id
        }
      };
      ykProductSubject({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.form.ykProductSubject = result.data;
          }else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      }) 
    },
    ykProductManagerIds() {
      let params = {
        data: {
          product_id: this.product_id
        }
      };
      ykProductManagerIds({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.form.ykProductManagerIds = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    ykSpecifyAgent(query) {
      let params = {
        data: {
          agency_name: query.split("(")[0]
        }
      };
      ykSpecifyAgent({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.form.ykSpecifyAgent = result.data.data;
          } else {
             console.log(result.msg)
            // this.$message({
            //   type: 'error',
            //   message: result.msg
            // })
          }
        }
      })
    },
    ykTuanCitys(query) {
      let params = {
        data: {
          city_name: query
        }
      };
      ykTuanCitys({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.form.ykTuanCitys = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    ykSpecialProvince() {
      ykSpecialProvince({
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.form.ykSpecialProvince = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    ykSpecialCity(index) {
      //  console.log(index)
      // if(index === 0) {
      //   this.$message({
      //     type: 'error',
      //     message: '省份不能为空'
      //   });
      //   return ''
      // };
      let params = {
        data: {
          province_id: this.form.specialPeopleAreaCityVoListp[index].province.cityId
        }
      };
      ykSpecialCity({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.form.ykSpecialCity = result.data;
          } else {
            // this.$message({
            //   type: 'error',
            //   message: result.msg
            // })
          }
        }
      });
    }
  },
  mounted() {
    this.ykFestival();
    this.ykProductSubject();
    this.ykProductManagerIds();
    this.ykSpecialProvince();
    this.travelDetail();
  },
  components: {
    TdmDetailSelectCity,
    InputNumber
  }
}
</script>
<style lang="less" scoped>
  .form-content {
    .width {
      width: 50px;
    }
    .width2 {
      width: 200px;
    }
    .width4 {
      width: 100px;
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
    .sel-citybtn {
      position: relative;
      display: inline-block;
      color: #ae1f77;
      margin-left: 50px;
      cursor: pointer;
      &:after {
        position: absolute;
        top: 15px;
        left: 60px;
        content: "";
        width: 0px;
        height: 0px;
        border-top: 5px solid #aaa;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
    }
    .city-box {
      position: relative;
      border: 1px solid #cccccc;
      background-color: #f4f4f4;
      padding: 10px;
      .city-box-close {
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
      .city-box-line {
        position: relative;
        padding-left: 100px;
        min-height: 18px;
        font-size: 0;
        .city-box-tit {
          position: absolute;
          top: 9px;
          left: 0px;
          font-size: 12px;
          line-height: 18px;
        }
        .city-box-item {
          position: relative;
          display: inline-block;
          margin: 9px 20px 0 0;
          padding: 0 30px 0 0;
          font-size: 12px;
          line-height: 18px;
          &:after {
            position: absolute;
            top: 6px;
            right: 10px;
            content: "";
            width: 0px;
            height: 0px;
            border-top: 5px solid #aaa;
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            border-bottom: 5px solid transparent;
          }
          &:hover .box-item-con {
            display: block;
          }
          .box-item-con {
            display: none;
            position: absolute;
            top: 18px;
            left: 0px;
            padding: 5px;
            background-color: #fff;
            width: 200px;
            border: 1px solid #aaa;
            z-index: 10;
            .box-item-nomg {
              margin-left: 0;
              padding: 0 0 10px;
            }
          }
        }
      }
    }
    .pintuan-wrap {
      font-size: 0;
      &.pintuan-pd {
        padding: 5px 0;
        .btn-wrap {
          vertical-align: top;
        }
        .el-select {
          margin-right: 10px;
        }
      }
      .el-input {
        margin-left: 10px;
      }
      .btn-wrap {
        display: inline-block;
        vertical-align: middle;
      }
      .delbtn {
        position: relative;
        display: inline-block;
        width: 23px;
        height: 23px;
        margin-top: 5px;
        margin-left: 10px;
        border: 1px solid #b10c79;
        border-radius: 50%;
        cursor: pointer;
        &:after {
          position: absolute;
          content: '';
          top: 11px;
          left: 6px;
          width: 10px;
          height: 1px;
          background-color: #b10c79;
        }
      }
      .addbtn {
        position: relative;
        display: inline-block;
        width: 23px;
        height: 23px;
        margin-top:5px;
        margin-left: 10px;
        border: 1px solid #b10c79;
        border-radius: 50%;
        cursor: pointer;
        &:after {
          position: absolute;
          content: '';
          top: 11px;
          left: 6px;
          width: 10px;
          height: 1px;
          background-color: #b10c79;
        }
        &:before {
          position: absolute;
          content: '';
          top: 11px;
          left: 6px;
          width: 10px;
          height: 1px;
          background-color: #b10c79;
          transform: rotate(90deg);
        }
      }
    }
    .specpeo-btn {
      color: #b10c79;
      cursor: pointer;
    }
    .specpeo-box {
      position: relative;
      padding: 10px;
      border: 1px solid #cccccc;
      background-color: #f4f4f4;
      .specpeo-box-close {
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
      .specpeo-item {
        position: relative;
        padding: 5px 0 5px 110px;
        & > span {
          position: absolute;
          top: 5px;
          left: 0;
          width: 100px;
          text-align: right;
        }
      }
      .specpeo-item1 {
        padding: 5px 0px;
      }
      .btn-wrap {
        display: inline-block;
        vertical-align: middle;
      }
      .delbtn {
        position: relative;
        display: inline-block;
        width: 23px;
        height: 23px;
        margin-top: 5px;
        margin-left: 10px;
        border: 1px solid #b10c79;
        border-radius: 50%;
        cursor: pointer;
        &:after {
          position: absolute;
          content: '';
          top: 11px;
          left: 6px;
          width: 10px;
          height: 1px;
          background-color: #b10c79;
        }
      }
      .addbtn {
        position: relative;
        display: inline-block;
        width: 23px;
        height: 23px;
        margin-top:5px;
        margin-left: 10px;
        border: 1px solid #b10c79;
        border-radius: 50%;
        cursor: pointer;
        &:after {
          position: absolute;
          content: '';
          top: 11px;
          left: 6px;
          width: 10px;
          height: 1px;
          background-color: #b10c79;
        }
        &:before {
          position: absolute;
          content: '';
          top: 11px;
          left: 6px;
          width: 10px;
          height: 1px;
          background-color: #b10c79;
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
