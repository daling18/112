<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <router-link to="/self-support/hotel-brand/list" tag="li">
            酒店品牌
          </router-link>
          <router-link to="/self-support/product-tag/list" tag="li">
            产品标签
          </router-link>
          <router-link to="/self-support/good/list" tag="li" class="on">
            商品分类
          </router-link>
        </template>
      </ul>
      <div class="btn">
        <el-button type="primary" 
          @click="$router.push({path:'/self-support/hotel-brand/edit'})">+ 新增分类</el-button>
      </div>
    </div>

    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">商品分类</div>
        <el-input v-model="name" placeholder="请输入商品类型名称" />
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
            prop="code"
            label="编号"
            align="center"
            width="300"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品分类名称"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="flag_name"
            label="状态"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
            :resizable="false">
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="goodsDeleteHandler(scope.row.id)">删除</el-button>
              <el-button type="text">{{scope.row.flag == 1?'禁用':'启用'}}</el-button>
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




  <!-- dialog -->
  <el-dialog
    title="新增标签"
    :visible.sync="dialogVis"
    size="tiny">
    
      <el-form :model="form" label-width="100px" ref="goodsForm"
        style="width:300px;"
        class="mod-form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类图标">
          <el-input v-model="form.photo_id" placeholder="标签名称"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input type="textarea" v-model="form.remark" placeholder="分类描述"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="排序"></el-input>
        </el-form-item>
      </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVis = false">取 消</el-button>
      <el-button type="primary" @click="tagEditHandler('goodsForm')">确 定</el-button>
    </span>
  </el-dialog>



  </div>
</template>

<script>
import { getGoodscateList, setGoodscateEdit, 
         setGoodscateDelete, setGoodscateChangeStatus,
         setGoodscateUploadLogo } from 'src/api/self_support.goodscate'

export default {
  data () {
    return {
      dialogVis:false,
      name:'',
      form:{
        id:'',
        name:'',
        photo_id:'',
        remark:'',
        sort:''
      },
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
        this.name = '';
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        let jsonFilter = JSON.parse(filter);
        this.$set(this, 'name', jsonFilter.name);
        this.$set(this.pagination, 'page_index', jsonFilter.page_index);
      }
      this.goodsCateList();
    },
    goodsCateList() {
      let para = {};
      para.data = {};
      para.data.name = this.name;
      para.data.page_index = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;

      getGoodscateList({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (code == '0') {
            this.$set(this,'tableData',data.lists);
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

      filter.name = this.name;
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
    goodsDeleteHandler(id) {

      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let para = {};
            para.data = {};
            para.data.id = id;

        setGoodscateDelete({
          params: para,
          success: (params) => {
            let {code, msg, data } = params.data;
            this.goodsCateList();
            this.$message({
              type: !code ? 'success' :'error',
              message: msg
            })
          },
          showLoading: true
        });
      }).catch(() => {});
    },
    // 新增初始化表单
    initTagForm(){
      this.dialogVis = true;
      this.form = {
        id: '',
        name:'',
        photo_id:'',
        remark:'',
        sort:''
      };
    },
    // 选择行数据
    selectRowTodlg(row){
      this.dialogVis = true;
      this.form = {
        id: row.id,
        name: row.name,
        photo_id: row.photo_id,
        remark: row.remark,
        sort: row.sort
      }
    },
    // 编辑操作
    goodsEditHandler(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          let para = {};
              para.data = JSON.parse(JSON.stringify(this.form));

          setGoodscateEdit({
            params: para,
            success: (params) => {
              let {code, msg, data } = params.data;
              this.goodsCateList();
              this.dialogVis = false;
              this.$message({
                type: !code ? 'success' :'error',
                message: msg
              })
            },
            showLoading: false
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改启禁用状态
    goodsCateList() {
      let para = {};
      para.data = {};
      para.data.name = this.name;
      para.data.page_index = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;

      getGoodscateList({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (code == '0') {
            this.$set(this,'tableData',data.lists);
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

  },
  mounted(){
    this.goodsCateList();
  }
}
</script>

<style lang="scss" scoped>
</style>
