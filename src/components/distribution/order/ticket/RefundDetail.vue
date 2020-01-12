<template>
  <div class="wrapper" v-if="refundInfo">
    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <router-link :to="{ name: orderDetailName, query: { order_id: $route.query.order_id }}" tag="li">
            订单详情
          </router-link>
          <li class="on">退款详情</li>
        </template>
      </ul>
    </div>

    <div class="tickets-order-detail" v-if="refundInfo" >
      <div class="panel" v-for="(item,idx) in refundInfo" :key="idx">
        <div class="bd">
          <table class="table-custom">
            <tr>
              <th>申请日期</th>
              <th>退款单号</th>
              <th>退票数量</th>
              <th>应退款金额</th>
              <th>订单损失金额</th>
              <th>退款状态</th>
              <th>实际退款金额</th>
              <th>财务退款状态</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>{{item.create_time}}</td>
              <td>{{item.no}}</td>
              <td>{{item.refund_num}}</td>
              <td>{{item.refund_amount}}</td>
              <td>{{item.refund_fee}}</td>
              <td>{{item.refund_status}}</td>
              <td>{{item.real_refund_amount}}</td>
              <td>{{item.finance_refund_status == 1?'未处理':'已处理'}}</td>
              <td>
                <template v-if="item.allow_operation">
                <el-button type="text" 
                  v-if="$menuPermission('api/ticket/fixed_loss') && item.refund_status == 3 && orderType === 'SingleOrder'" 
                  @click="handleShowFiexLoss(item)">定损</el-button>
                </template>
                <span v-else>--</span>
              </td>
            </tr>
            <tr v-if="item.fail_remark">
              <th>退票失败原因</th>
              <td colspan="5">{{item.fail_remark}}</td>
            </tr>
          </table>
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
            <p>供应商定损{{ fixedLossInfo.refund_fee }}元订单损失，您退买家{{ fixedLossInfo.amount }}元</p>
          </div>
        </div> -->
        <div class="radio-block">
          <div class="radio-txt">
            <p>供应商扣退款手续费{{ fixedLossInfo.refund_fee }}元，向您退款{{ fixedLossInfo.refund_amount }}元</p>
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
import { getTicketMyOrderRefundDetail,
         getTicketSingleOrderRefundDetail,
         getTicketSelfSupportOrderRefundDetail,
         setTicketOrderFixedLoss } from 'src/api/ticket';
export default {
  data() {
    return {
      refundInfo:null,
      fixedLossVisable: false,
      fixedLossInfo:{
        refund_fee: null,
        refund_amount: null,
        order_amount: null
      },
      fixedLossForm:{
        order_id: this.$route.query.order_id,
        refund_no: null,
        amount: null
      },
    }
  },
  computed:{
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'DistributionTicketMyOrderRefundDetail':
          type = 'MyOrder';
          break;
        case 'DistributionTicketPurchaseOrderRefundDetail':
          type = 'PurchaseOrder';
          break;
        case 'DistributionTicketSingleOrderRefundDetail':
          type = 'SingleOrder';
          break;
        case 'TicketSelfSupportOrderRefundDetail':
          type = 'SelfSupportOrder';
          break;
        case 'financeTicketMyOrderRefund':
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
        case 'financeRefund':
          routeName = 'DistributionTicketMyOrderDetail';
          break;
        case 'PurchaseOrder':
          routeName = 'DistributionTicketPurchaseOrderDetail';
          break;
        case 'SingleOrder':
          routeName = 'DistributionTicketSingleOrderDetail';
          break;
        case 'SelfSupportOrder':
          routeName = 'TicketSelfSupportOrderDetail';
          break;
        case 'financeRefund':
          routeName = 'financeTicketMyOrderRefundDetail';
          break;
      }
      return routeName
    },
    getOrderDetailFun(){
      let type = this.orderType,
          fun = null;

      switch(type){
        case 'MyOrder':
          fun = getTicketMyOrderRefundDetail;
          break;
        case 'SingleOrder':
          fun = getTicketSingleOrderRefundDetail;
          break;
        case 'SelfSupportOrder':
          fun = getTicketSelfSupportOrderRefundDetail;
          break;
        case 'FinanceOrder':
          fun = getTicketMyOrderRefundDetail;
          break;
      }
      return fun
    }
  },
  methods:{
    getTicketOrderRefundDetailsHandler(){
      let params = {
        data: {
          order_id: this.$route.query.order_id
        }
      };
      this.getOrderDetailFun({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(!code){
            this.refundInfo = data;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleShowFiexLoss(item){
      this.fixedLossForm.refund_no = item.no;
      this.fixedLossInfo.refund_fee = item.refund_fee;   //供应商手续费
      this.fixedLossInfo.refund_amount = item.refund_amount;     //供应商退款
      this.fixedLossInfo.order_amount = item.total_price;   //订单应收金额
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
      setTicketOrderFixedLoss({
        params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.$message.success(msg);
            this.handleCloseFixedLossDialog();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted(){
    this.getTicketOrderRefundDetailsHandler();
  }
}
</script>

<style lang="less" scoped>
.tickets-order-detail{
  background-color: #fff;
  padding: 20px;

  .panel{
    margin-bottom: 20px;
    > .hd{
      h2{
        font-size: 18px;
        border-left: 5px solid #aa177a;
        padding-left: 15px;
        line-height: 20px;
      }
    }
    > .bd{
      padding: 10px 0;

      .gr{
        color: #45bb33;
      }

      .rd{
        color: #ff0d0d;
      }

      .og{
        color: #f60;
      }

      .wt{
        color: #999;
      }
    }
    .info-list{
      span{
        display: inline-block;
        margin: 0 20px 10px 0;
      }
      i{
        font-style: normal;
        color: #999;
      }
    }
  }
}

.table-custom{
  width: 100%;
	text-align: center;
  th{
    text-align: center;
    border:1px solid #ddd;
    background: #f4f4f4;
    font-weight: 400;
    padding: 8px;
  }
	td{
    border:1px solid #ddd;
    padding:8px;
  }
	.el-button.el-button--primary a{
		color: #fff;
	}
}
.popover-text{
  color: #0066FF;
  cursor: pointer;
}
.popover-table{
  table{
    width: 100%;
  }
  th,td{
    border:1px solid #ddd;
    padding: 10px 8px;
    text-align: left;
  }
  th{
    width: 100px;
    background-color: #f4f4f4;
  }
}
</style>
