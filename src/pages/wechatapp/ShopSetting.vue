<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="wechat-module">
        <div class="wechat-hd clearfix"><h5>商城设置</h5></div>
        <el-form label-width="120px" class="project-form">
          <el-form-item label="商城名称" >
            <el-input v-model="storename" placeholder="请输入商城名称" auto-complete="off"/>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="todoStoreConfig">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>  
  </div>
</template>

<script>
import { getStoreName, setStoreConfig } from 'src/api/wechat';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      storename:'',
      isConfigData:null
    }
  },
  methods: {
    getStoreNameInfo() {
      let params = {};
      params.userId = USERNAME;

      getStoreName({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.$set(this,'storename',data);
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
    todoStoreConfig() {
      let params = {};
      params.userId = USERNAME;
      params.name = this.storename;

      setStoreConfig({
        // headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        formdata: true,
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.$set(this,'isConfigData',data.list);
          }else{
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getStoreNameInfo();
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
