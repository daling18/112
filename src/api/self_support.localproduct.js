import {commonRequestHandler} from './api';
import {newCommonRequestHandler} from './api_new';

// 农特优列表  https://testerp.yktour.com.cn/docs/bom/bom-1anud6mac5o8r
export const productLists = commonRequestHandler('/api/selfsupport.localproduct/lists');
// 农特优新增/编辑表单  https://testerp.yktour.com.cn/docs/bom/bom-1anufo33frn5r
export const productCreate = commonRequestHandler('/api/selfsupport.localproduct/create');
// 农特优提交新增/编辑表单  https://testerp.yktour.com.cn/docs/bom/bom-1ao0onrk1v355
export const productSubmitCreate = commonRequestHandler('/api/selfsupport.localproduct/submit_create');
// 农特优详情  https://testerp.yktour.com.cn/docs/bom/bom-1ao0p8nlqbsk9
export const productDetail = commonRequestHandler('/api/selfsupport.localproduct/detail');
// 农特优启用/禁用  https://testerp.yktour.com.cn/docs/bom/bom-1ao0pl1knhna8
export const productChangeStatus = commonRequestHandler('/api/selfsupport.localproduct/change_status');
// 农特优上架  https://testerp.yktour.com.cn/docs/bom/bom-1ao0pobto1gls
export const productPutOn = commonRequestHandler('/api/selfsupport.localproduct/put_on');
// 农特优下架  https://testerp.yktour.com.cn/docs/bom/bom-1ao0ppd0kofen
export const productPutOff = commonRequestHandler('/api/selfsupport.localproduct/put_off');
// 农特优撤回  https://testerp.yktour.com.cn/docs/bom/bom-1ao0pqf0ohhoj
export const productRecall = commonRequestHandler('/api/selfsupport.localproduct/recall');
// 农特优货号查询
export const getArtNo = commonRequestHandler('/api/selfsupport.localproduct/get_art_no');
// 农特优-预订列表  https://testerp.yktour.com.cn/docs/bom/bom-1aopbr9gdl38c
export const saleLists = commonRequestHandler('/api/selfsupport.localproduct/sale_lists');
// 农特优-预订  https://testerp.yktour.com.cn/docs/bom/bom-1aopc41iaa816
export const productCreateOrder = commonRequestHandler('/api/selfsupport.localproductorder/create_order');
// 农特优-提交订单  https://testerp.yktour.com.cn/docs/bom/bom-1aopc41iaa816
export const productSubmitCreateOrder = commonRequestHandler('/api/selfsupport.localproductorder/submit_create_order');
// 农特优-确认订单  https://testerp.yktour.com.cn/docs/bom/bom-1aoq2aan1ngqj
export const productConfirm = commonRequestHandler('/api/selfsupport.localproductorder/confirm');
// 农特优-取消订单 https://testerp.yktour.com.cn/docs/bom/bom-1aoq2cno5pv8p
export const productCancel = commonRequestHandler('/api/selfsupport.localproductorder/cancel');
// 农特优-申请退款  https://testerp.yktour.com.cn/docs/bom/bom-1aoq2ducnkvae
export const productRefund = commonRequestHandler('/api/selfsupport.localproductorder/refund');
// 农特优-退款详情  https://testerp.yktour.com.cn/docs/bom/bom-1aoq2evmi39fh
export const productRefundDetail = commonRequestHandler('/api/selfsupport.localproductorder/refund_detail');
// 农特优-订单详情  https://testerp.yktour.com.cn/docs/bom/bom-1apht0atslodh
export const productOrderDetail = commonRequestHandler('/api/selfsupport.localproductorder/detail');
// 农特优-确认收货  https://testerp.yktour.com.cn/docs/bom/bom-1api2k8juavfa
export const productReceiptConfirm = commonRequestHandler('/api/selfsupport.localproductorder/receipt_confirm');
// 农特优-确认发货  https://testerp.yktour.com.cn/docs/bom/bom-1api2ltjp76ds
export const productShippedConfirm = commonRequestHandler('/api/selfsupport.localproductorder/shipped_confirm');
// 农特优-定损  https://testerp.yktour.com.cn/docs/bom/bom-1aps9o2baftlh
export const productLoss = commonRequestHandler('/api/selfsupport.localproductorder/loss');
// 农特优-订单列表  https://testerp.yktour.com.cn/docs/bom/bom-1api2ltjp76ds
export const mySaleOrderLists = commonRequestHandler('/api/selfsupport.localproductorder/my_sale_lists');
export const saleOrderLists = commonRequestHandler('/api/selfsupport.localproductorder/sale_lists');
export const orderLists = commonRequestHandler('/api/selfsupport.localproductorder/lists');
export const mySaleOrderDetail = commonRequestHandler('/api/selfsupport.localproductorder/my_sale_detail');
export const saleOrderDetail = commonRequestHandler('/api/selfsupport.localproductorder/sale_detail');
export const opDetail = commonRequestHandler('/api/selfsupport.localproductorder/op_detail');
export const selfLists = commonRequestHandler('/api/selfsupport.localproductorder/self_lists');

// 农特优-订单退货列表
export const retundGoodsList = commonRequestHandler('/api/selfsupport.localproductorder/refund_goods_list');
// 农特优-订单退货详情
export const retundGoodsDetail = commonRequestHandler('/api/selfsupport.localproductorder/refund_goods_detail');
// 农特优-申请退货/退款
export const retundGoods = commonRequestHandler('/api/selfsupport.localproductorder/refund_or_goods');
// 农特优-确认退货
export const confirmRetrund = commonRequestHandler('/api/selfsupport.localproductorder/refund_goods_agree');
// 农特优-完成退货
export const finishRetrund = commonRequestHandler('/api/selfsupport.localproductorder/refund_goods_finish'); 




// 测试接口
// export const retundGoodsList = newCommonRequestHandler('/api/selfsupport.localproductorder/refund_goods_list');



