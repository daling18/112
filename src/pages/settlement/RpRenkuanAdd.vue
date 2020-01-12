<template>
  <div class="wrapper">
    <!-- system-search -->
    <div class="system-search">
      <div class="search-item">
        <div class="label">订单编号</div>
        <el-input v-model="searchInput.order_no" placeholder="订单编号"/>
      </div>
      <div class="search-item">
        <div class="label">应收款ID</div>
        <el-input v-model="searchInput.bill_id" placeholder="应收款ID"/>
      </div>
      <div class="search-item">
        <div class="label">团号</div>
        <el-input v-model="searchInput.tuan_no" placeholder="团号"/>
      </div>
      <div class="search-item">
        <div class="label">应收金额</div>
        <el-input v-model="searchInput.rmb_total_amount" placeholder="应收金额"/>
      </div>
      <div class="search-item search-button">
        <el-button type="primary" @click="handleSearch">立即搜索</el-button>
      </div>
    </div>
    <!-- /system-search -->
    <div class="system-content">
      <div class="content-title">
        <table class="total"><tr>
          <td>未认款金额 <span class="color-orange">￥{{ retainTotalAmount }}</span></td>
          <td>审批的认款金额 <span class="color-orange">￥{{ applyingAmount }}</span></td>
          <td width="330">
            币种汇率 
            <currency-picker v-model="currency" placeholder="选择货币" readonly="readonly" style="width: 150px"/> 
            <el-input 
              style="width: 100px; vertical-align: top;" 
              placeholder="汇率" 
              @focus="oldCurrencyRate = currencyRate"
              :value="currencyRate" 
              @input="handleRateInput" 
              @blur="handleRateBlur"
            />
          </td>
          <td>本次总认款金额 <span class="color-green">￥{{ totalAmountStr }}</span></td>
        </tr></table>
      </div>
      <div class="content-list">
        <div class="list">
          <el-table :data="tableData" border class="el-table--middle" style="width: 100%">
            <el-table-column prop="order_no" label="订单编号" align="center" width="190">
              <template slot-scope="scope">
                <div class="color-purple">{{ scope.row.order_no }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="item_no" label="应收款ID" align="center" width="100">
              <template slot-scope="scope">
                <div class="color-purple">{{ scope.row.bill_id }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="tuan_name" label="团号/名称" align="center" min-width="220">
              <template slot-scope="scope">
                <p class="ellipsis" :title="scope.row.tuan_no">{{ scope.row.tuan_no }}</p>
                <p class="ellipsis color-gray" :title="scope.row.tuan_name">{{ scope.row.tuan_name }}</p>
              </template>
            </el-table-column>
            <el-table-column label="应收金额" header-align="center" align="right" width="100">
              <template slot-scope="scope">￥{{ scope.row.rmb_total_amount }}</template>
            </el-table-column>
            <el-table-column label="剩余应收" header-align="center" align="right" width="100">
              <template slot-scope="scope">
                <span class="color-orange">￥{{ scope.row.remain_receipt_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="认款金额(本位币)" header-align="center" align="right" width="100">
              <template slot-scope="scope">￥{{ scope.row.local_price || '0' }}</template>
            </el-table-column>
            <el-table-column label="认款金额" width="100" align="left">
              <template slot-scope="scope">
                <input 
                  :class="{'el-input__inner': true, 'is-error': scope.row.isError}" 
                  style="text-align: right" 
                  placeholder="0"
                  @focus="oldPrice = scope.row.price"
                  @blur="handlePriceBlur(scope.row, $event)"
                  :value="scope.row.price" 
                  @input="handlePriceInput(scope.row, $event)">
              </template>
            </el-table-column>
            <el-table-column :render-header="selectionHeaderRender" align="center" width="110">
              <template slot-scope="scope">
                <el-checkbox @input="handleToggleSelection(scope.row, $event)" :value="!!scope.row.checked" />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="submit-buttons">
          <el-button type="primary" @click="handleRecognition">保存</el-button>
          <a class="el-button el-button--default" href="javascript: history.go(-1)">取消</a>
          <!-- <router-link v-if="$route.meta.isFinace" class="el-button el-button--default" :to="{path: '/recieve-detail', query: {parent_id: $route.query.id, id: $route.query.pay_id}}">取消</router-link>
          <router-link v-else-if="$route.meta.isPlan" class="el-button el-button--default" :to="{path: '/control/recieve-detail', query: {parent_id: $route.query.id, id: $route.query.pay_id}}">取消</router-link> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { saleBeforeAddRenkuanList, saleRenkuanAdd, beforeAddRenkuanList, renkuanAdd } from 'src/api/tuan';
import * as format from 'src/utils/format';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
export default {
  name: 'SalePeerRecognition',
  components: {
    CurrencyPicker
  },
  data() {
    return {
      totalPage: 1,
      pageShow: false,
      searchInput: {
        // payment_id: this.$route.query.pay_id || '',
        // rmb_total_amount: '',
        // bill_id: '',
        // order_no: '',
        // tuan_no: ''
      },
      searchData: {
        id: this.$route.query.id || '',
        pay_id: this.$route.query.pay_id || '',
        payment_id: this.$route.query.pay_id || '',
        rmb_total_amount: this.$route.query.rmb_total_amount || '',
        bill_id: this.$route.query.bill_id || '',
        order_no: this.$route.query.order_no || '',
        tuan_no: this.$route.query.tuan_no || ''
      },
      tableData: [],
      retainTotalAmount: 0,
      totalAmount: 0,
      currency: '人民币',
      currencyRate: 1,
      applyingAmount: 0,
      oldCurrencyRate: false, // 修改汇率时保存原汇率，默认：false, 修改时更新，失去焦距时还原为false
      checkAll: false,
      oldPrice: false         // 修改认款时保存原认款金额，默认：false, 修改时更新，失去焦距时还原为false
    };
  },
  computed: {
    totalAmountStr: function(){
      return Number(format.toFixed(this.totalAmount, 3));
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(isSearch) {
      if (isSearch) {
        this.searchData = {... this.searchInput};
        // this.searchData.page = 1;
      } else {
        this.searchInput = {... this.searchData};
      }
      // this.searchData.page_size = 10;

      beforeAddRenkuanList({
        params: {data: this.searchData},
        success: (params) => {
          let data = params.data;

          if (data.code == '0' && data.data) {
            this.tableData = data.data.list;
            this.totalPage = data.data.total_page;
            this.retainTotalAmount = parseFloat(data.data.unclaimed_amount) || 0;
            this.applyingAmount = parseFloat(data.data.applying_amount) || 0;
            this.pageShow = this.totalPage > 0;

          } else {
            this.$message.error(data.msg);
          }
        },
        showLoading: true
      });
    },
    selectionHeaderRender(h, data){
      let me = this;
      
      return h('el-checkbox', {
        on: {
          input(checked){
            let currencyRate = parseFloat(me.currencyRate) || 0;
            let totalAmount = 0, prices = [], localPrices = [];

            if(!currencyRate){
              return me.$message.error('请先填写汇率');
            }

            if(Array.isArray(me.tableData)){
              me.tableData.forEach(row => {
                let price = (parseFloat(row.remain_receipt_amount) / currencyRate) || 0;
                let localPrice = price * currencyRate;

                prices.push(price);
                localPrices.push(localPrice);
                totalAmount += localPrice;
              });
              // console.log('totalAmount: ', totalAmount, 'prices: ', prices);
              if(me.retainTotalAmount < totalAmount + me.applyingAmount){
                return me.$message.error('本次总认款金额不可超过未认款金额 - 待核实(销)认款金额');
              }
              me.tableData.forEach((row, key) => {
                if(checked){
                  me.updateRecogRecord(row, prices[key], localPrices[key]);
                }else{
                  me.updateRecogRecord(row, 0, 0);
                }
              });
              me.totalAmount = checked ? totalAmount : 0;
            }
            me.checkAll = checked;
          }
        },
        props: {
          value: me.checkAll,
        }
      }, '全额认款');
    },
    // 更新认款记录
    // @param {object} row  认款记录
    // @param {number | false} price  认款金额, false: 不更新金额
    // @param {number} localPrice  认款金额(本位币)
    // @return {boolean} 进款金额是否大于剩余应收
    updateRecogRecord(row, price, localPrice){
      let isError = false;

      if(localPrice > row.remain_receipt_amount){
        isError = true;
        // this.$message.error('认款金额(本位币)不可超过该笔订单的剩余应收！');
      }
      if(price !== false){
        this.$set(row, 'price', price ? Number(format.toFixed(price, 3)) : '');
      }
      this.$set(row, 'local_price', Number(format.toFixed(localPrice, 3)));
      this.$set(row, 'checked', localPrice == row.remain_receipt_amount);
      this.$set(row, 'isError', isError);

      return isError;
    },
    handleSearch(){
      this.getList(true);
      this.$router.replace({query: this.searchData});
    },
    handleRateInput(val){
      val = val.trim();
      // console.log('old:', this.oldCurrencyRate, 'price', this.currencyRate);
      
      if(!/^(\d+(\.\d*)?)?$/.test(val)){
        this.$message.error('非法的汇率格式，汇率必须是数值');
      }
      this.currencyRate = val;
    },
    // 汇率输入框失去焦距时，重新计算认款金额和总认款金额。新的认款金额如果大于未认款金额时由用户觉得是否更新汇率
    handleRateBlur(){
      let currencyRate = parseFloat(this.currencyRate) || 0;
      let oldCurrencyRate = parseFloat(this.oldCurrencyRate) || 0;
      
      if(currencyRate == oldCurrencyRate 
          || !/^(\d+(\.\d*)?)?$/.test(this.currencyRate) 
          || !Array.isArray(this.tableData)){

        this.currencyRate = this.oldCurrencyRate;
        this.oldCurrencyRate = false;
        return true;
      }
      const moreRetainTotalAmountConfirmMsg = '输入的汇率计算得到的总认款金额大于未认款金额，更新将会清空当前已输入认款金额，是否更新汇率？';
      let localPrices = [], totalAmount = 0, hadMoreRemainReceiptAmount = false;

      this.tableData.forEach((row, key) => {
        let localPrice = (parseFloat(row.price) || 0) * currencyRate;

        totalAmount += localPrice;
        localPrices.push(localPrice);
      });

      if(totalAmount > this.retainTotalAmount){
        this.$confirm(moreRetainTotalAmountConfirmMsg, '提示', {
          confirmButtonText: '更新',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.currencyRate = Number(format.toFixed(currencyRate, 4));
          this.tableData.forEach((row, key) => {
            this.updateRecogRecord(row, 0, 0);
          });
          this.totalAmount = 0;
          this.oldCurrencyRate = false;
        }).catch(() => {
          this.currencyRate = this.oldCurrencyRate;
          this.oldCurrencyRate = false;
        });
      }else{
        this.currencyRate = Number(format.toFixed(currencyRate, 4));
        this.tableData.forEach((row, key) => {
          if(this.updateRecogRecord(row, false, localPrices[key])){
            hadMoreRemainReceiptAmount = true;
          }
        });
        if(hadMoreRemainReceiptAmount){
          this.$message.error('认款金额(本位币)不可超过该笔订单的剩余应收！');
        }
        this.totalAmount = totalAmount;
        this.oldCurrencyRate = false;
      }
      // console.log('new local price:', localPrices);
      // console.log('new local price totalAmount:', totalAmount);
    },
    handlePriceInput(row, e){
      const val = e.target.value.trim();
      //console.log('old:', this.oldPrice, 'price', row.price);

      if(!/^(\d+(\.\d*)?)?$/.test(val)){
        this.$message.error('非法的认款金额格式，认款金额必须是数值');
      }

      this.$set(row, 'price', val);
    },
    // 输入认款金额输入框失去焦距后判断新的总认款是否超过未认款金额，超过则恢复原来的认款金额
    handlePriceBlur(row, e){
      const price = parseFloat(row.price) || 0;
      const currencyRate = parseFloat(this.currencyRate) || 0;
      //const input = e.target;
      let totalAmount = this.totalAmount - (parseFloat(row.local_price) || 0);
      let localPrice = price * currencyRate;
      let isError = false;

      if(!/^(\d+(\.\d*)?)?$/.test(row.price) || price == parseFloat(this.oldPrice || 0)){
        this.$set(row, 'price', this.oldPrice);
        this.oldPrice = false;
        return true;
      }
      totalAmount += localPrice;
      if(this.retainTotalAmount < totalAmount + this.applyingAmount){
        this.$set(row, 'price', this.oldPrice);
        this.$message.error('本次总认款金额不可超过未认款金额 - 待核实(销)认款金额');
      }else{
        if(this.updateRecogRecord(row, price, localPrice)){
          this.$message.error('认款金额(本位币)不可超过该笔订单的剩余应收！');
        }
        this.totalAmount = totalAmount;
      }
      this.oldPrice = false;
    },
    handleToggleSelection(row, checked){
      // console.log('toggle selection: ', checked);
      const currencyRate = parseFloat(this.currencyRate) || 0;
      let price = 0, localPrice = 0;
      let totalAmount = this.totalAmount - (parseFloat(row.local_price) || 0);

      if(!currencyRate){
        return this.$message.error('请先填写汇率');
      }
      if(checked){
        price = (parseFloat(row.remain_receipt_amount) || 0) / currencyRate;
        localPrice = price * currencyRate;
  
        totalAmount += localPrice;
        if(this.retainTotalAmount < totalAmount + this.applyingAmount){
          return this.$message.error('本次总认款金额不可超过未认款金额 - 待核实(销)认款金额');
        }
      }
      this.updateRecogRecord(row, price, localPrice);
      this.totalAmount = totalAmount;
    },
    handleRecognition(){
      let data = [], hadError = false;;
      const {pay_id, id} = this.$route.query;

      this.tableData.forEach(item => {
        if(item.price && parseFloat(item.price)){
          data.push({bill_id: item.bill_id, amount: item.price});
        }
        if(item.isError){
          hadError = true;
        }
      });
      if(hadError){
        return this.$message.error('认款金额(本位币)不可超过该笔订单的剩余应收！');
      }
      if(data.length){
        renkuanAdd({
          params: {data: {
            payment_id: pay_id,
            currency: this.currency,
            currency_rate: this.currencyRate,
            renkuan_data: data
          }},
          success: (params) => {
            let data = params.data;

            if (data.code == '0') {
              this.$message.success('认款成功');
              this.$router.go(-1);
            } else {
              this.$message.error(data.msg);
            }
          },
          showLoading: true
        });
      }else{
        this.$message.error('请填写认款金额');
      }
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  background: #fff;
  padding: 20px 0;
  height: 30px;
  text-align: center;
}
.is-error{
  border-color: #ff4949;
}
</style>
