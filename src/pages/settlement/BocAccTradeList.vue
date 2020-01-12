<template>
	<div  class="wrapper">
		<!-- system-search -->
		<div class="system-search">
      <search-item-date-range v-model="calendarDate" :max="calendarMaxDate" label="交易日期" />
      <!-- <search-item-date-range v-model="calendarDate" label="交易日期" type="sp" /> -->
			<div class="search-item twins">
				<div class="label">交易金额</div>
        <input-number  v-model="searchData.amountscope_from" placeholder="金额下限" :precision="3" />
        <b class="lin">-</b>
        <input-number  v-model="searchData.amountscope_to" placeholder="金额上限" :precision="3" />
			</div>
			<!-- <div class="search-item">
				<div class="label">付款人</div>
				<el-input v-model="searchData.org_name" placeholder="付款人名称"></el-input>
			</div>
			<div class="search-item">
				<div class="label">付款账号</div>
				<el-input v-model="searchData.org_name" placeholder="付款账号名称"></el-input>
			</div> -->
			<!-- <div class="search-item">
				<div class="label">账户</div>
				<el-input v-model="searchData.trnid" placeholder="账户号码"></el-input>
			</div> -->
			<div class="search-item search-button">
				<el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<div class="system-content">
      <ul class="lfilter-box-ul clearfix">
        <li>
          <label>付款人</label>
          <el-input v-model="lfilterData.name" placeholder="输入付款人" />
        </li>
        <li>
          <label>付款账号</label>
          <el-input v-model="lfilterData.id" placeholder="输入付款账号" />
        </li>
        <li>
          <label>查询类型</label>
          <el-select
            v-model="lfilterData.type">
            <el-option label="全部" value="" />
            <el-option label="收款" value="1" />
          </el-select>
        </li>
        <li>
          <label>收款标记</label>
          <el-select
            v-model="lfilterData.gathering">
            <el-option label="全部" value="" />
            <el-option label="已选" value="1" />
            <el-option label="未选" value="2" />
          </el-select>
        </li>
        <li class="btn">
          <el-button type="primary" @click="handleSearch(true)">
            筛选
          </el-button>
        </li>
      </ul>
			<div class="content-list">
				<el-table :data="tableData" border class="el-table--middle fund-settlement-table"  style="width: 100%"	>
					<el-table-column
						label="凭证号码"
            prop="vchnum"
            header-align="center"
						align="center"
						width="150"
            :resizable="false">
					</el-table-column>
          <el-table-column
            label="交易金额"
            header-align="center"
            align="center"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
              {{scope.row.txnamtEdit}}
            </template>
          </el-table-column>
					<el-table-column
						label="付款人"
            prop="fractn.acntname"
            header-align="center"
						align="center"
            width="120"
						:resizable="false">
					</el-table-column>
					<el-table-column
						label="付款银行"
            prop="fractn.ibkname"
            header-align="center"
						align="center"
            min-width="150"
						:resizable="false"
            show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						label="付款账号"
            prop="fractn.actacn"
            header-align="center"
						align="center"
            width="180"
						:resizable="false">
					</el-table-column>
					<el-table-column
						label="业务类型"
            prop="transtype"
            header-align="center"
						align="center"
            width="120"
						:resizable="false">
					</el-table-column>
					<el-table-column
						label="交易时间"
            prop="txndate"
            header-align="center"
						align="center"
            width="140"
						:resizable="false">
					</el-table-column>
					<el-table-column
						label="交易后余额"
            prop="acctbal"
            header-align="center"
						align="center"
            width="120"
						:resizable="false">
					</el-table-column>
					<el-table-column
						label="收款标记"
            header-align="center"
						align="center"
            width="80"
						:resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.is_payment == 0">未收</span>
              <span v-else>已收</span>
            </template>
					</el-table-column>
					<el-table-column
            label="操作"
            align="center"
            width="100"
            fixed="right"
            :resizable="false">
						<template slot-scope="scope">
              <router-link :to="{path:'trade-detail', query: {
                org_id:$route.query.org_id,
                datescope_from:searchDataOrigin.datescope_from,
                datescope_to:searchDataOrigin.datescope_to,
                amountscope_from:searchDataOrigin.amountscope_from,
                amountscope_to:searchDataOrigin.amountscope_to,
                page:searchDataOrigin.page,
                page_size:searchDataOrigin.page_size,
                vchnum:scope.row.vchnum
                }}"
                v-if="$menuPermission('settlement/bocaccount/tradedetail')">
                查看
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
import { bocTransactionList }from 'src/api/finance';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import { formattDate } from 'src/assets/js/common.js';
import InputNumber from 'src/plugins/InputNumber.vue';
export default {
  name: 'settlementBocaccTradeList',
  data () {
    return {
			searchDataOrigin: {
        org_id: this.$route.query.org_id,
        datescope_from: '',
        datescope_to: '',
        amountscope_from: '',
        amountscope_to: '',
        page: 1,
        page_size: 50
			},
			searchData: {
        org_id: this.$route.query.org_id,
        datescope_from: '',
        datescope_to: '',
        amountscope_from: '',
        amountscope_to: '',
        page: 1,
        page_size: 50
      },
      lfilterData:{
        name: '',
        id: '',
        type: '',
        gathering: '',
      },
      calendarDate: ['',''],
      calendarMaxDate: new Date(),
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
  created(){
    let day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    let yesterday = day1.getFullYear() + "-" + this.suppleZero(day1.getMonth()+1) + "-" + this.suppleZero(day1.getDate());
    let day2 = new Date();
    day2.setTime(day2.getTime()-24*60*60*1000*15);
    let yesterday2 = day2.getFullYear() + "-" + this.suppleZero(day2.getMonth()+1) + "-" + this.suppleZero(day2.getDate());
    // this.calendarDate[0] = this.calcSectionDate(yesterday,'-6');
    this.calendarDate[0] = yesterday2;
    this.calendarDate[1] = yesterday;
  },
  computed:{},
  components: {
    SearchItemDateRange,
    InputNumber
  },
  watch:{
    // 'calendarDate':{
    //   handler(e){
    //     this.calendarDate[1] = this.calcSectionDate(e[0],'+6');
    //   },
    //   deep: true
    // },
  },
  methods:{
    suppleZero(val){
      let x = '';
      if(val.toString().length == 1){
        x = '0' + val;
      }else{
        x = val + '';
      }
      return x;
    },
    calcSectionDate(date,rule){
      // console.log(date)
      let dateArr1 = date.split('-'),
        dateArr2 = [];
      for(var i = 0; i < dateArr1.length; i++){
        dateArr1[i] = parseInt(dateArr1[i]);
      }
      switch(rule){
        case '-6':
          // 计算年月
          if(dateArr1[1] < 6){
            dateArr2[1] = dateArr1[1] + (6 + 1);
            dateArr2[0] = dateArr1[0] - 1;
          }else{
            dateArr2[1] = dateArr1[1] - (6 - 1);
            dateArr2[0] = dateArr1[0];
          }
        break;
        case '+6':
          // 计算年月
          if(dateArr1[1] > 6 + 1){
            dateArr2[1] = dateArr1[1] - (6 - 1);
            dateArr2[0] = dateArr1[0] + 1;
          }else{
            dateArr2[1] = dateArr1[1] + 6 - 1;
            dateArr2[0] = dateArr1[0];
          }
        break;
      }
      const ly = this.leapYear(dateArr2[0]);
      // 计算日
      if(dateArr1[2] == 1){
        if(dateArr2[1] == 2){
          dateArr2[2] = ly ? 29 : 28;
        }else if(dateArr2[1] == 4 || dateArr2[1] == 6 || dateArr2[1] == 9 || dateArr2[1] == 11){
          dateArr2[2] = 30;
        }else{
          dateArr2[2] = 31;
        }
      }else{
        dateArr2[2] = dateArr1[2] - 1;
      }
      for(var i = 0; i < dateArr2.length; i++){
        if(dateArr2[i] < 10){
          dateArr2[i] = '0' + dateArr2[i];
        }else{
          dateArr2[i] = dateArr2[i] + '';
        }
      }
      return dateArr2.join('-');
    },
    leapYear(y){
      if((y%4) == 0 && ((y%100) != 0 || (y%400) == 0)){
        return true;
      }else{
        return false;
      }
    },
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchData.datescope_from = this.calendarDate[0];
        this.searchData.datescope_to = this.calendarDate[1];
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchDataOrigin.datescope_from = this.calendarDate[0];
        this.searchDataOrigin.datescope_to = this.calendarDate[1];
        this.searchData = {...this.searchDataOrigin};
      }
      this.$router.replace({query: this.searchData});
      bocTransactionList({
        params:{
          data: this.searchData
        },
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.allData = data;
            this.tableData = data.data;
            this.tableData.forEach(v=>{
              if(v.txnamt.indexOf('-') != -1){
                v.txnamtEdit = v.txnamt;
              }else{
                v.txnamtEdit = '+' + v.txnamt;
              }
            });
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
  .twins{
    width: 250px;
    .el-input{
      width: 90px;
    }
    .lin{
      float: left;
      margin: 0 5px;
      color: #999;
      font-weight: 400;
      line-height: 35px;
    }
  }
.lfilter-box-ul{
  display: none;
  background: #fff;
  border-bottom: 1px solid #dfe6ec;
  padding: 0 10px 10px;
  li{
    float: left;
    margin-top: 10px;
    padding-left: 65px;
    padding-right: 20px;
  }
  label{
    float: left;
    line-height: 35px;
    margin-left: -60px;
    width: 60px;
  }
  .el-select{
    width: 100px;
  }
  .btn{
    margin-top: 12px;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
