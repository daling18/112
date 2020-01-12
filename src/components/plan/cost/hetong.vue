<template>
  <div class="wrapper">
    <div class="system-content">
      <div class="table-title no-border">
        <div class="title">
          <span class="color-orange">【{{ info.tuan_info.tuan_no }}】</span>
        {{ info.tuan_info.tuan_name }}</div>
        <table class="desc">
          <tr>
            <th>出发城市</th>
            <td>{{ info.tuan_info.departure_city }}</td>
            <th>出发日期</th>
            <td>{{ info.tuan_info.departure_date }}</td>
            <th>返回日期</th>
            <td>{{ info.tuan_info.back_date }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="system-content">
      <div class="module-box">
        <div class="module-title">
          <h5>合同</h5>
        </div>
        <div class="hetong-wrap" v-if="info.contract_no.length === 0">
          未绑定合同编号
          <span class="hetong-btn"
                @click="dialogVisible2 = true"
                v-if="$menuPermission('api/contract/bind_order') && edit != 2 && edit != 3">
            绑定合同编号
          </span>
        </div>
        <div class="hetong-wrap" v-else>
          {{ info.contract_no }}
          <span class="hetong-btn"
                @click="dialogVisible3 = true"
                v-if="$menuPermission('api/contract/unbind_order') && edit != 2 && edit != 3">
            <template v-if="info.is_unbind != 0">
              解绑合同
            </template>
          </span>
        </div>
        <div class="module-content">
          <div class="" style="margin-top:20px;" v-if="edit != 0 && edit != 3">
            <el-upload
              :action="uploadOrderContractUrl"
              name="file"
              :data="{tuan_id: tuan_id, order_no: order_no}"
              :on-success="uploadsuccess"
              :before-upload="changeUpload"
              :disabled="!canUpload"
              :show-file-list="false">
              <el-button v-if="$menuPermission(uploadOrderContractPerm)" type="primary">上传合同</el-button>
            </el-upload>
          </div>
          <ul class="comfirm-list">
            <li v-for="(item,idx) in info.contract_list" :key="idx">
              <a :href="item.path" target="_blank" class="avatar">
                <img v-if="item.path" :src="item.path" width="100%" height="100%">
              </a>
              <div class="btns" v-if="edit != 0 && edit != 3">
                <el-button v-if="$menuPermission(delOrderContractPerm) && item.is_edit == 1 && info.contract_list.length >= 2 && showDel > 1" type="text" @click="delhetong(item.id)">删除</el-button>
                <el-upload
                  style="display: inline-block"
                  :action="changeOrderContractUrl"
                  name="file"
                  :data="{tuan_id: tuan_id, order_no: order_no, id: item.id}"
                  :on-success="uploadsuccess"
                  :before-upload="changeUpload"
                  :disabled="!canUpload"
                  :show-file-list="false">
                  <el-button v-if="$menuPermission(changeOrderContractPerm) && item.is_edit == 1" type="text">修改</el-button>
                </el-upload>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--工具条-->
      <!--合同删除提示-->
      <el-dialog title="删除合同" :visible.sync="dialogVisible" size="tiny">
        <span>是否确认删除合同？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delOrderContract">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="解绑合同" :visible.sync="dialogVisible3" size="tiny">
        <span>是否确认解绑合同？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="contractUnbindOrderSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 绑定合同 -->
      <el-dialog title="绑定合同" :visible.sync="dialogVisible2" @close="closeBindHetong">
        <el-form label-width="100px">
          <el-form-item label="合同编号">
            <el-input class="width2" v-model="contract_no" placeholder="请输入要绑定的合同编号"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeBindHetong">取 消</el-button>
          <el-button type="primary" @click="contractBindOrderSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

import {
  getOrderContractList, 
  delOrderContract, 
  contractBindOrderSubmit, 
  contractUnbindOrderSubmit
} from 'src/api/api';
import {
  saleGetOrderContractList, 
  saleDelOrderContract
} from 'src/api/api_store';

export default {
  data() {
    return {
      order_no: this.$route.query.order_no, // "201803261642394839"
      tuan_id: this.$route.query.tuan_id, // 1901
      edit: this.$route.query.edit, //0 绑定合同（是），上传合同（否）;1 绑定合同（是），上传合同（是）；2绑定合同（否），上传合同（是）；3绑定合同（否），上传合同（否）
      canUpload: true,
      // 删除弹窗
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      del_id: 0,
      contract_no: '',
      comfirmData:{},
      info: {
        tuan_info: {
          tuan_no: '',
          tuan_name: '',
          departure_city: '',
          departure_date: '',
          back_date: ''
        },
        contract_no: ''
      }
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    uploadOrderContractPerm() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return 'api_store/sale/upload_order_contract';
      default:
        return 'api/tuan/upload_order_contract';
      }
    },
    changeOrderContractPerm() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return 'api_store/sale/change_order_contract';
      default:
        return 'api/tuan/change_order_contract';
      }
    },
    delOrderContractPerm() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return 'api_store/sale/del_order_contract';
      default:
        return 'api/tuan/del_order_contract';
      }
    },
    uploadOrderContractUrl() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return '/bom/api_store/sale/upload_order_contract';
      default:
        return '/bom/api/tuan/upload_order_contract';
      }
    },
    changeOrderContractUrl() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return '/bom/api_store/sale/change_order_contract';
      default:
        return '/bom/api/tuan/change_order_contract';
      }
    },
    getOrderContractListFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleGetOrderContractList;
      default:
        return getOrderContractList;
      }
    },
    delOrderContractFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleDelOrderContract;
      default:
        return delOrderContract;
      }
    },
    showDel() {
      let len = this.info.contract_list;
      let arr = [];
      if(len) {
        len.forEach((item) => {
          if(item.is_edit == 1) {
            arr.push(1);
          }
        });
      }
      return arr.length;
    }
  },
  methods: {
    getOrderContractList() {
      let params = {
        data: {
          order_no: this.order_no,
          tuan_id: this.tuan_id
        }
      };
      this.getOrderContractListFunc({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.info = result.data;
             console.log(this.info);
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          }
        },
        showLoading: true
      });
    },
    delhetong(id) {
      this.dialogVisible = true;
      this.del_id = id;
    },
    delOrderContract() {
      this.dialogVisible = false;
      let params = {
        data: {
          id: this.del_id,
          tuan_id: this.tuan_id,
          order_no: this.order_no
        }
      };
      this.delOrderContractFunc({
        params,
        success: (res) => {
          let result = res.data;
          this.getOrderContractList();
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          }
        },
        showLoading: true
      });
    },
    changeUpload() {
      this.canUpload = false;
      if (this.info.contract_list && this.info.contract_list.length >= 10) {
        this.$message({
          type: 'error',
          message: '合同图片最多上传10张'
        });
        return false;
      };
    },
    uploadsuccess(response) {
      this.canUpload = true;
      if(response.code === 0) {
        this.$message({
          type: 'success',
          message: response.msg
        });
        this.getOrderContractList();
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        });
      }
    },
    contractBindOrderSubmit() {
      let params = {
        data: {
          order_no_list: [
            this.order_no,
          ],
          need_contract: '1',
          contract_no: this.contract_no
        }
      };
      contractBindOrderSubmit({
        params,
        success: (res) => {
          this.contract_no = '';
          let result = res.data;
          this.dialogVisible2 = false;
          if(result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.getOrderContractList();
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          }
        },
        showLoading: true
      });
    },
    closeBindHetong() {
      this.contract_no = '';
      this.dialogVisible2 = false;
    },
    contractUnbindOrderSubmit() {
      let params = {
        data: {
          contract_no: this.info.contract_no,
          order_no: this.order_no
        }
      };
      contractUnbindOrderSubmit({
        params,
        success: (res) => {
          let result = res.data;
          this.dialogVisible3 = false;
          if(result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.getOrderContractList();
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          }
        }
      });
    }
  },
  mounted() {
    this.getOrderContractList();
  }
};
</script>

<style lang="less" scoped>
.hetong-wrap {
  padding: 20px 15px;
  .hetong-btn {
    padding: 0 0 0 10px;
    color: #b10c79;
    cursor: pointer;
  }
}
.module-box{
  background: #fff;
  padding-top:20px;
  .module-title{
    padding:0 15px;
    h5{
      padding-left: 5px;
      font-size: 18px;
      color: #b10c79;
      border-left: 5px solid #c10c79;
      line-height: 18px;
    }
  }
  .module-content{
    padding:0 15px;
  }
  .system-search{
    padding-bottom: 0;
  }
}

.el-button{
  a{
    color: #20a0ff;
  }
}
.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
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
  overflow: hidden;
}

.comfirm-list{
  padding-bottom: 50px;
  &::after {
      content: '';
      display: block;
      clear: both;
  }

  li{
    list-style-type:none;
    margin:20px 15px 0 0;
    width: 180px;
    height: 220px;
    float: left;
    .avatar-uploader .el-upload{
      overflow: inherit;
    }
    .el-upload__input{
      // display: block;
      // opacity: 0;
      // filter:alpha(opacity=0);
      // position: absolute;
      // left: 38px;
      // bottom: -30px;
      // width: 45px;
    }
  }
  .btns{
    padding-right: 10px;
    text-align:center;
    color: #ccc;
  }
}
.avatar-uploader{
  height: 178px;
  // border:2px solid #ccc;
  .el-upload{
    border: 0;
    &:hover{
      border:0;
    }
    img{
      display: block;
      width: 176px;
    }
  }
}
.system-content .table-title{
  padding-bottom: 0;
}
</style>
