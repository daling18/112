<template>
  <div class="wrapper">
    <div class="detail-section" v-if="scenicDetail">
      <div class="detail-tit">基础信息</div>
      <div class="detail-item">
        <div class="detail-lab">所属景区</div>
        <div class="detail-con">{{ scenicDetail.scenic_name}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">门票名称</div>
        <div class="detail-con">{{ scenicDetail.ticket_name}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">套餐名称</div>
        <div class="detail-con">{{ scenicDetail.quote_name}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">取票信息</div>
        <div class="detail-con">{{ scenicDetail.get_ticket}}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">最少购买张数</div>
        <div class="detail-con">{{ scenicDetail.min_buy ? scenicDetail.min_buy : '不限' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">最多购买张数</div>
        <div class="detail-con">{{ scenicDetail.max_buy ? scenicDetail.max_buy :'不限' }}</div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">提前预订时间</div>
        <div class="detail-con">
          <span v-if="scenicDetail.advance_days == 0 && !scenicDetail.advance_time">出行当天可购买</span>
          <span v-if="scenicDetail.advance_days > 0  && !scenicDetail.advance_time">最晚需在【出行{{scenicDetail.advance_days}}天】前购买</span>
          <span v-if="(!scenicDetail.advance_days || scenicDetail.advance_days==0) && scenicDetail.advance_time">最晚需在【出行当天{{scenicDetail.advance_time}}】前购买</span>
          <span v-if="scenicDetail.advance_days > 0 && scenicDetail.advance_time">最晚需在【出行{{scenicDetail.advance_days}}天{{scenicDetail.advance_time}}】前购买</span>
        </div>
      </div>
      <!-- <div class="detail-item">
        <div class="detail-lab">使用有效期</div>
        <div class="detail-con">
          {{ canUsetTypeText }}
        </div>
      </div> -->
      <div class="detail-item">
        <div class="detail-lab">身份证信息</div>
        <div class="detail-con">
          <span v-if="scenicDetail.need_idcard == 0">不需要填写</span>
          <span v-if="scenicDetail.need_idcard == 1">只需填写一位游客信息</span>
          <span v-if="scenicDetail.need_idcard == 2">需要填写每位游客信息</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">退票规则</div>
        <div class="detail-con">
          <div class="popover-table">
              <table>
                <tr>
                  <th>退票规则</th>
                  <td>{{ scenicDetail.refund_rule.refund_rule }}</td>
                </tr>
                <tr>
                  <th>是否需要审核</th>
                  <td>{{ scenicDetail.refund_rule.refund_audit }}</td>
                </tr>
                <tr>
                  <th>退票手续费</th>
                  <td>
                    {{ scenicDetail.refund_rule.refund_rule == '不可退' ? 0 : scenicDetail.refund_rule.refund_fee }}
                  </td>
                </tr>
                <tr v-if="scenicDetail.refund_rule.refund_rule != '不可退'">
                  <th>阶梯退票</th>
                  <td>
                    <p v-for="(item,idx) in scenicDetail.refund_rule.refund_cost" :key="idx">
                      {{item}}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">退票定损</div>
        <div class="detail-con">
          <span v-if="scenicDetail.fixed_loss_type == 1">系统定损</span>
          <span v-if="scenicDetail.fixed_loss_type == 2">人工定损</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">购买须知</div>
        <div class="detail-con" v-html="scenicDetail.notice"></div>
      </div>
      <div class="detail-item">
        <div class="detail-lab">产品报价</div>
      </div>
      <div class="detail-item">
        <div class="detail-con">
          <calendar-quotation>
            <div class="quote" v-for="(q, d) in scenicDetail.quote_list" :key="d" :slot="d">
              <p class="quote-item"><span class="lbl">成本价：</span><span class="prc">￥{{ q.cost_price }}</span></p>
              <p class="quote-item"><span class="lbl">结算价：</span><span class="prc">￥{{ q.settlement_price }}</span></p>
              <p class="quote-item"><span class="lbl">销售价：</span><span class="prc">￥{{ q.sale_price }}</span></p>
              <p class="quote-item"><span class="lbl">挂牌价：</span><span class="prc">￥{{ q.shop_price }}</span></p>
              <!-- <p class="tools"><a href="javascript:;" @click="handleEditSingleQuote(q)">编辑</a>&nbsp;&nbsp;
              <a href="javascript:;" @click="handleDelSingleQuote(d)">删除</a></p> -->
            </div>
          </calendar-quotation>
        </div>
      </div>
      
    </div>
    <div class="submit-buttons">
      <el-button @click="$router.push({path:'/self-support/scenic/list'})">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getSelfSupportTicketQuoteDetail }from 'src/api/self_support.goodscate'
import CalendarQuotation from './components/CalendarQuotation.vue';

export default {
  data () {

    return {
      scenicDetail:null
    }
  },
  computed:{
    canUsetTypeText(){
      let text = '',
          use_type = this.scenicDetail.use_type,
          delay_days = this.scenicDetail.delay_days;
      switch(use_type){
        case 0:
          if(delay_days){
            text = '游玩日期（含）'+ delay_days +'天内有效';
          }else{
            text = '游玩日期起有效';
          }
          break;
        case 1:
          if(delay_days){
            text = '下单日期（含）'+ delay_days +'天内有效';
          }else{
            text = '下单日期起有效';
          }
          break;
        case 2:
          text = this.scenicDetail.start_date + '-' + this.scenicDetail.end_date + '有效';
          break;
      }
      return text;
    }
  },
  components: {
    CalendarQuotation
  },
  methods:{
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
              this.$set(this,'scenicDetail',data.quote_type_info);
              this.$set(this.scenicDetail,'quote_list',quotes);
            } else {
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
      }
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
            date: this.stringifyDate(date),
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
      
      return year + '-' + (month+'').replace(/(^\d&)/, '0$1') + '-' + (day+'').replace(/(^\d&)/, '0$1');
    },
    formatPriceList(quote){
      let prices = {}
      quote.map(i => { prices[i.quote_date] = i });
      return prices;
    }
    
  },
  mounted(){
    this.selfSupportTicketQuoteDetail();
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  padding: 0 15px 15px;
  background: #fff;
}
.detail-section{
  padding: 0;
  overflow: hidden;
  .detail-tit{
    border-left: 5px solid #b10c79;
    line-height: 1;
    margin: 35px 0 25px;
    padding-left: 10px;
    color: #b10c79;
    font-size: 18px;
  }
  .detail-item{
    display: flex;
    align-items: flex-start;
    line-height: 1.8;
    .detail-lab{
      width: 120px;
      color: #999;
      text-align: right;
    }
    .detail-con{
      flex: 1;
      padding-left: 15px;
      word-break: break-word;
    }
  }
  .detail-thumb{
    width: 100px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    display: inline-block;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      display: block;
      border: 1px solid #e4e4e4;
      box-sizing: border-box;
    }
    .preview-btn{
      padding: 6px;
      background-color: rgba(0,0,0,0.5);
      color: #fff;
      position: absolute;
      right: 0;
      line-height: 1;
      top: 74px;
    }
  }
}
.tab-list{
  padding-bottom: 25px;
}
.tab-item{
  padding: 12px 0;
  width: 130px;
  text-align: center;
  background: #f4f4f4;
  margin-right: 10px;
  display: inline-block;
  &.selected{
    background-color: #b10c79;
    color: #fff;
    position: relative;
    &:after{
      content: "";
      border-top: 6px solid #b10c79;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      position: absolute;
      bottom: -5px;
      left: 59px;
    }
  }
}
.tab-content{
  border: 1px solid #ccc;
  padding: 15px;
  word-break: break-word;
}
.price-item{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .price-sep{
      margin: 0 15px;
      width: 2px;
      height: 14px;
      background-color: #ccc;
    }
    .price-detail{
      margin-right: 30px;
    }
    &:after{
      margin-bottom: 0;
    }
}
.detail-content{
  line-height: 1.5;
  word-break: break-word;
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
.popover-text{
  color: #0066FF;
  cursor: pointer;
}
.popover-table{
  padding: 10px 0;
  table{
    width: 300px;
  }
  th,td{
    border:1px solid #ddd;
    padding: 10px 8px;
    text-align: left;
    font-weight: 400;
  }
  th{
    width: 100px;
    background-color: #f4f4f4;
  }
}
</style>
