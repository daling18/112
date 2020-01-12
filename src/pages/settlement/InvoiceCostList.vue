<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link tag="li" v-if="$menuPermission('settlement/invoice/income')" :to="{path:'/settlement/invoice/income/list', query: $route.query}">
          收入发票
        </router-link>
        <li class="on">
          成本回票
        </li>
      </ul>
      <template v-if="$menuPermission('settlement/invoice/cost/edit')">
        <div class="btn">
          <router-link
            class="el-button el-button--primary" 
            :to="{path: 'add', query: {parent_id: $route.query.id}}"
          >+ 上传成本票</router-link>
        </div>
      </template>
    </div>
    <div class="system-header">
      <el-row>
        <el-col :span="7">
          待回票金额&ensp;
          <span class="color-orange">{{ all_amount.wait_cost_invoice_amount }}</span> 元
        </el-col>
      </el-row>
      <el-row v-if="searchDataParams.org_id">
        <el-col :span="7">
          代理商：&ensp;{{ org_name }}
        </el-col>
      </el-row>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="invoice_date" label="开票日期"/>
      <div class="search-item">
        <div class="label">开票方</div>
        <el-input v-model="searchData.supply_org_name" placeholder="开票方"/>
      </div>
      <div class="search-item">
        <div class="label">经手人</div>
        <el-input v-model="searchData.operater_name" placeholder="经手人"/>
      </div>
      <div class="search-item">
        <div class="label">发票号码</div>
        <el-input v-model="searchData.invoice_number" placeholder="发票号码"/>
      </div>
      <!-- <div class="search-item">
        <div class="label">发票抬头</div>
        <el-input v-model="searchData.raised_org_name" placeholder="发票抬头"/>
      </div> -->
      <div class="search-item">
        <div class="label">发票金额</div>
        <input-number  v-model="searchData.amount" number :precision="3" placeholder="发票金额" />
      </div>
      <div class="search-item">
        <div class="label">发票状态</div>
        <el-select v-model="searchData.approval_status" placeholder="请选择发票状态">
          <el-option label="全部" value=""/>
          <el-option 
            v-for="(val, key) in APPROVAL_STATUS_MAP"
            :label="val"
            :value="key"
            :key="key"
          />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label long-label">项目号</div>
        <el-input v-model="searchData.item_info" placeholder="项目号" />
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getTableData(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list" style="margin-top:15px;">
        <invoice-cost-table :table-data="tableData" prefix-url="." @action="getTableData(true)"/>
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
import { allCostLists }from 'src/api/invoice';
import InputNumber from 'src/plugins/InputNumber.vue';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import InvoiceCostTable from './components/InvoiceCostTable.vue';

export default {
  name: 'InvoiceCost',
  components: {
    SearchItemDateRange,
    InputNumber,
    InvoiceCostTable
  },
  data () {
    return {
      APPROVAL_STATUS_MAP: {},
      invoice_date: ['', ''],
      searchData:{
        org_id: this.$route.query.id || '',   // 同行id
        start_time:'',
        end_time:'',
        status:'',
        supply_org_name: '',
        operater_name:'',
        raised_org_name:'',
        amount:'',
        is_used: '',
        invoice_number: '',
        item_info: '',
        page:1
      },
      searchDataParams: {
      },
      all_amount: 0,
      org_name: '',
      tableData: [],
      totalPage: 1,
      currentPage:1,
      pageShow:true
    };
  },
  computed:{
    // canEdit: {
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

      allCostLists({
        params: { data: this.searchDataParams },
        success:(params) => {
          let data=params.data;
          if(data.code=='0'){
            this.all_amount = data.data;
            this.org_name = data.data.org_name || '';
            this.tableData = data.data.data;
            this.APPROVAL_STATUS_MAP = data.data.cfg_approval_status;
            this.STATUS_MAP = data.data.cfg_status;
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
    },
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
