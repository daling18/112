<style lang="stylus" scoped>
.el-dialog
  .span
    border-top 1px solid #eee
    padding-top 10px
  .dialog-content
    border-top 1px solid #4c4c4c
    padding 10px
    min-height 200px
    max-height 400px
    overflow hidden
    overflow-y scroll
    .dialog-recommend
      display flex
      flex-wrap wrap
      padding-bottom 50px
      .item-recommend
        width 42%
    .span
      padding 15px 0
      font-size 14px
      color #333
      font-weight 600
    .foot
      text-align center
      padding-top 20px
      position absolute
      bottom 20px
      width 90%
      z-index: 100;
      background: #fff;
      .el-button
        margin-right  55px
.hotelFacilities
  .facilitites
    background #ffffff
    padding 20px
    .title
      color #333
      font-weight 600
      margin 5px 0
    .facility-type
      margin-bottom 15px
      .item-checkobx
        width 20%
        margin-bottom 10px
    .hotel-recommend
      .recommend
        .item-recommend
          margin-right 15px
        .change-text
          color #b10c79
    .selectAll
      margin-bottom 10px
      .change-all
        width 100px
        height 30px
        line-height 30px
        background #b10c79
        color #fff
        text-align center
        border-radius 4px
        left -100px 
        position relative
      .btn  
        display inline-block
        width 100px
        height 30px
        line-height 30px
        color #fff
        background #b10c79
        position relative
        z-index 100
        left 0px
        pointer-events none
        text-align center
        border-radius 4px
    .btns
      margin 50px 0 20px 0
      display flex
      justify-content center
    
</style>
<template lang="pug">
  .hotelFacilities
    .system-tab
      ul.tab-box
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/hotelEdit', query:{hotel_id:hotelId}}") 基础信息
        router-link(tag="li", v-else to="") 基础信息
        router-link(class="on", tag="li", to="") 酒店设施
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/HotelDetail', query:{hotel_id:hotelId}}") 酒店详情
        router-link(tag="li", v-else, to="") 酒店详情
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/HotelGraphic', query:{hotel_id:hotelId}}") 图文详情
        router-link(tag="li", v-else, to="") 图文详情
        router-link(tag="li", v-if="!isAdd", :to="{path:'/hotel/Hotelpic', query:{hotel_id:hotelId}}") 酒店图片
        router-link(tag="li", v-else, to="") 酒店图片
    .facilitites
      .selectAll
        span(class="btn") 全选
        el-checkbox(class="change-all", v-model="checkAll", @change="handleCheckAllChange") 全选
      .facility-type(v-for="(item,index) in facilitites", :key="index")
        .title(v-if="item.facilities && item.facilities.length") {{item.type}}
        el-checkbox-group(v-model="checkedFacilities", @change="handleChecked")
          el-checkbox(class="item-checkobx", v-for="tm in item.facilities", v-model="tm.checked", :label="tm.id", :key="tm.id") {{tm.name}}
      .hotel-recommend
        .title 酒店设施推荐
        .recommend 
          el-tag(class="item-recommend", type="gray", closable, v-for="(item,index) in recommendedTagList", :key="item.id", @close="closeTag(item,index)") {{item.name}}
          a(href="javascript:;", class="change-text", @click="changeRecommend") 点击选择
      .btns
        el-button(@click="backList") 取消
        el-button(type="primary",v-if="isAdd",  @click="_save") 下一步
        el-button(type="primary", v-else, @click="_save") 保存
    el-dialog(title="酒店设施推荐", center, :visible.sync="dialogTableVisible")
      .span 设施推荐(只能选取3个条件)
      .dialog-content
        el-checkbox-group(class="dialog-recommend", v-model="checkedRecommend", :max="3",  @change="changeRecommendChecked")
          el-checkbox(class="item-recommend", v-for="itme in recommendList", :label="itme.id", :key="itme.id") {{itme.name}}
        .foot
          el-button(@click="cancelDialog")   取消
          el-button(type="primary", @click="recommendTag") 确定
</template>
<script>
import { promise_hotelFacilities, promise_saveFacilities } from 'src/api/promise_api'

export default {
  data() {
    return {
      hotelId: "",
      checkedFacilities: [],
      isIndeterminate: true,
      checkAll: false,
      facilitites: [],
      facilititesAll: [],
      recommendedTagList: [],
      recommendList: [],
      dialogTableVisible: false,
      checkedRecommend: [],
      isAdd: false,
      facilities_ids: [],
    }
  },
  mounted() {
    this.hotelId = this.$route.query.hotel_id;
    this.isAdd = this.$route.query.isAdd || ''
    this._getFacilities(this.hotelId);
  },
  methods: {
    async _save() {

      const params = {
        data: {
          facilities_ids: this.facilities_ids,
          rec_facilities_ids: this.checkedRecommend,
          product_id: this.hotelId
        }
      }
      try {   
        const { data } = await promise_saveFacilities(params)

        if(data.code !== 0) return this.$message.error(data.msg)
        this.$message({
          message: "保存成功",
          type: "success"
        })
        if(this.isAdd) {
          this.$router.push(`/hotel/HotelDetail?hotel_id=${this.hotelId}&isAdd=1`)
        }       
      } catch(err) {
        console.log(err)
      }
    },
    async _getFacilities(hotel_id) {
      try {
        const { data } = await promise_hotelFacilities({data: {product_id: this.hotelId}}, true)

        if(data.code !== 0) return this.$message.error(data.msg)
        this.facilitites  = data.data.faciInfo
        this.checkedFacilities = this.facilities_ids = data.data.facilities_id
        this.recommendedTagList = this.recommendList = data.data.Refacilities
        
        data.data.Refacilities.forEach(item => {
          this.checkedRecommend.push(item.id)
        })
        this.facilitites.forEach(item => {
          item.facilities.forEach(it => {
            it.checked = false
            this.facilititesAll.push(it.id)
            this.checkedFacilities.some(id => {
              if(id === it.id) {
                it.checked = true
              } 
            })
          })
        })
      }
      catch(err) {
        console.log(err)
      }
    },
    backList() {
      this.$router.push('/hotel/hotelList')
    },
    cancelDialog() {
      let list = []
      this.recommendedTagList.forEach(item => {
        list.push(item.id)
      })
      this.checkedRecommend = list

      this.dialogTableVisible = false;
    },
    recommendTag() {
      this.recommendedTagList = []
      this.checkedRecommend.forEach(item => {
        this.recommendList.some(tag => {
          if(item === tag.id) this.recommendedTagList.push(tag)
        })
      })
      this.dialogTableVisible = false;
    },
    changeRecommendChecked(value) {
      // console.log('recommendcheckedTag',value)
    },
    closeTag(tag,index) {
      this.recommendedTagList.splice(index, 1)
      const delIndex = null
      this.checkedRecommend.forEach((item,index) => {
        item === tag.id ? this.checkedRecommend.splice(index,1) : ""
      })
      return
    },
    changeRecommend() {
     if(!this.checkedFacilities.length) return this.$message.warning("请先选择酒店设置")
      this.recommendList = []
      let tagList = []
      this.facilitites.forEach(item => {
        item.facilities.some(tmp => {
          tagList.push(tmp)
        })
      })
      
      if(this.checkedFacilities.length === this.facilititesAll.length) {
        this.recommendList = tagList
      } else {
        this.checkedFacilities.forEach(item => {
         this.recommendList.push(tagList.filter(tmp => item == tmp.id)[0])
        })
      }
      this.dialogTableVisible = true;
    },
    handleCheckAllChange(val) {
      this.checkedFacilities = val  ? this.facilititesAll :[];
      if(!val) {
        this.recommendedTagList = [];
        this.checkedRecommend = [];
      }
      this.facilities_ids = this.checkedFacilities
      this.$forceUpdate()
      this.isIndeterminate = false;
    },
    handleChecked(value) {
      let taglist
      this.recommendedTagList.forEach((item,index) => {
        taglist = value.includes(item.id)
        if(!taglist) {
          this.recommendedTagList.splice(index, 1)
          this.checkedRecommend = this.recommendedTagList
          let taglist = []
          this.recommendedTagList.forEach(item => {
            taglist.push(item.id)
          }) 
          this.checkedRecommend = taglist
        }
      })
      this.facilities_ids = value
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.facilititesAll.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.facilitites.length;
    },
  }
}
</script>


