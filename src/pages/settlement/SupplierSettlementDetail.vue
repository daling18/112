<style lang="stylus" scoped>
@import '../../assets/stylus/common.styl'
.supplier-detail
  background #fff
  padding 15px
  .span
    margin-bottom 10px
  .content
    .info
      margin 20px 0
      .span
        font-size 16px
        font-weight 600
    .bank-info
      .total-amount
        margin-bottom 20px
    .order-info
      margin 30px 0
      .span
        display flex
        justify-content space-between
    .files
      .annex
        margin-bottom 20px
        .item-img
          display inline-block
          width 200px
          height 200px
          margin-right 20px
          img
            width 100%
            height 100%
    .footer
      text-align center
  .big-img
    overflow hidden
    img 
      width 100%
      height 100%
</style>
<style scoped>
>>> .dialog-bigimg .el-dialog .el-dialog__header {
    padding: 0;
}
</style>>
<template lang="pug">
  .supplier-detail
    .settlement-titel
      span 查看结算单
    .content
      .info
        .span 结算单号：{{settlement_no}}
        .span 状态：{{status_name}}
      .bank-info
        .span(class="total-amount") 实际结算总金额：{{total_amount}}元
        .span 付款公司：{{payer_org}}
        .span 收款公司账户名：{{account_name}}
        .span 收款公司开户行：{{bank_org}}
        .span 收款公司账号：{{bank_no}}
        .span 联系人：{{contact_name}}
        .span 联系方式：{{contact_tel}}
      .order-info
        .span
          span 结算订单信息：
          span(v-if="!special_flag") 实际结算金额 = 应结算金额 - 退款金额 - 返点金额
        el-table(class="primary-table", :data="orderTableData", border, style="width: 100%")
          el-table-column(label="订单号", prop="order_no")
          el-table-column(label="团号", prop="tuan_no")
          el-table-column(label="产品名称", prop="product_name")
          el-table-column(label="出团日期", prop="use_date")
          el-table-column(label="产品编号", prop="product_id")
          el-table-column(label="下单人", prop="operator_name")
          el-table-column(label="应结算金额", prop="amount")
          el-table-column(label="已收", prop="received_amount")
          el-table-column(label="实际退款金额", prop="refund_amount")
          el-table-column(label="返点金额", prop="rebate_amount" v-if="!special_flag")
          el-table-column(label="实际结算金额", prop="final_amount" v-if="!special_flag")
      .files
        .annex(v-if="apply_imgs.length")
          .span 成本票/确认件:
          .item-img(v-for="(item,index) in apply_imgs", :key="index" @click="handleBigImg(item)")
            img(:src="item")
        .annex(v-if="voucher.length")
          .span 付款信息:
          .item-img(v-for="(item,index) in voucher", :key="index"  @click="handleBigImg(item)")
            img(:src="item")
      .footer
        el-button(type="primary", size="large" @click="backBtn") 关闭
    el-dialog(
      :visible.sync="bigImgVisible"
      class="dialog-bigimg"
    )
      .big-img
        img(:src="bigImg" alt="")
</template>
<script>
import { getSettlementDetail } from "src/api/finance";
export default {
  data() {
    return {
      settlement_no: "",
      status_name: "",
      total_amount: "",
      income_orgName: "",
      payer_org: "",
      account_name: "",
      contact_name: "",
      contact_tel: "",
      bank_org: "",
      bank_no: "",
      orderTableData: [
        {
          order_no: "",
          order_username: "",
          tuan_no: "",
          tuan_date: "",
          product_name: "",
          product_no: "",
          order_amount: "",
          settlement_amount: 0,
          accept_amount: "",
          refund_amount: "",
          back_amount: 0
        }
      ],
      batch_settlement: 1,
      apply_imgs: [
      ],
      voucher: [],
      bigImgVisible: false,
      bigImg: "",
      special_flag: false,
    };
  },
  mounted() {
    this.settlement_no = this.$route.query.settlement_no;
    this._getSettlementDetail(this.settlement_no);
  },
  methods: {
    async _getSettlementDetail(id) {
      const params = {
        data: {
          settlement_no: id
        }
      };
      const {data: { code, data, msg }} = await getSettlementDetail(params, true);

      if (code !== 0) return this.$message.warning(msg);
      this.status_name = data.status_name;
      this.payer_org = data.payer_org_name;
      this.account_name = data.account_name
      this.bank_org = data.payee_bank_name;
      this.bank_no = data.payee_bank_no;
      this.contact_name = data.contact_name;
      this.contact_tel = data.contact_tel;
      this.orderTableData = data.detail;
      this.total_amount = data.pay_amount;
      this.voucher = data.voucher;
      this.apply_imgs = data.apply_imgs;
      this.special_flag = data.special_flag
    },
    backBtn() {
      this.$router.back(-1);
    },
    handleBigImg(img) {
      this.bigImgVisible = true
      this.bigImg = img
    }
  }
};
</script>