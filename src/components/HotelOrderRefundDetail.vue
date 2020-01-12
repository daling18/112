<template>
  <div class="el-tabs el-tabs--border-card">
    <div class="el-tabs__header">
        <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav">
                <div v-if="permission.orderDetail" class="el-tabs__item" @click="$router.push({ name: orderDetailName, query: { orderId: $route.query.orderId }})">
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
        <div v-if="refundDetail" class="hotel-detail">
          <div class="panel" v-for="(refund, refundKey) in refundDetail" :key="refundKey">
            <div class="bd">
              <table class="table-order">
                <thead>
                  <tr>
                    <th>申请日期</th>
                    <th>退款单号</th>
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
                    <td>{{ refund.no }}</td>
                    <td>{{ refund.refund_amount }}</td>
                    <td>{{ refund.refund_status_name }}</td>
                    <td>{{ refund.real_refund_amount }}</td>
                    <td>{{ refund.finance_refund_status | getFinanceRefundStatusStr }}</td>
                    <td>
                      <a v-if="permission.fixedLoss && refund.refund_status == 3 
                      && orderType === 'SingleOrder'" href="javascript:;" 
                      @click="handleShowFiexLoss(refund)">定损</a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="8">
                      <p v-for="(approval, approvalKey) in refund.refund_approval" :key="approvalKey">
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
import { getDistributionHolelMyOrderRefundDetailAsyncRequest, getDistributionHolelSingleOrderRefundDetailAsyncRequest, getDistributionHolelSelfSupportOrderRefundDetailAsyncRequest, setDistributionHolelOrderFixedLossAsyncRequest, getDistributionHolelSupportOrderRefundDetailAsyncRequest } from 'src/api/hotel';
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
        order_id: this.$route.query.orderId,
        refund_no: null,
        amount: null,
        type: 2
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
      // console.log("routeName",routeName);
      switch(routeName){
        case 'SaleOrderOrderRefundDetail':
          type = 'SaleOrder';
          break;
        case 'HotelSingleOrderRefundDetail':
          type = 'SingleOrder';
          break;
        case 'HotelSelfSupportOrderRefundDetail':
          type = 'SelfSupportOrder';
          break;
        case 'HotelSaleOrderRefundDetail':
          type = 'hotelSaleOrder';
          break;
        case 'financeHotelMyOrderRefund':
          type = 'financeRefund';
          break;
        case 'settlementRefdealHotelOrderRefund':
          type = 'SingleOrder';
          break;
      }
      return  type;
    },
    orderDetailName(){
      let type = this.orderType,
          routeName = '';

      switch(type){
        case 'SaleOrder':
        case 'financeRefund':
          routeName = 'SaleOrderOrderDetail';
          break;
        case 'SingleOrder':
          routeName = 'HotelSingleOrderDetail';
          break;
        case 'SelfSupportOrder':
          routeName = 'HotelSelfSupportOrderDetail';
          break;
        case 'financeRefund':
          routeName = 'financeHotelMyOrderRefundDetail';
          break;
        case 'hotelSaleOrder':
          routeName = 'HotelSaleOrderDetail';
          break;
      }
      return routeName
    },
    permission(){
      let type = this.orderType,
          permission = {
            orderDetail: false,
            fixedLoss: false,
          };

      switch(type){
        case 'SaleOrder':
          permission.orderDetail = this.$menuPermission('saleorder/hotel/orderdet');
          break;
        case 'SingleOrder':
          permission.orderDetail = this.$menuPermission('singlepro/singleorder/hotel/orderdet');
          permission.fixedLoss = this.$menuPermission('singlepro/singleorder/hotel/loss');
          break;
        case 'SelfSupportOrder':
          permission.orderDetail = this.$menuPermission('singlepro/selforder/hotel/orderdet');
          break;
        case 'hotelSaleOrder':
          permission.orderDetail = this.$menuPermission('saleorder/hotel/orderdet');
          break;
      }

      return permission
    },
    getOrderRefundDetailFun(){
      let type = this.orderType,
          fun = null;

      console.log(type);

      switch(type){
        case 'SaleOrder':
          fun = getDistributionHolelMyOrderRefundDetailAsyncRequest;
          break;
        case 'SingleOrder':
          fun = getDistributionHolelSingleOrderRefundDetailAsyncRequest;
          break;
        case 'SelfSupportOrder':
          fun = getDistributionHolelSelfSupportOrderRefundDetailAsyncRequest;
          break;
        case 'hotelSaleOrder':
          fun = getDistributionHolelSupportOrderRefundDetailAsyncRequest;
          break;
      }
      return fun
    }
  },
  methods: {
    getHolelOrderRefundDetailHandler(){
      let params = {
        data: {
          order_id: this.$route.query.orderId
        }
      }

      console.log(this);
      this.getOrderRefundDetailFun({
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
      this.fixedLossForm.refund_no = item.no;
      this.fixedLossInfo.refund_fee = item.refund_fee;   //供应商手续费
      this.fixedLossInfo.refund_amount = item.supplier_refund_amount;     //供应商退款
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
      setDistributionHolelOrderFixedLossAsyncRequest({
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
      h3{
        margin-bottom: 10px;
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

