// src\components\distribution\TuituanDetail.vue
<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="system-tab">
        <ul class="tab-box">
          <router-link v-if="orderDetailPerm" :to="orderDetailUrl" tag="li">订单详情</router-link>
          <router-link class="on" to="" tag="li">退团/款单详情</router-link>
        </ul>
      </div>
      <div class="content-list">
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
                  <td>{{ item.refund_status_label || '--' }}</td>
                  <td><div class="cell">
                    <template v-if="isShowOrderOperate(item.edit) && topMenuConst !== 'kefuservice'">
                      <span v-for="(p,i2) in item.edit" :key="i2">
                        <span v-if="p == 1 && isShowOrderOperate(p)" class="span-btn" @click="dingsun(item,i)">
                          {{ item.edit_list[p] }}
                        </span>
                        <span v-if="p == 2 && isShowOrderOperate(p)" class="span-btn" @click="handleConfirm(item)">
                          {{ item.edit_list[p] }}
                        </span>
                        <span v-if="p == 3 && isShowOrderOperate(p)" class="span-btn" @click="handleCancel(item)">
                          {{ item.edit_list[p] }}
                        </span>
                        <router-link v-if="p == 4 && isShowOrderOperate(p)" class="span-btn" :to="'/approval/submit/detail?id=' + item.approval_id">
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
                  <span class="label">定损人／时间：</span>{{ evaluate.evaluate_user_name }} / {{ evaluate.evaluate_time }}
                  {{ evaluate.loss_detail }}
                  原因说明：{{ evaluate.remark }}
                  {{ evaluate.loss_result }}
                </p>
              </div>
              <p v-if="item.status == 3 && item.confirm_user_name != ''">
                <span class="label">确定{{ item.type == 1 ? '退团' : '退款' }}人／时间：</span>{{ item.confirm_user_name }} / {{ item.confirm_time }}
              </p>
              <p v-if="item.status == 4 && item.revoke_user_name != ''">
                <span class="label">撤回人／时间：</span>{{ item.revoke_user_name }} / {{ item.revoke_time }}
              </p>
              <p v-if="item.refund_status == 2">
                <span class="label">实际退款人／时间：</span>
                {{item.actual_user_name}}／{{item.actual_time}}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--定损弹窗-->
    <el-dialog title="填写退款金额" :visible.sync="lossAssessDialog.show" :close-on-click-modal="false">
      <div>
        <el-radio-group v-model="lossAssessDialog.option">
          <el-radio label="1">可退</el-radio>
          <el-radio label="2">不可退</el-radio>
        </el-radio-group>
      </div>
      <div v-show="lossAssessDialog.option == 1">
        <div class="mtb15">
          订单应退款金额：<span class="color-orange">{{ lossAssessRemainAmount }}</span>
        </div>
        <el-table :data="lossAssessDialog.tourists" border>
          <el-table-column label="游客姓名" align="center" prop="username" min-width="100">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.username">{{ scope.row.username }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="价格项"
            header-align="center"
            align="right"
            prop="priceStr"
            min-width="140"
          >
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.priceStr">{{ scope.row.priceStr }}</div>
            </template>
          </el-table-column>
          <el-table-column label="游客应收" header-align="center" align="right" width="100">
            <template slot-scope="scope">
              <span class="color-orange">{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="退团损失" align="center" width="100">
            <template slot-scope="scope">
              <input-number  v-model="scope.row.lossAmount" :precision="3" @blur="handleBlurLossAmount(scope.row)"/>
            </template>
          </el-table-column> -->
          <el-table-column label="应退款金额" align="center" width="100">
            <template slot-scope="scope">
              <!-- {{ scope.row.refund_amount }} -->
              <input-number v-model="scope.row.refund_amount" :precision="2" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mtb15">
        <span class="color-red">*</span> 原因说明：
        <el-input class="mt10" type="textarea" placeholder="可输入退款金额说明、订单损失说明、不可退款说明等" v-model="lossAssessDialog.remark" />
      </div>
      <span slot="footer">
        <el-button @click="lossAssessDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="dingsunSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!--/定损弹窗-->
    <!--确认退团弹窗-->
    <!-- <el-dialog title="确认退团" v-model="conTtDialogVisible" size="tiny">
      <span>确认退团后无法恢复，是否确认退团？</span>
      <span slot="footer">
        <el-button @click="confirmTt(false)">
          取 消
        </el-button>
        <el-button type="primary" :disabled="conTtBtnDis" @click="confirmTtSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog> -->
    <!--/确认退团弹窗-->
    <!--取消退团弹窗-->
    <!-- <el-dialog title="取消退团" v-model="canTtDialogVisible" size="tiny">
      <span>取消退团后则退团失败，确定要取消退团？</span>
      <span slot="footer">
        <el-button @click="cancelTt(false)">
          取 消
        </el-button>
        <el-button type="primary" :disabled="canTtBtnDis" @click="cancelTtSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog> -->
    <!--/取消退团弹窗-->
  </div>
</template>
<script>
import {
  operGetCancelDetail,
  saleGetCancelDetail,
  getRefundAmont,
  operLossAssess,
  confirmCancelTuanTourist,
  saleTuanCancelConfirm
} from 'src/api/tuan';
import {
  finGetCancelDetail
} from 'src/api/finance';
// import {
//   saleSaleGetCancelDetail,
//   saleConfirmCancelTuanTourist,
//   saleSaleTuanCancelConfirm,
//   financeGetCancelDetail
// } from 'src/api/api_store';
import InputNumber from 'src/plugins/InputNumber.vue';
import { formatPrice } from 'src/utils/format';
import { getKfOrderDetailRefund } from "src/api/order";

export default {
  components: {
    InputNumber
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
  data(){
    return{
      TUITUAN_STATUS_MAP: {},
      TUIKUAN_STATUS_MAP: {},
      // tuanId: this.$route.query.tid, // 非必要参数
      tuanId: '',
      orderNo: this.$route.query.ono,
      orderId: null,
      list: [],
      // refundTourists: [],
      // ktjeMax: null,
      ktjeDis: true,
      cancelNo: null,
      // 定损相关变量 begin
      lossAssessDialog: {
        show: false,
        option: '2',
        cancelNo: '',
        tourists: [],
        remark: ''
      },
      // dsDialogVisible: false,
      // dsBtnDis: false,
      // dsObj: {
      //   option: '1',
      //   loss_amount: '',
      //   refund_amount: ''
      // },
      // 定损相关变量 end
      conTtDialogVisible: false,
      conTtBtnDis: false,
      canTtDialogVisible: false,
      canTtBtnDis: false
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    orderDetailPerm() {
      switch(this.topMenuConst) {
      case 'saleorder': 
        return this.$menuPermission('saleorder/lineorder/getorderdetail')
      case 'purchaseorder':
        return this.$menuPermission('purchaseorder/lineorder/getorderdetail')
      case 'settlement': 
        return this.$menuPermission('settlement/getorderdetail')
      case 'touristroute': 
        return this.$menuPermission('touristroute/lineorder/lineorder/getorderdetail')
        break;
      case 'kefuservice': 
        return this.$menuPermission('kfservice')
        break;
      default:
        return false;
      }
    },
    orderDetailUrl() {
      let urlPrefix = '';
      const menu = this.$route.meta.menu;
      let urlItem = this.tuanId + '/' + this.orderId;

      switch(this.topMenuConst) {
      case 'saleorder': 
      case 'purchaseorder':
        urlPrefix = 'order-detail/';
        break;
      case 'settlement': 
        urlPrefix = '/settlement/line/order-detail/';
        break;
      // case 'store-sale': 
      //   if (menu === 'storeSaleOrderList') {
      //     urlPrefix = '/store-sale/order-detail/';
      //   } else if (menu === 'storeSaleInvoiceList') {
      //     urlPrefix = '/store-sale/order-detail2/';
      //   } else if (menu === 'storeFinaceInvoiceList') {
      //     urlPrefix = '/store-finace/order-detail2/';
      //   }
      //   break;
      // case 'store-finace':
      //   urlPrefix  = '/store-finace/order-detail2/';
      //   break;
      case 'touristroute': 
        // if(menu == 'control'){
        //   urlPrefix = '/control/order-details/';
        // }else if(menu == 'planOrderList'){
        //   urlPrefix = '/plan/order-list/detail/';
        // }
        urlPrefix = 'order-detail/';
        break;

      case 'kefuservice': 
        // if(menu == 'control'){
        //   urlPrefix = '/control/order-details/';
        // }else if(menu == 'planOrderList'){
        //   urlPrefix = '/plan/order-list/detail/';
        // }
        urlPrefix = '/kfservice/order/detail/';
        urlItem = this.orderNo
        break;
      }

      return urlPrefix + urlItem;
    },
    getCancelDetailFunc() {
      switch(this.topMenuConst) {
      case 'saleorder': 
      case 'purchaseorder':
        return saleGetCancelDetail;
      case 'settlement': 
        return finGetCancelDetail;
      // case 'store-sale': 
      //   return saleSaleGetCancelDetail;
      // case 'store-finace':
      //   return financeGetCancelDetail;
      case 'touristroute': 
        return operGetCancelDetail;

      case 'kefuservice': 
        return getKfOrderDetailRefund;
      }
    },
    confirmCancelTuanTouristPerm() {
      switch (this.topMenuConst) {
      case 'purchaseorder':
        return this.$menuPermission('purchaseorder/lineorder/getbackdetail/sureback');
      case 'saleorder':
        return this.$menuPermission('saleorder/lineorder/getbackdetail/sureback');
      default:
        return false;
      }
    },
    confirmCancelTuanTouristFunc() {
      switch(this.topMenuConst) {
      // case 'store-sale': 
      //   return saleConfirmCancelTuanTourist;
      default: 
        return confirmCancelTuanTourist;
      }
    },
    saleTuanCancelConfirmPerm() {
      switch (this.topMenuConst) {
      case 'purchaseorder':
        return this.$menuPermission('purchaseorder/lineorder/getbackdetail/cancelback');
      case 'saleorder':
        return this.$menuPermission('saleorder/lineorder/getbackdetail/cancelback');
      default:
        return false;
      }
    },
    saleTuanCancelConfirmFunc() {
      switch(this.topMenuConst) {
      // case 'store-sale': 
      //   return saleSaleTuanCancelConfirm;
      default: 
        return saleTuanCancelConfirm;
      }
    },
    approvalDetailPerm() {
      return this.$menuPermission('usercenter/approval/detail');
      // 统一使用用户中心下的查看权限控制
      // switch (this.topMenuConst) {
      // case 'purchaseorder':
      //   return this.$menuPermission('purchaseorder/lineorder/getbackdetail/getapproval')
      // case 'saleorder':
      //   return this.$menuPermission('saleorder/lineorder/getbackdetail/getapproval')
      // default:
      //   return false;
      // }
    },
    lossAssessRemainAmount(){
      let amount = 0;

      this.lossAssessDialog.tourists.forEach(item => {
        amount += item.refund_amount;
      })

      return formatPrice(amount);
    }
  },
  // watch:{
  //   'dsObj.option':{
  //     handler(e){
  //       this.dsObj.loss_amount = '';
  //       this.dsObj.refund_amount = '';
  //     },
  //     deep: true
  //   },
  // },
  // created(){
  //   // 确定角色来源
  //   switch(this.$route.meta.topMenuConst){
  //   case 'touristroute':
  //     this.opreateRole = 1;
  //     break;
  //   case 'saleorder':
  //   case 'distribution': 
  //     this.opreateRole = 2;
  //     break;
  //   case 'finance':
  //     this.opreateRole = 3;
  //     break;
  //   }
  // },
  mounted(){
    this.initialize();
  },
  methods: {
    initialize(){
      let params = {
        data: {
          // tuan_id: this.tuanId,
          order_no: this.orderNo
        }
      };
      this.getCancelDetailFunc({
        params: params,
        success: res => {
          const { code, data, msg} = res.data;
          if(code != 0){
            this.$message({
              message: msg,
              type: 'error'
            });
            return this.$router.go(-1);
          }
          this.list = data;
          this.orderId = data.order_info.id;
          this.tuanId = data.order_info.tuan_id;
          this.TUITUAN_STATUS_MAP = data.status_list[1];
          this.TUIKUAN_STATUS_MAP = data.status_list[2];
        },
        showLoading: true
      });
    },
    isShowOrderOperate(edit) {
      if (Array.isArray(edit)) {
        return edit.some(this.isShowOrderOperate)
      }
      switch (edit) {
      case 1:  // '定损'
        return this.$menuPermission('touristroute/lineorder/lineorder/getbackdetail/loss');
      case 2:   // 确认退团退款
        return this.confirmCancelTuanTouristPerm;
      case 3:   // 退团退款确认
        return this.saleTuanCancelConfirmPerm;
      case 4:   // 查看审批单
        return this.approvalDetailPerm;
      default:
        return false;
      }
    },
    // 定损操作弹窗
    dingsun(row, i){
      if(row){
        this.lossAssessDialog.cancelNo = row.cancel_no;
        let params = {
          data: {
            'cancel_id': row.id,
            'tuan_id': row.tuan_id
          }
        };
        getRefundAmont({
          params,
          success: res => {
            if (res.data.code == '0') {
              res.data.data.forEach(item => {
                item.priceStr = item.detail.map(it => it.item_name).join('+');
                item.lossAmount = 0;
                item.refund_amount = item.amount;
              })
              this.lossAssessDialog.show = true;
              this.lossAssessDialog.option = '2';
              this.lossAssessDialog.tourists = res.data.data;
              this.lossAssessDialog.remark = '';
            }else{
              this.lossAssessDialog.show = false;
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
        // this.dsObj.cancel_no = row.cancel_no;
        // this.ktjeMax = row.cancel_total_amount;
      }
    },
    handleBlurLossAmount(row){
      row.refund_amount = formatPrice((row.amount - row.lossAmount) || 0);
    },
    // cancelDiagDs(done){
    //   done();
    //   this.$refs['dsForm'].resetFields();
    // },
    dingsunSubmit(){
      let params = {data: {
        cancel_no: this.lossAssessDialog.cancelNo,
        option: this.lossAssessDialog.option,
        detail: this.lossAssessDialog.tourists.map(item => ({
          tourist_id: item.id,
          loss_amount: item.lossAmount,
          refund_amount: item.refund_amount
        })),
        remark: this.lossAssessDialog.remark
      }};
      // this.dsBtnDis = true;
      operLossAssess({
        params,
        success: res => {
          // this.dsBtnDis = false;
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.lossAssessDialog.show = false;
            this.initialize();
          }
        },
        showLoading: true
      });
    },
    // 确认退团操作弹窗
    // confirmTt(status, row){
    //   if(status){
    //     this.conTtDialogVisible = true;
    //   }else{
    //     this.conTtDialogVisible = false;
    //   }
    //   if(row){
    //     this.cancelNo = row.cancel_no;
    //   }
    // },
    confirmTtSubmit(formName){
      this.conTtBtnDis = true;
      let params = {
        data: {
          'cancel_no': this.cancelNo,
          'tuan_id': this.tuanId,
          'order_no': this.orderNo,
          'option': 1
        }
      };
      this.confirmCancelTuanTouristFunc({
        params,
        success: res => {
          this.conTtBtnDis = false;
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.conTtDialogVisible = false;
            this.initialize();
          }
        }
      });
    },
    handleConfirm(data){
      const type = data.type == 1 ? '退团' : '退款';
      let msg = `确认${type}后无法恢复，是否确认${type}？`;

      if (data.type == 1) {
        msg = '确认退团后无法恢复，且系统将作废原合同重新生成电子合同，是否确认退团？'
      }
      this.cancelNo = data.cancel_no;
      this.$confirm(msg, '确认' + type, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmTtSubmit();
      }).catch(() => {
        // this.$message.info('已取消通过');          
      });
    },
    // 取消退团操作弹窗
    // cancelTt(status, row){
    //   if(status){
    //     this.canTtDialogVisible = true;
    //   }else{
    //     this.canTtDialogVisible = false;
    //   }
    //   if(row){
    //     this.cancelNo = row.cancel_no;
    //   }
    // },
    cancelTtSubmit(formName){
      this.canTtBtnDis = true;
      let params = {
        data: {
          'cancel_no': this.cancelNo,
          'option': 2
        }
      };
      this.saleTuanCancelConfirmFunc({
        params,
        success: res => {
          this.canTtBtnDis = false;
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.canTtDialogVisible = false;
            this.initialize();
          }
        }
      });
    },
    handleCancel(data){
      const type = data.type == 1 ? '退团' : '退款';

      this.cancelNo = data.cancel_no;
      this.$confirm(`取消${type}后则${type}失败，确定要取消${type}？`, '取消' + type, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelTtSubmit();
      }).catch(() => {
        // this.$message.info('已取消通过');          
      });
    }
  }
};
</script>
<style lang="less" scoped>
  .system-content {
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
  }
.span-btn{
  display: inline-block;
  color: #b10c79;
  cursor: pointer;
}
.tk-info{
  margin-bottom: 15px;
}
</style>
