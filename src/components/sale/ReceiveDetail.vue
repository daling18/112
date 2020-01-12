<template>
  <div class="recieve-detail">
    <ul class="recieve-list">
      <li class="recieve-box">
        <span class="recieve-label">状态</span>
        <span class="recieve-con" :class="info.payment_info.payment_status | getStatusColor">{{ info.payment_info.payment_status_text }}</span>
      </li>
      <template v-if="info.payment_info.payment_status > 2">
        <li class="recieve-box">
          <span class="recieve-label">原因</span>
          <span class="recieve-con">{{ info.payment_info.info ? info.payment_info.info : '--' }}</span>
        </li>
        <li class="recieve-box">
          <span class="recieve-label">操作人</span>
          <span class="recieve-con">{{ info.payment_info.user_name }} {{ info.payment_info.audit_time }}</span>
        </li>
      </template>
    </ul>
    <div class="recieve-info">
      <h2 class="recieve-tit">收款信息</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">收款ID</span>
          <span class="content-right">{{ info.payment_info.id }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款人</span>
          <span class="content-right">{{ info.payment_info.user_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">所属部门</span>
          <span class="content-right">{{ info.payment_info.org_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">业务类型</span>
          <span class="content-right" v-if="info.payment_info.user_collection_type === 0">--</span>
          <span class="content-right" v-else>{{ info.payment_info.user_collection_type === 1 ? "团队订单收入" : "团队杂费收入" }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">结算方</span>
          <span class="content-right">
            <template v-if="info.payment_info.settlement_org_name == ''">
              --
              </template>
              <template v-else>
                {{info.payment_info.settlement_org_name}}
              </template>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">收款金额（本位币）</span>
          <span class="content-right">{{ info.payment_info.rmb_total_amount }}元<em class="tip">[{{ info.payment_info.is_money_clear }}]</em></span>
        </div>
        <div class="content-box">
          <span class="content-label">金额／币种／汇率</span>
          <span class="content-right">{{ info.payment_info.total_amount }}({{ info.payment_info.currency }} / 汇率{{ info.payment_info.currency_rate }})</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款方式／账户</span>
          <span class="content-right" v-if="!info.payment_info.receipt_bank_name && !info.payment_info.receipt_account && !info.payment_info.receipt_account_name">--</span>
          <span class="content-right" v-else>{{ info.payment_info.receipt_bank_name }}{{ info.payment_info.receipt_account }}{{ info.payment_info.receipt_account_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款日期</span>
          <span class="content-right">{{ info.payment_info.payment_date ? info.payment_info.payment_date : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">备注</span>
          <span class="content-right">{{ info.payment_info.remark ? info.payment_info.remark : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">上传收款凭证</span>
          <span class="content-right" v-if="info.payment_info.attachment && info.payment_info.attachment.length === 0">--</span>
          <span class="content-rightimg" v-else>
            <div class="pic-wrap" v-for="(item, index) in info.payment_info.attachment" :key="index">
              <div class="pic-top" :style="&quot;background-image:url(&quot; + item.url+ &quot;)&quot;">
                <a :href="item.url" class="big-btn" target="_blank"/>
              </div>
              <div class="pic-bottom">
                <a download :href="item.url">下载</a>
              </div>
            </div>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">创建时间</span>
          <span class="content-right">{{ info.payment_info.create_time ? info.payment_info.create_time : '--' }}</span>
        </div>
      </div>
      <h2 class="recieve-tit">业务认款</h2>
      <div class="receive-money-wrap mtb15 clearfix">
        <span class="money-wrap">
          已认金额<span class="color-orange ml10">{{ info.payment_info.already_claim_money }}</span>
        </span>
        <div class="fr" v-if="addRenkuanPerm">
          <!-- <el-button type="primary">+添加认款</el-button> -->
          <router-link class="el-button el-button--primary" :to="{path: addRenkuanPath, query: {pay_id: $route.query.id, id: $route.query.parent_id}}">+添加认款</router-link>
          <!-- <router-link v-else-if="(info.payment_info.payment_status === 1 || info.payment_info.payment_status === 4) && $route.meta.isFinace && info.payment_info.settlement_org_id != 0" class="el-button el-button--primary" :to='{path: "/recieve-detail-add", query: {pay_id: $route.query.id, id: $route.query.parent_id}}'>+添加认款</router-link> -->
        </div>
      </div>
      <div class="receive-money-wrap clearfix">
        <renkuan-table
          :data-list="info.payment_detail_list"
          :top-menu-const="topMenuConst"
          :edit-map="EDIT_MAP"
          :parent-id="$route.query.parent_id"
          @success="getDetail()"
        >
          <el-table-column label="项目号(团号)" width="300" align="center">
            <template slot-scope="scope">
              {{ scope.row.tuan_no || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="tuan_no" label="应收ID" align="center" width="100">
            <template slot-scope="scope">
              <router-link
                v-if="scope.row.is_jump != 0 && incomeDetailPerm"
                :to="{path: incomeDetailPath, query: {bid: scope.row.bill_id, parent_id: $route.query.parent_id}}"
              >{{ scope.row.bill_id }}</router-link>
              <span v-else class="no-go-btn" @click="nogo">{{ scope.row.bill_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="认款ID" align="center" width="120">
            <template slot-scope="scope">
              <span class="color-purple">[{{ scope.row.user_type_name }}]</span>
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="renkuan_role_name" label="认款类型" width="100" align="center"/>
          <el-table-column
            prop="rmb_total_amount"
            align="right"
            header-align="center"
            width="100"
            label="认款金额">
            <template slot-scope="scope">
              <div class="color-orange">{{ scope.row.rmb_total_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="payment_status"
            align="center"
            width="100"
            label="认款状态">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status | getStatusColor">{{ scope.row.payment_status_text }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="100"
            label="认款人">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</div>
            </template>
          </el-table-column>
        </renkuan-table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  financialSettleGetGatheringInfo, 
  saleGetGatheringInfo, 
  comeinGetGatheringInfo,
  zhikeGetGatheringInfo,
  tonghangGetGatheringInfo,
  financialGetGatheringInfo
} from 'src/api/api'
import RenkuanTable from './RenkuanTable.comp'

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
      // EDIT_MAP: ['撤销', '查看撤销记录', '核实', '查看核实详情', '重新核实', '核销', '查看核销详情', '撤销'],
      EDIT_MAP: {},
      payment_id: this.$route.query.id,
      info: {
        payment_info: {},
        payment_detail_list: []
      }
    }
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isZhike() {
      return this.$route.meta && this.$route.meta.isZhiKe;
    },
    getDetailFunc(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        // if (this.isZhike) {
        //   return zhikeGetGatheringInfo
        // } else {
        //   return this.$route.meta.parent_path ? tonghangGetGatheringInfo : saleGetGatheringInfo;
        // }
        // 相同的逻辑，在同一个模块，所以使用同一个接口
        return saleGetGatheringInfo
      case 'operator':
        return comeinGetGatheringInfo;
      case 'finance':
        return financialSettleGetGatheringInfo;

      }
    },
    addRenkuanPerm(){
      const paymentInfo = this.info.payment_info;
      const canAdd = paymentInfo.is_add_payment_detail && paymentInfo.settlement_org_id != 0;

      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return canAdd && this.$menuPermission('api/tuan/sale_renkuan_add');
      case 'operator':
        return canAdd && this.$menuPermission('api/tuan/renkuan_add'); // 缺
      default:
        return false;
      }
    },
    addRenkuanPath(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return '/sale/recognition/peer-proceeds/detail-add';
      case 'operator':
        return '/control/recieve-detail-add';
      default:
        return '';
      }
    },
    incomeDetailPerm(){
      switch(this.topMenuConst){
      case 'sale':
      case 'distribution':
        return this.$menuPermission('api/tuan/sale_income_info');
      case 'operator':
        return this.$menuPermission('api/tuan/op_income_info');
      case 'finance':
        return this.$menuPermission('api/finance/fin_income_info');
      default:
        return false;
      }
    },
    incomeDetailPath(){
      switch(this.topMenuConst){
      case 'distribution':
        return 'income-detail';
      case 'sale':
        return 'income-detail';
      case 'operator':
        return '/control/income-detail';
      case 'finance':
        return 'income-detail';
      default:
        return '';
      }
    },
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      // if(this.$route.meta.isZhiKe && this.isSale) {
      //   this.zhikeGetGatheringInfo();
      // }else if(this.isSale && !this.$route.meta.isZhiKe) {
      //   if(this.$route.meta.parent_path){
      //     this.tonghangGetGatheringInfo();
      //   }else{
      //     this.saleGetGatheringInfo();
      //   }
      // }else if(this.isPlan) {
      //   this.comeinGetGatheringInfo();
      // }else {
      //   this.financialSettleGetGatheringInfo();
      // };
      let params = {
        data: {
          payment_id: this.payment_id
        }
      };
      this.getDetailFunc({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
            this.EDIT_MAP = result.data.edit_list;
          } else {
            this.$message({ type: 'error', message: res.data.msg});
            this.$router.go(-1);
          };
        },
        showLoading: true
      })
    },
    nogo() {
      this.$message({
        type: 'error',
        message: '该收入记录已被删除'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .recieve-detail {
    .no-go-btn {
      color: #b10c79;
      cursor: pointer;
    }
  }
  .recieve-list {
    background-color: #fff;
    list-style: none;
    margin-bottom: 10px;
    padding: 30px 0 20px 30px;
    .recieve-box {
      position: relative;
      padding: 0 0 10px 75px;
      .recieve-label {
        position: absolute;
        top: 0;
        left: 0;
        width: 75px;
        text-align: right;
        font-size: 14px;
        color: #999999;
      }
      .recieve-con {
        padding: 0 0 0 15px;
        font-size: 14px;
        min-height: 30px;
        line-height: 20px;
        // &.green {
        //   color: #019f3d;
        // }
        // &.red {
        //   color: red;
        // }
      }
    }
  }
</style>
