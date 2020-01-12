<template>
<div class="wrapper">
	<div class="system-search">
		<div class="search-line-item">
			<div class="search-panel">
				<div class="search-item">
					<div class="label">产品创建时间</div>
					<el-date-picker v-model="filters.start_date" @change="formatDateChange" type="date" placeholder="选择日期"></el-date-picker>
					<div class="label" style="width:10px;margin:0 10px;">至</div>
					<el-date-picker v-model="filters.end_date" type="date" placeholder="选择日期"></el-date-picker>
				</div>
			</div>
			<div class="search-item">
				<div class="label">产品类别</div>
				<el-select v-model="filters.big_category_id" placeholder="请选择" style="width:120px;">
						<el-option label="跟团游" value="1"></el-option>
						<el-option label="商务考察" value="2"></el-option>
						<el-option label="自助游" value="4"></el-option>
						<el-option label="邮轮" value="5"></el-option>
						<el-option label="短途游(汽车团)" value="11"></el-option>
					</el-select>
			</div>
		</div>
		<div class="search-line-item">
			<div class="search-item">
				<div class="label">产品编号</div>
				<el-input v-model="filters.product_no" placeholder="产品编号"></el-input>
			</div>
			<div class="search-item">
					<div class="label">产品负责人</div>
				<el-input v-model="filters.product_owner" placeholder="产品负责人"></el-input>
			</div>
			<div class="search-item">
				<el-button type="primary" @click="initPageFn">搜索</el-button>
			</div>
		</div>
  </div>
  <div class="system-content">
  	<div class="content-list">
  		<div class="mode-table">
		    <el-table :data="tableList" style="width: 100%">
		      <el-table-column
		        v-for="(col,idx) in cols"
						v-if="!col.template"
						:align="col.align?col.align:''"
		        :key="idx"
		        :prop="col.prop"
		        :label="col.label"
		        :fixed="col.fixed"
		        :formatter="col.formatter"
		        :width="col.width?col.width:''">
		      </el-table-column>
					<el-table-column v-else
						:align="col.align?col.align:''"
		        :prop="col.prop"
		        :label="col.label"
		        :fixed="col.fixed"
		        :formatter="col.formatter"
		        :width="col.width?col.width:''">

						<template slot-scope="scope">

							<div class="tool" v-if="col.label=='操作'">
									<el-popover
										placement="right"
										title=""
										width="500"
										trigger="click">
										<el-button type="text" slot="reference">团期选团</el-button>



											<calendar v-model="value" :minDate="new Date('2017-04-04')" :maxDate="new Date('2018-05-20')" :hasInput="false"></calendar>
		  {{ value }}





									</el-popover>

							</div>
						</template>
		      </el-table-column>
		    </el-table>
		</div>
  	</div>
  </div>

	<!--工具条-->
	<div class="page">
		<el-pagination  layout="prev, pager, next" @current-change="currentPageChange"
										:total="pagination.total_count"
										:page-size="pagination.page_size"
										>
		</el-pagination>
	</div>


	<!--锁团提示-->
	<el-dialog
		title="操作提示"
		:visible.sync="dialogVisible"
		size="tiny">
		<span>锁团后将无法对团队进行操作，且只有财务有解锁权限，是否确认锁团？</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="lockGroupFn(0)">取 消</el-button>
			<el-button type="primary" @click="lockGroupFn(1)">确 定</el-button>
		</span>
	</el-dialog>

	<!--计划位修改-->
	<el-dialog
		title="操作提示"
		:visible.sync="planVisible">

		<el-form :inline="true" :model="filters">
			<el-form-item label="计划位">
				<el-input v-model="filters.tuan_no" placeholder="输入计划位数量"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="lockGroupFn(0)">取 消</el-button>
			<el-button type="primary" @click="lockGroupFn(1)">确 定</el-button>
		</span>
	</el-dialog>

</div>
</template>
<script>
	import {getBpmProductList} from 'src/api/api';
	import Calendar from 'src/plugins/Calendar.vue';

	export default {
		data() {
			return {
				value:'',
				dialogVisible:false,
				planVisible:false,
				row:{},
				filters: {
					start_date: '2017-06-01',
					end_date: '',
					big_category_id: '1',
					product_no: '',
					product_owner: ''
				},
				tableList:[],
				pagination:{
					total_count:0,
					total_page: 0,
					page_size:15,
					page_index: 1,
				},
				cols: [
					{prop: 'product_no', label: '产品编号', width:'150',align:'left'},
					{prop: 'product_name', label: '产品名称', width:'250'},
					{prop: 'product_large_type_name', label: '产品类别', width:'120'},
					{prop: 'destination_city', label: '目的地城市', width:'120'},
					{prop: 'departure_city', label: '出发城市', width:'120'},
					{prop: 'tuan_num', label: '已选团队数', width:'180'},
					{prop: 'product_owner', label: '产品负责人', width:'180'},
					{prop: '', label: '操作', width:'130',template:true,fixed:'right',align:'center'}
				]
			}
		},
		components:{
			'calendar':Calendar
		},
		methods: {
			initPageFn(){
				let para = {};
			  para.data = this.filters;
				para.data.page_index = this.pagination.page_index;
				para.data.page_size = this.pagination.page_size;

				getBpmProductList({
          params: para,
          success: (res) => {
            let asyncObj = res.data.data;
            this.tableList = asyncObj.product_list;
            this.pagination.total_count = parseInt(asyncObj.total_count,10);
            this.pagination.total_page = parseInt(asyncObj.total_page,10);
            this.pagination.page_size = parseInt(asyncObj.page_size,10);
            this.pagination.page_index = parseInt(asyncObj.page_index,10);
          },
          showLoading: true
        });
			},
			formatDateChange(val){
				console.log(this.filters.start_date)
			},
			currentPageChange(val) {
				this.pagination.page_index = val;
				this.initPageFn();
			},
			// 计划位修改
			planNumChange(){
				this.planVisible = true;
			},
			// 锁团操作
			lockStatusChange(val){
				if(val === 1){
					this.dialogVisible = true;
				}
			},
			lockGroupFn(val){
				this.dialogVisible = false;
				this.initPageFn();
			},
			// 表格状态切换
			changeTbStatus(scope){
					let para = {};
					para.data = {};
					para.data.status = scope.row.status == '-1'?'1':'-1';
					para.data.id = scope.row.id;
					para.data.type = 'change_status';

					resourceChangeStatus({
            params: para,
            success: (res)=>{
                let judge = parseInt(res.data.res,10);
                this.$notify({
                  title: judge?'成功':'失败',
                  message: res.data.msg,
                  type: judge?'success':'error'
                });
                this.$set(this.tableList[scope.$index],'status',para.data.status);
            },
            showLoading: true
          });
			}
		},
		mounted() {
			this.initPageFn();
		}
	};
</script>

<style scoped lang="scss">
.tool a{display: inline-block; color: #20a0ff;}
.el-switch{margin-top:10px;}
.system-search .search-item .label{width:100px;}
.datepicker-body span{height: 50px;}
</style>
