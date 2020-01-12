<template>
  <div class="wrapper" >
    <div class="system-search">
      <div class="search-item">
        <div class="label">角色名称</div>
        <el-input v-model="searchData.name" placeholder="角色名称"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getListHandler(true)">查询</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="name" label="角色名称" align="center">
            <template slot-scope="scope">
              <!-- <p class="ellipsis" :title="scope.row.rules_name">{{scope.row.rules_name}}</p> -->
              <p class="short" :title="scope.row.name">{{scope.row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="属性" width="80">
            <template slot-scope="scope">
              <template v-if="scope.row.default_type==0">预置</template>
              <template v-else>自定义</template>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="rules_name" label="权限" align="center" show-overflow-tooltip /> -->
          <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip />
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="scope.row.default_type==1&&$menuPermission('api/auth/edit_role')">
                    <router-link :to="{path: '/role/gain', query: {id:scope.row.id,type:scope.row.default_type}}">编辑</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="$menuPermission('api/auth/get_assign_rules')">
                    <router-link :to="{path: '/role/power', query: {id:scope.row.id, type: 'view'}}">查看权限</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.default_type==1&&$menuPermission('api/auth/del_role')">
                    <a href="javascript:;" @click="alertAction(scope.row.id)">删除</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage">
      </el-pagination>

    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="dialogVisible"
      size="tiny">
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRoleHandler(id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getRoleList , deleteRole} from 'src/api/api'
export default {
  name: 'RoleList',
  data() {
    return {
      id:'',
      searchDataOrigin: {
        name: ''
      },
      searchData:{
        name:''
      },
      totalPage: 1,
      page: 1,
      pageShow: true,
      tableData: [],
      dialogVisible:false
      
    }
  },
  methods: {
    // handleCurrentChange(val) {
    //   this.page = val;
    //   this.getPaidList();
    // },
    getListHandler(bool) {
      let params = {
        data: this.searchData
      };

      if (bool) {
        this.totalPage=1;
        this.pageNo=1;
        this.searchDataOrigin.name = this.searchData.name || '';
      }else{
        this.searchData.name = this.searchDataOrigin.name;
      }

      params.data.pageNo= this.pageNo;

      getRoleList({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == 0) {
            this.tableData = data.data.list;
            this.totalPage = data.data.totalPages;
            // this.currentPage = data.data.pageNo;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    deleteRoleHandler(id){
      let params = {
        data: {
          ids:id
        }
      };

      deleteRole({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == 0) {
            this.$message.success(data.msg);
            this.getListHandler();
          } else {
            this.$message.error(data.msg);
          }
          this.dialogVisible=false;
        },
        showLoading: true
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getListHandler();
    },
    alertAction(id){
      this.id=id;
      this.dialogVisible=true;
    }
  },
  mounted() {
    this.getListHandler();
  }
}
</script>

<style scoped lang="scss">
.short{
  line-height: 20px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
  

</style>
