<template>
<!-- application\index\view\dev\src\components\system\supplier\supplierDetail.vue -->
  <div class="wrapper">
    <div class="system-content">
      <div class="content-list">
        <div class="recieve-detail">
          <div class="recieve-info">
            <div class="btn-bar"
              v-if="info.cooperation_status == 0 && $route.query.type == 2 && $menuPermission('basedata/supplier/confirmcooperation/confirmreturncooperation')">
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
              <div v-if="info.company" class="recieve-content-item">
                <div class="label">公司全称</div>
                <div class="content">{{info.company}}</div>
              </div>
              <div  class="recieve-content-item" v-if="info.supplier_name">
                <div class="label">旅行社品牌名</div>
                <div class="content">{{info.supplier_name}}</div>
              </div>
              <div v-if="info.duty_paragraph" class="recieve-content-item">
                <div class="label">统一社会信用代码</div>
                <div class="content">{{info.duty_paragraph}}</div>
              </div>
              <!-- <div v-if="info.province && info.province.length > 0" class="recieve-content-item">
                <div class="label">所在城市</div>
                <div class="content">{{info.province}}{{info.city}}</div>
              </div> -->
              <div v-if="info.address" class="recieve-content-item">
                <div class="label">公司地址</div>
                <div class="content">{{info.address}}</div>
              </div>
              <div class="recieve-content-item" v-if="info.client_list.length && info.client_list[0].name">
                <div class="label">联系人</div>
                <div class="content" v-if="info.client_list.length">{{info.client_list[0].name}}</div>
              </div>
              <div class="recieve-content-item" v-if="info.client_list.length && info.client_list[0].phone">
                <div class="label">联系电话</div>
                <div class="content" v-if="info.client_list.length">{{info.client_list[0].phone}}</div>
              </div>
            </div>
            <div 
              class="recieve-tit"
              v-if="info.business_license_pic.length ||
                    info.license_num_of_bl_pic.length ||
                    info.liability_insurance_policy_pic.length ||
                    info.id_card_pic.length"
              >证件信息</div>
            <div class="recieve-content">
              <!-- <div class="paperwork" v-for="(item, index) in info.paperworkPicList" :key="index">
                <img :src="item.url" alt="">
                <div class="pic-name">{{item.name}}</div>
              </div> -->
              <div class="paperwork" v-if="info.business_license_pic.length">
                <img :src="info.business_license_pic[0]" alt="">
                <div class="pic-name">营业执照</div>
              </div> 
              <div class="paperwork" v-if="info.license_num_of_bl_pic.length">
                <img :src="info.license_num_of_bl_pic[0]" alt="">
                <div class="pic-name">营业许可证</div>
              </div>
              <div class="paperwork" v-if="info.liability_insurance_policy_pic.length">
                <img :src="info.liability_insurance_policy_pic[0]" alt="">
                <div class="pic-name">责任保险单</div>
              </div>
              <div class="paperwork" v-if="info.id_card_pic.length">
                <img :src="info.id_card_pic[0]" alt="">
                <div class="pic-name">法人或负责人身份证</div>
              </div>
              <div class="paperwork" v-for="(item,index) in info.other_pic" :key="index">
                <img :src="item" alt="">
                <div class="pic-name">其他证件</div>
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
                <div class="label">合作有效期</div>
                <div class="content">
                  <template v-if="info.cooperation_validity_period">
                    {{info.cooperation_validity_period_start}} - {{info.cooperation_validity_period}}
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
            <div class="recieve-tit" v-if="Object.keys(info.settlement_config_info).length !== 0">结算信息</div>
            <div class="recieve-content" v-if="Object.keys(info.settlement_config_info).length !== 0">
              <div class="recieve-content-item">
                <div class="label">公司全称</div>
                <div class="content item-name">{{info.settlement_config_info.account_name}}</div>
              </div>
              <div class="recieve-content-item">
                <div class="label">开户行</div>
                <div class="content item-name">{{info.settlement_config_info.account_bank}}</div>
              </div>
              <div class="recieve-content-item">
                <div class="label">账户</div>
                <div class="content item-name">{{info.settlement_config_info.account_number}}</div>
              </div>
              <div class="recieve-content-item" v-if="$route.query.type != 2">
                <div class="label">供应商返点</div>
                <div class="content item-name">{{info.settlement_config_info.rebate}}%</div>
              </div>
            </div>
            <div class="submit-button">
              <!-- <el-button type="primary" @click="cancel">同意入驻并开通账号</el-button>
              <el-button type="primary" @click="cancel">审批驳回</el-button> -->
              <el-button type="primary"  @click="cancel">返回</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {supplierDetail, getSupplierDetail} from 'src/api/supplier';
import {confirmReturnCooperation} from 'src/api/api_supplier';
export default {
  data () {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      info: {
        account: [],
        client_list: [
          {
            name: "",
            phone: ""
          }
        ],
        business_license_pic: [],
        license_num_of_bl_pic: [],
        liability_insurance_policy_pic: [],
        id_card_pic: [],
        settlement_config_info: {
          account_name: "",
          account_bank: "",
          account_number: "",
          rebate: ""
        }
      }
    }
  },
  methods: {
    async supplierDetail () {
      let params = {
        data: {
          id: this.id
        }
      }
      const {data: {code, data, msg}} = await getSupplierDetail(params, true)
      if(code !==0) return this.$message.error(msg)
      // Object.assign(this.info, data)
      data.settlement_config_info = data.settlement_config_info || {}
      this.info = data
      console.log(this.info, 'info.settlement_config_info.rebate')
      // supplierDetail({
      //   params,
      //   success: (res) => {
      //     let result = res.data
      //     if (result.code === 0) {
      //       Object.assign(this.info, result.data)
      //       // this.info.paperworkPicList = ['https://testerp.yktour.com.cn/bom/uploads/20190814/dae288ec00730c7fd8e2760648243283.png', 'https://testerp.yktour.com.cn/bom/uploads/20190814/155747115a036be45862c9e08309c64f.png']
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: result.msg
      //       })
      //     }
      //   },
      //   showLoading: true
      // })
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
    .paperwork{
      width: 200px;
      height: 200px;
      display: inline-block;
      margin-right: 20px;
      img{
        width: 100%;
        height:100%;
      }
      .pic-name{
        text-align: center;
      }
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
        .item-name {
          min-width: 100px;
          min-height: 33px;
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
    .submit-button{
      text-align: center;
      .el-button{
        width: 170px;
      }

    }
  }
</style>
