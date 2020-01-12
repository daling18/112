<style lang="stylus" scoped>
</style>
<template lang="pug">
  .sale-profix
    profit-settlement(:pay_type = "pay_type_saleProfit")
  
</template>
<script>
import { getProfitWholesaler } from "src/api/finance";
import ProfitSettlement from "./components/ProfitSettlement.vue";

export default {
  data() {
    return {
      pay_type_saleProfit: "3" //销售利润
    };
  },
  components: {
    ProfitSettlement
  }
};
</script>