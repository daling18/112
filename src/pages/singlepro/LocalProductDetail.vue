<template>
<!-- application\index\view\dev\src\components\self-support\LocalProductDetail.vue -->
  <div class="wrapper">
    <div class="detail-section">
      <div class="detail-tit">基础信息</div>
      <div class="detail-item">
        <div class="detail-lab">商品类型</div>
        <div class="detail-con">{{ detail.type_name || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">商品名称</div>
        <div class="detail-con">{{ detail.name || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">商品货号</div>
        <div class="detail-con">{{ detail.art_no || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">商品所在城市</div>
        <div class="detail-con">{{ detail.city_name || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">商品图片</div>
        <div class="detail-con" v-if="detail.pic_lists && detail.pic_lists.length === 0">--</div>
        <div class="detail-con" v-else>
          <div class="detail-thumb" v-for="(item, index) in detail.pic_lists" :key="index">
            <div v-if="item.is_default === 2" class="upload-index">首</div>
            <div v-if="item.is_default === 2" class="upload-index-bg"></div>
            <img :src="item.sub_pic_url" >
            <a :href="item.sub_pic_url" class="preview-btn" target="_blank">
              <i class="el-icon-view" />
            </a>
            <a download :href="item.sub_pic_url">下载</a>
          </div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">商品详情</div>
        <div class="detail-con" v-if="detail.detail && detail.detail.length === 0">--</div>
        <div class="detail-con" id="detail-imgbox" v-else v-html="detail.detail"></div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">服务保证</div>
        <!-- <div class="detail-con" v-for="(item, index) in detail.service_guarantees" :key="index">{{ item || '--' }}</div> -->
        <div class="detail-ensure" >
          <div v-for="(item, index) in detail.service_guarantees" :key="index">
            {{ item || '--' }}
          </div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">商品关键词</div>
        <div class="detail-con">{{ detail.keys || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">商品备注</div>
        <div class="detail-con">{{ detail.remark || '--' }}</div>
      </div>
      <div class="detail-tit">商品报价</div>
      <el-table
        :data="detail.price_lists"
        border
        style="width: 100%">
        <el-table-column
          prop="size_name"
          label="规格"
          width="150" 
          align='center'>
        </el-table-column>
        <el-table-column
          prop='cost_price'
          label='成本价'
          min-width='100'
          align='center'>
        </el-table-column>
        <el-table-column
          prop='peer_price'
          label='结算价'
          min-width='100'
          align='center'>
        </el-table-column>
        <el-table-column
          prop='out_price'
          label='销售价'
          min-width='100'
          align='center'>
        </el-table-column>
        <el-table-column
          prop='tagging_price'
          label='挂牌价'
          min-width='100'
          align='center'>
        </el-table-column>
        <el-table-column
          prop='stock_nums'
          label='商品库存'
          min-width='100'
          align='center'>
        </el-table-column>
        <el-table-column
          prop='default_freight'
          label='邮费'
          min-width='100'
          align='center'>
        </el-table-column>
        <el-table-column
          prop='sku_no'
          label='SKU编号'
          min-width='100'
          align='center'>
        </el-table-column>
        <el-table-column
          label='是否限购'
          min-width='100'
          align='center'>
          <template slot-scope="scope">
            <div class="xigou-wrap clearfix">
              <el-checkbox
                disabled
                class="box"
                :true-label='2'
                :false-label='1'
                v-model="scope.row.is_limit_buy">
              </el-checkbox>
              <el-input
                readonly
                v-model="scope.row.limit_buy_nums">
              </el-input>
            </div>
          </template>
        </el-table-column>
      </el-table> 
    </div>
  </div>
</template>
<script>
import {productDetail} from 'src/api/self_support.localproduct'
export default {
  data () {
    return {
      id: this.$route.query.id,
      detail: {}
    }
  },
  methods: {
    productDetail () {
      let params = {
        data: {
          id: this.id
        }
      }
      productDetail({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.detail = result.data
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
            window.history.go(-1)
          }
        },
        showLoading: true
      })
    }
  },
  mounted() {
    this.productDetail()
  },
  updated () {
      // document.getElementById('caseContent') 包裹层
      // 目标图片：width：100%
      let obj = document.getElementById('detail-imgbox');
      let imgs = obj.getElementsByTagName('img');

      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.maxWidth = '1000px';
        imgs[i].style.verticalAlign = 'middle';
        imgs[i].style.height = 'auto';
      }
  },
}
</script>
<style lang="less" scoped>
.wrapper{
  padding: 0 15px 15px;
  background: #fff;
}
.detail-section{
  padding: 0;
  overflow: hidden;
  .detail-tit{
    border-left: 5px solid #b10c79;
    line-height: 1;
    margin: 35px 0 25px;
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
      word-break: break-word;
    }
    .detail-ensure{
      padding-left: 11px;
      display: flex;
      word-break: break-word;
      align-items: flex-start;
      &>div{
        word-break: break-word;
        margin-right: 5px;
        text-align: left;
      }
    }
  }
  .detail-thumb{
    width: 100px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    display: inline-block;
    position: relative;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
      display: block;
      border: 1px solid #e4e4e4;
      box-sizing: border-box;
    }
    .upload-index {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      z-index: 2;
    }
    .upload-index-bg {
      position: absolute;
      top: -25px;
      left: -25px;
      width: 50px;
      height: 50px;
      line-height: 0px;
      background-color: #ff9900;
      transform: rotate(45deg);
      transform-origin: center center;
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
.xigou-wrap {
  position: relative;
  padding: 0 0 0 25px;
  .box {
    position: absolute;
    top: 5px;
    left: 0px;
  }
}
</style>
