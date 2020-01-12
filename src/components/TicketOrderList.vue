<template>
  <div>
    <component :is="tabComponentName" name="ticket"></component>

    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item calendar">
          <div class="label">下单时间</div>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="filter.start_date">
          </el-date-picker>
          <span class="label zhi">-</span>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="filter.end_date">
          </el-date-picker>
        </div>

        <div class="search-item">
          <div class="label">订单状态</div>
          <el-select v-model="filter.status_code" placeholder="请选择订单状态">
            <el-option label="全部" value="-99"></el-option>
            <el-option label="待付款" value="11"></el-option>
            <el-option label="待出票" value="12"></el-option>
            <el-option label="未使用" value="0"></el-option>
            <el-option label="部分使用" value="7"></el-option>
            <el-option label="已使用" value="1"></el-option>
            <el-option label="已过期" value="2"></el-option>
            <el-option label="已取消" value="3"></el-option>
            <el-option label="被终端修改" value="5"></el-option>
            <el-option label="被终端撤销" value="6"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">代理商</div>
          <el-input v-model="filter.distributor_name" placeholder="请输入代理商名称"></el-input>
        </div>
        <div class="search-item">
          <div class="label">门票名称</div>
          <el-input v-model="filter.ticket_title" placeholder="请输入门票名称"></el-input>
        </div>
        <div class="search-item">
          <div class="label">订单号</div>
          <el-input v-model="filter.order_id" placeholder="请输入订单号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">订单来源</div>
          <el-select v-model="filter.order_source" placeholder="请选择订单来源">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="云平台" :value="1"></el-option>
            <el-option label="APP" :value="2"></el-option>
            <el-option label="官网" :value="3"></el-option>
            <el-option label="H5" :value="4"></el-option>
            <el-option label="小程序" :value="5"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">销售人员</div>
          <el-input v-model="filter.operator_name" placeholder="请输入销售人员"></el-input>
        </div>
        <div class="search-item">
          <div class="label">第三方流水号</div>
          <el-input v-model="filter.channel_req_no" placeholder="请输入第三方流水号"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="handleSearchRequset">搜索</el-button>
        </div>

      </div>
    </div>

    <div class="system-content">
    <div class="content-list">
    <el-table class="el-table--middle" :data="order_list" border style="width: 100%">
      <el-table-column prop="order_id"
                       label="订单号"
                       header-align="center"
                       align="left"
                       width="230" :resizable="false">
        <template slot-scope="scope">
         <span class="color-purple">[{{scope.row.order_source}}]</span> {{scope.row.order_id}}
        </template>
      </el-table-column>
      <el-table-column prop="order_no"
                       label="景区/门票"
                       header-align="center"
                       align="left"
                       width="200" :resizable="false">
        <template slot-scope="scope">
          {{scope.row.scenic_title}}/{{scope.row.ticket_name}}
        </template>
      </el-table-column>
      <el-table-column prop="total_price"
                       label="订单金额"
                       header-align="center"
                       align="right"
                       width="100" :resizable="false">
      </el-table-column>
      <el-table-column prop="rmb_receipted_amount"
                       label="已收"
                       header-align="center"
                       align="right"
                       width="100" :resizable="false">
      </el-table-column>
      <el-table-column prop="rmb_unpaid_amount"
                       label="未收"
                       header-align="center"
                       align="right"
                       width="100" :resizable="false">
      </el-table-column>
      <el-table-column prop="contact_name"
                       label="订单联系人"
                       header-align="center"
                       align="center"
                       width="200" :resizable="false">
      </el-table-column>
      <el-table-column prop="status_name"
                       label="订单状态"
                       header-align="center"
                       align="center"
                       width="200" :resizable="false">
      </el-table-column>
      <el-table-column prop="operator_name"
                       label="销售人员"
                       header-align="center"
                       align="center"
                       width="200" :resizable="false">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       prop="op_name"
                       width="200"
                       label="订单负责人">
      </el-table-column>
      <el-table-column prop="distributor_name"
                       label="代理商"
                       header-align="center"
                       align="center"
                       width="200" :resizable="false">
      </el-table-column>
      <el-table-column prop="create_time"
                       label="下单时间"
                       header-align="center"
                       align="left"
                       width="200" :resizable="false">
      </el-table-column>
      <el-table-column label="操作"
                       header-align="center"
                       align="center"
                       fixed="right"
                       width="100" :resizable="false">
        <template slot-scope="scope">
          <router-link :to="{ path: '/saleorder/ticket-order/detail',
                                  query: { order_id: scope.row.order_id }}"
                                  v-if="$route.name == 'TicketSaleOrder'"
                                  class="look">查看</router-link>
          <router-link :to="{ path: '/singlepro/single-ticket-order/detail',
                                  query: { order_id: scope.row.order_id }}"
                                  v-if="$route.name == 'TicketSingleOrder'"
                                  class="look">查看</router-link>
          <router-link :to="{ path: '/singlepro/selfsupport-ticket-order/detail',
                                  query: { order_id: scope.row.order_id }}"
                                  v-if="$route.name == 'TicketSelfSupportOrder'"
                                  class="look">查看</router-link>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="pagination.total_page" class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pagination.page_size"
        :page-count="pagination.total_page"
        :current-page="pagination.page_index"
        :total="pagination.total_count"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    </div>
    </div>



    <el-dialog
      title="退票申请"
      :visible.sync="refundVisible"
      size="tiny"
      @close="refundDialogCloseHandler">
      <el-form :model="refundData" class="refund-cont" ref="refundForm">
        <p>只能在原票数的基础上减少票数</p>
        <el-form-item prop="refund_num">
          <el-input-number v-model="refundData.refund_num" :min="refundData.refund_min_num" :max="refundData.refund_max_num"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="refund-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="requestRefundTicketHandler">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改手机号码"
      :visible.sync="contactVisible"
      size="tiny"
      @close="contactDialogCloseHandler">
      <el-form :model="contactData" class="refund-cont" ref="contactForm">
        <el-form-item prop="mobile">
          <el-input v-model="contactData.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="refund-footer">
        <el-button @click="contactVisible = false">取 消</el-button>
        <el-button type="primary" @click="requestChangeTicketContact">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTicketMyOrder,
getTicketSingleOrder,
getTicketSelfSupportOrder,
refundTicket,
changeTicketContact } from 'src/api/ticket';
import * as format from 'src/utils/format';
import SingleOrderTab from './components/SingleOrderTab.vue'
import SelfSupportOrderTab from './components/SelfSupportOrderTab'

export default {
  data() {
    return {
      filter:{
        start_date : '',
        end_date : '',
        status_code : '',
        distributor_name:'',
        ticket_title : '',
        order_id : '',
        operator_name:'',
        order_source : 0,
      },
      order_list: null,
      pagination:{
        total_count:'',
        total_page:'',
        page_index:'',
        page_size:10
      },
      refundVisible: false,
      refundData: {
        order_id: null,
        refund_num: 1,
        refund_min_num: 1,
        refund_max_num: null,
      },
      contactVisible: false,
      contactData: {
        order_id: null,
        mobile: null
      }
    }
  },
  computed: {
    orderType(){
      let routeName = this.$route.name,
          type = '';
      switch(routeName){
        case 'TicketSaleOrder':
          type = 'MyOrder';
          break;
        case 'TicketSingleOrder':
          type = 'SingleOrder';
          break;
        case 'TicketSelfSupportOrder':
          type = 'SelfSupportOrder';
          break;
      }
      return  type;
    },
    tabComponentName(){
      let type = this.orderType,
          tabName = '';

      switch(type){
        case 'SingleOrder':
          tabName = 'SingleOrderTab';
          break;
        case 'SelfSupportOrder':
          tabName = 'SelfSupportOrderTab';
          break;
      }
      return tabName
    },
    orderDetailName(){
      let type = this.orderType,
          routeName = '';

      switch(type){
        case 'MyOrder':
          routeName = 'TicketSaleOrderDetail';
          break;
        case 'SingleOrder':
          routeName = 'TicketSingleOrderDetail';
          break;
        case 'SelfSupportOrder':
          routeName = 'TicketSelfSupportOrderDetail';
          break;
      }
      return routeName
    },
    getOrderListFun(){
      let type = this.orderType,
          fun = null;

      switch(type){
        case 'MyOrder':
          fun = getTicketMyOrder;
          break;
        case 'SingleOrder':
          fun = getTicketSingleOrder;
          break;
        case 'SelfSupportOrder':
          fun = getTicketSelfSupportOrder;
          break;
      }
      return fun
    }
  },
  components: {
    SingleOrderTab,
    SelfSupportOrderTab
  },
  watch:{
    $route() {
      this.initSearchFilter();
    },
  },
  methods:{
    initSearchFilter(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filter = {
          start_date : '',
          end_date : '',
          status_code : '',
          distributor_name:'',
          ticket_title : '',
          order_id : '',
          order_source : 0,
        }
        this.orderList = null;
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        filter = JSON.parse(filter);
        filter.start_date = !filter.start_date?'': format.date(filter.start_date);
        filter.end_date = !filter.end_date?'': format.date(filter.end_date);

        this.$set(this, 'filter', filter);
        this.handlerOrderTypeRequest();
      }
    },
    handleSearchRequset(){
      let filter = this.filter;
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    handleCurrentChange(val) {
      this.pagination.page_index = val;
      this.handlerOrderTypeRequest();
    },
    handlerOrderTypeRequest(){
      let params = {
        data: JSON.parse(JSON.stringify(this.filter))
      }
      params.data.page_index = this.pagination.page_index;

      this.getOrderListFun({
        params: params,
        success: (params) => {
          let {code, msg, data} = params['data'];

          if(!code){
            this.order_list = data.order_list;
            this.pagination.total_page = data.total_page;
            this.pagination.total_count = data.total_count;
            this.pagination.page_index = data.page_index;
          }else{
            this.order_list = null;
            this.total_count = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    setRefundTicketHandler(order){
      this.refundVisible = true;
      this.refundData.order_id = order.order_id;
      this.refundData.refund_max_num = order.ticket_num;
    },
    requestRefundTicketHandler(){
      let params = {
        data: {
          order_id: this.refundData.order_id,
          refund_num: this.refundData.refund_num
        }
      };
      refundTicket({
        params: params,
        success: (params) => {
          let { success, msg } = filter;

          if(!code){
            this.order_list = data.order_list;
            this.pagination.total_page = data.total_page;
            this.pagination.total_count = data.total_count;
            this.pagination.page_index = data.page_index;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    refundDialogCloseHandler(){
      this.$refs['refundForm'].resetFields();
    },
    setContactTicketHandler(order){
      this.contactVisible = true;
      this.contactData.order_id = order.order_id;
    },
    requestChangeTicketContact(){
      let params = {
        data: {
          order_id: this.contactData.order_id,
          mobile: this.contactData.mobile
        }
      };
      changeTicketContact({
        params: params,
        success: (params) => {
          let { success, msg } = filter;

          if(success){
            this.contactVisible = false;
            this.$message.success(msg);
            this.contactDialogCloseHandler();
            this.getTicketOrderHandler();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    contactDialogCloseHandler(){
      this.$refs['contactForm'].resetFields();
    }
  },
  mounted(){
    this.handlerOrderTypeRequest();
  }
}
</script>


 <style lang="less" scoped>
  .filter{
    padding: 20px 20px 0;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .tickets{
    .tickets-header{
      background-color: #f4f4f4;
      padding: 12px 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      border-bottom: 1px solid #dddddd;

      .col{
        text-align: center;
      }

      .col-ticket-info{
        -webkit-flex: 1 1 400px;
        -ms-flex: 1 1 400px;
        flex: 1 1 400px;
      }

      .col-contacts{
        -webkit-flex: 1 1 100px;
        -ms-flex: 1 1 100px;
        flex: 1 1 100px;
      }

      .col-price{
        -webkit-flex: 1 1 100px;
        -ms-flex: 1 1 100px;
        flex: 1 1 100px;
      }

      .col-status{
        -webkit-flex: 1 1 100px;
        -ms-flex: 1 1 100px;
        flex: 1 1 100px;
      }

      .col-supply{
        -webkit-flex: 1 1 100px;
        -ms-flex: 1 1 100px;
        flex: 1 1 100px;
      }

      .col-operate{
        -webkit-flex: 1 1 200px;
        -ms-flex: 1 1 200px;
        flex: 1 1 200px;
      }
    }

    .tickets-content{
      .tickets-item{
        background-color: #fff;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        .hd{
          background-color: #fafafa;
          padding: 10px 20px;

          &::after{
            content: '';
            display: block;
            clear: both;
          }

          .cont{
            float: left;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;

            .no{
              color: #999;
              span{
                color: #b10c79;
              }
            }

            .nos{
              color: #999;
              margin-left: 30px;

              span{
                color: #333;
              }
            }
          }

          .other{
            float: right;
            .use{
              color: #999;
              i{
                font-style: normal;
                color: #333;
              }
            }
            .time{
              color: #999;
              margin-left: 30px;
            }
          }
        }
        .bd{
          height: 85px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: stretch;
          -moz-align-items: stretch;
          -ms-align-items: stretch;
          -o-align-items: stretch;
          align-items: stretch;

          .col{
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-align-items: center;
            -o-align-items: center;
            align-items: center;
            > div{
              -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
              -moz-box-flex: 1;         /* OLD - Firefox 19- */
              width: 20%;               /* For old syntax, otherwise collapses. */
              -webkit-flex: 1;          /* Chrome */
              -ms-flex: 1;              /* IE 10 */
              flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
              text-align: center;
            }
          }

          .col-ticket-info{
            -webkit-flex: 1 1 400px;
            -ms-flex: 1 1 400px;
            flex: 1 1 400px;
          }

          .col-contacts{
            -webkit-flex: 1 1 100px;
        -ms-flex: 1 1 100px;
        flex: 1 1 100px;
          }

          .col-price{
            -webkit-flex: 1 1 100px;
            -ms-flex: 1 1 100px;
            flex: 1 1 100px;
            span{
              color: #ff6600;
              font-size: 18px;
            }
          }

          .col-status{
            -webkit-flex: 1 1 100px;
            -ms-flex: 1 1 100px;
            flex: 1 1 100px;
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

          .col-supply{
            -webkit-flex: 1 1 100px;
            -ms-flex: 1 1 100px;
            flex: 1 1 100px;
          }

          .col-operate{
            -webkit-flex: 1 1 200px;
            -ms-flex: 1 1 200px;
            flex: 1 1 200px;
            a{
              white-space: nowrap;
            }
          }

          .ticket-info-cont{
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-align-items: center;
            -o-align-items: center;
            align-items: center;
          }

          .name{
            box-sizing: border-box;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            text-align: left;
            padding: 0 20px;
            span{
              color: #0077f4;
            }
          }

          .price{
            width: 160px;
            span{
              color: #ff6600;
            }
          }

          .status{
            width: 104px;

            .gr{
              color: #45bb33;
            }

            .rd{
              color: #ff0d0d;
            }
          }
        }
      }
    }
  }
  .empty{
    background-color: #fff;
    color: #999;
    padding: 10px 0;
    text-align: center;
  }
  .refund-footer{
    text-align: center;
  }
  .refund-cont{
    text-align: center;

    p{
      margin-bottom: 15px;
    }
  }
  .pagination{
    text-align: center;
    padding-top: 30px;
  }
 </style>
