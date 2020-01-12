<style lang="stylus" scoped>
.hotel-roomtype-edit
  background #fff
  .long 
    width 400px
  .item-checkobx
    width 20%
  .footer
    padding 20px 0
    text-align center
</style>

<template lang="pug">
  .hotel-roomtype-edit
    .system-tab(v-if="editRoomType")
      ul.tab-box
        router-link(class="on", tag="li", to="") 基本信息
        router-link(tag="li", v-if="!typeModal && !room_modal_id" :to="{path:'/hotel/roomtTypePic',query:{roomId: roomId,hotel_id: hotelId, add:room_modal_id || editAdd, supplier:supplier}}") 房型图片
        router-link(tag="li", v-if="room_modal_id", to="") 房型图片
    el-form(ref="roomForm", :model="formData", :rules="rules", label-width="100px")
      el-form-item(label="房型名称", prop="name")
        el-input(:class="'long'", v-model="formData.name", :disabled="!!hotelId", placeholder="请输入房型名称")
      el-form-item(label="面积", prop="size")
        el-input(:class="'long'", v-model="formData.size", placeholder="如：12，15-30")
      el-form-item(label="楼层", prop="floor")
        el-input(:class="'long'", v-model="formData.floor", placeholder="如：12，15-30")
      el-form-item(label="窗户", prop="window")
        el-select(v-model="formData.window")
          el-option(v-for="item in windows", :key="item.value", :label="item.label", :value="item.value")
      el-form-item(v-for="item in roomFacilities", :label="item.type", :key="item.type", v-if="item.facilities.length")
        .checkbox
          el-checkbox(class="item-checkobx", v-for="temp in item.facilities", v-model="temp.checked" :key="temp.id", @change="checkFacility($event,item.type,temp.id)") {{temp.name}}
    .footer
      el-button(type="primary", @click="cancelBtn") 取消
      el-button(type="primary", v-if="room_modal_id || editAdd" @click="_submitRoomType") 下一步
      el-button(type="primary", v-else, @click="_submitRoomType") 保存
</template>

<script>
import { promise_addHotelRoomTypeEdit, promise_getModalRoomTypeFind, promise_editRoomTypeUpdates, promise_getRoomTypeDetail, promise_getRoomFaciList, promise_addRoomTypeInsert } from 'src/api/promise_api'
import { parse } from 'babylon';

export default {
  data() {
    return {
      formData: {
        name: "",
        size: "",
        floor: "",
        window: "",
        
      },
      windows:[
        {
          value: 0,
          label: "无窗"
        },
        {
          value: 1,
          label: "有窗"
        }
      ],
      roomFacilities:[],
      rules: {
        name: [
          { required: true, message: '请输入房型名称', trigger: 'blur' }
        ],
         size: [
          { required: true, message: '请输入房间面积', trigger: 'blur' }
        ],
         floor: [
          { required: true, message: '请输入楼层', trigger: 'change' }
        ],
         window: [
          { required: true, message: '请选择窗户', trigger: 'blur' }
        ],
      },
      editRoomType:true,
      roomId: "",
      roomTypeId: "",
      hotelId: "",
      typeModal: null,
      room_modal_id: "",//房态-增加房型,
      editAdd: "",
      checkedFacilitieIds:[],
      supplier: ""
    }
  },
  mounted() {
    this.roomId = this.$route.query.roomId || "";//房型
    this.typeModal = this.$route.query.typeModal || "";//判断从模板还是房型进入
    this.hotelId = this.$route.query.hotel_id
    this.editAdd = this.$route.query.editAdd
    this.supplier = this.$route.query.supplier
    this._getRoomFaciList()
   
    this.room_modal_id = this.$route.query.room_modal_id //新增房型
  },
  methods: {
    async _getRoomFaciList() {
      const _this = this
      try {
        const { data } = await promise_getRoomFaciList({}, true)

        if(data.code !==0 ) return this.$message.error(data.msg)
        data.data.forEach(item => {
          item.facilities.forEach(tmp => {
            tmp.checked = false
          }) 
        })
        this.roomFacilities = data.data
        _this.room_modal_id && _this._getRoomTypeModalDetail()
        _this.typeModal && _this.roomId ? _this._getRoomTypeModalDetail() : "" //模板编辑 获取详情
        !_this.typeModal && _this.roomId ? _this._getRoomTypeDetail() : ""  //房型编辑 获取详情
      }
      catch(err) {
        console.log(err)
      }
    },
    async _getRoomTypeModalDetail() {
      try {
        const { data } = await promise_getModalRoomTypeFind({data: {id: this.roomId || this.room_modal_id}}, true)

        if(data.code !==0) return this.$message.error(data.msg)
        const detail = data.data.info
        this.formData.name = detail.name
        this.formData.size = detail.size
        this.formData.floor = detail.floor
        this.formData.window = detail.window
        this.checkedFacilitieIds = data.data.facilities_id
       
        this.roomFacilities.length &&this.roomFacilities.forEach(item => {
          item.facilities.forEach(temp => {
            data.data.facilities_id.map(id => {
              id === temp.id ? temp.checked = true : ""
            })
          })
        })
      }
      catch(err) {
        console.log(err)
      }
    },
    async _getRoomTypeDetail() {
      const params = {
        data: {
          room_id: this.roomId,
          product_id: this.hotelId
        }
      }
      try {
        const {data} = await promise_getRoomTypeDetail(params)

        if(data.code !== 0) return this.$message.error(data.msg)
        this.formData = data.data.otherInfo
        this.checkedFacilitieIds = data.data.facilities_id 
        this.roomFacilities.length && this.roomFacilities.forEach(item => {
          item.facilities.forEach(temp => {
            data.data.facilities_id.map(id => {
              id === temp.id ? temp.checked = true : ""
            })
          })
        })
      } catch(err) {
        console.log(err)
      }
    },
    async _getModalRoomTypeInfo() {
      try {
        const {data} = await promise_getHotleRoomTypeFind({data: {id:this.roomId || this.roomTypeId}})
      }
      catch(err) {
        console.log(err)
      }
    },
    checkFacility(e,type,id) {
      e ? this.checkedFacilitieIds.push(id) : this.checkedFacilitieIds.forEach((item, index) => {
        id === item ? this.checkedFacilitieIds.splice(index, 1) : ""
      })
      
    },
    async _submitRoomType() {
      this.$refs.roomForm.validate(async valid => {
        if(valid) {
          try {
            this.formData["facilities"] = this.checkedFacilitieIds
            let formData = this.formData
            if((this.typeModal && !this.roomId) || (this.typeModal && this.roomId)) {
              formData["id"] = this.typeModal && this.roomId ?  this.roomId : ""
              const params ={
                data: formData
              }
              const { data } = await promise_addHotelRoomTypeEdit(params)  //增加编辑模板基本信息               
              if(data.code !==0) return this.$message.error(data.msg)
              this.$router.push('/hotel/hotelroomsTypeList')
            }
            if(this.room_modal_id) { //promise_addRoomTypeInsert 增加房型
              formData["room_id"] = this.room_modal_id
              formData["product_id"] = this.hotelId
              formData["channel"] = this.$route.query.channel
              const params ={
                data: formData
              }
              const {data} = await promise_addRoomTypeInsert(params) 

              if(data.code !==0) return this.$message.error(data.msg)
              // this.$router.push(`/hotel/roomtTypePic?hotel_id=${this.hotelId}&addRoom_id=${data.data.id}&add=1`)
              this.$router.push({
                path: '/hotel/roomtTypePic',
                query: {
                  hotel_id: this.hotelId,
                  addRoom_id: data.data.id,
                  add: '1',
                  channel: this.$route.query.channel
                }
              })
            }

            if(!this.typeModal && this.roomId) { //编辑房型
               formData["id"] = this.roomId
               formData["product_id"] = this.hotelId
              const params ={
                data: formData
              }
              const { data } = await promise_editRoomTypeUpdates(params)

              if(data.code !==0) return this.$message.error(data.msg)
              // this.$message.success("修改成功")
              this.$router.push({
                path: '/hotel/roomtStatus',
                query: {
                  hotel_id: this.hotelId,
                  channel: this.$route.query.supplier
                }
              })
              this._getRoomFaciList()
            }
          } catch(err) {
            console.log(err)
          }
        } else{
          console.log('err')
          this.$message.error("请完善基本信息")
          return false
        }
      })
    },
    cancelBtn() {
      // this.$router.push(`/hotel/roomtStatus?hotel_id=${this.hotelId}`)
      if(this.hotelId) {
        this.$router.push({
           path: '/hotel/roomtStatus',
           query: {
             hotel_id: this.hotelId,
             channel: this.$route.query.supplier
           }
         })
      } else {
        this.$router.back(-1)
      }
    }
  }
}
</script>

