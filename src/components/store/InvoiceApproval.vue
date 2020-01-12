<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">审核中发票</li>
        <router-link tag="li" v-if="$menuPermission('api_store/invoice/finance_lists')" :to="{path:'/store-finace/invoice-list'}">
          收入发票
        </router-link>
      </ul>
      <template v-if="$menuPermission('api_store/invoice/finance_add')">
        <div class="btn">
          <router-link
            class="el-button el-button--primary" 
            :to="{path: '/store-finace/invoice-add', query: {}}"
          >+ 添加开票</router-link>
        </div>
      </template>
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
          <el-table-column label="操作" align="center" width="100" fixed="right">
            <template slot-scope="scope">
              <router-link 
                v-if="scope.row.status == 0 && $menuPermission('api_store/invoice/audit_invoice')" 
                :to="{path: `/store-finace/invoice-detail`, query: {id:scope.row.id}}"
              >审核</router-link>
              <router-link 
                v-else-if="(scope.row.status == 1 || scope.row.status == -1)&& $menuPermission('api_store/invoice/finance_detail')" 
                :to="{path: `/store-finace/invoice-detail`, query: {id:scope.row.id}}"
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
import {invoiceAuditList} from 'src/api/api_store'
import InputNumber from 'src/plugins/InputNumber.vue';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
export default {
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
      all_wait_income_amount: 0,
      all_wait_cost_amount: 0,
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
      tableData: [],
      totalPage: 1,
      currentPage: 1,
      pageShow: true
    }
  },
  methods: {
    invoiceAuditList (type) {
      if (type) {
        this.totalPage = 1
        this.currentPage = 1
        this.searchDataParams = {...this.searchData}
        this.searchDataParams.start_time = this.invoice_date[0]
        this.searchDataParams.end_time = this.invoice_date[1]
        this.searchDataParams.page = 1
      } else {
        this.searchData = {...this.searchDataParams}
        this.invoice_date = [this.searchDataParams.start_time, this.searchDataParams.end_time]
      }
      let params = {
        data: this.searchDataParams
      }
      invoiceAuditList({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.all_wait_income_amount = result.data.all_wait_income_amount
            this.all_wait_cost_amount = result.data.all_wait_cost_amount
            this.tableData = result.data.data
            this.STATUS_MAP = result.data.cfg_status
            this.TYPE_MAP = result.data.cfg_type
            this.totalPage = result.data.total_page
            this.currentPage = result.data.page_index
          } else {
            this.$message({
              type: 'error',
              message: resutl.msg
            })
          }
        },
        showLoading: true
      })
    },
    handleCurrentChange(val){
      if(val != this.searchDataParams.page){
        this.searchDataParams.page = val;
        this.invoiceAuditList();
      }
    }
  },
  mounted () {
    this.invoiceAuditList()
  },
}
</script>
<style lang="less" scoped>
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
