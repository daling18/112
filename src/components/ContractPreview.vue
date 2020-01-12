<template>
  <div>
    <el-dialog title="预览合同" visible fullscreen :show-close="false">
      <preview-contract :id="id" :requestType="requestType" :type="type"></preview-contract>
    </el-dialog>
  </div>
</template>

<script>
import PreviewContract from "./components/Preview.vue";

export default {
  name: "",
  data() {
    return {
      id: this.$route.query.order_id,
      type: this.$route.query.type,
      requestType: this.$route.query.requesttype || 1
    };
  },
  components: {
    PreviewContract
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
