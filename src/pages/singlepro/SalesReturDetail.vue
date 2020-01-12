<template>
    <div class="wrapper">
        <div class="system-content">
            <div class="content-list">
                <p class="content-head">退货商品</p>
                <div class="bids-wrap">
                    <el-table :data='detail.product_info' border>
                        <el-table-column
                            prop="img_url"
                            header-align='center' 
                            align='left'
                            label='商品图片'>
                            <template slot-scope="scope">
                                <div class="content-imgbox">
                                    <img :src="scope.row.img_url" alt="商品图片">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            header-align='center' 
                            align='left'
                            label='商品名称'>
                        </el-table-column>
                        <el-table-column
                            header-align='center' 
                            align='left'
                            label='价格/货号'>
                            <template slot-scope="scope">
                                <p>{{scope.row.out_price}}元/{{scope.row.art_no}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="size_name"
                            header-align='center' 
                            align='left'
                            label='属性'>
                        </el-table-column>
                        <el-table-column
                            prop="order_buy_nums"
                            header-align='center' 
                            align='left'
                            label='数量'>
                        </el-table-column>
                        <el-table-column
                            prop="total_price"
                            header-align='center' 
                            align='left'
                            label='小计'>
                        </el-table-column>
                    </el-table>
                    <div class="allPrice">
                        <span>合计：</span>
                        <span class="red">￥{{detail.total_amount}}</span>
                    </div>
                    <div class="contentMessage">
                        <p class="content-head">服务单信息</p>
                        <div class="messageBorderBox">
                            <div class="messageItem">
                                <div class="label">服务单号</div>
                                <div class="cont">{{detail.no}}</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">申请状态</div>
                                <div class="cont">{{detail.audit_status && detail.audit_status[detail.status]}}</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">订单编号</div>
                                <div class="cont">{{detail.order_id}}</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">申请时间</div>
                                <div class="cont">{{detail.create_time}}</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">用户账号</div>
                                <div class="cont">无</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">联系人</div>
                                <div class="cont">{{detail.post_contact_name}}</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">联系电话</div>
                                <div class="cont">{{detail.post_contact_mobile}}</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">退货原因</div>
                                <div class="cont">{{detail.refund_desc}}</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">问题描述</div>
                                <div class="cont">无</div>
                            </div>
                            <div class="messageItem" style="border-bottom: none;">
                                <div class="label imgLabel">凭证照片</div>
                                <div class="cont">
                                    <span v-for="(item,index) in detail.vouchers_url" :key="index">
                                        <img :src="item || ''" alt="凭证照片">
                                    </span>
                                </div>
                            </div>
                        </div>

                        <el-form label-width="100px" style="width:90%" status-icon ref="ruleForm" :model="ruleForm" :rules="rules" v-if="detail.status !== 3"> 
                            <el-form-item label="退款金额" required prop="amount">
                                <el-input v-model="ruleForm.amount" :disabled="detail.status !== 1"/>
                            </el-form-item>

                            <el-form-item label="退款类型" prop="is_freight">
                                <template>
                                    <el-radio-group v-model="ruleForm.is_freight" :disabled="detail.status !== 1" >
                                    <el-radio class="radio" label="1">退运费</el-radio>
                                    <el-radio class="radio" label="0">不退运费</el-radio>
                                    </el-radio-group>
                                </template>
                            </el-form-item>

                            <!-- <div class="messageItem">
                                <div class="label">确认退款金额</div>
                                <div class="cont">
                                    <el-input v-model="detail.amount"></el-input>               
                                </div>
                            </div> -->
                            
                            <el-form-item label="收件人姓名" required prop="receive_name">
                                <el-input v-model="ruleForm.receive_name" :disabled="detail.status !== 1" />
                            </el-form-item>
                            <el-form-item label="收件人电话" required prop="receive_mobile">
                                <el-input v-model="ruleForm.receive_mobile" :disabled="detail.status !== 1" />
                            </el-form-item>
                            <el-form-item label="收件人地址" required prop="receive_address">
                                <el-input v-model="ruleForm.receive_address" :disabled="detail.status !== 1" />
                            </el-form-item>
                            <el-form-item label="备注" required prop="remark">
                                <el-input v-model="ruleForm.remark" :disabled="detail.status !== 1" />
                            </el-form-item>
                            
                            <!-- <div class="messageItem">
                                <div class="label">收款姓名</div>
                                <div class="cont">张三</div>
                            </div>
                            <div class="messageItem">
                                <div class="label">详细地址</div>
                                <div class="cont">张三</div>
                            </div>
                            <div class="messageItem" style="border-bottom: none;">
                                <div class="label">联系电话</div>
                                <div class="cont">188888</div>
                            </div>

                            <div class="messageItem" style="border-bottom: none;">
                                <div class="label">处理备注</div>
                                <div class="cont">
                                    <el-input v-model="detail.mark"></el-input>
                                </div>
                            </div> -->

                        </el-form>
                    </div>

                    <div class="messageBtnBox" v-if="detail.status == 1">   
                        <el-button @click="handleRefundConfirm('ruleForm')" type="primary">确认退货</el-button>
                        <el-button @click="handleRefusedRefund()">拒绝退货</el-button>
                    </div>
                    <div class="messageBtnBox" v-if="detail.status == 2">   
                        <el-button @click="productReceiptConfirm" type="primary">完成退货</el-button>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>

import {retundGoodsDetail,confirmRetrund,productReceiptConfirm,finishRetrund} from 'src/api/self_support.localproduct';

export default {
    
  data(){
    var validatePass2 = (rule, value, callback) => {
        var telReg = /^1[34587]\d{9}$/;
        if (!value) {
           callback(new Error('请输入手机号'));
        } else if(!value.match(telReg)){
           callback(new Error('手机号格式有问题')); 
        } else {
          callback();
        }
    };
    return {
        detail: {},
        ruleForm: {
            amount: "",
            is_freight: "0",
            receive_name: "",
            receive_address: "",
            receive_mobile: "",
            remark: "",
            state: 1
        },
        rules: {
          amount: [
            { required: true, message: '请输入退款金额' }
          ],
          is_freight: [
            { required: true, message: '请选择退款类型' }
          ],
          receive_mobile: [
            { required: true, validator: validatePass2 }
          ],
          receive_name: [
            { required: true, message: '请输入收件人姓名' }
          ],
          receive_address: [
            { required: true, message: '请输入收货地址' }
          ],
          remark: [
            { required: true, message: '请输入备注' }
          ],
        },
    }
  },
  methods: {
    currentPageChange(){

    },
    handleRefundConfirm(formName){
        var that = this;
        if(this.detail.status == 1){
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    that.ruleForm.order_id = that.$route.query.id;
                    let params = {
                        data: this.ruleForm
                    }
                    confirmRetrund({
                        params,
                        success: (res) =>{
                        let result = res.data
                        if (result.code === 0) {
                            this.initDetail();
                        } else {
                            this.$message({
                            type: 'error',
                            message: result.msg
                            })
                        }
                        },showLoading: true
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    productReceiptConfirm(){
        var that = this; 
        let params = {
            data: {
                order_id: this.$route.query.id,
                state: 2
            }
        }
        finishRetrund({
            params,
            success: (res) =>{
            let result = res.data
            if (result.code === 0) {
                that.initDetail();
            } else {
                that.$message({
                type: 'error',
                message: result.msg
                })
            }
            },showLoading: true
        })
    },
    handleRefusedRefund(){
        var that = this;
        let params = {
            data: {
                amount: "",
                is_freight: "",
                receive_name: "",
                receive_address: "",
                receive_mobile: "",
                remark: "",
                state: 2,
                order_id: this.$route.query.id
            }
        }
        confirmRetrund({
            params,
            success: (res) =>{
            let result = res.data
            console.log(result);
            if (result.code === 0) {
                that.initDetail();
            } else {
                that.$message({
                type: 'error',
                message: result.msg
                })
            }
            },showLoading: true
        })
    },
    initDetail(){
        let params = {
            data: {
                order_id: this.$route.query.id
            }
        }
        retundGoodsDetail({
            params,
            success: (res) =>{
            let result = res.data
            if (result.code === 0) {
                let data = result.data;
                this.detail = data;
                this.detail.product_info = [data.product_info];
                this.ruleForm.amount = this.detail.total_amount
                this.ruleForm.is_freight = this.detail.is_freight.toString();
                this.ruleForm.receive_name = this.detail.receive_name;
                this.ruleForm.receive_address = this.detail.receive_address;
                this.ruleForm.receive_mobile = this.detail.receive_mobile;
                this.ruleForm.remark = this.detail.remark;
            } else {
                this.$message({
                type: 'error',
                message: result.msg
                })
            }
            },
        showLoading: true
      })
    }
  },
  mounted(){
      this.initDetail()
  }
    
}
</script>

<style lang="less" scoped>
    .content-head {
        line-height: 40px;
    }
    .content-imgbox {
        width: 80px;
        height: 80px;
        overflow: hidden;
        margin: 0 auto;
        img {
            display: block;
            width: 100%;
            height: auto;
        }
    }
    .allPrice {
        height: 70px;
        line-height: 70px;
        text-align: right;
        font-size: 16px;
        .red {
            color: #dc554c;
            font-weight: bold;
        }
    }
    .messageBorderBox {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        .messageItem {
            border-bottom: 1px solid #ccc; 
            overflow: hidden;
            line-height: 20px;
            .label {
                height: 100%;
                float: left;
                width: 100px;
                text-align: right;
                padding: 10px 20px 10px 0;
                background: #f9fafc;
                border-right: 1px solid #ccc;
            }
            .imgLabel {
                height: 80px;
            }
            .cont {
                float: left;
                width: 500px;
                line-height: 40px;
                padding-left: 20px;
                span {
                    display: block;
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    float: left;
                    margin: 10px 5px;
                    img {
                        display: block;
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
    .messageBtnBox {
        width: 220px;
        margin: 20px auto;
    }
</style>
