// src\components\system\organization\DetailPanel.comp.vue
<template>
  <div class="recieve-info">
    <h2 class="recieve-tit">组织信息</h2>
    <div class="receive-content">
      <div class="content-box">
        <span class="content-label">组织类型：</span>
        <span class="content-right">{{ detailData.org_type_name }}</span>
      </div>
      <div class="content-box" v-if="detailData.org_type!=1">
        <span class="content-label">上级组织：</span>
        <span class="content-right">{{ detailData.p_org_name }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">组织名称：</span>
        <span class="content-right">{{ detailData.name }}</span>
      </div>
      <div class="content-box" v-if="detailData.org_type != 4 && detailData.org_type != 5">
        <span class="content-label">统一社会信用代码：</span>
        <span class="content-right">{{ detailData.taxpayer_num || '--' }}</span>
      </div>
      <div class="content-box" v-if="detailData.org_type != 4">
        <span class="content-label">所在城市：</span>
        <span class="content-right">{{ detailData | getCityInfo }}</span>
      </div>
      <div class="content-box" v-if="detailData.org_type != 4">
        <span class="content-label">所在经纬度：</span>
        <span class="content-right" v-if="!Number(detailData.longitude) && !Number(detailData.latitude)">--</span>
        <span class="content-right" v-else>经度 {{ detailData.longitude }} &nbsp;&nbsp; 纬度 {{ detailData.latitude }}</span>
      </div>
      <div class="content-box" v-if="detailData.org_type == 5">
        <span class="content-label">营业时间：</span>
        <span class="content-right">{{ detailData.business_hours }}</span>
      </div>
      <div class="content-box" v-if="detailData.org_type == 5">
        <span class="content-label">电话：</span>
        <span class="content-right">{{ detailData.mobile }}</span>
      </div>
      <div class="content-box">
        <span class="content-label">状态：</span>
        <span class="content-right">{{ detailData.disabled_name }}</span>
      </div>
      <div class="content-box" v-if="detailData.org_type != 4 && detailData.org_type != 5">
        <span class="content-label">业务章：</span>
        <span :class="detailData.seal_path || showSeal ? 'content-rightimg' : 'content-right'">
          <div class="pic-wrap" v-if="detailData.seal_path">
            <div class="pic-top" :style="'background-image:url(' + detailData.seal_path + ')'">
              <a :href="detailData.seal_path" class="big-btn" target="_blank"/>
            </div>
            <div class="pic-bottom" v-if="showSeal">
              <a href="javascript:;" @click="handleDeleteSeal">删除</a>
            </div>
          </div>
          <template v-else-if="!showSeal">--</template>
          <el-upload
            v-if="showSeal"
            class="seal-uploader"
            action="/bom/api/orgination/upload_seal"
            :data="uploadSealData"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="handleBeforeUpload">
            <el-button type="primary">上传业务章</el-button>
            <div slot="tip" class="color-gray">图片要求：png文件格式，透明背景，不能超过300*300px</div>
          </el-upload>
        </span>
      </div>
      <div class="content-box">
        <span class="content-label">组织ID：</span>
        <span class="content-right">{{ detailData.xn_mer_id }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { delSeal } from 'src/api/orgination'
export default {
  name: 'DetailPanel',
  filters: {
    getCityInfo (info) {
      let arr = [];
      const fields = ['nation', 'province', 'city', 'country']

      if (!info) {
        return '--';
      }
      fields.forEach(name => {
        if (info[name]) {
          arr.push(info[name])
        }
      })

      return arr.join('-') || '--'
    }
  },
  props: {
    detailData: {
      type: Object,
      default: () => ({})
    },
    // 是否显示业务章字段
    showSeal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    uploadSealData() {
      return {
        org_id: this.detailData.id,
        is_add: 1
      }
    }
  },
  methods: {
    handleUploadSuccess(res, file){
      //  console.log('success', res, file);
      if(res.code == 0){
        this.detailData.seal_path = file.url;
        this.$emit('upload', res);
      }else{
        this.$message.error('上传失败：' + res.msg);
      }
    },
    handleBeforeUpload(file){
      const isPNG = file.type === 'image/png';

      //  console.log('success', file);
      if (!isPNG) {
        this.$message.error('业务章只能是 png 格式!');
      }
      return isPNG;
    },
    handleDeleteSeal(file, fileList){
      //  console.log('remove file:', file, fileList);
      delSeal({
        params: {data: {}},
        success:(res) => {
          let { code, data, msg } = res['data'];
          if(code == 0){
            //  console.log('del seal: ', data);
            this.detailData.seal_path = '';
            this.$emit('delete', res);
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
.recieve-info .receive-content .content-box{
  margin-bottom: 20px;
}
.seal-uploader{
  font-size: 14px;
  display: inline-block;
  padding-left: 15px;
}
</style>
