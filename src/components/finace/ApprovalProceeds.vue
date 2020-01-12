<template>
  <!-- 已不使用页面  by qzhchen 20181011 -->
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">收款审核（{{ pendingProceedsCount }}）</li>
        <li v-if="$menuPermission('api/finance/check_renkuan_list')"><router-link :to="{path:'/finace/approval/recognition'}">认款审核（{{ pendingRecognitionCount }}）</router-link></li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range label="收款日期" v-model="paymentDate"/>
      <div class="search-item">
        <div class="label">状态</div>
        <el-select v-model="searchData.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">收款类型</div>
        <el-select v-model="searchData.user_collection_type" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in USER_COLLECTION_TYPE_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">收款人</div>
        <el-input v-model="searchData.user_name" placeholder="收款人"/>
      </div>
      <div class="search-item">
        <div class="label">收款金额</div>
        <el-input v-model="searchData.rmb_total_amount" type="number" placeholder="收款金额"/>
      </div>
      <div class="search-item">
        <div class="label">收款编号</div>
        <el-input v-model="searchData.payment_no" placeholder="收款编号"/>
      </div>
      <div class="search-item">
        <div class="label">收款账户</div>
        <el-select v-model="searchData.account_id" filterable placeholder="请输入收款方式/账户" clearable>
          <el-option
            v-for="item in accountList"
            :key="item.id"
            :label="item.account_info"
            :value="item.id"/>
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list" style="margin-top:15px;">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column 
            prop="payment_no" 
            label="收款编号" 
            align="center" 
            width="160" 
            :resizable="false"
          />
          <el-table-column label="收款金额" align="right" width="100" :resizable="false">
            <template slot-scope="scope"><span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span></template>
          </el-table-column>
          <el-table-column label="收款日期" align="center" width="100" :resizable="false">
            <template slot-scope="scope">
              <span class="color-gray">{{ scope.row.payment_date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收款方式账号" align="center" min-width="200" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.account_type_str + ' / ' + scope.row.account_no">{{ scope.row.account_type_str + ' / ' + scope.row.account_no }}</p>
            </template>
          </el-table-column>
          <el-table-column label="收款人" align="center" min-width="120" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.user_org_name + ' / ' + scope.row.user_name">{{ scope.row.user_org_name + ' / ' + scope.row.user_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="收款类型" align="center" width="120" :resizable="false">
            <template slot-scope="scope">{{ USER_COLLECTION_TYPE_MAP[scope.row.user_collection_type] }}</template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="94" :resizable="false">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status | getStatusColor">{{ PAYMENT_STATUS_MAP[scope.row.payment_status] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140" :resizable="false">
            <template slot-scope="scope">
              <router-link 
                v-if="$menuPermission('api/finance/payment_verify') && scope.row.payment_status == 3" 
                :to="{path: `/finace/approval/proceeds/verify`, query: {parent_id:$route.query.id, id:scope.row.id}}"
              >审核</router-link>
              <template v-else-if="(scope.row.payment_status != 3) && $menuPermission('api/tuan/financial_settle_get_gathering_info,api/finance/payment_cancel')">
                <router-link 
                  v-if="$menuPermission('api/tuan/financial_settle_get_gathering_info')" 
                  :to="{path: `/recieve-detail`, query: {id: scope.row.id}}"
                >查看</router-link>
                <a 
                  v-if="(scope.row.payment_status == 4 || scope.row.payment_status == 1) && $menuPermission('api/finance/payment_cancel')" 
                  href="javascript:;"
                  @click="handleCancelConfirm(scope.row.id)"
                >撤销</a>
                <span v-else-if="!$menuPermission('api/tuan/financial_settle_get_gathering_info')">--</span>
              </template>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchDataParams.page" :page-count="totalPage" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog title="撤销" :visible.sync="dialogCancelVisible">
      <el-form :model="cancel_form">
        <el-form-item 
          label="撤销说明" 
          :label-width="formLabelWidth" 
          required
        >
          <el-input type="textarea" v-model="cancel_form.info" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="提示" :label-width="formLabelWidth" required>
          <span style="color:red;">撤销收款记录后将撤销相应的销售认款，且无法恢复</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogCancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCancelPayment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPaymentAccount, paymentCancel } from 'src/api/api';
import { checkReceiptList } from 'src/api/finance';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
export default {
  name: 'ApprovalProceeds',
  components: {
    SearchItemDateRange
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 5: 
        return 'color-red';
      case 4: 
      case 1:
        return 'color-green';
      case 3:
      default:
        return '';
      }
    }
  },
  data() {
    return {
      // createTime: ['', ''],
      paymentDate: ['', ''],
      accountList: [],
      searchData:{
        payment_status:'3',
        payment_no:'',
        user_name:'',
        rmb_total_amount:'',
        user_collection_type:'',
        account_id:'',
        page: 1,
        page_size: 10
      },
      searchDataParams:{
        // create_time_start:'',
        // create_time_end:'',
        payment_date_start:'',
        payment_date_end:'',
        payment_status: '',
        payment_no:'',
        user_name:'',
        rmb_total_amount:'',
        user_collection_type:'',
        account_id:'',
        page: 1,
        page_size: 10,
      },
      totalPage: 1,
      pageShow: true,
      pendingProceedsCount: 0,
      pendingRecognitionCount: 0,
      PAYMENT_STATUS_MAP: {},
      USER_COLLECTION_TYPE_MAP: {},
      tableData: [],
      dialogCancelVisible: false,
      formLabelWidth: '80px',
      cancel_form:{
        cancel_info:'',
      },
    };
  },
  computed:{
  },
  mounted() {
    this.getList(true);

    getPaymentAccount({
      params: {data: {}},
      success: (params) => {
        let data = params.data;
        if (data.code == '0') {
          let arr=data.data.list;
          this.accountList = arr.map(function(a){
            return { 
              id: a.id,
              account_info: a.account_type_str + ' / ' + a.account_no
            };
          });
          
        } else {
          this.$message.error(data.msg);
        }
      }
    });
  },
  methods: {
    handleCurrentChange(val) {
      if(val != this.searchDataParams.page){
        this.searchDataParams.page = val;
        this.getList();
      }
    },
    getList(bool) {
      if (bool) {
        this.searchDataParams = {... this.searchData};
        this.searchDataParams.page = 1;
        // this.searchDataParams.create_time_start = this.createTime[0];
        // this.searchDataParams.create_time_end = this.createTime[1];
        this.searchDataParams.payment_date_start = this.paymentDate[0];
        this.searchDataParams.payment_date_end = this.paymentDate[1];
      }else{
        const {payment_date_start, payment_date_end} = this.searchDataParams;
        // const {create_time_start, create_time_end} = this.searchDataParams;
        this.searchData = {... this.searchDataParams};
        this.paymentDate = [payment_date_start, payment_date_end];
        // this.createTime = [create_time_start, create_time_end];
      }

      checkReceiptList({
        params: {data: this.searchDataParams},
        success: (resp) => {
          const {data, code, msg} = resp.data;

          if (code == '0' && data) {
            this.pendingProceedsCount = data.tab_count && data.tab_count.receipt_count || 0;
            this.pendingRecognitionCount = data.tab_count && data.tab_count.renkuan_count || 0;
            this.PAYMENT_STATUS_MAP = data.payment_status_list || {};
            this.USER_COLLECTION_TYPE_MAP = data.user_collection_type_list || {};
            this.tableData = data.list,
            this.history_amount = data.history_amount;
            this.remain_amount = data.remain_amount;
            this.org_name = data.org_name;
            this.tableData = data.list;
            this.totalPage = data.total_page;
            this.searchDataParams.page = data.page_index;
            this.pageShow = data.total_page != 0;
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCancelConfirm(id) {
      this.dialogCancelVisible = true;
      this.cancel_form = {
        payment_id: id,
        info: ''
      };
    },
    handleCancelPayment(){
      if(!this.cancel_form.info){
        this.$message.error('请填写撤销说明');
        return false;
      }
      let params={
        data: this.cancel_form
      };
      paymentCancel({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.$message.success(data.msg);
            this.dialogCancelVisible=false;
            this.getList();
          } else {
            this.$message.error(data.msg);

          }
        },
        showLoading: true
      });
    }
  }
};
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px;
  padding: 15px;
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

</style>
