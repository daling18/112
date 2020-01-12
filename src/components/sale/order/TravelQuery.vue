<template>
  <div class="wrapper">
    <div class="system-tab" v-if="isSale">
      <ul class="tab-box">
        <li class="on">行程查询</li>
        <router-link tag="li" to="/sale/order/tuan-list">团队查询</router-link>
      </ul>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <search-item-date-range :label="'出发日期'" @change="updateRange"/>
      <div class="search-item">
        <div class="label">行程编号</div>
        <el-input v-model="searchDate.product_no"/>
      </div>
      <div class="search-item">
        <div class="label">行程名称</div>
        <el-input placeholder="" v-model="searchDate.name"/>
      </div>
      <div class="search-item">
        <div class="label">行程天数</div>
        <el-input placeholder="" v-model.number="searchDate.trip_days"/>
      </div>
      <div class="search-item">
        <div class="label">计调</div>
        <el-input v-model="searchDate.operator_name"/>
      </div>
      <div class="search-item">
        <div class="label">出发地</div>
        <el-input v-model="searchDate.departure_city"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getTripList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div :class="isStoreSale ? 'trip-content store-sale' : 'trip-content'">
        <template v-if="tripList && tripList.length">
          <router-link v-for="item in tripList" class="trip-item" :key="item.id" :to="getDetailUrl(item)">
            <img class="trip-left" src="../../../assets/bitmap.png">
            <div class="trip-left" >
              <div class="trim-img" :style="{'background-image':'url('+item.trip_pic_url+')','z-index':6}">
                <span class="type-tag" :style="{'background-color':item.large_type==='跟团游'?'#ff6600':'#019f3d'}">{{ item.large_type }}</span>
              </div>
            </div>
            <div class="trip-middle">
              <div class="trip-code">
                <span :title="item.product_no">
                  行程编号：{{ item.product_no }}
                </span>
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
              <div class="trip-message color-black" :title="'供应商：'+ item.supplier+' 可下单金额：¥'+item.still_to_place_order_amount" v-if="isStoreSale && item.supplier">
                供应商：{{ item.supplier }}
              </div>
            </div>
            <div class="trip-right">
              <div class="right-box">
                <template v-if="isSale">
                  <p>
                    <span class="price-title">销售价：</span>
                    <span class="price-content">
                      <span class="color-orange">¥ <span class="price">{{ item.out_price }}</span> </span> 起
                    </span>
                  </p>
                  <p>
                    <span class="price-title">结算价：</span>
                    <span class="price-content">
                      <span class="color-orange">¥ <span class="price">{{ item.peer_price }}</span> </span> 起
                    </span>
                  </p>
                </template>
                <template v-if="isStoreSale">
                  <p class="margin-b-42">
                    <span class="price-title">建议价：</span>
                    <span class="price-content">
                      <span class="color-orange">¥ <span class="price">{{ item.out_price }}</span> </span> 起
                    </span>
                  </p>
                </template>
                <el-button type="primary" @click.prevent="reserve(item.id)">预订</el-button>
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
    <div class="page" v-show="tripList && tripList.length">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="pagination.total_count"
        :page-size="pagination.page_size"
        :current-page="pagination.page_index"
      />
    </div>

    <!--选择可预订团期弹窗-->
    <el-dialog title="选择可预订团期" :visible.sync="dialogReserveVisible">
      <div class="table-content">
        <el-table
          :data="reserveList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="departure_date"
            label="出发日期"
            header-align="center"
            width="100"
            align="center"
          />
          <el-table-column
            prop="remain_num"
            label="余位"
            header-align="center"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.need_second_confirm == 1">需二次确认</span>
              <span v-else>{{ scope.row.remain_num }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="price_info"
            :label="out_price_name"
            header-align="center"
            min-width="250"
          >
            <template slot-scope="scope">
              <el-popover
                placement="left"
                trigger="hover"
                :open-delay="500"
              >
                <template v-for="(n,index) in scope.row.price_info">
                  <p v-if="n.detail_name.length" :key="index">
                    <span v-for="(item,i) in n.detail_name" :key="i">
                      <span v-if="i > 0">+</span>
                      {{ item }}
                      <span v-if="i === n.detail_name.length -1">：</span>
                    </span>
                    <span class="color-orange">{{ n.sum_out_price }}</span>
                  </p>
                </template>
                <div slot="reference">
                  <template v-for="(n,index) in filterPriceInfo(scope.row.price_info)">
                    <p v-if="n.detail_name.length">
                      <span v-for="(item,i) in n.detail_name">
                        <span v-if="i > 0">+</span>
                        {{ item }}
                        <span v-if="i === n.detail_name.length -1">：</span>
                      </span>
                      <span class="color-orange">{{ n.sum_out_price }}</span>
                      <span v-if="scope.row.price_info.length > 2 && index == 1">...</span>
                    </p>
                  </template>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="price_info"
            :label="peer_price_name"
            header-align="center"
            min-width="250"
          >
            <template slot-scope="scope">
              <el-popover
                placement="left"
                trigger="hover"
                :open-delay="500"
              >
                <template v-for="(n,index) in scope.row.price_info">
                  <p v-if="n.detail_name.length">
                    <span v-for="(item,i) in n.detail_name">
                      <span v-if="i > 0">+</span>
                      {{ item }}
                      <span v-if="i === n.detail_name.length -1">：</span>
                    </span>
                    <span class="color-orange">{{ n.sum_peer_price }}</span>
                  </p>
                </template>
                <div slot="reference">
                  <template v-for="(n,index) in filterPriceInfo(scope.row.price_info)">
                    <p v-if="n.detail_name.length">
                      <span v-for="(item,i) in n.detail_name">
                        <span v-if="i > 0">+</span>
                        {{ item }}
                        <span v-if="i === n.detail_name.length -1">：</span>
                      </span>
                      <span class="color-orange">{{ n.sum_peer_price }}</span>
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
              <template v-if="isSale">
                <router-link v-if="$menuPermission('api/tuan/sale_add_order')" :to="getOrderFormUrl(scope.row)">
                  同行下单
                </router-link>
                <router-link v-if="$menuPermission('api/tuan/sale_add_zhike_order')" :to="{path:'form_zhike',query:{id:scope.row.id,order_no:''}}">
                  直客下单
                </router-link>
              </template>
              <template v-if="isStoreSale">
                <router-link v-if="$menuPermission('api_store/sale/add_order')" :to="getOrderFormUrl(scope.row)">
                  下单
                </router-link>
              </template>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <div class="page">
          <el-pagination
            layout="prev, pager, next"
            @current-change="orderCurrentPageChange"
            :total="reservePagination.total_count"
            :page-size="reservePagination.page_size"
            :current-page="reservePagination.page_index"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchItemDateRange from 'src/plugins/SearchItemDateRange';
import { getSaleTripGroupList,getTripReserveList } from 'src/api/api';
import {saleProductList, saleSaleBookTuanList} from 'src/api/api_store';

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
    return {
      productId:0,
      searchDate:{
        product_no:'',
        name:'',
        trip_days: '',
        operator_name:'',
        departure_date_start:'',
        departure_date_end:'',
        departure_city:'',
      },
      tripList:[],
      pagination: {
        total_count: 0,
        page_size: 10,
        page_index: 1,
      },
      dialogReserveVisible:false,
      reserveList:[],
      //可预订团期弹窗分页
      reservePagination: {
        total_count: 0,
        page_size: 10,
        page_index: 1,
      }
    };
  },
  computed: {
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isSale() { // 是否从销售中心进入
      return this.topMenuConst == 'sale';
    },
    isStoreSale() { // 是否从营业部销售进入
      return this.topMenuConst == 'store-sale';
    },
    peer_price_name() {
      return this.isSale ? '结算价' : '同行价';
    },
    out_price_name() {
      return this.isSale ? '销售价' : '建议价';
    }
  },
  watch:{
    '$route':function(to,from){
      this.initData();
      this.getTripList();
    }
  },
  mounted() {
    this.getTripList();
  },
  methods: {
    initData() {
      this.searchDate = {
        product_no:'',
        name:'',
        trip_days: '',
        operator_name:'',
        departure_date_start:'',
        departure_date_end:'',
        departure_city:'',
      };
      this.pagination.page_index = 1;
    },
    getTripList(bool) {
      const getOrderList = this.isSale ? getSaleTripGroupList : saleProductList;
      let params = {
        data: this.searchDate
      };

      if(bool) {
        this.pagination.page_index = 1;
      }

      params.data.page = this.pagination.page_index;
      params.data.page_size = this.pagination.page_size;
      getOrderList({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tripList = data.data.data;
            this.pagination.total_count = data.data.total_count;
            this.pagination.page_index = data.data.page_index;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });

    },
    getDetailUrl(item) {
      switch(this.topMenuConst){
      case 'sale': 
        return {path: 'tripDetail', query: {id: item.id}};
      case 'store-sale':
        return {path: 'product-detail', query: {id: item.id}};
      }
    },
    getOrderFormUrl(item) {
      switch(this.topMenuConst){
      case 'sale': 
        return {path:'form', query: {id: item.id, order_no: ''}};
      case 'store-sale':
        return {path: 'order-form', query: {id: item.id, order_no: ''}};
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
    updateRange(date) {
      this.searchDate.departure_date_start = date[0] || '';
      this.searchDate.departure_date_end = date[1] || '';
    },
    currentPageChange(val) {
      if(this.pagination.page_index != val){
        this.pagination.page_index = val;
        this.getTripList();
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
      const getReserveList = this.isSale ? getTripReserveList : saleSaleBookTuanList;
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
  .store-sale {
    .trip-item {
      height: 145px;
      .trip-left {
        height: 145px;
      }
    }

  }
  .trip-item {
    position: relative;
    height: 125px;
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
      height: 125px;
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
        margin-top: 10px;
        color: #333;
        overflow: hidden;

        .trip-day {
          font-weight: bold;
          margin-left: 8px;
        }
      }
      .trip-message {
        margin-top: 14px;
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
        padding-top: 12px;

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
        .margin-b-42 {
          margin-bottom: 42px
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
      background: url("../../../assets/icons/empty_data.png") no-repeat center top;
      background-size: 80px 60px;
    }
  }
</style>
