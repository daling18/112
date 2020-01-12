<!--src/components/finace/report/branch.vue-->
<template>
  <div class="hotelorder-wrap">
    <div class="system-search">
      <div class="search-line-item">
        <div class="search-item">
          <div class="label">客户名称</div>
          <el-input v-model="filter.nick_name" placeholder="请输入客户名称"></el-input>
        </div>
        <div class="search-item">
          <div class="label">手机号</div>
          <el-input v-model="filter.mobile" placeholder="请输入手机号"></el-input>
        </div>
        <div class="search-item">
          <div class="label">所属销售</div>
          <el-input v-model="filter.sale_name" placeholder="请输入销售名称"></el-input>          
        </div>
        <div class="search-item">
          <div class="label">加入时间</div>
          <el-date-picker
            v-model="joinTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleJoinTimeChange">
           </el-date-picker>         
        </div>
        <el-button type="primary" @click="handleSerarchOrder">搜索</el-button>
      </div>
    </div>

    <div class="hotel-content">
      <div class="hotel-table-wrap">
        <el-table :data="dataList" border tooltip-effect="light" style="width: 100%">
          <el-table-column header-align="center" align="center" label="客户名称" width="180">
            <template slot-scope="prop">
              {{ prop.row.nick_name }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="性别" >
            <template slot-scope="prop">
              {{ prop.row.gender | peopleGender}}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="手机号" width="180">
            <template slot-scope="prop">
              {{ prop.row.mobile }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="所属销售">
            <template slot-scope="prop">
              {{ prop.row.top_introduce_name }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="加入时间">
            <template slot-scope="prop">
              {{ prop.row.create_time }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="dataList && dataList.length" class="page">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page_size"
          :current-page="page_index"
          :total="total_count"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

import { getClientList} from "src/api/shop";

import * as format from 'src/utils/format';

export default {
  data() {
    var that = this;
    return {
      PRODUCT_TYPE: ['所有','保险','农特优','签证','酒店','火车票','门票','机票','线路'],
      dataList: [],
      joinTime: "",
      filter: {
        nick_name: "",
        mobile: "",
        sale_name: "",
        join_begin_time: "",
        join_end_time: "",
        page_size: 10,
        page: 1
      },
      total_count: 1,
      page_size: 10,
      page_index: 1
    };
  },
  filters: {
    peopleGender(code) {
      let type = code * 1;
      let str = "";
      switch (type) {
        case 0:
          str = "男";
          break;
        case 1:
          str = "女";
          break;
      }
      return str;
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleJoinTimeChange(time){
      console.log(time);
      this.filter.join_begin_time = format.date(time[0]);
      this.filter.join_end_time = format.date(time[1]);
    },
    handleSerarchOrder(){
      this.filter.page = 1;
      this._initOrderFilterHandler();
    },
    async _initOrderFilterHandler() {
      var params = {
        data : {...this.filter}
      }
      try {
        const { data } = await getClientList(params, true)
        if(data.code == 0){
          this.dataList = data.data.list;
          this.total_count = data.data.total_count * 1;
        }else{
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
        console.log(data);
      }
      catch(err) {
        console.log(err)
      }

    },
    pageChange(page) {
      this.filter.page = page;
      this.initOrderFilterHandler();
    }
  },
  created() {
    let {
      sale_name = ''
    } = this.$route.query;
    this.filter.sale_name = sale_name;
  },
  mounted() {
    
    this._initOrderFilterHandler();
  }
};
</script>
<style lang="less" scoped>
.date-picker {
  width: 200px !important;
}
</style>