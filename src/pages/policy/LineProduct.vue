<style lang="stylus" scoped>
.line-policy
  .search-form
    padding 25px 0 0 20px
    background #ffffff
    margin-bottom 10px
  .selects
    background #fff
    padding 10px 0
    .el-datepicker
      vertical-align middle
    .tripdate-btn
      vertical-align middle
    .fenge
      font-size 14px
      vertical-align middle
  .product-table
    background #fff
    padding 10px
    .batch-btn
      margin-bottom 10px
      span 
        margin-left 30px
        color red
    .table-box
      width 100%
      .span
        color #b10c79
      .span:hover
        cursor pointer
      .pagin
        text-align center
        padding 20px
</style>
<template lang="pug">
  .line-policy
    .system-tab
      ul.tab-box
        router-link(tag="li", :to="{path: '/policy/line-profitSetting'}") 分润政策设置
        router-link(class="on", tag="li", to="") 产品政策设置
    //- .system-search
    el-form(inline class="search-form")
      el-form-item
        el-input(v-model="search.keyword" placeholder="关键字")
      el-form-item
        el-input(v-model="search.product_no" placeholder="产品编号/供应商")
      el-form-item
        el-input(v-model="search.destination" placeholder="目的地")
      el-form-item
        el-input(v-model="search.price_interval_start" placeholder="价格区间")
      el-form-item
        span —
      el-form-item
        el-input(v-model="search.price_interval_end" placeholder="价格区间")
      el-form-item
        el-button(type="primary", @click="searchList") 搜索
    .selects
      filter-bar(v-model="filter" :data="filterData" @change="handleSearch")
        template(slot="departure_date")
          el-date-picker(
            v-model="search.depart_date_start"
            type="date"
            placeholder="行程时间"
            value-format="yyyy-MM-dd"
            class="el-datepicker"
            size="small"
          )
          span(class="fenge") --
          el-date-picker(
            v-model="search.depart_date_end"
            type="date"
            placeholder="行程时间"
            value-format="yyyy-MM-dd"
            class="el-datepicker"
            size="small"
          )
          el-button(type="primary", size="mini", class="tripdate-btn", @click="saveTripDate") 确定
    .product-table
      .batch-btn
        el-button(type="primary", @click="batchProfit") 批量政策设置
        span 注:如设置的一级分润金额与二级分润金额之和小于批零差价，则设置的政策启用，否则政策不启用
      .table-box
        el-table(class="primary-table", :data="tableList", border, style="width:100%", @select="selectTable", @select-all="allSelectTable")
          el-table-column(type="selection", label="选择")
          el-table-column(label="行程名称", prop="travel_name", header-align="center")
          //- el-table-column(label="线路分类", prop="line_type", header-align="center")
          el-table-column(label="出发地", prop="depart_location", header-align="center")
          el-table-column(label="目的地", prop="achieve_lacation", header-align="center")
          el-table-column(label="行程天数", prop="travel_days", header-align="center")
          el-table-column(label="供应商", prop="supplier_org", header-align="center")
          el-table-column(label="线路负责人", prop="line_man", header-align="center")
          el-table-column(label="上架时间", prop="shelf_time", header-align="center")
          el-table-column(label="操作", header-align="center" align="center")
            template(slot-scope="scope")
              //- el-button(type="text", @click="toTuanqi(scope.row)") 团期查看
              //- el-button(type="text", @click="settingProfit(scope.row)") 政策设置
              .span(@click="toTuanqi(scope.row)") 团期查看
              .span(@click="settingProfit(scope.row)") 政策设置
        el-pagination(
          class="pagin",
          @size-change="handleSizeChange", 
          @current-change="currentPageChange",
          :total="total_count",
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize",
          :current-page="page_index",
          layout="total, sizes, prev, pager, next, jumper"
          )
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
import FilterBar from "src/components/template/touristroute/filterBar";
import { getSearch } from "src/api/touristroute";
import ProfitSetting from 'src/components/template/policy/ProfitSetting.vue'
import { lineBaseProfit, batchSaveProfit, lineProfitList } from 'src/api/policy'
import { now } from 'moment';

const filterStatusMap = {
  trip_type: "产品类型",
  city: "出发城市",
  trip_day: "行程天数",
  departure_date: "出发日期",
};
const filterKeys = ['trip_type','city', 'trip_day', 'departure_date']
let days = []
for(let i = 1; i <= 10; i++) {
  if(i === 10) {
    days.push({id: i, name: i + '日以上'})
  } else {
    days.push({id: i,name: i + '天'})
  }
}
let depart_date = []
const nowMounth = new Date().getMonth() + 1
for (let i = nowMounth; i <= 12; i++) {
  if(depart_date.length < 6) {
    depart_date.push({
      id: i,
      name: i + '月'
    })
  }
}
if (nowMounth > 7) {
  for(let i = 1; i <= 6 - (12 - nowMounth + 1); i++) {
    depart_date.push({
      id: i,
      name: '明年' + i + '月'
    })
  }
}
export default {
  data() {
    return {
      search: {
        keyword: "",
        product_no: "",
        destination: "",
        price_interval_start: "",
        price_interval_end: "",
        depart_date_start: "",
        depart_date_end: ""
      },
      total_count: 100,
      pageSize: 20,
      page_index: 1,
      filter: {},
      tableList: [],
      searchData: null,
      greadType: "1",
      profitData: {},
      policyDialogVisible_components: false,
      tableCheckedList: [],
      profitData: {
        policyType: "1",
        greadOneVal: "",
        greadTwoVal: "",
        isAllPolicy: false,
        base_greadOneVal: "",
        base_greadTwoVal: "",
        policyProduct: "line"
      },
      IsToSetPolicy: false,
      product_ids: []
    }
  },
  components: { 
    FilterBar,
    ProfitSetting
  },
  computed: {
    filterData() {
      if (!this.searchData) {
        return [];
      }
      return Object.entries(this.searchData).map(([id, ele]) => {
        return {
          id,
          label: filterStatusMap[id],
          data: ele.map(item => ({ id: item.id, label: item.name }))
        };
      }).filter(item => {
        return filterKeys.includes(item.id);
      });
    },
  },
  mounted() {
    this.getFilter();
    this._getBaseProfit()
    this._getLineProfitList()
  },
  methods: {
    getFilter() {
      getSearch()
        .then(res => {
          this.$log.debug(res);
          let { code, data } = res;
          data.trip_day = days
          data.departure_date = depart_date
          this.searchData = data;

          
          filterKeys.forEach(key => {
            this.$set(this.filter, key, []);
          });
        })
        .catch(this.$log.error);
    },
    async _getBaseProfit() {
      const params = {
          type: "1"
        }
        const { code, data, msg }  = await lineBaseProfit(params)

        if( code !== 0) return this.IsToSetPolicy = true
        this.greadType = data.style
        this.profitData.base_greadOneVal = data.one_level
        this.profitData.base_greadTwoVal = data.two_level
    },
    async _saveConfirmPolicy(params) {
        let profitType = params.policy_id * 1
        let profitId = ""
        let profitName = ""
        switch(profitType) {
          case 1: //1暂不设置 2基础分润 3 自定义
            profitId = -1
            profitName = "暂不设置政策"
            break
          case 2:
            profitId = 2
            profitName = "基础分润政策"
            break
          case 3:
            profitId = 0
            profitName = "自定义分润政策"
            break
        }
      const paramss = {
        id: profitId,
        name: profitName,
        style: params.style,
        type: 1,
        one_level: params.one_level,
        two_level: params.two_level,
        product_ids: this.product_ids
      }
      try {
        const { code, data, msg} = await batchSaveProfit(paramss)
        this.product_ids = []
        if(code !== 0) return this.$message.warning(msg)
        this.$message.success("设置成功")
        this.profitData.greadOneVal = ""
        this.profitData.greadTwoVal = ""
        this._getLineProfitList()
      }
      catch(err) {
        console.log(err)
      }
    },
    settingProfit(row) {
      this.product_ids = new Array(row.id)
      this.policyDialogVisible_components = true
      this.profitData.greadOneVal = ""
      this.profitData.greadTwoVal = ""
      this.profitData.isAllPolicy = false 
      this.profitData.policyType = "1"
    },
    async _selectPolicyType(val) {
      if(val == "nobase") {
        // this.greadType = val
        this.IsToSetPolicy = false
        return
      } else if(val === "base") {
        this._getBaseProfit()
      } else {
        this.greadType = val
      }
    },
    async _getLineProfitList() {
      const params = {
        trip_type: this.filter.trip_type ? this.filter.trip_type : [],//产品类型
        departure_city: this.filter.city ? this.filter.city : [],//出发城市
        end_city: this.search.destination, //目的地
        price_start: this.search.price_interval_start,
        price_end: this.search.price_interval_end,
        price_sort: "",//价格排序 1升序2降序
        line_no_supply_name: this.search.product_no,//线路编号或者供应商组织名称
        trip_day: this.filter.trip_day ? this.filter.trip_day : [],//行程天数
        keyword: this.search.keyword,//关键字
        departure_date: this.filter.departure_date ? this.filter.departure_date : [],//出团日期
        departure_date_start: this.search.depart_date_start,//出团起始日期
        departure_date_end: this.search.depart_date_end,
        page_index: this.page_index,
        page_size: this.pageSize,
      }
      const {code, data, msg} = await lineProfitList(params)
      if(code !==0) return this.$message.error(msg)
        let list = []
        
      data.list.forEach(item => {
        let obj = {}
        let citys = []
        let achieve_lacation = []
        item.city.forEach(c => {
          if(c.type === "1") {
            citys.push(c.city_name)
          } else if(c.type === "2") {
            achieve_lacation.push(c.city_name)
          }
        })
        obj.id = item.id
        obj.travel_name = item.line_title
        obj.line_type = item.line_type && item.line_type.join('、')
        obj.depart_location = citys && citys.join('、')
        obj.achieve_lacation = achieve_lacation && achieve_lacation.join('、')//目的地
        obj.travel_days = item.line_day 
        obj.supplier_org = item.org_name 
        obj.line_man = item.operator_name
        obj.shelf_time = item.create_time //上架时间
        list.push(obj)
      })
      this.tableList = list;
      this.total_count = data.total_count * 1
    },
    searchList() {
      this._getLineProfitList()
    },
    toTuanqi(row) {
      this.$router.push({
        path: '/policy/product-tuanqi',
        query: {
          id: row.id
        }
      })
    },
    batchProfit() {
      if(!this.tableCheckedList.length) return this.$message.warning("请选择要设置的行程")
      this.profitData.isAllPolicy = true
      this.tableCheckedList.forEach(item => {
        this.product_ids.push(item.id)
      })
      this.policyDialogVisible_components = true
    },
    saveTripDate() {
      this.filter.departure_date = []
      this._getLineProfitList()
    },
    toSettinPolicy() {
      this.$router.push('/policy/line-profitSetting')
    },
    handleSearch() {
      this._getLineProfitList()
    },
    selectTable(row) {
      this.tableCheckedList = row
    },
    allSelectTable(row) {
      this.tableCheckedList = row
    },
    currentPageChange(page) {
      this.page_index = page;
      this._getLineProfitList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this._getLineProfitList()
    },
    cancelDialog(val) {
      this.policyDialogVisible_components = !val
      // this.profitData.policyType = '1'
    }
  }
}
</script>