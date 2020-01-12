<template>
  <div class="wrapper">
    <div class="system-tab">
      <!-- <ul class="tab-box">
        <router-link tag="li"
          to="/control/list-line"
          v-if="$menuPermission('api/tuan/index')">
          线路团控
        </router-link>
        <router-link tag="li"
          class="on"
          to="/control/list-line2">
          单项团控
        </router-link>
      </ul> -->
      <el-button v-if="this.$menuPermission('tuancontro/single/store')" @click="handleAddTuanOrder">添加团账</el-button>
    </div>
    <div class="system-search">
      <div class="system-search-panel">
        <div class="search-item">
          <div class="label">单项类型</div>
          <el-select v-model="filters.product_type" clearable>
            <el-option label="机票" value="flight"></el-option>
            <el-option label="酒店" value="hotel"></el-option>
            <el-option label="门票" value="ticket"></el-option>
            <el-option label="火车票" value="train"></el-option>
            <el-option label="签证" value="visa"></el-option>
            <el-option label="农特优" value="localproduct"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">锁团状态</div>
          <el-select v-model="filters.lock_status" clearable>
            <el-option label="已锁" :value="1"></el-option>
            <el-option label="未锁" :value="2"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">团号</div>
          <el-input v-model="filters.tuan_no" placeholder="请输入酒店名称"/>
        </div>
        <div class="search-item">
          <div class="label">锁账状态</div>
          <el-select v-model="filters.lock_fund" clearable>
            <el-option label="已锁" :value="1"></el-option>
            <el-option label="未锁" :value="2"></el-option>
          </el-select>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="handleSearchTuan(1)">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="tuan">
      <el-table
        :data="groups"
        style="width: 100%">
        <el-table-column
          header-align="center"
          align="center"
          label="单项类型">
          <template slot-scope="prop">
            {{ prop.row.single_type | getSingleTypeStr }}
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="tuan_no"
          label="团号">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="op_name"
          label="OP">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="锁团状态">
          <template slot-scope="prop">
            {{ prop.row.lock_status | getLockStatusStr }}
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="锁账状态">
          <template slot-scope="prop">
            {{ prop.row.lock_fund | getLockFundStr }}
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          width="180">
          <template slot-scope="prop">
            <el-dropdown 
              v-if="$menuPermission('tuancontro/single/costlist/aecost') || 
                    $menuPermission('tuancontro/single/incomelist/aeincome') ||
                    $menuPermission('tuancontro/single/locktuan') ||
                    $menuPermission('tuancontro/single/unlocktuan') ||
                    $menuPermission('tuancontro/single/lockfund') ||
                    $menuPermission('tuancontro/single/assignop') ||
                    $menuPermission('tuancontro/single/tuanaccop')">
              <span class="el-dropdown-link">
                操作<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/costlist/aecost')">
                  <router-link :to="{ name:'TuancontroSingleCostAdd',query:{ id:'', tuan_id: prop.row.id}}" >
                    +成本
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/incomelist/aeincome')">
                  <p @click="incomeModify(prop)">+收入</p>
                </el-dropdown-item>
                <el-dropdown-item v-if="prop.row.lock_status == 0 && $menuPermission('tuancontro/single/locktuan')">
                  <a href="javascript:;" @click="changeTuanLockStatusHandler(prop.row.id, 1, '锁团')">
                    锁团
                  </a>
                </el-dropdown-item>
                <el-dropdown-item v-if="prop.row.lock_status == 1 && $menuPermission('tuancontro/single/unlocktuan')">
                  <a href="javascript:;" @click="changeTuanLockStatusHandler(prop.row.id, 0, '解锁团')">
                    解锁团
                  </a>
                </el-dropdown-item>
                <el-dropdown-item v-if="prop.row.lock_fund == 0 && $menuPermission('tuancontro/single/lockfund')">
                  <a href="javascript:;" @click="changeTuanFinanceStatusHandler(prop.row.a_id)">
                    锁账
                  </a>
                </el-dropdown-item>
                <el-dropdown-item v-if="prop.row.lock_status == 0 && $menuPermission('tuancontro/single/assignop')">
                  <a href="javascript:;" @click="showDialogOp(prop)">
                    指派OP
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-else>--</span>
            <el-dropdown 
              v-if="$menuPermission('tuancontro/single/tuanorder') ||
                    $menuPermission('tuancontro/Single/oprec') ||
                    $menuPermission('tuancontro/single/tuanacc') ||
                    $menuPermission('tuancontro/single/recerec') ||
                    $menuPermission('tuancontro/single/costlist') ||
                    $menuPermission('tuancontro/single/incomelist')">
              <span class="el-dropdown-link">
                查看<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/tuanorder')">
                  <router-link :to="{name:'TuancontroSingleTuanOrder',query:{id: prop.row.a_id,lock_status: prop.row.lock_status}}">
                    团队订单
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/oprec')">
                  <router-link :to="{name:'TuancontroSingleOperating', params:{id:prop.row.a_id,type:constDataConfigType}}">
                    操作记录
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/tuanacc')">
                  <router-link :to="{name:'TuancontroSingleBill',query:{id:prop.row.a_id}}">
                    团队账单
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/recerec')">
                  <router-link :to="{name:'TuancontroSingleplanReceiptList',query:{tuan_id: prop.row.id, aid:prop.row.a_id}}">
                    收款记录
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/costlist')">
                  <router-link :to="{name:'TuancontroSingleCost',query:{id:prop.row.a_id}}">
                    成本列表
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('tuancontro/single/incomelist')">
                  <router-link :to="{name:'TuancontroSingleIncome',query:{id:prop.row.a_id}}">
                    收入列表
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="groups && groups.length" class="page">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="groupsTotal"
        :page-size="pageSize"
        :current-page="filters.page_index"
      />
    </div>
    <el-dialog
      title="添加团账"
      :visible.sync="orderVisable"
      size="large"
      @close="handleClearAddTuanOrder">
      <div class="order">
        <div class="system-search">
          <div class="system-search-panel">
            <div class="search-item">
              <div class="label">下单时间</div>
              <el-date-picker 
                v-model="orderFilter.start_date"
                type="date" 
                placeholder="选择日期">
              </el-date-picker>
              <div class="line">
                -
              </div>
              <el-date-picker 
                v-model="orderFilter.end_date"
                type="date" 
                placeholder="选择日期"
                :picker-options="endDateOption">
              </el-date-picker>
            </div>
            <div class="search-item">
              <div class="label">单项类型</div>
              <el-select v-model="orderFilter.product_type" clearable>
                <el-option label="机票" value="flight"></el-option>
                <el-option label="酒店" value="hotel"></el-option>
                <el-option label="门票" value="ticket"></el-option>
                <el-option label="火车票" value="train"></el-option>
                <el-option label="签证" value="visa"></el-option>
                <el-option label="农特优" value="localproduct"></el-option>
              </el-select>
            </div>
            <div class="search-item">
              <div class="label">产品名称</div>
              <el-input v-model="orderFilter.product_name" placeholder="请输入产品名称"/>
            </div>
            <div class="search-item search-button">
              <el-button type="primary" @click="handleSearchSingleOrder(1)">立即搜索</el-button>
            </div>
          </div>
          <div v-if="orderFilter.product_type" class="system-search-panel">
            <div class="search-item">
              <div class="label">订单状态</div>
              <el-checkbox-group v-model="orderFilter.order_status">
                <el-checkbox  
                  v-for="(option, key) in orderTypeOption" 
                  :key="key"
                  :label="key">
                  {{ option }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <el-table
          :data="orderList"
          style="width: 100%"
          @selection-change="handleSelectionOrderChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="create_time"
            label="下单时间">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="order_id"
            label="订单号">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="product_name"
            label="产品名称">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="order_status_name"
            label="订单状态">
          </el-table-column>
        </el-table>
        <div v-if="orderList && orderList.length" class="page">
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentPageOrderChange"
            :total="orderPageTotal"
            :page-size="orderPageSize"
            :current-page="orderFilter.page_index"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClearAddTuanOrder">取 消</el-button>
        <el-button type="primary" @click="handleSubmitAddTuanOrder">确 定</el-button>
      </span>
    </el-dialog>
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
import { 
  setUnlockTuan, 
  setLockTuan, 
  financeLockAction, 
  financeUnlockAction,
  getIncomeForm,
  setIncomeForm } from 'src/api/api';
import { searchSelfSupportTuanAsyncRequest, searchSelfSupportTuanOrderListAsyncRequest, addSelfSupportTuanOrderAsyncRequest, assignOpList, assignOp } from 'src/api/tuan';
import * as format from "src/utils/format";
import InputNumber from 'src/plugins/InputNumber.vue';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import SelectOrg from 'src/plugins/SelectOrg.vue';
export default {
  data(){
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
      groups: null,
      groupsTotal: 0,
      pageSize: null,
      filters:{
        product_type: null,
        tuan_no: "",
        lock_status: null,
        lock_fund: null,
        page_index: 1
      },
      orderList: null,
      orderFilter:{
        start_date: null,
        end_date: null,
        product_type: null,
        product_name: null,
        order_status: [],
        page_index: 1
      },
      orderPageTotal: 0,
      orderPageSize: null,
      orderVisable: false,
      selectedOrder:[],
      showOP: false,
      opuser_id: '',
      res_oplist: [],
      tuan_id: '',
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
      }
    }
  },
  filters:{
    formatPrice(price){
      const num = price || 0;

      return Number(format.toFixed(num, 3));
    },
    getSingleTypeStr(type){
      let str = '';
      switch(type){
        case 1:
          str = '火车票';
          break;
        case 2:
          str = '景区门票';
          break;
        case 3:
          str = '酒店';
          break;
        case 4:
          str = '机票';
          break;
        case 5:
          str = '签证';
          break;
        case 6:
          str = '农特优';
          break;
      }
      return str;
    },
    getLockFundStr(type){
      let str = '';
      switch(type){
        case 1:
          str = '已锁';
          break;
        case 0:
          str = '未锁';
          break;
      }
      return str;
    },
    getLockStatusStr(type){
       let str = '';
      switch(type){
        case 1:
          str = '已锁';
          break;
        case 0:
          str = '未锁';
          break;
      }
      return str;
    }
  },
  computed:{
    orderTypeOption(){
      let type = {
        flight:{
          OS000: '待处理', 
          OS001: '正在处理', 
          OS003: '待付款', 
          OS013: '出票中', 
          OS009: '已完成', 
          OS011: '已取消', 
          EA017: '退票处理中', 
          OS018: '退票成功', 
          OS037: '变更处理中', 
          OS042: '变更待付款', 
          OS029: '变更已付款'
        },
        hotel:{
          1:'待付款', 
          2:'待确认', 
          3:'预定成功', 
          4:'预定失败', 
          5:'已取消', 
          6:'退款中', 
          7:'已退款'	
        },
        ticket:{
          0:'未使用', 
          1:'已使用', 
          2:'已过期', 
          3:'已取消', 
          4:'凭证码被替代', 
          5:'被终端修改', 
          6:'被终端撤销', 
          7:'部分使用', 
          21:'退票审核中', 
          22:'退票成功'
        },
        train:{
          1:'占座中', 
          2:'待付款', 
          3:'待出票', 
          4:'待核实', 
          5:'已出票', 
          6:'交易关闭'
        },
        visa:{
          1:'待付款', 
          2:'待确认', 
          3:'待送签', 
          4:'待出签', 
          5:'已出签', 
          6:'已取消', 
          7:'交易关闭'
        },
        localproduct:{
          1:'待付款', 
          2:'待确认', 
          3:'待发货', 
          4:'已发货', 
          5:'已完成', 
          6:'已取消'
        }
      }
      return this.orderFilter.product_type && type[this.orderFilter.product_type]
    },
    endDateOption(){
      let startDate = this.orderFilter.start_date;
      return {
        disabledDate(time) {
          return !startDate || time.getTime() < startDate.getTime();
        }
      }
    },
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
  components:{
    InputNumber,
    CurrencyPicker,
    SelectOrg
  },
  watch: {
    $route(val, oldVal){
      this.initTuanFilters();
    },
    'orderFilter.product_type':{
      handler(){
        this.orderFilter.order_status = [];
      }
    },
    'orderFilter.start_date':{
      handler(val){
        if(this.orderFilter.end_date && new Date(this.orderFilter.end_date) < val){
          this.quoteForm.end_date = val;
        } 
      }
    },
    'groups':{
      handler(val){
        val.forEach(v=>{
          // 条件为先需要锁团才能再锁帐，先后关系
          if(v.lock_status == 0 && v.lock_fund == 0){
            // 未锁团+未锁帐
            v.lock_all = 0;
          }else if(v.lock_status == 1 && v.lock_fund == 0){
            // 已锁团+未锁帐
            v.lock_all = 1;
          }else if(v.lock_status == 1 && v.lock_fund == 1){
            // 已锁团+已锁帐
            v.lock_all = 2;
          }
          v
        });
      }
    }
  },
  methods: {
    initTuanFilters(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filters = {
          city_id: "",
          hotel_name: "",
          status: null,
          star_code: "",
          page_index: 1
        }
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        this.$set(this, 'filters', JSON.parse(filter));
      }
      this.searchTuanRequest();
    },
    searchTuanRequest(){
      let params = Object.assign({}, this.filters);
      
      searchSelfSupportTuanAsyncRequest({
        params: {
          data: params
        },
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.groups = data.data;
            this.pageSize = data.page_size;
            this.groupsTotal = data.total_count;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleSearchTuan(page){
      let filter = this.filters;

      filter.page_index = page;
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    currentPageChange(index){
      this.handleSearchTuan(index);
    },
    searchSelfSupportTuanOrderList(){
      let params = {
        data: JSON.parse(JSON.stringify(this.orderFilter))
      }
      if(!params['data'].start_date){
        this.$message.error('请输入起始时间');
        return;
      }
      if(!params['data'].end_date){
        this.$message.error('请输入结束时间');
        return;
      }
      if(!params['data'].product_type){
        this.$message.error('请选择订单类型');
        return;
      }
      if(!params['data'].order_status.length){
        this.$message.error('请选择订单状态');
        return;
      }
      params['data'].start_date = format.date(params['data'].start_date);
      params['data'].end_date = format.date(params['data'].end_date);
      searchSelfSupportTuanOrderListAsyncRequest({
        params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.orderList = data.data;
            this.orderPageTotal = data.total_count;
            this.orderPageSize = data.page_size;
          }else{
            this.orderList = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleSearchSingleOrder(page){
      this.orderFilter.page_index = page;
      this.searchSelfSupportTuanOrderList();
    },
    handleAddTuanOrder(){
      this.orderVisable = true;
    },
    handleClearAddTuanOrder(){
      this.$set(this, 'orderFilter', {
        start_date: null,
        end_date: null,
        product_type: null,
        product_name: null,
        order_status: null,
        page_size: 1
      });
      this.orderList = null;
      this.orderVisable = false;
    },
    handleSubmitAddTuanOrder(){
      let params = {
        data: {
          order_nos: JSON.parse(JSON.stringify(this.selectedOrder)),
          product_type: this.orderFilter.product_type
        }
      }
      if(!params['data']['order_nos'].length){
        this.$message.error('请选择订单');
        return;
      }
      params['data']['order_nos'] = params['data']['order_nos'].map((i) => i.order_id);
      addSelfSupportTuanOrderAsyncRequest({
        params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.$message.success(msg);
            this.orderVisable = false;
            this.searchTuanRequest();
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleSelectionOrderChange(val){
      this.selectedOrder = val;
    },
    currentPageOrderChange(index){
      this.orderFilter.page_index = page;
      this.searchSelfSupportTuanOrderList();
    },
    changeTuanLockStatusHandler(id, status, txt){
      this.$confirm(`您确定对该项目进行${ txt }操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
              data: {
                id: id
              }
            },
            fn = null;
        if(status){
          fn = setLockTuan;
        }else{
          fn = setUnlockTuan;
        }
        fn({
          params: params,
          success: (params) => {
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.initTuanFilters();
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
    },
    changeTuanFinanceStatusHandler(id){
      this.$confirm(`您确定对该项目进行锁账操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
              data: {
                id: id
              }
            };
        financeLockAction({
          params: params,
          success: (params) => {
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.initTuanFilters();
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
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
          console.log(result)
          if(result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.hidedialogOp();
            this.searchTuanRequest();
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
          this.is_scope = asyncObj;
          this.$set(this.is_scope,'org_info',
            [{org_id:this.is_scope.bills_info.distributor_org_id,
              org_name:this.is_scope.bills_info.distributor_org_name}]);
          this.is_scope.bills_info.resource_id = scope.row.id;
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
                if (this.$menuPermission('tuancontro/single/incomelist')) {
                  this.$router.push({
                    name: 'TuancontroSingleIncome',
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
  mounted(){
    this.initTuanFilters();
  }
}
</script>

<style lang="less" scoped>
.system-tab{
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
}
.system-search{
  padding-right: 20px;
  background-color: #f4f4f4;
}

.state{
  display: inline-block;
  padding: 0 3px;
  background-color: #f4f4f4;
  color: #666;
  font-size: 12px;
  line-height: 20px;
  border-radius: 2px;

  &.state-using{
    color: #fff;
    background-color: green;
  }
}
.line{
  float: left;
  line-height: 35px;
  padding: 0 10px;
}
.system-search-panel{
    padding-top: 15px;
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .search-item{
      &::after{
        content: '';
        display: none;
        clear: none;
      }
    }
  }
  .text-c{
    text-align: center;
  }
</style>
