<!--src/components/finace/report/branch.vue-->
<template>
  <div class="hotelorder-wrap">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link :class='name === "MemberEarnings" ? "on" : ""' :to="'/member/earnings?id=' + member_id " tag="li">收入</router-link>
        <router-link :class='name === "MemberWithdraw" ? "on" : ""' :to="'/member/withdraw?id=' + member_id" tag="li">提现</router-link>
      </ul>
    </div>
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">订单类型</div>
          <el-select v-model="filter.order_type" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option v-for="(val, key) in PRODUCT_TYPE" :key="key" :label="val" :value="val"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单编号</div>
          <el-input v-model="filter.order_no" placeholder="请输入订单编号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">下单时间</div>
          <el-date-picker
            v-model="orderTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChangeDeparture"
            >
           </el-date-picker>         
        </div>
        <el-button type="primary" @click="handleSerarchOrder">搜索</el-button>
      </div>
    </div>
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <div class="priceBox"><span>收益金额</span><span>¥{{statistics.total}}</span><span>可提现金额</span><span>¥{{statistics.reward}}</span></div>
        <el-table :data="dataList" border tooltip-effect="light" style="width: 100%">
          <el-table-column header-align="center" align="center" label="一级收益" width="180">
            <template slot-scope="prop">
              {{ prop.row.first_profit }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="二级收益" >
            <template slot-scope="prop">
              {{ prop.row.second_profit }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="下单时间" width="180">
            <template slot-scope="prop">
              {{ prop.row.create_time }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="订单类型">
            <template slot-scope="prop">
              {{ prop.row.order_type_name }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="订单金额">
            <template slot-scope="prop">
              {{ prop.row.amount }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="订单编号">
            <template slot-scope="prop">
              {{ prop.row.order_no }}
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div v-if="dataList && dataList.length" class="page">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page_size"
          :current-page="page_index"
          :total="total_count"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import { getIncomeList } from "src/api/member";
import * as format from 'src/utils/format';

export default {
  name:"memberEarnings",
  data() {
    return {
      member_id: this.$route.query.id,
      name: this.$route.name,
      PRODUCT_TYPE: ['保险','农特优','签证','酒店','火车票','门票','机票','线路'],
      dataList: [],
      orderTime: [],
      statistics: {},
      filter: {
        member_id: this.$route.query.id,
        order_type: "",
        order_no: "",
        start_time: "",
        end_time: "",
        page_size: 10,
        page: 1
      },
      total_count: 1,
      page_size: 10,
      page_index: 1,
    };
  },
  filters: {
    getOrderType(code) {
      let type = code * 1;
      let str = "";
      switch (type) {
        case 1:
          str = "保险";
          break;
        case 2:
          str = "农特优";
          break;
        case 3:
          str = "签证";
          break;
        case 4:
          str = "酒店";
          break;
        case 5:
          str = "火车票";
          break;
        case 6:
          str = "门票";
          break;
        case 7:
          str = "机票";
          break;
        case 8:
          str = "线路";
          break;
      }
      return str;
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleChangeDeparture(){
      this.filter.start_time = format.date(this.orderTime[0]);
      this.filter.end_time = format.date(this.orderTime[1]);
    },
    handleSerarchOrder(){
      this.filter.page = 1;
      this.initOrderFilterHandler();
    },
    initOrderFilterHandler() {
      var params = {
        data : {...this.filter}
      }

      getIncomeList({
        params: params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.dataList = result.data.list;
            this.statistics = result.data.statistics;
            this.total_count = result.data.totalCount * 1;
            this.page_index = result.data.currentPage + 1;
          } else {
            this.dataList = [];
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          };
        },
        showLoading: false
      })
    },
    pageChange(page) {
      this.filter.page = page;
      this.initOrderFilterHandler();
    }
  },
  mounted() {
    this.initOrderFilterHandler();
  }
};
</script>
<style lang="less" scoped>
.date-picker {
  width: 200px !important;
}
.priceBox {
    height: 50px;
    line-height: 50px;
    background: #fff;
    text-indent: 50px;
    span {
        padding: 0 20px;
    }
}
</style>