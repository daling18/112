import axios from "axios";
import Qs from "qs";
import http from "src/plugins/axios";
import { Message, Loading, MessageBox } from "element-ui";
import { newCommonRequestHandler } from "./api_new";
// let baseUrl = '/bom'//测试环境+开发环境
let baseUrl = "/bom"; //正式环境
console.log(process.env, "=========");
console.log("test YK_ENV: ", process.env.VUE_APP_ENV);
console.log("test NODE_ENV: ", process.env.NODE_ENV);

if (process.env.VUE_APP_ENV === "test") {
  console.log("test YK_ENV");
  baseUrl = "/bom";
}
// // 获取用户名
// export const getUserName = params => {
//   return axios.post(`${baseUrl}/api/login/get_user_name`, params);
// };


// 登录-第一步-获取凭证
// export const loginCasOne = params => { return axios.get('https://testam.yktour.com.cn/am/cas/login?ajax=1',params)};
// 登录-第一步-发送凭证
// export const loginCasSecond = params => { return axios.post('https://testam.yktour.com.cn/am/cas/login?ajax=1',params)};

export const axiosRequestHandler = url => {
  return ({
    params = {},
    headers = {},
    method = "post",
    success = () => {},
    showLoading = false,
    formdata = false
  } = {}) => {
    let loading = null,
      Vue = window.Vue;
    let isUsernameChange =
      window.$username && window.$username != localStorage.getItem("username");

    // if(url != `${baseUrl}/api/login/get_user_name` && isUsernameChange){
    if (isUsernameChange) {
      Message({
        message: "登陆用户发生变化！",
        type: "warning",
        duration: 1500,
        showClose: true,
        onClose() {
          window.location.reload();
        }
      });
      return;
    }
    if (showLoading) {
      loading = Loading.service({
        fullscreen: true
      });
    }
    let isMethodArray = ["get", "delete", "put"];

    let config = {
      url: url,
      headers: headers,
      method: method,
      data: formdata ? Qs.stringify(params) : params
    };
    if (isMethodArray.indexOf(method) != "-1") {
      config.params = params;
    }
    console.log("config", config);
    axios(config)
      .then(params => {
        let { code, msg, data } = params["data"];

        loading && loading.close();
        if (code == 10000) {
          window.location.href = data;
        } else if (code == 403) {
          // console.log(Alert)
          MessageBox.alert(msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        } else {
          success(params);
        }
      })
      .catch(error => {
        console.log("request error: ", error);
        loading && loading.close();
        success({
          data: {
            code: 50000,
            msg: "服务器请求失败，请刷新重试"
          }
        });
      });
  };
};
// 登录
export const loginTodo = axiosRequestHandler(`${baseUrl}/api/login/do_login`);
/**
 *  通用请求接口方法
 */
export const commonRequestHandler = (path, isBase = true) =>axiosRequestHandler(`${isBase ? baseUrl : ""}${path}`);

export const getUserName = (params, showLoading = false) =>{
  return new Promise((resolve) => commonRequestHandler('/api/login/get_user_name')({params, success: res => resolve(res), showLoading}))
};

  // 登出
export const loginOut = axiosRequestHandler(`${baseUrl}/api/login/logout`);
//修改密码
export const changePasswd = axiosRequestHandler(
  `${baseUrl}/api/login/modify_password`
);
// 获取微信小程序绑定二维码
export const wxacode = axiosRequestHandler(`${baseUrl}/api/wxacode/index`);
//获取订单操作人列表
export const getChangeOrderOperatorList = axiosRequestHandler(
  `${baseUrl}/api/order/get_order_operations`
);
//设置订单操作人
export const setOrderOperator = axiosRequestHandler(
  `${baseUrl}/api/order/set_order_operation`
);

// 控制台
export const getGroupList = axiosRequestHandler(`${baseUrl}/api/tuan`);
export const changeLockTuan = axiosRequestHandler(
  `${baseUrl}/api/tuan/change_lock_tuan`
);
export const changePlanNum = axiosRequestHandler(
  `${baseUrl}/api/tuan/change_plan_num`
);
export const cleanPlacesNum = axiosRequestHandler(
  `${baseUrl}/api/tuan/qingwei`
);
export const getOrderForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/add_order`
);
export const getOrderZhikeForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/add_zhike_order`
);
export const setOrderForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/todo_add_order`
);
export const setOrderZhikeForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/todo_add_zhike_order`
);
export const getSyncOrder = axiosRequestHandler(
  `${baseUrl}/api/bpm/sync_order`
);
export const setUnlockTuan = axiosRequestHandler(
  `${baseUrl}/api/tuan/unlock_tuan`
);
export const setLockTuan = axiosRequestHandler(`${baseUrl}/api/tuan/lock_tuan`);

// 收入
export const getIncomeList = axiosRequestHandler(
  `${baseUrl}/api/tuan/income_lists`
);
export const getIncomeForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/add_income`
);
export const setIncomeForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/todo_add_income`
);
export const delIncomeForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/del_income`
);
export const getSearchOrg = params => {
  return axios.post(`${baseUrl}/api/orgination/search_org`, params);
};
// export const getSearchOrg = axiosRequestHandler(`${baseUrl}/api/orgination/search_org`);
export const getSearchSupplier = params => {
  return axios.post(`${baseUrl}/api/orgination/search_coop_suppliers`, params);
};

export const getSearchNewSupplier = params => {
  return axios.post(`${baseUrl}/api/orgination/search_org_by_name`, params);
};
// 成本
export const getCostList = axiosRequestHandler(
  `${baseUrl}/api/tuan/cost_lists`
);
export const getCostForm = axiosRequestHandler(`${baseUrl}/api/tuan/add_cost`);
export const setCostForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/todo_add_cost`
);
export const delCostForm = axiosRequestHandler(`${baseUrl}/api/tuan/del_cost`);
// 确认件
export const getConfirmPiece = axiosRequestHandler(
  `${baseUrl}/api/tuan/confirm_piece`
);
export const delConfirmPiece = axiosRequestHandler(
  `${baseUrl}/api/tuan/del_confirm_piece`
);
// 合同
export const getContractDetail = axiosRequestHandler(
  `${baseUrl}/api/tuan/contract_detail`
);

// 选团
export const getBpmProductList = axiosRequestHandler(
  `${baseUrl}/api/bpm/product`
);
export const setBpmChooseTuan = axiosRequestHandler(
  `${baseUrl}/api/bpm/choose_tuan`
);

// 资金结算
export const financeBalance = axiosRequestHandler(
  `${baseUrl}/api/finance/index`
);
//获取授信配置数据
export const getCreditConfigure = axiosRequestHandler(
  `${baseUrl}/api/finance/get_credit_line`
);
//修改授信配置
export const setCreditConfigure = axiosRequestHandler(
  `${baseUrl}/api/finance/do_add_credit_line`
);

// 付款列表
export const paymentList = axiosRequestHandler(
  `${baseUrl}/api/finance/payment_list`
);
//获取团队成本列表
export const getTuanCost = axiosRequestHandler(
  `${baseUrl}/api/finance/get_tuan_cost`
);
//付款图片上传
export const uploadImg = axiosRequestHandler(
  `${baseUrl}/api/finance/upload_img`
);
//添加付款
export const addPayment = axiosRequestHandler(
  `${baseUrl}/api/finance/add_payment`
);
//编辑付款
export const editPayment = axiosRequestHandler(
  `${baseUrl}/api/finance/edit_payment`
);
// 收款列表
export const receiptList = axiosRequestHandler(
  `${baseUrl}/api/finance/receipt_list`
);
//获取团队收入列表
export const getTuanIn = axiosRequestHandler(
  `${baseUrl}/api/finance/get_tuan_in`
);
//添加收款
export const addReceipt = axiosRequestHandler(
  `${baseUrl}/api/finance/add_receipt`
);
//编辑收款
export const editReceipt = axiosRequestHandler(
  `${baseUrl}/api/finance/edit_receipt`
);
// 收付款详情
export const detail = axiosRequestHandler(`${baseUrl}/api/finance/detail`);
// 团队账单列表
export const tuanBillList = axiosRequestHandler(
  `${baseUrl}/api/finance/order_list`
);
//团队订单列表
export const tuanOrderLists = axiosRequestHandler(
  `${baseUrl}/api/tuan/order_lists`
);
// 锁团
export const tuanLockAction = axiosRequestHandler(
  `${baseUrl}/api/tuan/lock_tuan`
);
// 解团
export const tuanUnlockAction = axiosRequestHandler(
  `${baseUrl}/api/tuan/unlock_tuan`
);
// 锁账
export const financeLockAction = axiosRequestHandler(
  `${baseUrl}/api/finance/lock_fund`
);
// 解账
export const financeUnlockAction = axiosRequestHandler(
  `${baseUrl}/api/finance/unlock_fund`
);
// 团队名单
export const getTouristLists = axiosRequestHandler(
  `${baseUrl}/api/tuan/tourist_lists`
);
// 团队账单
export const getGroupBillDetail = axiosRequestHandler(
  `${baseUrl}/api/finance/bill_detail`
);
// 导入收入结算表下载
export const tuanExportIncomeWord = axiosRequestHandler(
  `${baseUrl}/api/tuan/export_income_word`
);
// 导入成本结算表下载
export const tuanExportCostWord = axiosRequestHandler(
  `${baseUrl}/api/tuan/export_cost_word`
);
// 团队操作记录
export const getGroupOperating = axiosRequestHandler(
  `${baseUrl}/api/tuan/op_log`
);
//团队订单详情
export const getGroupOrderDetails = axiosRequestHandler(
  `${baseUrl}/api/tuan/bom_order_detail`
);
// 使用api/tuan/distr_order_detail替代 by qzhchen 20180928
// export const getSaleGroupOrderDetails = axiosRequestHandler(`${baseUrl}/api/tuan/sale_bom_order_detail`);
export const getFinGroupOrderDetails = axiosRequestHandler(
  `${baseUrl}/api/tuan/finance_bom_order_detail`
);
// 销售订单详情页保存添加收款
export const saveSaleOrderGathering = axiosRequestHandler(
  `${baseUrl}/api/tuan/save_sale_order_gathering`
);
// 添加收入列表保存添加收款 计调操作-查看团队订单-团队订单详情
export const saveTeamOrderGathering = axiosRequestHandler(
  `${baseUrl}/api/tuan/save_team_order_gathering`
);
// 添加收入列表保存添加收款 财务操作-财务添加收款
export const financeSaveOrderGathering = axiosRequestHandler(
  `${baseUrl}/api/finance/finance_save_order_gathering`
);
// 添加收入列表保存添加收款 控制台-添加收入列表
export const saveOrderGathering = axiosRequestHandler(
  `${baseUrl}/api/tuan/save_order_gathering`
);
// //TMD订单添加订单明细(接口名修改了，原来add_order_detail)  operator_price_detail_add迁移到tuan.js  by qzhchen 20180905
// export const addOrderDetail = axiosRequestHandler(`${baseUrl}/api/tuan/operator_price_detail_add`);
//订单价格明细操作权限
export const checkPriceDetail = axiosRequestHandler(
  `${baseUrl}/api/tuan/check_price_detail_add`
);
//添加财务账号信息
export const addPaymentAccount = axiosRequestHandler(
  `${baseUrl}/api/finance/add_payment_account`
);
//编辑财务账号信息
export const editPaymentAccount = axiosRequestHandler(
  `${baseUrl}/api/finance/edit_payment_account`
);
//财务账号列表
export const getPaymentAccountList = axiosRequestHandler(
  `${baseUrl}/api/finance/get_payment_account_list`
);
//往来账户-本公司账户列表
export const getPaymentAccountListV1 = p =>
  http.post("settlement/finance/get-payment-account-list", p, false);
//设置为结算默认账户
export const setSettlementAccount = p =>
  http.post("settlement/finance/set-up-settlement-account", p, false);
//获取该结算方的历史已收/已付金额，剩余应收/应付金额
export const getAmountInfo = axiosRequestHandler(
  `${baseUrl}/api/finance/get_amount_info`
);
//获取财务账户信息(搜索用)
export const getPaymentAccount = axiosRequestHandler(
  `${baseUrl}/api/finance/get_payment_account`
);
//直客结算列表
export const getCustomerSettlementList = axiosRequestHandler(
  `${baseUrl}/api/zhike/customer_settlement_list`
);
//获取直客的历史已收金额，剩余应收金额
export const getCustomerAmount = axiosRequestHandler(
  `${baseUrl}/api/zhike/get_customer_amount`
);
//添加直客收款记录
export const addCustomerPayment = axiosRequestHandler(
  `${baseUrl}/api/zhike/add_customer_payment`
);
//编辑直客收款记录
export const editCustomerPayment = axiosRequestHandler(
  `${baseUrl}/api/finance/edit_customer_payment`
);
//直客收款记录列表
export const getCustomerPaymentList = axiosRequestHandler(
  `${baseUrl}/api/zhike/customer_payment_list`
);
//直客收款记录详情
export const customerPaymentDetail = axiosRequestHandler(
  `${baseUrl}/api/finance/customer_payment_detail`
);
//撤销收付款
export const paymentCancel = axiosRequestHandler(
  `${baseUrl}/api/finance/payment_cancel`
);
//查看撤销记录
export const cancelInfo = axiosRequestHandler(
  `${baseUrl}/api/finance/cancel_info`
);
//交易记录
export const getBalanceFetailList = axiosRequestHandler(
  `${baseUrl}/api/finance/get_balance_detail_list`
);
//成本结算记录、收入结算记录
export const getPaymentDetailList = axiosRequestHandler(
  `${baseUrl}/api/finance/get_payment_detail_list`
);
// 用户管理-员工列表
export const getStaffList = axiosRequestHandler(`${baseUrl}/api/user`);
// 用户管理-员工列表启用禁用账号
export const staffChangeStatus = axiosRequestHandler(
  `${baseUrl}/api/user/change_status`
);
// 用户管理-分配角色
export const staffRole = axiosRequestHandler(`${baseUrl}/api/user/assign_role`);
// 用户管理-分配角色-提交
export const staffRoleDo = axiosRequestHandler(
  `${baseUrl}/api/user/do_assign_role`
);
// 用户管理-新增/修改员工
export const addStaff = axiosRequestHandler(`${baseUrl}/api/user/add_user`);
// 用户管理-新增/修改员工获得组织
export const staffGetOrg = axiosRequestHandler(
  `${baseUrl}/api/orgination/get_org`
);
// 用户管理-提交新增/修改员工
export const todoAddStaff = axiosRequestHandler(
  `${baseUrl}/api/user/todo_add_user`
);
//角色管理-角色列表
export const getRoleList = axiosRequestHandler(`${baseUrl}/api/auth/get_roles`);
//角色管理-角色详情
export const getRoleDetail = axiosRequestHandler(
  `${baseUrl}/api/auth/get_role`
);
//角色管理-删除角色
export const deleteRole = axiosRequestHandler(`${baseUrl}/api/auth/del_role`);
//角色管理-添加角色
export const gainRole = axiosRequestHandler(`${baseUrl}/api/auth/add_role`);
//角色管理-修改角色
export const editRole = axiosRequestHandler(`${baseUrl}/api/auth/edit_role`);
//角色管理-角色权限列表
export const rolePowerlist = axiosRequestHandler(
  `${baseUrl}/api/auth/get_assign_rules`
);
//角色管理-修改角色权限列表
export const editRolePower = axiosRequestHandler(
  `${baseUrl}/api/auth/edit_role_rule`
);
//获取组织机构
export const getOrgination = axiosRequestHandler(
  `${baseUrl}/api/orgination/get_org`
);
// 组织类型
// export const ORG_TYPES = {'1': '集团公司', '2': '区域中心', '3': '分公司', '4': '部门', '5': '营业部', '6': '供应商', '7': '外部代理商', '8': '外埠公司'};
// 获取组织机构列表信息，支持根据名称、类型查询
// export const getOrginations = axiosRequestHandler(`${baseUrl}/api/orgination/get_orgs`);
export const getOrginations = axiosRequestHandler(
  `${baseUrl}/api/orgination/org_list`
);
// 根据组织id获取下一级组织列表信息
// export const getNextOrginations = axiosRequestHandler(`${baseUrl}/api/orgination/get_next_org_list`);
export const getNextOrginations = axiosRequestHandler(
  `${baseUrl}/api/orgination/next_org_list_by_id`
);
export const getSimpleNextOrginations = axiosRequestHandler(
  `${baseUrl}/api/orgination/simple_next_org_list_by_id`
);
// 新建组织
// export const createOrgination = axiosRequestHandler(`${baseUrl}/api/orgination/create_org`);
export const createOrgination = newCommonRequestHandler('/v1/orgination/orgination/add-org');
// 更新组织
// export const updateOrgination = axiosRequestHandler(`${baseUrl}/api/orgination/update_org`);
export const updateOrgination = newCommonRequestHandler('/v1/orgination/orgination/edit-org');
// 获取下级可创建组织类型列表
// export const getNextOrginationTypes = axiosRequestHandler(`${baseUrl}/api/orgination/get_org_types`);
export const getNextOrginationTypes = axiosRequestHandler(
  `${baseUrl}/api/orgination/get_types`
);
// 启用禁用组织
export const disabledOrg = axiosRequestHandler(
  `${baseUrl}/api/orgination/disabled_org`
);
// 新增团队接口
export const tuanTodoAdd = axiosRequestHandler(`${baseUrl}/api/tuan/todo_add`);
//获取团队编辑页详情接口
export const tuanDoAdd = axiosRequestHandler(`${baseUrl}/api/tuan/add`);
//获取城市名称
export const searchZone = params => {
  return axios.post(`${baseUrl}/api/zone/search_zone`, params);
};
//认款记录-列表
export const renkuanList = axiosRequestHandler(
  `${baseUrl}/api/finance/renkuan_list`
);
//认款记录-撤销操作
export const cancelRenkuan = axiosRequestHandler(
  `${baseUrl}/api/finance/cancel_renkuan`
);
//认款记录-核实操作
export const heshiRenkuan = axiosRequestHandler(
  `${baseUrl}/api/finance/heshi_renkuan`
);
//认款记录-核销操作
export const hexiaoRenkuan = axiosRequestHandler(
  `${baseUrl}/api/finance/hexiao_renkuan`
);
//认款记录-撤销\核实\核销详情
export const cancelRenkuanInfo = axiosRequestHandler(
  `${baseUrl}/api/finance/cancel_renkuan_info`
);
// 获取销售中心-我的订单列表
export const saleOrderList = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_order_list`
);
// 销售中心-我的订单-解绑合同
export const contractUnbindOrderSubmit = axiosRequestHandler(
  `${baseUrl}/api/contract/unbind_order`
);
// 销售中心-我的订单-绑定合同
export const contractBindOrderSubmit = axiosRequestHandler(
  `${baseUrl}/api/contract/bind_order`
);
// 获取销售中心同行认款列表
export const saleOrderRenkuan = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_order_renkuan`
);
// 获取销售中心同行收款记录列表
export const saleReceiptList = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_receipt_list`
);
// 获取销售中心同行认款记录列表
export const saleRenkuanList = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_renkuan_list`
);
// 已迁移到finance.js下 by qzhchen 20180929
// // 销售中心同行认款撤销
// export const saleCancelRenkuan = axiosRequestHandler(`${baseUrl}/api/tuan/sale_cancel_renkuan`);
// // 销售中心同行认款撤销记录查询
// export const saleCancelRenkuanInfo = axiosRequestHandler(`${baseUrl}/api/tuan/sale_cancel_renkuan_info`);
// 销售中心TMD订单添加订单明细
export const saleAddOrderDetail = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_add_order_detail`
);
// BOM选团列表
export const product = axiosRequestHandler(`${baseUrl}/api/product`);
export const searchZoneTrip = axiosRequestHandler(
  `${baseUrl}/api/zone/search_zone`
);
// 简易开团
export const doEasyStep1 = axiosRequestHandler(
  `${baseUrl}/api/product/do_easy_step1`
);
// 完善基本信息
export const doStep1 = axiosRequestHandler(`${baseUrl}/api/product/do_step1`);
// 查询计调
export const searchOp = axiosRequestHandler(`${baseUrl}/api/product/search_op`);
// 提交简易行程
export const doEasyStep2 = axiosRequestHandler(
  `${baseUrl}/api/product/do_easy_step2`
);
// 提交行程信息
export const doStep2 = axiosRequestHandler(`${baseUrl}/api/product/do_step2`);
// 提交行程说明
export const doStep3 = axiosRequestHandler(`${baseUrl}/api/product/do_step3`);
// 行程状态
export const changeStatus = axiosRequestHandler(
  `${baseUrl}/api/product/change_status`
);
// 行程基本信息
export const step1 = axiosRequestHandler(`${baseUrl}/api/product/step1`);
// 行程简易开团附件
export const easyStep2 = axiosRequestHandler(
  `${baseUrl}/api//product/easy_step2`
);
// 行程信息
export const step2 = axiosRequestHandler(`${baseUrl}/api/product/step2`);
// 行程说明
export const step3 = axiosRequestHandler(`${baseUrl}/api/product/step3`);
// 复制行程
export const copy = axiosRequestHandler(`${baseUrl}/api/product/copy`);
// 新增/编辑价格类型
export const priceType = axiosRequestHandler(
  `${baseUrl}/api/product/price_type`
);
// 提交新增/编辑价格类型
export const doPriceType = axiosRequestHandler(
  `${baseUrl}/api/product/do_price_type`
);
// 报价列表
export const priceTypeList = axiosRequestHandler(
  `${baseUrl}/api/product/price_type_list`
);
// 提交新增批量报价
export const doBatchQuotation = axiosRequestHandler(
  `${baseUrl}/api/product/do_batch_quotation`
);
// 显示日历价格
export const showPriceDate = axiosRequestHandler(
  `${baseUrl}/api/product/show_price_date`
);
// 启用禁用报价
export const changePriceStatus = axiosRequestHandler(
  `${baseUrl}/api/product/change_price_status`
);
// 删除指定日期
export const delPriceDate = axiosRequestHandler(
  `${baseUrl}/api/product/del_price_date`
);
// 更新行程库存
export const updatePlanNum = axiosRequestHandler(
  `${baseUrl}/api/product/update_plan_num`
);
// 配置可变项
export const setExtra = axiosRequestHandler(`${baseUrl}/api/product/set_extra`);
// 提交配置可变项
export const doSetExtra = axiosRequestHandler(
  `${baseUrl}/api/product/do_set_extra`
);
// 行程详情
export const Bomdetail = axiosRequestHandler(`${baseUrl}/api/product/detail`);
export const saleBomdetail = axiosRequestHandler(
  `${baseUrl}/api/product/sale_detail`
);
// 查询线路分类
export const getCateInfo = axiosRequestHandler(
  `${baseUrl}/api/category/get_cate_info`
);
// 搜索酒店
export const searchHotel = axiosRequestHandler(
  `${baseUrl}/api/product/search_hotel`
);
// 搜索景点
export const searchScenic = axiosRequestHandler(
  `${baseUrl}/api/product/search_scenic`
);
// ==================合同领取==================
// 申请列表-总部
export const getContractPulldownList2 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_list/2/1`
);
// 申请列表-分公司
export const getContractPulldownList1 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_list/1/1`
);
// 申请列表-总部-申请合同
export const setAddApply2 = axiosRequestHandler(
  `${baseUrl}/api/contract/add_apply/2`
);
// 申请列表-分公司-申请合同
export const setAddApply1 = axiosRequestHandler(
  `${baseUrl}/api/contract/add_apply/1`
);
// 申请列表-总部-详情
export const getApplyDetail2 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_detail/2/1/1`
);
// 申请列表-分公司-详情
export const getApplyDetail1 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_detail/1/1/1`
);
// 申请列表-总/分-申请合同-地址信息
export const getAddressInfo = params => {
  return axios.post(`${baseUrl}/api/express/get_all`, params);
};
// 申请列表-合同数量明细
export const getContractPulldownCount = axiosRequestHandler(
  `${baseUrl}/api/contract/contract_counts`
);
// 获取合同编号列表 总部
export const getContractNumberListLq2 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_contract_no_list/lq/2`
);
// 获取合同编号列表 分公司
export const getContractNumberListLq1 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_contract_no_list/lq/1`
);
// 获取合同订单绑定列表
export const getContractOrderList = axiosRequestHandler(
  `${baseUrl}/api/contract/contract_order_list`
);
// 合同订单绑定提交 总部
export const contractBindOrderAdd2 = axiosRequestHandler(
  `${baseUrl}/api/contract/bind_order/add/2`
);
// 合同订单绑定提交 分公司
export const contractBindOrderAdd1 = axiosRequestHandler(
  `${baseUrl}/api/contract/bind_order/add/1`
);
// 合同订单修改提交 总部
export const contractBindOrderEdit2 = axiosRequestHandler(
  `${baseUrl}/api/contract/bind_order/edit/2`
);
// 合同订单修改提交 分公司
export const contractBindOrderEdit1 = axiosRequestHandler(
  `${baseUrl}/api/contract/bind_order/edit/1`
);
// 查看核销合同
export const getContractVerifyPulldown = axiosRequestHandler(
  `${baseUrl}/api/contract/get_use_cancel/hx`
);
// 核销合同 总部
export const getContractVerifyP2 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_add/hx/2`
);
// 核销合同 分公司
export const getContractVerifyP1 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_add/hx/1`
);
// 重新核销 总部
export const getContractReVerifyP2 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_add/cxhx/2`
);
// 重新核销 分公司
export const getContractReVerifyP1 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_add/cxhx/1`
);
// ==================合同审核==================
// 审核列表-总部
export const getContractAuditList2 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_list/2/2`
);
// 审核列表-分公司
export const getContractAuditList1 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_list/1/2`
);
// 审核列表-总部-详情
export const getAuditDetail2 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_detail/2/2/1`
);
// 审核列表-分公司-详情
export const getAuditDetail1 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_detail/1/2/1`
);
// 审核列表-总部-详情审核
export const getAuditDetails2 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_detail/2/2/2`
);
// 审核列表-分公司-详情审核
export const getAuditDetails1 = axiosRequestHandler(
  `${baseUrl}/api/contract/apply_detail/1/2/2`
);
// 获取合同编号列表 总部
export const getContractNumberListSh2 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_contract_no_list/sh/2`
);
// 获取合同编号列表 分公司
export const getContractNumberListSh1 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_contract_no_list/sh/1`
);
// 查看核销合同
export const getContractVerifyAudit = axiosRequestHandler(
  `${baseUrl}/api/contract/get_use_cancel/sh`
);

//合同领取 合同领取详情 审核(1分公司，2总部)
export const setCancelApply1 = axiosRequestHandler(
  `${baseUrl}/api/contract/cancel_apply/1`
);
export const setCancelApply2 = axiosRequestHandler(
  `${baseUrl}/api/contract/cancel_apply/2`
);
//合同领取 合同领取详情 审核合同创建(1分公司，2总部)
export const setcreateContract1 = axiosRequestHandler(
  `${baseUrl}/api/contract/create_contract/1`
);
export const setcreateContract2 = axiosRequestHandler(
  `${baseUrl}/api/contract/create_contract/2`
);
//合同领取 合同领取详情 审核合同分发列表(1分公司，2总部)
export const fenfaContractList1 = axiosRequestHandler(
  `${baseUrl}/api/contract/fenfa_contract_list/1`
);
export const fenfaContractList2 = axiosRequestHandler(
  `${baseUrl}/api/contract/fenfa_contract_list/2`
);
//合同领取 合同领取详情 审核合同分发搜索(1分公司，2总部)
export const searchFenfaContractList1 = axiosRequestHandler(
  `${baseUrl}/api/contract/search_fenfa_contract_list/1`
);
export const searchFenfaContractList2 = axiosRequestHandler(
  `${baseUrl}/api/contract/search_fenfa_contract_list/2`
);
//合同领取 合同领取详情 审核合同分发搜索保存(1分公司，2总部)
export const searchFenfaContract1 = axiosRequestHandler(
  `${baseUrl}/api/contract/fenfa_contract/1`
);
export const searchFenfaContract2 = axiosRequestHandler(
  `${baseUrl}/api/contract/fenfa_contract/2`
);
//合同领取 合同领取详情 添加操作(第一个参数：1分公司，2总部；第二个参数：1领取，2审核)
export const addContractSend11 = axiosRequestHandler(
  `${baseUrl}/api/contract/add_contract_send/1/1`
);
export const addContractSend21 = axiosRequestHandler(
  `${baseUrl}/api/contract/add_contract_send/2/1`
);
export const addContractSend12 = axiosRequestHandler(
  `${baseUrl}/api/contract/add_contract_send/1/2`
);
export const addContractSend22 = axiosRequestHandler(
  `${baseUrl}/api/contract/add_contract_send/2/2`
);
//合同领取 合同领取详情 编辑操作(第一个参数：1分公司，2总部；第二个参数：1领取，2审核)
export const eidtContractSend11 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_send/1/1`
);
export const eidtContractSend21 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_send/2/1`
);
export const eidtContractSend12 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_send/1/2`
);
export const eidtContractSend22 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_send/2/2`
);
//合同领取 合同领取详情 删除操作(第一个参数：1分公司，2总部；第二个参数：1领取，2审核)
export const delContractSend11 = axiosRequestHandler(
  `${baseUrl}/api/contract/del_contract_send/1/1`
);
export const delContractSend21 = axiosRequestHandler(
  `${baseUrl}/api/contract/del_contract_send/2/1`
);
export const delContractSend12 = axiosRequestHandler(
  `${baseUrl}/api/contract/del_contract_send/1/2`
);
export const delContractSend22 = axiosRequestHandler(
  `${baseUrl}/api/contract/del_contract_send/2/2`
);
//合同领取 合同领取详情 修改收件信息(第一个参数：1分公司，2总部；第二个参数：1领取，2审核)
export const editApplyAddress11 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_apply_address/1/1`
);
export const editApplyAddress21 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_apply_address/2/1`
);
export const editApplyAddress12 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_apply_address/1/2`
);
export const editApplyAddress22 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_apply_address/2/2`
);
//合同领取 合同领取详情 分发添加修改收件信息(第一个参数：1分公司，2总部；第二个参数：1领取，2审核)
export const editFenfaAddress11 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_fenfa_address/1/1`
);
export const editFenfaAddress21 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_fenfa_address/2/1`
);
export const editFenfaAddress12 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_fenfa_address/1/2`
);
export const editFenfaAddress22 = axiosRequestHandler(
  `${baseUrl}/api/contract/edit_contract_fenfa_address/2/2`
);
//合同领取 查看核销记录(第一个参数：1分公司，2总部，lq领取，sh审核)
export const getUseCancellq1 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_use_cancel/jl/lq/1`
);
export const getUseCancellq2 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_use_cancel/jl/lq/2`
);
export const getUseCancelsh1 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_use_cancel/jl/sh/1`
);
export const getUseCancelsh2 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_use_cancel/jl/sh/2`
);
//合同审核 查看合同->审核核销记录(1分公司，2总部;sh审核，cx查询)
export const useCancelReviewsh1 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_review/sh/1`
);
export const useCancelReviewsh2 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_review/sh/2`
);
export const useCancelReviewcx1 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_review/cx/1`
);
export const useCancelReviewcx2 = axiosRequestHandler(
  `${baseUrl}/api/contract/use_cancel_review/cx/2`
);
// 合同管理快递管理
export const expressIndex = axiosRequestHandler(`${baseUrl}/api/express/index`);
// 合同管理获取单条快递信息
export const expressForm = axiosRequestHandler(`${baseUrl}/api/express/form`);
// 合同管理快递添加、修改
export const expressEdit = axiosRequestHandler(`${baseUrl}/api/express/edit`);
// 合同管理快递删除
export const expressDel = axiosRequestHandler(`${baseUrl}/api/express/del`);
// 合同查询总公司
export const getContractNumberList2 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_contract_no_list/cx/2`
);
//合同查询分公司
export const getContractNumberList1 = axiosRequestHandler(
  `${baseUrl}/api/contract/get_contract_no_list/cx/1`
);
// 获取区域列表
export const getArea = axiosRequestHandler(`${baseUrl}/api/tool/get_area`);
// 获取国际城市
export const getAbroad = axiosRequestHandler(`${baseUrl}/api/tool/get_abroad`);
// 模糊搜索国际城市
export const searchAbroad = axiosRequestHandler(
  `${baseUrl}/api/tool/search_abroad`
);

// 销售中心-销售下单 关联的相关接口，逻辑与没有sale_前缀后的地址一致
export const getSaleGroupList = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_index`
);
export const getSaleOrderForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_add_order`
);
export const setSaleOrderForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_todo_add_order`
);
export const getSaleOrderZhikeForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_add_zhike_order`
);
export const setSaleOrderZhikeForm = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_todo_add_zhike_order`
);
export const getSaleTouristLists = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_tourist_lists`
);
export const getSaleGroupBillDetail = axiosRequestHandler(
  `${baseUrl}/api/finance/sale_bill_detail`
);
export const getSaleGroupOperating = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_op_log`
);
export const saleTuanOrderLists = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_tuan_order_lists`
); // 由于与sale_order_lists接口冲突，所以这个接口的前缀是sale_tuan_
export const getSaleConfirmPiece = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_confirm_piece`
);
export const getSaleContractDetail = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_contract_detail`
);
//行程查询
export const getSaleTripGroupList = axiosRequestHandler(
  `${baseUrl}/api/product/sale_product_list`
);
//行程预订列表
export const getTripReserveList = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_book_tuan_list`
);
// 销售中心-销售下单使用 结束
// 确认件pdf
export const costConfirmTemplate = axiosRequestHandler(
  `${baseUrl}/api/tuan/cost_confirm_template`
);
// export const saveCostConfirmPdf = axiosRequestHandler(`${baseUrl}/api/tuan/save_cost_confirm_pdf`);
// 弃用了，原本pdf文件在前端生成的方法
export const saveCostConfirmPdf = params => {
  return axios.post(`${baseUrl}/api/tuan/save_cost_confirm_pdf`, params, {
    responseType: "arraybuffer"
  });
};
export const orderConfirmTemplate = axiosRequestHandler(
  `${baseUrl}/api/tuan/order_confirm_template`
);
export const incomeConfirmTemplate = axiosRequestHandler(
  `${baseUrl}/api/tuan/income_confirm_template`
);
export const saleOrderConfirmTemplate = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_order_confirm_template`
);
export const financeOrderConfirmTemplate = axiosRequestHandler(
  `${baseUrl}/api/tuan/finance_order_confirm_template`
);
// 财务操作-资金结算-收款记录-查看收款详情
export const financialSettleGetGatheringInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/financial_settle_get_gathering_info`
);
// 计调操作-查看团队订单-团队订单详情
export const saleGetGatheringInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_get_gathering_info`
);
// 计调操作-查看收入详情-查看收款详情
export const comeinGetGatheringInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/comein_get_gathering_info`
);
// 财务操作-收款审核-查看收款详情
export const financialGetGatheringInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/financial_get_gathering_info`
);
// 销售中心-收款认款：直客收款-查看收款详情
export const zhikeGetGatheringInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/zhike_get_gathering_info`
);
// 销售中心-收款认款：同行收款-查看收款详情
export const tonghangGetGatheringInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/tonghang_get_gathering_info`
);
// 财务操作-查看收入详情-认款列表
export const paymentDetailList = axiosRequestHandler(
  `${baseUrl}/api/tuan/payment_detail_list`
);
// 财务操作-查看收入详情
export const finIncomeInfo = axiosRequestHandler(
  `${baseUrl}/api/finance/fin_income_info`
);
// 销售中心-销售下单-查看收入详情
export const saleIncomeInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_income_info`
);
// 计调操作-团队控制-所有订单-查看收入详情
export const opIncomeInfo = axiosRequestHandler(
  `${baseUrl}/api/tuan/op_income_info`
);
// tdm完善行程
export const travelDetail = axiosRequestHandler(
  `${baseUrl}/api/product/travel_detail`
);
// tdm完善行程-添加
export const addTravel = axiosRequestHandler(
  `${baseUrl}/api/product/add_travel`
);
// tdm完善行程-编辑
export const editTravel = axiosRequestHandler(
  `${baseUrl}/api/product/edit_travel`
);
// 获取特殊人群选择地域限制的市
export const ykSpecialCity = axiosRequestHandler(
  `${baseUrl}/api/product/yk_special_city`
);
// 获取特殊人群选择地域限制的省
export const ykSpecialProvince = axiosRequestHandler(
  `${baseUrl}/api/product/yk_special_province`
);
// 获取成团地点
export const ykTuanCitys = axiosRequestHandler(
  `${baseUrl}/api/product/yk_tuan_citys`
);
// 获取预定城市
export const ykReserveCitys = axiosRequestHandler(
  `${baseUrl}/api/product/yk_reserve_citys`
);
// 获取节日
export const ykFestival = axiosRequestHandler(
  `${baseUrl}/api/product/yk_festival`
);
// 获取盈科产品主题
export const ykProductSubject = axiosRequestHandler(
  `${baseUrl}/api/product/yk_product_subject`
);
// 获取产品经理
export const ykProductManagerIds = axiosRequestHandler(
  `${baseUrl}/api/product/yk_product_manager_ids`
);
// 获取指定代理商
export const ykSpecifyAgent = axiosRequestHandler(
  `${baseUrl}/api/product/yk_specify_agent`
);
// 渠道操作-申请结算列表
export const channelSettlementApplyList = axiosRequestHandler(
  `${baseUrl}/api/finance/channel_settlement_apply_list`
);
// 渠道操作-结算单列表
export const channelSettlementList = axiosRequestHandler(
  `${baseUrl}/api/finance/channel_settlement_list`
);
// 渠道操作-结算单详情
export const channelSettlementDetail = axiosRequestHandler(
  `${baseUrl}/api/finance/channel_settlement_detail`
);
// 渠道操作-余额
export const getUserAccBal = axiosRequestHandler(
  `${baseUrl}/api/finance/get_user_acc_bal`
);
// 渠道操作-收入记录
export const getAccIncome = axiosRequestHandler(
  `${baseUrl}/api/finance/get_acc_income`
);
// 渠道操作-支出记录
export const getAccExpenditure = axiosRequestHandler(
  `${baseUrl}/api/finance/get_acc_expenditure`
);
// 渠道操作-交易
export const getAccTradeRecord = axiosRequestHandler(
  `${baseUrl}/api/finance/get_acc_trade_record`
);
// 团队订单-查看纸质合同
export const getOrderContractList = axiosRequestHandler(
  `${baseUrl}/api/tuan/get_order_contract_list`
);
// 团队订单-删除合同
export const delOrderContract = axiosRequestHandler(
  `${baseUrl}/api/tuan/del_order_contract`
);

// 计调-签证材料详情
export const orderVisaVerify = axiosRequestHandler(
  `${baseUrl}/api/tuan/order_visa_verify`
);
// 销售-签证材料详情
export const saleOrderVisaVerify = axiosRequestHandler(
  `${baseUrl}/api/tuan/sale_order_visa_verify`
);
// 财务-签证材料详情
export const financeOrderVisaVerify = axiosRequestHandler(
  `${baseUrl}/api/tuan/finance_order_visa_verify`
);
//订单审核签证材料-送签／退回补签
export const orderVisaVerifySend = axiosRequestHandler(
  `${baseUrl}/api/tuan/order_visa_verify_send`
);
//订单审核签证材料-出签
export const orderVisaSignOut = axiosRequestHandler(
  `${baseUrl}/api/tuan/order_visa_sign_out`
);
//订单审核签证材料-出签的快递信息
export const orderVisaExpress = axiosRequestHandler(
  `${baseUrl}/api/tuan/order_visa_express`
);
//订单审核签证材料-拒签
export const orderVisaDenySign = axiosRequestHandler(
  `${baseUrl}/api/tuan/order_visa_deny_sign`
);

// 生成结算单
export const channelSettlementApply = axiosRequestHandler(
  `${baseUrl}/api/finance/channel_settlement_apply`
);
// 生成旅行助手二维码
export const createOrderQrcode = axiosRequestHandler(
  `${baseUrl}/api/tuan/create_order_qrcode`
); // 获取要开票的信息
// 财务操作-同行账户信息列表   https://testerp.yktour.com.cn/docs/bom/755
export const peerAccount = commonRequestHandler("/api/peeraccount");
// 财务操作-添加同行账户信息
export const peerAccountAdd = commonRequestHandler("/api/peeraccount/add");
// 财务操作-提交同行账户信息
export const peerAccountTodoAdd = commonRequestHandler(
  "/api/peeraccount/todo_add"
);
// 财务操作-搜索同行组织
export const peerAccountSearchOrg = commonRequestHandler(
  "/api/peeraccount/search_org"
);

// 单项操作-搜索供应商
export const searchCoopSuppliers = commonRequestHandler(
  "/api/orgination/search_coop_suppliers"
);

export const getPhotoalbumSubList = commonRequestHandler(
  "/api/selfsupport.selfsupportphoto/get_photoalbum_sub_list"
);
export const getPhotoalbumcate = commonRequestHandler(
  "/api/selfsupport.selfsupportphoto/get_photoalbumcate"
);

// 保险-非自营订单
export const getInsuranceOrderList = commonRequestHandler(
  "/api/insurance/getInsuranceOrderList"
);
export const getInsuranceOrderListNew = newCommonRequestHandler(
  "/v1/insurance/insurance/sell-order-list"
);
// export const getInsuranceOrderList = commonRequestHandler('https://www.easy-mock.com/mock/59892f33a1d30433d858cfe9/vue-cli/zhihu/news', false)
// 保险订单详情
export const getInsuranceOrderInfo = commonRequestHandler(
  "/api/insurance/getInsuranceOrderInfo"
);
export const getInsuranceOrderInfoNew = newCommonRequestHandler(
  "/v1/insurance/insurance/order-info"
);
//保险-下载保单
export const getInsuranceOrderContract = commonRequestHandler(
  "/api/insurance/downInsuranceOrderContract"
);
//保险-退款接口
export const returnInsuranceOrder = commonRequestHandler(
  "/api/insurance/returnInsuranceOrder"
);
export const returnInsuranceOrderNew = newCommonRequestHandler(
  "/v1/insurance/insurance/refund-order"
);
//保险-在线支付
export const payInsuranceOrder = commonRequestHandler(
  "/api/insurance/payInsuranceOrder"
);
export const payInsuranceOrderNew = newCommonRequestHandler("/v1/payment/pay");
//保险-取消订单
export const setInsuranceOrderStatus = commonRequestHandler(
  "/api/insurance/setInsuranceOrderStatus"
);
export const setInsuranceOrderStatusNew = newCommonRequestHandler(
  "/v1/insurance/insurance/cancel-order"
);
//保险-全部订单列表
export const getAllInsuranceOrderList = commonRequestHandler(
  "/api/insurance/getAllInsuranceOrderList"
);
export const getAllInsuranceOrderListNew = newCommonRequestHandler(
  "/v1/insurance/insurance/self-order-list"
);

export const createOrder = commonRequestHandler("/api/Insurance/createOrder");
export const createOrderNew = newCommonRequestHandler(
  "/v1/insurance/insurance/create-order"
);

// export const countPrice = commonRequestHandler('/api/Insurance/countPrice')
export const countPriceNew = newCommonRequestHandler(
  "/v1/insurance/insurance/count-price"
);
// 列表继续支付接口
export const insuranceOrderPay = newCommonRequestHandler(
  "/v1/insurance/insurance/order-pay"
);
export const countPrice = commonRequestHandler("/api/Insurance/countPrice");
