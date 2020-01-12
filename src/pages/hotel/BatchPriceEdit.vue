<style lang="stylus" scoped>
.batchEditPrice
  background #fff
  padding 20px 
  .hotelprovider-name
    margin-bottom 30px
    .hotel-name
      font-size 20px
      margin-right 20px
  .date-roomtype
    font-size 18px
    margin-bottom 20px
  .date
    margin-bottom 10px
    .picker-date
      width 180px
      // margin 0 10px
    .date-spacing
      margin 0 10px
  .editPrice
    // .title
    //   font-size 16px
    .select-roomtype-package
      margin-top 15px
      .checked-all
        margin-bottom 15px
      .roomtype
        display flex 
        flex-direction column
        .item-roomtype
          margin-bottom 10px
          .item-left
            min-width 200px
            float left
          .item-right
            max-width calc(100% - 200px)
            .item-package
              width 30%
          // .roomtype-name
          //   width 200px
          //   display inline-block
          .package-group
            display inline-block
            white-space pre-wrap
            vertical-align top
            max-width calc(100% - 200px)
      .roomtype-package-btn
        margin 40px 0 0 150px
  .date-pricestatus
    margin-top 65px
    .title-data
      .title
        font-size 18px
        margin-right 20px
    .weeks
      margin 20px 0
      display flex
      justify-content space-between
      .left
        .checkbox-group
          display inline-block
      .right
        .is-disabled
          background #d886bc
    .conten-table
      .elselect
        width 120px
      .small-input
        width 80px
        margin-right 10px
      .show-price
        margin-left 10px
      .input-val
        display inline-block
    .footer
      text-align center
      margin-top 40px
</style>
<template lang="pug">
  .batchEditPrice
    .hotelprovider-name
      span(class="hotel-name") {{hotelName}}
      span 供应商：{{channel}}
    .date-roomtype
      span 选择日期范围及房型
    .date
      el-date-picker(
        v-model="startTime",
        type="date",
        placeholder="选择日期",
        class="picker-date",
        :picker-options="pickerOptions"
      ) 
      span(class="date-spacing") 至
      el-date-picker(
        v-model="endTime",
        type="date",
        placeholder="选择日期",
        class="picker-date",
        :picker-options="pickerOptions"
      )
    .editPrice
      //- .title 修改房型价格
      //- roomtype-packagechecked(:roomTypeListOptions="roomTypeListOptions", :roomtype_isIndeterminate="roomtype_isIndeterminate", @confirmCheckedPackage="selectRoomTypePackage")
      .select-roomtype-package
        el-checkbox(class="checked-all", :indeterminate="roomtype_isIndeterminate", v-model="roomTypeCheckAll",  @change="roomTypeCheckAllChange") 全部房型
        el-checkbox-group(class="roomtype", v-model="checkedRoomTypeList", @change="roomTypeCheckedChange")
          div(class="item-roomtype", v-for="(item, index) in roomTypeListOptions")
            div(class='item-left')
              el-checkbox(:label="item.name" :key="item.id")
              span(class="roomtype-name") {{item.name}}
            div(class='item-right')
              el-checkbox-group(class="package-group", v-model="item.checkedPackageList", @change="packageCheckedChange($event, index)")
                el-checkbox(class="item-package", v-for="tmp in item.package" :label="tmp.name" :key="tmp.id", :disabled="tmp.disabled") {{tmp.name}}
        el-button(class="roomtype-package-btn", type="primary", @click="confirmSelectRoomTypePackage") 确认
    .date-pricestatus
      .title-data(v-if="showStarTime")
        span(class="title", v-if="batchPrice === '1' && tableDataPriceList.length") 修改房型价格
        span(class="title", v-if="batchStatus === '1' && tableDateStatusList.length") 修改房态/房量
        span {{showStarTime}}  至  {{showEndTime}}
      .price-table-content(v-if="batchPrice === '1' && tableDataPriceList.length")
        .table-data(v-for="(table,indx) in priceList", :key="indx")
          .weeks
            .left
              span 选择日期：
              el-checkbox-group(v-model="table.week", class="checkbox-group", @change="weekCheckedChange($event, indx)")
                el-checkbox(v-for="item in table.weeks", :label="item.value", :key="item.value", :disabled="item.disabled") {{item.label}}
            .right
              el-button(:disabled="table.week.length === 7 || table.disabledBtn", type="primary", @click="addPriceTable($event, indx)") +增加日期价格
              el-button(v-if="priceList.length > 1 && indx >0", type="primary", @click="delPriceTable($event, indx)") 删除
          el-table(class="conten-table", :data="table.tableDataPriceList", style="width: 100%")
            el-table-column(label="房型价格名称", prop="roomtype_package_name", width="120")
            el-table-column(label="成本价", width="280")
              template(slot-scope="scope")
                span ￥
                el-input(class="small-input reset_input__inner_padding_10", v-model="scope.row.cost_price", type="number")
                span(class="show-price") 成本价: ￥{{scope.row.cost_price}}
            el-table-column(label="结算价格", min-width="365")
              template(slot-scope="scope")
                span ￥
                el-input(class="small-input reset_input__inner_padding_10", v-model="scope.row.count_price_val", type="number", @focus="changeCountPrice('val', scope.row)")
                span  | 
                el-input(class="small-input reset_input__inner_padding_10", v-model="scope.row.count_rate", type="number", @focus="changeCountPrice('rate', scope.row)")
                span % 
                span(class="show-price") 结算价: ￥
                span(v-if="scope.row.count_price_val") {{scope.row.cost_price, scope.row.count_price_val | count_price}}
                span(v-if="scope.row.count_rate") {{scope.row.cost_price, scope.row.count_rate | sale_price}}
            el-table-column(label="销售价格",min-width="365")
              template(slot-scope="scope")
                span ￥
                el-input(class="small-input reset_input__inner_padding_10", v-model="scope.row.sale_price_val", type="number", @focus="changeSalePrice('val', scope.row)")
                span  | 
                el-input(class="small-input reset_input__inner_padding_10", v-model="scope.row.sale_rate", type="number", @focus="changeSalePrice('rate', scope.row)")
                span % 
                span(class="show-price") 销售价: ￥
                span(v-if="scope.row.sale_price_val") {{scope.row.cost_price, scope.row.sale_price_val | count_price}}
                span(v-if="scope.row.sale_rate") {{scope.row.cost_price, scope.row.sale_rate | sale_price}}
      //- .footer(v-if="tableDataPriceList.length")
      //-   el-button(type="primary", @click="submitPrice") 确认     
      //-   el-button(@click="cancelBtn") 取消
      .status-table(v-if="batchStatus === '1' && tableDateStatusList.length")
        .weeks
          .left
            span 选择日期：
            el-checkbox-group(v-model="statusWeek", class="checkbox-group", @change="weekCheckedChange($event)")
              el-checkbox(v-for="item in selectWeeks", :label="item.value", :key="item.value", :disabled="item.disabled") {{item.label}}
        el-table(class="conten-table", :data="tableDateStatusList", style="width: 100%")
          el-table-column(label="房型套餐名称",prop="status_name")
          el-table-column(label="剩余房量")
            template(slot-scope="scope")
              el-select(v-model="scope.row.lastRoomNumType", class="elselect", @change="selcetlastRoomNum(scope.row, scope.$index)")
                el-option(
                  v-for="item in lastRoomNumTypeOptions",
                  :key="item.value",
                  :label="item.label",
                  :value="item.value"
                  )
              .input-val(v-if="scope.row.IslastRoomNum")
                el-input(class="small-input", v-model="scope.row.lastRoomNum")
                span 间
          el-table-column(label="预留房")
            template(slot-scope="scope")
              el-select(v-model="scope.row.reservedRoomType", class="elselect", @change="selectReserveRoom(scope.row)")
                el-option(
                  v-for="item in reservedRoomTypeOptions",
                  :key="item.value",
                  :label="item.label",
                  :value="item.value"
                  )
              .input-val(v-if="scope.row.IsReservedRoomNum")
                el-input(class="small-input", v-model="scope.row.reservedRoomNum")
                span 间
          el-table-column(label="房态设置")
            template(slot-scope="scope")
              el-select(v-model="scope.row.statusType", class="elselect")
                el-option(
                  v-for="item in statusTypeOptions",
                  :key="item.value",
                  :label="item.label",
                  :value="item.value"
                  )
      .footer(v-if="tableDataPriceList.length || tableDateStatusList.length")
        el-button(type="primary", @click="submitTable") 确认
        el-button(@click="cancelBtn") 取消
</template>
<script>
import RoomtypePackagechecked from './components/RoomTypePackeChecked.vue'
import { 
  hotel_getRoomPackageInfo,
  hotel_editPackagePrice,
  hotel_editPackageStock,
  } from 'src/api/promise_api'
import { mergeApi } from "src/api/hotel.js";
import * as common from 'src/utils/common';
import * as format from 'src/utils/format'

export default {
  data() {
    return {
      hotelId: "",
      batchPrice: false,
      batchStatus: false,
      hotelName: "",
      supplier: "",
      roomTypeCheckAll: false,
      roomtype_isIndeterminate: true,
      checkedRoomTypeList: [],
      roomTypeListOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
        }
      },
      startTime: "",
      endTime: "",
      tableDataPriceList: [],
      weeks: [
        {
          value: 0,
          label: '星期日',
          disabled: false
        },
        {
          value: 1,
          label: '星期一',
          disabled: false
        },
        {
          value: 2,
          label: '星期二',
          disabled: false
        },
        {
          value: 3,
          label: '星期三',
          disabled: false
        },
        {
          value: 4,
          label: '星期四',
          disabled: false
        },
        {
          value: 5,
          label: '星期五',
          disabled: false
        },
        {
          value: 6,
          label: '星期六',
          disabled: false
        },
      ],
      weekDisabled:[false, false, false, false, false, false, false],
      priceList: [
        {          
          week: [],
          weeks: [],
          tableDataPriceList: []
        }
      ],
      statusWeek: [],
      selectWeeks: [],
      selectDate: [],
      tableDateStatusList: [
        // {
        //   status_name: "",
        //   lastRoomNumType: "0",
        //   lastRoomNum: "",
        //   reservedRoomType: "0",
        //   reservedRoomNum: "",
        //   statusType: "0" 
        // }
      ],
      lastRoomNumTypeOptions: [
        {
          value: "0",
          label: "不变"
        },
        {
          value: "1",
          label: "剩余房量"
        }
      ],
      reservedRoomTypeOptions: [
        {
          value: "0",
          label: "不变"
        },
        {
          value: "1",
          label: "预留房"
        }
      ],
      statusTypeOptions: [
        {
          value: "",
          label: "不变"
        },
        {
          value: "1",
          label: "开启"
        },
        {
          value: "0",
          label: "禁用"
        }
      ],
      showStarTime: "",
      showEndTime: "",
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
    }
  },
  computed:{
    channel(){
      let checked=this.supplierList.find(v=>v.id==this.supplier)
      return checked?checked.name:""
      
    }
  },
  filters: {
    count_price(cost, countVal) {
      return (cost *  1 + countVal * 1).toFixed(2)
    },
    sale_price(cost, coutRateVal) {
      return ((coutRateVal*1 + 100) * cost / 100).toFixed(2)
    }
  },
  components: {
    RoomtypePackagechecked
  },
  mounted() {
    this.batchPrice = this.$route.query.batchPrice
    this.batchStatus = this.$route.query.batchStatus
    this.hotelName = this.$route.query.hotelName
    this.supplier = this.$route.query.supplier
    this.hotelId = this.$route.query.hotelId
    this.queryRoomPackageInfo()
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
        this.supplier=  (this.$route.query.supplier =="0"|| !this.$route.query.supplier) ? this.supplierList[0].id : this.$route.query.supplier 
      
    },
    async queryRoomPackageInfo() {
      const params = {
        data: {
          product_id: this.hotelId,
          channel:this.supplier
        }
      }
      const { data: { code, data, msg } } = await hotel_getRoomPackageInfo(params, true)

      if(code !== 0) return this.$message.error(msg)
      data.forEach(item => {
        item.package.forEach(tmp => {
          tmp.disabled = true
        })
        item.checkedPackageList = []
      })
      this.roomTypeListOptions = data
      this.$forceUpdate()
    },
    cancelBtn() {
      this.$router.back(-1)
    },
    submitTable() {
      if(this.batchPrice === '1') {
        const index = this.priceList.length - 1;
        if(index !== 0) {
          let currentweek = this.priceList[index].week.filter((item) => {
            let itemweek = this.priceList[index*1-1].week.includes(item)
            return !itemweek
          })
          this.priceList[index].currentWeek = currentweek
        } else {
          this.priceList[0].currentWeek = this.priceList[0].week
        }
        const reg = /^\d*$/
        const valReg = /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/
        let isSubmit = false
        this.priceList.length && this.priceList.forEach(item => {
          // if(this.priceList.length > 1) {
            if(!item.currentWeek.length || !item.week.length) {
              isSubmit = false
              return this.$message.warning("请选择日期")
            }
          // }
          for (let i = 0; i < item.tableDataPriceList.length; i++) {
            isSubmit = false
            if(!item.tableDataPriceList[i].cost_price) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的成本价不能为空')
            if(!reg.test(item.tableDataPriceList[i].cost_price)) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的成本价输入有误')
            if(!item.tableDataPriceList[i].count_price_val && !item.tableDataPriceList[i].count_rate) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的结算值不能为空')
            if(!item.tableDataPriceList[i].sale_price_val && !item.tableDataPriceList[i].sale_rate) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的销售值不能为空')
            
            if(item.tableDataPriceList[i].count_price_val) {
              if(!valReg.test(item.tableDataPriceList[i].count_price_val)) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的结算值输入有误') 
            }
            if(item.tableDataPriceList[i].count_rate) {
              if(!reg.test(item.tableDataPriceList[i].count_rate)) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的结算比例输入有误')
            }
            if(item.tableDataPriceList[i].sale_price_val) {
              if(!valReg.test(item.tableDataPriceList[i].sale_price_val)) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的销售值输入有误') 
            }
            if(item.tableDataPriceList[i].sale_rate) {
              if(!reg.test(item.tableDataPriceList[i].sale_rate)) return this.$message.warning(item.tableDataPriceList[i].roomtype_package_name + '的销售比例输入有误')
            }
            if(item.tableDataPriceList[i].count_price_val && item.tableDataPriceList[i].sale_price_val) {
              if((item.tableDataPriceList[i].count_price_val *  1 + item.tableDataPriceList[i].cost_price * 1).toFixed(2) >= (item.tableDataPriceList[i].sale_price_val*1 + item.tableDataPriceList[i].cost_price*1).toFixed(2)) {
                return this.$message.warning('设置的销售价需要大于结算价格')
              }
            }
            if(item.tableDataPriceList[i].count_price_val && item.tableDataPriceList[i].sale_rate) {
              if((item.tableDataPriceList[i].count_price_val *  1 + item.tableDataPriceList[i].cost_price * 1).toFixed(2) >= ((item.tableDataPriceList[i].sale_rate*1 + 100) * item.tableDataPriceList[i].cost_price / 100).toFixed(2)) {
                return this.$message.warning('设置的销售价需要大于结算价格')
              }
            }
            if(item.tableDataPriceList[i].count_rate && item.tableDataPriceList[i].sale_price_val) {
              if(((item.tableDataPriceList[i].count_rate*1 + 100) * item.tableDataPriceList[i].cost_price / 100).toFixed(2) >= (item.tableDataPriceList[i].sale_price_val *  1 + item.tableDataPriceList[i].cost_price * 1).toFixed(2)) {
                return this.$message.warning('设置的销售价需要大于结算价格')
              }
            }
            if(item.tableDataPriceList[i].count_rate && item.tableDataPriceList[i].sale_rate) {
              if(((item.tableDataPriceList[i].count_rate*1 + 100) * item.tableDataPriceList[i].cost_price / 100).toFixed(2) >= ((item.tableDataPriceList[i].sale_rate*1 + 100) * item.tableDataPriceList[i].cost_price / 100).toFixed(2)) {
                return this.$message.warning('设置的销售价需要大于结算价格')
              }
            }
            isSubmit = true
          }
          isSubmit = true
        })
        isSubmit ? this._hotelEditPackagePrice() : ""
      }
      if(this.batchStatus === '1') {
        let isSubmit = false
        for(let i = 0; i < this.tableDateStatusList.length; i++) {
          if(this.tableDateStatusList[i].lastRoomNumType === '1' && !this.tableDateStatusList[i].lastRoomNum) return this.$message.warning('请填写' + this.tableDateStatusList[i].status_name +'的剩余房量')
          if(this.tableDateStatusList[i].reservedRoomType === '1' && !this.tableDateStatusList[i].reservedRoomNum) return this.$message.warning('请填写' + this.tableDateStatusList[i].status_name +'的预留房量')
          isSubmit = true
        }
        if(!this.statusWeek.length) {
          isSubmit = false
          this.$message.warning("请选择日期")
          return
        } else {
          isSubmit = true
        }
        isSubmit && this._hotelEditPackageStock() 
      }
    },
    async _hotelEditPackageStock() {
      let stock = []
      this.tableDateStatusList.forEach(item => {
        stock.push({
          package_id: item.package_id,
          stock: item.lastRoomNum,//剩余房量
          stay_stock: item.reservedRoomNum,//预留房量
          status: item.statusType
        })
      })
      const stock_data = [{
        week: this.statusWeek,
        stock: stock
      }]
      const params = {
        data: {
          product_id: this.hotelId,
          start_date: format.date(this.showStarTime),
          end_date: format.date(this.showEndTime),
          stock_data: stock_data
        }
      }
      try {
        const { data: {code, data, msg} } = await hotel_editPackageStock(params, true)

        if(code !== 0) return this.$message.error(msg)
        this.$router.back(-1)
      } catch(err) {
        console.log(err)
      }
    },
    async _hotelEditPackagePrice() {
      let price = []
      let newPrice = []
      let priceList = [{
        week: [],
        price: []
      }]
      let price_data = []
      this.priceList.forEach((it, index) => {
        let price = []
        it.tableDataPriceList.forEach((item,idx) => {
          price.push({
            package_id: item.package_id,
            price: item.cost_price,//成本价
            sale_price_type: item.sale_price_val ? "1" : "2",//销售价加价类型 1值 2百分比
            sale_price_type_val: item.sale_price_val || item.sale_rate, //销售价加价值
            settle_price_type: item.count_price_val ? "1" : "2", //	结算价加价类型 1具体值 2百分比
            settle_price_type_val: item.count_price_val || item.count_rate//结算价加价值
          })
        })
        price_data.push({
          week: it.currentWeek,
          price: price
        })
      })  
      
      const params = {
        data: {
          product_id: this.hotelId,
          start_date: format.date(this.showStarTime),
          end_date: format.date(this.showEndTime),
          price_data: price_data
        }
      }
      try {
        const { data: {code, data, msg} } = await hotel_editPackagePrice(params, true)

        if(code !== 0) return this.$message.error(msg)
        this.$router.back(-1)
      }
      catch(err) {
        console.log(err)
      }
    },
    formatDate(date) {
     const day = date.getDay()
     return day
    },
    confirmSelectRoomTypePackage() {
      if(!this.startTime || !this.endTime) return this.$message.warning("请选择日期")
      const difference = this.endTime.getTime() - this.startTime.getTime()
      const days = difference / (1000 * 60 * 60 * 24)
      const startDay = this.startTime.getDay()
      let selectDate = []
      for(let i = 0;i < (days + 1); i++) {
        let newDate = new Date(new Date(this.startTime).getTime() + 1000 * 3600 * 24 * i)
        selectDate.push(this.formatDate(newDate))
      }
      this.selectDate = Array.from(new Set(selectDate)) //已选日期
      let unSelect = [0,1,2,3,4,5,6].filter(item => {
            let itemweek = this.selectDate.includes(item)
            return !itemweek
          })
      let selectWeeks = common.clone(this.weeks)

       unSelect.forEach((item,indx) => {
         selectWeeks.forEach((i, ind) => {
           if(item === ind) {
             i.disabled = true
           }
         })
        })
      this.selectWeeks = selectWeeks //星期options
      let packeageList = []
      this.roomTypeListOptions.forEach(item => {
        this.checkedRoomTypeList.forEach(i => {
          if(i === item.name) {
            item.checkedPackageList.forEach(tmp => {
              packeageList.push(tmp)
            })
          }
        })
      })
      if(!packeageList.length) {
        return this.$message.warning('请选择套餐')
      }
      if(this.batchPrice === '1') {
        this.priceList = [
           {          
          week: [],
          weeks: [],
          tableDataPriceList: []
          }
        ]
        this.roomTypeListOptions.forEach(item => {
          this.checkedRoomTypeList.forEach(i => {
            if(i=== item.name) {   
              let checkedPackageList = []
              item.checkedPackageList.forEach(tmp => {
                this.priceList[0].weeks = common.clone(selectWeeks)
                this.priceList[0].week = common.clone(this.selectDate)
                item.package.forEach(it => {
                  if(tmp === it.name) {
                    this.priceList[0].tableDataPriceList.push({
                      roomtype_package_name: item.name + '-' + tmp,
                      package_id: it.id,
                      cost_price: "", //成本价
                      count_price: "", //结算价
                      sale_price: "", //销售价
                      count_price_val: "",//结算值
                      sale_price_val: "", //销售值
                      count_rate: "", //结算价比率
                      sale_rate: "",  //销售比率
                    })
                  }
                }) 
              })
             }
          }) 
        })
        this.tableDataPriceList = common.clone(this.priceList[0].tableDataPriceList)
      }
      if(this.batchStatus === '1') {
        this.tableDateStatusList = []
        this.statusWeek = this.selectDate
        this.roomTypeListOptions.forEach(item => {
          item.checkedPackageList.forEach(tmp => {
            item.package.forEach(it => {
              if(tmp === it.name) {
                this.tableDateStatusList.push({
                  status_name: item.name + '-' + tmp,
                  package_id: it.id,
                  lastRoomNumType: "0",
                  lastRoomNum: "",
                  IslastRoomNum: false,
                  reservedRoomType: "0",
                  reservedRoomNum: "",
                  IsReservedRoomNum: false,
                  statusType: "" 
                })

              }
            })
          })
        })
      }
      this.showStarTime = format.date(this.startTime)
      this.showEndTime = format.date(this.endTime)
    },
    roomTypeCheckAllChange(val) {
      const options = []
      this.roomTypeListOptions.forEach(item => {
        options.push(item.name)
      })
      this.checkedRoomTypeList = val ? options : []
      this.roomtype_isIndeterminate = false
      
      if(val) {
        this.roomTypeListOptions.forEach((item, index) => {
          item.package.forEach(tmp => {
            tmp.disabled = false
          item.checkedPackageList.push(tmp.name)
          })
        })
      } else {
        this.roomTypeListOptions.forEach((item, index) => {
          item.package.forEach(tmp => {
            tmp.disabled = true
          })
          item.checkedPackageList = []
        })
      }
    },
    roomTypeCheckedChange(val) {
      let options = this.roomTypeListOptions
      options.forEach((item, index) => {
        item.package.forEach(tmp => {
          tmp.disabled = true
        })
      })
      this.checkedRoomTypeList = val
      const checkedCoutn = val.length
      this.roomTypeCheckAll = checkedCoutn === this.roomTypeListOptions.length
      this.roomtype_isIndeterminate = checkedCoutn > 0 && checkedCoutn < this.roomTypeListOptions.length
      options.forEach((item, index) => {
        val.forEach(checkedVal => {
          if(checkedVal === item.name) {
            item.package.forEach(tem => {
              tem.disabled = false
            })
          }
        })    
      })
    },
    packageCheckedChange(val, index) {
      // console.log('package',val, index)
      
    },
    weekCheckedChange(val, index) {
      if(this.batchPrice === '1') {
        this.priceList[index].week = val
        // index === 0 ? this.priceList[0].currentWeek = val : ''
      }
      
    },
    selcetlastRoomNum(row ,index) {
      row.lastRoomNumType === '1' ? row.IslastRoomNum = true : ''
    },
    selectReserveRoom(row) {
      row.reservedRoomType === '1' ? row.IsReservedRoomNum = true : ''
    },
    addPriceTable(event, index) {
      const weekLength = this.priceList[index].week.length


      let newWeeks = common.clone(this.weeks)
      let oldWeek = []

      //  this.priceList[index].week.forEach((item, ind) => {
      //     this.weekDisabled[ind] = true
      //   })
      if(index > 0) {
        let currentweek = this.priceList[index].week.filter((item) => {
          let itemweek = this.priceList[index*1-1].week.includes(item)
         return !itemweek
        })
        if(!currentweek.length) return
        this.priceList[index].currentWeek = currentweek

        for(let i = 0; i <= index; i++) {
          this.priceList[i].weeks.forEach(item => {
            item.disabled = true
          })
        }
        oldWeek = common.clone(this.priceList[index].week)

      } else {
        this.priceList[0].weeks.forEach(item => {
          item.disabled = true
        })
        oldWeek = common.clone(this.priceList[0].week)
        this.priceList[0].currentWeek = this.priceList[0].week
      }
      if(!this.priceList[index].currentWeek) return
      
      this.priceList.push({
        week:[...oldWeek],
        weeks: newWeeks,
        tableDataPriceList: common.clone(this.tableDataPriceList),
      })

       this.priceList[Number(index)+1].week.forEach((item,indx) => {
         this.priceList[Number(index)+1].weeks.forEach((i, ind) => {
           if(item === ind) {
             i.disabled = true
           }
         })
        })
      this.priceList[index].disabledBtn = true
      this.$forceUpdate();
    },
    delPriceTable(val, index) {
      const length = this.priceList.length

      if(index === length-1) {
        // '删除的是最后一个'
         let shifang = [0,1,2,3,4,5,6].filter(item => {
            let itemweek = this.priceList[index - 1].week.includes(item)
            return !itemweek
          })
          this.priceList[index - 1].currentWeek.forEach(item => {
            shifang.push(item)
          })
          this.priceList.splice(index, 1)
          shifang.forEach(item => {
            this.priceList[index - 1].weeks.forEach(w => {
              if(item === w.value) {
                w.disabled = false
              }
            })
          })
        this.priceList[index - 1 ].disabledBtn = false
        if(index === 1) {
          this.priceList[0].weeks = common.clone(this.selectWeeks)
          this.$forceUpdate()
        }

      } else {
        // '删除的不是最后一个'
        this.priceList[index].currentWeek.forEach(item => {
          this.priceList[length - 1].weeks.forEach(w => {
            if(item === w.value) {
              w.disabled = false
            }
          })
        })

        this.priceList.splice(index, 1)
      }
    },
    changeCountPrice(type, row) {
      type === 'val' ? row.count_rate = "" : row.count_price_val = ""
    },
    changeSalePrice(type, row) {
      type === 'val' ? row.sale_rate = "" : row.sale_price_val = ""
    }
  }
}
</script>
