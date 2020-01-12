<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">签证大洲</div>
        <el-select v-model="searchInput.continent" placeholder="请选择">
          <el-option value="" label="全部"/>
          <el-option v-for="(val, key) in VISA_CONTINENT_MAP" :key="key" :label="val" :value="val" />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">签证国家</div>
        <el-input v-model="searchInput.nation_name" placeholder="签证国家" />
      </div>
      <div class="search-item">
        <div class="label">签证名称</div>
        <el-input v-model="searchInput.name" placeholder="签证名称" />
      </div>
      <div class="search-item">
        <div class="label">签证类型</div>
        <el-select v-model="searchInput.visa_type" placeholder="请选择">
          <el-option value="" label="全部"/>
          <el-option v-for="(val, key) in VISA_TYPE_MAP" :key="key" :label="val" :value="key" />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">签证状态</div>
        <el-select v-model="searchInput.status" placeholder="请选择">
          <el-option value="" label="全部"/>
          <el-option v-for="(o,i) in STATUS_MAP"
                     :key="i"
                     :label="o"
                     :value="i" />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">上架状态</div>
        <el-select v-model="searchInput.audit_status" placeholder="请选择">
          <el-option value="" label="全部"/>
          <el-option v-for="(o,i) in AUDIT_STATUS_MAP"
                     :key="i"
                     :label="o"
                     :value="i" />
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch()">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" border style="width: 100%" tooltip-effect="light" >
          <el-table-column
            label="签证名称"
            align="center"
            min-width="150"
            :resizable="false">
            <template slot-scope="scope">
              <el-tooltip effect="light" placement="bottom">
                <p class="ellipsis" :title="scope.row.name">
                  {{ scope.row.name }}
                  <span :class="scope.row.status === 1 ? 'canuse' : 'nouse'">{{ STATUS_MAP[scope.row.status] }}</span>
                </p>
                <div slot="content">{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="签证国家"
            align="center"
            width="180"
            prop="nation_name"
            show-overflow-tooltip
            :resizable="false"
          />
          <el-table-column
            label="签证类型"
            prop="visa_type_name"
            align="center"
            width="120"
            :resizable="false"/>
          <el-table-column
            label="上架状态"
            align="center"
            width="100"
            :resizable="false">
            <template slot-scope="scope">
              <span :class="scope.row.audit_status | getStatusColor">{{ scope.row.audit_status_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100" fixed="right" :resizable="false">
            <template slot-scope="scope">
              <el-dropdown trigger="click" @command="handleOperate($event, scope.row)">
                <span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"/></span>
                <el-dropdown-menu slot="dropdown">
                  <template v-for="(edit, i) in scope.row.edit">
                    <el-dropdown-item v-if="isShowOperate(edit, scope.row)" :key="i" :command="edit">
                      {{ EDIT_MAP[edit] }}
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="totalPage"
        :current-page="searchData.page_index"/>
    </div>
  </div>
</template>

<script>
import { visaList, changeStatus, putaway, soldOut, sendBack }from 'src/api/selfsupport.visa'

export default {
  filters: {
    getStatusColor(status){
      switch(status) {
      case 3: 
        return 'color-green';
      case 4: 
        return 'color-red'; 
      case 5:
      case 6:
        return 'color-gray';
      case 1:
      case 2:
      default:
        return '';
      }
    }
  },
  data () {
    const { query } = this.$route;

    return {
      VISA_CONTINENT_MAP: {},
      VISA_TYPE_MAP: {},
      EDIT_MAP: {},
      STATUS_MAP: {},
      AUDIT_STATUS_MAP: {},
      searchInput: {
      },
      searchData: {
        continent: query.continent || '',
        nation_name: query.nation_name || '',
        name: query.name || '',
        visa_type: query.visa_type || '',
        audit_status: query.audit_status || '',
        status: query.status || '',
        page_index: parseInt(query.page_index) || 1
      },
      tableData: [],
      totalPage: parseInt(query.page_index) || 1,
      pageShow: false
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    isShowOperate(edit, data) {
      switch (edit) {
      case 1: 
        return this.$menuPermission('api/selfsupport.visa/visa_detail');
      case 2:
        return this.$menuPermission('api/selfsupport.visa/add_visa');
      case 3:
      case 4:
        return this.$menuPermission('api/selfsupport.visa/change_status');
      case 5:
        return this.$menuPermission('api/selfsupport.visa/putaway');
      case 6:
        return this.$menuPermission('api/selfsupport.visa/sold_out');
      case 7:
        return this.$menuPermission('api/selfsupport.visa/send_back');
      default:
        return false;
      }
    },
    getList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page_index = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      this.searchData.page_size = 10;

      visaList({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            let result = data.data;
            this.tableData = result.list;
            this.totalPage = result.total_count;
            this.pageShow = result.total_count > 0;
            this.VISA_TYPE_MAP = result.visa_type_list;
            this.STATUS_MAP = result.status_list;
            this.VISA_CONTINENT_MAP = result.continent_list || [];
            this.AUDIT_STATUS_MAP = result.audit_status_list;
            this.EDIT_MAP = result.edit_list;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page){
        this.searchData.page_index = val;
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    },
    handleOperate(cmd, data){
      let msg = '';
      let apiFunc = '';
      let params = {id: data.id};
      switch(cmd){
      case 1:
        return this.$router.push({path:'detail', query: {id: data.id}});
      case 2:
        return this.$router.push({path:'edit', query: {id: data.id}});
      case 3:
        msg = '确定启用该签证？';
        apiFunc = changeStatus;
        params.status = 1;
        break;
      case 4:
        msg = '确定禁用该签证？';
        apiFunc = changeStatus;
        params.status = 2;
        break;
      case 5:
        msg = '确定上架该签证到SCM？';
        apiFunc = putaway;
        break;
      case 6:
        msg = '确定下架该签证到SCM？';
        apiFunc = soldOut;
        break;
      case 7:
        msg = '确定撤回该签证的上架申请？';
        apiFunc = sendBack;
        break;
      }
      this.$confirm(msg, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(apiFunc){
          apiFunc({
            params: {data: params},
            success: ({data}) => {
              if(data.code == 0){
                this.$message.success(data.msg);
                this.getList();
              }else{
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          })
        }
      }).catch(()=>{});
    },
  }
}
</script>

<style lang="scss" scoped>
.canuse {
  color: #fff;
  background-color: #019f3d;
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 2px;
}
.nouse {
  color: #fff;
  background-color: #999999;
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 2px;
}
</style>
