<template>
<!-- application\index\view\dev\src\components\system\PictureManagementDetail.vue -->
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">{{albumTit}}</li>
      </ul>
    </div> 
    <div class="system-search clearfix">
      <el-input v-model="name" placeholder='请输入图片名称搜索' class="long-width"></el-input>
      <div class="search-item search-button">
        <el-button @click="getPhotoalbumSubList" type="primary">搜索</el-button>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <div class="top-menu clearfix">
          <el-checkbox v-model="allcheck" @change="handleAllCheck">全选</el-checkbox>
          <el-select
            v-if="$menuPermission('traveldata/photoalbum/imagesbatchmove')"
            v-model="checkalbum"
            @change='movePhotoalbumSub'
            placeholder="移动到相册">
            <el-option
              v-for="(item, index) in albumlist"
              :label="item.name"
              :value="item.id + ''"
              :key="index"></el-option>
          </el-select>
          <span v-if="$menuPermission('traveldata/photoalbum/imagesbatchdel')" @click="delPhotoalbumSub()" class="color-purple cur">批量删除</span>
          <el-upload
            v-if="$menuPermission('traveldata/photoalbum/uploadimage')"
            class="uploadbtn"
            action="/bom/api/photoalbum/upload_pic"
            :show-file-list='false'
            :on-success='handleSuccess'>
            <el-button type='default'>上传图片</el-button>
          </el-upload>
        </div>
        <div v-if="pictureList.length > 0" class="album-wrap clearfix">
          <el-checkbox-group v-model="checkList">
            <div v-for="(item, index) in pictureList" class="album-item" :key="index">
              <i v-if="$menuPermission('traveldata/photoalbum/imagesbatchdel')" @click.prevent="delPhotoalbumSub(item.id)" class="album-close el-icon-close"></i>
                <a :href="item.sub_pic_url" target="_blank" >
                  <div class="album-img" :style="`background: url(${item.sub_pic_url}) center center / cover no-repeat;`">
                      <!-- <img :src="item.sub_pic_url" alt=""> -->
                  </div>
                </a>
              <div class="album-tit ellipsis">
                <el-checkbox :label="item.id" :key="index">&nbsp;</el-checkbox>
                <input @focus="focus($event)" @blur="editPhotoalbumsub(item)" class="short-width" type="text" v-model="item.name">
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div v-else class="no-data">
          暂无数据
        </div>
        <div class="page" v-show="pictureList.length > 0">
          <el-pagination  layout="prev, pager, next" :current-page='page' :total="total" :page-size='nums' @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getPhotoalbumSubList,
        createPhotoalbumSub,
        delPhotoalbumSub,
        editPhotoalbumsub,
        getPhotoalbumcate,
        movePhotoalbumSub} from 'src/api/photoalbum'
export default {
  data () {
    return {
      id: this.$route.query.id + '',
      page: 1,
      name: '',
      nums: 40,
      pictureList: [],
      total: 0,
      allcheck: false,
      albumlist: [],
      checkalbum: '',
      checkList: [],
      albumTit: ''
    }
  },
  watch: {
    checkList(val) {
      if (val.length === this.pictureList.length && this.pictureList.length !== 0) {
        this.allcheck = true
      } else {
        this.allcheck = false
      }
    }
  },
  methods: {
    getPhotoalbumSubList () {
      let params = {
        data: {
          id: this.id,
          name: this.name,
          page: this.page,
          nums: this.nums
        }
      }
      getPhotoalbumSubList({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.pictureList = result.data.data
            this.total = result.data.total_count
            this.page = result.data.page_index
            this.getPhotoalbumcate()
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
    handleSuccess (response, file, fileList) {
      if (response.code === 0) {
        let params = {
          data: {
            photoalbum_id: this.id,
            pic_url: [response.data.path],
            name: ''
          }
        }
        createPhotoalbumSub({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.page = 1
              this.getPhotoalbumSubList()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    },
    delPhotoalbumSub (id) {
      let idArr = []
      if (id) {
        idArr.push(id)
      } else {
        idArr = [...this.checkList]
      }
      if (idArr.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择图片'
        })
        return false
      }
      this.$confirm('确认删除图片', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            photoalbum_id: this.id,
            id: idArr
          }
        }
        delPhotoalbumSub({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.getPhotoalbumSubList()
              this.checkList = []
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
    editPhotoalbumsub (item) {
      let params = {
        data: {
          id: item.id,
          photoalbum_id: this.id,
          pic_url: item.sub_pic_url,
          name: item.name
        }
      }
      editPhotoalbumsub({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
          this.getPhotoalbumSubList()
        },
        showLoading: true
      })
    },
    handleAllCheck () {
      if (this.allcheck) {
        this.checkList = []
        this.pictureList.forEach((item, index) => {
          this.checkList.push(item.id)
        });
      } else {
        this.checkList = []
      }
    },
    getPhotoalbumcate () {
      let params = {
        data: {}
      }
      getPhotoalbumcate({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.albumlist = result.data
            this.albumlist.forEach((item, index) => {
              if (item.id + '' === this.id) {
                this.albumTit = item.name
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    movePhotoalbumSub () {
      if (!this.checkalbum) {
        return false
      }
      if (this.checkList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择图片'
        })
        this.checkalbum = ''
        return false
      }
      if (this.checkalbum === this.id + '') {
        this.$message({
          type: 'error',
          message: '已在当前相册'
        })
        return false
      }
      let params = {
        data: {
          id: [...this.checkList],
          photoalbum_id: this.checkalbum
        }
      }
      movePhotoalbumSub({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.getPhotoalbumSubList()
            this.checkalbum = ''
            this.checkList = []
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
    currentPageChange (page) {
      this.page = page
      this.allcheck = false
      this.checkList = []
      this.getPhotoalbumSubList()
    },
    focus(e) {
      e.currentTarget.select();
    }
  },
  mounted() {
    this.getPhotoalbumSubList()
    // if (this.id) {
    //   this.getPhotoalbumcate()
    // }
  },
}
</script>
<style lang="less" scoped>
  .long-width {
    float: left;
    width: 300px;
    margin-right: 20px;
  }
  .short-width {
    width: 100px;
  }
  .top-menu {
    .uploadbtn {
      float: right;
    }
    .cur {
      cursor: pointer;
    }
  }
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
        font-size: 20px;
        cursor: pointer;
      }
    }
    input {
      border: 0px;
      // outline: none;
    }
  }
  .no-data {
    padding:  100px 0;
    text-align: center;
    font-size: 20px;
    color: #333;
  }
</style>
