<template>
  <div class="detail-form bg-white">
    <div class="opt-btns tar" v-if="showBtn">
      <a class="add-btn" href="javascript:;" @click="handleAddPriceDetail()" />
      <a class="sub-btn" href="javascript:;" @click="handleDelPriceDetail()" />
    </div>
    <div class="field-item">
      <div class="field-label">项目名称</div>
      <div class="field-content flex-1">
        <el-input v-model="item.item_name"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label">价格</div>
      <div class="field-content flex aic">
        <div class="flex-1">
          <el-input-number
            v-model="item.unit_price"
            :controls="false"
            :min="0"
            :max="999999999"
            :precision="2"
            @change="handleCalcPriceDetailPrice(item, $event)"
          >
            <el-select slot="prepend" v-model="item.operator" style="width: 46px; color: #000" @change="handleCalcPriceDetailPrice(item, $event)">
              <el-option label="+" value="+"/>
              <el-option label="-" value="-"/>
            </el-select>
          </el-input-number>
        </div>
        <div class="flex-1 ml5r10">
          <el-input-number
            controls
            v-model="item.num"
            :min="1"
            :max="999999999"
            @input="handleCalcPriceDetailPrice(item, $event)"
          />
        </div>
        <span class="color-orange">{{ item.totalPrice }}</span>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label">指定游客</div>
      <div class="field-content">
        <el-radio-group class="lh28pt2" v-model="item.alloc_type">
          <el-radio :label="1">全部游客</el-radio>
          <el-radio :label="2">指定游客</el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="item.tourist_ids" v-show="item.alloc_type == 2" @change="handleCalcPriceDetailPrice(item, $event)">
          <el-checkbox-button :label="tourist.id" v-for="(tourist, idx) in touristList" :key="idx">
            {{ tourist.username || ('游客' + (idx + 1)) }}<span class="avg-price"> / {{ item.avgPrice }}</span>
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label">备注</div>
      <div class="field-content">
        <el-input type="textarea" v-model="item.remark"/>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 价格明细项表单

// 明细初始数据
 * 
 * 支持attr参数：
 * item | Object | 价格明细对象，初始数据可通过OrderPriceItem.getInitPriceDetail()方法获取
 * showBtn  | Boolean  | 是否显示添加删除按钮
 * touristList  | Array  | 游客列表，包含{id: 游客id, username: 游客姓名}
 * 
 */
import InputNumber from 'src/plugins/InputNumber.vue';

export default {
  name: 'OrderPriceItem',
  components: {
    InputNumber
  },
  props: {
    item: {
      required: true,
      type: Object
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    touristList: {
      required: true,
      type: Array
    }
  },
  methods: {
    handleCalcPriceDetailPrice(detail, $event){
      let total = detail.num * detail.unit_price;
      let avg = 0;

      if(total){
        total = parseFloat(total.toFixed(2));
        if(detail.tourist_ids.length){
          avg = total / detail.tourist_ids.length;
          avg = parseFloat(avg.toFixed(2));
        }
      }else{
        total = 0;
      }

      detail.totalPrice = detail.operator == '-' ? -total : total;
      detail.avgPrice = detail.operator == '-' ? -avg : avg;
    },
    handleAddPriceDetail() {
      this.$emit('add');
    },
    handleDelPriceDetail(){
      this.$emit('sub');
    },
  },
  getInitPriceDetail() {
    return {
      // id:'',
      item_name: '',
      unit_price: 0,
      operator: '-',
      num: 1,
      alloc_type: 1,
      tourist_ids: [],
      remark: '',
      isadd: 1,
      totalPrice: 0,
      avgPrice: 0
    };
  }
};
</script>

<style lang="less" scoped>
.lh28pt2{
  line-height: 28px;
  padding-top: 2px;
}
.ml5r10{
  margin-left: 5px;
  margin-right: 10px;
}
.flex{
  display: flex;
}
.aic{
  align-items: center;
}
.flex-1{
  flex: 1;
}
.detail-form{
  margin-top: 10px;
  padding: 10px;
  .opt-btns{
    padding-bottom: 5px;
  }
  .field-item{
    display: flex;
    padding: 5px;
  }
  .field-label{
    width: 60px;
    text-align: right;
    color: #999;
    margin-right: 15px;
    line-height: 35px;
  }
  .field-content{
    flex: 1;
    align-self: center;
    line-height: 1.5;
  }
  .el-input-number{
    width: 100%;
  }
  .el-checkbox-button{
    .avg-price{
      display: none;
    }
    &.is-checked .avg-price{
      display: inline;
    }
  }
}
</style>
