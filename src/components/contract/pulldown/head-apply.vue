<template>
  <!-- wrapper -->
  <div class="wrapper apply-contract">
    <div class="system-content">
      <div class="mod-form">
        <div class="title">合同领取登记表</div>
        <!--表单-->
        <div class="form-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
            <el-form-item label="申请人">
              <el-col :span="17">
                <span v-if="ruleForm" class="color-orange">{{ ruleForm.apply_name }}</span>
              </el-col>
            </el-form-item>
            <el-form-item label="国内合同份数" prop="home_count">
              <el-col :span="17">
                <el-input v-model="ruleForm.home_count" placeholder="请输入国内合同份数" type="number"/>
              </el-col>
            </el-form-item>
            <el-form-item label="出境合同份数" prop="abroad_count">
              <el-col :span="17">
                <el-input type="number" v-model="ruleForm.abroad_count" placeholder="请输入出境合同份数"/>
              </el-col>
            </el-form-item>
            <el-form-item label="合同领取说明" prop="info">
              <el-col :span="17">
                <el-input type="textarea" v-model="ruleForm.info" placeholder="用于填写分公司业务形态，合同用途等说明"/>
              </el-col>
            </el-form-item>
            <el-form-item label="收件人" prop="express_name">
              <el-col :span="17">
                <el-input type="text" v-model="ruleForm.express_name" placeholder="请输入收件人"/>
              </el-col>
              <el-col :span="7">
                <el-button type="text" class="select_info" @click="dialogAddVisible=true">选择收件信息</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="联系电话" prop="express_phone">
              <el-col :span="17">
                <el-input type="text" v-model.number="ruleForm.express_phone" placeholder="请输入联系电话"/>
              </el-col>
            </el-form-item>
            <el-form-item label="收件地址" prop="express_address">
              <el-col :span="17">
                <el-input type="textarea" v-model="ruleForm.express_address" placeholder="请输入合同收件地址"/>
              </el-col>
            </el-form-item>
          </el-form>
          <div class="foot-btn submit-bottons">
            <el-button type="primary" @click="submitForm('ruleForm')" size="large">提交合同领取申请</el-button>
            <el-button @click="$router.go(-1)" size="large">取消</el-button>
          </div>
        </div>
        <!-- /表单 -->
      </div>
    </div>
    <el-dialog title="操作提示" :visible.sync="dialogAddVisible">
      <div>
        <el-radio-group v-model="checkAdd" @change="ischeck">
          <el-radio v-for="item in addData" :key="item.id" :label="item.id" :class="{'check-radio':item.id===checkAdd}">
            <span>选入</span>
            <ul>
              <li>
                <p class="add-left">收件人：</p>
                <p class="add-right">{{ item.name }}<span v-show="item.is_default===1">[默认收件地址]</span></p>
              </li>
              <li>
                <p class="add-left">联系电话：</p>
                <p class="add-right">{{ item.telNum }}</p>
              </li>
              <li>
                <p class="add-left">收件地址：</p>
                <p class="add-right">{{ item.address }}</p>
              </li>
            </ul>
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="foot-btn">
        <el-button type="primary" @click="saveRadio()">确 定</el-button>
        <el-button @click="dialogAddVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- /wrapper -->
</template>

<script>
import { getUserName, setAddApply2, getAddressInfo } from 'src/api/api';
export default {
  data() {
    //合同份数验证
    var checkaNum = (rule, value, callback) => {
      if(!value){
        return callback(new Error('合同份数不能为空'));
      }
      if (value < 0) {
        callback(new Error('合同份数必须大于0'));
      } else {
        callback();
      }
    };
    //电话号码验证
    var telNum = (rule, value, callback) => {
      if(!value){
        return callback(new Error('请输入联系电话'));
      }
      // console.log(typeof(value));
      // console.log(value.toString().length);
      if(!Number.isInteger(value)||value.toString().length!==11){
        return callback(new Error('联系电话格式不正确'));
      } else {
        callback();
      }
    };
    return{
      dialogAddVisible: false,
      checkAdd: '',
      addData: [],
      ruleForm:{
        apply_name: '',
        home_count: '',
        abroad_count : '',
        info: '',
        express_name: '',
        express_phone: '',
        express_address: ''
      },
      rules: {
        home_count: [
          { required: true, validator: checkaNum, trigger: 'blur' }
        ],
        abroad_count: [
          { required: true, validator: checkaNum, trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输入合同领取说明', trigger: 'blur'}
        ],
        express_name: [
          { required: true, message: '请输入收件人', trigger: 'blur'}
        ],
        express_phone: [
          { required: true, validator: telNum, trigger: 'blur'}
        ],
        express_address: [
          { required: true, message: '请输入合同收件地址', trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
   
  },
  methods: {
    //提交合同领取申请
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if(valid){
          let params = {
            data:{
              home_count:_this.ruleForm.home_count,
              abroad_count:_this.ruleForm.abroad_count,
              type:2,
              info:_this.ruleForm.info,
              express_name:_this.ruleForm.express_name,
              express_address:_this.ruleForm.express_address,
              express_phone:_this.ruleForm.express_phone
            }
          };
          setAddApply2({
            params: params,
            success: (params) => {
              let data = params.data;

              if (data.code == '0') {
                this.$message.success(data.msg);
                this.$router.go(-1);
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    ischeck(val){
      // console.log(val);
    },
    //选择收件信息->确定事件
    saveRadio() {
      this.addData.some(item => {
        if(item.id === this.checkAdd) {
          this.ruleForm.express_name = item.name;
          this.ruleForm.express_phone = Number(item.telNum);
          this.ruleForm.express_address = item.address;
          this.dialogAddVisible = false;
        }
      });
    }
  },
  mounted() {
    //获取并拼接申请人信息
    getUserName().then((params)=>{
      let { code, data, msg } = params['data'];
      if(code=='10000'){
        window.location.href = data;
      }else{
        this.ruleForm.apply_name=data.org_name+'／'+data.real_name;
      }
    });
    //获取所有地址列表
    getAddressInfo().then((params)=>{
      let { code, data, msg } = params['data'];
      if(code=='0'){
        for(let item of data){
          let addressObj = {
            id: item.id,
            name: item.name,
            telNum: item.phone,
            address: item.address,
            is_default:item.is_default
          };
          this.addData.push(addressObj);
          if(item.is_default === 1){
            this.checkAdd = item.id;
          }
        }
      }else{
        this.$message.error(data.msg);
      }
    });
  }
};

</script>

<style scoped lang="scss">
.form-content {
  .el-form {
    width:680px;
    .el-form-item {
      margin-bottom: 15px;
    }
    .select_info{
      color: #ae1f77;
      margin-left: 10px;
    }
  }
  .foot-btn {
    text-align: center;
    width: 680px;
    margin-top: 26px;
    margin-bottom: 10px;
  }
}
.el-dialog__wrapper{
  .el-radio-group{
    width: 100%;
    max-height: 260px;
    overflow-y: auto;
    .el-radio {
      margin: 0;
      overflow: hidden;
      padding: 5px 0;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      display: block;
      li {
        line-height: 22px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        .add-left {
          width: 76px;
          text-align: right;
          color: #999;
        }
        .add-right {
          color: #333;
          text-align: left;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          flex: 1;
          span {
            color: #ae1f77;
            margin-left: 10px;
          }
        }
      }
    }
    .check-radio {
      border: 1px solid #b10c79;
      background-color: #fbf3f8;
    }
  }
}
</style>
<style lang="scss">
/* 全局组件样式会有全局污染问题, 要带上组件的最顶级的class */
.apply-contract {
  .el-dialog__wrapper {
    .el-radio{
      .el-radio__input {
        position: absolute;
        right: 41px;
        &.is-checked .el-radio__inner {
          border-color: #820858;
          background: #b10c79;
          &:after {
            background-color: #ffffff;
          }
        }
      }
      .el-radio__label{
        padding: 0;
        > span{
              position: absolute;
              right: 9px;
              top: 7px;
        }
        .el-row {
            padding: 0 5px;
        }
      }
    }
  }
}
</style>
