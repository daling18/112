<style lang="stylus" scoped>
.line-profit
  background #fff
  .line-profit
    margin-top 30px
</style>
<template lang="pug">
  .line-profit
    .system-tab
      ul.tab-box
        router-link(class="on", tag="li", to="") 分润政策设置
        router-link(tag="li", :to="{path: '/policy/line-product'}") 产品政策设置
        //- router-link(tag="li", v-else, :to="{path:'/hotel/roomtypeEdit',query:{room_type_id: roomTypeId,hotel_id: hotelId}}") 基本信息
      profit-policy(:initData="initData", @params="submitPolicy" class="line-profit")
</template>
<script>
import profitPolicy from 'src/components/template/policy/ProfitPolicy.vue'
import { lineBaseProfit, saveProfit } from 'src/api/policy'

export default {
  data() {
    return {
      initData: {
        policy_id: "",
        policy_name: "",
        greadOneVal: '0',
        greadType: '1',
        greadTwoVal: '0',
        policyProduct: "line"
      },
      
    }
  },
  components: {
    profitPolicy
  },
  mounted() {
    this.getProfitdetail()
  },
  methods: {
    async submitPolicy(params) {
      const paramsss = {
        id: params.data.id,
        type: 1,
        style: params.data.style,
        one_level: params.data.one_level,
        two_level: params.data.two_level
      }
      try {
        const { code, data, msg } = await saveProfit(paramsss)

        if( code !== 0) return this.$message.error(msg);
        this.$message.success("保存成功")
      }
      catch(err) {
        console.log(err)
      }
    },
    async getProfitdetail() {
      const params = {
        type: "1"
      }
      try{
        const { code, data, msg } = await lineBaseProfit(params)
        if( code !== 0) return this.$message.error(msg);
        
        this.initData.policy_id = data.id
        this.initData.policy_name = data.name
        this.initData.greadType = data.style
        this.initData.greadOneVal = data.one_level
        this.initData.greadTwoVal = data.two_level
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>