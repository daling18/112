const prefix = 'v2/';
export default [
  // 销售订单-线路订单-v2
  {
    path: 'lineOrder',
    name: 'lineOrder',
    component: function (resolve) {
      require(['src/views/saleorder/lineOrder/index.vue'], resolve);
    },
    meta: {
      label: '线路订单',
      menu: 'saleorderLineorder',
      permission: 'saleorder/v2/lineorder'
    },
    children: [{
      path: 'list',
      name: 'list',
      component: function (resolve) {
        require(['src/views/saleorder/lineOrder/lineOrderList.vue'], resolve);
      },
      meta: {
        label: '线路订单列表',
        menu: 'saleorderLineorder',
        permission: 'saleorder/lineorder/list'
      },
    }, {
      path: 'detail',
      name: 'lineOrder/detail',
      redirect: {
        name: 'detail/order'
      },
      component: function (resolve) {
        require(['src/views/saleorder/lineOrder/detailView.vue'], resolve);
      },
      children: [{
        path: 'order',
        name: 'lineOrder/detail/order',
        component: function (resolve) {
          require(['src/views/saleorder/lineOrder/lineOrderDetail.vue'], resolve);
        },
        meta: {
          label: '订单详情',
          menu: 'saleorderLineorderOrderDetailV2',
          permission: 'saleorder/v2/lineOrder/detail/order'
        },
      }, {
        path: 'refund',
        name: 'lineOrder/detail/refund',
        component: function (resolve) {
          require(['src/views/saleorder/lineOrder/lineOrderRefundDetail.vue'], resolve);
        },
        meta: {
          label: '退款详情',
          menu: 'saleorderLineorderRefundDetailV2',
          permission: 'saleorder/v2/lineOrder/detail/refund'
        },
      }],
    }]
  },
].map(item => {
  return {
    ...item,
    path: prefix + item.path,
    name: prefix + item.name
  }
})
