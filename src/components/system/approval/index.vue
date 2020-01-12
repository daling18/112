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
    if(this.$menuPermission('api/approval/my_start_approval_list')){
      this.$router.push({path:'/system/approval/list-submit'});
    }else if(this.$menuPermission('api/approval/my_wait_approval_list')){
      this.$router.push({path:'/system/approval/list-check'});
    }else{
      this.hasData = false;
    }
  }
};
</script>