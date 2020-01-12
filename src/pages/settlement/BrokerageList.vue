<!--D:\files\repo\bom\application\index\view\dev\src\components\finace\servicecharge.vue-->
<template>
	<div  class="wrapper">
    <div class="hd-info">
      本公司手续费支出总计：<b>{{allData.brokerage_total}}</b>
    </div>
		<!-- system-search -->
		<div class="system-search">
      <search-item-date-range v-model="calendarDate" label="交易时间"/>
			<div class="search-item">
				<div class="label">交易单号</div>
				<el-input v-model="searchData.trade_no" />
			</div>
			<div class="search-item">
				<div class="label">订单号</div>
				<el-input v-model="searchData.req_org_order_no" placeholder="商家订单号" />
			</div>
			<div class="search-item">
				<div class="label">付款单位</div>
				<el-input v-model="searchData.distributor_org_name" />
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<div class="system-content">
			<div class="content-list">
				<el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
					<el-table-column label="交易日期"
            header-align="center"
						align="center"
						width="155"
            :resizable="false">
						<template slot-scope="scope">
              {{scope.row.trade_time}}
						</template>
					</el-table-column>
					<el-table-column
						label="交易单号"
            header-align="center"
						align="center"
            width="180"
						:resizable="false">
						<template slot-scope="scope">
              {{scope.row.trade_no}}
						</template>
					</el-table-column>
          <el-table-column
            label="商家订单号"
            header-align="center"
            align="center"
            width="190"
            :resizable="false">
            <template slot-scope="scope">
              {{scope.row.req_org_order_no}}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="订单归属"
            header-align="center"
            min-width="180"
            :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.org_name">
                {{scope.row.org_name || '-'}}
              </div>
            </template>
          </el-table-column> -->
          <el-table-column
            label="付款单位"
            header-align="center"
            min-width="180"
            :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.distributor_org_name">
                {{scope.row.distributor_org_name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="金额"
            header-align="center"
            align="right"
            width="100"
            :resizable="false">
            <template slot-scope="scope">
              <span class="col-orange">{{scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="手续费"
            header-align="center"
            align="right"
            width="80"
            :resizable="false">
            <template slot-scope="scope">
              {{scope.row.brokerage}}
            </template>
          </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="page" v-show="pageShow">
			<el-pagination
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
				:total="pagination.totalCount"
        :page-size="pagination.size">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { getBrokeageList }from 'src/api/pay';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'financeServiceCharge',
  data () {
    return {
			searchDataOrigin: {
        start_time: '',
        end_time: '',
        trade_no: '',
        req_org_order_no: '',
        distributor_org_name: '',
        page: 1
			},
			searchData: {
        start_time: '',
        end_time: '',
        trade_no: '',
        req_org_order_no: '',
        distributor_org_name: '',
        page: 1
      },
      calendarDate: ['',''],
      allData: {},
      tableData: [],
      pagination:{
        currentPage: 1,
        totalCount: 0,
        totalPage: 0,
        size: 10
      },
			pageShow: false,
		}
  },
  computed:{},
  components: {
    SearchItemDateRange
  },
  methods:{
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchData.start_time = this.calendarDate[0];
        this.searchData.end_time = this.calendarDate[1];
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
        this.calendarDate = [this.searchData.start_time, this.searchData.end_time];
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }
      getBrokeageList({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.allData = data;
            this.tableData = data.data;
            this.pagination.currentPage = data.page_index;
            this.pagination.totalCount = data.total_count;
            this.pagination.totalPage = data.total_page;
            this.pageShow = data.total_page > 1 ? true : false;
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

<style lang="scss">
	.fund-settlement-table .el-table__row:first-child{
		font-weight: bold;
	}
</style>
<style lang="scss" scoped>
.hd-info{
  height: 39px;
  line-height: 41px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  padding: 0 15px;
  font-size: 15px;
  color: #666;
  overflow: hidden;
  b{
    font-weight: 400;
    color: #f60;
  }
}
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
  .col-green{
    color: #019f3d;
  }
  .col-orange{
    color: #f60;
  }
</style>
