<template>
    <el-dialog title="申请开通权限须知" :visible.sync="img_accord">
        <el-form :inline="true" class="ratifyForm" :model="ratifyForm" :rules="ratify_rules" ref="ratifyForm" v-loading="loading">
            <el-form-item>
                <p style="margin-bottom: 10px;"><b>特别提示：</b>请您仔细阅读本须知，并注意本须知和开通权限页面的其他相关条款。当您开始申请开通权限时，已表明您已仔细阅读并接受须知的所有条款。</p>
                <p>1、开通权限后，您可以使用任意图片作为您上传产品的宣传资料； </p>
                <p>2、开通权限后，您应保证您所上传的宣传资料（包括但不限于图片、文字、视频、音频等）不侵犯任何第三方的知识产权，如因此造成纠纷，您自行解决并承担相应责任。如给我方造成任何损失的（包括但不限于诉讼费、律师费、赔偿金等），您也应承担。</p>
            </el-form-item>
            <el-form-item prop="is_ratify" v-if="!isAgreement">
                <el-checkbox-group v-model="ratifyForm.is_ratify">
                    <el-checkbox label="我已仔细阅读上述须知，并自愿遵守须知中的相关约定。同意平台继续为我开通上述权限。" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="isAgreement">
                <p>签署人：<b>{{ratifyMsg.username}}</b></p>
                <p>签署人帐号：<b>{{ratifyMsg.login_name}}</b></p>
                <p>签署人所属公司：<b>{{ratifyMsg.org_code_name}}</b></p>
                <p>签署时间：<b>{{agreed_time}}</b></p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-if="!isAgreement" @click="img_accord = false">取 消</el-button>
            <el-button v-if="!isAgreement" type="primary" @click="submitForm('ratifyForm')">确 认 签 署</el-button>
            <el-button v-if="isAgreement" @click="img_accord = false">关 闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
/*
 * 上传图片权限签署
 */
// import {
//     setPhotoAgreement,
//     getPhotoAgreementStatus
// } from "src/api/uploadpictures"; // 本地上传图片权限

import { mapGetters, mapActions, mapState } from "vuex";
import { USER_INFO } from "src/configuration/mutation-types";
export default {
    name: "agreement",
    props: {},
    data() {
        var selectedratify = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请勾选同意按钮！"));
            } else {
                callback();
            }
        };
        return {
            img_accord: false,
            ratify: 2,
            ratifyForm: {
                is_ratify: false
            },
            ratify_rules: {
                is_ratify: [{ validator: selectedratify, trigger: "blur" }]
            },
            loading: false
        };
    },
    computed: {
        ...mapState("uploadImage", {
            isAgreement(state) {
                return state.isAgree;
            },
            ratifyMsg(state) {
                return state.user;
            },
            agreed_time(state) {
                return state.agreed_time;
            }
        })

        // isAgreement() {
        //     this.$log.debug(Object.keys(this.ratifyMsg).length);
        //     if (Object.keys(this.ratifyMsg).length === 0) {
        //         return false;
        //     }
        //     return !!this.ratifyMsg.is_agreed;
        // }
    },
    mounted() {
        // this.getPhotoAgreementStatus();
    },
    methods: {
        // ...mapActions({
        //     getUser: USER_INFO
        // }),
        ...mapActions("uploadImage", {
            getPhotoAgreementStatus: "getPhotoAgreementStatus",
            signAgreement: "signAgreement"
        }),
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.signAgreement().then(() => {
                        this.getPhotoAgreementStatus();
                        this.img_accord = false;
                        this.loading = false;
                    });

                    // let { code, data, msg } = setPhotoAgreement({
                    //     is_agreed: 1
                    // });
                    // if (!code === 0) {
                    //     this.$message.error(msg);
                    // }
                    // this.img_accord = false;
                    // this.getUser();
                    // // this.isAgreement = true;
                    // // this.$emit('success', true);
                    // // this.$emit('isAgreement', this.isAgreement);
                    // this.$message({
                    //     message:
                    //         "您已签署本地图片使用权限，请点击本地上传使用吧！",
                    //     type: "success"
                    // });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        show() {
            this.img_accord = true;
        }
    }
};
</script>
<style lang="less" scoped>
.ratifyForm {
    padding: 10px;
}
</style>