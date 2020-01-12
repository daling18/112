<template>
  <div class="wrapper">
    <div class="system-content">

      <div class="wechat-module">
        <div class="wechat-hd clearfix"><h5>基本信息</h5></div>
        <div class="base-content">
          <div class="base-pd clearfix">
            <div class="base-tit">小程序名称</div> 
            <div class="base-info">盈科旅游</div>
          </div>
          <div class="base-pd clearfix">
            <div class="base-tit">头像</div> 
            <div class="base-info">
                <img src="../../../assets/background.png" alt="">
            </div>
          </div>
          <div class="base-pd clearfix">
            <div class="base-tit">微信认证</div> 
            <div class="base-info">
              已认证
            </div>
          </div>
          <div class="base-pd clearfix">
            <div class="base-tit">主体信息</div> 
            <div class="base-info">盈科旅游</div>
          </div>
          <div class="btn-tool">
            <el-button @click="refreshAccountInfo">刷新信息</el-button>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import { getAccountBasicInfoForRefresh } from 'src/api/wechat';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      accountData:null
    }
  },
  methods: {
    refreshAccountInfo() {
      let params = {};
      params.appid = 'wwfbafb18cf6c4c9af';
      params.userId = USERNAME;

      getAccountBasicInfoForRefresh({
        method:'get',
        params: params,
        success: (params) => {
          let { data } = params;
          this.$set(this,'accountData',data);
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.refreshAccountInfo();
  },
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
       flex: 0.1;
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

.el-button a{
  color: #fff;
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
