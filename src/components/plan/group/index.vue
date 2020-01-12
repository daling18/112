<template>
  <!-- wrapper -->
	<div class="wrapper">
    <div v-if="hasData">页面载入中</div>
    <div v-else>无数据</div>
  </div>
  <!-- /wrapper -->
</template>

<script>
export default{
  data(){
    return{
      hasData: true
    }
  },
  computed:{
  },
  watch:{
  },
  methods:{
  },
  mounted(){
    if(this.$menuPermission('api/product')){
      this.$router.push({path:'/trip'})
    }else if(this.$menuPermission('api/bpm/product')){
      this.$router.push({path:'/group'})
    }else{
      this.hasData = false;
    }
  }
}
</script>

<style scoped lang="scss">

</style>