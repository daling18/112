<template>
  <div class="wrapper" >
    <div class="system-tab" v-if="!isView">
      <ul class="tab-box">
        <li class="on">功能权限</li>
      </ul>
    </div>
    <div class="system-content">
      <div class="mod-form">
        <div class="title">{{ isView ? '权限列表' : '功能权限' }}</div>
        <div class="color-red" v-if="!isView">注：自定义添加删减功能权限，则默认为使用自定义角色，有变更时该账号需要手动更新</div>
        <div class="form-content">
          <div class="el-tree el-tree--highlight-current">
            <infinite
              v-if="checkDate.length > 0"
              :check-list="checkDate"
              :static-checked="checked"
              :disabled="isView"
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
            :show-checkbox="!isView"
            :default-expand-all="false"
            node-key="id"
            ref="tree"
            highlight-current
            :default-checked-keys="checked"
            :props="defaultProps"
            @check-change="handleNodeChange"
          /> -->
          <div class="submit-buttons">
            <el-button v-if="!isView" type="primary" @click="handleSave">保存</el-button>
            <el-button type="default" @click="$router.back()">返回列表</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOperationRule, editUserOperationRule, getUserRuleList,
  getSelfOperationRule, editSelfUserOperationRule, getSelfUserRuleList
} from 'src/api/auth_operation'
import Infinite from 'src/plugins/Infinite.vue';
export default {
  name: 'AccountPower',
  components: {
    Infinite
  },
  data() {
    return {
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      user_id: this.$route.query.id,
      checkDate: [],
      checked: [],
      checkedMap: {}
    }
  },
  computed:{
    isView () {
      return this.$route.name.indexOf('ViewPower') > 0
    },
    isSelf () {
      return this.$route.name.indexOf('accountSelf') == 0
    },
    getUserRuleListFunc () {
      if (!this.isSelf) {
        return getUserRuleList
      } else {
        return getSelfUserRuleList
      }
    },
    getOperationRuleFunc () {
      if (!this.isSelf) {
        return getOperationRule
      } else {
        return getSelfOperationRule
      }
    },
    editUserOperationRuleFunc () {
      if (!this.isSelf) {
        return editUserOperationRule
      } else {
        return editSelfUserOperationRule
      }
    }
  },
  mounted() {
    this.initFun();
    // console.log(this.checked)
  },
  methods: {
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
        this.$message.error('参数错误');
        this.$router.go(-1);
      }else{
        // this.form.user_id = this.$route.query.id;
        const func = this.isView ? this.getUserRuleListFunc : this.getOperationRuleFunc;
        func({
          params: { data: { user_id: this.user_id } },
          success: (params) => {
            let data = params.data;

            if (data.code == 0) {
              // this.updateChecked(data.data)
              this.checkDate = data.data || [];
              if (this.isView) {
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
      }
    },
    handleNodeChange(obj, bool, immediate) {
      // 因为getCheckedNodes不会获取immediate的节点，所以通过这个方法保存immediate的节点id
      this.checkedMap[obj.id] = bool || immediate
      // console.log('params: ', obj, bool, immediate)
      // console.log(this.$refs.tree.getCheckedNodes())
    },
    handleSave(){
      this.$confirm('使用自定义角色的账号，再更新需手动更新。确定使用自定义角色？', '操作提示', {
        type: 'warning'
      }).then(() => {
        this.editUserOperationRuleFunc({
          params: {data: {
            user_id: this.user_id,
            powerIds: this.checked.join(',')
            // powerIds: Object.keys(this.checkedMap).filter(key => this.checkedMap[key]).join(',')
          }},
          success: (params) => {
            let data = params.data;

            if (data.code == 0) {
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }

          },
          showLoading: true
        });
      }).catch( e => {})
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
    changeData(data){
      // this.checked=data;
      console.log("最顶层")
    },
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
