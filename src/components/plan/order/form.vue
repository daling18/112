<template>
<div class="wrapper">
  <div class="module-box">
    <div class="module-title">
        <h5>团队信息</h5>
    </div>
    <div class="module-content">
      <div class="system-content">
        <div class="table-title no-border" v-if="tuanInfo">
          <div class="title">
            <span class="color-orange">【{{tuanInfo.tuan_no}}】</span>
            {{tuanInfo.tuan_name}}
            <el-tag color="#b10c79" v-if="tuanInfo.line_type_name">{{tuanInfo.line_type_name}}</el-tag>
          </div>
          <table class="desc">
            <tr>
              <th>出发城市</th>
              <td>{{tuanInfo.departure_city}}</td>
              <th>出发日期</th>
              <td>{{tuanInfo.departure_date}}</td>
              <th style="width:66px;">返回日期</th>
              <td>{{tuanInfo.back_date}}</td>
              <td v-if="isBOMTrip && $menuPermission('api/product/step1')">
                <router-link class="color-purple" :to="{path: '/tripDetail', query: {id: tuanInfo.product_id}}">查看行程</router-link>
              </td>
            </tr>
          </table>
          <div class="btn-areas">
            <el-button type="primary"  @click="goto()">查看行程</el-button>
            <el-button @click="goto()">打印行程</el-button>
          </div>
        </div>
      </div>

      <el-form v-if="isBOMTrip" class="trip-panel" label-width="100px">
        <el-form-item v-for="(item, idx) in tuanInfo.extra_info" :key="idx" :label="item.name">
          <div v-for="extra in item.detail" :key="extra.id" 
              :class="{'extra-item': 1, 'selected': (addTouristGroup[item.id] && addTouristGroup[item.id].id) == extra.id}"
              @click="selectTouristGroup(item.id, extra)">
            {{extra.type == 0 ? extra.name : (extra.name + ' ' + extra.diff_peer_price)}}
            <i class="icon-check"></i>
          </div>
        </el-form-item>
        <div class="group-footer">
          基准价{{basePrice | formatPrice}}元
          <span v-for="item in addTouristGroup" :key="item.extra_id">
             + {{`${item.name}${item.diff_peer_price}`}} 元</span> = 单价 <span class="color-orange">{{addTouristGroupTotalPrice | formatPrice}}
          </span>
          <el-button type="primary" @click="handleAddTouristGroup">添加</el-button>
        </div>
        <el-form-item class="trip-summary" label="已选择" v-if="touristGroups.length > 0">
          <table border width="100%">
            <tbody>
              <tr v-for="(group, idx) in touristGroups" :key="idx"><td>
                <div class="extra-item" v-for="extra in group.group" :key="extra.id">{{extra.name}}</div>
              </td><td width="180" align="right" style="padding-right:15px">
                {{group.price | formatPrice}}元 * <el-input style="width:80px" :value="group.num" @input="handleChangeTouristNum(group, $event)"></el-input>人
              </td><td width="120">
                小计：<span class="color-orange">{{group.total | formatPrice}}</span>
              </td><td align="center" width="60">
                <a class="color-purple" href="javascript:;" @click="handleDelTouristGroup(group)">删除</a>
              </td></tr>
            </tbody>
          </table>
        </el-form-item>
        <div class="summary-footer">
          合计 <span class="color-orange">{{touristGroupTotal | formatPrice}}</span>
        </div>
      </el-form>
      <div class="mode-table" border v-else-if="tuanInfo">
        <el-table :data="tuanInfo.price_list" style="width: 100%">
          <el-table-column label="报价类型" prop="type_name" :resizable="false"></el-table-column>
          <el-table-column label="同行单价" prop="peer_price" :resizable="false"></el-table-column>
          <el-table-column label="对外单价/指导价" prop="out_price" :resizable="false"></el-table-column>
          <el-table-column label="需预付定金单价" prop="deposit_price" :resizable="false"></el-table-column>
          <el-table-column label="单房差" prop="diff_price" :resizable="false"></el-table-column>
        </el-table>
      </div>

    </div>
  </div>

  <div class="module-box" style="padding-bottom:10px;">
    <div class="module-title">
      <h5>结算信息</h5>
    </div>
    <div class="module-content">
      <div class="system-search">
        <div class="search-line-item" v-if="tuanInfo.order_info">
          <div class="search-item">
            <div class="label" style="width:120px;">订单确认状态</div>
            <el-select placeholder="请选择" v-model="orderFormData.confirm_status">
              <el-option v-for="(obj, key) in ORDER_STATUS_LISTS" :key="key" :label="obj" :value="Number(key)"></el-option>
            </el-select>
          </div>
          <div style="overflow: hidden;">
            <div class="search-item" style="margin-bottom: 10px;">
              <div class="label" style="width:120px;">代理商</div>
              <select-org v-model="orgination" placeholder="请输入关键词" :defaultList="DEFAULT_ORG_LIST"></select-org>
            </div>
            <div class="search-item">
              <div class="label" style="width:120px;">联系人姓名</div>
              <el-input v-model="orderFormData.distributor_real_name" style="width: 194px;"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="module-box">
    <div class="module-title">
      <h5>游客信息</h5>
    </div>
    <div class="module-content">
      <div class="system-search">
        <div class="search-line-item">
          <div class="search-item" style="width: 500px" v-if="isBOMTrip">
            <div class="label">出游人数</div><span class="fl lh30">{{tripTouristNumStr}}</span>
          </div>
          <div class="search-item" style="width: 500px;" v-else>
            <div class="label">出游人数</div>
            <span class="fl lh30">
              <el-input class="w80" :value="orderFormData.adult_num" @input="handleChangeTouristNum('adult_num', $event)"></el-input>
              <span class="note">成人</span>
            </span>
            <span class="fl lh30" v-if="tuanInfo.child_peer_price != 0">
              <el-input class="w80" :value="orderFormData.child_num" @input="handleChangeChildNum('child_num', $event)"></el-input>
              <span class="note">儿童</span>
            </span>
          </div>
          <div class="search-item search-item-btns">
            <el-upload
              style="display:inline-block; margin-left:10px;"
              action="/bom/api/tuan/import_tourists"
              :data="{id:$route.query.id}"
              name="file"
              :on-success="handleUploadSuccess"
              :show-file-list="false">
              <el-button>导入excel</el-button>
            </el-upload>
            <!--<el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList">
              <el-button type="primary" >导入excel</el-button>
            </el-upload>-->
            <a class="el-button el-button--primary" :href="tuanInfo.tourist_downloads" target="_blank">下载excel模版</a>
            <!--<a :href="orderFormData.tourist_downloads" target="_blank">下载excel模版</a>-->
          </div>
        </div>
      </div>

      <div class="mode-table">
        <el-table :data="orderFormData.tourist_lists" style="width: 100%">
          <el-table-column label="姓名" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.username"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="100">
            <template slot-scope="scope">
              <el-select placeholder="请选择" v-model="scope.row.gender">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="游客类型" width="120" v-if="!isBOMTrip">
            <template slot-scope="scope">
            <el-select v-if="tuanInfo.child_peer_price != 0" placeholder="请选择" :value="scope.row.tourist_type" @input="handleChangeTouristType(scope.row, $event)">
              <el-option v-for="(obj,key) in TOURIST_TYPE" :key="key" :label="obj" :value="obj"></el-option>
            </el-select>
            <span v-else>成人</span>
            </template>
          </el-table-column>
          <el-table-column label="证件类型" width="150">
            <template slot-scope="scope">
            <el-select placeholder="请选择" v-model="scope.row.identity_type">
              <el-option v-for="(obj,key) in CARD_TYPE"
                :key="key"
                :label="obj" :value="obj"></el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column label="证件号码" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.identity_no" @blur="handleAutoBirth(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="证件有效期" width="140">
            <template scope="scope">
              <el-date-picker v-model="scope.row.identity_end_date" type="date" placeholder="选择日期" class="datepick" :editable="false"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="国籍" width="100">
            <template slot-scope="scope"><world-select v-model="scope.row.nationality"></world-select></template>
          </el-table-column>
          <el-table-column label="手机号码" width="150">
            <template slot-scope="scope"><el-input v-model="scope.row.mobile"></el-input></template>
          </el-table-column>
          <el-table-column label="出生日期" width="130">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.birthday" type="date" placeholder="选择日期" class="datepick" :editable="false"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="是否合同签字人" width="80">
            <template slot-scope="scope">
              <el-select placeholder="请选择" v-model="scope.row.is_contract_sign">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <div class="tool">
                <el-button type="text" @click="handleClearTourist(scope.row)">清空</el-button>
                <el-button type="text" @click="handleDelTourist(scope)">删除</el-button>
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
      <div class="system-search">
        <div class="search-line-item">
          <div class="search-item">
            <div class="label" style="width:120px;">结算币种／汇率</div>
            <currency-picker v-model="orderFormData.currency" placeholder="选择货币" readonly="readonly"></currency-picker>
            <el-input v-model="orderFormData.currency_rate" @blur="handleBlurCurrencyRate" style="width:100px;margin-right:20px;"></el-input>
          </div>
          <div class="search-item" v-if="tuanInfo">
            <div class="label" style="width: 90px">结算总金额</div>
            <span v-show="orderFormData.confirm_status !== -1">
              <span class="color-orange">{{settlementAmount | formatPrice}}</span>
            </span>
            <span v-show="orderFormData.confirm_status == -1">
              <span class="color-orange">0.000</span>
            </span>
            <!-- 非已取消 + 选择已取消 -->
            <!-- <span v-show="cancelFlag && orderFormData.confirm_status == -1">
              <span class="color-orange">0.000</span>
            </span> -->
            <!-- 非已取消 + 选择非取消 -->
            <!-- <span v-show="cancelFlag && orderFormData.confirm_status !== -1">
              <span class="color-orange">{{js_total_amount}}</span>
            </span> -->
            <!-- 已取消 -->
            <!-- <span v-show="!cancelFlag">
              <span class="color-orange">0.000</span>
            </span> -->
          </div>
            <div class="search-item" v-if="tuanInfo">
              <div class="label">本位币</div>
              <span v-show="orderFormData.confirm_status !== -1">
               <span class="color-orange">￥{{rmbSettlementAmount | formatPrice}}</span>
              </span>
              <span v-show="orderFormData.confirm_status == -1">
               <span class="color-orange">￥0.000</span>
              </span>
              <!-- 非已取消 + 选择已取消 -->
              <!-- <span v-show="cancelFlag && orderFormData.confirm_status == -1">
               <span class="color-orange">0.000</span>
              </span> -->
              <!-- 非已取消 + 选择非取消 -->
              <!-- <span v-show="cancelFlag && orderFormData.confirm_status !== -1">
               <span class="color-orange">{{((js_total_amount * orderFormData.currency_rate * 100)/100).toFixed(3)}}</span>
              </span> -->
              <!-- 已取消 -->
              <!-- <span v-show="!cancelFlag">
               <span class="color-orange">0.000</span>
              </span> -->
            </div>
            <div class="search-item fr">
              <el-button type="primary" @click="handleAddDetailItem()">新增项目</el-button>
            </div>
        </div>
      </div>  
      <!-- 表格均为未取消状态，当手动选择取消的时候，下面show-summary控制即时显示合计项 -->
      <div class="mode-table">
        <el-table style="width: 100%"
            :data="orderFormData.order_price_detail"
            :summary-method="getCancelOrderSummaries"
            :show-summary="(orderFormData.confirm_status == -1) ? true : false">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column label="项目">
            <template slot-scope="scope">
              <p v-if="!scope.row.isadd">{{scope.row.item_name}}</p>
              <el-input v-model="scope.row.item_name" v-else></el-input>
            </template>  
          </el-table-column>
          <el-table-column label="单价（本位币）" width="120" align="right">
            <template slot-scope="scope">
              <span v-if="scope.row.operator == '-'">-</span>{{scope.row.rmb_unit_price | formatPrice}}
            </template>
          </el-table-column>
          <el-table-column label="结算单价" width="150">
            <template slot-scope="scope">
              <div class="jiesuan-select">
                <el-select placeholder="请选择" v-if="scope.row.isadd" v-model="scope.row.operator" @change="handleChangeOperator(scope.row, $event)">
                  <el-option label="+" value="+"></el-option>
                  <el-option label="-" value="-"></el-option>
                </el-select>
                <!-- <p v-if="!cancelFlag && scope.row.item_name=='取消订单'">
                  {{scope.row.unit_price | formatPrice}}
                </p> -->
                <p v-if="!scope.row.isadd && isBOMTrip">
                  <span v-if="scope.row.operator == '-'">-</span>{{scope.row.unit_price | formatPrice}}
                </p>
                <el-input v-else v-model="scope.row.unit_price" @blur="handleBlurUnitPrice(scope.row)"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="70" align="center">
            <template slot-scope="scope">
              <p v-if="!scope.row.isadd">{{scope.row.num}}</p>
              <el-input v-else
                  v-model="scope.row.num"
                  @blur="handleBlurNum(scope.row)">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="结算金额小计" width="120" align="right">
            <template slot-scope="scope">
              <span v-if="scope.row.operator == '-'">-</span>{{scope.row.total_amount | formatPrice}}
            </template>
          </el-table-column>
          <el-table-column label="小计（本位币）" width="120" align="right">
            <template slot-scope="scope">
              <span v-if="scope.row.operator == '-'">-</span>{{scope.row.rmb_total_amount | formatPrice}}
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template slot-scope="scope"><el-input v-model="scope.row.remark"></el-input></template>
          </el-table-column>
          <el-table-column label="操作" width="70" align="center"> 
            <template slot-scope="scope">
              <div class="tool">
                <span v-if="!scope.row.isadd">--</span>
                <el-button v-else type="text" @click="handleDelDetailItem(scope)">删除</el-button>
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
import { getOrderForm, getSearchOrg, setOrderForm } from "src/api/api";
import { formattDate } from "src/assets/js/common.js";
import CurrencyPicker from "src/plugins/currency-picker/index.vue";
import WorldSelect from "src/plugins/WorldSelect.vue";
import SelectOrg from "src/plugins/SelectOrg.vue";
// import SimpleElSelect from "./SimpleElSelect.comp.vue";
// 没有使用页面 qzhchen 20180309
export default {
  components: {
    CurrencyPicker,
    WorldSelect,
    SelectOrg
  },
  data() {
    const {id, order_no} = this.$route.query;

    return {
      tuanInfo: '',
      ORDER_STATUS_LISTS: {},
      TOURIST_TYPE: {},
      TRIP_TOURIST_TYPE: {},  // bom行程人群类型项
      DEFAULT_ORG_LIST: [],
      CARD_TYPE: {},
      
      addTouristGroup:{},
      touristGroups: [],
      orderFormData: {
        id: id,
        order_no: order_no || '',
        adult_num: 0,
        child_num: 0,
        order_price_detail: [],
        tourist_lists: [],
        confirm_status: 1,
        currency: '',
        currency_rate: 0,
        distributor_org_id: 0,
        distributor_org_name: '',
        distributor_real_name: ''
      },
      settlementAmount: 0,
      rmbSettlementAmount: 0
    };
  },
  computed: {
    isBOMTrip(){ // 是否是bom行程团
      return this.tuanInfo && this.tuanInfo.type == 3;
    },
    basePrice(){
      const {price_list} = this.tuanInfo;
      const basePrice = price_list && price_list[0] && price_list[0].peer_price;

      return basePrice || '0.000';
    },
    addTouristGroupTotalPrice() {
      let price = Number(this.basePrice);

      _.forEach(this.addTouristGroup, (value) => {
        //  console.log('select tourist type: ', value);
        price += Number(value.diff_peer_price);
      })
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
        })
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
         console.log('set org: ', val);
        val = val || {};

        this.orderFormData.distributor_org_id = val.org_id;
        this.orderFormData.distributor_org_name = val.org_name;
      }
    }
  },
  filters: {
    formatPrice(price){
      const num = Number(price) || 0;

      return num.toFixed(3);
    }
  },
  watch: {
  },
  methods: {
    getTuanInfo() {
      const {id, order_no} = this.$route.query;
      let params = {data: {id, order_no}};

      getOrderForm({
        params,
        success: res => {
          const {code, data} = res.data;
          if(code !== 0){
            return this.$message({
              message: res.data.msg,
              type: "error"
            });
          }

          const {order_info, extra_info, order_price_detail, tourist_lists} = data;
          const extraInfoMap = [];

          this.tuanInfo = data;
          this.ORDER_STATUS_LISTS = data.order_status_lists;
          this.TOURIST_TYPE = data.tourist_type;
          this.DEFAULT_ORG_LIST = data.org_info;
          this.CARD_TYPE = data.card_type;
          if(Array.isArray(extra_info)){
            extra_info.forEach(extra => {
              if(extra.is_default === 1 && extra.name === '人群类型'){
                this.TRIP_TOURIST_TYPE = extra; 
              }
              extraInfoMap[extra.id] = extra.detail.reduce((prev, curr) => {
                prev[curr.id] = curr;
                return prev; 
              }, {});
            })
          }

          this.orderFormData = order_info;
          this.orderFormData.id = id; 
          this.orderFormData.currency_rate = Number(this.orderFormData.currency_rate).toFixed(4); 
          this.addTouristGroup = this.getNewTouristGroup();
          // 判断是否是编辑订单，新建默认添加一个成人游客
          if(order_no){
            if(Array.isArray(order_info.extra_detail_attr) && extraInfoMap.length){
              //  console.log('extra_info map:', extraInfoMap);
              this.touristGroups = order_info.extra_detail_attr.map(item => {
                let price = - this.basePrice;
                const group = item.group.reduce((prev, curr) => {
                  if(extraInfoMap[curr.extra_id] && extraInfoMap[curr.extra_id][curr.id]){
                    prev[curr.extra_id] = extraInfoMap[curr.extra_id][curr.id];
                    price -= prev[curr.extra_id].diff_peer_price;
                  }
                  return prev;
                }, {});

                return {group, num: item.num, price: -price}
              })
            }
            this.settlementAmount = Number(order_info.total_amount) || 0;
            this.rmbSettlementAmount = Number(order_info.rmb_total_amount) || 0;
            this.orderFormData.tourist_lists = tourist_lists;
            // 过滤掉取消订单的明细项
            this.orderFormData.order_price_detail = order_price_detail.filter(item => {
              // 处理operator为 - 的记录返回的负数，转成正数，因为页面都是使用正数进行计算
              if(item.operator == '-'){
                item.unit_price = Math.abs(item.unit_price);
                item.total_amount = Math.abs(item.total_amount);
                item.rmb_unit_price = Math.abs(item.rmb_unit_price);
                item.rmb_total_amount = Math.abs(item.rmb_total_amount);
              }
              return item.item_name != '取消订单' || item.isadd !== 0;
            });
          }else{
            // 重置游客类型人数，游客列表，订单明细
            this.orderFormData.adult_num = 0;
            this.orderFormData.confirm_status = 1;
            this.orderFormData.tourist_lists = [];
            this.orderFormData.order_price_detail = [];
            // 添加默认游客：1成人游客
            if(this.isBOMTrip){
              this.handleAddTouristGroup();
              this.handleChangeTouristNum(this.touristGroups[0], 1);
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
          })
        })
      }
      return addTouristGroup;
    },
    getNewTourist(tourist_type = '') {
      let tourist_row = {
        // id:'',
        birthday: "",
        bpm_tourist_id: "",
        create_time: "",
        gender: "男",
        is_contract_sign: 1,
        identity_end_date: "",
        identity_no: "",
        identity_type: "身份证",
        mobile: "",
        nationality: "中国",
        order_from: "",
        order_no: "",
        remark: "",
        tourist_type: tourist_type,
        tuan_id: "",
        tuan_no: "",
        update_time: "",
        username: ""
      };
      return tourist_row;
    },
    getNewOrderPriceDetailItem() {
      let order_row = {
        // id:'',
        item_name: "",
        rmb_unit_price: 0,
        unit_price: 0,
        num: 0,
        total_amount: 0,
        rmb_total_amount: 0,
        remark: "",
        operator: "+",
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
          sumRow.push(Number(-this.rmbSettlementAmount).toFixed(3));
        }else if(item.label == '结算单价' || item.label == '结算金额小计'){
          sumRow.push(Number(-this.settlementAmount).toFixed(3));
        }else{
          sumRow.push('--');
        }
      })

      return sumRow;
    },
    // 检查单价组合是否存在
    checkTouristGroup(){
      const {touristGroups, addTouristGroup, tuanInfo: {extra_info}} = this;
      let existGroup = false;

      touristGroups.forEach(group => {
        if(extra_info.every(extra => addTouristGroup[extra.id] == group.group[extra.id])){
          //  console.log('exist group', group.group, addTouristGroup);
          existGroup = true;
          return false;
        }else{
          //  console.log('not exist group');
        }
      });
      return existGroup;
    },
    checkTouristList(){
      const {tourist_lists} = this.orderFormData;
      if(!Array.isArray(tourist_lists) || tourist_lists.length == 0){
        this.$message.error('请添加游客信息');
      }
      return tourist_lists.some((item, idx) => {
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
        if(!item.mobile){
          this.$message.error(`请填写第${idx + 1}个游客手机号码`);
          return true;
        }
        return false;
      })
    },
    checkOrderPriceDetail(){
      const {order_price_detail} = this.orderFormData;

      if(!Array.isArray(order_price_detail) || order_price_detail.length == 0){
        this.$message.error('请添加订单价格明细记录');
      }
      return order_price_detail.some((item, idx) => {
        if(!item.item_name){
          this.$message.error(`请填写第${idx + 1}项项目名称`);
          return true;
        }
        // if(item.unit_price < 1 || item.unit_price > 100000000){
        //   this.$message.error(`项目单价只能在1-100000000之间`);
        //   return true;
        // }
        return false;
      })

    },
    selectTouristGroup(type, value){
      //  console.log('select tourist group: ', this.addTouristGroup[type], value);
      this.$set(this.addTouristGroup, type, value);
    },
    // 更新游客类型对应人数和游客列表
    updateBOMTripTouristInfo(group, num, delStartIndex){
      const {orderFormData, TRIP_TOURIST_TYPE} = this;
      
      if(!group || !TRIP_TOURIST_TYPE){
        return false;
      }
      const touristType = group[TRIP_TOURIST_TYPE.id];
      const {other_type_num, tourist_lists} = orderFormData;
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
          })
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
          //  console.log('del from', delStartIndex, - num);
          tourist_lists.splice(delStartIndex, - num);
        }else{
          tourist_lists.splice(num);
        }
      }else{
         console.log('tourist type', group);
        this.$message.error('人群类型不存在');
      }
    },
    updateTDMTouristInfo(type, num, delStartIndex){
      const {tourist_lists} = this.orderFormData;
      let touristType = type == 'child_num' ? '儿童' : '成人';

      if(num > 0){
        for(let i=0; i<num; i++){
          tourist_lists.push(this.getNewTourist(touristType));
        }
         console.log('add TDM tourist:', touristType, num);
      }else if(_.isInteger(delStartIndex) && delStartIndex > -1){
        tourist_lists.splice(delStartIndex, - num);
         console.log('del TDM tourist index:', delStartIndex, num);
      }else{
        for(let i = tourist_lists.length - 1, j = num; i >= 0 && j < 0; i--){
          if(tourist_lists[i].tourist_type == touristType){
            tourist_lists.splice(i, 1);
            j ++;
          }
        }
         console.log('del TDM tourist:', touristType, num);
      }
    },
    updateBOMTripOrderDetailList(groupItem, addTouristNum){
      const {order_price_detail} = this.orderFormData;
      const baseToristGroup = this.getNewTouristGroup();
      const changeItemType = ['成人团费'];
      let defaultItemIndex = 0, 
          totalTouristNum = addTouristNum;  // 如果当前没有明细项，则总游客人数等于当前添加的游客人数

      // 计算变更价格明细项，过滤掉基准类型项
      _.forEach(groupItem.group, (value, key) => {
        if (baseToristGroup[key] != value) {
          changeItemType.push(value);
        }
      });
      changeItemType.push('单房差'); // 添加单房差项在最后，确保能获得当前的游客人数

      //  console.log('change item type: ', changeItemType);
      // 遍历当前订单价格明细列表，更新
      order_price_detail.forEach(item => {
        let changeItemTypeIndex = -1;

        changeItemType.forEach((val, key) => {
          if(item.item_name === (val.name || val) && !item.isadd){
            changeItemTypeIndex = key;
          }
        })
        if(changeItemTypeIndex != -1){
          // 已存在的明细项，从changeItemType移除对应的key，更新明细项的内容
          if(item.item_name == '单房差'){ // 单房差根据游客数决定是否存在
            item.num = totalTouristNum % 2;
          }else{
            item.num = Number(item.num) + addTouristNum;
          }
          changeItemType.splice(changeItemTypeIndex, 1);
          item.total_amount = item.num * item.unit_price;
          item.rmb_total_amount = item.num * item.rmb_unit_price;
          if(item.item_name == '成人团费'){
            totalTouristNum = item.num;
          }
        }
        if(changeItemTypeIndex != -1){ // 计算最后一个默认价格明细项位置
          defaultItemIndex ++;
        }
      });
      // 存在未变更项, 添加变更项到列表中
      if(changeItemType.length > 0){
        changeItemType.forEach(item => {
          let unit_price, name;
          let num = addTouristNum;
          
          if(item == '成人团费'){
            name = item;
            unit_price = this.basePrice;
          }else if(item == '单房差'){
            if(totalTouristNum % 2 === 0){
              return;
            }else{
              name = item;
              num = 1;
              unit_price = this.tuanInfo.diff_price;
            }
          }else{
            name = item.name;
            unit_price = item.diff_peer_price;
          }
          this.handleAddDetailItem(name, unit_price, num, defaultItemIndex, 0);
          defaultItemIndex ++;
        })
      }
    },
    updateTDMOrderDetailList(type, addTouristNum){
      const {order_price_detail, adult_num, child_num} = this.orderFormData;
      const {adult_peer_price, child_peer_price, diff_price} = this.tuanInfo;
      
      const changeItemType = [];
      let defaultItemIndex = 0, 
          totalTouristNum = adult_num + child_num + addTouristNum;

      changeItemType.push(type == 'child_num' ? '儿童团费' : '成人团费');
      changeItemType.push('单房差'); // 添加单房差项在最后，确保能获得当前的游客人数

      //  console.log('change item type: ', changeItemType);
      // 遍历当前订单价格明细列表，更新
      order_price_detail.forEach(item => {
        let changeItemTypeIndex = -1;

        changeItemType.forEach((val, key) => {
          if(item.item_name === val && !item.isadd){
            changeItemTypeIndex = key;
          }
        })
        if(changeItemTypeIndex != -1){
          // 已存在的明细项，从changeItemType移除对应的key，更新明细项的内容
          if(item.item_name == '单房差'){ // 单房差根据游客数决定是否存在
            item.num = totalTouristNum % 2;
          }else{
            item.num = Number(item.num) + addTouristNum;
          }
          changeItemType.splice(changeItemTypeIndex, 1);
          item.total_amount = item.num * item.unit_price;
          item.rmb_total_amount = item.num * item.rmb_unit_price;
        }
        if(changeItemTypeIndex != -1){ // 计算最后一个默认价格明细项位置
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
          }else{
            this.handleAddDetailItem(item, adult_peer_price, addTouristNum, defaultItemIndex, 0);
          }
          defaultItemIndex ++;
        })
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
      
      // 删除num为0的项目, 更新结算总金额
      let settlementAmount = 0, rmbSettlementAmount = 0;

      for(let i = order_price_detail.length - 1; i >= 0; i--){
        let item = order_price_detail[i];

        if(item.num == 0){
          order_price_detail.splice(i, 1);
        }
        if(item.operator == '-'){
          settlementAmount -= item.total_amount;
          rmbSettlementAmount -= item.rmb_total_amount;
        }else{
          settlementAmount += item.total_amount;
          rmbSettlementAmount += item.rmb_total_amount;
        }
      }
      this.settlementAmount = settlementAmount;
      this.rmbSettlementAmount = rmbSettlementAmount;
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
      //  console.log('add group: ', addTouristGroup);
      touristGroups.push({
        group: addTouristGroup,
        price: addTouristGroupTotalPrice,
        num: 0,
        total: 0
      });
    },
    handleDelTouristGroup(group){
      let index = this.touristGroups.indexOf(group);

      if(index != -1){
        this.touristGroups.splice(index, 1);
        this.handleChangeTouristNum(group, 0);
        //  console.log('del tourist group:', group, index);
      }
    },
    handleChangeTouristNum: _.debounce(function(type, newNum, delTouristStartIndex){
      if(!/^\d+$/.test(newNum)){
        return this.$message.error('人数请输入数字');
      }
      let oldTouristNum = this.isBOMTrip ? type.num : this.orderFormData[type];
      let addTouristNum = 0;

      newNum = Number(newNum);
      if(oldTouristNum){
        addTouristNum = newNum - oldTouristNum;
      }else{
        addTouristNum = newNum;
      }
      if(addTouristNum == 0) {
        return false;
      }

      if(this.isBOMTrip){
        // 更新游客数和列表
        this.updateBOMTripTouristInfo(type.group, addTouristNum, delTouristStartIndex);

        // 更新订单价格明细
        this.updateOrderDetail(type, addTouristNum)
        type.num = newNum;
        type.total = type.price * newNum || 0;
      }else{
        this.updateTDMTouristInfo(type, addTouristNum, delTouristStartIndex);
        this.updateOrderDetail(type, addTouristNum);

        this.orderFormData[type] = newNum;
      }
      //  console.log('update tourist group num and total', item);
    }, 300),
    // 计算成人儿童，修改成人儿童
    handleChangeTouristType(row, newVal) {
      if(row.tourist_type == newVal){
        return false;
      }
       console.log('tourist type change', row, newVal);
      const typeKeyMap = {'儿童': 'child_num', '成人': 'adult_num'};
      const newKey = typeKeyMap[newVal], key = typeKeyMap[row.tourist_type];
      
      this.orderFormData[newKey] ++;
      this.orderFormData[key] --;

      this.updateTDMOrderDetailList(newKey, 1);
      this.updateTDMOrderDetailList(key, -1);
      row.tourist_type = newVal;
    },
    // 导入名单
    handleUploadSuccess(response, file, fileList) {
      let touristList = [];

      if (response.code == "0" && response.data) {
        const {data, adult_num, child_num} = response.data;
        const {tourist_lists} = this.orderFormData;
        if(this.isBOMTrip){
          if(data.length != tourist_lists.length){
            this.$message.error('请填写和当前游客数一样条数的游客记录');
          }else{
            this.orderFormData.tourist_lists = data;
          }
        }else{
          touristList = touristList.concat(this.orderFormData.tourist_lists, data);
          if(adult_num){
            this.handleChangeTouristNum('adult_num', adult_num);
          }
          if(child_num){
            this.handleChangeTouristNum('child_num', child_num);
          }
          // 因为handleChangeTouristNum有延迟输入处理，所以这里也添加延迟
          setTimeout(() => {
            this.orderFormData.tourist_lists = touristList;
            this.$message({message: response.msg, type: "success"});
          }, 500);
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
      if (e.identity_type == "身份证" && e.identity_no.length == 18) {
        tmpY = e.identity_no.substring(6, 10);
        tmpM = e.identity_no.substring(10, 12);
        tmpD = e.identity_no.substring(12, 14);
        e.birthday = tmpY + "-" + tmpM + "-" + tmpD;
      }
    },
    // 清空游客信息
    handleClearTourist(tourist){
      if(tourist){
        tourist.birthday = "";
        tourist.bpm_tourist_id = "";
        tourist.create_time = "";
        tourist.gender = "";
        tourist.is_contract_sign = 1;
        tourist.identity_end_date = "";
        tourist.identity_no = "";
        tourist.identity_type = "身份证";
        tourist.mobile = "";
        tourist.nationality = "中国";
        tourist.order_from = "";
        tourist.order_no = "";
        tourist.remark = "";
        // tourist.tourist_type = "";  // TDM订单清除时不清空该内容，bom订单不显示该字段
        tourist.tuan_id = "";
        tourist.tuan_no = "";
        tourist.update_time = "";
        tourist.username = "";
      }
    },
    handleDelTourist(scope) {
      let index = scope.$index;

      if (this.orderFormData.tourist_lists.length <= 1) {
        this.$message({
          message: "至少保留一条数据！",
          type: "warning"
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
          let type = scope.row.tourist_type == '儿童' ? 'child_num' : 'adult_num';

          this.handleChangeTouristNum(type, this.orderFormData[type] - 1, index);
        }
        // this.orderFormData.tourist_lists.splice(index, 1);
      }
    },
    handleBlurCurrencyRate(){
      const {currency_rate, order_price_detail} = this.orderFormData;
      let rate = 1;

      // 输入错误格式时，使用计算出来就的汇率替换
      let settlementAmount = Number(this.settlementAmount);
      if(settlementAmount){
        rate = this.rmbSettlementAmount / settlementAmount;
      }
      if(!/^\d+(\.\d*)?$/.test(currency_rate)){
        this.$message.error('请输入正确的汇率数值');
      }else if(currency_rate > 100000000){
        this.$message.error('请输入小于100000000的数值');
      }else{
        let rmbSettlementAmount = 0;

        rate = Number(currency_rate);
        if(Array.isArray(order_price_detail)){
          order_price_detail.forEach(item => {
            item.rmb_unit_price = this.orderFormData.currency_rate * item.unit_price;
            item.rmb_total_amount = this.orderFormData.currency_rate * item.total_amount;
            rmbSettlementAmount += item.operator == '-' ? (-item.rmb_total_amount) : item.rmb_total_amount;
          })
        }
        this.rmbSettlementAmount = rmbSettlementAmount;
      }
      this.orderFormData.currency_rate = rate.toFixed(4);
    },
    handleBlurUnitPrice(row){
      const {currency_rate} = this.orderFormData;
      let unit_price = 0;
      let num = Number(row.num) || 0;

      if(num){
        unit_price = row.total_amount / num;
      }
      if(!/^\d+(\.\d*)?$/.test(row.unit_price)){
        this.$message.error('请输入正确的数字(非负数)');
        // 输入错误格式时，使用计算出来就的汇率替换
      }else if(row.unit_price > 100000000){
        this.$message.error('请输入小于100000000的数值');
      }else{
        let oldTotalAmount = row.total_amount, oldRmbTotalAmount = row.rmb_total_amount;
        unit_price = Number(row.unit_price);
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
      row.unit_price = unit_price.toFixed(3);
    },
    handleBlurNum(row){
      const {currency_rate} = this.orderFormData;
      let unit_price = Number(row.unit_price) || 0;
      let num = 0;

      if(!/^\d+$/.test(row.num)){
        this.$message.error('数量格式不正确');
        // 输入错误格式时，使用计算出来就的汇率替换
        if(unit_price){
          num = row.total_amount / unit_price;
        }
      }else{
        let oldTotalAmount = row.total_amount, oldRmbTotalAmount = row.rmb_total_amount;
        num = Number(row.num);
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
      row.num = num;
    },
    handleChangeOperator(row, val){
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
    handleAddDetailItem(name = '', price = 0, num = 0, index = '', isadd = 1) {
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
      }
      
      if(index === ''){
        order_price_detail.push(newItem);
      }else{
        order_price_detail.splice(index, 0, newItem);
      }
    },
    handleDelDetailItem(scope) {
      this.orderFormData.order_price_detail.splice(scope.$index, 1);
    },
    handleSubmitForm(){
      const {orderFormData, touristGroups, isBOMTrip} = this;

      if(isBOMTrip){
        orderFormData.extra_detail_attr = [];
        touristGroups.forEach(item => {
          if(item.num > 0){
            orderFormData.extra_detail_attr.push({
              group: _.map(item.group, item => ({id: item.id, "extra_id": item.extra_id})),
              num: item.num
            })
          }
        });
        if(orderFormData.extra_detail_attr.length == 0){
          return this.$message.error('请填写游客人数');
        }
      }else{
        if(orderFormData.adult_num < 1 && orderFormData.child_num < 1){
          return this.$message.error('请填写游客人数');
        }
      }
      if(!orderFormData.distributor_org_id){
        return this.$message.error('请填写代理商');
      }
      if(!orderFormData.distributor_real_name){
        return this.$message.error('请填写联系人姓名');
      }
      if(this.checkTouristList() || this.checkOrderPriceDetail()){
        return
      }

      setOrderForm({
        params: {data: orderFormData},
        success: res => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == "0" ? "success" : "error"
          });
          if (res.data.code == "0") {
            this.$router.push({path: "/tuan-list", query: { id: this.$route.query.id }});
          }
        },
        showLoading: true
      });
    },
    goback() {
      history.go(-1);
    },
  },
  // updated() {
  //    console.log("simple-el-select spend time", Date.now() - this.startTime);
  // },
  mounted() {
    this.getTuanInfo();
  }
};
</script>

<style scoped lang="scss">
.search-item {
  line-height: 25px;
  margin-bottom: 0;
}
.search-item-btns {
  float: right !important;
  padding-right: 0;
  padding-left: 0;
}
.note {
  float: left;
  margin: 0 8px 0 5px;
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
    padding: 0 15px;
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
  vertical-align: top;
}
.trip-panel{
  border: 1px solid #ccc;
  padding: 20px 0 0;

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
    padding: 0 15px;
    .el-button{
      padding: 0 35px;
      line-height: 30px;
      margin-left: 10px;
    }
  }
  .trip-summary{
    margin-top: 25px;
    margin-bottom: 0;
    border-top: 1px solid #ccc;
    padding-top: 20px;
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
