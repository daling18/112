import Home from 'src/components/Home.vue';
import { getReceiveDetailRouter, getOrderDetailRouter, getVisaDetailRouter } from './compose-router';

// 财务操作
const FINANCE_ROUTES = {
  path: '/finace',
  name: 'finace',
  component: Home,
  meta: {
    label: '财务操作'
  },
  children: [
    {
      path: '/finace/account-balance',
      name: 'account-balance',
      component: function (resolve) {
        require(['src/components/finace/accountBalance/list.vue'], resolve);
      },
      meta: {
        label: '账户余额',
        menu: 'finaceAccountBalance',
        permission: 'api/finance/org_balance_list'
      }
    },
    {
      path: '/finace/balance-particulars-my',
      name: 'account-balance-particulars-my',
      component: function (resolve) {
        require(['src/components/finace/accountBalance/particulars.vue'], resolve);
      },
      meta: {
        label: '余额明细',
        menu: 'finaceAccountBalance',
        permission: 'api/finance/my_balance_list'
      }
    },
    {
      path: '/finace/balance-particulars-oth',
      name: 'account-balance-particulars-other',
      component: function (resolve) {
        require(['src/components/finace/accountBalance/particulars.vue'], resolve);
      },
      meta: {
        label: '余额明细',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/his_balance_list'
      }
    },
    {
      path: '/finace/balance-freeze-my',
      name: 'account-balance-freeze-my',
      component: function (resolve) {
        require(['src/components/finace/accountBalance/freeze.vue'], resolve);
      },
      meta: {
        label: '冻结明细',
        menu: 'finaceAccountBalance',
        permission: 'api/finance/my_freeze_list'
      }
    },
    {
      path: '/finace/balance-freeze-oth',
      name: 'account-balance-freeze-other',
      component: function (resolve) {
        require(['src/components/finace/accountBalance/freeze.vue'], resolve);
      },
      meta: {
        label: '冻结明细',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/his_balance_list'
      }
    },
    {
      path: '/finace/refund',
      name: 'refundList',
      component: function (resolve) {
        require(['src/components/finace/refund/list.vue'], resolve);
      },
      meta: {
        label: '退款处理',
        menu: 'finaceRefund',
        permission: 'api/finance/get_refund_list'
      }
    },
    // 线路订单详情/退款详情
    ... getOrderDetailRouter(
      '/finace/refund/',
      'refund',
      'finance',
      'finaceRefund'
    ),
    // 门票订单详情/退款详情
    {
      path: 'ticket-order/detail',
      component (reslove) {
        require(['src/components/distribution/order/ticket/detail.vue'],reslove);
      },
      name: 'financeTicketMyOrderDetail',
      meta: {
        label: '订单详情',
        menu: 'finaceRefund',
        permission: 'api/ticket/order_detail'
      }
    },
    {
      path: 'ticket-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/order/ticket/RefundDetail.vue'],reslove);
      },
      name: 'financeTicketMyOrderRefundDetail',
      meta: {
        label: '退款详情',
        menu: 'finaceRefund',
        permission: 'api/ticket/refund_detail'
      }
    },
    // 机票订单详情/退款详情
    {
      path: 'flight-order/detail',
      component (reslove) {
        require(['src/components/distribution/order/flight/detail.vue'],reslove);
      },
      name: 'financeFlightMyOrderDetail',
      meta: {
        label: '订单详情',
        menu: 'finaceRefund',
        permission: 'api/flight/order_detail'
      }
    },
    {
      path: 'flight-order/refund',
      component (reslove) {
        require(['src/components/distribution/order/flight/refund.vue'],reslove);
      },
      name: 'financeFlightMyOrderRefundDetail',
      meta: {
        label: '退款详情',
        menu: 'finaceRefund',
        permission: 'api/flight/refund_detail'
      }
    },
    // 酒店订单详情/退款详情
    {
      path: 'hotel-order/detail',
      component(reslove){
        require(['src/components/distribution/HotelOrderDetail.vue'],reslove);
      },
      name: 'financeHotelMyOrderDetail',
      meta:{
        label: '订单详情',
        menu: 'finaceRefund',
        permission: 'api/hotel/orderDetail'
      }
    },
    {
      path: 'hotel-refund-detail',
      component(reslove){
        require(['src/components/distribution/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'financeHotelMyOrderRefundDetail',
      meta:{
        label: '退款详情',
        menu: 'finaceRefund',
        permission: 'api/hotel/refundDetail'
      }
    },
    // 火车票订单详情/退款详情
    {
      path: 'train-order/detail',
      component(reslove){
        require(['src/components/distribution/TrainOrderDetail.vue'],reslove);
      },
      name: 'financeTrainMyOrderDetail',
      meta:{
        label: '订单详情',
        menu: 'finaceRefund',
        permission: 'api/train/order_detail'
      }
    },
    {
      path: 'train-order-refund',
      component(reslove){
        require(['src/components/distribution/TrainOrderRefundDetail.vue'],reslove);
      },
      name: 'financeTrainMyOrderRefundDetail',
      meta:{
        label: '退款详情',
        menu: 'finaceRefund',
        permission: 'api/train/refund_detail'
      }
    },
    // 农特优订单详情/退款详情
    {
      path: 'local-product-order/detail',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'financeLocalProductOrderDetail',
      meta: {
        topMenuConst: 'finance',
        label: '订单详情',
        menu: 'finaceRefund',
        permission: 'api/selfsupport.localproductorder/my_sale_detail'
      }
    },
    {
      path: 'local-product-order/refund',
      component (reslove) {
        require(['src/components/distribution/LocalProductRefund.vue'], reslove);
      },
      name: 'financeLocalProductOrderRefund',
      meta: {
        topMenuConst: 'finance',
        label: '退团详情',
        menu: 'finaceRefund',
        permission: 'api/selfsupport.localproductorder/refund_detail'
      }
    },
    // 签证订单详情/退款详情
    ... getVisaDetailRouter('visa-order/', 'Finance', 'finance', 'finaceRefund', '', ''),
    {
      path: '/finace/servicecharge',
      name: 'servicecharge',
      component: function (resolve) {
        require(['src/components/finace/servicecharge.vue'], resolve);
      },
      meta: {
        label: '手续费',
        menu: 'finaceServicechange',
        permission: 'api/finance/get_refund_list'
      }
    },
    {
      path: '/fund-settlement',
      name: 'fund-settlement',
      component: function (resolve) {
        require(['src/components/finace/balance/fund-settlement.vue'], resolve);
      },
      meta: {
        label: '同行结算',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/index'
      }
    },
    // 财务操作-资金结算-订单详情路由
    ... getOrderDetailRouter(
      '/fund-settlement/',
      'FundSettlement',
      'finance',
      'finaceFundsettlement'
    ),
    // 财务操作-资金结算-查看应付款、查看应收款
    {
      path: '/fund-settlement/bill',
      component: function (resolve) {
        require(['src/components/plan/control/bill.vue'], resolve);
      },
      name: 'FundSettlementBill',
      meta: {
        label: '团队账单',
        topMenuConst: 'finance',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/bill_detail'
      }
    },
    // 财务操作-成本详情
    {
      path: '/fund-settlement/cost-detail',
      component: function (resolve) {
        require(['src/components/plan/cost/detail.vue'], resolve);
      },
      name: 'FundSettlementCostDetail',
      meta: {
        label: '成本详情',
        topMenuConst: 'finance',
        menu: 'finaceFundsettlement',
        permission: 'api/tuan/finance_bill_pay_detail'
      }
    },
    // 与“财务操作-团队账单-团队订单-订单详情路由”重复，进行合并 by qzhchen 20180929
    // {
    //   path: '/fcontrol/chakanVisa',
    //   component: function (resolve) {
    //     require(['src/components/plan/cost/sheheVisa.vue'], resolve);
    //   },
    //   name: 'finChakanVisa',
    //   meta: {
    //     label: '查看签证材料',
    //     // parent_label:'团控中心',
    //     // parent_path:'/control',
    //     menu: 'finaceTeambillin',
    //     topMenuConst: 'finance',
    //     permission: 'api/tuan/get_order_contract_list'
    //   }
    // },
    // 与“财务操作-团队账单-团队订单-订单详情路由”重复，进行合并 by qzhchen 20180929
    // 财务操作-收款审核-查看收入详情
    // {
    //   path: '/fcontrol/income-detail',
    //   name: 'income-detail',
    //   component: function (resolve) {
    //     // require(['src/components/finace/balance/income-detail.vue'], resolve);
    //     require(['src/components/sale/IncomeDetail.vue'], resolve);
    //   },
    //   meta: {
    //     label: '查看收入',
    //     topMenuConst: 'finance',
    //     // parent_label:'收款记录',
    //     // parent_path:'/fund-settlement/recieve-record',
    //     menu: 'finaceTeambillin',
    //     permission: 'api/finance/fin_income_info'
    //   }
    // },
    // {
    //   path: '/fcontrol/tuituanDetail',
    //   component: function (resolve) {
    //     require(['src/components/plan/control/tuituanDetail.vue'], resolve);
    //   },
    //   name: 'financeTuituanDetail',
    //   meta: {
    //     label: '退团详情',
    //     parent_label: '团队账单列表',
    //     parent_path: '/tuan-bill-list',
    //     menu: 'finaceTeambillin',
    //     topMenuConst: 'finance',
    //     permission: 'api/finance/fin_get_cancel_detail'
    //   }
    // },
    // 与“财务操作-团队账单-团队订单-订单详情路由”重复，进行合并 by qzhchen 20180929
    // {
    //   path: '/fcontrol/order/oldconfirm',
    //   component: function (resolve) {
    //     require(['src/components/plan/cost/hetong.vue'], resolve);
    //   },
    //   name: 'fcontrolOldConfirm',
    //   meta: {
    //     label: '上传纸质合同',
    //     parent_label: '团队账单列表',
    //     parent_path: '/tuan-bill-list',
    //     menu: 'finaceTeambillin',
    //     topMenuConst: 'finance',
    //     permission: 'api/tuan/get_order_contract_list'
    //   }
    // },
    {
      path: '/dire-settlement',
      name: 'dire-settlement',
      component: function (resolve) {
        require(['src/components/finace/balance/dire-settlement.vue'], resolve);
      },
      meta: {
        label: '直客结算',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    }, {
      path: '/channel-settlement',
      name: 'channel-settlement',
      component: function (resolve) {
        require(['src/components/finace/balance/channel-settlement.vue'], resolve);
      },
      meta: {
        label: '渠道结算',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    }, {
      path: '/channel-settlement/income',
      name: 'channel-settlement-income',
      component: function (resolve) {
        require(['src/components/finace/balance/channel-settlement-income.vue'], resolve);
      },
      meta: {
        label: '收入记录',
        parent_label: '渠道结算',
        parent_path: '/channel-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    }, {
      path: '/channel-settlement/trade',
      name: 'channel-settlement-trade',
      component: function (resolve) {
        require(['src/components/finace/balance/channel-settlement-trade.vue'], resolve);
      },
      meta: {
        label: '交易记录',
        parent_label: '渠道结算',
        parent_path: '/channel-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    },
    {
      path: '/channel-settlement/expend',
      name: 'channel-settlement-expend',
      component: function (resolve) {
        require(['src/components/finace/balance/channel-settlement-expend.vue'], resolve);
      },
      meta: {
        label: '支出记录',
        parent_label: '渠道结算',
        parent_path: '/channel-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    }, {
      path: '/channel-settlement/apply',
      name: 'channel-settlement-apply',
      component: function (resolve) {
        require(['src/components/finace/balance/channel-settlement-apply.vue'], resolve);
      },
      meta: {
        label: '结算',
        parent_label: '渠道结算',
        parent_path: '/channel-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    }, {
      path: '/channel-settlement/applylist',
      name: 'channel-settlement-applylist',
      component: function (resolve) {
        require(['src/components/finace/balance/channel-settlement-applylist.vue'], resolve);
      },
      meta: {
        label: '结算单',
        parent_label: '渠道结算',
        parent_path: '/channel-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    }, {
      path: '/channel-settlement/applydetail',
      name: 'channel-settlement-applydetail',
      component: function (resolve) {
        require(['src/components/finace/balance/channel-settlement-applydetail.vue'], resolve);
      },
      meta: {
        label: '查看结算单明细',
        parent_label: '渠道结算',
        parent_path: '/channel-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_settlement_list'
      }
    }, {
      path: '/dire-list',
      name: 'dire-list',
      component: function (resolve) {
        require(['src/components/finace/balance/dire-list.vue'], resolve);
      },
      meta: {
        label: '收款记录',
        parent_label: '直客结算',
        parent_path: '/dire-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/zhike/customer_payment_list'
      }
    },
    // 财务操作-直客结算-交易记录-收款记录   -- 入口已废弃，所以注释掉该路由  by qzhchen 20181008
    // {
    //   path: '/jdire-list',
    //   name: 'j-dire-list',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/dire-list.vue'], resolve);
    //   },
    //   meta: {
    //     label: '收款记录',
    //     parent_label: '交易记录',
    //     parent_path: '/deal-list-dir',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/zhike/customer_payment_list'
    //   }
    // },
    {
      path: '/fund-settlement/pay-record',
      name: 'pay-record',
      component: function (resolve) {
        require(['src/components/finace/balance/pay-record.vue'], resolve);
      },
      meta: {
        label: '付款记录',
        parent_label: '同行结算',
        parent_path: '/fund-settlement',
        menu: 'finaceFundsettlement',
        btnPath: '/fund-settlement/pay-record/pay-edit?action=1',
        btnName: '+ 添加付款',
        btnPermission: 'api/finance/add_payment',
        permission: 'api/finance/index'
      }
    },
    // 财务操作-资金结算-付款记录-付款详情
    {
      path: '/fund-settlement/pay-detail',
      name: 'pay-detail',
      component: function (resolve) {
        require(['src/components/finace/balance/payDetail.vue'], resolve);
      },
      meta: {
        label: '付款详情',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/pay_detail'
      }
    },
    // 财务操作-同行结算-交易记录-付款记录 -- fund-settlement.vue 入口已被注释，所以注释掉该路由  for qzhchen 20181008
    // {
    //   path: '/fund-settlement/jpay-record',
    //   name: 'jpay-record',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/pay-record.vue'], resolve);
    //   },
    //   meta: {
    //     label: '付款记录',
    //     parent_label: '交易记录',
    //     parent_path: '/deal-list',
    //     menu: 'finaceFundsettlement',
    //     btnPath: '/fund-settlement/pay-record/pay-edit?action=1',
    //     btnName: '+ 添加付款',
    //     btnPermission: 'api/finance/add_payment',
    //     permission: 'api/finance/index'
    //   }
    // },
    {
      path: '/fund-settlement/pay-record/pay-edit',
      name: 'pay-edit',
      component: function (resolve) {
        require(['src/components/finace/balance/pay-edit.vue'], resolve);
      },
      meta: {
        label: '付款操作',
        parent_label: '同行结算',
        parent_path: '/fund-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/index,api/finance/edit_payment'
      }
    },
    // 付款处理-付款记录-添加登记付款
    {
      path: '/finace/paymentList/pay/pay-edit',
      name: 'paymentListPay-edit',
      component: function (resolve) {
        require(['src/components/finace/balance/pay-edit.vue'], resolve);
      },
      meta: {
        label: '添加登记付款',
        parent_label: '付款记录',
        parent_path: '/finace/paymentList',
        menu: 'financeApplied',
        permission: 'api/finance/index,api/finance/edit_payment'
      }
    },
    // 付款处理-付款记录-中行在线转账付款
    {
      path: '/finace/paymentList/pay/boc-edit',
      name: 'paymentListPayBocEdit',
      component: function (resolve) {
        require(['src/components/finace/balance/payBocDetail.vue'], resolve);
      },
      meta: {
        label: '中行转账付款',
        parent_label: '付款记录',
        parent_path: '/finace/paymentList',
        menu: 'financeApplied',
        permission: 'api/finance/index,api/finance/edit_payment'
      }
    },
    {
      path: '/fund-settlement/recieve-record',
      name: 'recieve-record',
      component: function (resolve) {
        require(['src/components/finace/balance/recieve-record.vue'], resolve);
      },
      meta: {
        label: '收款记录',
        parent_label: '同行结算',
        parent_path: '/fund-settlement',
        menu: 'finaceFundsettlement',
        btnPath: '/fund-settlement/recieve-record/recieve-edit?action=1',
        btnName: '+ 添加收款',
        btnPermission: 'api/finance/add_receipt',
        btnQueryMap: {parent_id:'id'},
        permission: 'api/finance/receipt_list'
      }
    },
    // 财务操作-同行结算-交易记录-收款记录 -- fund-settlement.vue 入口已被注释，所以注释掉该路由  for qzhchen 20181008
    // {
    //   path: '/fund-settlement/jrecieve-record',
    //   name: 'jrecieve-record',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/recieve-record.vue'], resolve);
    //   },
    //   meta: {
    //     label: '收款记录',
    //     parent_label: '交易记录',
    //     parent_path: '/deal-list',
    //     menu: 'finaceFundsettlement',
    //     btnPath: '/fund-settlement/recieve-record/recieve-edit?action=1',
    //     btnName: '+ 添加收款',
    //     btnPermission: 'api/finance/add_receipt',
    //     permission: 'api/finance/receipt_list'
    //   }
    // },
    // 财务操作-资金结算-收款记录-查看收款详情
    {
      path: '/recieve-detail',
      name: 'recieve-detail',
      component: function (resolve) {
        // require(['src/components/finace/balance/recieve-detail.vue'], resolve);
        require(['src/components/sale/ReceiveDetail.vue'], resolve);
      },
      meta: {
        label: '收款详情',
        isFinace: 1,
        // topMenuConst: 'finance',
        // parent_label:'收款记录',
        // parent_path:'/fund-settlement/recieve-record',
        menu: 'finaceFundsettlement',
        permission: 'api/tuan/financial_settle_get_gathering_info'
      }
    },
    {
      path: '/recieve-detail-add',
      name: 'recieve-detail-add',
      component: function (resolve) {
        require(['src/components/sale/recognition/peer-recog.vue'], resolve);
      },
      meta: {
        label: '添加收款',
        //  parent_label:'收款详情',
        //  parent_path:'/recieve-detail',
        // isFinace: 1,
        topMenuConst: 'finance',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/receipt_list'
      }
    },
    {
      path: '/fund-settlement/recieve-record/recieve-edit',
      name: 'recieve-edit',
      component: function (resolve) {
        require(['src/components/finace/balance/recieve-edit.vue'], resolve);
      },
      meta: {
        label: '收款操作',
        parent_label: '同行结算',
        parent_path: '/fund-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/add_receipt,api/finance/edit_receipt'
      }
    },
    // 收款认款-收款记录-添加登记收款
    // {
    //   path: '/settlement/recpay/receive-edit',
    //   name: 'settlementRecieve-edit',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/recieve-edit.vue'], resolve);
    //   },
    //   meta: {
    //     label: '添加登记收款',
    //     parent_label: '收款记录',
    //     parent_path: '/settlement/recpay/receipt-list',
    //     menu: 'SettlementRecpay',
    //     permission: 'api/finance/add_receipt,api/finance/edit_receipt'
    //   }
    // },
    // 财务操作-资金结算-收入发票
    {
      path: '/fund-settlement/invoice-income',
      name: 'fundSettlementInvoiceIncome',
      component: function (resolve) {
        require(['src/components/finace/balance/fund-settlement-invoice-income.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        parent_label: '同行结算',
        parent_path: '/fund-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/invoice/tonghang_settle_income',
      }
    },
    // 财务操作-资金结算-收入发票-添加开票
    {
      path: '/fund-settlement/invoice-income/add',
      component: function (resolve) {
        require(['src/components/finace/InvoiceIncomeAdd.vue'], resolve);
      },
      name: 'fundSettlementInvoiceIncomeAdd',
      meta: {
        label: '添加开票',
        menu: 'finaceFundsettlement',
        parent_label: '发票管理',
        parent_path: '/fund-settlement/invoice-income',
        permission: 'api/invoice/finance_add_income'
      }
    },
    // 财务操作-资金结算-收入发票-编辑开票
    {
      path: '/fund-settlement/invoice-income/edit',
      component: function (resolve) {
        require(['src/components/finace/InvoiceIncomeAdd.vue'], resolve);
      },
      name: 'fundSettlementInvoiceIncomeEdit',
      meta: {
        label: '编辑开票',
        menu: 'finaceFundsettlement',
        parent_label: '发票管理',
        parent_path: '/fund-settlement/invoice-income',
        permission: 'api/invoice/finance_add_income'
      }
    },
    // 与“财务操作-资金结算-订单详情路由”重复，合并到/fund-settlement/invoice-income/invoice-detail by qzhchen 20190929
    // 财务操作-资金结算-收入发票-查看收票详情
    // {
    //   path: '/fund-settlement/invoice-income/detail',
    //   name: 'financeInvoiceIncomeDetail',
    //   component: function (resolve) {
    //     require(['src/components/finace/InvoiceIncomeDetail.vue'], resolve);
    //   },
    //   meta: {
    //     label: '收入发票详情',
    //     parent_label: '发票管理',
    //     parent_path: '/fund-settlement/invoice-income',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/invoice/finance_income_detail'
    //   }
    // },
    // 与“财务操作-资金结算-订单详情路由”重复，进行合并 by qzhchen 20190929
    // {
    //   path: 'Financeinvoice/detail1',
    //   name: 'FinanceinvoiceDetail1',
    //   component: function (resolve) {
    //     require(['src/components/plan/invoice/invoice_detail.vue'], resolve);
    //   },
    //   meta: {
    //     topMenuConst: 'finance',
    //     label: '收入发票详情',
    //     // parent_label:'发票管理',
    //     // parent_path:'/sale/saleinvoice/income',
    //     menu: 'financeInvoice',
    //     permission: 'api/invoice/finance_income_detail'
    //   }
    // },
    // 财务操作-资金结算-成本回票
    {
      path: '/fund-settlement/invoice-cost',
      name: 'fundSettlementInvoiceCost',
      component: function (resolve) {
        require(['src/components/finace/balance/fund-settlement-invoice-cost.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        parent_label: '同行结算',
        parent_path: '/fund-settlement',
        menu: 'finaceFundsettlement',
        permission: 'api/invoice/tonghang_settle_cost',
      }
    },
    // 财务操作-资金结算-成本回票-上传成本票
    {
      path: '/fund-settlement/invoice-cost/add',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCostAdd.vue'], resolve);
      },
      name: 'fundSettlementInvoiceCostAdd',
      meta: {
        label: '上传成本票',
        menu: 'finaceFundsettlement',
        parent_label: '发票管理',
        parent_path: '/fund-settlement/invoice-cost',
        permission: 'api/invoice/finance_add_cost'
      }
    },
    // 财务操作-资金结算-成本回票-编辑成本票
    {
      path: '/fund-settlement/invoice-cost/edit',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCostAdd.vue'], resolve);
      },
      name: 'fundSettlementInvoiceCostEdit',
      meta: {
        label: '编辑成本票',
        menu: 'finaceFundsettlement',
        parent_label: '发票管理',
        parent_path: '/fund-settlement/invoice-cost',
        permission: 'api/invoice/finance_add_cost'
      }
    },
    // 财务操作-资金结算-成本回票-查看回票详情
    {
      path: '/fund-settlement/invoice-cost/detail',
      name: 'fundSettlementInvoiceCostDetail',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCostDetail.vue'], resolve);
      },
      meta: {
        label: '成本回票详情',
        parent_label: '发票管理',
        parent_path: '/fund-settlement/invoice-cost',
        menu: 'finaceFundsettlement',
        permission: 'api/invoice/finance_cost_detail'
      }
    },
    {
      path: 'tuanBillListIndex',
      name: 'tuanBillListIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '团队账单',
        menu: 'finaceTeambillin',
        // 调账审批移到系统管理-审批单 by qzhchen 20180928
        // permission: 'api/finance/adjustment_list, api/finance/order_list,',
        // paths: '/accountAdjustment, /tuan-bill-list,'
        permission: 'api/finance/order_list',
        paths: '/tuan-bill-list'
      }
    },
    {
      path: '/tuan-bill-list',
      name: 'tuan-bill-list',
      component: function (resolve) {
        require(['src/components/finace/bill/tuan-bill-list.vue'], resolve);
      },
      meta: {
        label: '团队账单列表',
        menu: 'finaceTeambillin',
        permission: 'api/finance/order_list'
      }
    },
    // 调账审批移到系统管理-审批单 by qzhchen 20180928
    // {
    //   path: '/accountAdjustment',
    //   name: 'accountAdjustment',
    //   component: function (resolve) {
    //     require(['src/components/finace/accountAdjustment.vue'], resolve);
    //   },
    //   meta: {
    //     label: '调账审批',
    //     menu: 'finaceTeambillin',
    //     permission: 'api/finance/adjustment_list'
    //   }
    // },
    {
      path: '/cost/newtconfirm_hetong',
      component: function (resolve) {
        require(['src/components/plan/cost/hetong.vue'], resolve);
      },
      name: 'newTConfirmHetong',
      meta: {
        label: '合同',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/get_order_contract_list'
      }
    },
    // 财务操作-财务信息
    {
      path: 'account',
      name: 'financeAccount',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '财务信息',
        menu: 'finaceInfo',
        permission: 'api/finance/get_payment_account_list,api/peeraccount',
        paths: '/finace/account/company,/finace/account/peer'
      }
    },
    // 财务操作-财务信息-公司账户
    {
      path: 'account/company',
      name: 'financeAccountCompany',
      component: function (resolve) {
        require(['src/components/finace/info/AccountCompany.vue'], resolve);
      },
      meta: {
        label: '财务信息',
        menu: 'finaceInfo',
        permission: 'api/finance/get_payment_account_list'
      }
    },
    // 财务操作-财务信息-同行账户
    {
      path: 'account/peer',
      name: 'financeAccountPeer',
      component: function (resolve) {
        require(['src/components/finace/info/AccountPeer.vue'], resolve);
      },
      meta: {
        label: '财务信息',
        menu: 'finaceInfo',
        permission: 'api/peeraccount'
      }
    },
    // 团队名单
    {
      path: '/fcontrol/recruiting/:id/:type',
      component: function (resolve) {
        require(['src/components/plan/control/recruiting.vue'], resolve);
      },
      name: 'fControlRecruiting',
      meta: {
        label: '游客名单',
        parent_label: '团队账单列表',
        parent_path: '/tuan-bill-list',
        menu: 'finaceTeambillin',
        topMenuConst: 'finance',
        permission: 'api/tuan/tourist_lists'
      }
    },
    // 团队订单
    {
      path: '/ftuan-list',
      name: 'ftuan-list',
      component: function (resolve) {
        // 与计调的公用  by qzhchen 20180929
        // require(['src/components/finace/bill/tuan-list.vue'], resolve);
        require(['src/components/plan/tuan-list.vue'], resolve);
      },
      meta: {
        label: '查看团队订单',
        parent_label: '团队账单列表',
        parent_path: '/tuan-bill-list',
        menu: 'finaceTeambillin',
        topMenuConst: 'finance',
        permission: 'api/tuan/order_lists'
      }
    },
    // 财务操作-团队账单-团队订单-订单详情路由
    ... getOrderDetailRouter(
      '/fcontrol/',
      'FControl',
      'finance',
      'finaceTeambillin'
    ),
    {
      path: '/forder/OrderConfirmPdf',
      name: 'fOrderConfirmPdf',
      component: function (resolve) {
        require(['src/components/finace/bill/tuan-bill-confirm.vue'], resolve);
      },
      meta: {
        label: '确认件',
        parent_label: '查看团队订单',
        parent_path: '/ftuan-list',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/finance_confirm_piece'
      }
    },
    {
      path: '/forder/iconfirm2',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'forderConfirm2',
      meta: {
        label: '确认件',
        parent_label: '查看团队订单',
        parent_path: '/ftuan-list',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/finance_confirm_piece'
      }
    },
    {
      path: '/forder/confirm2',
      component: function (resolve) {
        require(['src/components/plan/income/income_confirm.vue'], resolve);
      },
      name: 'fOrderConfirm2',
      meta: {
        label: '确认件',
        parent_label: '团队账单',
        parent_path: '/fcontrol/bill',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/income_confirm_template'
      }
    },
    {
      path: '/fcontrol/cost/tconfirm',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'fConfirm',
      meta: {
        label: '确认件',
        parent_label: '团队账单',
        parent_path: '/fcontrol/bill',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/confirm_piece'
      }
    },
    // 团队操作记录
    {
      path: '/fcontrol/operating/:id/:type',
      component: function (resolve) {
        require(['src/components/plan/control/operating.vue'], resolve);
      },
      name: 'fControlOperating',
      meta: {
        label: '团队操作记录',
        parent_label: '团队账单列表',
        parent_path: '/tuan-bill-list',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/op_log'
      }
    },
    // 团队账单
    {
      path: '/fcontrol/bill',
      component: function (resolve) {
        require(['src/components/plan/control/bill.vue'], resolve);
      },
      name: 'ControlBill',
      meta: {
        label: '团队账单',
        parent_label: '团队账单列表',
        parent_path: '/tuan-bill-list',
        topMenuConst: 'finance',
        menu: 'finaceTeambillin',
        permission: 'api/finance/bill_detail'
      }
    },
    // 财务操作-同行结算-查看应付款、查看应收款  修改为“/fund-settlement/bill” by qzhchen 20181008
    // {
    //   path: '/mcontrol/bill',
    //   component: function (resolve) {
    //     require(['src/components/plan/control/bill.vue'], resolve);
    //   },
    //   name: 'mControlBill',
    //   meta: {
    //     label: '团队账单',
    //     parent_label: '资金结算',
    //     parent_path: '/fund-settlement',
    //     topMenuConst: 'finance',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/finance/bill_detail'
    //   }
    // },
    // 直客计算-团队账单    修改为“/fund-settlement/bill” by qzhchen 20181008
    // {
    //   path: '/zcontrol/bill',
    //   component: function (resolve) {
    //     require(['src/components/plan/control/bill.vue'], resolve);
    //   },
    //   name: 'zControlBill',
    //   meta: {
    //     label: '团队账单',
    //     parent_label: '直客结算',
    //     parent_path: '/dire-settlement',
    //     menu: 'finaceTeambillin',
    //     topMenuConst: 'finance',
    //     permission: 'api/finance/bill_detail'
    //   }
    // },
    // 与“财务操作-资金结算-订单详情路由”重复，进行合并 by qzhchen 20180929
    // 财务操作-直客结算-订单详情
    // {
    //   path: '/zcontrol/order-details/:parent_id/:id',
    //   component: function (resolve) {
    //     require(['src/components/distribution/LineOrderDetail.vue'], resolve);
    //   },
    //   name: 'zControlOrderDetails',
    //   meta: {
    //     label: '团队订单详情',
    //     parent_label: '直客结算',
    //     parent_path: '/dire-settlement',
    //     menu: 'finaceTeambillin',
    //     topMenuConst: 'finance',
    //     permission: 'api/tuan/bom_order_detail'
    //   }
    // },
    // 与“财务操作-团队账单-团队订单-订单详情路由”重复，进行合并 by qzhchen 20180929
    // 财务操作-查看团队订单-订单详情
    // {
    //   path: '/fcontrol/order-details/:parent_id/:id',
    //   component: function (resolve) {
    //     require(['src/components/distribution/LineOrderDetail.vue'], resolve);
    //   },
    //   name: 'fControlOrderDetails',
    //   meta: {
    //     label: '团队订单详情',
    //     parent_label: '查看团队订单',
    //     parent_path: '/ftuan-list',
    //     menu: 'finaceTeambillin',
    //     topMenuConst: 'finance',
    //     isFinace: 1,
    //     permission: 'api/tuan/bom_order_detail'
    //   }
    // },
    // 财务操作-查看团队订单-修改
    // 订单修改调整到订单详情页进行 -- by qzhchen 20180904
    // {
    //   path: '/fcontrol/order/form',
    //   component: function (resolve) {
    //     require(['src/components/plan/order/form_zhike.vue'], resolve);
    //   },
    //   name: 'fOrderForm',
    //   meta: {
    //     isZhiKe: 0,
    //     label: '订单管理',
    //     parent_label: '查看团队订单',
    //     parent_path: '/ftuan-list',
    //     menu: 'finaceTeambillin',
    //     permission: 'api/tuan/add_order'
    //   }
    // },
    // {
    //   path: '/fcontrol/order/form_zhike',
    //   component: function (resolve) {
    //     require(['src/components/plan/order/form_zhike.vue'], resolve);
    //   },
    //   name: 'fOrderFormZhike',
    //   meta: {
    //     isZhiKe: 1,
    //     label: '直客订单管理',
    //     parent_label: '团控中心',
    //     parent_path: '/ftuan-list',
    //     menu: 'finaceTeambillin',
    //     permission: 'api/tuan/add_zhike_order'
    //   }
    // },
    // 财务操作-团队账单-确认件
    {
      path: '/fcontrol/cost/confirm',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'Confirm',
      meta: {
        label: '确认件',
        parent_label: '团队账单',
        parent_path: '/fcontrol/bill',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/confirm_piece'
      }
    },
    // 财务操作-团队账单-直客合同
    {
      path: '/fcontrol/cost/confirm_hetong',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm_hetong.vue'], resolve);
      },
      name: 'FConfirmHetong',
      meta: {
        label: '合同',
        parent_label: '团队账单',
        parent_path: '/fcontrol/bill',
        menu: 'finaceTeambillin',
        permission: 'api/tuan/contract_detail'
      }
    },
    // 财务操作-同行结算-交易记录 -- fund-settlement.vue 入口已被注释，所以注释掉该路由  for qzhchen 20181008
    // {
    //   path: '/deal-list',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/deal-list.vue'], resolve);
    //   },
    //   name: 'dealList',
    //   meta: {
    //     label: '交易记录',
    //     parent_label: '同行结算',
    //     parent_path: '/fund-settlement',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/finance/get_balance_detail_list'
    //   }
    // },
    // 财务操作-z直客结算-交易记录  -- 入口已废弃，所以注释掉该路由  by qzhchen 20181008
    // {
    //   path: '/deal-list-dir',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/deal-list-dir.vue'], resolve);
    //   },
    //   name: 'dealListDir',
    //   meta: {
    //     label: '交易记录',
    //     parent_label: '直客结算',
    //     parent_path: '/dire-settlement',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/finance/get_balance_detail_list'
    //   }
    // },
    // 财务操作-收款记录-收入结算记录
    {
      path: '/recieve-settlment-list',
      component: function (resolve) {
        require(['src/components/finace/balance/recieve-settlment-list.vue'], resolve);
      },
      name: 'recieveSettlmentList',
      meta: {
        label: '认款记录',
        parent_label: '收款记录',
        parent_path: '/fund-settlement/recieve-record',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/get_payment_detail_list'
      }
    },
    // 财务操作-直客结算-交易记录-收入结算记录  -- 入口已废弃，所以注释掉该路由  by qzhchen 20181008
    // {
    //   path: '/zrecieve-settlment-list',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/recieve-settlment-list.vue'], resolve);
    //   },
    //   name: 'zrecieveSettlmentList',
    //   meta: {
    //     label: '收入结算记录',
    //     parent_label: '交易记录',
    //     parent_path: '/deal-list-dir',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/finance/get_payment_detail_list'
    //   }
    // },
    // 财务操作-同行结算-交易记录-收入结算记录 -- fund-settlement.vue 入口已被注释，所以注释掉该路由  for qzhchen 20181008
    // {
    //   path: '/jrecieve-settlment-list',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/recieve-settlment-list.vue'], resolve);
    //   },
    //   name: 'jrecieveSettlmentList',
    //   meta: {
    //     label: '认款记录',
    //     parent_label: '交易记录',
    //     parent_path: '/deal-list',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/finance/get_payment_detail_list'
    //   }
    // },
    // 财务操作-收款记录-成本结算记录
    {
      path: '/pay-settlment-list',
      component: function (resolve) {
        require(['src/components/finace/balance/pay-settlment-list.vue'], resolve);
      },
      name: 'paySettlmentlist',
      meta: {
        label: '成本结算记录',
        parent_label: '付款记录',
        parent_path: '/fund-settlement/pay-record',
        menu: 'finaceFundsettlement',
        permission: 'api/finance/get_payment_detail_list'
      }
    },
    // 财务操作-同行结算-交易记录-成本结算记录 -- fund-settlement.vue 入口已被注释，所以注释掉该路由  for qzhchen 20181008
    // {
    //   path: '/jpay-settlment-list',
    //   component: function (resolve) {
    //     require(['src/components/finace/balance/pay-settlment-list.vue'], resolve);
    //   },
    //   name: 'jpaySettlmentList',
    //   meta: {
    //     label: '成本结算记录',
    //     parent_label: '交易记录',
    //     parent_path: '/deal-list',
    //     menu: 'finaceFundsettlement',
    //     permission: 'api/finance/get_payment_detail_list'
    //   }
    // },
    // 财务操作-业务审批
    {
      path: 'approval',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      name: 'approval',
      meta: {
        label: '业务审批',
        menu: 'finaceApproval',
        permission: 'api/finance/check_receipt_list,api/finance/check_renkuan_list',
        paths: '/finace/approval/proceeds,/finace/approval/recognition'
      }
    },
    // 财务操作-业务审批(收款审核列表)
    {
      path: 'approval/proceeds',
      component: function (resolve) {
        require(['src/components/finace/ApprovalProceeds.vue'], resolve);
      },
      name: 'approvalProceeds',
      meta: {
        label: '收款审核',
        menu: 'finaceApproval',
        permission: 'api/finance/check_receipt_list'
      }
    },
    // 财务操作-业务审批(收款审核列表)-收款审批
    {
      path: 'approval/proceeds/verify',
      component: function (resolve) {
        require(['src/components/finace/ApprovalProceedsVerify.vue'], resolve);
      },
      name: 'finaceApprovalProceedsVerify',
      meta: {
        label: '收款审核',
        menu: 'finaceApproval',
        permission: 'api/tuan/financial_get_gathering_info,api/finance/payment_verify'
      }
    },
    // 财务操作-业务审批(认款审核列表)
    {
      path: 'approval/recognition',
      component: function (resolve) {
        require(['src/components/finace/ApprovalRecognition.vue'], resolve);
      },
      name: 'approvalRecognition',
      meta: {
        label: '认款审核',
        menu: 'finaceApproval',
        permission: 'api/finance/check_renkuan_list'
      }
    },
    // 财务操作-分公司报表
    {
      path: '/fin/branch-report',
      name: 'FinBranchReport',
      component: function (resolve) {
        require(['src/components/finace/report/branch.vue'], resolve);
      },
      meta: {
        label: '分公司报表',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_branch_companys'
      }
    },
    // 财务操作-财务报表-汇总表-团维度
    {
      path: '/fin/report',
      name: 'FinReport',
      component: function (resolve) {
        require(['src/components/finace/report/index.vue'], resolve);
      },
      meta: {
        label: '线下业务汇总表',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_offline_by_tuan'
      }
    },
    // 财务操作-分公司报表-汇总表-团维度
    {
      path: '/fin/b/report',
      name: 'FinBReport',
      component: function (resolve) {
        require(['src/components/finace/report/index.vue'], resolve);
      },
      meta: {
        label: '线下业务汇总表',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_offline_by_tuan'
      }
    },
    // 财务操作-财务报表-汇总表-订单维度
    {
      path: '/fin/report/index2',
      name: 'FinReportOrder',
      component: function (resolve) {
        require(['src/components/finace/report/index2.vue'], resolve);
      },
      meta: {
        label: '线下业务汇总表',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_offline_by_order'
      }
    },
    // 财务操作-分公司报表-汇总表-订单维度
    {
      path: '/fin/b/report/index2',
      name: 'FinBReportOrder',
      component: function (resolve) {
        require(['src/components/finace/report/index2.vue'], resolve);
      },
      meta: {
        label: '线下业务汇总表',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_offline_by_order'
      }
    },
    // 财务操作-财务报表-合同登记台账
    {
      path: '/fin/report-contract',
      name: 'FinReportContract',
      component: function (resolve) {
        require(['src/components/finace/report/contract.vue'], resolve);
      },
      meta: {
        label: '合同登记台账',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_contract_company'
      }
    },
    // 财务操作-分公司报表-合同登记台账
    {
      path: '/fin/b/report-contract',
      name: 'FinBReportContract',
      component: function (resolve) {
        require(['src/components/finace/report/contract.vue'], resolve);
      },
      meta: {
        label: '合同登记台账',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_contract_company'
      }
    },
    // 财务操作-财务报表-发票开具表
    {
      path: '/fin/report-invoice',
      name: 'FinReportInvoice',
      component: function (resolve) {
        require(['src/components/finace/report/invoice.vue'], resolve);
      },
      meta: {
        label: '发票开具表',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/finance/income_invoice_list'
      }
    },
    // 财务操作-分公司报表-发票开具表
    {
      path: '/fin/b/report-invoice',
      name: 'FinBReportInvoice',
      component: function (resolve) {
        require(['src/components/finace/report/invoice.vue'], resolve);
      },
      meta: {
        label: '发票开具表',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/income_invoice_list'
      }
    },
    // 财务操作-财务报表-成本回票表
    {
      path: '/fin/report-cost',
      name: 'FinReportCost',
      component: function (resolve) {
        require(['src/components/finace/report/cost.vue'], resolve);
      },
      meta: {
        label: '成本回票表',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/finance/cost_invoice_list'
      }
    },
    // 财务操作-分公司报表-成本回票表
    {
      path: '/fin/b/report-cost',
      name: 'FinBReportCost',
      component: function (resolve) {
        require(['src/components/finace/report/cost.vue'], resolve);
      },
      meta: {
        label: '成本回票表',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/cost_invoice_list'
      }
    },
    // 财务操作-财务报表-分公司银行日记账
    {
      path: '/fin/report-journal',
      name: 'FinReportJournal',
      component: function (resolve) {
        require(['src/components/finace/report/journal.vue'], resolve);
      },
      meta: {
        label: '分公司银行日记账',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_bank_company'
      }
    },
    // 财务操作-分公司报表-分公司银行日记账
    {
      path: '/fin/b/report-journal',
      name: 'FinBReportJournal',
      component: function (resolve) {
        require(['src/components/finace/report/journal.vue'], resolve);
      },
      meta: {
        label: '分公司银行日记账',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_bank_company'
      }
    },
    // 财务操作-财务报表-周数据明细
    {
      path: '/fin/report-month',
      name: 'FinReportMonth',
      component: function (resolve) {
        require(['src/components/finace/report/month.vue'], resolve);
      },
      meta: {
        label: '周数据明细',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_company_by_month'
      }
    },
    // 财务操作-分公司报表-周数据明细
    {
      path: '/fin/b/report-month',
      name: 'FinBReportMonth',
      component: function (resolve) {
        require(['src/components/finace/report/month.vue'], resolve);
      },
      meta: {
        label: '周数据明细',
        menu: 'branchReport',
        topMenuConst: 'finance',
        permission: 'api/finance/reports_company_by_month'
      }
    },
    // 财务操作-发票管理
    {
      path: 'invoice',
      name: 'FinanceInvoice',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        menu: 'financeInvoice',
        permission: 'api/invoice/audit_invoice_list,api/invoice/finance_income_lists,api/invoice/finance_cost_lists',
        paths: '/finace/invoice/approval,/finace/invoice/income,/finace/invoice/cost'
      }
    },
    // 财务操作-发票管理-发票审核
    {
      path: 'invoice/approval',
      name: 'FinanceInvoiceApproval',
      component: function (resolve) {
        require(['src/components/finace/InvoiceApproval.vue'], resolve);
      },
      meta: {
        label: '发票审核',
        menu: 'financeInvoice',
        permission: 'api/invoice/audit_invoice_list'
      }
    },
    // 财务操作-发票管理-发票审核-审核详情
    {
      path: 'invoice/approval/detail',
      name: 'FinanceInvoiceApprovalDetail',
      component: function (resolve) {
        require(['src/components/finace/InvoiceApprovalDetail.vue'], resolve);
      },
      meta: {
        label: '发票详情',
        parent_label: '发票审核',
        parent_path: '/finace/invoice/approval',
        menu: 'financeInvoice',
        permission: 'api/invoice/audit_invoice'
      }
    },
    // 财务操作-发票管理-发票审核-发票详情
    {
      path: 'invoice/approval/income_detail',
      name: 'FinanceInvoiceApprovalIncomeDetail',
      component: function (resolve) {
        require(['src/components/finace/InvoiceIncomeDetail.vue'], resolve);
      },
      meta: {
        label: '发票详情',
        parent_label: '发票审核',
        parent_path: '/finace/invoice/approval',
        menu: 'financeInvoice',
        permission: 'api/invoice/finance_income_detail'
      }
    },
    // 财务操作-发票管理-发票审核-回票详情
    {
      path: 'invoice/approval/cost_detail',
      name: 'FinanceInvoiceApprovalCostDetail',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCostDetail.vue'], resolve);
      },
      meta: {
        label: '发票详情',
        parent_label: '发票审核',
        parent_path: '/finace/invoice/approval',
        menu: 'financeInvoice',
        permission: 'api/invoice/finance_cost_detail'
      }
    },
    // 财务操作-发票管理-收入发票
    {
      path: 'invoice/income',
      name: 'FinanceInvoiceIncome',
      component: function (resolve) {
        require(['src/components/finace/InvoiceIncome.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        menu: 'financeInvoice',
        permission: 'api/invoice/finance_income_lists'
      }
    },
    // 财务操作-发票管理-收入发票-添加开票
    {
      path: 'invoice/income/add',
      component: function (resolve) {
        require(['src/components/finace/InvoiceIncomeAdd.vue'], resolve);
      },
      name: 'FinanceInvoiceIncomeAdd',
      meta: {
        label: '添加开票',
        menu: 'financeInvoice',
        parent_label: '发票管理',
        parent_path: '/finace/invoice/income',
        permission: 'api/invoice/finance_add_income'
      }
    },
    // 财务操作-发票管理-收入发票-编辑开票
    {
      path: 'invoice/income/edit',
      component: function (resolve) {
        require(['src/components/finace/InvoiceIncomeAdd.vue'], resolve);
      },
      name: 'FinanceInvoiceIncomeEdit',
      meta: {
        label: '编辑开票',
        menu: 'financeInvoice',
        parent_label: '发票管理',
        parent_path: '/finace/invoice/income',
        permission: 'api/invoice/finance_add_income'
      }
    },
    // 与“财务操作-发票管理-订单详情路由”重复，合并到/finace/invoice/invoice-detail by qzhchen 20190929
    // 财务操作-发票管理-收入发票-查看收款详情
    // {
    //   path: 'invoice/income/detail',
    //   name: 'FinanceInvoiceIncomeDetail',
    //   component: function (resolve) {
    //     require(['src/components/finace/InvoiceIncomeDetail.vue'], resolve);
    //   },
    //   meta: {
    //     label: '收入发票详情',
    //     parent_label: '发票管理',
    //     parent_path: '/finace/invoice/income',
    //     menu: 'financeInvoice',
    //     permission: 'api/invoice/finance_income_detail'
    //   }
    // },
    // 财务操作-发票管理-订单详情路由
    ... getOrderDetailRouter(
      'invoice/',
      'FinanceInvoice',
      'finance',
      'financeInvoice'
    ),
    // 财务操作-发票管理-成本回票
    {
      path: 'invoice/cost',
      name: 'FinanceInvoiceCost',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCost.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        menu: 'financeInvoice',
        permission: 'api/invoice/finance_cost_lists'
      }
    },
    // 财务操作-发票管理-成本回票-添加成本票
    {
      path: 'invoice/cost/add',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCostAdd.vue'], resolve);
      },
      name: 'FinanceInvoiceCostAdd',
      meta: {
        label: '添加成本票',
        menu: 'financeInvoice',
        parent_label: '发票管理',
        parent_path: '/finace/invoice/cost',
        permission: 'api/invoice/finance_add_cost'
      }
    },
    // 财务操作-发票管理-成本回票-编辑成本票
    {
      path: 'invoice/cost/edit',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCostAdd.vue'], resolve);
      },
      name: 'FinanceInvoiceCostEdit',
      meta: {
        label: '编辑成本票',
        menu: 'financeInvoice',
        parent_label: '发票管理',
        parent_path: '/finace/invoice/cost',
        permission: 'api/invoice/finance_add_cost'
      }
    },
    // 财务操作-发票管理-成本回票-查看收款详情
    {
      path: 'invoice/cost/detail',
      name: 'FinanceInvoiceCostDetail',
      component: function (resolve) {
        require(['src/components/finace/InvoiceCostDetail.vue'], resolve);
      },
      meta: {
        label: '成本回票详情',
        parent_label: '发票管理',
        parent_path: '/finace/invoice/cost',
        menu: 'financeInvoice',
        permission: 'api/invoice/finance_cost_detail'
      }
    },
    // 财务操作-成本详情
    {
      path: 'cost-detail',
      component: function (resolve) {
        require(['src/components/plan/cost/detail.vue'], resolve);
      },
      name: 'FinanceCostDetail',
      meta: {
        label: '成本详情',
        // parent_label:'成本管理',
        // parent_path:'/control/cost',
        topMenuConst: 'finance',
        menu: 'financeInvoice',
        permission: 'api/tuan/finance_bill_pay_detail'
      }
    },
    {
      path: 'finace-approval-detail',
      name: 'finaceApprovalDetail',
      component: function (resolve) {
        require(['src/components/system/approval/detail.vue'], resolve);
      },
      meta: {
        label: '审批单',
        menu: 'finaceTeambillin',
        permission: 'api/approval/approval_detail'
      }
    },
    // 与“财务操作-团队账单-团队订单-订单详情路由”重复，合并后/fcontrol/adjustment-detail by qzhchen 20180929
    // 财务操作-团队账单-调账审批-调账详情
    // {
    //   path: 'financeAdjustmentDetail',
    //   component: function (resolve) {
    //     require(['src/components/finace/accountAdjustmentDetail'], resolve);
    //   },
    //   name: 'financeAdjustmentDetail',
    //   meta: {
    //     label: '审核调账详情',
    //     // parent_label:'成本管理',
    //     // parent_path:'/control/cost',
    //     topMenuConst: 'finance',
    //     menu: 'finaceTeambillin',
    //     permission: 'api/finance/adjustment_detail'
    //   }
    // },
    // 财务操作-查看确认件
    {
      path: '/fin/productConfirm',
      name: 'finProductConfirm',
      component: function (resolve) {
        require(['src/components/plan/control/product_confirm.vue'], resolve);
      },
      meta: {
        label: '产品确认件',
        menu: 'report',
        topMenuConst: 'finance',
        permission: 'api/tuan/confirm_piece,api/tuan/finance_order_confirm_template'
      }
    },
    // 财务操作-查看纸质合同
    {
      path: '/fin/oldconfirm',
      name: 'finOldConfirm',
      component: function (resolve) {
        require(['src/components/plan/cost/hetong.vue'], resolve);
      },
      meta: {
        label: '查看纸质合同',
        menu: 'report',
        permission: 'api/tuan/get_order_contract_list'
      }
    },
    // 财务-付款处理
    {
      path: 'applied',
      name: 'financeApplied',
      component: function (resolve) {
        require(['src/components/plan/applied/appliedList.vue'], resolve);
      },
      meta: {
        label: '付款处理',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/finance/applied_list'
      }
    },
    // 财务-付款记录
    {
      path: 'paymentList',
      name: 'financePaymentList',
      component: function (resolve) {
        require(['src/components/finace/paymentList.vue'], resolve);
      },
      meta: {
        label: '付款记录',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/finance/all_payment_list'
      }
    },
    // 财务-付款记录-查看付款/付款详情
    {
      path: 'paymentList/pay-detail',
      name: 'financePaymentPayDetail',
      component: function (resolve) {
        require(['src/components/finace/balance/payDetail.vue'], resolve);
      },
      meta: {
        label: '付款详情',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/finance/pay_detail'
      }
    },
    // 财务-付款记录-成本结算记录
    {
      path: 'paymentList/pay-settlment-list',
      name: 'financePaymentPaySettlementList',
      component: function (resolve) {
        require(['src/components/finace/balance/pay-settlment-list.vue'], resolve);
      },
      meta: {
        label: '成本结算记录',
        parent_label: '付款记录',
        parent_path: '/finace/paymentList',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/finance/get_payment_detail_list'
      }
    },
    // 财务-付款记录-成本结算记录-查看应付款
    {
      path: 'paymentList/cost-detail',
      name: 'financePaymentCostDetail',
      component: function (resolve) {
        require(['src/components/plan/cost/detail.vue'], resolve);
      },
      meta: {
        label: '成本详情',
        parent_label: '付款记录',
        parent_path: '/finace/paymentList',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/tuan/finance_bill_pay_detail'
      }
    },
    // 财务-收款付款详情
    {
      path: 'applied-detial',
      name: 'financeAppliedDetail',
      component: function (resolve) {
        require(['src/components/plan/applied/appliedDetail.vue'], resolve);
      },
      meta: {
        label: '付款详情',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/finance/applied_detail'
      }
    },
    // 财务-收款付款操作
    {
      path: 'applied-pay',
      name: 'financeAppliedPay',
      component: function (resolve) {
        require(['src/components/plan/applied/appliedPay.vue'], resolve);
      },
      meta: {
        label: '付款详情',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/finance/settle_applied'
      }
    },
    // 财务-收款付款操作-在线转账付款
    {
      path: 'applied-pay-online',
      name: 'financeAppliedPayOnline',
      component: function (resolve) {
        require(['src/components/plan/applied/appliedPayOnline.vue'], resolve);
      },
      meta: {
        label: '在线转账付款',
        menu: 'financeApplied',
        topMenuConst: 'finance',
        permission: 'api/finance/boc_transfer'
      }
    },
    // 中行账户-账户余额列表
    // {
    //   path: '/settlement/bocacc/balanceList',
    //   name: 'settlementBocaccBalanceList',
    //   component: function (resolve) {
    //     require(['src/pages/settlement/BocAccBalanceList.vue'], resolve);
    //   },
    //   meta: {
    //     label: '账户余额',
    //     menu: 'SettlementBocaccount',
    //     topMenuConst: 'finance',
    //     permission: 'api/finance/boc_balance_list'
    //   }
    // },
    // 中行账户-交易明细列表
    // {
    //   path: '/settlement/bocacc/tradeList',
    //   name: 'settlementBocaccTradeList',
    //   component: function (resolve) {
    //     require(['src/pages/settlement/BocAccTradeList.vue'], resolve);
    //   },
    //   meta: {
    //     label: '交易明细',
    //     menu: 'SettlementBocaccount',
    //     topMenuConst: 'finance',
    //     permission: 'api/finance/boc_transaction_list'
    //   }
    // },
    // // 中行账户-交易明细详情
    // {
    //   path: '/settlement/bocacc/tradeDetail',
    //   name: 'settlementBocaccTradeDetail',
    //   component: function (resolve) {
    //     require(['src/pages/settlement/BocAccTradeDetail.vue'], resolve);
    //   },
    //   meta: {
    //     label: '流水交易明细详情',
    //     menu: 'SettlementBocaccount',
    //     topMenuConst: 'finance',
    //     permission: 'api/finance/boc_transaction_detail'
    //   }
    // },
    // 收款认款-收款列表
    {
      path: '/settlement/recpay/receiptList',
      name: 'settlementRecpayReceiptList',
      component: function (resolve) {
        require(['src/pages/settlement/RpReceiptList2.vue'], resolve);
      },
      meta: {
        label: '收款认款',
        menu: 'SettlementRecpay',
        topMenuConst: 'finance',
        permission: 'api/finance/all_receipt_list'
      }
    },
    // 收款认款-认款列表
    {
      path: '/settlement/recpay/renkuanList',
      name: 'settlementRecpayRenkuanList',
      component: function (resolve) {
        require(['src/pages/settlement/RpRenkuanList2.vue'], resolve);
      },
      meta: {
        label: '收款认款',
        menu: 'SettlementRecpay',
        topMenuConst: 'finance',
        permission: 'api/finance/all_renkuan_list'
      }
    },
    // 收款认款-选入银行流水
    {
      path: '/settlement/recpay/bankRunWater',
      name: 'settlementRecpaybankRunWater',
      component: function (resolve) {
        require(['src/pages/settlement/BankRunningWaterList.vue'], resolve);
      },
      meta: {
        label: '选入银行流水',
        menu: 'SettlementRecpay',
        topMenuConst: 'finance',
        permission: 'api/finance/boc_transaction_payment'
      }
    },
    // 收款详情、认款详情、收入详情页
    // ... getReceiveDetailRouter(
    //   '/settlement/recpay/',
    //   'settlementRecpay',
    //   'finance',
    //   'SettlementRecpay'
    // ),
    // {
    //   path:'/settlement/recpay/renkuan-add',
    //   name:'SettlementRecpayRenkuanAdd',
    //   component: function (resolve) {
    //     require(['src/components/sale/recognition/peer-recog.vue'], resolve);
    //   },
    //   meta:{
    //     label: '添加认款',
    //     //  parent_label:'收款详情',
    //     //  parent_path:'/recieve-detail',
    //     // isSale: 1,
    //     topMenuConst: 'sale',
    //     menu: 'SettlementRecpay',
    //     permission: 'api/tuan/sale_renkuan_add'
    //   }
    // },
  ]
};

export default FINANCE_ROUTES;