<template>
  <div class="wrapper" v-if="orderByData">
    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <li class="on">订单详情</li>
          <router-link
            :to="{ name: orderTypeRouterName.orderEndorseDetailName, query: { order_id: $route.query.order_id }}"
            v-if="orderByData.order_info.change_detail==0"
            tag="li"
          >变更单详情</router-link>
          <router-link
            :to="{ name: orderTypeRouterName.orderRefundDetailName, query: { order_id: $route.query.order_id }}"
            v-if="orderByData.order_info.refund_status"
            tag="li"
          >退款详情</router-link>
        </template>
      </ul>
    </div>

    <div class="pannel-order-detail">
      <!--订单信息-->
      <div class="panel">
        <div class="hd">
          <h2>订单信息</h2>
          <p>供应商订单号：{{orderByData.order_info.channel_req_no}}</p>
          <span>
            <span>支付渠道：{{orderByData.order_info.pay_channel_code}}</span>
            <span>第三方流水号：{{orderByData.order_info.channel_req_no}}</span>
          </span>
        </div>
        <div class="bd">
          <div class="table-module">
            <p
              class="tips"
              v-if="orderByData.order_info.status_code == 'OS003'"
            >请在{{endOrderTime}}分钟内支付订单，未准时支付，订单会自动关闭</p>
            <p
              class="mb10"
              v-if="orderType == 'SelfSupportOrder'"
            >单项订单：{{orderByData.order_info.common_order_id}}</p>
            <table class="table-custom">
              <tr>
                <th width="180">订单号</th>
                <th width="120">下单时间</th>
                <th width="100">订单类型</th>
                <th width="100">支付方式</th>
                <th width>订单金额</th>
                <th width>已收金额</th>
                <th width>未收金额</th>
                <th width>结算方</th>
                <th width>订单状态</th>
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
                  <span
                    v-if="orderByData.order_info.status_code != 'OS011'"
                  >{{ orderByData.order_info.rmb_unpaid_amount }}</span>
                  <span v-else>--</span>
                </td>
                <td>{{orderByData.order_info.distributor_name}}</td>
                <td>{{orderByData.order_info.status_name}}</td>
                <td>
                  <el-dropdown
                    trigger="click"
                    v-if="orderByData.order_info.allow_operation 
                      && orderByData.order_info.status_code != 'OS011'
                      && orderByData.order_info.status_code != 'OS013'
                      && orderByData.order_info.status_code != 'OS018'"
                  >
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-if="(($menuPermission('singlepro/singleorder/flightorder/aplrefundticket') && orderType == 'SingleOrder') ||
                          ($menuPermission('saleorder/flightorder/aplrefund') && orderType == 'MyOrder')) && 
                          orderByData.order_info.status_code == 'OS009'&&orderByData.order_info.refund_status_show == '1'"
                      >
                        <span
                          @click="inlandRefundTub"
                        >申请退/废票</span>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="(orderByData.order_info.status_code == 'OS009') || (orderByData.order_info.status_code == 'OS029')">
                        <span v-if="orderByData.order_info.change_type === 0" @click="changeFlightInfo">申请变更</span>
                      </el-dropdown-item>
                      <!-- <el-dropdown-item>
                        <span @click="inlandRefundTub">申请退票</span>
                      </el-dropdown-item> -->
                      <el-dropdown-item
                        v-if="(($menuPermission('singlepro/singleorder/flightorder/cancelorder') && orderType == 'SingleOrder') || 
                          ($menuPermission('saleorder/flightorder/cancelorder') && orderType == 'MyOrder')) && 
                          orderByData.order_info.status_code == 'OS003'"
                      >
                        <a href="javascript:;" @click="getByOrderCancel">取消订单</a>
                      </el-dropdown-item>
                      <!-- <el-dropdown-item>
                          <a href="javascript:;" @click="addShoukuanVisible=true">添加收款</a>
                      </el-dropdown-item>-->
                      <el-dropdown-item
                        v-if="($menuPermission('saleorder/flightorder/onlinepay') && orderType == 'MyOrder') && 
                          orderByData.order_info.status_code == 'OS003'"
                      >
                        <a href="javascript:;" @click="handleOnlinePay">在线支付</a>
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="(($menuPermission('singlepro/singleorder/flightorder/getincodet') && orderType == 'SingleOrder') || 
                          ($menuPermission('saleorder/flightorder/getincodet') && orderType == 'MyOrder')) && 
                          orderByData.order_info.status_code == 'OS009'"
                      >
                        <router-link
                          :to="{ name: orderTypeRouterName.orderIncomeDetailName, 
                          query: { bid: orderByData.order_info.bill_id, type:orderTypeRouterName.configType } }"
                        >查看收入</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="($menuPermission('singlepro/singleorder/flightorder/orderprin') && orderType == 'SingleOrder')"
                      >
                        <a href="javascript:;" @click="handleChangeOrderOperator">订单负责人</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <span v-else>--</span>
                </td>
              </tr>
            </table>
          </div>
          <div
            v-if="orderByData.order_info.flight_order_type==1"
          >{{orderByData.change_rule.rule_infos[0].rule_name}} : {{orderByData.change_rule.rule_infos[0].rule_remark}}</div>
          <p v-else v-html="orderByData.change_rule.adult_rule"></p>
          <div class="redBox">本客规仅供参考，不作为最终判定依据。</div>
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
            <span>
              <i>结算币种 / 汇率：</i>人民币 / 1
            </span>
            <span>
              <i>结算总金额：</i>
              {{totalPrice}}
            </span>
            <span>
              <i>本位币：</i>
              {{totalPrice}}
            </span>
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
            <template v-if="orderByData && orderByData.order_price_detail">
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
                </template>-->
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
                    <el-popover
                      v-if="item.stop_num"
                      placement="bottom"
                      width="600"
                      trigger="hover"
                      @show="getByFlightStopDetail(item.flight_no,item.depart_date,idx)"
                    >
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
                  
                  <td v-if="orderByData.order_info.flight_order_type == 1">{{item.seat_type}}</td>
                  <td v-if="orderByData.order_info.flight_order_type == 2">{{item.cabin_code}}</td>

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
        v-if="stepBar.type === 3 && stepBar.index === 1 &&  orderByData.order_type === 1">提交，查看退票费</el-button>-->
        <el-button
          size="large"
          @click="$router.push({path:'/singlepro/single-flight-order'})"
          v-if="orderType == 'SingleOrder'"
        >返回</el-button>
        <el-button
          size="large"
          @click="$router.push({path:'/saleorder/flight-order'})"
          v-if="orderType == 'MyOrder'"
        >返回</el-button>
      </div>
      <add-shoukuan-dialog
        :visible.sync="addShoukuanVisible"
        @submit="handleSaveShoukuan"
        @close="addShoukuanVisible=false"
      />
      <!-- 机票变更dlg -->
      <el-dialog title="申请机票变更" size="large" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <div>
          <p
            v-if="orderByData.order_info.flight_order_type==1"
          >{{orderByData.change_rule.rule_infos[1].rule_name}} : {{orderByData.change_rule.rule_infos[1].rule_remark}}</p>
          <p v-else v-html="orderByData.change_rule.adult_rule"></p>
        </div>

        <div v-for="(item,index) in handle_data" :key="index">
          <p class="tit">选择航段</p>
          <div class="table-module">
            <table class="table-custom">
              <tr>
                <th width="50">
                  <!-- <input type="checkbox" name="" id=""> -->
                </th>
                <th width>航班起飞时间</th>
                <th width>航程信息</th>
                <th>航班号</th>
                <th width="60">舱位</th>
              </tr>
              <template>
                <tr v-for="(items,idx) in item.flight_info" :key="idx">
                  <td>
                    <input
                      type="checkbox"
                      name="check_flight"
                      @click="flightCheckedSingleChange(items,idx,index)"
                      :checked="logo[index].indexOf(idx)>-1" 
                    >
                  </td>
                  <td>{{items.depart_date}} {{items.depart_time}}</td>
                  <td>{{items.depart_city_name}} - {{items.arrive_city_name}}</td>
                  <td>{{items.flight_no}}</td>
                  <td v-if="orderByData.order_info.flight_order_type == 1">{{items.seat_type}}</td>
                  <td v-if="orderByData.order_info.flight_order_type == 2">{{items.cabin_code}}</td>
                </tr>
              </template>
            </table>
          </div>
          <div class="passengerList">
            <el-button type="primary" @click="toFlightList(item,index)">选择更改航班</el-button>
          </div>
          <div class="table-module">
            <table class="table-custom">
              <tr>
                <th width="220">航班起飞时间</th>
                <th width="200">航程信息</th>
                <th>航班号</th>
                <th width="200">舱位</th>
              </tr>
              <tr v-for="(items,idx) in item.journey_segment_list" :key="idx">
                <td>{{items.depart_date}} {{items.depart_time}}</td>
                <td>{{items.depart_city_name}} - {{items.arrive_city_name}}</td>
                <td>{{items.flight_no}}</td>
                <td class="tc" v-if="items.cabin_code">{{items.seat_type}}({{items.cabin_code}})</td>
                <td class="tc" v-else>{{items.seat_type}}</td>
              </tr>
            </table>
          </div>
          <div class="table-module">
            <p class="tit">选择乘客</p>
            <table class="table-custom">
              <tr>
                <th width="80"></th>
                <th width="120">乘客姓名</th>
                <th width="120">乘客类型</th>
                <th width>证件号码</th>
                <th width="150">票号</th>
              </tr>
              <template v-if="orderByData && orderByData.tourist_list">
                <tr v-for="(items,idx) in item.tourist_info" :key="idx">
                  <template v-if="logo[index].indexOf(Number(items.logo))>-1">
                    <td>
                      <input
                        v-if="items.ticket_change_status != 1 && items.ticket_refund_status != 1 && items.ticket_refund_status != 3"
                        type="checkbox"
                        @click="flightCheckedPeopleChange(items,idx,index)"
                        :checked="logoPas[index].indexOf(idx)>-1"
                      >
                      <p v-else-if="items.ticket_change_status == 1">变更中</p>
                      <p v-else-if="items.ticket_refund_status == 1">退票中</p>
                      <p v-else-if="items.ticket_refund_status == 2">已退票</p>
                    </td>
                    <td>{{items.tourist_name}}</td>
                    <td>{{items.tourist_type_name}}</td>
                    <td>{{items.identity_no}}</td>
                    <td class="tc">{{items.ticket_nos}}</td>
                  </template>
                </tr>
              </template>
            </table>
          </div>
        </div>
        <div>注意：除海航及旗下、CZB2B、HO的客票，其余航司如操作收费改期，后续退票业务请自行联系航司或者营业部办理系统无权限操作。（注：改期费用任何情况不退，联系航司或营业部办理退票所需材料，以咨询航司为准。）</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ticketEndorse">取 消</el-button>
          <el-button type="primary" @click="determineChange">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 退废票dlg -->
      <el-dialog title="申请退/废票" size="large" :visible.sync="inlandRefundVis">
        <div class="legend" v-if="orderByData && orderByData.refund_rule">
          <p
            v-for="(obj,key,idx) in orderByData.refund_rule"
            :key="idx"
            v-html="obj"
          >{{key}}：{{obj}}</p>
        </div>
        <p class="tit">选择乘客</p>
        <div class="table-module">
          <table class="table-custom">
            <tr>
              <th width="50">
                <el-checkbox v-model="refundForm.allcheck" @change="refundCheckAllChange">&nbsp;</el-checkbox>
              </th>
              <th width>乘客姓名</th>
              <th width>乘客类型</th>
              <th width>票号</th>
            </tr>
            <template v-if="refundPass && refundPass.flight_tourist">
              <tr v-for="(item,idx) in refundPass.flight_tourist" :key="idx">
                <td>
                  <el-checkbox-group
                    v-model="refundForm.ticket_list"
                    @change="refundCheckedSingleChange"
                  >
                    <el-checkbox
                      :label="item.ticket_nos"
                      :disabled="item.ticket_refund_status==1 || item.ticket_refund_status == 2"
                    >&nbsp;</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{item.tourist_name}}</td>
                <td>{{item.tourist_type_name}}</td>
                <td v-if="item.new_ticket_nos">{{item.new_ticket_nos}}</td>
                <td v-else class="tc">{{item.ticket_nos}}</td>
              </tr>
            </template>
          </table>
        </div>
        <p class="tit">选择航段</p>
        <div class="table-module">
          <table class="table-custom">
            <tr>
              <th width="50">
                <el-checkbox
                  v-model="refundForm.flightAllCheck"
                  @change="refundFlightAllChange"
                >&nbsp;</el-checkbox>
              </th>
              <th width="100">航班起飞时间</th>
              <th width>航程信息</th>
              <th>航班号</th>
              <th>舱位</th>
            </tr>
            <template v-if="refundPass && refundPass.flight_info">
              <tr v-for="(item,idx) in refundPass.flight_info" :key="idx">
                <td>
                  <el-checkbox-group
                    v-model="refundForm.segment_list"
                    @change="refundFlightSingleChange"
                  >
                    <el-checkbox
                      :label="item.depart_airport_code+'-'+item.arrive_airport_code"
                    >&nbsp;</el-checkbox>
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
            <el-select placeholder="请选择类型" v-model="refundForm.refund_type">
              <el-option label="请选择类型" value></el-option>
              <el-option label="【自愿退票】：客人自愿退票，按客规收取手续费" value="1"></el-option>
              <el-option label="【非自愿退票】：航班延误、取消，申请全退" value="2"></el-option>
              <!-- <el-option label="【升舱换开】申请全退" value="3"></el-option> -->
              <!-- <el-option label="【升舱换开】：名字错换开重出，申请全退" :value="4"></el-option> -->
              <el-option label="【非自愿退票】客人因病无法乘机，申请全退" value="5"></el-option>
              <el-option label="【非自愿退票】：其他退票情况" value="6"></el-option>
              <!-- <el-option label="【其他】：申请退回票款差价" value="7"></el-option> -->
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="退票说明">
      <el-input type="textarea" v-model="refundForm.refund_reason" auto-complete="off"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="申退原因">
      <el-input type="textarea" v-model="refundForm.refund_reason" auto-complete="off"></el-input>
          </el-form-item>-->
          <el-form-item
            label="延误/病退证明"
            v-if="refundForm.refund_type !='1'&& refundForm.refund_type !=''"
          >
            <el-upload
              class="upload-demo"
              action="/bom/api/flight/flight_retund_upload"
              :on-success="handleSuccess"
              :show-file-list="false"
              multiple
              :limit="3"
              :before-upload="handleExceed"
              accept=".png, .gif, .jpg"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传文件</el-button>
              <span slot="tip" class="el-upload__tip">支持jpg、png、gif格式，文件小于2M(凭证数不超过3个)</span>
            </el-upload>
            <div class="uploadImg-box">
              <div v-for="(tmp,index) in fileList" :key="index" class="uploadImg">
                <div class="delImg" @click="delUploadImg(index)">x</div>
                <div class="indexImg">
                  <a :href="tmp.url" target="_blank">
                    <img :src="tmp.url">
                  </a>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="inlandRefundVis = false">取 消</el-button>
          <el-button type="primary" @click="ticketRefundTodo">确 定</el-button>
        </div>
      </el-dialog>
      <online-pay
        ref="onlinePay"
        :order-id="orderNo"
        order-resource="2"
        v-if="($menuPermission('saleorder/flightorder/onlinepay') && orderType == 'MyOrder') && orderByData &&
                          orderByData.order_info.status_code == 'OS003'"
      />
      <change-order-operator
        v-if="$menuPermission('api/order/set_order_operation')"
        ref="operator"
        order-type="1"
        @change-success="getByOrderDetail"
      ></change-order-operator>
    </div>
  </div>
</template>

<script>
import {
  getFlightMyOrderDetail,
  getFlightSingleOrderDetail,
  getFlightSelfSupportOrderDetail,
  setFlightModifyPrice,
  flightOrderCancel,
  flightOrderChange,
  refundFlight,
  flightRefundFee,
  getInlandFlightStopDetail,
  flightTodo,
  getJourneyFlightDetail,
  getTicketChange,
  getTouristInfo,
  getFlightDetail,
  getIntlTicketChangeMany,
  flightRefundInfo
} from "src/api/flight";
import {
  saveSaleOrderGathering,
  saveTeamOrderGathering,
  financeSaveOrderGathering
} from "src/api/api";
import AddShoukuanDialog from "src/components/components/AddShoukuanDialog.vue";
import OnlinePay from "src/components/components/OnlinePay.vue";
import ChangeOrderOperator from "src/plugins/ChangeOrderOperator.vue";
import * as format from "src/utils/format";

export default {
  data() {
    return {
      operateType: 1, // 1）预订正常流程；2）取消预订；3）退票；4）变更（改签、二次购买快递、购买保险）
      orderByData: "",
      refundFee: null,
      orderinfo: null,
      checkarr: [],
      refund_type: 0,
      stepBar: {
        type: 1,
        index: 1
      },
      loading: false,
      inlandChangeLogVis: true,
      inlandRefundVis: false,
      refundForm: {
        refund_type: "",
        refund_reason: "",
        ticket_list: [],
        allcheck: false
      },
      refundPass:{},
      addShoukuanVisible: false,
      orderNo: "",
      isIntervalFlag: 0,
      endOrderTime: null,
      fileList: [],
      dialogFormVisible: false, //改期弹窗
      newSchedule: false, //是否选择新行程
      multipleSelection: [],
      peoMultipleSelection: [],
      flight_info: [],
      journey_segment: [],
      flight_change_info: [], //改签时的数据
      handle_data: [], //改签后处理的数据
      logo: [], //选择的航段、保存选中的航段
      logoPas: [], //保存选中的乘客
      journeySegmentList:[],//保存更改的航段
      modifyForm: {
        change_type: "",
        tourist: [],
        allcheck: false
      },
      butSwitch:true,//确定校验
    };
  },
  filters: {
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
    formatDate(d) {
      let now = new Date(d * 1000);
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      if (month <10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second 
      }
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
  },
  computed: {
    orderType() {
      let routeName = this.$route.name,
        type = "";
      console.log(routeName);
      switch (routeName) {
        case "FlightSaleOrderDetail":
          type = "MyOrder";
          break;
        case "FlightSingleOrderDetail":
          type = "SingleOrder";
          break;
        case "financeFlightMyOrderDetail":
          type = "financeRefund";
          break;
      }
      return type;
    },
    orderTypeRouterName() {
      let type = this.orderType,
        configType = "",
        orderRefundDetailName = "",
        orderEndorseDetailName = "",
        orderIncomeDetailName = "";

      switch (type) {
        case "MyOrder":
        case "financeRefund":
          orderRefundDetailName = "FlightSaleOrderRefundDetail";
          orderEndorseDetailName = "FlightSaleOrderEndorseDetail";
          orderIncomeDetailName = "FlightSaleOrderIncomeDetail";
          configType = 20;
          break;
        case "SingleOrder":
          orderRefundDetailName = "FlightSingleOrderRefundDetail";
          orderEndorseDetailName = "FlightSingleOrderEndorseDetail";
          orderIncomeDetailName = "FlightSingleOrderIncomeDetail";
          configType = 7;
          break;
      }
      return {
        orderRefundDetailName,
        orderEndorseDetailName,
        orderIncomeDetailName,
        configType
      };
    },
    getOrderDetailFun() {
      let type = this.orderType,
        fun = null;

      switch (type) {
        case "MyOrder":
        case "FinanceOrder":
          fun = getFlightMyOrderDetail;
          break;
        case "SingleOrder":
          fun = getFlightSingleOrderDetail;
          break;
      }
      return fun;
    },
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    saveOrderGatheringFunc() {
      switch (this.topMenuConst) {
        case "finance":
          return financeSaveOrderGathering;
        case "operator":
          return saveTeamOrderGathering;
        // case 'store-sale':
        case "distribution":
        case "sale":
          return saveSaleOrderGathering;
      }
    },
    totalPrice() {
      let orderPriceDetail = this.orderByData.order_price_detail,
        total = 0;
      orderPriceDetail.map(i => {
        total += i.rmb_total_amount;
      });
      return format.toFixed(total, 2);
    }
  },
  components: {
    AddShoukuanDialog,
    OnlinePay,
    ChangeOrderOperator
  },
  methods: {
    // 订单详情
    getByOrderDetail() {
      let params = {
        data: {
          order_id: this.$route.query.order_id
        }
      };
      this.getOrderDetailFun({
        params: params,
        success: params => {
          let asyncObj = params.data;
          let { code, data, msg } = params["data"];
          if (!code) {
            this.orderByData = data;
            this.$nextTick(() => {
              if (
                localStorage.getItem("Rescheduled") &&
                this.$route.query.journey_id
              ) {
                this.changeFlightInfo();
                this.logo = JSON.parse(localStorage.getItem("Rescheduled"));
                if (localStorage.getItem("RescheduledPas")) {
                  this.logoPas = JSON.parse(
                    localStorage.getItem("RescheduledPas")
                  );
                } else {
                  this.logoPas = [];
                }
                
                console.log(this.logo,this.logoPas);
                
                let par = {
                  data: {
                    journey_id: this.$route.query.journey_id,
                    seat_type: this.$route.query.seat_type,
                    price_id:this.$route.query.price_id
                  }
                };
                if (this.$route.query.tag == 1) {
                  //   国内改签机票接口
                  getJourneyFlightDetail({
                    params: par,
                    success: params => {
                      let { code, data, msg } = params["data"];
                      if (this.orderByData.order_info.flight_order_type == 1) {
                        if (code == 0) {
                          this.flight_info = data;
                          let index = Number(this.$route.query.index);

                          // ----------------数据说明---------------
                          // let handle={
                          //   flight_info:[],//该航段所有航班信息
                          //   journey_segment_list:[],//接口返回的改签后的航班数据
                          //   multipleSelection:[],//勾选过的原航班数据
                          //   peoMultipleSelection:[],//勾选过的乘客数据
                          //   tourist_info:[],//该航段所有乘客的数据
                          // }
                          // ----------------数据说明---------------
                          //添加接口返回的改签后的航班数据
                          this.handle_data[index].journey_segment_list.push(data[0].journey_segment_list[0])
                          //添加仓位信息
                          this.$set(
                            this.handle_data[index].journey_segment_list[0],
                            "seat_type",
                            data[0].journey_price_list[0].cabin_list[0].seat_type 
                          );
                          //添加仓位信息
                          this.$set(
                            this.handle_data[index].journey_segment_list[0],
                            "cabin_code",
                            data[0].journey_price_list[0].cabin_list[0].cabin_code
                          );
                          //添加勾选过的原航班数据
                          this.logo.forEach((data, index) => {
                            if (data.length > 0) {
                              data.forEach((item, idx) => {
                                this.handle_data[index].multipleSelection.push(
                                  this.flight_change_info[index].flight_info[idx]
                                );
                              });
                            }
                          });
                          //勾选过的乘客数据
                          this.logoPas.forEach((data, index) => {
                            if (data.length > 0) {
                              data.forEach((item, idx) => {
                                this.handle_data[index].peoMultipleSelection.push(
                                  this.flight_change_info[index].tourist_info[idx]
                                );
                              });
                            }
                          });
                          this.$forceUpdate();
                          console.log("===-国内-===", this.handle_data);
                        } else {
                          this.$message.error(msg);
                        }
                      }else{
                        if (code == 0) {
                          // this.flight_info = data;
                          let index = Number(this.$route.query.index);
                          let journeyList = data[0].journey_segment_list[0]
                          let journey_segment_list = {
                            airline_company: journeyList.airline_company,
                            arrive_date: journeyList.arrive_date,
                            arrive_time: journeyList.arrive_time,
                            arrive_airport_terminal: journeyList.arrive_airport_terminal ,
                            depart_airport_terminal: journeyList.depart_airport_terminal,
                            depart_date: journeyList.depart_date,
                            depart_time: journeyList.depart_time,
                            depart_city_name: journeyList.depart_city_name,
                            arrive_city_name: journeyList.arrive_city_name,
                            flight_no: journeyList.flight_no,
                            seat_type: data[0].journey_price_list[0].cabin_list[0].seat_type,
                            cabin_code:data[0].journey_price_list[0].cabin_list[0].cabin_code,
                            depart_airport_code: journeyList.depart_airport_code,
                            arrive_airport_code: journeyList.arrive_airport_code,
                            depart_airport_name: journeyList.depart_airport_name,
                            arrive_airport_name: journeyList.arrive_airport_name
                          };
                          this.journeySegmentList[index] = []//清空该项航班内容，防止多次存储
                          this.journeySegmentList[index].push(journey_segment_list)
                          localStorage.setItem("journeySegmentList", JSON.stringify(this.journeySegmentList));
                          this.handle_data.forEach((item,idx)=>{
                            this.journeySegmentList[idx].forEach((data,i)=>{
                              item.journey_segment_list.push(data)
                            })
                          })
                          this.$forceUpdate();
                          this.logo.forEach((data,index)=>{
                            if (data.length>0) {
                              data.forEach((item,idx)=>{
                                this.handle_data[index].multipleSelection.push(this.flight_change_info[index].flight_info[idx])
                              })
                            }
                          })
                          this.logoPas.forEach((data, index) => {
                            if (data.length > 0) {
                              data.forEach((item, idx) => {
                                this.handle_data[index].peoMultipleSelection.push(
                                  this.flight_change_info[index].tourist_info[idx]
                                );
                              });
                            }
                          });
                          console.log("===-国际航班国内航段改期-===", this.handle_data);
                        } else {
                          this.$message.error(msg);
                        }
                      }
                      
                    }
                  });
                } else {
                  //国际改期
                  if (localStorage.getItem("journeySegmentList")) {
                    this.journeySegmentList = JSON.parse(
                      localStorage.getItem("journeySegmentList")
                    );
                  } else {
                    // this.journeySegmentList = [];
                }
                  getFlightDetail({
                    params: par,
                    success: params => {
                      let { code, data, msg } = params["data"];
                      if (code == 0) {
                        let index = Number(this.$route.query.index);
                        let journey_segment_list = {
                          airline_company: data[0].airline_company,
                          arrive_date: data[0].arrival_date,
                          arrive_time: data[0].arrival_time,
                          arrive_airport_terminal: data[0].arrival_terminal,
                          depart_airport_terminal: data[0].departure_terminal,
                          depart_date: data[0].departure_date,
                          depart_time: data[0].departure_time,
                          depart_city_name: data[0].departure_city_name,
                          arrive_city_name: data[0].arrival_city_name,
                          flight_no: data[0].flight_no,
                          seat_type: this.$route.query.seat_type+"("+data[0].cabin_code+")",
                          cabin_code_type: data[0].cabin_code,
                          depart_airport_code: data[0].departure_port_iata_code,
                          arrive_airport_code: data[0].arrival_port_iata_code,
                          depart_airport_name: data[0].departure_port_st_name,
                          arrive_airport_name: data[0].arrival_port_st_name
                        };
                        this.journeySegmentList[index] = []//清空该项航班内容，防止多次存储
                        this.journeySegmentList[index].push(journey_segment_list)
                        localStorage.setItem("journeySegmentList", JSON.stringify(this.journeySegmentList));
                        this.handle_data.forEach((item,idx)=>{
                          this.journeySegmentList[idx].forEach((data,i)=>{
                            item.journey_segment_list.push(data)
                          })
                        })

                        console.log("国际改期this.handle_data", this.handle_data);

                        this.$forceUpdate();

                        this.logo.forEach((data,index)=>{
                          if (data.length>0) {
                            data.forEach((item,idx)=>{
                               this.handle_data[index].multipleSelection.push(this.flight_change_info[index].flight_info[idx])
                            })
                          }
                        })
                        this.logoPas.forEach((data, index) => {
                          if (data.length > 0) {
                            data.forEach((item, idx) => {
                              this.handle_data[index].peoMultipleSelection.push(
                                this.flight_change_info[index].tourist_info[idx]
                              );
                            });
                          }
                        });
                        console.log("===-国际-===", this.handle_data);
                      } else {
                        this.$message.error(msg);
                      }
                    }
                  });
                }
              }
            });
            this.orderNo = data.order_info.order_id;
            this.getCountDown(data.order_info.clear_time);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 取消订单
    getByOrderCancel() {
      this.$confirm("是否此取消订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          data: {
            order_id: this.$route.query.order_id,
            cancel_reason: ""
          }
        };

        flightOrderCancel({
          params: params,
          success: params => {
            let { code, msg, data } = params.data;

            if (code) {
              this.$message.success("订单取消成功！");
              this.getByOrderDetail();
            } else {
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
      para.data.payment_date = data.payment_date
        ? format.date(data.payment_date)
        : "";
      para.data.attachment = data.attachment.map(item => item.id).join(",");

      this.saveOrderGatheringFunc({
        params: para,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == "0" ? "success" : "error"
          });
          if (res.data.code == "0") {
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
      let fileList = [];
      this.fileList.forEach(item => {
        fileList.push(item.url);
      });
      params.data.refund_pic = fileList;

      if (!params.data.ticket_list.length) {
        this.$message({
          message: "请至少选择一个退票乘机人！",
          type: "error"
        });
        return;
      }

      if (!params.data.refund_type) {
        this.$message({
          message: "请选择退票方式！",
          type: "error"
        });
        return;
      }

      if (params.data.refund_type != 1 && params.data.refund_pic.length === 0) {
        this.$message({
          message: "请上传退票凭证式！",
          type: "error"
        });
        return;
      }

      refundFlight({
        params: params,
        success: params => {
          let { code, msg, data } = params["data"];
          if (!code) {
            this.inlandRefundVis = false;
            this.getByOrderDetail();
            this.$router.push({
                path: "/saleorder/flight-order/refund",
                query: {
                  order_id: this.$route.query.order_id
                }
              });
          }
          this.$message({
            message: msg,
            type: !code ? "success" : "error"
          });
        },
        showLoading: true
      });
    },
    // 退票费查询
    ticketRefundFeeElement() {
      let params = {
        data: {
          order_id: this.$route.query.order_id,
          ticket_list: this.checkarr
        }
      };

      flightRefundFee({
        params: params,
        success: params => {
          let { code, msg, data } = params["data"];

          if (!code) {
            this.refundFee = data;
            this.operateType = 3;
          } else {
            this.$message(msg);
          }
        },
        showLoading: true
      });
    },
    // 出票
    ticketSubmit() {
      let params = {
        data: {
          order_id: this.$route.query.order_id
        },
        this_is_test: 1
      };

      flightTodo({
        params: params,
        success: params => {
          let { code, msg, data } = params["data"];
          if (!code) {
            this.$message({
              message: "付款成功！",
              type: "success"
            });
            this.getByOrderDetail();
          } else {
            this.$message({
              message: msg,
              type: "error"
            });
          }
        },
        showLoading: true
      });

    },
    // 变更复选框单全选操作
    handleCheckAllChange(event) {
      let tourist_list = this.orderByData.tourist_list.map(item => {
        return item.name;
      });
      let midle = event.target.checked ? tourist_list : [];
      this.$set(this.modifyForm, "change_tourist", midle);
    },
    handleCheckedSingleChange(value) {
      let checkedCount = value.length;
      let tourist_list = this.orderByData.tourist_list;
      this.$set(
        this.modifyForm,
        "allcheck",
        checkedCount === tourist_list.length
      );
    },
    flightCheckAllChange(event) {
      console.log(event);

      let flight_detail = this.orderByData.flight_detail;
      let midle = event.target.checked ? flight_detail : [];
      this.$set(this.modifyForm, "change_detail", midle);
    },
    //选择航段
    flightCheckedSingleChange(items, idx, index) {
      let num = this.logo[index].indexOf(idx);
      if (num > -1) {//取消选择
        this.logo[index].splice(num, 1);//清除选中当前的航段标记
        this.handle_data[index].multipleSelection.splice(num, 1);//在当前航段数据里勾选的航班
        this.handle_data[index].journey_segment_list = []//清除当前航段更改的航班
        this.handle_data[index].peoMultipleSelection = []//清除当前航段勾选的乘客
        this.logoPas[index] = [];//清除当前航段选中的乘客

      } else {//选中
        this.logo[index].push(idx);//添加选中航段标记
        this.handle_data[index].multipleSelection.push(
          this.flight_change_info[index].flight_info[idx]//添加该航段选中的航班信息
        );
      }
      console.log(this.handle_data);
    },
    //选择乘客
    flightCheckedPeopleChange(items, idx, index) {
      console.log(items, idx, index);
      console.log("修改前", this.logoPas);

      let num = this.logoPas[index].indexOf(idx);
      if (num > -1) {
        this.logoPas[index].splice(num, 1);
        this.handle_data[index].peoMultipleSelection.splice(num, 1);
      } else {
        this.logoPas[index].push(idx);
        this.handle_data[index].peoMultipleSelection.push(
          this.flight_change_info[index].tourist_info[idx]
        );
      }
      console.log("xuanze", this.handle_data);
    },
    // 退废票复选框单全选操作
    refundCheckAllChange(event) {
      let tourist_list = [];
      for (let i in this.orderByData.tourist_list) {
        if (this.orderByData.tourist_list[i].ticket_status_name == "已出票") {
          tourist_list.push(this.orderByData.tourist_list[i].ticket_nos);
        }
      }
      let midle = event.target.checked ? tourist_list : [];
      this.$set(this.refundForm, "ticket_list", midle);
    },
    refundCheckedSingleChange(value) {
      let checkedCount = value.length;
      let tourist_list = [];
      for (let i in this.orderByData.tourist_list) {
        if (this.orderByData.tourist_list[i].ticket_status_name == "已出票") {
          tourist_list.push(this.orderByData.tourist_list[i].ticket_nos);
        }
      }
      this.$set(
        this.refundForm,
        "allcheck",
        checkedCount === tourist_list.length
      );
    },
    refundFlightAllChange(event) {
      let flight_detail = this.orderByData.flight_detail.map(item => {
        return item.depart_airport_code + "-" + item.arrive_airport_code;
      });
      let midle = event.target.checked ? flight_detail : [];
      this.$set(this.refundForm, "segment_list", midle);
    },
    refundFlightSingleChange(value) {
      let checkedCount = value.length;
      let flight_detail = this.orderByData.flight_detail;
      this.$set(
        this.refundForm,
        "flightAllCheck",
        checkedCount === flight_detail.length
      );
    },
    //打开退票弹窗
    inlandRefundTub(){
      this.inlandRefundVis=true
      let params = {
        data: {
          order_id: this.orderByData.order_info.order_id          
        }
      };
      flightRefundInfo({
        params: params,
        success: params => {
          let { data } = params["data"];
          this.refundPass = data
        }
      });
    },
    //数据处理，打开改期弹窗
    changeFlightInfo() {
      this.dialogFormVisible = true;
      let params = {
        data: {
          order_id: this.orderByData.order_info.order_id
        }
      };
      getTouristInfo({
        params: params,
        success: res => {
          let { code, data, msg } = res.data;
          if (code === 0) {
            let logoFlage = false;
            let logoPasFlage = false;
            let journeySegmentList = false
            this.flight_change_info = data;
            this.handle_data = data;
            // logo：选择的航段、选中的航段
            if (this.logo.length <= 0) {
              logoFlage = true;
            }
            //选中的乘客
            if (this.logoPas.length <= 0) {
              logoPasFlage = true;
            }
            //更改的航段
            if (this.journeySegmentList.length <= 0) {
              journeySegmentList = true;
            }
            //用来循环出没有对应标记的未改签的乘客
            for (let i = 0; i < this.handle_data.length; i++) {
              let comparison = {}; //暂存数据
              //循环最外层数组
              const everyData = this.handle_data[i];
              if (logoFlage) {
                this.logo.push([]);
              }
              if (logoPasFlage) {
                this.logoPas.push([]);
              }
              if (journeySegmentList) {
                this.journeySegmentList.push([]);
              }
              for (let ind = 0; ind < everyData.flight_info.length; ind++) {
                //循环每个航班数组
                const flight_info = everyData.flight_info[ind];
                comparison[ind] = flight_info.change_tourist_ids; //暂存数据，用来对应乘机人
                this.handle_data[i].flight_info[ind].logo = ind; //对应标识
              }
              for (let t = 0; t < everyData.tourist_info.length; t++) {
                //遍历每个乘机人，判断是否为改签过
                const element = everyData.tourist_info[t];
                let num;
                for (var v in comparison) {
                  //遍历暂存数据
                  if (comparison[v].length == 0) {
                    //空数组为未改签数据
                    num = v;
                  }
                  comparison[v].forEach((val, index) => {
                    //遍历
                    if (element.id == val) {
                      this.handle_data[i].tourist_info[t].logo = v; //标识对应航班
                    }
                  });
                }
                if (!element.logo) {
                  //标识未改签乘机人
                  this.handle_data[i].tourist_info[t].logo = num;
                }
              }
              this.handle_data[i].peoMultipleSelection = [];//勾选过的乘客数据
              this.handle_data[i].multipleSelection = [];//勾选过的原航班数据
              this.handle_data[i].journey_segment_list = [];//更改后的航班
            }
          } else {
            this.$message.error(msg);
          }
        }
      });
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
        success: params => {
          let { data } = params["data"];
          this.$set(
            this.orderByData.flight_detail[flightIndex],
            "stop_point_list",
            data
          );
        }
      });
    },
    addLinePriceDetail() {
      let order = {};
      order.isadd = 1;
      order.item_name = "";
      order.rmb_unit_price = "";
      order.price_type = 1;
      order.unit_price = "";
      order.num = "";
      order.rmb_total_amount = "";
      order.remark = "";
      this.orderByData.order_price_detail.push(order);
    },
    saveLinePriceDetail(idx) {
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
        success: params => {
          let { code, msg, data } = params["data"];

          if (!code) {
            this.refundVisible = false;
            this.$message.success(msg);
            this.getByOrderDetail();
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    delLinePriceDetail(idx) {
      this.orderByData.order_price_detail.splice(idx, 1);
    },
    // 在线支付
    handleOnlinePay() {
      this.$refs.onlinePay.pay();
    },
    // 订单负责人
    handleChangeOrderOperator() {
      this.$refs.operator.changeOrderOperator(
        this.orderByData.order_info.order_id,
        this.orderByData.order_info.op_id
      );
    },
    // 改期机票跳转列表进行选择
    toFlightList(item, index) {
      console.log(index, "item", item);
      console.log(this.handle_data[index]);

      if (this.handle_data[index].multipleSelection.length == 0) {
        this.$message({
          message: "请至少选择一个要更改的航班！",
          type: "error"
        });
        return;
      }
      localStorage.setItem("Rescheduled", JSON.stringify(this.logo));
      localStorage.setItem("RescheduledPas", JSON.stringify(this.logoPas));
      //flight_order_type为该订单的机票类型
      if (item.flight_info[0].flight_order_type == 1) {
        this.$router.push({
          path: "/salecenter/flight/inland",
          query: {
            airline_company: this.handle_data[index].multipleSelection[0]
              .airline_company,
            arriveCityCode: this.handle_data[index].multipleSelection[0]
              .arrive_airport_code,
            departCityCode: this.handle_data[index].multipleSelection[0]
              .depart_airport_code,
            startDate: this.handle_data[index].multipleSelection[0].depart_date,
            tag: "1",
            order_id: this.$route.query.order_id,
            index: index
          }
        });
      } else {
        let params = {
          filter: {
            airline_company: this.handle_data[index].multipleSelection[0].airline_company,
            adult: 1,
            arriveCity: this.handle_data[index].multipleSelection[0].arrive_airport_code,
            backTime: "",
            cabinClass: 1,
            child: 0,
            departCity: this.handle_data[index].multipleSelection[0].depart_airport_code,
            nonStop: true,
            airline: this.handle_data[index].multipleSelection[0].airline_company,
            startTime: this.handle_data[index].multipleSelection[0].depart_date
          },
          route: 1,
          tag: "2",
          order_id: this.$route.query.order_id,
          index: index
        };
        params = window.btoa(encodeURIComponent(JSON.stringify(params)));
        this.$router.push({
          path: "/salecenter/flight/internation",
          query: {
            option: params
          }
        });
      }
    },
    //取消关闭机票改签弹窗------------------------------------------------------------
    ticketEndorse() {
      this.dialogFormVisible = false;
      //清空数据
      localStorage.removeItem("Rescheduled");
      localStorage.removeItem("RescheduledPas");
      localStorage.removeItem("journeySegmentList");
      this.handle_data = [];
      this.logo = [];
      this.logoPas = [];
      this.$router.push({
        path: "/saleorder/flight-order/detail",
        query: {
          order_id: this.$route.query.order_id
        }
      });
      // this.$refs.multipleTable.clearSelection();
      // this.$refs.peoMultipleSelection.clearSelection();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogFormVisible = false;
          //清空数据
          localStorage.removeItem("Rescheduled");
          localStorage.removeItem("RescheduledPas");
          localStorage.removeItem("journeySegmentList");
          this.handle_data = [];
          this.logo = [];
          this.logoPas = [];
          this.$router.push({
            path: "/saleorder/flight-order/detail",
            query: {
              order_id: this.$route.query.order_id
            }
      });
        })
        .catch(_ => {});
    },
    // 确定机票改签
    determineChange() {
      console.log(this.handle_data,'确定');
      let BSwitch = 0
      //用来做选择正确性校验，必须选中的航程要三者都选中（要更改的航班，更改后的航班，和更改的乘机人）
      for (let idx = 0; idx < this.handle_data.length; idx++) {
        const item = this.handle_data[idx];
        console.log(item.multipleSelection.length,item.journey_segment_list.length,item.peoMultipleSelection.length)
        if (item.multipleSelection.length>0 && item.journey_segment_list.length>0 && item.peoMultipleSelection.length>0) {
          this.butSwitch = false 
        }else if (item.multipleSelection.length==0 && item.journey_segment_list.length==0 && item.peoMultipleSelection.length==0) {
          this.butSwitch = false 
          BSwitch++          
        }else{
          this.butSwitch = true 
          break
        }
      }
      console.log('BS',BSwitch);
      
      console.log('BSwitch',this.butSwitch);
      if (this.butSwitch || BSwitch == this.handle_data.length) {
          this.$message.error("请选择正确航班及乘客信息");
          return
        }
      if (this.orderByData.order_info.flight_order_type == 1) {
        console.log("这是国内机票改期");
        let peopleArr = [];
        this.handle_data.forEach((item,index)=>{
          console.log(item.journey_segment_list,'--');
          if (!item.journey_segment_list) {
            this.$message.error("请选择改期航班！");
            return
          }
          item.peoMultipleSelection.forEach((data,idx)=>{
            let people = {
              tourist_name: data.tourist_name,
              ticket_no: data.ticket_nos,
              depart_city_code: item.journey_segment_list[0].depart_airport_code,
              arrive_city_code: item.journey_segment_list[0].arrive_airport_code,
              depart_date: item.journey_segment_list[0].depart_date,
              depart_time: item.journey_segment_list[0].depart_time,
              flight_no: item.journey_segment_list[0].flight_no,
              seat_type:item.journey_segment_list[0].seat_type,
              cabin_code:item.journey_segment_list[0].cabin_code,
              change_msg:
                item.journey_segment_list[0].depart_airport_name +
                "-" +
                item.journey_segment_list[0].arrive_airport_name +
                " " +
                item.journey_segment_list[0].depart_date +
                " 航班号：" +
                item.journey_segment_list[0].flight_no
            };
            peopleArr.push(people);
          })
        })
        //数据提交
        let params = {
          data: {
            order_id: this.$route.query.order_id,
            change_type: "1",
            change_list: peopleArr,
            change_flight_info: this.flight_info
          }
        };
        console.log(params, "params");
        // return
        getTicketChange({
          params: params,
          success: params => {
            let { code, msg, data } = params.data;
            if (code == 0) {
              this.$message.success("订单改期成功！");
              this.dialogFormVisible = false;
              localStorage.removeItem("Rescheduled");
              localStorage.removeItem("RescheduledPas");
              localStorage.removeItem("journeySegmentList");
              this.handle_data = [];
              this.logo = [];
              this.logoPas = [];
              this.$router.push({
                path: "/saleorder/flight-order/endorse",
                query: {
                  order_id: this.$route.query.order_id
                }
              });
            } else {
              this.$message.error(msg);
              this.dialogFormVisible = false;
              localStorage.removeItem("Rescheduled");
              localStorage.removeItem("RescheduledPas");
              localStorage.removeItem("journeySegmentList");
              this.handle_data = [];
              this.logo = [];
              this.logoPas = [];
            }
          },
          showLoading: true
        });
      } else {
        console.log("这是国际机票改期");
        let peopleArr = [];
        for (let i = 0; i < this.handle_data.length; i++) {
          const item = this.handle_data[i];
          console.log(item.journey_segment_list, "--");
          // if (!item.journey_segment_list) {
          //   this.$message.error("请选择改期航班！");
          //   return;
          // }

          // 以改签后的每个新航班为标准，对数据进行遍历
          let tourist_name = [];
          item.peoMultipleSelection.forEach((data, idx) => {
            tourist_name.push(data.tourist_name);
          });
          if (item.journey_segment_list.length==0) {
            continue
          }
          let people = {
            tourist_name: tourist_name,
            depart_city_code: item.journey_segment_list[0].depart_airport_code,
            arrive_city_code: item.journey_segment_list[0].arrive_airport_code,
            depart_date: item.journey_segment_list[0].depart_date,
            flight_no: item.journey_segment_list[0].flight_no,
            change_msg:
              item.journey_segment_list[0].depart_airport_name +
              "-" +
              item.journey_segment_list[0].arrive_airport_name +
              " " +
              item.journey_segment_list[0].depart_date +
              " 航班号：" +
              item.journey_segment_list[0].flight_no,
            cabin_code: item.journey_segment_list[0].cabin_code_type,
            index_seg: item.multipleSelection[0].index_seg, //航段，数组的一个元素为一个航段内容
            journey_segment_list: item.journey_segment_list //别问我为什么上面有了信息还要把新航段信息再传一遍，咱也不知道他咋想的，咱也不敢问
          };
          peopleArr.push(people);
        }
        //数据提交
        let params = {
          data: {
            order_id: this.$route.query.order_id,
            change_type: "1",
            change_list: peopleArr
          }
        };
        console.log(params, "params");
        // return
        getIntlTicketChangeMany({
          params: params,
          success: params => {
            let { code, msg, data } = params.data;
            if (code == 0) {
              this.$message.success("订单改期成功！");
              this.dialogFormVisible = false;
              localStorage.removeItem("Rescheduled");
              localStorage.removeItem("RescheduledPas");
              localStorage.removeItem("journeySegmentList");
              this.handle_data = [];
              this.logo = [];
              this.logoPas = [];
              this.$router.push({
                path: "/saleorder/flight-order/endorse",
                query: {
                  order_id: this.$route.query.order_id
                }
              });
            } else {
              this.$message.error(msg);
              this.dialogFormVisible = false;
              localStorage.removeItem("Rescheduled");
              localStorage.removeItem("RescheduledPas");
              localStorage.removeItem("journeySegmentList");
              this.handle_data = [];
              this.logo = [];
              this.logoPas = [];
            }
          },
          showLoading: true
        });
      }
    },
    handleSuccess(response, file, fileList) {
      this.fileList.push({ name: file.name, url: response.data.path });
    },
    handleExceed(files, fileList) {
      if (this.fileList.length >= 3) {
        this.$message.warning("凭证上传不能超过3个");
        return false;
      }
    },
    delUploadImg(index) {
      this.fileList.splice(index, 1);
    },
    getCountDown(timestamp) {
      let that = this;
      let falge = false;
      this.isIntervalFlag = setInterval(function() {
        var nowTime = new Date();
        var endTime = new Date(timestamp * 1000);

        var t = endTime - nowTime.getTime();
        var min = Math.floor((t / 1000 / 60) % 60);
        var sec = Math.floor((t / 1000) % 60);
        if (min == 0 && sec == 1) {
          falge = true
        }
        console.log('min',min,'sec',sec,'falge',falge);
        if (min <= 0 && sec <= 0) {
          min = 0;
          sec = 0;
          clearInterval(that.isIntervalFlag);
          console.log('falge',falge);
          
          if (falge) {
          that.orderByData.order_info.status_name = '已取消';
          that.orderByData.order_info.status_code = 'OS011';
          console.log('falge',that.orderByData.order_info.status_name,that.orderByData.order_info.status_code);          
          }
          // that.getByOrderDetail();
        }
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        var countDownTime = min + ":" + sec;
        that.$set(that, "endOrderTime", countDownTime);
      }, 1000);
    }
  },
  mounted() {
    this.getByOrderDetail();
    if (this.$route.query.tag == "1" || this.$route.query.tag == "2") {
      this.dialogFormVisible = true;
    }
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
.pannel-order-detail {
  background-color: #fff;
  padding: 20px;

  .panel {
    margin-bottom: 20px;
    > .hd {
      h2 {
        font-size: 18px;
        border-left: 5px solid #aa177a;
        padding-left: 15px;
        line-height: 20px;
      }
    }
    > .bd {
      padding: 10px 0;

      .gr {
        color: #45bb33;
      }

      .rd {
        color: #ff0d0d;
      }

      .og {
        color: #f60;
      }

      .wt {
        color: #999;
      }
    }
    .info-list {
      span {
        display: inline-block;
        margin: 0 20px 10px 0;
      }
      i {
        font-style: normal;
        color: #999;
      }
    }
  }
}

.table-custom {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  th {
    height: 40px;
    background: #f4f4f4;
    color: #999;
    font-weight: 400;
    text-align: center;
    border: 1px solid #ccc;
  }
  td {
    border: 1px solid #ccc;
    padding: 10px 5px;
  }
  .el-button.el-button--primary a {
    color: #fff;
  }
  .el-input {
    width: 80px;
  }
}
.popover-text {
  color: #0066ff;
  cursor: pointer;
}
.popover-table {
  table {
    width: 100%;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 10px 8px;
    text-align: left;
  }
  th {
    width: 100px;
    background-color: #f4f4f4;
  }
}
.refund-footer {
  text-align: center;
}
.refund-cont {
  text-align: center;

  p {
    margin-bottom: 15px;
  }
}
.footer-tool-bar {
  margin-top: 20px;
  text-align: center;
}
.rule-info-box {
  h5 {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .text {
    margin-top: 10px;
  }
}
.el-dialog {
  .tit {
    margin: 10px 0;
    font-weight: 700;
  }
  .el-dialog__body {
    padding: 0 20px !important;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-upload__tip {
    margin-left: 20px;
  }
  .uploadImg-box {
    margin-top: 20px;
    .uploadImg {
      position: relative;
      display: inline-block;
      margin-right: 25px;
      .delImg {
        display: inline-block;
        position: absolute;
        top: -10px;
        left: 90px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 19px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
      }
      .indexImg {
        display: inline-block;
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.el-tabs {
  box-shadow: none;
  .el-tabs__item {
    &.is-active {
      a {
        color: #b10c79;
      }
    }
    a {
      color: #999;
      display: block;
    }
  }
}
.legend {
  max-height: 150px;
  overflow: auto;
  padding: 10px;
  border: 1px solid #ccc;
  background: #ffffdd;
  .tips {
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
.change-flight-info {
  padding: 10px;
  text-align: left;
  .el-form-item {
    margin-bottom: 5px;
  }
  .sub-tit {
    margin-bottom: 10px;
  }
  .el-input {
    width: 45%;
  }
}
.table-module {
  .tips {
    text-align: right;
    color: #f00;
    padding-bottom: 10px;
  }
}
.redBox {
  color: red;
}
.passengerList {
  margin: 20px 0;
}
.el-upload-list {
  width: 20%;
}
</style>
<style lang="less">
.el-dialog {
  .textarea {
    .el-textarea__inner {
      min-height: 60px !important;
    }
  }
}
</style>
