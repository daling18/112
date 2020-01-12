<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="pdf-wrap">
        <div class="button-wrap">
          <a class="el-button el-button--primary" :href="upload">下载为PDF</a>
        </div>
        <div class="pdf-con">
          <table class="pdf-table">
            <tbody>
              <tr>
                <td class="tc bg-grey" colspan="4">产品确认件</td>
              </tr>
              <tr>
                <td width="40%" class="bg-grey">TO：{{ pdfCon.distributor_org_name }}</td>
                <td width="20%">联系人：{{ pdfCon.distributor_operater_name }}</td>
                <td width="20%">电话：{{ pdfCon.distributor_operater_tel }}</td>
                <td width="20%">传真：{{ pdfCon.distributor_operater_fax }}</td>
              </tr>
              <tr>
                <td class="bg-grey">FROM：{{ pdfCon.supplier_org_name }}</td>
                <td>联系人：{{ pdfCon.supplier_operater_name }}</td>
                <td>电话：{{ pdfCon.supplier_operater_tel }}</td>
                <td>传真：{{ pdfCon.supplier_operater_fax }}</td>
              </tr>
              <tr>
                <td>线路名称：{{ pdfCon.product_name }}</td>
                <td>团号：{{ pdfCon.tuan_no }}</td>
                <td>订单号：{{ pdfCon.order_no }}</td>
                <td>游客人数：{{ pdfCon.tourist_num_info }}</td>
              </tr>
              <tr>
                <td>去程交通：{{ pdfCon.go_traffic }}<span v-if="pdfCon.go_traffic === ''">无</span></td>
                <td>出团日期：{{ pdfCon.departure_date }}</td>
                <td colspan="2">返程交通：{{ pdfCon.back_traffic }}<span v-if="pdfCon.back_traffic === ''">无</span></td>
              </tr>
              <tr>
                <td class="td-nopd" colspan="4">
                  <table class="small-table">
                    <tbody>
                      <tr>
                        <td class="tc bg-grey" width="15%">行程</td>
                        <td class="tc bg-grey" width="55%">行程安排</td>
                        <td class="tc bg-grey" width="15%">用餐</td>
                        <td class="tc bg-grey" width="15%">住宿</td>
                      </tr>
                      <tr v-for="(item, index) in pdfCon.travel_info" :key="index">
                        <td class="tc">D{{ item.day }}</td>
                        <td v-html="item.info"/>
                        <td class="tc">{{ item.eat_info }}</td>
                        <td class="tc">{{ item.hotel_info }}</td>
                      </tr>
                      <tr v-if="pdfCon.travel_info && pdfCon.travel_info.length == 0"><td class="tc" colspan="4">无</td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="tc bg-grey" colspan="4">团费信息</td>
              </tr>
              <tr>
                <td class="td-nopd" colspan="4">
                  <table class="small-table">
                    <tbody>
                      <tr>
                        <td class="tc" width="25%">类型</td>
                        <td class="tc" width="25%">数量</td>
                        <td class="tc" width="25%">同行单价</td>
                        <td class="tc" width="25%">费用合计</td>
                      </tr>
                      <tr :style="index === 0 ? 'border-bottom: 0px;': ''" v-for="(item, index) in pdfCon.order_detail" :key="index">
                        <td :style="index === 0 ? 'border-bottom: 1px solid #000;': ''" class="tc">{{ item.item_name }}</td>
                        <td :style="index === 0 ? 'border-bottom: 1px solid #000;': ''" class="tc">{{ item.num }}</td>
                        <td :style="index === 0 ? 'border-bottom: 1px solid #000;': ''" class="tc">￥{{ item.rmb_unit_price }}</td>
                        <td v-if="index === 0" :rowspan="pdfCon.order_detail.length" class="tc">￥{{ pdfCon.total_rmb_amount }}</td>
                      </tr>
                      <tr v-if="pdfCon.order_detail && pdfCon.order_detail.length == 0"><td class="tc" colspan="4">无</td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="tc bg-grey" colspan="4">游客信息</td>
              </tr>
              <tr>
                <td class="td-nopd" colspan="4">
                  <table class="small-table">
                    <tbody>
                      <tr>
                        <td class="tc" width="5%">序号</td>
                        <td class="tc" width="10%">游客姓名</td>
                        <td class="tc" width="10%">证件类型</td>
                        <td class="tc" width="20%">证件号码</td>
                        <td class="tc" width="10%">国籍</td>
                        <td class="tc" width="5%">性别</td>
                        <td class="tc" width="10%">证件有效期</td>
                        <td class="tc" width="10%">手机号码</td>
                        <td class="tc" width="10%">出生日期</td>
                        <td class="tc" width="10%">备注</td>
                      </tr>
                      <tr v-for="(item, index) in pdfCon.tourist_list" :key="index">
                        <td class="tc">{{ item.key }}</td>
                        <td class="tc">{{ item.username }}</td>
                        <td class="tc">{{ item.identity_type }}</td>
                        <td class="tc">{{ item.identity_no }}</td>
                        <td class="tc">{{ item.nationality }}</td>
                        <td class="tc">{{ item.gender }}</td>
                        <td class="tc">{{ item.identity_end_date }}</td>
                        <td class="tc">{{ item.mobile }}</td>
                        <td class="tc">{{ item.birthday }}</td>
                        <td class="tc">{{ item.remark }}</td>
                      </tr>
                      <tr v-if="pdfCon.tourist_list && pdfCon.tourist_list.length == 0"><td class="tc" colspan="10">无</td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="tc bg-grey" colspan="4">备注信息</td>
              </tr>
              <tr>
                <td class="td-nopd" colspan="4">
                  <table class="small-table">
                    <tbody>
                      <tr>
                        <td width="50%">
                          <div class="zhang-wrap">
                            <p>全称：{{pdfCon.distributor_org_name}}</p>
                            <p>联系人：{{pdfCon.distributor_operater_name}}</p>
                            <p>电话：{{pdfCon.distributor_operater_tel}}</p>
                            <p>我社确认／盖章</p>
                            <img :src="pdfCon.supplier_seal_yk" v-if="pdfCon.supplier_seal_yk" class="zhang">
                          </div>
                        </td>
                        <td width="50%">
                          <div class="zhang-wrap">
                            <p>贵社确认／盖章：{{pdfCon.confirm_user_name}}</p>
                            <img :src="pdfCon.distributor_seal_yk" v-if="pdfCon.distributor_seal_yk" class="zhang">
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {orderConfirmTemplate, financeOrderConfirmTemplate, saleOrderConfirmTemplate} from 'src/api/api'
export default {
  data() {
    return {
      id: this.$route.query.id,
      parent_id: this.$route.query.parent_id,
      pdfCon: {}
    }
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    upload() {
      switch(this.topMenuConst){
      case 'operator': 
        return '/bom/api/tuan/save_order_confirm_pdf?id=' + this.id;
      case 'sale': 
      case 'distribution': 
        return '/bom/api/tuan/sale_save_order_confirm_pdf?id=' + this.id;
      case 'finance': 
        return '/bom/api/tuan/finance_save_order_confirm_pdf?id=' + this.id;
      }
    },
    orderConfirmTemplateFunc() {
      switch(this.topMenuConst){
      case 'operator': 
        return orderConfirmTemplate;
      case 'sale': 
      case 'distribution': 
        return saleOrderConfirmTemplate;
      case 'finance': 
        return financeOrderConfirmTemplate;
      }
    }
  },
  mounted() {
    this.orderConfirmTemplate();
  },
  methods: {
    orderConfirmTemplate() {
      let params = {
        data: {
          id: this.id
        }
      };
      this.orderConfirmTemplateFunc({
        params,
        success: (res) => {
          if (res.data.code === 0) {
            this.pdfCon = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
            this.$router.go(-1);
          };
        },
        showLoading: true
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .pdf-wrap {
    background-color: #fff;
    padding: 15px;
    .button-wrap {
      text-align: right;
      padding: 0 0 15px;
    }
    .pdf-con {
      width: 100%;
    }
    .pdf-table {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      .tc {
        text-align: center;
      }
      .bg-grey {
        background-color: #d9d9d9;
      }
      .small-table {
        width: 100%;
        td {
          border-right: 1px solid #000;
          border-left: 0;
          border-top: 0;
          border-bottom: 0;
          vertical-align: top;
        }
        tr {
          border-bottom: 1px solid #000;
          td:last-child {
            border-right: 0;
          }
        }
        tr:last-child {
          border-bottom: 0;
        }
      }
      .td-nopd {
        padding: 0;
      }
      td {
        padding: 3px;
        border: 1px solid #000;
      }
      .zhang-wrap {
        position: relative;
        padding: 0 0 80px;
        p {
          padding: 0 0 10px;
        }
        .zhang {
          position: absolute;
          top: 0;
          left: 50px;
          width: 200px;
          height: 200px;
        }
      }
    }
  }
</style>
