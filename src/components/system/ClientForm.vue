<template>
  <div class="wrapper" >
    <div class="system-content">
      <div class="mod-form">
        <div class="title">客户信息</div>
        <el-form
          :model="form"
          :rules="rules"
          label-width="120px"
          ref="dataForm"
          style="width: 500px"
        >
          <el-form-item label="单位名称" prop="settlement_org_id">
            <el-select 
              v-model="selectOrg"
              remote
              filterable
              clearable
              value-key="id"
              :remote-method="getMatchOrg"
              :loading="loadingOrg"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="org in orgList"
                :key="org.id"
                :label="org.name"
                :value="org"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="client_type">
            <el-select v-model="form.client_type" placeholder="请选择" style="width: 100%">
              <el-option v-for="(val, key) in clientTypeListMap" :key="key" :label="val" :value="key"/>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="name">
            <el-input v-model="form.name" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="联系人身份证" prop="id_card">
            <el-input v-model="form.id_card" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="联系人电话" prop="mobile">
            <el-input v-model="form.mobile" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="联系人QQ" prop="qq">
            <el-input v-model="form.qq" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" auto-complete="off"/>
          </el-form-item>
          <el-form-item>
            <div class="submit-buttons tal">
              <el-button type="primary" @click="handleSubmitForm">保存</el-button>
              <el-button @click="handleBack">返回</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {addClient, doAddClient, getSettlementList} from 'src/api/client';
export default {
  name: 'ClientForm',
  data() {
    return {
      form: {
        settlement_org_id: '',
        settlement_org_name: '',
        client_type: ''
      },
      clientTypeListMap: [],
      selectOrg: null,
      orgList: [],
      loadingOrg: false,
      rules: {
        settlement_org_id: [{
          required: true,
          type: 'number',
          message: '请输入单位名称',
          trigger: 'blur'
        }],
        client_type: [{
          required: true,
          message: '请选择类型',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '联系人姓名不能为空',
          trigger: 'blur'
        }],
      }
    };
  },
  computed:{
  },
  watch: {
    selectOrg: function(val) {
      if(val && val.id){
        this.form.settlement_org_id = val.id;
        this.form.settlement_org_name = val.name;
      }else{
        this.form.settlement_org_id = '';
        this.form.settlement_org_name = '';
      }
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let para = {
        data: {
          id: this.$route.query.id || ''
        }
      };
      addClient({
        params: para,
        success: (res) => {
          let data = res.data;
          if (data.code == '0') {
            this.form = data.data;
            // 更新selectOrg的值，触发获取默认单位列表
            this.selectOrg = {
              id: data.data.settlement_org_id, 
              name: data.data.settlement_org_name
            };
            // 变更时将当前单位作为单位列表，否则无法正常显示单位名称
            if(data.data.id){
              this.orgList = [this.selectOrg];
            }
            // 类型转成字符串类型，否则无法正常选中
            this.form.client_type = this.form.client_type + '';
            this.clientTypeListMap = data.data.client_type_list;
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getMatchOrg: function(query){
      query = (query || '').trim();
      const data = {name: query};
      console.log('1232');
      if(query && query == this.form.settlement_org_name){
        return false;
      }
      this.loadingOrg = true;
      getSettlementList({
        params: {data},
        success: (res) => {
          const { code, data, msg } = res.data;
          let list = [];

          if(!code){
            list = data;
          }else{
            this.$message({message: msg, type:'error'});
          }
          this.orgList = list;
          this.loadingOrg = false;
        }
      });
    },
    handleSubmitForm(){
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false;
        }
        doAddClient({
          params: {
            data: this.form
          },
          success: (res) => {
            if(res.data.code == 0){
              this.$message.success(res.data.msg);
              this.$router.push({path:'/system/client/list'});
            }else{
              this.$message.error(res.data.msg);
            }
          },
          showLoading: true
        });
      });
    },
    handleBack(){
      this.$router.go(-1);
    }
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
.system-content{
  background: #fff;
}
.el-upload__tip{
  margin-left: 10px;
}
.form-gain{
  width: 800px;
}
.filter-tree{
  display: inline-block;
  min-width: 377px;
}
.form-gain .el-select{
  width: 100%;
}
</style>
