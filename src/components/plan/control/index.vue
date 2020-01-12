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
export default {
  data() {
    return {
      hasData: true
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    if(this.$menuPermission('api/tuan/index')){
      this.$router.push({path:'/control/list-line'});
    }else if(this.$menuPermission('api/tuan/index2')){
      this.$router.push({path:'/control/list-line2'});
    }else{
      this.hasData = false;
    }
  }
};
</script>