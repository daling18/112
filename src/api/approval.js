import {commonRequestHandler} from './api';
import http from 'src/plugins/axios';

// 审批配置列表 https://testerp.yktour.com.cn/docs/bom/921
export const approval_config_list = commonRequestHandler('/api/approval/approval_config_list');

// 删除审批配置 https://testerp.yktour.com.cn/docs/bom/922
export const del_approval_config = commonRequestHandler('/api/approval/del_approval_config');

// 审批配置新增修改复制 https://testerp.yktour.com.cn/docs/bom/925
export const approval_config_form = commonRequestHandler('/api/approval/approval_config_form');

// 搜索员工 https://testerp.yktour.com.cn/docs/bom/926
export const search_org_operator = commonRequestHandler('/api/approval/search_org_operator');

// 根据组织ID获取员工 https://testerp.yktour.com.cn/docs/bom/927
export const get_org_operator = commonRequestHandler('/api/approval/get_org_operator');

// 提交审批配置 https://testerp.yktour.com.cn/docs/bom/929
export const edit_approval_config = commonRequestHandler('/api/approval/edit_approval_config');

// 审批单配置列表-我发起的 https://testerp.yktour.com.cn/docs/bom/952
export const my_start_approval_list = commonRequestHandler('/api/approval/my_start_approval_list');

// 审批单配置列表-待我审批的 https://testerp.yktour.com.cn/docs/bom/994
export const my_wait_approval_list = commonRequestHandler('/api/approval/my_wait_approval_list');

// 审批单配置列表-待我审批的-处理审批流操作 https://testerp.yktour.com.cn/docs/bom/1026
export const deal_approval = commonRequestHandler('/api/approval/deal_approval');

// 审批单配置列表-我审批过的 https://testerp.yktour.com.cn/docs/bom/1037
export const already_approval_list = commonRequestHandler('/api/approval/already_approval_list');

// 审批单详情 https://testerp.yktour.com.cn/docs/bom/998
export const approval_detail = commonRequestHandler('/api/approval/approval_detail');

// 审批单详情-审批内容 https://testerp.yktour.com.cn/docs/bom/1003
export const approval_content = commonRequestHandler('/api/approval/approval_content');

// 供应商审批 审批单配置列表-待我审批的-处理审批流操作
export const deal_approval_new = (p) => http.post('system/approval/deal-approval', p);