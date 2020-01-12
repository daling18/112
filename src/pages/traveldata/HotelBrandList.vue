<template>
<!-- application\index\view\dev\src\components\self-support\LocalProductList.vue -->
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">酒店品牌</li>
      </ul>
      <div class="btn">
        <el-button type="primary" 
          v-if="$menuPermission('traveldata/hotel/brandadd')"
          @click="$router.push({path:'/traveldata/hotel-brand/edit'})">+ 新增品牌</el-button>
      </div>
    </div>

    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">品牌名称</div>
        <el-input v-model="brand_name" placeholder="品牌名称" />
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="queryFilterHandler(1)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="brand_name"
            label="品牌名称"
            align="center"
            width="300"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="one_word_intr"
            label="一句话介绍"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
            :resizable="false">
            <template slot-scope="scope">
              <el-button type="text"
                v-if="$menuPermission('traveldata/hotel/branddetail')"
                @click="$router.push({path:'/traveldata/hotel-brand/detail', 
                                     query:{id:scope.row.id}})">详情</el-button>
              <el-button type="text" 
                v-if="$menuPermission('traveldata/hotel/brandadd')"
                @click="$router.push({path:'/traveldata/hotel-brand/edit', 
                                     query:{id:scope.row.id}})">编辑</el-button>
              <el-button type="text" 
                v-if="$menuPermission('traveldata/hotel/branddelete')" 
                @click="brandDeleteHandler(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page" v-if="pagination.total_count">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :total="pagination.total_count"
        :current-page="pagination.page_index"/>
    </div>
  </div>
</template>

<script>
import { getbrandList, setbrandDelete } from 'src/api/self_support.goodscate'

export default {
  data () {
    return {
      brand_name:'',
      tableData: [],
      pagination:{
        total_count: 1,
        total_page: 1,
        page_index: 1,
        page_size: 10,
      }
    }
  },
 watch: {
    $route () {
      this.initFilterHandler();
    }
  },
  methods: {
    // 初始化筛选项
    initFilterHandler(){
      let query = Object.assign({},this.$route.query),
          filter = query.filter;
      if(!filter){
        this.brand_name = '';
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        let jsonFilter = JSON.parse(filter);
        this.$set(this, 'brand_name', jsonFilter.brand_name);
        this.$set(this.pagination, 'page_index', jsonFilter.page_index);
      }
      this.brandList();
    },
    brandList() {
      let para = {};
      para.data = {};
      para.data.brand_id = '';
      para.data.brand_name = this.brand_name;
      para.data.page_index = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;

      getbrandList({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (code == '0') {
            this.$set(this,'tableData',data.list);
            this.$set(this.pagination,'page_index', data.page_index);
            this.$set(this.pagination,'total_count', data.total_count);
            this.$set(this.pagination,'total_page', data.total_page);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 搜索筛选函数
    queryFilterHandler(page){
      let filter = {};

      filter.brand_name = this.brand_name;
      filter.page_index = page;
      filter.time = +new Date();
      filter = window.btoa(window.encodeURIComponent(JSON.stringify(filter)));

      this.$router.push({
        path: this.$route.path,
        query: {
          filter: filter
        }
      });
    },
    currentPageChange(page){
      this.queryFilterHandler(page);
    },
    // 删除品牌项
    brandDeleteHandler(id) {

      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let para = {};
            para.data = {};
            para.data.id = id;

        setbrandDelete({
          params: para,
          success: (params) => {
            let {code, msg, data } = params.data;
            this.brandList();
            this.$message({
              type: !code ? 'success' :'error',
              message: msg
            })
          },
          showLoading: true
        });
      }).catch(() => {});

      
    },
  },
  mounted(){
    this.brandList();
  }
}
</script>

<style lang="scss" scoped>
</style>
