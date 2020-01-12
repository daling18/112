<template>
  <div>

    <div v-show="upload.status=='ready'">

      <input type="text" v-model="imageUrl" maxlength="255" :placeholder="$parent.locale['please enter a url']">
      <button type="button" @click="insertImageUrl">{{ $parent.locale.save }}</button>

      <button type="button" @click="albumInstant.visible=true">图片库</button>
      
      <button v-if="!hasAgreement" @click="agreement.img_accord=true">本地上传</button>
      <el-upload
        v-else
        action="/api/v1/photo/upload"
        :before-upload = "handleBeforeUpload"
        :file-list = "fileList"
        class="localUploadImg"
        >
        <el-button type="button" >本地上传</el-button>
      </el-upload>
      <a class="localUploadImg" @click="agreement.img_accord=true">查看本地图片使用协议</a>
      <!-- <button type="button" @click="albumInstant.visible=true">本地图片</button> -->
    </div>
    <!-- <album
      :visible.sync="showAlbumDialog"
      :max="10"
      @imageArray="insertImage4Album"
      checkkey="sub_pic_url"
    /> -->

  </div>

</template>

<script>

import Vue from 'vue'
import Album from 'src/plugins/Album'
import UploadImgAgreement from 'src/plugins/uploadImgAgreement'
import Command from 'vue-html5-editor/src/range/command'
import ImageCompressor from 'image-compressor.js'
import { uploadimage , getPhotoAgreement } from 'src/api/uploadpictures'

/**
 * Created by peak on 2017/2/10.
 */
export default {
  components: {
    Album,
    UploadImgAgreement
  },
  data() {
    return {
      fileList: [],
      imageUrl: '',
      upload: {
        status: 'ready', // progress,success,error,abort
        errorMsg: null,
        progressComputable: false,
        complete: 0
      },
      showAlbumDialog: false,
      albumInstant: null,
      agreement: null,
      hasAgreement: false,
      ratifyMsg: {}
    }
  },
  mounted() {

    // 图库
    const albumConstructor = Vue.extend(Album);
    this.albumInstant = new albumConstructor({
      el: document.createElement('div'),
      router: this.$router
    })
    this.albumInstant.max = 10;
    this.albumInstant.checkkey = 'sub_pic_url';
    this.albumInstant.$on('imageArray', this.insertImage4Album)
    this.albumInstant.$on('update:visible', (visible)=>{
      this.albumInstant.visible = visible
    })
    document.body.appendChild(this.albumInstant.$el)

    // 本地上传协议
    var params = {};
    var that = this;
    getPhotoAgreement({
      params,
      success: (res) => {
        let result = res.data;
        if (result.code === 0) {
          if(result.data.is_agreed){
            that.hasAgreement = true;
            that.ratifyMsg = result.data.user;
            that.ratifyMsg.agreed_time = result.data.agreed_time;
          }else{
            that.hasAgreement = false;
          }
          initUploadImg();
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }
    })

    function initUploadImg (){
      const uploadAgreement = Vue.extend(UploadImgAgreement);
      that.agreement = new uploadAgreement({
        el: document.createElement('div'),
        router: that.$router
      })
      that.agreement.ratifyMsg = that.ratifyMsg;
      that.agreement.isAgreement = that.hasAgreement;
      that.agreement.img_accord = false;
      that.agreement.$on('isAgreement', that.changeIsAgreement)

      document.body.appendChild(that.agreement.$el)
    }
  },
  beforeDestroy() {
    if (this.albumInstant) {
      console.log('destroy: ', this.albumInstant.$el)
      const el = this.albumInstant.$el;
      this.albumInstant.$destroy()
      document.body.removeChild(el);
      this.albumInstant = null
    }
  },
  methods: {
    changeIsAgreement(isAgreement){
      this.hasAgreement = isAgreement;
    },
    reset(){
      this.upload.status = 'ready'
    },
    insertImageUrl() {
      if (!this.imageUrl) {
        return
      }
      this.$parent.execCommand(Command.INSERT_IMAGE, this.imageUrl)
      this.imageUrl = null
    },
    insertImage4Album (images) {
      console.log('images: ', images)
      if (Array.isArray(images)) {
        images.forEach(image => {
          this.$parent.execCommand(Command.INSERT_IMAGE, image.sub_pic_url)
        })
      }
      this.albumInstant.visible = false;
    },
    handleBeforeUpload(files){
      var that = this;
      new ImageCompressor(files, {
        quality: .8,
        maxWidth: 1000,
        success(result) {
          const formData = new FormData();
          formData.append('file', result, result.name);

          uploadimage({
            params: formData,
            success(res){
              if(res.data.code == 0){
                that.$parent.execCommand(Command.INSERT_IMAGE, res.data.data.path)
              }else{
                that.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }
          })
        },
        error(e) {
          console.log(e.message);
        },
      });

      return false;
    }
    // pick() {
    //   this.$refs.file.click()
    // },
    // setUploadError(msg){
    //   this.upload.status = 'error'
    //   this.upload.errorMsg = msg
    // },
    // process() {
    //   const component = this
    //   const config = this.$options.module.config
    //   // compatibility with older format
    //   // {
    //   //     server: null,
    //   //     fieldName: 'image',
    //   //     compress: true,
    //   //     width: 1600,
    //   //     height: 1600,
    //   //     quality: 80
    //   // }
    //   // ----------- divider ----------------
    //   // {
    //   //     upload: {
    //   //         url: null,
    //   //         headers: {},
    //   //         params: {},
    //   //         fieldName: {}
    //   //     },
    //   //     compress: {
    //   //         width: 1600,
    //   //         height: 1600,
    //   //         quality: 80
    //   //     },
    //   // }

    //   if (!config.upload && typeof config.server === 'string') {
    //     config.upload = {url: config.server}
    //   }
    //   if (config.upload && !config.upload.url) {
    //     config.upload = null
    //   }
    //   if (config.upload && typeof config.fieldName === 'string') {
    //     config.upload.fieldName = config.fieldName
    //   }

    //   if (typeof config.compress === 'boolean') {
    //     config.compress = {
    //       width: config.width,
    //       height: config.height,
    //       quality: config.quality
    //     }
    //   }

    //   const file = this.$refs.file.files[0]
    //   if (file.size > config.sizeLimit) {
    //     this.setUploadError(this.$parent.locale['exceed size limit'])
    //     return
    //   }
    //   this.$refs.file.value = null

    //   if (config.compress) {
    //     config.compress.fieldName = config.upload && config.upload.fieldName
    //       ? config.upload.fieldName : 'image'
    //     lrz(file, config.compress).then((rst) => {
    //       if (config.upload) {
    //         component.uploadToServer(rst.file)
    //       } else {
    //         component.insertBase64(rst.base64)
    //       }
    //     }).catch((err) => {
    //       this.setUploadError(err.toString())
    //     })
    //     return
    //   }
    //   // 不需要压缩
    //   // base64
    //   if (!config.upload) {
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //       component.insertBase64(e.target.result)
    //     }
    //     reader.readAsDataURL(file)
    //     return
    //   }
    //   // 上传服务器
    //   component.uploadToServer(file)
    // },
    // insertBase64(data) {
    //   this.$parent.execCommand(Command.INSERT_IMAGE, data)
    // },
    // uploadToServer(file) {
    //   const config = this.$options.module.config

    //   const formData = new FormData()
    //   formData.append(config.upload.fieldName || 'image', file)

    //   if (typeof config.upload.params === 'object') {
    //     Object.keys(config.upload.params).forEach((key) => {
    //       const value = config.upload.params[key]
    //       if (Array.isArray(value)) {
    //         value.forEach((v) => {
    //           formData.append(key, v)
    //         })
    //       } else {
    //         formData.append(key, value)
    //       }
    //     })
    //   }

    //   const xhr = new XMLHttpRequest()

    //   xhr.onprogress = (e) => {
    //     this.upload.status = 'progress'
    //     if (e.lengthComputable) {
    //       this.upload.progressComputable = true
    //       const percentComplete = e.loaded / e.total
    //       this.upload.complete = (percentComplete * 100).toFixed(2)
    //     } else {
    //       this.upload.progressComputable = false
    //     }
    //   }

    //   xhr.onload = () => {
    //     if (xhr.status >= 300) {
    //       this.setUploadError(`request error,code ${xhr.status}`)
    //       return
    //     }

    //     try {
    //       const url = config.uploadHandler(xhr.responseText)
    //       if (url) {
    //         this.$parent.execCommand(Command.INSERT_IMAGE, url)
    //       }
    //     } catch (err) {
    //       this.setUploadError(err.toString())
    //     } finally {
    //       this.upload.status = 'ready'
    //     }
    //   }

    //   xhr.onerror = () => {
    //     // find network info in brower tools
    //     this.setUploadError('request error')
    //   }

    //   xhr.onabort = () => {
    //     this.upload.status = 'abort'
    //   }

    //   xhr.open('POST', config.upload.url)
    //   if (typeof config.upload.headers === 'object') {
    //     Object.keys(config.upload.headers).forEach((k) => {
    //       xhr.setRequestHeader(k, config.upload.headers[k])
    //     })
    //   }
    //   xhr.send(formData)
    // }
  }
}
</script>
<style scoped lang="less">
  .localUploadImg {
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
  }
  .localUploadImg button{
    line-height: 18px;
    font-size: 11px;
    width: auto;;
  }
</style>
