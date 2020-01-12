<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">关键字</div>
          <el-input v-model="queryValue" placeholder="输入姓名"></el-input>
        </div>
        <div class="search-item">
          <div class="label">月份</div>
          <el-date-picker
            v-model="queryTime"
            type="month"
            placeholder="选择月">
          </el-date-picker>
          <!-- <el-select v-model="queryTime" placeholder="请选择">
            <el-option label="1月份" value="1"></el-option>
            <el-option label="2月份" value="2"></el-option>
            <el-option label="3月份" value="3"></el-option>
            <el-option label="4月份" value="4"></el-option>
            <el-option label="5月份" value="5"></el-option>
            <el-option label="6月份" value="6"></el-option>
            <el-option label="7月份" value="7"></el-option>
            <el-option label="8月份" value="8"></el-option>
            <el-option label="9月份" value="9"></el-option>
            <el-option label="10月份" value="10"></el-option>
            <el-option label="11月份" value="11"></el-option>
            <el-option label="12月份" value="12"></el-option>
          </el-select> -->
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="getExtractInfoList">搜索</el-button>
        </div>
      </div>
    </div>

   <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
            <el-table :data="dataList" class="el-table--middle" border style="width: 100%">
              <el-table-column prop="username" 
                              label="申请人" 
                              header-align="center" 
                              align="left">
              </el-table-column>
              <el-table-column prop="extractPrice" 
                              label="提现金额" 
                              header-align="center" 
                              align="right" >
              </el-table-column>
              <el-table-column prop="createTime" 
                              label="申请时间" 
                              header-align="center" 
                              align="center">
              </el-table-column>
              <el-table-column prop="extrackStatus" 
                              label="状态" 
                              header-align="center" 
                              align="center" >
                    <template slot-scope="scope">
                      <span v-if="scope.row.extrackStatus == 1">待审核</span>
                      <span v-if="scope.row.extrackStatus == 2">已审核</span>
                      <span v-if="scope.row.extrackStatus == 3">已打款</span>
                      <span v-if="scope.row.extrackStatus == 4">已作废</span>
                      <span v-if="scope.row.extrackStatus == 5">审核不通过</span>
                    </template>
              </el-table-column>
              <el-table-column prop="order_id" 
                              label="操作" 
                              header-align="center" 
                              align="left" 
                              >
                <template slot-scope="scope">
                  <!-- //提现状态（PASS：审核通过，UNPASS：审核不通过状态，REMITTANCE：已打款，CANCEL：作废） -->
                  <el-button type="text" v-if="scope.row.extrackStatus == 1" 
                    @click="setUpdateExtractStatus(scope.row,'PASS')">审核通过</el-button>
                  <el-button type="text" v-if="scope.row.extrackStatus == 1"
                    @click="setUpdateExtractStatus(scope.row,'UNPASS')">审核不通过</el-button>
                  <el-button type="text" v-if="scope.row.extrackStatus == 2"
                    @click="setUpdateExtractStatus(scope.row,'REMITTANCE')">已打款</el-button>
                  <el-button type="text" v-if="scope.row.extrackStatus == 1 || 
                                                  scope.row.extrackStatus == 2 ||
                                                  scope.row.extrackStatus == 5"
                    @click="setUpdateExtractStatus(scope.row,'CANCEL')">作废</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { queryWithdrawCashList, updateExtractStatus } from 'src/api/wechat';
import { dateTimeFormatter } from 'src/assets/js/common';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      queryValue:'',
      queryTime:'',
      dataList:null
    }
  },
  methods: {
    getExtractInfoList() {
      let params = {};
      params.loginName = USERNAME;
      params.queryValue = this.queryValue;
      params.queryTime = dateTimeFormatter(this.queryTime,'yyyy-MM');
      params.pageNum = 1;
      params.pageSize = 10;

      queryWithdrawCashList({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.$set(this,'dataList',data.list);
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
    setUpdateExtractStatus(row,status) {
      let params = {};
      params.withdrawCashId = row.id;
      params.status = status;          //提现状态（PASS：审核通过，UNPASS：审核不通过状态，REMITTANCE：已打款，CANCEL：作废）

      updateExtractStatus({
        formdata:true,
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.getExtractInfoList();
          }
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
    this.getExtractInfoList();
  },
});
</script>

<style scoped lang="scss">
.system-content{
  background: #fff;
  
  
}

</style>
