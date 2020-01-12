// 单项产品
import Home from 'src/layouts/';
import {
  getVisaDetailRouter,
  getLocalProductDetailRouter,
  getReceiveDetailRouter,
} from './compose-router';


const SINGLEPRO_ROUTE = {
  path: '/singlepro',
  component: Home,
  name: 'singlepro',
  meta: {
    label: '单项产品'
  },
  children: [
    // 自营单项-签证产品
    {
      path: 'visa/list',
      component: function (resolve) {
        require(['src/pages/singlepro/VisaList.vue'], resolve);
      },
      name: 'SingleProVisaList',
      meta: {
        topMenuConst: 'singlepro',
        label: '签证产品',
        menu: 'SingleproVisa',
        btnPath: 'add',
        btnName: '+ 新增签证',
        btnPermission: 'singlepro/visa/addvisa',
        permission: 'singlepro/visa/visalist'
      }
    },
    // 自营单项-添加签证产品
    {
      path: 'visa/add',
      component: function (resolve) {
        require(['src/pages/singlepro/VisaEdit.vue'], resolve);
      },
      name: 'SingleProVisaAdd',
      meta: {
        topMenuConst: 'singlepro',
        label: '新增签证',
        menu: 'SingleproVisa',
        parent_label:'签证产品',
        parent_path:'list',
        permission: 'singlepro/visa/addvisa'
      }
    },
    // 自营单项-编辑签证产品
    {
      path: 'visa/edit',
      component: function (resolve) {
        require(['src/pages/singlepro/VisaEdit.vue'], resolve);
      },
      name: 'SingleProVisaEdit',
      meta: {
        topMenuConst: 'singlepro',
        label: '编辑签证',
        menu: 'SingleproVisa',
        parent_label:'签证产品',
        parent_path:'list',
        permission: 'singlepro/visa/addvisa'
      }
    },
    // 自营单项-签证产品详情
    {
      path: 'visa/detail',
      component: function (resolve) {
        require(['src/pages/singlepro/VisaDetail.vue'], resolve);
      },
      name: 'SingleProVisaDetail',
      meta: {
        topMenuConst: 'singlepro',
        label: '签证详情',
        menu: 'SingleproVisa',
        parent_label:'签证产品',
        parent_path:'list',
        permission: 'singlepro/visa/visadet'
      }
    },
    {
      path: 'single-order',
      name: 'SingleproSingleorder',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '单项订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/hotel/orderlist,singlepro/singleorder/ticket/orderlist,singlepro/singleorder/flight/orderlist,singlepro/singleorder/train/orderlist,singlepro/singleorder/visaorder/orderlist,singlepro/singleorder/localproductorder',
        paths: 'single-order/hotel,single-ticket-order,single-flight-order,single-order/train,single-visa-order,single-local-product-order'
      }
    },
    {
      path: 'single-visa-order',
      component (reslove) {
        require(['src/components/VisaOrderList.vue'], reslove);
      },
      name: 'SingleproSingleVisaOrder',
      meta: {
        topMenuConst: 'singlepro',
        label: '签证订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/visaorder/orderlist'
      }
    },
    ... getVisaDetailRouter(
      'single-visa-order/',
      'SingleproSingle',
      'singlepro/singleorder/visaorder/',
      'singlepro',
      'SingleproSingleorder',
      '签证订单',
      '/singlepro/single-visa-order'
    ),
    {
      path: 'selfsupport-order',
      name: 'SingleproSelfSupportOrder',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '自营订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/hotel/orderlist,singlepro/selforder/tickertorder/orderlist,singlepro/selforder/visaorder/orderlist,singlepro/selforder/localproductorder/orderlist,singlepro/selforder/insurance',
        paths: 'selfsupport-order/hotel,selfsupport-ticket-order,selfsupport-visa-order,selfsupport-local-product-order,selfsupport-order/insurance'
      }
    },
    {
      path: 'selfsupport-visa-order',
      component (reslove) {
        require(['src/components/VisaOrderList.vue'],reslove);
      },
      name: 'SingleproSelfSupportVisaOrder',
      meta: {
        topMenuConst: 'singlepro',
        label: '签证订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/visaorder/orderlist'
      }
    },
    ... getVisaDetailRouter(
      'selfsupport-visa-order/',
      'SingleproSelfSupport',
      'singlepro/selforder/visaorder/',
      'singlepro',
      'SingleproSelforder',
      '签证订单',
      '/singlepro/selfsupport-visa-order'
    ),
    // 自营单项-农特优产品
    {
      path: 'localProduct/list',
      component: function (resolve) {
        require(['src/pages/singlepro/LocalProductList.vue'], resolve);
      },
      name: 'SelfSupportLocalProductList',
      meta: {
        label: '农特优产品',
        menu: 'SingleproLocalproduct',
        permission: 'singlepro/localproduct/lplist',
        btnPath: 'add',
        btnName: '+ 新增商品',
        btnPermission: 'singlepro/localproduct/aelp'
      }
    },
    // 自营单项-农特优产品-新增
    {
      path: 'localProduct/add',
      component: function (resolve) {
        require(['src/pages/singlepro/LocalProductEdit.vue'], resolve);
      },
      name: 'SelfSupportLocalProductEdit',
      meta: {
        label: '农特优产品',
        menu: 'SingleproLocalproduct',
        permission: 'singlepro/localproduct/aelp'
      }
    },
    // 自营单项-农特优产品-详情
    {
      path: 'localProduct/detail',
      component: function (resolve) {
        require(['src/pages/singlepro/LocalProductDetail.vue'], resolve);
      },
      name: 'SelfSupportLocalProductDetail',
      meta: {
        label: '农特优产品',
        menu: 'SingleproLocalproduct',
        permission: 'singlepro/localproduct/lpdet'
      }
    },
    {
      path: 'single-local-product-order',
      component (reslove) {
        require(['src/components/LocalProductOrder.vue'],reslove);
      },
      name: 'PlanSingleLocalProductOrder',
      meta: {
        topMenuConst: 'singlepro',
        label: '农特优订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/localproductorder/orderlist'
      }
    },
    {
      path: 'single-local-product-order/detail',
      component (reslove) {
        require(['src/components/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'PlanSingleLocalProductOrderDetail',
      meta: {
        topMenuConst: 'singlepro',
        label: '农特优订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/localproductorder/orderdet'
      }
    },
    {
      path: 'single-local-product-order/refund',
      component (reslove) {
        require(['src/components/LocalProductRefund.vue'], reslove);
      },
      name: 'PlanSingleLocalProductRefund',
      meta: {
        topMenuConst: 'singlepro',
        label: '农特优订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/localproductorder/refunddet'
      }
    },
    ... getLocalProductDetailRouter(
      'single-local-product-order/', 
      'PlanSingleLocalProduct',
      'singlepro/singleorder/localproductorder/',
      'singlepro', 
      'SingleproSingleorder', 
      '单项订单', 
      '/singlepro/single-local-product-order'),
    {
      path: 'selfsupport-local-product-order',
      component (reslove) {
        require(['src/components/LocalProductOrder.vue'],reslove);
      },
      name: 'selfsupportLocalProductOrder',
      meta: {
        topMenuConst: 'singlepro',
        label: '农特优订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/localproductorder/orderlist'
      }
    },
    {
      path: 'selfsupport-local-product-order/detail',
      component (reslove) {
        require(['src/components/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'selfsupportLocalProductOrderDetail',
      meta: {
        topMenuConst: 'singlepro',
        label: '农特优订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/localproductorder/orderdet'
      }
    },
    {
      path: 'selfsupport-local-product-order/refund',
      component (reslove) {
        require(['src/components/LocalProductRefund.vue'], reslove);
      },
      name: 'selfsupportLocalProductRefund',
      meta: {
        topMenuConst: 'singlepro',
        label: '农特优订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/localproductorder/refunddet'
      },
    },
    ... getLocalProductDetailRouter(
      'selfsupport-local-product-order/',
      'PlanSelfLocalProduct',
      'singlepro/selforder/localproductorder/',
      'singlepro',
      'SingleproSelforder',
      '自营订单',
      '/singlepro/selfsupport-local-product-order'),
    {
      path: 'selfsupport-order/insurance',
      component (reslove) {
        require(['src/components/InsuranceList.vue'],reslove);
      },
      name: 'insurance',
      meta: {
        topMenuConst: 'singlepro',
        label: '保险订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/insurance'
      }
    },
    {
      path: 'insurance/order-details',
      component (reslove) {
        require(['src/components/InsuranceOrderDetail.vue'], reslove);
      },
      name: 'insuranceOrderDetails',
      meta: {
        topMenuConst: 'singlepro',
        label: '订单详情',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/insurance/orderdetails'
      }
    },
    ... getLocalProductDetailRouter(
      'selfsupport-order/',
      'singlepro/selforder/insurance',
      'singlepro',
      'SingleproSelforder',
      '自营订单',
      '/singlepro/insurance'),
    //自营酒店相关
    {
      path: 'hotel',
      component: function(resolve){
        require(['src/pages/singlepro/HotelList.vue'], resolve)
      },
      name: 'SingleproHotel',
      meta: {
        label: '酒店管理',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/hotellist'
      }
    },
    {
      path: 'hotel/detail',
      component: function(resolve){
        require(['src/pages/singlepro/HotelDetail.vue'], resolve)
      },
      name: 'SingleproHotelDetail',
      meta: {
        label: '酒店详情',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/hoteldet'
      }
    },
    {
      path: 'hotel/add',
      component: function(resolve){
        require(['src/pages/singlepro/HotelEdit.vue'], resolve)
      },
      name: 'SingleproHotelAdd',
      meta: {
        label: '新增酒店',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/eaehotel'
      }
    },
    {
      path: 'hotel/edit',
      component: function(resolve){
        require(['src/pages/singlepro/HotelEdit.vue'], resolve)
      },
      name: 'SingleproHotelEdit',
      meta: {
        label: '编辑酒店',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/eaehotel'
      }
    },
    //酒店单项订单
    {
      path: 'single-order/hotel',
      component (reslove) {
        require(['src/components/HotelOrderList.vue'],reslove);
      },
      name: 'HotelSingleOrder',
      meta: {
        label: '酒店订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/hotel/orderlist'
      }
    },
    {
      path: 'single-order/hotel/detail',
      component (reslove) {
        require(['src/components/HotelOrderDetail.vue'],reslove);
      },
      name: 'HotelSingleOrderDetail',
      meta: {
        label: '酒店订单详情',
        parent_label: '酒店订单',
        parent_path: '/singlepro/single-order/hotel',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/hotel/orderdet'
      }
    },
    ...getReceiveDetailRouter('single-order/hotel/', 'HotelSingleOrder', 'singlepro/singleorder/hotel/', 'singlepro', 'SingleproSingleorder', '酒店订单', '/singlepro/single-order/hotel'),
    {
      path: 'single-order/hotel/refund-detail',
      component (reslove) {
        require(['src/components/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'HotelSingleOrderRefundDetail',
      meta: {
        label: '酒店退款详情',
        parent_label: '酒店订单',
        parent_path: '/singlepro/single-order/hotel',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/hotel/refunddet'
      }
    },
    //酒店自营订单相关
    {
      path: 'selfsupport-order/hotel',
      component (reslove) {
        require(['src/components/HotelOrderList.vue'],reslove);
      },
      name: 'HotelSelfSupportOrder',
      meta: {
        label: '酒店订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/hotel/orderlist'
      }
    },
    {
      path: 'selfsupport-order/hotel/detail',
      component (reslove) {
        require(['src/components/HotelOrderDetail.vue'],reslove);
      },
      name: 'HotelSelfSupportOrderDetail',
      meta: {
        label: '酒店订单详情',
        parent_label: '酒店订单',
        parent_path: '/singlepro/selfsupport-order/hotel',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/hotel/orderdet'
      }
    },
    ...getReceiveDetailRouter('selfsupport-order/hotel/', 'HotelSelfSupportOrder', 'singlepro/selforder/hotel/', 'singlepro', 'SingleproSelforder', '酒店订单', '/singlepro/selfsupport-order/hotel'),
    {
      path: 'selfsupport-order/hotel/refund-detail',
      component (reslove) {
        require(['src/components/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'HotelSelfSupportOrderRefundDetail',
      meta: {
        label: '酒店退款详情',
        parent_label: '酒店订单',
        parent_path: '/singlepro/selfsupport-order/hotel',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/hotel/refunddet'
      }
    },
    //酒店房型相关
    {
      path: 'hotel/room',
      component: function(resolve){
        require(['src/pages/singlepro/RoomList.vue'], resolve)
      },
      name: 'SingleproHotelRoom',
      meta: {
        label: '房型管理',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/roomlist'
      }
    },
    {
      path: 'hotel/room/add',
      component: function(resolve){
        require(['src/pages/singlepro/RoomEdit.vue'], resolve)
      },
      name: 'SingleproHotelRoomAdd',
      meta: {
        label: '新增房型',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/aeroom'
      }
    },
    {
      path: 'hotel/room/edit',
      component: function(resolve){
        require(['src/pages/singlepro/RoomEdit.vue'], resolve)
      },
      name: 'SingleproHotelRoomEdit',
      meta: {
        label: '编辑房型',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/aeroom'
      }
    },
    {
      path: 'hotel/room/detail',
      component: function(resolve){
        require(['src/pages/singlepro/RoomDetail.vue'], resolve)
      },
      name: 'SingleproHotelRoomDetail',
      meta: {
        label: '房型详情',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/roomdet'
      }
    },
    {
      path: 'hotel/room/package',
      component: function(resolve){
        require(['src/pages/singlepro/RoomPackageList.vue'], resolve)
      },
      name: 'SingleproHotelRoomPackage',
      meta: {
        label: '房型套餐',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/roompaclist'
      }
    },
    {
      path: 'hotel/room/package/add',
      component: function(resolve){
        require(['src/pages/singlepro/RoomPackageEdit.vue'], resolve)
      },
      name: 'SingleproHotelRoomPackageAdd',
      meta: {
        label: '新增房型套餐',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/aeroompac'
      }
    },
    {
      path: 'hotel/room/package/edith',
      component: function(resolve){
        require(['src/pages/singlepro/RoomPackageEdit.vue'], resolve)
      },
      name: 'SingleproHotelRoomPackageEdit',
      meta: {
        label: '编辑房型套餐',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/aeroompac'
      }
    },
    {
      path: 'hotel/room/package/detail',
      component: function(resolve){
        require(['src/pages/singlepro/RoomPackageDetail.vue'], resolve)
      },
      name: 'SingleproHotelRoomPackageDetail',
      meta: {
        label: '房型套餐详情',
        parent_label: '酒店管理',
        parent_path: '/singlepro/hotel',
        menu: 'SingleproHotel',
        permission: 'singlepro/hotel/roompacdet'
        
      }
    },
    //火车票订单
    {
      path: 'single-order/train',
      component(reslove){
        require(['src/components/TrainOrderList.vue'],reslove);
      },
      name: 'TrainSingleOrder',
      meta:{
        label: '火车票订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/train/orderlist'
      }
    },
    {
      path: 'single-order/train/detail',
      component(reslove){
        require(['src/components/TrainOrderDetail.vue'],reslove);
      },
      name: 'TrainSingleOrderDetail',
      meta:{
        label: '火车票订单详情',
        parent_label: '火车票订单',
        parent_path: '/singlepro/single-order/train',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/train/orderdet'
      }
    },
    ...getReceiveDetailRouter('train/', 'TrainSingleOrder', 'singlepro/singleorder/train/', 'singlepro', 'SingleproSingleorder', '火车票订单', '/singlepro/single-order/train'),
    {
      path: 'single-order/train/refund-detail',
      component(reslove){
        require(['src/components/TrainOrderRefundDetail.vue'],reslove);
      },
      name: 'TrainSingleOrderRefundDetail',
      meta:{
        label: '火车票退款详情',
        parent_label: '火车票订单',
        parent_path: '/singlepro/single-order/train',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/train/refunddet'
      }
    },
    // 自营单项-景区管理
    {
      path: 'scenic/list',
      component: function (resolve) {
        require(['src/pages/singlepro/ScenicList.vue'], resolve);
      },
      name: 'SelfSupportScenicList',
      meta: {
        label: '景区管理',
        btnPath: 'edit',
        btnName: '+ 新增景区',
        btnPermission: 'singlepro/ticket/aescen',
        menu: 'SingleproTicket',
        permission: 'singlepro/ticket/scenlist'
      }
    },
    // 自营单项-景区详情
    {
      path: 'scenic/detail',
      component: function (resolve) {
        require(['src/pages/singlepro/ScenicDetail.vue'], resolve);
      },
      name: 'SelfSupportScenicDetail',
      meta: {
        label: '景区详情',
        menu: 'SingleproTicket',
        permission: 'singlepro/ticket/scendet'
      }
    },
    // 自营单项-景区编辑
    {
      path: 'scenic/edit',
      component: function (resolve) {
        require(['src/pages/singlepro/ScenicEdit.vue'], resolve);
      },
      name: 'SelfSupportScenicEdit',
      meta: {
        label: '景区编辑',
        menu: 'SingleproTicket',
        permission: 'singlepro/ticket/aescen'
      }
    },
    // 自营单项-景区门票报价
    {
      path: 'scenic/quote',
      component: function (resolve) {
        require(['src/pages/singlepro/ScenicForTicketQuote.vue'], resolve);
      },
      name: 'SelfSupportScenicTicketQuote',
      meta: {
        label: '景区报价',
        menu: 'SingleproTicket',
        permission: 'singlepro/ticket/aeticketprice'
      }
    },
    // 自营单项-景区门票报价详情
    {
      path: 'scenic/quote-detail',
      component: function (resolve) {
        require(['src/pages/singlepro/ScenicForTicketQuoteDetail.vue'], resolve);
      },
      name: 'SelfSupportScenicTicketQuoteDetail',
      meta: {
        label: '景区报价详情',
        menu: 'SingleproTicket',
        permission: 'singlepro/ticket/aeticketpricedet'
      }
    },
    // 门票订单相关
    {
      path: 'single-ticket-order',
      component (reslove) {
        require(['src/components/TicketOrderList.vue'],reslove);
      },
      name: 'TicketSingleOrder',
      meta: {
        label: '门票订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/ticketorder/orderlist'
      }
    },
    {
      path: 'single-ticket-order/detail',
      component (reslove) {
        require(['src/components/TicketOrderDetail.vue'],reslove);
      },
      name: 'TicketSingleOrderDetail',
      meta: {
        label: '门票订单详情',
        parent_label: '门票订单',
        parent_path: '/singlepro/single-ticket-order',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/ticketorder/orderdet'
      }
    },
    ...getReceiveDetailRouter('single-ticket-order/', 'TicketSingleOrder','singlepro/singleorder/ticketorder/','singlepro', 'SingleproSingleorder','门票订单','/singlepro/single-ticket-order'),
    {
      path: 'single-ticket-order/refund-detail',
      component (reslove) {
        require(['src/components/TicketOrderRefundDetail.vue'],reslove);
      },
      name: 'TicketSingleOrderRefundDetail',
      meta: {
        label: '门票退款详情',
        parent_label: '门票订单',
        parent_path: '/singlepro/single-ticket-order',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/ticketorder/refunddet'
      }
    },
    {
      path: 'selfsupport-ticket-order',
      component (reslove) {
        require(['src/components/TicketOrderList.vue'],reslove);
      },
      name: 'TicketSelfSupportOrder',
      meta: {
        label: '门票订单',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/tickertorder/orderlist'
      }
    },
    {
      path: 'selfsupport-ticket-order/detail',
      component (reslove) {
        require(['src/components/TicketOrderDetail.vue'],reslove);
      },
      name: 'TicketSelfSupportOrderDetail',
      meta: {
        label: '门票订单详情',
        parent_label: '门票订单',
        parent_path: '/singlepro/selfsupport-ticket-order',
        menu: 'SingleproSelforder',
        permission: 'singlepro/selforder/tickertorder/orderdet'
      }
    },
    ...getReceiveDetailRouter('selfsupport-ticket-order/', 'TicketSelfSupportOrder','singlepro/selforder/tickertorder/', 'singlepro', 'SingleproSelforder','门票订单','/singlepro/selfsupport-ticket-order'),
    {
      path: 'selfsupport-ticket-order/refund-detail',
      component (reslove) {
        require(['src/components/TicketOrderRefundDetail.vue'],reslove);
      },
      name: 'TicketSelfSupportOrderRefundDetail',
      meta: {
        label: '门票退款详情',
        parent_label: '门票订单',
        parent_path: '/singlepro/selfsupport-ticket-order',
        menu: 'SingleproSelforder',
        permission: 'api/ticket/refund_detail'
      }
    },
    // 机票订单相关页面
    {
      path: 'single-flight-order',
      component (reslove) {
        require(['src/components/FlightOrderList.vue'],reslove);
      },
      name: 'FlightSingleOrder',
      meta: {
        label: '机票订单',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/flightorder/orderlist'
      }
    },
    {
      path: 'single-flight-order/detail',
      component (reslove) {
        require(['src/components/FlightOrderDetail.vue'],reslove);
      },
      name: 'FlightSingleOrderDetail',
      meta: {
        label: '机票订单详情',
        parent_label: '机票订单',
        parent_path: '/singlepro/single-flight-order',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/flightorder/orderdet'
      }
    },
    {
      path: 'flight-order/endorse',
      component (reslove) {
        require(['src/components/FlightOrderEndorseDetail.vue'],reslove);
      },
      name: 'FlightSingleOrderEndorseDetail',
      meta: {
        label: '机票变更单详情',
        parent_label: '机票订单',
        parent_path: '/singlepro/single-flight-order',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/flightorder/endorse'
      }
    },
    ...getReceiveDetailRouter('single-flight-order/', 'FlightSingleOrder','singlepro/singleorder/flightorder/', 'singlepro', 'SingleproSingleorder','机票订单','/singlepro/single-flight-order'),
    {
      path: 'single-flight-order/refund-detail',
      component (reslove) {
        require(['src/components/FlightOrderRefundDetail.vue'],reslove);
      },
      name: 'FlightSingleOrderRefundDetail',
      meta: {
        label: '机票退款详情',
        parent_label: '机票订单',
        parent_path: '/singlepro/single-flight-order',
        menu: 'SingleproSingleorder',
        permission: 'singlepro/singleorder/flightorder/refunddet'
      }
    },
    {
      path: 'insurance/list',
      component (reslove) {
        require(['src/pages/singlepro/insuranceProductList.vue'],reslove);
      },
      name: 'SingleproInsurance',
      meta: {
        label: '保险产品',
        menu: 'SingleproInsurance',
        permission: 'singlepro/insurance/insurance_list'
      }
    },
    {
      path: 'insurance/productDetail',
      component (reslove) {
        require(['src/pages/singlepro/insuranceProductDetail.vue'],reslove);
      },
      name: 'SingleproInsuranceDetail',
      meta: {
        label: '保险产品详情',
        menu: 'SingleproInsurance',
        permission: 'singlepro/insurance/insurance_detail'
      }
    },
    {
      path: 'insurance/termsDetail',
      component (reslove) {
        require(['src/pages/singlepro/insuranceTermsDetail.vue'],reslove);
      },
      name: 'SingleproInsuranceTerms',
      meta: {
        label: '保险产品条款',
        menu: 'SingleproInsurance',
        permission: 'singlepro/insurance/terms_detail'
      }
    },
    ...getReceiveDetailRouter('insuranceOrderList/','singlepro','保险产品'),
    // 订单退货
    {
      path: 'sales-return',
      component: function (resolve) {
        require(['src/pages/singlepro/SalesReturnList.vue'], resolve);
      },
      name: 'SalesReturn',
      meta: {
        label: '订单退货',
        menu: 'SingleproSalesReturn',
        permission: 'singlepro/salesReturn'
      }
    },
    // 订单退货详情
    {
      path: 'sales-return/detail',
      component: function (resolve) {
        require(['src/pages/singlepro/SalesReturDetail.vue'], resolve);
      },
      name: 'SalesReturnDetail',
      meta: {
        label: '订单退货详情',
        menu: 'SingleproSalesReturn',
        permission: 'singlepro/salesReturn/detail'
      }
    },

    //新增单项产品-机票订单
    // 机票订单列表
    {
      path: 'airOrder/list',
      component (reslove) {
        require(['src/pages/singlepro/AirOrderList.vue'],reslove);
      },
      name: 'SingleAirOrder',
      meta: {
        label: '机票订单',
        menu: 'SingleproAirOrder',
        permission: 'singlepro/airOrder'
      }
    }, 
    //机票订单详情
    {
      path: 'airOrder/detail',
      component (reslove) {
        require(['src/pages/singlepro/AirOrderDetail.vue'],reslove);
      },
      name: 'SingleAirOrderDetail',
      meta: {
        label: '机票订单详情',
        parent_label: '机票订单',
        parent_path: '/singlepro/airOrder/list',
        menu: 'SingleproAirOrder',
        permission: 'singlepro/airOrder/orderDetail'
      }
    },
    //机票订单改签详情
    {
      path: 'airOrder/changeOrder',
      component (reslove) {
        require(['src/pages/singlepro/AirOrderChangeOrder.vue'],reslove);
      },
      name: 'SingleAirOrderChangeOrder',
      meta: {
        label: '改签',
        parent_label: '机票订单',
        parent_path: '/singlepro/airOrder/list',
        menu: 'SingleproAirOrder',
        permission: 'singlepro/airOrder/changeOrder'
      }
    },
    {
      path: 'airOrder/landchangeOrder',
      component (reslove) {
        require(['src/pages/singlepro/AirOrderLandChange.vue'],reslove);
      },
      name: 'SingleAirOrderChangeOrder',
      meta: {
        label: '改签',
        parent_label: '机票订单',
        parent_path: '/singlepro/airOrder/list',
        menu: 'SingleproAirOrder',
        permission: 'singlepro/airOrder/changeOrderLand'
      }
    },
    //机票订单退票详情
    {
      path: 'airOrder/dersetOrder',
      component (reslove) {
        require(['src/pages/singlepro/AirOrderDesertOrder.vue'],reslove);
      },
      name: 'SingleAirOrderDersetOrder',
      meta: {
        label: '退票',
        parent_label: '机票订单',
        parent_path: '/singlepro/airOrder/list',
        menu: 'SingleproAirOrder',
        permission: 'singlepro/airOrder/desertOrderdet'
      }
    },
  ]
};
export default SINGLEPRO_ROUTE;