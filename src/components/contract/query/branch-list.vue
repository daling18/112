<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li @click="goto('/contract/query/head-list',{})" v-if="$menuPermission('api/contract/get_contract_no_list/cx/2')">总部合同</li>
        <li class="on">分公司合同</li>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item calendar">
        <div class="label">领取日期</div>
        <el-date-picker v-model="show_apply_time_start" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions2"/>
        <div class="label zhi">-</div>
        <el-date-picker v-model="show_apply_time_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions1"/>
      </div>
      <div class="search-item calendar">
        <div class="label" >实际核销</div>
        <el-date-picker v-model="show_cancel_time_start" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions4"/>
        <div class="label zhi">-</div>
        <el-date-picker v-model="show_cancel_time_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions3"/>
      </div>
      <div class="search-item calendar">
        <div class="label" >核销截止</div>
        <el-date-picker v-model="show_cancel_deadline_start" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions6"/>
        <div class="label zhi">-</div>
        <el-date-picker v-model="show_cancel_deadline_end" type="date" placeholder="选择日期" :editable="false" :picker-options="datepickerOptions5"/>
      </div>
      <div class="search-item">
        <div class="label">合同状态</div>
        <el-select v-model="searchData.status" placeholder="全部">
          <el-option label="全部" value=""/>
          <template v-if="status_list">
            <el-option v-for="( value , key ) in status_list" :label="value" :value="key" :key="key"/>
          </template>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">合同编号</div>
        <el-input v-model="searchData.contract_no" placeholder="合同编号"/>
      </div>
      <div class="search-item">
        <div class="label">申请人</div>
        <el-input v-model="searchData.user_name" placeholder="申请人姓名"/>
      </div>
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchData.order_no" placeholder="订单编号"/>
      </div>
      <div class="search-item">
        <div class="label">申请单号</div>
        <el-input v-model="searchData.apply_no" placeholder="合同申请单号"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list" v-if="tableData">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="contract_no" label="合同编号" align="left" min-width="200">
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
            <el-table-column prop="order_no" label="对应订单号" align="left" width="170">
              <template slot-scope="scope">
                <template v-if="scope.row.order_no != ''">
                  <div v-if="scope.row.order_no.length==1">
                    {{ scope.row.order_no[0] }}
                  </div>
                  <div v-else :title="scope.row.order_no.join(',')">
                    {{ scope.row.order_no[0] }}...
                  </div>
                </template>
                <template v-else>--</template>
              </template>
            </el-table-column>
            <el-table-column prop="apply_no" label="申请单号" align="center" width="170"/>
            <el-table-column prop="cancel_deadline_time" label="核销截止日期" align="center" width="110"/>
            <el-table-column prop="cancel_time" label="实际核销日期" align="center" width="110"/>
            <el-table-column label="操作" align="center" width="140">
              <template slot-scope="scope">
                <span v-for="(o,i) in scope.row.menu"
                      :key="i">
                  <!-- 1绑定订单 -->
                  <router-link v-if="o.id == 1 && $menuPermission('api/contract/bind_order/add/1')"
                               :to="{path:'/contract/'+(o.tag=='lq'?'pulldown':'audit')+'/'+typePre+'-border-a', query:{type:1,menu:(o.tag=='lq'?1:2),status:0,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 3修改订单 -->
                  <router-link v-if="o.id == 3 && $menuPermission('api/contract/bind_order/edit/1')"
                               :to="{path:'/contract/'+(o.tag=='lq'?'pulldown':'audit')+'/'+typePre+'-border-e', query:{type:1,menu:(o.tag=='lq'?1:2),status:1,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 2核销 -->
                  <router-link v-if="o.id == 2 && $menuPermission('api/contract/use_cancel_add/hx/1')"
                               :to="{path:'/contract/'+(o.tag=='lq'?'pulldown':'audit')+'/'+typePre+'-verify', query:{type:1,menu:(o.tag=='lq'?1:2),status:0,aid:scope.row.a_id,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 5重新核销 -->
                  <router-link v-if="o.id == 5 && $menuPermission('api/contract/use_cancel_add/cxhx/1')"
                               :to="{path:'/contract/'+(o.tag=='lq'?'pulldown':'audit')+'/'+typePre+'-reverify', query:{type:1,menu:(o.tag=='lq'?1:2),status:1,aid:scope.row.a_id,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 4查看核销记录 -->
                  <router-link v-if="o.id == 4 && $menuPermission('api/contract/get_use_cancel/jl/cx/1')"
                               :to="{path:'/contract/'+(o.tag=='lq'?'pulldown':'audit')+'/verify-record', query:{type:1,menu:(o.tag=='lq'?1:2),dtype:1,id:scope.row.contract_no}}">
                    {{ o.name }}
                  </router-link>
                  <!-- 6审核 -->
                  <router-link v-if="o.id == 6 && $menuPermission('api/contract/use_cancel_review/cx/1')"
                               :to="{path:'/contract/'+(o.tag=='lq'?'pulldown':'audit')+'/verify-record',query:{type:1,menu:(o.tag=='lq'?1:2),dtype:2,id:scope.row.contract_no}}">
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
    <div class="page" v-show="isShowPage">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-count="totalPage"/>
    </div>
  </div>
</template>
<script>
import { getContractNumberList1 } from 'src/api/api';
import { formattDate } from 'src/assets/js/common.js';
export default{
  data(){
    return{
      status_list:null,
      tableData:null,
      typePre: 'branch',
      page:1,
      totalPage:1,
      currentPage:1,
      show_apply_time_start:'',
      show_apply_time_end:'',
      show_cancel_time_start:'',
      show_cancel_time_end: '',
      show_cancel_deadline_start:  '',
      show_cancel_deadline_end:  '',
      searchData: {
        type:1,
        apply_time_start:'',
        apply_time_end:'',
        cancel_time_start:'',
        cancel_time_end: '',
        cancel_deadline_start:  '',
        cancel_deadline_end:  '',
        status:'',
        contract_no:'',
        user_name:'',
        order_no:'',
        apply_no:'',
        page_size: 10
      },
      searchParams: {}
    };
  },
  computed:{
    isShowPage(){
      return this.totalPage > 0;
    },
    datepickerOptions1(){
      let depart_date = this.show_apply_time_start;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptions2(){
      let depart_date = this.show_apply_time_end;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptions3(){
      let depart_date = this.show_cancel_time_start;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptions4(){
      let depart_date = this.show_cancel_time_end;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptions5(){
      let depart_date = this.show_cancel_deadline_start;
      return {
        disabledDate(time) {
          return time.getTime() < (new Date(depart_date)).getTime();
        }
      };
    },
    datepickerOptions6(){
      let depart_date = this.show_cancel_deadline_end;
      return {
        disabledDate(time) {
          return time.getTime() > (new Date(depart_date)).getTime();
        }
      };
    }
  },
  mounted(){
    this.getList(true);
  },
  methods:{
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    handleCurrentChange(val) {
      if(this.page != val){
        this.page = val;
        this.getList();
      }
    },
    getList(bool) {

      if (bool) {
        this.searchParams = {... this.searchData};
        this.searchParams.apply_time_start = this.show_apply_time_start ? formattDate(this.show_apply_time_start) : '';
        this.searchParams.apply_time_end = this.show_apply_time_end ? formattDate(this.show_apply_time_end) : '';
        this.searchParams.cancel_time_start = this.show_cancel_time_start ? formattDate(this.show_cancel_time_start) : '';
        this.searchParams.cancel_time_end = this.show_cancel_time_end ? formattDate(this.show_cancel_time_end) : '';
        this.searchParams.cancel_deadline_start = this.show_cancel_deadline_start ? formattDate(this.show_cancel_deadline_start) : '';
        this.searchParams.cancel_deadline_end = this.show_cancel_deadline_end ? formattDate(this.show_cancel_deadline_end) : '';
        this.totalPage=1;
        this.currentPage= 1;
        this.page=1;
      }else{
        this.searchData = {... this.searchParams};
        this.show_apply_time_start = this.searchParams.apply_time_start;
        this.show_apply_time_end = this.searchParams.apply_time_end;
        this.show_cancel_time_start = this.searchParams.cancel_time_start;
        this.show_cancel_time_end = this.searchParams.cancel_time_end;
        this.show_cancel_deadline_start = this.searchParams.cancel_deadline_start;
        this.show_cancel_deadline_end = this.searchParams.cancel_deadline_end;
      }

      this.searchParams.page = this.page;

      getContractNumberList1({
        params: {data: this.searchParams},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.status_list=data.data.status_list;
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.page_index;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
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
