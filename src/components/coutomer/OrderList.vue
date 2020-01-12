// src\components\distribution\LineOrder.vue
<template>
    <div class="wrapper">
        <!-- system-search -->
        <div class="system-search">
            <div class="tab-box">
                <div class="tab-item" v-for="(item,key) in ORDER_STATUS" :key="key">
                    <el-button class="order-button" type="primary" v-if="order_status == item.id">{{item.status}}（{{item.number || '0'}}）</el-button>
                    <el-button class="order-button" v-else @click="selectOrderStatus(item.id)">{{item.status}}（{{item.number || '0'}}）</el-button>
                </div>
            </div>
            <div class="search-item">
                <div class="label">订单编号</div>
                <el-input v-model="searchInput.order_no" placeholder="订单编号" />
            </div>
            <search-item-date-range :label="'下单时间'" v-model="createTime" @change="handleChangeCreateTime" />
            <div class="search-item">
                <div class="label">产品名称</div>
                <el-input v-model="searchInput.tuan_name" placeholder="产品名称" />
            </div>
            <div class="search-item">
                <div class="label">下单来源</div>
                <el-select v-model="searchInput.order_source" clearable placeholder="请选择来源">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="云平台" value="1"></el-option>
                    <el-option label="app" value="2"></el-option>
                    <el-option label="官网" value="3"></el-option>
                    <el-option label="h5" value="4"></el-option>
                    <el-option label="小程序" value="5"></el-option>
                    <el-option label="收客小程序" value="6"></el-option>
                </el-select>
            </div>
            <div class="search-item">
                <div class="label">下单人</div>
                <el-input v-model="searchInput.operator_name" placeholder="请输入下单人姓名" />
            </div>
            <div class="search-item">
                <div class="label">联系人</div>
                <el-input v-model="searchInput.distributor_real_name" placeholder="请输入联系人姓名" />
            </div>
            <div class="search-item">
                <div class="label">游客姓名</div>
                <el-input v-model="searchInput.tourist_username" placeholder="请输入游客姓名" />
            </div>
            <div class="search-item">
                <div class="label">联系电话</div>
                <el-input v-model="searchInput.distributor_mobile" placeholder="请输入联系电话" />
            </div>
            <div class="search-item">
                <div class="label">团号</div>
                <el-input v-model="searchInput.tuan_no" placeholder="团队编号" />
            </div>
            <search-item-date-range :label="'出发日期'" v-model="departureTime" @change="handleChangeDepartureTime" />
            <div class="search-item" v-if="$menuPermission('kfservice/order/all')">
                <div class="label">分销商</div>
                <el-input v-model="searchInput.distributor_org_name" placeholder="分销商" />
            </div>
            <div class="search-item search-button">
                <el-button type="primary" @click="handleSearch()">立即搜索</el-button>
            </div>
        </div>
        <!-- /system-search -->
        <div class="system-content">
            <div class="content-list">
                <div class="list">
                    <el-table class="el-table--middle" :data="tableData" border>
                        <el-table-column label="订单编号" header-align="center" min-width="200" :resizable="false">
                            <template slot-scope="scope">
                                <div class="ellipsis color-purple" :title="scope.row.order_no">[{{ scope.row.order_source_label }}]{{ scope.row.order_no }}</div>
                                <!-- <p class="ellipsis" :title="scope.row.distributor_org_name">{{ scope.row.distributor_org_name }}</p> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="团号/名称" header-align="center" min-width="300" :resizable="false">
                            <template slot-scope="scope">
                                <div class="ellipsis" :title="scope.row.tuan_no">
                                    <p>{{scope.row.tuan_no}}</p>
                                </div>
                                <p style="color: #C0C4CC;">{{scope.row.tuan_name}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单金额" header-align="center" align="center" min-width="100" :resizable="false" prop="total_amount"></el-table-column>
                        <el-table-column label="下单时间" header-align="center" min-width="200" :resizable="false" prop="create_time"></el-table-column>
                        <el-table-column label="游客" header-align="center" align="center" min-width="150" :resizable="false">
                            <template slot-scope="scope">
                                <div :title="scope.row.tourist">
                                    <p v-for="(item,index) in scope.row.tourist" :key="index">
                                        {{item.type}} {{item.num}} <br>
                                        <span v-if="scope.row.is_show_refund" class="tui">
                                            <router-link :to="{ name: 'kfserviceOrderRefund', query: {ono: scope.row.order_no}}">[退]</router-link>
                                        </span>
                                    </p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="联系人" header-align="center" align="center" min-width="100" :resizable="false" prop="distributor_real_name"></el-table-column>
                        <el-table-column label="订单状态" header-align="center" min-width="100" :resizable="false" prop="order_status_label"></el-table-column>
                        <el-table-column v-if="$menuPermission('kfservice/order/all')" label="分销商" header-align="center" align="center" min-width="100" :resizable="false" prop="distributor_org_name"></el-table-column>
                        <el-table-column label="出发城市" header-align="center" min-width="100" :resizable="false" prop="departure_city"></el-table-column>
                        <el-table-column label="出行时间" header-align="center" align="center" min-width="150" :resizable="false" prop="departure_date"></el-table-column>
                        <el-table-column label="操作" header-align="center" align="center" min-width="100" fixed="right" :resizable="false" prop="create_time">
                            <template slot-scope="prop">
                                <router-link :to="'/kfservice/order/detail/'+prop.row.order_no">查看</router-link>
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
import SearchItemDateRange from "../../../src/plugins/SearchItemDateRange";
import { getKfOrderList } from "../../../src/api/order";
import * as format from "../../../src/utils/format";

export default {
    name: "kfOrder",
    components: {
        SearchItemDateRange
        // PurchaseOrderTab
    },
    data() {
        const { query } = this.$route;

        return {
            ORDER_STATUS: [
                {
                    id: 99,
                    number: "",
                    status: "全部订单"
                },
                {
                    id: 0,
                    number: "",
                    status: "待确认"
                },
                {
                    id: 1,
                    number: "",
                    status: "待支付"
                },
                {
                    id: 2,
                    number: "",
                    status: "待出游"
                },
                {
                    id: 3,
                    number: "",
                    status: "已取消"
                },
                {
                    id: 9,
                    number: "",
                    status: "已完成"
                },
                {
                    id: 10,
                    number: "",
                    status: "退款中"
                },
                {
                    id: 11,
                    number: "",
                    status: "退款成功"
                }
            ],
            order_status: query.order_status || 99,
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
                create_time_start: query.create_time_start || "",
                create_time_end: query.create_time_end || "",
                tuan_name: query.tuan_name || "",
                order_source: query.order_source || "0",
                distributor_real_name: query.distributor_real_name || "",
                order_no: query.order_no || "",
                tuan_no: query.tuan_no || "",
                distributor_real_name: query.distributor_real_name || "",
                tourist_username: query.tourist_username || "",
                departure_date_start: query.departure_date_start || "",
                departure_date_end: query.departure_date_end || "",
                distributor_org_name: query.distributor_org_name || "",
                page: parseInt(query.page) || 1,
                order_status: query.order_status || 99,
                operator_name: ""
                // page_size: 3,
            },
            createTime: [query.create_time_start, query.create_time_end],
            departureTime: [
                query.departure_date_start,
                query.departure_date_end
            ],
            totalPage: parseInt(query.page) || 1,
            pageShow: false,
            tableData: []
        };
    },
    computed: {
        prefixPath() {
            return this.isPurchase ? "line/" : "line/";
        },
        getOrderListFunc() {
            return getKfOrderList;
        }
    },
    watch: {
        "$route.path"(path) {
            const query = this.$route.query;

            this.searchData = {
                create_time_start: query.create_time_start || "",
                create_time_end: query.create_time_end || "",
                tuan_name: query.tuan_name || "",
                order_source: query.order_source || "",
                distributor_real_name: query.distributor_real_name || "",
                order_no: query.order_no || "",
                tuan_no: query.tuan_no || "",
                distributor_real_name: query.distributor_real_name || "",
                tourist_username: query.tourist_username || "",
                departure_date_start: query.departure_date_start || "",
                departure_date_end: query.departure_date_end || "",
                distributor_org_name: query.distributor_org_name || "",
                page: parseInt(query.page) || 1,
                order_status: query.order_status || 99,
                operator_name: query.operator_name || ""
                // page_size: 3,
            };
            this.totalPage = parseInt(query.page) || 1;
            this.getList();
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList(isSearch) {
            var that = this;
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
                        var oldArray = that.ORDER_STATUS;
                        Object.keys(data.data.total_num_all).map(
                            (key, item) => {
                                oldArray.forEach(item => {
                                    if (item.id == key) {
                                        item.number =
                                            data.data.total_num_all[key];
                                    }
                                });
                            }
                        );
                        that.ORDER_STATUS = oldArray;
                        // this.ORDER_STATUS[i].number = data.data.total_num_all[i].
                        this.tableData = data.data.list;
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
        selectOrderStatus(status) {
            var that = this;
            that.order_status = status;
            this.searchInput.order_status = status;
            this.searchData = { ...this.searchInput };
            this.$router.replace({ query: this.searchData });
            this.getList(true);
        },
        handleChangeCreateTime(date) {
            this.searchInput.create_time_start = format.date(date[0]);
            this.searchInput.create_time_end = format.date(date[1]);
        },
        handleChangeDepartureTime(date) {
            this.searchInput.departure_date_start = format.date(date[0]);
            this.searchInput.departure_date_end = format.date(date[1]);
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
.system-search .tab-box {
    display: block;
    width: 100%;
    height: 50px;
}
.system-search .tab-box .tab-item {
    height: 50px;
    margin: 0 5px;
    float: left;
}
.system-search .tab-box .tab-item .order-button {
    width: auto;
    // padding: 0 5px;
}
.page {
    position: relative;
    background: #fff;
    padding: 20px 0;
    height: 30px;
}
.tui {
    color: #b10c79;
}
</style>
