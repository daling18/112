// 销售订单
import Home from 'src/layouts/';
import { getVisaDetailRouter, getOrderDetailRouter, getLocalProductDetailRouter, getReceiveDetailRouter } from './compose-router';
import V2 from 'src/router/v2/saleorder';

const SALEORDER_ROUTE = {
  path: '/saleorder',
  component: Home,
  name: 'saleorder',
  meta: {
    label: '销售订单'
  },
  children: [
    ...V2,  
    {
      path: 'visa',
      component (reslove) {
        require(['src/components/VisaOrderList.vue'],reslove);
      },
      name: 'SaleorderVisaOrder',
      meta: {
        topMenuConst: 'saleorder',
        label: '签证订单',
        menu: 'SaleorderVisaorder',
        permission: 'saleorder/visaorder/orderlist'
      }
    },
    ... getVisaDetailRouter(
      'visa/',
      'Saleorder',
      'saleorder/visaorder/',
      'saleorder',
      'SaleorderVisaorder',
      '签证订单',
      '/saleorder/visa'
    ),
    {
      path: 'insurance',
      component (reslove) {
        require(['src/components/InsuranceList.vue'], reslove);
      },
      name: 'SaleorderInsurance',
      meta: {
        topMenuConst: 'saleorder',
        label: '保险订单',
        menu: 'SaleorderInsurance',
        permission: 'saleorder/insurance'
      }
    },
    ... getOrderDetailRouter(
      'insurance/',
      'SaleorderInsurance',
      'saleorder/insurance/',
      'saleorder',
      'SaleorderInsurance',
      '保险订单',
      '/saleorder/insurance'
    ),
    {
      path: 'line',
      component (reslove) {
        require(['src/components/LineOrderList.vue'], reslove);
      },
      name: 'SaleorderLineOrder',
      meta: {
        topMenuConst: 'saleorder',
        label: '线路订单',
        menu: 'SaleorderLineorder',
        permission: 'saleorder/lineorder'
      }
    },
    {
      path: 'linev2',
      component (reslove) {
        require(['src/components/LineOrderList.vue'], reslove);
      },
      name: 'SaleorderLineOrder',
      meta: {
        topMenuConst: 'saleorder',
        label: '线路订单',
        menu: 'SaleorderLineorder',
        permission: 'saleorder/lineorder'
      }
    },
    ... getOrderDetailRouter(
      'line/',
      'SaleorderLine',
      'saleorder/lineorder/',
      'saleorder',
      'SaleorderLineorder',
      '线路订单',
      '/saleorder/line'
    ),
    {
      path: 'local-product-order',
      component (reslove) {
        require(['src/components/LocalProductOrder.vue'],reslove);
      },
      name: 'DistributionLocalProductOrder',
      meta: {
        topMenuConst: 'saleorder',
        label: '农特优订单',
        menu: 'SaleorderLocalproductorder',
        permission: 'saleorder/localproductorder/orderlist'
      }
    },
    {
      path: 'local-product-order/detail',
      component (reslove) {
        require(['src/components/LocalProductOrderDetail.vue'],reslove);
      },
      name: 'DistributionLocalProductOrderDetail',
      meta: {
        topMenuConst: 'saleorder',
        label: '农特优订单',
        menu: 'SaleorderLocalproductorder',
        permission: 'saleorder/localproductorder/orderdet'
      }
    },
    {
      path: 'local-product-order/refund',
      component (reslove) {
        require(['src/components/LocalProductRefund.vue'], reslove);
      },
      name: 'DistributionLocalProductOrderRefund',
      meta: {
        topMenuConst: 'saleorder',
        label: '农特优',
        menu: 'SaleorderLocalproductorder',
        permission: 'saleorder/localproductorder/refunddet'
      }
    },
    ... getLocalProductDetailRouter(
      'local-product-order/',
      'Saleorder',
      'saleorder/localproductorder/',
      'saleorder',
      'SaleorderLocalproductorder',
      '农特优订单',
      '/saleorder/local-product-order'
    ),
    //酒店销售订单相关
    {
      path: 'hotel',
      component(reslove){
        require(['src/components/HotelOrderList.vue'],reslove);
      },
      name: 'HotelSaleOrder',
      meta:{
        label: '酒店订单',
        menu: 'HotelSaleOrder',
        permission: 'saleorder/hotel/orderlist'
      }
    },
    {
      path: 'hotel/detail',
      component(reslove){
        require(['src/components/HotelOrderDetail.vue'],reslove);
      },
      name: 'HotelSaleOrderDetail',
      meta:{
        label: '酒店订单详情',
        parent_label: '酒店订单',
        parent_path: '/saleorder/hotel',
        menu: 'HotelSaleOrder',
        permission: 'saleorder/hotel/orderdet'
      }
    },
    ...getReceiveDetailRouter('hotel/', 'HotelSaleOrder', 'saleorder/hotel/', 'singlepro', 'HotelSaleOrder', '酒店订单', '/saleorder/hotel'),
    {
      path: 'hotel/refund-detail',
      component(reslove){
        require(['src/components/HotelOrderRefundDetail.vue'],reslove);
      },
      name: 'HotelSaleOrderRefundDetail',
      meta:{
        label: '酒店订单退款详情',
        parent_label: '酒店订单',
        parent_path: '/saleorder/hotel',
        menu: 'HotelSaleOrder',
        permission: 'saleorder/hotel/refunddet'
      }
    },
    //火车票订单
    {
      path: 'train',
      component(reslove){
        require(['src/components/TrainOrderList.vue'],reslove);
      },
      name: 'TrainSaleOrder',
      meta:{
        label: '火车票订单',
        menu: 'TrainSaleOrder',
        permission: 'saleorder/train/orderlist'
      }
    },
    {
      path: 'train/detail',
      component(reslove){
        require(['src/components/TrainOrderDetail.vue'],reslove);
      },
      name: 'TrainSaleOrderDetail',
      meta:{
        label: '火车票订单详情',
        parent_label: '火车票订单',
        parent_path: '/saleorder/train',
        menu: 'TrainSaleOrder',
        permission: 'saleorder/train/orderdet'
      }
    },
    ...getReceiveDetailRouter('train/', 'TrainSaleOrder', 'saleorder/train/', 'singlepro', 'TrainSaleOrder', '火车票订单', '/saleorder/train'),
    {
      path: 'train/refund-detail',
      component(reslove){
        require(['src/components/TrainOrderRefundDetail.vue'],reslove);
      },
      name: 'TrainSaleOrderRefundDetail',
      meta:{
        label: '火车票退款详情',
        parent_label: '火车票订单',
        parent_path: '/saleorder/train',
        menu: 'TrainSaleOrder',
        permission: 'saleorder/train/refunddet'
      }
    },
    // 机票订单相关页面
    {
      path: 'flight-order',
      component (reslove) {
        require(['src/components/FlightOrderList.vue'],reslove);
      },
      name: 'FlightSaleOrder',
      meta: {
        label: '机票订单',
        menu: 'SaleorderFlightorder',
        permission: 'saleorder/flightorder/orderlist'
      }
    },
    {
      path: 'flight-order/detail',
      component (reslove) {
        require(['src/components/FlightOrderDetail.vue'],reslove);
      },
      name: 'FlightSaleOrderDetail',
      meta: {
        label: '机票订单详情',
        parent_label: '机票订单',
        parent_path: '/saleorder/flight-order',
        menu: 'SaleorderFlightorder',
        permission: 'saleorder/flightorder/orderdet'
      }
    },
    ...getReceiveDetailRouter('flight-order/', 'FlightSaleOrder', 'saleorder/flightorder/','saleorder', 'SaleorderFlightorder','机票订单','/saleorder/flight-order'),
    {
      path: 'flight-order/refund',
      component (reslove) {
        require(['src/components/FlightOrderRefundDetail.vue'],reslove);
      },
      name: 'FlightSaleOrderRefundDetail',
      meta: {
        label: '机票退款详情',
        parent_label: '机票订单',
        parent_path: '/saleorder/flight-order',
        menu: 'SaleorderFlightorder',
        permission: 'saleorder/flightorder/refunddet'
      }
    },
    {
      path: 'flight-order/endorse',
      component (reslove) {
        require(['src/components/FlightOrderEndorseDetail.vue'],reslove);
      },
      name: 'FlightSaleOrderEndorseDetail',
      meta: {
        label: '机票变更单详情',
        parent_label: '机票订单',
        parent_path: '/saleorder/flight-order',
        menu: 'SaleorderFlightorder',
        permission: 'saleorder/flightorder/endorse'
      }
    },
    // 门票订单相关页面
    {
      path: 'ticket-order',
      component (reslove) {
        require(['src/components/TicketOrderList.vue'],reslove);
      },
      name: 'TicketSaleOrder',
      meta: {
        label: '门票订单',
        menu: 'SaleorderTicketorder',
        permission: 'saleorder/ticketorder/orderlist'
      }
    },
    {
      path: 'ticket-order/detail',
      component (reslove) {
        require(['src/components/TicketOrderDetail.vue'],reslove);
      },
      name: 'TicketSaleOrderDetail',
      meta: {
        label: '门票订单详情',
        parent_label: '门票订单',
        parent_path: '/saleorder/ticket-order',
        menu: 'SaleorderTicketorder',
        permission: 'saleorder/ticketorder/orderdet'
      }
    },
    ...getReceiveDetailRouter('ticket-order/', 'TicketSaleOrder','saleorder/ticketorder/', 'saleorder', 'SaleorderTicketorder','门票订单','/saleorder/ticket-order'),
    {
      path: 'ticket-order/refund-detail',
      component (reslove) {
        require(['src/components/TicketOrderRefundDetail.vue'],reslove);
      },
      name: 'TicketSaleOrderRefundDetail',
      meta: {
        label: '门票退款详情',
        parent_label: '门票订单',
        parent_path: '/saleorder/ticket-order',
        menu: 'SaleorderTicketorder',
        permission: 'saleorder/ticketorder/refunddet'
      }
    },
    {
      path: 'contract-preview',
      component (reslove) {
        require(['src/components/ContractPreview.vue'],reslove);
      },
      name: 'ContractPreview',
      meta: {
        label: '合同预览',
        parent_label: '订单详情',
        parent_path: 'saleorder/lineorder/',
        menu: 'SaleorderLineorder',
        permission: 'saleorder/contract-preview'
      }
    },
  ]
  
};
export default SALEORDER_ROUTE;