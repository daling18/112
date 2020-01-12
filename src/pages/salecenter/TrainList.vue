<template>
  <div class="wrapper">
    <div class="system-search">
      <div class="bd">
        <div class="search-panel search-citycode">
          <div class="search-item">
            <div class="label">出发城市</div>
            <train-city-pick v-model="filter.fromStation" :disabled="!!this.filter.order_id"></train-city-pick>
          </div>
          <!-- <div class="exchange"></div> -->
          <div class="search-item">
            <div class="label">到达城市</div>
            <train-city-pick v-model="filter.toStation" :disabled="!!this.filter.order_id"></train-city-pick>
          </div>
          <div class="exchange" @click="exchangeCityCode"></div>
        </div>
        <div class="search-panel">
          <div class="search-item">
            <div class="label">出发日期</div>
            <el-date-picker
              v-model="filter.trainDate"
              :picker-options="datepickerOptions"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="出发日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="search-panel">
          <el-button type="primary" @click="handleSearchTrain">立即搜索</el-button>
        </div>
      </div>
    </div>

    <div class="system-content">
      <div class="content-list">
        <el-table :data="trainData">
          <el-table-column label="车次/类型" prop="trainNo"></el-table-column>
          <el-table-column label="发站/到站">
            <template slot-scope="scope">{{scope.row.fromStation}} - {{scope.row.toStation}}</template>
          </el-table-column>
          <el-table-column label="出发时间/到达时间" prop>
            <template slot-scope="scope">{{scope.row.fromTime}} - {{scope.row.toTime}}</template>
          </el-table-column>
          <el-table-column label="运行时间" prop="run_time"></el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="scope">
              <p v-for="ticketType in scope.row.ticket_types" :key="ticketType.seat_class">
                <span class="ticket_name">{{ticketType.name}}</span>
                <span class="ticket_price">{{ticketType.price}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column label="剩余票数">
            <template slot-scope="scope">
              <p
                v-for="ticketType in scope.row.ticket_types"
                :key="ticketType.seat_class"
              >{{ticketType.num}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <p v-for="ticketType in scope.row.ticket_types" :key="ticketType.seat_class">
                <el-link @click="handleEeserve(scope.row, ticketType)">预订</el-link>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getTrainList } from "src/api/train";
import * as format from "src/utils/format";
import TrainCityPick from "./components/TrainCityPick.vue";
import Qs from "qs";

export default {
  data() {
    let query = this.$route.query;
    return {
      trainData: [],
      filter: {
        seatClass: "",
        fromStation: {},
        toStation: {},
        trainDate: "",
        tourist_ids: null,
        order_no: ""
      },
      datepickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() > Date.now() + 24 * 60 * 60 * 1000 * 30 - 8.64e7
          );
        }
      }
    };
  },
  computed: {
    query() {},
    fromStation() {
      return this.filter.fromStation.station_name || "";
    },
    toStation() {
      return this.filter.toStation.station_name || "";
    },
    trainDate() {
      return this.filter.trainDate || "";
    }
  },
  components: {
    TrainCityPick
  },
  watch: {
    $route() {
      this.initSearchTrainFilter();
    }
  },
  methods: {
    initSearchTrainFilter() {
      let filter = this.$route.query.filter;
      if (filter) {
        this.filter = Qs.parse(filter);
        this.handleSearchTrainRequset();
        this.trainData = null;
      }
    },
    validate(val) {
      if (!val.fromStation) {
        this.$message({
          message: "请选择出发站",
          type: "error"
        });
        return false;
      }
      if (!val.toStation) {
        this.$message({
          message: "请选择目的地",
          type: "error"
        });
        return false;
      }
      if (!val.trainDate) {
        this.$message({
          message: "请选择出发日期",
          type: "error"
        });
        return false;
      }
      return true;
    },
    handleSearchTrain() {
      let filter = this.filter;
      let postParams = {
        toStation: this.toStation,
        fromStation: this.fromStation,
        trainDate: this.trainDate
      };

      if (!this.validate(postParams)) {
        return;
      }
      this.$router.replace({
        path: this.$route.path,
        query: {
          filter: Qs.stringify(this.filter),
          time: Date.now()
        }
      });
    },
    handleSearchTrainRequset() {
      let params = {
        data: {
          toStation: this.toStation,
          fromStation: this.fromStation,
          trainDate: this.trainDate,
          order_no: this.filter.order_no || ""
        }
      };
      // params['data'].train_date = format.date(params['data'].train_date);
      getTrainList({
        params,
        success: res => {
          let { code, data, msg } = res["data"];
          if (code == 0) {
            this.trainData = [...data.trains, ...data.other_trains]
              .map(item => {
                item.ticket_types = item.ticket_types.filter(
                  ticket => ticket.num !== "0张"
                ); // 过滤0 张坐席
                return item;
              })
              .filter(item => {
                return item.ticket_types.length !== 0;
              });
          } else {
            this.trainData = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleToTrainTicketCheckout(classes, zwcode) {
      let { order_no, order_id, tourist_ids } = this.filter,
        {
          from_station_name,
          from_station_code,
          to_station_name,
          to_station_code,
          train_no,
          train_date
        } = classes,
        query = {
          zwcode,
          train_info: {
            from_station_name,
            from_station_code,
            to_station_name,
            to_station_code,
            train_no,
            train_date
          }
        },
        encodeStr;
      if (order_no && tourist_ids && order_id) {
        query.order_no = order_no;
        query.tourist_ids = tourist_ids;
        query.order_id = order_id;
      }
      this.$router.push({
        path: "/salecenter/train-checkout",
        query: {
          params: window.btoa(window.encodeURIComponent(JSON.stringify(query)))
        }
      });
    },
    // 交换城市切换
    exchangeCityCode() {
      // 交换出发 到达
      [this.filter.fromStation, this.filter.toStation] = [
        this.filter.toStation,
        this.filter.fromStation
      ];
    },
    handleEeserve(train = {}, ticket = {}) {
      let params = {
        ...this.filter,
        trainNo: train.trainNo,
        seatClass: ticket.seat_class,
        fromStationCode: train.fromStationCode,
        toStationCode: train.toStationCode
      };
      // let query = {
      //   seatClass: ticket.seat_class,
      //   trainInfo:{
      //     fromStationCode: train.fromStationCode,
      //     toStationCode: train.toStationCode,
      //     trainNo: train.trainNo,
      //     trainDate: train.trainDate
      //   }
      // };

      this.$router.push({
        path: "/salecenter/train-checkout",
        query: {
          // params: Qs.stringify(query),
          filter: Qs.stringify(params)
        }
      });
    }
  },
  mounted() {
    this.initSearchTrainFilter();
  }
};
</script>

<style lang="less" scoped>
.search-panel.search-citycode {
  .search-item {
    padding-right: 0;
    float: none;
  }
}
.train-inland-content {
  background: #fff;
}
.train-grid-table {
  width: 100%;
  tr:last-child {
    td {
      border-bottom: 0;
    }
  }
  th {
    height: 45px;
    line-height: 45px;
    background: #f4f4f4;
    color: #999;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid #ccc;
  }
  td {
    border: 1px solid #ccc;
    padding: 8px 5px;
    color: #333;
    text-align: center;
    font-size: 14px;
    .seat-info {
      p {
        line-height: 30px;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .ticket_name {
      width: 80px;
      display: inline-block;
      margin-right: 20px;
      text-align: right;
    }
    .runs-num {
      font-size: 18px;
      font-weight: 700;
    }
    .runs-time {
      font-weight: 700;
    }
    .mark-text {
      display: inline-block;
      padding: 1px;
      line-height: 12px;
      font-size: 12px;
      border-radius: 3px;
    }
    .start-txt {
      border: 1px solid #019f3d;
      color: #019f3d;
    }
    .end-txt {
      border: 1px solid #f60;
      color: #f60;
    }
    .middle-time {
      font-size: 12px;
      color: #949496;
    }
    .seat {
      color: #999;
      &.none strong {
        color: #999;
      }
      strong {
        margin-left: 25px;
        color: #f60;
        font-weight: 700;
      }
    }
    .status-less {
      color: #f00;
    }
    .status-none {
      color: #999;
    }
    .el-button.el-button--primary {
      padding: 8px 25px;
      margin-bottom: 5px;
    }
  }
}
.popover-graid-table {
  width: 100%;
  th {
    height: 45px;
    line-height: 45px;
    background: #f4f4f4;
    color: #333;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
  td {
    font-size: 14px;
    color: #333;
    text-align: center;
    padding: 8px 5px;
  }
}
.el-button + .el-button {
  margin: 0;
}

.el-table--middle {
  .ticket_name {
    width: 80px;
    display: inline-block;
    margin-right: 20px;
    text-align: right;
  }
}
.warm-tip {
  background: #fff;
  padding: 70px 0 130px;
  p {
    text-align: center;
    padding-top: 85px;
    color: #5e7382;
    background: url("../../assets/icons/empty_data.png") no-repeat center top;
    background-size: 80px 60px;
  }
}
</style>
