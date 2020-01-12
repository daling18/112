<template>
  <div class="flight">
    <div class="filter">
      <div class="el-tabs el-tabs--border-card">
        <div class="el-tabs__header">
          <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav">
              <div class="el-tabs__item is-active">国内机票</div>
              <div
                v-if="$menuPermission('salecenter/flight/internation') && rescheduled.tag!='1'"
                class="el-tabs__item"
                @click="$router.push({ name: 'SalecenterFlightInternation'})"
              >国际机票</div>
            </div>
          </div>
        </div>
        <div class="el-tabs__content">
          <div class="system-search">
            <div class="hd">
              <el-radio class="radio" v-model="searchData.type" :label="1">单程</el-radio>
            </div>
            <div class="bd">
              <!-- <div class="search-panel">
              <el-radio class="radio" v-model="searchData.type" :label="1">单程</el-radio>-->
              <!-- <el-radio class="radio" v-model="searchData.type" :label="2">往返</el-radio> -->
              <!-- </div> -->
              <div class="search-panel search-citycode">
                <div class="search-item">
                  <div class="label">出发城市</div>
                  <airport-icao-picker v-model="searchData.departCityCode" :disabled="rescheduled.tag==1"></airport-icao-picker>
                </div>
                <div class="search-item">
                  <div class="label">到达城市</div>
                  <airport-icao-picker v-model="searchData.arriveCityCode" :disabled="rescheduled.tag==1"></airport-icao-picker>
                </div>
                <div class="exchange" @click="exchangeCityCode()"></div>
                <div class="search-item last-item">
                  <span>舱位</span>
                  <el-select v-model="searchData.seat_type" placeholder="请选择">
                    <el-option label="不限" value></el-option>
                    <el-option label="经济舱" value="1"></el-option>
                    <el-option label="公务舱" value="2"></el-option>
                    <el-option label="头等舱" value="4"></el-option>
                    <el-option label="超级经济舱" value="7"></el-option>
                  </el-select>
                </div>
                <!-- <el-checkbox v-model="searchData.child_quantity" >携带儿童2~12岁</el-checkbox>
                                <el-popover
                                  placement="right"
                                  width="400"
                                  trigger="click"
                                  >
                                  <h2 class="child-destine-title">儿童票说明</h2>
                                  <div class="child-destine-details">
                                    <div class="details-title">儿童票(2-12周岁，含2周岁)</div>
                                    <div>儿童票价格:航线标准价的50%，不收机建费，燃油费为成人的50%</div> 
                                    <div>1.儿童须由成人陪同登机。儿童如单独乘机，需直接至航空公司柜台
                                  申请购买机票</div>
                                    <div>2.儿童购票可用证件:身份证、护照、户口簿、出生证明等</div>
                                    <div>3.成人儿童必须购买同-舱等的机票</div>
                                    <div>4.儿童购票可同时购买1份航意险</div>
                                    <div>5.部分成人价格允许儿童购买，根据航空公司公布的成人价格政策确定儿童是否允许购买成人票。</div>
                                  </div>
                                  <el-button type="text" class="child-destine-bt" slot="reference">儿童预定说明!</el-button>
                </el-popover>-->
              </div>
              <div class="search-panel">
                <div class="search-item">
                  <div class="label">出发日期</div>
                  <el-date-picker
                    v-model="searchData.startDate"
                    :picker-options="datepickerOptions1"
                    @change="changeStartDate"
                    type="date"
                    placeholder="出发日期"
                  ></el-date-picker>
                </div>
                <div class="search-item">
                  <div class="label">返程日期</div>
                  <el-date-picker
                    v-model="searchData.backDate"
                    :picker-options="datepickerOptions2"
                    type="date"
                    :disabled="isOneWay"
                    placeholder="返程日期"
                  ></el-date-picker>
                </div>
              </div>
              <div class="search-panel search-submit">
                <el-button type="primary" @click="searchSubmit()">立即搜索</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <div v-if="flightList" class="flight-grid">
      <div v-if="flight_back" class="remind">
        <!-- <span>去程</span> -->
        <h3
          class="remind-item"
        >{{roudTrip_msg.depart_airport_name}}{{roudTrip_msg.depart_airport_terminal}}————{{roudTrip_msg.arrive_airport_name}}{{roudTrip_msg.arrive_airport_terminal}}</h3>
        <span>航班</span>
        <h3 class="remind-item">{{roudTrip_msg.airline_company}}{{roudTrip_msg.flight_no}}</h3>
        <span>出发日期</span>
        <span class="remind-item">{{roudTrip_msg.depart_date}}</span>
        <span>起降日期</span>
        <span class="remind-item">{{roudTrip_msg.depart_time}} -- {{roudTrip_msg.arrive_time}}</span>
      </div>
      <div class="remind">
        <div>重要提示：</div>
        <div>
          <div class="remid-text">1、以下票面价不含保险费、机场建设费、燃油附加税。</div>
          <div>2、航班价格变动频繁，请您预订后仔细核对信息并在5分钟内完成支付，以免座位被取消或价格发生变化。订单是否占座成功，以支付后状态为准。</div>
        </div>
      </div>
      <div class="clearfix picker-date-box">
        <div class="left left-box">
          <div class="left icon prev" @click="prevDate"></div>
          <div class="left list">
            <div class="inner">
              <ul class="clearfix" ref="dateList" :style="{width: dateListWidth}">
                <li
                  class="left"
                  v-for="(item, index) in currentDateRang"
                  :key="index"
                  :class="{ activeli: item.depart_date === searchData.startDate }"
                  @click="onChangeDepartDate(item.depart_date)"
                >
                  <p class="week">{{ item.week }}</p>
                  <div class="con">
                    <p class="date">{{ item.depart_date }}</p>
                    <p class="price">￥{{ item.price }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="left icon next" @click="nextDate"></div>
        </div>
        <div class="right right-box">
          <div class="icon-box" @click.stop="isShowCalendar = !isShowCalendar">
            <div class="icon">
              <img src="../../assets/calendar.png" alt>
            </div>
            <div>低价日历</div>
          </div>
          <div class="calendar-box" v-show="isShowCalendar">
            <calendar ref="calendars" @confirm="changeDate" :selectedDate="dateDepart_date"></calendar>
          </div>
        </div>
      </div>
      <div class="selecte-infor">
        <div class="left">
          <el-select
            :disabled="rescheduled.tag==1"
            v-model="selected_infor.select_airline_company"
            clearable
            placeholder="航空公司"
            @change="selectCompany"
          >
            <el-option
              v-for="item in airline_companys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            :disabled="rescheduled.tag==1"
            v-model="selected_infor.depart_date_type"
            clearable
            placeholder="起飞时段"
            @change="selectDepartDataType"
          >
            <el-option label="上午(6至12点)" value="1"></el-option>
            <el-option label="下午(12至18点)" value="2"></el-option>
            <el-option label="晚上(18至24点)" value="3"></el-option>
          </el-select>
          <el-checkbox v-model="selected_infor.stop_infos" @change="selectStop" :disabled="rescheduled.tag==1">直飞</el-checkbox>
        </div>
        <div class="right">
          <span v-if="flight_back">选择去程</span>
          <span>{{selected_infor.depart_date}}</span>
          <span class="right-item">周{{ selected_infor.week | weekFilter}}</span>
          <span class="right-item">{{selected_infor.depart_name}}—{{selected_infor.arrive_name}}</span>
          <span class="right-item">共{{selected_infor.airline_num}}个航班信息</span>
        </div>
      </div>
      <div class="flight-grid-header">
        <div class="iatainfo">航班</div>
        <div class="departure">
          <span
            class="sort"
            :class="{'active': orderType == 'depart_time' }"
            @click="setFlightListOrder('depart_time')"
          >
            出发时间
            <i
              class="fa"
              :class="{'fa-sort': orderType != 'depart_time', 'fa-caret-up': order == 1 && orderType == 'depart_time', 'fa-caret-down': order == 2 && orderType == 'depart_time'}"
              aria-hidden="true"
            ></i>
          </span>
        </div>
        <div class="direction"></div>
        <div class="arrival">
          <span
            class="sort"
            :class="{'active': orderType == 'arrive_time' }"
            @click="setFlightListOrder('arrive_time')"
          >
            到达时间
            <i
              class="fa"
              :class="{'fa-sort': orderType != 'arrive_time', 'fa-caret-up': order == 1 && orderType == 'arrive_time', 'fa-caret-down': order == 2 && orderType == 'arrive_time'}"
              aria-hidden="true"
            ></i>
          </span>
        </div>
        <div class="other"></div>
        <div class="market" v-if="rescheduled.tag != '1'">销售价</div>
        <div class="price" v-if="rescheduled.tag != '1'">
          <span
            class="sort"
            :class="{'active': orderType == 'adult_base_fare' }"
            @click="setFlightListOrder('adult_base_fare')"
          >
            结算价
            <i
              class="fa"
              :class="{'fa-sort': orderType != 'adult_base_fare', 'fa-caret-up': order == 1 && orderType == 'adult_base_fare', 'fa-caret-down': order == 2 && orderType == 'adult_base_fare'}"
              aria-hidden="true"
            ></i>
          </span>
        </div>
        <div class="operate"></div>
      </div>
      <div class="flight-grid-content">
        <template v-for="(flight, flightIndex) in flightList">
          <div class="flight-grid-item" :key="flightIndex">
            <div class="info-row">
              <div class="iatainfo">
                <p class="name">{{flight.journey_segment_list[0].airline_company}}</p>
                <p
                  class="flightno"
                >{{flight.journey_segment_list[0].flight_no}} {{flight.journey_segment_list[0].craft_type}}</p>
                <el-popover
                  v-if="flight.journey_segment_list[0].is_share"
                  placement="right"
                  trigger="hover"
                  :content="flight.journey_segment_list[0].share_airline_name + flight.journey_segment_list[0].share_flight_no"
                >
                  <span class="share">共享</span>
                </el-popover>
              </div>
              <div class="departure">
                <p class="time">{{flight.journey_segment_list[0].depart_time}}</p>
                <p
                  class="airport"
                >{{flight.journey_segment_list[0].depart_airport_name}} {{flight.journey_segment_list[0].depart_airport_terminal}}</p>
              </div>
              <div class="direction">
                <span
                  class="toaltime"
                >{{flight.journey_segment_list[0].duration.split(':')[0] + "小时" + flight.journey_segment_list[0].duration.split(':')[1] + "分钟"}}</span>
                <span class="arrows"></span>
                <el-popover
                  v-if="flight.journey_segment_list[0].stop_num"
                  placement="right"
                  trigger="hover"
                  @show="getByFlightStopDetail(flight.journey_segment_list[0].flight_no,flight.journey_segment_list[0].depart_date,flightIndex)"
                >
                  <table class="flight-info-table">
                    <thead>
                      <tr>
                        <th>出发地</th>
                        <th>出发时间</th>
                        <th>经停地</th>
                        <th>停留时间</th>
                        <th>抵达地</th>
                        <th>抵达时间</th>
                      </tr>
                    </thead>
                    <tbody v-if="flight.journey_segment_list[0].stop_point_list">
                      <template>
                        <tr>
                          <td>{{flight.journey_segment_list[0].stop_point_list.stop_infos[0].city_name}}</td>
                          <td>{{flight.journey_segment_list[0].stop_point_list.stop_infos[0].dep_time}}</td>
                          <td>{{flight.journey_segment_list[0].stop_point_list.stop_infos[1].city_name}}</td>
                          <td>{{flight.journey_segment_list[0].stop_point_list.stop_infos[1].arri_time}} - {{flight.journey_segment_list[0].stop_point_list.stop_infos[1].dep_time}}</td>
                          <td>{{flight.journey_segment_list[0].stop_point_list.stop_infos[2].city_name}}</td>
                          <td>{{flight.journey_segment_list[0].stop_point_list.stop_infos[2].arri_time}}</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                  <span class="isstop" slot="reference">经停</span>
                </el-popover>
              </div>
              <div class="arrival">
                <p class="time">
                  {{flight.journey_segment_list[0].arrive_time}}
                  <span
                    v-if="Math.floor((new Date(flight.journey_segment_list[0].arrive_date) - new Date(flight.journey_segment_list[0].depart_date))/86400000)"
                    class="days"
                  >+{{Math.floor((new Date(flight.journey_segment_list[0].arrive_date) - new Date(flight.journey_segment_list[0].depart_date))/86400000)}}</span>
                </p>
                <p
                  class="airport"
                >{{flight.journey_segment_list[0].arrive_airport_name}} {{flight.journey_segment_list[0].arrive_airport_terminal}}</p>
              </div>
              <div class="other">
                <span class="other-name">餐食</span>
                <p class="other-info">{{flight.journey_segment_list[0].meal ? "有餐" : "无餐"}}</p>
              </div>
              <div class="market" v-if="rescheduled.tag != '1'">
                <i>￥</i>
                {{flight.journey_price_list[0].adult_price}}
                <span
                  class="discount"
                >({{flight.journey_price_list[0].adult_discount>=1?"全价":(flight.journey_price_list[0].adult_discount * 10).toFixed(1)+'折'}})</span>
              </div>
              <div class="price" v-if="rescheduled.tag != '1'">
                <i>￥</i>
                {{flight.journey_price_list[0].adult_base_fare}}
              </div>
              <div class="operate"></div>
            </div>
            <div>
              <template v-for="(price, priceIndex) in flight.journey_price_list">
                <div
                  class="price-row"
                  v-show="priceIndex < 3"
                  :class="priceIndex>2?'flight-price-row-'+flightIndex:''"
                  :key="priceIndex"
                >
                  <div
                    class="cabin"
                  >{{price.cabin_list[0].seat_type}}({{ price.cabin_list[0].cabin_code }})</div>
                  <!-- <div class="bill">{{price.cabin_list[0].bill_type_name}}</div> -->
                  <div class="rule">
                    <el-popover
                      placement="right"
                      width="400"
                      trigger="hover"
                      @show="getByFlightRefund(price.price_id,price.cabin_list[0].cabin_id,flightIndex,priceIndex)"
                    >
                      <div class="flight-seat-list">
                        <template v-if="price.refunds">
                          <table>
                            <tr
                              v-for="(refund, refundKey) in price.refunds.rule_infos"
                              :key="refundKey"
                            >
                              <td>{{refund.rule_name}}</td>
                              <td>
                                <p>{{refund.rule_remark}}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>赠送行李额</td>
                              <td>{{flightList[flightIndex].journey_price_list[priceIndex].refunds.free_luggage}}</td>
                            </tr>
                          </table>
                          <p>*以上机票退改签费用仅供参考，以实际订单为准</p>
                        </template>
                      </div>
                      <span slot="reference">退改签规则及行李说明</span>
                    </el-popover>
                  </div>
                  <!-- <div class="limit">
                                      <template v-if="price.sale_control.applicable_traveler_category && price.sale_control.applicable_traveler_category != '1,2'">
                                          <el-popover placement="right" trigger="hover" :content="price.sale_control.applicable_traveler_category=='1'?'仅限购买成人票':'仅限购买儿童票'">
                                              <span class="limit" slot="reference">限</span>
                                          </el-popover>
                                      </template>
                                      <template v-if="price.sale_control.acceptable_idcard_type && price.sale_control.applicable_traveler_category != '1,2'">
                                          <el-popover placement="right" trigger="hover" :content="price.sale_control.acceptable_idcard_type">
                                              <span class="limit" slot="reference">限证件</span>
                                          </el-popover>
                                      </template>
                  </div>-->
                  <div class="market" v-if="rescheduled.tag != '1'">
                    <div>
                      <i>￥</i>
                      {{price.adult_price}}
                      <span
                        class="discount"
                      >({{price.adult_discount>=1?"全价":(price.adult_discount * 10).toFixed(1)+'折'}})</span>
                    </div>
                    <!-- <div class="market_child">
                                      <span>儿童:</span><i>￥</i>{{price.child_price}}
                    </div>-->
                  </div>
                  <div class="price" v-if="rescheduled.tag != '1'">
                    <i>￥</i>
                    {{price.adult_base_fare}}
                  </div>
                  <div class="operate" v-if="rescheduled.tag != '1'">
                    <el-button
                      v-if="flight_back"
                      type="primary"
                      @click="selectBack(flightIndex,priceIndex)"
                    >选为去程</el-button>
                    <div v-else class="reserve_box">
                      <router-link
                        v-if="$menuPermission('salecenter/flight/inland')"
                        class="reserve"
                        :to="{ name: 'SalecenterFlightInlandCheckout', query: { typeName: 'inland', priceId: price.price_id  }}"
                      >预定</router-link>
                    </div>
                    <span class="surplus">
                      剩
                      <i>{{price.cabin_list[0].seat_status.replace(/\>/, '')}}</i> 座
                    </span>
                  </div>
                  <div class="operate" v-else>
                    <div class="reserve_box">
                      <router-link
                        class="reserve"
                        :to="{ name: 'FlightSaleOrderDetail', query: { order_id:rescheduled.order_id , price_id:price.price_id, tag: '1',journey_id:price.journey_id,seat_type: price.cabin_list[0].seat_type,index:rescheduled.indexs}}"
                      >改期</router-link>
                    </div>
                    <span class="surplus">
                      剩
                      <i>{{price.cabin_list[0].seat_status.replace(/\>/, '')}}</i> 座
                    </span>
                  </div>
                </div>
              </template>
              <div
                v-if="flight.journey_price_list.length > 3"
                @click="showMorePrice(flightIndex)"
                class="show-more"
              >
                更多舱位
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <p v-else class="flight-tips">暂无航班信息</p>
  </div>
</template>

<script>
import * as format from "src/utils/format";
import { getCalendarDate } from "src/utils/format";
import * as dom from "src/utils/dom";
import calendar from "./components/calendar.vue";
import {
  getInlandFlightSpecial,
  getInlandFlight,
  getInlandFlightRefund,
  getInlandFlightStopDetail,
  getInlandCalandarDate
} from "src/api/flight";
import airportIcaoPicker from "./components/AirportIcaoPicker/index.vue";

const today = new Date();

export default {
  name: "inland",
  data() {
    return {
      searchData: {
        type: Number(this.$route.query.type) || 1,
        departCityCode: this.$route.query.departCityCode || "",
        arriveCityCode: this.$route.query.arriveCityCode || "",
        startDate: this.$route.query.startDate || format.date(today),
        depart_date2: "",
        backDate: this.$route.query.backDate || "",
        child_quantity: 0,
        seat_type: "",
        airline_company: "",
        depart_date_type: "",
        stop_num: "" //0直飞
      },
      datepickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      flightList: null,
      oldflightList: null,
      newFlightList: null,
      flightDetails: false,
      orderType: "",
      order: null,
      flight_back: null,
      roudTrip_msg: [],
      airline_companys: [],
      selected_infor: {
        select_airline_company: "",
        select_airline_departData: "",
        stop_infos: "",
        depart_name: "",
        arrive_name: "",
        depart_date: "",
        depart_date_type: "",
        week: ""
      },
      IsqueryCompany: true,
      selectChangeData: null, //低价日历
      isShowCalendar: false,
      dateListWidth: "100%",
      dateDepart_date: "",
      currentDateRang: [],
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      rescheduled: {
        tag: false, //用来判断来源路径，1：改期
        order_id: "", //传递过来的订单ID
        indexs:'',//标记
        airline_company:''//航司
      }
    };
  },
  computed: {
    isOneWay() {
      return this.searchData.type == 1 ? true : false;
    },
    datepickerOptions2() {
      let startDate = this.searchData.startDate;
      return {
        disabledDate(time) {
          return time.getTime() < new Date(startDate).getTime();
        }
      };
    }
  },
  components: {
    airportIcaoPicker,
    calendar
  },
  watch: {
    $route() {
      this.IsqueryCompany = true;
      this.searchFlightList();
    },
    orderType() {
      this.flightListOrderHandler();
    },
    order() {
      this.flightListOrderHandler();
    },
    flightList() {
      return this.flightList;
    }
  },
  filters: {
    weekFilter(value) {
      switch (value) {
        case 0:
          return "日";
          break;
        case 1:
          return "一";
          break;
        case 2:
          return "二";
          break;
        case 3:
          return "三";
          break;
        case 4:
          return "四";
          break;
        case 5:
          return "五";
          break;
        case 6:
          return "六";
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.searchFlightList();
    this.rescheduled.tag = this.$route.query.tag;
    this.rescheduled.order_id = this.$route.query.order_id;
    this.rescheduled.indexs = this.$route.query.index;
    this.rescheduled.airline_company = this.$route.query.airline_company;
    let _this = this;
    // document.body.onclick = function() {
    //   if (!_this.isShowCalendar) return
    //   _this.isShowCalendar = false;
    // }
  },
  methods: {
    // 选择日期
    onChangeDepartDate(date) {
      let changeDate = new Date(format.date(date)).getTime(),
        currentDate = new Date(
          format.date(this.searchData.startDate)
        ).getTime(),
        todayDate = new Date(format.date(new Date())).getTime();
      if (changeDate < todayDate) {
        return this.$message.warning("不能小于当前时间");
      }
      if (changeDate === currentDate) return;
      this.currentDateRang = [{}, {}, {}, {}, {}, {}, {}];
      this.searchData.startDate = date;
      this.searchFlightList(this.searchData,true);
    },
    prevDate() {
      this._setDate("prev");
    },
    nextDate() {
      this._setDate("next");
    },
    _setDate(flag) {
      let targetTimer = new Date(this.searchData.startDate).getTime();
      let dateTime;
      flag === "prev"
        ? (dateTime = targetTimer - 3600000 * 24)
        : (dateTime = targetTimer + 3600000 * 24);
      if (
        dateTime < Date.now() &&
        this.searchData.startDate <= getCalendarDate()
      )
        return this.$message.warning("不能小于当前时间");
      this.searchData.startDate = getCalendarDate(dateTime);
      this.searchFlightList(this.searchData);
    },
    changeDate(date) {
      //低价日历
      this.searchData.startDate = date;
      this.searchFlightList(this.searchData,true);
    },
    _getDatesRange(startDate) {
      let sevenDays = 1000 * 3600 * 24 * 7;
      let dep = new Date(new Date(startDate).getTime() - sevenDays);
      let arrive = new Date(new Date(startDate).getTime() + sevenDays);
      let depDate = `${dep.getFullYear()}-${
        dep.getMonth() + 1 < 10
          ? "0" + (dep.getMonth() + 1)
          : dep.getMonth() + 1
      }-${
        dep.getDate() + 1 < 10 ? "0" + (dep.getDate() + 1) : dep.getDate() + 1
      }`;
      let arrDate = `${arrive.getFullYear()}-${
        arrive.getMonth() + 1 < 10
          ? "0" + (arrive.getMonth() + 1)
          : arrive.getMonth() + 1
      }-${arrive.getDate() < 10 ? "0" + arrive.getDate() : arrive.getDate()}`;

      return { depart_date: depDate, depart_date2: arrDate };
    },
    selectStop() {
      this.IsqueryCompany = false;
      this.searchData.stop_num =
        this.selected_infor.stop_infos == true ? 0 : "";
      this.searchFlightList(this.searchData);
    },
    selectCompany(company) {
      this.IsqueryCompany = false;
      this.searchData.airline_company = company;
      this.searchFlightList(this.searchData);
    },
    selectDepartDataType(data) {
      this.IsqueryCompany = false;
      this.searchData.depart_date_type = data;
      this.searchFlightList(this.searchData);
    },
    dePartData(data) {
      switch (data) {
        case "1":
          this.flightList = this.oldflightList.filter(item => {
            let departTime = item.journey_segment_list[0].depart_time.slice(
              0,
              2
            );
            return departTime >= 6 && departTime < 12;
          });
          break;
        case "2":
          this.flightList = this.oldflightList.filter(item => {
            let departTime = item.journey_segment_list[0].depart_time.slice(
              0,
              2
            );
            return departTime >= 12 && departTime <= 18;
          });
          break;
        case "3":
          this.flightList = this.oldflightList.filter(item => {
            let departTime = item.journey_segment_list[0].depart_time.slice(
              0,
              2
            );
            return departTime >= 18 && departTime < 24;
          });
          break;
        default:
          this.flightList = this.oldflightList;
          break;
      }
    },
    selectBack(flightIndex, priceIndex) {
      this.flight_back = true;
      let departMes = {
        airline_company: this.flightList[flightIndex].journey_segment_list[0]
          .airline_company,
        flight_no:
          this.flightList[flightIndex].journey_segment_list[0].flight_no +
          " " +
          this.flightList[flightIndex].journey_segment_list[0].craft_type,
        depart_airport_name: this.flightList[flightIndex]
          .journey_segment_list[0].depart_airport_name,
        depart_airport_terminal: this.flightList[flightIndex]
          .journey_segment_list[0].depart_airport_terminal,
        arrive_airport_name: this.flightList[flightIndex]
          .journey_segment_list[0].arrive_airport_name,
        arrive_airport_terminal: this.flightList[flightIndex]
          .journey_segment_list[0].arrive_airport_terminal,
        depart_date: this.flightList[flightIndex].journey_segment_list[0]
          .depart_date,
        depart_time: this.flightList[flightIndex].journey_segment_list[0]
          .depart_time,
        arrive_time: this.flightList[flightIndex].journey_segment_list[0]
          .arrive_time
      };
      this.roudTrip_msg = departMes;

      let backSearchData = {
        type: this.searchData.type,
        arriveCityCode: this.searchData.departCityCode,
        departCityCode: this.searchData.arriveCityCode,
        startDate: format.date(this.searchData.backDate),
        seat_type: this.searchData.seat_type,
        child_quantity: this.searchData.child_quantity,
        depart_date_type: this.selected_infor.depart_date_type
      };
      this.$router.push({ path: this.$route.path, query: backSearchData });
    },
    searchSubmit() {
      // this.flight_back = this.searchData.type == 1 ? true : false;
      let searchData = {};
      this.IsqueryCompany = true;
      if (!this.searchData.departCityCode) {
        this.$alert("请选择出发城市", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      }

      if (!this.searchData.arriveCityCode) {
        this.$alert("请选择到达城市", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      }

      if (!this.searchData.startDate) {
        this.$alert("请选择出发日期", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      }

      if (this.searchData.type != 1 && !this.searchData.backDate) {
        this.$alert("请选择返程日期", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      }
      searchData = JSON.parse(JSON.stringify(this.searchData));
      searchData.startDate = format.date(searchData.startDate);
      this.searchData.startDate = searchData.startDate;
      if (!this.isOneWay) {
        searchData.backDate = format.date(searchData.backDate);
      } else {
        delete searchData.backDate;
      }
      searchData.time = new Date().getTime();
      if (this.rescheduled.airline_company) {
        searchData.airline_company = this.rescheduled.airline_company
      }
      this.$router.push({ path: this.$route.path, query: searchData });
    },
    exchangeCityCode() {
      if (this.rescheduled.tag==1) {
        return
      }
      let tmp = "";
      tmp = this.searchData.arriveCityCode;
      this.searchData.arriveCityCode = this.searchData.departCityCode;
      this.searchData.departCityCode = tmp;
    },
    changeStartDate(date) {
      if (this.searchData.type == 1) return;
      let start = new Date(date).getTime();
      this.$set(this.searchData, "backDate", start + 8.64e7 * 2);
    },
    changeSevenDate(date) {
      let sevenDays = 1000 * 3600 * 24 * 7,
        dep = new Date(new Date(date).getTime() - sevenDays),
        arrive = new Date(new Date(date).getTime() + sevenDays),
        depDate = `${dep.getFullYear()}-${
          dep.getMonth() + 1 < 10
            ? "0" + (dep.getMonth() + 1)
            : dep.getMonth() + 1
        }-${
          dep.getDate() + 1 < 10 ? "0" + (dep.getDate() + 1) : dep.getDate() + 1
        }`,
        arrDate = `${arrive.getFullYear()}-${
          arrive.getMonth() + 1 < 10
            ? "0" + (arrive.getMonth() + 1)
            : arrive.getMonth() + 1
        }-${arrive.getDate() < 10 ? "0" + arrive.getDate() : arrive.getDate()}`;
      return { depDate, arrDate };
    },
    searchFlightList(backSearchData,flag) {
      let params = {
          data: {}
        },
        query;
      if (arguments.length) {
        query = backSearchData;
        let { arrDate, depDate } = this.changeSevenDate(query["startDate"]);
        console.log(arrDate, depDate);

        params["data"]["arrive_airport_code"] = backSearchData.arriveCityCode;
        params["data"]["depart_airport_code"] = backSearchData.departCityCode;
        params["data"]["depart_date"] = backSearchData.startDate;
        params["data"]["seat_type"] = backSearchData.seat_type;
        // params['data']['child_quantity'] = backSearchData.child_quantity;
        params["data"]["depart_date_type"] = backSearchData.depart_date_type;
        if (flag) {
          params["data"]["airline_company"] = this.$route.query["airline_company"];          
        }else{
          params["data"]["airline_company"] = backSearchData.airline_company;
        }
        params["data"]["stop_num"] = backSearchData.stop_num;

        this.dateDepart_date = backSearchData.startDate;
      } else {
        query = this.$route.query;

        if (!Object.keys(query).length) return;
        console.log(query, "query");

        let { arrDate, depDate } = this.changeSevenDate(query["startDate"]);
        console.log(arrDate, depDate);

        params["data"]["arrive_airport_code"] = query["arriveCityCode"];
        params["data"]["depart_date"] = query["startDate"];
        params["data"]["depart_airport_code"] = query["departCityCode"];
        params["data"]["seat_type"] = query["seat_type"];
        // params['data']['child_quantity'] = query['child_quantity'];
        params["data"][
          "depart_date_type"
        ] = this.selected_infor.depart_date_type;
        params["data"]["stop_num"] =
          this.selected_infor.stop_infos == true ? 0 : "";
        params["data"]["airline_company"] = query["airline_company"];
        this.dateDepart_date = query["startDate"];
      }
      getInlandFlight({
        params: params,
        success: res => {
          let { code, data, msg } = res["data"];
          if (code == 0) {
            this.flightList = this.oldflightList = data;
            this.selected_infor.depart_name = this.flightList[0].journey_segment_list[0].depart_city_name;
            this.selected_infor.arrive_name = this.flightList[0].journey_segment_list[0].arrive_city_name;
            this.selected_infor.airline_num = this.flightList.length;
            this.selected_infor.depart_date = this.flightList[0].journey_segment_list[0].depart_date;
            let week = new Date(this.selected_infor.depart_date);
            let day = week.getDay();
            this.selected_infor.week = day;
            if (this.IsqueryCompany) {
              let companys = [];
              this.flightList.forEach(item => {
                let obj = {};
                obj.value = obj.label =
                  item.journey_segment_list[0].airline_company;
                companys.push(obj);
                this.airline_companys = this.airlineSelectSort(companys);
              });

              let { searchData, weeks } = this;
              let { arrDate, depDate } = this.changeSevenDate(
                searchData.startDate
              );

              getInlandCalandarDate({
                params: {
                  data: {
                    arrive_airport_code:
                      searchData.arrive_airport_code ||
                      searchData.departCityCode,
                    depart_airport_code:
                      searchData.depart_airport_code ||
                      searchData.arriveCityCode,
                    depart_date: depDate,
                    depart_date2: arrDate
                  }
                },
                success: res => {
                  let list = res["data"].data;
                  list.forEach(item => {
                    item.week = weeks[new Date(item.depart_date).getDay()];
                    item.groupDate = item.depart_date;
                  });
                  this.$refs.calendars.setList(list);
                  this.currentDateRang = list;
                  let dataIndex = list.findIndex(
                    item =>
                      item.depart_date === format.date(searchData.startDate)
                  );

                  this.currentDateRang = list.splice(dataIndex - 3, 7);
                }
              });
            }
          } else {
            this.flightList = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    airlineSelectSort(arr) {
      let hash = {};
      return arr.reduce((preVal, curVal) => {
        hash[curVal.value]
          ? ""
          : (hash[curVal.value] = true && preVal.push(curVal));
        return preVal;
      }, []);
    },
    getByFlightRefund(priceId, cabinId, flightIndex, priceIndex) {
      let params = {
          data: {
            price_id: priceId,
            cabin_id: cabinId
          }
        },
        flight = this.flightList[flightIndex];

      if (flight.journey_price_list[priceIndex].refunds) return;

      getInlandFlightRefund({
        params: params,
        success: params => {
          let { data } = params["data"];
          flight.journey_price_list[priceIndex].refunds = data;
          this.$set(this.flightList, flightIndex, flight);
        }
      });
    },
    getByFlightStopDetail(flight_no, depart_date, flightIndex) {
      let params = {
        data: {
          flight_no: flight_no,
          depart_date: depart_date
        }
      };

      if (this.flightList[flightIndex].journey_segment_list[0].stop_point_list)
        return;
      getInlandFlightStopDetail({
        params: params,
        success: params => {
          let { data } = params["data"];
          this.$set(
            this.flightList[flightIndex].journey_segment_list[0],
            "stop_point_list",
            data
          );
        }
      });
    },
    showMorePrice(index) {
      let flightPrice = document.querySelectorAll(".flight-price-row-" + index),
        angle = flightPrice[0].parentNode.querySelector(".fa");

      if (flightPrice[0].style.display == "none") {
        Array.prototype.map.call(flightPrice, i => (i.style.display = ""));
        angle.classList.add("fa-angle-up");
        angle.classList.remove("fa-angle-down");
      } else {
        Array.prototype.map.call(flightPrice, i => (i.style.display = "none"));
        angle.classList.add("fa-angle-down");
        angle.classList.remove("fa-angle-up");
      }
    },
    setFlightListOrder(orderType) {
      if (this.orderType != orderType) {
        this.orderType = orderType;
        this.order = 1;
        return true;
      }
      if (this.order == null || this.order == 2) {
        this.order = 1;
      } else {
        this.order = 2;
      }
    },
    flightListOrderHandler() {
      let orderType = this.orderType,
        order = this.order;

      switch (orderType) {
        case "depart_time":
        case "arrive_time":
          this.orderByFlightTime(orderType, order);
          break;
        case "adult_base_fare":
          this.orderByFlightPrice(order);
          break;
      }
    },
    orderByFlightTime(orderType, order) {
      this.flightList.sort(function(flight1, flight2) {
        let date = "",
          _date = "";

        switch (orderType) {
          case "depart_time":
            date =
              flight1["journey_segment_list"][0]["depart_date"] +
              " " +
              flight1["journey_segment_list"][0]["depart_time"];
            _date =
              flight2["journey_segment_list"][0]["depart_date"] +
              " " +
              flight2["journey_segment_list"][0]["depart_time"];
            break;
          case "arrive_time":
            date =
              flight1["journey_segment_list"][0]["arrive_date"] +
              " " +
              flight1["journey_segment_list"][0]["arrive_time"];
            _date =
              flight2["journey_segment_list"][0]["arrive_date"] +
              " " +
              flight2["journey_segment_list"][0]["arrive_time"];
            break;
        }
        if (order == 1) {
          return new Date(date) - new Date(_date);
        } else {
          return -(new Date(date) - new Date(_date));
        }
      });
    },
    orderByFlightPrice(order) {
      this.flightList.sort(function(flight1, flight2) {
        let price = "",
          _price = "";

        price = flight1["journey_price_list"][0]["adult_base_fare"];
        _price = flight2["journey_price_list"][0]["adult_base_fare"];

        if (order == 1) {
          return price - _price;
        } else {
          return -(price - _price);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.flight {
  .filter {
    margin-bottom: 15px;

    .search-panel {
      width:285px;
      margin-right: 10px;
      .exchange {
        position: absolute;
        top: 35px;
        right: 22px;
        width: 20px;
        height: 20px;
        &::after {
            content: '换';
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;
            color: #fff;
            background-color: #cccccc;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
            z-index: 2;
        }
        &::before {
            content: '';
            box-sizing: border-box;
            position: absolute;
            top: -18px;
            left: -10px;
            width: 20px;
            height: 60px;
            border: 1px solid #ccc;
            border-left: none;
            z-index: 1;
        }
      }
      .el-button.child-destine-bt {
        bottom: 0;
        color: #aa0371;
      }
      .search-item {
        padding-right: 0;
        float: none;
        margin-bottom: 22px;
        .el-select,
        .el-input {
          width: 193px;
        }
      }
      .search-item.last-item {
        padding-left: 38px;
      }
      .el-button {
        position: absolute;
        // bottom: 22px;
        text-align: center;
        padding-right: 0;
        padding-left: 0;
        width: 130px;
        border-radius: 4px;
      }
      .el-radio {
        display: block;
        height: 35px;
        line-height: 35px;
        margin-bottom: 22px;
      }
      .el-radio + .el-radio {
        margin-left: 0;
      }
    }
    .search-panel.search-submit {
      position: relative;
      height: 171px;
    }
  }
  .flight-calendar-wrap {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;

    .flight-week-btn-prve,
    .flight-week-btn-next {
      width: 40px;
      text-align: center;
      line-height: 50px;
      font-size: 20px;

      color: #cccccc;
      cursor: pointer;
    }
    .flight-mincalendar {
      position: relative;
      padding: 4px 0;
      text-align: center;
      width: 100px;
      border-left: 1px solid #e4e4e4;
      cursor: pointer;
      .fa {
        font-size: 30px;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        width: 28px;
        vertical-align: middle;
      }
      .datepicker {
        position: absolute;
        top: 48px;
        right: 0;
      }
    }
    .flight-week-cont {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      border-left: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      overflow: hidden;
      .week-list {
        margin: 0;
        padding: 0;
        list-style: none;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        li {
          float: left;
          color: #999;
          width: 125px;
          padding: 7px 0;
          text-align: center;
          border-right: 1px solid #e4e4e4;
          p {
            margin: 0;
          }
          span {
            color: #ff9900;
          }
        }
      }
    }
  }
  .flight-grid {
    .selecte-infor {
      background: #fff;
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #e4e4e4;
      .left {
        width: 65%;
      }
      .right {
        width: 35%;
        line-height: 35px;
        .right-item {
          margin-left: 10px;
        }
      }
      .el-select {
        margin-left: 5px;
      }
    }
    .remind {
      padding: 15px 30px;
      display: flex;
      background: #fff;
      border-bottom: 1px solid #e4e4e4;
      .remind-item {
        display: inline-block;
        margin: 0 15px 0 5px;
      }
      .item-text {
        font-size: 18px;
      }
      .remid-text {
        margin-bottom: 8px;
      }
    }
    .flight-selected {
      .hd {
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        .step-list {
          padding: 0 20px;
          font-size: 16px;
          margin: 0;
          color: #999;
          line-height: 40px;
          .step {
            color: #444;
            font-weight: 700;
            &.active {
              color: #aa177a;
            }
          }
        }
      }
      .bd {
        background-color: #feedf9;
        table {
          width: 100%;
          td {
            padding: 10px;
            text-align: center;
            color: #999;
          }
          span {
            &.air-name,
            &.col-black {
              color: #444;
              font-weight: 700;
            }
            &.col-black {
              font-size: 16px;
            }
          }
        }
      }
    }
    &.internation {
      .flight-grid-header {
        padding: 0;
        border: 0;
        margin-bottom: 10px;
        .sort-list {
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-align: center;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
          width: 500px;
          padding: 0 10px;
        }
        .taxswitch {
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-align: right;
          .tips,
          .tax-btn {
            display: inline-block;
            vertical-align: middle;
          }
          .tips {
            font-weight: 700;
          }
          .tax-btn {
            border: 1px solid #cccccc;
            border-radius: 2px;
            overflow: hidden;
            margin: 0 20px;
            &::after {
              content: "";
              display: block;
              clear: both;
            }
            span {
              float: left;
              display: block;
              width: 120px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin: -1px;
              border: 1px solid #cccccc;
              cursor: pointer;
              &.active {
                background-color: #eeeeee;
              }
            }
          }
        }
      }
      .flight-grid-content {
        padding: 0;
        background-color: transparent;
      }
      .flight-grid-item {
        background-color: #fff;
        border: 0;
        padding: 0;
        margin-bottom: 10px;
        .info-row {
          border-bottom: 1px solid #e4e4e4;
        }
        .price-row {
          .cabin {
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
          }
          .rule {
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
          }
          .price {
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            text-align: right;
            .taxes {
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
    }
    .picker-date-box {
      width: 100%;
      height: 70px;
      box-sizing: border-box;
      border: 1px solid #cfcfcf;
      background: #fff;
      .left-box {
        float: left;
        height: 100%;
        width: 85%;
        .list {
          float: left;
          width: 96%;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          .inner {
            ul {
              height: 68px;
              white-space: nowrap;
              display:flex;
              li {
                width: 15%;
                height: 100%;
                display: inline-block;
                box-sizing: border-box;
                border: 1px solid transparent;
                border-right-color: #cfcfcf;
                white-space: nowrap;
                cursor: pointer;
                &:last-child {
                  border-right: none;
                }
                &.activeli,
                &:hover {
                  border: 1px solid #a50b73;
                  background: #ffeefb;
                  .con {
                    color: #333;
                  }
                }
                p.week {
                  font-size: 12px;
                  line-height: 12px;
                  margin: 10px 0 0 10px;
                }
                .con {
                  text-align: center;
                  font-size: 14px;
                  p {
                    line-height: 14px;
                  }
                  .date {
                    margin-bottom: 6px;
                  }
                  .price {
                    // color: @text-price;
                    color: red;
                    font-weight: 500;
                  }
                }
              }
            }
          }
        }
        .icon {
          box-sizing: border-box;
          height: 100%;
          width: 26px;
          border-right: 1px solid #cfcfcf;
          cursor: pointer;
          user-select: none;
          &.prev {
            width: 2%;
            float: left;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAASCAYAAACJgPRIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjZEMjAyNzkyMTdCMTFFNzhBQzBFREY4MUZCMzY2OTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjZEMjAyN0EyMTdCMTFFNzhBQzBFREY4MUZCMzY2OTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNkQyMDI3NzIxN0IxMUU3OEFDMEVERjgxRkIzNjY5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNkQyMDI3ODIxN0IxMUU3OEFDMEVERjgxRkIzNjY5NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pljt8VAAAADeSURBVHjaYvz//z8DLjBr1ixdINXFiEsRUIEKkFoOxIEsOBTIA6mlQByZlpb2hAmLAikgtQKIU4AK7oDEmNAUiAKpVUCcC1RwGSbOhKSAH0itAeJyoIIzyJqZoAq4gNR6IG4GKjiK7gRmKSkpNqiCKUAF27F5hAnqyCVABZtwhRfMTX8Z8ACQohggTgC6yw+nIqA134B0EMjbQIUeOK2DKgwBeR+o0AmXm0AKPwKpAFAwABVaYlWEprAbqNAcqyKowtegmAfiydCkwoAvqcgAqdUgfYwEEp0ikFoEEGAAiC5TlexhbBYAAAAASUVORK5CYII=)
              no-repeat center;
          }
          &.next {
            width: 2%;
            float: left;
            border-left: 1px solid #cfcfcf;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAASCAYAAACJgPRIAAAA60lEQVR42nzRoUoEYRiF4cdxusmybBGs2yxiNYjKLiosIibDFwRBMHsBgs00nxi1GPQeDF6AVRCzybLBMpZdWNeZPfC3l/fnnE9VVS9VVa3Uda3tFTjFQ2Z2tWShrmuZ2cMddiLiaxYqICLecIanzFxuNE2Smeu4xnZEfP8xTRIRr7jEc2YuNZqmjFu4wCAiRo3QGOyPm++3QmPwEMPC/CxCOcfSxzEGZQuwiXPsRsRP2QBsjGfoR8To33eZuYYr7E2PWU4BPdzgYPZ+kwOv4h7DiPj8V7HT6XTxiKOI+GgqUuAWJxHx3jbH7wBY7m8Y+yf0FgAAAABJRU5ErkJggg==)
              no-repeat center;
          }
        }
      }
      .right-box {
        float: left;
        width: 15%;
        height: 100%;
        color: #a50b73;
        text-align: center;
        cursor: pointer;
        position: relative;
        .icon-box {
          padding-top: 19px;
          height: 100%;
          user-select: none;
        }
        .icon {
          width: 16px;
          height: 17px;
          margin: 0 auto;

          img {
            width: 100%;
            margin: 0;
            color: #a50b73;
          }
        }
        .calendar-box {
          position: absolute;
          right: -1px;
          top: 68px;
          z-index: 1;
          border: 1px solid #ddd;
        }
      }
    }
  }
  .flight-grid-header {
    padding: 0 30px;
    border-bottom: 1px solid #e4e4e4;
    height: 45px;
    background-color: #fff;
    .sort {
      cursor: pointer;
      &.active {
        color: #aa177a;
      }
    }
  }
  .flight-grid-content {
    background-color: #fff;
    padding: 0 30px;
  }
  .flight-grid-header,
  .flight-grid-item .info-row {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    > div {
      text-align: center;
      p {
        margin: 0;
      }
    }
    .iatainfo {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    .departure {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    .direction {
      -webkit-flex: 0 0 100px;
      -ms-flex: 0 0 100px;
      flex: 0 0 100px;
    }
    .arrival {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    .other {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    .market {
      -webkit-flex: 0 0 125px;
      -ms-flex: 0 0 125px;
      flex: 0 0 125px;
    }
    .price {
      -webkit-flex: 0 0 125px;
      -ms-flex: 0 0 125px;
      flex: 0 0 125px;
    }
    .operate {
      -webkit-flex: 0 0 150px;
      -ms-flex: 0 0 150px;
      flex: 0 0 150px;
    }
  }
  .flight-grid-item {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 20px;
    .info-row {
      height: 100px;
      .iatainfo {
        .name {
          font-size: 18px;
        }
        .flightno {
          color: #999999;
        }
        .share {
          color: #1a75ff;
        }
      }
      .departure {
        .time {
          font-size: 18px;
        }
        .airport {
          color: #999999;
        }
      }
      .direction {
        .arrows {
          position: relative;
          display: block;
          width: 100%;
          height: 8px;
          &::after {
            content: "";
            position: absolute;
            right: 0;
            height: 0;
            width: 0;
            border-left: 10px solid #cccccc;
            border-top: 4px solid #fff;
            border-bottom: 4px solid #fff;
          }
          &::before {
            content: "";
            position: absolute;
            top: 3px;
            left: 0;
            height: 2px;
            width: 100%;
            background-color: #cccccc;
          }
        }
        .toaltime {
          color: #999999;
        }
        .isstop {
          color: #297eff;
          display: block;
          top: 10px;
          cursor: pointer;
        }
      }
      .arrival {
        .time {
          font-size: 18px;
        }
        .airport {
          color: #999999;
        }
        .days {
          font-size: 14px;
          color: #ff6600;
        }
      }
      .other {
        .other-name {
          color: #999999;
        }
        .other-info {
          font-size: 16px;
        }
      }
      .market {
        font-size: 18px;
        i,
        .discount {
          font-size: 14px;
          font-style: normal;
        }
        .discount {
          color: #999999;
        }
      }
      .price {
        font-size: 20px;
        color: #ff6600;
        i {
          font-size: 14px;
          font-style: normal;
        }
      }
    }
    .price-row {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      height: 45px;
      background-color: #f4f4f4;
      margin-bottom: 5px;
      > div {
        text-align: center;
      }
      .cabin {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
      .bill {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #297eff;
      }
      .rule {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #297eff;
        span {
          cursor: pointer;
        }
      }
      .limit {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #297eff;
        span {
          cursor: pointer;
        }
      }
      .market {
        -webkit-flex: 0 0 125px;
        -ms-flex: 0 0 125px;
        flex: 0 0 125px;
        font-size: 20px;
        .market_child {
          font-size: 14px;
          color: #999999;
        }
        i,
        .discount {
          font-size: 14px;
          font-style: normal;
        }
        .discount {
          color: #999999;
        }
      }
      .price {
        -webkit-flex: 0 0 125px;
        -ms-flex: 0 0 125px;
        flex: 0 0 125px;
        font-size: 20px;
        color: #ff6600;
        i {
          font-size: 14px;
          font-style: normal;
        }
      }
      .operate {
        // -webkit-flex: 0 0 150px;
        // -ms-flex: 0 0 150px;
        // flex: 0 0 150px;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        .reserve_box {
          display: inline-block;
          .reserve {
            display: inline-block;
            padding: 5px 10px;
            background-color: #b10c79;
            color: #fff;
            border-radius: 2px;
          }
        }
        .surplus {
          margin-left: 5px;
          color: #999;
          i {
            color: #ff3c3c;
            font-style: normal;
          }
        }
      }
    }
    .show-more {
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      color: #999;
      background-color: #fafafa;
    }
    .detail-expend {
      padding: 20px 0 0 30px;
      width: 600px;
      .detail-item {
        margin-bottom: 20px;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        .detail-num,
        .detail-info {
          display: inline-block;
          vertical-align: middle;
        }
        .detail-num {
          color: #999999;
        }
        .detail-info {
          position: relative;
          padding-left: 40px;
          margin-left: 20px;
          .logo {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 30px;
            img {
              width: 100%;
            }
          }
          p {
            margin: 0;
            line-height: 24px;
            &.section-flight-base {
              span {
                color: #999;
                &.name {
                  color: #444;
                  font-weight: 700;
                }
                &.craft-type {
                  cursor: help;
                }
                &.share {
                  color: #297eff;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .flight-stop {
        height: 28px;
        margin: 0 auto 10px;
        color: #999;
        line-height: 28px;
        background-color: #f8f8f8;
        text-align: center;
      }
    }
  }
  .fligt-special-panel {
    padding: 20px;
    background-color: #fff;
    .hd {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      h2 {
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        margin: 0;
        span {
          color: #ff9900;
        }
      }
    }
    .bd {
      position: relative;
      min-height: 330px;
      padding: 10px 0;
    }
    .special-list {
      list-style: none;
      margin: 0;
      padding: 0;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .special-item {
        float: left;
        box-sizing: border-box;
        padding: 10px;
        width: 50%;
        cursor: pointer;
      }
      .special-conten {
        padding: 10px 0;
        background-color: #f4f4f4;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        > div {
          float: left;
          box-sizing: border-box;
          width: 33.333333%;
          font-size: 16px;
          font-weight: 700;
          color: #444;
        }
        .site {
          padding: 0 20px;
          i {
            color: #999;
          }
        }
        .date {
          text-align: center;
        }
        .price {
          text-align: right;
          padding-right: 20px;
          color: #ff6600;
          em {
            color: #999;
            font-size: 12px;
            font-style: normal;
          }
        }
      }
    }
  }
}

.flight-seat-list {
  table {
    border-collapse: collapse;
    width: 100%;
    tr {
      td {
        border: 1px solid #ddd;
        padding: 8px;
        &:first-child {
          width: 120px;
          text-align: center;
        }
      }
    }
  }
  p {
    margin: 0 0 10px;
  }
}

.flight-info-table {
  width: 100%;
  font-size: 14px;
  th,
  td {
    padding: 6px 8px;
    text-align: center;
  }
  th {
    background-color: #f4f4f4;
  }
}

.flight-tips {
  padding: 8px 0;
  text-align: center;
  background-color: #fff;
  color: #999;
}
.el-tabs__content {
  padding: 0;
}
.child-destine-title {
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}
.child-destine-details {
  font-size: 14px;
  padding: 10px;
  .details-title {
    font-size: 16px;
    margin: 8px 0;
    font-weight: 600;
  }
}
</style>
