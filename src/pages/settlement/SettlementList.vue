<style lang="stylus" scoped>
@import '../../assets/stylus/common.styl'
.settlement-list
  .table-list
    padding 15px
    background #fff
</style>
<template lang="pug">
  .settlement-list
    .system-tab
      ul.tab-box
        router-link(tag="li", to="/settlement/line/pendingSettlement-list") 待结算
        router-link(class="on", tag="li", to="") 结算单列表
    .system-search
      .search-item
        .label 发起时间
        el-date-picker(
          v-model="searchData.interval"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        )
      .search-item
        .label 结算单号
        el-input(class="elinput" v-model="searchData.settlement_no" placeholder="请输入结算单号")
      .search-item
        .label 付款方
        el-input(class="elinput" v-model="searchData.payer" placeholder="请输入付款方")
      .search-item
        .label 状态
        el-select(v-model="searchData.status" placeholder="请选择状态")
          el-option(
            v-for="item in statusOptions",
            :key="item.value",
            :label="item.label",
            :value="item.value"
          )
      el-button(type="primary", @click="searchRebateList")  搜索
    .table-list
      el-table(class="primary-table", :data="tableDataList", border, style="width: 100%")
        el-table-column(label="发起时间", prop="create_time")
        el-table-column(label="结算单号", prop="settlement_no")
        el-table-column(label="付款方", prop="payer_org_name")
        el-table-column(label="实际结算金额", prop="amount")
        el-table-column(label="状态", prop="status_name")
        el-table-column(label="处理时间", prop="handle_time")
        el-table-column(label="操作")
          template(slot-scope="scope")
            el-button(type="text", @click="toSettlementDetail(scope.row)", size="small") 查看
            //- el-button(type="text", v-if="scope.row.flag == 0 && scope.row.status == -1" @click="_reApply(scope.row)", size="small") 重新发起
      el-pagination(v-if="tableDataList.length", class="pagin", layout="prev, pager, next", @current-change="currentPageChange", :total="total_count", :page-size="pageSize", :current-page="currentPage")
          
</template>
<script>
import { getSettlementList, reApply } from "src/api/finance";
export default {
  data() {
    return {
      searchData: {
        interval: [],
        settlement_no: "",
        payer: "",
        status: ""
      },
      currentPage: 1,
      total_count: 1,
      pageSize: 10,
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待结算"
        },
        {
          value: "1",
          label: "审批中"
        },
        {
          value: "-1",
          label: "审批不通过"
        },
        {
          value: "2",
          label: "审批通过"
        },
        {
          value: "3",
          label: "已结算"
        }
      ],
      tableDataList: []
    };
  },
  mounted() {
    this._getSettlementList();
  },
  methods: {
    async _getSettlementList(page) {
      const params = {
        data: {
          settlement_no: this.searchData.settlement_no,
          status: this.searchData.status,
          payer_org_name: this.searchData.payer,
          create_time: {
            start: this.searchData.interval !== null ? this.searchData.interval[0] : "",
            end: this.searchData.interval !== null ? this.searchData.interval[1] : ""
          },
          page_index: page || 1,
          page_size: this.pageSize
        }
      };
      const {
        data: { code, data, msg }
      } = await getSettlementList(params, true);

      if (code !== 0) return this.$message.error(msg);
      this.tableDataList = data.list;
      this.total_count = data.total_count * 1;
    },
    searchRebateList() {
      this._getSettlementList();
    },
    toSettlementDetail(row) {
      this.$router.push({
        path: "/settlement/supplier/supplier-detail",
        query: {
          settlement_no: row.settlement_no
        }
      });
    },
    async _reApply(row) {
     const params = {
       data: {
         settlement_no: row.settlement_no
       }
     }
     try {
       const {data: {code, data, msg}} = await reApply(params,true)

       if(code !== 0 ) return this.$message.error(msg)
       this.$message.success(msg)
       this._getSettlementList()
     } catch(err) {
       console.log(err)
     }   
    },
    currentPageChange(page) {
      this.currentPage = page;
      this._getSettlementList(page);
    }
  }
};
</script>