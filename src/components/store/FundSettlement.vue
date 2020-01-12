<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">同行结算</li>
        <!-- <router-link
          tag="li"
          v-if="$menuPermission('api/zhike/customer_settlement_list')"
          to="/dire-settlement"
        >
          订单结算
        </router-link> -->
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">名称</div>
        <el-input v-model="searchData.keyword" placeholder="供应商/代理商名称"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" border class="el-table--middle fund-settlement-table" style="width: 100%"	>
          <el-table-column
            label="供应商/代理商名称"
            header-align="center"
            align="center"
            min-width="150"
            :resizable="false"
          >
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.settlement_org_name">{{ scope.row.settlement_org_name }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="我的余额"
            header-align="center"
            align="right"
            width="120"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.fund_balance === ''" >--</span>
              <span v-else style="color:#FF6000;">{{ scope.row.fund_balance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="我的授信额度"
            header-align="center"
            align="right"
            width="120"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span style="color:#FF6000;">{{ scope.row.credit_line }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="我的可下单金额"
            header-align="center"
            align="right"
            width="120"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span style="color:#FF6000;">{{ scope.row.purchase_amount < 0 ? '< 0' : scope.row.purchase_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100" :resizable="false">
            <template slot-scope="scope">
              <el-dropdown v-if="$menuPermission('api/finance/do_add_credit_line') && scope.row.settlement_org_id" trigger="click">
                <span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"/></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="$menuPermission('api/finance/do_add_credit_line')">
                    <a href="javascript:;" @click="$message.error('页面未实现')">余额明细</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div v-else-if="scope.row.settlement_org_id">--</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="totalPage">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import { financeIndex }from 'src/api/api_store'

export default {
  name: 'FundSettlement',
  data () {
    return {
      // orgtype: localStorage.getItem('orgtype'),
      totalPage: 0,
      searchData: {
        keyword: this.$route.query.keyword || '',
        page: this.$route.query.page || 1,
        page_size: this.$route.query.page_size || 10
      },
      // all_fu_total:0,
      // all_shou_total:0,
      tableData: [
      ]
    }
  },
  computed:{
  },
  watch: {
    '$route.query': function(query) {
      console.log('watch $route.query ', query)
      this.searchData = {
        keyword: query.keyword || '',
        page: query.page || 1,
        page_size: query.page_size || 10
      };
      this.getDataList();
    }
  },
  mounted(){
    this.getDataList();
  },
  methods:{
    handleCurrentChange(val){
      let query = {... this.$route.query};

      if(query.page != val) {
        query.page = val;
        this.$router.replace({query: query});
      }
    },
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    getDataList(){
  		financeIndex({
        params: {data: this.searchData},
        success:(params) => {
          let data=params.data;
          if(data.code=='0'){
            // this.all_fu_total=data.data.all_fu_total;
            // this.all_shou_total=data.data.all_shou_total;
            const total = {
              settlement_org_name: '合计',
              fund_balance: '',
              credit_line: data.data.all_credit_line,
              purchase_amount: data.data.all_purchase_amount
            };
            this.tableData = [total].concat(data.data.list);
            this.totalPage = data.data.total_page || 0;
            this.searchData.page = data.data.page_index;
          }else{
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSearch(){
      this.searchData.page = 1;
      this.$router.replace({query: this.searchData});
    }
  }
}
</script>

<style lang="scss">
	.fund-settlement-table .el-table__row:first-child{
		font-weight: bold;
	}
</style>
