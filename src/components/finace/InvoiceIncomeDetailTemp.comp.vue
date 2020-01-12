<template>
  <div class="recieve-info">
    <h2 class="recieve-tit">发票信息</h2>
    <div class="receive-content">
      <div class="content-box">
        <span class="content-label">开票金额</span>
        <span class="content-right color-orange">{{ invoiceInfo.amount }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">发票抬头</span>
        <span class="content-right">{{ invoiceInfo.raised_org_name || '--' }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">纳税人识别号</span>
        <span class="content-right">{{ invoiceInfo.taxpayer_num || '--' }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">开户行及账户</span>
        <span class="content-right" v-if="invoiceInfo.peer_bank_name && invoiceInfo.peer_bank_number">
          {{ invoiceInfo.peer_bank_name }}&nbsp;&nbsp;{{ invoiceInfo.peer_bank_number }}
        </span>
        <span class="content-right" v-else>--</span>
      </div>
      <div class="content-box">
        <span class="content-label">开票日期</span>
        <span class="content-right">{{ invoiceInfo.invoice_date || "--" }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">经办人</span>
        <span class="content-right">{{ invoiceInfo.operater_name || "--" }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">开票方开户行</span>
        <span class="content-right" v-if="invoiceInfo.bank_name && invoiceInfo.bank_number">
          {{ invoiceInfo.bank_name }}&nbsp;&nbsp;{{ invoiceInfo.bank_number }}
        </span>
        <span class="content-right" v-else>--</span>
      </div>
      <div class="content-box">
        <span class="content-label">发票号码</span>
        <span class="content-right">{{ invoiceInfo.invoice_number || '--' }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">发票代码</span>
        <span class="content-right">{{ invoiceInfo.code || '--' }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">开票内容</span>
        <span class="content-right">{{ invoiceInfo.content || '--' }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">发票图片</span>
        <span class="content-right" v-if="!invoiceInfo.pic_url || invoiceInfo.pic_url.length === 0">--</span>
        <span class="content-rightimg" v-else>
          <div class="pic-wrap" v-for="(item, index) in invoiceInfo.pic_url" :key="index">
            <div class="pic-top" :style="'background-image:url(' + item + ')'">
              <a :href="item" class="big-btn" target="_blank"/>
            </div>
            <div class="pic-bottom">
              <a download :href="item.url">下载</a>
            </div>
          </div>
        </span>
      </div>
    </div>
    <h2 class="recieve-tit">订单信息</h2>
    <div class="receive-money-wrap clearfix">
      <el-table :data="invoiceDetail" border style="width: 100%">
        <el-table-column
          prop="amount"
          label="订单金额"
          header-align="center"
          align="right"
          width="100"
        >
          <template slot-scope="scope">
            <div class="color-orange">{{ scope.row.amount }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="item_name"
          label="收入项名称"
          align="center"
          width="240">
          <template slot-scope="scope">
            <div class="ellipsis tac" :title="scope.row.item_name">
              {{ scope.row.item_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="项目号（团号）／项目名称"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <router-link
              v-if="canJumpTripDetail(scope.row)"
              class="ellipsis"
              :title="scope.row.tuan_no + '  ' + scope.row.tuan_name"
              :to="getTripDetailUrl(scope.row)"
            >
              {{ scope.row.tuan_no }}&nbsp;&nbsp;{{ scope.row.tuan_name }}
            </router-link>
            <div v-else class="ellipsis" :title="scope.row.tuan_no + '  ' + scope.row.tuan_name">
              <span>{{ scope.row.tuan_no }}&nbsp;&nbsp;{{ scope.row.tuan_name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="订单号／应收ID"
          align="center"
          width="200">
          <template slot-scope="scope">
            <router-link
              v-if="scope.row.order_id"
              :to="getOrderDetailUrl(scope.row)"
              :title="scope.row.order_no">
              {{ scope.row.order_no }}
            </router-link>
            <router-link
              v-else
              :to="getIncomeDetailUrl(scope.row)"
              :title="scope.row.id">
              {{ scope.row.id }}
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h2 class="recieve-tit mar">操作记录</h2>
    <div class="bd">
      <div :class="'record-result-block ' + (invoiceInfo.status == 0 ? '' : 'active')" v-for="(item, index) in logInfo" :key="index">
        <div class="record-result-icon">
          <i class="active"/>
        </div>
        <div class="record-result-content">
          <div class="record-result-state">
            <p>{{ item.op_name }}</p>
            <span :class="item.status | getStatusColor">{{ item.remark }}</span>
            <!-- <span class="pass" v-else>{{ item.remark }}</span> -->
          </div>
          <!-- <p class="record-copy" v-if="item.log_type==2&&item.status==2">原因：{{ item.remark }}</p> -->
          <p class="record-copy">{{ item.create_time }}</p>
        </div>
      </div>
      <div v-if="invoiceInfo.status == 0" class="record-result-block">
        <div class="record-result-icon"><i/></div>
        <div class="record-result-content">
          <div class="color-gray">
            <span>待审批</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 收入发票详情模板
 * 
 * 支持attr参数：
 * invoiceInfo | Object | 发票详情信息
 * invoiceDetail  | Array  | 发票关联收入单列表
 * logInfo  | Array  | 发票操作列表
 * from  | String  | 访问来源：'operator': 计调操作, 'sale': 销售中心, 'finance': 财务操作
 * 
 * 
 */
export default {
  name: 'InvoiceIncomeDetailTemp',
  filters: {
    getStatusColor(status){
      switch(status) {
      case -1: 
      case -2: 
        return 'color-red';
      case 1:
        return 'color-green';
      default:
        return '';
      }
    }
  },
  props: {
    invoiceInfo: {
      required: true,
      type: Object
    },
    invoiceDetail: {
      required: true,
      type: Array
    },
    logInfo: {
      required: true,
      type: Array
    },
    from: { // 来源：对应：计调操作、销售中心、财务操作
      type: String,
      default: 'finance',
      validator: function(val){
        return ['operator', 'sale', 'finance'].indexOf(val) !== -1;
      }
    }
  },
  computed: {
    urlPrefix() {
      const path = this.$route.path;
      let urlPrefix = '';

      if (path.indexOf('/fund-settlement/') == 0) {
        urlPrefix = '/fund-settlement/';
      }else if (path.indexOf('/finace/invoice/') == 0) {
        urlPrefix = '/finace/invoice/';
      }
      return urlPrefix;
    }
  },
  methods: {
    canJumpTripDetail(row) {
      return this.from != 'finance' && row.product_id;
    },
    getTripDetailUrl(row) {
      switch(this.from){
      case 'operator': 
      case 'sale':
        return `trip-detail?id=${row.product_id}`
      case 'finance': 
        return `${this.urlPrefix}trip-detail?id=${row.product_id}`
      }
      return '';
    },
    getOrderDetailUrl(row) {
      switch(this.from){
      case 'operator': 
      case 'sale':
        return `order-detail/${row.resource_id}/${row.order_id}`;
      case 'finance': 
        return `${this.urlPrefix}order-detail/${row.resource_id}/${row.order_id}`;
      }
      return '';
    },
    getIncomeDetailUrl(row) {
      switch(this.from){
      case 'operator': 
      case 'sale':
        return `income-detail?bid=${row.bills_id}`;
      case 'finance': 
        return `${this.urlPrefix}income-detail?bid=${row.bills_id}`;
      }
      return '';

    }
  }
};
</script>

<style lang="less" scoped>
    
      .money-wrap {
        float: left;
        font-size: 14px;
        line-height: 33px;
        color: #333333;
        span {
          padding: 0 0 0 10px;
          color: #ff6000;
        }
      }
      .receive-money-wrap {
        padding: 15px 15px 0 0;
        .btn-wrap {
          float: right;
        }
        &.mtb {
          margin: 10px 0 15px;
        }
        .green {
          color: #4ab93d;
        }
        .gray {
          color: #999999;
        }
        .blank {
          color: #333333;
        }
        .red {
          color: #fc1621;
        }
      }
    .dialog-footer{text-align: center;}
    .record{margin-bottom: 20px;}
    .record-result-block{
      position: relative;
      padding: 0 0 20px 0;
      &:before {
        content: '';
        position: absolute;
        top: 4px;
        left: 18px;
        height: 100%;
        width: 2px;
        background: #ccc;
      }
      &.active::before{
        background-color: #b10c79;
      }
      &:last-child:before{
          height: 0;
      }
      .record-result-icon{
        position: absolute;
        top: 4px;
        left: 13px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        font-size: 16px;
        text-align: center;
        background: #f5f5f5;
        padding: 2px;
        i{
            background-color: #ccc;
            display: block;
            height: 100%;
            border-radius: 50%;
            &.active{
                background-color: #b10c79;
            }
        }
      }
      .record-result-content{
        position: relative;
        margin-left: 32px;
        background: #fff;
        border-radius: 50%;
        .record-result-state{
          p{
            float: left;
            &.current{
              color: #b10c79;
              font-weight: bold
            }
          }
          span{
            float: left;
            margin-left: 15px;
          }
          &:after{
            content: '';
            display: block;
            clear: both;
          }  
        }
        .record-copy{
            margin-top: 5px;
            color: #999;
        }
      }
    }
</style>
