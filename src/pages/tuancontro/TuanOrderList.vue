<template>
  <div class="wrapper">
    <div class="system-content" v-if="tuanInfoNo">
      <!-- table-title -->
      <div class="table-title no-border" style="margin-bottom:10px;">
        <div class="title">
          <span class="purple-color">【{{ tuanInfoNo }}】</span>
          {{ tuanInfoName }}
        </div>
        <div class="oh">
          <div class="dess">
            <template v-if="tuanInfo.type != 4">
              <!-- 非单项 -->
              <ul class="dess-ul">
                <li>
                  <span class="tit">出发城市</span>
                  {{ tuanInfoDepCity }}
                </li>
              </ul>
              <ul class="dess-ul">
                <li>
                  <span class="tit">出发日期</span>
                  {{ tuanInfoDepDate }}
                </li>
                <li>
                  <span class="tit">返回日期</span>
                  {{ tuanInfoBackDate }}
                </li>
              </ul>
            </template>
            <template v-else>
              <!-- 单项 -->
              <ul class="dess-ul">
                <li>
                  <span class="tit">计调负责人</span>
                  {{ tuanInfo.op_name }}
                </li>
                <li>
                  <span class="tit">单项类型</span>
                  {{ tuanInfo.single_type_name }}
                </li>
              </ul>
            </template>
          </div>
          <div class="btn-areas">
            <el-button type="primary" @click="goto()">查看行程</el-button>
            <el-button @click="goto()">打印行程</el-button>
          </div>
        </div>
      </div>
      <!-- /table-title -->
      <!-- mod-form -->
      <div class="mod-form">
        <div class="txt-bar">
          订单金额合计 ：
          <span class="color-orange">&yen; {{ rmbTotalAmount }}</span>
          <!-- 下单统一在分销中心进行 <template v-if="$menuPermission('api/tuan/add_zhike_order')&&$route.query.lock_status!=1">
            <router-link class="lk"
              :to="{path:'/zcontrol/order/form_zhike',query:{id:tuanInfoId, order_no:''}}">
              <el-button type="primary" class="first">+ 直客订单</el-button>
            </router-link>
          </template>
          <template v-if="$menuPermission('api/tuan/add_order')&&$route.query.lock_status!=1">
            <router-link class="lk"
              :to="{path:'/control/order/form',query:{id:tuanInfoId, order_no:''}}">
              <el-button type="primary">+ 同行订单</el-button>
            </router-link>
          </template> -->
        </div>
        <div class="table-box">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="40" align="center" :resizable="false"/>
            <el-table-column label="订单编号" align="center" min-width="200" :resizable="false">
              <template slot-scope="scope">
                <span :class="scope.row.order_from == '2' ? 'order-type-1' : 'order-type-2'">
                  {{ scope.row.order_from_name }}
                </span>
                <span>{{ scope.row.order_no }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cost" label="订单金额" header-align="center" min-width="80" align="right" :resizable="false">
              <template slot-scope="scope">
                <div class="color-orange text-right">{{ scope.row.rmb_total_amount }}</div>
              </template>
            </el-table-column>
            <el-table-column label="已收" min-width="80" header-align="center" align="right" :resizable="false">
              <template slot-scope="scope">
                <div class="text-right">{{ scope.row.rmb_receipted_amount }}</div>
              </template>
            </el-table-column>
            <el-table-column label="未收" min-width="80" header-align="center" align="right" :resizable="false">
              <template slot-scope="scope">
                <div class="text-right">{{ scope.row.rmb_remain_amount }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="订单状态" width="80" align="center" :resizable="false">
              <template slot-scope="scope">
                <span v-if="scope.row.confirm_status == -1" class="order-status-cancel">{{ scope.row.confirm_status_name }}</span>
                <span v-if="scope.row.confirm_status == 1 || scope.row.confirm_status == 0" class="order-status-confirm">{{ scope.row.confirm_status_name }}</span>
                <span v-if="scope.row.confirm_status == 2" class="order-status-confirmed">{{ scope.row.confirm_status_name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="people" label="报名人数" min-width="100" align="center" :resizable="false"
              v-if="tuanInfo.type != 4">
              <template slot-scope="scope">
                {{ scope.row.enroll_str }}
                <!-- 0没有退团 1有退团 -->
                <router-link v-if="scope.row.is_tourist_cancel == 1"
                             :to="{ path: tuituanDetailPath, query: {ono: scope.row.order_no, tid: tuanId}}">
                  [退]
                  <span style="margin-left: -3px;"
                        v-if="scope.row.cancel_num != 0">
                    {{ scope.row.cancel_num }}
                  </span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="代理商 / 姓名" min-width="200" header-align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.distributor_real_name == '' ? scope.row.distributor_org_name : scope.row.distributor_org_name + '/' + scope.row.distributor_real_name">
                  {{ scope.row.distributor_org_name }}
                  <template v-if="scope.row.distributor_real_name != ''">
                    / {{ scope.row.distributor_real_name }}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="50" align="center">
              <template slot-scope="scope">
                <template v-if="orderDetailPerm">
                  <template v-if="tuanInfo.type != 4">
                    <!-- 线路 -->
                    <router-link 
                      :to="{path: orderDetailPrefix + scope.row.tuan_id + '/' + scope.row.id}">
                      查看
                    </router-link>
                  </template>
                  <template v-else>
                    <!-- 单项 -->
                    <!-- 火车票 -->
                    <router-link
                      v-if="tuanInfo.single_type == 1"
                      :to="{
                        path: singleOrderDetailUrlPrefix,
                        query:{orderNo: scope.row.order_no}
                      }">
                      查看
                    </router-link>
                    <!-- 门票 -->
                    <router-link
                      v-if="tuanInfo.single_type == 2"
                      :to="{
                        path: singleOrderDetailUrlPrefix,
                        query:{order_id: scope.row.order_no}
                      }">
                      查看
                    </router-link>
                    <!-- 酒店 -->
                    <router-link
                      v-if="tuanInfo.single_type == 3"
                      :to="{
                        path: singleOrderDetailUrlPrefix,
                        query:{orderId: scope.row.order_no}
                      }">
                      查看
                    </router-link>
                    <!-- 机票 -->
                    <router-link
                      v-if="tuanInfo.single_type == 4"
                      :to="{
                        path: singleOrderDetailUrlPrefix,
                        query:{order_id: scope.row.order_no}
                      }">
                      查看
                    </router-link>
                    <!-- 签证 -->
                    <router-link
                      v-if="tuanInfo.single_type == 5"
                      :to="{
                        path: singleOrderDetailUrlPrefix,
                        query:{order_id: scope.row.order_no}
                      }">
                      查看
                    </router-link>
                    <!-- 农特优 -->
                    <router-link
                      v-if="tuanInfo.single_type == 6"
                      :to="{
                        path: singleOrderDetailUrlPrefix,
                        query:{order_id: scope.row.order_no}
                      }">
                      查看
                    </router-link>
                  </template>
                </template>
                <template v-else>--</template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- /mod-form -->
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import { tuanOrderLists } from 'src/api/api'
export default {
  name: 'TuanList',
  data() {
    return {
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      tuanInfo: null,
      tuanInfoId: null,
      tuanInfoNo: null,
      tuanInfoName: null,
      tuanInfoDepCity: null,
      tuanInfoDepDate: null,
      tuanInfoBackDate: null,
      tuanInfoLock: null,
      rmbTotalAmount: null,
      searchData: {
        keyword: this.$route.query.keyword || '',
      },
      ruleForm: {
        exchange: '',
        way: '',
        date: '',
        currency: '',
        total: '',
        department: '',
        people: '',
        pay_account: '',
        recive_account_name: '',
        recive_account_no: '',
        recive_account_bank: '',
        file: '',
        total_mount: ''
      },
      tableData: [],
      dialogTableVisible: false,
      gridData: [{
        tuan_no: '121232311423',
        cost_item: '12.00',
        id: '122'
      }],
      form: {
        tuan_no: '',
        cost_no: ''
      },
      // tuituanFromType: null,
      // opreateRole: null,
      tuanId: this.$route.query.id
    }
  },
  computed:{
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    tuituanDetailPath() {
      switch (this.topMenuConst) {
      case 'tuancontro':
        return '/touristroute/order-list/order-refund';
      // case 'finance':
      //   return '/fcontrol/tuituan-detail';
      }
    },
    orderDetailPerm() {
      let urlPrefix = '';

      switch(this.topMenuConst) {
      case 'tuancontro': 
        return this.$menuPermission('touristroute/lineorder/lineorder/getorderdetail');
        break;
      // case 'finance': 
      //   return this.$menuPermission('api/tuan/finance_bom_order_detail');
      //   break;
      }
      return false;
    },
    orderDetailPrefix() {
      let urlPrefix = '';
      const menu = this.$route.meta.menu;

      switch(this.topMenuConst) {
      case 'tuancontro': 
        urlPrefix = '/touristroute/order-list/order-detail/';
        break;
      case 'finance': 
        urlPrefix = '/fcontrol/order-detail/';
        break;
      }
      return urlPrefix
    },
    singleOrderDetailUrlPrefix(){
      let v = '';
      switch(this.tuanInfo.single_type){
      case 1:
        v = '/singlepro/single-order/train/detail';
        break;
      case 2:
        v = '/singlepro/single-ticket-order/detail';
        break;
      case 3:
        v = '/singlepro/single-order/hotel/detail';
        break;
      case 4:
        v = '/singlepro/single-flight-order/detail';
        break;
      case 5:
        v = '/singlepro/single-visa-order/detail';
        break;
      case 6:
        v = '/singlepro/single-local-product-order/detail';
        break;
      }
      return v;
    }
  },
  // created(){
  //   // 确定角色来源
  //   switch(this.$route.meta.topMenuConst){
  //   case 'operator':
  //     this.opreateRole = 1;
  //     break;
  //   case 'sale':
  //     this.opreateRole = 2;
  //     break;
  //   case 'finance':
  //     this.opreateRole = 3;
  //     break;
  //   }
  // },
  methods:{
    handleCurrentChange(val) {
      this.page = val;
      this.getRecord();
    },
    getRecord() {
      let params = {
        data: {
          id: this.$route.query.id,
          data_config_type: this.$route.query.type,
          page:this.page
        }
      };
      tuanOrderLists({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tuanInfo = data.data.tuan_info;
            this.tuanInfoId = data.data.tuan_info.id;
            this.tuanInfoNo = data.data.tuan_info.tuan_no;
            this.tuanInfoName = data.data.tuan_info.tuan_name;
            this.tuanInfoDepCity = data.data.tuan_info.departure_city;
            this.tuanInfoDepDate = data.data.tuan_info.departure_date;
            this.tuanInfoBackDate = data.data.tuan_info.back_date;
            this.tuanInfoLock = data.data.tuan_info.lock_status;
            this.rmbTotalAmount = data.data.all_rmb_total_amount;
            this.tableData = data.data.order_lists.data;
            this.totalPage =  data.data.order_lists.total_page;
            this.currentPage =  data.data.order_lists.page_index;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getRecord();
  }
}
</script>

<style scoped lang="scss">
.ta-r {
  text-align: right!important;
}

.system-content .table-title .btn-areas {
  margin-top: 0px;
}

.table-box {
  //订单类型 BPM ERP
  [class^="order-type-"] {
    color: #fff;
    background: #7471f9;
    font-size: 12px;
    border-radius: 2px;
    margin-right: 5px;
    padding-left: 6px;
    line-height: 14px;
  }
  .order-type-2 {
    background: #e33dbe;
  } //订单状态 已取消 待完成 已完成
  .order-status-cancel {
    color: #999;
  }
  .order-status-confirm {
    color: #333333;
  }
  .order-status-confirmed {
    color: #019f3d;
  }
}
.txt-bar{
  font-size: 14px!important;
  line-height: 30px!important;
  height: 30px!important;
  margin-top: 0!important;
  margin-bottom: 15px!important;
  overflow: hidden;
}
.txt-bar button{
  vertical-align: 3px;
  margin-left: 10px;
  &.first{
    margin-left: 10px;
  }
}
.dess{
  float: left;
  color: #444;
  margin-top: 10px;
}
.dess-ul{
  overflow: hidden;
  list-style: none;
}
.dess-ul li{
  float: left;
  width: 350px;
}
.dess-ul .tit{
  display: inline-block;
  width: 90px;
  color: #999;
  padding: 3px 0;
}
.lk{
  float: right;
}
</style>
