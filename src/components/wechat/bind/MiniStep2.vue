<template>
  <div class="wrapper">
    <div class="system-content">

      <div class="wechat-module">
        <div class="wechat-hd clearfix"><h5>小程序绑定流程</h5></div>
        <div class="step-bar">
          <ul>
            <li>
              <div class="rang">
                <p class="number">第一步</p>
                <p class="text">注册小程序</p>
                <p class="dot"></p>
              </div>
            </li>
            <li class="on">
              <div class="rang">
                <p class="number">第二步</p>
                <p class="text">授权小程序</p>
                <p class="dot"></p>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="legend">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
        </div>
        <div class="footer-tool">
          <!-- <el-button type="primary">立即授权</el-button> -->
          <el-button type="primary">
            <a :href="authUrl" target="_blank">立即授权</a>
          </el-button>
        </div>
      </div>  


    </div>
  </div>
</template>

<script>
import { getAuthQrcode } from 'src/api/wechat';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      authUrl:''
    }
  },
  methods: {
    goToAuthPgaeUrl() {
      let params = {};
      params.userId = USERNAME;

      getAuthQrcode({
        method:'get',
        params: params,
        success: (params) => {
          let { data } = params;
          this.$set(this,'authUrl',data);
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.goToAuthPgaeUrl();
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
</style>
