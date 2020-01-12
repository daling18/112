<template>
    <div class="trip-repertory">
        <div class="title">团期报价</div>
        <div class="section">
            <el-row class=" collect-bar" :gutter="40">
                <el-col class="repertory-count label" :span="3">
                    <span class="name">团期个数</span>
                    <span class="count">{{summary.total}}</span>
                </el-col>
                <el-col class="label" :span="3" :offset="2">
                    <i class="icon orange"></i>
                    <span class="name">销售中</span>
                    <span class="count">{{summary.sales}}</span>
                </el-col>
                <el-col class="label" :span="3">
                    <i class="icon gray"></i>
                    <span class="name">已截止</span>
                    <span class="count">{{summary.ended}}</span>
                </el-col>
                <el-col class="label" :span="3">
                    <i class="icon green"></i>
                    <span class="name">已出团</span>
                    <span class="count">{{summary.over}}</span>
                </el-col>
                <el-col class="label" :span="3">
                    <i class="icon blue"></i>
                    <span class="name">已停团</span>
                    <span class="count">{{summary.stop}}</span>
                </el-col>
            </el-row>
        </div>

        <div class="section">
            <stock-calendar v-model="seleccted" :calendarData="formatData" :key="$route.path" :calendarDisabled="!isEditing" :selectable="calendarCellDisabled">
                <template v-slot:cell="{date, meta, disabled}">
                    <div class="cell" :class="meta | getClassNames">
                        <p class="date">
                            <span class="day">{{date.split('-')[2]}}</span>
                            <el-link v-if="Object.keys(meta).length !== 0" :underline="false" @click="handleDeleteStock(date)">
                                <i class="el-icon-close"></i>
                            </el-link>
                        </p>
                        <template v-if="Object.keys(meta).length !== 0">
                            <div class="bottom">
                                <div class="date-detial">
                                    <span class="unit">￥</span>
                                    <span class="number">{{meta.sales_price}}</span>
                                    <p class="count-text">{{meta | mapCountText}}</p>
                                </div>
                                <el-link :underline="false" @click="handleStockPreview(date)">详情</el-link>
                            </div>
                        </template>
                    </div>
                </template>
            </stock-calendar>
        </div>
        <div class="footer">
            <Affix :offset-bottom="0">
                <div class="button-group">
                    <template v-if="!isEditing">
                        <el-button type="primary" class="footer-button" size="small" @click="handleEnableStock">启用</el-button>
                        <el-button type="primary" class="footer-button" size="small" @click="handleDisabledStock">停用</el-button>
                        <el-button class="footer-button" size="small" @click="handleAddStock">新增/编辑团期</el-button>
                    </template>
                    <template v-else>
                        <el-button size="small" @click="handleEditCancel">取消</el-button>
                        <el-button size="small" type="primary" @click="handleEditConfirm">确定</el-button>
                    </template>
                </div>
            </Affix>
        </div>
        <stock-preview-layer ref="stockPreviewLayer" :product-id="productId"></stock-preview-layer>
    </div>
</template>
<script>
import { dateFormat } from "src/utils/format";
import {
    getCalendarList,
    deleteQuote,
    changeStockQuote
} from "src/api/touristroute";
import Moment from "moment";
import StockPreviewLayer from "src/components/template/touristroute/stockPreviewLayer";
import StockCalendar from "src/components/template/common/stock-calendar";
import Affix from "src/components/template/common/affix";
export default {
    name: "tripRepertory",
    components: {
        StockPreviewLayer,
        StockCalendar,
        Affix
    },
    props: {
        productId: {
            required: true
        }
    },
    filters: {
        getClassNames(data) {
            // let data = datas[day];
            if (!data) {
                return {};
            }
            let quote_status = data.quote_status;
            return {
                sales: quote_status == 1,
                stop: quote_status == 2,
                end: quote_status == 3,
                over: quote_status == 4
            };
        },
        mapCountText(data) {
            if (data.is_confirm == 1) {
                return "二次确认";
            }
            if (data.stock != 0) {
                return "余 " + data.balance_stock;
            }
            return "";
        }
    },
    data() {
        return {
            pageData: {},
            value: new Date(),
            seleccted: [],
            isEditing: false,
            editStatus: "" // 0 启用  1 停用
        };
    },
    computed: {
        summary() {
            console.log(this.pageData.summary);
            if (Object.keys(this.pageData).length === 0) {
                return {};
            }
            return this.pageData.summary;
        },
        formatData() {
            let data = {};
            this.calendarData.forEach(item => {
                data[item.day] = item;
            });
            return data;
        },
        calendarData() {
            return this.pageData.calender || [];
        }
    },
    mounted() {
        this.stockPreviewLayer = this.$refs.stockPreviewLayer;
        this.getCalendarData();
    },
    methods: {
        refresh() {
            this.getCalendarData();
        },
        getCalendarData() {
            return getCalendarList({
                line_id: this.productId
            })
                .then(res => {
                    let { code, data, msg } = res;
                    if (code !== 0) {
                        return Promise.reject(msg);
                    }
                    this.pageData = data;
                })
                .catch(error => {
                    this.$log.error(error);
                    this.$message.error(error);
                });
        },
        calendarCellDisabled(day) {
            if (!this.isEditing) {
                return true;
            }
            let enableDays = Object.values(this.formatData)
                .filter(data => {
                    // 启用编辑
                    if (this.editStatus === 1) {
                        return data.disabled == 0;
                    }
                    if (this.editStatus === 0) {
                        return data.disabled > 0;
                    }
                    return false;
                })
                .map(item => item.day);
            return !enableDays.includes(day);
        },
        async changeStockQuote(params) {
            let { code, data, msg } = await changeStockQuote(params);

            if (code !== 0) {
                this.$message.error(msg);
                return Promise.reject(msg);
            }
            return Promise.resolve();
        },
        handleStockPreview(day) {
            this.stockPreviewLayer.show(day);
        },
        handleDeleteStock(day) {
            this.$confirm(`是否确认删除${day}日团期?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    return deleteQuote({
                        line_id: this.productId,
                        day
                    })
                        .then(({ code, data, msg }) => {
                            if (code !== 0) {
                                this.$message.error(msg);
                                return Promise.reject(msg);
                            }
                            this.$message.success("删除成功");
                            this.refresh();
                        })
                        .catch(error => {
                            // this.$message.error(error);
                        });
                })
                .catch(this.$log.debug);
        },
        handleDisabledStock() {
            this.isEditing = true;
            this.editStatus = 1;
        },
        handleEnableStock() {
            this.isEditing = true;
            this.editStatus = 0;
        },
        handleAddStock() {
            this.$router.push({
                name: "trip/addStock",
                params: {
                    productId: this.productId
                }
            });
        },
        handleEditStock() {},
        handleEditCancel() {
            this.isEditing = false;
            this.seleccted = [];
        },
        handleEditConfirm() {
            let ids = this.seleccted;
            ids = this.calendarData
                .filter(data => {
                    return this.seleccted.includes(data.day);
                })
                .map(item => item.id);

            if (ids.length === 0) {
                this.$message.error("请选择日期");
                return;
            }
            this.changeStockQuote({
                id: ids,
                disabled: this.editStatus
            }).then(_ => {
                this.$alert(this.editStatus > 0 ? "禁用成功" : "启用成功");
                this.refresh();
                this.seleccted = [];
            });
        }
    }
};
</script>
<style lang="scss">
@import "src/assets/css/variables.scss";
.trip-repertory {
    .title {
        border-left: 3px solid $themeColor;
        font-weight: bolder;
        font-size: 18px;
        line-height: 28px;
        margin: 10px 0;
        padding: 0 10px;
    }
    .collect-bar {
        line-height: 40px;
        margin: 10px 0;
        padding: 0 10px;
        .icon {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            &.orange {
                background-color: #f88c31;
            }
            &.gray {
                background-color: #cccaca;
            }
            &.green {
                background-color: #55c97e;
            }
            &.blue {
                background-color: #75a9fd;
            }
        }

        .name {
            margin-right: 5px;
        }
        .repertory-count {
            .count {
                color: $themeColor;
                font-weight: bolder;
            }
        }
    }
    .calendar {
        td {
            height: 100px;
        }
        .cell {
            position: absolute;
            display: flex;
            flex-direction: column;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            padding: 10px;
            &.sales {
                background-color: rgba(248, 140, 49, 0.2);
            }
            &.stop {
                background-color: rgba(204, 202, 202, 0.2);
            }
            &.end {
                background-color: rgba(85, 201, 126, 0.2);
            }
            &.over {
                background-color: rgba(117, 169, 253, 0.2);
            }
            .bottom,
            .date {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
    .footer {
        height: 132px;
        text-align: center;
        padding: 40px 0;
        .button-group {
            padding: 10px;
            background: $gray;
        }
        .footer-button {
            min-width: 110px;
        }
    }
}
</style>