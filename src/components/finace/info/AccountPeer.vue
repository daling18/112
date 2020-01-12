<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link tag="li" v-if="$menuPermission('api/finance/get_payment_account_list')" :to="{path:'/finace/account/company'}">
          公司账户
        </router-link>
        <li class="on">同行账户</li>
      </ul>
      <div class="btn">
        <el-button type="primary" size="long" @click="edit()" v-if="$menuPermission('api/peeraccount/add')">+ 添加同行帐户</el-button>
      </div>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">同行名称</div>
        <el-input v-model="searchData.peer_org_name" placeholder="同行名称"/>
      </div>
      <div class="search-item">
        <div class="label">银行卡号</div>
        <el-input v-model="searchData.bank_number" placeholder="银行卡号"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="getList(true)">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column min-width="200" label="同行名称" align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.peer_org_name">
                  {{ scope.row.peer_org_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="70" label="联系人" align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.contract_name">
                  {{ scope.row.contract_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="90" label="开户银行" align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.bank_name">
                  {{ scope.row.bank_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="200" label="开户名" align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" v-if="scope.row.account_name" :title="scope.row.account_name">
                  {{ scope.row.account_name }}
                </div>
                <template v-else>--</template>
              </template>
            </el-table-column>
            <el-table-column min-width="160" label="银行卡号" align="center" :resizable="false">
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.bank_number">
                  {{ scope.row.bank_number }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <template v-if="$menuPermission('api/peeraccount/add')"><el-button type="text" @click="edit(scope.row)">编辑</el-button></template>
                <template v-else>--</template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage"/>
    </div>
    <el-dialog :title="form.id != '0' ? '编辑同行账户' : '新增同行账户'" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <div class="form-content">
        <el-form :model="form">
          <el-form-item label="单位名称" :label-width="formLabelWidth" required>
            <el-select
              class="select-org"
              v-model="selectOrg"
              filterable
              remote
              clearable
              value-key="id"
              :loading="orgLoading"
              :remote-method="getMatchOrg"
              placeholder="输入同行单位名称进行搜索"
              @change="handleSelectOrg">
              <el-option
                v-for="item in orgList"
                :key="item.id"
                :label="item.name"
                :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input v-model="form.contract_name" placeholder="请输入联系人" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="开户名" :label-width="formLabelWidth" required>
            <el-input v-model="form.account_name" placeholder="请输入开户名" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="开户银行" :label-width="formLabelWidth" required>
            <el-input v-model="form.bank_name" placeholder="请输入开户行，例如：建设银行" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="银行卡号" :label-width="formLabelWidth" required>
            <el-input v-model="form.bank_number" placeholder="请输入银行卡号" auto-complete="off"/>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="foot-btn">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { peerAccount, peerAccountAdd, peerAccountTodoAdd, peerAccountSearchOrg } from 'src/api/api';
import * as format from 'src/utils/format';
export default {
  name: 'PeerAccount',
  data() {
    return {
      dialogFormVisible:false,
      form: {
      },
      orgList: [],
      orgDefaultList: [],
      selectOrg: {},
      orgLoading: false,
      formLabelWidth: '110px',
      totalPage: 1,
      currentPage: 1,
      page: 1,
      pageShow: true,
      searchDataOrigin:{
        peer_org_name: this.$route.query.peer_org_name || '',
        bank_number: this.$route.query.bank_number || ''
      },
      searchData: {
        peer_org_name: '',
        bank_number: ''
      },
      tableData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // change(){
    //   this.form.account_no="";
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    getList(bool) {

      if (bool) {
        this.totalPage=1;
        this.currentPage= 1;
        this.page=1;
        this.$router.push({ path: '', query: this.searchData });
        this.searchDataOrigin = {... this.searchData};
      }else{
        this.searchData = {... this.searchDataOrigin};
      }

      let params = {
        data: this.searchData
      };
      params.data.page = this.page;

      peerAccount({
        params: params,
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            this.tableData = data.data.data;
            this.totalPage = data.data.total_page;
            this.currentPage = data.data.page_index;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    edit(row){
      peerAccountAdd({
        params: {data: {id: row ? row.id : 0}},
        success: (params) => {
          let data = params.data;

          if (data.code == '0') {
            let selectOrg = {};

            this.form = data.data.account_info;
            this.orgList = data.data.org_info;
            this.orgDefaultList = data.data.org_info;
            this.orgDefaultList.some(item => {
              if(item && item.id == this.form.peer_org_id){
                selectOrg = item;
                return true;
              }
            });
            this.selectOrg = selectOrg;
            this.dialogFormVisible=true;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });

    },
    save(){
      this.dialogFormVisible=true;
      let params = {data: this.form};

      if(this.form.id != '0'){
        this.$confirm('修改账户信息后，收／付款记录中的收／付款方式、账号会相应更新成修改后的数据，是否确定保存修改？?', ' 操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          peerAccountTodoAdd({
            params: params,
            success: (params) => {
              let data = params.data;

              if (data.code == '0') {
                this.$message.success(data.msg);
                this.getList();
                this.dialogFormVisible=false;
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消'
          // });
        });
      }else{
        peerAccountTodoAdd({
          params: params,
          success: (params) => {
            let data = params.data;

            if (data.code == '0') {
              this.$message.success(data.msg);
              this.getList();
              this.dialogFormVisible=false;
            } else {
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }
    },
    getMatchOrg(query){
      if (query != null && (query !== '')) {
        const data = {name: query};
        
        this.orgLoading = true;
        peerAccountSearchOrg({
          params: {data},
          success: (params)=>{
            let { code, data, msg } = params['data'];
            let list = [];

            if(!code){
              list = data;
            }else{
              this.$message({message: msg, type:'error'});
            }
            this.orgList = list;
            this.orgLoading = false;
          }
        });
      }else if(this.orgDefaultList){
        this.orgList = this.orgDefaultList;
      }
    },
    handleSelectOrg(item){
      //  console.log('select org: ', item);
      this.selectOrg = item;
      this.form.peer_org_id = item.id || '';
      this.form.peer_org_name = item.name || '';
    }
  }
};
</script>

<style scoped lang="scss">
.record-title {
  display: block;
  margin: 20px 0;
  text-align: left;
  font-size: 14px;

  th {
    color: #777;
  }
  td {
    padding-right: 20px;
    font-size: 18px;
    color: #555;
  }
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
        color: #00CC00;
      }
      .total-pay {
        font-size: 16px;
        color: #FF9900;
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

.tool a {
  display: inline-block;
  color: #20a0ff;
}

.foot-btn {
  text-align:center;
}
.form-content {

  .el-form {
    padding-right: 30px;

    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
  }
}

</style>
