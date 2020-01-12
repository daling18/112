<template>
  <div class="wrapper">
    <div class="system-content" v-if="tuanInfoNo">
      <!-- table-title -->
      <div class="table-title no-border" style="margin-bottom:10px;">
        <div class="title">
          <span class="pour">【{{tuanInfoNo}}】</span>
          {{tuanInfoName}}
        </div>
        <div class="oh">
          <div class="dess">
            <ul class="dess-ul">
              <li>
                <span class="tit">出发城市</span>
                {{tuanInfoDepCity}}
              </li>
            </ul>
            <ul class="dess-ul">
              <li>
                <span class="tit">出发日期</span>
                {{tuanInfoDepDate}}
              </li>
              <li>
                <span class="tit">返回日期</span>
                {{tuanInfoBackDate}}
              </li>
            </ul>
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
          <span class="color-orange">&yen; {{rmbTotalAmount}}</span>
           <template v-if="($menuPermission('api/tuan/add_zhike_order') || (isSale && $menuPermission('api/tuan/sale_add_zhike_order')))&&$route.query.lock_status!=1" || tuanInfo.type != 4>
             <router-link class="lk"
              :to="{path:`/${isSale ? 'sale' : 'control'}/order/form_zhike`,query:{id:tuanInfoId, order_no:''}}">
              <el-button type="primary" class="first">+ 直客订单</el-button>
            </router-link>
           </template>
           <template v-if="($menuPermission('api/tuan/add_order') || (isSale && $menuPermission('api/tuan/sale_add_order')))&&$route.query.lock_status!=1" || tuanInfo.type != 4>
             <router-link class="lk"
              :to="{path:`/${isSale ? 'sale' : 'control'}/order/form`,query:{id:tuanInfoId, order_no:''}}">
              <el-button type="primary">+ 同行订单</el-button>
            </router-link>
           </template>
        </div>
        <div class="table-box">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="40" align="center" :resizable="false">
            </el-table-column>
            <el-table-column label="订单编号" align="center" width="210" :resizable="false">
              <template slot-scope="scope">
                <span :class="scope.row.order_from == '2' ? 'order-type-1' : 'order-type-2'">
                  {{scope.row.order_from_name}}
                </span>
                <span>{{scope.row.order_no}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cost" label="订单金额" min-width="80" align="right" :resizable="false">
              <template slot-scope="scope">
                <div class="color-orange">{{scope.row.rmb_total_amount}}</div>
              </template>
            </el-table-column>
            <el-table-column label="已收" min-width="80" align="right" prop="rmb_receipted_amount" :resizable="false">
            </el-table-column>
            <el-table-column label="未收" min-width="80" align="right" prop="rmb_remain_amount" :resizable="false">
            </el-table-column>
            <el-table-column prop="status" label="订单状态" align="center" :resizable="false">
              <template slot-scope="scope">
                <span v-if="scope.row.confirm_status == -1" class="order-status-cancel">{{scope.row.confirm_status_name}}</span>
                <span v-if="scope.row.confirm_status == 1 || scope.row.confirm_status == 0" class="order-status-confirm">{{scope.row.confirm_status_name}}</span>
                <span v-if="scope.row.confirm_status == 2" class="order-status-confirmed">{{scope.row.confirm_status_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="people" label="报名人数" width="150" header-align="center" :resizable="false"
              v-if="tuanInfo.type != 4">
              <template slot-scope="scope">
                <span class="ellipsis" v-if="scope.row.enroll_str" :title="scope.row.enroll_str">{{scope.row.enroll_str}}</span>
                <!-- 0没有退团 1有退团 -->
                <router-link v-if="scope.row.is_tourist_cancel == 1"
                  :to="{ path: tuituanDetailUrl, query: {ono: scope.row.order_no, tid: scope.row.tuan_id}}">
                  [退]
                  <span v-if="scope.row.cancel_num != 0">
                    {{scope.row.cancel_num}}
                  </span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="代理商 / 姓名" width="200" header-align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.distributor_real_name == '' ? scope.row.distributor_org_name : scope.row.distributor_org_name + '/' + scope.row.distributor_real_name">
                  {{scope.row.distributor_org_name}}
                  <template v-if="scope.row.distributor_real_name != ''">
                    / {{scope.row.distributor_real_name}}
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60" align="center">
              <template slot-scope="scope">
                <!-- 解开财务下面tdm订单详情页查看的限制 -->
                <!-- <template v-if="scope.row.order_from == '1' || scope.row.order_from == '3'"> -->
                  <router-link v-if="!isSale && $menuPermission('api/tuan/bom_order_detail')"
                    :to="{path:'/fcontrol/order-details/' + scope.row.tuan_id + '/' + scope.row.id}">
                    查看
                  </router-link>
                  <router-link v-else-if="isSale && $menuPermission('api/tuan/sale_bom_order_detail')"
                    :to="{path:'/sale/order/detail/' + scope.row.tuan_id + '/' + scope.row.id}">
                    查看
                  </router-link>
                <!-- </template> -->
                <template v-else>--</template>
                <!-- <span v-if="scope.row.order_from == '1' || scope.row.order_from == '3'">
                  <router-link 
                    v-if="!isSale && $menuPermission('api/tuan/bom_order_detail')" 
                    :to="{path:'/fcontrol/order-details/' + scope.row.tuan_id + '/' + scope.row.id}"
                  >
                    订单详情
                  </router-link>
                  <router-link 
                    v-if="isSale && $menuPermission('api/tuan/sale_bom_order_detail')" :to="{path:'/sale/order/detail/' + scope.row.tuan_id + '/' + scope.row.id}">
                    订单详情
                  </router-link>
                  <template v-if="tuanInfoLock != 1" ><template v-if="scope.row.order_from == '1' && ($menuPermission('api/tuan/add_order') || (isSale && $menuPermission('api/tuan/sale_add_order')))">
                      <router-link v-if="!isSale" :to="{path:'/control/order/form?id=' + scope.row.tuan_id + '&order_no=' + scope.row.order_no}">
                        修改
                      </router-link>
                      <router-link v-else :to="{path:'/sale/order/form?id=' + scope.row.tuan_id + '&order_no=' + scope.row.order_no}">
                        修改
                      </router-link>
                    </template><template v-if="scope.row.order_from == '3' && ($menuPermission('api/tuan/add_zhike_order') || (isSale && $menuPermission('api/tuan/sale_add_zhike_order')))">
                      <router-link v-if="!isSale" :to="{path:'/control/order/form_zhike?id=' + scope.row.tuan_id + '&order_no=' + scope.row.order_no}">
                        修改
                      </router-link>
                      <router-link v-else :to="{path:'/sale/order/form_zhike?id=' + scope.row.tuan_id + '&order_no=' + scope.row.order_no}">
                        修改
                      </router-link>
                    </template><router-link v-if="scope.row.confirm_status == 2 && isSale && $menuPermission('api/tuan/sale_confirm_piece') && scope.row.order_from == '1' && scope.row.confirm_is_new == 1" :to="{path:'/sale/order/saleOrderConfirmPdf?parent_id=' + scope.row.tuan_id + '&id=' + scope.row.id}">
                        确认件
                    </router-link><router-link v-if="scope.row.confirm_status == 2 && isSale && $menuPermission('api/tuan/sale_confirm_piece') && scope.row.order_from == '1' && scope.row.confirm_is_new == 0" :to="{path:'/sale/order/cost/iconfirm2?parent_id=' + scope.row.tuan_id + '&id=' + scope.row.bill_id + '&type=1'}">
                        确认件
                    </router-link><router-link v-if="scope.row.confirm_status == 2 && !isSale && $menuPermission('api/tuan/finance_confirm_piece') && scope.row.order_from == '1' && scope.row.confirm_is_new == 1" :to="{path:'/forder/OrderConfirmPdf?parent_id=' + scope.row.tuan_id + '&id=' + scope.row.id}">
                        确认件
                    </router-link><router-link v-if="scope.row.confirm_status == 2 && !isSale && $menuPermission('api/tuan/finance_confirm_piece') && scope.row.order_from == '1' && scope.row.confirm_is_new == 0" :to="{path:'/forder/iconfirm2?parent_id=' + scope.row.tuan_id + '&id=' + scope.row.bill_id + '&type=1'}">
                        确认件
                    </router-link>
                  </template>
                </span>
                <span v-else>--</span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- /mod-form -->
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { tuanOrderLists, saleTuanOrderLists } from 'src/api/api'
export default {
  name: 'tuan-list',
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
        keyword: this.$route.query.keyword || "",
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
      opreateRole: null
    }
  },
  computed:{
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    tuituanDetailUrl() {
      switch (this.topMenuConst) {
      case 'finance':
        return '/fcontrol/tuituanDetail';
      }
    }
  },
  created(){
    // 确定角色来源
    switch(this.$route.meta.topMenuConst){
      case 'operator':
        this.opreateRole = 1;
        break;
      case 'sale':
        this.opreateRole = 2;
        break;
      case 'finance':
        this.opreateRole = 3;
        break;
    }
    //  console.log(this.opreateRole)
    // 使用 tuituanDetailUrl 代替 by qzhchen 20180928
    // switch(this.opreateRole){
    //   case 1:
    //     this.tuituanFromType = '/control';
    //     break;
    //   case 2:
    //     if(this.$route.meta.menu == 'saleTeamOrder'){
    //       this.tuituanFromType = '/sale/myorder';
    //     }else if(this.$route.meta.menu == 'saleTuanList'){
    //       this.tuituanFromType = '/sale/order';
    //     }
    //     break;
    //   case 3:
    //     this.tuituanFromType = '/fcontrol';
    //     break;
    // }
  },
  methods:{
    handleCurrentChange(val) {
      this.page = val;
      this.getRecord();
    },
    getRecord() {
      let params = {
        data: {
          id: this.$route.query.id,
          page:this.page
        }
      };
      const tuanOrderListsFunc = this.isSale ? saleTuanOrderLists : tuanOrderLists;
      tuanOrderListsFunc({
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
  }
  ,
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

.el-table .cell a{
  display: inline-block;
  padding: 0 1px;
}

.table-box {
  //订单类型 BPM ERP
  [class^="order-type-"] {
    color: #fff;
    background: #7471f9;
    font-size: 12px;
    border-radius: 2px;
    margin-right: 5px;
    padding-left: 3px;
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
.ell{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pour{
  color: #b10c79;
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
