<template>
  <div class="wrapper">
    <div class="system-content">

      <div>
          <div class="wechat-module" v-if="summarDataList">
            <div class="wechat-hd clearfix"><h5>员工数据</h5></div>
            <div class="data-bar">
              <ul class="clearfix">
                <li>
                  <p class="number">{{summarDataList.sumUser}}</p>
                  <p class="text">员工数</p>
                </li>
                <li>
                  <p class="number">{{summarDataList.sumCard}}</p>
                  <p class="text">已开通名片数</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="wechat-module">
            <div class="wechat-hd clearfix">
              <h5>运营数据</h5>
              <div class="tag-bar">
                <ul>
                  <li :class="tab==1?'on':''" @click="tabSaleRank(1)">今天</li>
                  <li :class="tab==2?'on':''" @click="tabSaleRank(2)">昨日</li>
                  <li :class="tab==3?'on':''" @click="tabSaleRank(3)">最近7天</li>
                  <li :class="tab==4?'on':''" @click="tabSaleRank(4)">最近30天</li>
                  <li :class="tab==5?'on':''" @click="tabSaleRank(5)">自定义区间</li>
                </ul>
                <div class="filter-date-module" v-if="isDateAreaShow">
                <el-date-picker
                  v-model="startTime"
                  type="date"
                  placeholder="选择日期范围">
                </el-date-picker>
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  placeholder="选择日期范围">
                </el-date-picker>
                <el-button type="primary" @click="getSummarizingInfo('')">搜索</el-button>
              </div>
              
              </div>
            </div>
            <div class="data-bar" v-if="summarDataList">
              <ul class="clearfix">
                <!-- <li>
                  <p class="text">客户数</p>
                  <p class="number">{{summarDataList.sumFans}}</p>
                </li> -->
                <li>
                  <p class="text">浏览数</p>
                  <p class="number">{{summarDataList.sumView}}</p>
                </li>
                <li>
                  <p class="text">转发数</p>
                  <p class="number">{{summarDataList.sumForward}}</p>
                </li>
                <li>
                  <p class="text">点赞数</p>
                  <p class="number">{{summarDataList.sumPoint}}</p>
                </li>
                <li>
                  <p class="text">保存数</p>
                  <p class="number">{{summarDataList.sumSave}}</p>
                </li>
                <!-- <li>
                  <p class="text">转化数</p>
                  <p class="number">{{summarDataList.sumSale}}</p>
                </li> -->
              </ul>
            </div>
          </div>
    </div>





    </div>
  </div>
</template>

<script>
import { isBindingApp,
         dataSummarizing,
         salesRanking } from 'src/api/wechat';
import { dateTimeFormatter } from 'src/assets/js/common';
const USERNAME = localStorage.getItem('username');

export default ({
  components: {
  },
  data() {
    return {
      isBind:false,
      tab:1,
      startTime:'',
      endTime:'',
      summarDataList:null,
      isDateAreaShow:false,
    }
  },
  methods: {
    judgeBindApp() {
      let params = {};
      params.userId = USERNAME;

      isBindingApp({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          
          if(ret == '0'){
            this.isBind = !data ? false:true;
          }else{
            this.$message({
              message: '警告哦，这是一条警告消息',
              type: 'error'
            })
          }
        },
        showLoading: true
      });
    },
    // 门店店长-数据汇总
    getSummarizingInfo(type) {
      let params = {};
      params.loginName = USERNAME;
      params.type = type;             //统计label类型：1-今天，2-昨天，3-近7天，4-近30天
      if(this.isDateAreaShow){
        params.startTime = dateTimeFormatter(this.startTime,'yyyy-MM-dd');
        params.endTime = dateTimeFormatter(this.endTime,'yyyy-MM-dd');
      }

      dataSummarizing({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          
        
          if(ret == '0'){
            this.$set(this,'summarDataList',data);
          }else{
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        },
        showLoading: true
      });
    },
    // 门店店长-销售排行
    getSaleRankInfo() {
      let params = {};
      params.eid = '100071';
      params.type = '1';        //销售排行label类型：1-客户，2-浏览，3-被转发，4-保存次数，5-订单数
      params.startTime = '';
      params.endTime = '';

      salesRanking({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          
          if(ret == '0'){
            this.isBind = !data ? false:true;
          }else{
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        },
        showLoading: true
      });
    },
    tabSaleRank(type){
      this.tab = type;
      if(type == 5){
        this.isDateAreaShow = true;
      }else{
        this.isDateAreaShow = false;
        this.getSummarizingInfo(type);
      }
    }
  },
  mounted(){
    // this.judgeBindApp();
    this.getSummarizingInfo(1);
  }
});
</script>

<style scoped lang="scss">
.system-content{
  background: #fff;
  
  .nobind{
    margin: 0 auto;
    width: 300px;
    padding-top: 70px;
    text-align: center;
    background: url('../../../assets/nobind.png') no-repeat top center;
    background-size: 81px 58px;
    .text{
      font-size: 18px;
      color: #999;
      margin-bottom: 43px;
    }
  }
  .nobind-rang{
    padding: 200px 0;
  }
}
.wechat-module{
  &:last-child{padding-bottom: 50px;}
  .wechat-hd{
    padding: 25px 15px;
    h5{
      float: left;
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
  }
  .el-button--primary{
    width: auto;
    min-width: 100px;
    padding:0 20px;
  }
  .legend{
    margin: 50px 0;
    padding: 0 150px;
    font-size: 14px;
    color: #999;
  }
  .footer-tool{
    text-align: center;
  }
  .data-bar{
    padding: 0 15px;
    ul{
      background: #f4f4f4;
    }
    li{
      float: left;
      padding-top: 30px;
      list-style: none;
      width: 150px;
      height: 80px;
      text-align: center;
    }
    .number{
      font-size: 30px;
      color: #333;
    }
    .text{
      font-size: 14px;
      color: #999;
    }
  }
}
.tag-bar{
  float: right;
  text-align: right;
  li{
    width: 75px;
    display: inline-block;
    text-align:center; 
    font-size: 14px;
    color: #333;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;
    &.on{
      border-color: #b10c79;
      color: #b10c79;
    }
  }
  .filter-date-module{
    margin-top: 10px;
  }
}
.step-bar{
  width: 500px;
  margin: 0 auto;
  ul{
    height: 60px;
    display: flex;
    li{
      flex: 1;
      border-bottom: 1px solid #999;
      position: relative;
      &:last-child{
       flex: 0.25;
        border-bottom: 0;
      }
      &.on{
        .text{
          color: #b10c79;
        }
        .dot{
          background: #b10c79;
        }
      }
    }
    .rang{
      text-align: center;
      position: absolute;
      left: -45px;
      bottom: -9px;
    }
    .number{
      font-size: 14px;
      color: #999;
    }
    .text{
      font-size: 18px;
      color: #333;
    }
    .dot{
      width: 10px;
      height: 10px;
      display: inline-block;
      background: #999;
      border-radius: 50%;
    }
  }
}
.app-rang{
  padding: 30px 0 50px 150px;
  .app-rang-hd{
    font-size: 14px;
    color: #333;
  }
  .app-unit{
    width: 150px;
    float: left;
    margin: 20px 20px 0 0;
    text-align: center;
    .unit-img{
      width: 100px;
      height: 100px;
      display: block;
      margin: 0 auto;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .unit-name{
      font-size: 18px;
      font-weight: 700;
      color: #333;
      margin: 5px 0 15px;
    }
  }
}
.base-content{
  .base-pd{
    padding-left: 120px;
    margin-bottom: 10px;
  }
  .base-tit{
    width: 110px;
    float: left;
    margin-left: -120px;
    color: #999;
    font-size: 14px;
    text-align: right;
  }
  .base-info{
    img{
      width: 60px;
      height: 60px;
      display: block;
      border:1px solid #ccc;
    }
  }
  .btn-tool{
    margin:30px 0 0 50px;
  }
}

</style>
