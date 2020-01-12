import {newCommonRequestHandler} from './api_new';

// 旅游线路-团期报价-搜索出发城市
export const handleSearchCity = newCommonRequestHandler('/v1/touristroute/product/search-city');
// 旅游线路-团期报价-列表
export const priceTypeList = newCommonRequestHandler('/v1/touristroute/line-product-price/list');
// 旅游线路-团期报价-编辑价格
export const handleEditPrice = newCommonRequestHandler('/v1/touristroute/line-product-price/detail');
// 旅游线路-团期报价-编辑价格类型
export const handleSetPrice = newCommonRequestHandler('/v1/touristroute/line-product-price/save');
// 旅游线路-团期报价-创建价格类型
export const handleSetNewPrice = newCommonRequestHandler('/v1/touristroute/line-product-price/save-stock');
// 旅游线路-团期报价-删除报价城市或套餐或价格
export const handleDelPrice = newCommonRequestHandler('/v1/touristroute/line-product-price/del');
// 旅游线路-团期报价-日历展示报价
export const showDatePrice = newCommonRequestHandler('/v1/touristroute/line-product-price/show-date');
// 旅游线路-团期报价-状态控制
export const changePriceStatus = newCommonRequestHandler('/v1/touristroute/line-product-price/change-status');
// 旅游线路-团期报价-修改单个价格
export const updatePlanNum = newCommonRequestHandler('/v1/touristroute/line-product-price/update-stock-single');
// 旅游线路-团期报价-删除单个价格
export const delPriceDate = newCommonRequestHandler('/v1/touristroute/line-product-price/del-stock-single');






