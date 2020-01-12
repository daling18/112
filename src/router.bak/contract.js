import Home from 'src/components/Home.vue';

// 合同管理
const CONTRACT_ROUTER = {
  path: '/contract',
  component: Home,
  name: 'contract',
  meta: {
    label: '合同管理'
  },
  children: [
    // 合同领取
    {
      path: '/contract/pulldown/index',
      component: function (resolve) {
        require(['src/components/contract/pulldown/index.vue'], resolve);
      },
      name: 'contractPulldown',
      meta: {
        label: '合同领取',
        menu: 'contractPulldown',
        permission: 'api/contract/menu/1'
      }
    },{
      path: '/contract/pulldown/head-list',
      component: function (resolve) {
        require(['src/components/contract/pulldown/head-list.vue'], resolve);
      },
      name: 'contractPulldownHeadList',
      meta: {
        label: '总部合同领取',
        menu: 'contractPulldown',
        permission: 'api/contract/apply_list/2/1',
        btnPath:'/contract/pulldown/head-apply',
        btnName:'申请合同',
        btnPermission:'api/contract/add_apply/2'
      }
    },{
      path: '/contract/pulldown/branch-list',
      component: function (resolve) {
        require(['src/components/contract/pulldown/branch-list.vue'], resolve);
      },
      name: 'contractPulldownBranchList',
      meta: {
        label: '分公司合同领取',
        menu: 'contractPulldown',
        permission: 'api/contract/apply_list/1/1',
        btnPath:'/contract/pulldown/branch-apply',
        btnName:'申请合同',
        btnPermission:'api/contract/add_apply/1'
      }
    },{
      path: '/contract/pulldown/head-apply',
      component: resolve => {
        require(['src/components/contract/pulldown/head-apply.vue'], resolve);
      },
      name: 'contractPulldownHeadApply',
      meta:{
        label:'申请合同',
        parent_label:'总部合同领取',
        parent_path:'/contract/pulldown/head-list',
        menu: 'contractPulldown',
        permission: 'api/contract/add_apply/2'
      }
    },{
      path: '/contract/pulldown/branch-apply',
      component: resolve => {
        require(['src/components/contract/pulldown/branch-apply.vue'], resolve);
      },
      name: 'contractPulldownBranchApply',
      meta:{
        label:'申请合同',
        parent_label:'分公司合同领取',
        parent_path:'/contract/pulldown/branch-list',
        menu: 'contractPulldown',
        permission: 'api/contract/add_apply/1'
      }
    },{
      path: '/contract/pulldown/head-detail',
      component: resolve => {
        require(['src/components/contract/pulldown/head-detail.vue'], resolve);
      },
      name: 'contractPulldownHeadDetail',
      meta:{
        label:'总部申请领取详情',
        menu: 'contractPulldown',
        permission: 'api/contract/apply_detail/2/1/1'
      }
    },{
      path: '/contract/pulldown/branch-detail',
      component: resolve => {
        require(['src/components/contract/pulldown/head-detail.vue'], resolve);
      },
      name: 'contractPulldownBranchDetail',
      meta:{
        label:'分公司申请领取详情',
        menu: 'contractPulldown',
        permission: 'api/contract/apply_detail/1/1/1'
      }
    },{
      path: '/contract/pulldown/head-number',
      component: function (resolve) {
        require(['src/components/contract/pulldown/number.vue'], resolve);
      },
      name: 'contracPulldownHeadNmuber',
      meta: {
        label: '查看总部合同编号',
        menu: 'contractPulldown',
        permission: 'api/contract/get_contract_no_list/lq/2'
      }
    },{
      path: '/contract/pulldown/branch-number',
      component: function (resolve) {
        require(['src/components/contract/pulldown/number.vue'], resolve);
      },
      name: 'contracPulldownBranchNmuber',
      meta: {
        label: '查看分公司合同编号',
        menu: 'contractPulldown',
        permission: 'api/contract/get_contract_no_list/lq/1'
      }
    },{
      path: '/contract/pulldown/head-border-a',
      component: function (resolve) {
        require(['src/components/contract/pulldown/bindorder.vue'], resolve);
      },
      name: 'contracPulldownHeadBindorderAdd',
      meta: {
        label: '绑定订单',
        menu: 'contractPulldown',
        permission: 'api/contract/bind_order/add/2'
      }
    },{
      path: '/contract/pulldown/branch-border-a',
      component: function (resolve) {
        require(['src/components/contract/pulldown/bindorder.vue'], resolve);
      },
      name: 'contracPulldownBranchBindorderAdd',
      meta: {
        label: '绑定订单',
        menu: 'contractPulldown',
        permission: 'api/contract/bind_order/add/1'
      }
    },{
      path: '/contract/pulldown/head-border-e',
      component: function (resolve) {
        require(['src/components/contract/pulldown/bindorder.vue'], resolve);
      },
      name: 'contracPulldownHeadBindorderEdit',
      meta: {
        label: '绑定订单',
        menu: 'contractPulldown',
        permission: 'api/contract/bind_order/edit/2'
      }
    },{
      path: '/contract/pulldown/branch-border-e',
      component: function (resolve) {
        require(['src/components/contract/pulldown/bindorder.vue'], resolve);
      },
      name: 'contracPulldownBranchBindorderEdit',
      meta: {
        label: '绑定订单',
        menu: 'contractPulldown',
        permission: 'api/contract/bind_order/edit/1'
      }
    },{
      path: '/contract/pulldown/head-verify',
      component: function (resolve) {
        require(['src/components/contract/pulldown/verify.vue'], resolve);
      },
      name: 'contracPulldownHeadVerify',
      meta: {
        label: '总部核销合同',
        menu: 'contractPulldown',
        permission: 'api/contract/use_cancel_add/hx/2'
      }
    },{
      path: '/contract/pulldown/branch-verify',
      component: function (resolve) {
        require(['src/components/contract/pulldown/verify.vue'], resolve);
      },
      name: 'contracPulldownBranchVerify',
      meta: {
        label: '分公司核销合同',
        menu: 'contractPulldown',
        permission: 'api/contract/use_cancel_add/hx/1'
      }
    },{
      path: '/contract/pulldown/head-reverify',
      component: function (resolve) {
        require(['src/components/contract/pulldown/verify.vue'], resolve);
      },
      name: 'contracPulldownHeadReVerify',
      meta: {
        label: '总部重新核销合同',
        menu: 'contractPulldown',
        permission: 'api/contract/use_cancel_add/cxhx/2'
      }
    },{
      path: '/contract/pulldown/branch-reverify',
      component: function (resolve) {
        require(['src/components/contract/pulldown/verify.vue'], resolve);
      },
      name: 'contracPulldownBranchReVerify',
      meta: {
        label: '分公司重新核销合同',
        menu: 'contractPulldown',
        permission: 'api/contract/use_cancel_add/cxhx/2'
      }
    },{
      path: '/contract/pulldown/verify-record',
      component: function (resolve) {
        require(['src/components/contract/pulldown/verify-record.vue'], resolve);
      },
      name: 'contracPulldownVerifyRecord',
      meta: {
        label: '核销记录',
        menu: 'contractPulldown',
        permission: 'api/contract/menu/1'
      }
    },{
      path: '/contract/audit/index',
      component: function (resolve) {
        require(['src/components/contract/pulldown/index.vue'], resolve);
      },
      name: 'contractAudit',
      meta: {
        label: '合同审核',
        menu: 'contractAudit',
        permission: 'api/contract/menu/2'
      }
    },{
      path: '/contract/audit/head-list',
      component: function (resolve) {
        require(['src/components/contract/pulldown/head-list.vue'], resolve);
      },
      name: 'contractAuditHeadList',
      meta: {
        label: '总部合同审核',
        menu: 'contractAudit',
        permission: 'api/contract/apply_list/2/2'
      }
    },{
      path: '/contract/audit/branch-list',
      component: function (resolve) {
        require(['src/components/contract/pulldown/branch-list.vue'], resolve);
      },
      name: 'contractAuditBranchList',
      meta: {
        label: '分公司合同审核',
        menu: 'contractAudit',
        permission: 'api/contract/apply_list/1/2'
      }
    },{
      path: '/contract/audit/head-detail',
      component: function (resolve) {
        require(['src/components/contract/pulldown/head-detail.vue'], resolve);
      },
      name: 'contractAuditHeadDetail',
      meta: {
        label: '总部合同审核详情',
        menu: 'contractAudit',
        permission: 'api/contract/apply_detail/2/2/1'
      }
    },{
      path: '/contract/audit/branch-detail',
      component: function (resolve) {
        require(['src/components/contract/pulldown/head-detail.vue'], resolve);
      },
      name: 'contractAuditBranchDetail',
      meta: {
        label: '分公司合同审核详情',
        menu: 'contractAudit',
        permission: 'api/contract/apply_detail/1/2/1'
      }
    },{
      path: '/contract/audit/head-number',
      component: function (resolve) {
        require(['src/components/contract/pulldown/number.vue'], resolve);
      },
      name: 'contracAuditHeadNmuber',
      meta: {
        label: '审核总部合同编号',
        menu: 'contractAudit',
        permission: 'api/contract/get_contract_no_list/sh/2'
      }
    },{
      path: '/contract/audit/branch-number',
      component: function (resolve) {
        require(['src/components/contract/pulldown/number.vue'], resolve);
      },
      name: 'contracAuditBranchNmuber',
      meta: {
        label: '审核分公司合同编号',
        menu: 'contractAudit',
        permission: 'api/contract/get_contract_no_list/sh/1'
      }
    // },{
    //   path: '/contract/audit/detail-apply',
    //   component: function (resolve) {
    //     require(['src/components/contract/pulldown/branch-detail.vue'], resolve);
    //   },
    //   name: 'contractAuditDetailApply',
    //   meta: {
    //     label: '审核合同申请',
    //     menu: 'contractAudit',
    //     permission: 'api/contract'
    //   }
    },{
      path: '/contract/audit/verify-record',
      component: function (resolve) {
        require(['src/components/contract/pulldown/verify-record.vue'], resolve);
      },
      name: 'contractAuditVerifyRecord',
      meta: {
        label: '核销记录',
        menu: 'contractAudit',
        permission: 'api/contract'
      }
    },{
      path: '/contract/query/index',
      component: function (resolve) {
        require(['src/components//contract/query/index.vue'], resolve);
      },
      name: 'queryIndex',
      meta: {
        label: '合同查询',
        menu: 'contractQuery',
        permission: 'api/contract/blank/cx'
      }
    }
    ,{
      path: '/contract/query/head-list',
      component: function (resolve) {
        require(['src/components/contract/query/head-list.vue'], resolve);
      },
      name: 'queryHeadList',
      meta: {
        label: '总部合同',
        menu: 'contractQuery',
        permission: 'api/contract/get_contract_no_list/cx/2'
      }
    },
    {
      path: '/contract/query/branch-list',
      component: function (resolve) {
        require(['src/components/contract/query/branch-list.vue'], resolve);
      },
      name: 'queryBranchList',
      meta: {
        label: '分公司合同',
        menu: 'contractQuery',
        permission: 'api/contract/get_contract_no_list/cx/1'
      }
    },
    {
      path: 'express/index',
      component: function (resolve) {
        require(['src/components/contract/express/index.vue'], resolve);
      },
      name: 'expressIndex',
      meta: {
        label: '快递信息',
        menu: 'expressIndex',
        permission: 'api/express/index'
      }
    },
  ]
};

export default CONTRACT_ROUTER;