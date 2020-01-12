<template>
  <div class="flight">
    <div class="filter">
      <div class="el-tabs el-tabs--border-card">
        <div class="el-tabs__header">
          <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav">
              <div v-if="$menuPermission('salecenter/flight/inland') && rescheduled.tag!='2'" class="el-tabs__item" @click="$router.push({ name: 'SalecenterFlightInland'})">
                国内机票
              </div>
              <div class="el-tabs__item is-active">
                国际机票
              </div>
            </div>
          </div>
        </div>
        <div class="el-tabs__content">
          <div class="route-type">
              <el-radio class="radio" v-model="route" :label="1" :disabled="rescheduled.tag==2">单程</el-radio>
              <el-radio class="radio" v-model="route" :label="2" :disabled="rescheduled.tag==2">往返</el-radio>
              <el-radio class="radio" v-model="route" :label="3" :disabled="rescheduled.tag==2">多程</el-radio>
          </div>
          <el-form v-if="route != 3" :class="'search-content'" ref="filterForm" :model="filter" label-width="80px">
            <div class="search-panel search-panel-city">
              <div class="search-city">
                <el-form-item label="出发城市">
                  <airport-icao-picker v-model="filter.departCity" no-data-text="请输入城市名称" :disabled="rescheduled.tag==2"></airport-icao-picker>
                </el-form-item>
                <el-form-item label="到达城市">
                  <airport-icao-picker v-model="filter.arriveCity" no-data-text="请输入城市名称" :disabled="rescheduled.tag==2"></airport-icao-picker>
                </el-form-item>
                <div class="exchange" @click="exchangeDepartAndArriveCity"></div>
              </div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="成人">
                    <el-select v-model="filter.adult" :class="'search-panel-number'" placeholder="请选择" :disabled="rescheduled.tag==2">
                      <el-option
                        v-for="(p,key) in 9"
                        :key="key"
                        :label="p"
                        :value="p"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="儿童">
                    <el-select v-model="filter.child" :class="'search-panel-number'" placeholder="请选择" :disabled="rescheduled.tag==2">
                      <el-option
                        :label="0"
                        :value="0"
                      >
                      </el-option>
                      <el-option
                        v-for="(p,key) in maxChildNum"
                        :key="key"
                        :label="p"
                        :value="p"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="search-panel">
              <el-form-item label="出发日期">
                <el-date-picker
                v-model="filter.startTime"
                type="date"
                placeholder="选择日期"
                :picker-options="startTimeOptions"
                @change="changeStartTime">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="返程日期">
                <el-date-picker
                v-model="filter.backTime"
                type="date"
                placeholder="选择日期"
                :disabled="route != 2"
                :picker-options="backTimeOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="舱等">
                <el-select v-model="filter.cabinClass" placeholder="请选择">
                  <el-option label="经济舱" :value="1"></el-option>
                  <el-option label="公务舱" :value="2"></el-option>
                  <el-option label="头等舱" :value="3"></el-option>
                  <el-option label="超级经济舱" :value="4"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="search-panel" style="margin-left: 30px;margin-top: 5px;">
              <el-button @click="changeRouteForRequestFlightList" type="primary">立即搜索</el-button>
              <el-checkbox v-model="filter.nonStop" :disabled="rescheduled.tag==2">只查看直飞</el-checkbox>
            </div>
          </el-form>
          <el-form v-else :class="'search-more-content'" ref="filterForm" :model="filter" label-width="80px">
            <div class="search-panel">
              <div v-for="(segment, key) in multipassFilter.segment_list" :key="key" class="search-panel-item">
                <div class="num">{{ key + 1 }}</div>
                <div class="inputs">
                  <el-form-item label="出发城市">
                    <airport-icao-picker v-model="segment.depart_airport_code" no-data-text="请输入城市名称"></airport-icao-picker>
                  </el-form-item>
                  <el-form-item label="到达城市">
                    <airport-icao-picker v-model="segment.arrive_airport_code" no-data-text="请输入城市名称"></airport-icao-picker>
                  </el-form-item>
                  <el-form-item label="出发日期">
                    <el-date-picker
                    v-model="segment.depart_date"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="startTimeOptions">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="add" @click="addJourneyHandler(key)">
                  +
                </div>
                <div v-if="multipassFilter.segment_list.length > 2" class="del" @click="delJourneyHandler(key)">
                  ×
                </div>
              </div>
            </div>
            <div class="search-panel">
              <el-row type="flex" :gutter="20">
                <el-col :span="4">
                  <el-form-item label="成人">
                    <el-select v-model="multipassFilter.adult_quantity" :class="'search-panel-number'" placeholder="请选择">
                      <el-option
                        v-for="(p,key) in 9"
                        :key="key"
                        :label="p"
                        :value="p"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="儿童">
                    <el-select v-model="multipassFilter.child_quantity" :class="'search-panel-number'" placeholder="请选择">
                      <el-option
                        :label="0"
                        :value="0"
                      >
                      </el-option>
                      <el-option
                        v-for="(p,key) in _maxChildNum"
                        :key="key"
                        :label="p"
                        :value="p"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="舱等">
                    <el-select v-model="multipassFilter.cabin_class" placeholder="请选择">
                      <el-option label="不限" :value="''"></el-option>
                      <el-option label="经济舱" :value="1"></el-option>
                      <el-option label="公务舱" :value="2"></el-option>
                      <el-option label="头等舱" :value="3"></el-option>
                      <el-option label="超级经济舱" :value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-button v-if="$menuPermission('salecenter/flight/internation')" @click="changeRouteForRequestFlightList" type="primary">立即搜索</el-button>
                  <el-checkbox v-model="multipassFilter.direct">只查看直飞</el-checkbox>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="flightList" class="flight-grid">
      <div class="flight-screen">
        <div class="screen-list">
          <el-select v-model="screen.airline" clearable placeholder="航空公司" :disabled="rescheduled.tag==2">
            <el-option v-for="(airline, key) in screenAirlineList"
              :key="key"
              :label="airline"
              :value="airline">
            </el-option>
          </el-select>
          <el-select v-model="screen.time" clearable placeholder="出发时间" :disabled="rescheduled.tag==2">
            <el-option v-for="(time, key) in screenDepartureTime" :key="key"
              :label="time"
              :value="key + 1"></el-option>
          </el-select>
          <el-select v-model="screen.transfer" clearable placeholder="中转城市" :disabled="rescheduled.tag==2">
            <el-option v-for="(city, key) in screenTransferCityList" :key="key"
              :label="city"
              :value="city">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flight-sort">
        <div class="sort-list">
          <div class="sort-item" :class="{ 'selected': sort.sortName == '' }" @click="changeGridSortHander('')">
            默认排序
          </div>
          <div class="sort-item" :class="{ 'selected': sort.sortName == 'departDate' }" @click="changeGridSortHander('departDate')">
            出发时间 <i v-if="sort.sortName == 'departDate'" class="fa" :class="{ 'fa-long-arrow-up': sort.sortPositive, 'fa-long-arrow-down': !sort.sortPositive }" aria-hidden="true"></i>
          </div>
          <!-- <div class="sort-item" :class="{ 'selected': sort.sortName == 'arriveDate' }" @click="changeGridSortHander('arriveDate')">
            到达时间 <i v-if="sort.sortName == 'arriveDate'" class="fa" :class="{ 'fa-long-arrow-up': sort.sortPositive, 'fa-long-arrow-down': !sort.sortPositive }" aria-hidden="true"></i>
          </div> -->
          <div class="sort-item" :class="{ 'selected': sort.sortName == 'duration' }" @click="changeGridSortHander('duration')">
            航程时长 <i v-if="sort.sortName == 'duration'" class="fa" :class="{ 'fa-long-arrow-up': sort.sortPositive, 'fa-long-arrow-down': !sort.sortPositive }" aria-hidden="true"></i>
          </div>
          <div v-if="rescheduled.tag != '2'" class="sort-item" :class="{ 'selected': sort.sortName == 'price' }" @click="changeGridSortHander('price')">
            价格 <i v-if="sort.sortName == 'price'" class="fa" :class="{ 'fa-long-arrow-up': sort.sortPositive, 'fa-long-arrow-down': !sort.sortPositive }" aria-hidden="true"></i>
          </div>
        </div>
        <div class="sort-other">
          <div class="tips">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            所有起飞降落时间均为当地时间
          </div>
          <div class="tax-switch" @click="hasTax = !hasTax">
            <div class="off" :class="{ 'selected': !hasTax }">
              不含税价格
            </div>
            <div class="on" :class="{ 'selected': hasTax }">
              含税价格
            </div>
          </div>
        </div>
      </div>
      <div class="flight-list">
        <div v-for="(flight, flightKey) in flightList" :key="flightKey" class="flight-item">
          <div v-for="(journey, journeyKey) in flight.journey_list" :key="journeyKey" class="outline">
            <div class="airline">
              <p>{{ Object.values(journey.segment_list).map((e) => { return e.airline_company }).join('/') }}</p>
              <span>{{ journey.flight_no }}</span>
            </div>
            <div class="time">
              <div class="depart">
                <p>{{ Object.values(journey.segment_list)[0].departure_time }}</p>
                <span>{{ Object.values(journey.segment_list)[0].departure_port_st_name || '&nbsp;' }}</span>
              </div>
              <div class="arrows"></div>
              <div class="arrive">
                <p>{{ Object.values(journey.segment_list)[Object.values(journey.segment_list).length - 1].arrival_time }} <i class="days" v-if="countDurationDays(Object.values(journey.segment_list)[0].departure_date, Object.values(journey.segment_list)[Object.values(journey.segment_list).length - 1].arrival_date)">+{{ countDurationDays(Object.values(journey.segment_list)[0].departure_date, Object.values(journey.segment_list)[Object.values(journey.segment_list).length - 1].arrival_date) }}</i></p>
                <span>{{ Object.values(journey.segment_list)[Object.values(journey.segment_list).length - 1].arrival_port_st_name || '&nbsp;'}}</span>
              </div>
            </div>
            <div class="duration">
              <p><i class="fa fa-clock-o" aria-hidden="true"></i> {{ journey.duration.split(':')[0] + 'h' + journey.duration.split(':')[1] + 'm' }}</p>
            </div>
            <div v-if="journey.stop_city" class="stop">
              <span>经停</span>
              <p>{{ journey.stop_city }}</p>
            </div>
            <div v-if="journey.transfer_city" class="transfer">
              <span>中转</span>
              <p>{{ JSON.parse(journey.transfer_city).city }}</p>
            </div>
            <div class="tools">
              <a v-if="journeyKey == flight.journey_list.length - 1" href="javascript:;" @click="showDetails.key = flightKey; showDetails.off = !showDetails.off">
                航班详情 <i class="fa" :class="{ 'fa-angle-down': showDetails.off, 'fa-angle-up': !showDetails.off }" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div v-show="showDetails.key == flightKey && !showDetails.off" class="details">
            <div v-for="(journey, journeyKey) in flight.journey_list" :key="journeyKey" class="voyage-item">
              <div class="num">
                第{{ journeyKey + 1 }}程
              </div>
              <div v-for="(segment, segmentKey) in journey.segment_list" :key="segmentKey" class="content">
                <div class="journey">
                  <p>
                    <strong>{{ segment.airline_company }}</strong>
                    <span class="dim">&nbsp;&nbsp;{{ segment.flight_no }}&nbsp;&nbsp;{{ segment.craft_type_name }}{{ segment.craft_type }}</span>
                    <span v-if="segment.meal" class="lighting">
                      有餐
                    </span>
                    <span v-if="segment.codeshare" class="lighting">
                      共享
                    </span>
                    <template v-if="segment.s_air_com_name">
                      &nbsp;&nbsp;&nbsp;实际承运
                      <span class="dim">{{ segment.s_air_com_name + segment.codeshare}}</span>
                    </template>
                  </p>
                  <p>{{ segment.departure_date }}  {{ segment.departure_time }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ segment.departure_port_iata_code + segment.departure_port_st_name + segment.departure_terminal }} <span class="dim ml80">飞行时长 </span>{{ segment.duration }}</p>
                  <p>{{ segment.arrival_date }}  {{ segment.arrival_time }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ segment.arrival_port_iata_code + segment.arrival_port_st_name + segment.arrival_terminal }}</p>
                </div>
                <div v-if="segment.transfer_info" class="other">
                  <p v-if="segment.transfer_info">{{ segment.transfer_info }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="cabin">
            <div class="cabin-lt">
              <div class="class">
                <el-popover
                  placement="right"
                  trigger="hover">
                    <div class="cabin">
                      <table>
                          <tr v-for="(cabin, cabinKey) in flight.price_journey_cabin_list" :key="cabinKey">
                            <td>
                              {{ cabin.departCity }}
                              -
                              {{ cabin.arriveCity }}
                            </td>
                            <td>
                              {{ cabin.physicalClassName }}({{ cabin.cabin }})
                            </td>
                          </tr>
                      </table>
                    </div>
                  <span slot="reference">
                    {{ flight.price_journey_cabin_list[0].physicalClassName }}
                  </span>
                </el-popover>
              </div>
              <div class="bill">
                {{ flight.tags == 0 ? '行程单' : flight.tags == 1 ? '发票' : '不提供报销凭证' }}
              </div>
              <div class="rules">
                <el-popover
                  placement="right"
                  trigger="hover"
                  @show="hasRefundsHandler(flight.id, flightKey)">
                    <div class="refunds" v-loading="refundsLoading">
                      <table v-if="flight.refunds">
                          <tr>
                            <td>成人退改签规则</td>
                            <td>
                              <div class="refunds-scroll" v-html="flight.refunds.adult_rule"></div>
                            </td>
                          </tr>
                          <tr>
                            <td>儿童退改签规则</td>
                            <td v-html="flight.refunds.child_rule"></td>
                          </tr>
                          <tr>
                            <td>婴儿退改签规则</td>
                            <td v-html="flight.refunds.baby_rule"></td>
                          </tr>
                          <tr>
                            <td>行李额说明</td>
                            <td>
                              <template v-for="(bag, bagKey) in flight.baggages_list">
                                <p :key="bagKey">
                                  {{ bag.departCity }}
                                  到
                                  {{ bag.arriveCity }}
                                  ：
                                  {{ bag.weight }}
                                </p>
                              </template>
                            </td>
                          </tr>
                      </table>
                    </div>
                  <span slot="reference">退改/行李额须知</span>
                </el-popover>
              </div>
            </div>
            <div class="cabin-rt">
              <div class="tax-price" v-if="rescheduled.tag != '2'">
                <span class="unit">￥</span>
                <span class="price">
                  {{ hasTax ? (flight.adult_base_fare + flight.adult_taxes) : flight.adult_base_fare }}
                </span>
                <span class="tax">
                  {{ hasTax ? '含税价' : '税费 ￥' + flight.adult_taxes }}
                </span>
              </div>
              <div class="reserve" v-if="rescheduled.tag != '2'">
                <a href="javascript:;" @click="$router.push({ name: 'SalecenterFlightInternationCheckout', query: { priceId: flight.id, option: $route.query.option } })">预定</a>
              </div>
              <div class="reserve" v-else>
                <router-link
                  class="reserve"
                  :to="{ name: 'FlightSaleOrderDetail', query: { order_id:rescheduled.order_id , tag: '2',journey_id:flight.journey_list[0].id,seat_type:flight.price_journey_cabin_list[0].physicalClassName,index:rescheduled.indexs}}"
                >改期</router-link>
              </div>
              <div class="redundant">
                <template v-if="flight.seats < 9">
                  剩 {{ flight.seats }} 张
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <p v-else class="flight-tips">暂无航班信息</p>
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import * as dom from 'src/utils/dom';
import { getForeignFlight, getForeignFlightRefund } from 'src/api/flight';
import airportIcaoPicker from './components/AirportIcaoPicker/index.vue';
import { airportIcaoData } from './components/AirportIcaoPicker/AirportIcaoData';

export default {
  data(){
    return {
      flightList: null,
      airportIcaoData,
      cacheFlightList: null,
      screen:{
        airline: '',
        transfer: '',
        time: ''
      },
      screenDepartureTime:['0-6点', '6-12点', '12-18点', '18-24点'],
      screenAirlineList: null,
      screenTransferCityList: null,
      route:1,
      filter:{
        departCity: '',
        arriveCity: '',
        adult: 1,
        child: 0,
        cabinClass: 1,
        startTime: '',
        backTime: '',
        nonStop: false
      },
      multipassFilter:{
        adult_quantity: 1,
        child_quantity: 0,
        cabin_class: 1,
        segment_list:[
          {
            depart_airport_code: '',
            arrive_airport_code: '',
            depart_date: ''
          },
          {
            depart_airport_code: '',
            arrive_airport_code: '',
            depart_date: ''
          }
        ],
        direct: false
      },
      hasTax: true,
      showDetails:{
        key: null,
        off: true
      },
      sort: {
        sortName: '',
        sortPositive: true
      },
      startTimeOptions:{
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      refundsLoading: false,
      rescheduled: {
        tag: false, //用来判断来源路径，2：改期
        order_id: "", //传递过来的订单ID
        indexs:'',//标记
      }
    }
  },
  computed:{
    backTimeOptions(){
      let that = this;
      return {
        disabledDate(time) {
          return time.getTime() < new Date(that.filter.startTime).getTime();
        }
      }
    },
    multipleTimeOptions(){
      let segments = this.multipassFilter.segment_list,
          options = [];
      segments.forEach((segment, key) => {
        let start = null;
        if(key == 0){
          start = new Date().getTime();
        }else{
          start = new Date(segments[key-1].depart_date).getTime();
        }
        options.push({
          disabledDate(time) {
            return time.getTime() < start;
          }
        });
      });
      return options;
    },
    maxChildNum(){
      return 9 - this.filter.adult;
    },
    _maxChildNum(){
      return 9 - this.multipassFilter.adult_quantity;
    }
  },
  watch:{
    $route(){
      this.screen = {
        airline: '',
        transfer: '',
        time: ''
      };
      this.sort = {
        sortName: '',
        sortPositive: true
      };
      this.showDetails = {
        key: null,
        off: true
      };
      this.initFilterFormData();
      this.requestFlightListHandler();
    },
    sort:{
      handler(value, oldVal){

      },
      deep: true
    },
    screen:{
      handler(value, oldVal){
        this.sortAndScreenFlightListDataHandler();
      },
      deep: true
    },
    'filter.adult':{
      handler(value, oldVal){
        if(9 - value < this.filter.child){
          this.filter.child = 9 - value;
        }
      },
      deep: true
    },
    'multipassFilter.child_quantity':{
      handler(value, oldVal){
        if(9 - value < this.multipassFilter.child_quantity){
          this.multipassFilter.child_quantity = 9 - value;
        }
      },
      deep: true
    }
  },
  components:{
    airportIcaoPicker
  },
  methods: {
    initFilterFormData(){
      if(!this.$route.query.option)return;
      let params = JSON.parse(decodeURIComponent(window.atob(this.$route.query.option)));
      this.route = params.route;
      this.rescheduled.tag = params.tag;
      this.rescheduled.order_id = params.order_id;
      this.rescheduled.indexs = params.index;
      if(this.route == 1 || this.route == 2){
        params.filter.startTime = new Date(params.filter.startTime);
        params.filter.backTime = params.filter.backTime ? new Date(params.filter.backTime) : '';
        this.$set(this, 'filter', params.filter);
      }else{
        params.filter.segment_list.forEach((segment) => {
          segment.depart_date = new Date(segment.depart_date)
        });
        this.$set(this, 'multipassFilter', params.filter);
      }
    },
    changeRouteForRequestFlightList(){
      let valid = this.validatorFilterItem();
      if (valid) {
        let query = {
          route: this.route,
          times: Date.now()
        }
        if(this.route == 1 || this.route == 2){
          query.filter = this.filter;
        }else{
          query.filter = this.multipassFilter;
        }
        if (this.rescheduled.tag == 2) {
          query.tag = this.rescheduled.tag;
          query.order_id = this.rescheduled.order_id ;
          query.index=this.rescheduled.indexs ;
        }
        query = window.btoa(encodeURIComponent(JSON.stringify(query)));
        this.$router.push({
          path: this.path,
          query: {
            option: query
          }
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    },
    requestFlightListHandler(){
      let params = {
        data: this.formatFlightListRequestPramas()
      }
      getForeignFlight({
        params: params,
        success: (res) => {
          let { code, data, msg } = res['data'];
          console.log(res);

          if(code == 0){
            this.cacheFlightList = this.formatFlgihtJourneyCabinListAndDuration(data.flight_list);
            this.flightList = Object.values(this.cacheFlightList);
            this.screenAirlineList = data.airline_list;
            this.screenTransferCityList = data.transfer_city_list;
          }else{
            this.$message.error(msg);
            this.flightList = null;
          }
        },
        showLoading: true
      })
    },
    formatFlgihtJourneyCabinListAndDuration(data){
      for(let i in data){
        data[i].price_journey_cabin_list.forEach((j) => {
        
          airportIcaoData.filter((k) => { return k.airport_code === j.depAirport }).length != 0 ? j.departCity = airportIcaoData.filter((k) => { return k.airport_code === j.depAirport })[0].city_name_cn : j.departCity = j.depAirport;

          airportIcaoData.filter((k) => { return k.airport_code === j.arriveAirport }) != 0 ? j.arriveCity = airportIcaoData.filter((k) => { return k.airport_code === j.arriveAirport })[0].city_name_cn : j.arriveCity = j.arriveAirport;
          
        });

        for(let b in data[i].baggages_list){
          let bags = data[i].baggages_list[b],
              empty = {};

          empty.departCity = airportIcaoData.filter((k) => { return k.airport_code === b.substring(0,3) }).length != 0 ?airportIcaoData.filter((k) => { return k.airport_code === b.substring(0,3) })[0].city_name_cn : b.substring(0,3);

          empty.arriveCity = airportIcaoData.filter((k) => { return k.airport_code === b.substring(3) }).length !=0 ? airportIcaoData.filter((k) => { return k.airport_code === b.substring(3) })[0].city_name_cn : b.substring(3);
          
          empty.weight = bags;
          data[i].baggages_list[b] = empty;
        }
        data[i].journey_list.forEach((j) => {
          if(j.transfer_city){
            let duration = j.duration.split(':'),
              transferDuration = JSON.parse(j.transfer_city).duration.split(':'),
              h = Number(duration[0]) + Number(transferDuration[0]),
              m = Number(duration[1]) + Number(transferDuration[1]);
            j.duration = (h + Math.floor(m/60)) + ':' + (m%60);
          }
        });
      }
      return data;
    },
    airlineCompany(data){
      let airline_list= {     
        'CA' : '中国国际航空',
        'MU' : '中国东方航空',
        'CZ' : '中国南方航空',
        'SZ' : '中国西南航空',
        'WH' : '中国西北航空',
        'CJ' : '中国北方航空',
        'F6' : '中国航空',
        'XO' : '新疆航空',
        '3Q' : '云南航空',
        'MF' : '厦门航空',
        '3U' : '四川航空',
        'FM' : '上海航空',
        'IJ' : '长城航空',
        'WU' : '武汉航空',
        'Z2' : '中原航空',
        'G4' : '贵州省航空',
        'H4' : '海南航空',
        'X2' : '新华航空',
        'ZH' : '深圳航空',
        '2Z' : '长安航空',
        'IV' : '福建航空',
        'SC' : '山东航空',
        '8C' : '山西航空',
        'HU' : '海南航空集团',
        'KN' : '中国联合航空',
        'BK' : '奥凯航空',
        '9C' : '春秋航空',
        'EU' : '鹰联航空',
        'NS' : '东北航空',
        'PN' : '西部航空',
        'OQ' : '重庆航空',
        'VD' : '鲲鹏航空',
        '8C' : '东星航空',
        'HO' : '吉祥航空',
        'CN' : '大新华航空',
        'G5' : '华夏航空',
        'DJ' : '金鹿航空',
        'JI' : '翡翠航空',
        'Y8' : '扬子江快运航空',
        '8Y' : '中国邮政航空',
        'IJ' : '长城航空',
        'GD' : '银河航空',
        'GS' : '天津航空',
        'JD' : '首都航空',
        'A6' : '云南红土航空',
        'GY' : '多彩贵州航空',
        'JR' : '幸福航空',
        'KY' : '昆明航空',
        'TV' : '西藏航空',
        '8L' : '祥鹏航空',
        'GJ' : '长龙航空',
        'DZ' : '东海航空',
        'YI' : '英安航空',
        'QW' : '青岛航空',
        'DR' : '瑞丽航空',
        'UQ' : '乌鲁木齐',
        'FU' : '福州航空',
        'GX' : '北部湾航空',
        'RY' : '江西航空',
        '9H' : '长安航空',
        'GT' : '桂林航空',
        'AS' : '阿拉斯加航空',
        'AR' : '阿根廷航空',
        'DL' : '达美航空',
        'AV' : '哥伦比亚国家航空',
        'AU' : '奥斯特拉尔航空',
        'AZ' : '意大利航空',
        'AY' : '芬兰航空',
        'BA' : '英国航空',
        'AC' : '加拿大航空',
        'AA' : '美国航空',
        'AH' : '阿尔及利亚航空',
        'AF' : '法国航空',
        'AI' : '印度航空',
        'AJ' : '比利时空运',
        'AO' : '西班牙商业航空',
        'AM' : '墨西哥航空',
        'AN' : '澳大利亚安塞特航空',
        'BR' : '长荣航空',
        'BU' : '布拉森斯南美和远东空运',
        'CA' : '国航',
        'BI' : '文莱王家航空',
        'BD' : '柬埔寨巴戎寺航空',
        'BO' : '印度尼西亚布拉克航空',
        'BL' : '太平洋航空',
        'DS' : '塞内加尔航空',
        'CZ' : '南航',
        'CY' : '塞浦路斯航空',
        'CX' : '国泰航空',
        'CW' : '马绍尔群岛航空',
        'CU' : '古巴统一航空',
        'DC' : '金色航空',
        'DB' : '不列特国际航空',
        'CI' : '中华航空',
        'CG' : '米尔恩湾航空',
        'CF' : '福塞特航空',
        'DE' : '康多尔航空',
        'CO' : '大陆航空',
        'CP' : '加拿大国际航空',
        'CM' : '巴拿马空运',
        'CN' : '大新华航空',
        'LT' : '温特内曼国际航空',
        'LY' : '以色列航空',
        'LX' : '瑞士航空',
        'LO' : '波兰航空',
        'LM' : '安的列斯航空',
        'LR' : '哥斯达黎加航空',
        'ED' : '夏洛特航空',
        'MH' : '马来西亚航空',
        'MF' : '厦航',
        'MK' : '毛里求斯航空',
        'ML' : '哥斯达黎加航空',
        'MI' : '胜安航空',
        'MJ' : '阿根廷航空',
        'MD' : '马达加斯加航空',
        'MA' : '匈牙利航空',
        'MU' : '东航',
        'MX' : '墨西哥航空',
        'MW' : '马亚航空',
        'DI' : '德英航空',
        'MZ' : '梅帕蒂航空',
        'MN' : '商用航空',
        'MM' : '麦德林航空',
        'MP' : '荷兰马丁航空',
        'MO' : '静空国际航空',
        'MR' : '毛里塔尼亚航空',
        'MQ' : '西蒙斯航空',
        'MS' : '埃及航空',
        'NF' : '维加斯航空',
        'NI' : '葡萄牙航空',
        'NK' : '斯皮里特航空',
        'NA' : '公务航空',
        'ND' : '链环航空',
        'NZ' : '新西兰航空',
        'NW' : '西北航空',
        'NV' : '西北地区航空',
        'NU' : '日本跨洋航空',
        'NT' : '加那利航空',
        'OM' : '蒙古航空',
        'ON' : '瑙鲁航空',
        'OK' : '捷克斯洛伐克航空',
        'FA' : '芬兰空运',
        'OH' : '库姆航空',
        'OE' : '西方短程航空',
        'OD' : '苏利亚纳航空',
        'OA' : '奥林匹克航空',
        'OZ' : '韩亚航空',
        'OS' : '奥地利航空',
        'OU' : '克罗地亚航空',
        'OO' : '天西航空',
        'PL' : '秘鲁航空',
        'PH' : '波利尼西亚航空',
        'PJ' : '圣皮埃尔航空',
        'PK' : '巴基斯坦国际航空',
        'FB' : '法恩航空',
        'PG' : '曼谷航空',
        'PB' : '布隆迪航空',
        'HJ' : '霍尔姆斯特鲁姆航空',
        'KO' : '阿拉斯加中部快递',
        'DX' : '丹麦航空',
        'DV' : '斯开特航空',
        'JA' : '波斯尼亚航空',
        'J2' : '阿塞拜疆航空',
        'K2' : '欧洲波兰航空',
        'K6' : '吴哥航空',
        'VY' : '维林航空',
        'BE' : '弗莱比航空',
        'L6' : '提拉维姆什尼航空',
        'LN' : '利比亚阿拉伯航空',
        'ME' : '中东航空',
        'PW' : '普雷西赛恩航空服务',
        'UJ' : '',
        'YO' : '摩纳哥直升机航空',
        'AD' : '天堂航空',
        'A3' : '爱琴航空',
        'B6' : '捷蓝航空',
        'B2' : '白俄罗斯航空',
        'BG' : '孟加拉航空',
        'FZ' : '迪拜航空',
        'A6' : '红土航空',
        'BK' : '奥凯航空',
        'DR' : '瑞丽航空',
        'DZ' : '东海航空',
        'FU' : '福州航空',
        'GS' : '天津航空',
        'GX' : '北部湾航空',
        'KY' : '昆明航空',
        'NS' : '河北航空',
        'QW' : '青岛航空',
        'UQ' : '乌鲁木齐航空',
        'Y8' : '',
        'YI' : '英安航空',
        '8C' : '东星航空',
        'FE' : '远东航空',
        'AB' : '柏林航空',
        'FT' : '暹粒航空',
        'FV' : '俄罗斯国家航空',
        'HZ' : '萨哈林航空',
        'IO' : '伊尔航空',
        'IY' : '也门航空',
        'JQ' : '捷星航空',
        'PC' : '斐济航空',
        'PS' : '乌克兰国际航空',
        'TZ' : '',
        'U6' : '乌拉尔航空',
        'UT' : '尤特航空',
        'W5' : '马汉航空',
        '7C' : '济州航空',
        '8M' : '缅甸航空',
        '8U' : '泛非航空',
        'BX' : '釜山航空',
        'LV' : '阿尔巴尼亚航空',
        'bw' : '多巴哥航空',
        'W3' : '尼日利亚埃瑞克航空',
        'AK' : '亚洲航空',
        'FD' : '泰国亚洲航空',
        'QZ' : '阿瓦国际航空',
        'Z2' : '亚航飞龙航空公司',
        'XT' : '卓越航空 ',
        'D7' : '第纳尔航空',
        'PQ' : '亚洲航空',
        'O8' : '暹罗航空',
        '4U' : '德国之翼航空',
        '4T' : '',
        '5N' : '俄罗斯国际航空诺德分公司 ',
        '5W' : '阿斯特拉易斯航空',
        'FS' : '菲基诺斯航空',
        'H1' : '胡特斯航空',
        'H2' : '空中航空',
        'HG' : '尼基航空',
        'I9' : '意大利国家航空公司',
        'J8' : '白贾亚航空',
        'JC' : '日本国际快运航空',
        'JV' : '贝尔斯金航空',
        '2I' : '秘鲁之星',
        '8R' : '地区旅行航空',
        '9K' : '科德角航空',
        'A5' : '利奈尔航空   ',
        'AX' : '穿越国家航空',
        'BV' : '蓝色全景航空',
        'D6' : '南非英特航空  ',
        'D8' : '吉布提航空',
        'EW' : '欧洲之翼航空',
        'MT' : '大西部航空 ',
        'NN' : '维姆航空',
        'OR' : '埃克费航空',
        'OV' : '爱沙尼亚航空   ',
        'PZ' : '地区航空运输',
        'R2' : '奥伦堡航空',
        '1X' : '',
        '2P' : '菲律宾航空 ',
        'TF' : '马尔莫航空',
        'TJ' : '秘鲁坦斯航空  ',
        'TL' : '北方地区航空',
        'TX' : '卡拉贝斯航空 ',
        'U7' : '诺坎航空',
        'U9' : '鞑坦斯坦航空',
        'V2' : '卡拉特航空',
        'V3' : '卡帕特航空',
        'V7' : '塞内加尔国际航空 ',
        'LP' : '秘鲁航空',
        '6H' : '以斯雷航空',
        'XG' : '',
        'XY' : '埃佛雷航空服务   ',
        'Z6' : '第聂珀拉航空  ',
        'Z8' : '',
        'WW' : '米德兰航空巴比分公司',
        'S2' : '撒哈拉航空',
        'TO' : '总统航空',
        '7V' : '佩利肯航空 ',
        'Y5' : '佩斯航空',
        'K7' : '亚利桑那快运航空',
        'YH' : '森斯普什航空公司',
        'DY' : '挪威航空',
        'AT' : '摩洛哥王家航空公司',
        'L8' : '卢克索航空',
        'VL' : '北温哥华航空',
        'A9' : '格鲁吉亚航空公司',
        'YM' : '黑山航空公司',
        'HQ' : '国龙航空公司',
        'ST' : '德国包机航空',
        'G3' : '高尔运输航空',
        'UX' : '欧罗巴航空',
        'IZ' : '阿基亚以色列航空',
        'EL' : '日空航空',
        'BJ' : '突尼斯努威尔航空',
        'OY' : '索德尔航空',
        'ZI' : '法国蓝鹰航空',
        'EN' : '多洛米蒂航空',
        '7N' : '内陆航空 ',
        'SA' : '南非航空',
        'WS' : '西捷航空',
        'DT' : '哥拉航空',
        'HO' : '吉祥航空',
        'HM' : '塞舌尔航空',
        'HP' : '亚美利加西方航空',
        'HV' : '泛航航空',
        'HU' : '海航',
        'HY' : '乌兹别克斯坦航空',
        'HX' : '香港航空',
        'IC' : '印度航空',
        'IB' : '西班牙航空',
        'IH' : '猎鹰航空',
        'IG' : '默里迪恩纳航空',
        'IF' : '大华航空',
        'IE' : '所罗门航空',
        'II' : '商业航空',
        'IJ' : '欧洲跨地区航空',
        'IL' : '伊斯坦布尔航空',
        'EU' : '成都航空',
        'IR' : '伊朗航空',
        'IT' : '印度翠鸟',
        'IW' : '乌特雷默法国航空',
        'JB' : '喷气直升机航空',
        'JE' : '曼克斯航空',
        'JD' : '首都航空',
        'JH' : '诺德斯特航空',
        'JP' : '亚得利亚航空',
        'JL' : '日本航空',
        'JM' : '牙买加航空',
        'JK' : '斯潘航空',
        'EZ' : '斯堪的纳维亚太阳航空',
        'JY' : '泽西欧洲航空',
        'JW' : '箭航空',
        'JU' : '南斯拉夫航空',
        'JR' : '幸福航空',
        'JS' : '朝鲜民航',
        'KB' : '德鲁克航空',
        'KA' : '港龙航空',
        'KF' : '博特尼亚航空',
        'KE' : '大韩航空',
        'KD' : '肯德尔航空',
        'KP' : '基维国际航空',
        'KQ' : '肯尼亚航空',
        'KR' : '卡尔航空',
        'KK' : '地区航空运输',
        'KL' : '荷兰王家航空',
        'KM' : '马耳他航空',
        'KN' : '联合航空',
        'KW' : '狂欢节航空',
        'KX' : '开曼航空',
        'KU' : '科威特航空',
        'LA' : '智利国家航空',
        'LC' : '加勒比航空',
        'LI' : '背风群岛航空',
        'LH' : '德国汉莎航空',
        'LJ' : '塞拉国家航空',
        'LD' : '香港航空货运',
        'AE' : '华信航空',
        'B7' : '立荣航空',
        'EY' : '阿提哈德航空公司',
        'KC' : '阿斯塔那航空',
        'NX' : '澳航',
        'QR' : '卡塔尔航空',
        'S7' : 'S7航空',
        'UN' : '环空航空',
        'UO' : '港联航空公司',
        'XF' : '海参崴航空',
        'CA' : '国航',
        'CZ' : '南航',
        'MU' : '东航',
        'FM' : '上航',
        'MF' : '厦航',
        'HU' : '海航',
        'ZH' : '深航',
        '3U' : '川航',
        'SC' : '山航',
        'PN' : '西部航空有限责任',
        'J2' : '阿塞拜疆航空',
        'G5' : '华夏航空',
        'JJ' : '巴西天马航空',
        'AY' : '芬兰航空',
        'AY' : '芬兰航空',
        'VV' : '乌克兰空中世界航空',
        'LG' : '卢森堡航空',
        'VT' : '塔希提航空',
        'VU' : '象牙航空',
        'VS' : '维尔京大西洋航空',
        'VP' : '圣保罗航空',
        'VN' : '越南航空',
        'VO' : '蒂罗林航空',
        'VM' : '法国地区航空',
        'VK' : '通加鲁航空',
        'VI' : '别克斯航空',
        'ET' : '埃塞俄比亚航空',
        'VE' : '委内瑞拉航空',
        'VD' : '河南航空',
        'VA' : '维珍澳洲航空公司',
        'UY' : '喀麦隆航空',
        'EQ' : '厄瓜多尔军运航航空',
        'UU' : '奥斯特拉尔航空',
        'US' : '合众国航空',
        'UM' : '津巴布韦',
        'UP' : '巴哈马航空',
        'EH' : '厄瓜多尔航空',
        'UK' : '联合王国航空',
        'UL' : '兰卡航空',
        'UG' : '突尼斯空运',
        'UB' : '缅甸航空',
        'UA' : '美国联合航空',
        'EF' : '远东航空运输',
        'UD' : '赫克斯航空',
        'UC' : '拉德科智利航空',
        'TY' : '喀里多尼亚航空',
        'TU' : '突尼斯航空',
        'TW' : '环球航空',
        'XQ' : '行动航空',
        'XW' : '中国新华航空',
        'XJ' : '梅萨巴航空',
        'XK' : '地中海科西嘉航空',
        'XO' : '中国新疆航空',
        'EK' : '阿联酋航空',
        'WY' : '阿曼航空',
        'WX' : '安塞特快运',
        'WR' : '汤加皇家航空',
        'WT' : '尼日利亚航空',
        'WH' : '中国西北航空',
        'WI' : '贸易风国际航空',
        'EI' : '爱尔兰航空',
        'WL' : '太平洋大西洋航空',
        'WM' : '向风群岛国际航空',
        'WN' : '西南航空',
        'WB' : '国民航空服务',
        'WF' : '挪威维德勒航空',
        'WE' : '莱茵山航空',
        'VX' : '哥伦比亚中央航空',
        'RI' : '曼达拉航空',
        'RG' : '巴西航空',
        'GD' : '塔埃萨航空',
        'RD' : '诺瓦航空',
        'RC' : '大西洋航空',
        'RB' : '叙利亚阿拉伯航空',
        'RQ' : '英基阿地纳航空',
        'RO' : '罗马尼亚航空',
        'GE' : '台湾复兴',
        'RK' : '非洲航空',
        'RJ' : '约旦王家航空',
        'QX' : '地平线航空',
        'QU' : '乌干达航空',
        'QV' : '老挝航空',
        'QS' : '塔特拉航空',
        'QQ' : '里诺航空',
        'GF' : '海湾航空',
        'RA' : '尼泊乐王家航空',
        'EU' : '成都航空',
        'QY' : '欧洲航空运输',
        'QF' : '澳洲航空',
        'QA' : '加勒比航空',
        'NH' : '全日空',
        'GA' : '印度尼西亚航空',
        'QM' : '马拉维航空',
        'QP' : '肯尼亚航空',
        'QL' : '莱索托航空',
        'QK' : '诺瓦航空',
        'PT' : '瑞典西方航空',
        'PU' : '乌拉圭国家航空',
        'PR' : '菲律宾航空',
        'PX' : '新几内亚航空',
        'PY' : '苏里南航空',
        'TG' : '泰国国际航空',
        'TE' : '立陶宛航空',
        'TK' : '土耳其航空',
        'TM' : '莫桑比克航空',
        'TR' : '环巴西航空',
        'TQ' : '环瑞典航空',
        'TP' : '葡萄牙航空',
        'SU' : '俄罗斯航空',
        'SV' : '沙特阿拉伯航空',
        'SY' : '阳光地区航空',
        'SZ' : '塔吉克斯坦索蒙航空',
        'SW' : '纳米比亚航空',
        'TC' : '坦桑尼亚航空',
        'TA' : '塔卡国际航空',
        'SD' : '苏丹航空',
        'SC' : '山航',
        'SF' : '包机航空',
        'SE' : '达伊罗货运航空',
        'SJ' : '南方航空运输',
        'SL' : '里奥南部地区航空服务',
        'SK' : '北欧航空',
        'SN' : '布鲁塞尔航空',
        'SP' : '亚速尔航空',
        'SR' : '瑞士航空',
        'SQ' : '新加坡航空',
        'RS' : '洲际航空',
        'RV' : '里夫阿留申航空',
        'RY' : '江西航空',
        'SB' : '喀里多尼亚国际航空',
        'FR' : '瑞安航空',
        'YZ' : '几内亚比绍运输',
        'ZH' : '深航',
        'ZB' : '群主航空',
        'ZC' : '斯威士兰皇家航空',
        'ZQ' : '新西兰安塞特航空',
        'ZK' : '格雷特湖航空',
        'ZM' : '扎伊尔夏依波空运',
        'ZL' : '黑泽尔顿航空',
        'ZV' : '中西部航空',
        'ZY' : '伊兹尼斯航空',
        'ZR' : '穆克航空',
        'YP' : '劳埃德航空',
        'YN' : '魁北克航空',
        'YX' : '中西部捷运',
        'YU' : '多米尼加空运',
        'YR' : '风景航空',
        'FQ' : '阿鲁巴航空',
        '3J' : '阿莱恩斯航空',
        '6Y' : '尼加拉瓜航空',
        'FJ' : '太平洋航空',
        '6V' : '维加斯航空',
        '7F' : '冠军航空',
        'FM' : '上航',
        '7H' : '纪元航空',
        '5X' : '联合包裹',
        '6A' : '阿维亚克萨航空',
        'FG' : '阿里亚纳阿富汗航空',
        '6E' : '马尔莫航空',
        'FF' : '宝塔航空',
        '6U' : '乌克兰航空',
        '4V' : '船夫航空',
        'FI' : '冰岛航空',
        '5L' : '玻利维亚航空',
        'HF' : '哈帕克劳埃德航空',
        '3U' : '川航',
        '4D' : '西奈航空',
        '4N' : '北部航空',
        '9U' : '摩尔多瓦航空',
        'HD' : '纽约直长机',
        '9W' : '捷特航空',
        '9N' : '跨州航空',
        '9P' : '帕兰吉航空',
        '9L' : '科尔根航空',
        '9E' : '捷运航空',
        '9A' : '大西洋航空',
        '9C' : '吉尔航空',
        '8L' : '祥鹏航空',
        '8G' : '万能捷运',
        'HA' : '夏威夷航空',
        'GY' : '贵州航空',
        'GV' : '里加航空',
        'GU' : '危地马拉航空',
        'GQ' : '高天航空',
        'GN' : '加蓬航空',
        'TN' : '大溪地航空',
        'DJ' : '维珍蓝航空',
        'SA' : '南非航空',
        'GK' : '日本捷星航空',
        'Y8' : '扬子江航空'
        }
        for (var idx in airline_list){
          if (airline_list[idx] == data) {
            return idx
          }
        }
    },
    formatFlightListRequestPramas(){
      let params = {};

      if(this.route == 1 || this.route == 2){
        params.route_type = this.route;
        params.direct = this.filter.nonStop;
        params.adult_quantity = this.filter.adult;
        params.child_quantity = this.filter.child;
        params.cabin_class = this.filter.cabinClass;
        params.airline = this.airlineCompany(this.filter.airline_company);
      }else{
        params.route_type = this.route;
      }

      switch (this.route) {
        case 1:
          params.segment_list = [];
          params.segment_list.push(
            {
              depart_airport_code: this.filter.departCity,
              arrive_airport_code: this.filter.arriveCity,
              depart_date: format.date(this.filter.startTime)
            }
          );
          break;
        case 2:
          params.segment_list = [];
          params.segment_list.push(
            {
              depart_airport_code: this.filter.departCity,
              arrive_airport_code: this.filter.arriveCity,
              depart_date: format.date(this.filter.startTime)
            }
          );
          params.segment_list.push(
            {
              depart_airport_code: this.filter.arriveCity,
              arrive_airport_code: this.filter.departCity,
              depart_date: format.date(this.filter.backTime)
            }
          );
          break;
        case 3:
          params = Object.assign(params, this.multipassFilter);
          params.segment_list.forEach((segment) => {
            segment.depart_date = format.date(segment.depart_date)
          });
          break;
      }

      return params;
    },
    hasRefundsHandler(flightId, flightKey){
      if(this.flightList[flightKey].refunds)return;
      let params = {
        data:{
          price_id: flightId
        }
      }
      this.refundsLoading = true;
      getForeignFlightRefund({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          this.refundsLoading = false;
          if(code == 0){
            this.$set(this.flightList[flightKey], 'refunds', data);
            this.$set(this.cacheFlightList[flightId], 'refunds', data);
          }else{
            this.$message.error(msg);
          }
        }
      });
    },
    validatorFilterItem(){
      let valid = true;
      if(this.route == 1 || this.route == 2){
        if(!this.filter.departCity){
          this.$message.error('请选择出发城市');
          return valid = false;
        }
        if(!this.filter.arriveCity){
          this.$message.error('请选择到达城市');
          return valid = false;
        }
        if(!this.filter.startTime){
          this.$message.error('请选择出发日期');
          return valid = false;
        }
        if(this.route == 2 && !this.filter.backTime){
          this.$message.error('请选择返程日期');
          return valid = false;
        }
      }else{
        for(let i = 0; i < this.multipassFilter.segment_list.length; i++ ){
          if(!this.multipassFilter.segment_list[i].depart_airport_code){
            this.$message.error('请选择第' + (i + 1) + '程出发城市');
            valid = false;
            break;
          }
          if(!this.multipassFilter.segment_list[i].arrive_airport_code){
            this.$message.error('请选择第' + (i + 1) + '程到达城市');
            valid = false;
            break;
          }
          if(!this.multipassFilter.segment_list[i].depart_date){
            this.$message.error('请选择第' + (i + 1) + '程出发时间');
            valid = false;
            break;
          }
        }
      }
      if(this.filter.child > this.filter.adult*2){
          this.$message.error('每个成人最多携带两名儿童');
          return valid = false;
        }
      return valid;
    },
    addJourneyHandler(key){
      let segmentList = this.multipassFilter.segment_list;
      if(segmentList.length == 6){
        this.$message.error('最多添加6个行程');
        return false;
      }
      segmentList.splice(key + 1, 0, {
        depart_airport_code: '',
        arrive_airport_code: '',
        depart_date: ''
      });
    },
    delJourneyHandler(key){
      let segmentList = this.multipassFilter.segment_list;
      segmentList.splice(key, 1);
    },
    changeStartTime(){
    },
    sortAndScreenFlightListDataHandler(){
      if(!this.cacheFlightList)return;

      this.flightList = JSON.parse(JSON.stringify(Object.values(this.cacheFlightList)));
      if(this.screen.airline || this.screen.time || this.screen.transfer){
        this.flightList = this.flightList.filter((flight) => {
          let hasCompany = !Boolean(this.screen.airline) && true,
              hasTime = !Boolean(this.screen.time) && true,
              hasCity = !Boolean(this.screen.transfer) && true,
              journeys = flight.journey_list,
              journeylen = journeys.length;

          if(!hasCompany){
            for(let i = 0; i < journeylen; i++){
              if(hasCompany)break;
              for(let ii in journeys[i].segment_list){
                if(journeys[i].segment_list[ii].airline_company == this.screen.airline){
                  hasCompany = true;
                  break;
                }
              }
            }
          }
          if(!hasTime){
            for(let j = 0; j < journeylen; j++){
              if(journeys[j].departure_time_flag == this.screen.time){
                hasTime = true;
              }
            }
          }
          if(!hasCity){
            for(let k = 0; k < journeylen; k++){
              if(journeys[k].transfer_city){
                let transfer = JSON.parse(journeys[k].transfer_city);
                if(transfer.city.indexOf(this.screen.transfer) > -1){
                  hasCity = true;
                  break;
                }
              }
            }
          }
          return hasCompany && hasTime && hasCity;
        });
      }

      switch(this.sort.sortName){
        case 'departDate':
            this.sortFlightForDepartDate();
            break;
        case 'arriveDate':
            this.sortFlightForArriveDate();
            break;
        case 'duration':
            this.sortFlightForDuration();
            break;
        case 'price':
            this.sortFlightForPrice();
            break;
      }
    },
    sortFlightForDepartDate(){
      this.flightList.sort((flight1, flight2) => {
        let date1 = new Date(flight1.journey_list[0].departure_time).getTime(),
            date2 = new Date(flight2.journey_list[0].departure_time).getTime();
        if(this.sort.sortPositive){
          return date1 - date2;
        }else{
          return - (date1 - date2);
        }
      });
    },
    sortFlightForArriveDate(){
      this.flightList.sort((flight1, flight2) => {
        let date1 = new Date(flight1.journey_list[0].arrival_time).getTime(),
            date2 = new Date(flight2.journey_list[0].arrival_time).getTime();

        if(this.sort.sortPositive){
          return date1 - date2;
        }else{
          return - (date1 - date2);
        }
      });
    },
    sortFlightForDuration(){
      this.flightList.sort((flight1, flight2) => {
        let formatDuration = (time) => {
              let h = time.split(':')[0],
                  m = time.split(':')[1];
              return h * 3600000 + m * 60000;
            },
            date1 = formatDuration(flight1.journey_list[0].duration),
            date2 = formatDuration(flight2.journey_list[0].duration);

        if(this.sort.sortPositive){
          return date1 - date2;
        }else{
          return - (date1 - date2);
        }
      });
    },
    sortFlightForPrice(){
      this.flightList.sort((flight1, flight2) => {
        let price1 = flight1.adult_base_fare,
            price2 = flight2.adult_base_fare;

        if(this.sort.sortPositive){
          return price1 - price2;
        }else{
          return - (price1 - price2);
        }
      });
    },
    changeGridSortHander(sortName){
      let sort = this.sort;

      if(sortName == sort.sortName){
        sort.sortPositive = !sort.sortPositive;
      }else{
        sort.sortName = sortName;
        sort.sortPositive = true
      }

      this.sortAndScreenFlightListDataHandler();
    },
    countDurationDays(depart, arrive){
      depart = new Date(depart).getTime();
      arrive = new Date(arrive).getTime();
      return (arrive - depart)/86400000;
    },
    exchangeDepartAndArriveCity(){
      if (this.rescheduled.tag==2) {
        return
      }
      let tmp = "";
      tmp = this.filter.arriveCity;
      this.$set(this.filter, 'arriveCity', this.filter.departCity);
      this.$set(this.filter, 'departCity', tmp);
    }
  },
  mounted(){
    this.initFilterFormData();
    if(this.$route.query.option){
      this.requestFlightListHandler();
    }
  }
}
</script>

<style lang="less" scoped>
.flight {
  .filter{
    margin-bottom: 15px;
    .route-type{
      padding: 10px 20px;
    }
    .search-panel{
      .el-button{
          text-align: center;
          padding-right: 0;
          padding-left: 0;
          width: 130px;
          border-radius: 4px;
      }
    }
  }
  .search-content{
    display: box;             /* OLD - Android 4.4- */
    display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;     /* TWEENER - IE 10 */
    display: -webkit-flex;   /* NEW - Chrome */
    display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */

    .search-panel{
      width:285px;
      margin-right: 10px;
      &.search-panel-city{
        position: relative;
        padding-right: 40px;
        .search-city{
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
        }
      }
    }
  }
  .search-more-content{
    .search-panel-item{
      display: box;             /* OLD - Android 4.4- */
      display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;     /* TWEENER - IE 10 */
      display: -webkit-flex;   /* NEW - Chrome */
      display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
      padding: 0 20px;
      .num{
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        color: #ae1f77;
        background-color: #fdeef8;
        margin-top: 10px;
        margin-right: 10px;
      }
      .inputs{
        display: box;             /* OLD - Android 4.4- */
        display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;     /* TWEENER - IE 10 */
        display: -webkit-flex;   /* NEW - Chrome */
        display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
      }
      .del,.add{
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        font-size: 24px;
        margin-top: 4px;
        margin-left: 5px;
        color: #49494a;
        cursor: pointer;
      }
    }
  }
}
.flight-grid{
  .screen-list{
    background-color: #fafafa;
    padding: 10px 15px;
    .el-select{
      width: 150px;
    }
  }
  .flight-sort{
    display: box;             /* OLD - Android 4.4- */
    display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;     /* TWEENER - IE 10 */
    display: -webkit-flex;   /* NEW - Chrome */
    display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
    -webkit-box-pack: space-between;/*start     center end    justify*/
    /* 12版 */
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    justify-content: space-between;
    -webkit-flex-pack: space-between;
    /* 09版 */
    -webkit-box-align: center;
    /* 12版 */
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    padding: 10px 15px;
    background-color: #fff;
    margin-bottom: 10px;

    .sort-list{
      display: box;             /* OLD - Android 4.4- */
      display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;     /* TWEENER - IE 10 */
      display: -webkit-flex;   /* NEW - Chrome */
      display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
      width: 400px;

      .sort-item{
        -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1;        /* OLD - Firefox 19- */
        width: 20%;            /* For old syntax, otherwise collapses. */
        -webkit-flex: 1;          /* Chrome */
        -ms-flex: 1;              /* IE 10 */
        flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
        color: #999999;
        cursor: pointer;

        &.selected{
          color: #aa177a;
        }
      }
    }
    .sort-other{
      display: box;             /* OLD - Android 4.4- */
      display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;     /* TWEENER - IE 10 */
      display: -webkit-flex;   /* NEW - Chrome */
      display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
      /* 09版 */
      -webkit-box-align: center;
      /* 12版 */
      -webkit-align-items: center;
      -moz-align-items: center;
      -ms-align-items: center;
      -o-align-items: center;
      align-items: center;
    }
    .tax-switch{
      display: box;             /* OLD - Android 4.4- */
      display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;     /* TWEENER - IE 10 */
      display: -webkit-flex;   /* NEW - Chrome */
      display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
      border: 1px solid #cccccc;
      margin-left: 10px;

      .off{
        border-right: 1px solid #ccc;
      }

      .off,.on{
        padding: 5px 10px;

        &.selected{
          background-color: #eeeeee;
          color:#999999;
        }
      }
    }
  }
}
.flight-list{
  .flight-item{
    margin-bottom: 10px;
    .outline{
      display: box;             /* OLD - Android 4.4- */
      display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;     /* TWEENER - IE 10 */
      display: -webkit-flex;   /* NEW - Chrome */
      display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
      -webkit-box-align: center;
      /* 12版 */
      -webkit-align-items: center;
      -moz-align-items: center;
      -ms-align-items: center;
      -o-align-items: center;
      align-items: center;
      background-color: #fff;
      padding: 30px 0;
      border-bottom: 1px solid #e4e4e4;

      > div{
        text-align: center;
        p{
          font-size: 18px;
        }
        span{
          color: #999999;
        }
      }
      .airline{
        -webkit-box-flex: 0 1 220px;      /* OLD - iOS 6-, Safari 3.1-6 */
        -webkit-flex:  0 1 220px;         /* Chrome */
        -ms-flex:  0 1 220px;              /* IE 10 */
        flex:  0 1 220px;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */
      }
      .time{
        display: box;             /* OLD - Android 4.4- */
        display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;     /* TWEENER - IE 10 */
        display: -webkit-flex;   /* NEW - Chrome */
        display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
        -webkit-box-align: center;
        /* 12版 */
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        -webkit-box-flex: 0 1 280px;      /* OLD - iOS 6-, Safari 3.1-6 */
        -webkit-flex:  0 1 280px;         /* Chrome */
        -ms-flex:  0 1 280px;              /* IE 10 */
        flex:  0 1 280px;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */

        .depart,.arrive{
          width: 120px;
          .days{
            font-style: normal;
            font-size: 12px;
            color: #ff6600;
          }
        }
        .arrows {
          position: relative;
          display: block;
          width: 40px;
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
      }
      .duration{
        -webkit-box-flex: 0 1 180px;      /* OLD - iOS 6-, Safari 3.1-6 */
        -webkit-flex:  0 1 180px;         /* Chrome */
        -ms-flex:  0 1 180px;              /* IE 10 */
        flex:  0 1 180px;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */
      }
      .stop{
        -webkit-box-flex: 0 1 100px;      /* OLD - iOS 6-, Safari 3.1-6 */
        -webkit-flex:  0 1 100px;         /* Chrome */
        -ms-flex:  0 1 100px;              /* IE 10 */
        flex:  0 1 100px;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */
      }
      .transfer{
        -webkit-box-flex: 0 1 100px;      /* OLD - iOS 6-, Safari 3.1-6 */
        -webkit-flex:  0 1 100px;         /* Chrome */
        -ms-flex:  0 1 100px;              /* IE 10 */
        flex:  0 1 100px;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */
      }
      .tools{
        -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
        -webkit-flex:  1;         /* Chrome */
        -ms-flex:  1;              /* IE 10 */
        flex:  1;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */
        text-align: right;
        padding-right: 50px;
        a{
          columns: #ae1f77;
        }
      }
    }
    .details{
      background-color: #fff;
      padding: 0 30px;

      .voyage-item{
        position: relative;
        padding: 20px 0 20px 90px;
        border-bottom: 1px solid #e4e4e4;
        &:last-child{
          border-bottom: 0;
        }
        .num{
          position: absolute;
          left: 10px;
          color: #fff;
          background-color: #ae1f77;
          padding:0 3px;
          border-radius: 2px;
        }
        .journey{
          p{
            margin-bottom: 5px;
          }
        }
        .dim{
          color: #999999;
          &.ml80{
            margin-left: 80px;
          }
        }
        .lighting{
          display: inline-block;
          padding: 0 3px;
          background-color: #fdeef8;
          color: #ae1f77;
          border-radius: 2px;
          margin: 0 5px;
        }
        .other{
          margin: 15px 0;
          padding: 5px 0;
          text-align: center;
          color: #999999;
          background-color: #f8f8f8;
          width: 500px;
          .dim{
            color: #ae1f77;
          }
        }
      }
    }
    .cabin{
      display: box;             /* OLD - Android 4.4- */
      display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;     /* TWEENER - IE 10 */
      display: -webkit-flex;   /* NEW - Chrome */
      /* 09版 */
      -webkit-box-align: center;
      /* 12版 */
      -webkit-align-items: center;
      -moz-align-items: center;
      -ms-align-items: center;
      -o-align-items: center;
      align-items: center;
      -webkit-box-pack: space-between;/*start     center end    justify*/
      /* 12版 */
      -webkit-justify-content: space-between;
      -moz-justify-content: space-between;
      -ms-justify-content: space-between;
      -o-justify-content: space-between;
      justify-content: space-between;
      -webkit-flex-pack: space-between;
      padding: 15px 0;
      background-color: #f4f4f4;

      .cabin-lt{
        display: box;             /* OLD - Android 4.4- */
        display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;     /* TWEENER - IE 10 */
        display: -webkit-flex;   /* NEW - Chrome */
        /* 09版 */
        -webkit-box-align: center;
        /* 12版 */
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;

        .class,.bill{
          width: 150px;
          text-align: center;
        }
        .rules{
          width: 200px;
          text-align: center;
        }
        .bill,.rules{
          color: #1a75ff;
        }
      }
      .cabin-rt{
        display: box;             /* OLD - Android 4.4- */
        display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;     /* TWEENER - IE 10 */
        display: -webkit-flex;   /* NEW - Chrome */
        /* 09版 */
        -webkit-box-align: center;
        /* 12版 */
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;

        .tax-price{
          text-align: right;
          .unit,.price{
            color: #ff6600;
          }
          .price{
            font-size: 20px;
            font-weight: 700;
          }
          .tax{
            margin-left: 5px;
            color: #999999;
          }
        }

        .reserve{
          width: 90px;
          text-align: center;
          a{
            display: inline-block;
            background-color: #ae1f77;
            padding: 4px 8px;
            color: #fff;
            border-radius: 4px;
          }
        }
        .redundant{
          width: 80px;
          text-align: center;
          color: #ae1f77;
        }
      }
    }
  }
}
.refunds,.cabin {
    min-height: 50px;
    table{
      border-collapse: collapse;
      max-width: 600px;
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
    .refunds-scroll{
      max-height: 300px;
      overflow: hidden;
      overflow-y: auto;
    }
}
.cabin{
  table{
    width: auto;
  }
}
.flight-tips {
  padding: 8px 0;
  text-align: center;
  background-color: #fff;
  color: #999;
}
</style>
