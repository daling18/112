<template>
  <div v-if="flightOption && flightPrice" class="air-checkout">
    <div class="checkout-main">
      <el-form ref="checkoutForm" :rules="rules" :model="checkoutForm" label-width="120px">
        <!-- <div class="panel">
          <div class="panel-hd">
            <h2>订单类型</h2>
          </div>
          <div class="panel-bd">
            <el-form-item label="订单类型">
              <el-radio v-model="checkoutForm.order_type" :label="2">同行订单</el-radio>
              <el-radio v-if="ORG_TYPE == 3" v-model="checkoutForm.order_type" :label="1">直客订单</el-radio>
            </el-form-item>
          </div>
        </div>
        <div v-if="checkoutForm.order_type == 2" class="panel">
          <div class="panel-hd">
            <h2>结算方</h2>
          </div>
          <div class="panel-bd">
            <el-form-item label="代理商"
                          prop="distributor_id" 
                          :rules="[
                            { type: 'object', required: true, message: '请选择代理商', trigger: 'change' }
                          ]">
              <select-org :class="'input-middle'" v-model="checkoutForm.distributor_id" partOrg></select-org>
            </el-form-item>
            <el-form-item label="联系人" 
                          prop="distributor_contacts"
                          :rules="[
                            { required: true, message: '请输入代理商联系人姓名', trigger: 'blur' }
                          ]">
              <el-input :class="'input-middle'" v-model="checkoutForm.distributor_contacts" placeholder="请输入代理商联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" 
                          prop="distributor_mobile"
                          :rules="[
                            { required: true, message: '请输入代理商联系人电话', trigger: 'blur' }
                          ]">
              <el-input :class="'input-middle'" v-model="checkoutForm.distributor_mobile" placeholder="请输入代理商联系人电话"></el-input>
            </el-form-item>
          </div> 
        </div> -->
        <div class="panel">
          <div class="panel-hd">
            <h2>乘机人</h2>
          </div>
          <div class="panel-bd">
            <div v-for="(tourist, key) in checkoutForm.tourist_list" :key="key" class="passenger">
              <div class="passenger-type">
                <span>第{{ key + 1 }}位</span>
                <p>{{ tourist.tourist_type == 1 ? '成人' : '儿童' }}</p>
              </div>
              <div class="passenger-info">
                <el-form-item label="乘机人姓名" required>
                  <el-col :span="11">
                    <el-form-item 
                      :prop="'tourist_list.' + key + '.last_name'"
                      :rules="[
                        { required: true, pattern: /^[a-z]+$/, message: '请输入姓（拼音或者英文）', trigger: 'change' }
                      ]">
                      <el-input v-model="tourist.last_name" placeholder="姓（拼音或者英文）"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    &nbsp;
                  </el-col>
                  <el-col :span="11">
                    <el-form-item 
                      :prop="'tourist_list.' + key + '.first_name'"
                      :rules="[
                        { required: true, pattern: /^[a-z]+$/, message: '请输入名（拼音或者英文）', trigger: 'change' }
                      ]">
                      <el-input v-model="tourist.first_name" placeholder="名（拼音或者英文）"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item 
                  label="证件类型"
                  :prop="'tourist_list.' + key + '.identity_type'"
                  :rules="[
                    { required: true, type:'number', message: '请选择证件类型', trigger: 'change' }
                  ]">
                  <el-select v-model="tourist.identity_type" placeholder="请选择证件类型">
                    <el-option
                      label="护照"
                      :value="2"
                    ></el-option>
                    <el-option
                      label="港澳通行证"
                      :value="4"
                    ></el-option>
                    <el-option
                      label="台湾通行证"
                      :value="11"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item 
                  label="证件号码"
                  :prop="'tourist_list.' + key + '.identity_no'"
                  :rules="[
                    { required: true, message: '请输入证件号码', trigger: 'change' }
                  ]">
                  <el-input v-model="tourist.identity_no" placeholder="请输入证件号码"></el-input>
                </el-form-item>
                <el-form-item 
                  label="证件签发地"
                  :prop="'tourist_list.' + key + '.identity_country'"
                  :rules="[
                    { required: true, message: '请选择证件签发地', trigger: 'change' }
                  ]">
                  <country-iata-picker v-model="tourist.identity_country" placeholder="请选择证件签发地"></country-iata-picker>
                </el-form-item>
                <el-form-item 
                  label="证件有效期"
                  :prop="'tourist_list.' + key + '.identity_end_date'"
                  :rules="[
                    { type:'date', required: true, message: '请选择证件有效期', trigger: 'change' }
                  ]" >
                  <el-date-picker
                    v-model="tourist.identity_end_date"
                    placeholder="请选择证件有效期"
                    type="date">
                  </el-date-picker>
                </el-form-item>
                <el-form-item 
                  label="性别" 
                  :prop="'tourist_list.' + key + '.gender'"
                  :rules="[
                    { required: true, type:'number', message: '请选择性别', trigger: 'change' }
                  ]">
                  <el-radio v-model="tourist.gender" class="radio" :label="1">男</el-radio>
                  <el-radio v-model="tourist.gender" class="radio" :label="2">女</el-radio>
                </el-form-item>
                <el-form-item
                  label="国籍" 
                  :prop="'tourist_list.' + key + '.country'" 
                  :rules="[
                    { required: true, message: '请选择国籍', trigger: 'change' }
                  ]">
                  <country-iata-picker v-model="tourist.country" placeholder="请选择国籍"></country-iata-picker>
                </el-form-item>
                <el-form-item
                  label="出生日期"
                  :prop="'tourist_list.' + key + '.birthday'"
                  :rules="[
                    { type:'date', required: true, message: '请选择出生日期', trigger: 'change' }
                  ]">
                  <el-date-picker
                    v-model="tourist.birthday"
                    placeholder="请选择出生日期"
                    type="date">
                  </el-date-picker>
                </el-form-item>
                <el-form-item 
                  label="乘机人手机号码"
                  :prop="'tourist_list.' + key + '.mobile'"
                  :rules="[
                    { required: true, message: '请输入乘机人手机号码', trigger: 'change' }
                  ]">
                  <el-input v-model="tourist.mobile" placeholder="请输入乘机人手机号码"></el-input>
                </el-form-item>
              </div>
              <div class="passenger-clear">
                <a href="javascript:;" @click="clearPassenger(key)">清空</a>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-hd">
            <h2>联系人信息</h2>
          </div>
          <div class="panel-bd">
            <div class="contacts">
              <el-form-item label="姓名" prop="contact.name">
                <el-input v-model="checkoutForm.contact.name" placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="contact.mobile">
                <el-input v-model="checkoutForm.contact.mobile" placeholder="请输入联系人手机号码"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="contact.email">
                <el-input v-model="checkoutForm.contact.email" placeholder="请输联系人邮箱地址"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="checkout-pay">
          <div class="checkout-panel">
            <div class="checkout-panel-hd">
              支付方式
            </div>
            <div class="checkout-panel-bd">
              <!-- <p class="pay-type"><el-radio v-model="checkoutForm.pay_type" :label="1">可下单金额</el-radio></p> -->
              <p class="pay-type"><el-radio v-model="checkoutForm.pay_type" :label="2">在线支付</el-radio></p>
              <div class="price-amount">
                <p>订单金额：￥<strong>{{ flightPrice.total_price }}</strong></p>
              </div>
              <div class="order-btn">
                <el-button type="primary" size="large" @click="createForeignFlightOrderHandler">提交</el-button>
                <el-button size="large" @click="$router.back()">返回</el-button>
              </div>
              <div class="tips">
                <span>温馨提示：</span>
                <br> 1、提交订单后，请在15分钟内完成支付，未在规定时间内完成，系统将会自动取消您的订单
                <br> 2、航班价格变动频繁，请尽快完成订单填写。
                <br> 3、资料填写过程中若有疑问请联系客服，xxxxx。
                <br> 4、持商务、旅游等短期签证的旅客，建议您直接购买往返程票或持有返程票，以免无法办理乘机和出境手续。
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="checkout-side">
      <div class="checkout-info">
        <div class="checkout-hd">
          <div class="price-outer">
            <div class="price-item">
              <div class="label">成人价</div>
              <div class="price">￥<strong>{{ flightPrice.adult_base_fare + flightPrice.adult_taxes }}</strong></div>
            </div>
            <div class="price-item">
              <div class="label">票价</div>
              <div class="price">￥{{ flightPrice.adult_base_fare }}</div>
            </div>
            <div class="price-item">
              <div class="label">税费</div>
              <div class="price">￥{{ flightPrice.adult_taxes }}</div>
            </div>
          </div>
          <template v-if="flightPrice.child_quantity">
            <div class="price-outer">
              <div class="price-item">
                <div class="label">儿童价</div>
                <div class="price">￥<strong>{{ flightPrice.child_base_fare + flightPrice.child_taxes }}</strong></div>
              </div>
              <div class="price-item">
                <div class="label">票价</div>
                <div class="price">￥{{ flightPrice.child_base_fare }}</div>
              </div>
              <div class="price-item">
                <div class="label">税费</div>
                <div class="price">￥{{ flightPrice.child_taxes }}</div>
              </div>
            </div>
          </template>
          <div class="price-item">
            <div class="label">订单金额</div>
            <div class="price">￥<strong>{{ flightPrice.total_price }}</strong></div>
          </div>
        </div>
        <div class="checkout-bd">
          <div v-for="(flight, flightKey) in flightOption" :key="flightKey" class="flight-item">
            <div class="flight-item-hd">
              {{ flight[0].departure_city_name }} - {{ flight[flight.length - 1].arrival_city_name }}
            </div>
            <div class="flight-item-bd">
              <p class="airline">{{ flight[0].airline_company + ' ' + flight[0].flight_no + ' ' + flight[0].craft_type + ' ' + flight[0].seat_type_name }}</p>
              <div class="time">
                <div class="depart">
                  <span>{{ flight[0].departure_date }}</span>
                  <p>{{ flight[0].departure_time }}</p>
                  <span>{{ flight[0].departure_port_st_name + flight[0].departure_terminal }}</span>
                </div>
                <div class="arrows"></div>
                <div class="arrive">
                  <span>{{ flight[flight.length - 1].arrival_date }}</span>
                  <p>{{ flight[flight.length - 1].arrival_time }}</p>
                  <span>{{ flight[flight.length - 1].arrival_port_st_name + flight[flight.length - 1].arrival_terminal }}</span>
                </div>
              </div>
            </div>
          </div>
          <p class="reset-flight">
            <a href="javascript:;" @click="$router.back();">重新选择航班</a>
          </p>
          <div class="tips">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            所有起飞降落时间均为当地时间
          </div>
        </div>
      </div>
      <div v-if="refunds" class="checkout-refunds">
        <div class="checkout-refunds-hd">
          退改签规则
        </div>
        <div class="checkout-refunds-bd">
          <dl>
            <dt>成人退改签规则</dt>
            <dd v-html="refunds.adult_rule"></dd>
          </dl>
          <dl>
            <dt>儿童退改签规则</dt>
            <dd v-html="refunds.child_rule"></dd>
          </dl>
          <dl>
            <dt>婴儿退改签规则</dt>
            <dd v-html="refunds.baby_rule"></dd>
          </dl>
        </div>
      </div>
    </div>
    <online-pay ref="onlinePay" :order-id="orderId" order-resource="2" />
  </div>
</template>

<script>
import * as format from 'src/utils/format';
import { getForeignFlightDetails, createForeignFlightOrder, getForeignFlightRefund } from 'src/api/flight';
import CountryIataPicker from './components/CountryIataPicker/index.vue';
import SelectOrg from "src/plugins/SelectOrg.vue";
import OnlinePay from "./components/OnlinePay.vue";
const ORG_TYPE = +localStorage.getItem('orgtype');
export default {
  data() {
    return {
      ORG_TYPE,
      orderId: '',
      flightOption: null,
      flightPrice: null,
      refunds: null,
      checkoutForm: {
        pay_type: 2,
        price: null,
        source: null,
        order_source: 0,
        price_id: null,
        order_source: 1,
        customer_id: 0,
        tourist_list:[
          {
            first_name: "",
            last_name: "",
            tourist_type: 1,
            identity_type: null,
            identity_no: "",
            identity_end_date: "",
            identity_country: "",
            gender: 1,
            country: "",
            mobile: "",
            birthday: ""
          }
        ],
        contact: {
          name: "",
          mobile: "",
          email: ""
        }
      },
      rules:{
        'contact.name': [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        'contact.mobile': [
          { required: true, message: '请输入联系人手机号码', trigger: 'blur' }
        ],
        'contact.email': [
          { required: true, message: '请输入联系人邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  components:{
    CountryIataPicker,
    SelectOrg,
    OnlinePay
  },
  methods: {
    getForeignFlightDetailsHandler(){
      let params = {
        data: {
          price_id: this.$route.query.priceId
        }
      }
      getForeignFlightDetails({
        params: params,
        success: (params) => {
          let { code, msg, data } = params['data'];
          if(code == 0){
            this.flightOption = data.flight_option;
            this.flightPrice = data.flight_price;
            this.checkoutForm.source = data.flight_price.source;
            this.checkoutForm.price = data.flight_price.total_price;
            this.checkoutForm.price_id = data.flight_price.price_id;
            this.requestRefundsHandler(data.flight_price.price_id);
            this.initTouristList(data.flight_price.adult_quantity, data.flight_price.child_quantity);
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    createForeignFlightOrderHandler(){
      this.$refs['checkoutForm'].validate((valid) => {
        if (valid) {
          let params = {
            data: JSON.parse(JSON.stringify(this.checkoutForm))
          }
          params.data.tourist_list = params.data.tourist_list.map((i) => {
            i.birthday = format.date(i.birthday);
            i.identity_end_date = format.date(i.identity_end_date);
            return i
          });
          createForeignFlightOrder({
            params: params,
            success: (params) => {
              let { code, data, msg } = params['data'];
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
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    initTouristList(aultNum, childNum){
      let tourists = null;
      tourists = Array.from({ length:aultNum + childNum }, (tourist, key) => {
        let touristType = 1;
        if(key + 1 > aultNum){
          touristType = 2
        }
        return {
          first_name: "",
          last_name: "",
          tourist_type: touristType,
          identity_type: null,
          identity_no: "",
          identity_end_date: "",
          identity_country: "",
          gender: null,
          country: "",
          mobile: "",
          birthday: ""
        }
      });
      this.checkoutForm.tourist_list = tourists;
    },
    clearPassenger(key){
      this.checkoutForm.tourist_list[key].first_name = "";
      this.checkoutForm.tourist_list[key].last_name = "";
      this.checkoutForm.tourist_list[key].identity_type = null;
      this.checkoutForm.tourist_list[key].identity_no = "";
      this.checkoutForm.tourist_list[key].identity_end_date = "";
      this.checkoutForm.tourist_list[key].identity_country = "";
      this.checkoutForm.tourist_list[key].gender = null;
      this.checkoutForm.tourist_list[key].country = "";
      this.checkoutForm.tourist_list[key].mobile = "";
      this.checkoutForm.tourist_list[key].birthday = "";
    },
    requestRefundsHandler(id){
      let params = {
        data:{
          price_id: id
        }
      }
      this.refundsLoading = true;
      getForeignFlightRefund({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          this.refundsLoading = false;
          if(code == 0){
            this.$set(this, 'refunds', data);
          }else{
            this.$message.error(msg);
          }
        }
      });
    }
  },
  mounted() {
    this.getForeignFlightDetailsHandler();
  }
}
</script>

<style lang="less">
  .air-checkout{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    .checkout-main{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      margin-right: 10px;
      .el-select{
        display: block;
      }
      .el-date-editor{
        &.el-input{
          width: 100%;
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
      .panel{
        padding: 20px;
        background-color: #fff;
        margin-bottom: 10px;
        .panel-hd{
          h2{
            font-size: 18px;
          }
        }
        .panel-bd{
          padding: 20px 0;
        }
      }
      .passenger{
        position: relative;
        padding-left: 90px;
        padding-right: 40px;
        width: 520px;
        margin: 0 auto;
        .passenger-type{
          position: absolute;
          left: 10px;
          border: 1px solid #dddddd;
          border-radius: 4px;
          line-height: 25px;
          width: 80px;
          color: #999999;
          text-align: center;
          p{
            background-color: #f4f4f4;
            color: #ae1f77;
          }
        }
        .passenger-info{
          width: 450px;
        }
        .passenger-clear{
          position: absolute;
          top: 0;
          right: 20px;
        }
      }

      .contacts{
        width: 500px;
        margin: 0 auto;
      }

      .footer{
        background-color: #fff;
        .footer-hd{
          line-height: 60px;
          text-align: center;
          color: #999999;
          background-color: #fff9e7;
          font-size: 18px;

          strong{
            color: #ff6600;
          }
        }
        .footer-bd{
          padding: 30px 0;
          text-align: center;
        }
      }
    }
    .checkout-side{
      width: 400px;
    }
    .checkout-info{
      background-color: #fff;
      margin-bottom: 10px;
      .checkout-hd{
        padding: 15px 20px; 
        .price-outer{
          margin-bottom: 10px;
          border-bottom: 1px dashed #ddd;
        }
        .price-item{
          display: box;             /* OLD - Android 4.4- */
          display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
          display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
          display: -ms-flexbox;     /* TWEENER - IE 10 */
          display: -webkit-flex;   /* NEW - Chrome */
          display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
          /* 09版 */
          -webkit-box-pack: space-between;/*start     center end    justify*/
          /* 12版 */
          -webkit-justify-content: space-between;
          -moz-justify-content: space-between;
          -ms-justify-content: space-between;
          -o-justify-content: space-between;
          justify-content: space-between;
          -webkit-box-align: center;
          /* 12版 */
          -webkit-align-items: flex-end;
          -moz-align-items: flex-end;
          -ms-align-items: flex-end;
          -o-align-items: flex-end;
          align-items: flex-end;
          margin-bottom: 10px;
          .price{
            strong{
              font-size: 24px;
              color: #ff6600;
            }
          }
        }
        
      }
      .flight-item{
        .flight-item-hd{
          padding: 10px;
          background-color: #fafafa;
          font-size: 20px;
          color: #666666;
        }
        .flight-item-bd{
          padding: 10px;
          .airline{
            line-height: 20px;
            margin-bottom: 10px;
          }
          .time{
            display: box;             /* OLD - Android 4.4- */
            display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;       /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;     /* TWEENER - IE 10 */
            display: -webkit-flex;   /* NEW - Chrome */
            display: flex;           /* NEW, Spec - Opera 12.1, Firefox 20+ */
            -webkit-box-align: center;
            /* 12版 */
            -webkit-align-items: center;
            -moz-align-items: center;
            -ms-align-items: center;
            -o-align-items: center;
            align-items: center;
            -webkit-box-flex: 0 1 280px;      /* OLD - iOS 6-, Safari 3.1-6 */
            -webkit-flex:  0 1 280px;         /* Chrome */
            -ms-flex:  0 1 280px;              /* IE 10 */
            flex:  0 1 280px;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */

            .depart,.arrive{
              -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
              -webkit-flex:  1;         /* Chrome */
              -ms-flex:  1;              /* IE 10 */
              flex:  1;                 /* NEW, Spec - Opera 12.1, Firefox 20+ */
              .days{
                font-style: normal;
                font-size: 12px;
                color: #ff6600;
              }
              p{
                font-size: 18px;
                font-weight: 700;
              }
            }
            .depart{
              text-align: right;
            }
            .arrive{
              text-align: left;
            }
            .arrows {
              position: relative;
              display: block;
              width: 80px;
              height: 8px;
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
            }
          }
        }
      }
      .reset-flight{
        padding: 10px;
        text-align: right;
      }
      .tips{
        padding: 10px;
        background-color: #f4f4f4;
      }
    }
    
    .checkout-refunds{
      background-color: #fff;
      .checkout-refunds-hd{
        padding: 10px 15px;
      }
      .checkout-refunds-bd{
        padding: 0 15px 10px;
        dl{
          margin-bottom: 10px;
          dt{
            color: #ae1f77;
            margin-bottom: 10px;
          }
          dd{
            max-height: 400px;
            padding: 10px;
            background-color: #f4f4f4;
            line-height: 20px;
            overflow: hidden;
            overflow-y: auto;
          }
        }
      }
    }
  }
  .input-middle{
    width: 200px;
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
