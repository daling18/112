<template>
  <el-container>
    <el-main>
      <div class="system-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="申请时间">
            <el-date-picker
              :class="'date-picker'"
              v-model="createTime"
              type="daterange"
              :value-format="'yyyy-MM-dd'"
              start-placeholder="申请时间"
              end-placeholder="申请时间"
              @change="handleChangeCreateTime"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="退款单号">
            <el-input v-model="form.cancel_no" placeholder="退款单号"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="form.order_no" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="批发商">
            <el-input v-model="form.wholesaler_org_name" placeholder="批发商"></el-input>
          </el-form-item>
          <el-form-item label="订单来源">
            <el-select v-model="form.order_source">
              <el-option label="全部" value=""></el-option>
              <el-option label="云平台" value="1"></el-option>
              <el-option label="C端" value="2,3,4,5"></el-option>
              <el-option label="IOS" value="2"></el-option>
              <el-option label="安卓" value="3"></el-option>
              <el-option label="官网" value="4"></el-option>
              <el-option label="H5" value="5"></el-option>
              <el-option label="小程序" value="6"></el-option>
              <el-option label="收客小程序" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款状态">
            <el-select v-model="form.status">
              <el-option label="全部" value=""></el-option>
              <el-option label="待定损" value="1"></el-option>
              <el-option label="二次定损" value="2"></el-option>
              <el-option label="待确认" value="3"></el-option>
              <el-option label="待财务处理" value="4"></el-option>
              <el-option label="退团退款失败" value="5"></el-option>
              <el-option label="退团退款成功" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款方式">
            <el-select v-model="form.pay_type">
              <el-option label="全部" value=""></el-option>
              <el-option label="在线退款" value="2"></el-option>
              <el-option label="线下退款" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="form.page = 1;handleSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="system-content">
        <div class="content-list">
          <el-table :data="list" border style="width: 100%">
            <el-table-column label="申请时间"
              header-align="center"
              align="center"
              min-width="180"
              prop="create_time"
            >
            </el-table-column>
            <el-table-column
              label="退款/退团单号"
              header-align="center"
              align="center"
              min-width="150"
              prop="cancel_no"
            >
            </el-table-column>
            <el-table-column
              label="订单号"
              header-align="center"
              align="center"
              min-width="180"
              prop="order_no"
            >
            </el-table-column>
            <el-table-column
              label="订单来源"
              header-align="center"
              align="center"
              min-width="150"
              prop="order_source"
            >
            </el-table-column>
            <el-table-column
              label="实际退款金额"
              header-align="center"
              align="center"
              min-width="150"
              prop="refund_gold"
            >
            </el-table-column>
            <el-table-column
              label="退款状态"
              header-align="center"
              align="center"
              min-width="150"
              prop="status"
            >
            </el-table-column>
            <el-table-column
              label="退款方式"
              header-align="center"
              align="center"
              min-width="150"
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.pay_type }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="批发商"
              header-align="center"
              align="center"
              min-width="200"
              prop="wholesaler_org_name"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              header-align="center"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/settlement/v2/refund/detail',
                    query: {
                      order_no: scope.row.order_no,
                      cancel_no: scope.row.cancel_no
                    }
                  }">查看</router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
    <el-footer v-show="total_page">
      <Affix :offset-bottom="0">
        <el-pagination
          layout="total, prev, pager, next, jumper, sizes"
          :current-page="form.page"
          @current-change="handleCurrentChange"
          :page-count="total_page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="form.limit"
          @size-change="handleSizeChange"
          class="pagination"
        />
      </Affix>
    </el-footer>
  </el-container>
</template>

<script>
import Affix from 'src/components/template/common/affix';
import {
  lineOrderRefundList
} from 'src/api/settlementCenter'
export default{
  data () {
    const {
      query
    } = this.$route;
    return {
      createTime: [query.create_time_start || '', query.create_time_end || ''],
      form: {
        create_time_start: query.create_time_start || '',
        create_time_end: query.create_time_end || '',
        cancel_no: query.cancel_no || '',
        order_no: query.order_no || '',
        status: query.status || '',
        order_source: query.order_source || '',
        pay_type: query.pay_type || '',
        wholesaler_org_name: query.wholesaler_org_name || '',
        page: 1,
        limit: 10
      },
      list: null,
      total_page: 0
    }
  },
  components: {
    Affix
  },
  methods: {
    handleChangeCreateTime (date) {
      this.form.create_time_start = date && date[0] || '';
      this.form.create_time_end = date && date[1] || '';
    },
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    handleSearch(){
      let params = this.form
      lineOrderRefundList(params)
        .then(res => {
          let { code, data, msg } = res;
          if(code == 0){
            this.list = data.list
            this.total_page = data.total_page
          }else{
            this.$message.error(msg);
          }
        })
    },
    handleCurrentChange(val){
      this.form.page = val;
      this.handleSearch();
    },
    handleSizeChange (val) {
      this.form.limit = val;
      this.form.page = 1;
      this.handleSearch();
    }
  },
  mounted () {
    this.handleSearch()
  }
}
</script>

<style  scoped>
>>> .el-pager li{
  margin: 0px 5px;
}
>>> .el-pagination .btn-prev, .el-pagination .btn-next{
  margin: 0px 5px;
}
</style>
<style scoped lang="scss">
@import "src/assets/css/variables.scss";
.el-container,
.el-main, .el-footer {
  padding: 0;
}
.el-footer{
  height: 52px;
}
.pagination {
  // height: 52px !important;
  padding: 13px;
  background: $gray;
  text-align: right;
}
</style>
