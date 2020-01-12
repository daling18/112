<!--src/components/finace/report/branch.vue-->
<template>
  <div class="hotelorder-wrap">
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">月份</div>
          <el-date-picker v-model="filter.month" type="month" placeholder="选择月"></el-date-picker>
        </div>
        <div class="search-item">
          <div class="label">云平台订单号</div>
          <el-input v-model="filter.order_no" placeholder="请输入订单号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">团号</div>
          <el-input v-model="filter.tuan_no" placeholder="团号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">供应商名称</div>
          <el-input v-model="filter.supplier_name" placeholder="请输入供应商名称"></el-input>
        </div>
        <div class="search-item">
          <div class="label">下单人</div>
          <el-input v-model="filter.op_username" placeholder="请输入下单人"></el-input>
        </div>
        <div class="search-item">
          <div class="label">应收款公司</div>
          <el-input v-model="filter.collect_company" placeholder="应收款公司"></el-input>
        </div>
        <div class="search-item">
          <div class="label">产品类型</div>
          <el-select v-model="filter.product_type" placeholder="请选择">
            <el-option v-for="(val, key) in PRODUCT_TYPE" :key="key" :label="val" :value="key"/>
          </el-select>
        </div>
        <el-button type="primary" @click="handleSerarchOrder">搜索</el-button>
        <el-button v-if="orderList.length > 0">
          <a style="display:block;width:100%;height:100%;" :href="export_data_url">导出</a>
        </el-button>
      </div>
    </div>
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <el-table :data="orderList" border tooltip-effect="light" style="width: 100%">
          <el-table-column header-align="center" align="center" label="云平台订单号" width="180">
            <template slot-scope="prop">
              {{ prop.row.order_no }}
            </template>
          </el-table-column>
          <el-table-column
            prop="tuan_no"
            header-align="center"
            label="团号"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="order_create_time"
            header-align="center"
            label="下单日期"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="product_name"
            header-align="center"
            label="产品名称"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="order_num"
            header-align="center"
            label="数量"
          ></el-table-column>
          <el-table-column
            header-align="center"
            label="产品类型"
          >
            <template slot-scope="prop">
              {{ prop.row.product_type | getOrderType}}
            </template>	
          </el-table-column>
          <el-table-column
            prop="op_username"
            header-align="center"
            width="120"
            label="下单人"
          ></el-table-column>
          <el-table-column
            prop="op_org_name"
            header-align="center"
            label="下单人组织名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="op_company_name"
            header-align="center"
            label="下单人所属公司"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="receipt_company_name"
            header-align="center"
            label="应收款公司"
            width="180"
          ></el-table-column>
          <el-table-column
            header-align="center"
            label="订单来源"
          >
            <template slot-scope="prop">
              {{ prop.row.order_source | getOrderSource}}
            </template>	
          </el-table-column>
          <el-table-column
            prop="already_collect"
            header-align="center"
            label="应收"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="online_collect"
            header-align="center"
            label="在线已收"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="inline_collect"
            header-align="center"
            label="线下已收"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="refund_money"
            header-align="center"
            label="退款金额"
            width="100"
          ></el-table-column>
          <!-- <el-table-column
            prop="no_collect"
            header-align="center"
            label="未收"
            width="100"
          ></el-table-column> -->
          <el-table-column
            prop="s_pay"
            header-align="center"
            label="应付"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="already_pay"
            header-align="center"
            label="已付"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="finish_refund"
            header-align="center"
            label="结算退款"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="no_pay"
            header-align="center"
            label="未付"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="cooply"
            header-align="center"
            label="利润"
            width="100"
          ></el-table-column>
          <!-- <el-table-column
            prop=""
            header-align="center"
            label="订单状态"
            width="150"
          ></el-table-column> -->
          <el-table-column
            prop="supplier_org_name"
            header-align="center"
            label="供应商名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="third_order_no"
            header-align="center"
            width="180"
            label="供应商平台订单号"
          ></el-table-column>
        </el-table>
      </div>
      <div v-if="orderList && orderList.length" class="page">
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

import { getOrderFlowMonth} from "src/api/finance";
require("../../utils/newFormat.js");

export default {
  data() {
    var that = this;
    return {
      minTime: "",
      PRODUCT_TYPE: ['所有','保险','农特优','签证','酒店','火车票','门票','机票','线路'],
      orderList: [],
      filter: {
        month: "",
        product_type: 0,
        order_no: "",
        supplier_name: "",
        op_username: "",
        collect_company: "",
        tuan_no: "",
        page_size: 10,
        page: 1
      },
      total_count: 1,
      page_size: 10,
      page_index: 1,
      export_data_url: ""
    };
  },
  filters: {
    getOrderType(code) {
      let type = code * 1;
      let str = "";
      switch (type) {
        case 1:
          str = "保险";
          break;
        case 2:
          str = "农特优";
          break;
        case 3:
          str = "签证";
          break;
        case 4:
          str = "酒店";
          break;
        case 5:
          str = "火车票";
          break;
        case 6:
          str = "门票";
          break;
        case 7:
          str = "机票";
          break;
        case 8:
          str = "线路";
          break;
      }
      return str;
    },
    getOrderSource(code) {
      let type = code * 1;
      let str = "";
      switch (type) {
        case 1:
          str = "BOM";
          break;
        case 2:
          str = "APP";
          break;
        case 3:
          str = "官网";
          break;
        case 4:
          str = "H5";
          break;
        case 5:
          str = "小程序";
          break;
      }
      return str;
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleSerarchOrder(){
      this.filter.page = 1;
      this.initOrderFilterHandler();
    },
    handleExportMonthData(params){
      var data = params.data;
      this.export_data_url = '/api/v1/financial/order-account-month/export-month-data?product_type='+data.product_type+'&year='+data.year+'&month='+data.month+'&order_no='+data.order_no+'&supplier_name='+data.supplier_name+'&op_username='+data.op_username+'&collect_company='+data.collect_company+'&tuan_no='+data.tuan_no;
    },
    initOrderFilterHandler() {
      var params = {
        data : {...this.filter}
      }
      let date = new Date(this.filter.month).format("yyyy-MM").split("-");
      params['data'].year = date[0];
      params['data'].month = date[1];
      this.handleExportMonthData(params);
      getOrderFlowMonth({
        params: params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.orderList = result.data.list;
            this.total_count = result.data.totalCount * 1;
            this.page_index = result.data.currentPage + 1;
          } else {
            this.orderList = [];
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          };
        },
        showLoading: false
      })
    },
    pageChange(page) {
      this.filter.page = page;
      this.initOrderFilterHandler();
    }
  },
  mounted() {
    var nowDate = new Date().format("yyyy-MM").split("-");
    var year = nowDate[0];
    var month = (nowDate[1] - 1) < 10 ? "0" + (nowDate[1] - 1) : nowDate[1] - 1;
    if(parseInt(month) == 0){
      year = year - 1;
      month = 12;
    }
    this.filter.month = year+"-"+month;
    this.initOrderFilterHandler();
  }
};
</script>
<style lang="less" scoped>
.date-picker {
  width: 200px !important;
}
</style>