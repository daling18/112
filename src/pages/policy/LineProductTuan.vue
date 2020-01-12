<style lang="stylus" scoped>
.tuanqi 
  background #fff
  padding 20px
  .tuan-left
    min-width 450px
    .policy-btn 
      margin-top 20px
    .summary
      background #fff
      padding 10px 5px
      border 1px solid #E6E6E6
      overflow hidden
      .item-span
        margin-right 10px
        float left
      .sales
        margin 0 15px
        float left
      .summary-right
        float right
      .icon 
        display inline-block
        width 10px
        height 10px
        margin-right 10px
        &.orange 
          background-color #f88c31
        &.gray 
          background-color #cccaca
        &.green 
          background-color #55c97e
        &.blue
          background-color #75a9fd
    .calendar
      .is-disabled 
        .coutent
          color #f5f5f5
      .coutent
        overflow hidden
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        padding-left 10px
        padding-right 5px
        &.sales
          background-color: #f88c31//rgba(248, 140, 49, 0.2) //#f88c31
          opacity 0.8
        &.stop
          background-color: #cccaca//rgba(204, 202, 202, 0.2) //
          opacity 0.8
        &.end 
          background-color: #75a9fd//rgba(85, 201, 126, 0.2) //
          opacity 0.8
        &.over 
          background-color: #55c97e//rgba(117, 169, 253, 0.2) //
          opacity 0.8
        .item-date 
          float left
        .date-data 
          padding-top 10px
          text-align right
          font-size 10px
  .tuan-right 
    margin-top 20px
    .tuan-item 
      margin-bottom 15px
      span 
        margin-right 10px
      .tuan-no 
        font-size 18px
      .tuan-end 
        background #FFE7E6
        color #EA5449
        border-radius 6px
        padding 5px
      .el-select
        width: 140px
        margin-right 10px
    .tuan-table
      margin-top 30px
    .tuan-policy 
      display flex
      margin-top 50px
      .box
        .policy-title 
          margin-bottom 10p
          .title 
            font-size 18px
        .gread
          text-align center
          margin 10px 
          .text
            font-weigh 50px
</style>
<template lang="pug">
  .tuanqi
   el-row(:gutter="20")
    el-col(:span="10" class="tuan-left")
      .summary
        span(class="item-span")
          span(class="name") 团期个数
          span(class="count") {{summary.total}}
        span(class="sales")
          i(class="icon orange")
          span(class="name") 销售中
          span(class="count") {{summary.sales}}
        span(class="summary-right")
          span(class="item-span")
            i(class="icon gray")
            span(class="name") 已截止
            span(class="count") {{summary.ended}}
          span(class="item-span")
            i(class="icon green")
            span(class="name") 已出团
            span(class="count") {{summary.over}}
          span(class="item-span")
            i(class="icon blue")
            span(class="name") 已停团
            span(class="count") {{summary.stop}}
      stock-calendar(v-model="selectedDate", :calendarData="formatData" class="calendar" :selectable="calendarCellDisabled")
        template(v-slot:cell="{date, meta, disabled}")
          .coutent(v-if="Object.keys(meta).length !== 0"  :class="meta | getClassNames")
            .item-date
              span {{date.split('-')[2]}}
            .date-data
              .stock(v-if="meta.is_confirm === '0'")
                span 余{{meta.balance_stock}}
              .pirce 
                span ￥{{meta.sales_price}}
              .stock(v-if="meta.is_confirm === '1'")
                span 二次确认
      el-button(type="primary",class="policy-btn", @click="settingProfit") 政策设置
      el-button(type="primary", class="policy-btn", @click="backLineProductList") 返回
    el-col(:span="14" class="tuan-right" v-if="tuan_id && tuan ")
      .tuan-item
        span(class="tuan-no") 团期: {{tuan.day}}
        span(class="tuan-end") {{tuan.quote_status | tuanStatus}}
      .tuan-item
        span 团号: {{tuan.quote_no}}
        span | 新增时间: {{tuan.create_time}}
      .tuan-item(v-if="tuan.is_confirm == 1")
        span 收客:  已收: {{tuan.booking_stock}}
        span  | 二次确认
      .tuan-item(v-else)
        span 收客:  已收 {{tuan.booking_stock}}
        span  | 余 {{tuan.balance}}
        span  | 库存: {{tuan.stock}}
      .tuan-item
        span 报名截止时间: {{tuan.end_date_time}} 
        span  | 预占位有效时间: {{tuan.seat_end_time}}天 
        span  | 付款有效时间: {{tuan.pay_end_time}}
      .tuan-item
        span 定金: {{tuan.deposit}} 
        span  | 定金说明: {{tuan.deposit_desc}}
      .tuan-item
        span 出发城市
        el-select(v-model="tuan.departCity" placeholder="请选择" @change="selectDepartCity")
          el-option(
            v-for="item in cityOptions"
            :key="item.city_id"
            :label="item.city_name"
            :value="item.city_id")
        span 选择套餐
        el-select(v-model="tuan.package" placeholder="请选择" @change="selcetPackage")
          el-option(
            v-for="item in packageOptions"
            :key="item.package_id"
            :label="item.package_name"
            :value="item.package_id")
      .tuan-item(class="tuan-table")
        el-table(:data="tableData" border style="width: 100%")
          el-table-column(prop="other_name" label="价格类型")
            template(slot-scope="scope")
              span {{scope.row.type | priceType}}
          el-table-column(prop="settle_price" label="结算价")
          el-table-column(prop="sales_price" label="销售价")
          el-table-column(prop="online_price" label="网上预订价")
          el-table-column(prop="price_desc" label="价格说明")
      .tuan-policy
        .box(v-if="Object.keys(policyInfo).length !== 0")
          .policy-title
            span(class="title") 分润政策: 
            span {{policyInfo.name}}
          .gread(v-if="policyInfo.name")
            span(class="text") 一级拉新分润设置:{{policyInfo.one_level}}
            .div
              span(v-if="policyInfo.style") 一级分润金额 = 批零差价*设置比例%
              span(v-else) 一级分润金额 = {{policyInfo.one_level}}元
          .gread(v-if="policyInfo.name")
            span(class="text") 二级拉新分润设置:{{policyInfo.two_level}}
            .div
              span(v-if="policyInfo.style === '1'") 二级分润金额 = 批零差价*设置比例%
              span(v-else) 二级分润金额 = {{policyInfo.two_level}}元
        .box(v-else)
          .policy-title
            span(class="title") 分润政策:
            span 暂未设置

    profit-setting(
      :profitData="profitData",
      :greadnum="greadType",
      :IsToSetPolicy="IsToSetPolicy"
      :policyDialogVisible="policyDialogVisible_components",
      @conceldialog="cancelDialog",
      @submitProfit="_saveConfirmPolicy",
      @getBaseProfit="_selectPolicyType",
      @toSettinPolicy="toSettinPolicy"
    )   
          
</template>
<script>
import StockCalendar from "src/components/template/common/stock-calendar";
import {
  getProductTuanqi,
  tuanqiDetail,
  batchSaveProfit,
  lineBaseProfit
} from "src/api/policy";
import ProfitSetting from "src/components/template/policy/ProfitSetting.vue";
import * as common from "src/utils/common";
import Moment from "moment"
export default {
  data() {
    return {
      selectedDate: [],
      summary: {
        total: "",
        sales: "",
        ended: "",
        over: "",
        stop: ""
      },
      profitData: {
        policyType: "1",
        greadOneVal: "",
        greadTwoVal: "",
        isAllPolicy: false,
        base_greadOneVal: "",
        base_greadTwoVal: "",
        policyProduct: "line"
      },
      greadType: "1",
      policyDialogVisible_components: false,
      tuan: {
        policyType: "基本分润政策"
      },
      packageOptions: [],
      cityOptions: [],
      tableData: [],
      tableCitylist: [],
      line_id: "",
      packageList: [],
      IsToSetPolicy: false,
      calendarTuanList: [],
      policyInfo: {},
      tuan_id: "",
      basePolicy_id: "",
      isEditing: false
    };
  },
  watch: {
    selectedDate(val) {
      this.tuan = {};
      this.tableData = [];
      this.cityOptions = [];
      this.packageOptions = [];
      let tuanDate = val.length && val[val.length - 1];
      this.tuan_id = "";
      this.calendarTuanList.length &&
        this.calendarTuanList.forEach(item => {
          if (tuanDate === item.day) {
            this.tuan_id = item.id;
          }
        });

      this.tuan_id && this._tuanqiDetail(this.tuan_id);
    }
  },
  filters: {
    priceType(type) {
      let val = type * 1;
      switch (val) {
        case 0:
          return "其他";
          break;
        case 1:
          return "成人";
          break;
        case 2:
          return "儿童";
          break;
      }
    },
    getClassNames(data) {
      // let data = datas[day];
      if (!data) {
        return {};
      }
      let quote_status = data.quote_status;
      return {
        sales: quote_status == 1,
        stop: quote_status == 2,
        end: quote_status == 4,
        over: quote_status == 3
      };
    },
    tuanStatus(status) {
      let val = status * 1;
      switch (val) {
        case 1:
          return "销售中";
          break;
        case 2:
          return "已截止";
          break;
        case 3:
          return "已出发";
          break;
        case 4:
          return "已停止";
          break;
      }
    }
  },
  computed: {
    formatData() {
      let data = {};
      this.calendarTuanList.length &&
        this.calendarTuanList.forEach(item => {
          data[item.day] = item;
        });
      return data;
    }
  },
  components: {
    StockCalendar,
    ProfitSetting
  },
  mounted() {
    this.line_id = this.$route.query.id;
    this._getProductTuanqi();
  },
  methods: {
    async _getProductTuanqi() {
      const params = {
        line_id: this.line_id
      };
      const { code, data, msg } = await getProductTuanqi(params);
      if (code !== 0) return this.$message.error(msg);

      const nowDate = Moment().format('YYYY-MM-DD')
      const nowDateTime = Moment(nowDate).valueOf();
      this.calendarTuanList = data.calender;
      this.summary = data.summary;

      for (let i = 0; i < data.calender.length; i++) {
        let calenderTime = new Date(data.calender[i].day).getTime();
        if (nowDateTime <= calenderTime && data.calender[i].is_ended == 0) {
          return  this.selectedDate.push(data.calender[i].day);
        } 
      }
      this.selectedDate.push(data.calender[data.calender.length-1].day);
    },
    async _getBaseProfit(type) {
      const params = {
        type: "1"
      };
      const { code, data, msg } = await lineBaseProfit(params);

      if (code !== 0) return (this.IsToSetPolicy = true);
      this.greadType = data.style;
      this.basePolicy_id = data.id;
      this.profitData.base_greadOneVal = data.one_level;
      this.profitData.base_greadTwoVal = data.two_level;
    },
    async _tuanqiDetail(tuanId) {
      const params = {
        line_id: this.line_id,
        day: this.selectedDate[this.selectedDate.length - 1],
        quote_id: tuanId
      };
      const { code, data, msg } = await tuanqiDetail(params);
      if (code !== 0) return this.$message.error(msg);

      this.packageList = data.pkg_list;
      this.tuan = data.base;
      this.policyInfo = data.policyInfo || {};
      data.pkg_list.forEach(item => {
        this.cityOptions.push(item.city);
      });
      data.pkg_list[0].pkg.forEach(p => {
          this.packageOptions.push({
            package_id: p.package_id,
            package_name: p.package_name
          });
      })
      this.tuan.departCity = this.cityOptions[0].city_id;
      this.tuan.package = this.packageOptions[0].package_id;
      this.tableData = data.pkg_list[0].pkg[0].item;

    },
    async _selectPolicyType(val) {
      if (val == "nobase") {
        // this.greadType = val
        this.IsToSetPolicy = false;
        return;
      } else if (val === "base") {
        this._getBaseProfit("base");
      } else {
        this.greadType = val;
      }
    },
    toSettinPolicy() {
      this.$router.push("/policy/line-profitSetting");
    },
    async _saveConfirmPolicy(params) {
      this.policyDialogVisible_components = false;
      let profitType = params.policy_id * 1;
      let profitId = "";
      let profitName = "";
      switch (profitType) {
        case 1: //1暂不设置 2基础分润 3 自定义
          profitId = -1;
          profitName = "暂不设置政策";
          break;
        case 2:
          profitId = 0;
          profitName = "自定义分润政策";
          break;
        case 3:
          profitId = this.basePolicy_id;
          profitName = "基础分润政策";
          break;
      }
      let quoteIds = [];
      this.selectedDate.forEach(item => {
        this.calendarTuanList.forEach(c => {
          if (item === c.day) {
            quoteIds.push(c.id);
          }
        });
      });

      const paramss = {
        id: profitId,
        name: profitName,
        style: params.style,
        type: 1,
        one_level: params.one_level,
        two_level: params.two_level,
        product_ids: new Array(this.line_id),
        quote_ids: quoteIds
      };
      try {
        const { code, data, msg } = await batchSaveProfit(paramss);
        this.product_ids = [];
        if (code !== 0) return this.$message.warning(msg);
        this.$message.success("设置成功");
        this.profitData.greadOneVal = "";
        this.profitData.greadTwoVal = "";
        this.packageOptions = [];
        this.tuan.package = "";
        this.tableData = [];
        this.tuan = {};
        this.cityOptions = [];
        this._tuanqiDetail(this.tuan_id);
      } catch (err) {
        console.log(err);
      }
    },
    selectDepartCity(val) {
      this.packageOptions = [];
      this.tuan.package = "";
      this.tableData = [];
      this.packageList.forEach(item => {
        let pkglist = [];
        if (val === item.city.city_id) {
          item.pkg.forEach(p => {
            this.packageOptions.push({
              package_id: p.package_id,
              package_name: p.package_name
            });
            p.item.forEach(i => {
              pkglist.push(i);
            });
          });
          this.tableData = pkglist;
        }
      });
      this.tableCitylist = common.clone(this.tableData);
    },
    selcetPackage(val) {
      let packagelist = [];
      this.tableCitylist.forEach(item => {
        if (val === item.package_id) {
          packagelist.push(item);
        }
      });
      this.tableData = packagelist;
    },
    calendarCellDisabled(day) {
       let isDisabled = true
      let enableDays = Object.keys(this.formatData);
      let nowDate = new Date().getTime()
      let calenderTime = new Date(day).getTime()
        if(calenderTime > nowDate && enableDays.includes(day)) {
          isDisabled = false
        }
      return isDisabled//!enableDays.includes(day);
      // let enableDays = Object.keys(this.formatData);
      //  const nowDate = Moment().format('YYYY-MM-DD')
      // const nowDateTime = Moment(nowDate).valueOf();
      // this.calendarTuanList.forEach(item => {
      //   console.log(item,'item')
      //   let calenderTime = new Date(item.day).getTime();
      //   if (nowDateTime <= calenderTime && item.is_ended == 0) {
      //      return isDisabled = false ;
      //   } 
      // })
      return isDisabled//!enableDays.includes(day);
    },
    settingProfit() {
      if (!this.selectedDate.length) return this.$message.warning("请选择设置政策的团期");
      // const day = this.selectedDate[this.selectedDate.length - 1];
      // this.calendarTuanList.forEach(item => {
      //   if (new Date(day).getTime() === new Date(item.day).getTime()) {
          this.policyDialogVisible_components = true;
          this.profitData.policyType = "1";
      //   }
      // });
    },
    backLineProductList() {
      this.$router.back(-1);
    },
    cancelDialog(val) {
      this.policyDialogVisible_components = !val;
      // this.profitData.policyType = "1"
    }
  }
};
</script>