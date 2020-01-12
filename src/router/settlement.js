// 结算中心
import Home from 'src/layouts/';
import { getReceiveDetailRouter, getOrderDetailRouter } from './compose-router';
import V2 from 'src/router/v2/settlementCenter'

function getApproveDetailRouter(
  prefixPath,     // 以 / 结束，如：line/
  prefixName,     // 路由名称前缀
  parentLabel,    // 收款详情上级面包屑名称
  parentPath = 'list'      // 收款详情上级面包屑路径
) {
  return [
    // 审批单详情
    {
      path: prefixPath + 'detail',
      name: prefixName + 'Detail',
      component: function (resolve) {
        require(['src/pages/usercenter/ApprovalDetail.vue'], resolve);
      },
      meta: {
        label: '审批单详情',
        menu: 'approval',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: 'usercenter/approval/detail'
      }
    },
    // 审批单详情跳入审批内容预览
    {
      path: prefixPath + 'trip-detail',
      name: prefixName + 'TripDetail',
      component: function (resolve) {
        require(['src/pages/usercenter/ApprovalTripDetail.vue'], resolve);
      },
      meta: {
        label: '审批单内容详情',
        menu: 'approval',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: 'api/approval/approval_content'
      }
    }
  ]
}

const SETTLEMENT_ROUTE = {
  path: '/settlement',
  component: Home,
  name: 'settlement',
  meta: {
    label: '结算中心'
  },
  children:[
    ...V2,
    {
    // 团队账单
    path: 'tuan-bill/list',
    name: 'settlementTuanBillList',
    component: function (resolve) {
      require(['src/pages/settlement/TuanAcList.vue'], resolve);
    },
    meta: {
      label: '团队账单',
      menu: 'SettlementTuanac',
      topMenuConst: 'settlement',
      permission: 'settlement/tuanac/gettuanac'
    }
  },{
    // 游客名单
    path: 'tuan-bill/tourists/:id/:type',
    name: 'settlementTuanBillTourists',
    component: function (resolve) {
      require(['src/pages/settlement/TuanAcTourists.vue'], resolve);
    },
    meta: {
      label: '游客名单',
      menu: 'SettlementTuanac',
      topMenuConst: 'settlement',
      parent_label: '团队账单',
      parent_path: '/settlement/tuan-bill/list',
      permission: 'settlement/tuanac/gettuanac'
    }
  },{
    // 所有订单
    path: 'tuan-bill/orders',
    name: 'settlementTuanBillOrders',
    component: function (resolve) {
      require(['src/pages/settlement/TuanAcOrders.vue'], resolve);
    },
    meta: {
      label: '所有订单',
      menu: 'SettlementTuanac',
      topMenuConst: 'settlement',
      parent_label: '团队账单',
      parent_path: '/settlement/tuan-bill/list',
      permission: 'settlement/tuanac/gettuanac'
    }
  },{
    // 操作记录
    path: 'tuan-bill/records/:id/:type',
    name: 'settlementTuanBillRecords',
    component: function (resolve) {
      require(['src/pages/settlement/TuanAcRecords.vue'], resolve);
    },
    meta: {
      label: '操作记录',
      menu: 'SettlementTuanac',
      topMenuConst: 'settlement',
      parent_label: '团队账单',
      parent_path: '/settlement/tuan-bill/list',
      permission: 'settlement/tuanac/gettuanac'
    }
  },
  // 团队账单-详情
  {
    path: 'tuan-bill/detail',
    name: 'settlementTuanBillDetail',
    component: function (resolve) {
      require(['src/components/TuanBill.vue'], resolve);
    },
    meta: {
      label: '团队账单详情',
      menu: 'SettlementTuanac',
      topMenuConst: 'settlement',
      parent_label: '团队账单',
      parent_path: '/settlement/tuan-bill/list',
      permission: 'settlement/tuanac/gettuanac/gachandet'
    }
  },
  // 团队账单-成本详情
  {
    path: 'tuan-bill/cost-detail',
    component: function (resolve) {
      require(['src/components/CostDetail.vue'], resolve);
    },
    name: 'settlementTuanBillCostDetail',
    meta: {
      label: '成本详情',
      parent_label: '团队账单',
      parent_path: '/settlement/tuan-bill/list',
      topMenuConst: 'settlement',
      menu: 'SettlementTuanac',
      permission: 'settlement/tuanac/gettuanac/getcostdet'
    }
  },
  // 团队账单-收入详情
  {
    path: 'tuan-bill/income-detail',
    name: 'settlementTuanBillIncomeDetail',
    component: function (resolve) {
      require(['src/components/IncomeDetail.vue'], resolve);
    },
    meta: {
      label: '收入详情',
      parent_label: '团队账单',
      parent_path: '/settlement/tuan-bill/list',
      topMenuConst: 'settlement',
      menu: 'SettlementTuanac',
      permission: 'settlement/tuanac/gettuanac/getincodet'
    }
  },
  ... getReceiveDetailRouter(
    'tuan-bill/',
    'settlementTuanBill',
    'settlement/tuanac/gettuanac/',
    'settlement',
    'SettlementTuanac',
    '团队账单',
    '/settlement/tuan-bill/list'
  ),
  {
    // 资金结算-入口
    path: 'settle/index',
    name: 'settlementSettleIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/peer,settlement/fundsett/guest,settlement/fundsett/accbalan',
      paths: '/settlement/settle/peer-list,/settlement/settle/guest-list,/settlement/settle/accbalan-list' 
    }
  },
  // 资金结算-同行结算
  {
    path: 'settle/peer-list',
    name: 'settlementSettPeerList',
    component: function (resolve) {
      require(['src/pages/settlement/SettlePeerList.vue'], resolve);
    },
    meta: {
      label: '同行结算',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/peer'
    }
  },
  // 资金结算-同行结算-收款记录列表
  {
    path: 'settle/peer-list/receive-record',
    name: 'settlementSettPeerReceiveRecord',
    component: function (resolve) {
      require(['src/pages/settlement/SettlePeerReceiveRecord.vue'], resolve);
    },
    meta: {
      label: '收款记录',
      parent_label: '同行结算',
      parent_path: '/settlement/settle/peer-list',
      topMenuConst: 'settlement',
      menu: 'SettlementFundsett',
      permission: 'settlement/recpay/shoukuan'
    }
  },
  // 资金结算-同行结算-余额明细（他人）
  {
    path: 'settle/balan-part-other',
    name: 'settlementSettBalanParticularOther',
    component: function (resolve) {
      require(['src/pages/settlement/BalanParticulars.vue'], resolve);
    },
    meta: {
      label: '余额明细',
      parent_label: '同行结算',
      parent_path: '/settlement/settle/peer-list',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/peer/getbalance'
    }
  },{
    // 资金结算-同行结算-冻结明细（他人）
    path: 'settle/balan-freeze-other',
    name: 'settlementSettBalanFreezeOther',
    component: function (resolve) {
      require(['src/pages/settlement/BalanFreeze.vue'], resolve);
    },
    meta: {
      label: '冻结明细',
      parent_label: '同行结算',
      parent_path: '/settlement/settle/peer-list',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/peer/getfreeze'
    }
  },
  // 资金结算-同行结算-付款记录列表
  {
    path: 'settle/peer-list/pay-record',
    name: 'settlementSettPeerPayRecord',
    component: function (resolve) {
      require(['src/pages/settlement/SettlePeerPayRecord.vue'], resolve);
    },
    meta: {
      label: '付款记录',
      parent_label: '同行结算',
      parent_path: '/settlement/settle/peer-list',
      topMenuConst: 'settlement',
      menu: 'SettlementFundsett',
      permission: 'settlement/pay/fukuan'
    }
  },
  // 资金结算-直客结算
  {
    path: 'settle/guest-list',
    name: 'settlementSettGuestList',
    component: function (resolve) {
      require(['src/pages/settlement/SettleGuestList.vue'], resolve);
    },
    meta: {
      label: '直客结算',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/guest'
    }
  },
  // 资金结算-直客结算-收款记录列表
  {
    path: 'settle/guest-list/receive-record',
    name: 'settlementSettGuestReceiveRecord',
    component: function (resolve) {
      require(['src/pages/settlement/SettleGuestReceiveRecord.vue'], resolve);
    },
    meta: {
      label: '收款记录',
      parent_label: '直客结算',
      parent_path: '/settlement/settle/guest-list',
      topMenuConst: 'settlement',
      menu: 'SettlementFundsett',
      permission: 'settlement/recpay/shoukuan'
    }
  },{
    // 资金结算-账户余额
    path: 'settle/accbalan-list',
    name: 'settlementAccountBalanceList',
    component: function (resolve) {
      require(['src/pages/settlement/AccountBalanceList.vue'], resolve);
    },
    meta: {
      label: '账户余额',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/accbalan'
    }
  },{
    // 资金结算-账户余额-余额明细（我的）
    path: 'settle/balan-part-my',
    name: 'settlementSettBalanParticularMy',
    component: function (resolve) {
      require(['src/pages/settlement/BalanParticulars.vue'], resolve);
    },
    meta: {
      label: '余额明细',
      parent_label: '账户余额',
      parent_path: '/settlement/settle/accbalan-list',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/accbalan/getbalan'
    }
  },{
    // 资金结算-账户余额-冻结明细（我的）
    path: 'settle/balan-freeze-my',
    name: 'settlementSettBalanFreezeMy',
    component: function (resolve) {
      require(['src/pages/settlement/BalanFreeze.vue'], resolve);
    },
    meta: {
      label: '冻结明细',
      parent_label: '账户余额',
      parent_path: '/settlement/settle/accbalan-list',
      menu: 'SettlementFundsett',
      topMenuConst: 'settlement',
      permission: 'settlement/fundsett/accbalan/getfreeze'
    }
  },{
    // 中行账户-账户余额列表
    path: 'bocacc/balance-list',
    name: 'settlementBocaccBalanceList',
    component: function (resolve) {
      require(['src/pages/settlement/BocAccBalanceList.vue'], resolve);
    },
    meta: {
      label: '中行账户余额',
      menu: 'SettlementBocaccount',
      topMenuConst: 'settlement',
      permission: 'settlement/bocaccount/accbalan'
    }
  },{
    // 中行账户-交易明细列表
    path: 'bocacc/trade-list',
    name: 'settlementBocaccTradeList',
    component: function (resolve) {
      require(['src/pages/settlement/BocAccTradeList.vue'], resolve);
    },
    meta: {
      label: '交易明细',
      parent_label: '中行账户余额',
      parent_path: 'balance-list',
      menu: 'SettlementBocaccount',
      topMenuConst: 'settlement',
      permission: 'settlement/bocaccount/tradelist'
    }
  },{
    // 中行账户-交易明细详情
    path: 'bocacc/trade-detail',
    name: 'settlementBocaccTradeDetail',
    component: function (resolve) {
      require(['src/pages/settlement/BocAccTradeDetail.vue'], resolve);
    },
    meta: {
      label: '交易明细详情',
      parent_label: '中行账户余额',
      parent_path: 'balance-list',
      menu: 'SettlementBocaccount',
      topMenuConst: 'settlement',
      permission: 'settlement/bocaccount/tradedetail'
    }
  },{
    // 收款认款-入口
    path: 'recpay/index',
    name: 'settlementRecpayIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/shoukuan,settlement/recpay/renkuan',
      paths: '/settlement/recpay/shou-list,/settlement/recpay/ren-list' 
    }
  },{
    // 收款认款-收款记录 列表
    path: 'recpay/shou-list',
    name: 'settlementRecpayShouList',
    component: function (resolve) {
      require(['src/pages/settlement/RpShouList.vue'], resolve);
    },
    meta: {
      label: '收款记录',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/shoukuan'
    }
  },{
    // 收款认款-收款记录-添加收款
    path: 'recpay/receive-edit',
    name: 'settlementRecpayReceiveEdit',
    component: function (resolve) {
      require(['src/pages/settlement/RpReceiveEdit.vue'], resolve);
    },
    meta: {
      label: '添加登记收款',
      parent_label: '收款记录',
      parent_path: '/settlement/recpay/shou-list',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/recei/addrecei'
    }
  },{
    // 收款认款-收款记录-选入银行流水
    path: 'recpay/bank-runwater',
    name: 'settlementRecpaybankRunwater',
    component: function (resolve) {
      require(['src/pages/settlement/BocAccBankRunwater.vue'], resolve);
    },
    meta: {
      label: '选入银行流水',
      parent_label: '收款记录',
      parent_path: '/settlement/recpay/shou-list',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/recei/bankrec'
    }
  },{
    // 收款认款-收款记录-查看收款
    path: 'recpay/receive-detail',
    name: 'settlementRecpayReceiveDetail',
    component: function (resolve) {
      require(['src/components/ReceiveDetail.vue'], resolve);
    },
    meta: {
      label: '收款详情',
      parent_label: '收款记录',
      parent_path: '/settlement/recpay/shou-list',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/recei/getreceidet'
    }
  },{
    // 收款认款-收款记录-查看收款-认款
    path: 'recpay/renkuan-edit',
    name: 'settlementRecpayRenkuanEdit',
    component: function (resolve) {
      require(['src/components/RenkuanEdit.vue'], resolve);
    },
    meta: {
      label: '添加认款',
      parent_label: '收款记录',
      parent_path: '/settlement/recpay/shou-list',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/recei/addrec'
    }
  },{
    // 收款认款-收款记录-认款
    path: 'recpay/renkuan-add',
    name: 'settlementRecpayRenkuanAdd',
    component: function (resolve) {
      require(['src/pages/settlement/RpRenkuanAdd.vue'], resolve);
    },
    meta: {
      label: '添加认款',
      parent_label: '收款记录',
      parent_path: '/settlement/recpay/shou-list',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/recei/addrec'
    }
  },{
    // 收款认款-认款记录 列表
    path: 'recpay/ren-list',
    name: 'settlementRecpayRenList',
    component: function (resolve) {
      require(['src/pages/settlement/RpRenList.vue'], resolve);
    },
    meta: {
      label: '认款记录',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/renkuan'
    }
  },{
    // 收款认款-认款记录-查看认款
    path: 'recpay/renkuan-detail',
    name: 'settlementRecpayRenkuanDetail',
    component: function (resolve) {
      require(['src/components/RenkuanDetail.vue'], resolve);
    },
    meta: {
      label: '查看认款',
      parent_label: '认款记录',
      parent_path: '/settlement/recpay/ren-list',
      menu: 'SettlementRecpay',
      topMenuConst: 'settlement',
      permission: 'settlement/recpay/recrec/getrecdet'
    }
  },
  // 销售利润结算-入口
  {
    path: 'saleprofit/index',
    name: 'settlementSaleProfitIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementSale',
      topMenuConst: 'settlement',
      permission: 'settlement/saleProfixlist',
      paths: '/settlement/saleprofit/sale-list' 
    }
  },{
    // 销售利润结算列表
    path: 'saleprofit/sale-list',
    name: 'settlementSaleProfitList',
    component: function (resolve) {
      require(['src/pages/settlement/SaleProfix.vue'], resolve);
    },
    meta: {
      label: '销售利润结算',
      menu: 'SettlementSale',
      topMenuConst: 'settlement',
      permission: 'settlement/saleProfixlist'
    }
  },
  ...getApproveDetailRouter('saleprofit/', 'settlementSaleProfitList', '销售利润结算'),
  // 批发利润结算-入口
  {
    path: 'batchprofit/index',
    name: 'settlementBatchProfitIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementBatch',
      topMenuConst: 'settlement',
      permission: 'settlement/batchProfixlist',
      paths: '/settlement/batchprofit/batch-list' 
    }
  },{
    // 批发分润结算列表
    path: 'batchprofit/batch-list',
    name: 'settlementBatchProfitList',
    component: function (resolve) {
      require(['src/pages/settlement/BatchProfit.vue'], resolve);
    },
    meta: {
      label: '批发分润结算',
      menu: 'SettlementBatch',
      topMenuConst: 'settlement',
      permission: 'settlement/batchProfixlist'
    }
  },
  ...getApproveDetailRouter('batchprofit/', 'settlementBatchProfitList', '批发分润结算'),
  // 拉新分润结算-入口
  {
    path: 'pullnewprofit/index',
    name: 'settlementPullNewProfitIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementPullNew',
      topMenuConst: 'settlement',
      permission: 'settlement/pullNewProfix',
      paths: '/settlement/pullnewprofit/pullnew-list' 
    }
  },{
    // 拉新分润结算列表
    path: 'pullnewprofit/pullnew-list',
    name: 'settlementPullNewProfitList',
    component: function (resolve) {
      require(['src/pages/settlement/PullNewProfit.vue'], resolve);
    },
    meta: {
      label: '拉新分润结算',
      menu: 'SettlementPullNew',
      topMenuConst: 'settlement',
      permission: 'settlement/pullNewProfix'
    }
  },
  ...getApproveDetailRouter('pullnewprofit/', 'settlementPullNewProfitList', '拉新分润结算'),
  // 分公司奖励-入口
  {
    path: 'companyReward/index',
    name: 'settlementCompanyRewardIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementCompanyReward',
      topMenuConst: 'settlement',
      permission: 'settlement/companyRewardlist',
      paths: '/settlement/companyReward/company-list' 
    }
  },{
    // 分公司奖励列表
    path: 'companyReward/company-list',
    name: 'settlementCompanyRewardList',
    component: function (resolve) {
      require(['src/pages/settlement/CompanyReward.vue'], resolve);
    },
    meta: {
      label: '分公司奖励',
      menu: 'SettlementCompanyReward',
      topMenuConst: 'settlement',
      permission: 'settlement/companyRewardlist'
    }
  },
  ...getApproveDetailRouter('companyReward/', 'settlementCompanyRewardList', '分公司奖励'),
  // 供应商结算-入口
  {
    path: 'supplier/index',
    name: 'settlementSupplierIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementSupplier',
      topMenuConst: 'settlement',
      permission: 'settlement/supplierlist',
      paths: '/settlement/supplier/supplier-list' 
    }
  },{
    // 供应商结算-列表
    path: 'supplier/supplier-list',
    name: 'settlementSupplierList',
    component: function (resolve) {
      require(['src/pages/settlement/SupplierList.vue'], resolve);
    },
    meta: {
      label: '供应商结算',
      menu: 'SettlementSupplier',
      topMenuConst: 'settlement',
      permission: 'settlement/supplierlist'
    }
  },
  ...getApproveDetailRouter('supplier/', 'settlementSupplierList', '供应商结算单'),
  {
    // 供应商结算单详情
    path: 'supplier/supplier-detail',
    name: 'settlementSupplierDetail',
    component: function (resolve) {
      require(['src/pages/settlement/SupplierSettlementDetail.vue'], resolve);
    },
    meta: {
      label: '供应商结算单详情',
      menu: 'SettlementSupplier',
      topMenuConst: 'settlement',
      permission: 'settlement/supplierDetail'
    }
  },
  // 线路结算-入口
  {
    path: 'line/index',
    name: 'settlementLineIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementLine',
      topMenuConst: 'settlement',
      permission: 'settlement/pendingSettlementlist',
      paths: '/settlement/line/pendingSettlement-list,/settlement/line/settlement-list' 
    }
  },{
    // 线路结算-待结算列表
    path: 'line/pendingSettlement-list',
    name: 'settlementPendingSettlement',
    component: function (resolve) {
      require(['src/pages/settlement/PendingSettlementList.vue'], resolve);
    },
    meta: {
      label: '线路结算',
      menu: 'SettlementLine',
      topMenuConst: 'settlement',
      permission: 'settlement/pendingSettlementlist'
    }
  },{
    // 线路结算-结算单列表
    path: 'line/settlement-list',
    name: 'settlementSettlement',
    component: function (resolve) {
      require(['src/pages/settlement/SettlementList.vue'], resolve);
    },
    meta: {
      label: '线路结算',
      menu: 'SettlementLine',
      topMenuConst: 'settlement',
      permission: 'settlement/settlementlist'
    }
  },
  {
    // 付款-入口
    path: 'pay/index',
    name: 'settlementPayIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/applylist,settlement/pay/disposelist,settlement/pay/fukuan',
      paths: '/settlement/pay/apply-list,/settlement/pay/dispose-list,/settlement/pay/fu-list'
    }
  },{
    // 付款-付款申请 列表
    path: 'pay/apply-list',
    name: 'settlementPayApplyList',
    component: function (resolve) {
      require(['src/pages/settlement/PayApplyList.vue'], resolve);
    },
    meta: {
      label: '付款申请',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/applylist'
    }
  },{
    // 付款-付款申请 详情
    path: 'pay/apply-detail',
    name: 'settlementPayApplyDetail',
    component: function (resolve) {
      require(['src/pages/settlement/PayApplyDetail.vue'], resolve);
    },
    meta: {
      label: '付款详情',
      parent_label: '付款申请',
      parent_path: 'apply-list',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/payapplist/getpayappdet'
    }
  },{
    // 付款-付款处理 列表
    path: 'pay/dispose-list',
    name: 'settlementPayDisposeList',
    component: function (resolve) {
      require(['src/pages/settlement/PayApplyList.vue'], resolve);
    },
    meta: {
      label: '付款处理',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/disposelist'
    }
  },{
    // 付款-付款处理 付款详情
    path: 'pay/fukuan-detail',
    name: 'settlementPayFukuanDetail',
    component: function (resolve) {
      require(['src/pages/settlement/PayApplyDetail.vue'], resolve);
    },
    meta: {
      label: '付款详情',
      parent_label: '付款处理',
      parent_path: 'dispose-list',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/paydeal/getreqdet'
    }
  },{
    // 付款-付款处理 付款详情 在线付款
    path: 'pay/online',
    name: 'settlementPayOnline',
    component: function (resolve) {
      require(['src/pages/settlement/PayOnline.vue'], resolve);
    },
    meta: {
      label: '在线付款',
      parent_label: '付款处理',
      parent_path: 'dispose-list',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/paydeal/onlinetranspay'
    }
  },{
    // 付款-全部付款记录 列表
    path: 'pay/fu-list',
    name: 'settlementPayFuList',
    component: function (resolve) {
      require(['src/pages/settlement/PayFuList.vue'], resolve);
    },
    meta: {
      label: '付款记录',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/fukuan'
    }
  },{
    // 付款-全部付款记录 详情
    path: 'pay/fu-detail',
    name: 'settlementPayFuDetail',
    component: function (resolve) {
      require(['src/pages/settlement/PayFuDetail.vue'], resolve);
    },
    meta: {
      label: '付款详情',
      parent_label: '付款记录',
      parent_path: 'fu-list',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/fukuan'
    }
  },{
    // 付款-成本结算记录
    path: 'pay/costfund-list',
    name: 'settlementPayCostfundList',
    component: function (resolve) {
      require(['src/pages/settlement/PayFuCostfundList.vue'], resolve);
    },
    meta: {
      label: '成本结算记录',
      parent_label: '付款记录',
      parent_path: 'fu-list',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/paylist/costfundreclilst'
    }
  },{
    // 付款-添加登记付款
    path: 'pay/pay-edit',
    name: 'settlementPayEdit',
    component: function (resolve) {
      require(['src/pages/settlement/PayEdit.vue'], resolve);
    },
    meta: {
      label: '添加登记付款',
      parent_label: '付款记录',
      parent_path: 'fu-list',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/paylist/regpay'
    }
  },{
    // 付款-在线转账付款
    path: 'pay/boc-edit',
    name: 'settlementPayBocEdit',
    component: function (resolve) {
      require(['src/pages/settlement/PayBocEdit.vue'], resolve);
    },
    meta: {
      label: '在线转账付款',
      parent_label: '付款记录',
      parent_path: 'fu-list',
      menu: 'SettlementPay',
      topMenuConst: 'settlement',
      permission: 'settlement/pay/paylist/onlinetranspay'
    }
  },
  {
    // 发票-入口
    path: 'invoice/index',
    name: 'settlementInvoiceIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '发票管理',
      menu: 'SettlementInvoice',
      topMenuConst: 'settlement',
      permission: 'settlement/invoice/income,settlement/invoice/cost',
      paths: 'income/list,cost/list' 
    }
  },
  {
    // 发票-成本回票
    path: 'invoice/cost/list',
    name: 'settlementInvoiceCostList',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceCostList.vue'], resolve);
    },
    meta: {
      label: '成本回票',
      menu: 'SettlementInvoice',
      topMenuConst: 'settlement',
      permission: 'settlement/invoice/cost'
    }
  },
  // 财务操作-资金结算-成本回票-上传成本票
  {
    path: 'invoice/cost/add',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceCostAdd.vue'], resolve);
    },
    name: 'settlementInvoiceCostAdd',
    meta: {
      label: '上传成本票',
      menu: 'SettlementInvoice',
      parent_label: '发票管理',
      parent_path: 'list',
      permission: 'settlement/invoice/cost/edit'
    }
  },
  // 财务操作-资金结算-成本回票-编辑成本票
  {
    path: 'invoice/cost/edit',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceCostAdd.vue'], resolve);
    },
    name: 'settlementInvoiceCostEdit',
    meta: {
      label: '编辑成本票',
      menu: 'SettlementInvoice',
      parent_label: '发票管理',
      parent_path: 'list',
      permission: 'settlement/invoice/cost/edit'
    }
  },
  // 财务操作-资金结算-成本回票-查看回票详情
  {
    path: 'invoice/cost/detail',
    name: 'settlementInvoiceCostDetail',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceCostDetail.vue'], resolve);
    },
    meta: {
      label: '成本回票详情',
      parent_label: '发票管理',
      parent_path: 'list',
      menu: 'SettlementInvoice',
      permission: 'settlement/invoice/cost/detail'
    }
  },
  {
    // 发票-收入发票
    path: 'invoice/income/list',
    name: 'settlementInvoiceIncomeList',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceIncomeList.vue'], resolve);
    },
    meta: {
      label: '收入发票',
      menu: 'SettlementInvoice',
      topMenuConst: 'settlement',
      permission: 'settlement/invoice/income'
    }
  },
  // 发票管理-收入发票-添加开票
  {
    path: 'invoice/income/add',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceIncomeAdd.vue'], resolve);
    },
    name: 'settlementInvoiceIncomeAdd',
    meta: {
      label: '添加开票',
      menu: 'SettlementInvoice',
      parent_label: '收入发票',
      parent_path: 'list',
      permission: 'settlement/invoice/income/edit'
    }
  },
  // 发票管理-收入发票-编辑开票
  {
    path: 'invoice/income/edit',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceIncomeAdd.vue'], resolve);
    },
    name: 'settlementInvoiceIncomeEdit',
    meta: {
      label: '编辑开票',
      menu: 'SettlementInvoice',
      parent_label: '收入发票',
      parent_path: 'list',
      permission: 'settlement/invoice/income/edit'
    }
  },
  // 发票管理-收入发票-查看收票详情
  {
    path: 'invoice/income/detail',
    name: 'settlementInvoiceIncomeDetail',
    component: function (resolve) {
      require(['src/pages/settlement/InvoiceIncomeDetail.vue'], resolve);
    },
    meta: {
      label: '收入发票详情',
      parent_label: '收入发票',
      parent_path: 'list',
      menu: 'SettlementInvoice',
      permission: 'settlement/invoice/income/detail'
    }
  },
  {
    path: 'line/detail',
    component (reslove) {
      require(['src/components/TripDetail.vue'],reslove);
    },
    name: 'SettlementLineDetail',
    meta: {
      topMenuConst: 'settlement',
      label: '线路行程详情',
      menu: '',
      permission: 'settlement/linedetail'
    }
  },
  {
    // 往来账户-入口
    path: 'conacc/index',
    name: 'settlementConaccIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementConacc',
      topMenuConst: 'settlement',
      permission: 'settlement/conacc/peerlist,settlement/conacc/complist',
      paths: '/settlement/conacc/peer-list,/settlement/conacc/comp-list' 
    }
  },{
    // 往来账户-同行财务账户
    path: 'conacc/peer-list',
    name: 'settlementConaccPeerList',
    component: function (resolve) {
      require(['src/pages/settlement/ConaccPeerList.vue'], resolve);
    },
    meta: {
      label: '同行账户',
      menu: 'SettlementConacc',
      topMenuConst: 'settlement',
      permission: 'settlement/conacc/peerlist'
    }
  },{
    // 往来账户-本公司账户
    path: 'conacc/comp-list',
    name: 'settlementConaccCompList',
    component: function (resolve) {
      require(['src/pages/settlement/ConaccCompList.vue'], resolve);
    },
    meta: {
      label: '本公司账户',
      menu: 'SettlementConacc',
      topMenuConst: 'settlement',
      permission: 'settlement/conacc/complist'
    }
  },{
    // 退款处理-列表
    path: 'refdeal/list',
    name: 'settlementRefunddealList',
    component: function (resolve) {
      require(['src/pages/settlement/RefdealList.vue'], resolve);
    },
    meta: {
      label: '退款处理',
      menu: 'SettlementRefunddeal',
      topMenuConst: 'settlement',
      permission: 'settlement/refunddeal'
    }
  },
  // 订单详情/退款详情
  ... getOrderDetailRouter(
    'line/',
    'settlementLineOrder',
    'settlement/',
    'settlement',
    'SettlementRefunddeal'
  ),
  // 门票订单详情
  {
    path: 'ticket/order-detail',
    component (reslove) {
      require(['src/components/TicketOrderDetail.vue'],reslove);
    },
    name: 'settlementRefdealTicketOrderDetail',
    meta: {
      label: '订单详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 门票退款详情
  {
    path: 'ticket/order-refund',
    component (reslove) {
      require(['src/components/TicketOrderRefundDetail.vue'],reslove);
    },
    name: 'settlementRefdealTicketOrderRefund',
    meta: {
      label: '退款详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 机票订单详情
  {
    path: 'flight/order-detail',
    component (reslove) {
      require(['src/components/FlightOrderDetail.vue'],reslove);
    },
    name: 'settlementRefdealFlightOrderDetail',
    meta: {
      label: '订单详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 机票退款详情
  {
    path: 'flight/order-refund',
    component (reslove) {
      require(['src/components/FlightOrderRefundDetail.vue'],reslove);
    },
    name: 'settlementRefdealFlightOrderRefund',
    meta: {
      label: '退款详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 酒店订单详情
  {
    path: 'hotel/order-detail',
    component (reslove) {
      require(['src/components/HotelOrderDetail.vue'],reslove);
    },
    name: 'settlementRefdealHotelOrderDetail',
    meta: {
      label: '订单详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 酒店退款详情
  {
    path: 'hotel/order-refund',
    component (reslove) {
      require(['src/components/HotelOrderRefundDetail.vue'],reslove);
    },
    name: 'settlementRefdealHotelOrderRefund',
    meta: {
      label: '退款详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 火车票订单详情
  {
    path: 'train/order-detail',
    component (reslove) {
      require(['src/components/TrainOrderDetail.vue'],reslove);
    },
    name: 'settlementRefdealTrainOrderDetail',
    meta: {
      label: '订单详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 火车票退款详情
  {
    path: 'train/order-refund',
    component (reslove) {
      require(['src/components/TrainOrderRefundDetail.vue'],reslove);
    },
    name: 'settlementRefdealTrainOrderRefund',
    meta: {
      label: '退款详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 农特优订单详情
  {
    path: 'lproduct/order-detail',
    component (reslove) {
      require(['src/components/LocalProductOrderDetail.vue'],reslove);
    },
    name: 'settlementRefdealLproductOrderDetail',
    meta: {
      label: '订单详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 农特优退款详情
  {
    path: 'lproduct/order-refund',
    component (reslove) {
      require(['src/components/LocalProductRefund.vue'],reslove);
    },
    name: 'settlementRefdealLproductOrderRefund',
    meta: {
      label: '退款详情',
      menu: 'finaceRefund',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 签证订单详情
  {
    path: 'visa/order-detail',
    component (reslove) {
      require(['src/components/VisaOrderDetail.vue'],reslove);
    },
    name: 'settlementRefdealVisaOrderDetail',
    meta: {
      label: '订单详情',
      menu: 'finaceRefund',
      topMenuConst: 'settlement',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 签证退款详情
  {
    path: 'visa/order-refund',
    component (reslove) {
      require(['src/components/VisaOrderRefund.vue'],reslove);
    },
    name: 'settlementRefdealVisaOrderRefund',
    meta: {
      label: '退款详情',
      menu: 'finaceRefund',
      topMenuConst: 'settlement',
      permission: 'settlement/refunddeal/getrefunddet'
    }
  },
  // 手续费-列表
  {
    path: 'brokerage/list',
    name: 'SettlementBrokerageList',
    component (reslove) {
      require(['src/pages/settlement/BrokerageList.vue'],reslove);
    },
    meta: {
      label: '手续费',
      menu: 'SettlementBrokerage',
      topMenuConst: 'settlement',
      permission: 'settlement/brokerage'
    }
  },
  {
    path: 'line/trip-detail',
    component (reslove) {
      require(['src/components/TripDetail.vue'],reslove);
    },
    name: 'SettlementLineDetail',
    meta: {
      topMenuConst: 'settlement',
      label: '线路行程详情',
      menu: '',
      permission: 'settlement/linedetail'
    }
  },
  // 返佣-入口
  {
    path: 'rebate/index',
    name: 'settlementRebateIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '',
      menu: 'SettlementBerate',
      topMenuConst: 'settlement',
      permission: 'settlement/rebate/wattinglist, settlement/rebatelist',
      paths: '' 
    }
  },
  {
    path: 'rebate/waiting-list',
    name: 'SettlementBerateWattingList',
    component (reslove) {
      require(['src/pages/settlement/Rebate/WaitingRebateList.vue'],reslove);
    },
    meta: {
      label: '待返佣单',
      menu: 'SettlementBerate',
      topMenuConst: 'settlement',
      permission: 'settlement/rebate/wattinglist'
    }
  },
  {
    path: 'rebate/rebate-list',
    name: 'SettlementBerateList',
    component (reslove) {
      require(['src/pages/settlement/Rebate/RebateList.vue'],reslove);
    },
    meta: {
      label: '返佣单',
      menu: 'SettlementBerate',
      topMenuConst: 'settlement',
      permission: 'settlement/rebatelist'
    }
  },
  ...getApproveDetailRouter('rebate/', 'SettlementBerateList', '返佣单'),
  {
    path: 'rebate/rebate-detail',
    name: 'SettlementBerateDetail',
    component (reslove) {
      require(['src/pages/settlement/Rebate/RebateDetail.vue'],reslove);
    },
    meta: {
      label: '返佣单详情',
      parent_label: '返佣单',
      parent_path: '/settlement/rebate/rebate-list',
      menu: 'SettlementBerate',
      topMenuConst: 'settlement',
      permission: 'settlement/rebateDetail'
    }
  },
  // 手续费-列表
  {
    path: 'earnings/list',
    name: 'SettlementEarnings',
    component (reslove) {
      require(['src/pages/settlement/Earnings.vue'],reslove);
    },
    meta: {
      label: '收益统计',
      menu: 'SettlementEarnings',
      topMenuConst: 'settlement',
      permission: 'settlement/earnings'
    }
  }]
};

export default SETTLEMENT_ROUTE;