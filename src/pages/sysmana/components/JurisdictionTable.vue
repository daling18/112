<template>
  <div class="table-list clearfix">
    <div class="l1">
      <span v-for="(col, idx) in COLS_1" :style="col.style" :key="idx">{{ col.name }}</span>
    </div>
    <div class="l2">
      <span v-for="(col, idx) in COLS_2" :style="col.style" :key="idx">{{ col.name }}</span>
    </div>
    <div class="l3">
      <div class="l" v-for="col in COLS_3" :key="col.id">
        <b>{{ col.name }}</b>
        <template v-if="tableDataMap[col.id]">
          <template v-if="!col.special">
            <el-checkbox
              v-model="tableDataMap[col.id].is_org"
              :true-label="1"
              :false-label="0"
              class="c1"
              :disabled="disabled"
            >全公司</el-checkbox>
            <el-checkbox
              v-model="tableDataMap[col.id].is_department"
              :true-label="1"
              :false-label="0"
              :disabled="disabled"
            >全部门</el-checkbox>
            <el-checkbox
              v-model="tableDataMap[col.id].is_defined"
              :true-label="1"
              :false-label="0"
              :disabled="disabled"
            >自定义</el-checkbox>
          </template>
          <el-checkbox
            v-else
            v-model="tableDataMap[col.id].is_defined"
            :true-label="1"
            :false-label="0"
            class="c1"
            :disabled="disabled"
          >自定义</el-checkbox>
          <em v-if="!disabled" class="oper" :class="tableDataMap[col.id].is_defined ? '' : 'dis'" @click="$emit('select', tableDataMap[col.id])">
          选择</em>
          <em class="longs" v-if="tableDataMap[col.id].names && tableDataMap[col.id].names != ''" :title="tableDataMap[col.id].namesEll">
            [<i v-for="(o2,i2) in tableDataMap[col.id].names" :key="i2">{{ o2 }}</i>]
          </em>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// 1.线路行程-本公司行程 2.团控中心-单项团控 3.团控中心-线路团控 4.团队订单-线路订单 5.单项订单-酒店订单 6.单项订单-门票订单 7.单项订单-机票订单 8.单项订单-火车票订单 9.单项订单-签证订单 10.单项订单-农特优订单
// 11.单项订单(供应商操作)-酒店订单 12.单项订单(供应商操作)-门票订单 13.单项订单(供应商操作)-机票订单 14.单项订单(供应商操作)-火车票订单 15.单项订单(供应商操作)-签证订单 16.单项订单(供应商操作)-农特优订单 17.我的订单-线路订单 18.我的订单-酒店订单 19.我的订单-门票订单 20.我的订单-机票订单
// 21.我的订单-火车票订单 22.我的订单-签证订单 23.我的订单-农特优订单 24.采购订单-线路订单 25.门票套餐-门票套餐 26.房型套餐-房型套餐 27.签证产品-签证产品 28.农特优产品-农特优产品 29.发票管理-收入发票 30.发票管理-成本发票
// 31.中行账户-账户余额'
export default {
  name: 'JurisdictionTable',
  props: {
    tableData: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      COLS_1: [
        { name: '旅游线路', style: 'height:79px' },
        { name: '团控中心', style: 'height:79px' },
        { name: '单项产品', style: 'height:639px' },
        { name: '销售订单', style: 'height:319px' },
        { name: '采购订单', style: '' },
        { name: '结算中心', style: 'height:119px' }
      ],
      COLS_2: [
        { name: '线路行程', style: '' },
        { name: '线路订单', style: '' },
        { name: '线路团控', style: '' },
        { name: '单项团控', style: '' },
        { name: '门票', style: '' },
        { name: '酒店', style: '' },
        { name: '签证', style: '' },
        { name: '农特优', style: '' },
        { name: '单项订单', style: 'height: 239px' },
        { name: '自营订单', style: 'height: 239px' },
        { name: '线路订单', style: '' },
        { name: '酒店订单', style: '' },
        { name: '门票订单', style: '' },
        { name: '机票订单', style: '' },
        { name: '火车票订单', style: '' },
        { name: '签证订单', style: '' },
        { name: '农特优订单', style: '' },
        { name: '保险订单', style: '' },
        { name: '线路订单', style: '' },
        { name: '发票管理', style: 'height: 79px' },
        { name: '中行账户', style: '' }
      ],
      COLS_3: [
        { name: '本公司行程', id: '1' },
        { name: '线路订单', id: '4' },
        { name: '线路团控', id: '3' },
        { name: '单项团控', id: '2' },
        { name: '门票套餐', id: '25' },
        { name: '房型套餐', id: '26' },
        { name: '签证产品', id: '27' },
        { name: '农特优产品', id: '28' },
        { name: '酒店订单', id: '5' },
        { name: '门票订单', id: '6' },
        { name: '机票订单', id: '7' },
        { name: '火车票订单', id: '8' },
        { name: '签证订单', id: '9' },
        { name: '农特优订单', id: '10' },
        { name: '酒店订单', id: '11' },
        { name: '门票订单', id: '12' },
        { name: '机票订单', id: '13' },
        { name: '火车票订单', id: '14' },
        { name: '签证订单', id: '15' },
        { name: '农特优订单', id: '16' },
        { name: '线路订单', id: '17' },
        { name: '酒店订单', id: '18' },
        { name: '门票订单', id: '19' },
        { name: '机票订单', id: '20' },
        { name: '火车票订单', id: '21' },
        { name: '签证订单', id: '22' },
        { name: '农特优订单', id: '23' },
        { name: '保险订单', id: '32' },
        { name: '线路订单', id: '24' },
        { name: '收入发票', id: '29' },
        { name: '成本发票', id: '30' },
        { name: '账户余额', id: '31', special: false }
      ],
      tableDataMap: {}
    }
  },
  watch: {
    tableData: {
      immediate: true, 
      handler(val) {
        const map = {}
        if (Array.isArray(val)) {
          val.forEach(item => {
            map[item.data_type] = item
          })
        }
        this.tableDataMap = map;
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.table-list{
  line-height: 39px;
  border: 1px solid #ccc;
  border-top: none;
  margin-top: -1px;
  padding-left: 200px;
  em,i{
    font-style: normal;
  }
  .l1{
    float: left;
    width: 79px;
    margin-left: -200px;
    border-right: 1px solid #ccc;
    height: 100%;
  }
  .l2{
    float: left;
    width: 119px;
    margin-left: -120px;
    border-right: 1px solid #ccc;
  }
  span, .l{
    display: block;
    border-top: 1px solid #ccc;
    padding: 0 9px 0 10px;
  }
  .l3{
    b{
      display: inline-block;
      font-weight: 400;
      width: 100px;
      border-right: 1px solid #ccc;
    }
    .c1{
      margin-left: 12px;
    }
  }
  .l{
    height: 39px;
    overflow: hidden;
  }
  .longs{
    font-size: 12px;
    color: #999;
    margin-left: 5px;
    i{
      margin: 0 2px;
    }
  }
}
.oper{
  font-style: normal;
  color: #b10c79;
  text-decoration: underline;
  cursor: pointer;
  &.dis{
    color: #ccc;
    cursor: default;
  }
}
</style>
