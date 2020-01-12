<template>
  <div class="system-content">
    <div class="system-tab">
			<ul class="tab-box">
        <li v-if="$menuPermission('settlement/recpay/shoukuan')" @click="goto('shou-list',{})">收款记录</li>
				<li class="on">认款记录</li>
			</ul>
		</div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="createTime" label="认款日期" @change="handleChangeCreateTime"/>
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" type="number" placeholder="订单编号"/>
      </div>
      <div class="search-item">
        <div class="label">应收款ID</div>
        <el-input v-model="searchInput.bill_id" placeholder="应收款ID"/>
      </div>
      <div class="search-item">
        <div class="label">认款ID</div>
        <el-input v-model="searchInput.id" placeholder="认款ID"/>
      </div>
      <div class="search-item">
        <div class="label">收款ID</div>
        <el-input v-model="searchInput.payment_id" placeholder="收款ID"/>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(status, key) in PAYMENT_STATUS_MAP" :key="key" :label="status" :value="key"/>
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
          prop="renkuan_role_name"
          label="认款类型"
          align="center"
          width="100" />
        <el-table-column
          prop="order_no"
          label="订单号"
          align="center"
          width="200" />
        <el-table-column
          prop="id"
          label="认款ID"
          align="center"
          width="100" />
        <el-table-column
          label="收款ID"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-tooltip placement="right">
              <ul slot="content" class="more-tip">
                <li><b>收款ID</b>{{ scope.row.payment_info.id || '--' }}</li>
                <li><b>收款金额</b>{{ scope.row.payment_info.rmb_total_amount || '--' }}</li>
                <li><b>收款人</b>{{ scope.row.payment_info.receipt_account_name || '--' }}</li>
                <li><b>收款日期</b>{{ scope.row.payment_info.payment_date || '--' }}</li>
                <li><b>创建时间</b>{{ scope.row.payment_info.create_time || '--' }}</li>
                <li><b>收款方式/账户</b>{{ scope.row.payment_info.receipt_account ? (`${scope.row.payment_info.receipt_account_name}/${scope.row.payment_info.receipt_account}`) : '--' }}</li>
              </ul>
              <router-link :to="'receive-detail?id=' + scope.row.payment_id">{{scope.row.payment_id}}</router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="应收款ID"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-tooltip placement="right">
              <ul slot="content" class="more-tip" v-if="scope.row.bills_info">
                <li><b>应收金额</b><span class="color-orange">{{scope.row.bills_info.rmb_total_amount || '--'}}</span></li>
                <li><b>结算方</b>{{scope.row.bills_info.distributor_org_name || '--'}}</li>
                <li><b>收款ID</b>{{scope.row.bills_info.id || '--'}}</li>
                <li><b>项目名称</b>{{scope.row.bills_info.item_name || '--'}}</li>
                <li><b>订单编号</b>{{scope.row.bills_info.order_no || '--'}}</li>
                <li><b>游客人数</b>{{scope.row.bills_info.num || '--'}}</li>
                <li><b>已收</b><span class="color-orange">{{scope.row.bills_info.rmb_receipted_amount || '--'}}</span></li>
                <li><b>创建时间</b>{{scope.row.bills_info.create_time || '--'}}</li>
                <li><b>操作人</b>{{scope.row.bills_info.user_name || '--'}}</li>
              </ul>
              <router-link :to="'income-detail?bid=' + scope.row.bill_id">{{scope.row.bill_id}}</router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="认款金额"
          header-align="center"
          align="right"
          width="100">
          <template slot-scope="scope">
            <span style="color:#FF6000;">{{scope.row.rmb_total_amount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="认款状态"
          header-align="center"
          align="center"
          width="100">
          <template slot-scope="scope">
            <span :class="scope.row.payment_status | getStatusColor">{{ allData.payment_status_list[scope.row.payment_status] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="认款时间"
          header-align="center"
          align="center"
          width="140" />
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
          label="操作"
          align="center"
          width="100"
          fixed="right">
          <template slot-scope="scope">
            <template v-if="!isShowOperate(scope.row.edit, scope.row)">--</template>
            <el-dropdown v-else trigger="click" @command="handleOperate">
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
            </el-dropdown>
          </template> 
        </el-table-column>
      </el-table>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog :title="oper.title + '认款'" :visible.sync="dialogOperVisible">
      <el-form 
        :model="cancelForm.data"
        :rules="cancelForm.rules"
        ref="cancelForm"
        label-width='100px'>
        <el-form-item :label="oper.title + '说明'" required prop="info">
          <el-input type="textarea" v-model="cancelForm.data.info" auto-complete="off"/>
        </el-form-item>
        <span class="color-red">注：{{ oper.title }}记录后将无法恢复</span>
      </el-form>
      <div slot="footer">
        <el-button @click="handleOper(0)">取 消</el-button>
        <el-button type="primary" @click="handleOper(1)" :disabled="btn_disable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  allRenkuanList,
  reissueRenkuan,
  scrapRenkuan,
  cancelRenkuan
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
      PAYMENT_STATUS_MAP: {},
      btn_disable:false,
      formLabelWidth:'80px',
      searchInput:{ },
      searchData:{
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        order_no: query.order_no || '',
        bill_id: query.bill_id || '',
        id: query.id || '',
        payment_id: query.payment_id || '',
        payment_status: query.payment_status || '',
        user_name: query.user_name ||  '',
        page: parseInt(query.page) ||  1
      },
      createTime: [query.create_time_start, query.create_time_end],
      totalPage: parseInt(query.page) ||  1,
      currentPage: 1,
      pageShow: true,
      allData: {},
      tableData: [],
      paymentStatusName:{
        1: '有效',
        2: '已撤销',
        3: '待审核',
        4: '审核通过',
        5: '审核不通过',
      },
      isZhike: false,
      dialogOperVisible: false,
      oper:{
        title: ''
      },
      dialogData: '',
      cancelForm: {
        data: {
          id: '',
          info: ''
        },
        rules: {info: [{required: true, message: '说明不能为空'}]}
      }
    }
  },
  created(){
  },
  computed:{
    reissueRenkuanFunc(){
      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return saleReissueRenkuan;
      // case 'operator':
      //   return jidiaoReissueRenkuan;
      // case 'finance':
        return reissueRenkuan;
      // }
    },
    scrapRenkuanFunc(){
      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return saleIncomeInfo;
      // case 'operator':
      //   return opIncomeInfo;
      // case 'finance':
        return scrapRenkuan;
      // }
    },
    cancelRenkuanFunc(){
      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return saleCancelRenkuan;
      // case 'operator':
      //   return jidiaoCancelRenkuan;
      // case 'finance':
        return cancelRenkuan;
      // }
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
    isShowOperate(edit, data) {
      if (Array.isArray(edit)) {
        return edit.some(e => this.isShowOperate(e, data));
      }
      switch (edit) {
        case 1: 
          // 查看认款
          return this.$menuPermission('settlement/recpay/recrec/getrecdet');
        case 2:
          // 撤销认款
          return this.$menuPermission('settlement/recpay/recrec/cancalrec');
        case 3:
          // 重新发起
          return this.$menuPermission('settlement/recpay/recrec/reapprec');
        case 4:
          // 作废认款
          return this.$menuPermission('settlement/recpay/recrec/discardrec');
        default:
          return false;
      }
    },
    handleOperate(cmd) {
      const {o, data} = cmd;
      switch (o) {
        case 1:
          this.goto(
            'renkuan-detail',
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
          this.cancelForm.data.id = data.id;
          break;
        case 3:
          this.$confirm(
            '确认重新发起收款？',
            '重新发起',
            {type: 'warning'}
          ).then(() =>{
            this.reissueRenkuanFunc({
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
          this.cancelForm.data.id = data.id;
          break;
        default:
          return true;
      }
    },
    handleChangeCreateTime(date) {
      this.searchInput.create_time_start = date[0] || '';
      this.searchInput.create_time_end = date[1] || '';
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
      allRenkuanList({
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
            this.PAYMENT_STATUS_MAP = data.payment_status_list || {};
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
          const func = this.oper.title == '作废' ? this.scrapRenkuanFunc : this.cancelRenkuanFunc;
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
.more-tip{
  li{
    padding-left: 90px;
  }
  b{
    float: left;
    font-weight: 400;
    width: 80px;
    text-align: right;
    margin-left: -90px;
  }
}
</style>
