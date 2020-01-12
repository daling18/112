<template>
  <div class="wrapper">
    <div class="system-tab">
      <ul class="tab-box">
        <router-link class="on" to="" tag="li">
          保险下单
        </router-link>
      </ul>
    </div>
    <div class="content-left fl bg-white">
      <div class="settle-section plr15">
        <div class="module-title">基本信息</div>
      </div>
      <div class="module-content">
        <div class="field-item">
          <div class="field-labels">产品名称：{{ detail.productname }}</div>
          <div class="field-labels">保险类型：{{ detail.producttypename }}</div>
        </div>
        <div class="field-item">
          <div class="field-label"><span class="color-red">* </span>保险方案：</div>
          <div class="field-content">
            <el-radio-group v-model="productplans" @change="plansChange">
              <el-radio v-for="(item, $index) in detail.plan_list" :label="$index" :key="$index">{{ item.plan_name }}</el-radio>
            </el-radio-group>
          </div>
          <div>
            <a class="field-label showDetailBtn" @click="dialogVisible = true">保障内容</a>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label"><span class="color-red">* </span>产品生效日期：</div>
          <div class="field-content">
            <el-date-picker v-model="begin_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label"><span class="color-red">* </span>产品截止日期：</div>
          <div class="field-content">
            <el-date-picker v-model="end_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"/>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label">旅游线路：</div>
          <div class="field-content">
            <el-input v-model="trival_line"></el-input>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label">旅游团编号：</div>
          <div class="field-content">
             <el-input v-model="trival_no"></el-input>
          </div>
        </div>
        <div class="field-item">
          <div class="field-label">被保人数：</div>
          <div class="field-content">
            {{peopleNum}}
            <!-- <input-number
              controls
              v-model="peopleNum"
              :min="1"
              :max="999999999"
              @input="handleCalcPriceDetailPrice(item, $event)"
            /> -->
          </div>
        </div>
      </div>
      <div class="tourist-section plr15">
        <div class="module-title clear">被保人信息
          <div class="fr export-excel-section">
            <a href="/bom/downloads/被保人信息模板.xlsx" target="_blank">模板下载</a>
            <el-upload
              style="display:inline-block; margin-left:10px;"
              action="/bom/api/Insurance/importExcel"
              :data="uploadData"
              name="file"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :show-file-list="false">
              <el-button type="primary">批量上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="module-content">
          <div class="tourist-item" v-for="(tourist, idx) in touristList" :key="tourist.id">
            <line-tourist-form
              :tourist="tourist"
              :card-type-map="CARD_TYPE"
              @group-change="handleCalcTouristDetail" />
            <div class="tourist-no">{{ idx + 1 }}</div>
            <div class="opt-btns">
              <a class="add-btn" href="javascript:;" @click="handleAddTourist()" />
              <a class="sub-btn" href="javascript:;" v-if="touristList[1]" @click="handleDelTourist(idx)" />
            </div>
          </div>
        </div>
      </div>
      <div class="content-left fl bg-white">
        <div class="settle-section plr15">
          <div class="module-title">发票</div>
        </div>
        <div class="field-item">
          <div class="field-label" style="width: 195px;"><span class="color-red">* </span>是否需要提供发票</div>
          <div class="field-content">
            <el-radio-group v-model="is_invoice">
              <el-radio label="0">不要</el-radio>
              <el-radio label="1">要</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div v-show="is_invoice != 0">
          <div class="field-item">
            <div class="field-item">
              <el-radio-group v-model="type_id">
                <el-radio label="0">选择纸质发票</el-radio>
                <el-radio label="1">选择电子发票</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="field-item">
            <div class="field-content">
              <el-form :model="form" label-width="140px">
                <el-form-item label="发票抬头">
                  <el-input v-model="title" placeholder="个人/企业"/>
                </el-form-item>
                <el-form-item label="发票税号">
                  <el-input v-model="tax"/>
                </el-form-item>
                <el-form-item label="请输入邮寄地址：" required v-show="type_id == '0'">
                  <!-- <el-select class="nation-select fl" v-model="form.nation" auto-complete="off">
                    <el-option label="中国" value="中国"/>
                  </el-select> -->
                  <select-area class="area-select fl" value-key="area_name" v-model="area" clearable />
                  <el-input v-model="areas" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="联系人电话："  v-show="type_id == '0'" required>
                  <el-input v-model="mobile" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="电子邮箱：" required  v-show="type_id == '1'">
                  <el-input v-model="email" auto-complete="off"/>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right fl">
      <div class="price-title">
        <div class="module-title">产品及服务提供商</div>
      </div>
      <div class="price-list bg-white">
        <div class="price-item">
          <b class="color-orange">{{detail.icompanyname}}</b>
        </div>
        <div class="price-item">
          <b class="color-orange">销售总价</b>
          <div class="color-orange">投保产品：</div>
          <div class="color-orange" v-if="detail.productplans">
            {{detail.productname}}
            {{detail.productplans[productplans].planname}}
          </div>
          <div class="content-right">
            {{peopleNum}}成人 ✖️ {{price.toFixed(2)}}元
          </div>
        </div>
        <div class="price-item">
          <b class="color-orange">应付总额：</b>
          <span>¥ {{(peopleNum * price).toFixed(2)}}</span>
        </div>
        <div class="primarys">
          <el-button type="primary primarys" @click="createOrder">确定付款</el-button>
        </div>
        <div class="price-item">
        </div>
      </div>
      <!-- <div class="add-price-btn tac bg-white color-purple" v-if="!isStore" @click="handleAddPriceDetail()">+ 添加价格明细</div> -->
    </div>
    <div class="content-left fl bg-white">
      <el-button type="primary primarys" @click="createOrder">确定付款</el-button>
    </div>
    <!-- 保障内容 -->
    <el-dialog title="保障内容" :visible.sync="dialogVisible" :size="'medium'">
      <div class="bids-wrap">
        <el-table
          :data="activeItem.list"
          :span-method="objectSpanMethodDomestic"
          border
          style="width: 100%; line-height: 20px;"
          max-height="500"
          >
          <el-table-column
            prop="content"
            label="保障内容"
            >
          </el-table-column>
          <el-table-column
            prop="describe"
            label="保险责任简述"
            >
          </el-table-column>
          <el-table-column
            prop="money"
            :label="activeItem.name"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="remark">
        <p>备注：	</p>
        <p>1、可当日投保当日起保</p>
    		<p>2、被保险人年龄：出生满30天到85周岁（含）。</p>
        <p>3、同一投保人为同一被保险人投保，仅限在其同一旅行期间内投保该保险产品其中一款产品一份，不得投保多份；若投保多款产品或投保同一款产品多份的，被保险人仅能享受其中保障最高的一款产品的一份保险保障。</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {createOrderNew, countPriceNew, payInsuranceOrderNew} from 'src/api/api'
  import * as format from 'src/utils/format';
  import{
    queryInsuranceProductDetailNew
  } from 'src/api/insurance.js';
  import SelectArea from 'src/plugins/SelectArea.vue'
  import LineTouristForm from 'src/components/components/LineTouristForms.vue';
  import InputNumber from 'src/plugins/InputNumber.vue';

  export default {
    components: {
      LineTouristForm,
      SelectArea,
      InputNumber
    },
    data () {
      return {
        title: "",
        tax: "",
        dialogVisible: false,
        is_invoice: '0',
        type_id: '0',
        peopleNum: 0,
        orderInfo: {},
        feetype: 0,
        form: {},
        areas: '',
        mobile: '',
        trival_line: '',
        trival_no: '',
        email: '',
        detail: {},
        productplans: 0,
        begin_time: '',
        price: 0,
        end_time: '',
        touristList: [
        ],
        CARD_TYPE: {
          '01': '居民身份证',
          '02': '军官证',
          '03': '护照',
          '04': '居民户口簿',
          '05': '士兵证',
          '06': '学生证',
          '07': '驾驶证',
          '08': '军官退休证',
          '09': '外国人居留证',
          '10': '警官证',
          '11': '其他',
        },
        activeNow: 1,
        activeItem: {
          list: [],
          name: ''
        },
      }
    },
    watch: {
      productplans () {
        this.CountPrice()
      },
      begin_time () {
        this.CountPrice()
      },
      end_time () {
        this.CountPrice()
      },
    },
    computed: {
      uploadData () {
        return {
          quantity: this.peopleNum
        }
      },
      area: {
        get () {
          return {
            area_0: this.form.province,
            area_1: this.form.city,
            area_2: this.form.country
          }
        },
        set (val) {
          if (val) {
            this.form.province = val.area_0 || ''
            this.form.city = val.area_1 || ''
            this.form.country = val.area_2 || ''
          } else {
            this.form.province = ''
            this.form.city = ''
            this.form.country = ''
          }
        }
      },
    },
    mounted(){
      this.getInfo()
      this.handleAddTourist()
    },
    methods:{
      plansChange (index) {
        this.activeItem.list = this.detail.plan_list[index].security_content.list
        this.activeItem.name = this.detail.plan_list[index].plan_name
      },
      CountPrice () {
        if (!this.begin_time) {
          this.$message({
            type: 'info',
            message: '请填写产品生效日期'
          });
          return
        } else {
           if(new Date(format.date(this.begin_time)).getTime()<new Date(format.date(new Date())).getTime()){
            this.$message({
              type: 'info',
              message: '起始日期不能早于当前日期'
            });
            return
          }
        }
        if (!this.end_time) {
          this.$message({
            type: 'info',
            message: '请填写产品截止日期'
          });
          return
        } else {
          if(new Date(format.date(this.end_time)).getTime()<new Date(format.date(new Date())).getTime()){
            this.$message({
              type: 'info',
              message: '截止日期不能早于当前日期'
            });
            return
          }
        }
        // this.loadingInstance = Loading.service();
        let params = {
          data: {
            id: this.$route.query.id,
            start_time: this.begin_time ? format.date(this.begin_time) : '',
            end_time: this.end_time ? format.date(this.end_time) : '',
            jt_plan_id: this.detail.plan_list[this.productplans].jt_plan_id
          }
        }
        countPriceNew({
          params: params,
          success: (data) => {
            if (data.data.code == 0) {
              this.price = data.data.data.insurancefee - 0
              this.feetype = data.data.data.feetype - 0
            } else {
              this.$message({
                type: 'info',
                message: data.data.msg
              });
            }
          }
        })
      },
      createOrder () {
        let showIs = false

        this.touristList.forEach(item => {
          if (!item.username || !item.card_num || !item.birthday) {
            showIs = true
          }else{
            item.birthday = format.date(item.birthday)
          }
        })

        if (!this.begin_time) {
          this.$message({
            type: 'info',
            message: '请填写产品生效日期'
          });
          return
        } else {
          if(new Date(format.date(this.begin_time)).getTime()<new Date(format.date(new Date())).getTime()){
            this.$message({
              type: 'info',
              message: '起始日期不能早于当前日期'
            });
            return
          }
        }
        if (!this.end_time) {
          this.$message({
            type: 'info',
            message: '请填写产品截止日期'
          });
          return
        } else {
          if(new Date(format.date(this.end_time)).getTime()<new Date(format.date(new Date())).getTime()){
            this.$message({
              type: 'info',
              message: '截止日期不能早于当前日期'
            });
            return
          }
        }
        // if (!this.trival_line) {
        //   this.$message({
        //     type: 'info',
        //     message: '请填写旅游线路'
        //   });
        //   return
        // }
        // if (!this.trival_no) {
        //   this.$message({
        //     type: 'info',
        //     message: '请填写旅游团编号'
        //   });
        //   return
        // }
        if (showIs) {
          this.$message({
            type: 'info',
            message: '请填写被保人信息'
          });
          return
        }
         if (this.is_invoice == '1') {
          if (this.type_id == '1') {
            if (!this.email) {
              this.$message({
                type: 'info',
                message: '请填写Email'
              });
              return
            }
          } else {
            if (!this.mobile) {
              this.$message({
                type: 'info',
                message: '请填写联系人电话'
              });
              return
            } else if (!(this.form.city && this.form.country && this.areas&& this.form.province)) {
              this.$message({
                type: 'info',
                message: '请填写邮寄地址'
              });
              return
            }
            if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
              this.$message({
                type: 'info',
                message: '手机号码有误，请重填'
              });
              return
            }
          }
        }
        let params = {
          data: {
            insurance_id: this.detail.id,
            jt_plan_id: this.detail.plan_list[this.productplans].jt_plan_id,
            plan_name: this.detail.plan_list[this.productplans].plan_name,
            begin_time: this.begin_time ? format.date(this.begin_time) : '',
            end_time: this.end_time ? format.date(this.end_time) : '',
            trival_line: this.trival_line,
            trival_no: this.trival_no,
            insured_list: this.touristList,
            is_invoice: this.is_invoice,
            type_id: this.type_id,
            title: this.title,
            tax: this.tax,
            email: this.email,
            province: this.form.province,
            city: this.form.city,
            area: this.form.country,
            address_detail:this.areas,
            phone: this.mobile,
          }
        }
        console.log(JSON.stringify(params))
        createOrderNew({
          params: params,
          success: (res) => {
            let { code, data, msg } = res.data
            if (code == '0') {
              payInsuranceOrderNew({
                params: {
                  data: {
                    orderId: data.order_no,
                    amount: data.amount,
                    returnUrl: `https://bpm.yktour.com.cn/bom/#/saleorder/insurance/order-details/?order_no=${data.order_no}`,
                    platform: '1',
                    customParams: data.customParams
                  }
                },
                success: params => {
                  let data = params.data;
                  if (data.code == "0") {
                    let div = document.createElement("div");
                    div.innerHTML = data.data.form;
                    div.hidden = true;
                    document.body.appendChild(div);
                    div.getElementsByTagName("form")[0].submit();
                  } else {
                    this.$message.error(data.msg);
                  }
                },
                showLoading: true
              });
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      },
      changeActive(index) {
        this.activeNow = index;
      },
      getInitTourist() {
        let id = 1;
        const touristLen = this.touristList.length;
        const tourist = LineTouristForm.getInitTourist();
        if(touristLen > 0){
          id = parseInt(this.touristList[touristLen - 1].id) + 1;
        }
        tourist.id = id;
        // tourist.group = this.getInitGroup();
        return tourist;
      },
      // 添加人数
      handleAddTourist () {
        this.peopleNum++
        const tourist = this.getInitTourist();
        console.log(this.touristList)
        this.addTourist(tourist)
      },
      addTourist(tourist) {
        let touristDetail = '';
        let detailIndex = -1;
        const compareFun = (item, idx) => {
          if(tourist && item.id == detail.id){
            touristDetail = item;
            detailIndex = idx;
            return true;
          }
        };
        this.touristList.push(tourist);
      },
      // 添加人数
      handleDelTourist (idx) {
        this.peopleNum--
        const tourist = this.touristList.splice(idx, 1)[0];
        const id = tourist.group.map(it => `${it.extra_id}.${it.id}`).join('_');
        let touristDetail = '';
        let detailIndex = -1;
        let compareFun = (item, idx) => {
          if(tourist && item.id == id){
            touristDetail = item;
            detailIndex = idx;
            return true;
          }
        };
        this.priceDetailList.forEach((item) => {
          if(item.tourist_ids.length > 0){
            let newIds = item.tourist_ids.filter(id => id != tourist.id);
            // console.log('new ids: ', newIds, item.tourist_ids)
            if(newIds.length < item.tourist_ids.length){
              item.tourist_ids = newIds;
              this.handleCalcPriceDetailPrice(item);
            }
          }
        })
      },
      handleBeforeUpload () {
        this.showLoadings(true)
      },
      handleUploadSuccess(resp, file) {
        // this.loadingInstance.close()
        let touristList = [];
        if (resp.code == 0 && resp.data) {
          this.$confirm('导入操作会覆盖已经填写的信息，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let id = 1;
              const { data } = resp.data;
              // const touristLen = this.touristList.length;
              this.touristList = []
              const initTourist = LineTouristForm.getInitTourist();

              // if(touristLen > 0){
              //   id = parseInt(this.touristList[touristLen - 1].id) + 1;
              // }

              console.log(initTourist)
              this.peopleNum = data.length
              if (Array.isArray(data)) {
                data.forEach(item => {
                  let tourist = { ...initTourist, ...item, id: id}
                  this.addTourist(tourist)
                  ++id;
                })
              }
              this.$message.success('导入成功');
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消导入'
              });
            });
        }else{
          this.$message.error(resp.msg);
        }
        this.showLoadings(false)
      },
      showLoadings(bool) {
        const loading = this.$loading({ fullscreen: true })
        // loading 为单例对象
        if (!bool) {
          loading.close();
        }
      },
      handleCalcTouristDetail () {},
      handleUploadError () {
         this.showLoadings(false)
      },
      getInfo() {
        let params = {
          data: {
            id: this.$route.query.id || ''
          }
        }
        queryInsuranceProductDetailNew({
          params: params,
          success: (data) => {
            if (data.data.code == '0') {
              this.detail = data.data.data;
            } else {
              this.$message.error(data.data.msg);
            }
          },
          showLoading: true
        });
      },
      objectSpanMethodDomestic({ row, column, rowIndex, columnIndex }) {
          // ElementUi v1.3.4暂时不支持
      },
      objectSpanMethodForeign({ row, column, rowIndex, columnIndex }) {
          // ElementUi v1.3.4暂时不支持
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-radio-group .el-radio {
    margin-left: 15px;
    padding: 10px 0;
  }
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
  .content-left{
    width: 63.65%;
    overflow: hidden;
  }
  .content-right{
    width: 36.35%;
    padding-left: 10px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .module-title {
    padding-left: 10px;
    font-size: 18px;
    color: #b10c79;
    border-left: 5px solid #c10c79;
    line-height: 18px;
  }
  .export-excel-section{
    margin-top: -7px;
    font-size: 14px;
  }
  .bg-white{
    background: #fff;
  }
  .plr15{
    padding: 0 15px;
  }
  .field-item{
    display: flex;
    padding: 5px;
    .showDetailBtn {
      text-align: left;
      color: #b10c79;
      cursor: pointer;
    }
  }
  .field-labels{
    width: 50%;
    text-align: center;
    color: #999;
    margin-right: 15px;
    line-height: 35px;
  }
  .field-label{
    width: 140px;
    text-align: right;
    color: #999;
    margin-right: 15px;
    line-height: 35px;
  }
  .field-content{
    width: 350px;
    align-self: center;
    line-height: 1.5;
  }
  .el-select{
    width: 100%;
  }

  .settle-section{
    .module-title{
      margin: 35px 0 25px;
    }
  }
  .tourist-section{
    .module-title{
      margin: 25px 0;
    }
    .tourist-item{
      border: 1px dashed #ccc;
      padding: 11px 0;
      position: relative;
      margin-bottom: 15px;
      .tourist-form{
        width: 555px;
      }
    }
    .tourist-no{
      width: 30px;
      height: 30px;
      position: absolute;
      top: 16px;
      left: 10px;
      background-color: #ccc;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;
      color: #fff;
      font-size: 16px;
      overflow: hidden;
    }
    .opt-btns{
      position: absolute;
      top: 22px;
      right: 10px;
    }
  }
  .submit-section{
    border-top: 10px solid #e4e4e4;
    .font24{
      font-size: 24px;
    }
    .total{
      background: #fbf3f8;
      text-align: center;
      padding: 25px 0 20px;
    }
    .submit-buttons{
      padding: 30px 0 38px;
    }
  }
  .price-title{
    background: #f4f4f4;
    padding: 15px 10px 12px;
  }
  .price-list{
    padding: 0 10px;
    .price-item{
      word-break: break-all;
      padding: 12px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom: none;
      }
    }
  }
  .add-price-btn{
    margin-top: 10px;
    padding: 17px;
    font-size: 16px;
    cursor: pointer;
  }
  .form-content {

    .el-form {
      .el-input, .el-select {
        width: 90%;
      }
      .w-30 {
        width: 30%;
      }
      .nation-select{
        width: 21.9%;
        margin-right: 0.3%;
      }
      .area-select {
        width: 68%;
        overflow: hidden;
        height: 36px;
      }
      .el-form-item {
        margin-bottom: 12px;
      }
      .mb5 {
        margin-bottom: 5px;
      }
    }
    .seal-uploader {
      line-height: 1.5;
      padding: 5px 0;
    }
    .seal-pic {
      position: relative;
      display: inline-block;
      vertical-align: bottom;
      margin-right: 10px;
      overflow: hidden;
      width: 100px;
      height: 100px;
      background-size: cover;
      background-position: 50%;
      .el-icon-close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 6px;
        background-color: rgba(0,0,0,.8);
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .primarys{
    margin: 20px auto;
    display: block;
  }
</style>
