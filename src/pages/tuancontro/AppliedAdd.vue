<template>
<!-- application\index\view\dev\src\components\plan\applied\appliedAdd.vue -->
  <div class="recieve-info">
    <h2 class="recieve-tit">请款信息</h2>
    <div class="receive-content">
      <div class="content-box">
        <span class="content-label">总请款金额</span>
        <span v-if="applied && applied.applied_amount" class="content-right">
          <span class="color-orange">{{applied.applied_amount}}</span>
        </span>
        <span v-else class="content-right">--</span>
      </div>
      <div class="content-box">
        <span class="content-label">对方单位名称</span>
        <span v-if="applied && applied.settlement_org_name" class="content-right">{{applied.settlement_org_name}}</span>
        <span v-else class="content-right">--</span>
      </div>
      <div class="content-box">
        <span class="content-label">开户行／账号</span>
        <span v-if="applied && applied.receipt_account" class="content-right">{{applied.receipt_account}}</span>
        <span v-else class="content-right">
          {{receipt_account_show}}
          <el-button @click="dialogTableVisible = true" type='default' style="margin-top: -12px">+同行帐号</el-button>
        </span>
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
            <span v-if="item.num" class="content-right">
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
            <span v-else class="content-right">--</span>
          </div>
          <div class="content-box">
            <span class="content-label">单价</span>
            <span v-if="item.rmb_unit_price" class="content-right">
              {{item.rmb_unit_price}}
              <span>({{item.currency}}/{{item.currency_rate}})</span>
            </span>
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
              <div v-for="(item2, index2) in item.adjustment_detail"  :key="index2">
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
      <div class="submit-buttons">
        <el-button @click="appliedSave" type="primary">提交</el-button>
        <el-button @click="cancel" type="default">取消</el-button>
      </div>
    </div>
    <!-- 选择账户 -->
    <el-dialog :title="applied.settlement_org_name" :visible.sync="dialogTableVisible">
      <div class="text-r">
        <el-button v-if="$menuPermission('tuancontro/line/costlist/addpayment/peeraccount')" @click="dialogTableVisible2 = true" type='primary'>添加同行账户</el-button>
      </div>
      <div class="account-wrap">
        <div v-if="peer_account && peer_account.length === 0">您还没有同行账户，请添加。</div>
        <div v-else v-for="(item, index) in peer_account" class="account-item" :key="index">
          <el-radio v-model="receipt_account" :label='item'>
            {{item.account_name}} / {{item.bank_name}} / {{item.bank_number}}
          </el-radio>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
				<el-button @click="sureAccount" type="primary">确 定</el-button>
				<el-button @click="dialogTableVisible = false">取 消</el-button>
			</div>
    </el-dialog>
    <el-dialog title="添加账户" :visible.sync="dialogTableVisible2">
      <div>
        <el-form
          :model="account_form"
          label-width="100px">
          <el-form-item label='单位名称' required>
            {{applied.settlement_org_name}}
          </el-form-item>
          <el-form-item label='联系人'>
            <el-input v-model="account_form.contract_name" placeholder='请输入联系人'></el-input>
          </el-form-item>
          <el-form-item label='开户名' required>
            <el-input v-model="account_form.account_name" placeholder='请输入开户名'></el-input>
          </el-form-item>
          <el-form-item label='开户银行' required>
            <el-input v-model="account_form.bank_name" placeholder='请输入开户银行'></el-input>
          </el-form-item>
          <el-form-item label='银行卡号' required>
            <el-input v-model="account_form.bank_number" placeholder='清输入银行卡号'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
				<el-button @click="peerAccountTodoAdd" type="primary">确 定</el-button>
				<el-button @click="cancelpeerAccountDig">取 消</el-button>
			</div>
    </el-dialog>
  </div>
</template>
<script>
import {peerAccountTodoAdd} from 'src/api/api'
import {appliedAddPayment, appliedSave} from 'src/api/tuan';
export default {
  data () {
    return {
      ids: this.$route.query.ids ? this.$route.query.ids + '' : '',
      applied: {},
      detail: {},
      peer_account: [],
      receipt_account: {},
      receipt_account_show: '',
      dialogTableVisible: false,
      dialogTableVisible2: false,
      account_form: {
        id: '0',
        peer_org_id: '',
        peer_org_name: '',
        contract_name: '',
        account_name: '',
        bank_name: '',
        bank_number: ''
      }
    }
  },
  methods: {
    appliedAddPayment () {
      let ids = ''
      ids = this.ids.split(',')
      let params = {
        data: {
          ids: ids
        }
      }
      let action = appliedAddPayment
      action({
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
            this.peer_account = result.data.peer_account
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
            history.go(-1)
          }
        },
        showLoading: true
      })
    },
    showDetail (key) {
      this.detail[key].show = !this.detail[key].show
    },
    appliedSave () {
      let ids = ''
      ids = this.ids.split(',')
      let params = {
        data: {
          ids: ids,
          account_name: this.receipt_account.account_name,
          bank_name: this.receipt_account.bank_name,
          bank_number: this.receipt_account.bank_number
        }
      }
      let action = appliedSave
      action({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            history.go(-1);
          } else {
            this.$message({
              type: 'error',
              message: result.msg
            })
          }
        }
      })
    },
    sureAccount () {
      if (this.receipt_account.bank_name) {
        this.peer_account.forEach((item, index) => {
          if (item.bank_number === this.receipt_account.bank_number) {
            this.receipt_account_show = `${item.account_name} / ${item.bank_name} / ${item.bank_number}`
          }
        })
        this.dialogTableVisible = false
      } else {
        this.$message({
          type: 'error',
          message: '请选择账户'
        })
      }
    },
    cancel () {
      history.go(-1);
    },
    peerAccountTodoAdd () {
      this.account_form.peer_org_id = this.applied.settlement_org_id
      this.account_form.peer_org_name = this.applied.settlement_org_name
      let params = {
        data: this.account_form
      }
      peerAccountTodoAdd({
        params,
        success: (res) => {
          let result = res.data
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.msg
            })
            this.appliedAddPayment()
            this.cancelpeerAccountDig()
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
    cancelpeerAccountDig () {
      this.dialogTableVisible2 = false
      this.account_form.contract_name = ''
      this.account_form.account_name = ''
      this.account_form.bank_name = ''
      this.account_form.bank_number = ''
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
    }
  },
  mounted() {
    this.appliedAddPayment()
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
    .account-wrap {
      .account-item {
        padding: 5px 0;
      }
    }
    .text-r {
      text-align: right;
    }
  }
</style>
