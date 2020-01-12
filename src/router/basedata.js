// 基础数据管理
import Home from 'src/layouts/';
const BASEDATA_ROUTE = {
  path: '/basedata',
  component: Home,
  name: 'basedata',
  meta: {
    label: '基础数据管理'
  },
  children: [
    {
      path: 'tripListIndex',
      name: 'tripListIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '供应商管理',
        menu: 'BasedataSupplier',
        permission: 'basedata/supplier/manage,basedata/supplier/confirmcooperation',
        paths: '/basedata/supplier,/basedata/coop-list'
      }
    },
    // 供应商管理
    {
      path: 'supplier',
      name: 'supplier',
      component: function (resolve) {
        require(['src/pages/basedata/SupplierList.vue'], resolve);
      },
      meta: {
        label: '供应商管理',
        menu: 'BasedataSupplier',
        permission: 'basedata/supplier/manage'
      }
    },
    // 新增供应商
    {
      path: 'supplier-add-step1',
      name: 'supplierAdd',
      component: function (resolve) {
        require(['src/pages/basedata/SupplierAdd.vue'], resolve);
      },
      meta: {
        label: '编辑供应商',
        menu: 'BasedataSupplier',
        parent_label: '供应商管理',
        parent_path: 'supplier',
        permission: 'basedata/supplier/manage/addsupplier'
      }
    },
    // 供应商管理-供应商详情
    {
      path: 'supplier-detail',
      name: 'supplierDetail',
      component: function (resolve) {
        require(['src/pages/basedata/SupplierDetail.vue'], resolve);
      },
      meta: {
        label: '供应商详情',
        menu: 'BasedataSupplier',
        parent_label: '供应商管理',
        parent_path: 'supplier',
        permission: 'basedata/supplier/manage/supplierdetail'
      }
    },
    // 合作确认
    {
      path: 'coop-list',
      name: 'supplierCoopList',
      component: function (resolve) {
        require(['src/pages/basedata/CoopList.vue'], resolve);
      },
      meta: {
        label: '合作确认',
        menu: 'BasedataSupplier',
        permission: 'basedata/supplier/confirmcooperation'
      }
    },
    // 供应商管理-供应商详情
    {
      path: 'coop-list/detail',
      name: 'supplierDetail',
      component: function (resolve) {
        require(['src/pages/basedata/SupplierDetail.vue'], resolve);
      },
      meta: {
        label: '合作详情',
        menu: 'BasedataSupplier',
        parent_label: '合作确认',
        parent_path: '../coop-list',
        permission: 'basedata/supplier/confirmcooperation/supplierdetail'
      }
    },
    // 合作客户
    {
      path: 'cooperation',
      name: 'cooperationList',
      component: function (resolve) {
        require(['src/pages/basedata/CooperationList.vue'], resolve);
      },
      meta: {
        label: '合作客户',
        menu: 'BasedataCustomers',
        permission: 'basedata/customers'
      }
    },
    // 合作分公司
    {
      path: 'filialeCooperation',
      name: 'filialeCooperationList',
      component: function (resolve) {
        require(['src/pages/basedata/FilialeCooperation.vue'], resolve);
      },
      meta: {
        label: '合作分公司',
        menu: 'FilialeCooperationList',
        permission: 'basedata/filialeCooperation'
      }
    },
    // 合作分公司
    {
      path: 'filialeCooperationInitiate',
      name: 'filialeCooperationInitiate',
      component: function (resolve) {
        require(['src/pages/basedata/CooperationCheckList.vue'], resolve);
      },
      meta: {
        label: '发起合作',
        menu: 'FilialeCooperationList',
        permission: 'basedata/filialeCooperation'
      }
    },
    {
      path: 'cooperation/check-list',
      name: 'cooperationCheckList',
      component: function (resolve) {
        require(['src/pages/basedata/CooperationCheckList.vue'], resolve);
      },
      meta: {
        label: '勾选合作客户',
        menu: 'BasedataCustomers',
        parent_label: '合作客户',
        parent_path: '../cooperation',
        permission: 'basedata/customers/addcooperativecustomers'
      }
    },
    {
      path: 'cooperation/view-detail',
      name: 'cooperationViewDetail',
      component: function (resolve) {
        require(['src/pages/basedata/CooperationDetail.vue'], resolve);
      },
      meta: {
        label: '查看合作客户详情',
        menu: 'BasedataCustomers',
        parent_label: '合作客户',
        parent_path: '../cooperation',
        permission: 'basedata/customers/cooperativecustomersinfo'
      }
    },
    {
      path: 'cooperation/edit-detail',
      name: 'cooperationEditDetail',
      component: function (resolve) {
        require(['src/pages/basedata/CooperationDetail.vue'], resolve);
      },
      meta: {
        label: '编辑合作客户详情',
        menu: 'BasedataCustomers',
        parent_label: '合作客户',
        parent_path: '../cooperation',
        permission: 'basedata/customers/editcooperation'
      }
    },
    {
      path: 'cooperation/resign-detail',
      name: 'cooperationResignDetail',
      component: function (resolve) {
        require(['src/pages/basedata/CooperationDetail.vue'], resolve);
      },
      meta: {
        label: '重新签约合作客户',
        menu: 'BasedataCustomers',
        parent_label: '合作客户',
        parent_path: '../cooperation',
        permission: 'basedata/customers/renewcontract'
      }
    },
    // 客户信息
    {
      path: 'client/list',
      name: 'SysClientList',
      component: function (resolve) {
        require(['src/pages/basedata/ClientList.vue'], resolve);
      },
      meta: {
        label: '客户信息',
        menu: 'BasedataClientdata',
        permission: 'basedata/clientdata'
      }
    },
    // 客户信息 - 添加客户信息
    {
      path: 'client/add',
      name: 'SysClientAdd',
      component: function (resolve) {
        require(['src/pages/basedata/ClientForm.vue'], resolve);
      },
      meta: {
        label: '添加客户信息',
        menu: 'BasedataClientdata',
        parent_label: '客户信息',
        parent_path: 'list',
        permission: 'basedata/clientdata/addeditclient'
      }
    },
    // 客户信息 - 编辑客户信息
    {
      path: 'client/edit',
      name: 'SysClientEdit',
      component: function (resolve) {
        require(['src/pages/basedata/ClientForm.vue'], resolve);
      },
      meta: {
        label: '编辑客户信息',
        menu: 'BasedataClientdata',
        parent_label: '客户信息',
        parent_path: 'list',
        permission: 'basedata/clientdata/addeditclient'
      }
    },
    // 客户信息 - 客户信息详情
    {
      path: 'client/detail',
      name: 'SysClientDetail',
      component: function (resolve) {
        require(['src/pages/basedata/ClientDetail.vue'], resolve);
      },
      meta: {
        label: '客户信息详情',
        menu: 'BasedataClientdata',
        parent_label: '客户信息',
        parent_path: 'list',
        permission: 'basedata/clientdata/client_info'
      }
    },
    // 组织机构
    {
      path: 'organization',
      name: 'organization',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '全部组织',
        menu: 'BasedataOrg',
        permission: 'basedata/org/our/list,basedata/org/alllist/list,basedata/org/selfdetail',
        paths: 'organization/our,organization/list,organization/self'
      }
    },
    {
      path: 'organization/list',
      name: 'organizationList',
      component: function (resolve) {
        require(['src/pages/basedata/OrganizationList.vue'], resolve);
      },
      meta: {
        label: '全部组织',
        menu: 'BasedataOrg',
        permission: 'basedata/org/alllist/list'
      }
    },
    {
      path: 'organization/self',
      name: 'organizationSelf',
      component: function (resolve) {
        require(['src/pages/basedata/OrganizationSelf.vue'], resolve);
      },
      meta: {
        label: '所属组织信息',
        menu: 'BasedataOrg',
        permission: 'basedata/org/selfdetail'
      }
    },
    {
      path: 'organization/detail',
      name: 'organizationDetail',
      component: function (resolve) {
        require(['src/pages/basedata/OrganizationDetail.vue'], resolve);
      },
      meta: {
        label: '组织信息',
        menu: 'BasedataOrg',
        parent_label: '组织机构',
        parent_path: 'list',
        permission: 'basedata/org/alllist/orgdetail'
      }
    },
    {
      path: 'organization/our',
      name: 'OrganizationOur',
      component: function (resolve) {
        require(['src/pages/basedata/OrganizationList.vue'], resolve);
      },
      meta: {
        label: '本公司组织',
        menu: 'BasedataOrg',
        permission: 'basedata/org/our/list'
      }
    },
    {
      path: 'organization/our/detail',
      name: 'organizationDetail',
      component: function (resolve) {
        require(['src/pages/basedata/OrganizationDetail.vue'], resolve);
      },
      meta: {
        label: '组织信息',
        menu: 'BasedataOrg',
        parent_label: '本公司组织',
        parent_path: '/basedata/organization/our',
        permission: 'basedata/org/our/orgdetail'
      }
    },
    // 营业部信息
    {
      path: 'salesDepartment',
      name: 'salesDepartment',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '营业部信息',
        menu: 'Department',
        permission: 'basedata/department/list,dasedata/visit/list',
        paths: '/basedata/salesDepartment/departmentList,/basedata/salesDepartment/visitList'
      }
    },
    {
      path: 'salesDepartment/departmentList',
      name: 'SalesDepartmentList',
      component: function (resolve) {
        require(['src/pages/basedata/SalesDepartmentList.vue'], resolve);
      },
      meta: {
        label: '营业部信息',
        menu: 'Department',
        permission: 'basedata/department/list,'
      }
    },
    // 营业部信息 - 添加营业部
    {
      path: 'salesDepartment/addDepartment',
      name: 'AddDepartment',
      component: function (resolve) {
        require(['src/pages/basedata/AddDepartment.vue'], resolve);
      },
      meta: {
        label: '添加营业部',
        menu: 'Department',
        parent_label: '营业部信息',
        parent_path: 'salesDepartment/departmentList',
        permission: 'basedata/department/add'
      }
    },
    //营业部信息-拜访记录列表
    {
      path: 'salesDepartment/visitList',
      name: 'VisitList',
      component: function (resolve) {
        require(['src/pages/basedata/VisitList.vue'], resolve);
      },
      meta: {
        label: '拜访记录',
        menu: 'Department',
        permission: 'basedata/visit/list'
      }
    },
    //营业部信息-拜访详情列表
    {
      path: 'salesDepartment/visitDetailsList',
      name: 'VisitDetailsList',
      component: function (resolve) {
        require(['src/pages/basedata/VisitDetailsList.vue'], resolve);
      },
      meta: {
        label: '拜访详情',
        menu: 'Department',
        parent_label: '拜访记录',
        parent_path: 'visitList',
        permission: 'basedata/VisitDetailsList/list'
      }
    },
    {
      path: 'shop',
      name: 'shop',
      component: function (resolve) {
        require(['src/pages/basedata/Shop.vue'], resolve);
      },
      meta: {
        label: '店铺管理',
        menu: 'BasedataShop',
        permission: 'basedata/shop'
      }
    },
  ]
};
export default BASEDATA_ROUTE;