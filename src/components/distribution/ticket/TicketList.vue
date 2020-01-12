<template>
<div class="wrapper">
	<div class="system-search">
		<div class="search-line-item">
			<div class="search-item">
				<div class="label">景区名称</div>
				<el-input v-model="filters.scenic_title" placeholder="景区名称"></el-input>
			</div>
			<div class="search-item">
				<div class="label">景区级别</div>
				<el-select v-model="filters.grade" placeholder="请选择">
					<el-option label="不限" value="-1"></el-option>
					<el-option  v-for="(item,index) in gradeOptions"
						:key="index"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="search-item">
				<div class="label">所在地区</div>
					<el-select v-model="filters.prov_id" placeholder="请选择" @change="getAreaList(filters.prov_id)"
						>
						<el-option label="不限" value=""></el-option>
						<el-option v-for="(obj,idx) in zone.prov" :key="idx"
							:label="obj.area_name"
							:value="obj.id"></el-option>
					</el-select>
					<el-select v-model="filters.city_id" placeholder="请选择"
							>
							<el-option label="不限" value=""></el-option>
							<el-option v-for="(obj,idx) in zone.city" :key="idx"
							:label="obj.area_name"
							:value="obj.id"></el-option>
					</el-select>
			</div>
			<div class="search-item">
				<el-button type="primary" @click="initPageFn">搜索</el-button>
			</div>
		</div>
  </div>

  <div class="">
  	<div class="ticket-list" v-for="(obj,idx) in ticketData" :key="idx" v-if="ticketData">
			<dl class="list_info">
				<dt><img :src="obj.img_path" alt=""></dt>
				<dd>
					<div class="title">【{{obj.city_name}}】<strong>{{obj.scenic_title}}</strong></div>
					<p class="addr">
						{{obj.address}}
						<span class="grade">{{gradeTotal(obj.grade)}}</span>
					</p>
				</dd>
			</dl>
  		<div class="mode-table">
				<table class="el-table table-custom" style="width: 100%">
					<tr>
						<th width="100">来源</th>
						<th>门票名称</th>
						<th width="80">门市价</th>
						<th width="100">建议零售价</th>
						<th width="80">结算价</th>
						<th width="150">操作</th>
					</tr>
					<template v-for="(td,tdx) in obj.ticket_list">
					<tr v-if="tdx<moreFlag[idx].flag" :key="tdx" >
						<td>
							{{td.source_name}}
						</td>
						<td class="color-blue" :title="td.ticket_title">
							<span @click="popoverRowInfo(idx,tdx)">{{td.ticket_title}} <i :class="'el-icon-caret '+ (!td.popover? 'el-icon-caret-bottom' : 'el-icon-caret-top')"></i></span>
						</td>
						<td>&yen;{{td.shop_price}}</td>
						<td>&yen;{{td.sale_price}}</td>
						<td><strong class="color-orange">&yen;{{td.settlement_price}}</strong></td>
						<td>
							<el-dropdown trigger="hover">
                <span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <router-link :to="{ path: '/distribution/ticket-checkout', query: { ticket_id: td.id, order_type:1}}">同行订单</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link :to="{ path: '/distribution/ticket-checkout', query: { ticket_id: td.id, order_type:2}}">直客订单</router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
						</td>
					</tr>
					<tr :key="tdx" v-if="td.popover && tdx<moreFlag[idx].flag" class="tr-bg">
						<td>&nbsp;</td>
						<td colspan="5">
							<div class="tip-content">
								<p class="color-pruple">订票须知</p>
								<div class="text">
									<p v-if="td.use_type == 0">有效期限：{{td.delay_days == 0 ?'游玩日期当天有效':'游玩日期(含)'+td.delay_days+'天内有效'}}</p>
									<p v-if="td.use_type == 1">有效期限：{{td.delay_days == 0 ?'订单当天有效':'下单日期(含)'+td.delay_days+'天内有效'}}</p>
									<p v-if="td.use_type == 2">有效期限：{{td.order_start}} 至 {{td.order_end}}</p>
									<p>取票信息：{{td.get_ticket}}</p>
									<p>温馨提示：{{td.description}}</p>
								</div>
							</div>
						</td>
					</tr>
					</template>
				</table>
				<p class="more-trigger" v-if="moreFlag[idx].len > 3" @click="showMoreRow(idx)">
					<span v-if="moreFlag[idx].flag==3">展开更多 <i class="el-icon-arrow-down"></i> </span>
					<span  v-if="moreFlag[idx].flag==100">收起 <i class="el-icon-arrow-up"></i></span>
				</p>

			</div>
  	</div>
		<div class="ticket-list" style="padding:30px 0; text-align:center;" v-if="!ticketData">暂无数据</div>
  </div>

	<!--工具条-->
	<div class="page" v-if="ticketData">
		<el-pagination  layout="prev, pager, next" @current-change="currentPageChange"
										:total="pagination.total_count"
										:page-size="pagination.page_size"
										>
		</el-pagination>
	</div>




</div>
</template>
<script>
	import {getTicketList,
					getCityInfo,
					scenicChangeStatus} from 'src/api/ticket';

	export default {
		data() {
			return {
				moreFlag:[],
				zone:{
					prov:null,
					city:null
				},
				filters: {
					scenic_title: '',
					grade: '-1',
					prov_id: '',
					city_id: ''
				},
				ticketData:[],
				pagination:{
					total_count:0,
					total_page: 0,
					page_size:10,
					page_index: 1,
				},
				cols: [
					{prop: 'ticket_title', label: '来源', width:'120'},
					{prop: 'ticket_title', label: '门票名称', minwidth:'200',template:true},
					{prop: 'supplier_name', label: '供应商', minwidth:'200'},
					{prop: 'shop_price', label: '门市价', width:'120',align:'center'},
					{prop: 'sale_price', label: '建议零售价', width:'120',align:'center'},
					{prop: 'settlement_price', label: '结算价', width:'120',align:'center'}
				],
				gradeOptions: [
					{label:'非A',value:0},
					{label:'1A',value:1},
					{label:'2A',value:2},
					{label:'3A',value:3},
					{label:'4A',value:4},
					{label:'5A',value:5}
				],
			}
		},
		components:{
		},
		methods: {
			initPageFn(){
				let para = {};
				para.data = this.filters;
				para.data.page_index = this.pagination.page_index;

				getTicketList({
          params: para,
          success: (res) => {
						let asyncObj = res.data.data;
						if(asyncObj){
							this.ticketData = asyncObj.list;
							// this.ticketData['135'].ticket_list = this.ticketData['135'].ticket_list.concat(this.ticketData['135'].ticket_list)
							this.pagination.total_count = parseInt(asyncObj.total_count,10);
							this.pagination.total_page = parseInt(asyncObj.total_page,10);
							this.pagination.page_size = parseInt(asyncObj.page_size,10);
							this.pagination.page_index = parseInt(asyncObj.page_index,10);
							let row = [];
							for(let i in asyncObj.list){
								let len = asyncObj.list[i].ticket_list?asyncObj.list[i].ticket_list.length:0;
								let flag = len<=3?3:100;
								row.push({
									len:len,
									flag:3
								});
							}
							this.moreFlag = row;
						}else{
							this.ticketData = null;
						}
          },
          showLoading: true
        });
			},
			currentPageChange(val) {
				this.pagination.page_index = val;
				this.initPageFn();
				window.scrollTo(0,0);
			},
			// 点击显示更多好
			showMoreRow(idx){
				if(this.moreFlag[idx].len > 3 && this.moreFlag[idx].flag == 3){
					this.$set(this.moreFlag[idx],'flag',100);
				}else{
					this.$set(this.moreFlag[idx],'flag',3);
				}
			},
			gradeTotal(num){
				let text = '';
				switch(num){
					case 0:
						text = '未评级';
						break;
					case 1:
						text = 'A级';
						break;
					case 2:
						text = 'AA级';
						break;
					case 3:
						text = 'AAA级';
						break;
					case 4:
						text = 'AAAA级';
						break;
					case 5:
						text = 'AAAAA级';
						break;
				}
				return text;
			},
			// 点击展开详情
			popoverRowInfo(key,tdx){
				let popover = this.ticketData[key].ticket_list[tdx].popover;
				if(popover){
					this.$set(this.ticketData[key].ticket_list[tdx],'popover',false);
				}else{
					this.$set(this.ticketData[key].ticket_list[tdx],'popover',true);
				}
			},
			getAreaList(parent_id){
				let para = {};
				para.data = {};
				para.data.country_id = 'CHN';
				para.data.level = parent_id?2:1;
				para.data.parent_id = parent_id?parent_id:'';

				getCityInfo({
          params: para,
          success: (res) => {
						let {message, code, data} = res.data;
						if(!parent_id){
							this.zone.prov = data;
						}else{
							this.zone.city = data;
						}
          },
          showLoading: false
        });
			}
		},
		mounted() {
			this.initPageFn();
			this.getAreaList();
		}
	};
</script>

<style scoped lang="less">
.ticket-list{
	background: #fff;
	margin-bottom: 10px;
}
.list_info{
	padding: 20px 20px 20px 140px;
	min-height: 90px;
	dt{
		float: left;
		margin-left: -120px;
		img{
			width: 120px;
			height: 90px;
			display: block;
		}
	}
	dd{
		.title{
			font-size: 18px;
			color: #333;
			margin-left: 5px;
		}
		.addr{
			font-size: 14px;
			color: #999;
			margin-left: 15px;
		}
		.grade{
			font-size: 14px;
			color: #f90;
			margin-left: 15px;
		}
	}
}
.more-trigger{
	height: 30px;
	line-height: 30px;
	font-size: 12px;
	color: #999;
	text-align: center;
	background: #fafafa;
}
.table-custom{
	border-collapse:separate; 
	border-spacing:0;
	text-align: center;
	th{text-align: center;}
	.el-button.el-button--primary a{
		color: #fff;
	}
}
.tip-content{
	text-align: left;
	font-size: 12px;
	background: #fafafa;
	.text{
		margin-top:6px;
		color: #999;
	}
}
.el-icon-caret{
	font-size: 10px;
	transform: scale(0.8);
}
.tr-bg{
	background:#fafafa;
	td{
		padding: 10px;
	}
}
</style>
