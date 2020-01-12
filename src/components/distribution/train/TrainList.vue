<template>
<div>
  <div class="system-search">
    <div class="bd">
      <div class="search-panel search-citycode">
          <div class="search-item">
              <div class="label">出发城市</div>
              <train-city-pick v-model="filter.from_station_code" :disabled="!!this.filter.order_id"></train-city-pick>
          </div>
          <div class="search-item">
              <div class="label">到达城市</div>
              <train-city-pick v-model="filter.to_station_code" :disabled="!!this.filter.order_id"></train-city-pick>
          </div>
          <!-- <div class="exchange" @click="exchangeCityCode()"></div> -->
      </div>
      <div class="search-panel">
          <div class="search-item">
              <div class="label">出发日期</div>
              <el-date-picker v-model="filter.train_date" :picker-options="datepickerOptions" type="date" placeholder="出发日期"></el-date-picker>
          </div>
      </div>
      <div class="search-panel">
          <el-button type="primary" @click="handleSearchTrain">立即搜索</el-button>
      </div>
    </div>
  </div>
  <div class="train-inland-content">
      <!-- <el-table class="el-table--middle" border style="width: 100%">
              <el-table-column label="车次/类型" 
                               header-align="center" 
                               align="left" 
                               width="90" :resizable="false">
                  <template slot-scope="scope">
                    {{scope.row.train_code}}
                    {{scope.row.train_type_name}}
                  </template>
              </el-table-column>
              <el-table-column label="发站/到站" 
                               header-align="center" 
                               align="left" 
                               width="200" :resizable="false">
                  <template slot-scope="scope">
                    {{scope.row.from_station_name}} -
                    {{scope.row.to_station_name}}
                  </template>
              </el-table-column>
              <el-table-column prop="" 
                              label="出发时间/到达时间" 
                              header-align="center" 
                              align="center" 
                              :resizable="false">
                  <template slot-scope="scope">
                    <p>{{scope.row.start_time}}</p>
                    <p>{{scope.row.arrive_time}}</p>
                  </template>
              </el-table-column>
              <el-table-column prop="run_time" 
                              label="运行时间" 
                              header-align="center" 
                              align="center" 
                              width="120" :resizable="false">
              </el-table-column>
              <el-table-column prop="" 
                              label="销售价" 
                              header-align="center" 
                              align="left" 
                              width="200" :resizable="false">
                  <template slot-scope="scope">
                    <p v-for="(item,idx) in scope.row.ticket_types" :key="idx">
                       <span class="ticket_name">{{item.name}}</span>
                       <span class="ticket_price">{{item.price}}</span>
                    </p>
                  </template>
              </el-table-column>
              <el-table-column prop="" 
                              label="剩余票数" 
                              header-align="center" 
                              align="center" 
                              width="200" :resizable="false">
                  <template slot-scope="scope">
                   <div v-for="(item,idx) in scope.row.ticket_types" :key="idx">
                     <p>{{item.num}}</p>
                    </div>
                  </template>
              </el-table-column>
              <el-table-column prop="" 
                              label="操作" 
                              header-align="center" 
                              align="center" 
                              width="200" :resizable="false">
                  <template slot-scope="scope">
                   <div v-for="(item,idx) in scope.row.ticket_types" :key="idx">
                     <p>预定</p>
                    </div>
                  </template>
              </el-table-column>
      </el-table> -->

      <table class="train-grid-table">
        <tr>
          <th>车次/类型</th>
          <th>发站/到站</th>
          <th>出发时间/到达时间</th>
          <th>运行时间</th>
          <th width="200">销售价</th>
          <th>剩余票数</th>
          <th>操作</th>
        </tr>
        <template v-if="trainData">
        <tr v-for="(train,idx) in trainData" :key="idx">
          <td>
            {{train.train_code}}
            {{train.train_type_name}}
          </td>
          <td>
            {{train.from_station_name}} -
            {{train.to_station_name}}
          </td>
          <td>
            <p>{{train.start_time}}</p>
            <p>{{train.arrive_time}}</p>
          </td>
          <td>{{train.run_time}}</td>
          <td style="text-align:left;">
            <div v-for="(item,idx) in train.ticket_types" :key="idx" class="seat-info">
              <p v-if="item.price && item.num>0">
                <span class="ticket_name">{{item.name}}</span>
                <span class="ticket_price">{{item.price}}</span>
              </p>
            </div>
          </td>
          <td>
            <div v-for="(item,idx) in train.ticket_types" :key="idx" class="seat-info">
              <p v-if="item.price && item.num>0">{{item.num>10?'有票':item.num}}</p>
            </div>
          </td>
          <td>
            <div v-for="(item,idx) in train.ticket_types" :key="idx"> 
              <el-button v-if="item.price && item.num>0" type="text" @click="handleToTrainTicketCheckout(train,item.zwcode)">预订</el-button>
            </div>
          </td>
        </tr>
        </template>
        <template v-else>
        <tr>
          <td colspan="7">
            <div class="warm-tip">
              <p>没有符合条件的车次信息 :)</p>
            </div>
          </td>
        </tr>
        </template>
      </table>
  </div>
</div>
</template>

<script>
import { getTrainList } from 'src/api/train';
import * as format from 'src/utils/format';
import trainCityPick from 'src/components/distribution/train/train-city-pick.vue';

export default {
  data(){
    return {
      trainData:null,
      filter:{
        from_station_code: '',
        to_station_code: '',
        train_date: ''
      },
      datepickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
    }
  },
  components:{
    trainCityPick
	},
  watch:{
    $route() {
      this.initSearchTrainFilter();
    },
  },
  methods: {
    initSearchTrainFilter(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filter = {
          from_station_code: '',
          to_station_code: '',
          train_date: '',
          tourist_ids: null
        }
        this.trainData = null;
        
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
         console.log(filter)
        this.$set(this, 'filter', JSON.parse(filter));
        this.handleSearchTrainRequset();
      }
    },
    handleSearchTrain(){
      let filter = this.filter;

      if(!filter.from_station_code){
        this.$message.error('请选择出发城市！');
        return
      }
      if(!filter.to_station_code){
        this.$message.error('请选择到达城市！');
        return
      }
      if(!filter.train_date){
        this.$message.error('请选择出发日期！');
        return
      }
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    handleSearchTrainRequset(){
      let params = {
        data: JSON.parse(JSON.stringify(this.filter))
      }
      
      params['data'].train_date = format.date(params['data'].train_date);

      getTrainList({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.trainData = data;
          }else{
            this.trainData = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleToTrainTicketCheckout(classes, zwcode){
      let { order_no, tourist_ids } = this.filter,
          { from_station_code, to_station_code, train_no, train_date } = classes,
          query = {
            zwcode,
            train_info: {
              from_station_code,
              to_station_code,
              train_no,
              train_date
            }
          },
          encodeStr;
      if(order_no && tourist_ids){
        query.order_no = order_no;
        query.tourist_ids = tourist_ids;
      }
      this.$router.push({
        path:'/distribution/train-checkout',
        query:{
          params: window.btoa(window.encodeURIComponent(JSON.stringify(query)))
        }
      });
    }
  },
  mounted(){
    this.initSearchTrainFilter();
  }
}
</script>

<style lang="less" scoped>
.train-inland-content{
  background: #fff;
}
.train-grid-table{
  width: 100%;
  tr:last-child{
    td{
      border-bottom: 0;
    }
  }
  th{
    height: 45px;
    line-height: 45px;
    background: #f4f4f4;
    color: #999;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid #ccc;
  }
  td{
    border: 1px solid #ccc;
    padding: 8px 5px;
    color: #333;
    text-align: center;
    font-size: 14px;
    .seat-info{
      p{
        line-height: 30px;
        margin-bottom: 5px;
        &:last-child{margin-bottom: 0;}
      }
    }
    .ticket_name{
      width: 80px;
      display: inline-block;
      margin-right: 20px;
      text-align: right;
    }
    .runs-num{
      font-size: 18px;
      font-weight: 700;
    }
    .runs-time{
      font-weight: 700;
    }
    .mark-text{
      display: inline-block;
      padding: 1px;
      line-height: 12px;
      font-size: 12px;
      border-radius: 3px;
    }
    .start-txt{
      border:1px solid #019f3d;
      color: #019f3d;
    }
    .end-txt{
      border:1px solid #f60;
      color: #f60;
    }
    .middle-time{
      font-size: 12px;
      color: #949496;
    }
    .seat{
      color: #999;
      &.none strong{
        color: #999;
      }
      strong{
        margin-left: 25px;
        color: #f60;
        font-weight: 700;
      }
    }
    .status-less{
      color: #f00;
    }
    .status-none{
      color: #999;
    }
    .el-button.el-button--primary{
      padding: 8px 25px;
      margin-bottom:5px;
    }
  }
}
.popover-graid-table{
  width: 100%;
  th{
    height: 45px;
    line-height: 45px;
    background: #f4f4f4;
    color: #333;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
  td{
    font-size: 14px;
    color: #333;
    text-align: center;
    padding: 8px 5px;
  }
}
.el-button+.el-button{
  margin: 0;
}

.el-table--middle{
  .ticket_name{
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
    background: url('../../../assets/icons/empty_data.png') no-repeat center top;
    background-size: 80px 60px;
  }
}
</style>
