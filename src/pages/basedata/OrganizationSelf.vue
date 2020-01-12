// src\components\system\organization\Self.vue
<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link v-if="$menuPermission('basedata/org/our/list')" tag="li" to="our">本公司组织</router-link>
        <router-link v-if="$menuPermission('basedata/org/alllist/list')" tag="li" to="list">全部组织</router-link>
        <li class="on">所属组织信息</li>
      </ul>
    </div>
    <detail-panel class="detail-section" :detail-data="detailData" show-seal />
  </div>
</template>

<script>
import { selfDetail } from 'src/api/orgination'
import DetailPanel from './components/DetailPanel';
export default {
  components: {DetailPanel},
  data() {
    return {
      detailData: {}
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize(){
      selfDetail({
        params: {data: {}},
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
.detail-section{
  background: #fff;
  padding: 20px;
}
</style>
