<template>
	<div class="wrapper">
		<div class="system-content" v-if="costData.tuan_info">
			<div class="table-title no-border">
				<div class="title">
					<span class="color-orange">【{{costData.tuan_info.tuan_no}}】</span>{{costData.tuan_info.tuan_name}}</div>
				<table class="desc">
					<template v-if="costData.tuan_info.type != 4">
						<!-- 非单项 -->
						<tr>
							<th>出发城市</th>
							<td colspan="3">{{ costData.tuan_info.departure_city }}</td>
						</tr>
						<tr>
							<th>出发日期</th>
							<td>{{ costData.tuan_info.departure_date}}</td>
							<th>返回日期</th>
							<td>{{costData.tuan_info.back_date}}</td>
						</tr>
					</template>
					<template v-else>
						<!-- 单项 -->
						<tr>
							<th>计调负责人</th>
							<td>{{costData.tuan_info.op_name}}</td>
						</tr>
						<tr>
							<th>单项类型</th>
							<td>{{costData.tuan_info.single_type_name}}</td>
						</tr>
					</template>
				</table>
				<div class="btn-areas">
					<el-button type="primary" @click="goto()">查看行程</el-button>
					<el-button @click="goto()">打印行程</el-button>
				</div>
			</div>
			<div class="content-title">
				应付款总计（本位币）：<span class="color-orange">￥</span>
				<span class="color-orange">{{costData.rmb_total_amount}}</span>
				<el-button
					class="fr"
					v-if="!multipleCheckType && $menuPermission('api/tuan/applied_add_payment')"
					@click="multipleCheckType = true"
					type='primary'>批量请款</el-button>
				<router-link :to="{path:'cost-add',query:{id:'',tuan_id:costData.tuan_info.id}}"
					class="btn fr"
					v-if="$menuPermission('api/tuan/add_cost')">
					+ 添加成本应付款
				</router-link>
			</div>
			<div class="system-search">
				<div class="search-line-item">
					<div class="search-item">
						<div class="label">是否回票</div>
						<el-select placeholder="请选择" v-model="filters.invoice_flag" style="width:100px;">
							<el-option label="全部" value="0"></el-option>
							<el-option v-for="(obj,key) in costData.invoice_flag_list" :key="key" :label="obj" :value="Number(key)"></el-option>
						</el-select>
					</div>
					<div class="search-item">
						<div class="label">项目类型</div>
						<el-select placeholder="请选择" v-model="filters.item_type" style="width:100px;">
							<el-option label="全部" value="0"></el-option>
							<el-option v-for="(obj,key) in costData.item_type_lists" :key="key" :label="obj" :value="Number(key)"></el-option>
						</el-select>
					</div>
					<div class="search-item">
						<div class="label">摊派</div>
						<el-select placeholder="请选择" v-model="filters.apportion" style="width:100px;">
							<el-option label="全部" value="0"></el-option>
							<el-option v-for="(obj,key) in costData.apportion_lists" :key="key" :label="obj" :value="Number(key)"></el-option>
						</el-select>
					</div>
					<div class="search-item">
						<div class="label">确认状态</div>
						<el-select placeholder="请选择" v-model="filters.order_status" style="width:100px;">
							<el-option label="全部" value="0"></el-option>
							<el-option v-for="(obj,key) in costData.order_status_lists" :key="key" :label="obj" :value="Number(key)"></el-option>
						</el-select>
					</div>
				</div>
			</div>
			<div class="content-list">
				<div v-if="multipleCheckType" style="margin-bottom: 10px;">
					<el-button @click="addpayment" type='primary'>请款</el-button>
        	<el-button @click="cancelPayment" type='default'>取消</el-button>
				</div>
				<div class="mode-table">
					<el-table 
						v-if="costData.lists"
						:data="costData.lists.data" 
						border
						ref="multipleList"
            @selection-change="handleSelectionChange"
						style="width: 100%">
						<el-table-column
              v-if="multipleCheckType"
              type="selection"
							:selectable='isAddApplied'
              width="40">
            </el-table-column>
						<el-table-column label="应付款ID"
							prop="id"
							width="90"
							align="center">
						</el-table-column>
						<el-table-column
							prop="supplier_org_name"
							label="供应商(结算方)"
							width="250"
							align="center">
							<template slot-scope="scope">
								<p class="ellipsis" :title="scope.row.supplier_org_name">{{ scope.row.supplier_org_name }}</p>
							</template>
						</el-table-column>
						<el-table-column
							prop='rmb_total_amount'
							label='应付金额(本位币)'
							width='140'
							align='right'>
							<template slot-scope="scope">
								<div class="color-orange">
                  <span v-if="scope.row.invoice_flag_name">[{{scope.row.invoice_flag_name}}]</span>￥{{scope.row.rmb_total_amount}}
								</div>
							</template>
						</el-table-column>
						<el-table-column
							prop='currency'
							label='未付金额'
							width='150'
							align='right'>
							<template slot-scope="scope">
								<div class="color-orange">
									<router-link 
										v-if="$menuPermission('api/tuan/applied_list') && scope.row.is_add_applied === 0"
										:to="{path: '/plan/applied-detial', query: {id: scope.row.last_applied_id}}">
										[申]
									</router-link>
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
									￥{{scope.row.no_payed_amount}}
								</div>
							</template>
						</el-table-column>
						<el-table-column
							prop='currency_rate'
							label='转换汇率'
							width='80'
							align='center'>
						</el-table-column>
						<el-table-column
							prop='item_type_name'
							label='项目类型'
							width='80'
							align='center'>
						</el-table-column>
						<el-table-column
							prop='item_name'
							label='项目名称'
							align='center'
							min-width='180'>
							<template slot-scope="scope">
								<div class="ellipsis-clamp2"
								:title="scope.row.item_name">
									{{scope.row.item_name}}
								</div>
							</template>
						</el-table-column>
						<el-table-column
							prop='num'
							label='数量'
							width='80'
							align='center'>
						</el-table-column>
						<el-table-column
							prop='apportion_name'
							label='摊派'
							width='120'
							align='center'>
						</el-table-column>
						<el-table-column
							prop='order_status_name'
							label='确认件上传状态'
							width='150'
							align='center'
							v-if="costData.tuan_info.type != 4">
						</el-table-column>
						<el-table-column
							prop=''
							label='操作'
							width='90'
							fixed='right'
							align='center'>
							<template slot-scope="scope">
								<el-dropdown trigger="click">
									<span class="el-dropdown-link">
										操作
										<i class="el-icon-caret-bottom el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item v-if="$menuPermission('api/tuan/add_cost') && scope.row.item_type != 14 && scope.row.order_no == '--'">
											<!-- <a href="javascript:;" @click="costModify(scope)">编辑</a> -->
											<router-link :to="{ path: '/control/cost-add', query: {id:scope.row.id,tuan_id: costData.tuan_info.resource_id}}">
												编辑
											</router-link>
										</el-dropdown-item>
										<el-dropdown-item v-if="$menuPermission('api/tuan/del_cost') && scope.row.order_no == '--'">
											<a href="javascript:;" @click="costDelete(scope)">删除</a>
										</el-dropdown-item>
										<el-dropdown-item v-if="$menuPermission('api/tuan/confirm_piece') && costData.tuan_info.type != 4">
											<router-link :to="{ path: '/control/cost/confirm', query: {parent_id: costData.tuan_info.resource_id, id:scope.row.id, type:2}}">上传确认件</router-link>
										</el-dropdown-item>
										<el-dropdown-item v-if="$menuPermission('api/tuan/cost_confirm_template') && costData.tuan_info.type != 4">
											<router-link :to="{ path: '/control/cost/comfirmDownloadPdf', query: { parent_id: costData.tuan_info.resource_id, id:scope.row.id }}">
												确认件模版
											</router-link>
										</el-dropdown-item>
										<el-dropdown-item v-if="scope.row.invoice_flag == 0">
											<router-link class="span-btn"
												:to="{path: '/plan/planinvoice/cost_add', query: {id: scope.row.id, type: 1}}">
												上传成本票
											</router-link>
										</el-dropdown-item>
										<el-dropdown-item v-if="scope.row.invoice_detail_flag == 1">
											<router-link class="span-btn"
												:to="{path: '/plan/planinvoice/cost_detail', query: {bid: scope.row.id, type: 1}}">
												查看成本票
											</router-link>
										</el-dropdown-item>
										<el-dropdown-item v-if="$menuPermission('api/tuan/bill_pay_detail')">
											<router-link class="span-btn"	:to="{path: '/control/cost/detail', query: {aid:costData.tuan_info.a_id, id:scope.row.id}}">
												查看成本
											</router-link>
										</el-dropdown-item>
										<el-dropdown-item v-if="$menuPermission('api/tuan/applied_add_payment') && scope.row.is_add_applied === 1">
											<router-link class="span-btn"	:to="{path: '/plan/applied-add', query: {ids: scope.row.id}}">
												申请付款
											</router-link>
										</el-dropdown-item>
										<el-dropdown-item v-if="$menuPermission('api/tuan/applied_list') && scope.row.is_add_applied === 0">
											<router-link class="span-btn"	:to="{path: '/plan/applied', query: {bill_id: scope.row.id}}">
												查看付款申请
											</router-link>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!--工具条-->
		<div class="page">
			<el-pagination layout="prev, pager, next" @current-change="currentPageChange" :total="pagination.total_count" :page-size="pagination.page_size">
			</el-pagination>
		</div>

		<!--编辑成本弹窗-->
		<el-dialog
			title="成本操作"
			:visible.sync="costVisible"
			:before-close="cancelDiagCost"
			:close-on-click-modal="false">
			<el-form v-if="is_scope.bills_info"
			:model="is_scope.bills_info"
			:rules="rules"
			ref="costForm"
			label-width="140px"
			style="width:90%;">
				<el-form-item label="供应商"
				prop="supplier_org_id">
          <SelectOrg v-model="orgination" placeholder="请选择供应商" :defaultList="is_scope.org_info"/>
				</el-form-item>
				<el-form-item label="项目名称" prop="item_name">
					<el-input v-model="is_scope.bills_info.item_name">
					</el-input>
				</el-form-item>
				<el-form-item label="项目类型" prop="item_type">
					<el-select v-model="is_scope.bills_info.item_type"
					placeholder="请选择">
						<el-option v-for="(obj,key) in is_scope.item_type"
						:key="key"
						:label="obj"
						:value="Number(key)">
						</el-option>
					</el-select>
				</el-form-item>
				<!-- 新增类型为住宿条件下，增加的字段 -->
				<div v-if="is_scope.bills_info.item_type == 12">
					<el-form-item label="住宿日期" required>
						<el-form-item prop="room_start"
						class="zhusu-date-input">
							<el-date-picker type="date"
							v-model="is_scope.bills_info.room_start"
							placeholder="入住日期"
							:editable="false"
							:picker-options="datepickerOptions2">
							</el-date-picker>
						</el-form-item>
						<span class="zhusu-intreval">
							-
						</span>
						<el-form-item prop="room_end"
						class="zhusu-date-input">
							<el-date-picker type="date"
							v-model="is_scope.bills_info.room_end"
							placeholder="结束日期"
							:editable="false"
							:picker-options="datepickerOptions">
							</el-date-picker>
						</el-form-item>
						<span v-if="zhushuDays != ''"
						class="zhusu-days">
							{{zhushuDays}}晚
						</span>
					</el-form-item>
					<el-form-item label="房间数" prop="room_nums">
						<input-number  class="short"	v-model="is_scope.bills_info.room_nums"	placeholder="请输入数字"/>间
					</el-form-item>
				</div>
				<!--/ 新增类型为住宿条件下，增加的字段 -->
				<!-- 数量 -->
				<div>
					<template v-if="is_scope.bills_info.item_type == 12">
						<el-form-item label="数量">
							{{is_scope.bills_info.num}}
						</el-form-item>
					</template>
					<template v-else-if="is_scope.bills_info.item_type == 4">
						<el-form-item label="餐数"
						prop="meals_nums">
							<input-number  v-model="is_scope.bills_info.meals_nums"/>
						</el-form-item>
						<el-form-item label="人数" prop="people_nums">
							<input-number  v-model="is_scope.bills_info.people_nums"/>
						</el-form-item>
					</template>
					<template v-else-if="is_scope.bills_info.item_type == 20">
						<el-form-item label="导游数" prop="guides_nums">
							<input-number  v-model="is_scope.bills_info.guides_nums"/>
						</el-form-item>
						<el-form-item label="服务天数" prop="service_nums">
							<input-number  v-model="is_scope.bills_info.service_nums"/>
						</el-form-item>
					</template>
					<template v-else>
						<el-form-item label="数量" prop="num">
							<input-number  v-model="is_scope.bills_info.num"/>
						</el-form-item>
					</template>
				</div>
				<!-- /数量 -->
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
				<el-form-item label="合计">
					<template v-if="is_scope.bills_info.item_type == 4">
						{{(is_scope.bills_info.meals_nums * is_scope.bills_info.people_nums * is_scope.bills_info.unit_price) | formatPrice}}
						（公式：餐数*人数*单价）
					</template>
					<template v-else-if="is_scope.bills_info.item_type == 20">
						{{(is_scope.bills_info.guides_nums * is_scope.bills_info.service_nums * is_scope.bills_info.unit_price) | formatPrice}}
						（公式：导游数*服务天数*单价）
					</template>
					<template v-else-if="is_scope.bills_info.item_type == 12">
						{{(is_scope.bills_info.num * is_scope.bills_info.unit_price) | formatPrice}}
						（公式：房间数*入住天数*单价）
					</template>
					<template v-else>
						{{(is_scope.bills_info.num * is_scope.bills_info.unit_price) | formatPrice}}
						（公式：数量*单价）
					</template>
				</el-form-item>
				<!-- /合计 -->
				<!-- 应付金额 -->
				<el-form-item label="应付金额(本位币)">
					&yen;
					<template v-if="is_scope.bills_info.item_type == 4">
						{{(is_scope.bills_info.meals_nums * is_scope.bills_info.people_nums * is_scope.bills_info.unit_price * is_scope.bills_info.currency_rate) | formatPrice}}
					</template>
					<template v-else-if="is_scope.bills_info.item_type == 20">
						{{(is_scope.bills_info.guides_nums * is_scope.bills_info.service_nums * is_scope.bills_info.unit_price * is_scope.bills_info.currency_rate) | formatPrice}}
					</template>
					<template v-else>
						{{(is_scope.bills_info.num * is_scope.bills_info.unit_price * is_scope.bills_info.currency_rate) | formatPrice}}
					</template>
				</el-form-item>
				<!-- /应付金额 -->
				<el-form-item label="摊派" prop="apportion">
					<el-radio v-model="is_scope.bills_info.apportion" :label=2>均摊</el-radio>
					<el-radio v-model="is_scope.bills_info.apportion" :label=1>指定订单人头</el-radio>
				</el-form-item>
				<div class="zd" v-if="is_scope.bills_info.apportion == 1">
					<ul class="zd-hd">
						<li v-for="(val, idx) in is_scope.cfg_cost_appor_filter" :key="idx">{{val.order_no}}({{val.num}}人)</li>
					</ul>
					<div class="zd-bd">
						<el-table ref="multipleTable"
							:data="is_scope.cfg_cost_apportion"
							@selection-change="zdChange">
							<el-table-column type="selection" width="30" />
							<el-table-column>
								<template slot-scope="scope">
									<div class="txt">
										{{scope.row.order_no}}
										{{scope.row.info}}
									</div>
								</template>
							</el-table-column>
							<el-table-column width="60">
								<template slot-scope="scope">
									<input-number  v-model="scope.row.num" />
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<!-- <el-form-item label="指定订单" v-if="is_scope.bills_info.apportion==1" prop="order_no">
					<el-select v-model="is_scope.bills_info.order_no" filterable multiple placeholder="请选择">
						<el-option v-for="(obj,key) in is_scope.order_lists" :key="key" :label="obj" :value="obj"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="备注说明">
					<el-input type="textarea" v-model="is_scope.bills_info.remark" style="margin-top: 6px;"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="costConfirmGiveup('costForm')">取 消</el-button>
				<el-button type="primary" @click="costConfirm('costForm')" :disabled="dstatus">确 定</el-button>
			</span>
		</el-dialog>
		<!--删除成本弹窗-->
		<el-dialog title="成本删除" :visible.sync="costDelVisible" size="tiny">
			<span>删除后，将无法还原删除的数据，确认删除成本项？ </span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="costDelVisible=false">取 消</el-button>
				<el-button type="primary" @click="costDelAffirm" :disabled="costDelBtnStatus">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>
<script>
import { currency_data } from 'src/configuration/currency';
import {getBillPressContent} from 'src/api/tuan'
import {
	getCostList,
	getCostForm,
	setCostForm,
	delCostForm
} from 'src/api/api';
import * as format from 'src/utils/format';
import SelectOrg from 'src/plugins/SelectOrg.vue';
import CurrencyPicker from 'src/plugins/currency-picker/index.vue';
import InputNumber from 'src/plugins/InputNumber.vue';
export default {
	components: {
		SelectOrg,
		CurrencyPicker,
		InputNumber
	},
  filters: {
    formatPrice(price){
      const num = price || 0;

      return Number(format.toFixed(num, 3));
    }
  },
	data() {
		let validatePrice = (rule, value, callback) => {
			if (value && !/^\d+$|^\d+\.?\d+$/.test(value)) {
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
			dstatus: false,
			currency_data,
			value: '',
			costVisible: false,
			editStatus: false,
			costDelVisible: false,
			costDelBtnStatus: false,
			costDelRow: '',
			is_scope: {
				bills_info: {
					id: '',
					supplier_org_id: '',
					supplier_org_name: '1',
					currency: '人民币',
					currency_rate: 1,
					total_amount: '',
					item_type: '',
					item_name: '',
					num: '',
					meals_nums: '',
					people_nums: '',
					guides_nums: '',
					service_nums: '',
					unit_price: '',
					apportion: '',
					order_no: [],
					remark: '',
					room_nums: '',
					room_start: '',
					room_end: ''
				}
			},
			zhushuDays: '',
			costData: {},
			row: {},
			filters: {
				apportion: '',
				order_status: '',
				item_type: '',
				invoice_flag: ''
			},
			tableList: [],
			pagination: {
				total_count: 0,
				total_page: 0,
				page_size: 10,
				page_index: 1,
			},
			rules: {
				supplier_org_id: [{
					type: 'number',
					required: true,
					message: '请选择供应商',
					trigger: 'blur' 
				}],
				item_type: [{ 
					type: 'number',
					required: true,
					message: '请选择项目类型',
					trigger: 'blur' 
				}],
				item_name: [{ 
					required: true,
					message: '请输入项目名称',
					trigger: 'blur' 
				}],
				currency_rate: [{ 
					type: 'number',
					required: true,
					message: '请输入汇率',
					trigger: 'blur' 
				},{
					validator: validatePrice,
					trigger: 'change'
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
				meals_nums: [{ 
					type: 'number',
					required: true,
					message: '请输入餐数',
					trigger: 'blur' 
				},{
					validator: limitMax,
					trigger: 'change'
				},{
					validator: positiveInteger,
					trigger: 'change'
				}],
				people_nums: [{ 
					type: 'number',
					required: true,
					message: '请输入人数',
					trigger: 'blur' 
				},{
					validator: limitMax,
					trigger: 'change'
				},{
					validator: positiveInteger,
					trigger: 'change'
				}],
				guides_nums: [{ 
					type: 'number',
					required: true,
					message: '请输入导游数',
					trigger: 'blur' 
				},{
					validator: limitMax,
					trigger: 'change'
				},{
					validator: positiveInteger,
					trigger: 'change'
				}],
				service_nums: [{ 
					type: 'number',
					required: true,
					message: '请输入服务天数',
					trigger: 'blur' 
				},{
					validator: limitMax,
					trigger: 'change'
				},{
					validator: positiveInteger,
					trigger: 'change'
				}],
				room_start: [{ 
					type: 'date',
					required: true,
					message: '请输入入住日期',
					trigger: 'blur' 
				}],
				room_end: [{ 
					type: 'date',
					required: true,
					message: '请输入结束日期',
					trigger: 'blur' 
				}],
				room_nums: [{ 
					type: 'number',
					required: true,
					message: '请输入房间数',
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
				apportion: [{ 
					type: 'number',
					required: true,
					message: '请选择摊派类型',
					trigger: 'blur' 
				}],
				order_no: [{ 
					type: 'array',
					required: true,
					message: '请选择指定订单项',
					trigger: 'blur' 
				}]
			},
			multipleCheckType: false,
			paymentData: [],
			pressInfo: []
		}
	},
	computed: {
		datepickerOptions() {
			if(typeof this.is_scope.bills_info.room_start == 'string' && this.is_scope.bills_info.room_start != ''){
				this.is_scope.bills_info.room_start = new Date(this.is_scope.bills_info.room_start);
			}
			let depart_date = this.is_scope.bills_info.room_start;
			return {
				disabledDate(time) {
					return time.getTime() <= (new Date(depart_date)).getTime();
				}
			}
		},
		datepickerOptions2() {
			if(typeof this.is_scope.bills_info.room_end == 'string' && this.is_scope.bills_info.room_end != ''){
				this.is_scope.bills_info.room_end = new Date(this.is_scope.bills_info.room_end);
			}
			let depart_date = this.is_scope.bills_info.room_end;
			return {
				disabledDate(time) {
					return time.getTime() >= (new Date(depart_date)).getTime() - 8 * 60 * 60 * 1000;
				}
			}
		},
		orgination: {
			get: function() {
				let org = null;
				if(this.is_scope.bills_info.supplier_org_id){
					return {
						org_id: this.is_scope.bills_info.supplier_org_id, 
						org_name: this.is_scope.bills_info.supplier_org_name
					};
				}
				return org;
			},
			set: function(val) {
				val = val || {};

				this.is_scope.bills_info.supplier_org_id = val.org_id;
				this.is_scope.bills_info.supplier_org_name = val.org_name;
			}
		}
	},
	watch: {
		'filters': {
			handler() {
				this.initPageFn();
			},
			deep: true
		},
		'is_scope.bills_info.item_type': {
			handler() {
				this.zhushuClear();
			},
			deep: true
		},
		'is_scope.bills_info.room_start': {
			handler: function() {
				this.calculationNums();
			},
			deep: true
		},
		'is_scope.bills_info.room_end': {
			handler: function(e) {
				this.calculationNums();
			},
			deep: true
		},
		'is_scope.bills_info.room_nums': {
			handler: function(e) {
				this.calculationNums();
				if(e != ''){
					this.is_scope.bills_info.room_nums = Number(e);
				}
			},
			deep: true
		},
		'is_scope.bills_info.num': {
			handler: function(e) {
				if(e != ''){
					this.is_scope.bills_info.num = Number(e);
				}
			},
			deep: true
		},
		'is_scope.bills_info.meals_nums': {
			handler: function(e) {
				if(e != ''){
					this.is_scope.bills_info.meals_nums = Number(e);
				}
			},
			deep: true
		},
		'is_scope.bills_info.people_nums': {
			handler: function(e) {
				if(e != ''){
					this.is_scope.bills_info.people_nums = Number(e);
				}
			},
			deep: true
		},
		'is_scope.bills_info.guides_nums': {
			handler: function(e) {
				if(e != ''){
					this.is_scope.bills_info.guides_nums = Number(e);
				}
			},
			deep: true
		},
		'is_scope.bills_info.service_nums': {
			handler: function(e) {
				if(e != ''){
					this.is_scope.bills_info.service_nums = Number(e);
				}
			},
			deep: true
		},
		'is_scope.bills_info.apportion':{
			handler: function(e) {
				if(e == 1){
					this.$nextTick(() => this.checked());
				}
			},
			deep: true
		}
	},
	methods: {
		// 住宿状态下计算数量
		calculationNums() {
			let distance,
				days,
				rStart = this.is_scope.bills_info.room_start,
				rEnd = this.is_scope.bills_info.room_end,
				rNums = this.is_scope.bills_info.room_nums;
			if(rStart && rEnd){
				distance = Date.parse(new Date(rEnd)) - Date.parse(new Date(rStart));
				days = Math.floor(distance / (1000 * 60 * 60 * 24));
				this.zhushuDays = days;
			}
			if (rStart && rEnd && rNums) {
				this.is_scope.bills_info.num = days * rNums;
			}
		},
		zhushuClear() {
			if (this.is_scope.bills_info.item_type == 12) {
				if (this.is_scope.bills_info.room_start && this.is_scope.bills_info.room_end && this.is_scope.bills_info.room_nums) {
				} else {
					this.is_scope.bills_info.num = 0;
					this.is_scope.bills_info.unit_price = 0;
				}
			}
			// this.editStatus = false;
		},
		initBillsInfo() {
			let form = {
				id: '',
				supplier_org_id: '',
				supplier_org_name: '',
				currency: '人民币',
				currency_rate: 1,
				total_amount: '',
				item_type: '',
				item_name: '',
				num: '',
				meals_nums: '',
				people_nums: '',
				guides_nums: '',
				service_nums: '',
				unit_price: '',
				apportion: 2,
				cost_apportion: '',
				cost_appoint: [],
				order_no: [],
				remark: '',
				room_nums: '',
				room_start: '',
				room_end: ''
			}
			return form;
		},
		initPageFn() {
			let para = {};
			para.data = this.filters;
			para.data.id = this.$route.query.id;
			para.data.page = this.pagination.page_index

			getCostList({
				params: para,
				success: (res) => {
					if (res.data.code === 0) {
						res.data.data.lists.data.forEach((item, index) => {
							item.sel = false
						})
						this.costData = res.data.data;
						this.pagination.total_count = parseInt(this.costData.lists.total_count, 10);
						this.pagination.total_page = parseInt(this.costData.lists.total_page, 10);
						this.pagination.page_size = parseInt(this.costData.lists.page_size, 10);
						this.pagination.page_index = parseInt(this.costData.lists.page_index, 10);
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
						history.go(-1)
					}
				},
				showLoading: true
			});
		},
		currentPageChange(val) {
			this.pagination.page_index = val;
			this.initPageFn();
		},
		// 收入操作
		costModify(scope) {
			let para = {};
			para.data = {};

			if (scope.row) {
				para.data.id = scope.row.id;
				para.data.tuan_id = scope.row.resource_id;
			} else {
				para.data.id = '';
				para.data.tuan_id = this.costData.tuan_info.resource_id;
			}
			getCostForm({
				params: para,
				success: (res) => {
					if(res.data.code == 0){
						this.costVisible = true;
						this.is_scope = res.data.data;
						const cfgApportion = res.data.data.cfg_cost_apportion;
						let cfgApporFilter = [];
						cfgApportion.forEach((val,idx,arr) => {
							if(val.is_checked){
								cfgApporFilter.push(val);
							}
						});
						if (!scope.row) {
							// 新增成本
							let that = this;
							this.$set(this.is_scope, 'bills_info', this.initBillsInfo());
							this.$set(this.is_scope, 'cfg_cost_apportion', cfgApportion);
							setTimeout(function changeState(){
								cfgApportion.forEach((val,idx,arr) => {
									if(val.is_checked){
										that.$refs.multipleTable.toggleRowSelection(val);
									}
								});
							},300);
							this.is_scope.bills_info.resource_id = this.costData.tuan_info.resource_id;
						} else {
							// 编辑成本
							this.$set(this.is_scope, 'org_info',
								[{
									org_id: this.is_scope.bills_info.supplier_org_id,
									org_name: this.is_scope.bills_info.supplier_org_name
								}]);
						}
						this.$set(this.is_scope, 'cfg_cost_appor_filter', cfgApporFilter);
            this.$nextTick(() => this.checked());
					}else{
						this.$message({
							message: res.data.msg,
							type: 'error'
						})
					}
				},
				showLoding: true
			});

		},
    checked() {
      this.is_scope.cfg_cost_apportion.forEach((v, i, a) => {
        if (v.is_checked) {
          this.$refs.multipleTable.toggleRowSelection(v, true);
        }
      });
    },
		costDelete(scope) {
			this.costDelVisible = true;
			this.costDelRow = scope.row;
		},
		costDelAffirm(){
			this.costDelBtnStatus = true;
			let para = {};
			para.data = {};
			para.data.id = this.costDelRow.id;
			para.data.resource_id = this.costDelRow.resource_id;
			delCostForm({
				params: para,
				success: (res) => {
					if(res.data.code == 0){
						this.$message.success(res.data.msg);
						this.initPageFn();
					}else{
						this.$message.error(res.data.msg);
					}
					this.costDelVisible = false;
					this.costDelBtnStatus = false;
				},
				showLoding: true
			});
		},
		costConfirm(formName) {
			 console.log(this.is_scope.bills_info)
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let para = {};
					// 复制bills_info的内容，否则下面的更新room_start, room_end无法正常赋值
					para.data = {... this.is_scope.bills_info};	
					para.data.room_start = this.is_scope.bills_info.room_start ? format.date(this.is_scope.bills_info.room_start) : '';
					para.data.room_end = this.is_scope.bills_info.room_end ? format.date(this.is_scope.bills_info.room_end) : '';
					this.dstatus = true;
					setCostForm({
						params: para,
						success: (res) => {
							this.$message({
								message: res.data.msg,
								type: res.data.code == '0' ? 'success' : 'error'
							})
							this.dstatus = false;
							if (res.data.code == '0') {
								this.costVisible = false;
								this.initPageFn();
							}
						},
						showLoding: true
					});

				} else {
					 console.log(valid)
					return false;
				}
			});

		},
		costConfirmGiveup(formName){
			this.costVisible = false;
			this.$refs[formName].resetFields();
		},
		cancelDiagCost(done){
			done();
			this.$refs['costForm'].resetFields();
		},
		zdChange(val){
			this.is_scope.cfg_cost_appor_filter = val;
			this.is_scope.bills_info.cost_apportion = val;
			this.is_scope.bills_info.cost_appoint = val;
		},
		handleSelectionChange (val) {
			this.paymentData = []
			val.forEach((item, index) => {
				if (item.is_add_applied === 1) {
					this.paymentData.push(item)
				} else {
					this.costData.lists.data.forEach((item1, index1) => {
						if (item1.id === item.id) {
							this.$refs.multipleList.toggleRowSelection(this.costData.lists.data[index1], false)
						}
					})
				}
			})
		},
		addpayment () {
			if (this.paymentData.length === 0) {
				this.$message({
					type: 'error',
					message: '请选择成本'
				})
			} else {
				let ids = ''
				this.paymentData.forEach((item, index) => {
					ids = ids + item.id + ','
				})
				ids = ids.slice(0, ids.length - 1)
				this.$router.push({
					path: '/plan/applied-add',
					query: {ids}
				})
			}
		},
		cancelPayment () {
			this.paymentData = []
			this.multipleCheckType = false
			this.$refs.multipleList.clearSelection()
		},
		isAddApplied (row, index) {
			if (row.is_add_applied === 1 && row.no_payed_amount > 0) {
				return true
			} else {
				return false
			}
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
	},
	mounted() {
		this.initPageFn();
	}
};
</script>

<style scoped lang="scss">
.search-item {
	line-height: 30px;
}

.el-form-item {
	margin-bottom: 13px;
}

.system-content .table-title .btn-areas {
	margin-top: 0;
}

.el-select {
	width: 100%;
}

.short {
	width: 200px;
	margin-right: 10px;
}
.zhusu-date-input{
	float: left;
	margin-bottom: 0!important;
}
.zhusu-date-input .el-date-editor{
	width: 140px;
}
.zhusu-intreval{
	float: left;
	margin: 0 8px;
}
.zhusu-days{
	margin-left: 10px;
}
.huobizu{
	padding: 1px 5px;
}
.zd{
	margin-left: 140px;
	margin-top: -10px;
	li{
		list-style: none;
	}
}
.zd-hd{
	line-height: 30px;
	overflow: hidden;
	li{
		float: left;
		border: 1px dashed #ccc;
		margin: 5px 10px 0 0;
		padding: 0 10px 0 10px;
		border-radius: 2px;
		cursor: pointer;
		// &::after{
			// content: '×';
			// margin-left: 3px;
		// }
		&:hover{
			border-color: #b10c79;
		}
		&:hover::after{
			color: #b10c79;
		}
	}
}
.zd-bd{
	max-height: 200px;
	border: 1px solid #ccc;
	border-radius: 2px;
	margin-top: 5px;
	overflow-y: scroll;
	.con{
		padding-left: 20px;
		padding-right: 40px;
		overflow: hidden;
	}
	.el-checkbox{
		float: left;
		margin: 8px 0 0 -20px;
	}
	.txt{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 35px;
	}
	.el-input{
		width: 40px;
	}
}
.content-title{
	.btn{
		display: inline-block;
		width: 140px;
		line-height: 30px;
		border-radius: 4px;
		margin-right: 10px;
		color: #fff;
		background: #b10c79;
		cursor: pointer;
		text-align: center;
		&:hover{
			opacity: .8;
		}
	}
}
.pressinfoitem {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
