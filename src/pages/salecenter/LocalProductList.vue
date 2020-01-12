<template>
<!-- application\index\view\dev\src\components\distribution\LocalProductList.vue -->
  <div class="wrapper">
    <div class="system-search clearfix">
      <div class="search-box">
        <div class="box-label">商品分类</div>
        <div class="box-con clearfix">
          <div 
            class="box-item"
            :class="item.sel ? 'color-purple' : ''"
            @click="selectItem(item)"
            v-for="(item, index) in cfg_type"
            :key="index">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <div class="top-menu clearfix">
          <div class="top-menu-label">商品名称</div>
          <el-input class="width" v-model="searchData.name"></el-input>
          <el-button @click="saleLists(true)" type='primary'>搜索</el-button>
        </div>
        <div v-if="listData.length > 0" class="list-wrap">
          <div
            v-for="(item, index) in listData"
            :key="index"
            class="list-item">
            <div class="pic" :style="`background-image: url(${item.sub_pic_url})`">
              <!-- <img :src="item.sub_pic_url" alt=""> -->
            </div>
            <div class="info">
              <h2 class="info-tit">{{item.name}}</h2>
              <div class="info-add">
                <span class="color-gray">城市</span>
                <em v-if="item.country_id == 'CHN'">{{item.province_name}}{{item.city_name}}</em>
                <em v-else>{{item.country_name}}</em>
                <span class="color-gray">服务质量</span>
                <em v-for="(data, ind) in item.service_guarantees" :key="ind">{{data}}</em>
              </div>
              <div class="info-con">
                <div>
                  {{ item.detail | noHtml }}
                </div>
              </div>
              <div class="info-btn">
                <el-button @click="openDialog(item)" type='text' class="color-purple">查看详情</el-button>
              </div>
            </div>
            <div class="money">
              <div>结算价
                <span class="color-orange">￥{{ item.min_peer_price }}</span>
                <span class="color-gray">起</span>
              </div>
              <div>销售价
                <span class="color-orange">￥{{ item.min_out_price }}</span>
                <span class="color-gray">起</span>
              </div>
              <!-- <el-button type='primary' @click="openSel(item)">预订</el-button> -->
              <router-link :to="{path: '/salecenter/local-product/order', query: {id: item.id, type: '1'}}">
                <el-button type='primary'>预订</el-button>
              </router-link>
            </div>
          </div>
        </div>
        <div v-else class="warm-tip">
          <p>没有符合您搜索条件的信息，做些其他尝试吧。 :)</p>
        </div>
      </div>
    </div>
    <div v-if="total > 0" class="page">
      <el-pagination  layout="prev, pager, next" :current-page='resData.page' :total="total" @current-change="currentPageChange">
      </el-pagination>
    </div>
    <el-dialog
      title="商品详情"
      :visible.sync="dialogVisible">
      <div class="dialog-info" v-html="detail"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog
      title="选择预订对象"
      size='tiny'
      :visible.sync="dialogVisible2">
      <div class="dialog-book-con">
        <router-link :to="{path: '/distribution/local-product/order', query: {id: id, type: '2'}}">同行订单</router-link>
        <router-link :to="{path: '/distribution/local-product/order', query: {id: id, type: '1'}}">直客订单</router-link>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import {saleLists} from 'src/api/self_support.localproduct'
export default {
  data () {
    return {
      id:'',
      cfg_type: [],
      searchData: {
        name: '',
        type: '',
        page: 1
      },
      resData: {
        name: '',
        type: '',
        page: 1
      },
      total: 0,
      listData: [],
      detail: '',
      dialogVisible: false,
      selItemId: '',
      dialogVisible2: false
    }
  },
  filters: {
    noHtml: (html) => {
      let data = html || '';
      if (data) {
        data = data.replace(/<[^>]+>/g,"")
        data = data.replace(/&nbsp;/g,'')
      }
      return data
    }
  },
  methods: {
    saleLists (type) {
      if (type) {
        this.searchData.page = 1
        this.resData = {...this.searchData}
      } else {
        this.searchData = {...this.resData}
      }
      let params = {
        data: this.resData
      }
      saleLists({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.listData = result.data.lists
            this.resData.page = result.data.page_index
            this.total = result.data.total_count
            this.cfg_type = [{
              id: '',
              name: '全部',
              code: '',
              sel: true
            }]
            for (let i in result.data.cfg_type) {
              let obj = {
                id: result.data.cfg_type[i].id,
                name: result.data.cfg_type[i].name,
                code: result.data.cfg_type[i].code,
                sel: false
              }
              if (this.selItemId && this.selItemId === obj.id) {
                obj.sel = true
                this.cfg_type[0].sel = false
              }
              this.cfg_type.push(obj)
            }
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
      this.dialogVisible = true
      this.detail = item.detail
    },
    selectItem (item) {
      this.cfg_type.forEach((itm, idx) => {
        if (itm.id === item.id) {
          item.sel = true
          this.searchData.type = item.id
          this.selItemId = item.id
          this.saleLists(true)
        } else {
          itm.sel = false
        }
      })

    },
    openSel (item) {
      this.id = item.id
      this.dialogVisible2 = true
    },
    currentPageChange (page) {
      this.resData.page = page
      this.saleLists()
    }
  },
  mounted() {
    this.saleLists()
  },
}
</script>
<style lang="less" scoped>
  .top-menu {
    position: relative;
    padding: 0 0 0 70px;
    .top-menu-label {
      position: absolute;
      top: 0;
      left: 0;
      height: 35px;
      line-height: 35px;
      z-index: 1;
    }
    .width {
      width: 200px;
    }
  }
  .list-wrap {
    .list-item {
      display: flex;
      flex-flow: row;
      padding: 15px 0 15px 0px;
      height: 190px;
      border-bottom: 1px solid #cccccc;
      .pic {
        width: 220px;
        height: 190px;
        background-size: cover;
        background-position: center center;
        img {
          width: 220px;
          height: 190px;
        }
      }
      .money {
        padding: 30px 0;
        text-align: center;
        width: 170px;
        .el-button{
          margin-top: 10px;
        }
      }
      .info {
        flex: 1;
        padding: 0 0 0 20px;
        .info-tit {
          font-size: 14px;
          font-weight: bold;
        }
        .info-add {
          padding: 15px 0;
          font-size: 14px;
          span {
            }
          em {
            padding: 0 15px;
            font-style: normal;
          }
        }
        .info-con {
          max-height: 80px;
          overflow: hidden;
        }
        .info-btn {
          padding: 10px 0 0;
        }
      }
    }
  }
  .dialog-info {
    max-height: 300px;
    overflow: auto;
  }
  .search-box {
    display: flex;
    flex-flow: row;
    .box-label {
      width: 70px;
    }
    .box-con {
      flex: 1;
      max-height: 60px;
      overflow: auto;
      margin: 0 50px 0 0;
    }
    .box-item {
      float: left;
      padding: 0 10px;
      cursor: pointer;
    }
  }
  .warm-tip {
    background: #fff;
    padding: 70px 0 130px;
    p {
      text-align: center;
      padding-top: 85px;
      color: #5e7382;
      background: url('../../assets/icons/empty_data.png') no-repeat center top;
      background-size: 80px 60px;
    }
  }
  .dialog-book-con {
    padding: 0px 0 20px;
    text-align: center;
    a {
      margin: 0 10px;
    }
  }
</style>
