<template>

  <!-- wrapper -->
  <div class="wrapper">
    <div v-if="hasData">页面载入中</div>
    <div v-else>
      <div class="none">
        亲，您暂时没有权限哦~
      </div>
    </div>
  </div>
  <!-- /wrapper -->
</template>

<script>
export default{
  data(){
    return{
      role: null,
      menu: '',
      menuPre: '',
      type: '',
      typePre: '',
      hasData: true
    };
  },
  computed:{
  },
  watch:{
  },
  methods:{
  },
  created(){
    if(this.$route.name == 'contractPulldown'){
      this.role = 'pulldown';
      this.menu = 1;
      this.menuPre = 'pulldown';
    }else{
      this.role = 'audit';
      this.menu = 2;
      this.menuPre = 'audit';
    }
  },
  mounted(){
    if(this.role == 'pulldown'){
      if(this.$menuPermission('api/contract/apply_list/2/1')){
        this.$router.push({path:'/contract/'+this.menuPre+'/head-list'});
      }else if(this.$menuPermission('api/contract/apply_list/1/1')){
        this.$router.push({path:'/contract/'+this.menuPre+'/branch-list'});
      }else{
        this.hasData = false;
      }
    }else if(this.role == 'audit'){
      if(this.$menuPermission('api/contract/apply_list/2/2')){
        this.$router.push({path:'/contract/'+this.menuPre+'/head-list'});
      }else if(this.$menuPermission('api/contract/apply_list/1/2')){
        this.$router.push({path:'/contract/'+this.menuPre+'/branch-list'});
      }else{
        this.hasData = false;
      }
    }
  }
};
</script>