<template>
<!-- application\index\view\dev\src\components\self-support\LocalProductList.vue -->
  <div class="wrapper">
    <div class="system-search clearfix">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">第三方</div>
          <el-select v-model="searchData.three_from_id" placeholder="请选择">
            <el-option label="全部" value=""/>
            <el-option v-for="(val, key) in THIRD_MAP" :key="key" :label="val" :value="key"/>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">商品名称</div>
          <el-input v-model="searchData.name"></el-input>
        </div>
        <div class="search-item">
          <div class="label">商品货号</div>
          <el-input v-model="searchData.art_no"></el-input>
        </div>
      </div>
      <div class="clearfix">
        <div class="search-item">
          <div class="label">商品分类</div>
          <el-select
            filterable
            v-model="searchData.type">
            <el-option label='全部' value='0'></el-option>
            <el-option
              v-for="(item, key) in cfg_type"
              :label='item.name'
              :value='item.id'
              :key="key"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">商品状态</div>
          <el-select v-model="searchData.flag">
            <el-option label='全部' value='0'></el-option>
            <el-option label='启用' value='1'></el-option>
            <el-option label='禁用' value='2'></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">上架状态</div>
          <el-select v-model="searchData.audit_status">
            <el-option label='全部' value='0' key="0"></el-option>
            <el-option
              v-for="(item, key) in cfg_audit_status"
              :label='item'
              :value='key'
              :key="key"></el-option>
          </el-select>
        </div>
        <div class="search-item search-button">
          <el-button @click="productLists(true)" type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <el-table :data='dataList' border>
          <el-table-column
            header-align='center' 
            align='left'
            label='商品名称'>
            <template slot-scope="scope">
              <div class="text-left ellipsis">
                <el-tag type="success" v-if="scope.row.flag === 1">启用</el-tag>
                <el-tag type="danger" v-if="scope.row.flag === 2">禁用</el-tag>
                <el-tooltip :content="scope.row.name" placement="top-start">
                  <span>
                  {{scope.row.name}}
                  </span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column 
            align='center'
            prop='type_name'
            width='200px'
            label='商品分类'>
          </el-table-column>
          <el-table-column
            align='center' 
            prop='art_no'
            width='140px'
            label='货号'>
          </el-table-column>
          <el-table-column
            align='center'
            width='100px'
            label='上架状态'>
            <template slot-scope="scope">
              <div>{{cfg_audit_status[scope.row.audit_status]}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            width='100px'
            prop=''
            label='操作'>
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="$menuPermission('singlepro/localproduct/lpdet')">
                    <router-link :to="{path: '/singlepro/localProduct/detail', query: {id: scope.row.id}}">详情</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link 
                      v-if="scope.row.audit_status !== 2 && scope.row.audit_status !== 3"
                      :to="{path: '/singlepro/localProduct/add', query: {id: scope.row.id}}">
                      编辑
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div
                      v-if="scope.row.audit_status !== 2 && scope.row.audit_status !== 3 && $menuPermission('singlepro/localproduct/chglpstatus')"
                      @click="productChangeStatus(scope)">
                      {{scope.row.flag === 1 ? '禁用' : '启用'}}
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div
                      v-if="scope.row.audit_status !== 2 && scope.row.audit_status !== 3 && $menuPermission('singlepro/localproduct/puton')"
                      @click="productPutOn(scope)">上架</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div
                      v-if="scope.row.audit_status === 3 && $menuPermission('singlepro/localproduct/puton')"
                      @click="productPutOff(scope)">下架</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div
                      v-if="scope.row.audit_status === 2 && $menuPermission('singlepro/localproduct/puton')"
                      @click="productRecall(scope)">撤回</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination  layout="prev, pager, next" :current-page='resData.page' :total="total" :page-size='pagesize' @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {productLists,
        productChangeStatus,
        productPutOn,
        productPutOff,
        productRecall} from 'src/api/self_support.localproduct'
export default {
  data () {
    return {
      searchData: {
        a: '1',
        supplier_org_name: '',
        type: '0',
        flag: '1',
        audit_status: '0',
        name: '',
        art_no: '',
        page: 1,
        three_from_id: ""
      },
      cfg_audit_status: [],
      cfg_type: [],
      resData: {
        supplier_org_name: '',
        type: '0',
        flag: '0',
        audit_status: '0',
        name: '',
        art_no: '',
        page: 1
      },
      dataList: [],
      total: 0,
      pagesize: 0,
      THIRD_MAP: ""
    }
  },
  methods: {
    productLists (type) {
      if (type) {
        this.searchData.page = 1
        this.resData = {...this.searchData}
      } else {
        this.searchData = {...this.resData}
      }
      let params = {
        data: this.resData
      }
      productLists({
        params,
        success: (res) =>{
          let result = res.data
          if (result.code === 0) {
            if(!result.data){
              return ;
            }
            this.cfg_type = result.data.cfg_type
            this.cfg_audit_status = result.data.cfg_audit_status
            this.dataList = result.data.lists
            this.resData.page = result.data.page_index
            this.total = result.data.total_count
            this.pagesize = result.data.page_size
            this.THIRD_MAP = result.data.cfg_order_three_from
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
    productChangeStatus (scope) {
      let params = {
        data: {
          id: scope.row.id,
          flag: scope.row.flag === 1 ? 2 : 1
        }
      }
      this.$confirm(`确定${scope.row.flag === 1 ? '禁用' : '启用'}该商品？`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productChangeStatus({
          params,
          success: (res) => { 
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productLists()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      }).catch(() => {})
    },
    productPutOn (scope) {
      let params = {
        data: {
          id: scope.row.id
        }
      }
      this.$confirm('确定上架该商品到SCM?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productPutOn({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productLists()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      }).catch(() => {})
    },
    productPutOff (scope) {
      let params = {
        data: {
          id: scope.row.id
        }
      }
      this.$confirm('确定下架该商品?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productPutOff({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productLists()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      }).catch(() => {})
    },
    productRecall (scope) {
      let params = {
        data: {
          id: scope.row.id
        }
      }
      this.$confirm('确定撤回该商品的上架申请?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productRecall({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.productLists()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      }).catch(() => {})
    },
    currentPageChange (page) {
      this.resData.page = page
      this.productLists()
    }
  },
  mounted() {
    this.productLists()
  },
}
</script>
<style lang="less" scoped>

</style>
