<template>
  <div class="recieve-detail">
    <ul class="recieve-list">
      <li class="recieve-box">
        <span class="recieve-label">状态</span>
        <span class="recieve-con" :class="info.payment_info.payment_status_text == '有效'? 'green' : 'red'">{{ info.payment_info.payment_status_text }}</span>
      </li>
      <li class="recieve-box">
        <span class="recieve-label">审核结果</span>
        <span class="recieve-con" v-if="info.payment_info.payment_audit_text">{{info.payment_info.payment_audit_text}}</span>
        <span class="recieve-con" v-else>--</span>
        <!-- <span class="recieve-con" v-if="info.payment_info.payment_status === 1">通过</span>
        <span class="recieve-con" v-if="info.payment_info.payment_status === 2">无效</span>
        <span class="recieve-con" v-if="info.payment_info.payment_status === 3">待审核</span>
        <span class="recieve-con" v-if="info.payment_info.payment_status === 4">审核通过</span>
        <span class="recieve-con" v-if="info.payment_info.payment_status === 5">审核不通过</span> -->
      </li>
      <li class="recieve-box">
        <span class="recieve-label">原因／备注</span>
        <span class="recieve-con" v-if="info.payment_info.remark && info.payment_info.remark.length === 0">--</span>
        <span class="recieve-con" v-else>{{ info.payment_info.info ? info.payment_info.info : '--' }}</span>
      </li>
    </ul>
    <div class="recieve-info">
      <h2 class="recieve-tit">收款信息</h2>
      <div class="receive-content">
        <div class="content-box">
          <span class="content-label">收款人</span>
          <span class="content-right">{{ info.payment_info.user_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">所属部门</span>
          <span class="content-right">{{ info.payment_info.org_name }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">业务类型</span>
          <span class="content-right" v-if="info.payment_info.user_collection_type === 0">--</span>
          <span class="content-right" v-else>{{ info.payment_info.user_collection_type === 1 ? "团队订单收入" : "团队杂费收入" }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款金额（本位币）</span>
          <span class="content-right">{{ info.payment_info.rmb_total_amount }}元<em class="tip">[{{ info.payment_info.is_money_clear }}]</em></span>
        </div>
        <div class="content-box">
          <span class="content-label">金额／币种／汇率</span>
          <span class="content-right">{{ info.payment_info.total_amount }}({{ info.payment_info.currency }} / 汇率{{ info.payment_info.currency_rate }})</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款方式／账户</span>
          <span class="content-right" v-if="!info.payment_info.receipt_bank_name && !info.payment_info.receipt_account && !info.payment_info.receipt_account_name">--</span>
          <span class="content-right" v-else>{{ info.payment_info.receipt_bank_name }}{{info.payment_info.receipt_account}}{{info.payment_info.receipt_account_name}}</span>
        </div>
        <div class="content-box">
          <span class="content-label">收款日期</span>
          <span class="content-right">{{ info.payment_info.payment_date ? info.payment_info.payment_date : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">备注</span>
          <span class="content-right">{{ info.payment_info.remark ? info.payment_info.remark : '--' }}</span>
        </div>
        <div class="content-box">
          <span class="content-label">上传收款凭证</span>
          <span class="content-right" v-if="info.payment_info.attachment && info.payment_info.attachment.length === 0">--</span>
          <span class="content-rightimg" v-else>
            <div class="pic-wrap" v-for="(item, index) in info.payment_info.attachment" :key="index">
              <div class="pic-top" :style='"background-image:url(" + item.url+ ")"'>
                <a :href="item.url" class="big-btn" target="_blank"></a>
              </div>
              <div class="pic-bottom">
                <a download :href="item.url">下载</a>
              </div>
            </div>
          </span>
        </div>
        <div class="content-box">
          <span class="content-label">创建时间</span>
          <span class="content-right">{{ info.payment_info.create_time ? info.payment_info.create_time : '--'}}</span>
        </div>
      </div>
      <h2 class="recieve-tit">业务认款</h2>
      <div class="receive-money-wrap mtb clearfix">
        <div class="money-wrap">
          已认金额<span>{{ info.payment_info.already_claim_money }}</span>
        </div>
        <div class="btn-wrap">
          <!-- <el-button type="primary">+添加认款</el-button> -->
          <router-link v-if="(info.payment_info.is_add_payment_detail) && $route.meta.isPlan && info.payment_info.settlement_org_id != 0" class="el-button el-button--primary" :to='{path: "/control/recieve-detail-add", query: {pay_id: $route.query.id, id: $route.query.parent_id}}'>+添加认款</router-link>
          <router-link v-else-if="(info.payment_info.is_add_payment_detail) && $route.meta.isSale && info.payment_info.settlement_org_id != 0" class="el-button el-button--primary" :to='{path: "/sale/recognition/peer-proceeds/detail-add", query: {pay_id: $route.query.id, id: $route.query.parent_id}}'>+添加认款</router-link>
          <!-- <router-link v-else-if="(info.payment_info.payment_status === 1 || info.payment_info.payment_status === 4) && $route.meta.isFinace && info.payment_info.settlement_org_id != 0" class="el-button el-button--primary" :to='{path: "/recieve-detail-add", query: {pay_id: $route.query.id, id: $route.query.parent_id}}'>+添加认款</router-link> -->
        </div>
      </div>
      <div class="receive-money-wrap clearfix">
        <el-table
          :data="info.payment_detail_list"
          border
          style="width: 100%">
          <el-table-column
            prop="tuan_no"
            label="项目号(团号)"
            align="center"
            min-width="320">
            <template slot-scope="scope">
              <router-link v-if="$route.meta.isSale && scope.row.is_jump != 0" :to="{path: '/sale/income-detail', query: {bid: scope.row.bill_id}}">{{scope.row.tuan_no}}</router-link>
              <router-link v-if="$route.meta.isPlan && scope.row.is_jump != 0" :to="{path: '/control/income-detail', query: {bid: scope.row.bill_id}}">{{scope.row.tuan_no}}</router-link>
              <router-link v-if="$route.meta.isFinace && scope.row.is_jump != 0" :to="{path: '/fcontrol/income-detail', query: {bid: scope.row.bill_id}}">{{scope.row.tuan_no}}</router-link>
              <span v-if="scope.row.is_jump === 0" class="no-go-btn" @click="nogo">{{scope.row.tuan_no}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="认款单号"
            align="center"
            min-width="200">
             <template slot-scope="scope">
              <span class="primary">[{{scope.row.user_type_name}}]</span>
              <span>{{ scope.row.payment_no }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="rmb_total_amount"
            align="center"
            width="100"
            label="认款金额">
            <template slot-scope="scope">
              <div class="orange">{{scope.row.rmb_total_amount}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="payment_status"
            align="center"
            width="120"
            label="认款状态">
            <template slot-scope="scope">
              <span class="green" v-if=" scope.row.payment_status === 1">有效</span>
              <span class="gray" v-if=" scope.row.payment_status === 2">已撤销</span>
              <span class="blank" v-if=" scope.row.payment_status === 3">待核实</span>
              <span class="red" v-if=" scope.row.payment_status === 5">核实不通过</span>
              <span class="blank" v-if=" scope.row.payment_status === 6">待核销</span>
              <span class="green" v-if=" scope.row.payment_status === 7">核销通过</span>
              <span class="gray" v-if=" scope.row.payment_status === 8">核销不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_name"
            align="center"
            width="100"
            label="认款人">
          </el-table-column>
          <el-table-column
            prop=""
            align="center"
            label="操作"
            width="200px"
            fixed="right">
            <template slot-scope="scope">
              <span v-if="scope.row.edit && scope.row.edit.length === 0">--</span>
              <span v-for="(item, index) in scope.row.edit" :key="index" v-else>
                <el-button type="text" class="mr10" @click="dialog(item, scope.row.id)">{{btn_name[item - 1]}}</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      >
      <el-form v-if="dialogType === 0 || dialogType === 7">
        <el-form-item label="撤销说明" required>
          <el-input type="textarea" v-model="saleCancleInfo" auto-complete="off"/>
        </el-form-item>
        <span class="color-red">注：撤销认款记录后将无法恢复</span>
      </el-form>
      <el-form v-else-if="dialogType === 2 || dialogType === 4 || dialogType === 5">
        <el-form-item label="备注">
          <el-input type="textarea" v-model="saleCancleInfo" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <template v-else>
        <template v-for="(data, idx) in dialogData">
          <div v-if="data.cancel_status == 1 || data.cancel_status == 6" :key="idx" class="record">
            <div>撤销人：{{ data.user_name }}</div>
            <div>撤销时间：{{ data.create_time }}</div>
            <div>撤销说明：{{ data.info }}</div>
          </div>
          <div v-else-if="data.cancel_status < 4" :key="idx" class="record">
            <div>核实时间：{{ data.create_time }}</div>
            <div>核实状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
          <div v-else :key="idx" class="record">
            <div>核销时间：{{ data.create_time }}</div>
            <div>核销状态：{{ data.cancel_status_name }}</div>
            <div>操作人：{{ data.user_name }}</div>
            <div>备注：{{ data.info }}</div>
          </div>
        </template>
      </template>
      <div slot="footer" v-if="dialogType === 0" class="dialog-footer">
        <el-button type="primary" @click="saleCancelRenkuan">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div slot="footer" v-else-if="dialogType === 7" class="dialog-footer">
        <el-button type="primary" @click="cancelRenkuan">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div slot="footer" v-else-if="dialogType === 2" class="dialog-footer">
        <el-button type="primary" @click="heshiRenkuan(1)">核实通过</el-button>
        <el-button type="primary" @click="heshiRenkuan(2)">核实不通过</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div slot="footer" v-else-if="dialogType === 4" class="dialog-footer">
        <el-button type="primary" @click="heshiRenkuan(1)">重新核实通过</el-button>
        <el-button type="primary" @click="heshiRenkuan(2)">重新核实不通过</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div slot="footer" v-else-if="dialogType === 5" class="dialog-footer">
        <el-button type="primary" @click="hexiaoRenkuan(1)">核销通过</el-button>
        <el-button type="primary" @click="hexiaoRenkuan(2)">核销不通过</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div slot="footer" v-else class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {financialSettleGetGatheringInfo, 
        saleGetGatheringInfo, 
        comeinGetGatheringInfo,
        zhikeGetGatheringInfo,
        tonghangGetGatheringInfo,
        financialGetGatheringInfo,
        saleCancelRenkuan,
        saleCancelRenkuanInfo,
        heshiRenkuan,
        cancelRenkuanInfo,
        hexiaoRenkuan,
        cancelRenkuan
        } from 'src/api/api'
export default {
  data() {
    return {
      btn_name: ['撤销', '查看撤销记录', '核实', '查看核实详情', '重新核实', '核销', '查看核销详情', '撤销'],
      payment_id: this.$route.query.id,
      info: {
        payment_info: {},
        payment_detail_list: []
      },
      dialogTitle: '',
      dialogVisible: false,
      dialogType: 0,
      dialogId: '',
      saleCancleInfo: '',
      dialogData: {}
    }
  },
  methods: {
    nogo() {
      this.$message({
        type: 'error',
        message: '该收入记录已被删除'
      })
    },
    financialSettleGetGatheringInfo() {
      let params = {
        data: {
          payment_id: this.payment_id
        }
      };
      financialSettleGetGatheringInfo({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.$router.go(-1);
          };
        },
        showLoading: true
      })
    },
    saleGetGatheringInfo() {
      let params = {
        data: {
          payment_id: this.payment_id
        }
      };
      saleGetGatheringInfo({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          };
        },
        showLoading: true
      })
    },
    zhikeGetGatheringInfo() {
      let params = {
        data: {
          payment_id: this.payment_id
        }
      };
      zhikeGetGatheringInfo({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          };
        },
        showLoading: true
      })
    },
    tonghangGetGatheringInfo() {
      let params = {
        data: {
          payment_id: this.payment_id
        }
      };
      tonghangGetGatheringInfo({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          };
        },
        showLoading: true
      })
    },
    comeinGetGatheringInfo() {
      let params = {
        data: {
          payment_id: this.payment_id
        }
      };
      comeinGetGatheringInfo({
        params,
        success: (res) => {
          let result = res.data;
          if (res.data.code === 0) {
            this.info = result.data;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          };
        },
        showLoading: true
      })
    },
    dialog(dialogtype, id) {
      let type = dialogtype - 1;
      this.dialogTitle = this.btn_name[type];
      this.dialogId = id;
      this.dialogType = type;
      this.saleCancleInfo = '';
      if (type === 0) {
        // this.saleCancelRenkuanInfo(id);
      };
      if (type === 1) {
        this.cancelRenkuanInfo(1);
      };
      if (type === 2 || type === 4) {
        // this.heshiRenkuan();
      };
      if (type === 3 || type === 6) {
        this.cancelRenkuanInfo(2);
      };
      if (type === 5) {
        // this.hexiaoRenkuan();
      };
      if (type === 7) {
        // this.paymentCancel();
      };
      this.dialogVisible = true;
    },
    saleCancelRenkuan() {
      if (this.saleCancleInfo.length === 0) {
        this.$message({
          type: 'error',
          message: '填写撤销说明'
        });
        return
      };
      let params = {
        data: {
          id: this.dialogId,
          info: this.saleCancleInfo
        }
      };
      saleCancelRenkuan({
        params,
        success: (res) => {
          let reslute = res.data;
          if(reslute.code === 0) {
            this.$message({
              type: 'success',
              message: reslute.msg
            });
            this.flash();
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: reslute.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true
      })
    },
    saleCancelRenkuanInfo() {
      let params = {
        data: {
          id: this.dialogId
        }
      };
      saleCancelRenkuanInfo({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.dialogData = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true,
      })
    },
    heshiRenkuan(type) {
      let params = {
        data: {
          id: this.dialogId,
          status: type,
          info: this.saleCancleInfo
        }
      };
      heshiRenkuan({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.flash();
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true
      })
    },
    cancelRenkuanInfo(type) {
      let params = {
        data: {
          id: this.dialogId,
          type: type
        }
      };
      cancelRenkuanInfo({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.dialogData = result.data;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true
      })
    },
    hexiaoRenkuan(type) {
      let params = {
        data: {
          id: this.dialogId,
          status: type,
          info: this.saleCancleInfo
        }
      };
      hexiaoRenkuan({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.flash()
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true,
      })
    },
    cancelRenkuan() {
      if (this.saleCancleInfo.length === 0) {
        this.$message({
          type: 'error',
          message: '填写撤销说明'
        });
        return
      };
      let params = {
        data: {
          id: this.dialogId,
          info: this.saleCancleInfo
        }
      };
      cancelRenkuan({
        params,
        success: (res) => {
          let result = res.data;
          if(result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            this.flash();
            this.dialogVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
            this.dialogVisible = false;
          }
        },
        showLoading: true,
      })
    },
    flash() {
      if(this.$route.meta.isZhiKe && this.$route.meta.isSale) {
        this.zhikeGetGatheringInfo();
      }else if(this.$route.meta.isSale && !this.$route.meta.isZhiKe) {
        if(this.$route.meta.parent_path){
          this.tonghangGetGatheringInfo();
        }else{
          this.saleGetGatheringInfo();
        }
      }else if(this.$route.meta.isPlan) {
        this.comeinGetGatheringInfo();
      }else {
        this.financialSettleGetGatheringInfo();
      };
    }
  },
  mounted() {
    this.flash();
  }
}
</script>
<style lang="less" scoped>
  .recieve-detail {
    .no-go-btn {
      color: #b10c79;
      cursor: pointer;
    }
    .color-red{
      color: red;
    }
    .recieve-list {
      background-color: #fff;
      list-style: none;
      margin-bottom: 10px;
      padding: 30px 0 20px 30px;
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
      background-color: #fff;
      padding: 30px 0 20px 30px;
      .recieve-tit {
        font-size: 18px;
        color: #b10c79;
        padding: 0 0 0 10px;
        border-left: 5px solid #b10c79;
      }
      .receive-content {
        padding: 30px 0;
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
                  background-image: url(../../../assets/icons/magnifier.png);
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
        padding: 0 15px 0 0;
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
    .mr10 {
      margin-right: 10px;
    }
    .dialog-footer{text-align: center;}
    .record{margin-bottom: 20px;}
  }
</style>
