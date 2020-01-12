import {newCommonRequestHandler} from './api_new';


// C端会员管理-用户列表
export const getUserList = newCommonRequestHandler('/v1/distribution/user/list');
// C端会员管理-用户详情
export const getUserDetail = newCommonRequestHandler('/v1/distribution/user/detail');
// C端会员管理-证件详情
export const getCardDetail = newCommonRequestHandler('/v1/distribution/user/card-list');
// C端会员管理-邀请记录
export const getInviteList = newCommonRequestHandler('/v1/distribution/user/invite-list');
// C端会员管理-收益列表
export const getIncomeList = newCommonRequestHandler('/v1/distribution/user/get-income-list');
// C端会员管理-提现列表
export const getWithdrawList = newCommonRequestHandler('/v1/distribution/user/get-withdraw');




