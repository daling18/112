<template>
<!-- application\index\view\dev\src\components\plan\control\operating.vue -->
  <div v-if="tableData" class="operating" v-loading.screen="loading">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="create_time"
        label="操作时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="op_type"
        label="操作类型">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status_name"
        label="团队状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="op_name"
        label="操作人">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGroupOperating, getSaleGroupOperating } from 'src/api/api'
export default {
  data() {
    return {
      tableData:null
    }
  },
  methods: {
    getGroupOperatingHandler(){
      let getGroupOperatingFunc = getGroupOperating;
      let params = {
        data: {
          id: this.$route.params.id,
          data_config_type: this.$route.params.type
        }
      };

      if(this.$route.meta && this.$route.meta.isSale){
        getGroupOperatingFunc = getSaleGroupOperating;
      }
      getGroupOperatingFunc({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          this.loading = false;
          if(code == 0){
            this.tableData = data;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted(){
    this.getGroupOperatingHandler();
  }
}
</script>

<style lang="scss" scoped>
.operating{
  padding: 20px;
  background-color: #fff;
}
</style>

