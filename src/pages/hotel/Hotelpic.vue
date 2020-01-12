<style lang="stylus" scoped>
// @import  "~/assets/stylus/mixin.styl" 
$theme-color = #b10c79

.hotelFacilities
  .pic-content
    padding 20px
    background #ffffff
    .img-title
      padding-bottom 20px
      font-size 16px
      span
        margin-right 10px
      .tips
        margin-left 5px
        color #979797
        font-size 14px
    .outward-imglist
      display flex
      flex-wrap wrap
      .img-list-item
        position relative 
        margin-right 20px
        .outward-check
          display flex
          margin-bottom 20px
          position relative
          .iamge
            width 180px
            height 180px
            img 
              width 100%
              height 100%
          .imgInfo
            .img-name
              width 145px
              margin 5px 3px
          .outward-btns
            .el-button
              width 85px
        .del
          position absolute
          top 0
          right 0px
          background-color rgba(0, 0, 0, .5)
          color #fff
          padding 4px
          cursor pointer 
        .setting
          position absolute
          right 0px
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
  .hotelFacilities
    .system-tab
      ul.tab-box
        router-link(tag="li", :to="{path:'/hotel/hotelEdit', query:{hotel_id:hotelId}}") 基础信息
        router-link(tag="li", :to="{path:'/hotel/HotelFacilities', query:{hotel_id:hotelId}}") 酒店设施
        router-link(tag="li", :to="{path:'/hotel/HotelDetail', query:{hotel_id:hotelId}}") 酒店详情
        router-link(tag="li", :to="{path:'/hotel/HotelGraphic', query:{hotel_id:hotelId}}") 图文详情
        router-link(class="on", tag="li", to="") 酒店图片
    .pic-content
      el-form
        el-form-item
          .recommend-list
            .img-title
              span 酒店首图推荐:
              el-button(type="primary", @click="_sortRecommendImg", :disabled="IsSort") 排序
            .recommendpic-list
              .hotel-img(v-for="(item, index) in recommendList" :key="index")
                .sort-img
                  img(:src="item.url")
                  i(class="el-icon-close del", @click="delRecommeListdImg(index, item)")
                .sort-num
                  span 排序:
                  el-input(class="num-input reset_input__inner_padding_10", v-model="item.sort_id", type="number")
        el-form-item(v-for="(item, index) in prodcutImgList", :key="index")          
          .hotel-outward
            .img-title
              span {{item.name}}:
              el-button(type="primary", @click="_uploadLocalImg(index)", :disabled="item.primaryListImgDisabled") 本地上传
              //- el-button(type="primary", @click="handleOpenAlbum(index, item)") 资源库上传
              el-button(type="primary", v-if="item.name !== '列表默认图'", v-model="dellcheckAll", @click="changeAll(item, index)") 全选
              el-button(type="primary", v-if="item.name !== '列表默认图'", @click="_delPicBatch(item, index)") 批量删除
              span(class="tips") (图片大小限制1M以内)
            div(class="outward-imglist")
              div(class="img-list-item", v-for="(it, ind) in item.imgList")
                el-checkbox(class="outward-check", :label="it", :key="ind", v-model="it.checked")
                  .iamge
                    img(:src="it.url")
                  .imgInfo(v-if="item.name !== '列表默认图'")
                    span 名称
                    el-input(class="img-name", v-model="it.desc")
                  //- .outward-btns
                  //-   el-button(type="primary",) 保存
                  //-   el-button(type="primary") 清空
                  i(class="el-icon-close del", @click='_delImgOne(index, ind, $event)')
                  i(class="setting", v-if="it.is_first == 0 && item.name !== '列表默认图'", @click="_handleSetFristImg(index, ind, $event)") 设为首图
                  .isDefault(v-if="it.is_first == 1 && item.name !== '列表默认图'")
                    i 首 
      .footer
        el-button(@click="backList") 取消
        el-button(type="primary", @click="_submitPicAll") 保存
    el-dialog(title="上传图片", :visible.sync="pictureVisible", @close="handleClosePictureDialog")
      //- el-upload(
      //-   action="/api/v1/hotel/hotel-imgs",
      //-   list-type="picture-card",
      //-   :file-list="pictureList",
      //-   :data="picUploadData",
      //-   :before-upload="handlePictureBeforeUpload",
      //-   :on-success="handlePictureUploadSuccess",
      //-   :on-remove="handlePictureUploadRemove"
      //- )
      el-upload(
        :multiple="!IsPrimaryListImg",
        action="/api/v1/hotel/hotel-imgs",
        :auto-upload="false",
        list-type="picture-card",
        :file-list="pictureList",
        :data="picUploadData",
        :before-upload="handlePictureBeforeUpload",
        :http-request="uploadFile",
        :on-remove="handlePictureUploadRemove",
        :limit="primaryLimit",
        :on-exceed="exceed",
        ref="upload"
      )
        i(class="uploader-icon, el-icon-plus")
      span(v-if="imgType") 上传图片推荐尺寸600x400，图片质量小于1M内，支持JPG,JPEG,PNG等格式
      span(v-else) 上传图片推荐尺寸480x480，图片质量小于1M内，支持JPG,JPEG,PNG等格式
      span(slot="footer", class="dialog-footer")
        el-button(@click="handleClosePictureDialog") 取 消
        el-button(type="primary", @click="handleSubmitPictureUpload") 确 定
    album(:visible.sync='albumType', @imageArray='handleCheckImage', :check='pictureList', checkkey='url', :hotelId="hotelId", :typeId="typeId", idkey='id')
</template>
<script>
import CheckboxImage from './components/CheckboxImage'
import Album from './components/Album';
import  axios from 'axios'
import { 
  promise_getHotelImgList, 
  promise_hotelImageType, 
  promise_hotelPicSorts, 
  promise_hotelSetFirst, 
  promise_hotelImgDel, 
  promise_hotelLastSave, 
  promise_hotelLastEdit
} from 'src/api/promise_api'

export default {
  data() {
    return {
      hotelId: "",
      typeId: "",
      prodcutImgList: [],
      recommendList: [],
      pictureList: [],
      pictureVisible: false,
      imgType: null,
      albumType: false,
      isAdd: false,
      dellcheckAll: false,
      IsSort: false,
      IsPrimaryListImg: false,//是否是默认列表图 是不能多张上传图片，否可以多张上传
      typeIndex: "",
      checkedDeleltIds: [],
      picUploadData:{
        product_id: this.$route.query.hotel_id
      },
      delRecommendImgIdList: [],
      formDate: "",
      primaryLimit: 1000,
      isLoad: false
    }
  },
  components: {
    CheckboxImage,
    Album
  },
  watch: {
    recommendList(val) {
      if(val.length) {
        this.IsSort = false
      }  else {
        this.IsSort = !this.IsSort
      } 
    },
    imgType(val) {
      val == 0 ? this.primaryLimit = 1 : this.primaryLimit = 1000
    }
   },
  mounted(){
    this.hotelId = this.$route.query.hotel_id;
    this.isAdd = this.$route.query.isAdd;
    !this.isAdd ? this._getHotelImgList() : this._getHotelImageType()
  },
  methods: {
    async _getHotelImageType() {
      try {
        const { data } = await promise_hotelImageType({}, true)

        if( data.code !==0 ) return this.$message.error(data.msg)
        let imgTypeList = data.data
        imgTypeList.forEach(item => {
          item.imgList = []
        })
        this.prodcutImgList = imgTypeList
      }
      catch(err) {
        console.log(err)
      }
    },
    async _getHotelImgList() {
      try {
       const {data} = await promise_getHotelImgList({data: {product_id: this.hotelId}}, true)

       if(data.code !== 0 ) return this.$message.error(data.msg)
       let list = data.data.productimg
      list.forEach(item => {
          item.imgList.forEach(it => {
            it.checked = false
          }) 
        })
       this.prodcutImgList = list;
       this.recommendList = data.data.recommed
      }
      catch(err) {
        cosonle.log(err)
      }
    },
    changeAll(item, index) {
      let prodcutImgList = [...this.prodcutImgList]
      if(!prodcutImgList[index].allClick) {
        prodcutImgList[index].imgList.forEach(item => {
          item.checked = true
          })
          prodcutImgList[index].allClick = true
      } else {
         prodcutImgList[index].imgList.forEach(item => {
          item.checked = false
          })
          prodcutImgList[index].allClick = false
      }
      this.prodcutImgList = prodcutImgList
      
    },
    async _delPicBatch(item, index) {
      let checkList = this.prodcutImgList[index].imgList
      const checked =  checkList.filter(item => item.checked == true)
      checked.forEach(item => {
        this.checkedDeleltIds.push(item.id * 1)
      })
     
      let newArr = []
      newArr = this.prodcutImgList[index].imgList.filter((it, ind) => it.checked != true)
      this.prodcutImgList[index].imgList = newArr;
      
    },
    handleCheckImage (newImg) {
      let oldImg = this.pictureList,
          img = [];
      oldImg.forEach(i => {
        if(!newImg.some(j => j.id == i.id)){
          img.push(i);
        }
      });
      newImg.forEach(i => {
        if(!oldImg.some(j => j.id == i.id)){
          img.push({
            id: i.id,
            img_url: i.url,
            is_first: 0
          });
        }
      });
      img && img.forEach(i => {
        this.prodcutImgList[this.typeIndex].imgList.push({
          id: i.id,
          url: i.url,
          is_first: 0
        })
      })
      this.pictureList = []
    },
    handleOpenAlbum(index, item){
      this.albumType = true;
      this.pictureList = item.imgList
      this.typeId = item.id
      this.typeIndex = index
    },
    _delImgOne(index, ind, event) {
      if(event) event.preventDefault();
      let delId =this.prodcutImgList[index].imgList[ind]
      this.checkedDeleltIds.push( delId.id * 1 )
      this.prodcutImgList[index].imgList.splice(ind, 1)
      if(this.prodcutImgList[index].name === "列表默认图") {
        this.prodcutImgList[index].primaryListImgDisabled = false
        this.$forceUpdate()
      }
    },
    _uploadLocalImg(index) {
      this.imgType = index;
      if(this.prodcutImgList[index].name === "列表默认图") {
        // this.IsPrimaryListImg = !this.IsPrimaryListImg
        this.IsPrimaryListImg = true
        if(this.prodcutImgList[index].imgList.length >0) {
          this.$message.warning("列表默认图仅限一张")
          this.prodcutImgList[index].primaryListImgDisabled = true
          this.$forceUpdate()
          return 
        }
      } else {
        // this.IsPrimaryListImg = !this.IsPrimaryListImg
        this.IsPrimaryListImg = false
      }
      this.pictureVisible = true;
    },
    handleSubmitPictureUpload(){
      // let pictures = this.pictureList;
      // if(!pictures.length){
      //   this.$message.error('请选择需要上传的图片');
      //   return false;
      // }
      
      // pictures.forEach((pic) => {
      //   this.prodcutImgList[this.imgType].imgList.push({
      //     url: pic.url,
      //     is_first: 0,
      //     id: pic.id
      //   });
      // });
      
      const that = this
      that.formDate = new FormData()
      that.$refs.upload.submit();
      that.formDate.append('product_id', that.hotelId);;
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      !this.isLoad && this._uploadImg(that.formDate, config)
      // this.pictureList = []
      // this.imgType = null
      this.handleClosePictureDialog();
    },
    _uploadImg(formDate, config) {
      axios.post("/api/v1/hotel/hotel-imgs", formDate,config).then(res => {
        const { data: {code, data, msg} } = res
        if(code !== 0) return that.$message.warning(msg)
        if(!data.length){
          that.$message.error('请选择需要上传的图片');
          return false;
        }
        // if(this.imgType === 0 && data.length > 1) return this.$message.warning("列表默认图只能上传一张")
        data.forEach((item,index) => {
          this.prodcutImgList[this.imgType].imgList.push({
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
    uploadFile(file){
      this.formDate.append('file[]', file.file);
    },
    handlePictureUploadSuccess(response, file, fileList){
      let { code, data, msg } = response;
      if(code == 0){
        this.pictureList.push({
          id: data.id,
          url: data.url,
          // is_default: 0
        });
      }else{
        this.$message.error(msg);
      }
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
    exceed(file, fileList){
      this.$message.warning("列表默认图最多上传一张")
    },
    async _sortRecommendImg() {
      const reg = /^\d*$/ 
      let sortList = new Set()
      // this.recommendList.forEach(item => {
      //   if(!reg.test(item.sort_id)) return this.$message.warning("首图推挤排序只能输入整数")
      //   sortList.add({
      //     id: item.id,
      //     sort_id: item.sort_id
      //   })
      // })
      for(let i = 0; i < this.recommendList.length; i++) {
        if(!reg.test(this.recommendList[i].sort_id)) return this.$message.warning("首图推挤排序只能输入整数")
        sortList.add({
          id: this.recommendList[i].id,
          sort_id: this.recommendList[i].sort_id
        })
      }
      let arrList = Array.from(this.recommendList)
      if(arrList.length) {
         this.IsSort = false
      } else {
        return this.IsSort = !this.IsSort
      }
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
    delRecommeListdImg(index, item){
      this.delRecommendImgIdList.push({id: item.id})
      this.recommendList.splice(index, 1)
      this.prodcutImgList.forEach(it => {
        it.imgList.forEach(i => {
          item.id === i.id ? i.is_first = 0 : ""
        })
      })
    },
    async _submitPicAll() {
      const ishaveImg = this.prodcutImgList.some(item => {
        return item.imgList.length
      })
      if(ishaveImg && this.recommendList.length) {

      } else {
        if(!ishaveImg) return this.$message.warning("请上传酒店图片")
        if(!this.recommendList.length) return this.$message.warning("请设置酒店推荐图")      
      }
      let allList = new Set()
      this.prodcutImgList.forEach(item => {
        item.imgList.some(it => {
          allList.add({
            id: it.id,
            type_id : item.id,
            title : item.name,
            product_id : this.hotelId,
            desc : it.desc || "",
            url : it.url
          })
        })    
      })
      const sortList = new Set()
      this.recommendList.forEach((item, index) => {
        sortList.add(
          {
            id: item.id,
            sort_id: item.sort_id || index+1
          }
        )
      })
      const saveParams = {
         data: {
           imgInfo: allList,
           sortInfo: sortList,
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

          if(data.code !==0) return this.$message.error(data.msg)
        }

        if(this.isAdd) {
          const { data } = await promise_hotelLastSave(saveParams)
  
          if(data.code != 0) return this.$message.error(data.msg)
          this.$message.success("保存成功")
        } else {
          const { data } = await promise_hotelLastEdit(saveParams)

          if(data.code != 0) return this.$message.error(data.msg)
          this.$message.success("保存成功")         
        }
        this.$router.push('/hotel/hotelList')
      }
      catch(err) {
        console.log(err)
      }
    },
    changeItem(index, ind) {      
      this.prodcutImgList[index].imgList[ind].checked = this.prodcutImgList[index].imgList[ind].checked  == true? false : true;
    },
   async  _handleSetFristImg(index, ind, event){
      if(event) event.preventDefault();
      if(this.recommendList.length > 9) return this.$message.warning('推荐图仅限10张！')
      const itemImg = this.prodcutImgList[index].imgList[ind]
      const params = {
        data: {
          id: itemImg.id,
          desc: itemImg.desc
        }
      }
      const { data } = await promise_hotelSetFirst(params)

      if(data.code !== 0) return this.$message.error(data.msg)
      this.prodcutImgList[index].imgList[ind].is_first = '1';
      this.recommendList.push(itemImg)
      // console.log(this.recommendList,'recommendlist')
      // this.recommendList.forEach((item,index) => {
      //   item.sort_id = index+1
      // })
    },
    backList() {
      this.$router.push('/hotel/hotelList')
    },
  }
}
</script>


