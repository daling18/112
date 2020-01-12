// src/components/sale/PeerRecogDetail.vue
<template>
  <div>
    <ul class="recieve-list">
      <li class="recieve-box">
        <span class="recieve-label">状态</span>
        <span class="recieve-con" :class="renkuanInfo.payment_status | getStatusColor">{{ PAYMENT_STATUS_MAP[renkuanInfo.payment_status] || '&nbsp;' }}</span>
      </li>
      <template v-if="renkuanInfo.payment_status > 2">
        <li class="recieve-box">
          <span class="recieve-label">原因</span>
          <span class="recieve-con">{{ paymentCancelInfo.info || '--' }}</span>
        </li>
        <li class="recieve-box">
          <span class="recieve-label">操作人</span>
          <span class="recieve-con">{{ paymentCancelInfo.user_name }} {{ paymentCancelInfo.create_time }}</span>
        </li>
      </template>
    </ul>
    <div class="recieve-info">
      <h2 class="recieve-tit">认款信息</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">总认款金额</span>
          <span class="content-right color-orange">{{ renkuanInfo.rmb_total_amount }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">认款时间</span>
          <span class="content-right">{{ renkuanInfo.create_time }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">认款ID</span>
          <span class="content-right">{{ renkuanInfo.id }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">认款人</span>
          <span class="content-right">{{ renkuanInfo.user_name }}</span>
        </div>
      </div>
      <h2 class="recieve-tit">认款应收</h2>
      <div class="clearfix">
        <el-table :data="renkuanReceivable" border style="width: 100%">
          <el-table-column
            label="认款金额"
            header-align="center"
            align="right"
            width="120">
            <template slot-scope="scope">
              <span class="color-orange">{{ renkuanInfo.rmb_total_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="应收ID"
            align="center"
            min-width="200">
            <template slot-scope="scope">
              <router-link v-if="incomeDetailPerm" :to="{path: incomeDetailPath, query: {parent_id: $route.query.parent_id, bid: scope.row.id}}" class="ellipsis color-purple">
                {{ scope.row.id }}|{{ ITEM_TYPE_MAP[scope.row.item_type] || ' - ' }}|￥{{ scope.row.rmb_total_amount || 0 }}
              </router-link>
              <span v-else class="ellipsis">
                {{ scope.row.id }}|{{ ITEM_TYPE_MAP[scope.row.item_type] || ' - ' }}|￥{{ scope.row.rmb_total_amount || 0 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="250"
            align="center"
            label="项目号(团号)">
            <template slot-scope="scope">
              <template v-if="scope.row.tuan_no">
                <div class="ellipsis">{{ scope.row.tuan_no }}</div>
                <div class="ellipsis color-gray">{{ scope.row.tuan_name }}</div>
              </template>
              <template v-else>--</template>
            </template>
          </el-table-column>
        </el-table>
      </div><h2 class="recieve-tit">收款信息</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">收款人</span>
          <span class="content-right">{{ shoukuanInfo.user_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">所属部门</span>
          <span class="content-right">{{ shoukuanInfo.settlement_org_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">业务类型</span>
          <span class="content-right" v-if="shoukuanInfo.user_collection_type === 0">--</span>
          <span class="content-right" v-else>{{ shoukuanInfo.user_collection_type === 1 ? "团队订单收入" : "团队杂费收入" }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款金额（本位币）</span>
          <span class="content-right">
            {{ shoukuanInfo.rmb_total_amount }}元
            <em class="tip">[{{ shoukuanInfo.shoukuan_status_str }}]</em>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">金额／币种／汇率</span>
          <span class="content-right">{{ shoukuanInfo.total_amount }}({{ shoukuanInfo.currency }} / 汇率{{ shoukuanInfo.currency_rate }})</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款方式／账户</span>
          <span class="content-right" v-if="!shoukuanInfo.receipt_bank_name && !shoukuanInfo.receipt_account && !shoukuanInfo.receipt_account_name">--</span>
          <span class="content-right" v-else>{{ shoukuanInfo.receipt_bank_name }}{{ shoukuanInfo.receipt_account }}{{ shoukuanInfo.receipt_account_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款日期</span>
          <span class="content-right">{{ shoukuanInfo.payment_date ? shoukuanInfo.payment_date : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">备注</span>
          <span class="content-right">{{ shoukuanInfo.remark ? shoukuanInfo.remark : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">上传收款凭证</span>
          <span class="content-right" v-if="shoukuanInfo.attachment && shoukuanInfo.attachment.length === 0">--</span>
          <span class="content-rightimg" v-else>
            <div class="pic-wrap" v-for="(item, index) in shoukuanInfo.attachment" :key="index">
              <div class="pic-top" :style="'background-image:url(' + item+ ')'">
                <a :href="item" class="big-btn" target="_blank"/>
              </div>
              <div class="pic-bottom">
                <a download :href="item">下载</a>
              </div>
            </div>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">创建时间</span>
          <span class="content-right">{{ shoukuanInfo.create_time ? shoukuanInfo.create_time : '--' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  saleRenkuanDetail,
  renkuanDetail
} from 'src/api/tuan'
import {
  renkuanDetail as financeRenkuanDetail
} from 'src/api/tuan'

export default {
  filters: {
    getStatusColor(status){
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
      PAYMENT_STATUS_MAP: {},
      PAYMENT_TYPE_MAP: {},
      ITEM_TYPE_MAP: {},
      renkuanId: this.$route.query.id,
      renkuanInfo: {},
      renkuanReceivable: [],
      shoukuanInfo: {},
      paymentCancelInfo: {}
    }
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    saleRenkuanDetailFunc(){
      // 认款详情统一在结算中心下控制
      return financeRenkuanDetail;
      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return saleRenkuanDetail;
      // case 'operator':
      //   return renkuanDetail;
      // case 'settlement':
      //   return financeRenkuanDetail;

      // }
    },
    incomeDetailPerm(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.$menuPermission('api/tuan/sale_income_info');
      case 'operator':
        return this.$menuPermission('api/tuan/op_income_info');
      case 'settlement':
        return this.$menuPermission('settlement/tuanac/gettuanac/getincodet');
      default:
        return false;
      }
    },
    incomeDetailPath(){
      switch(this.topMenuConst){
      case 'settlement':
        return '/settlement/tuan-bill/income-detail';
        break;
      default:
        return 'income-detail';
        break;
      }
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let params = {
        data: {
          id: this.renkuanId
        }
      };
      this.saleRenkuanDetailFunc({
        params,
        success: (res) => {
          console.log('res: ', res);
          let result = res.data;
          if (result.code === 0) {
            this.renkuanReceivable = [result.data.renkuan_receivable];
            this.PAYMENT_STATUS_MAP = result.data.payment_status_list;
            this.PAYMENT_TYPE_MAP = result.data.payment_type_list;
            this.ITEM_TYPE_MAP = result.data.item_type_list;
            this.renkuanInfo = result.data.renkuan_info;
            this.shoukuanInfo = result.data.shoukuan_info;
            this.paymentCancelInfo = result.data.payment_cancel;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.$router.go(-1);
          };
        },
        showLoading: true
      })
    }
  }
}
</script>
<style lang="less" scoped>
.recieve-list {
  background-color: #fff;
  list-style: none;
  margin-bottom: 10px;
  padding: 15px;
  .recieve-box {
    position: relative;
    line-height: 2;
    padding-left: 85px;
    .recieve-label {
      position: absolute;
      top: 0;
      left: 0;
      width: 75px;
      text-align: right;
      font-size: 14px;
      color: #999999;
    }
  }
}
.recieve-info {
  background-color: #fff;
  padding: 15px;
  .recieve-tit {
    margin: 20px 0;
  }
  .receive-content {
    padding: 0;
  }
}
</style>
