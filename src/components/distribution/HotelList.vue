<template>
  <div class="wrapper">
    <div class="system-search">
      <div class="system-search-panel">
        <div class="search-item">
          <div class="label">所在城市</div>
          <hotel-city-picker v-model="filters.city_id"></hotel-city-picker>
        </div>
        <div class="search-item">
          <div class="label">入离时间</div>
          <el-date-picker
            :class="'date-picker'"
            v-model="filters.time"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="search-item">
          <div class="label">关键字</div>
          <el-input v-model="filters.keyword"/>
        </div>
      </div>
      <div class="system-search-panel">
        <div class="filter-item">
          <div class="filter-item-label">价格：</div>
          <div class="filter-item-btn" :class="{ 'on': !filters.price }" @click="clearFilterPriceHandler">不限</div>
          <div class="filter-item-content">
            <el-radio-group v-model="filters.price" @change="changeFilterPriceHandler">
              <template v-for="(item, key) in filterTags">
                <el-radio :class="'filters-radio'" v-if="item.type == 'price'" :key="key" :label="item.value">
                  {{ item.label }}
                </el-radio>
              </template>
            </el-radio-group>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-label">星级：</div>
          <div class="filter-item-btn" :class="{ 'on': !filters.star_code.length }" @click="clearFilterStarHandler">不限</div>
          <div class="filter-item-content">
            <el-checkbox-group v-model="filters.star_code" @change="changeFilterStarHandler">
              <template v-for="(item, key) in filterTags">
                <el-checkbox :class="'filters-checkbox'" v-if="item.type == 'star'" :key="key" :label="item.value">
                  {{ item.label }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
        </div>
        <div class="filter-item fixed-button-area">
          <div class="search-item search-button">
            <el-button type="primary" @click="searchHotelHandler(1)">立即搜索</el-button>
          </div>
        </div>
        <div class="filter-tag">
          <div class="filter-total">
            <span>{{ hotelTotal }}</span>家酒店符合条件
          </div>
          <div class="filter-tag-content">
            <template v-for="(item, key) in filterTags">
              <div v-if="item.hidden" :key="key" class="filter-tag-item">
                {{ item.label }}
                <i class="el-icon-close" @click="delFilterTagHandler(item, key)"></i>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="hotel">
      <div v-for="(hotel, key) in hotels" :key="key" class="hotel-item">
        <div class="hotel-item-content">
          <div class="hotel-item-picture">
            <img :src="hotel.default_img">
          </div>
          <div class="hotel-item-info">
            <div class="hotel-item-title">
              {{ hotel.hotel_name }}
            </div>
            <div class="hotel-item-star">
              <i v-for="(num, key) in 5" :key="key" :class="{ 'on': num <= hotel.star_code }" class="fa fa-star"></i>
            </div>
            <div class="hotel-item-address">
              {{ hotel.hotel_address }}
            </div>
          </div>
        </div>
        <div class="hotel-item-other">
           <div class="hotel-item-lowprice">
             参考价&nbsp;&nbsp;<span>￥{{ hotel.low_price }}</span>&nbsp;<i>起</i>
           </div>
           <div v-if="$menuPermission('api/hotel/detail')" class="hotel-item-buybtn">
             <el-button type="primary" @click="$router.push({ name: 'DistributionHotelDetail', query: { hotelId: hotel.hotel_code, time: +new Date(filters.time[0]) + '|' + +new Date(filters.time[1]) } })">预订</el-button>
           </div>
        </div>
      </div>
    </div>
    <div v-if="hotels && hotels.length" class="page">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="hotelTotal"
        :page-size="pageSize"
        :current-page="filters.page_index"
      />
    </div>
  </div>
</template>

<script>
import { searchDistributionHolelAsyncRequest } from 'src/api/hotel';
import HotelCityPicker from './components/HotelCityPicker.vue';
import * as format from "src/utils/format";
export default {
  data(){
    return {
      hotels: null,
      hotelTotal: 0,
      pageSize: null,
      filters:{
        city_id: "",
        time: [],
        keyword: "",
        price: "",
        star_code: [],
        page_index: 1
      },
      filterTags: [
        {
          type: 'price',
          label: '0-150',
          value: '0-150',
          hidden: false
        },
        {
          type: 'price',
          label: '150-300',
          value: '150-300',
          hidden: false
        },
        {
          type: 'price',
          label: '301-450',
          value: '301-450',
          hidden: false
        },
        {
          type: 'price',
          label: '451-600',
          value: '451-600',
          hidden: false
        },
        {
          type: 'price',
          label: '600以上',
          value: '600-1000000000',
          hidden: false
        },
        {
          type: 'star',
          label: '二星及以下/经济',
          value: '0,1,2',
          hidden: false
        },
        {
          type: 'star',
          label: '三星/舒适',
          value: '3',
          hidden: false
        },
        {
          type: 'star',
          label: '四星/高档',
          value: '4',
          hidden: false
        },
        {
          type: 'star',
          label: '五星/豪华',
          value: '5',
          hidden: false
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    }
  },
  watch: {
    $route(val, oldVal){
      this.initHotelFiltersHandler();
    }
  },
  components:{
    HotelCityPicker
  },
  methods: {
    initHotelFiltersHandler(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filters = {
          city_id: "",
          time: [],
          keyword: "",
          price: "",
          star_code: [],
          page_index: 1
        }
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        this.$set(this, 'filters', JSON.parse(filter));
        this.searchDistributionHolelAsyncRequestHanlder();
      }
      this.changeFilterPriceHandler();
      this.changeFilterStarHandler();
    },
    searchDistributionHolelAsyncRequestHanlder(){
      let params = Object.assign({}, this.filters);
      params.check_in_date = format.date(params.time[0]);
      params.check_out_date = format.date(params.time[1]);
      params.star_code = params.star_code.join(',');
      searchDistributionHolelAsyncRequest({
        params: {
          data: params
        },
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.hotels = data.list;
            this.pageSize = data.page_size;
            this.hotelTotal = data.total_count;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    searchHotelHandler(page){
      let filter = this.filters;

      if(!filter.city_id){
        this.$message.error('请选择所在城市！');
        return;
      }
      
      if(filter.time.length < 2 || !filter.time[0] || !filter.time[1]){
        this.$message.error('请选择入离时间！');
        return;
      }

      filter.page_index = page;
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    clearFilterPriceHandler(){
      this.filterTags.map((i) => {
        if(i.type == 'price'){
          i.hidden = false;
        }
      });
      this.filters.price = null;
    },
    changeFilterPriceHandler(){
      this.filterTags.map((i) => {
        if(i.type == 'price'){
          if(i.value == this.filters.price){
            i.hidden = true;
          }else{
            i.hidden = false;
          }
        }
      });
    },
    clearFilterStarHandler(){
      this.filterTags.map((i) => {
        if(i.type == 'star'){
          i.hidden = false;
        }
      });
      this.filters.star_code = [];
    },
    changeFilterStarHandler(){
      this.filterTags.map((i) => {
        if(i.type == 'star'){
          if(this.filters.star_code.indexOf(i.value) > -1){
            i.hidden = true;
          }else{
            i.hidden = false;
          }
        }
      });
    },
    delFilterTagHandler(tag, key){
      switch(tag.type){
        case 'price':
          this.filters.price = '';
          break;
        case 'star':
          let index = this.filters.star_code.indexOf(tag.value);
          this.filters.star_code.splice(index, 1);
          break;
      }
      this.filterTags[key].hidden = false;
    },
    currentPageChange(index){
      this.searchHotelHandler(index);
    }
  },
  mounted(){
    this.initHotelFiltersHandler();
  }
}
</script>

<style lang="less" scoped>
.system-search{
  padding-right: 20px;
}
  .system-search-panel{
    padding-top: 15px;
    position: relative;
    &:first-child{
      padding-top: 0;
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
    }
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .fixed-button-area{
      position: absolute;
      right: 50px;
      top :50px;
    }
  }
  .date-picker{
    width: 200px !important;
  }
  .filter-item{
    margin-bottom: 22px;
    .filter-item-label{
      float: left;
      text-align: right;
      width: 60px;
      color: #999;
      line-height: 22px;
    }
    .filter-item-btn{
      float: left;
      width: 60px;
      padding: 2px 5px;
      border: 1px solid #ddd;
      text-align: center;
      line-height: 20px;
      margin-left: 10px;
      cursor: pointer;

      &.on{
        color: #ffffff;
        background-color: #b10c79;
        border-color: #b10c79;
      }
    }
    .filter-item-content{
      margin-left: 160px;
      line-height: 24px;
      color: #333 !important;

      .filters-checkbox,.filters-radio{
        color: #444;
      }
    }
    &::after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .filter-tag{
    display: flex;
    align-items: center;
    padding: 10px 5px;
    background-color: #f4f4f4;
    height: 32px;
    .filter-total{
      padding: 0 10px;
      span{
        color: #b10c79;
      }
    }
    .filter-tag-content{
      display: flex;
      align-items: center;
      .filter-tag-item{
        border: 1px solid #ddd;
        padding: 5px 8px;
        color: #b10c79;
        background-color: #fff;
        margin:  0 10px;
        i{
          margin-left: 5px;
          color: #ccc;
          cursor: pointer;
        }
      }
    }
  }
  .hotel{
    background-color: #fff;
    padding: 0 15px 15px;

    .hotel-item{
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;

      .hotel-item-content{
        flex: 1;
        display: flex;

        .hotel-item-picture{
          width: 75px;
          height: 75px;
          margin-right: 20px;

          img{
            width: 100%;
            height: 100%;
          }
        }

        .hotel-item-info{
          height: 75px;

          .hotel-item-title{
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 5px;
          }
          
          .hotel-item-star{
            .fa-star{
              color: #eeeeee;

              &.on{
                color: #ffdd00;
              }
            }
          }
          .hotel-item-address{
            font-size: 12px;
            margin-top: 20px;
          }
        }
      }
      .hotel-item-other{
        padding: 0 15px;
        text-align: center;
        .hotel-item-lowprice{
          margin-bottom: 5px;
          span{
            color: #ff6600;
          }
          i{
            font-style: normal;
            color: #999;
          }
        }
      }
    }
  }
</style>
