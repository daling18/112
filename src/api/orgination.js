import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';

// 系统管理-组织机构-组织信息 (详情数据) https://testerp.yktour.com.cn/docs/bom/orgination-get_org_detail
export const orgGetOrgDetail = commonRequestHandler('/api/orgination/get_org_detail');

// 系统管理-组织机构-所属组织机构信息 https://testerp.yktour.com.cn/docs/bom/1104
export const selfDetail = commonRequestHandler('/api/orgination/self_detail');
// 系统管理-组织机构-删除业务章 https://testerp.yktour.com.cn/docs/bom/1106
export const delSeal = commonRequestHandler('/api/orgination/del_seal');
// 获取可下单金额 
export const getPurchaseAmount = commonRequestHandler('/api/orgination/get_purchase_amount');

// 所属组织增删改 https://testerp.yktour.com.cn/docs/bom/bom-1ati2tc6ih8jd
export const addSelfOrg = newCommonRequestHandler('/v1/orgination/orgination/add-self-org');
export const editSelfOrg = newCommonRequestHandler('/v1/orgination/orgination/edit-self-org');
export const disabledSelfOrg = commonRequestHandler('/api/orgination/disabled_self_org');
export const selfDel = commonRequestHandler('/api/orgination/self_del');
export const delOrg = commonRequestHandler('/api/orgination/del');

// 系统管理-账户管理-数据权限配置-获取根组织的数据列表 https://testerp.yktour.com.cn/docs/bom/get_root_orgs
export const getRootOrgs = commonRequestHandler('/api/orgination/get_root_orgs');

// 系统管理-账户管理-数据权限配置-获取分公司组织 https://testerp.yktour.com.cn/docs/bom/get_company_orgs
export const getCompanyOrgs = commonRequestHandler('/api/orgination/get_company_orgs');

// 系统管理-组织机构-中行账户配置-获取 https://testerp.yktour.com.cn/docs/bom/get_boc_config
export const getBocConfig = commonRequestHandler('/api/orgination/get_boc_config');

// 系统管理-组织机构-中行账户配置-添加/编辑/保存 https://testerp.yktour.com.cn/docs/bom/edit_boc_config
export const editBocConfig = commonRequestHandler('/api/orgination/edit_boc_config');

export const currentOrgList = commonRequestHandler('/api/orgination/current_org_list');


// 系统管理  工作台
//获取欢迎页面所有列表推荐
export const getWelcomeList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/system/bom-notice/welcome-data-list')({params, success: res => resolve(res), showLoading}))
//获取列表
export const getWorkerList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/system/bom-notice/notice-data-list')({params, success: res => resolve(res), showLoading}))
//删除
export const removeWorkerRow = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/system/bom-notice/delete-data')({params, success: res => resolve(res), showLoading}))
//获取详情
export const getWorkerDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/system/bom-notice/detail')({params, success: res => resolve(res), showLoading}))
//编辑保存
export const saveWorkerRow = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/system/bom-notice/save-data')({params, success: res => resolve(res), showLoading}))
// api/v1/system/bom-notice/delete-data-images
export const removeUploadData = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/system/bom-notice/delete-data-images')({params, success: res => resolve(res), showLoading}))

