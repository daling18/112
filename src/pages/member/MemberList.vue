<!--src/components/finace/report/branch.vue-->
<template>
  <div class="hotelorder-wrap">
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">会员编号</div>
          <el-input v-model="filter.yingke_code" placeholder="请输入用户编号"></el-input>          
        </div>
        <div class="search-item">
          <div class="label">手机号</div>
          <el-input v-model="filter.mobile" placeholder="请输入手机号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">用户昵称</div>
          <el-input v-model="filter.nick_name" placeholder="请输入用户昵称"></el-input>
        </div>
        <div class="search-item width2">
          <div class="label">收益金额</div>
          <el-input v-model="filter.income_low" placeholder="最低收益"></el-input>
          <span style="display: block; float: left; line-height: 30px; color: #ccc;height: 40px;">—</span>
          <el-input v-model="filter.income_high" placeholder="最高收益"></el-input>

        </div>
        <el-button type="primary" @click="handleSerarchOrder">搜索</el-button>
      </div>
    </div>
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <el-table :data="dataList" border tooltip-effect="light" style="width: 100%">
          <el-table-column
            prop="yingke_code"
            header-align="center"
            label="用户编号"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            header-align="center"
            label="手机号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="nick_name"
            header-align="center"
            label="用户昵称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="total_invite_income"
            header-align="center"
            label="收益金额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="total_order_num"
            header-align="center"
            label="订单数量"
            align="center"
          ></el-table-column>
          <!-- <el-table-column
            header-align="center"
            label="账户启用状态"
            width="160"
          >
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.order_create_time"
                    active-color="#b10c79"
                    off-color="#999"
                >
                </el-switch>
            </template>
          </el-table-column> -->
          <el-table-column
            header-align="center"
            label="操作"
            width="160"
            align="center"
          >
            <template slot-scope="scope">
              <router-link :to="{path: 'detail', query: {id: scope.row.id}}">查看</router-link>
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

import { getUserList } from "src/api/member";

export default {
  data() {
    var that = this;
    return {
      dataList: [],
      filter: {
        yingke_code: "",
        mobile: "",
        nick_name: "",
        income_low: "",
        income_high: "",
        page_size: 10,
        page: 1
      },
      total_count: 1,
      page_size: 10,
      page_index: 1
    };
  },
  filters: {
    
  },
  computed: {},
  watch: {},
  methods: {
    handleSerarchOrder(){
      this.filter.page = 1;
      this.initDataList();
    },    
    initDataList() {
      var params = {
        data : {...this.filter}
      }
      getUserList({
        params: params,
        success: (res) => {
          let data = res.data;
          this.dataList = data.data.list;
          this.total_count = data.data.total_page;
        },
        showLoading: false
      })
    },
    pageChange(page) {
      this.filter.page = page;
      this.initDataList();
    }
  },
  mounted() {
    this.initDataList();
  }
};
</script>
<style lang="less" scoped>
  .width2 {
    width: 400px;
  }
</style>