import http from 'src/plugins/axios';
export const getSearch = (p) => http.post('lineservice/line/init-search', p);
import {
  newCommonRequestHandler
} from './api_new';
import {
  commonRequestHandler
} from './api';

// 旅游线路-线路订单列表获取配置信息
export const lineQuoteOrderCondition = (p) => http.post('lineservice/line-quote-order/order_condition', p);

// 旅游线路-线路订单-列表
export const lineQuoteOrdeList = (p) => http.post('lineservice/line-quote-order/order_list', p);

// 旅游线路-线路订单-详情
export const lineQuoteOrdeDetail = (p) => http.post('lineservice/line-quote-order/order_detail', p);

// 旅游线路-线路订单-详情-确认位置
export const lineQuoteOrdeConfimOrder = (p) => http.post('lineservice/line-quote-order/confirm_order', p);

// 旅游线路/销售订单-线路订单-详情-订单调价
export const lineOrderPriceAdjustment = (p) => http.post('lineservice/line-order/price_adjustment', p);

//旅游线路/销售订单-线路订单-详情-上传出团通知书
export const lineOrderUploadNotifications = (p) => http.post('lineservice/line-order/upload_notifications', p);

// 旅游线路/销售订单-线路订单-详情-操作记录
export const lineOrderGetOrderOp = (p) => http.post('lineservice/line-order/get_order_op', p);

//旅游线路/销售订单-线路订单-详情-取消订单
export const lineOrderCancelOrder = (p) => http.post('lineservice/line-order/cancel_order', p);

//旅游线路-线路订单-详情-确认件
export const lineOrderCreateConfirmation = (p) => http.post('lineservice/line-quote-order/create_confirmation', p);

// 销售订单-线路订单列表获取配置信息
// export const lineOrderGetParams = (p) => http.post('lineservice/line-order/get_params', p);


// 跟团游自由行 - 自营产品列表
// export const getSelfSupport = (p) => http.post('lineservice/line/self-list', p);

//自营产品-说明信息-补全说明信息
export const lineOrderSaleCreateMisc = (p) => http.post('lineservice/line/create-misc', p);
//自营产品-产品详情-线路基本信息
export const lineOrderSaleLineInfo = (p) => http.post('lineservice/line/line-info', p);
//自营产品-产品详情-行程介绍信息
export const lineOrderSaleTripInfo = (p) => http.post('lineservice/line/trip-info', p);

//自营产品-产品详情-行程特色信息(获取其他说明信息)
export const lineOrderSaleMiscInfo = (p) => http.post('lineservice/line/misc-info', p);

// 旅游线路 - 创建行程(获取基本信息)
export const getCreateLineInitData = () => http.post('lineservice/line/init-data');
// 旅游线路 - 完善行程
export const createTrip = (p) => http.post('lineservice/line/create-trip', p);
// 旅游线路 - 修改是否展示到网站
export const updateShowFornt = (p) => http.post('lineservice/line/show-front', p);

// 获取线路类型
export const getCreateLineType = (p) => http.post('lineservice/line/change-line-type', p, false);
// 线路负责人
export const getCreateOperator = (p) => http.post('lineservice/line/change-op', p, false);
// 出发城市
export const searchDeparture = (p) => http.post('lineservice/line/search-departure', p, false);
// 目的地城市
export const searchDestination = (p) => http.post('lineservice/line/search-destination', p, false);
// 搜索供应商
export const getCreateSupplier = (p) => http.post('lineservice/line/get-supply', p, false);
// 保存行程基本信息
export const createLineTrip = (p) => {
  // 线路id存在
  if (p.id) {
    return http.post('lineservice/line/edit-line', p)
  }
  return http.post('lineservice/line/create-line', p)
};
// 产品状态变化
export const changeProductStatus = (p) => http.post('lineservice/line/open', p);
// 线路删除
export const deleteProduct = (p) => http.post('lineservice/line/remove', p);
// 下载行程单
export const downloadTrip = (p) => http.post('lineservice/line/download-trip', p);

// 获取线路团期概要
export const getCalendarList = (p) => http.post('lineservice/quote/calender-list', p);

// 获取团期详情(特定日期)
export const getStockDetail = (p, showLoading = false) => http.post('lineservice/quote/detail', p, showLoading);

// 获取团期数据
export const getStockAll = (p) => http.post('lineservice/quote/get-quote-date', p);

export const changeStockQuote = (p) => http.post('lineservice/quote/open', p)

// 删除报价
export const deleteQuote = (p) => http.post('lineservice/quote/remove', p);

//新增团期
export const createStock = (p) => http.post('lineservice/quote/create', p);

//获取景点
export const getScenic = (p) => http.post('scenic', p, false);
// 获取产品标签
export const getLabel = (p) => http.post('system/theme', p, false);
// 创建产品标签
export const createLabel = (p) => http.post('system/theme/create', p);

// 获取线路数据, 复制线路在用
export const getTripLine = (p) => http.post('lineservice/line/search-line', p, false)

// 获取上架渠道
export const getChannelList = (p) => http.post('lineservice/publish/channel-list', p);

// 产品上架
export const setProductUp = (p) => http.post('lineservice/publish/up', p, false);
// 产品下架
export const setProductDown = (p) => http.post('lineservice/publish/down', p, false);
// 上架撤回
export const setProductRecall = (p) => http.post('lineservice/publish/recall', p);

// 审批操作
export const dealApproval = (p) => {
  let request = commonRequestHandler('/api/approval/deal_approval_batch');

  return new Promise(function (resolve, reject) {
    request({
      params: {
        data: p
      },
      success(res) {
        resolve(res.data)
      },
      showLoading: true
    })
  })
};

// 审批详情
export const getApprovalDetail = p => {
  let request = commonRequestHandler('/api/approval/approval_detail');
  return new Promise(resolve => {
    request({
      params: {
        data: p
      },
      success(res) {
        resolve(res)
      },
      showLoading: true
    })
  })
};

// 审批修改线路名称
export const postLineTitle = p => http.post('lineservice/line/edit-title', p);
// 修改主图
export const setCoverImage = p => http.post('lineservice/line/set-cover', p);

// export const deleteQuote = (p) => http.post('lineservice/quote/remove', p)

let ERROR = {
  code: 50000,
  msg: '服务器请求失败，请刷新重试'
}
// 销售订单-线路订单列表获取配置信息
export const lineOrderGetParams = (p, showLoading = false) => http.post('lineservice/line-order/get_params', p, showLoading).catch(err => ERROR)
// 自营订单产品
export const getSelfSupport = (p, showLoading = true) => http.post('lineservice/line/self-list', p, showLoading).catch(err => ERROR)
// 供应商产品
export const getSupplier = (p) => http.post('lineservice/line/supplier-list', p);
// 辖区内产品
export const getBusiness = (p) => http.post('lineservice/line/business-list', p);
// 其他辖区产品
export const getOther = (p) => http.post('lineservice/line/other-list', p);

export const copyProduct = (p) => http.post('lineservice/line/copy', p);

// 销售订单-线路订单列表
export const lineOrderSaleOrderList = (p, showLoading = false) => http.post('lineservice/line-order/sale_order_list', p, showLoading).catch(err => ERROR)
// 销售订单-详情
export const lineOrderSaleOrderDetail = (p, showLoading = false) => http.post('lineservice/line-order/order_detail', p, showLoading).catch(err => ERROR)
//获取操作日志
export const lineOrderSaleOrdergetOrderOp = (p, showLoading = false) => http.post('lineservice/line-order/get_order_op', p, showLoading).catch(err => ERROR)
//取消订单
export const lineOrderSaleOrdercancelOrder = (p, showLoading = false) => http.post('lineservice/line-order/cancel_order', p, showLoading).catch(err => ERROR)
//编辑订单备注
export const lineOrderSaleOrderRemark = (p, showLoading = false) => http.post('lineservice/line-order/order_remark', p, showLoading).catch(err => ERROR)
//编辑游客信息
export const lineOrderSaleOrderTouristEdit = (p, showLoading = false) => http.post('/lineservice/line-order/tourist_edit', p, showLoading).catch(err => ERROR)
//重新下单
export const lineOrderSaleOrderAgainOrder = (p, showLoading = false) => http.post('/lineservice/line-quote-order/again_order', p, showLoading).catch(err => ERROR)
//申请退款
export const lineOrderSaleOrderRefundOrder = (p, showLoading = false) => http.post('/lineservice/line-order/refund', p, showLoading).catch(err => ERROR)

//获取退款用户 利润金额
export const lineOrderSaleOrderGetRefund = (p, showLoading = false) => http.post('/lineservice/line-order/get-refund', p, showLoading).catch(err => ERROR)

//获取付款账户
export const lineOrderSaleOrderPaymentAccount = (p, showLoading = false) => http.post('lineservice/line-order/get_payment_account', p, showLoading).catch(err => ERROR)
//订单付款
export const lineOrderSaleOrderPay = (p, showLoading = false) => http.post('/payment/pay', p, showLoading).catch(err => ERROR)
//线下付款
export const lineOrderSaleOrderOffPay = (p, showLoading = false) => http.post('/lineservice/line-order/off_pay', p, showLoading).catch(err => ERROR)
//订单调价                
//预览合同
// export const lineOrderSaleOrderPreviewContract = (p) => http.post('/lineservice/line-quote-order/preview_contract', p).catch(err => ERROR)
export const lineOrderSaleOrderPriceAdjustment = (p, showLoading = false) => http.post('/lineservice/line-order/price_adjustment', p, showLoading).catch(err => ERROR)
//合同
// 编辑合同
export const lineOrderSaleOrderModifyContract = (p, showLoading = false) => http.post('/lineservice/line-quote-order/modify_contract', p, showLoading).catch(err => ERROR)
//下载合同
export const lineOrderSaleOrderDownloadContract = (p, showLoading = false) => http.post('/lineservice/line-quote-order/download_contract', p, showLoading).catch(err => ERROR)
//预览合同
export const lineOrderSaleOrderPreviewContract = (p, showLoading = false) => http.post('/lineservice/line-quote-order/preview_contract', p, showLoading).catch(err => ERROR);
//重新下载合同
export const lineOrderSaleOrderReDownloadContract = (p, showLoading ) => http.post('lineservice/line-quote-order/create_contract', p, showLoading).catch(err => ERROR);
