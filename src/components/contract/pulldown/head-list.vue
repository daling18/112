<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- system-tab -->
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">
          <router-link :to="{path:'/contract/'+rolePath+'/head-list'}">
            总部合同
          </router-link>
        </li>
        <li v-if="$menuPermission('api/contract/apply_list/1/'+roleMenuVar)">
          <router-link :to="{path:'/contract/'+rolePath+'/branch-list'}">
            分公司合同
          </router-link>
        </li>
      </ul>
    </div>
    <!-- /system-tab -->
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item calendar">
        <div class="label">领取日期</div>
        <el-date-picker v-model="receive_date_start"
                        type="date"
                        placeholder="选择日期"
                        :editable="false"
                        :picker-options="datepickerOptionsPull2"/>
        <div class="label zhi">-</div>
        <el-date-picker v-model="receive_date_end"
                        type="date"
                        placeholder="选择日期"
                        :editable="false"
                        :picker-options="datepickerOptionsPull1"/>
      </div>
      <div class="search-item calendar">
        <div class="label">申请日期</div>
        <el-date-picker v-model="create_date_start"
                        type="date"
                        placeholder="选择日期"
                        :editable="false"
                        :picker-options="datepickerOptionsApply2"/>
        <div class="label zhi">-</div>
        <el-date-picker v-model="create_date_end"
                        type="date"
                        placeholder="选择日期"
                        :editable="false"
                        :picker-options="datepickerOptionsApply1"/>
      </div>
      <div class="search-item">
        <div class="label">申请人</div>
        <el-input v-model="filters.user_name"
                  placeholder="请输入申请人姓名"/>
      </div>
      <div class="search-item">
        <div class="label">合同份数</div>
        <el-input v-model="filters.all_count"
                  placeholder="请输入合同份数"/>
      </div>
      <div class="search-item">
        <div class="label">申请单号</div>
        <el-input v-model="filters.apply_no"
                  placeholder="请输入申请单号"/>
      </div>
      <div class="search-item">
        <div class="label">合同编号</div>
        <el-input v-model="filters.contract_no"
                  placeholder="请输入合同编号"/>
      </div>
      <div class="search-item">
        <div class="label">领取状态</div>
        <el-select v-model="filters.status"
                   placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option label="分公司审核中" value="1"/>
          <el-option label="总部产品部审核中" value="2"/>
          <el-option label="总部财务审核中" value="3"/>
          <el-option label="领取成功" value="4"/>
          <el-option label="领取失败" value="5"/>
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
            <el-table-column label="申请单号/申请日期"
                             width="200"
                             header-align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.apply_no }}</p>
                <p class="gray">{{ scope.row.create_time }}</p>
              </template>
            </el-table-column>
            <el-table-column label="申请人"
                             prop="user_name"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <div class="ellipsis-clamp2 h40" :title="scope.row.user_name">
                  {{ scope.row.user_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="总合同份数"
                             width="100"
                             align="center">
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  title=""
                  width="100"
                  trigger="hover">
                  <span slot="reference"
                        @mouseover="getCountList(scope.row)">
                    {{ scope.row.all_count }}
                  </span>
                  <div class="plancontent" v-loading="tableCountLoading">
                    <p>国内合同数：{{ tableCount.home_count }}</p>
                    <p>出境合同数：{{ tableCount.abroad_count }}</p>
                    <p>待核销合同数：{{ tableCount.use_status0 }}</p>
                    <p>使用核销合同数：{{ tableCount.use_status1 }}</p>
                    <p>遗失报备合同数：{{ tableCount.use_status2 }}</p>
                    <p>损毁存档合同数：{{ tableCount.use_status3 }}</p>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="领取日期"
                             prop="receive_time"
                             width="100"
                             align="center"/>
            <el-table-column label="核销截止日期"
                             prop="cancel_time"
                             width="110"
                             align="center"/>
            <el-table-column label="审批人"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <div class="ellipsis-clamp2 h40"
                     :title="scope.row.to_org_name+'/'+scope.row.to_user_name">
                  {{ scope.row.to_org_name }} /
                  {{ scope.row.to_user_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="领取状态"
                             width="120"
                             align="center">
              <template slot-scope="scope">
                <span class="red"
                      v-if="scope.row.status == 5">
                  {{ scope.row.status_name }}
                </span>
                <span class="green"
                      v-else-if="scope.row.status == 4">
                  {{ scope.row.status_name }}
                </span>
                <span v-else>
                  {{ scope.row.status_name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="108"
                             fixed="right"
                             header-align="center"
                             align="center">
              <template slot-scope="scope">
                <span v-for="(o,i) in scope.row.menu"
                      :key="i">
                  <router-link 
                               v-if="o.menu_name == '详情' && $menuPermission('api/contract/apply_detail/2/'+roleMenuVar+'/1')"
                               :to="{path:'/contract/'+rolePath+'/head-detail',query:{type:2,menu:roleMenuVar,dtype:1,id:scope.row.id}}">
                    {{ o.menu_name }}
                  </router-link>
                  <router-link 
                               v-if="o.menu_name == '审核' && $menuPermission('api/contract/apply_detail/2/2/2')"
                               :to="{path:'/contract/'+rolePath+'/head-detail',query:{type:2,menu:roleMenuVar,dtype:2,id:scope.row.id}}">
                    {{ o.menu_name }}
                  </router-link>
                  <router-link 
                               v-if="o.menu_name == '合同编号' && $menuPermission('api/contract/get_contract_no_list/'+roleMenuBEName+'/2')"
                               :to="{path:'/contract/'+rolePath+'/head-number',query:{type:2,menu:roleMenuVar,id:scope.row.id}}">
                    {{ o.menu_name }}
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
      <el-pagination layout="prev, pager, next" :total="pagination.total_count" :page-size="pagination.page_size" @current-change="currentPageChange"/>
    </div>
    <!-- /page -->
  </div>
  <!-- /wrapper -->
</template>

<script>
import {
  getContractPulldownList2,
  getContractAuditList2,
  getContractPulldownCount
} from 'src/api/api';
import { formattDate } from 'src/assets/js/common.js';
export default{
  data(){
    return{
      role: null,
      rolePath: null,
      roleMenuVar: null,
      roleMenuBEName: null,
      filters:{
        receive_date_start: '',
        receive_date_end: '',
        create_date_start: '',
        create_date_end: '',
        user_name: '',
        all_count: '',
        apply_no: '',
        contract_no: '',
        status: '',
        menu: ''
      },
      filtersParams: {},
      pageShow: false,
      pagination:{
        total_count: 0,
        total_page: 0,
        page_size: 10,
        page_index: 1
      },
      receive_date_start: '',
      receive_date_end: '',
      create_date_start: '',
      create_date_end: '',
      tableList: [],
      tableCount: [],
      tableCountLoading: true
    };
  },
  computed:{
    datepickerOptionsPull2(){
      let tDate = this.receive_date_end;
      return{
        disabledDate(time){
          return time.getTime() > (new Date(tDate)).getTime();
        }
      };
    },
    datepickerOptionsPull1(){
      let tDate = this.receive_date_start;
      return{
        disabledDate(time){
          return time.getTime() < (new Date(tDate)).getTime();
        }
      };
    },
    datepickerOptionsApply2(){
      let tDate = this.create_date_end;
      return{
        disabledDate(time){
          return time.getTime() > (new Date(tDate)).getTime();
        }
      };
    },
    datepickerOptionsApply1(){
      let tDate = this.create_date_start;
      return{
        disabledDate(time){
          return time.getTime() < (new Date(tDate)).getTime();
        }
      };
    },
  },
  watch:{},
  methods:{
    initPageFn(bool){
      if (bool) {
        this.filtersParams = {... this.filters};
        this.filtersParams.receive_date_start = this.receive_date_start ? formattDate(this.receive_date_start) : '';
        this.filtersParams.receive_date_end = this.receive_date_end ? formattDate(this.receive_date_end) : '';
        this.filtersParams.create_date_start = this.create_date_start ? formattDate(this.create_date_start) : '';
        this.filtersParams.create_date_end = this.create_date_end ? formattDate(this.create_date_end) : '';
        
        this.pagination = {
          total_count: 0,
          total_page: 0,
          page_size: 10,
          page_index: 1
        };
      }else{
        this.filters = {... this.filtersParams};
        this.receive_date_start = this.filtersParams.receive_date_start;
        this.receive_date_end = this.filtersParams.receive_date_end;
        this.create_date_start = this.filtersParams.create_date_start;
        this.create_date_end = this.filtersParams.create_date_end;
      }
      this.filtersParams.page = this.pagination.page_index;
      this.filtersParams.page_size = this.pagination.page_size;

      if(this.role == 'pulldown'){
        getContractPulldownList2({
          params: {data: this.filtersParams},
          success: res => {
            if(res.data.code == 0){
              let asyncObj = res.data.data;
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
      }else{
        getContractAuditList2({
          params: {data: this.filtersParams},
          success: res => {
            if(res.data.code == 0){
              let asyncObj = res.data.data;
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
      this.pagination.page_index = val;
      this.initPageFn();
    },
    getCountList(o){
      this.tableCountLoading = true;
      let para = {};
      para.data = {};
      para.data.id = o.id;
      getContractPulldownCount({
        params: para,
        success: res => {
          if(res.data.code == 0){
            this.tableCountLoading = false;
            this.tableCount = res.data.data;
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }
      });
    }
  },
  created(){
    this.$route.name == 'contractPulldownHeadList' ? this.role = 'pulldown' : this.role = 'audit';
    if(this.role == 'pulldown'){
      this.rolePath = 'pulldown';
      this.roleMenuVar = 1;
      this.filters.menu = 1;
      this.roleMenuBEName = 'lq';
    }else{
      this.rolePath = 'audit';
      this.roleMenuVar = 2;
      this.filters.menu = 2;
      this.roleMenuBEName = 'sh';
    }
  },
  mounted(){
    this.initPageFn(true);
    //  console.log(this.$route.path)
  }
};
</script>

<style scoped lang="scss">
.tab-box{
  a{
    color: #8391a5;
  }
}
.gray{
  color: #9d9d9d;
}
.red{
  color: #e04850;
}
.green{
  color: #2ca23b;
}
.plancontent {
  font-size: 14px;
  color: #666;
  span {
    display: inline-block;
    width: 60px;
    text-align: right;
  }
}
.h40{
  height: 40px;
  line-height: 20px;
}
</style>
