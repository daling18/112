import {commonRequestHandler} from './api';
// 酒店品牌列表
export const getbrandList = commonRequestHandler('/api/selfsupport.hotel/brandList');
export const setbrandEdit = commonRequestHandler('/api/selfsupport.hotel/brandEdit');
export const getbrandDetail = commonRequestHandler('/api/selfsupport.hotel/brandDetail');
export const setbrandDelete = commonRequestHandler('/api/selfsupport.hotel/brandDelete');

// 产品标签
export const getProductTagList = commonRequestHandler('/api/selfsupport.tag/index');
export const setProductTagEdit = commonRequestHandler('/api/selfsupport.tag/edit');
export const setProductTagDelete = commonRequestHandler('/api/selfsupport.tag/delete');

// 自营单项-景区管理列表
export const getSelfSupportScenicList = commonRequestHandler('/api/selfsupport.scenic/index');
export const getYkTicketDetail = commonRequestHandler('/api/selfsupport.ticket/detail');
export const setChangeScenicStatus = commonRequestHandler('/api/selfsupport.scenic/changeStatus');
export const setChangeTicketStatus = commonRequestHandler('/api/selfsupport.ticket/changeStatus');
export const setChangeQuoteStatus = commonRequestHandler('/api/selfsupport/ticket/changeQuoteTypeStatus');
export const setChangeQuoteSaleStatus = commonRequestHandler('/api/selfsupport/ticket/changeSaleStatus');
// 自营单项-新增编辑门票
export const setSubmitTicketForm = commonRequestHandler('/api/selfsupport.ticket/store');
export const getSelfScenicDetail = commonRequestHandler('/api/selfsupport.scenic/detail');
export const setSubmitScenicForm = commonRequestHandler('/api/selfsupport.scenic/store');
export const getSearchScenicList = commonRequestHandler('/api/selfsupport.scenic/searchScenic');
export const getThirdPartTicketQuote = commonRequestHandler('/api/selfsupport/ticket/getThirdPartQuote');
export const setSubmitThirdPartQuote = commonRequestHandler('/api/selfsupport/ticket/doThirdPartQuote');
export const setSelfSupportTicketQuote = commonRequestHandler('/api/selfsupport/ticket/doQuote');
export const getSelfSupportTicketQuoteDetail = commonRequestHandler('/api/selfsupport/ticket/quoteDetail');




// 基础信息 - 商品分类列表接口 https://testerp.yktour.com.cn/docs/bom/bom-1andjdurh431t
export const Goodscatelists = commonRequestHandler('/api/selfsupport.goodscate/lists');
// 基础信息 - 商品分类新增/编辑表单接口 https://testerp.yktour.com.cn/docs/bom/bom-1andk18hj662u
export const Goodscatecreate = commonRequestHandler('/api/selfsupport.goodscate/create');
// 基础信息 - 商品分类提交新增/编辑表单接口 https://testerp.yktour.com.cn/docs/bom/bom-1andk76qj7mgg
export const GoodscatesubmitCreate = commonRequestHandler('/api/selfsupport.goodscate/submit_create');
// 基础信息 - 商品分类启用/禁用接口 https://testerp.yktour.com.cn/docs/bom/bom-1andke3k07k3i
export const GoodscatechangeStatus = commonRequestHandler('/api/selfsupport.goodscate/change_status');
// 基础信息 - 商品分类删除接口 https://testerp.yktour.com.cn/docs/bom/bom-1andkgt1uob4r
export const Goodscatedel = commonRequestHandler('/api/selfsupport.goodscate/del');
