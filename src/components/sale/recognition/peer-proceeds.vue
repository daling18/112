<template>
  <div class="wrapper">
    <div class="system-header" v-if="!isPlan">
      {{ settlementOrgName }}
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range label="收款日期" v-model="paymentDate" @change="handlePaymentDateChange"/>
      <search-item-date-range label="创建日期" v-model="createTime" @change="handleCreateTimeChange"/>
      <div class="search-item">
        <div class="label">未认金额</div>
        <input-number  v-model="searchInput.fund_balance" :precision="3" placeholder="未认金额"/>
      </div>
      <div class="search-item">
        <div class="label">收款金额</div>
        <input-number  placeholder="收款金额" :precision="3" v-model="searchInput.rmb_total_amount"/>
      </div>
      <div class="search-item">
        <div class="label">收款ID</div>
        <el-input v-model="searchInput.payment_id" placeholder="收款ID"/>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchInput.balance_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option label="未认清" value="1"/>
          <el-option label="已认清" value="2"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">收款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div style="padding: 10px 0 25px">
          总未认金额 <span class="color-orange">￥</span><span class="color-orange">{{ remain_amount }}</span>
          <!-- <span class="color-gray">&nbsp;&nbsp;&nbsp;&nbsp;该列表只显示有效收款记录</span> -->
        </div>
        <receive-table
          :data-list="tableData"
          :edit-map="EDIT_MAP"
          :top-menu-const="topMenuConst"
          :parent-id="$route.query.id"
          @success="getList()"
        >
          <el-table-column label="收款ID" align="center" width="100" :resizable="false">
            <template slot-scope="scope">
              <span class="color-purple">{{ `[${scope.row.user_type_name}]` }}</span>&nbsp;{{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="收款金额" header-align="center" align="right" width="120" :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.balance_status != '已认清'" class="tag-orange" title="未认清">未</span>
              <span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已认金额" header-align="center" align="right" width="120" :resizable="false">
            <template slot-scope="scope">￥{{ scope.row.claimed_amount }}</template>
          </el-table-column>
          <el-table-column label="未认金额" header-align="center" align="right" width="120" :resizable="false">
            <template slot-scope="scope">￥{{ scope.row.fund_balance }}</template>
          </el-table-column>
          <el-table-column label="操作人" align="center" min-width="100" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="收款日期" align="center" prop="payment_date" width="100" :resizable="false">
            <template slot-scope="scope">
              <span class="color-gray">{{ scope.row.payment_date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" align="center" prop="create_time" width="150" :resizable="false" />
          <el-table-column label="收款状态" align="center" width="100" :resizable="false">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status | getStatusColor">{{ scope.row.payment_status_name }}</span>
            </template>
          </el-table-column>
        </receive-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import { saleReceiptList } from 'src/api/api';
import { opReceiptList } from 'src/api/tuan';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import InputNumber from 'src/plugins/InputNumber';
import ReceiveTable from 'src/components/sale/ReceiveTable.comp'

export default {
  name: 'PeerProceeds',
  components: {
    InputNumber,
    SearchItemDateRange,
    ReceiveTable
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 3: 
      case 5: 
        return 'color-red';
      case 2: 
        return 'color-green';
      case 1:
      case 4:
        return 'color-gray';
      default:
        return '';
      }
    }
  },
  data() {
    const { query } = this.$route;

    return {
      EDIT_MAP: {},
      settlementOrgName: '',
      paymentDate: [query.payment_date_start, query.payment_date_end],
      createTime: [query.create_time_start, query.create_time_end],
      searchInput:{
        // tuan_id: this.$route.query.tuan_id,
        // settlement_org_id: this.$route.query.id,
        // payment_date_start: '',
        // payment_date_end: '',
        // rmb_total_amount: '',
        // fund_balance: '',
        // user_name: '',
        // balance_status: '1',
        // payment_status: ''
      },
      searchData: {
        id: query.aid,
        aid: query.aid,
        tuan_id: query.tuan_id,
        data_config_type: query.data_config_type,
        settlement_org_id: query.settlement_org_id,
        payment_id: query.payment_id,
        payment_date_start: query.payment_date_start ||'',
        payment_date_end: query.payment_date_end ||'',
        create_time_start: query.create_time_start ||'',
        create_time_end: query.create_time_end ||'',
        rmb_total_amount: query.rmb_total_amount ||'',
        fund_balance: query.fund_balance ||'',
        user_name: query.user_name ||'',
        balance_status: query.balance_status == null ? '1' : query.balance_status,
        payment_status: query.payment_status || '',
        page: parseInt(query.page) || 1
      },
      remain_amount: '',
      tableData: [],
      PAYMENT_STATUS_MAP: {},
      totalPage: parseInt(query.page) || 1,
      pageShow: false
    };
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isPlan(){ // 是否从计调操作跳转过来的
      return this.topMenuConst == 'operator';
    },
    saleReceiptListFunc(){
      if(this.isPlan){
        return opReceiptList;
      }else{
        return saleReceiptList
      }
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    handlePaymentDateChange(val){
      this.searchInput.payment_date_start = val[0];
      this.searchInput.payment_date_end = val[1];
    },
    handleCreateTimeChange(val){
      this.searchInput.create_time_start = val[0];
      this.searchInput.create_time_end = val[1];
    },
    handleCurrentChange(val) {
      if(this.searchData.page != val) {
        this.searchData.page = val;
        this.paymentDate = [this.searchData.payment_date_start, this.searchData.payment_date_end];
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    getList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }

      this.saleReceiptListFunc({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;
          this.loading = false;


          if (data.code == '0') {
            this.tableData = data.data.list;
            this.settlementOrgName = data.data.org_name;
            this.totalPage = data.data.total_page;
            this.pageShow = data.data.total_page > 0;
            this.EDIT_MAP = data.data.edit_arr;
            // this.currentPage = data.data.current_page;
            // this.history_amount = data.data.history_amount;
            this.remain_amount = data.data.unclaimed_amount;
            this.PAYMENT_STATUS_MAP = data.data.payment_status_list;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    }
  }
};
</script>

<style scoped lang="scss">
.system-header {
  font-size: 18px;
  color: #444;
  padding: 15px 20px;
  background: #fff;
  margin-bottom: 10px;
  font-weight: bold;
}

.list {
  .table-title {
    height: 36px;
    margin: 16px 0 10px 0;
  }
}

.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.tag-orange{
  color: #ff0000;
  font-size: 12px;
  padding: 3px 4px 3px;
  border-radius: 2px;
  cursor: default;
  background-color: #fff2f2;
}
</style>
