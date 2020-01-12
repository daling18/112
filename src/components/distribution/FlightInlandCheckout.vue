<template>
  <div class="flight-check">
    <div v-if="flightDetails" class="flight-check-content">
      <div class="flight-check-main">
        <el-form :model="flightOrderForm" label-width="95px" ref="order">
          <!-- <div class="panel">
            <div class="panel-title">
              订单类型
            </div>
            <el-form-item label="订单类型">
              <el-radio v-model="flightOrderForm.order_type" :label="2">同行订单</el-radio>
              <el-radio v-if="ORG_TYPE == 3" v-model="flightOrderForm.order_type" :label="1">直客订单</el-radio>
            </el-form-item>
          </div>
          <div v-if="flightOrderForm.order_type == 2" class="panel">
            <div class="panel-title">
              结算方
            </div>
            <el-form-item label="代理商"
                          prop="distributor_id" 
                          :rules="[
                            { type: 'object', required: true, message: '请选择代理商', trigger: 'change' }
                          ]">
              <select-org v-model="flightOrderForm.distributor_id" partOrg></select-org>
            </el-form-item>
            <el-form-item label="联系人" 
                          prop="distributor_contacts"
                          :rules="[
                            { required: true, message: '请输入代理商联系人姓名', trigger: 'blur' }
                          ]">
              <el-input :class="'input-middle'" v-model="flightOrderForm.distributor_contacts" placeholder="请输入代理商联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" 
                          prop="distributor_mobile"
                          :rules="[
                            { required: true, message: '请输入代理商联系人电话', trigger: 'blur' }
                          ]">
              <el-input :class="'input-middle'" v-model="flightOrderForm.distributor_mobile" placeholder="请输入代理商联系人电话"></el-input>
            </el-form-item>
          </div> -->
          <div class="passengers site-panel">
            <div class="site-panel-title">
              乘客信息
            </div>
            <template v-for="(item, index) in flightOrderForm.passenger_list">
              <div class="passengers-info" :ref="'passenger' + index" :key="index">
                <div class="passengers-count">
                  第{{index + 1}}位
                  <p>乘客</p>
                </div>
                <div class="passengers-detail">
                  <el-form-item label="乘客类型" :prop="'passenger_list.'+index+'.passenger_type'" :rules="[
                                        { type: 'number', required: true, message: '请选择乘客类型', trigger: 'change' }
                                      ]">
                    <el-select placeholder="请选择乘客类型" v-model="item.passenger_type" style="width:300px">
                      <template v-for="(traveler, travelerKey) in applicableTravelerCategory" >
                        <el-option :label="traveler.name" :value="traveler.value" :key="travelerKey"></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="乘客姓名" :prop="'passenger_list.'+index+'.passenger_name'" :rules="[
                                          { required: true, message: '请输入乘客姓名', trigger: 'blur' }
                                        ]">
                    <el-input placeholder="请输入姓名" v-model.trim="item.passenger_name" style="width:300px">
                    </el-input>
                  </el-form-item>
                  <el-form-item v-if="'first_name' in item && 'last_name' in item" label="姓名拼音" required>
                    <el-col :span="11">
                      <el-form-item :prop="'passenger_list.'+index+'.first_name'" :rules="[
                                            { required: true, message: '请输入乘客姓的拼音', trigger: 'blur' }
                                          ]">
                        <el-input placeholder="姓" v-model.trim="item.first_name">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                      <el-form-item :prop="'passenger_list.'+index+'.last_name'" :rules="[
                                            { required: true, message: '请输入乘客名的拼音', trigger: 'blur' }
                                          ]">
                        <el-input placeholder="名" v-model.trim="item.last_name">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="证件类型" :prop="'passenger_list.'+index+'.identity_type'" :rules="[
                                        { type: 'number', required: true, message: '请选择证件类型', trigger: 'change' }
                                      ]">
                    <el-select placeholder="请选择证件类型" v-model="item.identity_type" @change="getPassengerBirthday(index)" style="width:300px">
                      <template v-for="(identity, identityKey) in identityTypes">
                        <el-option :label="identity.name" :value="identity.id" :key="identityKey"></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码" :prop="'passenger_list.'+index+'.identity_no'" :rules="[
                                        { required: true, message: '请填写证件号码', trigger: 'blur' }
                                      ]">
                    <el-input placeholder="请输入证件号码" v-model.trim="item.identity_no" @blur="getPassengerBirthday(index)" style="width:300px">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="出生日期" :prop="'passenger_list.'+index+'.birthday'" :rules="[
                                        { type: 'date', required: true, message: '请输入乘客出生日期', trigger: 'blur' },
                                        { validator: validatePassengerBirthday, index:index, trigger: 'blur' }
                                      ]">
                    <el-date-picker placeholder="请输入出生日期" v-model="item.birthday" style="width:300px"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="手机号码" :prop="'passenger_list.'+index+'.mobile'" :rules="[
                                        { required: true, message: '请输填写乘客手机号码', trigger: 'blur' },
                                        { pattern: /^1[34578]\d{9}$/, message: '请填写正确的手机号码', trigger: 'blur' }
                                      ]">
                    <el-input placeholder="请输入手机号码" v-model="item.mobile" style="width:300px"></el-input>
                  </el-form-item>
                </div>
                <div class="passengers-tool">
                  <a href="javascript:;" v-show="flightOrderForm.passenger_list.length > 1" @click="delPassenger(index)">删除</a>
                  <a href="javascript:;" @click="clearPassenger(index)">清除</a>
                  <a href="javascript:;" @click="setContact(item)">设置为联系人</a>
                </div>
              </div>
            </template>
            <div class="passengers-add">
              <button type="button" class="el-button el-button--primary" @click="addPassenger">添加乘客</button>
              <span class="passengers-cunt">
                        您还可以添加
                        <i>{{passengerSurplus}}</i>
                        位乘客
                      </span>
            </div>
          </div>
          <div class="contact-person site-panel">
            <div class="title">联系人</div>
            <div class="contact-person-info">
              <el-form-item label="姓名" prop="contact.name" :rules="[
                                    { required: true, message:'请输入联系人姓名', trigger: 'blur'}
                                  ]">
                <el-input v-model="flightOrderForm.contact.name" placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="contact.mobile" :rules="[
                                    { required: true, message:'请输入联系人手机号码', trigger: 'blur'},
                                    { pattern: /^1[34578]\d{9}$/, message: '请填写正确的手机号码', trigger: 'blur' }
                                  ]">
                <el-input v-model="flightOrderForm.contact.mobile" placeholder="请输入联系人手机号码"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="contact.email" :rules="[
                                    { required: true, message:'请输入联系人邮箱地址', trigger: 'blur'},
                                    { type: 'email', message:'请输入正确的邮箱地址', trigger: 'blur'}
                                  ]">
                <el-input v-model="flightOrderForm.contact.email" placeholder="请输入联系人邮箱地址"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="checkout-pay">
          <div class="checkout-panel">
            <div class="checkout-panel-hd">
              支付方式
            </div>
            <div class="checkout-panel-bd">
              <!-- <p class="pay-type"><el-radio v-model="flightOrderForm.pay_type" :label="1">可下单金额</el-radio></p> -->
              <p class="pay-type"><el-radio v-model="flightOrderForm.pay_type" :label="2">在线支付</el-radio></p>
              <div class="price-amount">
                <p>订单金额：￥<strong>{{ totalPrice }}</strong> <span class="formula">({{totalText}})</span></p>
              </div>
              <div class="order-btn">
                <el-button type="primary" size="large" @click="submitOrder">提交</el-button>
                <el-button size="large" @click="$router.back()">返回</el-button>
              </div>
              <div class="tips">
                <span>温馨提示：</span>
                <br> 1、提交订单后，请在15分钟内完成支付，未在规定时间内完成，系统将会自动取消您的订单.
                <br> 2、航班价格变动频繁，请尽快完成订单填写。
                <br> 3、资料填写过程中若有疑问请联系客服，4006169999。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="flightDetails" class="flight-check-sidebar">
      <div v-if="flightDetails.flight_segment" class="flight-order-details">
        <div class="hd">
          {{ flightDetails.flight_segment[0].depart_city_name }}
          &nbsp;-&nbsp;
          {{ flightDetails.flight_segment[0].arrive_city_name }}
        </div>
        <div class="bd">
          <div class="flight-detail-item">
            <div class="flight-info">
              <p class="flight-base">
                {{ flightDetails.flight_segment[0].airline_company }} {{ flightDetails.flight_segment[0].flight_no }}
                <el-popover
                  v-if="Number(flightDetails.flight_segment[0].is_share)"
                  placement="bottom"
                  trigger="hover"
                  :content="flightDetails.flight_segment[0].share_airline_name + flightDetails.flight_segment[0].share_flight_no">
                  <span class="col-share" slot="reference">(共享)</span>
                </el-popover>
                <span class="col-craft">{{ flightDetails.flight_segment[0].craft_type }}</span> {{ flightDetails.flight_segment[0].cabin.seat_type }}
              </p>
              <div class="flight-airline">
                <p class="flight-depart">
                  <span>{{ flightDetails.flight_segment[0].depart_date.split("-")[0] + '年' + flightDetails.flight_segment[0].depart_date.split("-")[1] + '月' + flightDetails.flight_segment[0].depart_date.split("-")[2] + '日' }}</span>
                  <span class="col-time">{{ flightDetails.flight_segment[0].depart_time }}</span>
                  <span>{{ flightDetails.flight_segment[0].depart_airport_name }} {{ flightDetails.flight_segment[0].depart_airport_terminal}}</span>
                </p>
                <p class="flight-mid">
                  <el-popover
                    v-if="flightDetails.flight_segment[0].stop_num"
                    placement="bottom"
                    trigger="hover"
                    width="500"
                    @show="getByFlightStopDetail()">
                      <table class="flight-info-table">
                          <thead>
                              <tr>
                                  <th>出发地</th>
                                  <th>出发时间</th>
                                  <th>经停地</th>
                                  <th>停留时间</th>
                                  <th>抵达地</th>
                                  <th>抵达时间</th>
                              </tr>
                          </thead>
                          <tbody v-if="flightDetails.flight_segment[0].stop_point_list">
                              <template>
                                  <tr>
                                      <td>{{flightDetails.flight_segment[0].stop_point_list.stop_infos[0].city_name}}</td>
                                      <td>{{flightDetails.flight_segment[0].stop_point_list.stop_infos[0].dep_time}}</td>
                                      <td>{{flightDetails.flight_segment[0].stop_point_list.stop_infos[1].city_name}}</td>
                                      <td>{{flightDetails.flight_segment[0].stop_point_list.stop_infos[1].arri_time}} - {{flightDetails.flight_segment[0].stop_point_list.stop_infos[1].dep_time}}</td>
                                      <td>{{flightDetails.flight_segment[0].stop_point_list.stop_infos[2].city_name}}</td>
                                      <td>{{flightDetails.flight_segment[0].stop_point_list.stop_infos[2].arri_time}}</td>
                                  </tr>
                              </template>
                          </tbody>
                      </table>
                    <span class="col-stop" slot="reference">经停</span>
                  </el-popover>
                </p>
                <p class="flight-arrive">
                  <span>{{ flightDetails.flight_segment[0].arrive_date.split("-")[0] + '年' + flightDetails.flight_segment[0].arrive_date.split("-")[1] + '月' + flightDetails.flight_segment[0].arrive_date.split("-")[2] + '日' }}</span>
                  <span class="col-time">
                    {{ flightDetails.flight_segment[0].arrive_time }}
                    <i v-if="Math.floor((new Date(flightDetails.flight_segment[0].arrive_date) - new Date(flightDetails.flight_segment[0].depart_date))/86400000)" class="days">
                      +{{ Math.floor((new Date(flightDetails.flight_segment[0].arrive_date) - new Date(flightDetails.flight_segment[0].depart_date))/86400000) }}
                    </i>
                  </span>
                  <span>{{ flightDetails.flight_segment[0].arrive_airport_name }} {{ flightDetails.flight_segment[0].arrive_airport_terminal}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p v-if="flightDetails.draw_ticket_time">预计<span>起飞前{{flightDetails.draw_ticket_time}}分钟出票</span></p>
          <p v-if="flightDetails.draw_order_time">预计<span>付款后{{flightDetails.draw_order_time}}分钟出票</span></p>
          <p>备注：具体的退改签规则，请拨打4006169999人工咨询。</p>
        </div>
      </div>
      <inland-checkout-summer :prices="prices" :adultCount="adultCount" :childCount="childCount"></inland-checkout-summer>
    </div>
    <online-pay ref="onlinePay" :order-id="orderId" order-resource="2" />
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import * as count from 'src/utils/count';
import { getInlandFlightDetails, createInlandFlightOrder, getInlandFlightStopDetail } from 'src/api/flight';
import InlandCheckoutSummer from './FlightInlandCheckoutSummer.vue';
import SelectOrg from "src/plugins/SelectOrg.vue";
import OnlinePay from "./components/OnlinePay.vue";
const ORG_TYPE = +localStorage.getItem('orgtype');
export default {
  data() {
    return {
      orderId: '',
      ORG_TYPE,
      flightDetails: null, //航班数据
      flightOrderForm: {  //订单数据
        pay_type: 2,
        source: null, //来源
        price_id: null, //价格ID
        passenger_list: [], //乘客信息
        contact: {      //联系人信息
          name: "",
          mobile: null,
          email: ""
        }
      },
      adultCount: null, //成人数
      childCount: null, //儿童数
      prices: {   //价格信息
        adult_price: null,
        adult_base_fare: null,
        adult_tax: null,
        adult_fuel: null,
        child_price: null,
        child_base_fare: null,
        child_tax: null,
        child_fuel: null,
        delivery: 10
      },
      seatStatus: null, //余位
      identityType: "",  //证件类型
      loading:false
    }
  },
  computed: {
    identityTypes() {
      let identityList = [
        {
          name: "身份证",
          id: 1
        },
        {
          name: "护照",
          id: 2
        },
        {
          name: "军官证",
          id: 3
        },
        {
          name: "港澳通行证",
          id: 4
        },
        {
          name: "台胞证",
          id: 7
        },
        {
          name: "回乡证",
          id: 8
        },
        {
          name: "户口簿",
          id: 9
        },
        {
          name: "出生证明",
          id: 10
        },
        {
          name: "台湾通行证",
          id: 11
        }
      ];

      if (!this.identityType) {
        return identityList;
      }

      return identityList.filter(item => {
        return this.identityType.indexOf(item.name) > -1;
      });
    },
    applicableTravelerCategory(){
      let traveler = this.flightDetails.sale_control.applicable_traveler_category,
          travelerArr = [
            {name: "成人(≥12周岁)",value: 1},
            {name: "儿童(2周岁≤儿童票＜12周岁)",value: 2}
          ];
      if(traveler){
        if(traveler.indexOf('1') < 0){
          travelerArr.splice(0,1);
        }

        if(traveler.indexOf('2') < 0){
          travelerArr.splice(1,1);
        }
      }
      return travelerArr;
    },
    passengerSurplus() {
      return this.seatStatus - this.flightOrderForm.passenger_list.length;
    },
    totalText() {
      let txtArray = [];
      if (this.adultCount) {
        txtArray.push("成人x" + this.adultCount);
      }
      if (this.childCount) {
        txtArray.push("儿童x" + this.childCount);
      }

      return txtArray.join("+");
    },
    totalPrice() {
      let total = 0;
      total = (this.prices.adult_price + this.prices.adult_fuel + this.prices.adult_tax) * this.adultCount;
      if (this.prices.child_price) {
        total += (this.prices.child_price + this.prices.child_fuel + this.prices.child_tax) * this.childCount;
      }
      return total;
    }
  },
  components: {
    InlandCheckoutSummer,
    SelectOrg,
    OnlinePay
  },
  watch: {
    flightOrderForm: {
      handler() {
        this.passengerCount();
      },
      deep: true
    }
  },
  methods: {
    initFlightOrder() {
      this.getFlightDetails();
      if (!this.flightOrderForm.passenger_list.length) {
        this.addPassenger();
      }
    },
    getFlightDetails(){
      let params = {
            data: {
              price_id: this.$route.query.priceId
            }
          };
      getInlandFlightDetails({
        params:params,
        success: (params) => {
          let {code, msg, data} = params['data'];

          if(code == 0){
            this.flightDetails = data.flight_detail;
            this.flightOrderForm.source = data.flight_detail.source;
            this.flightOrderForm.price_id = data.flight_detail.price_id;
            this.seatStatus = Number(data.flight_detail.flight_segment[0].cabin.seat_status.replace(/\>/, ''));
            this.identityType = data.flight_detail.sale_control.acceptable_idcard_type;
            this.prices.adult_price = data.flight_detail.adult_price;
            this.prices.adult_base_fare = data.flight_detail.adult_base_fare;
            this.prices.adult_tax = data.flight_detail.adult_tax;
            this.prices.adult_fuel = data.flight_detail.adult_fuel;
            this.prices.child_price = data.flight_detail.child_price;
            this.prices.child_base_fare = data.flight_detail.child_base_fare;
            this.prices.child_tax = data.flight_detail.child_tax;
            this.prices.child_fuel = data.flight_detail.child_fuel;
          }else{
            this.$alert(msg, '提示', {
              confirmButtonText: '确定',
              type: 'error'
            }).then(() => {
              this.$router.back();
            });
          }
        },
        showLoading:true
      });
    },
    submitOrder() {
      this.$refs.order.validate((valid) => {
        if (valid) {
          let params = {
            data: JSON.parse(JSON.stringify(this.flightOrderForm))
          };

          params.data.passenger_list.forEach(function (item) {
            item.birthday = format.date(item.birthday);
          });

          if ('delivery' in this.flightOrderForm) {
            params.data.delivery = this.flightOrderForm.delivery;
          }

          createInlandFlightOrder({
            params:params,
            success: (params) => {
              let { code, msg, data} = params["data"];
              this.loading = false;
              if(code == 0){
                this.orderId = data.order_id;
                this.$nextTick(() => {
                  this.$confirm('预订成功', '在线支付提示', {
                    type: 'success',
                    cancelButtonText: '订单详情',
                    confirmButtonText: '去支付',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    showClose: false,
                    beforeClose: (action, instance, done) => {
                      if(action == 'confirm'){
                        this.$refs.onlinePay.pay();
                      }else{
                        done();
                        this.$router.push({ name: 'DistributionFlightMyOrderDetail', query: { order_id: data.order_id }});
                      }
                    }
                  }).catch((e)=>{
                      console.log('cancel: ', e);
                  })
                })
              }else{
                this.$alert(msg, '提示', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              }
            },
            showLoading:true
          });
        } else {
            console.log('error submit!!');
          return false;
        }
      });
    },
    addPassenger() {
      let passengers = this.flightOrderForm.passenger_list;
      if (passengers.length == this.seatStatus) return;
      passengers.push({
        passenger_name: "",
        passenger_type: 1,
        identity_type: null,
        identity_no: "",
        birthday: null,
        mobile: null
      });
    },
    delPassenger(index) {
      this.flightOrderForm.passenger_list.splice(index, 1);
    },
    clearPassenger(index) {
      let passengers = this.flightOrderForm.passenger_list;

      if ('first_name' in passengers[index] && 'last_name' in passengers[index]) {
        this.$set(passengers, index, {
          passenger_name: "",
          passenger_type: 1,
          first_name: "",
          last_name: "",
          identity_type: null,
          identity_no: "",
          birthday: null,
          mobile: null
        });
      } else {
        this.$set(passengers, index, {
          passenger_name: "",
          passenger_type: 1,
          identity_type: null,
          identity_no: "",
          birthday: null,
          mobile: null
        });
      }
    },
    validatePassengerType(rule, value, callback) {
      this.$refs.order.validateField('passenger_list.' + index + '.birthday');
    },
    validatePassengerBirthday(rule, value, callback) {
      let type = this.flightOrderForm.passenger_list[rule.index].passenger_type,
        age = null;

      age = count.age(value);

      if (age < 2) {
        callback(new Error('您所填写的出生日期与乘客类型不符'));
      } else if (age >= 2 && age < 12 && type == 1) {
        callback(new Error('您所填写的出生日期与乘客类型不符，12周岁≤成人'));
      } else if (age >= 12 && type == 2) {
        callback(new Error('您所填写的出生日期与乘客类型不符，儿童≥2周岁或<12周岁'));
      } else {
        callback();
      }
    },
    passengerCount() {
      let adultCount = 0,
        childCount = 0;
      this.flightOrderForm.passenger_list.forEach(function (item) {
        if (item.passenger_type == 1) {
          adultCount += 1;
        }
        if (item.passenger_type == 2) {
          childCount += 1;
        }
      });
      this.adultCount = adultCount;
      this.childCount = childCount;
    },
    getPassengerBirthday(index){
      let passenger = this.flightOrderForm.passenger_list[index],
          { identity_type, identity_no} = passenger;
      if(!identity_type || !identity_no || identity_type!=1)return;
      if(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(identity_no)){
        passenger.birthday = new Date(identity_no.substring(6, 10) + "-" + identity_no.substring(10, 12) + "-" + identity_no.substring(12, 14));
      }
    },
    setContact(passenger) {
      let { passenger_name, mobile } = passenger;

      if(passenger_name && mobile){
        this.flightOrderForm.contact.name = passenger_name;
        this.flightOrderForm.contact.mobile = mobile;
      }else{
        this.$alert('乘客信息不完整无法设置为联系人', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
      }
    },
    getByFlightStopDetail() {
        let params = {
            data: {
                flight_no: this.flightDetails.flight_segment[0].flight_no,
                depart_date: this.flightDetails.flight_segment[0].depart_date
            }
        };

        if (this.flightDetails.flight_segment[0].stop_point_list) return;
        getInlandFlightStopDetail({
            params: params,
            success: (params) => {
                let { data } = params['data'];
                this.$set(this.flightDetails.flight_segment[0], 'stop_point_list', data);
            }
        });
    },
  },
  created() {
    this.initFlightOrder();
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.flight-check {
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .flight-check-content,
    .flight-check-sidebar {
        float: left;
    }
    .flight-check-content {
        box-sizing: border-box;
        width: 100%;
    }
    .flight-check-main {
        margin-right: 410px;
    }
    .flight-check-sidebar {
        width: 400px;
        margin-left: -400px;
    }
    .input-middle{
      width: 200px;
    }
    .panel{
      padding: 10px 10px 20px;
      margin-bottom: 10px;
      background-color: #fff;
      .panel-title {
          padding: 10px 20px;
          font-size: 16px;
          line-height: 40px;
          color: #444444;
      }
    }
    .site-panel {
        padding: 20px;
        margin-bottom: 10px;
        background-color: #fff;
        .site-panel-title {
            padding: 10px 20px;
            font-size: 20px;
            font-weight: bold;
            line-height: 40px;
            color: #444444;
        }
    }
    .contact-person {
        .contact-person-info {
            width: 500px;
        }
    }
    .send {
        .send-info {
            width: 500px;
        }
    }
    .tips {
        padding: 10px;
        background: #ffffdd;
        color: #a07d48;
        margin-bottom: 10px;
        line-height: 28px;
        span {
            color: #ffa00f;
            margin: 0px;
        }
    }
    .flight-order-details {
        margin-bottom: 10px;
        .hd {
            padding: 8px 10px;
            font-size: 18px;
            font-weight: 700;
            color: #666;
            background-color: #fafafa;
        }
        .bd {
            padding: 10px;
            background-color: #fff;
            .flight-detail-item{
              margin-bottom: 10px;
            }
            .flight-info {
                margin-bottom: 10px;
                &:after {
                    content: '';
                    display: block;
                    clear: both;
                }
                .col-craft {
                    color: #999;
                }
                .col-share,
                .col-stop {
                    color: #1a75ff;
                }
                p {
                    margin: 0;
                }
                .flight-base {
                    margin-bottom: 10px;
                    &:after {
                        content: '';
                        display: block;
                        clear: both;
                    }
                }
                .flight-airline{
                  display: flex;
                  align-items: center;
                }
                .flight-depart,
                .flight-arrive {
                    width: 140px;
                    span {
                        display: block;
                        &.col-time {
                            font-size: 18px;
                            font-weight: 700;

                            .days{
                              font-size: 12px;
                              font-style: normal;
                              color: #f60;
                            }
                        }
                    }
                }
                .flight-depart {
                    span {
                        text-align: right;
                    }
                }
                .flight-arrive {
                    span {
                        text-align: left;
                    }
                }
                .flight-mid {
                    position: relative;
                    width: 80px;
                    height: 10px;
                    margin: 0 10px;
                    &::after {
                      content: "";
                      position: absolute;
                      right: 0;
                      height: 0;
                      width: 0;
                      border-left: 10px solid #cccccc;
                      border-top: 4px solid #fff;
                      border-bottom: 4px solid #fff;
                    }
                    &::before {
                      content: "";
                      position: absolute;
                      top: 3px;
                      left: 0;
                      height: 2px;
                      width: 100%;
                      background-color: #cccccc;
                    }
                    .col-stop {
                        position: absolute;
                        top: 25px;
                        left: 30px;
                        display: inline-block;
                    }
                }
            }
            .flight-stop {
                background-color: #f0fef2;
                margin: 0 20px;
                text-align: center;
            }
        }
        .footer{
          padding: 10px;
          background-color: #f4f4f4;
          p{
            margin: 5px 0;

            span{
              color: #ff6600;
            }
          }
        }
    }
    .passengers {
        .passengers-info {
            padding: 20px;
            &::after {
                content: '';
                display: table;
                clear: both;
            }
            .passengers-count {
                border:1px solid #f4f4f4;
                background-color: #fff;
                width: 60px;
                line-height: 24px;
                text-align: center;
                float: left;
                color: #666;

                p{
                  background-color:#f4f4f4;
                  margin: 0;
                  color:#f60;
                }
            }
            .passengers-detail {
                width: 410px;
                float: left;

                .el-select{
                  width: 310px;
                }
                .el-date-editor{
                  &.el-input{
                    width: 310px;
                  }
                }
            }
            .passengers-tool {
                text-align: right;
                float: right;
                a {
                    text-decoration: none;
                }
            }
        }
        .passengers-add {
            text-align: center;
            .passengers-cunt {
                i {
                    color: #4db3ff;
                    font-style: normal;
                }
            }
        }
    }
    .order-footer {
        .hd {
            background-color: #fff9e7;
            padding: 20px 0;
            text-align: center;
            color: #666;
            .price {
                font-size: 24px;
                color: #ff6600;
            }
        }
        .bd {
            background-color: #fff;
            padding: 30px 0;
            text-align: center;
            button.orderSubmit {
                display: inline-block;
                border: 0;
                color: #fff;
                background-color: #b10c79;
                padding: 10px 40px;
                font-size: 18px;
                cursor: pointer;
            }
        }
    }
    .order-summary {
        border: 1px solid #ddd;
        background-color: #fff;
        .order-summary-title {
            padding: 10px 20px;
            font-size: 20px;
            background-color: #f4f4f4;
            .total {
                float: right;
                color: #f60;
            }
        }
        .summary-item {
            padding: 0 20px;
            .total {
                float: right;
            }
        }
        .summary-out {
            padding: 10px 20px;
            margin: 0 -20px;
            background-color: #f8f8f8;
            .total {
                color: #f60;
                font-size: 16px;
            }
        }
    }
}
.flight-info-table {
    width: 100%;
    font-size: 14px;
    th,
    td {
        padding: 6px 8px;
        text-align: center;
    }
    th {
        background-color: #f4f4f4;
    }
}
.checkout-pay{
  padding: 0 25px;
  background-color: #fff; 
  margin-top: 15px;
}
.checkout-panel{
  border-bottom: 1px solid #cccccc;
  padding-bottom: 25px;
  &:only-of-type,&:last-child{
    border: 0;
  }
  .checkout-form-input{
    width: 180px;

    &.date-input{
      width: 200px;
    }
  }
  .checkout-panel-hd{
    padding: 15px 0;
    font-weight: 700;
  }

  .pay-type{
    margin-bottom: 10px;
  }

  .order-btn{
    padding: 20px 0;
    text-align: center;
  }

  .price-amount{
    padding: 20px 15px;
    background-color: #fbf3f8;
    p{
      color:#999999;
      margin: 0;
      &:first-child{
        color:#444;
        strong{
          color: #ff6600;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
