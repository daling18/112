import { commonRequestHandler } from './api';
import {newCommonRequestHandler} from './api_new';
//视觉中国获取关键字
export const promise_getVcgImageInfo = (params, showLoading = false) => new Promise((resolve) => commonRequestHandler('/api/photoalbum/get_vcg_image_info')({params, success: res => resolve(res), showLoading}))
//旅游线路-同业下单
export const promise_saleAddOrder =  (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/order/tuan/sale-add-order')({params, success: res => resolve(res), showLoading}));
//旅游线路-代理商搜索
export const promise_tyAgentSearch =  (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/order/tuan/ty-agent-search')({params, success: res => resolve(res), showLoading}));
//旅游线路-直客下单
export const promise_zkAddOrder =  (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/order/tuan/zk-add-order')({params, success: res => resolve(res)}, showLoading));
/********* 酒店 ***********/
//酒店产品列表
export const promise_getHotelList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/get-hotel-list')({params, success: res => resolve(res), showLoading}))
//城市搜索 
export const promise_getCityList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/area/city-sear')({params, success: res => resolve(res), showLoading}))
//酒店启用禁用
export const promise_hotelStatus = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/change-hotel-status')({params, success: res => resolve(res), showLoading}))
//获取区域列表-国家列表
export const promise_getCountry = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/area/get-country')({params, success: res => resolve(res), showLoading}))
//获取区域列表-省列表
export const promise_getProvinces = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/area/provinces')({params, success: res => resolve(res), showLoading}))
//获取区域列表-市列表
export const promise_getCity = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/area/citys')({params, success: res => resolve(res), showLoading}))
//获取区域列表-区县列表 
export const promise_getAreas = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/area/areas')({params, success: res => resolve(res), showLoading}))
//获取酒店品牌 
export const promise_getBrand = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/brand')({params, success: res => resolve(res), showLoading}))
//获取标签 
export const promise_getTags = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/tags')({params, success: res => resolve(res), showLoading}))
//获取酒店基础信息
export const promise_getDetailList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/detail-list')({params, success: res => resolve(res), showLoading}))
//新增酒店基础信息
export const promise_hotelInfo = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/info')({params, success: res => resolve(res), showLoading}))
//编辑保存酒店基础信息 
export const promise_editHotelInfo = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/edit-hotel-info')({params, success: res => resolve(res), showLoading}))
//获取酒店设施信息
export const promise_hotelFacilities = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/facilities')({params, success: res => resolve(res), showLoading}))
//新增修改酒店设施
export const promise_saveFacilities = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/save-facilities')({params, success: res => resolve(res), showLoading}))
//获取酒店详情信息   
export const promise_gethotelDetailList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/details-list')({params, success: res => resolve(res), showLoading}))
//新增酒店详情  
export const promise_addHotelDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/hotel-detail')({params, success: res => resolve(res), showLoading}))
//编辑酒店详情保存
export const promise_editHotelDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/edit-hotel-detail')({params, success: res => resolve(res), showLoading}))
//新增图文详情
export const promise_addHotelLauge = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/lauge-edit')({params, success: res => resolve(res), showLoading}))
//获取图文详情信息
export const promise_getHotelLauge = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/lauge-list')({params, success: res => resolve(res), showLoading}))
//获取图片列表
export const promise_getHotelImgList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/img-list')({params, success: res => resolve(res), showLoading}))
//酒店图片排序
export const promise_hotelPicSorts = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/cli-sorts')({params, success: res => resolve(res), showLoading}))
//酒店资源库列表
export const promise_hotelSresource = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/resource')({params, success: res => resolve(res), showLoading}))
//酒店设为首图、保存imgName
export const promise_hotelSetFirst = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/set-first')({params, success: res => resolve(res), showLoading}))
//酒店图片批量删除
export const promise_hotelImgDel = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/img-del')({params, success: res => resolve(res), showLoading}))
//酒店图片整体保存
export const promise_hotelLastSave = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/last-save')({params, success: res => resolve(res), showLoading}))
//酒店图片修改  
export const promise_hotelLastEdit = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/last-edit')({params, success: res => resolve(res), showLoading}))
//获取酒店图片类型
export const promise_hotelImageType = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/image-type')({params, success: res => resolve(res), showLoading}))
//获取酒店房型模板列表
export const promise_getHotelRoomLayoutList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-layout-list')({params, success: res => resolve(res), showLoading}))
//酒店-增加编辑模板房型基本信息 
export const promise_addHotelRoomTypeEdit = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/type-edit')({params, success: res => resolve(res), showLoading}))
//增加房型基本信息
export const promise_addRoomTypeInsert = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-inserts')({params, success: res => resolve(res), showLoading}))
//编辑房型基本信息
export const promise_editRoomTypeUpdates = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-updates')({params, success: res => resolve(res), showLoading}))
//获取模板房型详情
export const promise_getModalRoomTypeFind = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-type-find')({params, success: res => resolve(res), showLoading}))
//房型模板批量删除
export const promise_delModalRoomType = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-del')({params, success: res => resolve(res), showLoading}))
//房态价格日历列表
export const promise_getRoomType = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/get-room-type')({params, success: res => resolve(res), showLoading}))
//房态-选择添加房型 获取房型列表
export const promise_getRoomTypeList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-list')({params, success: res => resolve(res), showLoading}))
//房态-房型搜索模板 
// export const promise_searchRoomTemp = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/search-room-temp')({params, success: res => resolve(res), showLoading}))
//获取房态-房型详情
export const promise_getRoomTypeDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-finds')({params, success: res => resolve(res), showLoading}))
//获取设施列表
export const promise_getRoomFaciList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-faci-list')({params, success: res => resolve(res), showLoading}))
//房态-新增房型图片保存
export const promise_lastSaveRoom = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/last-save-room')({params, success: res => resolve(res), showLoading}))
//房态——编辑房型图片保存
export const promise_lastEditRoom = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/last-edit-room')({params, success: res => resolve(res), showLoading}))
//添加套餐的 获取酒店房型
export const promise_getRoomList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/get-room-list')({params, success: res => resolve(res), showLoading}))
//添加套餐
export const promise_hotelAddPackage = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/add-package')({params, success: res => resolve(res), showLoading}))
//套餐床型分类
export const promise_getHotelBedType = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/bed-type')({params, success: res => resolve(res), showLoading}))
//套餐详情信息
export const promise_getPackageDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/package-detail')({params, success: res => resolve(res), showLoading}))
//编辑保存套餐
export const promise_editPackage = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/edit-package')({params, success: res => resolve(res), showLoading}))
//新增套餐每日报价
export const promise_addEverydayPrice = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/add-package-price')({params, success: res => resolve(res), showLoading}))
//获取每日报价详情信息
export const promise_getEveryDayPricDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/get-everyday-price-detail')({params, success: res => resolve(res), showLoading}))
//编辑套餐每日报价
export const promise_editEverdayPricDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/edit-everyday-price')({params, success: res => resolve(res), showLoading}))
//编辑套餐每日报价启用禁用
export const promise_changePackagePriceStatus = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/change-package-price-status')({params, success: res => resolve(res), showLoading}))
//上下架套餐
export const promise_changePackageStatus = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/change-package-status')({params, success: res => resolve(res), showLoading}))
//上下架房型
export const promise_changeRoomStatus = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/change-room-status')({params, success: res => resolve(res), showLoading}))
//删除套餐
export const promise_deletePackage = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/delete-package')({params, success: res => resolve(res), showLoading}))
//删除房型
export const promise_deleteRoomType = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/hotel-room-del')({params, success: res => resolve(res), showLoading}))
//酒店基础-搜索商圈
export const hotel_searchBusinessCircle = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/business-circle')({params, success: res => resolve(res), showLoading}))
//房型存在-直接添加到房态列表
export const hotel_roomExiteSave = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/room-exite-save')({params, success: res => resolve(res), showLoading}))
//批量操作-获取房型套餐名称列表 
export const hotel_getRoomPackageInfo = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/get-room-package-info')({params, success: res => resolve(res), showLoading}))
//批量编辑套餐报价 
export const hotel_editPackagePrice = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/edit-package-price')({params, success: res => resolve(res), showLoading}))
//批量编辑套餐房量
export const hotel_editPackageStock = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/hotel/edit-package-stock')({params, success: res => resolve(res), showLoading}))

/****** 分润政策 *******/
//获取默认政策数据
export const promise_policySetList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/set-list')({params, success: res => resolve(res), showLoading}))
//保存酒店分润政策
export const promise_policySave = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/save')({params, success: res => resolve(res), showLoading}))
//房型套餐设置政策、批量添加政策
export const promise_roomPackagePolicySave = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/policy-save')({params, success: res => resolve(res), showLoading}))
//获取设置政策信息
export const promise_getroomPackagePolicyInfo = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/sharepolicy/policy/custom')({params, success: res => resolve(res), showLoading}))
