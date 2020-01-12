<style lang="stylus" scoped>
@import '../../assets/stylus/common.styl';

.supplier-list
  background: #fff
  padding: 20px
  .record-btn
    margin-bottom: 10px
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
  // .el-dialog 
  //   .operater
  //     height 35px
  //     line-height 35px
  //   .remarks 
  //     padding-left: 20px
  //     span 
  //       display: inline-block
  //       vertical-align: top
  //       margin-right: 10px
  //     .record-input 
  //       width 85%
  .recorded-dialog
    .info
      padding: 0 20px
      font-size: 16px
      .span, .remark
        margin-bottom: 35px
      .span
        span
          margin-right: 50px
      .remark
        span
          vertical-align: top
          display: inline-block
        div
          display: inline-block
          margin-left: 20px
          border: 1px solid #dfdfdf
          padding: 5px 15px
          font-size: 14px
          min-height: 100px
          min-width: 500px

</style>
<template lang="pug">
  .supplier-list
    .system-search
      .search-item
        .label 订单号
        el-input(class="elinput" v-model="searchData.order_no" placeholder="请输入订单号")
      .search-item
        .label 团号
        el-input(class="elinput" v-model="searchData.tuan_no" placeholder="请输入团号")
      .search-item
        .label 出发日期
        el-date-picker(
          v-model="searchData.go_date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        )
      .search-item
        .label 产品编号
        el-input(class="elinput" v-model="searchData.product_no" placeholder="请输入产品编号")
      .search-item
        .label 收款方
        el-input(class="elinput" v-model="searchData.incomeer" placeholder="请输入收款方")
      .search-item
        .label 结算单号
        el-input(class="elinput" v-model="searchData.settlement_no" placeholder="请输入结算单号")
      .search-item
        .label 状态
        el-select(v-model="searchData.status" placeholder="请选择状态")
          el-option(
            v-for="item in statusOptions",
            :key="item.value",
            :label="item.label",
            :value="item.value"
          )
      .search-item
        .label 申请人
        el-input(class="elinput"  v-model="searchData.create_user_name" placeholder="请输入申请人")
      el-button(type="primary", @click="searchList")  搜索
    el-button(class="record-btn", type="primary", v-if="$menuPermission('rebate/manuallyRecord')",  @click="addRecordBtn") 手动添加记录
    .tabel-list
      el-table(class="primary-table", :data="tableDataList", border, style="width: 100%")
        el-table-column(label="申请时间", prop="create_time")
        el-table-column(label="结算单号", prop="settlement_no")
        el-table-column(label="实际结算金额", prop="pay_amount")
        el-table-column(label="收款方", prop="payee_org_name")
        el-table-column(label="状态", prop="status_name")
        el-table-column(label="处理时间", prop="handle_time")
        el-table-column(label="申请人", prop="create_user_name")
        el-table-column(label="操作")
          template(slot-scope="scope")
            el-button(type="text", size="small", @click="payBtn(scope.row, 'apply')", v-if="$menuPermission('settlement/supplier/Pay') && scope.row.status == 0") 申请付款
            el-button(type="text", size="small", @click="payBtn(scope.row, 'submit')", v-if="$menuPermission('settlement/supplier/financePay') && scope.row.status == 2") 财务付款
            el-button(type="text", @click="showRecord(scope.row)", size="small") 查看
            el-button(type="text", size="small", v-if="scope.row.status != 0 && scope.row.status != -9" @click="toApprovalDetail(scope.row)") 审批单
            el-button(type="text", v-if="scope.row.status == -9" size="small", @click="delRecord(scope.row)") 删除
            el-button(type="text", v-if="scope.row.status == -1 && scope.row.flag == 0" size="small", @click="_reApply(scope.row)") 重新发起
      el-pagination(class="pagin", v-if="tableDataList.length", layout="prev, pager, next", @current-change="currentPageChange", :total="total_count", :page-size="pageSize", :current-page="currentPage")
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
    //-       el-select(v-model="addRecordData.incomeer" placeholder="请选择收款方" filterable value-key="name")
    //-         el-option(
    //-           v-for="item in incomeerOptions",
    //-           :key="item.id",
    //-           :label="item.name",
    //-           :value="item"
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
      title="添加记录",
      :visible.sync="recordedVisible",
      width="50%",
      class="recorded-dialog"
      )
      .info
        .span
          span 实际结算金额:{{recordedDetail.amount}}
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
        span 最多上传3张，支持jpg，jpeg，gif，png格式，10M以内图片
      .pic-box
        .pic-item(v-for="(item,index) in imgArr" :key="index" )
          .el-icon-close(@click="delImg(index)")
          .item
            img(:src="item.url" alt="")
      span(slot="footer")
        <el-button type="primary" @click="_savePayImg">保存</el-button>
        <el-button @click="payVisible = false">取 消</el-button>
</template>
<script>
import {
  getSupplierSettlementList,
  addSettlementRecord,
  getIncommerOrg,
  delAddSettlementRecord,
  supplierAddSettlementDetail,
  financePay,//结算付款
  applyPay,//申请付款
  reApply,//重新发起
} from "src/api/finance";
import AddManully from "./components/AddManuallyRecord.vue";

export default {
  data() {
    return {
      searchData: {
        order_no: "",
        tuan_no: "",
        go_date: [],
        product_no: "",
        incomeer: "",
        settlement_no: "",
        status: "",
        create_user_name: ""
      },
      pageSize: 10,
      currentPage: 1,
      total_count: null,
      tableDataList: [],
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待结算"
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
          label: "已结算"
        }
      ],
      addRecordVisible: false,
      recordedVisible: false,
      payVisible: false,
      incomeerOptions: [],
      operater: "",
      amountType:"实际结算金额",
      recordedDetail: {
        amount: "-100",
        incomeer: "嘉禾营业部",
        operater: "财务小张",
        remarks: "返佣单3820498204 多付款200元 计负"
      },
      imgArr: [],
      pay_no: "",
      payee_org_id: "",//收款方组织ID
      payType: "",//付款类型 申请付款/财务付款
    };
  },
  components: {
    AddManully
  },
  computed: {
     payApi() {
      return this.payType === "submit" ? financePay : applyPay
    },
  },
  mounted() {
    this.operater = localStorage.getItem("sysUserName");
    this._getSupplierSettlementList();
    // this._getIncommerOrg();
  },
  methods: {
    // async _getIncommerOrg() {
    //   const params = {
    //     data: {
    //       keyword: "曙光门市部"
    //     }
    //   };
    //   try {
    //     const {
    //       data: { code, data, msg }
    //     } = await getIncommerOrg(params, true);

    //     if (code !== 0) return this.$message.warning(msg);
    //     this.incomeerOptions = data.list;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
   async _reApply(row) {
     const params = {
       data: {
         settlement_no: row.settlement_no
       }
     }
     try {
       const {data: {code, data, msg}} = await reApply(params,true)

       if(code !== 0 ) return this.$message.error(msg)
       this.$message.success(msg)
       this._getSupplierSettlementList()
     } catch(err) {
       console.log(err)
     }   
    },
    async _getSupplierSettlementList(page) {
      const params = {
        data: {
          order_no: this.searchData.order_no,
          tuan_no: this.searchData.tuan_no,
          product_id: this.searchData.product_no,
          settlement_no: this.searchData.settlement_no,
          status: this.searchData.status,
          payee_org_name: this.searchData.incomeer,
          use_date: {
            start: this.searchData.go_date[0],
            end: this.searchData.go_date[1]
          },
          create_user_name: this.searchData.create_user_name,
          page_index: page || 1,
          page_size: this.pageSize
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await getSupplierSettlementList(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.tableDataList = data.list;
        this.total_count = data.total_count * 1;
      } catch (err) {
        console.log(err);
      }
    },
    async _addSettlementRecord(data) {
      const params = {
        data: {
          amount: data.amount,
          payee_org_id: data.incomeer.id,
          payee_org_name: data.incomeer.name,
          remark: data.remarks
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await addSettlementRecord(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.$message.success("添加成功");
        this.addRecordVisible = false;
        // this.addRecordData = {};
        this._getSupplierSettlementList();
      } catch (err) {
        console.log(err);
      }
    },
    async _delAddSettlementRecord(id) {
      const params = {
        data: {
          settlement_id: id
        }
      };
      try {
        const {
          data: { code, data, msg }
        } = await delAddSettlementRecord(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.$message.success("删除成功");
        this._getSupplierSettlementList();
      } catch (err) {
        console.log(err);
      }
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
    async _savePayImg() {
      if(!this.imgArr.length) return this.$message.warning("请上传图片")
      let imgs = [];
      this.imgArr.forEach(item => {
        imgs.push(item.url);
      });
      
      try {
        let params
        if(this.payType === "submit") {
           params = {
            data: {
              imgs: imgs,
              settlement_id: this.pay_no,
              payee_org_id: this.payee_org_id
            }
          };
        } else {
           params = {
            data: {
              imgs: imgs,
              settlement_id: this.pay_no
            }
          };
        }
        const {data: { code, data, msg }} = await this.payApi(params, true);

        if (code !== 0) return this.$message.warning(msg);
        this.payVisible = false;
        this.$message.success("保存成功");
        this._getSupplierSettlementList(1);
        this.currentPage = 1;
      } catch (err) {
        console.log(err);
      }
    },
    searchList() {
      this._getSupplierSettlementList();
    },
    addRecordBtn() {
      this.addRecordVisible = true;
    },
    showRecord(row) {
      console.log(row);
      //手动添加的记录展示添加记录
      //否则跳转到返佣详情
      if (row.status === -9) {
        this.recordedVisible = true;
        this._supplierAddSettlementDetail(row.id);
      } else {
        this.$router.push({
          path: "supplier-detail",
          query: {
            settlement_no: row.settlement_no
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
        this._delAddSettlementRecord(row.id);
      });
    },
    // saveAddRecord() {
    //   if (!this.addRecordData.amount)
    //     return this.$message.warning("请填写应付款金额");
    //   if (!this.addRecordData.incomeer)
    //     return this.$message.warning("请选择收款方");
    //   this._addSettlementRecord();
    // },
    payBtn(row, payType) {
      this.imgArr = []
      this.payVisible = true;
      this.pay_no = row.id;
      this.payee_org_id = row.payee_org_id
      this.payType = payType
    },
    handleSuccess(res, file, fileList) {
      if (res.code === 0) {
        this.imgArr.push(res.data[0]);
        console.log(this.imgArr);
      } else {
        this.$message({
          type: "error",
          message: res.msg
        });
      }
    },
    exceedLimit(files) {
      console.log(files, 'pic-lengts')
      this.$message.warning("最多上传3张图片");
    },
    delImg(index) {
      this.imgArr.splice(index, 1)
    },
    currentPageChange(page) {
      this.currentPage = page;
      this._getSupplierSettlementList(page);
    },
    saveAddManully(data) {
      console.log(data);
      this._addSettlementRecord(data);
    },
    closeAddManully(num) {
      this.addRecordVisible = false;
    },
     handlePictureBeforeUpload({ type, size }){
       if(this.imgArr.length >= 3) {
         this.$message.warning("上传凭证数量不可超过三张")
         return false
       }
      const isJPG = ['image/jpeg', 'image/jpg', 'image/png'].includes(type);
      const isLt10M = size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpg、jpeg、png 格式!'); 
        return  false
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