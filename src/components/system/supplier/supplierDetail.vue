<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="content-list">
        <div class="recieve-detail">
          <div class="recieve-info">
            <div class="btn-bar"
              v-if="info.cooperation_status == 0 && $route.query.type == 2">
              <el-button
                type='primary'
                @click="handleCoop(1)">
                确认合作
              </el-button>
              <el-button
                type='primary'
                @click="handleCoop(2)">
                退回
              </el-button>
            </div>
            <div class="recieve-tit">基本信息</div>
            <div class="recieve-content">
              <div v-if="info.company && info.company.length > 0" class="recieve-content-item">
                <div class="label">公司全称</div>
                <div class="content">{{info.company}}</div>
              </div>
              <div v-if="info.duty_paragraph && info.duty_paragraph.length > 0" class="recieve-content-item">
                <div class="label">统一社会信用代码</div>
                <div class="content">{{info.duty_paragraph}}</div>
              </div>
              <div v-if="info.province && info.province.length > 0" class="recieve-content-item">
                <div class="label">所在城市</div>
                <div class="content">{{info.province}}{{info.city}}</div>
              </div>
              <div v-if="info.address && info.address.length > 0" class="recieve-content-item">
                <div class="label">地址</div>
                <div class="content">{{info.address}}</div>
              </div>
            </div>
            <div class="recieve-tit">合作信息</div>
            <div class="recieve-content">
              <div class="recieve-content-item">
                <div class="label">合作信息</div>
                <div class="content">
                  <div class="line-wrap" v-for="(item, index) in info.line_of_cooperation" v-if="item.check" :key="index">
                    <div class="line-one">
                      <span class="line-tit">{{item.name}}</span>
                    </div>
                    <div v-for="(item2, index2) in item.child" v-if="item2.check" :key="'b' + index2" class="line-two">
                      <span class="line-tit">{{item2.name}}</span>
                      <div class="line-three clearfix">
                        <span class="line-item" v-for="(item3, index3) in item2.child" v-if="item3.check" :key="'c' + index3">
                          <span class="line-tit">{{item3.name}}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="recieve-content-item">
                <div class="label">合作有效期截至</div>
                <div class="content">
                  <template v-if="info.cooperation_validity_period">
                    {{info.cooperation_validity_period}}
                  </template>
                  <template v-else>
                    --
                  </template>
                </div>
              </div>
              <!-- <div class="recieve-content-item">
                <div class="label">返佣比例</div>
                <div class="content">{{info.share_benefit_proportion}}%</div>
              </div> -->
              <!-- <div v-if="info.credit_line && info.credit_line != 0" class="recieve-content-item">
                <div class="label">授信额度</div>
                <div class="content">{{info.credit_line}}元</div>
              </div> -->
              <div v-if="info.cooperation_agreement && info.cooperation_agreement.length > 0" class="recieve-content-item">
                <div class="label">合作协议/合同</div>
                <div class="content clearfix">
                  <a v-for="(item, index) in info.cooperation_agreement" :href="item" class="img-fr" target="_blank" :key="index">
                    <img :src="item" alt="">
                  </a>
                </div>
              </div>
            </div>
            <div class="recieve-tit" v-if="info.account_list && info.account_list.length > 0">账户信息</div>
            <div class="recieve-content" v-if="info.account_list && info.account_list.length > 0">
              <el-table
                :data="info.account_list"
                border
                style="width: 100%">
                <el-table-column
                  prop="account_bank"
                  align='center'
                  label="开户银行">
                </el-table-column>
                <el-table-column
                  prop="account_name"
                  align='center'
                  label="开户名">
                </el-table-column>
                <el-table-column
                  prop="account_no"
                  align='center'
                  label="银行卡号">
                </el-table-column>
              </el-table>
            </div>
            <div class="recieve-tit" v-if="info.client_list && info.client_list.length > 0">联系人信息</div>
            <div class="recieve-content" v-if="info.client_list && info.client_list.length > 0">
              <el-table
                :data="info.client_list"
                border
                style="width: 100%">
                <el-table-column
                  prop="name"
                  align='center'
                  label="联系人姓名">
                </el-table-column>
                <el-table-column
                  prop="id_card"
                  align='center'
                  label="身份证">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  align='center'
                  label="联系电话">
                </el-table-column>
                <el-table-column
                  prop="email"
                  align='center'
                  label="邮箱">
                </el-table-column>
              </el-table>
            </div>
            <div class="recieve-tit"
              v-if="info.business_license || 
                    info.business_license_pic ||
                    info.bl_validity_period_start ||
                    info.bl_validity_period_end ||
                    info.license_num_of_bl || 
                    info.license_num_of_bl_pic ||
                    info.tax_registration_num ||
                    info.tax_registration_num_pic ||
                    info.liability_insurance_policy ||
                    info.liability_insurance_policy_pic ||
                    info.lip_validity_period_start ||
                    info.lip_validity_period_end ||
                    info.account_bank_account ||
                    info.account_bank_account_pic ||
                    info.id_card_num ||
                    info.id_card_pic ||
                    info.other ||
                    info.other_pic">资质信息</div>
            <div class="recieve-content">
              <div v-if="(info.business_license && info.business_license.length > 0) || info.business_license_pic || info.bl_validity_period_start || info.bl_validity_period_end" class="recieve-content-item">
                <div class="label">营业执照</div>
                <div class="content">{{info.business_license}}</div>
              </div>
              <div v-if="info.business_license_pic && info.business_license_pic.length > 0" class="recieve-content-item">
                <a :href="info.business_license_pic" class="img" target="_blank">
                  <img :src="info.business_license_pic" alt="">
                </a>
              </div>
              <div v-if="info.bl_validity_period_start || info.bl_validity_period_end" class="recieve-content-item">
                <div class="label">证件有效期</div>
                <div class="content">{{info.bl_validity_period_start}}至{{info.bl_validity_period_end}}</div>
              </div>
              <div v-if="(info.license_num_of_bl && info.license_num_of_bl.length > 0) || info.license_num_of_bl_pic" class="recieve-content-item">
                <div class="label">营业证许可编号</div>
                <div class="content">{{info.license_num_of_bl}}</div>
              </div>
              <div v-if="info.license_num_of_bl_pic && info.license_num_of_bl_pic.length > 0" class="recieve-content-item">
                <a :href="info.license_num_of_bl_pic" class="img" target="_blank">
                  <img :src="info.license_num_of_bl_pic" alt="">
                </a>
              </div>
              <div v-if="(info.tax_registration_num && info.tax_registration_num.length > 0) || info.tax_registration_num_pic" class="recieve-content-item">
                <div class="label">税务登记号</div>
                <div class="content">{{info.tax_registration_num}}</div>
              </div>
              <div v-if="info.tax_registration_num_pic && info.tax_registration_num_pic.length > 0" class="recieve-content-item">
                <a :href="info.tax_registration_num_pic" class="img" target="_blank">
                  <img :src="info.tax_registration_num_pic" alt="">
                </a>
              </div>
              <div v-if="(info.liability_insurance_policy && info.liability_insurance_policy.length > 0) || info.liability_insurance_policy_pic || info.lip_validity_period_start || info.lip_validity_period_end" class="recieve-content-item">
                <div class="label">责任保险单</div>
                <div class="content">{{info.liability_insurance_policy}}</div>
              </div>
              <div v-if="info.liability_insurance_policy_pic && info.liability_insurance_policy_pic.length > 0" class="recieve-content-item">
                <a :href="info.liability_insurance_policy_pic" class="img" target="_blank">
                  <img :src="info.liability_insurance_policy_pic" alt="">
                </a>
              </div>
              <div v-if="info.lip_validity_period_start || info.lip_validity_period_end" class="recieve-content-item">
                <div class="label">证件有效期</div>
                <div class="content">{{info.lip_validity_period_start}}至{{info.lip_validity_period_end}}</div>
              </div>
              <div v-if="(info.account_bank_account && info.account_bank_account.length > 0) || info.account_bank_account_pic" class="recieve-content-item">
                <div class="label">开户行账户</div>
                <div class="content">{{info.account_bank_account}}</div>
              </div>
              <div v-if="info.account_bank_account_pic && info.account_bank_account_pic.length > 0" class="recieve-content-item">
                <a :href="info.account_bank_account_pic" class="img" target="_blank">
                  <img :src="info.account_bank_account_pic" alt="">
                </a>
              </div>
              <div v-if="(info.id_card_num && info.id_card_num.length > 0) || info.id_card_pic" class="recieve-content-item">
                <div class="label">法人或负责人身份证号码</div>
                <div class="content">{{info.id_card_num}}</div>
              </div>
              <div v-if="info.id_card_pic && info.id_card_pic.length > 0" class="recieve-content-item">
                <a :href="info.id_card_pic" class="img" target="_blank">
                  <img :src="info.id_card_pic" alt="">
                </a>
              </div>
              <div v-if="(info.other && info.other.length > 0) || info.other_pic" class="recieve-content-item">
                <div class="label">其他</div>
                <div class="content">{{info.other}}</div>
              </div>
              <div v-if="info.other_pic && info.other_pic.length" class="recieve-content-item">
                <a :href="info.other_pic" class="img" target="_blank">
                  <img :src="info.other_pic" alt="">
                </a>
              </div>
            </div>
            <div class="submit-buttons">
              <el-button type="default" @click="cancel">返回</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {supplierDetail} from 'src/api/supplier';
import {confirmReturnCooperation} from 'src/api/api_supplier';
export default {
  data () {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      info: {
        account: [],
        client_list: []
      }
    }
  },
  methods: {
    supplierDetail () {
      let params = {
        data: {
          id: this.id
        }
      }
      supplierDetail({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            Object.assign(this.info, result.data)
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    cancel () {
      window.history.go(-1)
    },
    handleCoop(type){
      let params = {
        data: {
          id: this.id,
          type: type
        }
      }
      confirmReturnCooperation({
        params,
        success: (res) => {
          let {code, data, msg} = res.data
          if (code === 0) {
            this.$message.success(msg);
            window.history.go(-1);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
  },
  mounted () {
    this.supplierDetail()
  },
}
</script>
<style lang="less" scoped>
.recieve-info{
  position: relative;
}
.btn-bar{
  position: absolute;
  right: 20px;
  top: 5px;
}
  .recieve-detail {
    .recieve-tit {
      font-size: 18px;
      color: #b10c79;
      padding: 0 0 0 10px;
      border-left: 5px solid #b10c79;
    }
    .recieve-content {
      padding: 30px 0;
      .recieve-content-item {
        position: relative;
        padding: 0 0 0 180px;
        margin: 0 0 15px;
        &:last-child {
          margin: 0;
        }
        .label {
          position: absolute;
          top: 0;
          left: 0;
          width: 170px;
          text-align: right;
          color: #999999;
          font-size: 14px;
          line-height: 21px;
        }
        .content {
          font-size: 14px;
          line-height: 21px;
          color: #333333;
          word-break: break-all;
        }
        .img {
          display: block;
          width: 150px;
          height: 180px;
          img {
            display: block;
            width: 100%;
            height: 100%;
            border: 1px solid #ddd;
          }
        }
        .img-fr {
          float: left;
          width: 150px;
          height: 150px;
          margin: 0 10px 10px 0;
          img {
            display: block;
            width: 100%;
            height: 100%;
            border: 1px solid #ddd;
          }
        }
      }
    }
  }
</style>
