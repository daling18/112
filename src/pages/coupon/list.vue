<template>
    <div class="wrapper">
        <div class="title">
            <router-link to="./recordList">查看使用记录</router-link>
        </div>
        <div class="system-content">
            <div class="content-list">
                <div class="list">
                    <el-table :data="list" border tooltip-effect="light">
                        <el-table-column prop="id" label="优惠券ID" align="center" width="100" />
                        <el-table-column prop="title" label="优惠券名称" align="center" header-align="center" min-width="100" show-overflow-tooltip />
                        <el-table-column prop="type_name" label="优惠券类型" width="90" align="center" :resizable="false"></el-table-column>
                        <el-table-column prop="price" label="优惠券金额" align="center" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="limit_price" label="使用门槛" align="center" width="110" />
                        <el-table-column label="已领取/已使用/发放总量" width="100" align="center" header-align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.get_num}}/</span>
                                <span>{{scope.row.use_num}}/</span>
                                <span>{{scope.row.total_num}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="使用日期" min-width="180" align="center" header-align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{scope.row.use_start_time}}至</span>
                                <span>{{scope.row.use_end_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="领取日期" header-align="center" align="center" min-width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.get_start_time}}至</span>
                                <span>{{scope.row.get_end_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="领取平台" align="center" width="100" prop="get_platform_name">
                            <template slot-scope="scope">
                                <span>{{scope.row.get_platform_name | filtercut}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="发放状态" align="center" width="100" prop="coupon_status_name" />
                        <el-table-column label="操作" width="150" align="center" fixed="right">
                            <template slot-scope="scope">
                                <a href="javascript:;" @click="openDetails(scope.row.id)">查看</a>
                                <a href="javascript:;" @click="handleCoupon(scope.row.id,scope.row.coupon_status)" v-text="handleCouponstatus(scope.row.coupon_status)"></a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page">
                        <el-pagination layout="total, prev, pager, next, jumper" :page-size="20" :total="pages.total" :current-page="pages.index" @current-change="pageChange"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="优惠券信息" :visible.sync="detailsswitch" size="small" width="600px" custom-class="customWidth">
            <div class="couponInfo">
                <ul>
                    <li>
                        <span class="name">优惠券名称：</span>
                        <span class="msg">{{detailsInfo.title}}</span>
                    </li>
                    <li>
                        <span class="name">商品类型：</span>
                        <span class="msg">{{detailsInfo.use_range | filtercut}}</span>
                    </li>
                    <li>
                        <span class="name">用户等级：</span>
                        <span class="msg">{{detailsInfo.user_level_name | filtercut}}</span>
                    </li>
                    <li>
                        <span class="name">使用限制：</span>
                        <span class="msg">{{detailsInfo.use_limit_name}}</span>
                    </li>
                    <li>
                        <span class="name">使用有效期：</span>
                        <span class="msg">{{detailsInfo.use_start_time}}至{{detailsInfo.use_end_time}}</span>
                    </li>
                    <li>
                        <span class="name">领取限制：</span>
                        <span class="msg">{{detailsInfo.use_limit_name}}</span>
                    </li>
                    <li>
                        <span class="name">领取时间：</span>
                        <span class="msg">{{detailsInfo.get_start_time}}至{{detailsInfo.get_end_time}}</span>
                    </li>
                    <li>
                        <span class="name">领取平台：</span>
                        <span class="msg">{{detailsInfo.get_platform_name | filtercut}}</span>
                    </li>
                    <li>
                        <span class="name">发放总量：</span>
                        <span class="msg">{{detailsInfo.total_num}}</span>
                    </li>
                    <li>
                        <span class="name">优惠券类型：</span>
                        <span class="msg">{{detailsInfo.type_name}}</span>
                    </li>
                    <li>
                        <span class="name">优惠券金额：</span>
                        <span class="msg">{{detailsInfo.price}}</span>
                    </li>
                    <li>
                        <span class="name">总发放金额：</span>
                        <span class="msg">{{detailsInfo.total_amount}}</span>
                    </li>
                </ul>
                <div class="couponInfo-remark" v-text="detailsInfo.remark">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailsswitch = false">返回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    couponList,
    couponInfo,
    couponGrant,
    couponStop
} from "src/api/product";
import * as format from "src/utils/format";

import { Loading } from "element-ui";
export default {
    filters: {
        filtercut(date) {
            var arr = [];
            for (let i in date) {
                arr.push(date[i]);
            }
            return arr ? arr.join(",") : "";
        }
    },
    data() {
        const { query } = this.$route;
        return {
            Loading: true,
            detailsInfo: {},
            detailsswitch: false,
            pages: {
                total: 10,
                index: 1
            },
            list: []
        };
    },
    created() {},
    watch: {},
    mounted() {
        this.getlist();
    },
    methods: {
        getlist() {
            let loadingInstance = Loading.service();
            let {
                pages: { index }
            } = this;
            let params = {
                data: {
                    page_size: 20,
                    page: index
                }
            };
            couponList({
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
                        index: data.page,
                        total: data.total_count
                    };
                }
            });
        },
        openDetails(id) {
            let params = {
                data: {
                    id
                }
            };
            couponInfo({
                params,
                success: res => {
                    let {
                        data: { code, data, msg }
                    } = res;
                    if (code !== 0)
                        return this.$message.error(msg || "接口错误");
                    this.detailsInfo = data;
                    this.detailsInfo.remark = data.remark.trim();
                    this.detailsswitch = true;
                }
            });
        },
        // _cutstring (remark) {
        //     // let regTrimListSeq = /\d+、/;
        //     // console.log(remark)
        //     // console.log(remark.split(regTrimListSeq))
        //     return '111'
        // },
        handleCouponstatus(i) {
            let temp = "";
            if (i.match(/.*?(1|3)/gi)) {
                temp = "发放";
            } else if (i === "2") {
                temp = "停止发放";
            }
            return temp;
        },
        handleCoupon(id, status) {
            let self = this;
            let params = {
                data: {
                    id
                }
            };
            let name = this.handleCouponstatus(status);
            this.$confirm(`您是否要${name}此优惠券?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    if (status.match(/.*?(1|3)/gi)) {
                        couponGrant({
                            params,
                            success: res => {
                                let {
                                    data: { code, data, msg }
                                } = res;
                                if (code !== 0)
                                    return self.$message.error(
                                        msg || "接口错误"
                                    );
                                self.$message.success("操作成功");
                                self.getlist();
                            }
                        });
                    } else {
                        couponStop({
                            params,
                            success: res => {
                                let {
                                    data: { code, data, msg }
                                } = res;
                                if (code !== 0)
                                    return self.$message.error(
                                        msg || "接口错误"
                                    );
                                self.$message.success("操作成功");
                                self.getlist();
                            }
                        });
                    }
                })
                .catch(() => {});
        },
        pageChange(index) {
            this.pages.index = index;
            this.getlist();
        },
        handlekey(key) {
            return key + Math.random();
        }
    }
};
</script>

<style scoped lang="scss">
.title {
    width: 150px;
    margin: 30px 10px;
    padding: 10px 20px;
    text-align: center;
    background: #b10c79;
    color: white;
    a {
        color: white;
    }
}
.couponInfo {
    width: 100%;
    overflow: hidden;
    ul li {
        span {
            line-height: 28px;
        }
        span.name {
            display: inline-block;
            text-align: right;
            width: 200px;
            font-size: 14px;
            color: #999;
            vertical-align: top;
        }
        span.msg {
            display: inline-block;
            font-size: 12px;
            width: 360px;
            overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
            // vertical-align: bottom;
        }
    }
    .couponInfo-remark{
        white-space: pre-wrap;
        width: auto;
        padding: 20px 50px 30px 50px;
        font-size: 14px;
        color: #999;
        line-height: 28px;
        // word-wrap: break-word;
        // word-break: normal
    }
}
</style>
