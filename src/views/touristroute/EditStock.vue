<template>
    <div class="edit-stock">
        <h3 class="title">团期信息</h3>
        <div class="section basic-info">
            <h4 class="product-title">
                <span class="name">{{base.line_title}}</span>
                <span class="line_subtitle">{{base.line_subtitle}}</span>
                <span class="product-no">产品编号：{{base.line_no}}</span>
            </h4>
            <p class="product-info">
                <span>出发地：{{departure}}</span>
                <span>线路分类：{{line_type}}</span>
                <span>行程天数：{{`${base.line_night}晚${base.line_day}日`}}</span>
                <span>目的地：{{destination}}</span>
            </p>
        </div>

        <div class="section stock-info">
            <el-row :gutter="30">
                <el-col :span="10">
                    <stock-calendar v-model="selectedDate" ref="stockCalendar" :calendar-data="calendarData" class="stock-calendar">
                        <template v-slot:cell="{date, meta, disabled}">
                            <div class="cell" :class="{
                'price-date':  Object.keys(meta).length
              }">
                                <p class="date">{{date.split('-')[2]}}</p>
                                <p class="price-detail" v-if="Object.keys(meta).length">
                                    <span class="price">￥{{meta.sales_price}}</span>
                                    <br />
                                    <span class="date">{{meta | mapCountText}}</span>
                                </p>
                            </div>
                        </template>
                    </stock-calendar>
                </el-col>
                <el-col :span="14">
                    <el-form size="small" label-width="130px" :rules="basicFormRules" :model="baseInfo" ref="basicForm">
                        <el-form-item label="复制团期报价：">
                            <el-select v-model="copyDate" clearable class="copy-date-select">
                                <el-option v-for="date in stockDates" :key="date" :label="date" :value="date"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二次确认：" prop="is_confirm">
                            <el-radio-group v-model="baseInfo.is_confirm">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="row">
                            <el-form-item label="收客截止时间：" prop="end_day_time">
                                提前&nbsp;
                                <el-input v-model="baseInfo.end_day_time" class="end-daytiem">
                                    <template slot="suffix">天</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="end_time">
                                并于&nbsp;
                                <!-- <el-select v-model="baseInfo.end_time">
                  <el-option
                    v-for="item in endTimeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>-->
                                <el-time-select v-model="baseInfo.end_time" :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '23:00'
                  }" placeholder="选择时间"></el-time-select>
                                <span class="mid">停止报名</span>
                            </el-form-item>
                        </div>

                        <el-form-item label="预占位有效时间：" prop="seat_end_time" v-if="baseInfo.is_confirm != 1" :rules="[{
                  type:'integer',
                  message:'预占位有效时间必须为正整数',
                  min: 1
                }]">
                            <el-input placeholder="请输入内容" v-model.number="baseInfo.seat_end_time" class="input-with-select">
                                <el-select v-model="baseInfo.seat_end_type" slot="prepend" placeholder="请选择" class="seat_end_type">
                                    <el-option label="分" value="1"></el-option>
                                    <el-option label="时" value="2"></el-option>
                                    <el-option label="天" value="3"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="付款有效时间：" prop="pay_end_time" v-if="baseInfo.is_confirm == 0">
                            <el-input placeholder="请输入内容" v-model="baseInfo.pay_end_time" class="input-with-select">
                                <el-select v-model="baseInfo.pay_end_type" slot="prepend" placeholder="请选择" class="seat_end_type">
                                    <el-option label="分" value="1"></el-option>
                                    <el-option label="时" value="2"></el-option>
                                    <el-option label="天" value="3"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="单房差：" prop="room_diff_price">
                            <el-input v-model.number="baseInfo.room_diff_price">
                                <template slot="suffix">元/间</template>
                            </el-input>
                        </el-form-item>
                        <div class="row">
                            <el-form-item label="预付定金：" prop="deposit">
                                <el-input v-model="baseInfo.deposit">
                                    <template slot="suffix">元/人</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="deposit_desc">
                                <el-input v-model="baseInfo.deposit_desc" placeholder="定金说明"></el-input>
                            </el-form-item>
                        </div>
                        <el-form-item label="库 存 ：" prop="stock" v-if="baseInfo.is_confirm != 1">
                            <el-input v-model="baseInfo.stock"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div class="section block">
            <div class="block-title">
                <span class="name">团队报价</span>
                <el-button class="add-button" size="small" plain type="primary" @click="handleAddPackage">添加出发城市/套餐报价</el-button>
            </div>
            <edit-stock-package v-model="packageList" ref="packageList" :show_front="show_front"></edit-stock-package>
        </div>
        <div class="footer">
            <Affix :offset-bottom="0">
                <div class="button-group">
                    <el-button type="primary" @click="handleSubmitAdd">保存，继续添加团期</el-button>
                    <el-button type="primary" @click="handleSubmitUp">保存，发布上架</el-button>
                </div>
            </Affix>
        </div>

        <on-channel-layer ref="onChannelLayer" @success="handleChannelLayer" />
    </div>
</template>
<script>
import {
    createStock,
    getStockDetail,
    getStockAll,
    lineOrderSaleLineInfo,
    getCalendarList
} from "src/api/touristroute";
import StockCalendar from "src/components/template/common/stock-calendar";
import EditStockPackage from "src/components/template/touristroute/edit-stock-package";
import OnChannelLayer from "src/components/template/touristroute/onChannelLayer";
import Affix from "src/components/template/common/affix";
import Moment from "moment";

// const endTimeOption = [];
// for (let i = 1; i <= 24; i++) endTimeOption.push({ value: i, label: i });

export default {
    name: "addStock",
    props: {
        productId: {
            required: true,
            default: ""
        }
    },
    filters: {
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
    components: {
        StockCalendar,
        EditStockPackage,
        OnChannelLayer,
        Affix
    },
    data() {
        return {
            base: {},
            // endTimeOption: endTimeOption,
            stockDates: [],
            copyDate: "",
            // 日期
            selectedDate: [],
            packageList: [],
            quoteData: null,

            baseInfo: {
                is_confirm: 1,
                end_day_time: 0,
                end_time: "12:00",
                seat_end_time: 24,
                seat_end_type: "2",
                pay_end_time: "30",
                pay_end_type: "1",
                stock: "",
                work_day: "",
                weekend: "",
                deposit: "",
                deposit_desc: "",
                room_diff_price: "",
                pkgs: []
            },
            basicFormRules: {
                is_confirm: [
                    {
                        required: true
                    }
                ],
                end_day_time: [
                    {
                        required: true,
                        message: "收客截止天数不能为空"
                    }
                ],
                end_time: [
                    {
                        required: true,
                        message: "收客截止时间不能为空"
                    }
                ],
                seatTime: [
                    {
                        required: true,
                        message: "请输入占位有效时间"
                    }
                ],
                pay_end_time: [
                    {
                        required: true,
                        message: "请输入预付款时间"
                    }
                ],
                stock: [
                    {
                        required: true,
                        message: "库存不能为空"
                    }
                ],
                room_diff_price: [
                    {
                        required: true,
                        pattern: /^[1-9]\d*$/,
                        message: "请输入大于0的正整数"
                    }
                ]
            }
        };
    },
    computed: {
        calendarData() {
            if (!this.quoteData) {
                return {};
            }
            let data = {};
            this.quoteData.calender.forEach(date => {
                data[date.day] = date;
            });
            return data;
        },
        postData() {
            return {
                ...this.baseInfo,
                line_id: this.productId,
                work_day: this.selectedDate.filter(item => {
                    let keys = [1, 2, 3, 4, 5];
                    let day = Moment(item).days();
                    return keys.includes(day);
                }),
                weekend: this.selectedDate.filter(item => {
                    let keys = [0, 6];
                    let day = Moment(item).days();
                    return keys.includes(day);
                }),
                pkgs: this.packageList.map(item => {
                    return {
                        ...item,
                        city_id: item.city.id,
                        city_name: item.city.whole_name
                    };
                })
            };
        },
        departure() {
            if (Object.keys(this.base).length === 0) {
                return "";
            }
            return this.base.departure
                .map(city => {
                    return city.city_name;
                })
                .join(">");
        },
        destination() {
            if (Object.keys(this.base).length === 0) {
                return "";
            }
            return this.base.destination
                .map(city => {
                    return city.city_name;
                })
                .join(">");
        },
        line_type() {
            if (Object.keys(this.base).length === 0) {
                return "";
            }
            return this.base.trip_type
                .map(trip => {
                    return trip.trip_name;
                })
                .join(">");
        },
        // 是否 有行程信息
        is_full_trip() {
            return this.base.is_full_trip == 1;
        },
        show_front() {
            return this.base.show_front == 1;
        }
    },
    watch: {
        copyDate(newVal) {
            if (!newVal) {
                this.packageList = [this.createPackage()];
                return;
            }
            this._getStockDetail(newVal);
        },
        selectedDate(newValue) {
            let selected = newValue
                .filter(day => {
                    return this.stockDates.includes(day);
                })
                .pop();
            if (selected) {
                this._getStockDetail(selected);
            }else{
                this.packageList=[this.createPackage()];
            }
        }
    },
    created() {
        this.handleAddPackage(); // 创建默认团期
        Promise.all([
            getStockAll({
                line_id: this.productId
            }),
            lineOrderSaleLineInfo({
                id: this.productId
            }),
            getCalendarList({
                line_id: this.productId
            })
        ]).then(([stockData, base, quoteData]) => {
            if (
                stockData.code !== 0 ||
                base.code !== 0 ||
                quoteData.code !== 0
            ) {
                this.$message.error("服务器请求失败");
                return;
            }
            this.base = base.data;

            this.stockDates = stockData.data;
            // this.copyDate = stockData.data[0] || "";
            this.quoteData = quoteData.data;
        });
        // getStockAll({
        //   line_id: this.productId
        // });
    },
    mounted() {
        this.channelLayer = this.$refs.onChannelLayer;
    },
    methods: {
        async getStockAll() {
            let { code, data, msg } = await getStockAll({
                line_id: this.productId
            });
            if (!code === 0) {
                this.$message.error(msg);
                return Promise.reject(msg);
            }

            this.stockDates = data;
            this.copyDate = data[0];
        },
        async _getStockDetail(day) {
            const params = {
                line_id: this.productId,
                day: day
            };
            try {
                const { code, data, msg } = await getStockDetail(params);

                if (code !== 0) {
                    return this.$message.error(msg);
                }

                this.baseInfo = {
                    is_confirm: parseFloat(data.base.is_confirm),
                    end_day_time: data.base.end_day_time,
                    end_time: data.base.end_time,
                    seat_end_time: parseFloat(data.base.seat_end_time) || 0,
                    seat_end_type: data.base.seat_end_type,
                    pay_end_time: data.base.pay_end_time,
                    pay_end_type: data.base.pay_end_type,
                    stock: data.base.stock,
                    work_day: "",
                    weekend: "",
                    deposit: parseFloat(data.base.deposit) || "",
                    deposit_desc: data.base.deposit_desc,
                    room_diff_price: parseFloat(data.base.room_diff_price) || ""
                };
                let pkglist = [];
                data.pkg_list.forEach(item => {
                    item.pkg.forEach(p => {
                        let obj = {};
                        obj.id = p.package_id;
                        obj.city = {
                            id: item.city.city_id,
                            whole_name: item.city.city_name,
                            simple_name: item.city.city_name
                        };
                        obj.package_name = p.package_name;
                        obj.package_desc = p.package_desc;
                        obj.pkg_item = p.item.map(price => {
                            return {
                                ...price,
                                sales_price: parseFloat(price.sales_price),
                                settle_price: parseFloat(price.settle_price),
                                online_price:
                                    parseFloat(price.online_price) || ""
                            };
                        });
                        pkglist.push(obj);
                    });
                });
                console.log(pkglist);
                this.packageList = pkglist;
            } catch (err) {
                console.log(err);
            }
        },
        createPackage() {
            return {
                city: {
                    id: "",
                    whole_name: "",
                    simple_name: ""
                },
                package_name: "",
                package_desc: "",
                pkg_item: [
                    {
                        type: "1",
                        settle_price: "",
                        sales_price: "",
                        price_desc: "",
                        online_price: "",
                        other_name: "成人"
                    },
                    {
                        type: "2",
                        settle_price: "",
                        sales_price: "",
                        price_desc: "",
                        online_price: "",
                        other_name: "儿童"
                    }
                ]
            };
        },
        handleAddPackage() {
            this.packageList.push(this.createPackage());
        },
        handleAddPrice(priceData, priceList) {
            priceList.push(priceData);
        },
        handleDeletePrice(priceData, priceList, index) {
            if (priceList.length === 1) {
                this.$message.error("至少保留一个价格");
                return;
            }
            priceList.splice(index, 1);
        },
        handleChannelLayer(type) {
            if (type === "up") {
                this.$router.push({
                    path: `/touristroute/trip/tripRepertory/${this.productId}`
                });
            }
        },
        validate() {
            let baseForm = this.$refs["basicForm"];
            return new Promise((resolve, reject) => {
                baseForm.validate(valid => {
                    if (!valid) {
                        reject();
                    }
                    this.$refs.packageList
                        .validate()
                        .then(function() {
                            resolve();
                        }, reject)
                        .catch(error => {
                            reject();
                            this.$log.error(error);
                        });
                });
            });
        },
        async createStock() {
            if (
                this.postData.weekend.length + this.postData.work_day.length ===
                0
            ) {
                this.$message.error("出团日期不能为空");
                return Promise.reject();
            }
            let { code, data, msg } = await createStock(this.postData);
            if (code !== 0) {
                this.$message.error(msg);
                return Promise.reject();
            }
            return Promise.resolve();
        },
        handleSubmitAdd() {
            this.validate()
                .then(_ => {
                    return this.createStock();
                })
                .then(_ => {
                    return this.$alert("添加成功", "提示", {
                        confirmButtonText: "确定"
                    });
                })
                .then(_ => {
                    window.location.reload();
                })
                .catch(error => {
                    this.$log.error(error);
                    if (error) {
                        // this.$message.error(error);
                    }
                });
        },
        handleSubmitRelease() {
            // this.validate().then()
        },
        handleFilterFn(date) {
            console.log(date);
        },
        editTripConfirm() {
            return this.$confirm(
                "当前产品为网站发布产品，为保证产品展示效果，请先编辑产品完善产品【完整行程】信息，再进行上架操作！",
                "提示",
                {
                    confirmButtonText: "编辑行程",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                }
            )
                .then(() => {
                    this.$router.push({
                        // path: `/touristroute/trip/editSchedule/${
                        //     this.productId
                        // }`
                        path: '/touristroute/trip/list/self'
                    });
                })
                .catch(this.$log.debug);
        },
        handleSubmitUp() {
            this.validate()
                .then(_ => {
                    return this.createStock(this.postData);
                })
                .then(_ => {
                    if (this.is_full_trip || !this.show_front) {
                        this.channelLayer.show([this.productId]);
                        return;
                    }
                    return this.editTripConfirm();
                })
                .catch(error => {
                    this.$log.error(error);
                    if (error) {
                        this.$message.error(error);
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
.edit-stock {
    .title {
        border-left: 3px solid #b10c79;
        font-weight: bolder;
        font-size: 18px;
        line-height: 28px;
        margin: 10px 0;
        padding: 0 10px;
    }
    .basic-info {
        padding: 10px 20px;
        .product-title {
            margin-bottom: 10px;
            .product-no {
                color: #ccc;
                margin-left: 30px;
                font-weight: 400;
            }
            .line_subtitle {
                margin-left: 10px;
                color: $themeColor;
            }
        }
        .product-info {
            span::after {
                content: "|";
                margin: 0 20px;
                color: $borderColor;
            }
            span:last-child::after {
                display: none;
            }
        }
    }
}
</style>
<style lang="scss">
@import "src/assets/css/variables.scss";
.edit-stock {
    .el-input,
    .el-select {
        max-width: 160px;
        & + & {
            margin-left: 10px;
        }
    }
    .stock-info {
        padding: 15px;

        .mid {
            margin: 0 10px;
        }
        .seat_end_type {
            width: 60px;
        }
    }
    .block {
        padding: 20px 30px;
    }
    .block-title {
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        border-bottom: 1px solid $borderColor;
    }
    .footer {
        padding: 40px 0;
        .button-group {
            padding: 10px;
            text-align: center;
            background: $gray;
        }
    }
    .stock-calendar {
        .cell {
            padding: 5px;
            line-height: 1.2;
            font-size: 12px;
        }
        .price-date {
            background-color: #fffaf3;
            .price-detail {
                color: #f88c31;
                text-align: right;
            }
        }
    }
    .row {
        display: flex;
        .el-form-item {
            margin-right: 10px;
        }
        .el-form-item:not(:first-child) .el-form-item__content {
            margin-left: 0 !important;
        }
        .end-daytiem {
            max-width: 70px;
        }
    }
}
</style>