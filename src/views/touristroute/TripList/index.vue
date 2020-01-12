<template>
  <div>
    <el-menu mode="horizontal" router :default-active="activeNav" class="touristroute-nav">
      <el-menu-item
        v-for="nav in navOptions"
        :key="nav.path"
        :index="nav.path"
        class="nav-item"
      >{{nav.label}}</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: "List",
  data() {
    return {
      navs: [
        {
          label: "自营产品",
          path: "/touristroute/trip/list/self"
        },
        {
          label: "供应商行程",
          path: "/touristroute/trip/list/supplier"
        },
        {
          label: "辖区内产品",
          path: "/touristroute/trip/list/jurisdiction"
        },
        {
          label: "其他辖区产品",
          path: "/touristroute/trip/list/other"
        }
      ]
    };
  },
  computed: {
    navOptions() {
      return this.navs.filter(nav => {
        return this.$menuPermission(nav.path);
      });
    },
    activeNav() {
      return this.$route.path;
    }
  },
  mounted() {
  },
  created() {}
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
.tabs {
  margin-bottom: 0;
  // border: 1px solid $borderColor;
}
.touristroute-nav {
  // margin-bottom: 10px;
  .nav-item{
    height: auto;
    line-height: 20px;
    padding: 10px 40px;
  }
}
</style>