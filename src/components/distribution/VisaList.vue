<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">签证名称</div>
        <el-input v-model="searchInput.visa_name" placeholder="请输入签证名称" />
      </div>
      <div class="search-item">
        <div class="label">签证大洲</div>
        <el-select v-model="searchInput.continent" placeholder="请选择">
          <el-option value="" label="全部"/>
          <el-option v-for="(val, key) in VISA_CONTINENT_MAP" :key="key" :label="val" :value="val" />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">签证国家</div>
        <el-input v-model="searchInput.nation_name" placeholder="请输入签证国家" />
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <template v-if="list && list.length">
          <div v-for="item in list" class="list-item flex" :key="item.id">
            <div class="item-image" :style="item.pic_url ? 'background-image: url('+item.pic_url+')' : ''" />
            <div class="item-con flex-1">
              <div class="item-title">{{ item.name }}</div>
              <div class="item-field ellipsis">
                <label class="item-lab">签证国家</label>{{ item.nation_name }}
              </div>
              <div class="item-field ellipsis">
                <label class="item-lab">预订时间</label>提前{{ item.forward_day }}个工作日
              </div>
              <div class="item-field ellipsis" v-if="item.accept_range">
                <label class="item-lab">受理范围</label>{{ item.accept_range }}
              </div>
              <div class="item-field ellipsis">
                <label class="item-lab">签证类型</label>{{ item.visa_type_name }}
              </div>
              <div class="item-field ellipsis" v-if="item.success_rate">
                <label class="item-lab">出签率</label>{{ item.success_rate }}%
              </div>
              <div class="item-field ellipsis">
                <label class="item-lab">送签地</label>{{ item.send_city_name }}
              </div>
            </div>
            <div class="item-ope">
              <div>结算价
                <span class="color-orange">￥{{ item.adult_peer_price }}</span>
                <span class="color-gray">起</span>
              </div>
              <div>销售价
                <span class="color-orange">￥{{ item.adult_out_price }}</span>
                <span class="color-gray">起</span>
              </div>
              <router-link
                class="el-button el-button--primary"
                v-if="$menuPermission('api/selfsupport.visa/visa_detail')"
                :to="{path: 'detail', query: {id: item.id}}"
              >查看详情</router-link>
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
    <div class="page" v-show="totalPage > 1">
      <el-pagination layout="prev, pager, next" @current-change="handlePageChange" :page-count="totalPage" :current-page="searchData.page_index" />
    </div>
  </div>
</template>

<script>
import { bookList } from 'src/api/selfsupport.visa';

export default {
  data() {
    const { query } = this.$route;

    return {
      departureDate: [query.departure_date_start, query.departure_date_end],
      VISA_CONTINENT_MAP: {},
      searchInput: {},
      searchData: {
        visa_name: query.visa_name || '',
        continent: query.continent || '',
        nation_name: query.nation_name || '',
        page_index: parseInt(query.page_index) || 1
        // page_size: query.page_size || 10
      },
      list: [],
      totalPage: parseInt(query.page_index) || 1
    };
  },
  computed: {},
  mounted() {
    this.getList();
  },
  methods: {
    getList(isSearch) {
      if (isSearch) {
        this.searchData = { ...this.searchInput };
        this.searchData.page = 1;
      } else {
        this.searchInput = { ...this.searchData };
      }
      this.searchData.page_size = 10;

      bookList({
        params: { data: this.searchData },
        success: params => {
          let data = params.data;

          if (data.code == '0') {
            this.list = data.data.list;
            this.totalPage = data.data.total_page;
            this.VISA_CONTINENT_MAP = data.data.continent_list || [];
            this.searchData.page_index = data.data.page_index;
            // this.searchData.page_size = data.data.page_size;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSearch() {
      this.getList(true);
      this.$router.replace({ query: this.searchData });
    },
    handlePageChange(val) {
      if (val != this.searchData.page) {
        this.searchData.page_index = val;
        this.departureDate = [
          this.searchData.departure_date_start,
          this.searchData.departure_date_end
        ];
        this.getList();
        this.$router.replace({ query: this.searchData });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.system-content .content-list{
  padding: 0 15px;
}
.list-item {
  padding: 15px 0;
  border-bottom: 1px solid #f1f1f1;
  .item-image {
    width: 220px;
    height: 145px;
    margin-right: 20px;
    background-image: url('../../assets/bitmap.png');
    background-size: cover;
    background-position: center;
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
  }
  .item-title {
    font-size: 16px;
    font-weight: bold;
  }
  label.item-lab {
    width: 56px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
    color: #999;
  }
  .item-ope {
    padding: 30px 0;
    text-align: center;
    width: 170px;
    .el-button{
      margin-top: 10px;
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
    background: url('../../assets/icons/empty_data.png') no-repeat center top;
    background-size: 80px 60px;
  }
}
</style>
