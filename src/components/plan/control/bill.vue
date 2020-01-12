<template>
  <div class="bill-wrap">
    <div class="bill-top-wrap">
      <el-button type="primary" @click="lockDialog = true" v-if="data.tuan_info.lock_status === 1 && data.tuan_info.lock_fund !== 1">锁账生成团账</el-button>
      <el-button type="primary" @click="canUpdatebill" v-if="data.tuan_info.lock_status === 1 && data.tuan_info.lock_fund === 1 &&  $route.meta.topMenuConst === 'operator'">申请调账</el-button>
    </div>
    <div class="bill-con">
      <div class="bill-con-tip" :class="data.tuan_info.lock_fund === 1 ? 'lock' : ''"></div>
      <div class="bill-con-tip-text">{{data.tuan_info.lock_fund === 1 ? '已锁' : '未锁'}}</div>
      <h2 class="bill-con-tit">团队账单</h2>
      <div v-if="data.tuan_info.type !== 4" class="clearfix bill-con-info">
        <div class="bill-con-box left-box">
          <div class="bill-con-inner">
            <h3 class="ellipsis" :title="data.tuan_info.item_no">{{data.tuan_info.item_no}}</h3>
            <div class="bill-con-col">
              <div class="bill-con-item">
                <div class="bill-con-item-tit">团应收</div>
                <div class="bill-con-item-info color-orange">￥{{data.total_income_amount}}</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">团应付</div>
                <div class="bill-con-item-info color-orange">￥{{data.total_cost_amount}}</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">人均毛利</div>
                <div class="bill-con-item-info">{{data.people_profit}}</div>
              </div>
            </div>
            <div class="bill-con-col">
              <div class="bill-con-item">
                <div class="bill-con-item-tit">毛利率</div>
                <div class="bill-con-item-info color-orange">{{data.profit_rate}}</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">单团毛利</div>
                <div class="bill-con-item-info">{{data.tuan_profit}}</div>
              </div>
            </div>
            <div class="bill-con-col" v-if="data.tuan_info.lock_fund_date != '0000-00-00'">
              <div class="bill-con-item long-item">
                <div class="bill-con-item-tit">账单生成时间</div>
                <div class="bill-con-item-info">{{data.tuan_info.lock_fund_date}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bill-con-box right-box">
          <div class="bill-con-inner">
            <h3 class="ellipsis" :title="data.tuan_info.tuan_name">{{data.tuan_info.tuan_name}}</h3>
            <div class="bill-con-col">
              <div class="bill-con-item">
                <div class="bill-con-item-tit">行程天数</div>
                <div class="bill-con-item-info">{{data.tuan_info.trip_days}}天</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">出发地</div>
                <div class="bill-con-item-info ellipsis" :title="data.tuan_info.departure_city">{{data.tuan_info.departure_city}}</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">出发日期</div>
                <div class="bill-con-item-info">{{data.tuan_info.departure_date}}</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">计调负责人</div>
                <div class="bill-con-item-info">{{data.tuan_info.op_name}}</div>
              </div>
            </div>
            <div class="bill-con-col">
              <div class="bill-con-item">
                <div class="bill-con-item-tit">行程编号</div>
                <div v-if="data.tuan_info.product_no" class="bill-con-item-info ellipsis" :title="data.tuan_info.product_no">{{data.tuan_info.product_no}}</div>
                <div v-else class="bill-con-item-info">无</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">团队编号</div>
                <div class="bill-con-item-info ellipsis" :title="data.tuan_info.tuan_no">{{data.tuan_info.tuan_no}}</div>
              </div>
              <div class="bill-con-item">
                <div class="bill-con-item-tit">总收客</div>
                <div class="bill-con-item-info">成人 {{ data.tuan_info.adult_nums }} 儿童 {{ data.tuan_info.child_nums }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="applicationAccount" class="applictionAccount-btn-wrap">
        <el-button type="default" @click="applicationAccount = false">取消</el-button>
        <el-button type="primary" @click="applicationAction">填写调账申请</el-button>
      </div>
      <div :class="applicationAccount ? 'applictionAccount-wrap' : ''">
        <div class="bill-table-wrap">
          <div class="bill-table-tit">
            收入明细
            <el-button class="right-btn" @click="uploadDoc('income')">导出收入结算表</el-button>
          </div>
          <div v-show="applicationAccount && income_info.length > 0">
            <el-checkbox @input="handleCheckboxAllincome" v-model="allIncomeCheckbox" class="all-checkbox-wrap">全选</el-checkbox>
          </div>
          <div :class="incomeshow ? '' : 'hidetable'" v-show="!applicationAccount">
            <el-table
              :data="income_info"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="distributor_org_name"
                label="代理商／直客"
                header-align="center"
                align="left">
              </el-table-column>
              <el-table-column
                prop="rmb_total_amount"
                label="应收金额"
                header-align="center"
                align="right"
                width="80">
              </el-table-column>
              <el-table-column
                prop="rmb_receipted_amount"
                label="已收金额"
                header-align="center"
                align="right"
                width="80">
              </el-table-column>
              <el-table-column
                align="center"
                label="订单编号／应收ID"
                width="300">
                <template slot-scope="scope">
                  <div class="tc ellipsis" v-if="scope.row.order_no != '--'">
                    <span class="bill-tag" :class="{primary: scope.row.order_from === 1, blue: scope.row.order_from === 2, deepblue: scope.row.order_from === 3}">{{scope.row.order_from_name ? scope.row.order_from_name : '直客'}}</span>{{scope.row.order_no}}
                  </div>
                  <div class="tc ellipsis" v-else-if="scope.row.item_no != ''">
                    <span class="bill-tag" :class="{primary: scope.row.order_from === 1, blue: scope.row.order_from === 2, deepblue: scope.row.order_from === 3}">{{scope.row.order_from_name ? scope.row.order_from_name : '直客'}}</span>{{scope.row.id}}
                  </div>
                  <div v-else>--</div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="80"
                label="操作">
                <template slot-scope="scope">
                  <router-link
                    :to="{ path: '/control/income-detail', query: {aid:data.tuan_info.a_id, bid:scope.row.id}}"
                    v-if="$menuPermission('api/tuan/op_income_info') && $route.meta.topMenuConst === 'operator'">
                    查看
                  </router-link>
                  <router-link
                    :to="{ path: '/sale/income-detail', query: {aid:data.tuan_info.a_id, bid:scope.row.id}}"
                    v-if="$menuPermission('api/tuan/sale_income_info') && $route.meta.topMenuConst === 'sale'">
                    查看
                  </router-link>
                  <router-link
                    :to="{ path: 'income-detail', query: {aid:data.tuan_info.a_id, bid:scope.row.id}}"
                    v-if="$menuPermission('api/finance/fin_income_info') && $route.meta.topMenuConst === 'finance'">
                    查看
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div @click="openIncomeshow" v-show="!applicationAccount && income_info.length > 5" class="showallbtn">
            {{incomeshow ? "隐藏更多" : '显示更多'}}
          </div>
          <el-table
            v-show="applicationAccount"
            :data="income_info"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              width="50"
              >
              <template slot-scope="scope">
                <!-- <el-checkbox 
                  @input="handleCheckboxIncome(scope, $event)"
                  v-model="scope.row.val"
                  :disabled="scope.row.is_adjustment === 1 
                          || scope.row.invoice_flag === 1 
                          || scope.row.invoice_flag === 2 
                          || scope.row.order_tourist_cancel === 1 
                          || scope.row.is_payment_detail === 1
                          || scope.row.is_manual === 2"></el-checkbox> -->
                <el-checkbox 
                  @input="handleCheckboxIncome(scope, $event)"
                  v-model="scope.row.val"
                  :disabled="scope.row.is_manual != 1"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="distributor_org_name"
              label="代理商／直客"
              header-align="center"
              align="left">
            </el-table-column>
            <el-table-column
              prop="rmb_total_amount"
              label="应收金额"
              header-align="center"
              align="right"
              width="80">
            </el-table-column>
            <el-table-column
              prop="rmb_receipted_amount"
              label="已收金额"
              header-align="center"
              align="right"
              width="80">
            </el-table-column>
            <el-table-column
              align="center"
              label="订单编号／应收ID"
              width="300">
              <template slot-scope="scope">
                <div class="tc ellipsis" v-if="scope.row.order_no != '--'">
                  <span class="bill-tag" :class="{primary: scope.row.order_from === 1, blue: scope.row.order_from === 2, deepblue: scope.row.order_from === 3}">{{scope.row.order_from_name ? scope.row.order_from_name : '直客'}}</span>{{scope.row.order_no}}
                </div>
                <div class="tc ellipsis" v-else-if="scope.row.item_no != ''">
                  <span class="bill-tag" :class="{primary: scope.row.order_from === 1, blue: scope.row.order_from === 2, deepblue: scope.row.order_from === 3}">{{scope.row.order_from_name ? scope.row.order_from_name : '直客'}}</span>{{scope.row.id}}
                </div>
                <div v-else>--</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              label="操作">
              <template slot-scope="scope">
                <router-link
                  :to="{ path: '/control/income-detail', query: {aid:data.tuan_info.a_id, bid:scope.row.id}}"
                  v-if="$menuPermission('api/tuan/op_income_info') && $route.meta.topMenuConst === 'operator'">
                  查看
                </router-link>
                <router-link
                  :to="{ path: '/sale/income-detail', query: {aid:data.tuan_info.a_id, bid:scope.row.id}}"
                  v-if="$menuPermission('api/tuan/sale_income_info') && $route.meta.topMenuConst === 'sale'">
                  查看
                </router-link>
                <router-link
                  :to="{ path: 'income-detail', query: {aid:data.tuan_info.a_id, bid:scope.row.id}}"
                  v-if="$menuPermission('api/finance/fin_income_info') && $route.meta.topMenuConst === 'finance'">
                  查看
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="bill-table-wrap">
          <div class="bill-table-tit">
            成本明细
            <el-button class="right-btn" @click="uploadDoc('cost')">导出成本结算表</el-button>
          </div>
          <div v-show="applicationAccount && cost_info.length > 0">
            <el-checkbox @input="handleCheckboxAllCost" v-model="allCostCheckbox" class="all-checkbox-wrap">全选</el-checkbox>
          </div>
          <div  :class="costshow ? '' : 'hidetable'" v-show="!applicationAccount">
            <el-table
              :data="cost_info"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="supplier_org_name"
                header-align="center"
                align="left"
                label="供应商">
              </el-table-column>
              <el-table-column
                prop="rmb_total_amount"
                header-align="center"
                align="right"
                label="应付金额"
                width="80">
              </el-table-column>
              <el-table-column
                prop="rmb_payed_amount"
                header-align="center"
                align="right"
                label="已付金额"
                width="80">
              </el-table-column>
              <el-table-column
                prop="item_type_name"
                align="center"
                label="项目类型"
                width="150">
              </el-table-column>
              <el-table-column
                prop="item_name"
                align="center"
                label="项目名称"
                width="150">
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="80">
                <template slot-scope="scope">
                  <router-link
                    :to="{ path: '/control/cost/detail', query: {aid:data.tuan_info.a_id, id:scope.row.id}}"
                    v-if="$menuPermission('api/tuan/bill_pay_detail') && $route.meta.topMenuConst === 'operator'">
                    查看
                  </router-link>
                  <router-link
                    :to="{ path: '/sale/cost-detail', query: {aid:data.tuan_info.a_id, id:scope.row.id}}"
                    v-if="$menuPermission('api/tuan/sale_bill_pay_detail') && $route.meta.topMenuConst === 'sale'">
                    查看
                  </router-link>
                  <router-link
                    :to="{ path: 'cost-detail', query: {aid:data.tuan_info.a_id, id:scope.row.id}}"
                    v-if="$menuPermission('api/tuan/finance_bill_pay_detail') && $route.meta.topMenuConst === 'finance'">
                    查看
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div @click="openCostshow" v-show="!applicationAccount && cost_info.length > 5" class="showallbtn">
            {{costshow ? "隐藏更多" : '显示更多'}}
          </div>
          <el-table
            v-show="applicationAccount"
            :data="cost_info"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              width="50"
              >
              <template slot-scope="scope">
                <!-- <el-checkbox
                  @input="handleCheckboxCost(scope, $event)"
                  v-model="scope.row.val"
                  :disabled="scope.row.is_adjustment === 1
                          || scope.row.invoice_flag === 1 
                          || scope.row.invoice_flag === 2 
                          || scope.row.order_tourist_cancel === 1 
                          || scope.row.is_payment_detail === 1
                          || scope.row.is_manual === 2"></el-checkbox> -->
                <el-checkbox
                @input="handleCheckboxCost(scope, $event)"
                v-model="scope.row.val"
                :disabled="scope.row.is_manual != 1"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="supplier_org_name"
              header-align="center"
              align="left"
              label="供应商">
            </el-table-column>
            <el-table-column
              prop="rmb_total_amount"
              header-align="center"
              align="right"
              label="应付金额"
              width="80">
            </el-table-column>
            <el-table-column
              prop="rmb_payed_amount"
              header-align="center"
              align="right"
              label="已付金额"
              width="80">
            </el-table-column>
            <el-table-column
              prop="item_type_name"
              align="center"
              label="项目类型"
              width="150">
            </el-table-column>
            <el-table-column
              prop="item_name"
              align="center"
              label="项目名称"
              width="150">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <router-link
                  :to="{ path: '/control/cost/detail', query: {aid:data.tuan_info.a_id, id:scope.row.id}}"
                  v-if="$menuPermission('api/tuan/bill_pay_detail') && $route.meta.topMenuConst === 'operator'">
                  查看
                </router-link>
                <router-link
                  :to="{ path: '/sale/cost-detail', query: {aid:data.tuan_info.a_id, id:scope.row.id}}"
                  v-if="$menuPermission('api/tuan/sale_bill_pay_detail') && $route.meta.topMenuConst === 'sale'">
                  查看
                </router-link>
                <router-link
                  :to="{ path: 'cost-detail', query: {aid:data.tuan_info.a_id, id:scope.row.id}}"
                  v-if="$menuPermission('api/tuan/finance_bill_pay_detail') && $route.meta.topMenuConst === 'finance'">
                  查看
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bill-table-wrap">
        <div class="bill-table-tit">
          调账记录
        </div>
        <el-table
          :data="adjuestment_log"
          border
          style="width: 100%">
          <!-- <el-table-column
            prop="op_type"
            label="操作类型"
            align="center"
            width="180">
          </el-table-column> -->
          <!-- <el-table-column
            prop="op_content"
            label="操作内容"
            align="center">
          </el-table-column> -->
          <el-table-column
            prop="item_no"
            label="申请单"
            align="center">
          </el-table-column>
          <el-table-column
            prop="op_name"
            align="center"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="status_str"
            label="申请单状态"
            align="center">
          </el-table-column>
          <el-table-column
            prop="create_time"
            align="center"
            label="操作时间"
            width="200">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.id || scope.row.approval_id">
                <router-link v-if="scope.row.id && $route.meta.topMenuConst === 'finance'" :to="{path: 'adjustment-detail', query: {id: scope.row.id, type: 2}}">查看调整</router-link>
                <router-link v-else-if="scope.row.id && $route.meta.topMenuConst === 'sale'" :to="{path: '/sale/adjustment-detail', query: {id: scope.row.id, type: 2}}">查看调整</router-link>
                <router-link v-else-if="scope.row.id && $route.meta.topMenuConst === 'operator'" :to="{path: '/control/adjustment-detail', query: {id: scope.row.id, type: 2}}">查看调整</router-link>
                <router-link v-if="scope.row.approval_id && $route.meta.topMenuConst === 'finance'" :to="{path: 'finace-approval-detail', query: {id: scope.row.approval_id}}">审批单</router-link>
                <router-link v-else-if="scope.row.approval_id && $route.meta.topMenuConst === 'sale'" :to="{path: '/sale/sale-approval-detail', query: {id: scope.row.approval_id}}">审批单</router-link>
                <router-link v-else-if="scope.row.approval_id && $route.meta.topMenuConst === 'operator'" :to="{path: '/control/control-approval-detail', query: {id: scope.row.approval_id}}">审批单</router-link>
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bill-table-wrap">
        <div class="bill-table-tit">
          团账更新记录
        </div>
        <el-table
          :data="adjustment_update"
          border
          style="width: 100%">
          <el-table-column
            prop="type_str"
            label="更新类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="remark"
            align="center"
            label="更新原因">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="更新时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="content"
            align="center"
            label="内容"
            width="200">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="锁账生成团账" :visible.sync="lockDialog">
      <span>确认锁账生成团账？</span>
      <span slot="footer">
        <el-button @click="lockDialog = false">取 消</el-button>
        <el-button type="primary" @click="financeLockAction">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getGroupBillDetail, getSaleGroupBillDetail, tuanExportIncomeWord, tuanExportCostWord, financeLockAction} from 'src/api/api';

export default {
  data() {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      data: {
        tuan_info: {
          lock_fund: 0
        }
      },
      income_info: [],
      cost_info: [],
      adjuestment_log: [],
      adjustment_update: [],
      lockDialog: false,
      applicationAccount: false,
      allIncomeCheckbox: false,
      allCostCheckbox: false,
      incomeshow: false,
      costshow: false
    }
  },
  methods: {
    getGroupBillDetail() {
      let params = {
        data: {
          id: this.id,
          data_config_type: this.$route.query.type
        }
      };
      let billDetail = getGroupBillDetail
      if (this.$route.meta.isSale) {
        billDetail = getSaleGroupBillDetail
      };
      billDetail({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.data = result.data;
            let incomeInfoArr = [];
            if (result.data.income_info.length > 0) {
              result.data.income_info.forEach((item, index) => {
                result.data.income_info[index].lists.forEach((itm, idx) => {
                  itm.distributor_org_name = result.data.income_info[index].distributor_org_name;
                  this.$set(itm, 'val', false);
                  incomeInfoArr.push(itm);
                });
              });
            };
            this.income_info = incomeInfoArr;
            let costInfoArr = [];
            if (result.data.cost_info.length > 0) {
              result.data.cost_info.forEach((item, index) => {
                result.data.cost_info[index].lists.forEach((itm, idx) => {
                  itm.supplier_org_name = result.data.cost_info[index].supplier_org_name;
                  this.$set(itm, 'val', false);
                  costInfoArr.push(itm)
                });
              });
            };
            this.cost_info = costInfoArr;
            this.adjuestment_log = result.data.adjuestment_log;
            this.adjustment_update = result.data.adjustment_update
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    uploadDoc(type) {
      let params = {
        data: {
          id: this.id
        }
      }
      if(type == 'income'){
        tuanExportIncomeWord({
          params: params,
          success: (params) => {
            if(params.data.code == 0){
              window.location.href = params.data.data.url
            }else{
              this.$message({
                message: params.data.msg,
                type: 'error'
              });
            }
          }
        });
      }else if(type == 'cost'){
        tuanExportCostWord({
          params: params,
          success: (params) => {
            if(params.data.code == 0){
              window.location.href = params.data.data.url
            }else{
              this.$message({
                message: params.data.msg,
                type: 'error'
              });
            }
          }
        });
      }
    },
    financeLockAction() {
      let params = {
        data: {
          id: this.id
        }
      };
      financeLockAction({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.lockDialog = false;
            this.getGroupBillDetail();
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          };
        },
        showLoading: true
      })
    },
    applicationAction() {
      let bill_ids = '';
      if (this.income_info.length > 0) {
        this.income_info.forEach((item, index) => {
          if (item.val) {
            bill_ids = bill_ids + `${item.id},`
          };
        });
      };
      if (this.cost_info.length > 0) {
        this.cost_info.forEach((item, index) => {
          if (item.val) {
            bill_ids = bill_ids + `${item.id},`
          };
        });
      };
      bill_ids = bill_ids.substring(0, bill_ids.length - 1);
      // if (bill_ids.length === 0) {
      //   this.$message({
      //     type: 'error',
      //     message: '请选择需要调账的收入/成本明细'
      //   });
      //   return false;
      // };
      if (this.$route.meta.topMenuConst === 'operator') {
        this.$router.push({
          path: '/control/billIncomeCostUpdate',
          query: {
            tuan_id: this.id,
            bill_ids
          }
        })
      }
    },
    handleCheckboxIncome (scope, val) {
      this.income_info[scope.$index].val = val;
      if (val) {
        let canSel = 0;
        let sel = 0;
        this.income_info.forEach((item, index) => {
          // if (!(item.is_adjustment === 1 || item.invoice_flag === 1 || item.invoice_flag === 2 || item.order_tourist_cancel === 1 || item.is_payment_detail === 1)) {
          if (item.is_manual === 1) {
            canSel = canSel + 1;
          };
          if (item.val) {
            sel = sel + 1;
          };
        })
        if (sel === canSel) {
          this.allIncomeCheckbox = true;
        }
      } else {
        this.allIncomeCheckbox = false;
      }
    },
    handleCheckboxCost (scope, val) {
      this.cost_info[scope.$index].val = val;
      if (val) {
        let canSel = 0;
        let sel = 0;
        this.cost_info.forEach((item, index) => {
          // if (!(item.is_adjustment === 1 || item.invoice_flag === 1 || item.invoice_flag === 2 || item.order_tourist_cancel === 1 || item.is_payment_detail === 1)) {
          if (item.is_manual === 1) {
            canSel = canSel + 1;
          };
          if (item.val) {
            sel = sel + 1;
          };
        })
        if (sel === canSel) {
          this.allCostCheckbox = true;
        }
      } else {
        this.allCostCheckbox = false;
      }
    },
    handleCheckboxAllincome(val) {
      if (this.income_info.length > 0) {
        this.income_info.forEach((item, index) => {
          // if (!(item.is_adjustment === 1 || item.invoice_flag === 1 || item.invoice_flag === 2 || item.order_tourist_cancel === 1 || item.is_payment_detail === 1)) {
          if (item.is_manual === 1) {
            this.income_info[index].val = val
          }
        });
      }
    },
    handleCheckboxAllCost(val) {
      if (this.cost_info.length > 0) {
        this.cost_info.forEach((item, index) => {
          // if (!(item.is_adjustment === 1 || item.invoice_flag === 1 || item.invoice_flag === 2 || item.order_tourist_cancel === 1 || item.is_payment_detail === 1)) {
          if (item.is_manual === 1) {
            this.cost_info[index].val = val;
          }
        });
      }
    },
    openIncomeshow () {
      this.incomeshow = !this.incomeshow;
    },
    openCostshow () {
      this.costshow = !this.costshow;
    },
    canUpdatebill() {
      if (this.data.tuan_info.is_adjustment === 1) {
        this.$message({
          type: 'error',
          message: '当前已有审核中的调账申请单，请审核完后再申请调账'
        });
      } else {
        this.applicationAccount = true;
      }
    }
  },
  mounted() {
    this.getGroupBillDetail()
  },
}
</script>
<style lang="less" scoped>
  .bill-wrap {
    background-color: #fff;
    padding: 15px;
    .bill-top-wrap {
      text-align: right;
      padding: 0 0 10px;
    }
    .bill-con {
      position: relative;
      box-shadow: 0px 0px 5px 3px #f5f5f5;
      padding: 30px 25px;
      .bill-con-tit {
        font-size: 20px;
        color: #333333;
        text-align: center;
      }
      .bill-con-tip {
        position: absolute;
        top: 0;
        left: 0;
        width: 0px;
        height: 0px;
        border-top: 30px solid #019f3d;
        border-left: 30px solid #019f3d;
        border-bottom: 30px solid transparent;
        border-right: 30px solid transparent;
        z-index: 1;
        &.lock {
          border-top: 30px solid #b10c79;
          border-left: 30px solid #b10c79;
          border-bottom: 30px solid transparent;
          border-right: 30px solid transparent;
        }
      }
      .bill-con-tip-text {
        position: absolute;
        top: 10px;
        left: 5px;
        font-size: 14px;
        color: #fff;
        transform: rotate(-45deg);
        z-index: 2;
      }
      .bill-con-info {
        padding: 20px 0 0;
        .bill-con-box {
          float: left;
          width: 50%;
          box-sizing: border-box;
          &.left-box {
            padding-right: 10px;
          }
          &.right-box {
            padding-left: 10px;
          }
          .bill-con-inner {
            border: 1px dashed #cccccc;
            padding: 15px 20px;
            height: 154px;
            font-size: 0px;
            h3 {
              font-size: 14px;
              color: #333333;
              line-height: 20px;
              padding: 0 0 10px;
            }
          }
          .bill-con-col {
            display: inline-block;
            width: 50%;
            vertical-align: top;
          }
          .bill-con-item {
            position: relative;
            padding: 0 0 10px 80px;
            &.long-item {
              padding: 0 0 10px 100px;
            }
            .bill-con-item-tit {
              position: absolute;
              top: 0px;
              left: 0px;
              color: #999999;
              font-size: 14px;
              line-height: 22px;
            }
            .bill-con-item-info {
              font-size: 14px;
              color: #333333;
              line-height: 22px;
            }
          }
        }
      }
    }
    .bill-table-wrap {
      .tc {
        text-align: center;
      }
      .bill-tag {
        display: inline-block;
        font-size: 12px;
        padding: 3px 4px 3px;
        border-radius: 2px;
        color: #fff;
        line-height: 12px;
        margin: 0 5px 0 0;
        &.primary {
          background-color: #e33dbe;
        }
        &.blue {
          background-color: #7471f9;
        }
        &.deepblue {
          background-color: #1ea7d3;
        }
      }
    }
    .all-checkbox-wrap {
      padding: 15px 0;
    }
    .bill-table-tit {
      border-left: 5px solid #b10c79;
      margin: 30px 0 20px;
      padding: 0px 0 0px 15px;
      color: #b10c79;
      font-size: 20px;
    }
    .applictionAccount-wrap {
      border: 1px solid #b10c79;
      padding: 5px;
    }
    .applictionAccount-btn-wrap {
      text-align: right;
      padding: 15px 0;
    }
    .right-btn {
      float: right;
      width: 120px;
      padding: 0 10px;
    }
    .hidetable {
      overflow: hidden;
      max-height: 325px;
    }
    .showallbtn {
      padding: 10px 0;
      text-align: center;
      color: #b10c79;
      cursor: pointer;
    }
  }
</style>
