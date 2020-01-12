<template>
  <div class="wrapper">
    <div class="header-section flex">
      <div class="header-image">
        <p class="body-title" style="margin-bottom:10px;">{{info.productname}}</p>
        <div class="imgBox"><img :src="info.productimage" :onerror=errImg></div>
      </div>
      <div class="header-content">
        <div class="detail-item flex">
          <div class="detail-lab">产品类型:</div>
          <div class="detail-con">{{info.producttypename}}</div>
        </div>
        <div class="detail-item flex">
          <div class="detail-lab">承保公司:</div>
          <div class="detail-con">{{info.icompanyname}}</div>
        </div>
        <div class="detail-item flex">
          <div class="detail-lab">产品特色</div>
          <div class="detail-con">{{info.productspecialty}}</div>
        </div>
        <div class="detail-footer flex">
          <div class="flex-1 detail-price">
            同行价
            <span class="color-orange f18">￥{{ info.price }}</span>
            <span class="color-gray mr20">起/人</span>
            销售价
            <span class="color-orange f18">￥{{ info.price }}</span>
            <span class="color-gray">起/人</span>
          </div>
          <router-link
            v-if="$route.query.reserve == 1"
            class="book-btn f18"
            :to="{path: 'productDetails', query: {id: $route.query.id}}"
          >立即投保</router-link>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <div class="system-tab" style="height:45px">
        <ul class="tab-box1">
          <li :class="{'active':activeNow == 1}" @click="changeActive(1)">产品说明</li>
          <li :class="{'active':activeNow == 2}" @click="changeActive(2)">产品条款</li>
        </ul>
      </div>
      <div v-if="activeNow == 1" class="detail-content">
        <ul v-for="(plansList,plansListIndex) in info.plan_list" :key="plansListIndex">
          <li style="color:#000;">{{plansList.plan_name}}</li>
          <li><span>保障天数</span><span>保费</span></li>
          <li v-for="(planItem,planItemIndex) in plansList.price_list" :key="planItemIndex">
            <span>{{planItem.insurancemindays}}天～{{planItem.insurancemaxdays}}天</span>
            <span>{{planItem.insurancefee}}元</span>
          </li>
          <li>
              <a slot="reference" @click="handleShowCont(plansList)" style="cursor:pointer">保障内容</a>
          </li>
        </ul>
      </div>
      <div v-else-if="activeNow == 2" class="detail-content">
          <div
            v-if="info.id != 47 && info.id != 48 && info.id != 49 && info.id != 50"
            class="detail-pdf-box"
            v-for="(item, $index) in info.plan_list"
            :key="$index"
          >
              <p>{{ item.plan_name }}</p>
              <p v-for="(tag, tagIndex) in item.terms_list" :key="tagIndex">
                <a :href="tag.url" target="_blank">{{ tag.file_name }}</a>
              </p>
          </div>
          <div
            v-if="info.id == 47 || info.id == 48 || info.id == 49 || info.id == 50"
            class="detail-pdf-box"
          >
            <div v-if="info.productname.indexOf('国内') != -1" class="detail-pdf-box">
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1MfmACuReAAHMEGK2zPc742.pdf" target="_blank">易安个人责任保险条款-(易安财险)(备-责任保险)【2016】(主) 062号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1MuOAQtDJAAMrhnJwg6M501.pdf" target="_blank">易安公共交通工具乘客意外伤害综合保险条款-(易安财险)(备-普通意外保险)【2016】(主) 082号.pdf  </a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1M1WAQXh8AAJvCJHgj_s229.pdf" target="_blank">易安旅行意外伤害保险条款-(易安财险)(备-普通意外保险)【2016】(主) 089号.pdf  </a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1M7KAPbL9AAGPekRzjhM975.pdf" target="_blank">易安附加意外伤害和急性病住院津贴保险条款-(易安财险)(备-医疗保险)【2016】(附) 099号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1M_OAH7pAAAGSt3SFhjA597.pdf" target="_blank">易安附加旅行延误保险条款-(易安财险)(备-普通意外保险)【2016】(附) 072号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NFWAbJnhAAHrtHqPeHg942.pdf" target="_blank">易安附加旅行急性病身故或全残保险条款-(易安财险)(备-疾病保险)【2016】(附) 046号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NHuAIzrAAAH5f1cLIy8577.pdf" target="_blank">易安附加旅行意外伤害医疗费用保险条款-(易安财险)(备-医疗保险)【2016】(附) 049号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NJ-AO8ZAAAHVuyfNX5w969.pdf" target="_blank">易安附加旅行者随身财产保险条款-(易安财险)(备-普通家财险)【2016】(附) 066号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NMSAewT_AAFNcAYBLjE411.pdf" target="_blank">易安附加旅行证件遗失保险条款-(易安财险)(备-普通家财险)【2016】(附) 073号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NPeAH8naAAImysdVnFg243.pdf" target="_blank">易安附加突发急性病医疗保险条款-(易安财险)(备-医疗保险)【2016】(附) 034号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NRyAbfsHAAJzhjpNvKc127.pdf" target="_blank">易安附加紧急医疗救援保险条款-(易安财险)(备-医疗保险)【2017】(附) 218号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NTuAcGsdAADueFx_6sU890.pdf" target="_blank">易安附加高风险运动意外伤害保险条款-(易安财险)(备-普通意外保险)【2016】(附) 015号.pdf</a></p>
            </div>
            <div v-else-if="info.productname.indexOf('国内') == -1" class="detail-pdf-box">
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NfOANWHzAAHMEMZ_zBQ137.pdf" target="_blank">易安个人责任保险条款-(易安财险)(备-责任保险)【2016】(主) 062号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NgqAA9u_AAMrhkox_TM501.pdf" target="_blank">易安公共交通工具乘客意外伤害综合保险条款-(易安财险)(备-普通意外保险)【2016】(主) 082号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NkiABKFSAAOyYK6VA4M015.pdf" target="_blank">易安旅行团体意外伤害保险条款-(易安财险)(备-普通意外保险)【2016】(主) 050号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1Nl2ANEn2AAGPegTFe5c720.pdf" target="_blank">易安附加意外伤害和急性病住院津贴保险条款-(易安财险)(备-医疗保险)【2016】(附) 099号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NnWAOvhEAAGStxxKEKA743.pdf" target="_blank">易安附加旅行延误保险条款-(易安财险)(备-普通意外保险)【2016】(附) 072号.pdf  </a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NseAfGRyAAHrtF9Zo5Q821.pdf" target="_blank">易安附加旅行急性病身故或全残保险条款-(易安财险)(备-疾病保险)【2016】(附) 046号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NwqABCgJAAH5fxsU_QA497.pdf" target="_blank">易安附加旅行意外伤害医疗费用保险条款-(易安财险)(备-医疗保险)【2016】(附) 049号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1NyiAUxGOAAHVu9XhinM669.pdf" target="_blank">易安附加旅行者随身财产保险条款-(易安财险)(备-普通家财险)【2016】(附) 066号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1N-aAV2jfAAFem04BjWM972.pdf" target="_blank">易安附加旅行行李延误保险条款-(易安财险)(备-普通意外保险)【2017】(附) 228号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1OCWAQj5vAAFNcJHsrzE593.pdf" target="_blank">易安附加旅行证件遗失保险条款-(易安财险)(备-普通家财险)【2016】(附) 073号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1OE-ALj3wAAImyo3WPKk755.pdf" target="_blank">易安附加突发急性病医疗保险条款-(易安财险)(备-医疗保险)【2016】(附) 034号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1OIqAbfy2AAJzhqfONkg270.pdf" target="_blank">易安附加紧急医疗救援保险条款-(易安财险)(备-医疗保险)【2017】(附) 218号.pdf</a></p>
              <p><a href="https://image.yktour.com.cn/g1/M00/06/E7/CgAMDFy1OKKAR3zpAADueB2YDdM189.pdf" target="_blank">易安附加高风险运动意外伤害保险条款-(易安财险)(备-普通意外保险)【2016】(附) 015号.pdf</a></p>
            </div>
          </div>
      </div>
      <!-- 保障内容dialog -->
      <el-dialog title="保障内容" :visible.sync="dialogVisible" :size="'medium'">
        <div class="bids-wrap">
          <el-table
            :data="activeItem.list"
            :span-method="objectSpanMethodDomestic"
            border
            style="width: 100%; line-height: 20px;"
            max-height="500"
            >
            <el-table-column
              prop="content"
              label="保障内容"
              >
            </el-table-column>
            <el-table-column
              prop="describe"
              label="保险责任简述"
              >
            </el-table-column>
            <el-table-column
              prop="money"
              :label="activeItem.name"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="remark">
          <p>备注：	</p>
          <p>1、可当日投保当日起保</p>
					<p>2、被保险人年龄：出生满30天到85周岁（含）。</p>
          <p>3、同一投保人为同一被保险人投保，仅限在其同一旅行期间内投保该保险产品其中一款产品一份，不得投保多份；若投保多款产品或投保同一款产品多份的，被保险人仅能享受其中保障最高的一款产品的一份保险保障。</p>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import{
  queryInsuranceProductDetailNew,
  getProductTerms
} from 'src/api/insurance.js';

export default {
  components: {
  },
  data () {
    return {
      info: {
        detail: {},
        productimage: ''
      },
      activeNow: 1,
      errImg: 'this.src="' + require('src/assets/errimg.png') + '"',
      dialogVisible: false,
      activeItem: {
        list: [],
        name: ''
      }
    }
  },
  computed: {
  },
  mounted(){
    this.getInfo();
  },
  methods:{
    changeActive(index) {
      this.activeNow = index;
    },
    getInfo() {
      let params = {
        data: {
          id: this.$route.query.id || ''
        }
      }
      queryInsuranceProductDetailNew({
        params: params,
        success: (data) => {
          if (data.data.code == '0') {
            this.info = data.data.data;
          } else {
            this.$message.error(data.data.msg);
          }
        },
        showLoading: true
      });
    },
    handleShowCont(idx){
      this.activeItem.list = idx.security_content.list
      this.activeItem.name = idx.plan_name
      this.dialogVisible = true
    },
    objectSpanMethodDomestic({ row, column, rowIndex, columnIndex }) {
        // ElementUi v1.3.4暂时不支持
    },
    objectSpanMethodForeign({ row, column, rowIndex, columnIndex }) {
        // ElementUi v1.3.4暂时不支持
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
  flex: 2;
  margin-right: 15px;
  .imgBox {
    width: 440px;
    height: 440px;
    overflow: hidden;
  }
  img{
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid #e4e4e4;
  }
}
.header-content{
  flex: 3;
  .title{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 13px;
    border-bottom: 1px solid #f1f1f1
  }
  .detail-item{
    line-height: 7;
    .detail-lab{
      width: 85px;
      color: #999;
      text-align: right;
    }
    .detail-con{
      flex: 1;
      padding: 0 15px;
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
.tab-box1{
  float:left;
  padding-left: 30px;

  li{
    // transition: all .3s cubic-bezier(.645,.045,.355,1);
    border: none;
    padding: 0 15px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #999999;
    position: relative;
    cursor:pointer;

    &.on{
      cursor: default;
    }
    a{
      width: 100%;
      height: 100%;
      display: inline-block;
      color: #999999;
    }
  }
  li.active{
    color: #b10c79;
    border-bottom: 2px solid #b10c79;
    a{
      color: #b10c79;
    }
  }
}
.detail-content {
  background: #fff;
  ul {
    display: inline-block;
    padding: 10px;
    border: 1px solid #aaa;
    border-radius: 10px;
    width: 220px;
    margin: 30px;
    li {
      display: flex;
      line-height: 22px;
      span{
        flex: 1;
      }
      span:nth-child(1) {
        flex: 2;
      }
    }
  }
}
.detail-pdf-box {
  padding: 20px;
  line-height: 25px;
}
.remark {
  padding-top: 10px;
}

</style>
