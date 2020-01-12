<template>
  <div class="wrapper">
    <div class="system-content">
       <el-form :model="form" label-width="120px" class="project-form">
          <el-form-item label="商户号" >
            <el-input v-model="filtername" placeholder="请输入商户号" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="商户秘钥" >
            <el-input v-model="filtername" placeholder="请输入商户秘钥" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="商户证书" >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
          <el-button type="primary">确 定</el-button>
          </el-form-item>
        </el-form>
        
    </div>
  </div>
</template>

<script>
import { selfSaleProductList } from 'src/api/product';
import { saleBookTuanList } from 'src/api/tuan';

export default ({
  components: {
  },
  data() {
    return {
      filtername:'',
      imageUrl: '',
      form:{}
    }
  },
  computed: {
    
  },
  watch:{
    
  },
  mounted() {
    
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
      }
  }
});
</script>

<style  lang="scss">
.system-content{
  background: #fff;
  .project-form{
    width: 450px;
    padding: 20px 0 50px 0;
  }
  
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #b10c79;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
