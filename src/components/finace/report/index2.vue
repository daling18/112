<template>
	<div class="wrapper">
		<long-tab :id="id" :sub="1"></long-tab>
		<!-- report-box -->
		<div class="report-box mt10">
			<!-- report-hd -->
			<div class="report-hd clearfix">
				<div class="tab clearfix">
					<router-link class="li"
						:to="{path:urlPath+'report', query:{id:id}}">
						团维度
					</router-link>
					<router-link class="li on"
						to="">
						订单维度
					</router-link>
				</div>
				<div class="fr">
					<template v-if="sourceFrom == 1">
						{{allData.org_name}}
					</template>
					<a :href="exportFunc" class="btn">导出</a>
				</div>
			</div>
			<!-- /report-hd -->
			<!-- system-search -->
			<div class="system-search">
				<div class="search-item mix">
					<div class="label">关键词</div>
          <el-select class="mr20" v-model="filters.search_key" placeholder="请选择">
            <el-option label="项目号" value="1"></el-option>
            <el-option label="订单编号" value="2"></el-option>
            <el-option label="项目名称" value="3"></el-option>
            <el-option label="合同编号" value="4"></el-option>
            <el-option label="客户名称" value="5"></el-option>
            <el-option label="目的地" value="6"></el-option>
            <el-option label="负责人" value="7"></el-option>
          </el-select>
					<el-input v-model="filters.search_value" placeholder="关键词"></el-input>
				</div>
				<div class="search-item calendar">
					<div class="label">回团日期</div>
					<el-date-picker type="date"
						v-model="filters.back_date_start"
						placeholder="选择日期"
						:editable="false"
						:picker-options="datepickerOptions1">
					</el-date-picker>
					<div class="label zhi">-</div>
					<el-date-picker type="date"
						v-model="filters.back_date_end"
						placeholder="选择日期"
						:editable="false"
						:picker-options="datepickerOptions2">
					</el-date-picker>
				</div>
				<div class="search-item">
					<div class="label">项目类别</div>
          <el-select v-model="filters.product_large_type" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="跟团" value="1"></el-option>
            <el-option label="商务" value="2"></el-option>
            <el-option label="自助" value="4"></el-option>
            <el-option label="邮轮" value="5"></el-option>
            <el-option label="汽车团" value="11"></el-option>
            <el-option label="快捷旅游" value="12"></el-option>
          </el-select>
				</div>
				<div class="search-item search-button">
					<el-button type="primary" @click="initialize(true)">立即搜索</el-button>
				</div>
			</div>
			<!-- /system-search -->
			<!-- report-bd -->
			<div class="report-bd">
				<el-table :data="tableData"
					class="report-table"
					border>
					<el-table-column label="项目号"
						prop="item_no"
						width="120"
						align="center"
						:resizable="false"
						:render-header="rhNo"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="下单日期"
						prop="scheduled_time"
						width="160"
						:resizable="false"
						:render-header="rhXd"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="订单编号"
						prop="order_no"
						width="180"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="项目名称"
						prop="tuan_name"
						width="140"
						:resizable="false"
						:formatter="fmtEmpty">
						<template slot-scope="scope">
							<div class="ellipsis"
								:title="scope.row.tuan_name">
								{{scope.row.tuan_name}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="合同/确认件"
						prop="contract_no"
						width="250"
						:resizable="false">
						<template slot-scope="scope">
							<template v-if="scope.row.contract_no == '--'">--</template>
							<template v-else>
								<!-- 确认件展示查看确认件 -->
								<template v-if="scope.row.contract_confirmation_type == 1">
									<router-link v-if="$menuPermission('api/tuan/confirm_piece')"
										:to="{path: '/fin/productConfirm', query: { parent_id:scope.row.tuan_id, id:scope.row.order_id }}">
										查看确认件
									</router-link>
								</template>
								<!-- 纸质合同 -->
								<template v-if="scope.row.contract_confirmation_type == 2">
									<!-- 纸质合同如果绑定合同编号，则展示合同编号 -->
									<router-link v-if="scope.row.contract_confirmation"
										:to="{path: '/fin/oldconfirm', query: {'order_no':scope.row.order_no, 'tuan_id':scope.row.tuan_id, 'edit':'3'}}">
										{{scope.row.contract_confirmation}}
									</router-link>
									<router-link v-else
										:to="{path: '/fin/oldconfirm', query: {'order_no':scope.row.order_no, 'tuan_id':scope.row.tuan_id, 'edit':'3'}}">
										查看纸质合同
									</router-link>
								</template>
								<!-- 电子合同展示合同编号 -->
								<span v-if="scope.row.contract_confirmation_type == 3">
									<span class="link"
										@click="dlDzht(scope.row.order_no, scope.row.tuan_id)"
										v-if="scope.row.contract_confirmation">
										{{scope.row.contract_confirmation}}
									</span>
								</span>
							</template>
						</template>
					</el-table-column>
					<el-table-column label="合同金额"
						prop="rmb_total_amount"
						header-align="center"
						align="right"
						width="100"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="客户名称"
						prop="distributor_org_name"
						width="180"
						:resizable="false"
						:formatter="fmtEmpty">
						<template slot-scope="scope">
							<p class="ellipsis"
								:title="scope.row.distributor_org_name">
								{{scope.row.distributor_org_name}}
							</p>
						</template>
					</el-table-column>
					<el-table-column label="项目类别"
						prop="product_large_type"
						width="100"
						:resizable="false">
						<template slot-scope="scope">
							<div class="ellipsis"
								:title="scope.row.product_large_type"
								v-if="scope.row.product_large_type != ''">
								{{scope.row.product_large_type}}
							</div>
							<template v-else>--</template>
						</template>
					</el-table-column>
					<el-table-column label="目的地"
						prop="destination_city"
						width="100"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="回团时间"
						prop="back_date"
						width="100"
						:render-header="rhHt"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="业绩归属公司"
						prop="supplier_org_name"
						width="140"
						header-align="center"
						:resizable="false"
						:formatter="fmtEmpty">
						<template slot-scope="scope">
							<p class="ellipsis"
								:title="scope.row.supplier_org_name">
								{{scope.row.supplier_org_name}}
							</p>
						</template>
					</el-table-column>
					<el-table-column label="项目负责人"
						prop="operator_name"
						width="100"
						align="center"
						:resizable="false"
						:formatter="fmtEmpty">
						<template slot-scope="scope">
							<div class="ellipsis"
								:title="scope.row.operator_name">
								{{scope.row.operator_name}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="参团人数"
						prop="enrollment"
						width="78"
						align="center"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="天数"
						prop="trip_days"
						width="50"
						align="center"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="已开票金额"
						prop="invoice_receipted_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
						<template slot-scope="scope">
							<!-- 0表示不是tdm订单，1表示tdm订单 -->
							<!-- TDM订单，已开票和未开票列，展示为- -->
							<template v-if="scope.row.is_tdm_order == 0">
								{{scope.row.invoice_receipted_amount}}
							</template>
							<template v-else>--</template>
						</template>
					</el-table-column>
					<el-table-column label="应收"
						prop="rmb_receipt_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="实收"
						prop="rmb_receipted_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="收款账户"
						prop="payment_account_shou"
						width="200"
						header-align="center"
						:resizable="false">
						<template slot-scope="scope">
							<div v-if="scope.row.payment_account_shou === undefined || scope.row.payment_account_shou.length == 0">
								--
							</div>
							<div v-else>
								<div :key="i"
									v-for="(o,i) in scope.row.payment_account_shou"
									:title="o.receipt_bank_name + ' ' + o.receipt_account"
									class="ellipsis lh18">
									{{o.receipt_bank_name}} {{o.receipt_account}}
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="应付"
						prop="pay_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="实付"
						prop="payed_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="付款账户"
						prop="payment_account_fu"
						width="200"
						header-align="center"
						:resizable="false">
						<template slot-scope="scope">
							<div v-if="scope.row.payment_account_fu === undefined || scope.row.payment_account_fu.length == 0">
								--
							</div>
							<div v-else>
								<div :key="i"
									v-for="(o,i) in scope.row.payment_account_fu"
									:title="o.receipt_bank_name + ' ' + o.receipt_account"
									class="ellipsis lh18">
									{{o.receipt_bank_name}} {{o.receipt_account}}
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="利润"
						prop="order_profit"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="毛利率"
						prop="order_profit_rate"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
					<el-table-column label="成本票回票金额"
						prop="invoice_payed_amount"
						width="120"
						header-align="center"
						align="right"
						:resizable="false"
						:formatter="fmtEmpty">
					</el-table-column>
				</el-table>
				<div class="page" v-show="pagination.total_page > 1">
					<el-pagination layout="prev, pager, next" 
						@current-change="currentPageChange"
						:total="pagination.total_count"
						:page-size="pagination.page_size">
					</el-pagination>
				</div>
				<div class="bz">
					<div class="title">备注：</div>
					<ul>
						<li>1、单个订单实付金额的计算公式：订单实付=成本摊派比例*成本单实际付款；成本摊派比例=该订单人数／成本摊派总订单人数；</li>
						<li>2、单个订单应付金额计算公式：订单成本（订单应付）=成本摊派比例*成本单总金额；成本摊派比例=该订单人数／成本单摊派总订单人数；</li>
						<li>3、单个订单利润计算公式：订单利润=订单应收-订单应付；</li>
						<li>4、此表格以订单为维度计算毛利率，存在成本摊派偏差，建议以团为维度计算团成本和毛利率。</li>
					</ul>
				</div>
			</div>
			<!-- /report-bd -->
		</div>
		<!-- /report-box -->
	</div>
</template>

<script>
import {finReportOfflineByOrder} from 'src/api/finance';
import {formattDate} from 'src/assets/js/common.js'
import longTab from './long-tab';
export default {
	data() {
		return {
			id: this.$route.query.id,
			sourceFrom: null,
			urlPath: null,
			rhClaNo: 'is',
			rhClaXd: 'is',
			rhClaHt: 'is',
			filters: {
				search_key: '1',
				search_value: '',
				back_date_start: '',
				back_date_end: '',
				product_large_type: '0',
				sort_key: '0',
				sort_direction: '0'
			},
			constFilters: {
				search_key: '1',
				search_value: '',
				back_date_start: '',
				back_date_end: '',
				product_large_type: '0',
				sort_key: '0',
				sort_direction: '0'
			},
			allData:{},
			tableData:[],
			pagination:{
				total_count: 0,
				total_page: 0,
				page_size: 10,
				page_index: 1,
			}
		}
	},
	created(){
		if(this.$route.meta.menu == 'branchReport'){
			this.sourceFrom = 1;
			this.urlPath = '/fin/b/';
		}else{
			this.sourceFrom = 0;
			this.urlPath = '/fin/';
		}
	},
	components:{
		'long-tab': longTab
	},
	computed: {
		datepickerOptions1(){
			let da = this.filters.back_date_end;
			return{
				disabledDate(t){
					return t.getTime() > (new Date(da)).getTime();
				}
			}
		},
		datepickerOptions2(){
			let da = this.filters.back_date_start;
			return{
				disabledDate(t){
					return t.getTime() < (new Date(da)).getTime();
				}
			}
		},
		exportFunc(){
			this.constFilters.back_date_start = this.constFilters.back_date_start ? formattDate(this.constFilters.back_date_start) : '';
			this.constFilters.back_date_end = this.constFilters.back_date_end ? formattDate(this.constFilters.back_date_end) : '';
			return "/bom/api/finance/export_reports_offline_by_order?org_id=" + this.id + "&back_date_start="+ this.constFilters.back_date_start + "&back_date_end=" + this.constFilters.back_date_end + "&search_key=" + this.constFilters.search_key + "&search_value=" + this.constFilters.search_value + "&sort_key=" + this.constFilters.sort_key + "&sort_direction=" + this.constFilters.sort_direction + "&product_large_type=" + this.constFilters.product_large_type;
		}
	},
	methods: {
		initialize(bool){
			let para = {};
			para.data = this.constFilters;
			para.data.org_id = this.id;
			para.data.page = this.pagination.page_index;
			para.data.page_size = this.pagination.page_size;
			if(bool){
				this.constFilters = {... this.filters};
				para.data = {... this.filters};
				para.data.back_date_start = this.filters.back_date_start ? formattDate(this.filters.back_date_start) : '';
				para.data.back_date_end = this.filters.back_date_end ? formattDate(this.filters.back_date_end) : '';
				para.data.page = 1;
        this.pagination = {
          total_count: 0,
          total_page: 0,
          page_size: 10,
          page_index: 1,
        };
			}else{
				this.filters = {... this.constFilters};
			}
			if(this.constFilters.sort_key == '0'){
				this.rhClaNo = 'is is1';
				this.rhClaXd = 'is';
				this.rhClaHt = 'is';
			}else{
				if(this.constFilters.sort_key == '1'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaNo = 'is is2';
					}else{
						this.rhClaNo = 'is is1';
					}
					this.rhClaXd = 'is';
					this.rhClaHt = 'is';
				}else if(this.constFilters.sort_key == '2'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaXd = 'is is2';
					}else{
						this.rhClaXd = 'is is1';
					}
					this.rhClaNo = 'is';
					this.rhClaHt = 'is';
				}else if(this.constFilters.sort_key == '3'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaHt = 'is is2';
					}else{
						this.rhClaHt = 'is is1';
					}
					this.rhClaNo = 'is';
					this.rhClaXd = 'is';
				}
			}
			finReportOfflineByOrder({
				params: para,
				success: (res) => {
					if(res.data.code == 0){
						this.allData = res.data.data;
						this.pagination.total_count = parseInt(res.data.data.total_count, 10);
						this.pagination.total_page = parseInt(res.data.data.total_page, 10);
						// this.pagination.page_size = parseInt(res.data.data.page_size, 10);
						this.pagination.page_index = parseInt(res.data.data.page_index, 10);
						let all = this.allData.list.order_all,
							list = this.allData.list.order_list,
							tmp = {};
						if(list.length > 0){
							tmp.item_no = '合计';
							tmp.scheduled_time = '--';
							tmp.order_no = '--',
							tmp.tuan_name = '--',
							tmp.contract_no = '--',
							tmp.distributor_org_name = '--',
							tmp.product_large_type = '--',
							tmp.destination_city = '--',
							tmp.back_date = '--',
							tmp.supplier_org_name = '--',
							tmp.operator_name = '--',
							tmp.trip_days = '--',
							tmp.payment_account_shou = '',
							tmp.payment_account_fu = '',
							tmp.order_profit_rate = '--',
							tmp.rmb_total_amount = all.rmb_total_amount;
							tmp.enrollment = all.enrollment;
							tmp.invoice_receipted_amount = all.invoice_receipted_amount;
							tmp.rmb_receipt_amount = all.rmb_receipt_amount;
							tmp.rmb_receipted_amount = all.rmb_receipted_amount;
							tmp.pay_amount = all.pay_amount;
							tmp.payed_amount = all.payed_amount;
							tmp.order_profit = all.order_profit;
							tmp.invoice_payed_amount = all.invoice_payed_amount;
							list.splice(0,0,tmp);
						}
						this.tableData = this.allData.list.order_list;
						//  console.log(this.tableData)
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
					}
				},
				showLoading: true
			});
		},
		currentPageChange(val) {
			this.pagination.page_index = val;
			this.initialize();
		},
		rhNo(h){
			return h(
				'div',
				{'class': this.rhClaNo, attrs:{dname:'xiangmuhao'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['项目号']),
					h('span', {class:'so'}, []),
				]
			)
		},
		rhXd(h){
			return h(
				'div',
				{'class': this.rhClaXd, attrs:{dname:'xiadanriqi'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['下单日期']),
					h('span', {class:'so'}, []),
				]
			)
		},
		rhHt(h){
			return h(
				'div',
				{'class': this.rhClaHt, attrs:{dname:'huituanriqi'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['回团日期']),
					h('span', {class:'so'}, []),
				]
			)
		},
		rhClick(e){
			const name = e.currentTarget.getAttribute('dname'),
				cla = e.currentTarget.className;
			if(name == 'xiangmuhao'){
				if(cla == 'is is1'){
					this.rhClaNo = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaNo = 'is is1';
					this.constFilters.sort_direction = '1';
				}
				this.constFilters.sort_key = '1';
			}else if(name == 'xiadanriqi'){
				if(cla == 'is is1'){
					this.rhClaXd = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaXd = 'is is1';
					this.constFilters.sort_direction = '1';
				}
				this.constFilters.sort_key = '2';
			}else if(name == 'huituanriqi'){
				if(cla == 'is is1'){
					this.rhClaHt = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaHt = 'is is1';
					this.constFilters.sort_direction = '1';
				}
				this.constFilters.sort_key = '3';
			}
			this.initialize();
		},
		fmtEmpty(row, column){
			const item = row[column.property];
			//  console.log(column.property)
			if(item === undefined || item.length == 0){
				return '--';
			}else{
				return item;
			}
		},
		dlDzht(ono, tid){
      let params = {
				data: {
					'order_no': ono,
					'tuan_id': tid
				}
			};
      dlElectronicContract({
        params,
        success: res => {
           window.location.href = res.data.data.path;
        }
      });
		}
	},
	mounted() {
		this.initialize();
	}
};
</script>

<style scoped lang="scss">
.lh18{
	line-height: 18px;
}
</style>
