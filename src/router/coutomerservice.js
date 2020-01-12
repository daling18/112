// 客服订单
import Home from 'src/layouts/';
const CUSTOMER_SERVICE = {
  path: '/kfservice',
  component: Home,
  name: 'kefuservice',
  meta: {
    label: '客服系统'
  },
  children: [{
      path: "v2/order",
      component(reslove) {
        require(['src/views/coutomer/OrderList.vue'], reslove);
      },
      name: "kfserviceOrderListV2",
      meta: {
        topMenuConst: 'kefuservice',
        label: '订单列表',
        menu: 'KfserviceOrderV2',
        permission: 'kfserviceV2'
      }
    },
    {
      path: 'v2/detail',
      component(reslove) {
        require(['src/views/coutomer/detailView.vue'], reslove);
      },
      name: 'kfservice/v2/detail',
      meta: {
        topMenuConst: 'kefuservice',
        label: '订单列表',
        menu: 'KfserviceOrderV2',
        permission: 'kfserviceV2'
      },
      children: [{
          path: 'order',
          component(reslove) {
            require(['src/views/coutomer/OrderDetail.vue'], reslove);
          },
          name: 'kfserviceOrderList',
          meta: {
            topMenuConst: 'kefuservice',
            label: '订单详情',
            menu: 'kfserviceOrderDetailV2',
            permission: 'kfserviceV2'
          }
        },
        {
          path: "refund",
          component(reslove) {
            require(['src/views/coutomer/OrderRefundDetail.vue'], reslove);
          },
          name: "kfserviceOrderRefundV2",
          meta: {
            topMenuConst: 'kefuservice',
            label: '退款详情',
            menu: 'kfserviceOrderRefundV2',
            permission: 'kfserviceV2'
          }
        },
      ]
    },
    // 旧
    {
      path: 'order',
      component(reslove) {
        require(['src/components/coutomer/OrderList.vue'], reslove);
      },
      name: 'kfserviceOrderList',
      meta: {
        topMenuConst: 'kefuservice',
        label: '订单列表',
        menu: 'KfserviceOrder',
        permission: 'kfservice'
      }
    },
    {
      path: 'order/detail/:id',
      component(reslove) {
        require(['src/components/coutomer/OrderDetail.vue'], reslove);
      },
      name: 'kfserviceOrderDetail',
      meta: {
        topMenuConst: 'kefuservice',
        label: '订单详情',
        menu: 'KfserviceOrder',
        permission: 'kfservice'
      }
    },
    {
      path: 'order/refund',
      component(reslove) {
        require(['src/components/LineOrderRefund.vue'], reslove);
      },
      name: 'kfserviceOrderRefund',
      meta: {
        topMenuConst: 'kefuservice',
        label: '退款详情',
        menu: 'KfserviceOrder',
        permission: 'kfservice'
      }
    }
  ]

};
export default CUSTOMER_SERVICE;
