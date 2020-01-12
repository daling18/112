<template>
  <!-- wrapper -->
  <div class="wrapper" >
    <!-- system-tab -->
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">
          {{constApprovalType[approvalType]}}
        </li>
      </ul>
    </div>
    <!-- /system-tab -->
    <!-- system-content -->
    <div class="system-content">
      <!-- approvalType =  
        1 线路上架
        2 订单调价
        3 退款审批
        4 退团审批
        5 计调请款
        7 收款审批
        8 供应商审批
        9 认款审批
        10 账单调账审批
        11 发票审批     这期暂无
        12 提现审批     不需要
        13 退票审批 机票 未 无数据   退票暂未好
        14 退票审批 火车票
        15 退票审批 门票 未 有数据   退票暂未好
        16 退票审批 酒店 未 无数据   退票暂未好
        17 签证上架
        18 农特优上架
        19 退款审批 签证
        20 退款审批 农特优
        21 门票上架
        22 酒店上架
      -->
      <template v-if="approvalType == 1">
        <div class="mod-form trip-wrapper">
          <div class="title">基本信息</div>
          <div class="base-list">
            <div class="base-con" v-if="baseInfo.departure_city_name">
              <div class="base-pd">
                <div class="base-contit">出发地：</div>
                <div class="base-coninfo">{{ baseInfo.departure_city_name }}</div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.assembing_time">
              <div class="base-pd">
                <div class="base-contit">集合时间：</div>
                <div class="base-coninfo">{{ baseInfo.assembing_time }}</div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.destination_city_name">
              <div class="base-pd">
                <div class="base-contit">目的地：</div>
                <div class="base-coninfo">{{ baseInfo.destination_city_name }}</div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.assembing_place">
              <div class="base-pd">
                <div class="base-contit">集合地点：</div>
                <div class="base-coninfo">{{ baseInfo.assembing_place }}</div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.trip_days || baseInfo.trip_night">
              <div class="base-pd">
                <div class="base-contit">行程天数：</div>
                <div class="base-coninfo">
                  {{ baseInfo.trip_days }}天
                  {{ baseInfo.trip_night }}夜
                </div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.category_name_1">
              <div class="base-pd">
                <div class="base-contit">行程类别：</div>
                <div class="base-coninfo">{{ baseInfo.category_name_1 }}<span v-if="baseInfo.category_name_2">></span>{{ baseInfo.category_name_2 }}<span v-if="baseInfo.category_name_3">></span>{{ baseInfo.category_name_3 }}</div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.departure_traffic_type_name">
              <div class="base-pd">
                <div class="base-contit">去程交通：</div>
                <div class="base-coninfo">
                  <span>{{ baseInfo.departure_traffic_type_name }}</span>
                  <span v-if="baseInfo.departure_traffic_content">({{ baseInfo.departure_traffic_content }})</span>
                </div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.seattime">
              <div class="base-pd">
                <div class="base-contit">占位有效时间：</div>
                <div class="base-coninfo">{{ baseInfo.seattime }}{{ baseInfo.seattime_type_name }}</div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.back_traffic_type_name">
              <div class="base-pd">
                <div class="base-contit">返程交通：</div>
                <div class="base-coninfo">
                  <span>{{ baseInfo.back_traffic_type_name }}</span>
                  <span v-if="baseInfo.back_traffic_content">({{ baseInfo.back_traffic_content }})</span>
                </div>
              </div>
            </div>
            <div class="base-con" v-if="baseInfo.operator_name">
              <div class="base-pd">
                <div class="base-contit">OP：</div>
                <div class="base-coninfo">{{ baseInfo.operator_name }}</div>
              </div>
            </div>
          </div>
          <div class="pc-wrapper pd20" v-show="baseInfo.trip_pic_url && baseInfo.trip_pic_url.length > 0">
            <div class="pc-item" v-for="(item, index) in baseInfo.trip_pic_url" :key="index" :style="`backgroundImage:url(${item})`">
              <a :href="item" target="_blank"/>
            </div>
          </div>
          <div v-show="product_type == '0' && Array.isArray(attachment_lists) && attachment_lists.length > 0">
            <div class="title">简易开团附件：</div>
            <ul class="easy-trip-doclist">
              <li v-for="(item, index) in attachment_lists" :key="index">
                <span><b class="doc-idx">{{ index + 1 }}.</b>{{ item.name }}<i class="doc-size">({{ item.size }})</i></span>
                <a class="doc-down" :href="item.path">下载</a>
              </li>
            </ul>
          </div>
          <div v-show="product_type == '1'">
            <div class="title" v-if="tripInfo && tripInfo.length > 0">行程内容</div>
            <div class="trip-detail-wrap tripday-wrapper" v-show="tripInfo && tripInfo.length > 0">
              <div class="trip-detail-inner" v-for="(item, index) in tripInfo" :key="index">
                <h2 class="trip-detail-tit">第{{ index + 1 }}天  {{ item.destination_name }}</h2>
                <div class="trip-detial-row-box">
                  <div class="trip-detail-row" v-if="item.eat_1 || item.eat_2 || item.eat_3">
                    <i class="traffic-btn icon-eat"/>
                    <div class="trip-detail-itemtit">用餐</div>
                    <template v-if=" item.eat_1 || item.eat_2 || item.eat_3">
                      <span v-if="item.eat_1">早餐&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span v-if="item.eat_2">午餐&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span v-if="item.eat_3">晚餐&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </template>
                    <!-- <span v-else>自理</span> -->
                  </div>
                  <div class="trip-detail-row" v-if="item.hotel_type_name">
                    <i class="traffic-btn icon-hotel"/>
                    <div class="trip-detail-itemtit">酒店</div>
                    <span>{{ item.hotel_type_name }}</span>
                    <span v-if="item.hotel_info && item.hotel_info.length > 0" class="hotel-tip">参考酒店：<span v-for="hotelinfo in item.hotel_info" :key="hotelinfo">{{ hotelinfo }}</span>或同等级酒店</span>
                  </div>
                  <div class="trip-detail-row" v-if="item.traffic">
                    <i class="traffic-btn icon-bus"/>
                    <div class="trip-detail-itemtit">交通</div>
                    <div>{{ item.traffic }}</div>
                  </div>
                  <div class="trip-detail-row" v-if="item.scenic_spots && item.scenic_spots.length > 0">
                    <i class="traffic-btn icon-scienic"/>
                    <div class="trip-detail-itemtit">景点</div>
                    <span v-for="(scenic, idx) in item.scenic_spots" :key="idx">
                      {{ scenic.scenic_spots }}
                      <span v-show="scenic.scenic_spots_time > 0">({{ (parseInt(scenic.scenic_spots_time) / 60).toFixed(1) }}小时)</span>
                      <i class="hotel-tip" v-show="idx != item.scenic_spots.length - 1">-></i>
                    </span>
                  </div>
                  <div class="trip-detail-row" v-if="item.trip_instruction">
                    <i class="traffic-btn icon-desc"/>
                    <div class="trip-detail-itemtit">行程说明</div>
                    <div v-html="item.trip_instruction"/>
                  </div>
                </div>
                <div class="pc-wrapper" v-show="item.trip_pic_url && item.trip_pic_url.length > 0">
                  <div class="pc-item" v-for="(pic, idx) in item.trip_pic_url" :key="idx" :style="`backgroundImage:url(${pic})`">
                    <a :href="pic" target="_blank"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="title" v-if="own_shopping && own_shopping.length > 0">购物点</div>
            <div v-if="own_shopping && own_shopping.length > 0">
              <el-table
                :data="own_shopping"
                style="width: 100%"
                border
              >
                <el-table-column
                  prop="name"
                  label="购物点名称"
                  width="180"
                  align="center"/>
                <el-table-column
                  prop="stay_time"
                  label="停留时间（分钟）"
                  width="180"
                  align="center"/>
                <el-table-column
                  prop="project"
                  label="经营项目"
                  align="center"/>
              </el-table>
            </div>
            <div class="title" v-if="visa_info && visa_info.length > 0">签证信息</div>
            <div v-if="visa_info && visa_info.length > 0">
              <el-table
                :data="visa_info"
                style="width: 100%"
                border
              >
                <el-table-column
                  prop="card_type"
                  label="身份类型"
                  width="180"
                  align="center"/>
                <el-table-column
                  prop="instruction"
                  label="需要提交材料"
                  align="center"/>
                <el-table-column
                  prop="need_reference"
                  label="详细说明"
                  align="center"/>
              </el-table>
            </div>
            <div class="title" v-if="tripdesc.trip_features || tripdesc.fee_includes || tripdesc.cost_excludes || tripdesc.booking_info || tripdesc.safety_info || tripdesc.remark">说明</div>
            <div class="tip-tab-wrap" v-if="tripdesc.trip_features || tripdesc.fee_includes || tripdesc.cost_excludes || tripdesc.booking_info || tripdesc.safety_info || tripdesc.remark">
              <el-tabs v-model="activeName">
                <el-tab-pane v-if="tripdesc.trip_features" label="路线特色" name="1">{{ tripdesc.trip_features }}</el-tab-pane>
                <template v-if="tripdesc.fee_includes">
                  <el-tab-pane v-if="tripdesc.fee_includes_type == 1" label="费用包含" name="2" v-html="tripdesc.fee_includes"/>
                  <el-tab-pane v-else-if="tripdesc.fee_includes_type == 2" label="费用包含" name="2">
                    <el-table border :data="tripdesc.fee_includes">
                      <el-table-column label="费用项" header-align="center" width="250" prop="name"/>
                      <el-table-column label="描述" header-align="center" prop="describe"/>
                    </el-table>
                  </el-tab-pane>
                </template>
                <template v-if="tripdesc.cost_excludes">
                  <el-tab-pane v-if="tripdesc.cost_excludes_type == 1" label="费用不包含" name="3" v-html="tripdesc.cost_excludes"/>
                  <el-tab-pane v-else-if="tripdesc.cost_excludes_type == 2" label="费用不包含" name="3">
                    <el-table border :data="tripdesc.cost_excludes">
                      <el-table-column label="费用项" header-align="center" width="250" prop="name"/>
                      <el-table-column label="描述" header-align="center" prop="describe"/>
                    </el-table>
                  </el-tab-pane>
                </template>
                <el-tab-pane v-if="tripdesc.booking_info" label="预订须知" name="4" v-html="tripdesc.booking_info"/>
                <el-tab-pane v-if="tripdesc.safety_info" label="安全说明" name="5" v-html="tripdesc.safety_info"/>
                <el-tab-pane v-if="tripdesc.remark" label="备注" name="6" v-html="tripdesc.remark"/>
              </el-tabs>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 2">
        <div class="cont">
          <div class="panel">
            <div class="hd">
              <h2>团队订单信息</h2>
            </div>
            <div class="bd">
              <el-table class="el-table--middle" :data="orderDetailData.order_info" border style="width: 100%">
                <el-table-column align="center" prop="order_from_name" width="80px" label="订单来源" />
                <el-table-column align="center" prop="order_no" width="170px" label="订单编号" />
                <el-table-column align="center" prop="confirm_status_name" width="80px" label="订单状态" />
                <el-table-column
                  header-align="center"
                  align="right"
                  prop="rmb_total_amount"
                  min-width="95"
                  label="订单总金额"
                >
                  <template slot-scope="scope">
                    <p class="color-orange">
                      <!-- {{scope.row.rmb_total_amount}} -->
                      <template v-if="scope.row.confirm_status != -1">
                        {{ rmbSettlementAmount | formatPrice }}
                      </template>
                      <template v-else>
                        {{ scope.row.rmb_total_amount }}
                      </template>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="right"
                  prop="rmb_receipted_amount"
                  min-width="80"
                  label="已收"
                >
                  <template slot-scope="scope">
                    <template v-if="scope.row.confirm_status != 2">--</template>
                    <template v-else>{{ scope.row.rmb_receipted_amount }}</template>
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  align="right"
                  prop="rmb_bills_no_amount"
                  min-width="80"
                  label="未收"
                >
                  <template slot-scope="scope">
                    <template v-if="scope.row.confirm_status != 2">--</template>
                    <template v-else>{{ scope.row.rmb_bills_no_amount }}</template>
                  </template>
                </el-table-column>
                <template v-if="orderInfo.order_from != 3">
                  <el-table-column align="center" prop="distributor_org_name" label="结算方公司名称" min-width="140">
                    <template slot-scope="scope">
                      <p class="ellipsis" :title="scope.row.distributor_org_name">
                        {{ scope.row.distributor_org_name }}
                      </p>
                    </template>
                  </el-table-column>
                </template>
                <template v-else>
                  <el-table-column align="center" prop="distributor_org_name" label="代理商/联系人" min-width="140">
                    <template slot-scope="scope">
                      <p class="ellipsis" :title="scope.row.distributor_org_name">
                        {{ scope.row.distributor_org_name }}
                      </p>
                    </template>
                  </el-table-column>
                </template>
                <!-- 已占位（1）下显示清位时间 -->
                <el-table-column align="center" width="100px" label="清位时间" v-if="orderInfo.clear_time != ''">
                  <template slot-scope="scope">
                    {{ scope.row.clear_time == '0分钟' ? '--' : showTime }}
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="scheduled_time" width="95" label="下单时间">
                  <template slot-scope="scope">
                    {{ scope.row.scheduled_time }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>游客信息</h2>
            </div>
            <div class="bd">
              <el-table :data="orderDetailData.tourist_lists" border style="width: 100%">
                <el-table-column align="center" label="姓名">
                  <template slot-scope="scope">
                    {{ scope.row.username }}
                    <router-link
                      class="mr0"
                      v-if="scope.row.cancel_status != 0 && tuituanDetailPerm"
                      :to="{ path: tuituanDetailUrl, query: {ono: scope.row.order_no, tid: tuanId}}"
                    >[退]</router-link>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="gender" width="50px" label="性别" />
                <el-table-column
                  v-if="!isBOMTrip"
                  align="center"
                  prop="tourist_type"
                  width="100px"
                  label="游客类型"
                />
                <el-table-column align="center" prop="identity_type" width="100px" label="证件类型" />
                <el-table-column align="center" prop="identity_no" min-width="180px" label="证件号码" />
                <el-table-column align="center" prop="identity_end_date" width="100px" label="证件有效期" />
                <el-table-column align="center" prop="nationality" label="国籍" />
                <el-table-column align="center" prop="mobile" width="140px" label="手机号码" />
                <el-table-column align="center" prop="birthday" width="100px" label="出生日期" />
                <el-table-column align="center" prop="remark" label="备注">
                  <template slot-scope="scope">
                    <p class="ellipsis" :title="scope.row.remark">{{ scope.row.remark }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>订单价格明细</h2>
            </div>
            <div class="neck-txt">
              <span>结算币种 / 汇率：{{ orderDetailData.currency + ' / ' + orderDetailData.currency_rate }}</span>
              <span>结算总金额：
                <i>{{ settlementAmount | formatPrice }}</i>
              </span>
              <span>本位币：
                <i>{{ rmbSettlementAmount | formatPrice }}</i>
              </span>
            </div>
            <div class="bd">
              <el-table style="width: 100%" border :data="orderDetailData.order_price_detail">
                <el-table-column type="index" label="序号" width="50" align="center" />
                <el-table-column label="项目" align="center" prop="item_name" />
                <el-table-column label="单价" width="120" header-align="center" align="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.operator == '-' && scope.row.rmb_unit_price">-</span>{{ scope.row.rmb_unit_price | formatPrice }}
                  </template>
                </el-table-column>
                <el-table-column label="结算单价" width="150" header-align="center" align="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.operator == '-' && scope.row.unit_price">-</span>{{ scope.row.unit_price | formatPrice }}
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="70" align="center" prop="num" />
                <el-table-column label="结算金额小计" width="120" header-align="center" align="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.total_amount | formatPrice }}
                  </template>
                </el-table-column>
                <el-table-column label="小计" width="120" header-align="center" align="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.rmb_total_amount | formatPrice }}
                  </template>
                </el-table-column>
                <el-table-column label="说明" align="center">
                  <template slot-scope="scope">
                    <p class="ellipsis" :title="scope.row.remark">{{ scope.row.remark }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="panel" v-if="orderDetailData.visa_info.length > 0">
            <div class="hd">
              <h2>签证材料要求</h2>
            </div>
            <div class="bd">
              <el-table style="width: 100%" border :data="orderDetailData.visa_info">
                <el-table-column label="身份类型" prop="card_type" width="100" align="center" />
                <el-table-column label="需要提交的材料" prop="need_reference" align="center" />
                <el-table-column label="详细说明" prop="instruction" header-align="center" />
              </el-table>
            </div>
          </div>
          <div class="panel">
            <div class="hd">
              <h2>材料信息</h2>
            </div>
            <div class="bd">
              <el-table style="width: 100%" :data="materialInfo.list" border>
                <el-table-column label="材料" prop="item" width="120" align="center" />
                <el-table-column label="状态" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.item != '发票'">
                      <span v-if="scope.row.status_name">{{ scope.row.status_name }}</span>
                      <span v-else>--</span>
                    </div>
                    <div v-else>
                      <span v-if="scope.row.status_name && orderInfo.order_from != 2">{{ scope.row.status_name }}</span>
                      <span v-else>--</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <template v-if="!scope.row.edit.length">--</template>
                    <template v-else v-for="(edit, i) in scope.row.edit">

                      <a v-if="edit == 5" :key="i" download :href="materialInfo.edit_data.notification_url">
                        下载出团通知书
                      </a>
                      <span class="span-btn" v-else-if="isShowMaterialOperate(edit, scope.row)" :key="i" @click="handleMaterialOperate(edit, scope.row)">
                        {{ MATERIAL_EDIT_MAP[edit] }}
                      </span>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- <div v-if="canAddOrderDetail" class="submit-buttons">
            <el-button type="primary" size="large" @click="handleSubmitForm">保 存</el-button>
            <el-button size="large" @click="handleGoBack">取 消</el-button>
          </div> -->
        </div>
      </template>
      <template v-else-if="approvalType == 3 || approvalType == 4">
        <div class="ty4">
          <h2 class="tit">退团/款单列表</h2>
          <ul class="tuituan-con">
            <li v-for="(item,i) in list.cancel_list" :key="i">
              <table class="el-table el-table-center">
                <thead>
                  <tr>
                    <th>申请日期</th>
                    <th>{{ item.type == 1 ? '退团' : '退款' }}单号</th>
                    <th>{{ item.type == 1 ? '退团' : '退款' }}状态</th>
                    <th v-if="item.type==1">游客姓名</th>
                    <th v-else>申请退款金额</th>
                    <!-- 待定损状态下订单损失金额和可退金额显示为- -->
                    <th>订单损失金额</th>
                    <th>应退款金额</th>
                    <th>实际退款金额</th>
                    <th>财务退款状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ item.apply_time }}</td>
                    <td>{{ item.cancel_no }}</td>
                    <td><span :class="item.status | getStatusColor">
                      {{ item.type == 1 ? TUITUAN_STATUS_MAP[item.status] : TUIKUAN_STATUS_MAP[item.status] }}
                    </span></td>
                    <td v-if="item.type==1">{{ item.user_name || '--' }}</td>
                    <td v-else class="tar color-orange"><div class="cell">
                      {{ item.apply_amount }}
                    </div></td>
                    <td><div class="cell tar">{{ item.status == 1 ? '--' : item.loss_amount }}</div></td>
                    <td><div class="cell tar">{{ item.status == 1 ? '--' : item.refund_amount }}</div></td>
                    <td><div class="cell tar">{{ item.real_refund_amount === '' ? '--' : item.real_refund_amount }}</div></td>
                    <td>{{ item.refund_status || '--' }}</td>
                    <td><div class="cell">
                      <template v-if="item.edit.length > 0">
                        <span v-for="(p,i2) in item.edit" :key="i2">
                          <span v-if="p == 1" class="span-btn" @click="dingsun(item,i)">
                            {{ item.edit_list[p] }}
                          </span>
                          <span v-if="p == 2" class="span-btn" @click="handleConfirm(item)">
                            {{ item.edit_list[p] }}
                          </span>
                          <span v-if="p == 3" class="span-btn" @click="handleCancel(item)">
                            {{ item.edit_list[p] }}
                          </span>
                          <router-link v-if="p == 4" class="span-btn" :to="'/system/approval/detail?id=' + item.approval_id">
                            {{ item.edit_list[p] }}
                          </router-link>
                        </span>
                      </template>
                      <span v-else>--</span>
                    </div></td>
                  </tr>
                </tbody>
              </table>
              <div class="tuituan-info">
                <p>
                  <span class="label">申请人/时间：</span>{{ item.apply_user_name }} / {{ item.apply_time }}
                </p>
                <p v-if="item.remark != ''">
                  <span class="label">{{ item.type == 1 ? '退团' : '退款' }}原因说明：</span>{{ item.remark }}
                </p>
                <div v-if="item.evaluate && item.evaluate.length">
                  <p v-for="(evaluate, i) in item.evaluate" :key="i">
                    <span class="label">定损人／时间：</span>
                    {{ evaluate.evaluate_user_name }} / {{ evaluate.evaluate_time }}
                    {{ evaluate.loss_detail }}
                    {{ evaluate.remark }}
                  </p>
                </div>
                <p v-if="item.status == 3 && item.confirm_user_name != ''">
                  <span class="label">确定{{ item.type == 1 ? '退团' : '退款' }}人／时间：</span>{{ item.confirm_user_name }} / {{ item.confirm_time }}
                </p>
                <p v-if="item.status == 4 && item.revoke_user_name != ''">
                  <span class="label">撤回人／时间：</span>{{ item.revoke_user_name }} / {{ item.revoke_time }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </template>
      <template v-else-if="approvalType == 5">
        <div class="recieve-info type5">
          <h2 class="recieve-tit">请款信息</h2>
          <div class="receive-content">
            <div class="content-box">
              <span class="content-label">总请款金额</span>
              <span v-if="applied && applied.applied_amount" class="content-right">
                <span class="color-orange">{{applied.applied_amount}}</span>
                <span v-if="applied.status === 4" class="color-green">[{{applied.status_str}}]</span>
                <span v-else-if="applied.status === 2" class="color-red">[{{applied.status_str}}]</span>
                <span v-else class="color-red">[{{applied.status_str}}]</span>
              </span>
              <span v-else class="content-right">--</span>
            </div>
            <div class="content-box">
              <span class="content-label">请款单ID</span>
              <span v-if="applied && applied.id" class="content-right">{{applied.id}}</span>
              <span v-else class="content-right">--</span>
            </div>
            <div class="content-box">
              <span class="content-label">对方单位名称</span>
              <span v-if="applied && applied.settlement_org_name" class="content-right">{{applied.settlement_org_name}}</span>
              <span v-else class="content-right">--</span>
            </div>
            <div class="content-box">
              <span class="content-label">开户行／账号</span>
              <span v-if="applied && applied.bank_name" class="content-right">{{applied.bank_name}} / {{applied.bank_number}}</span>
              <span v-else class="content-right">--</span>
            </div>
          </div>
          <h2 class="recieve-tit">应付</h2>
          <div class="receive-content">
            <div class="hide-wrap" v-for="(item, key) in detail" :key="key">
              <div @click="showDetail(key)" class="hide-btn">
                <div class="hide-inner" :class="item.show ? 'show' : '' ">
                  {{item.show ? '收起' : '展开'}}
                </div>
              </div>
              <div :class="item.show ? '' : 'hide-action'">
                <div class="content-box">
                  <span class="content-label">成本ID</span>
                  <span v-if="item.id" class="content-right">
                    {{item.id}}
                    <el-tag v-if="item.amount_str === '未付清'" type="danger">{{item.amount_str}}</el-tag>
                    <el-tag v-else type="success">{{item.amount_str}}</el-tag>
                  </span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">应付</span>
                  <span v-if="item.rmb_total_amount" class="content-right">{{item.rmb_total_amount}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div v-if="item.amount_str === '未付清'" class="content-box">
                  <span class="content-label">未付</span>
                  <span v-if="item.no_pay_total_amount" class="content-right">{{item.no_pay_total_amount}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div v-else class="content-box">
                  <span class="content-label">本次付款</span>
                  <span v-if="item.fact_rmb_total_amount" class="content-right">{{item.fact_rmb_total_amount}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">项目号</span>
                  <span v-if="item.item_no" class="content-right">{{item.item_no}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">团号</span>
                  <span v-if="item.tuan_no" class="content-right">{{item.tuan_no}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">供应商</span>
                  <span v-if="item.supplier_org_name" class="content-right">{{item.supplier_org_name}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">项目类型</span>
                  <span v-if="item.item_type_str" class="content-right">{{item.item_type_str}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">项目名称</span>
                  <span v-if="item.item_name" class="content-right">{{item.item_name}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">数量</span>
                  <span v-if="item.num" class="content-right">{{item.num}}</span>
                  <span v-else class="content-right">
                    {{item.num}}
                    <template v-if="item.attr">
                      <span v-if="item.item_type === 4">
                        ({{item.attr.meals_nums}}餐{{item.attr.people_nums}}人)
                      </span>
                      <span v-else-if="item.item_type === 12">
                        ({{item.attr.days}}晚{{item.attr.room_nums}}间)
                      </span>
                      <span v-else-if='item.item_type === 20'>
                        ({{item.attr.guides_nums}}导游{{item.attr.service_nums}}天)
                      </span>
                    </template>
                  </span>
                </div>
                <div class="content-box">
                  <span class="content-label">单价</span>
                  <span v-if="item.rmb_unit_price" class="content-right">{{item.rmb_unit_price}}({{item.currency}}/{{item.currency_rate}})</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">合计</span>
                  <span class="content-right">
                    {{item.num * item.rmb_unit_price}}
                    <span v-if='item.item_type === 4'>
                      (餐数*人数*单价)
                    </span>
                    <span v-else-if="item.item_type === 12">
                      (入住天数*房间数*单价)
                    </span>
                    <span v-else-if="item.item_type === 20">
                      (导游数*服务天数*单价)
                    </span>
                    <span v-else>
                      (数量*单价)
                    </span>
                  </span>
                </div>
                <div class="content-box">
                  <span class="content-label">成本摊派</span>
                  <span v-if="item.apportion_list" class="content-right">
                    <div class="mb10">指定订单人头</div>
                    <div v-for="(item2, index2) in item.apportion_list" :key="index2" class="mb10">
                      <template v-for="(item3, key3) in item2">
                        {{key3}}(
                        <template v-for="(item4, index4) in item3">
                          {{item4.username}}
                          <template v-if="index4 != item3.length - 1">，</template>
                        </template>
                        )
                      </template>
                    </div>
                  </span>
                  <span v-else class="content-right">均摊</span>
                </div>
                <div class="content-box">
                  <span class="content-label">调账申请</span>
                  <span v-if="item.adjustment_detail" class="content-right">
                    <div v-for="(item2, index2) in item.adjustment_detail"  :key="index2" class="mb10">
                      <router-link :to="{path: '/control/adjustment-detail', query: {id: item2.adjustment_id, type: 2}}">{{item2.item_no}}</router-link>[调前应付：{{item2.front_amount}}]
                    </div>
                  </span>
                  <span v-else class="content-right">--</span>
                </div>
                <!-- <div class="content-box">
                  <span class="content-label">备注说明</span>
                  <span v-if="item.remark" class="content-right">{{item.remark}}</span>
                  <span v-else class="content-right">--</span>
                </div> -->
                <div class="content-box">
                  <span class="content-label">创建时间</span>
                  <span class="content-right">{{createDate(item.create_time)}}</span>
                </div>
                <div class="content-box">
                  <span class="content-label">创建人</span>
                  <span v-if="item.user_name" class="content-right">{{item.user_name}}</span>
                  <span v-else class="content-right">--</span>
                </div>
                <div class="content-box">
                  <span class="content-label">确认件</span>
                  <span v-if="item.confirm_piece_lists && item.confirm_piece_lists.length > 0" class="content-rightimg">
                    <div v-for="(item2, index2) in item.confirm_piece_lists" class="pic-wrap" :key='index2'>
                      <div class="pic-top" :style="&quot;background-image:url(&quot; + item2.url + &quot;)&quot;">
                        <a :href="item2.url" class="big-btn" target="_blank"/>
                      </div>
                    </div>
                  </span>
                  <span v-else class="content-right">--</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 7">
        <div class="recieve-info">
          <h2 class="recieve-tit">收款信息</h2>
          <div class="receive-content">
            <div class="content-box">
              <span class="content-label">收款人</span>
              <span class="content-right">{{ info.payment.user_name }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">所属部门</span>
              <span class="content-right">{{ info.payment.org_name }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">业务类型</span>
              <span class="content-right" v-if="info.payment.user_collection_type === 0">--</span>
              <span class="content-right" v-else>{{ info.payment.user_collection_type === 1 ? "团队订单收入" : "团队杂费收入" }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">收款金额（本位币）</span>
              <span class="content-right">{{ info.payment.rmb_total_amount }}元<em class="tip">[{{ info.payment.is_money_clear }}]</em></span>
            </div>
            <div class="content-box">
              <span class="content-label">金额／币种／汇率</span>
              <span class="content-right">{{ info.payment.total_amount }}({{ info.payment.currency }} / 汇率{{ info.payment.currency_rate }})</span>
            </div>
            <div class="content-box">
              <span class="content-label">收款方式／账户</span>
              <span class="content-right" v-if="!info.payment.receipt_bank_name && !info.payment.receipt_account && !info.payment.receipt_account_name">--</span>
              <span class="content-right" v-else>{{ info.payment.receipt_bank_name }}{{info.payment.receipt_account}}{{info.payment.receipt_account_name}}</span>
            </div>
            <div class="content-box">
              <span class="content-label">收款日期</span>
              <span class="content-right">{{ info.payment.payment_date ? info.payment.payment_date : '--' }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">备注</span>
              <span class="content-right">{{ info.payment.remark ? info.payment.remark : '--' }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">上传收款凭证</span>
              <span class="content-right" v-if="info.payment.attachment && info.payment.attachment.length === 0">--</span>
              <span class="content-rightimg" v-else>
                <div class="pic-wrap" v-for="(item, index) in info.payment.attachment" :key="index">
                  <div class="pic-top" :style='"background-image:url(" + item.url+ ")"'>
                    <a :href="item.url" class="big-btn" target="_blank"></a>
                  </div>
                  <div class="pic-bottom">
                    <a download :href="item.url">下载</a>
                  </div>
                </div>
              </span>
            </div>
            <div class="content-box">
              <span class="content-label">创建时间</span>
              <span class="content-right">{{ info.payment.create_time ? info.payment.create_time : '--'}}</span>
            </div>
          </div>
          <h2 class="recieve-tit">业务认款</h2>
          <div class="receive-money-wrap mtb clearfix">
            <div class="money-wrap">
              已认金额<span>{{ info.payment.already_claim_money }}</span>
            </div>
          </div>
          <div class="receive-money-wrap clearfix">
            <el-table
              :data="info.payment_detail"
              border
              style="width: 100%">
              <el-table-column
                prop="tuan_no"
                label="项目号(团号)"
                align="center"
                min-width="320">
              </el-table-column>
              <el-table-column
                label="应收ID"
                prop="bill_id"
                align="center"
                width="70">
              </el-table-column>
              <el-table-column
                label="认款ID"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <span class="primary">[{{scope.row.user_type_name}}]</span>
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="rmb_total_amount"
                align="center"
                width="100"
                label="认款金额">
                <template slot-scope="scope">
                  <div class="orange">{{scope.row.rmb_total_amount}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="renkuan_role_name"
                align="center"
                width="100"
                label="认款类型">
              </el-table-column>
              <el-table-column
                prop="payment_status"
                align="center"
                width="120"
                label="认款状态">
                <template slot-scope="scope">
                  <span class="black" v-if=" scope.row.payment_status === 1">待审批</span>
                  <span class="green" v-if=" scope.row.payment_status === 2">审批通过</span>
                  <span class="red" v-if=" scope.row.payment_status === 3">审批不通过</span>
                  <span class="gray" v-if=" scope.row.payment_status === 4">已撤销</span>
                  <span class="red" v-if=" scope.row.payment_status === 5">已作废</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="user_name"
                align="center"
                width="100"
                label="认款人">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 8">
        <div class="content-list">
          <div class="recieve-detail">
            <div class="recieve-info">
              <div class="recieve-tit">基本信息</div>
              <div class="recieve-content">
                <div v-if="info.company_name && info.company_name.length > 0" class="recieve-content-item">
                  <div class="label">公司全称</div>
                  <div class="content">{{info.company_name}}</div>
                </div>
                <div v-if="info.taxpayer_num && info.taxpayer_num.length > 0" class="recieve-content-item">
                  <div class="label">税号</div>
                  <div class="content">{{info.taxpayer_num}}</div>
                </div>
                <div v-if="info.province && info.province.length > 0" class="recieve-content-item">
                  <div class="label">所在城市</div>
                  <div class="content">{{info.province}}{{info.city}}</div>
                </div>
                <div v-if="info.address && info.address.length > 0" class="recieve-content-item">
                  <div class="label">地址</div>
                  <div class="content">{{info.address}}</div>
                </div>
              </div>
            <div class="recieve-tit">合作信息</div>
            <div class="recieve-content">
              <div class="recieve-content-item">
                <div class="label">合作信息</div>
                <div class="content">
                  <div class="line-wrap" v-for="(item, index) in info.line_of_cooperation" v-if="item.check" :key="index">
                    <div class="line-one">
                      <span class="line-tit">{{item.name}}</span>
                    </div>
                    <div v-for="(item2, index2) in item.child" v-if="item2.check" :key="'b' + index2" class="line-two">
                      <span class="line-tit">{{item2.name}}</span>
                      <div class="line-three clearfix">
                        <span class="line-item" v-for="(item3, index3) in item2.child" v-if="item3.check" :key="'c' + index3">
                          <span class="line-tit">{{item3.name}}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="recieve-content-item">
                <div class="label">合作有效期截至</div>
                <div class="content">
                  <template v-if="info.cooperation_validity_period">
                    {{info.cooperation_validity_period}}
                  </template>
                  <template v-else>
                    --
                  </template>
                </div>
              </div>
              <!-- <div class="recieve-content-item">
                <div class="label">返佣比例</div>
                <div class="content">{{info.share_benefit_proportion}}%</div>
              </div> -->
              <div v-if="info.credit_line && info.credit_line != 0" class="recieve-content-item">
                <div class="label">授信额度</div>
                <div class="content">{{info.credit_line}}元</div>
              </div>
              <div v-if="info.cooperation_agreement && info.cooperation_agreement.length > 0" class="recieve-content-item">
                <div class="label">合作协议/合同</div>
                <div class="content clearfix">
                  <a v-for="(item, index) in info.cooperation_agreement" :href="item" class="img-fr" target="_blank" :key="index">
                    <img :src="item" alt="">
                  </a>
                </div>
              </div>
            </div>
              <div class="recieve-tit" v-if="info.payment_account && info.payment_account.length > 0">账户信息</div>
              <div class="recieve-content" v-if="info.payment_account && info.payment_account.length > 0">
                <el-table
                  :data="info.payment_account"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="account_bank"
                    align='center'
                    label="开户银行">
                  </el-table-column>
                  <el-table-column
                    prop="account_name"
                    align='center'
                    label="开户名">
                  </el-table-column>
                  <el-table-column
                    prop="account_no"
                    align='center'
                    label="银行卡号">
                  </el-table-column>
                </el-table>
              </div>
              <div class="recieve-tit" v-if="info.settlement_client && info.settlement_client.length > 0">联系人信息</div>
              <div class="recieve-content" v-if="info.settlement_client && info.settlement_client.length > 0">
                <el-table
                  :data="info.settlement_client"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    align='center'
                    label="联系人姓名">
                  </el-table-column>
                  <el-table-column
                    prop="id_card"
                    align='center'
                    label="身份证">
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    align='center'
                    label="联系电话">
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    align='center'
                    label="邮箱">
                  </el-table-column>
                </el-table>
              </div>
              <template v-if="info.business_license && info.business_license.length > 0">
                <div class="recieve-tit">资质信息</div>
                <div class="recieve-content">
                  <div v-if="info.business_license && info.business_license.length > 0" class="recieve-content-item">
                    <div class="label">营业执照</div>
                    <div class="content">{{info.business_license}}</div>
                  </div>
                  <div v-if="info.business_license_pic && info.business_license_pic.length > 0" class="recieve-content-item">
                    <a :href="info.business_license_pic" class="img">
                      <img :src="info.business_license_pic" alt="">
                    </a>
                  </div>
                  <div v-if="info.bl_validity_period_start || info.bl_validity_period_end" class="recieve-content-item">
                    <div class="label">证件有效期</div>
                    <div class="content">{{info.bl_validity_period_start}}至{{info.bl_validity_period_end}}</div>
                  </div>
                  <div v-if="info.license_num_of_bl && info.license_num_of_bl.length > 0" class="recieve-content-item">
                    <div class="label">营业证许可编号</div>
                    <div class="content">{{info.license_num_of_bl}}</div>
                  </div>
                  <div v-if="info.license_num_of_bl_pic && info.license_num_of_bl_pic.length > 0" class="recieve-content-item">
                    <a :href="info.license_num_of_bl_pic" class="img">
                      <img :src="info.license_num_of_bl_pic" alt="">
                    </a>
                  </div>
                  <div v-if="info.tax_registration_num && info.tax_registration_num.length > 0" class="recieve-content-item">
                    <div class="label">税务登记号</div>
                    <div class="content">{{info.tax_registration_num}}</div>
                  </div>
                  <div v-if="info.tax_registration_num_pic && info.tax_registration_num_pic.length > 0" class="recieve-content-item">
                    <a :href="info.tax_registration_num_pic" class="img">
                      <img :src="info.tax_registration_num_pic" alt="">
                    </a>
                  </div>
                  <div v-if="info.liability_insurance_policy && info.liability_insurance_policy.length > 0" class="recieve-content-item">
                    <div class="label">责任保险单</div>
                    <div class="content">{{info.liability_insurance_policy}}</div>
                  </div>
                  <div v-if="info.liability_insurance_policy_pic && info.liability_insurance_policy_pic.length > 0" class="recieve-content-item">
                    <a :href="info.liability_insurance_policy_pic" class="img">
                      <img :src="info.liability_insurance_policy_pic" alt="">
                    </a>
                  </div>
                  <div v-if="info.lip_validity_period_start || info.lip_validity_period_end" class="recieve-content-item">
                    <div class="label">证件有效期</div>
                    <div class="content">{{info.lip_validity_period_start}}至{{info.lip_validity_period_end}}</div>
                  </div>
                  <div v-if="info.account_bank_account && info.account_bank_account.length > 0" class="recieve-content-item">
                    <div class="label">开户行账户</div>
                    <div class="content">{{info.account_bank_account}}</div>
                  </div>
                  <div v-if="info.account_bank_account_pic && info.account_bank_account_pic.length > 0" class="recieve-content-item">
                    <a :href="info.account_bank_account_pic" class="img">
                      <img :src="info.account_bank_account_pic" alt="">
                    </a>
                  </div>
                  <div v-if="info.id_card_num && info.id_card_num.length > 0" class="recieve-content-item">
                    <div class="label">法人或负责人身份证号码</div>
                    <div class="content">{{info.id_card_num}}</div>
                  </div>
                  <div v-if="info.id_card_pic && info.id_card_pic.length > 0" class="recieve-content-item">
                    <a :href="info.id_card_pic" class="img">
                      <img :src="info.id_card_pic" alt="">
                    </a>
                  </div>
                  <div v-if="info.other && info.other.length > 0" class="recieve-content-item">
                    <div class="label">其他</div>
                    <div class="content">{{info.other}}</div>
                  </div>
                  <div v-if="info.other_pic && info.other_pic.length" class="recieve-content-item">
                    <a :href="info.other_pic" class="img">
                      <img :src="info.other_pic" alt="">
                    </a>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 9">
        <div class="recieve-info ty9">
          <h2 class="recieve-tit">认款信息</h2>
          <div class="receive-content">
            <div class="content-box">
              <span class="content-label">总认款金额</span>
              <span class="content-right color-orange">{{ renkuanInfo.rmb_total_amount }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">认款时间</span>
              <span class="content-right">{{ renkuanInfo.create_time }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">认款ID</span>
              <span class="content-right">{{ renkuanInfo.id }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">认款人</span>
              <span class="content-right">{{ renkuanInfo.user_name }}</span>
            </div>
          </div>
          <h2 class="recieve-tit">认款应收</h2>
          <div class="clearfix">
            <el-table :data="renkuanReceivable" border style="width: 100%">
              <el-table-column
                label="认款金额"
                header-align="center"
                align="right"
                width="120">
                <template slot-scope="scope">
                  <span class="color-orange">{{ renkuanInfo.rmb_total_amount }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="应收ID"
                align="center"
                min-width="200">
                <template slot-scope="scope">
                  <router-link :to="{path: '/sale/recognition/income-detail', query: {parent_id: $route.query.parent_id, bid: scope.row.id}}" class="ellipsis color-purple">
                    {{ scope.row.id }}|{{ ITEM_TYPE_MAP[scope.row.item_type] || ' - ' }}|￥{{ scope.row.rmb_total_amount || 0 }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column
                min-width="250"
                align="center"
                label="项目号(团号)">
                <template slot-scope="scope">
                  <div class="ellipsis">{{ scope.row.tuan_no }}</div>
                  <div class="ellipsis color-gray">{{ scope.row.tuan_name }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div><h2 class="recieve-tit">收款信息</h2>
          <div class="receive-content">
            <div class="content-box">
              <span class="content-label">收款人</span>
              <span class="content-right">{{ shoukuanInfo.user_name }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">所属部门</span>
              <span class="content-right">{{ shoukuanInfo.settlement_org_name }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">业务类型</span>
              <span class="content-right" v-if="shoukuanInfo.user_collection_type === 0">--</span>
              <span class="content-right" v-else>{{ shoukuanInfo.user_collection_type === 1 ? "团队订单收入" : "团队杂费收入" }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">收款金额（本位币）</span>
              <span class="content-right">
                {{ shoukuanInfo.rmb_total_amount }}元
                <em class="tip">[{{ shoukuanInfo.shoukuan_status_str }}]</em>
              </span>
            </div>
            <div class="content-box">
              <span class="content-label">金额／币种／汇率</span>
              <span class="content-right">{{ shoukuanInfo.total_amount }}({{ shoukuanInfo.currency }} / 汇率{{ shoukuanInfo.currency_rate }})</span>
            </div>
            <div class="content-box">
              <span class="content-label">收款方式／账户</span>
              <span class="content-right" v-if="!shoukuanInfo.receipt_bank_name && !shoukuanInfo.receipt_account && !shoukuanInfo.receipt_account_name">--</span>
              <span class="content-right" v-else>{{ shoukuanInfo.receipt_bank_name }}{{ shoukuanInfo.receipt_account }}{{ shoukuanInfo.receipt_account_name }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">收款日期</span>
              <span class="content-right">{{ shoukuanInfo.payment_date ? shoukuanInfo.payment_date : '--' }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">备注</span>
              <span class="content-right">{{ shoukuanInfo.remark ? shoukuanInfo.remark : '--' }}</span>
            </div>
            <div class="content-box">
              <span class="content-label">上传收款凭证</span>
              <span class="content-right" v-if="shoukuanInfo.attachment && shoukuanInfo.attachment.length === 0">--</span>
              <span class="content-rightimg" v-else>
                <div class="pic-wrap" v-for="(item, index) in shoukuanInfo.attachment" :key="index">
                  <div class="pic-top" :style="'background-image:url(' + item+ ')'">
                    <a :href="item" class="big-btn" target="_blank"/>
                  </div>
                  <div class="pic-bottom">
                    <a download :href="item">下载</a>
                  </div>
                </div>
              </span>
            </div>
            <div class="content-box">
              <span class="content-label">创建时间</span>
              <span class="content-right">{{ shoukuanInfo.create_time ? shoukuanInfo.create_time : '--' }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 10">
        <div class="bill-wrap">
          <div class="bill-table-tit">
            基本信息
          </div>
          <div class="bill-table-wrap">
            <el-table :data="adjustment" border style="width: 100%">
              <el-table-column
                align="center"
                prop="tuan_no"
                label="团号"
                width="150">
                <template slot-scope="scope">
                  <div class="ellipsis" :title="scope.row.tuan_no">
                    {{ scope.row.tuan_no }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="item_no"
                header-align="center"
                align="left"
                label="申请单编号"
                width="150"/>
              <el-table-column
                prop="op_name"
                align="center"
                label="申请人"
                width="200">
                <template slot-scope="scope">
                  <div class="ellipsis tc" :title="scope.row.op_name">
                    {{ scope.row.op_name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="org_name"
                align="center"
                label="部门">
                <template slot-scope="scope">
                  <div class="ellipsis tc" :title="scope.row.org_name">
                    {{ scope.row.org_name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="apply_time"
                align="center"
                label="创建时间"
                width="150"/>
            </el-table>
          </div>
          <div class="bill-table-tit">申请内容</div>
          <div class="bill-table-wrap">
            <div class="billinner-table-wrap">
              <el-table
                :data="adjustment_detail"
                border
                style="width: 100%">
                <el-table-column
                  align="center"
                  label="调整项目"
                  width="100">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.bill_type === 1? '收入' : '成本' }}{{ scope.row.bill_style === 1 ? '调账' : '新增' }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="bill_id"
                  align="center"
                  label="ID"
                  width="80">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.bill_id }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="op_name"
                  align="center"
                  label="客户／供应商名称"
                  width="200">
                  <template slot-scope="scope">
                    <div class="ellipsis tc" :title="scope.row.org_name">
                      {{ scope.row.org_name }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="front_amount"
                  align="center"
                  label="调整前金额"
                  width="100">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.front_amount }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="back_amount"
                  align="center"
                  label="调账后金额"
                  width="100">
                  <template slot-scope="scope">
                    <div>
                      {{ scope.row.back_amount }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="amount"
                  align="center"
                  label="调整金额"
                  width="100">
                  <template slot-scope="scope">
                    {{ scope.row.amount }}
                  </template>
                </el-table-column>
                <el-table-column
                  header-align="center"
                  prop="reason"
                  align="left"
                  label="备注／调整原因">
                  <template slot-scope="scope">
                    <div>{{ scope.row.reason }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-table
              :data="adjustment"
              border
              style="width: 100%">
              <el-table-column
                align="center"
                prop="tuan_no"
                label="团号">
                <template slot-scope="scope">
                  <div class="ellipsis" :title="scope.row.tuan_no">
                    {{ scope.row.tuan_no }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="front_profit"
                align="center"
                label="调整前毛利"/>
              <el-table-column
                prop="back_profit"
                align="center"
                label="调账后毛利"/>
              <el-table-column
                prop="profit"
                align="center"
                label="调整毛利"/>
            </el-table>
          </div>
          <!-- 已去掉 -->
          <!-- <div class="bill-table-tit">
            审批记录
          </div>
          <div class="bill-table-wrap">
            <el-table
              :data="adjustment_verify"
              border
              style="width: 100%">
              <el-table-column
                align="center"
                prop="create_time"
                label="时间"/>
              <el-table-column
                prop="op_type"
                align="center"
                label="操作内容"/>
              <el-table-column
                prop="op_name"
                align="center"
                label="操作人">
                <template slot-scope="scope">
                  <div class="ellipsis tc">
                    {{ scope.row.op_name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                align="center"
                label="备注">
                <template slot-scope="scope">
                  {{ scope.row.remark ? scope.row.remark : '--' }}
                </template>
              </el-table-column>
            </el-table>
          </div> -->
        </div>
      </template>
      <template v-else-if="approvalType == 14">
        <div class="type14">
          <div class="el-tabs__content">
            <div class="wrapper">
              <div v-if="refundDetail" class="train-detail">
                <div class="panel" v-for="(refund, refundKey) in refundDetail" :key="refundKey">
                  <div class="bd">
                    <table class="table-order">
                      <thead>
                        <tr>
                          <th>申请日期</th>
                          <th>退款单号</th>
                          <th>旅客</th>
                          <th>订单损失金额</th>
                          <th>应退款金额</th>
                          <th>退款状态</th>
                          <th>实际退款金额</th>
                          <th>财务退款状态</th>
                          <!-- <th>操作</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ refund.create_time }}</td>
                          <td>{{ refund.refund_no }}</td>
                          <td>{{ refund.passengersename }}<br>{{ refund.passporttypeseidname }}</td>
                          <!-- <td>{{ refund.loss_amount }}</td> -->
                          <td>--</td>
                          <td>{{ refund.refund_amount }}</td>
                          <td>{{ refund.refund_status }}</td>
                          <td>{{ refund.real_refund_amount }}</td>
                          <td>{{ refund.finance_refund_status_name }}</td>
                          <!-- <td>
                            <a v-if="refund.refund_status == 3" href="javascript:;" @click="handleShowFiexLoss(refund.no, refund.refund_fee, refund.refund_amount)">定损</a>
                          </td> -->
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr v-if="refund.fail_reamrk">
                          <th>退款失败</th>
                          <td colspan="8">
                            {{ refund.fail_reamrk }}
                          </td>
                        </tr>
                        <tr v-if="refund.log && refund.log.length">
                          <td colspan="9">
                            <p v-for="(approval, approvalKey) in refund.log" :key="approvalKey">
                              <span class="label">[定损人/时间]</span>
                              <span class="org">{{ approval.initiator_name }}</span>
                              <span class="time">{{ approval.create_time }} </span>
                              <span class="amt">应退款金额 {{ approval.refund_amount }} </span>
                              <span :class="{ 
                                      'sat-inpass': approval.approval_status == 1, 
                                      'sat-pass': approval.approval_status == 2, 
                                      'sat-nopass': approval.approval_status == 3}">
                                {{ approval.approval_status | getApprovalStatusStr }}
                              </span>
                            </p>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 17">
        <div class="type17">
          <div class="detail-section">
            <div class="detail-tit">基础信息</div>
            <div class="detail-item" v-show="info.supplier_org_name">
              <div class="detail-lab">产品来源</div>
              <div class="detail-con">{{ info.supplier_org_name || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">签证名称</div>
              <div class="detail-con">{{ info.name }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">签证类型</div>
              <div class="detail-con">{{ info.visa_type_name }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">签证国家</div>
              <div class="detail-con">{{ info.continent_name }}-{{ info.nation_name }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">送签地</div>
              <div class="detail-con">{{ info.send_city_names && info.send_city_names.join(', ') }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">最长停留</div>
              <div class="detail-con">{{ info.stay_time }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">有效期</div>
              <div class="detail-con">{{ info.valid_time }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">入境次数</div>
              <div class="detail-con">{{ info.entry_num }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">办理时长</div>
              <div class="detail-con">送签后至少{{ info.deal_day }}个工作日（以领馆签发为准）</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">提前预订天数</div>
              <div class="detail-con">{{ info.forward_day }}个工作日</div>
            </div>
            <div class="detail-item" v-show="info.success_rate">
              <div class="detail-lab">出签成功率</div>
              <div class="detail-con">{{ info.success_rate }}%</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">所属领区</div>
              <div class="detail-con">{{ info.consular_district_name }}</div>
            </div>
            <div class="detail-item" v-show="info.accept_range">
              <div class="detail-lab">受理范围</div>
              <div class="detail-con">{{ info.accept_range || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">签证图片</div>
              <div class="detail-con" v-if="info.pic_url && info.pic_url.length === 0">--</div>
              <div class="detail-con" v-else>
                <div class="detail-thumb" v-for="(item, index) in info.pic_url" :key="index">
                  <img :src="item.sub_pic_url" >
                  <a :href="item.sub_pic_url" class="preview-btn" target="_blank">
                    <i class="el-icon-view" />
                  </a>
                  <a download :href="item.sub_pic_url">下载</a>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-section">
            <div class="detail-tit">签证材料</div>
            <div class="tab-list">
              <div
                :class="selectTab == key ? 'tab-item selected' : 'tab-item'"
                v-for="(key, idx) in touristTypes"
                :key="idx"
                @click="selectTab=key">
                {{ TOURIST_TYPE_MAP[key] }}
              </div>
            </div>
            <div
              class="tab-content"
              v-show="selectTab == key"
              v-for="(val, key) in info.material"
              :key="key"
              v-html="val"
            />
          </div>
          <div class="detail-section">
            <div class="detail-tit">签证报价</div>
            <div class="receive-detail">
              <div class="price-item">
                <div class="price-type">成人价格</div>
                <div class="price-sep" />
                <div class="price-detail">成本价：{{ info.adult_cost_price }}元</div>
                <div class="price-detail">结算价：{{ info.adult_peer_price }}元</div>
                <div class="price-detail">销售价：{{ info.adult_out_price }}元</div>
                <div class="price-detail">挂牌价：{{ info.adult_sticker_price }}元</div>
              </div>
              <!-- <div class="price-item">
                <div class="price-type">儿童价格</div>
                <div class="price-sep" />
                <div class="price-detail">成本价：{{ info.child_cost_price }}元</div>
                <div class="price-detail">结算价：{{ info.child_peer_price }}元</div>
                <div class="price-detail">销售价：{{ info.child_out_price }}元</div>
                <div class="price-detail">挂牌价：{{ info.child_sticker_price }}元</div>
              </div> -->
            </div>
          </div>
          <div class="detail-section" v-show="info.attention">
            <div class="detail-tit">预订须知</div>
            <div class="color-gray detail-content">{{ info.attention || '--' }}</div>
          </div>
          <div class="detail-section" v-show="info.remind">
            <div class="detail-tit">温馨提示</div>
            <div class="color-gray detail-content">{{ info.remind || '--' }}</div>
          </div>
          <div class="detail-section" v-show="Array.isArray(info.attachment) && info.attachment.length > 0">
            <div class="detail-tit">签证附件</div>
            <div class="color-gray detail-content">
              <attachment-list :list="info.attachment" />
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 18">
        <div class="type18">
          <div class="detail-section">
            <div class="detail-tit">基础信息</div>
            <div class="detail-item">
              <div class="detail-lab">商品类型</div>
              <div class="detail-con">{{ detail.type_name || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">商品名称</div>
              <div class="detail-con">{{ detail.name || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">商品货号</div>
              <div class="detail-con">{{ detail.art_no || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">商品所在城市</div>
              <div class="detail-con">{{ detail.city_names || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">商品图片</div>
              <div class="detail-con" v-if="detail.pic_lists && detail.pic_lists.length === 0">--</div>
              <div class="detail-con" v-else>
                <div class="detail-thumb" v-for="(item, index) in detail.pic_lists" :key="index">
                  <div v-if="item.is_default === 2" class="upload-index">首</div>
                  <div v-if="item.is_default === 2" class="upload-index-bg"></div>
                  <img :src="item.sub_pic_url" >
                  <a :href="item.sub_pic_url" class="preview-btn" target="_blank">
                    <i class="el-icon-view" />
                  </a>
                  <a download :href="item.sub_pic_url">下载</a>
                </div>
              </div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">商品详情</div>
              <div class="detail-con" v-if="detail.detail && detail.detail.length === 0">--</div>
              <div class="detail-con" v-else v-html="detail.detail"></div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">服务保证</div>
              <div class="detail-con">{{ detail.service_guarantees || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">商品关键词</div>
              <div class="detail-con">{{ detail.keys || '--' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">商品备注</div>
              <div class="detail-con">{{ detail.remark || '--' }}</div>
            </div>
            <div class="detail-tit">商品报价</div>
            <el-table
              :data="detail.price_lists"
              border
              style="width: 100%">
              <el-table-column
                prop="size_name"
                label="规格"
                width="150px" 
                align='center'>
              </el-table-column>
              <el-table-column
                prop='cost_price'
                label='成本价'
                min-width='100px'
                align='center'>
              </el-table-column>
              <el-table-column
                prop='peer_price'
                label='结算价'
                min-width='100px'
                align='center'>
              </el-table-column>
              <el-table-column
                prop='out_price'
                label='销售价'
                min-width='100px'
                align='center'>
              </el-table-column>
              <el-table-column
                prop='tagging_price'
                label='挂牌价'
                min-width='100px'
                align='center'>
              </el-table-column>
              <el-table-column
                prop='stock_nums'
                label='商品库存'
                min-width='100px'
                align='center'>
              </el-table-column>
              <el-table-column
                prop='sku_no'
                label='SKU编号'
                min-width='100px'
                align='center'>
              </el-table-column>
              <el-table-column
                label='是否限购'
                min-width='100px'
                align='center'>
                <template slot-scope="scope">
                  <div class="xigou-wrap clearfix">
                    <el-checkbox
                      disabled
                      class="box"
                      :true-label='2'
                      :false-label='1'
                      v-model="scope.row.is_limit_buy">
                    </el-checkbox>
                    <el-input
                      readonly
                      v-model="scope.row.limit_buy_nums">
                    </el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table> 
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 19">
        <div class="type19">
          <div class="content-list" v-for="(item, idx) in refundList" :key="idx">
            <table class="el-table el-table-center">
              <thead>
                <tr>
                  <th>申请日期</th>
                  <th>退款单号</th>
                  <th>订单损失金额</th>
                  <th>应退款金额</th>
                  <th>退款状态</th>
                  <th>实际退款金额</th>
                  <th>财务退款状态</th>
                  <!-- <th>操作</th> -->
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ item.create_time }}</td>
                  <td>{{ item.refund_no }}</td>
                  <td><div class="cell tar">{{ item.refund_fee }}</div></td>
                  <td><div class="cell tar">{{ item.refund_amount }}</div></td>
                  <td><span :class="item.refund_status | getStatusColor">
                    {{ item.status_name }}
                  </span></td>
                  <td><div class="cell tar">{{ item.finance_status == 1 ? '--' : item.real_refund_amount }}</div></td>
                  <td>{{ item.finance_status_name }}</td>
                  <!-- <td><div class="cell">
                    <a v-if="item.is_op_loss == 1" href="javascript:;" @click="handleLossAssess(item)">
                      定损
                    </a>
                    <span v-else> -- </span>
                  </div></td> -->
                </tr>
              </tbody>
            </table>
            <div class="tuituan-info" v-if="item.refund_status == 2 || item.refund_status == 4">
              <span class="label">定损人／时间：</span>{{ item.loss_op_name }} / {{ item.loss_time }}
              <span class="color-orange">应退款金额 {{ item.refund_amount }}</span>
              {{ item.refund_status == 2 ? '审批通过' : '审批不通过' }}
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 20">
        <div class="type20">
          <div class="content">
            <div class="panel" v-for="(item, index) in tableData" :key="index">
              <div class="bd">
                <table class="table-order">
                  <thead>
                    <tr>
                      <th>申请日期</th>
                      <th>退款单号</th>
                      <th>订单损失金额</th>
                      <th>应退款金额</th>
                      <th>退款状态</th>
                      <th>实际退款金额</th>
                      <th>财务退款状态</th>
                      <!-- <th>操作</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ item.create_time }}</td>
                      <td>{{ item.no }}</td>
                      <td>
                        <!-- <div v-if="item.refund_status === 1">--</div> -->
                        <div>{{item.refund_fee}}</div>
                      </td>
                      <!-- <td>{{ item.refund_status === 1 ? '--' : item.amount }}</td> -->
                      <td>{{ item.amount }}</td>
                      <td>
                        <div v-if="item.refund_status === 1">退款中</div>
                        <div v-else-if="item.refund_status === 2" class="color-green">退款成功</div>
                        <div v-else-if="item.refund_status === 3">已定损，待审批</div>
                        <div v-else-if="item.refund_status === 4" class="color-red">退款失败</div>
                      </td>
                      <td>
                        <div v-if="item.refund_status === 1">--</div>
                        <div v-else>{{item.real_refund_amount}}</div>
                      </td>
                      <td>{{item.finance_status === 1 ? '未处理' : '已处理'}}</td>
                      <!-- <td>
                        <el-button
                          type="text"
                          class="color-purple"
                          v-if="item.is_op_loss === 1"
                          @click="openDialog(item.no)">定损
                        </el-button>
                        <span v-else>--</span>
                      </td> -->
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr v-if="item.loss_op_name && (item.refund_status == 2 || item.refund_status == 4)">
                      <td colspan="9">
                        <p>
                          <span class="label">[定损人/时间]</span>
                          <span class="org">{{ item.loss_op_name }}</span>
                          <span class="time">{{ item.loss_time }} </span>
                          <span class="amt">应退款金额 {{ item.amount }} </span>
                          {{ item.refund_status == 2 ? '审批通过' : '审批不通过' }}
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 21">
        <div class="type21">
          <div class="detail-section">
            <div class="detail-tit">基础信息</div>
            <div class="detail-item">
              <div class="detail-lab">所属景区</div>
              <div class="detail-con">{{ scenicDetail.scenic_name}}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">门票名称</div>
              <div class="detail-con">{{ scenicDetail.ticket_name}}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">套餐名称</div>
              <div class="detail-con">{{ scenicDetail.quote_name}}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">取票信息</div>
              <div class="detail-con">{{ scenicDetail.get_ticket}}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">最少购买张数</div>
              <div class="detail-con">{{ scenicDetail.min_buy }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">最多购买张数</div>
              <div class="detail-con">{{ scenicDetail.max_buy }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">提前预订时间</div>
              <div class="detail-con">{{ scenicDetail.advance_days +'天'+ scenicDetail.advance_time}}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">使用有效期</div>
              <div class="detail-con">{{ scenicDetail.use_type }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">身份证信息</div>
              <div class="detail-con">{{ scenicDetail.need_idcard }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">退票规则</div>
              <div class="detail-con">{{ scenicDetail.refund_rule }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">购买须知</div>
              <div class="detail-con">{{ scenicDetail.notice }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-lab">产品报价</div>
            </div>
            <div class="detail-item">
              <div class="detail-con">
                <calendar-quotation>
                  <div class="quote" v-for="(q, d) in scenicDetail.quote_list" :key="d" :slot="d">
                    <p class="quote-item"><span class="lbl">成本价：</span><span class="prc">￥{{ q.cost_price }}</span></p>
                    <p class="quote-item"><span class="lbl">结算价：</span><span class="prc">￥{{ q.settlement_price }}</span></p>
                    <p class="quote-item"><span class="lbl">销售价：</span><span class="prc">￥{{ q.sale_price }}</span></p>
                    <p class="quote-item"><span class="lbl">挂牌价：</span><span class="prc">￥{{ q.shop_price }}</span></p>
                    <!-- <p class="tools"><a href="javascript:;" @click="handleEditSingleQuote(q)">编辑</a>&nbsp;&nbsp;
                    <a href="javascript:;" @click="handleDelSingleQuote(d)">删除</a></p> -->
                  </div>
                </calendar-quotation>
              </div>
            </div>
            
          </div>
        </div>
      </template>
      <template v-else-if="approvalType == 22">
        <div class="type22">
          <div class="package">
            <el-form ref="packageForm" :model="packageForm" label-width="130px">
              <el-form-item label="酒店名称">
                {{ packageForm.hotel_name }}
              </el-form-item>
              <el-form-item label="房型名称">
                {{ packageForm.room_name }}
              </el-form-item>
              <el-form-item label="产品来源">
                {{ packageForm.supplier }}
              </el-form-item>
              <el-form-item label="套餐名称">
                {{ packageForm.rate_name }}
              </el-form-item>
              <el-form-item label="早餐">
                <template v-if="packageForm.breakfast_type == 0">
                  不含早
                </template>
                <template v-else-if="packageForm.breakfast_type == 1">
                  含单早
                </template>
                <template v-else-if="packageForm.breakfast_type == 2">
                  含双早
                </template>
                <template v-else-if="packageForm.breakfast_type == 3">
                  部分含早
                </template>
                <template v-else-if="packageForm.breakfast_type == -1">
                  含早但不确定份数
                </template>
                <template v-else-if="packageForm.breakfast_type == -3">
                  不确定
                </template>
                <template v-else-if="packageForm.breakfast_type == -2">
                  付费早餐
                </template>
              </el-form-item>
              <el-form-item v-if="showBreakfastAmount" label="部分含早人数">
                {{ packageForm.amount }}
              </el-form-item>
              <el-form-item label="最少提前预订时间">
                提前{{ packageForm.days }}天{{ packageForm.hours }}时 前定当日房
              </el-form-item>
              <!-- <el-form-item label="订单确认开始时间">
                {{ packageForm.service_start_time }}
              </el-form-item>
              <el-form-item label="订单确认结束时间">
                {{ packageForm.service_end_time }}
              </el-form-item> -->
              <el-form-item label="预订说明">
                {{ packageForm.book_notice }}
              </el-form-item>
              <el-form-item label="取消规则">
                <template v-if="packageForm.cancel_type == 1">
                  <template v-if="packageForm.date_type == 1">
                    入住前可退，按{{packageText[packageForm.cancel_charge_type]}}{{packageForm.cancel_charge}}<span v-if="packageForm.cancel_charge_type==3">元</span><span v-else>%</span>扣费
                  </template>
                  <template v-else>
                    {{packageForm.date_day}} {{packageForm.date_min}} 前可退，按{{packageText[packageForm.cancel_charge_type]}}{{packageForm.cancel_charge}}<span v-if="packageForm.cancel_charge_type==3">元</span><span v-else>%</span>扣费
                  </template>
                </template>
                <template v-else>
                  不可退
                </template>
              </el-form-item>
              <el-form-item label="产品报价">
                <calendar-quotation>
                  <div class="quote" v-for="(q, d) in packageForm.package_list" :key="d" :slot="d">
                    <p class="quote-item"><span class="lbl">成本价：</span><span class="prc">￥{{ q.cost_price }}</span></p>
                    <p class="quote-item"><span class="lbl">结算价：</span><span class="prc">￥{{ q.price }}</span></p>
                    <p class="quote-item"><span class="lbl">销售价：</span><span class="prc">￥{{ q.sale_price }}</span></p>
                    <p class="quote-item"><span class="lbl">挂牌价：</span><span class="prc">￥{{ q.market_price }}</span></p>
                    <p class="quote-item"><span class="lbl">库存：</span><span class="prc">{{ q.stock }}</span></p>
                  </div>
                </calendar-quotation>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
    </div>
    <!-- /system-content -->
  </div>
  <!-- /wrapper -->
</template>

<script>
import { approval_content } from "src/api/approval";
import * as format from 'src/utils/format';
import CalendarQuotation from 'src/components/self-support/components/CalendarQuotation.vue';
import AttachmentList from 'src/plugins/AttachmentList.vue'
export default {
  filters: {
    formatPrice: format.formatPrice
  },
  data() {
    return {
      approvalType: null,
      id: this.$route.query.id,
      allData: [],
      constApprovalType: {
        1:'线路上架',
        2:'订单调价',
        3:'退款审批',
        4:'退团审批',
        5:'计调请款',
        7:'收款审批',
        8:'供应商审批',
        9:'认款审批',
        10:'账单调账审批',
        11:'发票审批',
        12:'提现审批',
        13:'机票退票审批',
        14:'火车票退票审批',
        15:'门票退票审批',
        16:'酒店退票审批',
        17:'签证上架',
        18:'农特优上架',
        19:'退款审批',
        20:'退款审批',
        21:'门票上架',
        22:'酒店上架',
      },
      // 1
      product_type: '',
      baseInfo: {},
      tripInfo: [],
      tripdesc: [],
      own_shopping: [],
      visa_info: [],
      attachment_lists: [],
      activeName: '1',
      // 2
      orderDetailData: '',
      // 4
      list: [],
      TUITUAN_STATUS_MAP: {},
      TUIKUAN_STATUS_MAP: {},
      // 5
      applied: {},
      detail: {},
      // 7,8,17
      info: {},
      // 9
      ITEM_TYPE_MAP: {},
      renkuanReceivable: [],
      renkuanInfo: {},
      shoukuanInfo: {},
      // 10
      adjustment: [],
      adjustment_detail: [],
      adjustment_verify: [],
      status: '',
      remark: '',
      verifyType: false,
      // 14
      refundDetail: [{}],
      // 17
      selectTab: '',
      touristTypes: [],
      TOURIST_TYPE_MAP: {},
      // 18
      detail: {},
      // 19
      refundList:[],
      // 20
      tableData: [],
      // 21
      scenicDetail: {
        quote_list: []
      },
      // 22
      packageForm: {
        id: null,
        hotel_id: null,
        room_id: null,
        supplier: null,
        supplier_name: '',
        rate_name: '',
        breakfast_type: null,
        amount: 0,
        days: '',
        hours: '',
        service_start_time: '',
        service_end_time: '',
        book_notice: null,
        package_list: {},
        cancel_charge: null,
        cancel_charge_type: null,
        cancel_type: null,
        cancel_type_name: null
      },
      packageText:{
        1: '首晚价格',
        2: '订单总金额',
        3: '固定金额',
      }
    };
  },
  components: {
    CalendarQuotation,
    AttachmentList
  },
  created: function(){
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 3: 
        return 'color-green';
      case 4: 
        return 'color-red';
      case 1:
      case 2: 
      case 5:
      default:
        return '';
      }
    }
  },
  watch: { },
  computed: { 
    isBOMTrip() {
      const tuanInfo =
        (this.orderDetailData && this.orderDetailData.tuan_info) || {};
      return tuanInfo.type == 3; // 是否是bom行程
    },
    // type22
    showBreakfastAmount(){
      if(this.packageForm.breakfast_type == 3){
        return true
      }else{
        this.packageForm.amount = 1;
        return false
      }
    },
  },
  methods: {
    initialize(bool) {
      let para = {};
      para.data = {
        approval_id: this.id
      };
      approval_content({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.approvalType = data.approval_type;
            if(this.approvalType == 1){
              // 线路
              this.baseInfo = data;
              this.product_type = data.product_type;
              this.attachment_lists = data.attachment;
              this.tripInfo = data.detail || [];
              this.own_shopping = data.own_shopping || [];
              this.visa_info = data.visa_info || [];
              this.tripdesc = data.instruction || [];
              if(this.tripdesc.trip_features) {
                this.activeName = '1';
                return;
              };
              if(this.tripdesc.fee_includes) {
                this.activeName = '2';
                return;
              };
              if(this.tripdesc.cost_excludes) {
                this.activeName = '3';
                return;
              };
              if(this.tripdesc.booking_info) {
                this.activeName = '4';
                return;
              };
              if(this.tripdesc.safety_info) {
                this.activeName = '5';
                return;
              };
              if(this.tripdesc.remark) {
                this.activeName = '6';
                return;
              };
            }else if(this.approvalType == 2){
              // 订单调价
              if (Array.isArray(data.order_price_detail)) {
                // 生成operator字段
                data.order_price_detail = data.order_price_detail.filter(item => {
                  // const isCancelOrderRecord = item.item_name == '取消订单';

                  // if(isCancelOrderRecord){
                  //   this.cancelOrderRecord = item;
                  //   return false;
                  // }
                  // 处理operator为 - 的记录返回的负数，转成正数，因为页面都是使用正数进行计算
                  if (item.unit_price < 0) {
                    item.unit_price = Math.abs(item.unit_price);
                    item.total_amount = Math.abs(item.total_amount);
                    item.rmb_unit_price = Math.abs(item.rmb_unit_price);
                    item.rmb_total_amount = Math.abs(item.rmb_total_amount);
                    item.operator = '-';
                  } else {
                    item.operator = '+';
                  }
                  return true;
                });
              }

              //计调跳转过来获取价格明细操作权限
              if (this.isOperator && data.order_info[0]) {
                this.getCheckPriceDetail(data.order_info[0].order_no);
              }
              //  console.log(this.orderDetailData)
              this.settlementAmount = data.all_total_amount;
              this.rmbSettlementAmount = data.all_rmb_total_amount;
              this.bills_id = data.bills_id;

              this.orderInfo = (data.order_info && data.order_info[0]) || {};
              this.ORDER_EDIT_MAP = this.orderInfo.edit_list || {};

              this.materialInfo = data.material_info || {};
              this.bzTxt = this.materialInfo.edit_data.visa_remark;
              this.MATERIAL_EDIT_MAP = this.materialInfo.edit_list || {};

              this.orderDetailData = data;
            }else if(this.approvalType == 3 || this.approvalType == 4){
              this.list = data;
              this.TUITUAN_STATUS_MAP = data.status_list[1];
              this.TUIKUAN_STATUS_MAP = data.status_list[2];
            }else if(this.approvalType == 5){
              this.applied = data.applied_detail.applied;
              this.detail = {}
              for(let key in data.applied_detail.detail) {
                data.applied_detail.detail[key].show = false
                this.$set(this.detail, key, data.applied_detail.detail[key])
              }
            }else if(this.approvalType == 7){
              // 收款审批
              this.info = data;
            }else if(this.approvalType == 8){
              // 供应商审批
              Object.assign(this.info, data);
            }else if(this.approvalType == 9){
              // 认款审批
              this.renkuanInfo = data.renkuan_detail.renkuan_info;
              this.shoukuanInfo = data.renkuan_detail.shoukuan_info;
              this.ITEM_TYPE_MAP = data.renkuan_detail.item_type_list;
              this.renkuanReceivable = [data.renkuan_detail.renkuan_receivable];
            }else if(this.approvalType == 10){
              this.adjustment = [];
              this.adjustment.push(data.adjustment_detail.adjustment);
              this.adjustment_detail = data.adjustment_detail.adjustment_detail;
              this.adjustment_verify = data.adjustment_detail.adjustment_verify;
            }else if(this.approvalType == 14){
              this.refundDetail[0] = data.tourist_info;
            }else if(this.approvalType == 17){
              this.info = data;
              this.touristTypes = Object.keys(this.info.material);
              this.selectTab = this.touristTypes[0] || '';
              this.touristTypes.forEach(item => {
                const material = this.info.material[item];
                if(Array.isArray(material)){
                  this.info.material[item] = material.join('<br>');
                }
              })
              this.TOURIST_TYPE_MAP = this.info.tourist_type_list;
            }else if(this.approvalType == 18){
              this.detail = data;
            }else if(this.approvalType == 19){
              this.refundList[0] = data;
            }else if(this.approvalType == 20){
              this.tableData[0] = data;
            }else if(this.approvalType == 21){
              let quotes = this.formatPriceList(data.quote_price_list);
              this.scenicDetail = data.quote_type_info;
              this.scenicDetail.quote_list = quotes;
            }else if(this.approvalType == 22){
              this.packageForm.hotel_name = data.hotel_name;
              this.packageForm.room_name = data.room_name;
              this.packageForm.date_type = data.date_type;
              for(let i in this.packageForm){
                this.packageForm[i] = data[i];
              }
              this.$set(this.packageForm, 'package_list', data['price_list']);
            }
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    isShowOrderOperate(edit, order) {
      switch (edit) {
      case 2:
        // 判断来源中增加微信小程序条件
        return order.is_wx_order != 1;
      case 5:
        if (this.isOperator) {
          return this.$menuPermission('api/tuan/save_team_order_gathering');
        } else if (this.isSale) {
          return this.$menuPermission('api/tuan/save_sale_order_gathering');
        } else if (this.isFinance) {
          return this.$menuPermission(
            'api/tuan/finance_save_order_gathering'
          );
        } else {
          return false;
        }
      case 6:
        if (this.isOperator) {
          return this.$menuPermission('api/tuan/op_income_info');
        } else if (this.isSale) {
          return this.$menuPermission('api/tuan/sale_income_info');
        } else if (this.isFinance) {
          return this.$menuPermission('api/tuan/fin_income_info');
        } else {
          return false;
        }
      default:
        return true;
      }
    },
    showDetail (key) {
      this.detail[key].show = !this.detail[key].show
    },
    createDate (date) {
      var date = new Date(date * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    formatPriceList(quote){
      let prices = {}
      quote.map(i => { prices[i.quote_date] = i });
      return prices;
    }
  },
  mounted() {
    this.initialize();
  }
};
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px;
  padding: 15px;
  background: #fff;
}
// 1
.trip-wrapper {
  .base-list {
    width: 100%;
      font-size: 0;
    // .base-item {
    //   padding: 10px 0 0;
    // }
    .base-con {
      display: inline-block;
      padding: 10px 0 0;
      width: 50%;
      min-height: 28px;
      vertical-align: top;
    }
    .base-pd {
      position: relative;
      padding-left: 100px;
      font-size: 14px;
      line-height: 28px;
      .base-contit {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100px;
        text-align: right;
        color: #999999;
        min-height: 28px;
      }
      .base-coninfo {
        color: #333333;
        padding-left: 30px;
        // font-weight: bold;
        min-height: 28px;
      }
    }
  }
  .easy-trip-doclist {
    list-style: none;
    li {
      font-size: 14px;
      line-height: 28px;
      color: #333333;
      .doc-idx {
        padding-right: 10px;
      }
      .doc-size {
        font-size: 12px;
        color: #999999;
        font-style: normal;
        padding: 0 10px
      }
      .doc-down {
        color: #b10c79;
        padding-left: 40px;
      }
    }
  }
  .pc-wrapper.pd20 {
      width: auto;
      padding: 0 0 0 20px;
  }
  .pc-wrapper {
    width: 100%;
    margin-top: 30px;
    font-size: 0;
    .pc-item {
      display: inline-block;
      margin-right: 15px;
      margin-bottom: 15px;
      width: 190px;
      height: 120px;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      &>a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .trip-detail-wrap {
    .trip-detail-inner {
      color: #333333;
      padding-left: 100px;
      .trip-detail-tit {
        font-size: 18px;
        color: #333333;
      }
      .trip-detail-itemtit {
        font-size: 14px;
        color: #b10c79;
        margin-bottom: 10px;
      }
      .trip-detial-row-box {
        .trip-detail-row:first-child {
          margin: 20px 0 0 0;
          padding: 0px 0 0 50px;
          .traffic-btn {
            top: -5px;
          }
        }
        .trip-detail-row:last-child {
          border-left: 1px solid #fff;
          padding-bottom: 10px;
          &:before {
            content: '';
            position: absolute;
            top: -10px;
            left: -1px;
            width: 0.5px;
            height: 40px;
            background-color: #afafaf;
          }
        }
      }
      .trip-detail-row {
        position: relative;
        padding: 20px 0 0 50px;
        border-left: 1px solid #afafaf;
        &.first {
          margin: 20px 0 0 0;
          padding: 0px 0 0 50px;
          .traffic-btn {
            top: -5px;
          }
        }
        &.last {
          border-left: 1px solid #fff;
          &:before {
            content: '';
            position: absolute;
            top: -10px;
            left: -1px;
            width: 0.5px;
            height: 75%;
            background-color: #afafaf;
          }
        }
        .traffic-btn {
          position: absolute;
          top: 15px;
          left: -15px;
        }
      }
      .eat-on {
        display: inline-block;
        width: 17px;
        height: 17px;
        border: 1px solid #afafaf;
        text-align: center;
        line-height: 17px;
        font-size: 12px;
        color: #fff;
        background-color: #b10c79;
      }
      .eat-off {
        display: inline-block;
        width: 17px;
        height: 17px;
        border: 1px solid #afafaf;
        text-align: center;
        line-height: 17px;
        font-size: 12px;
        color: #fff;
      }
      .hotel-tip {
        color: #999999;
        font-style: normal;
        &>span {
          padding-right: 15px;
        }
      }
    }
  }
  .tip-tab-wrap {
    border: 1px solid #cccccc;
    padding: 0 0 10px;
  }
}
// 2
.cont {
  padding: 20px;
  background-color: #fff;
  .search-item {
    line-height: 30px;
  }
  .panel {
    margin-bottom: 20px;
    .hd {
      padding: 10px 0 25px;

      h2 {
        display: inline-block;
        color: #b10c79;
        font-size: 16px;
        border-left: 5px solid #b10c79;
        padding-left: 10px;
        line-height: 20px;
      }

      span {
        margin-left: 20px;
        color: #999;
        i {
          color: #f60;
          font-style: normal;
        }
      }
      .op-btn {
        float: right;
      }
    }
  }
  .mr0 {
    margin-right: 0 !important;
  }
  .xd {
    width: 80px;
    color: #999999;
    line-height: 16px;
  }
  .mt10 {
    margin-top: -20px;
  }
  .dess {
    float: left;
    color: #444;
    margin-top: 10px;
  }
  .dess-ul {
    overflow: hidden;
    list-style: none;
  }
  .dess-ul li {
    float: left;
    width: 350px;
  }
  .dess-ul .tit {
    display: inline-block;
    width: 90px;
    color: #999;
    padding: 3px 0;
  }
  .neck-txt {
    margin: -10px 0 8px;
  }
  .neck-txt span {
    display: inline-block;
    margin-right: 15px;
  }
  .neck-txt i {
    font-style: normal;
    color: #f60;
  }
  .neck-txt .op-btn {
    float: right;
    margin-top: -5px;
  }
  .span-btn {
    display: inline-block;
    color: #b10c79;
    cursor: pointer;
    margin: 0 5px;
  }
  .qy {
    overflow: hidden;
    margin-left: 20px;
    .t {
      float: left;
    }
    .c {
      float: left;
      margin-left: 20px;
      width: 115px;
    }
    .el-radio {
      margin: 0 0 10px 0;
    }
    .tip {
      float: left;
      color: #999;
      line-height: 16px;
    }
  }
  // sq-dialog
  .sq-dialog {
    margin-top: -30px;
    .tt {
      color: #666;
    }
    .lin {
      display: block;
      color: #999;
      text-align: center;
    }
  }
  .sq-box {
    margin: 15px 10px 0;
    .tit {
      color: #666;
      margin-bottom: 5px;
    }
    // .b{
    //   color: #f00;
    // }
  }
  .xdtzs-box {
    padding-left: 110px;
    padding-bottom: 30px;
    overflow: hidden;
    .tit {
      float: left;
      margin-left: -110px;
      line-height: 30px;
    }
  }
  .edit-tourist-form{
    width: 90%;
    .el-form-item{
      margin-bottom: 13px;
    }
  }
  .dw100 {
    display: block;
    width: 100%;
  }
  .code-btn {
    float: right;
    margin: 0 10px 0 0;
    color: #b10c79;
  }
  .checkboxcode {
    margin: 0 15px 15px 0;
  }
  .hide-list {
    padding: 5px 0 0;
  }
  .kxdje-content {
    margin-top: 16px;
    .color-purple {
      cursor: pointer;
    }
  }

  .price-item{
    display: flex;
    &:first-child{
      margin-top: -15px;
    }
    &:last-child{
      margin-bottom: -10px;
    }
    .detail-form{
      border: 1px dashed #ccc;
      margin-top: 0;
      margin-bottom: 10px;
      flex: 1;
    }
    .opt-btns{
      width: 40px;
      .sub-btn{
        margin-top: 10px;
      }
    }
  }
}
// 5
.type5{
  .hide-wrap {
    position: relative;
    margin: 0 0 40px;
    background-color: #fff;
  }
  .hide-btn {
    position: absolute;
    bottom: -25px;
    left: 110px;
    color: #b10c79;
    cursor: pointer;
    .hide-inner {
      position: relative;
      padding: 0 10px 0 0;
      &.show {
        &::after {
          top: 3px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid #b10c79;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
        }
      }
      &::after {
        position: absolute;
        top: 8px;
        right: -10px;
        width: 0px;
        height: 0px;
        border-top: 5px solid #b10c79;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        content: '';
      }
    }
  }
  .hide-action {
    overflow: hidden;
    height: 120px;
  }
}
// 7
.recieve-info {
  background-color: #fff;
  padding: 30px 0 20px 30px;
  .recieve-tit {
    font-size: 18px;
    color: #b10c79;
    padding: 0 0 0 10px;
    border-left: 5px solid #b10c79;
  }
  .receive-content {
    padding: 30px 0;
    .content-box {
      position: relative;
      padding: 0 0 0 150px;
      margin-bottom: 10px;
      .content-label {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        text-align: right;
        font-size: 14px;
        color: #999999;
      }
      .content-right {
        color: #333333;
        font-size: 14px;
        padding: 0 0 0 20px;
        .tip {
          color: #b10c79;
          font-style: normal;
          padding: 0 0 0 10px;
        }
      }
      .content-rightimg {
        min-height: 30px;
        font-size: 0;
        .pic-wrap {
          display: inline-block;
          width: 100px;
          font-size: 14px;
          margin-left: 20px;
          .pic-top {
            position: relative;
            overflow: hidden;
            width: 100px;
            height: 100px;
            background-size: cover;
            background-position: center center;
            .big-btn {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 30px;
              height: 25px;
              background-color: rgba(0,0,0,0.8);
              background-image: url(../../../assets/icons/magnifier.png);
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center center;
            }
          }
          .pic-bottom {
            a {
              color: #b10c79;
            }
          }
        }
      }
    }
  }
  .money-wrap {
    float: left;
    font-size: 14px;
    line-height: 33px;
    color: #333333;
    span {
      padding: 0 0 0 10px;
      color: #ff6000;
    }
  }
  .receive-money-wrap {
    padding: 0 15px 0 0;
    .btn-wrap {
      float: right;
    }
    &.mtb {
      margin: 10px 0 15px;
    }
    .green {
      color: #4ab93d;
    }
    .gray {
      color: #999999;
    }
    .blank {
      color: #333333;
    }
    .red {
      color: #fc1621;
    }
  }
  .primary {
    color: #b10c79;
  }
  .orange {
    color: #ff6000;
    text-align: right;
  }
}
// 8
.recieve-detail {
  .recieve-tit {
    font-size: 18px;
    color: #b10c79;
    padding: 0 0 0 10px;
    border-left: 5px solid #b10c79;
  }
  .recieve-content {
    padding: 30px 0;
    .recieve-content-item {
      position: relative;
      padding: 0 0 0 180px;
      margin: 0 0 15px;
      &:last-child {
        margin: 0;
      }
      .label {
        position: absolute;
        top: 0;
        left: 0;
        width: 170px;
        text-align: right;
        color: #999999;
        font-size: 14px;
        line-height: 21px;
      }
      .content {
        font-size: 14px;
        line-height: 21px;
        color: #333333;
        word-break: break-all;
      }
      .img {
        display: block;
        width: 150px;
        height: 180px;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
        }
      }
      .img-fr{
        float: left;
        width: 150px;
        height: 150px;
        margin: 0 10px 10px 0;
        img{
          display: block;
          width: 100%;
          height: 100%;
          border: 1px solid #ddd;
        }
      }
    }
  }
}
.ty4{
  padding: 15px;
  background: #fff;
  .tit {
    height: 18px;
    line-height: 18px;
    padding-left: 14px;
    margin: 20px 0;
    border-left: 5px solid #b10c79;
    font-size: 18px;
    color: #b10c79;
  }
  .tuituan-con {
    list-style: none;
    li {
      margin-bottom: 10px;
    }
    .tuituan-info {
      color: #333333;
      padding-top: 7px;
      padding-bottom: 10px;
      border: 1px solid #ddd;
      border-top: 0;
      p{
        padding-left: 140px;
        overflow: hidden;
      }
      .label {
        float: left;
        width: 140px;
        color: #999999;
        font-size: 14px;
        text-align: right;
        padding-bottom: 7px;
        margin-left: -140px;
      }
    }
  }
  // 
  .el-table{
    th, td {
      text-align: center;
      border: 1px solid #ddd;
    }
    &:before,&:after{
      content: none;
    }
    overflow: auto;
  }
  .span-btn{
    display: inline-block;
    color: #b10c79;
    cursor: pointer;
  }
  .tk-info{
    margin-bottom: 15px;
  }
}
// 9
.ty9{
  background-color: #fff;
  padding: 15px;
  .recieve-tit {
    margin: 20px 0;
  }
  .receive-content {
    padding: 0;
  }
}
// 10
.bill-wrap {
  background-color: #fff;
  padding: 15px;
  .bill-table-wrap {
    .tc {
      text-align: center;
    }
  }
  .bill-table-tit {
    border-left: 5px solid #b10c79;
    margin: 20px 0 20px;
    padding: 0px 0 0px 15px;
    color: #b10c79;
    font-size: 20px;
  }
  .bill-form-wrap {
    margin-bottom: 15px;
    padding: 15px 15px 15px 0px;
    border-left: 1px solid #bfcbd9;
    border-right: 1px solid #bfcbd9;
    border-bottom: 1px solid #bfcbd9;
  }
  .right-btn {
    float: right;
    width: 120px;
    padding: 0 10px;
    margin: 0 0 0 10px;
  }
  .billinner-table-wrap {
    overflow: hidden;
    margin-bottom: -3px;
  }
}
// 14
.type14{
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
    tfoot{
      th{
        border: 1px solid #ccc;
        padding: 15px 10px;
        text-align: center;
        background: #f4f4f4;
      }
      td{
        padding: 15px 10px;
        p{
          margin-bottom: 5px;
          &:last-child{
            margin-bottom: 0;
          }

          .label, .time{
            color: #999;
          }

          .org{
            color: #b10c79;
          }

          .amt{
            color: #f60;
          }

          .sat-pass{
            color: green;
          }
          .sat-inpass{
            color: gray;
          } 
          .sat-nopass{
            color: red;
          } 
        }
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
  .is-active{
    color: #b10c79;
  }
  .fixed-loss{
    padding: 0 10px;
    .radio-block{
      display: flex;
      margin-bottom: 20px;
      line-height: 20px;
      .el-input{
        width: 80px;
      }
      p{
        margin-bottom: 10px;
      }
    }
    .fixed-loss-tips{
      font-size: 12px;
      color: #999;
    }
  }
}
// 17
.type17{
  padding: 0 15px 15px;
  background: #fff;
  .detail-section{
    padding: 0;
    overflow: hidden;
    .detail-tit{
      border-left: 5px solid #b10c79;
      line-height: 1;
      margin: 35px 0 25px;
      padding-left: 10px;
      color: #b10c79;
      font-size: 18px;
    }
    .detail-item{
      display: flex;
      align-items: flex-start;
      line-height: 1.8;
      .detail-lab{
        width: 90px;
        color: #999;
        text-align: right;
      }
      .detail-con{
        flex: 1;
        padding-left: 15px;
        word-break: break-word;
      }
    }
    .detail-thumb{
      width: 100px;
      margin-right: 8px;
      margin-bottom: 8px;
      text-align: center;
      display: inline-block;
      position: relative;
      img {
        width: 100px;
        height: 100px;
        display: block;
        border: 1px solid #e4e4e4;
        box-sizing: border-box;
      }
      .preview-btn{
        padding: 6px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        position: absolute;
        right: 0;
        line-height: 1;
        top: 74px;
      }
    }
  }
  .tab-list{
    padding-bottom: 25px;
  }
  .tab-item{
    padding: 12px 0;
    width: 130px;
    text-align: center;
    background: #f4f4f4;
    margin-right: 10px;
    display: inline-block;
    &.selected{
      background-color: #b10c79;
      color: #fff;
      position: relative;
      &:after{
        content: "";
        border-top: 6px solid #b10c79;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        position: absolute;
        bottom: -5px;
        left: 59px;
      }
    }
  }
  .tab-content{
    border: 1px solid #ccc;
    padding: 15px;
    word-break: break-word;
  }
  .price-item{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .price-sep{
        margin: 0 15px;
        width: 2px;
        height: 14px;
        background-color: #ccc;
      }
      .price-detail{
        margin-right: 30px;
      }
      &:after{
        margin-bottom: 0;
      }
  }
  .detail-content{
    line-height: 1.5;
    word-break: break-word;
  }
}
// type18
.type18{
  padding: 0 15px 15px;
  background: #fff;
}
.detail-section{
  padding: 0;
  overflow: hidden;
  .detail-tit{
    border-left: 5px solid #b10c79;
    line-height: 1;
    margin: 35px 0 25px;
    padding-left: 10px;
    color: #b10c79;
    font-size: 18px;
  }
  .detail-item{
    display: flex;
    align-items: flex-start;
    line-height: 1.8;
    .detail-lab{
      width: 90px;
      color: #999;
      text-align: right;
    }
    .detail-con{
      flex: 1;
      padding-left: 15px;
      word-break: break-word;
    }
  }
  .detail-thumb{
    width: 100px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    display: inline-block;
    position: relative;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
      display: block;
      border: 1px solid #e4e4e4;
      box-sizing: border-box;
    }
    .upload-index {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      z-index: 2;
    }
    .upload-index-bg {
      position: absolute;
      top: -25px;
      left: -25px;
      width: 50px;
      height: 50px;
      line-height: 0px;
      background-color: #ff9900;
      transform: rotate(45deg);
      transform-origin: center center;
    }
    .preview-btn{
      padding: 6px;
      background-color: rgba(0,0,0,0.5);
      color: #fff;
      position: absolute;
      right: 0;
      line-height: 1;
      top: 74px;
    }
  }
  .xigou-wrap {
    position: relative;
    padding: 0 0 0 25px;
    .box {
      position: absolute;
      top: 5px;
      left: 0px;
    }
  }
}
// type19
.type19{
  .el-table{
    th, td {
      text-align: center;
      border: 1px solid #ddd;
    }
    &:before,&:after{
      content: none;
    }
    overflow: auto;
  }
  .f18{
    font-size: 18px;
  }
  .inline-input{
    display: inline-block;
    width: 150px;
  }
  .tuituan-info {
    color: #333333;
    padding-top: 7px;
    border: 1px solid #ddd;
    border-top: 0;
    .label {
      width: 140px;
      display: inline-block;
      color: #999999;
      font-size: 14px;
      text-align: right;
      padding-bottom: 7px;
    }
  }
}
// type20
.type20{
  .content {
    padding: 20px;
    background-color: #fff;
  }
  .panel {
    margin-bottom: 20px;
    .hd {
      padding: 10px 0 25px;

      h2 {
        display: inline-block;
        color: #b10c79;
        font-size: 16px;
        border-left: 5px solid #b10c79;
        padding-left: 10px;
        line-height: 20px;
      }
      .count-down-tips{
        margin-top: 20px;
        margin-right: 10px;
      }
    }
    .tc {
      text-align: center;
    }
  }
  .width {
    width: 100px;
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
        color: #999;
        font-weight: normal;
      }
    }
    tbody{
      td{
        padding: 15px 10px;
        border: 1px solid #ccc;
        text-align: center;
      }
    }
    tfoot{
      th{
        border: 1px solid #ccc;
        padding: 15px 10px;
        text-align: center;
        background: #f4f4f4;
      }
      td{
        padding: 15px 10px;
        p{
          margin-bottom: 5px;
          &:last-child{
            margin-bottom: 0;
          }

          .label, .time{
            color: #999;
          }

          .org{
            color: #b10c79;
          }

          .amt{
            color: #f60;
          }

          .sat-pass{
            color: green;
          }
          .sat-inpass{
            color: gray;
          } 
          .sat-nopass{
            color: red;
          } 
        }
      }
    }
  }
}
// type21
.type21{
  padding: 0 15px 15px;
  background: #fff;
  .detail-section{
    padding: 0;
    overflow: hidden;
    .detail-tit{
      border-left: 5px solid #b10c79;
      line-height: 1;
      margin: 35px 0 25px;
      padding-left: 10px;
      color: #b10c79;
      font-size: 18px;
    }
    .detail-item{
      display: flex;
      align-items: flex-start;
      line-height: 1.8;
      .detail-lab{
        width: 120px;
        color: #999;
        text-align: right;
      }
      .detail-con{
        flex: 1;
        padding-left: 15px;
        word-break: break-word;
      }
    }
    .detail-thumb{
      width: 100px;
      margin-right: 8px;
      margin-bottom: 8px;
      text-align: center;
      display: inline-block;
      position: relative;
      img {
        width: 100px;
        height: 100px;
        display: block;
        border: 1px solid #e4e4e4;
        box-sizing: border-box;
      }
      .preview-btn{
        padding: 6px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        position: absolute;
        right: 0;
        line-height: 1;
        top: 74px;
      }
    }
  }
  .quote{
    p{
      line-height: 20px;
      color: #333;
      &.quote-item{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .lbl{
          color: #999;
        }
        .prc{
          color: #f60;
        }
      }
    }
  }
}
// type22
.type22{
  .package{
    padding: 20px;
    background-color: #fff; 
    .reserve-time{
      display: flex;

      .str{
        padding: 0 5px;
      }
    }
  }
  .form-group{
    .el-form-item{
      float: left;
    }
    &::after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .line{
    text-align: center;
  }
  .date-range{
    width: 400px;
    &::after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .input-w-auto{
    width: auto !important;
  }
  .input-w-short{
    width: 50px;
  }
  .input-w-medium{
    width: 200px;
  }
  .quote{
    p{
      line-height: 20px;
      color: #333;
      &.quote-item{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .lbl{
          color: #999;
        }
        .prc{
          color: #f60;
        }
      }
      &.tools{
        
      }
    }
  }
}
</style>
