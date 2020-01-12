<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="system-tab">
        <ul class="tab-box">
          <router-link :to="orderDetailUrl" tag="li">
            订单详情
          </router-link>
          <router-link class="on" to="" tag="li">
            退团/款详情
          </router-link>
        </ul>
      </div>
      <div class="content-list">
        <h2 class="tit">退团/款单列表</h2>
        <ul class="tuituan-con">
          <li v-for="(o,i) in list.cancel_list" :key="i">
            <table class="el-table el-table-center">
              <thead>
                <tr>
                  <th>申请日期</th>
                  <th>退团单号</th>
                  <th>退款状态</th>
                  <th>游客姓名</th>
                  <!-- 待定损状态下订单损失金额和可退金额显示为- -->
                  <th>订单损失金额</th>
                  <th>可退金额</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>{{ o.apply_time }}</p>
                  </td>
                  <td>{{ o.cancel_no }}</td>
                  <td>
                    <span v-if="o.status == 1">
                      待定损
                    </span>
                    <span v-if="o.status == 2">
                      已定损，待确认
                    </span>
                    <span class="success"
                          v-if="o.status == 3">
                      退团成功
                    </span>
                    <span class="fail"
                          v-if="o.status == 4">
                      退团失败
                    </span>
                  </td>
                  <td>
                    <template v-if="o.user_name">
                      {{ o.user_name }}
                    </template>
                    <template v-else>--</template>
                  </td>
                  <td>
                    <template v-if="o.status == 1">--</template>
                    <template v-else>{{ o.loss_amount }}</template>
                  </td>
                  <td>
                    <template v-if="o.status == 1">--</template>
                    <template v-else>{{ o.refund_amount }}</template>
                  </td>
                  <td>
                    <template v-if="o.edit.length > 0">
                      <template v-if="opreateRole != '3'">
                        <span v-for="(p,i2) in o.edit" :key="i2">
                          <span v-if="p == 1"
                                class="span-btn"
                                @click="dingsun(true,o,i)">
                            定损
                          </span>
                          <span v-if="p == 2"
                                class="span-btn"
                                @click="confirmTt(true,o)">
                            确认退团
                          </span>
                          <span v-if="p == 3"
                                class="span-btn"
                                @click="cancelTt(true,o)">
                            取消退团
                          </span>
                        </span>
                      </template>
                      <tempalte v-else>--</tempalte>
                    </template>
                    <span v-else>--</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="tuituan-info">
              <p>
                <span class="label">申请人/时间：</span>{{ o.apply_user_name }} / {{ o.apply_time }}
              </p>
              <p v-if="o.remark != ''">
                <span class="label">退团原因说明：</span>{{ o.remark }}
              </p>
              <p v-if="o.status != 1 && o.evaluate_user_name != ''">
                <span class="label">定损人／时间：</span>{{ o.evaluate_user_name }} / {{ o.evaluate_time }}
              </p>
              <p v-if="o.status == 3 && o.confirm_user_name != ''">
                <span class="label">确定退团人／时间：</span>{{ o.confirm_user_name }} / {{ o.confirm_time }}
              </p>
              <p v-if="o.status == 4 && o.revoke_user_name != ''">
                <span class="label">撤回人／时间：</span>{{ o.revoke_user_name }} / {{ o.revoke_time }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--定损弹窗-->
    <el-dialog title="填写退款金额" 
               :visible.sync="dsDialogVisible"
               :before-close="cancelDiagDs">
      <el-form
        :rules="dsRules"
        :model="dsObj"
        ref="dsForm"
        label-width="100px"
        v-loading="loading"
        style="margin-left: 100px">
        <el-form-item style="margin-bottom: 10px;">
          <el-radio-group v-model="dsObj.option">
            <el-radio label="1">可退</el-radio>
            <el-radio label="2">不可退</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="dsObj.option == '1'">
          <div class="tk-info" v-if="getRamont.adult_arr">
            <span class="t">
              退团游客*结算价：
              <template v-if="getRamont.adult_arr.num">
                {{ getRamont.adult_arr.num }}{{ getRamont.adult_arr.name }}*{{ getRamont.adult_arr.front_unit_price }}元
              </template>
              <template v-if="getRamont.child_arr.num">
                <template v-if="getRamont.adult_arr.num">+</template>
                {{ getRamont.child_arr.num }}{{ getRamont.child_arr.name }}*{{ getRamont.child_arr.front_unit_price }}元
              </template>
              <template v-if="getRamont.other_type_arr.length > 0">
                <template v-if="getRamont.adult_arr.num || getRamont.child_arr.num">+</template>
                <span v-for="(o, i) in getRamont.other_type_arr"
                      :key="i">
                  <template v-if="i > 0">+</template>
                  {{ o.num }}{{ o.name }}*{{ o.front_unit_price }}元
                </span>
              </template>
            </span>
          </div>
          <el-form-item label="订单损失"
                        prop="loss_amount">
            <el-input-number 
              :controls="false" 
              v-model="dsObj.loss_amount"
              :max="ktjeMax"
              :precision="3"
              @change="lossFuncFocus()"
              @blur="lossFunc()"
              style="width: 150px;" />
          </el-form-item>
          <el-form-item label="可退金额" style="margin-bottom:0;">
            {{ dsObj.refund_amount }}
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer">
        <el-button @click="dingsun(false)">
          取 消
        </el-button>
        <el-button type="primary" :disabled="dsBtnDis" @click="dingsunSubmit('dsForm')">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/定损弹窗-->
    <!--确认退团弹窗-->
    <el-dialog title="确认退团" :visible.sync="conTtDialogVisible" size="tiny">
      <span>确认退团后无法恢复，是否确认退团？</span>
      <span slot="footer">
        <el-button @click="confirmTt(false)">
          取 消
        </el-button>
        <el-button type="primary" :disabled="conTtBtnDis" @click="confirmTtSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--/确认退团弹窗-->
    <!--取消退团弹窗-->
    <el-dialog title="取消退团" :visible.sync="canTtDialogVisible" size="tiny">
      <span>取消退团后则退团失败，确定要取消退团？</span>
      <span slot="footer">
        <el-button @click="cancelTt(false)">
          取 消
        </el-button>
        <el-button type="primary" :disabled="canTtBtnDis" @click="cancelTtSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
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
import {
  saleSaleGetCancelDetail,
  saleConfirmCancelTuanTourist,
  saleSaleTuanCancelConfirm,
  financeGetCancelDetail
} from 'src/api/api_store';
import InputNumber from 'src/plugins/InputNumber.vue';
export default {
  components: {
    InputNumber
  },
  data(){
    let positiveInteger = (rule, value, callback) => {
      if(value.toString().indexOf('-') != -1){
        callback(new Error('请输入正数'));
      }else{
        callback();
      }
    };
    return{
      tuanId: this.$route.query.tid,
      orderNo: this.$route.query.ono,
      ddId: null,
      list: [],
      loading: false,
      getRowCancelId: '',
      getRowTuanId: '',
      getRamont: {},
      ktjeMax: null,
      ktjeDis: true,
      cancelNo: null,
      // 定损相关变量 begin
      dsDialogVisible: false,
      dsBtnDis: false,
      dsObj: {
        option: '1',
        loss_amount: '',
        refund_amount: ''
      },
      dsRules: {
        loss_amount: [{
          type: 'number',
          required: true,
          message: '请填写金额',
          trigger: 'blur'
        },{
          validator: positiveInteger,
          trigger: 'change'
        }]
      },
      // 定损相关变量 end
      conTtDialogVisible: false,
      conTtBtnDis: false,
      canTtDialogVisible: false,
      canTtBtnDis: false,
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    orderDetailUrl() {
      let urlPrefix = '';
      const menu = this.$route.meta.menu;

      switch(this.topMenuConst) {
      case 'sale': 
        urlPrefix = '/sale/order/order-detail/';
        break;
      case 'finance': 
        urlPrefix = '/fcontrol/order-details/';
        break;
      case 'store-sale': 
        if (menu === 'storeSaleOrderList') {
          urlPrefix = '/store-sale/order-detail/';
        } else if (menu === 'storeSaleInvoiceList') {
          urlPrefix = '/store-sale/order-detail2/';
        } else if (menu === 'storeFinaceInvoiceList') {
          urlPrefix = '/store-finace/order-detail2/';
        }
        break;
      case 'store-finace':
        urlPrefix  = '/store-finace/order-detail2/';
        break;
      case 'operator': 
        if(menu == 'control'){
          urlPrefix = '/control/order-details/';
        }else if(menu == 'planOrderList'){
          urlPrefix = '/plan/order-list/detail/';
        }
        break;
      }

      return urlPrefix + this.tuanId + '/' + this.ddId;
    },
    getCancelDetailFunc() {
      switch(this.topMenuConst) {
      case 'sale': 
        return saleGetCancelDetail;
      case 'finance': 
        return finGetCancelDetail;
      case 'store-sale': 
        return saleSaleGetCancelDetail;
      case 'store-finace':
        return financeGetCancelDetail;
      case 'operator': 
        return operGetCancelDetail;
      }
    },
    confirmCancelTuanTouristFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleConfirmCancelTuanTourist;
      default: 
        return confirmCancelTuanTourist;
      }
    },
    saleTuanCancelConfirmFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleSaleTuanCancelConfirm;
      default: 
        return saleTuanCancelConfirm;
      }
    },
  },
  watch:{
    'dsObj.option':{
      handler(e){
        this.dsObj.loss_amount = '';
        this.dsObj.refund_amount = '';
      },
      deep: true
    },
  },
  created(){
    // 确定角色来源
    switch(this.$route.meta.topMenuConst){
      case 'operator':
        this.opreateRole = 1;
        break;
      case 'sale':
        this.opreateRole = 2;
        break;
      case 'finance':
        this.opreateRole = 3;
        break;
    }
  },
  methods: {
    initialize(){
      let params = {
        data: {
          tuan_id: this.tuanId,
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
          }
          this.list = data;
          this.ddId = data.order_info.id;
        },
        showLoading: true
      });
    },
    // 定损操作弹窗
    dingsun(status, row, i){
      if(status){
        this.dsDialogVisible = true;
        this.loading = true;
      }else{
         console.log(status);
        this.dsDialogVisible = false;
        this.$refs['dsForm'].resetFields();
        this.dsObj.refund_amount = '';
      }
      if(row){
        this.getRowCancelId = row.id;
        this.getRowTuanId = row.tuan_id;
        let params = {
          data: {
            'cancel_id': this.getRowCancelId,
            'tuan_id': this.getRowTuanId
          }
        };
        getRefundAmont({
          params,
          success: res => {
            this.loading = false;
            if (res.data.code == '0') {
              this.getRamont = res.data.data;
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          }
        });
        this.dsObj.cancel_no = row.cancel_no;
        this.ktjeMax = row.cancel_total_amount;
      }
    },
    lossFuncFocus(){
      this.dsBtnDis = true;
    },
    lossFunc(){
      let params = {
        data: {
          'cancel_id': this.getRowCancelId,
          'tuan_id': this.getRowTuanId,
          'refund_loss': this.dsObj.loss_amount
        }
      };
      getRefundAmont({
        params,
        success: res => {
          this.dsBtnDis = false;
          if (res.data.code == '0') {
            this.ktjeDis = false;
            this.dsObj.refund_amount = res.data.data.refund_amount;
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }
      });
    },
    cancelDiagDs(done){
      done();
      this.$refs['dsForm'].resetFields();
    },
    dingsunSubmit(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
          let params = {data: this.dsObj};
          this.dsBtnDis = true;
          operLossAssess({
            params,
            success: res => {
              this.dsBtnDis = false;
              this.$message({
                message: res.data.msg,
                type: res.data.code == '0' ? 'success' : 'error'
              });
              if (res.data.code == '0') {
                this.dsDialogVisible = false;
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
    // 确认退团操作弹窗
    confirmTt(status, row){
      if(status){
        this.conTtDialogVisible = true;
      }else{
        this.conTtDialogVisible = false;
      }
      if(row){
        this.cancelNo = row.cancel_no;
      }
    },
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
    // 取消退团操作弹窗
    cancelTt(status, row){
      if(status){
        this.canTtDialogVisible = true;
      }else{
        this.canTtDialogVisible = false;
      }
      if(row){
        this.cancelNo = row.cancel_no;
      }
    },
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
    }
  },
  mounted(){
    this.initialize();
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
      .el-table-center th, .el-table-center td {
        text-align: center;
        border: 1px solid #ddd;
      }
      .success {
        color: #019f3d;
      }
      .fail {
        color: #ff0d0d;
      }
      .money {
        color: #ff6600;
      }
      .btn {
        color: #b10c79;
        cursor: pointer;
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
    .el-table{
      border: none;
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
