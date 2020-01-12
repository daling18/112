<style lang="stylus" scoped>
.profit-setting
  .content
    display flex
    justify-content center
    flex-wrap wrap
    .select
      width 100%
      margin-bottom 20px
      text-align center
    .set-policy
      width 100%
      text-align center
      .gread
        font-weight 600
        .el-input
          width 120px
          margin-left 10px
        .el-select
          width 70px
      .desc
        font-size 12px
        margin 10px
    .tips
      width 70%
      margin 20px 0
      font-size 12px
      display flex
      justify-content center
      .zhu
        width 258px
    .foot
      margin-top 20px
      text-align center
      width 100%
      .long-btn
        width 150px 
</style>
<template lang="pug">
  .profit-setting
    el-dialog(
      title="分润政策设置",
      :visible.sync="policyDialogVisible",
      width="28%",
      :show-close="false"
      :close-on-click-modal="false"
     )
      .content(v-if="!confirmVisible")
        .select
          el-select(class="elselect" v-model="profitData.policyType" placeholder="请选择分润政策", clearable, @change="selectPolicyType")
            el-option(v-for="(item, index) in policyTypeList", :key="index", :label="item.label", :value="item.value")
        .set-policy(v-if="profitData.policyType === TYPES.customizeProfitPolicy || profitData.policyType === TYPES.baseProfitPolicy")
          .gread(v-if="profitData.policyType === TYPES.baseProfitPolicy")
            span 一级拉新分润设置：
            span {{profitData.base_greadOneVal}}
            span(v-if="IsToSetPolicy") 0
            span(v-else-if="!IsToSetPolicy && greadType === TYPES.rate") %
            span(v-else) 元
          .gread(v-if="profitData.policyType === TYPES.customizeProfitPolicy")
            el-input(v-model="profitData.greadOneVal", placeholder="设置分润")
            el-select(v-model="greadType")
              el-option(
                v-for="item in greadTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.company") 
            span(v-if="profitData.policyProduct !== 'line'") 一级分润价格 = 批发差价*设置比例%
            span(v-if="profitData.policyProduct === 'line'") 一级分润价格 = 批零差价*设置比例%
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.department") 一级分润价格 = 批零差价*设置比例%
          .desc(v-if="greadType === TYPES.amount") 一级分润价格 = 设置价格
          .gread(v-if="profitData.policyType === TYPES.baseProfitPolicy") 
            span 二级拉新分润设置：
            span {{profitData.base_greadTwoVal}}
            span(v-if="IsToSetPolicy") 0
            span(v-else-if="!IsToSetPolicy && greadType === TYPES.rate") %
            span(v-else) 元
          .gread(v-if="profitData.policyType === TYPES.customizeProfitPolicy")
            el-input(v-model="profitData.greadTwoVal", placeholder="设置分润")
            el-select(v-model="greadType")
              el-option(
                v-for="item in greadTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.company") 
            span(v-if="profitData.policyProduct !== 'line'") 二级分润价格 = 批发差价*设置比例%
            span(v-if="profitData.policyProduct === 'line'") 二级分润价格 = 批零差价*设置比例%
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.department") 二级分润价格 = 批零差价*设置比例%
          .desc(v-if="greadType === TYPES.amount") 二级分润价格 = 设置价格
        .tips
          div
            div 提示:
            div(v-if="orgType === TYPES.company") 
              span(v-if="profitData.policyProduct !== 'line'") 【批发差价】批发差价 = 结算价 - 成本价
              span(v-if="profitData.policyProduct == 'line'") 【批零差价】批零差价 = 销售价 - 结算价
            div(v-else) 【批零差价】批零差价 = 销售价 - 结算价
            div 【结算价】在供应商上架产品时提供的结算价格
            div(v-if="orgType === TYPES.company") 
              span(v-if="profitData.policyProduct !== 'line'") 【成本价】供应商提供的成本价格。
              span(v-if="profitData.policyProduct === 'line'") 【销售价】供应商上架产品时设置的销售价格。
            div(v-if="orgType === TYPES.department") 【销售价】供应商上架产品时设置的销售价格。
            div(v-if="profitData.policyType !== TYPES.noProfitPolicy", class="zhu") 注:
              div(v-if="greadType === TYPES.rate") 如设置的一级分润比例与二级分润比例不可大于100%，否则将不可设置。输入的数值为整数且大于0。
              div(v-else)
                div(v-if="orgType === TYPES.company") 
                  span(v-if="profitData.policyProduct !== 'line'") 如设置的一级分润金额与二级分润金额之和小于批发差价，则设置的政策启用，否则政策不启用
                  span(v-if="profitData.policyProduct === 'line'") 如设置的一级分润金额与二级分润金额之和小于批零差价，则设置的政策启用，否则政策不启用
                div(v-if="orgType === TYPES.department") 如设置的一级分润金额与二级分润金额之和小于批零差价，则设置的政策启用，否则政策不启用
        .foot(v-if="!IsToSetPolicy")
          el-button(type="primary", @click="concelProfit") 取消
          el-button(type="primary", @click="savePolicy") 保存
        .foot(v-if="IsToSetPolicy && profitData.policyType === TYPES.baseProfitPolicy")
          el-button(class="long-btn", type="primary", @click="toSettinPolicy") 去设置基础分润政策
      //- .content(v-if="confirmVisible")
      //-   div
      //-     p 如果酒店部分套餐已设置分润政策，设置后将覆盖之前数据，是否继续？
      //-     p （分润政策生效时间约1分钟至5分钟，如未更新政策需耐心等待。）
      //-   .foot
      //-     el-button(type="primary", @click="concelProfit") 取消
      //-     el-button(type="primary", @click="_saveConfirmPolicy") 保存
    el-dialog(
      title="提示",
      :visible.sync="confirmVisible",
      width="28%",
     )
      .content
        div
          p 如果酒店部分套餐已设置分润政策，设置后将覆盖之前数据，是否继续？
          p （分润政策生效时间约1分钟至5分钟，如未更新政策需耐心等待。）
        .foot
          el-button(type="primary", @click="confirmVisible = false") 取消
          el-button(type="primary", @click="_saveConfirmPolicy") 保存

</template>
<script>  
export default {
  props: {
    profitData: {
      type: Object
    },
    greadnum: {
      type: String,
      default: "1"
    },
    IsToSetPolicy: {
      type: Boolean,
      default: false,
    },
    policyDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    greadnum(val) {
      this.greadType = val

    },
    greadType(val) {
      this.$emit("getBaseProfit", val)
    }
  },
  data() {
    return {
      greadType: "1",
      orgType: "",
      TYPES: {
        company: '3',//分公司,
        department: '5',//营业部
        noProfitPolicy: '1',//暂不设置政策
        customizeProfitPolicy: '2', //自定义分润政策
        baseProfitPolicy: '3', //基础分润政策
        amount: '2', //金额
        rate: '1', //百分比
        allEnabled_policy: 1, //全部启用政策
        partEnabled_policy: 2, //部分启用政策
        noEnabled_policy: 3, //未启用政策
      },
      policyTypeList: [
        {
          value: '1',
          label: '暂不设置政策'
        },
         {
          value: '3',
          label: '基础分润政策'
        },
         {
          value: '2',
          label: '自定义分润政策'
        }
      ],
      confirmVisible: false,
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
      policyList: [
        {
         value: "",
         label: '全部'
        },
        {
         value: "0",
         label: '无政策'
        },
        {
          value: "1",
          label: "政策已启用"
        },
         {
          value: "2",
          label: '政策部分启用'
        },
         {
          value: "3",
          label: '政策未启用'
        }
      ],

    }
  },
  mounted() {
     this.orgType = localStorage.getItem('orgtype');
     console.log(this.orgType,'orgType')
  },
  methods: {
    concelProfit() {
      this.$emit("conceldialog", this.policyDialogVisible)
    },
    selectPolicyType() {
      if(this.profitData.policyType == '3') {
        this.$emit("getBaseProfit", "base")
      } else {
        this.$emit("getBaseProfit", "nobase")
      }
    },
    async _saveConfirmPolicy() {
      this.confirmVisible = false
      // this.$emit("conceldialog", this.policyDialogVisible)
      let one_level = null
      let two_level = null
      if(this.profitData.policyType === '1') {
        one_level = '1'
        two_level = '1'
      }
      if(this.profitData.policyType === '2') {
      one_level = this.profitData.greadOneVal
      two_level = this.profitData.greadTwoVal
      }
      if(this.profitData.policyType === '3') {
        one_level = this.profitData.base_greadOneVal
        two_level = this.profitData.base_greadTwoVal
      }
       const params = {
        //  data: {
          policy_id: this.profitData.policyType,
          product_id: this.profitData.isAllPolicy,
          room_id: "",
          package_id: "",
          style: this.greadType,
          one_level: one_level,
          two_level: two_level,
          style2: this.greadType
        // }
      }
      this.$emit("submitProfit", params)
    },
     savePolicy() {
      if(this.profitData.policyType === '2') {
        if(!this.profitData.greadOneVal && !this.profitData.greadTwoVal) return this.$emit("conceldialog", this.policyDialogVisible)
        if(!this.profitData.greadOneVal || !this.profitData.greadTwoVal) return this.$message.warning('分润设置不能为空')
        
        if(this.greadType === '1') {
          const regu = /^\d*$/
          if(!regu.test(this.profitData.greadOneVal) || !regu.test(this.profitData.greadTwoVal)) return this.$message.warning("输入数据有误，请重新输入")
          if ((this.profitData.greadOneVal * 1 + this.profitData.greadTwoVal * 1) > 100 ) {
            return this.$message.warning('一级分润比例与二级分润比例不可大于100%')
          } 
        } else if(this.greadType === '2') {
          const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/    //正数（包括小数）
          if(!reg.test(this.profitData.greadOneVal) || !reg.test(this.profitData.greadTwoVal)) return this.$message.warning("输入数据有误，请重新输入")
        }
      }
      this.$emit("conceldialog", this.policyDialogVisible)
      this.confirmVisible = true
    },
    // changeGreadType(val) {
    //   console.log(val,'son-val')
    //   this.$emit("update:greadType", val)
    // },
    toSettinPolicy() {
      this.$emit("toSettinPolicy", "")
    },
  }
}
</script>