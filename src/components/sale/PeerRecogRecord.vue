<template>
  <div class="wrapper">
    <div class="system-header">
      {{ settlementOrgName }}
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <div class="search-item">
        <div class="label" style="width:auto;">应收款ID</div>
        <el-input v-model="searchInput.bill_id" placeholder="应收款ID"/>
      </div>
      <search-item-date-range :label="'认款时间'" v-model="createTime" @change="handleChangeCreateTime"/>
      <div class="search-item">
        <div class="label">认款ID</div>
        <el-input v-model="searchInput.renkuan_id" placeholder="认款ID"/>
      </div>
      <div class="search-item">
        <div class="label">收款ID</div>
        <el-input v-model="searchInput.payment_id" placeholder="收款ID"/>
      </div>
      <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(status, key) in PAYMENT_STATUS_MAP" :key="key" :label="status" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <renkuan-table
            :data-list="tableData"
            top-menu-const="sale"
            :edit-map="EDIT_MAP"
            :parent-id="$route.query.parent_id"
            @success="getList()"
          >
            <el-table-column prop="renkuan_role_name" label="认款类型" align="center" width="100" :resizable="false"/>
            <el-table-column prop="id" label="认款ID" align="center" width="80" :resizable="false"/>
            <el-table-column prop="payment_id" label="收款ID" align="center" width="80" :resizable="false"/>
            <el-table-column prop="order_no" label="订单号" align="center" width="180" :resizable="false"/>
            <el-table-column prop="bill_id" label="应收款ID" align="center" width="80" :resizable="false"/>
            <el-table-column label="认款金额" header-align="center" align="right" width="120" :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">{{ scope.row.rmb_total_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="认款状态" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span :class="scope.row.payment_status | getStatusColor">{{ PAYMENT_STATUS_MAP[scope.row.payment_status] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="认款时间" align="center" width="150" :resizable="false"/>
            <el-table-column label="操作人" align="center" min-width="100" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</div>
              </template>
            </el-table-column>
          </renkuan-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination 
        layout="prev, pager, next" 
        :current-page="searchData.page" 
        @current-change="handleCurrentChange" 
        :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import { saleRenkuanList } from 'src/api/api';
import RenkuanTable from './RenkuanTable.comp'

export default {
  name: 'PeerRecogRecord',
  components: {
    SearchItemDateRange,
    RenkuanTable
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
    const { query, params } = this.$route;

    return {
      PAYMENT_STATUS_MAP: {},
      EDIT_MAP: {},
      settlementOrgName: '',
      createTime: [query.create_time_start, query.create_time_end],
      searchInput: {
        // id: this.$route.query.id || '',
        // payment_id: this.$route.params.id || '',
        // settlement_org_id: this.$route.query.id || '',
        // payment_status:'',
        // payment_no:'',
        // order_no:'',
        // payment_no:'',
        // create_time_start: '',
        // create_time_end:  '',
        // page: 1,
        // page_size: 10
      },
      searchData: {
        id: query.id || '',
        bill_id: query.bill_id || '',
        payment_id: query.payment_id || params.id || '',
        settlement_org_id: query.id || '',
        renkuan_id: query.renkuan_id || '',
        payment_status: query.payment_status || '',
        payment_no: query.payment_no || '',
        order_no: query.order_no || '',
        payment_no: query.payment_no || '',
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end ||  '',
        page: parseInt(query.page) || 1,
        // page_size: 10
      },
      totalPage: parseInt(query.page) || 1,
      pageShow: true,
      tableData: []
    };
  },
  // computed: {
  // },
  // watch: {
  //   '$route.query' (query) {
  //     this.getList({settlement_org_id: query.id, payment_status: '', ... query});
  //   }
  // },
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
      this.searchData.page_size = 10;

      // id为认款id，因为面包屑的切换默认使用id，所以这里多了个renkuan_id来存储实际的id
      const params = {... this.searchData, id: this.searchData.renkuan_id};

      saleRenkuanList({
        params: {data: params},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            // this.currentPage = data.data.page_index;
            this.searchInput.page = data.data.page_index;
            this.settlementOrgName = data.data.settlement_org_name;
            this.PAYMENT_STATUS_MAP = data.data.payment_status_list || {};
            this.EDIT_MAP = data.data.edit_arr || {};
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleChangeCreateTime(date) {
      this.searchInput.create_time_start = date[0] || '';
      this.searchInput.create_time_end = date[1] || '';
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

.record{margin-bottom: 20px;}

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

</style>
