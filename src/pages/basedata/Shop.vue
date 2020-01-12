<template>
  <div class="wrapper">
      <div class="cont">
          <el-form class="formBox" ref="form" :model="form" label-width="100px">
            <h2>营业部信息</h2>
            <el-form-item label="组织名称">
                <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称" required>
                <el-input v-model="form.shop_name	"></el-input>
                <p class="tip">店铺名称会展示在营业部店铺小程序内供客户查看</p>
            </el-form-item>
            <el-form-item label="客服电话" required>
                <el-input v-model="form.contract_mobile	"></el-input>
            </el-form-item>
            <el-form-item label="营业时间" required>
                <!-- <el-time-select
                  placeholder="开始时间"
                  v-model="startTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:01',
                    end: '23:59'
                  }">
                </el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="endTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:01',
                    end: '23:59',
                    minTime: startTime
                  }">
                </el-time-select> -->
                <el-time-picker
                  is-range
                  v-model="busHours"
                  format="HH:mm"
                  value-format="HH:mm"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  >
                </el-time-picker>

            </el-form-item>
            <el-form-item label="所在经纬度" required>
              <el-input class="width30" v-model="form.longitude" auto-complete="off"/>
              - 
              <el-input class="width30" v-model="form.latitude" auto-complete="off"/>
              <a class="color-purple" href="javascript:;" @click="showBaiduMap=!showBaiduMap">选择经纬度</a>
            </el-form-item>
            <baidu-map v-model="mapPoint" class="mb5" v-show="showBaiduMap" />
            <h2>结算信息</h2>
            <el-form-item label="开户名" required>
                <el-input v-model="form.account_name"></el-input>
            </el-form-item>
            <el-form-item label="银行" required>
                <el-input v-model="form.bank_name"></el-input>
            </el-form-item>
            <el-form-item label="卡号" required>
                <el-input v-model="form.bank_code"></el-input>
            </el-form-item>
            <el-button type="primary" size="medium" class="subBtn" @click="handleSetShopMsg">保存</el-button>
        </el-form>
      </div>
  </div>
</template>
<script>

import BaiduMap from './components/BaiduMap';
import { getShopMsg, saveShopMsg } from 'src/api/shop';
import {dateFormat} from 'src/utils/format';

export default {
  components: {
    BaiduMap
  },
  data () {
    return {
      busHours:['08:30', '20:00'], // 营业时间
      form: {
        name: '',
        shop_name: '',
        contract_mobile: '',
        business_hours: '',
        longitude: '',
        latitude: '',
        account_name: '',
        bank_name: '',
        bank_code: '',
        address:''
      },
      showBaiduMap: false,
      hours: "",

    }
  },
  computed: {
      startTime () {
        return this.busHours[0];
      },
      endTime(){
        return this.busHours[1]
      },
      mapPoint: {
      get () {
        if (!this.showBaiduMap) {
          // 设置非0初始值，避免展开时标记点不在中心位置
          return {lng: 0, lat: 1, address: ''}
        }
        return {
          lng: this.form.longitude,
          lat: this.form.latitude,
          address: this.form.address
        }
      },
      set (val) {
        if (!this.showBaiduMap) {
          return
        }
        if (val) {
          this.form.longitude = val.lng || 0
          this.form.latitude = val.lat || 0
          this.form.address = val.address;
        } else {
          this.form.longitude = 0
          this.form.latitude = 0
        }
      }
    },
  },
  methods: {
    async _handleGetShopMessage(){
      try {
        const { data } = await getShopMsg({data: {}}, true)
        if(data.code == 0){
          this.form = data.data;
          this.form.longitude = this.form.longitude == 0.000000 ? "":this.form.longitude;
          this.form.latitude = this.form.latitude == 0.000000 ? "":this.form.latitude;
          this.form.address = '';
          this.busHours = this.form.business_hours.split('-');

        }else{
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    async _handleSetShopMessage(){
      try {
        const { data } = await saveShopMsg({data: this.form}, true)
        if(data.code == 0){
          console.log(data);
          this.$message({
            type: 'success',
            message: data.msg
          })
        }else{
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      }
      catch(err) {
        console.log(err)
      }
    },

    handleSetShopMsg(){

      if(!this.form.name){
        this.$message({
          type: 'error',
          message: "组织名称有误"
        })
        return false;
      }
      if(!this.form.shop_name){
        this.$message({
          type: 'error',
          message: "店铺名称有误"
        })
        return false;
      }
      if(!this.form.contract_mobile){
        this.$message({
          type: 'error',
          message: "客服电话有误"
        })
        return false;
      }
      if(!this.startTime || !this.endTime){
        this.$message({
          type: 'error',
          message: "营业时间有误"
        })
        return false;
      }
      if(!this.form.longitude || !this.form.latitude){
        this.$message({
          type: 'error',
          message: "经纬度选择有误"
        })
        return false;
      }
      if(!this.form.account_name){
        this.$message({
          type: 'error',
          message: "开户名名称设置有误"
        })
        return false;
      }
      if(!this.form.bank_name){
        this.$message({
          type: 'error',
          message: "银行名称输入有误"
        })
        return false;
      }
      if(!this.form.bank_code){
        this.$message({
          type: 'error',
          message: "银行卡号输入有误"
        })
        return false;
      }
      
      // this.form.business_hours = [this.startTime, this.endTime].join('-');
      this.form.business_hours = this.busHours.join('-')
      this._handleSetShopMessage();
    } 
  },
  mounted() {
    this._handleGetShopMessage();
  },
}
</script>
<style lang="less" scoped>
    .cont {
        background: #fff;
        padding: 40px;
        .formBox {
            h2 {
                margin: 10px 0 20px;
            }
            .el-input {
                max-width: 300px;
            }
            .width30 {
                width: 100px;
            }
            .mb5 {
                width: 100%;
                height: 400px;
            }
        }
    }
    .tip {
        color: #ccc;
    }
    .subBtn {
      display: block;
      margin: 50px auto 0;
    }
</style>
