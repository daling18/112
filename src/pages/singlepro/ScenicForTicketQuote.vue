<template>
  <div class="wrapper">
    <div class="system-content">

      <div class="mod-form" v-if="form">
        <el-form label-width="120px" style="width:80%;" ref="scenicForm" :model="form" :rules="rules">
          <el-form-item label="产品来源" prop="supplier_id">
            <select-newsupplier v-model="form.supplier_id" :orgName.sync="form.supplier_name"></select-newsupplier>
            
          </el-form-item>
          <el-form-item label="所属景区">
            <span v-if="ticketDetail">{{ticketDetail.scenic_name}}</span>
          </el-form-item>
          <el-form-item label="门票名称">
            <span v-if="ticketDetail">{{ticketDetail.name}}</span>
          </el-form-item>
          <el-form-item label="套餐名称" prop="quote_name">
            <el-input v-model="form.quote_name" placeholder="" class="checkout-form-input"/>
          </el-form-item>
          <el-form-item label="核销方式" prop="verification">
            <el-radio v-model="form.verification" :label="1">我方核销</el-radio>
            <el-radio v-model="form.verification" :label="2">由资源方核销</el-radio>
          </el-form-item>
          <el-form-item label="接单方式" prop="need_reconfirm">
            <!-- <el-radio v-model="form.need_reconfirm" :label="1">立即确认</el-radio> -->
            <el-radio v-model="form.need_reconfirm" :label="2">二次确认</el-radio>
          </el-form-item>
          <el-form-item label="取票信息">
            <el-input v-model="form.get_ticket" placeholder="" class="checkout-form-input" />
          </el-form-item>
          <el-form-item label="最少购买张数">
            <el-input-number v-model="form.min_buy" :min="0"></el-input-number>
            <span class="tip">注：0代表不设置</span>
          </el-form-item>
          <el-form-item label="最多购买张数">
            <el-input-number v-model="form.max_buy" :min="0"></el-input-number>
            <span class="tip">注：0代表不设置</span>
          </el-form-item>
          <el-form-item label="提前预订时间" prop="advance_time">
            最少提前
            <el-input v-model="form.advance_days" placeholder="" class="mini-form-input" />
            天
            <el-input v-model="form.advance_time" placeholder="格式：08:59" class="mini-form-input" />
            点前预订
            <span class="tip">注：不填默认不限制</span>
          </el-form-item>
          <el-form-item label="使用有效期" prop="use_type">
            <el-radio v-model="form.use_type" :label="0">游玩日期起有效</el-radio>
            <el-radio v-model="form.use_type" :label="1">下单日期起有效</el-radio>
            <el-radio v-model="form.use_type" :label="2">
              <el-date-picker v-model="form.start_date"
                type="date"
                class="mini-form-input" 
                placeholder="选择日期">
              </el-date-picker>&nbsp;至&nbsp;
              <el-date-picker v-model="form.end_date"
                type="date"
                class="mini-form-input" 
                placeholder="选择日期">&nbsp;有效
              </el-date-picker>
            </el-radio>
          </el-form-item>
          <el-form-item v-if="form.use_type == 0 || form.use_type == 1">
            允许推迟 <el-input v-model="form.delay_days" placeholder="" class="mini-form-input" /> 天
            <span>注：0代表不设置</span>
          </el-form-item>
          <!-- <el-form-item label="联系人身份信息" prop="contact_need_identity">
            <el-radio v-model="form.contact_need_identity" :label="2">不需要填写</el-radio>
            <el-radio v-model="form.contact_need_identity" :label="1">需要填写</el-radio>
          </el-form-item> -->
          <el-form-item label="身份证信息" prop="need_idcard">
            <el-radio v-model="form.need_idcard" :label="0">不需要填写</el-radio>
            <el-radio v-model="form.need_idcard" :label="1">只需要填写一位游客信息</el-radio>
            <el-radio v-model="form.need_idcard" :label="2">需要填写每位游客信息</el-radio>
          </el-form-item>
          <el-form-item label="退票规则" prop="refund_rule">
            <el-radio v-model="form.refund_rule" :label="2">不可退</el-radio>
            <el-radio v-model="form.refund_rule" :label="1" >游玩日期前可退</el-radio>
          </el-form-item>
          <el-form-item v-if="form.refund_rule == 1">
            <el-radio-group v-model="form.refund_type">
              <el-radio :label="0">按订单总金额百分比扣除</el-radio>
              <el-radio :label="1">按固定金额扣除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.refund_rule == 1 && form.refund_type == 0">
            扣除百分比 <el-input :class="'input-w-short'" v-model.number="form.refund_fee" class="mini-form-input" /> %
          </el-form-item>
          <el-form-item v-if="form.refund_rule == 1 && form.refund_type == 1">
            扣除金额 <el-input :class="'input-w-short'" v-model.number="form.refund_fee" class="mini-form-input" /> 元
          </el-form-item>
          <el-form-item label="退票定损" prop="fixed_loss_type">
            <el-radio v-model="form.fixed_loss_type" :label="1">系统定损</el-radio>
            <el-radio v-model="form.fixed_loss_type" :label="2">人工定损</el-radio>
            <p class="tip">注：当符合可退票规则时，系统定损：按照退票规则自动处理退款；人工定损：人工介入定损退款金额，确认后退款</p>
          </el-form-item>
          <el-form-item label="购买须知" prop="notice">
            <vue-editor v-model="form.notice"></vue-editor>
          </el-form-item>
          <el-form-item label="产品报价">
            <el-button type="primary" @click="quoteVisable = true">新增报价</el-button>
            <calendar-quotation>
              <div class="quote" v-for="(q, d) in form.quote_list" :key="d" :slot="d">
                <p class="quote-item"><span class="lbl">成本价：</span><span class="prc">￥{{ q.cost_price }}</span></p>
                <p class="quote-item"><span class="lbl">结算价：</span><span class="prc">￥{{ q.settlement_price }}</span></p>
                <p class="quote-item"><span class="lbl">销售价：</span><span class="prc">￥{{ q.sale_price }}</span></p>
                <p class="quote-item"><span class="lbl">挂牌价：</span><span class="prc">￥{{ q.shop_price }}</span></p>
                <p class="tools"><a href="javascript:;" @click="handleEditSingleQuote(q)">编辑</a>&nbsp;&nbsp;<a href="javascript:;" @click="handleDelSingleQuote(d)">删除</a></p>
              </div>
            </calendar-quotation>
          </el-form-item>
        </el-form>
      </div>
        
      <div class="submit-buttons">
        <el-button type="primary" @click="setSubmitForm">保存</el-button>
        <el-button @click="$router.push({path:'/singlepro/scenic/list'})">返回</el-button>
      </div>
    </div>
    
    
    <el-dialog title="新增报价"
               :visible.sync="quoteVisable"
               :size="'small'"
               @close="handleClearQuote">
      <el-form v-if="quoteVisable" :model="quoteForm" :rules="quoteFormRules" label-width="100px" ref="quoteForm">
        <el-form-item label="报价日期" required>
          <div class="date-range">
            <el-col :span="8">
              <el-form-item prop="startDate">
                <el-date-picker 
                  v-model="quoteForm.startDate"
                  :class="'input-w-auto'" 
                  type="date" 
                  placeholder="选择日期" 
                  :picker-options="startDateOption">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="endDate">
                <span>至</span>
                <el-date-picker 
                  v-model="quoteForm.endDate"
                  :class="'input-w-auto'" 
                  type="date" 
                  placeholder="选择日期"
                  :picker-options="endDateOption">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item label="报价星期" prop="week">
          <el-checkbox v-model="checkWeekAll" @change="handleCheckWeekAllAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="quoteForm.week" @change="handleCheckedWeekChange">
            <el-checkbox v-for="(w,k) in weeks" :key="k" :label="w.value" name="week">{{ w.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="form-group">
          <el-form-item label="成本价" prop="cost_price">
            <el-input v-model.number="quoteForm.cost_price" class="input-class-model"></el-input>
          </el-form-item>
          <el-form-item label="结算价" prop="settlement_price">
            <el-input v-model.number="quoteForm.settlement_price" class="input-class-model"></el-input>
          </el-form-item>
          <el-form-item label="销售价" prop="sale_price">
            <el-input v-model.number="quoteForm.sale_price" class="input-class-model"></el-input>
          </el-form-item>
          <el-form-item label="挂牌价" prop="shop_price">
            <el-input v-model.number="quoteForm.shop_price" class="input-class-model"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClearQuote">取 消</el-button>
        <el-button type="primary" @click="handleSubmitQuote">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑报价"
      :visible.sync="singleQuoteVisable"
      size="tiny"
      @close="handleClearSingleQuote">
      <el-form v-if="singleQuoteVisable" :model="singleQuoteForm" :rules="quoteFormRules" label-width="100px" ref="singleQuoteForm" style="width: 300px">
        <el-form-item label="日期">
          {{ singleQuoteForm.quote_date }}
        </el-form-item>
        <el-form-item label="成本价" prop="cost_price">
          <el-input v-model.number="singleQuoteForm.cost_price"></el-input>
        </el-form-item>
        <el-form-item label="结算价" prop="settlement_price">
          <el-input v-model.number="singleQuoteForm.settlement_price"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="sale_price">
          <el-input v-model.number="singleQuoteForm.sale_price"></el-input>
        </el-form-item>
        <el-form-item label="挂牌价" prop="shop_price">
          <el-input v-model.number="singleQuoteForm.shop_price"></el-input>
        </el-form-item>
        <!-- <el-form-item label="库存" prop="stock">
          <el-input v-model.number="singleQuoteForm.stock"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClearSingleQuote">取 消</el-button>
        <el-button type="primary" @click="handleSubmitSingleQuote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { 
  getYkTicketDetail, 
  setSelfSupportTicketQuote,
  getSelfSupportTicketQuoteDetail }from 'src/api/self_support.goodscate'
import SelectNewsupplier from 'src/plugins/SelectNewsupplier.vue';
import CalendarQuotation from './components/CalendarQuotation.vue';
import VueEditor from 'src/plugins/editor/vue-html5-editor.vue';
import * as format from 'src/utils/format';

export default {
  components: {
    VueEditor,
    SelectNewsupplier,
    CalendarQuotation
  },
  data () {
    return {
      ticketDetail:null,
      form:{
        quote_type_id:"",
        supplier_id: null,
        supplier_name: "",
        ticket_id: "",
        quote_name: "",
        verification: "",
        need_reconfirm: "",
        get_ticket: "",
        min_buy: "",
        max_buy: "",
        advance_days: "",
        advance_time: "",
        use_type: 0,
        start_date: "",
        quote_list:{},
        end_date: "",
        contact_need_identity: 1,
        need_idcard: "",
        refund_rule: "",
        refund_type: "",
        refund_fee: "",
        refund_audit: "",
        fixed_loss_type:"",
        notice: "",
        delay_days:"",
      },
      quoteForm:{
        startDate: null,
        endDate: null,
        week: [1,2,3,4,5,6,0],
        cost_price: null,
        shop_price: null,
        settlement_price: null,
        sale_price: null
      },
      quoteFormRules:{
        startDate: [
          { required: true, type: 'date', message: '请输入起始时间', trigger: 'change'  }
        ],
        endDate: [
          { required: true, type: 'date', message: '请输入结束时间', trigger: 'change'  }
        ],
        week: [
          { required: true, type: 'array', message: '请输选择星期', trigger: 'change'  }
        ],
        cost_price: [
          { required: true, type: 'number', message: '请输入成本价', trigger: 'blur'  }
        ],
        settlement_price: [
          { required: true, type: 'number', message: '请输入结算价', trigger: 'blur'  }
        ],
        sale_price: [
          { required: true, type: 'number', message: '请输入销售价', trigger: 'blur'  }
        ],
        shop_price: [
          { required: true, type: 'number', message: '请输入挂牌价', trigger: 'blur'  }
        ]
      },
      quoteVisable: false,
      weeks: [{
        name: '星期一',
        value: 1
      },
      {
        name: '星期二',
        value: 2
      },
      {
        name: '星期三',
        value: 3
      },
      {
        name: '星期四',
        value: 4
      },
      {
        name: '星期五',
        value: 5
      },
      {
        name: '星期六',
        value: 6
      },
      {
        name: '星期日',
        value: 0
      }],
      checkWeekAll: true,
      singleQuoteVisable: false,
      singleQuoteForm:{
        quote_date: null,
        cost_price: null,
        shop_price: null,
        settlement_price: null,
        sale_price: null
      },
      rules:{
        supplier_id: [
          { required: true, type: 'number', message: '请输入产品来源', trigger:'blur' }
        ],
        quote_name: [
          { required: true, type: 'string', message: '请输入门票套餐名称', trigger: 'blur'  }
        ],
        verification: [
          { required: true, type: 'number', message: '请选择核销方式', trigger: 'change'  }
        ],
        need_reconfirm: [
          { required: true, type: 'number', message: '请选择接单方式', trigger: 'change'  }
        ],
        advance_time: [
          // { required: true, message: '请输入择提前预订时间', trigger: 'blur'  },
          {pattern:/^([1-2][0-9][:|：][0-5]\d)|([0-2][1-9][:|：][0-5]\d)|([0-2][0-9][:|：][1-5]\d)|([0-2][0-9][:|：][0-5][1-9])$/,message: '请填写输入的时间格式如：08:59', trigger: 'blur' }
        ],
        use_type: [
          { required: true, type: 'number', message: '请选择使用有效期', trigger: 'change'  }
        ],
        fixed_loss_type: [
          { required: true, type: 'number', message: '请选择退票定损类型', trigger: 'change'  }
        ],
        contact_need_identity: [
          { required: true, type: 'number', message: '请选择联系人身份信息', trigger: 'change'  }
        ],
        need_idcard: [
          { required: true, type: 'number', message: '请选择身份证信息', trigger: 'change'  }
        ],
        refund_rule: [
          { required: true, type: 'number', message: '请选择退票规则', trigger: 'change'  }
        ]
      },
    }
  },
  computed:{
    startDateOption(){
      return {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    },
    endDateOption(){
      let startDate = this.quoteForm.startDate;
      return {
        disabledDate(time) {
          return !startDate || time.getTime() < startDate.getTime();
        }
      }
    }
  },
  methods:{
    // 景区详情
    selfSupportTicketDetail(){
      
      let para = {};
      para.data = {};
      para.data.id = this.$route.query.ticketId;

      getYkTicketDetail({
        params: para,
        success: (params) => {
          let {code, msg, data } = params.data;

          if (!code) {
            this.$set(this,'ticketDetail',data);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    // 获取门票报价详情
    selfSupportTicketQuoteDetail(){
      let quoteId = this.$route.query.quoteId;
      if(quoteId){
        let para = {};
        para.data = {};
        para.data.quote_type_id = quoteId;

        getSelfSupportTicketQuoteDetail({
          params: para,
          success: (params) => {
            let {code, msg, data } = params.data;

            if (!code) {
              let quotes = this.formatPriceList(data.quote_price_list);
              
              for(let i in this.form){
                this.form[i] = data.quote_type_info[i];
              }
              this.$set(this.form,'quote_list',quotes);
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      }
    },
    // 提交门票报价详情
    setSubmitForm(){
      this.$refs['scenicForm'].validate((valid) => {
        if(valid){
          let para = {};
          para.data = JSON.parse(JSON.stringify(this.form));
          let quote_list = Object.keys(para.data.quote_list).map(key=> para.data.quote_list[key]);
          para.data.quote_list = quote_list;
          para.data.quote_type_id = this.$route.query.quoteId;
          para.data.ticket_id = this.$route.query.ticketId;
          if(para.data.use_type == 2){
            para.data.start_date = format.date(para.data.start_date)
            para.data.end_date = format.date(para.data.end_date)
          }

          setSelfSupportTicketQuote({
            params: para,
            success: (params) => {
              let {code, msg, data } = params.data;

              this.$message({
                type: code?'error':'success',
                message:msg
              })
              if(!code){
                this.$router.push({path:'/singlepro/scenic/quote-detail',
                query:{quoteId:data.quote_type_id}})
              }
            },
            showLoading: true
          });
        }
      })
    },
    handleCheckWeekAllAllChange(event){
      this.quoteForm.week = event.target.checked ? this.weeks.map(i=>i.value) : [];
    },
    handleCheckedWeekChange(value){
      let checkedCount = value.length;
      this.checkWeekAll = checkedCount === this.weeks.length;
    },
    handleClearQuote(){
      this.quoteForm = {
        startDate: null,
        endDate: null,
        week: [1,2,3,4,5,6,0],
        cost_price: null,
        shop_price: null,
        settlement_price: null,
        sale_price: null
      };
      this.checkWeekAll = true;
      this.quoteVisable = false;
    },
    handleSubmitQuote(){
      this.$refs.quoteForm.validate((valid) => {
        if(valid){
          let oldQuotes = this.form.quote_list,
              newQuotes = this.createCalendarQuote();

          for(let date in newQuotes){
            oldQuotes[date] = newQuotes[date];
          }
          this.handleClearQuote();
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleEditSingleQuote(quote){
       let { quote_date, cost_price, settlement_price, shop_price, sale_price } = quote;
       this.singleQuoteForm = {
        quote_date,
        cost_price,
        shop_price,
        settlement_price,
        sale_price
      };
      this.singleQuoteVisable = true;
    },
    handleDelSingleQuote(date){
      this.$delete(this.form.quote_list, date);
    },
    handleClearSingleQuote(){
      this.singleQuoteForm = {
        quote_date: null,
        cost_price: null,
        shop_price: null,
        settlement_price: null,
        sale_price: null
      };
      this.singleQuoteVisable = false;
    },
    handleSubmitSingleQuote(){
      this.$refs.singleQuoteForm.validate((valid) => {
        if(valid){
          let { quote_date, cost_price, settlement_price, shop_price, sale_price } = this.singleQuoteForm;
          this.form.quote_list[quote_date] = {
              quote_date,
              settlement_price,
              cost_price,
              shop_price,
              sale_price
          };
          this.handleClearSingleQuote();
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    createCalendarQuote(){
      let { startDate, endDate, week, cost_price, settlement_price, shop_price, sale_price } = this.quoteForm,
          start,
          end,
          quotes = {};

      start = +new Date(startDate);
      end = +new  Date(endDate);

      while(start <= end){
        let date = new Date(start),
            day = date.getDay();
        if(week.indexOf(day) > -1){
          quotes[this.stringifyDate(date)] = {
            quote_date: this.stringifyDate(date),
            settlement_price,
            cost_price,
            shop_price,
            sale_price
          }
        }
        start += 86400000;
      }

      return quotes;
    },
    stringifyDate(date){
      let year = date.getFullYear(),
          month = date.getMonth() + 1,
          day = date.getDate();
      
      return year + '-' + (month+'').replace(/(^\d$)/, '0$1') + '-' + (day+'').replace(/(^\d$)/, '0$1');
    },
    formatPriceList(quote){
      let prices = {}
      quote.map(i => { prices[i.quote_date] = i });
      return prices;
    }
  },
  mounted(){
    this.selfSupportTicketDetail();
    this.selfSupportTicketQuoteDetail();
  }
}
</script>

<style lang="scss" scoped>
.mini-form-input{
  width: 120px;
}
.checkout-form-input{
    width: 320px;
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
.system-content{
  background: #fff;
  .tip{
    color: #999;
    font-size: 12px;
  }
}
.input-class-model{
  width: 220px;
}
.input-w-auto{
  width: 180px;
}
.popover-ruler{
  p{
    display: inline-block;
    margin-right: 20px;
  }
}
</style>
