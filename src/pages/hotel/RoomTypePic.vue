<style lang="stylus" scoped>
$theme-color = #b10c79
.pic-content
    .el-input
      padding 0
    padding 20px
    background #ffffff
    .img-title
      padding-bottom 20px
      font-size 16px
      span
        margin-right 10px
      .picsize
        margin-left 10px
        color #979797
        font-size 14px
    .outward-imglist
      .img-list-item
        display flex
        flex-wrap wrap
        position relative 
        margin-right 20px
        .outward-check
          display flex
          margin-bottom 20px
          .iamge
            width 180px
            height 180px
            position relative
            img 
              width 100%
              height 100%
          .imgInfo
            .img-name
              width 150px
              margin 5px
          .outward-btns
            .el-button
              width 85px
          .del
            position absolute
            top 0
            right 8px
            background-color rgba(0, 0, 0, .5)
            color #fff
            padding 4px
            cursor pointer 
          .setting
            position absolute
            right 8px
            top 152px
            background-color rgba(0, 0, 0, .5)
            color #fff
            padding 4px
            cursor pointer
            line-height 20px
            font-style normal
          .isDefault
            position absolute
            top 0
            left 24px
            width 40px
            height 40px
            &::before
              content ''
              position absolute
              top 0
              left 0
              width 0
              height 0
              border 20px solid #f7ba2a
              border-right-color transparent
              border-bottom-color transparent
            
            i
              position: absolute
              top 2px
              left 4px
              color #fff
              font-style normal
              line-height normal
              font-weight 700
    .recommend-list
      .recommendpic-list
        display flex
        flex-wrap wrap
        .hotel-img
          width 180px
          height 240px
          position relative
          margin 0 30px 20px 0
          .sort-img
            height 180px
            img
              width 100%
              height 100%
            .del
              position: absolute;
              top: 0;
              right: 0;
              background-color: rgba(0, 0, 0, .5);
              color: #fff;
              padding: 4px;
              cursor: pointer;         
          .sort-num
            text-align center
            padding 5px 0
            .num-input
              width 55px
              margin-left 10px
    .footer
      text-align center
</style>
<template lang="pug">
  .room-type-pic
    .system-tab(v-if="editRoomType")
      ul.tab-box
        router-link(tag="li", v-if="roomTypeId || addRoom_id", :to="{path:'/hotel/hotelroomtypeEdit',query:{roomId: roomTypeId || addRoom_id,hotel_id: hotelId,editAdd:IsAdd_roomType,supplier:supplier}}") 基本信息
        //- router-link(tag="li", v-else, :to="{path:'/hotel/roomtypeEdit',query:{room_type_id: roomTypeId,hotel_id: hotelId}}") 基本信息
        router-link(class="on", tag="li", to="") 房型图片
    .pic-content
      el-form
        el-form-item
          .recommend-list
            .img-title
              span 房型推荐图:
              el-button(type="primary", @click="_sortRecommendImg", :disabled="isDisabled") 排序
            .recommendpic-list
              .hotel-img(v-for="(item, index) in recommendList" :key="index")
                .sort-img
                  img(:src="item.url")
                  i(class="el-icon-close del", @click="_delRecommeListdImg(index, item)")
                .sort-num
                  span 排序:
                  el-input(class="num-input reset_input__inner_padding_10", v-model="item.sort_id", type="number" @blur="regNumb")
        el-form-item          
          .hotel-outward
            .img-title
              span 房型图:
              el-button(type="primary", @click="_uploadLocalImg()") 本地上传
              //- el-button(type="primary", @click="handleOpenAlbum()") 资源库上传
              el-button(type="primary", @click="changeAll") 全选
              el-button(type="primary", @click="delPicBatch()") 批量删除
              span(class="picsize") (图片大小限制1M以内)
            div(class="outward-imglist")
              div(class="img-list-item")
                el-checkbox(class="outward-check",v-for="(item, index) in roomTypeImgList" :label="item", :key="index", v-model="item.checked")
                  .iamge
                    img(:src="item.url")
                  .imgInfo
                    span 名称
                    el-input(class="img-name", v-model="item.desc")
                  i(class="el-icon-close del", @click='delImgOne(item.id,index, $event)')
                  i(class="setting", v-if="item.is_first == 0", @click="_handleSetFristImg(index, $event)") 设为首图
                  .isDefault(v-else)
                    i 首
        el-form-item(class="footer") 
          el-button(type="primary", @click="reset") 重置
          el-button(type="primary", @click="_submitPic") 保存
    el-dialog(title="上传图片", :visible.sync="pictureVisible", @close="handleClosePictureDialog")
      el-upload(
        multiple,
        action="/api/v1/hotel/room-imgs",
        list-type="picture-card",
        :auto-upload="false",
        :file-list="pictureList",
        :data="picUploadData",
        :before-upload="handlePictureBeforeUpload",
        :http-request="uploadFile",
        :on-remove="handlePictureUploadRemove",
        ref="upload"
      )
        i(class="uploader-icon, el-icon-plus")
      //- el-upload(
      //-   multiple,
      //-   action="/api/v1/hotel/room-imgs",
      //-   list-type="picture-card",
      //-   :file-list="pictureList",
      //-   :data="picUploadData",
      //-   :before-upload="handlePictureBeforeUpload",
      //-   :on-success="handlePictureUploadSuccess",
      //-   :on-remove="handlePictureUploadRemove"
      //- )
      span 上传图片推荐尺寸600x400，图片质量小于1M内，支持JPG,JPEG,PNG等格式
      span(slot="footer", class="dialog-footer")
        el-button(@click="handleClosePictureDialog") 取 消
        el-button(type="primary", @click="handleSubmitPictureUpload") 确 定
    album(:visible.sync='albumType', @imageArray='handleCheckImage', :check='pictureList', checkkey='img_url', idkey='id')
</template>
<script>
import CheckboxImage from './components/CheckboxImage'
import Album from './components/Album';
import  axios from 'axios'
import { 
  promise_getHotelImgList, 
  promise_hotelSetFirst, 
  promise_hotelPicSorts, 
  promise_lastSaveRoom, 
  promise_lastEditRoom, 
  promise_hotelImgDel
} from 'src/api/promise_api'
import { numberReg } from "src/utils/regular";

export default {
  data() {
    return {
      editRoomType: true,
      recommendList: [],
      isDisabled: false,
      roomTypeImgList: [],
      pictureVisible:false,
      pictureList: [],
      albumType: false,
      hotelId: "",
      roomTypeId: "",
      // checkedCities: [],
      checkAll: false,
      isIndeterminate: true,
      checkedDeleltIds: [],
      picUploadData:{
        product_id: this.$route.query.hotel_id,
        room_id: this.$route.query.addRoom_id || this.$route.query.roomId
      },
      delRecommendImgIdList: [],
      addRoom_id: "",
      formDate: "",
      IsAdd_roomType: "",
      supplier: "",
      isLoad: false,
    }
  },
  watch: {
    recommendList() {
      this.recommendList.length > 1 ? this.isDisabled = false : this.isDisabled = true  
    }
  },
  mounted() {
    this.hotelId = this.$route.query.hotel_id;
    this.roomTypeId = this.$route.query.roomId;
    this.addRoom_id = this.$route.query.addRoom_id
    this.IsAdd_roomType = this.$route.query.add
    this.supplier = this.$route.query.supplier
    this.hotelId && this.roomTypeId && this._getRoomTypeImgList()
  },
  methods: {
    async _getRoomTypeImgList() {
      const params = {
        data: {
          product_id: this.hotelId,//18,//
          room_id: this.roomTypeId,//"1",
        }
      }
      try {
        const {data} = await promise_getHotelImgList(params)

        if(data.code !== 0 ) return this.$message.error(data.msg)
        this.recommendList = data.data.recommed;
        let list = data.data.imgList
        list.forEach(item => {
          item.checked = false
        })
        this.roomTypeImgList = list;
        const recommendList = JSON.stringify(this.recommendList);
        const roomTypeImgList = JSON.stringify(this.roomTypeImgList)
        sessionStorage.setItem("roomTypeImgList", roomTypeImgList)
        sessionStorage.setItem("recommendList", recommendList)
      }
      catch(err) {
        console.log(err)
      }
    },
    async _handleSetFristImg(index, evnet){
      if(event) event.preventDefault();
      if(this.recommendList.length > 4) return this.$message.warning('推荐图仅限5张！')
      const itemImg = this.roomTypeImgList[index]
      const params = {
        data: {
          id: itemImg.id,
          desc: itemImg.desc
        }
      }
      const { data } = await promise_hotelSetFirst(params)

      if(data.code !== 0) return this.$message.error(data.msg)
      this.roomTypeImgList[index].is_first = '1';
      this.recommendList.push(itemImg)
      // this.recommendList.forEach((item,index) => {
      //   item.sort_id = index+1
      // })
    },
    
    reset() {
      if(this.hotelId && this.roomTypeId) {
       const roomTypeImgList =  JSON.parse(sessionStorage.getItem("roomTypeImgList"))
       const recommendList =  JSON.parse(sessionStorage.getItem("recommendList"))
       this.recommendList = recommendList
       this.roomTypeImgList = roomTypeImgList
      
      } else {
        this.recommendList = []
        this.roomTypeImgList = []
      }

    },
    async _submitPic() {
      if(!this.roomTypeImgList.length) {
        return this.$message.error("请上传房型图")
      } else if(!this.recommendList.length) {
        return this.$message.error("请上传房型推荐图")
      }
      let allList = []
      this.roomTypeImgList.forEach(item => {
        let imglist = {}
        allList.push({
            id:item.id,
            type_id : 9,
            title : '房型',
            product_id : this.hotelId, //18
            room_id: this.roomTypeId || this.addRoom_id, //1,//
            desc : item.desc || "",
            url : item.url
          }) 
      })
      const sortList = new Set()
      this.recommendList.forEach((item, index) => {
        sortList.add(
          {
            id: item.id,
            sort_id: item.sort_id || index + 1
          }
        )
      })
      const params = {
        data: {
          imgInfo: allList,
          sort_info: sortList,
          del_info: this.delRecommendImgIdList
        }
      }
      const delPicParams = {
         data: {
           id:this.checkedDeleltIds
         }
      }
      try {
        
        if(this.checkedDeleltIds.length) {
          const { data } = await promise_hotelImgDel(delPicParams)

          if(data.code !== 0 ) return this.$message.error(data.msg)
        }
        if(this.hotelId && this.roomTypeId) {
          const { data } = await promise_lastEditRoom(params)

          if(data.code !== 0 ) return this.$message.error(data.msg)
          this.$message({
            message: "修改成功",
            type:'success'
          })
        } else {
          const {data} = await promise_lastSaveRoom(params)
  
          if(data.code !== 0 ) return this.$message.error(data.msg)
          this.$message({
            message: "保存成功",
            type:'success'
          })
        }
        // this.$router.push(`/hotel/roomtStatus?hotel_id=${this.hotelId}`)
        this.$router.push({
          path: '/hotel/roomtStatus',
          query: {
            hotel_id: this.hotelId,
            channel: this.$route.query.channel
          }
        })
      }
      catch(err) {
        console.log(err)
      }
    },
    handleCheckImage (newImg) {
      const typeName = this.changeHoteType(this.imgType)
      let oldImg = this.pictureList,
          img = [];
      oldImg.forEach(i => {
        if(newImg.some(j => j.id == i.id)){
          img.push(i);
        }
      });
      newImg.forEach(i => {
        if(!oldImg.some(j => j.id == i.id)){
          img.push({
            id: i.id,
            img_url: i.sub_pic_url,
            type_id: this.imgSelectedId,
            is_default: 0
          });
        }
      });
      img.forEach(i => {
        this.formData[typeName].push({
          id: i.id,
          path: i.img_url
        })
      })
      this.pictureList = []
      this.imgType = null
    },
    uploadFile(file){
      this.formDate.append('file[]', file.file);
    },
    handleSubmitPictureUpload(){
      this.formDate = new FormData()
      this.$refs.upload.submit();
      this.formDate.append('product_id', this.$route.query.hotel_id);
      this.formDate.append('room_id', this.$route.query.addRoom_id || this.$route.query.roomId);
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      !this.isLoad && this._uploadImg(this.formDate, config)
      // axios.post("/api/v1/hotel/room-imgs", this.formDate,config).then( res => {
      //   const { data: {code, data, msg} } = res
      //   if(code !== 0) return this.$message.warning(msg)
      //   if(!data.length){
      //     this.$message.error('请选择需要上传的图片');
      //     return false;
      //   }
      //   data.forEach((item,index) => {
      //     this.roomTypeImgList.push({
      //       url: item.url,
      //       is_first: 0,
      //       id: item.id,
      //       checked: false
      //     })
      //   })
      // }).catch( res => {
      //     console.log(res)
      // })
      // let pictures = this.pictureList;
      
      // pictures.forEach((pic) => {
      //   this.roomTypeImgList.push({
      //     url: pic.url,
      //     is_first: 0,
      //     id: pic.id,
      //     checked: false
      //   });
      // });
      this.handleClosePictureDialog();
    },
    _uploadImg(formDate, config) {
      axios.post("/api/v1/hotel/room-imgs", formDate, config).then(res => {
        const { data: {code, data, msg} } = res
        if(code !== 0) return this.$message.warning(msg)
        if(!data.length){
          this.$message.error('请选择需要上传的图片');
          return false;
        }
        data.forEach((item,index) => {
          this.roomTypeImgList.push({
            url: item.url,
            is_first: 0,
            id: item.id,
            checked: false
          })
        })
      }).catch( res => {
          console.log(res)
      })
    },
     handleClosePictureDialog(){
      this.$set(this, 'pictureList', []);
      this.pictureVisible = false;
    },
    handlePictureUploadRemove(file, fileList){
      let fileUrl = file.url,
          picture = this.pictureList,
          i = 0, len = picture.length, index;
      for(i; i < len; i++){
        if(picture[i].url == fileUrl){
          index = i;
          break;
        }
      }
      picture.splice(index,1);
    },
    handlePictureUploadSuccess(response, file, fileList){
      let { code, data, msg } = response;
      if(code == 0){
        this.pictureList.push({
          id: data.id,
          url: data.url
        });
      }else{
        this.$message.error(msg);
      }
    },
     handlePictureBeforeUpload(file){
      const isJPG = ['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) > -1 ;
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpg、jpeg、png 格式!');
        this.isLoad = true
        return
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!');
        this.isLoad = true
        return
      }
      this.isLoad = false
      return isJPG && isLt2M;
    },
    regNumb(e) {
      if(!numberReg.test(e.target.value)) {
        this.isDisabled = true
        this.$message.warning("首图推挤排序只能输入正整数")
      } else {
      for(let i = 0; i < this.recommendList.length; i++) {
        if(!numberReg.test(this.recommendList[i].sort_id)) {
          return this.isDisabled = true
        }
        this.isDisabled = false
      }
      }
    },
    async _sortRecommendImg() {
      // const reg = /^\d*$/ 
      let sortList = []
      this.recommendList.forEach(item => {
         sortList.push({
          id: item.id,
          sort_id: item.sort_id
        })
      })
      // for(let i = 0; i < this.recommendList.length; i++) {
      //   if(!reg.test(this.recommendList[i].sort_id)) return this.$message.warning("首图推挤排序只能输入正整数")
      //   sortList.push({
      //     id: this.recommendList[i].id,
      //     sort_id: this.recommendList[i].sort_id
      //   })
      // }
      const params = {
        data: {
          product_id: this.hotelId,
          img_info: sortList,
          del_info: this.delRecommendImgIdList
        }
      }
      try {
        const {data} = await promise_hotelPicSorts(params)

        if(data.code !== 0 ) return this.$message.error(data.msg)
        this.recommendList = data.data;
      }
      catch(err) {
        console.log(err)
      }
    },
    _delRecommeListdImg(index, item) {
      this.delRecommendImgIdList.push({id: item.id})
      this.recommendList.splice(index, 1)
      this.roomTypeImgList.forEach(it => {
        if(item.id === it.id) {
          it.is_first = 0
        }
      })
    },
    _uploadLocalImg() {
      this.pictureVisible = true;
      // this.imgType = type;
    },
    handleOpenAlbum(type){
      this.albumType = true;
      // const typeName = this.changeHoteType(type)
      // this.pictureList = this.formData[typeName]
      // this.imgType = type
    },
    changeAll() {
      this.roomTypeImgList.forEach(item => {
        item.checked = item.checked ? false : true
      })
    },
    delPicBatch() {
      let checkList = this.roomTypeImgList
       const checked =  checkList.filter(item => item.checked == true)
        checked.forEach(item => {
          this.checkedDeleltIds.push(item.id * 1)
      })
      
      let newArr = this.roomTypeImgList.filter(item => item.checked != true)
      this.roomTypeImgList = newArr    
    },
     delImgOne(id, index, event) {
      if(event) event.preventDefault();
      this.checkedDeleltIds.push(id * 1)
      this.roomTypeImgList.splice(index, 1)
    },
  },
  components: {
    CheckboxImage,
    Album
  }
}
</script>
