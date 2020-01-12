<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link v-if="$menuPermission('api/orgination/org_list')" tag="li" to="/organization/list">组织机构</router-link>
        <li class="on">所属组织信息</li>
      </ul>
    </div>
    <detail-panel class="detail-section" :detail-data="detailData" show-seal />
  </div>
</template>

<script>
import { selfDetail } from 'src/api/orgination'
import DetailPanel from './DetailPanel.comp';
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
