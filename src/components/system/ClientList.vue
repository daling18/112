<template>
  <div class="wrapper" >
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">客户信息管理</li>
      </ul>
      <router-link
        class="right-btn el-button el-button--primary el-button--long" 
        v-if="$menuPermission('api/client/add_client')"
        :to="{path: '/system/client/add', query: {}}"
      >+ 添加客户信息</router-link>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">单位名称</div>
        <el-select 
          class="client-list-select-org"
          v-model="searchDataInput.settlement_org_name"
          remote
          filterable
          clearable
          :remote-method="getMatchOrg"
          :loading="loadingOrg"
          placeholder="输入单位名称搜索"
        >
          <el-option
            v-for="org in orgList"
            :key="org.id"
            :label="org.name"
            :value="org.name"
          />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">联系人姓名</div>
        <el-input v-model="searchDataInput.name" placeholder="负责人姓名"/>
      </div>
      <div class="search-item">
        <div class="label">联系人QQ</div>
        <el-input v-model="searchDataInput.qq" placeholder="QQ"/>
      </div>
      <div class="search-item">
        <div class="label">类型</div>
        <el-select v-model="searchDataInput.client_type" placeholder="全部">
          <el-option label="全部" value=""/>
          <el-option :label="val" :value="key" :key="key" v-for="(val, key) in clientTypeListMap"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">联系人身份证</div>
        <el-input v-model="searchDataInput.id_card" placeholder="负责人身份证"/>
      </div>
      <div class="search-item">
        <div class="label">联系人电话</div>
        <el-input v-model="searchDataInput.mobile" placeholder="电话"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="name" label="单位名称" align="center" min-width="200">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.settlement_org_name">{{ scope.row.settlement_org_name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center" width="100">
            <template slot-scope="scope">
              {{ clientTypeListMap[scope.row.client_type] }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="联系人姓名" align="center" min-width="100">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.name">{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="id_card" label="联系人身份证" align="center" width="180"/>
          <el-table-column prop="mobile" label="联系人电话" align="center" width="110"/>
          <el-table-column prop="qq" label="联系人QQ" align="center" width="120"/>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <router-link
                v-if="$menuPermission('api/client/add_client')"
                :to="{path: '/system/client/edit', query: {id:scope.row.id}}"
              >编辑</router-link>
              <router-link
                v-if="$menuPermission('api/client/client_info')"
                :to="{path: '/system/client/detail', query: {id:scope.row.id}}"
              >查看</router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
  </div>
</template>

<script>
import { clientList, getSettlementList } from 'src/api/client';
export default {
  name: 'ClientList',
  data() {
    return {
      orgList: [],
      loadingOrg: false,
      searchDataInput: {
        settlement_org_name: '',
        client_type: '',
        name: '',
        id_card: '',
        mobile: '',
        qq: '',
        page: 1,
        page_size: 10
      },
      searchData:{
        name:''
      },
      pageShow: true,
      totalPage: 1,
      tableData: [],
      clientTypeListMap: []
    };
  },
  mounted() {
    this.getList(true);
    this.getMatchOrg('');
  },
  methods: {
    getList(isSearch){
      if(isSearch){
        this.searchData = {... this.searchDataInput};
        this.searchData.page = 1;
      }else{
        this.searchDataInput = {... this.searchData};
      }
      clientList(({
        params: {data: this.searchData},
        success:(resp) => {
          let { code, data, msg } = resp['data'];

          if(code == 0){
            this.tableData = data.data;
            this.clientTypeListMap = data.client_type_list;
            this.totalPage = data.total_page;
            this.pageShow = this.totalPage > 1;
          }else{
            this.$message.error(msg);
          }
          
        },
        showLoading: true
      }));
    },
    getMatchOrg: function(query){
      query = (query || '').trim();
      const data = {name: query};

      this.loadingOrg = true;
      getSettlementList({
        params: {data},
        success: (res) => {
          const { code, data, msg } = res.data;
          let list = [];

          if(!code){
            list = data;
          }else{
            this.$message({message: msg, type:'error'});
          }
          this.orgList = list;
          this.loadingOrg = false;
        }
      });
    },
    handleCurrentChange(val) {
      if(this.searchData.page != val){
        this.searchData.page = val;
        this.getList();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.system-search .search-item{
  padding-left: 90px;
  &.search-button{
    padding-left: 0;
  }
  .label{
    width: 85px;
    margin-left: -90px;
  }
}
.right-btn{
    position: absolute;
    right: 15px;
    top: 8px;
}

</style>
<style>
.client-list-select-org.el-select .el-input__inner{
  padding-right: 10px;
}

</style>
