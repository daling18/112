<template>
  <el-dialog
    :visible.sync="visible"
    custom-class="on-channel-layer"
    title="渠道管理"
    @close="handleCloseFn"
    @open="handleLayerOpen"
  >
    <div class="search-bar">
      <el-input v-model="searchForm.name"></el-input>
      <!-- <el-select v-model="searchForm.type">
        <el-option label="全部" value="0"></el-option>
      </el-select>-->
      <el-button @click="handleSearch" type="primary">搜索</el-button>
    </div>
    <div class="channel-container" v-loading="loading">
      <el-row class="tools-bar">
        <el-button @click="handleUp">全部上架</el-button>
        <el-button @click="handleDown">全部下架</el-button>
        <!-- <el-button>全部上架</el-button>
        <el-button>全部下架</el-button>-->
      </el-row>
      <el-tree
        :data="channelData"
        ref="tree"
        show-checkbox
        node-key="id"
        :props="{
          children: 'child',
          label: 'name'
        }"
      >
        <span class="row" slot-scope="{ node, data }">
          <span class="cell">{{ node.label }}</span>
          <span class="status" v-if="!data.void">
            <el-tag :type="data.is_online == 1 ? 'success': 'error'">{{data.is_online | mapStatus}}</el-tag>
          </span>
          <span class="operation" v-if="!data.void">
            <el-link
              type="primary"
              size="mini"
              v-if="[0, 4, 5].includes(data.is_online)"
              @click.stop="handleSingleUp(data)"
            >上架</el-link>
            <el-link size="mini" v-if="[1, 3].includes(data.is_online)" @click.stop="handleSingleDown(data)">下架</el-link>
            <el-link size="mini" v-if="[2].includes(data.is_online)" @click.stop="handleSingleWithdraw(data)">撤回</el-link>
          </span>
        </span>
      </el-tree>
    </div>
  </el-dialog>
</template>
<script>
import {
  getChannelList,
  setProductUp,
  setProductDown,
  setProductRecall
} from "src/api/touristroute";
import Pagination from "src/components/template/common/pagination";
export default {
  name: "onChannelLayer",
  components: {
    Pagination
  },
  filters: {
    mapStatus(status) {
      status = parseFloat(status);
      switch(status){
        case 0:
          return '未上架';
        case 1:
          return '上架';
        case 2:
          return '审核中';
        case 3:
          return '审核通过';
        case 4:
          return '审核不通过';
        case 5:
          return '撤回';
        default:
          return ''
      }
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      searchForm: {
        name: "",
        type: "0"
      },
      selectedItems: [],
      getChannelList,
      channelData: [],
      isSelected() {},
      product_id: [0],
      org_id: []
    };
  },
  computed: {
    postData() {
      return {
        id: this.product_id.length !== 1 ? 0 : this.product_id,
        org_id: [],
        name: this.searchForm.name,
        type: this.searchForm.type
      };
    }
  },
  watch: {
    channelData(newValue) {
      this.$log.debug(newValue);
      if (newValue.length === 0) {
        return;
      }
      let selectedRows = newValue.filter(item => item.selected !== 0);
      // this.autoSelected(selectedRows);
    }
  },
  mounted() {
    this.loading = true;
    this.tree = this.$refs.tree;
  },

  methods: {

    async getChannelData() {
      this.loading = true;
      let { code, data, msg } = await getChannelList(this.postData);
      this.loading = false;
      if (code !== 0) {
        return;
      }
      let list = data.list;
      if(list.length > 1){
        list = [{
          id: 0,
          name: "全部",
          child: list,
          void: true
        }]
      }
      this.channelData = list;
    },
    async setProductUp() {
      let { code, data, msg } = await setProductUp({
        id: this.product_id,
        org_id: this.org_id
      });
      this.loading = false;
      if (code !== 0) {
        this.$message.error(msg);
        return;
      }
      this.$message.success(msg);

      this.$emit("success", "up");
      this.visible = false;
      this.getChannelData();
    },
    async setProductDown() {
      let { code, data, msg } = await setProductDown({
        id: this.product_id,
        org_id: this.org_id
      });
      this.loading = false;
      if (code !== 0) {
        this.$message.error(msg);
        return;
      }
      this.$message.success(msg);
      this.$emit("success", "down");
      this.visible = false;
      this.getChannelData();
    },
    handleUp() {
      // this.$log.debug(this.$refs.tree.getCheckedKeys());
      let selectedIds = this.$refs.tree.getCheckedKeys();
      if (selectedIds.length === 0) {
        this.$message.error("请选择上架渠道");
        return;
      }
      this.loading = true;
      this.org_id = selectedIds.filter(item => !!item);
      this.setProductUp();
    },
    handleDown() {
      let selectedIds = this.$refs.tree.getCheckedKeys();
      if (selectedIds.length === 0) {
        this.$message.error("请选择下架渠道");
        return;
      }
      this.loading = true;
      this.org_id = selectedIds.filter(item => !!item);
      this.setProductDown();
    },
    handleSingleUp(row){
      this.org_id = [row.id];
      this.setProductUp()
    },
    handleSingleDown(row){
      this.org_id = [row.id];
      this.setProductDown()
    },
    // 撤回
    async handleSingleWithdraw(row){
      let {code, data, msg} = await setProductRecall({
        org_id: [row.id],
        id: this.product_id
      });
      if(code !== 0){
        this.$message.error(msg);
        return;
      }
      this.$emit("success", "recall");
      this.visible = false;
    },
    handleSelectionChange(selection) {
      this.$log.debug(selection);
      this.selectedItems = selection;
    },
    handleSelectAll(selection, event) {
    },
    show(ids) {
      this.visible = true;
      this.product_id = ids;
    },
    handleSearch() {
      this.getChannelData();
      // this.channelPagination.refresh();
    },
    handleCloseFn() {
      this.$emit("close");
    },
    handleLayerOpen() {
      this.getChannelData();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables";
/deep/.on-channel-layer {
  width: 700px;
}
/deep/.el-tree-node__content {
  margin: 5px 0;
}
.search-bar {
  display: flex;
  margin-bottom: 10px;
  .el-input,
  .el-select {
    margin-right: 10px;
    flex: 1;
  }
}
.tools-bar {
  margin-bottom: 10px;
}
.up {
  color: $themeColor;
}
.row {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 2;
  }
  .status {
    width: 100px;
  }
  .operation {
    flex: 1;
  }
  .el-link:not(:first-child) {
    margin-left: 20px;
  }
}
</style>