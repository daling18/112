<template>
  <div class="wrapper">
    <div class="package" id="package">
      <div class="package-hd">
        <div class="hotel-info">
          <strong>酒店名称：<router-link :to="{ name: 'SelfSupportDxHotelEdit', query: { id: hotelId } }">{{ hotelName }}</router-link></strong>
          <strong>房型名称：<a href="javascript:;" @click="handleToEditRoom">{{ roomName }}</a></strong>
        </div>
        <div class="tools">
          <el-button type="primary" @click="handleAddRoomPackage()">新增套餐</el-button>
        </div>
      </div>
      <div class="package-bd">
        <el-table
          :data="packages"
          style="width: 100%">
          <el-table-column
            header-align="center"
            label="套餐名称">
            <template slot-scope="prop">
              {{ prop.row.rate_name }}
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
            prop="breakfast_name"
            label="早餐">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            label="取消规则">
            <template slot-scope="prop">
              <template v-if="prop.row.cancel_type">
                <el-popover
                  placement="bottom"
                  trigger="hover">
                  <div v-html="prop.row.cancel_type_name"></div>
                  <p slot="reference"><a href="javascript:;">限时取消</a></p>
                </el-popover>
              </template>
              <template v-else>
                <p>不可取消</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="release_name"
            header-align="center"
            align="center"
            label="上架状态">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="supplier"
            label="供应商">
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
                  <el-dropdown-item v-if="$menuPermission('api/selfsupport.hotel/roomPackageDetail')">
                    <a href="javascript:;" @click="handleDetailRoomPackage(prop.row)">详情</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="$menuPermission('api/selfsupport.hotel/storeRoom') && prop.row.release != 3 && prop.row.source != 4">
                    <a href="javascript:;" @click="handleEditRoomPackage(prop.row)">编辑</a>
                  </el-dropdown-item>
                  <template v-if="$menuPermission('api/selfsupport.hotel/changeRoomPackageStatus')">
                    <template v-if="prop.row.release != 3 && prop.row.release != 2">
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
                  </template>
                  <template v-if="$menuPermission('api/selfsupport.hotel/changePackageStatus')">
                    <template v-if="prop.row.status == 1">
                      <template v-if="prop.row.release == 1 || prop.row.release == 4 || prop.row.release == 5 || prop.row.release == 6">
                        <el-dropdown-item>
                          <a href="javascript:;"  @click="changePutawayHandler(prop.row.id, 1, '上架')">上架</a>
                        </el-dropdown-item>
                      </template>
                      <template v-if="prop.row.release == 3">
                        <el-dropdown-item>
                          <a href="javascript:;" @click="changePutawayHandler(prop.row.id, 2, '下架')">下架</a>
                        </el-dropdown-item>
                      </template>
                      <template v-if="prop.row.release == 2">
                        <el-dropdown-item>
                          <a href="javascript:;" @click="changePutawayHandler(prop.row.id, 3, '撤回')">撤回</a>
                        </el-dropdown-item>
                      </template>
                    </template>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="packages && packages.length" class="page">
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentPageChange"
            :total="pageTotal"
            :page-size="pageSize"
            :current-page="filters.page_index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchSelfSupportRoomPackageListAsyncRequest, changeSelfSupportRoomPackageStatusAsyncRequest, changeSelfSupportRoomPackagePutawayAsyncRequest } from 'src/api/hotel';
import ZoneAutocomplete from './components/HotelZoneAutocomplete.vue';
import * as format from "src/utils/format";
export default {
  data(){
    return {
      hotelId: null,
      hotelName: null,
      roomId: null,
      roomName: null,
      source: null,
      packages: null,
      pageTotal: 0,
      pageSize: null,
      filters:{
        room_id: "",
        hotel_id: "",
        page_index: 1
      }
    }
  },
  components:{
    ZoneAutocomplete
  },
  watch: {
    $route(val, oldVal){
      this.initRoomPackageFiltersHandler();
    }
  },
  methods: {
    initRoomPackageFiltersHandler(){
      let query = Object.assign({},this.$route.query);
      if(Object.keys(query).length){
        this.$set(this, 'filters', query);
      }
      this.searchRoomPackageRequestHandler();
    },
    searchRoomPackageRequestHandler(){
      let params = Object.assign({}, this.filters);
      
      searchSelfSupportRoomPackageListAsyncRequest({
        params: {
          data: params
        },
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.roomName = data.room_name;
            this.hotelName = data.hotel_name;
            this.packages = data.list;
            this.pageSize = data.page_size;
            this.pageTotal = data.total_count;
          }else{
            this.rooms = null;
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    searchRoomsHandler(page){
      let query = this.filters;

      query.page_index = page;

      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    currentPageChange(index){
      this.searchRoomPackageRequestHandler(index);
    },
    changeStatusHandler(id, status, txt){
      this.$confirm(`确定${ txt }该套餐报价?`, '提示', {
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
        changeSelfSupportRoomPackageStatusAsyncRequest({
          params: params,
          success: (params) => {
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.searchRoomPackageRequestHandler();
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
    },
    changePutawayHandler(id, release, txt){
      this.$confirm(`确定${ txt }该套餐报价?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            package_id: id,
            release
          }
        }
        changeSelfSupportRoomPackagePutawayAsyncRequest({
          params: params,
          success: (params) => {
            let { code, data, msg } = params['data'];
            if(code == 0){
              this.$message.success(msg);
              this.searchRoomPackageRequestHandler();
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      });
    },
    handleAddRoomPackage(){
      let { hotelName, roomName } = this,
          { hotel_id, room_id } = this.filters;
      this.$router.push({
        name: 'SelfSupportDxRoomPackageAdd',
        query: {
          hotelName,
          roomName,
          hotel_id,
          room_id
        }
      });
    },
    handleEditRoomPackage(room){
      let { hotelName, roomName } = this,
          { hotel_id, room_id, id } = room;
      this.$router.push({
        name: 'SelfSupportDxRoomPackageEdit',
        query: {
          hotelName,
          roomName,
          hotel_id,
          room_id,
          id
        }
      });
    },
    handleDetailRoomPackage(room){
      let { hotelName, roomName } = this,
          { hotel_id, room_id, id } = room;
      this.$router.push({
        name: 'SelfSupportDxRoomPackageDetail',
        query: {
          hotelName,
          roomName,
          hotel_id,
          room_id,
          id
        }
      });
    },
    handleToEditRoom(){
      if(this.source == 4){
        this.$message.error('该房型不可编辑');
        return;
      }
      this.$router.push({
        name: 'SelfSupportDxRoomEdit',
        query: { 
          roomId: this.roomId 
        }
      });
    }
  },
  mounted(){
    let { hotel_id, room_id, source } = this.$route.query;
    
    if(!hotel_id && !room_id){
      this.$router.replace({ name: 'SelfSupportDxRoom' });
      return;
    } 
    this.hotelId = hotel_id;
    this.roomId = room_id;
    this.source = source;
    this.initRoomPackageFiltersHandler();
  }
}
</script>

<style lang="less" scoped>
.package{
  .package-hd{
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 10px;
    
    .hotel-info{
      strong{
        margin-right: 10px;
      }
    }
  }
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
