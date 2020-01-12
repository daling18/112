// src\components\distribution\components\LineTouristForm.vue
<template>
    <el-dialog title="编辑游客信息" :visible.sync="show" :close-on-click-modal="false" class="custom-dialog">
        <div class="tourist-form">
            <el-form ref="form" :model="touristObj" :rules="touristObjRule" label-width="130px">
                <el-form-item label="游客姓名" prop="username">
                    <el-input v-model.trim="touristObj.username"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="identity_type">
                    <el-select placeholder="请选择" v-model.trim="touristObj.identity_type">
                        <el-option v-for="(obj,key) in identityTypeList" :key="key" :label="obj.title" :value="key" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="identity_no">
                    <el-input v-model.trim="touristObj.identity_no" @blur="handleAutoBirth"></el-input>
                </el-form-item>
                <el-form-item label="证件有效期" prop="identity_end_date" v-if="touristObj.identity_type !=='1'">
                    <el-date-picker v-model.trim="touristObj.identity_end_date" type="date" placeholder="选择日期" :editable="false" />
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="touristObj.gender">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否合同签字人">
                    <el-radio-group v-model="touristObj.is_contract_sign">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="国籍">
                    <el-select v-model.trim="touristObj.nationality">
                        <el-option-group v-for="group in worldArray" :key="group.label" :label="group.label">
                            <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                            ></el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model.trim="touristObj.mobile"></el-input>
                </el-form-item>
                <div class="field-item">
                    <div class="field-label">
                        <span :class="{'color-purple options-btn': 1, 'opened':opened}" @click="handleToggleOptions">选填项</span>
                    </div>
                </div>
                <transition name="el-zoom-in-top">
                    <div v-show="opened">
                        <div class="field-item" v-if="!issuePlaceRequired(touristObj.identity_type)">
                            <div class="field-label">签发地</div>
                            <div class="field-content">
                                <el-input v-model.trim="touristObj.issue_place" />
                            </div>
                        </div>
                        <div class="field-item">
                            <div class="field-label">出生日期</div>
                            <div class="field-content">
                                <el-date-picker v-model.trim="touristObj.birthday" :picker-options="dateOptions" type="date" placeholder="选择日期" :editable="false" />
                            </div>
                        </div>
                        <!-- <div class="field-item">
                            <div class="field-label">备注</div>
                            <div class="field-content">
                                <el-input type="textarea" v-model.trim="touristObj.remark" />
                            </div>
                        </div> -->
                    </div>
                </transition>
            </el-form>
            <div slot="footer" style="text-align:center;margin-top:10px">
                <el-button @click="show=false">取 消</el-button>
                <el-button type="primary" @click="save" :loading="tourEditLoading">保 存</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { world_arr } from "src/configuration/world";
import { lineOrderSaleOrderTouristEdit } from "@/api/touristroute";
export default {
    name: "LineTouristForm",
    components: {},
    props: {
        identityTypeList: {
            type: Object
        },
        tourEditLoading: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show: {
            handler(val) {
                this.$emit("update:visible", val);
            }
        },
        visible(n) {
            this.show = n;
        }
    },
    data() {
        return {
            worldArray: world_arr,
            opened: false,
            show: false,
            touristObj: {
                nationality: "中国",
                id: "0", //游客id
                username: "", //游客名字
                gender: "1", //性别 1男2女
                gender_text: "男", //性别 1男2女
                tourist_type: "", //游客类型
                tourist_type_text: "成人", //游客类型
                identity_type: "", //证件类型
                identity_type_text: "身份证", //证件类型
                identity_no: "1", //证件号
                identity_end_date: "", //证件有效期
                mobile: "18031386867", //手机号
                birthday: "", //生日
                remark: "测试", //备注
                visa: "", //签发地
                is_contract_sign: "0" // 判断是否为签字人
            },
            touristObjRule: {
                username: [
                    {
                        required: true,
                        message: "请输入游客姓名",
                        trigger: "blur"
                    }
                ],
                birthday: [
                    {
                        required: true,
                        message: "请选择出生日期",
                        trigger: "blur"
                    }
                ],
                identity_no: [
                    {
                        required: true,
                        // message: "请输入证件号码",
                        validator: (rule, value, callback) => {
                            let ch = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                            if (this.touristObj.identity_type == "1") {
                                let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                                if (!reg.test(value))
                                    return callback(
                                        new Error("请输入正确的身份证号码")
                                    );
                            }
                            if (ch.test(value))
                                return callback(
                                    new Error("证件号码不能包含汉字")
                                );
                            if (value.replace(/ /g) == "")
                                return callback(new Error("请输入证件号码"));
                            callback();
                        },

                        trigger: "blur"
                    }
                ],
                identity_type: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "blur"
                    }
                ],
                identity_end_date: [
                    {
                        required: true,
                        message: "请选择证件有效期",
                        trigger: "blur"
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                        trigger: "blur"
                    }
                ]
            },
            dateOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        };
    },
    mounted() {},
    methods: {
        initData(item) {
            Object.assign(this.touristObj, item);
            this.$nextTick(() => {
                this.$refs.form && this.$refs.form.clearValidate();
            });
        },
        issuePlaceRequired(type) {
            // 证件类型为“护照、港澳通行证、台湾通行证”时，必填
            const REQUIRED_TYPES = ["1", "3", "7"];

            return REQUIRED_TYPES.indexOf(type) != -1;
        },
        save() {
            this.$refs.form.validate(async valid => {
                if (!valid) return;
                this.$emit("saveHandler", this.touristObj);
            });
        },
        // 根据身份证号，自动生成生日
        handleAutoBirth() {
            let { identity_type, identity_no } = this.touristObj;
            let tmpY = null,
                tmpM = null,
                tmpD = null;
            if (identity_type == "1" && identity_no.length == 18) {
                tmpY = identity_no.substring(6, 10);
                tmpM = identity_no.substring(10, 12);
                tmpD = identity_no.substring(12, 14);
                this.touristObj.birthday = tmpY + "-" + tmpM + "-" + tmpD;
                if (parseInt(identity_no.substr(16, 1)) % 2 == 1) {
                    this.touristObj.gender = "1";
                } else {
                    this.touristObj.gender = "2";
                }
            }
        },
        handleToggleOptions() {
            this.opened = !this.opened;
        }
    }
};
</script>
<style >
.custom-dialog .el-dialog {
    max-width: 500px;
}
</style>

<style lang="less" scoped>
.el-input {
    width: calc(100% - 50px);
}
.field-item {
    display: flex;
    padding: 5px;
}
.field-label {
    width: 110px;
    text-align: right;
    color: #999;
    margin-right: 15px;
    line-height: 35px;
}
.field-content {
    flex: 1;
    padding-right: 50px;
    align-self: center;
    line-height: 1.5;
}

.options-btn::before {
    content: "";
    display: inline-block;
    border-left: 7px solid #b10c79;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    margin-right: 10px;
}
.options-btn.opened::before {
    transform: rotate(90deg);
}
</style>
