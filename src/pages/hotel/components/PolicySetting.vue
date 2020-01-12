<style lang="stylus" scoped>
.policy-setting
  .content
    display flex
    justify-content center
    flex-wrap wrap
    .select
      width 55%
      margin-bottom 20px
    .set-policy
      width 55%
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
      width 60%
      margin 20px 0
      font-size 12px
    .foot
      margin-top 20px
</style>

<template lang="pug">
  .policy-setting
    el-dialog(
      title="分润政策设置",
      :visible.sync="policyDialogVisible",
      width="28%",
     )
      .content
        .select
          el-select(class="elselect" v-model="policyType" placeholder="请选择分润政策", clearable, @change="_selectPolicyType")
            el-option(v-for="(item, index) in policyTypeList", :key="index", :label="item.label", :value="item.value")
        .set-policy(v-if="policyType === '2' || policyType === '3'")
          .gread(v-if="policyType === '3'")
            span 一级拉新分润设置：
            span {{greadOneVal}}
            span(v-if="IsToSetPolicy") 0
            span(v-else-if="!IsToSetPolicy && greadType === '1'") %
            span(v-else) 元
          .gread(v-if="policyType === '2'")
            el-input(v-model="greadOneVal", placeholder="设置分润")
            el-select(v-model="greadType")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          .desc(v-if="greadType === '1'") 一级分润价格 = 批零差价*设置比例%
          .desc(v-else) 一级分润价格 = 设置价格
          .gread(v-if="policyType === '3'") 
            span 二级拉新分润设置：
            span {{greadTwoVal}}
            span(v-if="IsToSetPolicy") 0
            span(v-else-if="!IsToSetPolicy && greadType === '1'") %
            span(v-else) 元
          .gread(v-if="policyType === '2'")
            el-input(v-model="greadTwoVal", placeholder="设置分润")
            el-select(v-model="greadType")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          .desc(v-if="greadType === '1'") 二级分润价格 = 批零差价*设置比例%
          .desc(v-else) 二级分润价格 = 设置价格
        .tips
          div 提示:
          div 【批零差价】批零差价 = 销售价 - 结算价
          div 【结算价】在供应商上架产品时提供的结算价格
          div 【销售价】供应商上架产品时设置的销售价格。
          div(v-if="policyType !== '1'") 注:
            //- div 如设置的一级分润比例与二级分润比例不可大于100%，否则将不可设置。
            div
              div a）如设置的一级分润金额与二级分润金额之和大于批发差价，则设置的政策不启用
              div b）如批发差价更新，批发差价小于等于一级分润金额与二级分润金额之和。则设置政策启用。
        .foot(v-if="!IsToSetPolicy")
          el-button(type="primary", @click="policyDialogVisible = false") 取消
          el-button(type="primary", @click="savePolicy") 保存
        .foot(v-if="IsToSetPolicy && policyType === '3'")
          el-button(class="long-btn", type="primary", @click="toSettinPolicy") 去设置基础分润政策 
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
import {
  promise_policySetList,
  promise_roomPackagePolicySave } from 'src/api/promise_api'
export default {
  name: "PolicySetting",
  props: {
    id:{
      type: String,
      default: null
    }
  },
  data(){
    return {
        policyType: "1",
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
        policyDialogVisible: true,
        confirmVisible: false,
        greadOneVal: "",
        greadTwoVal: "",
        greadType: "1",
        options: [
          {
            value: '1',
            label: '%'
          },
          {
            value: '2',
            label: '元'
          },
        ],
        IsToSetPolicy: false
    }
  },
  mounted() {
    this._gettingPolicy(this.id)
  },
  methods: {
    async _gettingPolicy(id) {
      this.isAllPolicy = false
      this.policyType = '1'
      this.policyDialogVisible = true
      // this.hotel_ids.push(id)
      this.hotel_id = id
      const params = {
        data: {
          package_id: "",
          room_id: "",
          product_id: id
        }
      }
      try {
        const { data: { code, data, msg } } = await promise_getroomPackagePolicyInfo(params)

        if(code !== 0) return
        this.policyType = data.policy_id + ""
      }
      catch(err) {
        console.log(err)
      }
    },
    async _saveConfirmPolicy() {
       this.confirmVisible = false
       const params = {
         data: {
          policy_id: this.policyType,
          product_id: this.isAllPolicy ? this.hotel_ids : this.hotel_id,
          room_id: "",
          package_id: "",
          style: this.greadType,
          one_level: this.greadOneVal || this.policyType === "1" && "1",
          two_level: this.greadTwoVal || this.policyType === "1" && "1",
          style2: this.greadType
        }
      }
      try {
        const { data: { code, data, msg }} = await promise_roomPackagePolicySave(params)

        if(code !== 0) return this.$message.warning(msg)
        this.$message.success("设置成功")
        this._queryHotelList()
      }
      catch(err) {
        console.log(err)
      }
    },
     async _selectPolicyType() {
      try {
        if(this.policyType == 3) {
          const { data: { code, data, msg } } = await promise_policySetList()

        console.log(data)
          if( code !== 0) return
          this.greadType = data.style
          this.greadOneVal = data.one_level
          this.greadTwoVal = data.two_level
        }

      }
      catch(err) {
        console.log(err)
      }
    },
    savePolicy() {
      this.policyDialogVisible = false
      this.confirmVisible = true
    },
    toSettinPolicy() {
      this.$router.push('/policy/profitSetting')
    },
  }
}
</script>
