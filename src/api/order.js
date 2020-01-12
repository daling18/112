import {
  commonRequestHandler
} from './api';
import {
  newCommonRequestHandler
} from './api_new';
import http from 'src/plugins/axios';

// 分销中心-我的订单-线路订单 https://testerp.yktour.com.cn/docs/bom/1054
export const saleOrderList = commonRequestHandler('/api/order/sale_order_list');

// 分销中心-采购订单-线路订单 https://testerp.yktour.com.cn/docs/bom/1056
export const salePurchaseOrderList = commonRequestHandler('/api/order/sale_purchase_order_list');

// 获取订单负责人列表 https://testerp.yktour.com.cn/docs/bom/get_order_operations
export const getOrderOperations = commonRequestHandler('/api/order/get_order_operations');

// 设置支付金额 https://testerp.yktour.com.cn/docs/bom/set_payment_amount
export const setPaymentAmount = commonRequestHandler('/api/order/set_payment_amount');

// 客服订单-线路订单
export const getKfOrderList = newCommonRequestHandler('/v1/order/customer/order-list');

// 客服订单-添加备注
export const setKfOrderRemark = newCommonRequestHandler('/v1/order/customer/order-remark');

// 客服订单-订单详情
export const getKfOrderDetail = newCommonRequestHandler('/v1/order/customer/order-detail');

// 客服订单-退款详情
export const getKfOrderDetailRefund = newCommonRequestHandler('/v1/order/customer/order-detail-refund');

// 订单详情-预览合同
export const getOrderContractDetail = commonRequestHandler('/api/tuan/contract_preview');

// 采购订单-获取线下收款信息
export const getOrderDetailAccount = newCommonRequestHandler('/v1/order/order-detail/get_payment_account');

export const setOrderDetailAccount = newCommonRequestHandler('/v1/order/order-detail/off_pay');





// 店铺订单-订单列表
export const getOrderShopList = newCommonRequestHandler('/v1/order/shop/line-order-list');

// 店铺订单-线路订单详情
export const getOrderShopDetail = newCommonRequestHandler('/v1/order/shop/line-order-detail');

// 店铺订单-店铺订单详情
export const getHotelOrderDetail = newCommonRequestHandler('/v1/order/shop/order-info');


//v2 线路订单列表
export const getLineOrderList = (p) => http.post('lineservice/line-quote-order/kf_order_list', p);
export const getQuoteList = (p) => http.post('lineservice/line-quote-order/kf_order_list', p);
