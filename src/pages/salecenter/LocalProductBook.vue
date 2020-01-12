<template>
<!-- application\index\view\dev\src\components\distribution\LocalProductBook.vue -->
  <div class="wrapper">
    <div class="content-header content-section">
      <div class="header-title">
        {{ info.product_name }}
      </div>
      <el-form label-width="95px" class="info-form">
        <el-form-item label="请选择规格">
          <div class="specifications-wrap">
            <div
              class="specifications-item"
              :class="item.sel ? 'sel' : ''"
              v-for="(item, index) in info.price_lists" 
              :key="index"
              @click="handleSel(item)">
              {{item.size_name}}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="选择数量">
          <el-input-number class="w175" controls :min="1" v-model="formData.nums" />
        </el-form-item>
        <el-form-item label="合计">
          {{selPrice.size_name}}*{{formData.nums}}/<span class="color-orange">￥{{totalSalePrice}}</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-body content-section">
      <div class="body-title" v-if="!isZhike">结算方</div>
      <el-form label-width="95px" inline v-if="!isZhike">
        <el-form-item label="代理商" required>
          <div class="ellipsis" style="width: 192px;margin-top: 7px;" v-if="isStore" :title="info.org_info">
            {{ info.org_info }}
          </div>
          <select-org
            v-else
            hide-del
            type="1"
            :org-types="[1,3,6,7,8]"
            :default-list="DEFAULT_ORG_LIST"
            placeholder="请输入代理商"
            @select="handleDistributorChange"
          />
        </el-form-item>
        <el-form-item label="联系人姓名" required>
          <el-input v-model.trim="formData.distributor_contacts" placeholder="请输入代理商联系人姓名"/>
        </el-form-item>
        <el-form-item label="联系人电话" required>
          <el-input v-model="formData.distributor_mobile" placeholder="请输入代理商联系人电话"/>
        </el-form-item>
      </el-form>
      <div class="body-title">联系人</div>
      <el-form label-width="95px" inline>
        <el-form-item label="联系人" required>
          <el-input v-model.trim="formData.contact_name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="formData.contact_mobile" placeholder="请输入手机"/>
        </el-form-item>
      </el-form>
      <div class="body-title">邮寄地址</div>
      <el-form label-width="170px">
        <el-form-item label="联系人" class="w530" required>
          <el-input v-model.trim="formData.post_contact_name" placeholder="请输入联系人"/>
        </el-form-item>
        <el-form-item label="手机号" class="w530" required>
          <el-input v-model="formData.post_contact_mobile" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="所在城市" class="w530" required>
          <select-area v-model="postArea" @change="handleArea"/>
        </el-form-item>
        <el-form-item label="详细地址" class="w530" required>
          <el-input v-model="formData.post_address" placeholder="请输入详细地址"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-section">
      <div class="body-title">支付方式</div>
      <p class="mt10" v-for="(val, key) in PAY_TYPE_MAP" :key="key">
        <el-radio v-model="formData.pay_type" :label="key">{{ val }}</el-radio>
        <span v-if="key == '1'">
          （目前您在系统的可下单金额为<span v-if="validPrice !== ''">{{ validPrice || 0 }}</span><i v-else class="el-icon-loading" />，该金额根据授信与账户余额统计）
        </span>
        <router-link v-if="key == '1' && isStore" :to="{path: '/finace/balance-particulars-my', query: {settlement_org_id: info.fgs_org_id}}">在线充值</router-link>
      </p>
      <div class="footer-total">
        <p>订单金额：<span class="color-orange f18">￥{{ totalSalePrice }}</span></p>
        <!-- <p>订单金额：<span class="color-orange f18">￥{{ totalPrice }}</span></p>
        <p class="color-gray">建议金额：<span class="f18">￥{{ totalSalePrice }}</span></p> -->
      </div>
      <div class="color-gray mt10">温馨提示: 提交订单后，请在15分钟内完成支付，未在规定时间内完成，系统将会自动取消您的订单</div>
      <div class="submit-buttons">
        <el-button type="primary" size="large" @click="productSubmitCreateOrder">提交</el-button>
        <el-button size="large" @click="handleBack">返回</el-button>
      </div>
    </div>
    <online-pay
      ref="onlinePay"
      :order-id="order_id"
      order-resource="7"
    />
  </div>
</template>
<script>
import SelectOrg from 'src/plugins/SelectOrg'
import InputNumber from 'src/plugins/InputNumber'
import SelectArea from 'src/plugins/SelectArea'
import {productCreateOrder, productSubmitCreateOrder} from 'src/api/self_support.localproduct'
import { getPurchaseAmount } from 'src/api/orgination'
import { formatPrice } from 'src/utils/format'
import OnlinePay from 'src/components/components/OnlinePay.vue';
export default {
  components: {
    InputNumber,
    SelectOrg,
    SelectArea,
    OnlinePay
  },
  data () {
    return {
      id: this.$route.query.id + '',
      order_type: this.$route.query.type + '',
      ORG_TYPE: localStorage.getItem('orgtype') + '',
      DEFAULT_ORG_LIST: [],
      PAY_TYPE_MAP: {},
      info: {
        product_name: '',
        price_lists: [],
        org_info: ''
      },
      formData: {
        id: '',
        order_type: '',
        order_source: '1',
        price_id: '',
        nums: 1,
        distributor_id: '',
        distributor_name: '',
        distributor_contacts: '',
        distributor_mobile: '',
        contact_name: '',
        contact_mobile: '',
        post_contact_name: '',
        post_contact_mobile: '',
        post_city_ids: '',
        post_city_names: '',
        post_address: '',
        pay_type: '1'
      },
      postArea: {},
      selPostArea: {
        '0': {},
        '1': {},
        '2': {}
      },
      validPrice: 0,// 可下单金额
      selPrice: {},
      order_id: ''
    }
  },
  computed: {
    isStore() { // 是否是营业部
      // return this.ORG_TYPE == '5';
      return false
    },
    isZhike () { // 是否是直客下单
      return this.order_type === '1'
    },
    totalPrice () {
      const price = this.formData.nums * this.selPrice.peer_price
      return formatPrice(price);
    },
    totalSalePrice () {
      const price = this.formData.nums * this.selPrice.out_price
      return formatPrice(price);
    }
  },
  methods: {
    productCreateOrder () {
      let params = {
        data: {
          id: this.id,
          order_type: this.order_type
        }
      }
      productCreateOrder({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            result.data.price_lists.forEach((item, index) => {
              item.sel = false
              if (index === 0) {
                item.sel = true
                this.selPrice = item
              }
            })
            if (!this.isStore) {
              if (this.isZhike) {
                this.PAY_TYPE_MAP = {2: '线上支付'}
                this.formData.pay_type = '2';
              } else {
                this.PAY_TYPE_MAP = {1: '线下支付'}
                this.formData.pay_type = '1';
              }
            } else {
              this.PAY_TYPE_MAP = {
                1: '线下支付',
                2: '线上支付'
              }
            }
            this.info = result.data
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
            window.history.go(-1)
          }
        },
        showLoading: true
      })
    },
    handleArea (level, area, value) {
      this.selPostArea[level] = {id: area.id || '', area_name: area.area_name || ''}
    },
    productSubmitCreateOrder () {
      this.formData.id = this.id
      this.formData.order_type = this.order_type
      this.formData.price_id = this.selPrice.id
      this.formData.post_city_ids = ''
      this.formData.post_city_names = ''
      for (let i in this.selPostArea) {
        if (this.selPostArea[i].id) {
          this.formData.post_city_ids = this.formData.post_city_ids + this.selPostArea[i].id + ','
          this.formData.post_city_names = this.formData.post_city_names + this.selPostArea[i].area_name + ','
        }
      }
      this.formData.post_city_ids = this.formData.post_city_ids.substr(0, this.formData.post_city_ids.length - 1)
      this.formData.post_city_names = this.formData.post_city_names.substr(0, this.formData.post_city_names.length - 1)
      let params = {
        data: {...this.formData}
      }
      productSubmitCreateOrder({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            // this.$message({
            //   type: 'success',
            //   message: result.msg
            // })
            this.order_id = result.data.order_id
            this.$nextTick(() => {
              this.$confirm('预订成功', '在线支付提示', {
                type: 'success',
                cancelButtonText: '订单详情',
                confirmButtonText: '去支付',
                closeOnClickModal: false,
                closeOnPressEscape: false,
                showClose: false,
                beforeClose: (action, instance, done) => {
                  if(action == 'confirm'){
                    this.$refs.onlinePay.pay();
                  }else{
                    let path = '/saleorder/local-product-order/detail';
                    
                    done();
                    this.$router.push({path, query: {order_id: this.order_id, pay_type: this.formData.pay_type}});
                  }
                }
              }).catch((e)=>{
                console.log('cancel: ', e);
              })
            })
            // this.$router.push({
            //   path: '/distribution/local-product/detail',
            //   query: {order_id: result.data.order_id}
            // })
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        },
        showLoading: true
      })
    },
    handleDistributorChange(org){
      if (org) {
        let orgId = org.org_id
        let orgName = org.org_name
        this.formData.distributor_id = orgId
        this.formData.distributor_name = orgName
        this.validPrice = ''
        let params = {
          data: {
            settlement_org_id: orgId
          }
        }
        getPurchaseAmount({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0 && this.formData.distributor_id == orgId) {
              this.validPrice = result.data.purchase_amount || 0
              return false
            }
          }
        });
      } else {
        this.formData.distributor_id = ''
        this.formData.distributor_name = ''
        this.validPrice = 0
      }
    },
    handleSel(item) {
      this.info.price_lists.forEach((itm, idx) => {
        if (itm.id === item.id) {
          itm.sel = true
          this.selPrice = itm
        } else {
          itm.sel = false
        }
      })
    },
    handleBack() {
      history.go(-1);
    },
  },
  mounted() {
     this.productCreateOrder()
  },
}
</script>
<style lang="less" scoped>
.content-section{
  background: #fff;
  padding: 20px 15px;
  margin-bottom: 10px;
  .el-form{
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    &:last-child{
      padding-bottom: 0;
      border-bottom: 0;
      margin-bottom: 0;
    }
  }
}
.header-title{
  padding: 5px 0 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.specifications-wrap {
  font-size: 0;
  .specifications-item {
    display: inline-block;
    margin: 8px 10px 0 0;
    font-size: 14px;
    color: #333333;
    padding: 0px 15px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
    cursor: pointer;
    &.sel {
      color: #b10c79;
      border: 1px solid #f7e6f1;
      background: #fbf3f8;
    }
  }
}
.w175 {
  width: 175px;
}
.w530{
  width: 530px;
}
</style>
