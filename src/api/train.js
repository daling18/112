import {
  commonRequestHandler
} from './api';
import {
  newCommonRequestHandler
} from './api_new';

// 火车票
// 搜索城市及三字码
export const queryTrainCityPick = newCommonRequestHandler('/v1/train/search-city');
// 站站查询
export const getTrainList = newCommonRequestHandler('/v1/train/train-query');
// 下单页
export const getTrainForm = newCommonRequestHandler('/v1/train/form');
export const getTicketType = newCommonRequestHandler('/v1/train/refresh-ticket-num'); // 获取座次信息
// 监听占座
export const getHoldingSeat = newCommonRequestHandler('/v1/train/occupy-monitor');
// 提交订单
export const submitOrderForm = newCommonRequestHandler('/v1/train/create-order');
/*****火车票预订******/

/*****火车票订单******/

//火车票我的订单列表
export const searchDistributionTrainMyOrderListAsyncRequest = newCommonRequestHandler('/v1/train/order-list');
//火车票采购订单列表
export const searchDistributionTrainPurchaseOrderListAsyncRequest = commonRequestHandler('/api/train/cg_order_list');
//火车票单项订单列表
export const searchDistributionTrainSingleOrderListAsyncRequest = newCommonRequestHandler('/v1/train/order-list-all');
//火车票订单详情
export const getDistributionTrainOrderDetailAsyncRequest = newCommonRequestHandler('/v1/train/order-detail');
//火车票取消订单
export const cancelDistributionTrainOrderAsyncRequest = newCommonRequestHandler('/v1/train/cancel-order');
//火车票改签
export const changeDistributionTrainFromAsyncRequest = newCommonRequestHandler('/v1/train/change-ticket');
//火车票改签详情
export const getDistributionChangeTrainAsyncRequest = newCommonRequestHandler('/v1/train/change-ticket-form');
//火车票改签提交
export const submitDistributionChangeTrainAsyncRequest = newCommonRequestHandler('/v1/train/change-ticket-apply');
//火车票改签状态获取
export const getDistributionChangeTrainStatusAsyncRequest = newCommonRequestHandler('/v1/train/change-occupy-monitor');
//火车票改签详情获取
export const getDistributionChangeTrainInfoAsyncRequest = newCommonRequestHandler('/v1/train/get_change_info');
//火车票取消改签
export const cancelDistributionChangeTrainAsyncRequest = newCommonRequestHandler('/v1/train/cancel-change');
//火车票确认改签
export const confirmDistributionChangeTrainAsyncRequest = newCommonRequestHandler('/v1/train/change-ticket-apply');
//火车票退票
export const cancelDistributionTrainTicketAsyncRequest = newCommonRequestHandler('/v1/train/cancel-ticket');
//火车票退款详情
export const getDistributionTrainOrderRefundDetailAsyncRequest = newCommonRequestHandler('/v1/train/refund-detail');
//火车票定损
export const setDistributionTrainOrderFixedLossAsyncRequest = commonRequestHandler('/api/train/fixed_loss');
