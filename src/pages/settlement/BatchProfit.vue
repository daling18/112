<style lang="stylus" scoped>

</style>
<template lang="pug">
  .batch-profix
    profit-settlement(:pay_type = "pay_type_saleProfit")
</template>
<script>
import ProfitSettlement from "./components/ProfitSettlement.vue";
export default {
  data() {
    return {
      pay_type_saleProfit: "1" //批发分润
    };
  },
  components: {
    ProfitSettlement
  }
};
</script>