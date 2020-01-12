<template>
	<div  class="wrapper">
		<!-- system-search -->
		<div class="system-search">
      <search-item-date-range v-model="calendarDate" label="申请日期"/>
			<div class="search-item">
				<div class="label">退款状态</div>
        <el-select v-model="searchData.status" placeholder="请选择">
          <el-option value='' label='全部' />
          <el-option v-for="(o,i) in allData.refund_status_arr"
            :key="i"
            :label="o"
            :value="i" />
        </el-select>
			</div>
			<div class="search-item">
				<div class="label">订单号</div>
				<el-input v-model="searchData.order_no" placeholder="商家订单号" />
			</div>
			<div class="search-item">
				<div class="label">退款单号</div>
				<el-input v-model="searchData.refund_no" placeholder="退款订单号" />
			</div>
			<div class="search-item">
				<div class="label">退款对象</div>
				<el-input v-model="searchData.distributor_org_name" placeholder="退款对象" />
			</div>
			<div class="search-item search-button">
				<el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
			</div>
		</div>
		<!-- /system-search -->
		<div class="system-content">
			<div class="content-list">
				<el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
					<el-table-column label="申请日期"
            header-align="center"
						align="center"
						width="150"
            :resizable="false">
						<template slot-scope="scope">
              {{scope.row.create_time}}
						</template>
					</el-table-column>
					<el-table-column
						label="退款单号"
            header-align="center"
						align="center"
            width="180"
						:resizable="false">
						<template slot-scope="scope">
              {{scope.row.refund_no}}
						</template>
					</el-table-column>
          <el-table-column
            label="订单号"
            header-align="center"
            align="center"
            width="200"
            :resizable="false">
            <template slot-scope="scope">
              <template v-if="scope.row.order_type == 1">
                <template v-if="$menuPermission('settlement/refunddeal/getrefunddet')">
                  <span class="slink"
                    @click="goOrderDetail(scope.row)">
                    {{scope.row.order_no}}
                  </span>
                </template>
                <template v-else>{{scope.row.order_no}}</template>
              </template>
              <template v-else>{{scope.row.order_no}}</template>
            </template>
          </el-table-column>
          <el-table-column
            label="退款对象"
            header-align="center"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
              {{scope.row.distributor_org_name}}
            </template>
          </el-table-column>
          <el-table-column
            label="实际退款金额"
            header-align="center"
            align="right"
            width="140"
            :resizable="false">
            <template slot-scope="scope">
              <span class="col-orange">{{scope.row.real_refund_amount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="财务退款状态"
            header-align="center"
            align="center"
            width="110"
            :resizable="false">
            <template slot-scope="scope">
              <template v-if="scope.row.status == 1">
                未处理
              </template>
              <template v-else>
                <span class="col-green">已处理</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="操作人"
            header-align="center"
            align="center"
            min-width="120"
            :resizable="false">
            <template slot-scope="scope">
              {{scope.row.user_name}}
            </template>
          </el-table-column>
					<el-table-column label="操作" align="center" width="100"  fixed="right" :resizable="false">
						<template slot-scope="scope">
              <template v-if="!isShowOperate(scope.row.edit_arr_fin, scope.row)">--</template>
              <el-dropdown v-else trigger="click" @command="handleOperate">
                <span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <template v-for="(edit, i) in scope.row.edit_arr_fin">
                    <el-dropdown-item
                      v-if="isShowOperate(edit, scope.row)"
                      :key="i"
                      :command="{edit, data:scope.row}">
                      <span class="bk">
                        {{scope.row.edit_arr[edit]}}
                      </span>
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
        :current-page="pagination.currentPage"
				:total="pagination.totalCount"
        :page-size="pagination.size">
			</el-pagination>
		</div>
    <el-dialog title="处理退款" :visible.sync="dialogVisibleTuankuan" :close-on-click-modal="false">
      <div class="form-content">
        <p class="tuankuanTxt">
          您确定已转账退款给买家？
        </p>
        <el-form :model="formTuankuan">
          <el-form-item label="备注"
            label-width="100px"
            style="margin-right: 30px">
            <el-input v-model="formTuankuan.remark"
              type="textarea"
              :autosize="{minRows:4, maxRows: 8}"
              placeholder="请输入备注信息"
              auto-complete="off" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="foot-btn">
        <el-button @click="dialogVisibleTuankuan = false">取 消</el-button>
        <el-button type="primary" @click="tuankuanSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="查看备注" :visible.sync="dialogVisibleRemark" :close-on-click-modal="false">
      <div class="form-content">
        <p class="tuankuanTxt">
          您已确认转账退款给买家<br />
          备注：
          <template v-if="remarkTxt == ''">
            无
          </template>
          <template v-else>
            {{remarkTxt}}
          </template>
        </p>
      </div>
    </el-dialog> -->
    <el-dialog title="处理退款" :visible.sync="dialogVisibleRemark" center width="30%">
      <div class="form-content">
        <p class="tuankuanTxt">
          应退金额：<span>{{amount.real_refund_amount}}</span><br />
          确认后，退款将原路退回付款人账户，请确认微信、支付宝收款账户余额充足
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleRemark = false">取 消</el-button>
          <el-button type="primary" @click="getOnlineRefundOrde">确 定</el-button>
        </span>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import { getRefundList, refundOrder, getRefundOrderRemark, getOnlineRefundOrde }from 'src/api/finance';
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';

export default {
  name: 'refundList',
  data () {
    return {
			searchDataOrigin: {
        start_time: '',
        end_time: '',
        status: '',
        refund_no: '',
        order_no: '',
        distributor_org_name: '',
        page: 1
			},
			searchData: {
        start_time: '',
        end_time: '',
        status: '',
        refund_no: '',
        order_no: '',
        distributor_org_name: '',
        page: 1
      },
      calendarDate: ['',''],
      allData: {},
      tableData: [],
      pagination:{
        currentPage: 1,
        totalCount: 0,
        totalPage: 0,
        size: 10
      },
			pageShow: false,
      dialogVisibleTuankuan: false,
      formTuankuan:{
        id: '',
        remark: ''
      },
      dialogVisibleRemark: false,
      remarkTxt: '',//备注
      amount:{
        real_refund_amount:'',//金额
        order_type:'',//类型
        refund_no:'',//编号
      }
		}
  },
  computed:{},
  components: {
    SearchItemDateRange
  },
  methods:{
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchData.start_time = this.calendarDate[0];
        this.searchData.end_time = this.calendarDate[1];
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
        this.calendarDate = [this.searchData.start_time, this.searchData.end_time];
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }
      getRefundList({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.allData = data;
            this.tableData = data.data;
            this.pagination.currentPage = data.page_index;
            this.pagination.totalCount = data.total_count;
            this.pagination.totalPage = data.total_page;
            this.pageShow = data.total_page > 1 ? true : false;
            this.tableData.forEach(v=>{
              let tmpx = [];
              for(let i in v.edit_arr){
                tmpx.push(Number(i));
              }
              v.edit_arr_fin = tmpx;
            });
          }else{
            this.$message.error(msg);
          }
        }
      });
    },
    handleCurrentChange(val){
      this.searchDataOrigin.page = val;
      this.handleSearch();
    },
    isShowOperate(edit, data) {
      if (Array.isArray(edit)) {
        return edit.some(e => this.isShowOperate(e, data));
      }
      switch (edit) {
      case 1: 
        return this.$menuPermission('settlement/refunddeal/getrefunddet');
      case 2:
        return this.$menuPermission('settlement/refunddeal/dealrefund');
      case 3:
        return this.$menuPermission('settlement/refunddeal/getremark');
      default:
        return false;
      }
    },
    handleOperate(cmd) {
      const {edit, data} = cmd;
      switch (edit) {
      case 1:
        this.goOrderRefund(data);
        break;
      case 2:
        this.handleTuankuan(data.id);
        break;
      case 3:
        this.handleRemark(data.id, data.order_type, data.refund_no);
        break;
      default:
        return true;
      }
    },
    goOrderDetail(row){
      switch(row.order_type){
        // order_type | 订单类型 1线路 2门票 3机票  4酒店  5火车票  6农特优 7签证
        case 1:
          this.goto('/settlement/line/order-detail/'+row.tuan_id+'/'+row.order_id);
          break;
        case 2:
          this.goto('/settlement/ticket/order-detail/',{order_id:row.order_no});
          break;
        case 3:
          this.goto('/settlement/flight/order-detail/',{order_id:row.order_no});
          break;
        case 4:
          this.goto('/settlement/hotel/order-detail/',{orderId:row.order_no});
          break;
        case 5:
          this.goto('/settlement/train/order-detail/',{orderNo:row.order_no});
          break;
        case 6:
          this.goto('/settlement/lproduct/order-detail/',{order_id:row.order_no});
          break;
        case 7:
          this.goto('/settlement/visa/order-detail/',{order_id:row.order_no});
          break;
      }
    },
    goOrderRefund(row){
      switch(row.order_type){
        // order_type | 订单类型 1线路 2门票 3机票  4酒店  5火车票  6农特优 7签证
        case 1:
          this.goto('/settlement/line/order-refund',{ono:row.order_no});
          break;
        case 2:
          this.goto('/settlement/ticket/order-refund',{order_id:row.order_no});
          break;
        case 3:
          this.goto('/settlement/flight/order-refund',{order_id:row.order_no});
          break;
        case 4:
          this.goto('/settlement/hotel/order-refund',{orderId:row.order_no});
          break;
        case 5:
          this.goto('/settlement/train/order-refund',{orderNo:row.order_no});
          break;
        case 6:
          this.goto('/settlement/lproduct/order-refund',{order_id:row.order_no});
          break;
        case 7:
          this.goto('/settlement/visa/order-refund',{order_id:row.order_no});
          break;
      }
    },
    handleTuankuan(idx){
      this.dialogVisibleTuankuan = true;
      this.formTuankuan.id = idx;
    },
    tuankuanSave(){
      let params = {
        data: this.formTuankuan
      }
      refundOrder({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.$message.success(msg);
            this.dialogVisibleTuankuan = false;
            this.handleSearch();
          }else{
            this.$message.error(msg);
          }
        }
      });
    },
    handleRemark(idx, order_type, refund_no){
      let params = {
        data: {
          id: idx
        }
      }
      getRefundOrderRemark({
        params:params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.dialogVisibleRemark = true;      
            this.remarkTxt = data.remark;
            this.amount.real_refund_amount = data.real_refund_amount;
            this.amount.order_type = order_type;
            this.amount.refund_no = refund_no;
          }else{
            this.$message.error(msg);
          }
        }
      });
      
    },
    getOnlineRefundOrde(){
      this.dialogVisibleRemark = false;
      let params = {
        data: {
          order_type: this.amount.order_type,
          refund_no: this.amount.refund_no
        }
      }
      getOnlineRefundOrde({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.amount.real_refund_amount = '';
            this.amount.order_type = '';
            this.amount.refund_no = '';
            this.handleSearch();
          }else{
            this.$message.error(msg);
          }
        }
      })
    },
  },
  mounted(){
    this.handleSearch();
  }
}
</script>

<style lang="scss">
	.fund-settlement-table .el-table__row:first-child{
		font-weight: bold;
	}
</style>
<style lang="scss" scoped>
  .configureForm-content {
    .el-form {
      .el-input {
        width: 80%;
      }
      .el-form-item {
        margin-bottom: 15px;
      }
    }


    .formTip {
      color: #999;
      padding-left: 38px;
      line-height: 1.5;
      &>div {
        display: inline-block;
      }
    }
  }

  .tip {
    color: #999;
    margin-top: 15px;
  }
  .max-w250 {
    max-width: 250px;
  }
  .col-green{
    color: #019f3d;
  }
  .col-orange{
    color: #f60;
  }
  .tuankuanTxt{
    margin: 0 0 15px 15px;
    line-height: 25px;
  }
  .bk{
  display: block;
  }
</style>
