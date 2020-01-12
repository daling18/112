<template>
  <div class="wrapper supplier-wrap">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link tag="li"
          to="/system/supplier"
          v-if="$menuPermission('api_supplier/supplier/supplier_list')">
          供应商管理
        </router-link>
        <router-link tag="li"
          class="on"
          to="">
          合作确认
        </router-link>
      </ul>
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
        <div class="search-item long-item-wrap">
          <div class="label long-item">统一社会信用代码</div>
          <el-input v-model="searchData.duty_paragraph" placeholder="统一社会信用代码"></el-input>
        </div>
        <div class="search-item">
          <div class="label">合作状态</div>
          <el-select v-model="searchData.cooperation_status" placeholder="请选择">
            <el-option label="全部" :value=99 />
            <el-option v-for="(o,i) in allData.cooperation_status_arr" :key="i" :label="o" :value="parseInt(i)" />
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
            label="合作公司名称"
            align='center'
            min-width='200'>
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.company_name">
                {{scope.row.company_name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="所在城市"
            width='140'>
            <template slot-scope="scope">
              <div class="ellipsis" :title="`${scope.row.province}${scope.row.city}`">
                {{scope.row.province}}{{scope.row.city}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            prop="cooperation_validity_period"
            label="合作有效期截至"
            width='120'>
          </el-table-column>
          <!-- 返佣比例注释4LJ -->
          <!-- <el-table-column
            align='center'
            label="返佣比例"
            width='80'>
            <template slot-scope="scope">
              {{scope.row.share_benefit_proportion}}%
            </template>
          </el-table-column> -->
          <el-table-column
            align='center'
            label="状态"
            width='90'>
            <template slot-scope='scope'>
              <div v-if="scope.row.cooperation_status == 0" class="col-gray">待确认</div>
              <div v-else-if="scope.row.cooperation_status == 1" class="col-green">合作中</div>
              <div v-else-if="scope.row.cooperation_status == 2" class="col-red">已退回</div>
              <div v-else-if="scope.row.cooperation_status == 3" class="col-red">合作到期</div>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="操作"
            width="180">
            <template slot-scope="scope">
              <router-link
                v-for="(o,i) in scope.row.edit"
                :key="i"
                :to="{path: '/system/supplier-detail', query:{id:scope.row.id, type:2}}">
                {{allData.edit_arr[o]}}
              </router-link>
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
  cooperativeCustomers
} from 'src/api/api_supplier'
export default {
  data () {
    return {
      searchDataOrigin: {
        type: 2,
        company_name: '',
        province: '',
        city: '',
        duty_paragraph: '',
        cooperation_status: 99,
        page: 1,
      },
      searchData: {
        type: 2,
        company_name: '',
        province: '',
        city: '',
        duty_paragraph: '',
        cooperation_status: 99,
        page: 1,
      },
      province_list: [],
      city_list: [],
      province: '',
      city: '',
      allData: [],
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
    handleSearch(bool){
      this.getAllAreaList();
      if(bool){
        this.searchData.page = 1;
        this.searchData.province = this.province.area_name;
        this.searchData.city = this.city.area_name;
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }
      cooperativeCustomers({
        params,
        success: (res) => {
          let {code, data, msg} = res.data
          if (code === 0) {
            this.allData = data;
            this.tableData = data.data;
            this.pagination.currentPage = data.page_index;
            this.pagination.totalCount = data.total_count;
            this.pagination.totalPage = data.total_page;
            this.pageShow = data.total_page > 1 ? true : false;
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
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
  },
  mounted() {
    this.handleSearch();
  },
}
</script>
<style lang="less" scoped>
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
.supplier-wrap {
  .long-item-wrap {
    padding-left: 110px;
  }
  .long-item {
    width: 130px;
    margin-left: -136px;
  }
  }
</style>
