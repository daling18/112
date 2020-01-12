<template>
<div class="wrapper">
  <div class="el-tabs el-tabs--border-card">
    <div class="el-tabs__header" style="border-bottom:0;">
      <div class="el-tabs__nav-wrap">
        <div class="el-tabs__nav">
          <div class="el-tabs__item">
            <router-link :to="{ path: '/order/flight/internation_order_detail', query: { order_id: $route.query.order_id }}">订单详情</router-link>
          </div>
          <div class="el-tabs__item">
            <router-link :to="{ path: '/order/flight/internation_change_order', query: { order_id: $route.query.order_id }}">变更单详情</router-link>
          </div>
          <div class="el-tabs__item is-active">
            <router-link :to="{ path: '/order/flight/internation_refund_order', query: { order_id: $route.query.order_id }}">退款单</router-link>
          </div>
        </div>
    </div>
    </div>
  </div>
  <div class="module-box">
    <div class="module-box-head"><h5>退票单列表</h5></div>
    <div class="module-box-body">
      <div class="module-table module-table-border">
        <table v-for="(obj,idx) in orderData" :key="idx" class="refund-table">
          <tr>
            <th width="120">申请日期</th>
            <th width="180">退款单号</th>
            <th>乘客姓名/票号</th>
            <th width="100">退款金额</th>
            <th width="100">退款手续费</th>
            <th>退票类型</th>
            <th width="80">退款状态</th>
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
            <td>{{obj.refund_status_name}}</td>
            <td class="tc">
              <el-button type="text" v-if="obj.refund_status === -1" @click="refundVisible = true">重新申请</el-button>
              <span v-else>--</span>
              <!-- <el-button type="text" @click="obj.flag = !obj.flag">{{obj.flag?'收起':'展开'}}</el-button> -->
            </td>
          </tr>
          <!-- <tr v-if="obj.flag"> -->
          <tr>
            <td colspan="8">
              <table>
                <tr>
                  <th width="80">申请内容</th>
                  <td>
                    <p><span class="tit">【退票说明】</span>{{obj.refund_type_name}}</p>
                    <p><span class="tit">【申退原因】</span>{{obj.refund_reason}}</p>
                    <!-- <p>【附件】附件.jpg</p> -->
                   
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  

<!-- 退废票dlg -->
    <el-dialog title="申请退/废票" size="large" :visible.sync="refundVisible">
      <div class="legend">
        <p v-for="(obj,key,idx) in orderByData.refund_rule" :key="idx">
          {{key}}：{{obj}}
        </p>
      </div>
      <p class="tit">选择乘客</p>
      <div class="module-table">
      <table>
        <tr>
          <th width="50"><el-checkbox v-model="refundForm.allcheck" @change="refundCheckAllChange">&nbsp;</el-checkbox></th>
          <th width="">乘客姓名</th>
          <th width="">乘客类型</th>
          <!-- <th>票面价</th>
          <th>税费</th>
          <th>佣金</th>
          <th>结算价</th> -->
          <th width="">票号</th>
        </tr>
        <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
          <td>
            <el-checkbox-group v-model="refundForm.ticket_list" @change="refundCheckedSingleChange">
              <el-checkbox :label="item.ticket_nos" :disabled="item.ticket_status ==2 ?false:true">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td>{{item.name}}</td>
          <td>{{item.tourist_type_name}}</td>
          <!-- <td>{{item.price}}</td>
          <td>{{item.tax}}</td>
          <td>{{item.profit}}</td>
          <td>{{item.settle_price}}</td> -->
          <td class="tc">{{item.ticket_nos}}</td>
        </tr>
      </table>
      </div>
      <p class="tit">选择航段</p>
      <div class="module-table">
      <table>
        <tr>
          <th width="50"><el-checkbox v-model="refundForm.flightAllCheck" @change="refundFlightAllChange">&nbsp;</el-checkbox></th>
          <th width="100">航班起飞时间</th>
          <th width="">航程信息</th>
          <th>航班号</th>
          <th>舱位</th>
        </tr>
        <tr v-for="(item,idx) in orderByData.flight_info" :key="idx">
          <td>
            <el-checkbox-group v-model="refundForm.segment_list" @change="refundFlightSingleChange">
              <el-checkbox :label="item.depart_airport_code+'-'+item.arrive_airport_code" >&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td>{{item.depart_date}} {{item.depart_time}}</td>
          <td>{{item.depart_city_name}} - {{item.arrive_city_name}}</td>
          <td>{{item.flight_no}}</td>
          <td>{{item.seat_type}}</td>
        </tr>
      </table>
      </div>
      <p class="tit">退票信息</p>
      <el-form :model="refundForm" label-width="100px">
        <el-form-item label="退/废票类型" required>
          <el-select  placeholder="请选择类型"  v-model="refundForm.refund_type">
              <el-option label="请选择类型" value=""></el-option>
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
        <!-- <el-form-item label="申退原因">
          <el-input type="textarea" v-model="refundForm.refund_reason" auto-complete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="ticketRefundTodo">确 定</el-button>
      </div>
    </el-dialog>

</div>
</template>

<script>
import { refundFlightDetail,
         refundFlight, 
         getFlightOrderDetails } from 'src/api/api';

export default {
  data() {
    return {
      orderData: [],
      orderByData:[],
      refundVisible:false,
      refundForm:{
        refund_type:'',
        refund_reason:'',
        ticket_list:[],
        segment_list:[],
        allcheck:false,
        flightAllCheck:false
      },
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
      // params.data.order_id='1708141700130173371';
      params.data.order_id=this.$route.query.order_id;
      params.this_is_test=1;

      refundFlightDetail({
        params: params,
        success: (params) => {
          let asyncObj = params.data;
          this.orderData = asyncObj.data;
          for(let i in this.orderData){
            this.$set(this.orderData[i],'flag',0)
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

      getFlightOrderDetails({
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
      
       let params = {};
        params.data = {};

        params.data.ticket_list = this.refundForm.ticket_list;
        params.data.segment_list = this.refundForm.segment_list;
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
      // 退废票复选框单全选操作
      refundCheckAllChange(event){
        let tourist_list = [];
        tourist_list = this.orderByData.tourist_list.map((item) => { 
          return item.ticket_nos;
        });
        let midle  = event.target.checked ? tourist_list : [];
        this.$set(this.refundForm,'ticket_list',midle)
      },
      refundCheckedSingleChange(value){
        let checkedCount = value.length;
        let tourist_list = this.orderByData.tourist_list;
        this.$set(this.refundForm,'allcheck',checkedCount === tourist_list.length)
        
      },
      refundFlightAllChange(event){
        let flight_info = this.orderByData.flight_info.map((item) => { 
          return item.depart_airport_code+'-'+item.arrive_airport_code;
        });
        let midle  = event.target.checked ? flight_info : [];
        this.$set(this.refundForm,'segment_list',midle)

      },
      refundFlightSingleChange(value){
        let checkedCount = value.length;
        let flight_info = this.orderByData.flight_info;
        this.$set(this.refundForm,'flightAllCheck',checkedCount === flight_info.length);
      },
  },
  mounted() {
    this.initPageFn();
    this.getByOrderDetail();
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
.tit{
  color: #999;
}
.status-OS003{
  //待付款
  color:#eb4746;
}
.status-OS011{
  //已取消
  color:#999;
}
.status-OS009{
  //已出票
  color:#019f3e;
}
.status-OS037{
  //变更处理中
  color:#f23838;
}
</style>
