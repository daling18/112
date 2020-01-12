function getOrderDetailRouter(
  prefixPath, // 以 / 结束，如：line/
  prefixName, // 路由名称前缀
  prefixPerm,     // 权限字符串前缀, 以 / 结束，如：line/
  topMenuConst, // 所属菜单项： operator, distribution, sale, finance
  menu,           // 所属菜单name
  parentLabel,    // 收款详情上级面包屑名称
  parentPath      // 收款详情上级面包屑路径
){
  let varSettD = '', varSettR = '';
  if(prefixName == 'settlementLineOrder'){
    varSettD = prefixPerm + 'getorderdetail,settlement/refunddeal/getrefunddet';
    varSettR = prefixPerm + 'getbackdetail,settlement/refunddeal/getrefunddet';
  }else{
    varSettD = prefixPerm + 'getorderdetail';
    varSettR = prefixPerm + 'getbackdetail';
  }
  const routerArr = [
    {
      path: prefixPath + 'order-detail/:parent_id/:order_no',
      component (reslove) {
        require(['src/components/LineOrderDetail.vue'], reslove);
      },
      name: prefixName + 'OrderDetail',
      meta: {
        topMenuConst: topMenuConst,
        label: '订单详情',
        menu: menu,
        permission: varSettD
      }
    },
    {//保险订单详情
      path: prefixPath + 'order-details/',
      component (reslove) {
        require(['src/components/InsuranceOrderDetail.vue'], reslove);
      },
      name: prefixName + 'OrderDetail',
      meta: {
        topMenuConst: topMenuConst,
        label: '订单详情',
        menu: menu,
        permission: varSettD
      }
    },
    {
      path: prefixPath + 'order-refund',
      component (reslove) {
        require(['src/components/LineOrderRefund.vue'], reslove);
      },
      name: prefixName + 'OrderRefund',
      meta: {
        topMenuConst: topMenuConst,
        label: '退团/款单详情',
        menu: menu,
        permission: varSettR
      }
    },
    {
      path: prefixPath + 'pager-contract',
      component: function (resolve) {
        require(['src/components/PagerContract.vue'], resolve);
      },
      name: prefixName + 'PagerContract',
      meta: {
        isSale: 1,
        label: '上传纸质合同',
        menu: menu,
        permission: prefixPerm + 'getorderdetail'
      }
    },
    {
      path: prefixPath + 'visa-material',
      component: function (resolve) {
        require(['src/components/LineVisaMaterial.vue'], resolve);
      },
      name: prefixName + 'VisaMaterial',
      meta: {
        label: '查看签证材料',
        // parent_label:'团控中心',
        // parent_path:'/control',
        menu: menu,
        topMenuConst: topMenuConst,
        permission: prefixPerm + 'materialop/upvisamat'
      }
    },
    // 收入详情根据场景跳转到不同链接，这里不做处理 -- 20190125 by qzh
    // ... getReceiveDetailRouter(prefixPath, prefixName, topMenuConst, menu),
    // {
    //   path: prefixPath + 'invoice-add',
    //   component: function (resolve) {
    //     require(['src/components/InvoiceAdd.vue'], resolve);
    //   },
    //   name: prefixName + 'InvoiceAdd',
    //   meta: {
    //     topMenuConst: topMenuConst,
    //     label: '申请开票',
    //     menu: menu,
    //     permission: 'api/invoice/sale_todo_add_income,api/invoice/todo_add_income,api/invoice/finance_todo_add_income'
    //   }
    // },
    // {
    //   path: prefixPath + 'trip-detail',
    //   component: function (resolve) {
    //     require(['src/components/TripDetail.vue'], resolve);
    //   },
    //   name: prefixName + 'TripDetail',
    //   meta: {
    //     label: '行程详情',
    //     menu: menu,
    //     topMenuConst: topMenuConst,
    //     permission: 'api/product/sale_detail,api/product/detail'
    //   }
    // },
    // {
    //   path:prefixPath + 'invoice-detail',
    //   name:prefixName + 'InvoiceDetail',
    //   component: function (resolve) {
    //     require(['src/components/InvoiceDetail.vue'], resolve);
    //   },
    //   meta:{
    //     label: '发票详情',
    //     topMenuConst: topMenuConst,
    //     menu: menu,
    //     permission: 'api/invoice/sale_income_detail,api/invoice/finance_income_detail,api/invoice/income_detail'
    //   }
    // }
  ]

  if (parentLabel && parentPath) {
    routerArr.forEach(item => {
      item.meta.parent_label = parentLabel;
      item.meta.parent_path = parentPath;
    })
  }
  
  return routerArr;
}

function getReceiveDetailRouter(
  prefixPath,     // 以 / 结束，如：line/
  prefixName,     // 路由名称前缀
  prefixPerm,     // 权限字符串前缀, 以 / 结束，如：line/
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
        require(['src/components/ReceiveDetail.vue'], resolve);
      },
      meta:{
        label: '收款详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'settlement/recpay/recei/getreceidet' // 收款详情统一在结算中心下控制
      }
    },
    {
      path:prefixPath + 'income-detail',
      name:prefixName + 'IncomeDetail',
      component: function (resolve) {
        require(['src/components/IncomeDetail.vue'], resolve);
      },
      meta:{
        label: '查看收入',
        topMenuConst: topMenuConst,
        menu: menu,
        // extra url: api/finance/fin_income_info,api/tuan/finance_order_confirm_template,api/tuan/finance_save_order_confirm_pdf
        permission: prefixPerm + 'getincodet'
      }
    },
    {
      path: prefixPath + 'adjustment-detail',
      component: function (resolve) {
        require(['src/components/AdjustmentDetail.vue'], resolve);
      },
      name: prefixName + 'AdjustmentDetail',
      meta: {
        label: '调账详情',
        topMenuConst: topMenuConst,
        menu: menu,
        // extra url: api/finance/adjustment_detail
        permission: prefixPerm + 'adjustmentdetail,tuancontro/line/tuanaccop/getchgaccount'
      }
    },
    {
      path: prefixPath + 'confirm-file',
      name: prefixName + 'ConfirmFile',
      component: function (resolve) {
        require(['src/components/ConfirmFile.vue'], resolve);
      },
      meta: {
        label: '产品确认件',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: prefixPerm + 'getincodet'
      }
    },
    {
      path: prefixPath + 'renkuan-detail',
      component: function (resolve) {
        require(['src/components/RenkuanDetail.vue'], resolve);
      },
      name: prefixName + 'RenkuanDetail',
      meta: {
        label: '认款详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'settlement/recpay/recrec/getrecdet' // 认款详情统一在结算中心下控制
      }
    },
    {
      path: prefixPath + 'renkuan-edit',
      component: function (resolve) {
        require(['src/components/RenkuanEdit.vue'], resolve);
      },
      name: prefixName + 'RenkuanEdit',
      meta: {
        label: '添加认款',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: 'settlement/recpay/recei/addrec' // 认款详情统一在结算中心下控制
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
  prefixPerm,     // 权限字符串前缀, 以 / 结束，如：line/
  topMenuConst,   // 所属菜单项： operator, distribution, sale, finance
  menu,           // 所属菜单name
  parentLabel,    // 上级面包屑名称
  parentPath      // 上级面包屑路径
) {
  const routerArr = [
    {
      path: prefixPath + 'detail',
      name: prefixName + 'VisaOrderDetail',
      component (reslove) {
        require(['src/components/VisaOrderDetail.vue'], reslove);
      },
      meta: {
        label: '订单详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: prefixPerm + 'orderdet'
      }
    },
    {
      path: prefixPath + 'refund',
      name: prefixName + 'VisaOrderRefund',
      component (reslove) {
        require(['src/components/VisaOrderRefund.vue'], reslove);
      },
      meta: {
        label: '退款详情',
        topMenuConst: topMenuConst,
        menu: menu,
        permission: prefixPerm + 'refunddet'
      }
    },
    ... getReceiveDetailRouter(
      prefixPath,
      prefixName,
      prefixPerm,
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
  prefixPerm,     // 权限字符串前缀, 以 / 结束，如：line/
  topMenuConst,   // 所属菜单项： operator, distribution, sale, finance
  menu,           // 所属菜单name
  parentLabel,    // 收款详情上级面包屑名称
  parentPath      // 收款详情上级面包屑路径
) {
  const routerArr = [
    ... getReceiveDetailRouter(
      prefixPath,
      prefixName,
      prefixPerm,
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