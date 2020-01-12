<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <router-link
            :to="{ name: orderDetailName.routeName, query: { order_id: $route.query.order_id }}"
            tag="li"
          >订单详情</router-link>
          <li class="on">变更单详情</li>
          <router-link
            :to="{ name: orderDetailName.orderRefundDetailName, query: { order_id: $route.query.order_id }}"
            v-if="refund_status"
            tag="li"
          >退款详情</router-link>
        </template>
      </ul>
    </div>
    <div class="module-box">
      <div class="module-box-head">
        <h5>变更信息</h5>
      </div>
      <div class="module-box-body">
        <div class="module-table module-table-border">
          <table class="refund-table" v-for="(item,index) in orderData" :key="index">
            <tr>
              <th>变更单号</th>
              <th>变更类型</th>
              <th>变更申请单状态</th>
              <th>需支付费用</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>
                {{item.change_no}}
                <br>
                {{item.create_time}}
              </td>
              <td>{{item.change_type}}</td>
              <td>{{item.status}}</td>
              <td class="tc">
                <strong class="color-orange">&yen;{{item.diff_price}}</strong>
                <p>（{{item.pay_status == 0? '未支付' : '已支付'}}）</p>
              </td>
              <td class="tc">
                <a
                  href="javascript:;"
                  v-if="item.status == '需支付变更费用'"
                  @click="payDifference(index)"
                >{{countDownItem[index] && countDownItem[index][2]+":"+countDownItem[index][3]}}<br>支付差价</a>
                <p v-else>--</p>
              </td>
            </tr>
            <tr>
              <td>变更说明</td>
              <td colspan="4">{{item.change_msg}}</td>
            </tr>
            <tr>
              <td>变更航班</td>
              <td colspan="4">
                <table>
                  <tr>
                    <th>原航班起飞时间</th>
                    <th>原航班信息/原航班号</th>
                    <th>原舱位</th>
                    <th>变更航班号</th>
                    <th>变更日期</th>
                    <th>变更舱位</th>
                  </tr>
                  <tr v-for="(items,idx) in item.flight_order_change_detail" :key="idx">
                    <td>{{items.old.depart_date}} <br>{{items.old.depart_time}}</td>
                    <td>{{items.old.depart_airport_name}} - {{items.old.arrive_airport_name}}/{{items.old.flight_no}}</td>
                    <td v-if="Number(items.old.seat_type) == 1">{{items.old.cabin_code}}</td>
                    <td v-else>{{items.old.seat_type}}</td>
                    <td>{{items.new.flight_no}}</td>
                    <td>{{items.new.depart_date}} <br>{{items.new.depart_time}}</td>
                    <td>{{items.new.seat_type}}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>变更乘客信息</td>
              <td colspan="4">
                <table>
                  <tr>
                    <th>乘客姓名</th>
                    <th>乘客类型</th>
                    <th>票号</th>
                    <th>证件号码</th>
                    <th>改期后票号</th>
                  </tr>
                  <tr v-for="(items, idx) in item.tourist_info" :key="idx">
                    <td>{{items.tourist_name}}</td>
                    <td>{{items.tourist_type_name}}</td>
                    <td>{{items.ticket_nos}}</td>
                    <td>{{items.identity_no}}</td>
                    <td>{{items.new_ticket_nos}}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFlightChangeInfo, getPayOrder, getFlightMyOrderDetail, getFlightSingleOrderDetail} from "src/api/flight";
import { countDown } from 'src/utils/countDown'
export default {
  data() {
    return {
      orderData: {},
      refund_status:'',
      change_info: {},
      tourist_info: [],
      flight_detail_befor: [],
      change_detail: [],
      countDownItem: []
    };
  },
  filters: {
    getApprovalStatusStr(type) {
      let str = "";
      switch (type) {
        case 1:
          str = "审批中";
          break;
        case 2:
          str = "审批通过";
          break;
        case 3:
          str = "审批不通过";
          break;
      }
      return str;
    }
  },
  computed: {
    orderType() {
      let routeName = this.$route.name,
        type = "";
      console.log(this.$route, "this.$route");

      switch (routeName) {
        case "FlightSaleOrderRefundDetail":
        case "FlightSaleOrderEndorseDetail":
          type = "MyOrder";
          break;
        case "FlightSingleOrderEndorseDetail":
          type = "SingleOrder";
          break;
        case "financeFlightMyOrderRefund":
          type = "financeRefund";
          break;
        case "settlementRefdealFlightOrderRefund":
          type = "SingleOrder";
          break;
      }
      return type;
    },
    orderDetailName() {
      let type = this.orderType,
        routeName = "",
        orderRefundDetailName = '';

      switch (type) {
        case "MyOrder":
        case "financeRefund":
          routeName = "FlightSaleOrderDetail";
          orderRefundDetailName = 'FlightSaleOrderRefundDetail';
          break;
        case "SingleOrder":
          routeName = "FlightSingleOrderDetail";
          orderRefundDetailName = 'FlightSingleOrderRefundDetail';
          break;
      }
      return {routeName,orderRefundDetailName};
    },
    getOrderDetailFun(){
      let type = this.orderType,
          fun = getFlightMyOrderDetail;
      switch(type){
        case 'SingleOrder':
          fun = getFlightSingleOrderDetail;
          break;
      }
      return fun
    }
  },
  methods: {
    // 订单详情
    getByOrderDetail() {
      var that = this;
      let par = {
        data: {
          order_id: this.$route.query.order_id
        }
      };
      this.getOrderDetailFun({
        params: par,
        success: params => {
          let { code, msg, data } = params["data"];
          if (code == 0) {
            this.refund_status = data.order_info.refund_status            
          } else {
            this.$message.error(msg);
          }
        },
      });
      let params = {
        data: {
          order_id: this.$route.query.order_id,
          flight_type: "1"
        }
      };
      this.loading = true;

      getFlightChangeInfo({
        params: params,
        success: params => {
          let { code, msg, data } = params["data"];
          if (code == 0) {
            this.orderData = data.list;
            var arr = [];
            for(var i=0;i<data.list.length;i++){
              // data.list[0].pay_exp_date = "2019-05-23 11:25:00";
              // data.list[2].pay_exp_date = "2019-05-22 20:36:12";

              if(data.list[i].pay_exp_date){
                var oldDate = new Date(data.list[i].pay_exp_date).getTime();
                var newDate = new Date().getTime();
                var newTime = (oldDate - newDate) / 1000 > 0 ? (oldDate - newDate) / 1000 : 0;
                arr.push(newTime);
              }else{
                arr.push(0);
              }
            }
            countDown(arr,function(res){
              that.countDownItem = res;
            })
            // this.orderData = data;
            // this.change_info = data.change_info;
            // this.tourist_info = data.tourist_info;
            // this.flight_detail_befor = data.flight_detail_befor;
            // this.change_detail = JSON.parse(data.change_info.change_detail)
            // console.log(this.change_detail,'----===');
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    payDifference(index) {
      let params = {
        data: {
          order_id: this.orderData[index].change_no,
          order_resource: "10",
          from: 1
        }
      };
      getPayOrder({
        params: params,
        success: params => {
          let { code, msg, data } = params["data"];
          if (code == "0") {
            console.log(data, "data");
            let div = document.createElement("div");
            div.innerHTML = data.form;
            div.hidden = true;
            document.body.appendChild(div);
            div.getElementsByTagName("form")[0].submit();
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getByOrderDetail();
  }
};
</script>


<style scoped lang="less">
* {
  margin: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
}
.wrapper {
  background: #fff;
  padding-bottom: 30px;
}
.module-steps-bar {
  padding-top: 20px;
  text-align: right;
}
.module-box {
  margin: 0 20px 10px;
  .module-box-head {
    padding: 20px 0 10px;
    h5 {
      &:before {
        content: "";
        width: 5px;
        height: 20px;
        display: inline-block;
        background: #aa177a;
        border-radius: 3px;
        margin-right: 15px;
        vertical-align: -4px;
      }
      font-size: 18px;
      color: #444;
    }
  }
}
.el-popover {
  .module-table {
    &.module-table-border {
      td {
        padding: 10px;
      }
    }
  }
}
.module-table {
  &.module-table-border {
    td {
      padding: 10px;
      border: 1px solid #ccc;
      text-align: center;
    }
  }
  table,
  .el-table {
    width: 100%;
    text-align: center;
    border: 1px solid #ccc;
    th {
      height: 39px;
      line-height: 39px;
      color: #999;
      font-size: 14px;
      background: #f4f4f4;
      border-bottom: 1px solid #ccc;
      font-weight: 400;
    }
    td {
      padding: 15px 0;
    }
  }
  .refund-table {
    margin-bottom: 50px;
  }
}
</style>

