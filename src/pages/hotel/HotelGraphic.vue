<style lang="stylus" scoped>
    img 
      width 100px
      height 100px
.graphic-detail
  background #fff
  padding 20px
  .title
    font-size 16px
    font-weight 600
    margin 20px 0
    display inline-block
  .desc
    color #979797
    margin-left 8px
  .graphic-editor
    width 80%
    min-height 400px
.footer
  background #ffffff
  padding 25px
  text-align center
</style>
<template lang="pug">
  .hotel-graphic
    .system-tab
      ul.tab-box
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/hotelEdit', query:{hotel_id:hotelId}}") 基础信息
        router-link(tag="li", v-else to="") 基础信息
        router-link(tag="li", v-if="!isAdd", :to="{path:'HotelFacilities', query:{hotel_id:hotelId}}") 酒店设施
        router-link(tag="li", v-else, to="") 酒店设施
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/HotelDetail', query:{hotel_id:hotelId}}") 酒店详情
        router-link(tag="li", v-else, to="") 酒店详情
        router-link(class="on", tag="li", to="") 图文详情
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/Hotelpic', query:{hotel_id:hotelId}}") 酒店图片
        router-link(tag="li", v-else, to="") 酒店图片
    .graphic-detail 
      span(class="title") 图文详情
      span(class="desc") (请输入一个产品简介去描述你的产品)
      vue-editor(class="graphic-editor", v-model="hotel_intro")
    .footer
      el-button(@click="backHotelList") 取消
      el-button(type="primary", v-if="!isAdd", @click="_save") 保存
      el-button(type="primary", v-else, @click="_save") 下一步
</template>
<script>
import VueEditor from 'src/plugins/editor/vue-html5-editor.vue';
import { promise_addHotelLauge, promise_getHotelLauge } from 'src/api/promise_api'


export default {
  data() {
    return {
      hotelId: "",
      hotel_intro: "",
      isAdd: false
    }
  },
  components: { VueEditor },
  mounted() {
    this.hotelId = this.$route.query.hotel_id;
    this.isAdd = this.$route.query.isAdd
    !this.isAdd && this._getHotelInfo(this.hotelId)
  },
  methods: {
    async _getHotelInfo(hotelid) {
      try {
        const { data } = await promise_getHotelLauge({data: {product_id: hotelid}})

        if(data.code !== 0) return this.$message.error(data.msg)
        this.hotel_intro = !data.data.intro ? "" : data.data.intro
      } catch(err) {
        console.log(err)
      }
    },
    async _save() {
      const params = {
          data: {
            product_id: this.hotelId,
            intro: this.hotel_intro
          }
      }
      try {
        if(this.hotel_intro) {
          const { data } = await promise_addHotelLauge(params)

          if(data.code !==0 ) return this.$message.error(data.msg)
          this.$message({
            message: "保存成功",
            type: 'success'
          })
        }
        this.isAdd ? this.$router.push(`/hotel/Hotelpic?hotel_id=${this.hotelId}&isAdd=1`) :this.$router.push(`/hotel/Hotelpic?hotel_id=${this.hotelId}`)
      }
      catch(err) {
        console.log(err)
      }
      },
    backHotelList() {
      this.$router.push('/hotel/hotelList')
    }
  }
}
</script>
