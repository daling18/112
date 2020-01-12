<template>
  <div  class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li v-if="$menuPermission('api/finance/channel_settlement_apply_list')" class="on">申请结算</li>
        <router-link v-if="$menuPermission('api/finance/channel_settlement_list')" :to="{path: '/channel-settlement/applylist'}" tag="li">结算单</router-link>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">订单号</div>
          <el-input v-model="searchData.order_no" placeholder=""></el-input>
        </div>
        <div class="search-item calendar">
          <div class="label">出发时间</div>
          <el-date-picker v-model="searchData.departure_date_start" type="date" placeholder="选择日期" :editable="false"  :picker-options="datepickerOptions1"></el-date-picker>
          <div class="label zhi">-</div>
          <el-date-picker v-model="searchData.departure_date_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
        </div>
      </div>
      <div class="search-item">
        <div class="label">产品类型</div>
        <el-select v-model="searchData.product_type">
          <el-option :value="index" :label="item" v-for="(item, index) in product_type_list" :key="index"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">产品名称</div>
        <el-input v-model="searchData.product_name" placeholder=""></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="channelSettlementApplyList(1)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->

    <!-- system-content -->
    <div class="system-content">
      <div class="content-list">
        <el-button type="primary" class="btn" @click="channelSettlementApply">
          生成结算单
        </el-button>
        <!-- mode-table -->
        <div class="mode-table">
          <el-table :data="tableData" border @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="40"
            >
            </el-table-column>
            <el-table-column 
              label="订单号"
              prop="order_no"
              min-width="200"
              header-align="center"
            >
            </el-table-column>
            <el-table-column 
              label="产品类型/产品名称"
              align="center"
              min-width="200"
            >
            <template slot-scope="scope">
              <p class="ellipsis" :title="`${scope.row.product_type_name}-${scope.row.tuan_name}`">{{scope.row.product_type_name}}-{{scope.row.tuan_name}}</p>
            </template>
            </el-table-column>
            <el-table-column 
              label="下单时间"
              prop="scheduled_time"
              min-width="180"
              header-align="center">
            </el-table-column>
            <el-table-column 
              label="出发/归来时间"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <p>{{scope.row.departure_date}}</p>
                <p>{{scope.row.back_date}}</p>
              </template>
            </el-table-column>
            <el-table-column 
              label="退款金额"
              prop="refund_amount"
              align="center">
            </el-table-column>
            <el-table-column
              label="结算金额"
              prop="final_payment"
              align="center"
            >
            </el-table-column>
            <el-table-column 
              label="同行总价"
              prop="peer_total_price"
              align="center">
            </el-table-column>
            <el-table-column 
              label="订单人数"
              prop="enrollment"
              align="center">
            </el-table-column>
            <el-table-column 
              label="金额类型"
              prop="amount_type"
              align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- /mode-table -->
      </div>
    </div>
    <!-- /system-content -->
    <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="resData.page"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import {channelSettlementApplyList, channelSettlementApply}from 'src/api/api'
import { formattDate} from 'src/assets/js/common.js'

export default {
  name: 'setting',
  data () {
    return {
      id:'',
      totalCount: 1,
      pageShow: true,
      searchData: {
        product_name: "",
        product_type: "",
        departure_date_start: "",
        departure_date_end: "",
        order_no: "",
        page: 1,
      },
      resData: {
        product_name: "",
        product_type: "",
        departure_date_start: "",
        departure_date_end: "",
        order_no: "",
        page: 1,
      },
      tableData: [],
      product_type_list: {},
      orderNoList: []
    }
  },
  methods:{
    channelSettlementApplyList(type) {
      if(type) {
        this.searchData.page = 1;
        this.resData = {...this.searchData};
      } else {
        this.searchData = {...this.resData};
      };
      this.resData.departure_date_start = this.resData.departure_date_start ? formattDate(this.resData.departure_date_start) : "";
      this.resData.departure_date_end = this.resData.departure_date_end ? formattDate(this.resData.departure_date_end) : "";
      let params = {
        data: this.resData
      };
      channelSettlementApplyList({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.product_type_list = result.data.product_type_list;
            this.tableData = result.data.list;
            this.totalCount = result.data.total_count;
            // this.page_index = result.data.page_index;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          };
        },
        showLoading: true
      })
    },
    handleCurrentChange(val){
      this.resData.page = val;
      this.channelSettlementApplyList()
    },
    handleSelectionChange(val) {
      this.orderNoList = []
      //  console.log(this.orderNoList)
      if(val && val.length > 0) {
        val.forEach((item) => {
          this.orderNoList.push(item.order_no);
        });
      }
    },
    channelSettlementApply() {
      let params = {
        data: {
          order_no_list: this.orderNoList
        }
      };
      channelSettlementApply({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.channelSettlementApplyList();
             this.$message({
              type: "success",
              message: result.msg
            });
          } else {
            this.$message({
              type: "error",
              message: result.msg
            });
          }
        },
        showLoading: true
      }) 
    }
  },
  computed: {
    datepickerOptions1(){
      let depart_date = this.searchData.departure_date_end;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      }
    },
    datepickerOptions2(){
      let depart_date = this.searchData.departure_date_start;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      }
    }
  },
  mounted(){
    this.channelSettlementApplyList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .content-list{
    .table-title{
      height:36px;
      margin:16px 0 10px 0;
      .btn-areas{
          float:right;
      }
    }
  }
  .btn {
    width: 125px;
    margin-bottom: 10px;
  }
</style>
