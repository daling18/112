<template>
<div class="checkout-content" element-loading-text="正在下单占座中" v-loading.fullscreen.lock="fullscreenLoading">

  <div class="checkout-side">
    <div v-if="selectedSeat" class="order-summary">
      <div class="order-summary-title">
        订单金额：
        <span class="total">￥{{ selectedSeat.price * passengerNum}}</span>
      </div>
      <div class="order-summary-detail">
        <p class="summary-item">
          {{ selectedSeat.name + '：¥' + selectedSeat.price + 'x' + passengerNum }}
        </p>
      </div>
    </div>
    <!-- <div class="tips">
      <p class="tips-hd">温馨提示</p>
      <p>1、提交订单占座成功后，请在15分钟内完成支付，未在规定时间内完成，系统将会自动取消您的订单</p>
      <p>2、购买儿童票时，乘车儿童有有效身份证件的，请填写本人有效身份证件信息。乘车儿童没有有效身份证件的，应使用同行成年人的有效身份证件信息；购票后、开车前须办理换票手续方可进站乘车</p>
      <p>3、学生票乘车时间限为每年的暑假6月1日至9月30日、寒假12月1日至3月31日。购票后、开车前，须办理换票手续方可进站乘车。换票时，新生凭录取通知书，毕业生凭学校书面证明，其他凭学生优惠卡。</p>
      <p>4、 购买残疾军人（伤残警察）优待票的，须在购票后、开车前办理换票手续方可进站乘车。换票时，不符合规定的减价优待条件，没有有效"中华人民共和国残疾军人证"或"中华人民共和国伤残人民警察证"的，不予换票，所购车票按规定办理退票手续。</p>
    </div> -->
  </div>

  <el-form :model="form" :rules="rules" ref="orderForm" label-width="80px">
    <div class="checkout-main">
      <div v-if="touristInfo" class="checkout-model">
        <div class="checkout-hd">
          原票信息
        </div>
        <div class="checkout-bd">
          <el-table
            :data="touristInfo"
            style="width: 100%">
            <el-table-column
              header-align="center"
              align="center"
              label="车次信息"
              width="200">
              <template slot-scope="prop">
                <p>{{ prop.row.start_time }}</p>
                {{ prop.row.checi }}&nbsp;&nbsp;{{ prop.row.from_station_name }} - {{ prop.row.to_station_name }}
              </template>
            </el-table-column>
            <el-table-column
              prop="cxin"
              header-align="center"
              align="center"
              label="席位信息">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              label="旅客信息">
              <template slot-scope="prop">
                <p>{{ prop.row.passengersename }}</p>
                {{ prop.row.zwname }}
              </template>
            </el-table-column>
            <el-table-column
              prop="piaotypename"
              header-align="center"
              align="center"
              label="票种">
            </el-table-column>
            <el-table-column
              prop="price"
              header-align="center"
              align="center"
              label="票款金额">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="train-checkout-info" v-if="trainInfo">
        <table>
          <tr>
            <td width="180">
              <div class="runs">
                <p class="name">{{trainInfo.from_station_name}}</p>
                <div class="date-time">
                  <span class="date">
                    {{trainInfo.start_year+'年'}}<br>
                    {{trainInfo.start_month+'月'}}{{trainInfo.start_day+'日'}}
                  </span>
                  <span class="time">{{trainInfo.start_time}}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="run-long">
                <p class="classify">{{trainInfo.train_code}}</p>
                <p class="arrows"></p>
                <p class="long">{{trainInfo.run_time}}</p>
              </div>
            </td>
            <td width="180">
              <div class="runs">
                <p class="name">{{trainInfo.to_station_name}}</p>
                <div class="date-time">
                  <span class="date">
                    {{trainInfo.arrive_year+'年'}}<br>
                    {{trainInfo.arrive_month+'月'}}{{trainInfo.arrive_day+'日'}}
                  </span>
                  <span class="time">{{trainInfo.arrive_time}}</span>
                </div>
              </div>
            </td>
            <td class="modify-runs">
              <el-button @click="handleChangeTrain">修改车次</el-button>
            </td>
          </tr>
        </table>
      </div>
      <!-- <div class="checkout-model">
        <div class="checkout-hd">
          1.订单类型
        </div>
        <div class="checkout-bd">
          <el-form-item label="订单类型">
            <el-radio v-model="form.order_type" :label="2">同行订单</el-radio>
            <el-radio v-if="ORG_TYPE == 3" v-model="form.order_type" :label="1">直客订单</el-radio>
          </el-form-item>
        </div>
      </div> -->
      <div class="checkout-model">
        <div class="checkout-hd">1. 选择坐席</div>
        <div class="checkout-bd" v-if="trainInfo">
          <div class="select-runs-seat clearfix">
            <template v-for="(item,idx) in trainInfo.ticket_types" >
              <el-radio :key="idx" v-model="form.zwcode" :label="item.zwcode" :disabled="item.num == 0">
                <div :class="'runs-seat '+(item.num == 0?'none-num':(item.zwcode == form.zwcode ?'cur':''))">
                  <p class="name">{{item.name}} <em class="price">&yen;{{item.price}}</em></p>
                  <p>余票{{item.num}}张</p>
                </div>
              </el-radio>
            </template>
          </div>
          <p class="accept-line">
            <el-checkbox v-model="form.is_accept_standing" :true-label="1" :false-label="2">是否接受无座票</el-checkbox>
          </p>
        </div>
      </div>

      
      <!-- <div class="checkout-model">
        <div class="checkout-hd">3. 结算方</div>
        <div class="passenger">
          <el-form-item label="代理商" prop="distributor_id">
            <select-org v-model="form.distributor_id" partOrg></select-org>
          </el-form-item>
          <el-form-item label="联系人" prop="distributor_contacts">
            <el-input v-model="form.distributor_contacts" placeholder="请输入联系人姓名"
              :rules="[
                { required: true, message: '请输入联系人', trigger: 'blur' }
              ]"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="distributor_mobile">
            <el-input v-model="form.distributor_mobile" placeholder="请输入联系电话"
              :rules="[
              {required: true, message: '请输入用户名', trigger: 'blur'},
              { pattern: /^1[34578]\d{9}$/, message: '请填写正确手机号码', trigger: 'blur'}
            ]"
            ></el-input>
          </el-form-item>
        </div>
      </div> -->


      <div class="checkout-model" v-if="!isChange">
        <div class="checkout-hd">2. 乘客信息</div>
        <div class="checkout-bd">
          
          <div class="passenger" v-for="(visitor,idx) in form.passengers" :key="idx">
            <div class="del" v-if="form.passengers.length>1" @click="deleteAdultChild(idx)">删除</div>
            <div class="passenger-type">
              <p class="rang">{{idx+1}}</p>
              <p class="rang-text">
                <span v-if="visitor.piaotype == 1">成人票</span>
                <span v-if="visitor.piaotype == 2">儿童票</span>
                <span v-if="visitor.piaotype == 3">学生票</span>
                <span v-if="visitor.piaotype == 4">残军票</span>
              </p>
              <el-popover v-if="visitor.piaotype == 3"
                placement="right"
                width="300"
                trigger="hover">
                <p class="legend" slot="reference">购票说明 <span>?</span></p>
                <div>
                  <p>1）学生票乘车时间限为每年暑假06月01日-09月30日，寒假12月01日-03-31日</p>
                  <p>2）每年乘车次数限于四次单程，当年未使用的次数，不能留至下年使用；</p>
                  <p>3）学生票仅支持购买硬座、硬卧、二等座、无座等坐席；</p>
                  <p>4）在优惠乘车区间之内，且优惠乘车区间限于家庭至院校（实习地点）之间，按现行规定，学生票购票区间必须与学生证上的乘车区间一致，否则车站将不予换票。</p>
                </div>
              </el-popover>

              
            </div>
              <el-form-item label="姓名"
                :prop="'passengers.' + idx + '.passengersename'"
                :rules="[
                  { required: true,  message: '请输入游客姓名', trigger: 'change' }
                ]">
                <el-input v-model="visitor.passengersename" placeholder="请输入游客姓名" :disabled="visitor.isAccompanyingChildren"></el-input>
              </el-form-item>
              <el-form-item 
                label="证件类型"
                :prop="'passengers.' + idx + '.passporttypeseid'"
                :rules="[
                  { required: true, type:'string', message: '请选择证件类型', trigger: 'change' }
                ]">
                <el-select v-model="visitor.passporttypeseid" placeholder="请选择证件类型" :disabled="visitor.isAccompanyingChildren">
                  <el-option
                    label="二代身份证"
                    value="1"></el-option>
                  <el-option
                    label="一代身份证"
                    value="2"></el-option>
                  <el-option
                    label="港澳通行证"
                    value="C"></el-option>
                  <el-option
                    label="台湾通行证"
                    value="G"></el-option>
                  <el-option
                    label="护照"
                    value="B"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item 
                label="证件号码"
                :prop="'passengers.' + idx + '.passportseno'"
                :rules="[
                  { required: true, message: '请输入证件号码', trigger: 'change' }
                ]">
                <el-input v-model="visitor.passportseno" placeholder="请输入证件号码" 
                  :disabled="visitor.isAccompanyingChildren"></el-input>
              </el-form-item>
              <el-form-item label="票种"
                :prop="'passengers.' + idx + '.piaotype'"
                :rules="[
                  { required: true, type:'number', message: '请选择票种', trigger: 'change' }
                ]">
                <el-select v-model="visitor.piaotype" placeholder="请选择票种" :disabled="visitor.isAccompanyingChildren">
                  <el-option
                    label="成人票"
                    :value="1"></el-option>
                  <el-option
                    label="儿童票"
                    :value="2"></el-option>
                  <el-option
                    label="学生票"
                    :value="3"></el-option>
                  <el-option
                    label="残军票"
                    :value="4"></el-option>
                </el-select>
                <div class="btn-tool" v-if="visitor.piaotype == 1">
                  <el-button @click="addPeerChild(idx)">+ 添加同行儿童</el-button>
                </div>
              </el-form-item>
              <div class="student-about-info" v-if="visitor.piaotype == 3">
                <div class="passenger-type">
                  <p class="rang-text">附加信息</p>
                </div>
                <el-form-item label="学校所在省份">
                  <el-input v-model="visitor.province_code" placeholder="请选择学校所在省份"></el-input>
                </el-form-item>
                <el-form-item label="学校名称">
                  <el-input v-model="visitor.school_code" placeholder="请输入学校名称"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                  <el-input v-model="visitor.student_no" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="学制">
                  <el-input v-model="visitor.school_system" placeholder="请输入学制"></el-input>
                </el-form-item>
                <el-form-item label="入学年份">
                  <el-date-picker v-model="visitor.enter_year" align="right" type="year" placeholder="请选择入学年份"></el-date-picker>
                </el-form-item>
                <el-form-item label="优惠区间">
                  <el-col :span="11">
                    <el-input v-model="visitor.preference_from_station_code" placeholder="请输入优惠区间"></el-input>
                  </el-col>
                  <el-col :span="2" class="space-line">—</el-col>
                  <el-col :span="11">
                    <el-input v-model="visitor.preference_to_station_code" placeholder="请输入优惠区间"></el-input>
                  </el-col>
                </el-form-item>
              </div>
          </div>
          <div class="btn-tool tc">
            <el-button type="primary" @click="addAdultChild">+ 添加乘客</el-button>
          </div>
        </div>
      </div>

      <div class="checkout-model">
          <div class="checkout-hd">3. 指定座位</div>
          <el-checkbox-group v-model="form.seats" :max="passengerNum">
          <div class="passenger">
            <div class="passenger-type">
              <p class="rang-text">已选 {{form.seats.length}}/{{ passengerNum }}</p>
            </div>
            <div class="seat-choose">
              <el-col :span="2"><p class="text">窗</p></el-col>
              <el-col :span="3">
                <el-checkbox label="1A">
                  <p :class="'choose ' + (form.seats.indexOf('1A') != -1?'cur':'')">A</p>
                </el-checkbox>
              </el-col>
              <el-col :span="3">
                <el-checkbox label="1B">
                  <p :class="'choose ' + (form.seats.indexOf('1B') != -1?'cur':'')">B</p>
                </el-checkbox>
              </el-col>
              <el-col :span="3">
                <el-checkbox label="1C">
                  <p :class="'choose ' + (form.seats.indexOf('1C') != -1?'cur':'')">C</p>
                </el-checkbox>
              </el-col>
              <el-col :span="5"><p class="text">过道</p></el-col>
              <el-col :span="3">
                <el-checkbox label="1D">
                  <p :class="'choose ' + (form.seats.indexOf('1D') != -1?'cur':'')">D</p>
                </el-checkbox>
              </el-col>
              <el-col :span="3">
                <el-checkbox label="1F">
                  <p :class="'choose ' + (form.seats.indexOf('1F') != -1?'cur':'')">F</p>
                </el-checkbox>
              </el-col>
              <el-col :span="2"><p class="text">窗</p></el-col>
            </div>
          </div>

          <div class="passenger" v-if="passengerNum > 1">
            <div class="seat-choose">
              <el-col :span="2"><p class="text">窗</p></el-col>
              <el-col :span="3">
                <el-checkbox label="2A">
                  <p :class="'choose ' + (form.seats.indexOf('2A') != -1?'cur':'')">A</p>
                </el-checkbox>
              </el-col>
              <el-col :span="3">
                <el-checkbox label="2B">
                  <p :class="'choose ' + (form.seats.indexOf('2B') != -1?'cur':'')">B</p>
                </el-checkbox>
              </el-col>
              <el-col :span="3">
                <el-checkbox label="2C">
                  <p :class="'choose ' + (form.seats.indexOf('2C') != -1?'cur':'')">C</p>
                </el-checkbox>
              </el-col>
              <el-col :span="5"><p class="text">过道</p></el-col>
              <el-col :span="3">
                <el-checkbox label="2D">
                  <p :class="'choose ' + (form.seats.indexOf('2D') != -1?'cur':'')">D</p>
                </el-checkbox>
              </el-col>
              <el-col :span="3">
                <el-checkbox label="2F">
                  <p :class="'choose ' + (form.seats.indexOf('2F') != -1?'cur':'')">F</p>
                </el-checkbox>
              </el-col>
              <el-col :span="2"><p class="text">窗</p></el-col>
            </div>
          </div>
          </el-checkbox-group>
      </div>

      <div v-if="!isChange" class="checkout-model">
        <div class="checkout-hd">4. 联系人</div>
        <div class="passenger">
          <el-form-item label="姓名" prop="contact_name">
            <el-input v-model="form.contact_name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="contact_telphone">
            <el-input v-model="form.contact_telphone" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.contact_email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="footer-submit-tool">
        <div class="total">订单总金额 <strong v-if="selectedSeat"><em>&yen;</em> {{ selectedSeat.price * passengerNum}}</strong></div>
        <div class="tips">
          <p class="tips-hd">温馨提示</p>
          <p style="color:#f60">1、提交订单占座成功后，请在15分钟内完成支付，未在规定时间内完成，系统将会自动取消您的订单；</p>
          <p>2、购买儿童票时，乘车儿童有有效身份证件的，请填写本人有效身份证件信息。乘车儿童没有有效身份证件的，应使用同行成年人的有效身份证件信息；购票后、开车前须办理换票手续方可进站乘车；</p>
          <p>3、学生票乘车时间限为每年的暑假6月1日至9月30日、寒假12月1日至3月31日。购票后、开车前，须办理换票手续方可进站乘车。换票时，新生凭录取通知书，毕业生凭学校书面证明，其他凭学生优惠卡；</p>
          <p>4、 购买残疾军人（伤残警察）优待票的，须在购票后、开车前办理换票手续方可进站乘车。换票时，不符合规定的减价优待条件，没有有效"中华人民共和国残疾军人证"或"中华人民共和国伤残人民警察证"的，不予换票，所购车票按规定办理退票手续。</p>
        </div>
        <el-button type="primary" size="large" @click="submitTrainOrder">提交订单</el-button>
      </div>
    </div>
  </el-form>
  <el-dialog custom-class="hold-message-dialog"
             :visible.sync="holdVisible"
             size="small"
             :show-close="false"
             :close-on-click-modal="false">
    <div class="hold-message-cont">
      {{ holdMessage }}
    </div>
  </el-dialog>
  <online-pay
	ref="onlinePay"
	:order-id="order_id"
	order-resource="5"
/>
</div>
</template>

<script>
import { getTrainForm, 
getDistributionChangeTrainAsyncRequest, 
submitDistributionChangeTrainAsyncRequest, 
getDistributionChangeTrainStatusAsyncRequest,
getHoldingSeat, submitOrderForm } from 'src/api/train';
import { dateTimeFormatter } from 'src/assets/js/common';
import SelectOrg from "src/plugins/SelectOrg.vue";
import OnlinePay from "src/components/distribution/components/OnlinePay.vue";

const ORG_TYPE = +localStorage.getItem('orgtype');
export default {
  data(){
    return {
      order_id:'',
      order_status:'',
      intervalFlag:0,
      fullscreenLoading:false,
      checkParams: null,
      trainInfo:null,
      ORG_TYPE,
      form: {
        zwcode: '',
        is_accept_standing: 1,
        contact_name: '',
        contact_telphone: '',
        contact_email: '',
        seats: [],
        train_info: {
          to_station_code: '',
          train_no: '',
          from_station_code: '',
          train_date: ''
        },
      },
      isChange: false,
      touristInfo:null,
      holdVisible: false,
      holdMessage: '',
      rules:{
        distributor_id: [
          { required: true, type: 'object', message: '请选择代理商', trigger: 'change' }
        ],
        distributor_contacts: [
          { required: true, message: '请输入代理商联系人姓名', trigger: 'blur' }
        ],
        distributor_mobile: [
          { required: true, message: '请输入代理商联系人手机号码', trigger: 'blur' },
          { pattern: /^((1[34578][0-9]{1})+\d{8})$/, message: '手机号码格式错误', trigger: 'blur' },
        ],
        'contact_name':[
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        'contact_telphone':[
          { required: true, message: '请输入联系人手机号码', trigger: 'blur' },
          { pattern: /^((1[34578][0-9]{1})+\d{8})$/, message: '手机号码格式错误', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    passengerNum(){
      let num;

      if(!this.isChange){
        num = this.form.passengers && this.form.passengers.length;
      }else{
        num = this.touristInfo && this.touristInfo.length;
      }

      return num || 0
    },
    selectedSeat(){
      let types = this.trainInfo && this.trainInfo.ticket_types,
          zwcode = this.form.zwcode;

      if(!types){
        return 0;
      }

      for(let i in types){
        if(zwcode == types[i].zwcode){
          return types[i];
        }
      }
    }
  },
  components:{
    SelectOrg,
		OnlinePay
  },
  watch:{
    order_status(val){
      if(val == 2){
        clearInterval(this.intervalFlag);
        this.fullscreenLoading = false;
        this.handleOnlinePay();
      }
    }
  },
  methods: {
    initPassengers(){
      let passengers = {};
      passengers.passengersename = '';
      passengers.passportseno = '';
      passengers.passporttypeseidname = '';
      passengers.passporttypeseid = '';
      passengers.passengerid = '';
      passengers.ticket_no = '';
      passengers.piaotype = '';
      passengers.piaotypename = '';
      passengers.zwname = '';
      passengers.price = '';
      passengers.reason = '';
      passengers.school = this.initSchool();
      
      passengers.preference_from_station_name = '';
      passengers.preference_from_station_code = '';
      passengers.preference_to_station_name = '';
      passengers.preference_to_station_code = '';
      return passengers;
    },
    initSchool(){
      let school = {};
      school.province_name = '';
      school.province_code = '';
      school.school_code = '';
      school.school_name = '';
      school.student_no = '';
      school.school_system = '';
      school.enter_year = '';
      return school;
    },
    getChangeTrainTicketInfo(data){
      let params = {
        data: data
      }
      getDistributionChangeTrainAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.touristInfo = data.tourist_info;
            this.trainInfo = data.train_info;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    getTrainTicketInfo(params){
      let para = {
        data: params
      };
      getTrainForm({
          params: para,
          success: (res) => {
            let {code, msg, data} = res['data'];
            if(code == 0){
              this.trainInfo = data.train_info;
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
    },
    submitTrainOrder(){
      let { order_no, tourist_ids} = this.checkParams;
      if(order_no && tourist_ids){
        this.submitChangeTrainTicket();
      }else{
        this.setTrainFormSubmit();
      }
    },
    submitChangeTrainTicket(){
      let { params } = this.$route.query,
          data = { 
            data: JSON.parse(window.decodeURIComponent(window.atob(params)))
          };
      data['data'].seats = this.form.seats.join(',');
      this.holdMessage = '订单提交中，请勿关闭页面！';
      this.holdVisible = true;
      submitDistributionChangeTrainAsyncRequest({
        params: data,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.getChangedTrainTicketStatus(data.change_no);
          }else{
            this.$router.replace({ 
              name: 'DistributionTrainMyOrderDetail', 
              query: {
                orderId: this.checkParams.order_id
              } 
            });
            this.holdVisible = false;
            this.$message.error(msg);
          }
        }
      });
    },
    getChangedTrainTicketStatus(changeNo){
      let params = {
        data: {
          change_no: changeNo
        }
      }
      getDistributionChangeTrainStatusAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            if(data.change_status == 1){
              setTimeout(() => {
                this.getChangedTrainTicketStatus(changeNo);
              },2000);
            }else if(data.change_status == 2){
              this.$router.replace({ 
                name: 'DistributionTrainChangeCheckout', 
                query: {
                  changeNo
                } 
              });
            }else{
              this.$router.replace({ 
                name: 'DistributionTrainMyOrderDetail', 
                query: {
                  orderNo: this.checkParams.order_no
                } 
              });
            }
          }else{
            this.holdVisible = false;
            this.$message.error(msg);
          }
        }
      });
    },
    // 提交订单
    setTrainFormSubmit(){
      this.$refs.orderForm.validate((valid) => {
        if(valid){
          this.fullscreenLoading = true;
          let form = JSON.parse(JSON.stringify(this.form));
          let trainInfo = JSON.parse(JSON.stringify(this.trainInfo));
          let para = {};
          para.data = form;
          para.data.train_info = {
            from_station_code :trainInfo.from_station_code,
            to_station_code :trainInfo.to_station_code,
            train_no :trainInfo.train_no,
            train_date :trainInfo.train_date,
          };
          para.data.seats = form.seats.join('');

          submitOrderForm({
            params: para,
            success: (res) => {
              let {code, msg, data} = res['data'];
              let that  = this;
              this.$message({
                type:!code?'success':'error',
                message:msg
              })
              if(!code){
                this.intervalFlag = setInterval(function(){
                  that.watingForTrainHoldingSeat(data.order_no)
                },1000);
              }else{
                this.fullscreenLoading = false;
              }
            },
            showLoading: false
          });
        }else{
           console.log('error submit!!');
          return false;
        }
      });
    },
    // 监听占座
    watingForTrainHoldingSeat(order_no){
          let that = this;
          let para = {};
          para.data = {};
          para.data.order_no = order_no;

          getHoldingSeat({
            params: para,
            success: (res) => {
              let {code, msg, data} = res['data'];
              
              this.$set(this,'order_status',data.order_status);
              if(data.order_status == 2){
                this.$set(this,'order_id',data.order_no);
              }
              if(data.order_status == 6){
                that.fullscreenLoading = false;
                clearInterval(that.intervalFlag);
                that.$confirm(data.msg, {
                  confirmButtonText: '查看订单列表',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  that.$router.push({path:'/distribution/train-order'});
                }).catch({});
              }
            },
            showLoading: false
          });
      
    },
    // 点击选座席类型
    selectRunsSeat(item){
      if(item.num != 0){
        this.$set(this,'trainSeatInfo',item);
      }
    },
    // 添加同行儿童
    addPeerChild(idx){
      let passengersename = this.form.passengers[idx].passengersename;
      let manTypeseId = this.form.passengers[idx].passporttypeseid;
      let manSeno = this.form.passengers[idx].passportseno;
      if(manSeno && manTypeseId){
        let passengers = this.initPassengers();
        passengers.piaotype = 2;
        passengers.passengersename = passengersename;
        passengers.passporttypeseid = manTypeseId;
        passengers.passportseno = manSeno;
        passengers.isAccompanyingChildren = true;
        this.form.passengers.splice(idx+1,0,passengers);
      }else{
        this.$message({
          type:'error',
          message:'需先完整填写成人信息！'
        });
      }
    },
    // 添加乘客
    addAdultChild(){
      let passengers = this.initPassengers();
      this.form.passengers.push(passengers);
    },
    // 删除乘客
    deleteAdultChild(idx){
      this.$confirm('删除操作将会清空指定选中座位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.passengers.splice(idx,1);
        this.form.seats = [];
      }).catch(() => {});
    },
    handleChangeTrain(){
      let { params } = this.$route.query;
      this.$router.replace({ 
        path:'/distribution/train-list',
        query: {
          filter: params
        }
      });
    },
    // 在线支付
    handleOnlinePay(){
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
              let path = '/distribution/train-order/detail';
              
              done();
              this.$router.push({path, query: {orderNo: this.order_id}});
            }
          }
        }).catch((e)=>{
           console.log('cancel: ', e);
        })
      })
    }
  },
  mounted(){
    let { params } = this.$route.query;

    if(!params){
      this.$router.replace({ path:'/distribution/train-list' });
      return;
    }

    this.checkParams = JSON.parse(window.decodeURIComponent(window.atob(params)));

    this.form.zwcode = this.checkParams.zwcode;
    
    if(this.checkParams.order_no && this.checkParams.tourist_ids){
      this.isChange = true;
      this.getChangeTrainTicketInfo(this.checkParams);
      return;
    }
    
    this.$set(this.form, 'passengers', new Array(this.initPassengers()));
    this.getTrainTicketInfo(this.checkParams);
    
  }
}
</script>

<style lang="less" scoped>
.hold-message-cont{
  padding: 20px 0 40px;
  text-align: center;
  font-size: 20px;
}
.checkout-content{
  margin-right: 290px;
}
.checkout-side{
  width: 280px;
  margin-right: -290px;
  float: right;
}
.train-checkout-info{
  background: #fff;
  padding: 15px;
  table{
    width: 100%;
    td{
      text-align: center;
    }
  }
  .seat{
    font-size: 14px;
    color: #999;
  }
  .price{
    margin-top: 5px;
    color: #f60;
    font-size: 18px;
    font-weight: 700;
    em{
      font-size: 14px;
    }
  }
  .modify-runs{
    vertical-align: top;
    text-align: right;
  }
}
.runs{
  width: 165px;
  margin: 0 auto;
  .name{
    text-align: left;
    font-size:18px;
    color: #333;
    margin-bottom: 10px;
  }
  .date-time{
    width: 165px;
    padding: 10px 0;
    background: #f4f4f4;
    color: #333;
    border-radius: 5px;
    .date{
      display: inline-block;
      width: 55px;
      font-size: 12px;
    }
    .time{
      display: inline-block;
      font-size: 30px;
      font-weight: 700;
    }
  }
}
.run-long{
  margin-top: 30px;
  font-size:14px;
  .classify{
    color: #333;
  }
  .arrows{
    margin: 0 auto;
    width: 80px;
    height: 8px;
    background: url(../../../assets/icons/arr-nostop.png) no-repeat center center;
  }
  .long{
    color: #999;
  }
}
.checkout-model{
  margin-top: 10px;
  background: #fff;
  padding: 0 15px;
  .checkout-hd{
    padding-top: 10px;
    color: #333;
    font-size: 18px;
    font-weight: 700;
  }
  .checkout-bd{
    padding: 10px 0;
  }
}
.select-runs-seat{
  .runs-seat{
    float: left;
    width: 148px;
    padding: 15px;
    margin: 15px 15px 0 0;
    border:1px solid #ccc;
    color: #333;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    .name{
      color: #444;
      font-size: 14px;
      margin-bottom: 10px;
      em{
        margin-left: 10px;
        color: #f60;
        font-style: normal;}
    }
    &.cur{
      position: relative;
      border-color: #b10c79;
      &:before{
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 24px;
        height: 24px;
        background: url(../../../assets/icons/checked.png) no-repeat center center;
        background-size: 24px 24px;
      }
    }
    &.none-num{
      color: #999;
      border-color: #ccc;
      .name{
        color: #999;
        em{color: #999;}
      }
    }
  }
}
.accept-line{
  padding: 15px 0;
  .el-checkbox__label{
    color: 999;
  }
}
.passenger{
  width: 420px;
  padding: 30px 100px 20px 90px;
  margin-bottom: 10px;
  position: relative;
  .del{
    position: absolute;
    right: 20px;
    top: 40px;
    color: #f00;
    cursor: pointer;
  }
  &+.btn-tool{
    padding-bottom: 30px;
  }
  .passenger-type{
    position: absolute;
    left: 10px;
    line-height: 25px;
    width: 80px;
    text-align: center;
    .rang{
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      font-size: 24px;
      color: #fff;
      background: #ccc;
      border-radius: 50%;
    }
    .rang-text{
      margin-top: 6px;
      font-size: 14px;
      color: #333;
    }
    .legend{
      font-size: 14px;
      color: #999;
      span{
        width: 15px;
        height: 15px;
        line-height: 18px;
        display: inline-block;
        font-size: 10px;
        color: #999;
        background: #f4f4f4;
        border-radius: 50%;
      }
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
  .el-select,.el-date-editor{
    width: 100%;
  }
  .space-line{
    text-align: center;
    color: #999;
  }
  .seat-choose{
    height: 50px;
    .choose{
      width: 38px;
      height: 50px;
      line-height: 35px;
      margin:0 auto;
      text-align: center;
      background: url(../../../assets/icons/none-seat.png) no-repeat center center;
      background-size: 38px 50px;
      font-size: 14px;
      color: #999;
      &.cur{
        color: #fff;
        background: url(../../../assets/icons/had-seat.png) no-repeat center center;
        background-size: 38px 50px;
      }
    }
    .text{
      text-align: center;
      padding-top: 8px;
    }
  }
}
.footer-submit-tool{
  padding-bottom: 30px;
  margin-top: 10px;
  font-size: 14px;
  color: #999;
  background: #fff;
  text-align: center;
  .total{
    height: 45px;
    padding-top: 30px;
    background: #fbf3f8;
    strong{
      color: #f60;
      font-size: 24px;
      em{font-size: 14px;}
    }
  }
}
.order-summary {
  margin-bottom: 10px;
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
      padding: 15px;
      .total {
          float: right;
      }
  }

}
.tips {
  padding: 10px;
  text-align: left;
  background: #fff;
  color: #999;
  font-size: 14px;
  .tips-hd {
      color: #f60;
      padding-bottom: 10px;
  }
}
</style>
<style lang="less">
.select-runs-seat{
  .el-radio{
    .el-radio__input{
      display: none;
    }
    &+.el-radio{
      margin-left:0;
    }
  }
}
.seat-choose{
  .el-checkbox__input{
    display: none;
  }
  .el-checkbox__label{
    padding-left:0;
  }
}
</style>
