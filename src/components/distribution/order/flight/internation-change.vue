<template>
<div class="wrapper">
  <div class="el-tabs el-tabs--border-card">
    <div class="el-tabs__header" style="border-bottom:0;">
      <div class="el-tabs__nav-wrap">
        <div class="el-tabs__nav">
          <div class="el-tabs__item">
            <router-link :to="{ path: '/order/flight/internation_order_detail', query: { order_id: $route.query.order_id }}">订单详情</router-link>
          </div>
          <div class="el-tabs__item is-active">
            <router-link :to="{ path: '/order/flight/internation_change_order', query: { order_id: $route.query.order_id }}">变更单详情</router-link>
          </div>
          <div class="el-tabs__item">
            <router-link :to="{ path: '/order/flight/internation_refund_order', query: { order_id: $route.query.order_id }}">退款单</router-link>
          </div>
        </div>
    </div>
    </div>
  </div>
  <div class="module-box">
    <div class="module-box-head"><h5>变更信息</h5></div>
    <div class="module-box-body">
      <div class="module-table module-table-border">
        <table v-for="(obj,idx) in orderData" :key="idx">
          <tr>
            <th width="200">变更单号</th>
            <th>变更类型</th>
            <th width="200">变更备注</th>
            <th>变更申请单状态</th>
            <th>需支付费用</th>
            <th>操作</th>
          </tr>
          <tr class="tc">
            <td>{{obj.change_no}}</td>
            <td>{{obj.change_type}}</td>
            <td>{{obj.change_msg}}</td>
            <td>{{obj.status}}</td>
            <td>
              <p>{{obj.diff_price}}</p>
              <p>（{{obj.pay_status}}）</p>
            </td>
            <td>
              <el-button type="primary" size="small" 
                @click="flightPayFeeTodo(obj)"
                v-if="obj.status_code == '4'">支付差价</el-button>
              <span v-else>--</span>
            </td>
          </tr>
          <tr>
            <th width="80">变更内容</th>
            <td colspan="5">
             <table>
                <tr>
                  <th>航程</th>
                  <th>航段序号</th>
                  <th>原航班起飞时间</th>
                  <th>原航程信息</th>
                  <th>原航班号</th>
                  <th>原舱位</th>
                  <th>变更航班号</th>
                  <th>变更日期</th>
                  <th>变更舱位编码</th>
                  <th>变更城市</th>
                </tr>
                <tr v-for="(item,itdx) in obj.flight_info" :key="itdx">
                  <td>第{{item.segment_info.journey_num}}程</td>
                  <td>第{{item.segment_info.segment_num}}段</td>
                  <td>{{item.segment_info.depart_time}}</td>
                  <td>{{item.segment_info.depart_city_name}}
                    - {{item.segment_info.arrive_city_name}}
                  </td>
                  <td>{{item.segment_info.flight_no}}</td>
                  <td>{{item.cabin_info.seat_type}}</td>
                  <td>{{item.change_info.changed_flight_no}}</td>
                  <td>{{item.change_info.changed_dep_date}}</td>
                  <td>{{item.change_info.changed_seat_code}}</td>
                  <td>{{item.change_info.changed_dep_city}}
                    - {{item.change_info.changed_arr_city}}
                  </td>
                </tr>
              </table>

            </td>
          </tr>
          <tr>
            <th>变更乘客信息</th>
            <td colspan="5">
              <table>
                <tr>
                  <th>乘客姓名</th>
                  <th>乘客类型</th>
                  <th>票号</th>
                  <th>证件号码</th>
                  <th>改期后票号</th>
                </tr>
                <tr v-for="(item,itdx) in obj.tourist_info" :key="itdx">
                  <td>{{item.tourist_name}}</td>
                  <td>{{item.tourist_type}}</td>
                  <td>{{item.ticket_nos}}</td>
                  <td>{{item.identity_no}}</td>
                  <td>{{item.new_ticket_nos}}</td>
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
import { flightChangeDetail,flightPayChangeFee } from 'src/api/api';

export default {
  data() {
    return {
      orderData: [],
      pagination:{
        total_count:0,
        total_page: 0,
        page_size:10,
        page_index: 1,
      },
    }
  },
  methods: {
    currentPageChange(val) {
      this.pagination.page_index = val;
      this.initPageFn();
    },
    initPageFn() {
      let params = {};
      params.data={};
      // params.data.order_id='1708151647540144091';
      params.data.order_id=this.$route.query.order_id;
      params.this_is_test=1;

      flightChangeDetail({
        params: params,
        success: (params) => {
          let asyncObj = params.data;
          this.orderData = asyncObj.data;

        },
        showLoading: true
      });
    },
    flightPayFeeTodo(obj) {
      let params = {};
      params.data={};
      // params.data.order_id='1708151647540144091';
      params.data.change_order_no=obj.change_no;
      params.data.order_id=this.$route.query.order_id;
      params.this_is_test=1;

      flightPayChangeFee({
        params: params,
        success: (params) => {
          // let asyncObj = params.data;
          // this.orderData = asyncObj.data;

        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.initPageFn();
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
  margin: 0 20px;
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
      padding: 20px;
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
    .tc>td{
      text-align: center;
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
</style>
