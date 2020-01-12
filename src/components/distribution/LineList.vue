<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link
          v-if="$menuPermission('api/product/self_sale_product_list')"
          :class="searchData.is_other == 1 ? 'on' : ''"
          :to="{query: {is_other: 1}}"
          tag="li"
        >本公司产品</router-link>
        <router-link
          v-if="$menuPermission('api/product/distribution_product_list')"
          :class="searchData.is_other == 1 ? '' : 'on'"
          :to="{query: {is_other: 2}}"
          tag="li"
        >其他公司产品</router-link>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">行程编号</div>
        <el-input v-model="searchInput.product_no"/>
      </div>
      <div class="search-item">
        <div class="label">行程名称</div>
        <el-input placeholder="" v-model="searchInput.name"/>
      </div>
      <div class="search-item">
        <div class="label">计调</div>
        <el-input v-model="searchInput.operator_name"/>
      </div>
      <div class="search-item">
        <div class="label">出发地</div>
        <el-input v-model="searchInput.departure_city"/>
      </div>
      <search-item-date-range :label="'出发日期'" v-model="departureDate" @change="handleChangeDeparture"/>
      <div class="search-item">
        <div class="label">出行方式</div>
        <el-select v-model="searchInput.line_type" placeholder="请选择">
          <el-option label="全部" value=""/>
          <el-option v-for="(val, key) in LINE_TYPE_MAP" :key="key" :label="val" :value="key"/>
        </el-select>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="trip-content">
        <template v-if="lineList && lineList.length">
          <router-link v-for="item in lineList" class="trip-item" :key="item.id" :to="getDetailUrl(item)">
            <img class="trip-left" src="../../assets/bitmap.png">
            <div class="trip-left" >
              <div class="trim-img" :style="{'background-image':'url('+item.trip_pic_url+')','z-index':6}">
                <span class="type-tag" :style="{'background-color': LINE_TYPE_COLOR_MAP[item.line_type]}">{{ item.line_type_name }}</span>
              </div>
            </div>
            <div class="trip-middle">
              <div class="trip-code">
                <span :title="item.product_no">行程编号：{{ item.product_no }}</span>
                <span :title="[item.operator_name + ' / ' + item.mobile]">
                  OP：{{ item.operator_name }} / {{ item.mobile }}
                </span>
              </div>
              <p class="trip-title" :title="item.name">
                {{ item.name | limitNum('60') }}
                <span class="trip-day" v-if="item.trip_days">{{ item.trip_days }}天</span>
              </p>
              <div class="trip-message">
                <template v-if="item.departure_city && item.departure_city.length">
                  <span class="trip-departureCity">{{ item.departure_city[0] }}等地</span>出发
                </template>
                &nbsp;&nbsp;
                <span>
                  团期：
                  <template v-for="(n,index) in limitDate(item.departure_date)">
                    <span v-if="index !== 0" :key="index">,&nbsp;</span>
                    {{ n }}
                  </template>
                </span>
                <span v-if="item.departure_date && item.departure_date.length > 3">
                  ...<a class="color-purple" href="javascript:;"> 更多</a>
                </span>
              </div>
              <div class="trip-message color-black" v-if="item.supplier">供应商：{{ item.supplier }}</div>
            </div>
            <div class="trip-right">
              <div class="right-box">
                <p class="mb15">
                  <span class="price-title">建议价：</span>
                  <span class="price-content">
                    <span class="color-orange">¥ <span class="price">{{ item.out_price }}</span> </span> 起
                  </span>
                </p>
                <el-button v-if="$menuPermission('api/tuan/sale_book_tuan_list')" type="primary" @click.prevent="handleBook(item.id, item.sale_org_id)">预订</el-button>
              </div>
            </div>
          </router-link>
        </template>
        <template v-else>
          <div class="warm-tip">
            <p>没有符合您搜索条件的信息，做些其他尝试吧。 :)</p>
          </div>
        </template>
      </div>
    </div>

    <!--工具条-->
    <div class="page" v-show="totalPage > 1">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handlePageChange"
        :page-count="totalPage"
        :current-page="searchData.page"
      />
    </div>

    <!--选择可预订团期弹窗-->
    <el-dialog title="选择可预订团期" :visible.sync="showTuanListDialog">
      <div class="table-content" v-loading="tuanListLoading">
        <el-table :data="tuanList" border style="width: 100%">
          <el-table-column
            prop="departure_date"
            label="出发日期"
            width="100"
            align="center"
          />
          <el-table-column
            prop="remain_num"
            label="余位"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.need_second_confirm == 1">需二次确认</span>
              <span v-else>{{ scope.row.remain_num }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price_info" label="建议价" header-align="center" min-width="250">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="hover" :open-delay="500">
                <template v-for="(price, index) in scope.row.price_info">
                  <p v-if="price.detail_name.length" :key="index">
                    {{ price.detail_name.join('+') }}：
                    <span class="color-orange">{{ price.sum_out_price }}</span>
                  </p>
                </template>
                <div slot="reference">
                  <template v-for="(price, index) in filterPriceInfo(scope.row.price_info)">
                    <p v-if="price.detail_name.length" :key="index">
                      {{ price.detail_name.join('+') }}：
                      <span class="color-orange">{{ price.sum_out_price }}</span>
                      <span v-if="scope.row.price_info.length > 2 && index == 1">...</span>
                    </p>
                  </template>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="price_info" :label="peer_price_name" header-align="center" min-width="250">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="hover" :open-delay="500">
                <template v-for="(price, index) in scope.row.price_info">
                  <p v-if="price.detail_name.length" :key="index">
                    {{ price.detail_name.join('+') }}：
                    <span class="color-orange">{{ price.sum_peer_price }}</span>
                  </p>
                </template>
                <div slot="reference">
                  <template v-for="(price, index) in filterPriceInfo(scope.row.price_info)">
                    <p v-if="price.detail_name.length" :key="index">
                      {{ price.detail_name.join('+') }}：
                      <span class="color-orange">{{ price.sum_peer_price }}</span>
                      <span v-if="scope.row.price_info.length > 2 && index == 1">...</span>
                    </p>
                  </template>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            align="center"
            width="160"
            fixed="right"
          >
            <template slot-scope="scope">
              <router-link
                v-if="$menuPermission('api/tuan/sale_add_order') && (!tuanListParams.sale_org_id || isStore)"
                :to="{path: orderPath,query:{id:scope.row.id, sale_org_id: tuanListParams.sale_org_id}}"
              >
                {{ isStore ? '门店下单' : '同行下单' }}
              </router-link>
              <router-link
                v-if="$menuPermission('api/tuan/sale_add_zhike_order') && !isStore"
                :to="{path: zhiKeOrderPath, query: {id: scope.row.id, sale_org_id: tuanListParams.sale_org_id}}"
              >
                直客下单
              </router-link>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <div class="page" v-show="tuanListTotalPage > 1">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleTuanListPageChange"
            :page-count="tuanListTotalPage"
            :current-page="tuanListParams.page"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import {
  selfSaleProductList,
  distributionProductList
} from 'src/api/product';
import { saleBookTuanList } from 'src/api/tuan';

export default ({
  components: {
    SearchItemDateRange
  },
  filters:{
    //限制字数，超出省略号
    limitNum(val,num) {
      if(val && val.length > num) {
        return val.substr(0,num) + '...';
      } else {
        return val;
      }
    }
  },
  data() {
    const { query } = this.$route;

    return {
      LINE_TYPE_MAP: {},
      LINE_TYPE_COLOR_MAP: ['#FF6600', '#FF6600', '#B10C79', '#019F3D', '#7471F9', '#E33DBE', '#019F3D'],
      departureDate: [query.departure_date_start, query.departure_date_end],
      searchInput: {
        // trip_days: '',
        // product_no: query.product_no || '',
        // name: query.name || '',
        // operator_name: query.operator_name || '',
        // departure_date_start: query.departure_date_start || '',
        // departure_date_end: query.departure_date_end || '',
        // departure_city: query.departure_city || '',
        // page: parseInt(query.page) || 1,
        // page_size: query.page_size || 10
      },
      searchData: {
        trip_days: '',
        // 前端标识字段：当前列表是本公司产品还是其他公司产品
        is_other: query.is_other || (this.$menuPermission('api/product/self_sale_product_list') ? 1 : 2),
        product_no: query.product_no || '',
        name: query.name || '',
        operator_name: query.operator_name || '',
        departure_date_start: query.departure_date_start || '',
        departure_date_end: query.departure_date_end || '',
        departure_city: query.departure_city || '',
        line_type: query.line_type || '',
        page: parseInt(query.page) || 1,
        // page_size: query.page_size || 10
      },
      lineList: [],
      totalPage: parseInt(query.page) || 1,
      tuanListParams: {
        product_id: 0,
        sale_org_id: '',  // 其他公司产品下单时使用，对应产品的sale_org_id字段
        page: 1,
        page_size: 10
      },
      tuanListTotalPage: 1,
      tuanListLoading: false,
      tuanList: [],
      userType: 1,  // 1 分公司  2 门店
      showTuanListDialog: false
    };
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isSale() { // 是否从销售中心进入
      return this.topMenuConst == 'sale';
    },
    isStore() { // 是否门店
      return this.userType == 2;
    },
    peer_price_name() {
      return '同行价';
    },
    out_price_name() {
      return '建议价';
    },
    orderPath() {
      if (this.searchData.is_other == 2) {
        return 'line-list/order4other'
      } else {
        return 'line-list/order'
      }
    },
    zhiKeOrderPath() {
      if (this.searchData.is_other == 2) {
        return 'line-list/zhike-order4other'
      } else {
        return 'line-list/zhike-order'
      }
    }
  },
  watch:{
    '$route.query.is_other':function(is_other){
      const query = this.$route.query;
      console.log('change is_other: ', is_other, query)

      this.searchData = {
        trip_days: '',
        // 前端标识字段：当前列表是本公司产品还是其他公司产品
        is_other: is_other || (this.$menuPermission('api/product/self_sale_product_list') ? 1 : 2),
        product_no: query.product_no || '',
        name: query.name || '',
        operator_name: query.operator_name || '',
        departure_date_start: query.departure_date_start || '',
        departure_date_end: query.departure_date_end || '',
        departure_city: query.departure_city || '',
        line_type: query.line_type || '',
        page: parseInt(query.page) || 1,
        // page_size: query.page_size || 10
      },
      
      this.getLineList();
    }
  },
  mounted() {
    this.getLineList();
  },
  methods: {
    getLineList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      this.searchData.page_size = 10;
      const productListFunc = this.searchData.is_other == 1 ? selfSaleProductList : distributionProductList;

      productListFunc({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.lineList = data.data.data;
            this.LINE_TYPE_MAP = data.data.line_type_list || {};
            this.totalPage = data.data.total_page;
            this.searchData.page = data.data.page_index;
            // this.searchData.page_size = data.data.page_size;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getDetailUrl(item) {
      const path = this.searchData.is_other == 1 ? 'line-list/detail' : 'line-list/detail4other'
      switch(this.topMenuConst){
      default:
        return {path, query: {id: item.id}};
      }
    },
    getSaleBookTuanList() {
      this.tuanListLoading = true;

      saleBookTuanList({
        params: {data: this.tuanListParams},
        success: (params) => {
          const {code, msg, data} = params.data;

          this.tuanListLoading = false;
          if (code == '0') {
            this.tuanList = data.data;
            this.userType = data.user_type;
            this.tuanListParams.page = data.page_index;
            this.tuanListTotalPage = data.total_page;
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    handleChangeDeparture(date) {
      this.searchInput.departure_date_start = date[0] || '';
      this.searchInput.departure_date_end = date[1] || '';
    },
    handleSearch(){
      this.getLineList(true);
      this.$router.replace({query: this.searchData});
    },
    handlePageChange(val) {
      if(val != this.searchData.page){
        this.searchData.page = val;
        this.departureDate = [this.searchData.departure_date_start, this.searchData.departure_date_end];
        this.getLineList();
        this.$router.replace({query: this.searchData});
      }
    },
    handleBook(id, sale_org_id){
      this.tuanListParams.product_id = id;
      this.tuanListParams.page = 1;
      if(this.searchData.is_other == 2){
        this.tuanListParams.sale_org_id = sale_org_id
      }else{
        this.tuanListParams.sale_org_id = ''
      }
      this.showTuanListDialog = true;
      this.getSaleBookTuanList();
    },
    handleTuanListPageChange(val){
      if(val != this.tuanListParams.page){
        this.tuanListParams.page = val;
        this.getSaleBookTuanList();
      }
    },
    //最多截取前3条日期
    limitDate(dateList) {
      if(dateList && dateList.length > 3) {
        return dateList.slice(0,3);
      } else {
        return dateList;
      }
    },
    orderCurrentPageChange(val) {
      if(this.reservePagination.page_index != val){
        this.reservePagination.page_index = val;
        this.getReserveList();
      }
    },
    reserve(productId) {
      this.productId = productId;
      this.dialogReserveVisible= true;
      this.reservePagination.page_index = 1;
      this.getReserveList();
    },
    getReserveList() {
      const getReserveList = getTripReserveList;
      let params = {
        'data':{
          'product_id':this.productId,
          'page':this.reservePagination.page_index,
          'page_size':this.reservePagination.page_size
        }
      };

      getReserveList({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.reserveList = data.data.data;
            this.reservePagination.total_count = data.data.total_count;
            this.reservePagination.page_index = data.data.page_index;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    //过滤价格列表
    filterPriceInfo(priceInfo) {
      if(priceInfo) {
        return priceInfo.slice(0,2);
      } else {
        return [];
      }
    }
  }
});
</script>

<style scoped lang="scss">
  .trip-item {
    position: relative;
    height: 145px;
    border: 1px solid #e6e7e7;
    padding: 15px;
    margin-bottom: 10px;
    background: #fff;
    color: #999;
    cursor: pointer;
    display: block;

    .trip-left {
      position: absolute;
      width: 220px;
      height: 145px;
      top: 15px;
      left: 15px;
      .trim-img {
        position: relative;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;

        .type-tag {
          position: absolute;
          padding: 4px 6px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          top: 0;
          left: 0;
          background: #ff6600;
        }
      }
    }
    .trip-middle {
      position: relative;
      margin: 0 235px;
      left: 0;
      bottom: 0;

      .trip-code {
        line-height: 1;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;

        span {
          width: 49%;
          display: inline-block;
          padding-right: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
      .trip-title {
        max-height: 48px;
        font-size: 18px;
        line-height: 24px;
        margin-top: 8px;
        color: #333;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        .trip-day {
          font-weight: bold;
          margin-left: 8px;
        }
      }
      .trip-message {
        margin-top: 12px;
        .trip-departureCity {
          padding: 5px 8px;
          background-color: #eee;
          color: #333;
          border-radius: 3px;
          margin-right: 8px;
        }
      }
    }
    .trip-right {
      position: absolute;
      right: 15px;
      top: 15px;

      .right-box {
        float: right;
        width: 150px;
        padding-top: 25px;

        p {
          position: relative;
          height: 28px;
          line-height: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          .price-title {
            position: absolute;
            left: 0;
            bottom: 0;
          }
          .price-content {
            position: absolute;
            right: 0;
            bottom: 0;
          }
          .price {
            font-size: 24px;
          }
        }
        button {
          display: block;
          width: 125px;
          height: 35px;
          margin: 16px auto 0;
        }
      }
    }
  }

  .warm-tip {
    background: #fff;
    padding: 70px 0 130px;
    p {
      text-align: center;
      padding-top: 85px;
      color: #5e7382;
      background: url("../../assets/icons/empty_data.png") no-repeat center top;
      background-size: 80px 60px;
    }
  }
</style>
