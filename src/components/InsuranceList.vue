<template>
  <div class="wrapper">
    <component :is="tabComponent" name="insurance" />
    <!-- system-search -->
    <!-- <div class="system-tab">
      <ul class="tab-box">
        <li :class="{on: order_status == 0}" @click="TabgetList(0)">全部（{{tag_status.data_count}}）</li>
        <li :class="{on: order_status == 1}" @click="TabgetList(1)">待付款（{{tag_status.unpay_count}}）</li>
        <li :class="{on: order_status == 2}" @click="TabgetList(2)">已完成（{{tag_status.pay_count}}）</li>
      </ul>
    </div> -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <div class="search-item">
        <div class="label">订单状态</div>
        <el-select v-model="searchInput.pay_status" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, $index) in pay_status" :key="$index" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">保单状态</div>
        <el-select v-model="searchInput.insured_status" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, $index) in insured_status" :key="$index" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">产品名称</div>
        <el-input v-model="searchInput.product_name" placeholder="产品名称"/>
      </div>
      <search-item-date-range
        :label="'下单时间'"
        v-model="createTime"
        @change="handleChangeCreateTime"
      />
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch()">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border tooltip-effect="light">
            <el-table-column label="订单号" align="center" :resizable="false" width="155">
              <template slot-scope="scope">{{ scope.row.order_no }}</template>
            </el-table-column>
            <el-table-column label="下单时间" align="center" :resizable="false" width="155">
              <template slot-scope="scope">{{ scope.row.create_time }}</template>
            </el-table-column>
            <!-- <el-table-column label="产品编号" align="center" :resizable="false" width="150">
              <template slot-scope="scope">{{ scope.row.product_no }}</template>
            </el-table-column> -->
            <el-table-column label="产品名称" align="center" :resizable="false" width="150">
              <template slot-scope="scope">{{ scope.row.product_name }}</template>
            </el-table-column>
            <el-table-column label="所属公司" align="center" :resizable="false" width="150">
              <template slot-scope="scope">{{ scope.row.policy_holder }}</template>
            </el-table-column>
            <el-table-column label="出单营业部" align="center" :resizable="false" width="150">
              <template slot-scope="scope">{{ scope.row.distributor_name }}</template>
            </el-table-column>
            <el-table-column label="生效时间" align="center" :resizable="false" width="155">
              <template slot-scope="scope">{{ scope.row.begin_time | formatDate }}</template>
            </el-table-column>
            <el-table-column label="截止日期" align="center" :resizable="false" width="155">
              <template slot-scope="scope">{{ scope.row.end_time | formatDate }}</template>
            </el-table-column>
            <!-- <el-table-column label="保险类型" align="center" :resizable="false" width="130">
              <template slot-scope="scope">{{ scope.row.ins_type }}</template>
            </el-table-column> -->
            <el-table-column label="保障天数" align="center" :resizable="false" width="100">
              <template slot-scope="scope">{{ scope.row.days }}</template>
            </el-table-column>
            <el-table-column label="投保人数" align="center" :resizable="false" width="100">
              <template slot-scope="scope">{{ scope.row.people_num }}</template>
            </el-table-column>
            <el-table-column label="订单金额" align="center" :resizable="false" width="130">
              <template slot-scope="scope">{{ scope.row.order_price }}</template>
            </el-table-column>
            <el-table-column label="订单状态" align="center" :resizable="false" width="130">
              <template slot-scope="scope">
                {{ statusFilter('pay_status', scope.row.pay_status) }}
                <!-- <div v-if="scope.row.order_status == 1 || scope.row.order_status == 2">
                  <em v-if="scope.row.insured_status == 1 && (scope.row.pay_status == 3 || scope.row.pay_status == 2)">{{ insured_status('ORDER_STATUS', scope.row.insured_status) }}</em>
                  <em v-else>
                    <em v-if="scope.row.order_status == 2">{{ statusFilter('ORDER_STATUS', scope.row.order_status) }}</em>
                    <em v-else>{{ statusFilter('PAY_STATUS', scope.row.pay_status) }}</em>
                  </em>
                  </div>
                <div v-else>{{ statusFilter('ORDER_STATUS', scope.row.order_status) }}</div> -->
              </template>
            </el-table-column>
            <el-table-column label="保单状态" align="center" :resizable="false" width="130">
              <template slot-scope="scope">{{ statusFilter('insured_status', scope.row.insured_status) }}</template>
            </el-table-column>
            <el-table-column label="发票" align="center" :resizable="false" width="130">
              <template slot-scope="scope">{{ scope.row.is_invoice == 0 ? '不需要': scope.row.is_invoice == 1 ? "需要":"其他"}}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120" fixed="right">
              <template slot-scope="scope">
                <div>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <router-link tag="span"
                          :to="{
                            path: topMenuConst == 'SingleproSelforder' ? '/singlepro/insurance/order-details/' : '/saleorder/insurance/order-details/',
                            query:{
                              order_no:scope.row.order_no
                            }
                          }"
                        >查看详情</router-link>
                      </el-dropdown-item>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.pay_status == 1">
                        <span
                          @click="payInsuranceOrder(scope.row.order_no)"
                        >去支付</span>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.contract_url">
                        <span
                          @click="insuranceOrderContract(scope.row.contract_url)"
                        >下载保单</span>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.pay_status == 2">
                        <span
                          @click="returnInsuranceOrder(scope.row.order_no)"
                        >申请退款</span>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.pay_status == 1">
                        <span
                          @click="insuranceOrderStatus(scope.row.order_no)"
                        >取消订单</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :current-page="searchInput.page"
        @current-change="handleCurrentChange"
        :total="pageTotal"
      />
    </div>
  </div>
</template>
<script>
import SearchItemDateRange from "src/plugins/SearchItemDateRange";
import SelfSupportOrderTab from './components/SelfSupportOrderTab';
import * as format from 'src/utils/format';
import {
  getInsuranceOrderListNew,
  getInsuranceOrderContract,
  returnInsuranceOrderNew,
	payInsuranceOrderNew,
  insuranceOrderPay,
  setInsuranceOrderStatusNew,
  getAllInsuranceOrderListNew
} from "src/api/api";
export default {
  data() {
    const { query } = this.$route;
    return {
      createTime: [query.create_time_start, query.create_time_end],
      pay_status: [],
      status: ["全部","待付款", "已完成"],
      searchInput: {
        pay_status: "",
        order_no: "",
        product_name: "",
        create_begin_time: "",
        create_end_time: "",
        insured_status: '',
        page: 1,
        page_size: 10
      },
      pageTotal: 0,
      tag_status: {},//tab切换状态
      tableData: [],
      form: "",
      statusSelect: "全部",
      insured_status: []
    };
  },
  filters: {
    formatDate(d) {
      return d ? d.split(' ')[0] : ''
    }
  },
  mounted() {
    this.getList();
  },
  watch: {},
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.menu;
    },
    isPurchase () {
      return this.$route.meta && this.$route.meta.isPurchase;
    },
    tabComponent(){
      if(this.isPurchase){
        return 'purchase-order-tab';
      }else{
        switch(this.topMenuConst){
        case 'SingleproSingleorder':
          return 'single-order-tab';
        case 'SingleproSelforder':
          return 'self-support-order-tab';
        default:
          return '';
        }
      }
    }
  },
  components: {
    SearchItemDateRange,
    SelfSupportOrderTab
  },
  methods: {
    handleSearch() {
      this.getList();
    },
    statusFilter (type, id) {
      for (let i in this[type]) {
        if (this[type][i].id == id) {
          return this[type][i].name
        }
      }
    },
    getList() {
      // 基础数据
      if (this.topMenuConst == 'SingleproSelforder') {
        // 自营订单
        getAllInsuranceOrderListNew({
          params: {
            data: this.searchInput
          },
          success: params => {
            let { code, data, msg } = params.data
            if (code == "0") {
              this.insured_status = data.insured_status
              this.tag_status = data;//tab切换
              this.tableData = data.list;
              this.pay_status = data.pay_status || [];
              this.pageTotal = parseInt(data.data_count)
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      }else if(this.topMenuConst == 'SaleorderInsurance'){
        // 非自营订单
        getInsuranceOrderListNew({
          params: {
            data: this.searchInput
          },
          success: params => {
            let { code, data, msg } = params.data
            if (code == "0") {
              this.insured_status = data.insured_status
              this.tag_status = data;//tab切换
              this.tableData = data.list;
              this.pay_status = data.pay_status || [];
              this.pageTotal = parseInt(data.data_count)
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      }

    },
    TabgetList(value) {
			// Tab状态切换
      this.order_status = value;
      this.searchInput.order_status = value;
      this.statusSelect = this.status[value];
      this.getList();
    },
    handleChangeCreateTime(date) {
			// 下单时间
      this.searchInput.create_begin_time = format.date(date[0]) || "";
      this.searchInput.create_end_time = format.date(date[1]) || "";
    },
    payInsuranceOrder(order_no) {
      //支付
      insuranceOrderPay ({
        params: {
          data: {
            order_no: order_no
          },
        },
        success: res => {
          let { code, data, msg } = res.data
          if (code == "0") {
            payInsuranceOrderNew({
              params: {
                data: {
                  orderId: data.order_no,
                  amount: data.amount,
                  platform: data.platform,
                  returnUrl: `${ window.location.origin + window.location.pathname }#/${ this.$route.path.indexOf('singlepro') > 0 ? 'singlepro' : 'saleorder' }/insurance/order-details/?order_no=${ data.order_no }`,
                  customParams: data.customParams
                }
              },
              success: params => {
                let data = params.data;
                if (data.code == "0") {
                  let div = document.createElement("div");
                  div.innerHTML = data.data.form;
                  div.hidden = true;
                  document.body.appendChild(div);
                  div.getElementsByTagName("form")[0].submit();
                } else {
                  this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      })
		},
		insuranceOrderStatus(order_no){
			//取消订单
			setInsuranceOrderStatusNew({
        params: {
          data: {
            order_no: order_no
          }
        },
        success: params => {
          let data = params.data;
          if (data.code == "0") {
            window.location.reload();
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
		},
    insuranceOrderContract(url) {
      window.open(url);
      // //下载保单
      // getInsuranceOrderContract({
      //   params: {
      //     data: {
      //       order_no: order_no
      //     }
      //   },
      //   success: params => {
      //     console.log(params);
      //     let data = params.data;
      //     if (data.code == "0") {
      //       window.open(data.data.url);
      //     } else {
      //       this.$message.error(data.msg);
      //     }
      //   },
      //   showLoading: true
      // });
    },
    returnInsuranceOrder(order_no) {
      //退款接口
      if(confirm("是否执行申请退款操作")){

      }else{
        return false
      }
      returnInsuranceOrderNew({
        params: {
          data: {
            order_no: order_no
          }
        },
        success: params => {
          let data = params.data;
          if (data.code == "0") {
            this.getList();
            this.$message({
              type: 'info',
              message: '退款处理中，请稍后查看。'
            });
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleCurrentChange(val) {
			// 分页
      if (this.searchInput.page != val) {
        this.searchInput.page = val;
        this.getList();
      }
    },
  }
};
</script>

<style scoped lang="less">
.div-btn {
  height: 24px;
}
em{
  font-style:normal;
}
</style>
