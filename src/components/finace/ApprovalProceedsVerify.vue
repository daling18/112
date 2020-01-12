<template>
  <div class="recieve-detail">
    <div class="recieve-info">
      <div class="verify-button">
        <el-button type="primary" @click="handleVerifyPassBtn">审核通过</el-button>
        <el-button @click="handleVerifyNopassBtn">审核不通过</el-button>
      </div>
      <h2 class="recieve-tit">收款信息</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">收款人</span>
          <span class="content-right">{{ paymentInfo.user_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">所属部门</span>
          <span class="content-right">{{ paymentInfo.org_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">业务类型</span>
          <span class="content-right" v-if="paymentInfo.user_collection_type === 0">--</span>
          <span class="content-right" v-else>{{ paymentInfo.user_collection_type === 1 ? "团队订单收入" : "团队杂费收入" }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款金额（本位币）</span>
          <span class="content-right">{{ paymentInfo.rmb_total_amount }}元</span>
        </div>
        <div class="content-box">
          <span class="content-label">金额／币种／汇率</span>
          <span class="content-right">{{ paymentInfo.total_amount }}({{ paymentInfo.currency }} / 汇率{{ paymentInfo.currency_rate }})</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款方式／账户</span>
          <span class="content-right" v-if="!paymentInfo.receipt_bank_name && !paymentInfo.receipt_account && !paymentInfo.receipt_account_name">--</span>
          <span class="content-right" v-else>{{ paymentInfo.receipt_bank_name }}{{ paymentInfo.receipt_account }}{{ paymentInfo.receipt_account_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款日期</span>
          <span class="content-right">{{ paymentInfo.payment_date ? paymentInfo.payment_date : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">备注</span>
          <span class="content-right">{{ paymentInfo.remark ? paymentInfo.remark : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">上传收款凭证</span>
          <span class="content-right" v-if="paymentInfo.attachment && paymentInfo.attachment.length === 0">--</span>
          <span class="content-rightimg" v-else>
            <div class="pic-wrap" v-for="(item, index) in paymentInfo.attachment" :key="index">
              <div class="pic-top" :style="&quot;background-image:url(&quot; + item.url+ &quot;)&quot;">
                <a :href="item.url" class="big-btn" target="_blank"/>
              </div>
              <div class="pic-bottom">
                <a download :href="item.url">下载</a>
              </div>
            </div>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">创建时间</span>
          <span class="content-right">{{ paymentInfo.create_time ? paymentInfo.create_time : '--' }}</span>
        </div>
      </div>
      <h2 class="recieve-tit">业务认款</h2>
      <div class="receive-money-wrap clearfix">
        <el-table
          :data="recognitionList"
          border
          style="width: 100%">
          <el-table-column
            prop="tuan_no"
            label="项目号(团号)"
            align="center"
            min-width="250">
            <template slot-scope="scope">
              <router-link :to="{path:'/fcontrol/income-detail', query: {bid: scope.row.bill_id}}">{{ scope.row.tuan_no }}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="认款单号"
            align="center"
            min-width="200">
            <template slot-scope="scope">
              <span class="color-purple">[{{ scope.row.user_type_name }}]</span>
              <span>{{ scope.row.payment_no }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="rmb_total_amount"
            align="center"
            label="认款金额"
            width="100">
            <template slot-scope="scope">
              <div class="orange">{{ scope.row.rmb_total_amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="payment_status"
            align="center"
            label="认款状态"
            width="100">
            <template slot-scope="scope">
              <span :class="scope.row.payment_status | getStatusColor">{{ scope.row.payment_status_text }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_name"
            align="center"
            label="认款人"
            width="120">
            <template slot-scope="scope">
              <p class="ellipsis" :title="scope.row.user_name">{{ scope.row.user_name }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            align="center"
            label="操作"
            min-width="170">
            <template slot-scope="scope">
              <template v-if="Array.isArray(scope.row.edit) && scope.row.edit.length > 0">
                <a 
                  v-for="val in scope.row.edit"
                  :key="val"
                  href="javascript:;"
                  @click="handleOperate(scope.row, val)"
                >{{ EDIT_MAP[val] }}</a>
              </template>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="审批不通过" :visible.sync="dialogConfirmVisible">
      <el-form :model="denyForm">
        <el-form-item label="原因/备注" label-width="100px">
          <el-input type="textarea" v-model="denyForm.info" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogConfirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleVerifyNopassConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialog_title" :visible.sync="dialogVisible">
      <el-form>
        <template v-if="dialogForm.type==1">
          <el-form-item label="撤销说明" prop="info" required>
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="提示" required>
            <span style="color:red;">撤销后该记录就无法恢复</span>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==2">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>撤销人：{{ data.user_name }}</div>
            <div>撤销时间：{{ data.create_time }}</div>
            <div>撤销说明：{{ data.info }}</div>
          </div>
        </template>  
        <template v-if="dialogForm.type==3||dialogForm.type==5">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==4">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>{{ data.cancel_type == 3 ? "核销" : "核实" }}时间：{{ data.create_time }}</div>
            <div>{{ data.cancel_type == 3 ? "核销" : "核实" }}状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
        </template> 
        <template v-if="dialogForm.type==6">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialogForm.info" auto-complete="off"/>
          </el-form-item>
        </template>
        <template v-if="dialogForm.type==7">
          <div v-for="data in cancel_record_data" :key="data.id" class="record">
            <div>{{ data.cancel_type==3?"核销":"核实" }}时间：{{ data.create_time }}</div>
            <div>{{ data.cancel_type==3?"核销":"核实" }}状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
        </template> 
      </el-form>
      <div slot="footer">
        <template v-if="dialogForm.type==1">
          <el-button type="primary" @click="sure(0)" :disabled="btn_disable">保存</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==3">
          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">核实通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==5">

          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">重新核实通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">重新核实不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==6">
          <el-button type="primary" @click="sure(1)" :disabled="btn_disable">核销通过</el-button>
          <el-button type="primary" @click="sure(2)" :disabled="btn_disable">核销不通过</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </template>
        <template v-if="dialogForm.type==2||dialogForm.type==4||dialogForm.type==7">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </template>       
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { cancelRenkuan , heshiRenkuan , hexiaoRenkuan , cancelRenkuanInfo} from 'src/api/api';
import {financialGetGatheringInfo} from 'src/api/tuan';
import {paymentVerify} from 'src/api/finance';
export default {
  filters: {
    getStatusColor(status){
      switch(status) {
      case 5: 
        return 'color-red';
      case 7: 
      case 1:
        return 'color-green';
      case 2:
      case 8:
        return 'color-gray';
      case 3:
      case 6:
      default:
        return '';
      }
    }

  },
  data() {
    return {
      paymentId: this.$route.query.id,
      paymentInfo: {},
      recognitionList: [],
      EDIT_MAP: [],
      dialogConfirmVisible: false,
      denyForm:{
        cancel_info:'',
      },
      btn_disable:false,
      dialogForm:{
        type:'',
        info:'',
        id:'',
      },
      cancel_record_data:{

      },
      dialogVisible:false,
      dialog_title:'',
    };
  },
  mounted() {
    this.financialGetGatheringInfo();
  },
  methods: {
    financialGetGatheringInfo() {
      let params = {
        data: {
          payment_id: this.paymentId
        }
      };
      financialGetGatheringInfo({
        params,
        success: (res) => {
          let {code, data, msg} = res.data;
          if (code === 0) {
            this.paymentInfo = data.payment_info;
            this.recognitionList = data.payment_detail_list;
            this.EDIT_MAP = data.edit_list;
          } else {
            this.$message({
              type: 'error',
              message: msg
            });
          };
        },
        showLoading: true
      });
    },
    paymentVerify(status, info){
      paymentVerify({
        params: {data: {
          id: this.paymentId,
          status: status,
          info: info
        }},
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.$message({type: 'success', message: '操作成功！'});
            this.$router.go(-1);
            // this.$router.push('/finace/approval/proceeds')
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            });
          };
        },
        showLoading: true
      });
    },
    //审核通过
    handleVerifyPassBtn() {
      this.$confirm('确定审核该收款为通过？', '审核通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.paymentVerify(1, '');
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消通过'
        // });          
      });

    },
    //核销不通过->确认
    handleVerifyNopassBtn() {
      this.dialogConfirmVisible = true;
      this.denyForm = {
        info: ''
      };
    },
    handleVerifyNopassConfirm(){
      this.paymentVerify(2, this.denyForm.info);
    },
    handleOperate(data, type){
      this.dialog_title = this.EDIT_MAP[type];
      this.dialogForm.info = '';
      this.dialogForm.id = data.id;
      this.dialogForm.type = type;
      this.dialogVisible=true;
      if(type==2||type==4||type==7){
        cancelRenkuanInfo({
          params: {data: {
            id: data.id, 
            type: type == 2 ? 1 : 2 // 撤销: 1, 核实核销: 2
          }},
          success: (params) => {
            let data = params.data;

            if (data.code == '0') {
              this.dialogVisible=true;
              this.cancel_record_data=data.data;

            } else {
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }
    },
    sure(status){
      let api='';

      this.dialogForm.status=status;

      if(this.dialogForm.type==1){
        api=cancelRenkuan;
      }
      if(this.dialogForm.type==3||this.dialogForm.type==5){
        api=heshiRenkuan;
      }
      if(this.dialogForm.type==6){
        api=hexiaoRenkuan;
      }

      this.btn_disable=true;

      let params={
        data:this.dialogForm
      };
      api({
        params: params,
        success: (params) => {
          let data = params.data;
          this.loading = false;

          if (data.code == '0') {
            this.$message.success(data.msg);
            this.dialogVisible=false;
            this.getList();
          } else {
            this.$message.error(data.msg);

          }
          this.btn_disable=false;
        },
        showLoading: true
      });
    }
  }
};
</script>
<style lang="less" scoped>
  .recieve-detail {
    padding: 35px 15px;
    background-color: #fff;
    .verify-button{
      float: right;
      margin-top: -8px;
    }
    .recieve-list {
      list-style: none;
      margin-bottom: 10px;
      .recieve-box {
        position: relative;
        padding: 0 0 10px 75px;
        .recieve-label {
          position: absolute;
          top: 0;
          left: 0;
          width: 75px;
          text-align: right;
          font-size: 14px;
          color: #999999;
        }
        .recieve-con {
          padding: 0 0 0 15px;
          font-size: 14px;
          min-height: 30px;
          line-height: 20px;
          color: #333333;
          &.green {
            color: #019f3d;
          }
          &.red {
            color: red;
          }
        }
      }
    }
    .recieve-info {
      .recieve-tit {
        font-size: 18px;
        color: #b10c79;
        padding: 0 0 0 10px;
        border-left: 5px solid #b10c79;
        margin-bottom: 25px;
      }
      .receive-content {
        padding: 10px;
        .content-box {
          position: relative;
          padding: 0 0 0 150px;
          margin-bottom: 10px;
          .content-label {
            position: absolute;
            top: 0;
            left: 0;
            width: 150px;
            text-align: right;
            font-size: 14px;
            color: #999999;
          }
          .content-right {
            color: #333333;
            font-size: 14px;
            padding: 0 0 0 20px;
            .tip {
              color: #b10c79;
              font-style: normal;
              padding: 0 0 0 10px;
            }
          }
          .content-rightimg {
            min-height: 30px;
            font-size: 0;
            .pic-wrap {
              display: inline-block;
              width: 100px;
              font-size: 14px;
              margin-left: 20px;
              .pic-top {
                position: relative;
                overflow: hidden;
                width: 100px;
                height: 100px;
                background-size: cover;
                background-position: center center;
                .big-btn {
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  width: 30px;
                  height: 25px;
                  background-color: rgba(0,0,0,0.8);
                  background-image: url(../../assets/icons/magnifier.png);
                  background-repeat: no-repeat;
                  background-size: cover;
                  background-position: center center;
                }
              }
              .pic-bottom {
                a {
                  color: #b10c79;
                }
              }
            }
          }
        }
      }
      .money-wrap {
        float: left;
        font-size: 14px;
        line-height: 33px;
        color: #333333;
        span {
          padding: 0 0 0 10px;
          color: #ff6000;
        }
      }
      .receive-money-wrap {
        .btn-wrap {
          float: right;
        }
        &.mtb {
          margin: 10px 0 15px;
        }
        .green {
          color: #4ab93d;
        }
        .gray {
          color: #999999;
        }
        .blank {
          color: #333333;
        }
        .red {
          color: #fc1621;
        }
      }
    }
    .primary {
      color: #b10c79;
    }
    .orange {
      color: #ff6000;
      text-align: right;
    }
  }
.record{
  margin-bottom:20px;
}
</style>
