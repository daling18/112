<template>
  <div class="recieve-detail">
    <div v-if="invoice_info.status == 0" class="verify-button">
      <el-button type="primary" @click="handleVerifyPassBtn(1)">审核通过</el-button>
      <el-button @click="handleVerifyPassBtn(-1)">审核不通过</el-button>
    </div>
    <InvoiceIncomeDetailTemp 
      v-if="type == 1" 
      :invoice-info="invoice_info"
      :invoice-detail="invoice_detail"
      :log-info="log_info"
    />
    <InvoiceCostDetailTemp v-else :invoice-info="invoice_info" :invoice-detail="invoice_detail" :log-info="log_info" />
  </div>
</template>
<script>
import {auditInvoice, invoiceDetail} from 'src/api/invoice';
import InvoiceIncomeDetailTemp from './InvoiceIncomeDetailTemp.comp.vue';
import InvoiceCostDetailTemp from './InvoiceCostDetailTemp.comp.vue';
export default {
  components:{
    InvoiceIncomeDetailTemp,
    InvoiceCostDetailTemp
  },
  data() {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type,
      invoice_info: {},
      invoice_detail: [],
      log_info: []
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      // const getDetailFunc = this.type == 1 ? financeIncomeDetail : financeCostDetail;
      let params = {
        data: {
          id: this.id
        }
      };

      invoiceDetail({
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
    },
    auditInvoice(status){
      auditInvoice({
        params: {data: {
          id: this.id,
          status: status
        }},
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.$message({type: 'success', message: '操作成功！'});
            this.getDetail();
            // this.$router.go(-1);
            // this.$router.push('/finace/approval/proceeds')
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
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
        this.auditInvoice(status);
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消通过'
        // });          
      });

    }
  }
};
</script>
<style lang="less" scoped>
  .recieve-detail {
    .verify-button{
      float: right;
      margin-top: 26px;
      margin-right: 20px;
    }
  }
</style>
