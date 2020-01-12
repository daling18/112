<template>
    <!-- application\index\view\dev\src\components\plan\CustomizedDemand.vue -->
    <div class="wrapper">
        <!-- system-search -->
        <div class="system-search">
            <div class="search-item">
                <div class="label">关键字</div>
                <el-input style="width: 390px" v-model="searchInput.key_name" placeholder="出发地/目的地/客户姓名/手机号" />
            </div>
            <search-item-date-range :label="'行程日期'" v-model="scheduledTime" @change="handleChangeScheduledTime" />
            <div class="search-item">
                <div class="label">跟踪人</div>
                <el-input v-model="searchInput.sale_user_name" placeholder="跟踪人" />
            </div>
            <div class="search-item">
                <div class="label">行程天数</div>
                <el-input v-model="searchInput.trip_days" placeholder="行程天数" />
            </div>
            <search-item-date-range :label="'创建时间'" v-model="createTime" @change="handleChangeCreateTime" />
            <div class="search-item">
                <div class="label">意向ID</div>
                <el-input v-model="searchInput.id" placeholder="意向ID" />
            </div>
            <div class="search-item search-button">
                <el-button type="primary" @click="handleSearch">立即搜索</el-button>
            </div>
        </div>
        <!-- /system-search -->
        <div class="system-content">
            <div class="content-list">
                <div class="list">
                    <el-table :data="tableData" border tooltip-effect="light">
                        <el-table-column prop="id" label="意向ID" align="center" width="50" />
                        <el-table-column prop="intent_title" label="意向名称" align="left" header-align="center" min-width="180" show-overflow-tooltip />
                        <el-table-column label="状态" width="90" align="center" :resizable="false">
                            <template slot-scope="scope">
                                <span :class="scope.row.is_deal_with == 2 ?'color-green' : ''">{{ scope.row.deal_text }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="客户手机号" align="center" width="110" />
                        <el-table-column prop="departure_city" label="出发地" width="60" align="left" header-align="center" />
                        <el-table-column label="行程日期" width="180" align="left" header-align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{ scope.row | formatTripDate }} <strong>{{ scope.row.trip_days }}天</strong>
                            </template>
                        </el-table-column>
                        <el-table-column label="预算" header-align="center" align="right" width="100">
                            <template slot-scope="scope">{{ scope.row.budget }}</template>
                        </el-table-column>
                        <el-table-column label="游客人数" align="center" width="50" prop="departure_people_num" />
                        <el-table-column prop="sales_user_name" label="跟踪人" width="140" align="left" header-align="center" show-overflow-tooltip />
                        <el-table-column label="创建时间" align="center" width="100" prop="create_time" />
                        <el-table-column label="操作" width="100" align="center" fixed="right">
                            <template slot-scope="scope">
                                <router-link v-if="$menuPermission('salecenter/trace/detail')" :to="'trace/detail?id=' + scope.row.id">
                                    查看
                                </router-link>
                                <a v-if="$menuPermission('salecenter/trace/assign') && scope.row.is_deal_with < 2" href="javascript:;" @click="handleTransfer('show', scope.row)">指派</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <div class="page" v-show="pageShow">
            <el-pagination layout="prev, pager, next" :current-page="searchData.page" @current-change="handleCurrentChange" :page-count="totalPage" />
        </div>
        <el-dialog title="意向指派" :visible.sync="transfer.showDialog" size="tiny">
            <el-form>
                <el-form-item label="指派给" label-width="100px">
                    <el-select clearable v-model="transfer.user" remote filterable :loading="loadUserList" :remote-method="handleSearchUser" class="w180" value-key="user_id" placeholder="">
                        <el-option v-for="(item, index) in userList" :key="index" :label="item.username" :value="item" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="transfer.showDialog=false">取消</el-button>
                <el-button type="primary" @click="handleTransfer('submit')">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import { saleOrderList, contractBindOrderSubmit, contractUnbindOrderSubmit } from 'src/api/api';
import SearchItemDateRange from "src/plugins/SearchItemDateRange";
import { getIntentList, transferIntent } from "src/api/intention";
import { assignOpList } from "src/api/tuan";
import * as format from "src/utils/format";

export default {
    name: "CustomizedDemand",
    components: {
        SearchItemDateRange
    },
    filters: {
        formatTripDate(data) {
            const strArr = [];

            if (data.departure_date) {
                strArr.push(data.departure_date.replace(/-/g, "."));
            }
            if (data.back_date) {
                strArr.push(data.back_date.substr(5).replace(/-/g, "."));
            }
            return strArr.join("-");
        }
    },
    data() {
        const { query } = this.$route;

        return {
            totalPage: parseInt(query.page) || 1,
            ORG_TYPE: localStorage.getItem("orgtype") + "",
            pageShow: false,
            scheduledTime: [query.departure_date, query.back_date],
            createTime: [query.create_time, query.end_time],
            searchInput: {
                // scheduled_time_start: '',
                // scheduled_time_end: '',
                // operator_name: '',
                // distributor_org_name: '',
                // confirm_status: '',
                // order_no: '',
                // tuan_no: '',
                // channel: '',
                // is_tourist_cancel: '',
                // order_type: '',
                // tuan_name: '',
            },
            searchData: {
                page: parseInt(query.page) || 1,
                // page_size: query.page_size || 10,
                intent_from: query.intent_from || 1,
                key_name: query.key_name || "",
                departure_date: query.departure_date || "",
                back_date: query.back_date || "",
                trip_days: query.trip_days || "",
                create_time: query.create_time || "",
                end_time: query.end_time || "",
                sale_user_name: query.sale_user_name || ""
            },
            tableData: [],
            loadUserList: false,
            userList: [],
            transfer: {
                showDialog: false,
                intent: {},
                user: {}
            }
        };
    },
    mounted() {
        this.getList();
        this.handleSearchUser("");
    },
    methods: {
        getList(isSearch) {
            if (isSearch) {
                this.searchData = { ...this.searchInput };
                this.searchData.page = 1;
            } else {
                this.searchInput = { ...this.searchData };
            }
            getIntentList({
                params: { data: this.searchData },
                success: params => {
                    let data = params.data;
                    if (data.code == "0") {
                        this.tableData = data.data.list;
                        this.totalPage = data.data.total_page;
                        this.pageShow = this.totalPage > 0;
                    } else {
                        this.$message.error(data.msg);
                    }
                },
                showLoading: true
            });
        },
        handleChangeScheduledTime(date) {
            this.searchInput.departure_date = format.date(date[0]) || "";
            this.searchInput.back_date = format.date(date[1]) || "";
        },
        handleChangeCreateTime(date) {
            this.searchInput.create_time = format.date(date[0]) || "";
            this.searchInput.end_time = format.date(date[1]) || "";
        },
        handleSearch() {
            this.getList(true);
            this.$router.replace({ query: this.searchData });
        },
        handleCurrentChange(val) {
            if (this.searchData.page != val) {
                this.searchData.page = val;
                this.createTime = [
                    this.searchData.create_time_start,
                    this.searchData.create_time_end
                ];
                this.getList();
                this.$router.replace({ query: this.searchData });
            }
        },
        handleSearchUser(query) {
            const params = {
                data: {
                    username: query ? query : ""
                }
            };

            this.loadUserList = true;
            assignOpList({
                params,
                success: res => {
                    let result = res.data;

                    this.loadUserList = false;
                    if (result.code === 0) {
                        this.userList = result.data || [];
                    } else {
                        this.userList = [];
                    }
                }
            });
        },
        handleTransfer(type, data) {
            if (type == "show") {
                this.transfer.showDialog = true;
                this.transfer.user = {};
                this.transfer.intent = data;
            } else {
                if (!this.transfer.user.user_id) {
                    return this.$message.error("请填写指派用户");
                }
                transferIntent({
                    params: {
                        data: {
                            id: this.transfer.intent.id,
                            user_id: this.transfer.user.user_id
                        }
                    },
                    success: res => {
                        let result = res.data;

                        this.loadUserList = false;
                        if (result.code === 0) {
                            this.getList();
                            this.transfer.showDialog = false;
                        } else {
                            this.$message.error(result.msg);
                        }
                    },
                    showLoading: true
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
.page {
    position: relative;
    background: #fff;
    padding: 20px 0;
    height: 30px;
}
.w180 {
    width: 180px;
}
</style>
