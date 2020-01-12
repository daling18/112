import {axiosRequestHandler} from './api';

let wxUrl = 'https://wxapp.yktour.com.cn';
// let wxUrl = 'https://testerp.yktour.com.cn/wxapi';
export const commonRequestHandler = (path) => axiosRequestHandler(wxUrl + path);

// 获取帐号基本信息(刷新用
export const getAccountBasicInfoForRefresh = commonRequestHandler('/open/accountBasicInfoForRefresh');
// 获取小程序授权页面接口
// export const getAuthQrcode = commonRequestHandler('/open/authqrcode');
export const getAuthQrcode = commonRequestHandler('/open/authqrcodeForJump');
// 判断小程序是否绑定
export const isBindingApp = commonRequestHandler('/open/isBindingApp');
// 企业授权页面接口
export const getAuthWorlUrl = commonRequestHandler('/workInfo/authWorlURL');
// 获取企业信息
export const getWorkCorpInfo = commonRequestHandler('/workInfo/getWorkCorpInfo');

// 话术数据
// 指定员工所有话术数据查询 
export const getAllSpeechCraft = commonRequestHandler('/wx/card/allSpeechCraft');
// 话术数据增删改查
export const speechCraft = commonRequestHandler('/wx/card/speechCraft');

// 分销设置
export const distributionConfig = commonRequestHandler('/wx/card/distributionConfig');
// 商城名称
export const getStoreName = commonRequestHandler('/wx/card/storeName');
// 商城设置
export const setStoreConfig = commonRequestHandler('/wx/card/storeConfig');
// 名片列表
export const getDefaultCard = commonRequestHandler('/businesscard/query/defaultCard');
export const getCardInfoList = commonRequestHandler('/businesscard/query/cardInfoList');
// 工作交接人员列表
export const queryBomUserList = commonRequestHandler('/businesscard/query/queryBomUserList');
// 工作交接人员提交
export const setHandoveruser = commonRequestHandler('/wx/card/handover');
// 设置默认名片
export const setDefaultCard = commonRequestHandler('/businesscard/update/defaultCard');
// 盈科助手
export const updateIsAssistant = commonRequestHandler('/businesscard/updateIsAssistant');
// 店长权限
export const updateIsShopOwner = commonRequestHandler('/businesscard/updateIsShopowner');
// 获取小程序码
export const getSmallProgramCode = commonRequestHandler('/businesscard/getSmallProgramCode');
// 提现管理列表
export const queryWithdrawCashList = commonRequestHandler('/withdrawCash/queryWithdrawCashList');
// 提现状态修改
export const updateExtractStatus = commonRequestHandler('/withdrawCash/updateExtractStatus');
// 门店店长-数据汇总
export const dataSummarizing = commonRequestHandler('/manager-statistic/dataStatistics');
// 门店店长-销售排行
export const salesRanking = commonRequestHandler('/manager-statistic/salesRanking');