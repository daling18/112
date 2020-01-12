<template>
<div class="wrapper">
  <div class="system-content">
    <div class="table-title no-border" v-if="imComeData.tuan_info">
      <div class="title">
        <span class="color-purple">【{{imComeData.tuan_info.tuan_no}}】</span>
        {{imComeData.tuan_info.tuan_name}}</div>
      <table class="desc">
          <tr>
            <th>出发城市</th>
            <td colspan="3">{{ imComeData.tuan_info.departure_city }}</td>
          </tr>
          <tr>
            <th>出发日期</th>
            <td>{{ imComeData.tuan_info.departure_date}}</td>
            <th>返回日期</th>
            <td>{{imComeData.tuan_info.back_date}}</td>
          </tr>
        </table>
        <div class="btn-areas">
          <el-button type="primary"  @click="goto()">查看行程</el-button>
          <el-button @click="goto()">打印行程</el-button>
        </div>
    </div>
  </div>
  <div class="system-content">
    <div class="search-content">
      <div class="clearfix">
        <el-col :span="17" class="search-item">
          应收：<span class="color-orange">&yen; </span><span class="color-orange">{{imComeData.rmb_total_amount}}</span>
          &nbsp;&nbsp;
        </el-col>
      </div>
    </div>
    <div class="content-list">
      <div class="mode-table">
          <el-table v-if="imComeData.lists" :data="imComeData.lists.data" border style="width: 100%">
            <el-table-column prop="id" 
              label="应收ID" 
              align="center" 
              width="80" 
              :resizable="false">
            </el-table-column>
            <el-table-column prop="bill_type_name" 
              label="收入类型" 
              align="center" 
              width="80" 
              :resizable="false">
            </el-table-column>
            <el-table-column prop="order_no" 
              label="订单编号" 
              align="center" 
              width="180" 
              :resizable="false">
            </el-table-column>
            <el-table-column prop="item_name" 
              label="项目名称" 
              header-align="center" 
              width="180" 
              :resizable="false">
            </el-table-column>
            <el-table-column prop="" 
              label="应收" 
              header-align="center" 
              align="right" 
              width="80" 
              :resizable="false">
              <template slot-scope="scope">
                <p class="color-orange">
                  &yen;{{scope.row.rmb_total_amount}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="" 
              label="已收" 
              header-align="center" 
              align="right" 
              width="80" 
              :resizable="false">
              <template slot-scope="scope">
                &yen;{{scope.row.rmb_receipted_amount}}
              </template>
            </el-table-column>
            <el-table-column prop="distributor_org_name" 
              label="直客/代理商(结算方)" 
              header-align="center" 
              min-width="250" 
              :resizable="false">
            </el-table-column>
            <el-table-column prop="" 
              label="单价" 
              align="center" 
              width="80" 
              :resizable="false">
              <template slot-scope="scope">
                <p class="lh20">
                  {{scope.row.currency}}<br />
                  {{scope.row.rmb_unit_price}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="currency_rate" 
              label="转换汇率" 
              align="center" 
              width="80" 
              :resizable="false">
            </el-table-column>
            <el-table-column prop="num" 
              label="数量" 
              align="center" 
              width="60" 
              :resizable="false">
            </el-table-column>
            <el-table-column prop="" 
              label="操作" 
              align="center" 
              width="120" 
              :resizable="false">
              <template slot-scope="scope">
                <router-link :to="{path: '/control/income-detail', query:{bid: scope.row.id}}"
                  v-if="$menuPermission('api/tuan/op_income_info')">
                  查看收入
                </router-link>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
  </div>

  <!--工具条-->
  <div class="page">
    <el-pagination layout="prev, pager, next" @current-change="currentPageChange" :total="pagination.total_count" />
  </div>

</div>
</template>
<script>
  import {income_lists} from 'src/api/api_supplier';

  export default {
    components: { },
    filters: { },
    data() {
      return {
        id: this.$route.query.id,
        imComeData:{},
        pagination:{
          total_count:0,
          total_page: 0,
          page_size:15,
          page_index: 1,
        },
      }
    },
    computed: {
    },
    watch:{
    },
    methods: {
      initialize(){
        let para = {};
        para.data = {
          id: this.id,
          page: this.pagination.page_index
        }
        income_lists({
          params: para,
          success: (res) => {
            let asyncObj = res.data.data;
            this.imComeData = asyncObj;
            this.pagination.total_count = parseInt(asyncObj.lists.total_count,10);
            this.pagination.total_page = parseInt(asyncObj.lists.total_page,10);
            this.pagination.page_size = parseInt(asyncObj.lists.page_size,10);
            this.pagination.page_index = parseInt(asyncObj.lists.page_index,10);
          },
          showLoading: true,
        });
      },
      currentPageChange(val) {
        this.pagination.page_index = val;
        this.initialize();
      },
    },
    mounted() {
      this.initialize();
    }
  };
</script>

<style scoped lang="scss">
.search-content{
  margin-top: 10px;
  background: #fff;
  padding: 30px 15px 10px;
}
.search-item{line-height: 35px;}
.el-form-item{margin-bottom: 13px;}
.el-select{
  width: 100%;
}
.huobizu{
	padding: 1px 5px;
}
.mb0{
  margin-bottom: 0!important;
}

.fr{
  float: right;
}
.mr10{
  margin-right: 10px;
}
.mt-5{
  margin-top: -5px!important;
}
.mt-10{
  margin-top: -10px!important;
}
.oh{
  overflow: hidden;
}
.w100per{
  width: 100%;
}
</style>
