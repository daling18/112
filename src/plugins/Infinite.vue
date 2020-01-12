<template>
  <div>
    <div v-for="(data,index) in checkList" :key="index" class="el-tree-node">
      <div class="el-tree-node__content" @click="ifShow(data)">
        <template v-if="data.child.length>0">
          <span class="el-icon-caret-right"></span>
        </template>
        <template v-else><span style="display:inline-block;width:24px;"></span></template>
        <span v-if="disabled">{{ data.name }}</span> 
        <el-checkbox v-model="checked" :label="data.id" @change="al(data)" v-else>{{ data.name }}</el-checkbox> 
      </div>
      <div :class="'el-tree-node__children '+(data.show?'show':'hidden')">
        <infinite :disabled="disabled" :checkList="data.child" :staticChecked="staticChecked" v-if="data.child.length>0"  @change="changeData"></infinite>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Infinite',
  props:{
    checkList: {
      type: Array,
      default: () => []
    },
    staticChecked: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked:[],
      show:false
    }
  },
  watch:{
    checked(a,b){
      this.checked=this.staticChecked;
    }
  },
  methods:{
    al(a){
      let flag=true;

      // 取消选择
      for(let i=0;i<this.staticChecked.length;i++){
        if(this.staticChecked[i]==a.id){
          this.staticChecked.splice(i,1);
          this.unChooseChild(a);
          flag=false;
        }
      }
      // 选择
      if(flag){
        // this.staticChecked.push(a.id);
        this.chooseChild(a);

        let pArr=a.code.split(',');
        //去掉空白项
        pArr.shift();
        pArr.pop();

        //筛掉重复的id
        for(let i=0;i<pArr.length;i++){
          let sign=true;

          for(let j=0;j<this.staticChecked.length;j++){
            if(pArr[i]==this.staticChecked[j]){
              sign=false;
              break;
            }
          }
          if(sign){
            this.staticChecked.push(parseInt(pArr[i]));
          }
        }
          
      }
      this.staticChecked.splice(0,0);
      this.increment(this.staticChecked)
    },
    ifShow(data){
      this.staticChecked.splice(0,0)
      data.show = !data.show;
      console.log(data);
    },
    chooseChild(a){
      let children=a.child,
          _this=this;

      for(let i=0;i<children.length;i++){
        this.staticChecked.push(children[i].id);

        if(children[i].child.length>0){
          _this.chooseChild(children[i])
        }
      }    
    },
    unChooseChild(a){
      let children=a.child,
          _this=this;

      for(let i=0;i<children.length;i++){
        for(let j=0;j<this.staticChecked.length;j++){
          if(children[i].id==this.staticChecked[j]){
            _this.staticChecked.splice(j,1);
            break;
          }
        }

        if(children[i].child.length>0){
          _this.unChooseChild(children[i])
        }
      }    
    },
    increment(data) {
      this.$emit('change',data);
    },
    changeData(data){
      // this.staticChecked=data;
      console.log("其他层")
    },
  },
  mounted(){
    this.checked=this.staticChecked;
    // console.log(this.checkList)
  }
}
</script>

<style lang="scss">
.infinite{
  overflow:hidden;
}
.infinite:after{
  content:'';
  display:block;
  clear:both;
}
.el-icon-caret-right {
  padding: 5px;
}
.infinite .unit{
  //padding:10px;
  //margin-left:50px;
  //float:left;
}
.el-tree-node__children{
  margin-left:16px;
}
.show{
  display:block;
}
.hidden{
  display:none;
}

</style>
