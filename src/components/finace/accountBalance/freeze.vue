<template>
	<div  class="wrapper">
		<!-- system-search -->
		<div class="system-search">
      <search-item-date-range v-model="calendarDate" label="交易时间"/>
			<div class="search-item">
				<div class="label">交易单号</div>
				<el-input v-model="searchData.balance_no"></el-input>
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<div class="system-content">
      <div class="cont-hd">
        <div class="bar clearfix">
          <span class="comp-name">
            {{allData.settlement_org_name}}
          </span>
        </div>
        <div class="bar clearfix">
          <p class="p">
            <b>{{roleTxt}}</b>
            <em>{{allData.put_rorward_ing}}</em>
            元
          </p>
        </div>
      </div>
			<div class="content-list">
				<el-table :data="tableData" border class="el-table--middle"  style="width: 100%"	>
          <el-table-column type="index" label="序号" width="50" align="center" />
					<el-table-column label="明细"
            header-align="center"
						min-width="150"
            :resizable="false">
						<template slot-scope="scope">
              提现申请审批中
						</template>
					</el-table-column>
					<el-table-column label="交易时间"
            header-align="center"
						align="center"
            width="150"
						:resizable="false">
						<template slot-scope="scope">
							{{scope.row.create_time}}
						</template>
					</el-table-column>
          <el-table-column label="交易单号"
            header-align="center"
            align="center"
            width="170"
            :resizable="false">
            <template slot-scope="scope">
							{{scope.row.balance_no}}
            </template>
          </el-table-column>
          <el-table-column label="交易类型"
            header-align="center"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
							支出-提现中
            </template>
          </el-table-column>
          <el-table-column label="收支明细"
            header-align="center"
            align="center"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
              <span :class="scope.row.amount > 0 ? 'z' : ''">
                <template v-if="scope.row.amount > 0">+</template>{{scope.row.amount}}
              </span>
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
import { myFreezeList, hisFreezeList }from 'src/api/finance'
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'accountBalanceFreeze',
  data () {
    return {
      pageSource: null,
      roleTxt: '',
			searchDataOrigin: {
        settlement_org_id: this.$route.query.settlement_org_id,
        balance_no: '',
        create_time_start: '',
        create_time_end: '',
        page: 1
			},
			searchData: {
        settlement_org_id: this.$route.query.settlement_org_id,
        balance_no: '',
        create_time_start: '',
        create_time_end: '',
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
  created(){
    if(this.$route.name == 'account-balance-freeze-my'){
      this.pageSource = 'my';
    }else{
      this.pageSource = 'other';
    }
  },
  methods:{
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchData.settlement_org_id = this.$route.query.settlement_org_id;
        this.searchData.create_time_start = this.calendarDate[0];
        this.searchData.create_time_end = this.calendarDate[1];
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchDataOrigin.settlement_org_id = this.$route.query.settlement_org_id;
        this.searchData = {...this.searchDataOrigin};
        this.calendarDate = [this.searchData.create_time_start, this.searchData.create_time_end];
      }
      this.$router.replace({query: this.searchData});
      this.roleTxt = this.pageSource == 'my' ? '我被冻结金额' : '他的冻结金额';
      let params = {
        data: this.searchData
      }
      let api = this.pageSource == 'my' ? myFreezeList : hisFreezeList;
      api({
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
        }
      });
    },
    handleCurrentChange(val){
        this.searchDataOrigin.page = val;
        this.handleSearch();
    },
    extract(type){
      if(type == 'open'){
        this.dialogVisibleExtract = true;
      }else{
        this.dialogVisibleExtract = false;
        this.$refs['refExtract'].resetFields();
      }
    },
  },
  mounted(){
    this.handleSearch();
  }
}
</script>

<style lang="scss" scoped>
  .cont-hd{
    background: #f6f6f6;
    .bar{
      border-bottom: 1px solid #ccc;
      padding: 10px 15px;
    }
    .comp-name{
      float: left;
      line-height: 32px;
      font-size: 16px;
    }
    .btn{
      float: right;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #fff;
      border: 1px solid #ccc;
      color: #b10c79;
      border-radius: 4px;
      margin-left: 10px;
      cursor: pointer;
      &:hover{
        opacity: .8;
      }
    }
    .btn2{
      background: #b10c79;
      border-color: #b10c79;
      color: #fff;
    }
    .p{
      float: left;
      color: #ccc;
      b{
        font-weight: 400;
        color: #555;
      }
      em{
        font-style: normal;
        font-size: 20px;
        margin: 0 5px;
        color: #f60;
      }
    }
    .l{
      float: left;
      color: #aaa;
      margin: 6px 30px 0;
    }
  }
  .z{
    color: #f60;
  }
  .extract-txt{
    margin-left: 20px;
    color: #999;
  }
</style>
