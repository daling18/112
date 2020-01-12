<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">所在城市</div>
            <zone-autocomplete v-model="filter.city_id"></zone-autocomplete>
        </div>
        <div class="search-item">
          <div class="label">景区等级</div>
          <el-select v-model="filter.grade" placeholder="请选择">
            <el-option label="全部" :value="-1"></el-option>
            <el-option label="非A" :value="0"></el-option>
            <el-option label="1A" :value="1"></el-option>
            <el-option label="2A" :value="2"></el-option>
            <el-option label="3A" :value="3"></el-option>
            <el-option label="4A" :value="4"></el-option>
            <el-option label="5A" :value="5"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">景区名称</div>
          <el-input v-model="filter.scenic_title" placeholder="景区名称"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="queryFilterHandler(1)">搜索</el-button>
        </div>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="trip-content">
        <template v-if="tableData && tableData.length">
          <div v-for="(item,index) in tableData" class="trip-item" :key="index" >
            <img class="trip-left" src="../../assets/bitmap.png">
            <div class="trip-left" >
              <div class="trim-img" :style="{'background-image':'url('+item.img_path+')','z-index':6}">
                <!-- <span class="type-tag" :style="{'background-color':item.large_type==='跟团游'?'#ff6600':'#019f3d'}">{{ item.large_type }}</span> -->
              </div>
            </div>
            <div class="trip-middle">
              <p class="trip-title" :title="item.title">
                {{ item.title }}
                <span class="trip-day" v-if="item.grade">{{ item.grade }}</span>
              </p>
              <div class="trip-message">
                <template v-if="item.tag_list && item.tag_list.length">
                  <span v-for="(tag,idx) in item.tag_list" :key="idx" 
                    class="trip-departureCity">{{ tag }}</span>
                </template>
              </div>
              <div class="trip-message color-black" v-if="item.address">{{ item.address }}</div>
            </div>
            <div class="trip-right">
              <div class="right-box">
                <p class="mb15">
                  <span class="price-title">建议价：</span>
                  <span class="price-content">
                    <span class="color-orange">¥ <span class="price">{{ item.min_price }}</span> </span> 起
                  </span>
                </p>
                <el-button type="primary" @click="$router.push({path:'/salecenter/ticket-detail',query:{id:item.id}})">预订</el-button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="warm-tip">
            <p>没有符合您搜索条件的信息，做些其他尝试吧。 :)</p>
          </div>
        </template>
      </div>
    </div>

    <!--工具条-->
    <div class="page" v-if="pagination.total_count">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="pagination.total_count"
        :current-page="pagination.page_index"/>
    </div>

   
  </div>
</template>

<script>
import {getScenicList } from 'src/api/ticket';
import ZoneAutocomplete from './components/HotelCityPicker.vue';

export default ({
  data() {
    return {
      filter: {
        city_id: '',
        grade: -1,
        scenic_title: '',
      },
      tableData:null,
      pagination:{
        total_count: 0,
        total_page: 1,
        page_index: 1,
        page_size: 10,
      }
    };
  },
  components:{
    ZoneAutocomplete
  },
  watch: {
    $route () {
      this.initFilterHandler();
    }
  },
  methods: {
    // 初始化筛选项
    initFilterHandler(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.filter = {
          city_id: '',
          grade: -1,
          scenic_title: '',
        };
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        let jsonFilter = JSON.parse(filter);
        this.$set(this, 'filter', jsonFilter);
        this.$set(this.pagination, 'page_index', jsonFilter.page_index);
      }
      this.getTicketDataList();
    },
    getTicketDataList() {
      let para = {};
       let query = Object.assign({},this.$route.query),
          filter = query.filter;
          if(filter){
            filter = JSON.parse(window.decodeURIComponent(window.atob(filter)));
           this.filter= para.data = filter;
            // para.data.city_id = filter.city_id;
            // para.data.scenic_title = filter.scenic_title;
            // para.data.grade = filter.grade;
          }else{
            para.data = JSON.parse(JSON.stringify(this.filter));
          }
      para.data.page_index = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;
      
      getScenicList({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (code == '0') {
            this.$set(this,'tableData',data.list);
            this.$set(this.pagination,'page_index', data.page_index);
            this.$set(this.pagination,'total_count', data.total_count);
            this.$set(this.pagination,'total_page', data.total_page);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 搜索筛选函数
    queryFilterHandler(page){
      let filter = this.filter;

      filter.page_index = page;
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    currentPageChange(page){
      this.queryFilterHandler(page);
    },
  },
  mounted() {
    this.getTicketDataList();
  },
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
