<template>
  <div class="wrapper">
    <div class="detail-section" v-if="tableData">
      <div class="detail-tit">酒店品牌详情</div>
      <div class="detail-item">
        <div class="detail-lab">品牌名称</div>
        <div class="detail-con">{{ tableData.brand_name }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">一句话简介</div>
        <div class="detail-con">{{ tableData.one_word_intr }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">品牌介绍</div>
        <div class="detail-con">{{ tableData.intr }}</div>
      </div>
    </div>  
  </div>
</template>

<script>
import { getbrandDetail } from 'src/api/self_support.goodscate'

export default {
  data () {
    return {
      tableData: null,
    }
  },
  methods:{
    // 获取品牌详情
    getBrandInfo() {
      let para = {};
      para.data = {};
      para.data.id = this.$route.query.id;

      getbrandDetail({
        params: para,
        success: (params) => {
          let {code, msg, data} = params.data;

          if (code == '0') {
            this.$set(this, 'tableData', data);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    
  },
  mounted(){
    this.getBrandInfo();
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  padding: 15px 15px 50px;
  background: #fff;
}
.detail-section{
  padding: 0;
  .detail-tit{
    border-left: 5px solid #b10c79;
    line-height: 1;
    margin: 20px 0;
    padding-left: 10px;
    color: #b10c79;
    font-size: 18px;
  }
  .detail-item{
    display: flex;
    align-items: flex-start;
    line-height: 1.8;
    .detail-lab{
      width: 90px;
      color: #999;
      text-align: right;
    }
    .detail-con{
      flex: 1;
      padding-left: 15px;
      word-break: break-all;
      .detail-thumb{
        width: 100px;
        margin-right: 8px;
        margin-bottom: 8px;
        text-align: center;
        display: inline-block;
        position: relative;
        img {
          width: 100px;
          height: 100px;
          display: block;
        }
        .preview-btn{
          padding: 6px;
          background-color: rgba(0,0,0,0.5);
          color: #fff;
          position: absolute;
          right: 0;
          line-height: 1;
          top: 74px;
        }
      }
    }
  }
}
</style>
