// src\components\distribution\components\LineTouristForm.vue
<template>
  <div class="tourist-form">
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>被保人姓名</div>
      <div class="field-content">
        <el-input v-model.trim="tourist.username"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>证件类型</div>
      <div class="field-content">
        <el-select placeholder="请选择" v-model="tourist.cardtype">
          <el-option v-for="(obj,key) in cardTypeMap" :key="key" :label="obj" :value="obj"/>
        </el-select>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>证件号码</div>
      <div class="field-content">
        <el-input v-model.trim="tourist.card_num" @blur="handleAutoBirth(tourist)"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>出生日期</div>
      <div class="field-content">
        <el-date-picker v-model="tourist.birthday" type="date" placeholder="选择日期" :editable="false"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>性别</div>
      <div class="field-content">
        <el-radio-group v-model="tourist.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 在线支付
 * 
 * 提交在线支付form需要用户直接触发submit事件，否则会出现被浏览器拦截的现象。
 * needInputAmount 默认为false，为ture时调用pay方法会弹出设置支付金额窗口，设置完成触发finish(amount)回调
 * 
 * 支持attr参数：
 * orderResource | String | 订单类型  1:线路 2:机票 3:酒店 4:签证 5:火车票 6:门票 7:农特优
 * orderId | String, Number | 订单id
 * amount | String, Number | 在线支付金额，默认为'' 使用订单的金额
 * needInputAmount | Boolean | 是否需要输入支付金额
 * totalOutPrice | Number | 订单总销售价，需要输入支付金额时使用，用于限制输入订单金额
 * totalPeerPrice | Number | 订单总结算价，需要输入支付金额时使用，用于限制输入订单金额
 * 
 * 触发事件
 * finish   needInputAmount为true时，提交成功后触发，带输入金额参数
 * 
 * 开放method：
 * pay | void | 打开在线支付页面, 返回true表示是
 * 
 * demo:
 *   <online-pay ref="onlinePay" :order-id="orderInfo.id" order-resource="4" />
 * 
 * js:
 *   this.$refs.onlinePay.pay(); // 触发支付操作
 */
import WorldSelect from 'src/plugins/WorldSelect.vue';
import { payOrder } from 'src/api/pay';

export default {
  name: 'LineTouristForm',
  components: {
    WorldSelect
  },
  props: {
    tourist: {
      type: Object,
      default: null
    },
    cardTypeMap: {
      type: Object,
      default: () => ({})
    },
    extraInfoList: {
      type: Array,
      default: null
    },
  },
  data() {
    return {
    }
  },
  methods: {
    issuePlaceRequired(type){
      // 证件类型为“护照、港澳通行证、台湾通行证”时，必填
      const REQUIRED_TYPES = ['护照', '港澳通行证', '台湾通行证']

      return REQUIRED_TYPES.indexOf(type) != -1
    },
    // 根据身份证号，自动生成生日
    handleAutoBirth(e) {
      let tmpY = null,
        tmpM = null,
        tmpD = null,
        sex = null;
      if (e.cardtype == '居民身份证' && e.card_num.length == 18) {
        tmpY = e.card_num.substring(6, 10);
        tmpM = e.card_num.substring(10, 12);
        tmpD = e.card_num.substring(12, 14);

        if (parseInt(e.card_num.substr(16, 1)) % 2 == 1) {
          e.sex = "男"
        }else {
          e.sex = "女"
        }
        e.birthday = tmpY + '-' + tmpM + '-' + tmpD;
        
      }
    },
    handleGroupChange(){
      this.$emit('group-change')
    },
    handleToggleOptions(){
      this.$set(this.tourist, 'opened', !this.tourist.opened);
    }
  },
  getInitTourist(){
    const h = this.$createElement;
    return {
      id: '',
      username: '',
      sex: '男',
      cardtype: '居民身份证',
      card_num: '',
      birthday: '',
      // issue_place: '',
      // mobile: '',
      // birthday: '',
      // nationality: '中国',
      // is_contract_sign: 1,
      // remark: '',
      // group: null,
      // opened: false,
      // price: 0
    };
  }
};
</script>

<style lang="less" scoped>
.field-item{
  display: flex;
  padding: 5px;
}
.field-label{
  width: 130px;
  text-align: right;
  color: #999;
  margin-right: 15px;
  line-height: 35px;
}
.field-content{
  flex: 1;
  padding-right: 50px;
  align-self: center;
  line-height: 1.5;
}

.el-date-editor.el-input, .el-select{
  width: 100%;
}
.mw350{
  max-width: 350px;
}

.cust-item{
  display: flex;
  .el-radio-group{
    max-width: 275px;
  }
}
.cust-name{
  padding-top: 7px;
  width: 60px;
  margin-right: 15px;
}
.options-btn::before{
  content: "";
  display: inline-block;
  border-left: 7px solid #b10c79;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  margin-right: 10px;
}
.options-btn.opened::before{
  transform: rotate(90deg);
}
</style>
