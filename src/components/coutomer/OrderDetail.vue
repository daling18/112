
<template>
  <div class="details bids-wrap">
    <div class="system-tab">
      <ul class="tab-box" v-if="is_show_refund == 1">
        <router-link class="on" to tag="li">订单详情</router-link>
        <router-link
          :to="{ name: 'kfserviceOrderRefund', query: {ono: order_id}}"
          tag="li"
        >退团/款单详情</router-link>
      </ul>
    </div>
    <div class="cont">
      <div class="panel" v-if="$menuPermission('kfservice/order/all')">
        <div class="hd">
          <h2>
            备注
            <el-button @click="addNoteStatus = true">添加备注</el-button>
          </h2>
        </div>
        <div class="bd" v-if="remark.length > 0">
          <el-table :data="remark" border style="width: 100%">
            <el-table-column align="center" label="操作人" width="150" prop="op_user_name" />
            <el-table-column align="center" width="200" label="操作时间" prop="create_time" />
            <el-table-column align="center" min-width="300" label="内容" prop="remark" />
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>订单跟踪</h2>
        </div>
        <div class="bd">
          <el-table :data="operation" border style="width: 100%">
            <el-table-column prop="remark" align="center" label="操作行为" />
            <el-table-column prop="order_status" align="center" label="订单状态" />
            <el-table-column prop="create_time" align="center" label="操作时间"/>
            <el-table-column align="center" prop="op_user_name" label="操作人"/>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>基本信息</h2>
        </div>
        <div class="bd">
          <el-table :data="base_info" border style="width: 100%;border-bottom: none;">
            <el-table-column align="center" label="订单来源" prop="order_source_label" />
            <el-table-column align="center" label="订单编号" prop="order_no" />
            <el-table-column v-if="$menuPermission('kfservice/order/all')" align="center" prop="login_name" label="下单账号"/>
            <el-table-column align="center" prop="username" label="下单人"/>
            <el-table-column align="center" prop="create_time" label="下单时间"/>
            <el-table-column align="center" prop="order_status_label" label="订单状态"/>
          </el-table>
          <el-table :data="base_info" border style="width: 100%;border-bottom: none;">
            <el-table-column v-if="$menuPermission('kfservice/order/all')" align="center" prop="distributor_org_name" label="分销商"/>                       
            <el-table-column align="center" prop="distributor_real_name" label="联系人"/>
            <el-table-column align="center" prop="distributor_mobile" label="联系电话"/>
            <el-table-column align="center" label="邮箱">
              <template slot-scope="scope">
                <p>
                 {{scope.row.email || '---'}} 
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="pay_type_label" label="支付方式" v-if="$menuPermission('kfservice/order/all')">
              <template slot-scope="scope">
                <p>
                 {{scope.row.pay_type_label || '---'}} 
                </p>
              </template>
            </el-table-column>            
            <el-table-column align="center" prop="pay_channel_no" label="支付流水号" v-if="$menuPermission('kfservice/order/all')">
              <template slot-scope="scope">
                <p>
                 {{scope.row.pay_channel_no || '---'}} 
                </p>
              </template>
            </el-table-column> 
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>商品信息</h2>
        </div>
        <div class="bd">
          <el-table :data="product" border style="width: 100%;">
            <el-table-column align="center" prop="product_no" label="商品编号"/>
            <el-table-column align="center" prop="product_name" label="商品名称"/>
            <el-table-column align="center" prop="departure_date" label="出行日期"/>
            <el-table-column align="center" prop="departure_city" label="出发地"/>
            <el-table-column align="center" label="供应商">
              <template slot-scope="scope">
                {{scope.row.supplier_org_name}} <br>
                {{scope.row.supplier_op_name}}{{scope.row.supplier_op_name ? "：":''}}{{scope.row.supplier_op_mobile}}<br>
                {{scope.row.supplier_product_op_name ? "OP:":''}}{{scope.row.supplier_product_op_name}}
              </template>
            </el-table-column>
            <el-table-column v-if="$menuPermission('kfservice/order/all')" align="center" label="批发商">
              <template slot-scope="scope">
                {{scope.row.wholesaler_org_name || '---'}} <br>
                {{scope.row.wholesaler_approval_name}}{{scope.row.wholesaler_approval_name ? "：":''}}{{scope.row.wholesaler_approval_mobile}}
              </template>
            </el-table-column>

            <el-table-column align="center" label="商品结算单价">
              <template slot-scope="scope">
                <p class="itemComt" v-for="(item,index) in scope.row.peer_price" :key="index">
                  {{item}}
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="gender" min-width="100" label="商品外卖单价">
              <template slot-scope="scope">
                  <p class="itemComt" v-for="(item,index) in scope.row.out_price" :key="index">
                    {{item}}
                  </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>游客信息</h2>
        </div>
        <div class="bd">
          <el-table :data="tourist" border style="width: 100%;">
            <el-table-column align="center" prop="username" label="姓名" width="100"/>
            <el-table-column align="center" prop="gender" label="性别" width="80"/>
            <el-table-column align="center" prop="tourist_type" width="100" label="成人/儿童"/>
            <el-table-column align="center" prop="identity_type" width="100" label="证件类型"/>
            <el-table-column align="center" prop="identity_no" min-width="150" label="证件号码"/>
            <el-table-column align="center" min-width="150" label="证件有效期">
              <template slot-scope="scope">
                {{scope.row.identity_end_date || '---'}}
              </template>
            </el-table-column> 
            <el-table-column align="center" prop="nationality" min-width="100" label="国籍"/>
            <el-table-column align="center" min-width="100" label="手机号码">
              <template slot-scope="scope">
                {{scope.row.mobile || '---'}}
              </template>
            </el-table-column>            
            <el-table-column align="center" min-width="100" label="出生日期">
              <template slot-scope="scope">
                {{scope.row.birthday || '---'}}
              </template>
            </el-table-column>            
            <el-table-column align="center" min-width="100" label="备注">
              <template slot-scope="scope">
                {{scope.row.remark || '---'}}
              </template>
            </el-table-column>                        
            <!-- <el-table-column align="center" prop="gender" min-width="100" label="操作"/> -->
          </el-table>
        </div>
      </div>
      <div class="panel" v-if="refund.length > 0">
        <div class="hd">
          <h2>退款记录</h2>
        </div>
        <div class="bd">
          <el-table :data="refund" border style="width: 100%;">
            <el-table-column align="center" label="退款原因">
              <template slot-scope="scope">
                {{scope.row.reason}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="refund_amount" label="退款金额"/>
            <el-table-column align="center" prop="refund_status_label" label="退款状态"/>
            <el-table-column align="center" prop="apply_time" label="发起时间"/>
            <el-table-column align="center" prop="order_no" label="单号"/>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>
            费用信息
            <span>币种：人民币</span>
          </h2>
        </div>
        <div class="bd">
          <el-table :data="price_detail" border style="width: 100%;">
            <el-table-column align="center" width="200" label="总计金额" prop="detail"/>
            <el-table-column v-if="order_info.order_source != 1 && $menuPermission('kfservice/order/all')" align="center" label="优惠券名称">
              <template slot-scope="scope">
                {{scope.row.coupon_name || '---'}}
              </template>
            </el-table-column>
            <el-table-column v-if="order_info.order_source != 1 && $menuPermission('kfservice/order/all')" align="center" label="优惠券金额">
              <template slot-scope="scope">
                {{scope.row.coupon_amount || '---'}}
              </template>
            </el-table-column>
            <el-table-column v-if="order_info.order_source != 1 && $menuPermission('kfservice/order/all')" align="center" label="应收款金额">
              <template slot-scope="scope">
                {{scope.row.total_amount || '---'}}
              </template>
            </el-table-column>
            <el-table-column v-if="order_info.order_source != 1 && $menuPermission('kfservice/order/all')" align="center" prop="total_pay_amount" label="实收款金额"/>
            <el-table-column align="center" prop="total_peer_amount" label="结算总金额"/>
            <el-table-column align="center" prop="total_actual_peer_amount" label="实际结算总金额"/>
          </el-table>
        </div>
      </div>
      <div class="panel">
        <div class="hd">
          <h2>材料信息</h2>
        </div>
        <div class="bd">
          <el-table style="width: 100%" :data="material_info" border>
            <el-table-column label="材料" prop="item" width="120" align="center" />
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <div>
                  <span v-if="scope.row.status_name">{{ scope.row.status_name }}</span>
                  <span v-else>--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template>---</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog title="添加备注" :visible.sync="addNoteStatus" width="20%" size="tiny">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="addRemark"></el-input>
      <p :class="remark.length > 100 ? 'red noteSize':'noteSize'">{{addRemark.length}}/100</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNoteStatus = false">取 消</el-button>
        <el-button type="primary" @click="handleSetKfOrderRemark">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SearchItemDateRange from "../../../src/plugins/SearchItemDateRange";
import { getKfOrderDetail, setKfOrderRemark } from "../../../src/api/order";

export default {
  name: "kfOrderDetail",
  data() {
    const { query } = this.$route;
    return {
      order_id: this.$route.params.id || "",
      orderInfo: {},
      remark: [],
      operation: [],
      order_info: {},
      base_info: [],
      product: [],
      tourist: [],
      price_detail: [],
      material_info: [],
      addNoteStatus: false,
      addRemark: "",
      is_show_refund: 0,
      refund: [],
      orderFromType: 1
    };
  },
  computed: {},
  mounted() {
    this.handleOrderDetail();
  },
  methods: {
    handleSetKfOrderRemark() {
      var that = this;
      var params = {
        data: {
          order_no: that.order_id,
          remark: that.addRemark
        }
      };
      if (that.addRemark.length <= 0) {
        this.$message.error("备注内容不能为空~");
        return;
      }
      if (that.addRemark.length > 100) {
        this.$message.error("备注内容最长100个字哦~");
        return;
      }
      setKfOrderRemark({
        params: params,
        success: res => {
          if (res.data.code == 0) {
            that.addNoteStatus = false;
            that.addRemark = '';
            that.handleOrderDetail();
            this.$message({
              message: "订单备注添加成功！",
              type: "success"
            });
          }
        },
        showLoading: true
      });
    },
    handleOrderDetail(){
      var that = this;
      var params = {
        data: {
          order_no: that.order_id
        }
      }
      getKfOrderDetail({
        params: params,
        success: res => {
          var data = res.data.data;
          if (res.data.code == 0) {
            that.remark = data.remark;
            that.operation = data.operation;
            that.base_info = [data.base_info];
            that.order_info = data.base_info;
            that.product = [data.product];
            that.tourist = data.tourist;
            that.price_detail = [data.price_detail];
            that.material_info = data.material_info.list;
            that.is_show_refund = data.is_show_refund;
            that.refund = data.refund;
          }else{
            this.$message.error(res.data.msg);
          }
        },
        showLoading: true
      })
    },
    isNoMaterialOperate(edits) {
      if (Array.isArray(edits)) {
        return !edits.some(this.isShowMaterialOperate)
      }
      return true
    },
    isShowMaterialOperate(edit, material) {
      switch (edit) {
      // case 4:
      //   let noVisa = this.orderDetailData.visa_check == 0;
      //   // 非待送签： 1=待上传签证材料 2=待送签 3=待补签证材料 
      //   let noWaitVisa = this.orderDetailData.visa_check == 1 
      //     && this.materialInfo.edit_data.visa_status != 1
      //     && this.materialInfo.edit_data.visa_status != 2
      //     && this.materialInfo.edit_data.visa_status != 3;

      //   return noVisa || noWaitVisa;
      case 1:   // 下载电子合同
        return this.dlElectronicContractPerm;
      case 2:
        return this.pagerContractDetailPerm;
      case 3:
        return this.dlQrjPerm;
      case 4:
        return this.$menuPermission('touristroute/lineorder/lineorder/material/notificationbook');
      case 5:
        return this.dlCttzPerm;
      case 7:
        return this.chakanVisaPerm;
      case 9:
      case 10:
        return this.ulVisaSavePerm;
      case 11:
        return this.addInvoicePerm;
      case 12:
        return this.invoiceDetailPerm;
      case 13:
        return this.createElectronicContractPerm;
      case 14:
      case 15:
        return this.distrGenerateDownloadContractPerm;
      default:
        return true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.cont {
  padding: 20px;
  background-color: #fff;
}
.itemComt {
  display: block;
  line-height: 20px;
  height: auto;
}
.panel {
  margin-bottom: 20px;
  .hd {
    padding: 10px 0 25px;

    h2 {
      display: inline-block;
      color: #b10c79;
      font-size: 16px;
      border-left: 5px solid #b10c79;
      padding-left: 10px;
      line-height: 20px;
      span {
        font-size: 12px;
        font-weight: normal;
      }
    }

    span {
      margin-left: 20px;
      color: #999;
      i {
        color: #f60;
        font-style: normal;
      }
    }
    .op-btn {
      float: right;
    }
  }
}
.noteSize {
  text-align: right;
  line-height: 30px;
}
.red {
  color: red;
}
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
}
</style>
