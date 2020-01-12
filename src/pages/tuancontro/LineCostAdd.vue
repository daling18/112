<template>
<!-- application\index\view\dev\src\components\plan\cost\add.vue -->
  <div class="recieve-detail pg-cost-add">
    <div class="recieve-info">
      <h2 class="recieve-tit">{{titleTxt}}</h2>
      <div class="receive-content">
				<el-form label-width="140px"
					:model="form"
					:rules="rules"
					ref="formRef">
					<el-form-item label="结算方"
						prop="supplier_org_id">
						<SelectOrg v-model="orgination"
							placeholder="请选择供应商"
							:defaultList="allData.org_info"/>
					</el-form-item>
					<div class="box"
						v-for="(obj,idx) in form.list"
						:key="idx">
						<div class="box-hd clearfix"
              v-if="id == ''">
							<div class="opt-btns">
								<a class="add-btn" href="javascript:;" @click="handleAdd()" />
								<a class="sub-btn" href="javascript:;"  @click="handleDel(idx)" v-show="onlyOneDelStatus" />
							</div>
							<span class="txt">
								项目{{idx+1}}
								<i class="cost">
									&yen;{{obj.total_amount}}
								</i>
							</span>
						</div>
						<div class="box-bd">
							<el-form-item label="项目类型"
								:prop="'list.'+idx+'.item_type'"
								:rules="{
									required: true,
									type: 'number',
									message: '请选择项目类型',
									trigger: 'blur'
								}">
								<el-select v-model="obj.item_type"
									placeholder="请选择">
									<el-option v-for="(o,i) in allData.item_type"
										:key="i"
										:label="o"
										:value="Number(i)" />
								</el-select>
							</el-form-item>
							<el-form-item label="项目名称"
								:prop="'list.'+idx+'.item_name'"
								:rules="{
									required: true,
									message: '请输入项目名称',
									trigger: 'blur'
								}">
								<el-input v-model="obj.item_name"
									class="ipt" />
							</el-form-item>
							<div class="switch-box clearfix">
								<!-- 总额展示 -->
								<!-- <div class="switch-ite"
									v-show="amountType.type == 0">
									<el-form-item label="总额"
										required>
										<el-form-item prop="total_amount" class="c1">
											<input-number  v-model="form.total_amount"
												:precision="3" />
										</el-form-item>
										<currency-picker 
											v-model="form.currency"
											placeholder="选择货币"
											readonly="readonly">
										</currency-picker>
										<el-form-item prop="currency_rate"
											class="c3">
											<input-number 
												v-model="form.currency_rate" :precision="4" />
										</el-form-item>
									</el-form-item>
									<el-form-item label="备注说明" class="bz">
										<el-input type="textarea"
											v-model="form.remark" />
									</el-form-item>
								</div> -->
								<!-- /总额展示 -->
								<!-- 单价展示 -->
								<!-- <div class="switch-ite"
									v-show="amountType.type != 0"> -->
								<div class="switch-ite">
									<el-form-item label="总额" required>
										<span class="color-orange">
											&yen; {{obj.total_amount}}
										</span>
										<span class="tip">
											（公式：单价*数量*汇率）
										</span>
									</el-form-item>
									<el-form-item label="单价" required>
										<el-form-item class="c1"
											:prop="'list.'+idx+'.unit_price'"
											:rules="rulesCyclicUnitprice">
											<input-number  v-model="obj.unit_price"
												:precision="3" />
										</el-form-item>
										<currency-picker 
											v-model="obj.currency"
											placeholder="选择货币"
											readonly="readonly">
										</currency-picker>
										<el-form-item class="c3"
											:prop="'list.'+idx+'.currency_rate'"
                      :rules="rulesCyclicCurrency">
											<input-number 
												v-model="obj.currency_rate" :precision="4" />
										</el-form-item>
									</el-form-item>
									<template v-if="obj.item_type == 12">
										<!-- 住宿类型下的日期房间数内容 -->
										<el-form-item label="住宿日期" required>
											<el-form-item class="zhusu-date-input"
												:prop="'list.'+idx+'.room_start'"
												:rules="{
													required: true,
													type: 'date',
													message: '请输入入住日期',
													trigger: 'blur'
												}">
												<el-date-picker type="date"
													v-model="obj.room_start"
													placeholder="入住日期"
													:editable="false"
													:picker-options="datepickerOptions2">
												</el-date-picker>
											</el-form-item>
											<span class="zhusu-intreval">
												-
											</span>
											<el-form-item class="zhusu-date-input"
												:prop="'list.'+idx+'.room_end'"
												:rules="{
													required: true,
													type: 'date',
													message: '请输入结束日期',
													trigger: 'blur'
												}">
												<el-date-picker type="date"
													v-model="obj.room_end"
													placeholder="结束日期"
													:editable="false"
													:picker-options="datepickerOptions">
												</el-date-picker>
											</el-form-item>
											<span v-if="zhushuDays[idx] != ''"
											class="zhusu-days">
												{{zhushuDays[idx]}}晚
											</span>
										</el-form-item>
										<el-form-item label="房间数"
											:prop="'list.'+idx+'.room_nums'"
											:rules="rulesCyclicRoomnums">
											<input-number  class="c1"
												v-model="obj.room_nums"
												placeholder="请输入数字"/> 间
										</el-form-item>
									</template>
									<template>
										<!-- 数量栏 -->
										<template v-if="obj.item_type == 12">
											<el-form-item label="数量">
												{{obj.num}}
											</el-form-item>
										</template>
										<template v-else-if="obj.item_type == 4">
											<el-form-item label="数量" required>
												<span class="c1 mr10">
													{{obj.num}}
												</span>
												<el-form-item class="c1 mr10"
													:prop="'list.'+idx+'.people_nums'"
													:rules="rulesCyclicPeoplenums">
													<input-number  v-model="obj.people_nums"
														placeholder="人数"
														class="c1-in"/> * 人
												</el-form-item>
												<el-form-item class="c1"
													:prop="'list.'+idx+'.meals_nums'"
													:rules="rulesCyclicMealsnums">
													<input-number  v-model="obj.meals_nums"
														placeholder="餐数"
														class="c1-in"/> * 餐
												</el-form-item>
												<el-form-item style="display: none" />
											</el-form-item>
										</template>
										<template v-else-if="obj.item_type == 20">
											<el-form-item label="数量" required>
												<span class="c1 mr10">
													{{obj.num}}
												</span>
												<el-form-item class="c1 mr10"
													:prop="'list.'+idx+'.guides_nums'"
													:rules="rulesCyclicGuidesnums">
													<input-number  v-model="obj.guides_nums"
														placeholder="导游数"
														class="c1-in"/> * 人
												</el-form-item>
												<el-form-item class="c1"
													:prop="'list.'+idx+'.service_nums'"
													:rules="rulesCyclicServicenums">
													<input-number  v-model="obj.service_nums"
														placeholder="天数"
														class="c1-in"/> * 天
												</el-form-item>
											</el-form-item>
										</template>
										<template v-else>
											<el-form-item label="数量" required>
												<el-form-item class="c1"
													:prop="'list.'+idx+'.num'"
													:rules="rulesCyclicNum">
													<input-number  v-model="obj.num"
														:precision="3" />
												</el-form-item>
											</el-form-item>
										</template>
									</template>
								</div>
								<!-- /单价展示 -->
								<!-- <span class="zs"
									@click="handleSwitchAmountType">
									{{amountType.txt}}
								</span> -->
							</div>
							<el-form-item label="成本摊派"
								:prop="'list.'+idx+'.apportion'"
								:rules="{
									required: true,
									type: 'number',
									message: '请选择摊派类型',
									trigger: 'blur'
								}">
								<el-radio-group v-model="obj.apportion">
									<el-radio :label=2>均摊</el-radio>
									<el-radio :label=1 v-if="allData.tuan_info.type != 4">指定订单人头</el-radio>
								</el-radio-group>
							</el-form-item>
							<!-- zhiding -->
							<div class="zhiding"
								v-show="obj.apportion == 1">
                <template v-if="!isEmptyArr(obj.cfgs)">
                  <ul class="zd-cur">
                    <li v-for="(o,i) in obj.cfgChecked"
                      :key="i"
                      @click="handleCfgCheckedDel(idx,i)">
                      {{o.order_no}}({{o.num}}人)
                    </li>
                  </ul>
                  <ul class="zd-bd">
                    <li v-for="(o,i) in obj.cfgs"
                      :key="i">
                      <el-checkbox v-model="o.is_checked"
                        class="id"
                        :indeterminate="o.indeter"
                        @change="handleChkZong($event,idx,i)">
                        {{o.order_no}}
                      </el-checkbox>
                      <span class="yx">
                        <span class="fl">已选</span>
                        <span class="fra">
                          <span class="b">
                            {{o.num}}
                          </span>
                          <!-- <el-input v-model="o.num" /> -->
                          <span class="fl">人</span>
                        </span>
                      </span>
                      <div class="zd-cbox">
                        <el-checkbox v-for="(o2,i2) in o.info"
                          :key="i2"
                          v-model="o2.is_checked"
                          @change="handleChkSingle(idx,i)">
                          {{o2.username}}
                        </el-checkbox>
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <p class="no">暂无相关订单</p>
                </template>
							</div>
							<!-- /zhiding -->
						</div>
					</div>
				</el-form>
        <div class="btns">
					<el-button type="primary" @click="submit('formRef')">保存</el-button>
					<el-button @click="goBack">返回</el-button>
				</div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { currency_data } from "src/configuration/currency";
import { getCostForm, setCostForm } from "src/api/api";
import * as format from "src/utils/format";
import SelectOrg from "src/plugins/SelectOrg.vue";
import CurrencyPicker from "src/plugins/currency-picker/index.vue";
import InputNumber from "src/plugins/InputNumber.vue";
import { formattDate} from 'src/assets/js/common.js'
export default {
  components: {
    SelectOrg,
    CurrencyPicker,
    InputNumber
  },
  filters: {
    formatPrice(price) {
      const num = price || 0;
      return Number(format.toFixed(num, 3));
    }
  },
  data() {
    let validatePrice = (rule, value, callback) => {
      if (value && !/^\d+$|^\d+\.?\d+$/.test(value)) {
        callback(new Error("请输入正确的数值"));
      } else {
        callback();
      }
    };
    let limitMax = (rule, value, callback) => {
      if (value > 100000000) {
        callback(new Error("请输入小于100000000的数值"));
      } else {
        callback();
      }
    };
    let positiveInteger = (rule, value, callback) => {
      if (value.toString().indexOf(".") != -1) {
        callback(new Error("请输入整数"));
      } else if (value.toString().indexOf("-") != -1) {
        callback(new Error("请输入正数"));
      } else {
        callback();
      }
    };
    let positive = (rule, value, callback) => {
      if (value.toString().indexOf("-") != -1) {
        callback(new Error("请输入正数"));
      } else {
        callback();
      }
    };
    return {
      id: this.$route.query.id,
      tuanId: this.$route.query.tuan_id,
      pageType: '',
      allData: {},
			form: {
        id: '',
        resource_id: '',
        supplier_org_id: '',
        list: []
      },
			rulesCyclicUnitprice: [{
				required: true,
				type: 'number',
				message: '请输入单价',
				trigger: 'blur'
				},{
				validator: limitMax,
				trigger: 'change'
				},{
				validator: positive,
				trigger: 'change'
			}],
			rulesCyclicCurrency: [{
				required: true,
				type: 'number',
				message: '请输入汇率',
				trigger: 'blur'
				},{
				validator: positiveInteger,
				trigger: 'change'
			}],
			rulesCyclicPeoplenums: [{
				required: true,
				type: 'number',
				message: '请输入人数',
				trigger: 'blur'
				},{
				validator: limitMax,
				trigger: 'change'
				},{
				validator: positiveInteger,
				trigger: 'change'
			}],
			rulesCyclicMealsnums: [{
				required: true,
				type: 'number',
				message: '请输入餐数',
				trigger: 'blur'
				},{
				validator: limitMax,
				trigger: 'change'
				},{
				validator: positiveInteger,
				trigger: 'change'
			}],
			rulesCyclicGuidesnums: [{
				required: true,
				type: 'number',
				message: '请输入导游数',
				trigger: 'blur'
				},{
				validator: limitMax,
				trigger: 'change'
				},{
				validator: positiveInteger,
				trigger: 'change'
			}],
			rulesCyclicServicenums: [{
				required: true,
				type: 'number',
				message: '请输入服务天数',
				trigger: 'blur'
				},{
				validator: limitMax,
				trigger: 'change'
				},{
				validator: positiveInteger,
				trigger: 'change'
			}],
			rulesCyclicRoomnums: [{
				required: true,
				type: 'number',
				message: '请输入房间数',
				trigger: 'blur'
				},{
				validator: limitMax,
				trigger: 'change'
				},{
				validator: positiveInteger,
				trigger: 'change'
			}],
			rulesCyclicNum: [{
				required: true,
				type: 'number',
				message: '请输入数量',
				trigger: 'blur'
				},{
				validator: limitMax,
				trigger: 'change'
				},{
				validator: positiveInteger,
				trigger: 'change'
			}],
      // amountType:{
      // 	type: 0,
      // 	txt: '按单价填写'
      // },
      titleTxt: '',
      currency_data,
      zhushuDays: [],
      rules: {
        supplier_org_id: [ {
            type: "number",
            required: true,
            message: "请选择供应商",
            trigger: "blur"
          } ],
      },
      onlyOneDelStatus: false
    };
  },
  computed: {
    // 处理住宿日期
    datepickerOptions() {
      this.form.list.forEach(v=>{
        if(typeof v.room_start == 'string' && v.room_start != ''){
          v.room_start = new Date(v.room_start)
        }
        let depart_date = v.room_start;
        return{
          disabledDate(time) {
            return time.getTime() < new Date(depart_date).getTime();
          }
        }
      });
    },
    datepickerOptions2() {
      // if (typeof this.form.room_end == "string" && this.form.room_end != "") {
      //   this.form.room_end = new Date(this.form.room_end);
      // }
      // let depart_date = this.form.room_end;
      // return {
      //   disabledDate(time) {
      //     return (
      //       time.getTime() >=
      //       new Date(depart_date).getTime() - 8 * 60 * 60 * 1000
      //     );
      //   }
      // };

      this.form.list.forEach(v=>{
        if(typeof v.room_end == 'string' && v.room_end != ''){
          v.room_end = new Date(v.room_end)
        }
        let depart_date = this.form.room_end;
        return {
          disabledDate(time) {
            return (
              time.getTime() >=
              new Date(depart_date).getTime() - 8 * 60 * 60 * 1000
            );
          }
        };
      });
    },
    // 处理结算方数据填充
    orgination: {
      get: function() {
        let org = null;
        if (this.form.supplier_org_id) {
          return {
            org_id: this.form.supplier_org_id,
            org_name: this.form.supplier_org_name
          };
        }
        return org;
      },
      set: function(val) {
        val = val || {};
        this.form.supplier_org_id = val.org_id;
        this.form.supplier_org_name = val.org_name;
      }
    },
  },
  watch: {
    'form.list': {
      handler: function(val, oldVal) {
        val.forEach((v,i,a)=>{
          if(v.unit_price != '' && v.num != '' && v.currency_rate != ''){
            v.total_amount = v.unit_price * v.num * v.currency_rate;
          }else{
            v.total_amount = 0;
          }
          if(v.item_type == 4 && v.people_nums !== '' && v.meals_nums !== ''){
            v.num = v.people_nums * v.meals_nums;
          }
          if(v.item_type == 20 && v.guides_nums !== '' && v.service_nums !== ''){
            v.num = v.guides_nums * v.service_nums;
          }
          if(v.item_type == 12 && v.room_start != '' && v.room_end != ''){
            let distance = Date.parse(new Date(v.room_end)) - Date.parse(new Date(v.room_start));
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.zhushuDays[i] = days;
            if(v.room_nums != ''){
              v.num = days * v.room_nums;
            }
          }
        });
      },
      deep: true
    },
  },
  methods: {
    isEmptyArr(obj) {
      if (!obj && obj !== 0 && obj !== "") {
        return true;
      }
      if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
      }
      if (
        Object.prototype.isPrototypeOf(obj) &&
        Object.keys(obj).length === 0
      ) {
        return true;
      }
    },
    initialize() {
      let para = {};
      para.data = {
        id: this.id,
        tuan_id: this.tuanId
      };
      getCostForm({
        params: para,
        success: res => {
          let { code, data, msg } = res.data;
          if (code == 0) {
            this.allData = data;
            // 赋值非循环的数据
            this.form.id = this.allData.bills_info.id;
            this.form.resource_id = this.allData.bills_info.resource_id;
            this.form.supplier_org_id = this.allData.bills_info.supplier_org_id;
            this.form.supplier_org_name = this.allData.bills_info.supplier_org_name;
            if(this.allData.tuan_info.type == 4){
              this.allData.item_type = {99: '其他杂费'};
            }
            // 赋值循环的数据
            this.allData.cfg_cost_apportion.forEach(v => {
              if (!v.is_checked) {
                let vNum = 0;
                v.info.forEach(v2=>{
                  if(v2.is_checked){
                    vNum++;
                  }
                });
                if(vNum > 0 && vNum < v.info.length){
                  v.indeter = true;
                }else{
                  v.indeter = false;
                }
              } else {
                v.indeter = false;
              }
            });
            let cfgData = _.cloneDeep(this.allData.cfg_cost_apportion),
              tdata = Object.assign({}, this.allData.bills_info);
            this.form.list.push(tdata);
            this.$set(this.form.list[0], 'cfgs', cfgData);
            this.$set(this.form.list[0], 'cfgChecked', []);
            this.$set(this.form.list[0], 'cost_appoint', []);
            if (this.pageType == 'add') {
              this.form.resource_id = this.tuanId;
              this.form.supplier_org_id = "";
              this.form.list.forEach(v => {
                v.item_type = "";
                v.unit_price = "";
                v.currency = "人民币";
                this.$set(v, "num", "");
                this.$set(v, "total_amount", 0);
              });
            }else{
              this.form.list.forEach(v=>{
                this.funcListenCfgChecked(v);
              });
            }
          } else {
            this.$message({
              message: msg,
              type: "error"
            });
          }
        },
        showLoding: true
      });
    },
    
    // 切换按总额/单价填写模式
    // handleSwitchAmountType(){
    // 	if(this.amountType.type == 0){
    // 		// 总额模式
    // 		this.amountType.type = 1;
    // 		this.amountType.txt = '按总额填写';
    // 	}else{
    // 		// 单价模式
    // 		this.amountType.type = 0;
    // 		this.amountType.txt = '按单价填写';
    // 	}
    // },
    // checkbox选择事件
    handleChkZong(evt, idx, i) {
      let boolVal = evt.target.checked ? true : false,
        obj = this.form.list[idx].cfgs[i];
      obj.info.forEach(v => {
        v.is_checked = boolVal;
      });
      obj.num = boolVal ? obj.info.length : 0;
      obj.indeter = false;
      this.funcListenCfgChecked(this.form.list[idx]);
    },
    handleChkSingle(idx,i) {
      let len = 0,
        obj = this.form.list[idx].cfgs[i];
      obj.info.forEach(v => {
        if (v.is_checked) {
          len = len + 1;
        }
      });
      if (len === 0) {
        obj.is_checked = false;
        obj.indeter = false;
      } else if (len === obj.info.length) {
        obj.is_checked = true;
        obj.indeter = false;
      } else {
        obj.is_checked = true;
        obj.indeter = true;
      }
      obj.num = len;
      this.funcListenCfgChecked(this.form.list[idx]);
    },
    // 监听选中项到cfgChecked数组中的变化函数
    funcListenCfgChecked(obj){
      obj.cfgChecked = obj.cfgs.filter(v=>{
        return v.is_checked;
      });
    },
    // 已选栏删除事件
    handleCfgCheckedDel(idx,i) {
      this.form.list[idx].cfgChecked.splice(i, 1);
      this.form.list[idx].cfgs[i].is_checked = false;
      if (this.form.list[idx].cfgs[i].indeter) {
        this.form.list[idx].cfgs[i].indeter = false;
      }
      this.form.list[idx].cfgs[i].info.forEach(v => {
        if (v.is_checked) {
          v.is_checked = false;
        }
      });
    },
    goBack() {
      this.$router.back();
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tmpList = _.cloneDeep(this.form.list);
          let allData = _.cloneDeep(this.form);
          allData.list.forEach((v, i, a)=>{
            v.cfgChecked.forEach((v2, i2, a2) => {
              v.cost_appoint[i2] = {};
              v.cost_appoint[i2].order_no = v2.order_no;
              v.cost_appoint[i2].num = v2.num;
              let tid = v2.info.map(v3 => {
                if(v3.is_checked){
                  return v3.id;
                }
              });
              let tid2 = [];
              tid.forEach(i=>{
                if(i){
                  tid2.push(i);
                }
              });
              v.cost_appoint[i2].tourist_ids = tid2.join(",");
            });

            v.room_start = formattDate(v.room_start);
            v.room_end = formattDate(v.room_end);
          });

          setCostForm({
            params: {
              data: allData
            },
            success: res => {
              let { code, data, msg } = res.data;
              this.$message({
                message: msg,
                type: code == "0" ? "success" : "error"
              });
              if (code == "0") {
                // this.goBack();
                if (this.$menuPermission('tuancontro/line/costlist')) {
                  this.$router.push({
                    path: '/tuancontro/cost',
                    query: {id: this.allData.tuan_info.a_id}
                  })
                } else {
                  this.goBack();
                }
              }else{
                this.form.list.forEach((v,i,a)=>{
                  v.room_start = tmpList[i].room_start;
                  v.room_end = tmpList[i].room_end;
                });
              }
            },
            showLoding: true
          });
        }
      });
    },
    // 新增项
    handleAdd(){
      let data = Object.assign({}, this.allData.bills_info);
      data.item_name = '';
      data.item_type = '';
      data.unit_price = '';
      data.currency = '人民币';
      data.num = '';
      data.apportion = 2;
      let cfgData = _.cloneDeep(this.allData.cfg_cost_apportion);
      cfgData.forEach(v=>{
        v.is_checked = false;
        v.indeter = false;
        v.num = '';
        v.info.forEach(v2=>{
          v2.is_checked = false;
        })
      });
      this.$set(data, 'cfgs', cfgData);
      this.$set(data, 'cfgChecked', []);
      this.$set(data, 'cost_appoint', []);
      this.onlyOneDelStatus = true;
      this.form.list.push(data);
    },
    handleDel(idx){
      if(this.form.list.length > 1){
        if(this.form.list.length == 2){
          this.onlyOneDelStatus = false;
        }
        this.form.list.splice(idx,1);
      }
    }
  },
  mounted() {
    this.pageType = this.id == '' ? 'add' : 'edit';
    this.titleTxt = this.pageType == 'add' ? '添加成本' : '编辑成本';
    this.initialize();
  }
};
</script>

<style scoped lang="scss">
.recieve-detail {
  .recieve-info {
    background-color: #fff;
    padding: 30px;
    .recieve-tit {
      font-size: 18px;
      color: #b10c79;
      padding: 0 0 0 10px;
      border-left: 5px solid #b10c79;
    }
    .receive-content {
      padding: 30px 0;
    }
  }
}
// form
.el-form-item {
  margin-bottom: 15px;
}
.el-select,
.ipt {
  width: 400px;
}
// box
.box {
  margin-top: 15px;
}
.box-hd {
  .txt {
    float: left;
    font-size: 18px;
    line-height: 25px;
  }
  .cost {
    color: #f60;
    font-style: normal;
    margin-left: 3px;
  }
}
.opt-btns {
  float: right;
}
.box-bd {
  border: 1px dashed #ccc;
  margin-top: 10px;
  padding: 10px;
  .c1,
  .c3 {
    display: inline-block;
    width: 126px;
  }
  .c3 {
    margin-bottom: 0;
  }
  .c1-in {
    width: 50%;
    margin-right: 5px;
  }
}
.currency-picker {
  width: 120px;
  margin-left: 10px;
  margin-right: 10px;
}
.switch-ite {
  float: left;
  width: 550px;
  .bz {
    margin-top: -3px;
  }
  .el-textarea {
    width: 400px;
  }
  .tip {
    color: #999;
  }
  .zhusu-date-input {
    float: left;
    margin-bottom: 0 !important;
  }
  .zhusu-date-input .el-date-editor {
    width: 140px;
  }
  .zhusu-intreval {
    float: left;
    margin: 0 8px;
  }
  .zhusu-days {
    margin-left: 10px;
  }
}
.zhiding{
  .no{
    color: #ccc;
    border: 1px solid #ddd;
    text-align: center;
    padding: 10px;
  }
}
.zd-cur {
  overflow: hidden;
  li {
    position: relative;
    float: left;
    color: #b10c79;
    background: #fbf3f8;
    margin: 0 5px 10px 0;
    padding: 0 5px 0 8px;
    height: 23px;
    line-height: 22px;
    border: 1px solid #f7e6f1;
    border-radius: 2px;
    cursor: pointer;
    &::after {
      content: "×";
      color: #ccc;
      font-size: 20px;
      margin-left: 2px;
    }
    &:hover {
      color: #d4389f;
    }
    &:hover::after {
      color: #333;
    }
  }
}
.zd-bd {
  line-height: 30px;
  border: 1px solid #aaa;
  overflow-y: auto;
  margin: 0 5px 5px;
  li {
    border-top: 1px solid #ccc;
    margin-top: -1px;
    padding: 10px 10px 10px 320px;
    overflow: hidden;
  }
  .id {
    float: left;
    margin-left: -310px;
  }
  .yx {
    float: left;
    color: #555;
    overflow: hidden;
    margin-left: -120px;
  }
  .fra {
    float: left;
    height: 28px;
    line-height: 28px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background: #fafafa;
    color: #999;
    margin-left: 5px;
    padding: 0 5px;
  }
  .b{
    float: left;
    color: #b10c79;
    width: 50px;
    height: 28px;
  }
}
.zd-cbox {
  float: left;
  .el-checkbox {
    display: inline-block;
  }
}
.zs {
  line-height: 36px;
  color: #b10c79;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
ul {
  list-style: none;
}
.btns {
  text-align: center;
  padding: 15px 0;
  .el-button {
    width: 170px;
    height: 45px;
    line-height: 45px;
  }
}
.mr10 {
  margin-right: 10px !important;
}
</style>
