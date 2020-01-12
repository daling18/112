<template>
    <div class="flight">
        <div class="filter">
            <div class="el-tabs el-tabs--border-card">
                <div class="el-tabs__header">
                    <div class="el-tabs__nav-wrap">
                        <div class="el-tabs__nav">
                            <div class="el-tabs__item is-active">
                                国内机票
                            </div>
                            <div v-if="$menuPermission('api/intl_flight/inquiry')" class="el-tabs__item" @click="$router.push({ name: 'DistributionFlightInternation'})">
                                国际机票
                            </div>
                        </div>
                    </div>
                </div>
                <div class="el-tabs__content">
                    <div class="system-search">
                        <div class="hd">
                            <el-radio class="radio" v-model="searchData.type" :label="1">单程</el-radio>
                        </div>
                        <div class="bd">
                            <div class="search-panel search-citycode">
                                <div class="search-item">
                                    <div class="label">出发城市</div>
                                    <airport-icao-picker v-model="searchData.departCityCode"></airport-icao-picker>
                                </div>
                                <div class="search-item">
                                    <div class="label">到达城市</div>
                                    <airport-icao-picker v-model="searchData.arriveCityCode"></airport-icao-picker>
                                </div>
                                <div class="exchange" @click="exchangeCityCode()"></div>
                            </div>
                            <div class="search-panel">
                                <div class="search-item">
                                    <div class="label">出发日期</div>
                                    <el-date-picker v-model="searchData.startDate" :picker-options="datepickerOptions1" @change="changeStartDate" type="date" placeholder="出发日期"></el-date-picker>
                                </div>
                                <div class="search-item">
                                    <div class="label">返程日期</div>
                                    <el-date-picker v-model="searchData.backDate" :picker-options="datepickerOptions2" type="date" :disabled="isOneWay" placeholder="返程日期"></el-date-picker>
                                </div>
                            </div>
                            <div class="search-panel">
                                <el-button type="primary" @click="searchSubmit()">立即搜索</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="flightList" class="flight-grid">
            <div class="flight-grid-header">
                <div class="iatainfo">航班</div>
                <div class="departure">
                    <span class="sort" :class="{'active': orderType == 'depart_time' }" @click="setFlightListOrder('depart_time')">
                        出发时间
                        <i class="fa" :class="{'fa-sort': orderType != 'depart_time', 'fa-caret-up': order == 1 && orderType == 'depart_time', 'fa-caret-down': order == 2 && orderType == 'depart_time'}" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="direction"></div>
                <div class="arrival">
                    <span class="sort" :class="{'active': orderType == 'arrive_time' }" @click="setFlightListOrder('arrive_time')">
                        到达时间
                        <i class="fa" :class="{'fa-sort': orderType != 'arrive_time', 'fa-caret-up': order == 1 && orderType == 'arrive_time', 'fa-caret-down': order == 2 && orderType == 'arrive_time'}" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="other"></div>
                <div class="market">
                    销售价
                </div>
                <div class="price">
                    <span class="sort" :class="{'active': orderType == 'adult_base_fare' }" @click="setFlightListOrder('adult_base_fare')">
                        结算价
                        <i class="fa" :class="{'fa-sort': orderType != 'adult_base_fare', 'fa-caret-up': order == 1 && orderType == 'adult_base_fare', 'fa-caret-down': order == 2 && orderType == 'adult_base_fare'}" aria-hidden="true"></i>
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
                                <p class="flightno">{{flight.journey_segment_list[0].flight_no}} {{flight.journey_segment_list[0].craft_type}}</p>
                                <el-popover v-if="flight.journey_segment_list[0].is_share" placement="right" trigger="hover" :content="flight.journey_segment_list[0].share_airline_name + flight.journey_segment_list[0].share_flight_no">
                                    <span class="share">共享</span>
                                </el-popover>
                            </div>
                            <div class="departure">
                                <p class="time">{{flight.journey_segment_list[0].depart_time}}</p>
                                <p class="airport">{{flight.journey_segment_list[0].depart_airport_name}} {{flight.journey_segment_list[0].depart_airport_terminal}}</p>
                            </div>
                            <div class="direction">
                                <span class="toaltime">
                                    {{flight.journey_segment_list[0].duration.split(':')[0] + "小时" + flight.journey_segment_list[0].duration.split(':')[1] + "分钟"}}
                                </span>
                                <span class="arrows"></span>
                                <el-popover v-if="flight.journey_segment_list[0].stop_num" placement="right" trigger="hover" @show="getByFlightStopDetail(flight.journey_segment_list[0].flight_no,flight.journey_segment_list[0].depart_date,flightIndex)">
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
                                    <span v-if="Math.floor((new Date(flight.journey_segment_list[0].arrive_date) - new Date(flight.journey_segment_list[0].depart_date))/86400000)" class="days">
                                        +{{Math.floor((new Date(flight.journey_segment_list[0].arrive_date) - new Date(flight.journey_segment_list[0].depart_date))/86400000)}}
                                    </span>
                                </p>
                                <p class="airport">
                                    {{flight.journey_segment_list[0].arrive_airport_name}} {{flight.journey_segment_list[0].arrive_airport_terminal}}
                                </p>
                            </div>
                            <div class="other">
                                <span class="other-name">餐食</span>
                                <p class="other-info">
                                    {{flight.journey_segment_list[0].meal ? "有餐" : "无餐"}}
                                </p>
                            </div>
                            <div class="market">
                                <i>￥</i>{{flight.journey_price_list[0].adult_price}}
                                <span class="discount">({{flight.journey_price_list[0].adult_discount==1?"全价":(flight.journey_price_list[0].adult_discount * 10).toFixed(1)+'折'}})</span>
                            </div>
                            <div class="price">
                                <i>￥</i>{{flight.journey_price_list[0].adult_base_fare}}
                            </div>
                            <div class="operate"></div>
                        </div>
                        <template v-for="(price, priceIndex) in flight.journey_price_list">
                            <div class="price-row" v-show="priceIndex < 3" :class="priceIndex>2?'flight-price-row-'+flightIndex:''" :key="priceIndex">
                                <div class="cabin">{{price.cabin_list[0].seat_type}}({{ price.cabin_list[0].cabin_code }})</div>
                                <!-- <div class="bill">{{price.cabin_list[0].bill_type_name}}</div> -->
                                <div class="rule">
                                    <el-popover placement="right" width="400" trigger="hover" @show="getByFlightRefund(price.price_id,price.cabin_list[0].cabin_id,flightIndex,priceIndex)">
                                        <div class="flight-seat-list">
                                            <template v-if="price.refunds">
                                                <table>
                                                    <tr v-for="(refund, refundKey) in price.refunds.rule_infos" :key="refundKey">
                                                        <td>{{refund.rule_name}}</td>
                                                        <td>
                                                            <p>
                                                                {{refund.rule_remark}}
                                                            </p>
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
                                </div> -->
                                <div class="market">
                                    <i>￥</i>{{price.adult_price}}
                                    <span class="discount">({{price.adult_discount==1?"全价":(price.adult_discount * 10).toFixed(1)+'折'}})</span>
                                </div>
                                <div class="price">
                                    <i>￥</i>{{price.adult_base_fare}}
                                </div>
                                <div class="operate">
                                    <router-link v-if="$menuPermission('api/domestic_flight/create_order')" class="reserve" :to="{ name: 'DistributionFlightInlandCheckout', query: { typeName: 'inland', priceId: price.price_id }}">预定</router-link>
                                    <span class="surplus">剩
                                        <i>{{price.cabin_list[0].seat_status.replace(/\>/, '')}}</i> 座</span>
                                </div>
                            </div>
                        </template>
                        <div v-if="flight.journey_price_list.length > 3" @click="showMorePrice(flightIndex)" class="show-more">
                            更多舱位
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
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
import * as dom from "src/utils/dom";
import {
  getInlandFlightSpecial,
  getInlandFlight,
  getInlandFlightRefund,
  getInlandFlightStopDetail
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
        startDate: this.$route.query.startDate || today,
        backDate: this.$route.query.backDate || ""
      },
      datepickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      flightList: null,
      orderType: "",
      order: null
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
    airportIcaoPicker
  },
  watch: {
    $route() {
      this.searchFlightList();
    },
    orderType() {
      this.flightListOrderHandler();
    },
    order() {
      this.flightListOrderHandler();
    }
  },
  methods: {
    searchSubmit() {
      let searchData = {};

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

      if (!this.isOneWay) {
        searchData.backDate = format.date(searchData.backDate);
      } else {
        delete searchData.backDate;
      }
      searchData.time = new Date().getTime();
      this.$router.push({ path: this.$route.path, query: searchData });
    },
    exchangeCityCode() {
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
    searchFlightList() {
      let params = {
          data: {}
        },
        segment = {},
        query = this.$route.query;

      if (!Object.keys(query).length) return;
      params['data']["arrive_airport_code"] = query["arriveCityCode"];
      params['data']["depart_date"] = query["startDate"];
      params['data']["depart_airport_code"] = query["departCityCode"];

      getInlandFlight({
        params: params,
        success: params => {
          let { code, data, msg } = params["data"];
          if (code == 0) {
            this.flightList = data;
          }else{
            this.flightList = null;
            this.$message.error(msg);
          }
          
        },
        showLoading: true
      });
    },
    getByFlightRefund(priceId, cabinId, flightIndex, priceIndex) {
      let params = {
            data: {
              price_id: priceId,
              cabin_id: cabinId
            }
          },
          flight = this.flightList[flightIndex];

      if (flight.journey_price_list[priceIndex].refunds)return;

      getInlandFlightRefund({
        params: params,
        success: params => {
          let { data } = params["data"];
          flight.journey_price_list[priceIndex].refunds = data;
          this.$set(
            this.flightList,
            flightIndex,
            flight
          );
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
      
      if (flightPrice[0].style.display == 'none') {
        Array.prototype.map.call(flightPrice, i => i.style.display = '');
        angle.classList.add("fa-angle-up");
        angle.classList.remove("fa-angle-down");
      } else {
        Array.prototype.map.call(flightPrice, i => i.style.display = 'none');
        angle.classList.add("fa-angle-down");
        angle.classList.remove("fa-angle-up")
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
  },
  mounted() {
    this.searchFlightList();
  }
};
</script>

<style lang="less" scoped>
.flight {
  .filter {
    margin-bottom: 15px;

    .search-panel {
      .search-item {
        padding-right: 0;
        float: none;
      }
      .el-button {
        text-align: center;
        padding-right: 0;
        padding-left: 0;
        width: 130px;
        border-radius: 4px;
      }
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
        font-size: 20px;
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
        -webkit-flex: 0 0 150px;
        -ms-flex: 0 0 150px;
        flex: 0 0 150px;
        .reserve {
          display: inline-block;
          padding: 5px 10px;
          background-color: #b10c79;
          color: #fff;
          border-radius: 2px;
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
</style>
