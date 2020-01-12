<template>
  <div  class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link :to="{path: '/fund-settlement'}" tag="li">同行结算</router-link>
        <router-link :to="{path: '/dire-settlement'}" tag="li">直客结算</router-link>
        <li class="on">渠道结算</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">渠道名称</div>
        <el-input v-model="searchData.tuan_no" placeholder="渠道名称"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" >立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->

    <div class="system-content">
      <div class="content-list">
        <el-table
          :data="tableData"
          style="width: 100%"
          class="el-table--middle"
          border
          >
          <el-table-column
            label="销售渠道名称"
            align="center"
            width="280"
            :resizable="false"
          >
            <template slot-scope="scope">
              TDM系统
              <!-- <router-link :to="'zcontrol/order-details/'+scope.row.resource_id+'/'+scope.row.order_id">{{scope.row.order_no}}</router-link> -->
            </template>
          </el-table-column>
          <el-table-column
            label="余额"
            align="right"
            width="160"
            :resizable="false"
            >
            <template slot-scope="scope">￥{{scope.row.totalBal}}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            :resizable="false"
          >
            <template slot-scope="scope">
							<router-link v-if="$menuPermission('api/finance/get_acc_income')"
                :to="{path: '/channel-settlement/income'}">
                渠道账户信息
              </router-link>
              <router-link v-if="$menuPermission('api/finance/get_acc_income')"
                :to="{path: '/channel-settlement/income'}">
                收入
              </router-link>
							<router-link v-if="$menuPermission('api/finance/get_acc_expenditure')"
                :to="{path: '/channel-settlement/expend'}">
                支出
              </router-link>
							<router-link v-if="$menuPermission('api/finance/get_acc_trade_record')"
                :to="{path: '/channel-settlement/trade'}">
                交易记录
              </router-link>
							<router-link v-if="$menuPermission('api/finance/channel_settlement_apply_list')"
                :to="{path: '/channel-settlement/apply'}">
                渠道结算
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="totalPage">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>

import {getUserAccBal} from 'src/api/api'

export default {
  data () {
    return {
      totalPage: 1,
      currentPage:1,
      page:1,
      pageShow:true,
      searchData: {
          tuan_no: "",
      },
      tableData: [{
        totalBal: '',
        totalActiveBal: '',
        totalFrzBal: ''
      }]
    }
  },
  methods:{
    getUserAccBal() {
      let params = {
        data: {
          userId: ""
        }
      };
      getUserAccBal({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.tableData[0].totalBal = result.data.totalBal;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    handleCurrentChange(val){
        this.page=val;
        
    },
  },
  mounted(){
    this.getUserAccBal();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .deal-line {
    color: #b10c79;
    border: #b10c79 solid 1px;
    margin-left: 10px;
    padding: 3px 5px;
  }
  .content-list{

      .table-title{
          height:36px;
          margin:16px 0 10px 0;

          .btn-areas{
             float:right;
          }
      }

  }
  .form-content {

  .el-form {

    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
  .table-box {
    margin: 20px 20px 0 20px;
    overflow: scroll;
    border: 1px solid #eee;
  }
  .btn-areas {
    width: 112px;
    margin: 0 auto;
    line-height: 45px;
  }

}
.mb0{
  margin-bottom: 0!important;
}
.ip1{
  display: inline-block;
	width: 110px;
	margin-right: 10px;
}
.ip2{
  width: 160px!important;
}
.ip3{
	display: inline-block;
  width: 69px;
  margin-bottom: 0;
}
</style>
