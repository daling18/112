<!--
已被 dev/src/components/sale/IncomeDetail.vue 替换，目测没有再使用了
-->

<template>
  <div class="recieve-detail">
    <div class="recieve-info">
      <h2 class="recieve-tit">应收</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">应收金额</span>
          <span class="content-right light">{{ info.rmb_total_amount }}</span>
        </div>
        <div class="content-box" v-if="info.adjustment_detail && info.adjustment_detail.length > 0">
          <span class="content-label">调账申请</span>
          <div v-if="info.adjustment_detail && info.adjustment_detail.length > 0">
            <div class="content-right" v-if="$route.meta.topMenuConst === 'operator' && $menuPermission('api/tuan/adjustment_detail')">
              <router-link v-for="(item, index) in info.adjustment_detail" :to="{path: '/control/ControlAdjustmentDetail', query: {id: item.adjustment_id, type: 2}}" :key="index" class="link2">
                <span class="b-tip">{{item.item_no}}</span>[调前应收{{item.front_amount}}]<span class="b-tip">，</span>
              </router-link>
            </div>
            <div class="content-right" v-if="$route.meta.topMenuConst === 'sale' && $menuPermission('api/tuan/adjustment_detail')">
              <router-link v-for="(item, index) in info.adjustment_detail" :to="{path: '/sale/SaleAdjustmentDetail', query: {id: item.adjustment_id, type: 2}}" :key="index" class="link2">
                <span class="b-tip">{{item.item_no}}</span>[调前应收{{item.front_amount}}]<span class="b-tip">，</span>
              </router-link>
            </div>
            <div class="content-right" v-if="$route.meta.topMenuConst === 'finance' && $menuPermission('api/finance/adjustment_detail')">
              <router-link v-for="(item, index) in info.adjustment_detail" :to="{path: '/finace/financeAdjustmentDetail', query: {id: item.adjustment_id, type: 2}}" :key="index" class="link2">
                <span class="b-tip">{{item.item_no}}</span>[调前应收{{item.front_amount}}]<span class="b-tip">，</span>
              </router-link>
            </div>
          </div>
          <div class="content-right" v-else>--</div>
        </div>
        <template v-if="info.show_type == 1">
          <div class="content-box">
            <span class="content-label">团号</span>
            <span class="content-right">{{ info.tuan_no }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">应收单号</span>
            <span class="content-right">
              {{info.item_no}}
              <em :class="[info.settle_status == '已结清' ? 'tip2': 'tip']">[{{ info.settle_status }}]</em>
            </span>
          </div>
          <div class="content-box">
            <span class="content-label">直客/代理商</span>
            <span class="content-right">{{ info.distributor_org_name }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">项目名称</span>
            <span class="content-right">{{ info.item_name }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">收入类型</span>
            <span class="content-right">{{ info.bill_type_name }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">数量</span>
            <span class="content-right">{{ info.num }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">单价</span>
            <span class="content-right">
              {{ info.rmb_unit_price }}
              （{{info.currency}} / {{info.currency_rate}}）
            </span>
          </div>
          <div class="content-box">
            <span class="content-label">合计</span>
            <span class="content-right">{{ info.rmb_total_amount }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">备注说明</span>
            <span class="content-right">{{ info.remark ? info.remark : '无' }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">创建时间</span>
            <span class="content-right">{{ info.create_time }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">创建人</span>
            <span class="content-right">{{ info.user_name }}</span>
          </div>
          <!-- <div class="content-box">
            <span class="content-label">确认件</span>
            <span class="content-right" v-if="info.confirm_file && info.confirm_file.length === 0">--</span>
            <span class="content-rightimg" v-else>
              <div class="pic-wrap" v-for="(item, index) in info.confirm_file" :key="index">
                <div class="pic-top" :style='"background-image:url(" + item.url+ ")"'>
                  <a :href="item.url" class="big-btn" target="_blank"></a>
                </div>
                <div class="pic-bottom">
                  <a download :href="item.url">下载</a>
                </div>
              </div>
            </span>
          </div> -->
        </template>
        <template v-else>
          <div class="content-box">
            <span class="content-label">团号</span>
            <span class="content-right">{{ info.tuan_no }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">应收单号</span>
            <span class="content-right">
              {{info.item_no}}
              <em :class="[info.settle_status == '已结清' ? 'tip2': 'tip']">[{{ info.settle_status }}]</em>
            </span>
          </div>
          <div class="content-box">
            <span class="content-label">直客/代理商</span>
            <span class="content-right">{{ info.distributor_org_name }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">订单号</span>
            <span class="content-right">{{ info.order_no }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">订单金额</span>
            <span class="content-right">{{ info.rmb_total_amount }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">游客人数</span>
            <span class="content-right">{{ info.enrollment }}</span>
          </div>
          <div class="content-box">
            <template v-if="info.order_from == 3">
              <span class="content-label">合同</span>
              <span class="content-right" v-if="info.contract && info.contract.length === 0">--</span>
              <span class="content-rightimg" v-else>
                <!-- 生成电子合同的，这边单独展示下载电子合同 -->
                <template v-if="info.contract_type == 2">
                  <a class="link" :href="info.electronic_contract" target="_blank">下载电子合同</a>
                </template>
                <template v-else>
                  <div class="pic-wrap" v-for="(item, index) in info.contract" :key="index">
                    <div class="pic-top" :style='"background-image:url(" + item+ ")"'>
                      <a :href="item" class="big-btn" target="_blank"></a>
                    </div>
                    <div class="pic-bottom">
                      <a download :href="item.url">下载</a>
                    </div>
                  </div>
                </template>
              </span>
            </template>
            <template v-else-if="productConfirmPerm && info.order_id">
              <span class="content-label">确认件</span>
              <span class="content-right">
                <router-link
                  :to="{path: productConfirmPath, query: { parent_id:info.tuan_id, id:info.order_id }}"
                  class="link mr5"
                >查看</router-link>
                <a :href="dl" class="link">下载</a>
              </span>
            </template>
          </div>
        </template>
      </div>
      <template v-if="pDetailListStatus">
        <h2 class="recieve-tit">已收</h2>
        <div class="receive-money-wrap mtb clearfix">
          <div class="money-wrap">
            已收金额<span>{{ info.rmb_receipted_amount }}</span>
          </div>
          <el-select v-model="filters.payment_status"
            placeholder="请选择"
            class="sel ml30"
            @change="filtersChange()">
            <el-option label="全部状态" value="" />
            <el-option :key="i"
              v-for="(o,i) in pDetailAllData.payment_status"
              :label="o"
              :value="i" />
          </el-select>
          <el-select v-model="filters.user_type"
            placeholder="请选择"
            class="sel"
            @change="filtersChange()">
            <el-option label="全部类型" value="" />
            <el-option :key="i"
              v-for="(o,i) in pDetailAllData.user_type"
              :label="o"
              :value="i" />
          </el-select>
        </div>
        <div class="receive-money-wrap clearfix">
          <el-table
            :data="pDetailAllData.list"
            border
            style="width: 100%">
            <el-table-column
              label="收款ID"
              align="center"
              width="180">
              <template slot-scope="scope">
                <router-link v-if="proceedsDetailPerm" :to="{path: proceedsDetailPath, query: {id: scope.row.payment_id}}">{{scope.row.payment_id}}</router-link>
                <span v-else>{{scope.row.payment_id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="认款ID"
              align="center"
              width="220">
              <template slot-scope="scope">
                <span class="primary">[{{scope.row.user_type_name}}]</span>
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              hader-align="center"
              align="right"
              width="100"
              label="认款金额">
              <template slot-scope="scope">
                <div class="light pr5">
                  {{scope.row.rmb_total_amount}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="认款类型">
              <!-- 认款状态 1有效 2已撤销 3待核实 5核实不通过 6待核销 7核销通过 8核销不通过 -->
              <template slot-scope="scope">
                --
                <!-- <div class="col-green"
                  v-if="scope.row.payment_status == 1 || scope.row.payment_status == 6"
                >
                  {{scope.row.payment_status_name}}
                </div>
                <div class="col-whitegray"
                  v-if="scope.row.payment_status == 2 || scope.row.payment_status == 7"
                >
                  {{scope.row.payment_status_name}}
                </div>
                <div class=""
                  v-if="scope.row.payment_status == 3 || scope.row.payment_status == 8"
                >
                  {{scope.row.payment_status_name}}
                </div>
                <div class="col-red"
                  v-if="scope.row.payment_status == 5"
                >
                  {{scope.row.payment_status_name}}
                </div> -->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="认款状态">
              <!-- 认款状态 1有效 2已撤销 3待核实 5核实不通过 6待核销 7核销通过 8核销不通过 -->
              <template slot-scope="scope">
                <div class="col-green"
                  v-if="scope.row.payment_status == 1 || scope.row.payment_status == 6"
                >
                  {{scope.row.payment_status_name}}
                </div>
                <div class="col-whitegray"
                  v-if="scope.row.payment_status == 2 || scope.row.payment_status == 7"
                >
                  {{scope.row.payment_status_name}}
                </div>
                <div class=""
                  v-if="scope.row.payment_status == 3 || scope.row.payment_status == 8"
                >
                  {{scope.row.payment_status_name}}
                </div>
                <div class="col-red"
                  v-if="scope.row.payment_status == 5"
                >
                  {{scope.row.payment_status_name}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              align="center"
              width="100"
              label="认款日期">
            </el-table-column>
            <el-table-column
              prop="user_name"
              align="center"
              label="认款人">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit && scope.row.edit.length == 0">--</template>
                  <template v-else v-for="(o,i) in scope.row.edit">
                    <el-button type="text"
                      @click="editDialog(scope.row.id,o)"
                      style="height: 21px; line-height: 21px; text-align: center;"
                      :key="i">
                      {{pDetailAllData.edit_arr[o]}}
                      <!-- {{pDetailBtnName[ei-1]}} -->
                    </el-button>
                  </template>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
    <el-dialog :title="dialogForm.title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form>
        <!-- <template v-if="dialogForm.type==1">
          <el-form-item label="撤销说明" required>
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="提示" required>
            <span style="color:red;">撤销后该记录就无法恢复</span>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==2">
          <div v-for="data in cancel_record_data" class="record">
            <div>撤销人：{{data.user_name}}</div>
            <div>撤销时间：{{data.create_time}}</div>
            <div>撤销说明：{{data.info}}</div>
          </div>
        </template>  
        <template v-if="dialogForm.type==3||dialogForm.type==5">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==4">
          <div v-for="data in cancel_record_data" class="record">
            <div>{{data.cancel_type==3?"核销":"核实"}}时间：{{data.create_time}}</div>
            <div>{{data.cancel_type==3?"核销":"核实"}}状态：{{data.cancel_status_name}}</div>
            <div>操作人：{{data.user_name}}</div>
            <div>备注：{{data.info}}</div>
          </div>
        </template> 
        <template v-if="dialogForm.type==6">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==7" class="record">
          <div v-for="data in cancel_record_data">
            <div>{{data.cancel_type==3?"核销":"核实"}}时间：{{data.create_time}}</div>
            <div>{{data.cancel_type==3?"核销":"核实"}}状态：{{data.cancel_status_name}}</div>
            <div>操作人：{{data.user_name}}</div>
            <div>备注：{{data.info}}</div>
          </div>
        </template>  -->
        <template v-if="dialogForm.type == 0 || dialogForm.type == 7">
          <el-form-item label="撤销说明" required>
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
          <span class="color-red">注：撤销认款记录后将无法恢复</span>
        </template>
        <template v-else-if="dialogForm.type == 2 || dialogForm.type == 4 || dialogForm.type == 5">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
        </template>
        <template v-else>
          <template v-for="(data, idx) in dialogData">
            <div v-if="data.cancel_status == 1 || data.cancel_status == 6" :key="idx" class="record">
              <div>撤销人：{{ data.user_name }}</div>
              <div>撤销时间：{{ data.create_time }}</div>
              <div>撤销说明：{{ data.info }}</div>
            </div>
            <div v-else-if="data.cancel_status < 4" :key="idx" class="record">
              <div>核实时间：{{ data.create_time }}</div>
              <div>核实状态：{{ data.cancel_status_name }}</div>
              <div>操作人：{{ data.user_name }}</div>
              <div>备注：{{ data.info }}</div>
            </div>
            <div v-else :key="idx" class="record">
              <div>核销时间：{{ data.create_time }}</div>
              <div>核销状态：{{ data.cancel_status_name }}</div>
              <div>操作人：{{ data.user_name }}</div>
              <div>备注：{{ data.info }}</div>
            </div>
          </template> 
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <template v-if="dialogForm.type==1">
          <el-button type="primary" @click="sure(0)" :disabled="btn_disable">保存</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==3">
          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">核实通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==5">

          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">重新核实通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">重新核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==6">
          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">核销通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">核销不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==2||dialogForm.type==4||dialogForm.type==7">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </template>        -->
        <template v-if="dialogForm.type == 0">
          <el-button type="primary" @click="saleCancelRenkuan">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type == 7">
          <el-button type="primary" @click="paymentCancel">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type == 2">
          <el-button type="primary" @click="heshiRenkuan(1)">核实通过</el-button>
          <el-button type="primary" @click="heshiRenkuan(2)">核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type == 4">
          <el-button type="primary" @click="heshiRenkuan(1)">重新核实通过</el-button>
          <el-button type="primary" @click="heshiRenkuan(2)">重新核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type == 5">
          <el-button type="primary" @click="hexiaoRenkuan(1)">核销通过</el-button>
          <el-button type="primary" @click="hexiaoRenkuan(2)">核销不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-else>
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {finIncomeInfo, 
  saleIncomeInfo, 
  opIncomeInfo, 
  paymentDetailList,  
  // renkuanList , 
  // cancelRenkuan , 
  heshiRenkuan , 
  cancelRenkuanInfo,
  hexiaoRenkuan , 
  saleCancelRenkuan,
  saleCancelRenkuanInfo,
  paymentCancel
  } from 'src/api/api'
export default {
  data() {
    return {
      info: {},
      pDetailAllData: {},
      pDetailListStatus: true,
      pDetailBtnName:['撤销','查看撤销记录','核实','查看核实详情','重新核实','核销','查看核销详情','核销通过-撤销'],
      filters: {
        payment_status: '',
        user_type: ''
      },
      dialogVisible:false,
      dialogForm:{
        title: '',
        type:'',
        info:'',
        id:'',
        status: ''
      },
      btn_disable: false,
      dialogData: {}
    }
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    proceedsDetailPerm(){
      switch(this.topMenuConst){
        case 'sale':
          return this.$menuPermission('api/tuan/sale_get_gathering_info');
        case 'operator':
          return this.$menuPermission('api/tuan/comein_get_gathering_info');
        case 'finance':
          return this.$menuPermission('api/tuan/financial_get_gathering_info');

      }
    },
    proceedsDetailPath(){
      switch(this.topMenuConst){
        case 'sale':
          return '/sale/recieve-detail';
        case 'operator':
          return '/control/recieve-detail';
        case 'finance':
          return '/recieve-detail';

      }
    },
    productConfirmPerm(){
      switch(this.topMenuConst){
        case 'operator':
          return this.$menuPermission('api/tuan/order_confirm_template');
        case 'sale':
          return this.$menuPermission('api/tuan/sale_order_confirm_template');
        case 'finance':
          return this.$menuPermission('api/tuan/finance_order_confirm_template');

      }
    },
    productConfirmPath(){
      switch(this.topMenuConst){
        case 'sale':
          return '/sale/productConfirm';
        case 'operator':
          return '/order/productConfirm';
        case 'finance':
          return '/fin/productConfirm';

      }
    },
    dl() {
      switch(this.topMenuConst){
        case 'operator': 
          return "/bom/api/tuan/save_order_confirm_pdf?id=" + this.info.order_id;
        case 'sale': 
          return "/bom/api/tuan/sale_save_order_confirm_pdf?id=" + this.info.order_id;
        case 'finance': 
          return "/bom/api/tuan/finance_save_order_confirm_pdf?id=" + this.info.order_id;
      }
    },
    op() {
      // 当前登录用户类型(一级菜单) 1财务 2销售 3计调
      switch(this.topMenuConst){
      case 'operator': 
        return 3;
      case 'sale': 
        return 2;
      case 'finance': 
        return 1;
      default:
        return '';
      }
    },
    getIncomeInfoFunc(){
      switch(this.topMenuConst){
      case 'sale':
        return saleIncomeInfo;
      case 'operator':
        return opIncomeInfo;
      case 'finance':
        return finIncomeInfo;
      }
    },
  },
  methods: {
    init() {
       console.log(this.proceedsDetailPerm)
      let params = {
        data: {
          // 自动的新增的收入，需要oid来读取数据 （销售&财务绝对是自动）
          order_no: this.$route.query.oid,
          // 手动新增的收入，需要bid来读取数据 （计调添加收入是手动，其他是自动）
          bill_id: this.$route.query.bid
        }
      };
      this.getIncomeInfoFunc({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
            this.paymentDetailList();
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
            this.$router.go(-1);
          };
        },
        showLoading: true
      })
    },
    paymentDetailList(){
      let params = {
        data: {
          op_type: this.op,
          order_no: this.$route.query.oid,
          bill_id: this.$route.query.bid,
          payment_status: this.filters.payment_status,
          user_type: this.filters.user_type
        }
      };
      paymentDetailList({
        params,
        success: (res) => {
          let {code, data, msg} = res.data;
          if (code === 0) {
            this.pDetailAllData = data;
            if(data.list.length == 0 && this.filters.payment_status == '' && this.filters.user_type == ''){
              this.pDetailListStatus = false;
            }else{
              this.pDetailListStatus = true;

            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          };
        },
        showLoading: true
      })
    },
    // 过滤功能
    filtersChange(){
      this.paymentDetailList()
    },
    // 已收操作
    editDialog(id,type){
      this.dialogForm.title=this.pDetailAllData.edit_arr[type];
      this.dialogForm.info='';
      this.dialogForm.id=id;
      this.dialogForm.type=type;
      this.dialogVisible=true;
      switch(type){
        // 查看认款
        case '1':
          this.$router.push({
            path: '/sale/recognition/peer-record/detail',
            query: {
              id: this.dialogForm.id
            }
          });
          break;
        // 撤销认款
        case '2':
          this.saleCancelRenkuanInfo(id);
          break;
        // 重新发起
        case '3':
          this.heshiRenkuan();
          break;
      }
    },
    // editDialog(id,oType){
    //   let type = oType - 1;
    //   this.dialogForm.title=this.pDetailBtnName[type];
    //   this.dialogForm.info='';
    //   this.dialogForm.id=id;
    //   this.dialogForm.type=type;
    //   this.dialogVisible=true;
    //   //  console.log(this.dialogForm.type)
    //   // if(type==2||type==4||type==7){
    //   //   let r_type="";

    //   //   if(type==2){
    //   //     r_type=1;
    //   //   }else{
    //   //     r_type=2;
    //   //   }
    //   //   this.record(id,r_type);
    //   // }
    //   if (type === 0) {
    //     // this.saleCancelRenkuanInfo(id);
    //   };
    //   if (type === 1) {
    //     this.cancelRenkuanInfo(1);
    //   };
    //   if (type === 2 || type === 4) {
    //     // this.heshiRenkuan();
    //   };
    //   if (type === 3 || type === 6) {
    //     this.cancelRenkuanInfo(2);
    //   };
    //   if (type === 5) {
    //     // this.hexiaoRenkuan();
    //   };
    //   if (type === 7) {
    //     // this.paymentCancel();
    //   };
    // },
    saleCancelRenkuan() {
      if (this.dialogForm.info.length === 0) {
        this.$message({
          type: 'error',
          message: '填写撤销说明'
        });
        return
      };
      let params = {
        data: {
          id: this.dialogForm.id,
          info: this.dialogForm.info
        }
      };
      saleCancelRenkuan({
        params,
        success: (res) => {
          let reslute = res.data;
          if(reslute.code === 0) {
            this.$message({
              type: 'success',
              message: reslute.msg
            });
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: reslute.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true
      })
    },
    saleCancelRenkuanInfo() {
      let params = {
        data: {
          id: this.dialogForm.id
        }
      };
      saleCancelRenkuanInfo({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.dialogData = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true,
      })
    },
    heshiRenkuan(type) {
      let params = {
        data: {
          id: this.dialogForm.id,
          status: type,
          info: this.dialogForm.info
        }
      };
      heshiRenkuan({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.init();
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true
      })
    },
    cancelRenkuanInfo(type) {
      let params = {
        data: {
          id: this.dialogForm.id,
          type: type
        }
      };
      cancelRenkuanInfo({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.dialogData = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true
      })
    },
    hexiaoRenkuan(type) {
      let params = {
        data: {
          id: this.dialogForm.id,
          status: type,
          info: this.dialogForm.info
        }
      };
      hexiaoRenkuan({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.init();
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true,
      })
    },
    paymentCancel() {
      if (this.dialogForm.info.length === 0) {
        this.$message({
          type: 'error',
          message: '填写撤销说明'
        });
        return
      };
      let params = {
        data: {
          payment_id: this.dialogForm.id,
          info: this.dialogForm.info
        }
      };
      paymentCancel({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true,
      })
    },

    // 操作确认
    // sure(status){
    //   let api='';

    //   this.dialogForm.status=status;

    //   if(this.dialogForm.type==1){
    //     api=cancelRenkuan;
    //   }
    //   if(this.dialogForm.type==3||this.dialogForm.type==5){
    //     api=heshiRenkuan;
    //   }
    //   if(this.dialogForm.type==6){
    //     api=hexiaoRenkuan;
    //   }

    //   this.btn_disable=true;

    //   let params={
    //     data: this.dialogForm
    //   }
    //   api({
    //     params: params,
    //     success: (params) => {
    //       let data = params.data;
    //       this.loading = false;

    //       if (data.code == '0') {
    //         this.$message.success(data.msg);
    //         this.dialogVisible=false;
    //         this.getList();
    //       } else {
    //         this.$message.error(data.msg);

    //       }
    //       this.btn_disable=false;
    //     },
    //     showLoading: true
    //   });
    // },
    // record(id,type){
    //   let params={
    //     data:{
    //       id:id,
    //       type:type
    //     }
    //   },_this=this;

    //   cancelRenkuanInfo({
    //     params: params,
    //     success: (params) => {
    //       let data = params.data;

    //       if (data.code == '0') {
    //         this.dialogVisible=true;
    //         this.cancel_record_data=data.data;

    //       } else {
    //         this.$message.error(data.msg);
    //       }
    //     },
    //     showLoading: true
    //   });
    // }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="less" scoped>
.recieve-detail {
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
          padding: 0 20px 0 20px;
          .tip {
            color: #b10c79;
            font-style: normal;
            padding: 0 0 0 10px;
          }
          .tip2{
            color: #4ab93d;
            font-style: normal;
            padding: 0 0 0 10px;
          }
        }
        .content-rightimg {
          min-height: 30px;
          // font-size: 0;
          .link{
            color: #b10c79;
            margin-left: 20px;
            text-decoration: none;
          }
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
    .light{
      color: #ff6000!important;
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
    }
  }
  .primary {
    color: #b10c79;
  }
  .orange {
    color: #ff6000;
  }
}
.col-green{
  color: #4ab93d;
}
.col-whitegray{
  color: #999999;
}
.col-red{
  color: #fc1621;
}
.sel{
  width: 140px;
}
.ml30{
  margin-left: 30px;
}
.dialog-footer{text-align: center;}
.record{margin-bottom: 20px;}
.link{
  color: #b10c79;
  text-decoration: underline;
  &:hover{
    opacity: .8;
  }
}
.link2 {
  color: #b10c79;
  .b-tip {
    color: #000;
  }
}
</style>
