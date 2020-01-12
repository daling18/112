import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';
// 在线支付 https://testerp.yktour.com.cn/docs/bom/bom-1aonoigaid0o9
export const payOrder = commonRequestHandler('/api/pay/pay_order');

// 在线支付 https://testerp.yktour.com.cn/docs/bom/bom-1aonoigaid0o9 (新接口)
export const newPayOrder = newCommonRequestHandler('/v1/payment/pay');

// 财务操作-手续费-列表 https://testerp.yktour.com.cn/docs/bom/bom-1ap642eh3nnhv
export const getBrokeageList = commonRequestHandler('/api/pay/get_brokerage_list');