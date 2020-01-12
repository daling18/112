// 销售中心
import Home from 'src/layouts/';
import { getOrderDetailRouter, getVisaDetailRouter, getReceiveDetailRouter, getLocalProductDetailRouter } from './compose-router';
const COUPON_ROUTE = {
  path: '/coupon',
  component: Home,
  name: 'coupon',
  meta: {
    label: '促销管理'
  },
  children: [
    {
      path: 'list',
      name: 'couponList',
      component: function (reslove) {
        require(['src/pages/coupon/list.vue'], reslove);
      },
      meta: {
        label: '优惠券管理',
        menu: 'couponList',
        permission: 'salecenter/tuan/compro',
      }
    },
    {
      path: 'recordList',
      component(reslove) {
        require(['src/pages/coupon/recordList.vue'], reslove);
      },
      name: 'recordList',
      meta: {
        label: '促销活动管理',
        menu: 'recordList',
        parent_label: '促销活动管理',
        parent_path: '/coupon/recordList',
        permission: 'salecenter/tuan/compro'
      }
    }
  ]
};
export default COUPON_ROUTE;