<template>
  <div class="wrapper" v-loading.fullscreen="loading">
    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <li class="on">订单详情</li>
          <router-link :to="{ name: orderRefundDetailName, query: { order_id: $route.query.order_id }}" 
            v-if="orderByData.order_info.status_code == 'OS018'"
            tag="li">
            退款详情
          </router-link>
        </template>
      </ul>
    </div>



    <!--订单信息-->
    <div class="module-box">
      <div class="module-box-head">
        <h5>订单信息</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table">
              <table>
                <tr>
                  <th width="180">SCM订单号／下单时间</th>
                  <th width="180">渠道订单号</th>
                  <th>订单类型／状态</th>
                  <th>订单结算价</th>
                  <th>票面总价</th>
                  <th width="280">操作</th>
                </tr>
                <tr v-if="orderByData">
                  <td>
                    <p>{{orderByData.order_id}}</p>
                    <p>{{orderByData.add_time}}</p>
                  </td>
                  <td class="tl">
                      <p v-for="(obj,idx) in orderByData.order_no_list" :key="idx">
                        <span class="color-theme">[{{obj.source}}]</span>{{obj.order_no}}</p>
                  </td>
                  <td>
                    <p>{{orderByData.status_code_name}}</p>
                  </td>
                  <td><strong class="color-orange">&yen; {{orderByData.settle_price}}</strong></td>
                  <td><strong class="color-orange">&yen; {{orderByData.price}}</strong></td>
                  <td>
                    <el-button type="text" size="small" @click="getByOrderCancel" class="color-theme"
                               v-if="orderByData.status_code === 'OS003'">取消订单</el-button>
                    <!-- <el-button type="primary" size="small" @click="ticketSubmit"
                               v-if="orderByData.status_code === 'OS003'"
                               style="margin:5px 0 0 0;">付款</el-button> -->
           

                    <el-button type="primary" size="small" @click="dialogFormVisible = true"
                               v-if="orderByData.status_code === 'OS009'"
                               style="margin:5px 0 0 0;">申请变更</el-button>
                    <el-button type="primary" size="small" @click="refundVisible = true"
                               v-if="orderByData.status_code === 'OS009'"
                               style="margin:5px 0 0 0;">申请退/废票</el-button>
                    <span v-if="orderByData.status_code !== 'OS003' && orderByData.status_code !== 'OS009'">--</span>
                  </td>
                </tr>
              </table>
          </div>
      </div>
    </div>

    <!--选择退票方式-->
    <!-- <div class="module-box"  v-if="stepBar.type === 3">
      <div class="module-box-head">
        <h5>选择退票方式</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table module-table-border">
              <table>
                <tr>
                  <th width="150">退票方式</th>
                  <td>
                    <el-checkbox v-model="refund_type"  v-if="stepBar.index === 1">自愿退票</el-checkbox>
                    <span v-else>自愿退票</span>
                  </td>
                </tr>
              </table>
          </div>
      </div>
    </div> -->

    <!--退款信息-->
    <div class="module-box" v-if="refundFee">
      <div class="module-box-head">
        <h5>退款信息</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table module-table-border">
              <table>
                <tr>
                  <th width="150">退款金额</th>
                  <td>{{refundFee.refund_cust_money}}</td>
                </tr>
                <tr>
                  <th>退款手续费</th>
                  <td>{{refundFee.refund_amount}}</td>
                </tr>
              </table>
          </div>
      </div>
    </div>


    <!--订单价格明细-->
    <div class="module-box">
      <div class="module-box-head">
        <h5>订单价格明细</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table module-table-border">
              <table v-if="orderByData.price_detail">
                <tr>
                  <th width="150">订单金额</th>
                  <td>&yen; {{orderByData.price_detail.total_settle_price}}</td>
                </tr>
                <tr v-if="orderByData.price_detail.price_list[0]">
                  <th>结算公式</th>
                  <td>
                    订单金额=（成人票价（{{orderByData.price_detail.price_list[0].adult_base_fare}}）+
                    税费（{{orderByData.price_detail.price_list[0].adult_tax}}））*
                    成人数（{{orderByData.price_detail.price_list[0].adult_quantity}}）+
                    （儿童票价（{{orderByData.price_detail.price_list[0].child_base_fare}}）+
                    税费（{{orderByData.price_detail.price_list[0].child_tax}}））*
                    儿童数（{{orderByData.price_detail.price_list[0].child_quantity}}）
                    <!-- {{orderByData.order_type ==2 ?
                    "+（婴儿票价（"+orderByData.price_detail.price_list[0].baby_base_fare+"）"+
                    "+ 机建燃油费（"+orderByData.price_detail.price_list[0].baby_tax+"））"+
                    "* 婴儿数（"+orderByData.price_detail.price_list[0].baby_quantity+"）"
                    :'' }} -->
                    <!-- 快递费（{{orderByData.price_detail.delivery_price}}） -->
                  </td>
                </tr>
              </table>
          </div>
      </div>
    </div>


    <!--订单变更记录-->
    <div class="module-box" v-if="orderByData.order_log.length">
      <div class="module-box-head">
        <h5>订单变更记录</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table">
              <table>
                <tr>
                  <th>时间</th>
                  <th>操作说明</th>
                  <th>订单状态</th>
                </tr>
                <tr v-for="(obj,index) in orderByData.order_log" :key="index">
                  <td>{{obj.create_time}}</td>
                  <td>{{obj.remark}}</td>
                  <td>{{obj.order_status}}</td>
                </tr>
              </table>
          </div>
      </div>
    </div>




    <!--乘机人信息-->
    <div class="module-box">
      <div class="module-box-head">
        <h5>乘机人信息</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table">
              <table>
                <tr>
                  <!-- <th v-if="stepBar.type === 3 && stepBar.index === 1">选择要退的票</th>
                  <th v-else>编号</th> -->
                  <th>姓名</th>
                  <th v-if="orderByData.order_type == 2">性别</th>
                  <th v-if="orderByData.order_type == 2">国籍</th>
                  <th>证件类型</th>
                  <!-- <th>出生日期</th> -->
                  <th>证件号</th>
                  <th>乘客类型</th>
                  <th>票号</th>
                  <th>新票号</th>
                  <th>票的状态</th>
                </tr>
                <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
                  <!-- <td v-if="stepBar.type === 3">
                    <el-checkbox @change="checkedSelect(item.ticket_nos)" :disabled="item.ticket_status==2?false:true"></el-checkbox>
                  </td>
                  <td v-else>{{idx+1}}</td> -->
                  <td>{{item.name}}</td>
                  <td v-if="orderByData.order_type == 2">{{item.gender}}</td>
                  <td v-if="orderByData.order_type == 2">{{item.country}}</td>
                  <td>{{item.identity_type_name}}</td>
                  <!-- <td>{{item.birthday}}</td> -->
                  <td>{{item.identity_no}}</td>
                  <td>{{item.tourist_type_name}}</td>
                  <td>{{item.ticket_nos}}</td>
                  <td></td>
                  <td>{{item.ticket_status_name === '无状态'? '--': item.ticket_status_name}}</td>
                </tr>
              </table>
          </div>
      </div>
    </div>

    <!--航班信息-->
    <div class="module-box">
      <div class="module-box-head">
        <h5>航班信息</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table">
              <table>
                <tr>
                  <th>航段</th>
                  <th>航班号</th>
                  <th width="150">出发地-目的地</th>
                  <th width="150">出发-到达时间</th>
                  <th>共享航司</th>
                  <th>机型</th>
                  <th>舱位</th>
                  <!-- <th>退改签规则</th> -->
                  <!-- <th>其他说明</th>
                  <th width="120">预计出票时间</th> -->
                </tr>
                <tr v-if="orderByData" v-for="(item,idx) in orderByData.flight_info" :key="idx">
                  <td>{{item.journey_type}}</td>
                  <td>{{item.flight_no}}</td>
                  <td>{{item.depart_city_name}} - {{item.arrive_city_name}} <br/>
                  </td>
                  <td>{{item.depart_date}} {{item.depart_time}} 至
                      {{item.arrive_date}} {{item.arrive_time}}
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
                  <!-- <td>
                      退改签浮层
                      <el-popover
                        placement="right"
                        width="400"
                        title="退改签规则及须知"
                        trigger="hover">
                        <el-button type="text" slot="reference">退改签规则及须知</el-button>
                        <div class="module-table module-table-border">
                        <table>
                          <tr v-if="item.rule_info.change_rule">
                            <th width="80">改签规则</th>
                            <td>
                              <div class="rule-info-box">
                                <h5>{{item.rule_info.change_rule.rule_name}}</h5>
                                <p v-for="(obj,index) in item.rule_info.change_rule.rule_fee_list" :key="index">
                                  {{obj.name}} : {{obj.value}}
                                </p>
                                <p class="text">{{item.rule_info.change_rule.rule_remark}}</p>
                              </div>
                            </td>
                          </tr>
                          <tr v-if="item.rule_info.refund_rule">
                            <th>退票规则</th>
                            <td>
                              <div class="rule-info-box">
                                <h5>{{item.rule_info.refund_rule.rule_name}}</h5>
                                <p v-for="(obj,index) in item.rule_info.refund_rule.rule_fee_list" :key="index">
                                  {{obj.name}} : {{obj.value}}
                                </p>
                                <p class="text">{{item.rule_info.refund_rule.rule_remark}}</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                        </div>
                      </el-popover>
                      /退改签浮层
                  </td> -->
                  <!-- <td>{{item.free_luggage}}</td>
                  <td>{{item.ticket_status}}</td> -->
                </tr>
              </table>
          </div>
      </div>
    </div>


    <!--快递信息-->
    <!-- <div class="module-box">
      <div class="module-box-head">
        <h5>快递信息</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table">
              <table>
                <tr>
                  <th>收件人</th>
                  <th>手机号码</th>
                  <th>邮编</th>
                  <th>邮寄地址</th>
                  <th>发票信息</th>
                </tr>
                <tr v-if="orderByData.delivery">
                  <td>{{orderByData.delivery.receiver_name}}</td>
                  <td>{{orderByData.delivery.mobile}}</td>
                  <td>{{orderByData.delivery.zip_code}}</td>
                  <td>{{orderByData.delivery.address}}</td>
                  <td>{{orderByData.delivery.invoice_title}}</td>
                </tr>
              </table>
          </div>
      </div>
    </div> -->



    <!--联系人信息-->
    <div class="module-box">
      <div class="module-box-head">
        <h5>联系人信息</h5>
      </div>
      <div class="module-box-body">
          <div class="module-table">
              <table>
                <tr>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>其他联系方式</th>
                </tr>
                <tr v-if="orderByData.contact">
                  <td>{{orderByData.contact.name}}</td>
                  <td>{{orderByData.contact.mobile}}</td>
                  <td>{{orderByData.contact.email}}</td>
                </tr>
              </table>
          </div>
      </div>
    </div>


    <div class="footer-tool-bar">
      <!-- <el-button type="primary" size="large"
                 @click="ticketRefundTodo"
                 v-if="stepBar.type === 3 && stepBar.index === 1 &&  orderByData.order_type === 1">提交，查看退票费</el-button> -->
      <el-button size="large" @click="$router.replace('/order/flight')">返回</el-button>
    </div>

    <!-- 机票变更dlg -->
    <el-dialog title="申请机票变更" size="large" :visible.sync="dialogFormVisible">
      <div class="legend" v-if="orderByData.change_rule">
        <p v-for="(obj,key,idx) in orderByData.change_rule" :key="idx" v-html="obj">
          {{key}}：{{obj}}
        </p>
      </div>
      <el-form :model="modifyForm"
               label-width="100px"
               style="margin-top:10px;">
      <p class="tit">选择乘客</p>
      <div class="module-table">
          <table>
            <tr>
              <th width="50"><el-checkbox v-model="modifyForm.allcheck" @change="handleCheckAllChange">&nbsp;</el-checkbox></th>
              <th width="120">乘客姓名</th>
              <th width="120">乘客类型</th>
              <th width="">证件号码</th>
              <th width="150">票号</th>
            </tr>
              <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
                <td>
                  <el-checkbox-group v-model="modifyForm.change_tourist" @change="handleCheckedSingleChange">
                    <el-checkbox :label="item.name" :disabled="item.ticket_status==2 ?false:true">&nbsp;</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{item.name}}</td>
                <td>{{item.tourist_type_name}}</td>
                <td>{{item.identity_no}}</td>
                <td class="tc">{{item.ticket_nos}}</td>
              </tr>
          </table>
      </div>
      <p class="tit">变更内容</p>
      <!-- <p class="tit">选择航段</p> -->
      <div class="module-table">
      <table>
        <tr>
          <th width="50"><el-checkbox v-model="modifyForm.flightAllCheck" @change="flightCheckAllChange">&nbsp;</el-checkbox></th>
          <th width="100">航程</th>
          <th width="100">航段</th>
          <th width="100">航班起飞时间</th>
          <th width="">航程信息</th>
          <th>航班号</th>
          <th>舱位</th>
        </tr>
        <template v-for="(item,idx) in orderByData.flight_info">
          <tr :key="idx">
            <td>
              <el-checkbox-group v-model="modifyForm.change_detail" @change="flightCheckedSingleChange">
                <el-checkbox :label="item">&nbsp;</el-checkbox>
              </el-checkbox-group>
            </td>
            <td>{{item.journey_type}}</td>
            <td>第{{item.segment_num}}段</td>
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
                  <!-- <el-input v-model="item.changed_dep_date" placeholder="选择日期，时间"></el-input> -->
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeOrderSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 退废票dlg -->
    <el-dialog title="申请退/废票" size="large" :visible.sync="refundVisible">
      <div class="legend">
        <p v-for="(obj,key,idx) in orderByData.refund_rule" :key="idx" v-html="obj">
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
	import { getFlightOrderDetails,
           flightOrderCancel,
           flightOrderChange,
           refundFlight,
           flightRefundFee,
           getInlandFlightStopDetail,
           flightTodo,
           flightIntlOrderChange
         } from 'src/api/flight';
  // import {dateTimeFormatter} from 'src/utils/format';     

	export default {
		data() {
			return {
        operateType: 1, // 1）预订正常流程；2）取消预订；3）退票；4）变更（改签、二次购买快递、购买保险）
        orderByData:{
          contact: {},
          delivery: {},
          price_detail:{
            price_list:[]
          },
          flight_info:[],
          order_log:[],
          tourist_list:[]
        },
        refundFee:null,
        orderinfo:null,
        checkarr:[],
        refund_type:0,
        stepBar:{
          type:1,
          index:1
        },
        loading:false,
        dialogFormVisible:false,
        modifyForm:{
          change_type:'',
          change_tourist:[],
          change_detail:[],
          allcheck:false,
          flightAllCheck:false
        },
        refundVisible:false,
        refundForm:{
          refund_type:'',
          refund_reason:'',
          ticket_list:[],
          segment_list:[],
          allcheck:false,
          flightAllCheck:false
        }
      }
		},
    watch:{
    },
    computed:{
      switchStepBar(){
        // let status_code = {
        //   'OS000': '待处理',
        //   'OS001': '正在处理',
        //   'OS003': '待付款',
        //   'OS013': '出票中',
        //   'OS009': '已完成',
        //   'OS011': '已取消',
        //   'OS018': '退票成功',
        //   'OS037': '变更处理中',
        //   'OS042': '变更待付款',
        //   'OS029': '变更已付款'
        // }
        // operateType:1, 1）预订正常流程；2）取消预订；3）退票；4）变更（改签、二次购买快递、购买保险）
        let status_code = this.orderByData.status_code;
        let stepBar= {};
        stepBar.type = this.operateType;
        stepBar.index = 1;

        switch(this.operateType){
          // 预订正常流程
          case 1:
            if(status_code === 'OS003'){
              stepBar.index = 2;
            }
            if(status_code === 'OS013'){
              stepBar.index = 3;
            }
            if(status_code === 'OS009'){
              stepBar.index = 4;
            }
            break;
          // 取消预订
          case 2:
            if(status_code === 'OS011'){
              stepBar.index = 2;
            }
            break;
          // 退票
          case 3:
            if(status_code === 'OS001'){
              stepBar.index = 2;
            }
            if(status_code === 'OS018'){
              stepBar.index = 3;
            }
            break;
          // 变更
          case 4:
            if(status_code === 'OS037'){
              stepBar.index = 1;
            }
            if(status_code === 'OS042'){
              stepBar.index = 2;
            }
            if(status_code === 'OS029'){
              stepBar.index = 3;
            }
            break;
        }
        this.stepBar = stepBar;
        return stepBar;
      }
    },
		methods: {
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
              for(let i in this.orderByData.flight_info){
                this.$set(this.orderByData.flight_info[i],'changed_flight_no','');
                this.$set(this.orderByData.flight_info[i],'changed_seat_code','');
                this.$set(this.orderByData.flight_info[i],'changed_dep_city','');
                this.$set(this.orderByData.flight_info[i],'changed_arr_city','');
                this.$set(this.orderByData.flight_info[i],'changed_dep_date','');
              }
            }else{
              this.$message(asyncObj.msg);
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
              let asyncObj = params.data;

              if(asyncObj.success){
                this.$message("订单取消成功！");
                this.operateType = 2;
                setTimeout(function() {
                  window.location.reload();
                }, 3000);

              }else{
                this.$message(asyncObj.msg);
              }
            },
            showLoading: true
          });

        });
      },
      // checked选择操作
      checkedSelect(val){
        let checkarr = this.checkarr,
            len = checkarr.length;

        if(!len){
          checkarr.push(val);
        }else{
          for(let i in checkarr){
            if(checkarr[i] == val){
              checkarr.splice(i,1);
            }
          }
        }
        this.checkarr = checkarr;
      },
      tuipiao(){
        this.$set(this.stepBar,'type',3);
        this.$set(this.stepBar,'index',1);
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
            let asyncObj = params.data;
            if(asyncObj.success){
              window.location.reload();
            }
            this.$message({
              message:asyncObj.msg,
              type:asyncObj.success?'success':'error'
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
            let asyncObj = params.data;

            if(asyncObj.success){
              this.refundFee = asyncObj.data;
              this.operateType = 3;
            }else{
              this.$message(asyncObj.msg);
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
             console.log(params)
            let asyncObj = params.data;
            if(asyncObj.success){
              this.$message({
                message:'付款成功！',
                type:'success'
              });
              setTimeout(function(){window.location.reload();},1000);
            }else{
              this.$message({
                message:asyncObj.msg,
                type:'error'
              });
            }
          },
          showLoading: true
        });
      },
      // 订单变更
      changeOrderSubmit(){
        let params = {};
        params.data = {};
        params.data.change_tourist = this.modifyForm.change_tourist;
        params.data.change_detail = this.modifyForm.change_detail.map((item) => { 
          return {
            index_seg: item.index_seg,
            changed_flight_no: item.changed_flight_no,
            changed_dep_city: item.changed_dep_city,
            changed_arr_city: item.changed_arr_city,
            changed_dep_date: dateTimeFormatter(item.changed_dep_date,'yyyy-MM-dd hh:mm'),
            changed_seat_code: item.changed_seat_code
          }
        });
        params.data.change_type = this.modifyForm.change_type;
        params.data.change_remark = this.modifyForm.change_remark;
        params.data.order_id = this.$route.query.order_id;
        params.this_is_test = 1;

        if(!params.data.change_tourist.length){
            this.$message({
              message:'请至少选择一个需变更乘机人！',
              type:'error'
            });
            return;
        }
        if(!params.data.change_detail.length){
            this.$message({
              message:'请至少选择一个需变更内容！',
              type:'error'
            });
            return;
        }
        if(!params.data.change_type){
            this.$message({
              message:'请至少选择变更类型！',
              type:'error'
            });
            return;
        }

        flightIntlOrderChange({
          params: params,
          success: (params) => {
            let {msg,data,success} = params.data;
            if(success){
              this.$message('变更成功！');
            }else{
              this.$message(msg);
            }
            if(success){
              setTimeout(function(){window.location.reload()},1000);
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
        let flight_info = this.orderByData.flight_info;
        let midle  = event.target.checked ? flight_info : [];
        this.$set(this.modifyForm,'change_detail',midle)

      },
      flightCheckedSingleChange(value){
        let checkedCount = value.length;
        let flight_info = this.orderByData.flight_info;
        this.$set(this.modifyForm,'flightAllCheck',checkedCount === flight_info.length);
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
      // 航班经停
      getByFlightStopDetail(flight_no, depart_date, flightIndex) {
          let params = {
              data: {
                  flight_no: flight_no,
                  depart_date: depart_date
              }
          };

          if (this.orderByData.flight_info[flightIndex].stop_point_list) return;
          getInlandFlightStopDetail({
              params: params,
              success: (params) => {
                  let { data } = params['data'];
                  this.$set(this.orderByData.flight_info[flightIndex], 'stop_point_list', data);
              }
          });
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
.wrapper{
  background: #fff;
  padding-bottom: 30px;
}
.module-steps-bar{
  padding-top:20px;
  text-align: right;
  display: none;
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
      padding: 10px 5px;
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
  padding: 0 10px;
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
