<template>
  <div class="recieve-detail">
    <div class="recieve-info">
      <h2 class="recieve-tit">应付</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">应付金额</span>
          <span class="content-right color-orange">{{ info.rmb_total_amount }}</span>
        </div>
        <div class="content-box" v-if="adjustment_detail && adjustment_detail.length > 0">
          <span class="content-label">调账申请</span>
          <div v-if="adjustment_detail && adjustment_detail.length > 0">
            <div class="content-right" v-if="$route.meta.topMenuConst === 'operator' && $menuPermission('api/tuan/adjustment_detail')">
              <router-link v-for="(item, index) in adjustment_detail" :to="{path: '/control/adjustment-detail', query: {id: item.adjustment_id, type: 2}}" :key="index" class="link2">
                <span class="b-tip">{{ item.item_no }}</span>[调前应收{{ item.front_amount }}]<span class="b-tip">，</span>
              </router-link>
            </div>
            <div class="content-right" v-if="$route.meta.topMenuConst === 'sale' && $menuPermission('api/tuan/adjustment_detail')">
              <router-link v-for="(item, index) in adjustment_detail" :to="{path: '/sale/adjustment-detail', query: {id: item.adjustment_id, type: 2}}" :key="index" class="link2">
                <span class="b-tip">{{ item.item_no }}</span>[调前应收{{ item.front_amount }}]<span class="b-tip">，</span>
              </router-link>
            </div>
            <div class="content-right" v-if="$route.meta.topMenuConst === 'finance' && $menuPermission('api/finance/adjustment_detail')">
              <router-link v-for="(item, index) in adjustment_detail" :to="{path: '/fcontrol/adjustment-detail', query: {id: item.adjustment_id, type: 2}}" :key="index" class="link2">
                <span class="b-tip">{{ item.item_no }}</span>[调前应收{{ item.front_amount }}]<span class="b-tip">，</span>
              </router-link>
            </div>
          </div>
          <div v-else>
            <div class="content-right">--</div>
          </div>
        </div>
        <div class="content-box">
          <span class="content-label">项目号</span>
          <span class="content-right">
            {{ info.tuan_item_no }}
            <label :class="['tip', info.settle_status == '已付清' ? 'color-green': 'color-purple']">[{{ info.settle_status }}]</label>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">团号</span>
          <span class="content-right">{{ info.tuan_no }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">应付款ID</span>
          <span class="content-right">
            {{ info.id }}
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">供应商</span>
          <span class="content-right">{{ info.supplier_org_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">项目类型</span>
          <span class="content-right">{{ info.item_type_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">项目名称</span>
          <span class="content-right">{{ info.item_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">数量</span>
          <span class="content-right">{{ info.num }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">单价</span>
          <span class="content-right">
            {{ info.rmb_unit_price }} （{{ info.currency }} / {{ info.currency_rate }}）
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">合计</span>
          <span class="content-right">{{ info.rmb_total_amount }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">成本摊派</span>
          <span class="content-right">
            {{ costAppointView || '均摊' }}
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">创建时间</span>
          <span class="content-right">{{ info.create_time }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">创建人</span>
          <span class="content-right">{{ info.user_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">确认件</span>
          <span class="content-rightimg" v-if="Array.isArray(info.confirm_file) && info.confirm_file.length > 0">
            <div class="pic-wrap" v-for="(item, index) in info.confirm_file" :key="index">
              <div class="pic-top" :style="&quot;background-image:url(&quot; + item.url+ &quot;)&quot;">
                <a :href="item.download_url" class="big-btn" target="_blank"/>
              </div>
              <div class="pic-bottom">
                <a download :href="item.url">下载</a>
              </div>
            </div>
          </span>
          <span class="content-right" v-else>无</span>
        </div>
      </div>
      <template v-if="paymentDetails.length > 0">
        <h2 class="recieve-tit">
          已付<span class="payed-amount-span color-gray">已付金额:&nbsp;<span class="color-orange">{{ info.rmb_payed_amount }}</span></span>
        </h2>
        <div class="receive-money-wrap clearfix">
          <el-table
            :data="paymentDetails"
            border
            style="width: 100%">
            <el-table-column label="付款ID" width="80" align="center" prop="id" />
            <el-table-column
              header-align="center"
              align="right"
              label="成本结算金额">
              <template slot-scope="scope">
                <div class="color-orange pr5">
                  {{ scope.row.rmb_total_amount }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="付款状态">
              <template slot-scope="scope">
                <div :class="scope.row.payment_status | getStatusColor">
                  {{ scope.row.payment_status_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              align="center"
              label="付款日期"/>
            <el-table-column
              prop="user_name"
              align="center"
              label="认款操作人"/>
          </el-table>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {
  billPayDetail,
  saleBillPayDetail,
  financeBillPayDetail
} from 'src/api/tuan';
export default {
  filters: {
    getStatusColor(status){
      // 付款状态 1待审批 2审批通过 3审批不通过 4已撤销 5已作废
      switch(status) {
      case 3: 
      case 5: 
        return 'color-red';
      case 2: 
        return 'color-green';
      case 1:
      case 4:
        return 'color-gray';
      default:
        return '';
      }
    }
  },
  data() {
    return {
      info: {},
      adjustment_detail: [],
      paymentDetails: []
    };
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    costAppointView(){
      let str = '';
      const cost_appoint = this.info.cost_appoint;

      if(Array.isArray(cost_appoint) && cost_appoint.length > 0) {
        str += '指定订单人头：';
        str += cost_appoint.map((item) => `${item.order_no} （${item.num} 人）`).join('，');
      }

      return str;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let apiName = '';

      switch (this.topMenuConst) {
      case 'operator':
        apiName = billPayDetail;
        break;
      case 'sale':
        apiName = saleBillPayDetail;
        break;
      case 'finance':
        apiName = financeBillPayDetail;
        break;
      }
      apiName({
        params: { 
          data: { 
            a_id: this.$route.query.aid,
            bill_id: this.$route.query.id 
          } 
        },
        success: res => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data.bill_info;
            this.paymentDetails = result.data.payment_details;
            this.adjustment_detail = result.data.adjustment_detail;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
            this.$router.go(-1);
          }
        },
        showLoading: true
      });
    }
  }
};
</script>
<style lang="less" scoped>
.recieve-detail {
  .recieve-info {
    background-color: #fff;
    padding: 30px 0 20px 30px;
    .recieve-tit {
      font-size: 18px;
      color: #b10c79;
      padding: 0 0 0 10px;
      border-left: 5px solid #b10c79;
    }
    .receive-content {
      padding: 30px 0;
      .content-box {
        position: relative;
        padding: 0 0 0 150px;
        margin-bottom: 10px;
        .content-label {
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;
          text-align: right;
          font-size: 14px;
          color: #999999;
        }
        .content-right {
          font-size: 14px;
          padding: 0 0 0 20px;
          > .tip {
            margin-left: 10px;
          }
        }
        .content-rightimg {
          min-height: 30px;
          .pic-wrap {
            display: inline-block;
            width: 100px;
            font-size: 14px;
            margin-left: 20px;
            .pic-top {
              position: relative;
              overflow: hidden;
              width: 100px;
              height: 100px;
              background-size: cover;
              background-position: center center;
              .big-btn {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 30px;
                height: 25px;
                background-color: rgba(0, 0, 0, 0.8);
                background-image: url(../../../assets/icons/magnifier.png);
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
              }
            }
            .pic-bottom {
              a {
                color: #b10c79;
              }
            }
          }
        }
      }
    }
    .money-wrap {
      line-height: 33px;
      > span {
        margin-left: 10px;
      }
    }
    .payed-amount-span{
      font-size: 14px;
      margin-left: 10px;
      font-weight: normal;
    }
    .receive-money-wrap {
      padding: 20px 15px 0 0;
      .btn-wrap {
        float: right;
      }
      &.mtb {
        margin: 10px 0 15px;
      }
    }
  }
}
.link2 {
  color: #b10c79;
  .b-tip {
    color: #000;
  }
}
</style>
