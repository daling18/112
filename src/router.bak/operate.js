import Home from 'src/components/Home.vue';
import {
  getReceiveDetailRouter,
  getOrderDetailRouter,
  getVisaDetailRouter,
  getLocalProductDetailRouter
} from './compose-router';

// 计调操作
const OPERATE_ROUTE = {
  path: '/plan',
  component: Home,
  name: 'adjustPlan',
  meta: {
    label: '计调操作'
  },
  children: [
    {
      path: '/control/index',
      component: function (resolve) {
        require(['src/components/plan/control/index.vue'], resolve);
      },
      name: 'ControlIndex',
      meta: {
        label: '团控中心',
        menu: 'control',
        permission: 'api/tuan/index'
      }
    },
    {
      path: '/control/list-line',
      component: function (resolve) {
        require(['src/components/plan/control/listLine.vue'], resolve);
      },
      name: 'ControlListline',
      meta: {
        label: '线路团控',
        menu: 'control',
        // 去除新增团队按钮 http://jira.yktour.com.cn/browse/ERP-3738  by qzhchen 20180929
        // btnPath: '/gain-tuan',
        // btnName: '+ 添加团队',
        // btnPermission: 'api/tuan/index',
        permission: 'api/tuan/index'
      }
    },
    {
      path: '/control/list-line2',
      component: function (resolve) {
        require(['src/components/plan/control/listLine2.vue'], resolve);
      },
      name: 'ControlListline2',
      meta: {
        label: '单项团控',
        menu: 'control',
        // 去除新增团队按钮 http://jira.yktour.com.cn/browse/ERP-3738  by qzhchen 20180929
        // btnPath: '/gain-tuan',
        // btnName: '+ 添加团队',
        // btnPermission: 'api/tuan/index',
        permission: 'api/selfsupport.tuan/index'
      }
    },
    // 该路由与“计调操作-查看团队订单-订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: '/order/oldconfirm',
    //   component: function (resolve) {
    //     require(['src/components/plan/cost/hetong.vue'], resolve);
    //   },
    //   name: 'controlOrderOldConfirm',
    //   meta: {
    //     label: '上传纸质合同',
    //     parent_label: '团控中心',
    //     parent_path: '/control',
    //     menu: 'control',
    //     permission: 'api/tuan/get_order_contract_list'
    //   }
    // },
    {
      path: '/order/sheheVisa',
      component: function (resolve) {
        require(['src/components/plan/cost/sheheVisa.vue'], resolve);
      },
      name: 'controlOrdersheheVisa',
      meta: {
        label: '审核签证材料',
        // parent_label:'团控中心',
        // parent_path:'/control',
        menu: 'control',
        topMenuConst: 'operator',
        permission: 'api/tuan/get_order_contract_list'
      }
    },
    // 该路由与“计调操作-查看团队订单-订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: '/control/chakanVisa',
    //   component: function (resolve) {
    //     require(['src/components/plan/cost/sheheVisa.vue'], resolve);
    //   },
    //   name: 'controlChakanVisa',
    //   meta: {
    //     label: '查看签证材料',
    //     // parent_label:'团控中心',
    //     // parent_path:'/control',
    //     menu: 'control',
    //     topMenuConst: 'operator',
    //     permission: 'api/tuan/order_visa_verify'
    //   }
    // },
    // 去除新增团队按钮 http://jira.yktour.com.cn/browse/ERP-3738  by qzhchen 20180929
    // {
    //   path: '/gain-tuan',
    //   component: function (resolve) {
    //     require(['src/components/plan/control/gain-tuan.vue'], resolve);
    //   },
    //   name: 'gainTuan',
    //   meta: {
    //     label: '团队编辑',
    //     menu: 'control',
    //     permission: 'api/tuan/index'
    //   }
    // },
    {
      path: '/control/income',
      component: function (resolve) {
        require(['src/components/plan/income/list.vue'], resolve);
      },
      name: 'Income',
      meta: {
        label: '收入管理',
        parent_label: '团控中心',
        parent_path: '/control/index',
        menu: 'control',
        permission: 'api/tuan/income_lists'
      }
    },
    {
      path: '/control/income-supplier',
      component: function (resolve) {
        require(['src/components/plan/income/listSupplier.vue'], resolve);
      },
      name: 'IncomeSupplier',
      meta: {
        label: '团队收入',
        parent_label: '团控中心',
        parent_path: '/control',
        menu: 'control',
        permission: 'api_supplier/tuan/income_lists'
      }
    },
    {
      path: '/control/cost',
      component: function (resolve) {
        require(['src/components/plan/cost/list.vue'], resolve);
      },
      name: 'Cost',
      meta: {
        label: '成本管理',
        parent_label: '团控中心',
        parent_path: '/control/index',
        menu: 'control',
        permission: 'api/tuan/cost_lists'
      }
    },
    // 添加成本表单页
    {
      path: '/control/cost-add',
      component: function (resolve) {
        require(['src/components/plan/cost/add.vue'], resolve);
      },
      name: 'CostAdd',
      meta: {
        label: '添加成本',
        parent_label: '团控中心',
        parent_path: '/control/index',
        menu: 'control',
        permission: 'api/tuan/cost_lists'
      }
    },
    // 计调操作-成本详情
    {
      path: '/control/cost/detail',
      component: function (resolve) {
        require(['src/components/plan/cost/detail.vue'], resolve);
      },
      name: 'PlanCostDetail',
      meta: {
        label: '成本详情',
        // parent_label:'成本管理',
        // parent_path:'/control/cost',
        topMenuConst: 'operator',
        menu: 'control',
        permission: 'api/tuan/bill_pay_detail'
      }
    },
    // 计调操作-团控中心-团队账单-填写调整申请
    {
      path: '/control/billIncomeCostUpdate',
      component: function (resolve) {
        require(['src/components/plan/billIncomeCostUpdate.vue'], resolve);
      },
      name: 'PlanBillIncomeCostUpdate',
      meta: {
        label: '调整团账',
        // parent_label:'成本管理',
        // parent_path:'/control/cost',
        topMenuConst: 'operator',
        menu: 'control',
        permission: 'api/tuan/bill_pay_detail'
      }
    },
    // 计调操作-成本管理-确认件
    {
      path: '/control/cost/confirm',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'controlCostConfirm',
      meta: {
        label: '确认件',
        parent_label: '成本管理',
        parent_path: '/control/cost',
        menu: 'control',
        permission: 'api/tuan/confirm_piece'
      }
    },
    // 计调操作-团队账单-确认件
    {
      path: '/control/cost/tconfirm',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'controlCostTConfirm',
      meta: {
        label: '确认件',
        parent_label: '团队账单',
        parent_path: '/control/bill',
        menu: 'control',
        permission: 'api/tuan/confirm_piece'
      }
    },
    // 计调操作-团队账单-确认件新
    {
      path: '/control/cost/tconfirm2',
      name: 'saleOrderTConfirmPdf',
      component: function (resolve) {
        require(['src/components/plan/income/income_confirm.vue'], resolve);
      },
      meta: {
        label: '确认件',
        parent_label: '团队账单',
        parent_path: '/control/bill',
        menu: 'control',
        permission: 'api/tuan/income_confirm_template'
      }
    },
    // 计调操作-收入管理-确认件
    {
      path: '/control/cost/iconfirm',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'controlCostIConfirm',
      meta: {
        label: '确认件',
        parent_label: '收入管理',
        parent_path: '/control/income',
        menu: 'control',
        permission: 'api/tuan/confirm_piece'
      }
    },
    // 计调操作-收入管理-直客合同
    {
      path: '/control/cost/confirm_hetong',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm_hetong.vue'], resolve);
      },
      name: 'ConfirmHetong',
      meta: {
        label: '合同',
        parent_label: '收入管理',
        parent_path: '/control/income',
        menu: 'control',
        permission: 'api/tuan/contract_detail'
      }
    },
    // 计调操作-团队账单-直客合同
    {
      path: '/control/cost/tconfirm_hetong',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm_hetong.vue'], resolve);
      },
      name: 'TConfirmHetong',
      meta: {
        label: '合同',
        parent_label: '团队账单',
        parent_path: '/control/bill',
        menu: 'control',
        permission: 'api/tuan/contract_detail'
      }
    },
    {
      path: '/group/index',
      component: function (resolve) {
        require(['src/components/plan/group/index.vue'], resolve);
      },
      name: 'GroupIndex',
      meta: {
        label: '选团入口',
        menu: 'group',
        permission: 'api/bpm/choose'
      }
    },
    // 删除没有使用页面 -- by qzhchen 2018-12-03
    // {
    //   path: '/group',
    //   component: function (resolve) {
    //     require(['src/components/plan/group/list.vue'], resolve);
    //   },
    //   name: 'Group',
    //   meta: {
    //     label: 'TDM行程',
    //     menu: 'group',
    //     permission: 'api/bpm/product'
    //   }
    // },
    // 计调操作-查看团队订单-同行订单
    {
      path: '/control/order/form',
      component: function (resolve) {
        require(['src/components/distribution/LineListOrder.vue'], resolve);
      },
      name: 'OrderForm',
      meta: {
        topMenuConst: 'operator',
        label: '订单管理',
        parent_label: '查看团队订单',
        parent_path: '/tuan-list',
        menu: 'control',
        permission: 'api/tuan/add_order'
      }
    },
    // 计调操作-团控中心-同行订单
    {
      path: '/tcontrol/order/form',
      component: function (resolve) {
        require(['src/components/distribution/LineListOrder.vue'], resolve);
      },
      name: 'tOrderForm',
      meta: {
        topMenuConst: 'operator',
        label: '订单管理',
        parent_label: '团控中心',
        parent_path: '/control',
        menu: 'control',
        permission: 'api/tuan/add_order'
      }
    },
    // 计调操作-查看团队订单-直客订单
    {
      path: '/zcontrol/order/form_zhike',
      component: function (resolve) {
        require(['src/components/distribution/LineListOrder.vue'], resolve);
      },
      name: 'zOrderFormZhike',
      meta: {
        topMenuConst: 'operator',
        isZhiKe: 1,
        label: '直客订单管理',
        parent_label: '查看团队订单',
        parent_path: '/tuan-list',
        menu: 'control',
        permission: 'api/tuan/add_zhike_order'
      }
    },
    // 计调操作-查看团队订单-直客订单
    {
      path: '/control/order/form_zhike',
      component: function (resolve) {
        require(['src/components/distribution/LineListOrder.vue'], resolve);
      },
      name: 'OrderFormZhike',
      meta: {
        topMenuConst: 'operator',
        isZhiKe: 1,
        label: '直客订单管理',
        parent_label: '团控中心',
        parent_path: '/control',
        menu: 'control',
        permission: 'api/tuan/add_zhike_order'
      }
    },
    {
      path: '/control/recruiting/:id/:type',
      component: function (resolve) {
        require(['src/components/plan/control/recruiting.vue'], resolve);
      },
      name: 'ControlRecruiting',
      meta: {
        label: '游客名单',
        parent_label: '团控中心',
        parent_path: '/control',
        menu: 'control',
        topMenuConst: 'operator',
        permission: 'api/tuan/tourist_lists'
      }
    },
    {
      path: '/control/operating/:id/:type',
      component: function (resolve) {
        require(['src/components/plan/control/operating.vue'], resolve);
      },
      name: 'ControlOperating',
      meta: {
        label: '团队操作记录',
        parent_label: '团控中心',
        parent_path: '/control',
        menu: 'control',
        permission: 'api/tuan/op_log'
      }
    },
    // 计调操作-查看团队订单-订单详情路由
    ... getOrderDetailRouter(
      '/control/',
      'Control',
      'operator',
      'control'
    ),
    /**
    // 计调操作-查看团队订单-订单详情
    {
      path: '/control/order-details/:parent_id/:id',
      component: function (resolve) {
        require(['src/components/distribution/LineOrderDetail.vue'], resolve);
      },
      name: 'ControlOrderDetails',
      meta: {
        label: '团队订单详情',
        parent_label: '查看团队订单',
        parent_path: '/tuan-list',
        menu: 'control',
        topMenuConst: 'operator',
        permission: 'api/tuan/bom_order_detail'
      }
    },
    {
      path: '/control/tuituanDetail',
      component: function (resolve) {
        require(['src/components/plan/control/tuituanDetail.vue'], resolve);
      },
      name: 'ControlTuituanDetail',
      meta: {
        label: '退团详情',
        parent_label: '团控中心',
        parent_path: '/control',
        menu: 'control',
        topMenuConst: 'operator',
        permission: 'api/tuan/operator_get_cancel_detail'
      }
    },
    // 团控中心-查看团队订单-订单详情-查看收入详情
    {
      path: '/control/income-detail',
      name: 'control-income-detail',
      component: function (resolve) {
        require(['src/components/finace/balance/income-detail.vue'], resolve);
      },
      meta: {
        label: '查看收入',
        topMenuConst: 'operator',
        // parent_label:'收款记录',
        // parent_path:'/fund-settlement/recieve-record',
        menu: 'control',
        permission: 'api/tuan/op_income_info'
      }
    },
    {
      path: '/control/recieve-detail',
      name: 'control-recieve-detail',
      component: function (resolve) {
        require(['src/components/finace/balance/recieve-detail.vue'], resolve);
        // require(['src/components/sale/ReceiveDetail.vue'], resolve);
      },
      meta: {
        label: '收款详情',
        isPlan: 1,
        topMenuConst: 'operator',
        // parent_label:'收款记录',
        // parent_path:'/fund-settlement/recieve-record',
        menu: 'control',
        permission: 'api/tuan/comein_get_gathering_info'
      }
    }, */
    {
      path: '/control/recieve-detail-add',
      name: 'control-recieve-detail-add',
      component: function (resolve) {
        require(['src/components/sale/recognition/peer-recog.vue'], resolve);
      },
      meta: {
        label: '添加认款',
        //  parent_label:'收款详情',
        //  parent_path:'/recieve-detail',
        // isPlan: 1,
        topMenuConst: 'operator',
        menu: 'control',
        permission: 'api/tuan/sale_renkuan_add'
      }
    },
    // 团控中心-团队账单
    {
      path: '/control/bill',
      component: function (resolve) {
        require(['src/components/plan/control/bill.vue'], resolve);
      },
      name: 'cControlBill',
      meta: {
        label: '团队账单',
        parent_label: '团控中心',
        parent_path: '/control',
        topMenuConst: 'operator',
        menu: 'control',
        permission: 'api/finance/bill_detail'
      }
    },
    // 计调操作-团控中心-团队账单
    // 该路由与“计调操作-查看团队订单-订单详情路由”中的adjustment-detail重复，进行合并 by qzhchen 20180928
    // {
    //   path: '/control/ControlAdjustmentDetail',
    //   component: function (resolve) {
    //     // require(['src/components/finace/accountAdjustmentDetail'], resolve);
    //     require(['src/components/sale/AdjustmentDetail.vue'], resolve);
    //   },
    //   name: 'ControlAdjustmentDetail',
    //   meta: {
    //     label: '审核调账详情',
    //     // parent_label:'成本管理',
    //     // parent_path:'/control/cost',
    //     topMenuConst: 'operator',
    //     menu: 'control',
    //     permission: 'api/tuan/adjustment_detail'
    //   }
    // },
    {
      path: '/tuan-list',
      name: 'tuan-list',
      component: function (resolve) {
        require(['src/components/plan/tuan-list.vue'], resolve);
      },
      meta: {
        label: '查看团队订单',
        parent_label: '团控中心',
        parent_path: '/control/index',
        menu: 'control',
        topMenuConst: 'operator',
        permission: 'api/tuan/order_lists'
      }
    },
    {
      path: '/control/cost/iconfirm2',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm.vue'], resolve);
      },
      name: 'Confirm2',
      meta: {
        label: '确认件',
        parent_label: '查看团队订单',
        parent_path: '/tuan-list',
        menu: 'control',
        permission: 'api/tuan/confirm_piece'
      }
    },
    // 该路由与“计调操作-查看团队订单-订单详情路由”重复，进行合并 by qzhchen 20180927
    // 产品确认件pdf
    // {
    //   path: '/order/productConfirm',
    //   name: 'productConfirm',
    //   component: function (resolve) {
    //     require(['src/components/plan/control/product_confirm.vue'], resolve);
    //   },
    //   meta: {
    //     label: '产品确认件',
    //     topMenuConst: 'operator',
    //     menu: 'control',
    //     permission: 'api/tuan/confirm_piece,api/tuan/order_confirm_template'
    //   }
    // },
    // 计调操作——订单确认件pdf
    {
      path: '/control/cost/comfirmDownloadPdf',
      name: 'comfirmDownloadPdf',
      component: function (resolve) {
        require(['src/components/plan/cost/confirm_downloadpdf.vue'], resolve);
      },
      meta: {
        label: '确认件模版',
        parent_label: '成本管理',
        parent_path: '/control/cost',
        menu: 'control',
        permission: 'api/tuan/cost_confirm_template'
      }
    },
    // 计调操作—团控中心-收入管理—（手动添加）确认件pdf
    {
      path: '/control/income/incomeConfirm',
      name: 'incomeConfirm',
      component: function (resolve) {
        require(['src/components/plan/income/income_confirm.vue'], resolve);
      },
      meta: {
        label: '产品确认件',
        parent_label: '收入管理',
        parent_path: '/control/income',
        menu: 'control',
        permission: 'api/tuan/income_confirm_template'
      }
    },
    // 计调操作
    {
      path: 'tripListIndex',
      name: 'tripListIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '本公司行程',
        menu: 'group',
        permission: 'api/product,api/product/supplier_product_lists,api_supplier/product/lists,api/intention/get_intent_list',
        paths: '/trip,/supplierTrip,/lineTrip,/plan/customized-demand'
      }
    },
    // 本公司行程列表
    {
      path: '/trip',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-list.vue'], resolve);
      },
      name: 'trip',
      meta: {
        label: '本公司行程',
        menu: 'group',
        topMenuConst: 'operator',
        permission: 'api/product'
      }
    },
    // 供应商行程
    {
      path: '/supplierTrip',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-list.vue'], resolve);
      },
      name: 'supplierTrip',
      meta: {
        label: '供应商行程',
        menu: 'group',
        topMenuConst: 'operator-supplier',
        permission: 'api/product/supplier_product_lists'
      }
    },
    // 线路行程
    {
      path: '/lineTrip',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-list.vue'], resolve);
      },
      name: 'lineTrip',
      meta: {
        label: '线路行程',
        menu: 'group',
        topMenuConst: 'supplier',
        permission: 'api_supplier/product/lists'
      }
    },
    // 分公司-新增行程
    {
      path: '/addNewTrip',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-trip.vue'], resolve);
      },
      name: 'addNewTrip',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'operator',
        parent_label: '本公司行程',
        parent_path: '/trip',
        permission: 'api/product/do_easy_step1'
      }
    },
    // 供应商-新增行程
    {
      path: '/supplierAddNewTrip',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-trip.vue'], resolve);
      },
      name: 'supplierAddNewTrip',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'supplier',
        parent_label: '线路行程',
        parent_path: '/lineTrip',
        permission: 'api_supplier/product/do_step1'
      }
    },
    // 分公司简易开团第二步
    {
      path: '/addNewEasyTrip',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-easytrip.vue'], resolve);
      },
      name: 'addNewEasyTrip',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'operator',
        parent_label: '本公司行程',
        parent_path: '/trip',
        permission: 'api/product/do_easy_step2'
      }
    },
    // 供应商简易开团第二步
    {
      path: '/supplierAddNewEasyTrip',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-easytrip.vue'], resolve);
      },
      name: 'supplierAddNewEasyTrip',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'supplier',
        parent_label: '线路行程',
        parent_path: '/lineTrip',
        permission: 'api_supplier/product/do_easy_step1'
      }
    },
    // 分公司完善信息
    {
      path: '/addNewTrip2',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-trip2.vue'], resolve);
      },
      name: 'addNewTrip2',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'operator',
        parent_label: '本公司行程',
        parent_path: '/trip',
        permission: 'api/product/do_step2'
      }
    },
    // 供应商完善信息
    {
      path: '/supplierAddNewTrip2',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-trip2.vue'], resolve);
      },
      name: 'supplierAddNewTrip2',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'supplier',
        parent_label: '线路行程',
        parent_path: '/lineTrip',
        permission: 'api_supplier/product/do_step2'
      }
    },
    // 分公司完善说明
    {
      path: '/addNewTrip3',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-trip3.vue'], resolve);
      },
      name: 'addNewTrip3',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'operator',
        parent_label: '本公司行程',
        parent_path: '/trip',
        permission: 'api/product/do_step3'
      }
    },
    // 供应商完善说明
    {
      path: '/supplierAddNewTrip3',
      component: function (resolve) {
        require(['src/components/plan/trip/add-new-trip3.vue'], resolve);
      },
      name: 'supplierAddNewTrip3',
      meta: {
        label: '编辑行程',
        menu: 'group',
        topMenuConst: 'supplier',
        parent_label: '线路行程',
        parent_path: '/lineTrip',
        permission: 'api_supplier/product/do_step3'
      }
    },
    // 该路由与“计调操作-查看团队订单-订单详情路由”重复，进行合并 by qzhchen 20180927
    // 分公司查看行程详情
    {
      path: '/tripDetail',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-detail.vue'], resolve);
      },
      name: 'tripDetail',
      meta: {
        label: '行程详情',
        menu: 'group',
        topMenuConst: 'operator',
        parent_label: '本公司行程',
        parent_path: '/trip',
        permission: 'api/product/detail'
      }
    },
    // 供应商查看行程详情
    {
      path: '/supplierTripDetail',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-detail.vue'], resolve);
      },
      name: 'supplierTripDetail',
      meta: {
        label: '行程详情',
        menu: 'group',
        topMenuConst: 'supplier',
        permission: 'api_supplier/product/detail'
      }
    },
    {
      path: '/invoice/tripDetail',
      component: function (resolve) {
        require(['src/components/plan/trip/trip-detail.vue'], resolve);
      },
      name: 'invoicetripDetail',
      meta: {
        label: '行程详情',
        menu: 'planOrderList',
        topMenuConst: 'operator',
        // parent_label:'本公司行程',
        // parent_path:'/trip',
        permission: 'api/product/detail'
      }
    },
    // 分公司团期报价
    {
      path: '/bids',
      component: function (resolve) {
        require(['src/components/plan/trip/bids.vue'], resolve);
      },
      name: 'bids',
      meta: {
        label: '团期报价',
        menu: 'group',
        topMenuConst: 'operator',
        // parent_label: '本公司行程',
        // parent_path: '/trip',
        permission: 'api/product/do_price_type'
      }
    },
    // 分公司团期报价
    {
      path: '/supplierBids',
      component: function (resolve) {
        require(['src/components/plan/trip/bids.vue'], resolve);
      },
      name: 'supplierBids',
      meta: {
        label: '团期报价',
        menu: 'group',
        topMenuConst: 'supplier',
        // parent_label: '本公司行程',
        // parent_path: '/trip',
        permission: 'api_supplier/product/do_price_type'
      }
    },
    // 供应商管理-审批单
    {
      path: 'approval-detail',
      name: 'supplierOpApprovalDetail',
      component: function (resolve) {
        require(['src/components/system/approval/detail.vue'], resolve);
      },
      meta: {
        label: '审批单',
        menu: 'group',
        permission: 'api/approval/approval_detail'
      }
    },
    // 发布渠道（TDM）详情
    {
      path: '/tdmDetail',
      component: function (resolve) {
        require(['src/components/plan/trip/tdm-detail.vue'], resolve);
      },
      name: 'tdmDetail',
      meta: {
        label: '完善信息',
        menu: 'group',
        parent_label: '本公司行程',
        parent_path: '/trip',
        permission: 'api/product/do_price_type'
      }
    },
    // 定制需求
    {
      path: 'customized-demand',
      name: 'planCustomizedDemand',
      component: function (resolve) {
        require(['src/components/plan/CustomizedDemand.vue'], resolve);
      },
      meta: {
        label: '定制需求',
        menu: 'group',
        permission: 'api/intention/get_intent_list'
      }
    },
    {
      path: 'customized-demand/detail',
      name: 'planCustomizedDemandDetail',
      component: function (resolve) {
        require(['src/components/plan/CustomizedDemandDetail.vue'], resolve);
      },
      meta: {
        label: '定制需求详情',
        menu: 'group',
        parent_label:'定制需求',
        parent_path:'/plan/customized-demand',
        permission: 'api/intention/add_intention'
      }
    },
    /** 暂时没有使用 qzh -- 20180327 */
    // 计调操作-线路行程-bom行程-渠道操作
    // {
    //   path: '/trip/channel',
    //   name: 'planTripChannel',
    //   component: function (resolve) {
    //     require(['src/components/plan/trip/channel.vue'], resolve);
    //   },
    //   meta: {
    //     label: '渠道操作',
    //     parent_label:'本公司行程',
    //     parent_path:'/trip',
    //     menu: 'group',
    //     permission: 'api/product/channel_operation'
    //   }
    // },
    // 计调操作-团控中心-收款记录—添加收款
    {
      path: '/control/income/receipt',
      name: 'planAddPeerReceive',
      component: function (resolve) {
        require(['src/components/finace/balance/recieve-edit.vue'], resolve);
      },
      meta: {
        isPlan: 1,
        label: '添加收款',
        // parent_label:'收入管理',
        // parent_path:'/control/income',
        menu: 'control',
        permission: 'api/tuan/operator_add_receipt'
      }
    },
    {
      path: '/control/control-approval-detail',
      name: 'controlApprovalDetail',
      component: function (resolve) {
        require(['src/components/system/approval/detail.vue'], resolve);
      },
      meta: {
        label: '审批单',
        menu: 'control',
        permission: 'api/approval/approval_detail'
      }
    },
    // 计调操作-团控中心-收款记录
    {
      path: '/control/receipt-list',
      name: 'planReceiptList',
      component: function (resolve) {
        require(['src/components/sale/recognition/peer-proceeds.vue'], resolve);
      },
      meta: {
        topMenuConst: 'operator',
        label: '收款记录',
        parent_label: '团控中心',
        parent_path: '/control',
        menu: 'control',
        btnPath: '/control/income/receipt?action=1',
        btnName: '+ 添加收款',
        btnPermission: 'api/tuan/operator_add_receipt',
        btnQueryMap: { parent_id: 'tuan_id' },
        permission: 'api/tuan/op_receipt_list'
      }
    },
    // 计调操作-团队订单
    {
      path: 'order-list',
      name: 'planOrderList',
      component: function (resolve) {
        require(['src/components/plan/OrderList.vue'], resolve);
      },
      meta: {
        isPlan: 1,
        label: '团队订单',
        menu: 'planOrderList',
        permission: 'api/tuan/op_order_list'
      }
    },
    // 计调操作-团队订单-订单详情路由
    ... getOrderDetailRouter(
      'order-list/',
      'PlanOrderList',
      'operator',
      'planOrderList'
    ),
    // 计调操作-订单管理-订单详情
    // {
    //   path: 'order-list/detail/:parent_id/:id',
    //   component: function (resolve) {
    //     require(['src/components/distribution/LineOrderDetail.vue'], resolve);
    //   },
    //   name: 'planOrderListDetail',
    //   meta: {
    //     label: '订单详情',
    //     parent_label: '订单管理',
    //     parent_path: '/plan/order-list',
    //     menu: 'planOrderList',
    //     topMenuConst: 'operator',
    //     permission: 'api/tuan/bom_order_detail'
    //   }
    // },
    // {
    //   path: 'order-list/tuituanDetail',
    //   component: function (resolve) {
    //     require(['src/components/plan/control/tuituanDetail.vue'], resolve);
    //   },
    //   name: 'planOrderListTuituanDetail',
    //   meta: {
    //     label: '退团详情',
    //     parent_label: '订单管理',
    //     parent_path: '/plan/order-list',
    //     menu: 'planOrderList',
    //     topMenuConst: 'operator',
    //     permission: 'api/tuan/operator_get_cancel_detail'
    //   }
    // },
    {
      path: '/plan/planinvoice',
      name: 'planInvoice',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        menu: 'planInvoice',
        permission: 'api/invoice/income_lists',
        paths: '/plan/planinvoice/income'
      }
    },
    // 计调操作-发票管理-收入发票(列表、新增、详情三页面)
    {
      path: 'planinvoice/income',
      name: 'planInvoiceIncome',
      component: function (resolve) {
        require(['src/components/plan/invoice/invoice_income.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        menu: 'planInvoice',
        permission: 'api/invoice/income_lists'
      }
    },
    // 计调操作-发票管理-收入发票-订单详情 路由
    ... getOrderDetailRouter(
      'planinvoice/',
      'PlanInvoice',
      'operator',
      'planInvoice'
    ),
    // 该路由与“计调操作-发票管理-收入发票-订单详情路由”重复，进行合并 by qzhchen 20180928
    // {
    //   path: 'planinvoice/addInvoice',
    //   component: function (resolve) {
    //     require(['src/components/plan/invoice/add_invoice.vue'], resolve);
    //   },
    //   name: 'planaddInvoice',
    //   meta: {
    //     label: '申请开票',
    //     menu: 'planInvoice',
    //     permission: 'api/invoice/todo_add_income'
    //   }
    // },
    // 该路由与“计调操作-查看团队订单-订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: 'planinvoice/addInvoice1',
    //   component: function (resolve) {
    //     require(['src/components/plan/invoice/add_invoice.vue'], resolve);
    //   },
    //   name: 'planaddInvoice1',
    //   meta: {
    //     label: '申请开票',
    //     menu: 'planOrderList',
    //     permission: 'api/invoice/todo_add_income'
    //   }
    // },
    // 该路由与“计调操作-发票管理-收入发票-订单详情路由”重复，进行合并 by qzhchen 20180928
    // {
    //   path: 'planinvoice/invoice_detail',
    //   name: 'planinvoiceInDetail',
    //   component: function (resolve) {
    //     require(['src/components/plan/invoice/invoice_detail.vue'], resolve);
    //   },
    //   meta: {
    //     label: '收入发票详情',
    //     parent_label: '发票管理',
    //     parent_path: '/plan/planinvoice/income',
    //     topMenuConst: 'operator',
    //     menu: 'planInvoice',
    //     permission: 'api/invoice/income_detail'
    //   }
    // },
    // 该路由与“计调操作-查看团队订单-订单详情路由”重复，进行合并 by qzhchen 20180927
    // {
    //   path: 'planinvoice/invoice_detail1',
    //   name: 'planinvoiceInDetail1',
    //   component: function (resolve) {
    //     require(['src/components/plan/invoice/invoice_detail.vue'], resolve);
    //   },
    //   meta: {
    //     label: '收入发票详情',
    //     // parent_label:'发票管理',
    //     // parent_path:'/plan/planinvoice/income',
    //     menu: 'planOrderList',
    //     topMenuConst: 'operator',
    //     permission: 'api/invoice/income_detail'
    //   }
    // },
    // 计调操作-发票管理-成本回票(列表、上传、详情三页面)
    {
      path: 'planinvoice/cost',
      name: 'planInvoiceCost',
      component: function (resolve) {
        require(['src/components/plan/invoice/cost_list.vue'], resolve);
      },
      meta: {
        label: '发票管理',
        menu: 'planInvoice',
        topMenuConst: 'operator',
        permission: 'api/invoice/cost_lists'
      }
    },
    {
      path: 'planinvoice/cost_add',
      name: 'planInvoiceCoAdd',
      component: function (resolve) {
        require(['src/components/plan/invoice/cost_add.vue'], resolve);
      },
      meta: {
        label: '上传成本票',
        menu: 'planInvoice',
        topMenuConst: 'operator',
        permission: 'api/invoice/add_cost'
      }
    },
    {
      path: 'planinvoice/cost_detail',
      name: 'planInvoiceCoDetail',
      component: function (resolve) {
        require(['src/components/plan/invoice/cost_detail.vue'], resolve);
      },
      meta: {
        label: '成本回票详情',
        parent_label: '发票管理',
        parent_path: '/plan/planinvoice/cost',
        menu: 'planInvoice',
        topMenuConst: 'operator',
        permission: 'api/invoice/cost_detail'
      }
    },
    // 计调-收款付款
    {
      path: 'applied',
      name: 'applied',
      component: function (resolve) {
        require(['src/components/plan/applied/appliedList.vue'], resolve);
      },
      meta: {
        label: '收款付款',
        menu: 'planApplied',
        topMenuConst: 'operator',
        permission: 'api/tuan/applied_list'
      }
    },
    // 计调-收款付款详情
    {
      path: 'applied-detial',
      name: 'appliedDetail',
      component: function (resolve) {
        require(['src/components/plan/applied/appliedDetail.vue'], resolve);
      },
      meta: {
        label: '收款付款详情',
        menu: 'planApplied',
        topMenuConst: 'operator',
        permission: 'api/tuan/applied_detail'
      }
    },
    // 计调-团控中心-添加成本-批量请款
    {
      path: 'applied-add',
      name: 'appliedAdd',
      component: function (resolve) {
        require(['src/components/plan/applied/appliedAdd.vue'], resolve);
      },
      meta: {
        label: '申请付款',
        menu: 'planApplied',
        topMenuConst: 'operator',
        permission: 'api/tuan/applied_add_payment'
      }
    },
    {
      path: 'single-order',
      name: 'PlanSingleOrder',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '单项订单',
        menu: 'planSingleOrder',
        permission: 'api/hotel/orderList/1,api/ticket/order_list/2,api/flight/order_list/2,api/selfsupport.visaorder/op_order_list,api/selfsupport.localproductorder/lists,api/train/train_order_list',
        paths: 'single-hotel-order,single-ticket-order,single-flight-order,single-train-order,single-visa-order,single-local-product-order'
      }
    },
    {
      path: 'selfsupport-order',
      name: 'PlanSelfSupportOrder',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '自营订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/hotel/orderList/3,api/selfsupport.visaorder/op_self_order_list,api/selfsupport.localproductorder/self_lists,api/ticket/order_list/3',
        paths: 'selfsupport-hotel-order,visa-selfsupport-order,selfsupport-local-product-order,selfsupport-ticket-order'
      }
    },
    {
      path: 'single-visa-order',
      component (reslove) {
        require(['src/components/distribution/VisaOrder.vue'], reslove);
      },
      name: 'PlanSingleVisaOrder',
      meta: {
        topMenuConst: 'operator',
        label: '签证订单',
        menu: 'planSingleOrder',
        permission: 'api/selfsupport.visaorder/op_order_list'
      }
    },
    ... getVisaDetailRouter('single-visa-order/', 'PlanSingle', 'operator', 'planSingleOrder', '单项订单', '/plan/single-visa-order'),
    {
      path: 'visa-selfsupport-order',
      component (reslove) {
        require(['src/components/distribution/VisaOrder.vue'],reslove);
      },
      name: 'PlanSelfSupportVisaOrder',
      meta: {
        topMenuConst: 'operator',
        label: '签证订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/selfsupport.visaorder/op_self_order_list'
      }
    },
    ... getVisaDetailRouter('visa-selfsupport-order/', 'PlanSelfSupport', 'operator', 'planSelfSupportOrder', '自营订单', '/plan/visa-selfsupport-order'),
    ... getLocalProductDetailRouter('single-local-product-order/', 'PlanSingleLocalProduct', 'operator', 'planSingleOrder', '单项订单', '/plan/single-local-product-order'),
    {
      path: 'single-local-product-order',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrder.vue'],reslove);
      },
      name: 'PlanSingleLocalProductOrder',
      meta: {
        topMenuConst: 'operator',
        label: '农特优订单',
        menu: 'planSingleOrder',
        permission: 'api/selfsupport.localproductorder/lists'
      }
    },
    {
      path: 'single-local-product-order/detail',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'PlanSingleLocalProductOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '农特优订单',
        menu: 'planSingleOrder',
        permission: 'api/selfsupport.localproductorder/op_detail'
      }
    },
    {
      path: 'single-local-product-order/refund',
      component (reslove) {
        require(['src/components/distribution/LocalProductRefund.vue'], reslove);
      },
      name: 'PlanSingleLocalProductRefund',
      meta: {
        topMenuConst: 'operator',
        label: '农特优订单',
        menu: 'planSingleOrder',
        permission: 'api/selfsupport.localproductorder/refund_detail'
      }
    },
    ... getLocalProductDetailRouter('selfsupport-local-product-order/', 'PlanSelfLocalProduct', 'operator', 'planSelfSupportOrder', '自营订单', '/plan/selfsupport-local-product-order'),
    {
      path: 'selfsupport-local-product-order',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrder.vue'],reslove);
      },
      name: 'selfsupportLocalProductOrder',
      meta: {
        topMenuConst: 'operator',
        label: '农特优订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/selfsupport.localproductorder/self_lists'
      }
    },
    {
      path: 'selfsupport-local-product-order/detail',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'selfsupportLocalProductOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '农特优订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/selfsupport.localproductorder/op_detail'
      }
    },
    {
      path: 'selfsupport-local-product-order/refund',
      component (reslove) {
        require(['src/components/distribution/LocalProductRefund.vue'], reslove);
      },
      name: 'selfsupportLocalProductRefund',
      meta: {
        topMenuConst: 'operator',
        label: '农特优订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/selfsupport.localproductorder/refund_detail'
      }
    },
    {
      path: 'single-flight-order',
      component (reslove) {
        require(['src/components/distribution/FlightOrderList.vue'],reslove);
      },
      name: 'DistributionFlightSingleOrder',
      meta: {
        topMenuConst: 'operator',
        label: '机票订单',
        menu: 'planSingleOrder',
        permission: 'api/flight/order_list/2'
      }
    },
    {
      path: 'single-flight-order/detail',
      component (reslove) {
        require(['src/components/distribution/FlightOrderDetail.vue'],reslove);
      },
      name: 'DistributionFlightSingleOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '机票订单',
        menu: 'planSingleOrder',
        permission: 'api/flight/order_detail'
      }
    },
    ...getReceiveDetailRouter('single-flight-order/', 'DistributionFlightSingleOrder', 'operator', 'planSingleOrder'),
    {
      path: 'single-flight-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/FlightOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionFlightSingleOrderRefundDetail',
      meta: {
        topMenuConst: 'operator',
        label: '机票订单',
        menu: 'planSingleOrder',
        permission: 'api/flight/refund_detail'
      }
    },
    {
      path: 'single-ticket-order',
      component (reslove) {
        require(['src/components/distribution/TicketOrderList.vue'],reslove);
      },
      name: 'DistributionTicketSingleOrder',
      meta: {
        topMenuConst: 'operator',
        label: '门票订单',
        menu: 'planSingleOrder',
        permission: 'api/ticket/order_list/2'
      }
    },
    {
      path: 'single-ticket-order/detail',
      component (reslove) {
        require(['src/components/distribution/TicketOrderDetail.vue'],reslove);
      },
      name: 'DistributionTicketSingleOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '门票订单',
        menu: 'planSingleOrder',
        permission: 'api/ticket/order_detail/2'
      }
    },
    ...getReceiveDetailRouter('single-ticket-order/', 'DistributionTicketSingleOrder', 'operator', 'planSingleOrder'),
    {
      path: 'single-ticket-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/TicketOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionTicketSingleOrderRefundDetail',
      meta: {
        topMenuConst: 'operator',
        label: '门票订单',
        menu: 'planSingleOrder',
        permission: 'api/ticket/refund_detail'
      }
    },
    {
      path: 'selfsupport-ticket-order',
      component (reslove) {
        require(['src/components/distribution/TicketOrderList.vue'],reslove);
      },
      name: 'TicketSelfSupportOrder',
      meta: {
        topMenuConst: 'operator',
        label: '门票订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/ticket/order_list/3'
      }
    },
    {
      path: 'selfsupport-ticket-order/detail',
      component (reslove) {
        require(['src/components/distribution/TicketOrderDetail.vue'],reslove);
      },
      name: 'TicketSelfSupportOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '门票订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/ticket/order_detail/3'
      }
    },
    ...getReceiveDetailRouter('selfsupport-ticket-order/', 'TicketSelfSupportOrder', 'operator', 'planSelfSupportOrder'),
    {
      path: 'selfsupport-ticket-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/TicketOrderRefundDetail.vue'],reslove);
      },
      name: 'TicketSelfSupportOrderRefundDetail',
      meta: {
        topMenuConst: 'operator',
        label: '门票订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/ticket/refund_detail'
      }
    },
    {
      path: 'single-hotel-order',
      component (reslove) {
        require(['src/components/distribution/HotelOrderList.vue'],reslove);
      },
      name: 'DistributionHotelSingleOrder',
      meta: {
        topMenuConst: 'operator',
        label: '酒店订单',
        menu: 'planSingleOrder',
        permission: 'api/hotel/orderList/1'
      }
    },
    {
      path: 'selfsupport-hotel-order',
      component (reslove) {
        require(['src/components/distribution/HotelOrderList.vue'],reslove);
      },
      name: 'DistributionHotelSelfSupportOrder',
      meta: {
        topMenuConst: 'operator',
        label: '酒店订单',
        menu: 'planSelfSupportOrder',
        permission: 'api/hotel/orderList/3'
      }
    },
    {
      path: 'single-hotel-order/detail',
      component (reslove) {
        require(['src/components/distribution/HotelOrderDetail.vue'],reslove);
      },
      name: 'DistributionHotelSingleOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '酒店订单详情',
        menu: 'planSingleOrder',
        permission: 'api/hotel/orderDetail/1'
      }
    },
    ...getReceiveDetailRouter('single-hotel-order/', 'DistributionHotelSingleOrder', 'operator', 'planSingleOrder'),
    {
      path: 'selfsupport-hotel-order/detail',
      component (reslove) {
        require(['src/components/distribution/HotelOrderDetail.vue'],reslove);
      },
      name: 'DistributionHotelSelfSupportOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '酒店订单详情',
        menu: 'planSelfSupportOrder',
        permission: 'api/hotel/orderDetail/3'
      }
    },
    ...getReceiveDetailRouter('selfsupport-hotel-order/', 'DistributionHotelSelfSupportOrder', 'operator', 'planSelfSupportOrder'),
    {
      path: 'single-hotel-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionHotelSingleOrderRefundDetail',
      meta: {
        topMenuConst: 'operator',
        label: '酒店退款详情',
        menu: 'planSingleOrder',
        permission: 'api/hotel/refundDetail/1'
      }
    },
    {
      path: 'selfsupport-hotel-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionHotelSelfSupportOrderRefundDetail',
      meta: {
        topMenuConst: 'operator',
        label: '酒店退款详情',
        menu: 'planSelfSupportOrder',
        permission: 'api/hotel/refundDetail/3'
      }
    },
    {
      path: 'single-train-order',
      component (reslove) {
        require(['src/components/distribution/TrainOrderList.vue'],reslove);
      },
      name: 'DistributionTrainSingleOrder',
      meta: {
        topMenuConst: 'operator',
        label: '火车票订单',
        menu: 'planSingleOrder',
        permission: 'api/train/train_order_list'
      }
    },
    {
      path: 'single-train-order/detail',
      component (reslove) {
        require(['src/components/distribution/TrainOrderDetail.vue'],reslove);
      },
      name: 'DistributionTrainSingleOrderDetail',
      meta: {
        topMenuConst: 'operator',
        label: '火车票订单详情',
        menu: 'planSingleOrder',
        permission: 'api/train/order_detail'
      }
    },
    ...getReceiveDetailRouter('single-train-order/', 'DistributionTrainSingleOrder', 'operator', 'planSingleOrder'),
    {
      path: 'single-train-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/TrainOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionTrainSingleOrderRefundDetail',
      meta: {
        topMenuConst: 'operator',
        label: '火车票退款详情',
        menu: 'planSingleOrder',
        permission: 'api/train/refund_detail'
      }
    }
  ]
};

export default OPERATE_ROUTE;