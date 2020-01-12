import { commonRequestHandler } from './api';
import { newCommonRequestHandler } from './api_new';

// 获取行程渠道操作信息 https://testerp.yktour.com.cn/docs/bom/channel_operation
export const channelOperation = commonRequestHandler('/api/product/channel_operation');

// BOM行程渠道下上架 https://testerp.yktour.com.cn/docs/bom/putaway
export const putaway = commonRequestHandler('/api/product/putaway');

// BOM行程渠道下下架 https://testerp.yktour.com.cn/docs/bom/sold_out
export const soldOut = commonRequestHandler('/api/product/sold_out');

// BOM行程渠道下上架审批中撤回 https://testerp.yktour.com.cn/docs/bom/send_back
export const sendBack = commonRequestHandler('/api/product/send_back');

// 行程单下载-下载pdf https://testerp.yktour.com.cn/docs/bom/save_travel_detail_pdf
export const saveTravelDetailPdf = commonRequestHandler('/api/product/save_travel_detail_pdf');

// 行程单下载-下载pdf https://testerp.yktour.com.cn/docs/bom/save_travel_detail_word
export const saveTravelDetailWord = commonRequestHandler('/api/product/save_travel_detail_word');

// 鱼儿游同步操作 
export const synYueryou = commonRequestHandler('/api/product/syn_yueryou');

// 删除bom行程  https://testerp.yktour.com.cn/docs/bom/del_product
export const delProduct = commonRequestHandler('/api/product/del_product');

// 分公司行程-本公司上架  https://testerp.yktour.com.cn/docs/bom/995
export const selfPutOn = commonRequestHandler('/api/product/self_put_on');

// 分公司行程-本公司下架 https://testerp.yktour.com.cn/docs/bom/1008
export const doPutOff = commonRequestHandler('/api/product/do_put_off');

// 分公司行程-本公司撤回 https://testerp.yktour.com.cn/docs/bom/1009
export const recall = commonRequestHandler('/api/product/recall');

// 分公司查看供应商行程状态
export const supplierProductLists = commonRequestHandler('/api/product/supplier_product_lists')

// 分销中心-本公司产品列表  https://testerp.yktour.com.cn/docs/bom/self_sale_product_list
export const selfSaleProductList = commonRequestHandler('/api/product/self_sale_product_list')
// 分销中心-其他公司产品列表  https://testerp.yktour.com.cn/docs/bom/self_sale_product_list
export const distributionProductList = commonRequestHandler('/api/product/distribution_product_list')

// 分销中心-本公司产品列表-产品详情  https://testerp.yktour.com.cn/docs/bom/self_sale_detail
export const selfSaleDetail = commonRequestHandler('/api/product/self_sale_detail')

export const getProductTheme = commonRequestHandler('/api/product/get_product_theme')

// 20190605 @wbg 接口 更新
// 合作公司产品-列表
export const otherProductList = newCommonRequestHandler('/v1/touristroute/line-travel/cooperation-list')
// 渠道选择
export const getChannelList = newCommonRequestHandler('/v1/touristroute/line-travel/cooperation-branch-office')
// 渠道选择上架
export const handleNewPutOn = newCommonRequestHandler('/v1/touristroute/line-travel/do-up-on')
// // 渠道选择下架
// export const handleNewDown = newCommonRequestHandler('/v1/touristroute/line-travel/do-up-off')

// 本公司下架
export const handleNewSelfDown = newCommonRequestHandler('/v1/touristroute/line-travel/self-down-shelf')
// 供应商下架
export const handleNewSupplierDown = newCommonRequestHandler('/v1/touristroute/line-travel/supplier-down-shelf')
// 其他公司下架
export const handleNewOtherDown = newCommonRequestHandler('/v1/touristroute/line-travel/branch-office-down-shelf')

// 销售中心-旅游线路-本公司产品
export const newSelfSaleProductList = newCommonRequestHandler('/v1/salecenter/line-travel/self-list')
// 销售中心-旅游线路-其他公司产品
export const newDistributionProductList = newCommonRequestHandler('/v1/salecenter/line-travel/cooperation-list')
// 销售中心-旅游线路-营业部列表
export const getProductYybList = newCommonRequestHandler('/v1/salecenter/line-travel/yyb-list')
// 销售中心-旅游线路-设置可售
export const setProductCanSaleList = newCommonRequestHandler('/v1/salecenter/line-travel/do-can-sell')
// 销售中心-旅游线路-设置不可售
export const setProductNoSaleList = newCommonRequestHandler('/v1/salecenter/line-travel/do-no-sell')
// 销售中心-旅游线路-撤回
export const newSendBack = newCommonRequestHandler('/v1/touristroute/line-travel/do-recalled')
//销售中心-旅游线路列表-初始化搜索条件
export const linesearchwhere = newCommonRequestHandler('/v1/lineservice/line-sale/search_where');
//销售中心-获取旅游线路列表
export const getlineList = newCommonRequestHandler('/v1/lineservice/line-sale/sale_center');
//销售中心-获取旅游线路报价日历
export const getPriceCalendar = newCommonRequestHandler('/v1/lineservice/quote/calender-list');
//销售中心-获取旅游线路报价日历详情
export const getPriceCalendardetails = newCommonRequestHandler('/v1/lineservice/quote/detail');
//销售中心-预占位下单
export const linePlaceOrder = newCommonRequestHandler('/v1/lineservice/line-quote-buy/book_seat_order');
//销售中心-补录游客信息
export const getRecordOrderTourist = newCommonRequestHandler('/v1/lineservice/line-quote-buy/record_order_tourist')
//销售中心-补录游客信息提交
export const RecordOrderTouristSave = newCommonRequestHandler('/v1/lineservice/line-quote-buy/record_order_tourist_save')
//销售中心-预定下单
export const normalPlaceOrder = newCommonRequestHandler('/v1/lineservice/line-quote-buy/add_order')
//销售中心-获取所有组织列表
export const getOrgList = newCommonRequestHandler('/v1/lineservice/line-quote-order/org_list')
//销售中心-上传excel
export const importTourist = newCommonRequestHandler('/v1/lineservice/line-quote-buy/import_tourist')
//销售中心-获取负责人
export const getLeaderInfo = newCommonRequestHandler('/v1/lineservice/line-quote-buy/get_user')
// 搜索历史集合地点
export const handleSearchHistory = commonRequestHandler('/api/product/get_assembing_place')

//优惠券列表
export const couponList = newCommonRequestHandler('/v1/coupon/coupon/list')
//优惠券详情
export const couponInfo = newCommonRequestHandler('/v1/coupon/coupon/info')
//优惠券使用记录列表
export const couponrecordList = newCommonRequestHandler('/v1/coupon/coupon-code/list')
//获取优惠码列表筛选条件和标题
export const getCouponParams = newCommonRequestHandler('/v1/coupon/coupon-code/get-search-params')
//优惠券标题检索
export const couponSearchTitle = newCommonRequestHandler('/v1/coupon/coupon-code/search-title')
//开启发放优惠券
export const couponGrant = newCommonRequestHandler('/v1/coupon/coupon/send')
//停止发放优惠券
export const couponStop = newCommonRequestHandler('/v1/coupon/coupon/stop')
// 运营中心-本公司线路
export const operationsTravelSelfList = newCommonRequestHandler('/v1/touristroute/operations-travel/self-list')
// 运营中心-供应商行程
export const operationsSupplierList = newCommonRequestHandler('/v1/touristroute/operations-travel/supplier-list')
// 运营中心-其他分公司行程
export const operationsOtherList = newCommonRequestHandler('/v1/touristroute/operations-travel/other-fgs-list')
// 运营中心-合作运营中心行程
export const operationsCooperationList = newCommonRequestHandler('/v1/touristroute/operations-travel/other-op-list')
// 运营中心-渠道列表
export const operationsUpChannel = newCommonRequestHandler('/v1/touristroute/operations-travel/up-channel')
// 运营中心-渠道上架
export const operationsUpOn = newCommonRequestHandler('/v1/touristroute/operations-travel/up-on')
// 运营中心-渠道撤回
export const operationsRecalled = newCommonRequestHandler('/v1/touristroute/operations-travel/recalled')
// 运营中心-渠道下架
export const operationsDownShelf = newCommonRequestHandler('/v1/touristroute/operations-travel/down-shelf')


// 销售中心-运营中心-本公司产品
export const operationsProductList = newCommonRequestHandler('/v1/salecenter/line-travel/operations-self-list')
// 销售中心-运营中心-其他公司产品
export const operationsOtherProductList = newCommonRequestHandler('/v1/salecenter/line-travel/operations-other-list')









