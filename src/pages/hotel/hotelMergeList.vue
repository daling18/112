<template>
    <div id="hotelMergeList">
        <div class="hotelMerge-warpper">
            <div class="hotelMerge-header">
                <el-tabs v-model="searchObj.status">
                    <el-tab-pane :label="`未合库管理 (${not_combine})`" name="0" :disabled='changedis'></el-tab-pane>
                    <el-tab-pane :label="`已合库管理 (${combine})`" name="1" :disabled='changedis'></el-tab-pane>
                </el-tabs>

                <ul class="hotelMerge-searh">
                    <li>
                        <span>供应商酒店ID：</span>
                        <el-input v-model.trim="searchObj.product_id" @keyup.enter.native="page_index=1;getList()" placeholder="请输入酒店ID" clearable :disabled='changedis'></el-input>
                    </li>
                    <li>
                        <span>供应商酒店名称：</span>
                        <el-input v-model.trim="searchObj.product_name" @keyup.enter.native="page_index=1;getList()" placeholder="酒店名称" clearable :disabled='changedis'></el-input>
                    </li>
                    <li>
                        <span>供应商城市：</span>
                        <ZoneAutocomplete v-model="searchObj.city_name" @keyup.enter.native="page_index=1;getList()" placeholder="城市名称" clearable :disabled='changedis'></ZoneAutocomplete>
                    </li>
                    <li>
                        <span>供应商：</span>
                        <el-select v-model="searchObj.channel">
                            <el-option v-for="(item, index) in channelList" :key="index" :label="item.name" :value="item.id" :disabled='changedis'></el-option>
                        </el-select>
                    </li>
                    <li>
                        <el-button class="search-button" type="primary" @click="searchObj.page_index=1;getList()" :disabled='changedis'>搜索</el-button>
                    </li>
                </ul>
            </div>
            <div class="hotelMerge-content" v-loading="listLoading">
                <div>
                    <el-table :data="hotelList" border style="width: 100%" min-height="300px" tooltip-effect="light">
                        <el-table-column align="center" label="供应商酒店ID" width="120" prop="id" key='0'></el-table-column>
                        <el-table-column align="center" label="供应商酒店名称" prop="hotel_name" key='1'></el-table-column>
                        <el-table-column v-if='searchObj.status!=0' align="center" label="盈科酒店名称" key='2'>
                            <template slot-scope='scope'>
                                <div>
                                    {{scope.row.product_name}}
                                    <br>
                                    (ID:{{scope.row.product_id}})
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="供应商城市" prop="address" key='3'></el-table-column>
                        <el-table-column align="center" label="供应商" prop="channel" key='4'></el-table-column>
                        <el-table-column align="center" label="状态" v-if="searchObj.status!=0" key='5'>
                            <template slot-scope="scope">
                                <span :style="{color:statusFilter(scope.row.status).color}"> {{statusFilter(scope.row.status).title}}</span>
                                <el-tooltip v-if='scope.row.status==2' class="item" effect="dark" content="酒店房型更新，建议【查看】房型，进行校验" placement="top-start">
                                    <span class='el-icon-question' style='color:red'></span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="130" key='6'>
                            <template slot-scope="scope">
                                <div class="op" v-if="searchObj.status==0">
                                    <span class="pointer" @click="mergeHotel(scope.row)">合并</span>
                                </div>
                                <div class="op" v-else>
                                    <span class="pointer" v-if="scope.row.is_combine!=0" @click="splitHotel(scope.row)">拆分</span> |
                                    <span class="pointer" @click="catRoomInfo(scope.row)">查看</span> |
                                    <span class="pointer" @click="changeHotelStatus(scope.row)" :style="{color:scope.row.status!=0?'red':'#0188FB'}">{{scope.row.status!=0?'禁用':'启用'}}</span>
                                    <!-- <span class="pointer">禁用</span> -->
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="hotelMerge-footer">
                    <el-pagination align="center" layout="total, prev, pager, next, jumper" :total="total_count" :current-page="searchObj.page_index" @current-change="handleCurrentChange" :page-count="searchObj.page_size" />
                </div>
            </div>
            <div style="height:10px;"></div>
        </div>
        <diffHotel :visible.sync="diffHotelShow" :id="currentId" @close="diffHotelShow = false;" @confirm="diffHotelConfirm"></diffHotel>
        <diffRoom ref="diffRoom" :status="status" :visible.sync="diffRoomShow" @close="diffRoomShow=false;getList()" @reMerge="diffHotelConfirm" :loading="diffRoomLoading" :roomObj="roomObj"></diffRoom>
    </div>
</template>
<script>
import ZoneAutocomplete from "./components/HotelZoneAutocomplete.vue";
import diffHotel from "./components/diffHotel.vue";
import diffRoom from "./components/diffRoom.vue";
import { mergeApi } from "src/api/hotel.js";
export default {
    name: "hotelMergeList",
    components: { ZoneAutocomplete, diffHotel, diffRoom },
    data() {
        return {
            timer: null,
            searchObj: {
                product_id: "", //酒店id
                product_name: "", //酒店名称
                city_name: "", //城市名称
                channel: "0", //	供应商 -1全部 1携程 2捷旅
                status: "0", //合并状态 0未合并 1已合并
                page_size: 10,
                page_index: 1
            },
            total_count: 0,
            //供应商
            channelList: [
                {
                    id: "0",
                    name: "全部"
                }
                // {
                //     id: "1",
                //     name: "酒店事业部"
                // },
                // {
                //     id: "2",
                //     name: "携程旅行"
                // }
            ],
            listLoading: false,
            changedis: false,
            hotelList: [],
            diffHotelShow: false,
            diffRoomShow: false,
            diffRoomLoading: false,
            roomObj: {
                JlHotel: [],
                YKHotel: [],
                conInfo: []
            },
            currentId: 0, //当前选择的酒店id
            status: 0, //当前酒店的状态
            combine: 0, //已合库
            not_combine: 0
        };
    },
    watch: {
        "searchObj.status"() {
            this.searchObj.page_index = 1;
            this.searchObj.product_id=''
            this.searchObj.product_name=''
            this.searchObj.city_name=''
            this.searchObj.channel='0'
            this.searchObj.page_size
            this.getList();
        },
        diffHotelShow(n) {
            if (!n) this.currentId = 0;
        }
    },
    methods: {
        async getList() {
            let params = {
                ...this.searchObj
            };
            this.changedis = true;
            this.listLoading = true;
            let result = await mergeApi.getHotelList(params);
            this.listLoading = false;
            this.changedis = false;
            let { code, msg, data } = result;
            if (code != 0) return this.$message.error(msg);
            this.total_count = data.total_count;
            this.hotelList = data.list;
            this.combine = data.statistics ? data.statistics.combine : 0;
            this.not_combine = data.statistics
                ? data.statistics.not_combine
                : 0;
        },
        async getSupplier() {
            let supplier = await mergeApi.getSupplier();
            let { code, data, msg } = supplier;
            if (code != 0) return this.$message.error(msg);
            data.unshift({
                id: "0",
                name: "全部"
            });
            this.channelList = data;
        },
        handleCurrentChange(index) {
            this.searchObj.page_index = index;
            this.getList();
        },
        //合并酒店
        mergeHotel(item) {
            this.currentId = item.id;
            this.status = item.status;
            this.diffHotelShow = true;
        },
        //合并房型
        async diffHotelConfirm(params, isCat = false) {
            this.diffHotelShow = false;
            if (params) {
                this.diffRoomShow = true;
                this.diffRoomLoading = true;
                let result = await mergeApi.getRoomList(params);
                this.diffRoomLoading = false;
                let { code, msg, data } = result;
                if (code != 0) {
                    this.diffRoomShow = false;
                    this.$message.error(msg);
                    return;
                }
                let filterData = this.filterRoomData(data);
                Object.assign(this.roomObj, filterData);
                this.$nextTick(v => {
                    this.$refs.diffRoom.init(params, isCat);
                });
            } else {
                this.getList();
            }
        },
        //拆分
        async splitHotel(item) {
            this.$confirm(
                `<p> 拆分后酒店将还原至未合库列表中,</p>
                <p>售卖中的酒店价格将不可售卖。如需要继续售,</p>
                <p> 需重新进行合并酒店及合并房型操作.</p>
                <p> 确认是否要拆分酒店？</p>`,
                "酒店拆分",
                {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true,
                    beforeClose: async (action, instance, done) => {
                        if (action === "confirm") {
                            instance.confirmButtonLoading = true;
                            let result = await mergeApi.splitHotelRoom({
                                product_id: item.id
                            });
                            instance.confirmButtonLoading = false;
                            let { code, msg } = result;
                            if (code != 0) {
                                this.$message.error(msg);
                                done();
                                return;
                            } else {
                                this.$message.success(msg);
                                this.getList();
                                done();
                            }
                        } else {
                            instance.confirmButtonLoading = false;
                            done();
                        }
                    }
                }
            ).catch(() => {});
        },
        //查看
        async catRoomInfo(item) {
            let params = {
                hotel_id: item.product_id,
                product_id: item.id,
                is_select: 1
            };
            this.status = item.status;
            this.currentId = item.id;
            this.diffHotelConfirm(params, true);
        },
        //启用禁用
        async changeHotelStatus(item) {
            let { status, id } = item;
            this.$confirm(
                `${status == 0 ? "是否要打开当前酒店" : "是否要禁用当前酒店"}`,
                "酒店操作",
                {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true,
                    beforeClose: async (action, instance, done) => {
                        if (action === "confirm") {
                            instance.confirmButtonLoading = true;
                            let result = await mergeApi.changeHotelStatus({
                                id: id,
                                status: status == 0 ? "1" : "0"
                            });
                            instance.confirmButtonLoading = false;
                            let { code, msg } = result;
                            if (code != 0) {
                                this.$message.error(msg);
                                done();
                                return;
                            } else {
                                this.$message.success(msg);
                                this.getList();
                                done();
                            }
                        } else {
                            instance.confirmButtonLoading = false;
                            done();
                        }
                    }
                }
            ).catch(() => {});
        },
        filterRoomData(data) {
            let JlHotel = Array.isArray(data.JlHotel) ? data.JlHotel : [];
            let YKHotel = Array.isArray(data.YkHotel) ? data.YkHotel : [];
            let conInfo = Array.isArray(data.conInfo) ? data.conInfo : [];
            return {
                JlHotel,
                YKHotel,
                conInfo
            };
        },
        statusFilter(status) {
            if (status == 0) {
                return {
                    title: "禁用",
                    color: "red"
                };
            } else if (status == 1) {
                return {
                    title: "启用",
                    color: "#28a745"
                };
            } else {
                return {
                    title: "异常",
                    color: "red"
                };
            }
        }
    },
    mounted() {
        this.getSupplier();
        this.getList();
    }
};
</script>

<style lang="less" scoped>
.pointer {
    cursor: pointer;
}
.op {
    color: #0188fb;
}
.op > span:hover {
    color: purple;
}

.search-button {
    width: 110px;
    height: 35px;
    // line-height: 35px;
}
#hotelMergeList {
    width: 100%;
    //   height: 100%;
    //   box-sizing: border-box;
    // .hotelMerge-warpper {
    //     height: 100%;
    // }
    .hotelMerge-content,
    .hotelMerge-header {
        background: #fff;
    }
    .hotelMerge-header {
        padding: 20px;
        margin-bottom: 10px;
        .hotelMerge-searh {
            display: flex;
            height: 35px;
            line-height: 35px;
            & > li {
                display: flex;
                & > div {
                    width: calc(100% - 120px);
                }
            }
            & > li:last-child {
                width: 120px;
            }
        }
    }
    .hotelMerge-content {
        padding: 20px 30px 0px 20px;
        // height: calc(100% - 130px);
        // overflow: auto;
        .hotelMerge-footer {
            position: relative;
            background: #fff;
            padding: 20px 0;
            height: 30px;
        }
    }
}
</style>