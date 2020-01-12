<template>
  <div class="wrapper bids-wrap">
    <div class="system-content">
      <div class="mod-form">
        <div class="add-newbids-btn-wrap">
          <el-button type="primary" size="long" @click="shownewPiliang" :disabled="isnewPiliang">+ 新增报价</el-button>
        </div>
        <div class="bids-list">
          <el-table :data="bids_list" style="width: 100%" border>
            <el-table-column label="日期显示" align="center" width="100">
              <template slot-scope="scope">
                <el-checkbox
                  @input="changeDate(scope, $event)"
                  v-model="scope.row.checkdate"
                  :disabled="isnewPiliang"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="价格类型" align="center" width="100">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                  <div class="ellipsis">{{scope.row.name}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="结算价" align="center" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.settle_price}}</div>
              </template>
            </el-table-column>
            <el-table-column label="销售价" align="center" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.sales_price}}</div>
              </template>
            </el-table-column>
            <el-table-column label="最低限价" align="center" width="100">
              <template slot-scope="scope">
                <div>{{scope.row.minimum_price}}</div>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.checkStatus"
                  active-text=""
                  inactive-text=""
                  active-color="#b10c79"
                  :disabled=swStatus
                  @click.native="switchIndex(scope.row.id)"
                  @change="changePriceStatus(scope.row, $event)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div class="operation-wrapper">
                  <el-button type="text" :disabled="isnewPiliang" @click="handleAddPriceDate(scope.row.id,scope.row.name)">新增报价日期</el-button>
                  <el-button
                    type="text"
                    :disabled="isnewPiliang"
                    @click="handleEditPriceFun(scope.row.id,scope.row.name)"
                  >编辑报价</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="piliang-wrap" v-if="isnewPiliang">
          <el-button size="long" @click="handleSelectDate('all')">全选</el-button>
          <el-button size="long" @click="handleSelectDate('work')">选择工作日</el-button>
          <el-button size="long" @click="handleSelectDate('week')">选择周六日</el-button>

          <el-button @click="cancelpiliangdoPriceType" size="long">取消</el-button>
          <el-button @click="piliangdoPriceType" type="primary" size="long">确认</el-button>
        </div>
        <tuan-datecalendar 
          :isnewPiliang = "isnewPiliang" 
          :date = "date" 
          @createCalendar = "createCalendar"
          @showPriceDate = "showPriceDate"
          @delDate = "delDate"
          @selDay = "selDay"
          @dayPiliang = "dayPiliang"
        ></tuan-datecalendar>
      </div>
    </div>

    <!-- 新增价格类型弹窗 -->
    <el-dialog
      :title="editType == 2 ? '新增价格类型': '编辑'"
      :visible.sync="priceTypeDialog"
      :close-on-click-modal="false"
    >
      <el-form v-if="priceAllData.length > 0">
        <el-form-item label="价格类型" label-width="100px" required>
          <el-input class="width2" v-model="priceType.name" placeholder="如：周末价／厦门出发（厦门成团）" :disabled="editType == 3"></el-input>
        </el-form-item>
        <template v-if="editType == 1 || editType == 2">
          <el-form-item label="出发城市" label-width="100px" required>
            <ul class="cityList">
              <li v-for="(city , idx) in cityOptions" :key="idx" :class="{on:idx == cityIndex}">
                <span @click="handleChangeCityStatus(idx)">{{city.area_name}}</span>
                <i
                  v-if="cityOptions.length > 1"
                  @click="handleRemoveCity(idx)"
                  class="el-icon-close removeCityBtn"
                ></i>
              </li>
            </ul>
            <div class="addCityBox">
              <el-select
                v-model="addCitySelect"
                filterable
                remote
                reserve-keyword
                placeholder="输入城市名"
                :remote-method="handleSearchCity"
                :loading="loading"
              >
                <el-option
                  v-for="item in allCity"
                  :key="item.id"
                  :label="item.area_name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button class="addBtn" @click="handleAddCity">添加</el-button>
            </div>
          </el-form-item>
          <el-form-item label="套餐名称" label-width="100px" required>
            <ul class="pageList">
              <li v-for="(item , idx) in priceAllData[cityIndex].package_list" :key="idx" :class="{on:idx == packageIndex}">
                <span class="label" @click="handleChangePackageStatus(idx)">{{item.package_name}}</span>
                <span class="btnBox">
                  <i @click="handleRemovePackage(idx,item.id)" v-if="priceAllData[cityIndex].package_list.length > 1">删除</i>
                  <i @click="open(item,idx)">编辑</i>
                </span>
              </li>
            </ul>
            <div class="addCityBox">
              <el-input type="text" class="inputBox" v-model="addPackageName"></el-input>
              <el-button class="addBtn" @click="handleAddPackage">添加</el-button>
            </div>
          </el-form-item>
          <template>
            <el-table :data="priceAllData[cityIndex].package_list[packageIndex].price_list" style="width: 100%;margin-bottom: 20px;">
              <el-table-column label="游客类型" :render-header="renderHeader" width="180" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.name"
                    :disabled="scope.row.name === '成人' && scope.$index === 0"
                    value="scope.row.name"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="结算价" :render-header="renderHeader" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.settle_price" value="scope.row.settle_price"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="销售价" :render-header="renderHeader" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sales_price" value="scope.row.sales_price"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="最低限价" :render-header="renderHeader" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.minimum_price" value="scope.row.minimum_price"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i
                    v-if="scope.row.name == '成人' && scope.$index === 0"
                    class="el-icon-plus"
                    style="font-size: 14px; color: #b10c79;"
                    @click="handleAddPrice"
                  ></i>
                  <i
                    v-else
                    class="el-icon-minus"
                    style="font-size: 14px; color: #b10c79;"
                    @click="handleRemovePrice(scope.$index,scope.row.id)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </template> 
        <template v-if="editType == 1">
          <el-form-item label="报价日期" label-width="120px" required>
            <span v-for="(item, index) in price_date" :key="index" class="piliang-pd">{{item}}</span>
          </el-form-item>
        </template>
        <template v-if="editType == 2 || editType == 3">
          <el-form-item label="单房差" label-width="120px">
            <el-checkbox v-model="room_diff_price_status" @change="handleChangeStatus"></el-checkbox>
            <template v-if="room_diff_price_status">
              <input-number
                class="width1"
                v-model="priceType.room_diff_price"
                :disabled="!room_diff_price_status"
              />
              <!-- <el-input-number class="width1" :controls="false" v-model="priceType.room_diff_price" :disabled="!room_diff_price_status" /> -->
              <span>元/人</span>
            </template>
          </el-form-item>
          <div v-if="priceDetail">
            <template>
              <el-form-item label="报价日期" label-width="120px" required>
                <span v-for="(item, index) in price_date" :key="index" class="piliang-pd">{{item}}</span>
              </el-form-item>
            </template>
            <el-form-item label="二次确认" label-width="120px" required>
              <el-radio v-model="priceType.is_confirm" label="1">需二次确认</el-radio>
              <el-radio v-model="priceType.is_confirm" label="0">无需二次确认</el-radio>
            </el-form-item>
            <template v-if="priceType.is_confirm == 0" required>
              <el-form-item label="库存预警" label-width="120px" required>
                <input-number class="yj" v-model="priceType.warning_plan_num"/>
                <!-- <el-input-number class="yj" :controls="false" v-model="priceType.warning_plan_num"/> -->
                <span class="yj-txt">（库存低于预警值进行预警）</span>
              </el-form-item>
              <el-form-item label="库存" label-width="120px" required>
                <input-number class="width1" v-model="priceType.stock"/>
                <!-- <el-input-number class="width1" :controls="false" v-model="priceType.stock"/> -->
              </el-form-item>
            </template>
            <el-form-item label="收客截止时间" label-width="120px" required>
              <span>提前</span>
              <input-number class="width3" v-model="priceType.end_day_time"/>
              <!-- <el-input-number class="width3" :controls="false" v-model="priceType.end_day_time"/> -->
              <span>天，并于</span>
              <el-time-select
                v-model="priceType.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '01:00',
                  end: '24:00'
                }"
                placeholder="选择时间">
              </el-time-select>
              <span>时停止报名</span>
            </el-form-item>
            <template v-if="priceType.is_confirm == 0">
              <el-form-item label="占位有效时间" label-width="120px" required>
                <input-number class="yj" v-model="priceType.seat_end_time" />
                <!-- <el-input-number class="yj" :controls="false" v-model="priceType.seat_end_time"/> -->
                <el-select v-model="priceType.seat_type" placeholder="请选择">
                  <el-option
                    v-for="item in timeSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </div>
        </template>
      </el-form>
      <div slot="footer" class="textcen">
        <el-button @click="showNewPriceType(0)">取消</el-button>
        <el-button @click="doPriceType" type="primary">{{priceId == 0 ? '保存': '确认'}}</el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="删除报价" :visible.sync="deldateDialog" :close-on-click-modal="false" size="tiny">
      <p class="tip-p">确认删除该日期报价</p>
      <div slot="footer" class="textcen">
        <el-button @click="deldatecancle">取消</el-button>
        <el-button @click="deldateconfirm" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改报价" :visible.sync="planDialog" :close-on-click-modal="false">
      <el-form class="extra-form">
        <el-form-item label="二次确认" label-width="100px" required>
          <el-radio v-model="warehouse.is_confirm" label="1">需二次确认</el-radio>
          <el-radio v-model="warehouse.is_confirm" label="0">无需二次确认</el-radio>
        </el-form-item>
        <template>
          <el-form-item v-show="warehouse.is_confirm == 0" label="库存预警" label-width="100px" required>
            <input-number class="width1" v-model="warehouse.warning_plan_num" />
            <!-- <el-input-number class="width1" :controls="false" v-model="warehouse.warning_plan_num"/> -->
            <span class="tip-p">注：总库存量应大于已售买量</span>
          </el-form-item>
        </template>
        <template>
          <el-form-item v-show="warehouse.is_confirm == 0" label="库存" label-width="100px" required>
            <input-number class="width1" v-model="warehouse.stock" />
            <!-- <el-input-number class="width1" :controls="false" v-model="warehouse.stock"/> -->
          </el-form-item>
        </template>
        <el-form-item label="单房差" label-width="120px">
          <el-checkbox v-model="warehouse.room_diff_price_status" @change="handleItemPriceStatus"/>
          <!-- <input-number
            class="width1"
            v-model="warehouse.room_diff_price"
            :value="warehouse.room_diff_price"
            :disabled="!warehouse.room_diff_price_status"
          /> -->
          <template v-if="warehouse.room_diff_price_status">
            <input-number class="width1" v-model="warehouse.room_diff_price" />
            <span>元/人</span>
          </template>
        </el-form-item>
        <el-form-item label="收客截止时间" label-width="120px" required>
          <span>提前</span>
          <input-number class="width3" v-model="warehouse.end_day_time" :value="warehouse.end_day_time" />
          <!-- <el-input-number class="width3" :controls="false" v-model="warehouse.end_day_time"/> -->
          <span>天，并于</span>
          <el-time-select
            v-model="warehouse.end_time"
            :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '24:00'
            }"
            placeholder="选择时间">
          </el-time-select>
          <span>时停止报名</span>
        </el-form-item>
        <template>
          <el-form-item v-if="warehouse.is_confirm == 0" label="占位有效时间" label-width="120px" required>
            <input-number class="yj" v-model="warehouse.seat_end_time" :value="warehouse.seat_end_time" />
            <!-- <el-input-number class="yj" :controls="false" v-model="warehouse.seat_end_time"/>             -->
            <el-select v-model="warehouse.seat_type" placeholder="请选择">
              <el-option
                v-for="item in timeSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="textcen">
        <el-button @click="handleCancel">取消</el-button>
        <el-button @click="updatePlanNum" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // import {
  //          priceTypeList,
  //          priceType, 
  //          doPriceType, 
  //          changePriceStatus,
  //          doBatchQuotation,
  //          setExtra,
  //          doSetExtra,
  //          showPriceDate,
  //          updatePlanNum,
  //          delPriceDate} from 'src/api/api'

  // import {
  //         supplierPriceTypeList,
  //         supplierPriceType,
  //         supplierDoPriceType,
  //         supplierChangePriceStatus,
  //         supplierDoBatchQuotation,
  //         supplierSetExtra,
  //         supplierDoSetExtra,
  //         supplierShowPriceDate,
  //         supplierUpdatePlanNum,
  //         supplierDelPriceDate} from 'src/api/supplier'

  import InputNumber from "src/plugins/InputNumber.vue";
  import TuanDatecalendar from "src/components/TuanDateCalendar.vue"
  import { 
    handleSearchCity,
    priceTypeList,
    handleEditPrice,
    handleSetPrice,
    handleSetNewPrice,
    handleDelPrice,
    showDatePrice,
    changePriceStatus,
    updatePlanNum,
    delPriceDate
  } from "src/api/tuanDate";

  let lodash = require('lodash')

  export default {
    components: {
      InputNumber,
      TuanDatecalendar
    },
    data() {
      return {
        room_diff_price_status: false,
        checkdateIndex: 0,
        addPrice: {},
        editType: 1,   // 1 编辑报价 2 新增报价 3 新增报价日期
        priceAllData: [],
        cityIndex: 0,
        packageIndex: 0,
        singleChecked: false,   // 单房差
        timeSelectOptions: [
          {
            value: 1,
            label:  '分钟'
          },
          {
            value: 2,
            label:  '小时'
          }
        ],
        price_default: [{id:0,name: "成人",sales_price: "",settle_price: "",minimum_price: ""},{id:0,name: "儿童",sales_price: "",settle_price: "",minimum_price: ""}],
        addPackageName: "",
        addCitySelect: "",
        allCity: [],
        loading: false,
        cityOptions: [],
        oldCity: "",
        oldCityName: "",
        name: this.$route.name ? this.$route.name : '',
        product_id: this.$route.query.id,
        bids_list: [],
        
        priceTypeDialog: false,
        priceDetail: true,
        deldateDialog: false,
        mid_price_id: 0,
        priceId: 0,
        checkedId: "",
        priceType: {
          id: "",
          name: "",
          quote_id: "",
          end_day_time: "",
          end_time: "",
          is_confirm: "",
          product_id: "",
          room_diff_price: "",
          status: "",
          stock: "",
          warning_plan_num: "",
          seat_end_time: "",
          seat_type: ""
        },
        date: {
          allSelectStatus: true,
          workSelectStatus: true,
          weekSelectStatus: true,
          onCurrentDate:"0000-00-00",
          onDate:0,
          onMonth:0,
          onYear:0,
          onWeekend:0,//当前星期几
          firstWeekend:0,//月初第一天周几
          days:0,//当月总天数
          onCalendar:[]
        },
        warehouse: {
          product_id: "",
          id: "",
          quote_id: "",
          stock: "",
          is_confirm: "",
          room_diff_price: 0,
          seat_end_time: 30,
          seat_type: "",
          quote_id: "",
          end_day_time: "",
          end_time: "",
          room_diff_price_status: false
        },
        delpd: {
          product_id: '',
          quote_id: '',
          id: ''
        },
        swStatus: false,
        chooseData:[],
        showdate: [],
        // curr_month: '',
        setExtraInfo: {},
        isnewPiliang: false,
        price_date: [],
        midScope: {},
        // midechecboxIndex: [],
        firstEnter: true,
        planDialog: false
      }
    },
    watch: {},
    methods: {
      handleItemPriceStatus(){
        if(!this.warehouse.room_diff_price_status){
          this.warehouse.room_diff_price = 0;
        }
      },
      handleChangeStatus(){
        if(!this.room_diff_price_status){
          this.priceType.room_diff_price = 0;
        }
      },
      renderHeader (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
        return h(
          'p',
          [ 
            h('i', {
              style: 'color:red;padding: 5px;'
            }, '*'),
            h('span', column.label),
          ],
        );
      },
      handleCancel(){
        this.planDialog = !this.planDialog; 
        this.warehouse = {...{
          product_id: "",
          id: "",
          quote_id: "",
          stock: "",
          is_confirm: "",
          room_diff_price: "",
          seat_end_time: "",
          seat_type: "",
          quote_id: "",
          end_day_time: "",
          end_time: "",
          room_diff_price_status: false
        }}
      },
      handleDelPrice(type,id,quote_id){
        var params = {
          data: {
            product_id: this.product_id,
            quote_id: quote_id
          }
        }
        if(type == 1){
          params.data.price_city_id = id;
        }else if(type == 2){
          params.data.package_id = id;
        }else if(type == 3){
          params.data.price_id = id;
        }

        handleDelPrice({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              this.$message({
                message: "删除成功！",
                type: 'success'
              });
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
            console.log(res);
          },
          showLoading: false
        })

      },
      handleAddPriceDate(id,name){

        this.date.allSelectStatus = true;
        this.date.workSelectStatus = true;
        this.date.weekSelectStatus = true;

        this.checkedId = "";
        this.showdate = [];
        this.price_date = [];
        // this.midechecboxIndex = [];
        this.bids_list.forEach((item) => {
          item.checkdate = false;
        });
        this.isnewPiliang = true;
        this.date.onCalendar = [];
        this.createCalendar(this.date.onCalendar);
        this.editType = 3;
        this.addPrice.id = id;
        this.addPrice.name = name;
      },
      handleEditPriceFun(id,name){
        this.editType = 1;
        this.handleEditPrice(id,name)
      },
      handleEditPrice(id,name){

        let params = {
          data: {
            product_id: this.product_id,
            quote_id: id
          }
        }

        handleEditPrice({
          params: params,
          success: (res) => {
            let data = res.data.data.stockInfo;
            let alldata = res.data.data.priceInfo;

            this.room_diff_price_status = false;
            if(this.editType == 3){
               this.priceType = {
                id: "",
                name: "",
                quote_id: "",
                end_day_time: "",
                end_time: "12:00",
                is_confirm: '1' ,
                product_id: "",
                room_diff_price: 0,
                status: "",
                stock: "",
                warning_plan_num: 0 ,
                seat_end_time: 30,
                seat_type: "分钟"
              }
            }else{
              this.priceType = {
                id: data.id,
                name: data.name,
                quote_id: data.quote_id,
                end_day_time: "",
                end_time: "12:00",
                is_confirm:  data.is_confirm,
                product_id: data.product_id,
                room_diff_price: data.room_diff_price || 0,
                status: data.status,
                stock: data.stock,
                warning_plan_num: data.warning_plan_num,
                seat_end_time: data.seat_end_time,
                seat_type: data.seat_type == 1 ? "分钟" : "小时"
              }
            }
            if(this.editType == 1){
              this.price_date = res.data.data.stockInfo.depart_time;
            }
            this.priceTypeDialog = !this.priceTypeDialog;
            
            // 处理后端数据
            let arr = [];
            for(let i=0; i<alldata.length;i++ ){
              let obj = {};
              let package_list = [];
              obj = this.filterObj(alldata[i],['id','product_id','quote_id','city_id','city_name']);
              if(alldata[i].package_list){
                for(let y=0; y<alldata[i].package_list.length;y++){
                  let packageData = {};
                  let price_list = [];
                  packageData = this.filterObj(alldata[i].package_list[y],['id','package_name','product_id','quote_id','price_city_id','is_default']);
                  for(let k=0; k<alldata[i].package_list[y].price_list.length; k++){
                    let price = {};
                    price = this.filterObj(alldata[i].package_list[y].price_list[k],['id','name','product_id','quote_id','price_city_id','settle_price','sales_price','minimum_price','package_id','create_uid']);
                    price_list.push(price)
                  }
                  packageData.price_list = price_list;
                  package_list.push(packageData);
                }
                obj.package_list = package_list;
                arr.push(obj);
              }
            }

            this.priceAllData = arr;
            // console.log("priceAllData",arr);
            this.priceType.name = name;
            this.initData();
          },
            showLoading: false
          })
        
      },
      filterObj(obj, arr) {
        if (typeof (obj) !== "object" || !Array.isArray(arr)) {
          throw new Error("参数格式不正确")
        }
        const result = {}
        Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
          result[key] = obj[key]
        })
        return result
      },
      initData(){
        let cityOptions = [];
        this.cityIndex = 0;
        this.packageIndex = 0;

        for(let i = 0; i<this.priceAllData.length; i++){
          let obj = {};
          obj.id = this.priceAllData[i].city_id;
          obj.area_name = this.priceAllData[i].city_name;
          cityOptions.push(obj);
        }
        this.cityOptions = cityOptions;
      },
      open(item,index) {
        this.$prompt('请输入套餐名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          item.package_name = value;
        }).catch(() => {});
      },
      handleSearchCity(query){
        if(query != ''){
          let params = {
            data: {
              city_name: query
            }
          }
          handleSearchCity({
            params: params,
          success: (res) => {
            this.allCity = res.data.data;
          },
          showLoading: false
          })
        }else{
          this.allCity = []
        }
      },
      handleRemovePrice($index,id){
        if(id && id != 0 && id != "") {
          this.handleDelPrice(3,this.priceAllData[this.cityIndex].package_list[this.packageIndex].price_list[$index].id,this.priceAllData[this.cityIndex].package_list[this.packageIndex].price_list[$index].quote_id);
        }
        this.priceAllData[this.cityIndex].package_list[this.packageIndex].price_list.splice($index,1);
      },
      handleAddPrice(){
        let obj = {
            id: 0,
            name: "",
            settle_price: "",
            sales_price: "",
            minimum_price: ""
          }
        this.priceAllData[this.cityIndex].package_list[this.packageIndex].price_list.push(obj);
      },
      handleRemovePackage(index,id){
        let that = this;
        if(id && id != 0 && id != ""){
          that.$confirm('此操作将删除该套餐下的所有数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((res) => {

            that.handleDelPrice(2,id,that.priceAllData[that.cityIndex].package_list[index].quote_id)
            that.priceAllData[that.cityIndex].package_list.splice(index,1);

            if(index == that.packageIndex){
              that.packageIndex = 0;
            } 
          }).catch(() => {});
        }else{
          that.priceAllData[that.cityIndex].package_list.splice(index,1);
          if(index == that.packageIndex){
            that.packageIndex = 0;
          } 
        }

      },
      handleAddPackage(){
        if(this.addPackageName){
          var obj = {
            id: 0,
            package_name: this.addPackageName,
            price_list: [{id:0,name: "成人",sales_price: "",settle_price: "",minimum_price: ""},{id:0,name: "儿童",sales_price: "",settle_price: "",minimum_price: ""}]
          }
          this.priceAllData[this.cityIndex].package_list.push(obj);
          this.addPackageName = "";
        }
      },
      handleChangePackageStatus(i){
        
        this.priceAllData = JSON.stringify(this.priceAllData);
        this.priceAllData = JSON.parse(this.priceAllData);
        if(this.handleyanzheng()){
          this.packageIndex = i;
        }
      },
      handleChangeCityStatus(i){

        this.priceAllData = JSON.stringify(this.priceAllData);
        this.priceAllData = JSON.parse(this.priceAllData);
        
        if(this.handleyanzheng()){
          this.cityIndex = i;
          this.packageIndex = 0;
        }
      },
      handleyanzheng(){
        // 套餐价格验证是否没填写
        let allData = [...this.priceAllData[this.cityIndex].package_list[this.packageIndex].price_list];

        for(let k=0; k<allData.length;k++){
          let item = {...allData[k]};
          if(item.name == '成人'){
            if(item.settle_price == "" || item.sales_price == "" || item.minimum_price == ""){
              this.$message({
                message: '成人套餐价格都为必填项',
                type: 'error'
              });
              return false;
            }
          }else{
            if(item.settle_price == "" && item.sales_price == "" && item.minimum_price == ""){
              this.priceAllData[this.cityIndex].package_list[this.packageIndex].price_list.splice(k,1);
            }else if(item.settle_price != '' && item.sales_price != "" && item.minimum_price != "" && item.name != ""){
              // ok
            }else{
              this.$message({
                message: '请完善您的价格！',
                type: 'error'
              });
              return false;
            }
          }
        }
        return true;
      },
      allDataVerify(){
        let allData = this.priceAllData;

        for(let i=0;i<allData.length;i++){
          for(let y=0;y<allData[i].package_list.length;y++){
            for(let k=0;k<allData[i].package_list[y].price_list.length;k++){
              let price_list =allData[i].package_list[y].price_list;
              let item = price_list[k];
              let name = item.name;

              // 过滤为空价格
              let prices=[item.minimum_price, item.sales_price, item.settle_price].filter(price => !!price);

              if(price_list.filter(ele => ele.name === name).length !== 1){
                this.$message.error('价格名称不能重复');
                return false;
              }              
              if(name == "成人"){
                // 价格必填
                if(prices.length !== 3){
                  this.cityIndex = i;
                  this.packageIndex = y;
                  this.$message({
                    message: "请完善" + allData[i].city_name + "下的" + allData[i].package_list[y].package_name +'下的'+item.name+'的价格！',
                    type: 'error'
                  });
                  return false;
                }
              }else{
                if(!name && prices.length === 0 ){ // 名称价格都未填写
                  allData[i].package_list[y].price_list.splice(k,1);
                }else if(name && prices.length === 3){
                  // ok
                }else{
                  this.cityIndex = i;
                  this.packageIndex = y;
                  this.$message({
                    message: "请完善" + allData[i].city_name + "下的" + allData[i].package_list[y].package_name +'下的'+ (item.name || '新增套餐') +'的价格！',
                    type: 'error'
                  });
                  return false;
                }
              }
            }
          }
        }
        return true
      },
      handleRemoveCity(index){

        this.$confirm('此操作将删除该城市下的所有套餐及数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.priceAllData[index].quote_id){
            this.handleDelPrice(1,this.priceAllData[index].id,this.priceAllData[index].quote_id)
          }
          this.cityOptions.splice(index,1); 
          this.priceAllData.splice(index,1); 
          if(this.cityIndex == index){
            this.cityIndex = 0;
          }
        }).catch(() => {});
        
      },
      handleAddCity(){
        if(this.addCitySelect){
          var obj = {};
          var item = {};
          for(let i=0; i<this.allCity.length; i++){
            if(this.addCitySelect == this.allCity[i].id){
              obj.city_id = item.id = this.allCity[i].id;
              obj.city_name = item.area_name = this.allCity[i].area_name;
              obj.package_list = [{id:0,package_name: '标准套餐',price_list: [{name: "成人",settle_price: "",sales_price: "",minimum_price: ""},{name: "儿童",settle_price: "",sales_price: "",minimum_price: ""}]}]
            }
          }
          this.priceAllData.push(obj);
          this.cityOptions.push(item);
          this.addCitySelect = "";
        }
      },
      priceTypeList() {
        let params = {
          data: {
            product_id: this.product_id
          }
        };
        let action = priceTypeList
        // if (this.name === 'lineTripBids') {
        //   action = supplierPriceTypeList
        // }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              for(let i=0; i<result.length; i++){
                result[i].checkdate = false;
              }
              this.bids_list = result;
              this.bids_list.forEach((item,index)=>{
                if(this.isInArray(this.showdate,item.id)){
                  item.checkdate = true;
                }

                if(item.status == "1") {
                  this.bids_list[index].checkStatus = true;
                }else{
                  this.bids_list[index].checkStatus = false;
                }
              })
              if(this.firstEnter) {
                this.firstEnter = false;
                var id = 0;
                var idx = 0;
                this.bids_list.forEach((item, index) => {

                  if(item.status == "1") {
                    // this.bids_list[index].checkdate = true
                    // this.showdate.push(item.id);
                    id = item.id;
                    idx = index;
                    this.bids_list[index].checkStatus = true;
                  }else{
                    this.bids_list[index].checkStatus = false;
                    this.bids_list[index].checkdate = false;
                  }
                })
                if(id !== 0){
                  this.checkdateIndex = idx;
                  this.bids_list[idx].checkdate = true;
                  this.showdate = [id];
                }
                this.showPriceDate();
              }else{
                this.showPriceDate();
              }
            } else {
              if (res.data.code === 40004) {
                history.go(-1)
              };
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            };
          },
          showLoading: true
        })
      },
      showNewPriceType() {
        // this.showdate();
        this.priceTypeDialog = !this.priceTypeDialog;
      },
      doPriceType() {
        if (this.priceType.name == "") {
          this.$message({
            message: '价格类型名称不能为空',
            type: 'error'
          });
          return ''
        }; 

        if (this.priceType.name.length > 100) {
          this.$message({
            message: '价格类型名称不能超过100个字符',
            type: 'error'
          });
          return ''
        }; 

        if(this.editType !== 1){
          // 验证数据
          if(!this.verifyData(this.priceType)){
            return false;
          }
        }

        // 验证价格
        if(!this.allDataVerify()){
          return false;
        }
        
        this.priceType.depart_time = this.price_date;
        this.priceType.room_diff_price = this.priceType.room_diff_price == "" || this.priceType.room_diff_price ==  null ? 0 : this.priceType.room_diff_price;

        var params = {
          data : {
            product_id: this.product_id,
            priceInfo: this.priceAllData,
            stockInfo: {...this.priceType},
          }
        }
        
        let action = handleSetPrice
        if(this.editType == 1){
          params.data.id = this.priceType.quote_id || 0;
          params.data.stockInfo = "";
          params.data.name = this.priceType.name;
        }
        if(this.editType == 2){
          params.data.stockInfo.id = [];
          params.data.name = this.priceType.name;
          params.data.id = this.priceType.quote_id || 0;
          params.data.stockInfo.seat_type = params.data.stockInfo.seat_type == "分钟" ? 1:2;
          delete params.data.stockInfo.name;
        }
        if(this.editType == 3){
          action = handleSetNewPrice;
          params.data.priceInfo = "";
          params.data.quote_id = this.addPrice.id;
          params.data.stockInfo.id = [];
          params.data.stockInfo.seat_type = params.data.stockInfo.seat_type == "分钟" ? 1:2;
          delete params.data.stockInfo.name;
        }
        // if (this.name === 'lineTripBids') {
        //   action = supplierDoPriceType
        // }

        action({
          params: params,
          success: (res) => {
            console.log(res);
            if (res.data.code === 0) {
              this.$message({
                message: "操作成功",
                type: 'success'
              });
              this.addPrice = {};
              this.priceTypeDialog = false;
              this.isnewPiliang = false;
              this.priceTypeList();
              this.date.onCalendar = [];
              this.createCalendar(this.date.onCalendar);
              // 有勾选日期显示的
              // if(this.checkedId.length != 0){
              //   // if(this.priceId == 0){
              //   //   this.showdate.splice(0, 1);
              //   //   this.showdate = this.checkedId
              //   // }
              //   this.showPriceDate();
              // }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true,
        })
      },
      verifyData (data){
        
        if(data.is_confirm == 0 ){
          if(data.warning_plan_num == 0 || data.warning_plan_num == ''){
            this.$message({
              message: "请设置预警库存",
              type: 'error'
            });
            return false;
          }
          if(data.stock == 0 || data.stock == ""){
            this.$message({
              message: "请填写库存",
              type: 'error'
            });
            return false;
          }
          if(data.seat_end_time == 0 || data.seat_end_time == "" || data.seat_type == ""){
            this.$message({
              message: "请设置占位有效时间及类型",
              type: 'error'
            });
            return false;
          }
        }
        return true;
      },
      priceTypeDetail(priceId) {
        let params = {
          data: {
            product_id: this.product_id,
            price_id: priceId
          }
        };
        let action = priceType
        // if (this.name === 'lineTripBids') {
        //   action = supplierPriceType
        // }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              this.priceType.name = result.name ? result.name : '';
              this.priceType.peer_price = result.peer_price ? result.peer_price : "0";
              this.priceType.out_price = result.out_price ? result.out_price : "0";
              this.priceType.limit_price = result.limit_price != 0 ? result.limit_price : "0";
              this.priceType.diff_price = result.diff_price ? result.diff_price : "0";
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: false
        })
      },
      switchIndex(id) {
        this.mid_price_id = id;
      },
      changePriceStatus(scope, val) {

        let that = this;
        this.swStatus = true;
        let status = 1;
        if (val) {
          status = "1";
          this.$alert('相同日期存在不同报价类型时，以当前最新开启的报价类型为有效报价！', '注意', {
            confirmButtonText: '确定',
            callback: action => {
              toDo();
            }
          });
        } else {
          status = "0";
          toDo();
        }

        function toDo(){
          setTimeout(() => {
            let params = {
              data: {
                product_id: that.product_id,
                quote_id: that.mid_price_id,
                status: status
              }
            };
            let action = changePriceStatus
            // if (this.name === 'lineTripBids') {
            //   action = supplierChangePriceStatus
            // }
            action({
              params: params,
              success: (res) => {
                if (res.data.code === 0) {
                  that.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
                  that.date.onCalendar = [];
                  that.createCalendar(that.date.onCalendar);
                  that.showPriceDate();
                } else {
                  that.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                  scope.status = !val;
                };
                that.swStatus = false;
              },
              showLoading: true
            });
          }, 20)
        }
      },
      format(time) {
        let t = new Date(time);
        let year = t.getFullYear();
        let month = t.getMonth() + 1;
        let date = t.getDate();
        return `${year}-${month}-${date}`
      },
      getDate(){
        let date = new Date();
        let y = '';
        let m = '';
        
        this.date.onDate = date.getDate();
        this.date.onMonth = date.getMonth() + 1;
        this.date.onYear = date.getFullYear();
        this.date.onWeekend = date.getDay();
        y=this.toDouble(this.date.onDate);
        m=this.toDouble(this.date.onMonth);

        this.date.onCurrentDate=this.date.onYear+'-'+m+'-'+y;
      },
      toDouble(i){
          return i<10 ? '0'+i : i;
      },
      createCalendar(onCalendar) {
        let _this=this,
          m='',
          y='',
          _currentDate='',
          currentDate='',
          num=42;//显示格子数量

          m=this.toDouble(this.date.onMonth);

          _currentDate=this.date.onYear+'-'+m;

          this.date.firstWeekend=this.getWeekend(this.date.onYear,this.date.onMonth,this.date.onWeekend);
          this.date.days=this.dayLen(this.date.onMonth,this.date.onYear);

          if(this.date.firstWeekend<6&&this.date.firstWeekend>0){
            num=35;
          }

          for(let i=0;i<this.date.days;i++){
            if(i<9){
              y='0'+''+(i+1);
            }else{
              y=i+1;
            }
            
            currentDate=_currentDate+'-'+y;
            let thisTime = new Date(currentDate).getTime()
            let time = new Date();
            time.setHours(0, 0, 0,0)

            let nosel = thisTime > time.getTime() ? false : true
            // 初始化当月日期数据 当天
            if(currentDate===(this.date.onCurrentDate)){
                onCalendar.push({
                  day:i+1,
                  currentDate: currentDate,
                  piliang: this.isInArray(this.price_date,currentDate) ? true:false,
                  nosel: nosel
                });
            }else{
              onCalendar.push({
                day:i+1,
                currentDate: currentDate,
                piliang: this.isInArray(this.price_date,currentDate) ? true:false,
                nosel: nosel
              });
            }

            // 填充有报价的数据
          }
          // 填充月前空白
          if(this.date.firstWeekend==0){
            this.date.firstWeekend=7;
          }
          for(let i=1;i<this.date.firstWeekend;i++){
            onCalendar.splice(0,0,{day:''});
          }
          // 填充月末空白
          let last=num-onCalendar.length;
          for(let i=0;i<last;i++){
            onCalendar.push({day:''});
          };
      },
      isInArray(arr,value){
          for(var i = 0; i < arr.length; i++){
              if(value === arr[i]){
                  return true;
              }
          }
          return false;
      },
      // 获取当月的天数
      dayLen(month, year) {
          let _month = month;

          if(_month === 2) {
              if(!this.isLeap(year)) return 28;
              return 29;
          }
          if(_month < 8 && _month % 2 === 1) {
              return 31;
          }
          if(_month >= 8 && _month % 2 === 0) {
              return 31;
          }
          return 30 ;
      },
      // year 为需要计算的年份，month为需要计算的月份，本函数作用为计算当月第一天为周几。
      getWeekend(year, month, onWeekend) {
          let _this=this,
              timeStamp_1 = Date.parse(new Date(year+'-'+_this.toDouble(month)+'-01')),
              timeStamp_2 = Date.parse(new Date()),
              distance = timeStamp_2 - timeStamp_1,
              days = 0,
              result = 0;
          if(distance > 0){
              days = Math.floor(distance / (1000 * 60 * 60 * 24));;
              result = onWeekend - (days % 7)
              return result < 0 ? result + 7 : result;
          }else{
              distance = -distance;
              days = Math.ceil(distance / (1000 * 60 * 60 * 24));
              result = (onWeekend + (days % 7) ) % 7
              return result;
          }
      },
      selDay(item) {
        this.planDialog = !this.planDialog;
        let obj = {};
        if (item) {
          obj.product_id = item.product_id;
          obj.id = item.id;
          obj.quote_id = item.quote_id;
          obj.stock = item.stock;
          obj.is_confirm = item.is_confirm;
          obj.room_diff_price = item.room_diff_price;
          obj.seat_end_time = item.seat_end_time == '0' ? '30':item.seat_end_time;
          obj.seat_type = item.seat_type == 1 ? "分钟":"小时";
          obj.quote_id = item.quote_id;
          obj.end_day_time = item.end_day_time;
          obj.end_time = item.end_time;
          obj.warning_plan_num = item.warning_plan_num;
          
          if(item.room_diff_price == '0' || item.room_diff_price == '0.00'){
            obj.room_diff_price_status = false;
            console.log(1)
          } else {
            obj.room_diff_price_status = true;
            console.log(2)
          }
          this.warehouse = obj;
        };
      },
      updatePlanNum() {

        if(!this.verifyData(this.warehouse)){
          return false;
        }
        if(this.warehouse.seat_type == "分钟"){
          this.warehouse.seat_type = 1
        }else{
          this.warehouse.seat_type = 2;
        }
        if(this.warehouse.room_diff_price == null || this.warehouse.room_diff_price == 'undefined'){
          this.warehouse.room_diff_price = 0;
        }

        let params = {
          data: this.warehouse
        };
        let action = updatePlanNum
        // if (this.name === 'lineTripBids') {
        //   action = supplierUpdatePlanNum
        // }
        action({
          params,
          success: (res) => {
            if(res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.planDialog = false;
              this.showPriceDate();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            };
          }
        })
      },
      dayPiliang(item, index) {
        let time = new Date().setHours(0,0,0,0);
        let currentDate = this.date.onCalendar[index].currentDate;
        let selTime = new Date(currentDate).getTime()

        if (selTime <= time || item.day == '') {
          return false
        }
        this.date.onCalendar[index].piliang = !this.date.onCalendar[index].piliang;

        if(this.date.onCalendar[index].piliang) {
          this.price_date.push(currentDate)
          this.price_date = lodash.uniq(this.price_date)
        } else {
          if(this.price_date.length > 0) {
            this.price_date.forEach((item, idx) => {
              if(item == currentDate) {
                this.price_date.splice(idx, 1)
              }
            })
          }
        }
        console.log('排序前',this.price_date)
        this.price_date.sort((a,b)=>{
          if (a<b) {
            return -1
          }
          if (a>b) {
            return 1;
          }
          return 0
        })
        console.log('排序后',this.price_date)
      },
      showPriceDate(edit) {
        if(this.showdate.length == 0) {
          return
        };
        this.showdate.forEach((item, index) => {
          if (item == 0) {
            this.showdate.splice(index, 1);
          }
        });
        let params = {
          data: {
            product_id: this.product_id,
            quote_id_arr: this.showdate,
            month: `${this.date.onYear}-${this.date.onMonth < 10 ? '0'+this.date.onMonth:this.date.onMonth}`
          }
        };
        let action = showDatePrice
        // if (this.name === 'lineTripBids') {
        //   action = supplierShowPriceDate
        // }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;

              if(edit){
                let arr = [];
                this.price_date = [];
                result.forEach((item) => {
                  let date = item.quotation_date;
                  arr.push(date);
                });
                this.price_date = arr;
                this.showNewPriceType(); // 编辑套餐
              }else{
                this.date.onCalendar = [];
                this.createCalendar(this.date.onCalendar);
                if(!result || result.length == 0) {
                  return false
                };
                result.forEach((item) => {
                  let date = item.depart_time;
                  date = parseInt(date.split('-')[2]);
                  this.date.onCalendar.forEach((dt) => {
                    if (dt.day == date) {
                      dt.booking_stock = item.booking_stock;
                      dt.depart_time = item.depart_time;
                      dt.id = item.id;
                      dt.is_confirm = item.is_confirm;
                      dt.product_id = item.product_id;
                      dt.quote_id = item.quote_id;
                      dt.quote_name = item.quote_name;
                      dt.stock = item.stock;
                      dt.room_diff_price = item.room_diff_price;
                      dt.seat_end_time = item.seat_end_time;
                      dt.seat_type = item.seat_type * 1;
                      dt.end_day_time = item.end_day_time;
                      dt.end_time = item.end_time;
                      dt.warning_plan_num = item.warning_plan_num;
                      dt.status = item.status;
                      dt.show = new Date(item.depart_time).getTime() > new Date().setHours(0,0,0,0);
                    };
                  });
                });
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            };
          },
          showLoading: true
        })
      },
      changeDate(scope, value) {

        let row = scope.row
        this.bids_list.forEach((item) => {
          item.checkdate = false;
        })
        this.bids_list[scope.$index].checkdate = value;

        if (value) {
          this.checkedId = row.id;
          this.date.onCalendar = [];
          this.createCalendar(this.date.onCalendar);
          this.showdate = [row.id];
          this.showPriceDate();
        } else {
          if (this.checkedId) {
              if(this.checkedId == row.id) {
                this.checkedId = '';
              };
          };
          if(this.showdate.length > 0) {
            this.showdate.forEach((item, index) => {
              if(item == row.id) {
                this.showdate.splice(index, 1);
              };
            });
          };
          // this.getDate();
          this.date.onCalendar = [];
          this.createCalendar(this.date.onCalendar);
          this.showPriceDate();
        };
      },
      delDate(item) {
        this.deldateDialog = !this.deldateDialog;
        this.delpd.product_id = this.product_id;
        this.delpd.quote_id = item.quote_id;
        this.delpd.id = item.id;
      },
      deldatecancle() {
        this.deldateDialog = !this.deldateDialog;
      },
      deldateconfirm() {
        let params = {
          data: this.delpd
        };
        let action = delPriceDate
        // if (this.name === 'lineTripBids') {
        //   action = supplierDelPriceDate
        // }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.showPriceDate();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: false,
        })
        this.deldateDialog = !this.deldateDialog;
      },
      shownewPiliang() {
        
        let params = {
          data: {
            product_id: this.product_id,
            quote_id: 0
          }
        }
        
        this.date.allSelectStatus = true;
        this.date.workSelectStatus = true;
        this.date.weekSelectStatus = true;

        handleEditPrice({
          params: params,
          success: (res) => {
            let data = res.data.data;
            this.oldCity = data.productInfo.departure_city.split(",");
            this.oldCityName = data.productInfo.departure_city_name.split(",");
            this.init();
          },
          showLoading: false
        })
      },
      init (){
        this.editType = 2;
        this.checkedId = '';
        this.showdate = [];
        this.price_date = [];
        // this.midechecboxIndex = [];
        this.bids_list.forEach((item) => {
          item.checkdate = false;
        });
        this.isnewPiliang = true;
        this.date.onCalendar = [];
        this.createCalendar(this.date.onCalendar);
        //this.showPriceDate();
        
        this.priceAllData = [];
        this.cityOptions = [];

        for(let i = 1; i< this.oldCityName.length-1; i++){
          var item = {};
          var obj = {};
          obj.city_id = this.oldCity[i];
          item.id = this.oldCity[i];
          obj.city_name = this.oldCityName[i];
          item.area_name = this.oldCityName[i];
          obj.package_list = [{package_name: '标准套餐',price_list: [{name: "成人",settle_price: "",sales_price: "",minimum_price: ""},{name: "儿童",settle_price: "",sales_price: "",minimum_price: ""}]}];
          this.cityOptions.push(item);
          this.priceAllData.push(obj);
        }
        
        this.priceType = {
          name: "",
          room_diff_price: "",
          is_confirm: "1",
          warning_plan_num: 0,
          stock: 0,
          end_day_time: 0,
          end_time: "12:00",
          seat_type: "分钟",
          seat_end_time: "30"
        }
      },
      handleSelectDate(type){
        let time = new Date().setHours(0,0,0,0);
        let allData = this.date.onCalendar;
        let that = this;

        if(type == 'all'){
          all();
          that.date.workSelectStatus = true;
          that.date.weekSelectStatus = true;
        }else if(type == 'work'){
          work();
          that.date.allSelectStatus = true;
          that.date.weekSelectStatus = true;
        }else if(type == 'week'){
          week();
          that.date.allSelectStatus = true;
          that.date.workSelectStatus = true;
        }

        function week(){
          for(let i=0;i<allData.length;i++){
            if((new Date(allData[i].currentDate).getDay() == 6 || new Date(allData[i].currentDate).getDay() == 0 ) && new Date(allData[i].currentDate).getTime() > time){
              if(that.date.weekSelectStatus){
                allData[i].piliang = true;
                that.price_date.push(allData[i].currentDate)
                that.price_date = lodash.uniq(that.price_date)
              }else{
                allData[i].piliang = false;
                that.price_date.forEach((item, idx) => {
                  if(item == allData[i].currentDate) {
                    that.price_date.splice(idx, 1)
                  }
                })
              }
            }else{
              allData[i].piliang = false;
              that.price_date.forEach((item, idx) => {
                if(item == allData[i].currentDate) {
                  that.price_date.splice(idx, 1)
                }
              })
            }
          }
          that.date.weekSelectStatus = !that.date.weekSelectStatus;
        }

        function work(){
          for(let i=0;i<allData.length;i++){
            if((new Date(allData[i].currentDate).getDay() != 6 && new Date(allData[i].currentDate).getDay() != 0 ) && new Date(allData[i].currentDate).getTime() > time){
              if(that.date.workSelectStatus){
                allData[i].piliang = true;
                that.price_date.push(allData[i].currentDate)
                that.price_date = lodash.uniq(that.price_date)
              }else{
                allData[i].piliang = false;
                that.price_date.forEach((item, idx) => {
                  if(item == allData[i].currentDate) {
                    that.price_date.splice(idx, 1)
                  }
                })
              }
            }else{
              allData[i].piliang = false;
              that.price_date.forEach((item, idx) => {
                if(item == allData[i].currentDate) {
                  that.price_date.splice(idx, 1)
                }
              })
            }
          }
          that.date.workSelectStatus = !that.date.workSelectStatus;   
        }

        function all (){
          for(let i=0;i<allData.length;i++){
            if(allData[i].currentDate && new Date(allData[i].currentDate).getTime() > time){
              if(that.date.allSelectStatus){
                allData[i].piliang = true;
                that.price_date.push(allData[i].currentDate)
                that.price_date = lodash.uniq(that.price_date)
              }else{
                allData[i].piliang = false;
                that.price_date.forEach((item, idx) => {
                  if(item == allData[i].currentDate) {
                    that.price_date.splice(idx, 1)
                  }
                })
              }
            }
          }
          that.date.allSelectStatus = !that.date.allSelectStatus;
        }
      },
      piliangshowBatchQuo() {
        if(this.price_date.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择报价日期'
          })
          return false
        }
        const scope = this.midScope.row
        this.showBatchQuo(scope, scope.price_id, scope.name);
      },
      piliangdoPriceType() {
        if(this.price_date.length == 0) {
          this.$message({
            type: 'error',
            message: '请选择报价日期'
          })
          return false
        }
        if(this.editType == 3){
          this.handleEditPrice(this.addPrice.id,this.addPrice.name);
        }else{
          this.showNewPriceType(0)
        }
      },
      cancelpiliangshowBatchQuo() {
        this.price_date = [];
      },
      cancelpiliangdoPriceType() {
        this.isnewPiliang = false
        this.price_date = [];
      }
    },
    mounted() {
      this.priceTypeList();
      this.getDate();
      this.createCalendar(this.date.onCalendar);
    }
  }
</script>
<style lang="less" scoped>
.bids-wrap {
  .add-newbids-btn-wrap {
    font-size: 0;
    text-align: right;
    padding-bottom: 20px;
  }
  .operation-wrapper {
    span {
      padding: 0 5px;
      // font-size: 12px;
      cursor: pointer;
      color: #b10c79;
    }
  }
  .el-table {
    .tc {
      text-align: center;
    }
  }
  .width1 {
    width: 150px;
  }
  .width2 {
    width: 300px;
  }
  .width3 {
    width: 80px;
  }
  .extra-form {
    .el-form-item {
      margin: 8px 0;
    }
    .md-34 {
      margin-top: 3px;
    }
  }
  .operation {
    display: inline-block;
    width: 45px;
  }
  .operation1 {
    display: inline-block;
    width: 100px;
  }
  .vis-hid {
    visibility: hidden;
  }
  .extra-btn {
    color: #b10c79;
    cursor: pointer;
  }
  .squire-btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #b10c79;
    border-radius: 50%;
    line-height: 20px;
    color: #b10c79;
    cursor: pointer;
  }
  .calendar-wrap {
    margin-top: 15px;
    border: 1px solid #cccccc;
    min-width: 940px;
    .calendar-tit {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      .mouth-btn {
        display: inline-block;
        width: 80px;
        cursor: pointer;
        background-color: #f4f4f4;
        height: 26px;
        line-height: 26px;
        border-radius: 8px;
        user-select: none;
      }
      .mouth-tit {
        display: inline-block;
        width: 100px;
      }
      b {
        color: #b10c79;
      }
    }
    .calendar-week {
      width: 100%;
      font-size: 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background-color: #f4f4f4;
      .calendar-week-info {
        display: inline-block;
        width: 14.28%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #b10c79;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
        &:last-child {
          border-right: 0;
        }
      }
    }
    .calendar-con {
      width: 100%;
      font-size: 0;
      clear: both;
      overflow: hidden;
      .calendar-item {
        float: left;
        position: relative;
        width: 14.28%;
        height: 100px;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        .day-con {
          padding: 10px 0 0 10px;
          font-size: 18px;
          color: #444444;
          min-height: 22px;
        }
        .day-info1 {
          font-size: 14px;
          color: #333;
          padding: 10px 10px 0;
          // text-align: center;
          .calendat-btn {
            float: right;
            color: #b10c79;
            padding-left: 5px;
          }
        }
        .day-info {
          font-size: 14px;
          color: #333;
          padding: 0px 10px 0;
          // text-align: center;
          .calendat-btn {
            float: right;
            color: #b10c79;
            padding-left: 5px;
          }
        }
        &:hover {
          background-color: #fbf3f8;
          .day-close-in {
            display: block;
          }
        }
        &.sel {
          background-color: #fad8ed;
        }
        &.nosel {
          background: #ddd;
          &.sel {
            background-color: #ddd;
          }
        }
        .day-close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 14px;
          color: #b10c79;
        }
      }
    }
  }
  .tip-p {
    padding: 15px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
  .textcen {
    text-align: center;
  }
  .day-close-in {
    display: none;
  }
}
.pageList {
  float: left;
  width: 100%;
  height: auto;
  overflow: hidden;
  li {
    position: relative;
    float: left;
    height: 50px;
    margin: 0 18px 5px 0;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    span.label {
      display: block;
      padding: 0 15px;
      border: 1px solid #ddd;
    }
    span.btnBox {
      height: 20px;
      display: block;
      i {
        display: none;
        width: 50%;
        height: 20px;
        line-height: 20px;
        float: left;
        font-size: 12px;
        font-style: normal;
      }
    }
  }
  li.on {
    color: #b10c79;
    span.label {
      border: 1px solid #b10c79;
      color: #fff;
      background: #b10c79;
    }
  }
  li:hover {
    span.btnBox {
      i {
        display: block;
      }
    }
  }
}
.cityList {
  float: left;
  width: 100%;
  height: auto;
  overflow: hidden;
  li {
    position: relative;
    float: left;
    margin: 0 18px 5px 0;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    span {
      display: block;
      padding: 0 15px;
      border: 1px solid #ddd;
    }
    i {
      display: none;
      position: absolute;
      font-size: 12px;
      right: -12px;
      top: 0;
    }
  }
  li.on {
    color: #b10c79;
    span {
      border: 1px solid #b10c79;
      color: #fff;
      background: #b10c79;
    }
  }
  li:hover {
    i {
      display: block;
    }
  }
}
.addCityBox {
  float: left;
  .inputBox {
    width: 100px;
    float: left;
  }
  .addBtn {
    margin-left: 10px;
  }
}
.yj {
  width: 60px;
}
.yj-txt {
  margin-left: 5px;
  color: #aaa;
}
.piliang-wrap {
  padding: 15px 0 0;
  font-size: 0;
  text-align: right;
}
.piliang-pd {
  padding: 0 5px;
  display: block;
  float: left;
}
</style>
