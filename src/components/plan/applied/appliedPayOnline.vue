<template>
  <div class="recieve-info">
    <el-form label-width="150px">
      <el-form-item label="转账金额">
        <input-number  class="w150" v-model="totalAmount" :precision="3" />
      </el-form-item>
      <el-form-item label="收款人名称">
        {{ (applied && applied.settlement_org_name) || '--' }}
      </el-form-item>
      <el-form-item label="收款人账号">
        {{ (applied && applied.bank_number) || '--' }}
      </el-form-item>
      <el-form-item label="收款银行">
        {{ (applied && applied.bank_name) || '--' }}
      </el-form-item>
      <el-form-item label="付款人名称">
        {{ (applied && applied.org_name) || '--' }}
      </el-form-item>
      <el-form-item label="付款人账号">
        {{ (applied && applied.trnid) || '--' }}
      </el-form-item>
      <el-form-item label="付款银行">
        {{ (applied && applied.trn_bknm) || '--' }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleTransfer">在线转账</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="转账" :visible.sync="dialogTableVisible">
      <div class="tac f18">确认发起转账?</div>
      <el-form label-width="100px">
        <el-form-item label="转账金额">
          {{ totalAmount }}
        </el-form-item>
        <el-form-item label="收款人名称">
          {{ (applied && applied.settlement_org_name) || '--' }}
        </el-form-item>
        <el-form-item label="收款人账号">
          {{ (applied && applied.bank_number) || '--' }}
        </el-form-item>
        <el-form-item label="收款银行">
          {{ (applied && applied.bank_name) || '--' }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSubmit" type="primary">确 定</el-button>
        <el-button @click="dialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { bocTransferApplied, bocTransfer } from 'src/api/finance';
import InputNumber from 'src/plugins/InputNumber';
export default {
  components: {
    InputNumber
  },
  data () {
    return {
      topMenuConst: this.$route.meta.topMenuConst ? this.$route.meta.topMenuConst : '',
      id: this.$route.query.id ? this.$route.query.id : '',
      applied: {},
      totalAmount: '',
      dialogTableVisible: false
    }
  },
  mounted() {
    this.appliedDetail()
  },
  methods: {
    appliedDetail () {
      let params = {
        data: {
          id: this.id
        }
      }
      bocTransferApplied({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.applied = result.data || {}
            this.totalAmount = this.applied.applied_amount
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
    handleTransfer () {
      if (this.totalAmount > 0) {
        this.dialogTableVisible = true;
      } else {
        this.$message.error('请输入转账金额')
      }
    },
    handleSubmit () {
      bocTransfer({
        params: {
          data: {id: this.id, total_amount: this.totalAmount}
        },
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            // this.$router.back();
            this.$router.push({ path: '/finace/applied-pay', query: {id:this.$route.query.id} })
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    }
  }
}
</script>
<style lang="less" scoped>
.recieve-info {
  padding: 50px 30px;
  .w150 {
    width: 150px;
  }
}
.el-form-item {
  margin-bottom: 5px;
}
</style>
