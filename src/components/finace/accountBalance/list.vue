<template>
	<div  class="wrapper">
		<div class="system-tab">
			<ul class="tab-box">
				<li class="on">账户余额</li>
			</ul>
		</div>
		<!-- system-search -->
		<div class="system-search">
			<div class="search-item">
				<div class="label">名称</div>
				<el-input v-model="searchData.keyword" placeholder="供应商/代理商名称"></el-input>
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<div class="system-content">
			<div class="content-list">
				<el-table :data="tableData" border class="el-table--middle fund-settlement-table"  style="width: 100%"	>
					<el-table-column
						label="供应商/代理商名称"
            header-align="center"
						align="center"
						min-width="150"
            :resizable="false">
						<template slot-scope="scope">
							<p class="ellipsis" :title="scope.row.org_name">
                {{scope.row.org_name}}
              </p>
						</template>
					</el-table-column>
					<el-table-column
						label="我的余额"
            header-align="center"
						align="right"
            width="120"
						:resizable="false">
						<template slot-scope="scope">
							<span v-if="scope.row.fund_balance === ''" >--</span>
							<span v-else style="color:#FF6000;">{{scope.row.fund_balance}}</span>
						</template>
					</el-table-column>
          <el-table-column
            label="我的授信额度"
            header-align="center"
            align="right"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
              <span style="color:#FF6000;">{{scope.row.credit_line}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="我的可下单金额"
            header-align="center"
            align="right"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
              <span style="color:#FF6000;">{{scope.row.purchase_amount}}</span>
            </template>
          </el-table-column>
					<el-table-column label="操作" align="center" width="100"  fixed="right" :resizable="false">
						<template slot-scope="scope">
							<el-dropdown v-if="$menuPermission('api/finance/my_balance_list') && scope.row.org_id" trigger="click">
								<span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-if="$menuPermission('api/finance/my_balance_list')">
										<router-link :to="{path:'/finace/balance-particulars-my', query: {settlement_org_id:scope.row.org_id}}">
                      余额明细
                    </router-link>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<div v-else-if="scope.row.settlement_org_id">--</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="page" v-show="pageShow">
			<el-pagination
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				:total="pagination.totalCount"
        :page-size="pagination.size">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { orgBalanceList }from 'src/api/finance'

export default {
  name: 'accountBalanceList',
  data () {
    return {
			searchDataOrigin: {
        keyword: '',
        page: 1
			},
			searchData: {
        keyword: '',
        page: 1
      },
      allData: {},
      tableData: [],
      pagination:{
        totalCount: 0,
        totalPage: 0,
        size: 10
      },
			pageShow: false,
		}
  },
  computed:{},
  components: {},
  methods:{
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }
      orgBalanceList({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.allData = data;
            if(data.list.length > 0){
              const total = {
                settlement_org_name: '合计',
                fund_balance: data.all_fund_balance,
                credit_line: data.all_credit_line,
                purchase_amount: data.all_purchase_amount,
              }
              this.tableData = [total].concat(data.list);
            }else{
              this.tableData = data.list;
            }
            this.pagination.totalCount = data.total_count;
            this.pagination.totalPage = data.total_page;
            this.pageShow = data.total_page > 1 ? true : false;
          }else{
            this.$message.error(msg);
          }
        }
      });
    },
    handleCurrentChange(val){
        this.searchDataOrigin.page = val;
        this.handleSearch();
    },
  },
  mounted(){
    this.handleSearch();
  }
}
</script>

<style lang="scss">
	.fund-settlement-table .el-table__row:first-child{
		font-weight: bold;
	}
</style>
<style lang="scss" scoped>
  .configureForm-content {
    .el-form {
      .el-input {
        width: 80%;
      }
      .el-form-item {
        margin-bottom: 15px;
      }
    }


    .formTip {
      color: #999;
      padding-left: 38px;
      line-height: 1.5;
      &>div {
        display: inline-block;
      }
    }
  }

  .tip {
    color: #999;
    margin-top: 15px;
  }
  .max-w250 {
    max-width: 250px;
  }
</style>
