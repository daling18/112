<template>
  <div class="wrapper">
    <!-- <component v-if="!isSaleOrder" :is="tabComponent" name="qz" /> -->
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">产品名称</div>
        <el-input v-model="searchData.productname" placeholder="保险产品名称"/>
      </div>
      <div class="search-item">
        <div class="label">承保公司</div>
        <el-input v-model="searchData.icompanyname" placeholder="承保公司"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch()">查询</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border tooltip-effect="light">
            <!-- <el-table-column
              label="图片"
              align="center"
              :resizable="false"
            >
              <template slot-scope="scope">
                <div class="imgbox">
                  <img :src="scope.row.productimage" alt="保险图片">
                </div>
              </template>
            </el-table-column> -->
            <el-table-column
              label="保险类型"
              align="center"
              width="150"
              :resizable="false"
            >
              <template slot-scope="scope">
                {{ scope.row.producttypename }}
              </template>
            </el-table-column>
            <el-table-column
              label="保险名称"
              header-align="center"
              min-width="150"
              :resizable="false"
              prop="visa_name"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.productname }}
              </template>
            </el-table-column>
            <el-table-column
              label="承保公司"
              header-align="center"
              align="center"
              min-width="150"
              :resizable="false"
            >
              <template slot-scope="scope"><span>{{ scope.row.icompanyname }}</span></template>
            </el-table-column>
            <el-table-column
              label="结算价"
              header-align="center"
              align="center"
              width="100"
              :resizable="false">
              <template slot-scope="scope"><span class="color-orange">
                ¥{{ scope.row.price }}
              </span></template>
            </el-table-column>
            <el-table-column
              label="销售价"
              header-align="center"
              align="center"
              width="100"
              :resizable="false">
              <template slot-scope="scope"><span class="color-orange">
                ¥{{ scope.row.price }}
              </span></template>
            </el-table-column>
            <el-table-column label="操作" width="70" align="center" fixed="right">
              <template slot-scope="scope">
                <!-- <span class="color-purple" style="cursor:pointer;" @click="showDetail(scope.row.product_id)">改价</span> -->
                <router-link :to="'productDetail?reserve=0&id=' + scope.row.id">
                  查看
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- <div class="page" v-show="true">
      <el-pagination layout="prev, pager, next" :current-page="searchInput.page_index" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog
      title="价格调整"
      :visible.sync="showRevison"
      width="30%"
      :before-close="handleClose">
      <div style="display: flex;">
        <div class="price-box">
          <p style="color:#000;">结算价</p>
          <p>展示价格:{{proData.detail.price}}元</p>
          <p style="color:#000;">具体费用价格</p>
          <ul v-for="(plansList,plansListIndex) in proData.detail.productplans" :key="plansListIndex">
            <li>{{plansList.planname}}</li>
            <li style="display: flex;" v-for="(planItem,planIndex) in plansList.timecosts" :key="planIndex">
              <p class="price-line">
                <span>{{planItem.insurancemindays}}</span>天~<span>{{planItem.insurancemaxdays}}</span>天
              </p>
              <p class="price-line" v-if="planItem.feetype == '0'">
                总计:<span>{{planItem.insurancefee}}</span>元
              </p>
              <p class="price-line" v-if="planItem.feetype == '1'">
                总计:<span>{{planItem.insurancefee}}</span>元
              </p>
            </li>
          </ul>
        </div>
        <div class="price-box">
          <p style="color:#000;">建议销售价</p>
          <p>展示价格:{{proData.local_detail.price}}元</p>
          <p style="color:#000;">具体费用价格</p>
          <ul v-for="(plansList,plansListIndex) in activeProData.productplans" :key="plansListIndex">
            <li>{{plansList.planname}}</li>
            <li style="display: flex;" v-for="(planItem,planIndex) in plansList.timecosts" :key="planIndex">
              <p class="price-line">
                <span>{{planItem.insurancemindays}}</span>天~<span>{{planItem.insurancemaxdays}}</span>天
              </p>
              <p class="price-line">
                总计: <input type="number" style="display:inline-block;padding:0;height:18px;width:50%;" v-model="planItem.insurancefee"></input></span>元
              </p>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickChangePrice()">确认调整</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>

import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import{
  queryInsuranceProductListNew,
  queryInsuranceProductDetail,
  insuranceUpdatePrice
} from 'src/api/insurance.js';

export default {
  name: 'InsuranceProductList',
  components: {
    SearchItemDateRange
  },
  filters: {

  },
  data() {
    const { query } = this.$route;

    return {
      searchData: {
        productname: '',
        icompanyname: ''
      },
      pageShow: false,
      tableData: [],
      showRevison: false,
      proData: {
        detail: {
        },
        local_detail:{}
      },
      activeProductId: '',
      activeProData: {}
    };
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let params = {
        data: this.searchData
      }
      queryInsuranceProductListNew({
        params: params,
        method: 'post',
        success: (params) => {
          let data = params.data;
          if (data.code == '0') {
            this.tableData = data.data;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    showDetail(product_id) {
      queryInsuranceProductDetail({
        params: {'productId': product_id},
        method: 'get',
        success: (data) => {
          let res = data.data;
          if(res.code == '0') {
            this.showRevison = true;
            this.proData = res;
            this.activeProData = res.local_detail;
            this.activeProductId = res.productId;
          }
        },
        showLoading: true
      })
    },
    clickChangePrice() {
      insuranceUpdatePrice({
        params: {
          productId: this.activeProductId,
          local_detail: this.activeProData
        },
        method: 'post',
        success: (data) => {
          if(data.data.code == '0') {
            this.showRevison = false;
            this.getList();
            this.$message({
              message: '改价成功',
              type: 'success'
            });
          }
        },
        showLoading: true
      })
    },
    handleSearch(){
      this.getList();
      this.$router.replace({query: this.searchData});
    },
    handleCurrentChange(val) {
      if(val != this.searchData.page_index){
        this.searchData.page_index = val;
        this.createTime = [this.searchData.create_time_start, this.searchData.create_time_end];
        this.departmentDate = [this.searchData.departure_date_start, this.searchData.departure_date_end];
        this.getList();
        this.$router.replace({query: this.searchData});
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped lang="less">
.imgbox {
  width: 100px;
  height: 100px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

.system-search .search-item .long-label {
  width: 100px;
  margin-left: -80px;
  margin-right: 5px;
}
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.price-box {
  flex: 1;
  border: 1px solid #333;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
}
.price-line {
  flex: 3;
  justify-content: space-between;
  font-size: 12px;
  height: 22px;
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
.price-line:nth-child(1) {
  flex: 4;
}
</style>
