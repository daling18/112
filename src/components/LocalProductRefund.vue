<template>
<!-- application\index\view\dev\src\components\distribution\LocalProductRefund.vue -->
  <div class="details">
    <div class="system-tab">
      <ul class="tab-box">
        <li @click="goback">订单详情</li>
        <li class="on">退款详情</li>
      </ul>
    </div>
    <div class="content">
      <div class="panel" v-for="(item, index) in tableData" :key="index">
        <div class="bd">
          <table class="table-order">
            <thead>
              <tr>
                <th>申请日期</th>
                <th>退款单号</th>
                <th>订单损失金额</th>
                <th>应退款金额</th>
                <th>退款状态</th>
                <th>实际退款金额</th>
                <th>财务退款状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ item.create_time }}</td>
                <td>{{ item.no }}</td>
                <td>
                  <div v-if="item.refund_status === 1">--</div>
                  <div v-else>{{item.refund_fee}}</div>
                </td>
                <td>{{ item.refund_status === 1 ? '--' : item.amount }}</td>
                <td>
                  <div v-if="item.refund_status === 1">退款中</div>
                  <div v-else-if="item.refund_status === 2" class="color-green">退款成功</div>
                  <div v-else-if="item.refund_status === 3">已定损，待审批</div>
                  <div v-else-if="item.refund_status === 4" class="color-red">退款失败</div>
                </td>
                <td>
                  <div v-if="item.refund_status === 1">--</div>
                  <div v-else>{{item.real_refund_amount}}</div>
                </td>
                <td>{{item.finance_status === 1 ? '未处理' : '已处理'}}</td>
                <td>
                  <el-button
                    type="text"
                    class="color-purple"
                    v-if="item.is_op_loss === 1 && $menuPermission('singlepro/selforder/localproductorder/loss')"
                    @click="openDialog(item.no, index)">定损
                  </el-button>
                  <span v-else>--</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="item.loss_op_name && (item.refund_status == 2 || item.refund_status == 4)">
                <td colspan="9">
                  <p>
                    <span class="label">[定损人/时间]</span>
                    <span class="org">{{ item.loss_op_name }}</span>
                    <span class="time">{{ item.loss_time }} </span>
                    <template v-if="item.remark">
                       处理结果：不可退 
                    </template>
                    <template v-else>
                      <span class="amt">应退款金额 {{ item.amount }} </span>
                      {{ item.refund_status == 2 ? '审批通过' : '审批不通过' }}
                    </template>
                  </p>
                </td>
              </tr>
              <!-- <tr v-if="item.loss_op_name && (item.refund_status == 5)">
                <td colspan="9">
                  <p>
                    <span class="label">[定损人/时间]</span>
                    <span class="org">{{ item.loss_op_name }}</span>
                    <span class="time">{{ item.loss_time }} </span>
                    处理结果：不可退
                  </p>
                </td>
              </tr> -->
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <el-dialog title="定损" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label-width="30px">
          <el-radio-group v-model="formData.is_retire">
            <el-radio label="1">可退</el-radio>
            <el-radio label="0">不可退</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="formData.is_retire == 1" :label="`现订单的应收金额 ${tableData[index] && tableData[index].amount}，您同意应退款金额为`" label-width="330px">
          <input-number  class="width" :precision="3" v-model="formData.amount"/>&nbsp;元
        </el-form-item>
        <el-form-item label="" label-width="30px" v-show="formData.is_retire == 1">
          <p class="color-gray">（实际退款金额会根据您定损的应退款金额与已收金额系统为您计算）</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="productLoss">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import InputNumber from 'src/plugins/InputNumber'
import {productRefundDetail, productLoss} from 'src/api/self_support.localproduct'
export default {
  components: {
    InputNumber
  },
  data () {
    return {
      order_id: this.$route.query.order_id,
      tableData: [],
      formData: {
        order_id: '',
        refund_no: '',
        is_retire: '1',
        amount: 0
      },
      dialogFormVisible: false,
      index: 0
    }
  },
  computed: {

  },
  methods: {
    productRefundDetail () {
      let params = {
        data: {
          order_id: this.order_id
        }
      }
      productRefundDetail({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.tableData = result.data || []
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
    productLoss () {
      let params = {
        data: this.formData
      }
      productLoss({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            // this.$message({
            //   type: 'success',
            //   message: result.msg
            // })
            const h = this.$createElement;
            const message = [
              h('p', {style: 'font-size: 20px' }, '定损成功!')
            ]

            if(this.formData.is_retire == '1') {
              message.push(h('P', null, '如需审批，进入审批流程，无需审批，直接退款'));
            }
            this.$msgbox({
              type: 'success',
              title: '系统提示',
              message: h('p', null, message),
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              showClose: false
            }).catch((e)=>{
            })
            this.productRefundDetail()
            this.dialogFormVisible = false
            this.formData.amount = 0
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    openDialog (refundNo, index) {
      this.dialogFormVisible = true
      this.formData.refund_no = refundNo
      this.formData.order_id = this.order_id
      this.formData.amount = 0
      this.formData.is_retire = '1';
      this.index = index || 0
    },
    goback () {
      window.history.go(-1)
    }
  },
  mounted() {
    this.productRefundDetail()
  }
}
</script>
<style lang="less" scoped>
.content {
  padding: 20px;
  background-color: #fff;
}
.panel {
  margin-bottom: 20px;
  .hd {
    padding: 10px 0 25px;

    h2 {
      display: inline-block;
      color: #b10c79;
      font-size: 16px;
      border-left: 5px solid #b10c79;
      padding-left: 10px;
      line-height: 20px;
    }
    .count-down-tips{
      margin-top: 20px;
      margin-right: 10px;
    }
  }
  .tc {
    text-align: center;
  }
}
.width {
  width: 100px;
}
.table-order{
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;

  thead{
    th{
      border: 1px solid #ccc;
      padding: 15px 10px;
      text-align: center;
      background: #f4f4f4;
      color: #999;
      font-weight: normal;
    }
  }
  tbody{
    td{
      padding: 15px 10px;
      border: 1px solid #ccc;
      text-align: center;
    }
  }
  tfoot{
    th{
      border: 1px solid #ccc;
      padding: 15px 10px;
      text-align: center;
      background: #f4f4f4;
    }
    td{
      padding: 15px 10px;
      p{
        margin-bottom: 5px;
        &:last-child{
          margin-bottom: 0;
        }

        .label, .time{
          color: #999;
        }

        .org{
          color: #b10c79;
        }

        .amt{
          color: #f60;
        }

        .sat-pass{
          color: green;
        }
        .sat-inpass{
          color: gray;
        } 
        .sat-nopass{
          color: red;
        } 
      }
    }
  }
}
</style>
