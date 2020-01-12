<template>
  <div class="wrapper" >
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">基本信息</li>
        <template v-if="$route.query.id||$route.query.id==0">
          <li  @click="goto( '/role/power',{id:$route.query.id,type:$route.query.type})">功能权限</li>
        </template>
        <template v-else>
          <li>功能权限</li>
        </template>
      </ul>
    </div>
    <!-- {{ruleForm}} -->
    <div class="system-content">
      <div class="mod-form">
        <div class="title">基本信息</div>
        <div class="form-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <!-- <template v-if="!!$route.query.id">
              <el-form-item label="组织机构" prop="org_name">
                <el-input v-model="ruleForm.org_name" disabled="disabled"></el-input>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="组织机构" prop="org_name">
                <span style="display:none;"><el-input v-model="ruleForm.org_name"></el-input></span>
                <el-tree
                  class="filter-tree"
                  :data="downSelect"
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  ref="tree"
                  @check-change="handleNodeChange"
                  check-strictly
                  show-checkbox
                  accordion
                  highlight-current
                  empty-text="没有对应的组织机构"
                  node-key="org_id">
                </el-tree>
              </el-form-item>
            </template> -->
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <template v-if="$route.query.type!=0">
              <div class="submit-buttons">
                <el-button type="default" @click="submitForm('ruleForm')" :disabled="btnDisabled">下一步</el-button>
              </div>
            </template>
          </el-form>
        </div>    
      </div>
    </div>
  </div>
</template>

<script>
import { gainRole , editRole , getRoleDetail , getSearchOrg ,getOrgination} from 'src/api/api'
import * as format from 'src/utils/format';
export default {
  name: 'RoleGain',
  data() {
    return {
      org_id:'',
      // org_info:[{org_id: 1748, org_name: "盈科美辰国际旅行社有限公司", org_type: 1, org_code: ",40,", p_name: ""}],
      ruleForm:{
        name:'',
        org_name:'',
        remark:'',
        // orgId:'',
        // orgCode:'',
        id:''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        // org_name: [
        //   { required: true, message: '请选择组织机构'},
        // ]
      },
      btnDisabled:false,
      downSelect:[],
      defaultProps: {
        children: 'child',
        label: 'org_name',
        // disabled:'is_disabled'
      }
    }
  },
  computed:{
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    initFun(){
      if(!!this.$route.query.id){
        this.getRoleDetailHandler();
      }else{
        this.getOrginationHandler();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid&&this.ruleForm.id=='') {
          this.gainRoleHandler();
        }else if(valid&&this.ruleForm.id!=''){
          this.editRoleHandler();
        }else {
           console.log('error submit!!');
          return false;
        }
      });
    },
    getRoleDetailHandler(){
      let params = {
        data: {
          id:this.$route.query.id
        }
      };

      getRoleDetail({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == 0) {
            this.ruleForm.name=data.data.name||'';
            this.ruleForm.remark=data.data.remark||'';
            this.ruleForm.org_name=data.data.org_name||'';
            // this.ruleForm.orgId=data.data.org_id||'';
            // this.ruleForm.orgCode=data.data.org_code||'';
            this.ruleForm.id=this.$route.query.id||'';

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getOrginationHandler(){
      let params = {
        data: {
          org_id:0
        }
      };

      getOrgination({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == '0') {
            this.downSelec=[];

            this.downSelect.push(data.data);

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    gainRoleHandler(){
      let params = {
        data: this.ruleForm
      };
      this.btnDisabled=true;
      gainRole({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == 0) {
            this.$message.success(data.msg);
            this.$router.push({path:'/role/power',query:{id:data.data.id}});
          } else {
            this.$message.error(data.msg);
          }

          this.btnDisabled=false;
        },
        showLoading: true
      });
    },
    editRoleHandler(){
      let params = {
        data: this.ruleForm
      };

      editRole({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == 0) {
            this.$message.success(data.msg);
            this.$router.push({path:'/role/power',query:{id:this.$route.query.id}});
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    // }, // 没有该逻辑 20190110
    // handleNodeChange(obj,bool) {
    //   let org_id_arr=[];
    //   org_id_arr.push(obj.org_id);

    //   if(bool){
    //     this.$refs.tree.setCheckedKeys(org_id_arr);
    //     this.ruleForm.orgId=obj.org_id;
    //     this.ruleForm.orgCode=obj.org_code;
    //     this.ruleForm.org_name=obj.org_name;
    //   }else{
    //     if(obj.org_id==this.ruleForm.orgId){
    //       this.ruleForm.orgId='';
    //       this.ruleForm.orgCode='';
    //       this.ruleForm.org_name='';
    //     }
    //   }

      // if(bool&&obj.is_disabled=='0'){
      //   this.$refs.tree.setCheckedKeys(org_id_arr);
      //   this.ruleForm.orgId=obj.org_id;
      //   this.ruleForm.orgCode=obj.org_code;
      //   this.ruleForm.org_name=obj.org_name;
      // }

      // if(bool&&obj.is_disabled!='0'){
      //   this.$message.error('该组织机构被禁用');
      //   this.$refs.tree.setCheckedKeys([]);
      // }
      //  console.log(1)
    }
  },
  mounted() {
    this.initFun();
  }
}
</script>

<style scoped lang="scss">
.form-content{

  .el-form{
    width:480px;
  }
  .el-select{
    display:block;
  }
  
}

</style>
