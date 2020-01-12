<template>
	<div class="wrapper">
		<long-tab :id="id" :sub="1"></long-tab>
		<!-- report-box -->
		<div class="report-box mt10">
			<!-- report-hd -->
			<div class="report-hd clearfix">
				<div class="tab clearfix">
					<router-link class="li on"
						to="">
						团维度
					</router-link>
					<router-link class="li"
						:to="{path:urlPath+'report/index2', query:{id:id}}">
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
            <el-option label="收款账户" value="3"></el-option>
            <el-option label="项目名称" value="4"></el-option>
            <el-option label="合同编号" value="5"></el-option>
            <el-option label="客户名称" value="6"></el-option>
            <el-option label="目的地" value="7"></el-option>
            <el-option label="负责人" value="8"></el-option>
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
				<div class="search-item">
					<div class="label">收入发票</div>
          <el-select v-model="filters.invoice_shouru" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已开齐" value="1"></el-option>
            <el-option label="未开齐" value="2"></el-option>
          </el-select>
				</div>
				<div class="search-item">
					<div class="label">认款</div>
          <el-select v-model="filters.receipted_type" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已认清" value="1"></el-option>
            <el-option label="未认清" value="2"></el-option>
          </el-select>
				</div>
				<div class="search-item">
					<div class="label">付款</div>
          <el-select v-model="filters.payed_type" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已付清" value="1"></el-option>
            <el-option label="未付清" value="2"></el-option>
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
					<el-table-column type="expand">
						<template slot-scope="scope">
							<div class="ep-out"
								v-if="(scope.row.order !== undefined && scope.row.order.length > 0) || (scope.row.receipted !== undefined && scope.row.receipted.length > 0) || (scope.row.payed !== undefined && scope.row.payed.length > 0)">
								<div class="ep-box"
									v-if="scope.row.order !== undefined && scope.row.order.length > 0">
									<div class="title">销</div>
									<el-table :data="scope.row.order"
										class="child-table"
										border>
										<el-table-column label="销售订单编号"
											prop="order_no"
											header-align="center"
											width="220"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="下单日期"
											prop="scheduled_time"
											header-align="center"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="合同/确认件"
											prop="contract_no"
											width="250"
											header-align="center"
											:resizable="false">
											<template slot-scope="scope">
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
										</el-table-column>
										<el-table-column label="合同金额"
											prop="rmb_total_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="已认款"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="wei" v-if="scope.row.not_rmb_receipt_amount != 0"></span>
												{{scope.row.rmb_receipted_amount}}
											</template>
										</el-table-column>
										<el-table-column label="未认款"
											prop="not_rmb_receipt_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="已开票"
											header-align="center"
											align="right"
											width="160"
											:resizable="false">
											<template slot-scope="scope">
												<!-- 0表示不是tdm订单，1表示tdm订单 -->
												<!-- TDM订单，已开票和未开票列，展示为- -->
												<template v-if="scope.row.is_tdm_order == 0">
													<span class="wei" v-if="scope.row.not_invoice_receipted_amount > 0 || (scope.row.specil_invoice_type == 0 && scope.row.rmb_total_amount == 0)"></span>
													{{scope.row.invoice_receipted_amount}}
												</template>
												<template v-else>--</template>
											</template>
										</el-table-column>
										<el-table-column label="未开票"
											prop="not_invoice_receipted_amount"
											header-align="center"
											align="right"
											width="160"
											:resizable="false">
											<template slot-scope="scope">
												<template v-if="scope.row.is_tdm_order == 0">
													{{scope.row.not_invoice_receipted_amount}}
												</template>
												<template v-else>--</template>
											</template>
										</el-table-column>
										<el-table-column label="客户名称"
											prop="distributor_org_name"
											width="250"
											header-align="center"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="收款账户"
											prop="receipt_account"
											header-align="center"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="r-account"
													v-for="(o,i) in scope.row.receipt_account" :key="i">
													{{o.receipt_bank_name}} {{o.receipt_account}}
												</span>
											</template>
										</el-table-column>
									</el-table>
								</div>
								<div class="ep-box"
									v-if="scope.row.receipted !== undefined && scope.row.receipted.length > 0">
									<div class="title">收</div>
									<el-table :data="scope.row.receipted"
										class="child-table"
										border>
										<el-table-column label="应收单编号"
											prop="item_no"
											header-align="center"
											width="220"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="创建时间" 
											prop="create_time" 
											header-align="center" 
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="合同/确认件" 
											width="250"
											header-align="center"
											:resizable="false">
											<template slot-scope="scope">
												--
											</template>
										</el-table-column>
										<el-table-column label="应收金额" 
											prop="rmb_total_amount" 
											header-align="center" 
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="已认款" 
											header-align="center" 
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="wei" v-if="scope.row.not_rmb_receipt_amount != 0"></span>
												{{scope.row.rmb_receipted_amount}}
											</template>
										</el-table-column>
										<el-table-column label="未认款"
											prop="not_rmb_receipt_amount"
											align="right"
											header-align="center"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="已开票"
											prop="invoice_receipted_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="wei" v-if="scope.row.not_invoice_receipted_amount > 0"></span>
												{{scope.row.invoice_receipted_amount}}
											</template>
											</el-table-column>
										<el-table-column label="未开票"
											prop="not_invoice_receipted_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false">
										</el-table-column>
										<el-table-column label="客户名称"
											prop="distributor_org_name"
											header-align="center"
											width="250"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="收款账户"
											header-align="center"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="r-account"
													v-for="(o,i) in scope.row.receipt_account" :key="i">
													{{o.receipt_bank_name}} {{o.receipt_account}}
												</span>
											</template>
										</el-table-column>
									</el-table>
								</div>
								<div class="ep-box"
									v-if="scope.row.payed !== undefined && scope.row.payed.length > 0">
									<div class="title">采</div>
									<el-table :data="scope.row.payed"
										class="child-table"
										border>
										<el-table-column label="采购成本编号"
											prop="item_no"
											header-align="center"
											width="220"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="采购日期"
											prop="create_time"
											header-align="center"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="合同/确认件"
											prop="confirm_file"
											header-align="center"
											width="250"
											:resizable="false">
											<template slot-scope="scope">
												<template v-if="scope.row.confirm_file != ''">
													<router-link
														:to="{path: '/control/cost/confirm', query: { parent_id:scope.row.resource_id, id:scope.row.id,type:'2' }}">
														查看确认件
													</router-link>
												</template>
												<!-- 纸质合同 -->
												<template v-else>
													--
												</template>
											</template>
										</el-table-column>
										<el-table-column label="确认件金额"
											prop="rmb_total_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="已付款"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="wei" v-if="scope.row.not_rmb_pay_amount != 0"></span>
												{{scope.row.rmb_payed_amount}}
											</template>
										</el-table-column>
										<el-table-column label="未付款"
											prop="not_rmb_pay_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="已回票"
											prop="invoice_payed_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="wei" v-if="scope.row.invoice_payed_amount < scope.row.not_invoice_payed_amount"></span>
												{{scope.row.invoice_payed_amount}}
											</template>
										</el-table-column>
										<el-table-column label="未回票"
											prop="not_invoice_payed_amount"
											header-align="center"
											align="right"
											width="160"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="供应商名称"
											prop="supplier_org_name"
											header-align="center"
											width="250"
											:formatter="fmtEmpty"
											:resizable="false" />
										<el-table-column label="付款账户"
											header-align="center"
											:formatter="fmtEmpty"
											:resizable="false">
											<template slot-scope="scope">
												<span class="r-account"
													v-for="(o,i) in scope.row.receipt_account" :key="i">
													{{o.receipt_bank_name}} {{o.receipt_account}}
												</span>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</div>
							<div v-else style="padding-left: 70px">暂无数据</div>
						</template>
					</el-table-column>
					<el-table-column label="项目号"
						prop="item_no"
						width="120"
						align="center"
						:resizable="false"
						:render-header="rhNo">
					</el-table-column>
					<el-table-column label="应收"
						prop="rmb_receipt_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="已收"
						prop="rmb_receipted_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="未收"
						prop="not_rmb_receipt_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="已开票"
						prop="invoice_receipted_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="未开票"
						prop="not_invoice_receipted_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="应付"
						prop="rmb_pay_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="已付"
						prop="rmb_payed_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="未付"
						prop="not_rmb_pay_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="已回票"
						prop="invoice_payed_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="未回票"
						prop="not_invoice_payed_amount"
						width="100"
						header-align="center"
						align="right"
						:resizable="false">
					</el-table-column>
					<el-table-column label="利润"
						prop="tuan_profit"
						width="120"
						header-align="center"
						align="right"
						:resizable="false"
						:render-header="rhLr">
					</el-table-column>
					<el-table-column label="毛利率"
						prop="tuan_profit_rate"
						width="100"
						header-align="center"
						align="right"
						:resizable="false"
						:render-header="rhLv">
					</el-table-column>
					<el-table-column label="名称"
						width="180"
						header-align="center"
						:resizable="false">
						<template slot-scope="scope">
							<div class="ellipsis"
								:title="scope.row.tuan_name">
								{{scope.row.tuan_name}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="类别"
						prop="product_large_type"
						width="100"
						align="center"
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
						width="80"
						header-align="center"
						:resizable="false">
						<template slot-scope="scope">
							<div class="ellipsis"
								:title="scope.row.destination_city">
								{{scope.row.destination_city}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="回团日期"
						prop="back_date"
						width="100"
						align="center"
						:resizable="false">
					</el-table-column>
					<el-table-column label="业绩归属公司"
						width="150"
						header-align="center"
						:resizable="false">
						<template slot-scope="scope">
							<div class="ellipsis"
								:title="scope.row.org_name">
								{{scope.row.org_name}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="项目负责人"
						prop="op_name"
						width="110"
						align="center"
						:resizable="false">
						<template slot-scope="scope">
							<div class="ellipsis"
								:title="scope.row.op_name">
								{{scope.row.op_name}}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="人数"
						prop="enrollment"
						width="50"
						align="center"
						:resizable="false">
					</el-table-column>
					<el-table-column label="天数"
						prop="trip_days"
						width="50"
						align="center"
						:resizable="false">
					</el-table-column>
				</el-table>
			</div>
			<!-- /report-bd -->
			<div class="page" v-show="pagination.total_page > 1">
				<el-pagination layout="prev, pager, next" 
					@current-change="currentPageChange"
					:total="pagination.total_count"
					:page-size="pagination.page_size">
				</el-pagination>
			</div>
		</div>
		<!-- /report-box -->
	</div>
</template>

<script>
import {
	finReportOfflineByTuan,
	finExportReportOfflineByTuan
	} from 'src/api/finance';
import {
	dlElectronicContract
	} from 'src/api/tuan';
import {formattDate} from 'src/assets/js/common.js'
import longTab from './long-tab';
export default {
	data() {
		return {
			id: this.$route.query.id,
			sourceFrom: null,
			urlPath: null,
			rhClaNo: 'is',
			rhClaLr: 'is',
			rhClaLv: 'is',
			filters: {
				search_key: '1',
				search_value: '',
				back_date_start: '',
				back_date_end: '',
				product_large_type: '0',
				invoice_shouru: '0',
				receipted_type: '0',
				payed_type: '0',
				sort_key: '0',
				sort_direction: '0'
			},
			constFilters: {
				search_key: '1',
				search_value: '',
				back_date_start: '',
				back_date_end: '',
				product_large_type: '0',
				invoice_shouru: '0',
				receipted_type: '0',
				payed_type: '0',
				sort_key: '0',
				sort_direction: '0'
			},
			allData: {},
			tableData: [],
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
			return "/bom/api/finance/export_reports_offline_by_tuan?org_id=" + this.id + "&back_date_start="+ this.constFilters.back_date_start + "&back_date_end=" + this.constFilters.back_date_end + "&search_key=" + this.constFilters.search_key + "&search_value=" + this.constFilters.search_value + "&sort_key=" + this.constFilters.sort_key + "&sort_direction=" + this.constFilters.sort_direction + "&product_large_type=" + this.constFilters.product_large_type + "&invoice_shouru=" + this.constFilters.invoice_shouru + "&receipted_type=" + this.constFilters.receipted_type + "&payed_type=" + this.constFilters.payed_type;
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
				this.rhClaLr = 'is';
				this.rhClaLv = 'is';
			}else{
				if(this.constFilters.sort_key == '1'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaNo = 'is is2';
					}else{
						this.rhClaNo = 'is is1';
					}
					this.rhClaLr = 'is';
					this.rhClaLv = 'is';
				}else if(this.constFilters.sort_key == '2'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaLr = 'is is2';
					}else{
						this.rhClaLr = 'is is1';
					}
					this.rhClaNo = 'is';
					this.rhClaLv = 'is';
				}else if(this.constFilters.sort_key == '3'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaLv = 'is is2';
					}else{
						this.rhClaLv = 'is is1';
					}
					this.rhClaNo = 'is';
					this.rhClaLr = 'is';
				}
			}
			finReportOfflineByTuan({
				params: para,
				success: (res) => {
					if(res.data.code == 0){
						this.allData = res.data.data;
						this.pagination.total_count = parseInt(res.data.data.total_count, 10);
						this.pagination.total_page = parseInt(res.data.data.total_page, 10);
						// this.pagination.page_size = parseInt(res.data.data.page_size, 10);
						this.pagination.page_index = parseInt(res.data.data.page_index, 10);
						let all = this.allData.list.tuan_all,
							list = this.allData.list.tuan_list,
							tmp = {};
						tmp.item_no = '合计';
						tmp.not_rmb_receipt_amount = all.not_rmb_receipt_amount;
						tmp.not_invoice_receipted_amount = all.not_invoice_receipted_amount;
						tmp.not_rmb_pay_amount = all.not_rmb_pay_amount;
						tmp.not_invoice_payed_amount = all.not_invoice_payed_amount;
						tmp.tuan_profit = all.tuan_profit;
						tmp.rmb_receipt_amount = '--';
						tmp.rmb_receipted_amount = '--';
						tmp.invoice_receipted_amount = '--';
						tmp.invoice_payed_amount = '--';
						tmp.rmb_pay_amount = '--';
						tmp.rmb_payed_amount = '--';
						tmp.tuan_profit_rate = '--';
						tmp.tuan_name = '--';
						tmp.product_large_type = '--';
						tmp.destination_city = '--';
						tmp.back_date = '--';
						tmp.op_name = '--';
						tmp.trip_days = '--';
						tmp.org_name = '--';
						tmp.enrollment = '--';
						list.splice(0,0,tmp);
						this.tableData = this.allData.list.tuan_list;
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
		rhLr(h){
			return h(
				'div',
				{'class': this.rhClaLr, attrs:{dname:'lilun'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['利润']),
					h('span', {class:'so'}, []),
				]
			)
		},
		rhLv(h){
			return h(
				'div',
				{'class': this.rhClaLv, attrs:{dname:'maolilv'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['毛利率']),
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
			}else if(name == 'lilun'){
				if(cla == 'is is1'){
					this.rhClaLr = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaLr = 'is is1';
					this.constFilters.sort_direction = '1';
				}
				this.constFilters.sort_key = '2';
			}else if(name == 'maolilv'){
				if(cla == 'is is1'){
					this.rhClaLv = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaLv = 'is is1';
					this.constFilters.sort_direction = '1';
				}
				this.constFilters.sort_key = '3';
			}
			this.initialize();
		},
		fmtEmpty(row, column){
			const item = row[column.property];
			if(item.length == 0 || item === undefined){
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
</style>
