<template>
<!-- application\index\view\dev\src\components\plan\CustomizedDemandDetail.vue -->
  <div class="wrapper">
    <div class="detail-header">
      <div class="header-title">
        {{ intentInfo.intent_title || '--' }}
        <el-tag>{{ intentInfo.deal_text || '未成单' }}</el-tag>
      </div>
      <div class="header-content">
        <label class="color-gray">跟踪人</label>{{ intentInfo.sales_user_name || '--' }}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-item">
        <div class="detail-left">
          <div class="detail-item">
            <div class="detail-lab">意向ID</div>
            <div class="detail-con">{{ intentInfo.id || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">客户姓名</div>
            <div class="detail-con">{{ intentInfo.username || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">电话号码</div>
            <div class="detail-con">{{ intentInfo.mobile || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">预出发日</div>
            <div class="detail-con">{{ intentInfo.departure_date || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">预回程日</div>
            <div class="detail-con">{{ intentInfo.back_date || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">出发地</div>
            <div class="detail-con">{{ intentInfo.departure_city || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">目的地</div>
            <div class="detail-con">{{ intentInfo.destination_city || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">行程天数</div>
            <div class="detail-con">{{ intentInfo.trip_days + '天' || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">出发人数</div>
            <div class="detail-con">{{ intentInfo.departure_people_num || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">预算</div>
            <div class="detail-con">{{ intentInfo.budget || '--' }}</div>
          </div>
        </div>
        <div class="detail-right">
          <div class="detail-item">
            <div class="detail-lab">信息来源</div>
            <div class="detail-con">{{ INFO_SOURCE_MAP[intentInfo.info_source] || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">出游类型</div>
            <div class="detail-con">{{ TRAVEL_TYPE_MAP[intentInfo.travel_type] || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">产品类型</div>
            <div class="detail-con">{{ PRODUCT_TYPE_MAP[intentInfo.product_type] || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">住宿要求</div>
            <div class="detail-con">{{ HOTEL_LEVEL_MAP[intentInfo.hotel_level] || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">餐饮要求</div>
            <div class="detail-con">{{ FOOD_REQUIRE_MAP[intentInfo.food_require] || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">游客类型</div>
            <div class="detail-con">{{ intentInfo.touristsType || '--' }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-lab">需求备注</div>
            <div class="detail-con">{{ intentInfo.remark || '--' }}</div>
          </div>
        </div>
      </div>
      <div class="detail-tit" v-if="intentTrack.length > 0">跟踪记录</div>
      <div class="track-records" v-if="intentTrack.length > 0">
        <div
          :class="'record-result-block' + (track.child ? ' active' : '')"
          v-for="(track, idx) in intentTrack"
          :key="idx"
        >
          <div class="record-result-icon"><i/></div>
          <div v-if="track.child" class="record-result-content">
            {{ track.create_time }}
          </div>
          <div v-else class="record-result-content">
            {{ track.create_time }} &nbsp;&nbsp; {{ track.user_name }} &nbsp;&nbsp; {{ track.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { saleOrderList, contractBindOrderSubmit, contractUnbindOrderSubmit } from 'src/api/api';
import{
  addIntention
} from 'src/api/intention';

export default {
  name: 'PlanOrderList',
  components: {
  },
  filters: {
  },
  data() {
    const {query} = this.$route;

    return {
      intentInfo: {},
      intentTrack: [],
      INFO_SOURCE_MAP: {},
      TRAVEL_TYPE_MAP: {},
      PRODUCT_TYPE_MAP: {},
      HOTEL_LEVEL_MAP: {},
      FOOD_REQUIRE_MAP: {},
      TOURISTS_TYPE_MAP: {}
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      
      addIntention({
        params: {data: {id: this.$route.query.id}},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.intentInfo = data.data.intent_info;
            this.INFO_SOURCE_MAP = data.data.info_source;
            this.TRAVEL_TYPE_MAP = data.data.travel_type;
            this.PRODUCT_TYPE_MAP = data.data.product_type;
            this.HOTEL_LEVEL_MAP = data.data.hotel_level;
            this.FOOD_REQUIRE_MAP = data.data.food_require;
            this.TOURISTS_TYPE_MAP = data.data.tourists_type;

            if(Array.isArray(data.data.intent_track)){
              let intentTrack = [];
              data.data.intent_track.forEach(track => {
                intentTrack.push(track);
                if(Array(track.child)){
                  track.child.forEach(it => intentTrack.push(it));
                }
              })
              this.intentTrack = intentTrack;
            }
            let touristsType = [];
            this.intentInfo.tourists_type.split(',').forEach(type => {
              if(this.TOURISTS_TYPE_MAP[type]){
                touristsType.push(this.TOURISTS_TYPE_MAP[type]);
              }
            })
            this.$set(this.intentInfo, 'touristsType', touristsType.join(','));
          } else {
            this.$message.error(data.msg);
            this.$router.go(-1);
          }
        },
        showLoading: true
      });
    }
  }
};
</script>

<style scoped lang="less">
.detail-header{
  background: #fff;
  padding: 25px 20px;
  line-height: 24px;
  margin-bottom: 10px;
  .header-title{
    font-size: 18px;
  }
  .el-tag{
    background-color: #fbf3f8;
    vertical-align: middle;
    color: #b10c79
  }
  .header-content{
    margin-top: 7px;
  }
  .color-gray {
    margin-right: 30px;
  }
}
.detail-section{
  padding: 25px 20px;
  overflow: hidden;
  background-color: #fff;
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
    line-height: 2;
    .detail-lab{
      width: 90px;
      color: #999;
      text-align: right;
    }
    .detail-con{
      flex: 1;
      padding: 6px 0 6px 15px;
      line-height: 1.2;
      word-break: break-word;
    }
  }
  .detail-left{
    width: 270px;
  }
  .detail-right{
    flex: 1;
  }
}
.record-result-block{
  position: relative;
  padding: 0 0 20px 0;
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 18px;
    height: 100%;
    width: 1px;
    background-color: #ccc;
  }
  &:last-child:before{
     content: none;
  }
  &.active{
    color: #b10c79;
    .record-result-icon{
      background: rgba(177, 12, 121, .2);
      i{
        background-color: #b10c79;
      }
    }
    .record-result-content{
      font-weight: bold;
    }
  }
  .record-result-icon{
    position: absolute;
    top: 4px;
    left: 13px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(204, 204, 204, .2);
    padding: 2px;
    i{
        background-color: #ccc;
        display: block;
        height: 100%;
        border-radius: 50%;
    }
  }
  .record-result-content{
    margin-left: 32px;
  }
}
</style>
