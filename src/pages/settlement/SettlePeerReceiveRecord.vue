// D:\files\repo\bom\application\index\view\dev\src\components\finace\balance\recieve-record.vue
<template>
  <div class="system-content">
    <div class="system-header">
      <el-row>
        <el-col :span="24">
          <router-link class="hd-btn"
            :to="{path: '/settlement/recpay/receive-edit', query: {parent_id:$route.query.id,action:1}}">
            添加收款
          </router-link>
          代理商名称：
          <span class="name">{{ org_name }}</span>
        </el-col>
      </el-row>
      <el-row class="content-title">
        <el-col :span="12">
          收入结算金额（剩余应收款）：&ensp;
          <span class="st">{{ remain_amount }}</span>&ensp;元
        </el-col>
        <el-col :span="12">
          历史收款共计（本位币）&ensp;
          <span class="st2">{{ history_amount }}</span>&ensp;元
        </el-col>
      </el-row>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="createTime" label="创建日期" @change="handleChangeCreateTime"/>
      <search-item-date-range v-model="paymentDate" label="收款日期" @change="handleChangePaymentDate"/>
      <div class="search-item">
        <div class="label">收款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">所属部门</div>
        <select-org @select="handleChangeOrg" part-org placeholder="所属部门"/>
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
        <div class="label">收款金额</div>
        <el-input v-model="searchInput.rmb_total_amount" type="number" placeholder="收款金额"/>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">收款ID</div>
        <el-input placeholder="收款ID" v-model="searchInput.payment_id"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="content-list">
      <receive-table
        :data-list="tableData"
        :edit-map="EDIT_MAP"
        top-menu-const="settlement"
        :parent-id="$route.query.parent_id"
        @success="getPaidList()">
        <el-table-column prop="id" label="收款ID" align="center" width="100"/>
        <el-table-column label="收款金额" align="right" header-align="center" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.balance_status == '未认清'" class="i-wei" title="未认清"/>
            <span class="color-orange">{{ scope.row.rmb_total_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未认金额" align="right" header-align="center" width="80">
          <template slot-scope="scope">
            <template v-if="scope.row.payment_status==2">{{ scope.row.fund_balance }}</template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column prop="account_type_str" label="收款方式账号" header-align="center" min-width="100">
          <template slot-scope="scope">
            <div class="lh18">
              {{ scope.row.account_type_str }}
              <span class="color-gray">/</span>
              <div class="ellipsis" :title="scope.row.account_no">
                {{ scope.row.account_no }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="操作人" align="center" min-width="80">
          <template slot-scope="scope">
            <p class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="user_org_name" label="所属部门" align="center" min-width="80">
          <template slot-scope="scope">
            <p class="ellipsis" :title="scope.row.user_org_name">{{ scope.row.user_org_name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="收款日期" align="center" width="100">
          <template slot-scope="scope">
            <div class="color-gray">
              {{ scope.row.payment_date }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" header-align="center" width="100">
          <template slot-scope="scope">
            <div class="color-gray">
              {{ scope.row.create_time }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            <span :class="scope.row.payment_status | getStatusColor">
              {{ scope.row.payment_status_str }}
            </span>
          </template>
        </el-table-column>
      </receive-table>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog title="操作提示" :visible.sync="dialogCancelVisible">
      <el-form :model="cancel_form">
        <el-form-item label="撤销说明" :label-width="formLabelWidth" required>
          <el-input type="textarea" v-model="cancel_form.cancel_info" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="提示" :label-width="formLabelWidth" required>
          <span style="color:red;">撤销收款记录后将撤销相应的销售认款，且无法恢复</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogCancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancel_action" :disabled="btn_disable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { receiptList,paymentCancel } from 'src/api/api'
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import SelectOrg from 'src/plugins/SelectOrg';
import ReceiveTable from './components/SettReceiveTable'

export default {
  components: {
    SelectOrg,
    SearchItemDateRange,
    ReceiveTable
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
      btn_disable:false,
      dialogRecordVisible:false,
      dialogCancelVisible:false,
      cancel_form:{
        cancel_info:'',
      },
      row:null,
      formLabelWidth:'80px',
      searchInput:{
        // payment_status:'',
        // user_type: '',
        // balance_status:'',
        // payment_id:'',
        // user_name:'',
        // b_id: '',
        // rmb_total_amount:''
      },
      searchData:{
        id: query.id,
        settlement_org_id: query.id,
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        payment_date_start: query.payment_date_start || '',
        payment_date_end: query.payment_date_end || '',
        payment_status: query.payment_status || '',
        user_type: query.user_type ||  '',
        balance_status: query.balance_status || '0',
        payment_id: query.payment_id || '',
        user_name: query.user_name || '',
        rmb_total_amount: query.rmb_total_amount || '',
        b_id: query.b_id ||  '',
        page: parseInt(query.page) ||  1
      },
      createTime: [query.create_time_start, query.create_time_end],
      paymentDate: [query.payment_date_start, query.payment_date_end],
      totalPage: parseInt(query.page) ||  1,
      currentPage: 1,
      pageShow: true,
      history_amount: '',
      remain_amount: '',
      org_name: '',
      tableData: [],
      attachments: '',
      PAYMENT_STATUS_MAP: {},
      EDIT_MAP: {},
      USER_TYPE_MAP: {}
    }
  },
  // computed:{
  //   dialogAttachmentVisible: {
  //     get: function(){
  //       return Array.isArray(this.attachments);
  //     },
  //     set: function(val){
  //       if(val == false){
  //         this.attachments = '';
  //       }
  //     }
  //   },
  // },
  mounted() {
    // console.log(this.$route)
    this.getPaidList();
  },
  methods: {
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

      receiptList({
        params: {data: this.searchData},
        success: (params) => {
          const {code, data, msg} = params.data || {};
          this.loading = false;


          if (code == '0') {
            this.history_amount = data.history_amount;
            this.remain_amount = data.remain_amount;
            this.org_name = data.org_name;
            this.tableData = data.list;
            this.totalPage = data.total_page;
            this.pageShow = data.total_page > 0;
            this.searchData.page = data.page_index;
            this.PAYMENT_STATUS_MAP = data.payment_status;
            this.USER_TYPE_MAP = data.user_type;
            this.EDIT_MAP = data.edit_arr;

          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleChangeOrg(item){
      console.log('change org: ', item);
      this.searchData.b_id = item && item.org_id;
    },
    cancel_dialog(row){
      this.cancel_form.cancel_info='';
      this.dialogCancelVisible=true;
      this.row=row;
    },
    cancel_action(row){
      if(!this.cancel_form.cancel_info){
        this.$message.error('请填写撤销说明');
        return false;
      }
      this.btn_disable=true;

      let params={
        data:{
          payment_id:this.row.id,
          info:this.cancel_form.cancel_info
        }
      }
      paymentCancel({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == '0') {
            this.$message.success(data.msg);
            this.dialogCancelVisible=false;
            this.getPaidList();
          } else {
            this.$message.error(data.msg);

          }
          this.btn_disable=false;
        },
        showLoading: true
      });
    }
  }
}
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px;
  background: #fff;
}
.hd-btn{
  float: right;
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #aa0371;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  &:hover{
    opacity: .8;
  }
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
</style>
