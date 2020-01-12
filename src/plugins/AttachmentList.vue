<template>
  <div class="attach-list">
    <div class="attach-item" v-for="(attach, idx) in attachments" :key="idx">
      <a
        class="attach-img"
        v-if="attach.type=='image'"
        :href="attach.path"
        target="_blank"
        :style="'background-image: url(' + attach.path + ')'"
      >
        <i class="attach-preview el-icon-view" />
      </a>
      <a
        :class="'attach-file ' + (ATTACHTYPE_COLOR[attach.type] || '')"
        v-else
        :href="attach.path"
        download
      >{{ attach.type }}</a>
      <a class="ellipsis" :href="attach.path" download>{{ attach.name }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttachmentList',
  props:{
    list: {
      type: Array,
      default: () => []
    },
    pathKey: {
      type: String,
      default: 'path'
    },
    nameKey: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      ATTACHTYPE_COLOR: {'Word': 'color-blue', 'Excel': 'color-green', 'Pdf': 'color-red'},
    }
  },
  computed: {
    attachments() {
      let attachs = [];

      if (Array.isArray(this.list)) {
        this.list.forEach(attach => {
          let type = 'File'
          const name = attach[this.nameKey]
          const path = attach[this.pathKey]

          if (/\.(png|jpg|jpeg|gif)$/i.test(name)) {
            type = 'image';
          }
          if (/\.(doc|docx)$/i.test(name)) {
            type = 'Word';
          }
          if (/\.(xls|xlsx)$/i.test(name)) {
            type = 'Excel';
          }
          if (/\.(pdf)$/i.test(name)) {
            type = 'Pdf';
          }
          attachs.push({ name, type, path })
        })
      }
      return attachs
    }
  }
}
</script>

<style lang="less">
.attach-list {
  .color-blue {
    color: #7471f9;
  }
  .attach-item {
    display: inline-block;
    margin-right: 10px;
    font-size: 0;
    width: 100px;
    text-align: center;
  }
  .attach-img {
    height: 100px;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  }
  .attach-preview {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 25px;
    height: 25px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    line-height: 25px;
  }
  .attach-file {
    display: block;
    font-size: 24px;
    line-height: 100px;
    background: #f4f4f4;
  }
  .ellipsis {
    font-size: 14px;
    text-align: center;
  }
}

</style>
