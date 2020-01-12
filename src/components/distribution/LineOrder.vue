<template>
    <div class="wrapper">
        <component :is="isPurchase ? 'purchase-order-tab' : 'my-order-tab'" name="line" />
        <!-- system-search -->
        <div class="system-search">
            <div class="search-item">
                <div class="label">订单编号</div>
                <el-input v-model="searchInput.order_no" placeholder="订单编号" />
            </div>
            <search-item-date-range :label="'预订日期'" v-model="scheduledTime" @change="handleChangeScheduledTime" />
            <div class="search-item">
                <div class="label">操作人</div>
                <el-input v-model="searchInput.operator_name" placeholder="操作人" />
            </div>
            <div class="search-item">
                <div class="label">团队编号</div>
                <el-input v-model="searchInput.tuan_no" placeholder="团队编号" />
            </div>
            <div class="search-item" v-if="!isPurchase">
                <div class="label">代理商</div>
                <el-input v-model="searchInput.distributor_org_name" placeholder="代理商" />
            </div>
            <div class="search-item">
                <div class="label">订单状态</div>
                <el-select v-model="searchInput.confirm_status" placeholder="请选择">
                    <el-option label="全部" value="" />
                    <el-option v-for="(val, key) in CONFIRM_STATUS_MAP" :key="key" :label="val" :value="key" />
                </el-select>
            </div>
            <div class="search-item">
                <div class="label">定损状态</div>
                <el-select v-model="searchInput.loss_assess" placeholder="请选择">
                    <el-option label="全部" value="" />
                    <el-option v-for="(val, key) in LOSS_ASSESS_MAP" :key="key" :label="val" :value="key" />
                </el-select>
            </div>
            <div class="search-item search-button">
                <el-button type="primary" @click="handleSearch()">立即搜索</el-button>
            </div>
        </div>
        <!-- /system-search -->
        <div class="system-content">
            <div class="content-list">
                <div class="list">
                    <el-table class="el-table--middle" :data="tableData" border style="width: 100%">
                        <el-table-column label="订单编号" header-align="center" min-width="200" :resizable="false">
                            <template slot-scope="scope">
                                <div class="ellipsis color-purple" :title="scope.row.order_no">
                                    [{{ scope.row.order_from_name }}]{{ scope.row.order_no }}
                                </div>
                                <p class="ellipsis" :title="scope.row.distributor_org_name">{{ scope.row.distributor_org_name }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="行程编号/团号/名称" header-align="center" min-width="220" :resizable="false">
                            <template slot-scope="scope">
                                <div :title="scope.row.tuan_name">
                                    <template v-if="scope.row.product_id === 0">
                                        {{ scope.row.tuan_no }}
                                    </template>
                                    <template v-else>
                                        <router-link :to="{path: prefixPath + 'trip-detail', query:{id: scope.row.product_id}}">
                                            <p>{{ scope.row.product_no }}</p>
                                        </router-link>
                                    </template>
                                    <p class="ellipsis color-gray">{{ scope.row.tuan_name }}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单总金额" header-align="center" align="right" width="100" :resizable="false">
                            <template slot-scope="scope"><span class="color-orange">{{ scope.row.rmb_total_amount }}</span></template>
                        </el-table-column>
                        <el-table-column v-if="!isPurchase" label="已收" header-align="center" align="right" width="100" :resizable="false">
                            <template slot-scope="scope"><span class="color-orange">
                                    {{ scope.row.rmb_receipted_amount }}
                                </span></template>
                        </el-table-column>
                        <el-table-column v-if="!isPurchase" label="未收" header-align="center" align="right" width="100" :resizable="false">
                            <template slot-scope="scope"><span class="color-orange">
                                    {{ scope.row.rmb_total_amount - scope.row.rmb_receipted_amount }}
                                </span></template>
                        </el-table-column>
                        <el-table-column label="游客" header-align="center" min-width="100" :resizable="false">
                            <template slot-scope="scope">
                                <!-- <span v-if="scope.row.adult_num" :title="'成人' + scope.row.adult_num">成人{{ scope.row.adult_num }}</span>
                <span v-if="scope.row.child_num" :title="'儿童' + scope.row.child_num">儿童{{ scope.row.child_num }}</span> -->
                                <span class="ellipsis" v-if="scope.row.tourist_info" :title="scope.row.tourist_info">{{ scope.row.tourist_info }}</span>
                                <!-- 是否有退团 0没有 1有 -->
                                <router-link v-if="scope.row.is_tourist_cancel == 1" :to="{ path: prefixPath + 'tuituan-detail', query: {ono: scope.row.order_no, tid: scope.row.tuan_id}}">
                                    [退]
                                    <span v-if="scope.row.cancel_num != 0">
                                        {{ scope.row.cancel_num }}
                                    </span>
                                </router-link>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="isPurchase" label="供应商" align="center" min-width="150" :resizable="false">
                            <template slot-scope="scope">
                                <p class="ellipsis" :title="scope.row.supplier_org_name">
                                    {{ scope.row.supplier_org_name }}
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column v-else label="代理商/直客" align="center" min-width="150" :resizable="false">
                            <template slot-scope="scope">
                                <p class="ellipsis" :title="scope.row.distributor_org_name">
                                    {{ scope.row.distributor_org_name }}
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人" min-width="100" align="center" :resizable="false">
                            <template slot-scope="scope">
                                <p class="ellipsis" :title="scope.row.operator_name">{{ scope.row.operator_name }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单状态" width="100" align="center" :resizable="false">
                            <template slot-scope="scope">
                                <span :class="CONFIRM_STATUS_COLOR_MAP[scope.row.confirm_status]">{{ scope.row.confirm_status_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="预订日期" align="center" width="100" :resizable="false">
                            <template slot-scope="scope">
                                <span class="color-gray">{{ scope.row.scheduled_time }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="70" align="center" fixed="right">
                            <template slot-scope="scope">
                                <router-link v-if="$menuPermission('api/tuan/distr_order_detail')" :to="prefixPath + 'order-detail/' + scope.row.tuan_id + '/' + scope.row.id">
                                    查看
                                </router-link>
                                <span v-else> -- </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <div class="page" v-show="pageShow">
            <el-pagination layout="prev, pager, next" :current-page="searchInput.page" @current-change="handleCurrentChange" :page-count="totalPage" />
        </div>
    </div>
</template>

<script>
import SearchItemDateRange from "src/plugins/SearchItemDateRange";
import MyOrderTab from "./components/MyOrderTab.vue";
import PurchaseOrderTab from "./components/PurchaseOrderTab.vue";
import { saleOrderList, salePurchaseOrderList } from "src/api/order";
import * as format from "src/utils/format";

export default {
    name: "LineOrder",
    components: {
        SearchItemDateRange,
        MyOrderTab,
        PurchaseOrderTab
    },
    data() {
        const { query } = this.$route;

        return {
            CONFIRM_STATUS_MAP: {},
            CONFIRM_STATUS_COLOR_MAP: {
                0: "",
                1: "",
                2: "color-green",
                "-1": "color-gray"
            },
            LOSS_ASSESS_MAP: {},
            CHANNEL_MAP: {},
            ORDER_TYPE_MAP: {},
            searchInput: {
                // scheduled_time_start: '',
                // scheduled_time_end: '',
                // operator_name: '',
                // distributor_org_name: '',
                // confirm_status: '',
                // order_no: '',
                // tuan_no: '',
                // loss_assess: '',
                // page: 1,
                // page_size: 3,
            },
            searchData: {
                scheduled_time_start: query.scheduled_time_start || "",
                scheduled_time_end: query.scheduled_time_end || "",
                operator_name: query.operator_name || "",
                distributor_org_name: query.distributor_org_name || "",
                confirm_status: query.confirm_status || "",
                order_no: query.order_no || "",
                tuan_no: query.tuan_no || "",
                loss_assess: query.loss_assess || "",
                page: parseInt(query.page) || 1
                // page_size: 3,
            },
            scheduledTime: [
                query.scheduled_time_start,
                query.scheduled_time_end
            ],
            totalPage: parseInt(query.page) || 1,
            pageShow: false,
            tableData: []
        };
    },
    computed: {
        isPurchase() {
            return this.$route.meta && this.$route.meta.isPurchase;
        },
        prefixPath() {
            return this.isPurchase ? "line-purchase-order/" : "line-order/";
        },
        getOrderListFunc() {
            return this.isPurchase ? salePurchaseOrderList : saleOrderList;
        }
    },
    // watch: {
    //   '$route.query' (query) {
    //     this.getList({confirm_status: '', loss_assess: '', ... query});
    //   }
    // },
    mounted() {
        this.getList();
    },
    methods: {
        getList(isSearch) {
            if (isSearch) {
                this.searchData = { ...this.searchInput };
                this.searchData.page = 1;
            } else {
                this.searchInput = { ...this.searchData };
            }
            this.searchData.page_size = 10;

            this.getOrderListFunc({
                params: { data: this.searchData },
                success: params => {
                    let data = params.data;
                    if (data.code == "0") {
                        this.tableData = data.data.list;
                        this.CONFIRM_STATUS_MAP = data.data.confirm_status_list;
                        this.LOSS_ASSESS_MAP = data.data.loss_assess_list;
                        this.CHANNEL_MAP = data.data.channel_list;
                        this.ORDER_TYPE_MAP = data.data.order_type_list;
                        this.totalPage = data.data.total_page;
                        this.searchInput.page = data.data.page_index;
                        this.pageShow = this.totalPage > 1;
                    } else {
                        this.$message.error(data.msg);
                    }
                },
                showLoading: true
            });
        },
        handleChangeScheduledTime(date) {
            this.searchInput.scheduled_time_start = date[0];
            this.searchInput.scheduled_time_end = date[1];
        },
        handleSearch() {
            this.getList(true);
            this.$router.replace({ query: this.searchData });
        },
        handleCurrentChange(val) {
            if (val != this.searchData.page) {
                this.searchData.page = val;
                this.scheduledTime = [
                    this.searchData.scheduled_time_start,
                    this.searchData.scheduled_time_end
                ];
                this.getList();
                this.$router.replace({ query: this.searchData });
            }
        }
    }
};
</script>

<style scoped lang="scss">
.system-search .search-item .long-label {
    width: 100px;
    margin-left: -80px;
    margin-right: 5px;
}
.page {
    position: relative;
    background: #fff;
    padding: 20px 0;
    height: 30px;
}
</style>
