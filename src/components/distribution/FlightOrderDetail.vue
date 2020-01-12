<template>
<div class="wrapper" v-if="orderByData">

    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <li class="on">订单详情</li>
          <router-link :to="{ name: orderTypeRouterName.orderRefundDetailName, query: { order_id: $route.query.order_id }}" 
            v-if="orderByData.order_info.refund_status"
            tag="li">
            退款详情
          </router-link>
        </template>
      </ul>
    </div>

    <div class="pannel-order-detail">
    <!--订单信息-->
    <div class="panel">
      <div class="hd">
        <h2>订单信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <p class="tips" v-if="orderByData.order_info.status_code == 'OS003'">
                请在{{endOrderTime}}分钟内支付订单，未准时支付，订单会自动关闭
              </p>
              <p class="mb10" v-if="orderType == 'SelfSupportOrder'">单项订单：{{orderByData.order_info.common_order_id}}</p>
              <table class="table-custom">
                <tr>
                  <th width="180">订单号</th>
                  <th width="120">下单时间</th>
                  <th width="100">订单类型</th>
                  <th width="100">支付方式</th>
                  <th width="">订单金额</th>
                  <th width="">已收金额</th>
                  <th width="">未收金额</th>
                  <th width="">结算方</th>
                  <th width="">订单状态</th>
                  <th>操作</th>
                </tr>
                <tr v-if="orderByData && orderByData.order_info">
                  <td>{{orderByData.order_info.order_id}}</td>
                  <td>{{orderByData.order_info.create_time}}</td>
                  <td>{{orderByData.order_info.flight_order_type == 1?'国内机票':'国际机票'}}</td>
                  <td>{{'在线支付'}}</td>
                  <td>{{orderByData.order_info.total_price}}</td>
                  <td>{{orderByData.order_info.rmb_receipted_amount}}</td>
                  <td>
                    <span v-if="orderByData.order_info.status_code != 'OS011'">{{ orderByData.order_info.rmb_unpaid_amount }}</span>
                    <span v-else>--</span>
                  </td>
                  <td>{{orderByData.order_info.distributor_name}}</td>
                  <td>{{orderByData.order_info.status_name}}</td>
                  <td>
                    <el-dropdown trigger="click" v-if="orderByData.order_info.allow_operation 
                      && orderByData.order_info.status_code != 'OS011'
                      && orderByData.order_info.status_code != 'OS013'">
                      <span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="orderByData.order_info.status_code == 'OS009'">
                          <span @click="inlandRefundVis=true">申请退/废票</span>
                        </el-dropdown-item>
                        <!-- <el-dropdown-item>
                          <span @click="inlandChangeLogVis=true">申请变更</span>
                        </el-dropdown-item> -->
                        <el-dropdown-item v-if="orderByData.order_info.status_code == 'OS003'">
                          <a href="javascript:;" @click="getByOrderCancel">取消订单</a>
                        </el-dropdown-item>
                        <!-- <el-dropdown-item>
                          <a href="javascript:;" @click="addShoukuanVisible=true">添加收款</a>
                        </el-dropdown-item> -->
                        <el-dropdown-item v-if="orderByData.order_info.status_code == 'OS003'">
                          <a href="javascript:;" @click="handleOnlinePay">在线支付</a>
                        </el-dropdown-item>
                        <el-dropdown-item v-if="orderByData.order_info.status_code == 'OS009'">
                          <router-link :to="{ name: orderTypeRouterName.orderIncomeDetailName, 
                          query: { bid: orderByData.order_info.bill_id, type:orderTypeRouterName.configType } }">查看收入</router-link>          
                        </el-dropdown-item>
                        <el-dropdown-item v-if="$menuPermission('api/order/set_order_operation') && orderType != 'MyOrder'">
                          <a href="javascript:;" @click="handleChangeOrderOperator">订单负责人</a>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <span v-else>--</span>
                  </td>
                </tr>
              </table>
          </div>
      </div>
    </div>


    <!--订单价格明细-->
    <div class="panel">
      <div class="hd">
        <h2>订单价格明细</h2>
        <!-- <el-button type="primary" style="float:right;" @click="addLinePriceDetail">新增项目</el-button> -->
      </div>
      <div class="bd">
        <div class="info-list">
          <span><i>结算币种 / 汇率：</i>人民币 / 1</span>
          <span><i>结算总金额：</i>{{totalPrice}}</span>
          <span><i>本位币：</i>{{totalPrice}}</span>
        </div>
        <table class="table-custom">
          <tr>
            <th>序号</th>
            <th width="300">项目</th>
            <th>单价（本位币)</th>
            <th>结算单价</th>
            <th>数量</th>
            <th>结算金额小计</th>
            <th>小计（本位币)</th>
            <th>说明</th>
            <!-- <th>操作</th> -->
          </tr>
          <template  v-if="orderByData && orderByData.order_price_detail">
          <tr v-for="(item,idx) in orderByData.order_price_detail" :key="idx">
            <template v-if="!item.isadd">
              <td>{{idx+1}}</td>
              <td>{{item.item_name}}</td>
              <td>{{item.rmb_unit_price}}</td>
              <td>{{item.unit_price}}</td>
              <td>{{item.num}}</td>
              <td>{{item.unit_price * item.num}}</td>
              <td>{{item.rmb_total_amount}}</td>
              <td></td>
              <!-- <td>--</td> -->
            </template>
            <!-- <template v-else>
              <td>{{idx+1}}</td>
              <td>
                <el-input v-model="item.item_name" placeholder="请输入项目名称"></el-input>
              </td>
              <td>{{item.unit_price}}</td>
              <td>
                <el-select v-model="item.price_type" placeholder="请选择" style="width:50px;">
                  <el-option label="+" :value="1"></el-option>
                  <el-option label="-" :value="-1"></el-option>
                </el-select>
                <el-input v-model="item.unit_price" placeholder="请输入结算单价"></el-input>
              </td>
              <td>
                <el-input v-model="item.num" placeholder="请输入数量"></el-input>
              </td>
              <td>{{item.unit_price * item.num}}</td>
              <td>{{item.unit_price * item.num}}</td>
              <td><el-input v-model="item.remark" placeholder="请输入说明"></el-input></td>
              <td>
                <el-button type="text" @click="saveLinePriceDetail(idx)">保存</el-button>
                <el-button type="text" @click="delLinePriceDetail(idx)">删除</el-button>
              </td>
            </template> -->
          </tr>
          </template>
        </table>
      </div>
    </div>
    

    <!--航班信息-->
    <div class="panel">
      <div class="hd">
        <h2>航班信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="table-custom">
                <tr>
                  <th>航段</th>
                  <th>航班号</th>
                  <th width="150">出发地-目的地</th>
                  <th width="150">出发-到达时间</th>
                  <th>共享航司</th>
                  <th>机型</th>
                  <th>舱位</th>
                </tr>
                <template v-if="orderByData && orderByData.flight_detail">
                <tr v-if="orderByData" v-for="(item,idx) in orderByData.flight_detail" :key="idx">
                  <td>{{'第'+item.index_seg+'程'}}</td>
                  <td>{{item.flight_no}}</td>
                  <td>{{item.depart_city_name}} - {{item.arrive_city_name}}</td>
                  <td>
                    <p>{{item.depart_date}} {{item.depart_time}}</p> 
                    <p>至</p>
                    <p>{{item.arrive_date}} {{item.arrive_time}}</p>
                      <el-popover v-if="item.stop_num" placement="bottom" 
                        width="600"
                        trigger="hover" @show="getByFlightStopDetail(item.flight_no,item.depart_date,idx)">
                          <table class="flight-info-table">
                              <thead>
                                  <tr>
                                      <th>出发地</th>
                                      <th>出发时间</th>
                                      <th>经停地</th>
                                      <th>停留时间</th>
                                      <th>抵达地</th>
                                      <th>抵达时间</th>
                                  </tr>
                              </thead>
                              <tbody v-if="item.stop_point_list">
                                  <template>
                                      <tr>
                                          <td>{{item.stop_point_list.stop_infos[0].city_name}}</td>
                                          <td>{{item.stop_point_list.stop_infos[0].dep_time}}</td>
                                          <td>{{item.stop_point_list.stop_infos[1].city_name}}</td>
                                          <td>{{item.stop_point_list.stop_infos[1].arri_time}} - {{item.stop_point_list.stop_infos[1].dep_time}}</td>
                                          <td>{{item.stop_point_list.stop_infos[2].city_name}}</td>
                                          <td>{{item.stop_point_list.stop_infos[2].arri_time}}</td>
                                      </tr>
                                  </template>
                              </tbody>
                          </table>
                          <el-button type="text" slot="reference">经停</el-button>
                      </el-popover>
                  </td>
                  <td>{{item.share_airline_name}}</td>
                  <td>{{item.craft_type}}</td>
                  <td>{{item.seat_type}}</td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>


    <!--乘机人信息-->
    <div class="panel">
      <div class="hd">
        <h2>乘机人信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="table-custom">
                <tr>
                  <th>姓名</th>
                  <th>证件类型</th>
                  <th width="200">证件号</th>
                  <th>乘客类型</th>
                  <th>票号</th>
                  <th>新票号</th>
                  <th>票的状态</th>
                </tr>
                <template v-if="orderByData && orderByData.tourist_list">
                <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
                  <td>{{item.tourist_name}}</td>
                  <td>{{item.identity_type_name}}</td>
                  <td>{{item.identity_no}}</td>
                  <td>{{item.tourist_type_name}}</td>
                  <td>{{item.ticket_nos}}</td>
                  <td>{{item.new_ticket_nos}}</td>
                  <td>{{item.ticket_status_name === '无状态'? '--': item.ticket_status_name}}</td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>


    <!--联系人信息-->
    <div class="panel">
      <div class="hd">
        <h2>联系人信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="table-custom">
                <tr>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>其他联系方式</th>
                </tr>
                <template v-if="orderByData && orderByData.order_info">
                <tr>
                  <td>{{orderByData.order_info.contact_name}}</td>
                  <td>{{orderByData.order_info.contact_mobile}}</td>
                  <td>{{orderByData.order_info.contact_email}}</td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>

    <!--订单变更记录-->
    <div class="panel">
      <div class="hd">
        <h2>订单变更记录</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="table-custom">
                <tr>
                  <th>时间</th>
                  <th>操作说明</th>
                  <th>订单状态</th>
                  <th>操作人</th>
                </tr>
                <template v-if="orderByData && orderByData.operation_log">
                <tr v-for="(obj,index) in orderByData.operation_log" :key="index">
                  <td>{{obj.create_time | formatDate}}</td>
                  <td>{{obj.op_type}}</td>
                  <td>{{obj.order_status}}</td>
                  <td>{{obj.op_user_name}}</td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>

    <div class="footer-tool-bar">
      <!-- <el-button type="primary" size="large"
                 @click="ticketRefundTodo"
                 v-if="stepBar.type === 3 && stepBar.index === 1 &&  orderByData.order_type === 1">提交，查看退票费</el-button> -->
      <el-button size="large" @click="$router.push({path:'/distribution/flight-order'})">返回</el-button>
  </div>

    









  <add-shoukuan-dialog :visible.sync="addShoukuanVisible" @submit="handleSaveShoukuan" @close="addShoukuanVisible=false" />
  <!-- 机票变更dlg -->
  <el-dialog title="申请机票变更" size="large" :visible.sync="inlandChangeLogVis">
    <div class="legend" v-if="orderByData && orderByData.change_rule">
      <p v-for="(obj,key,idx) in orderByData.change_rule" :key="idx" v-html="obj">
        {{key}}：{{obj}}
      </p>
    </div>
    <el-form :model="modifyForm"
              label-width="100px"
              style="margin-top:10px;">
    <p class="tit">选择乘客</p>
    <div class="table-module">
      <table class="table-custom">
        <tr>
          <th width="50"><el-checkbox v-model="modifyForm.allcheck" @change="handleCheckAllChange">&nbsp;</el-checkbox></th>
          <th width="120">乘客姓名</th>
          <th width="120">乘客类型</th>
          <th width="">证件号码</th>
          <th width="150">票号</th>
        </tr>
        <template v-if="orderByData && orderByData.tourist_list">
        <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
          <td>
            <el-checkbox-group v-model="modifyForm.change_tourist" @change="handleCheckedSingleChange">
              <el-checkbox :label="item.name" :disabled="item.ticket_status==2 ?false:true">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td>{{item.tourist_name}}</td>
          <td>{{item.tourist_type_name}}</td>
          <td>{{item.identity_no}}</td>
          <td class="tc">{{item.ticket_nos}}</td>
        </tr>
        </template>
      </table>
    </div>
    <p class="tit">选择航段</p>
    <div class="table-module">
      <table class="table-custom" v-if="orderByData && orderByData.flight_detail">
        <tr>
          <th width="50"><el-checkbox v-model="modifyForm.flightAllCheck" @change="flightCheckAllChange">&nbsp;</el-checkbox></th>
          <th width="100">航程</th>
          <th width="100">航段</th>
          <th width="100">航班起飞时间</th>
          <th width="">航程信息</th>
          <th>航班号</th>
          <th>舱位</th>
        </tr>
        <template v-for="(item,idx) in orderByData.flight_detail">
          <tr :key="idx">
            <td>
              <el-checkbox-group v-model="modifyForm.change_detail" @change="flightCheckedSingleChange">
                <el-checkbox :label="item">&nbsp;</el-checkbox>
              </el-checkbox-group>
            </td>
            <td>{{item.index_seg}}</td>
            <td>第{{item.index_seg}}段</td>
            <td>{{item.depart_date}} {{item.depart_time}}</td>
            <td>{{item.depart_city_name}} - {{item.arrive_city_name}}</td>
            <td>{{item.flight_no}}</td>
            <td>{{item.seat_type}}</td>
          </tr>
          <tr :key="idx">
            <td colspan="7">
              <div class="change-flight-info">
                <p class="sub-tit">要变更的新航班信息（选填）</p>
                <el-form-item label="变更航班号">
                  <el-input v-model="item.changed_flight_no" placeholder="航班号"></el-input>
                  <el-input v-model="item.changed_seat_code" placeholder="舱位编码"></el-input>
                </el-form-item>
                <el-form-item label="变更城市">
                  <el-input v-model="item.changed_dep_city" placeholder="出发"></el-input>
                  <el-input v-model="item.changed_arr_city" placeholder="到达"></el-input>
                </el-form-item>
                <el-form-item label="变更起飞日期">
                  <el-date-picker
                    v-model="item.changed_dep_date"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </div>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <div class="tit">变更内容</div>
    <el-form-item label="变更类型" required style="margin-top:10px;">
        <el-select  placeholder="请选择类型"  v-model="modifyForm.change_type">
          <el-option label="请选择类型" value=""></el-option>
          <el-option label="改期" value="1"></el-option>
          <el-option label="挂起" value="2"></el-option>
          <el-option label="解挂" value="3"></el-option>
          <el-option label="分离编码" value="4"></el-option>
          <el-option label="取消编码" value="5"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="变更备注">
        <el-input type="textarea" v-model="modifyForm.change_remark" class="textarea"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
      <el-button @click="inlandChangeLogVis = false">取 消</el-button>
      <el-button type="primary" @click="changeOrderSubmit">确 定</el-button>
  </div>
</el-dialog>

<!-- 退废票dlg -->
<el-dialog title="申请退/废票" size="large" :visible.sync="inlandRefundVis">
  <div class="legend" v-if="orderByData && orderByData.refund_rule">
    <p v-for="(obj,key,idx) in orderByData.refund_rule" :key="idx" v-html="obj">
      {{key}}：{{obj}}
    </p>
  </div>
  <p class="tit">选择乘客</p>
  <div class="table-module">
  <table class="table-custom">
    <tr>
      <th width="50"><el-checkbox v-model="refundForm.allcheck" @change="refundCheckAllChange">&nbsp;</el-checkbox></th>
      <th width="">乘客姓名</th>
      <th width="">乘客类型</th>
      <th width="">票号</th>
    </tr>
    <template v-if="orderByData && orderByData.tourist_list">
    <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
      <td>
        <el-checkbox-group v-model="refundForm.ticket_list" @change="refundCheckedSingleChange">
          <el-checkbox :label="item.ticket_nos" :disabled="item.ticket_status_name == '已出票' ?false:true">&nbsp;</el-checkbox>
        </el-checkbox-group>
      </td>
      <td>{{item.tourist_name}}</td>
      <td>{{item.tourist_type_name}}</td>
      <td class="tc">{{item.ticket_nos}}</td>
    </tr>
    </template>
  </table>
  </div>
  <p class="tit">选择航段</p>
  <div class="table-module">
  <table class="table-custom">
    <tr>
      <th width="50"><el-checkbox v-model="refundForm.flightAllCheck" @change="refundFlightAllChange">&nbsp;</el-checkbox></th>
      <th width="100">航班起飞时间</th>
      <th width="">航程信息</th>
      <th>航班号</th>
      <th>舱位</th>
    </tr>
    <template v-if="orderByData && orderByData.flight_detail">
    <tr v-for="(item,idx) in orderByData.flight_detail" :key="idx">
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
    </template>
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
    <el-button @click="inlandRefundVis = false">取 消</el-button>
    <el-button type="primary" @click="ticketRefundTodo">确 定</el-button>
  </div>
</el-dialog>
<online-pay ref="onlinePay" :order-id="orderNo" order-resource="2" />
<change-order-operator v-if="$menuPermission('api/order/set_order_operation')" ref="operator" order-type="1" @change-success="getByOrderDetail"></change-order-operator>

    </div>
  </div>
</template>

<script>
  import { getFlightMyOrderDetail,
           getFlightSingleOrderDetail,
           getFlightSelfSupportOrderDetail,
           setFlightModifyPrice,
           flightOrderCancel,
           flightOrderChange,
           refundFlight,
           flightRefundFee,
           getInlandFlightStopDetail,
           flightTodo
         } from 'src/api/flight';
  import {saveSaleOrderGathering,
        saveTeamOrderGathering,
        financeSaveOrderGathering} from 'src/api/api';
  import AddShoukuanDialog from 'src/components/distribution/AddShoukuanDialog.comp.vue';
  import OnlinePay from "src/components/distribution/components/OnlinePay.vue";
  import ChangeOrderOperator from 'src/plugins/ChangeOrderOperator.vue';
  import * as format from 'src/utils/format';

	export default {
		data() {
			return {
        operateType: 1, // 1）预订正常流程；2）取消预订；3）退票；4）变更（改签、二次购买快递、购买保险）
        orderByData:null,
        refundFee:null,
        orderinfo:null,
        checkarr:[],
        refund_type:0,
        stepBar:{
          type:1,
          index:1
        },
        loading:false,
        inlandChangeLogVis:false,
        modifyForm:{
          change_type:'',
          tourist:[],
          allcheck:false
        },
        inlandRefundVis:false,
        refundForm:{
          refund_type:'',
          refund_reason:'',
          ticket_list:[],
          allcheck:false,
        },
        addShoukuanVisible:false,
        orderNo:'',
        isIntervalFlag:0,
        endOrderTime:null
      }
    },
    filters:{
      getLocalTime(nS) {     
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
      },
      formatDate(d) { 
        let now=new Date(d*1000)
        let year=now.getFullYear(); 
        let month=now.getMonth()+1; 
        let date=now.getDate(); 
        let hour=now.getHours(); 
        let minute=now.getMinutes(); 
        let second=now.getSeconds(); 
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
      } 
    },
    computed: {
      orderType(){
        let routeName = this.$route.name,
            type = '';
        switch(routeName){
          case 'DistributionFlightMyOrderDetail':
            type = 'MyOrder';
            break;
          case 'DistributionFlightPurchaseOrderDetail':
            type = 'PurchaseOrder';
            break;
          case 'DistributionFlightSingleOrderDetail':
            type = 'SingleOrder';
            break;
          case 'financeFlightMyOrderDetail':
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
            orderRefundDetailName = 'DistributionFlightMyOrderRefundDetail';
            orderIncomeDetailName = 'DistributionFlightMyOrderIncomeDetail';
            configType = 20;
            break;
          case 'PurchaseOrder':
            orderRefundDetailName = 'DistributionFlightPurchaseOrderRefundDetail';
            orderIncomeDetailName = 'DistributionFlightPurchaseOrderIncomeDetail';
            configType = 20;
            break;
          case 'SingleOrder':
            orderRefundDetailName = 'DistributionFlightSingleOrderRefundDetail';
            orderIncomeDetailName = 'DistributionFlightSingleOrderIncomeDetail';
            configType = 7;
            break;
          case 'financeRefund':
            orderRefundDetailName = 'financeHotelMyOrderRefundDetail';
            orderIncomeDetailName = 'DistributionFlightMyOrderIncomeDetail';
            configType = 20;
            break;
        }
        return {
          orderRefundDetailName,
          orderIncomeDetailName,
          configType
        }
      },
      getOrderDetailFun(){
        let type = this.orderType,
            fun = null;

        switch(type){
          case 'MyOrder':
          case 'FinanceOrder':
            fun = getFlightMyOrderDetail;
            break;
          case 'SingleOrder':
            fun = getFlightSingleOrderDetail;
            break;
          case 'SelfSupportOrder':
            fun = getFlightSelfSupportOrderDetail;
            break;
        }
        return fun
      },
      topMenuConst() {
        return this.$route.meta && this.$route.meta.topMenuConst;
      },
      saveOrderGatheringFunc() {
        switch (this.topMenuConst) {
        case 'finance':
          return financeSaveOrderGathering;
        case 'operator':
          return saveTeamOrderGathering;
        // case 'store-sale':
        case 'distribution':
        case 'sale':
          return saveSaleOrderGathering;
        }
      },
      totalPrice(){
        let orderPriceDetail = this.orderByData.order_price_detail,
            total = 0;
        orderPriceDetail.map(i => {
          total += i.rmb_total_amount
        })
        return format.toFixed(total,2);
      }
    },
    components:{
      AddShoukuanDialog,
      OnlinePay,
      ChangeOrderOperator
    },
		methods: {
      // 订单详情
      getByOrderDetail() {
        let params = {
          data:{
            order_id:this.$route.query.order_id
          },
        };

        this.getOrderDetailFun({
          params: params,
          success: (params) => {
            let asyncObj = params.data;
            let {code, data, msg} =  params['data'];
            if(!code){
              this.orderByData = data;
              this.orderNo = data.order_info.order_id;
              this.getCountDown(data.order_info.clear_time);
              for(let i in this.orderByData.flight_detail){
                this.$set(this.orderByData.flight_detail[i],'changed_flight_no','');
                this.$set(this.orderByData.flight_detail[i],'changed_seat_code','');
                this.$set(this.orderByData.flight_detail[i],'changed_dep_city','');
                this.$set(this.orderByData.flight_detail[i],'changed_arr_city','');
                this.$set(this.orderByData.flight_detail[i],'changed_dep_date','');
              }
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
          
      },
      // 取消订单
      getByOrderCancel(){

        this.$confirm('是否此取消订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let params = {
            data:{
              order_id:this.$route.query.order_id,
              cancel_reason:''
            }
          };

          flightOrderCancel({
            params: params,
            success: (params) => {
              let {code, msg, data} = params.data;

              if(code){
                this.$message.success("订单取消成功！");
                this.getByOrderDetail();

              }else{
                this.$message.error(asyncObj.msg);
              }
            },
            showLoading: true
          });

        });
      },
      // 添加收款
      handleSaveShoukuan(data) {
        let para = {};

        para.data = { ...data };
        para.data.id = this.$route.query.order_id;
        para.data.tuan_id = 0;
        para.data.user_collection_type = Number(para.data.user_collection_type);
        para.data.payment_date = data.payment_date ? format.date(data.payment_date) : '';
        para.data.attachment = data.attachment.map(item => item.id).join(',');

        this.saveOrderGatheringFunc({
          params: para,
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.addShoukuanVisible = false;
              this.getByOrderDetail();
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
        params.data.ticket_list = this.refundForm.ticket_list;
        params.data.segment_list = this.refundForm.segment_list;
        params.data.refund_type = this.refundForm.refund_type;
        params.data.refund_reason = this.refundForm.refund_reason;
        params.data.order_id = this.$route.query.order_id;

        if(!params.data.ticket_list.length){
            this.$message({
              message:'请至少选择一个退票乘机人！',
              type:'error'
            });
            return;
        }

        if(!params.data.refund_type){
            this.$message({
              message:'请选择退票方式！',
              type:'error'
            });
            return;
        }
      


        refundFlight({
          params: params,
          success: (params) => {
            let { code, msg, data} = params['data'];
            if(!code){
              this.inlandRefundVis = false;
              this.getByOrderDetail();
            }
            this.$message({
              message:msg,
              type:!code?'success':'error'
            });
          },
          showLoading: true
        });

      },
      // 退票费查询
      ticketRefundFeeElement() {
        let params = {
            data:{
              order_id:this.$route.query.order_id,
              ticket_list:this.checkarr
            }
        };

        flightRefundFee({
          params: params,
          success: (params) => {
            let { code, msg, data} = params['data'];

            if(!code){
              this.refundFee = data;
              this.operateType = 3;
            }else{
              this.$message(msg);
            }
          },
          showLoading: true
        });
        
      },
      // 出票
      ticketSubmit() {
        let params = {
            data:{
              order_id:this.$route.query.order_id
            },
            this_is_test:1
        };

        flightTodo({
          params: params,
          success: (params) => {
            let { code, msg, data} = params['data'];
            if(!code){
              this.$message({
                message:'付款成功！',
                type:'success'
              });
              this.getByOrderDetail();
            }else{
              this.$message({
                message:msg,
                type:'error'
              });
            }
          },
          showLoading: true
        });
      },
      // 订单变更
      changeOrderSubmit(){
        let change_list = [];
        let params = {};
        params.data = {};
        let tourist = this.modifyForm.tourist;
        for(let i in tourist){
          let ticket_nos = this.orderByData.tourist_list[tourist[i]].ticket_nos;
          let change_msg = this.orderByData.tourist_list[tourist[i]].change_msg;
          change_list.push({
            ticket_no:ticket_nos,
            change_msg:change_msg
          })
        }

        params.data.change_list = change_list;
        params.data.change_type = this.modifyForm.change_type;
        params.data.order_id = this.$route.query.order_id;

        if(!params.data.change_list.length){
            this.$message({
              message:'请至少选择一个需变更乘机人！',
              type:'error'
            });
            return;
        }
         
        flightOrderChange({
          params: params,
          success: (params) => {
            let { code, msg, data} = params['data'];

            if(!code){
              this.$message('变更成功！');
              this.getByOrderDetail();
            }else{
              this.$message(msg);
            }
          },
          showLoading: true
        });

      },
      // 变更复选框单全选操作
      handleCheckAllChange(event){
        let tourist_list = this.orderByData.tourist_list.map((item) => { 
          return item.name;
        });
        let midle  = event.target.checked ? tourist_list : [];
        this.$set(this.modifyForm,'change_tourist',midle)

      },
      handleCheckedSingleChange(value){
        let checkedCount = value.length;
        let tourist_list = this.orderByData.tourist_list;
        this.$set(this.modifyForm,'allcheck',checkedCount === tourist_list.length)

      },
      flightCheckAllChange(event){
        let flight_detail = this.orderByData.flight_detail;
        let midle  = event.target.checked ? flight_detail : [];
        this.$set(this.modifyForm,'change_detail',midle)

      },
      flightCheckedSingleChange(value){
        let checkedCount = value.length;
        let flight_detail = this.orderByData.flight_detail;
        this.$set(this.modifyForm,'flightAllCheck',checkedCount === flight_detail.length);
      },
      // 退废票复选框单全选操作
      refundCheckAllChange(event){
        let tourist_list = [];
        // tourist_list = this.orderByData.tourist_list.map((item) => { 
          
        // });
        for(let i in this.orderByData.tourist_list){
          if(this.orderByData.tourist_list[i].ticket_status_name == '已出票'){
            tourist_list.push(this.orderByData.tourist_list[i].ticket_nos);
          }
        }
        let midle  = event.target.checked ? tourist_list : [];
        this.$set(this.refundForm,'ticket_list',midle)
      },
      refundCheckedSingleChange(value){
        let checkedCount = value.length;
        // let tourist_list = this.orderByData.tourist_list;
        let tourist_list = [];
        for(let i in this.orderByData.tourist_list){
          if(this.orderByData.tourist_list[i].ticket_status_name == '已出票'){
            tourist_list.push(this.orderByData.tourist_list[i].ticket_nos);
          }
        }
        this.$set(this.refundForm,'allcheck',checkedCount === tourist_list.length)
        
      },
      refundFlightAllChange(event){
        let flight_detail = this.orderByData.flight_detail.map((item) => { 
          return item.depart_airport_code+'-'+item.arrive_airport_code;
        });
        let midle  = event.target.checked ? flight_detail : [];
        this.$set(this.refundForm,'segment_list',midle)

      },
      refundFlightSingleChange(value){
        let checkedCount = value.length;
        let flight_detail = this.orderByData.flight_detail;
        this.$set(this.refundForm,'flightAllCheck',checkedCount === flight_detail.length);
      },
      // 航班经停
      getByFlightStopDetail(flight_no, depart_date, flightIndex) {
          let params = {
              data: {
                  flight_no: flight_no,
                  depart_date: depart_date
              }
          };

          if (this.orderByData.flight_detail[flightIndex].stop_point_list) return;
          getInlandFlightStopDetail({
              params: params,
              success: (params) => {
                  let { data } = params['data'];
                  this.$set(this.orderByData.flight_detail[flightIndex], 'stop_point_list', data);
              }
          });
      },
      addLinePriceDetail(){
        let order = {};
        order.isadd = 1;
        order.item_name = '';
        order.rmb_unit_price = '';
        order.price_type = 1;
        order.unit_price = '';
        order.num = '';
        order.rmb_total_amount = '';
        order.remark = '';
        this.orderByData.order_price_detail.push(order);
      },
      saveLinePriceDetail(idx){
        let order = this.orderByData.order_price_detail[idx];
        let params = {};
        params.data = {};
        params.data.order_id = this.$route.query.order_id;
        params.data.item_name = order.item_name;
        params.data.price = order.price_type * order.unit_price;
        params.data.num = order.num;
        params.data.rmb_total_amount = order.num * params.data.unit_price;
        params.data.remark = order.remark;

        setFlightModifyPrice({
          params: params,
          success: (params) => {
            let { code, msg, data} = params['data'];

            if(!code){
              this.refundVisible = false;
              this.$message.success(msg);
              this.getByOrderDetail();
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      },
      delLinePriceDetail(idx){
        this.orderByData.order_price_detail.splice(idx,1);
      },
      // 在线支付
      handleOnlinePay(){
        this.$refs.onlinePay.pay();
      },
      // 订单负责人
      handleChangeOrderOperator(){
        this.$refs.operator.changeOrderOperator(this.orderByData.order_info.order_id, this.orderByData.order_info.op_id);
      },
      getCountDown(timestamp){
        let that = this;
        this.isIntervalFlag = setInterval(function(){
            var nowTime = new Date();
            var endTime = new Date(timestamp * 1000);

            var t = endTime - nowTime.getTime();
            var min=Math.floor(t/1000/60%60);
            var sec=Math.floor(t/1000%60);

            if(min<=0 && sec<=0){
              min = 0;
              sec = 0;
              clearInterval(that.isIntervalFlag);
              // that.getByOrderDetail();
            }
            if (min < 10) {
                  min = "0" + min;
            }
            if (sec < 10) {
                  sec = "0" + sec;
            }
            var countDownTime = min + ":" + sec;
            that.$set(that,'endOrderTime',countDownTime);
        
        },1000);
      }
		},
		mounted() {
      this.getByOrderDetail();
		}
	};

</script>

<style scoped lang="less">
*{margin: 0;}
table{
    border-collapse:collapse;
    border-spacing:0;
    table-layout:fixed;
}
.pannel-order-detail{
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
	border-collapse:collapse;
	text-align: center;
	th{
    height: 40px;
    background: #f4f4f4;
    color: #999;
    font-weight: 400;
    text-align: center;
    border:1px solid #ccc;
  }
  td{
    border:1px solid #ccc;
    padding: 10px 5px;
  }
	.el-button.el-button--primary a{
		color: #fff;
  }
  .el-input{
    width: 80px;
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
.refund-footer{
    text-align: center;
  }
  .refund-cont{
    text-align: center;

    p{
      margin-bottom: 15px;
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

.flight-info-table {
    width: 100%;
    font-size: 14px;
    th,
    td {
        padding: 6px 8px;
        text-align: center;
    }
    th {
        background-color: #f4f4f4;
    }
}
.change-flight-info{
  padding: 10px;
  text-align: left;
  .el-form-item{
    margin-bottom: 5px;
  }
  .sub-tit{
    margin-bottom: 10px;
  }
  .el-input{
    width: 45%;
  }
}
.table-module{
  .tips{
    text-align: right;
    color: #f00;
    padding-bottom: 10px;
  }
}
</style>
<style lang="less">
.el-dialog{
  .textarea{
    .el-textarea__inner{
      min-height: 60px !important;
    }
  }
}
</style>
