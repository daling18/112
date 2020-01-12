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
        <router-link v-if="$menuPermission('api/finance/get_acc_income')" :to="{path: '/channel-settlement/income'}" tag="li">收入</router-link>
        <router-link v-if="$menuPermission('api/finance/get_acc_expenditure')" :to="{path: '/channel-settlement/expend'}" tag="li">支出</router-link>
        <li class="on">交易记录</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">资金流向</div>
          <el-select v-model="searchData.tradeFlag">
            <el-option value="0" label="收入"></el-option>
            <el-option value="1" label="支出"></el-option>
          </el-select>
        </div>
        <div class="search-item calendar width2">
          <div class="label">交易时间</div>
          <el-date-picker v-model="searchData.createtime" type="date" placeholder="选择日期" :editable="false"  :picker-options="datepickerOptions1"></el-date-picker>
          <div class="label zhi">-</div>
          <el-date-picker v-model="searchData.finishtime" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
        </div>
      </div>
      <div class="search-item">
        <div class="label">交易分类</div>
        <el-select v-model="searchData.busiCode">
          <el-option value="" label="全部"></el-option>
          <el-option value="001000" label="充值"></el-option>
          <el-option value="002000" label="订单支付"></el-option>
          <el-option value="003000" label="贷款结算"></el-option>
          <el-option value="004000" label="订单退货"></el-option>
          <el-option value="005000" label="佣金结算"></el-option>
          <el-option value="006000" label="提现"></el-option>
          <el-option value="003001" label="结算返点"></el-option>
        </el-select>
      </div>
      <div class="search-item calendar width2">
        <div class="label">关键字</div>
        <el-select v-model="searchType" class="fl">
          <el-option value="0" label="全部"></el-option>
          <el-option value="1" label="交易号"></el-option>
          <el-option value="2" label="产品名称"></el-option>
        </el-select>
        <el-input v-model="searchInfo" placeholder="请输入关键字"></el-input>
      </div>
      <!-- <div class="search-item">
        <div class="label">交易号</div>
        <el-input v-model="searchData.orderId" placeholder="请输入交易号"></el-input>
      </div>
      <div class="search-item">
        <div class="label">产品名称</div>
        <el-input v-model="searchData.productName" placeholder="请输入产品名称"></el-input>
      </div> -->
      <div class="search-item search-button">
        <el-button type="primary" @click="getAccTradeRecord(true)">立即搜索</el-button>
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
              label="商户订单号／交易号"
              align="center"
              width="160"
              :resizable="false"
            >
            <template slot-scope="scope">
              <p>{{ scope.row.productNo}}</p>
              <p>{{ scope.row.orderId}}</p>
            </template>
            </el-table-column>
            <el-table-column
              label="交易分类"
              align="center"
              width="120"
              :resizable="false"
              >
              <template slot-scope="scope">
                <div v-if="scope.row.busiCode == '001000'">充值</div>
                <div v-else-if="scope.row.busiCode == '002000'">订单支付</div>
                <div v-else-if="scope.row.busiCode == '003000'">贷款结算</div>
                <div v-else-if="scope.row.busiCode == '00400'">订单退货</div>
                <div v-else-if="scope.row.busiCode == '005000'">佣金结算</div>
                <div v-else-if="scope.row.busiCode == '006000'">提现</div>
                <div v-else-if="scope.row.busiCode == '003001'">结算返点</div>
              </template>
            </el-table-column>
            <el-table-column
              label="资金流向"
              align="center"
              :resizable="false"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.tradeFlag == 0">收入</div>
              <div v-else-if="scope.row.tradeFlag == 1">支出</div>
            </template>
            </el-table-column>
            <el-table-column
              label="金额"
              align="center"
              :resizable="false"
              prop="amt"
            >
            <template slot-scope="scope">
              <span v-if="scope.row.tradeFlag == 0">+</span>
              <span v-else-if="scope.row.tradeFlag == 1">-</span>
              {{scope.row.amt}}
            </template>
            </el-table-column>
            <el-table-column
              label="收款方"
              align="center"
              :resizable="false"
              prop="oppCompany"
            >
            </el-table-column>
            <el-table-column
              label="账户余额"
              align="center"
              :resizable="false"
              prop="bal"
            >
            </el-table-column>
            <el-table-column
              label="支付方式"
              align="center"
              :resizable="false"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.chnType == '1000'">余额</div>
              <div v-else-if="scope.row.chnType == '2000'">支付宝</div>
              <div v-else-if="scope.row.chnType == '3000'">微信</div>
              <div v-else-if="scope.row.chnType == '4200'">易宝</div>
              <div v-else-if="scope.row.chnType == '4400'">POS</div>
            </template>
            </el-table-column>
            <el-table-column
              label="产品编号"
              align="center"
              :resizable="false"
              prop="productNo"
            >
            </el-table-column>
            <el-table-column
              label="产品名称"
              align="center"
              :resizable="false"
              prop="productName"
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

import {getUserAccBal, getAccTradeRecord}from 'src/api/api'
import { formattDate} from 'src/assets/js/common.js'

export default {
  data () {
    return {
      totalPage: 1,
      currentPage:1,
      page:1,
      pageShow:true,
      searchType: "0",
      searchInfo: "",
      searchData: {
        tradeFlag: "0",
        busiCode: "",
        createtime: "",
        finishtime: "",
        orderId: "",
        pageSize: "",
        pageNo: "",
        productName: ""
      },
      resData: {
        tradeFlag: "0",
        busiCode: "",
        createtime: "",
        finishtime: "",
        orderId: "",
        pageSize: "",
        pageNo: "",
        productName: ""
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
    getAccTradeRecord(type) {
      if(type) {
        if(this.searchType === "0") {
          this.searchData.orderId = this.searchInfo;
          this.searchData.productName = this.searchInfo;
        } else if(this.searchType === "1") {
          this.searchData.orderId = this.searchInfo;
        } else if(this.searchType === '2') {
          this.searchData.productName = this.searchInfo;
        };
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
      getAccTradeRecord({
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
      this.getAccTradeRecord();
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
    this.getAccTradeRecord();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fl {
  float: left;
  margin-right: 10px;
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
