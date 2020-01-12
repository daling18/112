<style lang="stylus" scoped>
@import '../../assets/stylus/mixin.styl'
.hotel-room-type
  background #fff
  padding 20px 
  .hotelprovider-name
    margin-bottom 20px
    .hotel-name
      font-size 18px
      margin-right 20px
  .room-type-list
    .data-box
      margin-bottom 20px
      .seven-btn
        padding 5px 10px 
        border 1px solid #ddd
      .date-picker
        margin 0 10px 
        width 150px
    .operate-btns
      margin-bottom 20px
    .room-list
      .roomtype-color
        color red
      .item-icon-position 
        position absolute
        top 20px
        right 10px
        font-size 16px
      .click-pointer
        cursor pointer
      .text-center
        text-align center
      .booking-rules
        background red
        color #fff
      .policy-icon
        margin 0 5px
        color #ffffff
        background $color-theme
        .policy-icon-gray
          background gray 
        .policy-icon-primary
          background $color-theme
      .every-box
        text-align center
      .every-box-operate
        text-align center
      .icon-tips
        span
          border-radius 50%
          margin-left 5px
          position relative
          top -7px
          padding 0 6px 
      .icon-tips-primary
        color $color-theme
  .no-data
    border 1px solid #ddd
    height 400px
    display flex
    align-items center
    justify-content center
    .tips
      text-align center
  .radio-type
    display flex
    flex-wrap wrap
    margin 15px 0
    border 1px solid #dddddd
    padding 10px 10px 0 5px
    .item-radio-type
      width 13%
      margin-bottom 15px
  .noData
    border 1px solid #dddddd
    margin 15px 0 
    padding 15px
    text-align center
  .search-room-type
    margin-top 30px
    .search-roomType
      .search-name
        width 180px
        margin-top 10px
        margin-right 10px
      .search-btn
        cursor pointer
  .text
    width 500px
    margin 0 auto
    margin-top 50px
    .to-room-type
      color blue
      cursor pointer
  .content
    display flex
    justify-content center
    flex-wrap wrap
    .select
      width 100%
      margin-bottom 20px
      text-align center
    .set-policy
      width 100%
      text-align center
      .gread
        font-weight 600
        .el-input
          width 120px
          margin-left 10px
        .el-select
          width 70px
      .desc
        font-size 12px
        margin 10px
    .tips
      width 70%
      margin 20px 0
      font-size 12px
      display flex
      justify-content center
      .zhu
        width 258px
    .foot
      margin-top 20px
      text-align center
      width 100%
      .long-btn
        width 150px
</style>

<template lang="pug">
  .hotel-room-type
    .hotelprovider-name
      span(class="hotel-name") {{hotelName}}
      span(v-if="orgType === TYPES.company")
        span 供应商：
        el-select(class="elselect", v-model="supplier", @change="changeProvider")
          el-option(v-for="(item, index) in supplierList", :key="index", :label="item.name", :value="item.id")
    .room-type-list(v-if="roomPackageList.length")
      .data-box
        span(class="seven-btn", @click="_preSeven") < 前七天
        el-date-picker(
          v-model="pickerDate",
          class="date-picker",
          type="date",
          placeholder="选择日期",
          :clearable="false",
          @change="_changeDate"
        )
        span(class="seven-btn", @click="_lastSeven") 后七天 >
      .operate-btns(v-if="orgType === TYPES.company && !selfHotel")
        el-button(type="primary", @click="_addRoomType") 添加房型
        el-button(type="primary", @click="editBatchPrice('price')") 修改价格
        el-button(type="primary", @click="editBatchPrice('status')") 修改房量房态
      .room-list
        el-table(
          :data="roomPackageList", 
          style="width:100%",
          border,
          ref="multipleTable"
          )
          el-table-column(type="expand",width="40px")
            template(slot-scope="props")
              el-table(
                :data="props.row.package_list",
                :show-header="false"
                style='width:100%'
              )
                el-table-column(label="套餐名称", width='220px')
                  template(slot-scope="scope")
                    el-tooltip(placement="top")
                      div(slot="content", style="padding: 10px;line-height: 20px")
                        p 套餐名字： {{scope.row.name}}
                        p 取消政策：{{scope.row.cancel_rules}}
                        p(v-if="scope.row.has_booking_rule === TYPES.has_booking_rule") 预定规则：
                          p(v-for="item in scope.row.booking_rule_text", :key="item") {{item}}
                      div(style='text-align: center')
                        span(style="display: block") {{scope.row.name}} 
                          i(class='el-icon-question')
                        span(v-if="scope.row.foods_name !== ''") {{scope.row.foods_name}}
                        span(style="display: block") {{scope.row.cancel_rules}}
                        span(class="booking-rules", v-if="scope.row.has_booking_rule === TYPES.has_booking_rule ") 预
                        span(class="policy-icon", v-if="scope.row.policy_status !== 0")
                          span(:class="{'policy-icon-primary': scope.row.policy_status === TYPES.allEnabled_policy || scope.row.policy_status === TYPES.partEnabled_policy, 'policy-icon-gray': scope.row.policy_status === TYPES.noEnabled_policy}") 政
                        el-tooltip(placement="right-end")
                          div(slot="content")
                            span(v-if="scope.row.policy_status === TYPES.partEnabled_policy") 分润政策未全部设置或未全部启用
                            div(v-if="scope.row.policy_status === TYPES.noEnabled_policy")
                              div a）分润政策未全部设置并且未全部启用
                              div b）分润政策已全部设置但是未全部启用
                          i(v-if="scope.row.policy_status === TYPES.partEnabled_policy || scope.row.policy_status === TYPES.noEnabled_policy", :class="{'el-icon-warning': true, 'icon-tips': true, 'icon-tips-primary': scope.row.policy_status === TYPES.partEnabled_policy}")
                el-table-column(label="", style="width: 10%;", v-for="(item,inx) in dateList" :key="inx")
                  template(slot-scope="scope")
                    div(v-if="scope.row.price_date[inx].length != 0")
                      el-tooltip(placement="top")
                        div(slot="content", style='padding: 10px;line-height:20px;')
                          p(v-if="orgType === TYPES.company") 剩余房间量：{{scope.row.price_date[inx][0].stock}} 
                          p(v-if="orgType === TYPES.company") 剩余预留房量：{{scope.row.price_date[inx][0].stay_stock}}
                          p(v-if="orgType === TYPES.company") 已售房量：{{scope.row.price_date[inx][0].already_stock}}
                          p(v-if="orgType === TYPES.company") 成本价：￥{{scope.row.price_date[inx][0].price}}
                          p 结算价：￥{{scope.row.price_date[inx][0].settle_price}}
                          p 销售价：￥{{scope.row.price_date[inx][0].sale_price}}
                          p(v-if="orgType === TYPES.company") 剩余批发差价：￥{{scope.row.price_date[inx][0].surplus_profit}}
                          p(v-if="orgType === TYPES.department") 剩余批零差价：￥{{scope.row.price_date[inx][0].surplus_profit}}
                          p 一级分润：￥{{scope.row.price_date[inx][0].one_share_profit}}
                          p 二级分润：￥{{scope.row.price_date[inx][0].two_share_profit}}
                        i(class='el-icon-question item-icon-position')
                      div(:class="{'toedit':true, 'click-pointer':!isEdit}", @click="toEditEveryPrice(scope.row, inx, 1)", v-if="orgType === TYPES.company")                       
                        span(class="policy-icon", v-if="scope.row.price_date[inx][0].policy_status !== 0")
                          span(:class="{'policy-icon-primary': scope.row.price_date[inx][0].policy_status === TYPES.allEnabled_policy, 'policy-icon-gray':  scope.row.price_date[inx][0].policy_status === TYPES.partEnabled_policy}") 政  
                        .every-box-operate
                          p {{scope.row.price_date[inx][0].stock}}/{{scope.row.price_date[inx][0].stay_stock}}/{{scope.row.price_date[inx][0].already_stock}}
                          p ￥{{scope.row.price_date[inx][0].sale_price}}
                          p(v-if="scope.row.price_date[inx][0].foods_name !== ''") 餐食: {{scope.row.price_date[inx][0].foods_name}}
                          //- p 餐食：{{scope.row.price_date[inx][0].foods_name}}
                          p
                            el-button(v-if="scope.row.price_date[inx][0].status == TYPES.qiyong", :disabled="isEdit", size="mini",type="danger", @click="handleStartUsing(0, scope.row, inx, $event)") 禁用
                            el-button(v-else size="mini", type="success", :disabled="isEdit", @click="handleStartUsing(1, scope.row, inx, $event)") 启动
                      div(class="toedit", v-if="orgType === TYPES.department")
                        span(class="policy-icon", v-if="scope.row.price_date[inx][0].policy_status !== 0")
                          span(:class="{'policy-icon-primary': scope.row.price_date[inx][0].policy_status === TYPES.allEnabled_policy, 'policy-icon-gray':  scope.row.price_date[inx][0].policy_status === TYPES.partEnabled_policy}") 政
                        .every-box
                          p ￥{{scope.row.price_date[inx][0].settle_price}}
                          p ￥{{scope.row.price_date[inx][0].sale_price}}
                          p ￥{{scope.row.price_date[inx][0].surplus_profit}}
                          p ￥{{scope.row.price_date[inx][0].one_share_profit}}
                          p ￥{{scope.row.price_date[inx][0].two_share_profit}}
                    div(:class="{'click-pointer':!isEdit, 'text-center':true}", v-if="scope.row.price_date[inx].length <= 0 && orgType === TYPES.company", @click="toEditEveryPrice(scope.row, inx, 0)")
                      p 无
                    div(class="text-center", v-if="scope.row.price_date[inx].length <= 0 && orgType === TYPES.department")
                      p 无
                el-table-column(label="操作", style="width: 15%")
                  template(slot-scope="scope" v-if="scope.row.price_date.length != 0")
                    p
                      el-button(size="small", type="text", @click="toEditPackage(scope.row)", v-if="orgType === TYPES.company") 编辑
                    p 
                      el-button(size="small", type="text", @click="deletePackage(scope.row, scope.$index)", v-if="orgType === TYPES.company && !selfHotel") 删除
                    p 
                      el-button(size="small", type="text", @click="_settingPolicy(scope.row, scope.$index, 1)") 政策设置
                    p 
                      el-button(size="small", type="text", @click="_changePackageStatus(scope.row)", v-if="orgType === TYPES.company") {{scope.row.status | roomStatus}}
                
          el-table-column(label="房型/套餐", prop="name",width="180px")
            template(slot-scope="scope")
              span {{scope.row.name}}
              span(class="policy-icon", v-if="scope.row.policy_status !== 0")
                span(:class="{'policy-icon-primary': scope.row.policy_status === TYPES.allEnabled_policy || scope.row.policy_status === TYPES.partEnabled_policy, 'policy-icon-gray': scope.row.policy_status === TYPES.noEnabled_policy}") 政
              el-tooltip(placement="right-end")
                i(v-if="scope.row.policy_status === TYPES.partEnabled_policy || scope.row.policy_status === TYPES.noEnabled_policy", :class="{'el-icon-warning': true, 'icon-tips': true, 'icon-tips-primary': scope.row.policy_status === TYPES.partEnabled_policy}")
                div(slot="content")
                  span(v-if="scope.row.policy_status === TYPES.partEnabled_policy") 分润政策未全部设置或未全部启用
                  div(v-if="scope.row.policy_status === TYPES.noEnabled_policy")
                    div a）分润政策未全部设置并且未全部启用
                    div b）分润政策已全部设置但是未全部启用
          el-table-column(:label="item", style="width: 10%", v-for="(item,inx) in dateList" :key="item", align="center")
            template(slot-scope="scope")
              span(:class="{'roomtype-color': scope.row.room_type.type[inx].status === TYPES.roomType}") {{scope.row.room_type.type[inx].type}}

          el-table-column(label="操作", style="width: 15%")
            template(slot-scope="scope")
              p
                el-button(size="small", type="text", @click="editRoomType(scope.row.id)", v-if="orgType === TYPES.company") 编辑
              p
                el-button(size="small", type="text", v-if="orgType === TYPES.company && !selfHotel", @click="delRoomType(scope.row, scope.$index)") 删除
              p
                el-button(size="small", type="text", @click="toAddPackage(scope.row)", v-if="orgType === TYPES.company && !selfHotel") 价格添加
              p
                el-button(size="small", type="text", @click="_settingPolicy(scope.row, scope.$index, 2)") 政策设置
              //- p 
              //-   el-button(size="small", type="text", @click="_changeRoomStatus(scope.row)", v-if="orgType === TYPES.company") {{scope.row.status | roomStatus}}
    .no-data(v-else)
        .tips
          .span 无数据信息
          el-button(type="primary", @click="_addRoomType", v-if="orgType === TYPES.company && !selfHotel") 添加房型
    el-dialog(
      title="选择房型",
      :visible.sync="centerDialogVisible",
      width="80%",
      center
      )
      .exist-room-type
        .room-type-name 选择酒店已有房型
        el-radio-group(v-if="roomTypeList.length",class="radio-type", v-model="radioType", @change="changeModelRoomType")
          el-radio(class="item-radio-type", v-for="item in roomTypeList", :key="item.id", :label="item.id") {{item.name}}
        .noData(v-else) 暂无可选房型
      .search-room-type
        .room-type-name 选择酒店房型管理中已有房型
        //- .search-roomType
        //-   el-input(class="search-name", v-model="roomType_name")
        //-   span(class="search-btn", @click="_searcheRoomType") 搜索
        el-radio-group(v-if="selfRoomTypeList.length", class="radio-type search-radio", v-model="radioSearchType", @change="changeSearchRoomType")
          el-radio(class="item-radio-type", v-for="item in selfRoomTypeList", :key="item.id", :label="item.id") {{item.name}}
        .noData(v-else) 暂无可选房型
      .text
        span 注：房型为平台所有房型，如没有对应房型，可选择酒店内没有用过的房型，进行内容修改。如果需要增加房型，请在
        span(class="to-room-type", @click="toRoomTypeModal") [酒店产品- 房型管理]
        span 模块添加房型。
      .footer(slot="footer")
        el-button(type="primary", @click="centerDialogVisible=false") 取消 
        el-button(type="primary", :disabled="addRoomTypeBtn", @click="changeRoomType") 确认
    el-dialog(
      title="分润政策设置",
      :visible.sync="policyDialogVisible",
      width="28%",
     )
      .content
        .select
          el-select(class="elselect" v-model="policyType" placeholder="请选择分润政策", clearable, @change="_selectPolicyType" )
            el-option(v-for="(item, index) in policyTypeList", :key="index", :label="item.label", :value="item.value")
        .set-policy(v-if="policyType === TYPES.customizeProfitPolicy || policyType === TYPES.baseProfitPolicy")
          .gread(v-if="policyType === TYPES.baseProfitPolicy")
            span 一级拉新分润设置：
            span {{base_greadOneVal}}
            span(v-if="IsToSetPolicy") 0 
            span(v-else-if="!IsToSetPolicy && greadType === TYPES.rate") %
            span(v-else) 元
          .gread(v-if="policyType === TYPES.customizeProfitPolicy")
            el-input(v-model="greadOneVal", placeholder="设置分润")
            el-select(v-model="greadType")
              el-option(
                v-for="item in greadTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.company") 一级分润价格 = 批发差价*设置比例%
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.department") 一级分润价格 = 批零差价*设置比例%
          .desc(v-if="greadType === TYPES.amount") 一级分润价格 = 设置价格
          .gread(v-if="policyType === TYPES.baseProfitPolicy")
            span 二级拉新分润设置：
            span {{base_greadTwoVal}}
            span(v-if="IsToSetPolicy") 0 
            span(v-else-if="!IsToSetPolicy && greadType === TYPES.rate") %
            span(v-else) 元
          .gread(v-if="policyType === TYPES.customizeProfitPolicy")
            el-input(v-model="greadTwoVal", placeholder="设置分润")
            el-select(v-model="greadType")
              el-option(
                v-for="item in greadTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.company") 二级分润价格 = 批发差价*设置比例%
          .desc(v-if="greadType === TYPES.rate && orgType === TYPES.department") 二级分润价格 = 批零差价*设置比例%
          .desc(v-if="greadType === TYPES.amount") 二级分润价格 = 设置价格
        .tips
          div
            div 提示:
            div(v-if="orgType === TYPES.company") 【批发差价】批发差价 = 结算价 - 成本价
            div(v-if="orgType === TYPES.department") 【批零差价】批零差价 = 销售价 - 结算价
            div 【结算价】在供应商上架产品时提供的结算价格
            div(v-if="orgType === TYPES.company") 【成本价】供应商提供的成本价格。
            div(v-if="orgType === TYPES.department") 【销售价】供应商上架产品时设置的销售价格。
            div(v-if="policyType !== '1'", class="zhu") 注:
              div(v-if="greadType === TYPES.rate") 如设置的一级分润比例与二级分润比例不可大于100%，否则将不可设置。输入的数值为整数且大于0。
              div(v-else)
                div(v-if="orgType === TYPES.company") 如设置的一级分润金额与二级分润金额之和小于批发差价，则设置的政策启用，否则政策不启用
                div(v-if="orgType === TYPES.department") 如设置的一级分润金额与二级分润金额之和小于批零差价，则设置的政策启用，否则政策不启用
        .foot(v-if="!IsToSetPolicy")
          el-button(type="primary", @click="policyDialogVisible = false") 取消
          el-button(type="primary", @click="savePolicy") 保存
        .foot(v-if="IsToSetPolicy && policyType === TYPES.baseProfitPolicy")
          el-button(class="long-btn", type="primary", @click="toSettinPolicy") 去设置基础分润政策 
    el-dialog(
      title="提示",
      :visible.sync="confirmVisible",
      width="28%",
     )
      .content
        div
          p 如果酒店部分套餐已设置分润政策，设置后将覆盖之前数据，是否继续？
          p （分润政策生效时间约1分钟至5分钟，如未更新政策需耐心等待。）
        .foot
          el-button(type="primary", @click="confirmVisible = false") 取消
          el-button(type="primary", @click="_saveConfirmPolicy") 保存
</template>

<script>
import {
  promise_getRoomType,
  promise_getRoomTypeList,
  // promise_searchRoomTemp, 
  promise_changePackagePriceStatus,
  promise_changePackageStatus,
  promise_changeRoomStatus,
  promise_deletePackage,
  promise_deleteRoomType,
  promise_roomPackagePolicySave,
  promise_getroomPackagePolicyInfo,
  promise_policySetList,
  hotel_roomExiteSave
  } from 'src/api/promise_api'
import { mergeApi } from "src/api/hotel.js";
import  * as format from 'src/utils/format'

export default {
  data() {
    return {
      orgType: "",//3分公司，5营业部
      TYPES: {
        company: '3',//分公司,
        department: '5',//营业部
        jinyong: '0', //禁用
        qiyong: '1', //启用
        shangjia: 0,
        xiajia: 1,
        roomType: 0, //异常 字体标红
        has_booking_rule: 1, //有预定规则
        noProfitPolicy: '1',//暂不设置政策
        customizeProfitPolicy: '2', //自定义分润政策
        baseProfitPolicy: '3', //基础分润政策
        amount: '2', //金额
        rate: '1', //百分比
        allEnabled_policy: 1, //全部启用政策
        partEnabled_policy: 2, //部分启用政策
        noEnabled_policy: 3, //未启用政策
      },
      hotelName: "",
      hotelId: "",
      supplier: "",
      pickerDate: format.date(new Date()),
      datePackageList:[],
      roomPackageList: [],
      roomTypeList: [],
      dateList: [],
      centerDialogVisible: false,//选择房型弹框
      policyDialogVisible: false,//分润设置弹框
      confirmVisible: false,//确认弹框
      isEdit: false,
      radioType: "",
      // selfHotel: false,
      supplierList: [
        {
          value: "1",
          label: "自营"
        },
        // {
        //   value: "2",
        //   label: "携程旅行"
        // }
      ],
      roomType_name: "",
      selfRoomTypeList: [],
      radioSearchType: "",
      addRoomTypeBtn: true,
      policyType: "1",
      policyTypeList: [
        {
          value: '1',
          label: '暂不设置政策'
        },
         {
          value: '3',
          label: '基础分润政策'
        },
         {
          value: '2',
          label: '自定义分润政策'
        }
      ],
      greadOneVal: "",
      greadTwoVal: "",
      base_greadOneVal: "",
      base_greadTwoVal: "",
      greadType: "1",
      greadTypeOptions: [
        {
          value: '1',
          label: '%'
        },
        {
          value: '2',
          label: '元'
        },
      ],
      settingPolicyType: "",
      settingPolicyTypeId: "",
      IsToSetPolicy: false
    }
  },
  computed: {
    selfHotel() {
      let selected = this.supplierList.find(item => item.id == this.supplier);
      return selected ? selected.is_self : false;
    }
  },
  filters: {
    Allfoots(value) {
      const num = value * 1;
      switch (num) {
        case 0:
          return "含餐";
          break;
        case 1:
          return "早餐";
          break;
        case 2:
          return "中餐";
          break;
        case 3:
          return "晚餐";
          break;
        case 6:
          return "早+中";
          break;
        case 7:
          return "早+晚";
          break;
        case 8:
          return "全餐";
          break;
        case 9:
          return "中+晚";
          break;
        case 10:
          return "无餐";
          break;
        default:
          break;
      }
    },
    roomStatus(val) {
      return val === "1" ? "下架" : "上架"
    },
  },
  watch:{
    pickerDate() {
      this.sevenDate()
    },
  },
  mounted() {
    this.orgType = localStorage.getItem('orgtype');
    this.hotelId = this.$route.query.hotel_id
    this.supplier = (this.$route.query.channel =="0"|| !this.$route.query.channel)?"2":this.$route.query.channel 
    this.sevenDate()
    this._getHotelRoomTypeStatusList()
    this.getSupplier()
  },
  methods: {
    async getSupplier() {
        let supplier = await mergeApi.getSupplier();
        let { code, data, msg } = supplier;
        if (code != 0) return this.$message.error(msg);
        // data.unshift({
        //     id: "0",
        //     name: "全部"
        // });
        this.supplierList = data.map(v => {
            return {
                id: String(v.id),
                name: v.name,
                is_self: v.is_self != 1   //  不等于1 是非自营 这里逻辑是反的
            };
        });
        this.supplier=  (this.$route.query.channel =="0"|| !this.$route.query.channel) ? this.supplierList[0].id : this.$route.query.channel 
      
    },
    toggleRowExpansion(row,expanded) {
      console.log(rwo, expanded)
    },
    async _selectPolicyType() {
      try {
        if(this.policyType == 3) {
          const { data: { code, data, msg } } = await promise_policySetList()

          if( code !== 0) return this.IsToSetPolicy = true
          this.greadType = data.style
          this.base_greadOneVal = data.one_level
          this.base_greadTwoVal = data.two_level
        } else {
          this.IsToSetPolicy = false
          this.greadType = "1"
        }

      }
      catch(err) {
        console.log(err)
      }
    },
    async _saveConfirmPolicy() {
      this.confirmVisible = false
      // return console.log(typeof this.policyType,this.greadOneVal,this.base_greadOneVal)
      let one_level = null
      let two_level = null
      if(this.policyType === '2') {
        one_level = this.greadOneVal
        two_level = this.greadTwoVal
      }
      if(this.policyType === '3') {
        one_level = this.base_greadOneVal
        two_level = this.base_greadTwoVal
      }
      
      const params = {
        data: {
          policy_id: this.policyType,
          product_id: this.hotelId,
          room_id: this.settingPolicyType === 2 ? this.settingPolicyTypeId : "",
          package_id: this.settingPolicyType === 1 ? this.settingPolicyTypeId : "",
          style: this.greadType,
          one_level: one_level,
          two_level: two_level,
          style2: this.greadType
        }
      }
      try {
        const { data: { code, data, msg }} = await promise_roomPackagePolicySave(params)

        if(code !== 0) return this.$message.warning(msg)
        this.$message.success("设置成功")
        this.greadOneVal = ""
        this.greadTwoVal = ""
        this._getHotelRoomTypeStatusList()
      }
      catch(err) {
        console.log(err)
      }
    },
  //  async _searcheRoomType() {
  //    if(!this.roomType_name) return this.$message.warning("搜索内容不能为空")
  //    try {
  //      const params = {
  //        data: {
  //          name: this.roomType_name
  //        }
  //      }
  //      const { data } = await promise_searchRoomTemp(params, true)

  //      if(data.code !== 0) return this.$message.warning(data.msg)
  //      this.searchRoomTypeList = data.data
  //    }
  //    catch(err) {
  //      console.log(err)
  //    }
  //   },
    changeProvider(val) {
      // this.selfHotel = val === '1' ? false : true;
      this._getHotelRoomTypeStatusList()
    },
    toEditEveryPrice(item, index, type) {
      //type 1是有价格信息 0是无价格信息
        const y = this.pickerDate.slice(0, 4)
        const m = this.dateList[index].slice(0, 2)
        const d = this.dateList[index].slice(-3, -1)
        const room_name = this.roomPackageList.filter(it=>  item.room_id === it.id )
        if(this.isEdit) return
      if(type) {
        const price_id = item.price_date[index][0].id
        this.$router.push({
          path: '/hotel/packagePrice',
          query: {
            hotelName: this.hotelName,
            package_id: item.id,
            room_name: room_name[0].name,
            package_name: item.name,
            price_id: price_id,
            price_date: `${y}-${m}-${d}`,
            hotelId: this.hotelId
          }
        })
      } else {
        this.$router.push({
          path: '/hotel/packagePrice',
          query: {
            hotelName: this.hotelName,
            package_id: item.id,
            room_name: room_name[0].name,
            package_name: item.name,
            price_date: `${y}-${m}-${d}`,
            hotelId: this.hotelId
          }
        })
      }
    },
    _preSeven() {
      const sevenDays = 1000 * 3600 * 24 * 7;
      this.pickerDate = format.date((new Date(this.pickerDate).getTime()) - sevenDays);
      // 置空
      this.roomPackageList = [];
      this._getHotelRoomTypeStatusList();
    },
    _lastSeven() {
      const sevenDays = 1000 * 3600 * 24 * 7;
      this.pickerDate = format.date((new Date(this.pickerDate).getTime()) + sevenDays);  
      // 置空
      this.roomPackageList = [];
      this._getHotelRoomTypeStatusList();
    },
    async _changeDate(val) {
      this.pickerDate = format.date(val);
      this._getHotelRoomTypeStatusList();
    },
    async _getRoomTypeList() {//获取房型列表
      const params = {
        data: {
          product_id: this.hotelId
        }
      }
      try {
        const { data: {code, data, msg} } = await promise_getRoomTypeList(params, true)

        if(code !== 0) return this.$message.error(msg)
        this.roomTypeList = data.list
        this.selfRoomTypeList = data.Selflist
      } catch(err) {
        console.log(err)
      }
    },
    async _getHotelRoomTypeStatusList() {//获取状态列表
      const params = {
         data: {
           product_id: this.hotelId,// 53960,//
           start_date: this.pickerDate,
           channel: this.orgType == 3 ? this.supplier : ""
         }
      }
      try {
        const {data} = await promise_getRoomType(params, true)
        if(data.code !== 0) return this.$message.error(data.msg)
    
        // 处理数据
        this.hotelName = data.data.product_info.name;
        this.hotelId = data.data.product_info.id

        let room_list = data.data.room_list;
  
        for(let i=0; i<room_list.length;i++){
          // room_list[i].policy_status = 1
          let room_list_item = room_list[i].package_list;
          let package_price_info = room_list[i].room_type.package_price_info;
          let type_list = room_list[i].room_type.type
          for(let y=0; y<room_list_item.length; y++){
            let arr = [];
            for(let k=0; k<type_list.length; k++){
              if(package_price_info[room_list_item[y].id][type_list[k].date].length) {
                arr.push(package_price_info[room_list_item[y].id][type_list[k].date])
              } else {
                arr.push([])
              }
            }
            room_list_item[y].price_date = arr;
          }
        }
        this.roomPackageList = room_list;
        let nowDate = new Date(format.date(new Date()))
        
        let currentDate = new Date(this.pickerDate)
        currentDate < nowDate ? this.isEdit = true : this.isEdit = false
         
      } catch(err) {
        console.log(err)
      }
    },
    async handleStartUsing(status, row, index, event) {
     if(event) event.stopPropagation();
      const params = {
        data: {
          price_id: row.price_date[index][0].id,
          package_id: row.id,
          status: status
        }
      }
     
      try {
        const { data } = await promise_changePackagePriceStatus(params)

        if(data.code !==0) return this.$message.error(data.msg)
        this._getHotelRoomTypeStatusList()
      }
      catch(err) {
        console.log(err)
      }
    },
    async _changeRoomStatus(row) {
      const params = {
        data: {
          room_id: row.id,
          status:row.status === "1" ? "0" : "1"
        }
      }
      try {
        const { data } = await promise_changeRoomStatus(params)

        if(data.code !== 0) return this.$message.error(data.msg)
        this.$message.success(data.msg)
        this._getHotelRoomTypeStatusList()
      }
      catch(err) {
        console.log(err)
      }
    },
    async _changePackageStatus(row) {
      const params ={
        data:{
          package_id: row.id,
          status: row.status == "1" ? "0" : "1"
        }
      }
      try {
        const { data } = await promise_changePackageStatus(params)
        
        if(data.code !== 0) return this.$message.error(data.msg)
        this.$message.success(data.msg)
        this._getHotelRoomTypeStatusList()
      }
      catch(err) {
        console.log(err)
      }
    },
    deletePackage (row, index) {
      this.$confirm('确定删除该套餐吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  
        this._deletePackage(row, index)
      })
    },
    async _deletePackage(row, index) { 
      try {     
        const { data } = await promise_deletePackage({data: {package_id: row.id}})

        if(data.code !== 0) return this.$message.error(data.msg)
        this.$message.success("删除成功")
        // this._getHotelRoomTypeStatusList()
        this.roomPackageList.forEach((item,ind) => {
          row.room_id === item.id && this.roomPackageList[ind].package_list.splice(index, 1)
        })
        this.$refs.multipleTable.toggleRowExpansion(row, true)
      }
      catch(err) {
        console.log(err)
      }
    },
    async _settingPolicy(item, index, type) {
      this.greadOneVal = ""
      this.greadTwoVal = ""
      this.policyDialogVisible = true
      this.settingPolicyType = type
      this.policyType = '1'
      this.settingPolicyTypeId = item.id
      const params = {
        data: {
          package_id: type === 1 ? item.id : "",
          room_id: type === 2 ? item.id : "",
          product_id: this.hotelId
        }
      }
      try {
        const { data: { code, data, msg } } = await promise_getroomPackagePolicyInfo(params)

        if(code !== 0) return
        this.policyType = data.policy_id + ""
        this.greadType = data.style
        if(data.policy_id === '2') {
          this.greadOneVal= data.one_level
          this.greadTwoVal = data.two_level
        } else {
          this.base_greadOneVal = data.one_level
          this.base_greadTwoVal = data.two_level
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    toSettinPolicy() {
      this.$router.push('/policy/profitSetting')
    },
    savePolicy() {
      if(this.policyType === '2') {
        if(!this.greadOneVal && !this.greadTwoVal) return this.policyDialogVisible = false
        if(!this.greadOneVal || !this.greadTwoVal) return this.$message.warning('分润设置不能为空')
        
        if(this.greadType === '1') {
          const regu = /^\d*$/
          if(!regu.test(this.greadOneVal) || !regu.test(this.greadTwoVal)) return this.$message.warning("输入数据有误，请重新输入")
          if ((this.greadOneVal * 1 + this.greadTwoVal * 1) > 100 ) {
            return this.$message.warning('一级分润比例与二级分润比例不可大于100%')
          } 
        } else if(this.greadType === '2') {
          const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/    //正数（包括小数）
          if(!reg.test(this.greadOneVal) || !reg.test(this.greadTwoVal)) return this.$message.warning("输入数据有误，请重新输入")
        }
      }
      this.policyDialogVisible = false
      this.confirmVisible = true
    },
    toRoomTypeModal() {
      this.$router.push('/hotel/hotelroomsTypeList')
    },
    toEditPackage(row) {
      // this.$router.push(`/hotel/roomtPackageEdit?package_id=${row.id}&hotelId=${this.hotelId}`)
      this.$router.push({
        path:'/hotel/roomtPackageEdit',
        query: {
          hotelId: this.hotelId,
          package_id: row.id,
          room_id: row.room_id,
          supplier: this.supplier
        }
      })
    },
    async changeRoomType() {
      if(!this.radioType &&  !this.radioSearchType) return this.addRoomTypeBtn = true
      if(this.radioType) {
        const params = {
          data: {
            room_id: this.radioType,
            product_id: this.hotelId,
            channel: this.supplier
          }
        }
        const { data: {code, data, msg}} = await hotel_roomExiteSave(params)

        if(code !== 0) return this.$message.warning(msg)
        this.centerDialogVisible = false
        this._getHotelRoomTypeStatusList()
      }
      if(this.radioSearchType) this.$router.push({
        path: '/hotel/hotelroomtypeEdit',
        query: {
          room_modal_id: this.radioSearchType,
          hotel_id: this.hotelId,
          add: "1",
          channel: this.supplier
        }
      })
    },
    _addRoomType() {
      this.centerDialogVisible = true;
      this._getRoomTypeList()
    },
    delRoomType(row, index) {
      this.$confirm('确定删除该房型吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._delRoomType(row, index)
        })
    },
    async _delRoomType(row, index) {
      const params = {
        data: {
          product_id: this.hotelId,
          room_id: row.id
        }
      }
      try {     
        const { data } = await promise_deleteRoomType(params, true)

        if(data.code !== 0) return this.$message.warning(data.msg)
        // this.roomPackageList.splice(index ,1)
        this._getHotelRoomTypeStatusList()
      }
      catch(err) {
        console.log(err)
      }
    },
    editRoomType(row) {
      this.$router.push({
        path: '/hotel/hotelroomtypeEdit',
        query: {
          roomId: row,
          hotel_id: this.hotelId,
          supplier: this.supplier
        }
      })
      // this.$router.push(`/hotel/hotelroomtypeEdit?roomId=${row}&hotel_id=${this.hotelId}`)
    },
    toAddPackage(row) {
      this.$router.push({
        path: '/hotel/roomtPackageEdit',
        query:{
          hotelName: this.hotelName,
          hotelId: this.hotelId,
          room_id: row.id,
          IsAddPage: '1',
          supplier: this.supplier
        }
      })
    },
    sevenDate() {
      let dateList = []
      for(let i = 0;i < 7;i++) {
        let newDate = new Date(new Date(this.pickerDate).getTime() + 1000 * 3600 * 24 * i)
        
        dateList.push(this.formatDate(newDate))
      }
      this.dateList = dateList;
    },
    formatDate(date) {
     const m = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
     const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
     return `${m}月${d}日`
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 11,
            date: "2016-05-02",
            bedType: "1234567",
          }, {
            id: 22,
            date: "2016-05-02",
            bedType: "dfghhgfd",
          }
        ])
      }, 1000)
    },
    changeModelRoomType() {
      this.addRoomTypeBtn = false
      if(this.radioType) this.radioSearchType = ""
    },
    changeSearchRoomType() {
      this.addRoomTypeBtn = false
      if(this.radioSearchType) this.radioType = ""
    },
    editBatchPrice(val) {
      
      this.$router.push({
        path:'/hotel/BatchPriceEdit',
        query:{
          hotelId: this.hotelId,
          hotelName: this.hotelName,
          supplier: this.supplier,
          batchPrice: val === 'price' ? '1' : '0',
          batchStatus: val === 'status' ? '1' : '0'
        }
      })
    }
  }
}
</script>
<style>
.el-table td .cell {
    height: auto;
    max-height: 150px;
}
.el-table__expanded-cell[class*="cell"] {
    padding: 0;
}
</style>


