import {commonRequestHandler} from './api';

// 系统管理 - 客户信息 https://testerp.yktour.com.cn/docs/bom/client_list
export const clientList = commonRequestHandler('/api/client/client_list');
// 系统管理 - 客户信息 - 添加客户信息 https://testerp.yktour.com.cn/docs/bom/add_client
export const addClient = commonRequestHandler('/api/client/add_client');
// 系统管理 - 客户信息 - 提交客户信息 https://testerp.yktour.com.cn/docs/bom/do_add_client
export const doAddClient = commonRequestHandler('/api/client/do_add_client');
// 系统管理 - 客户信息 - 获取单位列表 https://testerp.yktour.com.cn/docs/bom/get_settlement_list
export const getSettlementList = commonRequestHandler('/api/client/get_settlement_list');
// 系统管理 - 客户信息 - 获取客户详情 https://testerp.yktour.com.cn/docs/bom/client_info
export const clientInfo = commonRequestHandler('/api/client/client_info');
