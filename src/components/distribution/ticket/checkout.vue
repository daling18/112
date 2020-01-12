<template>
  <div class="ticket-checkout">
		<template v-if="ticketDetail">
			<el-form :model="ticketOrderForm" :rules="rules" ref="ticketOrderForm" label-width="80px">
				<div class="ticket-header">
					<table border="0" cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th>{{ticketDetail.scenic_title}}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="ticket-calendar">
										<el-form-item label="游玩时间">
											<calendar v-model="ticketOrderForm.play_time" :hasInput="true" :pane="1">
												<div class="price" v-for="(price, key) in ticketDetail.price_list" :key="key" :slot="key" v-if="ticketDetail.price_list">
														￥{{price.buy_price}}
												</div>
											</calendar>
										</el-form-item>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="ticket-info">
					<table border="0" cellspacing="0" cellpadding="0" v-if="ticketDetail.price_list">
						<thead>
							<tr>
								<th>票类名称</th>
								<th>产品库存</th>
								<th>结算价</th>
								<th>销售价</th>
								<th>退票手续费</th>
								<th>预定数量</th>
								<th>小计</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="ticketOrderForm.play_time && ticketDetail.price_list">
								<td>
									{{ticketDetail.ticket_title}}
								</td>
								<td>
									<span v-if="ticketOrderForm.play_time">
										{{ticketDetail.price_list[ticketOrderForm.play_time].remain != 9999999 ? ticketDetail.price_list[ticketOrderForm.play_time].remain : '不限'}}
									</span>
								</td>
								<td>
									<span v-if="ticketOrderForm.play_time">
									{{ticketDetail.price_list[ticketOrderForm.play_time].buy_price}}
									</span>
								</td>
								<td>
									<span v-if="ticketOrderForm.play_time">
									{{ticketDetail.price_list[ticketOrderForm.play_time].retail_price}}
									</span>
								</td>
								<td>
									{{ticketDetail.refund_fee}}
								</td>
								<td>
									<el-input-number v-model="ticketOrderForm.ticket_num" @change="statisticsChange" :min="1"></el-input-number>
								</td>
								<td>
									{{ ticketOrderForm.price * ticketOrderForm.ticket_num }}
								</td>
							</tr>
							<tr v-else>
								<td colspan="7">暂无报价，请选择其他日期</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="ticket-form">
					<div class="contacts">
						<div class="hd">
							结算方
						</div>
						<div class="bd">
							<div class="contacts-form">
								<el-form-item label="代理商" prop="distributor_id">
									<el-input v-model="ticketOrderForm.distributor_id"></el-input>
								</el-form-item>
								<el-form-item label="联系人" prop="distributor_contacts">
									<el-input v-model="ticketOrderForm.distributor_contacts"></el-input>
								</el-form-item>
								<el-form-item label="联系电话" prop="distributor_mobile">
									<el-input v-model="ticketOrderForm.distributor_mobile"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
					
					<div class="contacts">
						<div class="hd">
							取票人信息
						</div>
						<div class="bd">
							<div class="contacts-form">
								<el-form-item label="取票人" prop="contact.name">
									<el-input v-model="ticketOrderForm.contact.name"></el-input>
								</el-form-item>
								<el-form-item label="手机号码" prop="contact.mobile">
									<el-input v-model="ticketOrderForm.contact.mobile"></el-input>
								</el-form-item>
								<el-form-item label="证件" required style="margin-bottom:0;">
									<el-form-item prop="contact.identity_type">
										<el-select v-model="ticketOrderForm.contact.identity_type" 
											style="width:220px;margin-bottom:5px;"
											placeholder="请选择">
											<el-option label="二代身份证" value="1"></el-option>
											<el-option label="护照" value="2"></el-option>
											<el-option label="港澳通行证" value="4"></el-option>
											<el-option label="台胞证" value="7"></el-option>
											<el-option label="其他" value="99"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item prop="contact.identity_no">
										<el-input v-model="ticketOrderForm.contact.identity_no"></el-input>
									</el-form-item>
								</el-form-item>
								<el-form-item label="订单备注">
									<el-input v-model="ticketOrderForm.contact.remark"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
					<div v-if="ticketDetail.need_idcard == 1 || ticketDetail.need_idcard == 2" class="tourist">
						<div class="hd">
							游客信息
						</div>
						<div class="bd">
							<div class="tourist-list">
								<div v-for="(tourist,key) in ticketOrderForm.tourist_list" :key="key" class="tourist-item">
									<div class="lt">
										<el-form-item label="姓名"
																	:prop="'tourist_list.' + key + '.name'"
																	:rules="{
																		required: true, message: '请输入游客姓名', trigger: 'blur'
																	}">
										<el-input v-model="tourist.name"></el-input>
										</el-form-item>
										<el-form-item label="身份证" 
																	:prop="'tourist_list.' + key + '.id_card'"
																	:rules="[
																		{
																			required: true, message: '请输入游客身份证号码', trigger: 'blur'
																		},
																		{ pattern: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/, message: '身份证格式错误', trigger: 'blur' }
																	]">
											<el-input v-model="tourist.id_card"></el-input>
										</el-form-item>
									</div>
									<div class="rt">
										<a v-if="ticketOrderForm.tourist_list.length != 1" href="javascript:;" @click="delTourist(key)">删除</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="count">
					<div class="form-border-box">
						<p><el-radio class="radio" v-model="ticketOrderForm.pay_type" label="1">可下单金额   （目前您在系统上可下单金额为9000.00（根据授信与账户余额统计）</el-radio></p>
						<p><el-radio class="radio" v-model="ticketOrderForm.pay_type" label="2">在线支付</el-radio></p>
					</div>
					<span>订单金额：<strong style="color:#f60;font-size:16px;">￥{{ticketOrderForm.price * ticketOrderForm.ticket_num}}</strong> （{{ ticketOrderForm.price }}元 × {{ ticketOrderForm.ticket_num }}张）</span>
					<el-button type="primary" @click="setTicketDetailsHandler">提交订单</el-button>
				</div>
			</el-form>
		</template>
  </div>
</template>
<script>
	import { getTicketDetails, setTicketDetails } from 'src/api/ticket';
	import Calendar from 'src/plugins/Calendar.vue';
	export default {
		data() {
			return {
				ticketDetail: null,
				ticketOrderForm:{
					order_type:"",
					ticket_id: "",
					ticket_num: 1,
					play_time: "",
					price: "",
					pay_type:"",
					distributor_id:"",
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
					'contact.name':[
						{ required: true, message: '请输入取票人姓名', trigger: 'blur' }
					],
					'contact.mobile':[
						{ required: true, message: '请输入取票人手机号码', trigger: 'blur' },
						{ pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/, message: '手机号码格式错误', trigger: 'blur' },
					],
					'contact.identity_type':[
						{ required: true, message: '请选择取票人证件类型', trigger: 'blur' }
					],
					'contact.identity_no':[
						{ required: true, message: '请输入取票人证件号码', trigger: 'blur' }
					]
				}
			}
		},
		watch:{
			'ticketOrderForm.contact.name':function(val){
				if(this.ticketDetail.need_idcard == 1){
					this.ticketOrderForm.tourist_list[0].name = val; 
				}
			},
			'ticketOrderForm.tourist_list.0.name':function(val){
				if(this.ticketDetail.need_idcard == 1){
					this.ticketOrderForm.contact.name = val; 
				}
			}
		},
		components:{
			Calendar
		},
		methods: {
			getTicketDetailsHandler(){
				let params = {
					data: {
						ticket_id: this.$route.query.ticket_id
					}
				}
				getTicketDetails({
					params: params,
					success: (params) => {
						let { code, msg, data } = params['data'];
						if(!code){
							this.ticketDetail = data;
							this.ticketOrderForm.ticket_id = data.ticket_id;
							this.ticketOrderForm.price = data.price_list[data.start_date].buy_price;
							this.ticketOrderForm.play_time = data.start_date;
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
				this.$refs['ticketOrderForm'].validate((valid) => {
          if (valid) {
						this.ticketOrderForm.order_type = this.$route.query.order_type;
            let params = {
							data: this.ticketOrderForm
						}
						setTicketDetails({
							params: params,
							success: (params) => {
								let { code, msg, data, need_redirect } = params['data'];
								if(!code){
									if(!need_redirect){
										this.$alert(msg, '提示', {
												confirmButtonText: '确定',
												type: 'error'
											})
									}else{
										this.$alert(msg, '提示', {
											confirmButtonText: '确定',
											type: 'error'
										}).then(() => {
											this.$router.push({
												path:'/product/ticket'
											});
										});
									}
								}else{
									this.$router.push({path:'/order/tickets/details/' + data.order_id});
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
				let tourists = this.ticketOrderForm.tourist_list;
				tourists.splice(key, 1);
				this.ticketOrderForm.ticket_num = tourists.length;
			},
			statisticsChange(value){
				let tourists = this.ticketOrderForm.tourist_list,
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
					this.ticketOrderForm.ticket_num = tourists.length;
				}
			},
			calendarDayClick(date, dataStringify){
				this.ticketOrderForm.price = this.ticketDetail.price_list[dataStringify].buy_price;
				this.ticketOrderForm.play_time = dataStringify;
			}
		},
		mounted() {
			this.getTicketDetailsHandler();
		}
	};
</script>

<style lang="less">
.ticket-checkout{
	table{
		width: 100%;
		th{
			border: 1px solid rgb(223, 230, 236);
			background-color: rgb(238, 241, 246);
			color: rgb(31, 45, 61);
			text-align: left;
			padding: 8px 12px;
		}
		td{
			padding: 8px;
			background-color: #fff;
			border: 1px solid rgb(223, 230, 236);
			.el-form-item{
				margin-bottom: 0;
				span{
					color: #999;
				}
			}
		}
	}
	.ticket-header{
		margin-bottom: 15px;
	}
	.ticket-info{
		margin-bottom: 15px;
		table{
			th{
				text-align: center;
			}
			td{
				text-align: center;
			}
		}
	}
	.ticket-form{
		margin-bottom: 15px;
		background-color: #fff;
		overflow: hidden;
		.hd{
			padding:15px 20px;
			font-weight: 700;
		}
		.bd{
			padding: 0 20px;
		}
		.contacts-form{
			max-width: 300px;
		}
		.contacts{
			.bd{
				padding:0 60px;
			}
		}
		.tourist{
			.bd{
				padding:0 60px;
			}
			.tourist-list{
				.tourist-item{
					display: box;
					/* OLD - Android 4.4- */
					display: -webkit-box;
					/* OLD - iOS 6-, Safari 3.1-6 */
					display: -moz-box;
					/* OLD - Firefox 19- (buggy but mostly works) */
					display: -ms-flexbox;
					/* TWEENER - IE 10 */
					display: -webkit-flex;
					/* NEW - Chrome */
					display: flex;
					margin-bottom: 15px;
					padding: 20px 20px 0;
					background-color: #f9f9f9;
					overflow: hidden;
					width: 400px;

					.lt{
						width: 300px;
					}
					.rt{
						width: 80px;
						text-align: center;
						line-height: 36px;
					}
				}
			}
		}
	}
	.count{
		padding: 20px;
		background-color: #fff;
	}
	.ticket-calendar{
		.datepicker{
			.datepicker-body{
				.datepicker-weekRange{
					span{
						width: 60px;
					}
				}
				.datepicker-monthRange{
					span{
						width: 60px;
						height: 60px;
						line-height: 60px;
					}
				}
				.datepicker-dateRange{
					span{
						width: 60px;
						height: 60px;
						line-height: 24px;
						vertical-align: middle;
						&.datepicker-dateRange-item-active{
							.price{
								color: #fff;
							}
						}
						.price{
							color: #b10c79;
						}
					}
				}
			}
			.datepicker-inner{
				width: 442px;
			}
		}
	}
}
.el-form-item:last-child{
	margin-bottom: 22px;
}
.form-border-box{
	p{
		margin-bottom: 15px;
	}
}
</style>
