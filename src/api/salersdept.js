import {commonRequestHandler} from './api-app';

//营业部信息列表
export const queryOrder = commonRequestHandler('/salersdept/queryOrder');
//添加营业部信息
export const createOrder = commonRequestHandler('/salersdept/createOrder');
//获取营业部信息详情
export const queryOrderDetail = commonRequestHandler('/salersdept/queryOrderDetail');
//编辑营业部信息
export const updateOrder = commonRequestHandler('/salersdept/updateOrder');
//删除营业部信息
export const deleteOrder = commonRequestHandler('/salersdept/deleteOrder');
//查询拜访统计列表
export const queryVisitOrderSum = commonRequestHandler('/salersdept/queryVisitOrderSum');
//查询拜访详情列表
export const queryVisitOrder = commonRequestHandler('/salersdept/queryVisitOrder');
//添加拜访记录
export const createVisitOrder = commonRequestHandler('/salersdept/createVisitOrder');