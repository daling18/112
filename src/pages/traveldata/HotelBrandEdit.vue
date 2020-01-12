<template>
<!-- application\index\view\dev\src\components\self-support\HotelBrandEdit.vue -->
  <div class="wrapper">
    <div class="system-content">
      <el-form :model="form" label-width="120px" 
        style="width:600px;"
        class="mod-form">
        <div class="title">酒店品牌</div>
        <el-form-item label="酒店品牌名称">
          <el-input v-model="form.brand_name" placeholder="请输入酒店品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="一句话简介">
          <el-input v-model="form.one_word_intr" placeholder="一句话简介,最多30个字"></el-input>
        </el-form-item>
        <el-form-item label="品牌介绍">
          <el-input type="textarea" v-model="form.intr" placeholder="请输入品牌介绍"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-buttons">
        <el-button type="primary" @click="brandFormSubmit">保存</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getbrandDetail, setbrandEdit } from 'src/api/self_support.goodscate'

export default {
  data () {
    return {
      form:{
        brand_name:'',
        one_word_intr: '',
        intr : '',
        id : ''
      }
    }
  },
  methods:{
    // 获取品牌详情
    getBrandInfo() {
      if(this.$route.query.id){
        let para = {};
            para.data = {};
            para.data.id = this.$route.query.id;

        getbrandDetail({
          params: para,
          success: (params) => {
            let {code, msg, data} = params.data;

            if (code == '0') {
              this.$set(this, 'form', data);
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      }
    },
    // 提交品牌表单
    brandFormSubmit() {
      let para = {};
      para.data = this.form;

      setbrandEdit({
        params: para,
        success: (params) => {
          let {code, msg, data} = params.data;

          this.$message({
            type: !code ? 'success' :'error',
            message: msg
          })
          if(!code){
            this.$router.push({path:'/traveldata/hotel-brand/list'})
          }
        },
        showLoading: true
      });
    }
    
  },
  mounted(){
    this.getBrandInfo();
  }
}
</script>

<style lang="scss" scoped>
.system-content{
  background: #fff;
}
</style>
