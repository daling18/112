<template>
  <!-- 已不使用页面  by qzhchen 20181011 -->
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">有效状态</div>
        <el-select v-model="searchData.payment_status" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option label="有效" value="1"></el-option>
          <el-option label="已撤销" value="2"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label" style="width:auto;">收入结算记录编号</div>
        <el-input v-model="searchData.payment_no" placeholder="收入结算记录编号"></el-input>
      </div>
      <div class="search-item calendar">
        <div class="label">创建时间</div>
        <el-date-picker v-model="date_start" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
        <div class="label zhi">-</div>
        <el-date-picker v-model="date_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions1"></el-date-picker>
      </div>
      
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="payment_no" label="团收入结算编号" align="left" width="180">
            </el-table-column>
            <el-table-column label="本次结算金额" align="right" width="140">
              <template slot-scope="scope">
                <span class="color-orange">￥{{scope.row.rmb_total_amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="结算后剩余应收款金额" align="right" width="180">
              <template slot-scope="scope">￥{{scope.row.remain_total_amount}}</template>
            </el-table-column>
            <el-table-column prop="payment_status_name" label="有效状态" align="center" width="100">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期" align="center">
            </el-table-column>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120" fixed="right" >
              <template slot-scope="scope">
                <router-link v-if="$menuPermission('api/finance/bill_detail')" :to="{path: '/mcontrol/bill', query: {id:scope.row.resource_id}}">查看应收款</router-link>
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
import { getPaymentDetailList } from 'src/api/api'
import * as format from 'src/utils/format';
export default {
  name: 'recieve-record',
  data() {
    return {
      date_start:'',
      date_end:'',
      searchData: {
        payment_status:'',
        payment_no:'',
        create_time_start: "",
        create_time_end:  "",
        payment_type:'1'
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
      let depart_date = this.date_start;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      }
    },
    datepickerOptions2(){
      let depart_date = this.date_end;
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
      this.searchData.create_time_start = this.create_time_start ? format.date(this.create_time_start) : "";
      this.searchData.create_time_end = this.create_time_end ? format.date(this.create_time_end) : "";

      let params = {
        data: this.searchData
      };



      if (bool) {
        this.totalPage=1;
        this.currentPage= 1;
        this.page=1;
      }

      params.data.page = this.page;
      params.data.payment_id=this.$route.query.id;
      params.data.bill_id=this.$route.query.bill_id;
      getPaymentDetailList({
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

</style>
