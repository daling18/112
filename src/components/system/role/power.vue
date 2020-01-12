<template>
  <div class="wrapper" >
    <div class="system-tab">
      <ul class="tab-box">
        <li v-if="!readonly" @click="goto('/role/gain', {id:$route.query.id})">基本信息</li>
        <li class="on">功能权限</li>
      </ul>
    </div>
    <div class="system-content">
      <div class="mod-form">
        <div class="title">功能权限</div>
        <div class="form-content">
          <div class="el-tree el-tree--highlight-current">
            <infinite v-if="checkDate.length > 0" :checkList="checkDate"  :staticChecked="checked" :disabled="readonly"  @change="changeData"></infinite>
            <div class="not-nodes" v-else>暂无功能权限</div>
          </div>
          
          <!-- <div class="infinite">
            <div class="unit" v-for="data in checkDate">
              <el-checkbox v-model="checked" :label="data">{{data.name}}</el-checkbox>
              <template v-if="data.child.length>0">
                
              </template>
            </div>
          </div> -->
          <!-- <el-tree
            :data="checkDate"
            show-checkbox
            :default-expand-all="false"
            node-key="id"
            ref="tree"
            highlight-current
            :default-checked-keys="checked"
            :props="defaultProps"
            @check-change="handleNodeChange">
          </el-tree> -->
          <div v-if="!readonly" class="submit-buttons">
            <el-button type="primary" @click="editRolePowerHandler">保存</el-button>
            <el-button type="default" @click="$router.push('list')">返回列表</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { rolePowerlist , editRolePower} from 'src/api/api'
import Infinite from 'src/plugins/Infinite.vue';
export default {
  name: 'RolePower',
  components: {
    Infinite
  },
  data() {
    return {
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      form:{
        rId:'',
        isSuper:1
      },
      checkDate:[],
      checked:[]
    }
  },
  computed:{
    readonly () {
      return this.$route.query.type == 'view'
    }
  },
  methods: {
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    initFun(){
      if(!this.$route.query.id){
        this.$message.error('id不能为空');
        this.$router.go(-1);
      }else{
        this.form.rId=this.$route.query.id;
        this.rolePowerlistHandler();
      }
      
    },
    // 获取选中的节点列表
    getCheckedNodes(nodes){
      let checkedNodes = []

      if (Array.isArray(nodes)) {
        nodes.forEach(node => {
          if (node.flag == 0) {
            const newNode = {
              ...node,
              child: this.getCheckedNodes(node.child)
            }
            // newNode.show = newNode.child.length > 0
            checkedNodes.push(newNode)
          }
        })
      }
      return checkedNodes
    },
    rolePowerlistHandler(){
      let params = {
        data: this.form
      };

      rolePowerlist({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == 0) {
            if (this.readonly) {
              this.checkDate = this.getCheckedNodes(data.data);
            } else {
              this.checkDate=data.data;
              this.getCheck(this.checkDate);
            }
          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    getCheck(obj){
      for(let i=0;i<obj.length;i++){
        if(obj[i].flag==0){
          this.checked.push(obj[i]['id']);
        }
        obj[i].show=false;
        if(obj[i].child.length>0){
          this.getCheck(obj[i].child)
        }
      }  
    },
    editRolePowerHandler(){
      let params = {
        data: {
          rId:this.$route.query.id,
          powerIds:this.checked.join(',')
        }
      };

      editRolePower({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == 0) {
            this.$message.success(data.msg);
            // setTimeout(() => {
            //   this.rolePowerlistHandler();
            // }, 2000);
          } else {
            this.$message.error(data.msg);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }

          
        },
        showLoading: true
      });
    },
    handleNodeChange(obj,bool) {
      //  console.log(this.$refs.tree.getCheckedNodes())
    },
    changeData(data){
      // this.checked=data;
       console.log("最顶层")
    },
  },
  mounted() {
    this.initFun();
    //  console.log(this.checked)
  }
}
</script>

<style scoped lang="scss">
.infinite{
  overflow:hidden;
}
.infinite:after{
  content:'';
  display:block;
  clear:both;
}
.infinite .unit{
  padding:10px;
  margin-left:50px;
  float:left;
}
.not-nodes {
  text-align: center;
  padding: 10px;
}
</style>
