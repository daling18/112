<template>
  <div class="wrapper">
    <div class="wrapper-detail" v-if="detail">
      <div class="detail-left">
        <a :href="detail.middle_url" target="_blank">
          <img :src="detail.middle_url" alt="">
        </a>
      </div>
      <div class="detail-right">
        <p>基本信息</p>
        <p>ID：{{ detail.res_id }}</p>
        <p v-show="detail.asset_family === 'creative'">标题：{{ detail.title }}</p>
        <p>备注：{{ detail.caption }}</p>
        <p>署名：{{ detail.credit_line }}</p>
        <p>授权方式：{{ detail.license_type }}</p>
        <p>原图规格：{{ detail.width }} x {{ detail.height }} px ({{ detail.dpi }}dpi)</p>
        <p>存储大小：{{ Math.round(detail.origen_pic_byte / 1048576 *100 ) / 100 }} MB - {{ detail.asset_format }}</p>
        <p>构图方式：{{ detail.orientation }}</p>
        <p>上线时间：{{ detail.online_time }}</p>
        <p>第三方权利说明：{{ detail.copyright }}</p>
        <p>关键字：{{ detail.keywords }}</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getVcgImagesDetail } from 'src/api/photoalbum'
import { promise_getVcgImageInfo } from 'src/api/promise_api'
export default{
  data () {
    return {
      detail: null
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const params = {
        data:{
          ids: this.$route.query.id
        }
      }
      const data = await promise_getVcgImageInfo(params)
      if (data.data.code == 0) {
        this.detail = data.data.data[0].images_data
      }
      console.log(this.detail)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  padding: 10px;
  box-sizing: border-box;
  .wrapper-detail{
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    .detail-left{
      flex-grow: 1;
      text-align: center;
      img{
        max-width: 500px;
        max-height: 500px;
      }
    }
    .detail-right{
      width: 430px;
      box-sizing: border-box;
      display: ;
      padding-left: 15px;
      color: #606266;
      p:first-child{
        color: #303133;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
