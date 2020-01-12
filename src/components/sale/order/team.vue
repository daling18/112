<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <template v-if="!isZhike">
          <router-link class="on" to="/sale/order/teamth" tag="li">
            同行订单
          </router-link>
          <router-link v-if="$menuPermission('api/tuan/sale_zhike_order_list')" to="/sale/order/teamzk" tag="li">
            直客订单
          </router-link>
        </template>
        <template v-else>
          <router-link v-if="$menuPermission('api/tuan/sale_tonghang_order_list')" to="/sale/order/teamth" tag="li">
            同行订单
          </router-link>
          <router-link class="on" to="/sale/order/teamzk" tag="li">
            直客订单
          </router-link>
        </template>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <div class="search-item calendar">
        <div class="label">预订日期</div>
        <el-date-picker
          v-model="searchInput.scheduled_time_start"
          type="date"
          placeholder="预订日期"
          :editable="false"
          :picker-options="scheduled_time_start_opts"
        />
        <div class="label zhi"> - </div>
        <el-date-picker
          v-model="searchInput.scheduled_time_end"
          type="date"
          placeholder="预订日期"
          :editable="false"
          :picker-options="scheduled_time_end_opts"
        />
      </div>
      <div class="search-item">
        <div class="label">销售人员</div>
        <el-input v-model="searchInput.operator_name" placeholder="销售人员"/>
      </div>
      <div class="search-item" v-if="!isZhike">
        <div class="label">代理商</div>
        <el-input v-model="searchInput.distributor_org_name" placeholder="代理商"/>
      </div>
      <!-- <div class="search-item">
        <div class="label">合同编号</div>
        <el-input v-model="searchInput.contract_no" placeholder="合同编号"/>
      </div> -->
      <div class="search-item">
        <div class="label">订单状态</div>
        <el-select v-model="searchInput.confirm_status" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option label="已取消" value="-1"/>
          <el-option label="待处理" value="0"/>
          <el-option label="已占位" value="1"/>
          <template v-if="!isZhike">
            <el-option label="已确认" value="2"/>
          </template>
          <template v-else>
            <el-option label="已签约" value="2"/>
          </template>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label long-label">行程编号/团号</div>
        <el-input v-model="searchInput.tuan_no" placeholder="行程编号/团号"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table class="el-table--middle" :data="tableData" border style="width: 100%">
            <el-table-column prop="order_no" :label="!isZhike ? '订单／代理商' : '订单／直客'" header-align="center" align="left" width="200" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis color-purple" :title="scope.row.order_no">
                  [{{ scope.row.order_from_name }}]{{ scope.row.order_no }}
                </div>
                <p class="ellipsis" :title="scope.row.distributor_org_name">{{scope.row.distributor_org_name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="tuan_name" label="行程编号/团号/名称" header-align="center" align="left" min-width="220" :resizable="false">
              <template slot-scope="scope">
                <div :title="scope.row.tuan_name">
                  <template v-if="scope.row.product_id === 0">
                    {{ scope.row.tuan_no }}
                  </template>
                  <template v-else>
                    <router-link :to="{path: 'tripDetail', query:{id: scope.row.product_id}}">
                      <p>{{scope.row.product_no}}</p>
                    </router-link>
                  </template>
                  <p class="ellipsis color-gray">{{ scope.row.tuan_name }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="应收" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope"><span class="color-orange">￥{{ scope.row.rmb_total_amount }}</span></template>
            </el-table-column>
            <el-table-column label="未收" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="">￥{{ scope.row.rmb_total_amount - scope.row.rmb_receipted_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="游客" header-align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <!-- <span v-if="scope.row.adult_num" :title="'成人' + scope.row.adult_num">成人{{ scope.row.adult_num }}</span>
                <span v-if="scope.row.child_num" :title="'儿童' + scope.row.child_num">儿童{{ scope.row.child_num }}</span> -->
                <span class="ellipsis" v-if="scope.row.tourist_info" :title="scope.row.tourist_info">{{scope.row.tourist_info}}</span>
                <!-- 是否有退团 0没有 1有 -->
                <router-link v-if="scope.row.is_tourist_cancel == 1"
                  :to="{ path: tuituanFromType + '/tuituanDetail', query: {ono: scope.row.order_no, tid: scope.row.tuan_id}}">
                  [退]
                  <span v-if="scope.row.cancel_num != 0">
                    {{scope.row.cancel_num}}
                  </span>
                </router-link>
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
            <el-table-column label="下单日期" align="center" min-width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-gray">{{ scope.row.scheduled_time }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="代理商" align="left" min-width="150" :resizable="false" v-if="!isZhike">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.distributor_org_name">{{scope.row.distributor_org_name}}</p>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="绑定合同" width="180" align="center" :resizable="false">
              <template slot-scope="scope">{{ scope.row.contract_no || '未绑定合同' }}
              </template>
            </el-table-column> -->
            <el-table-column label="操作" width="70" align="center" fixed="right">
              <template slot-scope="scope">
                <router-link v-if="$menuPermission('api/tuan/sale_bom_order_detail') && !$route.meta.isZhike" :to="'/sale/order/order-detail/' + scope.row.tuan_id + '/' + scope.row.id">
                  查看
                </router-link>
                <router-link v-if="$menuPermission('api/tuan/sale_bom_order_detail') && $route.meta.isZhike" :to="'/sale/order/zhikeorder-detail/' + scope.row.tuan_id + '/' + scope.row.id">
                  查看
                </router-link>
                <!-- <a v-if="$menuPermission('api/contract/bind_order') && !scope.row.contract_no" href="javascript:;" @click="handleBindOrder(scope.row)">绑定合同</a>
                <a v-if="$menuPermission('api/contract/unbind_order') && !!scope.row.contract_no" href="javascript:;" @click="handleUnbindOrder(scope.row)">解绑合同</a> -->
                <!-- <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    查看<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="$menuPermission('api/tuan/sale_bom_order_detail')">
                      <router-link :to="'/sale/order/order-detail/' + scope.row.tuan_id + '/' + scope.row.id">查看</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('api/contract/bind_order') && !scope.row.contract_no"><a href="javascript:;" @click="handleBindOrder(scope.row)">绑定合同</a></el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('api/contract/unbind_order') && !!scope.row.contract_no"><a href="javascript:;" @click="handleUnbindOrder(scope.row)">解绑合同</a></el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('api/tuan/sale_confirm_piece') && scope.row.confirm_status == 2 && scope.row.confirm_is_new === 1 && scope.row.order_from === 1">
                      <router-link :to="{path: '/sale/order/saleOrderConfirmPdf2', query: {parent_id: scope.row.tuan_id, id: scope.row.id}}">确认件</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="$menuPermission('api/tuan/sale_confirm_piece') && scope.row.confirm_status == 2 && scope.row.confirm_is_new === 0 && scope.row.order_from === 1">
                      <router-link :to="{path: '/sale/order/oldconfirm', query: {parent_id: scope.row.tuan_id, id: scope.row.bill_id, type: 1}}">确认件</router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
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
import{
  saleTHOrderList,
  saleZKOrderList
} from 'src/api/tuan';
import * as format from 'src/utils/format';
export default {
  name: 'SaleOrderList',
  data() {
    return {
      totalPage: 1,
      pageShow: false,
      searchInput: {
        scheduled_time_start: '',
        scheduled_time_end: '',
        operator_name: '',
        distributor_org_name: '',
        confirm_status: '',
        order_no: '',
        tuan_no: '',
      },
      searchData: {
        page: 1,
        page_size: 10,
        scheduled_time_start: '',
        scheduled_time_end: '',
        operator_name: '',
        distributor_org_name: '',
        confirm_status: '',
        order_no: '',
        tuan_no: '',
      },
      tableData: [],
      tuituanFromType: null,
      opreateRole: null
    };
  },
  computed: {
    isZhike(){
      return this.$route.meta && this.$route.meta.isZhike;
    },
    scheduled_time_start_opts: function(){
      let endTime = this.searchInput.scheduled_time_end;
      //const today = new Date();

      if(endTime){
        endTime = new Date(endTime);
      }

      return {
        disabledDate(date) {
          return (endTime && endTime < date);
        }
      };
    },
    scheduled_time_end_opts: function(){
      let startTime = this.searchInput.scheduled_time_start;
      //const today = new Date();

      if(startTime){
        startTime = new Date(startTime);
      }

      return {
        disabledDate(date) {
          return (startTime && startTime > date);
        }
      };
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
    // console.log(this.opreateRole)
    switch(this.opreateRole){
      case 1:
        this.tuituanFromType = '/control';
        break;
      case 2:
        if(this.$route.meta.menu == 'saleTeamOrder'){
          this.tuituanFromType = '/sale/myorder';
        }else if(this.$route.meta.menu == 'saleTuanList'){
          this.tuituanFromType = '/sale/order';
        }
        break;
    }
  },
  mounted() {
    this.getList(true);
  },
  watch: {
    '$route' (to, from) {
      this.searchInput.scheduled_time_start = '';
      this.searchInput.scheduled_time_end = '';
      this.searchInput.operator_name = '';
      this.searchInput.distributor_org_name = '';
      this.searchInput.confirm_status = '';
      this.searchInput.order_no = '';
      this.searchInput.tuan_no = '';
      this.getList(true);
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(this.searchData.page != val){
        this.searchData.page = val;
        this.getList();
      }
    },
    getList(bool) {
      if (bool) {
        this.searchData = {... this.searchInput};
        if(this.searchData.scheduled_time_start){
          this.searchData.scheduled_time_start = format.date(this.searchData.scheduled_time_start);
        }
        if(this.searchData.scheduled_time_end){
          this.searchData.scheduled_time_end = format.date(this.searchData.scheduled_time_end);
        }
        this.searchData.page = 1;
        this.searchData.page_size = 10;
      }else{
        this.searchInput = {... this.searchData};
      }
      // if(this.$route.query.contid){
      //   this.searchData.contract_no = this.$route.query.contid;
      // }
      // 请求列表
      const getTypeList = !this.isZhike ? saleTHOrderList : saleZKOrderList;
      getTypeList({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.pageShow = this.totalPage > 0;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleBindOrder(order){
      this.$prompt('合同编号', '绑定合同', {
        confirmButtonText: '绑定',
        cancelButtonText: '取消',
        inputPattern: /[^\s]+/,
        inputErrorMessage: '合同编号不能为空'
      }).then(({ value }) => {
        contractBindOrderSubmit({
          params: {data: {
            order_no_list: [order.order_no],
            contract_no: value
          }},
          success: ({data: resp}) => {
            let {data, code, msg} = resp;

            if(code == 0){
              this.getList(true);
              this.$message.success('绑定成功！');
            }else{
              this.$message.error(msg);
            }
          }
        });
      }).catch(e=>console.log(e));
    },
    handleUnbindOrder(order){
      const h = this.$createElement;

      this.$msgbox({
        title: '解绑订单',
        message: h('p', null, [
          h('span', null, '确认将订单 '),
          h('span', {class: {'color-orange': true}}, order.order_no),
          h('span', null, ' 从合同: '),
          h('span', {class: {'color-orange': true}}, order.contract_no),
          h('span', null, ' 中解绑？ ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) =>{
          if(action === 'confirm'){
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '解绑中';
            contractUnbindOrderSubmit({
              params: {data: {
                order_no: order.order_no,
                contract_no: order.contract_no
              }},
              success: ({data: resp}) => {
                let {data, code, msg} = resp;

                if(code == 0){
                  this.getList(true);
                  this.$message.success('解绑成功！');
                }else{
                  this.$message.error(msg);
                }
                instance.confirmButtonLoading = false;
                done();
              }
            });
          }else{
            done();
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.system-search .search-item .long-label {
  width: 100px;
  margin-left: -80px;
  margin-right: 5px;
}
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
</style>
