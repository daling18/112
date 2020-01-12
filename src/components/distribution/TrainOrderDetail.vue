<template>
  <div class="el-tabs el-tabs--border-card">
    <div class="el-tabs__header">
        <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav">
                <div class="el-tabs__item is-active">
                    订单详情
                </div>
                <div v-if="orderDetail && orderDetail.refund_show" class="el-tabs__item" @click="$router.push({ name: orderTypeRouterName.orderRefundDetailName, query: { orderNo: $route.query.orderNo }})">
                    退款详情
                </div>
            </div>
        </div>
    </div>
    <div class="el-tabs__content">
      <div class="wrapper">
        <div v-if="orderDetail" class="train-detail">
          <div class="panel">
            <div class="hd">
              <h2>订单信息</h2>
            </div>
            <div class="bd">
              <div class="order-tips">
                <span class="third-order">第三方订单号：{{ orderDetail.order_info.transactionid }}</span>
                <p class="timer" v-if="orderDetail.order_info.over_time != 0">
                  请在{{countDown}}分钟内支付订单，未准时支付，订单会自动关闭
                </p>
              </div>
              <table class="table-order">
                <thead>
                  <tr>
                    <th>订单号</th>
                    <th>下单时间</th>
                    <th>支付方式</th>
                    <th>订单总金额</th>
                    <th>已收金额</th>
                    <th>未收金额</th>
                    <th>结算方</th>
                    <th>订单状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="color-purple">[{{ orderDetail.order_info.order_source_name }}]</span>{{ orderDetail.order_info.order_no }}</td>
                    <td>{{ orderDetail.order_info.create_time }}</td>
                    <td>{{ orderDetail.order_info.pay_type_name }}</td>
                    <td>{{ orderDetail.order_info.total_amount }}</td>
                    <td>{{ orderDetail.order_info.receipted_amount }}</td>
                    <td>
                      <span v-if="orderDetail.order_info.order_status != 6">{{ orderDetail.order_info.uncollected_amount }}</span>
                      <span v-else>--</span>
                    </td>
                    <td>{{ orderDetail.order_info.distributor_name }}</td>
                    <td>{{ orderDetail.order_info.order_status_name }}</td>
                    <td>
                      <el-dropdown v-if="orderDetail.order_info.order_status != 3 && 
                        orderDetail.order_info.order_status != 4 &&
                        orderDetail.order_info.order_status != 6">
                        <span class="el-dropdown-link">
                          操作<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <template v-if="orderDetail.order_info.order_status == 2">
                            <el-dropdown-item v-if="$menuPermission('api/pay/pay_order')">
                              <a href="javascript:;" @click="handleOnlinePay">在线支付</a>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="$menuPermission('api/train/cancel_order')">
                              <a href="javascript:;" @click="handleCancelTrainOrder">取消订单</a>
                            </el-dropdown-item>
                          </template>
                          <el-dropdown-item v-if="$menuPermission('api/tuan/payment_detail_list')">
                            <router-link :to="{ name: orderTypeRouterName.orderIncomeDetailName, 
                            query: { bid: orderDetail.order_info.bill_id, type: orderTypeRouterName.configType} }">查看收入</router-link>
                          </el-dropdown-item>
                          <el-dropdown-item v-if="$menuPermission('api/order/set_order_operation') &&  orderType === 'SingleOrder'">
                            <a href="javascript:;" @click="handleChangeOrderOperator">订单负责人</a>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <span v-else>--</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>订单价格明细</h2>
            </div>
            <div class="bd">
              <div class="detail-total">
                <div class="detail">
                  <span>
                    结算币种 / 汇率：人民币 / 1
                  </span> 
                  <span>
                    结算总金额：<i>{{ orderDetail.total_detail_price }}</i>
                  </span> 
                  <span>
                    本位币：<i>{{ orderDetail.total_detail_price }}</i>
                  </span>
                </div>
                <!-- <el-button type="primary" :class="'op-btn'" @click="addPricingHandler">+ 新增项目</el-button> -->
              </div>
              <table class="table-order">
                <thead>
                  <tr>
                    <th width="50">序号</th>
                    <th>项目</th>
                    <th>单价（本位币)</th>
                    <th>结算单价</th>
                    <th width="110">数量</th>
                    <th>结算金额小计</th>
                    <th>小计（本位币)</th>
                    <th width="200">说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail, key) in orderDetail.price_detail" :key="key">
                    <td>{{ key + 1 }}</td>
                    <td>{{ detail.item_name }}</td>
                    <td>{{ detail.unit_price }}</td>
                    <td>{{ detail.rmb_unit_price }}</td>
                    <td>{{ detail.num }}</td>
                    <td>{{ detail.rmb_total_amount }}</td>
                    <td>{{ detail.rmb_total_amount }}</td>
                    <td>{{ detail.remark }}</td>
                  </tr>
                  <!-- <tr v-for="(pric, key) in pricingForm" :key="'item'+key">
                    <td>{{ key + orderDetail.price_detail.length + 1 }}</td>
                    <td><el-input></el-input></td>
                    <td><el-input></el-input></td>
                    <td><el-input></el-input></td>
                    <td><el-input-number :min="1" :class="'input-number'"></el-input-number></td>
                    <td></td>
                    <td></td>
                    <td><el-input></el-input></td>
                    <td></td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>乘客信息</h2>
            </div>
            <div class="bd">
              <el-table
                :data="orderDetail.tourist"
                style="width: 100%"
                @selection-change="handleTouristSelectionChange">
                <el-table-column
                  v-if="$menuPermission('api/train/change_ticket')"
                  type="selection"
                  :selectable="handleTouristSelectable"
                  width="55">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  label="车次信息"
                  width="200">
                  <template slot-scope="prop">
                    <p>{{ prop.row.start_time }}</p>
                    {{ prop.row.checi }}&nbsp;&nbsp;{{ prop.row.from_station_name }} - {{ prop.row.to_station_name }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cxin"
                  header-align="center"
                  align="center"
                  label="席位信息">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  label="旅客信息">
                  <template slot-scope="prop">
                    <p>{{ prop.row.passengersename }}</p>
                    {{ prop.row.zwname }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="piaotypename"
                  header-align="center"
                  align="center"
                  label="票种">
                </el-table-column>
                <el-table-column
                  prop="price"
                  header-align="center"
                  align="center"
                  label="票款金额">
                </el-table-column>
                <el-table-column
                  prop="ticket_status"
                  header-align="center"
                  align="center"
                  label="车票状态">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="center"
                  label="操作">
                  <template slot-scope="prop">
                    <el-button v-if="prop.row.can_refund_flag == 1" @click="handleCancelTrainTicket(prop.row)">退票</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="$menuPermission('api/train/change_ticket')" class="tourist-tools">
                <el-button @click="handleTouristChangeTicket">改签</el-button>
              </div>
              <div v-if="$menuPermission('api/train/change_ticket') && orderDetail.change_tourists && orderDetail.change_tourists.length" class="change-tourists">
                <div class="change-tourists-label">改签：</div>
                <el-tag v-for="(passenger, key) in orderDetail.change_tourists" :key="key" type="gray">
                  {{ passenger.tourist_names }}&nbsp;&nbsp;
                  <a href="javascript:;" @click="handleConfirmChangedTrainTicket(passenger.change_no)">确认改签</a>
                  <a href="javascript:;" @click="handleCancelChangedTrainTicket(passenger.change_no)">取消改签</a>
                </el-tag>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>联系人</h2>
            </div>
            <div class="bd">
              <table class="table-order">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>手机</th>
                    <th>邮箱</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ orderDetail.order_info.contact_name }}</td>
                    <td>{{ orderDetail.order_info.contact_telphone }}</td>
                    <td>{{ orderDetail.order_info.contact_email }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>订单记录</h2>
            </div>
            <div class="bd">
              <table class="table-order">
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>操作说明</th>
                    <th>订单状态</th>
                    <th>操作人</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(log, key) in orderDetail.log" :key="key">
                    <td>{{ log.create_time }}</td>
                    <td>{{ log.op_type }}</td>
                    <td>{{ log.order_status }}</td>
                    <td>{{ log.op_user_name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <add-shoukuan-dialog :visible.sync="shoukunDialogVisible"></add-shoukuan-dialog>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="cancelTicketVisable"
      @close="handleCloseCancelTicketDialog"
      size="tiny">
      <div class="refund-info">
        <h2>您确定要退票吗？</h2>
        <p><span>车票款：</span><strong>￥{{ this.cancelTicketInfo.price }}</strong></p>
        <p><span>预计手续费：</span><strong>￥{{ this.cancelTicketInfo.guess_refund_service_fee }}</strong></p>
        <p><span>预计退款金额：</span><strong>￥{{ this.cancelTicketInfo.guess_refund_price }}</strong></p>
        <p class="refund-info-tips">*退票手续费及最终退款金额以铁路部门实退为准</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseCancelTicketDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitCancelTicketForm">确 定</el-button>
      </span>
    </el-dialog>
    <online-pay v-if="this.$menuPermission('api/pay/pay_order')" ref="onlinePay" :order-id="orderNo" order-resource="5" />
    <change-order-operator v-if="$menuPermission('api/order/set_order_operation')" ref="operator" order-type="4" @change-success="getTrainOrderDetailHandler"></change-order-operator>
  </div>
</template>
<script>
import OnlinePay from "src/components/distribution/components/OnlinePay.vue";
import AddShoukuanDialog from 'src/components/distribution/AddShoukuanDialog.comp.vue';
import ChangeOrderOperator from 'src/plugins/ChangeOrderOperator.vue';
import { getDistributionTrainOrderDetailAsyncRequest, cancelDistributionTrainOrderAsyncRequest, changeDistributionTrainFromAsyncRequest, cancelDistributionChangeTrainAsyncRequest, confirmDistributionChangeTrainAsyncRequest, cancelDistributionTrainTicketAsyncRequest } from 'src/api/train';
export default {
  data () {
    return {
      orderNo: '',
      orderDetail: null,
      pricingForm: [],
      shoukunDialogVisible: false,
      touristSelection: [],
      cancelTicketVisable: false,
      cancelTicketInfo:{
        passengerid: null,
        price: null,
        guess_refund_price: null,
        guess_refund_service_fee: null
      },
      overTime: null
    }
  },
  filters: {
    formatDateDay: (date) => {
      let day = new Date(date).getDay(),
          formattxt = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
      return formattxt[day];
    },
    getOrderStatusText(code){
      let str = '';
      switch(code){
        case 1:
          str = '待付款';
          break;
        case 2:
          str = '待确认';
          break;
        case 3: 
          str = '预定成功';
          break;
        case 4:
          str = '预定失败';
          break;
        case 5: 
          str = '已取消';
          break;
        case 6:
          str = '退款中';
          break;
        case 7:
          str = '已退款';
          break;
      }
      return str;
    }
  },
  computed: {
    countDown(){
      let time = this.overTime || 0,
          minute = Math.floor(time/60),
          seconds = time%60;
      
      return minute + '分' + seconds + '秒';
    },
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'DistributionTrainMyOrderDetail':
          type = 'MyOrder';
          break;
        case 'DistributionTrainPurchaseOrderDetail':
          type = 'PurchaseOrder';
          break;
        case 'DistributionTrainSingleOrderDetail':
          type = 'SingleOrder';
          break;
        case 'financeTrainMyOrderDetail':
          type = 'financeRefund';
          break;
      }
      return  type;
    },
    orderTypeRouterName(){
      let type = this.orderType,
          configType = '',
          orderRefundDetailName = '',
          orderIncomeDetailName = '';

      switch(type){
        case 'MyOrder':
          orderRefundDetailName = 'DistributionTrainMyOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTrainMyOrderIncomeDetail';
          configType = 21;
          break;
        case 'PurchaseOrder':
          orderRefundDetailName = 'DistributionTrainPurchaseOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTrainPurchaseOrderIncomeDetail';
          configType = 21;
          break;
        case 'SingleOrder':
          orderRefundDetailName = 'DistributionTrainSingleOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTrainSingleOrderIncomeDetail';
          configType = 8;
          break;
        case 'financeRefund':
          orderRefundDetailName = 'financeHotelMyOrderRefundDetail';
          orderIncomeDetailName = 'DistributionTrainMyOrderIncomeDetail';
          configType = 21;
          break;
      }
      return {
        orderRefundDetailName,
        orderIncomeDetailName,
        configType
      }
    }
  },
  components: {
    AddShoukuanDialog,
    OnlinePay,
    ChangeOrderOperator
  },
  methods: {
    getTrainOrderDetailHandler(){
      let params = {
        data: {
          order_no: this.orderNo
        }
      }
      getDistributionTrainOrderDetailAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.orderDetail = data;
            this.overTime = this.orderDetail.order_info.over_time;
            this.handleCountDown();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCountDown(){
      let countDown = setInterval(()=>{
        if(this.overTime == 0){
          clearInterval(countDown);
        }
        this.overTime--;
      },1000);
    },
    addPricingHandler(){
      this.pricingForm.push({});
    },
    handleCancelTrainOrder(){
      this.$confirm(`您确定要取消该订单吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            order_no: this.orderNo
          }
        }
        cancelDistributionTrainOrderAsyncRequest({
          params,
          success: (params) => {
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.getTrainOrderDetailHandler();
            }else{
              this.$message.error(msg);
            }
          }
        });
      });
    },
    handleCancelTrainTicket(passengerInfo){
      let { passengerid, price, guess_refund_price, guess_refund_service_fee } = passengerInfo;
      this.$set(this, 'cancelTicketInfo', {
        passengerid,
        price,
        guess_refund_price,
        guess_refund_service_fee
      });
      this.cancelTicketVisable = true;
    },
    handleSubmitCancelTicketForm(){
      let params = {
        data: {
          passengerid: this.cancelTicketInfo.passengerid
        }
      }
      cancelDistributionTrainTicketAsyncRequest({
        params,
        success: (params) => {
          let { code, data, msg } = params['data']; 
          if(code == 0){
            this.cancelTicketVisable = false;
            this.getTrainOrderDetailHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },  
    handleCloseCancelTicketDialog(){
      this.$set(this, 'cancelTicketInfo', {
        passengerid: null,
        price: null,
        guess_refund_price: null,
        guess_refund_service_fee: null
      });
      this.cancelTicketVisable = false;
    },
    handleTouristSelectionChange(val){
      this.touristSelection = val.map((i)=>{ return i.id });
    },
    handleTouristChangeTicket(){
      if(!this.touristSelection.length){
        this.$message.error('请选择需要改签的乘客！');
        return;
      }
      this.$confirm(`您确定要改签吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            tourist_ids: this.touristSelection,
            order_no: this.orderDetail.order_info.order_no
          }
        }
        changeDistributionTrainFromAsyncRequest({
          params: params,
          success: (params) =>{
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$router.push({
                path: '/distribution/train-list',
                query: {
                  filter: window.btoa(window.encodeURIComponent(JSON.stringify(data)))
                }
              });
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        })
      });
    },
    handleTouristSelectable(tourist, index){
      return tourist.can_change_flag == 1;
    },
    handleCancelChangedTrainTicket(change_no){
      this.$confirm(`您确定要取消改签吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            change_no
          }
        }
        cancelDistributionChangeTrainAsyncRequest({
          params: params,
          success: (params) => {
            let { code, data, msg} = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.getTrainOrderDetailHandler();
            }else{
              this.$message.error(msg);
            }
            this.$router.replace({ 
              name: 'DistributionTrainMyOrderDetail', 
              query: {
                orderNo: data.order_no
              } 
            });
          },
          showLoading: true
        });
      });
    },
    handleConfirmChangedTrainTicket(change_no){
      this.$router.push({ 
        name: 'DistributionTrainChangeCheckout', 
        query: {
          changeNo: change_no
        } 
      });
    },
    handleOnlinePay(){
      this.$refs.onlinePay.pay();
    },
    handleChangeOrderOperator(){
      this.$refs.operator.changeOrderOperator(this.orderDetail.order_info.order_no, this.orderDetail.order_info.op_id);
    }
  },
  mounted () {
    let { orderNo } = this.$route.query;
    if(!orderNo){
      this.$router.replace({
        name: 'DistributionTrainMyOrder'
      });
    }
    this.orderNo = orderNo;
    this.getTrainOrderDetailHandler();
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
    .order-tips{
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .timer{
        text-align: right;
        color: #f00;
        padding-bottom: 10px;
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
  .tourist-tools, .change-tourists{
    padding: 10px 20px;
    border:1px solid #ddd;
    border-top: 0;
  }
  .change-tourists{
    display: flex;
    align-items: center;

    .el-tag{
      margin-right: 10px;
      font-size: 14px;
      padding: 2px 4px;
      height: auto;

      a{
        margin: 0 5px;
      }
    }
  }
  .is-active{
    color: #b10c79;
  }
  .refund-info{
    h2{
      font-size: 20px;
      text-align: center;
      margin-bottom: 10px;
    }
    p{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 100px;
      margin-bottom: 10px;

      strong{
        color: #f60;
      }
    }
    .refund-info-tips{
      color: #999;
    }
  }
</style>

