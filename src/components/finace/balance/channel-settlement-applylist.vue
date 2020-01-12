<template>
  <div  class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link v-if="$menuPermission('api/finance/channel_settlement_apply_list')" :to='{path: "/channel-settlement/apply"}' tag="li">申请结算</router-link>
        <li v-if="$menuPermission('api/finance/channel_settlement_list')" class="on">结算单</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">结算单号</div>
          <el-input v-model="searchData.account_no" placeholder="单号查询"></el-input>
        </div>
        <div class="search-item calendar">
          <div class="label">申请时间</div>
          <el-date-picker v-model="searchData.create_time_start" type="date" placeholder="选择日期" :editable="false"  :picker-options="datepickerOptions1"></el-date-picker>
          <div class="label zhi">-</div>
          <el-date-picker v-model="searchData.create_time_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
        </div>
      </div>
      <div class="search-item">
        <div class="label">结算渠道</div>
        <el-select v-model="searchData.account_type" clearable>
          <el-option v-for="(item, index) in account_type_list" :value="index" :label="item" :key="index"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">结算状态</div>
        <el-select v-model="searchData.account_status" clearable>
          <el-option v-for="(item, index) in account_status_list" :value="index" :label="item" :key="index"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">订单号</div>
        <el-input v-model="searchData.order_no" placeholder=""></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="channelSettlementList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->

    <!-- system-content -->
    <div class="system-content">
      <div class="content-list">
        <el-table
          :data="list"
          border
          >
          <el-table-column
            prop="account_no"
            label="结算单号"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="供应商"
            align="center"
            width="160"
            prop="supplier_org_name"
            >
          </el-table-column>
          <el-table-column
            label="供应商联系方式"
            align="center"
          >
           <template slot-scope="scope">
              <p>{{scope.row.user_name}}</p>
              <p>{{scope.row.supplier_tel}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="退款金额"
            align="center"
            prop="refund_amount"
          >
          </el-table-column>
          <el-table-column
            label="结算金额"
            align="center"
            prop="amount"
          >
          </el-table-column>
          <el-table-column
            label="结算日期"
            align="center"
            prop="account_time"
          >
          </el-table-column>
          <el-table-column
            label="申请日期"
            align="center"
            prop="create_time"
          >
          </el-table-column>
          <el-table-column
            label="结算状态"
            align="center"
            prop="account_status_name"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
          <template slot-scope="scope">
            <router-link v-if="$menuPermission('api/finance/channel_settlement_detail')" :to='{path: "/channel-settlement/applydetail", query: {id: scope.row.account_no}}'>查看明细</router-link>
            <span v-else>--</span>
          </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- /system-content -->
    <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="resData.page"
        :total="total_count">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import {channelSettlementList}from 'src/api/api'
import { formattDate} from 'src/assets/js/common.js'

export default {
  name: 'setting',
  data () {
    return {
      total_count: 1,
      pageShow: true,
      searchData: {
        account_no: "",
        create_time_start: "",
        create_time_end: "",
        account_status: "",
        account_type: "",
        order_no: "",
        page: 1
      },
      resData: {
        account_no: "",
        create_time_start: "",
        create_time_end: "",
        account_status: "",
        account_type: "",
        order_no: "",
        page: 1
      },
      list: [],
      account_type_list: [],
      account_status_list: []
    }
  },
  methods:{
    channelSettlementList(type) {
      if(type) {
        this.resData.page = 1;
        this.resData = {...this.searchData};
      }else {
        this.searchData = {...this.resData}
      };
      this.resData.create_time_start = this.resData.create_time_start ? formattDate(this.resData.create_time_start) : "";
      this.resData.create_time_end = this.resData.create_time_end ? formattDate(this.resData.create_time_end) : "";
      let params = {
        data: this.resData
      };
      channelSettlementList({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.list = result.data.list;
            this.total_count = result.data.total_count;
            this.account_type_list = result.data.account_type_list;
            this.account_status_list = result.data.account_status_list;
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
        this.resData.page = val;
        this.channelSettlementList();
    },
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
    this.channelSettlementList();
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
</style>
