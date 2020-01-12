<template>
<!-- application\index\view\dev\src\components\plan\billIncomeCostUpdate.vue -->
  <div class="bill-wrap">
    <div class="bill-table-tit">
      修改收入/成本
      <el-button @click="handleAddIncome" type="primary" class="right-btn">+添加收入</el-button>
      <el-button @click="handleAddCost" type="primary" class="right-btn">+添加成本</el-button>
    </div>
    <div>
      <div v-for="(item, index) in list" class="bill-table-wrap" :key="index">
        <el-table
          :data="item.arr"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            :label="item.arr[0].bill_type === 1 ? '收入ID' : '成本ID'"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="distributor_supplier_name"
            :label="item.arr[0].bill_type === 1 ? '代理商／直客' : '供应商(结算方)'"
            align="center">
          </el-table-column>
          <el-table-column
            prop="rmb_total_amount"
            :label="item.arr[0].bill_type === 1 ? '原应收金额' : '原应付金额'"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="payed_receipted_amount"
            :label="item.arr[0].bill_type === 1 ? '已收金额' : '已付金额'"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            :label="item.arr[0].bill_type === 1 ? '关联订单' : '摊派'"
            align="center"
            width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.order_no" class="tc ellipsis" :title="scope.row.order_no">{{scope.row.order_no}}</div>
              <div v-else-if="item.arr[0].bill_type === 1">--</div>
              <div v-else>均摊</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="item_name"
            label="项目名称"
            align="center"
            width="150">
          </el-table-column>
        </el-table>
        <div class="bill-form-wrap">
          <el-form
            v-for="(priceItem, priceIndex) in item.order_price_detail"
            :key="priceIndex"
            inline>
            <el-form-item label="价格项目" required label-width="170px" class="el-item-mb10">
              <el-input v-model="priceItem.item_name" placeholder="价格项目，必填"></el-input>
            </el-form-item>
            <el-form-item label="单价" required label-width="50px" class="el-item-mb10">
              <el-select v-model="priceItem.operator" placeholder="请选择" class="width50">
                <el-option label="+" value="+"></el-option>
                <el-option label="-" value="-"></el-option>
              </el-select>
              <input-number  v-model="priceItem.unit_price" :max="999999999" :min='0' placeholder="单价" :precision="3" class="width110"/>
            </el-form-item>
            <el-form-item label="数量" required label-width="50px" class="el-item-mb10">
              <input-number  v-model="priceItem.num" :max="999999999" :min='1' placeholder="数量" class="width110"/>
              <span @click="addSingerPrice(index)" class="price-btn">增加</span>
              <span v-if="priceIndex != 0 || item.order_price_detail.length > 1" @click="delSingerPrice(index, priceIndex)" class="price-btn">删除</span>
            </el-form-item>
          </el-form>
          <el-form
            label-width="170px">
            <el-form-item v-if="item.arr[0].bill_type === 1 && item.arr[0].order_no" label="调整后应收金额" required class="el-item-mb10">
              {{calculationNumsaUpdateincome(index)}}
            </el-form-item>
            <el-form-item v-else-if="item.arr[0].bill_type === 1 && !item.arr[0].order_no" label="调整后应付金额" required class="el-item-mb10">
              <input-number  v-model="item.back_amount" :max="999999999" :min='0' placeholder="调整后应收金额" :precision="3" />
            </el-form-item>
            <el-form-item v-else label="调整后应付金额" required class="el-item-mb10">
              <input-number  v-model="item.back_amount" :max="999999999" :min='0' placeholder="调整后应付金额" :precision="3" />
            </el-form-item>
            <el-form-item label="申请原因" required>
              <el-input v-model="item.reason" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div>
      <div v-for="(item, index) in income_cost_list" class="bill-table-wrap trip-wrapper" :key="item.income_cost_status === 1 ? `${index}a` : index ">
        <div v-if="item.income_cost_status === 1">
          <el-table
            :data="item.arr"
            border
            style="width: 100%">
            <el-table-column
              prop="distributor_supplier_name"
              label="代理商／直客"
              align="center"
              width="200">
              <template slot-scope="scope">
                <select-org v-model="scope.row.org" placeholder="请选择直客或者代理商" :defaultList="org_info"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="rmb_total_amount"
              label="项目名称"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.item_name"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="payed_receipted_amount"
              label="应收金额"
              align="center"
              width="100">
              <template slot-scope="scope">
                {{calculationNumsIncome(index, scope)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="order_no"
              label="收入类型"
              align="center"
              width="150">
              <template slot-scope="scope">
                <el-select placeholder="请选择" v-model="scope.row.bill_type">
                  <el-option
                    v-for="(item, key) in bill_type"
                    :label="item"
                    :value="key"
                    :key="key">
                  </el-option>
                  <!-- <el-option label="团队返佣" value="2"></el-option>
                  <el-option label="其他杂费" value="3"></el-option>
                  <el-option label="购物返款" value="4"></el-option> -->
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="item_name"
              label="数量*单价"
              align="center"
              width="200">
              <template slot-scope="scope">
                <input-number  :max="999999999" :min='1' v-model="scope.row.num" placeholder="数量" class="width80" />
                <input-number  :max="999999999" :min='0' v-model="scope.row.unit_price" placeholder="单价" :precision="3" class="width80" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="150">
              <template slot-scope="scope">
                <el-button @click="handleAddIncomeDel(index)" type="text">删除</el-button>
                <el-button @click="handleAddIncomeReset(index, scope)" type="text">清空</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="bill-form-wrap">
            <el-form
              label-width="170px">
              <el-form-item label="申请原因" required>
                <el-input v-model="item.arr[0].reason" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-if="item.income_cost_status === 2">
          <el-table
            :data="item.arr"
            border
            style="width: 100%">
            <el-table-column
              prop="distributor_supplier_name"
              label="供应商(结算方)"
              align="center"
              width="200">
              <template slot-scope="scope">
                <select-org v-model="scope.row.org" placeholder="请选择供应商" :defaultList="org_info"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="rmb_total_amount"
              label="项目名称"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.item_name"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="payed_receipted_amount"
              label="应付金额"
              align="center"
              width="100">
              <template slot-scope="scope">
                {{calculationNums(index, scope)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="order_no"
              label="收入类型"
              align="center"
              width="100">
              <template slot-scope="scope">
                <el-select v-model="scope.row.item_type" placeholder="请选择">
                  <el-option v-for="(obj, key) in item_type"
                  :key="key"
                  :label="obj"
                  :value="key">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="item.arr[0].item_type === '12' ? '入住天数*房间数*单价' : (item.arr[0].item_type === '4' ? '餐数*人数*单价' : (item.arr[0].item_type  === '20' ? '导游数*服务天数*单价' : '数量*单价'))"
              align="center"
              width="260">
              <template slot-scope="scope">
                <div v-if="scope.row.item_type === '12'">
                  <p class="pb">
                    <el-date-picker type="date"
                      v-model="scope.row.room_start"
                      placeholder="入住日期"
                      :editable="false"
                      class="width110 mr"
                      :picker-options="datepickerOptions2(index, scope)">
                    </el-date-picker>
                    <el-date-picker type="date"
                      v-model="scope.row.room_end"
                      placeholder="结束日期"
                      :editable="false"
                      class="width110"
                      :picker-options="datepickerOptions(index, scope)">
                    </el-date-picker>
                  </p>
                  <p class="font0">
                    <input-number  :max="999999999" :min='1' v-model="scope.row.room_nums"	placeholder="房间数" class="width110 mr" />
                    <input-number  :max="999999999" :min='0' v-model="scope.row.unit_price" placeholder="单价" :precision="3" class="width110" />
                  </p>
                </div>
                <div v-else-if="scope.row.item_type === '4'">
                  <p class="pb">
                    <input-number  :max="999999999" :min='1' v-model="scope.row.meals_nums" placeholder="餐数" class="width110 mr" />
                    <input-number  :max="999999999" :min='0' v-model="scope.row.people_nums" class="width110" placeholder="人数"/>
                  </p>
                  <p>
                    <input-number  v-model="scope.row.unit_price" placeholder="单价" :precision="3" class="width220"/>
                  </p>
                </div>
                <div v-else-if="scope.row.item_type === '20'">
                  <p class="pb">
                    <input-number  :max="999999999" :min='1' v-model="scope.row.guides_nums" placeholder="导游数" class="width110 mr" />
                    <input-number  :max="999999999" :min='1' v-model="scope.row.service_nums" placeholder="服务天数" class="width110"/>
                  </p>
                  <p>
                    <input-number  :max="999999999" :min='0' v-model="scope.row.unit_price" placeholder="单价" :precision="3" class="width220"/>
                  </p>
                </div>
                <div v-else>
                  <p class="font0">
                    <input-number  :max="999999999" :min='1' v-model="scope.row.num" placeholder="数量" class="width110 mr" />
                    <input-number  :max="999999999" :min='0' v-model="scope.row.unit_price" placeholder="单价" :precision="3" class="width110" />
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="150">
              <template slot-scope="scope">
                <el-button @click="handleAddCostDel(index)" type="text">删除</el-button>
                <el-button @click="handleAddCostReset(index, scope)" type="text">清空</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="bill-form-wrap">
            <el-form
              label-width="170px">
              <el-form-item label="成本摊派" class="el-radio-primary el-item-mb10" required>
                <el-radio v-model="item.arr[0].apportion" label='2'>均摊</el-radio>
                <el-radio v-model="item.arr[0].apportion" label='1'>指定订单人头</el-radio>
              </el-form-item>
              <el-form-item class="el-item-mb10" v-show="item.arr[0].apportion === '1'">
                <div class="cost-list-view clearfix">
                  <span 
                    v-for="(cfgitem, cfgindex) in item.arr[0].cfg_cost_apportion"
                    :key="cfgindex">
                    <span v-if="cfgitem.is_checked" class="cost-list-view-item">
                      {{cfgitem.order_no}}
                      ({{cfgitem.num}})
                      <span class="cost-list-view-close" @click="delCostListView(cfgitem, cfgindex, index)">x</span>
                    </span>
                  </span>
                </div>
                <div class="cost-list-select clearfix">
                  <div class="cost-list-box" v-for="(it, idx) in item.arr[0].cfg_cost_apportion" :key="idx">
                    <div class='cost-list-left-box'>
                      <el-checkbox 
                        v-model="it.is_checked"
                        :indeterminate='it.indeterminate'
                        class="item-inner"
                        @input="boxwrapinput(it, idx, index)"
                        :title='it.order_no'>
                        {{it.order_no}}已选
                      </el-checkbox>
                      <input-number  :max="999999999" :min='1' v-model="it.num" placeholder="" readonly class="width50" />
                    </div>
                    <span
                      class="guest-inner"
                      v-for="(it2, idx2) in it.info"
                      :key="idx2">
                      <el-checkbox @input='boxinnerinput(it2, idx2, idx, index)' v-model="it2.is_checked">{{it2.username}}</el-checkbox>
                    </span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="申请原因" required>
                <el-input v-model="item.arr[0].reason" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-buttons">
      <el-button type="primary" @click="addAdjustment">提交申请</el-button>
      <el-button @click="goBack">取消</el-button>
    </div>
  </div>
</template>
<script>
import {applyAdjustment, addAdjustment, getIncomeCost} from 'src/api/tuan';
import SelectOrg from 'src/plugins/SelectOrg.vue';
import InputNumber from 'src/plugins/InputNumber.vue';
import * as format from 'src/utils/format';

export default {
  components: {
    InputNumber,
    SelectOrg
  },
  data () {
    return {
      tuan_id: this.$route.query.tuan_id ? this.$route.query.tuan_id : '',
      bill_ids: this.$route.query.bill_ids ? this.$route.query.bill_ids.split(',') : '',
      list: [],
      add_income: [],
      add_cost: [],
      org_info: [],
      item_type: {},
      cfg_cost_apportion: [],
      income_cost_list: [],
      showCfg: [],
      bill_type: {}
    }
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    getApplyAdjustment () {
      let params = {
        data: {
          tuan_id: this.tuan_id,
          bill_ids: this.bill_ids
        }
      };
      if (!this.tuan_id || !this.bill_ids) {
        return false
      };
      applyAdjustment({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            let resultArr = [];
            Object.keys(result.data.bills).forEach(function(key){
              let obj = {
                arr: [],
                back_amount: '',
                reason: '',
                order_price_detail: []
              };
              if (result.data.bills[key].bill_type === 1 && result.data.bills[key].order_no) {
                let incomeObj = {
                  item_name: '',
                  unit_price: '',
                  num: 1,
                  operator: '+',
                  isadd: 1
                }
                obj.order_price_detail.push(incomeObj)
              }
              obj.arr.push(result.data.bills[key])
              resultArr.push(obj)
            });
            this.list = resultArr;
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            });
          };
        },
        showLoading: true
      })
    },
    datepickerOptions(index, scope) {
      if(typeof this.add_cost[index].arr[scope.$index].room_start == 'string' && this.add_cost[index].arr[scope.$index].room_start != ''){
			  this.add_cost[index].arr[scope.$index].room_start = new Date(this.add_cost[index].arr[scope.$index].room_start);
			}
      let depart_date = this.add_cost[index].arr[scope.$index].room_start;
      return {
				disabledDate(time) {
					return time.getTime() <= (new Date(depart_date)).getTime();
				}
			}
		},
		datepickerOptions2(index, scope) {
      if(typeof this.add_cost[index].arr[scope.$index].room_end == 'string' && this.add_cost[index].arr[scope.$index].room_end != ''){
				this.add_cost[index].arr[scope.$index].room_end = new Date(this.add_cost[index].arr[scope.$index].room_end);
			}
      let depart_date = this.add_cost[index].arr[scope.$index].room_end;
      return {
				disabledDate(time) {
					return time.getTime() >= (new Date(depart_date)).getTime() - 8 * 60 * 60 * 1000;
				}
			}
		},
    addAdjustment() {
      let update_data = [];
      let count = 0;
      let canAdd = true;
      this.list.forEach((item, index) => {
        let obj = {
          bill_id: item.arr[0].id,
          back_amount: item.back_amount,
          reason: item.reason,
          order_price_detail: item.order_price_detail ? item.order_price_detail : []
        };
        let sum = 0;
        item.order_price_detail.forEach((itm, idx) => {
          if (parseFloat(itm.num) > 0 && parseFloat(itm.unit_price) > 0) {
            if (itm.operator === '+') {
              sum = sum + (parseFloat(itm.num) * parseFloat(itm.unit_price))
            } else if (itm.operator === '-') {
              sum = sum - (parseFloat(itm.num) * parseFloat(itm.unit_price))
            }
          };
          if (!itm.item_name && canAdd) {
            this.$message({
              type: 'error',
              message: `ID：${item.arr[0].id}，第${idx + 1}条价格项目不能为空`
            });
            canAdd = false;
          };
          if (!itm.unit_price && canAdd) {
            this.$message({
              type: 'error',
              message: `ID：${item.arr[0].id}，第${idx + 1}条单价不能为空`
            });
            canAdd = false;
          };
          if (!itm.num && canAdd) {
            this.$message({
              type: 'error',
              message: `ID：${item.arr[0].id}，第${idx + 1}条数量不能为空`
            });
            canAdd = false;
          };
        });
        sum = sum + this.list[index].arr[0].rmb_total_amount
        if (sum > 999999999 && canAdd) {
          this.$message({
            type: 'error',
            message: `ID：${item.arr[0].id}，调整后总金额不能超过999999999`
          });
          canAdd = false;
        };
        if (sum < 0 && canAdd) {
          this.$message({
            type: 'error',
            message: `ID：${item.arr[0].id}，调整后总金额不能小于0`
          });
          canAdd = false;
        };
        if (!item.back_amount && canAdd) {
          this.$message({
            type: 'error',
            message: `ID：${item.arr[0].id}，调账后金额不能为空`
          });
          canAdd = false;
        };
        if (!item.reason && canAdd) {
          this.$message({
            type: 'error',
            message: `ID：${item.arr[0].id}，申请原因不能为空`
          });
          canAdd = false;
        };
        if (item.reason.length > 200 && canAdd) {
          this.$message({
            type: 'error',
            message: `ID：${item.arr[0].id}，申请原因不能超过200个字符`
          });
          canAdd = false;
        };
        update_data.push(obj)
        count = count + 1;
      });
      if (!canAdd) {
        return false      
      };
      let add_income = [];
      let add_cost = [];
      if (this.income_cost_list.length > 0) {
        this.income_cost_list.forEach((item, index) => {
          if (item.income_cost_status === 1) {
            count = count + 1;
            if (!item.arr[0].org && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的代理商不能为空`
              });
              canAdd = false;
            };
            if (!item.arr[0].item_name && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的项目名称不能为空`
              });
              canAdd = false;
            };
            if (item.arr[0].item_name.length > 50 && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的项目名称不能超过50个字符`
              });
              canAdd = false;
            };
            if (!item.arr[0].bill_type && canAdd) {
              this.$message({
                type: 'error',
                message: `请选择第${count}数据的收入类型`
              });
              canAdd = false;
            };
            if (!item.arr[0].num && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的数量不能为空`
              });
              canAdd = false;
            };
            if (!item.arr[0].unit_price && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的单价不能为空`
              });
              canAdd = false;
            };
            if ((parseFloat(item.arr[0].num) * parseFloat(item.arr[0].unit_price)) > 999999999 && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}条数据的总金额不能超过999999999`
              });
              canAdd = false;
            };
            if (!item.arr[0].reason && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的申请原因不能为空`
              });
              canAdd = false;
            };
            if (item.arr[0].reason.length > 200 && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的申请原因不能超过200个字符`
              });
              canAdd = false;
            };
            let obj = {
              distributor_org_id: item.arr[0].org ? item.arr[0].org.org_id : '',
              distributor_org_name: item.arr[0].org ? item.arr[0].org.org_name : '',
              item_name: item.arr[0].item_name ? item.arr[0].item_name : '',
              bill_type: item.arr[0].bill_type ? item.arr[0].bill_type : '3',
              num: item.arr[0].num ? item.arr[0].num : '',
              unit_price: item.arr[0].unit_price ? item.arr[0].unit_price : '',
              reason: item.arr[0].reason ? item.arr[0].reason : ''
            };
            add_income.push(obj)
          } else if (item.income_cost_status === 2) {
            count = count + 1;
            if (!item.arr[0].org && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的供应商(结算方)不能为空`
              });
              canAdd = false;
            };
            if (!item.arr[0].item_name && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的项目名称不能为空`
              });
              canAdd = false;
            };
            if (item.arr[0].item_name.length > 50 && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的项目名称不能超过50个字符`
              });
              canAdd = false;
            };
            if (!item.arr[0].item_type && canAdd) {
              this.$message({
                type: 'error',
                message: `请选择第${count}数据的收入类型`
              });
              canAdd = false;
            } else {
              if (item.arr[0].item_type === '12') {
                if (!item.arr[0].room_start && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的入住日期不能为空`
                  });
                  canAdd = false;
                };
                if (!item.arr[0].room_end && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的结束日期不能为空`
                  });
                  canAdd = false;
                };
                if (!item.arr[0].room_nums && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的房间数不能为空`
                  });
                  canAdd = false;
                };
                let distance = '';
                let day = 0;
                let startTime = item.arr[0].room_start;
                let endTime = item.arr[0].room_end;
                let num = item.arr[0].room_nums;
                let price = item.arr[0].unit_price;
                if (startTime && endTime) {
                  distance = Date.parse(new Date(endTime)) - Date.parse(new Date(startTime));
                  day = Math.floor(distance / (1000 * 60 * 60 *24));
                  if (day < 0) {
                    day = 0
                  };
                };
                if ((day * num * price) > 999999999 && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}条数据的总金额不能超过999999999`
                  });
                  canAdd = false;
                }
              } else if (item.arr[0].item_type === '4') {
                if (!item.arr[0].meals_nums && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的餐数不能为空`
                  });
                  canAdd = false;
                };
                if (!item.arr[0].people_nums && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的人数不能为空`
                  });
                  canAdd = false;
                };
                if ((parseFloat(item.arr[0].meals_nums) * parseFloat(item.arr[0].unit_price) * parseFloat(item.arr[0].people_nums)) > 999999999 && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}条数据的总金额不能超过999999999`
                  });
                  canAdd = false;
                }
              } else if (item.arr[0].item_type === '20') {
                if (!item.arr[0].guides_nums && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的导游数不能为空`
                  });
                  canAdd = false;
                };
                if (!item.arr[0].service_nums && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的服务天数不能为空`
                  });
                  canAdd = false;
                };
                if (parseFloat(item.arr[0].guides_nums) * parseFloat(item.arr[0].unit_price) * parseFloat(item.arr[0].service_nums) > 999999999 && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}条数据的总金额不能超过999999999`
                  });
                  canAdd = false;
                }
              } else {
                if (!item.arr[0].num && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}数据的数量不能为空`
                  });
                  canAdd = false;
                };
                if (parseFloat(item.arr[0].num) * parseFloat(item.arr[0].unit_price) > 999999999 && canAdd) {
                  this.$message({
                    type: 'error',
                    message: `第${count}条数据的总金额不能超过999999999`
                  });
                  canAdd = false;
                }
              };
            };
            if (!item.arr[0].unit_price && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的单价不能为空`
              });
              canAdd = false;
            };
            let cost_appoint = []
            item.arr[0].cfg_cost_apportion.forEach((item1, index1) => {
              if (item1.is_checked) {
                let obj = {
                  order_no: item1.order_no,
                  num: item1.num,
                  tourist_ids: ''
                }
                let tourist_ids = ''
                item.arr[0].cfg_cost_apportion[index1].info.forEach((item2, index2) => {
                  if (item2.is_checked) {
                    tourist_ids = tourist_ids + item2.id + ','
                  }
                })
                tourist_ids = tourist_ids.substr(0, tourist_ids.length - 1)
                obj.tourist_ids = tourist_ids
                cost_appoint.push(obj)
              }
            })
            if (item.arr[0].apportion === '1' && canAdd && cost_appoint.length === 0) {
              this.$message({
                type: 'error',
                message: `请选择第${count}数据的指定订单人头`
              });
              canAdd = false;
            };
            // if (item.arr[0].check.length > 0 && item.arr[0].apportion === '1' && canAdd){
            //   item.arr[0].check.forEach((check, idx) => {
            //     item.arr[0].cfg_cost_apportion.forEach((cfg, cfgidx) => {
            //       if (check === cfg.order_no && canAdd) {
            //         if (!cfg.num) {
            //           this.$message({
            //             type: 'error',
            //             message: `第${count}数据订单号：${cfg.order_no}的人头数必须大于0`
            //           });
            //           canAdd = false;
            //         };
            //         if (cfg.num > cfg.enrollment) {
            //           this.$message({
            //             type: 'error',
            //             message: `第${count}数据订单号：${cfg.order_no}的订单人头数超出订单总人数`
            //           });
            //           canAdd = false;
            //         }
            //         obj.cost_appoint.push({
            //           order_no: cfg.order_no,
            //           num: cfg.num
            //         })
            //       };
            //     });
            //   });
            // };
            if (!item.arr[0].reason && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的申请原因不能为空`
              });
              canAdd = false;
            };
            if (item.arr[0].reason.length > 200 && canAdd) {
              this.$message({
                type: 'error',
                message: `第${count}数据的申请原因不能超过200个字符`
              });
              canAdd = false;
            };
            let obj = {
              supplier_org_id: item.arr[0].org ? item.arr[0].org.org_id : '',
              supplier_org_name: item.arr[0].org ? item.arr[0].org.org_name : '',
              item_name: item.arr[0].item_name ? item.arr[0].item_name : '',
              item_type: item.arr[0].item_type ? item.arr[0].item_type : '',
              num: item.arr[0].num ? item.arr[0].num : '',
              unit_price: item.arr[0].unit_price ? item.arr[0].unit_price : '',
              reason: item.arr[0].reason ? item.arr[0].reason : '',
              apportion: item.arr[0].apportion ? item.arr[0].apportion : '',
              room_end: item.arr[0].room_end ? format.date(item.arr[0].room_end) : '',
              room_start: item.arr[0].room_start ? format.date(item.arr[0].room_start) : '',
              room_nums: item.arr[0].room_nums ? item.arr[0].room_nums : '',
              people_nums: item.arr[0].people_nums ? item.arr[0].people_nums : '',
              meals_nums: item.arr[0].meals_nums ? item.arr[0].meals_nums : '',
              guides_nums: item.arr[0].guides_nums ? item.arr[0].guides_nums : '',
              service_nums: item.arr[0].service_nums ? item.arr[0].service_nums : '',
              cost_appoint: cost_appoint
            };
            add_cost.push(obj)
          }
        })
      }
      if (!canAdd) {
        return false      
      };
      let params = {
        data: {
          resource_id: this.tuan_id,
          update_data: update_data,
          add_income: add_income,
          add_cost: add_cost
        }
      };
      addAdjustment({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            });
            window.history.go(-1)
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
    handleAddIncome() {
      this.getIncomeCost(1);
    },
    handleAddIncomeReset (index, scope) {
      // let obj = this.add_income[index].arr[scope.$index];
      let obj = this.income_cost_list[index].arr[scope.$index];
      obj.org = null;
      obj.distributor_org_id = '';
      obj.distributor_org_name = '';
      obj.item_name = '';
      obj.bill_type = '3';
      obj.num = '';
      obj.unit_price = '';
      obj.reason = '';
    },
    handleAddIncomeDel (index) {
      // this.add_income.splice(index, 1);
      this.income_cost_list.splice(index, 1);
    },
    handleAddCost() {
      this.getIncomeCost(2);
    },
    handleAddCostReset (index, scope) {
      // let obj = this.add_cost[index].arr[scope.$index];
      let obj = this.income_cost_list[index].arr[scope.$index];
      obj.org = null;
      obj.supplier_org_id = '';
      obj.supplier_org_name = '';
      obj.item_name = '';
      obj.item_type = '';
      obj.num = '';
      obj.unit_price = '';
      obj.reason = '';
      obj.apportion = '2';
      obj.cost_appoint = [],
      obj.room_end = '';
      obj.room_start = '';
      obj.room_nums = '';
      obj.people_nums = '';
      obj.meals_nums = '';
      obj.guides_nums = '';
      obj.service_nums = '';
      obj.check = [];
      obj.cfg_cost_apportion.forEach((item, index) => {
        item.num = ''
      })
    },
    handleAddCostDel (index) {
      // this.add_cost.splice(index, 1)
      this.income_cost_list.splice(index, 1);
    },
    getIncomeCost(type) {
      let params = {
        data: {
          type: type,
          tuan_id: this.tuan_id
        }
      };
      getIncomeCost({
        params,
        success: (res) => {
          let result = res.data;
          if (result.code === 0) {
            this.org_info = result.data.org_info;
            this.item_type = result.data.item_type;
            this.bill_type = result.data.bill_type;
            this.cfg_cost_apportion = result.data.cfg_cost_apportion ? result.data.cfg_cost_apportion : [];
            let cfg_cost_apportion = []
            if (this.cfg_cost_apportion.length > 0) {
              this.cfg_cost_apportion.forEach((item, index) => {
                this.$set(item, 'indeterminate', false)
                item.info.forEach((item1, index1) => {
                  this.$set(item1, 'is_checked', false)
                })
                cfg_cost_apportion.push(item)
              })
            }
            if (type === 2) {
              let obj = {
                org: null,
                supplier_org_id: '',
                supplier_org_name: '',
                item_name: '',
                item_type: '',
                num: '',
                unit_price: '',
                reason: '',
                apportion: '2',
                cost_appoint: [],
                room_end: '',
                room_start: '',
                room_nums: '',
                people_nums: '',
                meals_nums: '',
                guides_nums: '',
                service_nums: '',
                check: [],
                cfg_cost_apportion: cfg_cost_apportion
              };
              let arr = {
                arr: [],
                income_cost_status: 2
              };
              arr.arr.push(obj);
              this.add_cost.push(arr);
              this.income_cost_list.push(arr);
            } else if (type === 1) {
               let obj = {
                org: null,
                distributor_org_id: '',
                distributor_org_name: '',
                item_name: '',
                bill_type: '3',
                num: '',
                unit_price: '',
                reason: ''
              };
              let arr = {
                arr: [],
                income_cost_status: 1
              };
              arr.arr.push(obj);
              this.add_income.push(arr);
              this.income_cost_list.push(arr);
            }
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
    calculationNums(index, scope) {
      if (scope.row.item_type === '12') {
        let distance = '';
        let day = 0;
        let startTime = scope.row.room_start;
        let endTime = scope.row.room_end;
        let num = scope.row.room_nums;
        let price = scope.row.unit_price;
        if (startTime && endTime) {
          distance = Date.parse(new Date(endTime)) - Date.parse(new Date(startTime));
          day = Math.floor(distance / (1000 * 60 * 60 *24));
          if (day < 0) {
            day = 0
          };
        };
        if (startTime && endTime && num) {
          // this.add_cost[index].arr[scope.$index].num = day * num;
          this.income_cost_list[index].arr[scope.$index].num = day * num;
        };
        if ((day * num * price) > 999999999) {
          this.$message({
            type: 'error',
            message: `第${this.list.length + index + 1}条数据的总金额不能超过999999999`
          });
          return 0
        } else {
          return (day * num * price)
        }
      } else if (scope.row.item_type === '4') {
        if (parseFloat(scope.row.meals_nums) > 0 && parseFloat(scope.row.unit_price) > 0 && parseFloat(scope.row.people_nums) > 0) {
          if ((parseFloat(scope.row.meals_nums) * parseFloat(scope.row.unit_price) * parseFloat(scope.row.people_nums)) > 999999999) {
            this.$message({
              type: 'error',
              message: `第${this.list.length + index + 1}条数据的总金额不能超过999999999`
            });
            return 0
          } else {
            return parseFloat(scope.row.meals_nums) * parseFloat(scope.row.unit_price) * parseFloat(scope.row.people_nums)
          }
        } else {
          return 0
        }
      } else if (scope.row.item_type === '20') {
        if (parseFloat(scope.row.guides_nums) > 0 && parseFloat(scope.row.unit_price) > 0 && parseFloat(scope.row.service_nums) > 0) {
          if (parseFloat(scope.row.guides_nums) * parseFloat(scope.row.unit_price) * parseFloat(scope.row.service_nums) > 999999999) {
            this.$message({
              type: 'error',
              message: `第${this.list.length + index + 1}条数据的总金额不能超过999999999`
            });
            return 0
          } else {
            return parseFloat(scope.row.guides_nums) * parseFloat(scope.row.unit_price) * parseFloat(scope.row.service_nums)
          }
        } else {
          return 0
        }
      } else {
        if (parseFloat(scope.row.num) > 0 && parseFloat(scope.row.unit_price) > 0) {
          if (parseFloat(scope.row.num) * parseFloat(scope.row.unit_price) > 999999999) {
            this.$message({
              type: 'error',
              message: `第${this.list.length + index + 1}条数据的总金额不能超过999999999`
            });
            return 0
          } else {
            return parseFloat(scope.row.num) * parseFloat(scope.row.unit_price)
          }
        } else {
          return 0
        }
      }
    },
    calculationNumsIncome(index, scope) {
      if (parseFloat(scope.row.num) > 0 && parseFloat(scope.row.unit_price) > 0) {
        if ((parseFloat(scope.row.num) * parseFloat(scope.row.unit_price)) > 999999999) {
          this.$message({
            type: 'error',
            message: `第${this.list.length + index + 1}条数据的总金额不能超过999999999`
          });
          return 0
        } else {
          return parseFloat(scope.row.num) * parseFloat(scope.row.unit_price)
        }
      } else {
        return 0
      }
    },
    calculationNumsaUpdateincome (index) {
      let sum = 0;
      this.list[index].order_price_detail.forEach((item, index) => {
        if (parseFloat(item.num) > 0 && parseFloat(item.unit_price) > 0) {
          if (item.operator === '+') {
            sum = sum + (parseFloat(item.num) * parseFloat(item.unit_price))
          } else if (item.operator === '-') {
            sum = sum - (parseFloat(item.num) * parseFloat(item.unit_price))
          }
        };
      });
      sum = sum + this.list[index].arr[0].rmb_total_amount
      if (sum > 999999999) {
        this.$message({
          type: 'error',
          message: `ID：${this.list[index].arr[0].id}，调整后总金额不能超过999999999`
        });
        this.list[index].back_amount = 0
        return 0
      } else if (sum < 0) {
        this.$message({
          type: 'error',
          message: `ID：${this.list[index].arr[0].id}，调整后总金额不能小于0`
        });
        this.list[index].back_amount = 0
        return 0
      } else {
        this.list[index].back_amount = sum
        return sum
      }
    },
    addSingerPrice (index) {
      let incomeObj = {
        item_name: '',
        unit_price: '',
        num: 1,
        operator: '+',
        isadd: 1
      }
      this.list[index].order_price_detail.push(incomeObj)
    },
    delSingerPrice (index, priceIndex) {
      this.list[index].order_price_detail.splice(priceIndex, 1)
    },
    boxwrapinput (it, index, pindex) {
      let sum = 0
      if (it.is_checked) {
        this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].indeterminate = false
        this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].info.forEach((item, index) => {
          item.is_checked = true
          sum = sum + 1
        })
      } else {
        this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].indeterminate = false
        this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].info.forEach((item, index) => {
          item.is_checked = false
        })
      }
      this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].num = sum ? sum : ''
    },
    boxinnerinput (it, index, pindex, ppindex) {
      let sum = 0
      this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].info.forEach((item, index) => {
        if (item.is_checked) {
          sum = sum + 1
        }
      })
      if (sum === this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].enrollment) {
        this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].is_checked = true
        this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].indeterminate = false
      } else if (sum > 0 && sum < this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].enrollment) {
        this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].is_checked = true
        this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].indeterminate = true
      } else if (sum === 0) {
        this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].is_checked = false
        this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].indeterminate = false
      }
      this.income_cost_list[ppindex].arr[0].cfg_cost_apportion[pindex].num = sum ? sum : ''
    },
    delCostListView (it, index, pindex) {
      this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].is_checked = false
      this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].indeterminate = false
      this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].num = ''
      this.income_cost_list[pindex].arr[0].cfg_cost_apportion[index].info.forEach((item, index) => {
        item.is_checked = false
      })
    }
  },
  mounted() {
    this.getApplyAdjustment();
  },
}
</script>
<style lang="less" scoped>
  .bill-wrap {
    background-color: #fff;
    padding: 15px;
    .bill-table-wrap {
      .tc {
        text-align: center;
      }
    }
    .bill-table-tit {
      border-left: 5px solid #b10c79;
      margin: 20px 0 20px;
      padding: 0px 0 0px 15px;
      color: #b10c79;
      font-size: 20px;
    }
    .bill-form-wrap {
      margin-bottom: 15px;
      padding: 15px 15px 15px 0px;
      border-left: 1px solid #bfcbd9;
      border-right: 1px solid #bfcbd9;
      border-bottom: 1px solid #bfcbd9;
    }
    .width50 {
      width: 50px;
    }
    .width80 {
      width: 80px;
    }
    .width110 {
      width: 110px;
    }
    .mr {
      margin-right: 5px;
    }
    .pb {
      padding-bottom: 5px;
      font-size: 0px;
    }
    .font0 {
      font-size: 0px;
    }
    .width220 {
      width: 225px;
    }
    .right-btn {
      float: right;
      width: 120px;
      padding: 0 10px;
      margin: 0 0 0 10px;
    }
    .cost-list-select {
      // width: 700px;
      .item-cost {
        float: left;
        // width: 40%;
        padding: 5px 10px;
      }
      .item-inner {
        display: inline-block !important;
        width: 200px;
        vertical-align: middle;
      }
      .cost-list-box {
        position: relative;
        padding-left: 265px;
        .cost-list-left-box {
          position: absolute;
          left: 0px;
          top: 0;
        }
        .guest-inner {
          margin: 0 10px 0 0;
        }
      }
    }
    .cost-list-view {
      .cost-list-view-item {
        position: relative;
        float: left;
        height: 30px;
        line-height: 30px;
        margin-bottom: 5px;
        margin-right: 10px;
        padding: 0 20px 0 5px;
        border: 1px solid #f7e6f1;
        color: #b10c79;
        background: #fbf3f8;
        .cost-list-view-close {
          position: absolute;
          top: 0;
          right: 0px;
          color: #ccc;
          width: 20px;
          height: 30px;
          font-size: 20px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .el-item-mb10 {
      margin-bottom: 10px;
    }
    .width30 {
      width: 50px;
    }
    .price-btn {
      padding: 0 0 0 10px;
      color: #b10c79;
      cursor: pointer;
    }
  }
</style>
