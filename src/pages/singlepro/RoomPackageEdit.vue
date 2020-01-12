<template>
  <div class="wrapper">
    <div class="package">
      <el-form ref="packageForm" :model="packageForm" :rules="packageFormRules" label-width="130px">
        <el-form-item label="酒店名称" prop="hotel_name">
          {{ packageForm.base.hotel_name }}
        </el-form-item>
        <el-form-item label="房型名称" prop="room_name">
          {{ packageForm.base.room_name }}
        </el-form-item>
        <el-form-item label="产品来源" prop="base.supplier_id">
          <select-supplier v-model="packageForm.base.supplier_id" :orgName.sync="packageForm.base.supplier"></select-supplier>
        </el-form-item>
        <el-form-item label="套餐名称" prop="base.rate_name">
          <el-input :class="'input-w-medium'" v-model="packageForm.base.rate_name" placeholder="请输入套餐名称"></el-input>
        </el-form-item>
        <el-form-item label="早餐" prop="base.breakfast_type">
          <el-radio-group v-model="packageForm.base.breakfast_type">
            <el-radio :label="0">不含早</el-radio>
            <el-radio :label="1">含单早</el-radio>
            <el-radio :label="2">含双早</el-radio>
            <el-radio :label="3">部分含早</el-radio>
            <el-radio :label="-1">含早但不确定份数</el-radio>
            <el-radio :label="-3">不确定</el-radio>
            <el-radio :label="-2">付费早餐</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="showBreakfastAmount" label="部分含早人数">
          <el-input-number v-model="packageForm.base.amount" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="接单方式">
          二次确认
        </el-form-item>
        <!-- <el-form-item label="最少提前预订时间">
          <div class="reserve-time">
            <div class="str">提前</div>
            <el-form-item>
              <el-input :class="'input-w-short'" v-model="packageForm.base.days"></el-input>
            </el-form-item>
            <div class="str">天</div>
            <el-form-item>
              <el-input :class="'input-w-short'" v-model="packageForm.base.hours"></el-input>
            </el-form-item>
            <div class="str">时 前定当日房</div>
            <div class="tips">注：0代表不设置，以用户选择的入住日期的23:59:59计算</div>
          </div>
        </el-form-item>
        <el-form-item label="订单确认开始时间">
          <div class="reserve-time">
            <el-time-select
              v-model="packageForm.base.service_start_time"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:59'
              }"
              placeholder="请选择订单确认开始时间">
            </el-time-select>
            <div class="tips">注：时间以外的时段，客人无法预订当日房间，非当日房间预定不受影响</div>
          </div>
        </el-form-item>
        <el-form-item label="订单确认结束时间">
          <div class="reserve-time">
            <el-time-select
              v-model="packageForm.base.service_end_time"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:59',
                minTime: packageForm.base.service_start_time
              }"
              placeholder="请选择订单确认结束时间">
            </el-time-select>
            <div class="tips">注：时间以外的时段，客人无法预订当日房间，非当日房间预定不受影响</div>
          </div>
        </el-form-item> -->
        <el-form-item label="预订说明">
          <el-input
            :class="'input-w-medium'"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入预订说明"
            v-model="packageForm.base.book_notice">
          </el-input>
        </el-form-item>
        <el-form-item label="取消规则" prop="base.cancel_type">
          <el-radio-group v-model="packageForm.base.cancel_type">
            <el-radio :label="0">不可取消</el-radio>
            <el-radio :label="1">限时取消</el-radio>
          </el-radio-group>
        </el-form-item>
        <template  v-if="packageForm.base.cancel_type == 1">
          <el-form-item>
            <div class="cancel-info">
              <div class="cancel-txt">入住时间前</div>
              <div class="cancel-input">
                <el-form-item prop="base.cancel_day">
                  <el-input v-model.number="packageForm.base.cancel_day"></el-input>
                </el-form-item>
              </div>
              <div class="cancel-txt">天</div>
              <div class="cancel-input">
                <el-form-item prop="base.cancel_hour">
                  <el-input v-model="packageForm.base.cancel_hour"></el-input>
                </el-form-item>
              </div>
              <div class="cancel-txt">
                点前可取消，取消时按固定金额扣除
              </div>
              <div class="cancel-input">
                <el-form-item prop="base.cancel_charge">
                  <el-input v-model.number="packageForm.base.cancel_charge"></el-input>
                </el-form-item>
              </div>
              <div class="cancel-txt">
                元
              </div>
            </div>
          </el-form-item>
        </template>
        <!-- <el-form-item v-if="packageForm.base.cancel_type == 1 && packageForm.base.cancel_type == 1" prop="base.date_type">
          <el-radio-group v-model.number="packageForm.base.date_type">
            <el-radio :label="1">入住前可取消</el-radio>
            <el-radio :label="2">
              <div class="timer">
                <div class="txt">
                  规定时间前可取消
                </div>
                <div class="timer-item">
                  <el-form-item prop="base.date_day">
                    <el-date-picker
                      :class="'input-w'"
                      v-model="packageForm.base.date_day"
                      type="date"
                      placeholder="请选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="txt">
                  年月
                </div>
                <div class="timer-item">
                  <el-form-item prop="base.date_min">
                    <el-time-select
                      :class="'input-w'"
                      placeholder="请选择时间"
                      v-model="packageForm.base.date_min"
                      :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '23:45'
                      }">
                    </el-time-select>
                  </el-form-item> 
                </div>
                <div class="txt">
                  时分
                </div>
              </div>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="packageForm.base.cancel_type == 1" prop="base.cancel_charge_type">
          <el-radio-group v-model="packageForm.base.cancel_charge_type">
            <el-radio :label="1">按首晚价格百分比扣除</el-radio>
            <el-radio :label="2">按订单总金额百分比扣除</el-radio>
            <el-radio :label="3">按固定金额扣除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="packageForm.base.cancel_type == 1 && (packageForm.base.cancel_charge_type == 1 || packageForm.base.cancel_charge_type == 2)" prop="base.cancel_charge">
          扣除百分比 <el-input :class="'input-w-short'" v-model.number="packageForm.base.cancel_charge"></el-input> %
        </el-form-item>
        <el-form-item v-if="packageForm.base.cancel_type == 1 && packageForm.base.cancel_charge_type == 3" prop="base.cancel_charge">
          扣除金额 <el-input :class="'input-w-short'" v-model.number="packageForm.base.cancel_charge"></el-input> 元
        </el-form-item> -->
        <el-form-item label="产品报价">
          <el-button type="primary" @click="quoteVisable = true">新增报价</el-button>
          <calendar-quotation>
            <div class="quote" v-for="(q, d) in packageForm.package_list" :key="d" :slot="d">
              <p class="quote-item"><span class="lbl">成本价：</span><span class="prc">￥{{ q.cost_price }}</span></p>
              <p class="quote-item"><span class="lbl">结算价：</span><span class="prc">￥{{ q.price }}</span></p>
              <p class="quote-item"><span class="lbl">销售价：</span><span class="prc">￥{{ q.sale_price }}</span></p>
              <p class="quote-item"><span class="lbl">挂牌价：</span><span class="prc">￥{{ q.market_price }}</span></p>
              <p class="quote-item"><span class="lbl">库存：</span><span class="prc">{{ q.stock }}</span></p>
              <p class="tools"><a href="javascript:;" @click="handleEditSingleQuote(q)">编辑</a>&nbsp;&nbsp;<a href="javascript:;" @click="handleDelSingleQuote(d)">删除</a></p>
            </div>
          </calendar-quotation>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRoomPackageForm">保存</el-button>
          <el-button @click="handleBackPage">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="新增报价"
               :visible.sync="quoteVisable"
               :size="'large'"
               @close="handleClearQuote">
      <el-form v-if="quoteVisable" :model="quoteForm" :rules="quoteFormRules" label-width="100px" ref="quoteForm">
        <el-form-item label="报价日期"  required>
          <div class="date-range">
            <el-col :span="11">
              <el-form-item prop="startDate">
                <el-date-picker 
                  v-model="quoteForm.startDate"
                  :class="'input-w-auto'" 
                  type="date" 
                  placeholder="选择日期" 
                  :picker-options="startDateOption">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="endDate">
                <el-date-picker 
                  v-model="quoteForm.endDate"
                  :class="'input-w-auto'" 
                  type="date" 
                  placeholder="选择日期"
                  :picker-options="endDateOption">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item label="报价星期" prop="week">
          <el-checkbox v-model="checkWeekAll" @change="handleCheckWeekAllAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="quoteForm.week" @change="handleCheckedWeekChange">
            <el-checkbox v-for="(w,k) in weeks" :key="k" :label="w.value" name="week">{{ w.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="form-group">
          <el-form-item label="成本价" prop="costPrice" required>
            <el-input v-model.number="quoteForm.costPrice"></el-input>
          </el-form-item>
          <el-form-item label="结算价" prop="price" required>
            <el-input v-model.number="quoteForm.price"></el-input>
          </el-form-item>
          <el-form-item label="销售价" prop="salePrice" required>
            <el-input v-model.number="quoteForm.salePrice"></el-input>
          </el-form-item>
          <el-form-item label="挂牌价" prop="marketPrice" required>
            <el-input v-model.number="quoteForm.marketPrice"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock" required>
            <el-input v-model.number="quoteForm.stock"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClearQuote">取 消</el-button>
        <el-button type="primary" @click="handleSubmitQuote">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑报价"
      :visible.sync="singleQuoteVisable"
      size="tiny"
      @close="handleClearSingleQuote">
      <el-form v-if="singleQuoteVisable" :model="singleQuoteForm" :rules="singleQuoteFormRules" label-width="100px" ref="singleQuoteForm" style="width: 300px">
        <el-form-item label="日期">
          {{ singleQuoteForm.date }}
        </el-form-item>
        <el-form-item label="成本价" prop="costPrice" required>
          <el-input v-model.number="singleQuoteForm.costPrice"></el-input>
        </el-form-item>
        <el-form-item label="结算价" prop="price" required>
          <el-input v-model.number="singleQuoteForm.price"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="salePrice" required>
          <el-input v-model.number="singleQuoteForm.salePrice"></el-input>
        </el-form-item>
        <el-form-item label="挂牌价" prop="marketPrice" required>
          <el-input v-model.number="singleQuoteForm.marketPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock" required>
          <el-input v-model.number="singleQuoteForm.stock"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClearSingleQuote">取 消</el-button>
        <el-button type="primary" @click="handleSubmitSingleQuote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { submitRoomPackageFormAsyncRequest, getSelfSupportRoomPackageDetailAsyncRequest } from 'src/api/hotel';
import SelectSupplier from 'src/plugins/SelectSupplier.vue';
import CalendarQuotation from './components/CalendarQuotation.vue';
import * as format from "src/utils/format";

export default {
  data(){
    const ValidateFun = (formType) => {
            let formName = formType + 'Form',
                validateCostPrice = (rule, value, callback) => {
                  if (value === '') {
                    callback(new Error('请输入成本价'));
                  } else {
                    if(typeof value !== 'number'){
                      callback(new Error('请输入数字'));
                    }else{
                      if(this[formName].price != ''){
                        this.$refs[formName].validateField('price');
                      }
                      callback();
                    }
                  }
                },
                validatePrice = (rule, value, callback) => {
                  if (value === '') {
                    callback(new Error('请输入结算价'));
                  }else{
                    if (typeof value !== 'number') {
                      callback(new Error('请输入数字'));
                    }else if(this[formName].costPrice && value < this[formName].costPrice){
                      callback(new Error('结算价不得小于成本价'));
                    }else{
                      if(this[formName].salePrice){
                        this.$refs[formName].validateField('salePrice');
                      }
                      callback();
                    }
                  }
                },
                validateSalePrice = (rule, value, callback) => {
                  if (value === '') {
                    callback(new Error('请输入销售价'));
                  } else {
                    if (typeof value !== 'number') {
                      callback(new Error('请输入数字'));
                    }else if(this[formName].price && value < this[formName].price){
                      callback(new Error('销售价不得小于结算价'));
                    }else{
                      if(this[formName].marketPrice){
                        this.$refs[formName].validateField('marketPrice');
                      }
                      callback();
                    }
                  }
                },
                validateMarketPrice = (rule, value, callback) => {
                  if (value === '') {
                    callback(new Error('请输入挂牌价'));
                  } else {
                    if (typeof value !== 'number') {
                      callback(new Error('请输入数字'));
                    }else if(this[formName].salePrice && value < this[formName].salePrice){
                      callback(new Error('挂牌价不得小于销售价'));
                    }else{
                      callback();
                    }
                  }
                };
            return {
              validateCostPrice,
              validatePrice,
              validateSalePrice,
              validateMarketPrice
            }
          }
    let quote = ValidateFun('quote'),
        singleQuote = ValidateFun('singleQuote'),
        validateRefundTime = (rule, value, callback) => {
          if (!value) {
            callback(new Error('请输入时间，例：00:00'));
          } else {
            if(!/^\d{2}\:\d{2}$/.test(value)){
              callback(new Error('格式错误(例：00:00)'));
            }else{
              callback();
            }
          }
        }; 
    return {
      packageForm: {
        base:{
          id: null,
          hotel_id: null,
          room_id: null,
          supplier_id: null,
          supplier: '',
          rate_name: '',
          breakfast_type: null,
          amount: 1,
          // days: '',
          // hours: '',
          // service_start_time: '',
          // service_end_time: '',
          book_notice: null,
          cancel_type: null,
          cancel_day: null,
          cancel_hour: null,
          cancel_charge: null,
          cancel_charge_type: 3,
          // date_day: '',
          // date_min: ''
        },
        package_list: {}
      },
      packageFormRules:{
        'base.supplier_id': [
          { required: true, type: 'number', message: '请输入产品来源', trigger: 'change'  }
        ],
        'base.rate_name': [
          { required: true, message: '请输入套餐名称', trigger: 'blur'  }
        ],
        'base.breakfast_type': [
          { required: true, type: 'number', message: '请选择早餐类型', trigger: 'change'  }
        ],
        'base.cancel_type': [
          { required: true, type: 'number', message: '请选择取消类型', trigger: 'change'  }
        ],
        'base.cancel_charge_type': [
          { required: true, type: 'number', message: '请选择取消选项', trigger: 'change'  }
        ],
        'base.cancel_charge': [
          { required: true, type: 'number', message: '请选择输入扣除数值', trigger: 'blur'  }
        ],
        'base.cancel_day':[
          { required: true, type: 'number', message: '请选择输入正确的天数', trigger: 'blur' }
        ],
        'base.cancel_hour': [
          { validator: validateRefundTime, trigger: 'blur'  }
        ]
      },
      quoteForm:{
        startDate: null,
        endDate: null,
        week: [1,2,3,4,5,6,0],
        costPrice: '',
        price: '',
        marketPrice: '',
        salePrice: '',
        stock: ''
      },
      quoteFormRules:{
        startDate: [
          { required: true, type: 'date', message: '请输入起始时间', trigger: 'change'  }
        ],
        endDate: [
          { required: true, type: 'date', message: '请输入结束时间', trigger: 'change'  }
        ],
        week: [
          { required: true, type: 'array', message: '请输选择星期', trigger: 'change'  }
        ],
        costPrice: [
          { validator: quote.validateCostPrice, trigger: 'blur'  }
        ],
        price: [
          { validator: quote.validatePrice, trigger: 'blur'  }
        ],
        salePrice: [
          { validator: quote.validateSalePrice, trigger: 'blur'  }
        ],
        marketPrice: [
          { validator: quote.validateMarketPrice, trigger: 'blur'  }
        ],
        stock: [
          { required: true, type: 'number', message: '请输入库存', trigger: 'blur'  }
        ],
      },
      quoteVisable: false,
      weeks: [{
        name: '星期一',
        value: 1
      },
      {
        name: '星期二',
        value: 2
      },
      {
        name: '星期三',
        value: 3
      },
      {
        name: '星期四',
        value: 4
      },
      {
        name: '星期五',
        value: 5
      },
      {
        name: '星期六',
        value: 6
      },
      {
        name: '星期日',
        value: 0
      }],
      checkWeekAll: true,
      singleQuoteVisable: false,
      singleQuoteForm:{
        date: null,
        costPrice: '',
        price: '',
        marketPrice: '',
        salePrice: '',
        stock: ''
      },
      singleQuoteFormRules:{
        costPrice: [
          { validator: singleQuote.validateCostPrice, trigger: 'blur'  }
        ],
        price: [
          { validator: singleQuote.validatePrice, trigger: 'blur'  }
        ],
        salePrice: [
          { validator: singleQuote.validateSalePrice, trigger: 'blur'  }
        ],
        marketPrice: [
          { validator: singleQuote.validateMarketPrice, trigger: 'blur'  }
        ],
        stock: [
          { required: true, type: 'number', message: '请输入库存', trigger: 'blur'  }
        ]
      }
    }
  },
  computed:{
    showBreakfastAmount(){
      if(this.packageForm.base.breakfast_type == 3){
        return true
      }else{
        this.packageForm.base.amount = 1;
        return false
      }
    },
    startDateOption(){
      return {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    },
    endDateOption(){
      let startDate = this.quoteForm.startDate;
      return {
        disabledDate(time) {
          return !startDate || time.getTime() < startDate.getTime();
        }
      }
    }
  },
  watch:{
    'quoteForm.startDate':{
      handler(val){
        if(this.quoteForm.endDate && new Date(this.quoteForm.endDate) < val){
          this.quoteForm.endDate = val;
        } 
      }
    }
  },
  components:{
    SelectSupplier,
    CalendarQuotation
  },
  methods: {
    submitRoomPackageForm(){
      this.$refs.packageForm.validate((valid) => {
        if(valid){
          let params = {
            data: this.packageForm
          }
          params['data'].base.date_day = params['data'].base.date_day ? format.date(params['data'].base.date_day) : '';
          submitRoomPackageFormAsyncRequest({
            params,
            success: (params) =>{
              let { code, data, msg } = params['data'];
              if(code == 0){
                let { hotel_id, room_id } = this.packageForm.base;
                this.$message.success(msg);
                this.$router.replace({ 
                  name: 'SingleproHotelRoomPackage', 
                  query: { 
                    hotel_id, 
                    room_id 
                  } 
                });
              }else{
                this.$message.error(msg);
              }
            },
            showLoading: true
          });
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    getRoomPackageDetail(id){
      let params = {
        data: {
          id 
        }
      }
      getSelfSupportRoomPackageDetailAsyncRequest({
        params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            for(let i in this.packageForm.base){
              this.packageForm.base[i] = data[i];
            }
            this.$set(this.packageForm, 'package_list', data.price_list);
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleCheckWeekAllAllChange(event){
      this.quoteForm.week = event.target.checked ? this.weeks.map(i=>i.value) : [];
    },
    handleCheckedWeekChange(value){
      let checkedCount = value.length;
      this.checkWeekAll = checkedCount === this.weeks.length;
    },
    handleClearQuote(){
      this.quoteForm = {
        startDate: null,
        endDate: null,
        week: [1,2,3,4,5,6,0],
        costPrice: '',
        price: '',
        marketPrice: '',
        salePrice: '',
        stock: ''
      };
      this.checkWeekAll = true;
      this.quoteVisable = false;
    },
    handleSubmitQuote(){
      this.$refs.quoteForm.validate((valid) => {
        if(valid){
          let oldQuotes = this.packageForm.package_list,
              newQuotes = this.createCalendarQuote();
          
          for(let date in newQuotes){
            oldQuotes[date] = newQuotes[date];
          }
          this.handleClearQuote();
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleEditSingleQuote(quote){
      let { date, cost_price, market_price, price, sale_price, stock } = quote;
      this.singleQuoteForm = {
        date,
        price,
        stock,
        costPrice: cost_price,
        marketPrice: market_price,
        salePrice: sale_price,
        
      };
      this.singleQuoteVisable = true;
    },
    handleDelSingleQuote(date){
      this.$delete(this.packageForm.package_list, date);
    },
    handleClearSingleQuote(){
      this.singleQuoteForm = {
        date: null,
        costPrice: '',
        price: '',
        marketPrice: '',
        salePrice: '',
        stock: ''
      };
      this.singleQuoteVisable = false;
    },
    handleSubmitSingleQuote(){
      this.$refs.singleQuoteForm.validate((valid) => {
        if(valid){
          let { date, costPrice, price, marketPrice, salePrice, stock } = this.singleQuoteForm;
          this.$set(this.packageForm.package_list, date, {
            date,
            price,
            stock,
            cost_price: costPrice,
            market_price: marketPrice,
            sale_price: salePrice,
          });
          this.handleClearSingleQuote();
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    createCalendarQuote(){
      let { startDate, endDate, week, costPrice, price, marketPrice, salePrice, stock } = this.quoteForm,
          start,
          end,
          quotes = {};

      start = +new Date(startDate);
      end = +new  Date(endDate);

      while(start <= end){
        let date = new Date(start),
            day = date.getDay();
        if(week.indexOf(day) > -1){
          quotes[this.stringifyDate(date)] = {
            date: this.stringifyDate(date),
            cost_price: costPrice,
            price: price,
            sale_price: salePrice,
            market_price: marketPrice,
            stock: stock
          }
        }
        start += 86400000;
      }

      return quotes;
    },
    stringifyDate(date){
      let year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate();
      
      return year + '-' + (month+'').replace(/(^\d$)/, '0$1') + '-' + (day+'').replace(/(^\d$)/, '0$1');
    },
    handleBackPage(){
      this.$router.back();
    }
  },
  mounted(){
    let { hotelName, roomName, hotel_id, room_id, id } = this.$route.query;

    if(!hotelName && !roomName && !hotel_id && !room_id){
      this.$router.replace({ name: 'SingleproHotelRoom' });
      return;
    }

    this.$nextTick(() => {
      this.$set(this.packageForm.base, 'hotel_name', hotelName);
      this.$set(this.packageForm.base, 'room_name', roomName);
      this.packageForm.base.hotel_id = hotel_id;
      this.packageForm.base.room_id = room_id;
    });
    
    if(id){
      this.getRoomPackageDetail(id);
    }
  }
}
</script>

<style lang="less" scoped>
.package{
  padding: 20px;
  background-color: #fff; 
  
  
  .reserve-time{
    display: flex;

    .str{
      padding: 0 5px;
    }
  }
}
.form-group{
  .el-form-item{
    float: left;
  }
  &::after{
    content: '';
    display: block;
    clear: both;
  }
}
.line{
  text-align: center;
}
.date-range{
  width: 400px;
  &::after{
    content: '';
    display: block;
    clear: both;
  }
}
.input-w-auto{
  width: auto !important;
}
.input-w-short{
  width: 50px;
}
.input-w-medium{
  width: 400px;
}
.quote{
  p{
    line-height: 20px;
    color: #333;
    &.quote-item{
      display: flex;
      align-items: center;
      justify-content: space-between;

      .lbl{
        color: #999;
      }
      .prc{
        color: #f60;
      }
    }
    &.tools{
      
    }
  }
}
.tips{
  padding-left: 10px;
  color:#999;
}
.timer{
  display: inline-block;
  vertical-align: middle;
  .timer-item,.txt{
    float: left;
  }
  .txt{
    line-height: 36px;
    padding: 0 10px;

    &:first-child{
      padding-left: 0;
    }
  }
  .input-w{
    width: 150px;
  }
}
.cancel-info{
  display: flex;
  .cancel-input{
    margin: 0 5px;
  }
  .el-input{
    width: 100px;
  }
}
</style>
