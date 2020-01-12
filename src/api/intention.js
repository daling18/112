import {commonRequestHandler} from './api';

// 计调操作 - 定制需求列表 https://testerp.yktour.com.cn/docs/bom/bom-1aqnaqutaodce
export const getIntentList = commonRequestHandler('/api/Intention/get_intent_list');

// 计调操作 - 定制需求详情 https://testerp.yktour.com.cn/docs/bom/bom-1aqnaskae7988
export const addIntention = commonRequestHandler('/api/Intention/add_intention');

// 计调操作 - 意向指派 https://testerp.yktour.com.cn/docs/bom/bom-1aqnf108n32gk
export const transferIntent = commonRequestHandler('/api/Intention/transfer_intent');
