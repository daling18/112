<template>
  <div class="wrapper">
    <div class="order-header">
      <div class="header-title">
        <span class="color-purple">【{{ orderInfo.tuan_no }}】</span>
        {{ orderInfo.tuan_name }}
        <el-tag v-if="orderInfo.line_type_name">{{ orderInfo.line_type_name }}</el-tag>
      </div>
      <div class="header-content">
        <label class="color-gray">出发城市</label>{{ orderInfo.departure_city }}<br>
        <label class="color-gray">出发日期</label><span class="w265">{{ orderInfo.departure_date }}</span>
        <label class="color-gray">返回日期</label>{{ orderInfo.back_date }}
      </div>
    </div>
    
    <div class="content-left fl bg-white">
      <div class="settle-section plr15">
        <div class="module-title">结算信息</div>
        <div class="module-content">
          <div class="field-item">
            <div class="field-label"><span class="color-red">* </span>代理商</div>
            <div class="field-content">
              <select-org
                v-if="Array.isArray(orderInfo.org_info)"
                v-model="orgination"
                hide-del
                filter-yingke
                :org-types="[1,3,6,7,8]"
                placeholder="请输入关键词"
                :default-list="DEFAULT_ORG_LIST"
              />
              <template v-else>{{ orderInfo.org_info }}</template>
            </div>
          </div>
          <div class="field-item">
            <div class="field-label"><span class="color-red">* </span>联系人姓名</div>
            <div class="field-content">
              <el-input v-model="orderFormData.distributor_real_name"/>
            </div>
          </div>
          <div class="field-item">
            <div class="field-label">联系电话</div>
            <div class="field-content">
              <input-number  v-model="orderFormData.distributor_mobile" />
            </div>
          </div>
        </div>
      </div>
      <div class="tourist-section plr15">
        <div class="module-title clear">游客信息
          <div class="fr export-excel-section">
            <a :href="orderInfo.import_url" target="_blank">游客信息模板下载</a>
            <el-upload
              style="display:inline-block; margin-left:10px;"
              action="/bom/api/tuan/import_tourists"
              :data="uploadData"
              name="file"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :show-file-list="false">
              <el-button type="primary">导入excel</el-button>
            </el-upload>
          </div>
        </div>
        <div class="module-content">

          <div class="tourist-item" v-for="(tourist, idx) in touristList" :key="tourist.id">
            <line-tourist-form
              :tourist="tourist"
              :card-type-map="CARD_TYPE"
              :extra-info-list="EXTRA_INFO"
              @group-change="handleCalcTouristDetail" />
            <div class="tourist-no">{{ idx + 1 }}</div>
            <div class="opt-btns">
              <a class="add-btn" href="javascript:;" @click="handleAddTourist()" />
              <a class="sub-btn" href="javascript:;" v-if="touristList[1]" @click="handleDelTourist(idx)" />
            </div>
          </div>
        </div>
      </div>
      <div class="submit-section">
        <div class="total">
          订单总价  <span class="color-orange">￥</span><span class="color-orange font24">{{ isZhiKe || isStore ? salePrice : settlePrice }}</span>
        </div>
        <div class="submit-buttons">
          <el-button type="primary" @click="handleSubmitForm">保存</el-button>
          <el-button @click="handleBack">返回</el-button>
        </div>
      </div>
    </div>

    <div class="content-right fl">
      <div class="price-title">
        <div class="module-title">价格明细</div>
      </div>
      <div class="price-list bg-white">
        <div class="price-item">
          <b class="color-orange">销售总价 {{ salePrice }}</b>&nbsp;&nbsp;
          <b v-if="!isStore">结算总价 {{ settlePrice }}</b>
        </div>
        <div class="price-item" v-for="(detail, idx) in touristDetailList" :key="'tourist_' + idx">
          {{ detail.name }} * {{ detail.num }} ({{ isZhiKe || isStore ? detail.outExp : detail.peerExp }}) = <span class="color-orange">{{ isZhiKe || isStore ? detail.totalOutPrice : detail.totalPeerPrice }}</span>
        </div>
        <div class="price-item" v-for="(detail, idx) in priceDetailList" :key="'price_' + idx">
          {{ detail.item_name || ('项目' + (idx + 1)) }} * {{ detail.num }} ({{ detail.operator == '-' && detail.unit_price ? '-' : '' }}{{ detail.unit_price || 0 }}) = <span class="color-orange">{{ detail.totalPrice }}</span>
        </div>
      </div>
      <div class="add-price-btn tac bg-white color-purple" v-if="!isStore" @click="handleAddPriceDetail()">+ 添加价格明细</div>
      <order-price-item
        class="bg-white"
        v-for="(item, idx) in priceDetailList"
        :key="idx"
        :item="item"
        :tourist-list="touristList"
        @add="handleAddPriceDetail()"
        @sub="handleDelPriceDetail(idx)"
      />
    </div>
    <div class="clearfix" />
  </div>
</template>
<script>
import _ from 'lodash';
// import { 
//   getOrderForm, 
//   setOrderForm, 
//   getOrderZhikeForm, 
//   setOrderZhikeForm
// } from 'src/api/api';
import {
  saleAddOrder,
  saleAddZhikeOrder,
  saleTodoAddOrder,
  saleTodoAddZhikeOrder,
} from 'src/api/tuan';
import * as format from 'src/utils/format';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import WorldSelect from 'src/plugins/WorldSelect.vue';
import SelectOrg from 'src/plugins/SelectOrg.vue';
import InputNumber from 'src/plugins/InputNumber.vue';
import OrderPriceItem from './OrderPriceItem.comp.vue';
import LineTouristForm from './components/LineTouristForm.vue';

export default {
  components: {
    CurrencyPicker,
    WorldSelect,
    SelectOrg,
    InputNumber,
    OrderPriceItem,
    LineTouristForm
  },
  filters: {
    formatPrice(price){
      const num = Number(price) || 0;

      return Number(format.toFixed(num, 3));
    }
  },
  data() {
    let { id: tuan_id, sale_org_id } = this.$route.query;
    
    // tuan_id = 991;
    // product_index_id = 20;
    // resource_type = 1;

    return {
      tuanId: tuan_id,
      // isOther: !!sale_org_id, // 是否是其他公司的产品
      // productIndexId: product_index_id,
      // resourceType: resource_type,
      orderInfo: '',
      CARD_TYPE: {},
      DEFAULT_ORG_LIST: [],
      EXTRA_INFO: [],
      touristList:[],
      touristDetailList: [],  // 价格明细展示的列表
      priceDetailList: [],
      orderFormData: {
        id: '',
        tuan_id: tuan_id,
        // product_index_id: product_index_id,
        // resource_type: resource_type,
        distributor_org_id: 0,
        distributor_org_name: '',
        distributor_real_name: '',
        distributor_mobile: ''
      },
      
      BOM_TRIP_TOURIST_TYPE: {},  // bom行程人群类型项
      TOURIST_TYPE: {},
      ORDER_STATUS_LISTS: {},
      addTouristGroup:{},
      touristGroups: [],
      uploadContracts: [],
      uploadFileNo: 0,
      settlementAmount: 0,
      rmbSettlementAmount: 0
    };
  },
  computed: {
    isBOMTrip(){ // 是否是bom行程团
      return this.orderInfo && this.orderInfo.type == 3;
    },
    isZhiKe(){
      return this.$route.meta && this.$route.meta.isZhiKe;
    },
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isStore(){ // 是否是门店下单
      return !this.isZhiKe && this.orderFormData.distributor_org_id == 0 && this.orderFormData.distributor_org_name;
    },
    getOrderInfoFunc() {
      switch(this.topMenuConst) {
      case 'distribution':
        return this.isZhiKe ? saleAddZhikeOrder : saleAddOrder;
      // case 'operator':
      //   return this.isZhiKe ? getOrderZhikeForm : getOrderForm;
      default:
        return this.emptyFunc(this.topMenuConst + ' not getOrderForm')
      }
    },
    setOrderInfoFunc() {
      switch(this.topMenuConst) {
      case 'distribution':
        return this.isZhiKe ? saleTodoAddZhikeOrder : saleTodoAddOrder;
      // case 'operator':
      //   return this.isZhiKe ? setOrderZhikeForm : setOrderForm;
      default:
        return this.emptyFunc(this.topMenuConst + ' not setOrderForm')
      }
    },
    orgination: {
      get: function() {
        let org = null;

        if(this.orderFormData.distributor_org_id){
          return {
            org_id: this.orderFormData.distributor_org_id, 
            org_name: this.orderFormData.distributor_org_name
          };
        }
        return org;
      },
      set: function(val) {
        val = val || {};

        this.orderFormData.distributor_org_id = val.org_id;
        this.orderFormData.distributor_org_name = val.org_name;
      }
    },
    uploadData () {
      return {id: this.tuanId}
    },
    EXTRA_MAP() {
      let map = {};

      this.EXTRA_INFO.forEach(extra => {
        let detail = {};

        extra.detail.forEach(item => {
          detail[item.id] = item;
        });
        map[extra.id] = detail;
      });
      
      return map;
    },
    defaultTouristPriceDetail(){
      const {
        orderInfo: {price_info: { out_price, peer_price }},
        EXTRA_INFO
      } = this;
      const detail = {
        id: '',
        group: this.getInitGroup(),
        name: '',
        num: 1,
        outExp: out_price, 
        peerExp: peer_price, 
        outTotal: out_price,
        peerTotal: peer_price
      };

      if (Array.isArray(EXTRA_INFO)) {
        EXTRA_INFO.forEach(g => {
          const extra = g.detail[0];
          const outPrice = extra.diff_out_price;
          const peerPrice = extra.diff_peer_price;

          detail.id += `_${g.id}.${extra.id}`;
          detail.name += ` + ${extra.name}`;
          detail.outExp += outPrice >= 0 ? ` + ${outPrice}` : ` - ${-outPrice}`;
          detail.peerExp += peerPrice >= 0 ? ` + ${peerPrice}` : ` - ${-peerPrice}`;
          detail.outTotal += outPrice;
          detail.peerTotal += peerPrice;
        });
        detail.id = detail.id.substr(1);
        detail.name = detail.name.substr(3);
        detail.outTotal = parseFloat(detail.outTotal.toFixed(2));
        detail.peerTotal = parseFloat(detail.peerTotal.toFixed(2));
      }

      return detail;
    },
    salePrice() {
      let price = 0;
      
      this.touristDetailList.forEach(item => {
        price += item.totalOutPrice;
      });
      this.priceDetailList.forEach(item => {
        price += item.totalPrice;
      });

      return parseFloat(price.toFixed(2));
    },
    settlePrice() {
      let price = 0;
      
      this.touristDetailList.forEach(item => {
        price += item.totalPeerPrice;
      });
      this.priceDetailList.forEach(item => {
        price += item.totalPrice;
      });

      return parseFloat(price.toFixed(2));
    }
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    emptyFunc(msg){
      return function() {
        console.log(msg + ' arguments: ', arguments);
      }
    },
    getInitGroup(){
      let initGroup = [];

      if(Array.isArray(this.EXTRA_INFO)){
        this.EXTRA_INFO.forEach(item => {
          initGroup.push({
            extra_id: item.id,
            id: item.detail[0] && item.detail[0].id
          });
        });
      }
      return initGroup;
    },
    getInitTourist() {
      let id = 1;
      const touristLen = this.touristList.length;
      const tourist = LineTouristForm.getInitTourist();

      if(touristLen > 0){
        id = parseInt(this.touristList[touristLen - 1].id) + 1;
      }

      tourist.id = id;
      tourist.group = this.getInitGroup();

      return tourist;
    },
    addTourist(tourist) {
      const detail = this.defaultTouristPriceDetail;
      const price = this.isZhiKe || this.isStore ? detail.outTotal : detail.peerTotal;
      let touristDetail = '';
      let detailIndex = -1;
      const compareFun = (item, idx) => {
        if(tourist && item.id == detail.id){
          touristDetail = item;
          detailIndex = idx;
          return true;
        }
      };

      if(this.touristDetailList.some(compareFun)){
        console.log('tourist detail', touristDetail.num)
        touristDetail.num ++;
        // touristDetail.totalPrice += price;
        // touristDetail.totalPrice = parseFloat(touristDetail.totalPrice.toFixed(2));
        touristDetail.totalOutPrice += detail.outTotal;
        touristDetail.totalPeerPrice += detail.peerTotal;
        touristDetail.totalOutPrice = parseFloat(touristDetail.totalOutPrice.toFixed(2));
        touristDetail.totalPeerPrice = parseFloat(touristDetail.totalPeerPrice.toFixed(2));
      } else {
        // detail.totalPrice = price;
        detail.num = 1; // defaultTouristPriceDetail为固定值，没重置会导致num显示内容错误
        detail.totalOutPrice = detail.outTotal;
        detail.totalPeerPrice = detail.peerTotal;
        this.touristDetailList.push(detail);
      }
      tourist.price = price;

      this.touristList.push(tourist);
    },
    getOrderInfo() {
      const { sale_org_id } = this.$route.query;
      let params = {data: {
        tuan_id: this.tuanId,
        // product_index_id: this.productIndexId,
        // resource_type: this.resourceType
      }};

      if(sale_org_id){
        params.data.sale_org_id = sale_org_id
      }
      this.getOrderInfoFunc({
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
          }else{
            this.orderFormData.distributor_org_name = data.org_info;
          }
          this.CARD_TYPE = data.card_type;
          this.EXTRA_INFO = data.extra_info;
          this.orderInfo = data;
          // this.touristList = [this.getInitTourist()];
          this.handleAddTourist();
        },
        showLoading: true
      });
    },
    genTouristPriceDetail(tourist){
      const {
        orderInfo: {price_info: { out_price, peer_price }},
        EXTRA_MAP
      } = this;
      const detail = {
        id: '',
        group: tourist.group,
        name: '',
        num: 1,
        outExp: out_price, 
        peerExp: peer_price, 
        outTotal: out_price,
        peerTotal: peer_price,
        // totalPrice: 0,
        totalOutPrice: 0,
        totalPeerPrice: 0
      };

      if (Array.isArray(tourist.group)) {
        tourist.group.forEach(it => {
          const extra = EXTRA_MAP[it.extra_id][it.id];
          const outPrice = extra.diff_out_price;
          const peerPrice = extra.diff_peer_price;

          detail.id += `_${it.id}.${extra.id}`;
          detail.name += ` + ${extra.name}`;
          detail.outExp += outPrice >= 0 ? ` + ${outPrice}` : ` - ${-outPrice}`;
          detail.peerExp += peerPrice >= 0 ? ` + ${peerPrice}` : ` - ${-peerPrice}`;
          detail.outTotal += outPrice;
          detail.peerTotal += peerPrice;
        });
        detail.id = detail.id.substr(1);
        detail.name = detail.name.substr(3);
        detail.outTotal = parseFloat(detail.outTotal.toFixed(2));
        detail.peerTotal = parseFloat(detail.peerTotal.toFixed(2));
      }

      return detail;
    },
    issuePlaceRequired(type){
      // 证件类型为“护照、港澳通行证、台湾通行证”时，必填
      const REQUIRED_TYPES = ['护照', '港澳通行证', '台湾通行证']

      return REQUIRED_TYPES.indexOf(type) != -1
    },
    /** 
     * 游客信息验证：1. 直客订单游客信息不能为空；2. 同行订单游客允许不填
     */
    // checkTouristList(){
    //   let touristList = [];
    //   let state = this.touristList.some((item, idx) => {
    //     if(!item.username){
    //       this.$message.error(`请填写第${idx + 1}个游客姓名`);
    //       return true;
    //     }
    //     // if(!item.gender){
    //     //   this.$message.error(`请填写第${idx + 1}个游客性别`);
    //     //   return true;
    //     // }
    //     if(!item.identity_no){
    //       this.$message.error(`请填写第${idx + 1}个游客证件号码`);
    //       return true;
    //     }
    //     // if(!item.mobile){  // 证件号可能关联有效期输入框验证，导致下面验证早于有效期验证。所以这部分验证放到后端验证
    //     //   this.$message.error(`请填写第${idx + 1}个游客手机号码`);
    //     //   return true;
    //     // }
    //     //生成提交的数据
    //     touristList.push(item);
    //     return false;
    //   });
    //   this.orderFormData.tourist_lists = touristList;
    //   return state;
    // },
    // checkOrderPriceDetail(){
    //   let priceDetailList = [];
    //   const allTouristIds = this.touristList.map(item => item.id);
    //   let state = false;

    //   // if(!Array.isArray(order_price_detail) || order_price_detail.length == 0){
    //   //   this.$message.error('请添加订单价格明细记录');
    //   // }
    //   state = this.priceDetailList.some((item, idx) => {
    //     if(!item.item_name){
    //       this.$message.error(`请填写第${idx + 1}项的项目名称`);
    //       return true;
    //     }
    //     if(!item.num){
    //       this.$message.error(`请填写第${idx + 1}项的数量`);
    //       return true;
    //     }
    //     if(item.unit_price <= 0 && item.isadd){
    //       this.$message.error(`请填写第${idx + 1}项的单价`);
    //       return true;
    //     }
    //     if(item.alloc_type == 2 && item.tourist_ids.length == 0){
    //       this.$message.error(`请选择第${idx + 1}项指定的游客`);
    //       return true;
    //     }else if(item.alloc_type == 1){
    //       item.tourist_ids = allTouristIds;
    //     }
    //     priceDetailList.push(item);
    //     return false;
    //   });

    //   this.orderFormData.order_price_detail = priceDetailList;
    //   return state;

    // },
    redirectToDetail(id) {
      
      switch(this.topMenuConst) {
      // case 'sale':
      //   this.$router.push({path: `/sale/order/detail/${this.tuanId}/${id}`, query: { id: this.tuanId }});
      //   break;
      // case 'operator':
      //   this.$router.push({path: `/control/order-details/${this.tuanId}/${id}`, query: { id: this.tuanId }});
      //   break;
      case 'distribution':
        const prefixPath = this.isStore ? '/distribution/line-purchase-order/' : '/distribution/line-order/';
        this.$router.push({path: `${prefixPath}order-detail/${this.tuanId}/${id}`, query: { id: this.tuanId }});
        break;
      default:
      }
    },
    showLoading(bool) {
      const loading = Vue.$loading({ fullscreen: true })
      // loading 为单例对象
      if (!bool) {
        loading.close();
      }
    },
    handleBeforeUpload() {
      this.showLoading(true)
    },
    handleUploadSuccess(resp, file) {
      let touristList = [];

      if (resp.code == 0 && resp.data) {
        let id = 1;
        const { data } = resp.data;
        const touristLen = this.touristList.length;
        const initTourist = LineTouristForm.getInitTourist();

        if(touristLen > 0){
          id = parseInt(this.touristList[touristLen - 1].id) + 1;
        }

        if (Array.isArray(data)) {
          data.forEach(item => {
            let tourist = { ...initTourist, ...item, id: id, group: this.getInitGroup()}
            this.addTourist(tourist)
            ++id;
          })
        }
        this.$message.success('导入成功');
      }else{
        this.$message.error(resp.msg);
      }
      this.showLoading(false)
    },
    handleUploadError() {
      this.showLoading(true)
    },
    // 根据身份证号，自动生成生日
    handleAutoBirth(e) {
      let tmpY = null,
        tmpM = null,
        tmpD = null;
      if (e.identity_type == '身份证' && e.identity_no.length == 18) {
        tmpY = e.identity_no.substring(6, 10);
        tmpM = e.identity_no.substring(10, 12);
        tmpD = e.identity_no.substring(12, 14);
        e.birthday = tmpY + '-' + tmpM + '-' + tmpD;
      }
    },
    handleCalcTouristDetail(){
      const {
        touristList,
        EXTRA_MAP,
        isZhiKe,
        isStore
      } = this;
      let touristDetailList = {};

      touristList.forEach(tourist => {
        let detail = this.genTouristPriceDetail(tourist);
        let touristDetail = touristDetailList[detail.id];
        const price = isZhiKe || isStore ? detail.outTotal : detail.peerTotal;

        if(touristDetail){
          touristDetail.num ++;
          touristDetail.totalOutPrice += detail.outTotal;
          touristDetail.totalPeerPrice += detail.peerTotal;
          touristDetail.totalOutPrice = parseFloat(touristDetail.totalOutPrice.toFixed(2));
          touristDetail.totalPeerPrice = parseFloat(touristDetail.totalPeerPrice.toFixed(2));
        } else {
          detail.totalOutPrice = detail.outTotal;
          detail.totalPeerPrice = detail.peerTotal;
          touristDetailList[detail.id] = detail;
        }
        tourist.price = price;
      });

      this.touristDetailList = Object.values(touristDetailList);
    },
    handleAddTourist() {
      const tourist = this.getInitTourist();
      this.addTourist(tourist)
    },
    handleDelTourist(idx) {
      const tourist = this.touristList.splice(idx, 1)[0];
      const id = tourist.group.map(it => `${it.extra_id}.${it.id}`).join('_');
      let touristDetail = '';
      let detailIndex = -1;
      let compareFun = (item, idx) => {
        if(tourist && item.id == id){
          touristDetail = item;
          detailIndex = idx;
          return true;
        }
      };

      if(this.touristDetailList.some(compareFun)){
        if(touristDetail.num > 1){
          touristDetail.num --;
          // touristDetail.totalPrice -= this.isZhiKe ? touristDetail.outTotal : touristDetail.peerTotal;
          // touristDetail.totalPrice = parseFloat(touristDetail.totalPrice.toFixed(2));
          touristDetail.totalOutPrice -= touristDetail.outTotal;
          touristDetail.totalPeerPrice -= touristDetail.peerTotal;
          touristDetail.totalOutPrice = parseFloat(touristDetail.totalOutPrice.toFixed(2));
          touristDetail.totalPeerPrice = parseFloat(touristDetail.totalPeerPrice.toFixed(2));
        }else{
          this.touristDetailList.splice(detailIndex, 1);
        }
      }
      this.priceDetailList.forEach((item) => {
        if(item.tourist_ids.length > 0){
          let newIds = item.tourist_ids.filter(id => id != tourist.id);
          // console.log('new ids: ', newIds, item.tourist_ids)
          if(newIds.length < item.tourist_ids.length){
            item.tourist_ids = newIds;
            this.handleCalcPriceDetailPrice(item);
          }
        }
      })
    },
    handleCalcPriceDetailPrice(detail, $event){
      let total = detail.num * detail.unit_price;
      let avg = 0;

      if(total){
        total = parseFloat(total.toFixed(2));
        if(detail.tourist_ids.length){
          avg = total / detail.tourist_ids.length;
          avg = parseFloat(avg.toFixed(2));
        }
      }else{
        total = 0;
      }

      detail.totalPrice = detail.operator == '-' ? -total : total;
      detail.avgPrice = detail.operator == '-' ? -avg : avg;
    },
    handleAddPriceDetail() {
      let priceDetail = OrderPriceItem.getInitPriceDetail();

      this.priceDetailList.push(priceDetail);
    },
    handleDelPriceDetail(idx){
      this.priceDetailList.splice(idx, 1);
    },
    handleSubmitForm(){
      const {orderFormData, touristList, priceDetailList, isZhiKe, orderInfo} = this;
      const {other_type_num, other_type_peer_price} = orderInfo;
      const allTouristIds = [];
      const { sale_org_id } = this.$route.query;

      if(sale_org_id){
        orderFormData.sale_org_id = sale_org_id
      }

      if(!orderFormData.distributor_org_name){
        return this.$message.error('请填写代理商');
      }
      if(!orderFormData.distributor_real_name){
        return this.$message.error('请填写联系人姓名');
      }
      
      // 格式化日历插件的时间，日历插件默认返回Date类型时间
      touristList.forEach(item => {
        item.identity_end_date = item.identity_end_date ? format.date(item.identity_end_date) : '';
        item.birthday = item.birthday ? format.date(item.birthday) : '';
        allTouristIds.push(item.id);
      });

      // this.checkTouristList();
      orderFormData.tourist_lists = touristList;

      // this.checkOrderPriceDetail();
      priceDetailList.forEach(item => {
        if(item.alloc_type == 1){
          item.tourist_ids = allTouristIds;
        }
      })
      orderFormData.order_price_detail = priceDetailList;
      // return false
      
      this.setOrderInfoFunc({
        params: {data: orderFormData},
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == '0' ? 'success' : 'error'
          });
          if (res.data.code == '0') {
            this.redirectToDetail(res.data.data.id);
          }
        },
        showLoading: true
      });
    },
    handleBack() {
      history.go(-1);
    },
  }
};
</script>

<style scoped lang="scss">
.order-header{
  background: #fff;
  padding: 25px 20px;
  line-height: 24px;
  margin-bottom: 10px;
  .header-title{
    font-size: 18px;
    margin-left: -10px;
  }
  .el-tag{
    background-color: #fbf3f8;
    vertical-align: top;
    color: #b10c79
  }
  .header-content{
    margin-top: 7px;
  }
  .color-gray {
    margin-right: 30px;
  }
  .w265{
    width: 265px;
    display: inline-block;
  }
}
.content-left{
  width: 63.65%;
  overflow: hidden;
}
.content-right{
  width: 36.35%;
  padding-left: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.module-title {
  padding-left: 10px;
  font-size: 18px;
  color: #b10c79;
  border-left: 5px solid #c10c79;
  line-height: 18px;
}
.export-excel-section{
  margin-top: -7px;
  font-size: 14px;
}
.bg-white{
  background: #fff;
}
.plr15{
  padding: 0 15px;
}
.field-item{
  display: flex;
  padding: 5px;
}
.field-label{
  width: 130px;
  text-align: right;
  color: #999;
  margin-right: 15px;
  line-height: 35px;
}
.field-content{
  width: 350px;
  align-self: center;
  line-height: 1.5;
}
.el-select{
  width: 100%;
}

.settle-section{
  .module-title{
    margin: 35px 0 25px;
  }
}
.tourist-section{
  .module-title{
    margin: 25px 0;
  }
  .tourist-item{
    border: 1px dashed #ccc;
    padding: 11px 0;
    position: relative;
    margin-bottom: 15px;
    .tourist-form{
      width: 555px;
    }
  }
  .tourist-no{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 16px;
    left: 10px;
    background-color: #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    color: #fff;
    font-size: 16px;
    overflow: hidden;
  }
  .opt-btns{
    position: absolute;
    top: 22px;
    right: 10px;
  }
}
.submit-section{
  border-top: 10px solid #e4e4e4;
  .font24{
    font-size: 24px;
  }
  .total{
    background: #fbf3f8;
    text-align: center;
    padding: 25px 0 20px;
  }
  .submit-buttons{
    padding: 30px 0 38px;
  }
}
.price-title{
  background: #f4f4f4;
  padding: 15px 10px 12px;
}
.price-list{
  padding: 0 10px;
  .price-item{
    word-break: break-all;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    &:last-child{
      border-bottom: none;
    }
  }
}
.add-price-btn{
  margin-top: 10px;
  padding: 17px;
  font-size: 16px;
  cursor: pointer;
}
</style>

