// 采购订单
import Home from 'src/layouts/';
import { getOrderDetailRouter, getReceiveDetailRouter } from './compose-router';

const SHOPORDER_ROUTE = {
  path: '/shoporder',
  component: Home,
  name: 'shoporder',
  meta: {
    label: '店铺订单'
  },
  children: [
    {
      path: 'line',
      component (reslove) {
        require(['src/components/LineOrderList.vue'], reslove);
      },
      name: 'ShopOrderLine',
      meta: {
        topMenuConst: 'shoporder',
        label: '线路订单',
        isPurchase: 1,
        menu: 'ShoporderLineorder',
        permission: 'shoporder/lineorder'
      }
    },
    ... getOrderDetailRouter(
      'line/',
      'ShopOrderLine',
      'shoporder/lineorder',
      'shoporder',
      'ShoporderLineorder',
      '线路订单',
      '/shoporder/line'
    ),
    {
      path: 'hotel',
      component (reslove) {
        require(['src/components/HotelOrderList.vue'], reslove);
      },
      name: 'ShoporderHotelorder',
      meta: {
        topMenuConst: 'shoporder',
        label: '酒店订单',
        isPurchase: 1,
        menu: 'ShoporderHotelorder',
        permission: 'shoporder/hotelorder'
      }
    },
    {
      path: 'hotel/detail',
      component(reslove){
        require(['src/components/HotelOrderDetail.vue'],reslove);
      },
      name: 'ShoporderHotelorderDetail',
      meta:{
        label: '酒店订单详情',
        parent_label: '酒店订单',
        parent_path: '/shoporder/hotel',
        menu: 'ShoporderHotelorder',
        permission: 'shoporder/hotel/orderdet'
      }
    },
    ...getReceiveDetailRouter(
      'hotel/', 
      'ShoporderHotelorder', 
      'shoporder/hotel/', 
      'shoporder', 
      'ShoporderHotelorder', 
      '酒店订单', 
      '/shoporder/hotel'
    ),
    {
      path: 'hotel/refund-detail',
      component(reslove){
        require(['src/components/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'HotelSaleOrderRefundDetail',
      meta:{
        label: '酒店订单退款详情',
        parent_label: '酒店订单',
        parent_path: '/shoporder/hotel',
        menu: 'ShoporderHotelorder',
        permission: 'shoporder/hotel/refunddet'
      }
    },
  ]
};
export default SHOPORDER_ROUTE;