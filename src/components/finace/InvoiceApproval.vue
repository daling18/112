<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">发票审核</li>
        <router-link tag="li" v-if="$menuPermission('api/invoice/finance_income_lists')" :to="{path:'/finace/invoice/income'}">
          收入发票
        </router-link>
        <router-link tag="li" v-if="$menuPermission('api/invoice/finance_cost_lists')" :to="{path:'/finace/invoice/cost'}">
          成本回票
        </router-link>
      </ul>
    </div>
    <div class="system-header">
      <el-row>
        <el-col :span="6">
          待审批发票&ensp;
          <span class="color-orange">{{ all_wait_income_amount }}</span>
        </el-col>
        <el-col :span="8">
          待审批成本回票&ensp;
          <span class="color-orange">{{ all_wait_cost_amount }}</span>
        </el-col>
      </el-row>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="invoice_date" label="开票日期"/>
      <div class="search-item">
        <div class="label">开票方</div>
        <el-input v-model="searchData.cost_org_name" placeholder="开票方"/>
      </div>
      <div class="search-item">
        <div class="label long-label">申请单状态</div>
        <el-select v-model="searchData.status" placeholder="申请单状态">
          <el-option label="全部" value=""/>
          <el-option 
            v-for="(val, key) in STATUS_MAP"
            :label="val"
            :value="key"
            :key="key"
          />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">发票号码</div>
        <el-input v-model="searchData.invoice_number" placeholder="发票号码"/>
      </div>
      <div class="search-item">
        <div class="label">经手人</div>
        <el-input v-model="searchData.operater_name" placeholder="经手人"/>
      </div>
      <div class="search-item">
        <div class="label">开票金额</div>
        <input-number  v-model="searchData.amount" number :precision="3" placeholder="发票金额" />
      </div>
      <div class="search-item">
        <div class="label">发票抬头</div>
        <el-input v-model="searchData.income_org_name" placeholder="发票抬头"/>
      </div>
      <div class="search-item">
        <div class="label long-label">发票类型</div>
        <el-select v-model="searchData.type" placeholder="发票类型">
          <el-option label="全部" value=""/>
          <el-option 
            v-for="(val, key) in TYPE_MAP"
            :label="val"
            :value="key"
            :key="key"
          />
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getTableData(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list" style="margin-top:15px;">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="type_name" label="发票类型" align="center" width="90" :resizable="false"/>
          <el-table-column prop="apply_no" label="申请单号" align="center" width="150" :resizable="false"/>
          <el-table-column prop="invoice_date" label="开票日期" align="center" width="100" :resizable="false"/>
          <el-table-column
            prop="amount"
            label="开票金额"
            align="right"
            header-align="center"
            width="100"
            :resizable="false"
          >
            <template slot-scope="scope">
              <div class="color-orange">{{ scope.row.amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="invoice_number"
            label="发票号码"
            align="center"
            width="90"
            :resizable="false"
          />
          <el-table-column label="发票抬头" align="center" min-width="200" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.raised_org_name">{{ scope.row.raised_org_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="经手人" align="center" min-width="100" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.operater_name">{{ scope.row.operater_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="110" :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.is_used_name" class="color-red">{{ `${STATUS_MAP[scope.row.status]}(${scope.row.is_used_name})` }}</span>
              <span v-else :class="scope.row.status | getStatusColor">{{ STATUS_MAP[scope.row.status] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <!-- <template slot-scope="scope">
                <el-button v-if="$menuPermission('api/finance/edit_customer_payment')" type="text" size="small" @click="edit(scope.row.id)">编辑收款</el-button>
              </template> -->
            <template slot-scope="scope">
              <router-link 
                v-if="scope.row.status == 0 && $menuPermission('api/invoice/audit_invoice')" 
                :to="{path: `/finace/invoice/approval/detail`, query: {type:scope.row.type, id:scope.row.id}}"
              >审核</router-link>
              <router-link 
                v-else-if="scope.row.type == 1 && $menuPermission('api/invoice/finance_income_detail')" 
                :to="{path: `/finace/invoice/approval/income_detail`, query: {id:scope.row.id}}"
              >详情</router-link>
              <router-link 
                v-else-if="scope.row.type == 2 && $menuPermission('api/invoice/finance_cost_detail')" 
                :to="{path: `/finace/invoice/approval/cost_detail`, query: {id:scope.row.id}}"
              >详情</router-link>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import {auditInvoiceList} from 'src/api/invoice';
import InputNumber from 'src/plugins/InputNumber.vue';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
export default {
  name: 'InvoiceApproval',
  components: {
    SearchItemDateRange,
    InputNumber
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case -1: 
        return 'color-red';
      case 1:
        return 'color-green';
      default:
        return 'color-gray';
      }
    }
  },
  data () {
    return {
      STATUS_MAP: {},
      TYPE_MAP: {},
      invoice_date: ['', ''],
      searchData:{
        start_time:'',
        end_time:'',
        amount:'',
        operater_name:'',
        status:'',
        invoice_number:'',
        type: '',
        income_org_name: '',
        cost_org_name: '',
        page:1
      },
      searchDataParams: {
      },
      all_wait_income_amount: 0,
      all_wait_cost_amount: 0,
      tableData: [],
      totalPage: 1,
      currentPage:1,
      pageShow:true
    };
  },
  computed:{
    // dialogAttachmentVisible: {
    //   get: function(){
    //     return Array.isArray(this.attachments);
    //   },
    //   set: function(val){
    //     if(val == false){
    //       this.attachments = '';
    //     }
    //   }
    // },
  },
  mounted(){
    this.getTableData(true);
  },
  methods:{
    getTableData(isSearch){
      if (isSearch) {
        this.totalPage=1;
        this.currentPage= 1;
        this.searchDataParams = {... this.searchData};
        this.searchDataParams.start_time = this.invoice_date[0];
        this.searchDataParams.end_time = this.invoice_date[1];
        this.searchDataParams.page = 1;
      }else{
        this.searchData = {... this.searchDataParams};
        this.invoice_date = [this.searchDataParams.start_time, this.searchDataParams.end_time];
      }

      auditInvoiceList({
        params: { data: this.searchDataParams },
        success:(params) => {
          let data=params.data;
          if(data.code=='0'){
            this.remain_amount = data.data.remain_amount || 0;
            this.tableData = data.data.data;
            this.all_wait_income_amount = data.data.all_wait_income_amount || 0;
            this.all_wait_cost_amount = data.data.all_wait_cost_amount || 0;
            this.STATUS_MAP = data.data.cfg_status;
            this.TYPE_MAP = data.data.cfg_type;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.page_index;
          }else{
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },

    handleCurrentChange(val){
      if(val != this.searchDataParams.page){
        this.searchDataParams.page = val;
        this.getTableData();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .system-header {
    margin-bottom: 10px; 
    padding: 15px;
    background: #fff;
  }
  .system-search .search-item .long-label{
    width: 75px;
    margin-left: -80px
  }
</style>
