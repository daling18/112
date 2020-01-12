// src/components/sale/IncomeDetail.vue
<template>
  <div class="recieve-detail">
    <div class="recieve-info">
      <h2 class="recieve-tit">应收</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">应收金额</span>
          <span class="content-right color-orange">{{ info.rmb_total_amount }}</span>
        </div>
        <div class="content-box" v-if="info.adjustment_detail && info.adjustment_detail.length > 0">
          <span class="content-label">调账申请</span>
          <div v-if="info.adjustment_detail && info.adjustment_detail.length > 0">
            <div class="content-right" v-if="adjustmentDetailPerm">
              <router-link
                v-for="(item, index) in info.adjustment_detail"
                :to="{path: adjustmentDetailPath, query: {id: item.adjustment_id, type: 2, parent_id: $route.query.parent_id}}"
                :key="index"
                class="color-black">
                {{ item.item_no }}<span class="color-purple">[调前应收{{ item.front_amount }}]</span>，
              </router-link>
            </div>
          </div>
          <div class="content-right" v-else>--</div>
        </div>
        <div class="content-box">
          <span class="content-label">团号</span>
          <span class="content-right">{{ info.tuan_no || '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">应收ID</span>
          <span class="content-right">
            {{ info.order_no ? info.bill_id : info.id}}
            <span :class="[info.settle_status == '已结清' ? 'color-green': 'color-purple']">[{{ info.settle_status }}]</span>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">直客/代理商</span>
          <span class="content-right">{{ info.distributor_org_name }}</span>
        </div>
        <template v-if="info.show_type == 1">
          <div class="content-box">
            <span class="content-label">项目名称</span>
            <span class="content-right">{{ info.item_name }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">收入类型</span>
            <span class="content-right">{{ info.bill_type_name }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">数量</span>
            <span class="content-right">{{ info.num }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">单价</span>
            <span class="content-right">
              {{ info.rmb_unit_price }}
              （{{ info.currency }} / {{ info.currency_rate }}）
            </span>
          </div>
          <div class="content-box">
            <span class="content-label">合计</span>
            <span class="content-right">{{ info.rmb_total_amount }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">备注说明</span>
            <span class="content-right">{{ info.remark ? info.remark : '无' }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">创建时间</span>
            <span class="content-right">{{ info.create_time }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">创建人</span>
            <span class="content-right">{{ info.user_name }}</span>
          </div>
          <!-- <div class="content-box">
            <span class="content-label">确认件</span>
            <span class="content-right" v-if="info.confirm_file && info.confirm_file.length === 0">--</span>
            <span class="content-rightimg" v-else>
              <div class="pic-wrap" v-for="(item, index) in info.confirm_file" :key="index">
                <div class="pic-top" :style='"background-image:url(" + item.url+ ")"'>
                  <a :href="item.url" class="big-btn" target="_blank"></a>
                </div>
                <div class="pic-bottom">
                  <a download :href="item.url">下载</a>
                </div>
              </div>
            </span>
          </div> -->
        </template>
        <template v-else>
          <div class="content-box">
            <span class="content-label">订单号</span>
            <span class="content-right">{{ info.order_no }}</span>
          </div>
          <div class="content-box">
            <span class="content-label">订单金额</span>
            <span class="content-right">{{ info.rmb_total_amount }}</span>
          </div>
          <div class="content-box" v-if="!info.is_single">
            <span class="content-label">游客人数</span>
            <span class="content-right">{{ info.enrollment }}</span>
          </div>
          <div class="content-box" v-if="!info.is_single">
            <template v-if="info.order_from == 3">
              <span class="content-label">合同</span>
              <span class="content-right" v-if="info.contract && info.contract.length === 0">--</span>
                <!-- 生成电子合同的，这边单独展示下载电子合同 -->
              <span class="content-right" v-else-if="info.contract_type == 2">
                <a class="link" :href="info.electronic_contract" target="_blank">下载电子合同</a>
              </span>
              <span class="content-rightimg" v-else>
                <div class="pic-wrap" v-for="(item, index) in info.contract" :key="index">
                  <div class="pic-top" :style="&quot;background-image:url(&quot; + item+ &quot;)&quot;">
                    <a :href="item" class="big-btn" target="_blank"/>
                  </div>
                  <div class="pic-bottom">
                    <a download :href="item.url">下载</a>
                  </div>
                </div>
              </span>
            </template>
            <template v-else-if="productConfirmPerm && info.order_id">
              <span class="content-label">确认件</span>
              <span class="content-right">
                <router-link
                  :to="{path: productConfirmPath, query: { parent_id: $route.query.parent_id, id:info.order_id }}"
                  class="link mr5"
                >查看</router-link>
                <a :href="dl" class="link">下载</a>
              </span>
            </template>
          </div>
        </template>
      </div>
      <template v-if="pDetailListStatus">
        <h2 class="recieve-tit">已收</h2>
        <div class="receive-money-wrap mtb15 clearfix">
          <span class="money-wrap">
            已收金额<span class="color-orange ml10">{{ info.rmb_receipted_amount }}</span>
          </span>
          <el-select v-model="filters.payment_status"
                     placeholder="请选择"
                     class="ml10"
                     @change="filtersChange()">
            <el-option label="全部状态" value="" />
            <el-option :key="i"
                       v-for="(o,i) in PAYMENT_STATUS_MAP"
                       :label="o"
                       :value="i" />
          </el-select>
          <el-select v-model="filters.user_type"
                     placeholder="请选择"
                     @change="filtersChange()">
            <el-option label="全部类型" value="" />
            <el-option :key="i"
                       v-for="(o,i) in pDetailAllData.user_type"
                       :label="o"
                       :value="i" />
          </el-select>
        </div>
        <div class="receive-money-wrap clearfix">
          <renkuan-table
            :data-list="pDetailAllData.list"
            :top-menu-const="topMenuConst"
            :edit-map="EDIT_MAP"
            :parent-id="$route.query.parent_id"
            @success="paymentDetailList()"
          >
            <el-table-column label="收款ID" align="center" width="100">
              <template slot-scope="scope">
                <router-link v-if="proceedsDetailPerm" :to="{path: proceedsDetailPath, query: {id: scope.row.payment_id, parent_id: $route.query.parent_id}}">{{ scope.row.payment_id }}</router-link>
                <span v-else>{{ scope.row.payment_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="认款ID"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span class="color-purple">[{{ scope.row.user_type_name }}]</span>
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              hader-align="center"
              align="right"
              width="100"
              label="认款金额">
              <template slot-scope="scope">
                <div class="light pr5">
                  {{ scope.row.rmb_total_amount }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="认款类型" width="120" prop="renkuan_role_name" />
            <el-table-column align="center" label="认款状态" width="120">
              <template slot-scope="scope">
                <span :class="scope.row.payment_status | getStatusColor">{{ PAYMENT_STATUS_MAP[scope.row.payment_status] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              align="center"
              width="100"
              label="认款日期"/>
            <el-table-column
              align="center"
              label="认款人">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</div>
              </template>
            </el-table-column>
          </renkuan-table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  finIncomeInfo, 
  saleIncomeInfo, 
  opIncomeInfo, 
  paymentDetailList
} from 'src/api/api'
import RenkuanTable from './components/RenkuanTable'

export default {
  components: {
    RenkuanTable
  },
  filters: {
    getStatusColor(status){
      switch(status) {
      case 3: 
      case 5: 
        return 'color-red';
      case 2: 
        return 'color-green';
      case 1:
      case 4:
        return 'color-gray';
      default:
        return '';
      }
    }
  },
  data() {
    return {
      EDIT_MAP: {},
      PAYMENT_STATUS_MAP: {},
      info: {},
      pDetailAllData: {},
      pDetailListStatus: false,
      // pDetailBtnName:['撤销','查看撤销记录','核实','查看核实详情','重新核实','核销','查看核销详情','核销通过-撤销'],
      filters: {
        payment_status: '',
        user_type: ''
      },
      // dialogVisible:false,
      // dialogForm:{
      //   title: '',
      //   type:'',
      //   info:'',
      //   id:'',
      //   status: ''
      // },
      // btn_disable: false,
      // dialogData: {}
    }
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    adjustmentDetailPerm(){
      switch(this.topMenuConst){
      case 'singlepro':
      case 'tuancontro':
      case 'saleorder':
      case 'settlement':
        return this.$menuPermission('settlement/recpay/recei/gachandet');
      }
    },
    adjustmentDetailPath(){
      return 'adjustment-detail';
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return 'adjustment-detail';
      case 'operator':
        return 'adjustment-detail';
      case 'settlement':
        return 'adjustment-detail';
      }
    },
    proceedsDetailPerm(){
      return this.$menuPermission('settlement/recpay/recei/getreceidet');
      // 收款详情统一在结算中心下控制
      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return this.$menuPermission('api/tuan/sale_get_gathering_info');
      // case 'operator':
      //   return this.$menuPermission('api/tuan/comein_get_gathering_info');
      // case 'settlement':
      //   return this.$menuPermission('api/tuan/financial_get_gathering_info');

      // }
    },
    proceedsDetailPath(){
      return '/settlement/recpay/receive-detail';
    },
    productConfirmPerm(){
      return true;
      // 不做权限控制
      // switch(this.topMenuConst){
      // case 'operator':
      //   return this.$menuPermission('api/tuan/order_confirm_template');
      // case 'sale':
      // case 'distribution':
      //   return this.$menuPermission('api/tuan/sale_order_confirm_template');
      // case 'settlement':
      //   return this.$menuPermission('api/tuan/finance_order_confirm_template');

      // }
    },
    productConfirmPath(){
      return 'confirm-file';
      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return 'confirm-file';
      // case 'operator':
      //   return 'confirm-file';
      // case 'settlement':
      //   return 'confirm-file';

      // }
    },
    dl() {
      return '/bom/api/tuan/finance_save_order_confirm_pdf?id=' + this.info.order_id;
      // switch(this.topMenuConst){
      // case 'operator': 
      //   return '/bom/api/tuan/save_order_confirm_pdf?id=' + this.info.order_id;
      // case 'sale':
      // case 'distribution':
      //   return '/bom/api/tuan/sale_save_order_confirm_pdf?id=' + this.info.order_id;
      // case 'settlement': 
      //   return '/bom/api/tuan/finance_save_order_confirm_pdf?id=' + this.info.order_id;
      // }
    },
    op() {
      // 当前登录用户类型(一级菜单) 1财务 2销售 3计调
      switch(this.topMenuConst){
      case 'singlepro': 
      case 'tuancontro': 
        return 3;
      case 'saleorder': 
        return 2;
      case 'settlement': 
        return 1;
      default:
        return '';
      }
    },
    getIncomeInfoFunc(){
      return finIncomeInfo;
      // switch(this.topMenuConst){
      // case 'sale':
      // case 'distribution':
      //   return saleIncomeInfo;
      // case 'operator':
      //   return opIncomeInfo;
      // case 'settlement':
      //   return finIncomeInfo;
      // }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // console.log(this.proceedsDetailPerm)
      let params = {
        data: {
          // 自动的新增的收入，需要oid来读取数据 （销售&财务绝对是自动）
          order_no: this.$route.query.oid,
          // 手动新增的收入，需要bid来读取数据 （计调添加收入是手动，其他是自动）
          bill_id: this.$route.query.bid,
          a_id: this.$route.query.aid,
          data_config_type: this.$route.query.type  // 新增数据权限类型：https://testerp.yktour.com.cn/docs/bom/op_income_info
        }
      };
      this.getIncomeInfoFunc({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
            this.paymentDetailList();
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
            this.$router.go(-1);
          };
        },
        showLoading: true
      })
    },
    paymentDetailList(){
      let params = {
        data: {
          op_type: this.op,
          order_no: this.$route.query.oid,
          bill_id: this.$route.query.bid,
          payment_status: this.filters.payment_status,
          user_type: this.filters.user_type
        }
      };
      paymentDetailList({
        params,
        success: (res) => {
          let {code, data, msg} = res.data;
          if (code === 0) {
            this.pDetailAllData = data;
            this.EDIT_MAP = data.edit_arr;
            this.PAYMENT_STATUS_MAP = data.payment_status || {};
            if(data.list.length == 0 && this.filters.payment_status == '' && this.filters.user_type == ''){
              this.pDetailListStatus = false;
            }else{
              this.pDetailListStatus = true;

            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          };
        },
        showLoading: true
      })
    },
    // 过滤功能
    filtersChange(){
      this.paymentDetailList()
    }
  }
}
</script>
<style lang="less" scoped>
.el-select {
  width: 130px;
}
</style>
