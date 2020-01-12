import {commonRequestHandler} from './api';

// 账户权限详情  https://testerp.yktour.com.cn/docs/bom/get_user_rule_list
export const getUserRuleList = commonRequestHandler('/api/auth_operation/get_user_rule_list');

// 修改账户自定义角色拥有权限  https://testerp.yktour.com.cn/docs/bom/edit_user_operation_rule
export const editUserOperationRule = commonRequestHandler('/api/auth_operation/edit_user_operation_rule');

// 获取操作权限列表  https://testerp.yktour.com.cn/docs/bom/get_operation_rule
export const getOperationRule = commonRequestHandler('/api/auth_operation/get_operation_rule');

// 本公司账户权限详情  https://testerp.yktour.com.cn/docs/bom/get_user_rule_list
export const getSelfUserRuleList = commonRequestHandler('/api/auth_operation/self_get_user_rule_list');

// 修改本公司账户自定义角色拥有权限  https://testerp.yktour.com.cn/docs/bom/edit_user_operation_rule
export const editSelfUserOperationRule = commonRequestHandler('/api/auth_operation/self_edit_user_operation_rule');

// 获取本公司操作权限列表  https://testerp.yktour.com.cn/docs/bom/get_operation_rule
export const getSelfOperationRule = commonRequestHandler('/api/auth_operation/self_get_operation_rule');
