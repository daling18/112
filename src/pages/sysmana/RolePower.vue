// src\components\system\role\power.vue
<template>
  <div class="wrapper" >
    <div class="system-tab">
      <ul class="tab-box">
        <li v-if="!readonly" @click="goto('gain', {id:$route.query.id})">基本信息</li>
        <li class="on">功能权限</li>
      </ul>
    </div>
    <div class="system-content">
      <div class="mod-form">
        <div class="title">功能权限</div>
        <div class="form-content">
          <div class="el-tree el-tree--highlight-current">
            <infinite
              v-if="checkDate.length > 0"
              :check-list="checkDate"
              :static-checked="checked"
              :disabled="readonly"
              @change="changeData"
            />
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
            empty-text="暂无功能权限"
            :show-checkbox="!readonly"
            :default-expand-all="false"
            node-key="id"
            ref="tree"
            highlight-current
            :default-checked-keys="checked"
            :props="defaultProps"
            @check-change="handleNodeChange"
          /> -->
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
      checked:[],
      checkedMap: {}
    }
  },
  computed:{
    readonly () {
      return this.$route.name == 'RoleViewPower'
    }
  },
  methods: {
    goto(path,query){
      this.$router.push({
        path:path,
        query:query
      });
    },
    // updateChecked(data) {
    //   if (Array.isArray(data)) {
    //     data.forEach(node => {
    //       this.checkedMap[node.id] = node.flag == 0
    //       if (this.checkedMap[node.id] && Array.isArray(node.child) && node.child.length == 0) {
    //         // 非子节点不添加到勾选列表，否则会出现整个节点下的子节点都被勾选
    //         this.checked.push(node.id);
    //       }
    //       this.updateChecked(node.child)
    //     })
    //   }
    // },
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
              // this.updateChecked(data.data)
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
    handleNodeChange(obj, bool, immediate) {
      // 因为getCheckedNodes不会获取immediate的节点，所以通过这个方法保存immediate的节点id
      this.checkedMap[obj.id] = bool || immediate
      // console.log('params: ', obj, bool, immediate)
      // console.log(this.$refs.tree.getCheckedNodes())
    },
    editRolePowerHandler(){
      let params = {
        data: {
          rId:this.$route.query.id,
          powerIds: this.checked.join(',')
        }
      };
      // let params = {
      //   data: {
      //     rId:this.$route.query.id,
      //     // powerIds:this.checked.join(',')
      //     powerIds: Object.keys(this.checkedMap).filter(key => this.checkedMap[key]).join(',')
      //   }
      // };

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
    changeData(data){
      // this.checked=data;
      console.log("最顶层")
    },
  },
  mounted() {
    this.initFun();
    // console.log(this.checked)
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
