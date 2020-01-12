<style lang="stylus" scoped>
@import '../../../assets/stylus/common.styl'
  .profit-settlement
    background #fff
    padding 20px
    .record-btn
      margin-bottom 10px
    .pic-box
      margin-top 30px
      overflow hidden
      .pic-item
        float left
        margin-right 20px
        .item
          width 150px
          height 150px
          img 
            width 100%
            height 100%
    .el-dialog
      .operater
        height 35px
        line-height 35px
      .remarks
        padding-left 20px
        span
          display inline-block
          vertical-align top
          margin-right 10px
        .record-input
          width 85%
    .recorded-dialog
      .info
        padding 0 20px
        .span,.remark
          margin-bottom 35px
        .span
          span 
            margin-right 50px
        .remark
          overflow hidden
          span
            float left
            width 10%
          div
            float left
            width 90%
</style>
<template lang="pug">
  .profit-settlement
    //- .settlement-titel
    //-   span 销售利润结算
    .system-search
      .search-item
        .label 订单号
        el-input(class="elinput" v-model="searchData.order_no" placeholder="请输入订单号")
      .search-item
        .label 收款方
        el-input(class="elinput" v-model="searchData.incomeer" placeholder="请输入付款方")
      .search-item
        .label 返佣单号
        el-input(class="elinput" v-model="searchData.rebate_no" placeholder="请输入返佣单号")
      .search-item
        .label 状态
        el-select(v-model="searchData.status" placeholder="请选择状态")
          el-option(
            v-for="item in statusOptions",
            :key="item.value",
            :label="item.label",
            :value="item.value"
          )
      el-button(type="primary", @click="searchList")  搜索
    el-button(class="record-btn", type="primary", v-if="$menuPermission('rebate/manuallyRecord')", @click="addRecordBtn") 手动添加记录
    .tabel-list
      el-table(class="primary-table", :data="tableData", border, style="width: 100%")
        el-table-column(label="付款类型", prop="type_name", width="95")
        el-table-column(label="发起时间", prop="create_time")
        el-table-column(label="返佣单号", prop="settlement_no")
        el-table-column(label="应付款金额", prop="pay_amount", width="110")
        el-table-column(label="收款方", prop="payee_org_name")
        el-table-column(label="状态", prop="status_name", width="135")
        el-table-column(label="处理时间", prop="handle_time")
        el-table-column(label="操作", width="175")
          template(slot-scope="scope") 
            //- el-button(type="text", size="small",  @click="payBtn(scope.row)") 付款
            el-button(type="text", size="small", v-if="scope.row.status === TYPES.approved",  @click="payBtn(scope.row)") 付款
            el-button(type="text", @click="showRecord(scope.row)", size="small") 查看
            el-button(type="text", size="small", v-if="scope.row.status != 0 && scope.row.status != TYPES.manual", @click="toApprovalDetail(scope.row)") 审批单
            el-button(type="text", size="small", v-if="scope.row.status === TYPES.manual", @click="delRecord(scope.row)") 删除
      el-pagination(class="pagin", layout="prev, pager, next", @current-change="currentPageChange", :total="total_count", :page-size="pageSize", :current-page="currentPage")
    add-manully(:addRecordVisible = "addRecordVisible", :amountType = "amountType", @saveAddManully = "saveAddManully", @closeAddManully = "closeAddManully")
    //- el-dialog(
    //-   title="手动添加记录",
    //-   :visible.sync="addRecordVisible",
    //-   width="50%"
    //-   )
    //-   .system-search
    //-     .search-item
    //-       .label 应付款金额
    //-       el-input(class="elinput", type="number" v-model="addRecordData.amount" placeholder="请输入订单号")
    //-     .search-item
    //-       .label 收款方
    //-       el-select(v-model="addRecordData.incomeer" placeholder="请选择收款方")
    //-         el-option(
    //-           v-for="item in incomeerOptions",
    //-           :key="item.value",
    //-           :label="item.label",
    //-           :value="item.value"
    //-         )
    //-     .search-item
    //-       .label 操作人：
    //-       .operater {{operater}}
    //-   .remarks
    //-     span 备注说明
    //-     el-input(
    //-       class="record-input",
    //-       type="textarea",
    //-       style="width:200",
    //-       :rows="6",
    //-       placeholder="请输入内容",
    //-       v-model="addRecordData.remarks"
    //-       )
    //-   span(slot="footer")
    //-     <el-button type="primary" @click="saveAddRecord">保存</el-button>
    //-     <el-button @click="addRecordVisible = false">取 消</el-button>
    el-dialog(
      title="手动添加记录",
      :visible.sync="recordedVisible",
      width="50%",
      class="recorded-dialog"
      )
      .info
        .span
          span 应付款金额：{{recordedDetail.amount}}
          span 收款方：{{recordedDetail.payee_org_name}}
          span 操作人：{{recordedDetail.create_user}}
        .remark
          span 备注说明
          div {{recordedDetail.remark}}
    el-dialog(
      title="付款",
      :visible.sync="payVisible",
      width="40%"
      )
      el-upload(
        action="/api/v1/profit/file-upload"
        :show-file-list='false'
        :on-success='handleSuccess'
        :before-upload="handlePictureBeforeUpload"
        )
        el-button(type='default') 上传附件
        span 最多上传3张，支持jpg，jpeg，png格式，10M以内图片
      .pic-box
        .pic-item(v-for="(item,index) in imgArr" :key="index" )
          .el-icon-close(@click="delImg(index)")
          .item
            img(:src="item.url" alt="")
      span(slot="footer")
        <el-button type="primary" @click="savePay">保存</el-button>
        <el-button @click="payVisible = false">取 消</el-button>
</template>
<script>
import {
  getProfitWholesaler,
  paySubmit,
  getIncommerOrg,
  manualAddRebateRecord,
  delManualProfitWholesaler,
  supplierAddSettlementDetail
} from "src/api/finance";
import AddManully from "./AddManuallyRecord.vue";

export default {
  props: {
    pay_type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchData: {
        order_no: "",
        incomeer: "",
        rebate_no: "",
        status: ""
      },
      TYPES: {
        settled: "3", //已结算 已付款
        approved: "2", //审批通过
        manual: "-9" //手动添加
      },
      pageSize: 10,
      total_count: 10,
      currentPage: 1,
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "审批中"
        },
        {
          value: "-1",
          label: "审批不通过"
        },
        {
          value: "2",
          label: "审批通过"
        },
        {
          value: "3",
          label: "已付款"
        }
      ],
      tableData: [],
      addRecordVisible: false,
      recordedVisible: false,
      payVisible: false,
      amountType: "应付款金额",
      // addRecordData: {
      //   amount: "",
      //   incomeer: "",
      //   remarks: ""
      // },
      incomeerOptions: [
        {
          value: "1",
          label: "嘉禾营业部"
        },
        {
          value: "2",
          label: "广西营业部"
        }
      ],
      operater: "",
      recordedDetail: {},
      imgArr: [],
      pay_no: ""
    };
  },
  components: {
    AddManully
  },
  mounted() {
    // this.operater = localStorage.getItem("sysUserName");
    this._getProfitWholesaler();
  },
  methods: {
    async _getProfitWholesaler(page) {
      const params = {
        data: {
          order_no: this.searchData.order_no,
          payeeor: this.searchData.incomeer,
          settlement_no: this.searchData.rebate_no,
          status: this.searchData.status,
          pay_type: this.pay_type,
          page_index: page || 1,
          page_size: this.pageSize
        }
      };
      const {
        data: { code, data, msg }
      } = await getProfitWholesaler(params, true);
      if (code !== 0) return this.$message.warning(msg);
      console.log(data, "saleProfix");
      this.tableData = data.list;
      this.total_count = data.total_count * 1;
    },
    async _delManualProfitWholesaler(settlement_no) {
      const params = {
        data: {
          settlement_no: settlement_no
        }
      };
      const {
        data: { code, data, msg }
      } = await delManualProfitWholesaler(params, true);

      if (code !== 0) return this.$message.error(msg);
      this.$message.success("删除成功");
      this._getProfitWholesaler();
    },
    async _supplierAddSettlementDetail(id) {
      const params = {
        data: {
          settlement_id: id
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await supplierAddSettlementDetail(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.recordedDetail = data;
      } catch (err) {
        console.log(err);
      }
    },
    searchList() {
      this._getProfitWholesaler()
    },
    addRecordBtn() {
      this.addRecordVisible = true;
    },
    showRecord(row) {
      console.log(row);
      //手动添加的记录展示添加记录
      //否则跳转到返佣详情
      if (row.status === "-9") {
        this._supplierAddSettlementDetail(row.id);
        this.recordedVisible = true;
      } else {
        this.$router.push({
          path: "/settlement/rebate/rebate-detail",
          query: {
            rebate_no: row.settlement_no,
            pay_type: this.pay_type
          }
        });
      }
    },
    toApprovalDetail(row) {
      this.$router.push({
        path: "detail",
        query: {
          id: row.approval_id
        }
      });
    },
    delRecord(row) {
      console.log(row);
      this.$confirm("确认删除该条记录吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this._delManualProfitWholesaler(row.settlement_no);
      });
    },
    // saveAddRecord() {
    //   if (!this.addRecordData.amount)
    //     return this.$message.warning("请填写应付款金额");
    //   if (!this.addRecordData.incomeer)
    //     return this.$message.warning("请选择收款方");
    //   console.log(this.addRecordData, "addRecordData");
    // },
    payBtn(row) {
      this.imgArr = []
      this.payVisible = true;
      this.pay_no = row.settlement_no;
    },
    async savePay() {
      if(!this.imgArr.length) return this.$message.warning("请上传付款凭证")
      // return console.log(this.imgArr,'imgList')
      let imgs = [];
      this.imgArr.forEach(item => {
        imgs.push(item.url);
      });
      const params = {
        data: {
          imgs: imgs,
          settlement_no: this.pay_no
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await paySubmit(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.payVisible = false;
        this.$message.success("保存成功");
        this._getProfitWholesaler(1);
        this.currentPage = 1
      } catch (err) {
        console.log(err);
      }
    },
    async _manualAddRebateRecord(data) {
      const params = {
        data: {
          pay_amount: data.amount,
          pay_type: this.pay_type,
          collector: data.incomeer.id,
          remark: data.remarks
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await manualAddRebateRecord(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.$message.success("添加成功");
        this.addRecordVisible = false;
        // this.addRecordData = {};
        this._getProfitWholesaler();
      } catch (err) {
        console.log(err);
      }
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 0) {
        if(res.data.length) {
          this.imgArr.push(res.data[0]);
        }
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
    },
    // exceedLimit(files) {
    //   console.log(files,'files')
    //   this.$message.warning("最多上传3张图片");
    // },
    currentPageChange(page) {
      this.currentPage = page;
      this._getProfitWholesaler(page);
    },
    saveAddManully(data) {
      this._manualAddRebateRecord(data);
    },
    closeAddManully(num) {
      this.addRecordVisible = false;
    },
    delImg(index) {
      this.imgArr.splice(index, 1)
    },
     handlePictureBeforeUpload({ type, size }){
       if(this.imgArr.length >=3) {
         this.$message.warning("上传凭证数量不可超过三张")
         return false;
       }
      const isJPG = ['image/jpeg', 'image/jpg', 'image/png'].includes(type)
      const isLt10M = size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpg、jpeg、png 格式!');
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!');
        return false
      }
      return isJPG && isLt10M;
    },
  }
};
</script>