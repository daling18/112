<template>
  <div class="app-main" id="appMain">
    <workerNotice></workerNotice>
    <router-view v-loading="loading" />
  </div>
</template>
<script>
import workerNotice from "./notice.vue";
import {mapState} from 'vuex';
import {
  LOADING_VISIBLE
} from 'src/configuration/mutation-types';
export default {
  name: "AppMain",
  components: { workerNotice },
  computed: {
    ...mapState({
      loading: LOADING_VISIBLE
    }),
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  padding: 10px 20px;
  min-height: calc(100vh - 51px);
}
</style>