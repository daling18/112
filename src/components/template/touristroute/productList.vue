<template>
    <div class="operation-panel">
        <el-table :data="data" class="product-list" row-class-name="product-item" ref="productList" @selection-change="handleSelected">
            <el-table-column width="50" type="selection" v-if="isEditing"></el-table-column>
            <el-table-column>
                <template slot="header">
                    <template v-if="!isEditing">
                        <el-button type="primary" size="small" plain @click="goAdd" key="add" v-if="buttons.includes('add-product')">新增线路产品</el-button>
                        <el-button type="primary" size="small" plain @click="handleBatchApproval" v-if="buttons.includes('batch-approval')">批量审批</el-button>
                        <el-button type="primary" size="small" plain @click="handleBulkShelves" key="shelves" v-if="buttons.includes('bulk-shelves')">批量上架</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" size="small" plain @click="handleCancelEdit" key="cancel">取消</el-button>
                    </template>
                    <!-- 审批 -->
                    <template v-if="editType === 1">
                        <el-button type="primary" size="small" plain @click="handleAgree" key="approved">审批通过</el-button>
                        <el-button type="primary" size="small" plain @click="handleRefuse" key="refuse">审批不通过</el-button>
                    </template>
                    <!-- 上架 -->
                    <template v-if="editType === 2">
                        <el-button type="primary" size="small" plain @click="handleShowChannel" key="channel">上架渠道</el-button>
                    </template>
                </template>
                <template slot-scope="scoped">
                    <div class="title">
                        <!-- <h3 class="name"> -->
                        <el-link class="name" @click="$router.push({
              path: '/touristroute/trip/baseInfo',
              query: {
                line_id: scoped.row.id
              }
            })">{{scoped.row.line_title}}</el-link>
                        <!-- </h3> -->
                        <el-tag size="mini" type="success" v-if="scoped.row.audit_status">{{statusMapText[scoped.row.audit_status]}}</el-tag>
                        <div class="principal">负责人：{{scoped.row.operator_name}}.{{scoped.row.operator_phone}}</div>
                    </div>
                    <el-row class="product-info">
                        <el-col :span="8">产品编号：{{scoped.row.line_no}}</el-col>
                        <el-col :span="8">出 发 地：{{scoped.row.city.join('，')}}</el-col>
                        <el-col :span="8">团期个数：{{scoped.row.quote_count}}</el-col>
                        <el-col :span="8">供应商：{{scoped.row.supply_name}}</el-col>
                        <el-col :span="8">线路分类：{{scoped.row.line_type.join('>')}}</el-col>
                        <el-col :span="8">创建时间：{{scoped.row.create_time}}</el-col>
                    </el-row>
                    <ul class="product-tools">
                        <li class="tool" v-if="buttons.includes('detail')">
                            <el-link @click="$router.push({
                path: '/touristroute/trip/baseInfo',
                query: {
                  line_id: scoped.row.id
                }
              })">线路详情</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('approval-detail')">
                            <el-link @click="$router.push({
                path: `/touristroute/trip/approval-detail/${scoped.row.approval_id}`
 
              })">审批单</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('edit-travel')">
                            <el-link @click="$router.push({
                path: `/touristroute/trip/addTripBasic/${scoped.row.id}?type=edit`
              })">编辑行程</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('copy-travel')">
                            <el-link @click="handleShowChooseTripLayer(scoped.row.id)">复制行程</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('stock')">
                            <el-link @click="handleTripRepertory(scoped.row.id)">团期报价</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('poster')" @click="handleUploadPoster(scoped.row)">
                            <el-link>上传宣传海报</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('download-trip')">
                            <el-link @click="handleDownloadTrip(scoped.row)">下载行程单</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('change-status')">
                            <el-link @click="handleChangeStatus(scoped.row.id, scoped.row.disabled)">{{scoped.row.disabled | mapStatusReverse}}</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('delete')">
                            <el-link @click="handleProductDelete(scoped.row.id)">删除</el-link>
                        </li>
                        <li class="tool" v-if="buttons.includes('channel') && scoped.row.show_channel == 1">
                            <el-link @click="handleShowOnChannel(scoped.row)">上架渠道</el-link>
                            <span>
                                （上架：<em class="num green">{{scoped.row.online_num}}</em>/未上架：<em class="num red">{{scoped.row.offline_num}}</em>）
                            </span>
                        </li>
                    </ul>
                </template>
            </el-table-column>
        </el-table>
        <!-- <ul class="product-list">
      <li class="product-item" v-for="item in data" :key="item.id"></li>
    </ul>-->
        <upload-poster-layer ref="uploadPosterLayer" @close="$emit('refresh')"></upload-poster-layer>
        <on-channel-layer ref="onChannelLayer" @success="$emit('refresh')" />
        <download-trip-layer ref="downloadTripLayer" />
        <choose-trip-layer ref="chooseTripLayer" />
    </div>
</template>
<script>
import {
    changeProductStatus,
    deleteProduct,
    downloadTrip,
    dealApproval,
    copyProduct
} from "src/api/touristroute";
import UploadPosterLayer from "src/components/template/touristroute/uploadPosterLayer";
import OnChannelLayer from "src/components/template/touristroute/onChannelLayer";
import DownloadTripLayer from "src/components/template/touristroute/download-trip-layer";
import ChooseTripLayer from "src/components/template/touristroute/chooseTripLayer";

import { Promise } from "q";
export default {
    props: {
        data: Array,
        statusMapText: {
            type: Object,
            default() {
                return {};
            }
        },
        buttons: {
            type: Array,
            default() {
                // "detail", 详情
                // "edit-travel",  编辑行程
                // "copy-travel",  复制团期
                // "stock", 团期报价
                // "channel", 上架渠道
                // "poster", 上传海报
                // "download-trip", 下载行程单
                // "change-status", 启用禁用
                // "delete", 删除产品
                // "add-product", 新增线路
                // "bulk-shelves", 批量上架
                // "batch-approval" 批量审批
                return [];
            }
        }
    },
    components: {
        UploadPosterLayer,
        OnChannelLayer,
        DownloadTripLayer,
        ChooseTripLayer
    },
    filters: {
        mapStatusReverse(status) {
            if (status == 0) {
                return "禁用";
            }
            if (status == 1) {
                return "启用";
            }
            return "";
        }
    },
    data() {
        return {
            selectedItems: [],
            isEditing: false,
            editType: "" // 1 审批 2 上架
        };
    },
    computed: {
        // 暂时不做处理
        selectable() {
            if (this.editType === 2) {
                return this.isPutaway;
            }
            if (this.editType === 1) {
                return this.isApproval;
            }
            return false;
        },
        selectedIds() {
            if (this.editType === 1) {
                return this.selectedItems.map(item => item.approval_id);
            }
            if (this.editType === 2) {
                return this.selectedItems.map(item => item.id);
            }
            return [];
        }
    },
    watch: {
        editType(newVal) {
            if (!newVal) {
                this.selectedItems = [];
            }
        }
    },
    mounted() {
        this.channelLayer = this.$refs.onChannelLayer;
        this.downloadTripLayer = this.$refs.downloadTripLayer;
        this.chooseTripLayer = this.$refs.chooseTripLayer;
    },
    methods: {
        isPutaway(row, index) {
            if (this.editType == 2) {
                let arr = [1, 4, 6];
                if (arr.includes(row.audit_status) && row.is_full_trip != 0) {
                    return true;
                }
            }
            return false;
        },
        isApproval(row, index) {
            if (this.editType === 1) {
                let arr = [1];
                let status = parseInt(row.audit_status);
                console.log(arr, status);
                return arr.includes(status);
            }
            return false;
        },
        goAdd() {
            this.$router.push({
                path: "/touristroute/trip/addTripBasic",
                query: {
                  type: 'add'
                }
            });
        },
        handleSelectionChange(val) {
            // this.multipleSelection = val;
        },
        toggleSelection(checked) {
            this.$refs.productList.clearSelection();

            if (checked) {
                this.data.forEach(row => {
                    this.$refs.productList.setCurrentRow(row);
                });
            } else {
            }
        },
        handleSelected(selection) {
            this.$log.debug(selection);
            // let ids = selection.map(item => item.id);
            this.selectedItems = selection;
        },
        handleSelectAll(checked) {
            if (checked) {
                this.$refs.productList.toggleAllSelection();
            } else {
                this.$refs.productList.clearSelection();
            }
        },
        handleBatchApproval() {
            this.isEditing = true;
            this.editType = 1; // 审批
        },
        handleBulkShelves() {
            // 上架
            this.isEditing = true;
            this.editType = 2;
        },
        // 退出编辑模式
        handleCancelEdit() {
            this.isEditing = false;
            this.editType = "";
            this.$refs.productList.clearSelection();
        },
        // 审批请求
        async dealApproval(status, ids) {
            if (ids.length === 0) {
                this.$message.error("请选择产品");
                return;
            }
            let { code, data, msg } = await dealApproval({
                approval_ids: ids,
                operation: status
            });

            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.$message.success(msg);
        },
        // 审批通过
        async handleAgree() {
            this.dealApproval(1, this.selectedIds);
        },
        // 审批拒绝
        async handleRefuse() {
            this.dealApproval(2, this.selectedIds);
        },
        // 点击上架渠道
        handleShowChannel() {
            if (this.selectedIds.length === 0) {
                this.$message.error("请选择上架产品!");
                return;
            }
            this.channelLayer.show(this.selectedIds);
        },
        // 变更产品状态
        changeProductStatus(id, status) {
            return changeProductStatus({
                id,
                disabled: status
            }).then(res => {
                let { code, data, msg } = res;
                if (code !== 0) {
                    this.$message.error(msg);
                    return Promise.reject(msg);
                }
                return Promise.resolve();
            });
        },
        // 更改产品状态
        handleChangeStatus(id, status) {
            let message = status == 0 ? "是否禁用产品" : "是否启用产品";
            this.$confirm(message, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info"
            })
                .then(() => {
                    return this.changeProductStatus(id, status == 0 ? 1 : 0);
                })
                .then(res => {
                    this.$message.success(
                        status == 0 ? "禁用成功" : "启用成功"
                    );
                    this.$emit("refresh");
                })
                .catch(error => {
                    this.$log.debug(error);
                });
        },
        // 删除产品
        deleteProduct(id) {
            return deleteProduct({ id })
                .then(res => {
                    let { code, data, msg } = res;
                    if (code !== 0) {
                        this.$message.error(msg);
                        return Promise.reject(msg);
                    }
                    this.$message.success(msg);
                    return Promise.resolve();
                })
                .catch(error => {
                    // this.$message.error(error);
                });
        },
        // 删除产品点击
        handleProductDelete(id) {
            this.$confirm("确定删除产品?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warn"
            })
                .then(() => {
                    return this.deleteProduct(id);
                })
                .then(res => {
                    // this.$message.success("删除成功");
                    this.$emit("refresh");
                })
                .catch(error => {
                    this.$log.debug(error);
                });
        },
        // 团期报价
        handleTripRepertory(productId) {
            this.$router.push({
                name: "tripRepertory",
                params: {
                    productId
                }
            });
        },
        // 上架渠道
        handleShowOnChannel(row) {
            if (row.is_full_trip != 1 && row.show_front == 1) {
                this.$confirm(
                    "当前产品为网站发布产品，为保证产品展示效果，请先编辑产品完善产品【完整行程】信息，再进行上架操作！",
                    "上架渠道",
                    {
                        cancelButtonText: "取消",
                        confirmButtonText: "编辑行程",
                        center: true
                    }
                ).then(_ => {
                    this.$router.push({
                        path: `/touristroute/trip/editSchedule/${row.id}`
                    });
                });
            } else {
                this.channelLayer.show([row.id]);
            }
        },
        handleDownloadTrip(data) {
            this.downloadTripLayer.show({
                word: data.download_url.doc,
                pdf: data.download_url.pdf,
                qrCode: data.download_url.preview
            });
        },
        async handleShowChooseTripLayer(id) {
            let { code, data, msg } = await copyProduct({ id });
            this.$log.debug(data);
            if (code !== 0) {
                this.$message.error(msg);
                return;
            }
            this.$router.push({
                path: `/touristroute/trip/addTripBasic/${data.id}`
            });
            // this.$router.push({
            //   path: "/touristroute/trip/addTripBasic/",
            //   query: {
            //     copy_id: id
            //   }
            // });
        },
        handleChooseTripConfirm() {},
        handleUploadPoster(row) {
            this.$refs.uploadPosterLayer.show(row.id, row.poster);
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
em {
    font-style: none;
}
.green {
    color: green;
}
.red {
    color: red;
}

.operation-panel {
    padding-left: 10px;
}
.header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $borderColor;
    background-color: #fff;
}
.product {
    &-list {
        // padding-left: 10px;
        // margin-right: -20px;
        border: none;
        width: 100%;
        color: inherit;
        td .cell {
            max-height: none;
        }
    }
    &-item {
        padding: 20px;
        border-bottom: 1px solid $borderColor;
        .name {
            font-weight: bold;
            margin-right: 5px;
            color: $textColor;
            &:hover {
                color: $themeColor;
            }
        }
        .title {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .principal {
                background: $gray;
                font-size: 12px;
                line-height: 40px;
                padding: 0 20px;
                margin-right: -20px;
                margin-left: auto;
            }
        }
    }
    &-info {
        line-height: 25px;
        margin-bottom: 7px;
    }
    &-tools {
        display: flex;
        .tool {
            padding: 0 10px;
            border-right: 1px solid $borderColor;
            font-size: 12px;
            &:first-child {
                padding-left: 0;
            }
            &:last-child {
                border: none;
            }
        }
    }
}
</style>
<style lang="scss">
.product-list {
    td {
        border-right: none;
        padding: 0;
        padding-bottom: 20px;
    }
    td .cell {
        max-height: none;
        padding: 0 20px;
    }
    .el-table-column--selection .cell {
        padding: 0 10px;
    }
    th,
    .el-table__footer-wrapper thead div,
    .el-table__header-wrapper thead div,
    .el-table__fixed-header-wrapper thead div {
        background: #fff;
    }
    tr:last-child {
        td {
            border: none;
        }
    }
}
</style>