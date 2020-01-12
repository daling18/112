<template>
<!-- application\index\view\dev\src\components\plan\control\listLine.vue -->
  <div class="wrapper">
    <!-- system-tab -->
    <!-- <div class="system-tab">
      <ul class="tab-box">
        <router-link tag="li"
          class="on"
          to="/tuancontro/list-line">
          线路团控
        </router-link>
        <router-link tag="li"
          to="/control/list-line2"
          v-if="$menuPermission('tuancontro/single')">
          单项团控
        </router-link>
      </ul>
    </div> -->
    <!-- /system-tab -->
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range v-model="calDateDepart" label="出发日期" @change="handleChangeDateDepart" />
      <search-item-date-range v-model="calDateBack" label="返回日期" @change="handleChangeDateBack" />
      <div class="search-item">
        <div class="label">团号</div>
        <el-input v-model="searchData.tuan_no" placeholder="团号"></el-input>
      </div>
      <div class="search-item">
        <div class="label">产品编号</div>
        <el-input v-model="searchData.product_no" placeholder="产品编号"></el-input>
      </div>
      <div class="search-item">
        <div class="label">团队名称</div>
        <el-input v-model="searchData.tuan_name" placeholder="请输入关键字"></el-input>
      </div>
      <div class="search-item">
        <div class="label">团队状态</div>
        <el-select v-model="searchData.tuan_status" placeholder="请选择">
          <el-option label="全部" value="0"></el-option>
          <el-option label="未出团" value="1"></el-option>
          <el-option label="已出团" value="2"></el-option>
          <el-option label="已回团" value="3"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">锁团状态</div>
        <el-select v-model="searchData.lock_status" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="未锁团" value="0"></el-option>
          <el-option label="已锁团" value="1"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">锁账状态</div>
        <el-select v-model="searchData.lock_fund" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="未锁账" value="0"></el-option>
          <el-option label="已锁账" value="1"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">行程天数</div>
        <el-input v-model="searchData.trip_days"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="mode-table">
          <el-table class="el-table--middle"
            :data="tableList"
            tooltip-effect="light"
            style="width: 100%">
            <el-table-column
              label="团号/产品名称"
              min-width="340">
              <template slot-scope="scope">
                <p class="color-purple">
                  {{scope.row.tuan_no}}
                  <template v-if="scope.row.lock_fund_name=='unlock_fund'">
                    <span v-if="scope.row.remain_info != ''" class="tag tag-purple">{{scope.row.remain_info}}</span>
                  </template>
                  <span class="tag tag-gray" v-if="scope.row.lock_status || scope.row.lock_fund">{{scope.row.lock_fund ? '已锁账' : '已锁团'}}</span>
                </p>
                <p class="tuan_name" :title="scope.row.tuan_name">
                  <strong>{{scope.row.trip_days}}天</strong>
                  <span class="t">{{scope.row.tuan_name}}</span>
                  <span class="yu" v-if="scope.row.need_second_confirm == 0">余{{scope.row.remain_num}}</span>
                  <span class="ecqr" v-else>二次确认</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="团期报价"
              min-width="120"
              align="center">
              <template slot-scope="scope">
                <p class="tqbj">
                  &yen;{{scope.row.out_price}}
                  <span class="col-gray">/</span>
                  &yen;{{scope.row.peer_price}}
                </p>
                <p>{{scope.row.departure_date}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="计划位"
              width="80"
              align="center">
              <template slot-scope="scope">
                <template v-if="scope.row.need_second_confirm == 0">
                  <p>{{scope.row.plan_num}}</p>
                  <el-button v-if="$menuPermission('tuancontro/line/assignmentplannedlocation') && scope.row.is_change_num == 1 && scope.row.lock_status == 0" 
                    type="text" 
                    @click="plandlgShow(scope)">
                    修改
                  </el-button>
                </template>
                <span class="ecqr" v-else>二次确认</span>
              </template>
            </el-table-column>
            <el-table-column
              label="预订/确认位"
              width="120"
              align="center">
              <template slot-scope="scope">
                <p>预订：{{scope.row.reserve_num}}
                  <el-button v-if="scope.row.is_qingwei == 1" type="text" @click="dialogVisibleClean = true;clean_id=scope.row.id"> 清位</el-button>
                </p>
                <p>确认：{{scope.row.confirm_num}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="OP"
              prop="a_op_name"
              width="80"
              align="center"
              show-overflow-tooltip />
            <el-table-column
              label="团队状态"
              prop="status_name"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="160"
              align="center"
              fixed="right">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    操作
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(o,i) in scope.row.edit"
                      :key="i">
                      <!-- 1 +成本 -->
                      <router-link :to="{path:'/tuancontro/cost-add',query:{id: '',tuan_id:scope.row.id}}"
                        v-if="o == 1 && $menuPermission('tuancontro/line/costadd')">
                        {{allData.edit_arr[o]}}
                      </router-link>
                      <!-- 2 +收入 -->
                      <!-- <router-link :to="{path:'/tuancontro/income',query:{id:scope.row.a_id}}"
                        v-if="o == 2 && $menuPermission('tuancontro/line/incomelist')">
                        {{allData.edit_arr[o]}}
                      </router-link> -->
                      <p @click="incomeModify(scope)"
                        v-if="o == 2 && $menuPermission('tuancontro/line/incomeadd')">
                        {{allData.edit_arr[o]}}
                      </p>
                      <!-- 3 同步TDM订单 -->
                      <p @click.native="syncBmpOrder(scope)"
                        v-if="o == 3">
                        {{allData.edit_arr[o]}}
                      </p>
                      <!-- 4 解锁团队 -->
                      <p @click="lockStatusChange(scope)"
                        v-if="o == 4 && $menuPermission('tuancontro/line/unlockingregiment')">
                        {{allData.edit_arr[o]}}
                      </p>
                      <!-- 5 锁团  -->
                      <p @click="lockStatusChange(scope)"
                        v-if="o == 5 && $menuPermission('tuancontro/line/lockgroup')">
                        {{allData.edit_arr[o]}}
                      </p>
                      <!-- 6 解锁账单 7 锁账 -->
                      <p @click="lockFinanceStatusChange(scope.row)"
                        v-if="(o == 6 || o == 7) && $menuPermission('tuancontro/line/lockaccounts')">
                        {{allData.edit_arr[o]}}
                      </p>
                      <!-- 8 指派op -->
                      <p @click="showDialogOp(scope)"
                        v-if="o == 8 && $menuPermission('tuancontro/line/assignop')">
                        {{allData.edit_arr[o]}}
                      </p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click" 
                  v-if="$menuPermission('tuancontro/line/touristlist')
                  || $menuPermission('tuancontro/line/tuanorder')
                  || $menuPermission('tuancontro/line/oprec')
                  || $menuPermission('tuancontro/line/tuanacc')
                  || $menuPermission('tuancontro/line/recerec')
                  || $menuPermission('tuancontro/line/costlist')
                  || $menuPermission('tuancontro/line/incomelist')">
                  <span class="el-dropdown-link">
                    查看
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(o,i) in scope.row.look"
                      :key="i">
                      <!-- 1 游客名单 -->
                      <router-link :to="{name: 'TuancontroRecruiting', params:{id:scope.row.a_id,type:constDataConfigType}}"
                        v-if="o == 1 && $menuPermission('tuancontro/line/touristlist')">
                        {{allData.look_arr[o]}}
                      </router-link>
                      <!-- 2 所有订单 -->
                      <router-link :to="{path:'/tuancontro/tuan-list',query:{id:scope.row.a_id,lock_status:scope.row.lock_status,type:constDataConfigType}}"
                        v-if="o == 2 && $menuPermission('tuancontro/line/tuanorder')">
                        {{allData.look_arr[o]}}
                      </router-link>
                      <!-- 3 操作记录 -->
                      <router-link :to="{name:'tuancontroOperating', params:{id:scope.row.a_id,type:constDataConfigType}}"
                        v-if="o == 3 && $menuPermission('tuancontro/line/oprec')">
                        {{allData.look_arr[o]}}
                      </router-link>
                      <!-- 4 团队账单 -->
                      <router-link :to="{path:'/tuancontro/bill',query:{id:scope.row.a_id,type:constDataConfigType}}"
                        v-if="o == 4 && $menuPermission('tuancontro/line/tuanacc')">
                        {{allData.look_arr[o]}}
                      </router-link>
                      <!-- 5 收款记录 -->
                      <router-link :to="{path:'/tuancontro/receipt-list',query:{tuan_id: scope.row.id, aid:scope.row.a_id,data_config_type:constDataConfigType}}"
                        v-if="o == 5 && $menuPermission('tuancontro/line/recerec')">
                        {{allData.look_arr[o]}}
                      </router-link>
                      <!-- 6 成本列表 -->
                      <router-link :to="{path:'/tuancontro/cost',query:{id:scope.row.a_id}}"
                        v-if="o == 6 && $menuPermission('tuancontro/line/costlist')">
                        {{allData.look_arr[o]}}
                      </router-link>
                      <!-- 7 收入列表 -->
                      <router-link :to="{path:'/tuancontro/income',query:{id:scope.row.a_id}}"
                        v-if="o == 7 && $menuPermission('tuancontro/line/incomelist')">
                        {{allData.look_arr[o]}}
                      </router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!--工具条-->
    <div class="page" v-if="pagination.show">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handlePageChange"
        :current-page="pagination.currentPage"
        :total="pagination.totalCount"
        :page-size="pagination.size" />
    </div>

    <!--锁团提示-->
    <el-dialog title="操作提示" :visible.sync="dialogVisible" size="tiny">
      <span>锁团后，将无法对团队订单进行操作，是否确认锁团？ </span>
      <span slot="footer">
        <el-button @click="dialogVisible =false">取 消</el-button>
        <el-button type="primary" @click="lockGroupFn">确 定</el-button>
      </span>
    </el-dialog>
    <!--解锁团提示-->
    <el-dialog title="操作提示" :visible.sync="dialogTuanVisible" size="tiny">
      <span>是否确定解团？ </span>
      <span slot="footer">
        <el-button @click="dialogTuanVisible=false">取 消</el-button>
        <el-button type="primary" @click="unlockGroupFn">确 定</el-button>
      </span>
    </el-dialog>
    <!--锁账提示-->
    <el-dialog title="操作提示" :visible.sync="dialogFundVisible" size="tiny">
      <span>锁账后，将无法对团队账单（成本收入）进行操作，且锁账后只有财务有权限进行解锁，是否确认锁账？</span>
      <span slot="footer">
        <el-button @click="dialogFundVisible =false">取 消</el-button>
        <el-button type="primary" @click=" lockFinanceFn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="操作提示" :visible.sync="dialogFundUnlockVisible" size="tiny">
      <span>是否确定解账</span>
      <span slot="footer">
        <el-button @click="dialogFundUnlockVisible =false">取 消</el-button>
        <el-button type="primary" @click="unlockFinanceFn">确 定</el-button>
      </span>
    </el-dialog>
    <!--计划位修改-->
    <el-dialog title="操作提示" :visible.sync="planVisible" size="tiny" >
      <el-form :inline="true" :model="searchData">
        <el-form-item label="计划位">
          <el-input v-model="plan_num" placeholder="输入计划位数量" @change="handleChangeNumberInput('plan_num', $event)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="planVisible=false">取 消</el-button>
        <el-button type="primary" @click="plannumTodo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改op -->
    <el-dialog title="指派OP" :visible.sync="showOP" size="tiny" @close="hidedialogOp">
      <el-form>
        <el-form-item label="指派给" label-width="100px">
          <el-select clearable v-model="opuser_id" remote filterable :remote-method="assignOpList" class="width180" placeholder="">
            <el-option v-for="(item, index) in res_oplist" :key="index" :label="item.username" :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text-c">
          <el-button @click="hidedialogOp">取消</el-button>
          <el-button type="primary" @click="assignOp">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 清位 -->
    <el-dialog title="手动清位" :visible.sync="dialogVisibleClean" size="tiny">
      <span>确定清除所有位置，取消所有已占位订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleClean = false">取 消</el-button>
        <el-button type="primary" @click="cleanPlaces()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 收入弹窗 -->
    <el-dialog
      title="收入操作"
      :visible.sync="incomeVisible"
      :before-close="cancelDiagIncome"
      :close-on-click-modal="false">
      <el-form 
        :rules="rules" 
        :model="is_scope.bills_info"
        ref="incomeForm"
        label-width="160px"
        v-if="is_scope.bills_info"
        style="width:90%;"
      >
        <el-form-item label="直客／代理商" prop="distributor_org_name">
          <select-org v-model="orgination" placeholder="请选择直客或者代理商" :default-list="is_scope.org_info"/>
        </el-form-item>
        <el-form-item label="项目名称" prop="item_name">
          <el-input v-model="is_scope.bills_info.item_name" />
        </el-form-item>
        <el-form-item label="收入类型" prop="bill_type">
          <el-select placeholder="请选择" v-model="is_scope.bills_info.bill_type">
            <el-option
              v-for="(obj, key) in is_scope.bill_type"
              :key="key"
              :label="obj"
              :value="Number(key)"/>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <input-number  v-model="is_scope.bills_info.num" />
        </el-form-item>
        <el-form-item label="单价" required>
          <el-col :span="8">
            <el-form-item prop="unit_price">
              <input-number  v-model="is_scope.bills_info.unit_price" :precision="3" />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="huobizu">
            <currency-picker 
              v-model="is_scope.bills_info.currency"
              placeholder="选择货币"
              readonly="readonly"/>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="currency_rate">
              <input-number 	v-model="is_scope.bills_info.currency_rate" :precision="4" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- 合计 -->
        <el-form-item label="合计" class="mb0 item-lh">
          {{ (is_scope.bills_info.num * is_scope.bills_info.unit_price) | formatPrice }}     
          （公式：数量*单价）   
        </el-form-item>
        <el-form-item label="应收金额（本位币）">
          &yen;
          {{ (is_scope.bills_info.num * is_scope.bills_info.unit_price * is_scope.bills_info.currency_rate) | formatPrice }}
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea" v-model="is_scope.bills_info.remark" style="margin-top: 6px;" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="incomeConfirmGiveup('incomeForm')">取 消</el-button>
        <el-button type="primary" @click="incomeConfirm('incomeForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as format from 'src/utils/format';
import SelectOrg from 'src/plugins/SelectOrg.vue';
import {
  getGroupList,
  getSyncOrder,
	changePlanNum,
	cleanPlacesNum,
  setUnlockTuan,
  setLockTuan,
  changeLockTuan,
  financeLockAction,
  financeUnlockAction,
  getIncomeForm,
  setIncomeForm
} from 'src/api/api';
import {assignOpList, assignOp} from 'src/api/tuan'
import { formattDate} from 'src/assets/js/common.js'
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import InputNumber from 'src/plugins/InputNumber.vue';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
export default {
  data() {
    let validatePrice = (rule, value, callback) => {
      if (value && !/^\d+$|^(\d+\.?\d+)$/.test(value)) {
        callback(new Error('请输入正确的数值'));
      } else {
        callback();
      }
    };
    let limitMax = (rule, value, callback) => {
      if (value > 100000000) {
        callback(new Error('请输入小于100000000的数值'));
      }else{
        callback();
      }
    };
    let positiveInteger = (rule, value, callback) => {
      if(value.toString().indexOf('.') != -1){
        callback(new Error('请输入整数'))
      }else if(value.toString().indexOf('-') != -1){
        callback(new Error('请输入正数'))
      }else{
        callback();
      }
    };
    return {
      pageType: null,
      flag:0,     // 解锁团是否已请求后台标识
      flager:0,     // 解锁团是否已请求后台标识
      dialogFundVisible:false,
      dialogFundUnlockVisible:false,
      dialogVisible: false,
      dialogTuanVisible:false,
      dialogVisibleClean: false,
      planVisible: false,
      plan_num: '',
      row: {},
      isscope: '',
      clean_id: '',//清位id
      searchDataOrigin: {
        tuan_no: '',
        product_no: '',
        tuan_name: '',
        tuan_status: '',
        lock_status: '',
        lock_fund: '',
      },
      searchData: {
        tuan_no: '',
        product_no: '',
        tuan_name: '',
        tuan_status: '',
        lock_status: '',
        lock_fund: '',
      },
      calDateDepart: ['',''],
      calDateBack: ['',''],
      allData:{},
      tableList: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
        totalPage: 0,
        size: 10,
        show: false
      },
      showOP: false,
      opuser_id: '',
      tuan_id: '',
      res_oplist: [],
      constDataConfigType: null,
      incomeVisible: false,
      is_scope: {},
      scope: {},
      rules:{
        bill_type: [{ 
          type: 'number',
          required: true,
          message: '请选择收入类型',
          trigger: 'blur' 
        }],
        distributor_org_name: [{ 
          required: true,
          message: '请选择直客或代理商',
          trigger: 'blur' 
        }],
        currency_rate: [{ 
          type: 'number',
          required: true,
          message: '请输入汇率值',
          trigger: 'blur' 
        },{
          validator: validatePrice,
          trigger: 'change'
        }],
        total_amount: [{ 
          type: 'number',
          required: true,
          message: '请输入结算金额',
          trigger: 'blur' 
        }],
        item_type: [{ 
          type: 'number',
          required: true,
          message: '请选择项目类型',
          trigger: 'blur' 
        }],
        num: [{ 
          type: 'number',
          required: true,
          message: '请输入数量',
          trigger: 'blur' 
        },{
          validator: limitMax,
          trigger: 'change'
        },{
          validator: positiveInteger,
          trigger: 'change'
        }],
        unit_price: [{ 
          type: 'number',
          required: true,
          message: '请输入单价',
          trigger: 'blur' 
        },{
          validator: limitMax,
          trigger: 'change'
        },{
          validator: validatePrice,
          trigger: 'change'
        }],
        item_name: [{ 
          required: true,
          message: '请填入项目名称',
          trigger: 'blur' 
        }]
      },
    }
  },
  components: {
    SearchItemDateRange,
    SelectOrg,
    InputNumber,
    CurrencyPicker
  },
  filters: {
    formatPrice(price){
      const num = price || 0;

      return Number(format.toFixed(num, 3));
    },
  },
  computed:{
    orgination: {
      get: function() {
        let org = null;
        if(this.is_scope.bills_info.distributor_org_id){
          return {
            org_id: this.is_scope.bills_info.distributor_org_id, 
            org_name: this.is_scope.bills_info.distributor_org_name
          };
        }
        return org;
      },
      set: function(val) {
        val = val || {};

        this.is_scope.bills_info.distributor_org_id = val.org_id;
        this.is_scope.bills_info.distributor_org_name = val.org_name;
      }
    }
  },
  created: function(){
    // 链接页面跳转预存参数data_config_type里，单项为2，线路为3
    this.constDataConfigType = this.$route.name == 'ControlListline' ? 3 : 2;
  },
  watch: {
    'dialogVisible': {
      handler(val) {
        if (!val && !this.flag) {
          this.isscope.row.lock_status = 0;
        }
      },
      deep: true
    },
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
    },
    'dialogTuanVisible': {
      handler(val) {
        if (!val && !this.flag) {
          this.isscope.row.lock_status = 1;
        }
      },
      deep: true
    },
    'is_scope.bills_info.bill_type': {
      handler: function(e) {
        for(var i in this.is_scope.bill_type){
          if(e == i){
            this.is_scope.bills_info.bill_type_name = this.is_scope.bill_type[i];
          }
        }
      },
      deep: true
    }
  },
  methods: {
    handleChangeDateDepart(date){
      this.searchData.start_time = format.date(date[0]) || "";
      this.searchData.end_time = format.date(date[1]) || "";
    },
    handleChangeDateBack(date){
      this.searchData.back_start_time = format.date(date[0]) || "";
      this.searchData.back_end_time = format.date(date[1]) || "";
    },
    handleSearch(bool) {
      if(bool){
        this.searchData.page = 1;
        // this.searchData.start_time = this.calDateDepart[0];
        // this.searchData.end_time = this.calDateDepart[1];
        // this.searchData.back_start_time = this.calDateBack[0];
        // this.searchData.back_end_time = this.calDateBack[1];
        this.searchDataOrigin = {... this.searchData};
      } else {
        if(this.$route.query.tuan_no){
          this.searchDataOrigin.tuan_no = this.$route.query.tuan_no;
        }
        this.searchData = {...this.searchDataOrigin};
        this.calDateDepart = [this.searchData.start_time, this.searchData.end_time];
        this.calDateBack = [this.searchData.back_start_time, this.searchData.back_end_time];
      };
      this.$router.replace({query:this.searchData});
      let params = {
        data: this.searchData
      }
      getGroupList({
        params,
        success: (res) => {
          let {code,data,msg} = res.data;
          if(code == 0){
            this.allData = data;
            this.tableList = data.data;
            this.pagination.currentPage = data.page_index;
            this.pagination.totalCount = data.total_count;
            this.pagination.totalPage = data.total_page;
            this.pagination.show = data.total_page > 1 ? true : false;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handlePageChange(val) {
      this.searchDataOrigin.page = val;
      this.handleSearch();
    },
    // 计划位修改
    plandlgShow(scope) {
      this.planVisible = true;
      this.isscope = scope;
      this.plan_num = scope.row.plan_num;
    },
		// 清位
		cleanPlaces(){
			let para = {};
			para.data = {};
			para.data.tuan_id = this.clean_id;
			cleanPlacesNum({
				params: para,
				success: res => {
					let judge = parseInt(res.data.code, 10);
					if(judge === 0){
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
						this.planVisible = false;
						this.handleSearch();
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						});
          }
          this.dialogVisibleClean = false;
				}
			});
		},
    plannumTodo() {
      let para = {};
      para.data = {};
      para.data.id = this.isscope.row.id;
      para.data.plan_num = this.plan_num;

      if (this.plan_num >= 0) {
        changePlanNum({
          params: para,
          success: (res) => {
            let judge = parseInt(res.data.code, 10);

            if(judge === 0){
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.planVisible = false;
              this.handleSearch();
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        });
      } else {
        this.$message({
          message: '计划位不可为负',
          type: 'error'
        });
      }

    },
    syncBmpOrder(scope) {

      let para = {};
      para.data = {};
      para.data.product_id = scope.row.product_id;
      para.data.product_group_id = scope.row.product_group_id;
      para.data.product_large_type=scope.row.product_large_type;

      getSyncOrder({
        params: para,
        success: (res) => {
          let judge = parseInt(res.data.code, 10);
          console.log(judge)
          this.$message({
            message: res.data.msg,
            type: judge === 0 ? 'success' : 'error'
          });
          this.handleSearch();
        },
        showLoading: true
      });

    },
    // 锁账操作
    lockFinanceStatusChange(scope){
      this.isscope = scope;
      this.flager = 0;
      if (scope.lock_fund_name == 'unlock_fund') {//从未锁账变锁账
        this.dialogFundVisible = true;
        console.log('未')
        // this.lockFinanceFn(scope);

      } else {//从锁账变未锁账
        // this.unlockFinanceFn(scope);
        this.dialogFundUnlockVisible = true;
      }
    },
    // 解锁账
    unlockFinanceFn() {
      let para = {};
      para.data = {};
      para.data.id =this.isscope.id;

      financeUnlockAction({
        params: para,
        success: (res) => {
          let {code,msg,data}=res.data;
          this.flager = 1;
          this.dialogFundUnlockVisible = false;
          if(code=='0'){
            this.$set(this.isscope,'lock_fund_name','unlock_fund');
            this.$set(this.isscope,'lock_fund',0);
            this.$message.success(msg);
            this.handleSearch();
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
      para.data.id =this.isscope.a_id;

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
            this.handleSearch();
          }else{
             this.$message.error(msg);
            this.$set(this.isscope,'lock_fund',0);
          }
        },
        showLoading: true
      });
    },
    // 锁团操作
    lockStatusChange(scope) {
      this.row = scope.row;
      this.isscope = scope;
      this.flag = 0;

      if (scope.row.lock_status_name == 'unlock_tuan') {
        this.dialogVisible = true;
      }else{
        this.dialogTuanVisible=true;

      }
    },
    // 不锁团
    unlockGroupFn() {
      let para = {};
      para.data = {};
      para.data.id = this.isscope.row.id;

      setUnlockTuan({
        params: para,
        success: (res) => {
          let judge = parseInt(res.data.code, 10);
          this.$message({
            message: res.data.msg,
            type: judge === 0 ? 'success' : 'error'
          });
          if(judge==0){
            if( this.isscope.row.status=='3'){
              this.$message.success('团队已过回团日期，1天后将再次自动锁团，请尽快完成相关操作');
            }else{
              this.$message.success(res.data.msg);
            }
          }else{
            this.$message.error(res.data.msg);
          }
          this.flag = 1;
          this.dialogTuanVisible = false;
          if(!judge){
            this.$set(this.isscope.row,'lock_status',0);
            this.$set(this.isscope.row,'lock_status_name','unlock_tuan');
          }else{
            this.$set(this.isscope.row,'lock_status',1);
          }
          this.handleSearch();
        },
        showLoading: true
      });
    },
    // 锁团
    lockGroupFn() {
      let para = {};
      para.data = {};
      para.data.id = this.isscope.row.id;

      setLockTuan({
        params: para,
        success: (res) => {
          let judge = parseInt(res.data.code, 10);
          this.$message({
            message: res.data.msg,
            type: judge === 0 ? 'success' : 'error'
          });
          this.flag = 1;
          this.dialogVisible = false;
          if(!judge){
            this.$set(this.isscope.row,'lock_status',1);
            this.$set(this.isscope.row,'lock_status_name','lock_tuan');
          }else{
            this.$set(this.isscope.row,'lock_status',0);
          }
          this.handleSearch();
        },
        showLoading: true
      });
    },
    handleChangeNumberInput(idx, val){
      if(/^\d+$/.test(val)){
        return
      }
      this.$nextTick(()=>{
        let match = val.match(/\d+/);

        this[idx] = match ? match[0] : '';
      })
    },
    showDialogOp (scope) {
      this.showOP = true;
      let row = scope.row
      this.tuan_id = row.id;
      this.assignOpList()
    },
    hidedialogOp () {
      this.showOP = false;
      this.opuser_id = ''
    },
    assignOpList(query) {
      let params = {
        data: {
          username: query ? query : ''
        }
      };
      assignOpList({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.res_oplist = result.data
          }
        },
        showLoading: false
      })
    },
    assignOp() {
      let params = {
        data: {
          tuan_id: this.tuan_id,
          op_id: this.opuser_id
        }
      };
      assignOp({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.hidedialogOp();
            this.handleSearch();
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        loading: true
      })
    },
    // 收入操作
    incomeModify(scope){
      this.scope = scope
      let para = {};
      para.data = {};
      para.data.id = '';
      para.data.tuan_id = scope.row.id;
      this.$set(this.is_scope, 'bills_info', this.initBillsInfo());
      getIncomeForm({
        params: para,
        success: (res) => {
          if(res.data.code != 0){
            return this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }

          let asyncObj = res.data.data;
          this.incomeVisible = true;
          // this.is_scope = asyncObj;
          this.$set(this.is_scope,'bill_type',asyncObj.bill_type);
          this.$set(this.is_scope,'currency_lists',asyncObj.currency_lists);
          this.$set(this.is_scope,'item_type',asyncObj.item_type);
          this.$set(this.is_scope,'org_info',asyncObj.org_info);
          this.is_scope.bills_info.resource_id = scope.row.id
          this.is_scope.bills_info.bill_type = ''
        },
        showLoading: true
      });

    },
    incomeConfirm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let para = {};
          para.data = this.is_scope.bills_info;
          setIncomeForm({
            params: para,
            success: (res) => {
              this.$message({
                message: res.data.msg,
                type: res.data.code == '0'?'success':'error'
              })
              if(res.data.code == '0'){
                this.incomeVisible = false;
                if (this.$menuPermission('tuancontro/line/incomelist')) {
                  this.$router.push({
                    path: '/tuancontro/income',
                    query: {id: this.scope.row.a_id}
                  })
                }
              }
            },
            showLoading: true
          });
        } else {
          return false;
        }
      });

    },
    incomeConfirmGiveup(formName){
      this.incomeVisible = false;
      this.$refs[formName].resetFields();
    },
    cancelDiagIncome(done){
      done();
      this.$refs['incomeForm'].resetFields();
    },
    initBillsInfo(){
      let form = {
        apportion:'',
        bill_type:'',
        bill_type_name: '',
        confirm_file:'',
        create_time:'',
        currency:'人民币',
        currency_rate: 1,
        distributor_org_id:'',
        distributor_org_name:'',
        id:'',
        item_type:'',
        num:'',
        order_from:'',
        order_no:'',
        order_status:'',
        remark:'',
        resource_id:'',
        resource_type:'',
        rmb_payed_amount:'',
        rmb_receipted_amount:'',
        rmb_total_amount:'',
        supplier_org_id:'',
        supplier_org_name:'',
        total_amount:'',
        update_time:'',
        item_name: '',
        unit_price: ''
      }
      return form;
    },
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style scoped lang="scss">
.tool a {
  display: inline-block;
  color: #20a0ff;
}
.text-c {
  text-align: center;
}
.account_btns {
  padding: 10px 0;
  .el-button {
    margin: 5px 0;
  }
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
.tqbj{
  color: #ff6600;
}
.col-gray{
  color: #cccccc;
}
.icon-more {
  color: #999;
  font-size: 16px;
  margin-left: 5px;
  vertical-align: middle;
}
.tuan_name{
  line-height: 20px;
  width: 100%;
  .t{
    display: inline-block;
    max-width: 76%;
    overflow : hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: -5px;
  }
  .yu{
    color: #019f3d;
  }
}
.tag{
  padding: 2px;
  border-radius: 2px;
  font-size: 12px!important;
  vertical-align: 1px;
  white-space: nowrap;
  &.tag-purple{
    color: #b10c79;
    background: #fbf3f8;
  }
  &.tag-gray{
    color: #999999;
    background: #f5f5f5;
  }
}
.ecqr{
  display: inline-block;
  color: #b10c79;
  border: 1px solid #b10c79;
  padding: 0 2px;
  border-radius: 2px;
  opacity: .7;
  font-size: 12px;
  line-height: 16px;
  transform: scale(0.85);
  vertical-align: 1px;
}
  .width180 {
    width: 180px;
  }
  .search-item{line-height: 35px;}
.el-form-item{margin-bottom: 13px;}
.el-select{
  width: 100%;
}
.huobizu{
	padding: 1px 5px;
}
</style>
