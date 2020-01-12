<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="system-tab">
        <ul class="tab-box">
          <router-link :to="orderDetailUrl" tag="li">订单详情</router-link>
          <li class="on" >退款详情</li>
        </ul>
      </div>
      <div class="content-list" v-for="(item, idx) in refundList" :key="idx">
        <table class="el-table el-table-center">
          <thead>
            <tr>
              <th>申请日期</th>
              <th>退款单号</th>
              <th>应退款金额</th>
              <th>订单损失金额</th>
              <th>退款状态</th>
              <th>实际退款金额</th>
              <th>财务退款状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ item.create_time }}</td>
              <td>{{ item.refund_no }}</td>
              <td><div class="cell tar">{{ item.refund_status == 1 ? '--' : item.refund_amount }}</div></td>
              <td><div class="cell tar">{{ item.refund_status == 1 ? '--' : item.refund_fee }}</div></td>
              <td><span :class="item.refund_status | getStatusColor">
                {{ item.status_name }}
              </span></td>
              <td><div class="cell tar">{{ item.refund_status != 2 ? '--' : item.real_refund_amount }}</div></td>
              <td>{{ item.finance_status_name }}</td>
              <td><div class="cell">
                <a v-if="item.is_op_loss == 1" href="javascript:;" @click="handleLossAssess(item)">
                  定损
                </a>
                <span v-else> -- </span>
              </div></td>
            </tr>
          </tbody>
        </table>
        <div class="tuituan-info" v-if="item.refund_status == 2 || item.refund_status == 4">
          <template v-if="item.remark">
            <span class="label">定损人／时间：</span>{{ item.loss_op_name }} / {{ item.loss_time }}
            处理结果：不可退
          </template>
          <template v-else>
            <span class="label">定损人／时间：</span>{{ item.loss_op_name }} / {{ item.loss_time }}
            <span class="color-orange">应退款金额 {{ item.refund_amount }}</span>
            {{ item.refund_status == 2 ? '审批通过' : '审批不通过' }}
          </template>
        </div>
        <!-- <div class="tuituan-info" v-if="item.refund_status == 5">
          <span class="label">定损人／时间：</span>{{ item.loss_op_name }} / {{ item.loss_time }}
          处理结果：不可退
        </div> -->
      </div>
    </div>
    <!--定损弹窗-->
    <el-dialog title="定损" size="normal" :visible.sync="lossAssessDialog.show" :close-on-click-modal="false">
      <div class="mtb15">
        <el-radio-group v-model="lossAssessDialog.is_retire">
          <el-radio label="1">可退</el-radio>
          <el-radio label="0">不可退</el-radio>
        </el-radio-group>
      </div>
      <div class="mtb15" v-show="lossAssessDialog.is_retire == 1">
        现订单的应收金额 {{ refundDetail.refund_amount }}，您同意应退款金额为
        <input-number  class="inline-input" v-model="lossAssessDialog.lossAmount" placeholder="请输入金额" :precision="3"/>
        元 ？
      </div>
      <div class="f14" v-show="lossAssessDialog.is_retire == 1">（实际退款金额会根据您定的应退款金额与已收金额系统为您计算）</div>
      <span slot="footer">
        <el-button @click="lossAssessDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="handleLossAssessSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  refundDetail,
  loss
} from 'src/api/selfsupport.visa';
import InputNumber from 'src/plugins/InputNumber.vue';

export default {
  components: {
    InputNumber
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 2: 
        return 'color-green';
      case 4: 
        return 'color-red';
      case 1:
      case 3: 
      case 5:
      default:
        return '';
      }
    }
  },
  data(){
    return{
      orderId: this.$route.query.order_id,
      refundList: [],
      refundDetail: {},
      lossAssessDialog: {
        show: false,
        is_retire: '1',
        lossAmount: ''
      }
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isSingleOrder() {
      // return this.$route.meta && this.$route.meta.menu == 'planSingleOrder'
      // 仅自营订单不添加is_single参数
      return this.$route.meta && this.$route.meta.menu != 'planSelfSupportOrder'
    },
    orderDetailUrl() {
      let urlPrefix = '';
      const menu = this.$route.meta.menu;

      switch(this.topMenuConst) {
      case 'sale': 
      case 'distribution': 
      case 'operator':
      case 'finance': 
        urlPrefix = 'detail';
        break;
      }

      return urlPrefix + '?order_id=' + this.orderId;
    },
    getCancelDetailFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
      case 'distribution': 
        return refundDetail;
      case 'finance': 
        return refundDetail;
      case 'operator': 
        return refundDetail;
      }
    },
  },
  mounted(){
    this.initialize();
  },
  methods: {
    initialize(){
      let params = {
        data: {
          order_id: this.orderId
        }
      };

      if(this.isSingleOrder){
        params.data.is_single = 1;
      }
      
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
          this.refundList = data || {};
        },
        showLoading: true
      });
    },
    handleLossAssess(refund){
      this.lossAssessDialog.show = true;
      this.lossAssessDialog.is_retire = '1';
      this.lossAssessDialog.lossAmount = '';
      this.refundDetail = refund;
    },
    handleLossAssessSubmit(){
      let params = {
        data: {
          order_id: this.orderId,
          refund_no: this.refundDetail.refund_no,
          is_retire: this.lossAssessDialog.is_retire,
          amount: this.lossAssessDialog.lossAmount
        }
      };

      if(params.data.is_retire == '1' && params.data.amount === ''){
        return this.$message.error('请输入金额');
      }

      loss({
        params,
        success: res => {
          const h = this.$createElement;
          let message = res.data.msg

          if (res.data.code == '0') {
            this.lossAssessDialog.show = false;
            this.initialize();
            message = [
              h('span', {class: 'f18'}, '定损成功!')              
            ];
            if(this.lossAssessDialog.is_retire == '1') {
              message.push(h('div', null, '如需审批，进入审批流程，无需审批，直接退款'));
            }
            // message.push();
          }
          this.$msgbox({
            title: '系统提示',
            message: h('div', null, message),
            type: res.data.code == '0' ? 'success' : 'error'
          });
        },
        showLoading: true
      });
    }
  }
};
</script>
<style lang="less" scoped>
  .system-content {
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
</style>
