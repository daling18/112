<template>
  <div class="wrapper" >
    <div class="system-content">
      <div class="mod-form">
        <div class="title">分配路线</div>
        <div class="form-content">
          <el-tree
            v-if="lineTree"
            show-checkbox
            node-key="id"
            :data="lineTree"
            :props="treeProps"
            :default-expanded-keys="expandedKeys"
            :default-checked-keys="checkedKeys"
            ref="tree"
          />
        </div>
        <div class="submit-buttons">
          <el-button type="primary" @click="handleSubmitForm">保存</el-button>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addLineAuth,
  doAddLineAuth,
  addSelfLineAuth,
  doAddSelfLineAuth
} from 'src/api/user';

export default {
  name: 'AssignLine',
  data() {
    return {
      lineTree: null,
      checkedKeys: [],
      expandedKeys: [],
      treeProps: {
        children: 'child',
        label: 'name'
      }
    };
  },
  computed:{
    isSelf () {
      return this.$route.name == 'accountSelfAssignLine'
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    generateTree(data){
      let expandedKeys = [], checkedKeys = [];

      if(Array.isArray(data)){
        data.forEach(first => {
          let isExpend1 = false;

          if(Array.isArray(first.child) && first.child.length > 0){
            first.child.forEach(second => {
              let isExpend2 = false;
              // 节点的id不是全局唯一，所以这边结合上级id重新生成唯一的id
              second.id = `${first.id}_${second.id}`;
              if(Array.isArray(second.child) && second.child.length > 0){
                second.child.forEach(node => {
                  node.id = `${second.id}_${node.id}`;
                  if(node.is_checked){
                    checkedKeys.push(node.id);
                    isExpend2 = true;
                  }
                });
              } else if (second.is_checked) {
                checkedKeys.push(second.id);
              }
              if (isExpend2) {
                expandedKeys.push(second.id);
                isExpend1 = true;
              }
            });
          } else if (first.is_checked) {
            checkedKeys.push(first.id);
          }
          if(isExpend1){
            expandedKeys.push(first.id);
          }
        });
      }
      this.expandedKeys = expandedKeys;
      this.checkedKeys = checkedKeys;
      this.lineTree = data;
    },
    getDetail() {
      const func = this.isSelf ? addSelfLineAuth : addLineAuth
      let para = {
        data: {
          id: this.$route.query.id || ''
        }
      };
      func({
        params: para,
        success: (res) => {
          let data = res.data;
          if (data.code == '0') {
            this.generateTree(data.data);
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    handleSubmitForm(){
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      const func = this.isSelf ? doAddSelfLineAuth : doAddLineAuth
      let lineAuth = [];

      checkedNodes.forEach(node => {
        if(!Array.isArray(node.child) || node.child.length == 0){
          lineAuth.push(node.id.split('_'));
        }
      });
      //  console.log('checked nodes: ', lineAuth);

      func({
        params: {
          data: {
            id: this.$route.query.id || '',
            line_auth: lineAuth
          }
        },
        success: (res) => {
          if(res.data.code == 0){
            this.$message.success(res.data.msg);
            this.$router.push({path: 'list'});
          }else{
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      });
    },
    handleBack(){
      this.$router.go(-1);
    }
  }
};
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
