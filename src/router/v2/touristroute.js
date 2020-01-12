const prefix = 'v2/';
export default [
  // 旅游线路-线路订单-v2
  {
    path: 'lineOrder',
    name: 'touristroute/lineOrder',
    component: function(resolve) {
      require(['src/views/touristroute/lineOrder/index.vue'], resolve);
    },
    meta: {
      label: '线路订单',
      menu: 'TouristrouteLineorderV2',
      permission: 'touristroute/v2/lineOrder'
    },
    children: [
      {
        path: 'list',
        name: 'touristroute/v2/lineOrder/list',
        component: function(resolve) {
          require([
            'src/views/touristroute/lineOrder/lineOrderList.vue'
          ], resolve);
        },
        meta: {
          label: '线路订单列表',
          menu: 'TouristrouteLineorderListV2',
          permission: 'touristroute/v2/lineOrder/list'
        }
      },
      {
        path: 'detail',
        name: 'touristroute/v2/lineOrder/detail',
        redirect: { name: 'detail/order' },
        component: function(resolve) {
          require(['src/views/touristroute/lineOrder/detailView.vue'], resolve);
        },
        children: [
          {
            path: 'order',
            name: 'touristroute/v2/lineOrder/detail/order',
            component: function(resolve) {
              require([
                'src/views/touristroute/lineOrder/lineOrderDetail.vue'
              ], resolve);
            },
            meta: {
              label: '订单详情',
              menu: 'TouristrouteLineorderOrderDetailV2',
              permission: 'touristroute/v2/lineOrder/detail/order'
            }
          },
          {
            path: 'refund',
            name: 'touristroute/v2/lineOrder/detail/refund',
            component: function(resolve) {
              require([
                'src/views/touristroute/lineOrder/lineOrderRefundDetail.vue'
              ], resolve);
            },
            meta: {
              label: '退款详情',
              menu: 'TouristrouteLineorderRefundDetailV2',
              permission: 'touristroute/v2/lineOrder/detail/refund'
            }
          }
        ]
      }
    ]
  }
].map(item => {
  return {
    ...item,
    path: prefix + item.path,
    name: prefix + item.name
  };
});
