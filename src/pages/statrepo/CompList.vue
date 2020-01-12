<!--src/components/finace/report/branch.vue-->
<template>
	<div class="wrapper">
		<!-- system-search -->
		<div class="system-search">
			<div class="search-item">
				<div class="label">分公司名</div>
				<el-input v-model="filters.name" placeholder="输入分公司名称搜索"></el-input>
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="initialize(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<div class="content">
			<el-table :data="tableData"
				border
				class="el-table--middle">
				<el-table-column label="分公司名称"
					align="center"
					:resizable="false">
					<template slot-scope="scope">
						<p class="ellipsis"
							:title="scope.row.name">
							{{scope.row.name}}
						</p>
					</template>
				</el-table-column>
				<el-table-column label="操作"
					width="104"
					align="center"
					:resizable="false">
					<template slot-scope="scope">
						<router-link :to="{path:urlPath+'offline/tuanList', query:{id:scope.row.id}}">
							查看报表
						</router-link>
					</template>
				</el-table-column>
				<el-table-column label="报表快捷入口"
					align="center"
					width="580"
					:resizable="false">
					<template slot-scope="scope">
						<router-link :to="{path:urlPath+'offline/tuanList', query:{id:scope.row.id}}">
							汇总表
						</router-link>
						<router-link :to="{path:urlPath+'contregList', query:{id:scope.row.id}}">
							合同登记台账
						</router-link>
						<router-link :to="{path:urlPath+'invoiceList', query:{id:scope.row.id}}">
							发票开具表
						</router-link>
						<router-link :to="{path:urlPath+'costList', query:{id:scope.row.id}}">
							成本回票表
						</router-link>
						<router-link :to="{path:urlPath+'cobankList', query:{id:scope.row.id}}">
							分公司银行日记账
						</router-link>
						<router-link :to="{path:urlPath+'monthList', query:{id:scope.row.id}}">
							周数据明细
						</router-link>
					</template>
				</el-table-column>
			</el-table>
		</div>
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
import {finReportBranchComp} from 'src/api/finance';
export default {
	data() {
		return {
			filters: {
				name: '',
			},
			constFilters: {
				name: '',
			},
			tableData: [],
			pagination:{
				total_count:0,
				total_page: 0,
				page_size: 10,
				page_index: 1,
			},
			urlPath: '/statrepo/comp/'
		}
	},
	components:{},
	computed: {},
	methods: {
		initialize(bool){
			let para = {};
			para.data = this.constFilters;
			para.data.page = this.pagination.page_index;
			para.data.page_size = this.pagination.page_size;
			if(bool){
				this.constFilters = {... this.filters};
				para.data = {... this.filters};
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
			finReportBranchComp({
				params: para,
				success: (res) => {
					if(res.data.code == 0){
						this.tableData = res.data.data.list;
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
	},
	mounted() {
		this.initialize();
	}
};
</script>

<style scoped lang="scss">
.content{
	padding: 15px;
	background: #fff;
}
</style>
