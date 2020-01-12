<template>
  <div class="wrapper">
    <div v-if="orderDetail" class="train-detail">
      <div class="panel">
        <div class="hd">
          <h2>订单信息</h2>
        </div>
        <div class="bd">
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
                <td>{{ orderDetail.order_info.order_no }}</td>
                <td>{{ orderDetail.order_info.create_time }}</td>
                <td>{{ orderDetail.order_info.pay_type_name }}</td>
                <td>{{ orderDetail.order_info.total_amount }}</td>
                <td>{{ orderDetail.order_info.receipted_amount }}</td>
                <td>{{ orderDetail.order_info.uncollected_amount }}</td>
                <td>{{ orderDetail.order_info.supplier_name }}</td>
                <td>{{ orderDetail.order_info.order_status_name }}</td>
                <td>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        </el-dropdown-item>
                      <el-dropdown-item>在线支付</el-dropdown-item>
                      <el-dropdown-item>取消订单</el-dropdown-item>
                      <el-dropdown-item>申请退款</el-dropdown-item>
                      <el-dropdown-item divided>
                         <a href="javascript:;" @click="shoukunDialogVisible = true">添加收入</a>
                      </el-dropdown-item>
                      <el-dropdown-item>查看收入</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
                结算总金额：<i>0</i>
              </span> 
              <span>
                本位币：<i>0</i>
              </span>
            </div>
            <el-button type="primary" :class="'op-btn'" @click="addPricingHandler">+ 新增项目</el-button>
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
                <th width="100">操作</th>
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
                <td>-</td>
              </tr>
              <tr v-for="(pric, key) in pricingForm" :key="'item'+key">
                <td>{{ key + orderDetail.price_detail.length + 1 }}</td>
                <td><el-input></el-input></td>
                <td><el-input></el-input></td>
                <td><el-input></el-input></td>
                <td><el-input-number :min="1" :class="'input-number'"></el-input-number></td>
                <td></td>
                <td></td>
                <td><el-input></el-input></td>
                <td></td>
              </tr>
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
                退票
              </template>
            </el-table-column>
          </el-table>
          <div class="tourist-tools">
            <el-button @click="handleTouristChangeTicket">改签</el-button>
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, key) in orderDetail.log" :key="key">
                <td>{{ log.create_time }}</td>
                <td>{{ log.op_type }}</td>
                <td>{{ log.order_status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <add-shoukuan-dialog :visible.sync="shoukunDialogVisible"></add-shoukuan-dialog>
  </div>
</template>
<script>
import AddShoukuanDialog from 'src/components/distribution/AddShoukuanDialog.comp.vue';
import { getDistributionTrainOrderDetailAsyncRequest, changeDistributionTrainFromAsyncRequest } from 'src/api/train';
export default {
  data () {
    return {
      orderDetail: null,
      pricingForm: [],
      shoukunDialogVisible: false,
      touristSelection: []
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
  components: {
    AddShoukuanDialog
  },
  methods: {
    getTrainOrderDetailHandler(){
      let params = {
        data: {
          order_id: this.$route.query.orderId
        }
      }
      getDistributionTrainOrderDetailAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.orderDetail = data;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    addPricingHandler(){
      this.pricingForm.push({});
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
            order_id: this.orderDetail.order_info.id
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
    }
  },
  mounted () {
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
  .tourist-tools{
    padding: 10px 20px;
    border:1px solid #ddd;
    border-top: 0;
  }
</style>

