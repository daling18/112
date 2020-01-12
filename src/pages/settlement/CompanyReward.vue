<style lang="stylus" scoped>

</style>
<template lang="pug">
  .company-reward
    profit-settlement(:pay_type = "pay_type_saleProfit")
</template>
<script>
import { getProfitWholesaler } from "src/api/finance";
import ProfitSettlement from "./components/ProfitSettlement.vue";

export default {
  data() {
    return {
      pay_type_saleProfit: "4" //分公司奖励
    };
  },
  components: {
    ProfitSettlement
  }
};
</script>