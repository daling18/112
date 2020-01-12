<template>
  <div class="recieve-detail">
    <InvoiceIncomeDetailTemp :invoice-info="invoice_info" :invoice-detail="invoice_detail" :log-info="log_info" />
  </div>
</template>
<script>
import {financeIncomeDetail} from 'src/api/invoice';
import InvoiceIncomeDetailTemp from './InvoiceIncomeDetailTemp.comp.vue';
export default {
  components:{
    InvoiceIncomeDetailTemp
  },
  data() {
    return {
      id: this.$route.query.id,
      invoice_info: {},
      invoice_detail: [],
      log_info: []
    };
  },
  mounted() {
    this.getIncomeDetail();
  },
  methods: {
    getIncomeDetail() {
      let params = {
        data: {
          id: this.id
        }
      };
      financeIncomeDetail({
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