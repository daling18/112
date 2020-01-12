<template>
  <div class="wrapper">
    <div class="system-tab" v-if="topMenuConst === 'store-sale'">
      <ul class="tab-box">
        <li class="on">发票</li>
      </ul>
      <template v-if="$menuPermission('api_store/invoice/sale_add')">
        <div class="btn">
          <router-link
            class="el-button el-button--primary" 
            :to="{path: '/store-sale/invoice-add', query: {}}"
          >+ 添加开票</router-link>
        </div>
      </template>
    </div>
    <div class="system-tab" v-else-if="topMenuConst === 'store-finace'">
      <ul class="tab-box">
        <router-link :to="{path: '/store-finace/invoice-approval'}" tag="li">审核中发票</router-link>
        <li class="on">收入发票</li>
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
    <div class="system-header" v-if="topMenuConst === 'store-finace'">
      <el-row>
        <el-col :span="6">
          总待开金额&ensp;
          <span class="color-orange">{{ wait_invoice_amount }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="system-search">
      <search-item-date-range v-model="create_time" label="开票日期"/>
      <div class="search-item">
        <div class="label">经手人</div>
        <el-input v-model="searchData.operater_name" placeholder="经手人"/>
      </div>
      <div class="search-item">
        <div class="label">发票号码</div>
        <el-input v-model="searchData.invoice_number" placeholder="发票号码"/>
      </div>
      <div class="search-item">
        <div class="label">发票抬头</div>
        <el-input v-model="searchData.raised_org_name" placeholder="发票抬头"/>
      </div>
      <div class="search-item">
        <div class="label">发票金额</div>
        <input-number  v-model="searchData.amount" number :precision="3" placeholder="发票金额" />
      </div>
      <div class="search-item">
        <div class="label long-label">项目号/名称</div>
        <el-input v-model="searchData.item_info" placeholder="项目号/名称"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="list(true)">立即搜索</el-button>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list" style="margin-top:15px;">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="apply_no" label="申请单号" align="center" width="150" :resizable="false"/>
          <el-table-column prop="invoice_date" label="开票日期" align="center" width="100" :resizable="false"/>
          <el-table-column label="开票金额" align="right" width="80" :resizable="false">
            <template slot-scope="scope">
              <span class="color-orange">{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="invoice_number" label="发票号码" align="center">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.invoice_number">
                {{ scope.row.invoice_number }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="raised_org_name" label="对方单位名称（发票抬头）" align="center" width="200" :resizable="false">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.raised_org_name">
                {{ scope.row.raised_org_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="account_no" label="项目号/项目名称" align="center" min-width="200" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" v-for="(item, index) in scope.row.item_info" :key="index" :title="`${item.tuan_no}  ${item.tuan_name}`">{{ item.tuan_no }}&nbsp;&nbsp;{{item.tuan_name}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="operater_name" label="经手人" align="center" min-width="80" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.operater_name">{{ scope.row.operater_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="120" :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.status_name">{{scope.row.status_name}}<span v-if="scope.row.is_used_name">({{scope.row.is_used_name}})</span></span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <router-link 
                v-if="$menuPermission('api_store/invoice/sale_detail') && topMenuConst === 'store-sale'" 
                :to="{path: `/store-sale/invoice-detail`, query: {id:scope.row.id}}"
              >详情</router-link>
              <router-link 
                v-else-if="$menuPermission('api_store/invoice/finance_detail') && topMenuConst === 'store-finace'" 
                :to="{path: `/store-finace/invoice-detail`, query: {id:scope.row.id}}"
              >详情</router-link>
              <template v-if="scope.row.is_used == 1 && topMenuConst === 'store-finace'">
                <router-link 
                  v-if="scope.row.invoice_from === 2 && $menuPermission('api_store/invoice/todo_finance_add')"
                  :to="{path: `/store-finace/invoice-edit`, query: {id: scope.row.id}}"
                >编辑</router-link>
                <a 
                  v-if="$menuPermission('api_store/invoice/cancel_invoice')" 
                  href="javascript:;"
                  @click="handleInvalid(scope.row)"
                >作废</a>
              </template>
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
import {invoiceSaleLists, invoiceFinanceLists, invoiceAuditList, invoiceCancelInvoice} from 'src/api/api_store'
import {formattDate} from 'src/assets/js/common.js';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import InputNumber from 'src/plugins/InputNumber.vue';
export default {
  components: {
    SearchItemDateRange,
    InputNumber
  },
  data () {
    return {
      topMenuConst: this.$route.meta.topMenuConst,
      create_time: ['', ''],
      searchData: {
        start_time:'',
        end_time:'',
        operater_name:'',
        status:'',
        raised_org_name:'',
        amount:'',
        invoice_number: "",
        item_info: "",
        page: 1
      },
      searchDataParams: {
        start_time:'',
        end_time:'',
        operater_name:'',
        status:'',
        raised_org_name:'',
        amount:'',
        invoice_number: "",
        item_info: "",
        page: 1
      },
      tableData: [],
      totalPage: 1,
      currentPage: 1,
      pageShow: false,
      wait_invoice_amount: 0
    }
  },
  watch: {
    '$route': function () {
      this.topMenuConst = this.$route.meta.topMenuConst
      this.create_time = ['', '']
      this.searchData = {
        start_time:'',
        end_time:'',
        operater_name:'',
        status:'',
        raised_org_name:'',
        amount:'',
        invoice_number: "",
        item_info: "",
        page: 1
      }
      this.searchDataParams = {
        start_time:'',
        end_time:'',
        operater_name:'',
        status:'',
        raised_org_name:'',
        amount:'',
        invoice_number: "",
        item_info: "",
        page: 1
      }
      this.tableData = []
      this.totalPage = 1
      this.currentPage = 1
      this.pageShow = false
      this.wait_invoice_amount = 0
      this.list()
    }
  },
  methods: {
    list (type) {
      if (type) {
        this.totalPage = 1
        this.currentPage = 1
        this.searchDataParams = {...this.searchData}
        this.searchDataParams.start_time = this.create_time[0]
        this.searchDataParams.end_time = this.create_time[1]
        this.searchDataParams.page = 1
      } else {
        this.searchData = {...this.searchDataParams}
        this.create_time = [this.searchDataParams.start_time, this.searchDataParams.end_time]
      }
      let list = ''
      if (this.topMenuConst === 'store-sale') {
        list = invoiceSaleLists
      } else if (this.topMenuConst === 'store-finace') {
        list = invoiceFinanceLists
      }
      let params = {
        data: this.searchDataParams
      }
      list ({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.tableData = result.data.data
            this.currentPage = result.data.page_index
            this.totalPage = result.data.total_page
            if (this.tableData.length > 0) {
              this.pageShow = true
            }
            if (this.topMenuConst === 'store-finace') {
              this.wait_invoice_amount = result.data.wait_invoice_amount
            }
          } else {
            this.$message({
              type: 'error',
              message: result.data
            })
          }
        },
        showLoading: true
      })
    },
    handleCurrentChange (val) {
      if(val != this.searchDataParams.page){
        this.searchDataParams.page = val;
        this.list();
      }
    },
    handleInvalid (row) {
      this.$confirm(
        '发票记录作废后将无法恢复，确定作废该发票？',
        '确认提示',
        {type: 'warning'}
      ).then(() =>{
        invoiceCancelInvoice({
          params: { data: {id: row.id} },
          success:(res) => {
            let result = res.data
            if(result.code=='0'){
              this.$message({
                type: 'success',
                message: result.msg
              });
              this.list()
            }else{
              this.$message({
                type: 'error',
                message: result.msg
              });
            }
          },
          showLoading: true
        });
      }).catch((e)=>{
        console.log('取消', e);
      });
    }
  },
  mounted () {
    this.list()
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
