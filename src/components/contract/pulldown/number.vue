<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">合同编号</div>
        <el-input v-model="filters.contract_no"
                  placeholder="请输入合同编号"/>
      </div>
      <div class="search-item">
        <div class="label">合同状态</div>
        <el-select v-model="filters.status"
                   placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(o,i) in filtersStatus"
                     :key="i"
                     :label="o"
                     :value="Number(i)"/>
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="initPageFn(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <!-- system-content -->
    <div class="system-content">
      <div class="content-list">
        <div class="mode-table">
          <el-table :data="tableList">
            <el-table-column label="合同编号"
                             min-width="300"
                             header-align="center">
              <template slot-scope="scope">
                <span class="red tp" v-if="scope.row.status == 6">
                  【{{ scope.row.contract_status_name }}】
                </span>
                <span class="green tp" v-else-if="scope.row.status == 7">
                  【{{ scope.row.contract_status_name }}】
                </span>
                <span class="tp" v-else>
                  【{{ scope.row.contract_status_name }}】
                </span>
                <span class="cno">
                  {{ scope.row.contract_no }}
                </span>
                <span class="ying"
                      v-if="scope.row.is_to_biz == 1">营</span>
              </template>
            </el-table-column>
            <el-table-column label="对应订单编号"
                             header-align="center"
                             align="center"
                             width="200">
              <template slot-scope="scope">
                <template v-if="scope.row.order_no != ''">
                  <router-link :to="{path: '/sale/order/team', query:{contid: scope.row.contract_no}}">
                    <span v-for="(o,i) in scope.row.order_no"
                          :key="i"
                          class="ib">
                      <template v-if="i < 2">
                        {{ o }}
                      </template>
                    </span>
                    <template v-if="scope.row.order_no.length > 2">
                      ...
                    </template>
                  </router-link>
                </template>
                <template v-else>--</template>
              </template>
            </el-table-column>
            <el-table-column label="核销截止日期"
                             prop="cancel_deadline_time"
                             width="120"
                             header-align="center"
                             align="center"/>
            <el-table-column label="实际核销日期"
                             prop="cancel_time"
                             width="120"
                             header-align="center"
                             align="center"/>
            <el-table-column label="操作"
                             width="200"
                             fixed="right"
                             header-align="center"
                             align="center">
              <template slot-scope="scope">
                <span v-for="(o,i) in scope.row.menu"
                      :key="i">
                  <!-- 1绑定订单 -->
                  <router-link v-if="o.id == 1 && $menuPermission('api/contract/bind_order/add/'+type)"
                               :to="{path:'/contract/'+menuPre+'/'+typePre+'-border-a', query:{type:type,menu:menu,status:0,aid:aId,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 3修改订单 -->
                  <router-link v-if="o.id == 3 && $menuPermission('api/contract/bind_order/edit/'+type)"
                               :to="{path:'/contract/'+menuPre+'/'+typePre+'-border-e', query:{type:type,menu:menu,status:1,aid:aId,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 2核销 -->
                  <router-link v-if="o.id == 2 && $menuPermission('api/contract/use_cancel_add/hx/'+type)"
                               :to="{path:'/contract/'+menuPre+'/'+typePre+'-verify', query:{type:type,menu:menu,status:0,aid:aId,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 5重新核销 -->
                  <router-link v-if="o.id == 5 && $menuPermission('api/contract/use_cancel_add/cxhx/'+type)"
                               :to="{path:'/contract/'+menuPre+'/'+typePre+'-reverify', query:{type:type,menu:menu,status:1,aid:aId,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 4查看核销记录 -->
                  <router-link v-if="o.id == 4 && $menuPermission('api/contract/get_use_cancel/jl/'+roleMenuBEName+'/'+type)"
                               :to="{path:'/contract/'+menuPre+'/verify-record', query:{type:type,menu:menu,dtype:1,id:scope.row.contract_no,oid:$route.query.id}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 6审核 -->
                  <router-link v-if="o.id == 6 && $menuPermission('api/contract/get_use_cancel/sh')"
                               :to="{path:'/contract/'+menuPre+'/verify-record',query:{type:type,menu:menu,dtype:2,id:scope.row.contract_no,oid:$route.query.id}}">
                    {{ o.name }}
                  </router-link>
                </span>
                <template v-if="scope.row.menu.length == 0">--</template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- /system-content -->
    <!-- page -->
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next"
                     :total="pagination.total_count"
                     :page-size="pagination.page_size"
                     @current-change="currentPageChange"/>
    </div>
    <!-- /page -->
  </div>
  <!-- /wrapper -->
</template>

<script>
import {
  getContractNumberListLq1,
  getContractNumberListLq2,
  getContractNumberListSh1,
  getContractNumberListSh2
} from 'src/api/api';
export default{
  data(){
    return{
      type: null,
      menu: null,
      typePre: null,
      menuPre: null,
      roleMenuBEName: null,
      aId: null,
      filters:{
        contract_no: '',
        status: '',
        type: '',
        a_id: '',
        type: this.$route.query.type,
        a_id: this.$route.query.id
      },
      filtersParams: {},
      pageShow: false,
      pagination:{
        total_count: 0,
        total_page: 0,
        page_size: 10,
        page_index: 1
      },
      filtersStatus: [],
      tableList: []
    };
  },
  mounted(){
    this.initPageFn(true);
  },
  methods:{
    initPageFn(bool){
      if (bool) {
        this.filtersParams = {... this.filters};
        
        this.pagination = {
          total_count: 0,
          total_page: 0,
          page_size: 10,
          page_index: 1
        };
      }else{
        this.filters = {... this.filtersParams};
      }
      this.filtersParams.page = this.pagination.page_index;
      this.filtersParams.page_size = this.pagination.page_size;

      this.type = this.$route.query.type;
      this.menu = this.$route.query.menu;
      this.type == 2 ? this.typePre = 'head' : this.typePre = 'branch';
      this.menu == 1 ? this.menuPre = 'pulldown' : this.menuPre = 'audit';
      this.menu == 1 ? this.roleMenuBEName = 'lq' : this.roleMenuBEName = 'sh';
      this.aId = this.$route.query.id;
      if(this.type == 1 && this.menu == 1){
        // 分公司+领取
        getContractNumberListLq1({
          params: {data: this.filtersParams},
          success: res => {
            if(res.data.code == 0){
              let asyncObj = res.data.data;
              this.filtersStatus = asyncObj.status_list;
              this.tableList = asyncObj.list;
              this.pagination.total_count = asyncObj.total_count;
              this.pagination.total_page = asyncObj.total_page;
              this.pageShow = this.pagination.total_page > 0;
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
      }else if(this.type == 2 && this.menu == 1){
        // 总公司+领取
        getContractNumberListLq2({
          params: {data: this.filtersParams},
          success: res => {
            if(res.data.code == 0){
              let asyncObj = res.data.data;
              this.filtersStatus = asyncObj.status_list;
              this.tableList = asyncObj.list;
              this.pagination.total_count = asyncObj.total_count;
              this.pagination.total_page = asyncObj.total_page;
              this.pageShow = this.pagination.total_page > 0;
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
      }else if(this.type == 1 && this.menu == 2){
        // 分公司+审核
        getContractNumberListSh1({
          params: {data: this.filtersParams},
          success: res => {
            if(res.data.code == 0){
              let asyncObj = res.data.data;
              this.filtersStatus = asyncObj.status_list;
              this.tableList = asyncObj.list;
              this.pagination.total_count = asyncObj.total_count;
              this.pagination.total_page = asyncObj.total_page;
              this.pageShow = this.pagination.total_page > 0;
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
      }else if(this.type == 2 && this.menu == 2){
        // 总部+审核
        getContractNumberListSh2({
          params: {data: this.filtersParams},
          success: res => {
            if(res.data.code == 0){
              let asyncObj = res.data.data;
              this.filtersStatus = asyncObj.status_list;
              this.tableList = asyncObj.list;
              this.pagination.total_count = asyncObj.total_count;
              this.pagination.total_page = asyncObj.total_page;
              this.pageShow = this.pagination.total_page > 0;
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
      }
    },
    currentPageChange(val){
      if(this.pagination.page_index != val){
        this.pagination.page_index = val;
        this.initPageFn();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.ib{
  display: inline-block;
}
.tp, .cno, .ying{
  float: left;
}
.red{
  color: #e04850;
}
.green{
  color: #2ca23b;
}
.ying{
  width: 22px;
  height: 20px;
  line-height: 20px;
  color: #fff;
  background: #b10c79;
  border-radius: 2px;
  text-align: center;
  margin-left: 4px;
}
</style>
