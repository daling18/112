<template>
  <div class="wrapper">
    <div class="hotel-checkout">
      <div v-if="hotelInfo" class="hotel-checkout-head">
        酒店：<span class="hotel-name">{{ hotelInfo.hotel_name }}</span> / 地址：<span class="hotel-address">{{ hotelInfo.hotel_address }}</span>
      </div>
      <el-form ref="orderForm" label-width="100px" :model="orderForm" :rules="rules">
        <div class="hotel-checkout-panel">
          <div class="hotel-checkout-panel-hd">
            预订信息
          </div>
          <div class="hotel-checkout-panel-bd">
            <!-- <el-form-item label="订单类型">
              <el-radio v-model="orderForm.order_type" :label="2">同行订单</el-radio>
              <el-radio v-if="ORG_TYPE == 3" v-model="orderForm.order_type" :label="1">直客订单</el-radio>
            </el-form-item> -->
            <el-form-item label="套餐名称">
              {{ hotelInfo && hotelInfo.rate_name }}
            </el-form-item>
            <el-form-item label="入离时间">
              <el-date-picker
                :class="'hotel-checkout-form-input date-input'"
                v-model="orderForm.time"
                type="daterange"
                placeholder="选择日期范围"
                :clearable="false"
                :editable="false"
                :picker-options="pickerOptions"
                @change="changeIntoTheFromTime">
              </el-date-picker>
              <div class="rooms-date-price">
                <div v-for="(room, key) in priceList" :key="key" class="rooms-date-price-item">
                  <div class="day">
                    <p>{{ room.date }}</p>
                    <span>{{ room.date | formatDateDay }}</span>
                  </div>
                  <div class="pri">
                    <p>￥{{ orderForm.order_type == 1 ? room.price : room.sale_price }}</p>
                    <span>{{ room.breakfast_name }}</span>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="房间数">
              <el-input-number :class="'hotel-checkout-form-input'" v-model="orderForm.room_num" @change="changeRoomsNum" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="取消政策">
              <template v-if="priceList && priceList.length">
                <template v-if="priceList[0].cancel_type">
                  <el-popover
                    placement="bottom"
                    trigger="hover">
                    <div v-html="priceList[0].cancel_type_name"></div>
                    <span slot="reference"><a href="javascript:;">限时取消</a></span>
                  </el-popover>
                </template>
                <template v-else>
                  <p>不可取消</p>
                </template>
              </template>
            </el-form-item>
            <el-form-item v-if="roomInfo" label="房型信息">
              <table class="rooms-set-table">
                <tbody>
                  <tr>
                    <th>房间类型：</th>
                    <td>{{ roomInfo[0].room_name || '暂无该数据' }}</td>
                    <th>床型：</th>
                    <td>{{ roomInfo[0].bed_type || '暂无该数据' }}</td>
                  </tr>
                  <tr>
                    <th>楼层：</th>
                    <td>{{ roomInfo[0].floor || '暂无该数据' }}</td>
                    <th>面积：</th>
                    <td>{{ roomInfo[0].room_area || '暂无该数据' }}</td>
                  </tr>
                  <tr>
                    <th>wifi：</th>
                    <td>{{ roomInfo[0].wifi || '暂无该数据' }}</td>
                    <th>窗户：</th>
                    <td>{{ roomInfo[0].window || '暂无该数据'  }}</td>
                  </tr>
                  <tr>
                    <th>宽带：</th>
                    <td>{{ roomInfo[0].broadnet || '暂无该数据' }}</td>
                    <th>卫浴：</th>
                    <td>{{ roomInfo[0].bath || '暂无该数据' }}</td>
                  </tr>
                  <tr>
                    <th>最大入住人数：</th>
                    <td>{{ roomInfo[0].maxCustomers || '暂无该数据' }}</td>
                    <th>&nbsp;</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </div>
        </div>
        <!-- <div v-if="orderForm.order_type == 2" class="hotel-checkout-panel">
          <div class="hotel-checkout-panel-hd">
            结算方
          </div>
          <div class="hotel-checkout-panel-bd">
            <el-row>
              <el-col :span="8">
                <el-form-item label="代理商" prop="distributor_id">
                  <select-org v-model="orderForm.distributor_id" partOrg></select-org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人" prop="distributor_contacts">
                  <el-input v-model="orderForm.distributor_contacts" :class="'hotel-checkout-form-input'" placeholder="请输入代理商联系人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人电话" prop="distributor_mobile">
                  <el-input v-model="orderForm.distributor_mobile" :class="'hotel-checkout-form-input'" placeholder="请输入代理商联系人电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div> -->
        <div class="hotel-checkout-panel">
          <div class="hotel-checkout-panel-hd">
            联系人
          </div>
          <div class="hotel-checkout-panel-bd">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" prop="contact.name">
                  <el-input v-model="orderForm.contact.name" :class="'hotel-checkout-form-input'" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机" prop="contact.phone">
                  <el-input v-model="orderForm.contact.phone" :class="'hotel-checkout-form-input'" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱">
                  <el-input v-model="orderForm.contact.email" :class="'hotel-checkout-form-input'" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="hotel-checkout-panel">
          <div class="hotel-checkout-panel-hd">
            入住人
          </div>
          <div class="hotel-checkout-panel-bd">
            <el-form-item v-for="(tourist, key) in orderForm.tourist_list" 
                          :key="key" 
                          :label="'房间' + (key + 1)"
                          :prop="'tourist_list.' + key + '.name'"
                          :rules="[
                            { required: true, message: '请输入主要入住人姓名', trigger: 'blur' }
                          ]">
               <el-input v-model="tourist.name" :class="'hotel-checkout-form-input'" placeholder="主要入住人姓名"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="hotel-checkout-pay">
      <div class="hotel-checkout-panel">
        <div class="hotel-checkout-panel-hd">
          支付方式
        </div>
        <div class="hotel-checkout-panel-bd">
          <!-- <p class="hotel-pay-type"><el-radio v-model="orderForm.pay_type" :label="1">可下单金额</el-radio></p> -->
          <p class="hotel-pay-type"><el-radio v-model="orderForm.pay_type" :label="2">在线支付</el-radio></p>
          <div class="hotel-price-amount">
            <p>订单金额：￥<strong>{{ totalPrice }}</strong></p>
          </div>
          <div class="hotel-order-btn">
            <el-button type="primary" size="large" @click="createHotelRoomsOrderHandler">提交</el-button>
            <el-button size="large" @click="handleToBack">返回</el-button>
          </div>
        </div>
      </div>
    </div>
    <online-pay ref="onlinePay" :order-id="orderId" order-resource="3" />
  </div>
</template>

<script>
import * as format from "src/utils/format";
import SelectOrg from "src/plugins/SelectOrg.vue";
import OnlinePay from "./components/OnlinePay.vue";
import { getDistributionHolelRoomsPriceAsyncRequest, createDistributionHotelOrderAsyncRequest } from 'src/api/hotel';
const ORG_TYPE = +localStorage.getItem('orgtype');
export default {
  data() {
    return {
      ORG_TYPE,
      orderId: '',
      orderForm:{
        time:[
          new Date(Number(this.$route.query.time.split('|')[0])),
          new Date(Number(this.$route.query.time.split('|')[1]))
        ],
        price_id: null,
        room_num: 1,
        pay_type: 2,
        order_source: 1,
        customer_id: 0,
        contact: {
          name: '',
          phone: '',
          email: '',
        },
        tourist_list: [
          { name: ''}
        ]
      },
      rules:{
        distributor_id: [
          { required: true, type: 'object', message: '请选择代理商', trigger: 'change' }
        ],
        distributor_contacts: [
          { required: true, message: '请输入代理商联系人姓名', trigger: 'blur' }
        ],
        distributor_mobile: [
          { required: true, message: '请输入代理商联系人电话号码', trigger: 'blur' }
        ],
        'contact.name': [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        'contact.phone': [
          { required: true, message: '请输入联系人电话号码', trigger: 'blur' }
        ],
        'contact.email': [
          { required: true, message: '请输入联系人邮箱地址', trigger: 'blur' }
        ]
      },
      hotelId: null,
      rateCode: null,
      source: null,
      hotelInfo: null,
      roomInfo: null,
      priceList: null,
      breakfastList: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    }
  },
  filters: {
    formatDateDay: (date) => {
      let day = new Date(date).getDay(),
          formattxt = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
      return formattxt[day];
    }
  },
  computed:{
    totalPrice(){
      let amount = 0;
      if(this.orderForm.order_type == 1){
        this.priceList && this.priceList.forEach(element => {
          amount += element.price
        });
      }else{
        this.priceList && this.priceList.forEach(element => {
          amount += element.sale_price;
        });
      }

      return amount * this.orderForm.room_num;
    }
  },
  components:{
    SelectOrg,
    OnlinePay
  },
  methods: {
    getHolelRoomsPriceHandler(){
      let params = {
        data: {
          hotel_code: this.hotelId,
          rate_code: this.rateCode,
          source: this.source,
          check_in_date: format.date(this.orderForm.time[0]),
          check_out_date: format.date(this.orderForm.time[1])
        }
      }
      getDistributionHolelRoomsPriceAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.orderForm.price_id = data.price_id;
            this.priceList = data.price_info;
            this.hotelInfo = data.hotel_info;
            this.roomInfo = data.room_info;
            this.breakfastList = data.breakfast_info;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    createHotelRoomsOrderHandler(){
      this.$refs['orderForm'].validate((valid) => {
        if(valid){
          let params = {
            data: JSON.parse(JSON.stringify(this.orderForm))
          }
          params['data'].tourist_list = params['data'].tourist_list.map(i=>{return i.name});
          createDistributionHotelOrderAsyncRequest({
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
                        this.$router.push({ name: 'DistributionHotelMyOrderDetail', query: { orderId: data.order_id }});
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
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      });
      
    },
    changeIntoTheFromTime(){
      this.getHolelRoomsPriceHandler();
    },
    changeRoomsNum(num){
      let i;
      num = this.orderForm.room_num - num;
      if(num > 0){
        this.orderForm.tourist_list.splice(-1, num)
      }else{
        for(i=0;i<Math.abs(num); i++){
          this.orderForm.tourist_list.push({
            name: ''
          })
        }
      }
    },
    hasBreakfast(breakfastId){
      let hasBreakfast = '无早',
          i,
          len = this.breakfastList.length;
      
      for(i=0;i<len;i++){
        if(this.breakfastList[i].breakfast_id == breakfastId && this.breakfastList[i].amount){
          hasBreakfast = '有早';
          break;
        }
      }
      return hasBreakfast;
    },
    handleToBack(){
      this.$router.back();
    }
  },
  mounted(){
    let { hotelId, source, rateCode } = this.$route.query;
    this.hotelId = hotelId;
    this.rateCode = rateCode;
    this.source = source;
    this.getHolelRoomsPriceHandler();
  } 
}
</script>

<style scoped lang="less">
.hotel-checkout{
  padding: 0 15px;
  background-color: #fff;

  .hotel-checkout-head{
    padding: 15px 0;
    color: #999;
    border-bottom: 1px solid #cccccc;

    .hotel-name{
      color: #b10c79;
    }
    .hotel-address{
      color: #444444;
    }
  }
}
.date-picker{
  width: 200px !important;
}
.rooms-set-table{
  thead{
    th{
      padding: 4px;
      background-color: #f4f4f4;
    }
  }
  tbody{
    th,td{
      padding: 4px;
    }
    td{
      padding-right: 15px;
    }
    th{
      text-align: right;
    }
  }
}
.rooms-date-price{
  margin-top: 15px;
  ::after{
    content: '';
    display: block;
    clear: both;
  }
  .rooms-date-price-item{
    float: left;
    width: 100px;
    border: 1px solid #dddddd;

    .day{
      line-height: 20px;
      background-color: #fafafa;
      padding: 5px 0;
      text-align: center;
      border-bottom: 2px solid #dddddd;
      p{
        color: #444444;
      }

      span{
        color: #999999
      }
    }
    .pri{
      line-height: 20px;
      padding: 5px 0;
      text-align: center;

      p{
        color: #ff6600;
        font-weight: 700;
      }
      
      span{
        color: #999999
      }
    }
  }
}
.hotel-checkout-pay{
  padding: 0 15px;
  background-color: #fff; 
  margin-top: 15px;
}


.hotel-checkout-panel{
  border-bottom: 1px solid #cccccc;
  padding-bottom: 25px;
  &:only-of-type,&:last-child{
    border: 0;
  }
  .hotel-checkout-form-input{
    width: 180px;

    &.date-input{
      width: 200px;
    }
  }
  .hotel-checkout-panel-hd{
    padding: 15px 0;
    font-weight: 700;
  }

  .hotel-pay-type{
    margin-bottom: 10px;
  }
  .hotel-price-amount{
    padding: 20px 15px;
    background-color: #fbf3f8;
    p{
      color:#999999;

      &:first-child{
        color:#444;
        margin-bottom:10px;
        strong{
          color: #ff6600;
        }
      }
    }
  }

  .hotel-order-btn{
    padding: 20px 0;
    text-align: center;
  }
}
</style>
