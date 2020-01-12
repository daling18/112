<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li v-if="$menuPermission('api/tuan/sale_order_renkuan')"><router-link :to="{path:'/sale/recognition/peer-order'}">同行认款</router-link></li>
        <li class="on">直客收款</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range label="收款日期" v-model="paymentDate" @change="handlePaymentDateChange"/>
      <search-item-date-range label="创建日期" v-model="createTime" @change="handleCreateTimeChange"/>
      <div class="search-item">
        <div class="label">收款ID</div>
        <el-input v-model="searchData.payment_id" placeholder="收款ID"/>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchData.user_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">收款状态</div>
        <el-select v-model="searchData.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">未认金额</div>
        <input-number  :precision="3" v-model="searchData.fund_balance" placeholder="未认金额"/>
      </div>
      <div class="search-item">
        <div class="label">收款金额</div>
        <input-number  :precision="3" v-model="searchData.rmb_total_amount" placeholder="收款金额"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="收款ID" align="center" width="100">
            <template slot-scope="scope">
              <span class="color-purple">{{ `[${scope.row.tag}]` }}</span>&nbsp;{{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="收款金额" header-align="center" width="120" align="right">
            <template slot-scope="scope">
              <span v-if="scope.row.renkuan_status != '已认清'" class="tag-orange" title="未认清">未</span>
              <span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已认金额" header-align="center" width="120" align="right">
            <template slot-scope="scope">￥{{ scope.row.renkuan_total_amount }}</template>
          </el-table-column>
          <el-table-column label="未认金额" header-align="center" width="120" align="right">
            <template slot-scope="scope">￥{{ scope.row.no_renkuan_total_amount }}</template>
          </el-table-column>
          <el-table-column label="操作人" align="center" min-width="100">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="收款日期" align="center" width="100" prop="payment_date">
            <template slot-scope="scope">
              <span class="color-gray">{{ scope.row.payment_date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" align="center" width="150" prop="create_time" />
          <el-table-column label="收款状态" align="center" width="80">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status | getStatusColor">{{ scope.row.payment_status_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <router-link 
                v-if="$menuPermission('api/tuan/zhike_get_gathering_info')" 
                :to="{path: 'dire-proceeds/receive-detail', query: {parent_id: $route.query.id, id:scope.row.id}}"
              >查看收款</router-link>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="searchDataParams.page" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import { receiptsList } from 'src/api/zhike';
import InputNumber from 'src/plugins/InputNumber';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'DireProceeds',
  components: {
    InputNumber,
    SearchItemDateRange
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 3: 
      case 5: 
        return 'color-red';
      case 2: 
        return 'color-green';
      case 4:
      default:
        return 'color-gray';
      }
    }
  },
  data() {
    const { query } = this.$route;

    return {
      paymentDate: [query.payment_date_start, query.payment_date_end],
      createTime: [query.create_time_start, query.create_time_end],
      searchData:{
        payment_status: '',
        payment_id:'',
        user_name:'',
        rmb_total_amount:'',
        page: 1,
        // page_size: 10
      },
      searchDataParams:{
        payment_date_start: query.payment_date_start || '',
        payment_date_end: query.payment_date_end || '',
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        payment_status: query.payment_status || '',
        payment_id: query.payment_id || '',
        user_name: query.user_name || '',
        rmb_total_amount: query.rmb_total_amount || '',
        page: parseInt(query.page) || 1,
        // page_size: 2
      },
      totalPage: parseInt(query.page) || 1,
      pageShow: true,
      PAYMENT_STATUS_MAP: {},
      tableData: [],
    };
  },
  computed: {
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(isSearch){
      if (isSearch) {
        this.searchDataParams = {... this.searchData};
        this.searchDataParams.page = 1;
      } else {
        this.searchData = {... this.searchDataParams};
      }

      receiptsList({
        params: {data: this.searchDataParams},
        success: (resp) => {
          const {data, code, msg} = resp.data;

          if (code == '0' && data) {
            this.PAYMENT_STATUS_MAP = data.payment_status || {};
            this.tableData = data.data,
            this.totalPage = data.total_page;
            this.searchDataParams.page = data.page_index;
            this.pageShow = data.total_page != 0;
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handlePaymentDateChange(val){
      this.searchData.payment_date_start = val[0];
      this.searchData.payment_date_end = val[1];
    },
    handleCreateTimeChange(val){
      this.searchData.create_time_start = val[0];
      this.searchData.create_time_end = val[1];
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchDataParams});
    },
    handleCurrentChange(val) {
      if(val != this.searchDataParams.page){
        this.searchDataParams.page = val;
        this.paymentDate = [this.searchDataParams.payment_date_start, this.searchDataParams.payment_date_end];
        this.createTime = [this.searchDataParams.create_time_start, this.searchDataParams.create_time_end];
        this.getList();
        this.$router.replace({query: this.searchDataParams});
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tag-orange{
  color: #ff0000;
  font-size: 12px;
  padding: 3px 4px 3px;
  border-radius: 2px;
  cursor: default;
  background-color: #fff2f2;
}
</style>
