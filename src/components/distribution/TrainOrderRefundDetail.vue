<template>
  <div class="el-tabs el-tabs--border-card">
    <div class="el-tabs__header">
        <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav">
                <div class="el-tabs__item" @click="$router.push({ name: orderDetailName, query: { orderNo: $route.query.orderNo }})">
                    订单详情
                </div>
                <div class="el-tabs__item is-active">
                    退款详情
                </div>
            </div>
        </div>
    </div>
    <div class="el-tabs__content">
      <div class="wrapper">
        <div v-if="refundDetail" class="train-detail">
          <div class="panel" v-for="(refund, refundKey) in refundDetail" :key="refundKey">
            <div class="bd">
              <table class="table-order">
                <thead>
                  <tr>
                    <th>申请日期</th>
                    <th>退款单号</th>
                    <th>旅客</th>
                    <th>应退款金额</th>
                    <th>退款状态</th>
                    <th>实际退款金额</th>
                    <th>财务退款状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ refund.create_time }}</td>
                    <td>{{ refund.refund_no }}</td>
                    <td>{{ refund.passengersename }}<br>{{ refund.passporttypeseidname }}</td>
                    <td>{{ refund.refund_amount }}</td>
                    <td>{{ refund.status_name }}</td>
                    <td>{{ refund.real_refund_amount }}</td>
                    <td>{{ refund.finance_refund_status_name }}</td>
                    <td>
                      <a v-if="$menuPermission('api/train/fixed_loss') && refund.refund_status == 3 
                      && orderType === 'SingleOrder'" href="javascript:;" 
                      @click="handleShowFiexLoss(refund)">定损</a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr v-if="refund.fail_reamrk">
                    <th>退款失败</th>
                    <td colspan="8">
                      {{ refund.fail_reamrk }}
                    </td>
                  </tr>
                  <tr v-if="refund.log && refund.log.length">
                    <td colspan="9">
                      <p v-for="(approval, approvalKey) in refund.log" :key="approvalKey">
                        <span class="label">[定损人/时间]</span>
                        <span class="org">{{ approval.initiator_name }}</span>
                        <span class="time">{{ approval.create_time }} </span>
                        <span class="amt">应退款金额 {{ approval.refund_amount }} </span>
                        <span :class="{ 
                                'sat-inpass': approval.approval_status == 1, 
                                'sat-pass': approval.approval_status == 2, 
                                'sat-nopass': approval.approval_status == 3}">
                          {{ approval.approval_status | getApprovalStatusStr }}
                        </span>
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="定损"
      :visible.sync="fixedLossVisable"
      @close="handleCloseFixedLossDialog"
      size="tiny">
      <div class="fixed-loss">
        <!-- <div class="radio-block">
          <el-radio class="radio" v-model="fixedLossForm.type" :label="1">&nbsp;</el-radio>
          <div class="radio-txt">
            <p>系统定损  按照供应商退您的标准退的给买家</p>
            <p>供应商定损{{ fixedLossInfo.refund_fee }}元订单损失，您退买家{{ fixedLossInfo.refund_amount }}元</p>
          </div>
        </div> -->
        <div class="radio-block">
          <div class="radio-txt">
            <p>供应商扣退款手续费{{ fixedLossInfo.refund_fee }}元，应退款金额{{ fixedLossInfo.refund_amount }}元</p>
            <p>现订单的应收金额{{fixedLossInfo.order_amount}}，您同意应退款金额为 <el-input v-model="fixedLossForm.amount"></el-input> 元？</p>
          </div>
        </div>
        <p class="fixed-loss-tips">(实际退款金额会根据您定损的应退款金额与已收金额系统为您计算)</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseFixedLossDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitFixedLossForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDistributionTrainOrderRefundDetailAsyncRequest, setDistributionTrainOrderFixedLossAsyncRequest } from 'src/api/train';
export default {
  data () {
    return {
      refundDetail: null,
      fixedLossVisable: false,
      fixedLossInfo:{
        refund_fee: null,
        refund_amount: null,
        order_amount: null
      },
      fixedLossForm:{
        order_id: this.$route.query.orderNo,
        refund_no: null,
        amount: null
      }
    }
  },
  filters: {
    getFinanceRefundStatusStr(type){
      let str = '';
      switch(type){
        case 1:
          str = '未处理';
          break;
        case 2:
          str = '已处理';
          break;
      }
      return str;
    },
    getApprovalStatusStr(type){
      let str = '';
      switch(type){
        case 1:
          str = '审批中';
          break;
        case 2:
          str = '审批通过';
          break;
        case 3:
          str = '审批不通过';
          break;
      }
      return str;
    } 
  },
  computed:{
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'DistributionTrainMyOrderRefundDetail':
          type = 'MyOrder';
          break;
        case 'DistributionTrainPurchaseOrderRefundDetail':
          type = 'PurchaseOrder';
          break;
        case 'DistributionTrainSingleOrderRefundDetail':
          type = 'SingleOrder';
          break;
        case 'financeTrainMyOrderRefundDetail':
          type = 'financeRefund';
          break;
      }
      return  type;
    },
    orderDetailName(){
      let type = this.orderType,
          routeName = '';

      switch(type){
        case 'MyOrder':
          routeName = 'DistributionTrainMyOrderDetail';
          break;
        case 'PurchaseOrder':
          routeName = 'DistributionTrainPurchaseOrderDetail';
          break;
        case 'SingleOrder':
          routeName = 'DistributionTrainSingleOrderDetail';
          break;
        case 'financeRefund':
          routeName = 'financeTrainMyOrderDetail';
          break;
      }
      return routeName
    }
  },
  methods: {
    getHolelOrderRefundDetailHandler(){
      let params = {
        data: {
          order_no: this.$route.query.orderNo
        }
      }
      getDistributionTrainOrderRefundDetailAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.refundDetail = data;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleShowFiexLoss(item){
      this.fixedLossForm.refund_no = item.refund_no;
      this.fixedLossInfo.refund_fee = item.supplier_service_fee;   //供应商手续费
      this.fixedLossInfo.refund_amount = item.supplier_refund_fee;     //供应商退款
      this.fixedLossInfo.order_amount = item.order_total_amount;   //订单应收金额
      this.fixedLossVisable = true;
    },
    handleCloseFixedLossDialog(){
      this.fixedLossForm.refund_no = null;
      this.fixedLossForm.amount = null;
      this.fixedLossInfo.refund_fee = null;
      this.fixedLossInfo.refund_amount = null;
      this.fixedLossInfo.order_amount = null;
      this.fixedLossVisable = false;
    },
    handleSubmitFixedLossForm(){
      let params = {
        data: this.fixedLossForm
      }
      setDistributionTrainOrderFixedLossAsyncRequest({
        params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.$message.success(msg);
            this.handleCloseFixedLossDialog();
            this.getHolelOrderRefundDetailHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted () {
    this.getHolelOrderRefundDetailHandler();
  }
}
</script>
<style lang="less" scoped>
  .wrapper{
    padding: 15px;
    background-color: #fff;
  }
  .panel{
    margin-bottom: 20px;
    .hd{
      padding: 10px 0 25px;

      h2{
        display: inline-block;
        color: #b10c79;
        font-size: 16px;
        border-left: 5px solid #b10c79;
        padding-left: 10px;
        line-height: 20px;
      }

      span{
        margin-left: 20px;
        color: #999;
        i{
          color: #f60;
          font-style: normal;
        }
      }
      .op-btn{
        float: right;
      }
    }
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
  .rooms-set-table{
    thead{
      th{
        padding: 4px;
        background-color: #f4f4f4;
      }
    }
    tbody{
      th,td{
        padding: 4px;
      }
      td{
        padding-right: 15px;
      }
      th{
        text-align: right;
      }
    }
  }
  .detail-total{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .detail{
      span{
        margin-right: 10px;
        i{
          color: #f60;
          font-style: normal;
        }
      }
    }
  }
  .rooms-date-price{
    margin-top: 15px;
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .rooms-date-price-item{
      float: left;
      width: 100px;
      border: 1px solid #dddddd;

      .day{
        line-height: 20px;
        background-color: #fafafa;
        padding: 5px 0;
        text-align: center;
        border-bottom: 2px solid #dddddd;
        p{
          color: #444444;
        }

        span{
          color: #999999
        }
      }
      .pri{
        line-height: 20px;
        padding: 5px 0;
        text-align: center;

        p{
          color: #ff6600;
          font-weight: 700;
        }
        
        span{
          color: #999999
        }
      }
    }
  }
  .input-number{
    width: 100%;
  }
  .tourist-tools{
    padding: 10px 20px;
    border:1px solid #ddd;
    border-top: 0;
  }
  .is-active{
    color: #b10c79;
  }
  .fixed-loss{
    padding: 0 10px;
    .radio-block{
      display: flex;
      margin-bottom: 20px;
      line-height: 20px;
      .el-input{
        width: 80px;
      }
      p{
        margin-bottom: 10px;
      }
    }
    .fixed-loss-tips{
      font-size: 12px;
      color: #999;
    }
  }
</style>

