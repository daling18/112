import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';

// 财务操作-账户余额列表 https://testerp.yktour.com.cn/docs/bom/org_balance_list
export const orgBalanceList = commonRequestHandler('/api/finance/org_balance_list');

// 财务操作-账户余额列表-我的余额明细 https://testerp.yktour.com.cn/docs/bom/my_balance_list
export const myBalanceList = commonRequestHandler('/api/finance/my_balance_list');

// 财务操作-账户余额列表-我的余额明细-冻结余额列表 https://testerp.yktour.com.cn/docs/bom/bom-1and8e0hf1ceq
export const myFreezeList = commonRequestHandler('/api/finance/my_freeze_list');

// 财务操作-同行结算-他的余额明细 https://testerp.yktour.com.cn/docs/bom/his_balance_list
export const hisBalanceList = commonRequestHandler('/api/finance/his_balance_list');

// 财务操作-账户余额列表-他的余额明细-冻结余额列表
export const hisFreezeList = commonRequestHandler('/api/finance/his_freeze_list');

// 财务操作-同行结算-我的余额明细-提现操作 https://testerp.yktour.com.cn/docs/bom/1126
export const putForward = commonRequestHandler('/api/finance/put_forward');

// 财务操作-同行结算-我的余额明细-在线充值 https://testerp.yktour.com.cn/docs/bom/recharge_money
export const rechargeMoney = commonRequestHandler('/api/finance/recharge_money');

// 收款审核列表 https://testerp.yktour.com.cn/docs/bom/570 https://testerp.yktour.com.cn/docs/bom/bom-1andinchjfqbc
export const checkReceiptList = commonRequestHandler('/api/finance/check_receipt_list');

// 认款审核列表 https://testerp.yktour.com.cn/docs/bom/571
export const checkRenkuanList = commonRequestHandler('/api/finance/check_renkuan_list');

// 财务操作-业务审批-收款审核（获取团队收入列表） https://testerp.yktour.com.cn/docs/bom/finance_payment_verify
export const paymentVerify = commonRequestHandler('/api/finance/payment_verify');

// 财务操作-团队订单详情-查看退团详情(详情数据)
export const finGetCancelDetail = commonRequestHandler('/api/finance/fin_get_cancel_detail');

// 财务操作-财务报表-分公司报表列表 https://testerp.yktour.com.cn/docs/bom/reports_branch_companys
export const finReportBranchComp = commonRequestHandler('/api/finance/reports_branch_companys');

// 财务操作-财务报表-线下业务汇总表（团维度） https://testerp.yktour.com.cn/docs/bom/reports_offline_by_tuan
export const finReportOfflineByTuan = commonRequestHandler('/api/finance/reports_offline_by_tuan');

// 财务操作-财务报表-线下业务汇总表（订单维度） https://testerp.yktour.com.cn/docs/bom/reports_offline_by_order
export const finReportOfflineByOrder = commonRequestHandler('/api/finance/reports_offline_by_order');

// 财务操作-财务报表-合同登记台账列表 https://testerp.yktour.com.cn/docs/bom/reports_contract_company
export const finReportContractComp = commonRequestHandler('/api/finance/reports_contract_company');

// 财务操作-财务报表-发票开具列表 https://testerp.yktour.com.cn/docs/bom/income_invoice_list
export const finIncomeInvoiceList = commonRequestHandler('/api/finance/income_invoice_list');

// 财务操作-财务报表-成本回票列表 https://testerp.yktour.com.cn/docs/bom/cost_invoice_list
export const finCostInvoiceList = commonRequestHandler('/api/finance/cost_invoice_list');

// 财务操作-财务报表-分公司银行日记账列表 https://testerp.yktour.com.cn/docs/bom/reports_bank_company
export const finReportBankCompany = commonRequestHandler('/api/finance/reports_bank_company');

// 财务操作-财务报表-周数据明细列表 https://testerp.yktour.com.cn/docs/bom/reports_company_by_month
export const finReportCompByMonth = commonRequestHandler('/api/finance/reports_company_by_month');
// 添加收款-添加公司账号
export const shareAddPaymentAccount = commonRequestHandler('/api/finance/share_add_payment_account');// 财务操作-调账审批列表 https://testerp.yktour.com.cn/docs/bom/adjustment_list
export const adjustmentList = commonRequestHandler('/api/finance/adjustment_list');
// 财务操作-调账审批详情 https://testerp.yktour.com.cn/docs/bom/adjustment_detail
export const financeAdjustmentDetail = commonRequestHandler('/api/finance/adjustment_detail');
// 财务操作-调账审批 https://testerp.yktour.com.cn/docs/bom/adjustment_verify
export const adjustmentVerify = commonRequestHandler('/api/finance/adjustment_verify');
// 财务付款处理列表 https://testerp.yktour.com.cn/docs/bom/finance_applied_list
export const appliedList = commonRequestHandler('/api/finance/applied_list');
// 财务查看请款详情 https://testerp.yktour.com.cn/docs/bom/finance_applied_detail
export const appliedDetail = commonRequestHandler('/api/finance/applied_detail');
// 财务处理请款 https://testerp.yktour.com.cn/docs/bom/finance_settle_applied
export const settleApplied = commonRequestHandler('/api/finance/settle_applied');
// 财务作废-收/付款记录 https://testerp.yktour.com.cn/docs/bom//1099
export const paymentScrapReceipt = commonRequestHandler('/api/finance/payment_scrap_receipt');
export const paymentScrapPay = commonRequestHandler('/api/finance/payment_scrap_pay');
// 财务作废-收/付款详情 https://testerp.yktour.com.cn/docs/bom//1099
export const scrapInfo = commonRequestHandler('/api/finance/scrap_info');
// 财务查看付款详情 https://testerp.yktour.com.cn/docs/bom/pay_detail
export const payDetail = commonRequestHandler('/api/finance/pay_detail');

// 财务操作-退款处理-列表 https://testerp.yktour.com.cn/docs/bom//1094
export const getRefundList = commonRequestHandler('/api/finance/get_refund_list');

// 财务操作-退款处理-处理退款 https://testerp.yktour.com.cn/docs/bom/refund_order
export const refundOrder = commonRequestHandler('/api/finance/refund_order');

// 财务操作-退款处理-查看备注 https://testerp.yktour.com.cn/docs/bom/get_refund_order_remark
export const getRefundOrderRemark = commonRequestHandler('/api/finance/get_refund_order_remark');

// 财务操作-退款处理
export const getOnlineRefundOrde = commonRequestHandler('/api/finance/online_refund_order');

// 财务操作-认款收款-认款详情    https://testerp.yktour.com.cn/docs/bom/1077
export const renkuanDetail = commonRequestHandler('/api/finance/renkuan_detail');

// 财务操作-查看收入-查看认款作废记录    https://testerp.yktour.com.cn/docs/bom/scrap_renkuan_info
// export const scrapRenkuanInfo = commonRequestHandler('/api/finance/scrap_renkuan_info');

// 认款记录-撤销认款   https://testerp.yktour.com.cn/docs/bom/1078
export const cancelRenkuan = commonRequestHandler('/api/finance/cancel_renkuan');
export const saleCancelRenkuan = commonRequestHandler('/api/finance/sale_cancel_renkuan');
export const jidiaoCancelRenkuan = commonRequestHandler('/api/finance/jidiao_cancel_renkuan');
// 认款记录-重新发起认款    https://testerp.yktour.com.cn/docs/bom/1079
export const reissueRenkuan = commonRequestHandler('/api/finance/reissue_renkuan');
export const saleReissueRenkuan = commonRequestHandler('/api/finance/sale_reissue_renkuan');
export const jidiaoReissueRenkuan = commonRequestHandler('/api/finance/jidiao_reissue_renkuan');
// 认款记录--作废认款    https://testerp.yktour.com.cn/docs/bom/scrap_renkuan
export const scrapRenkuan = commonRequestHandler('/api/finance/scrap_renkuan');


// 同行结算-收款记录-撤销收款    https://testerp.yktour.com.cn/docs/bom/finance-payment_cancel
export const paymentCancel = commonRequestHandler('/api/finance/payment_cancel');
export const salePaymentCancel = commonRequestHandler('/api/finance/sale_payment_cancel');
export const jidiaoPaymentCancel = commonRequestHandler('/api/finance/jidiao_payment_cancel');

// 同行结算-收款记录-重新发起收款    https://testerp.yktour.com.cn/docs/bom/1100
export const reissueReceipt = commonRequestHandler('/api/finance/reissue_receipt');
export const saleReissueReceipt = commonRequestHandler('/api/finance/sale_reissue_receipt');
export const jidiaoReissueReceipt = commonRequestHandler('/api/finance/jidiao_reissue_receipt');

// 系统管理-组织机构-授信配置
export const addCreditLine = commonRequestHandler('/api/finance/add_credit_line');

// 中行账户-账户余额-列表 https://testerp.yktour.com.cn/docs/bom/boc_balance_list
export const bocBalanceList = commonRequestHandler('/api/finance/boc_balance_list');
// 中行账户-交易明细-列表 https://testerp.yktour.com.cn/docs/bom/boc_transaction_list
export const bocTransactionList = commonRequestHandler('/api/finance/boc_transaction_list');
// 中行账户-交易明细-详情 https://testerp.yktour.com.cn/docs/bom/boc_transaction_detail
export const bocTransactionDetail = commonRequestHandler('/api/finance/boc_transaction_detail');
// 付款处理-在线转账付款 https://testerp.yktour.com.cn/docs/bom/boc_transfer_applied
export const bocTransferApplied = commonRequestHandler('/api/finance/boc_transfer_applied');
// 付款处理-在线转账付款-提交 https://testerp.yktour.com.cn/docs/bom/boc_transfer
export const bocTransfer = commonRequestHandler('/api/finance/boc_transfer');

// 收款认款-收款记录-列表 https://testerp.yktour.com.cn/docs/bom/all_receipt_list
export const allReceiptList = commonRequestHandler('/api/finance/all_receipt_list');

// 收款认款-收款记录-列表 https://testerp.yktour.com.cn/docs/bom/bom-1au35ujj039sb
export const allRenkuanList = commonRequestHandler('/api/finance/all_renkuan_list');

// 付款处理-付款记录-列表 https://testerp.yktour.com.cn/docs/bom/all_payment_list
export const allPaymentList = commonRequestHandler('/api/finance/all_payment_list');

// 付款处理-勾选明细进行收款-列表 https://testerp.yktour.com.cn/docs/bom/boc_transaction_payment
export const bocTransactionPayment = commonRequestHandler('/api/finance/boc_transaction_payment');

// 中行转账付款-添加付款 https://testerp.yktour.com.cn/docs/bom/finance-add_payment
export const finAddPayment = commonRequestHandler('/api/finance/add_payment');

// 财务报表-订单流水表总部
export const getOrderInfoPayment = newCommonRequestHandler('/v1/financial/order-account/order-flow');
// 财务报表-订单月度流水
export const getOrderFlowMonth = newCommonRequestHandler('/v1/financial/order-account-month/flow-month');

/******结算返佣*******/
//待返佣--营业部列表
export const getWattingRebateList_department = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/rebate')({params, success: res => resolve(res), showLoading}))
//待返佣--分公司列表
export const getWattingRebateList_company = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/company-rebate')({params, success: res => resolve(res), showLoading}))
//批量发起返佣--营业部
export const batchRebate_department = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/submit-profit')({params, success: res => resolve(res), showLoading}))
//批量发起返佣--分公司
export const batchRebate_company = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/company-submit-profit')({params, success: res => resolve(res), showLoading}))
//返佣单列表--营业部
export const getRebateList_department = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/rake-back')({params, success: res => resolve(res), showLoading}))
//返佣单列表--分公司
export const getRebateList_company = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/company-rake-back')({params, success: res => resolve(res), showLoading}))
//付款信息提交--批发利润、销售利润、拉新分润、分公司奖励
export const paySubmit = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/pay-submit')({params, success: res => resolve(res), showLoading}))
//待结算列表
export const getpeddingSettlement = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/line-list')({params, success: res => resolve(res), showLoading}))
//批量发起结算单
export const batchCreatSettlement = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/create-settlement')({params, success: res => resolve(res), showLoading}))
//结算单列表
export const getSettlementList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/payee-list')({params, success: res => resolve(res), showLoading}))
//销售利润结算 批发分润结算 拉新分润结算 分公司奖励
export const getProfitWholesaler = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/wholesaler-list')({params, success: res => resolve(res), showLoading}))
//返佣单详情
export const getRebateDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/rebate-detail')({params, success: res => resolve(res), showLoading}))
//供应商结算列表
export const getSupplierSettlementList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/payer-list')({params, success: res => resolve(res), showLoading}))
//供应商结算重新发起
export const addSettlementRecord = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/manual-create')({params, success: res => resolve(res), showLoading}))
//手动添加结算单
export const reApply = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1//settlement/reset')({params, success: res => resolve(res), showLoading}))
//收款方列表（返佣）
export const getIncommerOrg = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/business-dep')({params, success: res => resolve(res), showLoading}))
//供应商结算收款方
export const getSupplierIncommerOrg = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/supplier-find')({params, success: res => resolve(res), showLoading}))
//删除手动添加结算单
export const delAddSettlementRecord = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/manual-del')({params, success: res => resolve(res), showLoading}))
//手动添加返佣记录
export const manualAddRebateRecord = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/add-rebate')({params, success: res => resolve(res), showLoading}))
//结算单-手动添加的详情
export const supplierAddSettlementDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/manual-show')({params, success: res => resolve(res), showLoading}))
//结算单详情
export const getSettlementDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/list-detail')({params, success: res => resolve(res), showLoading}))
//财务付款申请
export const  financePay= (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/payment')({params, success: res => resolve(res), showLoading}))
//申请付款审批提交
export const applyPay = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/settlement/apply-pay')({params, success: res => resolve(res), showLoading}))
//删除批发商返佣单  销售利润结算 批发分润结算 拉新分润结算 分公司奖励4
export const delManualProfitWholesaler = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/profit/del-rebate')({params, success: res => resolve(res), showLoading}))
// 收款认款-收款记录-列表
export const allReceiptListV2 = newCommonRequestHandler('/v1/settlement/finance/all-receipt-list');
// 收款认款-收款记录-详情
export const allReceiptDetailV2 = newCommonRequestHandler('/v1/settlement/finance/all-receipt-detail');
