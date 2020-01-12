import http from 'src/plugins/axios';
import {newCommonRequestHandler} from './api_new';
//v1/sharepolicy/line-policy/policy-info
/****** 分润政策 *******/
//获取酒店默认政策数据
export const promise_policySetList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/set-list')({params, success: res => resolve(res), showLoading}))
//保存酒店分润政策
export const promise_policySave = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/save')({params, success: res => resolve(res), showLoading}))
//房型套餐设置政策、批量添加政策
export const promise_roomPackagePolicySave = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/policy-save')({params, success: res => resolve(res), showLoading}))
//酒店设置政策信息
export const promise_getroomPackagePolicyInfo = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/custom')({params, success: res => resolve(res), showLoading}))

//获取线路分润政策信息
export const lineBaseProfit = p => http.post('sharepolicy/line-policy/info', p);
//线路政策模板保存
export const saveProfit = p => http.post('sharepolicy/line-policy/save', p);
//批量设置线路分润政策保存
export const batchSaveProfit = p => http.post('sharepolicy/line-policy/save-products', p);
//线路分润政策产品列表
export const lineProfitList = p => http.post('sharepolicy/line-policy/sale_center', p);
//线路产品团期
export const getProductTuanqi = p => http.post('sharepolicy/line-policy/quote-list', p);
//团期详情
export const tuanqiDetail = p => http.post('sharepolicy/line-policy/quote-detail', p);
