<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="wechat-module">
        <div class="wechat-hd clearfix"><h5>分销设置</h5></div>
        <el-form :model="form" label-width="120px" class="project-form">
          <el-form-item label="状态" >
            <el-switch
              v-model="form.distribution_status"
              active-text="打开"
              inactive-text="关闭"
              active-color="#b10c79"
              off-color="#999">
            </el-switch>            
          </el-form-item>
          <el-form-item label="佣金比例" >
            <el-input v-model="form.distribution_proportion" placeholder="请输入佣金比例" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="提现限制" >
            <el-input v-model="form.min_withdrawal_amount" placeholder="请输入提现限制" auto-complete="off"/>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="todoDistributionConfig">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>  
  </div>
</template>

<script>
import { distributionConfig } from 'src/api/wechat';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      form:{
        appid:'',
        userId:'',
        distribution_status:'',
        distribution_proportion:'',
        min_withdrawal_amount:''
      },
      isConfigData:null
    }
  },
  methods: {
    getDistributionConfig() {
      let params = {};
      params.userId = USERNAME;

      distributionConfig({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.$set(this,'form',data);
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
    todoDistributionConfig() {
      let params = {};
      params.userId = this.form.userId;
      params.status = this.form.distribution_status;
      params.proportion = this.form.distribution_proportion;
      params.minAmount = this.form.min_withdrawal_amount;

      distributionConfig({
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          // if(ret == '0'){}
          this.$message({
            message: ret=='0' ? '操作成功' :msg,
            type: ret=='0' ? 'success' :'error'
          })
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getDistributionConfig();
  },
});
</script>

<style scoped lang="scss">
.system-content{
  background: #fff;
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
  }
  .project-form{
    width: 450px;
    padding: 0 0 50px 0;
  }
}

</style>
