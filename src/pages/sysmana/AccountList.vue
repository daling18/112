// src\components\system\account\list.vue
<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box" v-if="isSelf">
        <li class="on">本公司账号</li>
        <router-link
          v-if="$menuPermission('sysmana/account/list')"
          tag="li"
          to="../account/list"
        >全部账号</router-link>
      </ul>
      <ul class="tab-box" v-else>
        <router-link
          v-if="$menuPermission('sysmana/account/selflist')"
          tag="li"
          to="../account-self/list"
        >本公司账号</router-link>
        <li class="on">全部账号</li>
      </ul>
      <el-button
        class="right-btn"
        v-if="isSelf ? $menuPermission('sysmana/account/selflist/edit') : $menuPermission('sysmana/account/list/edit')"
        type="primary"
      >
        <router-link style="color: #fff;" :to="{path:'gain', query:{is_yyb: is_yyb}}">+ 新增</router-link>
      </el-button>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">账号/姓名</div>
        <el-input v-model="searchData.name" placeholder="请输入账号/姓名" />
      </div>
      <div class="search-item">
        <div class="label">所属组织</div>
        <el-input v-model="searchData.org_code_name" placeholder="请输入组织" />
      </div>
      <div class="search-item">
        <div class="label">状态</div>
        <el-select v-model="searchData.status" placeholder="请选择">
          <el-option label="全部" value="-1" />
          <el-option label="启用" value="0" />
          <el-option label="禁用" value="1" />
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="initPageFn(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="序号" align="center" width="50">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" align="center" min-width="160">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.username">{{ scope.row.username }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="login_name" label="账号" align="center" min-width="100">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.login_name">{{ scope.row.login_name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="联系方式" align="center" width="120" />
          <el-table-column label="所属组织" align="center" min-width="200">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.org_code_name">{{ scope.row.org_code_name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="roles_name" label="角色" align="center" width="160">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.roles_name">{{ scope.row.roles_name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status_name" label="状态" align="center" width="80" />
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="isShowOperate(0, scope.row)">
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="isShowOperate(1, scope.row)">
                    <router-link :to="{path:'gain', query:{id: scope.row.id,is_yyb:is_yyb}}">编辑</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(2, scope.row) && scope.row.status == 0">
                    <div @click="handleDisabledAccount(scope.row)">禁用</div>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(2, scope.row) && scope.row.status == 1">
                    <div @click="handleEnableAccount(scope.row)">启用</div>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(3, scope.row)">
                    <a href="javascript:;" @click="handleDelAccount(scope.row)">删除</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(4, scope.row)">
                    <div @click="role_dialog(scope.row)">分配角色</div>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(5, scope.row)">
                    <router-link :to="{path:'assign-line', query:{id: scope.row.id}}">分配路线</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(6, scope.row)">
                    <router-link
                      :to="{path:'jurisdiction-config', query:{id: scope.row.user_id}}"
                    >数据权限配置</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(7, scope.row)">
                    <router-link :to="{path:'edit-power', query:{id: scope.row.user_id}}">功能权限设置</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isShowOperate(8, scope.row)">
                    <router-link :to="{path:'view-power', query:{id: scope.row.user_id}}">查看功能权限</router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="searchDataOrigin.page_index"
        :total="totalPage"
      />
    </div>
    <!--启用禁用弹窗-->
    <!-- <el-dialog title="操作提示" :visible.sync="dialogonoffVisible">
      <span>确认{{ onoffStatusTxt }}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogonoffVisible = false">取 消</el-button>
        <el-button @click="affirmOnoff" type="primary">确 定</el-button>
      </span>
    </el-dialog>-->
    <!--/启用禁用弹窗-->

    <!-- 禁用新弹窗 -->
    <el-dialog
      :title="zhuanyiTit"
      :visible.sync="dialogonoffVisibleNew"
      @open="openTransfer"
      style="width: 100%;"
      @close="closeTransfer"
    >
      <div class="system-search" style="padding: 0; padding-left: 10px;">
        <div class="search-item" style="padding-left: 0;">
          <el-input v-model="search.username" placeholder="输入销售名称"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="handleSearchFun">搜索</el-button>
        </div>
      </div>
      <el-table :data="saleList" border style="width: 100%" ref="multipleTable">
        <el-table-column label="销售名称" align="center">
          <template slot-scope="scope">
            <div>
              <el-radio v-model="selectSale" :label="scope.row.user_id">{{scope.row.username}}</el-radio>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center" prop="mobile" />
        <el-table-column label="客户数量" align="center" prop="custom_num" />
      </el-table>
      <div class="page" v-if="saleList">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :page-size="10"
          :total="saleTotalPage"
          :current-page="search.page_index"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <div class="btnBox">
        <el-button @click="dialogonoffVisibleNew = false">关闭</el-button>
        <el-button type="primary" @click="handleZhuanyiFun">转移</el-button>
      </div>
    </el-dialog>
    <!-- 禁用新弹窗-结束 -->

    <!--分配角色弹窗-->
    <el-dialog title="分配角色" :visible.sync="dialogRoleVisible">
      <div class="diag-role-con" v-loading.body="dialogLoading">
        <div class="li cho">
          <p>选择角色：</p>
          <i
            v-for="(col,idx) in roleCb"
            :title="col.name"
            :key="idx"
            @click="roleDelChange(col)"
          >{{ col.name }}</i>
        </div>
        <div class="li sh">
          <p>角色名称：</p>
          <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="width: 200px;" />
        </div>
        <div class="cbox" ref="allRoles">
          <template v-for="(col,idx) in roleData">
            <el-checkbox
              :label="col"
              :key="idx"
              :title="col.name"
              v-model="roleCb"
              v-show="col.show"
            >{{ col.name }}</el-checkbox>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible=false">取 消</el-button>
        <el-button @click="affirmRole" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/分配角色弹窗-->
  </div>
</template>

<script>
import {
  // getStaffList,
  staffChangeStatus,
  staffRole,
  staffRoleDo
} from "src/api/api";
import {
  // selfUserList,
  changeSelfStatus,
  delUser,
  delSelfUser,
  assignSelfRole,
  doAssignSelfRole,
  onWxContorl,
  offWxContorl,
  getNewAccoundList,
  getSalesAccoundList,
  handleZhuanyiSalesAccound
} from "src/api/user";
export default {
  data() {
    return {
      operationType: null,
      excludeUser: null, // 排除的销售
      safeStaff: [],
      zhuanyiTit: "",
      saleTotalPage: 0,
      is_yyb: 1,
      saleList: [],
      selectSale: "",
      search: {
        username: "",
        phone: "",
        page_index: 1,
        page_size: 10
      },
      searchDataOrigin: {
        name: this.$route.query.name || "",
        org_code_name: this.$route.query.org_code_name || "",
        status: this.$route.query.status || "-1",
        page_index: parseInt(this.$route.query.page_index) || 1,
        page_size: 10
      },
      searchData: {
        name: "",
        org_code_name: "",
        status: "-1"
      },
      tableData: [],
      channel_total_page: "",
      totalPage:1,
      username: localStorage.getItem("username") || "",
      dialogonoffVisible: false,
      dialogRoleVisible: false,
      dialogonoffVisibleNew: false,
      onoffStatusTxt: null,
      onoffData: "",
      roleDataId: "",
      roleData: [],
      roleCb: [],
      roleCbSubmitArr: [],
      dialogLoading: false,
      filterText: ""
    };
  },
  computed: {
    isSelf() {
      return this.$route.name == "accountSelfList";
    }
  },
  watch: {
    "$route.path"(val, old) {
      this.searchDataOrigin = {
        name: this.$route.query.name || "",
        org_code_name: this.$route.query.org_code_name || "",
        status: this.$route.query.status || "-1",
        page_index: parseInt(this.$route.query.page_index) || 1
      };
      // this.totalPage = parseInt(this.$route.query.page) || 1;
      this.initPageFn();
    },
    filterText(val) {
      this.roleData.forEach(function(value, index, array) {
        if (value.name.indexOf(val) == -1) {
          value.show = false;
        } else {
          value.show = true;
        }
      });
    }
  },
  methods: {
    closeTransfer() {
      this.selectSale = "";
      this.excludeUser = null; // 重置操作销售
      this.saleList = []; // 重置操作列表
      this.onoffData = null;
    },
    openTransfer() {
      this.handleSalesList();
    },
    handleZhuanyiFun() {
      this.$confirm("此操作将禁用销售及转移其名下客户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          handleZhuanyiSalesAccound({
            params: {
              data: {
                user_id: this.selectSale,
                trans_user_id: this.onoffData.id
              }
            },
            success: res => {
              let data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "转移成功!"
                });
                this.onoffData.status = 1;
                if (this.operationType === "delete") {
                  this.handleDelAccount(this.onoffData);
                }
                if (this.operationType === "disabled") {
                  this.disabledAccount(this.onoffData);
                }
                this.dialogonoffVisibleNew = false;
                // this.closeTransfer();
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        })
        .catch(() => {});
    },
    handleSalesList() {
      getSalesAccoundList({
        params: {
          data: { ...this.search }
        },
        success: res => {
          let data = res.data;
          if (data.code == 0) {
            // 过滤正在操作的销售
            this.saleList = data.data.list.filter(
              item => item.user_id !== this.excludeUser.user_id
            );
            this.saleTotalPage = data.data.total;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSearchFun() {
      this.handleSalesList();
    },
    isShowOperate(edit, data) {
      if (!edit) {
        return [1, 2, 3, 4, 5, 6, 7, 8].some(e => this.isShowOperate(e, data));
      }
      switch (edit) {
        case 1: // '编辑'
          return this.editPerm(data);
        case 2: // '禁用启用'
          return this.statusChangePerm(data);
        case 3: // '删除'
          return this.delPerm(data);
        case 4: // '分配角色',
          return this.assignPerm(data);
        case 5: // '分配线路',
          return this.lineAuthPerm(data);
        case 6: // '数据权限配置'
          return this.dataPermConfigPerm(data);
        case 7: // '功能权限设置'
          return this.$menuPermission(
            (this.isSelf
              ? "sysmana/account/selflist/"
              : "sysmana/account/list/") + "editperm"
          );
        case 8: // '查看功能权限'
          return this.$menuPermission(
            (this.isSelf
              ? "sysmana/account/selflist/"
              : "sysmana/account/list/") + "viewperm"
          );
        default:
          return false;
      }
    },
    editPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account;
      const notMe = this.username != data.login_name;
      const notPerm = this.$menuPermission(
        (this.isSelf ? "sysmana/account/selflist/" : "sysmana/account/list/") +
          "edit"
      );
      return notMe && notPerm && dataPerm;
    },
    statusChangePerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account;
      return (
        this.$menuPermission(
          (this.isSelf
            ? "sysmana/account/selflist/"
            : "sysmana/account/list/") + "changestatus"
        ) && dataPerm
      );
    },
    delPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account;
      return (
        this.$menuPermission(
          (this.isSelf
            ? "sysmana/account/selflist/"
            : "sysmana/account/list/") + "del"
        ) && dataPerm
      );
    },
    assignPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account;
      return (
        this.$menuPermission(
          (this.isSelf
            ? "sysmana/account/selflist/"
            : "sysmana/account/list/") + "assignrole"
        ) && dataPerm
      );
    },
    lineAuthPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account;
      return (
        this.$menuPermission(
          (this.isSelf
            ? "sysmana/account/selflist/"
            : "sysmana/account/list/") + "lineauth"
        ) && dataPerm
      );
    },
    dataPermConfigPerm(data) {
      return this.$menuPermission(
        (this.isSelf ? "sysmana/account/selflist/" : "sysmana/account/list/") +
          "dataperm"
      );
    },
    initPageFn(bool) {
      let is_self = this.isSelf ? 1 : 0;
      const func = getNewAccoundList;

      if (bool) {
        this.searchDataOrigin.name = this.searchData.name || "";
        this.searchDataOrigin.org_code_name =
          this.searchData.org_code_name || "";
        this.searchDataOrigin.status = this.searchData.status || "";
        this.searchDataOrigin.page_index = 1;
      } else {
        this.searchData.name = this.searchDataOrigin.name;
        this.searchData.org_code_name = this.searchDataOrigin.org_code_name;
        this.searchData.status = this.searchDataOrigin.status;
        this.searchData.page_index = this.searchDataOrigin.page_index;
      }
      this.searchDataOrigin.is_self = is_self;
      // 更新query
      this.$router.replace({ query: this.searchDataOrigin });

      func({
        params: { data: this.searchDataOrigin },
        success: res => {
          let listData = res.data;
          this.tableData = listData.data.list;
          this.totalPage = parseInt(listData.data.total_count, 10);
          this.searchData.page_index = listData.data.page_index;
          // this.pagination.total_count = parseInt(listData.total_count, 10);
          // this.pagination.page_size = parseInt(listData.page_size, 10);
        },
        showLoading: true
      });
    },
    handleCurrentChange(page) {
      if (this.searchDataOrigin.page_index != page) {
        this.searchDataOrigin.page_index = page;
        this.initPageFn();
      }
    },
    isTransfer(val, type = "") {
      // 用户转移
      return new Promise((resolve, reject) => { // 暂时不需要转移用户
        if (val.is_sales && val.status == 0 && val.custom_num != 0) {
          this.zhuanyiTit =
            "是否删除" +
            val.username +
            "的销售账号，关闭需先将" +
            val.username +
            "的" +
            val.custom_num +
            "位客户转移给别的销售。";
          this.dialogonoffVisibleNew = true;
          this.excludeUser = val;
          this.onoffData = val; // 正在操作用户 数据
          this.operationType = type;
          resolve();
        } else {
          reject();
        }
      });
    },
    disabledAccount(val) {
      offWxContorl({
              method: "post",
              formdata: true,
              params: { userId: val.id }
            });
            staffChangeStatus({
              params: {
                data: {
                  id: val.id,
                  status: 1
                }
              },
              success: res => {
                if (res.data.code == 0) {
                  this.dialogonoffVisible = false;
                  this.$message.success(res.data.msg);
                  this.initPageFn();
                } else {
                  this.$message.error(res.data.msg);
                }
              },
              showLoading: true
            });
    },
    handleDisabledAccount(val) {
      // 禁用账户
      this.isTransfer(val, "disabled").catch(error => {
        this.$confirm("确定禁用该账号？", "禁用")
          .then(() => {
            this.disabledAccount(val);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    enableAccount(val) {
      onWxContorl({
        method: "post",
        headers: {
          "content-type": "application/json;charset=UTF-8"
        },
        params: { userid: val.id }
      });
      changeSelfStatus({
        params: {
          data: {
            id: val.id,
            status: 0
          }
        },
        success: res => {
          if (res.data.code == 0) {
            this.dialogonoffVisible = false;
            this.$message.success(res.data.msg);
            this.initPageFn();
          } else {
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      });
    },
    handleEnableAccount(val) {
      // 启用账户
      this.$confirm("确定启用？", "提示")
        .then(() => {
          this.enableAccount(val);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteAccount(val) {
      const func = this.isSelf ? delSelfUser : delUser;
      //同步微信
      offWxContorl({
        method: "post",
        formdata: true,
        params: { userId: val.id }
      });
      func({
        params: { data: { id: val.id } },
        success: resp => {
          let { code, msg, data } = resp.data;
          if (code == 0) {
            this.initPageFn();
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 删除账户
    handleDelAccount(data) {
      this.isTransfer(data, "delete").catch(err => {
        this.$confirm("确定删除该账号？", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.deleteAccount(data);
          })
          .catch(e => {
            console.log("cancel del", e);
          });
      });
    },
    affirmOnoff() {
      //同步微信
      let contorl, params;
      // this.onoffStatusTxt == "启用"
      //   ?
      //   onWxContorl({
      //       method: "post",
      //       headers: {
      //         "content-type": "application/json;charset=UTF-8"
      //       },
      //       params: { userid: this.onoffData.id }
      //     })
      //   : offWxContorl({
      //       method: "post",
      //       formdata: true,
      //       params: { userId: this.onoffData.id }
      //     });

      //切换状态
      // const func = this.isSelf ? changeSelfStatus : staffChangeStatus;
      // func({
      //   params: {
      //     data: {
      //       id: this.onoffData.id,
      //       status: this.onoffData.status == 1 ? 0 : 1
      //     }
      //   },
      //   success: res => {
      //     if (res.data.code == 0) {
      //       this.dialogonoffVisible = false;
      //       this.$message.success(res.data.msg);
      //       this.initPageFn();
      //     } else {
      //       this.$message.error(res.data.msg);
      //     }
      //   },
      //   showLoading: true
      // });
    },
    role_dialog(val) {
      const func = this.isSelf ? assignSelfRole : staffRole;
      let _this = this;

      this.dialogRoleVisible = true;
      this.dialogLoading = true;
      this.filterText = "";
      func({
        params: {
          data: {
            id: val.id
          }
        },
        success: res => {
          if (res.data.code == 0) {
            this.roleDataId = res.data.data.id;
            this.roleData = res.data.data.role_lists;
            _this.roleCb = [];
            this.roleData.forEach(function(value, index, array) {
              value.show = true;
              if (value.is_checked == "1") {
                _this.roleCb.push(value);
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
          this.dialogLoading = false;
        }
      });
    },
    roleDelChange(val) {
      let _this = this;
      _this.roleCb.forEach(function(value, index, array) {
        if (val.id == value.id) {
          _this.roleCb.splice(index, 1);
        }
      });
    },
    affirmRole() {
      const func = this.isSelf ? doAssignSelfRole : staffRoleDo;
      let _this = this;
      _this.roleCbSubmitArr = [];
      this.roleCb.forEach(function(value, index, array) {
        _this.roleCbSubmitArr.push(value.id);
      });
      func({
        params: {
          data: {
            id: this.roleDataId,
            roles: this.roleCbSubmitArr
          }
        },
        success: res => {
          if (res.data.code == 0) {
            this.dialogRoleVisible = false;
            this.$message.success(res.data.msg);
            this.initPageFn();
          } else {
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.initPageFn();
  }
};
</script>

<style scoped lang="scss">
.el-dropdown-menu__item a {
  white-space: nowrap;
}
.system-header {
  margin-bottom: 10px;
  padding: 15px;
  background: #fff;
}
.right-btn {
  position: absolute;
  right: 15px;
  top: 6px;
}

.list {
  .table-title {
    height: 36px;
    margin: 16px 0 10px 0;

    .total {
      display: inline-block;
      line-height: 36px;
      font-size: 14px;
      .total-receive {
        font-size: 16px;
        color: #00cc00;
      }
      .total-pay {
        font-size: 16px;
        color: #ff9900;
        margin-right: 20px;
      }
    }
    .btn-areas {
      float: right;
    }
  }
}

.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.diag-role-con .li {
  padding: 5px 0 10px 80px;
}
.diag-role-con p {
  float: left;
  margin-left: -80px;
}
.cho {
  overflow: hidden;
}
.cho p {
  line-height: 30px;
}
.cho i {
  position: relative;
  display: inline-block;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  padding: 0 15px 0 5px;
  cursor: pointer;
  line-height: 28px;
}
.cho i:hover {
  color: #b10c79;
  border-color: #b10c79;
}
.cho i::before {
  content: "×";
  position: absolute;
  right: 3px;
  top: -1px;
}
.cho i:hover::before {
  color: #b10c79;
}
.sh {
  overflow: hidden;
}
.sh p {
  line-height: 30px;
}
.sh input {
  float: left;
  width: 160px;
  padding: 3px 10px;
  line-height: 18px;
}
.cbox {
  border: 1px solid #e1e1e1;
  padding: 5px 10px;
  min-height: 60px;
}
.cbox .el-checkbox {
  width: 145px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 0 !important;
  margin-top: 5px;
  margin-right: 10px;
}
.btnBox {
  text-align: center;
}
</style>
