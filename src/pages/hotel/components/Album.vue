<template>
  <el-dialog
    title="从图片库中选择"
    :visible="visible"
    :before-close='closeDialog'>
    <div v-if="pictureList.length > 0" class="album-wrap clearfix">
      <el-checkbox-group v-model="checkList">
        <div v-for="(item, index) in pictureList" class="album-item" :key="index">
          <div class="album-img">
            <a :href="item.url" target="_blank" >
              <img :src="item.url" alt="">
            </a>
          </div>
          <div class="album-tit ellipsis">
            <el-checkbox :label="item.url" :key="index">{{item.title}}</el-checkbox>
          </div>
        </div>
      </el-checkbox-group>
    </div>
    <div v-else class="no-data">
      暂无数据
    </div>
    <!-- <div class="page" style="padding: 0" v-if="pictureList.length > 0">
      <el-pagination  layout="prev, pager, next" :current-page='album.page' :total="total" @current-change="_currentPageChange">
      </el-pagination>
    </div> -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="_selectPicture">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
/*
* 图片库弹窗组件

* 支持参数
* visible | Boolean | 打开关闭弹窗
* max | Number | 可被勾选的图片的最大数量
* check | Array | 已选择的图片(由于当前业务逻辑图片id要传，所以绑定值均为对象)
* checkkey | String | 作为 check 唯一标识的键名，绑定值为对象类型时必填(目前匹配的是图片路径)
* idkey | String | 图片id
*
* 支持事件
* imageArray(data) | data包含所选中值的数组
*/
import {getPhotoalbumSubList, getPhotoalbumcate} from "src/api/api"
import { promise_hotelSresource } from 'src/api/promise_api'

export default {
  name: 'Album',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 0
    },
    check: {
      type: Array,
      default: () => []
    },
    checkkey: {
      type: String,
      default: ''
    },
    idkey: {
      type: String,
      default: 'id'
    },
     hotelId: null,
    typeId: null
  },
  data () {
    return {
      checkalbum: '',
      checkList: [],
      albumlist: [],
      pictureList: [],
      total: 1,
      album: {
        page: 1,
        name: ''
      },
      resData: [],
      first: true
    }
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal) {
        this.openDialog()
      } else {
        this.closeDialog()
      }
    },
    checkList (newVal, oldData) {
      newVal.forEach((item, index) => {
        this.pictureList.forEach((item1, index1) => {
          if (item === item1.url) {
            this.resData.push(item1)
          } else {
            let obj = {
              id: '',
              desc: '',
              title: '',
              url: item
            }
            this.resData.push(obj)
          }
        })
      })
      this.resData.forEach((item, index) => {
        if (newVal.indexOf(item.url) === -1) {
          this.resData.splice(index, 1)
        }
      })
      this.resData.forEach((item, index) => {
        this.check.forEach((item1, index1) => {
          if (this.checkkey && (item1[this.checkkey] === item.url)) {
            if (!item.id) {
              item.id = item1[this.idkey]
              Object.assign(item, item1)
            }
          }
        })
      })
       let result = [];
      let obj = {};
      for(var i = 0; i < this.resData.length; i++){
        if (!this.checkkey) {
          if (!obj[this.resData[i].url]) {
            result.push(this.resData[i]);
            obj[this.resData[i].url] = true;
          }
        } else {
          if(!obj[this.resData[i].url] && this.resData[i].id) {
            // console.log(this.resData[i].id)
            result.push(this.resData[i]);
            obj[this.resData[i].url] = true;
          }
        }
      }
      if (newVal.length === 0) {
        this.resData = []
      } else {
        this.resData = result
      }
    }
  },
  methods: {
    async _gethotelSresource() {
      this.pictureList = []
      const params = {
        data: {
          product_id: this.hotelId,
          type_id: this.typeId
        }
      }
      try {
        const {data} = await promise_hotelSresource(params)

        // if(data.code !== 0) return this.$message.error(data.msg)
        this.pictureList = data.data
        // this.album.page = data.page_index
        this.total = data.data.length
        if (this.first) {
          this.first = false
          this.check.forEach((item, index) => {
            if (this.checkkey) {
              this.checkList.push(item[this.checkkey])
            } else {
              this.checkList.push(item)
            }
          })
        }
      } catch(err) {
        console.log(err)
      }
    },
    _selectPicture () {
      console.log(this.resData,'submitresData')
      let can = true
      if (this.max != 0) {
        if (this.checkList.length > this.max) {
          this.$message({
            type: 'error',
            message: `图片最多${this.max}张`
          })
          can = false
        }
      }
      if (can) {
        this.$emit('imageArray', this.resData);
        this.$emit('update:visible', false);
        this.resData = []
      }

    },
    openDialog () {
      this.first = true
      this.album.name = ''
      this.checkalbum = ''
      this._gethotelSresource()
    },
    closeDialog () {
      this.$emit('update:visible', false);
      this.checkalbum = ''
      this.checkList = []
    },
    // _currentPageChange (page) {
    //   this.album.page = page
    //   this._gethotelSresource()
    // }
  }
}  
</script>
<style lang="less" scoped>
.album-wrap {
  overflow: auto;
  max-width:  660px;
  height: 300px;
  margin: 0 auto;
  // text-align: center;
  .album-item {
    position: relative;
    display: inline-block;
    width: 100px;
    margin: 0px 10px 20px;
    border: 1px solid #dddddd;
    .album-img {
      overflow: hidden;
      width: 100px;
      height: 100px;
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
  }
}
.no-data {
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
}
</style>
