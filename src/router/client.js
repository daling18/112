// 采购订单
import Home from 'src/layouts/';
import { getOrderDetailRouter, getReceiveDetailRouter } from './compose-router';

const CLIENT_ROUTE = {
  path: '/client',
  component: Home,
  name: 'client',
  meta: {
    label: '客户管理'
  },
  children: [
    {
      path: 'list',
      component (reslove) {
        require(['src/pages/client/ClientList.vue'], reslove);
      },
      name: 'ClientList',
      meta: {
        topMenuConst: 'client',
        label: '客户列表',
        isPurchase: 1,
        menu: 'ClientList',
        permission: 'client/list'
      }
    }
  ]
};
export default CLIENT_ROUTE;