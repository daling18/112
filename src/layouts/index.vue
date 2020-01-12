<template>
    <div class="app-wraper" :class="classObj">
        <Sidebar class="sidebar-container" :is-collapse="isCollapse"></Sidebar>
        <div class="main-container">
            <navbar @collapse-click="handleHideSidebar" :unapprovalNum="unapprovalNum" :userNo="sysUserName" :org_name="sysUserOrgName" :userName="RealName" />
            <app-main></app-main>
        </div>
        <!-- 本地环境禁用客服 -->
        <NTKF class="service" v-if="isProduction"></NTKF>
    </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AppMain from "./AppMain";
import Cookie from "src/utils/cookie";
import { loginOut, getUserName, wxacode } from "src/api/api";
import { mapActions, Dispatch } from "vuex";
import { USER_INFO } from "src/configuration/mutation-types";
import NTKF from "src/components/ntkf.vue";
export default {
    data() {
        return {
            isCollapse: false,
            systemSwitch: [
                {
                    label: "AM",
                    // value: 'https://pms.yktour.com.cn/am/'
                    value: "https://testam.yktour.com.cn/am/"
                },
                {
                    label: "PMS",
                    // value: 'http://admin.yktour.com.cn/'
                    value: "http://test.admin.yktour.com.cn/"
                }
            ],
            unapprovalNum: "",
            sysUserName: "",
            sysUserOrgName: "",
            RealName: "",
            loginType: "",
            isProduction: process.env.NODE_ENV === "production"
        };
    },
    computed: {
        classObj() {
            return {
                hideSidebar: this.isCollapse
            };
        }
    },
    components: {
        Sidebar,
        Navbar,
        AppMain,
        NTKF
    },
    methods: {
        ...mapActions({
            getUser: USER_INFO
        }),
        ...mapActions("uploadImage", {
            getPhotoAgreementStatus: "getPhotoAgreementStatus"
        }),
        handleHideSidebar() {
            this.isCollapse = !this.isCollapse;
        },
        getUserNameHandler() {
            if (process.env.NODE_ENV === "development") {
                this.systemSwitch[0].value = "https://testam.yktour.com.cn/am/";
            }
            this.getUser()
                .then(data => {
                    this.$set(this, "sysUserName", data.user_name);
                    this.$set(this, "sysUserOrgName", data.org_name);
                    this.$set(this, "RealName", data.real_name);
                    this.$set(this, "loginType", data.login_type);
                    window.$username = data.user_name;
                    localStorage.setItem("username", data.user_name);
                    localStorage.setItem("sysUserName", data.real_name);
                    localStorage.setItem("orgtype", data.org_type);
                    this.orgType = data.org_type;
                    this.unapprovalNum = data.wait_me_approval;
                })
                .catch(href => {
                    console.log(href);
                    return;
                    window.location.href = href;
                });
        },
    },
    mounted() {
        // 获取基本信息
        this.getUserNameHandler();
        // 获取是否签署过上传协议
        this.getPhotoAgreementStatus();
    }
};
</script>

<style lang="scss" scoped>
.service {
    width: 50px;
    height: 130px;
    background-image: url("../assets/侧熊猫2x.png");
    background-repeat: no-repeat;
    background-size: 100%;
    right: -5px;
    bottom: -25px;
    position: fixed;
    cursor: pointer;
    transform: translate(0, -50%);
    z-index: 100;
    &:after {
        content: "";
        width: 90px;
        height: 65px;
        position: absolute;
        right: 45px;
        top: 45px;
        background-image: url("../assets/气泡2x.png");
        background-repeat: no-repeat;
        background-size: 100%;
        display: none;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
}
.service:hover {
    transition: right 0.5s;
    right: 0;
    &:after {
        display: inline;
        animation-name: task;
    }
}
</style>