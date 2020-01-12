<template>
  <div class="passwd">
    <el-form style="width:400px; margin:0 auto;"  label-width="80px" :rules="rules" :model="formData"  ref="ruleForm">
      <el-form-item label="旧密码" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input v-model="formData.new_password" type="password" placeholder="5位以上字母+数字组合"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="formData.repassword" type="password" placeholder="再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item class="submit-buttons">
        <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePasswd } from 'src/api/api';
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      if(value!=this.formData.new_password){
        return callback(new Error('两次输入的密码不一致'));
      }else{
        return callback();
      }
    };
    return {
      formData: {
        password: "",
        new_password: "",
        repassword: ""
      },
      rules:{
        password:[
          { required: true, message: '请输入旧密码' }
        ],
        new_password:[
          { required: true, message: '请输入新密码' }
        ],
        repassword:[
          { required: true, message: '请输入确认密码'},
          { validator: checkNumber, trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      // this.tuanTodoAddHandler();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitChangePasswd();
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitChangePasswd() {
      changePasswd({
        params: this.formData,
        success: (params) => {
          let _this=this,
              { code, msg, data } = params['data'];
          if(code != 0){
            this.$message({
              message: msg,
              type: 'error'
            });
          }else{
            this.$message({
              message: msg,
              type: 'success'
            });
            setTimeout(function(){
              _this.$router.push({path: '/login'});
            },2000);
          }
        },
        showLoading: true
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.passwd{
  background-color: #fff;
  padding: 50px 20px;
}
</style>

