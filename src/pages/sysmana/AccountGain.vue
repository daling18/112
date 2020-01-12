// src\components\system\account\gain.vue
<template>
  <div class="wrapper" >
    <div class="system-content">
      <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="form-gain"
      >
        <div class="mod-form">
          <div class="title">基本信息</div>
          <h4 class="subtitle">员工姓名、手机号、微信号等信息会展示在小程序店铺内，务必填写真实信息</h4>
          <div class="form-content">
            <el-form-item label="员工姓名" prop="user_name">
              <el-col :span="14">
                <el-input v-model="ruleForm.user_name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="所在部门" prop="org_name">
              <template v-if="$route.query.id">
                <el-col :span="14">
                  <el-input v-model="ruleForm.org_name" disabled="disabled">
                  </el-input>
                </el-col>
              </template>
              <template v-else>
                <span style="display:none;"><el-input v-model="ruleForm.org_name"></el-input></span>
                <el-tree
                  class="filter-tree"
                  :data="orgList"
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  lazy
                  :load="loadChildrenNode"
                  ref="tree"
                  @check-change="handleNodeChange"
                  check-strictly
                  show-checkbox
                  accordion
                  highlight-current
                  empty-text="没有对应的所在部门"
                  node-key="org_id">
                </el-tree>
              </template>
              <span class="el-upload__tip">账号创建后所在部门不可修改</span>
            </el-form-item>
            <el-form-item prop="mobile" label="手机号码">
              <el-col :span="14">
                <el-input v-model="ruleForm.mobile"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="weixin" label="微信号" v-if="is_yyb">
              <el-col :span="14">
                <el-input v-model="ruleForm.weixin"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="position" label="职位">
              <el-col :span="14">
                <el-select v-model="ruleForm.position">
                  <el-option label="请选择" :value="0"></el-option>
                  <el-option label="总裁" :value="1"></el-option>
                  <el-option label="副总裁" :value="2"></el-option>
                  <el-option label="总经理" :value="3"></el-option>
                  <el-option label="副总经理" :value="4"></el-option>
                  <el-option label="总监" :value="5"></el-option>
                  <el-option label="副总监" :value="6"></el-option>
                  <el-option label="经理" :value="7"></el-option>
                  <el-option label="副经理" :value="8"></el-option>
                  <el-option label="主管" :value="9"></el-option>
                  <el-option label="员工" :value="10"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="性别">
              <el-col :span="14">
                <el-select v-model="ruleForm.gender">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="0"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-col :span="14">
                <el-input v-model="ruleForm.email"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="QQ" prop="qq">
              <el-col :span="14">
                <el-input v-model="ruleForm.qq"></el-input>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="身份证" prop="id_card">
              <el-col :span="14">
                <el-input v-model="ruleForm.id_card"></el-input>
              </el-col>
            </el-form-item> -->
          </div>
        </div>
        <div class="mod-form">
          <div class="title">账户信息</div>
          <div class="form-content">
            <el-form-item label="用户名" prop="login_name">
              <el-col :span="14">
                <template v-if="$route.query.id">
                  <el-input v-model="ruleForm.login_name" :disabled="true"></el-input>
                </template>
                <template v-else>
                  <el-input v-model="ruleForm.login_name"></el-input>
                </template>
              </el-col>
              <span class="el-upload__tip">账号创建后用户名不可修改</span>
            </el-form-item>
            <el-form-item label="状态">
              <template>
                <el-radio v-model="ruleForm.status" :label="0" >启用</el-radio>
                <el-radio v-model="ruleForm.status" :label="1" >禁用</el-radio>
              </template>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="submit-buttons">
        <el-button type="primary" @click="submitForm('ruleForm')" size="large" :disabled="submitBtnDisable">保存</el-button>
        <el-button @click="$router.go(-1)" size="large">返回</el-button>
      </div>
    </div>
    <!--用户创建成功弹窗-->
    <el-dialog title="操作提示" :visible.sync="dialogoRoleVisible" size="tiny" :show-close=false :close-on-click-modal=false :close-on-press-escape=false>
      <span>用户创建成功！默认登录密码为：1qaw3</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="affirmRole" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/用户创建成功弹窗-->
  </div>
</template>

<script>
import {
  addStaff,
  staffGetOrg,
  // todoAddStaff,
  getSimpleNextOrginations
} from "src/api/api";
import {
  addSelfUser,
  // todoAddSelfUser,
  onWxContorl,
  offWxContorl,
  handleAddUser
} from "src/api/user";
export default {
  name: "UserGain",
  data() {
    return {
      // is_yyb: this.$route.query.is_yyb,
      selectOrgType: null,
      ruleForm: {
        user_name: "",
        login_name: "",
        mobile: "",
        position: 0,
        gender: 1,
        weixin: "",
        email: "",
        qq: "",
        id_card: "",
        org_id: "",
        org_name: "",
        status: 0
      },
      orgList: [],
      defaultProps: {
        children: "child",
        label: "org_name"
      },
      rules: {
        user_name: [
          {
            required: true,
            message: "请输入员工姓名",
            trigger: "blur"
          }
        ],
        org_name: [
          {
            required: true,
            message: "请选择所在部门",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        weixin: [
          {
            required: true,
            message: "请输入微信账号",
            trigger: "blur"
          }
        ],
        // email: [{
        //   required: true,
        //   message: '请输入邮箱地址',
        //   trigger: 'blur'
        // }],
        // id_card: [{
        //   required: true,
        //   message: '请输入身份证',
        //   trigger: 'blur'
        // }],
        login_name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ]
      },
      submitBtnDisable: false,
      dialogoRoleVisible: false,
    };
  },
  computed: {
    isSelf() {
      return this.$route.name == "accountSelfGain";
    },
    is_yyb(){ // 选择所在部门是否营业部
    
      if(!this.selectOrgType || this.selectOrgType != 5){
        return false;
      }
      return true;     
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    loadChildrenNode(node, resolve) {
      const data = node.data;

      // console.log('data: ', node.data, node.childNodes);
      if (!data || !data.org_id) {
        resolve([]);
        return;
      }
      if (!data.children) {
        // console.log('no children')
        getSimpleNextOrginations({
          params: { data: { org_id: data.org_id } },
          success: ({ data }) => {
            if (data.code == 0 && Array.isArray(data.data)) {
              let orgList = data.data.map(org => {
                return {
                  org_code: org.code,
                  org_id: org.id,
                  org_name: org.name,
                  org_type: org.org_type,
                  p_id: org.p_id
                };
              });
              resolve(orgList);
            } else {
              resolve([]);
            }
          }
        });
      } else {
        // console.log('resovle: ', node.data.children)
        resolve(node.data.children);
      }
    },
    goto(path, query) {
      this.$router.push({
        path: path,
        query: query
      });
    },
    getDetail() {
      const id = this.$route.query.id || 0;
      const func = this.isSelf ? addSelfUser : addStaff;
      let para = {
        data: {
          id: id
        }
      };

      func({
        params: para,
        success: res => {
          let data = res.data;
          this.loading = false;
          if (data.code == "0") {
            this.ruleForm.user_name = data.data.username;
            this.ruleForm.org_id = data.data.org_id;
            this.ruleForm.org_name = data.data.org_name;
            this.ruleForm.mobile = data.data.mobile;
            this.ruleForm.position = data.data.position;
            this.ruleForm.gender = data.data.gender;
            this.ruleForm.weixin = data.data.weixin;
            this.ruleForm.email = data.data.email;
            this.ruleForm.qq = data.data.qq;
            this.ruleForm.login_name = data.data.login_name;
            this.ruleForm.id_card = data.data.id_card;
            this.ruleForm.status = data.data.status;
            this.selectOrgType = data.data.org_type;
            this.getDetailOrg(res.data.data.org_id);
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getDetailOrg(val) {
      const params = { data: { org_id: val } };

      if (this.isSelf) {
        params.data.is_self = 1;
      }
      staffGetOrg({
        params,
        success: res => {
          if (res.data.code == 0) {
            const data = res.data.data;

            if (Array.isArray(data)) {
              // data.forEach(org => {
              //   org.child = [false]
              // })
              this.orgList = data;
            } else if (data) {
              // data.child = [false]
              this.orgList = [data];
            } else {
              this.orgList = [];
            }
            // if(data){
            //   this.orgList = this.orgList.concat(data);
            // }else{
            //   this.orgList = [];
            // }
          }
        }
      });
    },
    handleNodeChange(obj, bool) {
      let org_id_arr = [];
      org_id_arr.push(obj.org_id);

      if (bool) {
        this.$refs.tree.setCheckedKeys(org_id_arr);
        this.ruleForm.org_id = obj.org_id;
        this.ruleForm.orgCode = obj.org_code;
        this.ruleForm.org_name = obj.org_name;
        this.selectOrgType = obj.org_type;
      } else {
        if (obj.org_id == this.ruleForm.org_id) {
          this.ruleForm.org_id = "";
          this.ruleForm.orgCode = "";
          this.ruleForm.org_name = "";
          this.selectOrgType = null;
        }
      }
    },
    submitForm(formName) {
      const func = this.isSelf ? handleAddUser : handleAddUser;
      let _this = this;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitBtnDisable = true;
          //同步微信
          onWxContorl({
            method: "post",
            headers:{
              "content-type":"application/json;charset=UTF-8"
            },
            params:{ userid: this.$route.query.id }
          });
          func({
            params: {
              data: {
                id: this.$route.query.id ? this.$route.query.id : 0,
                username: this.ruleForm.user_name,
                login_name: this.ruleForm.login_name,
                mobile: this.ruleForm.mobile,
                position: this.ruleForm.position,
                gender: this.ruleForm.gender,
                weixin: this.ruleForm.weixin,
                email: this.ruleForm.email,
                qq: this.ruleForm.qq,
                org_id: this.ruleForm.org_id,
                org_name: this.ruleForm.org_name,
                status: this.ruleForm.status,
                id_card: this.ruleForm.id_card
              }
            },
            success: res => {
              if (res.data.code == 0) {
                if (this.$route.query.id) {
                  // 修改
                  this.$message.success(res.data.msg);
                  this.$router.push({ path: "list" });
                } else {
                  // 新增
                  _this.dialogoRoleVisible = true;
                }
              } else {

                this.$message.error(res.data.msg);
                this.submitBtnDisable = false;
              }
            },
            showLoading: true
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    affirmRole() {
      this.$router.push({ path: "list" });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getDetail();
    } else {
      this.getDetailOrg("");
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
.subtitle{
  padding-left: 14px;
  margin-bottom: 20px;
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
.system-content {
  background: #fff;
}
.el-upload__tip {
  margin-left: 10px;
}
.form-gain {
  width: 800px;
}
.filter-tree {
  display: inline-block;
  min-width: 377px;
  max-height: 300px;
  overflow: auto;
}
.form-gain .el-select {
  width: 100%;
}
</style>
