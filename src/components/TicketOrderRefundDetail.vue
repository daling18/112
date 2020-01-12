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
              <td>{{item.refund_status_name}}</td>
              <td>{{item.real_refund_amount}}</td>
              <td>{{item.finance_refund_status == 1?'未处理':'已处理'}}</td>
              <td>
                <template v-if="item.allow_operation">
                <el-button type="text" 
                  v-if="$menuPermission('singlepro/singleorder/ticketorder/loss') && 
                  item.refund_status == '3' && 
                  orderType === 'SingleOrder'" 
                  @click="handleShowFiexLoss(item)">定损</el-button>
                </template>
                <span v-else>--</span>
              </td>
            </tr>
            <tr v-if="item.fail_remark">
              <th>退票失败原因</th>
              <td colspan="7">{{item.fail_remark}}</td>
            </tr>
            <tr>
            <td colspan="8">
              <p v-for="(approval, approvalKey) in item.refund_approval" :key="approvalKey">
                <span class="label">[定损人/时间]</span>
                <span class="org">{{ approval.op_user_name }}</span>
                <span class="time">{{ approval.create_time }} </span>
                <span class="amt">应退款金额 {{ approval.rmb_total_amount }} </span>
                <span :class="{ 
                        'sat-inpass': approval.approval_status == 1, 
                        'sat-pass': approval.approval_status == 2, 
                        'sat-nopass': approval.approval_status == 3}">
                  {{ approval.approval_status | getApprovalStatusStr }}
                </span>
              </p>
            </td>
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
            <h3>现订单应收{{fixedLossInfo.order_amount}}元，向买家应退款 <el-input v-model="fixedLossForm.amount"></el-input> 元。</h3>
            <p>(采购退款产生{{ fixedLossInfo.refund_fee }}元损失，供应商应退您{{ fixedLossInfo.refund_amount }}元)</p>
          </div>
        </div>
        <p class="fixed-loss-tips">(注：实际退款金额会根据您定的应退款金额与已收金额系统为您计算)</p>
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
         getTicketPurchaseOrderRefundDetail,
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
  filters: {
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
        case 'TicketSaleOrderRefundDetail':
          type = 'MyOrder';
          break;
        case 'TicketSingleOrderRefundDetail':
          type = 'SingleOrder';
          break;
        case 'TicketSelfSupportOrderRefundDetail':
          type = 'SelfSupportOrder';
          break;
        case 'financeTicketMyOrderRefund':
          type = 'financeRefund';
          break;
        case 'settlementRefdealTicketOrderRefund':
          type = 'SingleOrder';
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
          routeName = 'TicketSaleOrderDetail';
          break;
        case 'SingleOrder':
          routeName = 'TicketSingleOrderDetail';
          break;
        case 'SelfSupportOrder':
          routeName = 'TicketSelfSupportOrderDetail';
          break;
        case 'FinanceOrder':
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
        case 'FinanceOrder':
          fun = getTicketMyOrderRefundDetail;
          break;
        case 'SingleOrder':
          fun = getTicketSingleOrderRefundDetail;
          break;
        case 'SelfSupportOrder':
          fun = getTicketSelfSupportOrderRefundDetail;
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
      setTicketOrderFixedLoss({
        params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.$message.success(msg);
            this.handleCloseFixedLossDialog();
            this.getTicketOrderRefundDetailsHandler();
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
.sat-pass{
  color: green;
}
.sat-inpass{
  color: gray;
} 
.sat-nopass{
  color: red;
} 
</style>
