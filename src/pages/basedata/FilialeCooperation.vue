
<template>
  <div class="wrapper supplier-wrap">
    <div class="system-tab">
      <ul class="tab-box">
        <li :class="Tabitem == 1 ? 'on' : ''" @click="handleTabitem(1)">合作分公司</li>
        <li :class="Tabitem == 2 ? 'on' : ''" @click="handleTabitem(2)">合作确认</li>
      </ul>
    </div>
    <div class="buttonBox" v-if="Tabitem == 1">
      <el-button type="primary">
        <router-link style="color: #fff;" :to="{path: '/basedata/filialeCooperationInitiate', query:{'company_name': ''}}">发起合作</router-link>
      </el-button>
    </div>
    <div class="system-search">
      <div class="clearfix">
        <div class="search-item">
          <div class="label">所在城市</div>
          <el-select @input="changeArea(true)" value-key="id" v-model="province" placeholder="请选择" clearable key="a">
            <el-option
              v-for="item in province_list"
              :key="item.id"
              :label="item.area_name"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="city" value-key="id" placeholder="请选择" clearable key="b">
            <el-option
              v-for="item in city_list"
              :key="item.id"
              :label="item.area_name"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <div class="label">关键词</div>
          <el-input v-model="searchData.company_name" placeholder="输入合作公司名称"></el-input>
        </div>
        <!-- <div class="search-item" v-if="Tabitem == 2">
          <div class="label">统一社会信用代码</div>
          <el-input v-model="num" placeholder="统一社会信用代码"></el-input>
        </div> -->
        <div class="search-item" v-if="Tabitem == 1">
          <div class="label">合作状态</div>
          <el-select v-model="searchData.status" placeholder="全部">
            <el-option label="全部" value="-1"/>
            <el-option :label="val.name" :value="val.id" :key="key" v-for="(val, key) in clientTypeListMap"/>
          </el-select>
        </div>
        <div class="search-item search-button">
          <el-button @click="handleSearch(true)" type="primary">立即搜索</el-button>
        </div>
      </div>
    </div>
    <div class="system-content">
      <div class="content-list">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="分公司名称"
            align='center'
            min-width='200'>
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.org_name">
                {{scope.row.org_name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="所在城市"
            width='150'>
            <template slot-scope="scope">
              <div class="ellipsis" :title="`${scope.row.province}${scope.row.city}`">
                {{scope.row.province}}{{scope.row.city}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop="end_time"
            label="合作有效期截至"
            width='150'>
          </el-table-column>
          <el-table-column
            align='center'
            label="状态"
            width='90'>
            <template slot-scope='scope'>
              <div v-if="scope.row.cooperation_status == 0" class="col-gray">待确认</div>
              <div v-else-if="scope.row.cooperation_status == 1" class="col-green">合作中</div>
              <div v-else-if="scope.row.cooperation_status == 2" class="col-red">已拒绝</div>
              <div v-else-if="scope.row.cooperation_status == 3" class="col-red">合作到期</div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="操作"
            width="250">
            <template slot-scope="scope">
              <div v-if="(scope.row.cooperation_status == 2 || scope.row.cooperation_status == 3) && Tabitem == 1">
                <router-link :to="{path: '/basedata/filialeCooperationInitiate', query:{'company_name': scope.row.org_name}}">重新签约</router-link>
              </div>
              <div v-else-if="Tabitem == 2 && scope.row.cooperation_status == 0">
                <el-button type="primary" size="mini" @click="handleConfirmEvent(scope.row.org_id,1)">确认</el-button>
                <el-button size="mini" @click="handleConfirmEvent(scope.row.org_id,2)">拒绝</el-button>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination layout="prev, pager, next" 
          v-if="pageShow"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :total="pagination.totalCount"
          :page-size="pagination.size"/>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAllAreaList
} from 'src/api/supplier'
import {
  getFilialeCooperationList,
  confirmFilialeCooperation,
  searchConfirmList
} from 'src/api/api_supplier'
export default {
  data () {
    return {
      Tabitem: 1,
      num: "",
      clientTypeListMap: [
        {
          id:0,
          name: "待确认"
        },
        {
          id:1,
          name: "合作中"
        },
        {
          id:2,
          name: "已拒绝"
        },
        {
          id:3,
          name: "合作到期"
        }
      ],
      searchDataOrigin: {
        company_name: '',
        province: '',
        city: '',
        page: 1,
        status: '-1'
      },
      searchData: {
        company_name: '',
        province: '',
        city: '',
        page: 1,
        status: '-1'
      },
      province_list: [],
      city_list: [],
      province: '',
      city: '',
      tableData: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
        totalPage: 0,
        size: 10
      },
      pageShow: false,
    }
  },
  methods: {
    handleTabitem(index){
      this.Tabitem = index;
      this.province = "";
      this.city = "";
      this.searchData = {
        company_name: '',
        province: '',
        city: '',
        page: 1,
        status: index == 1 ? '-1' : 0
      }
      this.handleSearch(true)
    },
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchData.province = this.province.area_name;
        this.searchData.city = this.city.area_name;
        if(this.Tabitem == 2){
          this.searchData.num = this.num;
        }
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }

      if(this.Tabitem == 2){
        searchConfirmList({
          params,
          success: (res) => {
            let {code, data, msg} = res.data
            if (code === 0) {
              // this.allData = data;
              this.tableData = data.list;
              this.pagination.currentPage = data.page_index;
              this.pagination.totalCount = data.total_count * 1;
              this.pagination.totalPage = data.total_page;
              this.pageShow = data.total_page > 1 ? true : false;
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        })
      }else{
        getFilialeCooperationList({
          params,
          success: (res) => {
            let {code, data, msg} = res.data
            if (code === 0) {
              // this.allData = data;
              this.tableData = data.list;
              this.pagination.currentPage = data.page_index;
              this.pagination.totalCount = data.total_count * 1;
              this.pagination.totalPage = data.total_page;
              this.pageShow = data.total_page > 1 ? true : false;
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
      });
      }
    },
    handleCurrentChange (val) {
      this.searchDataOrigin.page = val;
      this.handleSearch();
    },
    getAllAreaList () {
      getAllAreaList({
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.province_list = result.data
          }
        }
      })
    },
    changeArea (type) {
      this.city_list = this.province.child
      if (type) {
        this.city = ''
      }
    },
    handleConfirmEvent(org_id,status){
      var data = {
        org_id: org_id,
        status: status
      }
      let params = {
        data: data
      }
      confirmFilialeCooperation({
        params,
        success: (res) => {
          let {code, data, msg} = res.data
          if (code === 0) {
            this.handleSearch();
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      })
    }
  },
  mounted() {
    this.handleSearch();
    this.getAllAreaList();
  },
}
</script>
<style lang="less" scoped>
.buttonBox {
  background: #fff;
  text-align: right;
  padding-right: 50px;
  padding-top: 10px;
}
.mr-btn {
  margin-left: 10px;
}
.col-gray{
  color: #666;
}
.col-red{
  color: red;
}
.col-green{
  color: green;
}
.oper-span{
  margin: 0 5px;
}
</style>
