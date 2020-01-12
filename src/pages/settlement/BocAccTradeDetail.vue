<template>
  <div class="recieve-detail">
    <div class="recieve-info">
      <h2 class="recieve-tit">交易明细</h2>
      <div class="receive-content">
        <ul class="co-ul clearfix">
          <li>
            <label>凭证号码</label>
            {{allData.vchnum}}
          </li>
          <li>
            <label>可用余额</label>
            {{allData.avlbal}}元
          </li>
          <li>
            <label>交易金额</label>
            <span style="color: #f90">{{allData.txnamt}}元</span>
          </li>
          <li>
            <label>冻结金额</label>
            {{allData.frzamt}}元
          </li>
          <li>
            <label>汇率</label>
            1
          </li>
          <li>
            <label>透支额度</label>
            {{allData.overdramt}}元
          </li>
          <li>
            <label>交易时间</label>
            {{allData.txndate}}
          </li>
          <li>
            <label>可用透支额度</label>
            {{allData.avloverdramt}}元
          </li>
          <li>
            <label>交易后余额</label>
            {{allData.acctbal}}元
          </li>
          <li>
            <label>用途</label>
            {{allData.useinfo}}
          </li>
          <li>
            <label>业务类型</label>
            {{allData.transtype}}
          </li>
          <li>
            <label>附言</label>
            {{allData.furinfo}}
          </li>
        </ul>
        <ul class="co-ul clearfix" v-if="allData.fractn">
          <li class="ellipsis">
            <label>付款银行</label>
            <span :title="allData.fractn.ibknum">
              {{allData.fractn.ibknum}}
            </span>
          </li>
          <li class="ellipsis">
            <label>收款银行</label>
            <span :title="allData.toactn.toibkn">
              {{allData.toactn.toibkn}}
            </span>
          </li>
          <li>
            <label>付款账号</label>
            {{allData.fractn.actacn}}
          </li>
          <li>
            <label>收款账号</label>
            {{allData.toactn.actacn}}
          </li>
          <li>
            <label>付款人</label>
            {{allData.fractn.acntname}}
          </li>
          <li>
            <label>收款人</label>
            {{allData.toactn.toname}}
          </li>
          <li>
            <label>付款人开户行</label>
            {{allData.fractn.ibkname}}
          </li>
          <li>
            <label>收款人开户行</label>
            {{allData.toactn.tobank}}
          </li>
          <li>
            <label>汇款行业务编号</label>
            {{allData.fractn.outref}}
          </li>
          <li>
            <label>收款行业务编号</label>
            {{allData.toactn.outref}}
          </li>
        </ul>
        <ul class="co-ul clearfix">
          <li>
            <label>收款标识</label>
            <template v-if="allData.is_payment == 0">未收</template>
            <template v-else>已收</template>
          </li>
          <li v-if="allData.payment_id != 0">
            <router-link :to="{path:'/settlement/recpay/receive-detail', query: {
              id:allData.payment_id
              }}">
              收款记录
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { bocTransactionDetail }from 'src/api/finance';
export default {
  name: 'settlementBocaccTradeDetail',
  data () {
    return {
      requestData:{
        org_id: this.$route.query.org_id,
        datescope_from: this.$route.query.datescope_from,
        datescope_to: this.$route.query.datescope_to,
        amountscope_from: this.$route.query.amountscope_from,
        amountscope_to: this.$route.query.amountscope_to,
        page: this.$route.query.page,
        page_size: this.$route.query.page_size,
        vchnum: this.$route.query.vchnum,
      },
      allData: {
      },
		}
  },
  computed:{},
  components: {},
  methods:{
    init(){
      bocTransactionDetail({
        params:{
          data: this.requestData
        },
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.allData = data;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
  },
  mounted(){
    this.init();
  }
}
</script>
<style lang="scss" scoped>
.recieve-detail {
  .recieve-info {
    background-color: #fff;
    padding: 30px 30px 20px;
    .recieve-tit {
      font-size: 18px;
      color: #b10c79;
      padding: 0 0 0 10px;
      border-left: 5px solid #b10c79;
    }
    .receive-content {
      padding: 0;
    }
    .co-ul{
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 15px;
      padding: 10px;
      line-height: 20px;
      font-size: 14px;
      color: #333333;
      li{
        float: left;
        width: 50%;
        box-sizing: border-box;
        margin: 5px 0;
        padding-left: 120px;
        overflow: hidden;
      }
      label{
        float: left;
        width: 110px;
        margin-left: -120px;
        text-align: right;
        color: #999;
      }
    }
    .light{
      color: #ff6000!important;
    }
    .money-wrap {
      float: left;
      font-size: 14px;
      line-height: 33px;
      color: #333333;
      span {
        padding: 0 0 0 10px;
        color: #ff6000;
      }
    }
    .receive-money-wrap {
      padding: 0 15px 0 0;
      .btn-wrap {
        float: right;
      }
      &.mtb {
        margin: 10px 0 15px;
      }
    }
  }
  .primary {
    color: #b10c79;
  }
  .orange {
    color: #ff6000;
  }
}
.col-green{
  color: #4ab93d;
}
.col-whitegray{
  color: #999999;
}
.col-red{
  color: #fc1621;
}
.sel{
  width: 140px;
}
.ml30{
  margin-left: 30px;
}
.dialog-footer{text-align: center;}
.record{margin-bottom: 20px;}
.link{
  color: #b10c79;
  text-decoration: underline;
  &:hover{
    opacity: .8;
  }
}
.link2 {
  color: #b10c79;
  .b-tip {
    color: #000;
  }
}
.ellipsis{
  height: 20px;
  line-height: 20px;
}
</style>
