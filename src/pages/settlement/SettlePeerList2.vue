<!--D:\files\repo\bom\application\index\view\dev\src\components\finace\balance\fund-settlement.vue-->
<template>
	<div  class="wrapper">
		<div class="system-tab">
			<ul class="tab-box">
				<li class="on">同行结算</li>
        <li v-if="$menuPermission('settlement/fundsett/guest')" @click="goto('guest-list',{})">直客结算</li>
        <li v-if="$menuPermission('settlement/fundsett/accbalan')" @click="goto('accbalan-list',{})">账户余额</li>
			</ul>
		</div>
		<!-- system-search -->
		<div class="system-search">
			<div class="search-item">
				<div class="label">名称</div>
				<el-input v-model="searchData.keyword" placeholder="供应商/代理商名称"></el-input>
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="getFinaceBalance(true)">立即搜索</el-button>
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
            :resizable="false"
					>
						<template slot-scope="scope">
							<p class="ellipsis" :title="scope.row.settlement_org_name">{{scope.row.settlement_org_name}}</p>
						</template>
					</el-table-column>
					<el-table-column
						label="他的余额"
            header-align="center"
						align="right"
            width="120"
						:resizable="false"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.fund_balance === ''" >--</span>
							<span v-else style="color:#FF6000;">{{scope.row.fund_balance}}</span>
						</template>
					</el-table-column>
          <el-table-column
            label="他的授信额度"
            header-align="center"
            align="right"
            width="140"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span style="color:#FF6000;">{{scope.row.credit_line}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="他的可下单金额"
            header-align="center"
            align="right"
            width="140"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span style="color:#FF6000;">{{scope.row.purchase_amount}}</span>
            </template>
          </el-table-column>
					<el-table-column
						label="未付款"
            header-align="center"
						align="right"
						width="140"
						:resizable="false"
						>
						<template slot-scope="scope">
							<span style="color:#FF6000;">{{scope.row.remain_fu}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="未收款"
            header-align="center"
						align="right"
						width="140"
						:resizable="false"
						>
						<template slot-scope="scope">
								<span style="color:#019F3D;">{{scope.row.remain_shou}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="待开发票"
            header-align="center"
						align="right"
						width="140"
						:resizable="false"
						>
						<template slot-scope="scope">
							<span style="color:#019F3D;">{{scope.row.not_receipt_invoice_amount}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="待成本回票"
            header-align="center"
						align="right"
						width="140"
						:resizable="false"
						>
						<template slot-scope="scope">
							<span style="color:#019F3D;">{{scope.row.not_pay_invoice_amount}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="100"  fixed="right" :resizable="false">
						<template slot-scope="scope">
							<el-dropdown v-if="$menuPermission('api/finance/do_add_credit_line,api/finance/receipt_list,api/finance/his_balance_list,api/finance/payment_list,api/invoice/tonghang_settle_income,api/invoice/tonghang_settle_cost') && scope.row.settlement_org_id" trigger="click">
								<span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
								<el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="$menuPermission('settlement/fundsett/peer/greditconf')">
                    <a href="javascript:;" @click="editConfigure(scope)">授信配置</a>
                  </el-dropdown-item>
									<el-dropdown-item v-if="$menuPermission('api/finance/receipt_list')">
										<router-link :to="{path:'/fund-settlement/recieve-record', query: {id:scope.row.settlement_org_id}}">收款记录</router-link>
									</el-dropdown-item>
									<el-dropdown-item v-if="$menuPermission('api/finance/his_balance_list')">
										<router-link :to="{path: '/finace/balance-particulars-oth', query: {settlement_org_id:scope.row.settlement_org_id}}">余额明细</router-link>
									</el-dropdown-item>
									<!-- <el-dropdown-item v-if="$menuPermission('api/finance/get_balance_detail_list')">
										<router-link :to="{path: '/deal-list', query: {id:scope.row.settlement_org_id}}">交易记录</router-link>
									</el-dropdown-item> -->
									<el-dropdown-item v-if="$menuPermission('api/finance/payment_list')">
										<router-link :to="{path: '/fund-settlement/pay-record', query: {id:scope.row.settlement_org_id}}">付款记录</router-link>
									</el-dropdown-item>
									<el-dropdown-item v-if="$menuPermission('api/invoice/tonghang_settle_income')">
										<router-link :to="{path: '/fund-settlement/invoice-income', query: {id:scope.row.settlement_org_id}}">收入发票</router-link>
									</el-dropdown-item>
									<el-dropdown-item v-if="$menuPermission('api/invoice/tonghang_settle_cost')">
										<router-link :to="{path: '/fund-settlement/invoice-cost', query: {id:scope.row.settlement_org_id}}">成本回票</router-link>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<div v-else-if="scope.row.settlement_org_id">--</div>
						</template>
					</el-table-column>
				</el-table>
        <div class="tip">
          备注：可下单金额=授信额度+余额-未收款
        </div>
			</div>
		</div>
		<div class="page" v-show="pageShow">
			<el-pagination
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				:page-count="totalPage">
			</el-pagination>
		</div>
    <!--授信配置-->
    <el-dialog title="授信配置" :visible.sync="dialogVisible" size="tiny">
      <div class="form-content configureForm-content">
        <el-form :model="configureForm" :rules="rules" label-width="110px" ref="configureForm">
          <el-form-item label="授信额度" prop="credit_line" auto-complete="off">
             <input-number  v-model="configureForm.credit_line" :precision="0" :min="0" class="max-w250"/>
          </el-form-item>
          <div class="formTip clearfix">
            <div class="tipLeft">可下单金额=授信额度+余额-未收款 = </div>
            <div class="tipRight"> {{placeOrder}}</div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('configureForm')">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
import {financeBalance,getCreditConfigure,setCreditConfigure}from 'src/api/api'
import InputNumber from 'src/plugins/InputNumber'
import { toFixed } from 'src/utils/format';

export default {
  name: 'FundSettlement',
  data () {
    return {
			orgtype: localStorage.getItem('orgtype'),
      totalPage: 1,
      currentPage:1,
      page:1,
			pageShow:true,
			searchDataOrigin: {
				keyword: this.$route.query.keyword
			},
			searchData: {
					keyword: ""
			},
			// all_fu_total:0,
			// all_shou_total:0,
			tableData: [
			],
      dialogVisible:false, //授信配置
      configureForm: {
			  org_id:0,
        credit_line:0,
        fund_balance:0,
        rmb_unreceipted_amount:0
      },
      rules :{
        credit_line: [
          { required: true, message: '额度不能为空'}
        ]
      }
		}
  },
  computed:{
    placeOrder() {
      let value = Number(this.configureForm.credit_line) +this.configureForm.fund_balance-this.configureForm.rmb_unreceipted_amount;

      return value ? Number(toFixed(value, 3)) : 0;
    }
  },
  components: {
    InputNumber
  },
  methods:{
      handleCurrentChange(val){
          this.page=val;
          this.getFinaceBalance();
      },
      goto(path,query){
          this.$router.push({
              path:path,
              query:query
          });
      },
      getFinaceBalance(bool){
          if (bool) {
            this.totalPage=1;
            this.currentPage= 1;
        this.page=1;
        this.searchDataOrigin.keyword = this.searchData.keyword || '';
          }else{
        this.searchData.keyword = this.searchDataOrigin.keyword;
      }
  		let params={
  			data: {
			    keyword: this.searchData.keyword,
			    page:this.page,
			    page_size:10
			  }
  		};
  		financeBalance({
          params:params,
          success:(params) => {
          let data=params.data;
            if(data.code=='0'){
              // this.all_fu_total=data.data.all_fu_total;
							// this.all_shou_total=data.data.all_shou_total;
							const total = {
								settlement_org_name: '合计',
								fund_balance: '',
                credit_line: data.data.all_credit_line,
                purchase_amount: data.data.all_purchase_amount,
								remain_fu: data.data.all_remain_pay_total,
								remain_shou: data.data.all_remain_receipt_total,
								not_receipt_invoice_amount: data.data.all_not_receipt_invoice_total,
								not_pay_invoice_amount: data.data.all_not_pay_invoice_total
							};
              this.tableData=[total].concat(data.data.list);
              this.totalPage=data.data.total_page;
              this.currentPage=data.data.page_index;
            }else{
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      },
      editConfigure(scope) {

        let orgId = scope.row.settlement_org_id,
            form = this.$refs['configureForm'],
            params = {
              data: {
                "settlement_org_id": orgId
              }
            };

        if(form) {
          form.resetFields();
        }
        getCreditConfigure({
          params:params,
          success:(params) => {
            let data = params.data;

            if(data.code == '0') {
              this.configureForm.org_id=orgId,
              this.configureForm.credit_line=data.data.credit_line,
              this.configureForm.fund_balance=data.data.fund_balance,
              this.configureForm.rmb_unreceipted_amount=data.data.rmb_unreceipted_amount
            } else {
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });

        this.dialogVisible = true;
      },
      submitForm(formName) {

        let params = {
          data: {
            "settlement_org_id": this.configureForm.org_id,
            "credit_line": this.configureForm.credit_line
          }
        };

        this.$refs[formName].validate((valid) => {
          if (valid) {
            setCreditConfigure({
              params:params,
              success:(params) => {
                let data = params.data;

                if(data.code == '0') {
                  this.$message.success(data.msg);
                  this.dialogVisible = false;
                  this.getFinaceBalance();

                } else {
                  this.$message.error(data.msg);
                }
              },
              showLoading: true
            })
          } else {
            return false;
          }
        });
      }
  },
  mounted(){
      this.getFinaceBalance();
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
