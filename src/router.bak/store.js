import Home from 'src/components/Home.vue';

// 门店操作
export const STORE_ROUTER = {
  path: '/store',
  name: 'Store',
  component:Home,
  meta:{
    label: '门店操作'
  },
  children: [
    // 门店操作-资金结算
    {
      path: 'fund-settlement',
      component: function (resolve) {
        require(['src/components/store/FundSettlement.vue'], resolve);
      },
      name: 'storeFundSettlement',
      meta: {
        topMenuConst: 'store',
        label: '资金结算',
        menu: 'storeFundSettlement',
        permission: 'api_store/finance/index'
      }
    }
  ]
};

//营业部销售
export const STORE_SALE_ROUTER = {
  path: '/store-sale',
  name: 'storeSale',
  component:Home,
  meta:{
    label: '营业部销售'
  },
  children: [
    // 营业部销售-产品查询
    {
      path: 'product-list',
      component: function (resolve) {
        require(['src/components/sale/order/TravelQuery.vue'], resolve);
      },
      name: 'storeSaleProductList',
      meta: {
        topMenuConst: 'store-sale',
        label: '产品查询',
        menu: 'storeSaleProductList',
        permission: 'api_store/sale/product_list'
      }
    },
    // 营业部销售-查看行程详情
    {
      path: 'product-detail',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-detail.vue'], resolve);
      },
      name: 'storeSaleProductDetail',
      meta: {
        label: '行程详情',
        menu: 'storeSaleProductList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/sale_detail'
      }
    },
    // 营业部销售-下单
    {
      path: 'order-form',
      component: function (resolve) {
        require(['src/components/plan/order/form_zhike.vue'], resolve);
      },
      name: 'storeSaleOrderForm',
      meta: {
        topMenuConst: 'store-sale',
        label: '订单管理',
        parent_label:'产品查询',
        parent_path:'/store-sale/product-list',
        menu: 'storeSaleProductList',
        permission: 'api_store/sale/add_order'
      }
    },
    // 营业部销售-我的订单
    {
      path: 'order-list',
      component: function (resolve) {
        require(['src/components/store/OrderList.vue'], resolve);
      },
      name: 'storeSaleOrderList',
      meta: {
        label: '我的订单',
        menu: 'storeSaleOrderList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/order_list'
      }
    },
    // 营业部销售-订单详情
    {
      path: 'order-detail/:parent_id/:id',
      component: function (resolve) {
        require(['src/components/distribution/LineOrderDetail.vue'], resolve);
      },
      name: 'storeSaleOrderDetails',
      meta: {
        label: '订单详情',
        menu: 'storeSaleOrderList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/bom_order_detail'
      }
    },
    {
      path: 'tuituanDetail',
      component: function (resolve) {
        require(['src/components/plan/control/tuituanDetail.vue'], resolve);
      },
      name: 'storeSaleTuituanDetail',
      meta: {
        label: '退团详情',
        menu: 'storeSaleOrderList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/sale_get_cancel_detail'
      }
    },
    {
      path: 'order/oldconfirm',
      component: function (resolve) {
        require(['src/components/plan/cost/hetong.vue'], resolve);
      },
      name: 'storeSaleOrderOldConfirm',
      meta: {
        topMenuConst: 'store-sale',
        label: '上传纸质合同',
        // parent_label:'团队订单',
        // parent_path:'/sale/order/team',
        menu: 'storeSaleOrderList',
        permission: 'api_store/sale/get_order_contract_list'
      }
    },
    {
      path: 'chakanVisa',
      component: function (resolve) {
        require(['src/components/plan/cost/sheheVisa.vue'], resolve);
      },
      name: 'storeSaleChakanVisa',
      meta: {
        label: '查看签证材料',
        menu: 'storeSaleOrderList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/sale_order_visa_verify'
      }
    },
    // 营业部销售-发票管理
    {
      path: 'invoice-list',
      component: function (resolve) {
        require(['src/components/store/InvoiceList.vue'], resolve);
      },
      name: 'storeSaleInvoiceList',
      meta: {
        label: '发票管理',
        menu: 'storeSaleInvoiceList',
        topMenuConst: 'store-sale',
        permission: 'api_store/invoice/sale_lists'
      }
    },
    // 营业部销售-申请开票
    {
      path: 'invoice-add',
      component: function (resolve) {
        require(['src/components/store/InvoiceAdd.vue'], resolve);
      },
      name: 'storeSaleInvoiceAdd',
      meta: {
        label: '申请开票',
        menu: 'storeSaleInvoiceList',
        topMenuConst: 'store-sale',
        permission: 'api_store/invoice/sale_add'
      }
    },
    // 营业部销售-开票详情
    {
      path: 'invoice-detail',
      component: function (resolve) {
        require(['src/components/store/InvoiceDetail.vue'], resolve);
      },
      name: 'storeSaleInvoiceDetail',
      meta: {
        label: '开票详情',
        menu: 'storeSaleInvoiceList',
        topMenuConst: 'store-sale',
        permission: 'api_store/invoice/sale_detail'
      }
    },
    // 营业部销售-开票详情-产品详情
    {
      path: 'product-detail2',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-detail.vue'], resolve);
      },
      name: 'storeSaleProductDetail2',
      meta: {
        label: '行程详情',
        menu: 'storeSaleInvoiceList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/sale_detail'
      },
    },
    // 营业部销售-开票详情-订单详情
    {
      path: 'order-detail2/:parent_id/:id',
      component: function (resolve) {
        require(['src/components/distribution/LineOrderDetail.vue'], resolve);
      },
      name: 'storeSaleOrderDetails2',
      meta: {
        label: '订单详情',
        menu: 'storeSaleInvoiceList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/order_detail'
      }
    },
    // 营业部销售-开票详情-订单详情
    {
      path: 'tuituanDetail2',
      component: function (resolve) {
        require(['src/components/plan/control/tuituanDetail.vue'], resolve);
      },
      name: 'storeSaleTuituanDetail2',
      meta: {
        label: '退团详情',
        menu: 'storeSaleInvoiceList',
        topMenuConst: 'store-sale',
        permission: 'api_store/sale/sale_get_cancel_detail'
      }
    },
  ]
};

export const STORE_FINANCE_ROUTER = {
  path: '/store-finace',
  name: 'storeFinace',
  component:Home,
  meta:{
    label: '营业部财务'
  },
  children: [
    // 营业部财务-收入开票
    {
      path: 'invoice-list',
      component: function (resolve) {
        require(['src/components/store/InvoiceList.vue'], resolve);
      },
      name: 'storeFinaceInvoiceList',
      meta: {
        label: '收入开票',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/invoice/finance_lists'
      }
    },
    // 营业部财务-审核中发票
    {
      path: 'invoice-approval',
      component: function (resolve) {
        require(['src/components/store/invoiceApproval.vue'], resolve);
      },
      name: 'storeFinaceInvoiceApproval',
      meta: {
        label: '审核中发票',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/invoice/audit_invoice_list'
      }
    },
    // 营业部财务-申请开票
    {
      path: 'invoice-add',
      component: function (resolve) {
        require(['src/components/store/InvoiceAdd.vue'], resolve);
      },
      name: 'storeFinaceInvoiceAdd',
      meta: {
        label: '申请开票',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/invoice/finance_add'
      }
    },
    // 营业部财务-开票详情
    {
      path: 'invoice-detail',
      component: function (resolve) {
        require(['src/components/store/InvoiceDetail.vue'], resolve);
      },
      name: 'storeFinaceInvoiceDetail',
      meta: {
        label: '开票详情',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/invoice/finance_detail'
      }
    },
    // 营业部财务-编辑开票
    {
      path: 'invoice-edit',
      component: function (resolve) {
        require(['src/components/store/InvoiceAdd.vue'], resolve);
      },
      name: 'storeFinaceInvoiceEdit',
      meta: {
        label: '编辑开票',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/invoice/finance_add'
      }
    },
    // 营业部财务-开票详情-订单详情
    {
      path: 'order-detail2/:parent_id/:id',
      component: function (resolve) {
        require(['src/components/distribution/LineOrderDetail.vue'], resolve);
      },
      name: 'storeFinaceOrderDetails2',
      meta: {
        label: '订单详情',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/finance/finance_bom_order_detail'
      }
    },
    // 营业部财务-开票详情-退团详情
    {
      path: 'tuituanDetail2',
      component: function (resolve) {
        require(['src/components/plan/control/tuituanDetail.vue'], resolve);
      },
      name: 'storeFinaceTuituanDetail2',
      meta: {
        label: '退团详情',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/finance/fin_get_cancel_detail'
      }
    },
    // 营业部财务-签证材料
    {
      path: 'chakanVisa',
      component: function (resolve) {
        require(['src/components/plan/cost/sheheVisa.vue'], resolve);
      },
      name: 'storeSaleChakanVisa2',
      meta: {
        label: '查看签证材料',
        menu: 'storeFinaceInvoiceList',
        topMenuConst: 'store-finace',
        permission: 'api_store/finance/finance_order_visa_verify'
      }
    },
  ]
};


export default STORE_ROUTER;
export {STORE_SALE_ROUTER as storeSaleRouter, STORE_FINANCE_ROUTER as storeFinanceRouter};