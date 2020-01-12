<template>
  <!-- 已不使用页面  by qzhchen 20181011 -->
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <div class="search-item">
        <div class="label" style="width:auto;">应收款编号</div>
        <el-input v-model="searchInput.bill_no" placeholder="应收款编号"/>
      </div>
      <div class="search-item calendar">
        <div class="label">认款时间</div>
        <el-date-picker 
          v-model="searchInput.create_time_start" 
          type="date" 
          placeholder="开始日期" 
          :editable="false" 
          :picker-options="create_time_start_opts"
        />
        <div class="label zhi">-</div>
        <el-date-picker 
          v-model="searchInput.create_time_end" 
          type="date" 
          placeholder="结束日期" 
          :editable="false" 
          :picker-options="create_time_end_opts"
        />
      </div>
      <div class="search-item">
        <div class="label">认款ID</div>
        <el-input v-model="searchInput.payment_no" placeholder="认款ID"/>
      </div>
      <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchInput.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(status, key) in paymentStatusMap" :key="key" :label="status" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">操作人</div>
        <el-input v-model="searchInput.user_name" placeholder="操作人"/>
      </div>
      
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="payment_no" label="认款ID" align="center" width="180" :resizable="false"/>
            <el-table-column prop="order_no" label="订单号" align="center" width="180" :resizable="false"/>
            <el-table-column prop="item_no" label="应收款编号" align="center" width="180" :resizable="false"/>
            <el-table-column label="认款金额" header-align="center" align="right" width="140" :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="认款状态" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span :class="scope.row.payment_status | getStatusColor">{{ paymentStatusMap[scope.row.payment_status] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="认款时间" align="center" width="150" :resizable="false"/>
            <el-table-column prop="user_name" label="操作人" align="center" :resizable="false"/>
            <el-table-column label="操作" align="center" width="120" fixed="right" >
              <template slot-scope="scope">
                <a v-if="$menuPermission('api/finance/cancel_renkuan') && scope.row.payment_status == 3" href="javascript:;" @click="handleCancelRenkuan(scope.row)">撤销</a>
                <a v-else-if="checkShowCancelPerm(scope.row)" href="javascript:;" @click="handleShowDetail('撤销记录', scope.row)">撤销记录</a>
                <a v-else-if="$menuPermission('api/finance/cancel_renkuan_info') && scope.row.payment_status > 6" href="javascript:;" @click="handleShowDetail('核销详情', scope.row)">核销详情</a>
                <a v-else-if="$menuPermission('api/finance/cancel_renkuan_info') && scope.row.payment_status > 3" href="javascript:;" @click="handleShowDetail('核实详情', scope.row)">核实详情</a>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination 
        layout="prev, pager, next" 
        :current-page="searchData.page" 
        @current-change="handleCurrentChange" 
        :page-count="totalPage"/>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      size="tiny">
      <el-form v-if="dialogType == 'cancelAction'" :model="cancelForm.data" :rules="cancelForm.rules" ref="cancelForm">
        <el-form-item label="撤销说明" required prop="info">
          <el-input type="textarea" v-model="cancelForm.data.info" auto-complete="off"/>
        </el-form-item>
        <span class="color-red">注：撤销认款记录后将无法恢复</span>
      </el-form>

      <template v-if="dialogType == 'detail'">
        <template v-for="(data, idx) in dialogData">
          <div v-if="data.cancel_status == 1 || data.cancel_status == 6" :key="idx" class="record">
            <div>撤销人：{{ data.user_name }}</div>
            <div>撤销时间：{{ data.create_time }}</div>
            <div>撤销说明：{{ data.info }}</div>
          </div>
          <div v-else-if="data.cancel_status < 4" :key="idx" class="record">
            <div>核实时间：{{ data.create_time }}</div>
            <div>核实状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
          <div v-else :key="idx" class="record">
            <div>核销时间：{{ data.create_time }}</div>
            <div>核销状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
        </template>
      </template>
      <div slot="footer" v-if="dialogType == 'cancelAction'" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitDialog">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div slot="footer" v-else class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saleRenkuanList, saleCancelRenkuan, saleCancelRenkuanInfo, cancelRenkuanInfo } from 'src/api/api';
import * as format from 'src/utils/format';
export default {
  name: 'SalePeerRecord',
  filters: {
    getStatusColor(status){
      switch(status) {
        case 5: 
          return 'color-red';
        case 1: 
        case 7: 
          return 'color-green';
        case 2:
        case 8:
          return 'color-gray';
        case 3:
        default:
          return '';
      }
    }
  },
  data() {
    return {
      searchInput: {
        payment_id: this.$route.params.id || '',
        settlement_org_id: this.$route.query.id || '',
        payment_status:'',
        payment_no:'',
        order_no:'',
        payment_no:'',
        create_time_start: '',
        create_time_end:  '',
        payment_status: ''
      },
      searchData: {
        page: 1,
        page_size: 10,
        payment_status:'',
        payment_no:'',
        create_time_start: '',
        create_time_end:  '',
        payment_status:'1'
      },
      paymentStatusMap: {},
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      tableData: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogType: '',
      dialogData: '',
      cancelForm: {
        data: {
          id: '',
          info: ''
        },
        rules: {info: [{required: true, message: '撤销说明不能为空'}]}
      }
    };
  },
  computed: {
    create_time_start_opts(){
      let endDate = this.searchInput.create_time_end;

      if(endDate){
        endDate = new Date(endDate);
      }

      return {
        disabledDate(date) {
          return endDate && date > endDate;
        }
      };
    },
    create_time_end_opts(){
      let startDate = this.searchInput.create_time_start;

      if(startDate){
        startDate = new Date(startDate);
      }
      
      return {
        disabledDate(date) {
          return startDate && date < startDate;
        }
      };

    },
  },
  mounted() {
    this.getList(true);
  },
  methods: {
    // change(){
    //   this.form.account_no="";
    // },
    handleCurrentChange(val) {
      if(this.searchData.page != val){
        this.searchData.page = val;
        this.getList();
      }
    },
    getList(bool) {

      if (bool) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
        if(this.searchData.create_time_start){
          this.searchData.create_time_start = format.date(this.searchData.create_time_start);
        }
        if(this.searchData.create_time_end){
          this.searchData.create_time_end = format.date(this.searchData.create_time_end);
        }
      }else{
        this.searchInput = {... this.searchData};
      }

      saleRenkuanList({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.page_index;
            this.paymentStatusMap = data.data.payment_status_list || {};
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    checkShowCancelPerm(record){
      if(record.renkuan_role == 2){
        return this.$menuPermission('api/tuan/sale_cancel_renkuan_info') && record.payment_status == 2;
      }else{
        return this.$menuPermission('api/finance/cancel_renkuan_info') && record.payment_status == 2;
      }
    },
    handleCancelRenkuan(record){
      if(!record){
        return false;
      }

      this.dialogVisible = true;
      this.dialogTitle = '撤销';
      this.dialogData = record;
      this.dialogType = 'cancelAction';
      if(this.$refs.cancelForm){
        this.$refs.cancelForm.resetFields();
      }
      this.cancelForm.data.id = record.id;
    },
    handleShowDetail(title, record){
      let cancelFunc = cancelRenkuanInfo, data = {id: record.id, type: 2};

      if(title == '撤销记录'){
        if(record.renkuan_role == 2){
          cancelFunc = saleCancelRenkuanInfo;
          data = {id: record.id};
        }else{
          data.type = 1;
        }
      }

      cancelFunc({
        params: {data},
        success: ({data}) => {
          if (data.code == '0') {
            this.dialogVisible = true;
            this.dialogData = data.data;
            this.dialogTitle = title;
            this.dialogType = 'detail';

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSubmitDialog(){
      if(this.dialogType == 'cancelAction' && this.$refs.cancelForm) {
        
        this.$refs.cancelForm.validate((result) => {
          
          if(!result){
            return false;
          }
          saleCancelRenkuan({
            params: {data: this.cancelForm.data},
            success: ({data}) => {
              if (data.code == '0') {
                this.dialogVisible = false;
                this.getList(true);

              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.record-title {
  display: block;
  margin: 20px 0;
  text-align: left;
  font-size: 14px;

  th {
    color: #777;
  }
  td {
    padding-right: 20px;
    font-size: 18px;
    color: #555;
  }
}

.color-red{color: red;}
.dialog-footer{text-align: center;}
.record{margin-bottom: 20px;}

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

.tool a {
  display: inline-block;
  color: #20a0ff;
}

.foot-btn {
  text-align:center;
}
.form-content {

  .el-form {
    width: 680px;

    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
}

</style>
