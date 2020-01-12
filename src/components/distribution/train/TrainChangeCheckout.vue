<template>
  <div class="change">
    <div class="change-hd">
      占位成功，改签交易尚未完成， 请在 <span class="count-down">{{ countDown }}</span> 内完成
    </div>
    <div class="change-bd">
      <el-table
        :data="tourists"
        style="width: 100%">
        <el-table-column
          header-align="center"
          align="center"
          label="车次信息"
          width="200">
          <template slot-scope="prop">
            <p>{{ prop.row.start_time }}</p>
            {{ prop.row.checi }}&nbsp;&nbsp;{{ prop.row.from_station_name }} - {{ prop.row.to_station_name }}
          </template>
        </el-table-column>
        <el-table-column
          prop="cxin"
          header-align="center"
          align="center"
          label="席位信息">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="旅客信息">
          <template slot-scope="prop">
            <p>{{ prop.row.passengersename }}</p>
            {{ prop.row.zwname }}
          </template>
        </el-table-column>
        <el-table-column
          prop="piaotypename"
          header-align="center"
          align="center"
          label="票种">
        </el-table-column>
        <el-table-column
          prop="price"
          header-align="center"
          align="center"
          label="票款金额">
        </el-table-column>
      </el-table>
      <div class="change-price-info">
        收取新票款：<span>￥{{ newPrice }}</span> ， 退还原票票款：<span>￥{{ oldPrice }}</span>
      </div>
      <div class="footer-btns">
        <el-button @click="handleCancelChangedTrainTicket">取消改签</el-button>
        <el-button type="primary" @click="handleConfirmChangedTrainTicket">确认改签</el-button>
      </div>
    </div>
    <online-pay v-if="$menuPermission('api/pay/pay_order')" ref="onlinePay" :order-id="changeNo" order-resource="5" />
  </div>
</template>

<script>
import OnlinePay from "src/components/distribution/components/OnlinePay.vue";
import { getDistributionChangeTrainInfoAsyncRequest, cancelDistributionChangeTrainAsyncRequest, confirmDistributionChangeTrainAsyncRequest } from 'src/api/train';

export default {
  data(){
    return {
      changeNo: '',
      tourists: null,
      newPrice: 0,
      oldPrice: 0,
      overTime: 0
    }
  },
  computed: {
    countDown(){
      let time = this.overTime || 0,
          minute = Math.floor(time/60),
          seconds = time%60;
      
      return minute + '分' + seconds + '秒';
    }
  },
  components: {
    OnlinePay
  },
  methods: {
    getChangedTrainTicketInfo(){
      let params = {
        data: {
          change_no: this.changeNo
        }
      }
      getDistributionChangeTrainInfoAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          if(code == 0){
            this.tourists = data.tourists;
            this.overTime = data.over_time;
            this.newPrice = data.new_price;
            this.oldPrice = data.old_price;
            this.handleCountDown();
          }else{
            this.$message.error(msg);
          }
        }
      });
    },
    handleCountDown(){
      let countDown = setInterval(()=>{
        if(this.overTime == 0){
          clearInterval(countDown);
        }
        this.overTime--;
      },1000);
    },
    handleCancelChangedTrainTicket(){
      this.$confirm(`您确定要取消改签吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          data: {
            change_no: this.changeNo
          }
        }
        cancelDistributionChangeTrainAsyncRequest({
          params: params,
          success: (params) => {
            let { code, data, msg} = params['data'];
            if(code == 0){
              this.$message.success(msg);
            }else{
              this.$message.error(msg);
            }
            this.$router.replace({ 
              name: 'DistributionTrainMyOrderDetail', 
              query: {
                orderNo: data.order_no
              } 
            });
          },
          showLoading: true
        });
      });
    },
    handleConfirmChangedTrainTicket(){
      let params = {
        data: {
          change_no: this.changeNo
        }
      }
      confirmDistributionChangeTrainAsyncRequest({
        params: params,
        success: (params) => {
          let { code, data, msg} = params['data'];
          if(code == 0){
            if(data.pay_flag == 0){
              this.$message.success(msg);
              this.$router.replace({ 
                name: 'DistributionTrainMyOrderDetail', 
                query: {
                  orderNo: data.order_no
                } 
              });
            }else{
              this.$nextTick(() => {
                this.$confirm('改签成功', '在线支付提示', {
                  type: 'success',
                  cancelButtonText: '订单详情',
                  confirmButtonText: '去支付',
                  closeOnClickModal: false,
                  closeOnPressEscape: false,
                  showClose: false,
                  beforeClose: (action, instance, done) => {
                    if(action == 'confirm'){
                      this.$refs.onlinePay.pay();
                    }else{
                      done();
                      this.$router.push({ name: 'DistributionTrainMyOrderDetail', query: { orderNo: data.order_no }});
                    }
                  }
                }).catch((e)=>{
                   console.log('cancel: ', e);
                })
              }) 
            }
          }else{
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    }
  },
  mounted(){
    let { changeNo } = this.$route.query;
    if(!changeNo){
      this.$router.replace({ path:'/distribution/train-list' });
      return;
    }
    this.changeNo = changeNo;
    this.getChangedTrainTicketInfo();
  }
}
</script>

<style lang="less" scoped>
.change{
  background-color: #fff;
  padding: 20px;

  .change-hd{
    padding-bottom: 10px;
    font-size: 20px;
    .count-down{
      color: #f60;
    }
  }
  .change-price-info{
    padding: 10px 0;
    font-size: 18px;
    text-align: right;

    span{
      color: #f60;
    }
  }
  .footer-btns{
    text-align: center;
    padding: 20px 0;
  }
}
</style>
