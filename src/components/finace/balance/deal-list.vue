<template>
  <!-- 已不使用页面  by qzhchen 20181011 -->
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">交易类型</div>
        <el-select v-model="searchData.balance_type" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="收款充值" value="11"></el-option>
          <el-option label="付款单扣除" value="22"></el-option>
          <el-option label="多余付款扣除" value="23"></el-option>
          <el-option label="付款充值" value="21"></el-option>
          <el-option label="收款单扣除" value="12"></el-option>
          <el-option label="多余收款扣除" value="13"></el-option>          
          <el-option label="多余收款充值" value="14"></el-option>                   
          <el-option label="余额扣除" value="27"></el-option>                   
          <!-- <el-option label="撤销收款充值" value="15"></el-option>
          <el-option label="撤销收款单扣除" value="16"></el-option>
          <el-option label="撤销多余收款扣除" value="17"></el-option>
          <el-option label="撤销多余收款充值" value="18"></el-option>
          <el-option label="撤销付款充值" value="24"></el-option>
          <el-option label="撤销付款单扣除" value="25"></el-option>
          <el-option label="撤销多余付款扣除" value="26"></el-option> -->
        </el-select>
      </div>
      <div class="search-item">
        <div class="label" style="width:80px;">交易流水号</div>
        <el-input v-model="searchData.balance_no" placeholder="交易流水号"></el-input>
      </div>
      <div class="search-item calendar">
        <div class="label">创建时间</div>
        <el-date-picker v-model="create_time_start" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
        <div class="label zhi">-</div>
        <el-date-picker v-model="create_time_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions1"></el-date-picker>
      </div>
      
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="create_time" label="创建时间" align="center" width="140" :resizable="false">
            </el-table-column>
            <el-table-column prop="balance_no" label="交易流水号" align="center" width="160" :resizable="false">
            </el-table-column>
            <el-table-column prop="balance_type_name" label="交易类型" align="center" width="140" :resizable="false">
            </el-table-column>
            <el-table-column prop="rmb_total_amount" label="资金流向" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <template v-if="scope.row.rmb_total_amount >= 0">
                  <span style="color:#019F3D;">￥ +{{scope.row.rmb_total_amount}}</span>
                </template>
                <template v-else>￥ {{scope.row.rmb_total_amount}}</template>
              </template>
            </el-table-column>
            <el-table-column label="余额" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">￥ {{scope.row.fund_balance}}</template>
            </el-table-column>
            <el-table-column prop="fund_type_name" label="结算类型" align="center" width="80" :resizable="false">
            </el-table-column>
            <el-table-column label="结算方名称" align="center" min-width="120" :resizable="false">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.settlement_org_name">
                  {{scope.row.settlement_org_name}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="操作人" align="center" width="100" :resizable="false">
            </el-table-column>
            </el-table-column>
            <el-table-column label="收付款凭证" align="center" width="120" fixed="right" prop="voucher_name">
              <!-- <template slot-scope="scope">
                <template v-if="$menuPermission('api/finance/edit_payment_account')"></template>
                <template v-else>
                  <div style="text-align:center;">-</div>
                </template>
              </template> -->
              <template slot-scope="scope">
                <template v-if="scope.row.voucher_type==1">
                  <router-link v-if="$menuPermission('api/finance/receipt_list')" :to="{path: '/fund-settlement/jrecieve-record', query: {parent_id:$route.query.id,id:scope.row.settlement_org_id}}">{{scope.row.voucher_name}}</router-link>
                </template>
                <template v-if="scope.row.voucher_type==2">
                  <router-link v-if="$menuPermission('api/finance/get_payment_detail_list')" :to="{path: '/jrecieve-settlment-list', query: {parent_id:$route.query.id,id:scope.row.payment_id,bill_id:scope.row.bill_id}}">{{scope.row.voucher_name}}</router-link>
                  
                </template>
                <template v-if="scope.row.voucher_type==3">
                  <router-link v-if="$menuPermission('api/finance/payment_list')" :to="{path: '/fund-settlement/jpay-record', query: {parent_id:$route.query.id,id:scope.row.settlement_org_id}}">{{scope.row.voucher_name}}</router-link>
                </template>
                <template v-if="scope.row.voucher_type==4">
                  <router-link v-if="$menuPermission('api/finance/get_payment_detail_list')" :to="{path: '/jpay-settlment-list', query: {parent_id:$route.query.id,id:scope.row.payment_id,bill_id:scope.row.bill_id}}">{{scope.row.voucher_name}}</router-link>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getBalanceFetailList } from 'src/api/api'
import * as format from 'src/utils/format';
export default {
  name: 'recieve-record',
  data() {
    return {
      create_time_start:'',
      create_time_end:'',
      searchDataOrigin: {
        balance_no: '',
        balance_type: ''
      },
      searchData: {
        fund_type:1,
        balance_no:'',
        balance_type:'',
        create_time_start: "",
        create_time_end:  ""
      },
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      tableData: []
    }
  },
  computed:{
    datepickerOptions1(){
      let depart_date = this.create_time_start;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      }
    },
    datepickerOptions2(){
      let depart_date = this.create_time_end;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      }
    }
  },
  methods: {
    // change(){
    //   this.form.account_no="";
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    getList(bool) {

      let params = {
        data: this.searchData
      };

      if (bool) {
        this.totalPage=1;
        this.currentPage= 1;
        this.page=1;
        this.searchDataOrigin.balance_no = this.searchData.balance_no || '';
        this.searchDataOrigin.balance_type = this.searchData.balance_type || '';
        this.searchData.create_time_start = this.create_time_start ? format.date(this.create_time_start) : "";
        this.searchData.create_time_end = this.create_time_end ? format.date(this.create_time_end) : "";
      }else{
        this.searchData.balance_no = this.searchDataOrigin.balance_no;
        this.searchData.balance_type = this.searchDataOrigin.balance_type;
        this.create_time_start = this.searchData.create_time_start;
        this.create_time_end = this.searchData.create_time_end;
      }

      params.data.page = this.page;
      params.data.settlement_org_id = this.$route.query.id;

      getBalanceFetailList({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.page_index;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getList();
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
.system-search .search-item.calendar{
  width:340px;
}

</style>
