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
      hasData: true
    };
  },
  computed:{
  },
  watch:{
  },
  methods:{
  },
  mounted(){
    if(this.$menuPermission('api/contract/get_contract_no_list/cx/2')){
      this.$router.push({path:'/contract/query/head-list'});
    }else if(this.$menuPermission('api/contract/get_contract_no_list/cx/1')){
      this.$router.push({path:'/contract/query/branch-list'});
    }else{
      this.hasData = false;
    }
  }
};
</script>