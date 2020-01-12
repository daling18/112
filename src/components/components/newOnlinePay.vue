// 支付新接口， 现在 火车票在用
// src\components\distribution\components\OnlinePay.vue
<template>
  <!-- <form method="POST" target="_blank" action="/bom/api/pay/pay_order" ref="onlinePayForm">
    <input name="id" hidden :value="orderId">
    <input name="order_resource" hidden :value="orderResource">
    <input name="amount" v-if="needInputAmount" hidden :value="onlinePayAmount * 1000">
    <el-dialog title="在线支付" :visible.sync="setAmountVisible" size="tiny">
      <el-form label-width="80px">
        <el-form-item label="订单金额" required>
          <input-number  v-model="onlinePayAmount" :precision="2"/>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="pay">
          支 付
        </el-button>
        <el-button @click="setAmountVisible = false">
          取 消
        </el-button>
      </span>
    </el-dialog>
  </form>-->
  <div>
    <div class="form" v-html="form" v-show="false" />
    <el-dialog title="在线支付" :visible.sync="setAmountVisible" size="tiny">
      <el-form label-width="80px">
        <el-form-item label="订单金额" required>
          <input-number v-model="onlinePayAmount" :precision="2" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="handleSubmit">提 交</el-button>
        <el-button @click="setAmountVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 在线支付
 *
 * 提交在线支付form需要用户直接触发submit事件，否则会出现被浏览器拦截的现象。
 * needInputAmount 默认为false，为ture时调用pay方法会弹出设置支付金额窗口，设置完成触发finish(amount)回调
 *
 * 支持attr参数：
 * orderResource | String | 订单类型  1:线路 2:机票 3:酒店 4:签证 5:火车票 6:门票 7:农特优
 * orderId | String, Number | 订单id
 * amount | String, Number | 在线支付金额，默认为'' 使用订单的金额
 * needInputAmount | Boolean | 是否需要输入支付金额
 * totalOutPrice | Number | 订单总销售价，需要输入支付金额时使用，用于限制输入订单金额
 * totalPeerPrice | Number | 订单总结算价，需要输入支付金额时使用，用于限制输入订单金额
 *
 * 触发事件
 * finish   needInputAmount为true时，提交成功后触发，带输入金额参数
 *
 * 开放method：
 * pay | void | 打开在线支付页面, 返回true表示是
 *
 * demo:
 *   <online-pay ref="onlinePay" :order-id="orderInfo.id" order-resource="4" />
 *
 * js:
 *   this.$refs.onlinePay.pay(); // 触发支付操作
 */
import InputNumber from "src/plugins/InputNumber.vue";
import { newPayOrder as payOrder } from "src/api/pay";

export default {
  name: "OnlinePay",
  components: {
    InputNumber
  },
  props: {
    needInputAmount: {
      type: Boolean,
      default: false
    },
    orderResource: {
      required: true,
      type: String
    },
    orderId: {
      required: true,
      type: [String, Number],
      default: ""
    },
    amount: {
      type: [String, Number],
      default: ""
    },
    totalOutPrice: {
      type: Number,
      default: 0
    },
    totalPeerPrice: {
      type: Number,
      default: 0
    },
    backUrl: {
      type: String,
      default: ""
    },
    customParams: String
  },
  data() {
    return {
      setAmountVisible: false,
      onlinePayAmount: 0,
      form: "",
      message: "",
      doMain: window.location.origin + window.location.pathname
    };
  },
  computed: {
    returnUrl() {
      return this.doMain + "#/" + this.backUrl;
    }
  },
  watch: {
    orderId(val, old) {
      this.loadPayForm();
    },
    amount(val, old) {
      this.loadPayForm();
    }
  },
  mounted() {
    if (this.orderId) {
      // console.log('loaded')
      this.loadPayForm();
    }
  },
  methods: {
    pay() {
      if (this.needInputAmount) {
        this.setAmountVisible = true;
        this.onlinePayAmount = this.totalOutPrice;
      } else {
        // console.log('price', this.onlinePayAmount, this.totalPeerPrice)
        // console.log('this.$refs.onlinePayForm: ', this.$refs.onlinePayForm);
        // this.$refs.onlinePayForm.submit();
        // this.loadPayForm();
        if (this.message) {
          this.$message.error(this.message);
          return false;
        }
        let form = document.getElementById("ykpaysubmit");

        if (!form) {
          this.$message.error("数据加载中，请稍后再点击");
          return false;
        }
        form.setAttribute("target", "_blank"); // 在新的窗口打开
        form.submit();
        return true;
      }
    },
    loadPayForm() {
      if (!this.orderId || !this.amount) {
        return;
      }
      const params = {
        orderId: this.orderId,
        platform: this.orderResource,
        amount: this.amount,
        returnUrl: this.returnUrl,
        customParams: this.customParams
      };

      // if(this.needInputAmount){
      //   params.amount = this.onlinePayAmount * 1000;
      // }
      console.log(params, "支付金额");

      payOrder({
        params: { data: params },
        // formdata: true,
        success: params => {
          let data = params.data;
          if (data.code == "0") {
            this.form = data.data.form;
            this.message = "";
            // console.log('form', this.form,this.needInputAmount, this.amount);
            if (this.needInputAmount || this.amount) {
              this.$nextTick(() => {
                this.$emit("finish", this.onlinePayAmount);
                this.setAmountVisible = false;
              });
            }
          } else {
            if (this.needInputAmount) {
              this.$message.error(data.msg);
            } else {
              if (this.amount) {
                this.$message.error(data.msg);
              }
              this.message = data.msg;
            }
          }
        },
        showLoading: true
      });
    },
    handleSubmit() {
      if (this.needInputAmount && this.onlinePayAmount < this.totalPeerPrice) {
        this.$message.error("不可低于与同行的结算价！");
        return false;
      }
      this.loadPayForm();
    }
  },
  showFinishConfirm() {
    const h = this.$createElement;
    return this.$confirm(
      h("div", null, [
        "支付完成前，请不要关闭此支付验证窗口。",
        h("br"),
        "支付完成后，请根据您支付的情况点击下面按钮。"
      ]),
      "在线支付提示",
      {
        type: "warning",
        cancelButtonText: "取消支付",
        confirmButtonText: "支付完成",
        closeOnClickModal: false,
        closeOnPressEscape: false
      }
    );
  }
};
</script>