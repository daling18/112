<template>
  <div class="wrapper">
    <div class="system-content">  
      <div class="module-box">
        <div class="module-title">
          <h5>订单信息</h5>
        </div>
        <div class="module-content" style="margin-bottom: 20px;">
          <div class="btn-wrap clearfix">
            <template v-if="$route.meta.topMenuConst =='operator'">
              <el-button v-if="info[0].visa_status == 2 || info[0].visa_status == 4 || (info[0].visa_status == 6&&info[0].is_resubmit_visa!=1)" class="btn" type="default" @click="dialogVisible2 = true">退回补材料</el-button>
              <el-button v-if="info[0].visa_status == 2 " class="btn" type="primary" @click="dialogVisible = true">送签</el-button>
              <el-button v-if="info[0].visa_status == 5" class="btn" type="primary" @click="dialogVisibleCourier = true">快递信息</el-button>
              <el-button v-if="info[0].visa_status == 4" class="btn" type="primary" @click="dialogVisibleGet = true">出签</el-button>
              <el-button v-if="info[0].visa_status == 4" class="btn" type="primary" @click="dialogVisibleRefuse = true">拒签</el-button>
            </template>
            <template v-if="$route.meta.topMenuConst =='sale' || $route.meta.topMenuConst =='store-sale'">
              <el-button v-if="info[0].visa_status == 3 || (info[0].visa_status == 6&&info[0].is_resubmit_visa==1)" class="btn" type="primary" @click="upqzclDialogVisible = true">补充上传签证材料</el-button>
            </template>
          </div>
          <div class="table-wrap">
            <el-table
              :data="info"
              style="width: 100%"
              class="el-table--middle"
              border
            >
              <el-table-column
                label="订单来源"
                align="center"
                :resizable="false"
                prop="order_from_name"
              />
              <el-table-column
                label="订单编号"
                align="center"
                width="160"
                :resizable="false"
                prop="order_no"
              />
              <el-table-column
                label="订单状态"
                align="center"
                :resizable="false"
                prop="confirm_status_name"
              />
              <el-table-column
                label="签证状态"
                align="center"
                :resizable="false"
                prop="visa_status_name"
              />
              <el-table-column
                label="订单总金额"
                align="center"
                :resizable="false"
                prop="rmb_total_amount"
              />
              <el-table-column
                label="游客人数"
                align="center"
                :resizable="false"
                prop="tourist_num"
              />
              <el-table-column
                label="游客姓名"
                align="center"
                :resizable="false"
              >
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.tourist_name_list" :key="index">
                    {{ item }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="代理商／联系人"
                align="center"
                :resizable="false"
                prop="distributor_org_name"
              />
            </el-table>
          </div>
        </div>
        <div class="module-title">
          <h5>签证材料</h5>
        </div>
        <div class="module-content">
          <ul class="comfirm-list">
            <li v-for="(item, idx) in info[0].visa" :key="idx">
              <a :href="item.path" target="_blank" class="avatar">
                <img :src="item.path" width="100%" height="100%">
              </a>
              <a class="uploadBtn" :href="item.path" download="">下载</a>
            </li>
          </ul>
        </div>
        <div class="module-title">
          <h5>日志</h5>
        </div>
        <div class="module-content">
          <div class="table-wrap">
            <el-table
              :data="info[0].visa_log"
              class="el-table--middle"
              border
            >
              <el-table-column
                label="签证进度"
                align="center"
                :resizable="false"
                prop="curr_visa_status_name"/>
              <el-table-column
                label="时间"
                align="center"
                :resizable="false"
                prop="create_time"/>
              <el-table-column
                label="备注"
                align="center"
                :resizable="false">
                <template slot-scope="{row}">
                  <p class="info-remark" v-html="row.remark"/>
                </template>
              </el-table-column>
              <el-table-column
                label="操作人"
                align="center"
                :resizable="false"
                prop="op_name"/>
            </el-table>
          </div>
        </div>
        <!-- <div class="module-title" v-if="$route.meta.topMenuConst == 'sale'">
          <h5>备注</h5>
        </div>
        <div class="module-content" style="padding-top: 20px;padding-bottom: 60px;" v-if="$route.meta.topMenuConst == 'sale'">
          <p style="line-height: 36px;">缺少护照复印件，请补充寄过来！</p>
        </div>   -->

      </div>
    </div>
    <!-- 拒签 -->
    <el-dialog title="拒签信息" :visible.sync="dialogVisibleRefuse" size="tiny" :close-on-click-modal="false" @close="dialogRefuseCancle()">
      <el-form label-width="100px">
        <el-form-item label="签证材料">
          <el-checkbox v-model="visaRefuse.is_resubmit_visa">重新提交签证材料</el-checkbox>
        </el-form-item>
        <el-form-item label="拒签原因">
          <el-input v-model="visaRefuse.reason" type="textarea" placeholder="请输入拒签原因"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRefuseCancle()">取 消</el-button>
        <el-button type="primary" @click="orderVisaRefuseSend()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 出签 -->
    <el-dialog title="出签" :visible.sync="dialogVisibleGet" size="tiny" :close-on-click-modal="false">
      <span>确定将出签状态改为已出签？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleGet = false">取 消</el-button>
        <el-button type="primary" @click="orderVisaGetSend()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 快递信息 -->
    <el-dialog title="快递信息" :visible.sync="dialogVisibleCourier" size="tiny" :close-on-click-modal="false" @close="dialogCourierCancle()">
      <el-form label-width="100px">
        <el-form-item label="快递单号">
          <el-input v-model="visaExpress.number" placeholder="请输入快递单号"/>
        </el-form-item>
        <el-form-item label="快递信息">
          <el-input v-model="visaExpress.info" placeholder="请输入快递信息"/>
        </el-form-item>
        <el-form-item label="分发说明">
          <el-input v-model="visaExpress.instructions" type="textarea" placeholder="请输入分发说明"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCourierCancle()">取 消</el-button>
        <el-button type="primary" @click="orderVisaCourierSend()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 送签 -->
    <el-dialog title="送签" :visible.sync="dialogVisible" size="tiny" :close-on-click-modal="false" @close="dialogVisible = false;send_visa_time=''">
      <el-form label-width="100px">
        <el-form-item label="预计送签时间">
          <el-input v-model="send_visa_time" placeholder="请输入预计送签时间"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;send_visa_time=''">取 消</el-button>
        <el-button type="primary" @click="orderVisaVerifySend(1)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退回补材料 -->
    <el-dialog title="退回补材料" :visible.sync="dialogVisible2" :close-on-click-modal="false" @close="dialogVisible2 = false;remark=''">
      <el-form label-width="100px">
        <el-form-item label="备注">
          <el-input v-model="remark" type="textarea" placeholder="请输入退回提示信息"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false;remark=''">取 消</el-button>
        <el-button type="primary" @click="orderVisaVerifySend(2)">确 定</el-button>
      </span>
    </el-dialog>
    <!--补充上传签证材料弹窗-->
    <el-dialog title="补充上传签证材料" :visible.sync="upqzclDialogVisible" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="上传签证材料：" required>
          <div class="hide-list" v-loading.body="loading">
            <el-upload 
              class="upload-demo" 
              action="/bom/api/tuan/upload_visa"
              :data="{order_no: order_no}"
              name="file" 
              :on-remove="handleRemove3" 
              :file-list="xdUpload" 
              :on-success="uploadsucc3" 
              :before-upload="beforeUpload3"
            >
              <el-button size="small">选择本地文件</el-button>
            </el-upload>
          </div>
          <ul class="el-upload-list el-upload-list--text" v-if="upqzclUpload.length > 0">
            <li class="el-upload-list__item is-success"
                v-for="(file, index) in upqzclUpload"
                :key="index">
              <a class="el-upload-list__item-name" :href="file.url" target="_blank">
                <i class="el-icon-document"/>{{ file.name }}
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"/>
              </label><i class="el-icon-close" @click="diyRemove3(file.addtime)"/>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="快递单号：">
          <el-input v-model="courierNumber" placeholder="请输入快递单号"/>
        </el-form-item>
        <el-form-item label-width="0px" style="display: flex;justify-content: center;margin-bottom:15px;">
          <el-button @click="upqzclDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="upqzclSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

import {
  orderVisaVerify, 
  saleOrderVisaVerify, 
  financeOrderVisaVerify, 
  orderVisaVerifySend, 
  orderVisaSignOut, 
  orderVisaExpress, 
  orderVisaDenySign
} from 'src/api/api';
import {
  ulVisaSave
} from 'src/api/tuan';
import {
  saleUploadVisaSave,
  saleOrderVisaVerify as apiStoreSaleOrderVisaVerify,
  financeOrderVisaVerify as apiStoreFinaceOrderVisaVerify
} from 'src/api/api_store';

export default {
  data() {
    return {
      loading: false,
      order_no: this.$route.query.id,
      chakanStatus: null,
      option: '1',
      remark: '',
      send_visa_time: null,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisibleRefuse: false,
      dialogVisibleGet: false,
      dialogVisibleCourier: false,
      upqzclDialogVisible: false,
      info: [{
        order_from: '',
        order_no: '',
        confirm_status: '',
        total_amount: '',
        rmb_total_amount: '',
        distributor_org_name: '',
        visa_log: [],
        visa_status: '',
        visa: [],
        order_from_name: '',
        visa_status_name: '',
        confirm_status_name: '',
        tourist_num: '',
        tourist_name_list: [],
        is_resubmit_visa: ''
      }],
      // 拒签
      visaRefuse: {
        order_no: this.$route.query.id,
        is_resubmit_visa: false,
        reason: ''
      },
      defaultVisaRefuse: {},
      // 快递信息
      visaExpress: {
        number:'',
        info:'',
        instructions:''
      },
      defaultVisaExpress: {},
      // 上传签证材料 begin
      xdUpload: [],
      upqzclUpload: [],
      courierNumber: null,
      // 上传签证材料 end
    };
  },
  computed: {
    topMenuConst(){
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    orderVisaVerifyFunc() {
      switch(this.topMenuConst) {
      case 'operator': 
        return orderVisaVerify;
      case 'sale': 
        return saleOrderVisaVerify;
      case 'store-sale': 
        return apiStoreSaleOrderVisaVerify;
      case 'store-finace':
        return apiStoreFinaceOrderVisaVerify;
      case 'finance': 
      default:
        return financeOrderVisaVerify;
      }
    },
    ulVisaSaveFunc() {
      switch(this.topMenuConst) {
      case 'store-sale': 
        return saleUploadVisaSave;
      default:
        return ulVisaSave;
      }
    },
  },
  created(){
    if(this.$route.meta.label == '查看签证材料'){
      this.chakanStatus = true;
    }
    // 拒签
    this.defaultVisaRefuse = JSON.parse(JSON.stringify(this.visaRefuse));
    // 快递信息
    this.defaultVisaExpress = JSON.parse(JSON.stringify(this.visaExpress));
  },
  mounted() {
    this.orderVisaVerify();
  },
  methods: {
    orderVisaVerify() {
      let params = {
        data: {
          order_no: this.order_no
        }
      };
      this.orderVisaVerifyFunc({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.info = [];
            this.info.push(result.data);
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
    orderVisaVerifySend(type) {
      let params = {};
      if(type == 1) {
        params = {
          data: {
            order_no: this.order_no,
            option: type,
            send_visa_time: this.send_visa_time
          }
        };
      }else if(type == 2){
        params = {
          data: {
            order_no: this.order_no,
            option: type,
            remark: this.remark
          }
        };
      }
      
      orderVisaVerifySend({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.dialogVisible = false;
            this.dialogVisible2 = false;
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.orderVisaVerify();
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
    // 出签
    orderVisaGetSend() {
      let params = {
        data: {
          order_no: this.order_no
        }
      };
      orderVisaSignOut({
        params,
        success: (res) => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.dialogVisibleGet = false;
            this.orderVisaVerify();
          }
        },
        showLoading: true
      });
    },
    // 快递信息
    orderVisaCourierSend() {
      let params = {
        data: JSON.parse(JSON.stringify(this.visaExpress))
      };
      params.data.order_no = this.order_no;
      if(this.visaExpress.number==''&&this.visaExpress.info==''&&this.visaExpress.instructions==''){
        this.$message({
          message: '至少填写一项才可以提交快递信息',
          type: 'info'
        });
      }else{
        orderVisaExpress({
          params,
          success: res => {
            this.$message({
              message: res.data.msg,
              type: res.data.code == '0' ? 'success' : 'error'
            });
            if (res.data.code == '0') {
              this.dialogVisibleCourier = false;
              this.orderVisaVerify();
            }
          },
          showLoading: true
        });
      }
    },
    // 快递信息关闭弹窗
    dialogCourierCancle(){
      this.dialogVisibleCourier = false;
      this.visaExpress = JSON.parse(JSON.stringify(this.defaultVisaExpress));
    },
    // 拒签
    orderVisaRefuseSend() {
      let params = {
        data: JSON.parse(JSON.stringify(this.visaRefuse))
      };
      params.data.is_resubmit_visa=this.visaRefuse.is_resubmit_visa? 1:0;
      orderVisaDenySign({
        params,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.dialogVisibleRefuse = false;
            this.orderVisaVerify();
          }
        },
        showLoading: true
      });
    },
    // 拒签关闭弹窗
    dialogRefuseCancle() {
      this.dialogVisibleRefuse = false;
      this.visaRefuse = JSON.parse(JSON.stringify(this.defaultVisaRefuse));
    },
    // 上传附件功能
    handleRemove3(file, fileList) {
      for (let i = 0; i < this.upqzclUpload.length; i++) {
        if (this.upqzclUpload[i]['id'] == file.id) {
          this.upqzclUpload.splice(i, 1);
          return false;
        }
      }
    },
    uploadsucc3(response, file, fileList) {
      this.$message({
        message: response.msg,
        type: response.code == '0' ? 'success' : 'error'
      });
      if(response.code==0){
        if(this.upqzclUpload.length == 10){
          this.$message.error('上传签证证数量不能超过10份');
        }else{
          this.upqzclUpload.push({
            addtime: response.data.addtime,
            name: response.data.name,
            path: response.data.path,
          });
        }
      }else{
        this.$message.error(response.msg);
      }
      this.loading = false;
    },
    beforeUpload3(file){
      this.loading = true;
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        this.loading=false;
        return false;
      }
      return isLt2M;
    },
    diyRemove3(id){
      for (let i = 0; i < this.upqzclUpload.length; i++) {
        if (this.upqzclUpload[i]['addtime'] == id) {
          this.upqzclUpload.splice(i, 1);
          return false;
        }
      }
    },
    upqzclSubmit(){
      let params = {
        data: {
          order_no: this.order_no,
          image: this.upqzclUpload,
          option: '2',
          courier_number: this.courierNumber || ''
        }
      };
      this.ulVisaSaveFunc({
        params,
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.upqzclDialogVisible = false;
            this.orderVisaVerify();
          }
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>
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
  .info-remark{
    overflow: auto;
    max-height: 65px;
  }
  .el-button {
    width: 130px;
  }
}
.btn-wrap {
  .btn {
    float: right;
    margin-right: 10px;
  }
}
.table-wrap {
  margin-top: 20px;
  padding: 0 0 15px;
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
  }
  .uploadBtn {
    display: block;
    text-align: center;
    color: #b10c79
  }
  .btns{
    padding-right: 10px;
    text-align:center;
    color: #ccc;
  }
}
</style>
