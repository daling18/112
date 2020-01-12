// 自营
<template>
  <el-container direction="vertical" class="list">
    <el-main>
      <el-row class="section">
        <el-form inline class="search-bar" size="small">
          <el-form-item>
            <el-input placeholder="线路名称/产品编号" v-model="search.line_no"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="供应商/线路负责人/产品新增人" v-model="search.user_name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="目的地" v-model="search.destination"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-checkbox v-model="search.is_full_trip">全品类搜索</el-checkbox>
          </el-form-item> -->
        </el-form>
        <filter-bar v-model="filter" :data="filterData" @change="handleSearch" />
      </el-row>
      <el-row class="section">
        <product-list :data="productData" :buttons="buttons" @refresh="handleSearch" :status-map-text="statusMapText"></product-list>
      </el-row>
    </el-main>
    <el-footer>
      <Affix :offset-bottom="0">
        <pagination ref="pagination" @change="pageChange" :apiFun="getOther" :params="postData" class="pagination"></pagination>
      </Affix>
    </el-footer>
  </el-container>
</template>
<script>
import { getSearch, getOther } from "src/api/touristroute";

import FilterBar from "src/components/template/touristroute/filterBar";
import ProductList from "src/components/template/touristroute/productList";
import Pagination from "src/components/template/common/pagination";
import Affix from 'src/components/template/common/affix';

let filterStatusMap = {
  audit_status: "产品状态",
  trip_type: "产品类型",
  city: "出发城市",
  line_type: "线路分类"
  // full_trip: "线路行程"
};
export default {
  components: {
    FilterBar,
    ProductList,
    Pagination,
    Affix
  },
  data() {
    return {
      buttons: ["detail", "channel"],
      getOther,
      searchData: null,
      filter: {},
      search: {
        line_no: "",
        user_name: "",
        destination: "",
        is_full_trip: false
      },
      pagination: {
        page_index: 1,
        page_size: 10,
        total_count: 0,
        page_count: 0
      },
      productData: []
    };
  },
  computed: {
    filterData() {
      if (!this.searchData) {
        return [];
      }
      return Object.entries(this.searchData)
        .map(([id, ele]) => {
          if (!filterStatusMap[id]) {
            return "";
          }
          return {
            id,
            label: filterStatusMap[id],
            data: ele.map(item => ({ id: item.id, label: item.name }))
          };
        })
        .filter(item => !!item);
    },
    statusMapText(){
      if(!this.searchData){
        return {};
      }
      let statusText = {};
      this.searchData.audit_status.forEach(status => {
        statusText[status.id] = status.name; 
      })
      return statusText;
    },
    postData() {
      if (
        this.filterData.length === 0 ||
        Object.keys(this.filter).length === 0
      ) {
        return {};
      }
      this.$log.debug(this.filterData);

      let line_type = this.searchData["line_type"].filter(type => this.filter.line_type.includes(type.id));
      this.$log.info(this.filter);
      return {
        ...this.search,
        ...this.filter,
        departure: this.filter.city,
        line_type,
        page_index: 1,
        page_size: 10
      };
    }
  },
  created() {
    this.getFilter();
  },
  methods: {
    getFilter() {
      getSearch({
        type: 4
      })
        .then(res => {
          this.$log.debug(res);
          let { code, data } = res;
          this.searchData = data;

          Object.keys(filterStatusMap).forEach(key => {
            this.$set(this.filter, key, []);
          });
        })
        .catch(this.$log.error);
    },
    pageChange(data) {
      this.productData = data;
    },
    handleSearch() {
      this.$refs.pagination.refresh(1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
.search-bar {
  padding: 10px 20px;
  margin-top: -1px;
  .el-form-item {
    margin-bottom: 0;
  }
}
.el-container,
.el-main, .el-footer {
  padding: 0;
}
.el-footer{
  height: 52px;
}
.pagination {
  // height: 52px !important;
  padding: 13px;
  background: $gray;
}
// .fixed {
//   position: fixed;
//   padding: 13px;
//   left: $sideBarWidth;
//   bottom: 0;
//   right: 0;
//   background: $bodyBg;
// }
// .list {
//   padding-bottom: 52px;
// }
</style>