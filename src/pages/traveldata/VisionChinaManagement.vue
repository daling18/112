<template>
<!-- application\index\view\dev\src\components\system\VisionChinaManagement.vue -->
  <div class="wrapper">
    <div class="system-search">
      <div class="clearfix">
        <div class="search-box lon">
          <div class="box-label">关键词搜索</div>
          <div class="box-con clearfix">
            <el-input v-model="searchData.keyword"></el-input>
          </div>
        </div>
        <div class="search-box">
          <div class="box-label">色彩</div>
          <div class="box-con clearfix">
            <el-select
              class="width"
              v-model="searchData.color_type">
              <el-option label='全部' value=''></el-option>
              <el-option label='黑白' value='1'></el-option>
              <el-option label='彩色' value='2'></el-option>
            </el-select>
          </div>
        </div>
        <div class="search-box">
          <div class="box-label">构图</div>
          <div class="box-con clearfix">
            <el-select
              class="width"
              v-model="searchData.orientation">
              <el-option label='全部' value=''></el-option>
              <el-option label='横图' value='1'></el-option>
              <el-option label='竖图' value='2'></el-option>
              <el-option label='方图' value='3'></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="clearfix">
        <div class="search-box lon">
          <div class="box-label">图片类型</div>
          <div class="box-con clearfix" style="padding-top:2px;">
            <el-checkbox-group v-model="graphical_style">
              <el-checkbox label='1'>摄影图片</el-checkbox>
              <el-checkbox label='2'>插画</el-checkbox>
              <el-checkbox label='3'>漫画</el-checkbox>
              <el-checkbox label='4'>图表</el-checkbox>
              <el-checkbox label='5'>矢量图</el-checkbox>
              <el-checkbox label='6'>psd</el-checkbox>
              <el-checkbox label='7'>普通全景</el-checkbox>
              <el-checkbox label='8'>360全景</el-checkbox>
              <el-checkbox label='9'>gif</el-checkbox>
              <el-checkbox label='10'>模板</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="search-box lon">
          <div class="box-label">图库类型</div>
          <div class="box-con clearfix" style="line-height: 35px;">
            <el-radio-group v-model="searchData.type" @change='typeChange'>
              <el-radio :class="'filters-radio'" label="0">创意类图库</el-radio>
              <el-radio :class="'filters-radio'" label="1">编辑类图库</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="getVcgImages(true)">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <div class="top-menu clearfix">
          <el-checkbox v-model="allcheck" @change="handleAllCheck">全选</el-checkbox>
          <el-button type='primary' @click="opendialog">加入相册</el-button>
        </div>
        <div v-if="list.length > 0" class="album-wrap clearfix">
          <el-checkbox-group v-model="photoList">
            <div v-for="(item, index) in list" class="album-item" :key="index">
              <div class="album-img">
                <el-popover
                    placement="right"
                    width="200"
                    trigger="hover"
                    :disabled=" resData.type == '1' "
                    background="yellow"
                    :content="item.keyword"
                    @show="_queryKeywords(item.id,index)">
                  <router-link
                    :to="{path: '/traveldata/visionChinaDetail', query: {id: item.id}}"
                    :style='`background-image: url(${item.small_url});background-size: cover;background-position: center center;`'
                    slot="reference">
                  </router-link>
                  <!-- <div v-if="item.keyword" class="keywords-box">
                    <p>{{item.keyword}}</p>
                  </div> -->
                </el-popover>
              </div>
              <div class="album-tit ellipsis">
                 <el-checkbox :label="item.id" :key="index">&nbsp;</el-checkbox>
                 {{ searchData.type == '0' ? item.title : item.group_title}}
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div v-else class="no-data">
          暂无数据
        </div>
        <div v-if="total_page > 0" class="page">
          <el-pagination  layout="prev, pager, next" :current-page='resData.page' :page-count="total_page" @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="加入相册" :visible.sync="dialogType">
      <div class="dia-content">
        <el-form label-width='100px'>
            <el-form-item
              label='相册名称'>
              <el-input v-model="albumName" class="width"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-album clearfix">
          <el-checkbox-group v-model="albumcheck">
            <div
              v-for="(item, index) in albumlist"
              v-if="item.show"
              class="dialog-album-item"
              :key="index">
              <el-tooltip effect="dark" :content="item.name" placement="bottom">
                <el-checkbox
                  :label="item.id">
                    {{item.name}}
                </el-checkbox>
              </el-tooltip>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closedialog">取 消</el-button>
        <el-button type="primary" @click="uploadVcgPic">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getVcgImages, uploadVcgPic, getPhotoalbumcate } from 'src/api/photoalbum'
import { promise_getVcgImageInfo } from 'src/api/promise_api'

export default {
  data () {
    return {
      total_page: 0,
      graphical_style: [],
      photoList: [],
      allcheck: false,
      searchData: {
        id: '',
        keyword: '',
        orientation: '',
        color_type: '',
        graphical_style: '',
        type: '0',
        page: 1,
        nums: 40
      },
      resData: {
        id: '',
        keyword: '',
        orientation: '',
        type: '0',
        color_type: '',
        graphical_style: '',
        page: 1,
        nums: 40
      },
      list: [],
      albumlist: [],
      dialogType: false,
      albumName: '',
      albumcheck: []
    }
  },
  watch: {
    graphical_style: function (newVal, oldVal) {
      let str = ''
      if (newVal) {
        newVal.forEach((item, index) => {
          str = str + item + ','
        })
        str = str.substring(0, str.length - 1)
      }
      this.searchData.graphical_style = str
    },
    photoList: function (newVal, oldVal) {
      if (this.photoList.length === this.list.length && this.list.length !== 0) {
        this.allcheck = true
      } else {
        this.allcheck = false
      }
    },
    albumName: function (newVal, oldVal) {
      this.albumlist.forEach((item, index) => {
        item.show = false
        for(let i = 0; i < item.name.length; i++) {
          if(item.name.indexOf(this.albumName) !== -1) {
            item.show = true
          }
        }
      })
    }
  },
  methods: {
    getVcgImages (type) {
      if (type) {
        this.searchData.page = 1
        this.resData = {...this.searchData}
      } else {
        this.searchData = {...this.resData}
      }
      let params = {
        data: {...this.resData}
      }
      getVcgImages({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            if (result.data.list) {
              this.list = result.data.list
            }
            this.total_page = result.data.total_page
            this.allcheck = false
            this.photoList = []
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
    typeChange (val) {
      if (val === '1') {
        this.$alert('请优先选择创意类图库，如创意类图片不满足使用需求，可去编辑类图库搜索，当使用编辑类图库的图片时，请优先选择不带人物的纯风景类图片，以免造成人物肖像侵权。', '风险提示', {
          confirmButtonText: '确认已读',
          showClose: false
        });
      }
    },
    uploadVcgPic () {
      if (this.albumcheck.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择相册'
        })
        return false
      }
      // let idArr = []
      // let nameArr = []
      // this.photoList.forEach((item, index) => {
      //   this.list.forEach((item1, index1) => {
      //     if (item === item1.id) {
      //       nameArr.push(item1.title)
      //       idArr.push(item1.id)
      //     }
      //   })
      // })
      let params = {
        data: {
          photoalbum_id: [...this.albumcheck],
          name: [],
          id_arr: this.photoList
        }
      }
      uploadVcgPic({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.allcheck = false
            this.photoList = []
            this.albumcheck = []
            this.dialogType = false
            this.albumName = ''
            this.getVcgImages()
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
    handleAllCheck () {
      if (this.allcheck) {
        this.photoList = this.list.map((item, index) => item.id)
      } else {
        this.photoList = []
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
            this.albumlist = result.data.map(item => {
              item.show = true
              return item
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
    opendialog () {
      if (this.photoList.length > 0) {
        this.dialogType = true
      } else {
        this.$message({
          type: 'error',
          message: '请选择图片'
        })
      }
    },
   async _queryKeywords(id,index){
      const params = {
        data:{
          ids:id
        }
      }
      let listitem = this.list[index]
      const {  data } = await promise_getVcgImageInfo(params)
      if(data.code == 0) {
        listitem = data.data[0].images_data.keywords
        if (!listitem) listitem = '无关键字'
        this.$set(this.list[index],'keyword',listitem)
      }
   },
    closedialog () {
      this.dialogType = false
      this.albumcheck = []
      this.albumName = ''
    },
    currentPageChange (page) {
      this.resData.page = page
      this.getVcgImages()
    }
  },
  mounted() {
    this.getVcgImages()
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
      a {
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
  }
}
.search-box {
  float: left;
  margin: 0 0 10px;
  .box-label {
    float: left;
    width: 40px;
    height: 35px;
    line-height: 35px;
  }
  .box-con {
    float: left;
    max-height: 60px;
    // overflow: auto;
    margin: 0 30px 0 0;
  }
  &.lon {
    .box-label {
      width: 80px;
    }
    .box-con {
      margin: 0 60px 0 0;
    }
  }
  .box-item {
    float: left;
    padding: 0 10px;
    cursor: pointer;
  }
}
.width {
  width: 196px;
}
.dialog-album-item {
  float: left;
  width: 20%;
  height: 30px;
  margin: 0 30px 10px 0;
  box-sizing: border-box;
  overflow: hidden;
  .el-checkbox {
    overflow: hidden;
  }
  .el-checkbox+.el-checkbox {
    margin-right: 15px;
    margin-left: 0px;
    margin-top: 10px;
  }
}
.dialog-album {
  margin: 15px 0 0;
  padding: 0px 0 0 30px;
  height: 100px;
  overflow: auto;
}
.no-data {
  padding:  100px 0;
  text-align: center;
  font-size: 20px;
  color: #333;
}
</style>
