<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">认款状态</div>
        <el-select v-model="searchData.payment_status" placeholder="全部">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(val, key) in RENKUAN_STATUS_MAP" :label="val" :value="key" :key="key"></el-option>
          <el-option label="已撤销" value="2"></el-option>
          <el-option label="待核实" value="3"></el-option>
          <!-- <el-option label="核实通过" value="4"></el-option> -->
          <el-option label="核实不通过" value="5"></el-option>
          <el-option label="待核销" value="6"></el-option>
          <el-option label="已核销" value="7"></el-option>
          <el-option label="核销不通过" value="8"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label" style="width:auto;">认款编号</div>
        <el-input v-model="searchData.payment_no" placeholder="认款编号"></el-input>
      </div>
      <div class="search-item">
        <div class="label" style="width:auto;">订单编号</div>
        <el-input v-model="searchData.order_no" placeholder="订单编号"></el-input>
      </div>
      <div class="search-item">
        <div class="label" style="width:auto;">应收款编号</div>
        <el-input v-model="searchData.bill_no" placeholder="应收款编号"></el-input>
      </div>
      <div class="search-item calendar">
        <div class="label">认款时间</div>
        <el-date-picker v-model="date_start" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"></el-date-picker>
        <div class="label zhi">-</div>
        <el-date-picker v-model="date_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions1"></el-date-picker>
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
            <el-table-column prop="payment_no" label="认款编号" header-align="center" align="left" width="180" :resizable="false">
            </el-table-column>
            <el-table-column prop="order_no" label="订单编号" header-align="center" align="left" width="180" :resizable="false">
            </el-table-column>
            <el-table-column prop="item_no" label="应收款编号" header-align="center" align="left" width="180" :resizable="false">
            </el-table-column>
            <el-table-column label="认款金额" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">￥{{scope.row.rmb_total_amount}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="payment_status_name" label="认款状态" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-green"
                  v-if="scope.row.payment_status == 1 || scope.row.payment_status == 7"
                >
                  {{scope.row.payment_status_name}}
                </span>
                <span class="color-red"
                  v-else-if="scope.row.payment_status == 5 || scope.row.payment_status == 8"
                >
                  {{scope.row.payment_status_name}}
                </span>
                <span class="color-gray"
                  v-else-if="scope.row.payment_status == 2"
                >
                  {{scope.row.payment_status_name}}
                </span>
                <span v-else>
                  {{scope.row.payment_status_name}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="认款时间" align="center" min-width="200" :resizable="false">
            </el-table-column>
            <el-table-column prop="user_name" label="操作人" align="center" width="180" :resizable="false">
            </el-table-column>
            <el-table-column label="操作" align="center" width="280" fixed="right" >
              <template slot-scope="scope">
                <!-- <template v-if="$menuPermission('api/finance/payment_cancel')&&scope.row.payment_status==1">
                  <el-button type="text" @click="cancel_dialog(scope.row)">撤销</el-button>
                </template> -->
                <template v-if="!Array.isArray(scope.row.edit) || scope.row.edit.length == 0">
                  --
                </template>
                <template v-else v-for="et in scope.row.edit">
                  <el-button type="text" :key="et" @click="editDialog(scope.row.id,et,RENKUAN_EDIT_MAP[et])">{{RENKUAN_EDIT_MAP[et]}}</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage">
      </el-pagination>
    </div>
    <el-dialog :title="dialog_title" :visible.sync="dialogVisible">
      <el-form>
        <template v-if="dialogForm.type==1">
          <el-form-item label="撤销说明" required>
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="提示" required>
            <span style="color:red;">撤销后该记录就无法恢复</span>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==2">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>撤销人：{{data.user_name}}</div>
            <div>撤销时间：{{data.create_time}}</div>
            <div>撤销说明：{{data.info}}</div>
          </div>
        </template>  
        <template v-if="dialogForm.type==3||dialogForm.type==5">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==4">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>{{data.cancel_type==3?"核销":"核实"}}时间：{{data.create_time}}</div>
            <div>{{data.cancel_type==3?"核销":"核实"}}状态：{{data.cancel_status_name}}</div>
            <div>操作人：{{data.user_name}}</div>
            <div>备注：{{data.info}}</div>
          </div>
        </template> 
        <template v-if="dialogForm.type==6">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==7">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>{{data.cancel_type==3?"核销":"核实"}}时间：{{data.create_time}}</div>
            <div>{{data.cancel_type==3?"核销":"核实"}}状态：{{data.cancel_status_name}}</div>
            <div>操作人：{{data.user_name}}</div>
            <div>备注：{{data.info}}</div>
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
import { renkuanList , cancelRenkuan , heshiRenkuan , hexiaoRenkuan , cancelRenkuanInfo} from 'src/api/api'
import * as format from 'src/utils/format';
export default {
  name: 'recieve-record',
  data() {
    return {
      RENKUAN_EDIT_MAP: ['撤销','撤销记录','核实','核实详情','重新核实','核销','核销详情'],
      RENKUAN_STATUS_MAP: {},
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
      date_start:'',
      date_end:'',
      searchDataOrigin:{
        payment_status:'',
        payment_no:'',
        bill_no:'',
        order_no:''
      },
      searchData: {
        payment_status:'',
        create_time_start: "",
        create_time_end:  "",
        payment_no:'',
        bill_no:'',
        order_no:''
      },
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      tableData: []
    }
  },
  computed:{
    datepickerOptions1(){
      let depart_date = this.date_start;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      }
    },
    datepickerOptions2(){
      let depart_date = this.date_end;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      }
    }
  },
  methods: {
    // change(){
    //   this.form.account_no="";
    // },
    editDialog(id,type,title){
      this.dialog_title=title;
      this.dialogForm.info='';
      this.dialogForm.id=id;
      this.dialogForm.type=type;
      this.dialogVisible=true;
      if(type==2||type==4||type==7){
        let r_type="";

        if(type==2){
          r_type=1;
        }else{
          r_type=2;
        }
        this.record(id,r_type);
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
      }
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
    },
    action(row){
      if(!this.cancel_form.cancel_info){
        this.$message.error('请填写撤销说明');
        return false;
      }
      
    },
    record(id,type){
      let params={
        data:{
          id:id,
          type:type
        }
      },_this=this;

      cancelRenkuanInfo({
        params: params,
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
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    getList(bool) {
      this.searchData.create_time_start = this.date_start ? format.date(this.date_start) : "";
      this.searchData.create_time_end = this.date_end ? format.date(this.date_end) : "";

      let params = {
        data: this.searchData
      };

      if (bool) {
        this.totalPage=1;
        this.currentPage= 1;
        this.page=1;
        this.searchDataOrigin.payment_status = this.searchData.payment_status || '';
        this.searchDataOrigin.payment_no = this.searchData.payment_no || '';
        this.searchDataOrigin.bill_no = this.searchData.bill_no || '';
        this.searchDataOrigin.order_no = this.searchData.order_no || '';
        this.searchData.create_time_start = this.date_start ? format.date(this.date_start) : "";
        this.searchData.create_time_end = this.date_end ? format.date(this.date_end) : "";
      }else{
        this.searchData.payment_status = this.searchDataOrigin.payment_status;
        this.searchData.payment_no = this.searchDataOrigin.payment_no;
        this.searchData.bill_no = this.searchDataOrigin.bill_no;
        this.searchData.order_no = this.searchDataOrigin.order_no;
        this.create_time_start = this.searchData.create_time_start;
        this.create_time_end = this.searchData.create_time_end;
      }

      params.data.page = this.page;
      params.data.payment_id=this.$route.query.id;
      renkuanList({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tableData = data.data.list;
            this.RENKUAN_EDIT_MAP = data.data.renkuan_edit;
            this.RENKUAN_STATUS_MAP = data.data.renkuan_status;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.page_index;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getList();
  }
}
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
.record{
  margin-bottom:20px;
}

</style>
