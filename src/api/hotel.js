import {
  commonRequestHandler
} from './api';
import {
  newCommonRequestHandler
} from './api_new';
/*****分销中心-酒店预订******/

//酒店所在地区查询接口
export const querySearchCityHotelAsyncRequest = commonRequestHandler('/api/zone/search_city');
//酒店列表查询接口
export const searchDistributionHolelAsyncRequest = commonRequestHandler('/api/hotel/index');
//酒店详情接口
export const getDistributionHolelDetailAsyncRequest = commonRequestHandler('/api/hotel/detail');
//酒店价格房型价格查询接口
export const getDistributionHolelRoomsAsyncRequest = commonRequestHandler('/api/hotel/price');
//酒店预订房间价格查询接口
export const getDistributionHolelRoomsPriceAsyncRequest = commonRequestHandler('/api/hotel/roomPrice');
//酒店预订创建订单接口
export const createDistributionHotelOrderAsyncRequest = commonRequestHandler('/api/hotel/createOrder');

/*****分销中心-酒店订单******/


// 酒店订单列表新接口
export const NewHotelOrderListAsyncRequest = newCommonRequestHandler('/v1/hotel-order/hotel-order-list');
// 酒店订单详情新接口
export const NewHotelOrderDetailAsyncRequest = newCommonRequestHandler('/v1/hotel-order/order-info');
//我的订单列表查询接口
export const searchDistributionHolelMyOrderListAsyncRequest = commonRequestHandler('/api/hotel/orderList/2');
//采购订单列表查询接口
export const searchDistributionHolelPurchaseOrderListAsyncRequest = commonRequestHandler('/api/hotel/orderList/2');
//单项订单列表查询接口
export const searchDistributionHolelSingleOrderListAsyncRequest = commonRequestHandler('/api/hotel/orderList/1');
//自营订单列表查询接口
export const searchDistributionHolelSelfSupportOrderListAsyncRequest = commonRequestHandler('/api/hotel/orderList/3');
//我的订单详情接口
export const getDistributionHolelMyOrderDetailAsyncRequest = commonRequestHandler('/api/hotel/orderDetail/2');
//单项订单详情接口
export const getDistributionHolelSingleOrderDetailAsyncRequest = commonRequestHandler('/api/hotel/orderDetail/1');
//自营订单详情接口
export const getDistributionHolelSelfSupportOrderDetailAsyncRequest = commonRequestHandler('/api/hotel/orderDetail/3');
//订单取消接口
export const cancelDistributionHolelOrderAsyncRequest = commonRequestHandler('/api/hotel/cancelOrder');
//订单退款接口
export const refundDistributionHolelOrderAsyncRequest = commonRequestHandler('/api/hotel/orderRefund');
//我的订单退款详情接口
export const getDistributionHolelMyOrderRefundDetailAsyncRequest = commonRequestHandler('/api/hotel/refundDetail/2');
//单项订单退款详情接口
export const getDistributionHolelSingleOrderRefundDetailAsyncRequest = commonRequestHandler('/api/hotel/refundDetail/1');
//自营订单退款详情接口
export const getDistributionHolelSupportOrderRefundDetailAsyncRequest = commonRequestHandler('/api/hotel/refundDetail/2');

export const getDistributionHolelSelfSupportOrderRefundDetailAsyncRequest = commonRequestHandler('/api/hotel/refundDetail/3');

//订单退款详情定损接口
export const setDistributionHolelOrderFixedLossAsyncRequest = commonRequestHandler('/api/hotel/fixedLoss');
//订单确认接口接口
export const setDistributionHolelConfirmOrderAsyncRequest = commonRequestHandler('/api/hotel/confirmOrder');
//新-订单确认接口
export const newSetDistributionHolelConfirmOrderAsyncRequest = newCommonRequestHandler('/v1/hotel-order/confirm-order');

//订单支付校验接口
export const getDistributionHotelOrderHasAvail = commonRequestHandler('/api/hotel/order_have_avail');


/*****自营单项-酒店******/

//自营酒店列表接口
export const searchSelfSupportHolelAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/hotelList');
//自营酒店状态变更接口
export const changeSelfSupportHolelStatusAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/changeStatus');
//自营酒店详情接口
export const getSelfSupportHolelDetailAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/detail');
//自营酒店品牌获取接口
export const querySearchHotelBrandAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/brandList');
//自营酒店标签获取接口
export const getSelfSupportHolelTagsAsyncRequest = commonRequestHandler('/api/selfsupport.tag/index');
//自营酒店设施获取接口
export const getSelfSupportHolelFacilitiesAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/facilities');
//自营酒店新增编辑接口
export const addOrEditSelfSupportHolelAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/store');

/*****自营单项-房型******/

//自营房型列表接口
export const searchSelfSupportRoomListAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/roomList');
//自营房型状态变更接口
export const changeSelfSupportRoomStatusAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/changeRoomStatus');
//自营房型详情接口
export const getSelfSupportRoomDetailAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/roomDetail');
//自营房型新增编辑接口
export const editSelfSupportRoomAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/storeRoom');
//自营房型价格套餐列表接口
export const searchSelfSupportRoomPackageListAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/roomPackageList');
//自营房型价格套餐状态变更接口
export const changeSelfSupportRoomPackageStatusAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/changeRoomPackageStatus');
//自营房型价格套餐编辑提交接口
export const submitRoomPackageFormAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/storeRoomPackage');
//自营房型价格套餐详情获取接口
export const getSelfSupportRoomPackageDetailAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/roomPackageDetail');
//自营房型价格套餐上下架及撤回接口
export const changeSelfSupportRoomPackagePutawayAsyncRequest = commonRequestHandler('/api/selfsupport.hotel/changePackageStatus');

/*****店铺订单-酒店订单******/
export const getShopHotelOrderList = newCommonRequestHandler('/v1/order/shop/hotel-order-list');


//酒店合库 合并代码后在做统一优化
let getAxios = (url) => {
  return (params) => {
    return new Promise((resolve) => {
      let http = newCommonRequestHandler(url)
      http({
        params: {
          data: params
        },
        success: (data) => resolve(data.data)
      })
    })
  }

}
export let mergeApi = {
  getHotelList: getAxios('/v1/hotel-combine/get-hotel-list'), //列表
  getHotelInfo: getAxios('/v1/hotel-combine/get-hotel-info'), //详情
  getHotelRecommend: getAxios('/v1/hotel-combine/hotel-recommend'), //酒店推荐
  autoMatch: getAxios('/v1/hotel-combine/auto-match'), //搜索联想
  getRoomList: getAxios('/v1/hotel-combine/get-room-list'), //房形列表
  combineRoom: getAxios('/v1/hotel-combine/combine-room'), //房形合并
  splitHotelRoom: getAxios('/v1/hotel-combine/split-room'), //房型拆分 //酒店拆分
  combineHotel: getAxios('/v1/hotel-combine/combine-hotel'), //酒店合并
  changeHotelStatus: getAxios('/v1/hotel-combine/change-hotel-status'), //酒店合并
  getSupplier:getAxios('/v1/hotel/supplier')
  
}
