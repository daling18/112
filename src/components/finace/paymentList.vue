<template>
  <div class="wrapper">
    <div class='system-tab'>
      <div class="right">
        <router-link :to="{path: '/finace/paymentList/pay-edit',query:{action:1}}">
          <el-button type="primary">+ 登记付款</el-button>
        </router-link>
        <router-link :to="{path: '/finace/paymentList/pay-boc-edit',query:{}}">
          <el-button type="primary">在线转账付款</el-button>
        </router-link>
      </div>
      <ul class="tab-box">
        <li @click="goto('/finace/applied',{})">付款处理</li>
        <li class="on">付款记录</li>
      </ul>
    </div>
    <div class="system-search">
      <search-item-date-range label="创建时间" v-model="dateCreate"/>
      <search-item-date-range label="付款日期" v-model="datePayment"/>
      <div class="search-item">
        <div class="label">状态</div>
        <el-select v-model="searchData.payment_status">
          <el-option label='全部' value='0'></el-option>
          <el-option 
            v-for="(item, key) in STATE_MAP"
            :label='item'
            :value='key'
            :key="key"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchData.user_name" placeholder='操作人'></el-input>
      </div>
      <div class="search-item">
        <div class="label">付款id</div>
        <el-input v-model="searchData.payment_id" placeholder="付款id"></el-input>
      </div>
      <div class="search-item">
        <div class="label">付款金额</div>
        <el-input v-model="searchData.rmb_total_amount" placeholder="付款金额"></el-input>
      </div>
      <div class="search-item">
        <div class="label">结算方</div>
        <el-input v-model="searchData.settlement_org_name" placeholder="结算方"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type='primary' @click="list(true)">搜索</el-button>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <el-table :data='tableData' style="100%" border>
          <el-table-column
            label='付款id'
            align='center'
            width='80'
            :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.id">{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='结算方'
            prop="settlement_org_name"
            align='center'
            width='140'
            :resizable="false"
            :show-overflow-tooltip="true"/>
          <el-table-column
            label='付款金额'
            align='center'
            width='100'
            :resizable="false">
            <template slot-scope="scope">
              <div class="color-orange">{{scope.row.rmb_total_amount}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='成本id'
            align='center'
            :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.bill_list">{{scope.row.bill_list}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='付款日期'
            prop="payment_date"
            align='center'
            :resizable="false" />
          <el-table-column
            label='操作人'
            prop="user_name"
            width="180"
            align='center'
            :resizable="false" />
          <el-table-column
            label='创建时间'
            prop="create_time"
            width="150"
            align='center'
            :resizable="false" />
          <el-table-column
            label='状态'
            align='center'
            width='100'
            :resizable="false">
            <template slot-scope="scope">
              <div v-if="scope.row.payment_status === 1" class="color-green">{{scope.row.payment_status_str}}</div>
              <div v-else-if="scope.row.payment_status === 2" class="color-red">{{scope.row.payment_status_str}}</div>
              <div v-else>{{scope.row.status_str}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='操作'
            align='center'
            width="300"
            fixed='right'
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
                  v-else
                  @click="handleOperate(item, scope.row)"
                  :key="index"
                >
                  {{ EDIT_MAP[item] }}
                </a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination layout="prev, pager, next" :current-page="searchData.page" :page-count="total_page" @current-change="handleCurrentChange"/>
      </div>
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
  </div>
</template>
<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import {allPaymentList, paymentScrapPay} from 'src/api/finance';
export default {
  components: {
    SearchItemDateRange
  },
  data () {
    return {
      topMenuConst: this.$route.meta.topMenuConst ? this.$route.meta.topMenuConst : '',
      dateCreate: [],
      datePayment: [],
      STATE_MAP: [],
      EDIT_MAP: [],
      formLabelWidth:'100px',
      searchData: {
        id: '',
        create_time_start: '',
        create_time_end: '',
        payment_date_start: '',
        payment_date_end: '',
        payment_status: '0',
        user_name: '',
        payment_id: '',
        rmb_total_amount: '',
        settlement_org_name: '',
        page: 1,
        page_size: 10
      },
      resData: {
        id: '',
        create_time_start: '',
        create_time_end: '',
        payment_date_start: '',
        payment_date_end: '',
        payment_status: '0',
        user_name: '',
        payment_id: '',
        rmb_total_amount: '',
        settlement_org_name: '',
        page: 1,
        page_size: 10
      },
      tableData: [],
      total_page: 1,
      dialogCancelVisible: false,
      cancel_form:{
        cancel_info:'',
      },
      btn_disable: false,
      attachments: ''
    }
  },
  watch: {
    $route() {
      this.topMenuConst = this.$route.meta.topMenuConst ? this.$route.meta.topMenuConst : '',
      this.resData.id = ''
      this.resData.create_time_start = ''
      this.resData.create_time_end = ''
      this.resData.payment_date_start = ''
      this.resData.payment_date_end = ''
      this.resData.payment_status = '0'
      this.resData.user_name = ''
      this.resData.payment_id = ''
      this.resData.rmb_total_amount = ''
      this.resData.settlement_org_name = ''
      this.resData.page = 1
      this.list()
    }
  },
  methods: {
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    list (type) {
      if (type) {
        this.searchData.page = 1
        this.resData = {...this.searchData}
        this.resData.create_time_start = this.dateCreate[0]
        this.resData.create_time_end = this.dateCreate[1]
        this.resData.payment_date_start = this.datePayment[0]
        this.resData.payment_date_end = this.datePayment[1]
      } else {
        this.searchData = {...this.resData}
        this.dateCreate = [this.searchData.create_time_start, this.searchData.create_time_end]
        this.datePayment = [this.searchData.payment_date_start, this.searchData.payment_date_end]
      }
      let params = {
        data: this.resData
      }
      allPaymentList({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.tableData = result.data.list
            this.STATE_MAP = result.data.payment_status
            this.EDIT_MAP = result.data.edit_arr
            this.total_page = result.data.total_page
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
    handleCurrentChange (val) {
      this.resData.page = val
      this.list()
    },
    handleOperate(edit, data) {
      switch (edit) {
      case 1:
        this.$router.push({
          path: '/finace/paymentList/pay-detail',
          query: {id: data.id} // , parent_id: this.parentId
        });
        break;
      case 4:
        this.cancel_dialog(data);
        break;
      case 5:
        this.$router.push({
          path: '/finace/paymentList/pay-settlment-list',
          query: {payment_id: data.id}
        });
        break;
      case 6:
        this.showdDialogAttachment(data.attachment_url);
        break;
      default:
        return true;
      }
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
            this.list();
          } else {
            this.$message.error(data.msg);

          }
          this.btn_disable=false;
        },
        showLoading: true
      });
    },
    showdDialogAttachment: function(attachments){
      this.attachments = attachments;
    },
  },
  mounted () {
    this.resData.bill_id = this.$route.query.bill_id ? this.$route.query.bill_id : ''
    this.list()
  },
}
</script>
<style lang="less" scoped>
  .wrapper {
    .long-item {
      padding-left: 110px;
      .label {
        width: 95px;
        margin-left: -100px;
      }
    }
    .text-c {
      text-align: center;
    }
  }
.mlr10{
  margin-left: 10px;
}
.right{
  float: right;
  a{
    display: inline-block;
    margin: 5px 10px 0 0;
  }
}
</style>
