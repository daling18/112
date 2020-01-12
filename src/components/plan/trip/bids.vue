<template>
  <div class="wrapper bids-wrap">
    <div class="system-content">
      <div class="mod-form">
        <div class="add-newbids-btn-wrap">
          <el-button type="primary" size="long" @click="shownewPiliang" :disabled="isPiliang">+ 批量新增价格类型</el-button>
          <el-button type="primary" size="long" @click="showNewPriceType(0)" :disabled="isPiliang || isnewPiliang">+ 新增价格类型</el-button>
        </div>
        <div class="bids-list">
          <el-table :data='bids_list' style="width: 100%" border>
            <el-table-column
            label='日期显示'
            align="center"
            width="100">
              <template slot-scope="scope">
                <!-- <el-checkbox @input="changeDate(scope.row, $event)" :value="scope.row.price_id == checkedId"></el-checkbox> -->
                <!-- :disabled="isPiliang" -->
                <el-checkbox @input="changeDate(scope, $event)" v-model="scope.row.checkdate" :disabled="isPiliang || isnewPiliang"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
            label="价格类型"
            align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                  <div class="ellipsis">{{scope.row.name}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
            label="结算价"
            align="center"
            width="100">
              <template slot-scope="scope">
                <div>{{scope.row.peer_price}}</div>
              </template>
            </el-table-column>
            <el-table-column
            label="销售价"
            align="center"
            width="100">
              <template slot-scope="scope">
                <div>{{scope.row.out_price}}</div>
              </template>
            </el-table-column>
            <el-table-column
            label="最低限价"
            align="center"
            width="100">
              <template slot-scope="scope">
                <div>{{scope.row.limit_price}}</div>
              </template>
            </el-table-column>
            <el-table-column
            label="状态"
            align="center"
            width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-text=""
                  inactive-text=""
                  active-color="#b10c79"
                  :disabled=swStatus
                  @click.native="switchIndex(scope.row.price_id)"
                  @change="changePriceStatus(scope.row, $event)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
            label="操作"
            width='400'
            align="center"
            >
              <template slot-scope="scope">
                <div class="operation-wrapper">
                  <el-button type="text" @click="showNewPriceType(scope.row.price_id)" :disabled="isPiliang || isnewPiliang">编辑价格类型</el-button>
                  <el-button type="text" @click="showBatchQuo(scope.row, scope.row.price_id, scope.row.name)" :disabled="isPiliang || isnewPiliang">新增报价</el-button>
                  <el-button type="text" @click="showPiliang(scope)" :disabled="isnewPiliang">批量报价</el-button>
                  <el-button type="text" @click="showSetExtraDialog(scope.row.price_id)" :disabled="isPiliang || isnewPiliang">配置可变项</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="piliang-wrap" v-if="isPiliang">
          <el-button @click="cancelpiliangshowBatchQuo" size="long">取消</el-button>
          <el-button @click="piliangshowBatchQuo" type="primary" size="long">确认</el-button>
        </div>
        <div class="piliang-wrap" v-if="isnewPiliang">
          <el-button @click="cancelpiliangdoPriceType" size="long">取消</el-button>
          <el-button @click="piliangdoPriceType" type="primary" size="long">确认</el-button>
        </div>
        <div class="calendar-wrap">
          <div class="calendar-tit">
            <b @click="prevMonth"><</b>
            <b>{{date.onYear}}年{{date.onMonth}}月</b>
            <b @click="nextMonth">></b>
          </div>
          <div class="calendar-week">
            <div class="calendar-week-info">一</div>
            <div class="calendar-week-info">二</div>
            <div class="calendar-week-info">三</div>
            <div class="calendar-week-info">四</div>
            <div class="calendar-week-info">五</div>
            <div class="calendar-week-info">六</div>
            <div class="calendar-week-info">日</div>	
          </div>
          <div class="calendar-con" v-if="!isPiliang && !isnewPiliang">
            <div v-for="(item, index) in date.onCalendar" :key="index" class="calendar-item">
              <div v-show="item.remain_num >= 0" class="day-close">
                <span @click="delDate(item)" class="day-close-in">X</span>
              </div>
              <div class="day-con">{{item.day}}</div>
              <el-tooltip v-if="item.plan_num >= 0" class="item" effect="dark" :content="item.name" placement="top">
                <div v-show="item.plan_num >= 0" class="day-info1 ellipsis">{{item.name}}</div>
              </el-tooltip>
              <div v-show="item.plan_num >= 0" class="day-info">
                <span v-show="item.plan_num > 0">{{item.remain_num}}/{{item.plan_num}}</span>
                <span @click="selDay(item)" class="calendat-btn">修改</span>
              </div>
              <div v-show="item.plan_num >= 0" class="day-2qr">
                <template v-if="item.need_second_confirm == 0">(无需二次确认)</template>
                <template v-else>(需二次确认)</template>
              </div>
            </div>
          </div>
          <div v-else class="calendar-con">
            <div @click="dayPiliang(item, index)" v-for="(item, index) in date.onCalendar" :class="{nosel: item.nosel || item.day === '',sel: item.piliang}" :key="index" class="calendar-item">
            <!-- <div @click="dayPiliang(item, index)" v-for="(item, index) in date.onCalendar" :class="item.piliang ? 'sel' : ''" :key="index" class="calendar-item"> -->
              <div class="day-con">{{item.day}}{{item.cansel}}</div>
              <div v-show="item.plan_num >= 0" class="day-info1">{{item.name}}</div>
              <div v-show="item.plan_num >= 0" class="day-info">
                <span v-show="item.plan_num > 0">{{item.remain_num}}/{{item.plan_num}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增价格类型弹窗 -->
    <el-dialog :title="priceId == 0 ? '新增价格类型': '编辑'" :visible.sync="priceTypeDialog"  :close-on-click-modal="false">
      <el-form>
        <el-form-item label="价格类型" label-width="100px" required>
          <el-input class="width2" v-model="priceType.name" placeholder="如：周末价／厦门出发（厦门成团）"></el-input>
        </el-form-item>
        <el-form-item label="结算价" label-width="100px" required>
          <input-number  class="width1" v-model="priceType.peer_price" :precision="3" number/>
          <span>元／人</span>
        </el-form-item>
        <el-form-item label="销售价" label-width="100px" required>
          <input-number  class="width1" v-model="priceType.out_price" :precision="3" number/>
          <span>元／人</span>
        </el-form-item>
        <el-form-item label="最低限价" label-width="100px" required>
          <input-number  class="width1" v-model="priceType.limit_price" :precision="3" number/>
          <span>元／人</span>
        </el-form-item>
        <!-- <el-form-item label="单房差" label-width="100px" required>
          <input-number  class="width1" v-model="priceType.diff_price" :precision="3" number/>
          <span>元／人</span>
        </el-form-item> -->
        <div v-show="priceDetail">
          <el-form-item label="选择星期" label-width="100px">
            <el-checkbox-group v-model="priceType.week_info">
              <el-checkbox label="星期一"></el-checkbox>
              <el-checkbox label="星期二"></el-checkbox>
              <el-checkbox label="星期三"></el-checkbox>
              <el-checkbox label="星期四"></el-checkbox>
              <el-checkbox label="星期五"></el-checkbox>
              <el-checkbox label="星期六"></el-checkbox>
              <el-checkbox label="星期日"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <template v-if="isnewPiliang">
            <el-form-item label="报价日期" label-width="100px" required>
              <span v-for="(item, index) in price_date" :key="index" class="piliang-pd">{{item}}</span>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="报价日期" label-width="100px" required>
              <el-date-picker
                type="date"
                :picker-options="datapickerstart"
                placeholder="选择日期"
                :editable='false'
                v-model="priceType.price_start_date">
              </el-date-picker>
              <span class="text">至</span>
              <el-date-picker
                type="date"
                :picker-options="datapickerend"
                placeholder="选择日期"
                :editable='false'
                v-model="priceType.price_end_date">
              </el-date-picker>
            </el-form-item>
          </template>
          <el-form-item label="二次确认" label-width="100px" required>
            <el-radio v-model="priceType.need_second_confirm" label="1">需二次确认</el-radio>
            <el-radio v-model="priceType.need_second_confirm" label="0">无需二次确认</el-radio>
          </el-form-item>
          <template v-if="priceType.need_second_confirm == 0">
            <el-form-item label="库存预警" label-width="100px">
              <input-number  class="yj" v-model="priceType.warning_plan_num" />
              <span class="yj-txt">（库存低于预警值进行预警）</span>
            </el-form-item>
            <el-form-item label="库存" label-width="100px" required>
              <input-number  class="width1" v-model="priceType.plan_num" />
            </el-form-item>
          </template>
        </div>
      </el-form>
      <div slot="footer" class="textcen">
        <el-button @click="showNewPriceType(0)">取消</el-button>
        <el-button @click="doPriceType" type="primary">{{priceId == 0 ? '保存，添加下一个': '确认'}}</el-button>
      </div>
    </el-dialog>
    <!-- 新增报价 -->
    <el-dialog title="新增报价" :visible.sync="batchQuoDialog" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="价格类型" label-width="100px">
          {{batchQuo.name}}
        </el-form-item>
        <el-form-item label="选择星期" label-width="100px">
          <el-checkbox-group v-model="batchQuo.week_info">
            <el-checkbox label="星期一"></el-checkbox>
            <el-checkbox label="星期二"></el-checkbox>
            <el-checkbox label="星期三"></el-checkbox>
            <el-checkbox label="星期四"></el-checkbox>
            <el-checkbox label="星期五"></el-checkbox>
            <el-checkbox label="星期六"></el-checkbox>
            <el-checkbox label="星期日"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <template v-if="isPiliang">
          <el-form-item label="报价日期" label-width="100px" required>
            <span v-for="(item, index) in price_date" :key="index" class="piliang-pd">{{item}}</span>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="报价日期" label-width="100px" required>
            <el-date-picker
              type="date"
              :picker-options="datapickerstart1"
              placeholder="选择日期"
              :editable='false'
              v-model="batchQuo.price_start_date">
            </el-date-picker>
            <span class="text">至</span>
            <el-date-picker
              type="date"
              :picker-options="datapickerend1"
              placeholder="选择日期"
              :editable='false'
              v-model="batchQuo.price_end_date">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-form-item label="二次确认" label-width="100px" required>
          <el-radio v-model="batchQuoTmp.need_second_confirm_rd" label="1" disabled>需二次确认</el-radio>
          <el-radio v-model="batchQuoTmp.need_second_confirm_rd" label="0" disabled>无需二次确认</el-radio>
        </el-form-item>
        <!-- 需要二次确认 -->
        <template v-if="batchQuoTmp.need_second_confirm == 1">
        </template>
        <!-- 无需二次确认 -->
        <template v-else>
          <el-form-item label="库存" label-width="100px" required>
            <input-number  class="width1" v-model="batchQuo.plan_num" />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="textcen">
        <el-button @click="batchQuoDialog = !batchQuoDialog">取消</el-button>
        <el-button @click="doBatchQuotation" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑可变项 -->
    <el-dialog title="编辑可变项" :visible.sync="setExtraDialog" :close-on-click-modal="false" size="large">
      <div class="">基准价格</div>
      <el-form class="extra-form">
        <el-form-item label="价格类型" label-width="100px">
          {{setExtraInfo.name}}
        </el-form-item>
        <el-form-item label="结算价" label-width="100px">
          {{setExtraInfo.peer_price}} 元／人
        </el-form-item>
        <el-form-item label="销售价" label-width="100px">
          {{setExtraInfo.out_price}} 元／人
        </el-form-item>
        <el-form-item label="最低限价" label-width="100px">
          {{setExtraInfo.limit_price}} 元／人
        </el-form-item>
        <div style="width: 100%;overflow: auto">
        <table class="el-table" style="width: 100%; min-width: 1024px">
          <thead>
            <tr>
              <th class="tc" style="width: 100px">可变项类型</th>
              <th class="tc" style="width: 100px">项目</th>
              <th class="tc" style="width: 100px">结算价（差价）</th>
              <th class="tc" style="width: 100px">销售价（差价）</th>
              <th class="tc" style="width: 200px">库存</th>
              <th class="tc" style="width: 60px">操作</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, index) in setExtraInfo.extra_name" :key="item" v-if="setExtraInfo.chname[index].length > 1"> -->
            <tr v-for="(item, index) in setExtraInfo.extra_info" :key="index">
              <td class="cell" style="vertical-align: top;">
                <div class="md-34">
                  <el-input v-model="setExtraInfo.extra_name[index]" placeholder="类型，如：酒店等级" :disabled="setExtraInfo.extra_info[index] && !!setExtraInfo.extra_info[index].is_default"></el-input>
                </div>
              </td>
              <td class="cell">
                <el-form-item v-for="(ite, idx) in setExtraInfo.chname[index]" :key="idx">
                  <el-input v-model="setExtraInfo.chname[index][idx]" :placeholder="idx == 0 ? '基准项' : '可变项'" :disabled="!!setExtraInfo.is_default[index][idx]"></el-input>
                </el-form-item>
              </td>
              <td class="cell">
                <el-form-item v-for="(ite, idx) in setExtraInfo.diff_peer_price[index]" :key="idx">
                  <div class="operation" :class="idx === 0 ? 'vis-hid' : ''">
                    <el-select v-model="setExtraInfo.peer_operator[index][idx]" placeholder="请选择">
                      <el-option label="+" value="+"></el-option>
                      <el-option label="-" value="-"></el-option>
                    </el-select>
                  </div>
                  <div class="operation1" :class="idx === 0 ? 'vis-hid' : ''">
                    <input-number  v-model="setExtraInfo.diff_peer_price[index][idx]" :precision="3" number />
                  </div>
                </el-form-item>
              </td>
              <td class="cell">
                <el-form-item v-for="(ite, idx) in setExtraInfo.diff_out_price[index]" :key="idx">
                  <div class="operation" :class="idx === 0 ? 'vis-hid' : ''">
                    <el-select v-model="setExtraInfo.out_operator[index][idx]" placeholder="请选择">
                      <el-option label="+" value="+"></el-option>
                      <el-option label="-" value="-"></el-option>
                    </el-select>
                  </div>
                  <div class="operation1" :class="idx === 0 ? 'vis-hid' : ''">
                    <input-number  v-model="setExtraInfo.diff_out_price[index][idx]" :precision="3" number />
                  </div>
                </el-form-item>
              </td>
              <td class="cell">
                <el-form-item v-for="(ite, idx) in setExtraInfo.plan_num[index]" :key="idx">
                  <!-- 需二次确认的 -->
                  <template v-if="setExtraInfo.need_second_confirm == 1">
                    <el-select
                      style="width: 80px"
                      v-model="setExtraInfo.plan_num_type[index][idx]"
                      disabled
                    >
                      <el-option label="随总库" :value="2"></el-option>
                    </el-select>
                    <div class="operation1" :class="idx === 0 ? 'vis-hid' : ''">
                      <el-input disabled value="0"></el-input>
                    </div>
                  </template>
                  <!-- 无需二次确认的 -->
                  <template v-else>
                    <el-select
                      :class="idx === 0 ? 'vis-hid' : ''"
                      style="width: 80px"
                      v-model="setExtraInfo.plan_num_type[index][idx]" 
                      placeholder="请选择"
                    >
                      <el-option label="独立库" :value="1"></el-option>
                      <el-option label="随总库" :value="2"></el-option>
                    </el-select>
                    <div class="operation1" v-if="setExtraInfo.plan_num_type[index][idx] == 2" :class="idx === 0 ? 'vis-hid' : ''">
                      <el-input disabled value="0"></el-input>
                    </div>
                    <div class="operation1" v-else :class="idx === 0 ? 'vis-hid' : ''">
                      <input-number  
                          v-model="setExtraInfo.plan_num[index][idx]"
                          :disabled='setExtraInfo.plan_num_type[index][idx] == 2 ? true : false'
                      />
                    </div>
                  </template>
                  <span v-if="setExtraInfo.extra_name[index] != '出发城市'" @click="addchextra(index, idx)" class="squire-btn tc">+</span>
                  <span v-if="setExtraInfo.plan_num[index].length > 1 && !setExtraInfo.is_default[index][idx] && setExtraInfo.extra_name[index] != '出发城市' && idx != 0" @click="delchextra(index, idx)" class="squire-btn tc">-</span>
                </el-form-item>
              </td>
              <td class="cell" align="center">
                <span v-if="!setExtraInfo.extra_info[index] || !setExtraInfo.extra_info[index].is_default" class="extra-btn" @click="delextra(index)">删除</span>
                <span v-show="index == setExtraInfo.extra_name.length - 1" class="extra-btn" @click="addextra">添加</span>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <p class="tip-p">注：可变项目与基准项目对比。需先添加可变项类型，基准项，才可输入具体的可变项目以及他的差价。</p>
      </el-form>
      <div slot="footer" class="textcen">
        <el-button @click="showSetExtraDialog(0)">取消</el-button>
        <el-button @click="doSetExtra" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改库存" :visible.sync="planDialog" :close-on-click-modal="false" size="tiny">
      <el-form class="extra-form">
        <el-form-item label="二次确认" label-width="100px" required>
          <el-radio v-model="warehouse.need_second_confirm" label="1">需二次确认</el-radio>
          <el-radio v-model="warehouse.need_second_confirm" label="0">无需二次确认</el-radio>
        </el-form-item>
        <template v-if="warehouse.need_second_confirm == 0">
          <el-form-item label="总库存" label-width="100px" required>
            <input-number  class="width1" v-model="warehouse.plan_num" />
          </el-form-item>
          <p class="tip-p">注：总库存量应大于已售买量</p>
        </template>
      </el-form>
      <div slot="footer" class="textcen">
        <el-button @click="selDay()">取消</el-button>
        <el-button @click="updatePlanNum" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除报价" :visible.sync="deldateDialog" :close-on-click-modal="false" size="tiny">
      <p class="tip-p">确认删除该日期报价</p>
      <div slot="footer" class="textcen">
        <el-button @click="deldatecancle">取消</el-button>
        <el-button @click="deldateconfirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
  import {priceTypeList,
          priceType, 
          doPriceType, 
          changePriceStatus,
          doBatchQuotation,
          setExtra,
          doSetExtra,
          showPriceDate,
          updatePlanNum,
          delPriceDate} from 'src/api/api'
  import {supplierPriceTypeList,
          supplierPriceType,
          supplierDoPriceType,
          supplierChangePriceStatus,
          supplierDoBatchQuotation,
          supplierSetExtra,
          supplierDoSetExtra,
          supplierShowPriceDate,
          supplierUpdatePlanNum,
          supplierDelPriceDate} from 'src/api/supplier'
  import InputNumber from "src/plugins/InputNumber.vue";
  let lodash = require('lodash')
  export default {
    components: {
      InputNumber
    },
    data() {
      return {
        topMenuConst: this.$route.meta.topMenuConst ? this.$route.meta.topMenuConst : '',
        product_id: this.$route.query.id,
        bids_list: [],
        priceTypeDialog: false,
        batchQuoDialog: false,
        batchQuoTmp: [],
        setExtraDialog: false,
        planDialog: false,
        priceDetail: true,
        deldateDialog: false,
        mid_price_id: 0,
        priceId: 0,
        checkedId: [],
        priceType: {
          name: '',
          peer_price: "0",
          out_price: "0",
          limit_price: "0",
          diff_price: "0",
          week_info: [],
          price_start_date: '',
          price_end_date: '',
          warning_plan_num: 0,
          need_second_confirm: '0',
          plan_num: '',
        },
        batchQuo: {
          name: '',
          week_info: [],
          price_start_date: '',
          price_end_date: '',
          plan_num: '',
          need_second_confirm: ''
        },
        date: {
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
          product_id: '',
          price_id: '',
          id: '',
          need_second_confirm: '0',
          plan_num: ''
        },
        delpd: {
          product_id: '',
          price_id: '',
          id: ''
        },
        swStatus: false,
        chooseData:[],
        showdate: [],
        curr_month: '',
        setExtraInfo: {},
        isPiliang: false,
        isnewPiliang: false,
        price_date: [],
        midScope: {},
        midechecboxIndex: [],
        firstEnter: true,
        datapickerstart: {
          disabledDate: (time) => {
            return time.getTime() <= Date.now();
          }
        },
        datapickerend: {
          disabledDate: (time) => {
            let beginDateVal = this.priceType.price_start_date;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        datapickerstart1: {
          disabledDate: (time) => {
            return time.getTime() <= Date.now();
          }
        },
        datapickerend1: {
          disabledDate: (time) => {
            let beginDateVal = this.batchQuo.price_start_date;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        }
      }
    },
    watch: {
    },
    methods: {
      priceTypeList() {
        let params = {
          data: {
            product_id: this.product_id
          }
        };
        let action = priceTypeList
        if (this.topMenuConst === 'supplier') {
          action = supplierPriceTypeList
        }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data.data;
              if (result.length > 0) {
                this.bids_list.splice(0, this.bids_list.length);
                for (let i = 0; i < result.length; i++) {
                  let res_obj = {}
                  res_obj.name = result[i].name;
                  res_obj.peer_price = result[i].peer_price;
                  res_obj.out_price = result[i].out_price;
                  res_obj.limit_price = result[i].limit_price;
                  res_obj.price_id = result[i].price_id;
                  res_obj.product_id = result[i].product_id;
                  res_obj.status = result[i].status == 1 ? true : false;
                  res_obj.checkdate = false;
                  res_obj.need_second_confirm = result[i].need_second_confirm;
                  res_obj.warning_plan_num = result[i].warning_plan_num;
                  this.bids_list.push(res_obj);
                }
              };
              //  console.log(this.midechecboxIndex, this.bids_list)
              if (this.midechecboxIndex.length > 0) {
                this.midechecboxIndex.forEach((item, index) => {
                  this.bids_list[item].checkdate = true;
                });
                this.midechecboxIndex = []
              }
              if(this.firstEnter) {
                this.firstEnter = false;
                this.bids_list.forEach((item, index) => {
                  if(item.status) {
                    this.bids_list[index].checkdate = true
                    this.showdate.push(item.price_id)
                  }
                });
                this.curr_month = `${this.date.onYear}-${this.date.onMonth}`
                this.showPriceDate()
              }
            } else {
              if (res.data.code === 40004) {
                this.$router.push("/trip")
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
      showNewPriceType(priceId) {
        this.priceTypeDialog = !this.priceTypeDialog;
        this.priceType.name = '';
        this.priceType.peer_price = "0";
        this.priceType.out_price = "0";
        this.priceType.limit_price = "0";
        this.priceType.diff_price = "0";
        this.priceType.week_info = [];
        this.priceType.price_start_date = '';
        this.priceType.price_end_date = '';
        // this.priceType.warning_plan_num = '',
        // this.priceType.need_second_confirm = '0',
        this.priceType.plan_num= '';
        this.priceId = priceId;
        this.priceDetail = true;
        if (priceId != 0) {
          this.priceTypeDetail(priceId);
          this.priceDetail = false;
        }
      },
      doPriceType() {
        let week_info = [];
        this.priceType.week_info.forEach((week) => {
          if (week === "星期一") {
            week_info.push(1);
          } else if (week === '星期二') {
            week_info.push(2);
          } else if (week === '星期三') {
            week_info.push(3);
          } else if (week === '星期四') {
            week_info.push(4)
          } else if (week === '星期五') {
            week_info.push(5)
          } else if (week === '星期六') {
            week_info.push(6)
          } else if (week === '星期日') {
            week_info.push(0)
          };
        });
        if (this.priceType.name.length == 0) {
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
        if (this.priceType.peer_price === '') {
          this.$message({
            message: '结算价不能为空',
            type: 'error'
          });
          return ''
        };
        var reg = new RegExp("^[0-9]+(.[0-9]{1,3})?$");
        if (!reg.test(this.priceType.peer_price)) {
          this.$message({
            message: '结算价请填写正数',
            type: 'error'
          });
          return ''
        }; 
        if (this.priceType.out_price.length == 0) {
          this.$message({
            message: '销售价不能为空',
            type: 'error'
          });
          return ''
        };
        if (!reg.test(this.priceType.out_price)) {
          this.$message({
            message: '销售价请填写正数',
            type: 'error'
          });
          return ''
        }; 
        if (this.priceType.limit_price.length == 0) {
          this.$message({
            message: '最低限价不能为空',
            type: 'error'
          });
          return ''
        };
        if (!reg.test(this.priceType.limit_price)) {
          this.$message({
            message: '最低限价请填写正数',
            type: 'error'
          });
          return ''
        }; 
        // if (this.priceType.diff_price.length == 0) {
        //   this.$message({
        //     message: '单房差不能为空',
        //     type: 'error'
        //   });
        //   return ''
        // };
        // if (!reg.test(this.priceType.diff_price)) {
        //   this.$message({
        //     message: '单房差请填写正数',
        //     type: 'error'
        //   });
        //   return ''
        // }; 
        this.midechecboxIndex = [];
        if (this.bids_list && this.bids_list.length > 0) {
          this.bids_list.forEach((item, index) => {
            if (item.checkdate) {
              this.midechecboxIndex.push(index); 
            };
          });
        };
        let start_time = this.priceType.price_start_date;
        if (start_time) {
          start_time = this.format(this.priceType.price_start_date)
        };
        let end_time = this.priceType.price_end_date;
        if (end_time) {
          end_time = this.format(this.priceType.price_end_date)
        };
        let params = {
          data: {
            product_id: this.product_id,
            price_id: 0,
            name: this.priceType.name,
            peer_price: this.priceType.peer_price,
            out_price: this.priceType.out_price,
            limit_price: this.priceType.limit_price,
            diff_price: this.priceType.diff_price,
            week_info: week_info,
            // price_start_date: start_time,
            // price_end_date: end_time,
            price_date: this.isnewPiliang ? this.price_date : [[start_time, end_time]],
            warning_plan_num: this.priceType.warning_plan_num,
            need_second_confirm: this.priceType.need_second_confirm,
            plan_num: this.priceType.plan_num
          }
        };
        if (!this.priceDetail) {
          params.data.price_id = this.priceId
        };
        let action = doPriceType
        if (this.topMenuConst === 'supplier') {
          action = supplierDoPriceType
        }
        action({
          params: params,
          success: (res) => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.priceTypeDialog = false;
              this.priceTypeList();
              this.showdate.splice(0, 1);
              this.date.onCalendar = [];
              this.createCalendar(this.date.onCalendar);
              this.showdate.push(this.priceId);
              // 有勾选日期显示的
              if(this.checkedId.length != 0){
                if(this.priceId == 0){
                  this.showdate.splice(0, 1);
                  this.showdate = this.checkedId
                  this.curr_month = `${this.date.onYear}-${this.date.onMonth}`
                }
                this.showPriceDate();
              }
              this.isnewPiliang = false;
              if (this.priceId === 0) {
                this.showNewPriceType(0);
              }
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
      priceTypeDetail(priceId) {
        let params = {
          data: {
            product_id: this.product_id,
            price_id: priceId
          }
        };
        let action = priceType
        if (this.topMenuConst === 'supplier') {
          action = supplierPriceType
        }
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
        this.swStatus = true;
        let status = 1;
        if (val) {
          status = "1";
        } else {
          status = "-1";
        }
        setTimeout(() => {
          let params = {
            data: {
              product_id: this.product_id,
              price_id: this.mid_price_id,
              status: status
            }
          };
          let action = changePriceStatus
          if (this.topMenuConst === 'supplier') {
            action = supplierChangePriceStatus
          }
          action({
            params: params,
            success: (res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                // if(status == '1') {
                //   scope.status = true;
                // };
                // if(status == '-1') {
                //   scope.status = false;
                // };
                this.date.onCalendar = [];
                this.createCalendar(this.date.onCalendar);
                // this.curr_month = `${this.date.onYear}-${this.date.onMonth}`
                this.showPriceDate();
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
                scope.status = !val;
              };
              this.swStatus = false;
            },
            showLoading: true
          });
        }, 20)
      },
      showBatchQuo(row, priceId, name) {
        this.batchQuoTmp = row;
        this.batchQuoDialog = !this.batchQuoDialog;
        this.batchQuo.name = '';
        this.batchQuo.week_info = [];
        this.batchQuo.price_start_date = '';
        this.batchQuo.price_end_date = '';
        this.batchQuo.plan_num = '';
        this.batchQuo.need_second_confirm = row.need_second_confirm;
        if (priceId) {
          this.priceId = priceId
        };
        if (name) {
          this.batchQuo.name = name;
        };
        if(row){
          this.batchQuoTmp.need_second_confirm_rd = row.need_second_confirm.toString();
        };
        this.midechecboxIndex = [];
        if (this.bids_list && this.bids_list.length > 0) {
          this.bids_list.forEach((item, index) => {
            if (item.checkdate) {
              this.midechecboxIndex.push(index); 
            };
          });
        };
      },
      doBatchQuotation() {
        let week_info = [];
        this.batchQuo.week_info.forEach((week) => {
          if (week === "星期一") {
            week_info.push(1);
          } else if (week === '星期二') {
            week_info.push(2);
          } else if (week === '星期三') {
            week_info.push(3);
          } else if (week === '星期四') {
            week_info.push(4)
          } else if (week === '星期五') {
            week_info.push(5)
          } else if (week === '星期六') {
            week_info.push(6)
          } else if (week === '星期日') {
            week_info.push(0)
          };
        });
        let start_time = this.batchQuo.price_start_date;
        if (start_time) {
          start_time = this.format(this.batchQuo.price_start_date)
        };
        let end_time = this.batchQuo.price_end_date;
        if (end_time) {
          end_time = this.format(this.batchQuo.price_end_date)
        };
        let params = {
          data: {
            product_id: this.product_id,
            price_id: this.priceId,
            week_info: week_info,
            price_start_date: start_time,
            price_end_date: end_time,
            price_date: this.isPiliang ? this.price_date : [[start_time, end_time]],
            plan_num: this.batchQuo.plan_num,
            need_second_confirm: this.batchQuo.need_second_confirm
          }
        };
        let action = doBatchQuotation
        if (this.topMenuConst === 'supplier') {
          action = supplierDoBatchQuotation
        }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.batchQuoDialog = !this.batchQuoDialog;
              this.priceTypeList();
              if(this.showdate.length > 0) {
                this.showPriceDate();
              };
              this.cancelpiliangshowBatchQuo();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          showLoading: false
        })
      },
      showSetExtraDialog(priceId) {
        this.setExtraDialog = !this.setExtraDialog;
        if (!priceId == 0) {
          this.priceId = priceId;
          this.setExtra();
        };
      },
      setExtra() {
        let params = {
          data: {
            product_id: this.product_id,
            price_id: this.priceId
          }
        };
        let loading = this.$loading({target: '.el-dialog'});
        let action = setExtra
        if (this.topMenuConst === 'supplier') {
          action = supplierSetExtra
        }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              let _this = this;
              let obj_setex = {
                extra_name: [],
                chname: [],
                detail_ids: [],
                is_default: [],
                type: [],
                extra_ids: [],
                plan_num: [],
                plan_num_type: [],
                diff_peer_price: [],
                diff_out_price: [],
                out_operator: [],
                peer_operator: [],
                need_second_confirm: ''
              };
              obj_setex.name = result.name;
              obj_setex.peer_price = result.peer_price;
              obj_setex.out_price = result.out_price;
              obj_setex.limit_price = result.limit_price;
              result.extra_info.forEach((item, index) => {
                obj_setex.extra_name.push(item.extra_name);
                let flag = true;
                item.detail.forEach((ite, idx) => {
                  if(flag) {
                    obj_setex.extra_ids.push(ite.extra_id);
                    flag = false
                  };
                  if(!obj_setex.chname[index]){
                    obj_setex.chname[index] = [];
                  };
                  obj_setex.chname[index].push(ite.name);
                  if(!obj_setex.detail_ids[index]) {
                    obj_setex.detail_ids[index] = [];
                  };
                  obj_setex.detail_ids[index].push(ite.detail_id);
                  if(!obj_setex.is_default[index]){
                    obj_setex.is_default[index] = [];
                  };
                  obj_setex.is_default[index].push(ite.is_default);
                  if(!obj_setex.type[index]) {
                    obj_setex.type[index] = [];
                  };
                  obj_setex.type[index].push(ite.type);
                  if(!obj_setex.plan_num[index]) {
                    obj_setex.plan_num[index] = [];
                  };
                  obj_setex.plan_num[index].push(ite.plan_num);
                  if(!obj_setex.plan_num_type[index]) {
                    obj_setex.plan_num_type[index] = [];
                  };
                  obj_setex.plan_num_type[index].push(ite.plan_num_type);
                  if(!obj_setex.diff_peer_price[index]) {
                    obj_setex.diff_peer_price[index] = [];
                    obj_setex.peer_operator[index] = [];
                  };
                  if(ite.diff_peer_price < 0) {
                    obj_setex.peer_operator[index].push("-");
                    //let peer_price = ite.diff_peer_price.substr(1, ite.diff_peer_price.length);
                    obj_setex.diff_peer_price[index].push(Math.abs(ite.diff_peer_price));
                  } else {
                    obj_setex.peer_operator[index].push("+");
                    obj_setex.diff_peer_price[index].push(ite.diff_peer_price);
                  };
                  if(!obj_setex.diff_out_price[index]) {
                    obj_setex.diff_out_price[index] = [];
                    obj_setex.out_operator[index] = [];
                  };
                  if(ite.diff_out_price < 0) {
                    obj_setex.out_operator[index].push("-");
                    // let out_price = ite.diff_out_price.substr(1, ite.diff_out_price.length);
                    obj_setex.diff_out_price[index].push(Math.abs(ite.diff_out_price));
                  } else {
                    obj_setex.out_operator[index].push("+");
                    obj_setex.diff_out_price[index].push(ite.diff_out_price);
                  };
                });
              });
              obj_setex.extra_info = result.extra_info; // 保存获取extra_info到setExtraInfo中，用于判断每个可变项类型是否是默认的
              obj_setex.need_second_confirm = result.need_second_confirm;
              if(result.need_second_confirm == 1){

              }
              this.setExtraInfo = obj_setex;

            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            };
            if(loading){
              loading.close();
            }
          },
          showLoading: false
        })
      },
      doSetExtra() {
        const {plan_num_type, plan_num} = this.setExtraInfo;
        let params = {
          data: {
            product_id: this.product_id,
            price_id: this.priceId,
            extra_ids: this.setExtraInfo.extra_ids,
            type: this.setExtraInfo.type,
            extra_name: this.setExtraInfo.extra_name,
            name: this.setExtraInfo.chname,
            detail_ids: this.setExtraInfo.detail_ids,
            is_default: this.setExtraInfo.is_default,
            peer_operator: this.setExtraInfo.peer_operator,
            out_operator: this.setExtraInfo.out_operator,
            diff_peer_price: this.setExtraInfo.diff_peer_price,
            diff_out_price: this.setExtraInfo.diff_out_price,
            plan_num_type: this.setExtraInfo.plan_num_type,
            plan_num: this.setExtraInfo.plan_num
          }
        };
        plan_num_type.forEach((item, idx) => {
          // 随总库存是0，避免出现修改独立库存后，变成修改随总库存，然后提交。
          item.forEach((it, i) => {
            if(it == 2){
              plan_num[idx][i] = 0
            }
          })
        })
        let action = doSetExtra
        if (this.topMenuConst === 'supplier') {
          action = supplierDoSetExtra
        }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              this.showSetExtraDialog();
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          },
          showLoading: true
        })
      },
      delextra(index) {
        this.setExtraInfo.extra_info.splice(index, 1); // 用于控制可变项类型列表项个数
        this.setExtraInfo.extra_name.splice(index, 1);
        this.setExtraInfo.chname.splice(index, 1);
        this.setExtraInfo.detail_ids.splice(index, 1);
        this.setExtraInfo.is_default.splice(index, 1);
        this.setExtraInfo.type.splice(index, 1);
        this.setExtraInfo.extra_ids.splice(index, 1);
        this.setExtraInfo.plan_num.splice(index, 1);
        this.setExtraInfo.plan_num_type.splice(index, 1);
        this.setExtraInfo.diff_peer_price.splice(index, 1);
        this.setExtraInfo.diff_out_price.splice(index, 1);
        this.setExtraInfo.out_operator.splice(index, 1);
        this.setExtraInfo.peer_operator.splice(index, 1);
      },
      addextra() {
        this.setExtraInfo.extra_info.push({});  // 用于控制可变项类型列表项个数
        this.setExtraInfo.extra_name.push('');
        this.setExtraInfo.chname.push(['', '']);
        this.setExtraInfo.detail_ids.push([0, 0]);
        this.setExtraInfo.is_default.push([0, 0]);
        this.setExtraInfo.type.push([0, 1]);
        this.setExtraInfo.extra_ids.push(0);
        this.setExtraInfo.plan_num.push([0, 0]);
        if(this.setExtraInfo.need_second_confirm == 1){
          this.setExtraInfo.plan_num_type.push([2, 2]);
        }else{
          this.setExtraInfo.plan_num_type.push([1, 1]);
        }
        this.setExtraInfo.diff_peer_price.push(['0', '0']);
        this.setExtraInfo.diff_out_price.push(['0', '0']);
        this.setExtraInfo.out_operator.push(['+', '+']);
        this.setExtraInfo.peer_operator.push(['+', '+']);
      },
      addchextra(index, idx) {
        let netIdx = idx + 1;
        this.setExtraInfo.chname[index].splice(netIdx, 0,"");
        this.setExtraInfo.detail_ids[index].splice(netIdx, 0, 0);
        this.setExtraInfo.is_default[index].splice(netIdx, 0, 0);
        this.setExtraInfo.type[index].splice(netIdx, 0, 1);
        this.setExtraInfo.plan_num[index].splice(netIdx, 0, 0);
        if(this.setExtraInfo.need_second_confirm == 1){
          this.setExtraInfo.plan_num_type[index].splice(netIdx, 0, 2);
        }else{
          this.setExtraInfo.plan_num_type[index].splice(netIdx, 0, 1);
        }
        this.setExtraInfo.diff_peer_price[index].splice(netIdx, 0, "0");
        this.setExtraInfo.diff_out_price[index].splice(netIdx, 0, "0");
        this.setExtraInfo.out_operator[index].splice(netIdx, 0, '+');
        this.setExtraInfo.peer_operator[index].splice(netIdx, 0, "+");
      },
      delchextra(index, idx) {
        this.setExtraInfo.chname[index].splice(idx, 1);
        this.setExtraInfo.detail_ids[index].splice(idx, 1);
        this.setExtraInfo.is_default[index].splice(idx, 1);
        this.setExtraInfo.type[index].splice(idx, 1);
        this.setExtraInfo.plan_num[index].splice(idx, 1);
        this.setExtraInfo.plan_num_type[index].splice(idx, 1);
        this.setExtraInfo.diff_peer_price[index].splice(idx, 1);
        this.setExtraInfo.diff_out_price[index].splice(idx, 1);
        this.setExtraInfo.out_operator[index].splice(idx, 1);
        this.setExtraInfo.peer_operator[index].splice(idx, 1);
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
            let time = Date.now();
            let nosel = thisTime > time ? false : true
            // 初始化当月日期数据 当天
            if(currentDate===(this.date.onCurrentDate)){
                onCalendar.push({
                  day:i+1,
                  currentDate: currentDate,
                  piliang: false,
                  nosel: nosel
                  // name: '',
                  // id: '',
                  // product_id: '',
                  // price_id: '',
                  // quotation_date: '',
                  // remain_num: '',
                  // plan_num: '',
                  // need_second_confirm: ''
                });
            }else{
              onCalendar.push({
                day:i+1,
                currentDate: currentDate,
                piliang: false,
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
      //判断是否闰年
      isLeap(year) {
        let _year = year;
        if(_year % 4 === 0 && _year % 100 > 0) {
          return true ;
        }
        if(_year % 400 === 0 && _year % 3200 > 0) {
          return true ;
        }
        return false ;
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
      toDouble(i){
        return i<10?'0'+''+i:i;
      },
      prevMonth() {
        this.date.onCalendar = [];
        --this.date.onMonth;
        if(this.date.onMonth < 1){
          this.date.onMonth = 12;
          --this.date.onYear;
          if(this.date.onYear < 1){
             console.log('超过允许的时间范围');
            return false;
          }
        };
        this.createCalendar(this.date.onCalendar);
        this.curr_month = `${this.date.onYear}-${this.date.onMonth}`
        this.showPriceDate();
      },
      nextMonth() {
        this.date.onCalendar=[];
        ++this.date.onMonth;

        if(this.date.onMonth>12){
          this.date.onMonth=1;
          this.date.onYear+=1;
        };
        this.createCalendar(this.date.onCalendar);
        this.curr_month = `${this.date.onYear}-${this.date.onMonth}`
        this.showPriceDate();
      },
      selDay(item) {
        this.planDialog = !this.planDialog;
        if (item) {
          this.warehouse.product_id = item.product_id;
          this.warehouse.id = item.id;
          this.warehouse.price_id = item.price_id;
          this.warehouse.plan_num = item.plan_num;
          this.warehouse.need_second_confirm = item.need_second_confirm.toString();
        };
      },
      updatePlanNum() {
        let params = {
          data: this.warehouse
        };
        let action = updatePlanNum
        if (this.topMenuConst === 'supplier') {
          action = supplierUpdatePlanNum
        }
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
      showPriceDate() {
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
            price_ids: this.showdate,
            curr_month: this.curr_month
          }
        };
        let action = showPriceDate
        if (this.topMenuConst === 'supplier') {
          action = supplierShowPriceDate
        }
        action({
          params,
          success: (res) => {
            if (res.data.code === 0) {
              let result = res.data.data;
              this.date.onCalendar = [];
              this.createCalendar(this.date.onCalendar);
              if(!result || result.length == 0) {
                return false
              };
              // let date = result[0].quotation_date;
              // let dateArr = date.split('-');
              // this.date.onYear = dateArr[0];
              // this.date.onMonth = parseInt(dateArr[1])
              result.forEach((item) => {
                let date = item.quotation_date;
                date = parseInt(date.split('-')[2]);
                this.date.onCalendar.forEach((dt) => {
                  if (dt.day == date) {
                    dt.name = item.name;
                    dt.id = item.id;
                    dt.product_id = item.product_id;
                    dt.price_id = item.price_id;
                    dt.quotation_date = item.quotation_date;
                    dt.remain_num = item.remain_num;
                    dt.plan_num = item.plan_num;
                    dt.need_second_confirm = item.need_second_confirm;
                  };
                });
              });
              // this.date.onCalendar = onCalendar;
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
        // this.bids_list.forEach((item) => {
        //   item.checkdate = false;
        // });
        // this.showdate.splice(0, 1);
        this.bids_list[scope.$index].checkdate = value
        if (value) {
          this.checkedId.push(row.price_id);
          this.date.onCalendar = [];
          this.createCalendar(this.date.onCalendar);
          this.showdate.push(row.price_id);
          this.curr_month = `${this.date.onYear}-${this.date.onMonth}`
          this.showPriceDate();
        } else {
          if (this.checkedId.length > 0) {
            this.checkedId.forEach((item, index) => {
              if(item == row.price_id) {
                this.checkedId.splice(index, 1);
              };
            });
          };
          if(this.showdate.length > 0) {
            this.showdate.forEach((item, index) => {
              if(item == row.price_id) {
                this.showdate.splice(index, 1);
              };
            });
          };
          this.getDate();
          this.date.onCalendar = [];
          this.createCalendar(this.date.onCalendar);
          this.curr_month = `${this.date.onYear}-${this.date.onMonth}`
          this.showPriceDate();
        };
        // if (!value) {
        //   for (let i = 0; i < this.showdate.length; i++) {
        //     if (row.row.price_id == this.showdate[i]) {
        //       this.showdate.splice(i, 1);
        //     };
        //   };
        //   return ''
        // };
        // if (this.showdate.length < 1) {
          
        // };
      },
      delDate(item) {
        this.deldateDialog = !this.deldateDialog;
        this.delpd.product_id = this.product_id;
        this.delpd.price_id = item.price_id;
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
        if (this.topMenuConst === 'supplier') {
          action = supplierDelPriceDate
        }
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
      showPiliang(scope) {
        this.checkedId = [];
        this.showdate = [];
        this.price_date = [];
        this.midechecboxIndex = [];
        if (this.bids_list && this.bids_list.length > 0) {
          this.bids_list.forEach((item, index) => {
            if (item.checkdate) {
              this.midechecboxIndex.push(index);
            };
          });
        };
        this.bids_list.forEach((item) => {
          item.checkdate = false;
        });
        this.isPiliang = true;
        this.changeDate(scope, true);
        this.midScope = scope;
      },
      shownewPiliang() {
        this.checkedId = [];
        this.showdate = [];
        this.price_date = [];
        this.midechecboxIndex = [];
        this.bids_list.forEach((item) => {
          item.checkdate = false;
        });
        this.isnewPiliang = true;
        this.date.onCalendar = [];
        this.createCalendar(this.date.onCalendar);
        this.showPriceDate();
      },
      dayPiliang(item, index) {
        let time = Date.now();
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
        this.showNewPriceType(0)
      },
      cancelpiliangshowBatchQuo() {
        this.isPiliang = false;
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
    .extra-form {
      .el-form-item {
        margin: 0;
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
        b {
          color: #b10c79
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
          &:last-child  {
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
    };
    .textcen {
      text-align: center
    }
    .day-close-in {
      display: none;
    }
  }
  .yj{
    width: 60px;
  }
  .yj-txt{
    margin-left: 5px;
    color: #aaa;
  }
  .day-2qr{
    font-size: 12px;
    color: #aaa;
    padding: 0 10px;
  }
  .piliang-wrap {
    padding: 15px 0 0;
    font-size: 0;
    text-align: right;
  }
  .piliang-pd {
    padding: 0 5px;
  }
</style>
