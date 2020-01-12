<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">关键字</div>
          <el-input v-model="queryValue" placeholder="输入姓名"></el-input>
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="getFNSettingList">搜索</el-button>
        </div>
      </div>
    </div>

   <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
            <el-table :data="cardList" class="el-table--middle" border style="width: 100%">
              <el-table-column label="头像" 
                               header-align="center" 
                               width="200" :resizable="false">
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
              <el-table-column prop="position" 
                              label="职位" 
                              header-align="center" 
                              align="left" 
                              min-width="200" :resizable="false">
              </el-table-column>
              <el-table-column prop="deptName" 
                              label="部门" 
                              header-align="center" 
                              align="left" 
                              min-width="200" :resizable="false">
              </el-table-column>
              <el-table-column prop="mobile" 
                              label="手机" 
                              header-align="center" 
                              align="center" 
                              min-width="200" :resizable="false">
              </el-table-column>
              <el-table-column prop="is_business_card" 
                              label="盈科助手" 
                              header-align="center" 
                              align="center" 
                              fixed="right"
                              width="100" :resizable="false">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.is_business_card"
                    @change="changeAssistantStatus(scope.row)"
                    :active-value="1"
                    :inactive-value="2"
                    active-color="#b10c79"
                    off-color="#666"
                    active-text="开启"
                    inactive-text="关闭">
                  </el-switch>            
                </template>
              </el-table-column>
              <el-table-column prop="" 
                              label="默认名片" 
                              header-align="center" 
                              align="center" 
                              fixed="right"
                              width="100" :resizable="false">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.default_business_card_id"
                    @change="changeDefaultCardStatus(scope.row)"
                    :active-value="1"
                    :inactive-value="2"
                    active-color="#b10c79"
                    off-color="#666"
                    active-text="开启"
                    inactive-text="关闭">
                  </el-switch>            
                </template>
              </el-table-column>
              <el-table-column prop="" 
                              label="名片二维码" 
                              header-align="center" 
                              align="center" 
                              fixed="right"
                              width="100" :resizable="false">
                <template slot-scope="scope">
                  <el-popover
                    @show="getCardQrcode(scope.row)"
                    placement="right"
                    width="200"
                    trigger="click">
                    <el-button type="text" slot="reference">查看</el-button>
                    <img :src="qrcode_url" alt="" class="qrcode" v-if="qrcode_url">
                    <p class="nodata" v-else>该名片不存在</p>
                  </el-popover>
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
import { getCardInfoList, 
         updateIsAssistant, 
         updateIsShopOwner, 
         getSmallProgramCode,
         setDefaultCard } from 'src/api/wechat';
const USERNAME = localStorage.getItem('username');

export default ({
  data() {
    return {
      queryValue:'',
      cardList:null,
      qrcode_url:'',
      pagination:{
        total_count: 0,
        total_page: 1,
        page_index: 1,
        page_size: 10,
      }
    }
  },
  methods: {
    getFNSettingList() {
      let params = {};
      params.loginName = USERNAME;
      params.queryValue = this.queryValue;
      params.pageNum = this.pagination.page_index;
      params.pageSize = 10;

      getCardInfoList({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            if(data){
              this.$set(this,'cardList',data.list);
              this.$set(this.pagination,'page_index', data.pageNum);
              this.$set(this.pagination,'total_count', data.total);
              this.$set(this.pagination,'total_page', data.pages);
            }else{
              this.$set(this,'cardList',null);
            }
          }else{
            this.$message({
              message:msg,
              type: 'error'
            })
          }
        },
        showLoading: true
      });
    },
    currentPageChange(page){
      this.pagination.page_index = page;
      this.getFNSettingList();
    },
    // 盈科助手
    changeAssistantStatus(row) {
      let params = {};
      params.eid = row.user_id;
      // params.eid = '100071';
      params.isAssistant = row.is_business_card;

      updateIsAssistant({
        formdata:true,
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.getFNSettingList();
          }
          this.$message({
            message: ret=='0' ? '操作成功' :msg,
            type: ret=='0' ? 'success' :'error'
          })
        },
        showLoading: true
      });
    },
    // 店长权限
    changeShopOwnerStatus(row) {
      let params = {};
      params.eid = row.user_id;
      // params.eid = '100071';
      params.isShopowner = row.is_shopowner;

      updateIsShopOwner({
        formdata:true,
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.getFNSettingList();
          }
          this.$message({
            message: ret=='0' ? '操作成功' :msg,
            type: ret=='0' ? 'success' :'error'
          })
        },
        showLoading: true
      });
    },
    // 默认名片
    changeDefaultCardStatus(row) {
      let params = {};
      params.eid = row.user_id;
      // params.eid = '100071';
      params.loginName = USERNAME;
      params.status = row.default_business_card_id;

      setDefaultCard({
        formdata:true,
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.getFNSettingList();
          }
          this.$message({
            message: ret=='0' ? '操作成功' :msg,
            type: ret=='0' ? 'success' :'error'
          })
        },
        showLoading: true
      });
    },
    // 名片二维码
    getCardQrcode(row) {
      let params = {};
      params.userId = row.user_id;
      // params.userId = '100071';
      this.$set(this,'qrcode_url','');

      getSmallProgramCode({
        method:'get',
        params: params,
        success: (params) => {
          let { ret, msg, data } = params.data;
          if(ret == '0'){
            this.$set(this,'qrcode_url',data);
          }
        },
        showLoading: true
      });
    }
  },
  mounted() {
    this.getFNSettingList();
  },
});
</script>

<style scoped lang="scss">
.system-content{
  background: #fff;
  .avatar{
    width: 60px;
    height: 60px;
  }
}
.qrcode{
    width: 150px;
    height: 150px;
    display: block;
    margin: 0 auto;
  }
.nodata{
  font-size: 14px;
  padding: 50px 20px;
  text-align: center;
}
</style>
