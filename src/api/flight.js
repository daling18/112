import {
  commonRequestHandler
} from './api';
import {
  newCommonRequestHandler
} from './api_new';
import http from 'src/plugins/axios';

/*****国内机票******/

export const getInlandFlightSpecial = commonRequestHandler('/api/flight/domestic/oneway_special');
export const getInlandFlight = commonRequestHandler('/api/domestic_flight/inquiry');
export const getInlandFlightRefund = commonRequestHandler('/api/domestic_flight/query_fare_remark');
export const getInlandFlightStopDetail = commonRequestHandler('/api/domestic_flight/stop_detail');
export const getInlandFlightDetails = commonRequestHandler('/api/domestic_flight/flight_detail');
export const createInlandFlightOrder = commonRequestHandler('/api/domestic_flight/create_order');
export const getInlandCalandarDate = commonRequestHandler('/api/domestic_flight/calendar');
export const getJourneyFlightDetail = commonRequestHandler('/api/domestic_flight/journey_flight_detail');
export const getTicketChange = commonRequestHandler('/api/domestic_flight/ticket_change');
//改期详情
export const getFlightChangeInfo = commonRequestHandler('/api/flight/flight_change_info');
//改签支付差价
export const getPayOrder = commonRequestHandler('/api/pay/pay_order');
//机票改签获取详情
export const getTouristInfo = commonRequestHandler('/api/flight/flight_segment_tourist_info')
//国际机票改签回跳获取详情
export const getFlightDetail = commonRequestHandler('/api/intl_flight/journey_flight_detail')
// 国际改期申请
export const getIntlTicketChangeMany = commonRequestHandler('/api/domestic_flight/intl_ticket_change_many')
// 退废票详情
export const flightRefundInfo = commonRequestHandler('/api/flight/flight_refund_info')

/*****国际机票******/
export const getForeignFlight = commonRequestHandler('/api/intl_flight/inquiry');
export const getForeignFlightRefund = commonRequestHandler('/api/intl_flight/refundRule');
export const getForeignFlightDetails = commonRequestHandler('/api/intl_flight/detail');
export const createForeignFlightOrder = commonRequestHandler('/api/intl_flight/createOrder');

/***** 机票订单 ******/
//订单列表（我的订单）
export const getFlightMyOrder = commonRequestHandler('/api/flight/order_list/1');
//订单列表（订单管理）
export const getFlightSingleOrder = commonRequestHandler('/api/flight/order_list/2');
//订单列表（自营订单）
export const getFlightPurchaseOrder = commonRequestHandler('/api/flight/order_list/3');

//订单详情（我的订单）
export const getFlightMyOrderDetail = commonRequestHandler('/api/flight/order_detail/1');
//订单详情（订单管理）
export const getFlightSingleOrderDetail = commonRequestHandler('/api/flight/order_detail/2');
//订单详情（自营订单）
export const getFlightSelfSupportOrderDetail = commonRequestHandler('/api/flight/order_detail/3');

//订单退款详情（我的订单）
export const getFlightMyOrderReFundDetail = commonRequestHandler('/api/flight/refund_detail/1');
//订单退款详情（订单管理）
export const getFlightSingleOrderReFundDetail = commonRequestHandler('/api/flight/refund_detail/2');
//订单退款详情（自营订单）
export const getFlightSelfSupportOrderReFundDetail = commonRequestHandler('/api/flight/refund_detail/3');

export const flightOrderCancel = commonRequestHandler('/api/flight/cancel_order');
export const flightOrderChange = commonRequestHandler('/api/flight/order/ticket_change');
export const refundFlight = commonRequestHandler('/api/flight/refund');

export const flightRefundFee = commonRequestHandler('/api/flight/order/refund_fee');
export const flightTodo = commonRequestHandler('/api/flight/order/submit');
export const flightChangeDetail = commonRequestHandler('/api/flight/order/ticket_change_detail');
export const flightPayChangeFee = commonRequestHandler('/api/flight/order/pay_change_fee');
export const flightIntlOrderChange = commonRequestHandler('/api/flight/order/intl_ticket_change');
export const flightIntlRefund = commonRequestHandler('/api/flight/order/intl_refund');
export const setFlightModifyPrice = commonRequestHandler('/api/flight/modify_price');
export const setFlightOrderFixedLoss = commonRequestHandler('/api/flight/fixed_loss');

export const searchFlightCity = newCommonRequestHandler('/v1/salecenter/flights/city-search');

//新增国际机票订单
//订单列表
export const getAirSingleOrder = newCommonRequestHandler('/v1/flight/index/list')
//订单详情
export const getAirSingleOrderDetail = newCommonRequestHandler('/v1/flight/index/order-detail')
//退款详情
export const getAirSingleOrderDesert = newCommonRequestHandler('/v1/flight/index/refund-detail')
//改签详情
export const getAirSingleOrderChange = newCommonRequestHandler('/v1/flight/index/change-detail')
// 退票操作
export const AirRefund = newCommonRequestHandler('/v1/flight/tg-inter/do-refund')
// 改签操作
export const AirChange = newCommonRequestHandler('/v1/flight/tg-inter/do-change')
// ***********国内**********//
//退票查询  现在不用请求参数不用加data 层
export const landRefundSearch = p => http.post('flight/tg-flight/refund-search', p);
//  = newCommonRequestHandler('/v1/flight/tg-flight/refund-search')
//退票申请
export const landApplyRefund = newCommonRequestHandler('/v1/flight/tg-flight/apply-refund')
//取消订单
export const cancelLandOrder = p => http.post('flight/domestic-flight/order-cancel', p);
// 改签查询
// export const flightChangeSearch = newCommonRequestHandler('/v1/flight/tg-flight/change-search')
export const flightChangeSearch = p => http.post('flight/tg-flight/change-search', p);
//改签申请提交
export const flightChangeApply = p => http.post('flight/tg-flight/apply-change', p);

//***********国际*****************//
//国际取消订单
export const cancelInternationalOrder = p => http.post('flight/tg-inter/cancel', p);
// 国际退票查询 现在不用请求参数不用加data 层
export const tgInterRefundSearch = p => http.post('flight/tg-inter/refund-search', p);
//  = newCommonRequestHandler('/v1/flight/tg-inter/refund-search')
//国际改签查询-我要改签
export const airChangeSearch = newCommonRequestHandler('/v1/flight/tg-inter/change-search')
//国际改签-已支付
export const AirChangePay = newCommonRequestHandler('/v1/flight/tg-inter/do-change-pay')
// 国际改签查询-我要改签
export const tgInterChangeSearch = newCommonRequestHandler('/v1/flight/tg-inter/change-search')
//国际改签航班查询
export const airInterChangeSearch = newCommonRequestHandler('/v1/flight/tg-inter/change-flight-search')
// 国际退票申请
export const tgInterApplyRefund = newCommonRequestHandler('/v1/flight/tg-inter/apply-refund')
//国际改签申请
export const tgInterApplyChange = newCommonRequestHandler('/v1/flight/tg-inter/apply-change')
//图片上传
export const flightUpload = newCommonRequestHandler('v1/domestic-flight/flight-upload')
//改签支付差价
export const payment = newCommonRequestHandler('/v1/payment/pay')
