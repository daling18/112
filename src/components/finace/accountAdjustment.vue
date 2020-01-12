<template>
  <div class="wrapper">
    <div class="system-tab">
			<ul class="tab-box">
        <li class="on">调账审批（{{not_verify_count}}）</li>
        <router-link :to='{path: "/tuan-bill-list"}' tag='li'>团队账单</router-link>
			</ul>
		</div>
    <!-- system-search -->
    <div class="system-search">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">申请单号</div>
          <el-input v-model="searchData.item_no" placeholder="申请单号"></el-input>
        </div>
        <search-item-date-range v-model="departure_time" label="出发日期"/>
        <div class="search-item">
          <div class="label">审核状态</div>
          <el-select v-model="searchData.status" placeholder="请选择">
            <el-option label="待审批" value="1"></el-option>
            <el-option label="审批通过" value="2"></el-option>
            <el-option label="审批不通过" value="3"></el-option>
          </el-select>
        </div>
      </div>
      <div class="clearfix">
        <div class="search-item">
          <div class="label">团号</div>
          <el-input v-model="searchData.tuan_no" placeholder="团号"></el-input>
        </div>
        <search-item-date-range v-model="back_time" label="返回日期"/>
        <div class="search-item">
          <div class="label">申请人</div>
          <!-- <el-input v-model="searchData.tuan_no" placeholder="申请人"></el-input> -->
          <el-select clearable  class="width2" v-model="searchData.op_name" value-key="user_id" remote filterable :remote-method="searchOp">
            <el-option :label="item.username" :value="item.username" v-for="(item, index) in op_info" :key="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="clearfix">
        <search-item-date-range v-model="apply_time" label="申请时间"/>
        <div class="search-item search-button">
          <el-button type="primary" @click="adjustmentList(true)">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="item_no"
          label="申请单号"
          width="150">
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row.item_no">
              {{scope.row.item_no}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tuan_no"
          header-align="center"
          align="left"
          label="团号"
          width="300">
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row.tuan_no">
              {{scope.row.tuan_no}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="团期"
          width="200">
          <template slot-scope="scope">
            <div>{{scope.row.departure_date}}-{{scope.row.back_date}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="front_profit"
          align="center"
          label="调整前毛利"
          width="100">
        </el-table-column>
        <el-table-column
          prop="back_profit"
          align="center"
          label="调整后毛利"
          width="100">
        </el-table-column>
        <el-table-column
          prop="profit"
          align="center"
          label="毛利调整"
          width="100">
        </el-table-column>
        <el-table-column
          prop="profit"
          align="center"
          label="审核状态"
          width="100">
          <template slot-scope="scope">
            <div>{{scope.row.status == 1 ? '待审批' : (scope.row.status == 2 ? '审批通过' : '审批不通过')}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="op_name"
          align="center"
          label="申请人"
          width="150">
          <template slot-scope="scope">
            <div class="ellipsis tc" :title="scope.row.op_name">
              {{scope.row.op_name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="apply_time"
          align="center"
          label="申请时间"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="80">
          <template slot-scope="scope">
            <router-link v-if="scope.row.status !== 1 && $menuPermission('api/finance/adjustment_detail')" :to="{path: '/finace/financeAdjustmentDetail', query: {id: scope.row.id, type: 2}}">查看</router-link>
            <router-link v-if="scope.row.status === 1 && $menuPermission('api/finance/adjustment_detail')" :to="{path: '/finace/financeAdjustmentDetail', query: {id: scope.row.id, type: 1}}">审核</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next" :current-page="paramsData.page" :page-count="totalPage" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import {searchOp} from 'src/api/api'
import {adjustmentList} from 'src/api/finance';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'accountAdjustment',
  components: {
    SearchItemDateRange
  },
  data() {
    return {
      departure_time: [],
      back_time: [],
      apply_time: [],
      searchData: {
        item_no: '',
        departure_date_start: '',
        departure_date_end: '',
        back_date_start: '',
        back_date_end: '',
        status: '1',
        tuan_no: '',
        op_name: '',
        apply_time_start: '',
        apply_time_end: '',
        page: 1,
        page_size: 10
      },
      not_verify_count: 0,
      totalPage: 1,
      currentPage: '',
      paramsData: {
        item_no: '',
        departure_date_start: '',
        departure_date_end: '',
        back_date_start: '',
        back_date_end: '',
        status: '1',
        tuan_no: '',
        op_name: '',
        apply_time_start: '',
        apply_time_end: '',
        page: 1,
        page_size: 10
      },
      op_info: [],
      list: []
    }
  },
  methods: {
    handleCurrentChange (page) {
      if(page != this.paramsData.page){
        this.paramsData.page = page;
        this.adjustmentList();
      }
    },
    adjustmentList(type) {
      if(type) {
        this.paramsData = {...this.searchData};
        this.paramsData.page = 1;
        this.paramsData.departure_date_start = this.departure_time[0];
        this.paramsData.departure_date_end = this.departure_time[1];
        this.paramsData.back_date_start = this.back_time[0];
        this.paramsData.back_date_end = this.back_time[1];
        this.paramsData.apply_time_start = this.apply_time[0];
        this.paramsData.apply_time_end = this.apply_time[1];
      } else {
        const {departure_date_start, departure_date_end} = this.paramsData;
        const {back_date_start, back_date_end} = this.paramsData;
        const {apply_time_start, apply_time_end} = this.paramsData;
        this.searchData = {...this.paramsData};
        this.departure_time = [departure_date_start, departure_date_end];
        this.back_time = [back_date_start, back_date_end];
        this.apply_time = [apply_time_start, apply_time_end];
      }
      let params = {
        data: this.paramsData
      };
      adjustmentList({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.list = result.data.list;
            this.not_verify_count = result.data.not_verify_count;
            this.total_page = result.data.total_page;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          }
        },
        showLoading: true
      })
    },
    searchOp(opname) {
      let params = {
        data: {
          name: opname ? opname : ''
        }
      };
      searchOp({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            // result.data.forEach((item) => {
            //   item.user_id = parseInt(item.user_id);
            // });
            this.op_info = result.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }
      })
    }
  },
  mounted() {
    this.adjustmentList();
  }
}
</script>
<style lang="less" scoped>
  .tc {
    text-align: center;
  }
  .system-content {
    padding: 15px 15px 0;
    background-color: #fff;
  }
</style>
