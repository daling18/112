<template>
  <!-- wrapper -->
  <div class="wrapper">
    <div class="record-top">
      <ul class="record-list">
        <li>
          <p class="add-left">绑定订单</p>
          <p class="add-right"><span v-for="item in contract_info.order_no_list">{{ item }}</span></p>
        </li>
        <li>
          <p class="add-left">计划核销日期</p>
          <p class="add-right">{{ contract_info.plan_cancel_date }}</p>
        </li>
        <li>
          <p class="add-left">实际核销日期</p>
          <p class="add-right">{{ contract_info.cancel_date }}</p>
        </li>
      </ul>
      <div class="verify-button" v-if="detailDtype==2">
        <el-button type="primary" @click="verifyPassBtn">核销通过</el-button>
        <el-button @click="verify_nopass.dialogVerifyVisible = true;verify_nopass.form.remark=''">核销不通过</el-button>
      </div>
    </div>
    <div class="cont">
      <div class="panel">
        <div class="hd">
          <h2>核销信息</h2>
        </div>
        <div class="bd">
          <p v-if="cancel_info===null || cancel_info===''">还没有核销记录</p>
          <div v-else class="record-list">
            <ul>
              <li>
                <p class="add-left">核销结果</p>
                <p class="add-right"><span>{{ cancel_info.status_name }}</span></p>
              </li>
              <li>
                <p class="add-left">核销人</p>
                <p class="add-right">{{ cancel_info.user_name }}</p>
              </li>
              <li>
                <p class="add-left">核销人所属分公司</p>
                <p class="add-right">{{ cancel_info.org_name }}</p>
              </li>
              <li v-if="cancel_info.status==2||cancel_info.status==3">
                <p class="add-left" v-if="cancel_info.status==2">合同作废登报链接</p>
                <p class="add-left" v-else-if="cancel_info.status==3">合同遗失声明登报链接</p>
                <p class="add-right">{{ cancel_info.unuse_link }}</p>
              </li>
              <li>
                <p class="add-left">核销备注</p>
                <p class="add-right">{{ cancel_info.remark }}</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">成人旅游费用</p>
                <p class="add-right">{{ cancel_info.adult_price }} 元／人 *{{ cancel_info.adult_num }}人</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">儿童（不满14岁）旅游费用</p>
                <p class="add-right">{{ cancel_info.child_price }} 元／人 *{{ cancel_info.child_num }}人</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">旅游费用合计</p>
                <p class="add-right">{{ cancel_info.total_amount }} 元</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">旅游费用支付方式</p>
                <p class="add-right">{{ cancel_info.payment }}</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">旅游合同签约日期</p>
                <p class="add-right">{{ cancel_info.sign_date }}</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">旅游费用支付日期</p>
                <p class="add-right">{{ cancel_info.pay_date }}</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">旅游者姓名</p>
                <p class="add-right">{{ cancel_info.tourist }}</p>
              </li>
              <li v-if="cancel_info.status==1">
                <p class="add-left">合同图片</p>
                <div class="add-right">
                  <div class="img-list" v-for="item in cancel_info.inuse_images">
                    <a :href="item.url" target="_blank">
                      <img :src="item.url">
                    </a>
                  </div>
                </div>
              </li>
              <li v-if="cancel_info.status==2||cancel_info.status==3">
                <p class="add-left" v-if="cancel_info.status==2">合同损毁作废图片</p>
                <p class="add-left" v-if="cancel_info.status==3">合同遗失声明图片</p>
                <div class="add-right">
                  <div class="img-list" v-for="item in cancel_info.unuse_images">
                    <a :href="item.url" target="_blank">
                      <img :src="item.url">
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>审核结果记录</h2>
        </div>
        <div class="bd">
          <div>
            <div class="record-result-block">
              <div class="record-result-icon">
                <i class="active"/>
              </div>
              <div class="record-result-content">
                <div class="record-result-state">
                  <p class="current" v-if="contract_info.cancel_status">{{ contract_info.cancel_status.current }}</p>
                </div>
              </div>
            </div>
            <div class="record-result-block" v-for="item in cancel_log">
              <div class="record-result-icon">
                <i/>
              </div>
              <div class="record-result-content">
                <div class="record-result-state">
                  <p>{{ item.title }}（{{ item.user_name }}）</p>
                  <span class="nopass" v-if="item.log_type==2&&item.status==2">{{ item.status_name }}</span>
                  <span class="pass" v-else>{{ item.status_name }}</span>
                </div>
                <p class="record-copy" v-if="item.log_type==2&&item.status==2">原因：{{ item.remark }}</p>
                <p class="record-copy">{{ item.create_time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-buttons">
        <el-button @click="goBack" size="large">返回</el-button>
      </div>
    </div>
    <el-dialog title="审核合同核销结果" :visible.sync="verify_nopass.dialogVerifyVisible">
      <div>
        <el-form :model="verify_nopass.form" ref="infoForm" label-position="top" class="demo-ruleForm">
          <el-form-item label="不通过原因">
            <el-col :span="24">
              <el-input type="textarea" v-model="verify_nopass.form.remark" placeholder="请输入不通过的原因"/>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="verifyNopassBtn">确 定</el-button>
        <el-button @click="verify_nopass.dialogVerifyVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- /wrapper -->
</template>

<script>
import { getUseCancellq1, getUseCancellq2, getUseCancelsh1, getUseCancelsh2, useCancelReviewsh1, useCancelReviewsh2, useCancelReviewcx1, useCancelReviewcx2 } from 'src/api/api';
export default {
  data(){
    return{
      contract_no: this.$route.query.id,
      // verify_status: this.$route.query.status,
      //申请分公司:1分公司，2总部
      detailType: this.$route.query.type,
      //所属菜单:1合同领取，2合同审核
      detailMenu: this.$route.query.menu,
      //审核操作:1查看，2审核
      detailDtype: this.$route.query.dtype,
      //审核记录
      contract_info: {},
      //核销信息
      cancel_info: {
        // status_name: "使用核销",
        // user_name: "张修明",
        // org_name:'盈科旅游厦门分公司',
        // remark: '合同已使用备注备注',
        // adult_num: 3,
        // child_num: 3,
        // adult_price: 100000000,
        // child_price: 60000000,
        // total_amount: 500000,
        // payment: "支付宝",
        // pay_date: "2017-12-11",
        // tourist: "小明，小江",
        // inuse_images: [
        //     "http://test.erp.yktour.com.cn/bom/uploads/20171215/3109aea1a63417690c1e471dfd51bc4c.jpg",
        //     "http://test.erp.yktour.com.cn/bom/uploads/20171215/3109aea1a63417690c1e471dfd51bc4c.jpg",
        //     "http://test.erp.yktour.com.cn/bom/uploads/20171215/3109aea1a63417690c1e471dfd51bc4c.jpg",
        //     "http://test.erp.yktour.com.cn/bom/uploads/20171215/3109aea1a63417690c1e471dfd51bc4c.jpg"
        // ]
      },
      //审核结果记录
      cancel_log: [
        //     {
        //     user_name: "张修明",
        //     remark: "备注通不通过啊",
        //     create_time: "2017-12-18 10:47",
        //     org_name: "杭州旅游分公司",
        //     b_name: "杭州旅游分公司",
        //     status_name: "通过"
        // },
        // {
        //     user_name: "张修明",
        //     remark: "已使用",
        //     create_time: "2017-12-17 22:43",
        //     org_name: "杭州旅游分公司",
        //     b_name: "",
        //     status_name: "不通过"
        // }
      ],
      //核销不通过
      verify_nopass: {
        dialogVerifyVisible:false,
        form:{
          remark:''
        }
      }
    };
  },
  watch: {
    $route() {
      this.contract_no = this.$route.query.id;
      this.detailType = this.$route.query.type;
      this.detailMenu = this.$route.query.menu;
      this.detailDtype = this.$route.query.dtype;
      this.getVerifyEvent();
    }
  },
  methods: {
    //请求页面数据
    getVerifyEvent(){
        console.log(this.$route.query.oid);
      
      let ApplyId = {
        data:{
          contract_no:this.contract_no
        }
      };
      if(this.detailType==1){
        if(this.detailMenu==1){
          getUseCancellq1({
            params: ApplyId,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.contract_info = data.data.contract_info;
                this.cancel_info = data.data.cancel_info;
                this.cancel_log = data.data.cancel_log;
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          }); 
        }else if(this.detailMenu==2){
          getUseCancelsh1({
            params: ApplyId,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.contract_info = data.data.contract_info;
                this.cancel_info = data.data.cancel_info;
                this.cancel_log = data.data.cancel_log;
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }else if(this.detailType==2){
        if(this.detailMenu==1){
          getUseCancellq2({
            params: ApplyId,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.contract_info = data.data.contract_info;
                this.cancel_info = data.data.cancel_info;
                this.cancel_log = data.data.cancel_log;
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else if(this.detailMenu==2){
          getUseCancelsh2({
            params: ApplyId,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.contract_info = data.data.contract_info;
                this.cancel_info = data.data.cancel_info;
                this.cancel_log = data.data.cancel_log;
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }
    },
    //审核核销请求
    reviewRequest(data) {
      let params = {
        data:data
      };
      if(this.detailType==1){
        if(this.detailDtype==1){
          useCancelReviewcx1({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.$message.success(data.msg);
                this.$router.push({
                  path: '/contract/audit/verify-record',
                  query: {
                    type: this.$route.query.type,
                    menu: this.$route.query.menu,
                    id: this.$route.query.id,
                    oid: this.$route.query.oid,
                    dtype: 1
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else if(this.detailDtype==2){
          useCancelReviewsh1({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.$message.success(data.msg);
                this.$router.push({
                  path: '/contract/audit/verify-record',
                  query: {
                    type: this.$route.query.type,
                    menu: this.$route.query.menu,
                    id: this.$route.query.id,
                    oid: this.$route.query.oid,
                    dtype: 1
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }else if(this.detailType==2){
        if(this.detailDtype==1){
          useCancelReviewcx2({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.$message.success(data.msg);
                this.$router.push({
                  path: '/contract/audit/verify-record',
                  query: {
                    type: this.$route.query.type,
                    menu: this.$route.query.menu,
                    id: this.$route.query.id,
                    oid: this.$route.query.oid,
                    dtype: 1
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }else if(this.detailDtype==2){
          useCancelReviewsh2({
            params: params,
            success: (params) => {
              let data = params.data;
              if (data.code == '0') {
                this.$message.success(data.msg);
                this.$router.push({
                  path: '/contract/audit/verify-record',
                  query: {
                    type: this.$route.query.type,
                    menu: this.$route.query.menu,
                    id: this.$route.query.id,
                    oid: this.$route.query.oid,
                    dtype: 1
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            },
            showLoading: true
          });
        }
      }
          

    },
    //核销通过
    verifyPassBtn() {
      this.$confirm('确定通过该合同核销申请？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          status:1,
          contract_no:this.contract_no
        };
        this.reviewRequest(data);
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消通过'
        // });          
      });

    },
    //核销不通过->确认
    verifyNopassBtn() {
      let data = {
        status:2,
        contract_no:this.contract_no,
        remark: this.verify_nopass.form.remark
      };
      this.reviewRequest(data);
      this.getVerifyEvent();
      this.verify_nopass.dialogVerifyVisible = false;

    },
    goBack(){
      let arr = this.$route.path.split('/'),
        typePre = this.detailType == 2 ? 'head' : 'branch';
      this.$router.push({path:'/contract/'+arr[2] +'/'+typePre+'-number',query:{type:this.$route.query.type,menu:this.$route.query.menu,id:this.$route.query.oid}});
    },

  },
    
  mounted() {
    this.getVerifyEvent();
  }
};
</script>

<style scoped lang="scss">
@mixin content-box {
    padding: 20px;
    background-color: #fff;
}
.cont{
    @include content-box;
}
.record-top{
    position: relative;
    margin-bottom: 10px;
    @include content-box;
    .verify-button{
        position: absolute;
        top:15px;
        right: 15px;
    }
    
}
.record-list{
    li {
        line-height: 22px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        .add-left {
            width: 100px;
            text-align: right;
            color: #999;
        }
        .add-right {
            color: #333;
            text-align: left;
            margin-left: 12px;
            overflow: hidden;
            text-overflow:ellipsis;
            // white-space: nowrap;
            flex: 1;
            span {
                color: #ae1f77;
                &:after{
                    content: '，';
                    display: inline-block;
                    color: #333;
                }
                &:last-child:after{
                    content: '';
                }
            }
        }
    }
}
.panel{
    margin-bottom: 20px;
    .hd{
        padding: 10px 0 25px;
        h2{
            display: inline-block;
            color: #b10c79;
            font-size: 18px;
            border-left: 5px solid #b10c79;
            padding-left: 10px;
            line-height: 20px;
        }
    }
    .bd{
        .record-list {
            li{
                line-height: 38px;
                .add-left{
                    width: 180px;
                }
                .add-right{
                    span{
                        font-weight: bold;
                    }
                    .img-list{
                        width: 160px;
                        height: 160px;
                        float: left;
                        margin-top: 10px;
                        margin-right: 10px;
                        &:last-child{
                            margin-right: 0px;
                        }
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .record-result-block{
                position: relative;
                padding: 0 0 20px 0;
                &:before {
                    content: '';
                    position: absolute;
                    top: 4px;
                    left: 18px;
                    height: 100%;
                    width: 2px;
                    background: #ccc;
                }
                &:last-child:before{
                    height: 0;
                }
            .record-result-icon{
                    position: absolute;
                    top: 4px;
                    left: 13px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    font-size: 16px;
                    text-align: center;
                    background: #f5f5f5;
                    padding: 2px;
                    i{
                        background-color: #ccc;
                        display: block;
                        height: 100%;
                        border-radius: 50%;
                        &.active{
                            background-color: #b10c79;
                        }
                    }
            }
            .record-result-content{
                position: relative;
                margin-left: 32px;
                background: #fff;
                border-radius: 50%;
                .record-result-state{
                    p{
                        float: left;
                        &.current{
                            color: #b10c79;
                            font-weight: bold
                        }
                    }
                    span{
                        float: left;
                        margin-left: 26px;
                        &.pass{
                            color: #169e43;
                        }
                        &.nopass{
                            color: #ff0000;
                        }
                    }
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    
                }
                .record-copy{
                    margin-top: 5px;
                    color: #999;
                }
                
            }
        }
    }
}
</style>