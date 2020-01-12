<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <router-link to="/self-support/hotel-brand/list" tag="li" 
            v-if="$menuPermission('api/selfsupport.hotel/brandList')">
            酒店品牌
          </router-link>
          <router-link to="/self-support/product-tag/list" tag="li"
            class="on"
            v-if="$menuPermission('api/selfsupport.tag/index')">
            产品标签
          </router-link>
          <router-link to="/self-support/good/list" tag="li" 
            v-if="$menuPermission('api/selfsupport.goodscate/lists')">
            商品分类
          </router-link>
        </template>
      </ul>
      <div class="btn">
        <el-button type="primary" @click="initTagForm">+ 新增标签</el-button>
      </div>
    </div>

    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">标签类型</div>
        <el-select v-model="filter.type" placeholder="请选择">
          <el-option :value="0" label="全部"/>
          <el-option :value="1" label="酒店标签"/>
          <el-option :value="2" label="景区标签"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">标签名称</div>
        <el-input v-model="filter.tag_name" placeholder="标签名称" />
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
            prop="type"
            label="标签类型"
            align="center"
            width="300"
            :resizable="false">
            <template slot-scope="scope">
              {{scope.row.type == 1?'酒店标签':'景区标签'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="tag_name"
            label="标签名称"
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
                @click="selectRowTodlg(scope.row)">编辑</el-button>
              <el-button type="text" @click="tagDeleteHandler(scope.row.id)">删除</el-button>
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
    :visible.sync="tagVis"
    size="tiny">
    
      <el-form :model="form" label-width="100px" ref="tagForm"
        style="width:300px;"
        class="mod-form">
        <el-form-item label="标签名称">
          <el-input v-model="form.tag_name" placeholder="标签名称"></el-input>
        </el-form-item>
        <el-form-item label="标签类型" prop="type"
          :rules="[
            { required: true, message: '请选择标签类型', trigger: 'blur' }
          ]"
          >
          <el-select v-model="form.type" placeholder="请选择" :disabled="!!form.id">
            <el-option value="1" label="酒店标签"/>
            <el-option value="2" label="景区标签"/>
          </el-select>
        </el-form-item>
      </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="tagVis = false">取 消</el-button>
      <el-button type="primary" @click="tagEditHandler('tagForm')">确 定</el-button>
    </span>
  </el-dialog>



  </div>
</template>

<script>
import { getProductTagList, setProductTagEdit, setProductTagDelete } from 'src/api/self_support.goodscate'

export default {
  data () {
    return {
      filter:{
        type:'',
        tag_name: ''
      },
      form:{
        id:'',
        type:'',
        tag_name: ''
      },
      tagVis:false,
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
        this.filter = {
          type:'',
          tag_name: ''
        };
      }else{
        filter = window.decodeURIComponent(window.atob(filter));
        let jsonFilter = JSON.parse(filter);
        this.$set(this, 'filter', jsonFilter);
        this.$set(this.pagination, 'page_index', jsonFilter.page_index);
      }
      this.getTagInfoList();
    },
    getTagInfoList() {
      let para = {};
      para.data = JSON.parse(JSON.stringify(this.filter));
      para.data.page_index = this.pagination.page_index;
      para.data.page_size = this.pagination.page_size;

      getProductTagList({
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
      let filter = this.filter;

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
    // 删除标签
    tagDeleteHandler(id) {

      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let para = {};
            para.data = {};
            para.data.id = id;

        setProductTagDelete({
          params: para,
          success: (params) => {
            let {code, msg, data } = params.data;
            this.getTagInfoList();
            this.$message({
              type: !code ? 'success' :'error',
              message: msg
            })
          },
          showLoading: false
        });
      }).catch(() => {});
    },
    // 新增初始化表单
    initTagForm(){
      this.tagVis = true;
      this.form = {
        id: '',
        type: '',
        tag_name: ''
      };
    },
    // 选择行数据
    selectRowTodlg(row){
      this.tagVis = true;
      this.form = {
        id: row.id,
        type: row.type + '',
        tag_name: row.tag_name
      }
    },
    // 编辑操作
    tagEditHandler(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          let para = {};
              para.data = JSON.parse(JSON.stringify(this.form));

          setProductTagEdit({
            params: para,
            success: (params) => {
              let {code, msg, data } = params.data;
              this.getTagInfoList();
              this.tagVis = false;
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
    }
  },
  mounted(){
    this.getTagInfoList();
  }
}
</script>

<style lang="scss" scoped>
</style>
