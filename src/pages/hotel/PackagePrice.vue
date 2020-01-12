<style lang="stylus" scoped>

.package-price
  padding 20px 0
  background #fff
  .require::before
    content '*'
    color #F56C6C
    margin-right 4px
  .hotel-info
    margin-left 20px
    .hotel-name
      font-size 20px
    .room-type-name
      font-size 16px
      margin 0 10px
  .small-input
    width 80px
  .count-pirce
    min-width 105px
  .form
    padding 20px
    .date,.radio-week,.room-price,.booking-rules
      margin-bottom 50px
      .rules-title,.price-title
        font-size 18px
        font-weight 600
    .date
      .picker-date
        width 180px
        margin 0 10px
    .radio-week
      .weeks
        margin 20px 0
    .required,.label
      display inline-block
      width 100px
    .room-price
      .price-title
        margin-bottom 10px
      .move-right
        margin-left 5px
    .booking-rules
      .rules
        padding 15px 0
        .foods-type
          margin-left 10px
          .item-foods
            margin-bottom 10px
        .foods-num
          margin 0 10px
  .footer
    text-align center
</style>
<template lang="pug">
  .package-price
    .hotel-info
      span(class="hotel-name") {{hotelName}}
      span(v-if="price_date")
        span(class="room-type-name") {{roomType}}
        span(class="date") 日期:{{price_date}}
    .form
      .date(v-if="!price_date")
        span(class='require') 选择日期:
        el-date-picker(
          v-model="formData.startTime",
          type="date",
          placeholder="选择日期",
          class="picker-date",
          value-format="yyyy-MM-dd",
          :picker-options="pickerOptions"
        ) 
        span 至
        el-date-picker(
          v-model="formData.endTime",
          type="date",
          placeholder="选择日期",
          class="picker-date",
          value-format="yyyy-MM-dd",
          :picker-options="pickerOptions"
        )
      .radio-week(v-if="!price_date")
        el-radio-group(v-model="formData.isWeek", @change="weekChange")
          el-radio(:label="0") 不限
          el-radio(:label="1") 选择星期
        .weeks
          el-checkbox-group(v-model="formData.week")
            el-checkbox(v-for="item in weeks", :label="item.id", :key="item.id", :disabled="item.disabled") {{item.value}}
      .room-price
        .price-title(class='require') 设置价格/房量
        .price-box
          el-table(:data="formData.price", style="min-width: 100%")
            el-table-column(label="成本价", width="240")
              template(slot-scope="scope")
                span ￥
                el-input(class="small-input reset_input__inner_padding_10", v-model="cost_price_input")
                span(class="show-price") 成本价: ￥{{scope.row.cost_price}}
            el-table-column(label="结算价", min-width="333")
              template(slot-scope="scope")
                span ￥
                el-input(class="small-input reset_input__inner_padding_10", v-model="count_price_input")
                span  | 
                el-input(class="small-input reset_input__inner_padding_10", v-model="count_rate")
                span % 
                span(class="count-pirce") 结算价: ￥{{scope.row.count_price}}
            el-table-column(label="销售价", min-width="333")
              template(slot-scope="scope")
                span ￥
                el-input(class="small-input reset_input__inner_padding_10", v-model="sale_price_input")
                span | 
                el-input(class="small-input reset_input__inner_padding_10",v-model="sale_rate")
                span % 
                span 销售价: ￥{{scope.row.sale_price}}
            el-table-column(label="剩余房量/预留房量", width="260")
              template(slot-scope="scope")
                el-input-number(class='el-input-mini-s', size="mini", v-model="scope.row.stock", @change="changeRemainder", :min="0")
                span 间
                el-input-number(class='el-input-mini-s move-right', size="mini", v-model="scope.row.stay_stock", @change="changeReserved", :min="0")
                span 间
      .booking-rules
        //- .rules-title 预定规则
        //- .rules
        //-   span(class="label require") 是否超量购买:
        //-   el-radio-group(v-model="formData.is_more_buy")
        //-     el-radio(label="0") 否
        //-     el-radio(label="1") 是
        .package-status
          span(class="label require") 套餐状态:
          el-radio-group(v-model="formData.status")
            el-radio(label="1") 启用
            el-radio(label="0") 禁用
    .footer
      el-button(type="primary", @click="backPreviousPage", v-if="!price_date") 上一步
      el-button(type="primary", @click="_savePrice") 保存
</template>

<script>
import { promise_addEverydayPrice, promise_getEveryDayPricDetail, promise_editEverdayPricDetail } from 'src/api/promise_api'
import  * as format  from 'src/utils/format'

export default {
  data() {
    return {
       price_id: "",
       roomType: "",
       price_date:"",
       hotelName: "",
       showWeeks: false,
       weeks: [
         {
           id: 1,
           value: '星期一',
           disabled: true
         },
         {
           id: 2,
           value: '星期二',
           disabled: true
         },
         {
           id: 3,
           value: '星期三',
           disabled: true
         },
         {
           id: 4,
           value: '星期四',
           disabled: true
         },
         {
           id: 5,
           value: '星期五',
           disabled: true
         },
         {
           id: 6,
           value: '星期六',
           disabled: true
         },
         {
           id: 0,
           value: '星期日',
           disabled: true
         }],
      formData: {
        package_id: "",
        startTime: "",
        endTime: "",
        week: [],
        isWeek: 0,
        price: [{
          cost_price: "", //成本价
          count_price: "", //结算价
          sale_price: "", //销售价
          stock: 0,//剩余房
          stay_stock: 0,// 预留房
        }],
        foods: {
          type: "10",
          foods_number: "1"
        },
        is_more_buy: "",
        status: "1"
      },
       cost_price_input: "",//成本价
       count_price_input: "",//结算价
       sale_price_input: "", //销售价
       count_rate: "", //结算价比率
       sale_rate: "",  //销售比率
       pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000;
        }
       }
    }
  },
  watch: {
    cost_price_input(val) {//成本价
      const costVal = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.cost_price_input = this.formData.price[0].cost_price = costVal
      this.priceFun(costVal)
    },
    count_rate(val) {//结算比率
      this.count_price_input = ""
      const rateVal = val ? (val + '').replace(/\D/g, '') : "" //替换非数字
      this.count_rate = rateVal
      return this.count_rate ? this.formData.price[0].count_price = ((rateVal*1 + 100) * this.cost_price_input / 100).toFixed(2) : ""
    },
    count_price_input(val) {//结算价加值
      this.count_rate = ""
      const constaVal = val ? val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') : ""
      this.count_price_input = constaVal
      return this.formData.price[0].count_price = (constaVal*1 + this.cost_price_input * 1).toFixed(2)
    },
    sale_price_input(val) {//销售价加值
      this.sale_rate = ""
      const saleVal = val ? val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') : ""
      this.sale_price_input = saleVal
      return this.formData.price[0].sale_price = (saleVal*1 + this.cost_price_input * 1).toFixed(2)
    },
    sale_rate(val) {//销售比率
      this.sale_price_input = ""
      const rateVal = val ? (val + '').replace(/\D/g, '') : ""
      this.sale_rate = rateVal
      return this.formData.price[0].sale_price = ((rateVal*1 + 100) * this.cost_price_input / 100).toFixed(2)
    }
  },
  mounted() {
     this.hotelId = this.$route.query.hotelId
     this.price_id = this.$route.query.price_id
     this.price_date = this.formData.startTime = this.$route.query.price_date
     this.hotelName = this.$route.query.hotelName
     this.package_id = this.$route.query.package_id

     const room_name = this.$route.query.room_name 
     const package_name = this.$route.query.package_name
     this.roomType = room_name + " "+ package_name
    this.price_id ? this._getEveryDayPricDetail(this.price_id) : ""
    if(this.$route.query.back) {
      const priceData = JSON.parse(sessionStorage.getItem("priceInfo"))
      this.formData = priceData
    }
  },
  methods: {
    async _getEveryDayPricDetail() {
      try {
        const { data } = await promise_getEveryDayPricDetail({data: {price_id: this.price_id}}, true)
        
        if(data.code !== 0) return this.$message.error(data.msg)
        const detail = data.data
        const price = data.data.price
        // this.formData.startTime = detail.date
        this.formData.foods = detail.foods
        this.formData.price[0].cost_price = price.price
        this.formData.price[0].count_price = price.settle_price + ''
        // this.formData.is_more_buy = detail.is_more_buy
        this.formData.status = detail.status
        this.cost_price_input = price.price
        price.settle_price_type === '1' ? this.count_price_input = price.settle_price_type_val : this.count_rate = price.settle_price_type_val
        price.sale_price_type === '1' ? this.sale_price_input = price.sale_price_type_val : this.sale_rate = price.sale_price_type_val
        this.formData.price[0].stock = price.stock
        this.formData.price[0].stay_stock = price.stay_stock
        
      }
      catch(err) {
        console.log(err)
      }
    },
    priceFun(cost) {
      let count_price = this.count_price_input ? this.count_price_input * 1 + cost * 1 : (this.count_rate * 1 + 100) * Number(cost) / 100
      this.formData.price[0].count_price = count_price.toFixed(2)
      let sale_price = this.sale_price_input ? this.sale_price_input * 1 + cost * 1 : (this.sale_rate * 1 + 100) * Number(cost) / 100
      this.formData.price[0].sale_price = sale_price.toFixed(2)
    },
    changeRemainder(val) {
      this.formData.price[0].stock = val > 999 ? 999 : val
    },
    changeReserved(val) {
      this.formData.price[0].stay_stock = val > 999 ? 999 : val
    },
    backPreviousPage() {
      let saveData = this.formData
      // saveData.endTime = format.date(this.formData.endTime)
      // saveData['startTime'] = format.date(this.formData.startTime)
      const priceInfo = JSON.stringify(saveData)
      sessionStorage.setItem("priceInfo", priceInfo)
      this.$router.push({
        path:'/hotel/roomtPackageEdit',
        query:{
          hotelId: this.hotelId,
          package_id: this.package_id,
          room_id: this.$route.query.room_id,
          back: "1",
          IsAddPage: "1",
          supplier: this.$route.query.supplier
        }
      })
    },
    async _savePrice() {
      if(this.price_date) {
        if(!this.formData.startTime) {
          return this.$message.warning("请选择日期")
        }
      } else {
        if(!this.formData.startTime || !this.formData.endTime) {
          return this.$message.warning("请选择日期")
        }
      }
      if(this.formData.isWeek == 1 && !this.formData.week.length) {
        return this.$message.warning("请选择星期")
      }
      if( !this.formData.price[0].cost_price && !this.formData.price[0].count_price && !this.formData.price[0].sale_price) {
        return this.$message.warning("请设置价格和房量")
      }
      if(!this.count_price_input && !this.count_rate) return this.$message.warning("请设置结算价")
      if(!this.sale_price_input && !this.sale_rate) return this.$message.warning("请设置销售价")
      if(!this.formData.foods.type) return this.$message.warning("请选择餐食")
      if(!this.formData.foods.foods_number) return this.$message.warning("请选择餐食数量")
      // if(!this.formData.is_more_buy) return this.$message.warning("请选择是否超量购买")
      if(!this.formData.status) return this.$message.warning("请选择套餐状态")
      const price = {
        price: this.formData.price[0].cost_price,
        sale_price_type: this.sale_price_input ? 1 : 2,
        sale_price_type_val: this.sale_price_input || this.sale_rate,
        settle_price_type: this.count_price_input ? 1 : 2,
        settle_price_type_val: this.count_price_input || this.count_rate,
        stock: this.formData.price[0].stock,
        stay_stock: this.formData.price[0].stay_stock
      }
      
      if(this.price_date) {
        const params = {
        data: {
          package_id: this.package_id,
          date: this.formData.startTime,
          price: price,
          foods: this.formData.foods,
          // is_more_buy: this.formData.is_more_buy,
          status: this.formData.status
        }
      }
        const {data} = await promise_editEverdayPricDetail(params)

        if(data.code !==0) return this.$message.error(data.msg)
        // this.$message.success(data.msg)
        this.$router.push(`/hotel/roomtStatus?hotel_id=${this.hotelId}`)
      } else {
        const params = {
          data: {
            product_id: this.hotelId,
            package_id: this.package_id,
            start_date: this.formData.startTime,
            end_date: this.formData.endTime,
            price_type: this.formData.isWeek,
            week: this.formData.isWeek ? this.formData.week : [],
            price: price,
            foods: this.formData.foods,
            // is_more_buy: this.formData.is_more_buy,
            status: this.formData.status
          }
        }
        const { data } = await promise_addEverydayPrice(params)

        if(data.code !== 0) return this.$message.error(data.msg)
        // this.$message.success(data.msg)
        this.$router.push(`/hotel/roomtStatus?hotel_id=${this.hotelId}`)
      }
      
    },
    weekChange(e) {
      if(e === 1) {
        this.weeks.forEach(item => {
          item.disabled = false
        }) 
      } else {
        this.weeks.forEach(item => {
          item.disabled = true
        }) 
      }
    }
  }
}
</script>
