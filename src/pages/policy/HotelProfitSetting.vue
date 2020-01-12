<style lang="stylus" scoped>
.profit-setting
  .profit-header
    margin-bottom 20px
    .head-name
      font-size 20px
</style>

<template lang="pug">
  .profit-setting
    .profit-header
      span(class="head-name") 分润政策设置
    profit-policy(:initData="initData", @params="submitPolicy")
</template>

<script>
import { promise_policySetList, promise_policySave } from 'src/api/promise_api'
import profitPolicy from 'src/components/template/policy/ProfitPolicy.vue'

export default {
  data() {
    return {
      initData: {
        policy_id: "",
        policy_name: "",
        greadOneVal: '0',
        greadType: '1',
        greadTwoVal: '0',
        policyProduct: "hotel"
      },
    }
  },
  components: {
    profitPolicy
  },
  mounted() {
    this._getInit()
  },
  methods:{
    async _getInit() {
      try {
        const { data: { code, data } } = await promise_policySetList({}, true)

        if( code !== 0) return
        this.initData.policy_id = data.id
        this.initData.policy_name = data.name
        this.initData.greadType = data.style
        this.initData.greadOneVal = data.one_level
        this.initData.greadTwoVal = data.two_level
      }
      catch(err) {
        console.log(err)
      }
    },
    async submitPolicy(params) {
      try {
        const { data: { code, data, msg} } = await promise_policySave(params, true)

        if( code !== 0) return this.$message.warning(msg)
        this.$message.success("保存成功")
      }
      catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

