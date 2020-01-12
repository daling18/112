import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';

//保险产品列表
export const queryInsuranceProductList = commonRequestHandler('/api/Insurance/getProList');
export const queryInsuranceProductListNew = newCommonRequestHandler('/v1/insurance/insurance/product-list');

//保险产品详情
export const queryInsuranceProductDetail = commonRequestHandler('/api/Insurance/getProDetail');
export const queryInsuranceProductDetailNew = newCommonRequestHandler('/v1/insurance/insurance/product-detail');

//保险产品改价
export const insuranceUpdatePrice = commonRequestHandler('/api/Insurance/updatePrice');

//保险获取条款
export const getProductTerms = commonRequestHandler('/api/Insurance/getProductTerms');
