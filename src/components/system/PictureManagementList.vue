<template>
  <div class="wrapper">
    <!-- <div class="system-tab">
      <ul class="tab-box">
        <li class="on">相册管理</li>
      </ul>
    </div> -->
    <div class="system-content">
      <div class="content-list">
        <div class="top-btn-wrap">
          <el-button @click="openDialog()" type='default'>创建相册</el-button>
          <router-link 
            v-if="$menuPermission('api/photoalbum/get_vcg_images')"
            :to="{
              path: '/system/visionChina'
            }"
          >
            <el-button type='text' class="color-purple">视觉中国图片</el-button>
          </router-link>
        </div>
        <div class="album-wrap clearfix">
          <router-link :to="{path: '/system/picture-detail', query: {id: item.id}}" v-for="(item, index) in albumList" class="album-item" :key="index">
            <span @click.prevent="delPhotoalbum(item.id)" class="album-close">X</span>
            <span @click.prevent="openDialog(item)" class="album-edit">编辑</span>
            <div class="album-img" :style="`background: url(${item.pic_url}) center center no-repeat; background-size: cover;`"></div>
            <div class="album-tit ellipsis">{{item.name}}</div>
          </router-link>
        </div>
        <div class="page" v-show="albumList.length > 0">
          <el-pagination  layout="prev, pager, next" :current-page='page' :total="total" :page-size='nums' @current-change="currentPageChange">
          </el-pagination>
        </div>
        <el-dialog
          :title="`${dialogTit}相册`"
          :visible.sync="dialogVisible">
          <el-form label-width='100px'>
            <el-form-item 
              label='相册名称'
              required>
              <el-input v-model="createAlbumData.name"></el-input>
            </el-form-item>
            <el-form-item
              label='相册描述'
              required>
              <el-input v-model="createAlbumData.desc"></el-input>
            </el-form-item>
            <el-form-item
              label='封面'>
              <el-upload
                action="/bom/api/photoalbum/upload_pic"
                :on-remove="handleRemove"
                :on-success='handleSuccess'
                :show-file-list='false'
                :file-list="fileList">
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item
              v-if="fileList.length > 0">
              <div 
                v-for="(item, index) in fileList"
                :key="index" class="upload-img-box"
                :style="`background: url(${item.path}) center center / cover no-repeat;`"></div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="createPhotoalbum">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import {getPhotoalbumList,
        createPhotoalbum,
        delPhotoalbum,
        editPhotoalbum} from 'src/api/photoalbum'
export default {
  data () {
    return {
      page: 1,
      albumList: [],
      total: 0,
      nums: 40,
      dialogVisible: false,
      fileList: [],
      dialogTit: '创建',
      createAlbumData: {
        id: '',
        name: '',
        desc: '',
        pic_url: ''
      }
    }
  },
  methods: {
    getPhotoalbumList () {
      let params = {
        data: {
          page: this.page,
          nums: this.nums
        }
      }
      getPhotoalbumList({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.albumList = result.data.data
            this.total = result.data.total_count
            this.page = result.data.page_index
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    openDialog (item) {
      this.dialogTit = '创建'
      if (item) {
        this.dialogTit = '编辑'
      }
      this.dialogVisible = true
      this.createAlbumData.id = item && item.id ? item.id : ''
      this.createAlbumData.name = item && item.name ? item.name : ''
      this.createAlbumData.desc = item && item.desc ? item.desc : ''
      this.createAlbumData.pic_url = item && item.pic_url ? item.pic_url : ''
      this.fileList = []
      if (item && item.pic_url) {
        this.fileList.push({name: item.name, path: item.pic_url})
      }
    },
    handleRemove(file, fileList) {
      this.fileList = []
    },
    handleSuccess (response, file, fileList) {
      this.fileList =  []
      if (response.code === 0) {
        this.fileList.push(response.data)
        this.$message({
          type: 'success',
          message: response.msg
        })
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    },
    createPhotoalbum () {
      if (this.fileList.length > 0) {
        let str = this.fileList[0].path.split('/');
        if (str[str.length - 1] === 'no_page.png') {
          this.createAlbumData.pic_url = ''
        } else {
          this.createAlbumData.pic_url = this.fileList[0].path
        }
      }
      let params = {
        data: this.createAlbumData
      }
      let func = createPhotoalbum
      if (this.createAlbumData.id) {
        func = editPhotoalbum
      }
      func({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.page = 1
            this.getPhotoalbumList()
            this.dialogVisible = false
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    delPhotoalbum (id) {
      this.$confirm('确认删除相册', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            id: id
          }
        }
        delPhotoalbum({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.getPhotoalbumList()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
        }).catch(() => {        
        })
    },
    currentPageChange (page) {
      this.page = page
      this.getPhotoalbumList()
    }
  },
  mounted() {
    this.getPhotoalbumList()
  },
}
</script>
<style lang="less" scoped>
  .album-wrap {
    padding: 15px 0;
    width: 880px;
    .album-item {
      position: relative;
      float: left;
      width: 150px;
      margin: 0 10px 20px;
      border: 1px solid #dddddd;
      .album-img {
        overflow: hidden;
        width: 150px;
        height: 150px;
        img {
          display: block;
          width: 100%;
          min-height: 100%;
        }
      }
      .album-tit {
        padding: 10px 5px;
        font-size: 14px;
        color: #333333;
        border-top: 1px solid #ddd;
      }
      .album-close {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 20px;
        height: 20px;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 20px;
        color: #fff;
        cursor: pointer;
      }
      .album-edit {
        position: absolute;
        top: 120px;
        right: 10px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }
    }
  }
  .upload-img-box {
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    img {
      display: block;
      width: 100px;
      height: 100px;
    } 
  }
</style>
