import {commonRequestHandler} from './api';

// 获取开票信息
export const getAddInvoice = commonRequestHandler('/api/invoice/get_add_invoice');
// 开票
export const addInvoice = commonRequestHandler('/api/invoice/add_invoice');

// 财务操作-发票管理-添加开票  https://testerp.yktour.com.cn/docs/bom/770
export const financeAddInvoice = commonRequestHandler('/api/invoice/finance_add_income');
export const financeTodoAddInvoice = commonRequestHandler('/api/invoice/finance_todo_add_income');
// 发票抬头组织搜索
export const searchBillsOrg = commonRequestHandler('/api/invoice/search_bills_org');
// 根据发票抬头获取应收/订单信息
export const orgIncomeLists = commonRequestHandler('/api/invoice/org_income_lists');
export const saleOrgIncomeLists = commonRequestHandler('/api/invoice/sale_org_income_lists');
export const financeOrgIncomeLists = commonRequestHandler('/api/invoice/finance_org_income_lists');
// 搜索公司账户
export const searchAccount = commonRequestHandler('/api/invoice/search_account');
// 搜索同行账户
export const searchPeerAccount = commonRequestHandler('/api/invoice/search_peer_account');

// 财务操作-发票管理-收入发票列表
export const financeIncomeLists = commonRequestHandler('/api/invoice/finance_income_lists');

// 获取单个订单中多个发票
export const getInvoiceSelection = commonRequestHandler('/api/invoice/get_invoice_selection');
// 财务操作-发票管理-收入发票详情
export const financeIncomeDetail = commonRequestHandler('/api/invoice/finance_income_detail');

// 计调-收入发票列表  https://testerp.yktour.com.cn/docs/bom/769
export const incomeLists = commonRequestHandler('/api/invoice/income_lists');
// 计调-发票详情    https://testerp.yktour.com.cn/docs/bom/771
export const incomeDetail = commonRequestHandler('/api/invoice/income_detail');
// 计调-开票详情
export const addIncome = commonRequestHandler('/api/invoice/add_income');
// 计调-提交开票详情
export const todoAddIncome = commonRequestHandler('/api/invoice/todo_add_income');
// 计调-单个订单申请开票
export const addOrderInvoice = commonRequestHandler('/api/invoice/add_order_invoice');
// 计调-单个订单提交申请开票
export const todoAddOrderInvoice = commonRequestHandler('/api/invoice/todo_add_order_invoice');
// 销售-收入发票列表  https://testerp.yktour.com.cn/docs/bom/769
export const saleincomeLists = commonRequestHandler('/api/invoice/sale_income_lists');
// 销售-发票详情    https://testerp.yktour.com.cn/docs/bom/771
export const saleincomeDetail = commonRequestHandler('/api/invoice/sale_income_detail');
// 销售-开票详情
export const saleaddIncome = commonRequestHandler('/api/invoice/sale_add_income');
// 销售-提交开票详情
export const saletodoAddIncome = commonRequestHandler('/api/invoice/sale_todo_add_income');
// 销售-单个订单申请开票
export const saleAddOrderInvoice = commonRequestHandler('/api/invoice/sale_add_order_invoice');
// 销售-单个订单提交申请开票
export const saleTodoAddOrderInvoice = commonRequestHandler('/api/invoice/sale_todo_add_order_invoice');

// 财务操作-发票管理-发票审核列表  https://testerp.yktour.com.cn/docs/bom/audit_invoice_list
export const auditInvoiceList = commonRequestHandler('/api/invoice/audit_invoice_list');

// 财务操作-发票管理-发票审核  https://testerp.yktour.com.cn/docs/bom/audit_invoice
export const auditInvoice = commonRequestHandler('/api/invoice/audit_invoice');
// 财务操作-发票管理-发票审核详情 
export const invoiceDetail = commonRequestHandler('/api/invoice/invoice_detail');

// 财务操作-发票管理-发票作废  https://testerp.yktour.com.cn/docs/bom/cancel_invoice
export const cancelInvoice = commonRequestHandler('/api/invoice/cancel_invoice');

// 财务操作-发票管理-成本回票详情 https://testerp.yktour.com.cn/docs/bom/cost_detail
export const financeCostDetail = commonRequestHandler('/api/invoice/finance_cost_detail');

// 财务操作-同行结算-收入发票列表 https://testerp.yktour.com.cn/docs/bom/tonghang_settle_income
export const tonghangSettleIncome = commonRequestHandler('/api/invoice/tonghang_settle_income');

// 财务操作-同行结算-成本回票列表 https://testerp.yktour.com.cn/docs/bom/tonghang_settle_cost
export const tonghangSettleCost = commonRequestHandler('/api/invoice/tonghang_settle_cost');

// 计调-成本回票列表 https://testerp.yktour.com.cn/docs/bom/cost_list
export const invoiceCostLists = commonRequestHandler('/api/invoice/cost_lists');

// 计调-成本回票-上传成本回票 https://testerp.yktour.com.cn/docs/bom/todo_add_cost
export const invoiceAddCost = commonRequestHandler('/api/invoice/add_cost');

// 计调-成本回票-提交上传成本回票 https://testerp.yktour.com.cn/docs/bom/todo_add_cost
export const invoiceTodoAddCost = commonRequestHandler('/api/invoice/todo_add_cost');

// 计调-单个成本回票-上传成本回票
export const invoiceAddCostSingle = commonRequestHandler('/api/invoice/add_cost_invoice');

// 计调-单个成本回票-提交上传成本回票
export const invoiceTodoAddCostSingle = commonRequestHandler('/api/invoice/todo_add_cost_invoice');

// 计调-成本回票详情 https://testerp.yktour.com.cn/docs/bom/cost_detail
export const invoiceCostDetail = commonRequestHandler('/api/invoice/cost_detail');

// 销售-成本回票列表 
export const invoiceSaleCostLists = commonRequestHandler('/api/invoice/sale_cost_lists');

// 销售-成本回票-上传成本回票 
export const invoiceSaleAddCost = commonRequestHandler('/api/invoice/sale_add_cost');

// 销售-成本回票-提交上传成本回票 
export const invoiceSaleTodoAddCost = commonRequestHandler('/api/invoice/sale_todo_add_cost');

// 销售-成本回票详情 
export const invoiceSaleCostDetail = commonRequestHandler('/api/invoice/sale_cost_detail');

// 财务操作-发票管理-成本回票列表
export const financeCostLists = commonRequestHandler('/api/invoice/finance_cost_lists');

// 财务操作-发票管理-成本回票新增
export const financeAddCost = commonRequestHandler('/api/invoice/finance_add_cost');
export const financeTodoAddCost = commonRequestHandler('/api/invoice/finance_todo_add_cost');



// 结算中心-收入发票列表 https://testerp.yktour.com.cn/docs/bom/bom-1au5sn6bmmm7h
export const allIncomeLists = commonRequestHandler('/api/invoice/all_income_list');
// 结算中心-收入发票-提交收入发票 https://testerp.yktour.com.cn/docs/bom/bom-1au5slu10r0ib
export const addIncomeApproval = commonRequestHandler('/api/invoice/add_income_approval');
export const newAddIncome = commonRequestHandler('/api/invoice/new_add_income');

// 结算中心-成本回票列表 https://testerp.yktour.com.cn/docs/bom/bom-1au5spb6h8mam
export const allCostLists = commonRequestHandler('/api/invoice/all_cost_list');
// 结算中心-成本回票-上传成本回票 https://testerp.yktour.com.cn/docs/bom/bom-1au5smnalpl0l
export const addCostApproval = commonRequestHandler('/api/invoice/add_cost_approval');
export const newAddCost = commonRequestHandler('/api/invoice/new_add_cost');
// 结算中心-撤回发票 https://testerp.yktour.com.cn/docs/bom/bom-1au5sqp77ps4o
export const revokeInvoice = commonRequestHandler('/api/invoice/revoke_invoice');