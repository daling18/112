import {commonRequestHandler} from './api';

// 直客收款列表 https://testerp.yktour.com.cn/docs/bom/574
export const receiptsList = commonRequestHandler('/api/zhike/receipts_list');

// 直客撤销收款记录  https://testerp.yktour.com.cn/docs/bom/zhike_payment_cancel
export const salePaymentCancel = commonRequestHandler('/api/zhike/sale_payment_cancel');
export const paymentCancel = commonRequestHandler('/api/zhike/payment_cancel');

// 直客重新发起-收款记录 https://testerp.yktour.com.cn/docs/bom/zhike_reissue_receipt
export const saleReissueReceipt = commonRequestHandler('/api/zhike/sale_reissue_receipt');
export const reissueReceipt = commonRequestHandler('/api/zhike/reissue_receipt');

// 直客作废-收款记录 https://testerp.yktour.com.cn/docs/bom/zhike_payment_scrap
export const paymentScrap = commonRequestHandler('/api/zhike/payment_scrap');
