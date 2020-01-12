<!--新流水详情-->
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
			<div class="content-list">
      <div class="clearfix btn-wrap">
        <el-button @click="openDialog" class="big-btn" type='primary'>批量生成收款记录</el-button>
        <span class="fl-text">账户：{{trnid}}</span>
      </div>
				<el-table
          ref="multipleTable"
          :data="tableData"
          border
          class="el-table--middle fund-settlement-table"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            :selectable='diabledSel'
            type="selection"
            width="55">
          </el-table-column>
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
            min-width="140"
            :resizable="false">
            <template slot-scope="scope">
              <span class="color-orange">
                {{scope.row.txnamt}}
              </span>
            </template>
          </el-table-column>
					<el-table-column
						label="付款人"
            prop="fractn.acntname"
            header-align="center"
						align="center"
            min-width="120"
						:resizable="false">
					</el-table-column>
					<el-table-column
						label="付款银行"
            prop="fractn.ibkname"
            header-align="center"
						align="center"
            min-width="120"
						:resizable="false">
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
            width="120"
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
					<!-- <el-table-column
						label="收款标记"
            header-align="center"
						align="center"
            width="80"
						:resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.is_payment == 0">未收</span>
              <span v-else>已收</span>
            </template>
					</el-table-column> -->
					<el-table-column
            label="操作"
            align="center"
            width="100"
            fixed="right"
            :resizable="false">
						<template slot-scope="scope">
              <router-link :to="{path:'/settlement/bocacc/trade-detail', query: {
                org_id:$route.query.org_id,
                datescope_from:searchDataOrigin.datescope_from,
                datescope_to:searchDataOrigin.datescope_to,
                amountscope_from:searchDataOrigin.amountscope_from,
                amountscope_to:searchDataOrigin.amountscope_to,
                page:searchDataOrigin.page,
                page_size:searchDataOrigin.page_size,
                vchnum:scope.row.vchnum
                }}">
                查看
              </router-link>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="page" v-show="pageShow">
			<el-pagination
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				:total-page="pagination.totalPage"
        :page-size="pagination.size">
			</el-pagination>
		</div>
    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible">
      <div>
        <el-table
          :data="selData"
          border
          class="el-table--middle fund-settlement-table">
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
            prop="txnamt"
            header-align="center"
            align="center"
            min-width="140"
            :resizable="false">
          </el-table-column>
					<el-table-column
						label="付款人"
            prop="fractn.acntname"
            header-align="center"
						align="center"
            min-width="120"
						:resizable="false">
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
						label="交易时间"
            prop="txndate"
            header-align="center"
						align="center"
            width="120"
						:resizable="false">
					</el-table-column>
          <el-table-column
            fixed='right'
						label="结算方"
            header-align="center"
						align="center"
            width="150"
						:resizable="false">
            <template slot-scope="scope">
              <div>
                <select-org :key="scope.row.vchnum" v-model="scope.row.org" type="1" :default-list="defaultOrgList" placeholder="输入结算方选择"></select-org>
              </div>
            </template>
					</el-table-column>
          <el-table-column
            fixed='right'
						label="操作"
            header-align="center"
						align="center"
            width="120"
						:resizable="false">
            <template slot-scope="scope">
              <div>
                <el-button @click="copyeveryBank(scope.row.org)" type='text'>复制到所有行</el-button>
              </div>
            </template>
					</el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bocTransactionPayment">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
import {getSearchOrg} from 'src/api/api';
import { bocTransactionList, bocTransactionPayment }from 'src/api/finance';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import { formattDate } from 'src/assets/js/common.js';
import InputNumber from 'src/plugins/InputNumber.vue';
import SelectOrg from "src/plugins/SelectOrg.vue";

export default {
  name: 'settlementBocaccTradeList',
  data () {
    return {
			searchDataOrigin: {
        org_id: this.$route.query.org_id,
        datescope_from: this.$route.query.datescope_from || '',
        datescope_to: this.$route.query.datescope_to || '',
        amountscope_from: this.$route.query.amountscope_from || '',
        amountscope_to: this.$route.query.amountscope_to || '',
        page: parseInt(this.$route.query.page) || 1,
        page_size: this.$route.query.page_size || 50
			},
			searchData: {
        // org_id: this.$route.query.org_id,
        // datescope_from: '',
        // datescope_to: '',
        // amountscope_from: '',
        // amountscope_to: '',
        // page: 1,
        // page_size: 50
      },
      calendarDate: ['',''],
      calendarMaxDate: new Date(),
      allData: {},
      tableData: [],
      trnid: '',
      pagination:{
        totalCount: 0,
        totalPage: parseInt(this.$route.query.page) || 1,
        size: 10
      },
      pageShow: false,
      dialogVisible: false,
      selData: [],
      defaultOrgList: []
		}
  },
  created(){
    let datescope_from = this.$route.query.datescope_from
    let datescope_to = this.$route.query.datescope_to

    if (!datescope_from) {
      let day2 = new Date();
      day2.setTime(day2.getTime()-24*60*60*1000*15);
      datescope_from = day2.getFullYear() + '-' + this.suppleZero(day2.getMonth()+1) + '-' + this.suppleZero(day2.getDate());
    }
    if (!datescope_to) {
      let day1 = new Date();
      day1.setTime(day1.getTime()-24*60*60*1000);
      datescope_to = day1.getFullYear() + '-' + this.suppleZero(day1.getMonth()+1) + '-' + this.suppleZero(day1.getDate());
    }
    // this.calendarDate[0] = this.calcSectionDate(datescope_to,'-6');
    this.calendarDate[0] = datescope_from;
    this.calendarDate[1] = datescope_to;
    // 获取默认的结算方列表。
    getSearchOrg({data: {type: 1, name: ''}}).then((params)=>{
      let { code, data, msg } = params['data'];
      let list = [];

      if(!code){
        list = data;
      }else{
        this.$message({message: msg, type:'error'})
      }
      this.defaultOrgList = list;
    });
  },
  computed:{
  },
  components: {
    SearchItemDateRange,
    InputNumber,
    SelectOrg
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
      // this.searchData.datescope_from = "2018-05-09"
      // this.searchData.datescope_to = "2018-10-08"
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
            this.pagination.totalCount = data.total_count;
            this.pagination.totalPage = data.total_page;
            this.pageShow = data.total_page > 1 ? true : false;
            this.trnid = data.trnid
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
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange (val) {
      this.selData = []
      val.forEach((item, index) => {
        // item.org = null
        this.selData.push(item)
      })
    },
    openDialog () {
      if (this.selData && this.selData.length > 0) {
        this.dialogVisible = true
        this.selData.forEach(item => {
          this.$set(item, 'org', null)
        })
      } else {
        this.$message({
          type: 'error',
          message: '请选择凭证'
        })
      }
    },
    copyeveryBank (org) {
      if (!org || !org.org_id) {
        this.$message({
          type: 'error',
          message: '请填写结算方'
        })
      } else {
        this.selData.forEach((item, index) => {
          item.org = {
            org_id: org.org_id,
            org_name: org.org_name
          }
          // this.$set(item.org, 'org_id', org.org_id)
          // this.$set(item.org, 'org_name', org.org_name)
        })
      }
    },
    bocTransactionPayment () {
      let flag = true
      let i = -1
      let arr = []
      this.selData.forEach((item, index) => {
        if ((!item.org || !item.org.org_id) && flag) {
          flag = false
          i = index
          this.$message({
            type: 'error',
            message: `请填写第${i + 1}条数据的结算方`
          })
        } else {
          let obj = {
            vchnum: item.vchnum,
            settlement_org_id: item.org.org_id,
            total_amount: item.txnamt
          }
          arr.push(obj)
        }
      })
      if (!flag) {
        return false
      }
      let params = {
        data: {
          // org_id: '',
          datescope_from: this.searchData.datescope_from,
          datescope_to: this.searchData.datescope_to,
          amountscope_from: '1.00',
          amountscope_to: '99999999.99',
          page: 1,
          page_size: 50,
          vchnum_data: arr
        }
      }
      bocTransactionPayment({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.dialogVisible = false
            this.handleSearch()
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    diabledSel (row, index) {
      return row.is_payment === 0
    }
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
  .btn-wrap {
    padding: 0 0 15px;
  }
  .big-btn {
    float: left;
    width: 140px;
  }
  .fl-text {
    float: left;
    height: 30px;
    line-height: 30px;
    padding: 0 20px 0;
  }
</style>
