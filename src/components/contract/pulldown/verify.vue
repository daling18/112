<template>
  <!-- wrapper -->
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="info-item">
        <div class="label">
          绑定订单
        </div>
        <div class="con">
          <template v-if="order_no_list.length != 0">
            <span v-for="(o,i) in order_no_list" :key="i">
              <span class="purple">{{ o }}</span>
              <template v-if="i != order_no_list.length-1">
                ,
              </template>
            </span>
          </template>
          <template v-else>
            还未绑定相关订单
          </template>
        </div>
      </div>
      <div class="info-item">
        <div class="label">
          计划核销日期
        </div>
        <div class="con">
          {{ plan_cancel_date }}
        </div>
      </div>
    </div>
    <!-- /system-search -->
    <!-- system-content -->
    <div class="system-content">
      <div class="mod-form">
        <div class="title">核销信息</div>
        <!--表单-->
        <div class="form-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="190px" class="demo-ruleForm">
            <el-form-item label="核销结果" prop="status">
              <el-col>
                <template v-if="order_no_list.length != 0">
                  <el-select v-model="ruleForm.status">
                    <el-option label="使用核销" value="1"/>
                  </el-select>
                </template>
                <template v-else>
                  <el-select v-model="ruleForm.status" placeholder="请选择">
                    <el-option label="遗失报备" value="3"/>
                    <el-option label="损毁作废" value="2"/>
                  </el-select>
                </template>
              </el-col>
            </el-form-item>
            <template v-if="ruleForm.status && ruleForm.status == 1">
              <el-form-item label="合同图片" prop="inuse_images">
                <el-col>
                  <el-upload
                    class="upload"
                    action="/bom/api/finance/upload_img"
                    name="image[]"
                    :before-upload="galleryBefore"
                    :on-success="gallerySucc"
                    :show-file-list="false">
                    <el-button type="primary">上传图片</el-button>
                  </el-upload>
                  <span class="tip">可上传多张</span>
                  <span class="tip2" v-if="ruleForm.inuse_images.length > 0 && ruleForm.order_paper_contract.length <= 10">
                    ，还可以上传<i class="highlight">{{ 10-ruleForm.inuse_images.length - ruleForm.order_paper_contract.length}}</i>张
                  </span>
                </el-col>
              </el-form-item>
              <el-form-item class="gallery">
                <div class="li"
                     v-for="(o,i) in ruleForm.inuse_images"
                     :key="i"
                     v-if="ruleForm.inuse_images.length > 0"
                     >
                  <span class="close"
                        @click="galleryRm(o.id)"/>
                  <a :href="o.url"
                     target="_blank">
                    <img :src="o.url" class="img">
                  </a>
                </div>
                <template v-if="ruleForm.order_paper_contract">
                  <div class="li" v-for="(item, idx) in ruleForm.order_paper_contract" :key="item.id">
                    <a :href="item.path" target="_blank">
                      <img class="img" :src="item.path" alt="">
                    </a>
                  </div>
                </template>
              </el-form-item>
            </template>
            <template v-if="ruleForm.status && ruleForm.status == 3">
              <el-form-item label="合同遗失声明登报链接"
                            prop="unuse_status">
                <el-col>
                  <el-input type="text" v-model="ruleForm.unuse_link" placeholder="合同遗失声明登报图片"/>
                </el-col>
              </el-form-item>
              <el-form-item label="合同遗失声明登报图片" prop="unuse_status">
                <el-col>
                  <el-upload
                    class="upload"
                    action="/bom/api/finance/upload_img"
                    name="image[]"
                    :before-upload="galleryBefore"
                    :on-success="gallerySuccDis"
                    :show-file-list="false">
                    <el-button type="primary">上传图片</el-button>
                  </el-upload>
                  <span class="tip">可上传多张</span>
                  <span class="tip2" v-if="ruleForm.unuse_images.length > 0">
                    ，还可以上传<i class="highlight">{{ 10-ruleForm.unuse_images.length }}</i>张
                  </span>
                </el-col>
              </el-form-item>
              <el-form-item class="gallery"
                            v-if="ruleForm.unuse_images.length > 0">
                <div class="li"
                     v-for="(o,i) in ruleForm.unuse_images"
                     :key="i">
                  <span class="close"
                        @click="galleryRm(o.id)"/>
                  <a :href="o.url"
                     target="_blank">
                    <img :src="o.url" class="img">
                  </a>
                </div>
              </el-form-item>
            </template>
            <template v-if="ruleForm.status && ruleForm.status == 2">
              <el-form-item label="合同作废声明登报链接"
                            prop="unuse_status">
                <el-col>
                  <el-input type="text" v-model="ruleForm.unuse_link" placeholder="合同作废声明登报链接"/>
                </el-col>
              </el-form-item>
              <el-form-item label="合同损毁作废图片" prop="unuse_status">
                <el-col>
                  <el-upload
                    class="upload"
                    action="/bom/api/finance/upload_img"
                    name="image[]"
                    :before-upload="galleryBefore"
                    :on-success="gallerySuccDis"
                    :show-file-list="false">
                    <el-button type="primary">上传图片</el-button>
                  </el-upload>
                  <span class="tip">可上传多张</span>
                  <span class="tip2" v-if="ruleForm.unuse_images.length > 0">
                    ，还可以上传<i class="highlight">{{ 10-ruleForm.unuse_images.length }}</i>张
                  </span>
                </el-col>
              </el-form-item>
              <el-form-item class="gallery"
                            v-if="ruleForm.unuse_images.length > 0">
                <div class="li"
                     v-for="(o,i) in ruleForm.unuse_images"
                     :key="i">
                  <span class="close"
                        @click="galleryRm(o.id)"/>
                  <a :href="o.url"
                     target="_blank">
                    <img :src="o.url" class="img">
                  </a>
                </div>
              </el-form-item>
            </template>
            <el-form-item label="核销备注" prop="remark">
              <el-col>
                <el-input type="textarea" v-model="ruleForm.remark" placeholder="备注"/>
              </el-col>
            </el-form-item>
            <template v-if="ruleForm.status && ruleForm.status == 1">
              <el-form-item label="成人旅游费用">
                <el-col>
                  <el-input
                    v-model="ruleForm.adult_price"
                    type="number"
                    class="short"
                    placeholder="成人单价"
                    @change="valiPri"/>
                  元/人
                  <span class="and">×</span>
                  <el-input
                    v-model="ruleForm.adult_num"
                    type="number"
                    class="short"
                    placeholder="成人数量"
                    onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"/>
                  人
                </el-col>
              </el-form-item>
              <el-form-item label="儿童(不满14岁)旅游费用">
                <el-col>
                  <el-input
                    v-model="ruleForm.child_price"
                    type="number"
                    class="short"
                    placeholder="儿童单价"
                    @change="valiPri"/>
                  元/人
                  <span class="and">×</span>
                  <el-input
                    v-model="ruleForm.child_num"
                    type="number"
                    class="short"
                    placeholder="儿童数量"
                    onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"/>
                  人
                </el-col>
              </el-form-item>
              <el-form-item label="旅游费用合计">
                <el-col>
                  <el-input type="number" v-model="ruleForm.total_amount" placeholder="请输入合同金额（旅游费用）" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" @change="valiPri" />
                </el-col>
              </el-form-item>
              <el-form-item label="旅游费用支付方式">
                <el-col>
                  <el-input type="text" v-model="ruleForm.payment" placeholder="请输入支付方式"/>
                </el-col>
              </el-form-item>
              <el-form-item label="旅游合同签约日期">
                <el-col>
                  <el-date-picker v-model="ruleForm.sign_date"
                                  type="date"
                                  placeholder="签约日期"
                                  :editable="false"/>
                </el-col>
              </el-form-item>
              <el-form-item label="旅游费用支付日期">
                <el-col>
                  <el-date-picker v-model="ruleForm.pay_date"
                                  type="date"
                                  placeholder="支付日期"
                                  :editable="false"/>
                </el-col>
              </el-form-item>
              <el-form-item label="旅游者(合同签署人)姓名">
                <el-col>
                  <el-input type="text" v-model="ruleForm.tourist" placeholder="请输入旅游者姓名，用逗号隔开"/>
                </el-col>
              </el-form-item>
            </template>
          </el-form>
          <div class="submit-buttons foot-btn">
            <el-button type="primary" @click="submitForm('ruleForm')" size="large">提交核销申请</el-button>
            <el-button @click="$router.go(-1)" size="large">取消</el-button>
          </div>
        </div>
        <!-- /表单 -->
        <!--删除提示-->
        <el-dialog title="删除文件" :visible.sync="dialogVisible" size="tiny">
          <div class="confirm">是否确认删除文件？</div>
          <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="galleryRmConfirm">确 定</el-button>
          </span>
        </el-dialog>
        <!--/删除提示-->
      </div>
    </div>
    <!-- /system-content -->
  </div>
  <!-- /wrapper -->

</template>

<script>
import{
  getContractVerifyPulldown,
  getContractVerifyAudit,
  getContractVerifyP1,
  getContractVerifyP2,
  getContractReVerifyP1,
  getContractReVerifyP2
}from 'src/api/api';
export default{
  data(){
    return{
      type: '',
      typePre: '',
      menu: '',
      menuPre: '',
      order_no_list: '',
      plan_cancel_date: '',
      ruleForm:{
        contract_no: '',
        status: '',
        unuse_status: '',
        unuse_link: '',
        unuse_images: [],
        inuse_images: [],
        remark: '',
        adult_price: '',
        adult_num: '',
        child_price: '',
        child_num: '',
        total_amount: '',
        payment: '',
        sign_date: '',
        pay_date: '',
        tourist: '',
        order_paper_contract: []
      },
      rules: {
        status: [{
          required: true,
          message: '请选择核销结果',
          trigger: 'blur'
        }],
        unuse_status: [{
          type: 'number',
          required: true,
          message: '链接与图片至少填写一种',
          trigger: 'blur'
        }],
        inuse_images: [{
          type: 'array',
          required: true,
          message: '请上传图片',
          trigger: 'blur'
        }],
      },
      // 图片删除相关
      dialogVisible: false,
      dialogVisibleTmp: ''
    };
  },
  watch:{
    'ruleForm.unuse_link':{
      handler(e){
        if(e != ''){
          this.ruleForm.unuse_status = 1;
        }else{
          if(this.ruleForm.unuse_images == ''){
            this.ruleForm.unuse_status = '';
          }
        }
      },
      deep: true
    },
    'ruleForm.unuse_images':{
      handler(e){
        if(e != ''){
          this.ruleForm.unuse_status = 1;
        }else{
          if(this.ruleForm.unuse_link == ''){
            this.ruleForm.unuse_status = '';
          }
        }
      },
      deep: true
    }
  },
  methods:{
    initPageFn(){
      let para = {};
      para.data = {};
      para.data.contract_no = this.$route.query.id;
      this.type = this.$route.query.type;
      this.menu = this.$route.query.menu;
      this.type == 2 ? this.typePre = 'head' : this.typePre = 'branch';
      this.menu == 1 ? this.menuPre = 'pulldown' : this.menuPre = 'audit';
      this.status = this.$route.query.status;
      getContractVerifyPulldown({
        params: para,
        success: res => {
          if(res.data.code == 0){
            let asyncObj = res.data.data;
            this.plan_cancel_date = asyncObj.contract_info.plan_cancel_date;
            this.order_no_list = asyncObj.contract_info.order_no_list;
            if(asyncObj.cancel_info){
              this.ruleForm = asyncObj.cancel_info;
              this.ruleForm.status = this.ruleForm.status.toString();
            }
            if(this.order_no_list.length != 0){
              this.ruleForm.status = '1';
            }
          }
        },
        showLoading: true
      });
    },
    valiPri(e){
      if(e.toString().indexOf('-') != -1){
        this.$message.error('请输入正数');
      }else if(e.length > 9){
        this.$message.error('最多只能9位数，请修改');
      }
    },
    galleryBefore(file){
      let isLt2M = file.size / 1024 / 1024 < 2;
      if(!isLt2M){
        this.$message.error('上传文件大小不能超过 2MB!');
        return false;
      }
      return isLt2M;
    },
    gallerySucc(response, file, fileList){
      if(response.code == 0){
        if((this.ruleForm.inuse_images.length + this.ruleForm.order_paper_contract.length) == 10){
          this.$message.error('图片数量不可超过10张');
        }else{
          this.ruleForm.inuse_images.push({
            id: response.data[0].id,
            name: response.data[0].name,
            url: response.data[0].path
          });
          this.$message.success('添加图片成功');
        }
      }else{
        this.$message.error(response.msg);
      }
    },
    gallerySuccDis(response, file, fileList){
      if(response.code == 0){
        if(this.ruleForm.unuse_images.length == 10){
          this.$message.error('图片数量不可超过10张');
        }else{
          this.ruleForm.unuse_images.push({
            id: response.data[0].id,
            name: response.data[0].name,
            url: response.data[0].path
          });
          this.$message.success('添加图片成功');
        }
      }else{
        this.$message.error(response.msg);
      }
    },
    galleryRm(val){
      this.dialogVisible = true;
      this.dialogVisibleTmp = val;
    },
    galleryRmConfirm(){
      if(this.ruleForm.status == 1){
        this.ruleForm.inuse_images.forEach((v,i,a) => {
          if(v.id == this.dialogVisibleTmp){
            this.ruleForm.inuse_images.splice(i, 1);
            this.dialogVisible = false;
            return false;
          }
        });
      }else{
        this.ruleForm.unuse_images.forEach((v,i,a) => {
          if(v.id == this.dialogVisibleTmp){
            this.ruleForm.unuse_images.splice(i, 1);
            this.dialogVisible = false;
            return false;
          }
        });
      }
    },
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
          let para = {};
            console.log(this.ruleForm.adult_price, typeof this.ruleForm.adult_price);
          
          this.ruleForm.adult_price = Number(this.ruleForm.adult_price);
            console.log(this.ruleForm.adult_price, typeof this.ruleForm.adult_price);
          this.ruleForm.child_price = Number(this.ruleForm.child_price);
          para.data = this.ruleForm;
          para.data.contract_no = this.$route.query.id;
          if(this.type == 2 && this.status == 0){
            getContractVerifyP2({
              params: para,
              success: res => {
                this.$message({
                  message: res.data.msg,
                  type: res.data.code == '0'?'success':'error'
                });
                if(res.data.code == 0){
                  this.$router.push({
                    path: '/contract/'+this.menuPre+'/'+this.typePre+'-number',
                    query: {
                      type: this.type,
                      menu: this.menu,
                      id: this.$route.query.aid
                    }
                  });
                }
              }
            });
          }else if(this.type == 1 && this.status == 0){
            getContractVerifyP1({
              params: para,
              success: res => {
                this.$message({
                  message: res.data.msg,
                  type: res.data.code == '0'?'success':'error'
                });
                if(res.data.code == 0){
                  this.$router.push({
                    path: '/contract/'+this.menuPre+'/'+this.typePre+'-number',
                    query: {
                      type: this.type,
                      menu: this.menu,
                      id: this.$route.query.aid
                    }
                  });
                }
              }
            });
          }else if(this.type == 2 && this.status == 1){
            getContractReVerifyP2({
              params: para,
              success: res => {
                this.$message({
                  message: res.data.msg,
                  type: res.data.code == '0'?'success':'error'
                });
                if(res.data.code == 0){
                  this.$router.push({
                    path: '/contract/'+this.menuPre+'/'+this.typePre+'-number',
                    query: {
                      type: this.type,
                      menu: this.menu,
                      id: this.$route.query.aid
                    }
                  });
                }
              }
            });
          }else if(this.type == 1 && this.status == 1){
            getContractReVerifyP1({
              params: para,
              success: res => {
                this.$message({
                  message: res.data.msg,
                  type: res.data.code == '0'?'success':'error'
                });
                if(res.data.code == 0){
                  this.$router.push({
                    path: '/contract/'+this.menuPre+'/'+this.typePre+'-number',
                    query: {
                      type: this.type,
                      menu: this.menu,
                      id: this.$route.query.aid
                    }
                  });
                }
              }
            });
          }
        }else{
          return false;
        }
      });
    }
  },
  mounted(){
    this.initPageFn();
  }
};
</script>

<style scoped lang="scss">
.form-content {
  .el-select{
    width: 100%;
  }
  .el-form {
		.el-col{
			width: 350px;
		}
    .el-form-item {
      margin-bottom: 15px;
    }
    .select_info{
      color: #ae1f77;
      margin-left: 10px;
    }
  }
  .foot-btn {
    text-align: center;
    width: 680px;
    margin-top: 26px;
    margin-bottom: 10px;
  }
}
.upload{
	float: left;
}
.tip{
	margin-left: 10px;
	color: #999999;
}
.tip2{
	color: #999;
	.highlight{
		font-style: normal;
		color: #f00;
		margin: 0 3px;
	}
}
.gallery{
	width: 100%;
	.li{
		position: relative;
		float: left;
		width: 160px;
		height: 160px;
		margin-right: 10px;
	}
}
.img{
	width: 100%;
	height: 100%;
}
.close{
	position: absolute;
	right: 0;
	top: 0;
	width: 25px;
	height: 25px;
	background: rgba(0, 0, 0, 0.5);
	&::before{
		content: '';
		display: block;
		width: 10px;
		height: 10px;
		margin: 7px 0 0 8px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiN2MzYzJhNi03MGMxLTFmNDQtOThjMy03NjUwZTkyNWM5NTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDU5RjM2NzREOUEyMTFFN0FGMjZFREVDOERDODcxNTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDU5RjM2NzNEOUEyMTFFN0FGMjZFREVDOERDODcxNTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDU5RjM2NkZEOUEyMTFFN0FGMjZFREVDOERDODcxNTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDU5RjM2NzBEOUEyMTFFN0FGMjZFREVDOERDODcxNTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7FbzBWAAAAeUlEQVR42mL4////WyCuBWIGHLgMiN+BGC3/IaAYi6I8qFwnTKAQKlCCpCgfKlYB4iPrhin2A2IPZEXoCkHY8z8C+CPLMTGggt842CgmwtwUCMTe6B5E9105ksYiZMUggXqoQBmW4IF5sBnEeQ/EDXgCvBqIPwAEGABFzS2WLW3SZgAAAABJRU5ErkJggg==);
	}
	&:hover{
		cursor: pointer;
		opacity: .7;
	}
}
.confirm{
	padding: 10px 20px;
}
.short{
	width: 100px;
}
.el-col .short:first-child{
	margin-right: 10px;
}
.el-col .short:last-child{
	margin: 0 10px;
}
.and{
	margin-left: 10px;
}
.purple{
	color: #b10c79;
}
</style>
