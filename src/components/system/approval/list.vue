<template>
  <div class="wrapper" >
    <div class="system-tab">
      <ul class="tab-box">
        <template v-if="loadType == 0">
          <router-link tag="li"
            class="on"
            to="/system/approval/list-submit">
            我发起的
          </router-link>
          <router-link tag="li"
            to="/system/approval/list-check"
            v-if="$menuPermission('api/approval/my_wait_approval_list')">
            待我审批
          </router-link>
          <router-link tag="li"
            to="/system/approval/list-checked"
            v-if="$menuPermission('api/approval/already_approval_list')">
            我已审批
          </router-link>
        </template>
        <template v-else-if="loadType == 1">
          <router-link tag="li"
            to="/system/approval/list-submit"
            v-if="$menuPermission('api/approval/my_start_approval_list')">
            我发起的
          </router-link>
          <router-link tag="li"
            class="on"
            to="/system/approval/list-check">
            待我审批
          </router-link>
          <router-link tag="li"
            to="/system/approval/list-checked"
            v-if="$menuPermission('api/approval/already_approval_list')">
            我已审批
          </router-link>
        </template>
        <template v-else-if="loadType == 2">
          <router-link tag="li"
            to="/system/approval/list-submit"
            v-if="$menuPermission('api/approval/my_start_approval_list')">
            我发起的
          </router-link>
          <router-link tag="li"
            to="/system/approval/list-check"
            v-if="$menuPermission('api/approval/my_wait_approval_list')">
            待我审批
          </router-link>
          <router-link tag="li"
            class="on"
            to="/system/approval/list-checked">
            我已审批
          </router-link>
        </template>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">审批类型</div>
        <el-select v-model="searchData.approval_type" placeholder="请选择">
          <el-option label="全部" value="" />
          <el-option v-for="(o,i) in allData.approval_types"
            :key="i"
            :label="o"
            :value="i" />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">审批状态</div>
        <el-select v-model="searchData.status" placeholder="请选择">
          <template v-if="loadType == 1">
            <el-option label="审批中" value="1" />
          </template>
          <template v-else>
            <el-option label="全部" value="" />
            <el-option label="审批中" value="1" />
            <el-option label="审批通过" value="2" />
            <el-option label="审批不通过" value="3" />
            <el-option label="已撤销" value="4" />
          </template>
        </el-select>
      </div>
			<div class="search-item">
				<div class="label">审批编号</div>
				<el-input v-model="searchData.approval_no" placeholder="审批单编号" />
			</div>
			<div class="search-item">
				<div class="label">审批标题</div>
				<el-input v-model="searchData.title" placeholder="审批单标题" />
			</div>
      <search-item-date-range v-model="calendarDateCreate" label="发起日期"/>
      <search-item-date-range v-model="calendarDateComplete" label="完成日期"/>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="approval_no" 
            label="审批单编号" 
            header-align="center" 
            width="160" 
            :resizable="false">
          </el-table-column>
          <el-table-column prop="title" 
            label="审批单标题" 
            header-align="center" 
            width="150" 
            :resizable="false">
          </el-table-column>
          <el-table-column prop="approval_type_name" 
            label="审批类型" 
            header-align="center" 
            width="150" 
            :resizable="false">
          </el-table-column>
          <el-table-column label="发起人" 
            header-align="center" 
            min-width="220" 
            :resizable="false">
            <template slot-scope="scope">
              <div class="fqr">
                <p><b>发起人：</b>{{scope.row.initiator_name}}</p>
                <p><b>部门：</b>{{scope.row.initiator_dep_name}}</p>
                <p><b>公司：</b>{{scope.row.company_name}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" 
            label="发起时间" 
            align="center" 
            width="100" 
            :resizable="false">
          </el-table-column>
          <el-table-column prop="complete_time" 
            label="完成时间" 
            align="center" 
            width="100" 
            :resizable="false">
          </el-table-column>
          <el-table-column prop="status_name" 
            label="审批状态" 
            align="center" 
            width="100" 
            :resizable="false">
          </el-table-column>
          <el-table-column label="操作" 
            width="80" 
            align="center" 
            fixed="right"
            :resizable="false">
            <template slot-scope="scope">
              <span class="alink curpoint"
                @click="handleSponsorSp(scope.row.id)"
                v-if="loadType == 1 && $menuPermission('api/approval/deal_approval')">
                审批
              </span>
              <router-link :to="{path:'/system/approval/detail', query:{id:scope.row.id}}">
                审批单
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :total="pagination.totalCount"
        :page-size="pagination.size"/>
    </div>
    <!--审批弹窗-->
    <el-dialog title="审批操作"
      :visible.sync="diaSpVisible"
      @close="cleanForm('formSpRef')"
      size="tiny">
      <el-form :model="formSp"
        ref="formSpRef">
        <el-form-item label="审批" prop="operation">
          <el-radio-group v-model="formSp.operation">
            <el-radio label="1">同意</el-radio>
            <el-radio label="2">不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="formSp.remark" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSponsorSp(null,'cancel')">取 消</el-button>
        <el-button @click="handleSponsorSp(null,'submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/审批弹窗-->
  </div>
</template>

<script>
import { my_start_approval_list, my_wait_approval_list, already_approval_list, deal_approval } from "src/api/approval";
import { formattDate} from 'src/assets/js/common.js';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
export default {
  data() {
    return {
      loadType: null,
      searchDataOrigin: {
        approval_type: "",
        approval_no: '',
        title: '',
        status: "",
        create_time_start: '',
        create_time_end: '',
        complete_time_start: '',
        complete_time_end: '',
        page: 1
      },
      searchData: {
        approval_type: "",
        approval_no: '',
        title: '',
        status: "",
        create_time_start: '',
        create_time_end: '',
        complete_time_start: '',
        complete_time_end: '',
        page: 1
      },
      calendarDateCreate: ['',''],
      calendarDateComplete: ['',''],
      allData: [],
      tableData: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
        totalPage: 0,
        size: 10
      },
      pageShow: false,
      // 审批弹窗属性
      diaSpVisible: false,
      formSp:{
        approval_id: '',
        operation: '1',
        remark: ''
      }
    };
  },
  created: function(){
    switch(this.$route.name){
      case 'systemApprovalListsubmit':
        this.loadType = 0;
        break;
      case 'systemApprovalListcheck':
        this.loadType = 1;
        break;
      case 'systemApprovalListchecked':
        this.loadType = 2;
        break;
    }
  },
  watch: {
    '$route' (to, from) {
      if(to.name != from.name){
        this.searchDataOrigin.approval_type = '';
        this.searchData.approval_no = '';
        this.searchDataOrigin.status = '';
        this.searchDataOrigin.title = '';
        this.searchDataOrigin.create_time_start = '';
        this.searchDataOrigin.create_time_end = '';
        this.searchDataOrigin.complete_time_start = '';
        this.searchDataOrigin.complete_time_end = '';
        switch(to.name){
          case 'systemApprovalListsubmit':
            this.loadType = 0;
            this.searchData.status = '';
            break;
          case 'systemApprovalListcheck':
            this.loadType = 1;
            this.searchData.status = '1';
            break;
          case 'systemApprovalListchecked':
            this.loadType = 2;
            this.searchData.status = '';
            break;
        }
        this.handleSearch(true);
      }
    }
  },
  computed: {
  },
  components: {
    SearchItemDateRange
  },
  methods: {
    handleSearch(bool) {
      if(bool){
        this.searchData.page = 1;
        this.searchData.create_time_start = this.calendarDateCreate[0];
        this.searchData.create_time_end = this.calendarDateCreate[1];
        this.searchData.complete_time_start = this.calendarDateComplete[0];
        this.searchData.complete_time_end = this.calendarDateComplete[1];
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
        this.calendarDateCreate = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.calendarDateComplete = [this.searchData.complete_time_start, this.searchData.complete_time_end];
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }
      let api = '';
      switch(this.loadType){
        case 0:
          api = my_start_approval_list;
          break;
        case 1:
          api = my_wait_approval_list;
          break;
        case 2:
          api = already_approval_list;
          break;
      }
      api({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.allData = data;
            this.tableData = data.data;
            this.pagination.currentPage = data.page_index;
            this.pagination.totalCount = data.total_count;
            this.pagination.totalPage = data.total_page;
            this.pageShow = data.total_page > 1 ? true : false;
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCurrentChange(val) {
      this.searchDataOrigin.page = val;
      this.handleSearch();
    },
    handleSponsorSp(row, type){
      if(row!=null){
        this.diaSpVisible = true;
        this.formSp.approval_id = row;
      }else{
        if(type == 'submit'){
          let para = {};
          para.data = this.formSp;
          this.diaSpVisible = false;
          deal_approval({
            params: para,
            success: res => {
              let { code, data, msg } = res.data;
              if (code == 0) {
                this.$message.success(msg);
                this.handleSearch();
              } else {
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        }
        this.diaSpVisible = false;
      }
    },
    cleanForm(refName){
      this.$refs[refName].resetFields();
    },
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px;
  padding: 15px;
  background: #fff;
}
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.fqr{
  line-height: 18px;
  padding-left: 60px;
  b{
    float: left;
    width: 60px;
    margin-left: -60px;
    font-weight: 400;
    text-align: right;
  }
}
.alink{
  color: #b10c79;
  &:hover{
    opacity: .8;
  }
}
</style>
