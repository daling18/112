export const navigation = [
  // 新菜单权限
  {
    name: "旅游线路",
    iconCls: "side-icon iconfont tourist-icon",
    hidden: false,
    permission: 'touristroute',
    children: [{
        name: '跟团游/自由行',
        path: '/touristroute/trip/list',
        menu: 'TouristrouteLinetravel',
        hidden: false,
        permission: "touristroute/newlinetravel"
      },
      // 分公司
      // {
      //   name: '其他线路行程',
      //   path: '/touristroute/other-list',
      //   menu: 'TouristrouteLineOther',
      //   hidden: false,
      //   permission: 'touristroute/linetravel',
      // },
      // 运营中心
      // {
      //   name: '其他线路行程',
      //   path: '/touristroute/operatingListIndex',
      //   menu: 'TouristrouteOperating',
      //   hidden: false,
      //   permission:'touristroute/operating',
      // },
      // {
      //   name: '线路订单',
      //   path: '/touristroute/order-list',
      //   menu: 'TouristrouteLineorder',
      //   hidden: false,
      //   permission: 'touristroute/lineorder',
      // },
      {
        name: "线路订单",
        path: "/touristroute/v2/lineOrder/list",
        menu: "TouristrouteLineorderV2",
        hidden: false,
        permission: "touristroute/v2/lineOrder"
      }
    ]
  },
  {
    name: "酒店产品",
    iconCls: "side-icon iconfont hotel-icon",
    hidden: false,
    permission: 'hotel',
    children: [{
        name: '酒店管理',
        path: '/hotel/hotelList',
        menu: 'Hotelmanage',
        hidden: false,
        permission: "hotel/hotelList,hotel/hotelList/editStatus"
      },
      {
        name: "房型管理",
        path: "/hotel/hotelroomsTypeList",
        menu: "HotelroomsType",
        hidden: false,
        permission: "hotel/hotelroomsTypeList"
      },
      {
        name: "合库管理",
        path: "/hotel/hotelMergeList",
        menu: "hotelMergeList",
        hidden: false,
        permission: "hotel/hotelMergeList"
      }
    ]
  },
  {
    name: "单项产品",
    iconCls: "side-icon iconfont single-icon",
    hidden: false,
    permission: "singlepro",
    children: [
      // {
      //   name: '酒店管理',
      //   path: '/singlepro/hotel',
      //   menu: 'SingleproHotel',
      //   hidden: false,
      //   permission:'singlepro/hotel/hotellist',
      // },
      {
        name: "景区管理",
        path: "/singlepro/scenic/list",
        menu: "SingleproTicket",
        hidden: false,
        permission: "singlepro/ticket"
      },
      {
        name: "签证产品",
        path: "/singlepro/visa/list",
        menu: "SingleproVisa",
        hidden: false,
        permission: "singlepro/visa/visalist"
      },
      {
        name: "农特优产品",
        path: "/singlepro/localProduct/list",
        menu: "SingleproLocalproduct",
        hidden: false,
        permission: "singlepro/localproduct"
      },
      {
        name: "单项订单",
        path: "/singlepro/single-order",
        menu: "SingleproSingleorder",
        hidden: false,
        // permission:'singlepro/singleorder/hotel/orderlist,singlepro/singleorder/ticket/orderlist,singlepro/singleorder/flight/orderlist,singlepro/singleorder/train/orderlist,singlepro/singleorder/visaorder/orderlist,singlepro/singleorder/localproductorder',
        permission: "singlepro/singleorder"
      },
      // 订单退货
      {
        name: "订单退货",
        path: "/singlepro/sales-return",
        menu: "SingleproSalesReturn",
        hidden: false,
        // permission:'singlepro/singleorder/hotel/orderlist,singlepro/singleorder/ticket/orderlist,singlepro/singleorder/flight/orderlist,singlepro/singleorder/train/orderlist,singlepro/singleorder/visaorder/orderlist,singlepro/singleorder/localproductorder',
        permission: "singlepro/salesReturn"
      },
      {
        name: "自营订单",
        path: "/singlepro/selfsupport-order",
        menu: "SingleproSelforder",
        hidden: false,
        // permission:'singlepro/selforder/hotel/orderlist,singlepro/selforder/tickertorder/orderlist,singlepro/selforder/visaorder/orderlist,singlepro/selforder/localproductorder/orderlist',
        permission: "singlepro/selforder"
      },
      {
        name: "保险产品",
        path: "/singlepro/insurance/list",
        menu: "SingleproInsurance",
        hidden: false,
        permission: "singlepro/insurance"
      },
      //新添-机票订单
      {
        name: "机票订单",
        path: "/singlepro/airOrder/list",
        menu: "SingleproAirOrder",
        hidden: false,
        permission: "singlepro/airOrder"
      }
    ]
  },
  {
    name: "团控中心",
    iconCls: "side-icon iconfont tuan-icon",
    hidden: false,
    permission: "tuancontro",
    children: [
      {
        name: "线路团控",
        path: "/tuancontro/list-line",
        menu: "TuancontroLine",
        hidden: false,
        permission: "tuancontro/line"
      },
      {
        name: "单项团控",
        path: "/tuancontro/single",
        menu: "TuancontroSingle",
        hidden: false,
        permission: "tuancontro/single"
      }
    ]
  },
  {
    name: "销售中心",
    iconCls: "side-icon iconfont sale-icon",
    hidden: false,
    permission: "salecenter",
    children: [
      {
        name: "旅游线路",
        path: "/salecenter/line",
        menu: "SalecenterTuan",
        hidden: false,
        permission: "salecenter/tuan"
      },
      {
        name: "旅游线路",
        path: "/salecenter/operating",
        menu: "SalecenterOperating",
        hidden: false,
        permission: "salecenter/operating"
      },
      {
        name: "意向跟踪",
        path: "/salecenter/trace",
        menu: "SalecenterTrace",
        hidden: false,
        permission: "salecenter/trace"
      },
      {
        name: "机票",
        path: "/salecenter/flight",
        menu: "SalecenterFlightInland",
        hidden: false,
        permission: "salecenter/flight/inland,salecenter/flight/internation"
      },
      {
        name: "酒店",
        path: "/salecenter/hotel",
        menu: "SalecenterHotel",
        hidden: false,
        permission: "salecenter/hotel"
      },
      {
        name: "门票",
        path: "/salecenter/ticket-list",
        menu: "SalecenterTicket",
        hidden: false,
        permission: "salecenter/ticket"
      },
      {
        name: "火车票",
        path: "/salecenter/train-list",
        menu: "SalecenterTrain",
        hidden: false,
        permission: "salecenter/train"
      },
      {
        name: "签证",
        path: "/salecenter/visa/list",
        menu: "SalecenterVisa",
        hidden: false,
        permission: "salecenter/visa"
      },
      {
        name: "农特优",
        path: "/salecenter/local-product/list",
        menu: "SalecenterLocalproduct",
        hidden: false,
        permission: "salecenter/localproduct"
      },
      {
        name: "保险产品",
        path: "/salecenter/insurance_reverse/list",
        menu: "SalecenterInsurance",
        hidden: false,
        permission: "salecenter/insurance"
      }
    ]
  },
  {
    name: "采购订单",
    iconCls: "side-icon iconfont purchaseorder-icon",
    hidden: false,
    permission: "purchaseorder",
    children: [
      {
        name: "线路订单",
        path: "/purchaseorder/line",
        menu: "PurchaseorderLineorder",
        hidden: false,
        permission: "purchaseorder/lineorder"
      }
    ]
  },
  {
    name: "店铺订单",
    iconCls: "side-icon iconfont shop-icon",
    hidden: false,
    permission: "shoporder",
    children: [
      {
        name: "线路订单",
        path: "/shoporder/line",
        menu: "ShoporderLineorder",
        hidden: false,
        permission: "shoporder/lineorder"
      },
      {
        name: "酒店订单",
        path: "/shoporder/hotel",
        menu: "ShoporderHotelorder",
        hidden: false,
        permission: "shoporder/hotelorder"
      }
    ]
  },
  {
    name: "销售订单",
    iconCls: "side-icon iconfont saleorder-icon",
    hidden: false,
    permission: "saleorder",
    children: [
      {
        name: "线路订单",
        path: "/saleorder/line",
        menu: "SaleorderLineorder",
        hidden: false,
        permission: "saleorder/lineorder"
      },
      {
        name: "线路订单",
        path: "/saleorder/v2/lineOrder/list",
        menu: "saleorderLineorder",
        hidden: false,
        permission: "saleorder/v2/lineorder"
      },
      {
        name: "机票订单",
        path: "/saleorder/flight-order",
        menu: "SaleorderFlightorder",
        hidden: false,
        permission: "saleorder/flightorder"
      },
      {
        name: "门票订单",
        path: "/saleorder/ticket-order",
        menu: "SaleorderTicketorder",
        hidden: false,
        permission: "saleorder/ticketorder"
      },
      {
        name: "火车票订单",
        path: "/saleorder/train",
        menu: "TrainSaleOrder",
        hidden: false,
        permission: "saleorder/train/orderlist"
      },
      {
        name: "酒店订单",
        path: "/saleorder/hotel",
        menu: "HotelSaleOrder",
        hidden: false,
        permission: "saleorder/hotel/orderlist"
      },
      {
        name: "签证订单",
        path: "/saleorder/visa",
        menu: "SaleorderVisaorder",
        hidden: false,
        permission: "saleorder/visaorder/orderlist"
      },
      {
        name: "农特优订单",
        path: "/saleorder/local-product-order",
        menu: "SaleorderLocalproductorder",
        hidden: false,
        permission: "saleorder/localproductorder"
      },
      {
        name: "保险订单",
        path: "/saleorder/insurance",
        menu: "SaleorderInsurance",
        hidden: false,
        permission: "saleorder/insurance"
      }
    ]
  },
  {
    name: "政策设置",
    iconCls: "side-icon iconfont policy-icon",
    hidden: false,
    permission: "policy",
    children: [
      {
        name: "酒店分润政策设置",
        path: "/policy/profitSetting",
        menu: "HotelPolicy",
        hidden: false,
        permission: "policy/profitSetting"
      },
      {
        name: "线路分润政策设置",
        path: "/policy/line-profitSetting",
        menu: "LinePolicy",
        hidden: false,
        permission: "policy/lineProfitSetting"
      }
    ]
  },
  {
    name: "客户管理",
    iconCls: "side-icon iconfont client-icon",
    hidden: false,
    permission: "client",
    children: [
      {
        name: "客户列表",
        path: "/client/list",
        menu: "ClientList",
        hidden: false,
        permission: "client/list"
      }
    ]
  },
  {
    name: '促销管理',
    iconCls: 'side-icon iconfont client-icon',
    hidden: false,
    permission: 'coupon',
    children: [
      {
        name: '优惠券管理',
        path: '/coupon/list',
        menu: 'couponList',
        hidden: false,
        permission: 'coupon/list'
      }
      // {
      //   name: '促销活动管理',
      //   path: '/coupon/recordList',
      //   menu: 'recordList',
      //   hidden: false,
      //   permission: 'coupon/recordList'
      // }
    ]
  },
  {
    name: '结算中心',
    iconCls: 'side-icon iconfont settlement-icon',
    hidden: false,
    permission: "settlement",
    children: [
      {
        name: "团队账单",
        path: "/settlement/tuan-bill/list",
        menu: "SettlementTuanac",
        hidden: false,
        permission: "settlement/tuanac/gettuanac"
      },
      {
        name: "资金结算",
        path: "/settlement/settle/index",
        menu: "SettlementFundsett",
        hidden: false,
        permission:
          "settlement/fundsett/peer,settlement/fundsett/guest,settlement/fundsett/accbalan"
      },
      {
        name: "中行账户",
        path: "/settlement/bocacc/balance-list",
        menu: "SettlementBocaccount",
        hidden: false,
        permission: "settlement/bocaccount"
      },
      {
        name: "收款认款",
        path: "/settlement/recpay/index",
        menu: "SettlementRecpay",
        hidden: false,
        permission: "settlement/recpay"
      },
      {
        name: "销售利润结算",
        path: "/settlement/saleprofit/index",
        menu: "SettlementSale",
        hidden: false,
        permission: "settlement/saleProfix"
      },
      {
        name: "批发分润结算",
        path: "/settlement/batchprofit/index",
        menu: "SettlementBatch",
        hidden: false,
        permission: "settlement/batchProfix"
      },
      {
        name: "拉新分润结算",
        path: "/settlement/pullnewprofit/index",
        menu: "SettlementPullNew",
        hidden: false,
        permission: "settlement/pullNewProfix"
      },
      {
        name: "分公司奖励",
        path: "/settlement/companyReward/index",
        menu: "SettlementCompanyReward",
        hidden: false,
        permission: "settlement/companyReward"
      },
      {
        name: "供应商结算",
        path: "/settlement/supplier/index",
        menu: "SettlementSupplier",
        hidden: false,
        permission: "settlement/supplier"
      },
      {
        name: "线路结算",
        path: "/settlement/line/index",
        menu: "SettlementLine",
        hidden: false,
        permission: "settlement/line"
      },
      {
        name: "付款",
        path: "/settlement/pay/index",
        menu: "SettlementPay",
        hidden: false,
        permission: "settlement/pay"
      },
      {
        name: "发票管理",
        path: "/settlement/invoice/index",
        menu: "SettlementInvoice",
        hidden: false,
        permission: "settlement/invoice/cost,settlement/invoice/income"
      },
      {
        name: "往来帐户",
        path: "/settlement/conacc/index",
        menu: "SettlementConacc",
        hidden: false,
        permission: "settlement/conacc"
      },
      {
        name: "退款处理",
        path: "/settlement/refdeal/list",
        menu: "SettlementRefunddeal",
        hidden: false,
        permission: "settlement/refunddeal"
      },
      {
        name: "线路退款处理",
        path: "/settlement/v2/refund/list",
        menu: "SettlementRefundListV2",
        hidden: false,
        permission: "settlement/v2/refund"
      },
      {
        name: "手续费",
        path: "/settlement/brokerage/list",
        menu: "SettlementBrokerage",
        hidden: false,
        permission: "settlement/brokerage"
      },
      {
        name: "返佣单",
        path: "/settlement/rebate/waiting-list",
        menu: "SettlementBerate",
        hidden: false,
        permission: "settlement/rebate/wattinglist"
      },
      {
        name: "收益统计",
        path: "/settlement/earnings/list",
        menu: "SettlementEarnings",
        hidden: false,
        permission: "settlement/earnings"
      }
    ]
  },
  {
    name: "统计报表",
    iconCls: "side-icon iconfont statrepo-icon",
    hidden: false,
    permission: "statrepo",
    children: [
      {
        name: "财务报表",
        path: "/statrepo/fin/index",
        menu: "StatrepoFinarepo",
        hidden: false,
        permission: "statrepo/finarepo"
      },
      {
        name: "分公司财务报表",
        path: "/statrepo/comp/list",
        menu: "StatrepoComprepo",
        hidden: false,
        permission: "statrepo/comprepo"
      },
      {
        name: "订单流水表",
        path: "/statrepo/order/list",
        menu: "StatrepoOrderList",
        hidden: false,
        permission: "statrepo/order/list"
      },
      {
        name: "订单统计报表",
        path: "/statrepo/statistics/list",
        menu: "StatrepoStatistics",
        hidden: false,
        permission: "statrepo/statistics/list"
      }
    ]
  },
  {
    name: "系统管理",
    iconCls: "side-icon iconfont sysmana-icon",
    hidden: false,
    permission: "sysmana",
    children: [
      {
        name: "账号管理",
        path: "/sysmana/account/index",
        menu: "SysAccountList",
        hidden: false,
        permission: "sysmana/account/selflist,sysmana/account/list"
      },
      {
        name: "销售账号管理",
        path: "/sysmana/saleaccount/list",
        menu: "SysSaleaccountList",
        hidden: false,
        permission: "sysmana/saleaccount/list"
      },
      {
        name: "角色管理",
        path: "/sysmana/role/list",
        menu: "SysRoleList",
        hidden: false,
        permission: "sysmana/role"
      },
      {
        name: "审批配置",
        path: "/sysmana/approval/config-list",
        menu: "StatrepoAppconf",
        hidden: false,
        permission: "sysmana/appconf"
      },
      {
        name: "盈科公告管理",
        path: "/sysmana/workplatform/notice",
        menu: "workPlatformNotice",
        hidden: false,
        permission: "sysmana/workplatform/notice"
      },
      {
        name: "宣传资料管理",
        path: "/sysmana/workplatform/means",
        menu: "workPlatformMeans",
        hidden: false,
        permission: "sysmana/workplatform/means"
      },
      {
        name: "系统说明管理",
        path: "/sysmana/workplatform/title",
        menu: "workPlatformTitle",
        hidden: false,
        permission: "sysmana/workplatform/title"
      }
    ]
  },
  {
    name: "基础数据管理",
    iconCls: "side-icon iconfont basedata-icon",
    hidden: false,
    permission: "basedata",
    children: [
      {
        name: "供应商信息",
        path: "/basedata/tripListIndex",
        menu: "BasedataSupplier",
        hidden: false,
        permission: "basedata/supplier"
      },
      {
        name: "合作客户",
        path: "/basedata/cooperation",
        menu: "BasedataCustomers",
        hidden: false,
        permission: "basedata/customers"
      },
      {
        name: "店铺管理",
        path: "/basedata/shop",
        menu: "BasedataShop",
        hidden: false,
        permission: "basedata/shop"
      },
      {
        name: "合作分公司",
        path: "/basedata/filialeCooperation",
        menu: "FilialeCooperationList",
        hidden: false,
        permission: "basedata/filialeCooperation"
      },
      {
        name: "客户信息",
        path: "/basedata/client/list",
        menu: "BasedataClientdata",
        hidden: false,
        permission: "basedata/clientdata"
      },
      {
        name: "组织机构",
        path: "/basedata/organization",
        menu: "BasedataOrg",
        hidden: false,
        permission: "basedata/org"
      },
      {
        name: "营业部信息",
        path: "/basedata/salesDepartment",
        menu: "Department",
        hidden: false,
        permission: "basedata/department"
      }
    ]
  },
  {
    name: "旅游资源数据",
    iconCls: "side-icon iconfont traveldata-icon",
    hidden: false,
    permission: "traveldata",
    children: [
      {
        name: "图片",
        path: "/traveldata/picture-list",
        menu: "TraveldataPhotoalbum",
        hidden: false,
        permission: "traveldata/photoalbum"
      },
      // {
      //   name: '线路类别',
      //   path: '',
      //   menu: 'TraveldataTuan',
      //   hidden: false,
      //   permission:'traveldata/tuan',
      // },
      {
        name: "酒店品牌",
        path: "/traveldata/hotel-brand/list",
        menu: "TraveldataHotel",
        hidden: false,
        permission: "traveldata/hotel,traveldata/hotel/list"
      },
      {
        name: "产品标签",
        path: "/traveldata/product-tag/list",
        menu: "TraveldataTag",
        hidden: false,
        permission: "traveldata/tag"
      },
      {
        name: "商品分类",
        path: "/traveldata/good/list",
        menu: "TraveldataGoodscate",
        hidden: false,
        permission: "traveldata/goodscate,traveldata/goodscate/goodscatelist"
      }
    ]
  },
  {
    name: "微信小程序",
    iconCls: "side-icon iconfont wechat-icon",
    hidden: false,
    permission: "wechatapp",
    children: [
      {
        name: "数据统计",
        path: "/wechat/bind/index",
        menu: "WechatBind",
        hidden: false,
        permission: "wechatapp"
      },
      {
        name: "默认名片",
        path: "/wechat/name-card",
        menu: "WechatNameCard",
        hidden: false,
        permission: "wechatapp"
      },
      // {
      //   name: '佣金管理',
      //   path: '/wechat/commission/',
      //   menu: 'WechatCommission',
      //   hidden: false,
      //   permission:'wechatapp',
      // },
      {
        name: "功能设置",
        path: "/wechat/fun-setting/",
        menu: "WechatFunSetting",
        hidden: false,
        permission: "wechatapp"
      },
      // {
      //   name: '工作交接',
      //   path: '/wechat/work-link',
      //   menu: 'WechatWorkLink',
      //   hidden: false,
      //   permission:'wechatapp',
      // },
      {
        name: "话术管理",
        path: "/wechat/manager-words",
        menu: "WechatManagerWrods",
        hidden: false,
        permission: "wechatapp"
      }
      // {
      //   name: '商城设置',
      //   path: '/wechat/shop-setting',
      //   menu: 'WechatShop',
      //   hidden: false,
      //   permission:'wechatapp',
      // },
      // {
      //   name: '支付设置',
      //   path: '/wechat/pay-setting',
      //   menu: 'WechatPay',
      //   hidden: false,
      //   permission:'wechatapp',
      // },
      // {
      //   name: '分销设置',
      //   path: '/wechat/distribution-setting',
      //   menu: 'WechatDistribution',
      //   hidden: false,
      //   permission:'wechatapp',
      // },
    ]
  },
  {
    name: "客服专用",
    iconCls: "side-icon iconfont kfservice-icon",
    hidden: false,
    permission: "kfservice",
    children: [
      {
        name: "线路订单",
        path: "/kfservice/order",
        menu: "KfserviceOrder",
        hidden: false,
        permission: "kfservice"
      },
      {
        name: '线路订单v2',
        path: '/kfservice/v2/order',
        menu: 'KfserviceOrderV2',
        hidden: false,
        permission: 'kfserviceV2'
      }
    ]
  },
  {
    name: "C端会员管理",
    iconCls: "side-icon iconfont member-icon",
    hidden: false,
    permission: "member",
    children: [
      {
        name: "用户管理",
        path: "/member/list",
        menu: "MemberList",
        hidden: false,
        permission: "member/list"
      }
    ]
  }

  /**  旧菜单备份  -- qzh 20190131
    {
      name: '计调操作',
      iconCls: 'side-icon plan-icon',
      hidden: false,
      permission:'api/operator,api_supplier',
      children: [
        {
          name: '团控中心',
          path: '/control/index',
          menu: 'control',
          hidden: false,
          permission:'api/tuan/index',
        },
        {
          name: '线路行程',
          path: '/plan/tripListIndex',
          menu: 'group',
          hidden: false,
          permission:'api/product,api/product/supplier_product_lists,api_supplier/product/lists,api/intention/get_intent_list',
        },
        {
          name: '团队订单',
          path: '/plan/order-list',
          menu: 'planOrderList',
          hidden: false,
          permission:'api/tuan/op_order_list',
        },
        {
          name: '单项订单',
          path: '/plan/single-order',
          menu: 'planSingleOrder',
          hidden: false,
          permission:'api/ticket/order_list/2,api/flight/order_list/2,api/selfsupport.visaorder/op_order_list,api/selfsupport.localproductorder/lists',
        },
        {
          name: '自营订单',
          path: '/plan/selfsupport-order',
          menu: 'planSelfSupportOrder',
          hidden: false,
          permission:'api/hotel/orderList/3,api/selfsupport.visaorder/op_self_order_list,api/selfsupport.localproductorder/self_lists,api/ticket/order_list/3',
        },
        {
          name: '发票管理',
          path: '/plan/planinvoice',
          menu: 'planInvoice',
          name: '保险产品',//老的6个月之前提交的暂时不知道谁的
          path: '/singlepro/insurance/list',
          menu: 'SingleproInsurance',
          hidden: false,
          permission: 'singlepro/insurance'
        },
        //新添-机票订单
        {
          name: '机票订单',
          path: '/singlepro/airOrder/list',
          menu: 'SingleproAirOrder',
          hidden: false,
          permission: 'singlepro/airOrder'
        }
      ]
    },
    {
      name: '团控中心',
      iconCls: 'side-icon tuan-icon',
      hidden: false,
      permission:'tuancontro',
      children: [
        {
          name: '线路团控',
          path: '/tuancontro/list-line',
          menu: 'TuancontroLine',
          hidden: false,
          permission:'api/invoice/income_lists',
        },
        // {
        //   name: '门票管理',
        //   path: '/plan/ticket',
        //   menu: 'planTicket',
        //   hidden: false,
        //   permission:'api/invoice/income_lists',
        // },
        {
          name: '收款付款',
          path: '/plan/applied',
          menu: 'planApplied',
          hidden: false,
          permission:'api/tuan/applied_list',
        },
      ]
    },
    {
      name: '分销中心',
      iconCls: 'side-icon distribution-icon',
      hidden: false,
      permission:'api/distribution_center',
      children: [
        {
          name: '我的订单',
          path: '/distribution/my-order',
          menu: 'distributionMyOrder',
          hidden: false,
          permission:'api/order/sale_order_list,api/hotel/orderList/1,api/ticket/order_list/1,api/flight/order_list/1,api/train/my_order_list,api/selfsupport.visaorder/order_list,api/selfsupport.localproductorder/my_sale_lists',
        },
        {
          name: '采购订单',
          path: '/distribution/purchase-order',
          menu: 'distributionPurchaseOrder',
          hidden: false,
          permission:'api/order/sale_purchase_order_list',
        },
        {
          name: '机票',
          path: '/distribution/flight-inland',
          menu: 'DistributionFlight',
          hidden: false,
          permission:'api/intl_flight/inquiry,api/domestic_flight/inquiry'
        },
        {
          name: '酒店',
          path: '/distribution/hotel',
          menu: 'DistributionHotel',
          hidden: false,
          permission:'api/hotel/index',
        },
        {
          name: '线路',
          path: '/distribution/line-list',
          menu: 'distributionLineList',
          hidden: false,
          permission:'api/product/self_sale_product_list,api/product/distribution_product_list',
        },
        {
          name: '门票',
          path: '/distribution/ticket-list',
          menu: 'distributionTicketList',
          hidden: false,
          permission:'api/selfsupport.scenic/scenicList',
        },
        {
          name: '火车票',
          path: '/distribution/train-list',
          menu: 'distributionTrainList',
          hidden: false,
          permission:'api/train/get_ticket',
        },
        {
          name: '签证',
          path: '/distribution/visa/list',
          menu: 'distributionVisaList',
          hidden: false,
          permission:'api/selfsupport.visa/book_list',
        },
        {
          name: '农特优',
          path: '/distribution/local-product/list',
          menu: 'distributionLocalProductList',
          hidden: false,
          permission:'api/selfsupport.localproduct/sale_lists',
        }
      ]
    },
    {
      name: '销售中心',
      iconCls: 'side-icon sale-icon',
      hidden: false,
      permission:'api/sale',
      children: [
        // “销售下单”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180904
        // {
        //   name: '我的订单',
        //   path: '/sale/order/team',
        //   menu: 'saleTeamOrder',
        //   hidden: false,
        //   permission:'api/tuan/sale_order_list',
        // },
        // {
        //   name: '销售下单',
        //   path: '/sale/order/tuan-list-xc',
        //   menu: 'saleTuanList',
        //   hidden: false,
        //   permission:'api/product/sale_product_list',
        // },
        {
          name: '收款认款',
          path: '/sale/recognition/index',
          menu: 'saleOrderRecognition',
          hidden: false,
          permission:'api/tuan/sale_order_renkuan,api/zhike/receipts_list',
        },
        {
          name: '发票管理',
          path: '/sale/saleinvoice',
          menu: 'saleInvoice',
          hidden: false,
          permission:'api/invoice/sale_income_lists',
        },
      ]
    },
    {
      name: '自营单项',
      iconCls: 'side-icon self-icon',
      hidden: false,
      permission: 'api/selfsupport',
      children: [
        {
          name: '基础信息',
          path: '/self-support/baseInfoIndex',
          menu: 'selfSupportBaseinfo',
          hidden: false,
          permission:'api/selfsupport.hotel/brandList,api/selfsupport.tag/index,api/selfsupport.goodscate/lists',
        },
        {
          name: '酒店产品',
          path: '/self-support/hotel',
          menu: 'SelfSupportDxHotel',
          hidden: false,
          permission:'api/selfsupport.hotel/hotelList'
        },
        {
          name: '房型产品',
          path: '/self-support/room',
          menu: 'SelfSupportDxRoom',
          hidden: false,
          permission:'api/selfsupport.hotel/roomList'
        },
        {
          name: '景区管理',
          path: '/self-support/scenic/list',
          menu: 'selfSupportScenic',
          hidden: false,
          permission:'api/selfsupport.scenic/index',
        },
        {
          name: '签证产品',
          path: '/self-support/visa/list',
          menu: 'selfSupportVisaList',
          hidden: false,
          permission:'api/selfsupport.visa/visa_list',
        },
        {
          name: '农特优产品',
          path: '/self-support/localProduct/list',
          menu: 'selfSupportLocalProductList',
          hidden: false,
          permission:'api/selfsupport.localproduct/lists',
        },
      ]
    },
    // 取消门店操作菜单  by qzhchen 20180918
    // {
    //   name: '门店操作',
    //   iconCls: 'side-icon store-icon',
    //   hidden: false,
    //   permission:'api_store',
    //   children: [
    //     /**
    //       // “产品查询”和“我的订单”页面调整到“分销中心”下  by qzhchen 20180912
    //     {
    //       name: '我的订单',
    //       path: '/store-sale/order-list',
    //       menu: 'storeSaleOrderList',
    //       hidden: false,
    //       permission:'api_store/sale/order_list',
    //     },
    //     {
    //       name: '产品查询',
    //       path: '/store-sale/product-list',
    //       menu: 'storeSaleProductList',
    //       hidden: false,
    //       permission:'api_store/sale/product_list',
    //     },*  /
    //     {
    //       name: '发票管理',
    //       path: '/store-sale/invoice-list',
    //       menu: 'storeSaleInvoiceList',
    //       hidden: false,
    //       permission:'api_store/invoice/sale_lists',
    //     },
    //     {
    //       name: '资金结算',
    //       path: '/store/fund-settlement',
    //       menu: 'storeFundSettlement',
    //       hidden: false,
    //       permission:'api_store/finance/index'
    //     }
    //   ]
    // },
    {
      name: '财务操作',
      iconCls: 'side-icon finance-icon',
      hidden: false,
      permission:'api/finance',
      children: [
        {
          name: '账户余额',
          path: '/finace/account-balance',
          menu: 'finaceAccountBalance',
          hidden: false,
          permission:'api/finance/org_balance_list',
        },
        {
          name: '资金结算',
          path: '/fund-settlement',
          menu: 'finaceFundsettlement',
          hidden: false,
          permission:'api/finance/index',
        },
        {
          name: '中行账户',
          path: '/settlement/bocacc/balanceList',
          menu: 'SettlementBocaccount1',
          hidden: false,
          permission:'api/finance/boc_balance_list',
        },
        {
          name: '收款认款',
          path: '/settlement/recpay/receiptList',
          menu: 'SettlementRecpay',
          hidden: false,
          permission:'api/finance/all_receipt_list',
        },
        {
          name: '手续费',
          path: '/finace/servicecharge',
          menu: 'finaceServicechange',
          hidden: false,
          permission:'api/finance/index',
        },
        {
          name: '退款处理',
          path: '/finace/refund',
          menu: 'finaceRefund',
          hidden: false,
          permission:'api/finance/get_refund_list',
        },
        {
          name: '团队账单',
          path: '/finace/tuanBillListIndex',
          menu: 'finaceTeambillin',
          hidden: false,
          permission:'api/finance/order_list',
        },
        {
          name: '财务信息',
          path: '/finace/account',
          menu: 'finaceInfo',
          hidden: false,
          permission:'api/finance/get_payment_account_list',
        },
        // {
        //   name: '业务审批',
        //   path: '/finace/approval',
        //   menu: 'finaceApproval',
        //   hidden: false,
        //   permission:'api/finance/check_receipt_list,api/finance/check_renkuan_list',
        // },
        {
          name: '付款处理',
          path: '/finace/applied',
          menu: 'financeApplied',
          hidden: false,
          permission:'api/finance/applied_list',
        },
        {
          name: '财务报表',
          path: '/fin/report?id=0',
          menu: 'report',
          hidden: false,
          permission:'api/finance',
          pRoleCode: [0,1,3]
        },
        {
          name: '分公司报表',
          path: '/fin/branch-report',
          menu: 'branchReport',
          hidden: false,
          permission:'api/finance/reports_branch_companys',
          pRoleCode: [0,1]
        },
        {
          name: '发票管理',
          path: '/finace/invoice',
          menu: 'financeInvoice',
          hidden: false,
          permission: 'api/invoice/audit_invoice_list,api/invoice/finance_income_lists,api/invoice/finance_cost_lists',
        },
      ]
    },
    {
      name: '合同管理',
      iconCls: 'side-icon contract-icon',
      hidden: false,
      permission:'api/contract',
      children: [
        {
          name: '合同领取',
          path: '/contract/pulldown/index',
          menu: 'contractPulldown',
          hidden: false,
          permission:'api/contract/menu/1',
        },
        {
          name: '合同审核',
          path: '/contract/audit/index',
          menu: 'contractAudit',
          hidden: false,
          permission:'api/contract/menu/2',
        },
        {
          name: '合同查询',
          path: '/contract/query/index',
          menu: 'contractQuery',
          hidden: false,
          permission:'api/contract/blank/cx',
        },
        {
          name: '快递信息',
          path: '/contract/express/index',
          menu: 'expressIndex',
          hidden: false,
          permission:'api/express/index',
        }
      ]
    },
    {
      name: '系统管理',
      iconCls: 'side-icon setting-icon',
      hidden: false,
      permission:'api/system',
      children: [
        {
          name: '审批单',
          path: '/system/approval/index',
          menu: 'SystemApproval',
          hidden: false,
          permission:'api/approval/my_start_approval_list',
        },
        {
          name: '审批配置',
          path: '/system/approval/config-list',
          menu: 'SystemApprovalConfig',
          hidden: false,
          permission:'api/approval/approval_config_list',
        },
        {
          name:"盈科公告管理",
          path: '/sysmana/workplatform/notice',
          menu:"workPlatformNotice",
          hidden: false,
          permission: 'sysmana/workplatform/notice'
        },
        {
          name:"宣传资料管理",
          path: '/sysmana/workplatform/means',
          menu:"workPlatformMeans",
          hidden: false,
          permission: 'sysmana/workplatform/means'
        },
        {
          name:"系统说明管理",
          path: '/sysmana/workplatform/title',
          menu:"workPlatformTitle",
          hidden: false,
          permission: 'sysmana/workplatform/title'
        },
        {
          name: '账号管理',
          path: '/account/index',
          menu: 'SysAccountList',
          hidden: false,
          permission:'api/user/self_index,api/user',
        },
        {
          name: '组织机构',
          path: '/organization',
          menu: 'Organization',
          hidden: false,
          permission:'api/orgination/org_list,api/orgination/self_detail',
        },
        {
          name: '角色管理',
          path: '/role/list',
          menu: 'SysRoleList',
          hidden: false,
          permission:'api/auth/get_roles',
        },
        {
          name: '客户信息',
          path: '/system/client/list',
          menu: 'SysClientList',
          hidden: false,
          permission:'api/client/client_list',
        },
        {
          name: '合作客户',
          path: '/system/cooperation',
          menu: 'sysCooperation',
          hidden: false,
          permission:'api_supplier/supplier/cooperative_customers',
        },
        {
          name: '供应商管理',
          path: '/system/supplier',
          menu: 'supplierManagement',
          hidden: false,
          permission:'api_supplier/supplier/supplier_list',
        },
        {
          name: '图片管理',
          path: '/system/picture-list',
          menu: 'pictureManagement',
          hidden: false,
          permission:'api/photoalbum/get_photoalbum_list',
        }
      ]
    },
    {
      name: '微信小程序',
      iconCls: 'side-icon wechat-icon',
      hidden: false,
      permission:'api/wechat',
      children: [
        {
          name: '数据统计',
          path: '/wechat/bind/index',
          menu: 'WechatBind',
          hidden: false,
          permission:'api/wechat',
        },
        {
          name: '默认名片',
          path: '/wechat/name-card',
          menu: 'WechatNameCard',
          hidden: false,
          permission:'api/wechat',
        },
        // {
        //   name: '佣金管理',
        //   path: '/wechat/commission/',
        //   menu: 'WechatCommission',
        //   hidden: false,
        //   permission:'api/wechat',
        // },
        {
          name: '功能设置',
          path: '/wechat/fun-setting/',
          menu: 'WechatFunSetting',
          hidden: false,
          permission:'api/wechat',
        },
        // {
        //   name: '工作交接',
        //   path: '/wechat/work-link',
        //   menu: 'WechatWorkLink',
        //   hidden: false,
        //   permission:'api/wechat',
        // },
        {
          name: '话术管理',
          path: '/wechat/manager-words',
          menu: 'WechatManagerWrods',
          hidden: false,
          permission:'api/wechat',
        },
        // {
        //   name: '商城设置',
        //   path: '/wechat/shop-setting',
        //   menu: 'WechatShop',
        //   hidden: false,
        //   permission:'api/wechat',
        // },
        // {
        //   name: '支付设置',
        //   path: '/wechat/pay-setting',
        //   menu: 'WechatPay',
        //   hidden: false,
        //   permission:'api/wechat',
        // },
        // {
        //   name: '分销设置',
        //   path: '/wechat/distribution-setting',
        //   menu: 'WechatDistribution',
        //   hidden: false,
        //   permission:'api/wechat',
        // },
      ]
    },
    // 取消门店操作菜单  by qzhchen 20180918
    // {
    //   name: '营业部财务',
    //   iconCls: 'side-icon store-icon',
    //   hidden: false,
    //   permission:'api_store/invoice',
    //   children: [
    //     {
    //       name: '发票管理',
    //       path: '/store-finace/invoice-approval',
    //       menu: 'storeFinaceInvoiceList',
    //       hidden: false,
    //       permission:'api_store/invoice/audit_list',
    //     }
    //   ]
    // }
  */
];
