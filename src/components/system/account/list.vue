<template>
  <div class="wrapper" >
    <div class="system-tab">
      <ul class="tab-box" v-if="isSelf">
        <li class="on">本公司账号</li>
        <router-link v-if="$menuPermission('api/user')" tag="li" to="/account/list">全部账号</router-link>
      </ul>
      <ul class="tab-box" v-else>
        <router-link v-if="$menuPermission('api/user/self_index')" tag="li" to="/account-self/list">本公司账号</router-link>
        <li class="on">全部账号</li>
      </ul>
      <el-button
        class="right-btn"
        v-if="isSelf ? $menuPermission('api/user/add_self_user') : $menuPermission('api/user/add_user')"
        type="primary"
        @click="$router.push('gain')"
      >+ 新增</el-button>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">账号/姓名</div>
        <el-input v-model="searchData.name" placeholder="请输入账号/姓名"/>
      </div>
      <div class="search-item">
        <div class="label">所属组织</div>
        <el-input v-model="searchData.org_code_name" placeholder="请输入组织"/>
      </div>
      <div class="search-item">
        <div class="label">状态</div>
        <el-select v-model="searchData.status" placeholder="请选择">
          <el-option label="全部" value="-1"/>
          <el-option label="启用" value="0"/>
          <el-option label="禁用" value="1"/>
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
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" align="center" min-width="160">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.username">
                {{ scope.row.username }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="login_name" label="账号" align="center" min-width="100">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.login_name">
                {{ scope.row.login_name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="联系方式" align="center" width="120"/>
          <el-table-column label="所属组织" align="center" min-width="200">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.org_code_name">
                {{ scope.row.org_code_name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="roles_name" label="角色" align="center" width="160">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.roles_name">
                {{ scope.row.roles_name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="status_name" label="状态" align="center" width="80"/>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-dropdown trigger="click" v-if="editPerm(scope.row) || statusChangePerm(scope.row) || delPerm(scope.row) || assignPerm(scope.row) || lineAuthPerm(scope.row) || dataPermConfigPerm(scope.row)">
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="editPerm(scope.row)">
                    <router-link :to="{path:'gain', query:{id: scope.row.id}}">编辑</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="statusChangePerm(scope.row)">
                    <div @click="onoff_dialog(scope.row)">{{ scope.row.status_name == '启用' ? '禁用' : '启用' }}</div>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="delPerm(scope.row)">
                    <a href="javascript:;" @click="handleDelAccount(scope.row)">删除</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="assignPerm(scope.row)">
                    <div @click="role_dialog(scope.row)">分配角色</div>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="lineAuthPerm(scope.row)">
                    <router-link :to="{path:'assign-line', query:{id: scope.row.id}}">分配路线</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="dataPermConfigPerm(scope.row)">
                    <router-link :to="{path:'jurisdiction-config', query:{id: scope.row.user_id}}">权限配置</router-link>
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
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="pagination.total_count" :page-size="pagination.page_size"/>
    </div>
    <!--启用禁用弹窗-->
    <el-dialog title="操作提示" :visible.sync="dialogonoffVisible" size="tiny">
      <span>确认{{ onoffStatusTxt }}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogonoffVisible = false">取 消</el-button>
        <el-button @click="affirmOnoff" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/启用禁用弹窗-->
    <!--分配角色弹窗-->
    <el-dialog title="分配角色" :visible.sync="dialogRoleVisible">
      <div class="diag-role-con" v-loading.body="dialogLoading">
        <div class="li cho">
          <p>选择角色：</p>
          <i v-for="(col,idx) in roleCb" :title="col.name" :key="idx" @click="roleDelChange(col)">{{ col.name }}</i>
        </div>
        <div class="li sh">
          <p>角色名称：</p>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            style="width: 200px;"/>
        </div>
        <div class="cbox" ref="allRoles">
          <template v-for="(col,idx) in roleData">
            <el-checkbox :label="col" :key="idx" :title="col.name" v-model="roleCb" v-show="col.show">{{ col.name }} </el-checkbox>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button @click="affirmRole" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/分配角色弹窗-->
  </div>
</template>

<script>
import {
  getStaffList,
  staffChangeStatus,
  staffRole,
  staffRoleDo
} from 'src/api/api';
import {
  selfUserList,
  changeSelfStatus,
  delUser,
  delSelfUser,
  assignSelfRole,
  doAssignSelfRole
} from 'src/api/user';
export default {
  data() {
    return {
      searchDataOrigin: {
        name:'',
        org_code_name: '',
        status: '-1'
      },
      searchData:{
        name:'',
        org_code_name: '',
        status: '-1'
      },
      tableData: [],
      pagination: {
        total_count: 0,
        total_page: 0,
        page_size: 15,
        page_index: 1,
      },
      dialogonoffVisible: false,
      dialogRoleVisible: false,
      onoffStatusTxt: null,
      onoffData: '',
      roleDataId: '',
      roleData: [],
      roleCb: [],
      roleCbSubmitArr: [],
      dialogLoading:false,
      filterText:''
    };
  },
  computed:{
    isSelf () {
      return this.$route.name == 'accountSelfList'
    }
  },
  watch: {
    '$route.path' (val, old) {
      this.searchData = {
        name:'',
        org_code_name: '',
        status: '-1'
      }
      this.initPageFn(true)
    },
    filterText(val) {
      this.roleData.forEach(function(value, index, array) {
        if(value.name.indexOf(val) == -1){
          value.show=false;
        }else{
          value.show=true;
        }
      });
    }
  },
  methods: {
    editPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account
      return (this.$menuPermission('api/user/add_user') || this.isSelf) && dataPerm
    },
    statusChangePerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account
      return (this.$menuPermission('api/user/change_status') || this.isSelf) && dataPerm
    },
    delPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account
      return (this.$menuPermission('api/user/del') || this.isSelf) && dataPerm
    },
    assignPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account
      return (this.$menuPermission('api/user/assign_role') || this.isSelf) && dataPerm
    },
    lineAuthPerm(data) {
      const dataPerm = data.is_assign == 1 && data.is_add_account
      return (this.$menuPermission('api/user/add_line_auth') || this.isSelf) && dataPerm
    },
    dataPermConfigPerm(data) {
      return (this.$menuPermission('api/user/add_data_permission_config') || this.isSelf)
    },
    initPageFn(bool) {
      const func = this.isSelf ? selfUserList : getStaffList
      let para = {};
      para.data = this.searchData;
      if(bool){
        para.data.page = 1;
        this.pagination = {
          total_count: 0,
          total_page: 0,
          page_size: 15,
          page_index: 1
        };
        this.searchDataOrigin.name = this.searchData.name || '';
        this.searchDataOrigin.org_code_name = this.searchData.org_code_name || '';
        this.searchDataOrigin.status = this.searchData.status || '';
      }else{
        this.searchData.name = this.searchDataOrigin.name;
        this.searchData.org_code_name = this.searchDataOrigin.org_code_name;
        this.searchData.status = this.searchDataOrigin.status;
      }
      para.data.page = this.pagination.page_index;
      if(this.$route.query.org_code_name){
        para.data.org_code_name = this.$route.query.org_code_name;
      }
      if(this.$route.query.org_id){
        para.data.org_id = this.$route.query.org_id;
      }
      if(this.$route.query.name){
        para.data.name = this.$route.query.name;
      }
      func({
        params: para,
        success: (res) => {
          let listData = res.data;
          this.tableData = listData.data;
          this.pagination.total_count = parseInt(listData.total_count, 10);
          this.pagination.total_page = parseInt(listData.total_page, 10);
          this.pagination.page_size = parseInt(listData.page_size, 10);
          this.pagination.page_index = parseInt(listData.page_index, 10);
        },
        showLoading: true
      });
    },
    handleCurrentChange(val) {
      this.pagination.page_index = val;
      this.initPageFn();
    },
    onoff_dialog(val){
      this.dialogonoffVisible = true;
      this.onoffData = val;
      if(val.status == 0){
        this.onoffStatusTxt = '禁用';
      }else{
        this.onoffStatusTxt = '启用';
      }
    },
    affirmOnoff(){
      const func = this.isSelf ? changeSelfStatus : staffChangeStatus

      func({
        params: {
          data: {
            id: this.onoffData.id,
            status: this.onoffData.status == 1 ? 0 : 1
          }
        },
        success: (res) => {
          if(res.data.code == 0){
            this.dialogonoffVisible = false;
            this.$message.success(res.data.msg);
            this.initPageFn();
          }else{
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      });
    },
    role_dialog(val){
      const func = this.isSelf ? assignSelfRole : staffRole
      let _this=this;

      this.dialogRoleVisible = true;
      this.dialogLoading = true;
      this.filterText = '';

      func({
        params: {
          data: {
            id: val.id
          }
        },
        success: (res) => {
          if(res.data.code == 0){
            this.roleDataId = res.data.data.id;
            this.roleData = res.data.data.role_lists;
            _this.roleCb=[];
            this.roleData.forEach(function(value, index, array) {
              value.show = true;
              if(value.is_checked=='1'){
                _this.roleCb.push(value);
              }
            });
          }else{
            this.$message.error(res.data.msg);
          }
          this.dialogLoading = false;
        }
      });
    },
    roleCbChange(){
    },
    roleDelChange(val){
      let _this = this;
      _this.roleCb.forEach(function(value, index, array) {
        if(val.id == value.id){
          _this.roleCb.splice(index, 1);
        }
      });
    },
    affirmRole(){
      const func = this.isSelf ? doAssignSelfRole : staffRoleDo
      let _this = this;
      _this.roleCbSubmitArr = [];
      this.roleCb.forEach(function(value, index, array){
        _this.roleCbSubmitArr.push(value.id);
      });
      func({
        params: {
          data: {
            id: this.roleDataId,
            roles: this.roleCbSubmitArr
          }
        },
        success: (res) => {
          if(res.data.code == 0){
            this.dialogRoleVisible = false;
            this.$message.success(res.data.msg);
            this.initPageFn();
          }else{
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      });
    },
    handleDelAccount(data){
      const func = this.isSelf ? delSelfUser : delUser
      this.$confirm('确定删除该账号？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        func({
          params: {data: {id: data.id}},
          success: (resp) => {
            let {code, msg, data} = resp.data; 
            
            if(code == 0){
              this.initPageFn();
              this.$message.success(msg);
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        })
      }).catch((e) => {
         console.log('cancel del', e)      
      });
    },
  },
  mounted() {
    this.initPageFn();
  }
};
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px; 
  padding: 15px;
  background: #fff;
}
.right-btn{
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
        color: #00CC00;
      }
      .total-pay {
        font-size: 16px;
        color: #FF9900;
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
.diag-role-con .li{
  padding: 5px 0 10px 80px;
}
.diag-role-con p{
  float: left;
  margin-left: -80px;
}
.cho{
  overflow: hidden;
}
.cho p{
  line-height: 30px;
}
.cho i{
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
.cho i:hover{
  color: #b10c79;
  border-color: #b10c79;
}
.cho i::before{
  content: '×';
  position: absolute;
  right: 3px;
  top: -1px;
}
.cho i:hover::before{
  color: #b10c79;
}
.sh{
  overflow: hidden;
}
.sh p{
  line-height: 30px;
}
.sh input{
  float: left;
  width: 160px;
  padding: 3px 10px;
  line-height: 18px;
}
.cbox{
  border: 1px solid #e1e1e1;
  padding: 5px 10px;
  min-height: 60px;
}
.cbox .el-checkbox{
  width: 145px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 0!important;
  margin-top: 5px;
  margin-right: 10px;
}
</style>
