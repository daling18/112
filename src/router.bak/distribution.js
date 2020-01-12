import Home from 'src/components/Home.vue';
import { getOrderDetailRouter, getVisaDetailRouter, getReceiveDetailRouter, getLocalProductDetailRouter } from './compose-router';

const DISTRIBUIION_ROUTES =  {
  path: '/distribution',
  component: Home,
  name: 'distribution',
  meta: {
    label: '分销中心'
  },
  children: [
    {
      path: 'my-order',
      name: 'DistributionMyOrder',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '我的订单',
        menu: 'distributionMyOrder',
        permission: 'api/order/sale_order_list,api/hotel/orderList/2,api/ticket/order_list/1,api/flight/order_list/1,api/train/my_order_list,api/selfsupport.visaorder/order_list,api/selfsupport.localproductorder/my_sale_lists',
        paths: 'line-order,hotel-order,ticket-order,flight-order,train-order,visa-order,local-product-order'
      }
    },
    {
      path: 'purchase-order',
      name: 'DistributionPurchaseOrder',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '采购订单',
        menu: 'distributionPurchaseOrder',
        permission: 'api/order/sale_purchase_order_list',
        paths: 'line-purchase-order'
      }
    },
    {
      path: 'flight-inland',
      component(reslove){
        require(['src/components/distribution/FlightInland.vue'],reslove);
      },
      name: 'DistributionFlightInland',
      meta:{
        topMenuConst: 'distribution',
        label: '国内机票',
        menu: 'DistributionFlight',
        permission: 'api/domestic_flight/inquiry'
      }
    },
    {
      path: 'flight-inland/checkout',
      component(reslove){
        require(['src/components/distribution/FlightInlandCheckout.vue'],reslove);
      },
      name: 'DistributionFlightInlandCheckout',
      meta:{
        topMenuConst: 'distribution',
        label: '国内机票预定',
        menu: 'DistributionFlight',
        permission: 'api/domestic_flight/create_order'
      }
    },
    {
      path: 'flight-internation',
      component(reslove){
        require(['src/components/distribution/FlightInternation.vue'],reslove);
      },
      name: 'DistributionFlightInternation',
      meta:{
        topMenuConst: 'distribution',
        label: '国际机票',
        menu: 'DistributionFlight',
        permission: 'api/intl_flight/inquiry'
      }
    },
    {
      path: 'flight-internation/checkout',
      component(reslove){
        require(['src/components/distribution/FlightInternationCheckout.vue'],reslove);
      },
      name: 'DistributionFlightInternationCheckout',
      meta:{
        topMenuConst: 'distribution',
        label: '国际机票预定',
        menu: 'DistributionFlight',
        permission: 'api/intl_flight/createOrder'
      }
    },
    {
      path: 'flight-order',
      component (reslove) {
        require(['src/components/distribution/FlightOrderList.vue'],reslove);
      },
      name: 'DistributionFlightMyOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '机票订单',
        menu: 'distributionMyOrder',
        permission: 'api/flight/order_list/1'
      }
    },
    {
      path: 'flight-order/detail',
      component (reslove) {
        require(['src/components/distribution/FlightOrderDetail.vue'],reslove);
      },
      name: 'DistributionFlightMyOrderDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '机票订单',
        menu: 'distributionMyOrder',
        permission: 'api/flight/order_detail'
      }
    },
    ...getReceiveDetailRouter('flight-order/', 'DistributionFlightMyOrder', 'distribution', 'distributionMyOrder'),
    {
      path: 'flight-order/refund',
      component (reslove) {
        require(['src/components/distribution/FlightOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionFlightMyOrderRefundDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '机票订单',
        menu: 'distributionMyOrder',
        permission: 'api/flight/refund_detail'
      }
    },
    {
      path: 'flight-purchase-order',
      component (reslove) {
        require(['src/components/distribution/FlightOrderList.vue'],reslove);
      },
      name: 'DistributionFlightPurchaseOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '机票订单',
        menu: 'distributionPurchaseOrder',
        permission: 'api/flight/order_list/3'
      }
    },
    {
      path: 'flight-purchase-order/detail',
      component (reslove) {
        require(['src/components/distribution/FlightOrderDetail.vue'],reslove);
      },
      name: 'DistributionFlightPurchaseOrderDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '机票订单',
        menu: 'distributionPurchaseOrder',
        permission: 'api/flight/order_detail'
      }
    },
    {
      path: 'train-list',
      component (reslove) {
        require(['src/components/distribution/TrainList.vue'],reslove);
      },
      name: 'DistributionTrainList',
      meta: {
        topMenuConst: 'distribution',
        label: '火车票',
        menu: 'distributionTrainList',
        permission: 'api/train/get_ticket'
      }
    },
    {
      path: 'train-checkout',
      component (reslove) {
        require(['src/components/distribution/TrainCheckout.vue'],reslove);
      },
      name: 'DistributionTrainCheckout',
      meta: {
        topMenuConst: 'distribution',
        label: '火车票预订',
        menu: 'distributionTrainList',
        permission: 'api/train/create_order'
      }
    },
    {
      path: 'train-change-checkout',
      component (reslove) {
        require(['src/components/distribution/TrainChangeCheckout.vue'],reslove);
      },
      name: 'DistributionTrainChangeCheckout',
      meta: {
        topMenuConst: 'distribution',
        label: '火车票改签',
        menu: 'distributionTrainList',
        permission: 'api/train/change_ticket'
      }
    },
    {
      path: 'train-order',
      component(reslove){
        require(['src/components/distribution/TrainOrderList.vue'],reslove);
      },
      name: 'DistributionTrainMyOrder',
      meta:{
        topMenuConst: 'distribution',
        label: '火车票订单',
        menu: 'distributionMyOrder',
        permission: 'api/train/my_order_list'
      }
    },
    {
      path: 'train-order/detail',
      component(reslove){
        require(['src/components/distribution/TrainOrderDetail.vue'],reslove);
      },
      name: 'DistributionTrainMyOrderDetail',
      meta:{
        topMenuConst: 'distribution',
        label: '火车票订单详情',
        menu: 'distributionMyOrder',
        permission: 'api/train/order_detail'
      }
    },
    ...getReceiveDetailRouter('train-order/', 'DistributionTrainMyOrder', 'distribution', 'distributionMyOrder'),
    {
      path: 'train-order-refund',
      component(reslove){
        require(['src/components/distribution/TrainOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionTrainMyOrderRefundDetail',
      meta:{
        topMenuConst: 'distribution',
        label: '火车票退款详情',
        menu: 'distributionMyOrder',
        permission: 'api/train/refund_detail'
      }
    },
    {
      path: 'train-purchase-order',
      component(reslove){
        require(['src/components/distribution/order/train/list.vue'],reslove);
      },
      name: 'DistributionTrainPurchaseOrder',
      meta:{
        topMenuConst: 'distribution',
        label: '火车票订单',
        menu: 'distributionMyOrder',
        permission: 'api/train/my_order_list'
      }
    },
    {
      path: 'train-purchase-order/detail',
      component(reslove){
        require(['src/components/distribution/order/train/detail.vue'],reslove);
      },
      name: 'DistributionTrainPurchaseOrderDetail',
      meta:{
        topMenuConst: 'distribution',
        label: '火车票订单详情',
        menu: 'distributionMyOrder',
        permission: 'api/train/my_order_list'
      }
    },
    {
      path: 'hotel',
      component(reslove){
        require(['src/components/distribution/HotelList.vue'],reslove);
      },
      name: 'DistributionHotel',
      meta:{
        topMenuConst: 'distribution',
        label: '酒店预订',
        menu: 'DistributionHotel',
        permission: 'api/hotel/index'
      }
    },
    {
      path: 'hotel-detail',
      component(reslove){
        require(['src/components/distribution/HotelDetail.vue'],reslove);
      },
      name: 'DistributionHotelDetail',
      meta:{
        label: '酒店详情',
        menu: 'DistributionHotel',
        permission: 'api/hotel/detail'
      },
    },
    {
      path: 'hotel-checkout',
      component(reslove){
        require(['src/components/distribution/HotelCheckout.vue'],reslove);
      },
      name: 'DistributionHotelCheckout',
      meta:{
        topMenuConst: 'distribution',
        label: '酒店预定',
        menu: 'DistributionHotel',
        permission: 'api/hotel/createOrder'
      },
    },
    {
      path: 'hotel-order',
      component(reslove){
        require(['src/components/distribution/HotelOrderList.vue'],reslove);
      },
      name: 'DistributionHotelMyOrder',
      meta:{
        topMenuConst: 'distribution',
        label: '酒店订单',
        menu: 'distributionMyOrder',
        permission: 'api/hotel/orderList/2'
      }
    },
    {
      path: 'hotel-order/detail',
      component(reslove){
        require(['src/components/distribution/HotelOrderDetail.vue'],reslove);
      },
      name: 'DistributionHotelMyOrderDetail',
      meta:{
        topMenuConst: 'distribution',
        label: '酒店订单详情',
        menu: 'distributionMyOrder',
        permission: 'api/hotel/orderDetail/2'
      }
    },
    ...getReceiveDetailRouter('hotel-order/', 'DistributionHotelMyOrder', 'distribution', 'distributionMyOrder'),
    {
      path: 'hotel-refund-detail',
      component(reslove){
        require(['src/components/distribution/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionHotelMyOrderRefundDetail',
      meta:{
        topMenuConst: 'distribution',
        label: '酒店订单退款详情',
        menu: 'distributionMyOrder',
        permission: 'api/hotel/refundDetail/2'
      }
    },
    {
      path: 'hotel-purchase-order',
      component(reslove){
        require(['src/components/distribution/HotelOrderList.vue'],reslove);
      },
      name: 'DistributionHotelPurchaseOrder',
      meta:{
        topMenuConst: 'distribution',
        label: '酒店订单',
        menu: 'distributionPurchaseOrder',
        permission: 'api/hotel/orderList/2'
      }
    },
    {
      path: 'hotel-purchase-order/detail',
      component(reslove){
        require(['src/components/distribution/HotelOrderDetail.vue'],reslove);
      },
      name: 'DistributionHotelPurchaseOrderDetail',
      meta:{
        topMenuConst: 'distribution',
        label: '酒店订单详情',
        menu: 'distributionPurchaseOrder',
        permission: '/api/hotel/orderDetail'
      }
    },
    {
      path: 'line-list',
      component (reslove) {
        require(['src/components/distribution/LineList.vue'],reslove);
      },
      name: 'DistributionLineList',
      meta: {
        topMenuConst: 'distribution',
        label: '线路',
        menu: 'distributionLineList',
        permission: 'api/product/self_sale_product_list,api/product/distribution_product_list'
      }
    },
    {
      path: 'line-list/detail',
      component (reslove) {
        require(['src/components/plan/trip/trip-detail.vue'],reslove);
      },
      name: 'DistributionLineListDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '线路详情',
        menu: 'distributionLineList',
        parent_label: '线路',
        parent_path: '/distribution/line-list',
        permission: 'api/product/self_sale_detail'
      }
    },
    {
      path: 'line-list/detail4other',
      component (reslove) {
        require(['src/components/plan/trip/trip-detail.vue'],reslove);
      },
      name: 'DistributionLineListDetail4Other',
      meta: {
        topMenuConst: 'distribution',
        label: '线路详情',
        menu: 'distributionLineList',
        parent_label: '线路',
        parent_path: '/distribution/line-list?is_other=2',
        permission: 'api/product/self_sale_detail'
      }
    },
    {
      path: 'line-list/order',
      component (reslove) {
        require(['src/components/distribution/LineListOrder.vue'], reslove);
      },
      name: 'DistributionLineListOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '添加订单',
        menu: 'distributionLineList',
        parent_label: '线路',
        parent_path: '/distribution/line-list',
        permission: 'api/tuan/sale_add_order'
      }
    },
    {
      path: 'line-list/order4other',
      component (reslove) {
        require(['src/components/distribution/LineListOrder.vue'], reslove);
      },
      name: 'DistributionLineListOrder4Other',
      meta: {
        topMenuConst: 'distribution',
        label: '添加订单',
        menu: 'distributionLineList',
        parent_label: '线路',
        parent_path: '/distribution/line-list?is_other=2',
        permission: 'api/tuan/sale_add_order'
      }
    },
    {
      path: 'line-list/zhike-order',
      component (reslove) {
        require(['src/components/distribution/LineListOrder.vue'], reslove);
      },
      name: 'DistributionLineListZhikeOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '添加订单',
        isZhiKe: 1,
        menu: 'distributionLineList',
        parent_label: '线路',
        parent_path: '/distribution/line-list',
        permission: 'api/tuan/sale_add_zhike_order'
      }
    },
    {
      path: 'line-list/zhike-order4other',
      component (reslove) {
        require(['src/components/distribution/LineListOrder.vue'], reslove);
      },
      name: 'DistributionLineListZhikeOrder4Other',
      meta: {
        topMenuConst: 'distribution',
        label: '添加订单',
        isZhiKe: 1,
        menu: 'distributionLineList',
        parent_label: '线路',
        parent_path: '/distribution/line-list?is_other=2',
        permission: 'api/tuan/sale_add_order'
      }
    },
    // 订单详情路由 -- start
    ... getOrderDetailRouter('line-order/', 'DistributionLineOrder', 'distribution', 'distributionMyOrder'),
    ... getOrderDetailRouter('line-purchase-order/', 'DistributionLinePurchaseOrder', 'distribution', 'distributionPurchaseOrder'),
    // 订单详情路由 -- end

    {
      path: 'line-order',
      component (reslove) {
        require(['src/components/distribution/LineOrder.vue'], reslove);
      },
      name: 'DistributionLineOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '我的订单',
        menu: 'distributionMyOrder',
        permission: 'api/order/sale_order_list'
      }
    },
    {
      path: 'line-purchase-order',
      component (reslove) {
        require(['src/components/distribution/LineOrder.vue'], reslove);
      },
      name: 'DistributionLinePurchaseOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '采购订单',
        isPurchase: 1,
        menu: 'distributionPurchaseOrder',
        permission: 'api/order/sale_purchase_order_list'
      }
    },
    {
      path: 'ticket-list',
      component (reslove) {
        require(['src/components/distribution/TicketList.vue'],reslove);
      },
      name: 'DistributionTicketList',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionTicketList',
        permission:'api/selfsupport.scenic/scenicList'
      }
    },
    {
      path: 'ticket-detail',
      component (reslove) {
        require(['src/components/distribution/TicketDetail.vue'],reslove);
      },
      name: 'DistributionTicketDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionTicketDetail',
        permission:'api/selfsupport.scenic/scenicDetail'
      }
    },

    {
      path: 'ticket-checkout',
      component (reslove) {
        require(['src/components/distribution/TicketOrderForm.vue'],reslove);
      },
      name: 'DistributionTicketCheckout',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionTicketCheckout',
        permission: 'api/ticket/create_order'
      }
    },
    {
      path: 'ticket-order',
      component (reslove) {
        require(['src/components/distribution/TicketOrderList.vue'],reslove);
      },
      name: 'DistributionTicketMyOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionMyOrder',
        permission: 'api/ticket/order_list/1'
      }
    },
    {
      path: 'ticket-order/detail',
      component (reslove) {
        require(['src/components/distribution/TicketOrderDetail.vue'],reslove);
      },
      name: 'DistributionTicketMyOrderDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionMyOrder',
        permission: 'api/ticket/order_detail/1'
      }
    },
    ...getReceiveDetailRouter('ticket-order/', 'DistributionTicketMyOrder', 'distribution', 'distributionMyOrder'),
    {
      path: 'ticket-order/refund-detail',
      component (reslove) {
        require(['src/components/distribution/TicketOrderRefundDetail.vue'],reslove);
      },
      name: 'DistributionTicketMyOrderRefundDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionMyOrder',
        permission: 'api/ticket/refund_detail'
      }
    },
    {
      path: 'ticket-purchase-order',
      component (reslove) {
        require(['src/components/distribution/TicketOrderList.vue'],reslove);
      },
      name: 'DistributionTicketPurchaseOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionPurchaseOrder',
        permission: 'api/ticket/order_list/3'
      }
    },
    {
      path: 'ticket-purchase-order/detail',
      component (reslove) {
        require(['src/components/distribution/TicketOrderDetail.vue'],reslove);
      },
      name: 'DistributionTicketPurchaseOrderDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '门票',
        menu: 'distributionPurchaseOrder',
        permission: 'api/ticket/order_detail'
      }
    },
    {
      path: 'visa/list',
      component (reslove) {
        require(['src/components/distribution/VisaList.vue'],reslove);
      },
      name: 'DistributionVisaList',
      meta: {
        topMenuConst: 'distribution',
        label: '签证预订',
        menu: 'distributionVisaList',
        permission: 'api/selfsupport.visa/book_list'
      }
    },
    {
      path: 'visa/detail',
      component (reslove) {
        require(['src/components/distribution/VisaDetail.vue'],reslove);
      },
      name: 'DistributionVisaDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '签证预订',
        menu: 'distributionVisaList',
        permission: 'api/selfsupport.visa/visa_detail'
      }
    },
    {
      path: 'visa/book',
      component (reslove) {
        require(['src/components/distribution/VisaBook.vue'],reslove);
      },
      name: 'DistributionVisaBook',
      meta: {
        topMenuConst: 'distribution',
        label: '签证预订',
        menu: 'distributionVisaList',
        permission: 'api/selfsupport.visaorder/add_order'
      }
    },
    {
      path: 'visa-order',
      component (reslove) {
        require(['src/components/distribution/VisaOrder.vue'], reslove);
      },
      name: 'DistributionVisaOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '我的订单',
        menu: 'distributionMyOrder',
        permission: 'api/selfsupport.visaorder/order_list'
      }
    },
    ... getVisaDetailRouter('visa-order/', 'Distribution', 'distribution', 'distributionMyOrder', '我的订单', '/distribution/visa-order'),
    ... getLocalProductDetailRouter('local-product-order/', 'DistributionLocalProduct', 'distribution', 'distributionMyOrder', '我的订单', '/distribution/local-product-order'),
    ... getLocalProductDetailRouter('local-product/', 'LocalProduct', 'distribution', 'distributionLocalProductList', '农特优', '/distribution/local-product/list'),
    // {
    //   path: 'visa-purchase-order',
    //   component (reslove) {
    //     require(['src/components/distribution/VisaOrder.vue'], reslove);
    //   },
    //   name: 'DistributionVisaPurchaseOrder',
    //   meta: {
    //     topMenuConst: 'distribution',
    //     label: '采购订单',selfsupport.visa
    //     isPurchase: 1,
    //     menu: 'distributionPurchaseOrder',
    //     permission: 'api/selfsupport.visaorder/purchase_order_list'
    //   }
    // },
    {
      path: 'local-product/list',
      component (reslove) {
        require(['src/components/distribution/LocalProductList.vue'], reslove);
      },
      name: 'DistributionLocalProductList',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'distributionLocalProductList',
        permission: 'api/selfsupport.localproduct/sale_lists'
      }
    },
    {
      path: 'local-product/order',
      component (reslove) {
        require(['src/components/distribution/LocalProductBook.vue'], reslove);
      },
      name: 'DistributionLocalProductBook',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'distributionLocalProductList',
        permission: 'api/selfsupport.localproductorder/create_order'
      }
    },
    {
      path: 'local-product/detail',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrderDetail.vue'], reslove);
      },
      name: 'DistributionLocalProductDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'distributionLocalProductList',
        permission: 'api/selfsupport.localproductorder/detail'
      }
    },
    {
      path: 'local-product/refund',
      component (reslove) {
        require(['src/components/distribution/LocalProductRefund.vue'], reslove);
      },
      name: 'DistributionLocalProductRefund',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'distributionLocalProductList',
        permission: 'api/selfsupport.localproductorder/refund_detail'
      }
    },
    {
      path: 'local-product-order',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrder.vue'],reslove);
      },
      name: 'DistributionLocalProductOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优订单',
        menu: 'distributionMyOrder',
        permission: 'api/selfsupport.localproductorder/my_sale_lists'
      }
    },
    {
      path: 'local-product-purchase-order',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrder.vue'],reslove);
      },
      name: 'DistributionPurchaseLocalProductOrder',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优订单',
        menu: 'distributionPurchaseOrder',
        isPurchase: 1,
        permission: 'api/selfsupport.localproductorder/sale_lists'
      }
    },
    {
      path: 'local-product-order/detail',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'DistributionLocalProductOrderDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优订单',
        menu: 'distributionMyOrder',
        permission: 'api/selfsupport.localproductorder/my_sale_detail'
      }
    },
    {
      path: 'local-product-order/refund',
      component (reslove) {
        require(['src/components/distribution/LocalProductRefund.vue'], reslove);
      },
      name: 'DistributionLocalProductOrderRefund',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'distributionMyOrder',
        permission: 'api/selfsupport.localproductorder/refund_detail'
      }
    },
    {
      path: 'local-product-purchase-order/detail',
      component (reslove) {
        require(['src/components/distribution/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'DistributionPurchaseLocalProductOrderDetail',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优订单',
        menu: 'distributionPurchaseOrder',
        isPurchase: 1,
        permission: 'api/selfsupport.localproductorder/sale_detail'
      }
    },
    {
      path: 'local-product-purchase-order/refund',
      component (reslove) {
        require(['src/components/distribution/LocalProductRefund.vue'], reslove);
      },
      name: 'DistributionPurchaseLocalProductOrderRefund',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'distributionPurchaseOrder',
        isPurchase: 1,
        permission: 'api/selfsupport.localproductorder/refund_detail'
      }
    },
  ]
};

export default DISTRIBUIION_ROUTES;