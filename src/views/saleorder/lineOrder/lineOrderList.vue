<template>
  <div class="wrapper">
    <!-- system-search -->
    <el-row class="section">
      <el-form inline class="search-bar">
        <el-form-item>
          <el-input v-model.trim="filterData.keyword5" placeholder="产品编号/产品名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="filterData.keyword1" placeholder="订单编号/团号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="filterData.keyword2" placeholder="出游人姓名/电话" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="filterData.keyword3" placeholder="订单联系人/电话" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="filterData.keyword4" placeholder="下单人姓名/下单账号/代理商" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            :class="'date-picker'"
            v-model="departureTime"
            type="daterange"
            :value-format="'yyyy-MM-dd'"
            start-placeholder="出团日期"
            end-placeholder="出团日期"
            @change="handleChangeDepartureTime"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            :class="'date-picker'"
            v-model="scheduledTime"
            type="daterange"
            :value-format="'yyyy-MM-dd'"
            start-placeholder="下单日期"
            end-placeholder="下单日期"
            :picker-options="pickerOptions"
            @change="handleChangeScheduledTime"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="search-button" type="primary" @click="page.page_index=1;getList()">搜索</el-button>
        </el-form-item>
      </el-form>
      <filter-bar :data="filterParams" v-model="filterBarData"/>
    </el-row>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <div class="list-header">
            <p class="label title">
              <span class="circle"></span> 线路订单
            </p>
            <el-radio-group v-model="filterData.sort">
              <el-radio label="1">按下单时间排序</el-radio>
              <el-radio label="2">按发团时间排序</el-radio>
            </el-radio-group>
          </div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            :span-method="arraySpanMethod"
            :cell-class-name="cellClassName"
            v-loading="loading"
          >
            <el-table-column label="产品名称" min-width="180" align="left">
              <template slot-scope="scope">
                <div class="order-justify" v-if="scope.row.colspan">
                  <div>
                    订单号: {{ scope.row.order_no }}
                    <el-tag
                      size="small"
                      :type="orderText('order_status', scope.row.order_status) | typeColor"
                    >{{ orderText('order_status', scope.row.order_status) }}</el-tag>
                  </div>
                  <span>{{ scope.row.operator_name }}:{{ scope.row.create_time }}</span>
                </div>
                <div
                  v-else
                  :title="scope.row.lineOrderProduct?scope.row.lineOrderProduct.line_title:''"
                >
                  <span
                    style="font-weight:600"
                  >{{ scope.row.lineOrderProduct?scope.row.lineOrderProduct.line_title:'' }}</span>
                  <p
                    style="line-height: 20px;font-size: 12px;"
                  >{{ scope.row.lineOrderProduct?scope.row.lineOrderProduct.line_no:'' }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="出团日期/团号" min-width="120" align="center">
              <template slot-scope="scope">
                <div class="ellipsis">{{ scope.row.departure_date }}</div>
                <div class="ellipsis" :title="scope.row.tuan_no">{{scope.row.tuan_no}}</div>
              </template>
            </el-table-column>
            <el-table-column label="订单人数" align="center" min-width="130">
              >
              <template slot-scope="scope">
                <div>
                  <span>{{ scope.row.enrollment }}</span>
                  <!-- <span>{{scope.row.adult_num}}成人</span>
                                    <span v-if="scope.row.child_num>0">&nbsp;{{ scope.row.child_num }}儿童&nbsp;</span>
                  <span v-if="scope.row.other_type_num>0">{{scope.row.other_type_num}}其他</span>-->
                  <div v-if="scope.row.lineRefund && scope.row.lineRefund.length">
                    <a
                      href="javascript:void(0)"
                      @click="goDetail(scope.row, 'refund')"
                    >[退]</a>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="订单金额" prop="total_amount" align="center" min-width="110">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.total_amount">￥{{ scope.row.total_amount }}</div>
                <div
                  class="ellipsis"
                  :title="scope.row.total_amount"
                >已收款: {{scope.row.total_received_amount || 0}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="应结算金额" prop="total_settled_amount" align="center">
              <template slot-scope="scope">
                <div
                  class="ellipsis"
                  :title="scope.row.total_settled_amount"
                >￥{{ scope.row.total_settled_amount }}</div>
              </template>
            </el-table-column>-->
            <el-table-column label="合同状态" align="center">
              <template slot-scope="scope">
                <div
                  class="ellipsis"
                  style="text-align:center"
                  :title="scope.row.contract_type_text"
                >{{ scope.row.contract_type_text}}</div>
              </template>
            </el-table-column>
            <el-table-column label="代理商" align="center">
              <template slot-scope="scope">
                <div
                  class="ellipsis"
                  :title="scope.row.agent_org_name"
                >{{ scope.row.agent_org_name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="goDetail(scope.row)">查看订单</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-footer>
      <Affix :offset-bottom="0">
        <div class="page" v-show="page.total_count > 10">
          <el-pagination
            layout="total, prev, pager, next, jumper"
            :total="page.total_count"
            :current-page="page.page_index"
            @current-change="handleCurrentChange"
            :page-count="page.total_page"
          />
        </div>
      </Affix>
    </el-footer>
  </div>
</template>

<script>
import FilterBar from "src/components/template/touristroute/filterBar.vue";
import { filterStatusMap } from "@/configuration/orderMap.js";
import Affix from "src/components/template/common/affix";
import {
  lineOrderGetParams,
  lineOrderSaleOrderList
} from "src/api/touristroute";
import * as format from "src/utils/format";
export default {
  name: "PlanOrderList",
  components: {
    FilterBar,
    Affix
  },
  filters: {
    formatPrice: format.formatPrice,
    typeColor: function(val) {
      switch (val) {
        case "待付款":
          return "danger";
        case "待确认":
          return "warning";
        case "占位中":
          return "success";
        case "部分付款":
          return "";
        case "已付款":
          return "success";
        default:
          return "info";
      }
    }
  },
  watch: {
    filterBarData: {
      handler() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.page.page_index = 1;
          this.getList();
        }, 300);
      },
      deep: true
    },
    "filterData.sort"() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.page.page_index = 1;
        this.getList();
      }, 300);
    }
  },
  data() {
    const { query } = this.$route;
    return {
      timer: null,
      pickerOptions: {
        disabledDate(time) {
          return Date.now() < time;
        }
      },
      scheduledTime: [
        query.scheduled_time_start || "",
        query.scheduled_time_end || ""
      ],
      departureTime: [
        query.departure_date_start || "",
        query.departure_date_end || ""
      ],
      tableData: [],
      filterData: {
        // page_index: query.page || 1,
        // page_size: query.page_size || 10,
        keyword1: query.keyword1 || "",
        keyword2: query.keyword2 || "",
        keyword3: query.keyword3 || "",
        keyword4: query.keyword4 || "",
        keyword5: query.keyword5 || "",
        scheduled_time_start: query.scheduled_time_start || "",
        scheduled_time_end: query.scheduled_time_end || "",
        departure_date_start: query.departure_date_start || "",
        departure_date_end: query.scheduled_time_end || "",
        sort: query.sortType || "1"
      },
      filterBarData: {},
      filterParams: [],
      list: [],
      page: {
        page_index: 1,
        page_size: 10,
        total_count: 0,
        total_page: 0
      },
      loading: false
    };
  },
  mounted() {
    this.getParams();
    // this.getList();
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.colspan) {
        if (columnIndex == 0) return [1, 7];
        return [0, 0];
      }
    },
    cellClassName({ row, columnIndex }) {
      if (row.colspan) {
        return "customCell";
      } else {
        return "customCelltds";
      }
    },
    getParams() {
      lineOrderGetParams().then(res => {
        const { data, code, msg } = res;
        if (code == "0") {
          this.filterParams = Object.entries(data).map(([id, ele]) => {
            return {
              id: filterStatusMap[id].id,
              label: filterStatusMap[id].label,
              data: ele.map(item => ({
                id: item.id,
                label: item.name
              }))
            };
          });
          Object.keys(data).forEach(key => {
            this.$set(this.filterBarData, filterStatusMap[key].id, []);
          });
        } else {
          this.$message.error(msg);
        }
      });
    },
    orderText(key, id) {
      let label = key == "其他";
      this.filterParams.find(item => {
        if (item.id == key) {
          let data = item.data.find(data => data.id == id);
          if (data) {
            label = data.label;
            return label;
          }
        }
      });
      return label;
    },
    getList() {
      let params = {
        page_index: this.page.page_index,
        page_size: this.page.page_size,
        ...this.filterData
      };
      Object.keys(this.filterBarData).forEach(key => {
        params[key] = this.filterBarData[key].filter(v => String(v)).join(",");
      });
      this.loading = true;
      lineOrderSaleOrderList(params).then(res => {
        this.loading = false;

        const { code, data, msg } = res;
        if (code == 0) {
          let newList = [];
          data.list.forEach(item => {
            newList.push({ colspan: true, ...item });
            newList.push(item);
          });
          this.list = newList;
          this.page.total_page = data.total_page;
          this.page.total_count = parseInt(data.total_count);
        } else {
          this.$message.error(msg);
        }
      });
    },
    handleChangeScheduledTime(date) {
      this.filterData.scheduled_time_start = date ? date[0] : "";
      this.filterData.scheduled_time_end = date ? date[1] : "";
    },
    handleChangeDepartureTime(date) {
      this.filterData.departure_date_start = date ? date[0] : "";
      this.filterData.departure_date_end = date ? date[1] : "";
    },
    handleCurrentChange(val) {
      this.page.page_index = val;
      // this.filterData.page_index = val;
      this.getList();
    },
    goDetail(row, type) {
      let storageQuery = JSON.stringify({
        order_id: row.id,
        order_no: row.order_no,
        refund: row.lineRefund
      });
      window.localStorage.storageQuery = storageQuery;
      if (type == "refund") {
        this.$router.push({
          path: "/saleorder/v2/lineOrder/detail/refund",
          query: row.lineRefund[0]
        });
      } else {
        this.$router.push({
          path: "/saleorder/v2/lineOrder/detail/order",
          query: {
            order_id: row.id,
            order_no: row.order_no
          }
        });
      }
    }
  }
};
</script>
<style  scoped>
>>> .customCell {
  height: 40px !important;
  padding: 0px !important;
  margin: 0px !important;
}
>>> .customCell .cell {
  padding: 5px 10px;
  height: 30px;
}
>>> .customCelltds {
  padding: 0px !important;
}
>>> .customCelltds .ellipsis {
  text-align: center;
}
>>> .el-form-item__content {
  line-height: 35px;
}
</style>
<style scoped lang="less">
.el-footer {
  padding: 0;
}
.el-footer {
  height: 52px;
}
// .search_bar {
//   .el-input__inner {
//     height: 40px;
//   }

// }
.search-button {
  width: 110px;
  height: 35px;
  line-height: 0;
}
.label-title {
  font-size: 20px;
  border-left: 2px solid #b3238b;
  padding-left: 10px;
  font-weight: 600;
}
.page {
  position: relative;
  background: #fff;
  padding: 15px 0;
  height: 30px;
}
.list-header {
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 10px;
  .title {
    .circle {
      margin-bottom: 4px;
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: purple;
    }
    font-weight: 600px;
    font-size: 20px;
  }
}
.section {
  padding-top: 10px;
  .search-bar {
    padding: 0 20px;
    margin-bottom: 10px;
  }
}
.order-justify {
  overflow: hidden;
  & > div {
    float: left;
  }
  > span {
    position: relative;
    z-index: 9;
    float: right;
  }
}
</style>
