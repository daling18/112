<template>
  <div class="wrapper">
    <div class='system-tab'>
      <ul class="tab-box">
        <li v-if="topMenuConst === 'operator'" class="on">付款申请</li>
        <li v-if="topMenuConst === 'finance'" class="on">付款处理<span class="color-orange">({{num}})</span></li>
        <li @click="goto('/finace/paymentList',{})">付款记录</li>
      </ul>
    </div>
    <div class="system-search">
      <div class="search-item long-item">
        <div class="label">付款申请ID</div>
        <el-input v-model="searchData.id" placeholder='付款申请ID'></el-input>
      </div>
      <div class="search-item long-item">
        <div class="label">对方单位名称</div>
        <el-input v-model="searchData.settlement_org_name" placeholder="对方单位名称"></el-input>
      </div>
      <div class="search-item">
        <div class="label">成本ID</div>
        <el-input v-model="searchData.bill_id" placeholder="成本ID"></el-input>
      </div>
      <div class="search-item long-item">
        <div class="label">状态</div>
        <el-select v-model="searchData.status">
          <el-option label='全部' value='0'></el-option>
          <el-option 
            v-for="(item, key) in STATE_MAP"
            :label='item'
            :value='key'
            :key="key"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">请款金额</div>
        <el-input v-model="searchData.applied_amount" placeholder="请款金额"></el-input>
      </div>
      <search-item-date-range class="long-item" label="请款时间" v-model="date"/>
      <div class="search-item long-item">
        <div class="label">请款人</div>
        <el-input v-model="searchData.user_name" placeholder='请款人'></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type='primary' @click="list(true)">搜索</el-button>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <el-table :data='tableData' style="100%" border>
          <el-table-column
            label='请款id'
            align='center'
            width='80'>
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.id">{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='请款金额'
            align='center'
            width='100'>
            <template slot-scope="scope">
              <div class="color-orange">{{scope.row.applied_amount}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='对方单位名称'
            align='center'>
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.settlement_org_name">{{scope.row.settlement_org_name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='状态'
            align='center'
            width='100'>
            <template slot-scope="scope">
              <div v-if="scope.row.status === 4" class="color-green">{{scope.row.status_str}}</div>
              <div v-else-if="scope.row.status === 2" class="color-red">{{scope.row.status_str}}</div>
              <div v-else>{{scope.row.status_str}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='成本ID'
            align='center'>
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.payment_info">{{scope.row.payment_info}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='请款人'
            align='center'>
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.user_name">{{scope.row.user_name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='请款时间'
            align='center'>
            <template slot-scope="scope">
              <div class="ellipsis text-c" :title="scope.row.create_time">{{scope.row.create_time}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label='操作'
            align='center'
            fixed='right'>
            <template slot-scope="scope">
              <el-button
                v-for="(item, key) in scope.row.edit"
                type='text'
                :key="key">
                <router-link v-if="item === 1 && topMenuConst === 'operator'" :to="{path: '/plan/applied-detial', query: {id: scope.row.id}}">
                  {{EDIT_MAP[item]}}
                </router-link>
                <router-link v-if="item === 1 && topMenuConst === 'finance'" :to="{path: '/finace/applied-detial', query: {id: scope.row.id}}">
                  {{EDIT_MAP[item]}}
                </router-link>
                <span v-if="item === 2 && $menuPermission('api/tuan/cancel_applied')" @click="cancelApplied(scope.row.id)">
                  {{EDIT_MAP[item]}}
                </span>
                <span v-if="item === 3 && $menuPermission('api/tuan/reissue_applied')" @click="reissueApplied(scope.row.id)">
                  {{EDIT_MAP[item]}}
                </span>
                <router-link v-if="item === 4 && $menuPermission('api/finance/settle_applied')" :to="{path: '/finace/applied-pay', query: {id: scope.row.id}}">付款</router-link>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination layout="prev, pager, next" :current-page="searchData.page" :page-count="total_page" @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>
<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import { appliedList, cancelApplied, reissueApplied }from 'src/api/tuan';
import {appliedList as financeAppliedList} from 'src/api/finance';
export default {
  components: {
    SearchItemDateRange
  },
  data () {
    return {
      topMenuConst: this.$route.meta.topMenuConst ? this.$route.meta.topMenuConst : '',
      date: [],
      STATE_MAP: [],
      EDIT_MAP: [],
      searchData: {
        id: '',
        settlement_org_name: '',
        status: '0',
        applied_amount: '',
        create_time_start: '',
        create_time_end: '',
        user_name: '',
        bill_id: '',
        page: 1,
        page_size: 10
      },
      resData: {
        id: '',
        settlement_org_name: '',
        status: '0',
        applied_amount: '',
        create_time_start: '',
        create_time_end: '',
        user_name: '',
        bill_id: '',
        page: 1,
        page_size: 10
      },
      num: 0,
      tableData: [],
      total_page: 1
    }
  },
  watch: {
    $route() {
      this.topMenuConst = this.$route.meta.topMenuConst ? this.$route.meta.topMenuConst : '',
      this.resData.id = ''
      this.resData.settlement_org_name = ''
      this.resData.status = '0'
      this.resData.applied_amount = ''
      this.resData.create_time_start = ''
      this.resData.create_time_end = ''
      this.resData.user_name = ''
      this.resData.bill_id = ''
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
        this.resData.create_time_start = this.date[0]
        this.resData.create_time_end = this.date[1]
      } else {
        this.searchData = {...this.resData}
        this.date = [this.searchData.create_time_start, this.searchData.create_time_end]
      }
      let params = {
        data: this.resData
      }
      let action = appliedList
      if (this.topMenuConst === 'finance') {
        action = financeAppliedList
      }
      action({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.tableData = result.data.list
            this.num = result.data.num
            this.STATE_MAP = result.data.status
            this.EDIT_MAP = result.data.edit
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
    cancelApplied (id) {
      this.$confirm('确定撤销', '撤销', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            id: id
          }
        }
        let action = cancelApplied
        action({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.list()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      }).catch(() => {       
      });
    },
    reissueApplied (id) {
       this.$confirm('确定重新发起', '重新发起', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            id: id
          }
        }
        let action = reissueApplied
        action({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.list()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      }).catch(() => {       
      });
    },
    handleCurrentChange (val) {
      this.resData.page = val
      this.list()
    }
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
</style>
