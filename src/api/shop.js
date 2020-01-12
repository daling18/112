import {newCommonRequestHandler} from './api_new';

// 获取营业部 店铺信息
export const getShopMsg = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/orgination/org-info')({params, success: res => resolve(res), showLoading}))
// 设置营业部 店铺信息
export const saveShopMsg = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/orgination/save-org')({params, success: res => resolve(res), showLoading}))
// 结算中心 收益统计
export const getEarningsList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/profitcal/list')({params, success: res => resolve(res), showLoading}))
// 客户管理 客户列表
export const getClientList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/distribution/member/list')({params, success: res => resolve(res), showLoading}))

// 基础数据管理-组织机构-获取组织信息
export const getTissueDetail = newCommonRequestHandler('/v1/basedata/orgination/org-info');

