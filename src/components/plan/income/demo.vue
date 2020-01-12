<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="table-title no-border" v-if="tuanInfo">
        <div class="title">
          <span class="color-orange">【{{tuanInfo.tuan_no}}】</span>
          {{tuanInfo.tuan_name}}</div>
        <table class="desc">
          <tr>
            <th>出发城市</th>
            <td colspan="3">{{ tuanInfo.departure_city }}</td>
          </tr>
          <tr>
            <th>出发日期</th>
            <td>{{ tuanInfo.departure_date}}</td>
            <th>返回日期</th>
            <td>{{ tuanInfo.back_date}}</td>
          </tr>
        </table>
        <div class="btn-areas">
          <el-button type="primary" @click="goto()">查看行程</el-button>
          <el-button @click="goto()">打印行程</el-button>
        </div>
      </div>
      <div class="content-title">
        应收款（本位币）：
        <span class="color-orange">&yen; {{ totalAmount}}</span>
        <el-button v-if="$menuPermission('api/tuan/add_income')" type="primary" style="margin-left:10px;" @click="addIncomeHandler">添加收入</el-button>
      </div>
    </div>

    <div class="system-content">
      <div class="system-search">
        <div class="search-line-item">
          <div class="search-item">
            <div class="label">收入类型</div>
            <el-select placeholder="请选择" v-model="billType" style="width:100px;" @change="watchRouteHandler">
              <el-option v-for="(item, key) in billTypeOptions" :key="key" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="search-item">
            <div class="label">确认状态</div>
            <el-select placeholder="请选择" v-model="status" style="width:100px;" @change="watchRouteHandler">
              <el-option v-for="(item, key) in statusOptions" :key="key" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="search-item">
            <div class="label">项目类型</div>
            <el-select placeholder="请选择" v-model="itemType" style="width:100px;" @change="watchRouteHandler">
              <el-option v-for="(item, key) in itemTypeOptions" :key="key" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="content-list">
        <div class="mode-table">
          <el-table v-if="tableData" :data="tableData">
            <el-table-column
              prop="item_no"
              label="应收款编号"
              width="170"
              align="center">
            </el-table-column>
            <el-table-column
              prop="distributor_org_name"
              label="直客／同行（结算方）"
              width="250"
              align="center">
            </el-table-column>
            <el-table-column
              prop="rmb_total_amount"
              label="应收金额（本位币）"
              width="100"
              align="right">
            </el-table-column>
            <el-table-column
              prop="currency"
              label="结算币种／应收金额"
              width="100"
              align="right">
              <template slot-scope="prop">
                {{ prop.row.currency }}<br>
                {{ prop.row.total_amount }}
              </template>
            </el-table-column>
            <el-table-column
              prop="currency_rate"
              label="转换汇率"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="bill_type_name"
              label="收入类型"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="order_no"
              label="订单编号"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="item_type_name"
              label="项目类型"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="order_status_name"
              label="确认状态"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="说明"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              fixed="right"
              align="center">
              <template slot-scope="scope">
                <el-button v-if="$menuPermission('api/tuan/add_income') && scope.row.bill_type !== 1" type="text">编辑收入</el-button>
                <el-button v-if="$menuPermission('api/tuan/confirm_piece')" type="text" @click="$router.push({path:'/control/cost/confirm', query:{tuan_id:imComeData.tuan_info.resource_id,id:scope.row.id,type:1}})">确认件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!--工具条-->
    <div class="page">
      <el-pagination
        v-if="totalPage > 1"
        layout="prev, pager, next"
        :page-size="10"
        :current-page="page"
        :page-count="totalPage"
        :total="total"
        @current-change="currentPageChange">
      </el-pagination>
    </div>

    <el-dialog title="收入操作" :visible.sync="incomeVisible" open="">
      <el-form :rules="rules" :model="incomeFormData" ref="incomeForm" label-width="160px" style=";width:80%;">
        <el-form-item label="收入类型">
          <span>佣金收入</span>
        </el-form-item>
        <el-form-item label="直客／同行（结算方）" prop="distributor_org_name">
          <el-select v-model="incomeFormData.distributor_org_name">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="结算币种/汇率" required>
          <el-col :span="11" style="margin-right:10px;" prop="currency">
            <el-select v-model="incomeFormData.currency" placeholder="请选择">
              <el-option v-for="(item, key) in currencyOptions" :key="key" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="currency_rate">
              <el-input v-model="incomeFormData.currency_rate" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="结算金额" prop="total_amount">
          <el-input v-model="incomeFormData.total_amount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="应收金额（本位币）">
          {{ incomeFormData.total_amount * incomeFormData.currency_rate }}
        </el-form-item>
        <el-form-item label="项目类型" prop="item_type">
          <el-select v-model="incomeFormData.item_type" placeholder="请选择">
            <el-option v-for="(item, key) in itemTypeOptions" :key="key" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input v-model="incomeFormData.num" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea" v-model="incomeFormData.remark" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="incomeVisible =false">取 消</el-button>
        <el-button type="primary" @click="editIncomeHandler">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {
  getIncomeList,
  getSearchOrg,
  getIncomeForm,
  setIncomeForm
} from 'src/api/api';

export default {
  data() {
    return {
      id: this.$route.query.id,
      status: this.$route.query.status || '',
      statusOptions: [
        {
          name: '全部',
          value: '0'
        },
        {
          name: '待确认',
          value: '1'
        },
        {
          name: '已确认',
          value: '2'
        },
        {
          name: '已取消',
          value: '-1'
        }
      ],
      billType: this.$route.query.billType || '',
      billTypeOptions: [
        {
          name: '全部',
          value: '0'
        },
        {
          name: '订单收入',
          value: '1'
        },
        {
          name: '佣金收入',
          value: '2'
        }
      ],
      itemType: this.$route.query.itemType || '',
      itemTypeOptions: [
        {
          name: '全部',
          value: '0'
        },
        {
          name: '机票',
          value: '1'
        },
        {
          name: '门票',
          value: '2'
        },
        {
          name: '地接',
          value: '3'
        },
        {
          name: '用餐',
          value: '4'
        },
        {
          name: '签证',
          value: '7'
        },
        {
          name: '住宿',
          value: '12'
        },
        {
          name: '购物',
          value: '13'
        },
        {
          name: '团队旅游',
          value: '14'
        },
        {
          name: '其他',
          value: '99'
        },
      ],
      tuanInfo: null,
      tableData: null,
      totalAmount: null,
      page: Number(this.$route.query.page) || 1,
      totalPage: null,
      total: null,
      incomeVisible: false,
      incomeFormData:{
        currency:"",
        currency_rate:"",
        distributor_org_id:"",
        distributor_org_name:"",
        id: "",
        total_amount: "",
        item_name:"",
        item_no:"",
        item_type:"",
        item_type_name:"",
        num:"",
        remark:""
      },
      rules:{

      },
      currencyOptions: [
        {
          name: '美金',
          value: '1'
        },
        {
          name: '港币',
          value: '2'
        },
        {
          name: '人民币',
          value: '3'
        },
        {
          name: '新台币',
          value: '4'
        },
        {
          name: '日元',
          value: '5'
        },
        {
          name: '韩元',
          value: '6'
        },
        {
          name: '新加坡元',
          value: '7'
        },
        {
          name: '欧元',
          value: '8'
        },
        {
          name: '英镑',
          value: '9'
        },
        {
          name: '泰国铢',
          value: '10'
        }
      ]
    }
  },
  components: {

  },
  watch: {
    $route(){
      this.getIncomeListHandler();
    }
  },
  methods: {
    watchRouteHandler(){
      this.$router.push({
        path: this.path,
        query: {
          id: this.id,
          status: this.status,
          billType: this.billType,
          itemType: this.itemType,
          page: this.page,
        }
      });
    },
    getIncomeListHandler() {
      let params = {
        data: {
          id: this.id,
          order_status: this.status,
          bill_type: this.billType,
          item_type: this.itemType,
          page: this.page
        }
      }
      getIncomeList({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(!code){
            this.tuanInfo = data.tuan_info;
            this.totalAmount = data.rmb_total_amount;
            this.tableData = data.lists.data;
            this.page = data.lists.page_index;
            this.totalPage = data.lists.total_page;
            this.total = data.lists.total_count;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    addIncomeHandler(){
      this.incomeVisible = true;
    },
    editIncomeHandler(){
      this.incomeVisible = false;
      this.$refs['incomeForm'].resetFields();
    },
    currentPageChange(currentPage){
      this.page = currentPage;
      this.watchRouteHandler();
    }
  },
  mounted() {
    this.getIncomeListHandler();
  }
};
</script>

<style scoped lang="scss">
.search-item {
  line-height: 30px;
}

.el-form-item {
  margin-bottom: 10px;
}

.el-select {
  width: 100%;
}
</style>
