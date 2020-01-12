<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">有效状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">结算ID</div>
        <el-input v-model="searchInput.id" placeholder="成本结算记录ID"/>
      </div>
      <search-item-date-range :label="'创建时间'" v-model="createTime" @change="handleChangeCreateTime"/>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="团成本结算ID" align="center" :resizable="false"/>
            <el-table-column label="本次结算金额" header-align="center" align="right" :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算后剩余应付款金额" header-align="center" align="right" :resizable="false">
              <template slot-scope="scope">￥{{ scope.row.remain_total_amount }}</template>
            </el-table-column>
            <el-table-column 
              prop="payment_status_name" 
              label="有效状态" 
              align="center" 
              width="100" 
              :resizable="false">
              <template slot-scope="scope">
                <div :class="scope.row.payment_status | getStatusColor">
                  {{ scope.row.payment_status_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期" align="center" :resizable="false"/>
            <el-table-column label="操作" align="center" width="120" fixed="right" >
              <template slot-scope="scope">
                <router-link v-if="$menuPermission('api/tuan/finance_bill_pay_detail')" :to="{path:pathCostDetail, query:{id:scope.row.bill_id}}">查看应付款</router-link>
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
import { getPaymentDetailList } from 'src/api/api'
import * as format from 'src/utils/format';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
export default {
  name: 'RecieveRecord',
  components: {
    SearchItemDateRange
  },
  filters: {
    getStatusColor(status){
      // 付款状态 1待审批 2审批通过 3审批不通过 4已撤销 5已作废
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
      PAYMENT_STATUS_MAP: {},
      createTime: [query.create_time_start, query.create_time_end],
      searchInput: {
      },
      searchData: {
        id: query.id || '',
        bill_id: query.bill_id || '',
        parent_id: query.parent_id || '',
        payment_id: query.payment_id || '',
        payment_status: query.payment_status || '',
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end ||  '',
        page: parseInt(query.page) || 1,
        payment_type: '2'
      },
      totalPage: parseInt(query.page) || 1,
      pageShow: true,
      tableData: [],
      pathCostDetail: ''
    }
  },
  created(){
    this.pathCostDetail = this.$route.name == 'financePaymentPaySettlementList' ? '/finace/paymentList/pay-settlment-list' : '/fund-settlement/cost-detail';
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      
      getPaymentDetailList({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.pageShow = data.data.total_page > 0;
            this.searchData.page = data.data.page_index;
            this.PAYMENT_STATUS_MAP = data.data.payment_status;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    },
    handleChangeCreateTime(date) {
      this.searchInput.create_time_start = date[0] || '';
      this.searchInput.create_time_end = date[1] || '';
    },
  }
}
</script>

<style scoped lang="scss">
.record-title {
  display: block;
  margin: 20px 0;
  text-align: left;
  font-size: 14px;

  th {
    color: #777;
  }
  td {
    padding-right: 20px;
    font-size: 18px;
    color: #555;
  }
}

.list {
  .table-title {
    height: 36px;
    margin: 16px 0 10px 0;

    .total {
      display: inline-block;
      line-height: 36px;
      font-size: 14px;
      .total-receive {
        font-size: 16px;
        color: #00CC00;
      }
      .total-pay {
        font-size: 16px;
        color: #FF9900;
        margin-right: 20px;
      }
    }

    .btn-areas {
      float: right;
    }
  }
}

.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}

.tool a {
  display: inline-block;
  color: #20a0ff;
}

.foot-btn {
  text-align:center;
}
.form-content {

  .el-form {
    width: 680px;

    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
}
.system-search {
  .search-item-long {
    padding-left: 110px;
    .label {
      margin-left: -105px;
      width: 100px;
    }
  }
}
</style>
