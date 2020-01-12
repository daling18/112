<template>
	<div class="details">
	  <div class="system-tab">
	    <ul class="tab-box">
	      <router-link class="on" to="" tag="li">
	        订单状态：{{ orderInfo.pay_status_name }}
	      </router-link>
	      <!-- <router-link :to="{ path: tuituanDetailUrl, query: {ono: orderInfo.order_no, tid: tuanId}}" tag="li">
	        退团/款单详情
	      </router-link> -->
	    </ul>
	  </div>
	  <div class="cont">
	  	<div class="panel">
	  	  <div class="hd">
	  	    <h2>进度跟踪</h2>
	  	    <!-- <span v-if="orderDetailData.order_info[0].pay_channel_code && orderDetailData.order_info[0].channel_req_no"><span>支付渠道：{{orderDetailData.order_info[0].pay_channel_code}}</span><span>第三方流水号：{{orderDetailData.order_info[0].channel_req_no}}</span></span> -->
	  	  </div>
	  	  <div class="bd">
	  	    <el-table class="el-table--middle" :data="speed" border style="width: 100%">
	  	      <el-table-column align="center" label="处理时间" >
              <template slot-scope="scope">{{ scope.row.time }}</template>
            </el-table-column>
	  	       <el-table-column align="center" label="处理信息" >
               <template slot-scope="scope">{{ scope.row.as }}</template>
            </el-table-column>
	  	    </el-table>
	  	  </div>
	  	</div>
	  </div>
	  <div class="cont">
		  <div class="bd">
		  	<el-row :gutter="20">
		  	  <el-col :span="6"><div class="row-bg bg-purple">订单编号：{{ order_no }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">所属公司：{{ orderInfo.policy_holder }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">所属营业部：{{ orderInfo.distributor_name }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">第三方流水号：{{ orderInfo.policy_order_no }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">预定时间：{{ orderInfo.create_time }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">订单状态：{{ orderInfo.pay_status_name}}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">产品生效日期：{{ orderInfo.begin_time | formatDate }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">产品截止日期：{{ orderInfo.end_time | formatDate }}</div></el-col>
		  	</el-row>
			</div>
		</div>

		<div class="cont">
	  	<div class="bd">
        <el-row :gutter="20">
		  	  <el-col :span="6"><div class="row-bg bg-purple">产品名称：{{ orderInfo.supplier_name }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">包含险种：{{ orderInfo.product_name }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">人数：{{ orderInfo.people_num }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">保费总价：{{ orderInfo.order_price }}</div></el-col>
		  	  <el-col :span="6"><div class="row-bg bg-purple">投保天数：{{ orderInfo.days }}</div></el-col>
          <el-col :span="6"><div class="row-bg bg-purple">保单状态：{{ orderInfo.insured_status_name }}</div></el-col>
		  	</el-row>
	  	</div>
	  </div>
    <div class="cont">
		  <div class="bd">
		  	<el-row :gutter="20">
		  	  <el-col :span="6"><div class="row-bg bg-purple">保费价格：{{ orderInfo.order_price }}</div></el-col>
		  	  <el-col :span="6">
            <div class="row-bg bg-purple" v-if="orderInfo.pay_status != 1 && orderInfo.pay_status != 6">已支付：{{orderInfo.order_price}}</div>
            <div class="row-bg bg-purple" v-else>已支付：0</div>
          </el-col>
		  	  <el-col :span="6" v-if="orderInfo.contract_url">
            <div class="row-bg bg-purple">保单已生成：<a :href="orderInfo.contract_url" download="保单详情">下载保单</a></div>
          </el-col>
		  	</el-row>
			</div>
		</div>
    <div class="cont">
      <div v-for="(item, index) in insured" :key='index'>
        <div class="hd">
          <h2>被保人{{ index + 1 }}: </h2>
          <!-- <span v-if="orderDetailData.order_info[0].pay_channel_code && orderDetailData.order_info[0].channel_req_no"><span>支付渠道：{{orderDetailData.order_info[0].pay_channel_code}}</span><span>第三方流水号：{{orderDetailData.order_info[0].channel_req_no}}</span></span> -->
        </div>
        <div class="bd">
          <el-row :gutter="20">
            <el-col :span="7"><div class="row-bg bg-purple">被保人姓名：{{ item.username }}</div></el-col>
            <el-col :span="7"><div class="row-bg bg-purple">被保人证件号：{{ item.cardnum }}</div></el-col>
            <el-col :span="7"><div class="row-bg bg-purple">性别：{{ item.sex }}</div></el-col>
          </el-row>
        </div>
      </div>

  	</div>
		<div class="cont">
			<div class="panel">
			  <div class="hd" v-if="orderInfo.is_invoice == 1">
			    <h2>发票信息</h2>
			    <!-- <span v-if="orderDetailData.order_info[0].pay_channel_code && orderDetailData.order_info[0].channel_req_no"><span>支付渠道：{{orderDetailData.order_info[0].pay_channel_code}}</span><span>第三方流水号：{{orderDetailData.order_info[0].channel_req_no}}</span></span> -->
			  </div>
			  <div class="bd" v-if="orderInfo.is_invoice == 1">
	  	  	<el-row :gutter="20">
						<el-col :span="7"><div class="row-bg bg-purple">发票类型：{{ invoice.type_id == 0 ? '纸质发票' : '电子发票' }}</div></el-col>
						<el-col :span="7"><div class="row-bg bg-purple">发票抬头：{{ invoice.title }}</div></el-col>
						<el-col :span="7"><div class="row-bg bg-purple">纳税人识别号：{{ invoice.tax }}</div></el-col>
						<el-col :span="7"><div class="row-bg bg-purple" v-if="invoice.type_id == 0">邮寄地址：{{ invoice.province }}{{ invoice.city }}{{ invoice.area }}{{ invoice.address_detail }}</div><div class="row-bg bg-purple" v-else>E-mail：{{ invoice.email }}</div></el-col>
						<el-col :span="7"><div class="row-bg bg-purple" v-if="invoice.type_id == 0">联系电话：{{ invoice.phone }}</div></el-col>
	  	  	</el-row>
	  		</div>
        <div class="goBack">
          <el-button type="primary" @click="goBack()">确定</el-button>
        </div>
			</div>
		</div>

	</div>
</template>
<script>

  import {
    getInsuranceOrderInfoNew
  } from "src/api/api";

	export default {
		data() {
			return {
				orderInfo: [],
        orderDetailData: null,
        order_no:this.$route.query.order_no,
        speed:[],//进度
        invoice:{},//发票
        insured:[],//被保人信息
			}
		},
		watch:{
		},
		computed:{
      topMenuConst(){
        return this.$route.meta && this.$route.meta.menu;
      },
		},
		components:{
    },
    filters: {
      formatDate(d) {
        return d ? d.split(' ')[0] : ''
      }
    },
		methods: {

		goBack(){
      if (this.topMenuConst == 'SaleorderInsurance'){
        this.$router.push({
          path:'/saleorder/insurance',   //跳转的路径
        })
      }else if(this.topMenuConst == 'SingleproSelforder'){
        this.$router.push({
          path:'/singlepro/selfsupport-order/insurance',   //跳转的路径
        })
      }
		},
    getInsuranceOrderInfo(){
      //请求数据

      getInsuranceOrderInfoNew({
        params: {
          data: {
            order_no: this.order_no,
          }
        },
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.orderInfo=data.data;
            this.speed = data.data.speed
            this.invoice = data.data.invoice
            this.insured = data.data.insured_list
          } else {
            this.$message.error(data.data.msg);
          }
        },
        showLoading: true
      });
    },
		},
		mounted() {
      this.getInsuranceOrderInfo()
		}
	};
</script>

<style scoped lang="scss">
  .goBack{
    margin: 50px auto;
    width: 100px;

  }
	.row-bg {
    padding: 10px 0;
  }
  .cont {
    padding: 20px 40px;
    background-color: #fff;
  }
  .search-item {
    line-height: 30px;
  }
  .panel {
    margin-bottom: 20px;
    .hd {
      padding: 10px 0 25px;

      h2 {
        display: inline-block;
        color: #b10c79;
        font-size: 16px;
        border-left: 5px solid #b10c79;
        padding-left: 10px;
        line-height: 20px;
      }

      span {
        margin-left: 20px;
        color: #999;
        i {
          color: #f60;
          font-style: normal;
        }
      }
      .op-btn {
        float: right;
      }
    }
  }
  .mr0 {
    margin-right: 0 !important;
  }
  .xd {
    width: 80px;
    color: #999999;
    line-height: 16px;
  }
  .mt10 {
    margin-top: -20px;
  }
  .dess {
    float: left;
    color: #444;
    margin-top: 10px;
  }
  .dess-ul {
    overflow: hidden;
    list-style: none;
  }
  .dess-ul li {
    float: left;
    width: 350px;
  }
  .dess-ul .tit {
    display: inline-block;
    width: 90px;
    color: #999;
    padding: 3px 0;
  }
  .neck-txt {
    margin: -10px 0 8px;
  }
  .neck-txt span {
    display: inline-block;
    margin-right: 15px;
  }
  .neck-txt i {
    font-style: normal;
    color: #f60;
  }
  .neck-txt .op-btn {
    float: right;
    margin-top: -5px;
  }
  .span-btn {
    display: inline-block;
    color: #b10c79;
    cursor: pointer;
    margin: 0 5px;
  }
  .qy {
    overflow: hidden;
    margin-left: 20px;
    .t {
      float: left;
    }
    .c {
      float: left;
      margin-left: 20px;
      width: 115px;
    }
    .el-radio {
      margin: 0 0 10px 0;
    }
    .tip {
      float: left;
      color: #999;
      line-height: 16px;
    }
  }
  // sq-dialog
  .sq-dialog {
    margin-top: -30px;
    .tt {
      color: #666;
    }
    .lin {
      display: block;
      color: #999;
      text-align: center;
    }
  }
  .sq-box {
    margin: 15px 10px 0;
    .tit {
      color: #666;
      margin-bottom: 5px;
    }
    // .b{
    //   color: #f00;
    // }
  }
  .xdtzs-box {
    padding-left: 110px;
    padding-bottom: 30px;
    overflow: hidden;
    .tit {
      float: left;
      margin-left: -110px;
      line-height: 30px;
    }
  }
  .edit-tourist-form{
    width: 90%;
    .el-form-item{
      margin-bottom: 13px;
    }
  }
  .dw100 {
    display: block;
    width: 100%;
  }
  .code-btn {
    float: right;
    margin: 0 10px 0 0;
    color: #b10c79;
  }
  .checkboxcode {
    margin: 0 15px 15px 0;
  }
  .hide-list {
    padding: 5px 0 0;
  }
  .que-icon{
    border-radius: 10px;
    border: 1px solid #aaa;
    padding: 0 4px;
    color: #aaa;
  }

  .price-item{
    display: flex;
    &:first-child{
      margin-top: -15px;
    }
    &:last-child{
      margin-bottom: -10px;
    }
    .detail-form{
      border: 1px dashed #ccc;
      margin-top: 0;
      margin-bottom: 10px;
      flex: 1;
    }
    .opt-btns{
      width: 40px;
      .sub-btn{
        margin-top: 10px;
      }
    }
  }
</style>
