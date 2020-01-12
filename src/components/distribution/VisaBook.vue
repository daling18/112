<template>
  <div class="wrapper">
    <div class="content-header content-section">
      <div class="header-title">
        <span class="color-gray">签证名称：</span>{{ visaInfo.visa_name }}
      </div>
      <el-form label-width="95px" class="info-form">
        <el-form-item label="出发日期">
          <el-date-picker
            class="w175"
            type="date"
            v-model="departureDate"
            :picker-options="dateOptions"
            @change="formData.departure_date=$event"
          />
        </el-form-item>
        <el-form-item label="选择人数" required>
          <el-input-number class="w175" controls :min="0" v-model="formData.adult_num" />
          <span class="color-orange">￥{{ isZhike ? visaInfo.adult_out_price : visaInfo.adult_peer_price }}</span>
          <span class="color-gray">/成人</span>
          <!-- <input-number  class="w175 ml25" controls :min="0" v-model="formData.child_num" />
          <span class="color-orange">￥{{ isZhike ? visaInfo.child_out_price : visaInfo.child_peer_price }}</span>
          <span class="color-gray">/儿童（18岁以下）</span> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="content-body content-section">
      <div class="body-title" v-if="!isZhike">结算方</div>
      <el-form label-width="95px" inline v-if="!isZhike">
        <el-form-item label="代理商" required>
          <div class="ellipsis" style="width: 192px;margin-top: 7px;" v-if="isStore" :title="visaInfo.org_info">
            {{ visaInfo.org_info }}
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
          <el-input v-model="formData.distributor_contacts" placeholder="请输入代理商联系人姓名"/>
        </el-form-item>
        <el-form-item label="联系人电话" required>
          <el-input v-model="formData.distributor_mobile" placeholder="请输入代理商联系人电话"/>
        </el-form-item>
      </el-form>
      <div class="body-title">联系人</div>
      <el-form label-width="95px" inline>
        <el-form-item label="联系人" required>
          <el-input v-model="formData.contact_name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="formData.contact_mobile" placeholder="请输入手机"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.contact_email" placeholder="请输入邮箱"/>
        </el-form-item>
      </el-form>
      <div class="body-title" v-if="adultNum > 0 || childNum > 0">游客信息</div>
      <visa-tourist-form
        v-for="(tourist, idx) in adultTourists"
        :key="'adult-' + idx"
        :tourist="tourist"
        :id-type-map="ID_TYPE_MAP"
        :gender-map="GENDER_MAP"
        :tourist-type-map="TOURIST_TYPE_MAP"
        :index="idx + 1"
      />
      <visa-tourist-form
        v-for="(tourist, idx) in childTourists"
        :key="'child-' + idx"
        :tourist="tourist"
        :id-type-map="ID_TYPE_MAP"
        :gender-map="GENDER_MAP"
        :tourist-type-map="TOURIST_TYPE_MAP"
        :index="adultNum + idx + 1"
        :is-adult="false"
      />
      <div class="body-title">邮寄地址</div>
      <el-form label-width="170px">
        <el-form-item label="联系人" class="w530">
          <el-input v-model="formData.post_contact_name" placeholder="请输入联系人"/>
        </el-form-item>
        <el-form-item label="手机号" class="w530">
          <el-input v-model="formData.post_contact_mobile" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="所在城市" class="w530">
          <select-area @change="handlePostAreaChange"/>
        </el-form-item>
        <el-form-item label="详细地址" class="w530">
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
        <router-link v-if="key == '1' && isStore" :to="{path: '/finace/balance-particulars-my', query: {settlement_org_id: visaInfo.fgs_org_id}}">在线充值</router-link>
      </p>
      <div class="footer-total">
        <p>订单金额：<span class="color-orange f18">￥{{ isZhike ? totalSalePrice : totalPrice }}</span></p>
        <p class="color-gray">建议金额：<span class="f18">￥{{ totalSalePrice }}</span></p>
      </div>
      <div class="color-gray mt10">温馨提示: 提交订单后，请在15分钟内完成支付，未在规定时间内完成，系统将会自动取消您的订单</div>
      <div class="submit-buttons">
        <el-button type="primary" size="large" @click="handleSubmit">提交</el-button>
        <el-button size="large" @click="handleBack">返回</el-button>
      </div>
    </div>
    <online-pay
      ref="onlinePay"
      :order-id="orderId"
      order-resource="4"
    />
  </div>
</template>

<script>
import SelectOrg from 'src/plugins/SelectOrg.vue';
import InputNumber from 'src/plugins/InputNumber.vue';
import SelectArea from 'src/plugins/SelectArea.vue';
// import SelectVisaPlace from 'src/components/self-support/components/SelectVisaPlace.vue';
import VisaTouristForm from './components/VisaTouristForm.vue';
import { addOrder, todoAddOrder } from 'src/api/selfsupport.visa';
import { formatPrice } from 'src/utils/format';
import { getPurchaseAmount } from 'src/api/orgination'
import OnlinePay from './components/OnlinePay.vue';


export default {
  components:{
    SelectOrg,
    VisaTouristForm,
    // SelectVisaPlace,
    InputNumber,
    SelectArea,
    OnlinePay
  },
  data() {
    const {id, type} = this.$route.query;

    return {
      DEFAULT_ORG_LIST: [],
      GENDER_MAP: {},
      TOURIST_TYPE_MAP: {},
      ID_TYPE_MAP: {},
      PAY_TYPE_MAP: {},
      ORG_TYPE: +localStorage.getItem('orgtype'),
      departureDate: '',
      visaInfo: {
        adult_peer_price: 0,
        child_peer_price: 0,
        adult_out_price: 0,
        child_out_price: 0,
      },
      // sendCity: {},
      adultTourists: [],
      childTourists: [],
      validPrice: 0, // 可下单金额
      dateOptions: {
        // 限制预订时间的可选开始时间
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      orderId: '',
      formData: {
        visa_id: id,
        order_type: type,
        pay_type: '',
        departure_date: '',
        adult_num: 0,
        child_num: 0,
        distributor_id: '',
        distributor_contacts: '',
        distributor_mobile: '',
        contact_name: '',
        contact_mobile: '',
        contact_email: '',
        tourist_list: [],
        post_contact_name: '',
        post_contact_mobile: '',
        post_province_name: '',
        post_city_name: '',
        post_district_name: '',
        post_address: '',
      }
    }
  },
  computed:{
    isStore() { // 是否是营业部
      return this.ORG_TYPE == '5';
    },
    isZhike() { // 是否是直客下单
      return this.formData.order_type == 1;
    },
    adultNum() {
      return this.adultTourists.length;
    },
    childNum() {
      return this.childTourists.length;
    },
    totalPrice() {
      const adultPrice = this.adultNum * this.visaInfo.adult_peer_price;
      const childPrice = this.childNum * this.visaInfo.child_peer_price;

      return formatPrice(adultPrice + childPrice);
    },
    totalSalePrice() {
      const adultPrice = this.adultNum * this.visaInfo.adult_out_price;
      const childPrice = this.childNum * this.visaInfo.child_out_price;

      return formatPrice(adultPrice + childPrice);
    }
  },
  watch: {
    'formData.adult_num'(val){
      let len = (val || 0);

      if(len >= this.adultNum){
        for(let i = this.adultNum; i < len; i++){
          this.adultTourists.push(this.getInitTourist());
        }
      }else{
        this.adultTourists = this.adultTourists.slice(0, len);
      }
    },
    'formData.child_num'(val){
      let len = (val || 0);

      if(len >= this.childNum){
        for(let i = this.childNum; i < len; i++){
          this.childTourists.push(this.getInitTourist());
        }
      }else{
        this.childTourists = this.childTourists.slice(0, len);
      }
    }
  },
  mounted(){
    this.getOrderInfo();
  } ,
  methods: {
    getInitTourist: VisaTouristForm.getInitTourist,
    getOrderInfo() {
      const {id, type} = this.$route.query;
      let params = {data: {
        visa_id: id,
        order_type: type
      }};
      addOrder({
        params,
        success: res => {
          const {code, data} = res.data;
          if(code !== 0){
            this.$message({message: res.data.msg, type: 'error'});
            this.handleBack();
            return; 
          }
          
          if(Array.isArray(data.org_info)){
            this.DEFAULT_ORG_LIST = data.org_info;
          }
          this.GENDER_MAP = data.gender_list;
          this.TOURIST_TYPE_MAP = data.tourist_type_list;
          this.ID_TYPE_MAP = data.id_type_list;
          //this.PAY_TYPE_MAP = data.pay_type_list;
          // 分公司登陆时：直客订单只可以在线支付，同行订单只可以可下单金额支付
          // if(!this.isStore){
          //   if(this.isZhike){
          //     this.PAY_TYPE_MAP = {2: data.pay_type_list[2]};
          //     this.formData.pay_type = '2';
          //   }else{
          //     this.PAY_TYPE_MAP = {1: data.pay_type_list[1]};
          //     this.formData.pay_type = '1';
          //   }
          // }else {
          //   this.PAY_TYPE_MAP = data.pay_type_list;
          // }
          // 仅在线支付  https://gq9mh8.axshare.com/#g=1&p=%E5%8D%95%E9%A1%B9%E9%9C%80%E6%B1%82%E8%B0%83%E6%95%B4181112%EF%BC%88v2_0_0%EF%BC%89
          this.PAY_TYPE_MAP = {2: data.pay_type_list[2]};
          this.formData.pay_type = '2';

          this.visaInfo = data;
          this.formData.adult_num = 1;
          this.adultTourists = [this.getInitTourist()];
          this.validPrice = data.purchase_amount || 0;
          // this.handleAddTourist();
        },
        showLoading: true
      });
    },
    handleDistributorChange(org){
      if(org){
        let orgId = org.org_id;
        this.formData.distributor_id = orgId;
        this.validPrice = '';
        getPurchaseAmount({
          params: { data: { settlement_org_id: orgId } },
          success: res => {
            const {code, data} = res.data;
            if(code === 0 && this.formData.distributor_id == orgId){
              console.log('code:', code, data);
              this.validPrice = data.purchase_amount || 0;
              return; 
            }
            
          }
        });
      }else{
        this.formData.distributor_id = '';
        this.validPrice = 0;
      }
    },
    handlePostAreaChange(level, area, value){
      switch(level){
      case 0:
        this.formData.post_province_name = area.area_name || '';
        break;
      case 1:
        this.formData.post_city_name = area.area_name || '';
        break;
      case 2:
        this.formData.post_district_name = area.area_name || '';
        break;
      }
    },
    handleSubmit(){
      const { adultTourists, childTourists, formData } = this;
      formData.tourist_list = adultTourists.concat(childTourists);
      // console.log('submit');

      todoAddOrder({
        params: { data: formData },
        success: res => {
          const {code, data} = res.data;

          if (res.data.code == '0') {
            this.orderId = data.order_id;
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
                    let path = '../visa-order/detail';
                    
                    done();
                    this.$router.push({path, query: {order_id: data.order_id, pay_type: formData.pay_type}});
                  }
                }
              }).catch((e)=>{
                console.log('cancel: ', e);
              })
            })
            
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
          // this.handleAddTourist();
        },
        showLoading: true
      });
    },
    handleBack() {
      history.go(-1);
    },
  }
}
</script>

<style scoped lang="less">
.ml25{
  margin-left: 25px;
}

.w100p{
  width: 100%;
}

.w175{
  width: 175px;
}

.w530{
  width: 530px;
}

.el-form--inline .el-form-item, .el-form-item:last-child {
  margin-bottom: 0;
}

.el-form-item {
  margin-bottom: 10px;
}

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

.body-title{
  margin: 0 0 20px;
  font-weight: bold;
}

.footer-total{
  padding: 20px 15px;
  margin-top: 20px;
  background-color: #fbf3f8;
}

</style>
