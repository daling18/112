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
/**
 * 多页面通用主页
 * 根据路由meta下的permission和paths配置进行多页面访问权限判断，并跳转
 * permission 和 paths保持一一对应
 * 例：
      label: '财务信息',
      menu: 'finaceInfo',
      permission: 'api/finance/get_payment_account_list,api/peeraccount',
      paths: '/finace/account/company,/finace/account/peer'
 */
export default{
  data(){
    return{
      hasData: true
    };
  },
  watch: {
    '$route.meta'(val){
      this.checkMeta(val || {});
    }
  },
  mounted(){
    const meta = this.$route.meta || {}
    this.checkMeta(meta);
    
  },
  methods: {
    checkMeta(meta){
      console.log(meta);
      if(!meta.permission || !meta.paths){
        this.hasData = false;
        return ;
      }

      const perms = meta.permission.split(',');
      const paths = meta.paths.split(',');

      this.hasData = perms.some((perm, idx) => {
        if(this.$menuPermission(perm)){
          // 使用replace, 避免不能后退到上一页  by qzhchen 20180914
          this.$router.replace({path: paths[idx], query: this.$router.query});
          return true;
        }
      });
    }
  }
};
</script>