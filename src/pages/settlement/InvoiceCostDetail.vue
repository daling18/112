<template>
  <div class="recieve-detail">
    <div class="top-select-wrap" v-show="invoice_list.length > 0">
      <el-radio-group v-model="id" @change="getInvoiceDetail" >
        <div class="el-radio-primary" v-for="(item, index) in invoice_list" :key="index">
          <el-radio class="radio" :label="item.invoice_id">
            <span :class="item.approval_status == 2 ? 'color-green': 'color-red'">[{{ item.approval_name }}]</span>
            发票号码
            <template v-if="item.invoice_number">{{ item.invoice_number }}</template>
            <template v-else>--</template>
            ，金额 {{ item.amount }} 元
          </el-radio>
        </div>
      </el-radio-group>
    </div>
    <InvoiceCostDetailTemp :invoice-info="invoice_info" :invoice-detail="invoice_detail" :log-info="log_info" />
  </div>
</template>
<script>
import {invoiceCostDetail, getInvoiceSelection} from 'src/api/invoice';
import InvoiceCostDetailTemp from './components/InvoiceCostDetailTemp.vue';
export default {
  components:{
    InvoiceCostDetailTemp
  },
  data() {
    return {
      type: this.$route.query.type ? this.$route.query.type : '',
      bills_id: this.$route.query.bid ? this.$route.query.bid : '',
      id: this.$route.query.id,
      invoice_info: {},
      invoice_detail: [],
      log_info: [],
      invoice_list: []
    };
  },
  mounted() {
    if (this.type == 1) {
      this.getInvoiceList();
    } else {
      this.getInvoiceDetail();
    }
  },
  methods: {
    getInvoiceList() {
      let params = {
        data: {
          bills_id: this.bills_id
        }
      };
      getInvoiceSelection({
        params,
        success: (res) => {
          let result = res.data
          if(result.code === 0) {
            this.invoice_list = result.data;
            this.id = this.invoice_list[0].invoice_id;
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
    getInvoiceDetail() {
      let params = {
        data: {
          id: this.id
        }
      };
      invoiceCostDetail({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.invoice_info = result.data.invoice_info;
            this.invoice_detail = result.data.invoice_detail;
            this.log_info = result.data.log_info;
          } else {
            this.$message({
              type: 'error'
            });
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
    background-color: #fff;
    .top-select-wrap {
      padding: 15px 30px 0;
      span {
        padding: 0 10px 0 0;
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
