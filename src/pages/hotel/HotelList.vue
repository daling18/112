<style lang="stylus" scoped>
@import '../../assets/stylus/mixin.styl'
.hotel
  .system-search
    padding-top: 25px;
    padding-bottom: 15px;
    padding-left: 20px;
    margin-bottom: 10px;
    background: #fff;
    .system-search-box
      display flex
      flex-wrap wrap
      .item-search
        overflow hidden
        height 35px
        line-height 35px
        margin 0 15px 10px 0
        .label
          float left
          margin-right 10px
        .elinput
          float left
        .id
          width 120px
        .name
          width 170px
        .elselect
          width 130px
  .hotel-list
    padding 0 10px
    background #fff
    .table-btn
      cursor pointer
    .qiyong
      color green
    .jinyong
      color red
    .policy-icon
      margin-right 5px
      color #ffffff
      .policy-icon-gray
        background gray 
      .policy-icon-primary
        background $color-theme
    .icon-tips
      position absolute
      right 2px
      top 8px
      span
        border-radius 50%
        margin-left 5px
        padding 0 5px
    .icon-tips-primary
      color $color-theme
  .operate-btns
    padding 20px 10px 20px
    background #fff
    .long-btn
      width 120px
  .pagin
    padding: 20px 0
    background #fff
    text-align center
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
  .hotel
    .system-search
      .system-search-box
        .item-search
          .label 酒店ID
          el-input(class="elinput id" v-model="filters.hotel_id" placeholder="请输入酒店ID")
        .item-search
          .label 酒店名称
          el-input(class="elinput name" v-model="filters.hotel_name" placeholder="请输入酒店名称")
        .item-search
          .label 城市
          zone-autocomplete(class="elselect",v-model="filters.city_name")
          //- el-input(class="elinput" v-model="filters.city_name" placeholder="请输入城市名称")
        .item-search
          .label 酒店星级
          el-select(class="elselect", v-model="filters.star_code", clearable, placeholder="请选择酒店星级")
            el-option(v-for="(item, index) in starList", :key="index", :label="item.label", :value="item.value")
        .item-search(v-if="orgType === TYPES.company")
          .label 供应商
          el-select(class="elselect", v-model="filters.supplier" placeholder="请选择供应商")
            el-option(v-for="(item, index) in supplierList", :key="index", :label="item.name", :value="item.id")
        .item-search(v-if="orgType === TYPES.company")
          .label 酒店状态
          el-select(class="elselect", v-model="filters.status")
            el-option(v-for="(item, index) in hotelStatus", :key="index", :label="item.label", :value="item.value")
        .item-search
          .label 分润政策
          el-select(class="elselect", v-model="filters.policy" placeholder="请选择分润政策", clearable)
            el-option(v-for="(item, index) in policyList", :key="index", :label="item.label", :value="item.value")
        .item-search.search-button
          el-button(type="primary", @click="searchHotelList")  搜索
    .operate-btns
      //- el-button(type="primary")  全选/取消
      el-button(type="primary", v-if="orgType === TYPES.company", @click="addHotel")  增加酒店
      el-button(type="primary", v-if="orgType === TYPES.company", @click="_changeAllHotelStatus(1)")  批量启用
      el-button(type="primary", v-if="orgType === TYPES.company", @click="_changeAllHotelStatus(0)")  批量禁用
      el-button(type="primary", class="long-btn",  @click="_addPolicy") 批量增加分润政策
    .hotel-list
       el-table(class="primary-table", :data="hotelList", border, style="width:100%", @select="selectTable", @select-all="allSelectTable")
        el-table-column(type="selection", label="选择")
        el-table-column(prop="product_id", label="酒店ID", header-align="center", width="120")
        el-table-column(prop="hotel_name", label="酒店名称", header-align="center")
          template(slot-scope="scope")
            span(class="policy-icon", v-if="scope.row.policy_status !== 0")
              span(:class="{'policy-icon-primary': scope.row.policy_status === TYPES.allEnabled_policy || scope.row.policy_status === TYPES.partEnabled_policy, 'policy-icon-gray': scope.row.policy_status === 3}") 政
            span {{scope.row.hotel_name}}
            el-tooltip(placement="right-end", v-if="scope.row.policy_status === TYPES.partEnabled_policy || scope.row.policy_status === TYPES.noEnabled_policy")
              i(:class="{'el-icon-warning': true, 'icon-tips': true, 'icon-tips-primary': scope.row.policy_status === TYPES.partEnabled_policy}")
              div(slot="content")
                span(v-if="scope.row.policy_status === TYPES.partEnabled_policy") 酒店分润政策未全部设置或未全部启用
                div(v-if="scope.row.policy_status === TYPES.noEnabled_policy")
                  div a）酒店分润政策未全部设置并且未全部启用
                  div b）酒店分润政策已全部设置但是未全部启用
        el-table-column(prop="address", label="地址", header-align="center")
        el-table-column(prop="star", label="星级", header-align="center",width="120", align="center")
        //- el-table-column(prop="channel", label="代理商", header-align="center",width="120", align="center")
        el-table-column(
          prop="status",
          label="状态",
          header-align="center",
          width="60",
          align="center",
          v-if="orgType === TYPES.company"
          )
          template(slot-scope="scope")
            span(:class="{'qiyong':scope.row.status === '启用', 'jinyong':scope.row.status === '禁用'}") {{scope.row.status}}
        el-table-column(label="操作", header-align="center", width="280", align="center")
          template(slot-scope = "scope")
            span(class="table-btn", v-if="orgType === TYPES.company", @click="toHotelEdit(scope.row.product_id)") 编辑 
            span(class="table-btn", v-if="orgType === TYPES.company", @click="_changeHotelStatus(1,scope.row.product_id)") | 启用 
            span(class="table-btn", v-if="orgType === TYPES.company", @click="_changeHotelStatus(0,scope.row.product_id)") | 禁用 | 
            span(class="table-btn", @click="toRoomStatus(scope.row.product_id)") 查看房态 
            span(class="table-btn", @click="_settingPolicy(scope.row.product_id)") | 政策设置
    el-pagination(class="pagin", layout="prev, pager, next", @current-change="currentPageChange", :total="hotelTotal", :page-size="pageSize", :current-page="page_index")
    profit-setting(
      :greadnum="greadType",
      :profitData="profitData",
      :IsToSetPolicy="IsToSetPolicy",
      :policyDialogVisible="policyDialogVisible_components",
      @conceldialog="cancelDialog",
      @submitProfit="_saveConfirmPolicy",
      @getBaseProfit="_selectPolicyType",
      @toSettinPolicy="toSettinPolicy",
      )
    //- el-dialog(
    //-   title="分润政策设置",
    //-   :visible.sync="policyDialogVisible",
    //-   width="28%",
    //-  )
    //-   .content
    //-     .select
    //-       el-select(class="elselect" v-model="policyType" placeholder="请选择分润政策", clearable, @change="_selectPolicyType")
    //-         el-option(v-for="(item, index) in policyTypeList", :key="index", :label="item.label", :value="item.value")
    //-     .set-policy(v-if="policyType === '2' || policyType === '3'")
    //-       .gread(v-if="policyType === '3'")
    //-         span 一级拉新分润设置：
    //-         span {{base_greadOneVal}}
    //-         span(v-if="IsToSetPolicy") 0
    //-         span(v-else-if="!IsToSetPolicy && greadType === '1'") %
    //-         span(v-else) 元
    //-       .gread(v-if="policyType === '2'")
    //-         el-input(v-model="greadOneVal", placeholder="设置分润")
    //-         el-select(v-model="greadType")
    //-           el-option(
    //-             v-for="item in options"
    //-             :key="item.value"
    //-             :label="item.label"
    //-             :value="item.value")
    //-       .desc(v-if="greadType === '1' && orgType === '3'") 一级分润价格 = 批发差价*设置比例%
    //-       .desc(v-if="greadType === '1' && orgType === '5'") 一级分润价格 = 批零差价*设置比例%
    //-       .desc(v-if="greadType === '2'") 一级分润价格 = 设置价格
    //-       .gread(v-if="policyType === '3'") 
    //-         span 二级拉新分润设置：
    //-         span {{base_greadTwoVal}}
    //-         span(v-if="IsToSetPolicy") 0
    //-         span(v-else-if="!IsToSetPolicy && greadType === '1'") %
    //-         span(v-else) 元
    //-       .gread(v-if="policyType === '2'")
    //-         el-input(v-model="greadTwoVal", placeholder="设置分润")
    //-         el-select(v-model="greadType")
    //-           el-option(
    //-             v-for="item in options"
    //-             :key="item.value"
    //-             :label="item.label"
    //-             :value="item.value")
    //-       .desc(v-if="greadType === '1' && orgType === '3'") 二级分润价格 = 批发差价*设置比例%
    //-       .desc(v-if="greadType === '1' && orgType === '5'") 二级分润价格 = 批零差价*设置比例%
    //-       .desc(v-if="greadType === '2'") 二级分润价格 = 设置价格
    //-     .tips
    //-       div
    //-         div 提示:
    //-         div(v-if="orgType === '3'") 【批发差价】批发差价 = 结算价 - 成本价
    //-         div(v-else) 【批零差价】批零差价 = 销售价 - 结算价
    //-         div 【结算价】在供应商上架产品时提供的结算价格
    //-         div(v-if="orgType === '3'") 【成本价】供应商提供的成本价格。
    //-         div(v-if="orgType === '5'") 【销售价】供应商上架产品时设置的销售价格。
    //-         div(v-if="policyType !== '1'", class="zhu") 注:
    //-           div(v-if="greadType === '1'") 如设置的一级分润比例与二级分润比例不可大于100%，否则将不可设置。输入的数值为整数且大于0。
    //-           div(v-else)
    //-             div(v-if="orgType === '3'") 如设置的一级分润金额与二级分润金额之和小于批发差价，则设置的政策启用，否则政策不启用
    //-             div(v-if="orgType === '5'") 如设置的一级分润金额与二级分润金额之和小于批零差价，则设置的政策启用，否则政策不启用
    //-     .foot(v-if="!IsToSetPolicy")
    //-       el-button(type="primary", @click="policyDialogVisible = false") 取消
    //-       el-button(type="primary", @click="savePolicy") 保存
    //-     .foot(v-if="IsToSetPolicy && policyType === '3'")
    //-       el-button(class="long-btn", type="primary", @click="toSettinPolicy") 去设置基础分润政策 
    //- el-dialog(
    //-   title="提示",
    //-   :visible.sync="confirmVisible",
    //-   width="28%",
    //-  )
    //-   .content
    //-     div
    //-       p 如果酒店部分套餐已设置分润政策，设置后将覆盖之前数据，是否继续？
    //-       p （分润政策生效时间约1分钟至5分钟，如未更新政策需耐心等待。）
    //-     .foot
    //-       el-button(type="primary", @click="confirmVisible = false") 取消
    //-       el-button(type="primary", @click="_saveConfirmPolicy") 保存
    
</template>

<script>
import { promise_getHotelList, promise_hotelStatus} from 'src/api/promise_api'
import { promise_policySetList, promise_getroomPackagePolicyInfo, promise_roomPackagePolicySave } from 'src/api/policy'
import ZoneAutocomplete from './components/HotelZoneAutocomplete.vue';
import ProfitSetting from 'src/components/template/policy/ProfitSetting.vue'
import { mergeApi } from "src/api/hotel.js";

export default {
  data() {
    return {
      orgType: "",
      TYPES: {
        company: '3',//分公司,
        department: '5',//营业部
        noProfitPolicy: '1',//暂不设置政策
        customizeProfitPolicy: '2', //自定义分润政策
        baseProfitPolicy: '3', //基础分润政策
        amount: '2', //金额
        rate: '1', //百分比
        allEnabled_policy: 1, //全部启用政策
        partEnabled_policy: 2, //部分启用政策
        noEnabled_policy: 3, //未启用政策
      },
      hotelTotal: null,
      pageSize: 10,
      filters:{
        hotel_id: "",
        hotel_name: "",
        city_name: "",
        star_code: "",
        supplier: "0",
        status: "",
        policy: "",
      },
      page_index: 1,
      hotelList: [],
      starList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0,0",
          label: "无星/经济型",
        },
        {
          value: "1,0",
          label: "一星/经济型",
        },
         {
          value: "2,0",
          label: "二星/经济型",
        },
        {
          value: "3,0",
          label:"三星/舒适型",
        },
        {
          value: "4,0",
          label:"四星/高档型",
        },
        {
          value: "5,0",
          label:"五星/豪华型",
        },
        {
          value: "1,1",
          label: "一钻/经济型",
        },
         {
          value: "2,1",
          label: "二钻/经济型",
        },
        {
          value: "3,1",
          label:"三钻/舒适型",
        },
        {
          value: "4,1",
          label:"四钻/高档型",
        },
        {
          value: "5,1",
          label:"五钻/豪华型",
        },
      ],
      supplierList: [
        {
          id: "0",
          name: "全部"
        }
        // {
        //   value: "1",
        //   label: "酒店事业部"
        // },
        // {
        //   value: "2",
        //   label: "携程旅行"
        // }
      ],
      statusList: [],
      statusList_id: [],
      hotelStatus: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "启用",
        },
        {
          value: "0",
          label: "禁用",
        },
      ],
      policyList: [
        {
         value: "",
         label: '全部'
        },
        {
         value: "0",
         label: '无政策'
        },
        {
          value: "1",
          label: "政策已启用"
        },
         {
          value: "2",
          label: '政策部分启用'
        },
         {
          value: "3",
          label: '政策未启用'
        }
      ],
      // policyType: "1",
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
      // policyDialogVisible: false,
      policyDialogVisible_components: false,
      confirmVisible: false,
      // greadOneVal: "",
      // greadTwoVal: "",
      // base_greadOneVal: "",
      // base_greadTwoVal: "",
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
      // settingPolicyTypeId: "",
      hotel_ids: [],
      // isAllPolicy: false,
      hotel_id: "",
      IsToSetPolicy: false,
      profitData: {
        policyType: "1",
        greadOneVal: "",
        greadTwoVal: "",
        isAllPolicy: false,
        base_greadOneVal: "",
        base_greadTwoVal: "",
        policyType: "hotel"
      }
    }
  },
  components: {
    ZoneAutocomplete,
    ProfitSetting
  },
  mounted() {
    this._queryHotelList()
    this.orgType = localStorage.getItem('orgtype');
    this.getSupplier()
  },
  methods: {
  async getSupplier() {
        let supplier = await mergeApi.getSupplier();
        let { code, data, msg } = supplier;
        if (code != 0) return this.$message.error(msg);
        data.unshift({
            id: "0",
            name: "全部"
        });
        this.supplierList = data.map(v => {
            return {
                id: String(v.id),
                name: v.name
            };
        });
    },
    async _selectPolicyType(val) {
      if(val == "nobase") {
        // this.greadType = val
        this.IsToSetPolicy = false
        return
      } else if(val === "base") {
        const { data: { code, data, msg } } = await promise_policySetList()
  
        if( code !== 0) return this.IsToSetPolicy = true
        this.greadType = data.style
        this.profitData.base_greadOneVal = data.one_level
        this.profitData.base_greadTwoVal = data.two_level
      } else {
        this.greadType = val
      }
    },
    selectTable(row) {
      this.statusList = row
    },
    allSelectTable(row) {
      this.statusList = row
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
    async _changeAllHotelStatus(type) {
      this.statusList.forEach(item => {
        this.statusList_id.push(item.product_id)
      })
      const params = {
        data: {
          product_ids: this.statusList_id,
          status: type
        }
      }
      try{
        const { data } = await promise_hotelStatus(params, true)
      
        this.statusList_id = []
        if( data.code != 0) return this.$message.error(data.msg);
        this._queryHotelList();
      }
      catch(err) {
        console.log(err)
      }
    },
    async _changeHotelStatus(type, id) {
      const params = {
        data: {
          product_ids: [id],
          status: type
        }
      }
      try{
        const { data } = await promise_hotelStatus(params)
        
        if( data.code != 0) return this.$message.error(data.msg);
        this._queryHotelList();
      }
      catch(err) {
        console.log(err)
      }
    },
    toHotelEdit(id) {
      this.$router.push({
        path:'/hotel/hotelEdit',
        query:{
          hotel_id: id
        }
      })
    },
    async _queryHotelList(page) {
      try{
        const params = {
          data: {
            product_id:this.filters.hotel_id,
            product_name: this.filters.hotel_name,
            city_name: this.filters.city_name,
            star: this.filters.star_code,
            channel: this.filters.supplier,
            status: this.filters.status,
            policy_status: this.filters.policy,
            page_size: this.pageSize,
            page: page || 1
          }
        }
        const { data } = await promise_getHotelList(params, true)
        const res = data.data
        if(data.code != 0) return
        let hotelist = res.hotel_list
        hotelist.forEach(item => {
          item.status = item.status == 1 ? "启用" : "禁用"
          // item.policy_status = 3
        })
        this.hotelList = hotelist
        this.hotelTotal = res.total_count
      }
      catch(err) {

      }
    },
    _addPolicy() {
      this.profitData.isAllPolicy = true
      this.statusList.forEach(item => {
        this.hotel_ids.push(item.product_id)
      })
      this.policyDialogVisible_components = true
    },
    async _settingPolicy(id) {
      this.profitData.greadOneVal = ""
      this.profitData.greadTwoVal = ""
      this.profitData.isAllPolicy = false
      this.profitData.policyType = '1'
      this.policyDialogVisible_components = true
      // this.hotel_ids.push(id)
      this.hotel_id = id
      const params = {
        data: {
          package_id: "",
          room_id: "",
          product_id: id
        }
      }
      try {
        const { data: { code, data, msg } } = await promise_getroomPackagePolicyInfo(params)

        if(code !== 0) return
        this.profitData.policyType = data.policy_id + ""
        this.greadType = data.style
        if(data.policy_id === '2') {
          this.profitData.greadOneVal= data.one_level
          this.profitData.greadTwoVal = data.two_level
        } else {
          this.profitData.base_greadOneVal = data.one_level
          this.profitData.base_greadTwoVal = data.two_level
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    async _saveConfirmPolicy(params) {
      // this.policyDialogVisible_components = false
      params.product_id = params.product_id ? this.hotel_ids : this.hotel_id
      let paramss = {
        data: params
      }
      try {
        const { data: { code, data, msg }} = await promise_roomPackagePolicySave(paramss)

        if(code !== 0) return this.$message.warning(msg)
        this.$message.success("设置成功")
        this.greadOneVal = ""
        this.greadTwoVal = ""
        this._queryHotelList(this.page_index)
      }
      catch(err) {
        console.log(err)
      }
    },
     cancelConfirm() {
      this.confirmVisible = false
    },
    toRoomStatus(id) {
      this.$router.push(`/hotel/roomtStatus?hotel_id=${id}&channel=${this.filters.supplier}`)
    },
    searchHotelList() {
      this.page_index = 1;
      this._queryHotelList(1)
    },
    currentPageChange(page) {
      this.page_index = page;
      this._queryHotelList(page)
    },
    addHotel() {
      this.$router.push("/hotel/HotelEdit")
    },
    toSettinPolicy() {
      this.$router.push('/policy/profitSetting')
    },
    cancelDialog(val) {
      this.policyDialogVisible_components = !val
    }
  }
}
</script>


