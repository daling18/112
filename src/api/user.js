import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';


// 系统管理 - 账号管理 - 获取分配路线 https://testerp.yktour.com.cn/docs/bom/add_line_aut
export const addLineAuth = commonRequestHandler('/api/user/add_line_auth');
// 系统管理 - 账号管理 - 提交分配路线 https://testerp.yktour.com.cn/docs/bom/do_add_line_auth
export const doAddLineAuth = commonRequestHandler('/api/user/do_add_line_auth');

// 系统管理 - 账号管理 - 数据权限配置 - 获取 https://testerp.yktour.com.cn/docs/bom/data_permission_config
export const dataPermissionConfig = commonRequestHandler('/api/user/data_permission_config');
// 系统管理 - 账号管理 - 数据权限配置 - 保存 https://testerp.yktour.com.cn/docs/bom/add_data_permission_config
export const addDataPermissionConfig = commonRequestHandler('/api/user/add_data_permission_config');
// 系统管理 - 账号管理 - 数据权限配置 - 搜索 https://testerp.yktour.com.cn/docs/bom/get_users_by_name
export const getUsersByName = commonRequestHandler('/api/user/get_users_by_name');
// 系统管理 - 账号管理 - 数据权限配置 - 复制提交 https://testerp.yktour.com.cn/docs/bom/copy_data_permission_config
export const copyDataPermissionConfig = commonRequestHandler('/api/user/copy_data_permission_config');
// 系统管理 - 账号管理 - 数据权限配置 - 批量设置提交 https://testerp.yktour.com.cn/docs/bom/batch_add_data_permission_config
export const batchAddDataPermissionConfig = commonRequestHandler('/api/user/batch_add_data_permission_config');

export const delUser = commonRequestHandler('/api/user/del');
// 系统管理 - 账号管理 - 所属组织下账号管理
export const selfUserList = commonRequestHandler('/api/user/self_index');
export const addSelfUser = commonRequestHandler('/api/user/add_self_user');
export const todoAddSelfUser = commonRequestHandler('/api/user/todo_add_self_user');
export const delSelfUser = commonRequestHandler('/api/user/self_del');
export const assignSelfRole = commonRequestHandler('/api/user/assign_self_role');
export const doAssignSelfRole = commonRequestHandler('/api/user/do_assign_self_role');
export const addSelfLineAuth = commonRequestHandler('/api/user/add_self_line_auth');
export const doAddSelfLineAuth = commonRequestHandler('/api/user/do_add_self_line_auth');
// export const selfDataPermissionConfig = commonRequestHandler('/api/user/self_data_permission_config'); -- 暂时与dataPermissionConfig公用
export const addSelfDataPermissionConfig = commonRequestHandler('/api/user/add_self_data_permission_config');
// export const getDefinedDataPermission = commonRequestHandler('/api/user/get_defined_data_permission');
// export const getUsersByName = commonRequestHandler('/api/user/get_users_by_name');
export const copySelfDataPermissionConfig = commonRequestHandler('/api/user/copy_self_data_permission_config');
export const batchAddSelfDataPermissionConfig = commonRequestHandler('/api/user/batch_add_self_data_permission_config');
export const selfDetail = commonRequestHandler('/api/user/self_detail');
export const changeSelfStatus = commonRequestHandler('/api/user/change_self_status');
export const onWxContorl = commonRequestHandler('https://wxapp.yktour.com.cn/wxmember/updateQYMember',false);
export const offWxContorl = commonRequestHandler('https://wxapp.yktour.com.cn/wxmember/deleteQYMember',false);

// 系统管理-销售账号管理
export const getSaleAccound = newCommonRequestHandler('/v1/system/sale-user/sale-list');
// 系统管理-新增销售账号管理
export const handleAddUser = newCommonRequestHandler('/v1/system/bom-user/save-user');
// 系统管理-获取新账号列表
export const getNewAccoundList = newCommonRequestHandler('/v1/system/bom-user/list');
// 系统管理-转移客户销售列表
export const getSalesAccoundList = newCommonRequestHandler('/v1/system/sale-user/sale-list');

// 系统管理-转移客户
export const handleZhuanyiSalesAccound = newCommonRequestHandler('/v1/system/sale-user/trans-custom');



