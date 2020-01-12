import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';

// 销售中心-我的订单-同行订单 列表 https://testerp.yktour.com.cn/docs/bom/sale_tonghang_order_list
export const saleTHOrderList = commonRequestHandler('/api/tuan/sale_tonghang_order_list');

// 销售中心-我的订单-直客订单 列表 https://testerp.yktour.com.cn/docs/bom/sale_zhike_order_list
export const saleZKOrderList = commonRequestHandler('/api/tuan/sale_zhike_order_list');

// 销售中心-收款记录-添加收款 https://testerp.yktour.com.cn/docs/bom/sale_add_receipt
export const saleAddReceipt = commonRequestHandler('/api/tuan/sale_add_receipt');

// 销售中心-收款记录-添加收款（获取该结算方的历史已收/已付金额） https://testerp.yktour.com.cn/docs/bom/sale_get_amount_info
export const saleGetAmountInfo = commonRequestHandler('/api/tuan/sale_get_amount_info');

// 销售中心-收款记录-添加收款（获取团队收入列表） https://testerp.yktour.com.cn/docs/bom/sale_get_tuan_in
export const saleGetTuanIn = commonRequestHandler('/api/tuan/sale_get_tuan_in');

// 计调操作-收入管理-添加收款 https://testerp.yktour.com.cn/docs/bom/operator_add_receipt
export const operatorAddReceipt = commonRequestHandler('/api/tuan/operator_add_receipt');

// 计调操作-收入管理-添加收款（获取团的结算方列表） https://testerp.yktour.com.cn/docs/bom/add_operator_order_gathering
export const addOperatorOrderGathering = commonRequestHandler('/api/tuan/add_operator_order_gathering');

// 计调操作-收入管理-添加收款（获取该结算方的历史已收/已付金额） https://testerp.yktour.com.cn/docs/bom/operator_get_amount_info
export const operatorGetAmountInfo = commonRequestHandler('/api/tuan/operator_get_amount_info');

// 计调操作-收入管理-添加收款（获取团队收入列表） https://testerp.yktour.com.cn/docs/bom/operator_get_tuan_in
export const operatorGetTuanIn = commonRequestHandler('/api/tuan/operator_get_tuan_in');

// 计调操作-团队控制（查看收款记录） https://testerp.yktour.com.cn/docs/bom/op_receipt_list
export const opReceiptList = commonRequestHandler('/api/tuan/op_receipt_list');

// 计调操作-团队控制-游客名单（打印团队游客名单）https://testerp.yktour.com.cn/docs/bom/export_tourist_lists
export const expTouristList = commonRequestHandler('/api/tuan/export_tourist_lists');

// 计调操作-团队订单详情-确认位置-提交表单 https://testerp.yktour.com.cn/docs/bom/700
export const operatorConfirmSeat = commonRequestHandler('/api/tuan/operator_confirm_seat');

// 财务操作-业务审批-收款审核（查看收款详情） https://testerp.yktour.com.cn/docs/bom/financial_get_gathering_info
export const financialGetGatheringInfo = commonRequestHandler('/api/tuan/financial_get_gathering_info');
// 销售中心-收款详情
export const saleGetGatheringInfo = commonRequestHandler('/api/tuan/sale_get_gathering_info');

// 计调销售财务-团队订单详情-取消订单(提交) https://testerp.yktour.com.cn/docs/bom/cancel_order
export const cancelOrder = commonRequestHandler('/api/tuan/cancel_order');

// 计调销售财务-团队订单详情-确认同行订单(提交) https://testerp.yktour.com.cn/docs/bom/sale_confirm_order
export const saleConfirmOrder = commonRequestHandler('/api/tuan/sale_confirm_order');

// 计调操作-团队订单详情-查看退团详情(详情数据) https://testerp.yktour.com.cn/docs/bom//683
export const operGetCancelDetail = commonRequestHandler('/api/tuan/operator_get_cancel_detail');

// 销售中心-团队订单详情-查看退团详情(详情数据) https://testerp.yktour.com.cn/docs/bom//647
export const saleGetCancelDetail = commonRequestHandler('/api/tuan/sale_get_cancel_detail');

// 销售中心-团队订单详情-申请退团-获取游客列表 https://testerp.yktour.com.cn/docs/bom/cancel_tuan_tourist
export const cancelTuanTourist = commonRequestHandler('/api/tuan/cancel_tuan_tourist');

// 销售中心-团队订单详情-提交申请退团 https://testerp.yktour.com.cn/docs/bom/do_cancel_tuan_tourist
export const doCancelTuanTourist = commonRequestHandler('/api/tuan/do_cancel_tuan_tourist');

// 销售中心-团队订单详情-获取游客信息(编辑游客信息) https://testerp.yktour.com.cn/docs/bom/get_tourist_info
export const getTouristInfo = commonRequestHandler('/api/tuan/get_tourist_info');

// 销售中心-团队订单详情-编辑游客信息-提交表单(编辑游客信息保存) https://testerp.yktour.com.cn/docs/bom/edit_tourist_info
export const editTouristInfo = commonRequestHandler('/api/tuan/edit_tourist_info');

// 计调操作-退团详情-定损(请求数据)
export const getRefundAmont = commonRequestHandler('/api/tuan/get_refund_amont');

// 计调操作-退团详情-定损(提交表单) https://testerp.yktour.com.cn/docs/bom/685
export const operLossAssess = commonRequestHandler('/api/tuan/operator_loss_assess');

// 销售中心-退团详情-确认退团 https://testerp.yktour.com.cn/docs/bom/confirm_cancel_tuan_tourist
export const confirmCancelTuanTourist = commonRequestHandler('/api/tuan/confirm_cancel_tuan_tourist');

// 销售中心-退团详情-确认退团／取消退团 https://testerp.yktour.com.cn/docs/bom/686
export const saleTuanCancelConfirm = commonRequestHandler('/api/tuan/sale_tuan_cancel_confirm');

// 销售中心-订单详情-直客合同签约（弹窗前先请求的接口） https://testerp.yktour.com.cn/docs/bom/sign_order_contract
export const signOrderContract = commonRequestHandler('/api/tuan/sign_order_contract');

// 销售中心-订单详情-生成电子合同 https://testerp.yktour.com.cn/docs/bom/create_electronic_contract
export const createElectronicContract = commonRequestHandler('/api/tuan/create_electronic_contract');

// 销售中心-订单详情-下载电子合同 https://testerp.yktour.com.cn/docs/bom//718
export const dlElectronicContract = commonRequestHandler('/api/tuan/download_electronic_contract');

// 销售中心-订单详情-下载电子合同 https://testerp.yktour.com.cn/docs/bom/distr_generate_download_contract
export const distrGenerateDownloadContract = commonRequestHandler('/api/tuan/distr_generate_download_contract');

// 订单详情-订单上传签证材料提交
export const ulVisaSave = commonRequestHandler('/api/tuan/upload_visa_save');

// 计调操作-查询所有订单
export const opOrderList = commonRequestHandler('/api/tuan/op_order_list');

// 指派OP-列表 https://testerp.yktour.com.cn/docs/bom/assign_op_list
export const assignOpList = commonRequestHandler('/api/tuan/assign_op_list');

// 指派OP https://testerp.yktour.com.cn/docs/bom/assign_op
export const assignOp = commonRequestHandler('/api/tuan/assign_op');

// 计调操作-成本列表-查看成本 https://testerp.yktour.com.cn/docs/bom/bill_pay_detail
export const billPayDetail = commonRequestHandler('/api/tuan/bill_pay_detail');

// 销售中心-成本详情
export const saleBillPayDetail = commonRequestHandler('/api/tuan/sale_bill_pay_detail');

// 财务操作-成本详情
export const financeBillPayDetail = commonRequestHandler('/api/tuan/finance_bill_pay_detail');

// 计调操作-调账申请 https://testerp.yktour.com.cn/docs/bom/apply_adjustment
export const applyAdjustment = commonRequestHandler('/api/tuan/apply_adjustment');

// 计调操作-保存调账 https://testerp.yktour.com.cn/bom/api/tuan/add_adjustment
export const addAdjustment = commonRequestHandler('/api/tuan/add_adjustment');

// 计调操作-查看调账详情 https://testerp.yktour.com.cn/docs/bom/adjustment_detail
export const adjustmentDetail = commonRequestHandler('/api/tuan/adjustment_detail');

// 计调操作-调账-查询信息 https://testerp.yktour.com.cn/docs/bom/get_income_cost
export const getIncomeCost = commonRequestHandler('/api/tuan/get_income_cost');

// 分销中心-线路下单 https://testerp.yktour.com.cn/docs/bom/sale_add_order
export const saleAddOrder = commonRequestHandler('/api/tuan/sale_add_order');

export const saleAddZhikeOrder = commonRequestHandler('/api/tuan/sale_add_zhike_order');

// 分销中心-线路下单提交 https://testerp.yktour.com.cn/docs/bom/sale_todo_add_order
export const saleTodoAddOrder = newCommonRequestHandler('/v1/order/tuan/sale-create-order');

export const saleTodoAddZhikeOrder = newCommonRequestHandler('/v1/order/tuan/zk-create-order');

// 分销中心-线路下单-行程预订列表 https://testerp.yktour.com.cn/docs/bom/sale_book_tuan_list
// export const saleBookTuanList = commonRequestHandler('/api/tuan/sale_book_tuan_list');
export const saleBookTuanList = newCommonRequestHandler('/v1/salecenter/line-travel/book-tuan-list');

// 分销中心-订单详情
export const distrOrderDetail = commonRequestHandler('/api/tuan/distr_order_detail');

// 计调操作-订单详情-新增价格明细 https://testerp.yktour.com.cn/docs/bom/operator_price_detail_add
export const operatorPriceDetailAdd = commonRequestHandler('/api/tuan/operator_price_detail_add');

// 供应商催款详情 https://testerp.yktour.com.cn/docs/bom/get_bill_press_content
export const getBillPressContent = commonRequestHandler('/api/tuan/get_bill_press_content');

// 请款列表 https://testerp.yktour.com.cn/docs/bom/applied_list
export const appliedList = commonRequestHandler('/api/tuan/applied_list');

// 请款撤销 https://testerp.yktour.com.cn/docs/bom/cancel_applied
export const cancelApplied = commonRequestHandler('/api/tuan/cancel_applied');

// 重新发起请款 https://testerp.yktour.com.cn/docs/bom/reissue_applied
export const reissueApplied = commonRequestHandler('/api/tuan/reissue_applied');

// 请款详情 https://testerp.yktour.com.cn/docs/bom/applied_detail
export const appliedDetail = commonRequestHandler('/api/tuan/applied_detail');

// 请款详情 https://testerp.yktour.com.cn/docs/bom/applied_add_payment
export const appliedAddPayment = commonRequestHandler('/api/tuan/applied_add_payment');

// 保存请款 https://testerp.yktour.com.cn/docs/bom/applied_save
export const appliedSave = commonRequestHandler('/api/tuan/applied_save');

// 销售中心-认款收款-认款详情    https://testerp.yktour.com.cn/docs/bom/sale_renkuan_detail
export const saleRenkuanDetail = commonRequestHandler('/api/tuan/sale_renkuan_detail');

// 计调操作
export const renkuanDetail = commonRequestHandler('/api/tuan/renkuan_detail');

// 销售中心-同行认款订单列表
export const saleBeforeAddRenkuanList = commonRequestHandler('/api/tuan/sale_before_add_renkuan_list');

// 销售中心-添加认款
export const saleRenkuanAdd = commonRequestHandler('/api/tuan/sale_renkuan_add');

// 计调操作-同行认款订单列表
export const beforeAddRenkuanList = commonRequestHandler('/api/tuan/before_add_renkuan_list');

// 计调操作-同行认款
export const renkuanAdd = commonRequestHandler('/api/tuan/renkuan_add');

// 订单详情-申请退款 https://testerp.yktour.com.cn/docs/bom/order_refund
export const orderRefund = commonRequestHandler('/api/tuan/order_refund');

//订单详情-修改合同单价
// export const contractPricesChange = commonRequestHandler('/api/tuan/contract_prices_change');
export const contractPricesChange = commonRequestHandler('/api/tuan/contract_prices_change');

//订单详情-获取合同单价
// export const getContractPrices = commonRequestHandler('/api/tuan/contract_prices');
export const getContractPrices = commonRequestHandler('/api/tuan/contract_prices');

// 订单详情-申请退款检测
export const checkRefund = commonRequestHandler('/api/tuan/check_refund');

// 新增线路-图片管理
export const getPhotoalbumSubList = commonRequestHandler('/api/tuan/get_photoalbum_sub_list');

// 新增线路-所有相册
export const getPhotoalbumcate = commonRequestHandler('/api/tuan/get_photoalbumcate');

//单项团控获取接口
export const searchSelfSupportTuanAsyncRequest = commonRequestHandler('/api/selfsupport.tuan/index');

//单项团控订单获取接口
export const searchSelfSupportTuanOrderListAsyncRequest = commonRequestHandler('/api/selfsupport.tuan/orderList');

//单项团控添加订单接口
export const addSelfSupportTuanOrderAsyncRequest =  commonRequestHandler('/api/selfsupport.tuan/store');

// 重新生成合同 https://testerp.yktour.com.cn/docs/bom/re_generate_contract
export const reGenerateContract =  commonRequestHandler('/api/tuan/re_generate_contract');

// 下载行程单
export const downJourney =  commonRequestHandler('/api/product/save_travel_detail_pdf');
