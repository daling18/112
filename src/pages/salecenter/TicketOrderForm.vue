<template>
  <div class="wrapper">
			<el-form :model="orderForm" :rules="rules" ref="orderForm" label-width="80px">
				<div class="checkout-pannel-module" v-if="ticketDetail">
				<div class="hotel-checkout-panel" style="padding:0;">
          <div class="hotel-checkout-panel-hd">
            {{ticketDetail.scenic_name +'/'+ ticketDetail.ticket_name}}
          </div>
				</div>
				<div class="hotel-checkout-panel" style="padding-top:20px;">
					<div class="hotel-checkout-panel-bd">
						<el-form-item label="游玩时间">
							<!-- <el-date-picker
								v-model="orderForm.play_time"
								type="date"
								placeholder="选择日期"
								:picker-options="pickerOptions">
							</el-date-picker> -->
							<calendar :has-input="true" :value="orderForm.play_time" 
								:width="450" 
								:on-day-click="changePlayTime"
								:valid-dates="Object.keys(ticketDetail.price_list)">
								<div v-for="(item,key) in ticketDetail.price_list" :slot="key" :key="key">
									<p class="calendar-price">结：&yen;{{ item.settlement_price }}</p>
									<p class="calendar-price">销：&yen;{{ item.sale_price }}</p>
								</div>
							</calendar>
							<!-- <span> （{{canUsetTypeText}}）</span> -->
						</el-form-item>
						<el-table
              :data="priceDataList"
              border
              style="width: 100%">
              <el-table-column
                prop=""
                label="票类名称"
                align="center">
								<template slot-scope="scope">
									{{ ticketDetail.quote_name }}
								</template>
              </el-table-column>
							<el-table-column
                prop="storage"
                label="产品库存"
                align="center">
              </el-table-column>
							<el-table-column
                prop="settlement_price"
                label="结算价"
                align="center">
              </el-table-column>
							<el-table-column
                prop="sale_price"
                label="销售价"
                align="center">
              </el-table-column>
							<el-table-column
                prop=""
                label="退票规则"
                align="center">
								<template slot-scope="scope">
									<!-- <div v-if="ticketDetail.refund_rule == 0">
										<span v-if="ticketDetail.refund_type == 0">游玩日期内可退，退票扣门票价格的{{ticketDetail.refund_fee}}%</span>
										<span v-if="ticketDetail.refund_type == 1">游玩日期内可退，退票扣{{ticketDetail.refund_fee}}元</span>
									</div>
									<div v-if="ticketDetail.refund_rule == 1">
										<span v-if="ticketDetail.refund_type == 0">游玩日期前可退，退票扣门票价格的{{ticketDetail.refund_fee}}%</span>
										<span v-if="ticketDetail.refund_type == 1">游玩日期前可退，退票扣{{ticketDetail.refund_fee}}元</span>
									</div>
									<div v-if="ticketDetail.refund_rule == 2">不可退</div> -->
									<el-popover
										placement="bottom"
										width="300"
										trigger="hover">
										<div class="popover-table">
											<table>
												<tr>
													<th>退票规则</th>
													<td>{{ ticketDetail.refund_rule.refund_rule }}</td>
												</tr>
												<tr>
													<th>是否需要审核</th>
													<td>{{ ticketDetail.refund_rule.refund_audit }}</td>
												</tr>
												<tr>
													<th>退票手续费</th>
													<td>
														{{ ticketDetail.refund_rule.refund_rule == '不可退' ? 0 : ticketDetail.refund_rule.refund_fee }}
													</td>
												</tr>
												<tr v-if="ticketDetail.refund_rule.refund_rule != '不可退'">
													<th>阶梯退票</th>
													<td>
														<p v-for="(item,idx) in ticketDetail.refund_rule.refund_cost" :key="idx">
															{{item}}
														</p>
													</td>
												</tr>
											</table>
										</div>
										<span class="popover-text" slot="reference">详情</span>
									</el-popover>
								</template>
              </el-table-column>
							<el-table-column
                prop=""
                label="预定数量"
                align="center">
								<template slot-scope="scope">
									<el-input-number v-model="orderForm.ticket_num" 
										@change="touristNumChange" :min="1"></el-input-number>
								</template>
              </el-table-column>
							<el-table-column
                prop="id"
                label="小计"
                align="center">
								<template slot-scope="scope">
									{{ saleTotalPrice }}
								</template>
              </el-table-column>
						</el-table>
          </div>
				</div>

				<!-- <div class="hotel-checkout-panel">
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
                <el-form-item label="联系电话" prop="distributor_mobile">
                  <el-input v-model="orderForm.distributor_mobile" :class="'hotel-checkout-form-input'" placeholder="请输入代理商联系人电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
					</div>
				</div> -->

				<div class="hotel-checkout-panel">
          <div class="hotel-checkout-panel-hd">
            取票人
          </div>
          <div class="hotel-checkout-panel-bd concat">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" prop="contact.name">
                  <el-input v-model.trim="orderForm.contact.name" :class="'hotel-checkout-form-input'" placeholder="请输入取票人姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机" prop="contact.mobile">
                  <el-input v-model="orderForm.contact.mobile" :class="'hotel-checkout-form-input'" placeholder="请输入取票人电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
						<el-row>
							<el-col :span="8">
							<el-form-item label="证件类型" prop="contact.identity_type">
									<el-select v-model="orderForm.contact.identity_type" 
									 :class="'hotel-checkout-form-input'"
										placeholder="请选择">
										<el-option label="二代身份证" value="1"></el-option>
										<el-option label="护照" value="2"></el-option>
										<el-option label="港澳通行证" value="4"></el-option>
										<el-option label="台胞证" value="7"></el-option>
										<el-option label="其他" value="99"></el-option>
									</el-select>
									</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item  label="证件号码" prop="contact.identity_no">
									<el-input v-model.trim="orderForm.contact.identity_no" :class="'hotel-checkout-form-input'" placeholder="请输入取票人证件号码"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="订单备注">
								<el-input v-model="orderForm.contact.market" placeholder="请输入订单备注"></el-input>
							</el-form-item>
						</el-row>
          </div>
        </div>

				<div class="hotel-checkout-panel" v-if="ticketDetail.need_idcard">
          <div class="hotel-checkout-panel-hd">
            游客信息
          </div>
          <div class="hotel-checkout-panel-bd">
						<!-- tourist-list -->
						<div class="tourist-list">
							<el-row v-for="(tourist,key) in orderForm.tourist_list" :key="key" class="tourist-item">
								
									<el-col :span="8">
									<el-form-item label="姓名"
																:prop="'tourist_list.' + key + '.name'"
																>
										<el-input v-model="tourist.name" :class="'hotel-checkout-form-input'"></el-input>
									</el-form-item>
									</el-col>
									<el-col :span="8">
									<el-form-item label="身份证" 
																:prop="'tourist_list.' + key + '.id_card'"
																:rules="[
																	{
																		required: true, message: '请输入游客身份证号码', trigger: 'blur'
																	},
																	{ pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|x|X)$/, message: '身份证格式错误', trigger: 'blur' }
																]">
										<el-input v-model="tourist.id_card" :class="'hotel-checkout-form-input'"></el-input>
									</el-form-item>
									</el-col>
									<el-col :span="8">
										<div class="del">
										<span v-if="orderForm.tourist_list.length > 1" @click="delTourist(key)">删除</span>
										</div>
									</el-col>
							</el-row>
						</div>
						<!-- /tourist-list -->
          </div>
        </div>
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
								<p>
									<span>订单金额：￥<strong>{{saleTotalPrice}}</strong></span>&nbsp;&nbsp;&nbsp;&nbsp;
									<span>建议销售：￥<strong>{{saleTotalPrice}}</strong></span>
								</p>
							</div>
							<div class="legend">
								温馨提示: 提交订单后，请在15分钟内完成支付，未在规定时间内完成，系统将会自动取消您的订单
							</div>
							<div class="hotel-order-btn">
								<el-button type="primary" size="large" @click="setTicketDetailsHandler">提交</el-button>
								<el-button size="large" @click="$router.go(-1)">返回</el-button>
							</div>
						</div>
					</div>
				</div>
			</el-form>

<online-pay
	ref="onlinePay"
	:order-id="order_id"
	order-resource="6"
/>
  </div>
</template>
<script>
	import { getTicketQuoteDetails, setTicketDetails } from 'src/api/ticket';
	import { dateTimeFormatter } from 'src/assets/js/common';
	import SelectOrg from "src/plugins/SelectOrg.vue";
	import OnlinePay from './components/OnlinePay';
	import Calendar from 'src/plugins/Calendar.vue';

	const ORG_TYPE = localStorage.getItem('orgtype');
	export default {
		data() {
			return {
				order_id:'',
				ORG_TYPE,
				ticketDetail: null,
				priceDataList:null,
				orderForm:{
					order_type:2,
					ticket_num: 1,
					play_time: "",
					pay_type:2,
					distributor_id:null,
					distributor_contacts:"",
					distributor_mobile:"",
					contact:{
						name: "",
						mobile: "",
						identity_type:"",
						identity_no:"",
            remark: ""
					},
					tourist_list: [
							{
									name: "",
									id_card: ""
							}
					],
				},
				minDate: null,
				maxDate: null,
				rules:{
					distributor_id: [
						{ required: true, type: 'object', message: '请选择代理商', trigger: 'change' }
					],
					distributor_contacts: [
						{ required: true, message: '请输入代理商联系人姓名', trigger: 'blur' }
					],
					distributor_mobile: [
						{ required: true, message: '请输入代理商联系人电话号码', trigger: 'blur' },
						{ pattern: /^((1[34578][0-9]{1})+\d{8})$/, message: '手机号码格式错误', trigger: 'blur' },
					],
					'contact.name':[
						{ required: true, message: '请输入取票人姓名', trigger: 'blur' }
					],
					'contact.mobile':[
						{ required: true, message: '请输入取票人手机号码', trigger: 'blur' },
						{ pattern: /^((1[34578][0-9]{1})+\d{8})$/, message: '手机号码格式错误', trigger: 'blur' },
					],
					// 'contact.identity_type':[
					// 	{ required: true, message: '请选择取票人证件类型', trigger: 'blur' }
					// ],
					// 'contact.identity_no':[
					// 	{ required: true, message: '请输入取票人证件号码', trigger: 'blur' }
					// ]
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				}
			}
		},
		watch:{
			'orderForm.play_time':function(val){
				console.log(val)
				let price_list = [];
				let date = val;
				let row = this.ticketDetail.price_list[date];

				if(row){
					price_list.push(this.ticketDetail.price_list[date]);
				}
				this.$set(this,'priceDataList', price_list);
			},
			'orderForm.contact.name':function(val){
				if(this.ticketDetail.need_idcard == 1){
					this.orderForm.tourist_list[0].name = val; 
				}
			},
			'orderForm.tourist_list.0.name':function(val){
				if(this.ticketDetail.need_idcard == 1){
					this.orderForm.contact.name = val; 
				}
			}
		},
		computed:{
			totalPrice(){
				let	amount = 0;
				if(this.priceDataList && this.priceDataList.length){
					amount = (parseFloat(this.priceDataList[0].settlement_price)*this.orderForm.ticket_num).toFixed(2)
				}
				return amount;
			},
			saleTotalPrice(){
				let	amount = 0;
				if(this.priceDataList && this.priceDataList.length){
					amount = (parseFloat(this.priceDataList[0].sale_price)*this.orderForm.ticket_num).toFixed(2)
				}
				return amount;
			},
			canUsetTypeText(){
				let text = '',
						use_type = this.ticketDetail.use_type,
						delay_days = this.ticketDetail.delay_days;
				switch(use_type){
					case 0:
						if(delay_days){
							text = '游玩日期（含）'+ delay_days +'天内有效';
						}else{
							text = '游玩日期起有效';
						}
						break;
					case 1:
						if(delay_days){
							text = '下单日期（含）'+ delay_days +'天内有效';
						}else{
							text = '下单日期起有效';
						}
						break;
					case 2:
						text = this.ticketDetail.start_date + '-' + this.ticketDetail.end_date + '有效';
						break;
				}
				return text;
			}
		},
		components:{
			SelectOrg,
			OnlinePay,
			Calendar
		},
		methods: {
			getTicketDetailsHandler(){
				let params = {
					data: {
						quote_type_id: this.$route.query.quote_type_id
					}
				}
				getTicketQuoteDetails({
					params: params,
					success: (params) => {
						let { code, msg, data } = params['data'];
						if(!code){
							this.ticketDetail = data;
							this.orderForm.ticket_id = data.ticket_id;
							this.orderForm.play_time = data.start_date;
							this.orderForm.contact.name = data.name;
							this.orderForm.contact.mobile = data.mobile;
							this.minDate = new Date(data.start_date.split('-')[0],data.start_date.split('-')[1]-1,data.start_date.split('-')[2]);
							this.maxDate = new Date(data.end_date.split('-')[0],data.end_date.split('-')[1]-1,data.end_date.split('-')[2]);
						}else{
							this.$message.error(msg);
						}
					},
					showLoading: true
				});
			},
			setTicketDetailsHandler(){
				this.$refs['orderForm'].validate((valid) => {
          if (valid) {
						let params = {
							data: JSON.parse(JSON.stringify(this.orderForm))
						}
						params.data.play_time = dateTimeFormatter(this.orderForm.play_time,'yyyy-MM-dd');
						params.data.order_type = this.$route.query.order_type;
						params.data.quote_type_id = this.$route.query.quote_type_id;

						setTicketDetails({
							params: params,
							success: (params) => {
								let { code, msg, data } = params['data'];
								
								this.$message({
									type: !code?'success':'error',
									message:msg
								})
								if(!code){
									this.$set(this,'order_id',data.order_id)
									this.handleOnlinePay();
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
			delTourist(key){
				let tourists = this.orderForm.tourist_list;
				tourists.splice(key, 1);
				this.orderForm.ticket_num = tourists.length;
			},
			touristNumChange(value){
				let tourists = this.orderForm.tourist_list,
						len = tourists.length;
				if(this.ticketDetail.need_idcard == 2){
					if(value < len){
						tourists.splice(tourists.length - 1,1);
					}else if(value > len){
						tourists.push(
							{
								"name": "",
								"id_card": ""
							}
						);
					}else{
						return false;
					}
				}
			},
			// 绑定palytime值
			changePlayTime(date,formatDay){
				this.$set(this.orderForm,'play_time',formatDay);
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
								let path = '/saleorder/ticket-order/detail';
								
								done();
								this.$router.push({path, query: {order_id: this.order_id, pay_type: this.orderForm.pay_type}});
							}
						}
					}).catch((e)=>{
						console.log('cancel: ', e);
					})
				})
				
			}
		},
		mounted() {
			this.getTicketDetailsHandler();
		}
	};
</script>

<style scoped lang="less">
.checkout-pannel-module{
	background: #fff;
	padding:0 15px;
	.concat{
		.el-form-item:last-child{
			margin-bottom: 22px;
		}
	}
}
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
	.legend{
		color: #999;
		padding-top: 10px;
	}
  .hotel-order-btn{
    padding: 20px 0;
    text-align: center;
  }
}
.tourist-list{
	.tourist-item{
		padding: 10px 0;
		background: #fafafa;
		.del{
			line-height:35px;
			margin-right: 20px; 
			text-align: right;
			color: #f00;
			cursor: pointer;
		}
	}
}
.el-input-number{
	width: auto;
}
.datepicker{
	width: 180px;	
}
.datepicker-body span{
	height: 80px;
	line-height: normal;
}
.calendar-price{
	font-size: 12px;
	color:#b10c79;
	margin: 0;
	line-height: normal;
}
.datepicker-dateRange-item-active{
	.calendar-price{
		color:#fff;
	}
}
.popover-text{
  color: #0066FF;
  cursor: pointer;
}
.popover-table{
  table{
    width: 100%;
  }
  th,td{
    border:1px solid #ddd;
    padding: 10px 8px;
    text-align: left;
  }
  th{
    width: 100px;
    background-color: #f4f4f4;
  }
}
</style>