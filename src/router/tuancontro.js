// 团控中心
import Home from 'src/layouts/';

import {
  getReceiveDetailRouter,
  getOrderDetailRouter,
  getVisaDetailRouter,
  getLocalProductDetailRouter
} from './compose-router';

const TUANCONTRO_ROUTE = {
  path: '/tuancontro',
  component: Home,
  name: 'tuancontro',
  meta: {
    label: '团控中心'
  },
  children: [
    // 线路团控列表
    {
      path: 'list-line',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineList.vue'], resolve);
      },
      name: 'ControlListline',
      meta: {
        label: '线路团控',
        menu: 'TuancontroLine',
        permission: 'tuancontro/line'
      }
    },
    // 成本列表
    {
      path: 'cost',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineCostList.vue'], resolve);
      },
      name: 'Cost',
      meta: {
        label: '成本管理',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/costlist'
      }
    },
    // 添加成本表单页
    {
      path: 'cost-add',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineCostAdd.vue'], resolve);
      },
      name: 'CostAdd',
      meta: {
        label: '编辑成本',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/costadd'
      }
    },
    // 成本详情
    {
      path: 'cost/detail',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineCostDetail.vue'], resolve);
      },
      name: 'PlanCostDetail',
      meta: {
        label: '成本详情',
        topMenuConst: 'tuancontro',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/costlist/detail'
      }
    },
    // 成本列表-上传确认件
    {
      path: 'cost/confirm',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineConfirm.vue'], resolve);
      },
      name: 'controlCostConfirm',
      meta: {
        label: '确认件',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/costlist/updateSure'
      }
    },
    // 成本列表——订单确认件模板
    {
      path: 'cost/comfirmDownloadPdf',
      name: 'comfirmDownloadPdf',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineConfirmDownloadpdf.vue'], resolve);
      },
      meta: {
        label: '确认件模版',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/costlist/suredetail'
      }
    },
    // 收入列表
    {
      path: 'income',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineIncomelist.vue'], resolve);
      },
      name: 'Income',
      meta: {
        label: '收入管理',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/incomelist'
      }
    },
    ... getReceiveDetailRouter(
      'income/',
      'ControlIncome',
      'tuancontro/line/incomelist/',
      'tuancontro',
      'TuancontroLine',
      '线路团控',
      '/tuancontro/list-line'
    ),
    // 游客名单
    {
      path: 'recruiting/:id/:type',
      component: function (resolve) {
        require(['src/pages/tuancontro/Recruiting.vue'], resolve);
      },
      name: 'TuancontroRecruiting',
      meta: {
        label: '游客名单',
        menu: 'TuancontroLine',
        topMenuConst: 'tuancontro',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/touristlist'
      }
    },
    // 所有订单
    {
      path: 'tuan-list',
      name: 'tuan-list',
      component: function (resolve) {
        require(['src/pages/tuancontro/TuanOrderList.vue'], resolve);
      },
      meta: {
        label: '查看团队订单',
        menu: 'TuancontroLine',
        topMenuConst: 'tuancontro',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/tuanorder'
      }
    },
    // 计调操作-查看团队订单-订单详情路由 // 跳转到旅游线路的线路订单
    // ... getOrderDetailRouter(
    //   '/control/',
    //   'Control',
    //   'operator',
    //   'control'
    // ),
    {
      path: 'operating/:id/:type',
      component: function (resolve) {
        require(['src/pages/tuancontro/Operating.vue'], resolve);
      },
      name: 'tuancontroOperating',
      meta: {
        label: '团队操作记录',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/oprec'
      }
    },
    // 团队订单
    {
      path: 'bill',
      component: function (resolve) {
        require(['src/components/TuanBill.vue'], resolve);
      },
      name: 'cControlBill',
      meta: {
        label: '团队账单',
        topMenuConst: 'tuancontro',
        menu: 'TuancontroLine',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        permission: 'tuancontro/line/tuanacc'
      }
    },
    {
      path: 'billIncomeCostUpdate',
      component: function (resolve) {
        require(['src/pages/tuancontro/BillIncomeCostUpdate.vue'], resolve);
      },
      name: 'PlanBillIncomeCostUpdate',
      meta: {
        label: '调整团账',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        topMenuConst: 'tuancontro',
        menu: 'TuancontroLine',
        permission: 'tuancontro/line/tuanaccop/applychgaccount'
      }
    },
    ... getReceiveDetailRouter(
      'bill/',
      'cControlBill',
      'tuancontro/line/incomelist/',
      'tuancontro',
      'TuancontroLine',
      '线路团控',
      '/tuancontro/list-line'
    ),
    // 收款记录
    {
      path: 'receipt-list',
      name: 'planReceiptList',
      component: function (resolve) {
        require(['src/pages/tuancontro/PeerProceeds.vue'], resolve);
      },
      meta: {
        topMenuConst: 'tuancontro',
        label: '收款记录',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        menu: 'TuancontroLine',
        btnPath: '/settlement/recpay/receive-edit?action=1',
        btnName: '+ 添加收款',
        btnPermission: 'settlement/recpay/recei/addrecei',
        btnQueryMap: { tuan_id: 'tuan_id' },
        permission: 'tuancontro/line/recerec'
      }
    },
    //团控中心-添加成本-批量请款
    {
      path: 'applied-add',
      name: 'appliedAdd',
      component: function (resolve) {
        require(['src/pages/tuancontro/AppliedAdd.vue'], resolve);
      },
      meta: {
        label: '申请付款',
        parent_label:'线路团控',
        parent_path:'/tuancontro/list-line',
        menu: 'TuancontroLine',
        topMenuConst: 'tuancontro',
        permission: 'tuancontro/line/costlist/addpayment'
      }
    },
    //单项团控列表
    {
      path: 'single',
      component: function (resolve) {
        require(['src/pages/tuancontro/SingleList.vue'], resolve);
      },
      name: 'ControlSingle',
      meta: {
        label: '单项团控',
        menu: 'TuancontroSingle',
        permission: 'tuancontro/single'
      }
    },
    // 成本列表
    {
      path: 'single/cost',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineCostList.vue'], resolve);
      },
      name: 'TuancontroSingleCost',
      meta: {
        label: '成本管理',
        menu: 'TuancontroSingle',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/costlist'
      }
    },
    // 添加成本表单页
    {
      path: 'single/cost-add',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineCostAdd.vue'], resolve);
      },
      name: 'TuancontroSingleCostAdd',
      meta: {
        label: '添加成本',
        menu: 'TuancontroSingle',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/costlist/aecost'
      }
    },
    // 成本详情
    {
      path: 'single/cost/detail',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineCostDetail.vue'], resolve);
      },
      name: 'TuancontroSinglePlanCostDetail',
      meta: {
        label: '成本详情',
        topMenuConst: 'tuancontro',
        menu: 'TuancontroLine',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/costlist/detail'
      }
    },
    // 成本列表-上传确认件
    {
      path: 'single/cost/confirm',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineConfirm.vue'], resolve);
      },
      name: 'TuancontroSingleCostConfirm',
      meta: {
        label: '确认件',
        menu: 'TuancontroSingle',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/costlist/updateSure'
      }
    },
    // 成本列表——订单确认件模板
    {
      path: 'single/cost/comfirmDownloadPdf',
      name: 'TuancontroSingleComfirmDownloadPdf',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineConfirmDownloadpdf.vue'], resolve);
      },
      meta: {
        label: '确认件模版',
        menu: 'TuancontroSingle',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/costlist/suredetail'
      }
    },
    // 收入列表
    {
      path: 'single/income',
      component: function (resolve) {
        require(['src/pages/tuancontro/LineIncomelist.vue'], resolve);
      },
      name: 'TuancontroSingleIncome',
      meta: {
        label: '收入管理',
        menu: 'TuancontroSingle',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/incomelist'
      }
    },
    ... getReceiveDetailRouter(
      'single/income/',
      'TuancontroSingle',
      'tuancontro/single/incomelist/',
      'tuancontro',
      'TuancontroSingle',
      '单项团控',
      '/tuancontro/single'
    ),
    // 所有订单
    {
      path: 'single/tuan-list',
      name: 'TuancontroSingleTuanOrder',
      component: function (resolve) {
        require(['src/pages/tuancontro/TuanOrderList.vue'], resolve);
      },
      meta: {
        label: '查看团队订单',
        menu: 'TuancontroSingle',
        topMenuConst: 'tuancontro',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/tuanorder'
      }
    },
    // 计调操作-查看团队订单-订单详情路由 // 跳转到旅游线路的线路订单
    // ... getOrderDetailRouter(
    //   '/control/',
    //   'Control',
    //   'operator',
    //   'control'
    // ),
    {
      path: 'single/operating/:id/:type',
      component: function (resolve) {
        require(['src/pages/tuancontro/Operating.vue'], resolve);
      },
      name: 'TuancontroSingleOperating',
      meta: {
        label: '团队操作记录',
        menu: 'TuancontroSingle',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/oprec'
      }
    },
    // 团队订单
    {
      path: 'single/bill',
      component: function (resolve) {
        require(['src/components/TuanBill.vue'], resolve);
      },
      name: 'TuancontroSingleBill',
      meta: {
        label: '团队账单',
        topMenuConst: 'tuancontro',
        menu: 'TuancontroSingle',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        permission: 'tuancontro/single/tuanacc'
      }
    },
    {
      path: 'single/billIncomeCostUpdate',
      component: function (resolve) {
        require(['src/pages/tuancontro/BillIncomeCostUpdate.vue'], resolve);
      },
      name: 'TuancontroSinglePlanBillIncomeCostUpdate',
      meta: {
        label: '调整团账',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        topMenuConst: 'tuancontro',
        menu: 'TuancontroSingle',
        permission: 'tuancontro/single/tuanaccop/applychgaccount'
      }
    },
    ... getReceiveDetailRouter(
      'single/bill/',
      'TuancontroSingleBill',
      'tuancontro/single/incomelist/',
      'tuancontro',
      'TuancontroSingle',
      '单项团控',
      '/tuancontro/single'
    ),
    // 收款记录
    {
      path: 'single/receipt-list',
      name: 'TuancontroSingleplanReceiptList',
      component: function (resolve) {
        require(['src/pages/tuancontro/PeerProceeds.vue'], resolve);
      },
      meta: {
        topMenuConst: 'tuancontro',
        label: '收款记录',
        parent_label:'单项团控',
        parent_path:'/tuancontro/single',
        menu: 'TuancontroSingle',
        btnPath: '/settlement/recpay/receive-edit?action=1',
        btnName: '+ 添加收款',
        btnPermission: 'settlement/recpay/recei/addrecei',
        btnQueryMap: { tuan_id: 'tuan_id' },
        permission: 'tuancontro/single/recerec'
      }
    }
  ]
};
export default TUANCONTRO_ROUTE;