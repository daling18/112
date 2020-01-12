<!--src/components/finace/report/branch.vue-->
<template>
  <div class="hotelorder-wrap">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link :class='name === "MemberEarnings" ? "on" : ""' :to="'/member/earnings?id=' + $route.query.id" tag="li">收入</router-link>
        <router-link :class='name === "MemberWithdraw" ? "on" : ""' :to="'/member/withdraw?id='+ $route.query.id" tag="li">提现</router-link>
      </ul>
    </div>
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">提现状态</div>
          <el-select v-model="filter.withdraw_status" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option v-for="(val, key) in WITHDRAW_STATUS" :key="key" :label="val" :value="val"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">提现单号</div>
          <el-input v-model="filter.withdraw_no" placeholder="请输入单号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">提现时间</div>
          <el-date-picker
            v-model="orderTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleChangeDeparture">
           </el-date-picker>         
        </div>
        <el-button type="primary" @click="handleSerarchOrder">搜索</el-button>
      </div>
    </div>
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <div class="priceBox"><span>累计提现金额</span><span>¥ {{withdraw_amount}}</span></div>
        <el-table :data="dataList" border tooltip-effect="light" style="width: 100%">
          <el-table-column header-align="center" align="center" label="提现单号" width="180">
            <template slot-scope="prop">
              {{ prop.row.withdraw_no }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="提现金额" >
            <template slot-scope="prop">
              {{ prop.row.amount }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="提现时间" width="180">
            <template slot-scope="prop">
              {{ prop.row.create_time }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="提现状态">
            <template slot-scope="prop">
              {{ prop.row.withdraw_status_cn }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="提现方式">
            <template slot-scope="prop">
              {{ prop.row.bank_str }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="提现账号">
            <template slot-scope="prop">
              {{ prop.row.bank_card }}
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
import { getWithdrawList } from "src/api/member";
import * as format from 'src/utils/format';


export default {
  data() {
    return {
      name: this.$route.name ? this.$route.name : '',
      WITHDRAW_STATUS: ['已提现','未提现'],
      dataList: [],
      orderTime: [],
      withdraw_amount: 0,
      filter: {
        member_id: this.$route.query.id,
        withdraw_status: "",
        withdraw_no: "",
        start_time: "",
        end_time: "",
        page_size: 10,
        page: 1
      },
      total_count: 1,
      page_size: 10,
      page_index: 1,
      export_data_url: ""
    };
  },
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
      getWithdrawList({
        params: params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.dataList = result.data.list;
            this.withdraw_amount = result.data.withdraw_amount || 0.00;
            this.total_count = result.data.totalCount * 1;
          } else {
            this.dataList = [];
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          };
        },
        showLoading: true
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