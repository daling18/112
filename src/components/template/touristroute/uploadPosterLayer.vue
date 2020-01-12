<template>
  <el-dialog :visible.sync="visible" title="上传海报" custom-class="upload-poster-layer" center @close="$emit('close')">
    <el-alert title="重新上传会覆盖原海报信息" type="warning" show-icon :closable="false"></el-alert>
    <div class="content" v-loading="loading">
      <template v-if="!image">未上传</template>
      <el-image v-else :src="image" fit=""></el-image>
    </div>
    <div slot="footer">
      <el-upload
        :data="params"
        action="/api/v1/lineservice/line/poster"
        :show-file-list="false"
        name="poster"
        :on-success="handleUploadSuccess"
      >
        <el-button size="small" @click.stop="visible = false">取消</el-button>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
  </el-dialog>
</template>
<script>
import { VueCropper } from "vue-cropper";
export default {
  name: "upload-poster-layer",
  components: {
    VueCropper
  },
  data() {
    return {
      visible: false,
      image: "",
      loading: false,
      params: {
        line_id: 13
      }
    };
  },
  methods: {
    handleUploadSuccess({ code, data, msg }, file) {
      this.$log.debug(data);
      if (code !== 0) {
        this.$message.error(msg);
        return;
      }
      this.image = data.img_url;
    },
    show(id, poster) {
      if (!id) {
        this.$message.error("请传入线路id");
        return;
      }
      this.visible = true;
      this.params.line_id = id;
      this.image = poster;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/css/variables.scss";
/deep/.upload-poster-layer {
  .el-dialog__header {
    border-bottom: 1px solid $borderColor;
  }
}
.content {
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>