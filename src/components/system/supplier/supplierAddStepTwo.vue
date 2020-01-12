<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link :to="{path: '/system/supplier-add-step1', query: {id: id, approval_status: approval_status}}" tag="li">基本信息</router-link>
        <li class="on">资质材料</li>
      </ul>
    </div>
    <div class="system-content">
      <div class="content-list">
        <div class="recieve-detail">
          <div class="recieve-info">
            <el-form ref="ruleForm" label-width="200px">
              <div class="recieve-tit">资质材料</div>
              <div class="recieve-content">
                <div class="content-box">
                  <el-form-item label="营业执照">
                    <el-input v-model="formDate.business_license" placeholder="请输入营业执照" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleBusinessLicensePicSuccess"
                    >
                      <el-button type="primary">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formDate.business_license_pic">
                    <div class="pic-wrap">
                      <a :href="formDate.business_license_pic" target="_blank">
                        <img :src="formDate.business_license_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="证件有效期">
                    <el-date-picker 
                      v-model="time.bl_validity_period_start"
                      type="date"
                      placeholder="选择日期"
                      :editable="false"
                      :picker-options="datepickerOptions2"
                    />
                    <el-date-picker 
                      v-model="time.bl_validity_period_end"
                      type="date"
                      placeholder="选择日期"
                      :editable="false"
                      :picker-options="datepickerOptions1"
                    />
                  </el-form-item>
                  <el-form-item label="营业证许可编号">
                    <el-input v-model="formDate.license_num_of_bl" placeholder="请输入营业证许可编号" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleLicenseNumOfBlPicSuccess"
                    >
                      <el-button type="primary">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formDate.license_num_of_bl_pic">
                    <div class="pic-wrap">
                      <a :href="formDate.license_num_of_bl_pic" target="_blank">
                        <img :src="formDate.license_num_of_bl_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="税务登记号">
                    <el-input v-model="formDate.tax_registration_num" placeholder="请输入税务登记号" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handletaxRegistrationNumPicSuccess"
                    >
                      <el-button type="primary">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formDate.tax_registration_num_pic">
                    <div class="pic-wrap">
                      <a :href="formDate.tax_registration_num_pic" target="_blank">
                        <img :src="formDate.tax_registration_num_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="责任保险单">
                    <el-input v-model="formDate.liability_insurance_policy" placeholder="请输入责任保险单" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleLiabilityInsurancePolicyPicSuccess"
                    >
                      <el-button type="primary">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formDate.liability_insurance_policy_pic">
                    <div class="pic-wrap">
                      <a :href="formDate.liability_insurance_policy_pic" target="_blank">
                        <img :src="formDate.liability_insurance_policy_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="证件有效期">
                    <el-date-picker 
                      v-model="time.lip_validity_period_start"
                      type="date"
                      placeholder="选择日期"
                      :editable="false"
                      :picker-options="datepickerOptions4"
                    />
                    <el-date-picker 
                      v-model="time.lip_validity_period_end"
                      type="date"
                      placeholder="选择日期"
                      :editable="false"
                      :picker-options="datepickerOptions3"
                    />
                  </el-form-item>
                  <el-form-item label="开户行账户">
                    <el-input v-model="formDate.account_bank_account" placeholder="请输入开户行账户" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleAccountBankAccountPicSuccess"
                    >
                      <el-button type="primary">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formDate.account_bank_account_pic">
                    <div class="pic-wrap">
                      <a :href="formDate.account_bank_account_pic" target="_blank">
                        <img :src="formDate.account_bank_account_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="法人或负责人身份证号码">
                    <el-input v-model="formDate.id_card_num" placeholder="请输入法人或负责人身份证号码" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleIdCardPicSuccess"
                    >
                      <el-button type="primary">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formDate.id_card_pic">
                    <div class="pic-wrap">
                      <a :href="formDate.id_card_pic" target="_blank">
                        <img :src="formDate.id_card_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="其他">
                    <el-input v-model="formDate.other" placeholder="其他" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleOtherPicSuccess"
                    >
                      <el-button type="primary">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formDate.other_pic">
                    <div class="pic-wrap">
                      <a :href="formDate.other_pic" target="_blank">
                        <img :src="formDate.other_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="submit-buttons">
                <el-button @click="cancel" type="default">上一步</el-button>
                <el-button @click="addEditSupplierSecondStep" type="primary">保存</el-button>
                <el-button @click="cancel" type="default">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {addEditSupplierSecondStep,getEditSupplierSecondInfo} from 'src/api/supplier'
import {formattDate} from 'src/assets/js/common.js';
export default {
  data () {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      approval_status: this.$route.query.approval_status ? this.$route.query.approval_status + '' : '',
      formDate: {
        business_license: '',
        business_license_pic: '',
        bl_validity_period_start: '',
        bl_validity_period_end: '',
        license_num_of_bl: '',
        license_num_of_bl_pic: '',
        tax_registration_num: '',
        tax_registration_num_pic: '',
        liability_insurance_policy: '',
        liability_insurance_policy_pic: '',
        lip_validity_period_start: '',
        lip_validity_period_end: '',
        account_bank_account: '',
        account_bank_account_pic: '',
        id_card_num: '',
        id_card_pic: '',
        other: '',
        other_pic: '',
      },
      time: {
        bl_validity_period_start: '',
        bl_validity_period_end: '',
        lip_validity_period_start: '',
        lip_validity_period_end: ''
      },
      domain_name: ''
    }
  },
  computed: {
    datepickerOptions1(type) {
      let tDate = this.time.bl_validity_period_start
      return {
        disabledDate(time) {
          return time.getTime() < new Date(tDate).getTime();
        }
      };
    },
    datepickerOptions2(type) {
      let tDate = this.time.bl_validity_period_end
      return {
        disabledDate(time) {
          return time.getTime() > new Date(tDate).getTime();
        }
      };
    },
    datepickerOptions3(type) {
      let tDate = this.time.lip_validity_period_start
      return {
        disabledDate(time) {
          return time.getTime() < new Date(tDate).getTime();
        }
      };
    },
    datepickerOptions4(type) {
      let tDate = this.time.lip_validity_period_end
      return {
        disabledDate(time) {
          return time.getTime() > new Date(tDate).getTime();
        }
      };
    },
  },
  methods: {
    addEditSupplierSecondStep () {
      if (this.time.bl_validity_period_start) {
        this.formDate.bl_validity_period_start = formattDate(this.time.bl_validity_period_start)
      }
      if (this.time.bl_validity_period_end) {
        this.formDate.bl_validity_period_end = formattDate(this.time.bl_validity_period_end)
      }
      if (this.time.lip_validity_period_start) {
        this.formDate.lip_validity_period_start = formattDate(this.time.lip_validity_period_start)
      }
      if (this.time.lip_validity_period_end) {
        this.formDate.lip_validity_period_end = formattDate(this.time.lip_validity_period_end)
      }
      let params = {
        data: this.formDate
      }
      params.data.id = this.id
      addEditSupplierSecondStep({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.$router.push({
              path: '/system/supplier'
            })
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
    getEditSupplierSecondInfo () {
      let params = {
        data: {
          id: this.id
        }
      }
      getEditSupplierSecondInfo({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.time.bl_validity_period_start = result.data.bl_validity_period_start ? result.data.bl_validity_period_start : ''
            this.time.bl_validity_period_end = result.data.bl_validity_period_end ? result.data.bl_validity_period_end : ''
            this.time.lip_validity_period_start = result.data.lip_validity_period_start ? result.data.lip_validity_period_start : ''
            this.time.lip_validity_period_end = result.data.lip_validity_period_end ? result.data.lip_validity_period_end : ''
            Object.assign(this.formDate, result.data)
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
    handleBusinessLicensePicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formDate.business_license_pic = res.data.domain_name + res.data.path
      } 
    },
    handleLicenseNumOfBlPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formDate.license_num_of_bl_pic = res.data.domain_name + res.data.path
      } 
    },
    handletaxRegistrationNumPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formDate.tax_registration_num_pic = res.data.domain_name + res.data.path
      } 
    },
    handleLiabilityInsurancePolicyPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formDate.liability_insurance_policy_pic = res.data.domain_name + res.data.path
      } 
    },
    handleAccountBankAccountPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formDate.account_bank_account_pic = res.data.domain_name + res.data.path
      } 
    },
    handleIdCardPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formDate.id_card_pic = res.data.domain_name + res.data.path
      } 
    },
    handleOtherPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formDate.other_pic = res.data.domain_name + res.data.path
      } 
    },
    cancel () {
      const h = this.$createElement;
      this.$confirm('', '操作提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        message: h('div', null, [
          h('p', null, '您当前内容未保存，是否要离开本界面？'),
          h('p', null, '（离开后，已编辑好的内容将不会被保存）, 是否继续?')
        ]),
        center: true
      }).then(() => {
        window.history.go(-1)
      }).catch(() => {
        
      });
    }
  },
  mounted () {
    this.getEditSupplierSecondInfo()
  },
}
</script>
<style lang="less" scoped>
  .recieve-detail {
    .recieve-tit {
      font-size: 18px;
      color: #b10c79;
      padding: 0 0 0 10px;
      border-left: 5px solid #b10c79;
    }
    .recieve-content {
      padding: 30px 0;
    }
    .width {
      width: 390px;
    }
    .upload-btn-wrap {
      display: inline-block; 
    }
    .pic-wrap {
      a {
        display: block;
        width: 150px;
        height: 180px;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid #ddd;
      }
    }
  }
</style>
