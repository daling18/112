import {commonRequestHandler} from './api';

// 营业部销售-产品查询
export const getSalesDeptSaleGroupList = commonRequestHandler(`/api_store/sale/product_list`);
// 营业部销售-产品查询
export const getSalesDeptSaleReserveList  = commonRequestHandler(`/api_store/sale/sale_book_tuan_list`);
// 营业部销售-行程详情
export const SalesDeptSaleBomDetail = commonRequestHandler(`/api_store/sale/sale_detail`);
