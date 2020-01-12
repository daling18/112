<template>
  <!-- 已不使用页面  by qzhchen 20181011 -->
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li v-if="$menuPermission('api/finance/check_receipt_list')"><router-link :to="{path:'/finace/approval/proceeds'}">收款审核（{{ pendingProceedsCount }}）</router-link></li>
        <li class="on">认款审核（{{ pendingRecognitionCount }}）</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchData.payment_status" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in PAYMENT_STATUS_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <search-item-date-range label="认款时间" v-model="createTime"/>
      <div class="search-item">
        <div class="label long-label">应收款编号</div>
        <el-input v-model="searchData.bill_no" placeholder="应收款编号"/>
      </div>
      <div class="search-item">
        <div class="label">认款编号</div>
        <el-input v-model="searchData.payment_no" placeholder="收款编号"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list" style="margin-top:15px;">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="payment_no" label="认款ID" align="center" width="154"/>
          <el-table-column label="认款金额" align="right" width="100">
            <template slot-scope="scope">
              <span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="receipt_payment_no" label="所属收款编号" align="center" width="160"/>
          <el-table-column prop="item_no" label="应收款编号" align="center" width="180"/>
          <el-table-column label="认款状态" align="center" width="94">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status | getStatusColor">{{ PAYMENT_STATUS_MAP[scope.row.payment_status] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="认款时间" align="center" width="130">
            <template slot-scope="scope">
              <span class="color-gray">{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="user_name" label="操作人" align="center" width="120">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="180">
            <template slot-scope="scope">
              <template v-if="Array.isArray(scope.row.edit) && scope.row.edit.length > 0">
                <a 
                  v-for="val in scope.row.edit"
                  :key="val"
                  href="javascript:;"
                  @click="handleOperate(scope.row, val)"
                >{{ EDIT_MAP[val] }}</a>
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
    <el-dialog :title="dialog_title" :visible.sync="dialogVisible">
      <el-form>
        <template v-if="dialogForm.type==1">
          <el-form-item label="撤销说明" required>
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="提示" required>
            <span style="color:red;">撤销后该记录就无法恢复</span>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==2">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>撤销人：{{ data.user_name }}</div>
            <div>撤销时间：{{ data.create_time }}</div>
            <div>撤销说明：{{ data.info }}</div>
          </div>
        </template>  
        <template v-if="dialogForm.type==3||dialogForm.type==5">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==4">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>{{ data.cancel_type == 3 ? "核销" : "核实" }}时间：{{ data.create_time }}</div>
            <div>{{ data.cancel_type == 3 ? "核销" : "核实" }}状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
        </template> 
        <template v-if="dialogForm.type==6">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==7">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>{{ data.cancel_type==3?"核销":"核实" }}时间：{{ data.create_time }}</div>
            <div>{{ data.cancel_type==3?"核销":"核实" }}状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
        </template> 
      </el-form>
      <div slot="footer">
        <template v-if="dialogForm.type==1">
          <el-button type="primary" @click="sure(0)" :disabled="btn_disable">保存</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==3">
          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">核实通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==5">

          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">重新核实通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">重新核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==6">
          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">核销通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">核销不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==2||dialogForm.type==4||dialogForm.type==7">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </template>       
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cancelRenkuan , heshiRenkuan , hexiaoRenkuan , cancelRenkuanInfo} from 'src/api/api';
import { checkRenkuanList } from 'src/api/finance';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
export default {
  name: 'ApprovalRecognition',
  components: {
    SearchItemDateRange
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 5: 
      case 8: 
        return 'color-red';
      case 1:
      case 4: 
      case 7:
        return 'color-green';
      case 2:
        return 'color-gray';
      case 3:
      default:
        return '';
      }
    }
  },
  data() {
    return {
      createTime: ['', ''],
      // paymentDate: ['', ''],
      searchData:{
        payment_status: '',
        payment_no:'',
        bill_no:'',
        page: 1,
        page_size: 10
      },
      searchDataParams:{
        create_time_start:'',
        create_time_end:'',
        // payment_date_start:'',
        // payment_date_end:'',
        payment_status: '',
        payment_no:'',
        bill_no:'',
        page: 1,
        page_size: 10,
      },
      totalPage: 1,
      pageShow: true,
      pendingProceedsCount: 0,
      pendingRecognitionCount: 0,
      PAYMENT_STATUS_MAP: {},
      EDIT_MAP: {},
      tableData: [],
      btn_disable:false,
      dialogForm:{
        type:'',
        info:'',
        id:'',
      },
      cancel_record_data:{

      },
      dialogVisible:false,
      dialog_title:'',
    };
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
    },
  },
  mounted() {
    this.getList(true);
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
        this.searchDataParams.create_time_start = this.createTime[0];
        this.searchDataParams.create_time_end = this.createTime[1];
        // this.searchDataParams.payment_date_start = this.paymentDate[0];
        // this.searchDataParams.payment_date_end = this.paymentDate[1];
      }else{
        // const {payment_date_start, payment_date_end} = this.searchDataParams;
        const {create_time_start, create_time_end} = this.searchDataParams;
        this.searchData = {... this.searchDataParams};
        // this.paymentDate = [payment_date_start, payment_date_end];
        this.createTime = [create_time_start, create_time_end];
      }

      checkRenkuanList({
        params: {data: this.searchDataParams},
        success: (resp) => {
          const {data, code, msg} = resp.data;

          if (code == '0' && data) {
            this.pendingProceedsCount = data.tab_count && data.tab_count.receipt_count || 0;
            this.pendingRecognitionCount = data.tab_count && data.tab_count.renkuan_count || 0;
            this.PAYMENT_STATUS_MAP = data.payment_status_list || {};
            this.EDIT_MAP = data.edit_list || {};
            this.tableData = data.list,
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
    handleOperate(data, type){
      this.dialog_title = this.EDIT_MAP[type];
      this.dialogForm.info = '';
      this.dialogForm.id = data.id;
      this.dialogForm.type = type;
      this.dialogVisible=true;
      if(type==2||type==4||type==7){
        cancelRenkuanInfo({
          params: {data: {
            id: data.id, 
            type: type == 2 ? 1 : 2 // 撤销: 1, 核实核销: 2
          }},
          success: (params) => {
            let data = params.data;

            if (data.code == '0') {
              this.dialogVisible=true;
              this.cancel_record_data=data.data;

            } else {
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }
    },
    sure(status){
      let api='';

      this.dialogForm.status=status;

      if(this.dialogForm.type==1){
        api=cancelRenkuan;
      }
      if(this.dialogForm.type==3||this.dialogForm.type==5){
        api=heshiRenkuan;
      }
      if(this.dialogForm.type==6){
        api=hexiaoRenkuan;
      }

      this.btn_disable=true;

      let params={
        data:this.dialogForm
      };
      api({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == '0') {
            this.$message.success(data.msg);
            this.dialogVisible=false;
            this.getList();
          } else {
            this.$message.error(data.msg);

          }
          this.btn_disable=false;
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
.system-search .search-item .label.long-label{
  width: 75px;
  margin-left: -80px;
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
.record{
  margin-bottom:20px;
}

</style>
