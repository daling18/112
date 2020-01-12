<style lang="stylus" scoped>
.el-textarea
    width 400px
.el-form-item
  .el-form-item__label
    line-height 20px
.hotelDetail
  .info
    padding 20px
    background #ffffff
    
</style>
<template lang="pug">
  .hotelDetail
    .system-tab
      ul.tab-box
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/hotelEdit', query:{hotel_id:hotelId}}") 基础信息
        router-link(tag="li", v-else, to="") 基础信息
        router-link(tag="li", v-if="!isAdd", :to="{path:'HotelFacilities', query:{hotel_id:hotelId}}") 酒店设施
        router-link(tag="li", v-else, to="") 酒店设施
        router-link(class="on", tag="li", to="") 酒店详情
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/HotelGraphic', query:{hotel_id:hotelId}}") 图文详情
        router-link(tag="li", v-else, to="") 图文详情
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/Hotelpic', query:{hotel_id:hotelId}}") 酒店图片
        router-link(tag="li", v-else, to="") 酒店图片
    .info
      el-form(ref="hotelDetail", :model="formData", :rules="rules", label-width="100px")
        .title 酒店政策
        el-form-item(label="入住时间", prop="check_in_time", label-width="110px")
          el-time-select(v-model="formData.check_in_time", placeholder="如：14:00以后", :picker-options="{start: '00:00',step: '00:30',end: '23:30'}")
        el-form-item(label="离店时间", prop="check_out_time", label-width="110px")
          el-time-select(v-model="formData.check_out_time", placeholder="如：12:00以前", :picker-options="{start: '00:00',step: '00:30',end: '23:30'}")
        el-form-item(label="酒店提示", label-width="110px")
          el-input(type="textarea", :rows="2", style="width:400", :maxlength="100", placeholder="如：目前北京全程禁烟，酒店均为无烟房。", v-model="formData.need_to_know", @input="changeTips")
          .textLong {{tipsLength}}/{{maxText}}
        el-form-item(label="儿童及加床政策", label-width="110px")
          el-input(type="textarea", :rows="2", placeholder="如：不接受18岁以下客人在无监护人陪同的情况下入住。", maxlength="100", v-model="formData.child_policy", @input="changeChildPolicy")
          .textLong {{childPolicyLength}}/{{maxText}}
        el-form-item(label="宠物", label-width="110px")
          el-input(type="textarea", :rows="2", placeholder="如：不可携带宠物", maxlength="100", v-model="formData.pet_policy", @input="changePetPolicy")
          .textLong {{petPolicyLength}}/{{maxText}}
        el-form-item(label="酒店前台可用的支付方式", label-width="110px", class="label-line-height")
          el-input(type="textarea", :rows="2", placeholder="如：国内发行银联卡,万事达（Master）", maxlength="100", v-model="formData.payment_policy", @input="changePaymentPolicy")
          .textLong {{paymentPolicyLength}}/{{maxText}}
        el-form-item(label="酒店特色", label-width="110px")
          el-input(type="textarea", :rows="2", placeholder="如：·酒店位于市中心，距天安门广场咫尺之遥，毗邻西单，前门、金融街三大商业区，", maxlength="100", v-model="formData.bright_spot", @input="changeBrightSpot")
          .textLong {{brightSpotLength}}/{{maxText}}
        el-form-item
          el-button(@click="backList") 取消
          el-button(type="primary", v-if="isAdd", @click="_saveDetails") 下一步
          el-button(type="primary", v-else, @click="_saveDetails") 保存
        
</template>
<script>
import { promise_gethotelDetailList, promise_addHotelDetail, promise_editHotelDetail } from 'src/api/promise_api'


export default {
  data() {
    return {
      hotelId: "",
      formData:{
        check_in_time: "",
        check_out_time: "",
        need_to_know: "",
        child_policy: "",
        pet_policy: "",
        payment_policy: "",
        bright_spot: ""
      },
      rules:{
        check_in_time: [
          { required: true, message: '请选择入住时间', trigger: 'blur' }
        ],
        check_out_time: [
          { required: true, message: '请选择离店时间', trigger: 'blur' }
        ]
      },
      tipsLength: 0,
      childPolicyLength: 0,
      petPolicyLength: 0,
      paymentPolicyLength: 0,
      brightSpotLength: 0,
      maxText:"100字以内",
      isAdd: false
    }
  },
  watch:{
    
  },
  mounted() {
    this.hotelId = this.$route.query.hotel_id;
    this.isAdd = this.$route.query.isAdd
    !this.isAdd && this._getHotelDetail(this.hotelId)
  },
  methods: {
    async _getHotelDetail(hotelId) {
      try {
        const { data } = await promise_gethotelDetailList({data:{product_id:hotelId}})

        if(data.code !== 0) return this.$message.error(data.msg)
        const detail = data.data[0]
        this.formData = detail
        this.tipsLength = detail.need_to_know.length
        this.childPolicyLength = detail.child_policy.length
        this.petPolicyLength = detail.pet_policy.length
        this.paymentPolicyLength = detail.payment_policy.length
        this.brightSpotLength = detail.bright_spot.length
      }
      catch(err) {
        console.log(err)
      }
    },
    async _saveDetails() {
      this.$refs.hotelDetail.validate(async valid => {
        if(valid) {
          this.formData.product_id = this.hotelId
          const params = {
            data: this.formData
          }
    
          try {
            if(this.isAdd) {
              const { data } = await promise_addHotelDetail(params)
      
              if(data.code !== 0) return this.$message.error(data.msg)
              this.$message.success("保存成功")
              this.$router.push(`/hotel/HotelGraphic?hotel_id=${this.hotelId}&isAdd=1`)
            }else{
              const { data } = await promise_editHotelDetail(params)
      
              if(data.code !== 0) return this.$message.error(data.msg)
              this.$message.success("保存成功")
            }
          } catch(err) {
            console.log(err)
          }
        } else {

        }
      })
      
    },
    backList() {
      this.$router.push('/hotel/hotelList')
    },
    changeTips(val) {
      console.log(val)
      this.tipsLength = val.length;
      console.log(val.length)
    },
    changeChildPolicy(val) {
      this.childPolicyLength = val.length;
    },
    changePetPolicy(val) {
      this.petPolicyLength = val.length;
    },
    changePaymentPolicy(val) {
      this.paymentPolicyLength = val.length;
    },
    changeBrightSpot(val) {
      this.brightSpotLength = val.length;
    }
  }
}
</script>