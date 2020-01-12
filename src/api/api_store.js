import {commonRequestHandler} from './api';

// 营业部销售-产品查询   https://testerp.yktour.com.cn/docs/bom/product__list
export const saleProductList = commonRequestHandler('/api_store/sale/product_list');
// 营业部销售-产品预订团期列表   https://testerp.yktour.com.cn/docs/bom/sale_book_tuan__list
export const saleSaleBookTuanList  = commonRequestHandler('/api_store/sale/sale_book_tuan_list');
// 营业部销售-行程详情   https://testerp.yktour.com.cn/docs/bom/operator-product_detail
export const saleSaleDetail = commonRequestHandler('/api_store/sale/sale_detail');

// 营业部销售-添加订单   https://testerp.yktour.com.cn/docs/bom/add_order
export const saleAddOrder = commonRequestHandler('/api_store/sale/add_order');
// 营业部销售-提交订单   https://testerp.yktour.com.cn/docs/bom/todo_add_order
export const saleTodoAddOrder = commonRequestHandler('/api_store/sale/todo_add_order');

// 营业部销售-我的订单   https://testerp.yktour.com.cn/docs/bom/order_list
export const saleOrderList = commonRequestHandler('/api_store/sale/order_list');

// 营业部销售-订单详情   https://testerp.yktour.com.cn/docs/bom/order_detail
export const saleOrderDetail = commonRequestHandler('/api_store/sale/order_detail');
// 营业部销售-确认订单   https://testerp.yktour.com.cn/docs/bom/confirm_order
export const saleConfirmOrder = commonRequestHandler('/api_store/sale/confirm_order');
// 营业部销售-获取游客信息   https://testerp.yktour.com.cn/docs/bom/get_tourist__info
export const saleGetTouristInfo = commonRequestHandler('/api_store/sale/get_tourist_info');
// 营业部销售-编辑游客信息-提交表单   https://testerp.yktour.com.cn/docs/bom/edit_tourist__info
export const saleEditTouristInfo = commonRequestHandler('/api_store/sale/edit_tourist_info');

// 营业部销售-申请退团-获取游客列表   https://testerp.yktour.com.cn/docs/bom/cancel_tuan__tourist
export const saleCancelTuanTourist = commonRequestHandler('/api_store/sale/cancel_tuan_tourist');
// 营业部销售-提交申请退团   https://testerp.yktour.com.cn/docs/bom/do_cancel_tuan__tourist
export const saleDoCancelTuanTourist = commonRequestHandler('/api_store/sale/do_cancel_tuan_tourist');
// 营业部销售-确认退团   https://testerp.yktour.com.cn/docs/bom/confirm_cancel_tuan__tourist
export const saleConfirmCancelTuanTourist = commonRequestHandler('/api_store/sale/confirm_cancel_tuan_tourist');
// 营业部销售-取消退团   https://testerp.yktour.com.cn/docs/bom/sale_tuan_cancel__confirm
export const saleSaleTuanCancelConfirm = commonRequestHandler('/api_store/sale/sale_tuan_cancel_confirm');
// 营业部销售-查看退团详情   https://testerp.yktour.com.cn/docs/bom/sale_get_cancel__detail
export const saleSaleGetCancelDetail = commonRequestHandler('/api_store/sale/sale_get_cancel_detail');
// 营业部销售-取消订单   https://testerp.yktour.com.cn/docs/bom/cancel__order
export const saleCancelOrder = commonRequestHandler('/api_store/sale/cancel_order');
// 营业部销售-生成合同
export const saleSignOrderContract = commonRequestHandler('/api_store/sale/sign_order_contract');
// 营业部销售-查看纸质合同
export const saleGetOrderContractList = commonRequestHandler('/api_store/sale/get_order_contract_list');
// 营业部销售-删除合同图片
export const saleDelOrderContract = commonRequestHandler('/api_store/sale/del_order_contract');
// 营业部销售-生成电子合同
export const saleCreateElectronicContract = commonRequestHandler('/api_store/sale/create_electronic_contract');
// 营业部销售-下载电子合同
export const saleDownloadElectronicContract = commonRequestHandler('/api_store/sale/download_electronic_contract');
// 营业部销售-保存签证材料
export const saleUploadVisaSave = commonRequestHandler('/api_store/sale/upload_visa_save');
// 营业部销售-签证材料详情
export const saleOrderVisaVerify = commonRequestHandler('/api_store/sale/sale_order_visa_verify');

// 营业部销售-发票管理   https://testerp.yktour.com.cn/docs/bom/896
export const invoiceSaleLists = commonRequestHandler('/api_store/invoice/sale_lists');
// 营业部销售-发票管理-申请开票   https://testerp.yktour.com.cn/docs/bom/897
export const invoiceSaleAdd = commonRequestHandler('/api_store/invoice/sale_add');
// 营业部销售-发票管理-申请开票   https://testerp.yktour.com.cn/docs/bom/897#3
export const invoiceSaleGetBillsLists = commonRequestHandler('/api_store/invoice/sale_get_bills_lists');
// 营业部销售-发票管理-申请开票   https://testerp.yktour.com.cn/docs/bom/897#2
export const invoiceTodoSaleAdd= commonRequestHandler('/api_store/invoice/todo_sale_add');
// 营业部销售-发票管理-开票详情   https://testerp.yktour.com.cn/docs/bom/898
export const invoiceSaleDetail= commonRequestHandler('/api_store/invoice/sale_detail');
// 营业部财务-发票管理(审核中的发票)  https://testerp.yktour.com.cn/docs/bom/902
export const invoiceAuditList = commonRequestHandler('/api_store/invoice/audit_list');
// 营业部财务-发票管理   https://testerp.yktour.com.cn/docs/bom/896
export const invoiceFinanceLists = commonRequestHandler('/api_store/invoice/finance_lists');
// 营业部财务-发票管理-申请开票   https://testerp.yktour.com.cn/docs/bom/897
export const invoiceFinanceAdd = commonRequestHandler('/api_store/invoice/finance_add');
// 营业部财务-发票管理-申请开票   https://testerp.yktour.com.cn/docs/bom/897#3
export const invoiceFinanceGetBillsLists = commonRequestHandler('/api_store/invoice/finance_get_bills_lists');
// 营业部财务-发票管理-申请开票   https://testerp.yktour.com.cn/docs/bom/897#2
export const invoiceTodoFinanceAdd= commonRequestHandler('/api_store/invoice/todo_finance_add');
// 营业部财务-发票管理-开票详情   https://testerp.yktour.com.cn/docs/bom/898
export const invoiceFinanceDetail= commonRequestHandler('/api_store/invoice/finance_detail');
// 营业部财务-发票管理-审核发票   https://testerp.yktour.com.cn/docs/bom/903
export const invoiceAuditInvoice= commonRequestHandler('/api_store/invoice/audit_invoice');
// 营业部财务-发票管理-发票作废   https://testerp.yktour.com.cn/docs/bom/904
export const invoiceCancelInvoice= commonRequestHandler('/api_store/invoice/cancel_invoice');
// 营业部-查看单个开票   
export const invoiceGetInvoiceSelection= commonRequestHandler('/api_store/invoice/get_invoice_selection');
// 营业部财务-订单详情
export const financeBomOrderDetail = commonRequestHandler('/api_store/finance/finance_bom_order_detail');
// 营业部财务-退团详情
export const financeGetCancelDetail = commonRequestHandler('/api_store/finance/fin_get_cancel_detail');
// 营业部财务-签证材料详情
export const financeOrderVisaVerify = commonRequestHandler('/api_store/finance/finance_order_visa_verify');

// 门店操作-资金结算  https://testerp.yktour.com.cn/docs/bom/992
export const financeIndex = commonRequestHandler('/api_store/finance/index');