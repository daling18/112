<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item calendar">
        <div class="label">出发日期</div>
        <el-date-picker 
          v-model="departure_date_start"
          type="date"
          placeholder="选择日期"
          :editable="false"
          :picker-options="datepickerOptions2"
        />
        <div class="label zhi">-</div>
        <el-date-picker 
          v-model="departure_date_end"
          type="date"
          placeholder="选择日期"
          :editable="false"
          :picker-options="datepickerOptions1"
        />
      </div>
      <!-- <div class="search-item">
        <div class="label">代理商</div>
        <el-input v-model="filters.distributor_org_name"
                  placeholder="请输入代理商名称"/>
      </div> -->
      <div class="search-item">
        <div class="label">目的地</div>
        <el-input v-model="filters.destination_city"
                  placeholder="请输入目的地"/>
      </div>
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="filters.order_no"
                  placeholder="请输入订单编号"/>
      </div>
      <div class="search-item">
        <div class="label">关键词</div>
        <el-input v-model="filters.keyword"
                  placeholder="请输入订单关键词"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="initPageFn(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <!-- system-content -->
    <div class="system-content">
      <div class="content-list">
        <el-button type="primary" class="btn" @click="bindBtn()">
          绑 定
        </el-button>
        <!-- mode-table -->
        <div class="mode-table">
          <el-table :data="tableList"
                    :reserve-selection="true"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="40"/>
            <el-table-column 
              label="出发日期/目的地"
              align="center"
              width="200">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.departure_date + ' / ' + scope.row.destination_city">
                  {{ scope.row.departure_date + ' / ' + scope.row.destination_city }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="团号/团队名称"
                             width="180"
                             header-align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.tuan_no }}</p>
                <p class="gray ellipsis">{{ scope.row.tuan_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="订单编号"
                             width="200"
                             align="center">
              <template slot-scope="scope">
                {{ scope.row.order_no }}
              </template>
            </el-table-column>
            <el-table-column label="订单金额(本位币)"
                             width="180"
                             align="right">
              <template slot-scope="scope">
                &yen;{{ scope.row.rmb_total_amount }}
              </template>
            </el-table-column>
            <el-table-column label="绑定状态"
                             align="center">
              <template slot-scope="scope">
                <span class="bind">
                  <template v-if="scope.row.contract_bind_status == 1">
                    已绑定合同
                  </template>
                  <template v-else>
                    未绑定合同
                  </template>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- /mode-table -->
      </div>
    </div>
    <!-- /system-content -->
    <!-- page -->
    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" :total="pagination.total_count" :page-size="pagination.page_size" @current-change="currentPageChange"/>
    </div>
    <!-- /page -->
    <!--绑定提示-->
    <el-dialog title="操作提示" :visible.sync="dialogVisible" size="tiny">
      <div class="dia-con">
        <p class="p1">确定将以下订单绑定合同{{ submitData.contract_no }}</p>
        订单号：
        <template v-for="(o,i) in multipleSelectionOrderNo">
          <i :key="i" v-if="i == multipleSelectionOrderNo.length-1">{{ o }}</i>
          <i :key="i" v-else>{{ o }},</i>
        </template>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
    <!--/绑定提示-->
  </div>
  <!-- /wrapper -->
</template>

<script>
import {
  getContractOrderList,
  contractBindOrderAdd1,
  contractBindOrderAdd2,
  contractBindOrderEdit1,
  contractBindOrderEdit2
} from 'src/api/api';
import {
  formattDate
} from 'src/assets/js/common.js';
export default {
  data() {
    return {
      type: '',
      typePre: '',
      menu: '',
      menuPre: '',
      status: '',
      filters: {
        departure_date_start: '',
        departure_date_end: '',
        distributor_org_name: '',
        destination_city: '',
        contract_no: this.$route.query.id,
        order_no: '',
        keyword: ''
      },
      filtersParams: {},
      submitData: {
        order_no_list: [],
        contract_no: this.$route.query.id
      },
      pageShow: false,
      pagination: {
        total_count: 0,
        total_page: 0,
        page_size: 15,
        page_index: 1
      },
      departure_date_start: '',
      departure_date_end: '',
      tableList: [],
      multipleSelection: [],
      multipleSelectionOrderNo: [],
      dialogVisible: false
    };
  },
  computed: {
    datepickerOptions2() {
      let tDate = this.departure_date_end;
      return {
        disabledDate(time) {
          return time.getTime() > new Date(tDate).getTime();
        }
      };
    },
    datepickerOptions1() {
      let tDate = this.departure_date_start;
      return {
        disabledDate(time) {
          return time.getTime() < new Date(tDate).getTime();
        }
      };
    }
  },
  mounted() {
    this.initPageFn(true);
  },
  methods: {
    initPageFn(bool) {
      if (bool) {
        this.filtersParams = {... this.filters};
        this.filtersParams.departure_date_start = this.departure_date_start
          ? formattDate(this.departure_date_start)
          : '';
        this.filtersParams.departure_date_end = this.departure_date_end
          ? formattDate(this.departure_date_end)
          : '';
        this.pagination = {
          total_count: 0,
          total_page: 0,
          page_size: 15,
          page_index: 1
        };
      }else{
        this.filters = {... this.filtersParams};
        this.departure_date_start = this.filtersParams.departure_date_start;
        this.departure_date_end = this.filtersParams.departure_date_end;
      }
      this.filtersParams.page = this.pagination.page_index;
      this.filtersParams.page_size = this.pagination.page_size;
      this.type = this.$route.query.type;
      this.menu = this.$route.query.menu;
      this.status = this.$route.query.status;
      this.type == 2 ? (this.typePre = 'head') : (this.typePre = 'branch');
      this.menu == 1 ? (this.menuPre = 'pulldown') : (this.menuPre = 'audit');
      getContractOrderList({
        params: {data: this.filtersParams},
        success: res => {
          if (res.data.code == 0) {
            let asyncObj = res.data.data;
            this.tableList = asyncObj.list;
            this.$nextTick(() => this.checked());
            this.pagination.total_count = asyncObj.total_count;
            this.pagination.total_page = asyncObj.total_page;
            this.pageShow = this.pagination.total_page > 0;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        },
        showLoading: true
      });
    },
    currentPageChange(val) {
      if(this.pagination.page_index != val){
        this.pagination.page_index = val;
        this.initPageFn();
      }
    },
    checked() {
      this.tableList.forEach((v, i, a) => {
        if (v.contract_bind_status == 1) {
          this.$refs.multipleTable.toggleRowSelection(v, true);
        }
      });
    },
    handleSelectionChange(v) {
      this.multipleSelection = v;
      this.multipleSelectionOrderNo = [];
      this.multipleSelection.forEach(v => {
        this.multipleSelectionOrderNo.push(v.order_no);
      });
    },
    bindBtn() {
      if (this.multipleSelectionOrderNo.length == 0) {
        this.$message.error('请先选择至少一项绑定');
      } else {
        this.dialogVisible = true;
      }
    },
    submitForm() {
      let para = {};
      para.data = this.submitData;
      para.data.order_no_list = this.multipleSelectionOrderNo;
      if (this.type == 2) {
        // this.status作为新增和修改的接口，先统一只用新增，以后要调整去掉多余的修改接口的
        contractBindOrderAdd2({
          params: para,
          success: res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push({
                path:
                  '/contract/' + this.menuPre + '/' + this.typePre + '-number',
                query: {
                  type: this.type,
                  menu: this.menu,
                  id: this.$route.query.aid
                }
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
      } else if (this.type == 1) {
        contractBindOrderAdd1({
          params: para,
          success: res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push({
                path:
                  '/contract/' + this.menuPre + '/' + this.typePre + '-number',
                query: {
                  type: this.type,
                  menu: this.menu,
                  id: this.$route.query.aid
                }
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
      }
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped lang="scss">
.gray {
  color: #9d9d9d;
}
.bind {
  color: #4c4c4c;
}
.btn {
  width: 125px;
  margin-bottom: 10px;
}
.dia-con i {
  font-style: normal;
  display: inline-block;
}
.p1 {
  margin-bottom: 5px;
}
</style>
