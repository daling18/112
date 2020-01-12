<template>
  <div class="flight">
    <div class="filter">
      <div class="el-tabs el-tabs--border-card">
        <div class="el-tabs__header">
          <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav">
              <div v-if="$menuPermission('api/intl_flight/inquiry')" class="el-tabs__item" @click="$router.push({ name: 'DistributionFlightInland'})">
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
              <el-radio class="radio" v-model="route" :label="1">单程</el-radio>
              <el-radio class="radio" v-model="route" :label="2">往返</el-radio>
              <el-radio class="radio" v-model="route" :label="3">多程</el-radio>
          </div>
          <el-form v-if="route != 3" :class="'search-content'" ref="filterForm" :model="filter" label-width="80px">
            <div class="search-panel search-panel-city">
              <div class="search-city">
                <el-form-item label="出发城市">
                  <airport-icao-picker v-model="filter.departCity" no-data-text="请输入城市名称"></airport-icao-picker>
                </el-form-item>
                <el-form-item label="到达城市">
                  <airport-icao-picker v-model="filter.arriveCity" no-data-text="请输入城市名称"></airport-icao-picker>
                </el-form-item>
                <div class="exchange" @click="exchangeDepartAndArriveCity"></div>
              </div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="成人">
                    <el-select v-model="filter.adult" :class="'search-panel-number'" placeholder="请选择">
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
                    <el-select v-model="filter.child" :class="'search-panel-number'" placeholder="请选择">
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
            <div class="search-panel">
              <el-button @click="changeRouteForRequestFlightList" type="primary">立即搜索</el-button>
              <el-checkbox v-model="filter.nonStop">只查看直飞</el-checkbox>
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
                  <el-button v-if="$menuPermission('api/intl_flight/createOrder')" @click="changeRouteForRequestFlightList" type="primary">立即搜索</el-button>
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
          <el-select v-model="screen.airline" clearable placeholder="航空公司">
            <el-option v-for="(airline, key) in screenAirlineList"
              :key="key"
              :label="airline"
              :value="airline">
            </el-option>
          </el-select>
          <el-select v-model="screen.time" clearable placeholder="出发时间">
            <el-option v-for="(time, key) in screenDepartureTime" :key="key"
              :label="time"
              :value="key + 1"></el-option>
          </el-select>
          <el-select v-model="screen.transfer" clearable placeholder="中转城市">
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
          <div class="sort-item" :class="{ 'selected': sort.sortName == 'price' }" @click="changeGridSortHander('price')">
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
              <div class="tax-price">
                <span class="unit">￥</span>
                <span class="price">
                  {{ hasTax ? (flight.adult_base_fare + flight.adult_taxes) : flight.adult_base_fare }}
                </span>
                <span class="tax">
                  {{ hasTax ? '含税价' : '税费 ￥' + flight.adult_taxes }}
                </span>
              </div>
              <div class="reserve">
                <a href="javascript:;" @click="$router.push({ name: 'DistributionFlightInternationCheckout', query: { priceId: flight.id, option: $route.query.option } })">预定</a>
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
      refundsLoading: false
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
        success: (params) => {
          let { code, data, msg } = params['data'];
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
          j.departCity = airportIcaoData.filter((k) => { return k.airport_code === j.depAirport })[0].city_name_cn;
          j.arriveCity = airportIcaoData.filter((k) => { return k.airport_code === j.arriveAirport })[0].city_name_cn;
        });

        for(let b in data[i].baggages_list){
          let bags = data[i].baggages_list[b],
              empty = {};
          empty.departCity = airportIcaoData.filter((k) => { return k.airport_code === b.substring(0,3) })[0].city_name_cn;
          empty.arriveCity = airportIcaoData.filter((k) => { return k.airport_code === b.substring(3) })[0].city_name_cn;
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
    formatFlightListRequestPramas(){
      let params = {};

      if(this.route == 1 || this.route == 2){
        params.route_type = this.route;
        params.direct = this.filter.nonStop;
        params.adult_quantity = this.filter.adult;
        params.child_quantity = this.filter.child;
        params.cabin_class = this.filter.cabinClass;
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
      width:274px;
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
          width: 50px;
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
