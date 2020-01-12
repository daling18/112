<template>
  <div class="wrapper">
    <div class="system-content">

      <div class="nobind-rang" v-if="!isBind">
        <div class="nobind">
          <p class="text">还未绑定小程序</p>
          <!-- <el-button type="primary">立即绑定</el-button> -->
          <el-button type="primary" @click="$router.push({path:'/wechat/bind/mini-step1'})">立即绑定</el-button>
        </div>
      </div>

      <div v-if="isBind">
          <div class="wechat-module">
            <div class="wechat-hd clearfix"><h5>员工数据</h5></div>
            <div class="data-bar">
              <ul class="clearfix">
                <li>
                  <p class="number">143</p>
                  <p class="text">员工数</p>
                </li>
                <li>
                  <p class="number">79</p>
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
                  <li class="on">汇总</li>
                  <li>昨日</li>
                  <li>最近7天</li>
                  <li>最近30天</li>
                  <li>自定义区间</li>
                </ul>
                <div class="filter-date-module" v-if="0">
                <el-date-picker
                  v-model="datevalue"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
                <el-button type="primary">搜索</el-button>
              </div>
              
              </div>
            </div>
            <div class="data-bar">
              <ul class="clearfix">
                <li>
                  <p class="text">客户数</p>
                  <p class="number">143</p>
                </li>
                <li>
                  <p class="text">浏览数</p>
                  <p class="number">79013</p>
                </li>
                <li>
                  <p class="text">转发数</p>
                  <p class="number">79</p>
                </li>
                <li>
                  <p class="text">点赞数</p>
                  <p class="number">248</p>
                </li>
                <li>
                  <p class="text">保存数</p>
                  <p class="number">23</p>
                </li>
                <li>
                  <p class="text">转化数</p>
                  <p class="number">19</p>
                </li>
              </ul>
            </div>
          </div>
    </div>



  

      <div class="wechat-module" v-if="0">
        <div class="wechat-hd clearfix"><h5>小程序绑定流程</h5></div>
        <div class="step-bar">
          <ul>
            <li class="on">
              <div class="rang">
                <p class="number">第一步</p>
                <p class="text">注册小程序</p>
                <p class="dot"></p>
              </div>
            </li>
            <li>
              <div class="rang">
                <p class="number">第二步</p>
                <p class="text">授权小程序</p>
                <p class="dot"></p>
              </div>
            </li>
            <li>
              <div class="rang">
                <p class="number">第三步</p>
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
          <el-button type="primary">已注册，下一步</el-button>
        </div>

        <div class="app-rang">
          <div class="app-rang-hd">请选择欲授权的应用：</div>
          <div class="app-list clearfix">
            <div class="app-unit">
              <img src="../../../assets/background.png" alt="" class="unit-img">
              <div class="unit-name">盈科助手</div>
              <div class="tool">
                <el-button type="primary">立即授权</el-button>
              </div>
            </div>

            <div class="app-unit">
              <img src="../../../assets/background.png" alt="" class="unit-img">
              <div class="unit-name">店长助手</div>
              <div class="tool">
                <el-button type="primary">立即授权</el-button>
              </div>
            </div>

          </div>
        </div>
      </div>
      

      <div class="wechat-module" v-if="0">
        <div class="wechat-hd clearfix"><h5>企业微信：盈科旅游杭州分公司</h5></div>
        <div class="app-rang" style="padding:0 0 30px 50px;">
          <div class="app-list clearfix">
            <div class="app-unit">
              <img src="../../../assets/background.png" alt="" class="unit-img">
              <div class="unit-name">盈科助手</div>
              <div class="tool">
                已授权
              </div>
            </div>

            <div class="app-unit">
              <img src="../../../assets/background.png" alt="" class="unit-img">
              <div class="unit-name">店长助手</div>
              <div class="tool">
                已授权
              </div>
            </div>

          </div>
        </div>
      </div>


      <div class="wechat-module" v-if="0">
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
            <el-button>刷新信息</el-button>
          </div>
        </div>
      </div>
      


    </div>
  </div>
</template>

<script>
import { isBindingApp } from 'src/api/wechat';

export default ({
  components: {
  },
  data() {
    return {
      isBind:false,
    }
  },
  methods: {
    judgeBindApp() {
      let params = {};
      params.userId = 'xm_cs_002';

      isBindingApp({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          
           console.log(data)
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
    }
  },
  mounted(){
    this.judgeBindApp();
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
