import Login from 'src/components/Login.vue';
import NotFound from 'src/components/404.vue';
import Home from 'src/layouts/';
import TOURISTROUTE_ROUTE from 'src/router/touristroute';
import STATREPO_ROUTE from 'src/router/statrepo';
import SETTLEMENT_ROUTE from 'src/router/settlement';
import TUANCONTRO_ROUTE from 'src/router/tuancontro';
import SINGLEPRO_ROUTE from 'src/router/singlepro';
import SALECENTER_ROUTE from 'src/router/salecenter';
import COUPON_ROUTE from 'src/router/coupon';
import SALEORDER_ROUTE from 'src/router/saleorder';
import BASEDATA_ROUTE from 'src/router/basedata'
import TRAVELDATA_ROUTE from 'src/router/traveldata'
import PURCHASEORDER_ROUTE from 'src/router/purchaseorder'
import SYSMANA_ROUTE from 'src/router/sysmana'
import USERCENTER_ROUTE from 'src/router/usercenter'
import WECHARTAPP_ROUTES from 'src/router/wechatapp';
import CUSTOMER_SERVICE from 'src/router/coutomerservice';
import HOTEL from 'src/router/hotel';
import Fenrun from 'src/router/fenrun';
import SHOPORDER_ROUTE from 'src/router/shoporder';
import CLIENT_ROUTE from 'src/router/client';
import MEMBER_ROUTE from 'src/router/member';

import V2 from 'src/router/v2';

let routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      label: '首页'
    },
    redirect: { name: 'welcome' },
    children: [
      {
        path: 'welcome',
        component: function (resolve) {
          require(['src/components/Welcome.vue'], resolve);
        },
        name: 'welcome',
        meta: {
          label: '欢迎'
        }
      },
      {
        path: 'passwd',
        component: function (resolve) {
          require(['src/components/Passwd.vue'], resolve);
        },
        name: 'passwd',
        meta: {
          label: '修改密码'
        }
      }
    ]
  },
  TOURISTROUTE_ROUTE,
  STATREPO_ROUTE,
  SETTLEMENT_ROUTE,
  TUANCONTRO_ROUTE,
  SINGLEPRO_ROUTE,
  SALECENTER_ROUTE,
  COUPON_ROUTE,
  SALEORDER_ROUTE,
  BASEDATA_ROUTE,
  TRAVELDATA_ROUTE,
  PURCHASEORDER_ROUTE,
  SYSMANA_ROUTE,
  USERCENTER_ROUTE,
  WECHARTAPP_ROUTES,
  CUSTOMER_SERVICE,
  HOTEL,
  SHOPORDER_ROUTE,
  CLIENT_ROUTE,
  MEMBER_ROUTE,
  Fenrun,
  {
    path: '/login',
    component: Login,
    name: ''
  },
  {
    path: '/404',
    component: NotFound,
    name: ''
  },
  V2
];

export default routes;
