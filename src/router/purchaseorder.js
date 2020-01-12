// 采购订单
import Home from 'src/layouts/';
import { getOrderDetailRouter } from './compose-router';

const PURCHASEORDER_ROUTE = {
  path: '/purchaseorder',
  component: Home,
  name: 'purchaseorder',
  meta: {
    label: '采购订单'
  },
  children: [
    {
      path: 'line',
      component (reslove) {
        require(['src/components/LineOrderList.vue'], reslove);
      },
      name: 'PurchaseOrderLine',
      meta: {
        topMenuConst: 'purchaseorder',
        label: '线路订单',
        isPurchase: 1,
        menu: 'PurchaseorderLineorder',
        permission: 'purchaseorder/lineorder'
      }
    },
    ... getOrderDetailRouter(
      'line/',
      'PurchaseOrderLine',
      'purchaseorder/lineorder/',
      'purchaseorder',
      'PurchaseorderLineorder',
      '线路订单',
      '/purchaseorder/line'
    )
  ]
};
export default PURCHASEORDER_ROUTE;