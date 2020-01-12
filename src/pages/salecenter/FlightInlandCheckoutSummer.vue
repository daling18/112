<template>
  <div class="order-summary">
    <div class="order-summary-title">
      订单金额：
      <span class="total">￥{{ totalPrices }}</span>
    </div>
    <div class="order-summary-detail">
      <div class="adult">
        <p class="summary-item">
          成人结算价：￥{{ prices.adult_price }} * {{ adultCount }}人
          <span class="total">
            ￥{{ prices.adult_price *  adultCount}}
          </span>
        </p>
        <p class="summary-item">
          机建 + 燃油：￥{{ prices.adult_tax + prices.adult_fuel }} * {{ adultCount }}人
          <span class="total">
            ￥{{ (prices.adult_tax + prices.adult_fuel) *  adultCount}}
          </span>
        </p>
      </div>
      <!-- <div v-if="prices.child_price && prices.child_price" class="child">
        <p class="summary-item">
          儿童结算价：￥{{ prices.child_price }} * {{ childCount }}人
          <span class="total">
            ￥{{ prices.child_price * childCount}}
          </span>
        </p>
        <p class="summary-item">
          机建 + 燃油：￥{{ prices.child_tax }} * {{ childCount }}人
          <span class="total">
            ￥{{ (prices.child_tax + prices.child_fuel) * childCount}}
          </span>
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "InlandCheckoutSummer",
    data(){
      return {

      }
    },
    props: {
      prices: [Object],
      adultCount: [Number],
      childCount: [Number]
    },
    computed:{
      totalPrices(){
        let total = 0;
        total = (this.prices.adult_price + this.prices.adult_fuel + this.prices.adult_tax) * this.adultCount;
        if(this.prices.child_price){
          total += (this.prices.child_price + this.prices.child_fuel + this.prices.child_tax) * this.childCount;
        }
        return total;
      }
    }
  }
</script>

<style lang="less" scoped>
.order-summary {
  border: 1px solid #ddd;
  background-color: #fff;
  .order-summary-title {
      padding: 10px 20px;
      font-size: 20px;
      background-color: #f4f4f4;
      .total {
          float: right;
          color: #f60;
      }
  }
  .summary-item {
      padding: 5px 20px;
      .total {
          float: right;
      }
  }
  .summary-out {
      padding: 10px 20px;
      margin: 0 -20px;
      background-color: #f8f8f8;
      .total {
          color: #f60;
          font-size: 16px;
      }
  }
}
</style>
