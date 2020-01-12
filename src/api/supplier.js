import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';

// 获取省市列表-联动 https://testerp.yktour.com.cn/docs/bom/get_area_list
export const getAreaList = commonRequestHandler('/api/tool/get_area_list');
// 获取所有省市 https://testerp.yktour.com.cn/docs/bom/get_all_area_list
export const getAllAreaList = commonRequestHandler('/api/tool/get_all_area_list');
// 获取所有合作线路 https://testerp.yktour.com.cn/docs/bom/get_all_param_product_list
export const getAllParamProductList = commonRequestHandler('/api/category/get_all_param_product_list');
// 税号检索公司信息 https://testerp.yktour.com.cn/docs/bom/get_duty_paragraph_info
export const getDutyParagraphInfo = commonRequestHandler('/api_supplier/supplier/get_duty_paragraph_info');
// 供应商列表 https://testerp.yktour.com.cn/docs/bom/supplier_list
export const supplierList = commonRequestHandler('/api_supplier/supplier/supplier_list');
// 供应商启用禁用 https://testerp.yktour.com.cn/docs/bom/enabled_disable_supplier
export const enabledDisableSupplier = commonRequestHandler('/api_supplier/supplier/enabled_disable_supplier');
// 新增供应商信息第一步 https://testerp.yktour.com.cn/docs/bom/add_supplier_first_step
export const addSupplierFirstStep = commonRequestHandler('/api_supplier/supplier/add_supplier_first_step');
// 新增供应商信息第二步 https://testerp.yktour.com.cn/docs/bom/add_edit_supplier_second_step
export const addEditSupplierSecondStep = commonRequestHandler('/api_supplier/supplier/add_edit_supplier_second_step');
// 获取修改供应商第一步信息 https://testerp.yktour.com.cn/docs/bom/get_edit_supplier_first_info
export const getEditSupplierFirstInfo = commonRequestHandler('/api_supplier/supplier/get_edit_supplier_first_info');
// 修改供应商信息第一步 https://testerp.yktour.com.cn/docs/bom/edit_supplier_first_step
export const editSupplierFirstStep = commonRequestHandler('/api_supplier/supplier/edit_supplier_first_step');
// 获取修改供应商第二步信息 https://testerp.yktour.com.cn/docs/bom/get_edit_supplier_first_info
export const getEditSupplierSecondInfo = commonRequestHandler('/api_supplier/supplier/get_edit_supplier_second_info');
// 供应商信息详情 https://testerp.yktour.com.cn/docs/bom/supplier_detail
export const supplierDetail = commonRequestHandler('/api_supplier/supplier/supplier_detail');
// 重新提交审批 https://testerp.yktour.com.cn/docs/bom/re_approval
// export const reApproval = commonRequestHandler('/api_supplier/supplier/re_approval');
// 供应商行程-BOM行程列表  https://testerp.yktour.com.cn/docs/bom/995
export const supplierProduct = commonRequestHandler('/api_supplier/product/lists');

// 供应商行程-供应商上架  https://testerp.yktour.com.cn/docs/bom/995
export const supplierDoPutOn = commonRequestHandler('/api_supplier/product/do_put_on');

// 供应商行程-供应商下架 https://testerp.yktour.com.cn/docs/bom/1008
export const supplierDoPutOff = commonRequestHandler('/api_supplier/product/do_put_off');

// 供应商行程-供应商撤回 https://testerp.yktour.com.cn/docs/bom/1009
export const supplierRecall = commonRequestHandler('/api_supplier/product/recall');

// 供应商行程-新增行程（简易） https://testerp.yktour.com.cn/docs/bom/957
export const supplierDoEasyStep1 = commonRequestHandler('/api_supplier/product/do_easy_step1');
// 供应商行程-获取行程附件（简易） https://testerp.yktour.com.cn/docs/bom/958
export const supplierEasyStep2 = commonRequestHandler('/api_supplier/product/easy_step2');
// 供应商行程-提交行程附件（简易） https://testerp.yktour.com.cn/docs/bom/959
export const supplierDoEasyStep2 = commonRequestHandler('/api_supplier/product/do_easy_step2');
// 供应商行程-新增行程 https://testerp.yktour.com.cn/docs/bom/957
export const supplierDoStep1 = commonRequestHandler('/api_supplier/product/do_step1');
// 供应商行程-基本信息 https://testerp.yktour.com.cn/docs/bom/956
export const supplierStep1 = commonRequestHandler('/api_supplier/product/step1');
// 供应商行程-提交行程信息 https://testerp.yktour.com.cn/docs/bom/962
export const supplierDoStep2 = commonRequestHandler('/api_supplier/product/do_step2');
// 供应商行程-获取行程信息 https://testerp.yktour.com.cn/docs/bom/961
export const supplierStep2 = commonRequestHandler('/api_supplier/product/step2');
// 供应商行程-提交行程说明 https://testerp.yktour.com.cn/docs/bom/964
export const supplierDoStep3 = commonRequestHandler('/api_supplier/product/do_step3');
// 供应商行程-获取行程说明 https://testerp.yktour.com.cn/docs/bom/963
export const supplierStep3 = commonRequestHandler('/api_supplier/product/step3');
// 供应商行程-获取行程说明 https://testerp.yktour.com.cn/docs/bom/963
export const supplierProductDetail= commonRequestHandler('/api_supplier/product/detail');
// 供应商行程-删除行程 https://testerp.yktour.com.cn/docs/bom/985
export const supplierDelProduct= commonRequestHandler('/api_supplier/product/del_product');
// 供应商行程-变更行程状态 https://testerp.yktour.com.cn/docs/bom/985
export const supplierChangeStatus= commonRequestHandler('/api_supplier/product/change_status');
// 供应商行程单下载-下载pdf https://testerp.yktour.com.cn/docs/bom/save_travel_detail_word
export const supplierSaveTravelDetailWord = commonRequestHandler('/api_supplier/product/save_travel_detail_word');
// 供应商报价列表
export const supplierPriceTypeList = commonRequestHandler('/api_supplier/product/price_type_list');
// 供应商新增/编辑价格类型
export const supplierPriceType = commonRequestHandler('/api_supplier/product/price_type');
// 供应商提交新增/编辑价格类型
export const supplierDoPriceType = commonRequestHandler('/api_supplier/product/do_price_type');
// 启用禁用报价
export const supplierChangePriceStatus = commonRequestHandler('/api_supplier/product/change_price_status');
// 提交新增批量报价
export const supplierDoBatchQuotation = commonRequestHandler('/api_supplier/product/do_batch_quotation');
// 配置可变项
export const supplierSetExtra = commonRequestHandler('/api_supplier/product/set_extra');
// 提交配置可变项
export const supplierDoSetExtra = commonRequestHandler('/api_supplier/product/do_set_extra');
// 显示日历价格
export const supplierShowPriceDate = commonRequestHandler('/api_supplier/product/show_price_date');
// 更新行程库存
export const supplierUpdatePlanNum = commonRequestHandler('/api_supplier/product/update_plan_num');
// 删除指定日期
export const supplierDelPriceDate = commonRequestHandler('/api_supplier/product/del_price_date');
// 供应商催款 https://testerp.yktour.com.cn/docs/bom/press_bill
export const supplierPressBill = commonRequestHandler('/api_supplier/tuan/press_bill');
// 新增供应商（合并第一步第二步）  https://testerp.yktour.com.cn/docs/bom/add_supplier
export const addSupplier = commonRequestHandler('/api_supplier/supplier/add_supplier');
// 获取修改供应商信息（合并第一步第二步）  https://testerp.yktour.com.cn/docs/bom/add_supplier
export const getEditSupplierInfo = commonRequestHandler('/api_supplier/supplier/get_edit_supplier_info');
// 修改供应商信息（合并第一步第二步）  https://testerp.yktour.com.cn/docs/bom/add_supplier
export const editSupplier = commonRequestHandler('/api_supplier/supplier/edit_supplier');

//供应商列表
export const getSupplierList = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/supplier/supplier-list')({params, success: res => resolve(res), showLoading}))
//供应商详情 
export const getSupplierDetail = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/supplier/supplier-detail')({params, success: res => resolve(res), showLoading}))
//启用禁用-供应商 
export const enDisableSupplier = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/supplier/en-disable-supplier')({params, success: res => resolve(res), showLoading}))
//新增供应商
export const addSupplierPromise = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/supplier/add-supplier')({params, success: res => resolve(res), showLoading}))
//编辑供应商
export const editSupplierPromise = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/supplier/edit-supplier')({params, success: res => resolve(res), showLoading}))
//重新提交审批
export const reSubmitApproval = (params, showLoading = false) => new Promise((resolve) => newCommonRequestHandler('/v1/basedata/supplier/resubmit-approval')({params, success: res => resolve(res), showLoading}))