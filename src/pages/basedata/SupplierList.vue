<template>
    <!-- application\index\view\dev\src\components\system\supplier\supplierList.vue -->
    <div class="wrapper supplier-wrap">
        <div class="system-tab">
            <ul class="tab-box">
                <router-link tag="li" class="on" to="">
                    供应商管理
                </router-link>
                <router-link tag="li" to="/basedata/coop-list" v-if="$menuPermission('basedata/supplier/confirmcooperation')">
                    合作确认
                </router-link>
            </ul>
            <div class="btn" v-if="$menuPermission('basedata/supplier/manage/addsupplier')">
                <router-link :to="{path: '/basedata/supplier-add-step1'}">
                    <el-button type="primary">+ 新增</el-button>
                </router-link>
            </div>
        </div>
        <div class="system-search">
            <div class="clearfix">
                <div class="search-item long-item-wrap">
                    <div class="label long-item">供应商名称</div>
                    <el-input v-model="searchData.company" placeholder="输入供应商名称搜索"></el-input>
                </div>
                <div class="search-item">
                    <div class="label">所在城市</div>
                    <el-select @input="changeArea(true)" value-key="id" v-model="province" placeholder="请选择" clearable key="a">
                        <el-option v-for="item in province_list" :key="item.id" :label="item.area_name" :value="item">
                        </el-option>
                    </el-select>
                    <el-select v-model="city" value-key="id" placeholder="请选择" clearable key="b">
                        <el-option v-for="item in city_list" :key="item.id" :label="item.area_name" :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="search-item">
                    <div class="label long-item">供应商类型</div>
                    <el-select v-model="searchData.is_signing" placeholder="请选择">
                        <el-option v-for="item in supplierTypeList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="clearfix">
                <div class="search-item long-item-wrap">
                    <div class="label long-item">统一社会信用代码</div>
                    <el-input v-model="searchData.duty_paragraph" placeholder="统一社会信用代码"></el-input>
                </div>
                <div class="search-item">
                    <div class="label">启用/禁用</div>
                    <el-select v-model="searchData.status" placeholder="请选择">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="已启用" value="1"></el-option>
                        <el-option label="已禁用" value="2"></el-option>
                    </el-select>
                </div>
                <div class="search-item">
                    <div class="label">审核状态</div>
                    <el-select v-model="searchData.approval_status" placeholder="请选择">
                        <el-option label='全部' value='99'></el-option>
                        <el-option label="审核中" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核不通过" value="2"></el-option>
                        <el-option label='待提交' value='98'></el-option>
                    </el-select>
                </div>
                <div class="search-item search-button">
                    <el-button @click="supplierList(true)" type="primary">立即搜索</el-button>
                </div>
            </div>
        </div>
        <div class="system-content">
            <div class="content-list">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="name" label="供应商名称" align='center' min-width='200'>
                        <template slot-scope="scope">
                            <div class="ellipsis" :title="scope.row.full_name">
                                {{scope.row.full_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="taxpayer_num" label="统一社会信用代码" align='center' width='200'>
                        <template slot-scope="scope">
                            <div class="ellipsis" :title="scope.row.taxpayer_num">
                                {{scope.row.taxpayer_num}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' label="所在城市" width='200'>
                        <template slot-scope="scope">
                            <div class="ellipsis" :title="`${scope.row.province}${scope.row.city}`">
                                {{scope.row.province}}{{scope.row.city}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' prop="address" label="地址" width='200'>
                        <template slot-scope="scope">
                            <div class="ellipsis" :title="scope.row.address">
                                {{scope.row.address}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' label="状态" width='100'>
                        <template slot-scope='scope'>
                            <div v-if="scope.row.approval_status === '0' && scope.row.approval_id != 0">审核中</div>
                            <div v-else-if="scope.row.approval_status === '1'">
                                <span class="color-green" v-if="scope.row.status === '1'">已启用</span>
                                <span class="color-red" v-else-if="scope.row.status === '2'">已禁用</span>
                            </div>
                            <div class="color-red" v-else-if="scope.row.approval_status === '2'">审核不通过</div>
                            <div v-else-if="scope.row.approval_status === '0' && scope.row.approval_id === '0'">待提交</div>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <span v-if="!isShowOperate(0, scope)">--</span>
                            <template v-else>
                                <el-button v-if="isShowOperate(1, scope)" @click="enabledDisableSupplier(scope)" class="mr-btn" type='text'>启用</el-button>
                                <el-button v-if="isShowOperate(2, scope)" @click="enabledDisableSupplier(scope)" class="mr-btn" type='text'>禁用</el-button>
                                <el-button v-if="isShowOperate(3, scope)" @click="reApprovalAction(scope)" class="mr-btn" type='text'>重新提交</el-button>
                                <!-- <router-link v-if="shenpiBtn(scope)" class="mr-btn" :to="{path: '/system/approval-detail', query: {id: scope.row.approval_id}}" >
                  <el-button type='text'>审批单</el-button>
                </router-link> -->
                                <router-link v-if="isShowOperate(4, scope)" class="mr-btn" :to="{path: '/basedata/supplier-detail', query: {id: scope.row.id}}">
                                    <el-button type='text'>查看</el-button>
                                </router-link>
                                <router-link v-if="isShowOperate(5, scope)" :to="{path: '/basedata/supplier-add-step1', query: {id: scope.row.id, approval_status: scope.row.approval_status}}">
                                    <el-button type='text'>编辑</el-button>
                                </router-link>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page">
                <el-pagination layout="prev, pager, next" :current-page='searchData.page' :total="total" @current-change="currentPageChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getAllAreaList,
    enDisableSupplier,
    reSubmitApproval,
    getSupplierList
} from "src/api/supplier";
export default {
    data() {
        return {
            searchData: {
                company: "",
                duty_paragraph: "",
                status: "0",
                approval_status: "99",
                is_signing: '0',
                page: 1,
                page_size: 10
            },
            resData: {
                company: "",
                duty_paragraph: "",
                status: "0",
                approval_status: "99",
                is_signing: '0',
                page: 1,
                page_size: 10
            },
            province_list: [],
            city_list: [],
            province: "",
            city: "",
            // supplierType: '0',
            supplierTypeList: [
              {
                id: '0',
                label: "全部 "
              },
              {
                id: '1',
                label: "签约 " 
              },
              {
                id: '2',
                label: "非签约 " 
              }
            ],
            tableData: [],
            total: 1,
            page: 1
        };
    },
    methods: {
        isShowOperate(edit, data) {
            if (!edit) {
                return [1, 2, 3, 4, 5].some(e => this.isShowOperate(e, data));
            }
            switch (edit) {
                case 1: // '启用'
                    return this.enblelBtn(data);
                case 2: // '禁用'
                    return this.disabledBtn(data);
                case 3: // '重新提交'
                    return (
                        data.row.approval_status == "2" &&
                        this.$menuPermission(
                            "basedata/supplier/manage/reapproval"
                        )
                    );
                case 4: // '查看',
                    return this.$menuPermission(
                        "basedata/supplier/manage/supplierdetail"
                    );
                case 5: // '编辑'
                    return this.editBtn(data);
                default:
                    return false;
            }
        },
        enblelBtn(scope) {
            let api = this.$menuPermission(
                "basedata/supplier/manage/enableddisablesupplier"
            );
            if (
                api &&
                scope.row.approval_status === "1" &&
                scope.row.status === "2"
            ) {
                return true;
            } else {
                return false;
            }
        },
        disabledBtn(scope) {
            let api = this.$menuPermission(
                "basedata/supplier/manage/enableddisablesupplier"
            );
            if (
                api &&
                scope.row.approval_status === "1" &&
                scope.row.status === "1"
            ) {
                return true;
            } else {
                return false;
            }
        },
        editBtn(scope) {
            let api = this.$menuPermission(
                "basedata/supplier/manage/addsupplier"
            );
            if (
                api &&
                (scope.row.approval_status != 0 ||
                    scope.row.approval_id === "0")
            ) {
                return true;
            } else {
                return false;
            }
        },
        shenpiBtn(scope) {
            let api = true;
            if (
                api &&
                (scope.row.approval_status === "0" ||
                    scope.row.approval_status === "2") &&
                scope.row.approval_id != 0
            ) {
                return true;
            } else {
                return false;
            }
        },
        async supplierList(type) {
            if (this.province.id) {
                this.searchData.province = this.province.area_name;
            } else {
                this.searchData.province = "";
            }
            if (this.city.id) {
                this.searchData.city = this.city.area_name;
            } else {
                this.searchData.city = "";
            }
            if (type) {
                this.searchData.page = 1;
                this.resData = { ...this.searchData };
            } else {
                this.searchData = { ...this.resData };
            }
            let params = {
                data: this.resData
            };
            
            const { data: { code, data, msg }} = await getSupplierList(params, true);
            if (code !== 0) return this.$message.error(msg);
            this.tableData = data.supplier_list;
            this.total = data.total_count * 1;
        },
        async enabledDisableSupplier(scope) {
            let params = {
                data: {
                    id: scope.row.id
                }
            };
            const {
                data: { code, data, msg }
            } = await enDisableSupplier(params, true);
            if (code !== 0) return this.$message.error(msg);
            this.$message.success(msg);
            this.supplierList();
            // enabledDisableSupplier({
            //   params,
            //   success: (res) => {
            //     let result = res.data
            //     if (result.code === 0) {
            //       this.$message({
            //         type: 'success',
            //         message: result.msg
            //       })
            //       this.supplierList()
            //     } else {
            //       this.$message({
            //         type: 'error',
            //         message: result.msg
            //       })
            //     }
            //   },
            //   showLoading: true
            // })
        },
        reApprovalAction(scope) {
            this.$confirm("重新提交审批?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.reApproval(scope);
                })
                .catch(() => {});
        },
        async reApproval(scope) {
            let params = {
                data: {
                    id: scope.row.id
                }
            };
            const {
                data: { code, data, msg }
            } = await reSubmitApproval(params, true);
            if (code !== 0) return this.$message.error(msg);
            this.$message.success(msg);
            this.supplierList();
        },
        getAllAreaList() {
            getAllAreaList({
                success: res => {
                    let result = res.data;
                    if (result.code === 0) {
                        this.province_list = result.data;
                    }
                }
            });
        },
        changeArea(type) {
            this.city_list = this.province.child;
            if (type) {
                this.city = "";
            }
        },
        currentPageChange(val) {
            this.resData.page = val;
            this.supplierList();
        }
    },
    mounted() {
        this.getAllAreaList();
        this.supplierList();
    }
};
</script>
<style lang="less" scoped>
.supplier-wrap {
    .long-item-wrap {
        padding-left: 110px;
    }
    .long-item {
        width: 130px;
        margin-left: -136px;
    }
    .mr-btn {
        margin-left: 10px;
    }
}
</style>
