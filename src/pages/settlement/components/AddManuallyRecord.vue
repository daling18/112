<style lang="stylus" scoped>
.add-manully
  .el-dialog 
    .operater
      height 35px
      line-height 35px
    .remarks 
      padding-left: 20px
      span 
        display: inline-block
        vertical-align: top
        margin-right: 10px
      .record-input 
        width 85%
</style>
<template lang="pug">
  .add-manully
     el-dialog(
      title="手动添加记录",
      :visible.sync="addRecordVisible",
      width="50%"
      :close-on-click-modal="false"
      :show-close="false"
      )
      .system-search
        .search-item
          .label {{amountType}}:
          el-input(class="elinput", type="number" v-model="addRecordData.amount" placeholder="请输入金额")
        .search-item
          .label 收款方
          el-select(
            v-model="addRecordData.incomeer"
            filterable
            remote
            value-key="id"
            placeholder="请输入关键词"
            :remote-method="_getIncommerOrg"
            :loading="loading")
            el-option(
              v-for="item in incomeerOptions"
              :key="item.id",
              :label="item.name",
              :value="item")
          //- el-select(v-model="addRecordData.incomeer" placeholder="请选择收款方" filterable value-key="name")
          //-   el-option(
          //-     v-for="item in incomeerOptions",
          //-     :key="item.id",
          //-     :label="item.name",
          //-     :value="item"
          //-   )
        .search-item
          .label 操作人：
          .operater {{operater}}
      .remarks
        span 备注说明
        el-input(
          class="record-input",
          type="textarea",
          style="width:200",
          :rows="6",
          placeholder="请输入内容",
          v-model="addRecordData.remarks"
          )
      span(slot="footer")
        <el-button type="primary" @click="saveAddRecord">保存</el-button>
        <el-button @click="cancelAddManually">取 消</el-button>
</template>
<script>
import { getIncommerOrg, getSupplierIncommerOrg } from "src/api/finance";
export default {
  props: {
    addRecordVisible: {
      type: Boolean,
      default: false
    },
    amountType: {
      type: String,
      default: ""
    }
    // operater: {
    //   type: String,
    //   default: ""
    // }
  },
  data() {
    return {
      addRecordData: {
        amount: "",
        incomeer: null,
        remarks: ""
      },
      operater: "",
      incomeerOptions: [],
      // incomeerList: [],
      loading: false,
    };
  },
  computed: {
    apiType() {
      return this.amountType == "实际结算金额" ? getSupplierIncommerOrg : getIncommerOrg
    }
      
  },
  mounted() {
    this.operater = localStorage.getItem("sysUserName");
    // this._getIncommerOrg();
  },
  methods: {
    async _getIncommerOrg(keyword) {
      if(keyword !== "") {
        this.loading = true
        const params = {
          data: {
            keyword: keyword
          }
        };
        try {
          const {data: { code, data, msg }} = await this.apiType(params, true);

          this.loading = false
          if (code !== 0) return;
          this.incomeerOptions = data.list;
          console.log(this.incomeerOptions)
        } catch (err) {
          console.log(err);
        }
      } else {
        this.incomeerOptions = []
      }
    },
    saveAddRecord() {
      // return console.log(this.addRecordData.incomeer,'incommer')
      if (!this.addRecordData.amount)
        return this.$message.warning("请填写应付款金额");
      if (!this.addRecordData.incomeer)
        return this.$message.warning("请选择收款方");
      this.$emit("saveAddManully", this.addRecordData); // 传1 刷新页面
      this.addRecordData = {};
      // this._addSettlementRecord();
    },
    cancelAddManually() {
      this.$emit("closeAddManully"); //传0 不刷新页面
    }
  }
};
</script>