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
    if(this.$menuPermission('api/tuan/sale_order_renkuan')){
      this.$router.push({path:'/sale/recognition/peer-order'});
    }else if(this.$menuPermission('api/zhike/receipts_list')){
      this.$router.push({path:'/sale/recognition/dire-proceeds'});
    }else{
      this.hasData = false;
    }
  }
};
</script>