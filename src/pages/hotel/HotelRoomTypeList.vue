<style lang="stylus" scoped>
.operate
  background #fff
  padding 15px
.room-type-list
  padding 0 15px
  background #fff
  display flex
.foot
  text-align center
  padding 20px 0
  background #fff

</style>
<template lang="pug">
  .hotel-room-type
    .system-search
      .system-search-panel
        //- .search-item
        //-   .label 房型ID
        //-   el-input(v-model="filter.room_id", placeholder="请输入房型ID号")
        .search-item
          .label 房型名称
          el-input(v-model="filter.room_name", placeholder="请输入房型名称")
        .search-item(class="search-button")
          el-button(type="primary", @click="searchRoomTypeList") 立即搜索
    .operate
      //- el-button(type="primary") 全选/取消
      el-button(type="primary", @click="delPicBatch") 批量删除
      el-button(type="primary", @click="toRoomTypeAdd()") 增加房型
    .room-type-list
      el-table(:data="roomTypeList", style="width:50%", center, @selection-change="handleSelectionChange")
        el-table-column(type="selection")
        el-table-column(label="房型名称", prop="name")
        el-table-column(label="操作")
          template(slot-scope="scope")
            el-button(size="small", @click="toRoomTypeEdit(scope.row.id)") 编辑
            el-button(size="small", @click="delOneRoomtype(scope.row.id)") 删除
    .foot
      el-pagination(
        class="pagin",
        layout="prev, pager, next", 
        @current-change="currentPageChange", 
        :total="hotelTotal",
        :page-size="pageSize", 
        :current-page="page_index")
</template>

<script>
import { promise_getHotelRoomLayoutList, promise_delModalRoomType } from 'src/api/promise_api'

export default {
  data() {
    return {
      filter: {
        room_id: "",
        room_name: ""
      },
      hotelTotal: null,
      pageSize: 10,
      page_index: 1,
      roomTypeList: [],
      delRoomtypeIdList: [],
      multipleSelection: []
    }
  },
  mounted() {
    this._getHotelRoomLayoutList()
  },
  methods: {
    delOneRoomtype(id) {
      this.delRoomtypeIdList.push(id * 1)
      this.$confirm('确定删除该房型吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._delRoomType()
        }) 
    },
    async _delRoomType() {
      try {
        const params = {
          data: {
            id:this.delRoomtypeIdList
          }
        }
        const { data } = await promise_delModalRoomType(params, true)

        if(data.code !== 0) return this.$message.error(data.msg)
        this.$message.success("删除成功")
        this.filter['room_id'] = "" 
        this.filter['room_name'] = ""
        this._getHotelRoomLayoutList()
      }
      catch(err) {
        console.log(err)
      }
    },
    async _getHotelRoomLayoutList() {
      const params = {
         data: {
           room_type_id: this.filter.room_id,
           room_name: this.filter.room_name,
           page_size: this.pageSize,
           page_index: this.page_index
         }
      }
      try {
        const { data } = await promise_getHotelRoomLayoutList(params, true)

        if(data.code !== 0) return this.$message.error(data.msg)
        this.roomTypeList = data.data.order_list
        this.hotelTotal = data.data.total_count
      }
      catch(err) {
        console.log(err)
      }
    },
    searchRoomTypeList() {
      this._getHotelRoomLayoutList()
    },
    currentPageChange(page) {
      this.page_index = page
      this._getHotelRoomLayoutList()
    },
    toRoomTypeAdd() {
      this.$router.push(`/hotel/roomtypeEdit?typeModal=1`)
    },
    toRoomTypeEdit(id) {
      this.$router.push(`/hotel/roomtypeEdit?roomId=${id}&typeModal=1`)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delPicBatch() {
      if(this.multipleSelection.length) {
        this.multipleSelection.forEach(item => {
          this.delRoomtypeIdList.push(item.id * 1)
        })
        this._delRoomType()
      } else {
        this.$message.warning("请选择删除的房型")
      }
    }
  }
}
</script>

 
