const prefix = 'v2/';
export default [
  // 结算中心-退款处理-v2
  {
    path: 'refund/list',
    name: 'setlement/v2/refund/list',
    component: function(resolve) {
      require(['src/views/settlementCenter/refund/list.vue'], resolve);
    },
    meta: {
      label: '线路退款处理',
      menu: 'SettlementRefundListV2',
      permission: 'settlement/v2/refund'
    }
  },
  {
    path: 'refund/detail',
    name: 'setlement/v2/refund/detail',
    component: function(resolve) {
      require(['src/components/lineOrderRefundDetail.vue'], resolve);
    },
    meta: {
      label: '退团/款单详情',
      menu: 'SettlementRefundRetailV2',
      permission: 'settlement/v2/refund/detail'
    }
  }
].map(item => {
  return {
    ...item,
    path: prefix + item.path,
    name: prefix + item.name
  };
});
