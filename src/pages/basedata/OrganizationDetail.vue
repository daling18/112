// src\components\system\organization\detail.vue
<template>
  <div class="wrapper">
    <div class="cont">
      <detail-panel :detail-data="detailData" />
    </div>
  </div>
</template>

<script>
import { orgGetOrgDetail } from 'src/api/orgination'
import DetailPanel from './components/DetailPanel';
export default {
  name: 'OrginationDetail',
  components: {DetailPanel},
  data() {
    return {
      id: this.$route.query.id,
      detailData: {}
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize(){
      orgGetOrgDetail({
        params: {data: {id: this.id}},
        success:(res) => {
          let { code, data, msg } = res['data'];
          if(code == 0){
            this.detailData = data;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      })
    }
  }
}
</script>

<style scoped lang="scss">
.cont{
    background: #fff;
    padding: 20px;
    min-height: 500px;
}
</style>
