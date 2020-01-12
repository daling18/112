<template>
	<div class="wrapper">
		<long-tab :id="id"></long-tab>
		<!-- report-sub -->
		<div class="report-sub">
			<div class="report-sub-hd clearfix">
				<div class="fr">
					月份
					<el-date-picker type="month"
						v-model="filters.year_month"
						placeholder="选择月"
						:editable="false"
						@change="changeDate">
					</el-date-picker>
					<a :href="exportFunc" class="btn">导出</a>
				</div>
				<div class="comp"
					v-if="sourceFrom == 1">
					{{allData.org_name}}
				</div>
			</div>
			<el-table :data="tableData"
				class="report-table"
				border>
				<el-table-column label="日期"
					prop="date"
					align="center"
					width="120"
					fixed
					:resizable="false">
				</el-table-column>
				<el-table-column label="收款" align="center">
					<el-table-column label="跟团游"
						prop="receipted_1"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="商务考察"
						prop="receipted_2"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="自助游"
						prop="receipted_4"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="邮轮"
						prop="receipted_5"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="短途游"
						prop="receipted_11"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="快捷旅游"
						prop="receipted_12"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="流水合计"
						prop="receipted_amount"
						header-align="center"
						align="right"
						width="140"
						:resizable="false" />
					<el-table-column label="TDM平台"
						prop="tdm_amount"
						header-align="center"
						align="right"
						width="140"
						:resizable="false" />
				</el-table-column>
				<el-table-column label="付款" align="center">
					<el-table-column label="打包产品"
						prop="payed_21"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="大交通"
						prop="payed_1"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="门票"
						prop="payed_2"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="地接"
						prop="payed_3"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="用餐"
						prop="payed_4"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="签证"
						prop="payed_7"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="住宿"
						prop="payed_12"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="购物"
						prop="payed_13"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="用车"
						prop="payed_15"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="保险"
						prop="payed_16"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="送团"
						prop="payed_17"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="边防"
						prop="payed_18"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="送签"
						prop="payed_19"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="导领"
						prop="payed_20"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="其他杂费"
						prop="payed_99"
						header-align="center"
						align="right"
						width="100"
						:resizable="false" />
					<el-table-column label="付款合计"
						prop="payed_amount"
						header-align="center"
						align="right"
						width="140"
						:resizable="false" />
				</el-table-column>
			</el-table>
			<div class="bz">
				<div class="title">备注：</div>
				<ul>
					<li>1、线上TDM：统计的是上架至TDM平台销售所产生的收入；</li>
					<li>2、日期以订单的认款日期进行统计</li>
				</ul>
			</div>
		</div>
		<!-- /report-sub -->
	</div>
</template>
<script>
import {finReportCompByMonth} from 'src/api/finance';
import {formattDate} from 'src/assets/js/common.js';
import longTab from './long-tab';
export default {
	data() {
		return {
			id: this.$route.query.id,
			sourceFrom: null,
			filters: {
				year_month: ''
			},
			allData: {},
			tableData: []
		}
	},
	created(){
		if(this.$route.meta.menu == 'branchReport'){
			this.sourceFrom = 1;
		}else{
			this.sourceFrom = 0;
		}
	},
	components:{
		'long-tab': longTab
	},
	computed: {
		exportFunc(){
			this.filters.year_month = this.filters.year_month ? formattDate(this.filters.year_month) : '';
			return "/bom/api/finance/export_reports_company_by_month?org_id=" + this.id + "&year_month="+ this.filters.year_month;
		}
	},
	methods: {
		initialize(bool){
			let para = {};
			para.data = this.filters;
			para.data.org_id = this.id;
			finReportCompByMonth({
				params: para,
				success: (res) => {
					if(res.data.code == 0){
						this.allData = res.data.data;
						let fdata = [],
							fkey = [],
							odata = this.allData.list;
						for(var i in odata){
							fdata.push(odata[i]);
							fkey.push(i);
						}
						fdata.forEach((val,idx,arr) => {
							fdata[idx].date = fkey[idx];
						});
						this.tableData = fdata;
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
		changeDate(){
			this.filters.year_month = this.filters.year_month ? formattDate(this.filters.year_month) : '';
			this.initialize();
		}
	},
	mounted() {
		const splitDate = new Date().toLocaleDateString().split('/');
		splitDate[1] -= 1;
		splitDate.splice(-1,1,'01');
		this.filters.year_month = splitDate.join('-');
		// this.initialize();
	}
};
</script>

<style scoped lang="scss">
.el-date-editor{
	width: 130px;
	margin: 0 10px 0 5px;
}
</style>
