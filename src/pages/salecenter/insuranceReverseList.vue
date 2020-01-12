<template>
<!-- application\index\view\dev\src\components\distribution\LocalProductList.vue -->
  <div class="wrapper">
    <!-- <div class="system-search clearfix">
      <div class="search-box">
        <div class="box-label">产品类型</div>
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
    </div> -->
    <div class="system-search">
      <!-- <div class="search-item">
        <div class="label">产品编号</div>
        <el-input v-model="searchData.name" placeholder="产品编号"/>
      </div> -->
      <div class="search-item">
        <div class="label">产品名称</div>
        <el-input v-model="searchData.productname" placeholder="产品名称"></el-input>
      </div>
      <div class="search-item">
        <div class="label">承保公司</div>
        <el-input v-model="searchData.icompanyname" placeholder="承保公司"></el-input>
      </div>
      <div class="search-item search-button">
        <el-button  @click="saleLists(true)" type="primary">查询</el-button>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <div v-if="listData.length > 0" class="list-wrap">
          <div
            v-for="(item, index) in listData"
            :key="index"
            class="list-item">
            <div class="pic" :style="`background-image: url(${item.productimage})`">
              <img style="width: 100%;height:100%;" :src="item.productimage" :onerror=errImg>
            </div>
            <div class="info">
              <h2 class="info-tit">{{item.productname}}</h2>
              <div class="info-add">
                <span>承保公司:</span>
                <em class="color-gray">{{item.icompanyname}}</em>
              </div>
              <div class="info-con">
                <div>
                  {{ item.productspecialty}}
                </div>
              </div>
            </div>
            <div class="money">
              <div>对外价
                <span class="color-orange">￥{{ item.price }}</span>
                <span class="color-gray">起</span>
              </div>
              <router-link :to="'productDetail?reserve=1&id=' + item.id">
                <el-button type='primary'>立即投保</el-button>
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
  </div>
</template>
<script>
import{
  queryInsuranceProductListNew
} from 'src/api/insurance.js';
export default {
  data () {
    return {
      id:'',
      cfg_type: [],
      searchData: {
        productname: '',
        icompanyname: ''
      },
      resData: {
        productname: '',
        icompanyname: ''
      },
      total: 0,
      listData: [],
      detail: '',
      selItemId: '',
      errImg: 'this.src="' + require('src/assets/errimg.png') + '"'
    }
  },
  filters: {
    noHtml: (html) => {
      let data = html || ''
      if (data) {
        data = data.replace(/<[^>]+>/g,"")
        data = data.replace('&nbsp;','')
      }
      return data
    }
  },
  methods: {
    saleLists (type) {
      if (type) {
        this.resData = {...this.searchData}
      } else {
        this.searchData = {...this.resData}
      }
      let params = {
        data: this.resData
      }
      queryInsuranceProductListNew({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code == '0') {
            this.listData = result.data;
            console.log(this.listData);
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
              message: result.message
            })
          }
        },
        showLoading: true
      })
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
