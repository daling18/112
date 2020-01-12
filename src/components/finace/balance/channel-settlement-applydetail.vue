<template>
  <div  class="wrapper">
    <div class="cont">
      <div class="panel">
        <div class="hd">
          <h2>结算单信息</h2>
        </div>
        <div class="channel-content">
          <div class="item">
            <div class="label">结算单号</div>
            <div class="info">{{resData.settlemen_no ? resData.settlemen_no : "--"}}</div>
          </div>
          <div class="item">
            <div class="label">实际结算金额</div>
            <div class="info red">{{resData.settlement_price ? resData.settlement_price : "--"}}</div>
          </div>
          <div class="item">
            <div class="label">结算状态</div>
            <div class="info green" v-if="resData.settlement_status === 0">产品经理审核中</div>
            <div class="info green" v-else-if="resData.settlement_status === 1">产品总监审核中</div>
            <div class="info green" v-else-if="resData.settlement_status === 2">财务监审核中</div>
            <div class="info green" v-else-if="resData.settlement_status === 3">出纳审核中</div>
            <div class="info green" v-else-if="resData.settlement_status === 4">出纳最终审核通过</div>
            <div class="info green" v-else-if="resData.settlement_status === 5">总监拒绝</div>
            <div class="info green" v-else-if="resData.settlement_status === 6">财务总监拒绝</div>
            <div class="info green" v-else-if="resData.settlement_status === 7">出纳拒绝</div>
            <div class="info green" v-else-if="resData.settlement_status === 8">产品经理拒绝</div>
            <div class="info green" v-else-if="resData.settlement_status === 9">返佣/结算付款失败</div>
            <div class="info green" v-else-if="resData.settlement_status === 10">供应链审核中</div>
            <div class="info green" v-else-if="resData.settlement_status === 11">供应链拒绝</div>
          </div>
          <div class="item">
            <div class="label">供应商</div>
            <div class="info">{{resData.supplier_name ? resData.supplier_name : "--"}}</div>
          </div>
          <div class="item">
            <div class="label">供应商联系方式</div>
            <div class="info" v-if="resData.supplier_name || resData.supplier_phone">{{resData.supplier_name}}&nbsp;&nbsp;{{resData.supplier_phone}}</div>
            <div class="info" v-else>--</div>
          </div>
          <div class="item">
            <div class="label">退款金额</div>
            <div class="info">{{resData.refund_price ? resData.refund_price : '--'}}</div>
          </div>
          <div class="item">
            <div class="label">结算日期</div>
            <div class="info">{{resData.settlement_date ? resData.settlement_date : "--"}}</div>
          </div>
          <div class="item">
            <div class="label">申请日期</div>
            <div class="info">{{resData.apply_data ? resData.apply_data : "--"}}</div>
          </div>
          <div class="item">
            <div class="label">结算渠道</div>
            <div class="info" v-if="resData.settlement_channel === 0">余额</div>
            <div class="info" v-else-if="resData.settlement_channel === 1">民生</div>
            <div class="info" v-else-if="resData.settlement_channel === 2">线下</div>
            <!-- <div class="info">{{resData.settlement_channel ? resData.settlement_channel : "--"}}</div> -->
          </div>
        </div>
        <p class="tip">注：结算单中存在退款订单时，需等待退款审核完毕后才能继续审核结算单，否则结算单将不能进行审核。</p>
        <el-table
          :data="resData.order_list"
          style="width: 100%"
          class="el-table--middle"
          border>
          <el-table-column
            label="订单号"
            width="400"
            :resizable="false"
          >
          <template slot-scope="scope">
            <div>
              [TDM]<span class="purple pr10">{{scope.row.order_no}}</span>{{scope.row.product_name}}
            </div>
            <div>
              [云平台]<span class="purple pr10">{{scope.row.bom_order_no}}</span>
            </div>
          </template>
          </el-table-column>
          <el-table-column
            label="结算金额"
            align="center"
            :resizable="false"
            prop="final_price"
          >
          </el-table-column>
          <el-table-column
            label="退团金额"
            align="center"
            :resizable="false"
            prop="refund_price"
          >
          </el-table-column>
          <el-table-column
            label="结算状态"
            align="center"
            :resizable="false"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">待审核</span>
            <span v-else-if="scope.row.status === 1">通过</span>
            <span v-else-if="scope.row.status === 2">拒绝</span>
          </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

import {channelSettlementDetail}from 'src/api/api'

export default {
  data () {
    return {
      resData: {
        settlemen_no: ""
      }
    }
  },
  methods:{
    channelSettlementDetail() {
      let params = {
        data: {
          account_no: this.$route.query.id
        }
      };
      channelSettlementDetail({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.resData = result.data.result;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          };
        },
        showLoading: true
      })
    }
  },
  mounted(){
    this.channelSettlementDetail();
  }
}
</script>
<style scoped lang="less">
  .panel{
    margin-bottom: 20px;
    .hd{
      padding: 10px 0 25px;
      h2{
        display: inline-block;
        color: #b10c79;
        font-size: 18px;
        border-left: 5px solid #b10c79;
        padding-left: 10px;
        line-height: 20px;
      }
      span{
        margin-left: 20px;
        color: #999;
        i{
          color: #f60;
          font-style: normal;
        }
      }
    }
  }
  .cont{
    padding: 20px;
    background-color: #fff;
  }
  .channel-content {
    .item {
      position: relative;
      padding: 0 0 0 170px;
      height: 28px;
      margin: 0 0 10px;
      .label {
        position: absolute;
        top: 0;
        left: 0;
        width: 170px;
        height: 28px;
        line-height: 28px;
        text-align: right;
        color: #999999;
      }
      .info {
        padding: 0 0 0 10px;
        height: 28px;
        line-height: 28px;
      }
    }
  }
  .tip {
    font-size: 14px;
    color: #999;
    padding: 20px 0;
    border-top: 1px dotted #999;
  }
  .green {
    color: #019f3d;
  }
  .red {
    color: #ff6600;
  }
  .purple {
    color: #b10c79;
  }
  .pr10 {
    padding-right: 10px;
  }
</style>
