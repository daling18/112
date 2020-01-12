<template>
  <div class="recieve-detail">
    <div class="top-select-wrap" v-show="top_list.length > 0">
      <el-radio-group v-model="radio" @change="changeInvoice($event)" >
        <div class="el-radio-primary" v-for="(item, index) in top_list" :key="index">
          <el-radio class="radio" :label="item.invoice_id">
            <span :class="item.is_used_name== '有效' ? 'green': 'red'">[{{item.is_used_name}}]</span>
            发票号码
            <template v-if="item.invoice_number">{{item.invoice_number}}</template>
            <template v-else>--</template>
            ，金额{{item.amount}}
            </el-radio>
        </div>
      </el-radio-group>
    </div>
    <div v-if="invoice_info.status == 0 && topMenuConst === 'store-finace' && $menuPermission('api_store/invoice/audit_invoice')" class="verify-button">
      <el-button type="primary" @click="handleVerifyPassBtn(1)">审核通过</el-button>
      <el-button @click="handleVerifyPassBtn(-1)">审核不通过</el-button>
    </div>
    <div class="recieve-info">
      <h2 class="recieve-tit">发票信息</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">开票金额</span>
          <span class="content-right color-orange">{{ invoice_info.amount }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">发票抬头</span>
          <span class="content-right">{{ invoice_info.raised_org_name || '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">纳税人识别号</span>
          <span class="content-right">{{ invoice_info.taxpayer_num || '--'}}</span>
        </div>
        <div class="content-box">
          <span class="content-label">开票日期</span>
          <span class="content-right">{{ invoice_info.invoice_date || "--" }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">经办人</span>
          <span class="content-right">{{ invoice_info.operater_name || "--" }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">发票号码</span>
          <span class="content-right">{{ invoice_info.invoice_number || '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">发票代码</span>
          <span class="content-right">{{ invoice_info.code || '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">开票内容</span>
          <span class="content-right">{{ invoice_info.content || '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">发票图片</span>
          <span class="content-right" v-if="!invoice_info.pic_url || invoice_info.pic_url.length === 0">--</span>
          <span class="content-rightimg" v-else>
            <div class="pic-wrap" v-for="(item, index) in invoice_info.pic_url" :key="index">
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
        <el-table :data="invoice_detail" border style="width: 100%">
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
              <router-link v-if="topMenuConst === 'store-sale'" :to="{path: '/store-sale/product-detail2', query: {id: scope.row.product_id}}" class="ellipsis" :title="scope.row.tuan_no + '  ' + scope.row.tuan_name">{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</router-link>
              <div v-else class="ellipsis" :title="scope.row.tuan_no + '  ' + scope.row.tuan_name">
                <span>{{scope.row.tuan_no}}&nbsp;&nbsp;{{scope.row.tuan_name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="订单号／应收单号"
            align="center"
            width="200">
            <template slot-scope="scope">
              <router-link
                v-if="topMenuConst === 'store-finace'"
                :to="{path: `/store-finace/order-detail2/${scope.row.resource_id}/${scope.row.order_id}`}"
                :title="scope.row.order_no">
                {{ scope.row.order_no }}
              </router-link>
              <router-link
                v-if="scope.row.order_id && topMenuConst === 'store-sale'"
                :to="{path: `/store-sale/order-detail2/${scope.row.resource_id}/${scope.row.order_id}`}"
                :title="scope.row.order_no">
                {{ scope.row.order_no }}
              </router-link>
              <!-- <router-link
                v-else
                :to="getIncomeDetailUrl(scope.row)"
                :title="scope.row.item_no">
                {{ scope.row.item_no }}
              </router-link> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <h2 class="recieve-tit mar">操作记录</h2>
      <div class="bd">
        <div :class="'record-result-block ' + (invoice_info.status == 0 ? '' : 'active')" v-for="(item, index) in log_info" :key="index">
          <div class="record-result-icon">
            <i class="active"/>
          </div>
          <div class="record-result-content">
            <div class="record-result-state">
              <p>{{ item.op_name }}</p>
              <span :class="item.status | getStatusColor">{{ item.remark }}</span>
            </div>
            <p class="record-copy">{{ item.create_time }}</p>
          </div>
        </div>
        <div v-if="invoice_info.status == 0" class="record-result-block">
          <div class="record-result-icon"><i/></div>
          <div class="record-result-content">
            <div class="color-gray">
              <span>待审批</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {invoiceSaleDetail, invoiceFinanceDetail, invoiceAuditInvoice, invoiceGetInvoiceSelection} from 'src/api/api_store'
export default {
  data () {
    return {
      topMenuConst: this.$route.meta.topMenuConst,
      id: this.$route.query.id ? this.$route.query.id : '',
      invoice_info: {},
      invoice_detail: [],
      log_info: [],
      bills_id: this.$route.query.bid ? this.$route.query.bid : '',
      invoice_list: [],
      radio: '0',
      top_list: []
    }
  },
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
  methods: {
    invoiceSaleDetail () {
      let params = {
        data: {
          id: this.id
        }
      }
      let detail = invoiceSaleDetail
      if (this.topMenuConst === 'store-finace') {
        detail = invoiceFinanceDetail
      }
      detail({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.invoice_detail = result.data.invoice_detail
            this.invoice_info = {...result.data.invoice_info}
            this.log_info = result.data.log_info
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    invoiceAuditInvoice (status) {
      invoiceAuditInvoice({
        params: {data: {
          id: this.id,
          status: status
        }},
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.$message({
              type: 'success', 
              message: result.msg
            });
            this.invoiceSaleDetail();
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          };
        },
        showLoading: true
      });
    },
    //审核通过
    handleVerifyPassBtn(status) {
      const msg = status == -1 ? '确定审核为不通过？' : '确定审核为通过？';
      this.$confirm(msg, '审核操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.invoiceAuditInvoice(status);
      }).catch(() => {});
    },
    invoiceGetInvoiceSelection () {
      let params = {
        data: {
          bills_id: this.bills_id
        }
      }
      invoiceGetInvoiceSelection({
        params,
        success: (res) => {
          let result = res.data
          if(result.code === 0) {
            this.top_list = result.data;
            if (this.top_list.length > 0) {
              this.radio = this.top_list[0].invoice_id;
              this.id = this.top_list[0].invoice_id;
            }
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    changeInvoice(event) {
      this.id = event
      this.invoiceSaleDetail()
    },
  },
  mounted() {
    if (this.bills_id) {
      this.invoiceGetInvoiceSelection()
    } else {
      this.invoiceSaleDetail()
    }
  },
}
</script>
<style lang="less" scoped>
  .recieve-info {
    background-color: #fff;
    padding: 30px 0 20px 30px;
    .recieve-tit {
      font-size: 18px;
      color: #b10c79;
      padding: 0 0 0 10px;
      border-left: 5px solid #b10c79;
      &.mar {
        margin: 15px 0;
      }
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
          display: inline-block;
          color: #333333;
          font-size: 14px;
          width: 90%;
          padding: 0 0 0 20px;
          word-break: break-all;
          .tip {
            color: #b10c79;
            font-style: normal;
            padding: 0 0 0 10px;
          }
        }
        .content-rightimg {
          min-height: 30px;
          font-size: 0;
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
                background-color: rgba(0,0,0,0.8);
                background-image: url(../../assets/icons/magnifier.png);
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
  }
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
  .recieve-detail {
    background-color: #fff;
    .verify-button{
      float: right;
      margin-top: 26px;
      margin-right: 20px;
    }
    .top-select-wrap {
      padding: 15px 30px 0;
      span {
        padding: 0 10px 0 0;
      }
      .green {
        color: green;
      }
      .red {
        color: red;
      }
      div {
        padding-bottom: 15px;
      }
      div:last-child {
        padding: 0;
      }
    }
  }
</style>
