// 旅游线路
import Home from 'src/layouts/';
import {
  getReceiveDetailRouter,
  getOrderDetailRouter,
  getVisaDetailRouter,
  getLocalProductDetailRouter
} from './compose-router';
import V2 from 'src/router/v2/touristroute';

function getTripDetailRouter(
  prefixPath, // 以 / 结束，如：line/
  prefixName, // 路由名称前缀
  prefixPerm, // 权限字符串前缀, 以 / 结束，如：line/
  topMenuConst, // 所属菜单项： operator, distribution, sale, finance
  menu, // 所属菜单name
  parentLabel, // 上级面包屑名称
  parentPath // 上级面包屑路径
) {
  return [
    // 分公司-新增行程
    {
      path: prefixPath + 'addNewTrip',
      component: function (resolve) {
        require(['src/pages/touristroute/AddTrip.vue'], resolve);
      },
      name: prefixName + 'AddTrip',
      meta: {
        label: '编辑行程',
        parent_label: parentLabel,
        parent_path: parentPath,
        menu,
        topMenuConst,
        permission: prefixPerm + 'addpro'
      }
    },
    // 分公司简易开团第二步
    {
      path: prefixPath + 'addNewEasyTrip',
      component: function (resolve) {
        require(['src/pages/touristroute/AddEasyTrip.vue'], resolve);
      },
      name: prefixName + 'AddEasyTrip',
      meta: {
        label: '编辑行程',
        parent_label: parentLabel,
        parent_path: parentPath,
        menu,
        topMenuConst,
        permission: prefixPerm + 'addpro'
      }
    },
    // 分公司完善信息
    {
      path: prefixPath + 'addNewTrip2',
      component: function (resolve) {
        require(['src/pages/touristroute/AddTripSecond.vue'], resolve);
      },
      name: prefixName + 'AddTripSecond',
      meta: {
        label: '编辑行程',
        parent_label: parentLabel,
        parent_path: parentPath,
        menu,
        topMenuConst,
        permission: prefixPerm + 'addpro'
      }
    },
    // 分公司完善说明
    {
      path: prefixPath + 'addNewTrip3',
      component: function (resolve) {
        require(['src/pages/touristroute/AddTripThree.vue'], resolve);
      },
      name: prefixName + 'AddTripThree',
      meta: {
        label: '编辑行程',
        parent_label: parentLabel,
        parent_path: parentPath,
        menu,
        topMenuConst,
        permission: prefixPerm + 'addpro'
      }
    },
    {
      path: prefixPath + 'tripDetail',
      component: function (resolve) {
        require(['src/components/TripDetail.vue'], resolve);
      },
      name: prefixName + 'TripDetail',
      meta: {
        label: '行程详情',
        parent_label: parentLabel,
        parent_path: parentPath,
        menu,
        topMenuConst,
        permission: prefixPerm + 'getstrockdetail'
      }
    },
    // 分公司团期报价
    {
      path: prefixPath + 'bids',
      component: function (resolve) {
        require(['src/pages/touristroute/Bids.vue'], resolve);
      },
      name: prefixName + 'Bids',
      meta: {
        label: '团期报价',
        parent_label: parentLabel,
        parent_path: parentPath,
        menu,
        topMenuConst,
        permission: prefixPerm + 'groupoffer'
      }
    }
  ]
}

const TouristRoute = () => import('src/views/touristroute');
const EditTrip = () => import('src/views/touristroute/EditTrip');
const EditSchedule = () => import('src/views/touristroute/editSchedule');
const EditEasySchedule = () => import('src/views/touristroute/editEasySchedule');
// 审批单
const ApprovalDetail = () => import('src/views/touristroute/approvalDetail');
const EditStock = () => import('src/views/touristroute/EditStock');

// list laytouts
const List = () => import('src/views/touristroute/TripList/index');
// 自营产品
const SelfSupport = () => import('src/views/touristroute/TripList/SelfSupport');
// 供应商
const Supplier = () => import('src/views/touristroute/TripList/Supplier');
// 辖区内
const Jurisdiction = () => import('src/views/touristroute/TripList/Jurisdiction');
// 其他辖区
const Other = () => import('src/views/touristroute/TripList/Other');


//基本信息
const baseInfo = () => import('src/views/touristroute/baseInfo');
//说明信息
const explain = () => import('src/views/touristroute/explain');
// 团期
const AddTripRepertory = () => import('src/views/touristroute/addTripRepertory')

const TOURISTROUTE_ROUTE = {
  path: '/touristroute',
  component: Home,
  name: 'touristroute',
  redirect: "/touristroute/trip/list",
  meta: {
    label: '旅游线路'
  },
  children: [
    ...V2,
    {
      path: "trip",
      redirect: "/touristroute/trip/list",
      component: TouristRoute,
      name: "LineTrip",
      meta: {
        label: "线路行程",
        menu: 'TouristrouteLinetravel'
      },
      children: [{
          path: 'list',
          name: "LineTrip/list",
          redirect: '/touristroute/trip/list/self',
          meta: {
            label: "跟团游自由行",
            menu: "TouristrouteLinetravel",

          },
          component: List,
          children: [{
            path: "self",
            meta: {
              label: '自营产品',
              menu: 'TouristrouteLinetravel',
              permission: '/touristroute/trip/list/self',
            },
            component: SelfSupport
          }, {
            path: "supplier",
            meta: {
              label: '供应商产品',
              menu: 'TouristrouteLinetravel',
              permission: '/touristroute/trip/list/supplier'
            },
            component: Supplier
          }, {
            path: "jurisdiction",
            meta: {
              label: '辖区内产品',
              menu: 'TouristrouteLinetravel',
              permission: '/touristroute/trip/list/jurisdiction',
            },
            component: Jurisdiction
          }, {
            path: "other",
            meta: {
              label: '其他辖区内产品',
              menu: 'TouristrouteLinetravel',
              permission: '/touristroute/trip/list/other',
            },
            component: Other
          }]
        }, {
          path: "baseInfo",
          meta: {
            label: '产品详情',
            menu: 'TouristrouteOperating',
            permission: 'touristroute/operating/linetravel/baseInfoDetail',
          },
          component: baseInfo
        },
        {
          path: "approval-detail/:approvalId",
          meta: {
            label: '审批单',
            menu: 'TouristrouteOperating',
            permission: '/touristroute/trip/approval-detail',
          },
          component: ApprovalDetail,
          props: true
        },
        {
          path: "explain",
          meta: {
            label: '说明信息',
            menu: 'TouristrouteOperating',
            permission: 'touristroute/operating/linetravel/explainDetail',
          },
          component: explain
        },{
          path: "addTripBasic",
          name: "trip/addTripBasic",
          meta: {
            label: '添加行程',
            menu: 'TouristrouteLinetravel',
            permission: '/touristroute/trip/addTripBasic',
          },
          component: EditTrip
        }, {
          path: "addTripBasic/:productId",
          name: "trip/addTripBasic",
          meta: {
            label: '编辑行程',
            menu: 'TouristrouteLinetravel',
            permission: '/touristroute/trip/addTripBasic',
          },
          component: EditTrip,
          props: true
        }, {
          path: "editSchedule/:productId",
          name: "trip/editSchedule",
          meta: {
            label: '完善行程',
            menu: 'TouristrouteLinetravel',
            permission: '/touristroute/trip/editSchedule',
          },
          component: EditSchedule,
          props: true

        }, {
          path: "editEasySchedule/:productId",
          name: "trip/editEasySchedule",
          meta: {
            label: '简易行程',
            menu: 'TouristrouteLinetravel',
            permission: '/touristroute/trip/editEasySchedule'
          },
          component: EditEasySchedule,
          props: true
        }, {
          path: "addStock/:productId",
          name: "trip/addStock",
          meta: {
            label: '新增团期',
            menu: 'TouristrouteLinetravel',
            permission: '/touristroute/trip/addStock'
          },
          component: EditStock,
          props: true
        }, {
          path: 'tripRepertory/:productId',
          name: 'tripRepertory',
          meta: {
            label: "团期报价",
            menu: 'TouristrouteLinetravel',
            permission: '/touristroute/trip/tripRepertory'
          },
          component: AddTripRepertory,
          props: true
        }
      ]
    },
    // 运营中心
    {
      path: 'operatingListIndex',
      name: 'operatingListIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '线路行程',
        menu: 'TouristrouteOperating',
        permission: 'touristroute/operating/linetravel/company',
        paths: '/touristroute/operating/trip/list'
      }
    },
    // 运营中心-本公司行程列表
    {
      path: 'operating/trip/list',
      component: function (resolve) {
        require(['src/pages/touristroute/OperatingTripList.vue'], resolve);
      },
      name: 'operatingTrip',
      meta: {
        label: '本公司行程',
        menu: 'TouristrouteOperating',
        topMenuConst: 'touristroute',
        permission: 'touristroute/operating/linetravel/company'
      }
    },
    ...getTripDetailRouter(
      'operating/trip/',
      'operatingtrip',
      'touristroute/operating/trip/list/',
      'touristroute',
      'TouristrouteOperating',
      '本公司行程',
      'list'
    ),
    // 运营中心-供应商行程列表
    {
      path: 'operating/supplier/list',
      component: function (resolve) {
        require(['src/pages/touristroute/OperatingTripList.vue'], resolve);
      },
      name: 'operatingSupplierTrip',
      meta: {
        label: '供应商行程',
        menu: 'TouristrouteOperating',
        topMenuConst: 'touristroute',
        permission: 'touristroute/operating/supplier/list'
      }
    },
    ...getTripDetailRouter(
      'operating/supplier/',
      'operating/supplier',
      'touristroute/operating/supplier/list/',
      'touristroute',
      'TouristrouteOperating',
      '供应商行程',
      'list'
    ),
    // 运营中心-供应商行程列表
    {
      path: 'operating/other/list',
      component: function (resolve) {
        require(['src/pages/touristroute/OperatingTripList.vue'], resolve);
      },
      name: 'operatingOtherTrip',
      meta: {
        label: '其他分公司行程',
        menu: 'TouristrouteOperating',
        topMenuConst: 'touristroute',
        permission: 'touristroute/operating/other/list'
      }
    },
    ...getTripDetailRouter(
      'operating/other/',
      'operating/other',
      'touristroute/other/supplier/list/',
      'touristroute',
      'TouristrouteOperating',
      '其他分公司行程',
      'list'
    ),
    // 运营中心-合作运营中心行程列表
    {
      path: 'operating/cooperation/list',
      component: function (resolve) {
        require(['src/pages/touristroute/OperatingTripList.vue'], resolve);
      },
      name: 'operatingCooperationTrip',
      meta: {
        label: '合作运营中心行程',
        menu: 'TouristrouteOperating',
        topMenuConst: 'touristroute',
        permission: 'touristroute/operating/cooperation/list'
      }
    },
    ...getTripDetailRouter(
      'operating/cooperation/',
      'operating/cooperation',
      'touristroute/cooperation/cooperation/list/',
      'touristroute',
      'TouristrouteOperating',
      '合作运营中心行程',
      'list'
    ),
    //--- 运营中心结束

    {
      path: 'tripListIndex',
      name: 'tripListIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '线路行程',
        menu: 'TouristrouteLinetravel',
        permission: 'touristroute/linetravel/company,touristroute/linetravel/supplier,touristroute/linetravel/line',
        paths: '/touristroute/trip/list,/touristroute/supplierTrip/list,/touristroute/lineTrip/list'
      }
    },
    // 行程列表
    {
      path: '/touristroute/other-list',
      component: () => import('src/pages/touristroute/TripList.vue'),
      name: 'lineTrip',
      meta: {
        label: '本公司行程',
        menu: 'TouristrouteLineOther',
        topMenuConst: 'touristroute',
        permission: 'touristroute/linetravel/company'
      }
    },
    ...getTripDetailRouter(
      'trip/',
      'lineTrip',
      'touristroute/linetravel/company/',
      'touristroute',
      'TouristrouteLineOther',
      '本公司行程',
      'list'
    ),
    {
      path: 'other/list',
      component: function (resolve) {
        require(['src/pages/touristroute/TripList.vue'], resolve);
      },
      name: 'other',
      meta: {
        label: '其他公司行程',
        menu: 'TouristrouteLinetravel',
        topMenuConst: 'touristroute',
        permission: 'touristroute/other/list'
      }
    },
    ...getTripDetailRouter(
      'other/',
      'other',
      'touristroute/other/list/',
      'touristroute',
      'TouristrouteLinetravel',
      '其他公司行程',
      'list'
    ),
    // 供应商行程
    {
      path: 'supplierTrip/list',
      component: function (resolve) {
        require(['src/pages/touristroute/TripList.vue'], resolve);
      },
      name: 'supplierTrip',
      meta: {
        label: '供应商行程',
        menu: 'TouristrouteLinetravel',
        topMenuConst: 'touristroute',
        permission: 'touristroute/linetravel/supplier'
      }
    },
    ...getTripDetailRouter(
      'supplierTrip/',
      'supplierTrip',
      'touristroute/linetravel/supplier/',
      'touristroute',
      'TouristrouteLinetravel',
      '供应商行程',
      'list'
    ),
    // 线路行程
    {
      path: 'lineTrip/list',
      component: function (resolve) {
        require(['src/pages/touristroute/LineTripList.vue'], resolve);
      },
      name: 'lineTrip',
      meta: {
        label: '线路行程',
        menu: 'TouristrouteLinetravel',
        topMenuConst: 'touristroute',
        permission: 'touristroute/linetravel/line'
      }
    },
    ...getTripDetailRouter(
      'lineTrip/',
      'lineTrip',
      'touristroute/linetravel/line/',
      'touristroute',
      'TouristrouteLinetravel',
      '线路行程',
      'list'
    ),
    // 合作运营商行程
    {
      path: 'operating/list',
      component: function (resolve) {
        require(['src/pages/touristroute/TripList.vue'], resolve);
      },
      name: 'operatingList',
      meta: {
        label: '合作运营中心行程',
        menu: 'TouristrouteLinetravel',
        topMenuConst: 'touristroute',
        permission: 'touristroute/operating/line'
      }
    },
    ...getTripDetailRouter(
      'operating/',
      'operating',
      'touristroute/operating/line/',
      'touristroute',
      'TouristrouteLinetravel',
      '合作运营中心行程',
      'list'
    ),
    // 旅游线路-线路订单
    {
      path: 'order-list',
      name: 'TouristrouteLineOrderList',
      component: function (resolve) {
        require(['src/pages/touristroute/LineOrderList.vue'], resolve);
      },
      meta: {
        label: '线路订单',
        menu: 'TouristrouteLineorder',
        permission: 'touristroute/lineorder/lineorder'
      }
    },
    // 旅游线路-线路订单-订单详情路由
    ...getOrderDetailRouter(
      'order-list/',
      'TouristrouteLine',
      'touristroute/lineorder/lineorder/',
      'touristroute',
      'TouristrouteLineorder',
      '线路订单',
      '/touristroute/order-list'
    ),
  ]
}

export default TOURISTROUTE_ROUTE;
