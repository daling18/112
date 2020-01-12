<template>
  <div class="wrapper" >
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">审批配置</li>
      </ul>
      <router-link class="right-btn"
        v-if="$menuPermission('api/approval/approval_config_form')"
        :to="{path:'/system/approval/gain', query:{id:'',ty:'ga'}}">
        新增审批配置
      </router-link>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">审批类型</div>
        <el-select v-model="searchData.approval_type" placeholder="请选择">
          <el-option label="全部" value="" />
          <el-option v-for="(o,i) in allData.approval_types"
            :key="i"
            :label="o"
            :value="i" />
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">发起人</div>
        <el-input v-model="searchData.initiator" placeholder="请输入发起人搜索"/>
      </div>
      <div class="search-item">
        <div class="label">关键词</div>
        <el-input v-model="searchData.key_word" placeholder="审批流中的姓名"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="approval_type_name" label="审批类型" align="center" width="180" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.approval_type_name">
                {{ scope.row.approval_type_name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="start_names" label="发起人" align="center" width="160" :resizable="false">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.start_names">
                {{ scope.row.start_names }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="end_names" label="审批流" align="center" min-width="220" :resizable="false">
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="bottom"
                v-if="scope.row.approval_flow_str != ''">
                <p class="ellipsis curpoint">
                  {{ scope.row.approval_flow_str }}
                </p>
                <div slot="content"
                  class="ttip"
                  v-for="(o,i) in scope.row.approval_flow" :key="i">
                  {{o}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center" :resizable="false">
            <template slot-scope="scope">
              <template v-if="$menuPermission('api/approval/approval_config_form')">
                <router-link :to="{path:'/system/approval/gain', query:{id:scope.row.id,ty:'ed'}}">
                  <template v-if="scope.row.has_img_flag == 1">
                    <!-- 1为进行中 -->
                    查看
                  </template>
                  <template v-else>
                    <!-- 2 -->
                    编辑
                  </template>
                </router-link>
                <router-link :to="{path:'/system/approval/gain', query:{id:scope.row.id,ty:'co'}}">
                  复制
                </router-link>
                <span class="alink"
                  @click="affirmDelete(scope.row.id)"
                  v-if="scope.row.have_ing_flag != 1">
                  删除
                </span>
              </template>
              <template v-else>--</template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="pagination.total_count" :page-size="pagination.page_size"/>
    </div>
    <!--启用禁用弹窗-->
    <el-dialog title="操作提示" :visible.sync="dialogDeleteVisible" size="tiny">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="affirmDelete(null,'cancel')">取 消</el-button>
        <el-button @click="affirmDelete(null,'submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/启用禁用弹窗-->
  </div>
</template>

<script>
import { approval_config_list, del_approval_config } from "src/api/approval";
export default {
  data() {
    return {
      searchDataOrigin: {
        approval_type: "",
        initiator: "",
        key_word: "",
        page: 1
      },
      searchData: {
        approval_type: "",
        initiator: "",
        key_word: "",
        page: 1
      },
      allData: [],
      tableData: [],
      pagination: {
        total_count: 0,
        total_page: 0,
        page_size: 15,
        page_index: 1
      },
      dialogDeleteVisible: false,
      deleteId: ''
    };
  },
  watch: {
    "searchData.program_type"(v) {
      if (v == 1) {
        this.allData.in_out_type_arr = this.allData.in_approval_types;
      } else if (v == 2) {
        this.allData.in_out_type_arr = this.allData.out_approval_types;
      }
    },
  },
  computed: {},
  methods: {
    handleSearch(bool){
      if(bool){
        this.searchData.page = 1;
        this.searchDataOrigin = {...this.searchData};
      }else{
        this.searchData = {...this.searchDataOrigin};
      }
      this.$router.replace({query: this.searchData});
      let params = {
        data: this.searchData
      }
      approval_config_list({
        params,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.allData = data;
            this.allData.in_out_type_arr = "";
            this.tableData = data.data;
            this.pagination.total_count = parseInt(
              this.allData.total_count,
              10
            );
            this.pagination.total_page = parseInt(this.allData.total_page, 10);
            this.pagination.page_size = parseInt(this.allData.page_size, 10);
            this.pagination.page_index = parseInt(this.allData.page_index, 10);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCurrentChange(val) {
      this.searchDataOrigin.page = val;
      this.handleSearch();
    },
    affirmDelete(id,type){
      if(id){
        this.dialogDeleteVisible = true;
        this.deleteId = id;
      }else{
        if(type == 'submit'){
          let para = {};
          para.data = {
            id: this.deleteId
          }
          del_approval_config({
            params: para,
            success: res => {
              let { code, data, msg } = res.data;
              if (code == 0) {
                this.deleteId = '';
                this.$message.success(msg);
                this.handleSearch();
              } else {
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        }
        this.dialogDeleteVisible = false;
      }
    },
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px;
  padding: 15px;
  background: #fff;
}

.list {
  .table-title {
    height: 36px;
    margin: 16px 0 10px 0;

    .total {
      display: inline-block;
      line-height: 36px;
      font-size: 14px;
      .total-receive {
        font-size: 16px;
        color: #00cc00;
      }
      .total-pay {
        font-size: 16px;
        color: #ff9900;
        margin-right: 20px;
      }
    }
    .btn-areas {
      float: right;
    }
  }
}

.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.diag-role-con .li {
  padding: 5px 0 10px 80px;
}
.diag-role-con p {
  float: left;
  margin-left: -80px;
}
.cho {
  overflow: hidden;
}
.cho p {
  line-height: 30px;
}
.cho i {
  position: relative;
  display: inline-block;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  padding: 0 15px 0 5px;
  cursor: pointer;
  line-height: 28px;
}
.cho i:hover {
  color: #b10c79;
  border-color: #b10c79;
}
.cho i::before {
  content: "×";
  position: absolute;
  right: 3px;
  top: -1px;
}
.cho i:hover::before {
  color: #b10c79;
}
.sh {
  overflow: hidden;
}
.sh p {
  line-height: 30px;
}
.sh input {
  float: left;
  width: 160px;
  padding: 3px 10px;
  line-height: 18px;
}
.cbox {
  border: 1px solid #e1e1e1;
  padding: 5px 10px;
  min-height: 60px;
}
.cbox .el-checkbox {
  width: 145px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 0 !important;
  margin-top: 5px;
  margin-right: 10px;
}
.right-btn {
  float: right;
  line-height: 30px;
  color: #fff;
  background: #b10c79;
  margin: 7px 15px 0 0;
  padding: 0 15px;
  border-radius: 4px;
}
.alink {
  color: #b10c79;
  margin-left: 10px;
  cursor: pointer;
}
.ttip {
  max-width: 800px;
  line-height: 18px;
  font-size: 13px;
}
</style>
