<template>
	<div  class="wrapper">
		<!-- system-search -->
		<div class="system-search">
			<div class="search-item">
				<div class="label">名称</div>
				<el-input v-model="searchData.org_name" placeholder="分公司名称"></el-input>
			</div>
			<div class="search-item">
				<div class="label">账户</div>
				<el-input v-model="searchData.trnid" placeholder="账户号码"></el-input>
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
						label="公司名称"
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
            label="账户"
            prop="trnid"
            header-align="center"
            align="center"
            width="180"
            :resizable="false" />
					<el-table-column
						label="余额"
            header-align="center"
						align="right"
            width="150"
						:resizable="false">
						<template slot-scope="scope">
							<span style="color:#FF6000;">{{scope.row.balance}}</span>
						</template>
					</el-table-column>
					<el-table-column
            label="操作"
            align="center"
            width="100"
            fixed="right"
            :resizable="false">
						<template slot-scope="scope">
              <router-link :to="{path:'trade-list', query: {org_id:scope.row.org_id}}"
                v-if="$menuPermission('settlement/bocaccount/tradelist')">
                交易记录
              </router-link>
              <template v-else>
                --
              </template>
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
import { bocBalanceList }from 'src/api/finance'

export default {
  name: 'settlementBocaccBalanceList',
  data () {
    return {
			searchDataOrigin: {
        org_name: '',
        trnid: '',
        page: 1
			},
			searchData: {
        org_name: '',
        trnid: '',
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
      bocBalanceList({
        params: {
          data: this.searchData
        },
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.allData = data;
            this.tableData = data.data;
            this.pagination.totalCount = data.total;
            this.pagination.totalPage = data.last_page;
            this.pageShow = data.last_page > 1 ? true : false;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
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
