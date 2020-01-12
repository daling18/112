// src/components/plan/control/recruiting.vue
<template>
  <div id="pdf-wrap">
    <div class="order-header" v-if="tuanInfo">
      <div class="header-title">
        <span class="color-purple">【{{ tuanInfo.tuan_no }}】</span>
        {{ tuanInfo.tuan_name }}
        <el-tag v-if="tuanInfo.line_type_name">{{ tuanInfo.line_type_name }}</el-tag>
      </div>
      <div class="header-content">
        <label class="color-gray">出发城市</label>{{ tuanInfo.departure_city }}<br>
        <label class="color-gray">出发日期</label><span class="w265">{{ tuanInfo.departure_date }}</span>
        <label class="color-gray">返回日期</label>{{ tuanInfo.back_date }}
      </div>
    </div>
    <div class="recruiting" v-show="step=='tourist-list'">
      <div class="gird">
        <div class="filter no-print">
          <el-form :inline="true" class="filter-form">
            <!-- <el-form-item>
              <el-select v-model="filter.order_from" placeholder="请选择来源" @change="handleFilterTourist">
                <el-option v-for="(item,index) in selectFrom" :key="index" :label="item" :value="index.toString()"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-select v-model="searchData.card_type" placeholder="请选择证件类型" @change="handleFilterTourist('card_type', $event)">
                <el-option v-for="item in CARD_TYPE_LIST" :key="item" :label="item" :value="item"/>
                <!-- <el-option label="身份证" value="身份证"></el-option>
                <el-option label="因私护照" value="因私护照"></el-option>
                <el-option label="军官证" value="军官证"></el-option>
                <el-option label="港澳通行证" value="港澳通行证"></el-option>
                <el-option label="台胞证" value="台胞证"></el-option>
                <el-option label="回乡证" value="回乡证"></el-option>
                <el-option label="户口簿" value="户口簿"></el-option>
                <el-option label="出生证明" value="出生证明"></el-option>
                <el-option label="台湾通行证" value="台湾通行证"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchData.cancel_status" placeholder="退团状态" @change="handleFilterTourist('cancel_status', $event)">
                <el-option label="不限" value=""/>
                <el-option label="退团成功" value="1"/>
                <el-option label="非退团成功" value="2"/>
                <el-option label="已挪团" value="3"/>
              </el-select>
            </el-form-item>
          </el-form>
          <a class="color-purple" v-if="canMoveTuan" href="javascript:;" @click="handleSelectMoveTuan">{{ showMove ? '选择目标团' : '挪团' }}</a>
          <a class="color-purple" v-if="showMove" href="javascript:;" @click="showMove = false">取消</a>
          <a :href="printName" class="el-button el-button--primary fr" v-if="tuanInfo && tuanInfo.is_self === 1">打印名单</a>
        </div>
        <div class="cont">
          <el-table
            ref="touristTable"
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              v-if="showMove"
              align="center"
              type="selection"
              :selectable="touristSelectable"
              width="55"/>
            <el-table-column type="index" align="center" label="序号"/>
            <el-table-column
              header-align="center"
              label="姓名"
              align="left"
              min-width="130">
              <template slot-scope="scope">
                {{ scope.row.username }}
                <el-tag type="primary" v-if="scope.row.cancel_status == -1">已挪团</el-tag>
                <router-link
                  v-if="scope.row.cancel_status > 0"
                  :class="CANCEL_STATUS_COLOR_MAP[scope.row.cancel_status]"
                  :to="getTuituanUrl(scope.row)"
                >
                  [{{ CANCEL_STATUS_MAP[scope.row.cancel_status] }}]
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="订单编号"
              prop="order_no"
              width="220"
            />
            <el-table-column
              header-align="center"
              align="left"
              width="230"
              label="证件信息">
              <template slot-scope="scope">
                <div class="ellipsis">
                  <el-tag color="#b9b8fc">{{ scope.row.identity_type }}</el-tag>
                  {{ scope.row.identity_no }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="mobile"
              width="120"
              label="联系方式"/>
            <el-table-column
              header-align="center"
              align="left"
              prop="remark"
              label="备注信息"/>
          </el-table>
        </div>
      </div>
      <div class="page" v-show="searchData.page_count > 1">
        <el-pagination
          layout="prev, pager, next"
          @current-change="currentPageChange"
          :current-page="searchData.page"
          :page-count="searchData.page_count"
        />
      </div>
    </div>
    <div class="setting-form" v-show="step=='setting-form'">
      <div class="module-title">设置应收已收</div>
      <el-table :data="settingData" border style="width: 100%">
        <el-table-column
          header-align="center"
          label="游客"
          prop="username"
          align="center"
          width="90"/>
        <el-table-column align="center" label="原团游客所在订单">
          <el-table-column align="center" width="135" label="原团订单编号">
            <template slot-scope="scope">
              <div class="ellipsis" :title="scope.row.order_no">{{ scope.row.order_no }}</div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="right" label="原应收" prop="rmb_total_amount" />
          <el-table-column align="center" width="120" label="应收扣减">
            <template slot-scope="scope">
              <input-number  v-model="scope.row.free_total" @blur="handleSettingChange('free_total', scope.row)">
                <span slot="prepend">-</span>
              </input-number>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="right" label="挪后应收" prop="end_rmb_total_amount" />
          <el-table-column header-align="center" align="right" label="已收" prop="rmb_receipted_amount" />
          <el-table-column align="center" width="120" label="已收扣减">
            <template slot-scope="scope">
              <input-number  v-model="scope.row.free_receipted" @blur="handleSettingChange('free_receipted', scope.row)">
                <span slot="prepend">-</span>
              </input-number>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="right" prop="end_rmb_receipted_amount" label="挪后已收"/>
        </el-table-column>
        <el-table-column align="center" :label="'目标团 ' + selectTuanInfo.tuan_no">
          <el-table-column
            header-align="center"
            align="right"
            width="170"
            prop="new_rmb_total_amount"
            label="新订单应收"
          />
          <el-table-column
            header-align="center"
            align="right"
            width="170"
            label="新订单已收"
          >
            <template slot-scope="scope">
              {{ scope.row.free_receipted || 0 }}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="submit-buttons">
        <el-button type="primary" @click="handleSubmitForm">保存</el-button>
        <el-button @click="handleBack">返回</el-button>
      </div>
    </div>

    <!--选择可预订团期弹窗-->
    <el-dialog
      title="选择目标团"
      :visible.sync="showSelectTuan"
      :close-on-click-modal="false"
    >
      <div class="system-search">
        <div class="search-item">
          <div class="label">团号</div>
          <el-input v-model="tuanSearch.tuan_no" placeholder="输入团号"/>
        </div>
        <div class="search-item">
          <div class="label">行程名称</div>
          <el-input v-model="tuanSearch.tuan_name" placeholder="输入行程名称"/>
        </div>
        <div class="search-item">
          <div class="label">出发日期</div>
          <el-date-picker 
            v-model="tuanSearch.departure_date" 
            type="date" 
            placeholder="团队出发日期"
          />
        </div>
        <div class="search-item search-button">
          <el-button type="primary" @click="handleGetTuanList">立即搜索</el-button>
        </div>
      </div>
      <div class="radio-list" v-loading="loadingTuan">
        <div class="mb10" v-for="(tuan, idx) in tuanList" :key="idx">
          <el-radio class="radio" v-model="selectTuan" :label="tuan.id" @click.native="selectTuanInfo=tuan">
            <div class="ellipsis tuan-name" :title="tuan.tuan_no + ' ' + tuan.tuan_name">
              {{ tuan.tuan_no }} {{ tuan.tuan_name }}
              <div class="ellipsis tuan-info" :title="tuan.need_second_confirm ? '二次确认' : ('余位' + tuan.remain_num)">
                <span class="color-gray">{{ tuan.departure_date }}出发</span>
                <span v-if="!tuan.need_second_confirm" :class="tuan.enough ? 'color-green' : 'color-red'">余位{{ tuan.remain_num }}</span>
                <el-tag v-else type="primary">二次确认</el-tag>
              </div>
            </div>
          </el-radio>
        </div>
        <div class="mb10 tac" v-show="tuanList.length == 0 && !loadingTuan">无匹配团</div>
      </div>
      <div slot="footer" class="textcen">
        <el-button @click="handleCreateOrder" type="primary">创建订单</el-button>
        <el-button @click="showSelectTuan=false">取消</el-button>
      </div>
    </el-dialog>

    <!--选择可预订团期弹窗-->
    <el-dialog
      title="选择要扣减的收款"
      :visible.sync="showSelectPayment"
      :close-on-click-modal="false"
      size="tiny"
    >
      <div class="radio-list">
        <div class="mb10" v-for="(payment, idx) in paymentList" :key="idx">
          <el-radio
            class="radio"
            :disabled="selectPaymentTourist['free_receipted'] > payment.fact_rmb_total_amount"
            v-model="selectPaymentTourist.payment_detail_id"
            :label="payment.payment_detail_id"
          >
            <div class="ellipsis payment-name" :title="'认款金额￥' + payment.renkuan_amount + ' 收款ID' + payment.payment_id + '|￥' + payment.fact_rmb_total_amount">
              认款金额￥{{ payment.renkuan_amount }} 收款ID{{ payment.payment_id }}|￥{{ payment.fact_rmb_total_amount }}
            </div>
          </el-radio>
        </div>
      </div>
      <div slot="footer" class="textcen">
        <el-button @click="handleSelectPayment('submit')" type="primary">确定</el-button>
        <el-button @click="handleSelectPayment('')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { date as formatDate } from 'src/utils/format';
import { getTouristLists, getSaleTouristLists } from 'src/api/api';
import { selectTuan, createOrder, doCreateOrder, selectPaymentLists } from 'src/api/movetuan';
import{
  expTouristList
} from 'src/api/tuan';
import InputNumber from 'src/plugins/InputNumber.vue';
import * as format from 'src/utils/format';

export default {
  components: {
    InputNumber
  },
  filters: {
    formatPrice: format.formatPrice
  },
  data() {
    return {
      CANCEL_STATUS_COLOR_MAP: {
        1: '',
        2: '',
        3: 'color-green',
        4: 'color-red'
      },
      CANCEL_STATUS_MAP: {
        '-1': '[已挪团]',
        1: '[待定损]',
        2: '[已定损，待确认]',
        3: '[退团成功]',
        4: '[退团失败]'
      },
      CARD_TYPE_LIST: [],
      tuanInfo: null,
      productType: 0,
      searchData: {
        card_type: '不限',
        cancel_status: '',
        page_count: 0,
        page: 1
      },
      tableData: [],
      step: 'tourist-list', // setting-form 设置应收已收
      showMove: false,
      showSelectTuan: false,
      tuanSearch: {
        tuan_id: 0,
        tourist_ids: [],
        tuan_no: '',
        tuan_name: '',
        departure_date: ''
      },
      selectTuan: 0,
      tuanList: [],
      loadingTuan: false,
      settingData: [],
      selectTuanInfo: {},
      showSelectPayment: false,
      paymentList: [],
      selectPaymentTourist: ''
    };
  },
  computed:{
    topMenuConst() {
      return this.$route.meta.topMenuConst;
    },
    tuituanPath() {
      switch(this.topMenuConst) {
      // case 'sale':
      //   return '/sale/order/tuituanDetail';
      case 'finance':
        return '/fcontrol/tuituan-detail';
      case 'operator':
      default:
        return '/control/tuituan-detail';
      }
    },
    printName() {
      const { order_from, card_type } = this.$route.query;

      if(this.tuanInfo){
        return '/bom/api/tuan/export_tourist_lists?id='+ this.tuanInfo.a_id + '&order_from=' + order_from + '&card_type=' + card_type;
      }
    },
    canMoveTuan() {
      const isOperator = this.topMenuConst == 'operator'
      const isSelf = this.tuanInfo && this.tuanInfo.is_self === 1
      let isNotLock = isSelf && this.tuanInfo.lock_status === 0 // 是否未锁团
      isNotLock = isNotLock && this.tuanInfo.lock_fund === 0 // 是否未锁账
      
      return isOperator && this.tableData.length && this.productType == 1 && isNotLock
    }
  },
  watch:{
    '$route.query': function() {
      this.getTouristList();
    }
  },
  mounted(){
    this.getTouristList();
  },
  methods:{
    currentPageChange(val) {
      const page = this.$route.query.page || 1;
      if(page != val){
        this.handleFilterTourist('page', val);
      }
    },
    getTouristList(){
      const { query, params } = this.$route;
      let getTouristListsFunc = getTouristLists;

      if(this.$route.meta && this.$route.meta.isSale){
        getTouristListsFunc = getSaleTouristLists;
      }

      getTouristListsFunc({
        params: {
          data: {
            id: params.id,
            data_config_type: params.type,
            // order_from: query.order_from || '',
            card_type: query.card_type || '',
            cancel_status: query.cancel_status || '',
            page: query.page || 1,
          }
        },
        success: (params) => {
          let { code, msg, data } = params['data'];
          this.loading = false;
          if(code == 0){
            // this.selectFrom = data.order_from_lists;
            this.CARD_TYPE_LIST = data.card_type_lists;
            this.CANCEL_STATUS_MAP = data.cancel_status_list;
            this.tableData = data.tourist_lists.data || [];
            this.tuanInfo = data.tuan_info;
            this.productType = data.product_type;
            this.searchData.page = parseInt(data.tourist_lists.page_index, 10);
            this.searchData.page_count = parseInt(data.tourist_lists.total_page, 10);
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    getTuituanUrl(tourist){
      return { path: this.tuituanPath, query: {ono: tourist.order_no, tid: this.tuanInfo.id}}
    },
    touristSelectable(row, index){
      console.log('touristSelectable', row, row.is_allow_move)
      return (row.cancel_status == 0 || row.cancel_status == 4) && row.is_allow_move;
    },
    handleFilterTourist(name, value) {
      let query = {... this.$route.query};

      query['page'] = 1;
      query[name] = value;
      this.$router.replace({query: query});
    },
    handleSelectMoveTuan(){
      if(this.showMove){
        if(this.tuanSearch.tourist_ids.length == 0){
          return this.$message.error('请选择游客');
        }

        this.showSelectTuan = true;
        this.tuanSearch.tuan_id = this.tableData[0].tuan_id;
        this.tuanSearch.tuan_no = '';
        this.tuanSearch.tuan_name = '';
        this.tuanSearch.departure_date = '';
        this.handleGetTuanList();
      } else {
        this.showMove = true;
        this.$refs.touristTable.clearSelection();
      }
    },
    handleSelectionChange(selections){
      console.log('section: ', selections);
      this.tuanSearch.tourist_ids = selections.map(item => item.id);
    },
    handleGetTuanList(){
      let params = { ... this.tuanSearch };
      let touristNum = params.tourist_ids.length;

      if(params.departure_date && params.departure_date.getTime){
        params.departure_date = formatDate(params.departure_date);
      }
      
      this.loadingTuan = true;
      this.selectTuan = 0;
      selectTuan({
        params: {data: params},
        success: (params) => {
          let { code, msg, data } = params['data'];

          this.loadingTuan = false;
          if(code == 0){
            data.forEach(item => {
              item.enough = (item.remain_num - touristNum) > 3;
            });
            this.tuanList = data;
          }else{
            this.$message.error(msg);
          }
        }
      });
    },
    handleCreateOrder(){
      // console.log('handle create order');
      if(this.selectTuan){
        let params = { 
          tuan_id: this.tuanSearch.tuan_id, 
          tourist_ids: this.tuanSearch.tourist_ids,
          select_tuan_id: this.selectTuan
        };

        createOrder({
          params: {data: params},
          success: (params) => {
            let { code, msg, data } = params['data'];

            if(code == 0){
              this.step = 'setting-form';
              this.showSelectTuan = false;
              data.tourist_lists.forEach(item => {
                item.free_total = 0;
                item.free_receipted = 0;
                item.payment_detail_id = 0;

              });
              this.settingData = data.tourist_lists
              // this.selectTuanInfo = data.select_tuan_info;
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        })
      }else{
        this.$message.error('请选择目标团');
      }
    },
    handleSettingChange(name, rowData){
      let value = rowData[name];
      // console.log('value: ', value);
      if(value && value < 0) {
        rowData[name] = 0;
        return this.$message.error('请输入大于等于0的数值');
      }
      if(name == 'free_total'){
        if(rowData['rmb_total_amount'] < value){
          rowData[name] = rowData['rmb_total_amount'];
          rowData['end_rmb_total_amount'] = 0;
        }else{
          rowData['end_rmb_total_amount'] = rowData['rmb_total_amount'] - value;
        }
      } else if(name == 'free_receipted'){
        if(rowData['rmb_receipted_amount'] < value){
          rowData[name] = rowData['rmb_receipted_amount'];
          rowData['end_rmb_receipted_amount'] = 0;
          rowData['new_rmb_receipted_amount'] = 0;
        }else{
          rowData['end_rmb_receipted_amount'] = rowData['rmb_receipted_amount'] - value;
          rowData['new_rmb_receipted_amount'] = rowData['end_rmb_receipted_amount'];
        }
        rowData['payment_detail_id'] = 0;
        if(rowData[name]){
          selectPaymentLists({
            params: {data: { order_no: rowData['order_no']}},
            success: (res) => {
              if(res.data.code == 0){
                let data = res.data.data;
                if(data.length > 1){
                  this.paymentList = res.data.data;
                  // this.touristRecord = rowData;
                  this.paymentList.some(item => {
                    if(item.fact_rmb_total_amount >= rowData[name]){
                      rowData['payment_detail_id'] = item.payment_detail_id;
                      return true;
                    }
                    return false;
                  })
                  this.handleSelectPayment('show', rowData);
                }else{
                  if(data[0] && data[0].fact_rmb_total_amount >= rowData[name]){
                    rowData['payment_detail_id'] = data[0]['payment_detail_id'];
                  } else {
                    rowData[name] = 0;
                    rowData['end_rmb_receipted_amount'] = rowData['rmb_receipted_amount'];
                    rowData['new_rmb_receipted_amount'] = rowData['rmb_receipted_amount'];
                    this.$message.error('无匹配的收款项');
                  }
                }
              }else{
                this.$message.error(res.data.msg);
              }
            }
          })
        }
      }
    },
    handleSelectPayment(type, data){
      switch(type){
      case 'show':
        if(this.selectPaymentTourist){
          this.selectPaymentTourist['payment_detail_id'] = 0;
        }
        this.selectPaymentTourist = data;
        this.showSelectPayment = true;
        break;
      // case 'select':
      //   this.selectPaymentTourist['payment_detail_id'] = data;
      //   break;
      case 'submit':
        if(this.selectPaymentTourist && !this.selectPaymentTourist['payment_detail_id']){
          return this.$message.error('请选择收款项');
        }
        this.selectPaymentTourist = '';
        this.showSelectPayment = false;
        break;
      default:
        if(this.selectPaymentTourist){
          this.selectPaymentTourist['payment_detail_id'] = 0;
          this.selectPaymentTourist['free_receipted'] = 0;
          this.selectPaymentTourist['end_rmb_receipted_amount'] = this.selectPaymentTourist['rmb_receipted_amount'];
          this.selectPaymentTourist['new_rmb_receipted_amount'] = this.selectPaymentTourist['rmb_receipted_amount'];
          this.selectPaymentTourist = '';
        }
        this.showSelectPayment = false;
      }
    },
    handleSubmitForm() {
      console.log('submit form');
      if(this.showSelectPayment){
        console.log('show select payment')
        return;
      }
      let params = { 
        tuan_id: this.tuanSearch.tuan_id, 
        // tourist_lists: this.settingData,
        select_tuan_id: this.selectTuan
      };
      params.tourist_lists = this.settingData.map((item) => ({
        id: item.id,
        ded_rmb_total_amount: item.free_total,
        payment_detail_id: item.payment_detail_id,
        ded_rmb_receipted_amount: item.free_receipted,
      }))
      doCreateOrder({
        params: {data: params},
        success: (params) => {
          let { code, msg, data } = params['data'];

          if(code == 0){
            console.log('挪团成功');
            this.$router.push({path: '../../orders', query: {id: this.selectTuanInfo.a_id, lock_status: 0}});
            // this.step = 'setting-form';
            // this.showSelectTuan = false;
            // data.tourist_lists.forEach(item => {
            //   item.free_total = '';
            //   item.free_receipted = '';

            // });
            // this.settingData = data.tourist_lists
            // this.selectTuanInfo = data.select_tuan_info;
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      })
    },
    handleBack(){
      if (this.step = 'setting-form') {
        this.step = 'tourist-list';
        this.showMove = false;
      } else {
        this.$router.go(-1)
      }
    }
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

.gird{
  background-color: #fff;
  padding: 20px 15px;
  .cont{
    padding: 15px 0;
  }
}
@media print {
  .no-print {
      display: none;
  }
}
.recruiting{
  .filter-form{
    display: inline-block;
    vertical-align: middle;
  }
  .el-form-item{
    margin-bottom: 0;
  }
}
.ellipsis{
  height: auto;
}
.radio-list {
  width: 100%;
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  .el-radio.radio{
    width: 100%;
  }
  .el-radio__label > .ellipsis {
    display: inline-block !important;
    max-width: 100%;
    position: relative;
    vertical-align: middle;
    box-sizing: border-box;
  }
}
.tuan-name {
  padding-right: 200px;
}
.tuan-info {
  position: absolute;
  right: 25px;
  top: 0;
  width: 170px;
}
.payment-name {
  padding-right: 25px;
}
.system-search{
  padding: 0;
  border-bottom: 1px solid #eee;
}
.setting-form{
  padding: 15px;
  background-color: #fff;
}
.module-title {
  padding-left: 10px;
  margin: 20px 0 25px;
  font-size: 18px;
  color: #b10c79;
  border-left: 5px solid #c10c79;
  line-height: 18px;
}
.submit-buttons{
  padding: 30px 0 20px;
}
</style>
