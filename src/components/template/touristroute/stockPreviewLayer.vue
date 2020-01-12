<template>
    <el-dialog :visible.sync="visible" custom-class="stock-preview-layer" center title="团期查看" @close="handleLayerClose">
        <div v-loading="loading">
            <template v-if="stockData">
                <div class="block">
                    <h4 class="block-title">
                        <span class="stock-number">团号:{{stockData.base.quote_no}}</span>
                        <el-tag size="mini" type="success">{{stockData.base.quote_status | mapProductStatus}}</el-tag>
                    </h4>
                    <h4 class="product-name">{{stockData.base.line_title}}</h4>
                    <!-- <p class="product-desc">{{stockData.base.line_title}}</p> -->
                    <p class="product-info">产品编号: {{stockData.base.line_no}} | 线路类型: {{stockData.base.line_type.join(' > ')}} | 出发地: {{stockData.base.departure.join(',')}} | 目的地: {{stockData.base.destination.join(',')}} | 行程天数: {{stockData.base.trip_days}}</p>
                    <div class="stock-from">
                        <p>供 应 商: {{stockData.base.supply_name}}</p>
                        <p>负 责 人: {{stockData.base.operator_name}} / {{stockData.base.operator_phone}}</p>
                    </div>
                    <el-row class="stock-detail">
                        <el-col :span="8">出团日期: {{stockData.base.day}}</el-col>
                        <el-col :span="8">最低成团人数: {{stockData.base.minimum_team_num}}人</el-col>
                        <el-col :span="8">单房差: {{stockData.base.room_diff_price || '无'}}</el-col>
                        <el-col :span="8">回团日期: {{stockData.base.back_date}}</el-col>
                        <el-col :span="8">截止报名时间: {{stockData.base.end_date_time}}</el-col>
                        <el-col :span="8">定 金: {{stockData.base.deposit}}</el-col>
                        <el-col :span="8">占位人数: {{stockData.base.seated_num}}</el-col>
                        <el-col :span="8">待付款订单: {{stockData.base.pay_wait}}</el-col>
                        <el-col :span="8" v-if="!is_confirm">库 存：{{stockData.base.stock}}</el-col>
                        <el-col :span="8">已售人数: {{stockData.base.confirm_num}}</el-col>
                        <el-col :span="8">待确认订单: {{stockData.base.order_wait_confirm}}</el-col>
                        <el-col :span="7" v-if="!is_confirm">余位：{{stockData.base.balance}}</el-col>
                    </el-row>
                    <div class="booking-info">
                        <el-row>
                            <el-col :span="16">团期新增人: {{stockData.base.creator_name}} / {{stockData.base.phone}}</el-col>
                            <el-col :span="7" v-if="!is_confirm">付款时间：{{stockData.base.pay_end_time}}{{stockData.base.pay_end_type | mapTimeText}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">团期创建时间:{{stockData.base.create_time}}</el-col>
                            <el-col :span="8" v-if="!is_confirm">预占位有效时间：{{stockData.base.seat_end_time}}{{stockData.base.seat_end_type | mapTimeText}}</el-col>
                        </el-row>
                    </div>
                </div>
                <div class="block">
                    <h4 class="block-title">团期报价</h4>
                    <div v-for="packages in stockData.pkg_list" :key="packages.city.city_name">
                        <div v-for="item in packages.pkg" :key="item.package_id" class="package">
                            <p class="price">
                                <span class="name">套餐名称: {{item.package_name}}</span>
                                <!-- ( 套餐简介信息 ) -->
                                <!-- <span class="stock-count">[共享库存]</span> -->
                            </p>
                            <el-table class="price-table" :data="item.item" border>
                                <el-table-column label="价格类型">
                                    <template slot-scope="scoped">{{ scoped.row.other_name }}</template>
                                </el-table-column>
                                <el-table-column label="结算价" prop="settle_price"></el-table-column>
                                <el-table-column label="销售价" prop="sales_price"></el-table-column>
                                <el-table-column label="网上预订价" prop="online_price"></el-table-column>
                                <el-table-column label="价格类型说明" prop="price_desc"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <!-- <p class="price">
            <span class="name">套餐名称: 标准套餐 ( 套餐简介信息 )</span>
            <span class="stock-count">[独立库存 : 20]</span>
          </p>
          <el-table class="price-table">
            <el-table-column label="价格类型"></el-table-column>
            <el-table-column label="结算价"></el-table-column>
            <el-table-column label="销售价"></el-table-column>
            <el-table-column label="网上预订价"></el-table-column>
            <el-table-column label="价格类型说明"></el-table-column>
          </el-table>-->
                </div>
            </template>
        </div>
        <div slot="footer">
            <el-button type="primary" @click="visible = false">关闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { getStockDetail } from "src/api/touristroute";
export default {
    props: {
        productId: {
            required: true,
            default: ""
        }
    },
    filters: {
        mapPackageName(type) {
            switch (type) {
                case "1":
                    return "成人";
                case "2":
                    return "儿童";
                default:
                    return "其他";
            }
        },
        mapTimeText(type) {
            switch (type) {
                case "1":
                    return "分钟";
                case "2":
                    return "小时";
                case "3":
                    return "天";
                default:
                    return "";
            }
        },
        mapProductStatus(status) {
            switch (status) {
                case 1:
                    return "销售中";
                case 2:
                    return "已截止";
                case 3:
                    return "已出团";
                case 4:
                    return "已停团";
                default:
                    return "";
            }
        }
    },
    data() {
        return {
            loading: false,
            visible: false,
            day: "2019-09-10",
            stockData: null
        };
    },
    computed: {
        is_confirm() {
            if (!this.stockData) {
                return false;
            }
            return this.stockData.base.is_confirm == 1;
        }
    },
    created() {
        // this.getStockDetail(this.day);
    },
    methods: {
        getStockDetail(day) {
            this.loading = true;
            getStockDetail({
                line_id: this.productId,
                day
            })
                .then(res => {
                    this.loading = false;
                    this.$log.debug(res);
                    let { code, data, msg } = res;
                    if (code !== 0) {
                        // this.$message.error(msg);
                        return Promise.reject(msg);
                    }
                    this.stockData = data;
                })
                .catch(error => {
                    this.loading = false;
                    this.visible = false;
                });
        },
        handleLayerClose() {
            this.stockData = null;
        },
        show(day) {
            this.$log.debug(day);
            if (!day) {
                this.$message.error("请传入制定日期");
                return;
            }
            this.visible = true;
            this.getStockDetail(day);
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
@import "src/assets/css/variables.scss";
.stock-preview-layer {
    width: 940px;
    min-height: 400px;
    color: #333;
    .el-dialog__body {
        padding: 0 30px;
    }
    .el-dialog__footer {
        padding-top: 10px;
    }
    .block {
        border: 1px solid $borderColor;
        padding: 0 20px;
        margin-bottom: 20px;
        .block-title {
            color: $themeColor;
            font-size: 16px;
            font-weight: bold;
            padding: 20px 0;
            border-bottom: 1px solid $borderColor;
            margin-bottom: 10px;
        }
    }
    .product-name {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 10px;
    }
    .product-info {
        margin-bottom: 15px;
    }
    .stock-from,
    .stock-detail,
    .booking-info {
        line-height: 24px;
        margin-bottom: 10px;
    }

    .package {
        margin-bottom: 20px;
        .price {
            margin-bottom: 10px;
        }
    }
    .title {
        font-size: 18px;
        font-weight: bolder;
        line-height: 20px;
        padding: 20px 30px;
    }
    .stock-info {
        border: 1px solid $borderColor;
    }

    .el-table.el-table--border th {
        line-height: 20px;
        padding: 10px;

        .cell {
            padding: 0;
            color: #000;
        }
    }
}
</style>