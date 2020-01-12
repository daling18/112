import Home from 'src/components/Home.vue';

//系统管理
const SYSTEM_ROUTE = {
  path: '/system',
  name: 'system',
  component: Home,
  meta: {
    label: '系统管理'
  },
  children: [
    // 审批单列表页
    {
      path: '/system/approval/index',
      name: 'systemApprovalIndex',
      component: function (resolve) {
        require(['src/components/system/approval/index.vue'], resolve);
      },
      meta: {
        label: '审批单',
        menu: 'SystemApproval',
        permission: 'api/approval/my_start_approval_list'
      }
    },
    // 审批单列表页-我发起的
    {
      path: '/system/approval/list-submit',
      name: 'systemApprovalListsubmit',
      component: function (resolve) {
        require(['src/components/system/approval/list.vue'], resolve);
      },
      meta: {
        label: '我发起的审批单',
        menu: 'SystemApproval',
        permission: 'api/approval/my_start_approval_list'
      }
    },
    // 审批单列表页-我审批的
    {
      path: '/system/approval/list-check',
      name: 'systemApprovalListcheck',
      component: function (resolve) {
        require(['src/components/system/approval/list.vue'], resolve);
      },
      meta: {
        label: '待我审批的审批单',
        menu: 'SystemApproval',
        permission: 'api/approval/my_wait_approval_list'
      }
    },
    // 审批单列表页-我已审批
    {
      path: '/system/approval/list-checked',
      name: 'systemApprovalListchecked',
      component: function (resolve) {
        require(['src/components/system/approval/list.vue'], resolve);
      },
      meta: {
        label: '我已审批的审批单',
        menu: 'SystemApproval',
        permission: 'api/approval/already_approval_list'
      }
    },
    // 审批单详情
    {
      path: '/system/approval/detail',
      name: 'systemApprovalDetail',
      component: function (resolve) {
        require(['src/components/system/approval/detail.vue'], resolve);
      },
      meta: {
        label: '审批单详情',
        menu: 'SystemApproval',
        parent_label: '审批单',
        parent_path: '/system/approval/index',
        permission: 'api/approval/approval_detail'
      }
    },
    // 审批单详情跳入审批内容预览
    {
      path: '/system/approval/trip-detail',
      name: 'systemApprovalTripDetail',
      component: function (resolve) {
        require(['src/components/system/approval/tripDetail.vue'], resolve);
      },
      meta: {
        label: '审批单内容详情',
        menu: 'SystemApproval',
        parent_label: '审批单详情',
        parent_path: '/system/approval/detail',
        permission: 'api/approval/approval_content'
      }
    },
    // 审批配置列表页
    {
      path: '/system/approval/config-list',
      name: 'systemApprovalConfiglist',
      component: function (resolve) {
        require(['src/components/system/approval/listConfig.vue'], resolve);
      },
      meta: {
        label: '审批配置',
        menu: 'SystemApprovalConfig',
        permission: 'api/approval/approval_config_list'
      }
    },
    // 审批配置新增页
    {
      path: '/system/approval/gain',
      name: 'systemApprovalGain',
      component: function (resolve) {
        require(['src/components/system/approval/gain.vue'], resolve);
      },
      meta: {
        label: '新增审批配置',
        menu: 'SystemApprovalConfig',
        permission: 'api/approval/approval_config_form'
      }
    },
    // 审批配置编辑页
    {
      path: '/sys_approval/edit',
      name: 'sysApprovalEdit',
      component: function (resolve) {
        require(['src/components/system/approval/gain.vue'], resolve);
      },
      meta: {
        label: '编辑审批配置',
        menu: 'SysApproval',
        permission: 'api/approval/approval_config_form'
      }
    },
    // 审批配置复制页
    {
      path: '/sys_approval/copy',
      name: 'sysApprovalCopy',
      component: function (resolve) {
        require(['src/components/system/approval/gain.vue'], resolve);
      },
      meta: {
        label: '复制审批配置',
        menu: 'SysApproval',
        permission: 'api/approval/approval_config_form'
      }
    },
    // 账户管理列表页面
    {
      path: '/account/index',
      name: 'accountList',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '账号管理',
        menu: 'SysAccountList',
        permission: 'api/user/self_index,api/user',
        paths: '/account-self/list,list'
      }
    },
    {
      path: '/account/list',
      name: 'accountAllList',
      component: function (resolve) {
        require(['src/components/system/account/list.vue'], resolve);
      },
      meta: {
        label: '全部账号',
        menu: 'SysAccountList',
        // btnPath: '/account/gain',
        // btnName: '+ 新增',
        // btnPermission: 'api/user/add_user',
        permission: 'api/user'
      }
    },
    // 账户管理列表页面
    {
      path: '/account-self/list',
      name: 'accountSelfList',
      component: function (resolve) {
        require(['src/components/system/account/list.vue'], resolve);
      },
      meta: {
        label: '本公司账号',
        menu: 'SysAccountList',
        // btnPath: '/account/gain',
        // btnName: '+ 新增',
        // btnPermission: 'api/user/add_user',
        permission: 'api/user/self_index'
      }
    },
    // 账户管理新增、编辑页
    {
      path: '/account/gain',
      name: 'accountGain',
      component: function (resolve) {
        require(['src/components/system/account/gain.vue'], resolve);
      },
      meta: {
        label: '员工配置',
        menu: 'SysAccountList',
        permission: 'api/user/add_user'
      }
    },
    {
      path: '/account-self/gain',
      name: 'accountSelfGain',
      component: function (resolve) {
        require(['src/components/system/account/gain.vue'], resolve);
      },
      meta: {
        label: '员工配置',
        menu: 'SysAccountList',
        permission: 'api/user/add_self_user'
      }
    },
    // 账户管理 - 分配路线
    {
      path: '/account/assign-line',
      name: 'accountAssignLine',
      component: function (resolve) {
        require(['src/components/system/account/AssignLine.vue'], resolve);
      },
      meta: {
        label: '分配路线',
        menu: 'SysAccountList',
        parent_label: '全部账号',
        parent_path: '/account/list',
        permission: 'api/user/add_line_auth'
      }
    },
    {
      path: '/account-self/assign-line',
      name: 'accountSelfAssignLine',
      component: function (resolve) {
        require(['src/components/system/account/AssignLine.vue'], resolve);
      },
      meta: {
        label: '分配路线',
        menu: 'SysAccountList',
        parent_label: '本公司账号',
        parent_path: '/account-self/list',
        permission: 'api/user/add_self_line_auth'
      }
    },
    // 账户管理 - 数据权限配置
    {
      path: '/account/jurisdiction-config',
      name: 'accountJurisdictionConfig',
      component: function (resolve) {
        require(['src/components/system/account/jurisdictionConfig.vue'], resolve);
      },
      meta: {
        label: '数据权限配置',
        menu: 'SysAccountList',
        parent_label: '全部账号',
        parent_path: '/account/list',
        permission: 'api/user/add_data_permission_config'
      }
    },
    {
      path: '/account-self/jurisdiction-config',
      name: 'accountSelfJurisdictionConfig',
      component: function (resolve) {
        require(['src/components/system/account/jurisdictionConfig.vue'], resolve);
      },
      meta: {
        label: '数据权限配置',
        menu: 'SysAccountList',
        parent_label: '本公司账号',
        parent_path: '/account-self/list',
        permission: 'api/user/add_self_data_permission_config'
      }
    },
    // 组织机构
    {
      path: '/organization',
      name: 'organization',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '组织机构',
        menu: 'Organization',
        permission: 'api/orgination/org_list,api/orgination/self_detail',
        paths: '/organization/list,/organization/self'
      }
    },
    {
      path: '/organization/list',
      name: 'organizationList',
      component: function (resolve) {
        require(['src/components/system/organization/index.vue'], resolve);
      },
      meta: {
        label: '组织机构',
        menu: 'Organization',
        permission: 'api/orgination/org_list'
      }
    },
    {
      path: '/organization/self',
      name: 'organizationSelf',
      component: function (resolve) {
        require(['src/components/system/organization/Self.vue'], resolve);
      },
      meta: {
        label: '所属组织信息',
        menu: 'Organization',
        permission: 'api/orgination/self_detail'
      }
    },
    {
      path: '/organization/detail',
      name: 'organizationDetail',
      component: function (resolve) {
        require(['src/components/system/organization/detail.vue'], resolve);
      },
      meta: {
        label: '组织信息',
        menu: 'Organization',
        parent_label: '组织机构',
        parent_path: '/organization',
        permission: 'api/orgination/get_org_detail'
      }
    },
    // 角色管理列表页面
    {
      path: '/role/list',
      name: 'roleList',
      component: function (resolve) {
        require(['src/components/system/role/list.vue'], resolve);
      },
      meta: {
        label: '角色管理',
        menu: 'SysRoleList',
        btnPath: '/role/gain',
        btnName: '+ 新增',
        btnPermission: 'api/auth/add_role',
        permission: 'api/auth/get_roles'
      }
    },
    // 角色管理新增第一步-基本信息
    {
      path: '/role/gain',
      name: 'roleGain',
      component: function (resolve) {
        require(['src/components/system/role/gain.vue'], resolve);
      },
      meta: {
        label: '角色配置',
        menu: 'SysRoleList',
        parent_label: '角色管理',
        parent_path: '/role/list',
        permission: 'api/auth/add_role,api/auth/edit_role'
      }
    },
    // 角色管理新增第二步-功能权限
    {
      path: '/role/power',
      name: 'rolePower',
      component: function (resolve) {
        require(['src/components/system/role/power.vue'], resolve);
      },
      meta: {
        label: '角色配置',
        menu: 'SysRoleList',
        parent_label: '角色管理',
        parent_path: '/role/list',
        permission: 'api/auth/get_assign_rules'
      }
    },
    // 客户信息
    {
      path: 'client/list',
      name: 'SysClientList',
      component: function (resolve) {
        require(['src/components/system/ClientList.vue'], resolve);
      },
      meta: {
        label: '客户信息',
        menu: 'SysClientList',
        permission: 'api/client/client_list'
      }
    },
    // 客户信息 - 添加客户信息
    {
      path: 'client/add',
      name: 'SysClientAdd',
      component: function (resolve) {
        require(['src/components/system/ClientForm.vue'], resolve);
      },
      meta: {
        label: '添加客户信息',
        menu: 'SysClientList',
        parent_label: '客户信息',
        parent_path: '/system/client/list',
        permission: 'api/client/add_client'
      }
    },
    // 客户信息 - 编辑客户信息
    {
      path: 'client/edit',
      name: 'SysClientEdit',
      component: function (resolve) {
        require(['src/components/system/ClientForm.vue'], resolve);
      },
      meta: {
        label: '编辑客户信息',
        menu: 'SysClientList',
        parent_label: '客户信息',
        parent_path: '/system/client/list',
        permission: 'api/client/add_client'
      }
    },
    // 客户信息 - 客户信息详情
    {
      path: 'client/detail',
      name: 'SysClientDetail',
      component: function (resolve) {
        require(['src/components/system/ClientDetail.vue'], resolve);
      },
      meta: {
        label: '客户信息详情',
        menu: 'SysClientList',
        parent_label: '客户信息',
        parent_path: '/system/client/list',
        permission: 'api/client/client_info'
      }
    },
    // 合作客户
    {
      path: 'cooperation',
      name: 'cooperationList',
      component: function (resolve) {
        require(['src/components/system/cooperation/list.vue'], resolve);
      },
      meta: {
        label: '合作客户',
        menu: 'sysCooperation',
        permission: 'api_supplier/supplier/cooperative_customers'
      }
    },
    {
      path: 'cooperation/check-list',
      name: 'cooperationCheckList',
      component: function (resolve) {
        require(['src/components/system/cooperation/CheckList.vue'], resolve);
      },
      meta: {
        label: '勾选合作客户',
        menu: 'sysCooperation',
        permission: 'api_supplier/supplier/have_not_cooperative_customers'
      }
    },
    {
      path: 'cooperation/view-detail',
      name: 'cooperationViewDetail',
      component: function (resolve) {
        require(['src/components/system/cooperation/detail.vue'], resolve);
      },
      meta: {
        label: '查看合作客户详情',
        menu: 'sysCooperation',
        permission: 'api_supplier/supplier/cooperative_customers_info'
      }
    },
    {
      path: 'cooperation/edit-detail',
      name: 'cooperationEditDetail',
      component: function (resolve) {
        require(['src/components/system/cooperation/detail.vue'], resolve);
      },
      meta: {
        label: '编辑合作客户详情',
        menu: 'sysCooperation',
        permission: 'api_supplier/supplier/edit_cooperation'
      }
    },
    {
      path: 'cooperation/resign-detail',
      name: 'cooperationResignDetail',
      component: function (resolve) {
        require(['src/components/system/cooperation/detail.vue'], resolve);
      },
      meta: {
        label: '重新签约合作客户',
        menu: 'sysCooperation',
        permission: 'api_supplier/supplier/renew_contract'
      }
    },
    // 供应商管理
    {
      path: 'supplier',
      name: 'supplier',
      component: function (resolve) {
        require(['src/components/system/supplier/supplierList.vue'], resolve);
      },
      meta: {
        label: '供应商管理',
        menu: 'supplierManagement',
        permission: 'api_supplier/supplier/supplier_list'
      }
    },
    // 合作确认
    {
      path: 'supplier/coop-list',
      name: 'supplierCoopList',
      component: function (resolve) {
        require(['src/components/system/supplier/CoopList.vue'], resolve);
      },
      meta: {
        label: '供应商管理',
        menu: 'supplierManagement',
        permission: 'api_supplier/supplier/cooperative_customers'
      }
    },
    // 供应商管理-新增供应商1
    {
      path: 'supplier-add-step1',
      name: 'supplierAdd',
      component: function (resolve) {
        require(['src/components/system/supplier/supplierAddStepOne.vue'], resolve);
      },
      meta: {
        label: '编辑供应商',
        menu: 'supplierManagement',
        permission: 'api_supplier/supplier/add_supplier'
      }
    },
    // 供应商管理-新增供应商2
    {
      path: 'supplier-add-step2',
      name: 'supplierAdd2',
      component: function (resolve) {
        require(['src/components/system/supplier/supplierAddStepTwo.vue'], resolve);
      },
      meta: {
        label: '编辑供应商',
        menu: 'supplierManagement',
        permission: 'api_supplier/supplier/add_edit_supplier_second_step'
      }
    },
    // 供应商管理-供应商详情
    {
      path: 'supplier-detail',
      name: 'supplierDetail',
      component: function (resolve) {
        require(['src/components/system/supplier/supplierDetail.vue'], resolve);
      },
      meta: {
        label: '供应商详情',
        menu: 'supplierManagement',
        permission: 'api_supplier/supplier/supplier_detail'
      }
    },
    // 供应商管理-审批单
    {
      path: 'approval-detail',
      name: 'supplierApprovalDetail',
      component: function (resolve) {
        require(['src/components/system/approval/detail.vue'], resolve);
      },
      meta: {
        label: '审批单详情',
        menu: 'supplierManagement',
        permission: 'api/approval/approval_detail'
      }
    },
    // 图片管理
    {
      path: 'picture-list',
      name: 'pirctureList',
      component: function (resolve) {
        require(['src/components/system/PictureManagementList.vue'], resolve);
      },
      meta: {
        label: '图片管理',
        menu: 'pictureManagement',
        permission: 'api/photoalbum/get_photoalbum_list'
      }
    },
    // 图片管理-图片VisionChinaManagement
    {
      path: 'picture-detail',
      name: 'pirctureDetail',
      component: function (resolve) {
        require(['src/components/system/PictureManagementDetail.vue'], resolve);
      },
      meta: {
        label: '相册',
        menu: 'pictureManagement',
        parent_label: '图片管理',
        parent_path: '/system/picture-list',
        permission: 'api/photoalbum/get_photoalbum_sub_list'
      }
    },
    // 图片管理-视觉中国
    {
      path: 'visionChina',
      name: 'visionChina',
      component: function (resolve) {
        require(['src/components/system/VisionChinaManagement.vue'], resolve);
      },
      meta: {
        label: '相册',
        menu: 'pictureManagement',
        parent_label: '图片管理',
        parent_path: '/system/picture-list',
        permission: 'api/photoalbum/get_vcg_images'
      }
    },
  ]
};

export default SYSTEM_ROUTE;