<template>
  <div class="wrapper">
    <div class="detail-section">
      <div class="detail-tit">基础信息</div>
      <div class="detail-item" v-show="info.supplier_org_name">
        <div class="detail-lab">产品来源</div>
        <div class="detail-con">{{ info.supplier_org_name || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">签证名称</div>
        <div class="detail-con">{{ info.name }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">签证类型</div>
        <div class="detail-con">{{ info.visa_type_name }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">签证国家</div>
        <div class="detail-con">{{ info.continent_name }}-{{ info.nation_name }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">送签地</div>
        <div class="detail-con">{{ info.send_city_names && info.send_city_names.join(', ') }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">最长停留</div>
        <div class="detail-con">{{ info.stay_time }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">有效期</div>
        <div class="detail-con">{{ info.valid_time }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">入境次数</div>
        <div class="detail-con">{{ info.entry_num }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">办理时长</div>
        <div class="detail-con">送签后至少{{ info.deal_day }}个工作日（以领馆签发为准）</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">提前预订天数</div>
        <div class="detail-con">{{ info.forward_day }}个工作日</div>
      </div>
      <div class="detail-item" v-show="info.success_rate">
        <div class="detail-lab">出签成功率</div>
        <div class="detail-con">{{ info.success_rate }}%</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">所属领区</div>
        <div class="detail-con">{{ info.consular_district_name }}</div>
      </div>
      <div class="detail-item" v-show="info.accept_range">
        <div class="detail-lab">受理范围</div>
        <div class="detail-con">{{ info.accept_range || '--' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">签证图片</div>
        <div class="detail-con" v-if="info.pic_url && info.pic_url.length === 0">--</div>
        <div class="detail-con" v-else>
          <div class="detail-thumb" v-for="(item, index) in info.pic_url" :key="index">
            <img :src="item.sub_pic_url" >
            <a :href="item.sub_pic_url" class="preview-btn" target="_blank">
              <i class="el-icon-view" />
            </a>
            <a download :href="item.sub_pic_url">下载</a>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-tit">签证材料</div>
      <div class="tab-list">
        <div
          :class="selectTab == key ? 'tab-item selected' : 'tab-item'"
          v-for="(key, idx) in touristTypes"
          :key="idx"
          @click="selectTab=key">
          {{ TOURIST_TYPE_MAP[key] }}
        </div>
      </div>
      <div
        class="tab-content"
        v-show="selectTab == key"
        v-for="(val, key) in info.material"
        :key="key"
        v-html="val"
      />
    </div>
    <div class="detail-section">
      <div class="detail-tit">签证报价</div>
      <div class="receive-detail">
        <div class="price-item">
          <div class="price-type">成人价格</div>
          <div class="price-sep" />
          <div class="price-detail">成本价：{{ info.adult_cost_price }}元</div>
          <div class="price-detail">结算价：{{ info.adult_peer_price }}元</div>
          <div class="price-detail">销售价：{{ info.adult_out_price }}元</div>
          <div class="price-detail">挂牌价：{{ info.adult_sticker_price }}元</div>
        </div>
        <!-- <div class="price-item">
          <div class="price-type">儿童价格</div>
          <div class="price-sep" />
          <div class="price-detail">成本价：{{ info.child_cost_price }}元</div>
          <div class="price-detail">结算价：{{ info.child_peer_price }}元</div>
          <div class="price-detail">销售价：{{ info.child_out_price }}元</div>
          <div class="price-detail">挂牌价：{{ info.child_sticker_price }}元</div>
        </div> -->
      </div>
    </div>
    <div class="detail-section" v-show="info.attention">
      <div class="detail-tit">预订须知</div>
      <div class="color-gray detail-content">{{ info.attention || '--' }}</div>
    </div>
    <div class="detail-section" v-show="info.remind">
      <div class="detail-tit">温馨提示</div>
      <div class="color-gray detail-content">{{ info.remind || '--' }}</div>
    </div>
    <div class="detail-section" v-show="Array.isArray(info.attachment) && info.attachment.length > 0">
      <div class="detail-tit">签证附件</div>
      <div class="color-gray detail-content">
        <attachment-list :list="info.attachment" />
      </div>
    </div>
  </div>
</template>

<script>
import { visaDetail }from 'src/api/selfsupport.visa'
import AttachmentList from 'src/plugins/AttachmentList.vue'

export default {
  components: {
    AttachmentList
  },
  data () {

    return {
      // VISA_TYPE_MAP: {},
      TOURIST_TYPE_MAP: {},
      // DISTRICT_LIST: {},
      // NATION_LIST: {},
      info: {},
      selectTab: '',
      touristTypes: []
      // selectContinent: {},
      // nationMap: {}
    }
  },
  mounted(){
    this.getInfo();
  },
  methods:{
    getInfo() {

      visaDetail({
        params: {data: {id: this.$route.query.id || ''}},
        success: ({data}) => {

          if (data.code == '0') {
            this.info = data.data;
            this.touristTypes = Object.keys(this.info.material);
            this.selectTab = this.touristTypes[0] || '';
            this.touristTypes.forEach(item => {
              const material = this.info.material[item];
              if(Array.isArray(material)){
                this.info.material[item] = material.join('<br>');
              }
            })
            this.TOURIST_TYPE_MAP = this.info.tourist_type_list;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    }
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
  white-space: pre-wrap;
}
</style>
