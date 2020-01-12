<!--D:\files\repo\bom\application\index\view\dev\src\components\finace\bill\tuan-bill-list.vue-->
<template>
  <div class="wrapper">
    <!-- <div class="system-tab">
			<ul class="tab-box">
        调账审批移到系统管理-审批单 <router-link :to='{path: "/accountAdjustment"}' tag='li'>调账审批（{{not_verify_count}}）</router-link>
        <li class="on">团队账单</li>
			</ul>
		</div> -->
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range :label="'返回日期'" v-model="backDate" @change="handleChangeBackDate"/>
      <search-item-date-range :label="'封团日期'" v-model="lockDate" @change="handleChangeLockDate"/>
      <div class="search-item">
        <div class="label">团队状态</div>
        <el-select v-model="searchData.status" placeholder="请选择">
          <el-option label="全部" value="0"/>
          <el-option label="未出团" value="1"/>
          <el-option label="已出团" value="2"/>
          <el-option label="已回团" value="3"/>
          <!-- <el-option label="已封团" value="4"></el-option> -->
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">锁团状态</div>
        <el-select v-model="searchData.lock_status" placeholder="请选择">
          <el-option label="全部" value="-1"/>
          <el-option label="已锁团" value="1"/>
          <el-option label="未锁团" value="0"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">团号</div>
        <el-input v-model="searchData.tuan_no" placeholder="团号"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" class="el-table--middle" border style="width: 100%">
            <el-table-column prop="tuan_name" label="团号/产品名称" header-align="center" align="left" width="360" :resizable="false">
              <template slot-scope="scope">
                <div :title="scope.row.product_name" style="width:360px;overflow:hidden;">
                  <p class="ellipsis">{{ scope.row.tuan_no }}</p>
                  <p class="ellipsis">{{ scope.row.product_name }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="product_large_type" label="产品类别" align="center" width="140" :resizable="false"/>
            <el-table-column prop="back_date" label="返回日期" align="center" width="100" :resizable="false"/>
            <el-table-column prop="lock_date" label="封团日期" align="center" width="100" :resizable="false"/>
            <el-table-column label="应收金额" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.rmb_receipt_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="已收金额" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">￥{{ scope.row.rmb_receipted_amount }}</template>
            </el-table-column>
            <el-table-column label="应付金额" header-align="center" align="right" width="100" :resizable="false">
              <template slot-scope="scope">
                <span class="color-orange">{{ scope.row.rmb_pay_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="已付金额" align="right" width="100" :resizable="false">
              <template slot-scope="scope">￥{{ scope.row.rmb_payed_amount }}</template>
            </el-table-column>
            <el-table-column label="计调人员" align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.op_name">{{ scope.row.op_name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="账单操作" align="center" width="100" fixed="right">
              <template slot-scope="scope">
                <div v-show="scope.row.lock_status==1">
                  <div class="switch">
                    <el-switch
                      v-model="scope.row.lock_fund"
                      @change="lockFinanceStatusChange(scope.row)"
                      :width="75"
                      active-text="已锁账"
                      inactive-text="未锁账"
                      :active-value="1"
                      :inactive-value="0"
                      active-color="#666"
                      off-color="#b10c79"
                      :disabled="!$menuPermission('settlement/tuanac/lockfund')"/>
                  </div>
                </div>
                <div v-show="scope.row.lock_status==0">--</div>

              </template>
            </el-table-column>
            <!-- 待替换链接 -->
            <el-table-column label="操作" align="center" fixed="right" width="60">
              <template slot-scope="scope">
                <router-link v-if="$menuPermission('settlement/tuanac/gettuanac/gachandet')" :to="{path:'detail',query:{id:scope.row.a_id,type:constDataConfigType}}">查看</router-link>
                <span v-else>--</span>
                <!-- <template>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      查看<i class="el-icon-caret-bottom el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><router-link :to="{path: `tourists/${scope.row.a_id}/${constDataConfigType}`}">游客名单</router-link></el-dropdown-item>
                      <el-dropdown-item><router-link :to="{path:'orders',query:{id:scope.row.a_id,lock_status:scope.row.lock_status,type:constDataConfigType}}">所有订单</router-link></el-dropdown-item>
                      <el-dropdown-item><router-link :to="{path: `records/${scope.row.a_id}/${constDataConfigType}`}">操作记录</router-link></el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('settlement/tuanac/gettuanac/gachandet')" >
                        <router-link :to="{path:'detail',query:{id:scope.row.a_id,type:constDataConfigType}}">团队账单</router-link>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <!--锁账提示-->
    <el-dialog title="操作提示" :visible.sync="dialogFundVisible" size="tiny">
      <span>锁账后，将无法对团队账单（成本收入）进行操作，且锁账后只有财务有权限进行解锁，是否确认锁账？</span>
      <span slot="footer">
        <el-button @click="dialogFundVisible =false">取 消</el-button>
        <el-button type="primary" @click=" lockFinanceFn">确 定</el-button>
      </span>
    </el-dialog>
    <!--解账提示-->
    <el-dialog title="操作提示" :visible.sync="dialogFundUnlockVisible" size="tiny">
      <span>已锁账单不能解锁</span>
      <span slot="footer">
        <!-- <el-button @click="dialogFundUnlockVisible =false">取 消</el-button>
        <el-button type="primary" @click="unlockFinanceFn">确 定</el-button> -->
        <el-button type="primary" @click="dialogFundUnlockVisible =false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import { tuanBillList, tuanLockAction, tuanUnlockAction ,financeLockAction, financeUnlockAction} from 'src/api/api'
// import {adjustmentList} from 'src/api/finance';  // 调账审批移到系统管理-审批单
import * as format from 'src/utils/format';
export default {
  name: 'settlementTuanBillList',
  components: {
    SearchItemDateRange
  },
  data() {
    return {
      isscope:null,
      flager:0,     // 解锁团是否已请求后台标识
      dialogFundVisible:false,
      dialogFundUnlockVisible:false,
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      searchDataOrigin: {
        tuan_no:'',
        lock_status: '-1',
        status:''
      },
      searchData: {
        tuan_no:'',
        back_date_start:'',
        back_date_end:'',
        lock_date_start:'',
        lock_date_end:'',
        lock_status: '-1',
        status:'',
      },
      backDate: ['', ''],
      lockDate: ['', ''],
      tableData: [],
      not_verify_count: 0,
      // 财务团队账单里面链接跳转的参数均为0
      constDataConfigType: 0
    }
  },
  watch: {
    'dialogFundVisible': {
      handler(val) {
        if (!val && !this.flager) {
          this.isscope.lock_fund = 0;
        }
      },
      deep: true
    },
    'dialogFundUnlockVisible': {
      handler(val) {
        if (!val && !this.flager) {
          this.isscope.lock_fund = 1;
        }
      },
      deep: true
    }
  },
  methods: {
    handleChangeBackDate(date) {
      this.searchData.back_date_start = date[0];
      this.searchData.back_date_end = date[1];
    },
    handleChangeLockDate(date) {
      this.searchData.lock_date_start = date[0];
      this.searchData.lock_date_end = date[1];
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    goto(path, query) {
      this.$router.push({
        path: path,
        query: query
      });
    },
    getList(bool) {

      let params = {
        data: this.searchData
      };



      if (bool) {
        this.totalPage=1;
        this.currentPage= 1;
        this.page=1;
        this.searchDataOrigin.tuan_no = this.searchData.tuan_no || '';
        this.searchDataOrigin.lock_status = this.searchData.lock_status || '';
        this.searchDataOrigin.status = this.searchData.status || '';
      }else{
        this.searchData.tuan_no = this.searchDataOrigin.tuan_no;
        this.searchData.lock_status = this.searchDataOrigin.lock_status;
        this.searchData.status = this.searchDataOrigin.status;
        this.back_date_start = this.searchData.back_date_start;
        this.back_date_end = this.searchData.back_date_end;
        this.lock_date_start = this.searchData.lock_date_start;
        this.lock_date_end = this.searchData.lock_date_end;
      }

      params.data.page = this.page;
      tuanBillList({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.page_index;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    lockFinanceStatusChange(scope){
      this.isscope = scope;
      this.flager = 0;
      if (scope.lock_fund_name == 'unlock_fund') {//从未锁账变锁账
        this.dialogFundVisible = true;
        // this.lockFinanceFn(scope);

      } else {//从锁账变未锁账
        // this.unlockFinanceFn(scope);
        this.dialogFundUnlockVisible = true;
      }
    },
    // 解锁账
    unlockFinanceFn(scope) {
      let para = {};
      para.data = {};
      para.data.id =this.isscope.id;

      financeUnlockAction({
        params: para,
        success: (res) => {
          let {code,msg,data}=res.data;
          this.flager = 1;
          this.dialogFundUnlockVisible=false;
          if(code=='0'){
            this.$set(this.isscope,'lock_fund_name','unlock_fund');
            this.$set(this.isscope,'lock_fund',0);
            this.$message.success(msg);
          }else{
            this.$message.error(msg);
            this.$set(this.isscope,'lock_fund',1);
          }
        },
        showLoading: true
      });
    },
    // 锁账
    lockFinanceFn() {
      let para = {};
      para.data = {};
      para.data.id =this.isscope.id;

      financeLockAction({
        params: para,
        success: (res) => {
          let {code,msg,data}=res.data;
          this.dialogFundVisible = false;
          this.flager = 1;
          if(code=='0'){
            this.$set(this.isscope,'lock_fund_name','lock_fund');
            this.$set(this.isscope,'lock_fund',1);
            this.$message.success(msg);
          }else{
            this.$message.error(msg);
            this.$set(this.isscope,'lock_fund',0);
          }
        },
        showLoading: true
      });
    },
    lockTuanAction(param) {
      let params = {
        data: {
          id: param.id
        }
      };

      if (param.lock_status == 0) {

        tuanUnlockAction({
          params: params,
          success: (params) => {
            let data = params.data;

            if (data.code == '0') {
              this.$message.success(data.msg);

            } else {
              this.$message.error(data.msg);
              param.lock_status =1;
            }

          },
          showLoading: true
        });
      } else {
        tuanLockAction({
          params: params,
          success: (params) => {
            let data = params.data;

            if (data.code == '0') {
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
              param.lock_status =0;
            }

          },
          showLoading: true
        });
      }

    },
    // adjustmentList() {
    //   let params = {
    //     data: {}
    //   };
    //   adjustmentList({
    //     params,
    //     success: (res) => {
    //       let result = res.data;
    //       if (result.code === 0) {
    //         this.not_verify_count = result.data.not_verify_count;
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: result.msg
    //         });
    //       }
    //     },
    //     showLoading: true
    //   })
    // },
  },
  mounted() {
    this.getList();
    // this.adjustmentList();
  }
}
</script>

<style scoped lang="scss">
.record-title {
  display: block;
  margin: 20px 0;
  text-align: left;
  font-size: 14px;

  th {
    color: #777;
  }
  td {
    padding-right: 20px;
    font-size: 18px;
    color: #555;
  }
}

.list {
  .table-title {
    height: 36px;
    margin: 16px 0 10px 0;

    .total {
      display: inline-block;
      line-height: 36px;
      font-size: 14px;
      .total-receive {
        font-size: 16px;
        color: #00CC00;
      }
      .total-pay {
        font-size: 16px;
        color: #FF9900;
        margin-right: 20px;
      }
    }

    .btn-areas {
      float: right;
    }
  }
}

.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
</style>
