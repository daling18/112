// src\components\distribution\components\LineTouristForm.vue
<template>
  <div class="tourist-form">
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>游客姓名</div>
      <div class="field-content">
        <el-input v-model="tourist.username"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>证件类型</div>
      <div class="field-content">
        <el-select placeholder="请选择" v-model="tourist.identity_type">
          <el-option v-for="(obj,key) in cardTypeMap" :key="key" :label="obj" :value="obj"/>
        </el-select>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>证件号码</div>
      <div class="field-content">
        <el-input v-model="tourist.identity_no" />
      </div>
    </div>
    <div class="field-item" v-if="tourist.identity_type !=='身份证'">
      <div class="field-label"><span class="color-red">* </span>证件有效期</div>
      <div class="field-content">
        <el-date-picker v-model="tourist.identity_end_date" type="date" placeholder="选择日期" :editable="false"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>性别</div>
      <div class="field-content">
        <el-radio-group v-model="tourist.gender">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>是否合同签字人</div>
      <div class="field-content">
        <el-radio-group v-model="tourist.is_contract_sign">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>国籍</div>
      <div class="field-content">
        <world-select v-model="tourist.nationality"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label"><span class="color-red">* </span>手机号码</div>
      <div class="field-content">
        <input-number v-model="tourist.mobile"/>
      </div>
    </div>
    <div class="field-item" v-if="extraInfoList">
      <div class="field-label"><span class="color-red">* </span>出发城市</div>
      <div class="field-content">
        <!-- <div class="cust-item" v-for="(cust, idx) in tourist.group.slice(1)" :key="idx"> -->
          <div class="cust-item" >
            <!-- <div class="cust-name tar">{{ extraInfoList[idx + 1].name }}</div> -->
            <el-radio-group v-model="tourist.price_city_id" @change="changeCity">
              <el-radio-button
                v-for="(extra, idx) in extraInfoList"
                :key="idx"
                :label="extra.id"
              >{{extra.name}}</el-radio-button>
            </el-radio-group>
          </div>
      </div>
    </div>
     <div class="field-item" v-if="extraInfoList">
      <div class="field-label">套餐</div>
      <div class="field-content">
        <el-radio-group v-model="tourist.price_package_id" @change="packageTouist">
          <el-radio-button v-for="(item,index) in tourist.packages" :label="item.id" :key="index">{{item.name}}</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="field-item" v-if="extraInfoList">
      <div class="field-label"><span class="color-red">* </span>游客类型</div>
      <div class="field-content" style="width: auto">
        <el-radio-group class="mw350" v-model="tourist.touristerType" @change="changeTouristType">
          <el-radio-button
            v-for="(extra, idx) in tourist.touristerList"
            :key="idx"
            :label="extra.name"
          ></el-radio-button>
        </el-radio-group>
        <span class="ml10 color-orange">￥{{ tourist.sale_price }}</span>
      </div>
    </div>
   <div class="field-item" v-if="extraInfoList && (roomDiffPrice != '0.00' && roomDiffPrice != '0')">
      <div class="field-label">单房差</div>
      <div class="field-content">
        <el-checkbox v-model="tourist.is_select_room" @change="handleGroupChange"></el-checkbox>
      </div>
    </div>
    <div class="field-item" v-if="issuePlaceRequired(tourist.identity_type)">
      <div class="field-label"><span class="color-red">* </span>签发地</div>
      <div class="field-content">
        <el-input v-model="tourist.issue_place"/>
      </div>
    </div>
    <div class="field-item">
      <div class="field-label">
        <span :class="{'color-purple options-btn': 1, 'opened': tourist.opened}" @click="handleToggleOptions">选填项</span>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="tourist.opened">
        <div class="field-item" v-if="!issuePlaceRequired(tourist.identity_type)">
          <div class="field-label">签发地</div>
          <div class="field-content">
            <el-input v-model="tourist.issue_place"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label">出生日期</div>
          <div class="field-content">
            <el-date-picker v-model="tourist.birthday" type="date" placeholder="选择日期" :editable="false"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label">备注</div>
          <div class="field-content">
            <el-input type="textarea" v-model="tourist.remark"/>
          </div>
        </div>
      </div>
    </transition>
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
import InputNumber from 'src/plugins/InputNumber.vue';

export default {
  name: 'LineTouristForm',
  components: {
    WorldSelect,
    InputNumber
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
    roomDiffPrice: {
      type: String,
      default: null
    }
    
  },
  data() {
    return {
    }
  },
  mounted(){
    // console.log(this.tourist,'tourist')
    this.initdata();
  },
  methods: {
    changeCity(e) {
      this.extraInfoList.forEach(item => {
        if(e == item.id){
          this.tourist.packages = item.package;
          this.tourist.price_package_id = item.package[0].id;
          this.tourist.price_package_name = item.package[0].name;
          this.tourist.touristerList = item.package[0].price;
          this.tourist.touristerType = item.package[0].price[0].name;
          this.tourist.sale_price = item.package[0].price[0].sales_price;
          this.tourist.settle_price = item.package[0].price[0].settle_price;
          this.tourist.price_id = item.package[0].price[0].id;
          this.tourist.price_city_name = item.name;
        }
      });
      this.handleGroupChange();
    },
    packageTouist(e) {
      this.tourist.packages.forEach(item => {
        if(e == item.id) {
          this.tourist.price_package_name = item.name;
          this.tourist.touristerList = item.price;
          this.tourist.touristerType = item.price[0].name;
          this.tourist.sale_price = item.price[0].sales_price;
          this.tourist.settle_price = item.price[0].settle_price;
          this.tourist.price_id = item.price[0].id ;
        }
      })
      this.handleGroupChange();
    },
    changeTouristType(e) {
      this.tourist.touristerList.forEach(item => {
        if(e == item.name) {
          this.tourist.sale_price = item.sales_price
          this.tourist.settle_price = item.settle_price;
          this.tourist.price_id = item.id ;
        }
      })
      this.handleGroupChange();
    },
    initdata() {
      // console.log('this.tourist.packages[0]',this.tourist);
      if(this.extraInfoList){
        this.tourist.price_city_id = this.extraInfoList[0].id;
        this.tourist.price_city_name = this.extraInfoList[0].name;
        this.tourist.packages = this.extraInfoList[0].package;
        this.tourist.price_package_id = this.tourist.packages[0].id;
        this.tourist.price_package_name = this.tourist.packages[0].name;

        this.tourist.touristerList = this.extraInfoList[0].package[0].price
        this.tourist.touristerType = this.tourist.touristerList[0].name;
        this.tourist.sale_price = this.tourist.touristerList[0].sales_price;
        this.tourist.settle_price = this.tourist.touristerList[0].settle_price;
        this.tourist.price_id = this.tourist.touristerList[0].id ;
      }
    },
    issuePlaceRequired(type){
      // 证件类型为“护照、港澳通行证、台湾通行证”时，必填
      const REQUIRED_TYPES = ['护照', '港澳通行证', '台湾通行证']

      return REQUIRED_TYPES.indexOf(type) != -1
    },
    // 根据身份证号，自动生成生日
    // handleAutoBirth(e) {
    //   let tmpY = null,
    //     tmpM = null,
    //     tmpD = null;
    //   if (e.identity_type == '身份证' && e.identity_no.length == 18) {
    //     tmpY = e.identity_no.substring(6, 10);
    //     tmpM = e.identity_no.substring(10, 12);
    //     tmpD = e.identity_no.substring(12, 14);
    //     e.birthday = tmpY + '-' + tmpM + '-' + tmpD;
    //   }
    // },
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
      gender: '男',
      identity_type: '身份证',
      identity_no: '',
      identity_end_date: '',
      issue_place: '',
      mobile: '',
      birthday: '',
      nationality: '中国',
      is_contract_sign: 1,
      remark: '',
      opened: false,
      sale_price: 0,//熊售价
      settle_price:0,//结算价
      price_id:'',
      price_city_id:'',
      price_package_id:'',
      packages:[],
      is_select_room:false,//单房差
      touristerType:'',
      touristerList:[]
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
