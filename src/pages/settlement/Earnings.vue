<!--src/components/finace/report/branch.vue-->
<template>
  <div class="hotelorder-wrap">
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">订单类型</div>
          <el-select v-model="filter.order_type" placeholder="请选择">
            <el-option value="" label="全部"></el-option>
            <el-option v-for="(val, key) in PRODUCT_TYPE" :key="key+1" :label="val" :value="key+1"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单编号</div>
          <el-input v-model="filter.order_no" placeholder="请输入订单号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">销售名称</div>
          <el-input v-model="filter.salesman" placeholder="销售名称"></el-input>
        </div>
        <div class="search-item">
          <div class="label">结算状态</div>
          <el-select v-model="filter.calstatus" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option key="2" label="待结算" value="1"/>
            <el-option key="1" label="未结算" value="2"/>
            <el-option key="3" label="已结算" value="3"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">营业部订单</div>
          <el-select v-model="filter.oType" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option  key="1" label="是" value="1"/>
            <el-option  key="2" label="否" value="2"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单来源</div>
          <el-select v-model="filter.order_source" placeholder="请选择">
            <el-option  :key="0" label="全部" :value="0"/>
            <el-option  :key="1" label="云平台" :value="1"/>
            <el-option  :key="5" label="小程序" :value="5"/>
          </el-select>
        </div>
        <el-button type="primary" @click="handleSerarchOrder">搜索</el-button>
      </div>
    </div>
    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <el-table :data="orderList" border tooltip-effect="light" style="width: 100%">
          <el-table-column
            header-align="center"
            align="center"
            label="订单编号"
            width="180"
          >
            <template slot-scope='scope'>
              <span class="tip">【{{scope.row.order_source}}】</span>
              <p>{{scope.row.order_no}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="profit_amount"
            align="center"
            header-align="center"
            label="订单利润"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="first_profit"
            header-align="center"
            align="center"
            label="一级收益"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="second_profit"
            header-align="center"
            align="center"
            label="二级收益"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="order_type"
            header-align="center"
            align="center"            
            label="订单类型"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            header-align="center"
            align="center"
            label="订单金额"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="product_name"
            header-align="center"
            align="center"
            label="产品名称"
            width="160"
          ></el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="营业部订单"
            width="160"
          >
           <template slot-scope='scope'>
              {{scope.row.in_out_order !== '外部订单' ? '是':'否'}}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="结算状态"
            width="160"
          >
            <template slot-scope='scope'>
              {{scope.row.status}}
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="销售"
          >
            <template slot-scope="scope">
              <p>销售：{{scope.row.collecter}}</p>
              <p>收益：{{scope.row.profiter}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="orderList && orderList.length" class="page">
        <el-pagination
          layout="prev, pager, next"
          :page-size="filter.page_size"
          :current-page="filter.page"
          :total="total_count"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import { getEarningsList } from "src/api/shop";

export default {
  data() {
    var that = this;
    return {
      minTime: "",
      PRODUCT_TYPE: ['线路','机票','酒店','签证','火车票','门票','火车票'],
      orderList: [],
      filter: {
        order_type: '',
        order_no: "",
        salesman: "",
        calstatus: "",
        oType: "",
        order_source: 0,
        page_size: 10,
        page_index: 1
      },
      total_count: 1,
      // page_size: 10,
      // page_index: 1
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
    PayStatus(code) { // 暂未使用 状态改为汉字
      let type = code * 1;
      let str = "";

      switch (type) {
        case 1:
          str = "未结算";
          break;
        case 2:
          str = "待结算";
          break;
        case 3:
          str = "已结算";
          break;
      }
      return str;
    },
    getOrderSource(code) {
      let type = code * 1;
      let str = "";
      switch (type) {
        case 1:
          str = "云平台";
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
      this.filter.page_index = 1;
      // this.page_index = 1;
      this._initOrderFilterHandler();
    },
    async _initOrderFilterHandler() {
      var params = {
        data : {...this.filter}
      }
      try {
        const { data } = await getEarningsList(params, true)
        if(data.code == 0){
          this.orderList = data.data.list;
          this.total_count = data.data.total_count * 1;
        }else{
          this.orderList = [];
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      }
      catch(err) {
        console.log(err)
      }
      
    },
    pageChange(page) {
      this.filter.page_index = page;
      this._initOrderFilterHandler();
    }
  },
  created() {
    let {
      salesman
    } = this.$route.query;

    this.filter.salesman = salesman; // 销售
  },
  mounted() {
    this._initOrderFilterHandler();
  }
};
</script>
<style lang="less" scoped>
.tip {
  color: #b10c79;
}
.date-picker {
  width: 200px !important;
}
</style>