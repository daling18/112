<template>
    <!-- application\index\view\dev\src\components\system\supplier\supplierAddStepOne.vue -->
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
                            <div class="tips">请务必填写真实信息，以便于我们更快的审核</div>
                            <div class="recieve-content">
                                <div class="content-box">
                                    <el-form-item label="供应商类型" required>
                                        <el-radio-group v-model="formData.is_signing">
                                            <el-radio label="1">签约</el-radio>
                                            <el-radio label="2" v-if="!is_signingDisabled">非签约</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="公司全称" required>
                                        <el-input v-model="formData.company" :disabled="disableEdit" placeholder="请输入公司全称" class="width1"></el-input>
                                    </el-form-item>
                                    <el-form-item label="旅行社品牌名" :required="formData.is_signing == '1'">
                                        <el-input v-model="formData.supplier_name" placeholder="请输入旅行社品牌名" class="width1"></el-input>
                                    </el-form-item>
                                    <el-form-item label="统一社会信用代码" :required="formData.is_signing == '1'">
                                        <el-autocomplete ref="autoinput" class="width1" :maxlength=18 v-model="formData.duty_paragraph" placeholder="请输入统一社会信用代码" :trigger-on-focus='false' :fetch-suggestions="getDutyParagraphInfo" @select="selectDutyParagraphInfo">
                                        </el-autocomplete>
                                        <!-- <el-input v-model="formData.duty_paragraph" @input="getDutyParagraphInfo" :disabled="disableEdit" class="width1" placeholder="请输入税号"></el-input> -->
                                    </el-form-item>
                                    <el-form-item label="所在城市" :required="formData.is_signing == '1'">
                                        <!-- <el-select @input="changeArea(true)" value-key="id" v-model="province" :disabled="disable || disableEdit" placeholder="请选择" key="a"> -->
                                        <el-select @input="changeArea(true)" value-key="id" v-model="province" placeholder="请选择" key="a">
                                            <el-option v-for="item in province_list" :key="item.id" :label="item.area_name" :value="item">
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="city" value-key="id" placeholder="请选择" key="b">
                                            <el-option v-for="item in city_list" :key="item.id" :label="item.area_name" :value="item">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="公司地址" :required="formData.is_signing == '1'">
                                        <el-input v-model="formData.address" class="width2" placeholder="公司地址详细地址"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系人" required v-if="!disableEdit">
                                        <el-input v-model="formData.contact_name" :maxlength=10 :disabled="disableEdit" class="width2" placeholder="请务必填写真实姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话" required v-if="!disableEdit">
                                        <el-input v-model="formData.contact_phone" :maxlength=11 :disabled="disableEdit" class="width2" placeholder="请务必填写联系人真实手机号"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div v-if="disableEdit">
                                <div class="recieve-tit">联系信息</div>
                                <div class="recieve-content">
                                    <el-form-item label="联系人" required>
                                        <el-input v-model="formData.contact_name" class="width2" placeholder="请务必填写真实姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话" required>
                                        <el-input v-model="formData.contact_phone" class="width2" placeholder="请务必填写联系人真实手机号"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="recieve-tit">证件信息</div>
                            <div class="recieve-content">
                                <span class="paperwork-text">上传更多专业资质有利于更快的审核，仅支持上传图片，格式图片仅支持jpg，jpeg，png</span>
                                <el-form-item label="营业执照" :required="formData.is_signing == '1'">
                                    <el-upload class="avatar-uploader" list-type="picture-card" action="/api/v1/basedata/supplier/upload" :file-list="formData.business_license_pic" :limit=1 :on-success="handleBusinessLicensePicSuccess" :on-remove="removeImgBusiness"
                                        :before-upload="handlePictureBeforeUpload">
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="营业许可证" :required="formData.is_signing == '1'">
                                    <el-upload class="avatar-uploader" list-type="picture-card" action="/api/v1/basedata/supplier/upload" :limit=1 :file-list="formData.license_num_of_bl_pic" :on-success="handleLicenseNumOfBlPicSuccess" :on-remove="removeImgLicense"
                                        :before-upload="handlePictureBeforeUpload">
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="责任保险单" :required="formData.is_signing == '1'">
                                    <el-upload class="avatar-uploader" list-type="picture-card" action="/api/v1/basedata/supplier/upload" :limit=1 :file-list="formData.liability_insurance_policy_pic" :on-success="handleLiabilityInsurancePolicyPicSuccess" :on-remove="removeImgLiability"
                                        :before-upload="handlePictureBeforeUpload">
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="法人或负责人身份证" :required="formData.is_signing == '1'">
                                    <el-upload class="avatar-uploader" list-type="picture-card" action="/api/v1/basedata/supplier/upload" :limit=1 :file-list="formData.id_card_pic" :on-success="handleIdCardPicSuccess" :on-remove="removeImgIdCard" :before-upload="handlePictureBeforeUpload">
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="其他证件">
                                    <el-upload class="avatar-uploader" list-type="picture-card" action="/api/v1/basedata/supplier/upload" :file-list="formData.other_pic" :on-success="handleOtherPicSuccess" :on-remove="removeOther" :before-upload="handlePictureBeforeUpload">
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <div class="recieve-tit">合作信息</div>
                            <div class="recieve-content">
                                <el-form-item label="合作信息" :required="formData.is_signing == '1'">
                                    <el-collapse>
                                        <el-collapse-item v-for="(item, index) in class_ids_list" :key="index">
                                            <div slot="title">
                                                <el-checkbox @change="handleCheck(1, item)" v-model="item.check" :indeterminate="item.isIndeterminate"></el-checkbox>
                                                <span><span v-if="item.child && item.child.length > 0" @click="item.showchild=!item.showchild" :class="item.showchild ? '' : 'rotate'"></span>{{item.name}}</span>
                                            </div>
                                            <div class="el-form">
                                                <el-form-item>
                                                    <el-collapse>
                                                        <el-collapse-item v-for="(item2, index2) in item.child" :key="index2">
                                                            <template slot="title">
                                                                <el-checkbox @change="handleCheck(2, item2)" v-model="item2.check" :indeterminate="item2.isIndeterminate"></el-checkbox>
                                                                <span><span v-if="item2.child && item2.child.length > 0" @click="item2.showchild=!item2.showchild" :class="item2.showchild ? '' : 'rotate'"></span>{{item2.name}}</span>
                                                            </template>
                                                            <div>
                                                                <div v-show="item2.child && item2.child.length > 0">
                                                                    <span v-for="(item3, index3) in item2.child" :key="index3">
                                                                        <el-checkbox @change="handleCheck(3, item3)" v-model="item3.check" :indeterminate="item3.isIndeterminate"></el-checkbox>
                                                                        <span>{{item3.name}}</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </el-collapse-item>
                                                    </el-collapse>
                                                </el-form-item>
                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </el-form-item>
                                <el-form-item label='合作有效期' :required="formData.is_signing == '1'">
                                    <el-date-picker v-model="formData.cooperation_validity_period_start" type="date" placeholder="合作开始日期" :picker-options="pickerOptionsFront">
                                    </el-date-picker>
                                    <span class="fenge">至</span>
                                    <el-date-picker v-model="formData.cooperation_validity_period_end" type="date" placeholder="合作结束日期" :default-value="defaultEnd" :picker-options="pickerOptionsEnd">
                                    </el-date-picker>
                                    <span class="tig">到期系统自动禁用双方合作关系</span>
                                </el-form-item>
                                <el-form-item label='合作协议/合同' :required="formData.is_signing == '1'">
                                    <el-upload v-if="formData.cooperation_agreement.length < 10" action="/api/v1/basedata/supplier/upload" list-type="picture-card" :file-list="formData.cooperation_agreement" :on-success="handleCooperationAgreementPicSuccess">
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                        <!-- <el-button type="default">选择图片</el-button> -->
                                    </el-upload>
                                </el-form-item>
                                <el-form-item v-if="formData.cooperation_agreement.length > 0">
                                </el-form-item>
                            </div>
                            <div class="recieve-tit">结算信息</div>
                            <div class="recieve-content">
                                <el-form label-width="155px">
                                    <el-form-item label="开户名称">
                                        <span>{{formData.company}}</span>
                                    </el-form-item>
                                    <el-form-item label="开户行" required>
                                        <el-input v-model="formData.account_bank" placeholder="输入开户行" class="width1"></el-input>
                                    </el-form-item>
                                    <el-form-item label="账户" required>
                                        <el-input v-model="formData.account_bank_account" :maxlength=22 placeholder="输入开户账号" class="width1"></el-input>
                                    </el-form-item>
                                    <el-form-item label="供应商返点(线路产品)">
                                        <el-input v-model="formData.rebateRate" class="width1">
                                            <template slot="append">%</template>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="submit-buttons-left submit-btn">
                                <el-button type="primary" @click="_addSubmitSupplier">确定</el-button>
                                <!-- <el-button type="default" @click="cancel">取消</el-button> -->
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getAllAreaList,
    getAllParamProductList,
    getDutyParagraphInfo,
    addSupplierFirstStep,
    editSupplierFirstStep,
    // addSupplier,
    addSupplierPromise,
    getSupplierDetail,
    // getEditSupplierInfo,
    // editSupplier,
    editSupplierPromise
} from "src/api/supplier";
import { formattDate } from "src/assets/js/common.js";
import InputNumber from "src/plugins/InputNumber.vue";
import {
    phoneReg,
    textReg,
    numberRegSeat,
    integerReg
} from "src/utils/regular";
import Moment from "moment";

export default {
    components: {
        InputNumber
    },
    data() {
        return {
            id: this.$route.query.id ? this.$route.query.id : "",
            approval_status: this.$route.query.approval_status
                ? this.$route.query.approval_status + ""
                : "",
            formData: {
                company: "",
                supplier_name: "",
                duty_paragraph: "",
                address: "",
                contact_name: "",
                contact_phone: "",
                is_signing: "1",
                // cooperation_validity_period: '',
                cooperation_validity_period_start: "",
                cooperation_validity_period_end: "",
                share_benefit_proportion: 0,
                business_license: "",
                business_license_pic: [],
                bl_validity_period_start: "",
                bl_validity_period_end: "",
                license_num_of_bl: "",
                license_num_of_bl_pic: [],
                tax_registration_num: "",
                tax_registration_num_pic: "",
                liability_insurance_policy: "",
                liability_insurance_policy_pic: [], //责任保险单照片
                // lip_validity_period_start: '',
                // lip_validity_period_end: '',
                account_bank: "", //开户行
                account_bank_account: "", //开户账号
                rebateRate: "", //供应商返点
                // account_bank_account_pic: '',
                id_card_num: "",
                id_card_pic: [], //身份证照片
                other: "",
                other_pic: [], //其他照片
                credit_line: "",
                cooperation_agreement: []
            },
            province_list: [],
            city_list: [],
            company_list: [],
            class_ids_list: [],
            province: "",
            city: "",
            company: "",
            disable: false,
            disableEdit: false,
            account: [],
            linkman: [],
            table: {
                account: [
                    {
                        account_bank: "",
                        account_name: "",
                        account_no: ""
                    }
                ],
                linkman: [
                    {
                        name: "",
                        id_card: "",
                        phone: "",
                        email: ""
                    }
                ]
            },
            time: {
                bl_validity_period_start: "",
                bl_validity_period_end: "",
                lip_validity_period_start: "",
                lip_validity_period_end: ""
            },
            domain_name: "",
            paperworkType: [
                "营业执照",
                "营业许可证",
                "责任保险单",
                "法人或责任人身份证"
            ],
            pickerOptionsFront: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            pickerOptionsEnd: {
                disabledDate(time) {
                    return time.getTime() <= Date.now() + 90 * 24 * 3600 * 1000;
                }
            },
            defaultEnd: "",
            is_signingDisabled: false,
        };
    },
    computed: {
        datepickerOptions1(type) {
            let tDate = this.time.bl_validity_period_start;
            return {
                disabledDate(time) {
                    return time.getTime() < new Date(tDate).getTime();
                }
            };
        },
        datepickerOptions2(type) {
            let tDate = this.time.bl_validity_period_end;
            return {
                disabledDate(time) {
                    return time.getTime() > new Date(tDate).getTime();
                }
            };
        },
        datepickerOptions3(type) {
            let tDate = this.time.lip_validity_period_start;
            return {
                disabledDate(time) {
                    return time.getTime() < new Date(tDate).getTime();
                }
            };
        },
        datepickerOptions4(type) {
            let tDate = this.time.lip_validity_period_end;
            return {
                disabledDate(time) {
                    return time.getTime() > new Date(tDate).getTime();
                }
            };
        }
    },
    mounted() {
        let next3Month = Moment(Date.now() + 90 * 24 * 3600 * 1000).format(
            "YYYY-MM-DD"
        );
        this.defaultEnd = next3Month;
        this.getAllAreaList();
        if (this.approval_status === "1") {
            this.disableEdit = true;
        }
        this.$nextTick(() => {
            let div = document.getElementsByClassName("mandatory");
            for (let i = 0; i < div.length; i++) {
                const element = div[i];
                element.firstElementChild.setAttribute("style", "width:90%");
            }
        });
    },
    methods: {
        selectDutyParagraphInfo(item) {
            this.formData.company = item.company ? item.company : "";
            this.formData.address = item.address ? item.address : "";
            this.disable = true;
            this.province_list.forEach((item1, index1) => {
                if (item1.area_name === item.province) {
                    this.province = item1;
                    this.city_list = this.province.child;
                }
            });
            this.city_list.forEach((item1, index1) => {
                if (item1.area_name === item.city) {
                    this.city = item1;
                }
            });
        },
        getAllAreaList() {
            getAllAreaList({
                success: res => {
                    let result = res.data;
                    if (result.code === 0) {
                        this.province_list = result.data;
                        if (this.id) {
                            this._getEditSupplierInfo();
                        } else {
                            this.getAllParamProductList();
                        }
                        // this.formData.cooperation_validity_period = new Date().getTime() + 31536000000;
                    }
                }
            });
        },
        changeArea(type) {
            this.city_list = this.province.child;
            if (type) {
                this.city = "";
            }
        },
        getAllParamProductList() {
            this.class_ids_list = [];
            getAllParamProductList({
                success: res => {
                    let result = res.data;
                    if (result.code === 0) {
                        result.data.forEach((item, index) => {
                            item.check = false;
                            item.isIndeterminate = false;
                            item.index = index;
                            item.showchild = false;
                            if (item.child.length > 0) {
                                item.child.forEach((item2, index2) => {
                                    item2.check = false;
                                    item2.isIndeterminate = false;
                                    item2.showchild = false;
                                    item2.parindex = [index];
                                    item2.index = index2;
                                    if (item2.child.length > 0) {
                                        item2.child.forEach((item3, index3) => {
                                            item3.check = false;
                                            item3.isIndeterminate = false;
                                            item3.parentid = item2.id;
                                            item3.parindex = [index, index2];
                                            item3.index = index3;
                                        });
                                    }
                                });
                            }
                            this.class_ids_list.push(item);
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: result.msg
                        });
                    }
                },
                showLoading: true
            });
        },
        getDutyParagraphInfo(queryString, cb) {
            let str = this.formData.duty_paragraph;
            str = str.replace(/[^A-Za-z0-9]/g, "");
            this.$nextTick(function() {
                this.formData.duty_paragraph = str;
            });
            let params = {
                data: {
                    duty_paragraph: queryString
                }
            };
            // 012345678901234567816
            getDutyParagraphInfo({
                params,
                success: res => {
                    let result = res.data;
                    if (this.disable) {
                        this.formData.company = "";
                        this.province = "";
                        this.city = "";
                        this.address = "";
                        this.city_list = [];
                        this.disable = false;
                    }
                    if (result.code === 0) {
                        let list = [];
                        if (result.data.list) {
                            result.data.list.forEach((item, index) => {
                                let obj = {
                                    company: item.name,
                                    city: item.city,
                                    province: item.province,
                                    value: item.taxpayer_num,
                                    address: item.address
                                };
                                list.push(obj);
                            });
                        }
                        cb(list);
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
            });
        },
        // addAccount () {
        //   let obj = {
        //     account_bank: '',
        //     account_name: '',
        //     account_no: ''
        //   }
        //   this.table.account.push(obj)
        // },
        // delAccount (scope) {
        //   this.table.account.splice(scope.$index, 1)
        // },
        // addLinkman () {
        //   let obj = {
        //     name: '',
        //     id_card: '',
        //     phone: '',
        //     email: ''
        //   }
        //   this.table.linkman.push(obj)
        // },
        // delLinkman (scope) {
        //   this.table.linkman.splice(scope.$index, 1)
        // },
        handleCheck(type, itm) {
            if (type === 1) {
                if (this.class_ids_list[itm.index].check) {
                    this.class_ids_list[itm.index].child.forEach(
                        (item, index) => {
                            item.check = true;
                            item.isIndeterminate = false;
                            if (item.child.length > 0) {
                                item.child.forEach((item2, index2) => {
                                    item2.check = true;
                                });
                            }
                        }
                    );
                } else {
                    this.class_ids_list[itm.index].child.forEach(
                        (item, index) => {
                            item.check = false;
                            item.isIndeterminate = false;
                            if (item.child.length > 0) {
                                item.child.forEach((item2, index2) => {
                                    item2.check = false;
                                });
                            }
                        }
                    );
                }
                this.class_ids_list[itm.index].isIndeterminate = false;
            } else if (type === 2) {
                if (
                    this.class_ids_list[itm.parindex[0]].child[itm.index].check
                ) {
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.index
                    ].child.forEach((item, index) => {
                        item.check = true;
                    });
                } else {
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.index
                    ].child.forEach((item, index) => {
                        item.check = false;
                    });
                }
                this.class_ids_list[itm.parindex[0]].child[
                    itm.index
                ].isIndeterminate = false;
                let len = 0;
                this.class_ids_list[itm.parindex[0]].child.forEach(
                    (item, index) => {
                        if (item.check) {
                            len = len + 1;
                        }
                    }
                );
                if (len === this.class_ids_list[itm.parindex[0]].child.length) {
                    this.class_ids_list[itm.parindex[0]].check = true;
                    this.class_ids_list[
                        itm.parindex[0]
                    ].isIndeterminate = false;
                } else if (len === 0) {
                    this.class_ids_list[itm.parindex[0]].check = false;
                    this.class_ids_list[
                        itm.parindex[0]
                    ].isIndeterminate = false;
                } else {
                    this.class_ids_list[itm.parindex[0]].check = true;
                    this.class_ids_list[itm.parindex[0]].isIndeterminate = true;
                }
            } else if (type === 3) {
                let len = 0;
                this.class_ids_list[itm.parindex[0]].child[
                    itm.parindex[1]
                ].child.forEach((item, index) => {
                    if (item.check) {
                        len = len + 1;
                    }
                });
                if (
                    len ===
                    this.class_ids_list[itm.parindex[0]].child[itm.parindex[1]]
                        .child.length
                ) {
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.parindex[1]
                    ].check = true;
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.parindex[1]
                    ].isIndeterminate = false;
                    this.class_ids_list[itm.parindex[0]].check = true;
                    this.class_ids_list[itm.parindex[0]].isIndeterminate = true;
                    let pLen = 0;
                    this.class_ids_list[itm.parindex[0]].child.forEach(
                        (item, index) => {
                            // 添加item.isIndeterminate，避免前面分组有勾选，最后一组全选导致一级复选框是全选的现象
                            if (item.check && !item.isIndeterminate) {
                                pLen = pLen + 1;
                            }
                        }
                    );
                    if (
                        pLen ===
                        this.class_ids_list[itm.parindex[0]].child.length
                    ) {
                        this.class_ids_list[itm.parindex[0]].check = true;
                        this.class_ids_list[
                            itm.parindex[0]
                        ].isIndeterminate = false;
                    }
                } else if (len === 0) {
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.parindex[1]
                    ].check = false;
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.parindex[1]
                    ].isIndeterminate = false;
                    let item2len = 0;
                    this.class_ids_list[itm.parindex[0]].child.forEach(
                        (item, index) => {
                            if (item.check) {
                                item2len = item2len + 1;
                            }
                        }
                    );
                    if (item2len === 0) {
                        this.class_ids_list[itm.parindex[0]].check = false;
                        this.class_ids_list[
                            itm.parindex[0]
                        ].isIndeterminate = false;
                    } else if (
                        item2len ===
                        this.class_ids_list[itm.parindex[0]].child.length
                    ) {
                        this.class_ids_list[itm.parindex[0]].check = true;
                        this.class_ids_list[
                            itm.parindex[0]
                        ].isIndeterminate = false;
                    } else {
                        this.class_ids_list[itm.parindex[0]].check = true;
                        this.class_ids_list[
                            itm.parindex[0]
                        ].isIndeterminate = true;
                    }
                } else {
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.parindex[1]
                    ].check = true;
                    this.class_ids_list[itm.parindex[0]].child[
                        itm.parindex[1]
                    ].isIndeterminate = true;
                    this.class_ids_list[itm.parindex[0]].check = true;
                    this.class_ids_list[itm.parindex[0]].isIndeterminate = true;
                }
            }
        },
        handlePictureBeforeUpload(file) {
            const isJPG =
                ["image/jpeg", "image/jpg", "image/png"].indexOf(file.type) >
                -1;
            // const isLt2M = file.size / 1024 / 1024 < 1;

            if (!isJPG) {
                this.$message.error("上传图片只能是 jpg、jpeg、png 格式!");
            }
            // if (!isLt2M) {
            //   this.$message.error('上传图片大小不能超过 1MB!');
            // }
            return isJPG;
        },
        handleBusinessLicensePicSuccess(res, file) {
            //营业执照上传
            if (res.code !== 0) return this.$message.error(res.msg);
            this.formData.business_license_pic.push({
                name: res.data.name,
                url: res.data.path
            });
        },
        removeImgBusiness() {
            this.formData.business_license_pic = [];
        },
        handleLicenseNumOfBlPicSuccess(res, file) {
            //营业许可证上传
            if (res.code !== 0) return this.$message.error(res.msg);
            this.formData.license_num_of_bl_pic.push({
                url: res.data.path,
                name: res.data.name
            });
        },
        removeImgLicense() {
            this.formData.license_num_of_bl_pic = [];
        },
        handleLiabilityInsurancePolicyPicSuccess(res, file) {
            //责任保险
            if (res.code !== 0) return this.$message.error(res.msg);
            this.formData.liability_insurance_policy_pic.push({
                url: res.data.path,
                name: res.data.name
            });
        },
        removeImgLiability() {
            this.formData.liability_insurance_policy_pic = [];
        },
        handleIdCardPicSuccess(res, file) {
            //法人或负责人身份证上传
            if (res.code !== 0) return this.$message.error(res.msg);
            this.formData.id_card_pic.push({
                url: res.data.path,
                name: res.data.name
            });
        },
        removeImgIdCard() {
            this.formData.id_card_pic = [];
        },
        handleOtherPicSuccess(res, file) {
            //其他图片上传
            if (res.code !== 0) return this.$message.error(res.msg);
            this.formData.other_pic.push({
                url: res.data.path,
                name: res.data.name
            });
        },
        removeOther(file, fileList) {
            this.formData.other_pic = fileList;
        },
        handleCooperationAgreementPicSuccess(res, file) {
            //合作协议上传
            if (res.code !== 0) return this.$message.error(res.msg);
            this.formData.cooperation_agreement.push({
                url: res.data.path,
                name: res.data.name
            });
        },
        cancel() {
            const h = this.$createElement;
            this.$confirm("", "操作提示", {
                confirmButtonText: "是",
                cancelButtonText: "否",
                message: h("div", null, [
                    h("p", null, "您当前内容未保存，是否要离开本界面？"),
                    h(
                        "p",
                        null,
                        "（离开后，已编辑好的内容将不会被保存）, 是否继续?"
                    )
                ]),
                center: true
            })
                .then(() => {
                    window.history.go(-1);
                })
                .catch(() => {});
        },
        async _addSubmitSupplier() {
            if (!this.id) {
                if(this.formData.is_signing == '1') {
                    if (
                        !this.formData.is_signing ||
                        !this.formData.company ||
                        !this.formData.supplier_name ||
                        !this.formData.duty_paragraph ||
                        !this.province ||
                        !this.city ||
                        !this.formData.address ||
                        !this.formData.contact_name ||
                        !this.formData.contact_phone
                    ) return this.$message.warning("基本信息填写不完整");
                } else {
                    if (
                        !this.formData.is_signing ||
                        !this.formData.company ||
                        !this.formData.contact_name ||
                        !this.formData.contact_phone
                    ) return this.$message.warning("基本信息填写不完整");
                }
            }

            let class_ids_1 = [];
            let class_ids_2 = [];
            let class_ids_3 = {};
            this.class_ids_list.forEach((item, index) => {
                if (item.check) {
                    class_ids_1.push(item.id);
                    if (item.child && item.child.length > 0) {
                        item.child.forEach((item2, index2) => {
                            if (item2.check) {
                                class_ids_2.push(item2.id);
                                if (item2.child && item2.child.length) {
                                    class_ids_3[item2.id] = [];
                                    item2.child.forEach((item3, index3) => {
                                        if (item3.check) {
                                            class_ids_3[item2.id].push(
                                                item3.id
                                            );
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });

            if(this.formData.is_signing == '1') {
                if (this.formData.address.length < 5)
                    return this.$message.warning("公司地址最少输入5个字符");
                if (!phoneReg.test(this.formData.contact_phone))
                    return this.$message.warning("请填写正确的手机号码");
    
                if (!this.formData.business_license_pic.length) {
                    this.$message.error("请上传营业执照图片");
                    return false;
                }
                if (!this.formData.license_num_of_bl_pic.length) {
                    this.$message.error("请上传营业许可证照图片");
                    return false;
                }
                if (!this.formData.liability_insurance_policy_pic.length) {
                    this.$message.error("请上传责任保险单图片");
                    return false;
                }
                if (!this.formData.id_card_pic.length) {
                    this.$message.error("请上传法人或负责人身份证图片");
                    return false;
                }
                if (!class_ids_1.length)
                    return this.$message.warning("请选择合作线路");
                if (
                    !this.formData.cooperation_validity_period_start ||
                    !this.formData.cooperation_validity_period_end
                )
                    return this.$message.warning("请选择合作有效期");
                if (!this.formData.cooperation_agreement.length)
                    return this.$message.warning("请上传合作协议/合同");
            }

            if ( !this.formData.account_bank ||!this.formData.account_bank_account ) {
                return this.$message.warning("结算信息填写不完整");
            }
            if (!textReg.test(this.formData.account_bank)) return this.$message.warning("请填写正确的开户行");
            if (!numberRegSeat.test(this.formData.account_bank_account))  return this.$message.warning("请输入12~22位的开户账号");
            if (this.formData.rebateRate && !integerReg.test(this.formData.rebateRate)) return this.$message.warning("供应商返点请填写0-100之间的整数");

            const billing_info = {
                account_name: this.formData.company,
                account_bank: this.formData.account_bank,
                account_no: this.formData.account_bank_account,
                rebate: this.formData.rebateRate
            };
            const other_pic = [];
            this.formData.other_pic.forEach(item => {
                other_pic.push(item.url);
            });

            let business_license = [];
            let license_num_of_bl = [];
            let id_card = [];
            let liability_insurance_policy = [];
            let cooperation_agreement = [];
           
            this.formData.business_license_pic.length && business_license.push(this.formData.business_license_pic[0].url);
            this.formData.license_num_of_bl_pic.length && license_num_of_bl.push(this.formData.license_num_of_bl_pic[0].url);
            this.formData.liability_insurance_policy_pic.length && liability_insurance_policy.push(
                this.formData.liability_insurance_policy_pic[0].url
            );
            this.formData.id_card_pic.length && id_card.push(this.formData.id_card_pic[0].url);
            this.formData.cooperation_agreement.length && this.formData.cooperation_agreement.forEach(item => {
                cooperation_agreement.push(item.url);
            });
            let params = {
                data: {
                    is_signing: this.formData.is_signing,
                    company: this.formData.company,
                    travel_brand: this.formData.supplier_name,
                    duty_paragraph: this.formData.duty_paragraph,
                    contact_name: this.formData.contact_name,
                    contact_phone: this.formData.contact_phone,
                    province: this.province.area_name
                        ? this.province.area_name
                        : this.province,
                    city: this.city.area_name ? this.city.area_name : this.city,
                    address: this.formData.address,
                    class_ids_1: class_ids_1,
                    class_ids_2: class_ids_2,
                    class_ids_3: class_ids_3,
                    // account: this.account,
                    // linkman: this.linkman,
                    cooperation_validity_period_start: Moment(
                        this.formData.cooperation_validity_period_start
                    ).format("YYYY-MM-DD"),
                    cooperation_validity_period_end: Moment(
                        this.formData.cooperation_validity_period_end
                    ).format("YYYY-MM-DD"),
                    cooperation_agreement, //合作协议
                    billing_info, //结算信息
                    business_license, //商业执照
                    license_num_of_bl, //许可证件照
                    liability_insurance_policy, //责任保险单照
                    id_card, //身份证照
                    other_pic //其他照
                }
            };
            // Object.assign(params.data, this.formData)
            let action = addSupplierPromise;
            if (this.id) {
                params.data.id = this.id;
                action = editSupplierPromise;
            }

            const {data: { code, data, msg }} = await action(params, true);
            if (code !== 0) return this.$message.error(msg);
            this.$message({
                type: "success",
                message: msg
            });
            this.$router.push({
                path: "/basedata/supplier"
            });
        },
        async _getEditSupplierInfo() {
            let params = {
                data: {
                    id: this.id
                }
            };
            const { data: { code, data, msg }} = await getSupplierDetail(params, true);
            if (code !== 0) return this.$message.error(msg);

            this.formData.company = data.company ? data.company : "";
            this.formData.is_signing = data.is_signing;
            this.formData.is_signing == '1' ? this.is_signingDisabled = true : this.is_signingDisabled = false
            this.formData.supplier_name = data.supplier_name;
            this.formData.duty_paragraph = data.duty_paragraph
                ? data.duty_paragraph
                : "";
            this.formData.address = data.address ? data.address : "";
            this.province = data.province;
            this.city = data.city;
            this.formData.address = data.address;

            this.formData.contact_name =
                data.client_list.length && data.client_list[0].name;
            this.formData.contact_phone =
                data.client_list.length && data.client_list[0].phone;
             data.business_license_pic.length && this.formData.business_license_pic.push({
                url: data.business_license_pic[0],
                name: "营业执照"
            });
            data.license_num_of_bl_pic.length && this.formData.license_num_of_bl_pic.push({
                url: data.license_num_of_bl_pic[0],
                name: "营业执照许可证"
            });
            data.liability_insurance_policy_pic.length && this.formData.liability_insurance_policy_pic.push({
                url: data.liability_insurance_policy_pic[0],
                name: "责任保险单"
            });
           data.id_card_pic.length && this.formData.id_card_pic.push({
                url: data.id_card_pic[0],
                name: "法人或负责人身份证"
            });
            data.other_pic.length > 0
                ? data.other_pic.forEach(item => {
                    this.formData.other_pic.push({
                      url: item,
                      name: "其他证件"
                  })
                }) 
                : "";
            // const startDate = data.cooperation_validity_period_start.split('-')
            // const endDate = data.cooperation_validity_period.split('-')
            // this.formData.cooperation_validity_period = [new Date(startDate[0]*1, startDate[1]*1, startDate[2]*1,), new Date(endDate[0]*1, endDate[1]*1, endDate[2]*1)]
            this.formData.cooperation_validity_period_start =
                data.cooperation_validity_period_start;
            this.formData.cooperation_validity_period_end =
                data.cooperation_validity_period;
            data.cooperation_agreement.forEach(item => {
                this.formData.cooperation_agreement.push({
                    url: item,
                    name: item
                });
            });
            let isAccount = data.settlement_config_info || {};
            this.formData.account_bank =
                Object.keys(isAccount).length != 0
                    ? data.settlement_config_info.account_bank
                    : "";
            this.formData.account_bank_account =
                Object.keys(isAccount).length != 0
                    ? data.settlement_config_info.account_number
                    : "";
            this.formData.rebateRate =
                Object.keys(isAccount).length != 0
                    ? data.settlement_config_info.rebate
                    : "";

            this.class_ids_list = [];
            data.line_of_cooperation.forEach((item, index) => {
                if (item.check === 1) {
                    item.check = true;
                } else {
                    item.check = false;
                }
                item.isIndeterminate = false;
                item.index = index;
                item.showchild = false;
                if (item.child.length > 0) {
                    item.child.forEach((item2, index2) => {
                        if (item2.check === 1) {
                            item2.check = true;
                        } else {
                            item2.check = false;
                        }
                        item2.isIndeterminate = false;
                        item2.showchild = false;
                        item2.parindex = [index];
                        item2.index = index2;
                        if (item2.child.length > 0) {
                            item2.child.forEach((item3, index3) => {
                                if (item3.check === 1) {
                                    item3.check = true;
                                } else {
                                    item3.check = false;
                                }
                                item3.isIndeterminate = false;
                                item3.parentid = item2.id;
                                item3.parindex = [index, index2];
                                item3.index = index3;
                            });
                        }
                    });
                }
                this.class_ids_list.push(item);
            });
            this.class_ids_list.forEach((item, index) => {
                if (item.child.length > 0) {
                    item.child.forEach((item2, index2) => {
                        if (item2.child.length > 0) {
                            item2.child.forEach((item3, index3) => {
                                this.handleCheck(3, item3);
                            });
                        } else {
                            this.handleCheck(2, item2);
                        }
                    });
                } else {
                    this.handleCheck(1, item);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.recieve-detail {
    .recieve-tit {
        font-size: 18px;
        color: #b10c79;
        padding: 0 0 0 10px;
        border-left: 5px solid #b10c79;
    }
    .paperwork-text {
        display: inline-block;
        margin-bottom: 20px;
    }
    .mandatory:before {
        content: "*";
        color: #ff4949;
        margin-right: 4px;
    }
    .recieve-content {
        padding: 30px 0;
        .fenge {
            margin: 0 10px;
        }
    }
    .submit-btn {
        width: 170px;
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
    .submit-btn {
        .el-button {
            width: 170px;
        }
    }
}
.tig {
    color: #aaa;
    margin-left: 10px;
}
</style>
v