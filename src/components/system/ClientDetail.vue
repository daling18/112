<template>
  <div class="wrapper" >
    <div class="system-content">
      <div class="mod-form">
        <div class="title">客户信息</div>
        <el-form
          :model="detail"
          label-width="120px"
          ref="dataForm"
          style="word-break: break-all"
        >
          <el-form-item label="单位名称：">
            {{ detail.settlement_org_name }}
          </el-form-item>
          <el-form-item label="类型：" prop="client_type">
            {{ detail.client_type_name }}
          </el-form-item>
          <el-form-item label="联系人姓名：" prop="name">
            {{ detail.name || '--' }}
          </el-form-item>
          <el-form-item label="联系人身份证：" prop="id_card">
            {{ detail.id_card || '--' }}
          </el-form-item>
          <el-form-item label="联系人电话：" prop="mobile">
            {{ detail.mobile || '--' }}
          </el-form-item>
          <el-form-item label="联系人QQ：" prop="qq">
            {{ detail.qq || '--' }}
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            {{ detail.email || '--' }}
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            {{ detail.remark || '--' }}
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { clientInfo } from 'src/api/client';
export default {
  name: 'ClientDetail',
  data() {
    return {
      detail: {
      }
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let para = {
        data: {
          id: this.$route.query.id || ''
        }
      };
      clientInfo({
        params: para,
        success: (res) => {
          let data = res.data;
          if (data.code == '0') {
            this.detail = data.data;
          } else {
            this.$message.error(data.msg);
            this.$router.go(-1);
          }
        },
        showLoading: true
      });
    }
  }
};
</script>

<style scoped lang="scss">
.system-header {
  margin-bottom: 10px; 
  padding: 15px;
  background: #fff;
}

.list {
  .table-title {
    height: 36px;
    margin: 16px 0 10px 0;

    .total {
      display: inline-block;
      line-height: 36px;
      font-size: 14px;
      .total-receive {
        font-size: 16px;
        color: #00CC00;
      }
      .total-pay {
        font-size: 16px;
        color: #FF9900;
        margin-right: 20px;
      }
    }

    .btn-areas {
      float: right;
    }
  }
}

.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
.system-content{
  background: #fff;
}
.el-upload__tip{
  margin-left: 10px;
}
.form-gain{
  width: 800px;
}
.filter-tree{
  display: inline-block;
  min-width: 377px;
}
.form-gain .el-select{
  width: 100%;
}
</style>
