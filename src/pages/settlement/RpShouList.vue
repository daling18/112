<template>
  <div class="system-content">
    <div class="system-tab">
			<ul class="tab-box">
				<li class="on">收款记录</li>
        <!-- <li v-if="$menuPermission('settlement/recpay/renkuan')" @click="goto('ren-list',{})">认款记录</li> -->
			</ul>
      <div class="right">
        <router-link :to="{path: '/settlement/recpay/bank-runwater'}"
          v-if="$menuPermission('settlement/recpay/recei/bankrec')">
          <el-button type="primary">+ 选入银行流水</el-button>
        </router-link>
        <router-link :to="{path: 'receive-edit',query:{action: 1,from:'settlement'}}"
          v-if="$menuPermission('settlement/recpay/recei/addrecei')">
          <el-button type="primary">+ 登记收款</el-button>
        </router-link>
      </div>
		</div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="createTime" label="创建日期" @change="handleChangeCreateTime"/>
      <search-item-date-range v-model="paymentDate" label="收款日期" @change="handleChangePaymentDate"/>
      <div class="search-item">
        <div class="label">收款单号</div>
        <el-input v-model="searchInput.payment_no" placeholder="收款单号"/>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.operator_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">收款状态</div>
        <el-select v-model="searchInput.approval_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option label="待审批" value="1"/>
          <el-option label="审批通过" value="2"/>
          <el-option label="审批不通过" value="3"/>
          <el-option label="已撤销" value="4"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">收款方式</div>
        <el-select v-model="approvalType" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option label="线下收款" value="0"/>
          <el-option label="支付宝app " value="1"/>
          <el-option label="支付宝pc" value="2"/>
          <el-option label="支付宝h5" value="3"/>
          <el-option label="微信app" value="4"/>
          <el-option label="微信pc" value="5"/>
          <el-option label="微信h5" value="6"/>
          <el-option label="微信小程序" value="7"/>
          <el-option label="微信公众号" value="8"/>
        </el-select>
      </div>
      <!-- <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchInput.balance_status" placeholder="全部">
          <el-option label="全部" value="0"/>
          <el-option label="未认清" value="1"/>
          <el-option label="已认清" value="2"/>
        </el-select>
      </div> -->
      <!-- <div class="search-item">
        <div class="label">未认金额</div>
        <el-input v-model="searchInput.fund_balance" type="number" placeholder="未认金额"/>
      </div> -->
      <div class="search-item">
        <div class="label">收款金额</div>
        <el-input v-model="searchInput.amount" type="number" placeholder="收款金额"/>
      </div>
      <!-- <div class="search-item">
        <div class="label">付款方</div>
        <el-input v-model="searchInput.settlement_org_name" placeholder="结算方"/>
      </div> -->
      <!-- <div class="search-item">
        <div class="label">登记/选入</div>
        <el-select v-model="searchInput.source" placeholder="全部">
          <el-option label="全部" value="0"/>
          <el-option label="登记" value="1"/>
          <el-option label="选入" value="2"/>
        </el-select>
      </div> -->
      <!-- <div class="search-item">
        <div class="label">付款方</div>
        <el-input v-model="searchInput.settlement_org_name" placeholder="付款方"/>
      </div> -->
      <div class="search-item">
        <div class="label">订单号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单号"/>
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
        border
        >
        <el-table-column
          label="收款单号"
          align="center"
          min-width="180">
          <template slot-scope="scope">
           <!-- <span class="color-orange" v-if="scope.row.source == 1">
              [登记]
            </span>
            <span class="color-orange" v-else-if="scope.row.source == 2">
              [选入]
            </span> -->
            {{ scope.row.payment_no || '--' }}
          </template>
        </el-table-column>
        <el-table-column
          label="付款方"
          header-align="center"
          align="center"
          min-width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.org_name || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单号"
          header-align="center"
          align="center"
          min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.order_no || '--' }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="付款方"
          prop="settlement_org_name"
          header-align="center"
          align="center"
          width="140"
          :show-overflow-tooltip="true"/> -->
        <el-table-column
          label="收款金额"
          header-align="center"
          align="right"
          min-width="100">
          <template slot-scope="scope">
            <span class="color-orange">
              {{ scope.row.amount || '--' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="收款方式"
          header-align="center"
          align="center"
          min-width="100">
          <template slot-scope="scope">
            <span>{{ payment_type(scope.row.pay_type, scope.row.payment_type ) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
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
        </el-table-column> -->
        <el-table-column
          label="操作人"
          header-align="center"
          align="center"
          min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.operator_name || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收款日期"
          header-align="center"
          align="center"
          min-width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_time || '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收款状态"
          align="center"
          width="100">
          <template slot-scope="scope">
            <span :class="scope.row.approval_status | getStatusColor">
              {{ approval_status[scope.row.approval_status + ''] || '--' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100"
          fixed="right">
          <template slot-scope="scope">
            <!-- <template v-if="!isShowOperate(scope.row.edit, scope.row)">--</template> -->
            <a href="javascript:void(0)" @click="goto('receive-detail', {payment_no: scope.row.payment_no})">查看收款</a>
            <!-- <el-dropdown v-else trigger="click" @command="handleOperate">
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(o, i) in scope.row.edit">
                  <el-dropdown-item
                    v-if="isShowOperate(o, scope.row)"
                    :key="i"
                    :command="{o, data: scope.row}">
                    {{ allData.edit_arr[o] }}
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-footer v-show="pageShow">
      <Affix :offset-bottom="0">
        <el-pagination
          layout="prev, pager, next, sizes"
          :current-page="searchData.page"
          @current-change="handleCurrentChange"
          :page-count="totalPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="searchData.limit"
          @size-change="handleSizeChange"
          class="pagination"
        />
      </Affix>
    </el-footer>
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
        <el-button type="primary" @click="handleOper(1)" :disabled="btn_disable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Affix from 'src/components/template/common/affix';
import {
  salePaymentCancel as zhikeSalePaymentCancel,
  paymentCancel as zhikePaymentCancel,
  saleReissueReceipt as zhikeSaleReissueReceipt,
  reissueReceipt as zhikeReissueReceipt,
  paymentScrap as zhikePaymentScrap
} from 'src/api/zhike'
import {
  allReceiptListV2,
  reissueReceipt,
  paymentScrapReceipt,
  paymentCancel
} from 'src/api/finance'
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  components: {
    SearchItemDateRange,
    Affix
  },
  filters: {
    getStatusColor(status){
      switch(status) {
        case '3':
          return 'color-red';
        case '2':
          return 'color-green';
        default:
          return 'color-gray';
      }
    }
  },
  data() {
    const {query} = this.$route;
    return {
      btn_disable:false,
      formLabelWidth:'80px',
      searchInput:{ },
      searchData: {
        page: parseInt(query.page) ||  1,
        limit: parseInt(query.limit) ||  10,
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        pay_time_start: query.pay_time_start || '',
        pay_time_end: query.pay_time_end || '',
        approval_status: query.approval_status || '',
        operator_name: query.operator_name ||  '',
        payment_no: query.payment_no ||  '',
        amount: query.amount ||  '',
        order_no: query.order_no || '',
        payment_type: '',
        pay_type: ''
      },
      createTime: [query.create_time_start, query.create_time_end],
      paymentDate: [query.pay_time_start, query.pay_time_end],
      totalPage: parseInt(query.page) ||  1,
      approvalType: query.approvalType || '',
      currentPage: 1,
      pageShow: true,
      allData: {},
      tableData: [],
      isZhike: false,
      dialogOperVisible: false,
      oper:{
        title: ''
      },
      dialogData: '',
      cancelForm: {
        data: {
          payment_id: '',
          info: ''
        },
        rules: {info: [{required: true, message: '说明不能为空'}]}
      },
      approval_status: {
        '1': '待审批',
        '2': '审批通过',
        '3': '审批不通过',
        '4': '已撤销'
      }
    }
  },
  created(){
  },
  computed:{
    reissueReceiveFunc(){
      return this.dialogData.settlement_org_id ? zhikeReissueReceipt : reissueReceipt;
    },
    scrapReceiveFunc(){
      return this.dialogData.settlement_org_id ? zhikePaymentScrap : paymentScrapReceipt;
    },
    cancelReceiveFunc(){
      return this.dialogData.settlement_org_id ? zhikePaymentCancel : paymentCancel;
    },
  },
  watch: {
    approvalType (newVal, oldVal) {
      console.log(newVal)
      if (!newVal && newVal !== '0') {
        this.searchInput.pay_type = ''
        this.searchInput.payment_type = ''
      } else if (newVal == '0') {
        this.searchInput.pay_type = '2'
        this.searchInput.payment_type = ''
      } else {
        this.searchInput.pay_type = '1'
        this.searchInput.payment_type = newVal
      }
    }
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
    payment_type (pay_type, type) {
      if (pay_type == 1) {
        switch (type) {
          case '1':
            return '支付宝app'
          case '2':
            return '支付宝pc'
          case '3':
            return '支付宝h5'
          case '4':
            return '微信app'
          case '5':
            return '微信pc'
          case '6':
            return '微信h5'
          case '7':
            return '微信小程序'
          case '8':
            return '微信公众号'
          default:
            return '--'
        }
      } else if (pay_type == 2) {
        return '线下收款'
      } else {
        return '--'
      }
    },
    isShowOperate(edit, data) {
      if (Array.isArray(edit)) {
        return edit.some(e => this.isShowOperate(e, data));
      }
      switch (edit) {
        case 1:
          // 查看收款
          return this.$menuPermission('settlement/recpay/recei/getreceidet');
        case 2:
          // 撤销收款
          return this.$menuPermission('settlement/recpay/recei/cancelrecei');
        case 3:
          // 重新发起
          return this.$menuPermission('settlement/recpay/recei/reinitrecei');
        case 4:
          // 作废收款
          return this.$menuPermission('settlement/recpay/recei/obsrecei');
        case 8:
          // 认款
          return this.$menuPermission('settlement/recpay/recei/addrec');
        default:
          return false;
      }
    },
    handleOperate(cmd) {
      const {o, data} = cmd;
      switch (o) {
        case 1:
          this.goto(
            'receive-detail',
            {id: data.id}
          );
          break;
        case 2:
          this.dialogOperVisible = true;
          this.oper.title = '撤销';
          this.dialogData = data;
          if(this.$refs.cancelForm){
            this.$refs.cancelForm.resetFields();
          }
          this.cancelForm.data.payment_id = data.id;
          break;
        case 3:
          this.$confirm(
            '确认重新发起收款？',
            '重新发起',
            {type: 'warning'}
          ).then(() =>{
            this.reissueReceiveFunc({
              params: {data: {id: data.id}},
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
          break;
        case 4:
          this.dialogOperVisible = true;
          this.oper.title = '作废';
          this.dialogData = data;
          if(this.$refs.cancelForm){
            this.$refs.cancelForm.resetFields();
          }
          this.cancelForm.data.payment_id = data.id;
          break;
        case 8:
          this.goto(
            'renkuan-add',
            {id:'', pay_id:data.id}
          );
          break;
        default:
          return true;
      }
    },
    handleChangeCreateTime(date) {
      this.searchInput.create_time_start = date[0] || '';
      this.searchInput.create_time_end = date[1] || '';
    },
    handleChangePaymentDate(date) {
      this.searchInput.pay_time_start = date[0] || '';
      this.searchInput.pay_time_end = date[1] || '';
    },
    handleSearch(){
      this.getPaidList(true);
      // this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.paymentDate = [this.searchData.pay_time_start, this.searchData.pay_time_end];
        this.getPaidList();
        // this.$router.replace({query: this.searchData});
      }
    },
    handleSizeChange (val) {
      if(val != this.searchData.limit){
        this.searchData.page = 1;
        this.searchData.limit = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.paymentDate = [this.searchData.pay_time_start, this.searchData.pay_time_end];
        this.getPaidList();
//         this.$router.replace({query: this.searchData});
//
//         this.$router.push({
//           path: this.$route.path,
//           query: {
//             filter: window.btoa(window.encodeURIComponent(JSON.stringify(filter)));
//           }
//         })
      }
    },
    getPaidList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      allReceiptListV2({
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
    handleOper(status,row){
      if(status == 1){
        // 提交
        if(this.$refs.cancelForm) {
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
      }else{
        // 关闭
        this.dialogOperVisible = false;
      }
    },
  }
}
</script>

<style  scoped>
>>> .el-pager li{
  margin: 0px 5px;
}
>>> .el-pagination .btn-prev, .el-pagination .btn-next{
  margin: 0px 5px;
}
</style>
<style scoped lang="scss">
@import "src/assets/css/variables.scss";
.el-container,
.el-main, .el-footer {
  padding: 0;
}
.el-footer{
  height: 52px;
}
.pagination {
  // height: 52px !important;
  padding: 13px;
  background: $gray;
  text-align: right;
}
</style>

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
