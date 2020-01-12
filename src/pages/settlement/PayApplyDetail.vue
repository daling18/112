<!--D:\files\repo\bom\application\index\view\dev\src\components\plan\applied\appliedDetail.vue-->
<template>
  <div class="recieve-info">
    <div class="top-btn-wrap clearfix" v-if="applied.status === 3">
      <!-- 待处理出现按钮操作 -->
      <el-button @click="cancel" class="btn">取消</el-button>
      <el-button @click="openDig" type='primary' class="btn">线下付款登记</el-button>
      <router-link class="el-button btn el-button--primary" :to="{path: 'online', query: {id: applied.id}}">在线转账付款</router-link>
    </div>
    <h2 class="recieve-tit">请款信息</h2>
    <div class="receive-content">
      <div class="content-box">
        <span class="content-label">总请款金额</span>
        <span v-if="applied && applied.applied_amount" class="content-right">
          <span class="color-orange">{{applied.applied_amount}}</span>
          <span v-if="applied.status === 4" class="color-green">[{{applied.status_str}}]</span>
          <span v-else-if="applied.status === 2" class="color-red">[{{applied.status_str}}]</span>
          <span v-else class="color-red">[{{applied.status_str}}]</span>
        </span>
        <span v-else class="content-right">--</span>
      </div>
      <div class="content-box">
        <span class="content-label">请款单ID</span>
        <span v-if="applied && applied.id" class="content-right">{{applied.id}}</span>
        <span v-else class="content-right">--</span>
      </div>
      <div class="content-box">
        <span class="content-label">对方单位名称</span>
        <span v-if="applied && applied.settlement_org_name" class="content-right">{{applied.settlement_org_name}}</span>
        <span v-else class="content-right">--</span>
      </div>
      <div class="content-box">
        <span class="content-label">开户行／账号</span>
        <span v-if="applied && applied.bank_name" class="content-right">{{applied.bank_name}} / {{applied.bank_number}}</span>
        <span v-else class="content-right">--</span>
      </div>
    </div>
    <h2 class="recieve-tit">应付</h2>
    <div class="receive-content">
      <div class="hide-wrap" v-for="(item, key) in detail" :key="key">
        <div @click="showDetail(key)" class="hide-btn">
          <div class="hide-inner" :class="item.show ? 'show' : '' ">
            {{item.show ? '收起' : '展开'}}
          </div>
        </div>
        <div :class="item.show ? '' : 'hide-action'">
          <div class="content-box">
            <span class="content-label">成本ID</span>
            <span v-if="item.id" class="content-right">
              {{item.id}}
              <el-tag v-if="item.amount_str === '未付清'" type="danger">{{item.amount_str}}</el-tag>
              <el-tag v-else type="success">{{item.amount_str}}</el-tag>
            </span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">应付</span>
            <span v-if="item.rmb_total_amount" class="content-right">{{item.rmb_total_amount}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div v-if="item.amount_str === '未付清'" class="content-box">
            <span class="content-label">未付</span>
            <span v-if="item.no_pay_total_amount" class="content-right">{{item.no_pay_total_amount}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div v-else class="content-box">
            <span class="content-label">本次付款</span>
            <span v-if="item.fact_rmb_total_amount" class="content-right">{{item.fact_rmb_total_amount}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">项目号</span>
            <span v-if="item.item_no" class="content-right">{{item.item_no}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">团号</span>
            <span v-if="item.tuan_no" class="content-right">{{item.tuan_no}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">供应商</span>
            <span v-if="item.supplier_org_name" class="content-right">{{item.supplier_org_name}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">项目类型</span>
            <span v-if="item.item_type_str" class="content-right">{{item.item_type_str}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">项目名称</span>
            <span v-if="item.item_name" class="content-right">{{item.item_name}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">数量</span>
            <span v-if="item.num" class="content-right">{{item.num}}</span>
            <span v-else class="content-right">
              {{item.num}}
              <template v-if="item.attr">
                <span v-if="item.item_type === 4">
                  ({{item.attr.meals_nums}}餐{{item.attr.people_nums}}人)
                </span>
                <span v-else-if="item.item_type === 12">
                  ({{item.attr.days}}晚{{item.attr.room_nums}}间)
                </span>
                <span v-else-if='item.item_type === 20'>
                  ({{item.attr.guides_nums}}导游{{item.attr.service_nums}}天)
                </span>
              </template>
            </span>
          </div>
          <div class="content-box">
            <span class="content-label">单价</span>
            <span v-if="item.rmb_unit_price" class="content-right">{{item.rmb_unit_price}}({{item.currency}}/{{item.currency_rate}})</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">合计</span>
            <span class="content-right">
              {{item.num * item.rmb_unit_price}}
              <span v-if='item.item_type === 4'>
                (餐数*人数*单价)
              </span>
              <span v-else-if="item.item_type === 12">
                (入住天数*房间数*单价)
              </span>
              <span v-else-if="item.item_type === 20">
                (导游数*服务天数*单价)
              </span>
              <span v-else>
                (数量*单价)
              </span>
            </span>
          </div>
          <div class="content-box">
            <span class="content-label">成本摊派</span>
            <span v-if="item.apportion_list" class="content-right">
              <div class="mb10">指定订单人头</div>
              <div v-for="(item2, index2) in item.apportion_list" :key="index2" class="mb10">
                <template v-for="(item3, key3) in item2">
                  {{key3}}(
                  <template v-for="(item4, index4) in item3">
                    {{item4.username}}
                    <template v-if="index4 != item3.length - 1">，</template>
                  </template>
                  )
                </template>
              </div>
            </span>
            <span v-else class="content-right">均摊</span>
          </div>
          <div class="content-box">
            <span class="content-label">调账申请</span>
            <span v-if="item.adjustment_detail" class="content-right">
              <div v-for="(item2, index2) in item.adjustment_detail"  :key="index2" class="mb10">
                <router-link :to="{path: '/control/adjustment-detail', query: {id: item2.adjustment_id, type: 2}}">{{item2.item_no}}</router-link>[调前应付：{{item2.front_amount}}]
              </div>
            </span>
            <span v-else class="content-right">--</span>
          </div>
          <!-- <div class="content-box">
            <span class="content-label">备注说明</span>
            <span v-if="item.remark" class="content-right">{{item.remark}}</span>
            <span v-else class="content-right">--</span>
          </div> -->
          <div class="content-box">
            <span class="content-label">创建时间</span>
            <span class="content-right">{{createDate(item.create_time)}}</span>
          </div>
          <div class="content-box">
            <span class="content-label">创建人</span>
            <span v-if="item.user_name" class="content-right">{{item.user_name}}</span>
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">确认件</span>
            <span v-if="item.confirm_piece_lists && item.confirm_piece_lists.length > 0" class="content-rightimg">
              <div v-for="(item2, index2) in item.confirm_piece_lists" class="pic-wrap" :key='index2'>
                <div class="pic-top" :style="&quot;background-image:url(&quot; + item2.url + &quot;)&quot;">
                  <a :href="item2.url" class="big-btn" target="_blank"/>
                </div>
              </div>
            </span>
            <span v-else class="content-right">--</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="付款处理" :visible.sync="dialogTableVisible">
      <el-form :model="formData" label-width="100px">
        <el-form-item label='付款金额' required>
          <input-number  v-model="formData.total_amount" :precision="3" class="width100"/>
          <currency-picker 
            v-model="formData.currency"
            placeholder="选择货币"
            readonly="readonly"
            class="width100">
          </currency-picker>
          <input-number  v-model="formData.currency_rate" :precision="3" class="width100"/>
        </el-form-item>
        <el-form-item label='本位币' required>
          {{amount}}
        </el-form-item>
        <el-form-item label='付款日期' required>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label='付款账户' required>
          <el-select v-model="formData.account_id" filterable placeholder="请选择" @visible-change="getPaymentAccount">
            <el-option
              v-for="item in account_list"
              :key="item.id"
              :label="item.account_info"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='付款凭证' required>
          <el-upload
            v-if="img_list.length < 10"
            action="/bom/api/finance/upload_img"
            name="image[]"
            :on-success='updateImgSuccess'
            :show-file-list='false'>
            <el-button type="primary">点击上传</el-button>
          </el-upload>
          <ul class="el-upload-list el-upload-list--text" v-if="img_list.length > 0">
            <li class="el-upload-list__item is-success" v-for="(item1, index1) in img_list" :key="index1">
              <a class="el-upload-list__item-name" :href="item1.path" target="_blank">
                <i class="el-icon-document"></i>{{item1.name}}
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"></i>
              </label><i class="el-icon-close" @click="imgRemove(item1.id)"></i>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label='备注'>
          <el-input v-model="formData.remark" type='textarea'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="settleApplied" type="primary">确 定</el-button>
				<el-button @click="cancelDig">取 消</el-button>
			</div>
    </el-dialog>
  </div>
</template>
<script>
import {getPaymentAccount} from 'src/api/api'
import {appliedDetail} from 'src/api/tuan';
import {appliedDetail as financeAppliedDetail, settleApplied} from 'src/api/finance';
import CurrencyPicker from "src/plugins/currency-picker/index.vue";
import InputNumber from "src/plugins/InputNumber";
import { formattDate} from 'src/assets/js/common';
export default {
  components: {
    CurrencyPicker,
    InputNumber
  },
  data () {
    return {
      id: this.$route.query.id ? this.$route.query.id : '',
      applied: {},
      detail: {},
      dialogTableVisible: false,
      account_list: [],
      formData: {
        id: '',
        payment_date: '',
        currency: '人民币',
        currency_rate: '1',
        total_amount: '',
        account_id: '',
        attachment: '',
        remark: ''
      },
      date: new Date(),
      img_list: []
    }
  },
  watch: {
    $route() {
      this.appliedDetail()
    }
  },
  computed:{
    amount () {
      let amount = !isNaN(parseFloat(this.formData.total_amount)) ? parseFloat(this.formData.total_amount) : 0
      let currency = !isNaN(parseFloat(this.formData.currency_rate)) ? parseFloat(this.formData.currency_rate) : 1
      let sum = amount * currency
      return sum
    }
  },
  methods: {
    appliedDetail () {
      let params = {
        data: {
          id: this.id
        }
      }
      financeAppliedDetail({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.applied = result.data.applied
            this.detail = {}
            for(let key in result.data.detail) {
              result.data.detail[key].show = false
              this.$set(this.detail, key, result.data.detail[key])
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
    showDetail (key) {
      this.detail[key].show = !this.detail[key].show
    },
    createDate (date) {
      var date = new Date(date * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    // 线下登记付款 begin
    cancel () {
      history.go(-1)
    },
    openDig () {
      this.dialogTableVisible = true
      this.date = new Date()
      this.formData.id = ''
      this.formData.payment_date = ''
      this.formData.currency = '人民币'
      this.formData.currency_rate = '1'
      this.formData.total_amount = ''
      this.formData.account_id = ''
      this.formData.attachment = ''
      this.formData.remark = ''
      this.img_list = []
    },
    cancelDig () {
      this.dialogTableVisible = false
    },
    getPaymentAccount () {
      let params = {
        data: {}
      }
      getPaymentAccount({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.account_list = [] 
            result.data.list.forEach((item, index) => {
              item.account_info = item.account_type_str + '-' + item.account_no
              this.account_list.push(item)
            })
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    updateImgSuccess (response, file) {
      if (response.code === 0) {
        response.data.forEach((item, index) => {
          this.img_list.push(item)
        })
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    },
    imgRemove (id) {
      this.img_list.forEach((item, index) => {
        if (item.id === id) {
          this.img_list.splice(index, 1)
        }
      })
    },
    settleApplied () {
      let canAdd = true
      if (this.formData.total_amount.length === 0 && canAdd) {
        this.$message({
          type: 'error',
          message: '金额必填'
        })
        canAdd = false
        return false
      }
      if (this.formData.currency_rate.length === 0 && canAdd) {
        this.$message({
          type: 'error',
          message: '本位币必填'
        })
        canAdd = false
        return false
      }
      if (!this.date && canAdd) {
        this.$message({
          type: 'error',
          message: '付款日期必填'
        })
        canAdd = false
        return false
      }
      if (this.formData.account_id.length === 0 && canAdd) {
        this.$message({
          type: 'error',
          message: '请选择付款账户'
        })
        canAdd = false
        return false
      }
      if (this.img_list.length === 0 && canAdd) {
        this.$message({
          type: 'error',
          message: '请上传付款凭证'
        })
        canAdd = false
        return false
      }
      if (this.formData.total_amount < this.applied.applied_amount && canAdd) {
        this.$message({
          type: 'error',
          message: '付款金额（本位币）必须大于等于请款金额'
        })
        canAdd = false
        return false
      }
      this.$confirm('保存付款金额后，将更新成本已付账单，确定保存？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.id = this.id
        this.formData.payment_date = this.date ? formattDate(this.date) : ''
        let attachment = ''
        this.img_list.forEach((item, index) => {
          attachment = attachment + item.id + ','
        })
        attachment = attachment.substr(0, attachment.length - 1)
        this.formData.attachment = attachment
        let params = {
          data: this.formData
        }
        settleApplied({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.cancel()
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          },
          showLoading: true
        })
      }).catch(() => {       
      });
    },
    // 线下登记付款 end
  },
  mounted() {
    this.appliedDetail()
  },
}
</script>
<style lang="less" scoped>
  .recieve-info {
    .hide-wrap {
      position: relative;
      margin: 0 0 40px;
      background-color: #fff;
    }
    .hide-btn {
      position: absolute;
      bottom: -25px;
      left: 110px;
      color: #b10c79;
      cursor: pointer;
      .hide-inner {
        position: relative;
        padding: 0 10px 0 0;
        &.show {
          &::after {
            top: 3px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid #b10c79;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
          }
        }
        &::after {
          position: absolute;
          top: 8px;
          right: -10px;
          width: 0px;
          height: 0px;
          border-top: 5px solid #b10c79;
          border-bottom: 5px solid transparent;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          content: '';
        }
      }
    }
    .hide-action {
      overflow: hidden;
      height: 120px;
    }
    .mb10 {
      margin-bottom: 10px;
    }
  }
.top-btn-wrap {
  padding: 0 15px 0 0;
  .btn {
    float: right;
    margin-left: 10px;
  }
}
    .width100 {
      width: 100px;
    }
</style>
