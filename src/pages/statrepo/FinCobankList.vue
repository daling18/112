<!--D:\files\repo\bom\application\index\view\dev\src\components\finace\report\journal.vue-->
<template>
	<div class="wrapper">
		<long-tab :id="id" :sub="5"></long-tab>
		<div class="export-box clearfix">
			<div class="fr">
				<a :href="exportFunc" class="btn" v-if="sourceFrom == 0 && $menuPermission('statrepo/finarepo/cobankListexpo')">导出</a>
				<a :href="exportFunc" class="btn" v-else-if="sourceFrom == 1 && $menuPermission('statrepo/comprepo/cobankListexpo')">导出</a>
			</div>
			<div class="comp"
				v-if="sourceFrom == 1">
				{{allData.org_name}}
			</div>
		</div>
		<!-- system-search -->
		<div class="system-search mt10">
			<div class="search-item mix">
				<div class="label">关键词</div>
				<el-select class="mr20" v-model="filters.search_key" placeholder="请选择">
					<el-option label="项目号" value="1"></el-option>
					<el-option label="经手人" value="2"></el-option>
					<el-option label="我方账户" value="3"></el-option>
					<el-option label="对方单位名称" value="4"></el-option>
				</el-select>
				<el-input v-model="filters.search_value" placeholder="关键词"></el-input>
			</div>
			<div class="search-item calendar">
				<div class="label">收付款日</div>
				<el-date-picker type="date"
					v-model="filters.payment_date_start"
					placeholder="选择日期"
					:editable="false"
					:picker-options="datepickerOptions1">
				</el-date-picker>
				<div class="label zhi">-</div>
				<el-date-picker type="date"
					v-model="filters.payment_date_end"
					placeholder="选择日期"
					:editable="false"
					:picker-options="datepickerOptions2">
				</el-date-picker>
			</div>
			<div class="search-item calendar">
				<div class="label">登记日期</div>
				<el-date-picker type="date"
					v-model="filters.create_time_start"
					placeholder="选择日期"
					:editable="false"
					:picker-options="datepickerOptions3">
				</el-date-picker>
				<div class="label zhi">-</div>
				<el-date-picker type="date"
					v-model="filters.create_time_end"
					placeholder="选择日期"
					:editable="false"
					:picker-options="datepickerOptions4">
				</el-date-picker>
			</div>
			<div class="search-item">
				<div class="label">收支类型</div>
				<el-select v-model="filters.payment_type" placeholder="请选择">
					<el-option label="全部" value="0"></el-option>
					<el-option label="收入" value="1"></el-option>
					<el-option label="支出" value="2"></el-option>
				</el-select>
			</div>
			<div class="search-item">
				<div class="label">认款状态</div>
				<el-select v-model="filters.balance_status" placeholder="请选择">
					<el-option label="全部" value="0"></el-option>
					<el-option label="未认清" value="1"></el-option>
					<el-option label="已认清" value="2"></el-option>
				</el-select>
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="initialize(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<!-- report-sub -->
		<div class="report-sub">
			<el-table :data="allData.list"
				class="report-sub-table"
				border>
				<el-table-column label="收付款日期"
					prop="payment_date"
					width="100"
					align="center"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="收支类型"
					prop="payment_type"
					align="center"
					width="80"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="金额"
					prop="rmb_total_amount"
					header-align="center"
					align="right"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
					<template slot-scope="scope">
						<template v-if="scope.row.payment_type == '收入'">+</template>
						<template v-else>-</template>
						{{scope.row.rmb_total_amount}}
					</template>
				</el-table-column>
				<el-table-column label="经手人"
					prop="user_name"
					align="center"
					width="120"
					:resizable="false"
					:formatter="fmtEmpty">
					<template slot-scope="scope">
						<p class="ellipsis"
							:title="scope.row.user_name">
							{{scope.row.user_name}}
						</p>
					</template>
				</el-table-column>
				<el-table-column label="对方单位名称"
					prop="settlement_org_name"
					align="center"
					min-width="160"
					:resizable="false"
					:formatter="fmtEmpty">
					<template slot-scope="scope">
						<p class="ellipsis"
							:title="scope.row.settlement_org_name">
							{{scope.row.settlement_org_name}}
						</p>
					</template>
				</el-table-column>
				<el-table-column label="我方账户"
					align="center"
					width="180"
					:resizable="false"
					:formatter="fmtEmpty">
					<template slot-scope="scope">
						<p class="lh18">{{scope.row.receipt_bank_name}}</p>
						<p class="lh18">{{scope.row.receipt_account}}</p>
					</template>
				</el-table-column>
				<el-table-column label="收付款方式"
					prop="account_type"
					align="center"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="项目号"
					prop="item_no"
					align="center"
					width="120"
					:resizable="false">
					<template slot-scope="scope">
						<p class="ellipsis lh18"
							v-for="(o,i) in scope.row.item_no"
							:key="i"
							:title="o">
							{{o}}
						</p>
					</template>
				</el-table-column>
				<el-table-column label="未认款金额"
					prop="fund_balance"
					header-align="center"
					align="right"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
					<template slot-scope="scope">
						<span class="wei" v-if="scope.row.fund_balance != 0"></span>
						<template v-if="scope.row.payment_type == '支出' && scope.row.fund_balance == 0">
							--
						</template>
						<template v-else>
							{{scope.row.fund_balance}}
						</template>
					</template>
				</el-table-column>
				<el-table-column label="费用类型"
					prop="feiyong"
					align="center"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="摘要"
					prop="zhaiyao"
					align="center"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="登记日期"
					prop="create_time"
					align="center"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
			</el-table>
		</div>
		<!-- /report-sub -->
    <div class="page" v-show="pagination.total_page > 1">
      <el-pagination layout="prev, pager, next" 
				@current-change="currentPageChange"
				:total="pagination.total_count"
				:page-size="pagination.page_size">
      </el-pagination>
    </div>
	</div>
</template>
<script>
import {finReportBankCompany} from 'src/api/finance';
import {formattDate} from 'src/assets/js/common.js'
import longTab from './components/LongTab';
export default {
	data() {
		return {
			id: this.$route.query.id,
			sourceFrom: null,
			filters: {
				payment_date_start: '',
				payment_date_end: '',
				create_time_start: '',
				create_time_end: '',
				search_key: '1',
				search_value: '',
				payment_type: '0',
				balance_status: '0'
			},
			constFilters: {
				payment_date_start: '',
				payment_date_end: '',
				create_time_start: '',
				create_time_end: '',
				search_key: '1',
				search_value: '',
				payment_type: '0',
				balance_status: '0'
			},
			allData: {},
			pagination:{
				total_count:0,
				total_page: 0,
				page_size: 10,
				page_index: 1,
			}
		}
	},
	created(){
		if(this.$route.meta.menu == 'StatrepoFinarepo'){
      this.sourceFrom = 0;
		}else{
			this.sourceFrom = 1;
		}
	},
	components:{
		'long-tab': longTab
	},
	computed: {
		datepickerOptions1(){
			let da = this.filters.invoice_date_end;
			return{
				disabledDate(t){
					return t.getTime() > (new Date(da)).getTime();
				}
			}
		},
		datepickerOptions2(){
			let da = this.filters.invoice_date_start;
			return{
				disabledDate(t){
					return t.getTime() < (new Date(da)).getTime();
				}
			}
		},
		datepickerOptions3(){
			let da = this.filters.create_time_end;
			return{
				disabledDate(t){
					return t.getTime() < (new Date(da)).getTime();
				}
			}
		},
		datepickerOptions4(){
			let da = this.filters.create_time_start;
			return{
				disabledDate(t){
					return t.getTime() < (new Date(da)).getTime();
				}
			}
		},
		exportFunc(){
			this.constFilters.payment_date_start = this.constFilters.payment_date_start ? formattDate(this.constFilters.payment_date_start) : '';
			this.constFilters.payment_date_end = this.constFilters.payment_date_end ? formattDate(this.constFilters.payment_date_end) : '';
			this.constFilters.create_time_start = this.constFilters.create_time_start ? formattDate(this.constFilters.create_time_start) : '';
			this.constFilters.create_time_end = this.constFilters.create_time_end ? formattDate(this.constFilters.create_time_end) : '';
			return "/bom/api/finance/export_reports_bank_company?org_id=" + this.id + "&payment_date_start="+ this.constFilters.payment_date_start + "&payment_date_end=" + this.constFilters.payment_date_end + "&create_time_start=" + this.constFilters.create_time_start + "&create_time_end=" + this.constFilters.create_time_end + "&search_key=" + this.constFilters.search_key + "&search_value=" + this.constFilters.search_value + "&payment_type=" + this.constFilters.payment_type + "&balance_status=" + this.constFilters.balance_status;
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
				para.data.payment_date_start = this.filters.payment_date_start ? formattDate(this.filters.payment_date_start) : '';
				para.data.payment_date_end = this.filters.payment_date_end ? formattDate(this.filters.payment_date_end) : '';
				para.data.create_time_start = this.filters.create_time_start ? formattDate(this.filters.create_time_start) : '';
				para.data.create_time_end = this.filters.create_time_end ? formattDate(this.filters.create_time_end) : '';
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
			finReportBankCompany({
				params: para,
				success: (res) => {
					if(res.data.code == 0){
						this.allData = res.data.data;
						this.pagination.total_count = parseInt(res.data.data.total_count, 10);
						this.pagination.total_page = parseInt(res.data.data.total_page, 10);
						// this.pagination.page_size = parseInt(res.data.data.page_size, 10);
						this.pagination.page_index = parseInt(res.data.data.page_index, 10);
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
		// 翻页相关
    currentPageChange(val) {
      this.pagination.page_index = val;
      this.initialize();
    },
		fmtEmpty(row, column){
			const item = row[column.property];
			if(item.length == 0 || item === undefined){
				return '--';
			}else{
				return item;
			}
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
