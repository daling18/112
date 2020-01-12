<template>
  <div class="wrapper">
    <!-- system-search -->
    <!-- <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">关键字</div>
          <el-input v-model="queryValue" placeholder="输入姓名"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="getNameCardInfoList">搜索</el-button>
        </div>
      </div>
    </div> -->

   <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
            <el-table :data="cardList" class="el-table--middle" border style="width: 100%" v-if="cardList">
              <el-table-column label="头像" 
                               align="center"
                               header-align="center" :resizable="false">
                <template slot-scope="scope">
                  <img :src="scope.row.head_portrait_url" alt="" class="avatar">
                </template>
              </el-table-column>
              <el-table-column prop="username" 
                              label="姓名" 
                              header-align="center" 
                              align="center" 
                              width="200" :resizable="false">
              </el-table-column>
              <el-table-column prop="b_id" 
                              label="职位" 
                              header-align="center" 
                              align="center" 
                              width="200" :resizable="false">
              </el-table-column>
              <el-table-column prop="mobile" 
                              label="手机" 
                              header-align="center" 
                              align="center" 
                              width="200" :resizable="false">
              </el-table-column>
              <el-table-column prop="is_business_card" 
                              label="设置默认名片" 
                              header-align="center" 
                              align="center" 
                              width="200" :resizable="false">
                <template slot-scope="scope">
                  <el-button type="text" @click="todoDefaultCard(scope.row)">关闭</el-button>
                </template>
              </el-table-column>
            </el-table>
            <template v-else>
              <div class="warm-tip">
                <p>没有符合条件的数据 :)</p>
              </div>
            </template>
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
import { getDefaultCard,setDefaultCard } from 'src/api/wechat';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      queryValue:'',
      cardList:null,
      pagination:{
        total_count: 0,
        total_page: 1,
        page_index: 1,
        page_size: 10,
      }
    }
  },
  methods: {
    getNameCardInfoList() {
      let params = {};
      params.loginName = USERNAME;
      params.queryValue = this.queryValue;
      params.pageNum = 1;
      params.pageSize = 10;

      getDefaultCard({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          let dataArr = new Array(data);
          if(ret == '0'){
            if(data){
              this.$set(this,'cardList',dataArr);
              this.$set(this.pagination,'page_index', data.pageNum);
              this.$set(this.pagination,'total_count', data.total);
              this.$set(this.pagination,'total_page', data.pages);
            }else{
              this.$set(this,'cardList',null);
            }
          }else{
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        },
        showLoading: false
      });
    },
    currentPageChange(page){
      this.pagination.page_index = page;
      this.getNameCardInfoList();
    },
    todoDefaultCard(row) {
      let params = {};
      params.eid = row.user_id;
      // params.eid = '100071';
      params.loginName = USERNAME;
      params.status = 2;

      setDefaultCard({
        formdata:true,
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.getNameCardInfoList();
          }
          this.$message({
            message: ret=='0' ? '操作成功' :msg,
            type: ret=='0' ? 'success' :'error'
          })
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getNameCardInfoList();
  },
});
</script>

<style scoped lang="scss">
.system-content{
  // min-height: 500px;
  background: #fff;
  .avatar{
    width: 60px;
    height: 60px;
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
</style>
