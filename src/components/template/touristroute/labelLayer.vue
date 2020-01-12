<template>
    <div>
        <el-dialog custom-class="channel-layer" width="490px" @open="handleLayerOpen" center @close="handleLayerClose" :visible.sync="visible">
            <h3 slot="title" class="channel-title">标签选择</h3>
            <div class="channel-body">
                <div class="channel-search">
                    <el-input class="channel-search-name" v-model.trim="keywords" size="small"></el-input>
                    <el-button class="channel-search-button" type="primary" size="small" @click="getLabelData">
                        <i class="el-icon-circle-plus-outline"></i>&nbsp;搜索
                    </el-button>
                    <el-button class="channel-search-button" type="primary" size="small" @click="handleCreateLabel">
                        <i class="el-icon-circle-plus-outline"></i>&nbsp;新增标签
                    </el-button>
                </div>
                <el-alert :title="`最多选择${max}个标签`" type="warning" show-icon class="channel-tip"></el-alert>
                <el-checkbox-group class="channel-checkbox-group" v-model="checked" v-loading="loading" :max="max">
                    <el-scrollbar>
                        <el-row :gutter="20" class="channel-list">
                            <el-col :span="6" v-for="channel in labelData" :key="channel.id">
                                <el-checkbox :label="channel.id" @change="(checked) => {
                                    handleSingleChange(checked, channel)
                                  }">{{channel.theme_name}}</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-scrollbar>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="channel-footer">
                <el-button size="small" @click="handleCancel">取消</el-button>
                <el-button type="primary" size="small" @click="handleConfirm">确认</el-button>
                <div class="error" v-if="checked.length >= max">最多可添加5个标签，请先取消其他选定的标</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getLabel as getLabelData, createLabel } from "src/api/touristroute";

export default {
    name: "channel-layer",
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            visible: false,
            //   checked: [],
            labelData: [],
            loading: false,
            max: 5,
            name: "",
            keywords: "",
            checked: [],
            checkedData: []
        };
    },
    computed: {
        // checked: {
        //   get() {
        //     return this.value.map(item => item.id);
        //   },
        //   set(value) {
        //     let result = this.labelData.filter(item => {
        //       return value.find(id => item.id === id);
        //     });
        //     this.$emit("input", result);
        //   }
        // }
    },
    created() {},
    methods: {
        async getLabelData() {
            this.loading = true;
            let { code, data, msg } = await getLabelData({
                name: this.keywords,
                page_index: 1,
                page_size: 100
            });

            this.loading = false;
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.labelData = data.list;
        },
        async createLabel(name) {
            this.loading = true;
            let { code, data, msg } = await createLabel({ name });
            this.$log.debug(data);
            this.loading = false;
            if (code !== 0) {
                this.$message.error(msg);
                return Promise.reject(msg);
            }
            this.$message.success(msg);
            this.getLabelData();
        },
        handleLayerOpen() {
            this.getLabelData();
        },
        handleLayerClose() {
            this.labelData = [];
        },
        handleCancel() {
            this.visible = false;
        },
        handleConfirm() {
            this.visible = false;
            this.$emit("confirm", this.checkedData);
            // let result = this.labelData.filter(item => {
            //     return value.find(id => item.id === id);
            // });
            this.$emit("input", this.checkedData);
        },
        handleCreateLabel() {
            this.$prompt("请输入标签名称", "添加标签", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /.+/,
                inputErrorMessage: "标签名称不能为空"
            }).then(({ value }) => {
                this.createLabel(value);
            });
            // this.createLabel();
        },
        handleSingleChange(checked, value) {
            if (checked) {
                this.checkedData.push(value);
            } else {
                this.checkedData = this.checkedData.filter(item => {
                    return item.id !== value.id;
                });
            }
        },
        show() {
            this.$log.info("show");
            this.visible = true;
            this.checked = this.value.map(item => item.id);
            this.checkedData = [...this.value];
        }
    }
};
</script>
<style lang="scss">
@import "src/assets/css/variables.scss";
.channel {
    &-layer {
        height: 385px;
        display: flex;
        flex-direction: column;
        .el-dialog__header {
            border-bottom: 1px solid $borderColor;
            padding: 0;
            line-height: 40px;
        }
        .el-dialog__body {
            flex: 1;
            display: flex;
            overflow: hidden;
            padding: 20px;
            padding-bottom: 0;
        }
        .el-dialog__headerbtn {
            top: 10px;
        }
        .el-dialog__footer {
            padding: 0;
        }
    }
    &-title {
        text-align: center;
    }
    &-search {
        display: flex;
        margin-bottom: 10px;
        .channel-search-name {
            margin-right: 20px;
        }
    }
    &-tip {
        margin-bottom: 10px;
        color: $themeColor !important;
        background: #fdf6fb !important;
    }
    &-body {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    &-checkbox-group {
        flex: 1;
        overflow-y: auto;
        .channel-list {
            flex-wrap: wrap;
            max-width: 100%;
            overflow-x: 100%;
        }
        .el-col {
            margin-bottom: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    &-footer {
        .el-button {
            margin-bottom: 20px;
        }
        .error {
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
            background: #ffe7e6;
            color: #ea5449;

            text-align: left;
        }
    }
}
</style>