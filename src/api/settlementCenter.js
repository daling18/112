import http from 'src/plugins/axios';
import {
  newCommonRequestHandler
} from './api_new';

// 结算中心-退款处理列表
export const lineOrderRefundList = (p) => http.post('lineservice/line-order/refund-list', p);

// 线路订单退团退款-退团人员金额读取
export const lineOrderRefundGet = (p) => http.post('lineservice/line-order/get-refund', p);

// 线路订单退团退款-退团款
export const lineOrderRefund = (p) => http.post('lineservice/line-order/refund', p);

// 线路订单退团退款-退团详情
export const lineOrderGetRefundDetails = (p) => http.post('lineservice/line-order/get-refund-details', p);

// 线路订单退团退款-退团定损
export const lineOrderSetRefundLoss = (p) => http.post('lineservice/line-order/set-refund-loss', p);

// 线路订单退团退款-退团2次定损
export const lineOrderSetRefundProfit = (p) => http.post('lineservice/line-order/set-refund-profit', p);

// 线路订单退团退款-退团是否确认
export const lineOrderCancelRefund = (p) => http.post('lineservice/line-order/cancel-refund', p);

// 线路订单退团退款-财务读取退团详情
export const lineOrderGetFinanceRefundDetails = (p) => http.post('lineservice/line-order/get-finance-refund-details', p);

// 线路订单退团退款-财务退款备注
export const lineOrderPostFinanceRefundLog = (p) => http.post('lineservice/line-order/post-finance-refund-log', p);

// 线路订单退团退款-财务拒绝退款
export const lineOrderPostFinanceRefuse = (p) => http.post('lineservice/line-order/post-finance-refuse', p);

// 线路订单退团退款-财务线下退款
export const lineOrderPostFinanceUnderLine = (p) => http.post('lineservice/line-order/post-finance-under-line', p);

// 线路订单退团退款-财务线上退款
export const lineOrderPostFinanceUpLine = (p) => http.post('lineservice/line-order/post-finance-up-line', p);