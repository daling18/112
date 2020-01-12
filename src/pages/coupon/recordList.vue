<template>
    <div class="wrapper">
        <div class="system-search">
            <div class="search-item listitem">
                <div class="label">优惠券流水号：</div>
                <el-input v-model="search.code" placeholder="请输入优惠券流水号" />
            </div>
            <div class="search-item listitem">
                <div class="label">订单号：</div>
                <el-input v-model="search.orderId" placeholder="请输入订单号" />
            </div>
            <div class="search-item listitem">
                <div class="label">优惠券ID：</div>
                <el-input v-model="search.couponId" placeholder="请输入优惠券ID" />
            </div>
            <div class="search-item listitem">
                <div class="label">优惠券名称：</div>
                <el-select v-model="search.title" filterable remote clearable :remote-method="handleSearchName" :loading="loading" placeholder="请输入优惠券名称">
                    <el-option v-for="(item,k) in conponNameList" :key="k" :label="item" :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="search-item listitem">
                <div class="label">手机号：</div>
                <el-input placeholder="请输入手机号" v-model="search.phone" />
            </div>
            <div class="search-item listitem">
                <div class="label">优惠券类型：</div>
                <el-select v-model="search.type" placeholder="请选择优惠券类型">
                    <el-option label="不限" value=""></el-option>
                    <el-option :label="i" :value="k" v-for="(i,k) in params.type" :key="k"></el-option>
                </el-select>
            </div>
            <div class="search-item listitem">
                <div class="label">商品类型：</div>
                <el-select v-model="search.use_range" placeholder="请选择商品类型">
                    <el-option label="不限" value=""></el-option>
                    <el-option :label="i" :value="k" v-for="(i,k) in params.use_range" :key="k"></el-option>
                </el-select>
            </div>
            <div class="search-item listitem">
                <div class="label">用户等级：</div>
                <el-select v-model="search.user_level" placeholder="请选择用户等级">
                    <el-option label="不限" value=""></el-option>
                    <el-option :label="i" :value="k" v-for="(i,k) in params.user_level" :key="k"></el-option>
                </el-select>
            </div>
            <div class="search-item listitem">
                <div class="label">使用状态：</div>
                <el-select v-model="search.status" placeholder="请选择使用状态">
                    <el-option label="不限" value=""></el-option>
                    <el-option :label="i" :value="k" v-for="(i,k) in params.status" :key="k"></el-option>
                </el-select>
            </div>
            <div class="search-item listitem">
                <div class="label">使用平台：</div>
                <el-select v-model="search.platform_source" placeholder="请选择使用平台">
                    <el-option label="不限" value=""></el-option>
                    <el-option :label="i" :value="k" v-for="(i,k) in params.platform_source" :key="k"></el-option>
                </el-select>
            </div>
            <div class="clear">
                <search-item-date-range :label="'使用日期：'" v-model="useDate" @change="dateUse" style="" />
                <search-item-date-range :label="'领取日期：'" v-model="createTime" @change="dateGet" />
                <div class="search-item search-button">
                    <el-button type="primary" @click="handleSearch">立即搜索</el-button>
                </div>
            </div>
        </div>
        <div class="system-content">
            <div class="content-list">
                <div class="list">
                    <el-table :data="list" border tooltip-effect="light">
                        <el-table-column prop="code" :label="title.code" align="center" width="150" :key="title.code" />
                        <el-table-column prop="id" :label="title.id" align="center" width="100" :key="title.id" />
                        <el-table-column prop="title" :label="title.title" align="center" header-align="center" min-width="100" show-overflow-tooltip />
                        <el-table-column prop="type_name" :label="title.type" align="center" width="100" />
                        <el-table-column prop="order_id" :label="title.order_id" width="90" align="center" :resizable="false" />
                        <el-table-column prop="active.title" :label="title.active" width="90" align="center" :resizable="false">
                            <template slot-scope="scope">
                                <span v-for="(item,k) in scope.row.active" :key="k">{{item.active_title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" :label="title.price" align="center" width="80" />
                        <el-table-column prop="login_name" :label="title.login_name" width="100" align="center" header-align="center" />
                        <el-table-column prop="phone" :label="title.phone" min-width="130" align="center" header-align="center" show-overflow-tooltip />
                        <el-table-column prop="use_range" :label="title.use_range" header-align="center" align="center" min-width="180">
                            <template slot-scope="scope">
                                {{scope.row.use_range | filterjoin}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="title.user_level" align="center" width="100">
                            <template slot-scope="scope">
                                {{scope.row.user_level_name | filterjoin}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="platform_source_name" :label="title.platform_source" align="center" width="100" />
                        <el-table-column prop="use_time" :label="title.use_time" align="center" width="100" />
                        <el-table-column prop="get_time" :label="title.get_time" align="center" width="100" />
                        <el-table-column prop="status_name" :label="title.status" align="center" width="100" />
                    </el-table>
                    <div class="page">
                        <el-pagination layout="total, prev, pager, next, jumper" :page-size="10" :total="pages.total" :current-page="pages.index" @current-change="pageChange"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchItemDateRange from "src/plugins/SearchItemDateRange";
import {
    couponrecordList,
    getCouponParams,
    couponSearchTitle
} from "src/api/product";
import * as format from "src/utils/format";
import { Loading } from "element-ui";
export default {
    components: {
        SearchItemDateRange
    },
    filters: {
        filterjoin(obj) {
            var arr = [];
            for (let i in obj) {
                arr.push(obj[i]);
            }
            return arr.length ? arr.join(",") : "";
        }
    },
    data() {
        const { query } = this.$route;
        return {
            Loading: true,
            title: {},
            params: {},
            useDate: [query.departure_date, query.back_date],
            createTime: [query.create_time, query.end_time],
            conponNameList: [],
            loading: false,
            search: {
                code: "",
                orderId: "",
                couponId: "",
                title: "",
                phone: "",
                type: "",
                status: "",
                use_range: "",
                user_level: "",
                platform_source: "",
                coupon_status: ""
            },
            pages: {
                total: 20,
                index: 1
            },
            list: []
        };
    },
    created() {},
    watch: {},
    mounted() {
        this.getCouponParams();
    },
    methods: {
        getlist() {
            let loadingInstance = Loading.service();
            let {
                search: {
                    code,
                    orderId,
                    couponId,
                    title,
                    phone,
                    type,
                    use_range,
                    user_level,
                    status,
                    platform_source
                },
                useDate,
                createTime,
                pages: { index }
            } = this;
            let params = {
                data: {
                    page_size: 10,
                    page: index,
                    code,
                    order_id: orderId,
                    coupon_id: couponId,
                    title,
                    phone,
                    type,
                    use_range,
                    user_level,
                    status,
                    platform_source,
                    use_start_time: useDate[0] || "",
                    use_end_time: useDate[1] || "",
                    get_start_time: createTime[0] || "",
                    get_end_time: createTime[1] || ""
                }
            };
            couponrecordList({
                params,
                success: res => {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.list = data.list;
                    this.pages = {
                        total: data.total_count,
                        index: data.page
                    };
                }
            });
        },
        getCouponParams() {
            getCouponParams({
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.title = data.title;
                    this.params = data.params;
                    this.getlist();
                }
            });
        },
        handleSearchName(title) {
            if (title === "") {
                this.conponNameList = [];
                return;
            }
            let params = {
                data: {
                    title,
                    page: 1,
                    page_size: 30
                }
            };
            couponSearchTitle({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.conponNameList = data;
                }
            });
        },
        pageChange(index) {
            this.pages.index = index;
            this.getlist();
        },
        handleSearch() {
            let regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (this.search.phone && !regMobile.test(this.search.phone)) {
                this.$message.error("手机号不正确");
                return;
            }
            this.pages.index = 1;
            this.getlist();
        },
        dateUse(date) {
            // this.searchInput.departure_date = format.date(date[0]) || "";
            // this.searchInput.back_date = format.date(date[1]) || "";
        },
        dateGet(date) {
            // this.searchInput.create_time = format.date(date[0]) || "";
            // this.searchInput.end_time = format.date(date[1]) || "";
        },
        handlekey(key = 1) {
            return key + Math.random();
        }
    }
};
</script>

<style scoped lang="scss">
.system-search {
    div.clear {
        clear: both;
    }
}
.search-item {
    .label {
        width: 100px;
    }
}
</style>
