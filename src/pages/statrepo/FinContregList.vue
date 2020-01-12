<!--D:\files\repo\bom\application\index\view\dev\src\components\finace\report\contract.vue-->
<template>
	<div class="wrapper">
		<long-tab :id="id" :sub="2"></long-tab>
		<div class="export-box clearfix">
			<div class="fr">
				<a :href="exportFunc" class="btn" v-if="sourceFrom == 0 && $menuPermission('statrepo/finarepo/contregListexpo')">导出</a>
				<a :href="exportFunc" class="btn" v-else-if="sourceFrom == 1 && $menuPermission('statrepo/comprepo/contregListexpo')">导出</a>
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
					<el-option label="合同编号" value="2"></el-option>
					<el-option label="客户名称" value="3"></el-option>
				</el-select>
				<el-input v-model="filters.search_value" placeholder="关键词"></el-input>
			</div>
			<div class="search-item calendar">
				<div class="label">签约/确认</div>
				<el-date-picker type="date"
					v-model="filters.confirm_time_start"
					placeholder="选择日期"
					:editable="false"
					:picker-options="datepickerOptions1">
				</el-date-picker>
				<div class="label zhi">-</div>
				<el-date-picker type="date"
					v-model="filters.confirm_time_end"
					placeholder="选择日期"
					:editable="false"
					:picker-options="datepickerOptions2">
				</el-date-picker>
			</div>
			<div class="search-item">
				<div class="label">收款性质</div>
				<el-select v-model="filters.payment_num_type" placeholder="请选择">
					<el-option label="全部" value="0"></el-option>
					<el-option label="一次性收款" value="1"></el-option>
					<el-option label="分次收款" value="2"></el-option>
				</el-select>
			</div>
			<div class="search-item">
				<div class="label" style="width:75px">合同/确认件</div>
				<el-select v-model="filters.contract_type" placeholder="请选择">
					<el-option label="全部" value="0"></el-option>
					<el-option label="合同" value="1"></el-option>
					<el-option label="确认件" value="2"></el-option>
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
				border>
				<el-table-column label="项目号"
					prop="item_no"
					width="120"
					align="center"
					:resizable="false"
					:render-header="rhXm"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="订单项目号"
					prop="order_item_no"
					align="center"
					width="120"
					:resizable="false"
					:render-header="rhDd"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="合同/确认件"
					prop="contract_confirmation"
					align="center"
					width="250"
					:resizable="false">
					<template slot-scope="scope">
						<!-- 确认件展示查看确认件 -->
												<!-- 待替换 -->
						<template v-if="scope.row.contract_confirmation_type == 1">
							<router-link v-if="$menuPermission('api/tuan/confirm_piece')"
								:to="{path: '/fin/productConfirm', query: { parent_id:scope.row.tuan_id, id:scope.row.order_id }}">
								查看确认件
							</router-link>
						</template>
						<!-- 纸质合同 -->
						<template v-if="scope.row.contract_confirmation_type == 2">
												<!-- 待替换 -->
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
				<el-table-column label="签约/确认时间"
					prop="confirm_time"
					align="center"
					width="130"
					:resizable="false"
					:render-header="rhSj"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="合同金额"
					prop="rmb_total_amount"
					header-align="center"
					align="right"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="已收"
					prop="rmb_receipted_amount"
					header-align="center"
					align="right"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="未收"
					prop="not_rmb_receipted_amount"
					header-align="center"
					align="right"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
				<el-table-column label="客户名称"
					prop="distributor_org_name"
					align="center"
					width="150"
					:resizable="false"
					:formatter="fmtEmpty">
						<template slot-scope="scope">
							<p class="ellipsis"
								:title="scope.row.distributor_org_name">
								{{scope.row.distributor_org_name}}
							</p>
						</template>
				</el-table-column>
				<el-table-column label="收款性质"
					prop="payment_nums"
					align="center"
					width="100"
					:resizable="false"
					:formatter="fmtEmpty">
				</el-table-column>
												<!-- 待替换 -->
				<el-table-column label="订单号"
					prop="order_no"
					align="center"
					min-width="180"
					:resizable="false"
					:formatter="fmtEmpty">
					<template slot-scope="scope">
						<router-link v-if="$menuPermission('api/tuan/bom_order_detail')"
							:to="{path: '/fcontrol/order-details/'+scope.row.tuan_id+'/'+scope.row.order_id}">
							{{scope.row.order_no}}
						</router-link>
					</template>
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
import {finReportContractComp} from 'src/api/finance';
import {
  dlElectronicContract
} from 'src/api/tuan';
import {formattDate} from 'src/assets/js/common.js';
import longTab from './components/LongTab';
export default {
	data() {
		return {
			id: this.$route.query.id,
			sourceFrom: null,
			rhClaXm: 'is',
			rhClaDd: 'is',
			rhClaSj: 'is',
			filters: {
				search_key: '1',
				search_value: '',
				confirm_time_start: '',
				confirm_time_end: '',
				payment_num_type: '0',
				contract_type: '1',
				sort_key: '0',
				sort_direction: '0'
			},
			constFilters: {
				search_key: '1',
				search_value: '',
				confirm_time_start: '',
				confirm_time_end: '',
				payment_num_type: '0',
				contract_type: '1',
				sort_key: '0',
				sort_direction: '0'
			},
			allData: {},
			pagination:{
				total_count: 0,
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
			let da = this.filters.confirm_time_end;
			return{
				disabledDate(t){
					return t.getTime() > (new Date(da)).getTime();
				}
			}
		},
		datepickerOptions2(){
			let da = this.filters.confirm_time_start;
			return{
				disabledDate(t){
					return t.getTime() < (new Date(da)).getTime();
				}
			}
		},
		exportFunc(){
			this.constFilters.confirm_time_start = this.constFilters.confirm_time_start ? formattDate(this.constFilters.confirm_time_start) : '';
			this.constFilters.confirm_time_end = this.constFilters.confirm_time_end ? formattDate(this.constFilters.confirm_time_end) : '';
			return "/bom/api/finance/export_reports_contract_company?org_id=" + this.id + "&confirm_time_start="+ this.constFilters.confirm_time_start + "&confirm_time_end=" + this.constFilters.confirm_time_end + "&search_key=" + this.constFilters.search_key + "&search_value=" + this.constFilters.search_value + "&sort_key=" + this.constFilters.sort_key + "&sort_direction=" + this.constFilters.sort_direction + "&payment_num_type=" + this.constFilters.payment_num_type + "&contract_type=" + this.constFilters.contract_type;
		},
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
				para.data.confirm_time_start = this.filters.confirm_time_start ? formattDate(this.filters.confirm_time_start) : '';
				para.data.confirm_time_end = this.filters.confirm_time_end ? formattDate(this.filters.confirm_time_end) : '';
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
				this.rhClaXm = 'is is1';
				this.rhClaDd = 'is';
				this.rhClaSj = 'is';
			}else{
				if(this.constFilters.sort_key == '1'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaXm = 'is is2';
					}else{
						this.rhClaXm = 'is is1';
					}
					this.rhClaDd = 'is';
					this.rhClaSj = 'is';
				}else if(this.constFilters.sort_key == '2'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaDd = 'is is2';
					}else{
						this.rhClaDd = 'is is1';
					}
					this.rhClaXm = 'is';
					this.rhClaSj = 'is';
				}else if(this.constFilters.sort_key == '3'){
					if(this.constFilters.sort_direction == '2'){
						this.rhClaSj = 'is is2';
					}else{
						this.rhClaSj = 'is is1';
					}
					this.rhClaXm = 'is';
					this.rhClaDd = 'is';
				}
			}
			finReportContractComp({
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
		rhXm(h){
			return h(
				'div',
				{'class': this.rhClaXm, attrs:{dname:'xiangmuhao'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['项目号']),
					h('span', {class:'so'}, []),
				]
			)
		},
		rhDd(h){
			return h(
				'div',
				{'class': this.rhClaDd, attrs:{dname:'dingdanxiangmuhao'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['订单项目号']),
					h('span', {class:'so'}, []),
				]
			)
		},
		rhSj(h){
			return h(
				'div',
				{'class': this.rhClaSj, attrs:{dname:'qianyue'}, on:{click:this.rhClick}},
				[
					h('span', {}, ['签约/确认时间']),
					h('span', {class:'so'}, []),
				]
			)
		},
		rhClick(e){
			const name = e.currentTarget.getAttribute('dname'),
				cla = e.currentTarget.className;
			if(name == 'xiangmuhao'){
				if(cla == 'is is1'){
					this.rhClaXm = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaXm = 'is is1';
					this.constFilters.sort_direction = '1';
				}
				this.constFilters.sort_key = '1';
			}else if(name == 'dingdanxiangmuhao'){
				if(cla == 'is is1'){
					this.rhClaDd = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaDd = 'is is1';
					this.constFilters.sort_direction = '1';
				}
				this.constFilters.sort_key = '2';
			}else if(name == 'qianyue'){
				if(cla == 'is is1'){
					this.rhClaSj = 'is is2';
					this.constFilters.sort_direction = '2';
				}else{
					this.rhClaSj = 'is is1';
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
