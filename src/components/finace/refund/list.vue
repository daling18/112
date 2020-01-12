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
				<el-input v-model="searchData.distributor_org_name" />
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
              <!-- order_type | string | 订单类型 1线路 2门票 3机票  4酒店  5火车票  6农特优 7签证 -->
              <router-link v-if="scope.row.order_type == 1"
                :to="{path:'/finace/refund/order-detail/'+scope.row.tuan_id+'/'+scope.row.order_id}">
               {{scope.row.order_no}}
              </router-link>
              <router-link v-else-if="scope.row.order_type == 2"
                :to="{path:'/finace/ticket-order/detail', query: {order_id: scope.row.order_no}}">
                {{scope.row.order_no}}
              </router-link>
              <router-link v-else-if="scope.row.order_type == 3"
                :to="{path:'/finace/fight-order/detail', query: {order_id: scope.row.order_no}}">
                {{scope.row.order_no}}
              </router-link>
              <router-link v-else-if="scope.row.order_type == 4"
                :to="{path:'/finace/hotel-order/detail', query: {orderId: scope.row.order_no}}">
                {{scope.row.order_no}}
              </router-link>
              <router-link v-else-if="scope.row.order_type == 5"
                :to="{path:'/finace/train-order/detail', query: {orderNo: scope.row.order_no}}">
                {{scope.row.order_no}}
              </router-link>
              <router-link v-else-if="scope.row.order_type == 6"
                :to="{path:'/finace/local-product-order/detail', query: {order_id: scope.row.order_no}}">
                {{scope.row.order_no}}
              </router-link>
              <router-link v-else-if="scope.row.order_type == 7"
                :to="{path:'/finace/visa-order/detail', query: {order_id: scope.row.order_no}}">
                {{scope.row.order_no}}
              </router-link>
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
							<el-dropdown trigger="click">
								<span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="(val,key,index) in scope.row.edit_arr" :key="index">
                    <template v-if="key == 1">
                      <!-- order_type | string | 订单类型 1线路 2门票 3机票  4酒店  5火车票  6农特优 7签证 -->
                      <router-link v-if="scope.row.order_type == 1"
                        :to="{path:'/finace/refund/tuituan-detail', query: {ono: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                      <router-link v-else-if="scope.row.order_type == 2"
                        :to="{path:'/finace/ticket-order/refund-detail', query: {order_id: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                      <router-link v-else-if="scope.row.order_type == 3"
                        :to="{path:'/finace/flight-order/refund', query: {order_id: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                      <router-link v-else-if="scope.row.order_type == 3"
                        :to="{path:'/finace/flight-order/refund', query: {order_id: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                      <router-link v-else-if="scope.row.order_type == 4"
                        :to="{path:'/finace/hotel-refund-detail', query: {orderId: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                      <router-link v-else-if="scope.row.order_type == 5"
                        :to="{path:'/finace/train-order-refund', query: {orderNo: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                      <router-link v-else-if="scope.row.order_type == 6"
                        :to="{path:'/finace/local-product-order/refund', query: {order_id: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                      <router-link v-else-if="scope.row.order_type == 7"
                        :to="{path:'/finace/visa-order/refund', query: {order_id: scope.row.order_no}}">
                        {{val}}
                      </router-link>
                    </template>
                    <span @click="handleTuankuan(scope.row.id)"
                      class="bk"
                      v-if="key == 2">
                      {{val}}
                    </span>
                    <span @click="handleRemark(scope.row.id)"
                      class="bk"
                      v-if="key == 3">
                      {{val}}
                    </span>
									</el-dropdown-item>
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
    <el-dialog title="查看备注" :visible.sync="dialogVisibleRemark" :close-on-click-modal="false">
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
    </el-dialog>
	</div>
</template>

<script>
import { getRefundList, refundOrder, getRefundOrderRemark }from 'src/api/finance';
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
        distributor_org_name: '直客',
        page: 1
			},
			searchData: {
        start_time: '',
        end_time: '',
        status: '',
        refund_no: '',
        order_no: '',
        distributor_org_name: '直客',
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
      remarkTxt: ''
		}
  },
  computed:{},
  components: {
    SearchItemDateRange
  },
  methods:{
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
    handleRemark(idx){
      this.dialogVisibleRemark = true;
      let params = {
        data: {
          id: idx
        }
      }
      getRefundOrderRemark({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if(code == 0){
            this.remarkTxt = data.remark;
          }else{
            this.$message.error(msg);
          }
        }
      });
    }
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
