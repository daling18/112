<template>
  <div  class="wrapper">
    <ul class="qd">
      <li>
        <span class="tit">渠道名称：</span>
        TDM
      </li>
      <li>
        <span class="tit">账户余额：</span>
        <span class="cost">{{totalBal}}元</span>
      </li>
    </ul>
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">收入</li>
        <router-link v-if="$menuPermission('api/finance/get_acc_expenditure')" :to="{path: '/channel-settlement/expend'}" tag="li">支出</router-link>
        <router-link v-if="$menuPermission('api/finance/get_acc_trade_record')" :to="{path: '/channel-settlement/trade'}" tag="li">交易记录</router-link>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">单号查询</div>
        <el-input v-model="searchData.orderId" placeholder="单号查询"></el-input>
      </div>
      <div class="search-item calendar">
        <div class="label">创建时间</div>
        <el-date-picker v-model="searchData.createtime" type="date" placeholder="选择日期" :editable="false"  :picker-options="datepickerOptions1"></el-date-picker>
        <div class="label zhi">-</div>
        <el-date-picker v-model="searchData.finishtime" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getAccIncome(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->

    <div class="cont">
      <div class="panel">
        <div class="hd">
          <h2>收支记录</h2>
        </div>
        <div class="bd">
          <el-table
            :data="tableData"
            style="width: 100%"
            class="el-table--middle"
            border
            >
            <el-table-column
              prop="id"
              label="交易单号"
              align="center"
              width="280"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="公司名称"
              align="center"
              width="160"
              :resizable="false"
              prop="company"
              >
            </el-table-column>
            <el-table-column
              label="交易渠道"
              align="center"
              :resizable="false"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.tradeWay === 'yeepay_b2c'">易宝</div>
              <div v-else-if="scope.row.tradeWay === 'weixin_b2c'">微信</div>
              <div v-else-if="scope.row.tradeWay === 'alipay_b2c'">支付宝</div>
              <div v-else-if="scope.row.tradeWay === 'pos_b2c'">POS</div>
              <div v-else>--</div>
            </template>
            </el-table-column>
            <el-table-column
              label="交易金额"
              align="center"
              :resizable="false"
              prop="amt"
            >
            </el-table-column>
            <el-table-column
              label="手续费"
              align="center"
              :resizable="false"
              prop="fee"
            >
            </el-table-column>
            <el-table-column
              label="创建时间"
              align="center"
              :resizable="false"
              prop="createtime"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import {getUserAccBal, getAccIncome}from 'src/api/api'
import { formattDate} from 'src/assets/js/common.js'

export default {
  data () {
    return {
      totalPage: 1,
      currentPage:1,
      page:1,
      pageShow:true,
      searchData: {
        orderId: "",
        createtime: "",
        finishtime: "",
        pageSize: "",
        pageNo: "",
      },
      resData: {
        orderId: "",
        createtime: "",
        finishtime: "",
        pageSize: "",
        pageNo: "", 
      },
      tableData: [],
      totalBal: "",
    }
  },
  methods:{
    getUserAccBal() {
      let params = {
        data: {}
      };
      getUserAccBal({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.totalBal = result.data.totalBal;
          } else {
            this.$message({
              type: "error",
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    getAccIncome(type) {
      if(type) {
        this.resData = {...this.searchData};
        this.resData.pageNo = 1;
      } else {
        this.searchData = {...this.resData};
      };
      this.resData.createtime = this.resData.createtime ? formattDate(this.resData.createtime) : '';
      this.resData.finishtime = this.resData.finishtime ? formattDate(this.resData.finishtime) : '';
      let params = {
        data: this.resData
      };
      getAccIncome({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.tableData = result.data.list;
            this.totalPage = result.data.totalPageNo;
          } else {
            this.$message({
              type: "error",
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    handleCurrentChange(val){
      this.resData.pageNo = val;
      this.getAccIncome();
    },
  },
  computed: {
    datepickerOptions1(){
      let depart_date = this.searchData.finishtime;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      }
    },
    datepickerOptions2(){
      let depart_date = this.searchData.createtime;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      }
    }
  },
  mounted(){
    this.getUserAccBal();
    this.getAccIncome();
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

.panel{
  margin-bottom: 20px;
  .hd{
    padding: 10px 0 25px;

    h2{
      display: inline-block;
      color: #b10c79;
      font-size: 18px;
      border-left: 5px solid #b10c79;
      padding-left: 10px;
      line-height: 20px;
    }

    span{
      margin-left: 20px;
      color: #999;
      i{
        color: #f60;
        font-style: normal;
      }
    }
    .op-btn{
      float: right;
    }
  }
}
.cont{
  padding: 20px;
  background-color: #fff;
}
.qd{
  margin-bottom: 10px;
  padding: 5px 20px;
  background: #fff;
  list-style-type: none;
  li{
    line-height: 30px;
  }
  .tit{
    color: #999;
  }
  .cost{
    color: #ff6600;
  }
}
</style>
