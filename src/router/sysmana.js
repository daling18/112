// 系统管理
import Home from 'src/layouts/';

function getAccountRouter(
  prefixPath,     // 以 / 结束，如：line/
  prefixName,     // 路由名称前缀
  prefixPerm,     // 路由名称前缀
  parentLabel,    // 收款详情上级面包屑名称
  parentPath = 'list'      // 收款详情上级面包屑路径
) {
  return [
    // 账户管理新增、编辑页
    {
      path: prefixPath + 'gain',
      name: prefixName + 'Gain',
      component: function (resolve) {
        require(['src/pages/sysmana/AccountGain.vue'], resolve);
      },
      meta: {
        label: '员工配置',
        menu: 'SysAccountList',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: prefixPerm + 'edit'
      }
    },
    // 账户管理 - 分配路线
    {
      path: prefixPath + 'assign-line',
      name: prefixName + 'AssignLine',
      component: function (resolve) {
        require(['src/pages/sysmana/AccountAssignLine.vue'], resolve);
      },
      meta: {
        label: '分配路线',
        menu: 'SysAccountList',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: prefixPerm + 'lineauth'
      }
    },
    // 账户管理 - 数据权限配置
    {
      path: prefixPath + 'jurisdiction-config',
      name: prefixName + 'JurisdictionConfig',
      component: function (resolve) {
        require(['src/pages/sysmana/AccountJurisdictionConfig.vue'], resolve);
      },
      meta: {
        label: '数据权限配置',
        menu: 'SysAccountList',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: prefixPerm + 'dataperm'
      }
    },
    // 账户管理 - 分配权限
    {
      path: prefixPath + 'edit-power',
      name: prefixName + 'EditPower',
      component: function (resolve) {
        require(['src/pages/sysmana/AccountPower.vue'], resolve);
      },
      meta: {
        label: '功能权限',
        menu: 'SysAccountList',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: prefixPerm + 'editperm'
      }
    },
    // 账户管理 - 查看权限
    {
      path: prefixPath + 'view-power',
      name: prefixName + 'ViewPower',
      component: function (resolve) {
        require(['src/pages/sysmana/AccountPower.vue'], resolve);
      },
      meta: {
        label: '查看权限',
        menu: 'SysAccountList',
        parent_label: parentLabel,
        parent_path: parentPath,
        permission: prefixPerm + 'viewperm'
      }
    }
  ]
}

const SYSMANA_ROUTE = {
  path: '/sysmana',
  name: 'sysmana',
  component: Home,
  meta: {
    label: '系统管理'
  },
  children: [
    // 账户管理列表页面
    {
      path: 'account/index',
      name: 'accountList',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '账号管理',
        menu: 'SysAccountList',
        permission: 'sysmana/account/selflist,sysmana/account/list',
        paths: '../account-self/list,list'
      }
    },
    {
      path: 'account/list',
      name: 'accountAllList',
      component: function (resolve) {
        require(['src/pages/sysmana/AccountList.vue'], resolve);
      },
      meta: {
        label: '全部账号',
        menu: 'SysAccountList',
        // btnPath: '/account/gain',
        // btnName: '+ 新增',
        // btnPermission: 'api/user/add_user',
        permission: 'sysmana/account/list'
      }
    },
    ...getAccountRouter(
      'account/',
      'accountAll',
      'sysmana/account/list/',
      '全部账号',
      'list'
    ),
    // 账户管理列表页面
    {
      path: 'account-self/list',
      name: 'accountSelfList',
      component: function (resolve) {
        require(['src/pages/sysmana/AccountList.vue'], resolve);
      },
      meta: {
        label: '本公司账号',
        menu: 'SysAccountList',
        // btnPath: '/account/gain',
        // btnName: '+ 新增',
        // btnPermission: 'api/user/add_user',
        permission: 'sysmana/account/selflist'
      }
    },
    ...getAccountRouter(
      'account-self/',
      'accountSelf',
      'sysmana/account/selflist/',
      '本公司账号',
      'list'
    ),
    // 角色管理列表页面
    {
      path: 'role/list',
      name: 'roleList',
      component: function (resolve) {
        require(['src/pages/sysmana/RoleList.vue'], resolve);
      },
      meta: {
        label: '角色管理',
        menu: 'SysRoleList',
        btnPath: 'gain',
        btnName: '+ 新增',
        btnPermission: 'sysmana/role/editrole',
        btnQueryMap: {},  // query默认会带入当前页面的id参数，定义此参数确保query为空
        permission: 'sysmana/role'
      }
    },
    // 角色管理新增第一步-基本信息
    {
      path: 'role/gain',
      name: 'roleGain',
      component: function (resolve) {
        require(['src/pages/sysmana/RoleGain.vue'], resolve);
      },
      meta: {
        label: '角色配置',
        menu: 'SysRoleList',
        parent_label: '角色管理',
        parent_path: 'list',
        permission: 'sysmana/role/editrole'
      }
    },
    // 角色管理新增第二步-功能权限
    {
      path: 'role/power',
      name: 'rolePower',
      component: function (resolve) {
        require(['src/pages/sysmana/RolePower.vue'], resolve);
      },
      meta: {
        label: '角色配置',
        menu: 'SysRoleList',
        parent_label: '角色管理',
        parent_path: 'list',
        permission: 'sysmana/role/editrole'
      }
    },
    {
      path: 'role/view-power',
      name: 'RoleViewPower',
      component: function (resolve) {
        require(['src/pages/sysmana/RolePower.vue'], resolve);
      },
      meta: {
        label: '查看权限',
        menu: 'SysRoleList',
        parent_label: '角色管理',
        parent_path: 'list',
        permission: 'sysmana/role/getroleauth'
      }
    },
    // 审批配置列表页
    {
      path: 'approval/config-list',
      name: 'systemApprovalConfiglist',
      component: function (resolve) {
        require(['src/pages/sysmana/ApprovalConfigList.vue'], resolve);
      },
      meta: {
        label: '审批配置',
        menu: 'StatrepoAppconf',
        permission: 'sysmana/appconf'
      }
    },
    // 审批配置新增页
    {
      path: 'approval/gain',
      name: 'systemApprovalConfigGain',
      component: function (resolve) {
        require(['src/pages/sysmana/ApprovalConfigGain.vue'], resolve);
      },
      meta: {
        label: '新增审批配置',
        menu: 'StatrepoAppconf',
        parent_label: '审批配置',
        parent_path: 'config-list',
        permission: 'sysmana/appconf/aeappconf'
      }
    },
    // 审批配置编辑页
    {
      path: 'approval/edit',
      name: 'sysApprovalConfigEdit',
      component: function (resolve) {
        require(['src/pages/sysmana/ApprovalConfigGain.vue'], resolve);
      },
      meta: {
        label: '编辑审批配置',
        menu: 'StatrepoAppconf',
        parent_label: '审批配置',
        parent_path: 'config-list',
        permission: 'sysmana/appconf/aeappconf'
      }
    },
    // 审批配置复制页
    {
      path: 'approval/copy',
      name: 'sysApprovalConfigCopy',
      component: function (resolve) {
        require(['src/pages/sysmana/ApprovalConfigGain.vue'], resolve);
      },
      meta: {
        label: '复制审批配置',
        menu: 'StatrepoAppconf',
        parent_label: '审批配置',
        parent_path: 'config-list',
        permission: 'sysmana/appconf/copyappconf'
      }
    },
    // 销售账号管理
    {
      path: 'saleaccount/list',
      name: 'saleaccountfList',
      component: function (resolve) {
        require(['src/pages/sysmana/SaleaccountList.vue'], resolve);
      },
      meta: {
        label: '销售账号管理',
        menu: 'SysSaleaccountList',
        permission: 'sysmana/saleaccount/list'
      }
    },
    //公告 资料  说明
    {
      path: 'workplatform/notice',
      name: 'workPlatformNotice',
      component: function (resolve) {
        require(['src/pages/sysmana/workerPlatform/notice.vue'], resolve);
      },
      meta: {
        label: '盈科公告管理',
        menu: 'workPlatformNotice',
        permission: 'sysmana/workplatform/notice'
      }
    },
    {
      path: 'workplatform/means',
      name: 'workPlatformMeans',
      component: function (resolve) {
        require(['src/pages/sysmana/workerPlatform/means.vue'], resolve);
      },
      meta: {
        label: '宣传资料管理',
        menu: 'workPlatformMeans',
        permission: 'sysmana/workplatform/means'
      }
    },
    {
      path: 'workplatform/title',
      name: 'workPlatformTitle',
      component: function (resolve) {
        require(['src/pages/sysmana/workerPlatform/title.vue'], resolve);
      },
      meta: {
        label: '系统说明管理',
        menu: 'workPlatformTitle',
        permission: 'sysmana/workplatform/title'
      }
    },
  ]
};
export default SYSMANA_ROUTE;