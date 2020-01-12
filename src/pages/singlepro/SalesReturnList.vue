<template>
<!-- application\index\view\dev\src\components\self-support\LocalProductList.vue -->
  <div class="wrapper">
    <div class="system-search clearfix">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">单号</div>
          <el-input v-model="searchData.no" placeholder="单号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">收货人姓名</div>
          <el-input v-model="searchData.name" placeholder="收货人姓名"></el-input>
        </div>
        <div class="search-item">
          <div class="label">收货人电话</div>
          <el-input v-model="searchData.mobile" placeholder="收货人电话"></el-input>
        </div>
        <div class="search-item">
          <div class="label">下单时间</div>
          <el-date-picker
            :class="'date-picker'"
            v-model="date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <div class="search-item search-button">
          <el-button @click="getretundGoodsList(true)" type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <el-table :data='dataList' border>
          <el-table-column
            align='center'
            prop='no'
            label='退货单号'>
          </el-table-column>
          <el-table-column 
            align='center'
            prop='create_time'
            width='200px'
            label='申请时间'>
          </el-table-column>
          <el-table-column
            align='center' 
            prop='sender_mobile'
            width='140px'
            label='用户手机号'>
          </el-table-column>
          <el-table-column
            align='center'
            prop="amount"
            width='100px'
            label='退款金额'>
          </el-table-column>
          <el-table-column
            align='center'
            prop='post_contact_name'
            width='100px'
            label='联系人'>
          </el-table-column>
          <el-table-column
            align='center'
            width='100px'
            prop='status'
            label='申请状态'>
            <template slot-scope="scope">
              {{returnState[scope.row.status - 1] || ''}}
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop='update_time'
            width='100px'
            label='处理时间'>
          </el-table-column>
          <el-table-column
            align='center'
            width='100px'
            prop=''
            label='操作'>
            <template slot-scope="scope">
              <router-link :to="{path: '/singlepro/sales-return/detail', query: {id: scope.row.order_id}}">查看详情</router-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination  layout="prev, pager, next" :current-page='resData.page_index' :total="total" :page-size='pagesize' @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {retundGoodsList} from 'src/api/self_support.localproduct';
require("../../utils/newFormat.js");

export default {
  data () {
    return {
      searchData: {
        no: "",
        name: "",
        mobile: "",
        begin_create_time: "",
        end_create_time: "",
        page_index: 1
      },
      cfg_audit_status: [],
      cfg_type: [],
      dataList: [],
      total: 0,
      pagesize: 0,
      returnState: ["待处理","退货中","已拒绝","已完成"],
      resData: "",
      date: []
    }
  },
  methods: {
    getretundGoodsList (type) {
      if(type){
        this.searchData.page_index = 1;
      }
      this.searchData.begin_create_time = this.date[0] ? new Date(this.date[0]).format("yyyy-MM-dd") : '';
      this.searchData.end_create_time = this.date[1] ? new Date(this.date[1]).format("yyyy-MM-dd") : '';
      this.resData = {...this.searchData}

      let params = {
        data: this.resData
      }

      retundGoodsList({
        params,
        success: (res) =>{
          let result = res.data
          if (result.code === 0) {

            this.dataList = result.data.lists
            this.resData.page_index = result.data.page_index
            this.total = result.data.total_count
            this.pagesize = result.data.page_size
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
    currentPageChange (page) {
      this.searchData.page_index = page
      this.getretundGoodsList()
    }
  },
  mounted() {
    this.getretundGoodsList()
  },
}
</script>
<style lang="less" scoped>
  .search-content {
    float: left;
  }
</style>
