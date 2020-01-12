<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <search-item-date-range :label="'预订日期'" v-model="scheduledTime" @change="handleChangeScheduledTime"/>
      <div class="search-item">
        <div class="label">团队名称</div>
        <el-input v-model="searchInput.tuan_name" placeholder="团队名称"/>
      </div>
      <div class="search-item">
        <div class="label">代理商</div>
        <el-input v-model="searchInput.distributor_org_name" placeholder="代理商"/>
      </div>
      <div class="search-item">
        <div class="label">订单渠道</div>
        <el-select v-model="searchInput.channel" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in CHANNEL_LIST" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <!-- <div class="search-item">
        <div class="label">合同编号</div>
        <el-input v-model="searchInput.contract_no" placeholder="合同编号"/>
      </div> -->
      <div class="search-item">
        <div class="label">订单状态</div>
        <el-select v-model="searchInput.confirm_status" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in CONFIRM_STATUS_LIST" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">退款</div>
        <el-select v-model="searchInput.is_tourist_cancel" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in TOURIST_CANCEL_LIST" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">同行/直客</div>
        <el-select v-model="searchInput.order_type" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in ORDER_TYPE_LIST" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">销售人员</div>
        <el-input v-model="searchInput.operator_name" placeholder="销售人员"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table class="el-table--middle" :data="tableData" border style="width: 100%">
            <el-table-column prop="order_no" label="订单编号" header-align="center" align="left" width="210" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis color-purple" :title="scope.row.order_no">
                  [{{ scope.row.order_from_name }}]{{ scope.row.order_no }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="tuan_name" label="团号/名称" header-align="center" align="left" min-width="220" :resizable="false">
              <template slot-scope="scope">
                <div :title="scope.row.tuan_name">
                  <p class="ellipsis" :title="scope.row.tuan_no">{{ scope.row.tuan_no }}</p>
                  <p class="ellipsis color-gray" :title="scope.row.tuan_name">{{ scope.row.tuan_name }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="订单金额" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope"><span class="color-orange">{{ scope.row.rmb_total_amount }}</span></template>
            </el-table-column>
            <el-table-column label="已收" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="">{{ scope.row.rmb_receipted_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="未收" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="">{{ (scope.row.rmb_total_amount - scope.row.rmb_receipted_amount) | formatPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="游客" header-align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <!-- <span v-if="scope.row.adult_num" :title="'成人' + scope.row.adult_num">成人{{ scope.row.adult_num }}</span>
                <span v-if="scope.row.child_num" :title="'儿童' + scope.row.child_num">儿童{{ scope.row.child_num }}</span> -->
                <span class="ellipsis" v-if="scope.row.tourist_info" :title="scope.row.tourist_info">{{scope.row.tourist_info}}</span>
                <!-- 是否有退团 0没有 1有 -->
                <router-link v-if="scope.row.is_tourist_cancel == 1"
                  :to="{ path: '/plan/order-list/tuituan-detail', query: {ono: scope.row.order_no, tid: scope.row.tuan_id}}">
                  [退]
                  <span v-if="scope.row.cancel_num != 0">
                    {{scope.row.cancel_num}}
                  </span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="代理商" align="left" min-width="150" :resizable="false">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.distributor_org_name">{{scope.row.distributor_org_name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="" label="销售人员" width="100" align="center" :resizable="false">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.operator_name">{{scope.row.operator_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" width="100" align="center" :resizable="false">
              <template slot-scope="scope">
                <span :class="scope.row.confirm_status == 2 ?'color-green' : scope.row.confirm_status == -1 ? 'color-gray' : ''">{{ scope.row.confirm_status_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="预约日期" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-gray">{{ scope.row.scheduled_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="70" align="center" fixed="right">
              <template slot-scope="scope">
                <router-link v-if="$menuPermission('api/tuan/bom_order_detail')" :to="'/plan/order-list/order-detail/' + scope.row.tuan_id + '/' + scope.row.id">
                  查看
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
// import { saleOrderList, contractBindOrderSubmit, contractUnbindOrderSubmit } from 'src/api/api';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import{
  opOrderList
} from 'src/api/tuan';
import * as format from 'src/utils/format';
export default {
  name: 'PlanOrderList',
  components: {
    SearchItemDateRange
  },
  filters: {
    formatPrice: format.formatPrice
  },
  data() {
    const {query} = this.$route;

    return {
      CHANNEL_LIST: {},
      TOURIST_CANCEL_LIST: {},
      ORDER_TYPE_LIST: {},
      CONFIRM_STATUS_LIST: {},
      totalPage: parseInt(query.page) || 1,
      pageShow: false,
      scheduledTime: [query.scheduled_time_start, query.scheduled_time_end],
      searchInput: {
        // scheduled_time_start: '',
        // scheduled_time_end: '',
        // operator_name: '',
        // distributor_org_name: '',
        // confirm_status: '',
        // order_no: '',
        // tuan_no: '',
        // channel: '',
        // is_tourist_cancel: '',
        // order_type: '',
        // tuan_name: '',
      },
      searchData: {
        page: parseInt(query.page) || 1,
        page_size: query.page_size || 10,
        scheduled_time_start: query.scheduled_time_start || '',
        scheduled_time_end: query.scheduled_time_end || '',
        operator_name: query.operator_name || '',
        distributor_org_name: query.distributor_org_name || '',
        confirm_status: query.confirm_status || '',
        order_no: query.order_no || '',
        tuan_no: query.tuan_no || '',
        channel: query.channel || '',
        is_tourist_cancel: query.is_tourist_cancel || '',
        order_type: query.order_type || '',
        tuan_name: query.tuan_name || '',
      },
      tableData: []
    };
  },
  computed: {
  },
  created(){
  },
  mounted() {
    this.getList();
  },
  // watch: {
  //   '$route' (to, from) {
  //     console.log('$route change', to, from);
  //     this.searchInput.scheduled_time_start = '';
  //     this.searchInput.scheduled_time_end = '';
  //     this.searchInput.operator_name = '';
  //     this.searchInput.distributor_org_name = '';
  //     this.searchInput.confirm_status = '';
  //     this.searchInput.order_no = '';
  //     this.searchInput.tuan_no = '';
  //     this.getList(true);
  //   }
  // },
  methods: {
    getList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      // if(this.$route.query.contid){
      //   this.searchData.contract_no = this.$route.query.contid;
      // }
      // 请求列表
      const getTypeList = opOrderList;
      getTypeList({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.pageShow = this.totalPage > 0;
            this.CHANNEL_LIST = data.data.channel_list || {};
            this.TOURIST_CANCEL_LIST = data.data.tourist_cancel_list || {};
            this.ORDER_TYPE_LIST = data.data.order_type_list || {};
            this.CONFIRM_STATUS_LIST = data.data.confirm_status_list || {};
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleChangeScheduledTime(date) {
      this.searchInput.scheduled_time_start = date[0] || '';
      this.searchInput.scheduled_time_end = date[1] || '';
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(this.searchData.page != val){
        this.searchData.page = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
</style>
