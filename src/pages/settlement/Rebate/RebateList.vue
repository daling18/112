<style lang="stylus" scoped>
@import '../../../assets/stylus/common.styl'
.rebate-list
  .rebate-content
    background #fff
    padding 20px
    .rebateAmount
      padding-bottom 20px
    .pagin
      text-align center
      padding 20px 0

</style>

<template lang="pug">
  .rebate-list
    .system-tab
      ul(class="tab-box")
        router-link(tag="li", to="/settlement/rebate/waiting-list") 待返佣
        router-link(tag="li", class="on", to="") 返佣单列表
    .system-search
      .search-item
        .label 订单号
        el-input(class="elinput" v-model="searchData.order_no" placeholder="请输入订单号")
      .search-item
        .label 付款方
        el-input(class="elinput" v-model="searchData.payer" placeholder="请输入付款方")
      .search-item
        .label 产品编号
        el-input(class="elinput" v-model="searchData.product_no" placeholder="请输入产品编号")
      .search-item
        .label 返佣单号
        el-input(class="elinput" v-model="searchData.rebate_no" placeholder="请输入返佣单号")
      .search-item
        .label 状态
        el-select(v-model="searchData.status" placeholder="请选择状态")
          el-option(
            v-for="item in statusOptions",
            :key="item.value",
            :label="item.label",
            :value="item.value"
          )
      .search-item
        .label 付款类型
        el-select(v-model="searchData.payingType" placeholder="请选择付款类型")
          el-option(
            v-for="item in payingOptions",
            :key="item.value",
            :label="item.label",
            :value="item.value"
          )
      el-button(type="primary", @click="searchRebateList")  搜索
    .rebate-content
      .rebateAmount
        span 应返佣金额：{{amout}}
      el-table(class="primary-table", :data="tableData", border, style="width: 100%")
        el-table-column(label="发起时间", prop="create_time")
        el-table-column(label="返佣单号", prop="settlement_no")
        el-table-column(label="应付款金额", prop="pay_amount")
        el-table-column(label="付款方", prop="payer_org_name")
        el-table-column(label="付款类型", prop="type_name")
        el-table-column(label="状态", prop="status_name")
        el-table-column(label="操作")
          template(slot-scope="scope")
            el-button(type="text", @click="toRebateDetail(scope.row)", size="small") 查看
            el-button(type="text", size="small", @click="toApprovalDetail(scope.row)") 审批单
      el-pagination(class="pagin", layout="prev, pager, next", @current-change="currentPageChange", :total="total_count", :page-size="pageSize", :current-page="currentPage")
</template>

<script>
import {
  getRebateList_department,
  getRebateList_company
} from "src/api/finance";

export default {
  data() {
    return {
      orgType: "",
      TYPES: {
        company: "3",
        department: "5"
      },
      listUrl: "",
      pageSize: 10,
      total_count: 100,
      currentPage: 1,
      searchData: {
        order_no: "",
        payer: "",
        product_no: "",
        rebate_no: "",
        status: "",
        payingType: ""
      },
      amout: "0",
      tableData: [
        {
          create_time: 1565709257,
          order_no: "199009090923123123",
          pay_amount: "20000",
          payee_org_name: "盈科美辰",
          settlement_no: "12321313",
          status: 1,
          type: 2
        }
      ],
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "审批中"
        },
        {
          value: "2",
          label: "审批不通过"
        },
        {
          value: "3",
          label: "审批通过"
        },
        {
          value: "4",
          label: "已付款"
        }
      ],
      payingOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "批发分润"
        },
        {
          value: "2",
          label: "拉新分润"
        },
        {
          value: "3",
          label: "销售利润"
        }
      ]
    };
  },
  mounted() {
    this.orgType = localStorage.getItem("orgtype");
    if (this.orgType === this.TYPES.department) {
      this.listUrl = getRebateList_department;
    }
    if (this.orgType === this.TYPES.company) {
      this.listUrl = getRebateList_company;
    }
    this._getRebateList();
  },
  methods: {
    async _getRebateList(page) {
      const params = {
        data: {
          order_no: this.searchData.order_no,
          payer: this.searchData.payer,
          num_no: this.searchData.product_no,
          settlement_no: this.searchData.rebate_no,
          status: this.searchData.status,
          pay_type: this.searchData.payingType,
          page_index: page || 1,
          page_size: this.pageSize
        }
      };
      try {
        const {data: { code, data, msg } } = await this.listUrl(params, true);

        if (code !== 0) return this.$message.warning(msg);
      
        this.tableData = data.list;
        this.amout = data.total_amount || 0;
        this.total_count = data.total_count * 1;
      } catch (err) {
        console.log(err);
      }
    },
    searchRebateList() {
      this._getRebateList();
    },
    toRebateDetail(row) {
      this.$router.push({
        path: "/settlement/rebate/rebate-detail",
        query: {
          rebate_no: row.settlement_no,
          pay_type: this.searchData.payingType || 1,
        }
      });
    },
    toApprovalDetail(row) {
      this.$router.push({
        path: "detail",
        query: {
          id: row.approval_id
        }
      });
    },
    currentPageChange(page) {
      this.currentPage = page;
      this._getRebateList(page);
    }
  }
};
</script>

