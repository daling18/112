<template>
  <div class="wrapper" >
    <div class="system-header">
      <el-row>
        <el-col :span="24">
          供应商名称：
          <span class="name">{{ org_name }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          剩余应付款（本位币）：&ensp;
          <span class="color-orange">￥</span>
          <span class="color-orange">{{ remain_amount }}</span>&ensp;元
        </el-col>
        <el-col :span="12">
          历史付款共计（本位币）&ensp;
          <span class="color-orange">￥</span>
          <span class="color-orange">{{ history_amount }}</span>&ensp;元
        </el-col>
      </el-row>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="createTime" label="创建日期" @change="handleChangeCreateTime"/>
      <search-item-date-range v-model="paymentDate" label="付款日期" @change="handleChangePaymentDate"/>
      <div class="search-item">
        <div class="label">付款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :label="val" :value="key" :key="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">付款金额</div>
        <el-input v-model="searchInput.rmb_total_amount" type="number" placeholder="付款金额"/>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">付款ID</div>
        <el-input placeholder="付款ID" v-model="searchInput.payment_id"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column 
            prop="id"
            label="付款ID" 
            align="center" 
            width="100" 
            :resizable="false"/>
          <el-table-column 
            label="付款金额" 
            header-align="center" 
            align="right" 
            width="100" 
            :resizable="false">
            <template slot-scope="scope">
              <span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="成本ID"
            min-width="180" 
            align="center">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.bill_list">{{ scope.row.bill_list }}</div>
            </template>
          </el-table-column>
          <el-table-column 
            prop="payment_date" 
            label="付款日期" 
            align="center" 
            width="100" 
            :resizable="false"/>
          <el-table-column 
            prop="user_name" 
            label="操作人" 
            align="center" 
            min-width="90" 
            :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.user_name">{{ scope.row.user_name }}</div>
            </template>
          </el-table-column>
          <el-table-column 
            prop="create_time" 
            label="创建时间" 
            align="center" 
            width="140" 
            :resizable="false"/>
          <el-table-column 
            label="状态" 
            align="center" 
            width="100"
            :resizable="false">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status === 2 ? 'color-green' : 'color-gray'">{{ scope.row.payment_status_str }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="account_type_str" label="付款方式" align="center" width="90" :resizable="false">
            </el-table-column>
            <el-table-column prop="account_no" label="付款银行卡号／支付平台账号" align="center" width="210" :resizable="false">
            </el-table-column> -->
          <el-table-column 
            label="操作" 
            align="center" 
            width="300"
            fixed="right" 
            :resizable="false">
            <template slot-scope="scope">
              <template v-for="(item, index) in scope.row.edit">
                <!-- 备注 -->
                <el-popover
                  v-if="item === 7"
                  placement="top"
                  width="100"
                  class="mlr10"
                  trigger="click"
                  :content="scope.row.remark"
                  :key="index">
                  <a href="javascript:;" slot="reference">{{ EDIT_MAP[item] }}</a>
                </el-popover>
                <a
                  href="javascript:;"
                  v-else-if="isShowOperate(item, scope.row)"
                  @click="handleOperate(item, scope.row)"
                  :key="index"
                >
                  {{ EDIT_MAP[item] }}
                </a>
              </template>
              <!-- <template v-if="$menuPermission('api/finance/payment_cancel')&&scope.row.payment_status==1">
                  <el-button type="text" @click="cancel_dialog(scope.row)">撤销</el-button>
                </template>
                <template v-else-if="$menuPermission('api/finance/cancel_info')&&scope.row.payment_status==2">
                  <el-button type="text"  @click="cancel_record(scope.row.id)">撤销记录</el-button>
                </template>
                <router-link v-if="$menuPermission('api/finance/get_payment_detail_list')" :to="{path: '/pay-settlment-list', query: {parent_id:$route.query.id,id:scope.row.id}}">成本结算记录</router-link>
                <a v-if="Array.isArray(scope.row.attachment_url) && scope.row.attachment_url.length > 0" href="javascript:;" @click="showdDialogAttachment(scope.row.attachment_url)">下载凭证</a>
 -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog title="操作提示" :visible.sync="dialogCancelVisible" size="tiny">
      <el-form :model="cancel_form">
        <el-form-item label="作废说明" :label-width="formLabelWidth" required>
          <el-input type="textarea" v-model="cancel_form.cancel_info" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="提示" :label-width="formLabelWidth" required>
          <span style="color:red;">作废后该记录就无法恢复</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogCancelVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancel_action" :disabled="btn_disable">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="作废记录" :visible.sync="dialogRecordVisible" size="tiny">
      <template v-if="cancel_record_data">
        <el-form>
          <el-form-item label="作废人" :label-width="formLabelWidth">
            <span>{{ cancel_record_data.user_name }}</span>
          </el-form-item>
          <el-form-item label="作废时间" :label-width="formLabelWidth">
            <span>{{ cancel_record_data.create_time }}</span>
          </el-form-item>
          <el-form-item label="作废说明" :label-width="formLabelWidth">
            <span>{{ cancel_record_data.info }}</span>
          </el-form-item>
        </el-form>
      </template>
      <div class="foot-btn" style="text-align:center;">
        <el-button @click="dialogRecordVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="凭证列表" :visible.sync="dialogAttachmentVisible">
      <ul class="el-upload-list el-upload-list--text" v-if="attachments.length > 0">
        <li class="el-upload-list__item is-success" v-for="(attachment, idx) in attachments" :key="idx">
          <a class="el-upload-list__item-name" :href="attachment.url" download><i class="el-icon-document"/>{{ attachment.name }}</a>
        </li>
      </ul>
      <span v-else>没有上传凭证</span>
    </el-dialog>
  </div>
</template>
<script>
import { paymentList,paymentCancel,cancelInfo} from 'src/api/api'
import {paymentScrapPay, scrapInfo} from 'src/api/finance'
import * as format from 'src/utils/format';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'PayRecord',
  components: {
    SearchItemDateRange
  },
  data() {
    const {query} = this.$route;
    
    return {
      btn_disable:false,
      dialogRecordVisible:false,
      dialogCancelVisible:false,
      cancel_record_data:null,
      cancel_form:{
        cancel_info:'',
      },
      row:null,
      formLabelWidth:'100px',
      searchInput: {
        // payment_status:'',
        // payment_no: '',
        // user_name:'',
        // rmb_total_amount:'',
        // page: 1
      },
      searchData:{
        id: query.id || '',
        settlement_org_id: query.id || '',
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        payment_date_start: query.payment_date_start || '',
        payment_date_end: query.payment_date_end || '',
        payment_status: query.payment_status || '',
        payment_id: query.payment_id ||  '',
        user_name: query.user_name || '',
        rmb_total_amount: query.rmb_total_amount || '',
        page: parseInt(query.page) ||  1
      },
      createTime: [query.create_time_start, query.create_time_end],
      paymentDate: [query.payment_date_start, query.payment_date_end],
      totalPage: parseInt(query.page) ||  1,
      pageShow: true,
      history_amount: '',
      remain_amount: '',
      org_name: '',
      tableData: [],
      attachments: '',
      EDIT_MAP: {},
      PAYMENT_STATUS_MAP: {}
    }
  },
  computed:{
    dialogAttachmentVisible: {
      get: function(){
        return Array.isArray(this.attachments);
      },
      set: function(val){
        if(val == false){
          this.attachments = '';
        }
      }
    }
  },
  mounted() {
    this.getPaidList();
  },
  methods: {
    isShowOperate(edit, data) {
      switch (edit) {
      case 1: 
        return this.$menuPermission('api/finance/pay_detail');
      case 4:
        return this.$menuPermission('api/finance/payment_scrap_pay');
      case 5:
        return this.$menuPermission('api/finance/get_payment_detail_list');
      case 6:
        return Array.isArray(data.attachment_url) && data.attachment_url.length > 0;
      case 7:
      default:
        return true;
      }
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
    getPaidList(isSearch) {
      if (isSearch) {
        this.searchData.page=1;
        this.searchData = {...this.searchInput}
      }else{
        this.searchInput = {...this.searchData}
      }

      let params = {
        data: this.searchData
      }
      params.data.settlement_org_id = this.$route.query.id;

      paymentList({
        params: params,
        success: (params) => {
          let data = params.data

          if (data.code == '0') {
            this.history_amount = data.data.history_amount;
            this.remain_amount = data.data.remain_amount;
            this.org_name = data.data.org_name;
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.pageShow = data.data.total_page > 0;
            this.EDIT_MAP = data.data.edit_arr || {};
            this.PAYMENT_STATUS_MAP = data.data.payment_status || {};
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    cancel_dialog(row){
      this.cancel_form.cancel_info='';
      this.dialogCancelVisible=true;
      this.row=row;
    },
    cancel_action(row){
      if(!this.cancel_form.cancel_info){
        this.$message.error('请填写作废说明');
        return false;
      }
      this.btn_disable=true;

      let params={
        data:{
          payment_id:this.row.id,
          info:this.cancel_form.cancel_info
        }
      }
      paymentScrapPay({
        params: params,
        success: (params) => {
          let data = params.data;

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
    },
    cancel_record(id){
      let params={
        data: {
          id: id,
        }
      }
      scrapInfo({
        params: params,
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.dialogRecordVisible = true;
            this.cancel_record_data = data.data;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    showdDialogAttachment: function(attachments){
      this.attachments = attachments;
    },
    handleOperate(edit, data) {
      switch (edit) {
      case 1:
        this.$router.push({
          path: '/fund-settlement/pay-detail',
          query: {id: data.id} // , parent_id: this.parentId
        });
        break;
      case 4:
        this.cancel_dialog(data);
        break;
      case 5:
        this.$router.push({
          path: '/pay-settlment-list',
          query: {payment_id: data.id, parent_id: this.$route.query.id}
        });
        break;
      case 6:
        this.showdDialogAttachment(data.attachment_url);
        break;
      default:
        return true;
      }
    },
  }
}
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
.mlr10{
  margin: 0 10px;
}

</style>
