<template>
  <div class="wrapper">
    <div class="package">
      <el-form ref="packageForm" :model="packageForm" label-width="130px">
        <el-form-item label="酒店名称">
          {{ packageForm.hotel_name }}
        </el-form-item>
        <el-form-item label="房型名称">
          {{ packageForm.room_name }}
        </el-form-item>
        <el-form-item label="产品来源">
          {{ packageForm.supplier }}
        </el-form-item>
        <el-form-item label="套餐名称">
          {{ packageForm.rate_name }}
        </el-form-item>
        <el-form-item label="早餐">
          {{ packageForm.breakfast_type | getBreakfastTypeStr }}
        </el-form-item>
        <el-form-item v-if="showBreakfastAmount" label="部分含早人数">
          {{ packageForm.amount }}
        </el-form-item>
        <el-form-item label="接单方式">
          二次确认
        </el-form-item>
        <!-- <el-form-item label="最少提前预订时间">
          提前{{ packageForm.days }}天{{ packageForm.hours }}时 前定当日房
        </el-form-item>
        <el-form-item label="订单确认开始时间">
          {{ packageForm.service_start_time }}
        </el-form-item>
        <el-form-item label="订单确认结束时间">
          {{ packageForm.service_end_time }}
        </el-form-item> -->
        <el-form-item label="预订说明">
          {{ packageForm.book_notice }}
        </el-form-item>
        <el-form-item label="取消规则">
          {{ packageForm.cancel_type_name }}
        </el-form-item>
        <el-form-item label="产品报价">
          <calendar-quotation>
            <div class="quote" v-for="(q, d) in packageForm.package_list" :key="d" :slot="d">
              <p class="quote-item"><span class="lbl">成本价：</span><span class="prc">￥{{ q.cost_price }}</span></p>
              <p class="quote-item"><span class="lbl">结算价：</span><span class="prc">￥{{ q.price }}</span></p>
              <p class="quote-item"><span class="lbl">销售价：</span><span class="prc">￥{{ q.sale_price }}</span></p>
              <p class="quote-item"><span class="lbl">挂牌价：</span><span class="prc">￥{{ q.market_price }}</span></p>
              <p class="quote-item"><span class="lbl">库存：</span><span class="prc">{{ q.stock }}</span></p>
            </div>
          </calendar-quotation>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleBackPage">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSelfSupportRoomPackageDetailAsyncRequest } from 'src/api/hotel';
import SelectSupplier from 'src/plugins/SelectSupplier.vue';
import CalendarQuotation from './components/CalendarQuotation.vue';
import * as format from "src/utils/format";

export default {
  data(){
    return {
      packageForm: {
        id: null,
        hotel_id: null,
        room_id: null,
        supplier: null,
        supplier_name: '',
        rate_name: '',
        breakfast_type: null,
        amount: 0,
        days: '',
        hours: '',
        service_start_time: '',
        service_end_time: '',
        book_notice: null,
        package_list: {},
        cancel_charge: null,
        cancel_charge_type: null,
        cancel_type: null,
        cancel_type_name: null
      }
    }
  },
  filters:{
    getBreakfastTypeStr(type){
      let str = '';
      switch(type){
        case 0:
          str = '不含早';
          break;
        case 1:
          str = '单早';
          break;
        case 2:
          str = '双早';
          break;
        case -2:
          str = '付费早餐';
          break;
        case -3:
          str = '不确定';
          break;
        case 3:
          str = '部分含早';
          break;
        case -1:
          str = '含早但不确定份数';
          break;
      }
      return str;
    },
    getCancelTypeStr(type){
      let str = '';
      switch(type){
        case 0:
          str = '不可取消';
          break;
        case 1:
          str = '可取消';
          break;
      }
      return str;
    },
    getCancelChargeStr(type){
      let str = '';
      switch(type){
        case 1:
          str = '按首晚价格百分比扣除';
          break;
        case 2:
          str = '按订单总价百分比扣除';
          break;
        case 3:
          str = '按具体金额扣除';
          break;
      }
      return str;
    }
  },
  computed:{
    showBreakfastAmount(){
      if(this.packageForm.breakfast_type == 3){
        return true
      }else{
        this.packageForm.amount = 1;
        return false
      }
    },
  },
  watch:{
    
  },
  components:{
    SelectSupplier,
    CalendarQuotation
  },
  methods: {
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
            for(let i in this.packageForm){
              this.packageForm[i] = data[i];
            }
            this.$set(this.packageForm, 'package_list', data['price_list']);
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    handleBackPage(){
      this.$router.back();
    }
  },
  mounted(){
    let { hotelName, roomName, hotelId, roomId, id } = this.$route.query;

    if(!hotelName && !roomName && !hotelId && !roomId){
      this.$router.replace({ name: 'SingleproHotelRoom' });
      return;
    }
    
    this.packageForm.hotel_name = hotelName;
    this.packageForm.room_name = roomName;

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
  width: 200px;
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
</style>
