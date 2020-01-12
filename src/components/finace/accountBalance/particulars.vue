<template>
	<div  class="wrapper">
		<!-- system-search -->
		<div class="system-search">
      <search-item-date-range v-model="calendarDate" label="开票日期"/>
			<div class="search-item">
				<div class="label">交易单号</div>
				<el-input v-model="searchData.balance_no"></el-input>
			</div>
			<div class="search-item">
				<div class="label">订单号</div>
				<el-input v-model="searchData.order_no" placeholder="商家订单号/提现单号"></el-input>
			</div>
			<div class="search-item">
				<div class="label">交易类型</div>
        <el-select v-model="searchData.balance_type" placeholder="请选择">
          <el-option value='' label='不限' />
          <el-option v-for="(o,i) in allData.balance_type"
            :key="i"
            :label="o"
            :value="i" />
        </el-select>
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<div class="system-content">
      <div class="cont-hd">
        <div class="bar clearfix">
          <template v-if="pageSource == 'my'">
            <span class="btn"
              @click="recharge(true)">在线充值</span>
            <span class="btn btn2"
              @click="extract(true)">提现</span>
          </template>
          <span class="comp-name">
            {{allData.orgination_name}}
          </span>
        </div>
        <div class="bar clearfix">
          <p class="p p1">
            <el-tooltip class="item" effect="dark" content="在平台的虚拟账户的余额" placement="top-start">
              <b>{{roleTxt}}的余额</b>
            </el-tooltip>
            <em>{{allData.fund_balance}}</em>
            元
          </p>
          <p class="l">|</p>
          <p class="p">
            <b>{{roleTxt}}被冻结的金额</b>
            <router-link :to="{path:roleLinkUrl, query:{settlement_org_id:$route.query.settlement_org_id}}">
              (查看明细)
            </router-link >
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
							<p class="ellipsis" :title="scope.row.title">
                {{scope.row.title}}
              </p>
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
          <el-table-column label="商家订单号"
            header-align="center"
            align="center"
            width="170"
            :resizable="false">
            <template slot-scope="scope">
							{{scope.row.order_no}}
            </template>
          </el-table-column>
          <el-table-column label="交易类型"
            header-align="center"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
							{{scope.row.balance_type_name}}
            </template>
          </el-table-column>
          <el-table-column label="收支明细"
            header-align="center"
            align="center"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
              <span :class="scope.row.rmb_total_amount > 0 ? 'z' : ''">
                <template v-if="scope.row.rmb_total_amount > 0">+</template>{{scope.row.rmb_total_amount}}
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
    <el-dialog title="在线充值" :visible.sync="dialogVisibleRecharge" :close-on-click-modal="false">
      <div class="form-content">
        <el-form :model="formRecharge"
          :rules="rulesRecharge"
          ref="refRecharge">
          <el-form-item label="充值金额"
            label-width="100px"
            prop="amount"
            style="margin-right: 30px">
            <el-input v-model="formRecharge.amount"
              placeholder="请输入充值金额"
              auto-complete="off" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="foot-btn">
        <el-button @click="recharge(false)">取 消</el-button>
        <el-button type="primary" @click="recharge('submit')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提现" :visible.sync="dialogVisibleExtract" :close-on-click-modal="false">
      <div class="form-content">
        <el-form :model="formExtract"
          :rules="rulesExtract"
          ref="refExtract">
          <el-form-item label="提现金额"
            label-width="100px"
            prop="amount"
            style="margin-right: 30px">
            <el-input v-model="formExtract.amount"
              placeholder="请输入提现金额"
              auto-complete="off" />
          </el-form-item>
          <p class="extract-txt">
            可提现金额：{{allData.fund_balance}}
          </p>
        </el-form>
      </div>
      <div slot="footer" class="foot-btn">
        <el-button @click="extract(false)">取 消</el-button>
        <el-button type="primary" @click="extract('submit')">确 定</el-button>
      </div>
    </el-dialog>
    <div v-html="payForm" />
	</div>
</template>

<script>
import { myBalanceList, hisBalanceList,rechargeMoney, putForward }from 'src/api/finance'
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'accountBalanceParticulars',
  data () {
    var calcAmount = (rule,value,callback)=>{
      if(value > this.allData.fund_balance){
        return callback(new Error('价格不能大于可提现金额'));
      }else{
        callback();
      }
    };
    return {
      pageSource: null,
      roleTxt: '',
      roleLinkUrl: '',
			searchDataOrigin: {
        settlement_org_id: this.$route.query.settlement_org_id,
        balance_no: '',
        order_no: '',
        balance_type: '',
        create_time_start: '',
        create_time_end: '',
        page: 1
			},
			searchData: {
        settlement_org_id: this.$route.query.settlement_org_id,
        balance_no: '',
        order_no: '',
        balance_type: '',
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
      dialogVisibleExtract: false,
      formExtract:{
        settlement_org_id: '',
        amount: ''
      },
      rulesExtract:{
        amount:[{
          required: true,
          message: '请填写提现金额',
          trigger: 'blur'
        },{
          required: true,
          validator: calcAmount,
          trigger: 'blur'
        }]
      },
      dialogVisibleRecharge: false,
      formRecharge:{
        recharge_org_id: '',
        amount: ''
      },
      rulesRecharge:{
        amount:[{
          required: true,
          message: '请填写充值金额',
          trigger: 'blur'
        }]
      },
      payForm: ''
		}
  },
  computed:{},
  components: {
    SearchItemDateRange
  },
  created(){
    if(this.$route.name == 'account-balance-particulars-my'){
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
      if(this.pageSource == 'my'){
        this.roleTxt = '我';
        this.roleLinkUrl = '/finace/balance-freeze-my';
      }else{
        this.roleTxt = '他';
        this.roleLinkUrl = '/finace/balance-freeze-oth';
      }
      let params = {
        data: this.searchData
      }
      let api = this.pageSource == 'my' ? myBalanceList : hisBalanceList;
      api({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.allData = data;
            this.tableData = data.list;
            this.formExtract.settlement_org_id = this.allData.settlement_org_id;
            this.formRecharge.recharge_org_id = this.allData.settlement_org_id;
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
    recharge(status){
      if(status){
        this.dialogVisibleRecharge = true;
        if(status === 'submit'){
          this.$refs['refRecharge'].validate(valid => {
            if (valid) {
              let params = {
                data: this.formRecharge
              };
              rechargeMoney({
                params,
                success: res => {
                  let { code, data, msg } = res.data;
                  if(code == 0){
                    this.payForm = data.form;
                    this.$message.success('请在新窗口完成充值');
                    this.$nextTick(() => {
                      let form = document.getElementById('ykpaysubmit');
                      form.setAttribute('target', '_blank');
                      form.submit();
                    })
                    this.dialogVisibleRecharge = false;
                    this.$refs['refRecharge'].resetFields();
                  }else{
                    this.$message.error(msg);
                  }
                }
              });
            }
          });
        }
      }else{
        this.dialogVisibleRecharge = false;
        this.$refs['refRecharge'].resetFields();
      }
    },
    extract(status){
      if(status){
        this.dialogVisibleExtract = true;
        if(status === 'submit'){
          this.$refs['refExtract'].validate(valid => {
            if (valid) {
              let params = {
                data: this.formExtract
              };
              putForward({
                params,
                success: res => {
                  let { code, data, msg } = res.data;
                  if(code == 0){
                    this.$message.success('提现申请已提交，请等待审批！');
                    this.handleSearch();
                    this.dialogVisibleExtract = false;
                    this.$refs['refExtract'].resetFields();
                  }else{
                    this.$message.error(msg);
                  }
                }
              });
            }
          });
        }
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
