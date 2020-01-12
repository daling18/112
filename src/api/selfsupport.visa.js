import {commonRequestHandler} from './api';

// 单项自营 - 添加签证-获取信息 https://testerp.yktour.com.cn/docs/bom/add_visa
export const addVisa = commonRequestHandler('/api/selfsupport.visa/add_visa');
// 单项自营 - 添加签证-提交表单 https://testerp.yktour.com.cn/docs/bom/todo_add_visa
export const todoAddVisa = commonRequestHandler('/api/selfsupport.visa/todo_add_visa');
// 单项自营 - 签证详情 https://testerp.yktour.com.cn/docs/bom/visa_detail
export const visaDetail = commonRequestHandler('/api/selfsupport.visa/visa_detail');
// 单项自营 - 签证列表 https://testerp.yktour.com.cn/docs/bom/visa_list
export const visaList = commonRequestHandler('/api/selfsupport.visa/visa_list');
// 单项自营 - 获取送签地列表 https://testerp.yktour.com.cn/docs/bom/get_city_list
export const getCityList = commonRequestHandler('/api/selfsupport.visa/get_city_list');
// 单项自营 - 启用/禁用签证 https://testerp.yktour.com.cn/docs/bom/change_status
export const changeStatus = commonRequestHandler('/api/selfsupport.visa/change_status');
// 单项自营 - 签证上架 https://testerp.yktour.com.cn/docs/bom/putaway
export const putaway = commonRequestHandler('/api/selfsupport.visa/putaway');
// 单项自营 - 签证下架 https://testerp.yktour.com.cn/docs/bom/sold_out
export const soldOut = commonRequestHandler('/api/selfsupport.visa/sold_out');
// 单项自营 - 签证撤回 https://testerp.yktour.com.cn/docs/bom/send_back
export const sendBack = commonRequestHandler('/api/selfsupport.visa/send_back');
// 单项自营 - 删除签证图片 https://testerp.yktour.com.cn/docs/bom/del_img
export const delImage = commonRequestHandler('/api/selfsupport.visa/del_img');
// 单项自营 - 获取产品供应商 https://testerp.yktour.com.cn/docs/bom/supplier_org_list
export const supplierOrgList = commonRequestHandler('/api/selfsupport.visa/supplier_org_list');
// 分销中心 - 签证列表 https://testerp.yktour.com.cn/docs/bom/book_list
export const bookList = commonRequestHandler('/api/selfsupport.visa/book_list');

// 分销中心 - 预订签证 https://testerp.yktour.com.cn/docs/bom/visa_add_order
export const addOrder = commonRequestHandler('/api/selfsupport.visaorder/add_order');
// 分销中心 - 提交预订 https://testerp.yktour.com.cn/docs/bom/visa_todo_add_order
export const todoAddOrder = commonRequestHandler('/api/selfsupport.visaorder/todo_add_order');
// 分销中心 - 我的订单列表 https://testerp.yktour.com.cn/docs/bom/visa_order_list
export const orderList = commonRequestHandler('/api/selfsupport.visaorder/order_list');
// 分销中心 - 采购订单列表 https://testerp.yktour.com.cn/docs/bom/visa_order_list
export const purchaseOrderList = commonRequestHandler('/api/selfsupport.visaorder/purchase_order_list');
// 分销中心 - 订单详情 https://testerp.yktour.com.cn/docs/bom/visa_order_detai
export const orderDetail = commonRequestHandler('/api/selfsupport.visaorder/order_detail');
// 分销中心 - 取消订单 https://testerp.yktour.com.cn/docs/bom/visa_cancel_order
export const cancelOrder = commonRequestHandler('/api/selfsupport.visaorder/cancel_order');
// 分销中心 - 申请退款
export const refund = commonRequestHandler('/api/selfsupport.visaorder/refund');
// 分销中心 - 退款详情
export const refundDetail = commonRequestHandler('/api/selfsupport.visaorder/refund_detail');
// 分销中心 - 退款定损
export const loss = commonRequestHandler('/api/selfsupport.visaorder/loss');

// 计调操作 - 订单详情
export const opOrderDetail = commonRequestHandler('/api/selfsupport.visaorder/op_order_detail');
// 计调操作 - 订单列表  https://testerp.yktour.com.cn/docs/bom/op_visa_order_list
export const opOrderList = commonRequestHandler('/api/selfsupport.visaorder/op_order_list');
// 计调操作 - 确认订单  https://testerp.yktour.com.cn/docs/bom/visa_confirm_order
export const confirmOrder = commonRequestHandler('/api/selfsupport.visaorder/confirm_order');
// 计调操作 - 确认无效
export const orderInvalid = commonRequestHandler('/api/selfsupport.visaorder/order_invalid');
// 计调操作 - 送签确认  https://testerp.yktour.com.cn/docs/bom/visa_send
export const send = commonRequestHandler('/api/selfsupport.visaorder/send');
// 计调操作 - 出签确认  https://testerp.yktour.com.cn/docs/bom/visa_out
export const out = commonRequestHandler('/api/selfsupport.visaorder/out');

// 计调操作 - 自营订单列表  https://testerp.yktour.com.cn/docs/bom/visa_out
export const opSelfOrderList = commonRequestHandler('/api/selfsupport.visaorder/op_self_order_list');
