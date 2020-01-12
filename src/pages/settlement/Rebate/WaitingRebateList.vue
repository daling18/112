<style lang="stylus" scoped>
@import '../../../assets/stylus/common.styl';
.rebate
  .elinput
    width: 200px
  .rebate-content
    background: #fff
    .rebateAmount
      padding: 20px
    .batch-btn
      margin-bottom: 20px
</style>

<template lang="pug">
  .rebate
    .system-tab
      ul(class="tab-box")
        router-link(tag="li", class="on", to="") 待返佣
        router-link(tag="li", to="/settlement/rebate/rebate-list") 返佣单列表
    .system-search
      .search-item
        .label 订单号
        el-input(class="elinput" v-model="searchData.order_no" placeholder="请输入订单号")
      //- .search-item
      //-   .label 付款方
      //-   el-input(class="elinput" v-model="searchData.payer" placeholder="请输入付款方")
      .search-item
        .label 产品编号
        el-input(v-model="searchData.product_num", placeholder="请输入产品编号")
      el-button(type="primary", @click="searchRebateList") 搜索
    .content-wrapper(class="rebate-content")
      .rebateAmount
        span 预计返佣金额：{{amout}}
      el-button(class="batch-btn", type="primary", @click="batchOperate") 批量发起
      el-table(class="primary-table", :data="tableData", border, style="width: 100%", @select="selectTable", @select-all="allSelectTable")
        el-table-column(type="selection")
        el-table-column(label="下单时间", prop="create_time")
        el-table-column(label="订单号", prop="order_no")
        el-table-column(label="下单人", prop="user_name")
        el-table-column(label="产品类型", prop="product_type")
        el-table-column(label="产品名称", prop="product_name")
        el-table-column(label="产品编号", prop="num_no")
        el-table-column(label="订单总金额", prop="order_amount")
        el-table-column(label="结算总金额", prop="settlement_amount")
        el-table-column(label="已收", prop="accept_amount")
        el-table-column(label="销售利润", v-if="this.orgType === this.TYPES.department", prop="sale_profit")
        el-table-column(label="批发分润", v-if="this.orgType === this.TYPES.department", prop="packer_profit")
        el-table-column(label="拉新分润", v-if="this.orgType === this.TYPES.department", prop="lachine_profit")
        el-table-column(label="分公司奖励", v-if="this.orgType === this.TYPES.company", prop="company_award")
      el-pagination(class="pagin", layout="prev, pager, next", @current-change="currentPageChange", :total="total_count", :page-size="pageSize", :current-page="currentPage")
</template>

<script>
import {
  getWattingRebateList_department,
  getWattingRebateList_company,
  batchRebate_department,
  batchRebate_company
} from "src/api/finance";

export default {
  data() {
    return {
      orgType: "",
      listUrl: "",
      TYPES: {
        company: "3",
        department: "5"
      },
      currentPage: 1,
      pageSize: 10,
      total_count: null,
      searchData: {
        order_no: "",
        // payer: "",
        product_num: ""
      },
      statusList: [],
      amout: "",
      tableData: [],
      batchRebateUrl: ""
    };
  },
  mounted() {
    this.orgType = localStorage.getItem("orgtype");

    if (this.orgType == this.TYPES.department) {
      this.listUrl = getWattingRebateList_department;
      this.batchRebateUrl = batchRebate_department
    }
    if (this.orgType == this.TYPES.company) {
      this.listUrl = getWattingRebateList_company;
      this.batchRebateUrl = batchRebate_company
    }
   
    this._getWattingRebateList();
  },
  methods: {
    async _getWattingRebateList(page) {
      const params = {
        data: {
          order_no: this.searchData.order_no,
          num_no: this.searchData.product_num,
          page_index: page || 1,
          page_size: this.pageSize
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await this.listUrl(params, true);

        if (code !== 0) return this.$message.warning(msg);

        this.total_count = data.total_count * 1;
        this.amout = data.total_amount || 0;
        this.tableData = data.list;
      } catch (err) {
        console.log(err);
      }
    },
    async _batchRebate_department(ids) {
      const params = {
        data: {
          ids: ids
        }
      };
      if(this.TYPES.company)
      try {
        const {
          data: { code, data, msg }
        } = await this.batchRebateUrl(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.$message.success("发起成功");
        this.$router.push('/settlement/rebate/rebate-list')
        // this._getWattingRebateList();
      } catch (err) {
        console.log(err);
      }
    },
    searchRebateList() {
      this._getWattingRebateList();
    },
    batchOperate() {
      if (!this.statusList.length) return this.$message.warning("请勾选订单");
      let ids = [];
      this.statusList.forEach(item => {
        ids.push({
          id: item.id,
          product_name: item.product_name,
          num_no: item.num_no,
          member_name: item.user_name
        });
      });
      this._batchRebate_department(ids);
    },
    selectTable(row) {
      this.statusList = row;
    },
    allSelectTable(row) {
      this.statusList = row;
    },
    currentPageChange(page) {
      this.currentPage = page;
      this._getWattingRebateList(page);
    }
  }
};
</script>

