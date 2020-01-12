<template>
  <!-- wrapper -->
  <div class="wrapper" >
    <!-- system-tab -->
    <div class="system-tab">
      <ul class="tab-box">
        <li class="on">
          {{constApprovalType[allData.approval_type]}}
        </li>
      </ul>
    </div>
    <!-- /system-tab -->
    <!-- system-content -->
    <div class="system-content">
      <div class="content-list">
        <div class="recieve-detail">
          <!-- 审批信息 -->
          <div class="recieve-tit">审批信息</div>
          <div class="recieve-content">
            <div class="content-box spxx">
              <ul class="spxx-ul">
                <li class="clearfix">
                  <b>审批编号</b>
                  {{allData.approval_no}}
                </li>
                <li class="clearfix">
                  <b>发起人</b>
                  {{allData.initiator_name}}
                </li>
                <li class="clearfix">
                  <b>所属组织</b>
                  {{allData.org_code_name}}
                  <!-- {{allData.org_name}} -->
                </li>
                <li class="clearfix">
                  <b>发起时间</b>
                  {{allData.create_time}}
                </li>
              </ul>
              <div class="sp-status"
                :class="statusCla"></div>
            </div>
          </div>
          <!-- /审批信息 -->
          <!-- 审批内容 -->
          <div class="recieve-tit">审批内容</div>
          <div class="recieve-content">
            <div class="spnl clearfix"
              @click="goXingchengxiangqing">
              <div class="role">
                <i class="ico"></i>
                {{allData.approval_type_name}}
              </div>
              <ul class="ul">
                  <li class="clearfix"
                    v-for="(o,i) in allData.content"
                    :key="i">
                    <b>{{o.key}}</b>
                    <template v-if="allData.approval_type == 8">
                      <template v-if="i == 3">
                        <div class="line-wrap" v-for="(item, index) in o.value" v-if="item.check" :key="index">
                          <div class="line-one">
                            <span class="line-tit">{{item.name}}</span>
                          </div>
                          <div v-for="(item2, index2) in item.child" v-if="item2.check" :key="'b' + index2" class="line-two">
                            <span class="line-tit">{{item2.name}}</span>
                            <div class="line-three clearfix">
                              <span class="line-item" v-for="(item3, index3) in item2.child" v-if="item3.check" :key="'c' + index3">
                                <span class="line-tit">{{item3.name}}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-else-if="o.key == '合作协议/合同'">
                        <span v-for="(o2, i2) in o.value" :key="i2" class="t6img">
                          <img :src="o2" alt="" />
                        </span>
                      </template>
                      <template v-else>
                        <div v-html="o.value"></div>
                      </template>
                    </template>
                    <template v-else>
                      <div v-if="o.key=='发票金额'"><span class="color-orange">{{ o.value }}</span> 元</div>
                      <div v-else-if="o.key == '结算单信息'">
                        <el-table :data="o.value" border style="width:100%">
                          <el-table-column prop="order_no" label="订单号"></el-table-column>
                          <el-table-column prop="tuan_no" label="团号"></el-table-column>
                          <el-table-column prop="product_name" label="产品名称"></el-table-column>
                          <el-table-column prop="use_date" label="出团日期"></el-table-column>
                          <el-table-column prop="product_id" label="产品编号"></el-table-column>
                          <el-table-column prop="amount" label="应结算"></el-table-column>
                          <el-table-column prop="rebate_amount" label="返点金额"></el-table-column>
                          <el-table-column prop="final_amount" label="实际结算金额"></el-table-column>
                        </el-table>
                      </div>
                      <div v-else-if="o.key == '订单信息'">
                        <el-table :data="o.value" border style="width:100%">
                          <el-table-column prop="order_no" label="订单号"></el-table-column>
                          <el-table-column prop="order_type" label="产品类型"></el-table-column>
                          <el-table-column prop="product_name" label="产品名称"></el-table-column>
                          <el-table-column prop="num_no" label="产品编号"></el-table-column>
                          <el-table-column prop="amount" label="销售总价"></el-table-column>
                          <el-table-column prop="cost_amount" label="同行总价"></el-table-column>
                          <el-table-column prop="received_amount" label="已收"></el-table-column>
                          <el-table-column prop="profit_amount" label="销售利润"></el-table-column>
                          <el-table-column prop="profit_top" label="批发分润"></el-table-column>
                          <el-table-column prop="profit_shop" label="拉新分润"></el-table-column>
                        </el-table>
                      </div>
                      <div v-else-if="o.key == '附件信息'">
                        <div v-for="(item, index) in o.value" :key="index" class="t6img" @click="handleBigImg(item)">
                          <img :src="item" alt="" >
                        </div>
                        <!-- <div class="t6img">
                          <img src="https://teststaticimage.yktour.com.cn/settlement/20190920/NXNNOW1kRlFpekFhWTFxSlhCMHQxNTY4OTc1Njg3.jpg" alt="">
                        </div> -->
                      </div>
                      <div v-else v-html="o.value"></div>
                    </template>
                  </li>
              </ul>
            </div>
          </div>
          <!-- /审批内容 -->
          <!-- 审批进度 -->
          <div class="recieve-tit">审批进度</div>
          <div class="recieve-content">
            <div class="record-result-block"
              v-for="(o,i) in allData.logs"
              :key="i">
              <div class="record-result-icon">
                <i/>
              </div>
              <div class="record-result-content clearfix">
                <div class="tit">
                  {{o.level_name}}
                </div>
                <div class="con">
                  <p class="p1">
                    <span class="name">
                      {{o.operator_name}}
                    </span>
                    <span class="status"
                      :class="o.deal_name == '不同意' ? 'no' : ''">
                      {{o.deal_name}}
                    </span>
                  </p>
                  <p>{{o.create_time}}</p>
                  <p v-if="o.remark != ''">备注：{{o.remark}}</p>
                </div>
                <div class="show-pic-box">
                  <div v-for="(item,index) in o.attachment" :key="index" class="pic-item">
                    <a :href="item" target="_blank"><img :src="item" alt=""></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btns" v-if="isShowApprovalBtn">
            <el-button type="primary" @click="handleSponsorSp('1')">审批通过</el-button>
            <el-button @click="handleSponsorSp('2')">审批不通过</el-button>
          </div>
          <!-- /审批进度 -->
        </div>
      </div>
    </div>
    <!-- /system-content -->
    <!--审批弹窗-->
    <el-dialog title="审批操作"
      :visible.sync="diaSpVisible"
      @close="cleanForm('formSpRef')"
      size="tiny">
      <el-form :model="formSp"
        ref="formSpRef">
        <el-form-item label="审批" prop="operation">
          <el-radio-group v-model="formSp.operation">
            <el-radio label="1">同意</el-radio>
            <el-radio label="2">不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="upload-wrapper" label="审批附件">
          <el-upload
            action="/bom/api/product/upload_pic"
            :data='{type: 1}'
            :show-file-list='false'
            :on-success='handleSuccess'
            >
            <el-button type='default'>上传附件</el-button>
            <span>最多上传3张，支持jpg，jpeg，gif，png格式，10M以内图片</span>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="pic-box">
            <div v-for="(item,index) in imgArr" :key="index" class="pic-item">
              <span class="el-icon-close" @click="handleRemoveImg(index)"></span>
              <div class="item"><img :src="item" alt=""></div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="formSp.remark" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSponsorSp(null,'cancel')">取 消</el-button>
        <el-button @click="handleSponsorSp(null,'submit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--/审批弹窗-->
    <el-dialog
      :visible.sync="bigImgVisible"
      class="dialog-bigimg"
      >
      <div class="big-img">
        <img :src="bigImg" alt="">
      </div>
    </el-dialog>
  </div>
  <!-- /wrapper -->
</template>

<script>
import { approval_detail, approval_content, deal_approval, deal_approval_new } from "src/api/approval";
export default {
  data() {
    return {
      imgArr:[],
      constApprovalType: {
        1:'线路上架',
        2:'订单调价',
        3:'退款审批',
        4:'退团审批',
        5:'计调请款',
        7:'收款审批',
        8:'供应商审批',
        9:'认款审批',
        10:'账单调账审批',
        11:'发票审批',
        12:'提现审批',
        13:'机票退票审批',
        14:'火车票退票审批',
        15:'门票退票审批',
        16:'酒店退票审批',
        17:'签证上架',
        18:'农特优上架',
        19:'退款审批',
        20:'退款审批',
        21:'门票上架',
        22:'酒店上架',
        23:'机票退款审批'
      },
      id: this.$route.query.id,
      allData: [],
      tableData: [],
      statusCla: '',
      // 审批弹窗属性
      diaSpVisible: false,
      formSp:{
        approval_id: '',
        operation: '1',
        remark: ''
      },
      bigImgVisible: false,
      bigImg: ""
    };
  },
  computed: {
    isShowApprovalBtn() {
      const isWaitMeApproval = this.$route.name == 'approvalListcheckDetail';

      return isWaitMeApproval && this.allData.can_deal == 1 && this.$menuPermission('usercenter/approval/myinitappr/apppass')
    }
  },
  methods: {
    handleRemoveImg(index){
      this.imgArr.splice(index, 1);
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 0) {
        this.imgArr.push(response.data.path);
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    },
    initialize(bool) {
      let para = {};
      para.data = {
        approval_id: this.id
      };
      approval_detail({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.allData = data;
            switch(data.status){
              // 审批状态 1审核中 2审核通过 3审核不通过 4已撤回
              case 2:
                this.statusCla = 'succ';
                break;
              case 3:
                this.statusCla = 'fail';
                break;
              case 4:
                this.statusCla = 'cancel';
                break;
            }
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    goXingchengxiangqing(){
      if (this.allData.approval_type == 7) {
        let payment_no
        for (let i in this.allData.content) {
          if (this.allData.content[i].key == '收款单号') {
            payment_no = this.allData.content[i].value
          }
        }
        this.$router.push({path:'/settlement/recpay/receive-detail',query:{payment_no: payment_no}});
      } else if(this.allData.approval_type !== 12 && this.allData.approval_type != 28){
        this.$router.push({path:'trip-detail',query:{id:this.allData.id}});
      }
    },
    async handleSponsorSp(code, type){
      if(code!=null){
        this.diaSpVisible = true;
        this.formSp.approval_id = this.allData.id;
        this.formSp.operation = code;
      }else{
        if(type == 'submit'){
          let para = {};
          let arrImg = ""
          let imgArr = this.imgArr;
          if(imgArr.length>=0){
            for(let i=0; i<imgArr.length; i++){
              if(i < imgArr.length - 1){
                arrImg += imgArr[i]+','
              }else{
                arrImg += imgArr[i]
              }
            }
          }
          para.data = {...this.formSp};
          para.data.attachment = arrImg;

          if(this.allData.approval_type == "7" || this.allData.approval_type == "8") {
            const {code, data, msg} = await deal_approval_new(para.data)

            if(code !== 0) return this.$message.error(msg)
            this.$message.success(msg)
            this.initialize();
          } else {
            deal_approval({
              params: para,
              success: res => {
                let { code, data, msg } = res.data;
                if (code == 0) {
                  this.$message.success(msg);
                  this.initialize();
                } else {
                  this.$message.error(msg);
                }
              },
              showLoading: true
            });
          }
        }
        this.diaSpVisible = false;
      }
    },
    cleanForm(refName){
      this.$refs[refName].resetFields();
    },
    handleBigImg(img) {
      this.bigImgVisible = true
      this.bigImg = img
    }
  },
  mounted() {
    this.initialize();
  }
};
</script>
<style scoped>
/* >>>.dialog-bigimg .el-dialog .el-dialog__body{
      padding: 0;
    } */
>>>.dialog-bigimg .el-dialog .el-dialog__header {
    padding: 0;
    }
</style>>

</style>
<style scoped lang="scss">
.content-list {
  padding-top: 25px;
}
ul{
  list-style: none;
}

.recieve-detail {
  .recieve-tit {
    font-size: 18px;
    color: #b10c79;
    padding: 0 0 0 10px;
    border-left: 5px solid #b10c79;
  }
  .recieve-content {
    padding: 20px 0 15px;
  }
}
// 审批信息
.spxx{
  position: relative;
}
.spxx-ul{
  line-height: 25px;
  li{
    padding-left: 160px;
  }
  b{
    font-weight: 400;
    float: left;
    width: 140px;
    margin-left: -160px;
    text-align: right;
    color: #999;
  }
}
.sp-status{
  position: absolute;
  left: 45%;
  top: -20px;
  width: 78px;
  height: 71px;
  background: rgba(0,0,0,0) url(../../assets/icons/status-sp.png) no-repeat scroll 0 0 / 312px 71px;
  &.cancel{
    background-position: -78px 0;
  }
  &.succ{
    background-position: -156px 0;
  }
  &.fail{
    background-position: -234px 0;
  }
}
// 审批内容
.spnl{
  display: flex;
  align-items:center;
  border: 1px solid #cccccc;
  background: #fafafa;
  border-radius: 2px;
  padding: 15px;
  cursor: pointer;
  transition: 1s ease;
  &:hover{
    opacity: .8;
  }
  .role{
    flex: 1;
    font-weight: 700;
    text-align: center;
  }
  .ico{
    display: block;
    width: 45px;
    height: 45px;
    background: url(../../assets/icons/ico-spnl.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 auto 10px;
  }
  .ul{
    flex: 10;
    line-height: 30px;
    li{
      padding-left: 100px;
    }
    b{
      float:left;
      width: 100px;
      font-weight: 400;
      color: #999999;
      margin-left: -110px;
      text-align: right;
    }
  }
}
// 审批进度
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
    }
  }
  &:first-child{
    .record-result-icon{
      i{
        background-color: #b10c79;
      }
    }
  }
  .record-result-content{
    margin-left: 32px;
    padding-left: 70px;
    .tit{
      float: left;
      margin-left: -70px;
      color: #b10c79;
      font-weight: bold
    }
    .name{
      color: #111;
      margin-right: 5px;
    }
    .con {
      float: left;
    }
    .show-pic-box {
      float: left;
      width: 300px;
      height: 100px;
      .pic-item {
        width: 70px;
        height: 70px;
        overflow: hidden;
        margin: 0 10px;
        float: left;
        background: #ccc;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
    .status{
      color: #169e43;
      &.no{
        color: #ff0000;
      }
    }
    p{
      color: #999;
    }
    .p1{
      margin-bottom: 5px;
    }
  }
}
.t6img{
  float: left;
  width: 150px;
  height: 150px;
  margin: 0 10px 10px 0;
  img{
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
  }
}
.pic-box {
  overflow: hidden;
  padding: 10px;
  .pic-item  {
    width: 100px;
    height: 100px;
    margin: 10px;
    float: left;
    position: relative;
    background: #ccc;
    span {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 16px;
    }
    .item {
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}
.big-img {
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
