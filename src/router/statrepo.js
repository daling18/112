// 统计报表
import Home from 'src/layouts/';
const STATREPO_ROUTE = {
  path: '/statrepo',
  component: Home,
  name: 'statRepo',
  meta: {
    label: '统计报表'
  },
  children: [{
    // 财务报表-入口
    path: 'fin/index',
    name: 'statrepoFinIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'StatrepoFinarepo',
      permission: 'statrepo/finarepo/offline, statrepo/finarepo/offlineorder, statrepo/finarepo/contregList, statrepo/finarepo/invoiceList, statrepo/finarepo/costList, statrepo/finarepo/cobankList, statrepo/finarepo/monthList',
      paths: '/statrepo/fin/offline/tuanList?id=0, /statrepo/fin/offline/orderList?id=0, /statrepo/fin/contregList?id=0, /statrepo/fin/invoiceList?id=0, /statrepo/fin/costList?id=0, /statrepo/fin/cobankList?id=0, /statrepo/fin/monthList?id=0'
    }
  }, {
    // 财务报表-线下业务汇总团维度
    path: 'fin/offline/tuanList',
    name: 'statrepoFinOfflineTuanList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinOfflineTuanList.vue'], resolve);
    },
    meta: {
      label: '线下业务汇总表团维度',
      menu: 'StatrepoFinarepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/finarepo/offline'
    }
  }, {
    // 财务报表-线下业务汇总订单维度
    path: 'fin/offline/orderList',
    name: 'statrepoFinOfflineOrderList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinOfflineOrderList.vue'], resolve);
    },
    meta: {
      label: '线下业务汇总表订单维度',
      menu: 'StatrepoFinarepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/finarepo/offlineorder'
    }
  }, {
    // 财务报表-合同登记台账
    path: 'fin/contregList',
    name: 'statrepoFinContregList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinContregList.vue'], resolve);
    },
    meta: {
      label: '合同登记台账',
      menu: 'StatrepoFinarepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/finarepo/contregList'
    }
  }, {
    // 财务报表-发票开具表
    path: 'fin/invoiceList',
    name: 'statrepoFinInvoiceList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinInvoiceList.vue'], resolve);
    },
    meta: {
      label: '发票开具表',
      menu: 'StatrepoFinarepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/finarepo/invoiceList'
    }
  }, {
    // 财务报表-成本回票表
    path: 'fin/costList',
    name: 'statrepoFinCostList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinCostList.vue'], resolve);
    },
    meta: {
      label: '成本回票表',
      menu: 'StatrepoFinarepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/finarepo/costList'
    }
  }, {
    // 财务报表-分公司银行日记账
    path: 'fin/cobankList',
    name: 'statrepoFinCobankList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinCobankList.vue'], resolve);
    },
    meta: {
      label: '分公司银行日记账',
      menu: 'StatrepoFinarepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/finarepo/cobankList'
    }
  }, {
    // 财务报表-周数据明细
    path: 'fin/monthList',
    name: 'statrepoFinMonthList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinMonthList.vue'], resolve);
    },
    meta: {
      label: '周数据明细',
      menu: 'StatrepoFinarepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/finarepo/monthList'
    }
  }, {
    // 分公司报表-列表
    path: 'comp/list',
    name: 'statrepoCompList',
    component: function (resolve) {
      require(['src/pages/statrepo/CompList.vue'], resolve);
    },
    meta: {
      label: '分公司报表',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo'
    }
  }, {
    // 分公司报表-线下业务汇总团维度
    path: 'comp/offline/tuanList',
    name: 'statrepoCompOfflineTuanList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinOfflineTuanList.vue'], resolve);
    },
    meta: {
      label: '线下业务汇总表团维度',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo/offline'
    }
  }, {
    // 分公司报表-线下业务汇总订单维度
    path: 'comp/offline/orderList',
    name: 'statrepoCompOfflineOrderList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinOfflineOrderList.vue'], resolve);
    },
    meta: {
      label: '线下业务汇总表团维度',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo/offlineorder'
    }
  }, {
    // 分公司报表-合同登记台账
    path: 'comp/contregList',
    name: 'statrepoCompContregList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinContregList.vue'], resolve);
    },
    meta: {
      label: '合同登记台账',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo/contregList'
    }
  }, {
    // 分公司报表-发票开具表
    path: 'comp/invoiceList',
    name: 'statrepoCompInvoiceList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinInvoiceList.vue'], resolve);
    },
    meta: {
      label: '发票开具表',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo/invoiceList'
    }
  }, {
    // 分公司报表-成本回票表
    path: 'comp/costList',
    name: 'statrepoCompCostList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinCostList.vue'], resolve);
    },
    meta: {
      label: '成本回票表',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo/costList'
    }
  }, {
    // 分公司报表-分公司银行日记账
    path: 'comp/cobankList',
    name: 'statrepoCompCobankList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinCobankList.vue'], resolve);
    },
    meta: {
      label: '分公司银行日记账',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo/cobankList'
    }
  }, {
    // 分公司报表-周数据明细
    path: 'comp/monthList',
    name: 'statrepoCompinMonthList',
    component: function (resolve) {
      require(['src/pages/statrepo/FinMonthList.vue'], resolve);
    },
    meta: {
      label: '周数据明细',
      menu: 'StatrepoComprepo',
      topMenuConst: 'statrepo',
      permission: 'statrepo/comprepo/monthList'
    }
  }, {
    // 总公司公司报表-订单流水
    path: 'order/list',
    name: 'statrepoOrderList',
    component: function (resolve) {
      require(['src/pages/statrepo/OrderList.vue'], resolve);
    },
    meta: {
      label: '订单流水表',
      menu: 'StatrepoOrderList',
      topMenuConst: 'statrepo',
      permission: 'statrepo/order/list'
    }
  }, {
    // 订单统计报表
    path: 'statistics/list',
    name: 'statrepoStatisticsList',
    component: function (resolve) {
      require(['src/pages/statrepo/OrderStatistics.vue'], resolve);
    },
    meta: {
      label: '订单统计报表',
      menu: 'StatrepoStatistics',
      topMenuConst: 'statrepo',
      permission: 'statrepo/statistics/list'
    }
  }]
};
export default STATREPO_ROUTE;
