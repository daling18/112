<template>
  <div class="login v2">
    <div class="login-container">
      <el-form>
        <div class="login-form">
          <div class="login-input">
            <span class="icon">
              <i class="fa fa-user" aria-hidden="true"></i>
            </span>
            <input type="text" v-model="user.username" placeholder="请输入用户名" autocomplete="off">
          </div>
          <div class="login-input">
            <span class="icon">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
            <input type="password" v-model="user.password" placeholder="请输入密码" autocomplete="off">
          </div>
          <div class="login-help">
            <a href="http://test.admin.yktour.com.cn/#/forgetPwd/account" target="_bank">忘记密码？</a>
          </div>
          <el-button class="login-btn" style="width:100%;" @click.native.prevent="handleLongin" :loading="logining">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { loginTodo } from 'src/api/api';
  export default {
    data() {
      return {
        logining: false,
        user: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      handleLongin(ev) {
        let params = this.user;
        this.logining = true;

        loginTodo(params).then(params => {
          this.logining = false;
          let { msg, code, data } = params.data;
          if (code == 10000) {
            this.$message({
              message: msg,
              type: 'error'
            });
          } else {
            localStorage.setItem('username', data.username);
            this.$router.push({ path:'/'});
          }
        });
      }
    },
    mounted(){
      let _this=this;

      //按enter键登录
      document.onkeyup=function(evt){
        evt = evt?evt: window.event;

        if(evt.keyCode==13){
          _this.handleLongin();
        }

      }
    },
    destroyed(){
      document.onkeyup=null;
    }
  }

</script>

<style lang="scss" scoped>
  .login{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../assets/background.png) center center no-repeat;
    background-size: cover;
  }
  .login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -130px 0 0 -225px;
    box-sizing: border-box;
    width: 450px;
    height: 270px;
    background: #fff;
    border: 1px solid #eaeaea;
    padding: 45px 70px 35px;
    border-radius: 8px;
    .login-input{
      position: relative;
      border: 1px solid #ccc;
      height: 36px;
      padding-left: 50px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 20px;
      input{
        border: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 34px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
      }
      .icon{
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 34px;
        background-color: #f4f4f4;
        text-align: center;
        line-height: 34px;
        font-size: 20px;
      }
    }
    .login-help{
      text-align: right;
      margin-bottom: 20px;
      a{
        margin-left: 10px;
        color: #0793ff;
      }
    }
    .login-btn{
      border: 0;
      height: 40px;
      width: 100%;
      background-color: #b10c79;
      color: #fff;
      font-size: 18px;
      text-align: center;
      border-radius: 20px;
      outline: 0;
    }
  }
</style>
