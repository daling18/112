
<template>
  <div class="wrapper" >
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">销售姓名</div>
        <el-input v-model="searchData.username" placeholder="请输入销售姓名"/>
      </div>
      <div class="search-item">
        <div class="label">手机号</div>
        <el-input v-model="searchData.mobile" placeholder="请输入手机号"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="initPageFn(true)">查询</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              {{ scope.row.username}}
            </template>
          </el-table-column>
          <el-table-column label="销售业绩" align="center">
            <template slot-scope="scope">
              {{ scope.row.order_amout }}
            </template>
          </el-table-column>
          <el-table-column label="成交单数" align="center">
            <template slot-scope="scope">
              {{ scope.row.order_num }}
            </template>
          </el-table-column>
          <el-table-column label="拉新收益" align="center">
            <template slot-scope="scope">
              <router-link :to="`/settlement/earnings/list?salesman=${scope.row.username}`">{{ scope.row.income }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="客户数量" align="center">
            <template slot-scope="scope">
              <router-link :to="`/client/list?sale_name=${scope.row.username}`">{{ scope.row.custom_num }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="手机号" align="center">
            <template slot-scope="scope">
              {{ scope.row.mobile }}
            </template>
          </el-table-column>
          <el-table-column label="微信号" align="center">
            <template slot-scope="scope">
              {{ scope.row.weixin }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.create_time }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page">
      <el-pagination v-if="totalPage" layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="searchData.page_index" :total="totalPage"/>
    </div>
  </div>
</template>

<script>
import {
  getSaleAccound
} from "src/api/user";

export default {
  data() {
    return {
      totalPage: "",
      tableData: [],
      searchData: {
        username: "",
        mobile: "",
        page_index: 1
      }
    };
  },
  methods: {
    handleCurrentChange(page){
      if (this.searchData.page != page) {
        this.searchData.page_index = page;
        this.initPageFn();
      }
    },
    initPageFn(one){
      if(one){
        this.searchData.page_index = 1;
      }
      getSaleAccound({
        params: { data: this.searchData },
        success: res => {
          let listData = res.data;
          if(listData.code == 0){
            this.tableData = listData.data.list;
            this.totalPage = listData.data.total * 1;
          }else{
            this.tableData = []
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.initPageFn();
  }
};
</script>
