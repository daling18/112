<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">同行认款</li>
        <li v-if="$menuPermission('api/zhike/receipts_list')"><router-link :to="{path:'/sale/recognition/dire-proceeds'}">直客收款</router-link></li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">代理商</div>
        <el-input v-model="inputOrgName" placeholder="代理商"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              label="代理商名称"
              align="left"
              header-align="center"
              :resizable="false"
            >
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.settlement_org_name">{{ scope.row.settlement_org_name }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="账户余额"
              align="right"
              header-align="center"
              width="150"
              :resizable="false">
              <template slot-scope="scope">￥{{ scope.row.fund_balance }}</template>
            </el-table-column>
            <el-table-column
              label="未认金额"
              align="right"
              header-align="center"
              width="150"
              :resizable="false"
            >
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.unclaimed_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="查看" width="200" align="center" :resizable="false">
              <template slot-scope="scope">
                <template v-if="$menuPermission('api/tuan/sale_receipt_list,api/tuan/sale_renkuan_list')">
                  <router-link v-if="$menuPermission('api/tuan/sale_receipt_list')" :to="{path: '/sale/recognition/peer-proceeds', query: {settlement_org_id: scope.row.settlement_org_id}}">收款记录</router-link>
                  <router-link v-if="$menuPermission('api/tuan/sale_renkuan_list')" :to="{path: '/sale/recognition/peer-record', query: {id: scope.row.settlement_org_id}}">认款记录</router-link>
                </template>
                <template v-else>
                  --
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import { saleOrderRenkuan } from 'src/api/api';
export default {
  name: 'PeerOrder',
  data() {
    const { query } = this.$route;

    return {
      inputOrgName: '',
      searchData: {
        settlement_org_name: query.settlement_org_name || '',
        page: parseInt(query.page) || 1,
        // page_size: 10
      },
      totalPage: parseInt(query.page) || 1,
      pageShow: false,
      tableData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.inputOrgName = this.searchData.settlement_org_name;

      let params = {
        data: this.searchData
      };
      saleOrderRenkuan({
        params: params,
        success: resp => {
          let data = resp.data;

          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.searchData.page = data.data.page_index;
            this.pageShow = !!data.data.total_page;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSearch(){
      this.searchData.settlement_org_name = this.inputOrgName;
      this.searchData.page = 1;
      this.getList()
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if (this.searchData.page != val) {
        this.searchData.page = val;
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    }
  }
};
</script>
