<template>
  <div class="wrapper">
    <div class="system-search">
      <div class="system-search-panel">
        <div class="search-item">
          <div class="label">所在城市</div>
          <zone-autocomplete v-model="filters.city_id"></zone-autocomplete>
        </div>
        <div class="search-item">
          <div class="label">酒店名称</div>
          <el-input v-model="filters.hotel_name" placeholder="请输入酒店名称"/>
        </div>
        <div class="search-item">
          <div class="label">酒店状态</div>
          <el-select v-model="filters.status" clearable>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="-1"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">酒店星级</div>
          <el-select v-model="filters.star_code" clearable>
            <el-option label="未评级" :value="0"></el-option>
            <el-option label="一星" :value="1"></el-option>
            <el-option label="二星" :value="2"></el-option>
            <el-option label="三星" :value="3"></el-option>
            <el-option label="四星" :value="4"></el-option>
            <el-option label="五星" :value="5"></el-option>
          </el-select>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="searchHotelHandler(1)">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="hotel">
      <el-table
        :data="hotels"
        style="width: 100%">
        <el-table-column
          header-align="center"
          label="酒店名称">
          <template slot-scope="prop">
            {{ prop.row.hotel_name }}
            <template v-if="prop.row.status == 1">
              <span class="state state-using">启用</span>
            </template>
            <template v-else>
              <span class="state state-ban">禁用</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="所在城市">
          <template slot-scope="prop">
            {{ prop.row.city ? prop.row.city.country_name + prop.row.city.province_name + prop.row.city.area_name : '' }}
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="hotel_address"
          show-overflow-tooltip
          label="酒店地址">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="star_code"
          label="酒店星级">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          width="120">
          <template slot-scope="prop">
            <el-dropdown>
              <span class="el-dropdown-link">
                操作<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{ name: 'SelfSupportHotel', query: { id: prop.row.id } }">详情</router-link>
                </el-dropdown-item>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>房型</el-dropdown-item>
                <template v-if="prop.row.status == 1">
                  <el-dropdown-item>
                    <a href="javascript:;"  @click="changeStatusHandler(prop.row.id, prop.row.status, '停用')">停用</a>
                  </el-dropdown-item>
                </template>
                <template v-else>
                  <el-dropdown-item>
                    <a href="javascript:;" @click="changeStatusHandler(prop.row.id, prop.row.status, '启用')">启用</a>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
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
import { searchSelfSupportHolelAsyncRequest, changeSelfSupportHolelStatusAsyncRequest } from 'src/api/hotel';
import ZoneAutocomplete from './zone-autocomplete/index.vue';
import * as format from "src/utils/format";
export default {
  data(){
    return {
      hotels: null,
      hotelTotal: 0,
      pageSize: null,
      filters:{
        city_id: "",
        hotel_name: "",
        status: null,
        star_code: "",
        page_index: 1
      }
    }
  },
  components:{
    ZoneAutocomplete
  },
  watch: {
    $route(val, oldVal){
      this.initHotelFiltersHandler();
    }
  },
  methods: {
    initHotelFiltersHandler(){
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
      this.searchHotelRequestHanlder();
    },
    searchHotelRequestHanlder(){
      let params = Object.assign({}, this.filters);
      
      searchSelfSupportHolelAsyncRequest({
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
      this.searchHotelHandler(index);
    },
    changeStatusHandler(id, status, txt){
      this.$confirm(`确定${ txt }该酒店?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            id: id
          }
        }
        if(status == 1){
          params['data'].status = -1;
        }else{
          params['data'].status = 1;
        }
        changeSelfSupportHolelStatusAsyncRequest({
          params: params,
          success: (params) => {
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.searchHotelRequestHanlder();
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
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
</style>
