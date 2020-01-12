<template>
    <!-- 复制旅游线路 -- 线路订单 -->
    <el-container>
        <el-main>
            <!-- system-search -->
            <el-row class="section">
                <el-form inline class="search-bar">
                    <el-form-item>
                        <el-input v-model="filterData.keyword5" placeholder="产品编号/产品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filterData.keyword1" placeholder="订单编号/团号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filterData.keyword2" placeholder="出游人姓名/电话"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filterData.keyword3" placeholder="订单联系人/电话"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filterData.keyword4" placeholder="下单人姓名/下单账号/代理商"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker :class="'date-picker'" v-model="departureTime" type="daterange" :value-format="'yyyy-MM-dd'" start-placeholder="出团日期" end-placeholder="出团日期" @change="handleChangeDepartureTime" clearable>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker :class="'date-picker'" v-model="scheduledTime" type="daterange" :value-format="'yyyy-MM-dd'" start-placeholder="下单日期" end-placeholder="下单日期" :picker-options="pickerOptions" @change="handleChangeScheduledTime" clearable>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="search-button" type="primary" @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <filter-bar :data="filterParams" v-model="filterBarData" @change="getList" />
            </el-row>
            <!-- /system-search -->
            <el-row>
                <div class="system-content">
                    <div class="content-list">
                        <div class="list">
                            <div class="list-header">
                                <p class="label title">
                                    <span class="circle"></span> 订单列表
                                </p>
                                <el-radio-group v-model="filterData.departure_date_sort" @change="getList">
                                    <el-radio label="1">按下单时间排序</el-radio>
                                    <el-radio label="2">按发团时间排序</el-radio>
                                </el-radio-group>
                            </div>
                            <el-table :data="list" border style="width: 100%" :span-method="arraySpanMethod" :cell-class-name="cellClassName" v-loading="loading">
                                <el-table-column label="产品名称" min-width="180" className="test">
                                    <template slot-scope="scope">
                                        <div class="order-justify" v-if="scope.row.colspan">
                                            <div>
                                                订单号: {{ scope.row.order_no }}
                                                <el-tag size="small" :type="orderText('order_status', scope.row.order_status) | typeColor">{{ orderText('order_status', scope.row.order_status) }}</el-tag>
                                            </div>
                                            <span>{{ scope.row.operator_name }}/{{ scope.row.create_time }}</span>
                                            <span></span>
                                        </div>
                                        <div v-else :title="scope.row.lineOrderProduct?scope.row.lineOrderProduct.line_title:''">
                                            <span style="font-weight:600">{{ scope.row.lineOrderProduct?scope.row.lineOrderProduct.line_title:'' }}</span>
                                            <p style="line-height: 20px;font-size: 12px;">{{ scope.row.lineOrderProduct?scope.row.lineOrderProduct.line_no:'' }}</p>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="出团日期/团号" min-width="120" align="center">
                                    <template slot-scope="scope">
                                        <div class="ellipsis">{{ scope.row.departure_date }}</div>
                                        <div class="ellipsis" :title="scope.row.tuan_no">{{scope.row.tuan_no}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="订单人数" min-width="130" align="center">
                                    <template slot-scope="scope">
                                        <div>
                                            <span>{{scope.row.enrollment}}</span>
                                            <!-- <span v-if="scope.row.child_num>0">&nbsp;{{ scope.row.child_num }}儿童&nbsp;</span>
                      <span v-if="scope.row.other_type_num>0">{{scope.row.other_type_num}}其他</span> -->
                                            <div>
                                                <a href="javascript:void(0)" v-if="scope.row.lineRefund && scope.row.lineRefund.length" @click="goDetail(scope.row, 'refund')">[退]</a>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="订单金额" min-width="110" align="center">
                                    <template slot-scope="scope">
                                        <div class="ellipsis" :title="scope.row.total_amount">￥{{ scope.row.total_amount }}</div>
                                        <div class="ellipsis" :title="scope.row.total_amount">已收款: {{scope.row.total_received_amount || 0}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="应结算金额" min-width="100" align="center">
                                    <template slot-scope="scope">
                                        <div class="ellipsis" :title="scope.row.total_peer_amount">￥{{ scope.row.total_peer_amount }}</div>
                                        <div class="ellipsis" :title="scope.row.total_settled_amount">{{ scope.row | is_balance }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="合同状态" min-width="100" align="center">
                                    <template slot-scope="scope">
                                        <div :title="orderText('contract_status', scope.row.contract_status)">
                                            {{ orderText('contract_status', scope.row.contract_status) || '未生成' }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="代理商" min-width="100" align="center">
                                    <template slot-scope="scope">
                                        <div class="ellipsis" :title="scope.row.agent_org_name">{{ scope.row.agent_org_name }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" min-width="80" fixed="right" align="center">
                                    <template slot-scope="scope">
                                        <div>
                                            <a href="javascript:void(0)" @click="goDetail(scope.row)">查看订单</a>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-row>
        </el-main>
        <el-footer v-show="page.total_count > page.page_size">
            <Affix :offset-bottom="0">
                <el-pagination layout="total, prev, pager, next, jumper, sizes" :total="page.total_count" :current-page="page.page_index" :page-count="page.total_page" :page-sizes="[10, 20, 50, 100]" :page-size="page.page_size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    class="pagination" />
            </Affix>
        </el-footer>
    </el-container>
</template>

<script>
import Affix from "src/components/template/common/affix";
import FilterBar from "src/components/template/touristroute/filterBar.vue";
import Qs from "qs";
let filterStatusMap = {
    contract_status: {
        id: "contract_status",
        label: "合同状态"
    },
    order_source: {
        id: "order_source",
        label: "下单渠道"
    },
    order_status: {
        id: "order_status",
        label: "订单状态"
    },
    settle_status: {
        id: "is_balance",
        label: "结算状态"
    },
    trip_type: {
        id: "line_type",
        label: "产品类型"
    }
};
import {
    lineQuoteOrderCondition
    // lineQuoteOrdeList
} from "src/api/touristroute";
import { getLineOrderList as lineQuoteOrdeList } from "src/api/order";
import * as format from "src/utils/format";
export default {
    name: "PlanOrderList",
    components: {
        FilterBar,
        Affix
    },
    filters: {
        formatPrice: format.formatPrice,
        typeColor: function(val) {
            switch (val) {
                case "待付款":
                    return "danger";
                case "待确认":
                    return "warning";
                case "占位中":
                    return "success";
                case "部分付款":
                    return "";
                case "已付款":
                    return "success";
                default:
                    return "info";
            }
        },
        is_balance(obj) {
            let val = String(obj.is_balance);
            switch (val) {
                case "0":
                    return "未结算";
                case "1":
                    return `部分结算${
                        obj.total_settled_amount
                            ? ":" + obj.total_settled_amount
                            : ""
                    }`;
                case "2":
                    return `已结算:${obj.total_settled_amount || 0}`;
                case "3":
                    return "结算失败";
                default:
                    return "未知状态";
            }
        }
    },
    data() {
        const { query } = this.$route;
        return {
            pickerOptions: {
                disabledDate(time) {
                    return Date.now() < time;
                }
            },
            scheduledTime: [
                query.scheduled_time_start || "",
                query.scheduled_time_end || ""
            ],
            departureTime: [
                query.departure_date_start || "",
                query.departure_date_end || ""
            ],
            tableData: [],
            filterData: {
                keyword1: query.keyword1 || "",
                keyword2: query.keyword2 || "",
                keyword3: query.keyword3 || "",
                keyword4: query.keyword4 || "",
                keyword5: query.keyword5 || "",
                scheduled_time_start: query.scheduled_time_start || "",
                scheduled_time_end: query.scheduled_time_end || "",
                departure_date_start: query.departure_date_start || "",
                departure_date_end: query.scheduled_time_end || "",
                departure_date_sort: query.sortType || "1"
            },
            filterBarData: {},
            filterParams: [],
            list: [],
            page: {
                page_index: query.page || 1,
                page_size: query.page_size || 10,
                total_count: 0,
                total_page: 0
            },
            loading: false
        };
    },
    mounted() {
        this.getParams();
        this.getList();
    },
    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (row.colspan) {
                if (columnIndex == 0) return [1, 8];
                return [0, 0];
            }
        },
        cellClassName({ row }) {
            if (row.colspan) {
                return "customCell";
            }
        },
        search() {
            this.page.page_index = 1;
            this.getList();
        },
        getParams() {
            lineQuoteOrderCondition().then(res => {
                const { data, code, msg } = res;
                if (code == "0") {
                    this.filterParams = Object.entries(data).map(
                        ([id, ele]) => {
                            return {
                                id: filterStatusMap[id].id,
                                label: filterStatusMap[id].label,
                                data: ele.map(item => ({
                                    id: item.id,
                                    label: item.name
                                }))
                            };
                        }
                    );
                    Object.keys(data).forEach(key => {
                        this.$set(
                            this.filterBarData,
                            filterStatusMap[key].id,
                            []
                        );
                    });
                } else {
                    this.$message.error(msg);
                }
            });
        },
        orderText(key, id) {
            let label = "";
            this.filterParams.find(item => {
                if (item.id == key) {
                    let data = item.data.find(data => data.id == id);
                    if (data) {
                        label = data.label;
                        return;
                    }
                }
            });
            return label;
        },
        getList() {
            let params = {
                page_index: this.page.page_index,
                page_size: this.page.page_size,
                ...this.filterData
            };
            Object.keys(this.filterBarData).forEach(key => {
                params[key] = this.filterBarData[key].filter(v => String(v));
            });
            this.loading = true;
            lineQuoteOrdeList(params).then(res => {
                this.loading = false;
                const { code, data, msg } = res;
                if (code == 0) {
                    let newList = [];
                    data.list.forEach(item => {
                        newList.push({ colspan: true, ...item });
                        newList.push(item);
                    });
                    this.list = newList;
                    this.page.total_page = data.total_page;
                    this.page.total_count = parseInt(data.total_count);
                } else {
                    this.$message.error(msg);
                }
            });
        },
        handleChangeScheduledTime(date) {
            this.filterData.scheduled_time_start = (date && date[0]) || "";
            this.filterData.scheduled_time_end = (date && date[1]) || "";
        },
        handleChangeDepartureTime(date) {
            this.filterData.departure_date_start = (date && date[0]) || "";
            this.filterData.departure_date_end = (date && date[1]) || "";
        },
        handleCurrentChange(val) {
            this.page.page_index = val;
            this.getList();
        },
        goDetail(row, type) {
            if (type == "refund") {
                this.$router.push({
                    path: "/kfservice/v2/detail/refund",
                    query: row.lineRefund[0]
                });
            } else {
                this.$router.push({
                    path: "/kfservice/v2/detail/order",
                    query: {
                        order_id: row.id,
                        order_no: row.order_no
                    }
                });
            }
        },
        handleSizeChange(val) {
            this.page.page_size = val;
            this.getList();
        }
    }
};
</script>

<style scoped>
>>> .customCell {
    height: 40px !important;
    padding: 0px !important;
    margin: 0px !important;
}
>>> .customCell .cell {
    padding: 5px 10px;
    height: 30px;
}
>>> .customCelltds {
    padding: 0px !important;
}
>>> .customCelltds .ellipsis {
    text-align: center;
}
>>> .el-form-item__content {
    line-height: 35px;
}
>>> .el-pager li {
    margin: 0px 5px;
}
>>> .el-pagination .btn-prev,
.el-pagination .btn-next {
    margin: 0px 5px;
}
</style>
<style scoped lang="scss">
@import "src/assets/css/variables.scss";
// .search_bar {
//   .el-input__inner {
//     height: 40px;
//   }

// }
.search-button {
    width: 110px;
    height: 35px;
    line-height: 0;
}
.label-title {
    font-size: 20px;
    border-left: 2px solid #b3238b;
    padding-left: 10px;
    font-weight: 600;
}
.list-header {
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 10px;
    .title {
        .circle {
            margin-bottom: 4px;
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: purple;
        }
        font-weight: 600px;
        font-size: 20px;
    }
}
.section {
    padding-top: 10px;
    .search-bar {
        padding: 0 20px;
        margin-bottom: 10px;
    }
}
.order-justify {
    overflow: hidden;
    & > div {
        float: left;
    }
    > span {
        float: right;
        padding-right: 10px;
        position: relative;
        z-index: 10;
    }
}
.el-container,
.el-main,
.el-footer {
    padding: 0;
}
.el-footer {
    height: 52px;
}
.pagination {
    // height: 52px !important;
    padding: 13px;
    background: $gray;
    text-align: right;
}
</style>
