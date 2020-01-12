<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">关键字</div>
          <el-input v-model="content" placeholder="话术管理"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="getSpeechList">搜索</el-button>
        </div>
      </div>
    </div>

   <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
            <el-table :data="wordDataList" class="el-table--middle" border style="width: 100%">
              <el-table-column prop="speech_info" 
                              label="话术内容" 
                              header-align="center" 
                              align="left" >
              </el-table-column>
              <el-table-column prop="username" 
                              label="姓名" 
                              header-align="center" 
                              align="center" 
                              width="200" :resizable="false">
              </el-table-column>
              <el-table-column prop="order_id" 
                              label="操作" 
                              header-align="center" 
                              align="center" 
                              width="180" :resizable="false">
                <template slot-scope="scope">
                  <el-button type="text" @click="setSpeechHandleFn(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
    </div>


    <!--工具条-->
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
import { getAllSpeechCraft, speechCraft } from 'src/api/wechat';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      content:'',
      wordDataList:null,
      pagination:{
        total_count: 0,
        total_page: 1,
        page_index: 1,
        page_size: 10,
      }
    }
  },
  methods: {
    getSpeechList() {
      let params = {};
      params.loginName = USERNAME;
      params.content = this.content;
      params.pageNum = this.pagination.page_index;
      params.pageSize = 10;

      getAllSpeechCraft({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.$set(this,'wordDataList',data.list);
            this.$set(this.pagination,'page_index', data.pageNum);
            this.$set(this.pagination,'total_count', data.total);
            this.$set(this.pagination,'total_page', data.pages);
          }else{
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        },
        showLoading: true
      });
    },
    currentPageChange(page){
      this.pagination.page_index = page;
      this.getSpeechList();
    },
    setSpeechHandleFn(row) {
      let that = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {};
          params.id = row.id;

          speechCraft({
            method: 'delete',
            params: params,
            success: (params) => {
              let { ret, msg, data } = params.data;
              if(ret == '0'){
                that.getSpeechList();
              }else{
                that.$message({
                  message: msg,
                  type: 'error'
                })
              }
            },
            showLoading: true
          });
        }).catch(() => { });


      
    }
  },
  mounted() {
    this.getSpeechList();
  },
});
</script>

<style scoped lang="scss">
.system-content{
  background: #fff;
  
  
}

</style>
