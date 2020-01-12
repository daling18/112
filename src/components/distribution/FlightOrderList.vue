<template>
  <div>
    <template v-if="getOrderOption.type == 'MyOrder'">
      <my-order-tab name="flight"></my-order-tab>
    </template>
    <template v-if="getOrderOption.type == 'PurchaseOrder'">
      <purchase-order-tab name="flight"></purchase-order-tab>
    </template>
    <template v-if="getOrderOption.type == 'SingleOrder'">
      <single-order-tab name="flight"></single-order-tab>
    </template>

    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">机票类型</div>
          <el-select  placeholder="机票类型"  v-model="filter.order_flight_type">
            <el-option label="全部" :value="''"></el-option>
            <el-option label="国内机票（单程）" :value="'1'"></el-option>
            <el-option label="国内机票（往返）" :value="'2'"></el-option>
            <el-option label="国际机票（单程）" :value="'3'"></el-option>
            <el-option label="国际机票（往返）" :value="'4'"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单分类</div>
          <el-select  placeholder="订单分类"  v-model="filter.sub_type">
            <el-option label="全部" :value="'0'"></el-option>
            <el-option label="有退款" :value="'1'"></el-option>
            <el-option label="有变更" :value="'2'"></el-option>
            <el-option label="有儿童" :value="'3'"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">订单状态</div>
          <el-select  placeholder="订单状态" v-model="filter.status_code">
            <el-option label="全部" :value="''"></el-option>
            <!-- <el-option label="待处理" :value="'OS000'"></el-option>
            <el-option label="正在处理" :value="'OS001'"></el-option> -->
            <el-option label="待付款" :value="'OS003'"></el-option>
            <el-option label="出票中" :value="'OS013'"></el-option>
            <el-option label="已完成" :value="'OS009'"></el-option>
            <el-option label="已取消" :value="'OS011'"></el-option>
            <el-option label="退票处理中" :value="'EA017'"></el-option>
            <el-option label="退票成功" :value="'OS018'"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">代理商</div>
          <el-input placeholder="代理商"  v-model="filter.distributor_name"></el-input>
        </div>
        <div class="search-item calendar">
          <div class="label">出发日期</div>
          <el-date-picker v-model="filter.depart_date_start"
                              placeholder="选择日期"
                              type="date"></el-date-picker>
          <div class="label zhi"> - </div>
          <el-date-picker v-model="filter.depart_date_end"
                              :picker-options="datepickerOptions"
                              placeholder="选择日期"
                              type="date"></el-date-picker>
        </div>
        <div class="search-item calendar">
          <div class="label">下单日期</div>
          <el-date-picker v-model="filter.create_date_start"
                              placeholder="选择日期"
                              type="date"></el-date-picker>
          <div class="label zhi"> - </div>
          <el-date-picker v-model="filter.create_date_end"
                              :picker-options="datepickerOptions"
                              placeholder="选择日期"
                              type="date"></el-date-picker>
        </div>
        <div class="search-item">
          <div class="label">关键词</div>
          <el-input placeholder="订单编号/乘机人"  v-model="filter.keyword"></el-input>
        </div>
        <div class="search-item">
          <div class="label">销售人员</div>
          <el-input v-model="filter.operator_name" placeholder="请输入销售人员"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary"
              @click="handleSearchRequset">查询</el-button>
        </div>

      </div>
    </div>
    
    
    <div class="system-content">
    <div class="content-list">
      <el-table class="el-table--middle" :data="orderList" border style="width: 100%">
        <el-table-column
          prop="order_id"
          label="订单号"
          header-align="center"
          align="center"
          width="250"
          :resizable="false">
          <template slot-scope="scope">
            <span class="color-purple">[{{scope.row.order_source_name}}]</span> {{scope.row.order_id}}
          </template>
        </el-table-column>
        <el-table-column
          label="航程信息"
          header-align="center"
          align="center"
          width="200"
          :resizable="false">
          <template slot-scope="scope">
          <el-popover
            placement="left"
            trigger="hover">
            <template v-for="(obj,idx) in scope.row.flight_list">
              <div :key="idx" class="flight-info">
                <p>{{obj.depart_city_name}} 
                  <span class="arrow">
                  <i class="el-icon-minus"></i><i class="el-icon-arrow-right"></i>
                  </span>
                  {{obj.arrive_city_name}}
                </p>
                <p class="text">{{obj.flight_no}}</p>
                <p class="text">{{obj.depart_date}}</p>
              </div>
              <div class="flight-info" slot="reference" :key="idx" v-if="idx==0">
                <p>{{obj.depart_city_name}} 
                  <span class="arrow">
                  <i class="el-icon-minus"></i><i class="el-icon-arrow-right"></i>
                  </span>
                  {{obj.arrive_city_name}}
                </p>
                <p>{{obj.flight_no}}</p>
                <p>{{obj.depart_date}}</p>
              </div>
            </template>
          </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="乘机人"
          header-align="center"
          align="right"
          width="200"
          :resizable="false">
           <template slot-scope="scope">
                  <div class="tourist_Info" v-if="scope.row.tourist_list.length>2">
                    <el-popover
                      placement="right"
                      width="250"
                      trigger="hover">
                      <div class="mode-table">
                      <table class="el-table">
                        <tr>
                          <th>类型</th>
                          <th>姓名</th>
                        </tr>
                        <tr v-for="(td,tid) in scope.row.tourist_list" :key="tid">
                          <td class="tc">{{td.type}}</td>
                          <td>{{td.name}}
                            <span>
                              <!-- <router-link :to="{ path: '/distribution/flight-order/refund', query: { order_id: orderData.order_id }}" 
                                    v-if="td.change_status"
                                    class="mark">变</router-link> -->
                              <router-link :to="{ name: getOrderOption.refundDetailRouteName, query: { order_id: orderData.order_id }}" 
                                    v-if="td.refund_status"
                                    class="mark">退</router-link>
                            </span>
                          </td>
                        </tr>
                      </table>
                      </div>
                      <a href="javascript:;" class="look"  slot="reference" style="color:#555;">
                        <p>{{scope.row.tourist_list[0].name}}
                          <!-- <router-link :to="{ path: scope.row.order_type == 1?'/order/flight/change_order':'/order/flight/internation_change_order', 
                                        query: { order_id: scope.row.order_id }}" 
                                        v-if="scope.row.tourist_list[0].change_status"
                                        class="mark">变</router-link> -->
                          <router-link :to="{ name: getOrderOption.refundDetailRouteName,
                                        query: { order_id: scope.row.order_id }}" 
                                        v-if="scope.row.tourist_list[0].refund_status"
                                        class="mark">退</router-link>
                        </p>
                        <p>{{scope.row.tourist_list[1].name}}
                          <span class="color-type">[{{scope.row.tourist_list[1].type}}]</span>
                          <!-- <router-link :to="{ path:  scope.row.order_type == 1?'/order/flight/change_order':'/order/flight/internation_change_order', 
                                        query: { order_id: scope.row.order_id }}" 
                                        v-if="scope.row.tourist_list[1].change_status"
                                        class="mark">变</router-link> -->
                          <router-link :to="{ name: getOrderOption.refundDetailRouteName,
                                        query: { order_id: scope.row.order_id }}" 
                                        v-if="scope.row.tourist_list[1].refund_status"
                                        class="mark">退</router-link>
                        </p>
                        <p>...</p>
                      </a>
                    </el-popover>
                  </div>
                  <div class="tourist_Info" v-else>
                    <p v-for="(tourist,idx) in scope.row.tourist_list" :key="idx">
                      {{tourist.name}}
                      <span class="color-type" v-if="tourist.type=='儿童'">[{{tourist.type}}]</span>
                      <!-- <router-link :to="{ path: scope.row.order_type == 1?'/order/flight/change_order':'/order/flight/internation_change_order', 
                                    query: { order_id: scope.row.order_id }}" 
                                    v-if="tourist.change_status"
                                    class="mark">变</router-link> -->
                      <router-link :to="{ name: getOrderOption.refundDetailRouteName,
                                    query: { order_id: scope.row.order_id }}" 
                                    v-if="tourist.refund_status"
                                    class="mark">退</router-link>
                    </p>
                  </div>
          </template>
        </el-table-column>
        <el-table-column
          label="订单金额"
          prop="total_price"
          header-align="center"
          align="right"
          width="120"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="已收"
          prop="rmb_receipted_amount"
          header-align="center"
          align="right"
          width="120"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="未收"
          prop="rmb_unpaid_amount"
          header-align="center"
          align="right"
          width="120"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="status_name"
          header-align="center"
          align="center"
          width="120"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="销售人员"
          prop="operator_name"
          header-align="center"
          align="center"
          width="150"
          :resizable="false">
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            prop="op_name"
            :show-overflow-tooltip="true"
            width="100"
            label="订单负责人">
          </el-table-column>
        <el-table-column
          label="下单时间"
          prop="create_time"
          header-align="center"
          align="center"
          width="150"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="代理商/直客"
          prop="distributor_name"
          header-align="center"
          align="center"
          width="200"
          :resizable="false">
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          align="center"
          width="100"
          fixed="right"
          :resizable="false">
            <template slot-scope="scope">
              <router-link :to="{ path: '/distribution/flight-order/detail', 
                                      query: { order_id: scope.row.order_id }}" 
                                      v-if="$route.name == 'DistributionFlightMyOrder'"
                                      class="look">查看</router-link>
              <!-- <router-link :to="{ path: '/distribution/flight-purchase-order/detail', 
                                      query: { order_id: scope.row.order_id }}" 
                                      v-if="$route.name == 'DistributionFlightPurchaseOrder'"
                                      class="look">查看Purchase</router-link>     -->
              <router-link :to="{ path: '/plan/single-flight-order/detail', 
                                      query: { order_id: scope.row.order_id }}" 
                                      v-if="$route.name == 'DistributionFlightSingleOrder'"
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
  </div>
</template>

<script>
import { getFlightMyOrder,
getFlightPurchaseOrder,
getFlightSingleOrder } from 'src/api/flight';
import Clipboard from 'clipboard';
import MyOrderTab from 'src/components/distribution/components/MyOrderTab.vue';
import PurchaseOrderTab from 'src/components/distribution/components/PurchaseOrderTab.vue'
import SingleOrderTab from 'src/components/plan/components/SingleOrderTab.vue'
import * as format from 'src/utils/format';

export default {
  name: 'orderList',
  data() {
    return {
      filter:{
        order_flight_type:'',
        sub_type:'',
        status_code:'',
        distributor_name:'',
        depart_date_start:'',
        depart_date_end:'',
        create_date_start:'',
        create_date_end:'',
        operator_name:'',
        keyword:''
      },
      orderList: null,
      datepickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pagination:{
        total_count:'',
        total_page:'',
        page_index:'',
        page_size:10
      }
    }
  },
  computed: {
    getOrderOption(){
      let routeName = this.$route.name,
          type,
          detailRouteName,
          refundDetailRouteName,
          requestFn;
      switch(routeName){
        case 'DistributionFlightMyOrder':
          type = 'MyOrder';
          detailRouteName = 'DistributionFlightMyOrderDetail';
          refundDetailRouteName = 'DistributionFlightMyOrderRefundDetail';
          requestFn = getFlightMyOrder;
          break;
        case 'DistributionFlightPurchaseOrder':
          type = 'PurchaseOrder';
          detailRouteName = 'DistributionFlightPurchaseOrderDetail';
          refundDetailRouteName = 'DistributionFlightPurchaseOrderRefundDetail';
          requestFn = getFlightPurchaseOrder;
          break;
        case 'DistributionFlightSingleOrder':
          type = 'SingleOrder';
          detailRouteName = 'DistributionFlightSingleOrderDetail';
          refundDetailRouteName = 'DistributionFlightSingleOrderRefundDetail';
          requestFn = getFlightSingleOrder;
          break;
      }
      return {
        type,
        detailRouteName,
        refundDetailRouteName,
        requestFn
      }
    }
  },
  components: {
    MyOrderTab,
    PurchaseOrderTab,
    SingleOrderTab
  },
  watch:{
    $route() {
      this.initSearchFilter();
    },
  },
  methods: {
    copyclipboardTodo () {
      let clipboard = new Clipboard('.copy-text');
      clipboard.on('success', e => {
        // 释放内存
        this.$message({
          message:'复制成功',
          type:'success'
        });
        clipboard.destroy();
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({
          message:'浏览器不支持自动复制，请手动复制。',
          type:'success'
        })
        // 释放内存
        clipboard.destroy();
      })
    },
    initSearchFilter(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filter = {
          order_flight_type:'',
          sub_type:'',
          status_code:'',
          distributor_name:'',
          depart_date_start:'',
          depart_date_end:'',
          create_date_start:'',
          create_date_end:'',
          keyword:''
        }
        this.orderList = null;
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        filter = JSON.parse(filter);
        filter.depart_date_start = !filter.depart_date_start?'': format.date(filter.depart_date_start);
        filter.depart_date_end = !filter.depart_date_end?'': format.date(filter.depart_date_end);
        filter.create_date_start = !filter.create_date_start?'':  format.date(filter.create_date_start);
        filter.create_date_end = !filter.create_date_end ?'': format.date(filter.create_date_end);
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
    handlerOrderTypeRequest() {
     let params = {
        data: JSON.parse(JSON.stringify(this.filter))
      }
      params.data.page_index = this.pagination.page_index;

      this.getOrderOption.requestFn({
        params: params,
        success: (params) => {
          let {code, msg, data} = params['data'];

          if(!code){
            this.orderList = data.order_list;
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
  },
  mounted() {
    this.handlerOrderTypeRequest();
  }
}

</script>

<style lang="less" scoped>
  .order{
    

      margin-top:10px;

      table{
        width:100%;
        background:#fff;
        border-collapse: collapse;

         tbody{
          tr{
            td{
              .color-type{
                color: #7470f9;
                margin-right: 3px;
              }
              .copy-text{
                cursor: pointer;
              }
              .mark{
                color: #fff;
                background:#e33dbe;
                border-radius: 3px;
                width: 25px;
                height: 20px;
                line-height: 20px;
                display: inline-block;
                text-align: center;
              }
              .amount{
                color:#ff6600;
              }
              .foreign{
                color:#ff9c31;
              }
              .comeback{
                color:#01bcad;
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
            }
          }
         }

        .cell{
          padding:10px;
          text-align:center;

          p{
            margin:0;
            padding:0;
            line-height:20px;
          }
        }
      }
    

    .page{
      position:relative;
      background:#fff;
      padding:20px;
      height:30px;


      .el-pagination{
        float:right;
      }
    }

    .no-data{
      width:220px;
      padding:20px;
      margin:40px auto;
    }
  }
  .flight-info{
    font-size: 14px;
    color: #333;
    padding: 5px 15px;
    line-height: 18px;
    &:first-child{
      margin-top: 0;
    }
    .text{
      font-size: 12px;
    }
    .arrow{
      transform: scale(0.8);
      font-size: 9px;
    }
  }
  .el-popover{
    .flight-info{
      margin-top: 10px;
      padding: 0 15px;
    }
  }
  .tourist_Info{
    p{margin-top:3px !important;}
  }
  .pagination{
    background: #fff;
    text-align: center;
    padding-top: 30px;
  }
</style>


