<template>
  <div class="recieve-detail">
    <div class="top-select-wrap" v-show="top_list.length > 0">
      <el-radio-group v-model="radio" @change="changeInvoice($event)" >
        <div class="el-radio-primary" v-for="(item, index) in top_list" :key="index">
          <!-- changeInvoice这个函数还没开始处理，还不能选择 -->
          <el-radio class="radio" :label="item.invoice_id">
            <span :class="item.is_used_name== '有效' ? 'color-green': 'color-red'">[{{item.is_used_name}}]</span>
            发票号码
            <template v-if="item.invoice_number">{{item.invoice_number}}</template>
            <template v-else>--</template>
            ，金额{{item.amount}}
          </el-radio>
        </div>
      </el-radio-group>
    </div>
    <InvoiceCostDetailTemp :invoice-info="invoice_info" :invoice-detail="invoice_detail" :log-info="log_info" :from="topMenuConst" />
  </div>
</template>
<script>
import {invoiceCostDetail, invoiceSaleCostDetail, getInvoiceSelection} from 'src/api/invoice'
import InvoiceCostDetailTemp from 'src/components/finace/InvoiceCostDetailTemp.comp.vue';
export default {
  components:{
    InvoiceCostDetailTemp
  },
  data() {
    return {
      type: this.$route.query.type ? this.$route.query.type : '',
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
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
  },
  methods: {
    initialize() {
      let api = '';
      let params = {
        data: {
          id: this.id
        }
      };

      switch(this.topMenuConst){
        case 'operator':
          api = invoiceCostDetail; break;
        case 'sale':
          api = invoiceSaleCostDetail; break;
        case 'finance':
          return;
      }
      
      api({
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
            })
          }
        }
      })
    },
    getInvoiceSelection() {
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
            this.top_list = result.data;
            this.radio = this.top_list[0].invoice_id;
            this.id = this.top_list[0].invoice_id;
            this.initialize();
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
      if(this.id != event){
        this.id = event;
        this.initialize();
      }
    }
  },
  mounted() {
    if(this.type == 1) {
      this.getInvoiceSelection()
    } else {
      this.initialize();
    }
  }
}
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
