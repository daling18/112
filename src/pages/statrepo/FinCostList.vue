<!--D:\files\repo\bom\application\index\view\dev\src\components\finace\report\cost.vue-->
<template>
  <div class="wrapper">
    <long-tab :id="id" :sub="4" />
    <div class="export-box clearfix">
      <div class="fr">
        <a :href="exportFunc" class="btn" v-if="sourceFrom == 0 && $menuPermission('statrepo/finarepo/costListexpo')">导出</a>
        <a :href="exportFunc" class="btn" v-else-if="sourceFrom == 1 && $menuPermission('statrepo/comprepo/costListexpo')">导出</a>
      </div>
      <div class="comp"
           v-if="sourceFrom == 1">
        {{ allData.org_name }}
      </div>
    </div>
    <!-- system-search -->
    <div class="system-search mt10">
      <div class="search-item mix">
        <div class="label">关键词</div>
        <el-select class="mr20" v-model="filters.key" placeholder="请选择">
          <el-option :key="i"
                     v-for="(o,i) in allData.key_list"
                     :label="o"
                     :value="i" />
        </el-select>
        <el-input v-model="filters.value" placeholder="关键词"/>
      </div>
      <div class="search-item calendar">
        <div class="label">开票日期</div>
        <el-date-picker type="date"
                        v-model="filters.invoice_date_start"
                        placeholder="选择日期"
                        :editable="false"
                        :picker-options="datepickerOptions1"/>
        <div class="label zhi">-</div>
        <el-date-picker type="date"
                        v-model="filters.invoice_date_end"
                        placeholder="选择日期"
                        :editable="false"
                        :picker-options="datepickerOptions2"/>
      </div>
      <div class="search-item">
        <div class="label">凭证种类</div>
        <el-select v-model="filters.voucher_type" placeholder="请选择">
          <el-option label="全部" value="" />
          <el-option :key="i"
                     v-for="(o,i) in allData.voucher_type_list"
                     :label="o"
                     :value="i" />
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="initialize(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <!-- report-sub -->
    <div class="report-sub">
      <el-table :data="allData.list"
                border>
        <el-table-column label="开票日期"
                         prop="invoice_date"
                         width="120"
                         align="center"
                         :resizable="false"
                         :render-header="rhKp"
                         :formatter="fmtEmpty"/>
        <el-table-column label="订单项目号"
                         prop="order_item_no"
                         align="center"
                         width="120"
                         :resizable="false">
          <template slot-scope="scope">
            <div v-if="scope.row.order_item_no === undefined || scope.row.order_item_no.length == 0">
              --
            </div>
            <div v-else>
              <div :key="i"
                   v-for="(o,i) in scope.row.order_item_no"
                   :title="o"
                   class="ellipsis lh18">
                {{ o }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="项目号"
                         prop="tuan_item_no"
                         align="center"
                         width="120"
                         :resizable="false">
          <template slot-scope="scope">
            <div v-if="scope.row.tuan_item_no === undefined || scope.row.tuan_item_no.length == 0">
              --
            </div>
            <div v-else>
              <div :key="i"
                   v-for="(o,i) in scope.row.tuan_item_no"
                   :title="o"
                   class="ellipsis lh18">
                {{ o }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="开票金额"
                         prop="amount"
                         header-align="center"
                         align="right"
                         width="100"
                         :resizable="false"
                         :formatter="fmtEmpty"/>
        <el-table-column label="发票号码"
                         prop="invoice_number"
                         align="center"
                         width="120"
                         :resizable="false"
                         :formatter="fmtEmpty"/>
        <el-table-column label="发票代码"
                         prop="code"
                         align="center"
                         width="120"
                         :resizable="false"
                         :formatter="fmtEmpty"/>
        <el-table-column label="开票方单位名称"
                         prop="raised_org_name"
                         align="center"
                         width="180"
                         :resizable="false"
                         :formatter="fmtEmpty"/>
        <el-table-column label="开票方纳税人识别号"
                         prop="taxpayer_num"
                         align="center"
                         width="150"
                         :resizable="false"
                         :formatter="fmtEmpty"/>
        <el-table-column label="凭证种类"
                         prop="voucher_type_name"
                         align="center"
                         width="100"
                         :resizable="false"
                         :formatter="fmtEmpty"/>
        <el-table-column label="服务项目名称"
                         prop="item_name"
                         align="center"
                         min-width="140"
                         :resizable="false">
          <template slot-scope="scope">
            <div v-if="scope.row.item_name === undefined || scope.row.item_name.length == 0">
              --
            </div>
            <div v-else>
              <div :key="i"
                   v-for="(o,i) in scope.row.item_name"
                   :title="o"
                   class="ellipsis lh18">
                {{ o }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="成本单号"
                         prop="item_no"
                         align="center"
                         width="180"
                         :resizable="false">
          <template slot-scope="scope">
            <div v-if="scope.row.item_no === undefined || scope.row.item_no.length == 0">
              --
            </div>
            <div v-else>
              <div :key="i"
                   v-for="(o,i) in scope.row.item_no"
                   :title="o"
                   class="ellipsis lh18">
                {{ o }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /report-sub -->
    <div class="page" v-show="pagination.total_page > 1">
      <el-pagination layout="prev, pager, next" 
                     @current-change="currentPageChange"
                     :total="pagination.total_count"
                     :page-size="pagination.page_size"/>
    </div>
  </div>
</template>
<script>
import { finCostInvoiceList } from 'src/api/finance';
import { formattDate } from 'src/assets/js/common.js';
import longTab from './components/LongTab';
export default {
  components: {
    'long-tab': longTab
  },
  data() {
    return {
      id: this.$route.query.id,
      sourceFrom: null,
      rhClaKp: 'is',
      filters: {
        invoice_date_start: '',
        invoice_date_end: '',
        key: '1',
        value: '',
        voucher_type: '',
        sort_direction: '2',
        sort_key: '1'
      },
      constFilters: {
        invoice_date_start: '',
        invoice_date_end: '',
        key: '1',
        value: '',
        voucher_type: '',
        sort_direction: '2',
        sort_key: '1'
      },
      allData: {},
      pagination: {
        total_count: 0,
        total_page: 0,
        page_size: 10,
        page_index: 1
      }
    };
  },
  computed: {
    datepickerOptions1() {
      let da = this.filters.invoice_date_end;
      return {
        disabledDate(t) {
          return t.getTime() > new Date(da).getTime();
        }
      };
    },
    datepickerOptions2() {
      let da = this.filters.invoice_date_start;
      return {
        disabledDate(t) {
          return t.getTime() < new Date(da).getTime();
        }
      };
    },
    exportFunc() {
      this.constFilters.invoice_date_start = this.constFilters.invoice_date_start ? formattDate(this.constFilters.invoice_date_start) : '';
      this.constFilters.invoice_date_end = this.constFilters.invoice_date_end ? formattDate(this.constFilters.invoice_date_end) : '';
      return (
        '/bom/api/finance/export_cost_invoice_list?org_id=' +
        this.id +
        '&invoice_date_start=' +
        this.constFilters.invoice_date_start +
        '&invoice_date_end=' +
        this.constFilters.invoice_date_end +
        '&key=' +
        this.constFilters.key +
        '&value=' +
        this.constFilters.value +
        '&sort_key=' +
        this.constFilters.sort_key +
        '&sort_direction=' +
        this.constFilters.sort_direction +
        '&voucher_type=' +
        this.constFilters.voucher_type
      );
    }
  },
  created() {
    if (this.$route.meta.menu == 'StatrepoFinarepo') {
      this.sourceFrom = 0;
    } else {
      this.sourceFrom = 1;
    }
  },
  methods: {
    initialize(bool) {
      let para = {};
      para.data = this.constFilters;
      para.data.org_id = this.id || '';
      para.data.page = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;
      if (bool) {
        this.constFilters = { ...this.filters };
        para.data = { ...this.filters };
        para.data.invoice_date_start = this.filters.invoice_date_start
          ? formattDate(this.filters.invoice_date_start)
          : '';
        para.data.invoice_date_end = this.filters.invoice_date_end
          ? formattDate(this.filters.invoice_date_end)
          : '';
        para.data.page = 1;
        this.pagination = {
          total_count: 0,
          total_page: 0,
          page_size: 10,
          page_index: 1
        };
      } else {
        this.filters = { ...this.constFilters };
      }
      if (
        this.constFilters.sort_key == '1' &&
        this.constFilters.sort_direction == '1'
      ) {
        this.rhClaKp = 'is is1';
      } else if (
        this.constFilters.sort_key == '1' &&
        this.constFilters.sort_direction == '2'
      ) {
        this.rhClaKp = 'is is2';
      }
      finCostInvoiceList({
        params: para,
        success: res => {
          if (res.data.code == 0) {
            this.allData = res.data.data;
            this.pagination.total_count = parseInt(
              res.data.data.total_count,
              10
            );
            this.pagination.total_page = parseInt(res.data.data.total_page, 10);
            this.pagination.page_size = parseInt(res.data.data.page_size, 10);
            this.pagination.page_index = parseInt(res.data.data.page_index, 10);
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
    // 翻页相关
    currentPageChange(val) {
      this.pagination.page_index = val;
      this.initialize();
    },
    rhKp(h) {
      return h('div', { class: this.rhClaKp, attrs: { dname: 'kaipiaoriqi' }, on: { click: this.rhClick } }, [
        h('span', { }, ['开票日期']),
        h('span', { class: 'so'  }, [])
      ]);
    },
    rhClick(e) {
      const name = e.currentTarget.getAttribute('dname'),
        cla = e.currentTarget.className;
      if (name == 'kaipiaoriqi') {
        if (cla == 'is is1') {
          this.rhClaKp = 'is is2';
          this.constFilters.sort_direction = '2';
          this.filters.sort_direction = '2';
        } else {
          this.rhClaKp = 'is is1';
          this.constFilters.sort_direction = '1';
          this.filters.sort_direction = '1';
        }
        this.initialize();
      }
    },
    fmtEmpty(row, column) {
      const item = row[column.property];
      if (item.length == 0 || item === undefined) {
        return '--';
      } else {
        return item;
      }
    }
  },
  mounted() {
    this.initialize();
  }
};
</script>

<style scoped lang="scss">

</style>
