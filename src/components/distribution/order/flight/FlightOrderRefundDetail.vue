<template>
<div class="wrapper">
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

  <div class="module-box">
    <div class="module-box-head"><h5>退票单列表</h5></div>
    <div class="module-box-body">
      <div class="module-table module-table-border">
        <table v-for="(obj,idx) in orderData" :key="idx" class="refund-table">
          <tr>
            <th width="100">申请日期</th>
            <th width="180">退款单号</th>
            <th>乘客姓名/票号</th>
            <th width="100">应退款金额</th>
            <th width="100">订单损失金额</th>
            <th>退票类型</th>
            <th width="80">退款状态</th>
            <th width="100">实际退款金额</th>
            <th width="100">财务退款状态</th>
            <th width="100">操作</th>
          </tr>
          <tr>
            <td>{{obj.create_time}}</td>
            <td>
              <p>{{obj.refund_no}}</p>
            </td>
            <td>
              <div v-for="(item,indx) in obj.tourist_info" :key="indx">
                <p>{{item.tourist_name}}/{{item.ticket_no}}</p>
              </div>
            </td>
            <td class="tc"><strong class="color-orange">&yen;{{obj.vender_pay_price}}</strong></td>
            <td class="tc"><strong class="color-orange">&yen;{{obj.refund_fee}}</strong></td>
            <td>{{obj.refund_type_name}}</td>
            <td>{{obj.refund_type_name}}</td>
            <td>{{obj.vender_pay_price}}</td>
            <td>{{obj.refund_status_name}}</td>
            <td class="tc">
              <el-button type="text" 
                v-if="$menuPermission('api/ticket/fixed_loss') && refund.refund_status == 3 && orderType === 'SingleOrder'" 
                @click="handleShowFiexLoss(obj)">定损</el-button>

              <!-- <span v-else>--</span> -->
            </td>
          </tr>
          <tr>
            <td colspan="10">
              <table>
                <tr>
                  <th width="80">申请内容</th>
                  <td>
                    <p><span class="tit">【退票说明】</span>{{obj.refund_type_name}}</p>
                    <p><span class="tit">【申退原因】</span>{{obj.refund_reason}}</p>
                  </td>
                </tr>
                <tr>
                  <th width="80">失败原因</th>
                  <td>{{obj.refund_type_name}}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- <tr>
            <td colspan="10">
              [定损人／时间] 计调张晓华 2018-04-23 12:23；应退款金额 80  审批不通过
            </td>
          </tr> -->
        </table>
      </div>
    </div>
  </div>

  

<!-- 退废票dlg -->
    <el-dialog title="申请退/废票" size="large" :visible.sync="refundVisible">
      <div class="legend">
        退票规定：提交退票时间计算手续费；按照当前舱位票面价收取退票费；起飞前收取当前舱位票面价的10.0%退票费，起飞后收取当前舱位票面价的15.0%退票费；
        <p class="tips">温馨提示：为了不影响您办理退票，如行程单或者发票已打印 ，需联系作废行程单或者发票。</p>
      </div>
      <p class="tit">选择乘客</p>
      <div class="module-table">
      <table>
        <tr>
          <th width="50"><el-checkbox v-model="refundForm.allcheck" @change="refundCheckAllChange">&nbsp;</el-checkbox></th>
          <th width="80">乘客姓名</th>
          <th width="80">乘客类型</th>
          <th>票面价</th>
          <th>税费</th>
          <th>佣金</th>
          <th>结算价</th>
          <th width="150">票号</th>
        </tr>
        <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
          <td>
            <el-checkbox-group v-model="refundForm.tourist" @change="refundCheckedSingleChange">
              <el-checkbox :label="idx" :disabled="item.ticket_status ==2 ?false:true">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td>{{item.name}}</td>
          <td>{{item.tourist_type_name}}</td>
          <td>{{item.price}}</td>
          <td>{{item.tax}}</td>
          <td>{{item.profit}}</td>
          <td>{{item.settle_price}}</td>
          <td class="tc">{{item.ticket_nos}}</td>
        </tr>
      </table>
      </div>
      <p class="tit">退票信息</p>
      <el-form :model="refundForm" label-width="100px">
        <el-form-item label="退/废票类型">
          <el-select  placeholder="机票类型"  v-model="refundForm.refund_type">
              <el-option label="全部" value=""></el-option>
              <el-option label="【自愿退票】：客人自愿退票，按客规收取手续费" value="1"></el-option>
              <el-option label="【非自愿退票】：航班延误、取消，申请全退" value="2"></el-option>
              <el-option label="【升舱换开】申请全退" value="3"></el-option>
              <el-option label="【升舱换开】：名字错换开重出，申请全退" :value="4"></el-option>
              <el-option label="【非自愿退票】客人因病无法乘机，申请全退" value="5"></el-option>
              <el-option label="【非自愿退票】：其他退票情况" value="6"></el-option>
              <el-option label="【其他】：申请退回票款差价" value="7"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="退票说明">
          <el-input type="textarea" v-model="refundForm.refund_reason" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="申退原因">
          <el-input type="textarea" v-model="refundForm.refund_reason" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="ticketRefundTodo">确 定</el-button>
      </div>
    </el-dialog>
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
import { getFlightMyOrderReFundDetail,
         getFlightSingleOrderReFundDetail,
         getFlightSelfSupportOrderReFundDetail,
         refundFlight, 
         setFlightOrderFixedLoss,
         getFlightMyOrderDetail } from 'src/api/flight';
export default {
  data() {
    return {
      orderData: [],
      orderByData:[],
      refundVisible:false,
      refundForm:{
        refund_type:'',
        refund_reason:'',
        tourist:[],
        allcheck:false,
      },
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
      pagination:{
        total_count:0,
        total_page: 0,
        page_size:10,
        page_index: 1,
      },
    }
  },
  computed:{
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'DistributionFlightMyOrderRefundDetail':
          type = 'MyOrder';
          break;
        case 'DistributionFlightPurchaseOrderRefundDetail':
          type = 'PurchaseOrder';
          break;
        case 'DistributionFlightSingleOrderRefundDetail':
          type = 'SingleOrder';
          break;
        case 'financeFlightMyOrderRefund':
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
          routeName = 'DistributionFlightMyOrderDetail';
          break;
        case 'PurchaseOrder':
          routeName = 'DistributionFlightPurchaseOrderDetail';
          break;
        case 'SingleOrder':
          routeName = 'DistributionFlightSingleOrderDetail';
          break;
        case 'financeRefund':
          routeName = 'financeFlightMyOrderRefundDetail';
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
          fun = getFlightMyOrderReFundDetail;
          break;
        case 'SingleOrder':
          fun = getFlightSingleOrderReFundDetail;
          break;
        case 'SelfSupportOrder':
          fun = getFlightSelfSupportOrderReFundDetail;
          break;
      }
      return fun
    }
  },
  methods: {
    initPageFn() {
      let params = {};
      params.data={};
      params.data.order_id=this.$route.query.order_id;

      this.getOrderDetailFun({
        params: params,
        success: (params) => {
          let {code, msg, data} = params['data'];
          if(!code){
            data.map(i => {
              i.tourist_info = JSON.parse(i.tourist_info)
            })
            this.$set(this,'orderData',data)
          }else{
            this.$message.error(msg);
          }

        },
        showLoading: true
      });
    },
    // 订单详情
    getByOrderDetail() {
      let params = {
        data:{
          order_id:this.$route.query.order_id
        },
        this_is_test:1
      };
      this.loading = true;

      getFlightMyOrderDetail({
        params: params,
        success: (params) => {
          let asyncObj = params.data;
          this.loading = false;
          if(asyncObj.success){
            this.orderByData = asyncObj.data;
            this.operateType =  this.orderByData.order_process;
          }else{
            this.$message(asyncObj.msg);
          }
        },
        showLoading: true
      });
        
    },
    // 订单退票
      ticketRefundTodo(formName) {
      
        let ticket_list = [];
        let params = {};
        params.data = {};
        let tourist = this.refundForm.tourist;
        for(let i in tourist){
          let ticket_nos = this.orderByData.tourist_list[tourist[i]].ticket_nos;
          ticket_list.push(ticket_nos)
        }

        params.data.ticket_list = ticket_list;
        params.data.refund_type = this.refundForm.refund_type;
        params.data.refund_reason = this.refundForm.refund_reason;
        params.data.order_id = this.$route.query.order_id;

        if(!params.data.refund_type){
            this.$message('请选择退票方式！');
            return;
        }

        if(!params.data.ticket_list.length){
            this.$message('请至少选择一个退票乘机人！');
            return;
        }

      
        refundFlight({
          params: params,
          success: (params) => {
            let asyncObj = params.data;
            if(asyncObj.success){
              window.location.reload();
            }
            this.$message(asyncObj.msg);
          },
          showLoading: true
        });

      },
      refundCheckAllChange(event){
        let ticket_nos =[];
        let tourist_list = this.orderByData.tourist_list;
        for(let i in tourist_list){
          if(tourist_list[i].ticket_status == 2){
            let nos = Number(i);
            ticket_nos.push(nos);
          }
        }
        let midle  = event.target.checked ? ticket_nos : [];
        this.$set(this.refundForm,'tourist',midle)

      },
      refundCheckedSingleChange(value){
        let checkedCount = value.length;
        let tourist_list = this.orderByData.tourist_list;
        let ticket_nos =[];
        for(let i in tourist_list){
          if(tourist_list[i].ticket_status == 2){
            let nos = Number(i);
            ticket_nos.push(nos);
          }
        }

        this.$set(this.refundForm,'allcheck',checkedCount === ticket_nos.length);
      },
      handleShowFiexLoss(item){
        this.fixedLossForm.refund_no = item.refund_no;
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
        setFlightOrderFixedLoss({
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
  mounted() {
    this.initPageFn();
    // this.getByOrderDetail();
  }
}

</script>

<style scoped lang="less">
*{margin: 0;}
table{
    border-collapse:collapse;
    border-spacing:0;
    table-layout:fixed;
}
.wrapper{
  background: #fff;
  padding-bottom: 30px;
}
.module-steps-bar{
  padding-top:20px;
  text-align: right;
}
.module-box{
  margin: 0 20px 10px;
  .module-box-head{
    padding: 20px 0 10px;
    h5{
      &:before{
        content: '';
        width: 5px;
        height: 20px;
        display: inline-block;
        background: #aa177a;
        border-radius:3px;
        margin-right: 15px;
        vertical-align:-4px;
      }
      font-size: 18px;
      color: #444;
    }
  }
}
.el-popover{
  .module-table{
    &.module-table-border{
      td{padding: 10px;}
    }
  }
}
.module-table{
  &.module-table-border{
    td{
      padding: 10px;
      border:1px solid #ccc;
      text-align: left;
    }
  }
  table,.el-table{
    width: 100%;
    text-align: center;
    border: 1px solid #ccc;
    th{
      height: 39px;
      line-height: 39px;
      color: #999;
      font-size: 14px;
      background: #f4f4f4;
      border-bottom: 1px solid #ccc;
      font-weight: 400;
    }
    td{
      padding: 15px 0;
    }
  }
}
.footer-tool-bar{
  margin-top: 20px;
  text-align: center;
}
.rule-info-box{
  h5{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .text{
    margin-top: 10px;
  }
}
.refund-table{
  margin-bottom: 20px;
}
.el-dialog{
  .tit{
    margin: 10px 0;
    font-weight: 700;
  }
  .el-dialog__body{
    padding: 0 20px !important;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
}
.el-tabs{
  box-shadow: none;
  .el-tabs__item{
    &.is-active{
      a{color: #b10c79;}
    }
    a{
      color: #999;
      display: block;
    }
  }
}
.legend{
  max-height: 150px;
  overflow: auto;
  padding: 10px;
  border: 1px solid #ccc;
  background:#ffffdd;
  .tips{
    color: #ff0d0d;
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
</style>
