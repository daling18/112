import Home from 'src/components/Home.vue';
import { getReceiveDetailRouter, getOrderDetailRouter } from './compose-router';

const SALE_ROUTE = // 销售中心
{
  path: '/sale',
  component: Home,
  name: 'saleCenter',
  meta: {
    label: '销售中心'
  },
  children: [
    /**
    // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
    {
      path: 'order/team',
      component: function (resolve) {
        require(['src/components/sale/order/index.vue'], resolve);
      },
      name: 'saleTeamOrder',
      meta: {
        label: '我的订单',
        menu: 'saleTeamOrder',
        permission: 'api/sale/my_order'
      }
    }, {
      path: 'order/teamth',
      component: function (resolve) {
        require(['src/components/sale/order/team.vue'], resolve);
      },
      name: 'saleTeamOrderTonghang',
      meta: {
        label: '我的同行订单',
        menu: 'saleTeamOrder',
        topMenuConst: 'sale',
        isZhike: false,
        permission: 'api/tuan/sale_tonghang_order_list'
      }
    }, {
      path: 'order/teamzk',
      component: function (resolve) {
        require(['src/components/sale/order/team.vue'], resolve);
      },
      name: 'saleTeamOrderZhike',
      meta: {
        label: '我的直客订单',
        menu: 'saleTeamOrder',
        topMenuConst: 'sale',
        isZhike: true,
        permission: 'api/tuan/sale_zhike_order_list'
      }
    },
    */
    //  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    /**
    {
      path: '/sale/chakanVisa',
      component: function (resolve) {
        require(['src/components/plan/cost/sheheVisa.vue'], resolve);
      },
      name: 'saleChakanVisa',
      meta: {
        label: '查看签证材料',
        // parent_label:'团控中心',
        // parent_path:'/control',
        menu: 'saleInvoice',
        topMenuConst: 'sale',
        permission: 'api/tuan/sale_order_visa_verify'
      }
    },
    {
      path: 'order/order-detail/:parent_id/:id',
      component: function (resolve) {
        require(['src/components/distribution/LineOrderDetail.vue'], resolve);
      },
      name: 'saleOrderDetail',
      meta: {
        label: '订单详情',
        // parent_label:'我的订单',
        // parent_path:'/sale/order/team',
        menu: 'saleInvoice',
        topMenuConst: 'sale',
        permission: 'api/tuan/sale_bom_order_detail'
      }
    }, */
    /**
    // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
    {
      path: 'order/zhikeorder-detail/:parent_id/:id',
      component: function (resolve) {
        require(['src/components/distribution/LineOrderDetail.vue'], resolve);
      },
      name: 'salezhikeorderDetail',
      meta: {
        label: '订单详情',
        parent_label:'我的订单',
        parent_path:'/sale/order/teamzk',
        menu: 'saleTeamOrder',
        topMenuConst: 'sale',
        permission: 'api/tuan/sale_bom_order_detail'
      }
    },
    {
      path: 'myorder/tuituanDetail',
      component: function (resolve) {
        require(['src/components/plan/control/tuituanDetail.vue'], resolve);
      },
      name: 'saleMyorderTuituanDetail',
      meta: {
        label: '退团详情',
        parent_label:'我的订单',
        parent_path:'/sale/order/team',
        menu: 'saleTeamOrder',
        topMenuConst: 'sale',
        permission: 'api/tuan/sale_bom_order_detail'
      }
    },
    */
    //  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: 'order/tuituanDetail',
    //   component: function (resolve) {
    //     require(['src/components/plan/control/tuituanDetail.vue'], resolve);
    //   },
    //   name: 'saleTuituanDetail',
    //   meta: {
    //     label: '退团详情',
    //     // parent_label:'销售下单',
    //     // parent_path:'/sale/order/tuan-list',
    //     menu: 'saleInvoice',
    //     topMenuConst: 'sale',
    //     permission: 'api/tuan/sale_bom_order_detail'
    //   }
    // },
    /**
    // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
    {
      path:'order/saleOrderConfirmPdf2',
      name:'saleOrderConfirmPdf2',
      component:function (resolve) {
        require(['src/components/finace/bill/tuan-bill-confirm.vue'], resolve);
      },
      meta:{
        isSale: 1,
        label: '确认件',
        // parent_label:'我的订单',
        // parent_path:'/sale/order/team',
        menu: 'saleInvoice',
        permission: 'api/tuan/sale_confirm_piece'
      }
    },
    */
    //  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: 'order/oldconfirm',
    //   component: function (resolve) {
    //     require(['src/components/plan/cost/hetong.vue'], resolve);
    //   },
    //   name: 'SaleOrderOldConfirm',
    //   meta: {
    //     isSale: 1,
    //     label: '上传纸质合同',
    //     // parent_label:'团队订单',
    //     // parent_path:'/sale/order/team',
    //     menu: 'saleInvoice',
    //     permission: 'api/tuan/get_order_contract_list'
    //   }
    // },
    /**
    // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
    {
      path: 'order/tuan-list',
      component: function (resolve) {
        require(['src/components/sale/order/TuanList.vue'], resolve);
      },
      name: 'saleTuanList',
      meta: {
        isSale: 1,
        label: '团队查询',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_index'
      }
    },
    {
      path: 'order/tuan-list-xc',
      component: function (resolve) {
        require(['src/components/sale/order/TravelQuery.vue'], resolve);
      },
      name: 'saleTuanListXC',
      meta: {
        topMenuConst: 'sale',
        label: '行程查询',
        menu: 'saleTuanList',
        permission: 'api/product/sale_product_list'
      }
    },
    {
      path: 'order/newcontract',
      component: function (resolve) {
        require(['src/components/plan/cost/hetong.vue'], resolve);
      },
      name: 'saleNewcontract',
      meta: {
        isSale: 1,
        label: '合同',
        menu: 'saleTuanList',
        permission: 'api/tuan/get_order_contract_list'
      }
    },
    {
      path: 'order/tripDetail',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-detail.vue'], resolve);
      },
      name: 'orderTripDetail',
      meta: {
        label: '行程详情',
        menu: 'saleTuanList',
        topMenuConst: 'sale',
        permission: 'api/product/sale_detail'
      }
    },
    {
      path: 'order/form',
      component: function (resolve) {
        require(['src/components/plan/order/form_zhike.vue'], resolve);
      },
      name: 'SaleOrderForm',
      meta: {
        isZhiKe: 0,
        topMenuConst: 'sale',
        label: '同行订单管理',
        parent_label:'销售下单',
        parent_path:'/sale/order/tuan-list',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_add_order'
      }
    },
    {
      path: 'order/form_zhike',
      component: function (resolve) {
        require(['src/components/plan/order/form_zhike.vue'], resolve);
      },
      name: 'SaleOrderFormZhike',
      meta: {
        isZhiKe: 1,
        topMenuConst: 'sale',
        label: '直客订单管理',
        parent_label:'销售下单',
        parent_path:'/sale/order/tuan-list',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_add_zhike_order'
      }
    },
    // 团队名单
    {
      path: 'order/recruiting/:id',
      component: function (resolve) {
        require(['src/components/plan/control/recruiting.vue'], resolve);
      },
      name: 'SaleOrderRecruiting',
      meta: {
        isSale: 1,
        label: '游客名单',
        parent_label:'销售下单',
        parent_path:'/sale/order/tuan-list',
        menu: 'saleTuanList',
        topMenuConst: 'sale',
        permission: 'api/tuan/sale_tourist_lists'
      }
    },
    // 团队订单
    {
      path:'order/tuan-order',
      name:'SaleOrderTuanOrder',
      component:function (resolve) {
        require(['src/components/finace/bill/tuan-list.vue'], resolve);
      },
      meta:{
        isSale: 1,
        label: '团队订单',
        parent_label:'销售下单',
        parent_path:'/sale/order/tuan-list',
        menu: 'saleTuanList',
        topMenuConst: 'sale',
        permission: 'api/tuan/sale_tuan_order_lists'
      }
    },
    {
      path: 'order/detail/:parent_id/:id',
      component: function (resolve) {
        require(['src/components/distribution/LineOrderDetail.vue'], resolve);
      },
      name: 'saleOrderDetail2',
      meta: {
        label: '订单详情',
        parent_label:'团队订单',
        parent_path:'/sale/order/tuan-order',
        menu: 'saleTuanList',
        topMenuConst: 'sale',
        permission: 'api/tuan/sale_bom_order_detail'
      }
    },
    {
      path:'order/saleOrderConfirmPdf',
      name:'saleOrderConfirmPdf',
      component:function (resolve) {
        require(['src/components/finace/bill/tuan-bill-confirm.vue'], resolve);
      },
      meta:{
        isSale: 1,
        label: '确认件模版',
        parent_label:'团队订单',
        parent_path:'/sale/order/tuan-order',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_confirm_piece'
      }
    },
    {
      path: 'order/cost/iconfirm2',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'costConfirm2',
      meta: {
        isSale: 1,
        label: '确认件',
        parent_label:'团队订单',
        parent_path:'/sale/order/tuan-order',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_confirm_piece'
      }
    },
    // 团队操作记录
    {
      path: 'order/operating/:id',
      component: function (resolve) {
        require(['src/components/plan/control/operating.vue'], resolve);
      },
      name: 'SaleOrderOperating',
      meta: {
        isSale: 1,
        label: '团队操作记录',
        parent_label:'销售下单',
        parent_path:'/sale/order/tuan-list',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_op_log'
      }
    },
    // 团队账单
    {
      path: 'order/bill',
      component: function (resolve) {
        require(['src/components/plan/control/bill.vue'], resolve);
      },
      name: 'SaleOrderBill',
      meta: {
        isSale: 1,
        label: '团队账单',
        parent_label:'销售下单',
        parent_path:'/sale/order/tuan-list',
        menu: 'saleTuanList',
        topMenuConst: 'sale',
        permission: 'api/finance/sale_bill_detail'
      }
    },
    // 销售中心-销售下单-团队查询-团队账单
    {
      path: 'SaleAdjustmentDetail',
      component: function (resolve) {
        require(['src/components/finace/accountAdjustmentDetail'], resolve);
      },
      name: 'SaleAdjustmentDetail',
      meta: {
        label: '审核调账详情',
        // parent_label:'成本管理',
        // parent_path:'/control/cost',
        topMenuConst: 'sale',
        menu: 'saleTuanList',
        permission: 'api/tuan/adjustment_detail'
      }
    },
    // 计调操作-团队账单-确认件
    {
      path: 'order/confirm',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'SaleOrderConfirm',
      meta: {
        isSale: 1,
        label: '确认件',
        parent_label:'团队账单',
        parent_path:'/sale/order/bill',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_confirm_piece'
      }
    },
    {
      path: 'order/confirm2',
      component: function (resolve) {
        require(['src/components/plan/income/income_confirm.vue'], resolve);
      },
      name: 'SaleOrderConfirm2',
      meta: {
        isSale: 1,
        label: '确认件',
        parent_label:'团队账单',
        parent_path:'/sale/order/bill',
        menu: 'saleTuanList',
        permission: 'api/tuan/income_confirm_template'
      }
    },
    // 计调操作-团队账单-合同确认件
    {
      path: 'order/contract',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm_hetong.vue'], resolve);
      },
      name: 'SaleOrderContract',
      meta: {
        isSale: 1,
        label: '合同',
        parent_label:'团队账单',
        parent_path:'/sale/order/bill',
        menu: 'saleTuanList',
        permission: 'api/tuan/sale_contract_detail'
      }
    },
    // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
    */
    {
      path: 'recognition/index',
      name: 'SaleRecognitionIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '收款认款',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_order_renkuan,api/zhike/receipts_list',
        paths: '/sale/recognition/peer-order,/sale/recognition/dire-proceeds'
      }
    },
    {
      path: 'recognition/peer-order',
      component: function (resolve) {
        require(['src/components/sale/recognition/peer-order.vue'], resolve);
      },
      name: 'salePeerOrderRecognition',
      meta: {
        label: '同行认款',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_order_renkuan'
      }
    },
    // 销售中心-直客收款
    {
      path: 'recognition/dire-proceeds',
      component: function (resolve) {
        require(['src/components/sale/recognition/dire-proceeds.vue'], resolve);
      },
      name: 'saleDireProceedsRecognition',
      meta: {
        label: '直客收款',
        menu: 'saleOrderRecognition',
        permission: 'api/zhike/receipts_list'
      }
    },
    // 销售中心-直客收款-查看收款详情
    // {
    //   path:'recognition/dire-proceeds/detail',
    //   name:'recieveDireProceeds',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/recieve-detail.vue'], resolve);
    //   },
    //   meta:{
    //     topMenuConst: 'sale',
    //     isZhiKe: 1,
    //     label: '收款详情',
    //     parent_label:'直客收款',
    //     parent_path:'/sale/recognition/dire-proceeds',
    //     menu: 'saleOrderRecognition',
    //     permission: 'api/tuan/zhike_get_gathering_info'
    //   }
    // },
    ... getReceiveDetailRouter(
      'recognition/dire-proceeds/',
      'recieveDireProceeds',
      'sale',
      'saleOrderRecognition',
      '直客收款',
      '/sale/recognition/dire-proceeds'
    ),
    {
      path: 'recognition/peer-proceeds',
      component: function (resolve) {
        require(['src/components/sale/recognition/peer-proceeds.vue'], resolve);
      },
      name: 'salePeerProceeds',
      meta: {
        topMenuConst: 'sale',
        label: '收款记录',
        parent_label:'同行认款',
        parent_path:'/sale/recognition/peer-order',
        menu: 'saleOrderRecognition',
        btnPath:'/sale/recognition/add-peer-proceeds?action=1',
        btnName:'+ 添加收款',
        btnPermission:'api/tuan/sale_add_receipt',
        btnQueryMap: {parent_id:'settlement_org_id'},
        permission: 'api/tuan/sale_receipt_list'
      }
    },
    {
      path:'recognition/add-peer-proceeds',
      name:'saleAddPeerReceive',
      component: function (resolve) {
        require(['src/components/finace/balance/recieve-edit.vue'], resolve);
      },
      meta:{
        isSale: 1,
        label: '添加收款',
        parent_label: '收款记录',
        parent_path: '/sale/recognition/peer-proceeds',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_add_receipt'
      }
    },
    // 销售中心-同行认款-收款记录-查看收款详情
    // {
    //   path:'recognition/peer-proceeds/detail',
    //   name:'recievePeerProceeds',
    //   component: function (resolve) {
    //     // require(['src/components/finace/balance/recieve-detail.vue'], resolve);
    //     require(['src/components/sale/ReceiveDetail.vue'], resolve);
    //   },
    //   meta:{
    //     topMenuConst: 'sale',
    //     label: '收款详情',
    //     parent_label:'收款记录',
    //     parent_path:'/sale/recognition/peer-proceeds',
    //     menu: 'saleOrderRecognition',
    //     permission: 'api/tuan/tonghang_get_gathering_info'
    //   }
    // },
    ... getReceiveDetailRouter(
      'recognition/',
      'SaleRecognition',
      'sale',
      'saleOrderRecognition',
      '同行认款',
      '/sale/recognition/peer-order'
    ),
    {
      path: '/sale/sale-approval-detail',
      name: 'saleApprovalDetail',
      component: function (resolve) {
        require(['src/components/system/approval/detail.vue'], resolve);
      },
      meta: {
        label: '审批单',
        menu: 'saleOrderRecognition',
        permission: 'api/approval/approval_detail'
      }
    },
    {
      path:'recognition/peer-proceeds/detail-add',
      name:'peer-proceeds-recieve-detail-add',
      component: function (resolve) {
        require(['src/components/sale/recognition/peer-recog.vue'], resolve);
      },
      meta:{
        label: '添加认款',
        //  parent_label:'收款详情',
        //  parent_path:'/recieve-detail',
        // isSale: 1,
        topMenuConst: 'sale',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_renkuan_add'
      }
    },
    {
      path: 'recognition/peer-record',
      component: function (resolve) {
        require(['src/components/sale/PeerRecogRecord.vue'], resolve);
      },
      name: 'salePeerRecogRecord',
      meta: {
        label: '认款记录',
        parent_label:'同行认款',
        parent_path:'/sale/recognition/peer-order',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_renkuan_list'
      }
    },
    {
      path: 'recognition/peer-record/detail',
      component: function (resolve) {
        require(['src/components/sale/PeerRecogDetail.vue'], resolve);
      },
      name: 'salePeerRecogDetail',
      meta: {
        topMenuConst: 'sale',
        label: '认款详情',
        parent_label:'认款记录',
        parent_path:'/sale/recognition/peer-record',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_renkuan_detail'
      }
    },
    // 没有使用路由  by qzhchen 20181011
    // {
    //   path: 'recognition/peer-recog',
    //   component: function (resolve) {
    //     require(['src/components/sale/recognition/peer-recog.vue'], resolve);
    //   },
    //   name: 'salePeerRecog',
    //   meta: {
    //     label: '添加认款',
    //     parent_label:'同行收款',
    //     topMenuConst: 'sale',
    //     parent_path:'/sale/recognition/peer-proceeds',
    //     menu: 'saleOrderRecognition',
    //     permission: 'api/tuan/sale_renkuan_add'
    //   }
    // },
    {
      path: 'recognition/peer-record/:id',
      component: function (resolve) {
        require(['src/components/sale/PeerRecogRecord.vue'], resolve);
      },
      name: 'salePeerProceeds2',
      meta: {
        label: '认款记录',
        parent_label:'同行收款',
        parent_path:'/sale/recognition/peer-proceeds',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_renkuan_list'
      }
    },
    // 销售中心-销售下单-团队订单-订单详情-查看收入详情  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path:'/sale/income-detail',
    //   name:'sale-income-detail',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/income-detail.vue'], resolve);
    //   },
    //   meta:{
    //     label: '查看收入',
    //     topMenuConst: 'sale',
    //     // parent_label:'收款记录',
    //     // parent_path:'/fund-settlement/recieve-record',
    //     menu: 'saleInvoice',
    //     permission: 'api/tuan/sale_income_info'
    //   }
    // },
    {
      path: 'saleinvoice',
      name: 'SaleInvoice',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        isSale: 1,
        menu: 'saleInvoice',
        permission: 'api/invoice/income_lists',
        paths: '/sale/saleinvoice/income'
      }
    },
    // 销售订单详情路由
    ... getOrderDetailRouter(
      '/sale/',
      'SaleInvoice',
      'sale',
      'saleInvoice'
    ),
    // 销售-发票管理-收入发票
    {
      path: 'saleinvoice/income',
      name: 'SaleInvoiceIncome',
      component: function (resolve) {
        require(['src/components/plan/invoice/invoice_income.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        isSale: 1,
        menu: 'saleInvoice',
        permission: 'api/invoice/sale_income_lists'
      }
    },
    //  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: 'order/addInvoice',
    //   component: function (resolve) {
    //     require(['src/components/plan/invoice/add_invoice.vue'], resolve);
    //   },
    //   name: 'addInvoice',
    //   meta: {
    //     isSale: 1,
    //     isZhiKe: 1,
    //     label: '申请开票',
    //     menu: 'saleInvoice',
    //     permission: 'api/invoice/sale_todo_add_income'
    //   }
    // },
    /**
    // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
    {
      path: 'order/addInvoice1',
      component: function (resolve) {
        require(['src/components/plan/invoice/add_invoice.vue'], resolve);
      },
      name: 'addInvoice1',
      meta: {
        isSale: 1,
        isZhiKe: 1,
        label: '申请开票',
        menu: 'saleTeamOrder',
        permission: 'api/invoice/sale_todo_add_income'
      }
    },
     */
    //  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    // 销售中心-同行认款-收款记录-查看收款详情
    // {
    //   path:'saleinvoice/detail',
    //   name:'invoiceDetail',
    //   component: function (resolve) {
    //     require(['src/components/plan/invoice/invoice_detail.vue'], resolve);
    //   },
    //   meta:{
    //     topMenuConst: 'sale',
    //     label: '收入发票详情',
    //     parent_label:'发票管理',
    //     parent_path:'/sale/saleinvoice/income',
    //     menu: 'saleInvoice',
    //     permission: 'api/invoice/sale_income_detail'
    //   }
    // },
    /**
    // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
    {
      path:'saleinvoice/detail1',
      name:'invoiceDetail1',
      component: function (resolve) {
        require(['src/components/plan/invoice/invoice_detail.vue'], resolve);
      },
      meta:{
        topMenuConst: 'sale',
        label: '收入发票详情',
        // parent_label:'发票管理',
        // parent_path:'/sale/saleinvoice/income',
        menu: 'saleTeamOrder',
        permission: 'api/invoice/sale_income_detail'
      }
    },
    */
    //  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: 'saleinvoice/detail/tripDetail',
    //   component: function (resolve) {
    //     require(['src/components/plan/trip/trip-detail.vue'], resolve);
    //   },
    //   name: 'invoiceDetailTripDetail',
    //   meta: {
    //     label: '行程详情',
    //     menu: 'saleInvoice',
    //     topMenuConst: 'sale',
    //     // parent_label:'收入发票详情',
    //     // parent_path:'/invoice/detail',
    //     permission: 'api/product/sale_detail'
    //   }
    // },
    // 销售-发票管理-成本回票(列表、上传、详情三页面）
    {
      path: 'saleinvoice/cost',
      name: 'saleInvoiceCost',
      component: function (resolve) {
        require(['src/components/plan/invoice/cost_list.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        menu: 'saleInvoice',
        topMenuConst: 'sale',
        permission: 'api/invoice/sale_cost_lists'
      }
    },
    {
      path: 'saleinvoice/cost_add',
      name: 'saleInvoiceCoAdd',
      component: function (resolve) {
        require(['src/components/plan/invoice/cost_add.vue'], resolve);
      },
      meta: {
        isSale: 1,
        label: '上传成本票',
        menu: 'saleInvoice',
        topMenuConst: 'sale',
        permission: 'api/invoice/add_cost'
      }
    },
    {
      path:'saleinvoice/cost_detail',
      name:'saleInvoiceCoDetail',
      component: function (resolve) {
        require(['src/components/plan/invoice/cost_detail.vue'], resolve);
      },
      meta:{
        label: '成本回票详情',
        parent_label:'发票管理',
        parent_path:'/sale/saleinvoice/cost',
        menu: 'saleInvoice',
        topMenuConst: 'sale',
        permission: 'api/invoice/sale_cost_detail'
      }
    },
    /**
    //  该路由与“销售订单详情路由”重复，进行合并 by qzhchen 20180927
    // 销售中心-查看收入详情
    {
      path:'recieve-detail',
      name:'sale-recieve-detail',
      component: function (resolve) {
        // require(['src/components/finace/balance/recieve-detail.vue'], resolve);
        require(['src/components/sale/ReceiveDetail.vue'], resolve);
      },
      meta:{
        label: '收款详情',
        topMenuConst: 'sale',
        // parent_label:'收款记录',
        // parent_path:'/fund-settlement/recieve-record',
        menu: 'saleOrderRecognition',
        permission: 'api/tuan/sale_get_gathering_info'
      }
    },
    // 销售中心-查看确认件 归到
    {
      path: 'productConfirm',
      name: 'ProductConfirm',
      component: function (resolve) {
        require(['src/components/plan/control/product_confirm.vue'], resolve);
      },
      meta: {
        label: '产品确认件',
        topMenuConst: 'sale',
        menu: 'saleInvoice',
        permission: 'api/tuan/confirm_piece,api/tuan/sale_order_confirm_template'
      }
    }, */
    // 销售中心-成本详情
    {
      path: 'cost-detail',
      component: function (resolve) {
        require(['src/components/plan/cost/detail.vue'], resolve);
      },
      name: 'SaleCostDetail',
      meta: {
        label: '成本详情',
        // parent_label:'成本管理',
        // parent_path:'/control/cost',
        topMenuConst: 'sale',
        menu: 'saleInvoice',
        permission: 'api/tuan/sale_bill_pay_detail'
      }
    },
  ]
};

export default SALE_ROUTE;