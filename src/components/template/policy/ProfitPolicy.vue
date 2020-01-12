<style lang="stylus" scoped>
.profit-setting
  background #ffffff
  padding 20px
  .content
    padding 30px
    .gread
      padding-bottom 20px
      .el-input
        width 120px
        margin-left 10px
      .el-select
        width 70px
      .desc
        margin-top 10px
        margin-left 40px
        color #999
    .tips
      color #999
      margin-bottom 30px
    .foot
      margin-left 100px
</style>

<template lang="pug">
  .profit-setting
    .content
      .gread
        span 一级拉新分润设置:
        span
          el-input(v-model="initData.greadOneVal", placeholder="设置分润")
          el-select(v-model="initData.greadType")
            el-option(
              v-for="item in greadTypeOptions",
              :key="item.value",
              :label="item.label",
              :value="item.value")
          .desc(v-if="initData.greadType === TYPES.rate && orgType === TYPES.company") 
            span(v-if="initData.policyProduct !== 'line'") 一级分润价格 = 批发差价*设置比例%
            span(v-if="initData.policyProduct === 'line'") 一级分润价格 = 批零差价*设置比例%
          .desc(v-if="initData.greadType === TYPES.rate && orgType === TYPES.department") 一级分润价格 = 批零差价*设置比例%
          .desc(v-if="initData.greadType === TYPES.amount") 一级分润价格 = 设置价格
      .gread
        span 二级拉新分润设置:
        span
          el-input(v-model="initData.greadTwoVal", placeholder="设置分润")
          el-select(v-model="initData.greadType")
            el-option(
              v-for="item in greadTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value")
          .desc(v-if="initData.greadType === TYPES.rate && orgType === TYPES.company") 
            span(v-if="initData.policyProduct !== 'line'") 二级分润价格 = 批发差价*设置比例%
            span(v-if="initData.policyProduct === 'line'") 二级分润价格 = 批零差价*设置比例%
          .desc(v-if="initData.greadType === TYPES.rate && orgType === TYPES.department") 二级分润价格 = 批零差价*设置比例%
          .desc(v-if="initData.greadType === TYPES.amount") 二级分润价格 = 设置价格
      .tips
        div 提示:
        div(v-if="orgType === TYPES.company") 
          span(v-if="initData.policyProduct !== 'line'") 【批发差价】批发差价 = 结算价 - 成本价
          span(v-if="initData.policyProduct === 'line'") 【批零差价】批零差价 = 销售价 - 结算价
        div(v-if="orgType === TYPES.department") 【批零差价】批零差价 = 销售价 - 结算价
        div 【结算价】在供应商上架产品时提供的结算价格
        div(v-if="orgType === TYPES.company") 
          span(v-if="initData.policyProduct !== 'line'") 【成本价】供应商提供的成本价格。
          span(v-if="initData.policyProduct === 'line'") 【销售价】供应商上架产品时设置的销售价格。
        div(v-if="orgType === TYPES.department") 【销售价】供应商上架产品时设置的销售价格。
        div 注:
          div(v-if="initData.greadType === TYPES.rate") 如设置的一级分润比例与二级分润比例不可大于100%，否则将不可设置。输入的数值为整数且大于0。
          div(v-else)
            div 如设置的一级分润金额与二级分润金额之和小于批零差价，则设置的政策启用，否则政策不启用
      .foot
        //- el-button(type="primary") 取消
        el-button(type="primary", @click="save") 保存
</template>

<script>
import { numberReg, positiveNumReg } from "src/utils/regular";
export default {
  props: {
    initData: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      orgType: '',
      TYPES: {
        rate: '1',
        amount: '2',
        company: '3',//分公司,
        department: '5',//营业部
      },
      greadTypeOptions: [
        {
          value: '1',
          label: '%'
        },
        {
          value: '2',
          label: '元'
        },
      ],
    }
  },
  mounted() {
    this.orgType = localStorage.getItem('orgtype');
    console.log(this.initData,'inidata')
  },
  methods:{
    save() {
      if(!this.initData.greadOneVal && !this.initData.greadTwoVal) return 
      if(!this.initData.greadOneVal || !this.initData.greadTwoVal) return this.$message.warning('分润设置不能为空')
      
      if(this.initData.greadType === this.TYPES.rate) {
        if(!numberReg.test(this.initData.greadOneVal) || !numberReg.test(this.initData.greadTwoVal)) return this.$message.warning("输入数据有误，请重新输入")
        if ((this.initData.greadOneVal * 1 + this.initData.greadTwoVal * 1) > 100 ) {
          return this.$message.warning('一级分润比例与二级分润比例不可大于100%')
        }
      } else if(this.initData.greadType === this.TYPES.amount) {
        
        if(!positiveNumReg.test(this.initData.greadOneVal) || !positiveNumReg.test(this.initData.greadTwoVal)) return this.$message.warning("输入数据有误，请重新输入")
      }
      
      const params = {
         data: {
           id: this.initData.policy_id || "",
           name: this.initData.policy_name || "基础分润政策",
           style: this.initData.greadType,
           style2: this.initData.greadType,
           one_level: this.initData.greadOneVal,
           two_level: this.initData.greadTwoVal,
         }
      }
      this.$emit('params', params)
    }
  }
}
</script>

