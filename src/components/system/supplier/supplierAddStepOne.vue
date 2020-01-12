<template>
  <div class="wrapper">
    <!-- <div class="system-tab">
      <ul class="tab-box">
        <li class="on">基本信息</li>
        <router-link v-if="id" :to="{path: '/system/supplier-add-step2', query: {id: id, approval_status: approval_status}}" tag="li">资质材料</router-link>
      </ul>
    </div> -->
    <div class="system-content">
      <div class="content-list">
        <div class="recieve-detail">
          <div class="recieve-info">
            <el-form ref="ruleForm" label-width="150px">
              <div class="recieve-tit">基本信息</div>
              <div class="recieve-content">
                <div class="content-box">
                  <el-form-item label="公司全称" required>
                    <el-input v-model="formData.company" :disabled="disable || disableEdit" placeholder="请输入公司全称" class="width1"></el-input>
                  </el-form-item>
                  <el-form-item label="统一社会信用代码" required>
                    <el-autocomplete
                      ref="autoinput"
                      class="width1"
                      v-model="formData.duty_paragraph"
                      placeholder="请输入统一社会信用代码"
                      :trigger-on-focus='false'
                      :fetch-suggestions="getDutyParagraphInfo"
                      @select="selectDutyParagraphInfo"
                      :disabled="disableEdit">
                    </el-autocomplete>
                    <!-- <el-input v-model="formData.duty_paragraph" @input="getDutyParagraphInfo" :disabled="disableEdit" class="width1" placeholder="请输入税号"></el-input> -->
                  </el-form-item>
                  <el-form-item label="所在城市" required>
                    <el-select @input="changeArea(true)" value-key="id" v-model="province" :disabled="disable || disableEdit" placeholder="请选择" key="a">
                      <el-option
                        v-for="item in province_list"
                        :key="item.id"
                        :label="item.area_name"
                        :value="item">
                      </el-option>
                    </el-select>
                    <el-select v-model="city" value-key="id" :disabled="disable || disableEdit" placeholder="请选择" key="b">
                      <el-option
                        v-for="item in city_list"
                        :key="item.id"
                        :label="item.area_name"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="formData.address" :disabled="disable || disableEdit" class="width2" placeholder="公司地址"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="recieve-tit">合作信息</div>
              <div class="recieve-content">
                <el-form-item label="合作信息" required>
                  <div class="line-tree">
                    <div class="line-wrap" v-for="(item, index) in class_ids_list" :key="index">
                      <div class="line-one">
                        <el-checkbox @change="handleCheck(1, item)" v-model="item.check" :indeterminate="item.isIndeterminate"></el-checkbox>
                        <span class="line-tit po"><span v-if="item.child && item.child.length > 0" @click="item.showchild=!item.showchild" class="arror" :class="item.showchild ? '' : 'rotate'"></span>{{item.name}}</span>
                      </div>
                      <el-collapse-transition>
                        <div v-show="item.showchild">
                          <div class="line-two" v-for="(item2, index2) in item.child" :key="index2">
                            <el-checkbox @change="handleCheck(2, item2)" v-model="item2.check" :indeterminate="item2.isIndeterminate"></el-checkbox>
                            <span class="line-tit po"><span v-if="item2.child && item2.child.length > 0" @click="item2.showchild=!item2.showchild" class="arror" :class="item2.showchild ? '' : 'rotate'"></span>{{item2.name}}</span>
                            <el-collapse-transition>
                              <div v-show="item2.child && item2.child.length > 0 && item2.showchild" class="line-three clearfix">
                                <span v-for="(item3, index3) in item2.child" :key="index3" class="line-item">
                                  <el-checkbox @change="handleCheck(3, item3)" v-model="item3.check" :indeterminate="item3.isIndeterminate"></el-checkbox>
                                  <span class="line-tit">{{item3.name}}</span>
                                </span>
                              </div>
                            </el-collapse-transition>
                          </div>
                        </div>
                      </el-collapse-transition>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item
                  label='有效期至'
                  required>
                  <el-date-picker 
                    v-model="formData.cooperation_validity_period"
                    type="date"
                    placeholder="选择日期"
                    :editable="false"
                  />
                  <span class="tig">到期系统自动禁用双方合作关系</span>
                </el-form-item>
                <!-- <el-form-item
                  label='返佣比例'
                  required>
                  <input-number  v-model="formData.share_benefit_proportion" :number='true' :max='100' :min='0' class="width100"/>&nbsp;&nbsp;%
                </el-form-item> -->
                <!-- <el-form-item
                  label='授信额度'
                  required>
                  <input-number  v-model="formData.credit_line" :number='true' :min='0' class="width100"  :disabled="disable || disableEdit"/>&nbsp;&nbsp;元
                </el-form-item> -->
                <el-form-item
                  label='合作协议/合同'
                  required>
                  <el-upload
                    v-if="formData.cooperation_agreement.length < 10"
                    action="/bom/api_supplier/supplier/upload_img"
                    name='image'
                    :show-file-list="false"
                    :on-success="handleCooperationAgreementPicSuccess"
                  >
                    <el-button type="default">选择图片</el-button>
                  </el-upload>
                  <div class="clearfix">
                    <div v-for="(item, index) in formData.cooperation_agreement" class="pic-wrap" :key="index">
                      <div class="close-btn" @click="delpic('cooperation_agreement', index)">x</div>
                      <a :href="item" target="_blank">
                        <img :src="item" alt="">
                      </a>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item v-if="formData.cooperation_agreement.length > 0">
                </el-form-item>
              </div>
              <div class="recieve-tit">账户信息</div>
              <div v-if="approval_status != '1'" class="recieve-content">
                <el-table
                  :data="table.account"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="account_bank"
                    align='center'
                    label="开户银行">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.account_bank" placeholder="开户银行"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="account_name"
                    align='center'
                    label="开户名">
                    <template slot-scope='scope'>
                      <el-input v-model="scope.row.account_name" placeholder="开户名"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="account_no"
                    align='center'
                    label="银行卡号">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.account_no" placeholder="银行卡号"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="操作"
                    width='180'>
                    <template slot-scope='scope'>
                      <el-button v-if="table.account.length === scope.$index + 1" @click="addAccount" type='text'>新增</el-button>
                      <el-button v-if="table.account.length != 1" @click="delAccount(scope)" type='text'>删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-else class="recieve-content">
                <el-table
                  :data="table.account"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="account_bank"
                    align='center'
                    label="开户银行">
                    <template slot-scope="scope">
                      <div class="ellipsis" :title="scope.row.account_bank">{{scope.row.account_bank}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="account_name"
                    align='center'
                    label="开户名">
                    <template slot-scope='scope'>
                      <div class="ellipsis" :title="scope.row.account_name">{{scope.row.account_name}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="account_no"
                    align='center'
                    label="银行卡号">
                    <template slot-scope="scope">
                      <div class="ellipsis" :title="scope.row.account_no">{{scope.row.account_no}}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="recieve-tit">联系人信息</div>
              <div v-if="approval_status != '1'" class="recieve-content">
                <el-table
                  :data="table.linkman"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    align='center'
                    label="联系人姓名">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name" placeholder="联系人姓名"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="id_card"
                    align='center'
                    label="身份证">
                    <template slot-scope='scope'>
                      <el-input v-model="scope.row.id_card" placeholder="身份证"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    align='center'
                    label="联系电话">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.phone" placeholder="联系电话"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    align='center'
                    label="邮箱">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.email" placeholder="邮箱"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align='center'
                    label="操作"
                    width='180'>
                    <template slot-scope='scope'>
                      <el-button v-if="table.linkman.length === scope.$index + 1" @click="addLinkman" type='text'>新增</el-button>
                      <el-button v-if="table.linkman.length != 1" @click="delLinkman(scope)" type='text'>删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-else class="recieve-content">
                <el-table
                  :data="table.linkman"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    align='center'
                    label="联系人姓名">
                    <template slot-scope="scope">
                      <p class="ellipsis" :title="scope.row.name">{{scope.row.name}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="id_card"
                    align='center'
                    label="身份证">
                    <template slot-scope='scope'>
                      <div class="ellipsis" :title="scope.row.id_card">{{scope.row.id_card}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    align='center'
                    label="联系电话">
                    <template slot-scope="scope">
                      <div class="ellipsis" :title="scope.row.phone">{{scope.row.phone}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    align='center'
                    label="邮箱">
                    <template slot-scope="scope">
                      <div class="ellipsis" :title="scope.row.email">{{scope.row.email}}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form>
            <el-form ref="ruleForm2" label-width="200px">
              <div class="recieve-tit">资质材料</div>
              <div class="recieve-content">
                <div class="content-box">
                  <el-form-item label="营业执照">
                    <el-input v-model="formData.business_license" placeholder="请输入营业执照" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleBusinessLicensePicSuccess"
                    >
                      <el-button type="default">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formData.business_license_pic">
                    <div class="pic-wrap">
                      <div class="close-btn" @click="delpic('business_license_pic')">x</div>
                      <a :href="formData.business_license_pic" target="_blank">
                        <img :src="formData.business_license_pic" alt="">
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
                    <el-input v-model="formData.license_num_of_bl" placeholder="请输入营业证许可编号" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleLicenseNumOfBlPicSuccess"
                    >
                      <el-button type="default">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formData.license_num_of_bl_pic">
                    <div class="pic-wrap">
                      <div class="close-btn" @click="delpic('license_num_of_bl_pic')">x</div>
                      <a :href="formData.license_num_of_bl_pic" target="_blank">
                        <img :src="formData.license_num_of_bl_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="税务登记号">
                    <el-input v-model="formData.tax_registration_num" placeholder="请输入税务登记号" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handletaxRegistrationNumPicSuccess"
                    >
                      <el-button type="default">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formData.tax_registration_num_pic">
                    <div class="pic-wrap">
                      <div class="close-btn" @click="delpic('tax_registration_num_pic')">x</div>
                      <a :href="formData.tax_registration_num_pic" target="_blank">
                        <img :src="formData.tax_registration_num_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="责任保险单">
                    <el-input v-model="formData.liability_insurance_policy" placeholder="请输入责任保险单" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleLiabilityInsurancePolicyPicSuccess"
                    >
                      <el-button type="default">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formData.liability_insurance_policy_pic">
                    <div class="pic-wrap">
                      <div class="close-btn" @click="delpic('liability_insurance_policy_pic')">x</div>
                      <a :href="formData.liability_insurance_policy_pic" target="_blank">
                        <img :src="formData.liability_insurance_policy_pic" alt="">
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
                    <el-input v-model="formData.account_bank_account" placeholder="请输入开户行账户" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleAccountBankAccountPicSuccess"
                    >
                      <el-button type="default">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formData.account_bank_account_pic">
                    <div class="pic-wrap">
                      <div class="close-btn" @click="delpic('account_bank_account_pic')">x</div>
                      <a :href="formData.account_bank_account_pic" target="_blank">
                        <img :src="formData.account_bank_account_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="法人或负责人身份证号码">
                    <el-input v-model="formData.id_card_num" placeholder="请输入法人或负责人身份证号码" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleIdCardPicSuccess"
                    >
                      <el-button type="default">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formData.id_card_pic">
                    <div class="pic-wrap">
                      <div class="close-btn" @click="delpic('id_card_pic')">x</div>
                      <a :href="formData.id_card_pic" target="_blank">
                        <img :src="formData.id_card_pic" alt="">
                      </a>
                    </div>
                  </el-form-item>
                  <el-form-item label="其他">
                    <el-input v-model="formData.other" placeholder="其他" class="width"></el-input>
                    <el-upload
                      class="upload-btn-wrap" 
                      action="/bom/api_supplier/supplier/upload_img"
                      name='image'
                      :show-file-list="false"
                      :on-success="handleOtherPicSuccess"
                    >
                      <el-button type="default">选择图片</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item v-if="formData.other_pic">
                    <div class="pic-wrap">
                      <div class="close-btn" @click="delpic('other_pic')">x</div>
                      <a :href="formData.other_pic" target="_blank">
                        <img :src="formData.other_pic" alt="">
                        <!-- <img src="https://testerp.yktour.com.cn/bom/uploads/20180903/eb1252ba9160b0efbe1937238a8fe076.jpg" alt=""> -->
                      </a>
                    </div>
                  </el-form-item>
                </div>
                <div class="submit-buttons submit-buttons-left">
                  <el-button type="primary" @click="addSupplier">保存</el-button>
                  <el-button type="default" @click="cancel">取消</el-button>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getAllAreaList,
        getAllParamProductList,
        getDutyParagraphInfo,
        addSupplierFirstStep,
        editSupplierFirstStep,
        addSupplier,
        getEditSupplierInfo,
        editSupplier} from 'src/api/supplier'
import {formattDate} from 'src/assets/js/common.js';
import InputNumber from 'src/plugins/InputNumber.vue';
export default {
  components: {
    InputNumber
  },
  data () {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      approval_status: this.$route.query.approval_status ? this.$route.query.approval_status + '' : '',
      formData: {
        company: '',
        duty_paragraph: '',
        address: '',
        cooperation_validity_period: '',
        share_benefit_proportion: 0,
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
        credit_line: '',
        cooperation_agreement: []
      },
      province_list: [],
      city_list: [],
      company_list: [],
      class_ids_list: [],
      province: '',
      city: '',
      company: '',
      disable: false,
      disableEdit: false,
      account: [],
      linkman: [],
      table: {
        account: [{
          account_bank: '',
          account_name: '',
          account_no: ''
        }],
        linkman: [{
          name: '',
          id_card: '',
          phone: '',
          email: ''
        }],
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
    selectDutyParagraphInfo (item) {
      this.formData.company = item.company ? item.company : ''
      this.formData.address = item.address ? item.address : ''
      this.disable = true
      this.province_list.forEach((item1, index1) => {
        if (item1.area_name === item.province) {
          this.province = item1
          this.city_list = this.province.child
        }
      })
      this.city_list.forEach((item1, index1) => {
        if (item1.area_name === item.city) {
          this.city = item1
        }
      })
    },
    getAllAreaList () {
      getAllAreaList({
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.province_list = result.data
            if (this.id) {
              this.getEditSupplierInfo()
            } else {
              this.getAllParamProductList()
            }
            this.formData.cooperation_validity_period = new Date().getTime() + 31536000000;
          }
        }
      })
    },
    changeArea (type) {
      this.city_list = this.province.child
      if (type) {
        this.city = ''
      }
    },
    getAllParamProductList () {
      this.class_ids_list = []
      getAllParamProductList({
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            result.data.forEach((item, index) => {
              item.check = false
              item.isIndeterminate = false
              item.index = index
              item.showchild = false
              if (item.child.length > 0) {
                item.child.forEach((item2, index2) => {
                  item2.check = false
                  item2.isIndeterminate = false
                  item2.showchild = false
                  item2.parindex = [index]
                  item2.index = index2
                  if (item2.child.length > 0) {
                    item2.child.forEach((item3, index3) => {
                      item3.check = false
                      item3.isIndeterminate = false
                      item3.parentid = item2.id
                      item3.parindex = [index, index2]
                      item3.index = index3
                    })
                  }
                })
              }
              this.class_ids_list.push(item)
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
    getDutyParagraphInfo (queryString, cb) {
      let str = this.formData.duty_paragraph
      str = str.replace(/[^A-Za-z0-9]/g,'')
      this.$nextTick(function() {
        this.formData.duty_paragraph = str
      })
      let params = {
        data: {
          duty_paragraph: queryString
        }
      }
      // 012345678901234567816
      getDutyParagraphInfo({
        params,
        success: (res) => {
          let result = res.data
          if (this.disable) {
            this.formData.company = ''
            this.province = ''
            this.city = ''
            this.address = ''
            this.city_list = []
            this.disable = false
          }
          if (result.code === 0) {
            let list = []
            if (result.data.list) {
              result.data.list.forEach((item, index) => {
                let obj = {
                  company: item.name,
                  city: item.city,
                  province: item.province,
                  value: item.taxpayer_num,
                  address: item.address
                }
                list.push(obj)
              })
            }
            cb(list)
            if (result.data) {
              // this.formData.company = result.data.name ? result.data.name : ''
              // this.formData.address = result.data.address ? result.data.address : ''
              // this.disable = true
              // this.province_list.forEach((item, index) => {
              //   if (item.area_name === result.data.province) {
              //     this.province = item
              //     this.city_list = this.province.child
              //   }
              // })
              // this.city_list.forEach((item, index) => {
              //   if (item.area_name === result.data.city) {
              //     this.city = item
              //   }
              // })
            }
          }
        }
      })
    },
    addAccount () {
      let obj = {
        account_bank: '',
        account_name: '',
        account_no: ''
      }
      this.table.account.push(obj)
    },
    delAccount (scope) {
      this.table.account.splice(scope.$index, 1)
    },
    addLinkman () {
      let obj = {
        name: '',
        id_card: '',
        phone: '',
        email: ''
      }
      this.table.linkman.push(obj)
    },
    delLinkman (scope) {
      this.table.linkman.splice(scope.$index, 1)
    },
    handleCheck (type, itm) {
      if (type === 1) {
        if (this.class_ids_list[itm.index].check) {
          this.class_ids_list[itm.index].child.forEach((item, index) => {
            item.check = true
            item.isIndeterminate = false
            if (item.child.length > 0) {
              item.child.forEach((item2, index2) => {
                item2.check = true
              })
            }
          })
        } else {
          this.class_ids_list[itm.index].child.forEach((item, index) => {
            item.check = false
            item.isIndeterminate = false
            if (item.child.length > 0) {
              item.child.forEach((item2, index2) => {
                item2.check = false
              })
            }
          })
        }
        this.class_ids_list[itm.index].isIndeterminate = false
      } else if (type === 2) {
        if (this.class_ids_list[itm.parindex[0]].child[itm.index].check) {
          this.class_ids_list[itm.parindex[0]].child[itm.index].child.forEach((item, index) => {
            item.check = true
          })
        } else {
          this.class_ids_list[itm.parindex[0]].child[itm.index].child.forEach((item, index) => {
            item.check = false
          })
        }
        this.class_ids_list[itm.parindex[0]].child[itm.index].isIndeterminate = false
        let len = 0
        this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
          if (item.check) {
            len = len + 1
          }
        })
        if (len === this.class_ids_list[itm.parindex[0]].child.length) {
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = false
        } else if (len === 0) {
          this.class_ids_list[itm.parindex[0]].check = false
          this.class_ids_list[itm.parindex[0]].isIndeterminate = false
        } else {
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
        }
      } else if (type === 3) {
        let len = 0
        this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].child.forEach((item, index) => {
          if (item.check) {
            len = len + 1
          }
        })
        if (len === this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].child.length) {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = true
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = false
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
          let pLen = 0
          this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
            // 添加item.isIndeterminate，避免前面分组有勾选，最后一组全选导致一级复选框是全选的现象
            if (item.check && !item.isIndeterminate) {
              pLen = pLen + 1
            }
          })
          if (pLen === this.class_ids_list[itm.parindex[0]].child.length) {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          }
        } else if (len === 0) {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = false
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = false
          let item2len = 0
          this.class_ids_list[itm.parindex[0]].child.forEach((item, index) => {
            if (item.check) {
              item2len = item2len + 1
            }
          })
          if (item2len === 0) {
            this.class_ids_list[itm.parindex[0]].check = false
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          } else if (item2len === this.class_ids_list[itm.parindex[0]].child.length) {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = false
          } else {
            this.class_ids_list[itm.parindex[0]].check = true
            this.class_ids_list[itm.parindex[0]].isIndeterminate = true
          }
        } else {
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].check = true
          this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]].isIndeterminate = true
          this.class_ids_list[itm.parindex[0]].check = true
          this.class_ids_list[itm.parindex[0]].isIndeterminate = true
        }
      }
    },
    // showChild (index) {
    //   this.class_ids_list[0].child[index].showchild = !this.class_ids_list[0].child[index].showchild
    // },
    delpic (type, index) {
      if (type === 'business_license_pic') {
        this.formData.business_license_pic = ''
      } else if (type === 'license_num_of_bl_pic') {
        this.formData.license_num_of_bl_pic = ''
      } else if (type === 'tax_registration_num_pic') {
        this.formData.tax_registration_num_pic = ''
      } else if (type === 'liability_insurance_policy_pic') {
        this.formData.liability_insurance_policy_pic = ''
      } else if (type === 'account_bank_account_pic') {
        this.formData.account_bank_account_pic = ''
      } else if (type === 'id_card_pic') {
        this.formData.id_card_pic = ''
      } else if (type === 'other_pic') {
        this.formData.other_pic = ''
      } else if (type === 'cooperation_agreement') {
        this.formData.cooperation_agreement.splice(index, 1); 
      }
    },
    handleBusinessLicensePicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.business_license_pic = res.data.domain_name + res.data.path
      } 
    },
    handleLicenseNumOfBlPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.license_num_of_bl_pic = res.data.domain_name + res.data.path
      } 
    },
    handletaxRegistrationNumPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.tax_registration_num_pic = res.data.domain_name + res.data.path
      } 
    },
    handleLiabilityInsurancePolicyPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.liability_insurance_policy_pic = res.data.domain_name + res.data.path
      } 
    },
    handleAccountBankAccountPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.account_bank_account_pic = res.data.domain_name + res.data.path
      } 
    },
    handleIdCardPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.id_card_pic = res.data.domain_name + res.data.path
      } 
    },
    handleOtherPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.other_pic = res.data.domain_name + res.data.path
      } 
    },
    handleCooperationAgreementPicSuccess (res, file) {
      if (res.code === 0) {
        this.domain_name = res.data.domain_name
        this.formData.cooperation_agreement.push(res.data.domain_name + res.data.path)
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
    },
    addSupplier () {
      let class_ids_1 = []
      let class_ids_2 = []
      let class_ids_3 = {}
      this.class_ids_list.forEach((item, index) => {
        if (item.check) {
          class_ids_1.push(item.id)
          if (item.child && item.child.length > 0) {
            item.child.forEach((item2, index2) => {
              if (item2.check) {
                class_ids_2.push(item2.id)
                if (item2.child && item2.child.length) {
                  class_ids_3[item2.id] = []
                  item2.child.forEach((item3, index3) => {
                    if (item3.check) {
                      class_ids_3[item2.id].push(item3.id)
                    }
                  })
                }
              }
            })
          }
        }
      })
      this.account = []
      this.table.account.forEach((item, index) => {
        if (item.account_bank || item.account_name || item.account_no) {
          this.account.push(item)
        }
      })
      this.linkman = []
      this.table.linkman.forEach((item, index) => {
        if (item.name || item.id_card || item.phone || item.email) {
          this.linkman.push(item)
        }
      })
      if (this.formData.cooperation_validity_period) {
        this.formData.cooperation_validity_period = formattDate(this.formData.cooperation_validity_period)
      }
      if (this.time.bl_validity_period_start) {
        this.formData.bl_validity_period_start = formattDate(this.time.bl_validity_period_start)
      }
      if (this.time.bl_validity_period_end) {
        this.formData.bl_validity_period_end = formattDate(this.time.bl_validity_period_end)
      }
      if (this.time.lip_validity_period_start) {
        this.formData.lip_validity_period_start = formattDate(this.time.lip_validity_period_start)
      }
      if (this.time.lip_validity_period_end) {
        this.formData.lip_validity_period_end = formattDate(this.time.lip_validity_period_end)
      }
      let params = {
        data: {
          company: this.formData.company,
          duty_paragraph: this.formData.duty_paragraph,
          province: this.province.area_name ? this.province.area_name : '',
          city: this.city.area_name ? this.city.area_name : '',
          address: this.formData.address,
          class_ids_1: class_ids_1,
          class_ids_2: class_ids_2,
          class_ids_3: class_ids_3,
          account: this.account,
          linkman: this.linkman,
        }
      }
      Object.assign(params.data, this.formData)
      let action = addSupplier
      if (this.id) {
        params.data.id = this.id
        action = editSupplier
      }
      action({
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
    getEditSupplierInfo () {
      let params = {
        data: {
          id: this.id
        }
      }
      getEditSupplierInfo({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.formData.company = result.data.company ? result.data.company : ''
            this.formData.duty_paragraph = result.data.duty_paragraph ? result.data.duty_paragraph : ''
            this.formData.address = result.data.address ? result.data.address : ''
            this.formData.cooperation_validity_period = result.data.cooperation_validity_period ? result.data.cooperation_validity_period : (new Date().getTime() + 31536000000);
            this.formData.share_benefit_proportion = result.data.share_benefit_proportion ? result.data.share_benefit_proportion : 0
            this.province_list.forEach((item, index) => {
              if (item.area_name === result.data.province) {
                this.province = item
                this.city_list = this.province.child
              }
            })
            this.city_list.forEach((item, index) => {
              if (item.area_name === result.data.city) {
                this.city = item
              }
            })
            this.class_ids_list = []
            result.data.line_of_cooperation.forEach((item, index) => {
              if (item.check === 1) {
                item.check = true
              } else {
                item.check = false
              }
              item.isIndeterminate = false
              item.index = index
              item.showchild = false
              if (item.child.length > 0) {
                item.child.forEach((item2, index2) => {
                  if (item2.check === 1) {
                    item2.check = true
                  } else {
                    item2.check = false
                  }
                  item2.isIndeterminate = false
                  item2.showchild = false
                  item2.parindex = [index]
                  item2.index = index2
                  if (item2.child.length > 0) {
                    item2.child.forEach((item3, index3) => {
                      if (item3.check === 1) {
                        item3.check = true
                      } else {
                        item3.check = false
                      }
                      item3.isIndeterminate = false
                      item3.parentid = item2.id
                      item3.parindex = [index, index2]
                      item3.index = index3
                    })
                  }
                })
              }
              this.class_ids_list.push(item)
            })
            this.class_ids_list.forEach((item, index) => {
              if (item.child.length > 0) {
                item.child.forEach((item2, index2) => {
                  if (item2.child.length > 0) {
                    item2.child.forEach((item3, index3) => {
                      this.handleCheck(3, item3)
                    })
                  } else {
                    this.handleCheck(2, item2)
                  }
                })
              } else {
                this.handleCheck(1, item)
              }
            })
            this.table.account = result.data.account_list ? result.data.account_list : []
            this.table.linkman = result.data.client_list ? result.data.client_list : []
            if (this.table.account.length === 0 && this.approval_status != '1') {
              let obj = {
                account_bank: '',
                account_name: '',
                account_no: ''
              }
              this.table.account.push(obj)
            }
            if (this.table.linkman.length === 0 && this.approval_status != '1') {
              let obj = {
                name: '',
                id_card: '',
                phone: '',
                email: ''
              }
              this.table.linkman.push(obj)
            }
            this.time.bl_validity_period_start = result.data.bl_validity_period_start ? result.data.bl_validity_period_start : ''
            this.time.bl_validity_period_end = result.data.bl_validity_period_end ? result.data.bl_validity_period_end : ''
            this.time.lip_validity_period_start = result.data.lip_validity_period_start ? result.data.lip_validity_period_start : ''
            this.time.lip_validity_period_end = result.data.lip_validity_period_end ? result.data.lip_validity_period_end : ''
            Object.assign(this.formData, result.data)
            delete this.formData.line_of_cooperation
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    }
  },
  mounted() {
    this.getAllAreaList()
    if (this.approval_status === '1') {
      this.disableEdit = true
    }
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
    .width100 {
      width: 100px;
    }
    .width1 {
      width: 300px;
    }
    .width2 {
      width: 422px;
    }
    .width {
      width: 390px;
    }
    .upload-btn-wrap {
      display: inline-block;
      margin-left: 15px;
    }
    .pic-wrap {
      position: relative;
      float: left;
      margin: 0 10px 10px 0;
      .close-btn {
        position: absolute;
        top: 0px;
        left: 130px;
        width: 20px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 2;
        text-align: center;
        line-height: 20px;
        color: #fff;
        cursor: pointer;
      }
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
    .submit-buttons-left {
      text-align: left;
      padding: 15px 0 15px 200px;
    }
  }
  .tig{
    color: #aaa;
    margin-left: 10px;
  }
  
</style>
