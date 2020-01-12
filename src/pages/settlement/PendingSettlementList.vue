<style lang="stylus" scoped>
@import '../../assets/stylus/common.styl'
.pending-settlement
  .content
    background #ffffff
    padding 15px
    .btns
      padding-bottom 15px
  .dialog-center
    margin-left 20px
    .settlement
      margin-bottom 20px
      span
        margin-right 20px
      .elinput 
        width 150px
        margin-left 5px
</style>
<template lang="pug">
  .pending-settlement
    .system-tab
      ul.tab-box
        router-link(class="on", tag="li", to="") 待结算
        router-link(tag="li", to="/settlement/line/settlement-list") 结算单列表
    .system-search
      .search-item
        .label 订单号
        el-input(class="elinput" v-model="searchData.order_no" placeholder="请输入订单号")
      .search-item
        .label 团号
        el-input(class="elinput" v-model="searchData.tuan_no" placeholder="请输入团号")
      .search-item
        .label 出团日期
        el-date-picker(
          v-model="searchData.tuan_date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        )
      .search-item
        .label 产品编号
        el-input(class="elinput" v-model="searchData.product_no" placeholder="请输入产品编号")
      .search-item
        .label 付款方
        el-input(class="elinput" v-model="searchData.payer" placeholder="请输入付款方")
      .search-item
        .label 供应商名称
        el-input(class="elinput" v-model="searchData.supply_name" placeholder="请输入供应商")
      el-button(type="primary", @click="searchRebateList")  搜索
    .content 
      .btns
        el-button(type="primary", @click="_batchSettlementBtn") 批量发起结算
      .table-list
        el-table(
          class="primary-table",
          :data="tableDataList",
          border,
          ref="multipleTable",
          style="width: 100%",
          @select="selectTable",
          @select-all="allSelectTable")
          el-table-column(type="selection" :selectable="handelSelectable",)
          el-table-column(label="订单号", prop="order_no")
          el-table-column(label="团号", prop="tuan_no")
          el-table-column(label="产品名称", prop="product_name")
          el-table-column(label="出团日期", prop="departure_date")
          el-table-column(label="产品编号", prop="product_id")
          el-table-column(label="应结算金额", prop="amount")
          el-table-column(label="实际退款金额", prop="refund_amount")
          el-table-column(label="供应商", prop="supply_name")
          el-table-column(label="付款方", prop="payer_org_name")
        el-pagination(v-if="tableDataList.length", class="pagin", layout="prev, pager, next", @current-change="currentPageChange", :total="total_count", :page-size="pageSize", :current-page="currentPage")
    el-dialog(
      title="录入付款信息",
      :visible.sync="addPayVisible",
      width="50%"
      )
      .dialog-center
        .settlement
          span 供应商名称: {{payInfo.supplierName}}
        .settlement
          span 应结算金额: {{payInfo.should_settlementAmount}}
          span 实际结算金额: 
          el-input(class="elinput", v-model="payInfo.real_settlementAmount" placeholder="请输入金额")
      .btns(slot="footer" class="dialog-footer")
        el-button(type="primary", @click="submitRealSettlementAmount") 确认发起
        el-button(type="primary", @click="addPayVisible = false") 取消
</template>
<script>
import { getpeddingSettlement, batchCreatSettlement } from "src/api/finance";
import { positiveNumReg } from "src/utils/regular";

export default {
  data() {
    return {
      searchData: {
        order_no: "",
        tuan_no: "",
        tuan_date: [],
        payer: "",
        product_no: "",
        supply_name: "",
      },
      addPayVisible: false,
      payInfo: {
        supplierName: "",
        should_settlementAmount: "",
        real_settlementAmount: "",
      },
      currentPage: 1,
      pageSize: 10,
      total_count: 1,
      tableDataList: [],
      statusList: [],
      // checkAllList: []
    };
  },
  mounted() {
    this._getpeddingSettlement();
  },
  methods: {
    searchRebateList() {
      this._getpeddingSettlement();
    },
    async _batchSettlementBtn() {
      if (!this.statusList.length) return this.$message.warning("请勾选订单");
      if(this.statusList[0].supply_id == 0) {
        this._batchSettlement()
      } else {
        this.addPayVisible = true;
        this.payInfo.real_settlementAmount = ""
        this.payInfo.supplierName = this.statusList[0].supply_name
        let sum_amount = 0
        this.statusList.forEach(item => {
          sum_amount += item.amount * 1 
        })
        this.payInfo.should_settlementAmount = sum_amount
      }  
    },
    submitRealSettlementAmount() {
     if(!this.payInfo.real_settlementAmount) return this.$message.warning("请填写实际结算金额")
     if(!positiveNumReg.test(this.payInfo.real_settlementAmount)) return this.$message.warning("实际结算金额不能小于0")
     this._batchSettlement();
    },
    async _batchSettlement() {
      let id_list = [],
          real_amount = 0
      this.statusList.forEach(item => {
        id_list.push(item.id);
        real_amount += item.amount * 1
      });
     const params = {
        data: {
          id_list,
          real_amount,
          supply_id: this.statusList[0].supply_id,
          real_amount: this.payInfo.real_settlementAmount
        }
      };
      const {data: { code, data, msg }} = await batchCreatSettlement(params, true);

      if (code !== 0) {
        this.$message.error(msg);
        this._getpeddingSettlement();
        return
      }
      this.$message.success(msg)
      this.$router.push('/settlement/line/settlement-list')
    },
    async _getpeddingSettlement(page) {   
      const params = {
        data: {
          order_no: this.searchData.order_no,
          tuan_no: this.searchData.tuan_no,
          product_no: this.searchData.product_no,
          payer_org_name: this.searchData.payer,
          departure_date: {
            start: this.searchData.tuan_date !== null? this.searchData.tuan_date[0] : "",
            end: this.searchData.tuan_date !== null ? this.searchData.tuan_date[1] : ""
          },
          supply_name: this.searchData.supply_name,
          page_index: page || 1,
          page_size: this.pageSize
        }
      };
      try {
        const {data: { code, data, msg } } = await getpeddingSettlement(params, true);

        if (code !== 0) return this.$message.error(msg);
        this.tableDataList = data.list;
        this.total_count = data.total_count * 1;
      } catch (err) {
        console.log(err);
      }
    },
   async currentPageChange(page) {
      this.currentPage = page;
     await this._getpeddingSettlement(page);
    //  await this.checkAllList.forEach(item => {
    //     this.$refs.multipleTable.toggleRowSelection(item);
    //     this.tableDataList.forEach(i => {
    //       if(item.id == i.id) {
    //         this.statusList.push(item)
    //       }
    //     })
    //   })
    //   this.$forceUpdate();
    },
    selectTable(row) {
      // console.log(row,'row')
      this.statusList = row;
      // if(this.statusList.length) {
      //   row.forEach(item => {
      //     this.checkAllList.push(item)
      //   })
      // }
      if(this.statusList.length) {
        this.tableDataList.forEach(item => {
         if(row[0].supply_id != item.supply_id) item.checkbox = false
       })
      } else {
        console.log(this.tableDataList)
        this.tableDataList.forEach(item => {
          item.checkbox = true
        })
      }
      // for (let i = 0; i < this.statusList.length; i++) {
      //   if (this.statusList[i].checkbox === false) {
      //     this.$refs.multipleTable.toggleRowSelection(this.statusList[i]);
      //     return this.$message.warning(
      //       `订单号${this.statusList[i].order_no}不能发起结算`
      //     );
      //   }
      // }
    },
    allSelectTable(row) {
      let supplyId = row.length > 0 && row.some(function(value,index){
        return value.supply_id != row[0].supply_id;
      })
      if(!supplyId) {
        !row.length && this.tableDataList.forEach(item => {
          item.checkbox = true
        })
        this.statusList = row;
      } else {
         this.$refs.multipleTable.clearSelection();
      }
    },
    handelSelectable(row, index) {
      if(row.checkbox) {
        return true
      } else {
        return false
      }
    }
  }
};
</script>