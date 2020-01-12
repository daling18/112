<!--src/components/finace/report/branch.vue-->
<template>
  <div class="hotelorder-wrap">
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">
            <el-select v-model="data_type" placeholder="请选择">
              <el-option v-for="(val, key) in DATE_TYPE" :key="key" :label="val" :value="key"/>
            </el-select>
          </div>
          <el-date-picker
            :class="'date-picker'"
            v-model="order_date"
            type="daterange"
            placeholder="选择日期范围最长90天"
            :picker-options="pickerOptions0"
          ></el-date-picker>
        </div>
        <!-- <div class="search-item">
          <div class="label">交易时间</div>
          <el-date-picker
            :class="'date-picker'"
            v-model="pay_time_date"
            type="daterange"
            placeholder="选择日期范围最长90天"
            :picker-options="pickerOptions0"
          ></el-date-picker>
        </div> -->
        <div class="search-item">
          <div class="label">供应商名称</div>
          <el-input v-model="filter.supplier_name" placeholder="请输入供应商名称"></el-input>
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
          <div class="label">第三方交易流水号</div>
          <el-input v-model="filter.third_trade_no" placeholder="第三方交易流水号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">应收款公司</div>
          <el-input v-model="filter.receipt_company_name" placeholder="应收款公司"></el-input>
        </div>
        <div class="search-item">
          <div class="label">产品类型</div>
          <el-select v-model="filter.product_type" placeholder="请选择">
            <el-option v-for="(val, key) in PRODUCT_TYPE" :key="key" :label="val" :value="key"/>
          </el-select>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="handleSerarchOrder">搜索</el-button>
          <el-button v-if="orderList.length > 0"><a style="display:block;width:100%;height:100%;" :href="export_data_url">导出</a></el-button>
        </div>
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
            width="180"
          ></el-table-column>
          <el-table-column
            prop="pay_time"
            header-align="center"
            label="交易时间"
            width="180"
          ></el-table-column>
          <el-table-column
            header-align="center"
            label="收款方式"
          >
            <template slot-scope="prop">
              {{ prop.row.pay_way | getOrderPayWay}}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            label="收款渠道"
            width="110"
          >
            <template slot-scope="prop">
              {{ prop.row.collect_channel}}
            </template>
          </el-table-column>

          <el-table-column
            prop="third_trade_no"
            header-align="center"
            label="第三方支付流水号"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="receipt_account_body"
            header-align="center"
            label="收款账户主体"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="receipt_account_no"
            header-align="center"
            label="收款账户/商编"
            width="180"
          ></el-table-column>
          <el-table-column
            header-align="center"
            label="付款渠道"
          >
            <template slot-scope="prop">
              {{ prop.row.pay_channel | getOrderPayType}}
            </template>
          </el-table-column>
          <el-table-column
            prop="online_pay_amount"
            header-align="center"
            label="付款账户"
          ></el-table-column>
          <el-table-column
            header-align="center"
            label="编号类型"
          >
            <template slot-scope="prop">
              {{ prop.row.num_type == 1 ? '收款ID':'退款ID' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="num_no"
            header-align="center"
            label="编号"
          ></el-table-column>
          <el-table-column
            prop="change_amount"
            header-align="center"
            label="变动金额"
          ></el-table-column>
          <el-table-column
            header-align="center"
            label="变动类型"
          >
            <template slot-scope="prop">
              {{ prop.row.change_type | changeType}}
            </template>	
          </el-table-column>
          <el-table-column
            prop="product_name"
            header-align="center"
            label="产品名称"
            min-width="300"
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
            label="下单人"
          ></el-table-column>
          <el-table-column
            prop="op_org_name"
            header-align="center"
            label="下单人组织名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="op_org_name"
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
            prop="supplier_org_name"
            header-align="center"
            label="供应商名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="third_order_no"
            header-align="center"
            width="220"
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
import { getOrderInfoPayment } from "src/api/finance";
require("../../utils/newFormat.js");

export default {
  data() {
    var that = this;
    return {
      DATE_TYPE: ["下单时间","交易时间"],
      data_type: 0,
      PRODUCT_TYPE: ['所有','保险','农特优','签证','酒店','火车票','门票','机票','线路'],
      minTime: "",
      pickerOptions0: {
        onPick: ({ maxDate, minDate }) => {
          that.minTime = minDate.getTime();
        },
        disabledDate(time) {
          if (that.minTime !== "") {
            const day30 = 90 * 24 * 3600 * 1000;
            let maxTime = that.minTime + day30;
            if (maxTime > new Date() - 1 * 24 * 3600 * 1000) {
              maxTime = new Date() - 1 * 24 * 3600 * 1000;
            }
            return time.getTime() > maxTime;
          }
          return time.getTime() > Date.now() - 1 * 24 * 3600 * 1000;
        }
      },
      orderList: [],
      order_date: [new Date(new Date().getTime() - (90 * 24 * 3600 * 1000)),new Date(new Date().getTime() - (24 * 3600 * 1000))],
      // pay_time_date: [new Date(new Date().getTime() - (90 * 24 * 3600 * 1000)),new Date(new Date().getTime() - (24 * 3600 * 1000))],
      // place_order_date:[],
      // pay_time_date: [],
      filter: {
        create_time_begin: "",
        create_time_end: "",
        trade_time_begin: "",
        trade_time_end: "",
        receipt_company_name: "",
        product_type: 0,
        supplier_name: "",
        order_no: "",
        tuan_no: "",
        third_trade_no: "",
        page_size: 10,
        page: 1
      },
      total_count: 1,
      page_size: 10,
      page_index: 1,
      download_url: "",
      export_data_url: ""
    };
  },
  filters: {
    changeType(){
      let way = code * 1;
      let str = "";
      switch (way) {
        case 1:
          str = "订单收款";
          break;
        case 2:
          str = "订单退款";
          break;
        case 3:
          str = "火车票改签";
          break;
        case 4:
          str = "飞机改签";
          break;
      }
      return str;
    },
    getOrderPayWay(code){
      let way = code * 1;
      let str = "";
      switch (way) {
        case 0:
          str = "未支付";
          break;
        case 1:
          str = "线上支付";
          break;
        case 2:
          str = "线下支付";
          break;
      }
      return str;
    },
    changeType(code){
      let way = code * 1;
      let str = "";
      switch (way) {
        case 1:
          str = "订单收款";
          break;
        case 2:
          str = "订单退款";
          break;
        case 3:
          str = "火车票改签";
          break;
        case 4:
          str = "飞机票改签";
          break;
      }
      return str;
    },
    getOrderPayType(code) {
      let status = code * 1;
      let str = "";
      switch (status) {
        case 0:
          str = "未支付";
          break;
        case 1:
          str = "支付宝";
          break;
        case 2:
          str = "微信";
          break;
        case 3:
          str = "其他";
          break;
      }
      return str;
    },
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
    handleExportData(){
      this.export_data_url = "/api/v1/financial/order-account/export-data?create_time_begin="+this.filter.create_time_begin+"&create_time_end="+this.filter.create_time_end+"&trade_time_begin="+this.filter.trade_time_begin+"&create_time_end="+this.filter.create_time_end+"&receipt_company_name="+this.filter.receipt_company_name+"&tuan_no="+this.filter.tuan_no+"&order_no="+this.filter.order_no+"&third_trade_no="+this.filter.third_trade_no+"&product_type="+this.filter.product_type+"&supplier_name="+this.filter.supplier_name;
    },
    handleSerarchOrder(){
      this.filter.page = 1;
      this.initOrderFilterHandler();
    },
    initOrderFilterHandler() {
      if(this.data_type == 0){
        this.filter.create_time_begin = this.order_date[0] ? new Date(this.order_date[0]).format("yyyy-MM-dd") : "";
        this.filter.create_time_end = this.order_date[1] ? new Date(this.order_date[1]).format("yyyy-MM-dd") : "";
        this.filter.trade_time_begin = "";
        this.filter.trade_time_end = "";
      }else{
        this.filter.trade_time_begin = this.order_date[0] ? new Date(this.order_date[0]).format("yyyy-MM-dd") : "";
        this.filter.trade_time_end = this.order_date[1] ? new Date(this.order_date[1]).format("yyyy-MM-dd") : "";
        this.filter.create_time_begin = "";
        this.filter.create_time_end = "";
      }
      this.handleExportData();
      var params = {
        data : {...this.filter}
      }
      getOrderInfoPayment({
        params: params,
        success: (res) => {
          let result = res.data;
          console.log(result);
          if (result.code === 0) {
            this.orderList = result.data.list;
            this.total_count = result.data.totalCount * 1;
            this.page_index = result.data.page + 1;
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
    this.initOrderFilterHandler();
  }
};
</script>
<style lang="less" scoped>
.date-picker {
  width: 200px !important;
}
</style>