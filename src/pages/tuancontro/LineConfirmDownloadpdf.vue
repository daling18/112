<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="pdf-wrap">
        <div class="button-wrap">
          <a class="el-button el-button--primary" :href="upload">下载为PDF</a>
          <!-- <span class="el-button el-button--primary" @click="saveCostConfirmPdf">下载为PDF</span> -->
        </div>
        <div class="pdf-con">
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
                        <td class="tc" width="20%">费用合计</td>
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
                        <td width="50%" style="height: 200px;">
                          <div class="zhang-wrap">
                            <p>全称：{{pdfCon.distributor_org_name}}</p>
                            <p>联系人：{{pdfCon.distributor_operater_name}}</p>
                            <p>电话：{{pdfCon.distributor_operater_tel}}</p>
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
  import {costConfirmTemplate, saveCostConfirmPdf} from 'src/api/api';
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
        return "/bom/api/tuan/save_cost_confirm_pdf?id=" + this.id + "&tuan_id=" + this.tuan_id
      }
    },
    methods: {
      costConfirmTemplate() {
        let params = {
          data: {
            id: this.$route.query.id,
            tuan_id: this.$route.query.parent_id
          }
        };
        costConfirmTemplate({
          params,
          success: (res) => {
            if(res.data.code === 0) {
              this.pdfCon = res.data.data;
              console.log(this.pdfCon)
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          }
        })
      },
      // 方法弃用
      // saveCostConfirmPdf() {
      //   let data = {
      //     id: this.id,
      //     tuan_id: this.tuan_id
      //   };
      //   saveCostConfirmPdf({
      //     data
      //   }).then((res)=>{
      //     console.log(res)
      //     const content = res.data;
      //     const blob = new Blob([content])
      //     const fileName = "产品确认件-" + this.pdfCon.tuan_no + "-" + this.pdfCon.item_no + ".pdf"
      //     if ('download' in document.createElement('a')) { // 非IE下载
      //       const elink = document.createElement('a')
      //       elink.download = fileName
      //       elink.style.display = 'none'
      //       elink.href = URL.createObjectURL(blob)
      //       document.body.appendChild(elink)
      //       elink.click()
      //       URL.revokeObjectURL(elink.href) // 释放URL 对象
      //       document.body.removeChild(elink)
      //     } else { // IE10+下载
      //       navigator.msSaveBlob(blob, fileName)
      //     }
      //   })
      // }
    },
    mounted() {
      this.costConfirmTemplate();
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
          // height: 200px;
        }
      }
    }
  }
</style>
