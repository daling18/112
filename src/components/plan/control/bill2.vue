<template>
  <div class="wrapper" v-if="billData">
    <div class="system-content">
      <div class="table-title no-border">
        <div class="title">
          <span class="color-orange">【{{ billData.tuan_info.tuan_no}}】</span>{{ billData.tuan_info.tuan_name}}</div>
        <table class="desc">
          <tr>
            <th>出发城市</th>
            <td colspan="3">{{ billData.tuan_info.departure_city }}</td>
          </tr>
          <tr>
            <th>出发日期</th>
            <td>{{ billData.tuan_info.departure_date }}</td>
            <th>返回日期</th>
            <td>{{ billData.tuan_info.back_date }}</td>
          </tr>
          <tr>
            <th>行程天数</th>
            <td>{{ billData.tuan_info.trip_days }}</td>
            <th>总收客</th>
            <td colspan="3">成人 {{ billData.tuan_info.adult_nums }} 儿童 {{ billData.tuan_info.child_nums }}</td>
          </tr>
        </table>
        <div class="btn-areas">
          <el-button type="primary" @click="goto()">查看行程</el-button>
          <el-button @click="goto()">打印行程</el-button>
        </div>

      </div>
      <div class="content-title-extend">
        <table class="total">
          <tr>
            <td colspan="3" class="border-right">
              <div class="ceil">预估收入&ensp;
                <span class="color-orange">￥</span>
                <span class="color-orange">{{ billData.total_income_amount }}</span>&ensp;元</div>
            </td>
            <td colspan="3" style="padding:20px;">
              <div class="ceil">预估成本&ensp;
                <span class="color-green">￥</span>
                <span class="color-green">{{ billData.total_cost_amount }}</span>&ensp;元</div>
            </td>
            <!-- <td><el-button type="text">查看成本结算单列表</el-button></td> -->
          </tr>
          <tr>
            <td colspan="2" class="border-right">
              <div class="ceil">单团毛利&ensp;
                <span class="common">{{ billData.tuan_profit }}&ensp;元</span>
              </div>
            </td>
            <td colspan="2" class="border-right">
              <div class="ceil">人均毛利&ensp;
                <span class="common">{{ billData.people_profit }}&ensp;元</span>
              </div>
            </td>
            <td colspan="2">
              <div class="ceil">毛利率&ensp;
                <span class="common">{{ billData.profit_rate }}</span>
              </div>
            </td>
            <!-- <td><el-button type="text">查看成本结算单列表</el-button></td> -->
          </tr>
        </table>
      </div>
      <div class="mod-form">
        <div class="title">
          <span class="fl">收入明细</span>
          <span class="zong">
            应收总金额：
            <span class="color-orange">
              ￥{{ billData.total_income_amount }}
            </span>
          </span>
          <el-button type="primary"
          class="dc"
          @click="dlShouru('income')">
            导出收入结算表
          </el-button>
        </div>
        <div class="imitate-table-outside">
          <ul class="imitate-table">
            <li class="hd">
              <b class="no">序号</b>
              <b class="comp">代理商/直客</b>
              <b class="c1">应收金额</b>
              <b class="c2">已收金额</b>
              <b class="qr">确认件/合同</b>
              <b class="id">订单编号</b>
              <b class="info">订单明细</b>
            </li>
            <li v-for="(item, index) in income_info_show" :key="index">
              <i class="no" :style="'line-height:' + (36 * item.lists.length + item.lists.length - 1) +'px'">{{index+1}}</i>
              <i class="comp" :title="item.distributor_org_name" :style="'line-height:' + (36 * item.lists.length + item.lists.length - 1) +'px; height:' + (36 * item.lists.length + item.lists.length - 1) +'px;'">{{item.distributor_org_name}}</i>
              <div class="group">
                <p class="g-li" v-for="(li, index) in item.lists" :key="index">
                  <i class="c1">￥{{li.rmb_total_amount}}</i>
                  <i class="c2">￥{{li.rmb_receipted_amount}}</i>
                  <i class="qr">
                    <em v-if="$menuPermission('api/tuan/contract_detail') && li.order_from == 3">
                      <!-- <router-link :to="{path:'/control/cost/tconfirm_hetong', query:{parent_id: li.tuan_id, id: li.id, type:1, condition:'into'}}">
                        合同
                      </router-link> -->
                      <router-link :to="{path:'/control/pager-contract', query:{tuan_id: li.tuan_id, order_no: li.order_no, edit: 3}}">
                        合同
                      </router-link>
                    </em>
                    <em v-if="$menuPermission('api/tuan/confirm_piece') && li.order_from == 1">
                      <em v-if="billData.tuan_info.lock_fund == 0">
                        <router-link v-if="li.confirm_is_new === 0 && (li.order_no == '' || li.order_no != '--')" :to="{path:'/control/cost/tconfirm', query:{parent_id: li.tuan_id, id: li.id, type:1}}">
                          确认件
                        </router-link>
                        <router-link v-if="li.confirm_is_new === 1 && (li.order_no == '' || li.order_no != '--')" :to="{path:'/control/cost/tconfirm2', query:{parent_id: li.tuan_id, id: li.id}}">确认件</router-link>
                        <span v-if="li.order_no == '' || li.order_no == '--'">--</span>
                      </em>
                      <em v-else>
                        <router-link v-if="li.confirm_is_new === 0 && (li.order_no == '' || li.order_no != '--')" :to="{path:'/control/cost/tconfirm', query:{parent_id: li.tuan_id, id: li.id, type:1, condition:'into', view: 'disabled'}}">
                          确认件
                        </router-link>
                        <router-link v-if="li.confirm_is_new === 1 && (li.order_no == '' || li.order_no != '--')" :to="{path:'/control/cost/tconfirm2', query:{parent_id: li.tuan_id, id: li.id}}">确认件</router-link>
                        <span v-if="li.order_no == '' || li.order_no == '--'">--</span>
                      </em>
                    </em>
                    <em v-if="$menuPermission('api/tuan/confirm_piece') && li.order_from == 2">
                      <a v-if="li.confirm_file" :href="li.confirm_file" target="_blank">确认件</a>
                      <span v-else>--</span>
                    </em>
                    <em v-if="!$menuPermission('api/tuan/confirm_piece') && (li.order_from == 1 || li.order_from == 2)">--</em>
                  </i>
                  <i class="id">{{li.order_no}}</i>
                  <i class="info">
                    <el-popover trigger="hover">
                      <template>
                        <el-table :data="li.detail" style="width: 100%">
                          <el-table-column prop="item_name" label="收入项" align="center" width="100">
                          </el-table-column>
                          <el-table-column prop="num" label="数量" align="center" width="100">
                          </el-table-column>
                          <el-table-column prop="rmb_unit_price" label="价格" align="center" width="100">
                            <template slot-scope="scope">￥{{scope.row.rmb_unit_price}}</template>
                          </el-table-column>
                        </el-table>
                      </template>
                      <em class="info-inside" slot="reference">查看</em>
                    </el-popover>
                  </i>
                </p>
              </div>
            </li>
            <template v-if="billData.income_info.length > 5">
              <li class="more"
              v-if="income_show_status"
              @click="show_more('income', income_show_status)">
                <em class="el-icon-caret-bottom"></em>
                <span>显示更多</span>
              </li>
              <li class="more"
              v-else
              @click="show_more('income', income_show_status)">
                <em class="el-icon-caret-top"></em>
                <span>隐藏更多</span>
              </li>
            </template>
          </ul>
        </div>
        <!-- <template v-if="billData.income_info.length > 1">
          <div class="demo-block-control" @click="show_more('income',income_show_status)" v-if="income_show_status">
            <i class="el-icon-caret-bottom"></i>
            <span>显示更多</span>
          </div>
          <div class="demo-block-control" @click="show_more('income',income_show_status)" v-else>
            <i class="el-icon-caret-top"></i>
            <span>隐藏更多</span>
          </div>
        </template> -->
        <!-- <div class="table-box" style="margin-top: 30px">
          <el-table :data="income_info_show">
            <el-table-column type="index" label="序号" align="center" width="80">
            </el-table-column>
            <el-table-column prop="distributor_org_name" label="代理商／直客" align="center">
            </el-table-column>
            <el-table-column label="应收金额" align="right">
              <template slot-scope="scope">
                <span class="color-orange">￥{{scope.row.rmb_total_amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="已收金额" align="right">
              <template slot-scope="scope">￥{{scope.row.rmb_receipted_amount}}</template>
            </el-table-column>
            <el-table-column label="确认件/合同" align="center">
              <template slot-scope="scope">
                <template v-if="$menuPermission('api/tuan/contract_detail') && scope.row.order_from == 3">
                  <router-link :to="{path:'/control/cost/tconfirm_hetong', query:{parent_id:scope.row.tuan_id, id:scope.row.id, type:1, condition:'into'}}">
                    合同
                  </router-link>
                </template>
                <template v-if="$menuPermission('api/tuan/confirm_piece') && scope.row.order_from == 1">
                  <div v-if="billData.tuan_info.lock_fund == 0">
                    <router-link :to="{path:'/control/cost/tconfirm', query:{parent_id:scope.row.tuan_id, id:scope.row.id, type:1}}">
                      确认件
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link :to="{path:'/control/cost/tconfirm', query:{parent_id:scope.row.tuan_id, id:scope.row.id, type:1, condition:'into', view: 'disabled'}}">
                      确认件
                    </router-link>
                  </div>
                </template>
                <template v-if="$menuPermission('api/tuan/confirm_piece') && scope.row.order_from == 2">
                  <a :href="scope.row.confirm_file" target="_blank">确认件</a>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="order_no" label="订单编号" align="left">
            </el-table-column>
            <el-table-column prop="recieve_account_bank" label="订单明细" align="center">
              <template slot-scope="prop">
                <el-popover trigger="hover">
                  <el-table :data="prop.row.detail" style="width: 100%">
                    <el-table-column prop="item_name" label="收入项" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="num" label="数量" align="center" width="100">
                    </el-table-column>
                    <el-table-column label="价格" align="center" width="100">
                      <template slot-scope="scope">￥{{scope.row.rmb_unit_price}}</template>
                    </el-table-column>
                  </el-table>
                  <a href="javascript:;" slot="reference">查看</a>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <template v-if="billData.income_info.length>5">
            <div class="demo-block-control" @click="show_more('income',income_show_status)" v-if="income_show_status">
              <i class="el-icon-caret-bottom"></i>
              <span>显示更多</span>
            </div>
            <div class="demo-block-control" @click="show_more('income',income_show_status)" v-else>
              <i class="el-icon-caret-top"></i>
              <span>隐藏更多</span>
            </div>
          </template>
        </div> -->
        <div class="title">
          <span class="fl">成本明细</span>
          <span class="zong">应付总金额：
            <span class="color-orange">￥{{ billData.total_cost_amount }}</span>
          </span>
          <el-button type="primary"
          class="dc"
          @click="dlShouru('cost')">
            导出成本结算表
          </el-button>
        </div>
        <div class="imitate-table-outside">
          <ul class="imitate-table cost">
            <li class="hd">
              <b class="no">序号</b>
              <b class="comp">供应商</b>
              <b class="c1">应付金额</b>
              <b class="c2">已付金额</b>
              <b class="qr">确认件/合同</b>
              <b class="id">项目类型</b>
              <b class="info">项目名称</b>
            </li>
            <li v-for="(item, index) in cost_info_show" :key="index">
              <i class="no" :style="'line-height:' + (36 * item.lists.length + item.lists.length - 1) +'px'">{{index+1}}</i>
              <i class="comp" :title="item.supplier_org_name" :style="'line-height:' + (36 * item.lists.length + item.lists.length - 1) +'px; height:' + (36 * item.lists.length + item.lists.length - 1) +'px;'">{{item.supplier_org_name}}</i>
              <div class="group">
                <p class="g-li" v-for="(li, index) in item.lists" :key="index">
                  <i class="c1">￥{{li.rmb_total_amount}}</i>
                  <i class="c2">￥{{li.rmb_payed_amount}}</i>
                  <i class="qr">
                    <template v-if="$menuPermission('api/tuan/confirm_piece')">
                      <div v-if="billData.tuan_info.lock_fund == 0">
                        <router-link :to="{path:'/control/cost/tconfirm', query:{parent_id:li.tuan_id, id:li.id, type:2}}">
                          确认件
                        </router-link>
                      </div>
                      <div v-else>
                        <router-link :to="{path:'/control/cost/tconfirm', query:{parent_id:li.tuan_id, id:li.id, type:2, condition:'into', view: 'disabled'}}">
                          确认件
                        </router-link>
                      </div>
                    </template>
                    <template v-else>--</template>
                  </i>
                  <i class="id">{{li.item_type_name}}</i>
                  <i class="info">
                    <p class="ellipsis" :title="li.item_name">
                      {{li.item_name}}
                    </p>
                  </i>
                </p>
              </div>
            </li>
            <template v-if="billData.cost_info.length > 5">
              <li class="more"
              v-if="cost_show_status"
              @click="show_more('cost', cost_show_status)">
                <em class="el-icon-caret-bottom"></em>
                <span>显示更多</span>
              </li>
              <li class="more"
              v-else
              @click="show_more('cost', cost_show_status)">
                <em class="el-icon-caret-top"></em>
                <span>隐藏更多</span>
              </li>
            </template>
          </ul>
        </div>
        <!-- <div class="table-box">
          <el-table :data="cost_info_show">
            <el-table-column type="index" label="序号" align="center" width="80">
            </el-table-column>
            <el-table-column prop="supplier_org_name" label="供应商" align="center">
            </el-table-column>
            <el-table-column label="应付金额" align="right">
              <template slot-scope="scope">
                <span class="color-orange">￥{{scope.row.rmb_total_amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="已付金额" align="right">
              <template slot-scope="scope">￥{{scope.row.rmb_payed_amount}}</template>
            </el-table-column>
            <el-table-column label="确认件/合同" align="center">
              <template slot-scope="scope">
                <template v-if="$menuPermission('api/tuan/confirm_piece')">
                  <div v-if="billData.tuan_info.lock_fund == 0">
                    <router-link :to="{path:'/control/cost/tconfirm', query:{parent_id:scope.row.tuan_id, id:scope.row.id, type:2}}">
                      确认件
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link :to="{path:'/control/cost/tconfirm', query:{parent_id:scope.row.tuan_id, id:scope.row.id, type:2, condition:'into', view: 'disabled'}}">
                      确认件
                    </router-link>
                  </div>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="item_type_name" label="项目类型" align="center">
            </el-table-column>
            <el-table-column prop="item_name" label="项目名称" align="center">
            </el-table-column>
          </el-table>
          <template v-if="billData.cost_info.length>5">
            <div class="demo-block-control" @click="show_more('cost',cost_show_status)" v-if="cost_show_status">
              <i class="el-icon-caret-bottom"></i>
              <span>显示更多</span>
            </div>
            <div class="demo-block-control" @click="show_more('cost',cost_show_status)" v-else>
              <i class="el-icon-caret-top"></i>
              <span>隐藏更多</span>
            </div>
          </template>

        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getGroupBillDetail, tuanExportIncomeWord, tuanExportCostWord } from 'src/api/api';
export default {
  data() {
    return {
      billData: null,
      income_info_show: [],
      cost_info_show: [],
      income_show_status: true,
      cost_show_status: true
    }
  },
  methods: {
    show_more(type, status) {
      if (type == 'income' && status) {
        this.income_info_show = this.billData.income_info;
        this.income_show_status = !status;
      }
      if (type == 'income' && !status) {
        this.income_info_show = this.billData.income_info.slice(0, 5);
        this.income_show_status = !status;
      }
      if (type == 'cost' && status) {
        this.cost_info_show = this.billData.cost_info;
        this.cost_show_status = !status;
      }
      if (type == 'cost' && !status) {
        this.cost_info_show = this.billData.cost_info.slice(0, 5);
        this.cost_show_status = !status;
      }
    },
    getGroupBillDetailHandler() {
      let params = {
        data: {
          id: this.$route.query.id
        }
      };
      getGroupBillDetail({
        params: params,
        success: (params) => {
          let { code, data, msg } = params['data'];
          this.loading = false;
          if (code == 0) {
            this.billData = data;
            this.income_info_show = this.billData.income_info.slice(0, 5);
            this.cost_info_show = this.billData.cost_info.slice(0, 5);
          } else {
            this.$message.error(msg);
          }
        },
        showLoading: true
      });
    },
    dlShouru(type){
      let params = {
        data: {
          id: this.$route.query.id
        }
      }
      if(type == 'income'){
        tuanExportIncomeWord({
          params: params,
          success: (params) => {
            if(params.data.code == 0){
              window.location.href = params.data.data.url
            }else{
              this.$message({
                message: params.data.msg,
                type: 'error'
              });
            }
          }
        });
      }else if(type == 'cost'){
        tuanExportCostWord({
          params: params,
          success: (params) => {
            if(params.data.code == 0){
              window.location.href = params.data.data.url
            }else{
              this.$message({
                message: params.data.msg,
                type: 'error'
              });
            }
          }
        });
      }
    }
  },
  mounted() {
    this.getGroupBillDetailHandler();
  }
}
</script>

<style scoped lang="scss">
.record-title {
  display: block;
  margin: 20px;
  text-align: left;
  font-size: 14px;
  font-size: 18px;

  th {
    color: #777;
    font-weight: 400;
    text-align: left;
  }
  td {
    padding-right: 20px;
    text-align: left;
    color: #555;
  }
}

.estimate {
  width: 100%;
  text-align: center; //border-collapse:separate;
  td {
    border: 1px solid #eee;
  }
}

.form {
  .title {
    padding-left: 14px;
    margin: 0 0 20px 20px;
    border-left: 2px solid purple;
  }
  .table-box {
    margin: 20px;
  }
  .btn-areas {
    margin-left: 20px;
  }
}

.desc {
  color: #999;
}
.title .zong{
  float: left;
  margin: 0 20px 0 30px;
  color: #999;
}
.title .dc{
  float: right;
  width: 125px;
}
</style>
