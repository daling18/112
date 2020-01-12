<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link v-if="$menuPermission('api/selfsupport.hotel/brandList')" to="/self-support/hotel-brand/list" tag="li">
          酒店品牌
        </router-link>
        <router-link v-if="$menuPermission('api/selfsupport.tag/index')" to="/self-support/product-tag/list" tag="li">
          产品标签
        </router-link>
        <li class="on">商品分类</li>
      </ul>
      <el-button
        v-if="$menuPermission('api/selfsupport.goodscate/submit_create')"
        @click="handleOpenDialog()"
        class="right-button"
        type='primary'>
        + 新增分类
      </el-button>
    </div>
    <div class="system-search clearfix">
      <div class="search-item">
        <div class="label">商品分类</div>
        <el-input v-model="name" placeholder='请输入商品类型名称搜索'></el-input>
      </div>
      <div class="search-item search-button">
        <el-button @click="lists" type="primary">搜索</el-button>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <el-table :data='list' style="width: 100%" border>
          <el-table-column prop="code" label="编号" align="center"></el-table-column>
          <el-table-column prop="name" label="商品分类名称" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.name" placement="bottom">
                <span class="ellipsis tc">
                  <img v-if="scope.row.logo_url" class="img-logo" :src="scope.row.logo_url" alt="">
                  {{scope.row.name}}
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center"></el-table-column>
          <el-table-column prop="flag" label="状态" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.flag === 1" class="color-green">启用</div>
              <div v-else-if="scope.row.flag === 2" class="color-red">禁用</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="$menuPermission('api/selfsupport.goodscate/submit_create')">
                    <div @click="handleOpenDialog(scope.row)">编辑</div>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="$menuPermission('api/selfsupport.goodscate/del')">
                    <div @click="del(scope)">删除</div>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.flag === 2 && $menuPermission('api/selfsupport.goodscate/change_status')">
                    <div @click="changeStatus(scope.row)">启用</div>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.flag === 1 && $menuPermission('api/selfsupport.goodscate/change_status')">
                    <div @click="changeStatus(scope.row)">禁用</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="page" v-show="list.length > 0">
          <el-pagination  layout="prev, pager, next" :current-page='page' :total="total" @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :title="`${dialogTit}商品分类`"
      :visible.sync="dialogType">
      <el-form
        label-width='100px'>
        <el-form-item
          required
          label='分类名称'>
          <el-input v-model="creareData.name"></el-input>
        </el-form-item>
        <el-form-item
          label='分类图标'>
          <el-upload
            class="uploadbtn"
            action="/bom/api/selfsupport.goodscate/upload_logo"
            :show-file-list='false'
            :on-success='handleSuccess'>
            <el-button type='default'>上传图片</el-button>
          </el-upload>
          <div>图标尺寸为18*18比例，大小不能超过200KB，图片只能为jpg、png、gif格式</div>
        </el-form-item>
        <el-form-item
          label='分类描述'>
          <el-input type='textarea' v-model="creareData.remark"></el-input>
        </el-form-item>
        <el-form-item
          label='排序'>
          <input-number  v-model="creareData.sort" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogType = false">取 消</el-button>
        <el-button @click="submitCreate" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import InputNumber from 'src/plugins/InputNumber.vue';
import {Goodscatelists,
        Goodscatecreate,
        GoodscatesubmitCreate,
        GoodscatechangeStatus,
        Goodscatedel} from 'src/api/self_support.goodscate'
export default {
  components: {
    InputNumber
  },
  data () {
    return {
      name: '',
      page: 1,
      total: 0,
      list: [],
      creareData: {
        id: 0,
        name: '',
        photo_id: '',
        remark: '',
        sort: ''
      },
      dialogType: false,
      dialogTit: '新增'
    }
  },
  methods: {
    lists () {
      let params = {
        data: {
          name: this.name,
          page: this.page
        }
      }
      Goodscatelists({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.list = result.data.lists
            this.page = result.data.page_index
            this.total = result.data.total_count
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
    changeStatus (item) {
      let params = {
        data: {
          id: item.id,
          flag: item.flag === 1 ? 2 : 1
        }
      }
      GoodscatechangeStatus({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.lists()
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
    submitCreate () {
      let params = {
        data: this.creareData
      }
      GoodscatesubmitCreate({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.lists()
            this.dialogType = false
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
    del (scope) {
      this.$confirm('确认删除？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            id: scope.row.id
          }
        }
        Goodscatedel({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.lists()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      }).catch(() => {})
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 0) {
        this.$message({
          type: 'success',
          message: response.msg
        })
        this.creareData.photo_id = response.data.phote_id
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    },
    handleOpenDialog (item) {
      this.dialogType = true
      this.dialogTit = '新增'
      if (item) {
        this.creareData.id = item.id
        this.creareData.name = item.name
        this.creareData.photo_id = item.photo_id
        this.creareData.remark = item.remark
        this.creareData.sort = item.sort
        this.dialogTit = '编辑'
      } else {
        this.creareData.id = 0
        this.creareData.name = ''
        this.creareData.photo_id = ''
        this.creareData.remark = ''
        this.creareData.sort = ''
      }
    },
    currentPageChange (poge) {
      this.page = page
      this.lists()
    }
  },
  mounted() {
    this.lists()
  },
}
</script>
<style lang="less" scoped>
  .tc {
    text-align: center;
  }
  .right-button {
    float: right;
    margin: 10px;
  }
  .img-logo {
    width: 18px;
    height: 18px;
    vertical-align: bottom;
  }
  
</style>
