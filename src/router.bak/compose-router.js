function getOrderDetailRouter(
  prefixPath, // 以 / 结束，如：line/
  prefixName, // 路由名称前缀
  topMenuConst, // 所属菜单项： operator, distribution, sale, finance
  menu        // 所属菜单name

){
  return [
    {
      path: prefixPath + 'order-detail/:parent_id/:id',
      component (reslove) {
        require(['src/components/distribution/LineOrderDetail.vue'], reslove);
      },
      name: prefixName + 'OrderDetail',
      meta: {
        topMenuConst: topMenuConst,
        label: '订单详情',
        menu: menu,
        permission: 'api/tuan/bom_order_detail,api/tuan/distr_order_detail,api/tuan/finance_bom_order_detail'
      }
    },
    {
      path: prefixPath + 'tuituan-detail',
      component (reslove) {
        require(['src/components/distribution/TuituanDetail.vue'], reslove);
      },
      name: prefixName + 'TuituanDetail',
      meta: {
        topMenuConst: topMenuConst,
        label: '退团/款详情',
        menu: menu,
        permission: 'api/tuan/sale_get_cancel_detail,api/finance/fin_get_cancel_detail,api/tuan/operator_get_cancel_detail'
      }
    },
    ... getReceiveDetailRouter(prefixPath, prefixName, topMenuConst, menu),
    {
      path: prefixPath + 'pager-contract',
      component: function (resolve) {
        require(['src/components/plan/cost/hetong.vue'], resolve);
      },
      name: prefixName + 'PagerContract',
      meta: {
        isSale: 1,
        label: '上传纸质合同',
        menu: menu,
        permission: 'api/tuan/get_order_contract_list'
      }
    },
    {
      path: prefixPath + 'add-invoice',
      component: function (resolve) {
        require(['src/components/plan/invoice/add_invoice.vue'], resolve);
      },
      name: prefixName + 'AddInvoice',
      meta: {
        topMenuConst: topMenuConst,
        label: '申请开票',
        menu: menu,
        permission: 'api/invoice/sale_todo_add_income,api/invoice/todo_add_income,api/invoice/finance_todo_add_income'
      }
    },
    {
      path: prefixPath + 'trip-detail',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-detail.vue'], resolve);
      },
      name: prefixName + 'TripDetail',
      meta: {
        label: '行程详情',
        menu: menu,
        topMenuConst: topMenuConst,
        permission: 'api/product/sale_detail,api/product/detail'
      }
    },
    {
      path: prefixPath + 'chakanVisa',
      component: function (resolve) {
        require(['src/components/plan/cost/sheheVisa.vue'], resolve);
      },
      name: prefixName + 'ChakanVisa',
      meta: {
        label: '查看签证材料',
        // parent_label:'团控中心',
        // parent_path:'/control',
        menu: menu,
        topMenuConst: topMenuConst,
        permission: 'api/tuan/sale_order_visa_verify,api/tuan/finance_order_visa_verify,api/tuan/order_visa_verify'
      }
    },
    {
      path:prefixPath + 'invoice-detail',
      name:prefixName + 'InvoiceDetail',
      component: function (resolve) {
        require(['src/components/plan/invoice/invoice_detail.vue'], resolve);
      },
      meta:{
        label: '发票详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/invoice/sale_income_detail,api/invoice/finance_income_detail,api/invoice/income_detail'
      }
    }
  ]
}

function getReceiveDetailRouter(
  prefixPath,     // 以 / 结束，如：line/
  prefixName,     // 路由名称前缀
  topMenuConst,   // 所属菜单项： operator, distribution, sale, finance
  menu,           // 所属菜单name
  parentLabel,    // 收款详情上级面包屑名称
  parentPath      // 收款详情上级面包屑路径
) {
  const routerArr = [
    {
      path:prefixPath + 'receive-detail',
      name:prefixName + 'ReceiveDetail',
      component: function (resolve) {
        require(['src/components/sale/ReceiveDetail.vue'], resolve);
      },
      meta:{
        label: '收款详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/tuan/sale_get_gathering_info,api/tuan/comein_get_gathering_info,api/tuan/financial_get_gathering_info'
      }
    },
    {
      path:prefixPath + 'income-detail',
      name:prefixName + 'IncomeDetail',
      component: function (resolve) {
        require(['src/components/sale/IncomeDetail.vue'], resolve);
      },
      meta:{
        label: '查看收入',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/tuan/sale_income_info,api/tuan/op_income_info,api/finance/fin_income_info'
      }
    },
    {
      path: prefixPath + 'adjustment-detail',
      component: function (resolve) {
        require(['src/components/sale/AdjustmentDetail.vue'], resolve);
      },
      name: prefixName + 'AdjustmentDetail',
      meta: {
        label: '调账详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/tuan/adjustment_detail,api/finance/adjustment_detail'
      }
    },
    {
      path: prefixPath + 'confirm-file',
      name: prefixName + 'ConfirmFile',
      component: function (resolve) {
        require(['src/components/plan/control/product_confirm.vue'], resolve);
      },
      meta: {
        label: '产品确认件',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/tuan/confirm_piece,api/tuan/sale_order_confirm_template'
      }
    },
    {
      path: prefixPath + 'renkuan-detail',
      component: function (resolve) {
        require(['src/components/sale/PeerRecogDetail.vue'], resolve);
      },
      name: prefixName + 'RenkuanDetail',
      meta: {
        label: '认款详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/tuan/sale_renkuan_detail,api/tuan/renkuan_detail,api/finance/renkuan_detail'
      }
    }
  ];

  if (parentLabel && parentPath) {
    routerArr.forEach(item => {
      item.meta.parent_label = parentLabel;
      item.meta.parent_path = parentPath;
    })
  }

  return routerArr;
}

function getVisaDetailRouter(
  prefixPath,     // 以 / 结束，如：line/
  prefixName,     // 路由名称前缀
  topMenuConst,   // 所属菜单项： operator, distribution, sale, finance
  menu,           // 所属菜单name
  parentLabel,    // 收款详情上级面包屑名称
  parentPath      // 收款详情上级面包屑路径
) {
  const routerArr = [
    
    {
      path: prefixPath + 'detail',
      name: prefixName + 'VisaOrderDetail',
      component (reslove) {
        require(['src/components/distribution/VisaOrderDetail.vue'], reslove);
      },
      meta: {
        label: '订单详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/selfsupport.visaorder/order_detail,api/selfsupport.visaorder/op_order_detail'
      }
    },
    {
      path: prefixPath + 'refund',
      name: prefixName + 'VisaOrderRefund',
      component (reslove) {
        require(['src/components/distribution/VisaOrderRefund.vue'], reslove);
      },
      meta: {
        label: '退款详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'api/selfsupport.visaorder/refund'
      }
    },
    ... getReceiveDetailRouter(
      prefixPath,
      prefixName,
      topMenuConst,
      menu,
      parentLabel,
      parentPath
    )
  ];

  if (parentLabel && parentPath) {
    routerArr.forEach(item => {
      item.meta.parent_label = parentLabel;
      item.meta.parent_path = parentPath;
    })
  }

  return routerArr;
}

function getLocalProductDetailRouter(
  prefixPath,     // 以 / 结束，如：line/
  prefixName,     // 路由名称前缀
  topMenuConst,   // 所属菜单项： operator, distribution, sale, finance
  menu,           // 所属菜单name
  parentLabel,    // 收款详情上级面包屑名称
  parentPath      // 收款详情上级面包屑路径
) {
  const routerArr = [
    ... getReceiveDetailRouter(
      prefixPath,
      prefixName,
      topMenuConst,
      menu,
      parentLabel,
      parentPath
    )
  ];
  if (parentLabel && parentPath) {
    routerArr.forEach(item => {
      item.meta.parent_label = parentLabel;
      item.meta.parent_path = parentPath;
    })
  }

  return routerArr;
}

export {
  getOrderDetailRouter,
  getReceiveDetailRouter,
  getVisaDetailRouter,
  getLocalProductDetailRouter
}