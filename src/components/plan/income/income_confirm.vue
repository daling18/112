<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="pdf-wrap">
        <div class="button-wrap">
          <a class="el-button el-button--primary" :href="upload">下载为PDF</a>
          <!-- <span class="el-button el-button--primary" @click="saveCostConfirmPdf">下载为PDF</span> -->
        </div>
        <div class="pdf-con" v-if="!pdfCon.order_no">
          <table class="pdf-table">
            <tbody>
              <tr>
                <td class="tc bg-grey" colspan="4">产品确认件</td>
              </tr>
              <tr>
                <td width="40%" class="bg-grey">我社名称（代理商）：{{pdfCon.distributor_org_name}}</td>
                <td width="20%">联系人：{{pdfCon.distributor_operater_name}}</td>
                <td width="20%">电话：{{pdfCon.distributor_operater_tel}}</td>
                <td width="20%">传真：{{pdfCon.distributor_operater_fax}}</td>
              </tr>
              <tr>
                <td width="40%" class="bg-grey">贵社名称（供应商）：{{pdfCon.supplier_org_name}}</td>
                <td width="20%">联系人：{{pdfCon.supplier_operater_name}}</td>
                <td width="20%">电话：{{pdfCon.supplier_operater_tel}}</td>
                <td width="20%">传真：{{pdfCon.supplier_operater_fax}}</td>
              </tr>
              <tr>
                <td width="40%">线路名称：{{pdfCon.product_name}}</td>
                <td width="20%">团号：{{pdfCon.tuan_no}}</td>
                <td width="20%">成本id：{{pdfCon.item_no}}</td>
                <td width="20%">出发日期：{{pdfCon.departure_date}}</td>
              </tr>
              <tr>
                <td class="tc bg-grey" colspan="4">报价信息</td>
              </tr>
              <tr>
                <td class="td-nopd" colspan="4">
                  <table class="small-table">
                    <tbody>
                      <tr>
                        <td class="tc" width="20%">项目名称</td>
                        <td class="tc" width="20%">项目类型</td>
                        <td class="tc" width="20%">数量</td>
                        <td class="tc" width="20%">单价</td>
                        <td class="tc" width="20%">费用总计</td>
                      </tr>
                      <tr v-for="(item, index) in pdfCon.item_lists" :key="index">
                        <td class="tc">{{item.item_name}}</td>
                        <td class="tc">{{item.item_type_name}}</td>
                        <td class="tc">{{item.num}}</td>
                        <td class="tc">￥{{item.rmb_unit_price}}</td>
                        <td v-if="index === 0" :rowspan="pdfCon.item_lists.length" class="tc" width="25%">￥{{pdfCon.rmb_total_amount}}</td>
                      </tr>
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
        <div class="pdf-con" v-if="pdfCon.order_no">
          <table class="pdf-table">
            <tbody>
              <tr>
                <td class="tc bg-grey" colspan="4">产品确认件</td>
              </tr>
              <tr>
                <td width="40%" class="bg-grey">TO：{{pdfCon.distributor_org_name}}</td>
                <td width="20%">联系人：{{pdfCon.distributor_operater_name}}</td>
                <td width="20%">电话：{{pdfCon.distributor_operater_tel}}</td>
                <td width="20%">传真：{{pdfCon.distributor_operater_fax}}</td>
              </tr>
              <tr>
                <td class="bg-grey">FROM：{{pdfCon.supplier_org_name}}</td>
                <td>联系人：{{pdfCon.supplier_operater_name}}</td>
                <td>电话：{{pdfCon.supplier_operater_tel}}</td>
                <td>传真：{{pdfCon.supplier_operater_fax}}</td>
              </tr>
              <tr>
                <td>线路名称：{{pdfCon.product_name}}</td>
                <td>团号：{{pdfCon.tuan_no}}</td>
                <td>订单号：{{pdfCon.order_no}}</td>
                <td>游客人数：{{pdfCon.tourist_num_info}}</td>
              </tr>
              <tr>
                <td>去程交通：{{pdfCon.go_traffic}}<span v-if="pdfCon.go_traffic === ''">无</span></td>
                <td>出团日期：{{pdfCon.departure_date}}</td>
                <td colspan="2">返程交通：{{pdfCon.back_traffic}}<span v-if="pdfCon.back_traffic === ''">无</span></td>
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
                        <td class="tc">D{{item.day}}</td>
                        <td v-html="item.info"></td>
                        <td class="tc">{{item.eat_info}}</td>
                        <td class="tc">{{item.hotel_info}}</td>
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
                        <td :style="index === 0 ? 'border-bottom: 1px solid #000;': ''" class="tc">{{item.item_name}}</td>
                        <td :style="index === 0 ? 'border-bottom: 1px solid #000;': ''" class="tc">{{item.num}}</td>
                        <td :style="index === 0 ? 'border-bottom: 1px solid #000;': ''" class="tc">￥{{item.rmb_unit_price}}</td>
                        <td v-if="index === 0" :rowspan="pdfCon.order_detail.length" class="tc">￥{{pdfCon.total_rmb_amount}}</td>
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
                        <td class="tc">{{item.key}}</td>
                        <td class="tc">{{item.username}}</td>
                        <td class="tc">{{item.identity_type}}</td>
                        <td class="tc">{{item.identity_no}}</td>
                        <td class="tc">{{item.nationality}}</td>
                        <td class="tc">{{item.gender}}</td>
                        <td class="tc">{{item.identity_end_date}}</td>
                        <td class="tc">{{item.mobile}}</td>
                        <td class="tc">{{item.birthday}}</td>
                        <td class="tc">{{item.remark}}</td>
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
                        <td width="50%" style="height: 200px;">
                          <div class="zhang-wrap">
                            <p>全称：{{pdfCon.supplier_org_name}}</p>
                            <p>联系人：{{pdfCon.supplier_operater_name}}</p>
                            <p>电话：{{pdfCon.supplier_operater_tel}}</p>
                            <p>我社确认／盖章</p>
                            <img :src="pdfCon.supplier_seal_yk" v-if="pdfCon.supplier_seal_yk" class="zhang">
                          </div>
                        </td>
                        <td width="50%" style="height: 200px;">
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
  import {incomeConfirmTemplate} from 'src/api/api';
  export default {
    data() {
      return {
        id: this.$route.query.id,
        tuan_id: this.$route.query.parent_id,
        pdfCon: {}
      }
    },
    computed: {
      upload() {
        return "/bom/api/tuan/save_income_confirm_pdf?id=" + this.id + "&tuan_id=" + this.tuan_id
      }
    },
    methods: {
      incomeConfirmTemplate() {
        let params = {
          data: {
            id: this.id,
            tuan_id: this.tuan_id
          }
        };
        incomeConfirmTemplate({
          params,
          success: (res) => {
            if(res.data.code === 0) {
              this.pdfCon = res.data.data;
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        })
      } 
    },
    mounted() {
      this.incomeConfirmTemplate();
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
        word-break: break-all;
      }
      .zhang-wrap {
        position: relative;
        padding: 0 0;
        height: 100%;
        p {
          padding: 0 0 10px;
        }
        .zhang {
          position: absolute;
          top: 0;
          bottom: 0px;
          left: 0px;
          right: 0px;
          width: 200px;
          opacity: 0.8;
          margin: auto;
        }
      }
    }
  }
</style>

