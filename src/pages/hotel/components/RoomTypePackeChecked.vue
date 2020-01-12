<style lang="stylus" scoped>
.roomtype-package-checked
  .checked-all
    margin-bottom 20px
  .roomtype
    display flex 
    flex-direction column
    .item-roomtype
      .roomtype-name
        width 200px
        display inline-block
      .package-group
        display inline
  .roomtype-package-btn
    margin 40px 0 0 150px
</style>

<template lang="pug">
  .roomtype-package-checked
    el-checkbox(class="checked-all", :indeterminate="roomtype_isIndeterminate", v-model="roomTypeCheckAll",  @change="roomTypeCheckAllChange") 全部房型
    el-checkbox-group(class="roomtype", v-model="checkedRoomTypeList", @change="roomTypeCheckedChange")
      el-checkbox(class="item-roomtype", v-for="(item, index) in roomTypeListOptions" :label="item.label" :key="item.value") 
        span(class="roomtype-name") {{item.label}}
        el-checkbox-group(class="package-group", v-model="item.checkedPackageList", @change="packageCheckedChange($event, index)")
          el-checkbox(v-for="tmp in item.package" :label="tmp.label" :key="tmp.value") {{tmp.label}}
    el-button(class="roomtype-package-btn", type="primary", @click="selectRoomTypePackage") 确认
</template>
<script>
export default {
  name: "RoomtypePackagechecked",
  props: {
    roomTypeListOptions:{
      type: Array,
      default: () => []
    },
    roomtype_isIndeterminate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checkedRoomTypeList: [],
      roomTypeCheckAll: []
    }
  },
  methods: {
    roomTypeCheckAllChange(val) {
      console.log('all',val)
      const options = []
      this.roomTypeListOptions.forEach(item => {
        options.push(item.label)
      })
      this.checkedRoomTypeList = val ? options : []
      this.roomtype_isIndeterminate = false
    },
     roomTypeCheckedChange(val) {
      console.log('item-checked',val)
      this.checkedRoomTypeList = val
      const checkedCoutn = val.length
      this.roomTypeCheckAll = checkedCoutn === this.roomTypeListOptions.length
      this.roomtype_isIndeterminate = checkedCoutn > 0 && checkedCoutn < this.roomTypeListOptions.length
    },
     packageCheckedChange(val, index) {
      console.log('package',val, index)
      
    },
     selectRoomTypePackage() {
      // this.roomTypeListOptions.forEach(item => {
      //   item.checkedPackageList.forEach(tmp => {
      //     this.priceList[0].tableDataPriceList.push({
      //       roomtype_package_name: tmp,
      //       cost_price: "", //成本价
      //       count_price: "", //结算价
      //       sale_price: "", //销售价
      //       count_price_val: "",//结算值
      //       sale_price_val: "", //销售值
      //       count_rate: "", //结算价比率
      //       sale_rate: "",  //销售比率
      //     })
      //   })
      // })
    this.$emit('confirmCheckedPackage', this.roomTypeListOptions)
    },
  }
}
</script>
