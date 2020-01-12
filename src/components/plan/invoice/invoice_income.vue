<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">收入发票</li>
        <!-- 成本回票在销售里面没有，就注释掉了 -->
        <!-- <router-link tag="li" v-if="$menuPermission('api/invoice/sale_cost_lists') && $route.meta.isSale" :to="{path:'/sale/saleinvoice/cost'}">
          成本回票
        </router-link> -->
        <router-link tag="li" v-if="$menuPermission('api/invoice/cost_lists') && !$route.meta.isSale" :to="{path:'/plan/planinvoice/cost'}">
          成本回票
        </router-link>
      </ul>
      <template v-if="$menuPermission('api/invoice/sale_todo_add_income') && $route.meta.isSale">
        <div class="btn">
          <router-link
            class="el-button el-button--primary" 
            :to="{path: '/sale/add-invoice', query: {}}"
          >+ 添加开票</router-link>
        </div>
      </template>
      <template v-else-if="$menuPermission('api/invoice/todo_add_income')">
        <div class="btn">
          <router-link
            class="el-button el-button--primary" 
            :to="{path: '/plan/planinvoice/add-invoice', query: {}}"
          >+ 添加开票</router-link>
        </div>
      </template>
    </div>
    <!-- system-search -->
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
    <!-- /system-search -->
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
              <!-- <span v-if="scope.row.status === 0">待审核</span>
              <span v-else-if="scope.row.status === 1">通过</span>
              <span v-else-if="scope.row.status === -1">审核不通过</span> -->
              <span v-if="scope.row.status_name">{{scope.row.status_name}}<span v-if="scope.row.is_used_name">({{scope.row.is_used_name}})</span></span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="60" fixed="right">
            <template slot-scope="scope">
              <router-link 
                v-if="$menuPermission('api/invoice/sale_income_detail') && $route.meta.isSale" 
                :to="{path: `/sale/invoice-detail`, query: {id:scope.row.id}}"
              >详情</router-link>
              <router-link 
                v-else-if="$menuPermission('api/invoice/income_detail')" 
                :to="{path: `/plan/planinvoice/invoice-detail`, query: {id:scope.row.id}}"
              >详情</router-link>
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
import {incomeLists, saleincomeLists}from 'src/api/invoice';
import {formattDate} from 'src/assets/js/common.js';

import InputNumber from 'src/plugins/InputNumber.vue';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'InvoiceIncome',
  components: {
    SearchItemDateRange,
    InputNumber
  },
  data () {
    return {
      create_time: ['', ''],
      searchData:{
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
      searchDataParams: {},
      tableData: [],
      totalPage: 1,
      currentPage:1,
      pageShow:true
    };
  },
  computed:{
  },
  mounted(){
    this.list(true);
  },
  methods:{
    list(isSearch) {
      if (isSearch) {
        this.totalPage=1;
        this.currentPage= 1;
        this.searchDataParams = {... this.searchData};
        this.searchDataParams.start_time = this.create_time[0];
        this.searchDataParams.end_time = this.create_time[1];
        this.searchDataParams.page = 1;
      }else{
        this.searchData = {... this.searchDataParams};
        this.create_time = [this.searchDataParams.start_time, this.searchDataParams.end_time];
      }
      let params = {
        data: this.searchDataParams
      }
      if(this.$route.meta.isSale) {
        saleincomeLists({
          params,
          success: (res) => {
            let resutlt = res.data
            if(resutlt.code === 0) {
              this.tableData = resutlt.data.data
              this.currentPage = resutlt.data.page_index;
              this.totalPage = resutlt.data.total_page
            } else {
              this.$message({
                type: 'error',
                message: resutlt.data,
              })
            }
          },
          showLoading: true
        })
      } else {
        incomeLists({
          params,
          success: (res) => {
            let resutlt = res.data
            if(resutlt.code === 0) {
              this.tableData = resutlt.data.data
              this.totalPage = resutlt.data.total_page
              this.currentPage = resutlt.data.page_index;
            } else {
              this.$message({
                type: 'error',
                message: resutlt.data,
              })
            }
          },
          showLoading: true
        })
      }
    },
    handleCurrentChange(val){
      if(val != this.searchDataParams.page){
        this.searchDataParams.page = val;
        this.list();
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
