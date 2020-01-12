<template>
  <div class="system-content">
    <div class="system-tab">
			<ul class="tab-box">
				<li class="on">收款记录</li>
        <li v-if="$menuPermission('api/finance/all_renkuan_list')" @click="goto('/settlement/recpay/renkuanList',{})">认款记录</li>
			</ul>
      <div class="right">
        <router-link :to="{path: '/settlement/recpay/bankRunWater'}">
          <el-button type="primary">+ 选入银行流水</el-button>
        </router-link>
        <router-link :to="{path: '/settlement/recpay/receive-edit',query:{action: 1}}">
          <el-button type="primary">+ 登记收款</el-button>
        </router-link>
      </div>
		</div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="createTime" label="创建日期" @change="handleChangeCreateTime"/>
      <search-item-date-range v-model="paymentDate" label="收款日期" @change="handleChangePaymentDate"/>
      <div class="search-item">
        <div class="label">收款ID</div>
        <el-input v-model="searchInput.payment_id" type="number" placeholder="收款ID"/>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">收款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option label="待审批" value="1"/>
          <el-option label="审批通过" value="2"/>
          <el-option label="审批不通过" value="3"/>
          <el-option label="已撤销" value="4"/>
          <el-option label="已作废" value="5"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchInput.balance_status" placeholder="全部">
          <el-option label="全部" value="0"/>
          <el-option label="未认清" value="1"/>
          <el-option label="已认清" value="2"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">未认金额</div>
        <el-input v-model="searchInput.fund_balance" type="number" placeholder="未认金额"/>
      </div>
      <div class="search-item">
        <div class="label">收款金额</div>
        <el-input v-model="searchInput.rmb_total_amount" type="number" placeholder="收款金额"/>
      </div>
      <div class="search-item">
        <div class="label">结算方</div>
        <el-input v-model="searchInput.settlement_org_name" placeholder="结算方"/>
      </div>
      <div class="search-item">
        <div class="label">登记/选入</div>
        <el-select v-model="searchInput.source" placeholder="全部">
          <el-option label="全部" value="0"/>
          <el-option label="登记" value="1"/>
          <el-option label="选入" value="2"/>
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="content-list">
      <el-table
        :data="tableData"
          style="width: 100%"
          class="el-table--middle"
          border>
        <el-table-column
          label="收款ID"
          align="center"
          width="100">
          <template slot-scope="scope">
            <span class="color-orange" v-if="scope.row.source == 1">
              [登记]
            </span>
            <span class="color-orange" v-else-if="scope.row.source == 2">
              [选入]
            </span>
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column
          label="结算方"
          prop="settlement_org_name"
          header-align="center"
          align="center"
          width="140"
          :show-overflow-tooltip="true"/>
        <el-table-column
          label="收款金额"
          header-align="center"
          align="right"
          width="100">
          <template slot-scope="scope">
            <span class="color-orange">
              {{scope.row.rmb_total_amount}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="renkuan_total_amount"
          label="已认金额"
          header-align="center"
          align="right"
          width="100" />
        <el-table-column
          label="未认金额"
          header-align="center"
          align="right"
          width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.payment_status==2">{{ scope.row.fund_balance }}</template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column
          label="认款状态"
          prop="balance_status"
          header-align="center"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作人"
          header-align="center"
          align="center"
          min-width="80">
          <template slot-scope="scope">
            <p class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="payment_date"
          label="收款日期"
          header-align="center"
          align="center"
          width="100" />
        <el-table-column label="收款状态"
          align="center"
          width="100">
          <template slot-scope="scope">
            <span :class="scope.row.payment_status | getStatusColor">
              {{scope.row.payment_status_str}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100"
          fixed="right">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(o,i) in scope.row.edit"
                  :key="i">
                  <!-- 1 查看收款 -->
                  <router-link :to="{path:'receive-detail',query:{id:scope.row.id}}"
                    v-if="o == 1">
                    {{allData.edit_arr[o]}}
                  </router-link>
                  <!-- 2 撤销收款 -->
                  <!-- 3 重新发起 -->
                  <!-- 4 作废收款 -->
                  <p @click="handleOper(1,o,scope.row)"
                    v-if="o == 2 || o == 3 || o == 4">
                    {{allData.edit_arr[o]}}
                  </p>
                  <!-- 8 认款 -->
                  <router-link :to="{path:'renkuan-add',query:{id:'',pay_id:scope.row.id}}"
                    v-if="o == 8">
                    {{allData.edit_arr[o]}}
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template> 
        </el-table-column>
      </el-table>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog :title="oper.title + '收款'" :visible.sync="dialogOperVisible">
      <el-form 
        :model="cancelForm.data"
        :rules="cancelForm.rules"
        ref="cancelForm"
        label-width='100px'>
        <el-form-item :label="oper.title + '说明'" required prop="info">
          <el-input type="textarea" v-model="cancelForm.data.info" auto-complete="off"/>
        </el-form-item>
        <span v-if="oper.title != '撤销'" class="color-red">注：{{ oper.title }}收款记录后将无法恢复</span>
      </el-form>
      <div slot="footer">
        <el-button @click="handleOper(0)">取 消</el-button>
        <el-button type="primary" @click="handleOper(2)" :disabled="btn_disable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  salePaymentCancel as zhikeSalePaymentCancel,
  paymentCancel as zhikePaymentCancel,
  saleReissueReceipt as zhikeSaleReissueReceipt,
  reissueReceipt as zhikeReissueReceipt,
  paymentScrap as zhikePaymentScrap
} from 'src/api/zhike'
import {
  allReceiptList,
  reissueReceipt,
  paymentScrapReceipt
} from 'src/api/finance'
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  components: {
    SearchItemDateRange,
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 3: 
      case 5: 
        return 'color-red';
      case 2: 
        return 'color-green';
      case 1:
      case 4:
        return 'color-gray';
      default:
        return '';
      }
    }
  },
  data() {
    const {query} = this.$route;
    return {
      topMenuConst: '',
      btn_disable:false,
      formLabelWidth:'80px',
      searchInput:{ },
      searchData:{
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        payment_date_start: query.payment_date_start || '',
        payment_date_end: query.payment_date_end || '',
        payment_status: query.payment_status || '',
        user_name: query.user_name ||  '',
        payment_id: query.payment_id ||  '',
        rmb_total_amount: query.rmb_total_amount ||  '',
        settlement_org_name: query.settlement_org_name || '',
        fund_balance: query.fund_balance ||  '',
        balance_status: query.balance_status || '0',
        source: query.source || '0',
        page: parseInt(query.page) ||  1
      },
      createTime: [query.create_time_start, query.create_time_end],
      paymentDate: [query.payment_date_start, query.payment_date_end],
      totalPage: parseInt(query.page) ||  1,
      currentPage: 1,
      pageShow: true,
      allData: {},
      tableData: [],
      isZhike: false,
      dialogOperVisible: false,
      oper:{
        seq: 0,
        title: ''
      },
      dialogData: '',
      cancelForm: {
        data: {
          payment_id: '',
          info: ''
        },
        rules: {info: [{required: true, message: '说明不能为空'}]}
      }
    }
  },
  created(){
    this.topMenuConst = this.$route.meta.topMenuConst;
  },
  computed:{
    reissueReceiveFunc(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.isZhike ? zhikeSaleReissueReceipt : saleReissueReceipt;
      case 'operator':
        return jidiaoReissueReceipt;
      case 'finance':
        return this.dialogData.settlement_org_id ? zhikeReissueReceipt : reissueReceipt;
      }
    },
    scrapReceiveFunc(){
      return this.dialogData.settlement_org_id ? zhikePaymentScrap : paymentScrapReceipt;
    },
    cancelReceiveFunc(){
      switch(this.topMenuConst){
      case 'finance':
        return this.dialogData.settlement_org_id ? zhikePaymentCancel : paymentCancel;
      }
    },
  },
  mounted() {
    this.getPaidList();
  },
  methods: {
    goto(path,query){
      this.$router.push({
          path:path,
          query:query
      });
    },
    handleChangeCreateTime(date) {
      this.searchInput.create_time_start = date[0] || '';
      this.searchInput.create_time_end = date[1] || '';
    },
    handleChangePaymentDate(date) {
      this.searchInput.payment_date_start = date[0] || '';
      this.searchInput.payment_date_end = date[1] || '';
    },
    handleSearch(){
      this.getPaidList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.paymentDate = [this.searchData.payment_date_start, this.searchData.payment_date_end];
        this.getPaidList();
        this.$router.replace({query: this.searchData});
      }
    },
    goto(path, query) {
      this.$router.push({
        path: path,
        query: query
      });
    },
    getPaidList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      allReceiptList({
        params: {data: this.searchData},
        success: (params) => {
          const {code, data, msg} = params.data || {};
          this.loading = false;
          if (code == '0') {
            this.allData = data;
            this.tableData = data.list;
            this.totalPage = data.total_page;
            this.pageShow = data.total_page > 0;
            this.searchData.page = data.page_index;
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleOper(status,sequence,row){
      if(status == 1){
        // 打开
        this.dialogOperVisible = true;
        this.oper.seq = sequence;
        switch(sequence){
          case 2:
            this.oper.title = '撤销';
            this.dialogData = row;
            if(this.$refs.cancelForm){
              this.$refs.cancelForm.resetFields();
            }
            this.cancelForm.data.payment_id = row.id;
            break;
          case 3:
            this.dialogOperVisible = false;
            this.$confirm(
              '确认重新发起收款？',
              '重新发起',
              {type: 'warning'}
            ).then(() =>{
              this.reissueReceiveFunc({
                params: {data: {id: row.id}},
                success: ({data}) => {
                  if (data.code == '0') {
                    this.$message.success(data.msg);
                    this.$emit('success', '重新发起');
                    this.getPaidList();
                  } else {
                    this.$message.error(data.msg);
                  }
                },
                showLoading: true
              });
            }).catch((e)=>{
              console.log('取消', e)
            });
            // this.oper.title = '重新发起';
            break;
          case 4:
            this.oper.title = '作废';
            this.dialogData = row;
            if(this.$refs.cancelForm){
              this.$refs.cancelForm.resetFields();
            }
            this.cancelForm.data.payment_id = row.id;
            break;
        }
      }else if(status == 0){
        // 关闭
        this.dialogOperVisible = false;
      }else if(status == 2){
        // 提交
        if(this.$refs.cancelForm && this.oper.seq == 2 || this.oper.seq == 4) {
          const func = this.oper.title == '作废' ? this.scrapReceiveFunc : this.cancelReceiveFunc;
          this.$refs.cancelForm.validate((result) => {
            if(!result){
              return false;
            }
            func({
              params: {data: this.cancelForm.data},
              success: ({data}) => {
                if (data.code == '0') {
                  this.dialogOperVisible = false;
                  this.$message({
                    type: 'success',
                    message: data.msg
                  });
                  this.getPaidList();
                } else {
                  this.$message.error(data.msg);
                }
              },
              showLoading: true
            });
          });
        }
      }
    },
  }
}
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px;
  background: #fff;
}
.list {
  .table-title {
    height: 36px;
    margin: 16px 0 10px 0;

    .total {
      display: inline-block;
      line-height: 36px;
      font-size: 14px;
      .total-receive {
        font-size: 16px;
        color: #00CC00;
      }
      .total-pay {
        font-size: 16px;
        color: #FF9900;
        margin-right: 20px;
      }
    }

    .btn-areas {
      float: right;
    }
  }
}

.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.el-row{
  padding: 15px 20px 12px;
  border-bottom: 1px solid #cccccc;
  color: #999999;
  &+.el-row{
    padding: 12px 20px 15px;
  }
  .name{
    font-size: 18px;
    color: #444444;
  }
  .st{
    color: #019f3d;
  }
  .st2{
    color: #ff6000;
  }
}
.i-wei{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #fff2f2;
  text-align: center;
  line-height: 20px;
  &::before{
    content: '未';
    color: #ff0000;
  }
}
.system-tab{
  .right{
    float: right;
    a{
      float: right;
      margin: 5px 10px 0 0;
    }
    .el-button{
      width: 120px;
    }
  }
}
</style>
