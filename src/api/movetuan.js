import {commonRequestHandler} from './api';

// 选择目标团  https://testerp.yktour.com.cn/docs/bom/1012
export const selectTuan = commonRequestHandler('/api/movetuan/select_tuan');

// 创建订单  https://testerp.yktour.com.cn/docs/bom/1027
export const createOrder = commonRequestHandler('/api/movetuan/create_order');

// 提交创建订单  https://testerp.yktour.com.cn/docs/bom/1064
export const doCreateOrder = commonRequestHandler('/api/movetuan/do_create_order');

// 选择收款列表  https://testerp.yktour.com.cn/docs/bom/1063
export const selectPaymentLists = commonRequestHandler('/api/movetuan/select_payment_lists');