<template>
  <div class="wrapper">
    <div class="header-section flex">
      <div class="header-image">
        <img v-if="info.pic_url && info.pic_url[0]" :src="info.pic_url[0].sub_pic_url" >
      </div>
      <div class="header-content flex-1">
        <div class="title">
          {{ info.name }}<el-tag class="ml10" type="primary">{{ info.visa_type_name }}</el-tag>
        </div>
        <div class="detail-item">
          <div class="detail-lab">提前预订天数</div>
          <div class="detail-con">{{ info.forward_day }}个工作日</div>
          <div class="detail-lab">签证国家</div>
          <div class="detail-con">{{ info.continent_name }}-{{ info.nation_name }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-lab">办理时长</div>
          <div class="detail-con">材料收齐后至少{{ info.deal_day }}个工作日</div>
          <div class="detail-lab">所属领区</div>
          <div class="detail-con">{{ info.consular_district_name }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-lab">入境次数</div>
          <div class="detail-con">{{ info.entry_num }}</div>
          <div class="detail-lab">送签地</div>
          <div class="detail-con">{{ info.send_city_names && info.send_city_names.join(', ') }}</div>
        </div>
        <div class="detail-item">
          <div class="detail-lab">有效期</div>
          <div class="detail-con">{{ info.valid_time }}</div>
          <div class="detail-lab" v-show="info.success_rate">出签成功率</div>
          <div class="detail-con" v-show="info.success_rate">{{ info.success_rate }}%</div>
        </div>
        <div class="detail-item">
          <div class="detail-lab">最长停留</div>
          <div class="detail-con">{{ info.stay_time }}</div>
        </div>
        <div class="detail-item" v-show="info.accept_range">
          <div class="detail-lab">受理范围</div>
          <div class="detail-con">{{ info.accept_range || '--' }}</div>
        </div>
        <div class="detail-footer flex">
          <div class="flex-1 detail-price">
            结算价
            <span class="color-orange f18">￥{{ info.adult_peer_price }}</span>
            <span class="color-gray mr20">起</span>
            销售价
            <span class="color-orange f18">￥{{ info.adult_out_price }}</span>
            <span class="color-gray">起</span>
          </div>
          <!-- 分公司没有同行下单 <a class="book-btn f18" href="javascript:;" @click="showBookDlg=true">预订</a> -->
          <router-link
            v-if="$menuPermission('api/selfsupport.visaorder/add_order')"
            class="book-btn f18"
            :to="{path: 'book', query: {id: $route.query.id, type: '1'}}"
          >预订</router-link>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <div class="system-tab" ref="tabbar" style="height:45px">
        <ul :class="{'tab-box': 1, 'tabbar-fixed': tabbarFixed}">
          <li :class="tab == 'material' ? 'on' : ''"@click="handleClickTab(0)">签证材料</li>
          <li :class="tab == 'process' ? 'on' : ''" @click="handleClickTab(1)">办理流程</li>
          <li v-if="info.attention || info.remind" :class="tab == 'attention' ? 'on' : ''"@click="handleClickTab(2)">预订须知</li>
        </ul>
      </div>
      <div class="detail-content">
        <div class="material-section tab-section" ref="material">
          <div class="tab-list">
            <div
              :class="selectTab == key ? 'tab-item selected' : 'tab-item'"
              v-for="(key, idx) in touristTypes"
              :key="idx"
              @click="handleClickMaterialTab(key)">
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
        <div class="process-section tab-section" ref="process">
          <div class="process-item" v-for="(step, idx) in STEP_LIST" :key="idx">
            <div :class="'process-icon iconfont ' + step.icon"/>
            <div class="process-name">{{ step.name }}</div>
            <div class="process-desc">{{ step.desc }}</div>
            <div class="process-step bold">{{ 'STEP' + (idx + 1) }}</div>
          </div>
        </div>
        <div class="attention-section tab-section" ref="attention" v-show="info.attention || info.remind || (Array.isArray(info.attachment) && info.attachment.length > 0)">
          <template v-if="info.attention">
            <div class="attention-tit">预订须知</div>
            <div class="color-gray">{{ info.attention || '--' }}</div>
          </template>
          <template v-if="info.remind">
            <div class="attention-tit">温馨提示</div>
            <div class="color-gray">{{ info.remind || '--' }}</div>
          </template>
          <template v-if="Array.isArray(info.attachment) && info.attachment.length > 0">
            <div class="attention-tit">签证附件</div>
            <attachment-list :list="info.attachment" />
          </template>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="选择预订对象" :visible.sync="showBookDlg" size="tiny">
      <div class="book-link f18 tac">
        <router-link :to="{path: 'book', query: {id: $route.query.id, type: '2'}}">同行订单</router-link>
        <router-link v-if="!isStore" :to="{path: 'book', query: {id: $route.query.id, type: '1'}}">直客订单</router-link>
      </div>
    </el-dialog> -->
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
      ORG_TYPE: +localStorage.getItem('orgtype'),
      STEP_LIST: [
        {
          icon: 'icon-xiadanzhifu',
          name: '下单支付',
          desc: '根据实际出发日期挑选产品并下单支付'
        },{
          icon: 'icon-zhunbeicailiao',
          name: '准备材料',
          desc: '根据身份类型准备相应材料'
        },{
          icon: 'icon-cailiaojisong',
          name: '寄送材料',
          desc: '下单后盈科将具体通知您寄送地址及收件人'
        },{
          icon: 'icon-songqian',
          name: '材料整理送签',
          desc: '盈科将按照使馆要求帮你整理并制作材料并送签'
        },{
          icon: 'icon-chuqianpeisong',
          name: '出签及配送',
          desc: '盈科代为领取护照按照地址进行配送'
        }
      ],
      info: {},
      tab: 'material',
      tabList: ['material', 'process', 'attention'],
      tabHeight: [1000, 1000, 1000],
      tabbarHeight: 1000,
      tabbarFixed: false,
      selectTab: '',
      touristTypes: [],
      showBookDlg: false
      // selectContinent: {},
      // nationMap: {}
    }
  },
  computed: {
    isStore() {
      return this.ORG_TYPE == '5';
    }
  },
  mounted(){
    this.getInfo();
    window.addEventListener('scroll', this.handleWindowScroll);
    window.addEventListener('resize', this.getTabHeight);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleWindowScroll);
    window.removeEventListener('resize', this.getTabHeight);
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
          this.$nextTick(this.getTabHeight);
        },
        showLoading: true
      });
    },
    getTabHeight(){
      // console.log('get tab height');
      let scrollTop = window.scrollY;
      let ref = this.$refs['tabbar'];
      if(ref){
        const rect = ref.getBoundingClientRect();
        // console.log('height: ', scrollTop, rect)
        this.tabbarHeight = scrollTop + rect.y;
        // 扣减tabbar的高度，否则内容会部分被覆盖
        scrollTop -= rect.height;
      }
      this.tabHeight = this.tabList.map(item => {
        ref = this.$refs[item];
        // console.log('height: ', scrollTop, ref.getBoundingClientRect().y)
        return ref ? scrollTop + ref.getBoundingClientRect().y : 1000;
      })
    },
    handleClickTab(idx){
      window.scrollTo(window.scrollX, this.tabHeight[idx]);
    },
    handleClickMaterialTab(name){
      this.selectTab = name;
      this.getTabHeight();
    },
    handleWindowScroll(e){
      //console.log('scroll', e);
      const scrollTop = window.scrollY;

      if(!this.$refs['tabbar']){
        console.log('refs no tabbar');
        return ;
      }
      this.tabbarFixed = this.tabbarHeight <=  scrollTop;
      let tab = 'material';
      this.tabList.some((item, idx) => {
        // console.log('match: ', item, this.tabHeight[idx], scrollTop)
        if(this.tabHeight[idx] <= scrollTop){
          tab = item;
          return false;
        }else{
          return true;
        }
      });
      this.tab = tab;
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/iconfont/iconfont.css";

.tabbar-fixed{
  position: fixed;
  top: 0;
  z-index: 99;
  background: #fafafa;
  width: 100%;
}
.header-section{
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;
}
.header-image{
  margin-right: 15px;
  img{
    width: 220px;
    height: 145px;
    border: 1px solid #e4e4e4;
  }
}
.header-content{
  .title{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 13px;
    border-bottom: 1px solid #f1f1f1
  }
  .detail-item{
    display: flex;
    align-items: flex-start;
    line-height: 3;
    border-bottom: 1px solid #f1f1f1;
    .detail-lab{
      width: 85px;
      color: #999;
      text-align: right;
    }
    .detail-con{
      flex: 1;
      padding: 10px 15px;
      line-height: 1.6;
      word-break: break-word;
    }
  }
}
.detail-footer{
  line-height: 2.6;
  margin-top: 10px;
  .detail-price{
    padding-left: 15px;
    background: #fafafa;
  }
  .book-btn{
    padding: 0px 40px;
    background: #b10c79;
    color: #fff;
    line-height: 48px;
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
  border: 1px solid #f1f1f1;
  padding: 15px;
  word-break: break-word;
}
.tab-section{
    padding: 20px 20px 20px 110px;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    min-height: 100px;
    &:before{
      content: "";
      position: absolute;
      left: 20px;
      top: 20px;
      padding: 16px 18px;
      width: 34px;
      line-height: 1.2;
      word-break: break-word;
      background: #f90;
      color: #fff;
      text-align: center;
      font-size: 16px;
    }
    &:after{
      content: "";
      border-left: 30px solid transparent;
      border-bottom: 30px solid #fff;
      position: absolute;
      left: 60px;
      top: 60px;
    }
}
.material-section{
  &:before{
    content: "签证材料";
  }
}
.process-section{
  display: flex;
  .process-item{
    width: 160px;
    padding-top: 30px;
    margin-right: 20px;
    color: #999;
    text-align: center;
    background: #fafafa;
    position: relative;
    &:after{
      content: "";
      right: -8px;
      top: 69px;
      position: absolute;
      border-bottom: 8px solid transparent;
      border-left: 8px solid #fafafa;
      border-top: 8px solid transparent;
    }
    &:last-child{
      margin-right: 0;
      &:after{
        content: none;
      }
    }
  }
  .process-icon{
    font-size: 35px;
  }
  .process-name{
    color: #000;
    font-size: 16px;
  }
  .process-desc{
    font-size: 12px;
    padding: 0 10px;
  }
  .process-step{
    font-size: 15px;
    line-height: 2;
    background: #fff;
    margin-top: 30px;
  }
  &:before{
    content: "办理流程";
  }
}
.attention-section{
  line-height: 1.5;
  word-break: break-word;
  font-size: 12px;
  margin-bottom: 0;
  .attention-tit{
    font-size: 14px;
    font-weight: bold;
    padding: 20px 0 10px;
    line-height: 1;
    &:first-child{
      padding-top: 0;
    }
  }
  &:before{
    content: "预订须知";
  }
  .color-gray {
    white-space: pre-wrap;
  }
}
.book-link{
  padding: 0 20px 35px;
  a+a{
    margin-left: 30px;
  }
}
</style>
