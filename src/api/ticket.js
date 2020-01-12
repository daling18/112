import {commonRequestHandler} from './api';

/*****   门票  ******/
export const getScenicList = commonRequestHandler('/api/selfsupport.scenic/scenicList');
export const getScenicDetails = commonRequestHandler('/api/selfsupport.scenic/scenicDetail');
export const setTicketDetails = commonRequestHandler('/api/ticket/create_order');
export const getTicketQuoteDetails = commonRequestHandler('/api/ticket/get_quote_detail');


/***** 门票订单 ******/
//订单列表（我的订单）
export const getTicketMyOrder = commonRequestHandler('/api/ticket/order_list/1');
//订单列表（订单管理）
export const getTicketSingleOrder = commonRequestHandler('/api/ticket/order_list/2');
//订单列表（自营订单）
export const getTicketSelfSupportOrder = commonRequestHandler('/api/ticket/order_list/3');

//订单详情（我的订单）
export const getTicketMyOrderDetail = commonRequestHandler('/api/ticket/order_detail/1');
//订单详情（订单管理）
export const getTicketSingleOrderDetail = commonRequestHandler('/api/ticket/order_detail/2');
//订单详情（自营订单）
export const getTicketSelfSupportOrderDetail = commonRequestHandler('/api/ticket/order_detail/3');

//订单退款详情（我的订单）
export const getTicketMyOrderRefundDetail = commonRequestHandler('/api/ticket/refund_detail/1');
//订单退款详情（订单管理）
export const getTicketSingleOrderRefundDetail = commonRequestHandler('/api/ticket/refund_detail/2');
//订单退款详情（自营订单）
export const getTicketSelfSupportOrderRefundDetail = commonRequestHandler('/api/ticket/refund_detail/3');


export const cancelTicketOrder = commonRequestHandler('/api/ticket/cancel_order');
export const refundTicket = commonRequestHandler('/api/ticket/refund');
export const refundTicketDetail = commonRequestHandler('/api/ticket/refund_detail');
export const changeTicketContact = commonRequestHandler('/api/ticket/change_contacts_mobile');
export const getTicketOrderDetails = commonRequestHandler('/api/ticket/order_detail');
export const setTicketModifyPrice = commonRequestHandler('/api/ticket/modify_price');
export const setTicketComfirmOrder = commonRequestHandler('/api/ticket/confirm_order');
export const setTicketVerification = commonRequestHandler('/api/ticket/verification_ticket');
export const setTicketOrderFixedLoss = commonRequestHandler('/api/ticket/fixed_loss');
