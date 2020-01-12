<template>
<div class="wrapper">
  <div class="system-content">
    <div class="table-title no-border" v-if="imComeData.tuan_info">
      <div class="title">
        <span class="color-purple">【{{imComeData.tuan_info.tuan_no}}】</span>
        {{imComeData.tuan_info.tuan_name}}</div>
      <table class="desc">
					<template v-if="imComeData.tuan_info.type != 4">
            <!-- 非单项 -->
            <tr>
              <th>出发城市</th>
              <td colspan="3">{{ imComeData.tuan_info.departure_city }}</td>
            </tr>
            <tr>
              <th>出发日期</th>
              <td>{{ imComeData.tuan_info.departure_date}}</td>
              <th>返回日期</th>
              <td>{{imComeData.tuan_info.back_date}}</td>
            </tr>
					</template>
          <template v-else>
						<!-- 单项 -->
						<tr>
							<th>计调负责人</th>
							<td>{{imComeData.tuan_info.op_name}}</td>
						</tr>
						<tr>
							<th>单项类型</th>
							<td>{{imComeData.tuan_info.single_type_name}}</td>
						</tr>
          </template>
        </table>
        <div class="btn-areas">
          <el-button type="primary"  @click="goto()">查看行程</el-button>
          <el-button @click="goto()">打印行程</el-button>
        </div>
    </div>
  </div>
  <div class="system-content">
    <div class="search-content">
      <div class="clearfix">
        <el-col :span="8" class="search-item">
          应收款（本位币）：<span class="color-orange">&yen; </span><span class="color-orange">{{imComeData.rmb_total_amount}}</span>
          &nbsp;&nbsp;
        </el-col>
        <el-col :span="16" class="text-right">
          <el-button 
            v-if="$menuPermission('api/tuan/add_income')" 
            type="primary" 
            size="long" 
            style="margin-left:10px;" 
            @click="incomeModify"
          >+ 添加收入应收款</el-button>
          <router-link 
            v-if="$menuPermission('api/tuan/operator_add_receipt')" 
            class="el-button el-button--primary" 
            :to="{path: '/control/income/receipt', query: {parent_id: imComeData.tuan_info && imComeData.tuan_info.id, action: 1}}"
          >+ 添加收款</router-link>
        </el-col>
      </div>
      <div style="padding-top: 10px;">
        收入类型
        <el-select placeholder="请选择" v-model="filters.bill_type" style="width:150px;">
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="(obj,key) in imComeData.bill_type_lists"
            :key="key"
            :label="obj" :value="Number(key)"></el-option>
        </el-select>
        <template v-if="imComeData.tuan_info">
          <template v-if="imComeData.tuan_info.type != 4">
            确认状态
            <el-select placeholder="请选择" v-model="filters.order_status" style="width:150px;">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="(obj,key) in imComeData.order_status_lists"
                :key="key"
                :label="obj" :value="Number(key)"></el-option>
            </el-select>
          </template>
        </template>
        是否开票
        <el-select placeholder="请选择" v-model="filters.invoice_flag" style="width:150px;">
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="(obj,key) in imComeData.invoice_flag_list"
            :key="key"
            :label="obj" :value="Number(key)"></el-option>
        </el-select>
        <div v-if="multipleCheckType && $menuPermission('api_supplier/tuan/press_bill')" style="display: inline-block; padding-left: 10px;">
          <el-button @click="handlePressDig" type='text' class="color-purple">催款</el-button>
          <el-button @click="handleCancelSupplierPress" type='text' class="color-purple">取消</el-button>
        </div>
        <el-button
          v-show="!multipleCheckType"
          type='text'
          class="color-purple"
          @click="multipleCheckType = true">
          批量催款
        </el-button>
      </div>
    </div>
    <div class="content-list">
      <div class="mode-table">
          <el-table
            v-if="imComeData.lists"
            :data="imComeData.lists.data"
            border
            ref="multipleList"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              v-if="multipleCheckType"
              type="selection"
              :selectable='isAddApplied'
              fixed='left'
              width="55">
            </el-table-column>
             <el-table-column
              prop='id'
              label='应收ID'
              width='100'
              align='left'>
            </el-table-column>
            <el-table-column
              prop='bill_type_name'
              label='收入类型'
              width='80'
              align='center'>
            </el-table-column>
            <el-table-column
              prop='order_no'
              label='订单编号'
              width='180'
              align='center'>
            </el-table-column>
            <el-table-column
              prop='item_name'
              label='项目类型'
              width='120'
              align='center'>
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.item_type_name">
									{{scope.row.item_type_name}}
								</div>
              </template>
            </el-table-column>
            <el-table-column
              prop='item_name'
              label='项目名称'
              width='180'
              align='center'>
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.item_name">
									{{scope.row.item_name}}
								</div>
              </template>
            </el-table-column>
            <el-table-column
              prop='rmb_total_amount'
              label='应收金额'
              width='150'
              align='right'>
              <template slot-scope="scope">
                <div class="color-orange">
                  <span v-if="scope.row.invoice_flag_name && scope.row.order_from != 2">[{{scope.row.invoice_flag_name}}]</span>￥{{scope.row.rmb_total_amount}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop='no_receipted_amount'
              label='未收'
              width='150'
              header-align='center'
              align='right'>
                <template slot-scope="scope">
                  <div class="color-orange">
                    <el-popover
                      placement="bottom"
                      ref="popover4"
                      :open-delay="500"
                      trigger="hover">
                      <div v-for="(item, index) in pressInfo" :key='index' class="pressinfoitem">
                        <div style='margin-bottom: 10px;'>{{item.content}}</div>
											  <div>{{item.create_time}}</div>
                      </div>
                      <span slot="reference">
                        <span @mouseover="getBillPressContent(scope)" v-if="scope.row.is_press === 1">[催]</span>
                      </span>
                    </el-popover>
                    ￥{{scope.row.no_receipted_amount}}
                  </div>
                </template>
            </el-table-column>
            <el-table-column
              label='直客／代理商(结算方)'
              align='center'
              min-width='250'>
              <template slot-scope="scope">
                <div class="ellipsis" :title="scope.row.distributor_org_name">
									{{scope.row.distributor_org_name}}
								</div>
              </template>
            </el-table-column>
            <el-table-column
              prop='rmb_unit_price'
              label='单价'
              width='150'
              align='center'>
              <template slot-scope="scope">
                <span>
                  {{scope.row | formatPriceCol}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop='currency_rate'
              label='转换汇率'
              width='120'
              align='center'>
            </el-table-column>
            <el-table-column
              prop='num'
              label='数量'
              width='80'
              align='center'>
            </el-table-column>
            <el-table-column
              prop='remark'
              label='说明'
              width='180'
              align='center'>
            </el-table-column>
            <el-table-column
              prop=''
              label='操作'
              width='150'
              align='center'
              fixed='right'>
              <template slot-scope="scope">
                <div v-if="!($menuPermission('api/tuan/add_income') && scope.row.bill_type !== 1) && !($menuPermission('api/tuan/del_income') && scope.row.order_no == '--') && !($menuPermission('api/tuan/contract_detail') && scope.row.order_from == 3) && !($menuPermission('api/tuan/confirm_piece'))">--</div>
                <div v-else>
                  <span v-if="!(($menuPermission('api/tuan/add_income') && scope.row.bill_type !== 1) || ($menuPermission('api/tuan/del_income') && scope.row.order_no == '--')) && ($menuPermission('api/tuan/confirm_piece') && scope.row.order_from == 2 && scope.row.order_no != '--') && !scope.row.confirm_file">--</span>
                  <el-dropdown trigger="click" v-else>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="$menuPermission('api/tuan/add_income') && scope.row.bill_type !== 1 && scope.row.order_no == '--'" @click.native="incomeModify(scope)">编辑</el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('api/tuan/del_income') && scope.row.order_no == '--'" @click.native="incomeDelete(scope)">删除</el-dropdown-item>
                      <el-dropdown-item v-if="$menuPermission('api/tuan/contract_detail') && scope.row.order_from == 3" >
                        <!-- <router-link :to="{path: '/control/cost/confirm_hetong', query:{parent_id:imComeData.tuan_info.resource_id,id:scope.row.id,type:1, condition:'into'}}"> -->
                        <router-link :to="{path: '/control/pager-contract', query:{'order_no':scope.row.order_no, 'tuan_id':imComeData.tuan_info.id, 'edit': '3'}}">直客合同</router-link>
                      </el-dropdown-item>
                      <template v-if="imComeData.tuan_info.type != 4">
                        <el-dropdown-item
                          v-if="$menuPermission('api/tuan/confirm_piece') && scope.row.order_from == 1 && scope.row.order_no != '--' && scope.row.confirm_is_new == 0">
                          <router-link :to="{path:'/control/cost/iconfirm', query:{parent_id:imComeData.tuan_info.resource_id,id:scope.row.id,type:1}}">确认件</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item
                          v-if="$menuPermission('api/tuan/confirm_piece') && scope.row.order_from == 2 && scope.row.order_no != '--' && scope.row.confirm_file">
                          <a :href="scope.row.confirm_file" target="_blank">确认件</a>
                        </el-dropdown-item>
                        <!-- 新的确认件链接 is_new=1 -->
                        <el-dropdown-item
                          v-if="$menuPermission('api/tuan/confirm_piece') && scope.row.order_from == 1 && scope.row.order_no != '--' && scope.row.confirm_is_new == 1">
                          <router-link :to="{path: '/control/confirm-file', query: { parent_id: imComeData.tuan_info.id, id:scope.row.order_id }}">确认件</router-link>
                        </el-dropdown-item>
                      </template>
                      <el-dropdown-item v-if="$menuPermission('api/tuan/save_order_gathering')" @click.native="addShoukuan(scope)">添加收款</el-dropdown-item>
                      <el-dropdown-item>
                        <!-- oid的值来源，其他部分是取order_no，仅此处是bill_id -->
                        <router-link
                          :to="{ path: '/control/income-detail', query: {aid:imComeData.tuan_info.a_id, bid:scope.row.id}}"
                          v-if="$menuPermission('api/tuan/op_income_info')"
                        >查看收入</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.invoice_flag == 0">
                        <router-link :to="{path: '/control/add-invoice', query: {id: scope.row.id, type: 1}}" class="span-btn">申请开票</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.invoice_detail_flag == 1">
                        <router-link :to="{path: '/control/invoice_detail', query: {bid: scope.row.id, type: 1}}" class="span-btn">查看开票详情</router-link>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
  </div>

  <!--工具条-->
  <div class="page">
    <el-pagination layout="prev, pager, next" @current-change="currentPageChange" :total="pagination.total_count" />
  </div>


  <!--编辑收入弹窗-->
  <el-dialog
    title="收入操作"
    :visible.sync="incomeVisible"
    :before-close="cancelDiagIncome"
    :close-on-click-modal="false">
    <el-form 
      :rules="rules" 
      :model="is_scope.bills_info"
      ref="incomeForm"
      label-width="160px"
      v-if="is_scope.bills_info"
      style="width:90%;"
    >
      <el-form-item label="直客／代理商" prop="distributor_org_name">
        <select-org v-model="orgination" placeholder="请选择直客或者代理商" :defaultList="is_scope.org_info"/>
      </el-form-item>
      <el-form-item label="项目名称" prop="item_name">
        <el-input v-model="is_scope.bills_info.item_name" />
      </el-form-item>
      <el-form-item label="收入类型" prop="bill_type">
        <el-select placeholder="请选择" v-model="is_scope.bills_info.bill_type">
          <el-option
            v-for="(obj, key) in is_scope.bill_type"
            :key="key"
            :label="obj"
            :value="Number(key)">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="num">
        <input-number  v-model="is_scope.bills_info.num" />
      </el-form-item>
      <el-form-item label="单价" required>
        <el-col :span="8">
          <el-form-item prop="unit_price">
            <input-number  v-model="is_scope.bills_info.unit_price" :precision="3" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="huobizu">
          <currency-picker 
            v-model="is_scope.bills_info.currency"
            placeholder="选择货币"
            readonly="readonly">
          </currency-picker>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="currency_rate">
            <input-number 	v-model="is_scope.bills_info.currency_rate" :precision="4" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 合计 -->
      <el-form-item label="合计" class="mb0 item-lh">
        {{(is_scope.bills_info.num * is_scope.bills_info.unit_price) | formatPrice}}     
        （公式：数量*单价）   
      </el-form-item>
      <!-- /合计 -->
      <!-- <el-form-item label="结算币种/汇率" required>
        <el-col :span="11" style="margin-right:10px;">
          <currency-picker  v-model="is_scope.bills_info.currency" placeholder="选择货币" readonly="readonly"></currency-picker>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="currency_rate">
            <el-input
            v-model="is_scope.bills_info.currency_rate"
            type="number">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <!-- <el-form-item label="结算金额" prop="total_amount">
        <el-input
        v-model="is_scope.bills_info.total_amount"
        type="number"
        onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
        </el-input>
      </el-form-item> -->
      <el-form-item label="应收金额（本位币）">
        &yen;
        {{(is_scope.bills_info.num *  is_scope.bills_info.unit_price * is_scope.bills_info.currency_rate) | formatPrice}}
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input type="textarea" v-model="is_scope.bills_info.remark" style="margin-top: 6px;" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="incomeConfirmGiveup('incomeForm')">取 消</el-button>
      <el-button type="primary" @click="incomeConfirm('incomeForm')">确 定</el-button>
    </span>
  </el-dialog>
  <!--删除收入弹窗-->
  <el-dialog
    title="收入删除"
    :visible.sync="incomeDelVisible"
    size="tiny">
    <span>删除后，将无法还原删除的数据，确认删除收入项？ </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="incomeDelVisible=false">取 消</el-button>
      <el-button type="primary" @click="incomeDelAffirm" :disabled="incomeDelBtnStatus">确 定</el-button>
    </span>
  </el-dialog>
  <!--添加收款弹窗-->
  <el-dialog
    title="添加收款"
    :visible.sync="addShoukuanVisible"
    :before-close="cancelDiagShoukuan"
    :close-on-click-modal="false">
    <el-form
      :rules="shoukuanRules"
      :model="shoukuan"
      ref="shoukuanForm"
      label-width="140px"
      style="width:90%;"
    >
      <el-form-item label="收款人"
        prop="name"
        class="mb0 oh"
      >
        {{shoukuan.name}}
      </el-form-item>
      <el-form-item label="所属组织"
        prop="org"
        class="mb0 mt-5"
      >
        {{shoukuan.org}}
      </el-form-item>
      <el-form-item label="收款类型"
        prop="user_collection_type"
      >
        <el-select v-model="shoukuan.user_collection_type"
          disabled
          placeholder="请选择"
          class="w100per"
        >
          <el-option label="团队订单收入" value="1">
          </el-option>
          <el-option label="团队杂费收入" value="2">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款金额"
          class="mb0"
          required
      >
        <el-col :span="8">
          <el-form-item prop="total_amount">
            <input-number  v-model="shoukuan.total_amount" placeholder="请输入数字" :precision="3" />
          </el-form-item>
        </el-col>
        <el-col :span="8" class="huobizu">
          <currency-picker 
            v-model="shoukuan.currency"
            placeholder="选择货币"
            readonly="readonly">
          </currency-picker>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="currency_rate">
            <input-number 	v-model="shoukuan.currency_rate" placeholder="汇率" :precision="4" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="收款(本位币)"
      >
        <template v-if="shoukuan.total_amount && shoukuan.currency_rate">
          {{(shoukuan.total_amount * shoukuan.currency_rate) | formatPrice}}
        </template>
        <template v-else>
          --
        </template>
      </el-form-item>
      <el-form-item label="收款方式/账户"
        prop="account_id"
        class="mt-10"
      >
        <el-select v-model="shoukuan.account_id" 
          filterable 
          placeholder="请选择"
          class="w100per"
        >
          <el-option
            v-for="item in accountRemoteList"
            :key="item.id"
            :label="item.account_info"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款日期"
        prop="payment_date"
      >
        <el-date-picker type="date" 
          placeholder="选择日期" 
          v-model="shoukuan.payment_date" 
          :editable="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上传收款凭证"
        prop="attachment"
      >
        <div class="hide-list"  v-loading.body="loading">
          <el-upload class="upload-demo" action="/bom/api/finance/upload_img" name="image[]" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="shoukuan.attachment" :on-success="uploadsucc"  :before-upload="beforeUpload">
            <el-button size="small">选择本地文件</el-button>
            <span slot="tip" class="el-upload__tip">&ensp;仅支持jpeg、png、jpg、pdf格式，不可超过10份</span>
          </el-upload>
        </div>
        <ul class="el-upload-list el-upload-list--text" v-if="shoukuan.attachment.length>0">
          <li class="el-upload-list__item is-success" v-for="file in shoukuan.attachment" :key="file.id">
            <a class="el-upload-list__item-name" :href="file.url" target="_blank">
              <i class="el-icon-document"></i>{{file.name}}
            </a>
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-circle-check"></i>
            </label><i class="el-icon-close" @click="diyRemove(file.id)"></i>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="备注说明" prop="remark">
        <el-input type="textarea" v-model="shoukuan.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="shoukuanConfirmGiveup('shoukuanForm')">取 消</el-button>
      <el-button type="primary" @click="shoukuanConfirm('shoukuanForm')" :disabled="shoukuanBtnDis">保 存</el-button>
    </span>
  </el-dialog>
  <!-- 催款 -->
  <el-dialog title="催款" :visible.sync="pressDlg">
    <el-form
      label-width="140px"
      style="width:90%;">
      <el-form-item
        required
        label="催款说明"
        class="mb0 oh">
        <el-input v-model="pressBillData.remark" type='textarea'></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCanclePressDig">取 消</el-button>
      <el-button @click="supplierPressBill" type="primary">保 存</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
  import * as format from 'src/utils/format';
  import { currency_data } from 'src/configuration/currency';
  import {getIncomeList,
          getIncomeForm,
          setIncomeForm,
          delIncomeForm,
          getPaymentAccount,
          saveOrderGathering,
          getUserName} from 'src/api/api';
  import {supplierPressBill} from 'src/api/supplier'
  import {getBillPressContent} from 'src/api/tuan'
  import SelectOrg from 'src/plugins/SelectOrg.vue';
  import InputNumber from 'src/plugins/InputNumber.vue';
  import CurrencyPicker from 'src/plugins/currency-picker/index.vue';

  export default {
    components: {
      CurrencyPicker,
      SelectOrg,
      InputNumber
    },
    filters: {
      formatPrice(price){
        const num = price || 0;

        return Number(format.toFixed(num, 3));
      },
      formatPriceCol(row){
        let currency = '-', unitPrice = '-';

        if(!row.order_no || row.order_no == '--'){
          currency = row.currency;
          unitPrice = row.unit_price;
        }
        return `${currency} ${unitPrice}`
      }
    },
    data() {
      let validatePrice = (rule, value, callback) => {
        if (value && !/^\d+$|^(\d+\.?\d+)$/.test(value)) {
          callback(new Error('请输入正确的数值'));
        } else {
          callback();
        }
      };
      let limitMax = (rule, value, callback) => {
        if (value > 100000000) {
          callback(new Error('请输入小于100000000的数值'));
        }else{
          callback();
        }
      };
      let positiveInteger = (rule, value, callback) => {
        if(value.toString().indexOf('.') != -1){
          callback(new Error('请输入整数'))
        }else if(value.toString().indexOf('-') != -1){
          callback(new Error('请输入正数'))
        }else{
          callback();
        }
      };
      return {
        currency_data,
        value:'',
        incomeVisible:false,
        incomeDelVisible: false,
        incomeDelBtnStatus: false,
        incomeDelRow: '',
        org_info:[],
        is_scope:{},
        imComeData:{},
        filters: {
          item_type: '',
          bill_type: '',
          order_status: '',
          invoice_flag: ''
        },
        tableList:[],
        pagination:{
          total_count:0,
          total_page: 0,
          page_size:15,
          page_index: 1,
        },
        rules:{
          bill_type: [{ 
            type: 'number',
            required: true,
            message: '请选择收入类型',
            trigger: 'blur' 
          }],
          distributor_org_name: [{ 
            required: true,
            message: '请选择直客或代理商',
            trigger: 'blur' 
          }],
          currency_rate: [{ 
            type: 'number',
            required: true,
            message: '请输入汇率值',
            trigger: 'blur' 
          },{
            validator: validatePrice,
            trigger: 'change'
          }],
          total_amount: [{ 
            type: 'number',
            required: true,
            message: '请输入结算金额',
            trigger: 'blur' 
          }],
          item_type: [{ 
            type: 'number',
            required: true,
            message: '请选择项目类型',
            trigger: 'blur' 
          }],
          num: [{ 
            type: 'number',
            required: true,
            message: '请输入数量',
            trigger: 'blur' 
          },{
            validator: limitMax,
            trigger: 'change'
          },{
					validator: positiveInteger,
					trigger: 'change'
				}],
        unit_price: [{ 
            type: 'number',
            required: true,
            message: '请输入单价',
            trigger: 'blur' 
          },{
            validator: limitMax,
            trigger: 'change'
          },{
            validator: validatePrice,
            trigger: 'change'
          }],
          item_name: [{ 
            required: true,
            message: '请填入项目名称',
            trigger: 'blur' 
          }]
        },
        // 添加收款相关变量 begin
        loading: false,
        accountRemoteList: [],
        addShoukuanVisible: false,
        shoukuanBtnDis: false,
        shoukuan: {
          id: '0',
          tuan_id: '',
          bills_id: '',
          name: '',
          org: '',
          user_collection_type: '',
          total_amount: '',
          currency: '人民币',
          currency_rate: 1,
          account_id: '',
          payment_date: new Date(),
          attachment: [],
          source_from: 1,
          remark: ''
        },
        shoukuanRules: {
          user_collection_type: [{
            required: true,
            message: '请选择收款类型',
            trigger: 'blur'
          }],
          total_amount: [{
            type: 'number',
            required: true,
            message: '请填写金额',
            trigger: 'blur'
          },{
            validator: validatePrice,
            trigger: 'change'
          }],
          currency_rate: [{
            type: 'number',
            required: true,
            message: '请填写汇率',
            trigger: 'blur'
          },{
            validator: validatePrice,
            trigger: 'change'
          }],
          account_id: [{
            type: 'number',
            required: true,
            message: '请填写收款方式/账户',
            trigger: 'blur'
          }],
          payment_date: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }]
        },
        // 添加收款相关变量 end
        multipleCheckType: false,
        pressDlg: false,
        pressBillData: {
          ids: [],
          remark: ''
        },
        pressInfo: []
      }
    },
    computed: {
      orgination: {
        get: function() {
          let org = null;
           console.log(this.is_scope.bills_info.distributor_org_id)
          if(this.is_scope.bills_info.distributor_org_id){
            return {
              org_id: this.is_scope.bills_info.distributor_org_id, 
              org_name: this.is_scope.bills_info.distributor_org_name
            };
          }
          return org;
        },
        set: function(val) {
          val = val || {};

          this.is_scope.bills_info.distributor_org_id = val.org_id;
          this.is_scope.bills_info.distributor_org_name = val.org_name;
        }
      }
    },
    watch:{
      'filters':{
        handler(){
          this.initPageFn();
        },
        deep:true
      },
      'is_scope.bills_info.bill_type': {
        handler: function(e) {
          for(var i in this.is_scope.bill_type){
            if(e == i){
              this.is_scope.bills_info.bill_type_name = this.is_scope.bill_type[i];
            }
          }
        },
        deep: true
      }
    },
    methods: {
      initBillsInfo(){
        let form = {
          apportion:'',
          bill_type:'',
          bill_type_name: '',
          confirm_file:'',
          create_time:'',
          currency:'人民币',
          currency_rate: 1,
          distributor_org_id:'',
          distributor_org_name:'',
          id:'',
          item_type:'',
          num:'',
          order_from:'',
          order_no:'',
          order_status:'',
          remark:'',
          resource_id:'',
          resource_type:'',
          rmb_payed_amount:'',
          rmb_receipted_amount:'',
          rmb_total_amount:'',
          supplier_org_id:'',
          supplier_org_name:'',
          total_amount:'',
          update_time:'',
          item_name: '',
          unit_price: ''
        }
        return form;
      },
      initPageFn(){
        let para = {};
        para.data = this.filters;
        para.data.id = this.$route.query.id;
        para.data.page = this.pagination.page_index;

        getIncomeList({
          params: para,
          success: (res) => {
            if(res.data.code == 0){
              let asyncObj = res.data.data;
              this.imComeData = asyncObj;

              this.pagination.total_count = parseInt(asyncObj.lists.total_count,10);
              this.pagination.total_page = parseInt(asyncObj.lists.total_page,10);
              this.pagination.page_size = parseInt(asyncObj.lists.page_size,10);
              this.pagination.page_index = parseInt(asyncObj.lists.page_index,10);
            }else{
              this.$message.error(res.data.msg);
            }

          },
          showLoading: true,
        });
      },
      currentPageChange(val) {
        this.pagination.page_index = val;
        this.initPageFn();
      },
      changeOrgId(item){
        this.is_scope.bills_info.distributor_org_name = item.org_name;
      },
      // 收入操作
      incomeModify(scope){
        this.handleCancelSupplierPress()
        let para = {};
        para.data = {};

        if(scope.row){
          para.data.id = scope.row.id;
          para.data.tuan_id = scope.row.resource_id;
        }else{
          para.data.id = '';
          para.data.tuan_id = this.imComeData.tuan_info.resource_id;
          this.$set(this.is_scope, 'bills_info', this.initBillsInfo());
          this.is_scope.bills_info.resource_id = this.imComeData.tuan_info.resource_id;
        }

        getIncomeForm({
          params: para,
          success: (res) => {
            if(res.data.code != 0){
              return this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }

            let asyncObj = res.data.data;
            this.incomeVisible = true;
            if(scope.row){
              this.is_scope = asyncObj;
              this.$set(this.is_scope,'org_info',
                        [{org_id:this.is_scope.bills_info.distributor_org_id,
                        org_name:this.is_scope.bills_info.distributor_org_name}]);
            }else{
              this.$set(this.is_scope,'bill_type',asyncObj.bill_type);
              this.$set(this.is_scope,'currency_lists',asyncObj.currency_lists);
              this.$set(this.is_scope,'item_type',asyncObj.item_type);
              this.$set(this.is_scope,'org_info',asyncObj.org_info);
            }
          },
          showLoading: true
        });

      },
      incomeDelete(scope){
        this.incomeDelVisible = true;
        this.incomeDelRow = scope.row;
      },
      incomeDelAffirm(){
        this.incomeDelBtnStatus = true;
        let para = {};
        para.data = {};
        para.data.id = this.incomeDelRow.id;
        para.data.resource_id = this.incomeDelRow.resource_id;
        delIncomeForm({
          params: para,
          success: (res) => {
            if(res.data.code == 0){
              this.$message.success(res.data.msg);
              this.initPageFn();
            }else{
              this.$message.error(res.data.msg);
            }
            this.incomeDelVisible = false;
            this.incomeDelBtnStatus = false;
          },
          showLoading: true
        });
      },
      incomeConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {};
            para.data = this.is_scope.bills_info;
            setIncomeForm({
              params: para,
              success: (res) => {
                this.$message({
                  message: res.data.msg,
                  type: res.data.code == '0'?'success':'error'
                })
                if(res.data.code == '0'){
                  this.incomeVisible = false;
                  this.initPageFn();
                }
              },
              showLoading: true
            });
          } else {
            return false;
          }
        });

      },
      incomeConfirmGiveup(formName){
        this.incomeVisible = false;
        this.$refs[formName].resetFields();
      },
      cancelDiagIncome(done){
        done();
        this.$refs['incomeForm'].resetFields();
      },
      // 添加收款弹窗
      addShoukuan(e){
        this.remoteMethod();
        this.shoukuan.tuan_id = e.row.resource_id;
        this.shoukuan.order_no = e.row.order_no;
        this.shoukuan.bills_id = e.row.id;
        if(e.row.bill_type !== 1 || e.row.order_no == '--'){
          // 手动添加的订单
          this.shoukuan.user_collection_type = '2';
        }else{
          // 自动添加的订单
          this.shoukuan.user_collection_type = '1';
        }
        this.addShoukuanVisible = true;
      },
      cancelDiagShoukuan(done){
        done();
        this.$refs['shoukuanForm'].resetFields();
      },
      shoukuanConfirm(formName) {
        //  console.log(this.shoukuan)
        // return false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {};
            para.data = {... this.shoukuan};	
            para.data.user_collection_type = Number(para.data.user_collection_type)
            para.data.payment_date = this.shoukuan.payment_date ? format.date(this.shoukuan.payment_date) : '';
            let tplAttach = [];
            for(let i in this.shoukuan.attachment){
              tplAttach.push(this.shoukuan.attachment[i].id);
            }
            tplAttach = tplAttach.join(',');
            para.data.attachment = tplAttach;
            
            this.shoukuanBtnDis = true;
            saveOrderGathering({
              params: para,
              success: (res) => {
                //  console.log(res);
                this.$message({
                  message: res.data.msg,
                  type: res.data.code == '0' ? 'success' : 'error'
                })
                this.shoukuanBtnDis = false;
                if (res.data.code == '0') {
                  this.addShoukuanVisible = false;
                  this.$refs[formName].resetFields();
                  // this.getGroupOrderDetailsHandler();
                }
              },
              showLoading: true
            });
          } else {
             console.log(valid)
            return false;
          }
        });
      },
      shoukuanConfirmGiveup(formName){
        this.addShoukuanVisible = false;
        this.$refs[formName].resetFields();
      },
      // 收款账号的接口数据
      remoteMethod(){
        let params = {
          data: { }
        };
        getPaymentAccount({
          params: params,
          success: (params) => {
            let data = params.data;
            if (data.code == '0') {
              let arr=data.data.list;
              this.accountRemoteList=arr.map(function(a){
                return {id:a.id,account_info:a.account_type_str+'-'+a.account_no}
              });
            } else {
              this.$message.error(data.msg);
            }
          }
        });
      },
      // 上传图片功能
      handlePreview(file) {
        this.prePicUrl = file.url;
        this.dialogPicVisible = true;
      },
      handleRemove(file, fileList) {
        for (let i = 0; i < this.shoukuan.attachment.length; i++) {
          if (this.shoukuan.attachment[i]["id"] == file.id) {
            this.shoukuan.attachment.splice(i, 1);
            return false;
          }
        }
      },
      uploadsucc(response, file, fileList) {
        if(response.code==0){
          if(this.shoukuan.attachment.length==10){
            this.$message.error("上传凭证数量不可超过十份");
          }else{
            this.shoukuan.attachment.push({
              id: response.data[0].id,
              name: response.data[0].name,
              url: response.data[0].path,
            });
          }
        }else{
          this.$message.error(response.msg);
        }
        this.loading=false;
      },
      beforeUpload(file){
        this.loading=true;
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
          this.loading=false;
          return false;
        }
        return isLt2M;
      },
      handlePressDig () {
        if (this.pressBillData.ids.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择收入'
          })
        } else {
          this.pressBillData.remark = ''
          this.pressDlg = true
        }
      },
      handleCanclePressDig () {
        this.pressDlg = false
      },
      handleSelectionChange (val) {
        this.pressBillData.ids = []
        if (val) {
          val.forEach((item, index) => {
            if (item.no_receipted_amount > 0) {
              this.pressBillData.ids.push(item.id)
            } else {
              this.imComeData.lists.data.forEach((itm, idx) => {
                if (itm.id === item.id) {
                  this.$refs.multipleList.toggleRowSelection(this.imComeData.lists.data[idx], false);
                }
              })
            }
          })
        }
      },
      supplierPressBill () {
        let params = {
          data: this.pressBillData
        }
        supplierPressBill({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: result.msg
              })
              this.pressDlg = false
              this.multipleCheckType = false
              this.$refs.multipleList.clearSelection()
              this.initPageFn()
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
      getBillPressContent (scope) {
        let params = {
          data: {
            id: scope.row.id
          }
        }
        getBillPressContent({
          params,
          success: (res) => {
            let result = res.data
            if (result.code === 0) {
              this.pressInfo = result.data
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              })
            }
          }
        })
      },
      handleCancelSupplierPress () {
        this.pressBillData.ids = []
        this.multipleCheckType = false
        this.$refs.multipleList.clearSelection()
      },
      isAddApplied (row, index) {
        if (row.no_receipted_amount > 0 && row.is_press != 1) {
          return true
        } else {
          return false
        }
      },
    },
    mounted() {
      this.initPageFn();
      getUserName().then((params)=>{
        let { code, data, msg } = params['data'];
        if(code != '10000'){
          this.shoukuan.name = data.real_name;
          this.shoukuan.org = data.org_name;
        }
      });
    }
  };
</script>

<style scoped lang="scss">
.search-content{
  margin-top: 10px;
  background: #fff;
  padding: 30px 15px 10px;
}
.search-item{line-height: 35px;}
.el-form-item{margin-bottom: 13px;}
.el-select{
  width: 100%;
}
.huobizu{
	padding: 1px 5px;
}
.mb0{
  margin-bottom: 0!important;
}

.fr{
  float: right;
}
.mr10{
  margin-right: 10px;
}
.mt-5{
  margin-top: -5px!important;
}
.mt-10{
  margin-top: -10px!important;
}
.oh{
  overflow: hidden;
}
.w100per{
  width: 100%;
}
.pressinfoitem {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
