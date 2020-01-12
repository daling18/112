<template>
  <el-pagination
    class="pagination"
    :total="total_count"
    :current-page="page_index"
    :page-size="page_size"
    :page-count="total_page"
    layout="prev,pager,next, total, jumper, slot"
    background
    @current-change="pageChange"
  ></el-pagination>
</template>
<script>
export default {
  props: {
    apiFun: {
      type: Function,
      default: new Function()
    },
    params: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      total_count: 0,
      page_size: 10,
      total_page: 0,
      page_index: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.apiFun({
        ...this.params,
        page_index: this.page_index,
        page_size: this.page_size
      })
        .then(res => {
          this.$log.debug(res);
          let { code, data, msg } = res;
          if (code !== 0 || !data) {
            this.$message.error(msg);
            return Promise.reject(res);
          }
          let { page_index, list, page_size, total_count, page_count } = data;
          this.page_count = page_count;
          this.page_index = page_index;
          this.total_count = total_count;
          this.page_size = page_size;
          this.$emit("change", list);
        })
        .catch(error => {
          this.$log.error(error);
          this.$emit("change", []);
        });
    },
    pageChange(index) {
      this.page_index = index;
      this.getData();
    },
    refresh(page = 1) {
      // 暴露外部接口
      if (page) {
        this.page_index = page;
      }
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  text-align: right;
}
</style>
<style lang="scss">
.pagination {
  &.is-background .btn-prev,
  &.is-background .btn-next,
  &.is-background .el-pager li {
    background: #fff;
  }
}
</style>