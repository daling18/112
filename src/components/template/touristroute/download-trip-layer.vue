<template>
  <el-dialog title="下载行程单" custom-class="download-trip-layer" :visible.sync="visible" center @opened="tip=true" @close="tip = false">
    <div class="content">
      <el-tooltip content="微信扫一扫" placement="top" :value="tip">
        <el-image :src="qrCode" fit="cover" class="qrCode" :preview-src-list="[qrCode]"></el-image>
      </el-tooltip>
      <el-link :href="pdf" target="_blank" download type="primary"><i class="fa fa-file-pdf-o"></i></el-link>
      <el-link :href="word" target="_blank" download type="primary"><i class="fa fa-file-word-o"></i></el-link>
    </div>
  </el-dialog>
</template>
<script>
import { downloadTrip } from "src/api/touristroute";
export default {
  name: "downloadTripLayer",
  data() {
    return {
      visible: false,
      word: "",
      pdf: "",
      qrCode: "",
      tip: false,
    };
  },
  methods: {
    // async downloadTrip(type) {
    // let { data, code, msg } = await downloadTrip({ type, id: this.line_id });
    // if (code !== 0) {
    //   this.$message.error(msg);
    //   return;
    // }
    // switch (type) {
    //   case 3:
    //     this.codeUrl = data.filePath;
    //     break;
    //   default:
    //     window.lo;
    // }
    // },
    // handleOpen() {
    //   this.downloadTrip(3); // 获取二维码图片
    // },
    show({ word, pdf, qrCode }) {
      this.visible = true;
      this.word = word;
      this.pdf = pdf;
      this.qrCode = qrCode;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/css/variables";
.download-trip-layer {
  .qrCode {
    width: 150px;
    height: 150px;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.el-image, .el-link{
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  border: 1px solid $themeColor;
  border-radius: 4px  3px  3px  4px ;
}
.el-link{
  font-size: 60px;
  &:hover::after{
    display: none;
  }
}
</style>