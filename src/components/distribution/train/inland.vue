<template>
<div>
  <div class="system-search">
    <div class="bd">
      <div class="search-panel search-citycode">
          <div class="search-item">
              <div class="label">出发城市</div>
              <train-city-pick v-model="filters.from_station"></train-city-pick>
              
          </div>
          <div class="search-item">
              <div class="label">到达城市</div>
              <train-city-pick v-model="filters.to_station"></train-city-pick>
          </div>
          <div class="exchange" @click="exchangeCityCode()"></div>
      </div>
      <div class="search-panel">
          <div class="search-item">
              <div class="label">出发日期</div>
              <el-date-picker v-model="filters.train_date" :picker-options="datepickerOptions1" @change="changeStartDate" type="date" placeholder="出发日期"></el-date-picker>
          </div>
      </div>
      <div class="search-panel">
          <el-button type="primary" @click="trainListQuery">立即搜索</el-button>
      </div>
    </div>
  </div>
  <div class="train-inland-content">
    <table class="train-grid-table">
      <tr>
        <th>车次/类型</th>
        <th>出发 <i class="fa fa-sort"></i></th>
        <th>运行时间 <i class="fa fa-caret-up"></i></th>
        <th>到达 <i class="fa fa-sort"></i></th>
        <th>结算价 <i class="fa fa-caret-down"></i></th>
        <th>剩余票数</th>
        <th width="80"></th>
      </tr>
      <template v-if="false">
      <tr v-for="(obj,idx) in trainData" :key="idx">
        <td>
          <p class="runs-num">{{obj.train_code}}</p>
          <p>{{obj.train_type}}  经停 <i class="fa fa-caret-down"></i></p>


          <!-- <el-popover
            ref="popover4"
            placement="right"
            width="500"
            trigger="click">
            <table class="popover-graid-table">
              <tr>
                <th>站次</th>
                <th>站名</th>
                <th>到站时间</th>
                <th>开车时间</th>
                <th>停留时间</th>
              </tr>
              <tr>
                <td>1</td>
                <td>北京西</td>
                <td>始发站</td>
                <td>06:43</td>
                <td>-</td>
              </tr>
            </table>
          </el-popover> -->

        </td>
        <td>
          <p class="runs-time">{{obj.start_time}}</p>
          <p>{{obj.from_station_name}} 
            <!-- <span class="mark-text start-txt">始</span> -->
          </p>
        </td>
        <td><span class="middle-time">{{obj.run_time}}</span></td>
        <td>
          <p class="runs-time">{{obj.arrive_time}}</p>
          <p>{{obj.to_station_name}} 
            <!-- <span class="mark-text end-txt">终</span> -->
          </p>
        </td>
        <td>
          <div class="seat-info tl">
            <p class="seat" v-if="obj.gjrw_num != '--'"><span class="typename">高级软卧</span> <strong>&yen; {{obj.gjrw_price}}</strong></p>
            <p class="seat" v-if="obj.qtxb_num != '--'"><span class="typename">其他席别</span> <strong>&yen; {{obj.qtxb_price}}</strong></p>
            <p class="seat" v-if="obj.rw_num != '--'"><span class="typename">软卧</span> <strong>&yen; {{obj.rwx_price}}</strong></p>
            <p class="seat" v-if="obj.dw_num != '--'"><span class="typename">动卧</span> <strong>&yen; {{obj.dwx_price}}</strong></p>
            <p class="seat" v-if="obj.rz_num != '--'"><span class="typename">软座</span> <strong>&yen; {{obj.rz_price}}</strong></p>
            <p class="seat" v-if="obj.swz_num != '--'"><span class="typename">商务座</span> <strong>&yen; {{obj.swz_price}}</strong></p>
            <p class="seat" v-if="obj.tdz_num != '--'"><span class="typename">特等座</span> <strong>&yen; {{obj.tdz_price}}</strong></p>
            <p class="seat" v-if="obj.wz_num != '--'"><span class="typename">无座</span> <strong>&yen; {{obj.wz_price}}</strong></p>
            <p class="seat" v-if="obj.yw_num != '--'"><span class="typename">硬卧</span> <strong>&yen; {{obj.ywx_price}}</strong></p>
            <p class="seat" v-if="obj.yz_num != '--'"><span class="typename">硬座</span> <strong>&yen; {{obj.yz_price}}</strong></p>
            <p class="seat" v-if="obj.ydz_num != '--'"><span class="typename">二等座</span> <strong>&yen; {{obj.edz_price}}</strong></p>
            <p class="seat" v-if="obj.edz_num != '--'"><span class="typename">一等座</span> <strong>&yen; {{obj.ydz_price}}</strong></p>
          </div>
        </td>
        <td>
          <div class="seat-info">
            <!-- 高级软卧 -->
            <p :class="trainTypeNumFormat(obj.gjrw_num)" v-if="obj.gjrw_num != '--'">
              {{obj.gjrw_num?obj.gjrw_num+'张':'无票'}}</p>
            <!-- 其他席别 -->
            <p :class="trainTypeNumFormat(obj.qtxb_num)" v-if="obj.qtxb_num != '--'">
              {{obj.qtxb_num?obj.qtxb_num+'张':'无票'}}</p>
            <!-- 软卧 -->
            <p :class="trainTypeNumFormat(obj.rw_num)" v-if="obj.rw_num != '--'">
              {{obj.rw_num?obj.rw_num+'张':'无票'}}</p>
            <!-- 动卧 -->
            <p :class="trainTypeNumFormat(obj.dw_num)" v-if="obj.dw_num != '--'">
              {{obj.dw_num?obj.dw_num+'张':'无票'}}</p>
            <!-- 软座 -->
            <p :class="trainTypeNumFormat(obj.rz_num)" v-if="obj.rz_num != '--'">
              {{obj.rz_num?obj.rz_num+'张':'无票'}}</p>
            <!-- 商务座 -->
            <p :class="trainTypeNumFormat(obj.swz_num)" v-if="obj.swz_num != '--'">
              {{obj.swz_num?obj.swz_num+'张':'无票'}}</p>
            <!-- 特等座 -->
            <p :class="trainTypeNumFormat(obj.tdz_num)" v-if="obj.tdz_num != '--'">
              {{obj.tdz_num?obj.tdz_num+'张':'无票'}}</p>
            <!-- 无座 -->
            <p :class="trainTypeNumFormat(obj.wz_num)" v-if="obj.wz_num != '--'">
              {{obj.wz_num?obj.wz_num+'张':'无票'}}</p>
            <!-- 硬卧 -->
            <p :class="trainTypeNumFormat(obj.yw_num)" v-if="obj.yw_num != '--'">
              {{obj.yw_num?obj.yw_num+'张':'无票'}}</p>
            <!-- 硬座 -->
            <p :class="trainTypeNumFormat(obj.yz_num)" v-if="obj.yz_num != '--'">
              {{obj.yz_num?obj.yz_num+'张':'无票'}}</p>
            <!-- 二等座 -->
            <p :class="trainTypeNumFormat(obj.edz_num)" v-if="obj.edz_num != '--'">
              {{obj.edz_num?obj.edz_num+'张':'无票'}}</p>
            <!-- 一等座 -->
            <p :class="trainTypeNumFormat(obj.ydz_num)" v-if="obj.ydz_num != '--'">
              {{obj.ydz_num?obj.ydz_num+'张':'无票'}}</p>
            
          </div>
        </td>
        <td>
          <!-- 9:商务座，P:特等座，M:一等座，O:二等座，6:高级软卧，4:软卧，3:硬卧，2:软座，1:硬座  -->
          <!-- 高级软卧 -->
          <el-button type="primary" @click="todoJumpSetData(obj,'6')" v-if="obj.gjrw_num != '--'">预定</el-button>
            <!-- 其他席别 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'qtxb_num')" v-if="obj.qtxb_num != '--'">预定</el-button>
            <!-- 软卧 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'4')" v-if="obj.rw_num != '--'">预定</el-button>
            <!-- 动卧 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'dw_num')" v-if="obj.dw_num != '--'">预定</el-button>
            <!-- 软座 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'2')" v-if="obj.rz_num != '--'">预定</el-button>
            <!-- 商务座 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'9')" v-if="obj.swz_num != '--'">预定</el-button>
            <!-- 特等座 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'P')" v-if="obj.tdz_num != '--'">预定</el-button>
            <!-- 无座 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'wz_num')" v-if="obj.wz_num != '--'">预定</el-button>
            <!-- 硬卧 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'3')" v-if="obj.yw_num != '--'">预定</el-button>
            <!-- 硬座 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'1')" v-if="obj.yz_num != '--'">预定</el-button>
            <!-- 二等座 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'O')" v-if="obj.edz_num != '--'">预定</el-button>
            <!-- 一等座 -->
            <el-button type="primary" @click="todoJumpSetData(obj,'M')" v-if="obj.ydz_num != '--'">预定</el-button>

          
        </td>
      </tr>
      </template>
      <template v-else>
      <tr>
        <td colspan="7">
          <p style="padding:30px 0;">暂无班次信息</p>
        </td>
      </tr>
      </template>
    </table>
  </div>
</div>
</template>

<script>
import { getTrainList } from 'src/api/train';
import { dateTimeFormatter } from 'src/assets/js/common';
import trainCityPick from 'src/components/distribution/train/train-city-pick.vue';

export default {
  data(){
    return {
      trainData:null,
      filters:{
        from_station:this.$route.query.from_station || '',
        to_station:this.$route.query.to_station || '',
        train_date:this.$route.query.train_date || '',
      },
      pagination:{
        total_count:0,
        total_page: 0,
        page_size:10,
        page_index: 1,
      },
      datepickerOptions1: {
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
      this.filters.from_station = this.$route.query.from_station || '';
      this.filters.to_station = this.$route.query.to_station || '';
      this.filters.train_date = this.$route.query.train_date || '';

    },
  },
  methods: {
    trainListQuery(){
      let para = {};
      // para.data = {
      //   "from_station":"XKS",
      //   "to_station":"ZUS",
      //   "train_date":"2018-11-12"
      // }
      para.data = JSON.parse(JSON.stringify(this.filters));
      para.data.train_date = dateTimeFormatter(this.filters.train_date,'yyyy-MM-dd');

      getTrainList({
          params: para,
          success: (res) => {
            let {code, msg, data} = res['data'];
            this.trainData = data.train_info;
             console.log(this.trainData)
          },
          showLoading: true
        });
    },
    trainTypeNumFormat(num){
      let type = '';
      type = num?(num>10?'':'status-less'):'status-none';
      return type;
    },
    todoJumpSetData(obj,type){
      localStorage.setItem('train', JSON.stringify(obj));
      this.$router.push({path:'/product/train/order',query:{type:type}});
    },
    exchangeCityCode(){},
    changeStartDate(){},
  },
  mounted(){
    this.trainListQuery();
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
  }
  td{
    border-bottom: 1px solid #ccc;
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
      .typename{
        display: inline-block;
        width: 60px;
        text-align:right;
      }
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
</style>
