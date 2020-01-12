<template>
<!-- application\index\view\dev\src\components\plan\trip\trip-detail.vue -->
  <div class="wrapper trip-wrapper">
    <div class="system-content">
      <div class="mod-form">
        <h1 class="base-tit">
          {{ baseInfo.name }}
          <span class="base-line">{{ baseInfo.line_type }}</span>
          <el-popover
            v-if="Array.isArray(baseInfo.price_date_lists) && baseInfo.price_date_lists.length > 0"
            placement="left-start"
            title=""
            width="450"
            trigger="click">
            <a class="price_date_btn" href="javascript:;" slot="reference"><i class="el-icon-date"/>团期</a>
            <calendar :has-input="false" value="" :valid-dates="priceDateList" :width="420">
              <div v-for="date in baseInfo.price_date_lists" :slot="date.quotation_date" :key="date.id">
                <p class="price">&yen;{{ date.peer_price }}</p>
              </div>
            </calendar>
          </el-popover>
        </h1>
        <div class="title">基本信息</div>
        <div class="base-list">
          <div class="base-con" v-if="baseInfo.pull_org_name">
            <div class="base-pd">
              <div class="base-contit">产品提供者：</div>
              <div class="base-coninfo">{{ baseInfo.pull_org_name }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.from_org_name">
            <div class="base-pd">
              <div class="base-contit">供应商：</div>
              <div class="base-coninfo">{{ baseInfo.from_org_name }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.departure_city_name">
            <div class="base-pd">
              <div class="base-contit">出发地：</div>
              <div class="base-coninfo">{{ baseInfo.departure_city_name }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.assembing_time">
            <div class="base-pd">
              <div class="base-contit">集合时间：</div>
              <div class="base-coninfo">{{ baseInfo.assembing_time }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.destination_city_name">
            <div class="base-pd">
              <div class="base-contit">目的地：</div>
              <div class="base-coninfo">{{ baseInfo.destination_city_name }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.assembing_place">
            <div class="base-pd">
              <div class="base-contit">集合地点：</div>
              <div class="base-coninfo">{{ baseInfo.assembing_place }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.trip_days || baseInfo.trip_night">
            <div class="base-pd">
              <div class="base-contit">行程天数：</div>
              <div class="base-coninfo">
                {{ baseInfo.trip_days }}天
                <template v-if="baseInfo.trip_night != 0">{{ baseInfo.trip_night }}夜</template>
              </div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.category_name_1">
            <div class="base-pd">
              <div class="base-contit">行程类别：</div>
              <div class="base-coninfo">{{ baseInfo.category_name_1 }}<span v-if="baseInfo.category_name_2">></span>{{ baseInfo.category_name_2 }}<span v-if="baseInfo.category_name_3">></span>{{ baseInfo.category_name_3 }}</div>
            </div>
          </div>
          <div class="base-con">
            <div class="base-pd">
              <div class="base-contit">报名截止时间：</div>
              <div class="base-coninfo">出团前{{baseInfo.end_day_time || 0}}天，并于{{baseInfo.end_time || 0}}截止报名</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.departure_traffic_type_name">
            <div class="base-pd">
              <div class="base-contit">去程交通：</div>
              <div class="base-coninfo">
                <span>{{ baseInfo.departure_traffic_type_name }}</span>
                <span v-if="baseInfo.departure_traffic_content">({{ baseInfo.departure_traffic_content }})</span>
              </div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.seattime">
            <div class="base-pd">
              <div class="base-contit">占位有效时间：</div>
              <div class="base-coninfo">{{ baseInfo.seattime }}{{ baseInfo.seattime_type_name }}</div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.back_traffic_type_name">
            <div class="base-pd">
              <div class="base-contit">返程交通：</div>
              <div class="base-coninfo">
                <span>{{ baseInfo.back_traffic_type_name }}</span>
                <span v-if="baseInfo.back_traffic_content">({{ baseInfo.back_traffic_content }})</span>
              </div>
            </div>
          </div>
          <div class="base-con" v-if="baseInfo.operator_name">
            <div class="base-pd">
              <div class="base-contit">OP：</div>
              <div class="base-coninfo">{{ baseInfo.operator_name }}</div>
            </div>
          </div>
        </div>
        <div class="pc-wrapper pd20" v-show="baseInfo.trip_pic_url && baseInfo.trip_pic_url.length > 0">
          <div class="pc-item" v-for="(item, index) in baseInfo.trip_pic_url" :key="index" :style="`backgroundImage:url(${item})`">
            <a :href="item" target="_blank"/>
          </div>
        </div>
        <div v-show="product_type == '0' && Array.isArray(attachment_lists) && attachment_lists.length > 0">
          <div class="title">简易开团附件：</div>
          <ul class="easy-trip-doclist">
            <li v-for="(item, index) in attachment_lists" :key="index">
              <span><b class="doc-idx">{{ index + 1 }}.</b>{{ item.name }}<i class="doc-size">({{ item.size }})</i></span>
              <a class="doc-down" :href="item.path">下载</a>
            </li>
          </ul>
        </div>
        <div v-show="product_type == '1'">
          <div class="title" v-if="tripInfo && tripInfo.length > 0">行程内容</div>
          <div class="trip-detail-wrap tripday-wrapper" v-show="tripInfo && tripInfo.length > 0">
            <div class="trip-detail-inner" v-for="(item, index) in tripInfo" :key="index">
              <h2 class="trip-detail-tit">第{{ index + 1 }}天  {{ item.destination_name }}</h2>
              <div class="trip-detial-row-box" :class="nobefore(item)">
                <div class="trip-detail-row">
                  <i class="traffic-btn icon-eat"/>
                  <div class="trip-detail-itemtit">用餐</div>
                  <!-- <span>早餐{{item.eat_1 === 1 ? '包含' : '自理'}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>午餐{{item.eat_2 === 1 ? '包含' : '自理'}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>晚餐{{item.eat_3 === 1 ? '包含' : '自理'}}&nbsp;&nbsp;&nbsp;&nbsp;</span> -->
                  <span>早餐{{item.eat_str.split("_")[0] || '自理'}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>午餐{{item.eat_str.split("_")[1] || '自理'}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>晚餐{{item.eat_str.split("_")[2] || '自理'}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <!-- <span v-else>自理</span> -->
                </div>
                <div class="trip-detail-row" v-if="item.hotel_type_name">
                  <i class="traffic-btn icon-hotel"/>
                  <div class="trip-detail-itemtit">酒店</div>
                  <span v-if="item.hotel_type_name !='未知'">{{ item.hotel_type_name }}</span>
                  <span>{{ item.hotel_custom }}</span>
                  <!-- <span v-if="item.hotel_info && item.hotel_info.length > 0" class="hotel-tip">参考酒店：<span v-for="hotelinfo in item.hotel_info" :key="hotelinfo">{{ hotelinfo }}</span>或同等级酒店</span> -->
                </div>
                <div class="trip-detail-row" v-if="item.traffic">
                  <i class="traffic-btn icon-bus"/>
                  <div class="trip-detail-itemtit">交通</div>
                  <div>{{ item.traffic }}</div>
                </div>
                <div class="trip-detail-row" v-if="item.scenic_spots && item.scenic_spots.length > 0">
                  <i class="traffic-btn icon-scienic"/>
                  <div class="trip-detail-itemtit">景点</div>
                  <span v-for="(scenic, idx) in item.scenic_spots" :key="idx">
                    {{ scenic.scenic_spots }}
                    <span v-show="scenic.scenic_spots_time > 0">({{ (parseInt(scenic.scenic_spots_time) / 60).toFixed(1) }}小时)</span>
                    <i class="hotel-tip" v-show="idx != item.scenic_spots.length - 1">-></i>
                  </span>
                </div>
                <div class="trip-detail-row" v-if="item.trip_instruction">
                  <i class="traffic-btn icon-desc"/>
                  <div class="trip-detail-itemtit">行程说明</div>
                  <div v-html="item.trip_instruction"/>
                </div>
              </div>
              <div class="pc-wrapper" v-show="item.trip_pic_url && item.trip_pic_url.length > 0">
                <div class="pc-item" v-for="(pic, idx) in item.trip_pic_url" :key="idx" :style="`backgroundImage:url(${pic})`">
                  <a :href="pic" target="_blank"/>
                </div>
              </div>
            </div>
          </div>
          <div class="title" v-if="own_shopping && own_shopping.length > 0">自费购物</div>
          <div v-if="own_shopping && own_shopping.length > 0">
            <el-table
              :data="own_shopping"
              style="width: 100%"
              border
            >
              <el-table-column
                prop="name"
                label="自费购物名称"
                width="180"
                align="center"/>
              <el-table-column
                prop="stay_time"
                label="停留时间（分钟）"
                width="180"
                align="center"/>
              <el-table-column
                prop="project"
                label="经营项目"
                align="center"/>
            </el-table>
          </div>
          <div class="title" v-if="visa_info && visa_info.length > 0">签证信息</div>
          <div v-if="visa_info && visa_info.length > 0">
            <el-table
              :data="visa_info"
              style="width: 100%"
              border
            >
              <el-table-column
                prop="card_type"
                label="身份类型"
                width="180"
                align="center"/>
              <el-table-column
                prop="need_reference"
                label="需要提交材料"
                align="center"/>
              <el-table-column
                prop="instruction"
                label="详细说明"
                align="center"/>
            </el-table>
          </div>
          <div class="title clearfix" style="clear:both;" v-if="tripdesc.trip_features || tripdesc.fee_includes || tripdesc.cost_excludes || tripdesc.booking_info || tripdesc.safety_info || tripdesc.remark">说明</div>
          <div class="tip-tab-wrap" v-if="tripdesc.trip_features || tripdesc.fee_includes || tripdesc.cost_excludes || tripdesc.booking_info || tripdesc.safety_info || tripdesc.remark">
            <el-tabs v-model="activeName">
              <el-tab-pane v-if="tripdesc.trip_features" label="路线特色" name="1" v-html="tripdesc.trip_features"></el-tab-pane>
              <template v-if="tripdesc.fee_includes">
                <el-tab-pane v-if="tripdesc.fee_includes_type == 1" label="费用包含" name="2" v-html="tripdesc.fee_includes"/>
                <el-tab-pane v-else-if="tripdesc.fee_includes_type == 2" label="费用包含" name="2">
                  <el-table border :data="tripdesc.fee_includes">
                    <el-table-column label="费用项" header-align="center" width="250" prop="name"/>
                    <el-table-column label="描述" header-align="center" prop="describe"/>
                  </el-table>
                </el-tab-pane>
              </template>
              <template v-if="tripdesc.cost_excludes">
                <el-tab-pane v-if="tripdesc.cost_excludes_type == 1" label="费用不包含" name="3" v-html="tripdesc.cost_excludes"/>
                <el-tab-pane v-else-if="tripdesc.cost_excludes_type == 2" label="费用不包含" name="3">
                  <el-table border :data="tripdesc.cost_excludes">
                    <el-table-column label="费用项" header-align="center" width="250" prop="name"/>
                    <el-table-column label="描述" header-align="center" prop="describe"/>
                  </el-table>
                </el-tab-pane>
              </template>
              <el-tab-pane v-if="tripdesc.booking_info" label="预订须知" name="4" v-html="tripdesc.booking_info"/>
              <el-tab-pane v-if="tripdesc.safety_info" label="安全说明" name="5" v-html="tripdesc.safety_info"/>
              <el-tab-pane v-if="tripdesc.remark" label="备注" name="6" v-html="tripdesc.remark"/>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Bomdetail, saleBomdetail }from 'src/api/api';
import {saleSaleDetail} from 'src/api/api_store';
import {supplierProductDetail} from 'src/api/supplier'
import { selfSaleDetail } from 'src/api/product'
import Calendar from 'src/plugins/Calendar.vue';
export default {
  components:{
    calendar: Calendar
  },
  data() {
    return {
      product_id: this.$route.query.id,
      product_index_id:this.$route.query.product_index_id,
      product_type: '',
      order_no: this.$route.query.order_no,
      baseInfo: {},
      tripInfo: [],
      tripdesc: [],
      own_shopping: [],
      visa_info: [],
      attachment_lists: [],
      activeName: '1'
    };
  },
  computed: {
    name() {
      return this.$route && this.$route.name;
    },
    priceDateList() {
      if(this.baseInfo && Array.isArray(this.baseInfo.price_date_lists)){
        return this.baseInfo.price_date_lists.map(item => item.quotation_date);
      }else{
        return [];
      }
    }
  },
  methods: {
    Bomdetail() {
      let params = {
        data: {
          product_id: this.product_id,
          product_index_id:this.product_index_id,
          order_no: ''
        }
      };
      let BomdetailFunc;
      // if(this.topMenuConst == 'sale') {
      //   BomdetailFunc = saleBomdetail;
      // } else if(this.topMenuConst == 'store-sale') {
      //   BomdetailFunc = saleSaleDetail;
      // } else if (this.topMenuConst === 'supplier') {
      //   BomdetailFunc = supplierProductDetail
      // } else if (this.topMenuConst === 'distribution') {
      //   BomdetailFunc = selfSaleDetail
      // } else {
      //   BomdetailFunc = Bomdetail;
      // }
      if(this.name == 'sale') {
        BomdetailFunc = saleBomdetail;
      } else if(this.name == 'store-sale') {
        BomdetailFunc = saleSaleDetail;
      } else if (this.name === 'lineTripTripDetail') {
        BomdetailFunc = supplierProductDetail
      } else if (this.name === 'distribution') {
        BomdetailFunc = selfSaleDetail
      } else {
        BomdetailFunc = Bomdetail;
      }

      BomdetailFunc({
        params,
        success: ({data: resp}) => {
          const {code, data, msg} = resp;

          if (code === 0) {
            this.product_type = data.product_type;
            this.tripInfo = data.detail || [];
            this.tripdesc = data.instruction || [];
            this.own_shopping = data.own_shopping || [];
            this.visa_info = data.visa_info || [];
            this.attachment_lists = data.attachment;
            this.baseInfo = data;
            if(this.tripdesc.trip_features) {
              this.activeName = '1';
              return;
            };
            if(this.tripdesc.fee_includes) {
              this.activeName = '2';
              return;
            };
            if(this.tripdesc.cost_excludes) {
              this.activeName = '3';
              return;
            };
            if(this.tripdesc.booking_info) {
              this.activeName = '4';
              return;
            };
            if(this.tripdesc.safety_info) {
              this.activeName = '5';
              return;
            };
            if(this.tripdesc.remark) {
              this.activeName = '6';
              return;
            };
          } else {
            this.$message({
              message: msg,
              type: 'error'
            });
            this.$router.go(-1);
          }
        },
        showLoading: true
      });
    },
    nobefore (item) {
      let sum = 0
      if (item.eat_1 || item.eat_2 || item.eat_3) {
        sum = sum + 1
      }
      if (item.hotel_type_name) {
        sum = sum + 1
      }
      if (item.traffic) {
        sum = sum + 1
      }
      if (item.scenic_spots && item.scenic_spots.length > 0) {
        sum = sum + 1
      }
      if (item.trip_instruction) {
        sum = sum + 1
      }
      if (sum === 1) {
        return 'nobefore'
      }
    }
  },
  mounted() {
    this.Bomdetail();
  }
};
</script>
<style lang="less" scoped>
  .price_date_btn{
    color: #b10c79;
    float: right;
    font-size: 14px;
  }
  .trip-wrapper {
    .base-tit {
      font-size: 18px;
      color: #333333;
      .base-line {
        display: inline-block;
        padding: 5px 10px;
        background-color: #fbf3f8;
        color: #b10c79;
        font-size: 12px;
        border-radius: 5px;
      }
    }
    .base-list {
      width: 100%;
        font-size: 0;
      // .base-item {
      //   padding: 10px 0 0;
      // }
      .base-con {
        display: inline-block;
        padding: 10px 0 0;
        width: 50%;
        min-height: 28px;
        vertical-align: top;
      }
      .base-pd {
        position: relative;
        padding-left: 100px;
        font-size: 14px;
        line-height: 28px;
        .base-contit {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100px;
          text-align: right;
          color: #999999;
          min-height: 28px;
        }
        .base-coninfo {
          color: #333333;
          padding-left: 10px;
          // font-weight: bold;
          min-height: 28px;
        }
      }
    }
    .easy-trip-doclist {
      list-style: none;
      li {
        font-size: 14px;
        line-height: 28px;
        color: #333333;
        .doc-idx {
          padding-right: 10px;
        }
        .doc-size {
          font-size: 12px;
          color: #999999;
          font-style: normal;
          padding: 0 10px
        }
        .doc-down {
          color: #b10c79;
          padding-left: 40px;
        }
      }
    }
    .pc-wrapper.pd20 {
        width: auto;
        padding: 0 0 0 20px;
    }
    .pc-wrapper {
      width: 100%;
      margin-top: 30px;
      font-size: 0;
      .pc-item {
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 15px;
        width: 190px;
        height: 120px;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        &>a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .trip-detail-wrap {
      .trip-detail-inner {
        color: #333333;
        padding-left: 15px;
        .trip-detail-tit {
          font-size: 18px;
          color: #333333;
          margin-left: -15px;
        }
        .trip-detail-itemtit {
          font-size: 14px;
          color: #b10c79;
          margin-bottom: 10px;
        }
        .trip-detial-row-box {
          .trip-detail-row:first-child {
            margin: 20px 0 0 0;
            padding: 0px 0 0 50px;
            .traffic-btn {
              top: -5px;
            }
          }
          .trip-detail-row:last-child {
            border-left: 1px solid #fff;
            padding-bottom: 10px;
            &:before {
              content: '';
              position: absolute;
              top: -10px;
              left: -1px;
              width: 0.5px;
              height: 40px;
              background-color: #afafaf;
            }
          }
          &.nobefore {
            .trip-detail-row:last-child {
              &:before {
                width: 0px;
                height: 0px;
              }
           }
          }
        }
        .trip-detail-row {
          position: relative;
          padding: 20px 0 0 50px;
          border-left: 1px solid #afafaf;
          &.first {
            margin: 20px 0 0 0;
            padding: 0px 0 0 50px;
            .traffic-btn {
              top: -5px;
            }
          }
          &.last {
            border-left: 1px solid #fff;
            &:before {
              content: '';
              position: absolute;
              top: -10px;
              left: -1px;
              width: 0.5px;
              height: 75%;
              background-color: #afafaf;
            }
          }
          .traffic-btn {
            position: absolute;
            top: 15px;
            left: -15px;
          }
        }
        .eat-on {
          display: inline-block;
          width: 17px;
          height: 17px;
          border: 1px solid #afafaf;
          text-align: center;
          line-height: 17px;
          font-size: 12px;
          color: #fff;
          background-color: #b10c79;
        }
        .eat-off {
          display: inline-block;
          width: 17px;
          height: 17px;
          border: 1px solid #afafaf;
          text-align: center;
          line-height: 17px;
          font-size: 12px;
          color: #fff;
        }
        .hotel-tip {
          color: #999999;
          font-style: normal;
          &>span {
            padding-right: 15px;
          }
        }
      }
    }
    .tip-tab-wrap {
      border: 1px solid #cccccc;
      padding: 0 0 10px;
    }
  }
</style>
