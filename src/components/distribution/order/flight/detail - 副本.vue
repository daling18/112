<template>
  <div class="wrapper">

    <div class="system-tab">
      <ul class="tab-box">
        <template>
          <router-link :to="{ path: '/order/flight/order_detail', query: { order_id: $route.query.order_id }}" tag="li" class="on">
            订单详情
          </router-link>
          <router-link :to="{ path: '/order/flight/change_order', query: { order_id: $route.query.order_id }}" tag="li">
            变更单详情
          </router-link>
          <router-link :to="{ path: '/order/flight/refund_order', query: { order_id: $route.query.order_id }}" tag="li">
            退款单
          </router-link>
        </template>
      </ul>
    </div>

    <div class="pannel-order-detail">
    <!--订单信息-->
    <div class="panel">
      <div class="hd">
        <h2>订单信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="el-table table-custom">
                <tr>
                  <th width="250">订单号</th>
                  <th width="180">下单时间</th>
                  <th>订单类型</th>
                  <th>支付方式</th>
                  <th>订单金额</th>
                  <th>已收金额</th>
                  <th>未收金额</th>
                  <th>结算方</th>
                  <th>订单状态</th>
                  <th width="80">操作</th>
                </tr>
                <template v-if="orderByData && orderByData.order_info">
                  <tr>
                    <td>{{orderByData.order_info.order_id}}</td>
                    <td>{{orderByData.order_info.create_time}}</td>
                    <td>{{orderByData.order_info.order_type}}</td>
                    <td>{{orderByData.order_info.pay_type}}</td>
                    <td>{{orderByData.order_info.total_price}}</td>
                    <td>{{orderByData.order_info.total_price}}</td>
                    <td>{{orderByData.order_info.total_price}}</td>
                    <td>{{orderByData.order_info.distributor_name}}</td>
                    <td>{{orderByData.order_info.status_name}}</td>
                    <td>
                      <el-dropdown trigger="hover">
                        <span class="el-dropdown-link">操作<i class="el-icon-caret-bottom el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <span @click="inlandRefundVis=true">申请退/废票</span>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <span @click="inlandChangeLogVis=true">申请变更</span>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <a href="javascript:;" @click="getByOrderCancel">取消订单</a>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <a href="javascript:;" @click="addShoukuanVisible=true">添加收款</a>
                          </el-dropdown-item>
                          <el-dropdown-item>在线支付</el-dropdown-item>
                          <el-dropdown-item>
                            <a href="javascript:;" @click="$router.push({path:'/distribution/ticket-order/detail',
                                      query:{}})">查看收入</a>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </td>
                  </tr>
                </template>
              </table>
          </div>
      </div>
    </div>


    <!--订单价格明细-->
    <div class="panel">
      <div class="hd">
        <h2>订单价格明细</h2>
        <el-button type="primary" style="float:right;">新增项目</el-button>
        <!-- <el-button type="primary" style="float:right;" @click="addLinePriceDetail">新增项目</el-button> -->
      </div>
      <div class="bd">
        <div class="info-list">
          <span><i>结算币种 / 汇率：</i>人民币 / 1</span>
          <span v-if="orderByData && orderByData.order_info"><i>结算总金额：</i>{{orderByData.order_info.total_price}}</span>
          <span v-if="orderByData && orderByData.order_info"><i>本位币：</i>{{orderByData.order_info.total_price}}</span>
        </div>
        <table class="el-table table-custom">
          <tr>
            <th>序号</th>
            <th>项目</th>
            <th>单价（本位币)</th>
            <th>结算单价</th>
            <th>数量</th>
            <th>结算金额小计</th>
            <th>小计（本位币)</th>
            <th>说明</th>
            <th>操作</th>
          </tr>
          <template  v-if="orderByData && orderByData.order_price_detail">
          <tr v-for="(item,idx) in orderByData.order_price_detail" :key="idx">
            <template v-if="!item.isadd">
              <td>{{idx+1}}</td>
              <td>{{item.item_name}}</td>
              <td>{{item.rmb_unit_price}}</td>
              <td>{{item.unit_price}}</td>
              <td>{{item.num}}</td>
              <td>{{item.unit_price * item.num}}</td>
              <td>{{item.rmb_total_amount}}</td>
              <td></td>
              <td>--</td>
            </template>
            <template v-else>
              <td>{{idx+1}}</td>
              <td>
                <el-input v-model="item.item_name" placeholder="请输入项目名称"></el-input>
              </td>
              <td>{{item.unit_price}}</td>
              <td>
                <el-select v-model="item.price_type" placeholder="请选择" style="width:50px;">
                  <el-option label="+" :value="1"></el-option>
                  <el-option label="-" :value="-1"></el-option>
                </el-select>
                <el-input v-model="item.unit_price" placeholder="请输入结算单价"></el-input>
              </td>
              <td>
                <el-input v-model="item.num" placeholder="请输入数量"></el-input>
              </td>
              <td>{{item.unit_price * item.num}}</td>
              <td>{{item.unit_price * item.num}}</td>
              <td><el-input v-model="item.remark" placeholder="请输入说明"></el-input></td>
              <td>
                <!-- <el-button type="text" @click="saveLinePriceDetail(idx)">保存</el-button>
                <el-button type="text" @click="delLinePriceDetail(idx)">删除</el-button> -->
                <el-button type="text">保存</el-button>
                <el-button type="text">删除</el-button>
              </td>
            </template>
          </tr>
          </template>
        </table>
      </div>
    </div>


    <!--订单变更记录-->
    <div class="panel">
      <div class="hd">
        <h2>订单变更记录</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="el-table table-custom">
                <tr>
                  <th>时间</th>
                  <th>操作说明</th>
                  <th>订单状态</th>
                  <th>操作人</th>
                </tr>
                <template v-if="orderByData && orderByData.operation_log">
                <tr v-for="(obj,index) in orderByData.operation_log" :key="index">
                  <td>{{obj.create_time}}</td>
                  <td>{{obj.remark}}</td>
                  <td>{{obj.order_status}}</td>
                  <td></td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>




    <!--乘机人信息-->
    <div class="panel">
      <div class="hd">
        <h2>乘机人信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="el-table table-custom">
                <tr>
                  <th>姓名</th>
                  <th>证件类型</th>
                  <th>证件号</th>
                  <th>乘客类型</th>
                  <th>票号</th>
                  <th>新票号</th>
                  <th>票的状态</th>
                </tr>
                <template v-if="orderByData && orderByData.tourist_list">
                <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx">
                  <td>{{item.tourist_name}}</td>
                  <td>{{item.identity_type_name}}</td>
                  <td>{{item.identity_no}}</td>
                  <td>{{item.tourist_type_name}}</td>
                  <td>{{item.ticket_nos}}</td>
                  <td>{{item.new_ticket_nos}}</td>
                  <td>{{item.ticket_status_name === '无状态'? '--': item.ticket_status_name}}</td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>

    <!--航班信息-->
    <div class="panel">
      <div class="hd">
        <h2>航班信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="el-table table-custom">
                <tr>
                  <th>航段</th>
                  <th>航班号</th>
                  <th width="150">出发地-目的地</th>
                  <th width="150">出发-到达时间</th>
                  <th>共享航司</th>
                  <th>机型</th>
                  <th>舱位</th>
                </tr>
                <template v-if="orderByData && orderByData.flight_detail">
                <tr v-if="orderByData" v-for="(item,idx) in orderByData.flight_detail" :key="idx">
                  <td>{{'第'+item.index_seg+'程'}}</td>
                  <td>{{item.flight_no}}</td>
                  <td>{{item.depart_city_name}} - {{item.arrive_city_name}}</td>
                  <td>
                    <p>{{item.depart_date}} {{item.depart_time}}</p> 
                    <p>至</p>
                    <p>{{item.arrive_date}} {{item.arrive_time}}</p>
                      <el-popover v-if="item.stop_num" placement="bottom" 
                        width="600"
                        trigger="hover" @show="getByFlightStopDetail(item.flight_no,item.depart_date,idx)">
                          <table class="flight-info-table">
                              <thead>
                                  <tr>
                                      <th>出发地</th>
                                      <th>出发时间</th>
                                      <th>经停地</th>
                                      <th>停留时间</th>
                                      <th>抵达地</th>
                                      <th>抵达时间</th>
                                  </tr>
                              </thead>
                              <tbody v-if="item.stop_point_list">
                                  <template>
                                      <tr>
                                          <td>{{item.stop_point_list.stop_infos[0].city_name}}</td>
                                          <td>{{item.stop_point_list.stop_infos[0].dep_time}}</td>
                                          <td>{{item.stop_point_list.stop_infos[1].city_name}}</td>
                                          <td>{{item.stop_point_list.stop_infos[1].arri_time}} - {{item.stop_point_list.stop_infos[1].dep_time}}</td>
                                          <td>{{item.stop_point_list.stop_infos[2].city_name}}</td>
                                          <td>{{item.stop_point_list.stop_infos[2].arri_time}}</td>
                                      </tr>
                                  </template>
                              </tbody>
                          </table>
                          <el-button type="text" slot="reference">经停</el-button>
                      </el-popover>
                  </td>
                  <td>{{item.share_airline_name}}</td>
                  <td>{{item.craft_type}}</td>
                  <td>{{item.seat_type}}</td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>




    <!--联系人信息-->
    <div class="panel">
      <div class="hd">
        <h2>联系人信息</h2>
      </div>
      <div class="bd">
          <div class="table-module">
              <table class="el-table table-custom">
                <tr>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>其他联系方式</th>
                </tr>
                <template v-if="orderByData && orderByData.contact">
                <tr>
                  <td>{{orderByData.contact.name}}</td>
                  <td>{{orderByData.contact.mobile}}</td>
                  <td>{{orderByData.contact.email}}</td>
                </tr>
                </template>
              </table>
          </div>
      </div>
    </div>


    <div class="footer-tool-bar">
      <!-- <el-button type="primary" size="large"
                 @click="ticketRefundTodo"
                 v-if="stepBar.type === 3 && stepBar.index === 1 &&  orderByData.order_type === 1">提交，查看退票费</el-button> -->
      <el-button size="large" @click="$router.replace('/order/flight')">返回</el-button>
    </div>

    <!-- 机票变更dlg -->
    <el-dialog title="申请机票变更" size="large" :visible.sync="inlandChangeLogVis">
      <template v-if="orderByData">
      <div class="legend" v-if="orderByData.change_rule">
        <p v-for="(obj,key,idx) in orderByData.change_rule" :key="idx" v-html="obj">
          {{key}}：{{obj}}
        </p>
      </div>
      <p class="tit">变更内容</p>
      <el-form :model="modifyForm">
        <el-form-item label="变更类型" required>
          <el-select  placeholder="请选择类型"  v-model="modifyForm.change_type">
            <el-option label="请选择类型" value=""></el-option>
            <el-option label="改期" value="1"></el-option>
            <el-option label="改签" value="2"></el-option>
            <el-option label="其他变更" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <p class="tit">选择乘客</p>
      <div class="table-module">
          <table class="el-table table-custom">
            <tr>
              <th width="50"><el-checkbox v-model="modifyForm.allcheck" @change="handleCheckAllChange">&nbsp;</el-checkbox></th>
              <th width="80">乘客姓名</th>
              <th width="80">乘客类型</th>
              <th width="180">证件号码</th>
              <th width="150">票号</th>
              <th>变更要求</th>
            </tr>
              <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx" v-if="orderByData.tourist_list">
                <td>
                  <el-checkbox-group v-model="modifyForm.tourist" @change="handleCheckedSingleChange">
                    <el-checkbox :label="idx" :disabled="item.ticket_status==2 ?false:true">&nbsp;</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{item.name}}</td>
                <td>{{item.tourist_type_name}}</td>
                <td>{{item.identity_no}}</td>
                <td class="tc">{{item.ticket_nos}}</td>
                <td>
                    <el-input type="textarea" v-model="item.change_msg" class="textarea"></el-input>
                  </td>
              </tr>
          </table>
      </div>
      <p class="tit">选择航段</p>
      <div class="table-module">
      <table class="el-table table-custom">
        <tr>
          <th width="50"><el-checkbox></el-checkbox></th>
          <th width="100">航班起飞时间</th>
          <th width="">航程信息</th>
          <th>航班号</th>
          <th>舱位</th>
        </tr>
        <tr  v-for="(item,idx) in orderByData.flight_detail" :key="idx">
          <td>
            <el-checkbox-group v-model="flight_dlg_arr">
              <el-checkbox :label="idx">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td>{{item.depart_date}} {{item.depart_time}}</td>
          <td>{{item.depart_city_name}} - {{item.arrive_city_name}}</td>
          <td>{{item.flight_no}}</td>
          <td>{{item.seat_type}}</td>
        </tr>
      </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inlandChangeLogVis = false">取 消</el-button>
        <el-button type="primary" @click="changeOrderSubmit">确 定</el-button>
      </div>
      </template>
    </el-dialog>

    <!-- 退废票dlg -->
    <el-dialog title="申请退/废票" size="large" :visible.sync="inlandRefundVis">
      <template v-if="orderByData">
      <div class="legend" v-if="orderByData.change_rule">
        <p v-for="(obj,key,idx) in orderByData.change_rule" :key="idx" v-html="obj">
          {{key}}：{{obj}}
        </p>
      </div>
      <p class="tit">选择乘客</p>
      <div class="table-module">
      <table class="el-table table-custom">
        <tr>
          <th width="50"><el-checkbox v-model="refundForm.allcheck" @change="refundCheckAllChange">&nbsp;</el-checkbox></th>
          <th width="80">乘客姓名</th>
          <th width="80">乘客类型</th>
          <th>票面价</th>
          <th>税费</th>
          <th>佣金</th>
          <th>结算价</th>
          <th width="150">票号</th>
        </tr>
        <tr v-for="(item,idx) in orderByData.tourist_list" :key="idx" v-if="orderByData.tourist_list">
          <td>
            <el-checkbox-group v-model="refundForm.tourist" @change="refundCheckedSingleChange">
              <el-checkbox :label="idx" :disabled="item.ticket_status ==2 ?false:true">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td>{{item.name}}</td>
          <td>{{item.tourist_type_name}}</td>
          <td>{{item.price}}</td>
          <td>{{item.tax}}</td>
          <td>{{item.profit}}</td>
          <td>{{item.settle_price}}</td>
          <td class="tc">{{item.ticket_nos}}</td>
        </tr>
      </table>
      </div>
      <p class="tit">退票信息</p>
      <el-form :model="refundForm" label-width="100px">
        <el-form-item label="退/废票类型" required>
          <el-select  placeholder="请选择类型"  v-model="refundForm.refund_type">
              <el-option label="请选择类型" value=""></el-option>
              <el-option label="【自愿退票】：客人自愿退票，按客规收取手续费" value="1"></el-option>
              <el-option label="【非自愿退票】：航班延误、取消，申请全退" value="2"></el-option>
              <el-option label="【升舱换开】申请全退" value="3"></el-option>
              <el-option label="【升舱换开】：名字错换开重出，申请全退" :value="4"></el-option>
              <el-option label="【非自愿退票】客人因病无法乘机，申请全退" value="5"></el-option>
              <el-option label="【非自愿退票】：其他退票情况" value="6"></el-option>
              <el-option label="【其他】：申请退回票款差价" value="7"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="退票说明">
          <el-input type="textarea" v-model="refundForm.refund_reason" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inlandRefundVis = false">取 消</el-button>
        <el-button type="primary" @click="ticketRefundTodo">确 定</el-button>
      </div>
      </template>
    </el-dialog>

    </div>
  </div>
</template>

<script>
	import { getFlightOrderDetails,
           flightOrderCancel,
           flightOrderChange,
           refundFlight,
           flightRefundFee,
           getInlandFlightStopDetail,
           flightTodo
         } from 'src/api/flight';

	export default {
		data() {
			return {
        operateType: 1, // 1）预订正常流程；2）取消预订；3）退票；4）变更（改签、二次购买快递、购买保险）
        orderByData:null,
        refundFee:null,
        orderinfo:null,
        checkarr:[],
        refund_type:0,
        stepBar:{
          type:1,
          index:1
        },
        loading:false,
        inlandChangeLogVis:false,
        modifyForm:{
          change_type:'',
          tourist:[],
          allcheck:false
        },
        inlandRefundVis:false,
        refundForm:{
          refund_type:'',
          refund_reason:'',
          tourist:[],
          allcheck:false,
        }
      }
		},
    watch:{
    },
		methods: {
      // 订单详情
      getByOrderDetail() {
        let params = {
          data:{
            order_id:this.$route.query.order_id
          },
        };

        getFlightOrderDetails({
          params: params,
          success: (params) => {
            let asyncObj = params.data;
            let {code, data, msg} =  params['data'];
            if(!code){
               console.log(data)
              this.orderByData = data;
              this.operateType =  this.orderByData.order_process;
            }else{
              this.$message.error(msg);
            }
          },
          showLoading: true
        });
          
      },
      // 取消订单
      getByOrderCancel(){

        this.$confirm('是否此取消订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let params = {
            data:{
              order_id:this.$route.query.order_id,
              cancel_reason:''
            }
          };

          flightOrderCancel({
            params: params,
            success: (params) => {
              let asyncObj = params.data;

              if(asyncObj.success){
                this.$message("订单取消成功！");
                this.operateType = 2;
                setTimeout(function() {
                  window.location.reload();
                }, 3000);

              }else{
                this.$message(asyncObj.msg);
              }
            },
            showLoading: true
          });

        });
      },
      // checked选择操作
      checkedSelect(val){
        let checkarr = this.checkarr,
            len = checkarr.length;

        if(!len){
          checkarr.push(val);
        }else{
          for(let i in checkarr){
            if(checkarr[i] == val){
              checkarr.splice(i,1);
            }
          }
        }
        this.checkarr = checkarr;
      },
      tuipiao(){
        this.$set(this.stepBar,'type',3);
        this.$set(this.stepBar,'index',1);
      },
      // 订单退票
      ticketRefundTodo(formName) {
      
        let ticket_list = [];
        let params = {};
        params.data = {};
        let tourist = this.refundForm.tourist;
        for(let i in tourist){
          let ticket_nos = this.orderByData.tourist_list[tourist[i]].ticket_nos;
          ticket_list.push(ticket_nos)
        }

        params.data.ticket_list = ticket_list;
        params.data.refund_type = this.refundForm.refund_type;
        params.data.refund_reason = this.refundForm.refund_reason;
        params.data.order_id = this.$route.query.order_id;


        if(!params.data.ticket_list.length){
            this.$message({
              message:'请至少选择一个退票乘机人！',
              type:'error'
            });
            return;
        }

        if(!params.data.refund_type){
            this.$message({
              message:'请选择退票方式！',
              type:'error'
            });
            return;
        }
      
        refundFlight({
          params: params,
          success: (params) => {
            let asyncObj = params.data;
            if(asyncObj.success){
              window.location.reload();
            }
            this.$message({
              message:asyncObj.msg,
              type:asyncObj.success?'success':'error'
            });
          },
          showLoading: true
        });

      },
      // 退票费查询
      ticketRefundFeeElement() {
        let params = {
            data:{
              order_id:this.$route.query.order_id,
              ticket_list:this.checkarr
            }
        };

        flightRefundFee({
          params: params,
          success: (params) => {
            let asyncObj = params.data;

            if(asyncObj.success){
              this.refundFee = asyncObj.data;
              this.operateType = 3;
            }else{
              this.$message(asyncObj.msg);
            }
          },
          showLoading: true
        });
        
      },
      // 出票
      ticketSubmit() {
        let params = {
            data:{
              order_id:this.$route.query.order_id
            },
            this_is_test:1
        };

        flightTodo({
          params: params,
          success: (params) => {
             console.log(params)
            let asyncObj = params.data;
            if(asyncObj.success){
              this.$message({
                message:'付款成功！',
                type:'success'
              });
              setTimeout(function(){window.location.reload();},1000);
            }else{
              this.$message({
                message:asyncObj.msg,
                type:'error'
              });
            }
          },
          showLoading: true
        });
      },
      // 订单变更
      changeOrderSubmit(){
        let change_list = [];
        let params = {};
        params.data = {};
        let tourist = this.modifyForm.tourist;
        for(let i in tourist){
          let ticket_nos = this.orderByData.tourist_list[tourist[i]].ticket_nos;
          let change_msg = this.orderByData.tourist_list[tourist[i]].change_msg;
          change_list.push({
            ticket_no:ticket_nos,
            change_msg:change_msg
          })
        }

        params.data.change_list = change_list;
        params.data.change_type = this.modifyForm.change_type;
        params.data.order_id = this.$route.query.order_id;
        params.this_is_test = 1;

        if(!params.data.change_list.length){
            this.$message({
              message:'请至少选择一个需变更乘机人！',
              type:'error'
            });
            return;
        }
         
        flightOrderChange({
          params: params,
          success: (params) => {
            let {msg,data,success} = params.data;
            if(success){
              this.$message('变更成功！');
            }else{
              this.$message(msg);
            }
            if(success){
              setTimeOut(function(){window.location.reload()},1000);
            }
          },
          showLoading: true
        });

      },
      // 复选框单全选操作
      handleCheckAllChange(event){
        let ticket_nos =[];
        let tourist_list = this.orderByData.tourist_list;
        for(let i in tourist_list){
          if(tourist_list[i].ticket_status == 2){
            let nos = Number(i);
            ticket_nos.push(nos);
          }
        }
        let midle  = event.target.checked ? ticket_nos : [];
        this.$set(this.modifyForm,'tourist',midle)

      },
      handleCheckedSingleChange(value){

        let checkedCount = value.length;
        let tourist_list = this.orderByData.tourist_list;
        let ticket_nos =[];
        for(let i in tourist_list){
          if(tourist_list[i].ticket_status == 2){
            let nos = Number(i);
            ticket_nos.push(nos);
          }
        }

        this.$set(this.modifyForm,'allcheck',checkedCount === ticket_nos.length)

      },
      refundCheckAllChange(event){
        let ticket_nos =[];
        let tourist_list = this.orderByData.tourist_list;
        for(let i in tourist_list){
          if(tourist_list[i].ticket_status == 2){
            let nos = Number(i);
            ticket_nos.push(nos);
          }
        }
        let midle  = event.target.checked ? ticket_nos : [];
        this.$set(this.refundForm,'tourist',midle)

      },
      refundCheckedSingleChange(value){
        let checkedCount = value.length;
        let tourist_list = this.orderByData.tourist_list;
        let ticket_nos =[];
        for(let i in tourist_list){
          if(tourist_list[i].ticket_status == 2){
            let nos = Number(i);
            ticket_nos.push(nos);
          }
        }

        this.$set(this.refundForm,'allcheck',checkedCount === ticket_nos.length);
      },
      // 航班经停
      getByFlightStopDetail(flight_no, depart_date, flightIndex) {
          let params = {
              data: {
                  flight_no: flight_no,
                  depart_date: depart_date
              }
          };

          if (this.orderByData.flight_info[flightIndex].stop_point_list) return;
          getInlandFlightStopDetail({
              params: params,
              success: (params) => {
                  let { data } = params['data'];
                  this.$set(this.orderByData.flight_info[flightIndex], 'stop_point_list', data);
              }
          });
      },
		},
		mounted() {
			this.getByOrderDetail();
		}
	};

</script>

<style scoped lang="less">
*{margin: 0;}
table{
    border-collapse:collapse;
    border-spacing:0;
    table-layout:fixed;
}
.pannel-order-detail{
  background-color: #fff;
  padding: 20px;

  .panel{
    margin-bottom: 20px;
    > .hd{
      h2{
        font-size: 18px;
        border-left: 5px solid #aa177a;
        padding-left: 15px;
        line-height: 20px;
      }
    }
    > .bd{
      padding: 10px 0;

      .gr{
        color: #45bb33;
      }

      .rd{
        color: #ff0d0d;
      }

      .og{
        color: #f60;
      }

      .wt{
        color: #999;
      }
    }
    .info-list{
      span{
        display: inline-block;
        margin: 0 20px 10px 0;
      }
      i{
        font-style: normal;
        color: #999;
      }
    }
  }
}

.table-custom{
	border-collapse:separate; 
	border-spacing:0;
	text-align: center;
	th{text-align: center;}
	.el-button.el-button--primary a{
		color: #fff;
  }
  .el-input{
    width: 80px;
  }
}
.popover-text{
  color: #0066FF;
  cursor: pointer;
}
.popover-table{
  table{
    width: 100%;
  }
  th,td{
    border:1px solid #ddd;
    padding: 10px 8px;
    text-align: left;
  }
  th{
    width: 100px;
    background-color: #f4f4f4;
  }
}
.refund-footer{
    text-align: center;
  }
  .refund-cont{
    text-align: center;

    p{
      margin-bottom: 15px;
    }
  }
.footer-tool-bar{
  margin-top: 20px;
  text-align: center;
}
.rule-info-box{
  h5{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .text{
    margin-top: 10px;
  }
}
.el-dialog{
  .tit{
    margin: 10px 0;
    font-weight: 700;
  }
  .el-dialog__body{
    padding: 0 20px !important;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
}
.el-tabs{
  box-shadow: none;
  .el-tabs__item{
    &.is-active{
      a{color: #b10c79;}
    }
    a{
      color: #999;
      display: block;
    }
  }
}
.legend{
  max-height: 150px;
  overflow: auto;
  padding: 10px;
  border: 1px solid #ccc;
  background:#ffffdd;
  .tips{
    color: #ff0d0d;
  }
}
.status-OS003{
  //待付款
  color:#eb4746;
}
.status-OS011{
  //已取消
  color:#999;
}
.status-OS009{
  //已出票
  color:#019f3e;
}
.status-OS037{
  //变更处理中
  color:#f23838;
}
.flight-info-table {
    width: 100%;
    font-size: 14px;
    th,
    td {
        padding: 6px 8px;
        text-align: center;
    }
    th {
        background-color: #f4f4f4;
    }
}
</style>
<style lang="less">
.el-dialog{
  .textarea{
    .el-textarea__inner{
      min-height: 60px !important;
    }
  }
}
</style>
