<template>
  <el-dialog
    :visible.sync="visible"
    custom-class="pick-trip-layer"
    title="选择行程"
    center
    @open="handleRefresh"
  >
    <div class="search-bar">
      <el-input
        placeholder="产品名称/产品编号"
        class="search-keywrod"
        size="small"
        v-model="params.keyword"
      ></el-input>
      <el-button class="search" size="small" type="primary">搜索</el-button>
    </div>
    <el-radio-group v-model="selected" class="trip-list">
      <el-table :data="tripData" :show-header="false">
        <el-table-column>
          <template slot-scope="scoped">
            <el-radio :label="scoped.row.id">{{scoped.row.line_title}}</el-radio>
          </template>
        </el-table-column>
      </el-table>
    </el-radio-group>
    <!-- <el-radio-group v-model="selected">
        <el-radio v-for="trip in tripData" :label="trip.id" :key="trip.id">{{trip.line_title}}</el-radio>
    </el-radio-group>-->
    <Pagination :apiFun="apiFun" ref="tripPagination" :params="params" @change="handlePageChange" />
    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getTripLine } from "src/api/touristroute";
import Pagination from "src/components/template/common/pagination";
import { Promise } from "q";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      visible: false,
      keyword: "",
      tripData: [],
      selected: "",
      apiFun: getTripLine,
      params: {
        keyword: "",
        page_size: 10,
        page_index: 1
      }
      // pagination: {
      //     page_size: 10,
      //     page_index: 1,
      //     total_page:0,
      //     total_count:0
      // }
    };
  },
  created() {
    // this.getTripData();
  },
  mounted() {
    this.tripPagination = this.$refs.tripPagination;
  },
  methods: {
    // async getTripData() {
    //     let {code, data, msg} = await getTripLine({
    //         keyword: this.keyword,
    //         page_size: this.pagination.page_size,
    //         page_index: this.pagination.page_index
    //     })
    //     this.$log.debug(data);
    //     if(code !== 0){
    //         this.$message.error(msg);
    //         return
    //     };
    //     let {page_index, total_page, total_count, list, page_size} = data;
    //     this.tripData = list;
    //     this.pagination.page_size ={
    //         page_index, total_page, total_page, page_size
    //     }
    // },
    handleConfirm() {
      this.visible = false;
      this.$emit("confirm", this.selected);
      this.callback && this.callback(this.selected);
    },
    show(callback) {
      this.visible = true;
      this.callback = callback;
    },
    handlePageChange(data) {
      this.tripData = data;
    },
    handleRefresh() {
      this.$nextTick(() => {
        this.$refs.tripPagination.refresh();
      });
    }
  }
};
</script>
<style lang="scss">
@import "src/assets/css/variables.scss";
.pick-trip-layer {
  padding: 20px;
  .search-bar {
    display: flex;
    margin-bottom: 20px;
    .search-keywrod {
      flex: 1;
    }
    .search {
      margin-left: 20px;
      min-width: 100px;
    }
  }
  .trip-list {
    display: block;
  }
}
</style>