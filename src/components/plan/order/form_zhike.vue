<template>
  <div class="wrapper">
    <div class="module-box">
      <div class="module-title">
        <h5>团队信息</h5>
      </div>
      <div class="module-content">
        <div class="title">
          <span class="color-purple">【{{ tuanInfo.tuan_no }}】</span>
          {{ tuanInfo.tuan_name }}
          <el-tag v-if="tuanInfo.line_type_name">{{ tuanInfo.line_type_name }}</el-tag>
        </div>
        <div>
          <label class="field-label">出发城市</label><span class="field-content">{{ tuanInfo.departure_city }}</span>
          <label class="field-label">出发日期</label><span class="field-content">{{ tuanInfo.departure_date }}</span>
          <label class="field-label">返回日期</label><span class="field-content">{{ tuanInfo.back_date }}</span>
          <router-link v-if="isBOMTrip && $menuPermission('api/product/step1')" class="color-purple" :to="{path: '/tripDetail', query: {id: tuanInfo.product_id}}" target="_blank">查看行程</router-link>
        </div>
        <div v-if="isBOMTrip" class="trip-panel">
          <div class="trip-item" v-for="(item, idx) in tuanInfo.extra_info" :key="idx">
            <div class="field-label">{{ item.name }}</div>
            <div v-if="isDisabledChangeTouristNum">
              <div v-for="extra in item.detail" :key="extra.id"
                   :title="extra.type == 0 ? extra.name : (extra.name + ' ' + (isZhiKe ? extra.diff_out_price : extra.diff_peer_price))"
                   :class="{'extra-item': 1, 'disabled': 1}">
                {{ extra.type == 0 ? extra.name : (extra.name + ' ' + (isZhiKe ? extra.diff_out_price : extra.diff_peer_price)) }}
                <i class="icon-check"/>
              </div>
            </div>
            <div v-else>
              <div v-for="extra in item.detail" :key="extra.id"
                   :title="extra.type == 0 ? extra.name : (extra.name + ' ' + (isZhiKe ? extra.diff_out_price : extra.diff_peer_price))"
                   :class="{'extra-item': 1, 'selected': (addTouristGroup[item.id] && addTouristGroup[item.id].id) == extra.id}"
                   @click="selectTouristGroup(item.id, extra)">
                {{ extra.type == 0 ? extra.name : (extra.name + ' ' + (isZhiKe ? extra.diff_out_price : extra.diff_peer_price)) }}
                <i class="icon-check"/>
              </div>
            </div>
          </div>
          <div class="group-footer" v-if="!isDisabledChangeTouristNum">
            <table border="0" width="100%">
              <tbody>
                <tr><td>
                  基准价{{ basePrice | formatPrice }}元
                  <span v-for="item in addTouristGroup" :key="item.extra_id"> + {{ `${item.name}${(isZhiKe ? item.diff_out_price : item.diff_peer_price)}` }} 元</span>
                  = 单价 <strong class="color-orange">{{ addTouristGroupTotalPrice | formatPrice }}</strong>
                </td><td width="130" v-if="!isDisabledChangeTouristNum">
                  <el-button class="op-btn" type="primary" @click="handleAddTouristGroup">+ 添加</el-button>
                </td></tr>
              </tbody>
            </table>
          </div>
          <div class="trip-summary trip-item" label="已选择" v-if="touristGroups.length > 0">
            <div class="field-label">已选择</div>
            <table border="0" width="100%">
              <tbody>
                <tr v-for="(group, idx) in touristGroups" :key="idx"><td>
                  <div class="extra-item" v-for="extra in group.group" :key="extra.id" :title="extra.name">{{ extra.name }}</div>
                </td><td width="210" align="right" style="padding-right:15px">
                  {{ group.price | formatPrice }}元 * 
                  <el-input :disabled="!!isDisabledChangeTouristNum" style="width:60px" :value="group.num" @input="handleChangeTouristNum(group, $event)"/>人
                </td><td width="150">
                  小计：<span class="color-orange">￥{{ group.total | formatPrice }}</span>
                </td><td align="center" width="40" v-if="!isDisabledChangeTouristNum">
                  <a class="color-purple" href="javascript:;" @click="handleDelTouristGroup(group)">删除</a>
                </td></tr>
              </tbody>
            </table>
          </div>
          <div class="summary-footer">
            合计 <span class="color-orange">{{ touristGroupTotal | formatPrice }}</span>
          </div>
        </div>
        <div class="mode-table" v-else-if="tuanInfo">
          <el-table :data="tuanInfo.price_list" border style="width: 100%">
            <el-table-column label="报价类型" align="center" prop="type_name" :resizable="false"/>
            <el-table-column label="同行单价" align="center" prop="peer_price" :resizable="false"/>
            <el-table-column label="对外单价/指导价" align="center" prop="out_price" :resizable="false"/>
            <el-table-column label="需预付定金单价" align="center" prop="deposit_price" :resizable="false"/>
          <!-- <el-table-column label="单房差" align="center" prop="diff_price" :resizable="false"></el-table-column> -->
          </el-table>
        </div>

      </div>
    </div>

    <div class="module-box" style="padding-bottom:10px;" v-if="!isZhiKe">
      <div class="module-title">
        <h5>结算信息</h5>
      </div>
      <!-- <div v-if="isZhiKe" class="module-content">
      <label class="field-label"><span class="color-red">* </span>上传合同</label>
      <el-upload name="file" style="width: 500px;"
          action="/bom/api/tuan/upload_contract" 
          :data="{tuan_id:$route.query.id}"
          :file-list="uploadContracts" 
          :before-upload="handleBeforeUploadContract"
          :on-remove="handleRemoveUploadFile" 
          :on-success="handleUploadContractSuccess" 
          :on-error="handleUploadContractError" 
          :on-preview="handlePreviewUploadContract" 
      >
        <el-button class="op-btn" type="primary">上传直客合同</el-button>
        <span slot="tip" class="el-upload__tip">&ensp;&ensp;&ensp;&ensp;支持jpeg，png,jpg,pdf等，不可超过10份</span>
      </el-upload>
    </div> -->
      <div class="module-content">
        <!-- <div class="field-item">
        <div class="field-label"><span class="color-red">* </span>订单确认状态</div>
        <div class="field-content">
          <el-select placeholder="请选择" style="width: 150px;" v-model="orderFormData.confirm_status">
            <el-option v-for="(obj, key) in ORDER_STATUS_LISTS" :key="key" :label="obj" :value="Number(key)"></el-option>
          </el-select>
        </div>
      </div> -->
        <div class="field-item" v-if="isStoreSale">
          <div class="field-label"><span class="color-red">* </span>代理商</div>
          <div class="field-content">
            <el-input v-model="tuanInfo.org_name" style="width: 150px;" disabled />
          </div>
        </div>
        <div class="field-item" v-else>
          <div class="field-label"><span class="color-red">* </span>代理商</div>
          <div class="field-content">
            <select-org v-model="orgination" style="width: 150px;" placeholder="请输入关键词" :default-list="DEFAULT_ORG_LIST"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label"><span class="color-red">* </span>联系人姓名</div>
          <div class="field-content">
            <el-input v-model="orderFormData.distributor_real_name" style="width: 150px;"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label">联系电话</div>
          <div class="field-content">
            <input-number  v-model="orderFormData.distributor_mobile" style="width: 150px;" />
          </div>
        </div>
      </div>
    </div>

    <div class="module-box">
      <div class="module-title">
        <h5>游客信息</h5>
      </div>
      <div class="module-content">
        <div>
          <div class="field-label">出游人数</div>
          <div class="field-content" v-if="isBOMTrip">
            {{ tripTouristNumStr }}
          </div>
          <div class="field-content" v-else>
            <span>成人</span>
            <el-input class="w80"
                      :value="orderFormData.adult_num"
                      @input="handleChangeTouristNum('adult_num', $event)"/>
            <span v-if="tuanInfo.child_peer_price != 0">儿童</span>
            <el-input class="w80"
                      :value="orderFormData.child_num"
                      @input="handleChangeTouristNum('child_num', $event)"
                      v-if="tuanInfo.child_peer_price != 0"/>
            <template v-for="(o, i) in tuanInfo.other_type_num">
              <span :key="'span'+i">{{ o.name }}</span>
              <el-input :key="'input'+i" class="w80" :value="orderFormData['other_num'+i]" @input="handleChangeTouristNum('other_num'+ i, $event)"/>
            </template>
          </div>
          <div class="search-item search-item-btns">
            <el-upload
              style="display:inline-block; margin-left:10px;"
              action="/bom/api/tuan/import_tourists"
              :data="{id:$route.query.id}"
              name="file"
              :on-success="handleUploadSuccess"
              :show-file-list="false">
              <el-button class="op-btn" type="primary">导入excel</el-button>
            </el-upload>
            <!--<el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button type="primary" >导入excel</el-button>
          </el-upload>-->
            <a class="el-button el-button--default op-btn" :href="tuanInfo.tourist_downloads" target="_blank">下载excel模版</a>
          <!--<a :href="orderFormData.tourist_downloads" target="_blank">下载excel模版</a>-->
          </div>
        </div>

        <div class="mode-table">
          <el-table :data="tourist_lists" style="width: 100%">
            <el-table-column label="姓名" width="140" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.username"/>
              </template>
            </el-table-column>
            <el-table-column label="性别" width="70" align="center">
              <template slot-scope="scope">
                <el-select placeholder="请选择" v-model="scope.row.gender">
                  <el-option label="男" value="男"/>
                  <el-option label="女" value="女"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="游客类型" width="140" v-if="!isBOMTrip" align="center">
              <template slot-scope="scope">
                <el-select v-if="TOURIST_TYPE.length > 1" placeholder="请选择" :value="scope.row.tourist_type" @input="handleChangeTouristType(scope.row, $event)">
                  <el-option v-for="(obj,key) in TOURIST_TYPE" :key="key" :label="obj" :value="obj"/>
                </el-select>
                <span v-else>成人</span>
              </template>
            </el-table-column>
            <el-table-column label="证件类型" width="140" align="center">
              <template slot-scope="scope">
                <el-select placeholder="请选择" v-model="scope.row.identity_type">
                  <el-option v-for="(obj,key) in CARD_TYPE" :key="key" :label="obj" :value="obj"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="证件号码" width="210" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.identity_no" @blur="handleAutoBirth(scope.row)"/>
              </template>
            </el-table-column>
            <el-table-column label="证件有效期" width="140" align="center">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.identity_end_date" type="date" placeholder="选择日期" class="datepick" :editable="false"/>
              </template>
            </el-table-column>
            <el-table-column label="国籍" width="140" align="center">
              <template slot-scope="scope"><world-select v-model="scope.row.nationality"/></template>
            </el-table-column>
            <el-table-column label="手机号码" width="140" align="center">
              <template slot-scope="scope"><el-input v-model="scope.row.mobile"/></template>
            </el-table-column>
            <el-table-column label="出生日期" width="140" align="center">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.birthday" type="date" placeholder="选择日期" class="datepick" :editable="false"/>
              </template>
            </el-table-column>
            <el-table-column label="是否合同签字人" width="140" align="center">
              <template slot-scope="scope">
                <el-select placeholder="请选择" v-model="scope.row.is_contract_sign">
                  <el-option label="是" :value="1"/>
                  <el-option label="否" :value="0"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" min-width="140">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark"/>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <div class="tool">
                  <a href="javascript:;" @click="handleClearTourist(scope.row)">清空</a>
                  <a v-if="!isDisabledChangeTouristNum" href="javascript:;" @click="handleDelTourist(scope)">删除</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="module-box">
      <div class="module-title"><h5>订单价格明细</h5></div>
      <div class="module-content">
        <div class="field-item">
          <div class="field-label">结算币种／汇率</div>
          <div class="field-content">
            <currency-picker v-model="orderFormData.currency" style="width: 100px;" placeholder="选择货币" readonly="readonly"/>
            <el-input v-model="orderFormData.currency_rate" @blur="handleBlurCurrencyRate" style="width:100px;margin-right:20px;"/>
          </div>
        </div>
        <div class="field-label">结算总金额</div>
        <span class="field-content" v-if="orderFormData.confirm_status !== -1">
          <strong class="color-orange">￥{{ settlementAmount | formatPrice }}</strong>
        </span>
        <span class="field-content" v-else>
          <strong class="color-orange">￥0</strong>
        </span>
        <div class="field-label">本位币</div>
        <span class="field-content" v-if="orderFormData.confirm_status !== -1">
          <strong class="color-orange">￥{{ rmbSettlementAmount | formatPrice }}</strong>
        </span>
        <span class="field-content" v-else>
          <strong class="color-orange">￥0.000</strong>
        </span>
        <div class="search-item fr">
          <el-button class="op-btn" type="primary" @click="handleAddDetailItem()">+ 新增项目</el-button>
        </div>
        <!-- 表格均为未取消状态，当手动选择取消的时候，下面show-summary控制即时显示合计项 -->
        <div class="mode-table">
          <el-table style="width: 100%" border
                    :data="orderFormData.order_price_detail"
                    :summary-method="getCancelOrderSummaries"
                    :show-summary="(orderFormData.confirm_status == -1) ? true : false">
            <el-table-column type="index" label="序号" width="50" align="center"/>
            <el-table-column label="项目" align="center">
              <template slot-scope="scope">
                <p v-if="!scope.row.isadd">{{ scope.row.item_name }}</p>
                <el-input v-model="scope.row.item_name" v-else/>
              </template>  
            </el-table-column>
            <el-table-column label="单价（本位币）" width="120" align="center">
              <template slot-scope="scope"><div class="text-right">
                <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.rmb_unit_price | formatPrice }}
              </div></template>
            </el-table-column>
            <el-table-column label="结算单价" width="150" align="right">
              <template slot-scope="scope">
                <!-- <p v-if="!scope.row.isadd && isBOMTrip"> -->
                <p v-if="!scope.row.isadd">
                  <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.unit_price | formatPrice }}
                </p>
                <el-input v-else v-model="scope.row.unit_price" @blur="handleBlurUnitPrice(scope.row)">
                  <el-select v-if="scope.row.isadd" slot="prepend" v-model="scope.row.operator" style="width: 46px" placeholder="请选择" @input="handleInputOperator(scope.row, $event)">
                    <el-option label="+" value="+"/>
                    <el-option label="-" value="-"/>
                  </el-select>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="70" align="center">
              <template slot-scope="scope">
                <p v-if="!scope.row.isadd">{{ scope.row.num }}</p>
                <el-input v-else
                          v-model="scope.row.num"
                          @blur="handleBlurNum(scope.row)"/>
              </template>
            </el-table-column>
            <el-table-column label="结算金额小计" width="120" align="center">
              <template slot-scope="scope">
                <div class="text-right">
                  <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.total_amount | formatPrice }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="小计（本位币）" width="120" align="center">
              <template slot-scope="scope">
                <div class="text-right">
                  <span v-if="scope.row.operator == '-'">-</span>{{ scope.row.rmb_total_amount | formatPrice }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="说明">
              <template slot-scope="scope"><el-input v-model="scope.row.remark"/></template>
            </el-table-column>
            <el-table-column label="操作" width="70" align="center"> 
              <template slot-scope="scope">
                <div class="tool">
                  <span v-if="!scope.row.isadd">--</span>
                  <a v-else href="javascript:;" @click="handleDelDetailItem(scope)">删除</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!--工具条-->
    <div class="mode-toolbar" style="text-align:center;">
      <el-button type="primary" size="large" @click="handleSubmitForm">保 存</el-button>
      <el-button size="large" @click="goback">取 消</el-button>
    </div>

  </div>
</template>
<script>
import _ from 'lodash';
import { 
  getOrderForm, 
  setOrderForm, 
  getOrderZhikeForm, 
  setOrderZhikeForm,
  getSaleOrderForm, 
  setSaleOrderForm, 
  getSaleOrderZhikeForm, 
  setSaleOrderZhikeForm 
} from 'src/api/api';
import { saleAddOrder, saleTodoAddOrder } from 'src/api/api_store';
import * as format from 'src/utils/format';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import WorldSelect from 'src/plugins/WorldSelect.vue';
import SelectOrg from 'src/plugins/SelectOrg.vue';
import InputNumber from 'src/plugins/InputNumber.vue';
// import SimpleElSelect from "./SimpleElSelect.comp.vue";

export default {
  components: {
    CurrencyPicker,
    WorldSelect,
    SelectOrg,
    InputNumber
  },
  filters: {
    formatPrice(price){
      const num = Number(price) || 0;

      return Number(format.toFixed(num, 3));
    }
  },
  data() {
    const {id, order_no} = this.$route.query;

    return {
      tuanInfo: '',
      ORDER_STATUS_LISTS: {},
      TOURIST_TYPE: {},
      BOM_TRIP_TOURIST_TYPE: {},  // bom行程人群类型项
      DEFAULT_ORG_LIST: [],
      CARD_TYPE: {},
      
      addTouristGroup:{},
      touristGroups: [],
      uploadContracts: [],
      uploadFileNo: 0,
      tourist_lists:[],
      orderFormData: {
        id: id,
        order_no: order_no || '',
        adult_num: 0,
        child_num: 0,
        other_num: 0,
        other_num1: 0,
        other_num2: 0,
        order_price_detail: [],
        tourist_lists: [],
        // 新增都是待确认1
        confirm_status: 1,
        currency: '',
        currency_rate: 0,
        distributor_org_id: 0,
        distributor_org_name: '',
        distributor_real_name: '',
        distributor_mobile: '3'
      },
      settlementAmount: 0,
      rmbSettlementAmount: 0
    };
  },
  computed: {
    isBOMTrip(){ // 是否是bom行程团
      return this.tuanInfo && this.tuanInfo.type == 3;
    },
    isZhiKe(){
      return this.$route.meta && this.$route.meta.isZhiKe;
    },
    topMenuConst() {
      return this.$route.meta && this.$route.meta.topMenuConst;
    },
    isSale(){ // 是否从销售中心跳转过来的
      return this.topMenuConst == 'sale';
    },
    isStoreSale(){ // 是否从营业部销售跳转过来的
      return this.topMenuConst == 'store-sale';
    },
    getOrderFormFunc() {
      switch(this.topMenuConst) {
      case 'sale':
        return getSaleOrderForm;
      case 'store-sale':
        return saleAddOrder;
      default:
        return getOrderForm;
      }
    },
    setOrderFormFunc() {
      switch(this.topMenuConst) {
      case 'sale':
        return setSaleOrderForm;
      case 'store-sale':
        return saleTodoAddOrder;
      default:
        return setOrderForm;
      }
    },
    isDisabledChangeTouristNum(){
      const is_edit = this.$route.query && !!this.$route.query.order_no;

      return this.isBOMTrip && is_edit;
    },
    basePrice(){
      const {price_list} = this.tuanInfo;
      const price = price_list && price_list[0];
      let basePrice = 0;

      if(price){
        basePrice = this.isZhiKe ? price.out_price : price.peer_price;
      }
      return basePrice || '0.000';
    },
    addTouristGroupTotalPrice() {
      let price = Number(this.basePrice);

      _.forEach(this.addTouristGroup, (value) => {
        // console.log('select tourist type: ', value);
        price += Number((this.isZhiKe ? value.diff_out_price : value.diff_peer_price));
      });
      return price || 0;
    },
    touristGroupTotal(){
      let total = 0;

      this.touristGroups.forEach(item => {
        total += item.price * item.num;
      });
      return total || '0.000';
    },
    tripTouristNumStr(){ // bom行程：出游人数
      const {adult_num, child_num, other_type_num} = this.orderFormData;
      const touristNum = {};
      let str = '';

      if(adult_num){
        str += `  ${adult_num}  成人`;
      }
      if(child_num){
        str += `  ${child_num}  儿童`;
      }
      if(Array.isArray(other_type_num)){
        other_type_num.forEach(item => {
          str += `  ${item.num}  ${item.name}`;
        });
      }

      return str;
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
    }
  },
  watch: {
    'orderFormData':{
      handler(val){
        // console.log(val)
      },
      deep:true
    }
  },
  methods: {
    getTuanInfo() {
      const {id, order_no} = this.$route.query;
      const getOrderZhikeFormFunc = this.isSale ? getSaleOrderZhikeForm : getOrderZhikeForm;
      const getOrderInfoFunc = this.isZhiKe ? getOrderZhikeFormFunc : this.getOrderFormFunc;
      let params = {data: {id, order_no}};

      getOrderInfoFunc({
        params,
        success: res => {
          const {code, data} = res.data;
          if(code !== 0){
            this.$message({message: res.data.msg, type: 'error'});
            this.goback();
            return; 
          }

          const {order_info, price_list, extra_info, order_price_detail, tourist_lists, contract_lists, other_type_num} = data;
          const extraInfoMap = [];
          
          this.tuanInfo = data;
          this.tuanInfo.price_list = [];
          this.TOURIST_TYPE = [];
          for(let key of Object.keys(price_list)){
            this.tuanInfo.price_list.push(price_list[key]);
            this.TOURIST_TYPE.push(price_list[key].type_name);
          }
          // this.TOURIST_TYPE = data.tourist_type; // 根据返回的price_list生成用户类型列表，当前方法默认还有“儿童”
          this.ORDER_STATUS_LISTS = data.order_status_lists;
          this.DEFAULT_ORG_LIST = data.org_info;
          this.CARD_TYPE = data.card_type;
          this.otherTypeNum = data.other_type_num;
          if(Array.isArray(extra_info)){
            extra_info.forEach(extra => {
              if(extra.is_default === 1 && extra.name === '人群类型'){
                this.BOM_TRIP_TOURIST_TYPE = extra; 
              }
              extraInfoMap[extra.id] = extra.detail.reduce((prev, curr) => {
                prev[curr.id] = curr;
                return prev; 
              }, {});
            });
          }
          this.orderFormData = order_info;
          this.orderFormData.id = id; 
          this.otherTypeNum.forEach((item, idx) => {
            this.orderFormData['other_num' + idx] = 0;
          });
          // this.orderFormData.other_num = 0;
          // this.orderFormData.other_num1 = 0;
          // this.orderFormData.other_num2 = 0;
          this.orderFormData.currency_rate = this.orderFormData.currency_rate || 1; 
          this.orderFormData.distributor_mobile = '';
          this.addTouristGroup = this.getNewTouristGroup();
          // 判断是否是编辑订单，新建默认添加一个成人游客
          if(order_no){
            if(Array.isArray(order_info.extra_detail_attr) && extraInfoMap.length){
              // console.log('extra_info map:', extraInfoMap);
              this.touristGroups = order_info.extra_detail_attr.map(item => {
                let price = - this.basePrice;
                const group = item.group.reduce((prev, curr) => {
                  if(extraInfoMap[curr.extra_id] && extraInfoMap[curr.extra_id][curr.id]){
                    prev[curr.extra_id] = extraInfoMap[curr.extra_id][curr.id];
                    price -= prev[curr.extra_id][(this.isZhiKe ? 'diff_out_price' : 'diff_peer_price')];
                  }
                  return prev;
                }, {});

                return {group, num: item.num, price: -price, total: - item.num * price};
              });
            }
            this.settlementAmount = Number(order_info.total_amount) || 0;
            this.rmbSettlementAmount = Number(order_info.rmb_total_amount) || 0;
            // if(this.isZhiKe && Array.isArray(contract_lists)){
            //   this.uploadContracts = contract_lists.map(item => ({name: item.name, url: item.path}));
            // }
            // 对于原来order_info里面没有字段需要通过$set去赋值，否则无法正常监听。因为在this.tuanInfo = data已经给order_info添加过监听了
            // this.$set(this.orderFormData, 'tourist_lists', tourist_lists);
            this.tourist_lists = tourist_lists;
            //其他类型的人数
            let otherNum = 0;
            for(let item of this.orderFormData.other_type_num){
              otherNum += item.num;
            }
            //对比返回数据长度与实际人数的差，添加空的游客信息列
            let diffNum = this.orderFormData.adult_num+this.orderFormData.child_num+otherNum-tourist_lists.length;
            //儿童未填写人数
            let child_num = this.orderFormData.child_num;
            let otherNumMap = {};
            this.otherTypeNum.forEach(item => {
              otherNumMap[item.name] = item.num;
            });

            for(let i = 0, length = tourist_lists.length; i<length; i++){
              if(tourist_lists[i].tourist_type == '儿童'){
                child_num --;
              }
              if(otherNumMap[tourist_lists[i].tourist_type] > 0){
                otherNumMap[tourist_lists[i].tourist_type] --;
              }
            }
            for(let i = 0;i<diffNum;i++){
              if(this.isBOMTrip){
                this.tourist_lists.push(this.getNewTourist());
              }else{
                if(child_num>0){
                  this.tourist_lists.push(this.getNewTourist('儿童'));
                  child_num--;
                }else if(this.otherTypeNum.some(it => otherNumMap[it.name] > 0)){
                  this.otherTypeNum.forEach(it => {
                    if(otherNumMap[it.name] > 0){
                      this.tourist_lists.push(this.getNewTourist(it.name));
                      otherNumMap[it.name]--;
                    }
                  });
                }else{
                  this.tourist_lists.push(this.getNewTourist('成人'));
                }
                
              }
            }
            // 过滤掉取消订单的明细项
            const orderPriceDetail = order_price_detail.filter(item => {
              // 处理operator为 - 的记录返回的负数，转成正数，因为页面都是使用正数进行计算
              if(item.unit_price < 0){
                item.unit_price = Number(format.toFixed(Math.abs(item.unit_price), 3));
                item.total_amount = Math.abs(item.total_amount);
                item.rmb_unit_price = Math.abs(item.rmb_unit_price);
                item.rmb_total_amount = Math.abs(item.rmb_total_amount);
                item.operator = '-';
              }
              return item.item_name != '取消订单' || item.isadd !== 0;
            });
            // console.log('order', orderPriceDetail);
            this.$set(this.orderFormData, 'order_price_detail', orderPriceDetail);
          }else{
            // 重置游客类型人数，游客列表，订单明细
            this.orderFormData.adult_num = 0;
            this.orderFormData.confirm_status = 1;

            // 对于原来order_info里面没有字段需要通过$set去赋值，否则无法正常监听。因为在this.tuanInfo = data已经给order_info添加过监听了
            // this.$set(this.orderFormData, 'tourist_lists', []);
            this.tourist_lists = [];
            this.$set(this.orderFormData, 'order_price_detail', []);
            // 添加默认游客：1成人游客
            if(this.isBOMTrip){
              this.handleAddTouristGroup();
              // this.handleChangeTouristNum(this.touristGroups[0], 1);
            }else{
              this.handleChangeTouristNum('adult_num', 1);
            }
          }
        },
        showLoading: true
      });
    },
    getNewTouristGroup(){
      // 获取可选类型基准项，作为初始选项
      const {extra_info} = this.tuanInfo;
      const addTouristGroup = {};

      if(Array.isArray(extra_info)){
        extra_info.forEach(item => {
          item.detail.forEach(extra => {
            if(extra.type == 0){
              addTouristGroup[item.id] = extra;
              return false;
            }
          });
        });
      }
      return addTouristGroup;
    },
    getNewTourist(tourist_type = '') {
      let tourist_row = {
        // id:'',
        birthday: '',
        bpm_tourist_id: '',
        create_time: '',
        gender: '男',
        is_contract_sign: 1,
        identity_end_date: '',
        identity_no: '',
        identity_type: '身份证',
        mobile: '',
        nationality: '中国',
        order_from: '',
        order_no: '',
        remark: '',
        tourist_type: tourist_type,
        tuan_id: '',
        tuan_no: '',
        update_time: '',
        username: ''
      };
      return tourist_row;
    },
    getNewOrderPriceDetailItem() {
      let order_row = {
        // id:'',
        item_name: '',
        rmb_unit_price: 0,
        unit_price: 0,
        num: 0,
        total_amount: 0,
        rmb_total_amount: 0,
        remark: '',
        operator: '+',
        isadd: 1
      };
      return order_row;
    },
    getCancelOrderSummaries(param) {
      // const { columns, data } = param;
      const sumRow = [];

      param.columns.forEach(item => {
        if(item.label == '数量'){
          sumRow.push('1');
        }else if(item.label == '项目' || item.label == '说明'){
          sumRow.push('取消订单');
        }else if(item.label == '单价（本位币）' || item.label == '小计（本位币）'){
          sumRow.push(Number(format.toFixed(-this.rmbSettlementAmount, 3)));
        }else if(item.label == '结算单价' || item.label == '结算金额小计'){
          sumRow.push(Number(format.toFixed(-this.settlementAmount, 3)));
        }else{
          sumRow.push('--');
        }
      });

      return sumRow;
    },
    // 检查单价组合是否存在
    checkTouristGroup(){
      const {touristGroups, addTouristGroup, tuanInfo: {extra_info}} = this;
      let existGroup = false;

      touristGroups.forEach(group => {
        if(extra_info.every(extra => addTouristGroup[extra.id] == group.group[extra.id])){
          // console.log('exist group', group.group, addTouristGroup);
          existGroup = true;
          return false;
        }else{
          // console.log('not exist group');
        }
      });
      return existGroup;
    },
    /** 
     * 游客信息验证：1. 直客订单游客信息不能为空；2. 同行订单游客允许不填
     */
    checkTouristList(){
      const tourist_lists = this.tourist_lists;
      if(this.isZhiKe && (!Array.isArray(tourist_lists) || tourist_lists.length == 0)){
        return this.$message.error('请添加游客信息');
      }
      let touristLists = [];
      let state = tourist_lists.some((item, idx) => {
        //直客为必填，或者item中一个有填写为必填
        if(this.isZhiKe||item.username||item.identity_no||item.identity_end_date||item.mobile||item.birthday||item.remark){
          if(!item.username){
            this.$message.error(`请填写第${idx + 1}个游客姓名`);
            return true;
          }
          if(!item.gender){
            this.$message.error(`请填写第${idx + 1}个游客性别`);
            return true;
          }
          if(!item.identity_no){
            this.$message.error(`请填写第${idx + 1}个游客证件号码`);
            return true;
          }
          // if(!item.mobile){  // 证件号可能关联有效期输入框验证，导致下面验证早于有效期验证。所以这部分验证放到后端验证
          //   this.$message.error(`请填写第${idx + 1}个游客手机号码`);
          //   return true;
          // }
          //生成提交的数据
          touristLists.push(item);
          return false;
        }
      });
      this.orderFormData.tourist_lists = touristLists;
      return state;
    },
    checkOrderPriceDetail(){
      const {order_price_detail} = this.orderFormData;

      if(!Array.isArray(order_price_detail) || order_price_detail.length == 0){
        this.$message.error('请添加订单价格明细记录');
      }
      return order_price_detail.some((item, idx) => {
        if(!item.item_name){
          this.$message.error(`请填写第${idx + 1}项的项目名称`);
          return true;
        }
        if(!item.num){
          this.$message.error(`请填写第${idx + 1}项的数量`);
          return true;
        }
        if(item.unit_price <= 0 && item.isadd){
          this.$message.error(`请填写第${idx + 1}项的单价`);
          return true;
        }
        return false;
      });

    },
    selectTouristGroup(type, value){
      // console.log('select tourist group: ', this.addTouristGroup[type], value);
      this.$set(this.addTouristGroup, type, value);
    },
    // 更新游客类型对应人数和游客列表
    updateBOMTripTouristInfo(group, num, delStartIndex){
      const {orderFormData, BOM_TRIP_TOURIST_TYPE} = this;
      
      if(!group || !BOM_TRIP_TOURIST_TYPE){
        return false;
      }
      const touristType = group[BOM_TRIP_TOURIST_TYPE.id];
      const tourist_lists = this.tourist_lists;
      const {other_type_num} = orderFormData;
      let matchItemIndex = -1;

      // 更新游客类型人数
      if(touristType){
        if(touristType.name == '成人'){
          orderFormData.adult_num += num;
        }else if(touristType.name == '儿童'){
          orderFormData.child_num += num;
        }else if(Array.isArray(other_type_num)){
          
          other_type_num.some((item, idx) => {
            if(item.name == touristType.name){
              matchItemIndex = idx;
              item.num += num;
              return true;
            }
          });
          if(matchItemIndex == -1){
            other_type_num.push({name: touristType.name, num: num});
          }else if(other_type_num[matchItemIndex].num === 0){
            other_type_num.splice(matchItemIndex, 1);
          }
        }

        if(num > 0){
          for(let i=0; i<num; i++){
            tourist_lists.push(this.getNewTourist());
          }
        }else if(_.isInteger(delStartIndex) && delStartIndex > -1){
          // console.log('del from', delStartIndex, - num);
          tourist_lists.splice(delStartIndex, - num);
        }else{
          tourist_lists.splice(num);
        }
      }else{
        // console.log('tourist type', group);
        this.$message.error('人群类型不存在');
      }
    },
    updateTDMTouristInfo(type, num, delStartIndex){
      // console.log(type, num, delStartIndex)
      const tourist_lists = this.tourist_lists;
      let touristType = null;
      if(type == 'adult_num'){
        touristType = '成人';
      }else if(type == 'child_num'){
        touristType = '儿童';
      }else if(type.indexOf('other_num') === 0){
        let index = type.substring('other_num'.length);
        touristType = this.tuanInfo.other_type_num[index].name;
      }

      if(num > 0){
        // console.log('>', num)
        for(let i=0; i<num; i++){
          tourist_lists.push(this.getNewTourist(touristType));
        }
      }else if(_.isInteger(delStartIndex) && delStartIndex > -1){
        // console.log('=', num)
        tourist_lists.splice(delStartIndex, - num);
        // console.log('del TDM tourist index:', delStartIndex, num);
      }else{
        // console.log('><', num)
        for(let i = tourist_lists.length - 1, j = num; i >= 0 && j < 0; i--){
          if(tourist_lists[i].tourist_type == touristType){
            tourist_lists.splice(i, 1);
            j ++;
          }
        }
        // console.log('del TDM tourist:', touristType, num);
      }
    },
    updateBOMTripOrderDetailList(groupItem, addTouristNum){
      const tourist_lists = this.tourist_lists;
      const {order_price_detail} = this.orderFormData;
      const baseToristGroup = this.getNewTouristGroup();
      const changeItemType = [];
      const touristTypeGroupId = this.BOM_TRIP_TOURIST_TYPE.id;
      let defaultItemIndex = 0, 
        touristTypeName = '',
        totalTouristNum = tourist_lists.length;  // 如果当前没有明细项，则总游客人数等于当前添加的游客人数

      // 计算变更价格明细项，过滤掉基准类型项, 保留游客类型项
      _.forEach(groupItem.group, (value, key) => {
        if(key == touristTypeGroupId || baseToristGroup[key] != value) {
          changeItemType.push(value);
        }
      });
      // changeItemType.push('单房差'); // 添加单房差项在最后，确保能获得当前的游客人数

      // console.log('change item type: ', changeItemType);
      // 遍历当前订单价格明细列表，更新
      order_price_detail.forEach(item => {
        let changeItemTypeIndex = -1;

        changeItemType.forEach((val, key) => {
          if(item.item_name === (val.name || val) && !item.isadd){
            changeItemTypeIndex = key;
          }
        });
        if(changeItemTypeIndex != -1){
          // 已存在的明细项，从changeItemType移除对应的key，更新明细项的内容
          // if(item.item_name == '单房差'){ // 单房差根据游客数决定是否存在
          //   item.num = totalTouristNum % 2;
          // }else{
          //   item.num = Number(item.num) + addTouristNum;
          // }
          item.num = Number(item.num) + addTouristNum;
          changeItemType.splice(changeItemTypeIndex, 1);
          this.handleBlurNum(item);
          // item.total_amount = item.num * item.unit_price;
          // item.rmb_total_amount = item.num * item.rmb_unit_price;
          defaultItemIndex ++;
        }

        if(changeItemTypeIndex != -1 || !item.isadd){ // 计算最后一个默认价格明细项位置
          defaultItemIndex ++;
        }
      });
      // 存在未变更项, 添加变更项到列表中
      if(changeItemType.length > 0){
        changeItemType.forEach(item => {
          let unit_price, name;
          let num = addTouristNum;
          
          if(item == '单房差'){
            if(totalTouristNum % 2 === 0){
              return;
            }else{
              name = item;
              num = 1;
              unit_price = this.tuanInfo.diff_price;
            }
          }else if(item.extra_id == touristTypeGroupId){
            name = item.name;
            if(item == baseToristGroup[touristTypeGroupId]){
              unit_price = this.basePrice;
            }else{
              unit_price = Number(this.basePrice) + Number(this.isZhiKe ? item.diff_out_price : item.diff_peer_price);
            }
          }else {
            name = item.name || item;
            unit_price = this.isZhiKe ? item.diff_out_price : item.diff_peer_price;
          }
          this.handleAddDetailItem(name, unit_price, num, defaultItemIndex, 0);
          defaultItemIndex ++;
        });
      }
    },
    updateTDMOrderDetailList(type, addTouristNum){
      const tourist_lists = this.tourist_lists;
      const {order_price_detail} = this.orderFormData;
      const {adult_peer_price, child_peer_price, diff_price, other_type_num, other_type_peer_price} = this.tuanInfo;
      
      const changeItemType = [];
      let defaultItemIndex = 0, 
        itemTypeName = '',
        totalTouristNum = tourist_lists.length;

      // changeItemType.push(type == 'child_num' ? '儿童团费' : '成人团费');
      if(type == 'adult_num'){
        itemTypeName = '成人团费';
      }else if(type == 'child_num'){
        itemTypeName = '儿童团费';
      }else{
        let index = type.substring('other_num'.length);
        itemTypeName = other_type_num[index].name;
      }
      changeItemType.push(itemTypeName);

      // changeItemType.push('单房差'); // 添加单房差项在最后，确保能获得当前的游客人数

      // 遍历当前订单价格明细列表，更新
      order_price_detail.forEach(item => {
        let changeItemTypeIndex = -1;

        changeItemType.forEach((val, key) => {
          if(item.item_name === val && !item.isadd){
            changeItemTypeIndex = key;
          }
        });
        if(changeItemTypeIndex != -1){
          // 已存在的明细项，从changeItemType移除对应的key，更新明细项的内容
          // if(item.item_name == '单房差'){ // 单房差根据游客数决定是否存在
          //   item.num = totalTouristNum % 2;
          // }else{
          //   item.num = Number(item.num) + addTouristNum;
          // }
          item.num = Number(item.num) + addTouristNum;
          changeItemType.splice(changeItemTypeIndex, 1);
          this.handleBlurNum(item);
          // item.total_amount = item.num * item.unit_price;
          // item.rmb_total_amount = item.num * item.rmb_unit_price;
        }
        if(changeItemTypeIndex != -1 || !item.isadd){ // 计算最后一个默认价格明细项位置
          defaultItemIndex ++;
        }
      });
      // 存在未变更项, 添加变更项到列表中
      if(changeItemType.length > 0){
        changeItemType.forEach(item => {
          if(item == '儿童团费'){
            this.handleAddDetailItem(item, child_peer_price, addTouristNum, defaultItemIndex, 0);
          }else if(item == '单房差'){
            if(totalTouristNum % 2 === 0){
              return;
            }else{
              this.handleAddDetailItem(item, diff_price, 1, defaultItemIndex, 0);
            }
          }else if(item == '成人团费'){
            this.handleAddDetailItem(item, adult_peer_price, addTouristNum, defaultItemIndex, 0);
          }else{
            let index = type.substring('other_num'.length);
            let other_type =other_type_peer_price[index];
            this.handleAddDetailItem(item, other_type.peer_price, addTouristNum, defaultItemIndex, 0);
          }
          defaultItemIndex ++;
        });
      }
    },
    // 更新订单明细列表
    updateOrderDetail(groupItem, addTouristNum){
      const {order_price_detail, currency_rate} = this.orderFormData;
      
      if(!groupItem || !Array.isArray(order_price_detail)){
        return false;
      }

      if(this.isBOMTrip){
        this.updateBOMTripOrderDetailList(groupItem, addTouristNum);
      }else{
        this.updateTDMOrderDetailList(groupItem, addTouristNum);
      }
      
      // 删除num为0的项目

      for(let i = order_price_detail.length - 1; i >= 0; i--){
        let item = order_price_detail[i];

        if(item.num == 0){
          order_price_detail.splice(i, 1);
        }
      }
    },
    redirectToDetail(id) {
      
      switch(this.topMenuConst) {
      case 'sale':
        this.$router.push({path: `/sale/order/detail/${this.$route.query.id}/${id}`, query: { id: this.$route.query.id }});
        break;
      case 'store-sale':
        this.$router.push({path: `/store-sale/order-detail/${this.$route.query.id}/${id}`, query: { id: this.$route.query.id }});
        break;
      default:
        this.$router.push({path: `/control/order-details/${this.$route.query.id}/${id}`, query: { id: this.$route.query.id }});
        break;
      }
    },
    handleAddTouristGroup(){
      const {touristGroups, addTouristGroup, addTouristGroupTotalPrice, tuanInfo: {extra_info}} = this;

      // if(!Array.isArray(extra_info) 
      //     || extra_info.length == 0
      //     || extra_info.some(extra => !addTouristGroup[extra.id])){
      //   return this.$message.error('请选择所有组合项');
      // }
      if(this.checkTouristGroup()){
        return this.$message.error('该组合已经存在');
      }
      // addTouristGroup.price = this.addTouristGroupTotalPrice;
      // addTouristGroup.num = 0;
      // addTouristGroup.total = 0;
      this.addTouristGroup = this.getNewTouristGroup();
      // console.log('add group: ', addTouristGroup);
      let touristGroup = {
        group: addTouristGroup,
        price: addTouristGroupTotalPrice,
        num: 0,
        total: 0
      };

      touristGroups.push(touristGroup);
      this.handleChangeTouristNum(touristGroup, 1);
    },
    handleDelTouristGroup(group){
      let index = this.touristGroups.indexOf(group);

      if(index != -1){
        this.touristGroups.splice(index, 1);
        this.handleChangeTouristNum(group, 0);
        // console.log('del tourist group:', group, index);
      }
    },
    handleChangeTouristNum: _.debounce(function(type, newNum, delTouristStartIndex){
      if(!/^\d+$/.test(newNum)){
        return this.$message.error('人数请输入数字');
      }
      let oldTouristNum = this.isBOMTrip ? type.num : this.orderFormData[type];
      // console.log(this.orderFormData, this.orderFormData[type])
      // console.log(type, newNum, delTouristStartIndex)
      // if(type == 'other_num1' || type == 'other_num2'){
      //   let oldTouristNum = this.orderFormData[type];
        
      // }

      let addTouristNum = 0;
      newNum = Number(newNum);
      // console.log(oldTouristNum)
      if(oldTouristNum){
        // console.log('in')
        addTouristNum = newNum - oldTouristNum;
        // console.log(addTouristNum)
      }else{
        addTouristNum = newNum;
      }
      // if(type == 'other_num1' || type == 'other_num2'){
      //   if(oldTouristNum) {
      //     addTouristNum = newNum - oldTouristNum;
      //   } else {
      //     addTouristNum = newNum;
      //   }
      // }
      // console.log(addTouristNum)
      if(addTouristNum == 0) {
        return false;
      }
      // console.log(this.isBOMTrip)
      if(this.isBOMTrip){
        // 更新游客数和列表
        this.updateBOMTripTouristInfo(type.group, addTouristNum, delTouristStartIndex);
        // 更新订单价格明细
        this.updateOrderDetail(type, addTouristNum);
        type.num = newNum;
        type.total = type.price * newNum || 0;
      }else{
    
        this.updateTDMTouristInfo(type, addTouristNum, delTouristStartIndex);
        this.updateOrderDetail(type, addTouristNum);

        this.orderFormData[type] = newNum;
      }
    }, 200),
    // 计算成人儿童，修改成人儿童
    handleChangeTouristType(row, newVal) {
      if(row.tourist_type == newVal){
        return false;
      }
      // console.log('tourist type change', row, newVal);
      const typeKeyMap = {'儿童': 'child_num', '成人': 'adult_num'};
      this.otherTypeNum.forEach((item, idx) => {
        typeKeyMap[item.name] = 'other_num' + idx;
      });

      const newKey = typeKeyMap[newVal], key = typeKeyMap[row.tourist_type];
      
      this.orderFormData[newKey] ++;
      this.orderFormData[key] --;

      this.updateOrderDetail(newKey, 1);
      this.updateOrderDetail(key, -1);
      row.tourist_type = newVal;
    },
    // 导入名单
    handleUploadSuccess(response, file, fileList) {

      if (response.code == '0' && response.data) {
        const {data, adult_num, child_num} = response.data;
        const tourist_lists = this.tourist_lists;
        if(this.isBOMTrip){
          if(data.length != tourist_lists.length){
            this.$message.error('请填写和当前游客数一样条数的游客记录');
          }else{
            // console.log('data import tourist', tourist_lists, data);
            this.tourist_lists = data;
            this.$message({message: response.msg, type: 'success'});
          }
        }else{
          if(adult_num){
            // console.log('add adult_num ', adult_num);
            this.updateOrderDetail('adult_num', adult_num);
            this.orderFormData['adult_num'] = Number(this.orderFormData.adult_num) + Number(adult_num);
          }
          if(child_num){
            // console.log('add child num "', child_num);
            this.updateOrderDetail('child_num', child_num);
            this.orderFormData['child_num'] = Number(this.orderFormData.child_num) + Number(child_num);
          }
          if(Array.isArray(data)){
            data.forEach(item => {
              this.tourist_lists.push(item);
            });
          }
          // console.log('tourist list', this.orderFormData.tourist_lists);
          this.$message({message: response.msg, type: 'success'});
        }
      }else{
        this.$message.error(response.msg);
      }
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
    // 清空游客信息
    handleClearTourist(tourist){
      if(tourist){
        tourist.birthday = '';
        tourist.bpm_tourist_id = '';
        tourist.create_time = '';
        tourist.gender = '男';
        tourist.is_contract_sign = 1;
        tourist.identity_end_date = '';
        tourist.identity_no = '';
        tourist.identity_type = '身份证';
        tourist.mobile = '';
        tourist.nationality = '中国';
        tourist.order_from = '';
        tourist.order_no = '';
        tourist.remark = '';
        // tourist.tourist_type = "";  // TDM订单清除时不清空该内容，bom订单不显示该字段
        tourist.tuan_id = '';
        tourist.tuan_no = '';
        tourist.update_time = '';
        tourist.username = '';
      }
    },
    handleDelTourist(scope) {
      let index = scope.$index;

      if (this.tourist_lists.length <= 1) {
        this.$message({
          message: '至少保留一条数据！',
          type: 'warning'
        });
      } else {
        if(this.isBOMTrip){
          for(let i = this.touristGroups.length -1; i>= 0; i--){
            let group = this.touristGroups[i];
            if(group.num > 0){
              this.handleChangeTouristNum(group, group.num - 1, index);
              break;
            }
          }
        }else{
          const typeKeyMap = {'儿童': 'child_num', '成人': 'adult_num'};
          this.otherTypeNum.forEach((item, idx) => {
            typeKeyMap[item.name] = 'other_num' + idx;
          });
          let type = typeKeyMap[scope.row.tourist_type];

          this.handleChangeTouristNum(type, this.orderFormData[type] - 1, index);
        }
        // this.orderFormData.tourist_lists.splice(index, 1);
      }
    },
    handleBlurCurrencyRate(){
      const {currency_rate, order_price_detail} = this.orderFormData;
      let rate = 1;

      // 输入错误格式时，使用计算出来就的汇率替换
      if(this.settlementAmount){
        rate = this.rmbSettlementAmount / this.settlementAmount;
      }
      if(!/^\d+(\.\d*)?$/.test(currency_rate)){
        this.$message.error('请输入正确的汇率数值');
      }else if(currency_rate > 100000000){
        this.$message.error('请输入小于100000000的数值');
      }else if(rate != currency_rate){
        let rmbSettlementAmount = 0;

        rate = Number(currency_rate);
        if(Array.isArray(order_price_detail)){
          order_price_detail.forEach(item => {
            item.rmb_unit_price = this.orderFormData.currency_rate * item.unit_price;
            item.rmb_total_amount = this.orderFormData.currency_rate * item.total_amount;
            rmbSettlementAmount += item.operator == '-' ? (-item.rmb_total_amount) : item.rmb_total_amount;
          });
        }
        this.rmbSettlementAmount = rmbSettlementAmount;
      }
      this.orderFormData.currency_rate = Number(format.toFixed(rate, 4));
    },
    handleBlurUnitPrice(row){
      const {currency_rate} = this.orderFormData;
      const isClear = /^\s*$/.test(row.unit_price);
      let unit_price = 0;
      let num = Number(row.num) || 0;

      if(num && !isClear){
        unit_price = row.total_amount / num;
      }else if(isClear){
        row.unit_price = 0;
      }
      if(!/^\d+(\.\d*)?$/.test(row.unit_price)){
        // this.$message.error('请输入正确的数字(非负数)');
        // 输入错误格式时，使用计算出来就的汇率替换
      }else if(row.unit_price > 100000000){
        // this.$message.error('请输入小于100000000的数值');
      }else if(unit_price != row.unit_price || isClear){
        let oldTotalAmount = row.total_amount, oldRmbTotalAmount = row.rmb_total_amount;
        unit_price = Number(row.unit_price) || 0;
        row.total_amount = unit_price * num;
        row.rmb_unit_price = unit_price * currency_rate;
        row.rmb_total_amount = row.total_amount * currency_rate;
        if(row.operator == '-'){
          this.settlementAmount += oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount += oldRmbTotalAmount - row.rmb_total_amount;
        }else{
          this.settlementAmount -= oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount -= oldRmbTotalAmount - row.rmb_total_amount;
        }
      }
      row.unit_price = Number(format.toFixed(unit_price, 3));
    },
    handleBlurNum(row){
      const {currency_rate} = this.orderFormData;
      const isClear = /^\s*$/.test(row.num) || !/^\d+$/.test(row.num);
      let unit_price = Number(row.unit_price) || 0;
      let num = 0;

      // 输入错误格式时，使用计算出来就的数量替换
      if(unit_price && !isClear){
        num = row.total_amount / unit_price;
      }else if(isClear){
        row.num = 0;
      }
      if(!/^\d+$/.test(row.num)){
        //this.$message.error('数量格式不正确');
      }else if(num != row.num || isClear){
        let oldTotalAmount = row.total_amount, oldRmbTotalAmount = row.rmb_total_amount;
        num = Number(row.num) || 0;
        row.total_amount = unit_price * num;
        row.rmb_unit_price = unit_price * currency_rate;
        row.rmb_total_amount = row.total_amount * currency_rate;
        if(row.operator == '-'){
          this.settlementAmount += oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount += oldRmbTotalAmount - row.rmb_total_amount;
        }else{
          this.settlementAmount -= oldTotalAmount - row.total_amount;
          this.rmbSettlementAmount -= oldRmbTotalAmount - row.rmb_total_amount;
        }
      }
      row.num = isClear && !num ? '' : num;
    },
    // 使用input事件监听，用change事件在删除非最后一条记录时会触发change事件导致计算总金额错误
    handleInputOperator(row, val){
      // console.log('handle input operator:', row, val);
      if(!row.total_amount){
        return false;
      }
      if(val == '-'){
        this.settlementAmount -= 2 * row.total_amount;
        this.rmbSettlementAmount -= 2 * row.rmb_total_amount;
      }else{
        this.settlementAmount += 2 * row.total_amount;
        this.rmbSettlementAmount += 2 * row.rmb_total_amount;
      }
    },
    handleAddDetailItem(name = '', price = 0, num = 1, index = '', isadd = 1) {
      const newItem = this.getNewOrderPriceDetailItem();
      const {currency_rate, order_price_detail} = this.orderFormData;

      newItem.isadd = isadd;
      newItem.num = num;
      newItem.item_name = name;
      newItem.unit_price = price;
      if(price){
        if(price < 0){
          newItem.unit_price = -price;
          newItem.operator = '-';
        }
        newItem.rmb_unit_price = newItem.unit_price * currency_rate;
        newItem.total_amount = newItem.num * newItem.unit_price;
        newItem.rmb_total_amount = newItem.num * newItem.rmb_unit_price;

        if(newItem.operator == '-'){
          this.settlementAmount = (this.settlementAmount - newItem.total_amount) || 0;
          this.rmbSettlementAmount = (this.rmbSettlementAmount - newItem.rmb_total_amount) || 0;
        }else{
          this.settlementAmount = (this.settlementAmount + newItem.total_amount) || 0;
          this.rmbSettlementAmount = (this.rmbSettlementAmount + newItem.rmb_total_amount) || 0;
        }
      }
      
      if(index === ''){
        order_price_detail.push(newItem);
      }else{
        order_price_detail.splice(index, 0, newItem);
      }
    },
    handleDelDetailItem(scope) {
      const {$index, row} = scope;

      this.orderFormData.order_price_detail.splice(scope.$index, 1);
      if(row.operator == '-'){
        this.settlementAmount = (this.settlementAmount + row.total_amount) || 0;
        this.rmbSettlementAmount = (this.rmbSettlementAmount + row.rmb_total_amount) || 0;
      }else{
        this.settlementAmount = (this.settlementAmount - row.total_amount) || 0;
        this.rmbSettlementAmount = (this.rmbSettlementAmount - row.rmb_total_amount) || 0;
      }
    },
    handleSubmitForm(){
      const {orderFormData, touristGroups, isBOMTrip, isZhiKe, tuanInfo} = this;
      const {other_type_num, other_type_peer_price} = tuanInfo;
      const setOrderZhikeFormFunc = this.isSale ? setSaleOrderZhikeForm : setOrderZhikeForm;
      const submitFunc = isZhiKe ? setOrderZhikeFormFunc : this.setOrderFormFunc;

      if(isBOMTrip){
        orderFormData.extra_detail_attr = [];

        touristGroups.forEach(item => {
          if(item.num > 0){
            orderFormData.extra_detail_attr.push({
              group: _.map(item.group, item => ({id: item.id, 'extra_id': item.extra_id})),
              num: item.num,
              unit_price: item.price
            });
          }
        });
        if(orderFormData.extra_detail_attr.length == 0){
          return this.$message.error('请填写游客人数');
        }
      }else{
        let otherIsZoro = !Array.isArray(other_type_num);
        if(!otherIsZoro){
          other_type_num.forEach((it, i) => {
            it.num = orderFormData['other_num' + i];
            otherIsZoro = otherIsZoro && it.num < 1;
          });
        }
        if(orderFormData.adult_num < 1 && orderFormData.child_num < 1 && otherIsZoro){
          return this.$message.error('请填写游客人数');
        }
        orderFormData.other_type_num = other_type_num;
      }
      if(isZhiKe){
        // orderFormData.contract_lists = this.uploadContracts.map(item => {
        //   let path = (item.response && item.response.data && item.response.data.path) || item.url;
        //   return {name: item.name, path: path};
        // });
        if(this.uploadFileNo !== 0){  // 使用onProgress无法判断是否有上传中的文件，所以通过这个参数进行判断
          return this.$message.error('存在未上传完文件，请上传完成后再提交');
        }
        // if(orderFormData.contract_lists.length == 0){
        //   return this.$message.error('请上传合同');
        // }
      } else if (!this.isStoreSale) {
        if(!orderFormData.distributor_org_id){
          return this.$message.error('请填写代理商');
        }
        if(!orderFormData.distributor_real_name){
          return this.$message.error('请填写联系人姓名');
        }
      }
      if(this.checkTouristList() || this.checkOrderPriceDetail()){
        return;
      }
      // 格式化日历插件的时间，日历插件默认返回Date类型时间
      this.tourist_lists.forEach(item => {
        item.identity_end_date = item.identity_end_date ? format.date(item.identity_end_date) : '';
        item.birthday = item.birthday ? format.date(item.birthday) : '';
      });
      // return false
      submitFunc({
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
    handleBeforeUploadContract(file){
      if(this.uploadContracts.length + this.uploadFileNo >= 10){
        this.$message.error('上传文件数量不可超过十份');
        return false;
      }
      this.uploadFileNo ++;
      // console.log('before upload: ', file)
      return true;
    },
    handleRemoveUploadFile(file, fileList) {
      this.uploadContracts = fileList;
      if(file && file.status != 'success'){ // 文件上传中删除会出发这个事件不会触发success和error
        this.uploadFileNo --;
      }
      // console.log('handleRemoveUploadFile', file, fileList);
    },
    handlePreviewUploadContract(file) {
      // console.log('preview file', file);
      window.open(file.url);
    },
    handleUploadContractSuccess(response, file, fileList) {
      if(response.code != '0'){
        fileList.splice(fileList.indexOf(file), 1);
        this.$message.error(response.msg);
      }else{
        this.uploadContracts.push(file);
      }
      this.uploadFileNo --;
    },
    handleUploadContractError(err, file, fileList){
      // console.log('upload file: ', err, file, fileList);
      this.$message.error('上传失败, 请刷新重试');
      this.uploadFileNo --;
    },
    goback() {
      history.go(-1);
    },
  },
  // updated() {
  //   console.log('data:', this.orderFormData);
  //   console.log("simple-el-select spend time", Date.now() - this.startTime);
  // },
  mounted() {
    this.getTuanInfo();
  }
};
</script>

<style scoped lang="scss">
.search-item {
  line-height: 2.5;
  margin-bottom: 0;
}
.search-item-btns {
  float: right !important;
  padding-right: 0;
  padding-left: 0;
}
.op-btn{
  line-height: 30px !important;
  vertical-align: bottom;
}
.w80 {
  width: 50px !important;
  margin-right: 10px;
}
.module-box {
  background: #fff;
  padding-top: 20px;
  .module-title {
    padding: 0 15px;
    h5 {
      padding-left: 5px;
      font-size: 18px;
      color: #b10c79;
      border-left: 5px solid #c10c79;
      line-height: 18px;
    }
  }
  .module-content {
    padding: 20px 15px 0;
    .title{
      font-size: 18px;
      line-height: 28px;
      color: #444;
      margin-left: -10px;
    }
    .field-label{
      color: #999;
      line-height: 3;
      margin-right: 10px;
      display: inline;
    }
    .field-content{
      padding-right: 30px;
      display: inline;
    }
    .field-item{
      display: inline;
      font-size: 0;
      .field-label{font-size: 14px;}
      .field-content{font-size: 14px;}
    }
  }
  .system-search {
    padding-bottom: 0;
  }
}
.upload-demo {
  float: left;
  height: 30px;
  position: relative;
}
.el-upload-list {
  position: absolute;
  right: 150px;
  top: -7px;
}
.datepick {
  width: 120px;
}
.jiesuan-select {
  .el-select {
    display: inline-block;
    width: 60px;
  }
  .el-input {
    width: 80px;
  }
}

.el-tag{
  background-color: #fbf3f8;
  vertical-align: top;
  color: #b10c79
}
.trip-panel{
  border: 1px solid #ccc;
  // padding: 20px 0 0;
  .trip-item{
    padding: 0 20px;
  }
  .extra-item{
    border: 1px solid #ccc;
    display: inline-block;
    text-align: center;
    width: 120px;
    padding: 0 5px;
    margin-right: 10px;
    position: relative;
    line-height: 2;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all .3s cubic-bezier(.645,.045,.355,1);


    &.selected{
      border-color: #b10c79;
      .icon-check{
        display: block;
      }
    }
    &:hover{
      border-color: #b10c79;
    }
    &.disabled{
      cursor: default;
      &:hover{
        border-color: #ccc;
      }
    }
    .icon-check{
      display: none;
      position: absolute;
      background-image: url(./check_footer_icon.png);
      width: 13px;
      height: 13px;
      right: 0;
      bottom: 0;
      background-size: cover;
    }
  }
  .group-footer{
    text-align: right;
    padding: 25px 15px 0;
  }
  .trip-summary{
    margin-top: 25px;
    margin-bottom: 0;
    border-top: 1px solid #ccc;
    .extra-item{
      cursor: default;
      border: 1px dashed #ccc;
    }
  }
  .summary-footer{
    text-align: right;
    background: #fbf3f8;
    padding: 15px;
    margin-top: 25px;
    .color-orange{
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
