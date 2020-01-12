import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';

// 收入列表（供应商）   https://testerp.yktour.com.cn/docs/bom/income_lists
export const income_lists = commonRequestHandler('/api_supplier/tuan/income_lists');


// 合作客户-列表   https://testerp.yktour.com.cn/docs/bom/cooperative_customers_supplier
export const cooperativeCustomers = commonRequestHandler('/api_supplier/supplier/cooperative_customers');
// 合作客户-勾选合作列表   https://testerp.yktour.com.cn/docs/bom/have_not_cooperative_customers
export const haveNotCooperativeCustomers = commonRequestHandler('/api_supplier/supplier/have_not_cooperative_customers');
// 合作客户-勾选合作列表-提交   https://testerp.yktour.com.cn/docs/bom/add_cooperative_customers
export const addCooperativeCustomers = commonRequestHandler('/api_supplier/supplier/add_cooperative_customers');
// 合作客户-勾选合作-查看/编辑/重新签约详情   https://testerp.yktour.com.cn/docs/bom/cooperative_customers_info
export const cooperativeCustomersInfo = commonRequestHandler('/api_supplier/supplier/cooperative_customers_info');
// 合作客户-勾选合作-查看/编辑/重新签约详情-编辑   https://testerp.yktour.com.cn/docs/bom/edit_cooperation
export const editCooperation = commonRequestHandler('/api_supplier/supplier/edit_cooperation');
// 合作客户-勾选合作-查看/编辑/重新签约详情-重新签约   https://testerp.yktour.com.cn/docs/bom/renew_contract
export const renewContract = commonRequestHandler('/api_supplier/supplier/renew_contract');

// 供应商详情-确认/退回合作提交   https://testerp.yktour.com.cn/docs/bom/confirm_return_cooperation_branch_office
export const confirmReturnCooperation = commonRequestHandler('/api_supplier/supplier/confirm_return_cooperation');

// 合作分公司-列表
export const getFilialeCooperationList = newCommonRequestHandler('/v1/basedata/cooperation-branch-office/list');
// 合作分公司-确认/拒绝 
export const confirmFilialeCooperation = newCommonRequestHandler('/v1/basedata/cooperation-branch-office/confirm-refuse');
// 合作分公司-发起合作列表
export const searchFilialeCooperation = newCommonRequestHandler('/v1/basedata/cooperation-branch-office/search');
// 合作分公司-待确认列表
export const searchConfirmList = newCommonRequestHandler('/v1/basedata/cooperation-branch-office/confirm-list');
// 合作分公司-发起
export const sponsorFilialeCooperation = newCommonRequestHandler('/v1/basedata/cooperation-branch-office/initiate');



