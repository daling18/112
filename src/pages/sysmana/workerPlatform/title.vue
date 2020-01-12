<template>
    <div id="worker-container">
        <div class="worker-page" v-if="pageIndex == 0">
            <div class="worker-header">
                <el-button v-if="permission" class="right-btn" type="primary" @click="add">添加内容</el-button>
                <div v-if="!permission" style="text-align:center;font-size:30px;">
                    盈科旅游公告
                </div>
            </div>
            <div class="worker-body">
                <el-table @cell-click="showDetail" width="100%" :data="tableData" v-loading="loading" border>
                    <el-table-column label="标题" prop="title" min-width="200" align="left">
                    </el-table-column>
                    <el-table-column label="发布人" prop="username" min-width="140" align="center"></el-table-column>
                    <el-table-column label="更新时间" prop="update_time" min-width="160" align="center"></el-table-column>
                    <el-table-column label="管理操作" v-if="permission" min-width="160" align="center">
                        <template slot-scope="scope">
                            <span class="controlSpan" @click.stop="edit(scope.row)">编辑</span>
                            |
                            <span class="controlSpan" @click.stop="remove(scope.row)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="worker-footer">
                <el-pagination align="center" layout="prev, pager, next" next-text="下一页" prev-text="上一页" :total="totalCount" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="8">
                </el-pagination>
            </div>
        </div>
        <!--编辑添加-->
        <addEdit v-if="pageIndex == 1" ref="addEdit" :type="3" @switchPage="switchPage"></addEdit>

        <detail v-if="pageIndex == 2" :type="3" @switchPage="switchPage"></detail>
    </div>
</template>

<script>
// import { changePasswd, returnInsuranceOrder } from "../../../api/api";
import { getWorkerList, removeWorkerRow } from "src/api/orgination";
import addEdit from "./components/addEdit";
import detail from "./components/detail";

export default {
    name: "worker-container",
    components: { addEdit, detail },
    data() {
        return {
            permission: false,
            loading: false,
            pageIndex: 0, //0 列表 1 添加 编辑  2详情
            currentPage: 1,
            totalCount: 0,
            tableData: [
                // {
                //   title: "标题党",
                //   id: 10,
                //   update_time: Date.now(),
                //   username: "caoshiyuan"
                // }
            ]
        };
    },
    watch: {
        params(o) {
            if (o.id) {
                this.switchPage(2);
            }
        }
    },
    computed: {
        params() {
            let obj = this.$route;
            return obj.query ? obj.query : {};
        }
    },
    methods: {
        switchPage(index) {
            this.pageIndex = index ? index : 0;
            if (this.pageIndex == 0) {
                this.getList();
            }
            if (this.pageIndex != 2) {
                this.$router.push({ query: {} });
            }
        },
        add() {
            this.switchPage(1);
            this.$nextTick(() => {
                this.$refs.addEdit.init();
            });
        },
        edit(item) {
            this.switchPage(1);
            this.$nextTick(() => {
                this.$refs.addEdit.init(item);
            });
        },
        remove(item) {
            this.$confirm("删除后将无法恢复，确认是否删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                align: "center"
            })
                .then(async () => {
                    let params = {
                        data: { id: item.id }
                    };
                    let result = await removeWorkerRow(params).then(res => res);
                    if (result.data.code == 0) {
                        this.getList();
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    } else {
                        this.$message({
                            type: "error",
                            message: result.data.msg
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showDetail(item, cell) {
            let { property } = cell;
            if (property == "title") {
                this.$router.push({ query: { id: item.id } });
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        getList(isloading = false) {
            this.loading = true;
            getWorkerList(
                {
                    data: {
                        page_size: 10,
                        type: 3,
                        page_index: this.currentPage
                    }
                },
                isloading
            )
                .then(res => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data.list;
                        this.totalCount = res.data.data.total_count;
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                    this.$message.error("获取列表失败");
                });
        }
    },
    mounted() {
        this.permission = this.$menuPermission("workplatform/title/permission");
        if (this.params.id) {
            this.switchPage(2);
        } else {
            this.getList(true);
        }
    }
};
</script>

<style lang="scss">
#worker-container {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    .worker-page {
        height: 100%;
        .worker-body {
            td {
                color: #4c4c4c;
            }
            td:first-child:hover,
            td:last-child span:hover {
                color: #b10c79;
                cursor: pointer;
            }

            margin-top: 20px;
            height: calc(100% - 100px);
        }
        .worker-footer {
            padding: 19px 0px;
        }
    }
}
</style>