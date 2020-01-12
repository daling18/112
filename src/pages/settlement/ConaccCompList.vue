<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link tag="li"
          v-if="$menuPermission('settlement/conacc/peerlist')"
          :to="{path:'peer-list'}">
          同行账户
        </router-link>
        <li class="on">本公司账户</li>
      </ul>
      <div class="btn">
        <el-button type="primary" size="long" @click="edit()" v-if="$menuPermission('settlement/conacc/comaccount/aedcomacc')">+ 添加往来账户</el-button>
      </div>
    </div>
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">收付款人</div>
        <el-input v-model="searchData.payment_name" placeholder="收付款人姓名"/>
      </div>
      <div class="search-item">
        <div class="label">账户类型</div>
        <el-select v-model="searchData.payment_type" placeholder="全部">
          <el-option label="全部" value="0"/>
          <el-option label="对公" value="1"/>
          <!-- <el-option label="对私" value="2"/> -->
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">付款方式</div>
        <el-select v-model="searchData.account_type" placeholder="全部">
          <el-option label="全部" value="0"/>
          <el-option label="支付宝" value="1"/>
          <el-option label="微信" value="2"/>
          <el-option label="民生银行账户" value="3"/>
          <el-option label="其他银行账户" value="4"/>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">卡/账号</div>
        <el-input v-model="searchData.account_no" placeholder="银行账号/支付平台账号"/>
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
            <el-table-column label="账户类型" align="center" width="80" :resizable="false">
              <template slot-scope="scope">
                <template v-if="scope.row.payment_type==1">对公账户</template>
                <!-- <template v-if="scope.row.payment_type==2">对私账户</template> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="payment_name"
              label="收付款人姓名"
              align="center"
              width="140"
              :resizable="false"
            />
            <el-table-column label="付款方式" align="center" width="140" :resizable="false">
              <template slot-scope="scope">
                <template v-if="scope.row.account_type==1">支付宝</template>
                <template v-if="scope.row.account_type==2">微信</template>
                <template v-if="scope.row.account_type==3">民生银行账户</template>
                <template v-if="scope.row.account_type==4">其他银行账户</template>
              </template>
            </el-table-column>
            <el-table-column label="开户行" align="center" width="100" :resizable="false">
              <template slot-scope="scope">
                <template v-if="scope.row.bank_name">{{ scope.row.bank_name }}</template>
                <template v-else>-</template>
              </template>
            </el-table-column>
            <el-table-column label="开户名／账户姓名／账号" align="center" min-width="180" :resizable="false">
              <template slot-scope="scope">
                <template v-if="scope.row.account_name">{{ scope.row.account_name }}</template>
                <template v-else>-</template>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_no"
              label="银行账号／支付平台账号"
              align="center"
              min-width="180"
              :resizable="false"
            />
            <el-table-column label="设为结算收款账户" align="center" >
              <template slot-scope="scope">
                <el-switch v-model="scope.row.is_settle_account" @change="setSettleAccount(scope.row, scope.$index, $event)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120" fixed="right">
              <template slot-scope="scope">
                <template v-if="$menuPermission('settlement/conacc/comaccount/aedcomacc')"><el-button type="text" @click="edit(scope.row)">编辑</el-button></template>
                <template v-else>
                  <div style="text-align:center;">-</div>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="page" v-show="pageShow">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="totalPage" :page_size="page_size"/>
    </div>
    <el-dialog :title="form.id?'编辑本公司账户':'新增本公司账户'" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <div class="form-content">
        <el-form :model="form">

          <el-form-item label="账号类型" :label-width="formLabelWidth" required>
            <el-select v-model="form.payment_type" placeholder="请选择">
              <el-option label="对公" :value="1"/>
              <!-- <el-option label="对私" :value="2"/> -->
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" required>
            <el-input v-model="form.payment_name" placeholder="请输入姓名" auto-complete="off"/>
          </el-form-item>

          <el-form-item label="付款方式" :label-width="formLabelWidth" required>
            <el-select v-model="form.account_type" placeholder="请选择">
              <el-option label="支付宝" :value="1"/>
              <el-option label="微信" :value="2"/>
              <el-option label="民生银行账户" :value="3"/>
              <el-option label="其他银行账户" :value="4"/>
            </el-select>
          </el-form-item>
          <div v-show="form.account_type!='1'&&form.account_type!='2'">
            <el-form-item label="开户名" :label-width="formLabelWidth" required>
              <el-input v-model="form.account_name" placeholder="请输入开户名" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="开户银行" :label-width="formLabelWidth" required>
              <el-input v-model="form.bank_name" placeholder="请输入开户行，例如：建设银行" auto-complete="off"/>
            </el-form-item>
          </div>
          <div v-show="form.account_type=='1'">
            <el-form-item label="支付平台账户" :label-width="formLabelWidth" required>
              <el-input v-model="form.ali_no" placeholder="请输入支付平台账户" auto-complete="off"/>
            </el-form-item>
          </div>
          <div v-show="form.account_type=='2'">
            <el-form-item label="支付平台账户" :label-width="formLabelWidth" required>
              <el-input v-model="form.weixin_no" placeholder="请输入支付平台账户" auto-complete="off"/>
            </el-form-item>
          </div>
          <div v-show="form.account_type=='3'">
            <el-form-item label="银行账号" :label-width="formLabelWidth" required>
              <el-input v-model="form.bank_no" placeholder="请输入银行账号" auto-complete="off"/>
            </el-form-item>
          </div>
          <div v-show="form.account_type=='4'">
            <el-form-item label="银行账号" :label-width="formLabelWidth" required>
              <el-input v-model="form.other_no" placeholder="请输入银行账号" auto-complete="off"/>
            </el-form-item>
          </div>
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
import { 
  getPaymentAccountListV1,
  editPaymentAccount,
  addPaymentAccount,
  setSettlementAccount
   } from 'src/api/api';
import * as format from 'src/utils/format';
export default {
  name: 'AccountCompany',
  data() {
    return {
      dialogFormVisible:false,
      form: {
        payment_type: '',
        payment_name: '',
        account_type: '',
        account_name: '',
        bank_name: '',
        bank_no: '',
        other_no:'',
        ali_no: '',
        weixin_no: '',
        account_no: '',
        id:''
      },
      formLabelWidth: '110px',
      totalPage: 1,
      page_size: 20,
      currentPage: 1,
      page: 1,
      pageShow: true,
      searchDataOrigin:{
        payment_type: this.$route.query.payment_type,
        payment_name: this.$route.query.payment_name,
        account_type: this.$route.query.account_type,
        account_no: this.$route.query.account_no
      },
      searchData: {
        payment_type: '',
        payment_name: '',
        account_type: '',
        account_no: ''
      },
      tableData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // change(){
    //   this.form.account_no="";
    // },
    async setSettleAccount(row, index, e) {
      let kaiNum = 0
      e && this.tableData.forEach(item => {
       item.is_settle_account ? kaiNum +=1 : ""
      })
      if(kaiNum > 1) {
        this.tableData[index].is_settle_account = false 
        this.$message.warning("结算收款账户仅可设置一个")
        return 
      }
      try {
        const params = {
          id:row.id,
          is_settle_account: e ? "1" : "0"
        }
        const {code, data, msg} = await setSettlementAccount(params)

        if(code !== 0) return this.$message.error(msg)
        this.$message.success(msg)
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    goto(path, query) {
      this.$router.push({
        path: path,
        query: query
      });
    },
    async getList(bool) {
      let params =  this.searchData
      params.page_size = this.page_size

      if (bool) {
        this.totalPage=1;
        this.currentPage= 1;
        this.page=1;
        this.$router.push({ path: '', query: this.searchData });
        this.searchDataOrigin.payment_name = this.searchData.payment_name || '';
        this.searchDataOrigin.payment_type = this.searchData.payment_type || '';
        this.searchDataOrigin.account_type = this.searchData.account_type || '';
        this.searchDataOrigin.account_no = this.searchData.account_no || '';
      }else{
        this.searchData.payment_name = this.searchDataOrigin.payment_name;
        this.searchData.payment_type = this.searchDataOrigin.payment_type;
        this.searchData.account_type = this.searchDataOrigin.account_type;
        this.searchData.account_no = this.searchDataOrigin.account_no;
      }

      params.page = this.page;
      
      const {code, data, msg} = await getPaymentAccountListV1(params)

      if(code !== 0) return this.$message.error(msg)
      data.list.forEach(item => {
       item.is_settle_account = item.is_settle_account == "1" ? true : false
      });
      this.tableData = data.list;
      this.totalPage = data.total_page;
      this.currentPage = data.page_index;
      console.log(code,data,msg)
      // getPaymentAccountListV1({
      //   params: params,
      //   success: (params) => {
      //     let data = params.data;

      //     if (data.code == '0') {
      //       this.tableData = data.data.list;
      //       this.totalPage = data.data.total_page;
      //       this.currentPage = data.data.page_index;

      //     } else {
      //       this.$message.error(data.msg);
      //     }
      //   },
      //   showLoading: true
      // });
    },
    edit(row){
      if(row){
        this.form={
          payment_type:row.payment_type,
          payment_name:row.payment_name,
          account_type:row.account_type,
          account_name:row.account_name,
          bank_name:row.bank_name,
          account_no:row.account_no,
          ali_no:row.account_no,
          weixin_no:row.account_no,
          other_no:row.account_no,
          bank_no:row.account_no,
          id:row.id
        };
        if(this.form.account_type==1){
          this.form.weixin_no='';
          this.form.bank_no='';
          this.form.other_no='';
          this.form.account_no=this.form.account_no;
        }else if(this.form.account_type==2){
          this.form.ali_no='';
          this.form.bank_no='';
          this.form.other_no='';
          this.form.weixin_no=this.form.account_no;
        }else if(this.form.account_type==3){
          this.form.ali_no='';
          this.form.weixin_no='';
          this.form.other_no='';
          this.form.bank_no=this.form.account_no;
        }else{
          this.form.ali_no='';
          this.form.weixin_no='';
          this.form.bank_no='';
          this.form.other_no=this.form.account_no;
        }

      }else{
        this.form={
          payment_type: '',
          payment_name: '',
          account_type: '',
          account_name: '',
          bank_name: '',
          account_no: '',
          bank_no: '',
          ali_no: '',
          weixin_no: '',
          other_no: '',
          id:''
        };
      }

      this.dialogFormVisible=true;
    },
    save(){
      this.dialogFormVisible=true;

      if(this.form.account_type==1){
        this.form.account_no=this.form.ali_no;
      }else if(this.form.account_type==2){
        this.form.account_no=this.form.weixin_no;
      }else if(this.form.account_type==3){
        this.form.account_no=this.form.bank_no;
      }else{
        this.form.account_no=this.form.other_no;
      }

      let params = {data: this.form},
        api=this.form.id?editPaymentAccount:addPaymentAccount;


      if(!!this.form.id){
        this.$confirm('修改账户信息后，收／付款记录中的收／付款方式、账号会相应更新成修改后的数据，是否确定保存修改？?', ' 操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          editPaymentAccount({
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
        addPaymentAccount({
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
