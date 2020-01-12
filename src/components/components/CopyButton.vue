
<template>
  <span class="copyBtn" @click="copyToken">{{ lable || '复制' }}</span>
</template>

<script>

export default {
  name: 'CopyButton',
  props: {
    value: "",
    lable: ""
  },
  data() {
    return {

    }
  },
  methods: {
      copyToken () {
        let url = this.value;
        let oInput = document.createElement('input')
            oInput.value = url
            document.body.appendChild(oInput)
            oInput.select() // 选择对象
            // console.log(oInput.value)
            document.execCommand('Copy') // 执行浏览器复制命令
            this.$message({
                message: '已成功复制到剪切板',
                type: 'success'
            })
            oInput.remove()
        }
  }
};
</script>
<style lang="less">
  .copyBtn {
    display: inline!important;
    color: #aa0371;
  }
</style>