<template>
  <div class="wrapper">
    <div class="system-search">
      <div class="system-search-panel">
        <div class="search-item">
          <div class="label">所在城市</div>
          <zone-autocomplete v-model="filter.city_id"></zone-autocomplete>
        </div>
        <div class="search-item">
          <div class="label">酒店名称</div>
          <el-input v-model="filter.hotel_name" placeholder="请输入酒店名称"/>
        </div>
        <div class="search-item">
          <div class="label">房型名称</div>
          <el-input v-model="filter.room_name" placeholder="请输入房型名称"/>
        </div>
        <div class="search-item">
          <div class="label">酒店状态</div>
          <el-select v-model="filter.status" clearable>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="-1"></el-option>
          </el-select>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="searchRoomsHandler(1)">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="hotel">
      <el-table
        :data="rooms"
        style="width: 100%">
        <el-table-column
          header-align="center"
          label="房型名称">
          <template slot-scope="prop">
            {{ prop.row.room_name }}
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
          prop="room_type_name"
          label="房型类型">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="hotel_name"
          show-overflow-tooltip
          label="所属酒店">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="所在城市">
          <template slot-scope="prop">
            {{ prop.row.city ? prop.row.city.country_name + prop.row.city.province_name + prop.row.city.city_name : '' }}
          </template>
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
                <el-dropdown-item v-if="$menuPermission('api/selfsupport.hotel/roomDetail')">
                  <router-link :to="{ name: 'SelfSupportDxRoomDetail', query: { roomId: prop.row.id } }">详情</router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('api/selfsupport.hotel/storeRoom') && prop.row.source != 4">
                  <router-link :to="{ name: 'SelfSupportDxRoomEdit', query: { roomId: prop.row.id } }">编辑</router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="$menuPermission('api/selfsupport.hotel/roomPackageList')">
                  <router-link :to="{ name: 'SelfSupportDxRoomPackage', query: { hotel_id: prop.row.hotel_id, room_id: prop.row.id, source: prop.row.source } }">套餐报价</router-link>
                </el-dropdown-item>
                <template v-if="$menuPermission('api/selfsupport.hotel/roomPackageList')">
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
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="rooms && rooms.length" class="page">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="roomsTotal"
        :page-size="pageSize"
        :current-page="filter.page_index"
      />
    </div>
  </div>
</template>

<script>
import { searchSelfSupportRoomListAsyncRequest, changeSelfSupportRoomStatusAsyncRequest } from 'src/api/hotel';
import ZoneAutocomplete from './components/HotelZoneAutocomplete.vue';
import * as format from "src/utils/format";
export default {
  data(){
    let { query } = this.$route;
    return {
      rooms: null,
      roomsTotal: 0,
      pageSize: null,
      filter:{
        city_id: query.city_id || "",
        hotel_name: query.hotel_name || "",
        status:  query.status || null,
        room_name: query.room_name || "",
        page_index: Number(query.page_index) || 1
      }
    }
  },
  components:{
    ZoneAutocomplete
  },
  watch: {
    $route(val, oldVal){
      let { query } = this.$route;
      this.filter = {
        city_id: query.city_id || "",
        hotel_name: query.hotel_name || "",
        status:  query.status || null,
        room_name: query.room_name || "",
        page_index: Number(query.page_index) || 1
      }
      this.searchRoomsRequestHandler();
    }
  },
  methods: {
    searchRoomsRequestHandler(){
      let params = Object.assign({}, this.filter);
      
      searchSelfSupportRoomListAsyncRequest({
        params: {
          data: params
        },
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.rooms = data.room_list;
            this.pageSize = data.page_size;
            this.roomsTotal = data.total_count;
          }else{
            this.rooms = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    searchRoomsHandler(page){
      let filter = this.filter;

      filter.page_index = page;

      this.$router.push({
        path: this.$route.path,
        query: filter
      });
    },
    currentPageChange(index){
      this.searchRoomsHandler(index);
    },
    changeStatusHandler(id, status, txt){
      this.$confirm(`确定${ txt }该房型?`, '提示', {
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
        changeSelfSupportRoomStatusAsyncRequest({
          params: params,
          success: (params) => {
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.searchRoomsRequestHandler();
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
    this.searchRoomsRequestHandler();
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
