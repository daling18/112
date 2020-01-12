<template>
  <div class="details">
    <!-- <div class="system-content">
      <div class="table-title no-border" v-if="orderDetailData">
        <div class="title">
          <span class="color-purple">【{{ orderDetailData.tuan_info.tuan_no }}】</span>
        {{ orderDetailData.tuan_info.tuan_name }}</div>
        <div class="oh">
          <div class="dess">
            <ul class="dess-ul">
              <li>
                <span class="tit">出发城市</span>
                {{ orderDetailData.tuan_info.departure_city }}
              </li>
            </ul>
            <ul class="dess-ul">
              <li>
                <span class="tit">出发日期</span>
                {{ orderDetailData.tuan_info.departure_date }}
              </li>
              <li>
                <span class="tit">返回日期</span>
                {{ orderDetailData.tuan_info.back_date }}
              </li>
            </ul>
          </div>
          <div class="btn-areas">
            <el-button type="primary" @click="goto()">查看行程</el-button>
            <el-button @click="goto()">打印行程</el-button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="system-tab">
      <ul class="tab-box" v-if="orderInfo.is_tourist_cancel == 1">
        <router-link class="on" to="" tag="li">
          订单详情
        </router-link>
        <router-link :to="{ path: tuituanDetailUrl, query: {ono: orderInfo.order_no, tid: tuanId}}" tag="li">
          退团/款详情
        </router-link>
      </ul>
    </div>
    <div v-if="orderDetailData" class="cont">
      <div class="panel">
        <div class="hd">
          <h2>团队订单信息</h2>
        </div>
        <div class="bd">
          <el-table
            class="el-table--middle"
            :data="orderDetailData.order_info"
            border
            style="width: 100%">
            <el-table-column
              header-align="center"
              align="center"
              prop="order_from_name"
              width="80px"
              label="订单来源"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="order_no"
              width="170px"
              label="订单编号"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="confirm_status_name"
              width="80px"
              label="订单状态"/>
            <el-table-column
              header-align="center"
              align="right"
              prop="rmb_total_amount"
              min-width="95"
              label="订单总金额">
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
              label="已收">
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
              label="未收">
              <template slot-scope="scope">
                <template v-if="scope.row.confirm_status != 2">--</template>
                <template v-else>{{ scope.row.rmb_bills_no_amount }}</template>
              </template>
            </el-table-column>
            <template v-if="orderInfo.order_from != 3">
              <el-table-column
                align="center"
                prop="distributor_org_name"
                label="结算方公司名称"
                min-width="140"
              >
                <template slot-scope="scope">
                  <p class="ellipsis" :title="scope.row.distributor_org_name">
                    {{ scope.row.distributor_org_name }}
                  </p>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                align="center"
                prop="distributor_org_name"
                label="代理商/联系人"
                min-width="140">
                <template slot-scope="scope">
                  <p class="ellipsis" :title="scope.row.distributor_org_name">
                    {{ scope.row.distributor_org_name }}
                  </p>
                </template>
              </el-table-column>
            </template>
            <!-- 已占位（1）下显示清位时间 -->
            <el-table-column
              align="center"
              width="100px"
              label="清位时间"
              v-if="orderInfo.clear_time != ''">
              <template slot-scope="scope">
                <template v-if="scope.row.clear_time == '0分钟'">--</template>
                <!-- <template v-else>{{scope.row.clear_time}}</template> -->
                <template v-else>{{ showTime }}</template>
              </template>
            </el-table-column>
            <!-- <el-table-column
              align="center"
              label="合同"
              min-width="140">
              <template slot-scope="scope">
                <div style="height: 60px; overflow-y: auto;" v-if="scope.row.order_from == '3'">
                  <template v-for="(item, idx) in scope.row.contact_lists">
                    <div :key="idx">
                      <a :href="item.path" target="_blank">{{ item.name }}</a>
                    </div>
                  </template>
                </div>
                <div v-else>
                  --
                </div>
              </template>
            </el-table-column> -->
            <el-table-column
              align="center"
              prop="scheduled_time"
              width="95"
              label="下单时间">
              <template slot-scope="scope">
                {{ scope.row.scheduled_time }}
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit.length > 0">
                  <span v-for="(o,i) in scope.row.edit" :key="i">
                    <span v-if="o == 1"
                          class="span-btn"
                          @click="cancelOrder(true)">
                      取消订单
                    </span>
                    <!-- 签约&添加收款 判断来源中增加微信小程序条件 -->
                    <span v-if="o == 2 && scope.row.is_wx_order != 1"
                          class="span-btn"
                          @click="signOrder(true)">
                      签约
                    </span>
                    <span v-if="o == 3"
                          class="span-btn"
                          @click="affirmOrder(true,scope.row.distributor_org_id)">
                      确认
                    </span>
                    <span v-if="o == 4"
                          class="span-btn"
                          @click="exitOrder(true)">
                      申请退团
                    </span>
                    <template v-if="o == 5"
                              class="span-btn">
                      <template v-if="isOperator">
                        <!-- 计调类别  -->
                        <template v-if="$menuPermission('api/tuan/save_team_order_gathering') || $menuPermission('api/tuan/op_income_info')">
                          <span @click="addShoukuan"
                                class="span-btn"
                                v-if="$menuPermission('api/tuan/save_team_order_gathering')">
                            添加收款
                          </span>
                        </template>
                      </template>
                      <template v-else-if="isSale">
                        <!-- 销售类别 -->
                        <template v-if="$menuPermission('api/tuan/save_sale_order_gathering') || $menuPermission('api/tuan/sale_income_info')">
                          <span @click="addShoukuan"
                                class="span-btn"
                                v-if="$menuPermission('api/tuan/save_sale_order_gathering')">
                            添加收款
                          </span>
                        </template>
                      </template>
                      <template v-else-if="isFinance">
                        <!-- 财务类别 -->
                        <template v-if="$menuPermission('api/finance/finance_save_order_gathering') || $menuPermission('api/finance/fin_income_info')">
                          <span @click="addShoukuan"
                                class="span-btn"
                                v-if="$menuPermission('api/finance/finance_save_order_gathering')">
                            添加收款
                          </span>
                        </template>
                      </template>
                    </template>
                    <template v-if="o == 6">
                      <template v-if="isOperator">
                        <!-- 计调类别  -->
                        <template v-if="$menuPermission('api/tuan/save_team_order_gathering') || $menuPermission('api/tuan/op_income_info')">
                          <router-link class="mr0"
                                       :to="{ path: '/control/income-detail', query: {oid: scope.row.order_no}}"
                                       v-if="$menuPermission('api/tuan/op_income_info')">
                            查看收入
                          </router-link>
                        </template>
                      </template>
                      <template v-else-if="isSale">
                        <!-- 销售类别 -->
                        <template v-if="$menuPermission('api/tuan/save_sale_order_gathering') || $menuPermission('api/tuan/sale_income_info')">
                          <router-link class="mr0"
                                       :to="{ path: '/sale/income-detail', query: {oid: scope.row.order_no}}"
                                       v-if="$menuPermission('api/tuan/sale_income_info')">
                            查看收入
                          </router-link>
                        </template>
                      </template>
                      <template v-else-if="isFinance">
                        <!-- 财务类别 -->
                        <template v-if="$menuPermission('api/finance/finance_save_order_gathering') || $menuPermission('api/finance/fin_income_info')">
                          <router-link class="mr0"
                                       :to="{ path: '/fcontrol/income-detail', query: {oid: scope.row.order_no}}"
                                       v-if="$menuPermission('api/finance/fin_income_info')">
                            查看收入
                          </router-link>
                        </template>
                      </template>
                    </template>
                    <span v-if="o == 7"
                          class="span-btn"
                          @click="affirmSeat(true)">
                      确认位置
                    </span>
                  </span>
                </template>
                <template v-else>--</template>
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
          <el-table
            :data="orderDetailData.tourist_lists"
            border
            style="width: 100%">
            <el-table-column
              header-align="center"
              align="center"
              label="姓名">
              <template slot-scope="scope">
                {{ scope.row.username }}
                <router-link class="mr0" :to="{ path: tuituanDetailUrl, query: {ono: scope.row.order_no, tid: tuanId}}" v-if="scope.row.cancel_status != 0">
                  [退]
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="gender"
              width="50px"
              label="性别"/>
            <el-table-column
              v-if="!isBOMTrip"
              header-align="center"
              align="center"
              prop="tourist_type"
              width="100px"
              label="游客类型"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="identity_type"
              width="100px"
              label="证件类型"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="identity_no"
              min-width="180"
              label="证件号码"/><el-table-column
                header-align="center"
                align="center"
                prop="identity_end_date"
                width="100px"
                label="证件有效期"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="nationality"
              label="国籍"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="mobile"
              width="140px"
              label="手机号码"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="birthday"
              width="100px"
              label="出生日期"/>
            <el-table-column
              header-align="center"
              align="center"
              prop="remark"
              label="备注">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.remark">{{ scope.row.remark }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              v-if="canEditTouristInfo">
              <template slot-scope="scope">
                <span class="span-btn"
                      @click="touristEdit(scope.row)"
                      v-if="scope.row.cancel_status == 0 || scope.row.cancel_status == 4">
                  编辑
                </span>
                <span v-else>--</span>
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
          <span>结算总金额：<i>{{ settlementAmount | formatPrice }}</i></span>
          <span>本位币：<i>{{ rmbSettlementAmount | formatPrice }}</i></span>
          <el-button class="op-btn"
                     type="primary"
                     @click="handleAddDetailItem()"
                     v-if="canAddOrderDetail && $route.meta.topMenuConst == 'operator'">
            + 新增项目
          </el-button>
          <!-- todo -->
          <!-- <el-button v-if="isSale && orderDetailData.order_info[0].order_from == 1 && orderDetailData.order_info[0].confirm_status_name != '已取消'" type="text" class="code-btn" @click="openCode = true">
            邀请填写二维码
          </el-button> -->
        </div>
        <div class="bd">
          <el-table
            style="width: 100%"
            border
            :data="orderDetailData.order_price_detail"
            :summary-method="getCancelOrderSummaries">
            <!-- :show-summary="isCancelOrder" -->
            <el-table-column
              header-align="center"
              type="index"
              label="序号"
              width="50"
              align="center" />
            <el-table-column header-align="center" label="项目" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.item_name"
                          v-if="scope.row.isadd && scope.row.locals && canAddOrderDetail"/>
                <p v-else>{{ scope.row.item_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="单价" width="120" header-align="center" align="right">
              <template slot-scope="scope">
                <span v-if="scope.row.operator == '-' && scope.row.rmb_unit_price">-</span>{{ scope.row.rmb_unit_price | formatPrice }}
              </template>
            </el-table-column>
            <el-table-column label="结算单价" width="150" header-align="center" align="right">
              <template slot-scope="scope">
                <el-input-number 
                  :controls="false"
                  v-if="scope.row.isadd && scope.row.locals && canAddOrderDetail"
                  v-model="scope.row.unit_price"
                  :precision="3"
                  @blur="handleBlurUnitPrice(scope.row)">
                  <el-select
                    v-if="scope.row.isadd"
                    slot="prepend"
                    v-model="scope.row.operator"
                    style="width: 46px"
                    placeholder="请选择"
                    @input="handleInputOperator(scope.row, $event)">
                    <el-option label="+" value="+"/>
                    <el-option label="-" value="-"/>
                  </el-select>
                </el-input-number>
                <p v-else>
                  <span v-if="scope.row.operator == '-' && scope.row.unit_price">-</span>{{ scope.row.unit_price | formatPrice }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="70" align="center">
              <template slot-scope="scope">
                <input-number  v-if="scope.row.isadd && scope.row.locals && canAddOrderDetail" v-model="scope.row.num" @blur="handleBlurNum(scope.row)" />
                <p v-else>{{ scope.row.num }}</p>
              </template>
            </el-table-column>
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
                <template v-if="scope.row.isadd">
                  <template v-if="scope.row.locals && canAddOrderDetail">
                    <el-input v-model="scope.row.remark" />
                  </template>
                  <template v-else>
                    <p class="ellipsis"
                       :title="scope.row.remark + ' 操作人：' + scope.row.op_user_name"
                    >
                      {{ scope.row.remark }} 操作人：{{ scope.row.op_user_name }}
                    </p>
                  </template>
                </template>
                <template v-else>
                  <p class="ellipsis"
                     :title="scope.row.remark">
                    {{ scope.row.remark }}
                  </p>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              v-if="canAddOrderDetail && $route.meta.topMenuConst == 'operator'"
              label="操作"
              width="80"
              align="center">
              <template slot-scope="scope">
                <div class="tool">
                  <template v-if="!scope.row.isadd">--</template>
                  <span class="span-btn"
                        @click="handleEditDetailItem(scope)"
                        v-else-if="scope.row.isadd == 1 && !scope.row.locals">
                    编辑{{ scope.row.locals }}
                  </span>
                  <template v-else>
                    <span class="span-btn"
                          @click="handleSaveDetailItem(scope)">
                      保存
                    </span>
                    <span class="span-btn"
                          @click="handleDelDetailItem(true, scope)">
                      删除
                    </span>
                  </template>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel"
           v-if="orderDetailData.visa_info.length > 0">
        <div class="hd">
          <h2>签证材料要求</h2>
        </div>
        <div class="bd">
          <el-table
            style="width: 100%"
            border
            :data="orderDetailData.visa_info">
            <el-table-column
              header-align="center"
              label="身份类型"
              prop="card_type"
              width="100"
              align="center" />
            <el-table-column
              header-align="center"
              label="需要提交的材料"
              prop="need_reference"
              align="center" />
            <el-table-column
              label="详细说明"
              prop="instruction"
              header-align="center" />
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>材料信息</h2>
        </div>
        <div class="bd">
          <el-table
            style="width: 100%"
            :data="orderDetailData.material_info.list"
            border>
            <el-table-column
              header-align="center"
              label="材料"
              prop="item"
              width="120"
              align="center" />
            <el-table-column
              label="状态"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.item != '发票'">
                  <span v-if="scope.row.status_name">{{ scope.row.status_name }}</span>
                  <span v-else>--</span>
                </div>
                <div v-else>
                  <span v-if="scope.row.status_name && orderDetailData.order_info[0].order_from != 2">{{ scope.row.status_name }}</span>
                  <span v-else>--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.edit.length > 0">
                  <template v-for="(o, i) in scope.row.edit">
                    <span v-if="o == 1" :key="i" class="span-btn" @click="dlDzht()">
                      下载电子合同
                    </span>
                    <router-link v-else-if="o == 2" :key="i" :to="pagerContractDetailUrl">
                      查看纸质合同
                    </router-link>
                    <a v-else-if="o == 3" :key="i" :href="dlQrj">
                      下载确认件
                    </a>
                    <span v-else-if="o == 4
                            && (orderDetailData.visa_check == 0
                            || (orderDetailData.visa_check == 1
                            && orderDetailData.material_info.edit_data.visa_status != 1
                            && orderDetailData.material_info.edit_data.visa_status != 2
                          && orderDetailData.material_info.edit_data.visa_status != 3))"
                          :key="i"
                          class="span-btn"
                          @click="xdAdnote(true)">
                      下达出团通知书
                    </span>
                    <a v-else-if="o == 5"
                       :key="i"
                       download
                       :href="orderDetailData.material_info.edit_data.notification_url">
                      下载出团通知书
                    </a>
                    <router-link v-else-if="o == 7" :key="i" :to="chakanVisaUrl">
                      签证材料详情
                    </router-link>
                    <span v-else-if="o == 8" :key="i" class="span-btn" @click="bz(true)">
                      备注
                    </span>
                    <span v-else-if="o == 9" :key="i" class="span-btn" @click="upqzcl(true,'new')">
                      上传签证材料
                    </span>
                    <span v-else-if="o == 10" :key="i" class="span-btn" @click="upqzcl(true,'re')">
                      补充签证材料
                    </span>
                    <router-link v-else-if="o == 11" :key="i" :to="addInvoiceUrl" class="span-btn">
                      申请开票
                    </router-link>
                    <router-link v-else-if="o == 12" :key="i" :to="invoiceDetailUrl" class="span-btn">
                      查看开票详情
                    </router-link>
                    <span v-else-if="o == 13" :key="i" class="span-btn" @click="signOrder(true)">
                      生成合同
                    </span>
                  </template>
                </template>
                <template v-else>--</template>
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
    <!--添加收款弹窗-->
    <el-dialog
      title="添加收款"
      :visible.sync="addShoukuanVisible"
      :before-close="cancelDiagShoukuan"
      :close-on-click-modal="false">
      <el-form
        :rules="rules"
        :model="shoukuan"
        ref="shoukuanForm"
        label-width="140px"
        style="width:90%;"
      >
        <el-form-item label="收款人"
                      prop="name"
                      class="mb0 oh"
        >
          {{ shoukuan.name }}
        </el-form-item>
        <el-form-item label="所属组织"
                      prop="org"
                      class="mb0 mt-5"
        >
          {{ shoukuan.org }}
        </el-form-item>
        <el-form-item label="收款类型"
                      prop="user_collection_type"
        >
          <el-select v-model="shoukuan.user_collection_type"
                     disabled
                     placeholder="请选择"
                     class="w100per"
          >
            <el-option label="团队订单收入" value="1"/>
            <el-option label="团队杂费收入" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="收款金额"
                      class="mb0"
                      required
        >
          <el-col :span="8">
            <el-form-item prop="total_amount">
              <input-number  v-model="shoukuan.total_amount" placeholder="请输入数字" :precision="3" />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="ip2">
            <currency-picker
              v-model="shoukuan.currency"
              placeholder="选择货币"
              readonly="readonly"/>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="currency_rate">
              <input-number 	v-model="shoukuan.currency_rate" placeholder="汇率" :precision="4" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="收款(本位币)"
        >
          <template v-if="shoukuan.total_amount && shoukuan.currency_rate">
            {{ (shoukuan.total_amount * shoukuan.currency_rate) | formatPrice }}
          </template>
          <template v-else>
            --
          </template>
        </el-form-item>
        <el-form-item label="收款方式/账户"
                      prop="account_id"
                      class="mt-10"
        >
          <el-select v-model="shoukuan.account_id"
                     filterable
                     placeholder="请选择"
                     class="w100per"
          >
            <el-option
              v-for="item in accountRemoteList"
              :key="item.id"
              :label="item.account_info"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="收款日期"
                      prop="payment_date"
        >
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="shoukuan.payment_date"
                          :editable="false"
          />
        </el-form-item>
        <el-form-item label="上传收款凭证"
                      prop="attachment">
          <div class="hide-list" v-loading.body="loading">
            <el-upload
              class="upload-demo"
              action="/bom/api/finance/upload_img"
              name="image[]"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="shoukuan.attachment"
              :on-success="uploadsucc"
              :before-upload="beforeUpload"
            >
              <el-button size="small">选择本地文件</el-button>
              <span slot="tip" class="el-upload__tip">&ensp;仅支持jpeg、png、jpg、pdf格式，不可超过10份</span>
            </el-upload>
          </div>
          <ul class="el-upload-list el-upload-list--text" v-if="shoukuan.attachment.length>0">
            <li class="el-upload-list__item is-success"
                v-for="(file, index) in shoukuan.attachment"
                :key="index">
              <a class="el-upload-list__item-name" :href="file.url" target="_blank">
                <i class="el-icon-document"/>{{ file.name }}
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"/>
              </label><i class="el-icon-close" @click="diyRemove(file.id)"/>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input type="textarea" v-model="shoukuan.remark"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shoukuanConfirmGiveup('shoukuanForm')">取 消</el-button>
        <el-button type="primary" @click="shoukuanConfirm('shoukuanForm')" :disabled="shoukuanBtnDis">保 存</el-button>
      </span>
    </el-dialog>
    <!--/添加收款弹窗-->
    <!--编辑游客信息弹窗-->
    <el-dialog
      title="编辑游客信息"
      :visible.sync="tourEditVisible"
      :before-close="cancelDiagTourEdit"
      :close-on-click-modal="false">
      <el-form
        :rules="tourEditRules"
        :model="tourEditObj"
        ref="tourEditForm"
        label-width="140px"
        style="width:90%;">
        <el-form-item label="姓名" prop="username" class="el-item-mb10">
          <el-input v-model="tourEditObj.username" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender" class="el-item-mb10">
          <el-select placeholder="请选择" v-model="tourEditObj.gender" class="dw100">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>
        <el-form-item label="游客类型" prop="tourist_type" v-if="tourEditObj.tourist_type" class="el-item-mb10">
          <p>{{ tourEditObj.tourist_type }}</p>
        </el-form-item>
        <el-form-item label="证件类型"
                      prop="identity_type"
                      class="el-item-mb10"
                      required>
          <el-select placeholder="请选择" v-model="tourEditObj.identity_type" class="dw100">
            <el-option v-for="(obj,key) in tourEditCardType"
                       :key="key"
                       :label="obj"
                       :value="obj" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码"
                      prop="identity_no"
                      class="el-item-mb10">
          <!-- <input-number  v-model="tourEditObj.identity_no" placeholder="请输入证件号码" /> -->
          <el-input v-model="tourEditObj.identity_no" placeholder="请输入证件号码"/>
        </el-form-item>
        <el-form-item label="证件有效期" prop="identity_end_date" class="el-item-mb10">
          <el-date-picker
            v-model="tourEditObj.identity_end_date"
            type="date"
            placeholder="选择日期"
            class="datepick dw100"
            :editable="false" />
        </el-form-item>
        <el-form-item label="国籍" prop="nationality" class="el-item-mb10" required>
          <!-- <el-input v-model="tourEditObj.nationality" placeholder="请输入国籍" /> -->
          <world-select v-model="tourEditObj.nationality" class="dw100"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile" class="el-item-mb10">
          <input-number  v-model="tourEditObj.mobile" placeholder="请输入手机号码" :number="false"/>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday" class="el-item-mb10">
          <el-date-picker
            v-model="tourEditObj.birthday"
            type="date"
            placeholder="选择日期"
            class="datepick dw100"
            :editable="false" />
        </el-form-item>
        <el-form-item label="是否合同签字人" prop="is_contract_sign" class="el-item-mb10" required>
          <el-select placeholder="请选择" v-model="tourEditObj.is_contract_sign" class="dw100">
            <el-option label="是" :value="1"/>
            <el-option label="否" :value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark" class="el-item-mb10">
          <el-input type="textarea" v-model="tourEditObj.remark" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tourEditConfirmGiveup('tourEditForm')">取 消</el-button>
        <el-button type="primary" @click="tourEditConfirm('tourEditForm')" :disabled="tourEditBtnDis">保 存</el-button>
      </span>
    </el-dialog>
    <!--编辑游客信息弹窗-->
    <!--删除价格明细弹窗-->
    <el-dialog title="操作提示" :visible.sync="delPriceLidialogVisible" size="tiny">
      <span>确定删除该价格明细？</span>
      <span slot="footer">
        <el-button @click="handleDelDetailItem(false, scope)">
          取 消
        </el-button>
        <el-button type="primary" @click="handleDelDetailItemSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/删除价格明细弹窗-->
    <!--取消订单弹窗-->
    <el-dialog title="操作提示" :visible.sync="cancelOrderdialogVisible" size="tiny">
      <span>确定取消该订单？</span>
      <span slot="footer">
        <el-button @click="cancelOrder(false)">
          取 消
        </el-button>
        <el-button type="primary" @click="cancelOrderSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/取消订单弹窗-->
    <!--签约订单弹窗-->
    <el-dialog title="签约" :visible.sync="signOrderdialogVisible" size="small">
      <div class="qy">
        <div class="t">
          选择合同方式
        </div>
        <el-radio-group v-model="signOrderRadio" class="c">
          <el-radio label="1">生成电子合同</el-radio>
          <el-radio label="2">上传纸质合同</el-radio>
        </el-radio-group>
        <div class="tip">
          (生成后即使订单变更合同也不再更新合同)
        </div>
      </div>
      <span slot="footer">
        <el-button @click="signOrder(false)">
          取 消
        </el-button>
        <el-button type="primary" @click="signOrderSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/签约订单弹窗-->
    <!--确认订单弹窗-->
    <el-dialog title="操作提示" :visible.sync="affirmOrderdialogVisible" size="tiny">
      <span>订单确认后将生成确认件，确定要确认该订单？</span>
      <span slot="footer">
        <el-button @click="affirmOrder(false)">
          取 消
        </el-button>
        <el-button type="primary" @click="affirmOrderSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/确认订单弹窗-->
    <!--申请退团弹窗-->
    <el-dialog title="申请退团" :visible.sync="exitOrderdialogVisible">
      <div class="sq-dialog">
        <div class="sq-box">
          <div class="tit">
            退团人数
          </div>
          <div class="con">
            <el-table ref="multipleTable"
                      :data="exitOrderReList.tourist_type_list"
                      border
                      @selection-change="handleSelecChangeExitOrderType">
              <el-table-column type="selection"
                               width="40"
                               :selectable="checkboxI1" />
              <el-table-column label="游客类型" prop="type_ids_name" />
              <el-table-column label="可退数量" width="80">
                <template slot-scope="scope">
                  <input-number  
                    v-model="scope.row.num"
                    :max="scope.row.maxnum"
                    :min="1"
                    v-if="scope.row.num > 0" />
                  <template v-else>0</template>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="sq-box">
          <div class="tit">
            退团游客
          </div>
          <div class="con">
            <el-table ref="multipleTable"
                      :data="exitOrderReList.tourist_list"
                      border
                      @selection-change="handleSelecChangeExitOrder">
              <el-table-column type="selection"
                               width="40"
                               :selectable="checkboxI2" />
              <el-table-column label="游客姓名">
                <template slot-scope="scope">
                  {{ scope.row.username }}
                  <span class="tt">
                    <!-- <span v-if="scope.row.cancel_status == 0">
                      [未退团]
                    </span> -->
                    <span v-if="scope.row.cancel_status == 1">
                      <!-- [待定损] -->
                      [退团中]
                    </span>
                    <span v-if="scope.row.cancel_status == 2">
                      <!-- [已定损，待确认] -->
                      [退团中]
                    </span>
                    <span v-if="scope.row.cancel_status == 3">
                      <!-- [退团成功] -->
                      [已退团]
                    </span>
                    <!-- <span v-if="scope.row.cancel_status == 4">
                      [退团失败]
                    </span> -->
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="sq-box">
          <div class="tit">
            退团说明
          </div>
          <div class="con">
            <el-input type="textarea" v-model="exitOrderSubData.remark"/>
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="exitOrder(false)">
          取 消
        </el-button>
        <el-button type="primary"
                   @click="exitOrderSubmit"
                   :disabled="exitOrderBtnDis">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/申请退团弹窗-->
    <!--确认位置弹窗-->
    <el-dialog title="确认位置" :visible.sync="affirmSeatdialogVisible" size="tiny">
      <el-form
        :rules="affirmSeatRules"
        :model="affirmSeatObj"
        ref="affirmSeatForm"
        label-width="100px">
        <el-form-item>
          <el-radio-group v-model="affirmSeatObj.option">
            <el-radio label="1">有位</el-radio>
            <el-radio label="2">无位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="位置保留至"
                      prop="seattime"
                      v-if="affirmSeatObj.option == '1'"
                      class="mt10">
          <el-date-picker type="datetime"
                          v-model="affirmSeatObj.seattime"
                          placeholder="选择日期"
                          :picker-options="datepickerOptions1"
                          :editable="false" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="affirmSeat(false)">
          取 消
        </el-button>
        <el-button type="primary"
                   :disabled="affirmSeatBtnDis"
                   @click="affirmSeatSubmit('affirmSeatForm')">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/确认位置弹窗-->
    <!--下达出团通知书弹窗-->
    <el-dialog title="下达出团通知书" :visible.sync="xdAdnoteDialogVisible" size="tiny">
      <div class="xdtzs-box">
        <div class="tit">出团通知书附件</div>
        <div class="hide-list" v-loading.body="loading">
          <el-upload
            class="upload-demo"
            action="/bom/api/tuan/upload_notifications"
            :data="{order_no: orderInfo.order_no}"
            name="file"
            :on-remove="handleRemove2" 
            :file-list="xdUpload"
            :on-success="uploadsucc2"
            :before-upload="beforeUpload2"
          >
            <el-button size="small">选择本地文件</el-button>
          </el-upload>
        </div>
        <!-- <ul class="el-upload-list el-upload-list--text" v-if="xdUpload.length>0">
          <li class="el-upload-list__item is-success"
            v-for="(file, index) in xdUpload"
            :key="index">
            <a class="el-upload-list__item-name" :href="file.url" target="_blank">
              <i class="el-icon-document"></i>{{file.name}}
            </a>
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-circle-check"></i>
            </label><i class="el-icon-close" @click="diyRemove2(file.id)"></i>
          </li>
        </ul> -->
      </div>
      <!-- <span slot="footer">
        <el-button @click="xdAdnote(false)">
          取 消
        </el-button>
        <el-button type="primary" @click="xdAdnoteSubmit">
          确 定
        </el-button>
      </span> -->
    </el-dialog>
    <!--/下达出团通知书弹窗-->
    <!--备注弹窗-->
    <el-dialog title="备注" :visible.sync="bzDialogVisible" size="tiny">
      {{ bzTxt }}
      <span slot="footer">
        <el-button type="primary" @click="bz(false)">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/备注弹窗-->
    <!--上传签证材料弹窗-->
    <el-dialog :title="upqzclTitle" :visible.sync="upqzclDialogVisible" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="上传签证材料：" required>
          <div class="hide-list" v-loading.body="loading">
            <el-upload class="upload-demo"
                       :action="uploadVisaUrl"
                       :data="{order_no: orderInfo.order_no}"
                       name="file"
                       :on-remove="handleRemove3"
                       :file-list="xdUpload"
                       :on-success="uploadsucc3"
                       :before-upload="beforeUpload3"
            >
              <el-button size="small">选择本地文件</el-button>
            </el-upload>
          </div>
          <ul class="el-upload-list el-upload-list--text" v-if="upqzclUpload.length > 0">
            <li class="el-upload-list__item is-success"
                v-for="(file, index) in upqzclUpload"
                :key="index">
              <a class="el-upload-list__item-name" :href="file.url" target="_blank">
                <i class="el-icon-document"/>{{ file.name }}
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"/>
              </label><i class="el-icon-close" @click="diyRemove3(file.addtime)"/>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="快递单号：">
          <el-input v-model="courierNumber" placeholder="请输入快递单号"/>
        </el-form-item>
        <el-form-item label-width="0px" style="display: flex;justify-content: center;margin-bottom:15px;">
          <el-button @click="upqzcl(false)">取 消</el-button>
          <el-button type="primary" @click="upqzclSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--/上传签证材料弹窗-->
    <!-- 生成二维码 -->
    <el-dialog title="邀请游客填写" :visible.sync="openCode">
      <div class="xdtzs-box">
        <div class="tit">证件信息：</div>
        <div class="hide-list el-radio-primary">
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="1">身份证</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="2">护照</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="3">军官证</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="4">港澳通行证</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="5">台胞证</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="6">回乡证</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="7">户口簿</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="8">出生证明</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="9">台湾通行证</el-radio>
          <el-radio class="checkboxcode" v-model="codeCon.cert_info.card" label="10">士兵证</el-radio>
        </div>
        <div class="tit">基本信息：</div>
        <div class="hide-list">
          <p>
            <el-checkbox v-model="baseAll" class="checkboxcode" @change="handleCheckAllChange">全选</el-checkbox>
          </p>
          <el-checkbox v-model="codeCon.base.name" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">中文姓名</el-checkbox>
          <el-checkbox v-model="codeCon.base.contract" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">合同签字人</el-checkbox>
          <el-checkbox v-model="codeCon.base.sex" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">性别</el-checkbox>
          <el-checkbox v-model="codeCon.base.birthday" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">出生日期</el-checkbox>
          <el-checkbox v-model="codeCon.base.tel" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">手机号码</el-checkbox>
          <el-checkbox v-model="codeCon.base.country" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">国籍</el-checkbox>
          <el-checkbox v-model="codeCon.base.en_name" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">英文姓名</el-checkbox>
          <el-checkbox v-model="codeCon.base.profession" true-label="1" false-label="0" class="checkboxcode" @change="handleCheckedCitiesChange">客户类型</el-checkbox>
        </div>
        <div class="tit" v-if="orderDetailData && orderDetailData.visa_info && orderDetailData.visa_info.length > 0">需要的签证材料：</div>
        <div class="hide-list" v-if="orderDetailData && orderDetailData.visa_info && orderDetailData.visa_info.length > 0">
          <el-checkbox-group v-model="codeCon.visa">
            <el-checkbox v-for="(item, index) in orderDetailData.visa_info" :label="item.id" :key="index">{{ item.card_type }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="createOrderQrcode">
          生成二维码
        </el-button>
        <el-button @click="openCode = false">
          取 消
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="邀请游客填写" :visible.sync="codeshow">
      <div style="text-align: center">
        <img width="30%" :src="codeUrl" alt="">
      </div>
      <span slot="footer">
        <el-button type="primary">
          <a :href="codeUrl" download style="color: #fff">下载二维码</a>
        </el-button>
        <el-button type="primary" @click="openCode = true;codeshow = false">
          修改填写内容
        </el-button>
        <el-button @click="codeshow = false">
          取 消
        </el-button>
      </span>
    </el-dialog>
    <!-- 生成二维码 -->
    <!--可下单金额判断弹窗-->
    <el-dialog title="提示" :visible.sync="kxdjeDialogVisible" size="tiny">
      <p class="color-red">该代理商可下单金额不足！</p>
      <p class="kxdje-content">
        请联系管理员或财务
        <span class="color-purple" @click="goto('/fund-settlement',{})">调整授信额度</span>
        或联系代理商进行收款结算。联系代理商线下转账后去
        <span class="color-purple" @click="goto('/sale/recognition/add-peer-proceeds',{action:1,id:distributor_org_id})">登记收款</span>，
        收款审核通过后将充值入余额。
      </p>
      <span slot="footer">
        <el-button type="primary" @click="kxdjeDialogVisible=false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/可下单金额判断弹窗-->
  </div>
</template>

<script>
import { 
  getGroupOrderDetails, 
  getSaleGroupOrderDetails, 
  getFinGroupOrderDetails, 
  addOrderDetail, saleAddOrderDetail, 
  checkPriceDetail, getUserName,getPaymentAccount,
  saveSaleOrderGathering,saveTeamOrderGathering,
  financeSaveOrderGathering, getOrderForm, 
  createOrderQrcode
} from 'src/api/api';
import {
  cancelOrder,
  saleConfirmOrder,
  getTouristInfo,
  editTouristInfo,
  cancelTuanTourist,
  doCancelTuanTourist,
  operatorConfirmSeat,
  signOrderContract,
  ulVisaSave,
  dlElectronicContract,
  createElectronicContract
} from 'src/api/tuan';
import {
  saleOrderDetail as apiStoreSaleOrderDetail,
  saleGetTouristInfo as apiStoreSaleGetTouristInfo,
  saleEditTouristInfo as apiStoreSaleEditTouristInfo,
  saleConfirmOrder as apiStoreSaleConfirmOrder,
  saleCancelTuanTourist,
  saleDoCancelTuanTourist,
  saleCancelOrder,
  saleSignOrderContract,
  saleCreateElectronicContract,
  saleDownloadElectronicContract,
  saleUploadVisaSave,
  financeBomOrderDetail as apiStoreFinaceOrderDetail
} from 'src/api/api_store';

import {
  getOrderShopList
} from 'src/api/order';


import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import * as format from 'src/utils/format';
import InputNumber from 'src/plugins/InputNumber.vue';
import WorldSelect from 'src/plugins/WorldSelect.vue';


const getFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      method:'get',
      url,
      responseType: 'arraybuffer'
    }).then(data => {
      resolve(data.data);
    }).catch(error => {
      reject(error.toString());
    });
  });
};
export default {
  components: {
    InputNumber,
    CurrencyPicker,
    WorldSelect,
  },
  filters: {
    formatPrice(price){
      const num = Number(price) || 0;
      return Number(format.toFixed(num, 3));
    }
  },
  data() {
    let validatePrice = (rules, value, callback) => {
      if (value && !/^\d+$|^(\d+\.?\d+)$/.test(value)) {
        callback(new Error('请输入正确的数值'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      tuanId: this.$route.params.parent_id,
      settlementAmount: 0,
      rmbSettlementAmount: 0,
      orderDetailData: null,
      cancelOrderRecord: null,
      orderInfo: {},
      bills_id: '',
      // 添加收款相关变量 begin
      accountRemoteList: [],
      // yyy
      addShoukuanVisible: false,
      shoukuanBtnDis: false,
      shoukuan: {
        id: '',
        tuan_id: '',
        name: '',
        org: '',
        user_collection_type: '1',
        total_amount: '',
        currency: '人民币',
        currency_rate: 1,
        account_id: '',
        payment_date: new Date(),
        attachment: [],
        remark: ''
      },
      rules: {
        user_collection_type: [{
          required: true,
          message: '请选择收款类型',
          trigger: 'blur'
        }],
        total_amount: [{
          type: 'number',
          required: true,
          message: '请填写金额',
          trigger: 'blur'
        },{
          validator: validatePrice,
          trigger: 'change'
        }],
        currency_rate: [{
          type: 'number',
          required: true,
          message: '请填写汇率',
          trigger: 'blur'
        },{
          validator: validatePrice,
          trigger: 'change'
        }],
        account_id: [{
          type: 'number',
          required: true,
          message: '请填写收款方式/账户',
          trigger: 'blur'
        }],
        payment_date: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      },
      // 添加收款相关变量 end
      // 编辑游客信息相关变量 begin
      tourEditCardType: ['身份证'],
      tourEditVisible: false,
      tourEditBtnDis: false,
      tourEditObj: {
        tourist_id: ''
      },
      tourEditRules: {
        username: [{
          required: true,
          message: '请填写姓名',
          trigger: 'blur'
        }],
        identity_no: [{
          type: 'string',
          required: true,
          message: '请填写证件号码',
          trigger: 'blur'
        }],
        mobile: [{
          // type: ['string','number'],
          required: true,
          message: '请填写手机号码',
          trigger: 'blur'
        }],
        nationality: [{
          required: true,
          message: '请选择国籍',
          trigger: 'blur'
        }],
        user_collection_type: [{
          required: true,
          message: '请选择收款类型',
          trigger: 'blur'
        }],
        total_amount: [{
          type: 'number',
          required: true,
          message: '请填写金额',
          trigger: 'blur'
        },{
          validator: validatePrice,
          trigger: 'change'
        }],
        currency_rate: [{
          type: 'number',
          required: true,
          message: '请填写汇率',
          trigger: 'blur'
        },{
          validator: validatePrice,
          trigger: 'change'
        }],
        account_id: [{
          type: 'number',
          required: true,
          message: '请填写收款方式/账户',
          trigger: 'blur'
        }],
        payment_date: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }]
      },
      // 编辑游客信息相关变量 end
      cancelOrderdialogVisible: false,
      signOrderdialogVisible: false,
      signOrderRadio: '1',
      affirmOrderdialogVisible: false,
      // 申请退团相关变量 begin
      exitOrderdialogVisible: false,
      exitOrderMSelection1: [],
      exitOrderMSelection2: [],
      exitOrderReList: [],
      exitOrderReListOri: [],
      exitOrderSubData: {
        remark: ''
      },
      exitOrderBtnDis: false,
      // 申请退团相关变量 end
      affirmSeatdialogVisible: false,
      affirmSeatBtnDis: false,
      affirmSeatObj: {
        option: '1',
        seattime: ''
      },
      affirmSeatRules: {
        seattime: [{
          type: 'date',
          required: true,
          message: '请选择位置保留日期时间',
          trigger: 'blur'
        }]
      },
      xdAdnoteDialogVisible: false,
      xdUpload: [],
      delPriceLidialogVisible: false,
      delPriceLiRow: {},
      showTime: '',
      bzDialogVisible: false,
      bzTxt: '',
      // 上传签证材料 begin
      upqzclDialogVisible: false,
      upqzclTitle: null,
      upqzclOption: null,
      upqzclUpload: [],
      courierNumber: null,
      // 上传签证材料 end
      openCode: false,
      codeshow: false,
      baseAll: false,
      codeUrl: '',
      codeCon: {
        cert_info: {
          card: '1'
        },
        base: {
          name: '0',
          contract: '0',
          sex: '0',
          birthday: '0',
          tel: '0',
          country: '0',
          en_name: '0',
          profession: '0'
        },
        visa: [],
      },
      kxdjeDialogVisible: false,
      distributor_org_id:0,
      //明细是否能够操作(锁帐等无法添加/编辑)
      isDetailOperation: {
        code:0,
        msg:''
      }
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isOperator(){ // 是否从计调操作跳转过来的
      return this.topMenuConst == 'operator';
    },
    isSale(){ // 是否从销售中心跳转过来的
      return this.topMenuConst == 'sale';
    },
    isFinance(){ // 是否从财务操作跳转过来的
      return this.topMenuConst == 'finance';
    },
    isBOMTrip(){
      const tuanInfo = (this.orderDetailData && this.orderDetailData.tuan_info) || {};

      return tuanInfo.type == 3;  // 是否是bom行程
    },
    isTDMOrder(){
      return this.orderInfo.order_from == 2;  // 是否是TDM订单
    },
    isCancelOrder(){
      return this.orderInfo.confirm_status == -1;  // 是否已取消订单
    },
    canAddOrderDetail(){
      const permissionStr = this.isSale ? 'api/tuan/sale_add_order_detail' : 'api/tuan/add_order_detail';
      return this.$menuPermission(permissionStr) && !this.isSale && !this.isCancelOrder;
    },
    canEditTouristInfo() {
      return (this.topMenuConst == 'sale' || this.topMenuConst == 'store-sale') && !this.isCancelOrder;
    },
    tuituanDetailUrl() {
      let urlPrefix = '';

      switch(this.topMenuConst) {
      case 'sale': 
        if(this.$route.meta.menu == 'saleTeamOrder'){
          urlPrefix = '/sale/myorder';
        }else if(this.$route.meta.menu == 'saleTuanList'){
          urlPrefix = '/sale/order';
        }
        break;
      case 'finance': 
        urlPrefix = '/fcontrol';
        break;
      case 'store-sale': 
        urlPrefix = '/store-sale';
        break;
      case 'store-finace':
        urlPrefix = '/store-finace';
        break;
      case 'operator': 
      default:
        if(this.$route.meta.menu == 'control'){
          urlPrefix = '/control';
        }else if(this.$route.meta.menu == 'planOrderList'){
          urlPrefix = '/plan/order-list';
        }
      }
      let afterUrl = '/tuituanDetail'
      if (this.$route.meta.menu === 'storeSaleInvoiceList' || this.$route.meta.menu === 'storeFinaceInvoiceList') {
        afterUrl = '/tuituanDetail2'
      }
      return urlPrefix + afterUrl;
    },
    uploadPagerContractUrl() {
      let path = '';
      const orderNo = this.orderInfo.order_no;
      
      switch(this.topMenuConst) {
      case 'store-sale': 
        path = '/store-sale/order/oldconfirm';
        break;
      default: 
        path = '/sale/order/oldconfirm';
      }
      return {path: path, query:{'order_no': orderNo, 'tuan_id': this.tuanId, 'edit': '1'}};
    },
    pagerContractDetailUrl() {
      const orderNo = this.orderInfo.order_no;
      let path = '';
      let edit = '';
      
      switch(this.topMenuConst) {
      case 'operator':
        path = '/order/oldconfirm';
        edit = '3';
        break;
      case 'finance': 
        path = '/fcontrol/order/oldconfirm';
        edit = '3';
        break;
      case 'store-sale': 
        path = '/store-sale/order/oldconfirm';
        edit = '1';
        break;
      case 'sale': 
      default: 
        path = '/sale/order/oldconfirm';
        edit = '1';
        break;
      }
      return {path: path, query:{'order_no': orderNo, 'tuan_id': this.tuanId, 'edit': edit}};
    },
    addInvoiceUrl() {
      switch(this.topMenuConst) {
      case 'sale': 
        return {path: '/sale/order/addInvoice1', query: {id: this.bills_id, type: 1}};
      case 'store-sale': 
        return {path: '/store-sale/invoice-add', query: {bid: this.bills_id, type: 1}};
      case 'operator': 
        return {path: '/plan/planinvoice/addInvoice1', query: {id: this.bills_id, type: 1}};
      }
      return '';
    },
    invoiceDetailUrl() {
      switch(this.topMenuConst) {
      case 'sale': 
        return {path: '/sale/saleinvoice/detail1', query: {bid: this.bills_id, type: 1}};
      case 'finance': 
        return {path: '/finace/Financeinvoice/detail1', query: {bid: this.bills_id, type: 1}};
      case 'store-sale': 
        return {path: '/store-sale/invoice-detail', query: {bid: this.bills_id, type: 1}};
      case 'store-finace':
        return {path: '/store-finace/invoice-detail', query: {bid: this.bills_id, type: 1}};
      case 'operator': 
        return {path: '/plan/planinvoice/invoice_detail1', query: {bid: this.bills_id, type: 1}};
      }
      return '';
    },
    uploadVisaUrl() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return '/bom/api_store/sale/upload_visa';
      default:
        return '/bom/api/tuan/upload_visa';
      }
    },
    chakanVisaUrl() {
      const orderNo = this.orderInfo.order_no;
      let path = '';
      
      switch(this.topMenuConst) {
      case 'operator':
        path = '/control/chakanVisa';
        break;
      case 'finance': 
        path = '/fcontrol/chakanVisa';
        break;
      case 'store-sale': 
        path = '/store-sale/chakanVisa';
        break;
      case 'store-finace':
        path = '/store-finace/chakanVisa';
        break;
      case 'sale': 
      default: 
        path = '/sale/chakanVisa';
        break;
      }
      return {path: path, query: {'id': orderNo}};
    },
    getOrderDetailFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
        return getSaleGroupOrderDetails;
      case 'finance': 
        return getFinGroupOrderDetails;
      case 'store-sale': 
        return apiStoreSaleOrderDetail;
      case 'store-finace':
        return apiStoreFinaceOrderDetail;
      case 'operator': 
      default:
        return getOrderShopList;
      }
    },
    saleConfirmOrderFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return apiStoreSaleConfirmOrder;
      case 'sale': 
      default:
        return saleConfirmOrder;
      }
    },
    cancelTuanTouristFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleCancelTuanTourist;
      default:
        return cancelTuanTourist;
      }
    },
    doCancelTuanTouristFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleDoCancelTuanTourist;
      default:
        return doCancelTuanTourist;
      }
    },
    getTouristInfoFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return apiStoreSaleGetTouristInfo;
      case 'sale': 
      default:
        return getTouristInfo;
      }
    },
    editTouristInfoFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return apiStoreSaleEditTouristInfo;
      case 'sale': 
      default:
        return editTouristInfo;
      }
    },
    cancelOrderFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleCancelOrder;
      default:
        return cancelOrder;
      }
    },
    signOrderContractFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleSignOrderContract;
      default:
        return signOrderContract;
      }
    },
    createElectronicContractFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleCreateElectronicContract;
      default:
        return createElectronicContract;
      }
    },
    dlElectronicContractFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleDownloadElectronicContract;
      default:
        return dlElectronicContract;
      }
    },
    ulVisaSaveFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleUploadVisaSave;
      default:
        return ulVisaSave;
      }
    },
    datepickerOptions1(){
      return {
        disabledDate(time) {
          return time.getTime() < ((new Date()).getTime() - 86400000);
        }
      };
    },
    dlQrj(){
      switch(this.topMenuConst){
      case 'operator':
        return '/bom/api/tuan/save_order_confirm_pdf?id=' + this.$route.params.id;
      case 'sale':
        return '/bom/api/tuan/sale_save_order_confirm_pdf?id=' + this.$route.params.id;
      case 'finance':
        return '/bom/api/tuan/finance_save_order_confirm_pdf?id=' + this.$route.params.id;
      case 'store-sale':
        return '/bom/api_store/sale/save_order_confirm_pdf?id=' + this.$route.params.id;
      case 'store-finace':
        return '/bom/api_store/finance/finance_save_order_confirm_pdf?id=' + this.$route.params.id;
      }
    }
  },
  mounted(){
    this.initialize();
    getUserName().then((params)=>{
      let { code, data, msg } = params['data'];
      if(code != '10000'){
        this.shoukuan.name = data.real_name;
        this.shoukuan.org = data.org_name;
      }
    });
  },
  methods:{
    handleBatchDownload() {
      // const sli = this.orderDetailData.material_info.edit_data.visa;
      // let sliend = [];
      // sli.forEach((v,i,a) => {
      //   sliend.push(v.path);
      // })
      // const data = sliend // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
      // const zip = new JSZip()
      // const cache = {}
      // const promises = []
      // data.forEach(item => {
      //     const promise = getFile(item).then(data => { // 下载文件, 并存成ArrayBuffer对象
      //         const arr_name = item.split("/")
      //         const file_name = arr_name[arr_name.length - 1] // 获取文件名
      //         zip.file(file_name, data, { binary: true }) // 逐个添加文件
      //         cache[file_name] = data
      //     })
      //     promises.push(promise)
      // })

      // Promise.all(promises).then(() => {
      //     zip.generateAsync({type:"blob"}).then(content => { // 生成二进制流
      //         FileSaver.saveAs(content, "打包下载.zip") // 利用file-saver保存文件
      //     })
      // })
    },
    lastTime() {
      let seattimeType = this.orderDetailData.order_info[0].seattime_type ? this.orderDetailData.order_info[0].seattime_type : 0; //1分钟，2小时
      let seattime = this.orderDetailData.order_info[0].seattime; // 时间
      let clearTime = this.orderDetailData.order_info[0].clear_time; // 清位时间
      let runTime = this.orderDetailData.order_info[0].run_time; // 服务器时间
      let startTime = this.orderDetailData.order_info[0].scheduled_time; //下单时间
      let from = this.orderDetailData.order_info[0].order_from;
      let mTime = 0;
      //  console.log(seattimeType,clearTime)
      // 20180416171110530
      // 二次确认20180418135450697
      startTime = Math.round(new Date(startTime).getTime()/1000);
      // from 1，3代表bom;2代表tdm
      // 二次确认，有clearTime判断
      if(from == 1 || from == 3) {
        if (seattimeType == 1) {
          seattime = seattime * 60;
        } else if (seattimeType == 2) {
          seattime = seattime * 60 * 60;
        } else if (seattimeType == 0){
          seattime = Math.round(new Date(clearTime).getTime()/1000);
          seattime = seattime - startTime;
          if(seattime <= 0) {
            seattime = 0;
          };
        };
      } else if( from == 2) {
        if(clearTime) {
          seattime = Math.round(new Date(clearTime).getTime()/1000);
          seattime = seattime - startTime;
          if(seattime <= 0) {
            seattime = 0;
          };
        }
      };
      mTime = runTime - startTime;
      if(mTime > seattime) {
        this.showTime = '0秒';
      } else {
        let _this = this;
        mTime = seattime - mTime;
        if(timer) {
          clearInterval(timer);
        };
        //  console.log(timer)
        let timer = setInterval(function () {
          mTime = mTime - 1;
          if(mTime > 0) {
            let d = Math.floor(mTime / (60 * 60 * 24));;
            let h = Math.floor(mTime / (60 * 60)) - (d * 24);
            let m = Math.floor(mTime / 60) - (d * 24 * 60) - (h * 60);
            let s = Math.floor(mTime) - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60);
            let time = '';
            if(d > 0) {
              time = time + `${d}天`;
            };
            if(h > 0) {
              time = time + `${h}时`;
            };
            if(m > 0) {
              time = time + `${m}分`;
            };
            if(s > 0) {
              time = time + `${s}秒`;
            }
            _this.showTime = time;
          } else {
            _this.showTime = '0秒';
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    getCheckPriceDetail(order_no){
      let params = {
        data:{
          order_no: order_no
        }
      };

      checkPriceDetail({
        params: params,
        success: (data) => {
          this.isDetailOperation = data.data;
        },
        showLoading: true
      });
    },
    initialize(){
      let params = {
        data:{
          id: this.$route.params.id,
          tuan_id: this.$route.params.parent_id
        }
      };

      this.getOrderDetailFunc({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            if(!data){
              return this.$message.error('返回数据异常');
            }

            if(Array.isArray(data.order_price_detail)){ // 生成operator字段
              data.order_price_detail = data.order_price_detail.filter(item => {
                // const isCancelOrderRecord = item.item_name == '取消订单';

                // if(isCancelOrderRecord){
                //   this.cancelOrderRecord = item;
                //   return false;
                // }
                // 处理operator为 - 的记录返回的负数，转成正数，因为页面都是使用正数进行计算
                if(item.unit_price < 0){
                  item.unit_price = Math.abs(item.unit_price);
                  item.total_amount = Math.abs(item.total_amount);
                  item.rmb_unit_price = Math.abs(item.rmb_unit_price);
                  item.rmb_total_amount = Math.abs(item.rmb_total_amount);
                  item.operator = '-';
                }else{
                  item.operator = '+';
                }
                return true;
              });
            }

            //计调跳转过来获取价格明细操作权限
            if(this.isOperator && data.order_info[0]){
              this.getCheckPriceDetail(data.order_info[0].order_no);
            }

            this.orderDetailData = data;
            this.bzTxt = this.orderDetailData.material_info.edit_data.visa_remark;
            //  console.log(this.orderDetailData)
            this.settlementAmount = data.all_total_amount;
            this.rmbSettlementAmount = data.all_rmb_total_amount;
            this.bills_id = data.bills_id;
            this.orderInfo = (data && data.order_info && data.order_info[0]) || {};
            this.lastTime();
          }else{
            this.$message.error(msg);
            this.$router.go(-1);
          }
        },
        showLoading: true
      });
    },
    getNewOrderPriceDetailItem() {
      let order_row = {
        item_name: '',
        rmb_unit_price: 0,
        unit_price: 0,
        num: 1,
        total_amount: 0,
        rmb_total_amount: 0,
        remark: '',
        operator: '+',
        isadd: 1,
        locals: 1
      };
      return order_row;
    },
    getCancelOrderSummaries(param) {
      // const { columns, data } = param;
      const sumRow = [];
      const FIELD_MAP = {
        '数量': 'num',
        '项目': 'item_name',
        '单价': 'rmb_unit_price',
        '结算单价': 'unit_price',
        '数量': 'num',
        '结算金额小计': 'rmb_total_amount',
        '小计': 'total_amount',
        '说明': 'remark'
      };

      param.columns.forEach(item => {
        const field = FIELD_MAP[item.label];
        if(field){
          sumRow.push(this.cancelOrderRecord[field]);
        }else{
          sumRow.push('--');
        }

        if(item.label == '单价（本位币）' || item.label == '小计（本位币）'){
          item.align = 'right';
        }
      });

      return sumRow;
    },
    // 收款账号的接口数据
    remoteMethod(){
      let params = {
        data: { }
      };
      getPaymentAccount({
        params: params,
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            let arr=data.data.list;
            this.accountRemoteList=arr.map(function(a){
              return {id:a.id,account_info:a.account_type_str+'-'+a.account_no};
            });
          } else {
            this.$message.error(data.msg);
          }
        }
      });
    },
    // 上传图片功能
    handlePreview(file) {
      this.prePicUrl = file.url;
      this.dialogPicVisible = true;
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < this.shoukuan.attachment.length; i++) {
        if (this.shoukuan.attachment[i]['id'] == file.id) {
          this.shoukuan.attachment.splice(i, 1);
          return false;
        }
      }
    },
    uploadsucc(response, file, fileList) {
      if(response.code==0){
        if(this.shoukuan.attachment.length==10){
          this.$message.error('上传凭证数量不可超过十份');
        }else{
          this.shoukuan.attachment.push({
            id: response.data[0].id,
            name: response.data[0].name,
            url: response.data[0].path,
          });
        }
      }else{
        this.$message.error(response.msg);
      }
      this.loading=false;
    },
    beforeUpload(file){
      this.loading=true;
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading=false;
        return false;
      }
      return isLt2M;
    },
    // 添加收款弹窗
    addShoukuan(){
      this.remoteMethod();
      this.addShoukuanVisible = true;
    },
    cancelDiagShoukuan(done){
      done();
      this.$refs['shoukuanForm'].resetFields();
    },
    shoukuanConfirm(formName) {
      this.shoukuan.id = this.$route.params.id;
      this.shoukuan.tuan_id = this.$route.params.parent_id;
      //  console.log(this.shoukuan)
      // return false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let para = {};
          para.data = {... this.shoukuan};
          para.data.user_collection_type = Number(para.data.user_collection_type);
          para.data.payment_date = this.shoukuan.payment_date ? format.date(this.shoukuan.payment_date) : '';
          let tplAttach = [];
          for(let i in this.shoukuan.attachment){
            tplAttach.push(this.shoukuan.attachment[i].id);
          }
          tplAttach = tplAttach.join(',');
          para.data.attachment = tplAttach;

          this.shoukuanBtnDis = true;
          let apiName = '';
          if(this.isFinance){
            // 财务接口
            apiName = financeSaveOrderGathering;
          }else if(this.isSale){
            // 销售接口
            apiName = saveSaleOrderGathering;
          }else if(this.isOperator){
            // 计调接口
            apiName = saveTeamOrderGathering;
          }
          apiName({
            params: para,
            success: (res) => {
              this.$message({
                message: res.data.msg,
                type: res.data.code == '0' ? 'success' : 'error'
              });
              this.shoukuanBtnDis = false;
              if (res.data.code == '0') {
                this.addShoukuanVisible = false;
                this.$refs[formName].resetFields();
              }
            },
            showLoading: true
          });
        } else {
           console.log(valid);
          return false;
        }
      });
    },
    shoukuanConfirmGiveup(formName){
      this.addShoukuanVisible = false;
      this.$refs[formName].resetFields();
    },
    handleAddDetailItem(name = '', price = 0, num = 0, index = '', isadd = 1){
      const newItem = this.getNewOrderPriceDetailItem();
      const { order_price_detail } = this.orderDetailData;

      if(this.isDetailOperation.code != 0) {
        this.$message.error(this.isDetailOperation.msg);
        return;
      }

      order_price_detail.push(newItem);

    },
    handleBlurUnitPrice(row){

      const {currency_rate} = this.orderDetailData;
      const isClear = /^\s*$/.test(row.unit_price);
      let unit_price = 0;
      let num = Number(row.num) || 0;

      if(num && !isClear){
        unit_price = row.total_amount / num;
      }else if(isClear){
        row.unit_price = 0;
      }
      if(!/^\d+(\.\d*)?$/.test(row.unit_price)){
        // this.$message.error('请输入正确的数字(非负数)');
        // 输入错误格式时，使用计算出来就的汇率替换
      }else if(row.unit_price > 100000000){
        // this.$message.error('请输入小于100000000的数值');
      }else if(unit_price != row.unit_price || isClear){
        let oldTotalAmount = row.total_amount, oldRmbTotalAmount = row.rmb_total_amount;
        unit_price = Number(row.unit_price) || 0;
        row.total_amount = unit_price * num;
        row.rmb_unit_price = unit_price * currency_rate;
        row.rmb_total_amount = row.total_amount * currency_rate;
        if(row.operator == '-'){
          this.settlementAmount += oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount += oldRmbTotalAmount - row.rmb_total_amount;
        }else{
          this.settlementAmount -= oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount -= oldRmbTotalAmount - row.rmb_total_amount;
        }
      }
      row.unit_price = Number(format.toFixed(unit_price, 3));
    },
    // 使用input事件监听，用change事件在删除非最后一条记录时会触发change事件导致计算总金额错误
    handleInputOperator(row, val){
      //  console.log('handle input operator: ', row, val);

      if(!row.total_amount){
        return false;
      }
      if(val == '-'){
        this.settlementAmount -= 2 * row.total_amount;
        this.rmbSettlementAmount -= 2 * row.rmb_total_amount;
      }else{
        this.settlementAmount += 2 * row.total_amount;
        this.rmbSettlementAmount += 2 * row.rmb_total_amount;
      }
    },
    handleBlurNum(row){

      const {currency_rate} = this.orderDetailData;
      const isClear = /^\s*$/.test(row.num) || !/^\d+$/.test(row.num);
      let unit_price = Number(row.unit_price) || 0;
      let num = 0;

      // 输入错误格式时，使用计算出来就的数量替换
      if(unit_price && !isClear){
        num = row.total_amount / unit_price;
      }else if(isClear){
        row.num = 0;
      }
      if(!/^\d+$/.test(row.num)){
        //this.$message.error('数量格式不正确');
      }else if(num != row.num || isClear){
        let oldTotalAmount = row.total_amount, oldRmbTotalAmount = row.rmb_total_amount;
        num = Number(row.num) || 0;
        row.total_amount = unit_price * num;
        row.rmb_unit_price = unit_price * currency_rate;
        row.rmb_total_amount = row.total_amount * currency_rate;
        if(row.operator == '-'){
          this.settlementAmount += oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount += oldRmbTotalAmount - row.rmb_total_amount;
        }else{
          this.settlementAmount -= oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount -= oldRmbTotalAmount - row.rmb_total_amount;
        }
      }
      row.num = isClear && !num ? '' : num;
    },
    handleDelDetailItem(status, scope){
      if(status){
        this.delPriceLidialogVisible = true;
        this.delPriceLiRow = scope;
      }else{
        this.delPriceLidialogVisible = false;
        this.delPriceLiRow = {};
      }
    },
    handleDelDetailItemSubmit(){
      const {$index, row} = this.delPriceLiRow;

      if(!row.id) {
        this.orderDetailData.order_price_detail.splice(this.delPriceLiRow.$index, 1);
        if(row.operator == '-'){
          this.settlementAmount = (this.settlementAmount + row.total_amount) || 0;
          this.rmbSettlementAmount = (this.rmbSettlementAmount + row.rmb_total_amount) || 0;
        }else{
          this.settlementAmount = (this.settlementAmount - row.total_amount) || 0;
          this.rmbSettlementAmount = (this.rmbSettlementAmount - row.rmb_total_amount) || 0;
        }
        this.delPriceLidialogVisible = false;
      } else {
        this.handleSaveDetailItem(null,true);
      }


    },
    handleSaveDetailItem(scope,isDelDetailItem){
    // handleSubmitForm(){
      let detail = [],
        delItemId = 0;

      const addOrderDetailFunc = this.isSale ? saleAddOrderDetail : addOrderDetail;
      const checkOrderItemFunc = (item, idx) => {
        if((!item.id && !item.item_name) || (item.id && item.id !== delItemId && !item.item_name)){
          this.$message.error(`请填写第${idx + 1}项的项目名称`);
          return true;
        }
        if((!item.id && !item.num) || (item.id && item.id !== delItemId && !item.num)){
          this.$message.error(`请填写第${idx + 1}项的数量`);
          return true;
        }
        if((!item.id && item.unit_price <= 0 && item.isadd) || (item.id && item.id !== delItemId && item.unit_price <= 0 && item.isadd)){
          this.$message.error(`请填写第${idx + 1}项的单价`);
          return true;
        }
        return false;
      };
      const { order_price_detail, currency, currency_rate } = this.orderDetailData;

      if(isDelDetailItem){
        const {row} = this.delPriceLiRow;

        delItemId = row.id;
        detail = order_price_detail.filter((item)=> {return item.isadd && item.id !== delItemId;});
      } else {
        detail = order_price_detail.filter((item)=> item.isadd);
      }

      if(!Array.isArray(order_price_detail) || order_price_detail.some(checkOrderItemFunc)){
        return;
      }

      addOrderDetailFunc({
        params: {data: {
          order_no: this.orderInfo.order_no,
          currency,
          currency_rate,
          detail
        }},
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.initialize();
            this.delPriceLidialogVisible = false;
            // if(this.isSale){
            //   this.$router.push({path: "tuan-order", query: { id: this.$route.params.parent_id }});
            // }else{
            //   this.$router.push({path: "/tuan-list", query: { id: this.$route.params.parent_id }});
            // }
          }
        },
        showLoading: true
      });
    },
    handleEditDetailItem(scope){
      if(this.isDetailOperation.code != 0) {
        this.$message.error(this.isDetailOperation.msg);
        return;
      }
      this.orderDetailData.order_price_detail[scope.$index].locals = 1;
      this.orderDetailData.order_price_detail.splice(1,0);
    },
    handleGoBack(){
      history.go(-1);
    },
    // 游客信息编辑操作
    touristEdit(obj){
      const order_no = this.orderDetailData.order_info[0].order_no,
        tuan_id = this.$route.params.parent_id,
        tourist_id = obj.id;
      let params = {data: {order_no, tuan_id, tourist_id}};
      this.getTouristInfoFunc({
        params,
        success: res => {
          const {code, data, msg} = res.data;
          if(code != 0){
            this.$message({
              message: msg,
              type: 'error'
            });
            return;
          }
          this.tourEditVisible = true;
          this.tourEditObj = data.tourist_info;
          this.tourEditCardType = data.card_type_lists;
          this.tourEditObj.tourist_id = obj.id;
        }
      });
    },
    cancelDiagTourEdit(done){
      done();
      this.$refs['tourEditForm'].resetFields();
    },
    tourEditConfirm(formName) {
      this.tourEditObj.identity_end_date = this.tourEditObj.identity_end_date ? format.date(this.tourEditObj.identity_end_date) : '';
      this.tourEditObj.birthday = this.tourEditObj.birthday ? format.date(this.tourEditObj.birthday) : '';
      //  console.log(this.tourEditObj)
      // return false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let para = {};
          para.data = {... this.tourEditObj};
          this.tourEditBtnDis = true;
          this.editTouristInfoFunc({
            params: para,
            success: (res) => {
              this.$message({
                message: res.data.msg,
                type: res.data.code == '0' ? 'success' : 'error'
              });
              this.tourEditBtnDis = false;
              if (res.data.code == '0') {
                this.tourEditVisible = false;
                this.$refs[formName].resetFields();
                this.initialize();
              }
            },
            showLoading: true
          });
        } else {
           console.log(valid);
          return false;
        }
      });
    },
    tourEditConfirmGiveup(formName){
      this.tourEditVisible = false;
      this.$refs[formName].resetFields();
    },
    // 取消订单操作弹窗
    cancelOrder(status){
      if(status){
        this.cancelOrderdialogVisible = true;
      }else{
        this.cancelOrderdialogVisible = false;
      }
    },
    cancelOrderSubmit(){
      const order_no = this.orderDetailData.order_info[0].order_no,
        tuan_id = this.$route.params.parent_id;
      let params = {data: {order_no, tuan_id}};
      this.cancelOrderFunc({
        params,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.cancelOrderdialogVisible = false;
            this.initialize();
          }
        },
        showLoading: true
      });
    },
    // 签约订单操作弹窗
    signOrder(status){
      if(status){
        const order_no = this.orderDetailData.order_info[0].order_no,
          tuan_id = this.$route.params.parent_id;
        let params = {data: {order_no, tuan_id}};
        this.signOrderContractFunc({
          params,
          success: res => {
            const { code, data, msg} = res.data;
            if(code != 0){
              this.$message({
                message: msg,
                type: 'error'
              });
            }else{
              this.signOrderdialogVisible = true;
            }
          },
          showLoading: true
        });
      }else{
        this.signOrderdialogVisible = false;
      }
    },
    signOrderSubmit(){
      if(this.signOrderRadio == 1){
        const order_no = this.orderDetailData.order_info[0].order_no,
          tuan_id = this.$route.params.parent_id;
        let params = {data: {order_no, tuan_id}};
        this.createElectronicContractFunc({
          params,
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.signOrderdialogVisible = false;
              this.initialize();
            }
          }
        });
      }else{
        this.$router.push(this.uploadPagerContractUrl);
      }
    },
    // 下载电子合同
    dlDzht(){
      const order_no = this.orderDetailData.order_info[0].order_no,
        tuan_id = this.$route.params.parent_id;
      let params = {data: {order_no, tuan_id}};
      this.dlElectronicContractFunc({
        params,
        success: res => {
          window.location.href = res.data.data.path;
        }
      });
    },
    // 确认订单操作弹窗
    affirmOrder(status, orgId){
      this.distributor_org_id = orgId;

      if(status){
        this.affirmOrderdialogVisible = true;
      }else{
        this.affirmOrderdialogVisible = false;
      }
    },
    affirmOrderSubmit(){
      const order_no = this.orderDetailData.order_info[0].order_no,
        tuan_id = this.$route.params.parent_id;
      let params = {data: {order_no, tuan_id}};
      this.saleConfirmOrderFunc({
        params,
        success: res => {
          //balance_insufficient 为判断该代理商可下单金额不足；
          if (res.data.data && res.data.data.balance_insufficient
            && res.data.data.balance_insufficient === 1) {
            this.affirmOrderdialogVisible = false;
            this.kxdjeDialogVisible = true;
            return;
          }

          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.affirmOrderdialogVisible = false;
            this.initialize();
          }
        }
      });
    },
    // 申请退团操作弹窗
    exitOrder(status){
      if(status){
        const order_no = this.orderDetailData.order_info[0].order_no,
          tuan_id = this.$route.params.parent_id;
        let params = {data: {order_no, tuan_id}};
        this.cancelTuanTouristFunc({
          params,
          success: res => {
            const {code, data, msg} = res.data;
            if(code != 0){
              this.$message({
                message: msg,
                type: 'error'
              });
            }else{
              this.exitOrderdialogVisible = true;
              this.exitOrderReList = data;
              let that = this;
              this.exitOrderReList.tourist_type_list.forEach(function(v,i,a){
                that.exitOrderReList.tourist_type_list[i].maxnum = v.num;
              });
              function cloneObj(obj){
                var str, newobj = obj.constructor === Array ? [] : {};
                if(typeof obj !== 'object'){
                  return;
                } else if(window.JSON){
                  str = JSON.stringify(obj), //序列化对象
                  newobj = JSON.parse(str); //还原
                } else {//如果不支持以上方法
                  for(var i in obj){
                    newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
                  }
                }
                return newobj;
              };
              this.exitOrderReListOri = cloneObj(this.exitOrderReList);
            }
          },
          showLoading: true
        });
      }else{
        this.exitOrderdialogVisible = false;
      }
    },
    exitOrderSubmit(){
      // if(this.exitOrderMSelection2.length < 1){
      //   this.$message({
      //     message: '请至少选择一个游客！',
      //     type: 'error'
      //   });
      //   return false;
      // }
      // if(this.exitOrderSubData.remark.replace(/\s/g,'') == ''){
      //   this.$message({
      //     message: '请填写退团说明信息！',
      //     type: 'error'
      //   });
      //   return false;
      // }
      this.exitOrderBtnDis = true;
      if(this.exitOrderSubData.remark.length > 200){
        this.$message({
          message: '退团说明不能超过200个字符！',
          type: 'error'
        });
        return false;
      }
      this.exitOrderSubData.order_no = this.orderDetailData.order_info[0].order_no;
      this.exitOrderSubData.tuan_id = this.$route.params.parent_id;
      this.exitOrderSubData.type_ids = [];
      this.exitOrderSubData.type_ids_name = [];
      this.exitOrderSubData.num = [];
      this.exitOrderMSelection1.forEach((v) => {
        this.exitOrderSubData.type_ids.push(v.id);
        this.exitOrderSubData.type_ids_name.push(v.type_ids_name);
        this.exitOrderSubData.num.push(v.num);
      });
      this.exitOrderSubData.tourist_ids = [];
      this.exitOrderMSelection2.forEach((v) => {
        this.exitOrderSubData.tourist_ids.push(v.id);
      });
      let params = {data: this.exitOrderSubData};
      this.doCancelTuanTouristFunc({
        params,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          this.exitOrderBtnDis = false;
          if (res.data.code == '0') {
            this.exitOrderdialogVisible = false;
            this.exitOrderSubData.remark = '';
            this.initialize();
            this.$router.push({
              path: this.tuituanDetailUrl,
              query: {ono: this.orderInfo.order_no, tid: this.tuanId}
            });
          }
        }
      });
    },
    checkboxI1(row, index){
      if(row.num == 0){
        return 0;
      }else{
        return 1;
      }
    },
    checkboxI2(row, index){
      if(row.cancel_status == 1 || row.cancel_status == 2 ||row.cancel_status == 3){
        // 不可选
        return 0;
      }else{
        // 可选
        return 1;
      }
    },
    handleSelecChangeExitOrderType(val){
      this.exitOrderMSelection1 = val;
    },
    handleSelecChangeExitOrder(val){
      this.exitOrderMSelection2 = val;
    },
    // 确认位置操作弹窗
    affirmSeat(status){
      if(status){
        this.affirmSeatdialogVisible = true;
      }else{
        this.affirmSeatdialogVisible = false;
      }
    },
    affirmSeatSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.affirmSeatObj.order_no = this.orderDetailData.order_info[0].order_no;
          let params = {data: this.affirmSeatObj};
          operatorConfirmSeat({
            params,
            success: res => {
              this.$message({
                message: res.data.msg,
                type: res.data.code == '0' ? 'success' : 'error'
              });
              if (res.data.code == '0') {
                this.affirmSeatdialogVisible = false;
                this.initialize();
              }
            }
          });
        }else{
           console.log(valid);
          return false;
        }
      });
    },
    // 下达出团通知书操作弹窗
    xdAdnote(status){
      if(status){
        this.xdAdnoteDialogVisible = true;
      }else{
        this.xdAdnoteDialogVisible = false;
      }
    },
    xdAdnoteSubmit(){
    },
    // 上传附件功能
    handleRemove2(file, fileList) {
      for (let i = 0; i < this.xdUpload.length; i++) {
        if (this.xdUpload[i]['id'] == file.id) {
          this.xdUpload.splice(i, 1);
          return false;
        }
      }
    },
    uploadsucc2(response, file, fileList) {
      this.$message({
        message: response.msg,
        type: response.code == '0' ? 'success' : 'error'
      });
      // if(response.code==0){
      //   if(this.xdUpload.length==1){
      //     this.$message.error("上传凭证数量只能一份");
      //   }else{
      //     this.xdUpload.push({
      //       id: response.data[0].id,
      //       name: response.data[0].name,
      //       url: response.data[0].path,
      //     });
      //   }
      // }else{
      //   this.$message.error(response.msg);
      // }
      this.loading = false;
      if(response.code == '0'){
        this.xdAdnoteDialogVisible = false;
        this.initialize();
      }
    },
    beforeUpload2(file){
      this.loading = true;
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading=false;
        return false;
      }
      return isLt2M;
    },
    bz(status){
      if(status){
        this.bzDialogVisible = true;
      }else{
        this.bzDialogVisible = false;
      }
    },
    // 上传签证材料操作弹窗
    upqzcl(status,type){
      if(type){
        this.upqzclTitle = type == 'new' ? '上传签证材料' : '补充上传签证材料';
        this.upqzclOption = type == 'new' ? '1' : '2';
      }
      if(status){
        this.upqzclDialogVisible = true;
      }else{
        this.upqzclDialogVisible = false;
      }
    },
    upqzclSubmit(){
      let params = {
        data: {
          order_no: this.orderInfo.order_no,
          image: this.upqzclUpload,
          option: this.upqzclOption,
          courier_number: this.courierNumber || ''
        }
      };
      this.ulVisaSaveFunc({
        params,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.upqzclDialogVisible = false;
            this.initialize();
          }
        }
      });
    },
    // 上传附件功能
    handleRemove3(file, fileList) {
      for (let i = 0; i < this.upqzclUpload.length; i++) {
        if (this.upqzclUpload[i]['id'] == file.id) {
          this.upqzclUpload.splice(i, 1);
          return false;
        }
      }
    },
    uploadsucc3(response, file, fileList) {
      this.$message({
        message: response.msg,
        type: response.code == '0' ? 'success' : 'error'
      });
      if(response.code==0){
        if(this.upqzclUpload.length == 10){
          this.$message.error('上传签证证数量不能超过10份');
        }else{
          this.upqzclUpload.push({
            addtime: response.data.addtime,
            name: response.data.name,
            path: response.data.path,
          });
        }
      }else{
        this.$message.error(response.msg);
      }
      this.loading = false;
    },
    beforeUpload3(file){
      this.loading = true;
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading=false;
        return false;
      }
      return isLt2M;
    },
    diyRemove3(id){
      for (let i = 0; i < this.upqzclUpload.length; i++) {
        if (this.upqzclUpload[i]['addtime'] == id) {
          this.upqzclUpload.splice(i, 1);
          return false;
        }
      }
    },
    createOrderQrcode() {
       console.log(this.codeCon);
      let params = {
        data: {
          order_from: this.orderDetailData.order_info[0].order_from,
          order_no: this.orderDetailData.order_info[0].order_no,
          base: this.codeCon.base,
          cert_info: this.codeCon.cert_info,
          visa: this.codeCon.visa
        }
      };
      //  console.log(params)
      // return false
      createOrderQrcode({
        params,
        success: (res) => {
          let request = res.data;
          if(request.code === 0) {
            this.openCode = false;
            this.codeshow = true;
            this.codeUrl = request.msg;
          } else {
            this.$message({
              type: 'error',
              message: request.msg
            });
          }
        },
        showLoading: true
      });
    },
    handleCheckAllChange(event) {
      let checked = event.target.checked;
      if(checked) {
        for(let key in this.codeCon.base) {
          this.codeCon.base[key] = '1';
        }
      } else {
        for(let key in this.codeCon.base) {
          this.codeCon.base[key] = '0';
        }
      }
    },
    handleCheckedCitiesChange(event) {
      let checked = event.target.checked;
      let sum = 0;
      if(checked) {
        for(let key in this.codeCon.base) {
          if (this.codeCon.base[key] == '1') {
            sum = sum + 1;
          }
        }
      };
      if(sum === 8) {
        this.baseAll = true;
      } else {
        this.baseAll = false;
      }
    },
    goto(path,query) {
      this.$router.push({
        path:path,
        query:query
      });
    }
  }
};
</script>


<style scoped lang="scss">
.cont{
  padding: 20px;
  background-color: #fff;
}
.search-item {
  line-height: 30px;
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
.fr{
  float: right;
}
.mr0{
  margin-right: 0!important;
}
.mr10{
  margin-right: 10px;
}
.mt-5{
  margin-top: -5px!important;
}
.mt-10{
  margin-top: -10px!important;
}
.mb0{
  margin-bottom: 0!important;
}
.oh{
  overflow: hidden;
}
.ip2{
  padding: 1px 5px;
}
.w100per{
  width: 100%;
}
.system-content{
  margin-bottom: 10px;
}
.xd{
  width: 80px;
  color: #999999;
  line-height: 16px;
}
.el-dropdown-link{
    color: #b10c79;
    cursor: pointer;
}
.mt10{
  margin-top: -20px;
}
.dess{
  float: left;
  color: #444;
  margin-top: 10px;
}
.dess-ul{
  overflow: hidden;
  list-style: none;
}
.dess-ul li{
  float: left;
  width: 350px;
}
.dess-ul .tit{
  display: inline-block;
  width: 90px;
  color: #999;
  padding: 3px 0;
}
.neck-txt{
  margin: -10px 0 8px;
}
.neck-txt span{
  display: inline-block;
  margin-right: 15px;
}
.neck-txt i{
  font-style: normal;
  color: #f60;
}
.neck-txt .op-btn{
  float: right;
  margin-top: -5px;
}
.span-btn{
  display: inline-block;
  color: #b10c79;
  cursor: pointer;
  margin: 0 5px;
}
.qy{
  overflow: hidden;
  margin-left: 20px;
  .t{
    float: left;
  }
  .c{
    float: left;
    margin-left: 20px;
    width: 115px;
  }
  .el-radio{
    margin: 0 0 10px 0;
  }
  .tip{
    float: left;
    color: #999;
    line-height: 16px;
  }
}
// sq-dialog
.sq-dialog{
  margin-top: -30px;
  .tt{
    color: #666;
  }
  .lin{
    display: block;
    color: #999;
    text-align: center;
  }
}
.sq-box{
  margin: 15px 10px 0;
  .tit{
    color: #666;
    margin-bottom: 5px;
  }
  // .b{
  //   color: #f00;
  // }
}
.xdtzs-box{
  padding-left: 110px;
  padding-bottom: 30px;
  overflow: hidden;
  .tit{
    float: left;
    margin-left: -110px;
    line-height: 30px;
  }
}
.el-item-mb10 {
  margin-bottom: 13px;
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
</style>
