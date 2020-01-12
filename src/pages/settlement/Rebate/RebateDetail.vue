<style lang="stylus" scoped>
@import '../../../assets/stylus/common.styl'
.rebate-details
  background #ffffff
  padding 20px
  .content
    padding 20px
    .span
      margin-bottom 10px
      span 
        margin-right 15px
    .info,.bank-info,.order-info,.files 
      margin-bottom 20px
      b
        color #999
    .files
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
>>>.dialog-bigimg .el-dialog .el-dialog__header {
      padding: 0;
    }
</style>>
<template lang="pug">
  .rebate-details
    .settlement-titel
      span 返佣单详情
    .content
      .info
        .span
          b 返佣单号：
          span {{details.settlement_no}}
          b 状态：
          span {{details.status_name}}
        .span 
          b 返佣类型： 
          span {{details.type | rebateType}}
        .span 
          b 应返佣金额: 
          span ￥{{details.pay_amount}}
      .bank-info
        .span 
          b 付款方：
          span {{details.payer_org_name}}
        .span 
          b 收款方：
          span {{details.payee_org_name}}
        .span 
          b 收款人：
          span {{details.payee_username}}
        .span 
          b 开户行：
          span {{details.payee_bank_name}}
        .span 
          b 银行账号：
          span {{details.payee_bank_no}}
      .order-info(v-if="details.detail.length")
        .span 
          b 订单信息：
        el-table(class="primary-table", :data="details.detail", border, style="width: 100%")
          el-table-column(label="订单号", prop="order_no")
          el-table-column(label="产品类型", prop="order_type_name")
          el-table-column(label="下单人", prop="member_name")
          el-table-column(label="产品名称", prop="product_name")
          el-table-column(label="产品编号", prop="num_no")
          el-table-column(label="销售总价", prop="amount")
          el-table-column(label="同行总价", prop="cost_amount")
          el-table-column(label="已收", prop="received_amount")
          el-table-column(label="销售利润", v-if="pay_type == TYPES.batchProfit || pay_type == TYPES.pullNewProfit || pay_type == TYPES.saleProfit", prop="profit_amount")
          el-table-column(label="批发分润", v-if="pay_type == TYPES.batchProfit || pay_type == TYPES.pullNewProfit || pay_type == TYPES.saleProfit", prop="profit_top")
          el-table-column(label="拉新分润", v-if="pay_type == TYPES.batchProfit || pay_type == TYPES.pullNewProfit || pay_type == TYPES.saleProfit", prop="profit_shop")
          el-table-column(label="分公司奖励", v-else, prop="profit_branch")
      .files(v-if="details.files.length")
        .span 付款水单
        .item-img(v-for="(item,index) in details.files", :key="index" @click="handleBigImg(item)")
          img(:src="item")
      .footer
        el-button(type="primary", size="large", @click="backBtn") 返回
    el-dialog(
      :visible.sync="bigImgVisible"
      class="dialog-bigimg"
    )
      .big-img
        img(:src="bigImg" alt="")  
</template>
<script>
import { getRebateDetail } from "src/api/finance";
export default {
  data() {
    return {
      orgType: "",
      TYPES: {
        company: "3",
        department: "5",
        batchProfit: "1",//批发分润
        pullNewProfit: "2",//拉新分润
        saleProfit: "3"//销售利润
      },
      details: {
        settlement_no: "123",
        status: "1",
        status_name: "1",
        type: "",
        pay_amount: "85",
        payer_org_name: "盈科总部",
        payee_org_name: "嘉禾营业部",
        payee_username: "zhangshan",
        payee_bank_name: "",
        payee_bank_no: "",
        detail: [],
        files: [],
      },
      pay_type: "",
      bigImgVisible: false,
      bigImg: ""
    };
  },
  filters: {
    rebateType(type) {
      let num = type * 1;
      switch (num) {
        case 1:
          return "批发分润";
          break;
        case 2:
          return "拉新分润";
          break;
        case 3:
          return "销售利润";
          break;
        case 4:
          return "分公司奖励";
          break;
        case 5:
          return "导供分润";
          break;
        case 9:
          return "结算单";
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.pay_type = this.$route.query.pay_type;
    this.orgType = localStorage.getItem("orgtype");
    this._getRebateDetail();
  },
  methods: {
    async _getRebateDetail() {
      const params = {
        data: {
          settlement_no: this.$route.query.rebate_no
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await getRebateDetail(params, true);

        if (code !== 0) return this.$message.warning(msg);
        console.log(data, "details");
        this.details = data.list;
      } catch (err) {
        console.log(err);
      }
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