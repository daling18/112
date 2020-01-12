// 销售中心
import Home from 'src/layouts/';
import { getOrderDetailRouter, getVisaDetailRouter, getReceiveDetailRouter, getLocalProductDetailRouter } from './compose-router';
// const env = process.env.NODE_ENV === 'production';
// const routerPermission = function(apiNames) {
//   if(!env){
//     return true;
//   }

//   let permission = false;
//   let permissions = JSON.parse(window.permission);

//   apiNames = apiNames ? apiNames.split(',') : [];
//   for(let i = 0; i < apiNames.length; i++){
//     if(permissions[apiNames[i]]){
//       permission = true;
//       break;
//     }
//   }
// };
const SALECENTER_ROUTE = {
  path: '/salecenter',
  component: Home,
  name: 'salecenter',
  meta: {
    label: '销售中心'
  },
  children: [
    {
      path: 'line',
      name: 'SalecenterLine',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '旅游线路',
        menu: 'SalecenterTuan',
        permission: 'salecenter/tuan/compro,salecenter/tuan/othercompro',
        paths: 'line/list,other-line/list'
      }
    },
    {
      path: 'line/list',
      component(reslove) {
        require(['src/pages/salecenter/LineList.vue'], reslove);
      },
      name: 'SalecenterLineList',
      meta: {
        topMenuConst: 'salecenter',
        label: '旅游线路',
        menu: 'SalecenterTuan',
        permission: 'salecenter/tuan/compro'
      },
      children: [
        {
          path: 'line/Tourist-Info',
          name: 'SalecenterTouristInfo',
          component(reslove) {
            require(['src/pages/salecenter/TouristInfo.vue'], reslove);
          },
          meta: {
            label: '添加订单',
          }
        }
      ]
    },
    {
      path: 'line/Tourist-Info',
      component(reslove) {
        require(['src/pages/salecenter/TouristInfo.vue'], reslove);
      },
      name: 'SalecenterLineList',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterTuan',
        permission: 'salecenter/tuan/compro'
      }
    },
    {
      path: 'line/detail',
      component(reslove) {
        require(['src/components/TripDetail.vue'], reslove);
      },
      name: 'SalecenterLineDetail',
      meta: {
        topMenuConst: 'salecenter',
        label: '线路详情',
        menu: 'SalecenterTuan',
        parent_label: '旅游线路',
        parent_path: '/salecenter/line/list',
        permission: 'salecenter/tuan/compro'
      }
    },
    {
      path: 'line/order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterLineBook',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterTuan',
        parent_label: '线路',
        parent_path: '/salecenter/line/list',
        permission: 'api/tuan/sale_add_order'
      }
    },
    {
      path: 'line/zhike-order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterLineZhikeOrder',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterTuan',
        parent_label: '线路',
        parent_path: '/salecenter/line/list',
        permission: 'v1/order/tuan/zk-add-order'
        // permission: 'api/tuan/sale_add_zhike_order'
      }
    },
    {
      path: 'other-line/list',
      component(reslove) {
        require(['src/pages/salecenter/LineList.vue'], reslove);
      },
      name: 'SalecenterOtherLineList',
      meta: {
        topMenuConst: 'salecenter',
        label: '旅游线路',
        menu: 'SalecenterTuan',
        permission: 'salecenter/tuan/othercompro'
      }
    },
    {
      path: 'other-line/detail',
      component(reslove) {
        require(['src/components/TripDetail.vue'], reslove);
      },
      name: 'SalecenterOtherLineDetail',
      meta: {
        topMenuConst: 'salecenter',
        label: '线路详情',
        menu: 'SalecenterTuan',
        parent_label: '旅游线路',
        parent_path: '/salecenter/other-line/list',
        permission: 'api/product/self_sale_detail'
      }
    },
    {
      path: 'other-line/order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterOtherLineBook',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterTuan',
        parent_label: '旅游线路',
        parent_path: '/salecenter/other-line/list',
        permission: 'api/tuan/sale_add_order'
      }
    },
    {
      path: 'other-line/zhike-order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterOtherLineZhikeOrder',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterTuan',
        parent_label: '旅游线路',
        parent_path: '/salecenter/other-line/list',
        permission: 'v1/order/tuan/sale-add-order'
        // permission: 'api/tuan/sale_add_order'
      }
    },
    // 旅游线路-运营中心
    {
      path: 'operating',
      component(reslove) {
        require(['src/components/MultiPageIndex.vue'], reslove);
        // require(['src/pages/salecenter/OperatingLineList.vue'],reslove);
      },
      name: 'SalecenterOperating',
      meta: {
        label: '旅游线路',
        menu: 'SalecenterOperating',
        permission: 'salecenter/operating/list,salecenter/other-operating/list',
        paths: 'operating/list,other-operating/list'
      }
    },
    {
      path: 'operating/list',
      component(reslove) {
        require(['src/pages/salecenter/OperatingLineList.vue'], reslove);
      },
      name: 'SalecenterOperatingList',
      meta: {
        topMenuConst: 'salecenter',
        label: '旅游线路',
        menu: 'SalecenterOperating',
        permission: 'salecenter/operating/list'
      }
    },
    {
      path: 'operating/detail',
      component(reslove) {
        require(['src/components/TripDetail.vue'], reslove);
      },
      name: 'SalecenterOperatingDetail',
      meta: {
        topMenuConst: 'salecenter',
        label: '线路详情',
        menu: 'SalecenterOperating',
        parent_label: '旅游线路',
        parent_path: '/salecenter/operating/list',
        permission: 'salecenter/operating/list'
      }
    },
    {
      path: 'operating/order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterOperatingBook',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterOperating',
        parent_label: '线路',
        parent_path: '/salecenter/operating/list',
        permission: 'salecenter/operating/order'
      }
    },
    {
      path: 'operating/zhike-order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterOperatingZhikeOrder',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterOperating',
        parent_label: '线路',
        parent_path: '/salecenter/operating/list',
        permission: 'salecenter/operating/zhike-order'
      }
    },
    {
      path: 'other-operating/list',
      component(reslove) {
        require(['src/pages/salecenter/OperatingLineList.vue'], reslove);
      },
      name: 'SalecenterOperatingOtherOperating',
      meta: {
        topMenuConst: 'salecenter',
        label: '其他公司线路',
        menu: 'SalecenterOperating',
        permission: 'salecenter/other-operating/list'
      }
    },
    {
      path: 'other-operating/detail',
      component(reslove) {
        require(['src/components/TripDetail.vue'], reslove);
      },
      name: 'SalecenterOtherOperatingDetail',
      meta: {
        topMenuConst: 'salecenter',
        label: '线路详情',
        menu: 'SalecenterOperating',
        parent_label: '旅游线路',
        parent_path: '/salecenter/other-operating/list',
        permission: 'salecenter/other-operating/list'
      }
    },
    {
      path: 'other-operating/order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterOtherOperatingBook',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterOperating',
        parent_label: '线路',
        parent_path: '/salecenter/other-operating/list',
        permission: 'salecenter/other-operating/order'
      }
    },
    {
      path: 'other-operating/zhike-order',
      component(reslove) {
        require(['src/pages/salecenter/LineBook.vue'], reslove);
      },
      name: 'SalecenterOtherOperatingZhikeOrder',
      meta: {
        topMenuConst: 'salecenter',
        label: '添加订单',
        menu: 'SalecenterOperating',
        parent_label: '线路',
        parent_path: '/salecenter/other-operating/list',
        permission: 'salecenter/other-operating/zhike-order'
      }
    },
    // 意向跟踪
    {
      path: 'trace',
      name: 'SalecenterTrace',
      component: function (resolve) {
        require(['src/pages/salecenter/Trace.vue'], resolve);
      },
      meta: {
        label: '意向跟踪',
        menu: 'SalecenterTrace',
        permission: 'salecenter/trace'
      }
    },
    // 意向跟踪详情
    {
      path: 'trace/detail',
      name: 'SalecenterTraceDetail',
      component: function (resolve) {
        require(['src/pages/salecenter/TraceDetail.vue'], resolve);
      },
      meta: {
        label: '意向单',
        menu: 'SalecenterTrace',
        parent_label: '意向跟踪',
        parent_path: '..',
        permission: 'salecenter/trace/detail'
      }
    },
    {
      path: 'visa/list',
      component(reslove) {
        require(['src/pages/salecenter/VisaList.vue'], reslove);
      },
      name: 'SalecenterVisaList',
      meta: {
        label: '签证',
        menu: 'SalecenterVisa',
        permission: 'salecenter/visa'
      }
    },
    {
      path: 'visa/detail',
      component(reslove) {
        require(['src/pages/salecenter/VisaDetail.vue'], reslove);
      },
      name: 'SalecenterVisaDetail',
      meta: {
        label: '签证详情',
        parent_label: '签证',
        parent_path: 'list',
        menu: 'SalecenterVisa',
        permission: 'salecenter/visa'
      }
    },
    {
      path: 'visa/book',
      component(reslove) {
        require(['src/pages/salecenter/VisaBook.vue'], reslove);
      },
      name: 'SalecenterVisaBook',
      meta: {
        topMenuConst: 'salecenter',
        label: '签证预订',
        parent_label: '签证',
        parent_path: 'list',
        menu: 'SalecenterVisa',
        permission: 'salecenter/visa'
      }
    },
    // 农特优列表
    {
      path: 'local-product/list',
      component(reslove) {
        require(['src/pages/salecenter/LocalProductList.vue'], reslove);
      },
      name: 'DistributionLocalProductList',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'SalecenterLocalproduct',
        permission: 'salecenter/localproduct'
      }
    },
    // 农特优预定页面
    {
      path: 'local-product/order',
      component(reslove) {
        require(['src/pages/salecenter/LocalProductBook.vue'], reslove);
      },
      name: 'DistributionLocalProductBook',
      meta: {
        topMenuConst: 'distribution',
        label: '农特优',
        menu: 'SalecenterLocalproduct',
        permission: 'salecenter/localproduct'
      }
    },
    //酒店查询及预定页面
    {
      path: 'hotel',
      component(reslove) {
        require(['src/pages/salecenter/HotelList.vue'], reslove);
      },
      name: 'SalecenterHotel',
      meta: {
        label: '酒店预订',
        menu: 'SalecenterHotel',
        permission: 'salecenter/hotel'
      }
    },
    {
      path: 'hotel/detail',
      component(reslove) {
        require(['src/pages/salecenter/HotelDetail.vue'], reslove);
      },
      name: 'SalecenterHotelDetail',
      meta: {
        label: '酒店详情',
        parent_label: '酒店预订',
        parent_path: '/salecenter/hotel',
        menu: 'SalecenterHotel',
        permission: 'salecenter/hotel'
      },
    },
    {
      path: 'hotel/checkout',
      component(reslove) {
        require(['src/pages/salecenter/HotelCheckout.vue'], reslove);
      },
      name: 'SalecenterHotelCheckout',
      meta: {
        label: '酒店预定',
        parent_label: '酒店预订',
        parent_path: '/salecenter/hotel',
        menu: 'SalecenterHotel',
        permission: 'salecenter/hotel'
      },
    },
    {
      // 机票入口
      path: 'flight',
      name: 'SalecenterFlight',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      meta: {
        label: '机票',
        menu: 'SalecenterFlight',
        permission: 'salecenter/flight/inland,salecenter/flight/internation',
        paths: '/salecenter/flight/inland,/salecenter/flight/internation'
      }
    },
    // {
    //   path: 'flight',
    //   name: 'SalecenterFlight',
    //   redirect: to => {
    //     if(routerPermission('salecenter/flight/inland')){
    //       return { name: 'SalecenterFlightInland' }
    //     }else{
    //       return { name: 'SalecenterFlightInternation' }
    //     }
    //   },
    //   meta:{
    //     label: '机票'
    //   }
    // },
    //机票查询及预订页面
    {
      path: 'flight/inland',
      component(reslove) {
        require(['src/pages/salecenter/FlightInland.vue'], reslove);
      },
      name: 'SalecenterFlightInland',
      meta: {
        label: '国内机票',
        menu: 'SalecenterFlightInland',
        permission: 'salecenter/flight/inland'
      }
    },
    {
      path: 'flight/inland/checkout',
      component(reslove) {
        require(['src/pages/salecenter/FlightInlandCheckout.vue'], reslove);
      },
      name: 'SalecenterFlightInlandCheckout',
      meta: {
        label: '国内机票预定',
        parent_label: '国内机票',
        parent_path: '/salecenter/flight/inland',
        menu: 'SalecenterFlightInland',
        permission: 'salecenter/flight/inland'
      }
    },
    {
      path: 'flight/internation',
      component(reslove) {
        require(['src/pages/salecenter/FlightInternation.vue'], reslove);
      },
      name: 'SalecenterFlightInternation',
      meta: {
        label: '国际机票',
        menu: 'SalecenterFlightInland',
        permission: 'salecenter/flight/internation'
      }
    },
    {
      path: 'flight/internation/checkout',
      component(reslove) {
        require(['src/pages/salecenter/FlightInternationCheckout.vue'], reslove);
      },
      name: 'SalecenterFlightInternationCheckout',
      meta: {
        label: '国际机票预定',
        parent_label: '国际机票',
        parent_path: '/salecenter/flight/internation',
        menu: 'SalecenterFlightInternation',
        permission: 'salecenter/flight/internation'
      }
    },
    // 门票相关页面
    {
      path: 'ticket-list',
      component(reslove) {
        require(['src/pages/salecenter/TicketList.vue'], reslove);
      },
      name: 'DistributionTicketList',
      meta: {
        label: '门票',
        menu: 'SalecenterTicket',
        permission: 'salecenter/ticket'
      }
    },
    {
      path: 'ticket-detail',
      component(reslove) {
        require(['src/pages/salecenter/TicketDetail.vue'], reslove);
      },
      name: 'DistributionTicketDetail',
      meta: {
        label: '门票',
        menu: 'SalecenterTicket',
        permission: 'salecenter/ticket'
      }
    },
    {
      path: 'ticket-checkout',
      component(reslove) {
        require(['src/pages/salecenter/TicketOrderForm.vue'], reslove);
      },
      name: 'DistributionTicketCheckout',
      meta: {
        label: '门票',
        menu: 'SalecenterTicket',
        permission: 'salecenter/ticket'
      }
    },
    // 保险相关
    {
      path: 'insurance-checkout',
      component(reslove) {
        require(['src/pages/salecenter/InsuranceOrderForm.vue'], reslove);
      },
      name: 'DistributionTicketCheckout',
      meta: {
        label: '保险',
        menu: 'Salecenternsurance',
        permission: 'salecenter/insurance'
      }
    },
    // 火车票相关页面
    {
      path: 'train-list',
      component(reslove) {
        require(['src/pages/salecenter/TrainList.vue'], reslove);
      },
      name: 'DistributionTrainList',
      meta: {
        label: '火车票',
        menu: 'SalecenterTrain',
        permission: 'salecenter/train'
      }
    },
    {
      path: 'train-checkout',
      component(reslove) {
        require(['src/pages/salecenter/TrainCheckout.vue'], reslove);
      },
      name: 'DistributionTrainCheckout',
      meta: {
        label: '火车票预订',
        menu: 'SalecenterTrain',
        permission: 'salecenter/train'
      }
    },
    {
      path: 'train-change-checkout',
      component(reslove) {
        require(['src/pages/salecenter/TrainChangeCheckout.vue'], reslove);
      },
      name: 'TrainOrderChangeCheckout',
      meta: {
        label: '火车票改签',
        menu: 'SalecenterTrain',
        permission: 'saleorder/train/aplchgtic'
      }
    },
    {
      path: 'insurance_reverse/list',
      component(reslove) {
        require(['src/pages/salecenter/insuranceReverseList.vue'], reslove);
      },
      name: 'InsuranceReverseList',
      meta: {
        label: '保险产品',
        menu: 'SalecenterInsurance',
        permission: 'salecenter/insurance/insurance_list'
      }
    },
    {
      path: 'insurance_reverse/productDetail',
      component(reslove) {
        require(['src/pages/singlepro/insuranceProductDetail.vue'], reslove);
      },
      name: 'InsuranceReverseDetail',
      meta: {
        label: '保险产品详情',
        menu: 'SalecenterInsurance',
        permission: 'salecenter/insurance/insurance_detail'
      }
    },
    {
      path: 'insurance_reverse/termsDetail',
      component(reslove) {
        require(['src/pages/singlepro/insuranceTermsDetail.vue'], reslove);
      },
      name: 'InsuranceReverseTermsDetail',
      meta: {
        label: '保险产品条款',
        menu: 'SalecenterInsurance',
        permission: 'salecenter/insurance/terms_detail'
      }
    },
    {
      path: 'insurance_reverse/productDetails',
      component(reslove) {
        require(['src/pages/singlepro/insuranceProductDetails.vue'], reslove);
      },
      name: 'InsuranceReverseDetails',
      meta: {
        label: '保险下单',
        menu: 'SalecenterInsurance',
        permission: 'salecenter/insurance/insurance_details'
      }
    },
  ]
};
export default SALECENTER_ROUTE;