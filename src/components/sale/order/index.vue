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
    if(this.$menuPermission('api/tuan/sale_tonghang_order_list')){
      this.$router.push({path:'/sale/order/teamth'})
    }else if(this.$menuPermission('api/tuan/sale_zhike_order_list')){
      this.$router.push({path:'/sale/order/teamzk'})
    }else{
      this.hasData = false;
    }
  }
}
</script>
