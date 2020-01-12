<template>
  <div class="recieve-detail">
    <div class="top-select-wrap" v-show="top_list.length > 0">
      <el-radio-group v-model="radio" @change="changeInvoice($event)" >
        <div class="el-radio-primary" v-for="(item, index) in top_list" :key="index">
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
    <InvoiceIncomeDetailTemp :invoice-info="invoice_info" :invoice-detail="invoice_detail" :log-info="log_info" :from="topMenuConst" />
  </div>
</template>
<script>
import {incomeDetail, saleincomeDetail, getInvoiceSelection, financeIncomeDetail} from 'src/api/invoice'
import InvoiceIncomeDetailTemp from 'src/components/finace/InvoiceIncomeDetailTemp.comp.vue';
export default {
  components:{
    InvoiceIncomeDetailTemp
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
    incomeDetail() {
      let params = {
        data: {
          id: this.id
        }
      };
      incomeDetail({
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
        },
        showLoading: true
      })
    },
    saleincomeDetail() {
      let params = {
        data: {
          id: this.id
        }
      };
      saleincomeDetail({
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
        },
        showLoading: true
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
    financeIncomeDetail() {
      let params = {
        data: {
          id: this.id
        }
      };
      financeIncomeDetail({
        params,
        success: (res) => {
          let result = res.data
          if(result.code === 0) {
            this.invoice_info = result.data.invoice_info;
            this.invoice_detail = result.data.invoice_detail;
            this.log_info = result.data.log_info;
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
      this.fromMethod()
    },
    fromMethod() {
      switch(this.topMenuConst){
        case 'sale': 
          this.saleincomeDetail(); break;
        case 'finance': 
          this.financeIncomeDetail(); break;
        case 'operator': 
          this.incomeDetail(); break;
      }
    }
  },
  mounted() {
    if(this.type == 1) {
      this.getInvoiceSelection()
    } else {
      this.fromMethod()
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
