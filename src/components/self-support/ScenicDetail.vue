<template>
  <div class="wrapper">
    <div class="detail-section" v-if="scenicDetail">
      <div class="detail-tit">基础信息</div>
      <div class="detail-item">
        <div class="detail-lab">景区名称</div>
        <div class="detail-con">{{ scenicDetail.title}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">景区类型</div>
        <div class="detail-con">{{ scenicDetail.type_name }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">景区标签</div>
        <div class="detail-con">
          {{ scenicDetail.tags.map(item => {
              return item.tag_name
            }).join(',')
          }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">所在城市</div>
        <div class="detail-con">{{ scenicDetail.city.whole_name || '--'}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">景区地址</div>
        <div class="detail-con">{{ scenicDetail.address }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">所处经纬度</div>
        <div class="detail-con">
          经度：{{ scenicDetail.longitude }}，
          纬度：{{ scenicDetail.latitude }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">景区评级</div>
        <div class="detail-con">
          <span v-for="(g,i) in scenicDetail.grade" :key="i">A</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">景区图片</div>
        <div class="detail-con" v-if="scenicDetail.img_path && scenicDetail.img_path.length === 0">--</div>
        <div class="detail-con" v-else>
          <div class="detail-thumb" v-for="(item, index) in scenicDetail.img_path" :key="index">
            <img :src="item" >
            <a :href="item" class="preview-btn" target="_blank">
              <i class="el-icon-view" />
            </a>
            <a download :href="item">下载</a>
          </div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">营业时间</div>
        <div class="detail-con">{{ scenicDetail.runtime }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">联系电话</div>
        <div class="detail-con">{{ scenicDetail.tel }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">一句话简介</div>
        <div class="detail-con">{{ scenicDetail.brief }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">景区介绍</div>
        <div class="detail-con" v-html="scenicDetail.introduce"></div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">景区交通</div>
        <div class="detail-con">{{ scenicDetail.traffic_guide || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">预订须知</div>
        <div class="detail-con">{{ scenicDetail.notice || '--' }}</div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { getSelfScenicDetail }from 'src/api/self_support.goodscate'

export default {
  data () {

    return {
      scenicDetail:null
    }
  },
  methods:{
    // 景区详情
    selfSupportScenicDetail(){
      
      let para = {};
      para.data = {};
      para.data.id = this.$route.query.id;

      getSelfScenicDetail({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (!code) {
            this.$set(this,'scenicDetail',data);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    }
    
  },
  mounted(){
    this.selfSupportScenicDetail();
  }
}
</script>

<style lang="scss" scoped>
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
  }
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
      border: 1px solid #e4e4e4;
      box-sizing: border-box;
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
.tab-list{
  padding-bottom: 25px;
}
.tab-item{
  padding: 12px 0;
  width: 130px;
  text-align: center;
  background: #f4f4f4;
  margin-right: 10px;
  display: inline-block;
  &.selected{
    background-color: #b10c79;
    color: #fff;
    position: relative;
    &:after{
      content: "";
      border-top: 6px solid #b10c79;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      position: absolute;
      bottom: -5px;
      left: 59px;
    }
  }
}
.tab-content{
  border: 1px solid #ccc;
  padding: 15px;
  word-break: break-word;
}
.price-item{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .price-sep{
      margin: 0 15px;
      width: 2px;
      height: 14px;
      background-color: #ccc;
    }
    .price-detail{
      margin-right: 30px;
    }
    &:after{
      margin-bottom: 0;
    }
}
.detail-content{
  line-height: 1.5;
  word-break: break-word;
}
</style>
