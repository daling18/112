<template>
  <div class="details">
    <div class="system-tab">
      <ul class="tab-box" v-if="orderInfo.is_tourist_cancel == 1">
        <router-link class="on" to="" tag="li">
          订单详情
        </router-link>
        <router-link v-if="tuituanDetailPerm" :to="{ path: tuituanDetailUrl, query: {ono: orderInfo.order_no, tid: tuanId}}" tag="li">
          退团/款单详情
        </router-link>
      </ul>
    </div>
    <div v-if="orderDetailData" class="cont">
      <div class="panel">
        <div class="hd">
          <h2>团队订单信息</h2>
        </div>
        <div class="bd">
          <el-table class="el-table--middle" :data="orderDetailData.order_info" border style="width: 100%">
            <el-table-column align="center" prop="order_from_name" width="80px" label="订单来源" />
            <el-table-column align="center" prop="order_no" min-width="170" label="订单编号" />
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
              v-if="!isStore"
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
              v-if="!isStore"
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
            <!-- <el-table-column
              v-if="isStore"
              header-align="center"
              align="right"
              width="110"
              label="在线支付金额"
            >
              <template slot-scope="scope">
                <div v-if="orderInfo.preset_payment_amount || !showSetOnlinePayAmount">
                  {{ orderInfo.preset_payment_amount || (!showSetOnlinePayAmount && '--') }}
                </div>
                <a v-if="showSetOnlinePayAmount" href="javascript:;" @click="handleSetOnlinePay('show')">设置金额</a>
              </template>
            </el-table-column> -->
            <el-table-column
              align="center"
              :label="isStore ? '供应商' : orderInfo.order_from != 3 ? '结算方公司名称' : '代理商/联系人'"
              min-width="140"
            >
              <template slot-scope="scope">
                <p class="ellipsis" :title="isStore ? scope.row.supplier_org_name : scope.row.distributor_org_name">
                  {{ isStore ? scope.row.supplier_org_name : scope.row.distributor_org_name }}
                </p>
              </template>
            </el-table-column>
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
            <el-table-column align="center" label="操作" width="120">
              <template slot-scope="scope">
                <template v-if="!isNoOrderOperate(scope.row.edit)">
                  <el-dropdown v-if="scope.row.edit.length > 3" trigger="click" @command="handleOrderOperate">
                    <span class="el-dropdown-link">
                      操作
                      <i class="el-icon-caret-bottom el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <template v-for="(edit, i) in scope.row.edit">
                        <el-dropdown-item
                          v-if="isShowOrderOperate(edit, scope.row)"
                          :key="i"
                          :command="{edit, data: scope.row}"
                        >
                          {{ ORDER_EDIT_MAP[edit] }}
                        </el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <template v-else v-for="(edit,i) in scope.row.edit">
                    <span class="span-btn" :key="i" v-if="isShowOrderOperate(edit, scope.row)" @click="handleOrderOperate({edit, data: scope.row})">
                      {{ ORDER_EDIT_MAP[edit] }}
                    </span>
                  </template>
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
          <el-table :data="orderDetailData.tourist_lists" border style="width: 100%">
            <el-table-column align="center" label="姓名">
              <template slot-scope="scope">
                {{ scope.row.username }}
                <router-link
                  class="mr0"
                  v-if="scope.row.cancel_status > 0 && tuituanDetailPerm"
                  :to="{ path: tuituanDetailUrl, query: {ono: orderInfo.order_no, tid: tuanId}}"
                >[退]</router-link>
                <el-tag type="primary" v-else-if="scope.row.cancel_status == -1">已挪团</el-tag>
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
            <el-table-column label="操作" align="center" v-if="showEditTouristCol">
              <template slot-scope="scope">
                <span
                  class="span-btn"
                  v-if="editTouristInfoPerm && (scope.row.cancel_status == 0 || scope.row.cancel_status == 4)"
                  @click="handleEditTourist(scope.row)"
                >
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
          <span>结算总金额：
            <i>{{ settlementAmount | formatPrice }}</i>
          </span>
          <span>本位币：
            <i>{{ rmbSettlementAmount | formatPrice }}</i>
          </span>
          <el-button class="op-btn" v-if="operatorPriceDetailAddPerm && canAddOrderDetail" type="primary" @click="handleAddPriceItem('show')">
            + 新增项目
          </el-button>
          <!-- <el-button v-if="isSale && orderDetailData.order_info[0].order_from == 1 && orderDetailData.order_info[0].confirm_status_name != '已取消'" type="text" class="code-btn" @click="openCode = true">
            邀请填写二维码
          </el-button> -->
        </div>
        <div class="bd">
          <el-table style="width: 100%" border :data="orderDetailData.order_price_detail">
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column label="项目" align="center" prop="item_name">
              <template slot-scope="scope">
                <div class="ellipsis" v-if="scope.row.approval_status_name" :title="'(' + scope.row.approval_status_name + ')' + scope.row.item_name">
                  <span :class="scope.row.approval_status | getStatusColor">({{ scope.row.approval_status_name }})</span>
                  {{ scope.row.item_name }}
                </div>
                <div class="ellipsis" :title="scope.row.item_name" v-else>{{ scope.row.item_name }}</div>
              </template>
            </el-table-column>
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
    <add-shoukuan-dialog :visible.sync="addShoukuanVisible" @submit="handleSaveShoukuan" @close="addShoukuanVisible=false" :from="1" :id="orderDetailData ? orderDetailData.order_info[0].id :''" />
    <!--编辑游客信息弹窗-->
    <el-dialog title="编辑游客信息" :visible.sync="tourEditVisible" :close-on-click-modal="false">
      <line-tourist-form :tourist="tourEditObj" :card-type-map="tourEditCardType" />
      <span slot="footer">
        <el-button @click="tourEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="tourEditConfirm()" :disabled="tourEditBtnDis">保 存</el-button>
      </span>
    </el-dialog>
    <!--编辑游客信息弹窗-->
    <!--添加价格明细-->
    <el-dialog title="添加价格明细" :visible.sync="addPriceItemVisible" :close-on-click-modal="false">
      <div class="price-item" v-for="(item, idx) in addPriceItemList" :key="idx">
        <order-price-item :tourist-list="avalidTourists" :item="item" :show-btn="false" />
        <div class="opt-btns tar">
          <a class="add-btn" href="javascript:;" @click="handleAddPriceItem('add')" />
          <a class="sub-btn" v-if="addPriceItemList.length != 1" href="javascript:;" @click="handleAddPriceItem('sub', idx)" />
        </div>
      </div>
      <span slot="footer">
        <el-button @click="addPriceItemVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddPriceItem('submit')">保 存</el-button>
      </span>
    </el-dialog>
    <!--/添加价格明细-->
    <!--签约订单弹窗-->
    <el-dialog title="签约" :visible.sync="signOrderdialogVisible" size="small">
      <div class="qy">
        <div class="t">
          选择合同方式
        </div>
        <el-radio-group v-model="signOrderRadio" class="c">
          <el-radio label="1">生成电子合同</el-radio>
          <el-radio v-if="uploadPagerContractPerm" label="2">上传纸质合同</el-radio>
        </el-radio-group>
        <div class="tip">
          (生成后即使订单变更合同也不再更新合同)
        </div>
      </div>
      <span slot="footer">
        <el-button @click="signOrder(false)">取 消</el-button>
        <el-button type="primary" @click="signOrderSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!--/签约订单弹窗-->
    <!--申请退团弹窗-->
    <el-dialog title="申请退团" :visible.sync="exitOrderdialogVisible">
      <div class="sq-dialog">
        <div class="sq-box">
          <div class="tit">游客应收明细</div>
          <div class="con">
            <el-table ref="multipleTable" :data="exitOrderReList" border @selection-change="handleSelecChangeExitOrder">
              <el-table-column type="selection" width="40" :selectable="checkExitTouristSelectable" />
              <el-table-column label="游客姓名" min-width="80">
                <template slot-scope="scope">
                  <div class="ellipsis" :title="scope.row.username">
                    <span class="tt">{{ scope.row.cancel_status_name }}</span>
                    {{ scope.row.username }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="价格项" min-width="160" prop="priceStr">
                <template slot-scope="scope">
                  <div class="ellipsis" :title="scope.row.priceStr">{{ scope.row.priceStr }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="sq-box">
          <div class="tit">退团说明</div>
          <div class="con">
            <el-input type="textarea" v-model="exitOrderSubData.remark" />
          </div>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="exitOrder(false)">取 消</el-button>
        <el-button type="primary" @click="exitOrderSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!--/申请退团弹窗-->
    <!--申请退款弹窗-->
    <el-dialog title="申请退款" :visible.sync="orderRefundDialog.show" size="tiny">
      <el-form label-width="110px" class="edit-tourist-form">
        <el-form-item label="退款金额" required>
          <input-number  v-model="orderRefundDialog.applyAmount" :precision="2"/>
        </el-form-item>
        <el-form-item label="退款理由" required>
          <el-input type="textarea" v-model="orderRefundDialog.remark" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="orderRefundDialog.show=false">取 消</el-button>
        <el-button type="primary" @click="handleOrderRefund">确 定</el-button>
      </span>
    </el-dialog>
    <!--/申请退款弹窗-->
    <!--确认位置弹窗-->
    <el-dialog title="确认位置" :visible.sync="affirmSeatdialogVisible" size="tiny">
      <el-form :rules="affirmSeatRules" :model="affirmSeatObj" ref="affirmSeatForm" label-width="100px">
        <el-form-item>
          <el-radio-group v-model="affirmSeatObj.option">
            <el-radio label="1">有位</el-radio>
            <el-radio label="2">无位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="位置保留至" prop="seattime" v-if="affirmSeatObj.option == '1'" class="mt10">
          <el-date-picker type="datetime" v-model="affirmSeatObj.seattime" placeholder="选择日期" :picker-options="datepickerOptions1" :editable="false" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="affirmSeat(false)">取 消</el-button>
        <el-button type="primary" @click="affirmSeatSubmit('affirmSeatForm')">确 定</el-button>
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
    <!--上传签证材料弹窗-->
    <el-dialog :title="upqzclTitle" :visible.sync="upqzclDialogVisible" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="上传签证材料：" required>
          <div class="hide-list" v-loading.body="loading">
            <el-upload class="upload-demo" :action="uploadVisaUrl" :data="{order_no: orderInfo.order_no}" name="file" :on-remove="handleRemove3" :file-list="xdUpload" :on-success="uploadsucc3" :before-upload="beforeUpload3">
              <el-button size="small">选择本地文件</el-button>
            </el-upload>
          </div>
          <ul class="el-upload-list el-upload-list--text" v-if="upqzclUpload.length > 0">
            <li class="el-upload-list__item is-success" v-for="(file, index) in upqzclUpload" :key="index">
              <a class="el-upload-list__item-name" :href="file.url" target="_blank">
                <i class="el-icon-document" />{{ file.name }}
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check" />
              </label>
              <i class="el-icon-close" @click="diyRemove3(file.addtime)" />
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="快递单号：">
          <el-input v-model="courierNumber" placeholder="请输入快递单号" />
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
    <el-dialog title="确定订单" :visible.sync="kxdjeDialog.visible" size="tiny">
      <div v-if="kxdjeDialog.code == 40004">
        <el-checkbox v-model="kxdjeDialog.checked">同意以下默认规则</el-checkbox>
        <div>每次确认订单后，系统将生成电子确认件，默认采购方与供应方双方均已确认。</div>
      </div>
      <div v-else>
        {{ kxdjeDialog.msg }}
        <el-popover trigger="hover" width="150">
          1、授信：在“财务操作”中进行授信额度配置
          <br>
          2、预付款：线下转账，登记收款，审批通过后将充值入余额
          <span slot="reference" class="que-icon">?</span>
        </el-popover>
        <div v-if="kxdjeDialog.code == 40002">
          或<router-link :to="'/finace/balance-particulars-my?settlement_org_id=' + orderInfo.distributor_org_id">在线充值</router-link>
        </div>
      </div>
      <div slot="footer" v-if="kxdjeDialog.code == 40004">
        <el-button type="primary" @click="affirmOrderSubmit(1)">确 定</el-button>
        <el-button @click="kxdjeDialog.visible=false">取 消</el-button>
      </div>
      <div slot="footer" v-else>
        <el-button type="primary" @click="kxdjeDialog.visible=false">确 定</el-button>
      </div>
    </el-dialog>
    <!--/可下单金额判断弹窗-->
    <el-dialog title="在线支付" :visible.sync="setOnlinePayDialog.show" size="tiny">
      <el-form label-width="80px">
        <el-form-item label="订单金额" required>
          <input-number  v-model="setOnlinePayDialog.amount" :precision="2" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="handleSetOnlinePay('submit')">
          提 交
        </el-button>
        <el-button @click="setOnlinePayDialog.show = false">
          取 消
        </el-button>
      </span>
    </el-dialog>
    <!-- <online-pay
      ref="onlinePay"
      :order-id="orderInfo.order_no"
      v-if="loadOnlinePay"
      order-resource="1"
      :amount="orderInfo.preset_payment_amount || orderInfo.rmb_total_amount"
      @finish="handleLoadPayFinish"
    /> -->
    <online-pay
      ref="onlinePay"
      :order-id="orderInfo.order_no"
      v-if="loadOnlinePay"
      order-resource="1"
      :amount="orderInfo.rmb_total_amount"
      @finish="handleLoadPayFinish"
    />
  </div>
</template>

<script>
import {
  getGroupOrderDetails,
  // getSaleGroupOrderDetails,  // 已废弃，与distrOrderDetail共用
  getFinGroupOrderDetails,
  // addOrderDetail,
  // saleAddOrderDetail,
  checkPriceDetail,
  saveSaleOrderGathering,
  saveTeamOrderGathering,
  financeSaveOrderGathering,
  getOrderForm,
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
  distrGenerateDownloadContract,
  createElectronicContract,
  operatorPriceDetailAdd,
  distrOrderDetail,
  checkRefund,
  orderRefund,
  reGenerateContract
} from 'src/api/tuan';
import {
  setPaymentAmount
} from 'src/api/order';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import * as format from 'src/utils/format';
import InputNumber from 'src/plugins/InputNumber.vue';
import WorldSelect from 'src/plugins/WorldSelect.vue';
import AddShoukuanDialog from './AddShoukuanDialog.comp.vue';
import OrderPriceItem from './OrderPriceItem.comp.vue';
import OnlinePay from './components/OnlinePay.vue';
import LineTouristForm from './components/LineTouristForm.vue';

export default {
  components: {
    InputNumber,
    CurrencyPicker,
    WorldSelect,
    AddShoukuanDialog,
    OrderPriceItem,
    LineTouristForm,
    OnlinePay
  },
  filters: {
    formatPrice: format.formatPrice,
    getStatusColor(status){
      switch(status) {
      case 3: 
        return 'color-red';
      case 2:
        return 'color-green';
      case 1:
      default:
        return 'color-gray';
      }
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
      ORDER_EDIT_MAP: ['', '取消订单', '签约', '确认', '申请退团', '添加收款', '查看收入', '确认位置'],
      MATERIAL_EDIT_MAP: ['', '下载电子合同', '查看纸质合同', '下载确认件', '下达出团通知书', '下载出团通知书', '下载签证材料', '签证材料详情', '备注', '上传签证材料', '补充签证材料', '申请开票', '查看开票详情', '生成合同'],
      CANCEL_STATUS_MAP: ['', '[退团中]', '[退团中]', '[已退团]'],
      tuanId: this.$route.params.parent_id,
      orderInfo: {},
      addPriceItemVisible: false,
      addPriceItemList: [],
      isStore: false,   // 是否是门店

      loading: false,
      settlementAmount: 0,
      rmbSettlementAmount: 0,
      orderDetailData: null,
      cancelOrderRecord: null,
      bills_id: '',
      addShoukuanVisible: false,
      // 编辑游客信息相关变量 begin
      tourEditCardType: ['身份证'],
      tourEditVisible: false,
      tourEditBtnDis: false,
      tourEditObj: {
        tourist_id: ''
      },
      // 编辑游客信息相关变量 end
      signOrderdialogVisible: false,
      signOrderRadio: '1',
      // 申请退团相关变量 begin
      exitOrderdialogVisible: false,
      // exitOrderMSelection1: [],
      exitOrderMSelection2: [],
      exitOrderReList: [],
      // exitOrderReListOri: [],
      exitOrderSubData: {
        remark: ''
      },
      // 申请退团相关变量 end
      affirmSeatdialogVisible: false,
      affirmSeatObj: {
        option: '1',
        seattime: ''
      },
      affirmSeatRules: {
        seattime: [
          {
            type: 'date',
            required: true,
            message: '请选择位置保留日期时间',
            trigger: 'blur'
          }
        ]
      },
      xdAdnoteDialogVisible: false,
      xdUpload: [],
      delPriceLidialogVisible: false,
      delPriceLiRow: {},
      showTime: '',
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
        visa: []
      },
      kxdjeDialog: {
        visible: false,
        checked: false,
        code: 0,
        msg: ''
      },
      distributor_org_id: 0,
      //明细是否能够操作(锁帐等无法添加/编辑)
      isDetailOperation: {
        code: 0,
        msg: ''
      },
      orderRefundDialog: {
        show: false,
        applyAmount: 0,
        remark: ''
      },
      setOnlinePayDialog: {
        show: false,
        amount: 0
      },
      loadOnlinePay: false
    };
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isOperator() {
      // 是否从计调操作跳转过来的
      return this.topMenuConst == 'operator';
    },
    isSale() {
      // 是否从销售中心跳转过来的
      return this.topMenuConst == 'sale';
    },
    isFinance() {
      // 是否从财务操作跳转过来的
      return this.topMenuConst == 'finance';
    },
    isBOMTrip() {
      const tuanInfo = (this.orderDetailData && this.orderDetailData.tuan_info) || {};

      return tuanInfo.type == 3; // 是否是bom行程
    },
    isTDMOrder() {
      return this.orderInfo.order_from == 2; // 是否是TDM订单
    },
    isCancelOrder() {
      return this.orderInfo.confirm_status == -1; // 是否已取消订单
    },
    canAddOrderDetail() {
      const permission = this.$menuPermission('api/tuan/operator_price_detail_add');
      const showPriceAddBtn = this.orderDetailData && this.orderDetailData.show_price_add_menu;

      return permission && showPriceAddBtn;
    },
    // showSetOnlinePayAmount() {
    //   // 有在线支付操作，且未打开过支付
    //   const ONLINE_PAY_EDIT_CODE = 10;

    //   return Array.isArray(this.orderInfo.edit)
    //           && this.orderInfo.edit.indexOf(ONLINE_PAY_EDIT_CODE) !== -1
    //           && this.$menuPermission('api/pay/pay_order')
    //           && !this.orderInfo.pay_time;
    // },
    avalidTourists() {
      // 可用于添加价格明细的游客列表：未退团(0), 退团失败(4)
      let tourists = this.orderDetailData.tourist_lists || [];

      return tourists.filter(item => item.cancel_status == 0 || item.cancel_status == 4)
    },
    showEditTouristCol() {
      return ((this.topMenuConst == 'sale' || this.topMenuConst == 'distribution') && !this.isCancelOrder);
    },
    tuituanDetailPerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/sale_get_cancel_detail');
      case 'finance':
        return this.$menuPermission('api/finance/fin_get_cancel_detail');
      case 'operator':
      default:
        return this.$menuPermission('api/tuan/operator_get_cancel_detail');
      }
    },
    tuituanDetailUrl() {
      let urlPrefix = '';

      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
      case 'operator':
        return '../../tuituan-detail';
        //urlPrefix = '/sale/order';
      case 'finance':
        return '../../tuituan-detail';
      }
    },
    uploadPagerContractPerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/get_order_contract_list');
      default:
        return false;
      }
    },
    uploadPagerContractUrl() {
      let path = '';
      const orderNo = this.orderInfo.order_no;

      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        path = '../../pager-contract';
      }
      return {
        path: path,
        query: { order_no: orderNo, tuan_id: this.tuanId, edit: '1' }
      };
    },
    pagerContractDetailPerm() {
      switch (this.topMenuConst) {
      case 'operator':
      case 'finance':
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/get_order_contract_list');
      default:
        return false;
      }
    },
    pagerContractDetailUrl() {
      const orderNo = this.orderInfo.order_no;
      let path = '';
      let edit = '';

      switch (this.topMenuConst) {
      case 'operator':
        path = '../../pager-contract';
        edit = '3';
        break;
      case 'finance':
        path = '../../pager-contract';
        edit = '3';
        break;
      case 'distribution':
      case 'sale':
        path = '../../pager-contract';
        edit = '1';
        break;
      }
      return {
        path: path,
        query: { order_no: orderNo, tuan_id: this.tuanId, edit: edit }
      };
    },
    addInvoicePerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/invoice/sale_todo_add_income');
      case 'operator':
        return this.$menuPermission('api/invoice/todo_add_income');
      }
      return false;
    },
    addInvoiceUrl() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return {
          path: '../../add-invoice',
          query: { id: this.bills_id, type: 1 }
        };
      case 'operator':
        return {
          path: '../../add-invoice',
          query: { id: this.bills_id, type: 1 }
        };
      }
      return '';
    },
    invoiceDetailPerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/invoice/sale_income_detail');
      case 'finance':
        return this.$menuPermission('api/invoice/finance_income_detail');
      case 'operator':
        return this.$menuPermission('api/invoice/income_detail');
      }
      return false;
    },
    invoiceDetailUrl() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return {
          path: '../../invoice-detail',
          query: { bid: this.bills_id, type: 1 }
        };
      case 'finance':
        return {
          path: '../../invoice-detail',
          query: { bid: this.bills_id, type: 1 }
        };
      case 'operator':
        return {
          path: '../../invoice-detail',
          query: { bid: this.bills_id, type: 1 }
        };
      }
      return '';
    },
    uploadVisaUrl() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return '/bom/api_store/sale/upload_visa';
      case 'distribution':
      case 'sale':
        return '/bom/api/tuan/upload_visa';
      default:
        return '';
      }
    },
    chakanVisaPerm() {
      switch (this.topMenuConst) {
      case 'operator':
        return this.$menuPermission('api/tuan/order_visa_verify');
      case 'finance':
        return this.$menuPermission('api/tuan/finance_order_visa_verify');
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/sale_order_visa_verify');
      default:
        return false;
      }
    },
    chakanVisaUrl() {
      const orderNo = this.orderInfo.order_no;
      let path = '';

      switch (this.topMenuConst) {
      case 'operator':
        path = '../../chakanVisa';
        break;
      case 'finance':
        path = '/fcontrol/chakanVisa';
        break;
      case 'distribution':
      case 'sale':
        path = '../../chakanVisa';
        break;
      }
      return { path: path, query: { id: orderNo } };
    },
    getOrderDetailFunc() {
      switch (this.topMenuConst) {
      case 'finance':
        return getFinGroupOrderDetails;
      case 'store-sale':
        return apiStoreSaleOrderDetail;
      case 'store-finace':
        return apiStoreFinaceOrderDetail;
      case 'operator':
        return getGroupOrderDetails;
      case 'sale':
        // return getSaleGroupOrderDetails;
      case 'distribution':
        return distrOrderDetail;
      default:
      }
    },
    saveOrderGatheringPerm() {
      switch (this.topMenuConst) {
      case 'finance':
        return this.$menuPermission('api/tuan/finance_save_order_gathering');
      case 'operator':
        return this.$menuPermission('api/tuan/save_team_order_gathering');
      // case 'store-sale':
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/save_sale_order_gathering');
      default:
        return false;
      }
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
      default:
        return this.emptyFunc(this.topMenuConst + ' not saveOrderGatheringFunc');
      }
    },
    incomeInfoPerm() {
      switch (this.topMenuConst) {
      case 'finance':
        return this.$menuPermission('api/tuan/fin_income_info');
      case 'operator':
        return this.$menuPermission('api/tuan/op_income_info');
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/sale_income_info');
      default:
        return false;
      }
    },
    incomeInfoUrl() {
      let path = '';

      switch (this.topMenuConst) {
      case 'finance':
        path = '../../income-detail';
        break;
      case 'operator':
        path = '../../income-detail';
        break;
      case 'distribution':
      case 'sale':
        path = '../../income-detail';
      }
      return {
        path: path,
        query: { oid: this.orderInfo.order_no }
      };
    },
    saleConfirmOrderPerm() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return apiStoreSaleConfirmOrder;
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/sale_confirm_order');
      default:
        return false;
      }
    },
    saleConfirmOrderFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return apiStoreSaleConfirmOrder;
      case 'distribution':
      case 'sale':
        return saleConfirmOrder;
      default:
        return this.emptyFunc(this.topMenuConst + ' not saleConfirmOrderFunc')
      }
    },
    cancelTuanTouristFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return saleCancelTuanTourist;
      case 'distribution':
      case 'sale':
        return cancelTuanTourist;
      default:
        return this.emptyFunc(this.topMenuConst + ' not cancelTuanTourist')
      }
    },
    doCancelTuanTouristPerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/do_cancel_tuan_tourist');
      default:
        return false;
      }
    },
    doCancelTuanTouristFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return saleDoCancelTuanTourist;
      case 'distribution':
      case 'sale':
        return doCancelTuanTourist;
      default:
        return this.emptyFunc(this.topMenuConst + ' not doCancelTuanTourist')
      }
    },
    getTouristInfoFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return apiStoreSaleGetTouristInfo;
      case 'distribution':
      case 'sale':
        return getTouristInfo;
      default:
        return this.emptyFunc(this.topMenuConst + ' not getTouristInfo')
      }
    },
    editTouristInfoPerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/edit_tourist_info');
      default:
        return false;
      }
    },
    editTouristInfoFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return apiStoreSaleEditTouristInfo;
      case 'distribution':
      case 'sale':
        return editTouristInfo;
      default:
        return this.emptyFunc(this.topMenuConst + ' not editTouristInfo')
      }
    },
    cancelOrderPerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/cancel_order');
      default:
        return false;
      }
    },
    cancelOrderFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return saleCancelOrder;
      case 'distribution':
      case 'sale':
        return cancelOrder;
      default:
        return this.emptyFunc(this.topMenuConst + ' not cancelOrder')
      }
    },
    signOrderContractFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return saleSignOrderContract;
      case 'distribution':
      case 'sale':
        return signOrderContract;
      default:
        return this.emptyFunc(this.topMenuConst + ' not signOrderContract')
      }
    },
    createElectronicContractPerm() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/create_electronic_contract');
      default:
        return false;
      }
    },
    createElectronicContractFunc() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return saleCreateElectronicContract;
      case 'distribution':
      case 'sale':
        return createElectronicContract;
      default:
        return this.emptyFunc(this.topMenuConst + ' not createElectronicContract')
      }
    },
    dlElectronicContractPerm() {
      switch (this.topMenuConst) {
      case 'operator':
      case 'finance':
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/download_electronic_contract');
      default:
        return false;
      }
    },
    dlElectronicContractFunc() {
      switch (this.topMenuConst) {
      case 'operator':
      case 'finance':
      case 'distribution':
      case 'sale':
        return dlElectronicContract;
      default:
        return this.emptyFunc(this.topMenuConst + ' not dlElectronicContract')
      }
    },
    distrGenerateDownloadContractPerm() {
      switch (this.topMenuConst) {
      case 'operator':
      case 'finance':
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/distr_generate_download_contract');
      default:
        return false;
      }
    },
    distrGenerateDownloadContractFunc() {
      switch (this.topMenuConst) {
      case 'operator':
      case 'finance':
      case 'distribution':
      case 'sale':
        return distrGenerateDownloadContract;
      default:
        return this.emptyFunc(this.topMenuConst + ' not distrGenerateDownloadContract')
      }
    },
    ulVisaSavePerm() {
      switch (this.topMenuConst) {
      // case 'store-sale':
      //   return apiStoreSaleConfirmOrder;
      case 'distribution':
      case 'sale':
        return this.$menuPermission('api/tuan/upload_visa_save');
      default:
        return false;
      }
    },
    ulVisaSaveFunc() {
      switch (this.topMenuConst) {
      case 'distribution':
      case 'sale':
        return ulVisaSave;
      default:
        return this.emptyFunc(this.topMenuConst + ' not ulVisaSave')
      }
    },
    operatorPriceDetailAddPerm() {
      switch (this.topMenuConst) {
      case 'operator':
        return this.$menuPermission('api/tuan/operator_price_detail_add');
      default:
        return false;
      }
    },
    operatorPriceDetailAddFunc() {
      switch (this.topMenuConst) {
      case 'operator':
        return operatorPriceDetailAdd;
      default:
        return this.emptyFunc(this.topMenuConst + ' not operatorPriceDetailAdd')
      }
    },
    datepickerOptions1() {
      return {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 86400000;
        }
      };
    },
    dlQrj() {
      switch (this.topMenuConst) {
      case 'operator':
        return (
          '/bom/api/tuan/save_order_confirm_pdf?id=' + this.$route.params.id
        );
      case 'distribution':
      case 'sale':
        return (
          '/bom/api/tuan/sale_save_order_confirm_pdf?id=' +
            this.$route.params.id
        );
      case 'finance':
        return (
          '/bom/api/tuan/finance_save_order_confirm_pdf?id=' +
            this.$route.params.id
        );
      // case 'store-sale':
      //   return (
      //     '/bom/api_store/sale/save_order_confirm_pdf?id=' +
      //       this.$route.params.id
      //   );
      // case 'store-finace':
      //   return (
      //     '/bom/api_store/finance/finance_save_order_confirm_pdf?id=' +
      //       this.$route.params.id
      //   );
      }
    }
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    emptyFunc(msg){
      return function() {
        console.log(msg + ' arguments: ', arguments);
      }
    },
    calcClearTime() {
      let seattimeType = this.orderInfo.seattime_type ? this.orderInfo.seattime_type : 0; //1分钟，2小时
      let seattime = this.orderInfo.seattime; // 时间
      let clearTime = this.orderInfo.clear_time; // 清位时间
      let runTime = this.orderInfo.run_time; // 服务器时间
      let startTime = this.orderInfo.scheduled_time; //下单时间
      let from = this.orderInfo.order_from;
      let mTime = 0;
      // console.log(seattimeType,clearTime)
      // 20180416171110530
      // 二次确认20180418135450697
      startTime = Math.round(new Date(startTime).getTime() / 1000);
      // from 1，3代表bom;2代表tdm
      // 二次确认，有clearTime判断
      if (from == 1 || from == 3) {
        if (seattimeType == 1) {
          seattime = seattime * 60;
        } else if (seattimeType == 2) {
          seattime = seattime * 60 * 60;
        } else if (seattimeType == 0) {
          seattime = Math.round(new Date(clearTime).getTime() / 1000);
          seattime = seattime - startTime;
          if (seattime <= 0) {
            seattime = 0;
          }
        }
      } else if (from == 2) {
        if (clearTime) {
          seattime = Math.round(new Date(clearTime).getTime() / 1000);
          seattime = seattime - startTime;
          if (seattime <= 0) {
            seattime = 0;
          }
        }
      }
      mTime = runTime - startTime;
      if (mTime > seattime) {
        this.showTime = '0秒';
      } else {
        let _this = this;
        mTime = seattime - mTime;
        if (timer) {
          clearInterval(timer);
        }
        // console.log(timer)
        let timer = setInterval(function() {
          mTime = mTime - 1;
          if (mTime > 0) {
            let d = Math.floor(mTime / (60 * 60 * 24));
            let h = Math.floor(mTime / (60 * 60)) - d * 24;
            let m = Math.floor(mTime / 60) - d * 24 * 60 - h * 60;
            let s = Math.floor(mTime) - d * 24 * 60 * 60 - h * 60 * 60 - m * 60;
            let time = '';
            if (d > 0) {
              time = time + `${d}天`;
            }
            if (h > 0) {
              time = time + `${h}时`;
            }
            if (m > 0) {
              time = time + `${m}分`;
            }
            if (s > 0) {
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
    getOrderDetail() {
      let params = {
        data: {
          id: this.$route.params.id,
          tuan_id: this.$route.params.parent_id
        }
      };

      this.getOrderDetailFunc({
        params: params,
        success: params => {
          let { code, data, msg } = params['data'];
          if (code == 0) {
            if (!data) {
              return this.$message.error('返回数据异常');
            }

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
              this.checkPriceDetailEditState(data.order_info[0].order_no);
            }

            // console.log(this.orderDetailData)
            this.settlementAmount = data.all_total_amount;
            this.rmbSettlementAmount = data.all_rmb_total_amount;
            this.bills_id = data.bills_id;

            this.orderInfo = (data.order_info && data.order_info[0]) || {};
            this.isStore = !!data.is_store;
            this.ORDER_EDIT_MAP = this.orderInfo.edit_list || {};

            this.materialInfo = data.material_info || {};
            this.bzTxt = this.materialInfo.edit_data.visa_remark;
            this.MATERIAL_EDIT_MAP = this.materialInfo.edit_list || {};

            this.orderDetailData = data;
            this.calcClearTime();
          } else {
            this.$message.error(msg);
            this.$router.go(-1);
          }
        },
        showLoading: true
      });
    },
    isShowOrderOperate(edit, order) {
      switch (edit) {
      case 1:  // '取消订单'
        return this.cancelOrderPerm;
      case 2:   // '签约'
        // 判断来源中增加微信小程序条件
        return this.createElectronicContractPerm && order.is_wx_order != 1;
      case 3:   // '确认'
        return this.saleConfirmOrderPerm;
      case 4:   // '申请退团', 
        return this.doCancelTuanTouristPerm;
      case 5:
        return this.saveOrderGatheringPerm;
      case 6:
        return this.incomeInfoPerm;
      case 7:
        return this.$menuPermission('api/tuan/operator_confirm_seat');
      case 9:
        return this.$menuPermission('api/tuan/order_refund');
      case 10:
        return this.$menuPermission('api/pay/pay_order')
        // 营业部订单，且未设置支付金额的不显示在线支付按钮
        // && (!this.isStore || this.orderInfo.preset_payment_amount);
      default:
        return true;
      }
    },
    isNoOrderOperate(edit) {
      if (Array.isArray(edit)) {
        return !edit.some(this.isShowOrderOperate)
      }
      return true
    },
    isShowMaterialOperate(edit, material) {
      switch (edit) {
      // case 4:
      //   let noVisa = this.orderDetailData.visa_check == 0;
      //   // 非待送签： 1=待上传签证材料 2=待送签 3=待补签证材料 
      //   let noWaitVisa = this.orderDetailData.visa_check == 1 
      //     && this.materialInfo.edit_data.visa_status != 1
      //     && this.materialInfo.edit_data.visa_status != 2
      //     && this.materialInfo.edit_data.visa_status != 3;

      //   return noVisa || noWaitVisa;
      case 1:   // 下载电子合同
        return this.dlElectronicContractPerm;
      case 14:
        return this.distrGenerateDownloadContractPerm;
      case 2:
        return this.pagerContractDetailPerm;
      case 7:
        return this.chakanVisaPerm;
      case 9:
      case 10:
        return this.ulVisaSavePerm;
      case 11:
        return this.addInvoicePerm;
      case 12:
        return this.invoiceDetailPerm;
      default:
        return true;
      }
    },
    // 检测价格明细的操作状态
    checkPriceDetailEditState(order_no) {
      let params = {
        data: {
          order_no: order_no
        }
      };

      checkPriceDetail({
        params: params,
        success: data => {
          this.isDetailOperation = data.data;
        },
        showLoading: true
      });
    },
    // 检查退团游客是否可勾选
    checkExitTouristSelectable(row, idx){
      return row.cancel_status == 0 || row.cancel_status == 4;
    },
    // checkOrderPriceDetail(){
    //   let priceDetailList = [];
    //   const allTouristIds = this.avalidTourists.map(item => item.id);
    //   let state = false;

    //   // if(!Array.isArray(order_price_detail) || order_price_detail.length == 0){
    //   //   this.$message.error('请添加订单价格明细记录');
    //   // }
    //   state = this.addPriceItemList.some((item, idx) => {
    //     if(!item.item_name){
    //       this.$message.error(`请填写第${idx + 1}项的项目名称`);
    //       return true;
    //     }
    //     if(!item.num){
    //       this.$message.error(`请填写第${idx + 1}项的数量`);
    //       return true;
    //     }
    //     if(item.unit_price <= 0 && item.isadd){
    //       this.$message.error(`请填写第${idx + 1}项的单价`);
    //       return true;
    //     }
    //     if(item.alloc_type == 2 && item.tourist_ids.length == 0){
    //       this.$message.error(`请选择第${idx + 1}项指定的游客`);
    //       return true;
    //     }else if(item.alloc_type == 1){
    //       item.tourist_ids = allTouristIds;
    //     }
    //     priceDetailList.push(item);
    //     return false;
    //   });

    //   if(!state){
    //     this.addPriceItemList = priceDetailList;
    //   }
    //   return state;

    // },
    handleOrderOperate(cmd) {
      const {edit, data: order} = cmd;

      switch (edit) {
      case 1:  // '取消订单'
        this.cancelOrder();
        break;
      case 2:   // '签约'
        this.signOrder(true);
        break;
      case 3:   // '确认'
        this.affirmOrder(order.distributor_org_id);
        break;
      case 4:   // '申请退团', 
        this.exitOrder(true);
        break;
      case 5:   // '添加收款'
        this.addShoukuanVisible = true;
        break;
      case 6:   // '查看收入'
        this.$router.push(this.incomeInfoUrl);
        break;
      case 7:   // '确认位置'
        this.affirmSeat(true);
        break;
      case 9:   // '申请退款'
        checkRefund({
          params: { data: {order_no: this.orderInfo.order_no}},
          success: res => {
            if (res.data.code == 0) {
              this.orderRefundDialog = {
                show: true,
                applyAmount: 0,
                remark: ''
              }
            } else {
              this.$message.error(res.data.msg)
            }
          },
          showLoading: true
        })
        break;
      case 10:  // 在线支付
        if(this.loadOnlinePay){
          this.handleLoadPayFinish();
        }else{
          this.loadOnlinePay = true;
        }
      default:
        return true;
      }
    },
    handleAddPriceItem(type, data){
      switch(type){
      case 'show':
        // 判断是否有操作价格明细权限
        if(this.isDetailOperation.code != 0) {
          this.$message.error(this.isDetailOperation.msg);
          return;
        }
        this.addPriceItemVisible = true;
        this.addPriceItemList = [OrderPriceItem.getInitPriceDetail()];
        break;
      case 'add':
        this.addPriceItemList.push(OrderPriceItem.getInitPriceDetail());
        break;
      case 'sub':
        this.addPriceItemList.splice(data, 1);
        break;
      case 'submit':
        // if(this.checkOrderPriceDetail()){
        //   return 
        // }
        const allTouristIds = this.avalidTourists.map(item => item.id);
        this.addPriceItemList.forEach(item => {
          if(item.alloc_type == 1){
            item.tourist_ids = allTouristIds;
          }
        })

        this.operatorPriceDetailAddFunc({
          params: {data: {
            order_no: this.orderInfo.order_no,
            // currency: '人民币',
            // currency_rate: 1,
            detail: this.addPriceItemList
          }},
          success: res => {
            const { code, data, msg } = res.data;

            if(code == 0){
              this.addPriceItemVisible = false;
              this.getOrderDetail();
              this.$message.success(msg);
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
        // console.log('submit add price item');
        break;
      default: 
        this.addPriceItemVisible = false;
      }
    },
    handleMaterialOperate(edit, material) {
      // console.log('handleMaterialOperate', edit, material)
      switch (edit) {
      case 1:
        this.dlDzht();
        break;
      case 14:
        this.distrGenerateDownloadContract();
        break;
      case 2:
        this.$router.push(this.pagerContractDetailUrl);
        break;
      case 3:
        location.href = this.dlQrj;
        break;
      case 4:
        this.xdAdnote(true);
        break;
      case 7:
        this.$router.push(this.chakanVisaUrl);
        break;
      case 8:
        this.bz(true);
        break;
      case 9:
        this.upqzcl(true,'new');
        break;
      case 10:
        this.upqzcl(true,'re');
        break;
      case 11:
        this.$router.push(this.addInvoiceUrl);
        break;
      case 12:
        this.$router.push(this.invoiceDetailUrl);
        break;
      case 13:
        this.signOrder(true);
        break;
      case 15:
        this.reGenerateContract()
        break
      default:
        return true;
      }
    },
    handleSaveShoukuan(data) {
      let para = {};

      para.data = { ...data };
      para.data.id = this.$route.params.id;
      para.data.tuan_id = this.$route.params.parent_id;
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
            this.getOrderDetail();
          }
        },
        showLoading: true
      });
    },
    // 游客信息编辑操作
    handleEditTourist(obj) {
      const order_no = this.orderInfo.order_no,
        tuan_id = this.$route.params.parent_id,
        tourist_id = obj.id;
      let params = { data: { order_no, tuan_id, tourist_id } };
      this.getTouristInfoFunc({
        params,
        success: res => {
          const { code, data, msg } = res.data;
          if (code != 0) {
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
          this.tourEditObj.order_no = order_no;
        }
      });
    },
    handleOrderRefund(){
      const {orderRefundDialog, orderInfo} = this;
      orderRefund({
        params: { data: {
          tuan_id: this.tuanId,
          order_no: this.orderInfo.order_no,
          apply_amount: orderRefundDialog.applyAmount,
          remark: orderRefundDialog.remark
        }},
        success: res => {
          const { code, data, msg } = res.data;
          if (code == 0) {
            this.$message({message: msg, type: 'success'});
            if (this.tuituanDetailPerm) {
              this.$router.push({
                path: this.tuituanDetailUrl,
                query: { ono: this.orderInfo.order_no, tid: this.tuanId }
              });
            }else{
              this.orderRefundDialog.show = false;
              this.getOrderDetail();
            }
          }else{
            this.$message({message: msg, type: 'error'});
          }
        },
        showLoading: true
      });
    },
    tourEditConfirm() {
      this.$confirm('保存后将作废原电子合同重新生成电子合同，确认保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tourEditObj.identity_end_date = this.tourEditObj.identity_end_date
          ? format.date(this.tourEditObj.identity_end_date)
          : '';
        this.tourEditObj.birthday = this.tourEditObj.birthday
          ? format.date(this.tourEditObj.birthday)
          : '';
        let para = {};
        para.data = { ...this.tourEditObj };
        this.tourEditBtnDis = true;
        this.editTouristInfoFunc({
          params: para,
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            this.tourEditBtnDis = false;
            if (res.data.code == '0') {
              this.tourEditVisible = false;
              this.getOrderDetail();
            }
          },
          showLoading: true
        });
      }).catch(() => {        
      });
    },
    // 取消订单操作弹窗
    cancelOrder() {
      this.$confirm('确定取消该订单？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelOrderSubmit();
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },
    cancelOrderSubmit() {
      const order_no = this.orderDetailData.order_info[0].order_no,
        tuan_id = this.$route.params.parent_id;
      let params = { data: { order_no, tuan_id } };
      this.cancelOrderFunc({
        params,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.getOrderDetail();
          }
        },
        showLoading: true
      });
    },
    // 签约订单操作弹窗
    signOrder(status) {
      if (status) {
        const order_no = this.orderDetailData.order_info[0].order_no,
          tuan_id = this.$route.params.parent_id;
        let params = { data: { order_no, tuan_id } };
        this.signOrderContractFunc({
          params,
          success: res => {
            const { code, data, msg } = res.data;
            if (code != 0) {
              this.$message({
                message: msg,
                type: 'error'
              });
            } else {
              this.signOrderdialogVisible = true;
            }
          },
          showLoading: true
        });
      } else {
        this.signOrderdialogVisible = false;
      }
    },
    signOrderSubmit() {
      if (this.signOrderRadio == 1) {
        const order_no = this.orderDetailData.order_info[0].order_no,
          tuan_id = this.$route.params.parent_id;
        let params = { data: { order_no, tuan_id } };
        this.createElectronicContractFunc({
          params,
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.signOrderdialogVisible = false;
              this.getOrderDetail();
            }
          },
          showLoading: true
        });
      } else {
        this.$router.push(this.uploadPagerContractUrl);
      }
    },
    // 下载电子合同
    dlDzht() {
      const order_no = this.orderDetailData.order_info[0].order_no,
        tuan_id = this.$route.params.parent_id;
      let params = { data: { order_no, tuan_id } };
      this.dlElectronicContractFunc({
        params,
        success: res => {
          if(res.data.code == 0){
            window.location.href = res.data.data.path;
          }else {
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      });
    },
    distrGenerateDownloadContract() {
      const order_no = this.orderDetailData.order_info[0].order_no,
        tuan_id = this.$route.params.parent_id;
      let params = { data: { order_no, tuan_id } };
      this.distrGenerateDownloadContractFunc({
        params,
        success: res => {
          if(res.data.code == 0){
            window.location.href = res.data.data.path;
          }else {
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      });
    },
    // 确认订单操作弹窗
    affirmOrder(orgId) {
      this.distributor_org_id = orgId;

      this.$confirm('订单确认后将生成确认件，确定要确认该订单？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.affirmOrderSubmit();
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },
    affirmOrderSubmit(agree_confirm_protocal) {
      const order_no = this.orderDetailData.order_info[0].order_no;
      const tuan_id = this.$route.params.parent_id;
      const h = this.$createElement;
      let params = { data: { order_no, tuan_id, agree_confirm_protocal } };

      if(agree_confirm_protocal && !this.kxdjeDialog.checked){
        return this.$message({
          message: '请同意默认规则',
          type: 'error'
        });
      }
      this.saleConfirmOrderFunc({
        params,
        success: res => {
          // 确认订单返回异常错误
          if (res.data.code >= 40002) {
            this.kxdjeDialog.visible = true;
            this.kxdjeDialog.checked = false;
            this.kxdjeDialog.code = res.data.code;
            this.kxdjeDialog.msg = res.data.msg;

            return;
          }

          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.getOrderDetail();
            this.kxdjeDialog.visible = false;
          }
        },
        showLoading: true
      });
    },
    // 申请退团操作弹窗
    exitOrder(status) {
      if (status) {
        const order_no = this.orderDetailData.order_info[0].order_no;
        const tuan_id = this.$route.params.parent_id;
        let params = { data: { order_no, tuan_id } };

        this.cancelTuanTouristFunc({
          params,
          success: res => {
            const { code, data, msg } = res.data;
            if (code != 0) {
              this.$message({
                message: msg,
                type: 'error'
              });
            } else {
              this.exitOrderdialogVisible = true;
              data.forEach(item => {
                item.priceStr = item.detail.map(it=>it.item_name).join('+');
              })
              this.exitOrderReList = data;
            }
          },
          showLoading: true
        });
      } else {
        this.exitOrderdialogVisible = false;
      }
    },
    exitOrderSubmit() {
      if (this.exitOrderSubData.remark.length > 200) {
        this.$message({
          message: '退团说明不能超过200个字符！',
          type: 'error'
        });
        return false;
      }
      this.exitOrderSubData.order_no = this.orderDetailData.order_info[0].order_no;
      this.exitOrderSubData.tuan_id = this.$route.params.parent_id;
      // this.exitOrderSubData.type_ids = [];
      // this.exitOrderSubData.type_ids_name = [];
      // this.exitOrderSubData.num = [];
      // this.exitOrderMSelection1.forEach(v => {
      //   this.exitOrderSubData.type_ids.push(v.id);
      //   this.exitOrderSubData.type_ids_name.push(v.type_ids_name);
      //   this.exitOrderSubData.num.push(v.num);
      // });
      this.exitOrderSubData.tourist_ids = this.exitOrderMSelection2.map(v => v.id);

      let params = { data: this.exitOrderSubData };
      this.doCancelTuanTouristFunc({
        params,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.exitOrderdialogVisible = false;
            this.exitOrderSubData.remark = '';
            this.getOrderDetail();
            if (this.tuituanDetailPerm) {
              this.$router.push({
                path: this.tuituanDetailUrl,
                query: { ono: this.orderInfo.order_no, tid: this.tuanId }
              });
            }
          }
        },
        showLoading: true
      });
    },
    // handleSelecChangeExitOrderType(val) {
    //   this.exitOrderMSelection1 = val;
    // },
    handleSelecChangeExitOrder(val) {
      this.exitOrderMSelection2 = val;
    },
    // 确认位置操作弹窗
    affirmSeat(status) {
      if (status) {
        this.affirmSeatdialogVisible = true;
      } else {
        this.affirmSeatdialogVisible = false;
      }
    },
    affirmSeatSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.affirmSeatObj.order_no = this.orderDetailData.order_info[0].order_no;
          let params = { data: this.affirmSeatObj };
          operatorConfirmSeat({
            params,
            success: res => {
              this.$message({
                message: res.data.msg,
                type: res.data.code == '0' ? 'success' : 'error'
              });
              if (res.data.code == '0') {
                this.affirmSeatdialogVisible = false;
                this.getOrderDetail();
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
    // 下达出团通知书操作弹窗
    xdAdnote(status) {
      if (status) {
        this.xdAdnoteDialogVisible = true;
      } else {
        this.xdAdnoteDialogVisible = false;
      }
    },
    xdAdnoteSubmit() {},
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
      if (response.code == '0') {
        this.xdAdnoteDialogVisible = false;
        this.getOrderDetail();
      }
    },
    beforeUpload2(file) {
      this.loading = true;
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading = false;
        return false;
      }
      return isLt2M;
    },
    bz() {
      this.$alert(this.bzTxt, '备注', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
    },
    // 上传签证材料操作弹窗
    upqzcl(status, type) {
      if (type) {
        this.upqzclTitle = type == 'new' ? '上传签证材料' : '补充上传签证材料';
        this.upqzclOption = type == 'new' ? '1' : '2';
      }
      if (status) {
        this.upqzclDialogVisible = true;
      } else {
        this.upqzclDialogVisible = false;
      }
    },
    upqzclSubmit() {
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
            this.getOrderDetail();
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
      if (response.code == 0) {
        if (this.upqzclUpload.length == 10) {
          this.$message.error('上传签证证数量不能超过10份');
        } else {
          this.upqzclUpload.push({
            addtime: response.data.addtime,
            name: response.data.name,
            path: response.data.path
          });
        }
      } else {
        this.$message.error(response.msg);
      }
      this.loading = false;
    },
    beforeUpload3(file) {
      this.loading = true;
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading = false;
        return false;
      }
      return isLt2M;
    },
    diyRemove3(id) {
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
      // console.log(params)
      // return false
      createOrderQrcode({
        params,
        success: res => {
          let request = res.data;
          if (request.code === 0) {
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
      if (checked) {
        for (let key in this.codeCon.base) {
          this.codeCon.base[key] = '1';
        }
      } else {
        for (let key in this.codeCon.base) {
          this.codeCon.base[key] = '0';
        }
      }
    },
    handleCheckedCitiesChange(event) {
      let checked = event.target.checked;
      let sum = 0;
      if (checked) {
        for (let key in this.codeCon.base) {
          if (this.codeCon.base[key] == '1') {
            sum = sum + 1;
          }
        }
      }
      if (sum === 8) {
        this.baseAll = true;
      } else {
        this.baseAll = false;
      }
    },
    handleSetOnlinePay(type){
      if(type == 'show'){
        this.setOnlinePayDialog.show = true;
        this.setOnlinePayDialog.amount = this.orderInfo.preset_payment_amount || this.orderInfo.rmb_out_total_amount;
      }else{
        if(this.setOnlinePayDialog.amount === ''){
          this.$message.error('请输入设置金额！');
          return false;
        }
        if(this.setOnlinePayDialog.amount < this.orderInfo.rmb_total_amount){
          this.$message.error('不可低于与同行的结算价！');
          return false;
        }
        setPaymentAmount({
          params: {
            data: { 
              order_no: this.orderInfo.order_no, 
              preset_payment_amount: this.setOnlinePayDialog.amount
            }
          },
          success: res => {
            let request = res.data;
            if (request.code === 0) {
              this.setOnlinePayDialog.show = false;
              this.getOrderDetail()
            } else {
              this.$message({
                type: 'error',
                message: request.msg
              });
            }
          },
          showLoading: true
        });
      }
    },
    handleLoadPayFinish(val){
      if(this.$refs.onlinePay && this.$refs.onlinePay.pay()){
        OnlinePay.showFinishConfirm.call(this).then(()=>{
          this.getOrderDetail();
        }).catch((e)=>{
          console.log('cancel: ', e);
        })
      }
    },
    goto(path, query) {
      this.$router.push({
        path: path,
        query: query
      });
    },
    reGenerateContract () {
      let params = {
        data: {
          order_no: this.orderInfo.order_no
        }
      }
      reGenerateContract({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.getOrderDetail();
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    }
  }
};
</script>


<style scoped lang="scss">
.cont {
  padding: 20px;
  background-color: #fff;
}
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
.que-icon{
  border-radius: 10px;
  border: 1px solid #aaa;
  padding: 0 4px;
  color: #aaa;
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
</style>
