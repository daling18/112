// src\components\distribution\AddShoukuanDialog.comp.vue
<template>
  <!--添加收款弹窗-->
  <el-dialog
    title="线下收款"
    :visible="visible"
    :before-close="handleBeforeClose"
    :close-on-click-modal="false"
  >
    <el-form
      :rules="rules"
      :model="shoukuan"
      ref="shoukuanForm"
      label-width="140px"
      style="width:90%;"
    >
      <el-form-item label="收款人" prop="name" class="mb0 oh">{{ userInfo.real_name }}</el-form-item>
      <el-form-item label="所属组织" prop="org" class="mb0 mt-5">{{ userInfo.org_name }}</el-form-item>
      <el-form-item label="收款类型" prop="user_collection_type">
        <el-select
          v-model="shoukuan.user_collection_type"
          disabled
          placeholder="请选择"
          class="w100per"
        >
          <el-option label="团队订单收入" value="1"/>
          <el-option label="团队杂费收入" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="收款金额" class="mb0" required>
        <el-col :span="8">
          <el-form-item prop="total_amount">
            <input-number v-model="shoukuan.total_amount" placeholder="请输入数字" :precision="3"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="plr5">
          <el-form-item>
            <currency-picker v-model="shoukuan.currency" placeholder="选择货币" readonly="readonly"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="currency_rate">
            <input-number v-model="shoukuan.currency_rate" placeholder="汇率" :precision="4"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="收款(本位币)">
        <template
          v-if="shoukuan.total_amount && shoukuan.currency_rate"
        >{{ (shoukuan.total_amount * shoukuan.currency_rate) | formatPrice }}</template>
        <template v-else>--</template>
      </el-form-item>
      <el-form-item v-if="from == 1" label="应收款公司">{{ shoukuan.payment_name }}</el-form-item>
      <el-form-item label="收款方式/账户" prop="account_id" class="mt-10">
        <el-select v-model="shoukuan.account_id" filterable placeholder="请选择" class="w100per">
          <el-option
            v-for="item in accountList"
            :key="item.id"
            :label="item.account_info"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收款日期" prop="payment_date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="shoukuan.payment_date"
          :editable="false"
        />
      </el-form-item>
      <el-form-item label="上传收款凭证" prop="attachment">
        <div>
          <el-upload
            action="/api/v1/profit/file-upload"
            name="file"
            :file-list="shoukuan.attachment"
            accept=".jpg, .jpeg, .png, .pdf"
            :before-upload="handleBeforeUpload"
            :limit="3"
            :on-remove="handleRemove"
            :on-success="handleUploadsucc"
          >
            <el-button size="small">选择本地文件</el-button>
            <span slot="tip">&ensp;仅支持jpeg、png、jpg、pdf格式，不可超过3份</span>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="备注说明" prop="remark">
        <el-input type="textarea" v-model="shoukuan.remark"/>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" :loading="dialogBtnLoading" @click="handleSubmit">保 存</el-button>
    </span>
  </el-dialog>
  <!--/添加收款弹窗-->
</template>

<script>
/**
 * 添加收款弹出框
 *
 * 支持attr参数：
 * visible  | Boolean  | 是否显示弹出框
 *
 * 支持事件：
 * close() | 关闭弹出框
 * submit(data) | 提交表单，参数：收款表达数据
 *
 */
import InputNumber from "src/plugins/InputNumber.vue";
import CurrencyPicker from "src/plugins/currency-picker/index.vue";
import { formatPrice } from "src/utils/format";
import { getUserName, getPaymentAccount } from "src/api/api";
import { getOrderDetailAccount } from "src/api/order";
import { lineOrderSaleOrderPaymentAccount } from "@/api/touristroute"; //获取付款账户

export default {
  name: "AddShoukuanDialog",
  components: {
    InputNumber,
    CurrencyPicker
  },
  filters: {
    formatPrice: formatPrice
  },
  props: {
    dialogBtnLoading: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    visible: {
      required: true,
      type: Boolean
    },
    from: {
      // required: true,
      type: Number
    },
    payee_org_id: null,
    id: ""
  },
  data() {
    return {
      accountList: [],
      userInfo: {},
      shoukuan: {
        id: "",
        tuan_id: "",
        name: "",
        org: "",
        user_collection_type: "1",
        total_amount: "",
        currency: "人民币",
        currency_rate: 1,
        account_id: "",
        payment_date: new Date(),
        attachment: [],
        remark: "",
        payment_name: ""
      },
      rules: {
        user_collection_type: [
          {
            required: true,
            message: "请选择收款类型",
            trigger: "blur"
          }
        ],
        total_amount: [
          {
            type: "number",
            required: true,
            message: "请填写金额",
            trigger: "blur"
          }
        ],
        currency_rate: [
          {
            type: "number",
            required: true,
            message: "请填写汇率",
            trigger: "blur"
          }
        ],
        account_id: [
          {
            type: "number",
            required: true,
            message: "请填写收款方式/账户",
            trigger: "blur"
          }
        ],
        payment_date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  watch: {
    visible: function(newVal) {
      if (newVal) {
        this.getAccountList();
        this.shoukuan = this.getInitData();
      }
    }
  },
  mounted() {
    getUserName().then(params => {
      let { code, data, msg } = params["data"];
      if (code != "10000") {
        this.userInfo = data;
        // this.shoukuan.name = data.real_name;
        // this.shoukuan.org = data.org_name;
      }
    });
  },
  methods: {
    getInitData() {
      let obj = {
        id: "",
        tuan_id: "",
        // name: this.userInfo.data.real_name,
        // org: this.userInfo.data.org_name,
        user_collection_type: "1",
        total_amount: "",
        currency: "人民币",
        currency_rate: 1,
        account_id: "",
        payment_date: new Date(),
        attachment: [],
        remark: ""
      };

      if (this.from == 1) {
        obj.payment_name = "";
      }

      return obj;
    },
    // 收款账号的接口数据
    async getAccountList() {
      let params = {
        payee_org_id: this.payee_org_id
      };
      let result = await lineOrderSaleOrderPaymentAccount(params);
      let { code, data, msg } = result;
      if (code != 0) return this.$message.error(msg);
      let arr = data.list;
      this.shoukuan.payment_name = data.payment_name;
      this.accountList = arr.map(function(a) {
        return {
          id: a.id * 1,
          account_info: a.account_type_str + "-" + a.account_no,
          account_no: a.account_no
        };
      });
    },
    handleBeforeClose(done) {
      done();
      this.$emit("update:visible", false);
      this.$refs["shoukuanForm"].resetFields();
    },
    // 上传图片功能
    handlePreview(file) {
      window.open(file.url);
      // this.prePicUrl = file.url;
      // this.dialogPicVisible = true;
    },
    handleRemove(file, fileList) {
      this.shoukuan.attachment = fileList;
    },
    handleUploadsucc(response, file, fileList) {
      if (response.code == 0) {
        this.shoukuan.attachment = fileList;
      } else {
        let index = fileList.findIndex(v => v.uid == file.uid);
        fileList.splice(index, 1);
        this.shoukuan.attachment = fileList;
        this.$message.error(response.msg);
      }
      // if (response.code == 0) {
      //     this.shoukuan.attachment.push({
      //         // id: response.data[0].id,
      //         name: file.name,
      //         url: response.data[0].path
      //     });
      // } else {
      //     this.$message.error(response.msg);
      // }
    },
    handleBeforeUpload(file) {
      if (this.shoukuan.attachment.length >= 3) {
        this.$message.error("上传凭证数量不可超过三份");
        return false;
      }
      let isTrue =
        file.size / 1024 / 1024 < 2 &&
        /jpeg|png|jpg|pdf/i.test(
          file.name.split(".")[file.name.split(".").length - 1]
        );

      if (!isTrue) {
        this.$message.error("仅支持jpeg、png、jpg、pdf格式且不能超过2MB!");
        return false;
      }
      return isTrue;
    },
    handleSubmit() {
      this.$refs["shoukuanForm"].validate(valid => {
        if (valid) {
          let account = this.accountList.find(
            v => this.shoukuan.account_id == v.id
          );
          let attachment = this.shoukuan.attachment
            .filter(v => v.status == "success" && v.response)
            .map(v => {
              return {
                url: v.response.data[0].path
              };
            });
          let result = JSON.parse(JSON.stringify(this.shoukuan));
          result.attachment = attachment;
          this.$emit("submit", result, account);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.oh {
  overflow: hidden;
}
.mt-5 {
  margin-top: -5px !important;
}
.mt-10 {
  margin-top: -10px !important;
}
.plr5 {
  padding: 0 5px;
}
.w100per {
  width: 100%;
}
</style>
